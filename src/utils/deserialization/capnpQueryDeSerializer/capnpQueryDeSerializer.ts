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
  NonEmptyDomain,
  FloatScaleConfig as FloatScaleConfigCapnp,
  ArrayDirectory as ArrayDirectoryCapnp,
  ArrayDirectory_TimestampedURI,
  ArrayDirectory_DeleteAndUpdateTileLocation,
  FragmentMetadata as FragmentMetadataCapnp,
  FragmentMetadata_GenericTileOffsets,
  ReaderIndex as ReaderIndexCapnp,
  ReadStateIndex,
  ResultCellSlab,
  FragmentIndex,
  ArrayMetadata,
  ArrayMetadata_MetadataEntry,
  Map,
  Map_Entry
} from '../../../capnp/rest';
import * as capnp from 'capnp-es';
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
import { AttributeBufferHeader } from '../../../v3';

/**
 * Deserializes an ArrayBuffer to a Query object
 * @param buffer ArrayBuffer of the capnp Query object
 * @returns Query object
 */
const capnpQueryDeSerializer = (
  buffer: ArrayBuffer | ArrayBufferView<ArrayBufferLike>
) => {
  const message = new capnp.Message(buffer, false);
  const query = message.getRoot(Query);

  return {
    attributeBufferHeaders: deserializeAttributeBufferHeaders(query),
    layout: query.layout,
    status: query.status,
    type: query.type,
    writer: deserializeWrite(query),
    reader: deserializeQueryReader(query.reader),
    denseReader: query._hasDenseReader()
      ? deserializeQueryReader(query.denseReader)
      : undefined,
    readerIndex: query._hasReaderIndex()
      ? deserializeReaderIndex(query.readerIndex)
      : undefined,
    array: deserializeArray(query.array),
    totalFixedLengthBufferBytes: Number(query.totalFixedLengthBufferBytes),
    totalVarLenBufferBytes: Number(query.totalVarLenBufferBytes),
    totalValidityBufferBytes: Number(query.totalValidityBufferBytes),
    varOffsetsMode: query.varOffsetsMode,
    varOffsetsAddExtraElement: query.varOffsetsAddExtraElement,
    varOffsetsBitsize: query.varOffsetsBitsize,
    config: deserializeConfig(query.config),
    stats: deserializeStats(query.stats)
  };
};

export default capnpQueryDeSerializer;

export const deserializeReaderIndex = (
  readerIndex: ReaderIndexCapnp
): ReaderIndex => {
  return {
    layout: readerIndex.layout as Layout,
    condition: readerIndex._hasCondition()
      ? deserializeCondition(readerIndex.condition)
      : undefined,
    stats: readerIndex._hasStats()
      ? deserializeStats(readerIndex.stats)
      : undefined,
    subarray: readerIndex._hasSubarray()
      ? deserializeSubarray(readerIndex.subarray)
      : undefined,
    readState: readerIndex._hasReadState()
      ? deserializeReadStateIndex(readerIndex.readState)
      : undefined
  };
};

export const deserializeReadStateIndex = (readerStateIndex: ReadStateIndex) => {
  return {
    doneAddingResultTiles: readerStateIndex.doneAddingResultTiles,
    fragTileIdx: readerStateIndex.fragTileIdx.map(deserializeFragmentIndex),
    resultCellSlab: readerStateIndex.resultCellSlab.map(
      deserializeResultCellSlab
    )
  };
};

const deserializeFragmentIndex = (fragmentIndex: FragmentIndex) => {
  return {
    tileIdx: Number(fragmentIndex.tileIdx),
    cellIdx: Number(fragmentIndex.cellIdx)
  };
};

const deserializeResultCellSlab = (resultCellSlab: ResultCellSlab) => {
  return {
    fragIdx: resultCellSlab.fragIdx,
    tileIdx: Number(resultCellSlab.tileIdx),
    start: Number(resultCellSlab.start),
    length: Number(resultCellSlab.length)
  };
};

export const deserializeArray = (arr: ArrayCapnp): ModelArray => {
  return {
    endTimestamp: Number(arr.endTimestamp),
    queryType: arr.queryType as Querytype,
    uri: arr.uri,
    startTimestamp: Number(arr.startTimestamp),
    arraySchemaLatest: deserializeArraySchema(arr.arraySchemaLatest),
    arraySchemasAll: deserializeArraySchemasAll(arr.arraySchemasAll),
    nonEmptyDomain: deserializeNonEmptyDomainList(arr.nonEmptyDomain),
    arrayMetadata: deserializeArrayMetadata(arr.arrayMetadata),
    arrayDirectory: deserializeArrayDirectory(arr.arrayDirectory),
    fragmentMetadataAll: arr.fragmentMetadataAll.map(
      deserializeFragmentMetadata
    ),
    openedAtEndTimestamp: Number(arr.openedAtEndTimestamp)
  };
};

const deserializeFragmentMetadata = (
  fragmentMetadata: FragmentMetadataCapnp
): FragmentMetadata => {
  return {
    fileSizes: fragmentMetadata.fileSizes.map(Number),
    fileVarSizes: fragmentMetadata.fileVarSizes.toArray().map(Number),
    fileValiditySizes: fragmentMetadata.fileValiditySizes.toArray().map(Number),
    fragmentUri: fragmentMetadata.fragmentUri,
    hasTimestamps: fragmentMetadata.hasTimestamps,
    hasDeleteMeta: fragmentMetadata.hasDeleteMeta,
    sparseTileNum: Number(fragmentMetadata.sparseTileNum),
    tileIndexBase: Number(fragmentMetadata.tileIndexBase),
    tileOffsets: fragmentMetadata.tileOffsets
      .toArray()
      .map(v => v.toArray().map(Number)),
    tileVarOffsets: fragmentMetadata.tileVarOffsets
      .toArray()
      .map(v => v.toArray().map(Number)),
    tileVarSizes: fragmentMetadata.tileVarSizes
      .toArray()
      .map(v => v.toArray().map(Number)),
    tileValidityOffsets: fragmentMetadata.tileValidityOffsets
      .toArray()
      .map(v => v.toArray().map(Number)),
    tileMinBuffer: fragmentMetadata.tileMinBuffer
      .toArray()
      .map(v => v.toArray()),
    tileMinVarBuffer: fragmentMetadata.tileMinVarBuffer
      .toArray()
      .map(v => v.toArray()),
    tileMaxBuffer: fragmentMetadata.tileMaxBuffer
      .toArray()
      .map(v => v.toArray()),
    tileMaxVarBuffer: fragmentMetadata.tileMaxVarBuffer
      .toArray()
      .map(v => v.toArray()),
    tileSums: fragmentMetadata.tileSums.toArray().map(v => v.toArray()),
    tileNullCounts: fragmentMetadata.tileNullCounts
      .toArray()
      .map(v => v.toArray().map(Number)),
    fragmentMins: fragmentMetadata.fragmentMins.toArray().map(v => v.toArray()),
    fragmentMaxs: fragmentMetadata.fragmentMaxs.toArray().map(v => v.toArray()),
    fragmentSums: fragmentMetadata.fragmentSums.toArray().map(Number),
    fragmentNullCounts: fragmentMetadata.fragmentNullCounts
      .toArray()
      .map(Number),
    version: fragmentMetadata.version,
    timestampRange: fragmentMetadata.timestampRange.toArray().map(Number),
    lastTileCellNum: Number(fragmentMetadata.lastTileCellNum),
    nonEmptyDomain: deserializeNonEmptyDomainList(
      fragmentMetadata.nonEmptyDomain
    ),
    rtree: fragmentMetadata.rtree.toArrayBuffer(),
    hasConsolidatedFooter: fragmentMetadata.hasConsolidatedFooter,
    gtOffsets: deserializeGenericTileOffsets(fragmentMetadata.gtOffsets)
  };
};

const deserializeGenericTileOffsets = (
  genericTileOffsets: FragmentMetadata_GenericTileOffsets
): GenericTileOffsets => {
  return {
    rtree: Number(genericTileOffsets.rtree),
    tileOffsets: genericTileOffsets.tileOffsets.map(Number),
    tileVarOffsets: genericTileOffsets.tileVarOffsets.map(Number),
    tileVarSizes: genericTileOffsets.tileVarSizes.map(Number),
    tileValidityOffsets: genericTileOffsets.tileValidityOffsets.map(Number),
    tileMinOffsets: genericTileOffsets.tileMinOffsets.map(Number),
    tileMaxOffsets: genericTileOffsets.tileMaxOffsets.map(Number),
    tileSumOffsets: genericTileOffsets.tileSumOffsets.map(Number),
    tileNullCountOffsets: genericTileOffsets.tileNullCountOffsets.map(Number),
    fragmentMinMaxSumNullCountOffset: Number(
      genericTileOffsets.fragmentMinMaxSumNullCountOffset
    ),
    processedConditionsOffsets: Number(
      genericTileOffsets.processedConditionsOffsets
    )
  };
};

const deserializeArrayDirectory = (
  arrayDirectory: ArrayDirectoryCapnp
): ArrayDirectory => {
  return {
    unfilteredFragmentUris: arrayDirectory.unfilteredFragmentUris.toArray(),
    consolidatedCommitUris: arrayDirectory.consolidatedCommitUris.toArray(),
    arraySchemaUris: arrayDirectory.arraySchemaUris.toArray(),
    latestArraySchemaUri: arrayDirectory.latestArraySchemaUri,
    arrayMetaUrisToVacuum: arrayDirectory.arrayMetaUrisToVacuum.toArray(),
    arrayMetaVacUrisToVacuum: arrayDirectory.arrayMetaVacUrisToVacuum.toArray(),
    commitUrisToConsolidate: arrayDirectory.commitUrisToConsolidate.toArray(),
    commitUrisToVacuum: arrayDirectory.commitUrisToVacuum.toArray(),
    consolidatedCommitUrisToVacuum:
      arrayDirectory.consolidatedCommitUrisToVacuum.toArray(),
    arrayMetaUris: arrayDirectory.arrayMetaUris.map(deserialiazeTimestampedURI),
    fragmentMetaUris: arrayDirectory.fragmentMetaUris.toArray(),
    deleteAndUpdateTileLocation: arrayDirectory.deleteAndUpdateTileLocation.map(
      deserializeDeleteAndUpdateTileLocation
    ),
    timestampStart: Number(arrayDirectory.timestampStart),
    timestampEnd: Number(arrayDirectory.timestampEnd)
  };
};

const deserializeDeleteAndUpdateTileLocation = (
  deleteAndUpdateTileLocation: ArrayDirectory_DeleteAndUpdateTileLocation
) => {
  return {
    uri: deleteAndUpdateTileLocation.uri,
    conditionMarker: deleteAndUpdateTileLocation.conditionMarker,
    offset: Number(deleteAndUpdateTileLocation.offset)
  };
};

const deserialiazeTimestampedURI = (
  timestampedURI: ArrayDirectory_TimestampedURI
) => {
  return {
    uri: timestampedURI.uri,
    timestampStart: Number(timestampedURI.timestampStart),
    timestampEnd: Number(timestampedURI.timestampEnd)
  };
};

const deserializeArraySchemasAll = (map: Map): ArraySchemaMap => {
  return {
    entries: map.entries.map(deserializeMapEntry)
  };
};

export const deserializeMapEntry = (mapEntry: Map_Entry): ArraySchemaEntry => {
  return {
    key: capnp.utils.getText(0, mapEntry, ''),
    value: deserializeArraySchema(
      capnp.utils.getAs(ArraySchema, mapEntry.value)
    )
  };
};

export const deserializeNonEmptyDomainList = (
  nonEmptyDomainList: NonEmptyDomainList
) => {
  return {
    nonEmptyDomains: nonEmptyDomainList.nonEmptyDomains.map(
      deserializeNonEmptyDomain
    )
  };
};

export const deserializeNonEmptyDomain = (nonEmptyDomain: NonEmptyDomain) => {
  return {
    isEmpty: nonEmptyDomain.isEmpty,
    sizes: nonEmptyDomain.sizes.map(Number),
    nonEmptyDomain: deserializeDomainArray(nonEmptyDomain.nonEmptyDomain)
  };
};

export const deserializeArrayMetadata = (arrayMetadata: ArrayMetadata) => {
  return {
    entries: arrayMetadata.entries.map(deserializeMetadataEntry)
  };
};

export const deserializeMetadataEntry = (
  entry: ArrayMetadata_MetadataEntry
) => {
  const metadataEntry = {
    key: entry.key,
    type: entry.type,
    valueNum: entry.valueNum,
    del: entry.del,
    value: entry.value.toArray()
  };

  return metadataEntry;
};

export const deserializeArraySchema = (schema: ArraySchema): ArraySchemaV2 => {
  return {
    arrayType: schema.arrayType as ArrayType,
    capacity: Number(schema.capacity),
    cellOrder: schema.cellOrder as Layout,
    tileOrder: schema.tileOrder as Layout,
    uri: schema.uri,
    version: schema.version.toArray(),
    allowsDuplicates: schema.allowsDuplicates,
    name: schema.name,
    timestampRange: schema.timestampRange.map(Number),
    coordsFilterPipeline: deserializeFilterPipeline(
      schema.coordsFilterPipeline
    ),
    offsetFilterPipeline: deserializeFilterPipeline(
      schema.offsetFilterPipeline
    ),
    validityFilterPipeline: deserializeFilterPipeline(
      schema.validityFilterPipeline
    ),
    domain: deserializeDomain(schema.domain),
    attributes: schema.attributes.map(deserializeAttribute)
  };
};

export const deserializeAttribute = (attribute: Attribute): AttributeV2 => {
  return {
    cellValNum: attribute.cellValNum,
    name: attribute.name,
    type: attribute.type as Datatype,
    filterPipeline: deserializeFilterPipeline(attribute.filterPipeline),
    fillValue: attribute.fillValue.toArray(),
    nullable: attribute.nullable,
    fillValueValidity: attribute.fillValueValidity
  };
};

export const deserializeDomain = (domain: Domain): DomainV2 => {
  return {
    type: domain.type as Datatype,
    tileOrder: domain.tileOrder as Layout,
    cellOrder: domain.cellOrder as Layout,
    dimensions: domain.dimensions.map(deserializeDimension)
  };
};

export const deserializeDimension = (dimension: Dimension): DimensionV2 => {
  return {
    name: dimension.name,
    type: dimension.type as Datatype,
    domain: deserializeDomainArray(dimension.domain),
    nullTileExtent: dimension.nullTileExtent,
    tileExtent: deserializeTileExtent(dimension.tileExtent),
    filterPipeline: deserializeFilterPipeline(dimension.filterPipeline)
  };
};

export const deserializeTileExtent = (tileExtent: Dimension_TileExtent) => {
  const tile: DimensionTileExtent = {};

  if (tileExtent._isInt8) {
    tile.int8 = tileExtent.int8;
  }

  if (tileExtent._isUint8) {
    tile.uint8 = tileExtent.uint8;
  }

  if (tileExtent._isInt16) {
    tile.int16 = tileExtent.int16;
  }

  if (tileExtent._isUint16) {
    tile.uint16 = tileExtent.uint16;
  }

  if (tileExtent._isInt32) {
    tile.int32 = tileExtent.int32;
  }

  if (tileExtent._isUint32) {
    tile.int32 = tileExtent.uint32;
  }

  if (tileExtent._isInt64) {
    tile.int64 = Number(tileExtent.int64);
  }

  if (tileExtent._isUint64) {
    tile.uint64 = Number(tileExtent.uint64);
  }

  if (tileExtent._isFloat32) {
    tile.float32 = tileExtent.float32;
  }

  if (tileExtent._isFloat64) {
    tile.float64 = tileExtent.float64;
  }

  return tile;
};

export const deserializeFilterPipeline = (
  filterPipeline: FilterPipeline
): FilterPipelineV2 => {
  return {
    filters: filterPipeline.filters.map(deserializeFilter)
  };
};

export const deserializeFilter = (filter: Filter): FilterV2 => {
  return {
    type: filter.type as FilterType,
    data: deserializeFilterData(filter.data),
    floatScaleConfig: deserializeFloatScaleConfig(filter.floatScaleConfig)
  };
};

export const deserializeFloatScaleConfig = (
  floatScaleConfig: FloatScaleConfigCapnp
): FloatScaleConfig => {
  return {
    byteWidth: Number(floatScaleConfig.byteWidth),
    offset: floatScaleConfig.offset,
    scale: floatScaleConfig.scale
  };
};

export const deserializeFilterData = (data: Filter_Data) => {
  const filterData: FilterData = {};

  if (data._isText) {
    filterData.text = data.text;
  }

  if (data._isInt8) {
    filterData.int8 = data.int8;
  }

  if (data._isUint8) {
    filterData.uint8 = data.uint8;
  }

  if (data._isInt16) {
    filterData.int16 = data.int16;
  }

  if (data._isUint16) {
    filterData.uint16 = data.uint16;
  }

  if (data._isInt32) {
    filterData.int32 = data.int32;
  }

  if (data._isUint32) {
    filterData.uint32 = data.uint32;
  }

  if (data._isInt64) {
    filterData.int64 = Number(data.int64);
  }

  if (data._isUint64) {
    filterData.uint64 = Number(data.uint64);
  }

  if (data._isFloat32) {
    filterData.float32 = data.float32;
  }

  if (data._isFloat64) {
    filterData.float64 = data.float64;
  }

  if (data._isBytes) {
    filterData.bytes = data.bytes.toArray();
  }

  return filterData;
};

export const deserializeConfig = (config: Config) => {
  const entries = config.entries.map(entry => ({
    key: entry.key,
    value: entry.value
  }));

  return { entries };
};

export const deserializeQueryReader = (reader: QueryReader) => {
  return {
    layout: reader.layout,
    subarray: reader._hasSubarray()
      ? deserializeSubarray(reader.subarray)
      : undefined,
    readState: reader._hasReadState()
      ? deserializeReadState(reader.readState)
      : undefined,
    condition: reader._hasCondition()
      ? deserializeCondition(reader.condition)
      : undefined,
    stats: reader._hasStats() ? deserializeStats(reader.stats) : undefined
  };
};

const deserializeCondition = (condition: Condition) => {
  return {
    clauses: condition.clauses.map(deserializeConditionClause),
    clauseCombinationOps: condition.clauseCombinationOps.map(op =>
      op.toString()
    )
  };
};

const deserializeConditionClause = (conditionClause: ConditionClause) => {
  return {
    fieldName: conditionClause.fieldName,
    // TODO: What kind of Data type? Is it an array of numbers?
    value: conditionClause.value.toArray(),
    op: conditionClause.op
  };
};

const deserializeReadState = (readState: ReadState) => {
  return {
    overflowed: readState.overflowed,
    unsplittable: readState.unsplittable,
    initialized: readState.initialized,
    subarrayPartitioner: deserializeSubarrayPartitioner(
      readState.subarrayPartitioner
    )
  };
};

const deserializeSubarrayPartitioner = (
  subArrayPartitioner: SubarrayPartitioner
) => {
  return {
    subarray: deserializeSubarray(subArrayPartitioner.subarray),
    budget: deserializeAttributeBufferSize(subArrayPartitioner.budget),
    current: deserializeSubarrayPartitionerPartitionInfo(
      subArrayPartitioner.current
    ),
    state: deserializeSubarrayPartitionerState(subArrayPartitioner.state),
    memoryBudget: Number(subArrayPartitioner.memoryBudget),
    memoryBudgetVar: Number(subArrayPartitioner.memoryBudgetVar),
    memoryBudgetValidity: Number(subArrayPartitioner.memoryBudgetValidity),
    stats: deserializeStats(subArrayPartitioner.stats)
  };
};

const deserializeSubarrayPartitionerState = (
  partitionerState: SubarrayPartitioner_State
) => {
  return {
    start: Number(partitionerState.start),
    end: Number(partitionerState.end),
    singleRange: partitionerState.singleRange.map(singleRange =>
      deserializeSubarray(singleRange)
    ),
    multiRange: partitionerState.multiRange.map(singleRange =>
      deserializeSubarray(singleRange)
    )
  };
};

const deserializeSubarrayPartitionerPartitionInfo = (
  partitionInfo: SubarrayPartitioner_PartitionInfo
) => {
  return {
    subarray: deserializeSubarray(partitionInfo.subarray),
    start: Number(partitionInfo.start),
    end: Number(partitionInfo.end),
    splitMultiRange: partitionInfo.splitMultiRange
  };
};

const deserializeAttributeBufferSize = (
  attrBufferSizeList: capnp.List<AttributeBufferSize>
) => {
  return attrBufferSizeList.map(attr => ({
    attribute: attr.attribute
  }));
};

export function deserializeAttributeBufferHeaders(
  query: Query
): Array<AttributeBufferHeader> {
  return query.attributeBufferHeaders.map(attrBufferHeader => {
    return {
      name: attrBufferHeader.name,
      fixedLenBufferSizeInBytes: Number(
        attrBufferHeader.fixedLenBufferSizeInBytes
      ),
      varLenBufferSizeInBytes: Number(attrBufferHeader.varLenBufferSizeInBytes),
      validityLenBufferSizeInBytes: Number(
        attrBufferHeader.validityLenBufferSizeInBytes
      ),
      originalFixedLenBufferSizeInBytes: Number(
        attrBufferHeader.originalFixedLenBufferSizeInBytes
      ),
      originalVarLenBufferSizeInBytes: Number(
        attrBufferHeader.originalVarLenBufferSizeInBytes
      ),
      originalValidityLenBufferSizeInBytes: Number(
        attrBufferHeader.originalValidityLenBufferSizeInBytes
      )
    };
  });
}

export const deserializeWrite = (query: Query) => {
  const writer = query.writer;

  return {
    checkCoordDups: writer.checkCoordDups,
    checkCoordOOB: writer.checkCoordOOB,
    dedupCoords: writer.dedupCoords,
    subarray: deserializeDomainArray(writer.subarray),
    subarrayRanges: deserializeSubarray(writer.subarrayRanges),
    stats: deserializeStats(writer.stats)
  };
};

export const deserializeDomainArray = (domainArray: DomainArray) => {
  const domain: DomainArrayV2 = {};

  const int8 = domainArray.int8.toArray();
  const int16 = domainArray.int16.toArray();
  const int32 = domainArray.int32.toArray();
  const int64 = domainArray.int64.toArray().map(Number);
  const uint8 = domainArray.uint8.toArray();
  const uint16 = domainArray.uint16.toArray();
  const uint32 = domainArray.uint32.toArray();
  const uint64 = domainArray.uint64.toArray().map(Number);
  const float32 = domainArray.float32.toArray();
  const float64 = domainArray.float64.toArray();

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
  const ranges = subArray.ranges.map(range => {
    const type = range.type as Datatype;
    const bufferSizes = range.bufferSizes.map(Number);

    return {
      type,
      hasDefaultRange: range.hasDefaultRange,
      buffer: range.buffer.toArray(),
      bufferSizes: bufferSizes,
      bufferStartSizes: range.bufferStartSizes.map(Number)
    };
  });
  return {
    layout: subArray.layout as Layout,
    stats: subArray._hasStats() ? deserializeStats(subArray.stats) : undefined,
    coalesceRanges: subArray.coalesceRanges,
    relevantFragments: subArray.relevantFragments.toArray(),
    ranges: subArray._hasRanges() ? ranges : undefined
  };
};

export const deserializeStats = (stats: StatsCapnp): Stats => {
  return {
    timers: deserializeMapFloat64(stats.timers),
    counters: deserializeMapUInt64(stats.counters)
  };
};

export const deserializeMapFloat64 = (mapFloat64: MapFloat64) => {
  const entries = mapFloat64.entries.map(entry => {
    return {
      key: entry.key,
      value: entry.value
    };
  });

  return { entries };
};

export const deserializeMapUInt64 = (mapUint64: MapUInt64Capnp): MapUInt64 => {
  const entries = mapUint64.entries.map(entry => {
    return {
      key: entry.key,
      value: Number(entry.value)
    };
  });

  return { entries };
};
