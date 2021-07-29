"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const getTypedArrayFromDataType_1 = __importDefault(require("./getTypedArrayFromDataType"));
const mapToBigIntIfNeeded_1 = __importDefault(require("./mapToBigIntIfNeeded"));
/**
 * Convert user defined ranges to a Uint8Array
 */
const rangesToBuffer = (ranges, type) => {
    const TypedArray = getTypedArrayFromDataType_1.default(type);
    if (TypedArray) {
        const nums = mapToBigIntIfNeeded_1.default(ranges, type);
        const dataview = TypedArray.from(nums);
        const uint8Array = new Uint8Array(dataview.buffer, 0, dataview.byteLength);
        return Array.from(uint8Array);
    }
    else if (type === v2_1.Datatype.StringAscii) {
        return ranges.map((str) => str.charCodeAt(0));
    }
};
exports.default = rangesToBuffer;
//# sourceMappingURL=rangesToBuffer.js.map