use crate::generated::users::*;
use anyhow::{Ok, Result};
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
        let dt_utc: DateTime<Utc> = Utc
            .timestamp_opt(dt.unix_timestamp(), dt.nanosecond())
            .single()
            .unwrap();
        Self::chrono_to_prost(dt_utc)
    }

    pub async fn create_user(&self, req: &CreateNewUserReq) -> Result<User> {
        let row = sqlx::query!(
            r#"
            INSERT INTO users (role_id, full_name, login, email, password_hash)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING user_id, role_id, full_name, login, email, avatar, is_verified, created_at, updated_at
            "#,
            req.role_id,
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
            full_name: row.full_name,
            login: row.login,
            email: row.email,
            avatar: row.avatar.unwrap_or_default(),
            is_verified: row.is_verified.unwrap_or(false),
            created_at: row.created_at.map(Self::offset_to_prost),
            updated_at: row.updated_at.map(Self::offset_to_prost),
        })
    }

    pub async fn get_user(&self, user_id: i64) -> Result<Option<User>> {
        let row = sqlx::query!(
            r#"
            SELECT user_id, role_id, full_name, login, email, avatar, is_verified, created_at, updated_at
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
            full_name: r.full_name,
            login: r.login,
            email: r.email,
            avatar: r.avatar.unwrap_or_default(),
            is_verified: r.is_verified.unwrap_or(false),
            created_at: r.created_at.map(Self::offset_to_prost),
            updated_at: r.updated_at.map(Self::offset_to_prost),
        }))
    }

    pub async fn update_user(&self, req: &UpdateUserReq) -> Result<Option<User>> {
        let row = sqlx::query!(
            r#"
            UPDATE users
            SET role_id = $2, full_name = $3, login = $4, email = $5, avatar = $6, is_verified = $7, updated_at = NOW()
            WHERE user_id = $1
            RETURNING user_id, role_id, full_name, login, email, avatar, is_verified, created_at, updated_at
            "#,
            req.user_id,
            req.role_id,
            req.full_name,
            req.login,
            req.email,
            req.avatar,
            req.is_verified
        )
        .fetch_optional(&self.db)
        .await?;

        Ok(row.map(|r| User {
            user_id: r.user_id,
            role_id: r.role_id.unwrap_or_default(),
            full_name: r.full_name,
            login: r.login,
            email: r.email,
            avatar: r.avatar.unwrap_or_default(),
            is_verified: r.is_verified.unwrap_or(false),
            created_at: r.created_at.map(Self::offset_to_prost),
            updated_at: r.updated_at.map(Self::offset_to_prost),
        }))
    }

    pub async fn update_password(
        &self,
        user_id: i64,
        new_hash: &str,
    ) -> Result<()> {
        sqlx::query!(
            r#"
          UPDATE users set password_hash = $2, updated_at = NOW() WHERE user_id = $1
        "#,
            user_id,
            new_hash
        )
        .execute(&self.db)
        .await?;

      Ok(())
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

    pub async fn get_user_by_login_or_email(&self, login_or_email: &str) -> Result<Option<(User, String)>> {
      let row = sqlx::query!(
        r#"
          SELECT user_id, role_id, full_name, login, email, avatar, is_verified, password_hash, created_at, updated_at FROM users WHERE login = $1 OR email = $1
        "#,
        login_or_email
      ).fetch_optional(&self.db)
      .await?;

    Ok(row.map(|r| {
      (
        User {
          user_id: r.user_id,
          role_id: r.role_id.unwrap_or_default(),
          full_name: r.full_name,
          login: r.login,
          email: r.email,
          avatar: r.avatar.unwrap_or_default(),
          is_verified: r.is_verified.unwrap_or(false),
          created_at: r.created_at.map(Self::offset_to_prost),
          updated_at: r.created_at.map(Self::offset_to_prost),
        },
        r.password_hash,
      )
    }))
    }
}
