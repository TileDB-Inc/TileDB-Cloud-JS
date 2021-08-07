"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const getRanges_1 = __importDefault(require("./getRanges"));
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
    const ranges = getRanges_1.default(data.ranges, dimensions);
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