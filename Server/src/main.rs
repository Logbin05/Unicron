use axum::{
    extract::{Json, State},
    routing::{get, post},
    Router,
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

use crate::{services::users::src::repo::UserRepo, state::{AppState, SharedState}};
use crate::structure::kafka::KafkaMessage;
use crate::services::users::src::grpc::UserGrpc;
use crate::generated::users::user_service_server::UserServiceServer;

pub mod db;
pub mod kafka;
pub mod state;
pub mod structure;
pub mod tls;
pub mod generated;
pub mod services;
pub mod proto;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    CryptoProvider::install_default(ring::default_provider())
        .expect("Failed to install rustls crypto provider");

    tracing_subscriber::fmt::init();
    dotenv().ok();

    let app_state = AppState::new().await;

    let http_app = Router::new()
        .route("/", get(root))
        .route("/redis", get(redis_test))
        .route("/kafka", post(send_kafka))
        .with_state(app_state.clone());

    let http_addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(http_addr).await?;
    let tls_config = tls::load_tls_config();
    let tls_acceptor = TlsAcceptor::from(tls_config);

    tracing::info!("Listening on HTTPS (HTTP/2): https://{}", http_addr);

    let http_app_clone = http_app.clone();
    tokio::spawn(async move {
        loop {
            let (stream, _) = match listener.accept().await {
                Ok(v) => v,
                Err(err) => {
                    tracing::error!("Accept error: {err}");
                    continue;
                }
            };

            let tls_acceptor = tls_acceptor.clone();
            let service = TowerToHyperService::new(http_app_clone.clone());

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
    });

    let grpc_addr = "127.0.0.1:50051".parse()?;
    let user_repo = UserRepo::new(app_state.db.clone());
    let grpc_service = UserGrpc {
    repo: user_repo.into(),
    state: app_state.clone(),
};

    tokio::spawn(async move {
        tracing::info!("gRPC server listening on {}", grpc_addr);
        tonic::transport::Server::builder()
            .add_service(UserServiceServer::new(grpc_service))
            .serve(grpc_addr)
            .await
            .unwrap();
    });

    loop {
        tokio::time::sleep(std::time::Duration::from_secs(60)).await;
    }
}

async fn root(State(state): State<SharedState>) -> String {
    match sqlx::query!("SELECT 1 AS one").fetch_one(&state.db).await {
        Ok(_) => "OK: DB connected".to_string(),
        Err(err) => format!("DB Error: {}", err),
    }
}

async fn redis_test(State(state): State<SharedState>) -> String {
    match state.ping_redis().await {
        Ok(pong) => format!("Redis response: {}", pong),
        Err(err) => format!("Redis error: {}", err),
    }
}

async fn send_kafka(
    State(state): State<SharedState>,
    Json(msg): Json<KafkaMessage>,
) -> String {
    match kafka::send_message(&state.kafka_producer, &msg.topic, &msg.key, &msg.payload).await {
        Ok(_) => format!("Message sent to topic '{}'", msg.topic),
        Err(err) => format!("Kafka send error: {}", err),
    }
}
