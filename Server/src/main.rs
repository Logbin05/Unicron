use actix_web::{App, HttpResponse, HttpServer, Responder, get, web};

#[get("/{name}")]
async fn hello(name: web::Path<String>) -> impl Responder {
    HttpResponse::Ok().body(format!("Привет, {}!", name))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(hello))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}
