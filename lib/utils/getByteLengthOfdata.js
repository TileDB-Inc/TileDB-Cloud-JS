"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const getTypedArrayFromDataType_1 = __importDefault(require("./getTypedArrayFromDataType"));
const mapToBigIntIfNeeded_1 = __importDefault(require("./mapToBigIntIfNeeded"));
/**
 * Calculate the number of bytes of an array of numbers or strings
 * @param data Array of numbers or strings
 * @param type Datatype (e.g. UINT64, StringUcs2 etc)
 * @returns number of total bytes
 */
const getByteLengthOfData = (data, type) => {
    if (!data.length) {
        return 0;
    }
    const TypedArray = getTypedArrayFromDataType_1.default(type);
    // case 1: it's number of arrays
    if (TypedArray) {
        const nums = mapToBigIntIfNeeded_1.default(data, type);
        return TypedArray.from(nums).byteLength;
    }
    // otherwise it's string
    if (type === v2_1.Datatype.Char || v2_1.Datatype.StringAscii) {
        return data.reduce((accum, str) => accum + (str === null || str === void 0 ? void 0 : str.length), 0);
    }
    if (type === v2_1.Datatype.StringUcs2) {
        return data.reduce((accum, str) => accum + (str === null || str === void 0 ? void 0 : str.length) * 2, 0);
    }
    if (type === v2_1.Datatype.StringUcs4) {
        return data.reduce((accum, str) => accum + (str === null || str === void 0 ? void 0 : str.length) * 4, 0);
    }
    if (type === v2_1.Datatype.StringUtf8) {
        const encoder = new TextEncoder();
        const encodedStr = data.map((str) => encoder.encode(str));
        return encodedStr.reduce((accum, encodedString) => {
            return accum + encodedString.byteLength;
        }, 0);
    }
};
exports.default = getByteLengthOfData;
//# sourceMappingURL=getByteLengthOfdata.js.map