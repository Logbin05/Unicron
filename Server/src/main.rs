use base64;
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

use crate::generated::auth::auth_service_server::AuthServiceServer;
use crate::generated::users::user_service_server::UserServiceServer;
use crate::services::auth::src::clients::users::UserClient;
use crate::services::auth::src::grpc::AuthGrpc;
use crate::services::users::src::grpc::UserGrpc;
use crate::structure::kafka::KafkaMessage;
use crate::{
    services::users::src::repo::UserRepo,
    state::{AppState, SharedState},
};

pub mod db;
pub mod generated;
pub mod kafka;
pub mod proto;
pub mod services;
pub mod state;
pub mod structure;
pub mod tls;

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

    tracing::info!("HTTP listening on https://{}", http_addr);

    let http_app_clone = http_app.clone();
    tokio::spawn(async move {
        loop {
            let (stream, _) = listener.accept().await.unwrap();
            let tls_acceptor = tls_acceptor.clone();
            let service = TowerToHyperService::new(http_app_clone.clone());

            tokio::spawn(async move {
                let tls_stream = match tls_acceptor.accept(stream).await {
                    Ok(s) => s,
                    Err(err) => {
                        tracing::warn!("TLS handshake failed: {}", err);
                        return;
                    }
                };
                let io = TokioIo::new(tls_stream);
                if let Err(err) = http2::Builder::new(TokioExecutor::new())
                    .serve_connection(io, service)
                    .await
                {
                    tracing::error!("HTTP/2 error: {}", err);
                }
            });
        }
    });

    let users_grpc_addr = "127.0.0.1:50051".parse()?;
    let user_repo = UserRepo::new(app_state.db.clone());
    let user_grpc_service = UserGrpc {
        repo: std::sync::Arc::new(user_repo),
        state: app_state.clone(),
    };

    tokio::spawn(async move {
        tracing::info!("Users gRPC listening on {}", users_grpc_addr);
        tonic::transport::Server::builder()
            .add_service(UserServiceServer::new(user_grpc_service))
            .serve(users_grpc_addr)
            .await
            .unwrap();
    });

    let auth_grpc_addr = "127.0.0.1:50052".parse()?;
    let user_client = UserClient::connect("http://127.0.0.1:50051".to_string()).await?;
    let paseto_env = std::env::var("PASETO_KEY").expect("PASETO_KEY not set");

    let paseto_key = base64::decode(paseto_env.trim())
      .expect("Invalid base64 PASETO_KEY");

    if paseto_key.len() != 32 {
      panic!("PASETO_KEY must decode to exactly 32 bytes, got {}", paseto_key.len());
    }

    let auth_grpc_service = AuthGrpc {
        users: user_client,
        paseto_key,
    };

    tokio::spawn(async move {
        tracing::info!("Auth gRPC listening on {}", auth_grpc_addr);
        tonic::transport::Server::builder()
            .add_service(AuthServiceServer::new(auth_grpc_service))
            .serve(auth_grpc_addr)
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

async fn send_kafka(State(state): State<SharedState>, Json(msg): Json<KafkaMessage>) -> String {
    match kafka::send_message(&state.kafka_producer, &msg.topic, &msg.key, &msg.payload).await {
        Ok(_) => format!("Message sent to topic '{}'", msg.topic),
        Err(err) => format!("Kafka send error: {}", err),
    }
}
