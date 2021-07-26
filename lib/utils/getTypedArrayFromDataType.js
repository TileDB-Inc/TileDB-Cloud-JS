"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const getTypedArrayFromDataType = (type) => {
    if (type === v2_1.Datatype.Int32) {
        return Int32Array;
    }
    else if (type === v2_1.Datatype.Int16) {
        return Int16Array;
    }
    else if (type === v2_1.Datatype.Int8) {
        return Int8Array;
    }
    else if (type === v2_1.Datatype.Int64) {
        return BigInt64Array;
    }
    else if (type === v2_1.Datatype.Uint16) {
        return Uint16Array;
    }
    else if (type === v2_1.Datatype.Uint32) {
        return Uint32Array;
    }
    else if (type === v2_1.Datatype.Uint8) {
        return Uint8Array;
    }
    else if (type === v2_1.Datatype.Uint64) {
        return BigUint64Array;
    }
    else if (type === v2_1.Datatype.Float32) {
        return Float32Array;
    }
    else if (type === v2_1.Datatype.Float64) {
        return Float64Array;
    }
};
exports.default = getTypedArrayFromDataType;
//# sourceMappingURL=getTypedArrayFromDataType.js.map