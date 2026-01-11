use std::sync::Arc;

use anyhow::Result;
use argon2::password_hash::rand_core::OsRng;
use argon2::{
    Argon2,
    password_hash::{PasswordHasher, SaltString},
};

use crate::{
    generated::users::{CreateNewUserReq, UpdateUserReq, User},
    services::users::src::repo::UserRepo,
};

pub struct UserService {
    repo: Arc<UserRepo>,
}

impl UserService {
    pub fn new(repo: Arc<UserRepo>) -> Self {
        Self { repo }
    }

    pub async fn create_user(&self, mut req: CreateNewUserReq) -> Result<User> {
        let salt = SaltString::generate(&mut OsRng);
        let password_hash = Argon2::default()
            .hash_password(req.password_hash.as_bytes(), &salt)
            .map_err(anyhow::Error::msg)?
            .to_string();

        req.password_hash = password_hash;

        self.repo.create_user(&req).await
    }

    pub async fn get_user(&self, user_id: i64) -> Result<Option<User>> {
        self.repo.get_user(user_id).await
    }

    pub async fn update_user(&self, req: UpdateUserReq) -> Result<Option<User>> {
        self.repo.update_user(&req).await
    }

    pub async fn verify_user(&self, user_id: i64) -> Result<bool> {
        self.repo.verify_user(user_id).await
    }
}
