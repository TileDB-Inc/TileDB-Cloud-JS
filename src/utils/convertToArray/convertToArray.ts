function convertToArray(buffer: ArrayBuffer): Array<number>;
function convertToArray<T>(arrayLike: Array<T> | Iterable<T>): Array<T>; 
function convertToArray(arrayLike: Array<string | number | bigint> | Iterable<string | number | bigint> | ArrayBuffer): Array<string | number | bigint>;
function convertToArray(arrayLike: Array<unknown> | Iterable<unknown> | ArrayBuffer): Array<unknown> {
  if (Array.isArray(arrayLike)) {
    return arrayLike;
  } else if (arrayLike instanceof ArrayBuffer) {
    const uint8Array = new Uint8Array(arrayLike);
    const arrayOfUint8 = Array.from(uint8Array);
    return arrayOfUint8;
  } else {
    return Array.from(arrayLike);
  }
}

export default convertToArray;
