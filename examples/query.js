const TileDBQuery = require("../lib/TileDBQuery");
const { getResults } = require("../lib/TileDBQuery/TileDBQuery");
const serializer = require("../lib/utils/capnpQuerySerializer");
const deSerializer = require("../lib/utils/capnpQueryDeSerializer");
const fs = require("fs");
const path = require("path");

const basePathV2 = "http://rest-server:8181/v2";
// const basePathV2 = "https://api.dev.tiledb.io/v2";
const username = process.env.TDB_USER;
const password = process.env.TDB_PASS;

const query = {"attributeBufferHeaders":[{"name":"a5","fixedLenBufferSizeInBytes":16,"varLenBufferSizeInBytes":0,"validityLenBufferSizeInBytes":4,"originalFixedLenBufferSizeInBytes":16,"originalVarLenBufferSizeInBytes":0,"originalValidityLenBufferSizeInBytes":4},{"name":"a4","fixedLenBufferSizeInBytes":96,"varLenBufferSizeInBytes":128,"validityLenBufferSizeInBytes":0,"originalFixedLenBufferSizeInBytes":96,"originalVarLenBufferSizeInBytes":128,"originalValidityLenBufferSizeInBytes":0},{"name":"a1","fixedLenBufferSizeInBytes":96,"varLenBufferSizeInBytes":9,"validityLenBufferSizeInBytes":0,"originalFixedLenBufferSizeInBytes":96,"originalVarLenBufferSizeInBytes":9,"originalValidityLenBufferSizeInBytes":0},{"name":"a3","fixedLenBufferSizeInBytes":12,"varLenBufferSizeInBytes":0,"validityLenBufferSizeInBytes":0,"originalFixedLenBufferSizeInBytes":12,"originalVarLenBufferSizeInBytes":0,"originalValidityLenBufferSizeInBytes":0},{"name":"a6","fixedLenBufferSizeInBytes":32,"varLenBufferSizeInBytes":32,"validityLenBufferSizeInBytes":8,"originalFixedLenBufferSizeInBytes":32,"originalVarLenBufferSizeInBytes":32,"originalValidityLenBufferSizeInBytes":8},{"name":"a2","fixedLenBufferSizeInBytes":96,"varLenBufferSizeInBytes":0,"validityLenBufferSizeInBytes":0,"originalFixedLenBufferSizeInBytes":96,"originalVarLenBufferSizeInBytes":0,"originalValidityLenBufferSizeInBytes":0},{"name":"a0","fixedLenBufferSizeInBytes":12,"varLenBufferSizeInBytes":0,"validityLenBufferSizeInBytes":0,"originalFixedLenBufferSizeInBytes":12,"originalVarLenBufferSizeInBytes":0,"originalValidityLenBufferSizeInBytes":0}],"layout":"row-major","status":"UNINITIALIZED","type":"READ","writer":{"checkCoordDups":false,"checkCoordOOB":false,"dedupCoords":false,"subarray":{"int8":[],"uint8":[],"int16":[],"uint16":[],"int32":[],"uint32":[],"int64":[],"uint64":[],"float32":[],"float64":[]},"subarrayRanges":{"layout":"","stats":{"timers":[],"counters":[]},"ranges":[]},"stats":{"timers":[],"counters":[]}},"reader":{"layout":"row-major","subarray":{"layout":"row-major","stats":{"timers":[],"counters":[]},"ranges":[{"type":"INT32","hasDefaultRange":false,"buffer":[1,0,0,0,2,0,0,0],"bufferSizes":[8],"bufferStartSizes":[0]},{"type":"INT32","hasDefaultRange":false,"buffer":[2,0,0,0,4,0,0,0],"bufferSizes":[8],"bufferStartSizes":[0]}]},"readState":{"overflowed":false,"unsplittable":false,"initialized":false,"subarrayPartitioner":{"subarray":{"layout":"","stats":{"timers":[],"counters":[]},"ranges":[]},"budget":[],"current":{"subarray":{"layout":"","stats":{"timers":[],"counters":[]},"ranges":[]},"start":0,"end":0,"splitMultiRange":false},"state":{"start":0,"end":0,"singleRange":[],"multiRange":[]},"memoryBudget":0,"memoryBudgetVar":0,"memoryBudgetValidity":0,"stats":{"timers":[],"counters":[]}}},"condition":{"clauses":[],"clauseCombinationOps":[]},"stats":{"timers":[],"counters":[]}},"array":{"endTimestamp":null,"queryType":"","uri":"file:///home/sgus/Development/Go/src/github.com/TileDB-Inc/TileDB-Cloud-JS/fixtures/variable_length_array","startTimestamp":0},"totalFixedLengthBufferBytes":104,"totalVarLenBufferBytes":169,"totalValidityBufferBytes":12,"varOffsetsMode":"","varOffsetsAddExtraElement":false,"varOffsetsBitsize":64,"config":{"entries":[{"key":"config.env_var_prefix","value":"TILEDB_"},{"key":"config.logging_level","value":"0"},{"key":"rest.http_compressor","value":"any"},{"key":"rest.retry_count","value":"3"},{"key":"rest.retry_delay_factor","value":"1.25"},{"key":"rest.retry_http_codes","value":"503"},{"key":"rest.retry_initial_delay_ms","value":"500"},{"key":"rest.server_address","value":"https://api.tiledb.com"},{"key":"rest.server_serialization_format","value":"CAPNP"},{"key":"sm.check_coord_dups","value":"true"},{"key":"sm.check_coord_oob","value":"true"},{"key":"sm.check_global_order","value":"true"},{"key":"sm.compute_concurrency_level","value":"12"},{"key":"sm.consolidation.amplification","value":"1.0"},{"key":"sm.consolidation.buffer_size","value":"50000000"},{"key":"sm.consolidation.mode","value":"fragments"},{"key":"sm.consolidation.step_max_frags","value":"4294967295"},{"key":"sm.consolidation.step_min_frags","value":"4294967295"},{"key":"sm.consolidation.step_size_ratio","value":"0.0"},{"key":"sm.consolidation.steps","value":"4294967295"},{"key":"sm.consolidation.timestamp_end","value":"18446744073709551615"},{"key":"sm.consolidation.timestamp_start","value":"0"},{"key":"sm.dedup_coords","value":"false"},{"key":"sm.enable_signal_handlers","value":"true"},{"key":"sm.io_concurrency_level","value":"12"},{"key":"sm.max_tile_overlap_size","value":"314572800"},{"key":"sm.memory_budget","value":"5368709120"},{"key":"sm.memory_budget_var","value":"10737418240"},{"key":"sm.read_range_oob","value":"warn"},{"key":"sm.skip_checksum_validation","value":"false"},{"key":"sm.skip_est_size_partitioning","value":"false"},{"key":"sm.sub_partitioner_memory_budget","value":"0"},{"key":"sm.tile_cache_size","value":"10000000"},{"key":"sm.vacuum.mode","value":"fragments"},{"key":"sm.vacuum.timestamp_end","value":"18446744073709551615"},{"key":"sm.vacuum.timestamp_start","value":"0"},{"key":"sm.var_offsets.bitsize","value":"64"},{"key":"sm.var_offsets.extra_element","value":"false"},{"key":"sm.var_offsets.mode","value":"bytes"},{"key":"vfs.azure.blob_endpoint","value":""},{"key":"vfs.azure.block_list_block_size","value":"5242880"},{"key":"vfs.azure.max_parallel_ops","value":"12"},{"key":"vfs.azure.storage_account_key","value":""},{"key":"vfs.azure.storage_account_name","value":""},{"key":"vfs.azure.use_block_list_upload","value":"true"},{"key":"vfs.azure.use_https","value":"true"},{"key":"vfs.file.enable_filelocks","value":"true"},{"key":"vfs.file.max_parallel_ops","value":"12"},{"key":"vfs.file.posix_directory_permissions","value":"755"},{"key":"vfs.file.posix_file_permissions","value":"644"},{"key":"vfs.gcs.max_parallel_ops","value":"12"},{"key":"vfs.gcs.multi_part_size","value":"5242880"},{"key":"vfs.gcs.project_id","value":""},{"key":"vfs.gcs.request_timeout_ms","value":"3000"},{"key":"vfs.gcs.use_multi_part_upload","value":"true"},{"key":"vfs.hdfs.kerb_ticket_cache_path","value":""},{"key":"vfs.hdfs.name_node_uri","value":""},{"key":"vfs.hdfs.username","value":""},{"key":"vfs.min_batch_gap","value":"512000"},{"key":"vfs.min_batch_size","value":"20971520"},{"key":"vfs.min_parallel_size","value":"10485760"},{"key":"vfs.read_ahead_cache_size","value":"10485760"},{"key":"vfs.read_ahead_size","value":"102400"},{"key":"vfs.s3.aws_access_key_id","value":""},{"key":"vfs.s3.aws_external_id","value":""},{"key":"vfs.s3.aws_load_frequency","value":""},{"key":"vfs.s3.aws_role_arn","value":""},{"key":"vfs.s3.aws_secret_access_key","value":""},{"key":"vfs.s3.aws_session_name","value":""},{"key":"vfs.s3.aws_session_token","value":""},{"key":"vfs.s3.ca_file","value":""},{"key":"vfs.s3.ca_path","value":""},{"key":"vfs.s3.connect_max_tries","value":"5"},{"key":"vfs.s3.connect_scale_factor","value":"25"},{"key":"vfs.s3.connect_timeout_ms","value":"10800"},{"key":"vfs.s3.endpoint_override","value":""},{"key":"vfs.s3.logging_level","value":"Off"},{"key":"vfs.s3.max_parallel_ops","value":"12"},{"key":"vfs.s3.multipart_part_size","value":"5242880"},{"key":"vfs.s3.proxy_host","value":""},{"key":"vfs.s3.proxy_password","value":""},{"key":"vfs.s3.proxy_port","value":"0"},{"key":"vfs.s3.proxy_scheme","value":"http"},{"key":"vfs.s3.proxy_username","value":""},{"key":"vfs.s3.region","value":"us-east-1"},{"key":"vfs.s3.request_timeout_ms","value":"3000"},{"key":"vfs.s3.requester_pays","value":"false"},{"key":"vfs.s3.scheme","value":"https"},{"key":"vfs.s3.skip_init","value":"false"},{"key":"vfs.s3.sse","value":""},{"key":"vfs.s3.sse_kms_key_id","value":""},{"key":"vfs.s3.use_multipart_upload","value":"true"},{"key":"vfs.s3.use_virtual_addressing","value":"true"},{"key":"vfs.s3.verify_ssl","value":"true"}]},"stats":{"timers":[],"counters":[]}}


const arraySchemaAttributes = [
  {
    cellValNum: 4294967295,
    name: "a1",
    type: "CHAR",
    filterPipeline: {},
    fillValue: [128],
    nullable: false,
    fillValueValidity: true,
  },
  {
    cellValNum: 4294967295,
    name: "a2",
    type: "UINT64",
    filterPipeline: {},
    fillValue: [255, 255, 255, 255, 255, 255, 255, 255],
    nullable: false,
    fillValueValidity: true,
  },
  {
    cellValNum: 4294967295,
    name: "a4",
    type: "INT32",
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: false,
    fillValueValidity: true,
  },
  {
    cellValNum: 1,
    name: "a3",
    type: "INT32",
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: false,
    fillValueValidity: true,
  },
  {
    cellValNum: 1,
    name: "a0",
    type: "INT32",
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: false,
    fillValueValidity: true,
  },
  {
    cellValNum: 1,
    name: "a5",
    type: "INT32",
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: true,
    fillValueValidity: false,
  },
  {
    cellValNum: 4294967295,
    name: "a6",
    type: "INT32",
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: true,
    fillValueValidity: false,
  },
];

// readServerResponseFromFile();
// callVarAndFixedSimpleArray();
// saveResponseFromServerToFile();
// readBodyFile();
// serializeAndDeserializeBody();
makeSimpleCallFixedSizedAttributes();
// makeCall();

function serializeAndDeserializeBody() {
  const serialized = serializer.default(query);
  const deserialized = deSerializer.default(serialized);
  console.log(deserialized.layout);
  console.log(deserialized.reader.layout);
  console.log(deserialized.array);

  console.log("------------------------------");
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_mixed.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const deserializedFromBodyFile = deSerializer.default(arrayBuffer);
      console.log(deserializedFromBodyFile.layout);
      console.log(deserializedFromBodyFile.reader.layout);
      console.log(
        deserializedFromBodyFile.array
      );
      console.log(
        JSON.stringify(deserializedFromBodyFile.array) ===
          JSON.stringify(deserialized.array)
      );
    }
  );
}

function makeSimpleCallFixedSizedAttributes() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_mixed.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const QueryHelper = new TileDBQuery.default({
        username,
        password,
        basePath: basePathV2,
      });
      // Deserialize body.raw and serialize again to mimic our own implementation
      const deserialized = deSerializer.default(arrayBuffer);
      const serialized = serializer.default(deserialized);

      QueryHelper.SubmitQuery("kostas", "var_length", query)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  );
}

function readBodyFile() {
  const bodyFiles = [
    "../fixtures/body.raw",
    "../fixtures/body_mixed.raw",
    "../fixtures/body_a0_a1.raw",
  ];
  fs.readFile(path.resolve(__dirname, bodyFiles[1]), (__, data) => {
    const arrayBuffer = toArrayBuffer(data);
    // console.log(arrayBuffer.byteLength);
    const result = deSerializer.default(arrayBuffer);
    console.log(result);
  });
}

function callVarAndFixedSimpleArray() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_a0_a1.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const QueryHelper = new TileDBQuery.default({
        username,
        password,
        basePath: basePathV2,
      });
      QueryHelper.SubmitQuery("kostas", "var_length", query)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  );
}

function readServerResponseFromFile() {
  const responseFiles = [
    "../fixtures/response_from_rest.raw",
    "../fixtures/response_mixed.raw",
    "../fixtures/response_from_server_mixed.raw",
    "../fixtures/response_a0_a1.raw",
    "../fixtures/response_from_server_a0_a1.raw",
  ];
  fs.readFile(path.resolve(__dirname, responseFiles[2]), (__, data) => {
    const arrayBuffer = toArrayBuffer(data);
    console.log(arrayBuffer.byteLength);
    const result = deSerializer.default(arrayBuffer);
    // console.log(result.attributeBufferHeaders);
    // console.log(new Uint32Array(arrayBuffer.slice(-15, -3)));
    console.log(
      getResults(
        arrayBuffer,
        result.attributeBufferHeaders,
        arraySchemaAttributes
      )
    );
  });
}

function printDeserializedQueryObjectBuffer(arrayBuffer) {
  const res = deSerializer.default(arrayBuffer);
  console.log(res);
}

function saveResponseFromServerToFile() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_mixed.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const QueryHelper = new TileDBQuery.default({
        username,
        password,
        basePath: basePathV2,
      });
      QueryHelper.SubmitQuery("kostas", "var_length", arrayBuffer)
        .then((res) => {
          console.log(res.byteLength);

          fs.writeFile(
            path.resolve(
              __dirname,
              "../fixtures/response_from_server_mixed.raw"
            ),
            res,
            undefined,
            () => null
          );
        })
        .catch((e) => {
          console.error(e);
        });
    }
  );
}

function makeCall() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_mixed.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);

      const QueryHelper = new TileDBQuery.default({
        username,
        password,
        basePath: basePathV2,
      });

      QueryHelper.SubmitQuery("kostas", "var_length", query)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  );
}

// /**
//  * They come as a5, a4, a1, a3, a6, a2, a0
//  */
// console.log(new Int32Array(arrayBuffer.slice(-12))) // a0 (12, 234, 17)   FIXED
// console.log(new BigUint64Array(arrayBuffer.slice(-44, -12))) // a2  [ 20, 311, 27, 82 ]  VAR + 24 bytes tail
// console.log(new Int8Array(arrayBuffer.slice(-71, -68))); // a6 validity buffers
// console.log(new Int32Array(arrayBuffer.slice(-87, -71))) // a6  [ 12 NULL 21 NULL NULL NULL NULL NULL ]  3 BYTES (validityLenBufferSizeInBytes) + VAR + NULLABLE + 24 bytes tail
// console.log(new Int32Array(arrayBuffer.slice(-123, -111))) // a3 (12, 23, 44)  FIXED
// const typedUint8Array = new Uint8Array(arrayBuffer.slice(-131, -123));
// const utf8decoder = new TextDecoder();
// console.log(utf8decoder.decode(typedUint8Array)) // a1 (bbcccddd)    VAR + 24 bytes tail
// console.log(new Int32Array(arrayBuffer.slice(-171, -155))); // a4  [ 2, 19, 27, 81 ]    VAR
// console.log(new Int8Array(arrayBuffer.slice(-198, -195))); // a5  [ 8 NULL 17 NULL ]    FIXED
// console.log(new Int32Array(arrayBuffer.slice(-210, -198))); // a5  [ 8 NULL 17 NULL ]    FIXED

// console.log(new Int32Array(arrayBuffer.slice(-195, -171))) // offset of VAR attributes???

/** fixtures/response_mixed.raw
 * a1: bb, a2: 20 31, a4: 2 19
 * a1: ccc, a2: 27, a4: 27
 * a1: dd, a2: 82, a4: 81
 * a3: 12, 23, 44 (fixed)
 * a0: 12, 234, 17 (fixed)
 * a4: 20, 31, 27, 82 (var)
 * a5: 8 NULL 17 NULL
 * a6: 12 NULL 21 NULL NULL NULL NULL NULL
 */

/** fixtures/response_fixed.raw
 * Cell (2, 3) has data 33
 * Cell (2, 4) has data 28
 */

/** fixtures/response_var.raw
 * a1: bb, a2: 2 2
 * a1: ccc, a2: 3
 * a1: dd, a2: 4
 */

/**
 * Transform node buffer to ArrayBuffer
 */
function toArrayBuffer(buf) {
  return new Uint8Array(buf).buffer;
}
