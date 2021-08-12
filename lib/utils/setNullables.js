"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groupValuesByOffsets_1 = __importDefault(require("./groupValuesByOffsets"));
/**
 * Set nullables on an array
 * @param vals [12, 15, 22, 34, 8]
 * @param nullables [0, 1, 1, 0, 1]
 * @param offsets []
 * @returns [NULL, 15, 22, NULL, 8]
 */
const setNullables = (vals, nullables, offsets) => {
    // If values have offsets we group values together by offset
    const valueArray = offsets.length
        ? groupValuesByOffsets_1.default(vals, offsets)
        : vals;
    // We explicitly set as NULL index where nullable array is 0
    return valueArray.map((val, i) => (nullables[i] ? val : null));
};
exports.default = setNullables;
//# sourceMappingURL=setNullables.js.map