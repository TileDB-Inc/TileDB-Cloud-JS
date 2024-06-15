// pub fn add(left: usize, right: usize) -> usize {
//     left + right
// }

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         let result = add(2, 2);
//         assert_eq!(result, 4);
//     }
// }


// use wasm_bindgen::prelude::*;
// use rayon::prelude::*;
// use std::convert::TryInto;

// #[wasm_bindgen]
// pub struct SlicedData {
//     slices: Vec<u8>,
//     sizes: Vec<u64>,
// }

// #[wasm_bindgen]
// impl SlicedData {
//     #[wasm_bindgen(getter)]
//     pub fn slices(&self) -> Vec<u8> {
//         self.slices.clone()
//     }

//     #[wasm_bindgen(getter)]
//     pub fn sizes(&self) -> Vec<u64> {
//         self.sizes.clone()
//     }
// }

// #[wasm_bindgen]
// pub fn slice_data(data: &[u8], offsets: &[u64]) -> SlicedData {
//     let mut slices = Vec::new();
//     let mut sizes = Vec::new();
//     let mut previous_offset = 0;

//     for &offset in offsets {
//         let offset: usize = offset.try_into().expect("Offset is too large");
//         if offset > data.len() {
//             panic!("Offset is out of bounds");
//         }
//         let slice = data[previous_offset..offset].to_vec();
//         sizes.push(slice.len() as u64);
//         slices.extend(slice);
//         previous_offset = offset;
//     }

//     let final_slice = data[previous_offset..].to_vec();
//     sizes.push(final_slice.len() as u64);
//     slices.extend(final_slice);

//     SlicedData { slices, sizes }
// }

// #[wasm_bindgen]
// pub fn slice_data(data: &[u8], offsets: &[u64]) -> SlicedData {
//     let mut previous_offset = 0;

//     let slices: Vec<Vec<u8>> = offsets
//         .par_iter()
//         .map(|&offset| {
//             let offset: usize = offset.try_into().expect("Offset is too large");
//             if offset > data.len() {
//                 panic!("Offset is out of bounds");
//             }
//             let slice = data[previous_offset..offset].to_vec();
//             previous_offset = offset;
//             slice
//         })
//         .collect();

//     slices.par_iter().chain(vec![data[previous_offset..].to_vec()].par_iter()).cloned().collect()
// }

use wasm_bindgen::prelude::*;
use std::convert::TryInto;
use js_sys;

#[wasm_bindgen]
pub fn slice_data(data: &[u8], offsets: &[u64]) -> js_sys::Array {
    let mut previous_offset: usize = 0;
    let array = js_sys::Array::new();

    for &offset in offsets {
        let offset: usize = offset.try_into().expect("Offset is too large");
        if offset == 0 {
            continue;
        }
        if offset > data.len() {
            panic!("Offset is out of bounds");
        }
        let slice = data[previous_offset..offset].to_vec();
        let js_slice = js_sys::Uint8Array::from(slice.as_slice());
        array.push(&js_slice);
        previous_offset = offset;
    }

    let final_slice = data[previous_offset..].to_vec();
    let js_final_slice = js_sys::Uint8Array::from(final_slice.as_slice());
    array.push(&js_final_slice);

    array
}

// use wasm_bindgen::prelude::*;
// use rayon::prelude::*;
// use std::convert::TryInto;
// use wasm_bindgen_rayon::init_thread_pool;

// #[wasm_bindgen]
// pub async fn init_threads(num_threads: usize) -> Result<(), JsValue> {
//     init_thread_pool(num_threads).map_err(|e| JsValue::from_str(&e.to_string()))
// }

// #[wasm_bindgen]
// pub fn slice_data(data: &[u8], offsets: &[u64]) -> js_sys::Array {
//     let mut previous_offset = 0;
//     let array = js_sys::Array::new();

//     let slices: Vec<Vec<u8>> = offsets
//         .par_iter()
//         .map(|&offset| {
//             let offset: usize = offset.try_into().expect("Offset is too large");
//             if offset > data.len() {
//                 panic!("Offset is out of bounds");
//             }
//             let slice = data[previous_offset..offset].to_vec();
//             previous_offset = offset;
//             slice
//         })
//         .collect();

//     let final_slice = data[previous_offset..].to_vec();
//     slices.into_iter().chain(std::iter::once(final_slice)).for_each(|slice| {
//         let js_slice = js_sys::Uint8Array::from(slice.as_slice());
//         array.push(&js_slice);
//     });

//     array
// }