import { Datatype } from "../v2";
import flatten from "./flatten";
import getTypedArrayFromDataType from "./getTypedArrayFromDataType";
import mapToBigIntIfNeeded from "./mapToBigIntIfNeeded";

/**
 * Convert user defined ranges to a Uint8Array
 */
const rangesToBuffer = (ranges: any[], type: Datatype) => {
  const TypedArray = getTypedArrayFromDataType(type);

  if (TypedArray) {
    const nums = mapToBigIntIfNeeded(ranges as number[], type);
    const dataview = (TypedArray as any).from(nums);
    const uint8Array = new Uint8Array(dataview.buffer, 0, dataview.byteLength);
    return Array.from(uint8Array);
  } else if (type === Datatype.StringAscii) {
    const asciiArray = (ranges as string[]).reduce((arr, str) => {
      const charCodes = str.split('').map((s,i) => str.charCodeAt(i));
      return [...arr, ...charCodes];
    }, []);
    return flatten(asciiArray);
  }
};

export default rangesToBuffer;
