use axum::{Router, extract::State, routing::get};
use dotenvy::dotenv;
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tracing_subscriber;

use hyper::server::conn::http2;
use hyper_util::rt::{TokioExecutor, TokioIo};
use hyper_util::service::TowerToHyperService;

pub mod db;
pub mod state;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    dotenv().ok();

    let app_state = state::AppState::new().await;

    let app = Router::new()
        .route("/", get(root))
        .route("/redis", get(redis_test))
        .with_state(app_state.clone());

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(addr)
        .await
        .expect("failed to bind address");

    tracing::info!("Listening on HTTP/2 (h2c): http://{}", addr);

    let shutdown_signal = shutdown_signal();
    tokio::pin!(shutdown_signal);

    loop {
        tokio::select! {
            _ = &mut shutdown_signal => {
                tracing::info!("Shutdown signal received. Stopping accept loop.");
                break;
            }

            accept_result = listener.accept() => {
                let (stream, _) = match accept_result {
                    Ok(v) => v,
                    Err(err) => {
                        tracing::error!("Accept error: {err}");
                        continue;
                    }
                };

                let stream = TokioIo::new(stream);
                let service = TowerToHyperService::new(app.clone());

                tokio::spawn(async move {
                    if let Err(err) = http2::Builder::new(TokioExecutor::new())
                        .serve_connection(stream, service)
                        .await
                    {
                        tracing::error!("Connection error: {err}");
                    }
                });
            }
        }
    }

    tracing::info!("Server shutdown complete");
}

async fn root(State(state): State<state::SharedState>) -> String {
    match sqlx::query!("SELECT 1 AS one").fetch_one(&state.db).await {
        Ok(_) => "OK: DB connected".to_string(),
        Err(err) => format!("DB Error: {}", err),
    }
}

async fn redis_test(State(state): State<state::SharedState>) -> String {
    match state.ping_redis().await {
        Ok(pong) => format!("Redis response: {}", pong),
        Err(err) => format!("Redis error: {}", err),
    }
}

async fn shutdown_signal() {
    let ctrl_c = async {
        tokio::signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        use tokio::signal::unix::{SignalKind, signal};
        signal(SignalKind::terminate())
            .expect("failed to install SIGTERM handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
}
