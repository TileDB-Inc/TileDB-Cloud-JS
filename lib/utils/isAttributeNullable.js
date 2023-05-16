"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isDimension_1 = __importDefault(require("./isDimension"));
const isAttributeNullable = (attribute) => {
    if (isDimension_1.default(attribute)) {
        return false;
    }
    return attribute.nullable;
};
exports.default = isAttributeNullable;
//# sourceMappingURL=isAttributeNullable.js.map