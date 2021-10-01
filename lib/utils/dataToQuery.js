"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
const getRanges_1 = __importDefault(require("./getRanges"));
const getByteLengthOfDatatype_1 = __importDefault(require("./getByteLengthOfDatatype"));
const emptyRangesToDomain_1 = __importDefault(require("./emptyRangesToDomain"));
const createAttributeBufferHeaders = (attributes, bufferSize) => {
    const MAX_BYTES_PER_ELEMENT_OF_ATTRIBUTES = attributes.reduce((accum, attr) => accum + getMaxByteSizeOfAttribute(attr), 0);
    const attributeBufferHeaders = attributes.map((attr) => {
        const MAX_BYTES_FOR_ATTRIBUTE = getMaxByteSizeOfAttribute(attr);
        const WEIGHT = MAX_BYTES_FOR_ATTRIBUTE / MAX_BYTES_PER_ELEMENT_OF_ATTRIBUTES;
        const BYTES_FOR_ATTRIBUTE = bufferSize * WEIGHT;
        const isVarLength = isAttributeVarLength(attr);
        const isNullable = isAttributeNullable(attr);
        const BYTES_PER_ELEMENT = getByteLengthOfDatatype_1.default(attr.type);
        const BYTE_PER_OFFSET = getByteLengthOfDatatype_1.default(v2_1.Datatype.Uint64);
        const TOTAL_BYTES_PER_ELEMENT = BYTES_FOR_ATTRIBUTE * (BYTES_PER_ELEMENT / MAX_BYTES_FOR_ATTRIBUTE);
        const TOTAL_BYTE_PER_VALIDITY = BYTES_FOR_ATTRIBUTE / MAX_BYTES_FOR_ATTRIBUTE;
        const TOTAL_BYTE_PER_OFFSET = BYTES_FOR_ATTRIBUTE * (BYTE_PER_OFFSET / MAX_BYTES_FOR_ATTRIBUTE);
        const fixedLenBufferSizeInBytes = isVarLength
            ? TOTAL_BYTE_PER_OFFSET
            : TOTAL_BYTES_PER_ELEMENT;
        const varLenBufferSizeInBytes = isVarLength ? TOTAL_BYTES_PER_ELEMENT : 0;
        const validityLenBufferSizeInBytes = isNullable ? TOTAL_BYTE_PER_VALIDITY : 0;
        return {
            name: attr.name,
            fixedLenBufferSizeInBytes: 0,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: 0,
            originalFixedLenBufferSizeInBytes: Math.floor(fixedLenBufferSizeInBytes),
            originalVarLenBufferSizeInBytes: Math.floor(varLenBufferSizeInBytes),
            originalValidityLenBufferSizeInBytes: Math.floor(validityLenBufferSizeInBytes),
        };
    });
    return attributeBufferHeaders;
};
const isDimension = (data) => {
    return data.hasOwnProperty('nullTileExtent');
};
const isAttributeVarLength = (attribute) => {
    if (isDimension(attribute)) {
        // Only StringAscii is var-length dimension
        return attribute.type === v2_1.Datatype.StringAscii;
    }
    return attribute.cellValNum == 4294967295;
};
const isAttributeNullable = (attribute) => {
    if (isDimension(attribute)) {
        return false;
    }
    // TODO: How do i know if attribute is nullable?
    return true;
};
const getMaxByteSizeOfAttribute = (attribute) => {
    const isVarLength = isAttributeVarLength(attribute);
    const isNullable = isAttributeNullable(attribute);
    const BYTES_PER_ELEMENT = getByteLengthOfDatatype_1.default(attribute.type);
    const BYTE_PER_VALIDITY = getByteLengthOfDatatype_1.default(v2_1.Datatype.Uint8);
    const BYTE_PER_OFFSET = getByteLengthOfDatatype_1.default(v2_1.Datatype.Uint64);
    return (Number(isVarLength) * BYTE_PER_OFFSET +
        BYTES_PER_ELEMENT +
        Number(isNullable) * BYTE_PER_VALIDITY);
};
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
    // Use default dimension's Domain for ranges that are set empty []
    const rangesWithDomain = emptyRangesToDomain_1.default(data.ranges, dimensions);
    const ranges = getRanges_1.default(rangesWithDomain, dimensions);
    const attributeBufferHeaders = createAttributeBufferHeaders([...attributes, ...dimensions], bufferSize);
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