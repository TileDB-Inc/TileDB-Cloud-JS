import { Datatype } from '../v2';
import getTypedArrayFromDataType from './getTypedArrayFromDataType';

/**
 * Get the byte length of an individual element of every Datatype
 */
const getByteLengthOfDatatype = (type: Datatype) => {
  const TypedArray = getTypedArrayFromDataType(type);

  if (TypedArray) {
    return TypedArray.BYTES_PER_ELEMENT;
  } else if (
    type === Datatype.StringAscii ||
    type === Datatype.Char ||
    type === Datatype.Blob ||
    type === Datatype.StringUtf8
  ) {
    return 1;
  } else if (type === Datatype.StringUcs2 || type === Datatype.StringUtf16) {
    return 2;
  } else if (type === Datatype.StringUtf32 || type === Datatype.StringUcs4) {
    return 4;
  }
};

export default getByteLengthOfDatatype;
