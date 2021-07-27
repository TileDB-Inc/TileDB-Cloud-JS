"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const flatten_1 = __importDefault(require("./flatten"));
const getTypedArrayFromDataType_1 = __importDefault(require("./getTypedArrayFromDataType"));
const rangesToBuffer_1 = __importDefault(require("./rangesToBuffer"));
const mapToBigIntIfNeeded_1 = __importDefault(require("./mapToBigIntIfNeeded"));
const getByteLengthOfDataType = (data, type) => {
    const TypedArray = getTypedArrayFromDataType_1.default(type);
    // case 1: it's number of arrays
    if (TypedArray) {
        const nums = mapToBigIntIfNeeded_1.default(data, type);
        return TypedArray.from(nums).byteLength;
    }
    // otherwise it's string
    if (type === v2_1.Datatype.Char || v2_1.Datatype.StringAscii) {
        return data.length * 1;
    }
    if (type === v2_1.Datatype.StringUcs2) {
        return data.length * 2;
    }
    if (type === v2_1.Datatype.StringUcs4) {
        return data.length * 4;
    }
    // TODO: get other types
    if (type === v2_1.Datatype.StringUtf8) {
        const encoder = new TextEncoder();
        const encodedStr = data.map((str) => encoder.encode(str));
        return encodedStr.reduce((accum, encodedString) => {
            return accum + encodedString.byteLength;
        }, 0);
    }
};
const isNumberArray = (data) => {
    return typeof data[0] === 'number';
};
const dataToQuery = (data, attributes, dimensions) => {
    if (!data.layout) {
        return data;
    }
    const { bufferSize } = data;
    //   TODO: Distribute buffer size depending on the data's type (e.g. INT64 needs 8 times the bytes of an INT8)
    const AVERAGE_BUFFER_SIZE = Math.floor(bufferSize / (attributes.length * 3));
    const ranges = data.ranges.map((range, i) => {
        const [firstRange] = range;
        const type = dimensions[i].type;
        const isArrayOfArrays = Array.isArray(firstRange);
        const isArrayOfInts = isNumberArray(flatten_1.default(range));
        const bufferSizes = isArrayOfArrays
            ? range.map((r) => getByteLengthOfDataType(r, type))
            : [getByteLengthOfDataType(range, type)];
        const startRanges = isArrayOfArrays ? range.map(r => r[0]) : [firstRange];
        const bufferStartSizes = startRanges.map((startingRange) => getByteLengthOfDataType([startingRange], type));
        /**
         * bufferStartSizes is used only for var length string ascii dimensions,
         * for ints is 0
         */
        if (isArrayOfInts) {
            bufferStartSizes.fill(0);
        }
        return {
            type,
            hasDefaultRange: false,
            buffer: rangesToBuffer_1.default(flatten_1.default(range), type),
            bufferSizes,
            bufferStartSizes,
        };
    });
    const attributeBufferHeaders = attributes.map((attr) => ({
        name: attr.name,
        fixedLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
        validityLenBufferSizeInBytes: 0,
        originalFixedLenBufferSizeInBytes: AVERAGE_BUFFER_SIZE,
        originalVarLenBufferSizeInBytes: AVERAGE_BUFFER_SIZE,
        originalValidityLenBufferSizeInBytes: AVERAGE_BUFFER_SIZE,
    }));
    return {
        attributeBufferHeaders,
        layout: data.layout,
        status: v2_1.Querystatus.Uninitialized,
        type: v2_1.Querytype.Read,
        reader: {
            layout: data.layout,
            subarray: {
                layout: data.layout,
                ranges,
            },
            readState: {
                subarrayPartitioner: {
                    subarray: {
                        layout: data.layout,
                        ranges: [],
                    },
                    budget: [],
                    current: {
                        subarray: {
                            layout: data.layout,
                            ranges: [],
                        },
                    },
                },
            },
        },
    };
};
exports.default = dataToQuery;
//# sourceMappingURL=dataToQuery.js.map