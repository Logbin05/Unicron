use axum::{Router, routing::get};
use dotenvy::dotenv;
mod db;
use crate::db::create_db_pool;
use std::net::SocketAddr;
use tracing_subscriber;
use tokio::net::TcpListener;
use hyper::server::conn::http2::Builder;
use hyper::body::Body;
use tower::ServiceExt;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    dotenv().ok();

    let _pool = create_db_pool().await;
    tracing::info!("PostgreSQL connected");

    let app = Router::new().route("/", get(root));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(addr).await.unwrap();
    tracing::info!("Listening on http://{}", addr);

    loop {
        let (stream, _) = listener.accept().await.unwrap();
        let svc = app.clone().into_make_service();

        tokio::spawn(async move {
            Builder::new()
                .http2_only(true)
                .serve_connection(stream, svc)
                .await
                .unwrap();
        });
    }
}

async fn root() -> &'static str {
    "Starting HTTP/2 (h2c)"
}
