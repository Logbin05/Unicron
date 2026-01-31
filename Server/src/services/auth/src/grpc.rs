use crate::generated::auth::{LoginReq, LoginRes, auth_service_server::AuthService};
use crate::generated::auth::{RegisterReq, RegisterRes};
use crate::generated::users::CreateNewUserReq;
use crate::services::auth::src::clients::users::UserClient;
use crate::services::auth::src::service::issue_paseto;
use tonic::{Request, Response, Status};

pub struct AuthGrpc {
    pub users: UserClient,
    pub paseto_key: Vec<u8>,
}

#[tonic::async_trait]
impl AuthService for AuthGrpc {
    async fn login(&self, request: Request<LoginReq>) -> Result<Response<LoginRes>, Status> {
        let req = request.into_inner();

        let mut users = self.users.clone();
        let res = users
            .get_user_by_login(req.login_or_email)
            .await
            .map_err(|_| Status::unauthenticated("Invalid credentials"))?;

        let user = res.user.ok_or_else(|| Status::internal("User not found"))?;

        if req.password != res.password_hash {
            return Err(Status::unauthenticated("Invalid credentials"));
        }

        let token = issue_paseto(user.user_id, &self.paseto_key)?;

        Ok(Response::new(LoginRes {
            token,
            user: Some(user),
        }))
    }

    async fn register(
        &self,
        request: Request<RegisterReq>,
    ) -> Result<Response<RegisterRes>, Status> {
        let req = request.into_inner();
        let mut users = self.users.clone();

        let res = users
            .create_user(CreateNewUserReq {
                full_name: req.full_name,
                login: req.login,
                email: req.email,
                password_hash: req.password,
            })
            .await
            .map_err(|e| Status::internal(format!("Failed to create user: {}", e)))?;

        let token = issue_paseto(res.user_id, &self.paseto_key)?;

        Ok(Response::new(RegisterRes {
            token,
            user: Some(res),
        }))
    }
}
