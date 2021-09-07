import { Datatype } from "../v2";
/**
 * Calculate the number of bytes of an array of numbers or strings
 * @param data Array of numbers or strings
 * @param type Datatype (e.g. UINT64, StringUcs2 etc)
 * @returns number of total bytes
 */
declare const getByteLengthOfData: (data: number[] | string[], type: Datatype) => number;
export default getByteLengthOfData;
