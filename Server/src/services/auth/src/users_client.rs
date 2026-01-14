use crate::generated::{auth::LoginReq, users::{self, user_service_client::UserServiceClient}};
use sqlx::{PgPool};
use tonic::transport::Channel;

#[derive(Clone)]
pub struct UserRepo {
    pub client: UserServiceClient<Channel>,
}

impl UserRepo {
    pub fn new(client: UserServiceClient<Channel>) -> Self {
        Self { client }
    }

    pub async fn get_user_by_login_or_email(&mut self, value: String) -> Result<users::User, tonic::Status> {
      let res = self.client.get_user(request);
    }
}
