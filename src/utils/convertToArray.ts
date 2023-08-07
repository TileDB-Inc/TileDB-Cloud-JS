function convertToArray(arrayLike: any): any[] {
  if (arrayLike.byteLength) {
    const uint8Array = new Uint8Array(arrayLike);
    const arrayOfUint8 = Array.from(uint8Array);
    return arrayOfUint8;
  }
  if (Array.isArray(arrayLike)) {
    return arrayLike;
  }

  return Array.from(arrayLike);
}

export default convertToArray;
