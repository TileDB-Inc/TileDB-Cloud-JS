import { Datatype } from "../v2";
declare const mapToBigIntIfNeeded: (data: number[], type: Datatype) => (number | BigInt)[];
export default mapToBigIntIfNeeded;
