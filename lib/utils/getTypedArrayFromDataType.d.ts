import { Datatype } from "../v2";
/**
 * Get the TypedArray of every type
 */
declare const getTypedArrayFromDataType: (type: Datatype) => Uint8ArrayConstructor | Int32ArrayConstructor | Int16ArrayConstructor | Int8ArrayConstructor | BigInt64ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | BigUint64ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
export default getTypedArrayFromDataType;
