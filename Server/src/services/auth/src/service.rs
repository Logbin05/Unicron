use crate::services::auth::src::clients::users::UserClient;
use rusty_paseto::prelude::*;
use serde_json::json;
use time::{OffsetDateTime, format_description::well_known::Rfc3339};

pub struct AuthGrpc {
    pub users: UserClient,
    pub paseto_key: Vec<u8>,
}

fn issue_paseto(user_id: i64, key_bytes: &[u8]) -> Result<String, tonic::Status> {
    let key_array: [u8; 32] = key_bytes
        .try_into()
        .map_err(|_| tonic::Status::internal("Invalid key length (must be 32 bytes)"))?;
    let key = PasetoSymmetricKey::<V4, Local>::from(Key::from(key_array));

    let exp = OffsetDateTime::now_utc() + time::Duration::hours(1);
    let exp_str = exp.format(&Rfc3339).unwrap();

    let token = PasetoBuilder::<V4, Local>::default()
        .set_claim(
            CustomClaim::try_from(("user_id".to_string(), json!(user_id)))
                .map_err(|e| tonic::Status::internal(e.to_string()))?,
        )
        .set_claim(ExpirationClaim::try_from(exp_str).unwrap())
        .set_claim(IssuedAtClaim::default())
        .build(&key)
        .map_err(|e| tonic::Status::internal(e.to_string()))?;

    Ok(token)
}
