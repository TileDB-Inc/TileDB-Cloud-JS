"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRanges = void 0;
const v2_1 = require("../v2");
const flatten_1 = __importDefault(require("./flatten"));
const getTypedArrayFromDataType_1 = __importDefault(require("./getTypedArrayFromDataType"));
const rangesToBuffer_1 = __importDefault(require("./rangesToBuffer"));
const mapToBigIntIfNeeded_1 = __importDefault(require("./mapToBigIntIfNeeded"));
/**
 * Calculate the number of bytes of an array of numbers or strings
 * @param data Array of numbers or strings
 * @param type Datatype (e.g. UINT64, StringUcs2 etc)
 * @returns number of total bytes
 */
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
    if (type === v2_1.Datatype.StringUtf8) {
        const encoder = new TextEncoder();
        const encodedStr = data.map((str) => encoder.encode(str));
        return encodedStr.reduce((accum, encodedString) => {
            return accum + encodedString.byteLength;
        }, 0);
    }
};
/**
 * Checks if data is an array of numbers
 * @param data
 * @returns Boolean if data is an array of numbers
 */
const isNumberArray = (data) => {
    return typeof data[0] === 'number';
};
const getRanges = (ranges, dimensions) => {
    return ranges.map((range, i) => {
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
};
exports.getRanges = getRanges;
/**
 * Helper function that takes user data and returns a Query object.
 * Since the Query object is really big we don't expect user to manually set all the values.
 * We get the essential minimal data needed from the user (such as the layout and ranges) and
 * convert it to a Query object.
 * @param data
 * @param attributes
 * @param dimensions
 * @returns Query object
 */
const dataToQuery = (data, attributes, dimensions) => {
    if (!data.layout) {
        return data;
    }
    const { bufferSize } = data;
    //   TODO: Distribute buffer size depending on the data's type (e.g. INT64 needs 8 times the bytes of an INT8)
    const AVERAGE_BUFFER_SIZE = Math.floor(bufferSize / (attributes.length * 3));
    const ranges = exports.getRanges(data.ranges, dimensions);
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