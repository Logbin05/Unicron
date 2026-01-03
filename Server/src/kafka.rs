use rdkafka::producer::{FutureProducer, FutureRecord};
use rdkafka::error::KafkaError;
use std::time::Duration;

pub fn create_producer(brokers: &str) -> FutureProducer {
    rdkafka::ClientConfig::new()
        .set("bootstrap.servers", brokers)
        .set("message.timeout.ms", "5000")
        .create()
        .expect("Failed to create Kafka producer")
}

pub async fn send_message(
    producer: &FutureProducer,
    topic: &str,
    key: &str,
    payload: &str,
) -> Result<(), KafkaError> {
    let record = FutureRecord::to(topic)
        .payload(payload)
        .key(key);

    let delivery_result = producer.send(record, Duration::from_secs(0)).await;

    delivery_result.map(|_d| ()).map_err(|(e, _msg)| e)
}
