
@0xb57d9224b587d87f;

struct Query {
    attributeBufferHeaders @0 :List(AttributeBufferHeader);
    # list of attribute buffer headers

    layout @1 :Text;
    # query write layout

    status @2 :Text;
    # query status

    type @3 :Text;
    # Type of query

    writer @4 :Writer;
    # writer contains data needed for continuation of global write order queries

    reader @5 :QueryReader;
    # reader contains data needed for continuation of incomplete reads

    array @6 :Array;
    # Represents an open array

    totalFixedLengthBufferBytes @7: UInt64;
    # Total number of bytes in fixed size attribute buffers

    totalVarLenBufferBytes @8: UInt64;
    # Total number of bytes in variable size attribute buffers

    totalValidityBufferBytes @9: UInt64;
    # Total number of bytes in validity buffers

    varOffsetsMode @10 :Text;
    # This field is not longer used, it is replaced by the config

    varOffsetsAddExtraElement @11 :Bool;
    # This field is not longer used, it is replaced by the config

    varOffsetsBitsize @12 :Int32;
    # This field is not longer used, it is replaced by the config

    config @13 :Config;
    # Config set on query

    stats @14 :Stats;
    # Stats object
}

struct NonEmptyDomain {
  # object representing a non-empty domain

  nonEmptyDomain @0 :DomainArray;
  # Non-empty domain of array

  isEmpty @1 :Bool;
  # Is non-empty domain really empty?

  sizes @2 :List(UInt64);
  # Number of elements in DomainArray for var length
}

struct NonEmptyDomainList {
  # object representing non-empty domain for heterogeneous or string dimensions
  nonEmptyDomains @0 :List(NonEmptyDomain);
}

struct Attribute {
# Attribute of array
    cellValNum @0 :UInt32;
    # Attribute number of values per cell

    name @1 :Text;
    # Attribute name

    type @2 :Text;
    # TileDB attribute datatype

    filterPipeline @3 :FilterPipeline;
    # TileDB FilterPipeline for Attribute

    fillValue @4 :Data;
    # Default fill value

    nullable @5 :Bool;
    # Is attribute nullable

    fillValueValidity @6 :Bool;
    # Default validity fill value for nullable attributes
}

struct AttributeBufferHeader {
# Represents an attribute buffer header information

    name @0 :Text;
    # Attribute name

    fixedLenBufferSizeInBytes @1 :UInt64;
    # Number of bytes in the fixed-length attribute data buffer

    varLenBufferSizeInBytes @2 :UInt64;
    # Number of bytes in the var-length attribute data buffer

    validityLenBufferSizeInBytes @3 :UInt64;
    # Number of bytes in the validity data buffer

    originalFixedLenBufferSizeInBytes @4 :UInt64;
    # Original user set number of bytes in the fixed-length attribute data buffer

    originalVarLenBufferSizeInBytes @5 :UInt64;
    # Original user set number of bytes in the var-length attribute data buffer

    originalValidityLenBufferSizeInBytes @6 :UInt64;
    # Original user set number of bytes in the validity data buffer
}

struct Dimension {
# Dimension of array

    name @0 :Text;
    # Dimension name

    nullTileExtent @1 :Bool;
    # Is tile extent null

    type @2 :Text;
    # Datatype for Dimension

    tileExtent :union {
      int8 @3 :Int8;
      uint8 @4 :UInt8;
      int16 @5 :Int16;
      uint16 @6 :UInt16;
      int32 @7 :Int32;
      uint32 @8 :UInt32;
      int64 @9 :Int64;
      uint64 @10 :UInt64;
      float32 @11 :Float32;
      float64 @12 :Float64;
    }
    # Extent of tile

    domain @13 :DomainArray;
    # extent of domain

    filterPipeline @14 :FilterPipeline;
    # TileDB FilterPipeline for Dimension
}

struct Domain {
# Domain of array
    cellOrder @0 :Text;
    # Tile Order

    dimensions @1 :List(Dimension);
    # Array of dimensions

    tileOrder @2 :Text;
    # Tile Order

    type @3 :Text;
    # Datatype of domain
}

struct Array {
  endTimestamp @0 :UInt64;
  # ending timestamp array was opened

  queryType @1 :Text;
  # Array opened for query type

  uri @2 :Text;
  # Array uri

  startTimestamp @3 :UInt64;
  # starting timestamp array was opened

  arraySchemaLatest @4 :ArraySchema;
  # latest array schema

  arraySchemasAll @5 :ArraySchemaMap;
  # map of all Array Schemas

  nonEmptyDomain @6 :NonEmptyDomainList;
  # non empty domain

  arrayMetadata @7 :ArrayMetadata;
  # array metadata

  arrayDirectory @8 :ArrayDirectory;
  # array directory (for reads)

  fragmentMetadataAll @9 :List(FragmentMetadata);
  # metadata for all fragments (for reads)

  openedAtEndTimestamp @10 :UInt64;
  # The ending timestamp that the array was last opened at
}

struct ArrayDirectory {
  # object representing an array directory

  struct TimestampedURI {
    uri @0 :Text;
    timestampStart @1 :UInt64;
    timestampEnd @2 :UInt64;
  }

  struct DeleteAndUpdateTileLocation {
    uri @0 :Text;
    conditionMarker @1 :Text;
    offset @2 :UInt64;
  }

  unfilteredFragmentUris @0 :List(Text);
  # fragment URIs

  consolidatedCommitUris @1 :List(Text);
  # consolidated commit URI set

  arraySchemaUris @2 :List(Text);
  # URIs of all the array schema files

  latestArraySchemaUri @3 :Text;
  # latest array schema URI.

  arrayMetaUrisToVacuum @4 :List(Text);
  # the array metadata files to vacuum

  arrayMetaVacUrisToVacuum @5 :List(Text);
  # the array metadata vac files to vacuum

  commitUrisToConsolidate @6 :List(Text);
  # the commit files to consolidate

  commitUrisToVacuum @7 :List(Text);
  # the commit files to vacuum

  consolidatedCommitUrisToVacuum @8 :List(Text);
  # the consolidated commit files to vacuum

  arrayMetaUris @9 :List(TimestampedURI);
  # the timestamped filtered array metadata URIs, after removing
  # the ones that need to be vacuumed and those that do not fall within
  # [timestamp_start, timestamp_end]

  fragmentMetaUris @10 :List(Text);
  # the URIs of the consolidated fragment metadata files

  deleteAndUpdateTileLocation @11 :List(DeleteAndUpdateTileLocation);
  # the location of delete tiles

  timestampStart @12 :UInt64;
   # Only the files created after timestamp_start are listed

  timestampEnd @13 :UInt64;
  # Only the files created before timestamp_end are listed
}

struct FragmentMetadata {
  struct GenericTileOffsets {
      rtree @0 :UInt64;
      # RTree serialized as a blob
      tileOffsets @1 :List(UInt64);
      # tile offsets
      tileVarOffsets @2 :List(UInt64);
      # variable tile offsets
      tileVarSizes @3 :List(UInt64);
      # sizes of the uncompressed variable tiles offsets
      tileValidityOffsets @4 :List(UInt64);
      # tile validity offsets
      tileMinOffsets @5 :List(UInt64);
      # min tile offsets
      tileMaxOffsets @6 :List(UInt64);
      # max tile offsets
      tileSumOffsets @7 :List(UInt64);
      # tile sum offsets
      tileNullCountOffsets @8 :List(UInt64);
      # null count offsets
      fragmentMinMaxSumNullCountOffset @9 :UInt64;
      # fragment min/max/sum/nullcount offsets
      processedConditionsOffsets @10 :UInt64;
      # processed conditions offsets
  }

  fileSizes @0 :List(UInt64);
  # The size of each attribute file

  fileVarSizes @1 :List(UInt64);
  # The size of each var attribute file

  fileValiditySizes @2 :List(UInt64);
  # The size of each validity attribute file

  fragmentUri @3 :Text;
  # The uri of the fragment this metadata belongs to

  hasTimestamps @4 :Bool;
  # True if the fragment has timestamps

  hasDeleteMeta @5 :Bool;
  # True if the fragment has delete metadata

  sparseTileNum @6 :UInt64;
  # The number of sparse tiles

  tileIndexBase@7 :UInt64;
  # Used to track the tile index base between global order writes

  tileOffsets @8 :List(List(UInt64));
  # Tile offsets in their attribute files

  tileVarOffsets @9 :List(List(UInt64));
  # Variable tile offsets in their attribute files

  tileVarSizes @10 :List(List(UInt64));
  # The sizes of the uncompressed variable tiles

  tileValidityOffsets @11 :List(List(UInt64));
  # Validity tile offests in their attribute files

  tileMinBuffer @12 :List(List(UInt8));
  # tile min buffers

  tileMinVarBuffer @13 :List(List(UInt8));
  # tile min buffers for var length data

  tileMaxBuffer @14 :List(List(UInt8));
  # tile max buffers

  tileMaxVarBuffer @15 :List(List(UInt8));
  # tile max buffers for var length data

  tileSums @16 :List(List(UInt8));
  # tile sum values

  tileNullCounts @17 :List(List(UInt64));
  # tile null count values

  fragmentMins @18 :List(List(UInt8));
  # fragment min values

  fragmentMaxs @19 :List(List(UInt8));
  # fragment max values

  fragmentSums @20 :List(UInt64);
  # fragment sum values

  fragmentNullCounts @21 :List(UInt64);
  # fragment null count values

  version @22 :UInt32;
  # the format version of this metadata

  timestampRange @23 :List(UInt64);
  # A pair of timestamps for fragment

  lastTileCellNum @24 :UInt64;
  # The number of cells in the last tile

  nonEmptyDomain @25 :NonEmptyDomainList;
  # The non empty domain of the fragment

  rtree @26 :Data;
  # The RTree for the MBRs serialized as a blob

  hasConsolidatedFooter @27 :Bool;
  # if the fragment metadata footer appears in a consolidated file

  gtOffsets @28 :GenericTileOffsets;
  # the start offsets of the generic tiles stored in the metadata file
}


struct ArrayOpen {
  config @0 :Config;
  # Config
  queryType @1 :Text;
  # Query type to open the array for
}

struct ArraySchema {
# ArraySchema during creation or retrieval
    arrayType @0 :Text;
    # Type of array

    attributes @1 :List(Attribute);
    # Attributes of array

    capacity @2 :UInt64;
    # Capacity of array

    cellOrder @3 :Text;
    # Order of cells

    coordsFilterPipeline @4 :FilterPipeline;
    # Type of compression for coordinates (enum)

    domain @5 :Domain;
    # Domain of array

    offsetFilterPipeline @6 :FilterPipeline;
    # Compression type of cell variable offsets (enum)

    tileOrder @7 :Text;
    # Tile order setting of array

    uri @8 :Text;
    # URI of schema

    version @9 :List(Int32);
    # file format version

    allowsDuplicates @10 :Bool;
    # True if the array allows coordinate duplicates.
    # Applicable only to sparse arrays.

    validityFilterPipeline @11 :FilterPipeline;
    # Type of compression for validity buffers (enum)

    name @12 :Text;
    # name of array schema

    timestampRange @13 :List(UInt64);
    # Timestamp range of array schema
}

struct FloatScaleConfig {
  scale @0 :Float64;
  offset @1 :Float64;
  byteWidth @2 :UInt64;
}

struct Filter {
  type @0 :Text;
  # filter type

  data :union {
    text @1 :Text;
    bytes @2 :Data;
    int8 @3 :Int8;
    uint8 @4 :UInt8;
    int16 @5 :Int16;
    uint16 @6 :UInt16;
    int32 @7 :Int32;
    uint32 @8 :UInt32;
    int64 @9 :Int64;
    uint64 @10 :UInt64;
    float32 @11 :Float32;
    float64 @12 :Float64;
  }

  floatScaleConfig @13 :FloatScaleConfig;
}

struct FilterPipeline {
  filters @0 :List(Filter);
}

# This is an added struct because we were having issues with generics, specifically using Map(Text, ArraySchema)
struct ArraySchemaMap {
  entries @0 :List(Entry);
  struct Entry {
    key @0 :Text;
    value @1 :ArraySchema;
  }
}

struct Map(Key, Value) {
  entries @0 :List(Entry);
  struct Entry {
    key @0 :Key;
    value @1 :Value;
  }
}


struct KV {
  key @0 :Text;
  value @1 :Text;
}

struct Config {
# Represents a config object
  entries @0 :List(KV);
  # list of key-value settings
}


struct Stats {
# Stats struct

  timers @0 :MapFloat64;
  # timer

  counters @1 :MapUInt64;
  # counters
}

struct Writer {
  # Write struct
  checkCoordDups @0 :Bool;

  checkCoordOOB @1 :Bool;

  dedupCoords @2 :Bool;

  subarray @3 :DomainArray;
  # Old-style (single-range) subarray for dense writes

  subarrayRanges @4 :Subarray;
  # The query subarray/ranges object, new style range object

  stats @5 :Stats;
  # Stats object
}


struct QueryReader {
  # Read struct (can't be called reader due to class name conflict)

  layout @0 :Text;
  # The layout of the cells in the result of the subarray

  subarray @1 :Subarray;
  # The query subarray.

  readState @2 :ReadState;
  # Read state of reader

  condition @3 :Condition;
  # The query condition

  stats @4 :Stats;
  # Stats object
}


struct SubarrayRanges {
  # A set of 1D ranges for a subarray

  type @0 :Text;
  # Datatype of the ranges

  hasDefaultRange @1:Bool;
  # True if the range is the default range

  buffer @2 :Data;
  # The bytes of the ranges

  bufferSizes @3 :List(UInt64);
  # The list of sizes per range

  bufferStartSizes @4 :List(UInt64);
  # The list of start sizes per range
}

struct Subarray {
  # A Subarray

  layout @0 :Text;
  # The layout of the subarray

  ranges @1 :List(SubarrayRanges);
  # List of 1D ranges, one per dimension

  stats @2 :Stats;
  # Stats object

  relevantFragments @3 :List(UInt32);
  # Relevant fragments
}


struct SubarrayPartitioner {
  # The subarray partitioner

  struct PartitionInfo {
    subarray @0 :Subarray;
    start @1 :UInt64;
    end @2 :UInt64;
    splitMultiRange @3 :Bool;
  }

  struct State {
    start @0 :UInt64;
    end @1 :UInt64;
    singleRange @2 :List(Subarray);
    multiRange @3 :List(Subarray);
  }

  subarray @0 :Subarray;
  # The subarray the partitioner will iterate on to produce partitions.

  budget @1 :List(AttributeBufferSize);
  # Result size budget (in bytes) for all attributes.

  current @2 :PartitionInfo;
  # The current partition info

  state @3 :State;
  # The state information for the remaining partitions to be produced

  memoryBudget @4 :UInt64;
  # The memory budget for the fixed-sized attributes and the offsets of the var-sized attributes

  memoryBudgetVar @5 :UInt64;
  # The memory budget for the var-sized attributes

  memoryBudgetValidity @6 :UInt64;
  # The memory budget for the validity buffers

  stats @7 :Stats;
  # Stats object
}

struct ReadState {
  overflowed @0 :Bool;
  # `True` if the query produced results that could not fit in some buffer.

  unsplittable @1 :Bool;
  # True if the current subarray partition is unsplittable.

  initialized @2 :Bool;
  # True if the reader has been initialized

  subarrayPartitioner @3 :SubarrayPartitioner;
  # The subarray partitioner
}

struct ConditionClause {
  # A clause within a condition

  fieldName @0 :Text;
  # The name of the field this clause applies to

  value @1 :Data;
  # The comparison value

  op @2 :Text;
  # The comparison operation
}

struct Condition {
  # The query condition

  clauses @0 :List(ConditionClause);
  # All clauses in this condition

  clauseCombinationOps @1 :List(Text);
  # The operation that combines each condition
}

struct DomainArray {
  int8 @0 :List(Int8);
  uint8 @1 :List(UInt8);
  int16 @2 :List(Int16);
  uint16 @3 :List(UInt16);
  int32 @4 :List(Int32);
  uint32 @5 :List(UInt32);
  int64 @6 :List(Int64);
  uint64 @7 :List(UInt64);
  float32 @8 :List(Float32);
  float64 @9 :List(Float64);
}

struct MapFloat64 {
  entries @0 :List(Entry);
  struct Entry {
    key @0 :Text;
    value @1 :Float64;
  }
}

struct MapUInt64 {
  entries @0 :List(Entry);
  struct Entry {
    key @0 :Text;
    value @1 :UInt64;
  }
}

struct AttributeBufferSize {
  # object representing a buffer size of an attribute

  attribute @0: Text;
  # name of attribute

  offsetBytes @1: UInt64;
  # size (in bytes) of offset buffer

  dataBytes @2: UInt64;
  # size (in bytes) of data buffer

  validityBytes @3: UInt64;
  # size (in bytes) of data buffer
}

struct ArrayMetadata {
  # object representing array metadata

  struct MetadataEntry {
    key @0 :Text;
    type @1 :Text;
    valueNum @2 :UInt32;
    value @3 :Data;
    del @4 :Bool;
  }

  entries @0 :List(MetadataEntry);
  # list of metadata values
}