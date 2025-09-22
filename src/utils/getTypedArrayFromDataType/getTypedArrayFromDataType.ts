import { Datatype } from '../../v3';
import { int64Types } from '../mapToBigIntIfNeeded';

/**
 * Get the TypedArray of every type
 */
const getTypedArrayFromDataType = (type: Datatype) => {
  if (type === Datatype.Int32) {
    return Int32Array;
  } else if (type === Datatype.Int16) {
    return Int16Array;
  } else if (type === Datatype.Int8) {
    return Int8Array;
  } else if (type === Datatype.Int64) {
    return BigInt64Array;
  } else if (type === Datatype.Uint16) {
    return Uint16Array;
  } else if (type === Datatype.Uint32) {
    return Uint32Array;
  } else if (type === Datatype.Uint8) {
    return Uint8Array;
  } else if (type === Datatype.Uint64) {
    return BigUint64Array;
  } else if (type === Datatype.Float32) {
    return Float32Array;
  } else if (type === Datatype.Float64) {
    return Float64Array;
  } else if (int64Types.includes(type)) {
    return BigInt64Array;
  }

  return undefined;
};

export default getTypedArrayFromDataType;
