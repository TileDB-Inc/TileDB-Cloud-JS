"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const dataToQuery = (data, attributes) => {
    const { bufferSize } = data;
    //   TODO: Distribute buffer size depending on the data's type (e.g. INT64 needs more bytes than INT8)
    const AVERAGE_BUFFER_SIZE = Math.floor(bufferSize / (attributes.length * 3));
    const ranges = data.ranges.map((range) => {
        const BYTE_LENGTH = Int32Array.BYTES_PER_ELEMENT * range.length;
        return {
            type: v2_1.Datatype.Int32,
            hasDefaultRange: false,
            buffer: range,
            bufferSizes: [BYTE_LENGTH],
            bufferStartSizes: [0],
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