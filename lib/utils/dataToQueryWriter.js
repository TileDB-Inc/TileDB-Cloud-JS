"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const getRanges_1 = __importDefault(require("./getRanges"));
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
    const ranges = getRanges_1.default(dimensionDomains, dimensions, true);
    return {
        attributeBufferHeaders,
        layout: data.layout,
        status: v2_1.Querystatus.Uninitialized,
        type: v2_1.Querytype.Write,
        writer: {
            checkCoordDups: false,
            checkCoordOOB: false,
            dedupCoords: false,
            subarray: {
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
            },
            subarrayRanges: {
                layout: data.layout,
                ranges,
            },
        },
    };
};
exports.default = dataToQueryWriter;
//# sourceMappingURL=dataToQueryWriter.js.map