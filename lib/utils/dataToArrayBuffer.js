"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const getTypedArrayFromDataType_1 = __importDefault(require("./getTypedArrayFromDataType"));
const dataToArrayBuffer = (data = [], type) => {
    if (!data.length) {
        return new ArrayBuffer(0);
    }
    const TypedArray = getTypedArrayFromDataType_1.default(type);
    if (TypedArray) {
        const typedArray = TypedArray.from(data);
        return typedArray.buffer;
    }
    else if (type === v2_1.Datatype.StringAscii) {
        // If it's an array of CHARs join them together to a single string
        const str = Array.isArray(data) ? data.join('') : data;
        const textEncoder = new TextEncoder();
        return textEncoder.encode(str).buffer;
    }
    else if (type === v2_1.Datatype.StringUtf8) {
        // If it's an array of CHARs join them together to a single string
        const str = Array.isArray(data) ? data.join('') : data;
        const textEncoder = new TextEncoder();
        return textEncoder.encode(str).buffer;
    }
    else if (type === v2_1.Datatype.StringUtf16) {
        // If it's an array of CHARs join them together to a single string
        const str = Array.isArray(data) ? data.join('') : data;
        return utf16StrToArrayBuffer(str);
    }
    else if (type === v2_1.Datatype.StringUtf32) {
        // If it's an array of CHARs join them together to a single string
        const str = Array.isArray(data) ? data.join('') : data;
        return utf32StrToArrayBuffer(str);
    }
    else if (type === v2_1.Datatype.StringUcs2) {
        // If it's an array of CHARs join them together to a single string
        const str = Array.isArray(data) ? data.join('') : data;
        return utf16StrToArrayBuffer(str);
    }
    else if (type === v2_1.Datatype.StringUcs4) {
        // If it's an array of CHARs join them together to a single string
        const str = Array.isArray(data) ? data.join('') : data;
        return utf32StrToArrayBuffer(str);
    }
};
exports.default = dataToArrayBuffer;
function utf16StrToArrayBuffer(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
function utf32StrToArrayBuffer(str) {
    var buf = new ArrayBuffer(str.length * 4); // 4 bytes for each char
    var bufView = new Uint32Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
//# sourceMappingURL=dataToArrayBuffer.js.map