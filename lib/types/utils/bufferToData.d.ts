import { Datatype } from "../v2";
export declare const bufferToInt8: (arrayBuffer: ArrayBuffer) => Int8Array;
export declare const bufferToUint8: (arrayBuffer: ArrayBuffer) => Uint8Array;
export declare const bufferToUint16: (arrayBuffer: ArrayBuffer) => Uint16Array;
export declare const bufferToUint32: (arrayBuffer: ArrayBuffer) => Uint32Array;
export declare const bufferToInt16: (arrayBuffer: ArrayBuffer) => Int16Array;
export declare const bufferToInt32: (arrayBuffer: ArrayBuffer) => Int32Array;
export declare const bufferToUint64: (arrayBuffer: ArrayBuffer) => BigUint64Array;
export declare const bufferToInt64: (arrayBuffer: ArrayBuffer) => BigInt64Array;
export declare const bufferToFloat32: (arrayBuffer: ArrayBuffer) => Float32Array;
export declare const bufferToFloat64: (arrayBuffer: ArrayBuffer) => Float64Array;
export declare const bufferToString: (arrayBuffer: ArrayBuffer) => string;
export declare const bufferToAscii: (arrayBuffer: ArrayBuffer) => string;
export declare const bufferToUTF16: (arrayBuffer: ArrayBuffer) => string;
export declare const bufferToUTF32: (arrayBuffer: ArrayBuffer) => string;
/**
 * Convert an ArrayBuffer to its corresponding type
 */
declare const bufferToData: (arrayBuffer: ArrayBuffer, type: Datatype) => string | ArrayBuffer | number[] | bigint[];
export default bufferToData;
