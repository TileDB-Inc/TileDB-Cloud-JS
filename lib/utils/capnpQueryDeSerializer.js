"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeMapUInt64 = exports.deserializeMapFloat64 = exports.deserializeStats = exports.deserializeSubarray = exports.deserializeDomainArray = exports.deserializeWrite = exports.deserializeQueryReader = exports.deserializeConfig = exports.deserializeArray = void 0;
const query_capnp_1 = require("../capnp/query_capnp");
const capnp = __importStar(require("capnp-ts"));
/**
 * Deserializes an ArrayBuffer to a Query object
 * @param buffer ArrayBuffer of the capnp Query object
 * @returns Query object
 */
const capnpQueryDeSerializer = (buffer) => {
    const message = new capnp.Message(buffer, false);
    const query = message.getRoot(query_capnp_1.Query);
    return {
        attributeBufferHeaders: deserializeAttributeBufferHeaders(query),
        layout: query.getLayout(),
        status: query.getStatus(),
        type: query.getType(),
        writer: (0, exports.deserializeWrite)(query),
        reader: (0, exports.deserializeQueryReader)(query.getReader()),
        array: (0, exports.deserializeArray)(query.getArray()),
        totalFixedLengthBufferBytes: query
            .getTotalFixedLengthBufferBytes()
            .toNumber(),
        totalVarLenBufferBytes: query
            .getTotalVarLenBufferBytes()
            .toNumber(),
        totalValidityBufferBytes: query
            .getTotalValidityBufferBytes()
            .toNumber(),
        varOffsetsMode: query.getVarOffsetsMode(),
        varOffsetsAddExtraElement: query.getVarOffsetsAddExtraElement(),
        varOffsetsBitsize: query.getVarOffsetsBitsize(),
        config: (0, exports.deserializeConfig)(query.getConfig()),
        stats: (0, exports.deserializeStats)(query.getStats()),
    };
};
exports.default = capnpQueryDeSerializer;
const deserializeArray = (arr) => {
    return {
        endTimestamp: arr.getEndTimestamp().toNumber(),
        queryType: arr.getQueryType(),
        uri: arr.getUri(),
        startTimestamp: arr.getStartTimestamp().toNumber(),
    };
};
exports.deserializeArray = deserializeArray;
const deserializeConfig = (config) => {
    const entries = config.getEntries().map((entry) => ({
        key: entry.getKey(),
        value: entry.getValue(),
    }));
    return { entries };
};
exports.deserializeConfig = deserializeConfig;
const deserializeQueryReader = (reader) => {
    return {
        layout: reader.getLayout(),
        subarray: (0, exports.deserializeSubarray)(reader.getSubarray()),
        readState: deserializeReadState(reader.getReadState()),
        condition: deserializeCondition(reader.getCondition()),
        stats: (0, exports.deserializeStats)(reader.getStats()),
    };
};
exports.deserializeQueryReader = deserializeQueryReader;
const deserializeCondition = (condition) => {
    return {
        clauses: condition.getClauses().map(deserializeConditionClause),
        clauseCombinationOps: condition
            .getClauseCombinationOps()
            .map((op) => op.toString()),
    };
};
const deserializeConditionClause = (conditionClause) => {
    return {
        fieldName: conditionClause.getFieldName(),
        // TODO: What kind of Data type? Is it an array of numbers?
        value: conditionClause.getValue().toArray(),
        op: conditionClause.getOp(),
    };
};
const deserializeReadState = (readState) => {
    return {
        overflowed: readState.getOverflowed(),
        unsplittable: readState.getUnsplittable(),
        initialized: readState.getInitialized(),
        subarrayPartitioner: deserializeSubarrayPartitioner(readState.getSubarrayPartitioner()),
    };
};
const deserializeSubarrayPartitioner = (subArrayPartitioner) => {
    return {
        subarray: (0, exports.deserializeSubarray)(subArrayPartitioner.getSubarray()),
        budget: deserializeAttributeBufferSize(subArrayPartitioner.getBudget()),
        current: deserializeSubarrayPartitionerPartitionInfo(subArrayPartitioner.getCurrent()),
        state: deserializeSubarrayPartitionerState(subArrayPartitioner.getState()),
        memoryBudget: subArrayPartitioner
            .getMemoryBudget().toNumber(),
        memoryBudgetVar: subArrayPartitioner
            .getMemoryBudgetVar().toNumber(),
        memoryBudgetValidity: subArrayPartitioner
            .getMemoryBudgetValidity().toNumber(),
        stats: (0, exports.deserializeStats)(subArrayPartitioner.getStats()),
    };
};
const deserializeSubarrayPartitionerState = (partitionerState) => {
    return {
        start: partitionerState.getStart().toNumber(),
        end: partitionerState.getEnd().toNumber(),
        singleRange: partitionerState
            .getSingleRange()
            .map((singleRange) => (0, exports.deserializeSubarray)(singleRange)),
        multiRange: partitionerState
            .getMultiRange()
            .map((singleRange) => (0, exports.deserializeSubarray)(singleRange)),
    };
};
const deserializeSubarrayPartitionerPartitionInfo = (partitionInfo) => {
    return {
        subarray: (0, exports.deserializeSubarray)(partitionInfo.getSubarray()),
        start: partitionInfo.getStart().toNumber(),
        end: partitionInfo.getEnd().toNumber(),
        splitMultiRange: partitionInfo.getSplitMultiRange(),
    };
};
const deserializeAttributeBufferSize = (attrBufferSizeList) => {
    return attrBufferSizeList.map((attr) => ({
        attribute: attr.getAttribute(),
    }));
};
const deserializeAttributeBufferHeaders = (query) => {
    return query.getAttributeBufferHeaders().map((attrBufferHeader) => {
        return {
            name: attrBufferHeader.getName(),
            fixedLenBufferSizeInBytes: attrBufferHeader
                .getFixedLenBufferSizeInBytes().toNumber(),
            varLenBufferSizeInBytes: attrBufferHeader
                .getVarLenBufferSizeInBytes().toNumber(),
            validityLenBufferSizeInBytes: attrBufferHeader
                .getValidityLenBufferSizeInBytes().toNumber(),
            originalFixedLenBufferSizeInBytes: attrBufferHeader
                .getOriginalFixedLenBufferSizeInBytes().toNumber(),
            originalVarLenBufferSizeInBytes: attrBufferHeader
                .getOriginalVarLenBufferSizeInBytes().toNumber(),
            originalValidityLenBufferSizeInBytes: attrBufferHeader
                .getOriginalValidityLenBufferSizeInBytes().toNumber(),
        };
    });
};
const deserializeWrite = (query) => {
    const writer = query.getWriter();
    return {
        checkCoordDups: writer.getCheckCoordDups(),
        checkCoordOOB: writer.getCheckCoordOOB(),
        dedupCoords: writer.getDedupCoords(),
        subarray: (0, exports.deserializeDomainArray)(writer.getSubarray()),
        subarrayRanges: (0, exports.deserializeSubarray)(writer.getSubarrayRanges()),
        stats: (0, exports.deserializeStats)(writer.getStats()),
    };
};
exports.deserializeWrite = deserializeWrite;
const deserializeDomainArray = (domainArray) => {
    return {
        int8: domainArray.getInt8().toArray(),
        uint8: domainArray.getUint8().toArray(),
        int16: domainArray.getInt16().toArray(),
        uint16: domainArray.getUint16().toArray(),
        int32: domainArray.getInt32().toArray(),
        uint32: domainArray.getUint32().toArray(),
        int64: domainArray.getInt64().toArray(),
        uint64: domainArray.getUint64().toArray(),
        float32: domainArray.getFloat32().toArray(),
        float64: domainArray.getFloat64().toArray(),
    };
};
exports.deserializeDomainArray = deserializeDomainArray;
const deserializeSubarray = (subArray) => {
    return ({
        layout: subArray.getLayout(),
        stats: (0, exports.deserializeStats)(subArray.getStats()),
        ranges: subArray.getRanges().map((range) => {
            const type = range.getType();
            const bufferSizes = range
                .getBufferSizes()
                .map((uint64) => uint64.toNumber());
            return {
                type,
                hasDefaultRange: range.getHasDefaultRange(),
                buffer: range.getBuffer().toArray(),
                bufferSizes: bufferSizes,
                bufferStartSizes: range
                    .getBufferStartSizes()
                    .map((uint64) => uint64.toNumber()),
            };
        })
    });
};
exports.deserializeSubarray = deserializeSubarray;
const deserializeStats = (stats) => {
    return {
        timers: (0, exports.deserializeMapFloat64)(stats.getTimers()),
        counters: (0, exports.deserializeMapUInt64)(stats.getCounters()),
    };
};
exports.deserializeStats = deserializeStats;
const deserializeMapFloat64 = (mapFloat64) => {
    return mapFloat64.getEntries().map((entry) => {
        return {
            key: entry.getKey(),
            value: entry.getValue(),
        };
    });
};
exports.deserializeMapFloat64 = deserializeMapFloat64;
const deserializeMapUInt64 = (mapUint64) => {
    return mapUint64.getEntries().map((entry) => {
        return {
            key: entry.getKey(),
            value: entry.getValue().toNumber(),
        };
    });
};
exports.deserializeMapUInt64 = deserializeMapUInt64;
//# sourceMappingURL=capnpQueryDeSerializer.js.map