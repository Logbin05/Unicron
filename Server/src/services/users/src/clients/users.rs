use crate::generated::users::{
    CreateNewUserReq, GetUserByLoginReq, User, UserWithPassword,
    user_service_client::UserServiceClient,
};
use anyhow::Ok;
use tonic::transport::Channel;

#[derive(Clone)]
pub struct UserClient {
    inner: UserServiceClient<Channel>,
}

impl UserClient {
    pub async fn connect(addr: String) -> anyhow::Result<Self> {
        let inner = UserServiceClient::connect(addr).await?;
        Ok(Self { inner })
    }

    pub async fn create_user(&mut self, req: CreateNewUserReq) -> anyhow::Result<User> {
        let res = self.inner.create_user(req).await?;
        Ok(res.into_inner().user.unwrap())
    }

    pub async fn get_user_by_login(
        &mut self,
        login_or_email: String,
    ) -> anyhow::Result<UserWithPassword> {
        let res = self
            .inner
            .get_user_by_login(GetUserByLoginReq { login_or_email })
            .await?;

        Ok(res.into_inner().user.unwrap())
    }
}
