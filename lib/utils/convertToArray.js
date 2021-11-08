"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertToArray = (arrayLike) => {
    if (Array.isArray(arrayLike)) {
        return arrayLike;
    }
    return Array.from(arrayLike);
};
exports.default = convertToArray;
//# sourceMappingURL=convertToArray.js.map