import { Datatype } from "../v2";
declare const getTypedArrayFromDataType: (type: Datatype) => Int32ArrayConstructor | Int16ArrayConstructor | Int8ArrayConstructor | BigInt64ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Uint8ArrayConstructor | BigUint64ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
export default getTypedArrayFromDataType;
