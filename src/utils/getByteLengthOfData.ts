import { Datatype } from '../v2';
import getTypedArrayFromDataType from './getTypedArrayFromDataType';
import mapToBigIntIfNeeded from './mapToBigIntIfNeeded';

/**
 * Calculate the number of bytes of an array of numbers or strings
 * @param data Array of numbers or strings
 * @param type Datatype (e.g. UINT64, StringUcs2 etc)
 * @returns number of total bytes
 */
const getByteLengthOfData = (data: number[] | string[], type: Datatype) => {
  if (!data.length) {
    return 0;
  }
  const TypedArray = getTypedArrayFromDataType(type);
  // case 1: it's number of arrays
  if (TypedArray) {
    const nums = mapToBigIntIfNeeded(data as number[], type);
    return (TypedArray as Int32ArrayConstructor).from(nums as number[])
      .byteLength;
  }
  // otherwise it's string
  if (type === Datatype.Char || Datatype.StringAscii) {
    return (data as string[]).reduce((accum, str) => accum + str?.length, 0);
  }
  if (type === Datatype.StringUcs2) {
    return (data as string[]).reduce(
      (accum, str) => accum + str?.length * 2,
      0
    );
  }
  if (type === Datatype.StringUcs4) {
    return (data as string[]).reduce(
      (accum, str) => accum + str?.length * 4,
      0
    );
  }

  if (type === Datatype.StringUtf8) {
    const encoder = new TextEncoder();
    const encodedStr = data.map(str => encoder.encode(str));
    return encodedStr.reduce((accum, encodedString) => {
      return accum + encodedString.byteLength;
    }, 0);
  }
};

export default getByteLengthOfData;
