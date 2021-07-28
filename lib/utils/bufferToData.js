"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToUTF32 = exports.bufferToUTF16 = exports.bufferToAscii = exports.bufferToString = exports.bufferToFloat64 = exports.bufferToFloat32 = exports.bufferToInt64 = exports.bufferToUint64 = exports.bufferToInt32 = exports.bufferToInt16 = exports.bufferToUint32 = exports.bufferToUint16 = exports.bufferToUint8 = exports.bufferToInt8 = void 0;
const v2_1 = require("../v2");
const mapToBigIntIfNeeded_1 = require("./mapToBigIntIfNeeded");
const typedArrayToArray_1 = __importDefault(require("./typedArrayToArray"));
const bufferToInt8 = (arrayBuffer) => new Int8Array(arrayBuffer);
exports.bufferToInt8 = bufferToInt8;
const bufferToUint8 = (arrayBuffer) => new Uint8Array(arrayBuffer);
exports.bufferToUint8 = bufferToUint8;
const bufferToUint16 = (arrayBuffer) => new Uint16Array(arrayBuffer);
exports.bufferToUint16 = bufferToUint16;
const bufferToUint32 = (arrayBuffer) => new Uint32Array(arrayBuffer);
exports.bufferToUint32 = bufferToUint32;
const bufferToInt16 = (arrayBuffer) => new Int16Array(arrayBuffer);
exports.bufferToInt16 = bufferToInt16;
const bufferToInt32 = (arrayBuffer) => new Int32Array(arrayBuffer);
exports.bufferToInt32 = bufferToInt32;
const bufferToUint64 = (arrayBuffer) => new BigUint64Array(arrayBuffer);
exports.bufferToUint64 = bufferToUint64;
const bufferToInt64 = (arrayBuffer) => new BigInt64Array(arrayBuffer);
exports.bufferToInt64 = bufferToInt64;
const bufferToFloat32 = (arrayBuffer) => new Float32Array(arrayBuffer);
exports.bufferToFloat32 = bufferToFloat32;
const bufferToFloat64 = (arrayBuffer) => new Float64Array(arrayBuffer);
exports.bufferToFloat64 = bufferToFloat64;
const bufferToString = (arrayBuffer) => {
    const utf8decoder = new TextDecoder();
    return utf8decoder.decode(arrayBuffer);
};
exports.bufferToString = bufferToString;
const bufferToAscii = (arrayBuffer) => {
    const utf8decoder = new TextDecoder("ascii");
    return utf8decoder.decode(arrayBuffer);
};
exports.bufferToAscii = bufferToAscii;
const bufferToUTF16 = (arrayBuffer) => {
    const utf8decoder = new TextDecoder("utf-16");
    return utf8decoder.decode(arrayBuffer);
};
exports.bufferToUTF16 = bufferToUTF16;
const bufferToUTF32 = (arrayBuffer) => {
    const view = new DataView(arrayBuffer, 0, arrayBuffer.byteLength);
    let result = "";
    for (let i = 0; i < arrayBuffer.byteLength; i += 4) {
        result += String.fromCodePoint(view.getInt32(i, true));
    }
    return result;
};
exports.bufferToUTF32 = bufferToUTF32;
const bufferToData = (arrayBuffer, type) => {
    if (type === v2_1.Datatype.Int32) {
        return typedArrayToArray_1.default(exports.bufferToInt32(arrayBuffer));
    }
    else if (type === v2_1.Datatype.Uint64) {
        return typedArrayToArray_1.default(exports.bufferToUint64(arrayBuffer));
    }
    else if (type === v2_1.Datatype.Int64) {
        return typedArrayToArray_1.default(exports.bufferToInt64(arrayBuffer));
    }
    else if (type === v2_1.Datatype.Float32) {
        return typedArrayToArray_1.default(exports.bufferToFloat32(arrayBuffer));
    }
    else if (type === v2_1.Datatype.Float64) {
        return typedArrayToArray_1.default(exports.bufferToFloat64(arrayBuffer));
    }
    else if (type === v2_1.Datatype.Char) {
        return exports.bufferToString(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Int8) {
        return typedArrayToArray_1.default(exports.bufferToInt8(arrayBuffer));
    }
    else if (type === v2_1.Datatype.Uint8) {
        return typedArrayToArray_1.default(exports.bufferToUint8(arrayBuffer));
    }
    else if (type === v2_1.Datatype.Int16) {
        return typedArrayToArray_1.default(exports.bufferToInt16(arrayBuffer));
    }
    else if (type === v2_1.Datatype.Uint16) {
        return typedArrayToArray_1.default(exports.bufferToUint16(arrayBuffer));
    }
    else if (type === v2_1.Datatype.Uint32) {
        return typedArrayToArray_1.default(exports.bufferToUint32(arrayBuffer));
    }
    else if (type === v2_1.Datatype.StringAscii) {
        return exports.bufferToAscii(arrayBuffer);
    }
    else if (type === v2_1.Datatype.StringUtf8) {
        return exports.bufferToString(arrayBuffer);
    }
    else if (type === v2_1.Datatype.StringUtf16) {
        return exports.bufferToUTF16(arrayBuffer);
    }
    else if (type === v2_1.Datatype.StringUtf32) {
        return exports.bufferToUTF32(arrayBuffer);
    }
    else if (type === v2_1.Datatype.StringUcs2) {
        return exports.bufferToUTF16(arrayBuffer);
    }
    else if (type === v2_1.Datatype.StringUcs4) {
        return exports.bufferToUTF32(arrayBuffer);
    }
    else if (mapToBigIntIfNeeded_1.int64Types.includes(type)) {
        return typedArrayToArray_1.default(exports.bufferToInt64(arrayBuffer));
    }
    return arrayBuffer;
};
exports.default = bufferToData;
//# sourceMappingURL=bufferToData.js.map