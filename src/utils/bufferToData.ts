import { Datatype } from "../v2";

export const bufferToInt8 = (arrayBuffer: ArrayBuffer) =>
  new Int8Array(arrayBuffer);
export const bufferToUint8 = (arrayBuffer: ArrayBuffer) =>
  new Uint8Array(arrayBuffer);
export const bufferToUint16 = (arrayBuffer: ArrayBuffer) =>
  new Uint16Array(arrayBuffer);
export const bufferToUint32 = (arrayBuffer: ArrayBuffer) =>
  new Uint32Array(arrayBuffer);
export const bufferToInt16 = (arrayBuffer: ArrayBuffer) =>
  new Int16Array(arrayBuffer);
export const bufferToInt32 = (arrayBuffer: ArrayBuffer) =>
  new Int32Array(arrayBuffer);
export const bufferToUint64 = (arrayBuffer: ArrayBuffer) =>
  new BigUint64Array(arrayBuffer);
export const bufferToInt64 = (arrayBuffer: ArrayBuffer) =>
  new BigInt64Array(arrayBuffer);
export const bufferToFloat32 = (arrayBuffer: ArrayBuffer) =>
  new Float32Array(arrayBuffer);
export const bufferToFloat64 = (arrayBuffer: ArrayBuffer) =>
  new Float64Array(arrayBuffer);
export const bufferToString = (arrayBuffer: ArrayBuffer) => {
  const utf8decoder = new TextDecoder();
  return utf8decoder.decode(arrayBuffer);
};
export const bufferToAscii = (arrayBuffer: ArrayBuffer) => {
  const utf8decoder = new TextDecoder("ascii");
  return utf8decoder.decode(arrayBuffer);
};
export const bufferToUTF16 = (arrayBuffer: ArrayBuffer) => {
  const utf8decoder = new TextDecoder("utf-16");
  return utf8decoder.decode(arrayBuffer);
};
export const bufferToUTF32 = (arrayBuffer: ArrayBuffer) => {
  const view = new DataView(arrayBuffer, 0, arrayBuffer.byteLength);
  let result = "";

  for (let i = 0; i < arrayBuffer.byteLength; i += 4) {
    result += String.fromCodePoint(view.getInt32(i, true));
  }

  return result;
};

const bufferToData = (arrayBuffer: ArrayBuffer, type: Datatype) => {
  if (type === Datatype.Int32) {
    return bufferToInt32(arrayBuffer);
  } else if (type === Datatype.Uint64) {
    return bufferToUint64(arrayBuffer);
  } else if (type === Datatype.Int64) {
    return bufferToInt64(arrayBuffer);
  } else if (type === Datatype.Float32) {
    return bufferToFloat32(arrayBuffer);
  } else if (type === Datatype.Float64) {
    return bufferToFloat64(arrayBuffer);
  } else if (type === Datatype.Char) {
    return bufferToString(arrayBuffer);
  } else if (type === Datatype.Int8) {
    return bufferToInt8(arrayBuffer);
  } else if (type === Datatype.Uint8) {
    return bufferToUint8(arrayBuffer);
  } else if (type === Datatype.Int16) {
    return bufferToInt16(arrayBuffer);
  } else if (type === Datatype.Uint16) {
    return bufferToUint16(arrayBuffer);
  } else if (type === Datatype.Uint32) {
    return bufferToUint32(arrayBuffer);
  } else if (type === Datatype.StringAscii) {
    return bufferToAscii(arrayBuffer);
  } else if (type === Datatype.StringUtf8) {
    return bufferToString(arrayBuffer);
  } else if (type === Datatype.StringUtf16) {
    return bufferToUTF16(arrayBuffer);
  } else if (type === Datatype.StringUtf32) {
    return bufferToUTF32(arrayBuffer);
  } else if (type === Datatype.StringUcs2) {
    return bufferToUTF16(arrayBuffer);
  } else if (type === Datatype.StringUcs4) {
    return bufferToUTF32(arrayBuffer);
  }

  return arrayBuffer;
};

export default bufferToData;
