import { Datatype } from '../v2';
import getTypedArrayFromDataType from './getTypedArrayFromDataType';

const dataToArrayBuffer = (data: any = [], type: Datatype): ArrayBuffer => {
  if (!data.length) {
    return new ArrayBuffer(0);
  }
  const TypedArray = getTypedArrayFromDataType(type);

  if (TypedArray) {
    const typedArray = (TypedArray as Int32ArrayConstructor).from(data);
    return typedArray.buffer;
  } else if (type === Datatype.StringAscii || type === Datatype.Char) {
    // If it's an array of CHARs join them together to a single string
    const str = Array.isArray(data) ? data.join('') : data;
    const textEncoder = new TextEncoder();
    return textEncoder.encode(str).buffer;
  } else if (type === Datatype.StringUtf8) {
    // If it's an array of CHARs join them together to a single string
    const str = Array.isArray(data) ? data.join('') : data;
    const textEncoder = new TextEncoder();
    return textEncoder.encode(str).buffer;
  } else if (type === Datatype.StringUtf16) {
    // If it's an array of CHARs join them together to a single string
    const str = Array.isArray(data) ? data.join('') : data;
    return utf16StrToArrayBuffer(str);
  } else if (type === Datatype.StringUtf32) {
    // If it's an array of CHARs join them together to a single string
    const str = Array.isArray(data) ? data.join('') : data;
    return utf32StrToArrayBuffer(str);
  } else if (type === Datatype.StringUcs2) {
    // If it's an array of CHARs join them together to a single string
    const str = Array.isArray(data) ? data.join('') : data;
    return utf16StrToArrayBuffer(str);
  } else if (type === Datatype.StringUcs4) {
    // If it's an array of CHARs join them together to a single string
    const str = Array.isArray(data) ? data.join('') : data;
    return utf32StrToArrayBuffer(str);
  } else if (type === Datatype.Blob) {
    return data;
  }
};

export default dataToArrayBuffer;

function utf16StrToArrayBuffer(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function utf32StrToArrayBuffer(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length * 4); // 4 bytes for each char
  const bufView = new Uint32Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
