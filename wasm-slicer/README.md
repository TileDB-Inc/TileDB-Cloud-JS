## Install nightly
`rustup update`
`rustup update nightly`
## Build-std with nightly
### For Linux
`rustup component add rust-src --toolchain nightly-x86_64-unknown-linux-gnu`
### For MacOS
`rustup component add rust-src --toolchain nightly-aarch64-apple-darwin`

[More info](https://doc.rust-lang.org/nightly/cargo/reference/unstable.html#build-std)

## Build
`cd wasm-slicer && cargo +nightly build`
