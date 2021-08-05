import { Datatype } from "../v2";
import getTypedArrayFromDataType from "./getTypedArrayFromDataType";

const dataToArrayBuffer = (data: any = [], type: Datatype): ArrayBuffer => {
  if (!data.length) {
    return new ArrayBuffer(0);
  }
  const TypedArray = getTypedArrayFromDataType(type);

  if (TypedArray) {
    const typedArray = (TypedArray as Int32ArrayConstructor).from(data);
    return typedArray.buffer;
  } else if (type === Datatype.StringAscii) {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(data).buffer;
  } else if (type === Datatype.StringUtf8) {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(data).buffer;
  } else if (type === Datatype.StringUtf16) {
    return utf16StrToArrayBuffer(data);
  } else if (type === Datatype.StringUtf32) {
    return utf32StrToArrayBuffer(data);
  } else if (type === Datatype.StringUcs2) {
    return utf16StrToArrayBuffer(data);
  } else if (type === Datatype.StringUcs4) {
    return utf32StrToArrayBuffer(data);
  }
};

export default dataToArrayBuffer;

function utf16StrToArrayBuffer(str: string): ArrayBuffer {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function utf32StrToArrayBuffer(str: string): ArrayBuffer {
  var buf = new ArrayBuffer(str.length * 4); // 4 bytes for each char
  var bufView = new Uint32Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
