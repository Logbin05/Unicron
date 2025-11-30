use sqlx::{Pool, Postgres};
use std::env;

pub async fn create_db_pool() -> Pool<Postgres> {
    let url = env::var("DATABASE_URL").expect("DATABASE_URL not set");

    let pool = sqlx::postgres::PgPoolOptions::new()
        .max_connections(10)
        .connect(&url)
        .await
        .expect("Cannot connect to PostgreSQL");

    println!("PostgreSQL success!");
    pool
}
