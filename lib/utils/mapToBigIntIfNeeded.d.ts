import { Datatype } from "../v2";
export declare const int64Types: Datatype[];
declare const mapToBigIntIfNeeded: (data: number[], type: Datatype) => (number | BigInt)[];
export default mapToBigIntIfNeeded;
