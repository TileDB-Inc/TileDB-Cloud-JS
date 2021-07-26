"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const getTypedArrayFromDataType_1 = __importDefault(require("./getTypedArrayFromDataType"));
const rangesToBuffer = (ranges, type) => {
    // TODO: add more types
    const TypedArray = getTypedArrayFromDataType_1.default(type);
    if (TypedArray) {
        return intToUint8(ranges, TypedArray.BYTES_PER_ELEMENT);
    }
    else if (type === v2_1.Datatype.StringAscii) {
        return ranges.map((str) => str.charCodeAt(0));
    }
};
exports.default = rangesToBuffer;
const intToUint8 = (nums, bytesPerElement) => {
    const int8NumsArray = new Array(nums.length * bytesPerElement).fill(0);
    nums.forEach((num, i) => {
        int8NumsArray[i * bytesPerElement] = num;
    });
    return int8NumsArray;
};
//# sourceMappingURL=rangesToBuffer.js.map