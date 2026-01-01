use crate::db::create_db_pool;
use deadpool_redis::{Config as RedisConfig, Pool as RedisPool, Runtime};
use sqlx::PgPool;
use std::env;
use std::sync::Arc;
use redis::cmd;

#[derive(Clone)]
pub struct AppState {
    pub db: PgPool,
    pub redis: RedisPool,
}

impl AppState {
    pub async fn new() -> Arc<Self> {
        let db_pool = create_db_pool().await;

        let redis_url = env::var("REDIS_URL").expect("REDIS_URL not set");
        let cfg = RedisConfig::from_url(redis_url);
        let redis_pool = cfg
            .create_pool(Some(Runtime::Tokio1))
            .expect("Cannot create Redis pool");

        Arc::new(Self {
            db: db_pool,
            redis: redis_pool,
        })
    }

    pub async fn ping_redis(&self) -> Result<String, deadpool_redis::PoolError> {
        let mut conn = self.redis.get().await?;
        let pong: String = cmd("PING").query_async(&mut conn).await?;
        Ok(pong)
    }
}

pub type SharedState = Arc<AppState>;
