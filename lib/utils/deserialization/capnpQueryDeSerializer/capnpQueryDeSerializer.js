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
exports.deserializeMapUInt64 = exports.deserializeMapFloat64 = exports.deserializeStats = exports.deserializeSubarray = exports.deserializeDomainArray = exports.deserializeWrite = exports.deserializeQueryReader = exports.deserializeConfig = exports.deserializeFilterData = exports.deserializeFilter = exports.deserializeFilterPipeline = exports.deserializeTileExtent = exports.deserializeDimension = exports.deserializeDomain = exports.deserializeAttribute = exports.deserializeArraySchema = exports.deserializeMetadataEntry = exports.deserializeArrayMetadata = exports.deserializeNonEmptyDomain = exports.deserializeNonEmptyDomainList = exports.deserializeArray = void 0;
const query_capnp_1 = require("../../../capnp/query_capnp");
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
        writer: exports.deserializeWrite(query),
        reader: exports.deserializeQueryReader(query.getReader()),
        array: exports.deserializeArray(query.getArray()),
        totalFixedLengthBufferBytes: query
            .getTotalFixedLengthBufferBytes()
            .toNumber(),
        totalVarLenBufferBytes: query.getTotalVarLenBufferBytes().toNumber(),
        totalValidityBufferBytes: query.getTotalValidityBufferBytes().toNumber(),
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
        arraySchemaLatest: exports.deserializeArraySchema(arr.getArraySchemaLatest()),
        arrayMetadata: exports.deserializeArrayMetadata(arr.getArrayMetadata()),
        nonEmptyDomain: exports.deserializeNonEmptyDomainList(arr.getNonEmptyDomain()),
    };
};
exports.deserializeArray = deserializeArray;
const deserializeNonEmptyDomainList = (nonEmptyDomainList) => {
    return {
        nonEmptyDomains: nonEmptyDomainList
            .getNonEmptyDomains()
            .map(exports.deserializeNonEmptyDomain),
    };
};
exports.deserializeNonEmptyDomainList = deserializeNonEmptyDomainList;
const deserializeNonEmptyDomain = (nonEmptyDomain) => {
    return {
        isEmpty: nonEmptyDomain.getIsEmpty(),
        sizes: nonEmptyDomain.getSizes().map(Number),
        nonEmptyDomain: exports.deserializeDomainArray(nonEmptyDomain.getNonEmptyDomain()),
    };
};
exports.deserializeNonEmptyDomain = deserializeNonEmptyDomain;
const deserializeArrayMetadata = (arrayMetadata) => {
    return {
        entries: arrayMetadata.getEntries().map(exports.deserializeMetadataEntry),
    };
};
exports.deserializeArrayMetadata = deserializeArrayMetadata;
const deserializeMetadataEntry = (entry) => {
    let metadataEntry = {
        key: entry.getKey(),
        type: entry.getType(),
        valueNum: entry.getValueNum(),
        del: entry.getDel(),
        value: entry.getValue().toArray(),
    };
    return metadataEntry;
};
exports.deserializeMetadataEntry = deserializeMetadataEntry;
const deserializeArraySchema = (schema) => {
    return {
        arrayType: schema.getArrayType(),
        capacity: schema.getCapacity().toNumber(),
        cellOrder: schema.getCellOrder(),
        tileOrder: schema.getTileOrder(),
        uri: schema.getUri(),
        version: schema.getVersion().toArray(),
        allowsDuplicates: schema.getAllowsDuplicates(),
        name: schema.getName(),
        timestampRange: schema.getTimestampRange().map((v) => v.toNumber()),
        coordsFilterPipeline: exports.deserializeFilterPipeline(schema.getCoordsFilterPipeline()),
        offsetFilterPipeline: exports.deserializeFilterPipeline(schema.getOffsetFilterPipeline()),
        validityFilterPipeline: exports.deserializeFilterPipeline(schema.getValidityFilterPipeline()),
        domain: exports.deserializeDomain(schema.getDomain()),
        attributes: schema.getAttributes().map(exports.deserializeAttribute),
    };
};
exports.deserializeArraySchema = deserializeArraySchema;
const deserializeAttribute = (attribute) => {
    return {
        cellValNum: attribute.getCellValNum(),
        name: attribute.getName(),
        type: attribute.getType(),
        filterPipeline: exports.deserializeFilterPipeline(attribute.getFilterPipeline()),
        fillValue: attribute.getFillValue().toArray(),
        nullable: attribute.getNullable(),
        fillValueValidity: attribute.getFillValueValidity(),
    };
};
exports.deserializeAttribute = deserializeAttribute;
const deserializeDomain = (domain) => {
    return {
        type: domain.getType(),
        tileOrder: domain.getTileOrder(),
        cellOrder: domain.getCellOrder(),
        dimensions: domain.getDimensions().map(exports.deserializeDimension),
    };
};
exports.deserializeDomain = deserializeDomain;
const deserializeDimension = (dimension) => {
    return {
        name: dimension.getName(),
        type: dimension.getType(),
        domain: exports.deserializeDomainArray(dimension.getDomain()),
        nullTileExtent: dimension.getNullTileExtent(),
        tileExtent: exports.deserializeTileExtent(dimension.getTileExtent()),
        filterPipeline: exports.deserializeFilterPipeline(dimension.getFilterPipeline()),
    };
};
exports.deserializeDimension = deserializeDimension;
const deserializeTileExtent = (tileExtent) => {
    let tile = {};
    try {
        const int8 = tileExtent.getInt8();
        tile.int8 = int8;
    }
    catch (_a) { }
    try {
        const uint8 = tileExtent.getUint8();
        tile.uint8 = uint8;
    }
    catch (_b) { }
    try {
        const int16 = tileExtent.getInt16();
        tile.int16 = int16;
    }
    catch (_c) { }
    try {
        const uint16 = tileExtent.getUint16();
        tile.uint16 = uint16;
    }
    catch (_d) { }
    try {
        const int32 = tileExtent.getInt32();
        tile.int32 = int32;
    }
    catch (_e) { }
    try {
        const int64 = tileExtent.getInt64().toNumber();
        tile.int64 = int64;
    }
    catch (_f) { }
    try {
        const uint64 = tileExtent.getUint64().toNumber();
        tile.uint64 = uint64;
    }
    catch (_g) { }
    try {
        const float32 = tileExtent.getFloat32();
        tile.float32 = float32;
    }
    catch (_h) { }
    try {
        const float64 = tileExtent.getFloat64();
        tile.float64 = float64;
    }
    catch (_j) { }
    return tile;
};
exports.deserializeTileExtent = deserializeTileExtent;
const deserializeFilterPipeline = (filterPipeline) => {
    return {
        filters: filterPipeline.getFilters().map(exports.deserializeFilter),
    };
};
exports.deserializeFilterPipeline = deserializeFilterPipeline;
const deserializeFilter = (filter) => {
    return {
        type: filter.getType(),
        data: exports.deserializeFilterData(filter.getData()),
    };
};
exports.deserializeFilter = deserializeFilter;
const deserializeFilterData = (data) => {
    let filterData = {};
    try {
        const text = data.getText();
        Object.assign(filterData, { text });
    }
    catch (_a) { }
    try {
        const int8 = data.getInt8();
        Object.assign(filterData, { int8 });
    }
    catch (_b) { }
    try {
        const uint8 = data.getUint8();
        Object.assign(filterData, { uint8 });
    }
    catch (_c) { }
    try {
        const int16 = data.getInt16();
        Object.assign(filterData, { int16 });
    }
    catch (_d) { }
    try {
        const uint16 = data.getUint16();
        Object.assign(filterData, { uint16 });
    }
    catch (_e) { }
    try {
        const int32 = data.getInt32();
        Object.assign(filterData, { int32 });
    }
    catch (_f) { }
    try {
        const uint32 = data.getUint32();
        Object.assign(filterData, { uint32 });
    }
    catch (_g) { }
    try {
        const int64 = data.getInt16();
        Object.assign(filterData, { int64 });
    }
    catch (_h) { }
    try {
        const uint64 = data.getUint16();
        Object.assign(filterData, { uint64 });
    }
    catch (_j) { }
    try {
        const float32 = data.getFloat32();
        Object.assign(filterData, { float32 });
    }
    catch (_k) { }
    try {
        const float64 = data.getFloat64();
        Object.assign(filterData, { float64 });
    }
    catch (_l) { }
    return filterData;
};
exports.deserializeFilterData = deserializeFilterData;
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
        memoryBudget: subArrayPartitioner.getMemoryBudget().toNumber(),
        memoryBudgetVar: subArrayPartitioner.getMemoryBudgetVar().toNumber(),
        memoryBudgetValidity: subArrayPartitioner
            .getMemoryBudgetValidity()
            .toNumber(),
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
                .getFixedLenBufferSizeInBytes()
                .toNumber(),
            varLenBufferSizeInBytes: attrBufferHeader
                .getVarLenBufferSizeInBytes()
                .toNumber(),
            validityLenBufferSizeInBytes: attrBufferHeader
                .getValidityLenBufferSizeInBytes()
                .toNumber(),
            originalFixedLenBufferSizeInBytes: attrBufferHeader
                .getOriginalFixedLenBufferSizeInBytes()
                .toNumber(),
            originalVarLenBufferSizeInBytes: attrBufferHeader
                .getOriginalVarLenBufferSizeInBytes()
                .toNumber(),
            originalValidityLenBufferSizeInBytes: attrBufferHeader
                .getOriginalValidityLenBufferSizeInBytes()
                .toNumber(),
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
    let domain = {};
    const int8 = domainArray.getInt8().toArray();
    const int16 = domainArray.getInt16().toArray();
    const int32 = domainArray.getInt32().toArray();
    const int64 = domainArray.getInt64().toArray().map(Number);
    const uint8 = domainArray.getUint8().toArray();
    const uint16 = domainArray.getUint16().toArray();
    const uint32 = domainArray.getUint32().toArray();
    const uint64 = domainArray.getUint64().toArray().map(Number);
    const float32 = domainArray.getFloat32().toArray();
    const float64 = domainArray.getFloat64().toArray();
    if (int8.length) {
        domain.int8 = int8;
    }
    if (int16.length) {
        domain.int16 = int16;
    }
    if (int32.length) {
        domain.int32 = int32;
    }
    if (int64.length) {
        domain.int64 = int64;
    }
    if (uint8.length) {
        domain.uint8 = uint8;
    }
    if (uint16.length) {
        domain.uint16 = uint16;
    }
    if (uint32.length) {
        domain.uint32 = uint32;
    }
    if (uint64.length) {
        domain.uint64 = uint64;
    }
    if (float32.length) {
        domain.float32 = float32;
    }
    if (float64.length) {
        domain.float64 = float64;
    }
    return domain;
};
exports.deserializeDomainArray = deserializeDomainArray;
const deserializeSubarray = (subArray) => {
    return {
        layout: subArray.getLayout(),
        stats: exports.deserializeStats(subArray.getStats()),
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
        }),
    };
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