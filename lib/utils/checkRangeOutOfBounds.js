"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkRangeOutOfBounds = (range, bounds) => {
    const [lowerBound, highBound] = bounds;
    const rangeNumbers = range.flat();
    return rangeNumbers.every((r) => r >= lowerBound && r <= highBound);
};
exports.default = checkRangeOutOfBounds;
//# sourceMappingURL=checkRangeOutOfBounds.js.map