use std::fs::File;
use std::io::BufReader;
use std::sync::Arc;

use rustls::{
    ServerConfig,
    pki_types::{CertificateDer, PrivateKeyDer},
};
use rustls_pemfile::{certs, pkcs8_private_keys};

pub fn load_tls_config() -> Arc<ServerConfig> {
    let cert_file = &mut BufReader::new(
        File::open("certs/cert.pem").expect("cannot open cert.pem"),
    );
    let key_file = &mut BufReader::new(
        File::open("certs/key.pem").expect("cannot open key.pem"),
    );

    let cert_chain: Vec<CertificateDer<'static>> = certs(cert_file)
        .map(|c| c.expect("invalid cert"))
        .collect();

    let mut keys = pkcs8_private_keys(key_file);
    let key = keys
        .next()
        .expect("no private key found")
        .expect("invalid private key");

    let mut config = ServerConfig::builder()
        .with_no_client_auth()
        .with_single_cert(cert_chain, PrivateKeyDer::Pkcs8(key))
        .expect("bad certificates");

    config.alpn_protocols = vec![b"h2".to_vec()];

    Arc::new(config)
}
