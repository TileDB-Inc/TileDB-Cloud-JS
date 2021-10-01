import { Datatype } from "../v2";
export declare const int64Types: Datatype[];
/**
 * If the type is an INT64 (e.g. Datetimes or Uint64 or Int64)
 * we convert the number array to an array of BigInts.
 */
declare const mapToBigIntIfNeeded: (data: number[], type: Datatype) => (number | BigInt)[];
export default mapToBigIntIfNeeded;
