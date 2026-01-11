use crate::generated::users::*;
use crate::services::users::src::repo::UserRepo;
use crate::{generated::users::user_service_server::UserService, state::SharedState};
use std::sync::Arc;
use argon2::Argon2;
use argon2::password_hash::PasswordHasher;
use argon2::password_hash::SaltString;
use argon2::password_hash::rand_core::OsRng;
use tonic::{Request, Response, Status};

pub struct UserGrpc {
    pub repo: Arc<UserRepo>,
    pub state: SharedState,
}

#[tonic::async_trait]
impl UserService for UserGrpc {
    async fn create_user(
    &self,
    request: Request<CreateNewUserReq>,
) -> Result<Response<CreateNewUserRes>, Status> {
    let mut req = request.into_inner();

    let salt = SaltString::generate(&mut OsRng);
    let password_hash = Argon2::default()
        .hash_password(req.password_hash.as_bytes(), &salt)
        .map_err(|e| Status::internal(e.to_string()))?
        .to_string();
    req.password_hash = password_hash;

    let user = self
        .repo
        .create_user(&req)
        .await
        .map_err(|e| Status::internal(e.to_string()))?;

    Ok(Response::new(CreateNewUserRes { user: Some(user) }))
}


    async fn get_user(&self, request: Request<GetUserReq>) -> Result<Response<GetUserRes>, Status> {
        let req = request.into_inner();
        let user = self
            .repo
            .get_user(req.user_id)
            .await
            .map_err(|e| Status::internal(e.to_string()))?;
        Ok(Response::new(GetUserRes { user }))
    }

    async fn update_user(
        &self,
        request: Request<UpdateUserReq>,
    ) -> Result<Response<UpdateUserRes>, Status> {
        let req = request.into_inner();
        let user = self
            .repo
            .update_user(&req)
            .await
            .map_err(|e| Status::internal(e.to_string()))?;
        Ok(Response::new(UpdateUserRes { user }))
    }

    async fn verify_user(
        &self,
        request: Request<VerifyUserReq>,
    ) -> Result<Response<VerifyUserRes>, Status> {
        let req = request.into_inner();
        let success = self
            .repo
            .verify_user(req.user_id)
            .await
            .map_err(|e| Status::internal(e.to_string()))?;
        Ok(Response::new(VerifyUserRes { success }))
    }

    async fn update_password(
        &self,
        request: Request<UpdatePasswordReq>,
    ) -> Result<Response<UpdatePasswordRes>, Status> {
        let req = request.into_inner();
        self.repo
            .update_password(req.user_id, &req.new_password_hash)
            .await
            .map_err(|e| Status::internal(e.to_string()))?;
        Ok(Response::new(UpdatePasswordRes { success: true }))
    }
}
