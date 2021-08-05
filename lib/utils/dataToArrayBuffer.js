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
        const textEncoder = new TextEncoder();
        return textEncoder.encode(data).buffer;
    }
    else if (type === v2_1.Datatype.StringUtf8) {
        const textEncoder = new TextEncoder();
        return textEncoder.encode(data).buffer;
    }
    else if (type === v2_1.Datatype.StringUtf16) {
        return utf16StrToArrayBuffer(data);
    }
    else if (type === v2_1.Datatype.StringUtf32) {
        return utf32StrToArrayBuffer(data);
    }
    else if (type === v2_1.Datatype.StringUcs2) {
        return utf16StrToArrayBuffer(data);
    }
    else if (type === v2_1.Datatype.StringUcs4) {
        return utf32StrToArrayBuffer(data);
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