function convertToArray(
  arrayLike: string | ArrayBuffer | number[] | bigint[]
): Array<string> | Array<number> | Array<bigint> {
  if (Array.isArray(arrayLike)) {
    return arrayLike;
  } else if (typeof arrayLike === 'object' && 'byteLength' in arrayLike) {
    const uint8Array = new Uint8Array(arrayLike);
    const arrayOfUint8 = Array.from(uint8Array);
    return arrayOfUint8;
  } else {
    return Array.from(arrayLike);
  }
}

export default convertToArray;
