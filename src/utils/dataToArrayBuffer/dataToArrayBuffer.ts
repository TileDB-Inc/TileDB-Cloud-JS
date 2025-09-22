import { Datatype } from '../../v3';
import getTypedArrayFromDataType from '../getTypedArrayFromDataType';

const dataToArrayBuffer = (
  data: Array<unknown> | ArrayBuffer,
  type: Datatype
): ArrayBuffer => {
  if (type === Datatype.Blob && data instanceof ArrayBuffer) {
    return data;
  }

  if (Array.isArray(data) && data.length === 0) {
    return new ArrayBuffer(0);
  } else if (
    (Array.isArray(data) && typeof data[0] === 'string') ||
    typeof data === 'string'
  ) {
    const dataStr = typeof data === 'string' ? data : data.join('');

    if (
      type === Datatype.StringAscii ||
      type === Datatype.Char ||
      type === Datatype.StringUtf8
    ) {
      // If it's an array of CHARs join them together to a single string
      return new TextEncoder().encode(dataStr).buffer;
    } else if (type === Datatype.StringUtf16 || type === Datatype.StringUcs2) {
      // If it's an array of CHARs join them together to a single string
      return utf16StrToArrayBuffer(dataStr);
    } else if (type === Datatype.StringUtf32 || type === Datatype.StringUcs4) {
      // If it's an array of CHARs join them together to a single string
      return utf32StrToArrayBuffer(dataStr);
    }
  } else if (Array.isArray(data)) {
    const TypedArray = getTypedArrayFromDataType(type);

    if (TypedArray) {
      if (typeof data[0] === 'number') {
        return (
          TypedArray as Exclude<
            typeof TypedArray,
            BigInt64ArrayConstructor | BigUint64ArrayConstructor
          >
        ).from(data as Array<number>).buffer;
      } else if (typeof data[0] === 'bigint') {
        return (
          TypedArray as BigInt64ArrayConstructor | BigUint64ArrayConstructor
        ).from(data as Array<bigint>).buffer;
      }
    }
  }

  throw new Error('Unable to convert data to ArrayBuffer');
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
