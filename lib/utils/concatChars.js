"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * If result is an array of arrays of characters, eg:
 * [['T', 'i', 'l', 'e', 'D', 'B'], ['C', 'l', 'o', 'u', 'd']]
 * We concat characters to create an array of strings
 * ['TileDB', 'Cloud']
 */
const concatChars = (strings) => strings.map((s) => s === null || s === void 0 ? void 0 : s.join(""));
exports.default = concatChars;
//# sourceMappingURL=concatChars.js.map