"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const getRanges_1 = __importDefault(require("./getRanges"));
const flatten_1 = __importDefault(require("./flatten"));
const dataToQueryWriter = (data, dimensions, valueBuffer) => {
    const attributeBufferHeaders = Object.entries(valueBuffer).map(([key, val]) => {
        const isVarLength = val.offsetsBuffer.byteLength;
        return {
            name: key,
            fixedLenBufferSizeInBytes: val.offsetsBuffer.byteLength || val.valuesBuffer.byteLength,
            varLenBufferSizeInBytes: isVarLength ? val.valuesBuffer.byteLength : 0,
            validityLenBufferSizeInBytes: val.validityBuffer.byteLength,
            originalFixedLenBufferSizeInBytes: val.offsetsBuffer.byteLength || val.valuesBuffer.byteLength,
            originalVarLenBufferSizeInBytes: isVarLength
                ? val.valuesBuffer.byteLength
                : 0,
            originalValidityLenBufferSizeInBytes: val.validityBuffer.byteLength,
        };
    });
    const dimensionDomains = dimensions.map((dim) => {
        if (!dim.domain) {
            return [];
        }
        const [firstValue] = Object.values(dim.domain);
        return firstValue;
    });
    const { subarray: subarrayRanges } = data;
    const hasDefaultRange = subarrayRanges ? false : true;
    const ranges = (0, getRanges_1.default)(subarrayRanges || dimensionDomains, dimensions, hasDefaultRange);
    const subarray = getSubArray(subarrayRanges, dimensions);
    return {
        attributeBufferHeaders,
        layout: data.layout,
        status: v2_1.Querystatus.Uninitialized,
        type: v2_1.Querytype.Write,
        writer: {
            checkCoordDups: false,
            checkCoordOOB: false,
            dedupCoords: false,
            subarray,
            subarrayRanges: {
                layout: data.layout,
                ranges,
            },
        },
    };
};
exports.default = dataToQueryWriter;
const getSubArray = (ranges, dimensions) => {
    const subarray = {
        int8: [],
        uint8: [],
        int16: [],
        uint16: [],
        int32: [],
        uint32: [],
        int64: [],
        uint64: [],
        float32: [],
        float64: [],
    };
    if (!ranges) {
        return subarray;
    }
    const type = dimensions[0].type;
    subarray[type.toLocaleLowerCase()] = (0, flatten_1.default)(ranges);
    return subarray;
};
//# sourceMappingURL=dataToQueryWriter.js.map