import {
  Array,
  AttributeBufferSize,
  Condition,
  ConditionClause,
  Config,
  DomainArray,
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
} from "../capnp/query.capnp";
import * as capnp from "capnp-ts";

const identity = <T>(x: T) => x;

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
      .toDataView()
      .getUint8(0),
    totalVarLenBufferBytes: query
      .getTotalVarLenBufferBytes()
      .toDataView()
      .getUint8(0),
    totalValidityBufferBytes: query
      .getTotalValidityBufferBytes()
      .toDataView()
      .getUint8(0),
    varOffsetsMode: query.getVarOffsetsMode(),
    varOffsetsAddExtraElement: query.getVarOffsetsAddExtraElement(),
    varOffsetsBitsize: query.getVarOffsetsBitsize(),
    config: deserializeConfig(query.getConfig()),
    stats: deserializeStats(query.getStats()),
  };
};

export default capnpQueryDeSerializer;

export const deserializeArray = (arr: Array) => {
  return {
    endTimestamp: arr.getEndTimestamp().toNumber(),
    queryType: arr.getQueryType(),
    uri: arr.getUri(),
    startTimestamp: arr.getStartTimestamp().toNumber(),
  };
};

export const deserializeConfig = (config: Config) => {
  const entries =  config.getEntries().map((entry) => ({
    key: entry.getKey(),
    value: entry.getValue(),
  }));

  return { entries }
};

export const deserializeQueryReader = (reader: QueryReader) => {
  return {
    layout: reader.getLayout(),
    subarray: deserializeSubarrayRanges(reader.getSubarray()),
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
    subarray: deserializeSubarrayRanges(subArrayPartitioner.getSubarray()),
    budget: deserializeAttributeBufferSize(subArrayPartitioner.getBudget()),
    current: deserializeSubarrayPartitionerPartitionInfo(
      subArrayPartitioner.getCurrent()
    ),
    state: deserializeSubarrayPartitionerState(subArrayPartitioner.getState()),
    memoryBudget: subArrayPartitioner
      .getMemoryBudget()
      .toDataView()
      .getUint8(0),
    memoryBudgetVar: subArrayPartitioner
      .getMemoryBudgetVar()
      .toDataView()
      .getUint8(0),
    memoryBudgetValidity: subArrayPartitioner
      .getMemoryBudgetValidity()
      .toDataView()
      .getUint8(0),
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
      .map((singleRange) => deserializeSubarrayRanges(singleRange)),
    multiRange: partitionerState
      .getMultiRange()
      .map((singleRange) => deserializeSubarrayRanges(singleRange)),
  };
};

const deserializeSubarrayPartitionerPartitionInfo = (
  partitionInfo: SubarrayPartitioner_PartitionInfo
) => {
  return {
    subarray: deserializeSubarrayRanges(partitionInfo.getSubarray()),
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
        .toDataView()
        .getUint8(0),
      varLenBufferSizeInBytes: attrBufferHeader
        .getVarLenBufferSizeInBytes()
        .toDataView()
        .getUint8(0),
      validityLenBufferSizeInBytes: attrBufferHeader
        .getValidityLenBufferSizeInBytes()
        .toDataView()
        .getUint8(0),
      originalFixedLenBufferSizeInBytes: attrBufferHeader
        .getOriginalFixedLenBufferSizeInBytes()
        .toDataView()
        .getUint8(0),
      originalVarLenBufferSizeInBytes: attrBufferHeader
        .getOriginalVarLenBufferSizeInBytes()
        .toDataView()
        .getUint8(0),
      originalValidityLenBufferSizeInBytes: attrBufferHeader
        .getOriginalValidityLenBufferSizeInBytes()
        .toDataView()
        .getUint8(0),
    };
  });
};

export const deserializeWrite = (query: Query) => {
  const writer = query.getWriter();

  return {
    checkCoordDups: writer.getCheckCoordDups(),
    checkCoordOOB: writer.getCheckCoordOOB(),
    dedupCoords: writer.getDedupCoords(),
    subarray: deserializeSubArray(writer.getSubarray()),
    subarrayRanges: deserializeSubarrayRanges(writer.getSubarrayRanges()),
    stats: deserializeStats(writer.getStats()),
  };
};

export const deserializeSubArray = (domainArray: DomainArray) => {
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

export const deserializeSubarrayRanges = (subArray: Subarray) => {
  
  return ({
    layout: subArray.getLayout(),
    stats: deserializeStats(subArray.getStats()),
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
