"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paralleljs_1 = __importDefault(require("paralleljs"));
function range(start, end) {
    return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
}
/**
 * Group values together according to offsets
 * @param vals [1, 2, 3, 4]
 * @param offsets e.g. [0, 3, 4]
 * @returns [[1,2,3], 4]
 */
const groupValuesByOffsetBytes = (values, offsets) => {
    const offsetsLength = offsets.length;
    if (!offsetsLength) {
        return Promise.resolve([values]);
    }
    const offsetIndex = range(0, offsetsLength);
    const offsetIndexTuple = offsets.map((off, i) => [off, offsetIndex[i]]);
    const offsetsP = new paralleljs_1.default(offsetIndexTuple, {
        env: {
            values,
            offsets,
        },
    });
    return new Promise((resolve) => {
        offsetsP
            .map(([offset, i]) => {
            const vals = global.env.values;
            const globalOffsets = global.env.offsets;
            const nextOffset = globalOffsets[i + 1];
            const grpoupedValues = vals.slice(offset, nextOffset);
            return grpoupedValues;
        })
            .then(resolve);
    });
};
exports.default = groupValuesByOffsetBytes;
//# sourceMappingURL=groupValuesByOffsetBytes.js.map