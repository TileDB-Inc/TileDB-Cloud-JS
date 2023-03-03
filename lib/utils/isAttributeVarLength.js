"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const isDimension_1 = __importDefault(require("./isDimension"));
const isAttributeVarLength = (attribute) => {
    if ((0, isDimension_1.default)(attribute)) {
        // Only StringAscii is var-length dimension
        return attribute.type === v2_1.Datatype.StringAscii;
    }
    return attribute.cellValNum == 4294967295;
};
exports.default = isAttributeVarLength;
//# sourceMappingURL=isAttributeVarLength.js.map