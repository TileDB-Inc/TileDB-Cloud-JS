"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const query_capnp_1 = require("../capnp/query.capnp");
const capnp = __importStar(require("capnp-ts"));
const identity = (x) => x;
const capnpQueryDeSerializer = (buffer) => {
    const message = new capnp.Message(buffer, false);
    const query = message.getRoot(query_capnp_1.Query);
    return {
        attributeBufferHeaders: deserializeAttributeBufferHeaders(query),
        layout: query.getLayout(),
        status: query.getStatus(),
        type: query.getType(),
        writer: exports.deserializeWrite(query),
        reader: exports.deserializeQueryReader(query.getReader()),
        array: exports.deserializeArray(query.getArray()),
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
        config: exports.deserializeConfig(query.getConfig()),
        stats: exports.deserializeStats(query.getStats()),
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
        subarray: exports.deserializeSubarray(reader.getSubarray()),
        readState: deserializeReadState(reader.getReadState()),
        condition: deserializeCondition(reader.getCondition()),
        stats: exports.deserializeStats(reader.getStats()),
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
        subarray: exports.deserializeSubarray(subArrayPartitioner.getSubarray()),
        budget: deserializeAttributeBufferSize(subArrayPartitioner.getBudget()),
        current: deserializeSubarrayPartitionerPartitionInfo(subArrayPartitioner.getCurrent()),
        state: deserializeSubarrayPartitionerState(subArrayPartitioner.getState()),
        memoryBudget: subArrayPartitioner
            .getMemoryBudget().toNumber(),
        memoryBudgetVar: subArrayPartitioner
            .getMemoryBudgetVar().toNumber(),
        memoryBudgetValidity: subArrayPartitioner
            .getMemoryBudgetValidity().toNumber(),
        stats: exports.deserializeStats(subArrayPartitioner.getStats()),
    };
};
const deserializeSubarrayPartitionerState = (partitionerState) => {
    return {
        start: partitionerState.getStart().toNumber(),
        end: partitionerState.getEnd().toNumber(),
        singleRange: partitionerState
            .getSingleRange()
            .map((singleRange) => exports.deserializeSubarray(singleRange)),
        multiRange: partitionerState
            .getMultiRange()
            .map((singleRange) => exports.deserializeSubarray(singleRange)),
    };
};
const deserializeSubarrayPartitionerPartitionInfo = (partitionInfo) => {
    return {
        subarray: exports.deserializeSubarray(partitionInfo.getSubarray()),
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
        subarray: exports.deserializeDomainArray(writer.getSubarray()),
        subarrayRanges: exports.deserializeSubarray(writer.getSubarrayRanges()),
        stats: exports.deserializeStats(writer.getStats()),
    };
};
exports.deserializeWrite = deserializeWrite;
const deserializeDomainArray = (domainArray) => {
    return {
        int8: domainArray.getInt8().map(identity),
        uint8: domainArray.getUint8().map(identity),
        int16: domainArray.getInt16().map(identity),
        uint16: domainArray.getUint16().map(identity),
        int32: domainArray.getInt32().map(identity),
        uint32: domainArray.getUint32().map(identity),
        int64: domainArray.getInt64().map(identity),
        uint64: domainArray.getUint64().map(identity),
        float32: domainArray.getFloat32().map(identity),
        float64: domainArray.getFloat64().map(identity),
    };
};
exports.deserializeDomainArray = deserializeDomainArray;
const deserializeSubarray = (subArray) => {
    return ({
        layout: subArray.getLayout(),
        stats: exports.deserializeStats(subArray.getStats()),
        ranges: subArray.getRanges().map((range) => {
            return {
                type: range.getType(),
                hasDefaultRange: range.getHasDefaultRange(),
                buffer: range.getBuffer().toArray(),
                bufferSizes: range
                    .getBufferSizes()
                    .map((uint64) => uint64.toNumber()),
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
        timers: exports.deserializeMapFloat64(stats.getTimers()),
        counters: exports.deserializeMapUInt64(stats.getCounters()),
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