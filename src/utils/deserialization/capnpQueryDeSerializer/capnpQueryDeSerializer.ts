import {
  Array as ArrayCapnp,
  ArraySchema,
  AttributeBufferSize,
  Condition,
  Attribute,
  Dimension,
  Dimension_TileExtent,
  Domain,
  Filter_Data,
  ConditionClause,
  Config,
  DomainArray,
  Filter,
  FilterPipeline,
  MapFloat64,
  MapUInt64 as MapUInt64Capnp,
  Query,
  QueryReader,
  ReadState,
  Stats as StatsCapnp,
  Subarray as SubarrayCapnp,
  SubarrayPartitioner,
  SubarrayPartitioner_PartitionInfo,
  SubarrayPartitioner_State,
  NonEmptyDomainList,
  ArraySchemaMap as ArraySchemaMapCapnp,
  NonEmptyDomain,
  ArraySchemaMap_Entry,
  FloatScaleConfig as FloatScaleConfigCapnp,
  ArrayDirectory as ArrayDirectoryCapnp,
  ArrayDirectory_TimestampedURI,
  ArrayDirectory_DeleteAndUpdateTileLocation,
  FragmentMetadata as FragmentMetadataCapnp,
  FragmentMetadata_GenericTileOffsets,
  ReaderIndex as ReaderIndexCapnp,
  ReadStateIndex,
  ResultCellSlab,
  FragmentIndex
} from '../../../capnp/query_capnp';
import * as capnp from 'capnp-ts';
import {
  ArrayMetadata,
  ArrayMetadata_MetadataEntry
} from '../../../capnp/arrayMetadata_capnp';
import {
  DomainArray as DomainArrayV2,
  DimensionTileExtent,
  ModelArray,
  FloatScaleConfig,
  ArraySchema as ArraySchemaV2,
  Querytype,
  ArrayType,
  Layout,
  MapUInt64,
  FilterPipeline as FilterPipelineV2,
  Filter as FilterV2,
  FilterType,
  Datatype,
  Domain as DomainV2,
  Dimension as DimensionV2,
  Attribute as AttributeV2,
  ArraySchemaMap,
  FragmentMetadata,
  ArraySchemaEntry,
  FilterData,
  Stats,
  ArrayDirectory,
  GenericTileOffsets,
  ReaderIndex,
  Subarray
} from '../../../v2';

/**
 * Deserializes an ArrayBuffer to a Query object
 * @param buffer ArrayBuffer of the capnp Query object
 * @returns Query object
 */
const capnpQueryDeSerializer = (buffer: ArrayBuffer | ArrayBufferLike) => {
  const message = new capnp.Message(buffer, false);
  const query = message.getRoot(Query);

  return {
    attributeBufferHeaders: deserializeAttributeBufferHeaders(query),
    layout: query.getLayout(),
    status: query.getStatus(),
    type: query.getType(),
    writer: deserializeWrite(query),
    reader: deserializeQueryReader(query.getReader()),
    denseReader: query.hasDenseReader()
      ? deserializeQueryReader(query.getDenseReader())
      : undefined,
    readerIndex: query.hasReaderIndex()
      ? deserializeReaderIndex(query.getReaderIndex())
      : undefined,
    array: deserializeArray(query.getArray()),
    totalFixedLengthBufferBytes: query
      .getTotalFixedLengthBufferBytes()
      .toNumber(),
    totalVarLenBufferBytes: query.getTotalVarLenBufferBytes().toNumber(),
    totalValidityBufferBytes: query.getTotalValidityBufferBytes().toNumber(),
    varOffsetsMode: query.getVarOffsetsMode(),
    varOffsetsAddExtraElement: query.getVarOffsetsAddExtraElement(),
    varOffsetsBitsize: query.getVarOffsetsBitsize(),
    config: deserializeConfig(query.getConfig()),
    stats: deserializeStats(query.getStats())
  };
};

export default capnpQueryDeSerializer;

export const deserializeReaderIndex = (
  readerIndex: ReaderIndexCapnp
): ReaderIndex => {
  return {
    layout: readerIndex.getLayout() as Layout,
    condition: readerIndex.hasCondition()
      ? deserializeCondition(readerIndex.getCondition())
      : undefined,
    stats: readerIndex.hasStats()
      ? deserializeStats(readerIndex.getStats())
      : undefined,
    subarray: readerIndex.hasSubarray()
      ? deserializeSubarray(readerIndex.getSubarray())
      : undefined,
    readState: readerIndex.hasReadState()
      ? deserializeReadStateIndex(readerIndex.getReadState())
      : undefined
  };
};

export const deserializeReadStateIndex = (readerStateIndex: ReadStateIndex) => {
  return {
    doneAddingResultTiles: readerStateIndex.getDoneAddingResultTiles(),
    fragTileIdx: readerStateIndex
      .getFragTileIdx()
      .map(deserializeFragmentIndex),
    resultCellSlab: readerStateIndex
      .getResultCellSlab()
      .map(deserializeResultCellSlab)
  };
};

const deserializeFragmentIndex = (fragmentIndex: FragmentIndex) => {
  return {
    tileIdx: fragmentIndex.getTileIdx().toNumber(),
    cellIdx: fragmentIndex.getCellIdx().toNumber()
  };
};

const deserializeResultCellSlab = (resultCellSlab: ResultCellSlab) => {
  return {
    fragIdx: resultCellSlab.getFragIdx(),
    tileIdx: resultCellSlab.getTileIdx().toNumber(),
    start: resultCellSlab.getStart().toNumber(),
    length: resultCellSlab.getLength().toNumber()
  };
};

export const deserializeArray = (arr: ArrayCapnp): ModelArray => {
  return {
    endTimestamp: arr.getEndTimestamp().toNumber(),
    queryType: arr.getQueryType() as Querytype,
    uri: arr.getUri(),
    startTimestamp: arr.getStartTimestamp().toNumber(),
    arraySchemaLatest: deserializeArraySchema(arr.getArraySchemaLatest()),
    arraySchemasAll: deserializeArraySchemasAll(arr.getArraySchemasAll()),
    nonEmptyDomain: deserializeNonEmptyDomainList(arr.getNonEmptyDomain()),
    arrayMetadata: deserializeArrayMetadata(arr.getArrayMetadata()),
    arrayDirectory: deserializeArrayDirectory(arr.getArrayDirectory()),
    fragmentMetadataAll: arr
      .getFragmentMetadataAll()
      .map(deserializeFragmentMetadata),
    openedAtEndTimestamp: arr.getOpenedAtEndTimestamp().toNumber()
  };
};

const deserializeFragmentMetadata = (
  fragmentMetadata: FragmentMetadataCapnp
): FragmentMetadata => {
  return {
    fileSizes: fragmentMetadata.getFileSizes().map(v => v.toNumber()),
    fileVarSizes: fragmentMetadata
      .getFileVarSizes()
      .toArray()
      .map(v => v.toNumber()),
    fileValiditySizes: fragmentMetadata
      .getFileValiditySizes()
      .toArray()
      .map(v => v.toNumber()),
    fragmentUri: fragmentMetadata.getFragmentUri(),
    hasTimestamps: fragmentMetadata.getHasTimestamps(),
    hasDeleteMeta: fragmentMetadata.getHasDeleteMeta(),
    sparseTileNum: fragmentMetadata.getSparseTileNum().toNumber(),
    tileIndexBase: fragmentMetadata.getTileIndexBase().toNumber(),
    tileOffsets: fragmentMetadata
      .getTileOffsets()
      .toArray()
      .map(v => v.toArray().map(v => v.toNumber())),
    tileVarOffsets: fragmentMetadata
      .getTileVarOffsets()
      .toArray()
      .map(v => v.toArray().map(v => v.toNumber())),
    tileVarSizes: fragmentMetadata
      .getTileVarSizes()
      .toArray()
      .map(v => v.toArray().map(v => v.toNumber())),
    tileValidityOffsets: fragmentMetadata
      .getTileValidityOffsets()
      .toArray()
      .map(v => v.toArray().map(v => v.toNumber())),
    tileMinBuffer: fragmentMetadata
      .getTileMinBuffer()
      .toArray()
      .map(v => v.toArray()),
    tileMinVarBuffer: fragmentMetadata
      .getTileMinVarBuffer()
      .toArray()
      .map(v => v.toArray()),
    tileMaxBuffer: fragmentMetadata
      .getTileMaxBuffer()
      .toArray()
      .map(v => v.toArray()),
    tileMaxVarBuffer: fragmentMetadata
      .getTileMaxVarBuffer()
      .toArray()
      .map(v => v.toArray()),
    tileSums: fragmentMetadata
      .getTileSums()
      .toArray()
      .map(v => v.toArray()),
    tileNullCounts: fragmentMetadata
      .getTileNullCounts()
      .toArray()
      .map(v => v.toArray().map(v => v.toNumber())),
    fragmentMins: fragmentMetadata
      .getFragmentMins()
      .toArray()
      .map(v => v.toArray()),
    fragmentMaxs: fragmentMetadata
      .getFragmentMaxs()
      .toArray()
      .map(v => v.toArray()),
    fragmentSums: fragmentMetadata
      .getFragmentSums()
      .toArray()
      .map(v => v.toNumber()),
    fragmentNullCounts: fragmentMetadata
      .getFragmentNullCounts()
      .toArray()
      .map(v => v.toNumber()),
    version: fragmentMetadata.getVersion(),
    timestampRange: fragmentMetadata
      .getTimestampRange()
      .toArray()
      .map(v => v.toNumber()),
    lastTileCellNum: fragmentMetadata.getLastTileCellNum().toNumber(),
    nonEmptyDomain: deserializeNonEmptyDomainList(
      fragmentMetadata.getNonEmptyDomain()
    ),
    rtree: fragmentMetadata.getRtree().toArrayBuffer(),
    hasConsolidatedFooter: fragmentMetadata.getHasConsolidatedFooter(),
    gtOffsets: deserializeGenericTileOffsets(fragmentMetadata.getGtOffsets())
  };
};

const deserializeGenericTileOffsets = (
  genericTileOffsets: FragmentMetadata_GenericTileOffsets
): GenericTileOffsets => {
  return {
    rtree: genericTileOffsets.getRtree().toNumber(),
    tileOffsets: genericTileOffsets.getTileOffsets().map(v => v.toNumber()),
    tileVarOffsets: genericTileOffsets
      .getTileVarOffsets()
      .map(v => v.toNumber()),
    tileVarSizes: genericTileOffsets.getTileVarSizes().map(v => v.toNumber()),
    tileValidityOffsets: genericTileOffsets
      .getTileValidityOffsets()
      .map(v => v.toNumber()),
    tileMinOffsets: genericTileOffsets
      .getTileMinOffsets()
      .map(v => v.toNumber()),
    tileMaxOffsets: genericTileOffsets
      .getTileMaxOffsets()
      .map(v => v.toNumber()),
    tileSumOffsets: genericTileOffsets
      .getTileSumOffsets()
      .map(v => v.toNumber()),
    tileNullCountOffsets: genericTileOffsets
      .getTileNullCountOffsets()
      .map(v => v.toNumber()),
    fragmentMinMaxSumNullCountOffset: genericTileOffsets
      .getFragmentMinMaxSumNullCountOffset()
      .toNumber(),
    processedConditionsOffsets: genericTileOffsets
      .getProcessedConditionsOffsets()
      .toNumber()
  };
};

const deserializeArrayDirectory = (
  arrayDirectory: ArrayDirectoryCapnp
): ArrayDirectory => {
  return {
    unfilteredFragmentUris: arrayDirectory
      .getUnfilteredFragmentUris()
      .toArray(),
    consolidatedCommitUris: arrayDirectory
      .getConsolidatedCommitUris()
      .toArray(),
    arraySchemaUris: arrayDirectory.getArraySchemaUris().toArray(),
    latestArraySchemaUri: arrayDirectory.getLatestArraySchemaUri(),
    arrayMetaUrisToVacuum: arrayDirectory.getArrayMetaUrisToVacuum().toArray(),
    arrayMetaVacUrisToVacuum: arrayDirectory
      .getArrayMetaVacUrisToVacuum()
      .toArray(),
    commitUrisToConsolidate: arrayDirectory
      .getCommitUrisToConsolidate()
      .toArray(),
    commitUrisToVacuum: arrayDirectory.getCommitUrisToVacuum().toArray(),
    consolidatedCommitUrisToVacuum: arrayDirectory
      .getConsolidatedCommitUrisToVacuum()
      .toArray(),
    arrayMetaUris: arrayDirectory
      .getArrayMetaUris()
      .map(deserialiazeTimestampedURI),
    fragmentMetaUris: arrayDirectory.getFragmentMetaUris().toArray(),
    deleteAndUpdateTileLocation: arrayDirectory
      .getDeleteAndUpdateTileLocation()
      .map(deserializeDeleteAndUpdateTileLocation),
    timestampStart: arrayDirectory.getTimestampStart().toNumber(),
    timestampEnd: arrayDirectory.getTimestampEnd().toNumber()
  };
};

const deserializeDeleteAndUpdateTileLocation = (
  deleteAndUpdateTileLocation: ArrayDirectory_DeleteAndUpdateTileLocation
) => {
  return {
    uri: deleteAndUpdateTileLocation.getUri(),
    conditionMarker: deleteAndUpdateTileLocation.getConditionMarker(),
    offset: deleteAndUpdateTileLocation.getOffset().toNumber()
  };
};

const deserialiazeTimestampedURI = (
  timestampedURI: ArrayDirectory_TimestampedURI
) => {
  return {
    uri: timestampedURI.getUri(),
    timestampStart: timestampedURI.getTimestampStart().toNumber(),
    timestampEnd: timestampedURI.getTimestampEnd().toNumber()
  };
};

const deserializeArraySchemasAll = (
  map: ArraySchemaMapCapnp
): ArraySchemaMap => {
  return {
    entries: map.getEntries().map(deserializeMapEntry)
  };
};

export const deserializeMapEntry = (
  mapEntry: ArraySchemaMap_Entry
): ArraySchemaEntry => {
  return {
    key: mapEntry.getKey(),
    value: deserializeArraySchema(mapEntry.getValue())
  };
};

export const deserializeNonEmptyDomainList = (
  nonEmptyDomainList: NonEmptyDomainList
) => {
  return {
    nonEmptyDomains: nonEmptyDomainList
      .getNonEmptyDomains()
      .map(deserializeNonEmptyDomain)
  };
};

export const deserializeNonEmptyDomain = (nonEmptyDomain: NonEmptyDomain) => {
  return {
    isEmpty: nonEmptyDomain.getIsEmpty(),
    sizes: nonEmptyDomain.getSizes().map(Number),
    nonEmptyDomain: deserializeDomainArray(nonEmptyDomain.getNonEmptyDomain())
  };
};

export const deserializeArrayMetadata = (arrayMetadata: ArrayMetadata) => {
  return {
    entries: arrayMetadata.getEntries().map(deserializeMetadataEntry)
  };
};

export const deserializeMetadataEntry = (
  entry: ArrayMetadata_MetadataEntry
) => {
  const metadataEntry = {
    key: entry.getKey(),
    type: entry.getType(),
    valueNum: entry.getValueNum(),
    del: entry.getDel(),
    value: entry.getValue().toArray()
  };

  return metadataEntry;
};

export const deserializeArraySchema = (schema: ArraySchema): ArraySchemaV2 => {
  return {
    arrayType: schema.getArrayType() as ArrayType,
    capacity: schema.getCapacity().toNumber(),
    cellOrder: schema.getCellOrder() as Layout,
    tileOrder: schema.getTileOrder() as Layout,
    uri: schema.getUri(),
    version: schema.getVersion().toArray(),
    allowsDuplicates: schema.getAllowsDuplicates(),
    name: schema.getName(),
    timestampRange: schema.getTimestampRange().map(v => v.toNumber()),
    coordsFilterPipeline: deserializeFilterPipeline(
      schema.getCoordsFilterPipeline()
    ),
    offsetFilterPipeline: deserializeFilterPipeline(
      schema.getOffsetFilterPipeline()
    ),
    validityFilterPipeline: deserializeFilterPipeline(
      schema.getValidityFilterPipeline()
    ),
    domain: deserializeDomain(schema.getDomain()),
    attributes: schema.getAttributes().map(deserializeAttribute)
  };
};

export const deserializeAttribute = (attribute: Attribute): AttributeV2 => {
  return {
    cellValNum: attribute.getCellValNum(),
    name: attribute.getName(),
    type: attribute.getType() as Datatype,
    filterPipeline: deserializeFilterPipeline(attribute.getFilterPipeline()),
    fillValue: attribute.getFillValue().toArray(),
    nullable: attribute.getNullable(),
    fillValueValidity: attribute.getFillValueValidity()
  };
};

export const deserializeDomain = (domain: Domain): DomainV2 => {
  return {
    type: domain.getType() as Datatype,
    tileOrder: domain.getTileOrder() as Layout,
    cellOrder: domain.getCellOrder() as Layout,
    dimensions: domain.getDimensions().map(deserializeDimension)
  };
};

export const deserializeDimension = (dimension: Dimension): DimensionV2 => {
  return {
    name: dimension.getName(),
    type: dimension.getType() as Datatype,
    domain: deserializeDomainArray(dimension.getDomain()),
    nullTileExtent: dimension.getNullTileExtent(),
    tileExtent: deserializeTileExtent(dimension.getTileExtent()),
    filterPipeline: deserializeFilterPipeline(dimension.getFilterPipeline())
  };
};

export const deserializeTileExtent = (tileExtent: Dimension_TileExtent) => {
  const tile: DimensionTileExtent = {};

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

export const deserializeFilterPipeline = (
  filterPipeline: FilterPipeline
): FilterPipelineV2 => {
  return {
    filters: filterPipeline.getFilters().map(deserializeFilter)
  };
};

export const deserializeFilter = (filter: Filter): FilterV2 => {
  return {
    type: filter.getType() as FilterType,
    data: deserializeFilterData(filter.getData()),
    floatScaleConfig: deserializeFloatScaleConfig(filter.getFloatScaleConfig())
  };
};

export const deserializeFloatScaleConfig = (
  floatScaleConfig: FloatScaleConfigCapnp
): FloatScaleConfig => {
  return {
    byteWidth: floatScaleConfig.getByteWidth().toNumber(),
    offset: floatScaleConfig.getOffset(),
    scale: floatScaleConfig.getScale()
  };
};

export const deserializeFilterData = (data: Filter_Data) => {
  const filterData: FilterData = {};

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

export const deserializeConfig = (config: Config) => {
  const entries = config.getEntries().map(entry => ({
    key: entry.getKey(),
    value: entry.getValue()
  }));

  return { entries };
};

export const deserializeQueryReader = (reader: QueryReader) => {
  return {
    layout: reader.getLayout(),
    subarray: reader.hasSubarray()
      ? deserializeSubarray(reader.getSubarray())
      : undefined,
    readState: reader.hasReadState()
      ? deserializeReadState(reader.getReadState())
      : undefined,
    condition: reader.hasCondition()
      ? deserializeCondition(reader.getCondition())
      : undefined,
    stats: reader.hasStats() ? deserializeStats(reader.getStats()) : undefined
  };
};

const deserializeCondition = (condition: Condition) => {
  return {
    clauses: condition.getClauses().map(deserializeConditionClause),
    clauseCombinationOps: condition
      .getClauseCombinationOps()
      .map(op => op.toString())
  };
};

const deserializeConditionClause = (conditionClause: ConditionClause) => {
  return {
    fieldName: conditionClause.getFieldName(),
    // TODO: What kind of Data type? Is it an array of numbers?
    value: conditionClause.getValue().toArray(),
    op: conditionClause.getOp()
  };
};

const deserializeReadState = (readState: ReadState) => {
  return {
    overflowed: readState.getOverflowed(),
    unsplittable: readState.getUnsplittable(),
    initialized: readState.getInitialized(),
    subarrayPartitioner: deserializeSubarrayPartitioner(
      readState.getSubarrayPartitioner()
    )
  };
};

const deserializeSubarrayPartitioner = (
  subArrayPartitioner: SubarrayPartitioner
) => {
  return {
    subarray: deserializeSubarray(subArrayPartitioner.getSubarray()),
    budget: deserializeAttributeBufferSize(subArrayPartitioner.getBudget()),
    current: deserializeSubarrayPartitionerPartitionInfo(
      subArrayPartitioner.getCurrent()
    ),
    state: deserializeSubarrayPartitionerState(subArrayPartitioner.getState()),
    memoryBudget: subArrayPartitioner.getMemoryBudget().toNumber(),
    memoryBudgetVar: subArrayPartitioner.getMemoryBudgetVar().toNumber(),
    memoryBudgetValidity: subArrayPartitioner
      .getMemoryBudgetValidity()
      .toNumber(),
    stats: deserializeStats(subArrayPartitioner.getStats())
  };
};

const deserializeSubarrayPartitionerState = (
  partitionerState: SubarrayPartitioner_State
) => {
  return {
    start: partitionerState.getStart().toNumber(),
    end: partitionerState.getEnd().toNumber(),
    singleRange: partitionerState
      .getSingleRange()
      .map(singleRange => deserializeSubarray(singleRange)),
    multiRange: partitionerState
      .getMultiRange()
      .map(singleRange => deserializeSubarray(singleRange))
  };
};

const deserializeSubarrayPartitionerPartitionInfo = (
  partitionInfo: SubarrayPartitioner_PartitionInfo
) => {
  return {
    subarray: deserializeSubarray(partitionInfo.getSubarray()),
    start: partitionInfo.getStart().toNumber(),
    end: partitionInfo.getEnd().toNumber(),
    splitMultiRange: partitionInfo.getSplitMultiRange()
  };
};

const deserializeAttributeBufferSize = (
  attrBufferSizeList: capnp.List<AttributeBufferSize>
) => {
  return attrBufferSizeList.map(attr => ({
    attribute: attr.getAttribute()
  }));
};

const deserializeAttributeBufferHeaders = (query: Query) => {
  return query.getAttributeBufferHeaders().map(attrBufferHeader => {
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
        .toNumber()
    };
  });
};

export const deserializeWrite = (query: Query) => {
  const writer = query.getWriter();

  return {
    checkCoordDups: writer.getCheckCoordDups(),
    checkCoordOOB: writer.getCheckCoordOOB(),
    dedupCoords: writer.getDedupCoords(),
    subarray: deserializeDomainArray(writer.getSubarray()),
    subarrayRanges: deserializeSubarray(writer.getSubarrayRanges()),
    stats: deserializeStats(writer.getStats())
  };
};

export const deserializeDomainArray = (domainArray: DomainArray) => {
  const domain: DomainArrayV2 = {};

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

export const deserializeSubarray = (subArray: SubarrayCapnp): Subarray => {
  const ranges: any = subArray.getRanges().map(range => {
    const type = range.getType();
    const bufferSizes = range.getBufferSizes().map(uint64 => uint64.toNumber());

    return {
      type,
      hasDefaultRange: range.getHasDefaultRange(),
      buffer: range.getBuffer().toArray(),
      bufferSizes: bufferSizes,
      bufferStartSizes: range
        .getBufferStartSizes()
        .map(uint64 => uint64.toNumber())
    };
  });
  return {
    layout: subArray.getLayout() as Layout,
    stats: subArray.hasStats()
      ? deserializeStats(subArray.getStats())
      : undefined,
    coalesceRanges: subArray.getCoalesceRanges(),
    relevantFragments: subArray.getRelevantFragments().toArray(),
    ranges: subArray.hasRanges() ? ranges : undefined
  };
};

export const deserializeStats = (stats: StatsCapnp): Stats => {
  return {
    timers: deserializeMapFloat64(stats.getTimers()),
    counters: deserializeMapUInt64(stats.getCounters())
  };
};

export const deserializeMapFloat64 = (mapFloat64: MapFloat64) => {
  const entries = mapFloat64.getEntries().map(entry => {
    return {
      key: entry.getKey(),
      value: entry.getValue()
    };
  });

  return { entries };
};

export const deserializeMapUInt64 = (mapUint64: MapUInt64Capnp): MapUInt64 => {
  const entries = mapUint64.getEntries().map(entry => {
    return {
      key: entry.getKey(),
      value: entry.getValue().toNumber()
    };
  });

  return { entries };
};
