fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_prost_build::configure()
        .build_server(true)
        .build_client(true)
        .out_dir("src/generated")
        .file_descriptor_set_path("src/generated/proto_descriptor.bin")
        .compile_protos(
            &[
                "users.proto",
                "auth.proto",
                "common.proto",
                "courses.proto",
                "finance.proto",
                "institutions.proto",
                "marketplace.proto",
                "progress.proto",
            ],
            &["src/proto"],
        )?;

    Ok(())
}
