use wasm_bindgen::prelude::*;
use js_sys;
use rayon::prelude::*;
use wasm_bindgen_rayon::init_thread_pool;
use once_cell::sync::OnceCell;

static THREAD_POOL: OnceCell<()> = OnceCell::new();

#[wasm_bindgen(start)]
pub fn start() {
    // The thread pool will be initialized when slice_data is first called
}

#[wasm_bindgen]
pub fn slice_data(data: &[u8], offsets: &[u64]) -> js_sys::Array {
    // Initialize the thread pool if it hasn't been initialized yet
    THREAD_POOL.get_or_init(|| {
        let _ = init_thread_pool(4);
    });

    let mut sorted_offsets: Vec<u64> = offsets.to_vec();
    sorted_offsets.sort_unstable();
    sorted_offsets.dedup();

    let slices: Vec<(usize, usize)> = sorted_offsets.par_windows(2)
        .map(|window| {
            let start = window[0] as usize;
            let end = window[1] as usize;
            if end > data.len() {
                panic!("Offset is out of bounds");
            }
            (start, end)
        })
        .collect();

    let array = js_sys::Array::new();
    for (start, end) in slices {
        let slice = &data[start..end];
        let js_slice = js_sys::Uint8Array::from(slice);
        array.push(&js_slice);
    }

    // Add the final slice
    if let Some(&last_offset) = sorted_offsets.last() {
        let final_start = last_offset as usize;
        if final_start < data.len() {
            let final_slice = &data[final_start..];
            let js_final_slice = js_sys::Uint8Array::from(final_slice);
            array.push(&js_final_slice);
        }
    }

    array
}
