"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function range(start, end) {
    return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
}
exports.default = range;
//# sourceMappingURL=range.js.map