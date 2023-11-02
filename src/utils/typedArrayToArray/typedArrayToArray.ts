/**
 * Convert a TypedArray (Uint8Array, Int32Array etc) to an Array
 */
const typedArrayToArray = <T>(typedArray: ArrayLike<T>) =>
  Array.from(typedArray);

export default typedArrayToArray;
