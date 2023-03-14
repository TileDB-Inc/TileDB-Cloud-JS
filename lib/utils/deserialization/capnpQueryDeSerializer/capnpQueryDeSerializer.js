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
exports.deserializeMapUInt64 = exports.deserializeMapFloat64 = exports.deserializeStats = exports.deserializeSubarray = exports.deserializeDomainArray = exports.deserializeWrite = exports.deserializeQueryReader = exports.deserializeConfig = exports.deserializeFilterData = exports.deserializeFloatScaleConfig = exports.deserializeFilter = exports.deserializeFilterPipeline = exports.deserializeTileExtent = exports.deserializeDimension = exports.deserializeDomain = exports.deserializeAttribute = exports.deserializeArraySchema = exports.deserializeMetadataEntry = exports.deserializeArrayMetadata = exports.deserializeNonEmptyDomain = exports.deserializeNonEmptyDomainList = exports.deserializeMapEntry = exports.deserializeArray = void 0;
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
        writer: (0, exports.deserializeWrite)(query),
        reader: (0, exports.deserializeQueryReader)(query.getReader()),
        array: (0, exports.deserializeArray)(query.getArray()),
        totalFixedLengthBufferBytes: query
            .getTotalFixedLengthBufferBytes()
            .toNumber(),
        totalVarLenBufferBytes: query.getTotalVarLenBufferBytes().toNumber(),
        totalValidityBufferBytes: query.getTotalValidityBufferBytes().toNumber(),
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
        arraySchemaLatest: (0, exports.deserializeArraySchema)(arr.getArraySchemaLatest()),
        arraySchemasAll: deserializeArraySchemasAll(arr.getArraySchemasAll()),
        nonEmptyDomain: (0, exports.deserializeNonEmptyDomainList)(arr.getNonEmptyDomain()),
        arrayMetadata: (0, exports.deserializeArrayMetadata)(arr.getArrayMetadata()),
        arrayDirectory: deserializeArrayDirectory(arr.getArrayDirectory()),
        fragmentMetadataAll: arr.getFragmentMetadataAll().map(deserializeFragmentMetadata),
        openedAtEndTimestamp: arr.getOpenedAtEndTimestamp().toNumber()
    };
};
exports.deserializeArray = deserializeArray;
const deserializeFragmentMetadata = (fragmentMetadata) => {
    return {
        fileSizes: fragmentMetadata.getFileSizes().map((v) => v.toNumber()),
        fileVarSizes: fragmentMetadata.getFileVarSizes().toArray().map((v) => v.toNumber()),
        fileValiditySizes: fragmentMetadata.getFileValiditySizes().toArray().map((v) => v.toNumber()),
        fragmentUri: fragmentMetadata.getFragmentUri(),
        hasTimestamps: fragmentMetadata.getHasTimestamps(),
        hasDeleteMeta: fragmentMetadata.getHasDeleteMeta(),
        sparseTileNum: fragmentMetadata.getSparseTileNum().toNumber(),
        tileIndexBase: fragmentMetadata.getTileIndexBase().toNumber(),
        tileOffsets: fragmentMetadata.getTileOffsets().toArray().map((v) => v.toArray().map((v) => v.toNumber())),
        tileVarOffsets: fragmentMetadata.getTileVarOffsets().toArray().map((v) => v.toArray().map((v) => v.toNumber())),
        tileVarSizes: fragmentMetadata.getTileVarSizes().toArray().map((v) => v.toArray().map((v) => v.toNumber())),
        tileValidityOffsets: fragmentMetadata.getTileValidityOffsets().toArray().map((v) => v.toArray().map((v) => v.toNumber())),
        tileMinBuffer: fragmentMetadata.getTileMinBuffer().toArray().map(v => v.toArray()),
        tileMinVarBuffer: fragmentMetadata.getTileMinVarBuffer().toArray().map(v => v.toArray()),
        tileMaxBuffer: fragmentMetadata.getTileMaxBuffer().toArray().map(v => v.toArray()),
        tileMaxVarBuffer: fragmentMetadata.getTileMaxVarBuffer().toArray().map(v => v.toArray()),
        tileSums: fragmentMetadata.getTileSums().toArray().map(v => v.toArray()),
        tileNullCounts: fragmentMetadata.getTileNullCounts().toArray().map((v) => v.toArray().map((v) => v.toNumber())),
        fragmentMins: fragmentMetadata.getFragmentMins().toArray().map(v => v.toArray()),
        fragmentMaxs: fragmentMetadata.getFragmentMaxs().toArray().map(v => v.toArray()),
        fragmentSums: fragmentMetadata.getFragmentSums().toArray().map((v) => v.toNumber()),
        fragmentNullCounts: fragmentMetadata.getFragmentNullCounts().toArray().map((v) => v.toNumber()),
        version: fragmentMetadata.getVersion(),
        timestampRange: fragmentMetadata.getTimestampRange().toArray().map((v) => v.toNumber()),
        lastTileCellNum: fragmentMetadata.getLastTileCellNum().toNumber(),
        nonEmptyDomain: (0, exports.deserializeNonEmptyDomainList)(fragmentMetadata.getNonEmptyDomain()),
        rtree: fragmentMetadata.getRtree().toArrayBuffer(),
        hasConsolidatedFooter: fragmentMetadata.getHasConsolidatedFooter(),
        gtOffsets: deserializeGenericTileOffsets(fragmentMetadata.getGtOffsets())
    };
};
const deserializeGenericTileOffsets = (genericTileOffsets) => {
    return {
        rtree: genericTileOffsets.getRtree().toNumber(),
        tileOffsets: genericTileOffsets.getTileOffsets().map(v => v.toNumber()),
        tileVarOffsets: genericTileOffsets.getTileVarOffsets().map(v => v.toNumber()),
        tileVarSizes: genericTileOffsets.getTileVarSizes().map(v => v.toNumber()),
        tileValidityOffsets: genericTileOffsets.getTileValidityOffsets().map(v => v.toNumber()),
        tileMinOffsets: genericTileOffsets.getTileMinOffsets().map(v => v.toNumber()),
        tileMaxOffsets: genericTileOffsets.getTileMaxOffsets().map(v => v.toNumber()),
        tileSumOffsets: genericTileOffsets.getTileSumOffsets().map(v => v.toNumber()),
        tileNullCountOffsets: genericTileOffsets.getTileNullCountOffsets().map(v => v.toNumber()),
        fragmentMinMaxSumNullCountOffset: genericTileOffsets.getFragmentMinMaxSumNullCountOffset().toNumber(),
        processedConditionsOffsets: genericTileOffsets.getProcessedConditionsOffsets().toNumber(),
    };
};
const deserializeArrayDirectory = (arrayDirectory) => {
    return {
        unfilteredFragmentUris: arrayDirectory.getUnfilteredFragmentUris().toArray(),
        consolidatedCommitUris: arrayDirectory.getConsolidatedCommitUris().toArray(),
        arraySchemaUris: arrayDirectory.getArraySchemaUris().toArray(),
        latestArraySchemaUri: arrayDirectory.getLatestArraySchemaUri(),
        arrayMetaUrisToVacuum: arrayDirectory.getArrayMetaUrisToVacuum().toArray(),
        arrayMetaVacUrisToVacuum: arrayDirectory.getArrayMetaVacUrisToVacuum().toArray(),
        commitUrisToConsolidate: arrayDirectory.getCommitUrisToConsolidate().toArray(),
        commitUrisToVacuum: arrayDirectory.getCommitUrisToVacuum().toArray(),
        consolidatedCommitUrisToVacuum: arrayDirectory.getConsolidatedCommitUrisToVacuum().toArray(),
        arrayMetaUris: arrayDirectory.getArrayMetaUris().map(deserialiazeTimestampedURI),
        fragmentMetaUris: arrayDirectory.getFragmentMetaUris().toArray(),
        deleteAndUpdateTileLocation: arrayDirectory.getDeleteAndUpdateTileLocation().map(deserializeDeleteAndUpdateTileLocation),
        timestampStart: arrayDirectory.getTimestampStart().toNumber(),
        timestampEnd: arrayDirectory.getTimestampEnd().toNumber(),
    };
};
const deserializeDeleteAndUpdateTileLocation = (deleteAndUpdateTileLocation) => {
    return {
        uri: deleteAndUpdateTileLocation.getUri(),
        conditionMarker: deleteAndUpdateTileLocation.getConditionMarker(),
        offset: deleteAndUpdateTileLocation.getOffset().toNumber()
    };
};
const deserialiazeTimestampedURI = (timestampedURI) => {
    return {
        uri: timestampedURI.getUri(),
        timestampStart: timestampedURI.getTimestampStart().toNumber(),
        timestampEnd: timestampedURI.getTimestampEnd().toNumber(),
    };
};
const deserializeArraySchemasAll = (map) => {
    return {
        entries: map.getEntries().map(exports.deserializeMapEntry)
    };
};
const deserializeMapEntry = (mapEntry) => {
    return {
        key: mapEntry.getKey(),
        value: (0, exports.deserializeArraySchema)(mapEntry.getValue())
    };
};
exports.deserializeMapEntry = deserializeMapEntry;
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
        nonEmptyDomain: (0, exports.deserializeDomainArray)(nonEmptyDomain.getNonEmptyDomain()),
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
    const metadataEntry = {
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
        coordsFilterPipeline: (0, exports.deserializeFilterPipeline)(schema.getCoordsFilterPipeline()),
        offsetFilterPipeline: (0, exports.deserializeFilterPipeline)(schema.getOffsetFilterPipeline()),
        validityFilterPipeline: (0, exports.deserializeFilterPipeline)(schema.getValidityFilterPipeline()),
        domain: (0, exports.deserializeDomain)(schema.getDomain()),
        attributes: schema.getAttributes().map(exports.deserializeAttribute),
    };
};
exports.deserializeArraySchema = deserializeArraySchema;
const deserializeAttribute = (attribute) => {
    return {
        cellValNum: attribute.getCellValNum(),
        name: attribute.getName(),
        type: attribute.getType(),
        filterPipeline: (0, exports.deserializeFilterPipeline)(attribute.getFilterPipeline()),
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
        domain: (0, exports.deserializeDomainArray)(dimension.getDomain()),
        nullTileExtent: dimension.getNullTileExtent(),
        tileExtent: (0, exports.deserializeTileExtent)(dimension.getTileExtent()),
        filterPipeline: (0, exports.deserializeFilterPipeline)(dimension.getFilterPipeline()),
    };
};
exports.deserializeDimension = deserializeDimension;
const deserializeTileExtent = (tileExtent) => {
    let tile = {};
    if (tileExtent.isInt8()) {
        tile.int8 = tileExtent.getInt8();
    }
    if (tileExtent.isUint8()) {
        tile.uint8 = tileExtent.getUint8();
    }
    if (tileExtent.isInt16()) {
        tile.int16 = tileExtent.getInt16();
    }
    if (tileExtent.isUint16()) {
        tile.uint16 = tileExtent.getUint16();
    }
    if (tileExtent.isInt32()) {
        tile.int32 = tileExtent.getInt32();
    }
    if (tileExtent.isInt64()) {
        tile.int64 = tileExtent.getInt64().toNumber();
    }
    if (tileExtent.isUint64()) {
        tile.uint64 = tileExtent.getUint64().toNumber();
    }
    if (tileExtent.isFloat32()) {
        tile.float32 = tileExtent.getFloat32();
    }
    if (tileExtent.isFloat64()) {
        tile.float64 = tileExtent.getFloat64();
    }
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
        data: (0, exports.deserializeFilterData)(filter.getData()),
        floatScaleConfig: (0, exports.deserializeFloatScaleConfig)(filter.getFloatScaleConfig())
    };
};
exports.deserializeFilter = deserializeFilter;
const deserializeFloatScaleConfig = (floatScaleConfig) => {
    return {
        byteWidth: floatScaleConfig.getByteWidth().toNumber(),
        offset: floatScaleConfig.getOffset(),
        scale: floatScaleConfig.getScale()
    };
};
exports.deserializeFloatScaleConfig = deserializeFloatScaleConfig;
const deserializeFilterData = (data) => {
    let filterData = {};
    if (data.isText()) {
        filterData.text = data.getText();
    }
    if (data.isInt8()) {
        filterData.int8 = data.getInt8();
    }
    if (data.isUint8()) {
        filterData.uint8 = data.getUint8();
    }
    if (data.isInt16()) {
        filterData.int16 = data.getInt16();
    }
    if (data.isUint16()) {
        filterData.uint16 = data.getUint16();
    }
    if (data.isInt32()) {
        filterData.int32 = data.getInt32();
    }
    if (data.isUint32()) {
        filterData.uint32 = data.getUint32();
    }
    if (data.isInt64()) {
        filterData.int64 = data.getInt64().toNumber();
    }
    if (data.isUint64()) {
        filterData.uint64 = data.getUint64().toNumber();
    }
    if (data.isFloat32()) {
        filterData.float32 = data.getFloat32();
    }
    if (data.isFloat64()) {
        filterData.float64 = data.getFloat64();
    }
    if (data.isBytes()) {
        filterData.bytes = data.getBytes().toArray();
    }
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
        memoryBudget: subArrayPartitioner.getMemoryBudget().toNumber(),
        memoryBudgetVar: subArrayPartitioner.getMemoryBudgetVar().toNumber(),
        memoryBudgetValidity: subArrayPartitioner
            .getMemoryBudgetValidity()
            .toNumber(),
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
        subarray: (0, exports.deserializeDomainArray)(writer.getSubarray()),
        subarrayRanges: (0, exports.deserializeSubarray)(writer.getSubarrayRanges()),
        stats: (0, exports.deserializeStats)(writer.getStats()),
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
        }),
    };
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