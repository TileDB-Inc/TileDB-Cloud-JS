import {
  Query,
  Subarray,
  DomainArray,
  ModelArray,
  ArraySchema,
  FilterPipeline,
  Attribute,
  Domain,
  Dimension,
  NonEmptyDomain,
  ArrayMetadata,
  FloatScaleConfig,
  ArrayDirectory,
  FragmentMetadata,
  QueryReader,
  ReaderIndex,
  ReadStateIndex,
  FragmentIndex,
  ResultCellSlab,
  Condition,
  SubarrayRanges,
  ConditionClause,
  Stats,
  GlobalWriteState,
  FragmentMetadataGtOffsets,
  SingleCoord,
  MultiPartUploadState,
  UnorderedWriterState,
  ReadState,
  SubarrayPartitioner,
  CurrentDomain,
  Enumeration,
  DimensionLabel,
  Config,
  Delete,
  QueryChannel,
  ASTNode,
  WebpConfig
} from '../../../v3';
import {
  Query as QueryCapnp,
  Subarray as SubarrayCapnp,
  Array as ArrayCapnp,
  FilterPipeline as FilterPipelineCapnp,
  ArraySchema as ArraySchemaCapnp,
  Attribute as AttributeCapnp,
  Domain as DomainCapnp,
  DomainArray as DomainArrayCapnp,
  Dimension as DimensionCapnp,
  NonEmptyDomainList as NonEmptyDomainListCapnp,
  NonEmptyDomain as NonEmptyDomainCapnp,
  ArrayMetadata as ArrayMetadataCapnp,
  FloatScaleConfig as FloatScaleConfigCapnp,
  ArrayDirectory as ArrayDirectoryCapnp,
  FragmentMetadata as FragmentMetadataCapnp,
  QueryReader as QueryReaderCapnp,
  ReaderIndex as ReaderIndexCapnp,
  FragmentMetadata_GenericTileOffsets,
  ReadStateIndex as ReadStateIndexCapnp,
  FragmentIndex as FragmentIndexCapnp,
  ResultCellSlab as ResultCellSlabCapnp,
  Condition as ConditionCapnp,
  ConditionClause as ConditionClauseCapnp,
  SubarrayRanges as SubarrayRangesCapnp,
  Stats as StatsCapnp,
  GlobalWriteState as GlobalWriteStateCapnp,
  MultiPartUploadState as MultiPartUploadStateCapnp,
  SingleCoord as SingleCoordCapnp,
  UnorderedWriterState as UnorderedWriterStateCapnp,
  ReadState as ReadStateCapnp,
  SubarrayPartitioner as SubarrayPartitionerCapnp,
  CurrentDomain as CurrentDomainCapnp,
  Enumeration as EnumerationCapnp,
  DimensionLabel as DimensionLabelCapnp,
  Config as ConfigCapnp,
  Delete as DeleteCapnp,
  QueryChannel as QueryChannelCapnp,
  ASTNode as ASTNodeCapnp,
  WebpConfig as WebpConfigCapnp
} from '../../../capnp/rest';

import * as capnp from 'capnp-es';

/**
 * Serialize the Query object to capnp
 * @param data Query javascript object
 * @returns ArrayBuffer of the capnp Query object
 */
const capnpQuerySerializer = (data: Partial<Query>) => {
  const message = new capnp.Message();
  const queryData = message.initRoot(QueryCapnp);
  const {
    attributeBufferHeaders = [],
    writer,
    reader,
    array,
    config,
    stats,
    readerIndex,
    denseReader,
    writtenFragmentInfo,
    orderedDimLabelReader,
    channels = []
  } = data;

  // Serialize primitives
  queryData.layout = data.layout;
  queryData.status = data.status;
  queryData.type = data.type;
  queryData.totalFixedLengthBufferBytes = BigInt(
    data.totalFixedLengthBufferBytes || 0
  );
  queryData.totalVarLenBufferBytes = BigInt(data.totalVarLenBufferBytes || 0);
  queryData.totalValidityBufferBytes = BigInt(
    data.totalValidityBufferBytes || 0
  );
  queryData.varOffsetsMode = 'bytes';
  queryData.varOffsetsAddExtraElement = false;
  queryData.varOffsetsBitsize = 64;

  // Serialize writtenBuffers
  const attrBuffers = queryData._initAttributeBufferHeaders(
    attributeBufferHeaders.length
  );
  attributeBufferHeaders.forEach((attrHeader, i) => {
    const attrBufferHeader = attrBuffers.get(i);

    attrBufferHeader.name = attrHeader.name;
    attrBufferHeader.fixedLenBufferSizeInBytes = BigInt(
      attrHeader.fixedLenBufferSizeInBytes
    );
    attrBufferHeader.validityLenBufferSizeInBytes = BigInt(
      attrHeader.validityLenBufferSizeInBytes
    );
    attrBufferHeader.varLenBufferSizeInBytes = BigInt(
      attrHeader.varLenBufferSizeInBytes
    );
    const {
      originalFixedLenBufferSizeInBytes = 0,
      originalVarLenBufferSizeInBytes = 0,
      originalValidityLenBufferSizeInBytes = 0
    } = attrHeader;

    attrBufferHeader.originalFixedLenBufferSizeInBytes = BigInt(
      originalFixedLenBufferSizeInBytes
    );

    attrBufferHeader.originalVarLenBufferSizeInBytes = BigInt(
      originalVarLenBufferSizeInBytes
    );

    attrBufferHeader.originalValidityLenBufferSizeInBytes = BigInt(
      originalValidityLenBufferSizeInBytes
    );
  });

  // Serialize writer
  if (writer) {
    const queryWriter = queryData._initWriter();

    // Serialize primitives
    queryWriter.checkCoordDups = writer.checkCoordDups || false;
    queryWriter.checkCoordOOB = writer.checkCoordOOB || false;
    queryWriter.dedupCoords = writer.dedupCoords || false;

    // Serialize subarray
    if (writer.subarray) {
      serializeDomainArray(queryWriter._initSubarray(), writer.subarray);
    }

    // Serialize subarrayRanges
    if (writer.subarrayRanges) {
      serializeSubArray(
        queryWriter._initSubarrayRanges(),
        writer.subarrayRanges
      );
    }

    // Serialize stats
    if (writer.stats) {
      serializeStats(queryWriter._initStats(), writer.stats);
    }

    // Serialize globalWriteStateV1
    if (writer.globalWriteStateV1) {
      serializeGlobalWriteState(
        queryWriter._initGlobalWriteStateV1(),
        writer.globalWriteStateV1
      );
    }

    // Serialize unorderedWriterState
    if (writer.unorderedWriterState) {
      serializeUnorderedWriteState(
        queryWriter._initUnorderedWriterState(),
        writer.unorderedWriterState
      );
    }
  }

  // Serialize reader
  if (reader) {
    serializeQueryReader(queryData._initReader(), reader);
  }

  // Serialize array
  if (array) {
    serializeArray(queryData._initArray(), array);
  }

  // Serialize config
  if (config) {
    serializeConfig(queryData._initConfig(), config);
  }

  // Serialize stats
  if (stats) {
    serializeStats(queryData._initStats(), stats);
  }

  // Serialize readerIndex
  if (readerIndex) {
    serializeReaderIndex(queryData._initReaderIndex(), readerIndex);
  }

  if (denseReader) {
    serializeQueryReader(queryData._initDenseReader(), denseReader);
  }

  // Serialize delete
  if (data.delete) {
    serializeDelete(queryData._initDelete(), data.delete);
  }

  // Serialize writtenFragmentInfo
  if (writtenFragmentInfo) {
    const writtenFragmentInfoCapnp = queryData._initWrittenFragmentInfo(
      writtenFragmentInfo.length
    );

    writtenFragmentInfo.forEach((fragInfo, i) => {
      const fragInfoCapnp = writtenFragmentInfoCapnp.get(i);

      fragInfoCapnp.uri = fragInfo.uri;
      const timestampRangeCapnp = fragInfoCapnp._initTimestampRange(
        fragInfo.timestampRange.length
      );
      fragInfo.timestampRange.forEach((range, i) =>
        timestampRangeCapnp.set(i, BigInt(range))
      );
    });
  }

  // Serialize writtenBuffers
  if (data.writtenBuffers) {
    const writtenBuffersCapnp = queryData._initWrittenBuffers(
      data.writtenBuffers.length
    );
    data.writtenBuffers.forEach((val, i) => writtenBuffersCapnp.set(i, val));
  }

  // Serialize orderedDimLabelReader
  if (orderedDimLabelReader) {
    serializeQueryReader(
      queryData._initOrderedDimLabelReader(),
      orderedDimLabelReader
    );
  }

  // Serialize channels
  const channelsCapnp = queryData._initChannels(channels.length);
  channels.forEach((channel, i) =>
    serializeQueryChannel(channelsCapnp.get(i), channel)
  );

  return message.toArrayBuffer();
};

function serializeQueryChannel(
  channelCapnp: QueryChannelCapnp,
  channel: QueryChannel
): void {
  const { aggregates = [] } = channel;

  channelCapnp.default = channel.default;
  const aggregatesCapnp = channelCapnp._initAggregates(aggregates.length);

  aggregates.forEach((aggregate, i) => {
    const aggregateCapnp = aggregatesCapnp.get(i);

    aggregateCapnp.outputFieldName = aggregate.outputFieldName;
    aggregateCapnp.inputFieldName = aggregate.inputFieldName;
    aggregateCapnp.name = aggregate.name;
  });
}

function serializeDelete(delCapnp: DeleteCapnp, del: Delete): void {
  serializeCondition(delCapnp._initCondition(), del.condition);

  if (del.stats) {
    serializeStats(delCapnp._initStats(), del.stats);
  }
}

function serializeConfig(configCapnp: ConfigCapnp, config: Config): void {
  const { entries = [] } = config;

  const entriesCapnp = configCapnp._initEntries(entries.length);
  entries.forEach((entry, i) => {
    const entryCapnp = entriesCapnp.get(i);

    entryCapnp.key = entry.key;
    entryCapnp.value = entry.value;
  });
}

function serializeReaderIndex(
  readerIndexCapnp: ReaderIndexCapnp,
  readerIndex: ReaderIndex
): void {
  const { layout, subarray, readState, condition, stats } = readerIndex;

  readerIndexCapnp.layout = layout;

  if (subarray) {
    serializeSubArray(readerIndexCapnp._initSubarray(), subarray);
  }

  if (readState) {
    serializeReadStateIndex(readerIndexCapnp._initReadState(), readState);
  }

  if (condition) {
    serializeCondition(readerIndexCapnp._initCondition(), condition);
  }

  if (stats) {
    serializeStats(readerIndexCapnp._initStats(), stats);
  }
}

function serializeCondition(
  conditionCapnp: ConditionCapnp,
  condition: Condition
): void {
  const { clauseCombinationOps = [], clauses = [], tree } = condition;

  const clausesCombinationOpsCapnp = conditionCapnp._initClauseCombinationOps(
    clauseCombinationOps.length
  );
  clauseCombinationOps.forEach((clause, i) => {
    clausesCombinationOpsCapnp.set(i, clause);
  });

  const clausesCapnp = conditionCapnp._initClauses(clauses.length);
  clauses.forEach((clause, i) => serializeClause(clausesCapnp.get(i), clause));

  if (tree) {
    serializeASTNode(conditionCapnp._initTree(), tree);
  }
}

function serializeASTNode(nodeCapnp: ASTNodeCapnp, node: ASTNode): void {
  const {
    isExpression,
    fieldName,
    value = [],
    op,
    children = [],
    combinationOp,
    useEnumeration,
    offsets = []
  } = node;

  nodeCapnp.isExpression = isExpression;
  nodeCapnp.fieldName = fieldName;
  nodeCapnp._initValue(value.length).copyBuffer(Uint8Array.from(value).buffer);
  nodeCapnp.op = op;

  const childrenCapnp = nodeCapnp._initChildren(children.length);
  children.forEach((child, i) => serializeASTNode(childrenCapnp.get(i), child));

  nodeCapnp.combinationOp = combinationOp;
  nodeCapnp.useEnumeration = useEnumeration;
  nodeCapnp
    ._initOffsets(offsets.length)
    .copyBuffer(Uint8Array.from(offsets).buffer);
}

function serializeClause(
  clauseCapnp: ConditionClauseCapnp,
  clause: ConditionClause
): void {
  const { fieldName, value = [], op, useEnumeration } = clause;

  clauseCapnp.fieldName = fieldName;
  clauseCapnp.op = op;
  clauseCapnp.useEnumeration = useEnumeration;

  clauseCapnp
    ._initValue(value.length)
    .copyBuffer(Uint8Array.from(value).buffer);
}

function serializeReadStateIndex(
  readStateIndexCapnp: ReadStateIndexCapnp,
  readState: ReadStateIndex
): void {
  const {
    doneAddingResultTiles = false,
    fragTileIdx = [],
    resultCellSlab = []
  } = readState;

  readStateIndexCapnp.doneAddingResultTiles = doneAddingResultTiles;

  const fragTiles = readStateIndexCapnp._initFragTileIdx(fragTileIdx.length);
  fragTileIdx.forEach((fragTile, i) =>
    serializeFragmentIndex(fragTiles.get(i), fragTile)
  );

  const resultCellSlabCapnp = readStateIndexCapnp._initResultCellSlab(
    resultCellSlab.length
  );
  resultCellSlab.forEach((res, i) =>
    serializeResultCellSlab(resultCellSlabCapnp.get(i), res)
  );
}

function serializeResultCellSlab(
  resultCellSlabCapnp: ResultCellSlabCapnp,
  resultCellSlab: ResultCellSlab
): void {
  const { fragIdx, tileIdx, length, start } = resultCellSlab;

  resultCellSlabCapnp.fragIdx = fragIdx;
  resultCellSlabCapnp.tileIdx = BigInt(tileIdx);
  resultCellSlabCapnp.length = BigInt(length);
  resultCellSlabCapnp.start = BigInt(start);
}

function serializeFragmentIndex(
  fragmentIndexCapnp: FragmentIndexCapnp,
  fragmentIndex: FragmentIndex
): void {
  const { cellIdx, tileIdx } = fragmentIndex;

  if (fragmentIndex.cellIdx) {
    fragmentIndexCapnp.cellIdx = BigInt(cellIdx);
  }

  if (fragmentIndex.tileIdx) {
    fragmentIndexCapnp.tileIdx = BigInt(tileIdx);
  }
}

export default capnpQuerySerializer;

export const serializeQueryReader = (
  readerCapnp: QueryReaderCapnp,
  reader: QueryReader
) => {
  readerCapnp.layout = reader.layout;
  readerCapnp.dimLabelIncreasing = reader.dimLabelIncreasing;

  if (reader.subarray) {
    serializeSubArray(readerCapnp._initSubarray(), reader.subarray);
  }

  if (reader.readState) {
    serializeReadState(readerCapnp._initReadState(), reader.readState);
  }

  if (reader.condition) {
    serializeCondition(readerCapnp._initCondition(), reader.condition);
  }

  if (reader.stats) {
    serializeStats(readerCapnp._initStats(), reader.stats);
  }
};

export const serializeArrayData = (array: ModelArray) => {
  const message = new capnp.Message();
  const arrayData = message.initRoot(ArrayCapnp);
  serializeArray(arrayData, array);

  return message.toArrayBuffer();
};

export const serializeArray = (arrayCapnp: ArrayCapnp, array: ModelArray) => {
  const { fragmentMetadataAll = [] } = array;

  arrayCapnp.startTimestamp = BigInt(
    clamp(array.startTimestamp || 0, 0, Date.now())
  );
  arrayCapnp.endTimestamp = BigInt(
    clamp(array.endTimestamp || Date.now(), 0, Date.now())
  );
  arrayCapnp.queryType = array.queryType || '';
  arrayCapnp.uri = array.uri || '';

  if (array.arraySchemaLatest) {
    serializeArraySchema(
      arrayCapnp._initArraySchemaLatest(),
      array.arraySchemaLatest
    );
  }

  if (array.arraySchemasAll) {
    const arraySchemasAllCapnp = arrayCapnp._initArraySchemasAll();

    if (array.arraySchemasAll.entries.length) {
      arraySchemasAllCapnp._initEntries(array.arraySchemasAll.entries.length);

      array.arraySchemasAll.entries.forEach((entry, i) => {
        const entryCapnp = arraySchemasAllCapnp.entries.get(i);

        capnp.utils.setText(0, entry.key, entryCapnp);
        capnp.utils.initStruct(ArraySchemaCapnp._capnp.size, entryCapnp.value);
        serializeArraySchema(
          capnp.utils.getAs(ArraySchemaCapnp, entryCapnp.value),
          entry.value
        );
      });
    }
  }

  if (array.nonEmptyDomain) {
    serializeNonEmptyDomainList(
      arrayCapnp._initNonEmptyDomain(),
      array.nonEmptyDomain.nonEmptyDomains
    );
  }

  if (array.arrayMetadata) {
    serializeArrayMetadata(
      arrayCapnp._initArrayMetadata(),
      array.arrayMetadata
    );
  }

  if (array.arrayDirectory) {
    serializeArrayDirectory(
      arrayCapnp._initArrayDirectory(),
      array.arrayDirectory
    );
  }

  const fragmentMetadataAllCapnp = arrayCapnp._initFragmentMetadataAll(
    fragmentMetadataAll.length
  );

  fragmentMetadataAll.forEach((meta, i) => {
    const metaCapnp = fragmentMetadataAllCapnp.get(i);
    serializeFragmentMetadata(metaCapnp, meta);
  });

  arrayCapnp.openedAtEndTimestamp = BigInt(array.openedAtEndTimestamp);
};

const serializeGenericOffsets = (
  genericOffsetsCapnp: FragmentMetadata_GenericTileOffsets,
  gtOffsets: FragmentMetadataGtOffsets
) => {
  genericOffsetsCapnp.rtree = BigInt(gtOffsets.rtree);

  if (gtOffsets.tileOffsets?.length) {
    const tileOffsetsCapnp = genericOffsetsCapnp._initTileOffsets(
      gtOffsets.tileOffsets.length
    );

    gtOffsets.tileOffsets.forEach((offset, i) => {
      tileOffsetsCapnp.set(i, BigInt(offset));
    });
  }

  if (gtOffsets.tileVarOffsets?.length) {
    const tileVarOffsetsCapnp = genericOffsetsCapnp._initTileVarOffsets(
      gtOffsets.tileVarOffsets.length
    );

    gtOffsets.tileVarOffsets.forEach((offset, i) => {
      tileVarOffsetsCapnp.set(i, BigInt(offset));
    });
  }

  if (gtOffsets.tileVarSizes?.length) {
    const tileVarSizesCapnp = genericOffsetsCapnp._initTileVarSizes(
      gtOffsets.tileVarSizes.length
    );

    gtOffsets.tileVarSizes.forEach((size, i) => {
      tileVarSizesCapnp.set(i, BigInt(size));
    });
  }

  if (gtOffsets.tileValidityOffsets?.length) {
    const tileValidityOffsetsCapnp =
      genericOffsetsCapnp._initTileValidityOffsets(
        gtOffsets.tileValidityOffsets.length
      );

    gtOffsets.tileValidityOffsets.forEach((offset, i) => {
      tileValidityOffsetsCapnp.set(i, BigInt(offset));
    });
  }

  if (gtOffsets.tileMinOffsets?.length) {
    const tileMinOffsetsCapnp = genericOffsetsCapnp._initTileMinOffsets(
      gtOffsets.tileMinOffsets.length
    );

    gtOffsets.tileMinOffsets.forEach((offset, i) => {
      tileMinOffsetsCapnp.set(i, BigInt(offset));
    });
  }

  if (gtOffsets.tileMaxOffsets?.length) {
    const tileMaxOffsetsCapnp = genericOffsetsCapnp._initTileMaxOffsets(
      gtOffsets.tileMaxOffsets.length
    );

    gtOffsets.tileMaxOffsets.forEach((offset, i) => {
      tileMaxOffsetsCapnp.set(i, BigInt(offset));
    });
  }

  if (gtOffsets.tileSumOffsets?.length) {
    const tileSumOffsetsCapnp = genericOffsetsCapnp._initTileSumOffsets(
      gtOffsets.tileSumOffsets.length
    );

    gtOffsets.tileSumOffsets.forEach((offset, i) => {
      tileSumOffsetsCapnp.set(i, BigInt(offset));
    });
  }

  if (gtOffsets.tileNullCountOffsets?.length) {
    const tileNullCountOffsetsCapnp =
      genericOffsetsCapnp._initTileNullCountOffsets(
        gtOffsets.tileNullCountOffsets.length
      );

    gtOffsets.tileNullCountOffsets.forEach((offset, i) => {
      tileNullCountOffsetsCapnp.set(i, BigInt(offset));
    });
  }

  if (gtOffsets.fragmentMinMaxSumNullCountOffset) {
    genericOffsetsCapnp.fragmentMinMaxSumNullCountOffset = BigInt(
      gtOffsets.fragmentMinMaxSumNullCountOffset
    );
  }

  if (gtOffsets.processedConditionsOffsets) {
    genericOffsetsCapnp.processedConditionsOffsets = BigInt(
      gtOffsets.processedConditionsOffsets
    );
  }
};

function serializeListListUint8(
  listOfListsUint8: capnp.List<capnp.List<number>>,
  nums: number[][]
): void {
  listOfListsUint8.forEach((uint8ListCapnp, i) => {
    allocateList(uint8ListCapnp, capnp.ListElementSize.BYTE, nums[i].length);
    uint8ListCapnp.forEach((_, j) => {
      uint8ListCapnp.set(j, nums[i][j]);
    });
  });
}

function serializeListListUint64(
  listOfListsUint64: capnp.List<capnp.List<bigint>>,
  nums: number[][]
): void {
  listOfListsUint64.forEach((uint64ListCapnp, i) => {
    allocateList(uint64ListCapnp, capnp.ListElementSize.BYTE_8, nums[i].length);
    uint64ListCapnp.forEach((_, j) => {
      uint64ListCapnp.set(j, BigInt(nums[i][j]));
    });
  });
}

function serializeArrayDirectory(
  arrayDirectoryCapnp: ArrayDirectoryCapnp,
  arrayDirectory: ArrayDirectory
): void {
  if (arrayDirectory.unfilteredFragmentUris) {
    const unfilteredFragmentUrisCapnp =
      arrayDirectoryCapnp._initUnfilteredFragmentUris(
        arrayDirectory.unfilteredFragmentUris.length
      );
    arrayDirectory.unfilteredFragmentUris.forEach(
      (unfilteredFragmentUri, i) => {
        unfilteredFragmentUrisCapnp.set(i, unfilteredFragmentUri);
      }
    );
  }

  if (arrayDirectory.consolidatedCommitUris) {
    const consolidatedCommitUrisCapnp =
      arrayDirectoryCapnp._initConsolidatedCommitUris(
        arrayDirectory.consolidatedCommitUris.length
      );

    arrayDirectory.consolidatedCommitUris.forEach(
      (consolidatedCommitUri, i) => {
        consolidatedCommitUrisCapnp.set(i, consolidatedCommitUri);
      }
    );
  }

  if (arrayDirectory.arraySchemaUris) {
    const arraySchemaUrisCapnp = arrayDirectoryCapnp._initArraySchemaUris(
      arrayDirectory.arraySchemaUris.length
    );

    arrayDirectory.arraySchemaUris.forEach((arraySchemaUri, i) => {
      arraySchemaUrisCapnp.set(i, arraySchemaUri);
    });
  }

  arrayDirectoryCapnp.latestArraySchemaUri =
    arrayDirectory.latestArraySchemaUri;

  if (arrayDirectory.arrayMetaUrisToVacuum) {
    const arrayMetaUrisToVacuumCapnp =
      arrayDirectoryCapnp._initArrayMetaUrisToVacuum(
        arrayDirectory.arrayMetaUrisToVacuum.length
      );

    arrayDirectory.arrayMetaUrisToVacuum.forEach((arrayMetaUriToVacuum, i) => {
      arrayMetaUrisToVacuumCapnp.set(i, arrayMetaUriToVacuum);
    });
  }

  if (arrayDirectory.arrayMetaVacUrisToVacuum) {
    const arrayMetaVacUrisToVacuumCapnp =
      arrayDirectoryCapnp._initArrayMetaVacUrisToVacuum(
        arrayDirectory.arrayMetaVacUrisToVacuum.length
      );

    arrayDirectory.arrayMetaVacUrisToVacuum.forEach(
      (arrayMetaVacUriToVacuum, i) => {
        arrayMetaVacUrisToVacuumCapnp.set(i, arrayMetaVacUriToVacuum);
      }
    );
  }

  if (arrayDirectory.commitUrisToConsolidate) {
    const commitUrisToConsolidateCapnp =
      arrayDirectoryCapnp._initCommitUrisToConsolidate(
        arrayDirectory.commitUrisToConsolidate.length
      );

    arrayDirectory.commitUrisToConsolidate.forEach(
      (commitUriToConsolidate, i) => {
        commitUrisToConsolidateCapnp.set(i, commitUriToConsolidate);
      }
    );
  }

  if (arrayDirectory.commitUrisToVacuum) {
    const commitUrisToVacuumCapnp = arrayDirectoryCapnp._initCommitUrisToVacuum(
      arrayDirectory.commitUrisToVacuum.length
    );

    arrayDirectory.commitUrisToVacuum.forEach((commitUriToVacuum, i) => {
      commitUrisToVacuumCapnp.set(i, commitUriToVacuum);
    });
  }

  if (arrayDirectory.consolidatedCommitUrisToVacuum) {
    const consolidatedCommitUrisToVacuumCapnp =
      arrayDirectoryCapnp._initConsolidatedCommitUrisToVacuum(
        arrayDirectory.consolidatedCommitUrisToVacuum.length
      );

    arrayDirectory.consolidatedCommitUrisToVacuum.forEach(
      (consolidatedCommitUriToVacuum, i) => {
        consolidatedCommitUrisToVacuumCapnp.set(
          i,
          consolidatedCommitUriToVacuum
        );
      }
    );
  }

  if (arrayDirectory.arrayMetaUris) {
    const metaUrisCapnp = arrayDirectoryCapnp._initArrayMetaUris(
      arrayDirectory.arrayMetaUris.length
    );

    arrayDirectory.arrayMetaUris.forEach((metaUri, i) => {
      const metaUriCapnp = metaUrisCapnp.get(i);

      metaUriCapnp.timestampStart = BigInt(metaUri.timestampStart);
      metaUriCapnp.timestampEnd = BigInt(metaUri.timestampEnd);
      metaUriCapnp.uri = metaUri.uri;
    });
  }

  if (arrayDirectory.fragmentMetaUris) {
    const fragmentMetaUrisCapnp = arrayDirectoryCapnp._initFragmentMetaUris(
      arrayDirectory.fragmentMetaUris.length
    );
    arrayDirectory.fragmentMetaUris.forEach((fragmentURI, i) => {
      fragmentMetaUrisCapnp.set(i, fragmentURI);
    });
  }

  if (arrayDirectory.deleteAndUpdateTileLocation) {
    const deleteAndUpdateTileLocationCapnp =
      arrayDirectoryCapnp._initDeleteAndUpdateTileLocation(
        arrayDirectory.deleteAndUpdateTileLocation.length
      );

    arrayDirectory.deleteAndUpdateTileLocation.forEach((entry, i) => {
      const entryCapnp = deleteAndUpdateTileLocationCapnp.get(i);

      entryCapnp.uri = entry.uri;
      entryCapnp.conditionMarker = entry.conditionMarker;
      entryCapnp.offset = BigInt(entry.offset);
    });
  }

  arrayDirectoryCapnp.timestampStart = BigInt(
    arrayDirectory.timestampStart || 0
  );
  arrayDirectoryCapnp.timestampEnd = BigInt(arrayDirectory.timestampEnd || 0);
}

function serializeArrayMetadata(
  arrayMetadataCapnp: ArrayMetadataCapnp,
  arrayMetadata: ArrayMetadata
): void {
  const entriesCapnp = arrayMetadataCapnp._initEntries(
    arrayMetadata.entries.length
  );
  arrayMetadata.entries.forEach((entry, i) => {
    const entryCapnp = entriesCapnp.get(i);

    entryCapnp.key = entry.key;
    entryCapnp.type = entry.type;
    entryCapnp.valueNum = entry.valueNum;
    entryCapnp.del = entry.del;

    const valueCapnp = entryCapnp._initValue(entry.value.length);
    entry.value.forEach((val, i) => {
      valueCapnp.set(i, val);
    });
  });
}

const serializeNonEmptyDomainList = (
  nonEmptyDomainListCapnp: NonEmptyDomainListCapnp,
  nonEmptyDomainList: Array<NonEmptyDomain>
) => {
  const nonEmptyDomains = nonEmptyDomainListCapnp._initNonEmptyDomains(
    nonEmptyDomainList.length
  );

  nonEmptyDomains.forEach((nonEmptyDomainCapnp, i) => {
    serializeNonEmptyDomain(nonEmptyDomainCapnp, nonEmptyDomainList[i]);
  });
};

function serializeNonEmptyDomain(
  nonEmptyDomainCapnp: NonEmptyDomainCapnp,
  nonEmptyDomain: NonEmptyDomain
): void {
  nonEmptyDomainCapnp.isEmpty = nonEmptyDomain.isEmpty;
  serializeDomainArray(
    nonEmptyDomainCapnp._initNonEmptyDomain(),
    nonEmptyDomain.nonEmptyDomain
  );

  if (nonEmptyDomain.sizes?.length) {
    const sizes = nonEmptyDomainCapnp._initSizes(nonEmptyDomain.sizes.length);

    nonEmptyDomain.sizes?.forEach((size, i) => {
      sizes.set(i, BigInt(size));
    });
  }
}

function serializeArraySchema(
  arraySchemaCapnp: ArraySchemaCapnp,
  arraySchema: ArraySchema
): void {
  const {
    arrayType,
    attributes = [],
    capacity,
    cellOrder,
    coordsFilterPipeline,
    domain,
    offsetFilterPipeline,
    tileOrder,
    uri,
    version = [],
    allowsDuplicates,
    validityFilterPipeline,
    name,
    timestampRange = [],
    dimensionLabels = [],
    enumerations = [],
    enumerationPathMap = [],
    currentDomain
  } = arraySchema;

  arraySchemaCapnp.arrayType = arrayType;
  arraySchemaCapnp.capacity = BigInt(capacity);
  arraySchemaCapnp.cellOrder = cellOrder;
  arraySchemaCapnp.tileOrder = tileOrder;
  arraySchemaCapnp.uri = uri;
  arraySchemaCapnp.allowsDuplicates = allowsDuplicates;
  arraySchemaCapnp.name = name;

  const versionCapnp = arraySchemaCapnp._initVersion(version.length);
  version.forEach((num, i) => {
    versionCapnp.set(i, num);
  });

  const timestampRangeCapnp = arraySchemaCapnp._initTimestampRange(
    timestampRange.length
  );
  timestampRange.forEach((num, i) => {
    timestampRangeCapnp.set(i, BigInt(num));
  });

  serializeFilterPipeline(
    arraySchemaCapnp._initCoordsFilterPipeline(),
    coordsFilterPipeline
  );
  if (offsetFilterPipeline) {
    serializeFilterPipeline(
      arraySchemaCapnp._initOffsetFilterPipeline(),
      offsetFilterPipeline
    );
  }
  if (arraySchema.validityFilterPipeline) {
    serializeFilterPipeline(
      arraySchemaCapnp._initValidityFilterPipeline(),
      validityFilterPipeline
    );
  }

  const attributesCapnp = arraySchemaCapnp._initAttributes(attributes.length);
  attributes.forEach((attribute, i) =>
    serializeAttribute(attributesCapnp.get(i), attribute)
  );

  serializeDomain(arraySchemaCapnp._initDomain(), domain);

  const enumerationsCapnp = arraySchemaCapnp._initEnumerations(
    enumerations.length
  );
  enumerations.forEach((enumeration, i) =>
    serializeEnumeration(enumerationsCapnp.get(i), enumeration)
  );

  const enumerationPathMapCapnp = arraySchemaCapnp._initEnumerationPathMap(
    enumerationPathMap.length
  );
  enumerationPathMap.forEach((entry, i) => {
    const entryCapnp = enumerationPathMapCapnp.get(i);

    entryCapnp.key = entry.key;
    entryCapnp.value = entry.value;
  });

  serializeCurrentDomain(arraySchemaCapnp._initCurrentDomain(), currentDomain);

  const dimensionLabelsCapnp = arraySchemaCapnp._initDimensionLabels(
    dimensionLabels.length
  );
  dimensionLabels.forEach((label, i) =>
    serializeDimensionLabel(dimensionLabelsCapnp.get(i), label)
  );
}

function serializeDimensionLabel(
  dimensionLabelCapnp: DimensionLabelCapnp,
  dimensionLabel: DimensionLabel
) {
  dimensionLabelCapnp.dimensionId = dimensionLabel.dimensionId;
  dimensionLabelCapnp.name = dimensionLabel.name;
  dimensionLabelCapnp.uri = dimensionLabel.uri;
  dimensionLabelCapnp.attributeName = dimensionLabel.attributeName;
  dimensionLabelCapnp.order = dimensionLabel.order;
  dimensionLabelCapnp.type = dimensionLabel.type;
  dimensionLabelCapnp.cellValNum = dimensionLabel.cellValNum;
  dimensionLabelCapnp.external = dimensionLabel.external;
  dimensionLabelCapnp.relative = dimensionLabel.relative;
  serializeArraySchema(
    dimensionLabelCapnp._initSchema(),
    dimensionLabel.schema
  );
}

function serializeEnumeration(
  enumerationCapnp: EnumerationCapnp,
  enumeration: Enumeration
) {
  enumerationCapnp.name = enumeration.name;
  enumerationCapnp.pathName = enumeration.pathName;
  enumerationCapnp.type = enumeration.type;
  enumerationCapnp.cellValNum = enumeration.cellValNum;
  enumerationCapnp.ordered = enumeration.ordered;
  enumerationCapnp
    ._initData(enumeration.data.length)
    .copyBuffer(Uint8Array.from(enumeration.data).buffer);
  enumerationCapnp
    ._initOffsets(enumeration.offsets.length)
    .copyBuffer(Uint8Array.from(enumeration.offsets).buffer);
}

function serializeCurrentDomain(
  currentDomainCapnp: CurrentDomainCapnp,
  currentDomain: CurrentDomain
): void {
  currentDomainCapnp.version = currentDomain.version;
  currentDomainCapnp.type = currentDomain.type;

  if (currentDomain.ndRectangle) {
    const ndRectangleCapnp = currentDomainCapnp._initNdRectangle();

    ndRectangleCapnp._initNdranges(currentDomain.ndRectangle.ndranges.length);
    currentDomain.ndRectangle.ndranges.forEach((range, i) => {
      const rangeCapnp = ndRectangleCapnp.ndranges.get(i);

      serializeSubArrayRange(rangeCapnp, range);
    });
  }
}

const serializeDomain = (domainCapnp: DomainCapnp, domain: Domain) => {
  domainCapnp.cellOrder = domain.cellOrder;
  domainCapnp.tileOrder = domain.tileOrder;
  domainCapnp.type = domain.type;

  const dimensions = domainCapnp._initDimensions(domain.dimensions.length);
  dimensions.forEach((dimensionCapnp, i) => {
    serializeDimension(dimensionCapnp, domain.dimensions[i]);
  });
};

const serializeDimension = (
  dimensionCapnp: DimensionCapnp,
  dimension: Dimension
) => {
  dimensionCapnp.name = dimension.name;
  dimensionCapnp.nullTileExtent = dimension.nullTileExtent;
  dimensionCapnp.type = dimension.type;

  serializeFilterPipeline(
    dimensionCapnp._initFilterPipeline(),
    dimension.filterPipeline
  );

  serializeDomainArray(dimensionCapnp._initDomain(), dimension.domain);

  const { tileExtent } = dimension;
  const tileExtentCapnp = dimensionCapnp._initTileExtent();

  if (tileExtent.float32) {
    tileExtentCapnp.float32 = tileExtent.float32;
  }

  if (tileExtent.float64) {
    tileExtentCapnp.float64 = tileExtent.float64;
  }

  if (tileExtent.int16) {
    tileExtentCapnp.int16 = tileExtent.int16;
  }

  if (tileExtent.int32) {
    tileExtentCapnp.int32 = tileExtent.int32;
  }

  if (tileExtent.int64) {
    tileExtentCapnp.int64 = BigInt(tileExtent.int64);
  }

  if (tileExtent.int8) {
    tileExtentCapnp.int8 = tileExtent.int8;
  }

  if (tileExtent.uint16) {
    tileExtentCapnp.uint16 = tileExtent.uint16;
  }

  if (tileExtent.uint32) {
    tileExtentCapnp.uint32 = tileExtent.uint32;
  }

  if (tileExtent.uint64) {
    tileExtentCapnp.uint64 = BigInt(tileExtent.uint64);
  }

  if (tileExtent.uint8) {
    tileExtentCapnp.uint8 = tileExtent.uint8;
  }
};

const serializeAttribute = (
  attributeCapnp: AttributeCapnp,
  attribute: Attribute
) => {
  attributeCapnp.cellValNum = attribute.cellValNum;
  attributeCapnp.name = attribute.name;
  attributeCapnp.type = attribute.type;
  attributeCapnp.nullable = attribute.nullable;
  attributeCapnp.fillValueValidity = attribute.fillValueValidity;
  if (attribute.fillValue.length) {
    const fillValueData = attributeCapnp._initFillValue(
      attribute.fillValue.length
    );
    attribute.fillValue.forEach((fillValue, i) => {
      fillValueData.set(i, fillValue);
    });
  }

  serializeFilterPipeline(
    attributeCapnp._initFilterPipeline(),
    attribute.filterPipeline
  );
};

const serializeFilterPipeline = (
  filterPipelineCapnp: FilterPipelineCapnp,
  filterPipeline: FilterPipeline
) => {
  const { filters = [] } = filterPipeline;

  const filtersCapnp = filterPipelineCapnp._initFilters(filters.length);
  filters.forEach((filter, i) => {
    const filterCapnp = filtersCapnp.get(i);

    filterCapnp.type = filter.type;
    const data = filterCapnp._initData();

    if (filter.data.float32) {
      data.float32 = filter.data.float32;
    }

    if (filter.data.float64) {
      data.float64 = filter.data.float64;
    }

    if (filter.data.int32) {
      data.int32 = filter.data.int32;
    }

    if (filter.data.int16) {
      data.int16 = filter.data.int16;
    }

    if (filter.data.int8) {
      data.int8 = filter.data.int8;
    }

    if (filter.data.int64) {
      data.int64 = BigInt(filter.data.int64);
    }

    if (filter.data.uint16) {
      data.uint16 = filter.data.uint16;
    }

    if (filter.data.uint32) {
      data.uint32 = filter.data.uint32;
    }

    if (filter.data.uint8) {
      data.uint8 = filter.data.uint8;
    }

    if (filter.data.uint64) {
      data.uint64 = BigInt(filter.data.uint64);
    }

    if (filter.floatScaleConfig) {
      serializeFloatScaleConfig(
        filterCapnp._initFloatScaleConfig(),
        filter.floatScaleConfig
      );
    }

    if (filter.webpConfig) {
      serializeWebPConfig(filterCapnp._initWebpConfig(), filter.webpConfig);
    }

    return filter;
  });

  return filterPipelineCapnp;
};

const serializeFloatScaleConfig = (
  floatScaleConfig: FloatScaleConfigCapnp,
  floatScaleData: FloatScaleConfig
) => {
  if (floatScaleData.byteWidth) {
    floatScaleConfig.byteWidth = BigInt(floatScaleData.byteWidth);
  }

  if (floatScaleData.offset) {
    floatScaleConfig.offset = floatScaleData.offset;
  }

  if (floatScaleData.scale) {
    floatScaleConfig.scale = floatScaleData.scale;
  }
};

function serializeWebPConfig(
  configCapnp: WebpConfigCapnp,
  config: WebpConfig
): void {
  configCapnp.extentX = config.extentX;
  configCapnp.extentY = config.extentY;
  configCapnp.format = config.format;
  configCapnp.quality = config.quality;
  configCapnp.lossless = config.lossless;
}

const serializeDomainArray = (
  domainArray: DomainArrayCapnp,
  data: DomainArray
) => {
  const {
    float32 = [],
    float64 = [],
    int8 = [],
    int16 = [],
    int32 = [],
    int64 = [],
    uint8 = [],
    uint16 = [],
    uint32 = [],
    uint64 = []
  } = data;

  const dFloat32 = domainArray._initFloat32(float32.length);
  float32.forEach((num, i) => {
    dFloat32.set(i, num);
  });

  const dFloat64 = domainArray._initFloat64(float64.length);
  float64.forEach((num, i) => {
    dFloat64.set(i, num);
  });

  const dInt8 = domainArray._initInt8(int8.length);
  int8.forEach((num, i) => {
    dInt8.set(i, num);
  });

  const dInt16 = domainArray._initInt16(int16.length);
  int16.forEach((num, i) => {
    dInt16.set(i, num);
  });

  const dInt32 = domainArray._initInt32(int32.length);
  int32.forEach((num, i) => {
    dInt32.set(i, num);
  });

  const dInt64 = domainArray._initInt64(int64.length);
  int64.forEach((num, i) => {
    dInt64.set(i, BigInt(num));
  });

  const dUint8 = domainArray._initUint8(uint8.length);
  uint8.forEach((num, i) => {
    dUint8.set(i, num);
  });

  const dUint16 = domainArray._initUint16(uint16.length);
  uint16.forEach((num, i) => {
    dUint16.set(i, num);
  });

  const dUint32 = domainArray._initUint32(uint32.length);
  uint32.forEach((num, i) => {
    dUint32.set(i, num);
  });

  const dUint64 = domainArray._initUint64(uint64.length);
  uint64.forEach((num, i) => {
    dUint64.set(i, BigInt(num));
  });
};

function serializeSubArray(
  subarrayCapnp: SubarrayCapnp,
  subarray: Subarray
): void {
  const {
    layout,
    ranges = [],
    stats,
    coalesceRanges = true,
    relevantFragments = [],
    labelRanges = [],
    attributeRanges = {}
  } = subarray;

  subarrayCapnp.layout = layout;
  subarrayCapnp.coalesceRanges = coalesceRanges;

  const relevantFragmentsCapnp = subarrayCapnp._initRelevantFragments(
    relevantFragments.length
  );
  relevantFragments.forEach((fragm, i) => relevantFragmentsCapnp.set(i, fragm));

  const rangesCapnp = subarrayCapnp._initRanges(ranges.length);
  ranges.forEach((range, i) =>
    serializeSubArrayRange(rangesCapnp.get(i), range)
  );

  const labelRangesCapnp = subarrayCapnp._initLabelRanges(labelRanges.length);
  labelRanges.forEach((labelSubarrayRange, i) => {
    const labelSubarrayRangeCapnp = labelRangesCapnp.get(i);

    labelSubarrayRangeCapnp.dimensionId = labelSubarrayRange.dimensionId;
    labelSubarrayRangeCapnp.name = labelSubarrayRange.name;
    serializeSubArrayRange(
      labelSubarrayRangeCapnp._initRanges(),
      labelSubarrayRange.ranges
    );
  });

  const attributeRangesCapnp = subarrayCapnp._initAttributeRanges();
  const entriesCapnp = attributeRangesCapnp._initEntries(
    attributeRanges.entries?.length || 0
  );
  attributeRanges.entries?.forEach((entry, i) => {
    const entryCapnp = entriesCapnp.get(i);

    capnp.utils.setText(0, entry.key, entryCapnp);
    capnp.utils.initStruct(SubarrayRangesCapnp._capnp.size, entryCapnp.value);
    serializeSubArrayRange(
      capnp.utils.getAs(SubarrayRangesCapnp, entryCapnp.value),
      entry.value
    );
  });

  if (stats) {
    serializeStats(subarrayCapnp._initStats(), stats);
  }
}

function serializeSubArrayRange(
  subarrayRangeCapnp: SubarrayRangesCapnp,
  range: SubarrayRanges
): void {
  const {
    type,
    hasDefaultRange,
    buffer = [],
    bufferSizes = [],
    bufferStartSizes = []
  } = range;

  subarrayRangeCapnp.type = type;
  subarrayRangeCapnp.hasDefaultRange = hasDefaultRange;
  subarrayRangeCapnp
    ._initBuffer(buffer.length)
    .copyBuffer(Uint8Array.from(buffer).buffer);

  const bufferSizesCapnp = subarrayRangeCapnp._initBufferSizes(
    bufferSizes.length
  );
  bufferSizes.forEach((size, i) => bufferSizesCapnp.set(i, BigInt(size)));

  const bufferStartSizesCapnp = subarrayRangeCapnp._initBufferStartSizes(
    bufferStartSizes.length
  );
  bufferStartSizes.forEach((size, i) =>
    bufferStartSizesCapnp.set(i, BigInt(size))
  );
}

function serializeStats(statsCapnp: StatsCapnp, stats: Stats): void {
  if (stats.timers) {
    const timersCapnp = statsCapnp._initTimers();

    if (stats.timers.entries?.length) {
      const timersEntriesCapnp = timersCapnp._initEntries(
        stats.timers.entries.length
      );

      stats.timers.entries.forEach((timer, i) => {
        const timerCapnp = timersEntriesCapnp.get(i);
        timerCapnp.key = timer.key;
        timerCapnp.value = timer.value;
      });
    }
  }

  if (stats.counters) {
    const countersCapnp = statsCapnp._initCounters();

    if (stats.counters.entries?.length) {
      const countersEntriesCapnp = countersCapnp._initEntries(
        stats.counters.entries.length
      );

      stats.counters.entries.forEach((counter, i) => {
        const counterCapnp = countersEntriesCapnp.get(i);
        counterCapnp.key = counter.key;
        counterCapnp.value = BigInt(counter.value);
      });
    }
  }
}

function serializeGlobalWriteState(
  stateCapnp: GlobalWriteStateCapnp,
  state: GlobalWriteState
): void {
  // Serialize primitives
  stateCapnp.lastHilbertValue = BigInt(state.lastHilbertValue || 0);

  if (state.cellsWritten) {
    const cellsWrittenCapnp = stateCapnp._initCellsWritten();

    if (state.cellsWritten.entries?.length) {
      const countersEntriesCapnp = cellsWrittenCapnp._initEntries(
        state.cellsWritten.entries.length
      );

      state.cellsWritten.entries.forEach((cell, i) => {
        const cellCapnp = countersEntriesCapnp.get(i);
        cellCapnp.key = cell.key;
        cellCapnp.value = BigInt(cell.value);
      });
    }
  }

  if (state.fragMeta) {
    const fragMetaCapnp = stateCapnp._initFragMeta();
    serializeFragmentMetadata(fragMetaCapnp, state.fragMeta);
  }

  if (state.lastCellCoords) {
    const lastCellCoordsCapnp = stateCapnp._initLastCellCoords();
    serializeSingleCoord(lastCellCoordsCapnp, state.lastCellCoords);
  }

  if (state.multiPartUploadStates) {
    const multiPartUploadStatesCapnp = stateCapnp._initMultiPartUploadStates();

    if (state.multiPartUploadStates) {
      multiPartUploadStatesCapnp._initEntries(
        Object.keys(state.multiPartUploadStates).length
      );

      Object.entries(state.multiPartUploadStates).forEach(([key, val], i) => {
        const multiPartUploadStateCapnp =
          multiPartUploadStatesCapnp.entries.get(i);

        capnp.utils.setText(0, key, multiPartUploadStateCapnp);
        capnp.utils.initStruct(
          MultiPartUploadStateCapnp._capnp.size,
          multiPartUploadStateCapnp.value
        );
        serializeMultiPartUploadState(
          capnp.utils.getAs(
            MultiPartUploadStateCapnp,
            multiPartUploadStateCapnp.value
          ),
          val
        );
      });
    }
  }
}

function serializeMultiPartUploadState(
  multiPartUploadStateCapnp: MultiPartUploadStateCapnp,
  multiPartUploadState: MultiPartUploadState
): void {
  multiPartUploadStateCapnp.partNumber = BigInt(
    multiPartUploadState.partNumber
  );
  multiPartUploadStateCapnp.uploadId = multiPartUploadState.uploadId;
  multiPartUploadStateCapnp.status = multiPartUploadState.status;

  if (multiPartUploadState.completedParts?.length) {
    const completedPartsCapnp = multiPartUploadStateCapnp._initCompletedParts(
      multiPartUploadState.completedParts.length
    );

    multiPartUploadState.completedParts.forEach((completedPart, i) => {
      const completedPartCapnp = completedPartsCapnp.get(i);

      completedPartCapnp.eTag = completedPart.eTag;
      completedPartCapnp.partNumber = BigInt(completedPart.partNumber);
    });
  }

  if (multiPartUploadState.bufferedChunks?.length) {
    const bufferedChunksCapnp = multiPartUploadStateCapnp._initBufferedChunks(
      multiPartUploadState.bufferedChunks.length
    );

    multiPartUploadState.bufferedChunks.forEach((bufferedChunk, i) => {
      const bufferedChunkCapnp = bufferedChunksCapnp.get(i);

      bufferedChunkCapnp.uri = bufferedChunk.uri;
      bufferedChunkCapnp.size = BigInt(bufferedChunk.size);
    });
  }
}

function serializeSingleCoord(
  singleCoordCapnp: SingleCoordCapnp,
  singleCoord: SingleCoord
): void {
  if (singleCoord.coords?.length) {
    serializeListListUint8(
      singleCoordCapnp._initCoords(singleCoord.coords.length),
      singleCoord.coords
    );
  }

  if (singleCoord.sizes?.length) {
    const sizesCapnp = singleCoordCapnp._initSizes(singleCoord.sizes.length);

    singleCoord.sizes.forEach((size, i) => {
      sizesCapnp.set(i, BigInt(size));
    });
  }

  if (singleCoord.singleOffset?.length) {
    const singleOffsetCapnp = singleCoordCapnp._initSizes(
      singleCoord.singleOffset.length
    );

    singleCoord.singleOffset.forEach((offset, i) => {
      singleOffsetCapnp.set(i, BigInt(offset));
    });
  }
}

function serializeFragmentMetadata(
  fragmentMetadataCapnp: FragmentMetadataCapnp,
  fragmentMetadata: FragmentMetadata
): void {
  const {
    fileSizes = [],
    fileVarSizes = [],
    fileValiditySizes = [],
    tileOffsets = [],
    tileSums = [],
    tileMinBuffer = [],
    tileVarSizes = [],
    tileVarOffsets = [],
    tileValidityOffsets = [],
    tileMinVarBuffer = [],
    tileMaxVarBuffer = [],
    tileMaxBuffer = [],
    tileNullCounts = [],
    timestampRange = [],
    fragmentMins = [],
    fragmentMaxs = [],
    fragmentNullCounts = [],
    fragmentSums = []
  } = fragmentMetadata;

  const fileSizesCapnp = fragmentMetadataCapnp._initFileSizes(fileSizes.length);
  fileSizes.forEach((fileSize, i) => {
    fileSizesCapnp.set(i, BigInt(fileSize));
  });

  const fileVarSizesCapnp = fragmentMetadataCapnp._initFileVarSizes(
    fileVarSizes.length
  );
  fileVarSizes.forEach((fileSize, i) => {
    fileVarSizesCapnp.set(i, BigInt(fileSize));
  });

  const fileValiditySizesCapnp = fragmentMetadataCapnp._initFileValiditySizes(
    fileValiditySizes.length
  );
  fileValiditySizes.forEach((fileSize, i) => {
    fileValiditySizesCapnp.set(i, BigInt(fileSize));
  });

  fragmentMetadataCapnp.arraySchemaName = fragmentMetadata.arraySchemaName;
  fragmentMetadataCapnp.fragmentUri = fragmentMetadata.fragmentUri || '';
  fragmentMetadataCapnp.hasTimestamps = fragmentMetadata.hasTimestamps || false;
  fragmentMetadataCapnp.hasDeleteMeta = fragmentMetadata.hasDeleteMeta || false;
  fragmentMetadataCapnp.sparseTileNum = BigInt(
    fragmentMetadata.sparseTileNum || 0
  );
  fragmentMetadataCapnp.tileIndexBase = BigInt(
    fragmentMetadata.tileIndexBase || 0
  );

  serializeListListUint64(
    fragmentMetadataCapnp._initTileOffsets(tileOffsets.length),
    tileOffsets
  );

  serializeListListUint64(
    fragmentMetadataCapnp._initTileVarOffsets(tileVarOffsets.length),
    tileVarOffsets
  );

  serializeListListUint64(
    fragmentMetadataCapnp._initTileVarSizes(tileVarSizes.length),
    tileVarSizes
  );

  serializeListListUint64(
    fragmentMetadataCapnp._initTileValidityOffsets(tileValidityOffsets.length),
    tileValidityOffsets
  );

  serializeListListUint8(
    fragmentMetadataCapnp._initTileMinBuffer(tileMinBuffer.length),
    tileMinBuffer
  );

  serializeListListUint8(
    fragmentMetadataCapnp._initTileMinVarBuffer(tileMinVarBuffer.length),
    tileMinVarBuffer
  );

  serializeListListUint8(
    fragmentMetadataCapnp._initTileMaxBuffer(tileMaxBuffer.length),
    tileMaxBuffer
  );

  serializeListListUint8(
    fragmentMetadataCapnp._initTileMaxVarBuffer(tileMaxVarBuffer.length),
    tileMaxVarBuffer
  );

  serializeListListUint8(
    fragmentMetadataCapnp._initTileSums(tileSums.length),
    tileSums
  );

  serializeListListUint64(
    fragmentMetadataCapnp._initTileNullCounts(tileNullCounts.length),
    tileNullCounts
  );

  serializeListListUint8(
    fragmentMetadataCapnp._initFragmentMins(fragmentMins.length),
    fragmentMins
  );

  serializeListListUint8(
    fragmentMetadataCapnp._initFragmentMaxs(fragmentMaxs.length),
    fragmentMaxs
  );

  const fragmentSumsCapnp = fragmentMetadataCapnp._initFragmentSums(
    fragmentSums.length
  );
  fragmentSums.forEach((sum, i) => {
    fragmentSumsCapnp.set(i, BigInt(sum));
  });

  const fragmentNullCountsCapnp = fragmentMetadataCapnp._initFragmentNullCounts(
    fragmentNullCounts.length
  );
  fragmentNullCounts.forEach((sum, i) => {
    fragmentNullCountsCapnp.set(i, BigInt(sum));
  });

  if (fragmentMetadata.version) {
    fragmentMetadataCapnp.version = fragmentMetadata.version;
  }

  const timestampRangeCapnp = fragmentMetadataCapnp._initTimestampRange(
    timestampRange.length
  );
  timestampRange.forEach((sum, i) => {
    timestampRangeCapnp.set(i, BigInt(sum));
  });

  if (fragmentMetadata.lastTileCellNum) {
    fragmentMetadataCapnp.lastTileCellNum = BigInt(
      fragmentMetadata.lastTileCellNum
    );
  }

  if (fragmentMetadata.nonEmptyDomain) {
    serializeNonEmptyDomainList(
      fragmentMetadataCapnp._initNonEmptyDomain(),
      fragmentMetadata.nonEmptyDomain?.nonEmptyDomains || []
    );
  }

  if (fragmentMetadata.rtree) {
    const rTreeDataCapnp = fragmentMetadataCapnp._initRtree(
      fragmentMetadata.rtree.length
    );

    rTreeDataCapnp.copyBuffer(Uint8Array.from(fragmentMetadata.rtree).buffer);
  }

  fragmentMetadataCapnp.hasConsolidatedFooter =
    fragmentMetadata.hasConsolidatedFooter;

  serializeGenericOffsets(
    fragmentMetadataCapnp._initGtOffsets(),
    fragmentMetadata.gtOffsets
  );
}

function serializeUnorderedWriteState(
  stateCapnp: UnorderedWriterStateCapnp,
  state: UnorderedWriterState
): void {
  stateCapnp.isCoordsPass = state.isCoordPass;

  if (state.cellPos?.length) {
    const cellPosCapnp = stateCapnp._initCellPos(state.cellPos.length);
    state.cellPos.forEach((pos, i) => {
      cellPosCapnp.set(i, BigInt(pos));
    });
  }

  if (state.coordDups?.length) {
    const coordDupsCapnp = stateCapnp._initCoordDups(state.coordDups.length);
    state.coordDups.forEach((coord, i) => {
      coordDupsCapnp.set(i, BigInt(coord));
    });
  }

  if (state.fragMeta) {
    serializeFragmentMetadata(stateCapnp._initFragMeta(), state.fragMeta);
  }
}

function serializeReadState(
  readStateCapnp: ReadStateCapnp,
  readState: ReadState
): void {
  readStateCapnp.overflowed = readState.overflowed;
  readStateCapnp.unsplittable = readState.unsplittable;
  readStateCapnp.initialized = readState.initialized;

  if (readState.subarrayPartitioner) {
    serializeSubarrayPartitioner(
      readStateCapnp._initSubarrayPartitioner(),
      readState.subarrayPartitioner
    );
  }
}

function serializeSubarrayPartitioner(
  subarrayPartitionerCapnp: SubarrayPartitionerCapnp,
  subarrayPartitioner: SubarrayPartitioner
) {
  const {
    memoryBudget = 0,
    memoryBudgetVar = 0,
    memoryBudgetValidity = 0
  } = subarrayPartitioner;

  if (subarrayPartitioner.subarray) {
    serializeSubArray(
      subarrayPartitionerCapnp._initSubarray(),
      subarrayPartitioner.subarray
    );
  }

  if (subarrayPartitioner.budget?.length) {
    const budgetCapnp = subarrayPartitionerCapnp._initBudget(
      subarrayPartitioner.budget.length
    );

    subarrayPartitioner.budget.forEach((attributeBufferSize, i) => {
      const attributeBufferSizeCapnp = budgetCapnp.get(i);

      attributeBufferSizeCapnp.attribute = attributeBufferSize.attribute;
      attributeBufferSizeCapnp.offsetBytes = BigInt(
        attributeBufferSize.offsetBytes
      );
      attributeBufferSizeCapnp.dataBytes = BigInt(
        attributeBufferSize.dataBytes
      );
      attributeBufferSizeCapnp.validityBytes = BigInt(
        attributeBufferSize.validityBytes
      );
    });
  }

  if (subarrayPartitioner.current) {
    const {
      subarray,
      start = 0,
      end = 0,
      splitMultiRange
    } = subarrayPartitioner.current;
    const currentCapnp = subarrayPartitionerCapnp._initCurrent();

    if (subarray) {
      serializeSubArray(
        currentCapnp._initSubarray(),
        subarrayPartitioner.current.subarray
      );
    }

    currentCapnp.start = BigInt(start);
    currentCapnp.end = BigInt(end);
    currentCapnp.splitMultiRange = splitMultiRange;
  }

  if (subarrayPartitioner.state) {
    const {
      start = 0,
      end = 0,
      singleRange = [],
      multiRange = []
    } = subarrayPartitioner.state;

    const stateCapnp = subarrayPartitionerCapnp._initState();

    stateCapnp.start = BigInt(start);
    stateCapnp.end = BigInt(end);

    const singleRangeCapnp = stateCapnp._initSingleRange(singleRange.length);

    singleRange.forEach((range, i) => {
      const rangeCapnp = singleRangeCapnp.get(i);
      serializeSubArray(rangeCapnp, range);
    });

    const multiRangeCapnp = stateCapnp._initMultiRange(multiRange.length);

    multiRange.forEach((range, i) => {
      const rangeCapnp = multiRangeCapnp.get(i);
      serializeSubArray(rangeCapnp, range);
    });
  }

  subarrayPartitionerCapnp.memoryBudget = BigInt(memoryBudget);
  subarrayPartitionerCapnp.memoryBudgetVar = BigInt(memoryBudgetVar);
  subarrayPartitionerCapnp.memoryBudgetValidity = BigInt(memoryBudgetValidity);

  if (subarrayPartitioner.stats) {
    serializeStats(
      subarrayPartitionerCapnp._initStats(),
      subarrayPartitioner.stats
    );
  }
}

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

function allocateList(
  pointer: capnp.Pointer,
  type: capnp.ListElementSize,
  length: number
) {
  const c = pointer.segment.allocate(
    length * capnp.utils.getListElementByteLength(type)
  );
  const res = capnp.utils.initPointer(c.segment, c.byteOffset, pointer);
  capnp.utils.setListPointer(
    res.offsetWords,
    type,
    length,
    res.pointer,
    undefined
  );
}
