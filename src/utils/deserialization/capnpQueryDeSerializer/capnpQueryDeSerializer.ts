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
  MapUInt64,
  Query,
  QueryReader,
  ReadState,
  Stats,
  Subarray,
  SubarrayPartitioner,
  SubarrayPartitioner_PartitionInfo,
  SubarrayPartitioner_State,
} from "../../../capnp/query_capnp";
import * as capnp from "capnp-ts";
import {
  ArrayMetadata,
  ArrayMetadata_MetadataEntry,
} from "../../../capnp/arrayMetadata_capnp";

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
    stats: deserializeStats(query.getStats()),
  };
};

export default capnpQueryDeSerializer;

export const deserializeArray = (arr: ArrayCapnp): unknown => {
  return {
    endTimestamp: arr.getEndTimestamp().toNumber(),
    queryType: arr.getQueryType() as any,
    uri: arr.getUri(),
    startTimestamp: arr.getStartTimestamp().toNumber(),
    arraySchemaLatest: deserializeArraySchema(arr.getArraySchemaLatest()),
    arrayMetadata: deserializeArrayMetadata(arr.getArrayMetadata()),
  };
};

export const deserializeArrayMetadata = (arrayMetadata: ArrayMetadata) => {
  return {
    entries: arrayMetadata.getEntries().map(deserializeMetadataEntry),
  };
};

export const deserializeMetadataEntry = (
  entry: ArrayMetadata_MetadataEntry
) => {
  let metadataEntry = {
    key: entry.getKey(),
    type: entry.getType(),
    valueNum: entry.getValueNum(),
    del: entry.getDel(),
  };

  return metadataEntry;
};

export const deserializeArraySchema = (schema: ArraySchema) => {
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
    attributes: schema.getAttributes().map(deserializeAttribute),
  };
};

export const deserializeAttribute = (attribute: Attribute) => {
  return {
    cellValNum: attribute.getCellValNum(),
    name: attribute.getName(),
    type: attribute.getType(),
    filterPipeline: deserializeFilterPipeline(attribute.getFilterPipeline()),
    fillValue: attribute.getFillValue().toArray(),
    nullable: attribute.getNullable(),
    fillValueValidity: attribute.getFillValueValidity(),
  };
};

export const deserializeDomain = (domain: Domain) => {
  return {
    type: domain.getType(),
    tileOrder: domain.getTileOrder(),
    cellOrder: domain.getCellOrder(),
    dimensions: domain.getDimensions().map(deserializeDimension),
  };
};

export const deserializeDimension = (dimension: Dimension) => {
  return {
    name: dimension.getName(),
    type: dimension.getType(),
    domain: deserializeDomainArray(dimension.getDomain()),
    nullTileExtent: dimension.getNullTileExtent(),
    tileExtent: deserializeTileExtent(dimension.getTileExtent()),
    filterPipeline: deserializeFilterPipeline(dimension.getFilterPipeline()),
  };
};

export const deserializeTileExtent = (tileExtent: Dimension_TileExtent) => {
  let tile = {};

  try {
    const int8 = tileExtent.getInt8();
    Object.assign(tile, { int8 });
  } catch {}

  try {
    const uint8 = tileExtent.getUint8();
    Object.assign(tile, { uint8 });
  } catch {}

  try {
    const int16 = tileExtent.getInt16();
    Object.assign(tile, { int16 });
  } catch {}

  try {
    const uint16 = tileExtent.getUint16();
    Object.assign(tile, { uint16 });
  } catch {}

  try {
    const int32 = tileExtent.getInt32();
    Object.assign(tile, { int32 });
  } catch {}

  try {
    const int64 = tileExtent.getInt64();
    Object.assign(tile, { int64 });
  } catch {}

  try {
    const uint64 = tileExtent.getUint64();
    Object.assign(tile, { uint64 });
  } catch {}

  try {
    const float32 = tileExtent.getFloat32();
    Object.assign(tile, { float32 });
  } catch {}

  try {
    const float64 = tileExtent.getFloat64();
    Object.assign(tile, { float64 });
  } catch {}

  return tile;
};

export const deserializeFilterPipeline = (filterPipeline: FilterPipeline) => {
  return {
    filters: filterPipeline.getFilters().map(deserializeFilter),
  };
};

export const deserializeFilter = (filter: Filter) => {
  return {
    type: filter.getType(),
    data: deserializeFilterData(filter.getData()),
  };
};

export const deserializeFilterData = (data: Filter_Data) => {
  let filterData = {};
  try {
    const text = data.getText();
    Object.assign(filterData, { text });
  } catch {}

  try {
    const int8 = data.getInt8();
    Object.assign(filterData, { int8 });
  } catch {}

  try {
    const uint8 = data.getUint8();
    Object.assign(filterData, { uint8 });
  } catch {}

  try {
    const int16 = data.getInt16();
    Object.assign(filterData, { int16 });
  } catch {}

  try {
    const uint16 = data.getUint16();
    Object.assign(filterData, { uint16 });
  } catch {}

  try {
    const int32 = data.getInt32();
    Object.assign(filterData, { int32 });
  } catch {}

  try {
    const uint32 = data.getUint32();
    Object.assign(filterData, { uint32 });
  } catch {}

  try {
    const int64 = data.getInt16();
    Object.assign(filterData, { int64 });
  } catch {}

  try {
    const uint64 = data.getUint16();
    Object.assign(filterData, { uint64 });
  } catch {}

  try {
    const float32 = data.getFloat32();
    Object.assign(filterData, { float32 });
  } catch {}

  try {
    const float64 = data.getFloat64();
    Object.assign(filterData, { float64 });
  } catch {}

  return filterData;
};

export const deserializeConfig = (config: Config) => {
  const entries = config.getEntries().map((entry) => ({
    key: entry.getKey(),
    value: entry.getValue(),
  }));

  return { entries };
};

export const deserializeQueryReader = (reader: QueryReader) => {
  return {
    layout: reader.getLayout(),
    subarray: deserializeSubarray(reader.getSubarray()),
    readState: deserializeReadState(reader.getReadState()),
    condition: deserializeCondition(reader.getCondition()),
    stats: deserializeStats(reader.getStats()),
  };
};

const deserializeCondition = (condition: Condition) => {
  return {
    clauses: condition.getClauses().map(deserializeConditionClause),
    clauseCombinationOps: condition
      .getClauseCombinationOps()
      .map((op) => op.toString()),
  };
};

const deserializeConditionClause = (conditionClause: ConditionClause) => {
  return {
    fieldName: conditionClause.getFieldName(),
    // TODO: What kind of Data type? Is it an array of numbers?
    value: conditionClause.getValue().toArray(),
    op: conditionClause.getOp(),
  };
};

const deserializeReadState = (readState: ReadState) => {
  return {
    overflowed: readState.getOverflowed(),
    unsplittable: readState.getUnsplittable(),
    initialized: readState.getInitialized(),
    subarrayPartitioner: deserializeSubarrayPartitioner(
      readState.getSubarrayPartitioner()
    ),
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
    stats: deserializeStats(subArrayPartitioner.getStats()),
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
      .map((singleRange) => deserializeSubarray(singleRange)),
    multiRange: partitionerState
      .getMultiRange()
      .map((singleRange) => deserializeSubarray(singleRange)),
  };
};

const deserializeSubarrayPartitionerPartitionInfo = (
  partitionInfo: SubarrayPartitioner_PartitionInfo
) => {
  return {
    subarray: deserializeSubarray(partitionInfo.getSubarray()),
    start: partitionInfo.getStart().toNumber(),
    end: partitionInfo.getEnd().toNumber(),
    splitMultiRange: partitionInfo.getSplitMultiRange(),
  };
};

const deserializeAttributeBufferSize = (
  attrBufferSizeList: capnp.List<AttributeBufferSize>
) => {
  return attrBufferSizeList.map((attr) => ({
    attribute: attr.getAttribute(),
  }));
};

const deserializeAttributeBufferHeaders = (query: Query) => {
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

export const deserializeWrite = (query: Query) => {
  const writer = query.getWriter();

  return {
    checkCoordDups: writer.getCheckCoordDups(),
    checkCoordOOB: writer.getCheckCoordOOB(),
    dedupCoords: writer.getDedupCoords(),
    subarray: deserializeDomainArray(writer.getSubarray()),
    subarrayRanges: deserializeSubarray(writer.getSubarrayRanges()),
    stats: deserializeStats(writer.getStats()),
  };
};

export const deserializeDomainArray = (domainArray: DomainArray) => {
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

export const deserializeSubarray = (subArray: Subarray) => {
  return {
    layout: subArray.getLayout(),
    stats: deserializeStats(subArray.getStats()),
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

export const deserializeStats = (stats: Stats) => {
  return {
    timers: deserializeMapFloat64(stats.getTimers()),
    counters: deserializeMapUInt64(stats.getCounters()),
  };
};

export const deserializeMapFloat64 = (mapFloat64: MapFloat64) => {
  return mapFloat64.getEntries().map((entry) => {
    return {
      key: entry.getKey(),
      value: entry.getValue(),
    };
  });
};

export const deserializeMapUInt64 = (mapUint64: MapUInt64) => {
  return mapUint64.getEntries().map((entry) => {
    return {
      key: entry.getKey(),
      value: entry.getValue().toNumber(),
    };
  });
};
