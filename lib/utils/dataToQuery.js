"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const flatten_1 = __importDefault(require("./flatten"));
const getByteLengthOfInt32Array = (nums) => Int32Array.from(nums).byteLength;
const int32ArrayToUint8 = (nums) => {
    const BYTES_FOR_INT32 = Int32Array.BYTES_PER_ELEMENT;
    const int8NumsArray = new Array(nums.length * BYTES_FOR_INT32).fill(0);
    nums.forEach((num, i) => {
        int8NumsArray[i * BYTES_FOR_INT32] = num;
    });
    return int8NumsArray;
};
const dataToQuery = (data, attributes) => {
    if (!data.layout) {
        return data;
    }
    const { bufferSize } = data;
    //   TODO: Distribute buffer size depending on the data's type (e.g. INT64 needs more bytes than INT8)
    const AVERAGE_BUFFER_SIZE = Math.floor(bufferSize / (attributes.length * 3));
    const ranges = data.ranges.map((range) => {
        const [firstRange] = range;
        const isArrayOfArrays = Array.isArray(firstRange);
        const bufferSizes = isArrayOfArrays
            ? range.map((r) => getByteLengthOfInt32Array(r))
            : [getByteLengthOfInt32Array(range)];
        const bufferStartSizes = isArrayOfArrays ? range.map(() => 0) : [0];
        return {
            type: v2_1.Datatype.Int32,
            hasDefaultRange: false,
            buffer: int32ArrayToUint8(flatten_1.default(range)),
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