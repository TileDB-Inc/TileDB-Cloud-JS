"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isArrayOfArrays = (data) => {
    if (Array.isArray(data) && Array.isArray(data[0])) {
        return true;
    }
    return false;
};
exports.default = isArrayOfArrays;
//# sourceMappingURL=isArrayOfArrays.js.map