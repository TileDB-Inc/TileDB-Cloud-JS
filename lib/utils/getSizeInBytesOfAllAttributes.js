"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAttributeSizeInBytes_1 = __importDefault(require("./getAttributeSizeInBytes"));
/**
 * Calculate the total bytes of all the attributes
 * @param attributes
 * @returns number of the total bytes of all the attributes
 */
const getSizeInBytesOfAllAttributes = (attributes) => attributes.reduce((accum, attr) => accum + (0, getAttributeSizeInBytes_1.default)(attr), 0);
exports.default = getSizeInBytesOfAllAttributes;
//# sourceMappingURL=getSizeInBytesOfAllAttributes.js.map