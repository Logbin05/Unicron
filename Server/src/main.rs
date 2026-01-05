use axum::{
    Router,
    extract::{Json, State},
    routing::{get, post},
};
use dotenvy::dotenv;
use rustls::crypto::{CryptoProvider, ring};
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tokio_rustls::TlsAcceptor;
use tracing_subscriber;

use hyper::server::conn::http2;
use hyper_util::rt::{TokioExecutor, TokioIo};
use hyper_util::service::TowerToHyperService;

use crate::structure::kafka::KafkaMessage;

pub mod db;
pub mod kafka;
pub mod state;
pub mod structure;
pub mod tls;
pub mod generated;
pub mod services;
pub mod proto;

#[tokio::main]
async fn main() {
    CryptoProvider::install_default(ring::default_provider())
        .expect("Failed to install rustls crypto provider");

    tracing_subscriber::fmt::init();
    dotenv().ok();

    let app_state = state::AppState::new().await;

    let app = Router::new()
        .route("/", get(root))
        .route("/redis", get(redis_test))
        .route("/kafka", post(send_kafka))
        .with_state(app_state.clone());

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(addr)
        .await
        .expect("failed to bind address");

    let tls_config = tls::load_tls_config();
    let tls_acceptor = TlsAcceptor::from(tls_config);

    tracing::info!("Listening on HTTPS (HTTP/2): https://{}", addr);

    loop {
        let (stream, _) = match listener.accept().await {
            Ok(v) => v,
            Err(err) => {
                tracing::error!("Accept error: {err}");
                continue;
            }
        };

        let tls_acceptor = tls_acceptor.clone();
        let service = TowerToHyperService::new(app.clone());

        tokio::spawn(async move {
            let tls_stream = match tls_acceptor.accept(stream).await {
                Ok(s) => s,
                Err(err) => {
                    tracing::warn!("TLS handshake failed: {err}");
                    return;
                }
            };

            let io = TokioIo::new(tls_stream);

            if let Err(err) = http2::Builder::new(TokioExecutor::new())
                .serve_connection(io, service)
                .await
            {
                tracing::error!("HTTP/2 error: {err}");
            }
        });
    }
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

async fn send_kafka(
    State(state): State<state::SharedState>,
    Json(msg): Json<KafkaMessage>,
) -> String {
    match kafka::send_message(&state.kafka_producer, &msg.topic, &msg.key, &msg.payload).await {
        Ok(_) => format!("Message sent to topic '{}'", msg.topic),
        Err(err) => format!("Kafka send error: {}", err),
    }
}
