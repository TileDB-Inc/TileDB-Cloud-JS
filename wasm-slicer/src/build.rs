fn main() {
    let mut cfg = wasm_bindgen::Config::new();
    cfg.unstable_cfg_in_wasm_simd(true);
    wasm_bindgen::configure(&cfg);
}
