/**
 * Convert a TypedArray (Uint8Array, Int32Array etc) to an Array
 */
declare const typedArrayToArray: <T>(typedArray: ArrayLike<T>) => T[];
export default typedArrayToArray;
