use crate::generated::users::*;
use anyhow::Result;
use chrono::{DateTime, TimeZone, Utc};
use prost_types::Timestamp;
use sqlx::{PgPool, types::time::OffsetDateTime};

pub struct UserRepo {
    db: PgPool,
}

impl UserRepo {
    pub fn new(db: PgPool) -> Self {
        Self { db }
    }

    fn chrono_to_prost(dt: DateTime<Utc>) -> Timestamp {
        Timestamp {
            seconds: dt.timestamp(),
            nanos: dt.timestamp_subsec_nanos() as i32,
        }
    }

    fn offset_to_prost(dt: OffsetDateTime) -> Timestamp {
        let dt_utc: DateTime<Utc> = Utc.timestamp_opt(dt.unix_timestamp(), dt.nanosecond()).single().unwrap();
        Self::chrono_to_prost(dt_utc)
    }

    pub async fn create_user(&self, req: &CreateNewUserReq) -> Result<User> {
        let row = sqlx::query!(
            r#"
            INSERT INTO users (full_name, login, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING user_id, role_id, uf_id, full_name, login, email, avatar, password_hash, is_verified, created_at, updated_at
            "#,
            req.full_name,
            req.login,
            req.email,
            req.password_hash
        )
        .fetch_one(&self.db)
        .await?;

        Ok(User {
            user_id: row.user_id,
            role_id: row.role_id.unwrap_or_default(),
            uf_id: row.uf_id.unwrap_or_default(),
            full_name: row.full_name,
            login: row.login,
            email: row.email,
            avatar: row.avatar.unwrap_or_default(),
            password_hash: row.password_hash,
            is_verified: row.is_verified.unwrap_or(false),
            created_at: row.created_at.map(Self::offset_to_prost),
            updated_at: row.updated_at.map(Self::offset_to_prost),
        })
    }

    pub async fn get_user(&self, user_id: i64) -> Result<Option<User>> {
        let row = sqlx::query!(
            r#"
            SELECT user_id, role_id, uf_id, full_name, login, email, avatar, password_hash, is_verified, created_at, updated_at
            FROM users
            WHERE user_id = $1
            "#,
            user_id
        )
        .fetch_optional(&self.db)
        .await?;

        Ok(row.map(|r| User {
            user_id: r.user_id,
            role_id: r.role_id.unwrap_or_default(),
            uf_id: r.uf_id.unwrap_or_default(),
            full_name: r.full_name,
            login: r.login,
            email: r.email,
            avatar: r.avatar.unwrap_or_default(),
            password_hash: r.password_hash,
            is_verified: r.is_verified.unwrap_or(false),
            created_at: r.created_at.map(Self::offset_to_prost),
            updated_at: r.updated_at.map(Self::offset_to_prost),
        }))
    }

    pub async fn update_user(&self, req: &UpdateUserReq) -> Result<Option<User>> {
        let row = sqlx::query!(
            r#"
            UPDATE users
            SET role_id = $2, uf_id = $3, full_name = $4, login = $5, email = $6, avatar = $7, password_hash = $8, is_verified = $9, updated_at = NOW()
            WHERE user_id = $1
            RETURNING user_id, role_id, uf_id, full_name, login, email, avatar, password_hash, is_verified, created_at, updated_at
            "#,
            req.user_id,
            req.role_id,
            req.uf_id,
            req.full_name,
            req.login,
            req.email,
            req.avatar,
            req.password_hash,
            req.is_verified
        )
        .fetch_optional(&self.db)
        .await?;

        Ok(row.map(|r| User {
            user_id: r.user_id,
            role_id: r.role_id.unwrap_or_default(),
            uf_id: r.uf_id.unwrap_or_default(),
            full_name: r.full_name,
            login: r.login,
            email: r.email,
            avatar: r.avatar.unwrap_or_default(),
            password_hash: r.password_hash,
            is_verified: r.is_verified.unwrap_or(false),
            created_at: r.created_at.map(Self::offset_to_prost),
            updated_at: r.updated_at.map(Self::offset_to_prost),
        }))
    }

    pub async fn verify_user(&self, user_id: i64) -> Result<bool> {
        let row = sqlx::query!(
            r#"
            UPDATE users
            SET is_verified = TRUE, updated_at = NOW()
            WHERE user_id = $1
            RETURNING is_verified
            "#,
            user_id
        )
        .fetch_optional(&self.db)
        .await?;

        Ok(row.map(|r| r.is_verified.unwrap_or(false)).unwrap_or(false))
    }


}
