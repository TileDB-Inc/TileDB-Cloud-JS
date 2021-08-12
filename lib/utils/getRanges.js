"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rangesToBuffer_1 = __importDefault(require("./rangesToBuffer"));
const flatten_1 = __importDefault(require("./flatten"));
const getByteLengthOfdata_1 = __importDefault(require("./getByteLengthOfdata"));
/**
 * Checks if data is an array of numbers
 * @param data
 * @returns Boolean if data is an array of numbers
 */
const isNumberArray = (data) => {
    return typeof data[0] === "number";
};
const getRanges = (ranges, dimensions, hasDefaultRange) => {
    return ranges.map((range, i) => {
        const [firstRange] = range;
        const type = dimensions[i].type;
        const isArrayOfArrays = Array.isArray(firstRange);
        const isArrayOfInts = isNumberArray(flatten_1.default(range));
        const isEmpty = !range.length;
        const bufferSizes = isArrayOfArrays
            ? range.map((r) => getByteLengthOfdata_1.default(r, type))
            : [getByteLengthOfdata_1.default(range, type)];
        const startRanges = isArrayOfArrays ? range.map((r) => r[0]) : [firstRange];
        const bufferStartSizes = startRanges.map((startingRange) => {
            if (!startingRange) {
                return 0;
            }
            return getByteLengthOfdata_1.default([startingRange], type);
        });
        /**
         * bufferStartSizes is used only for var length string ascii dimensions,
         * for ints is 0
         */
        if (isArrayOfInts) {
            bufferStartSizes.fill(0);
        }
        return {
            type,
            // TODO: How do we know "hasDefaultRange" ? Is it related with the domain?
            hasDefaultRange: isEmpty || !!hasDefaultRange,
            buffer: rangesToBuffer_1.default(flatten_1.default(range), type),
            bufferSizes,
            bufferStartSizes: isEmpty ? [0] : bufferStartSizes,
        };
    });
};
exports.default = getRanges;
//# sourceMappingURL=getRanges.js.map