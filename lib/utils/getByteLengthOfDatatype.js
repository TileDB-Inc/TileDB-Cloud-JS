"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const getTypedArrayFromDataType_1 = __importDefault(require("./getTypedArrayFromDataType"));
/**
 * Get the byte length of an individual element of every Datatype
 */
const getByteLengthOfDatatype = (type) => {
    const TypedArray = (0, getTypedArrayFromDataType_1.default)(type);
    if (TypedArray) {
        return TypedArray.BYTES_PER_ELEMENT;
    }
    else if (type === v2_1.Datatype.StringAscii || type === v2_1.Datatype.Char || type === v2_1.Datatype.StringUtf8) {
        return 1;
    }
    else if (type === v2_1.Datatype.StringUcs2 || type === v2_1.Datatype.StringUtf16) {
        return 2;
    }
    else if (type === v2_1.Datatype.StringUtf32 || type === v2_1.Datatype.StringUcs4) {
        return 4;
    }
};
exports.default = getByteLengthOfDatatype;
//# sourceMappingURL=getByteLengthOfDatatype.js.map