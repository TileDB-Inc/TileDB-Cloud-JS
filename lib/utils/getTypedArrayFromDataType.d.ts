import { Datatype } from "../v2";
/**
 * Get the TypedArray of every type
 */
declare const getTypedArrayFromDataType: (type: Datatype) => Uint16ArrayConstructor | Uint8ArrayConstructor | Float64ArrayConstructor | Int32ArrayConstructor | Int16ArrayConstructor | Int8ArrayConstructor | BigInt64ArrayConstructor | Uint32ArrayConstructor | BigUint64ArrayConstructor | Float32ArrayConstructor;
export default getTypedArrayFromDataType;
