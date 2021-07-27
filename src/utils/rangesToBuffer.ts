import { Datatype } from "../v2";
import getTypedArrayFromDataType from "./getTypedArrayFromDataType";
import mapToBigIntIfNeeded from "./mapToBigIntIfNeeded";

const rangesToBuffer = (ranges: any[], type: Datatype) => {
  const TypedArray = getTypedArrayFromDataType(type);

  if (TypedArray) {
    const nums = mapToBigIntIfNeeded(ranges as number[], type);
    const dataview = (TypedArray as any).from(nums);
    const uint8Array = new Uint8Array(dataview.buffer, 0, dataview.byteLength);
    return Array.from(uint8Array);
  } else if (type === Datatype.StringAscii) {
    return (ranges as string[]).map((str) => str.charCodeAt(0));
  }
};

export default rangesToBuffer;
