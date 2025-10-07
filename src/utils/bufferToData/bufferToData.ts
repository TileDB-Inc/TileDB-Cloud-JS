import { Datatype } from '../../v3';
import { int64Types } from '../mapToBigIntIfNeeded';
import typedArrayToArray from '../typedArrayToArray';

export const bufferToInt8 = (arrayBuffer: ArrayBufferView) => {
  if (arrayBuffer.byteLength % Int8Array.BYTES_PER_ELEMENT !== 0) {
    throw new Error(
      `Incompatible buffer size. Buffer size with size ${arrayBuffer.byteLength} should be a multiple of ${Int8Array.BYTES_PER_ELEMENT}`
    );
  }

  return new Int8Array(
    arrayBuffer.buffer,
    arrayBuffer.byteOffset,
    arrayBuffer.byteLength / Int8Array.BYTES_PER_ELEMENT
  );
};
export const bufferToUint8 = (arrayBuffer: ArrayBufferView) => {
  if (arrayBuffer.byteLength % Uint8Array.BYTES_PER_ELEMENT !== 0) {
    throw new Error(
      `Incompatible buffer size. Buffer size with size ${arrayBuffer.byteLength} should be a multiple of ${Uint8Array.BYTES_PER_ELEMENT}`
    );
  }

  return new Uint8Array(
    arrayBuffer.buffer,
    arrayBuffer.byteOffset,
    arrayBuffer.byteLength / Uint8Array.BYTES_PER_ELEMENT
  );
};
export const bufferToInt16 = (arrayBuffer: ArrayBufferView) => {
  if (arrayBuffer.byteLength % Int16Array.BYTES_PER_ELEMENT !== 0) {
    throw new Error(
      `Incompatible buffer size. Buffer size with size ${arrayBuffer.byteLength} should be a multiple of ${Int16Array.BYTES_PER_ELEMENT}`
    );
  }

  if (arrayBuffer.byteOffset % Int16Array.BYTES_PER_ELEMENT !== 0) {
    return new Int16Array(
      arrayBuffer.buffer.slice(
        arrayBuffer.byteOffset,
        arrayBuffer.byteOffset + arrayBuffer.byteLength
      )
    );
  }

  return new Int16Array(
    arrayBuffer.buffer,
    arrayBuffer.byteOffset,
    arrayBuffer.byteLength / Int16Array.BYTES_PER_ELEMENT
  );
};
export const bufferToUint16 = (arrayBuffer: ArrayBufferView) => {
  if (arrayBuffer.byteLength % Uint16Array.BYTES_PER_ELEMENT !== 0) {
    throw new Error(
      `Incompatible buffer size. Buffer size with size ${arrayBuffer.byteLength} should be a multiple of ${Uint16Array.BYTES_PER_ELEMENT}`
    );
  }

  if (arrayBuffer.byteOffset % Uint16Array.BYTES_PER_ELEMENT !== 0) {
    return new Uint16Array(
      arrayBuffer.buffer.slice(
        arrayBuffer.byteOffset,
        arrayBuffer.byteOffset + arrayBuffer.byteLength
      )
    );
  }

  return new Uint16Array(
    arrayBuffer.buffer,
    arrayBuffer.byteOffset,
    arrayBuffer.byteLength / Uint16Array.BYTES_PER_ELEMENT
  );
};
export const bufferToInt32 = (arrayBuffer: ArrayBufferView) => {
  if (arrayBuffer.byteLength % Int32Array.BYTES_PER_ELEMENT !== 0) {
    throw new Error(
      `Incompatible buffer size. Buffer size with size ${arrayBuffer.byteLength} should be a multiple of ${Int32Array.BYTES_PER_ELEMENT}`
    );
  }

  if (arrayBuffer.byteOffset % Int32Array.BYTES_PER_ELEMENT !== 0) {
    return new Int32Array(
      arrayBuffer.buffer.slice(
        arrayBuffer.byteOffset,
        arrayBuffer.byteOffset + arrayBuffer.byteLength
      )
    );
  }

  return new Int32Array(
    arrayBuffer.buffer,
    arrayBuffer.byteOffset,
    arrayBuffer.byteLength / Int32Array.BYTES_PER_ELEMENT
  );
};
export const bufferToUint32 = (arrayBuffer: ArrayBufferView) => {
  if (arrayBuffer.byteLength % Uint32Array.BYTES_PER_ELEMENT !== 0) {
    throw new Error(
      `Incompatible buffer size. Buffer size with size ${arrayBuffer.byteLength} should be a multiple of ${Uint32Array.BYTES_PER_ELEMENT}`
    );
  }

  if (arrayBuffer.byteOffset % Uint32Array.BYTES_PER_ELEMENT !== 0) {
    return new Uint32Array(
      arrayBuffer.buffer.slice(
        arrayBuffer.byteOffset,
        arrayBuffer.byteOffset + arrayBuffer.byteLength
      )
    );
  }

  return new Uint32Array(
    arrayBuffer.buffer,
    arrayBuffer.byteOffset,
    arrayBuffer.byteLength / Uint32Array.BYTES_PER_ELEMENT
  );
};
export const bufferToInt64 = (arrayBuffer: ArrayBufferView) => {
  if (arrayBuffer.byteLength % BigInt64Array.BYTES_PER_ELEMENT !== 0) {
    throw new Error(
      `Incompatible buffer size. Buffer size with size ${arrayBuffer.byteLength} should be a multiple of ${BigInt64Array.BYTES_PER_ELEMENT}`
    );
  }

  if (arrayBuffer.byteOffset % BigInt64Array.BYTES_PER_ELEMENT !== 0) {
    return new BigInt64Array(
      arrayBuffer.buffer.slice(
        arrayBuffer.byteOffset,
        arrayBuffer.byteOffset + arrayBuffer.byteLength
      )
    );
  }

  return new BigInt64Array(
    arrayBuffer.buffer,
    arrayBuffer.byteOffset,
    arrayBuffer.byteLength / BigInt64Array.BYTES_PER_ELEMENT
  );
};
export const bufferToUint64 = (arrayBuffer: ArrayBufferView) => {
  if (arrayBuffer.byteLength % BigUint64Array.BYTES_PER_ELEMENT !== 0) {
    throw new Error(
      `Incompatible buffer size. Buffer size with size ${arrayBuffer.byteLength} should be a multiple of ${BigUint64Array.BYTES_PER_ELEMENT}`
    );
  }

  if (arrayBuffer.byteOffset % BigUint64Array.BYTES_PER_ELEMENT !== 0) {
    return new BigUint64Array(
      arrayBuffer.buffer.slice(
        arrayBuffer.byteOffset,
        arrayBuffer.byteOffset + arrayBuffer.byteLength
      )
    );
  }

  return new BigUint64Array(
    arrayBuffer.buffer,
    arrayBuffer.byteOffset,
    arrayBuffer.byteLength / BigUint64Array.BYTES_PER_ELEMENT
  );
};
export const bufferToFloat32 = (arrayBuffer: ArrayBufferView) => {
  if (arrayBuffer.byteLength % Float32Array.BYTES_PER_ELEMENT !== 0) {
    throw new Error(
      `Incompatible buffer size. Buffer size with size ${arrayBuffer.byteLength} should be a multiple of ${Float32Array.BYTES_PER_ELEMENT}`
    );
  }

  if (arrayBuffer.byteOffset % Float32Array.BYTES_PER_ELEMENT !== 0) {
    return new Float32Array(
      arrayBuffer.buffer.slice(
        arrayBuffer.byteOffset,
        arrayBuffer.byteOffset + arrayBuffer.byteLength
      )
    );
  }

  return new Float32Array(
    arrayBuffer.buffer,
    arrayBuffer.byteOffset,
    arrayBuffer.byteLength / Float32Array.BYTES_PER_ELEMENT
  );
};
export const bufferToFloat64 = (arrayBuffer: ArrayBufferView) => {
  if (arrayBuffer.byteLength % Float64Array.BYTES_PER_ELEMENT !== 0) {
    throw new Error(
      `Incompatible buffer size. Buffer size with size ${arrayBuffer.byteLength} should be a multiple of ${Float64Array.BYTES_PER_ELEMENT}`
    );
  }

  if (arrayBuffer.byteOffset % Float64Array.BYTES_PER_ELEMENT !== 0) {
    return new Float64Array(
      arrayBuffer.buffer.slice(
        arrayBuffer.byteOffset,
        arrayBuffer.byteOffset + arrayBuffer.byteLength
      )
    );
  }

  return new Float64Array(
    arrayBuffer.buffer,
    arrayBuffer.byteOffset,
    arrayBuffer.byteLength / Float64Array.BYTES_PER_ELEMENT
  );
};
export const bufferToString = (arrayBuffer: ArrayBufferView) => {
  const utf8decoder = new TextDecoder();
  return utf8decoder.decode(arrayBuffer);
};
export const bufferToAscii = (arrayBuffer: ArrayBufferView) => {
  const utf8decoder = new TextDecoder('ascii');
  return utf8decoder.decode(arrayBuffer);
};
export const bufferToUTF16 = (arrayBuffer: ArrayBufferView) => {
  const utf8decoder = new TextDecoder('utf-16');
  return utf8decoder.decode(arrayBuffer);
};
export const bufferToUTF32 = (arrayBuffer: ArrayBufferView) => {
  const view = new DataView(
    arrayBuffer.buffer,
    arrayBuffer.byteOffset,
    arrayBuffer.byteLength
  );
  let result = '';

  for (let i = 0; i < arrayBuffer.byteLength; i += 4) {
    result += String.fromCodePoint(view.getInt32(i, true));
  }

  return result;
};

/**
 * Convert an ArrayBuffer to its corresponding type
 */
const bufferToData = (
  arrayBuffer: ArrayBufferView<ArrayBuffer>,
  type: Datatype
) => {
  if (type === Datatype.Int32) {
    return typedArrayToArray(bufferToInt32(arrayBuffer));
  } else if (type === Datatype.Uint64) {
    return typedArrayToArray(bufferToUint64(arrayBuffer));
  } else if (type === Datatype.Int64) {
    return typedArrayToArray(bufferToInt64(arrayBuffer));
  } else if (type === Datatype.Float32) {
    return typedArrayToArray(bufferToFloat32(arrayBuffer));
  } else if (type === Datatype.Float64) {
    return typedArrayToArray(bufferToFloat64(arrayBuffer));
  } else if (type === Datatype.Char) {
    const charCodes = typedArrayToArray(bufferToUint8(arrayBuffer));
    return String.fromCharCode(...charCodes);
  } else if (type === Datatype.Int8) {
    return typedArrayToArray(bufferToInt8(arrayBuffer));
  } else if (type === Datatype.Uint8) {
    return typedArrayToArray(bufferToUint8(arrayBuffer));
  } else if (type === Datatype.Int16) {
    return typedArrayToArray(bufferToInt16(arrayBuffer));
  } else if (type === Datatype.Uint16) {
    return typedArrayToArray(bufferToUint16(arrayBuffer));
  } else if (type === Datatype.Uint32) {
    return typedArrayToArray(bufferToUint32(arrayBuffer));
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
  } else if (int64Types.includes(type)) {
    return typedArrayToArray(bufferToInt64(arrayBuffer));
  } else if (type === Datatype.Blob) {
    return arrayBuffer.buffer.slice(
      arrayBuffer.byteLength,
      arrayBuffer.byteOffset + arrayBuffer.byteLength
    );
  }

  return arrayBuffer.buffer;
};

export default bufferToData;
