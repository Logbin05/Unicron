use serde::Deserialize;

#[derive(Deserialize)]
pub struct KafkaMessage {
  pub topic: String,
  pub key: String,
  pub payload: String,
}