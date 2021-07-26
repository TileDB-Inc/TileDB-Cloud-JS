import { Datatype } from "../v2";
import getTypedArrayFromDataType from "./getTypedArrayFromDataType";

const rangesToBuffer = (ranges: any[], type: Datatype) => {
  // TODO: add more types
  const TypedArray = getTypedArrayFromDataType(type);

  if (TypedArray) {
    return intToUint8(ranges, TypedArray.BYTES_PER_ELEMENT);
  } else if (type === Datatype.StringAscii) {
    return (ranges as string[]).map((str) => str.charCodeAt(0));
  }
};

export default rangesToBuffer;

const intToUint8 = (nums: number[], bytesPerElement: number) => {
  const int8NumsArray = new Array(nums.length * bytesPerElement).fill(0);
  nums.forEach((num, i) => {
    int8NumsArray[i * bytesPerElement] = num;
  });

  return int8NumsArray;
};
