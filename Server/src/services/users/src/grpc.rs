use crate::{generated::users::user_service_server::UserService, state::SharedState};
use crate::generated::users::*;
use crate::services::users::src::repo::UserRepo;
use std::sync::Arc;
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
        let req = request.into_inner();
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
}
