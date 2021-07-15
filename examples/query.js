const TileDBQuery = require("../lib/TileDBQuery");
const { getResults } = require("../lib/TileDBQuery/TileDBQuery");
const serializer = require("../lib/utils/capnpQuerySerializer");
const deSerializer = require("../lib/utils/capnpQueryDeSerializer");
const fs = require("fs");
const path = require("path");

const basePathV2 = "http://rest-server:8181/v2"
// const basePathV2 = "https://api.dev.tiledb.io/v2";


const query = {
  attributeBufferHeaders: [
    {
      name: 'a5',
      fixedLenBufferSizeInBytes: 12,
      varLenBufferSizeInBytes: 0,
      validityLenBufferSizeInBytes: 3,
      originalFixedLenBufferSizeInBytes: 16,
      originalVarLenBufferSizeInBytes: 0,
      originalValidityLenBufferSizeInBytes: 4
    },
    {
      name: 'a4',
      fixedLenBufferSizeInBytes: 24,
      varLenBufferSizeInBytes: 16,
      validityLenBufferSizeInBytes: 0,
      originalFixedLenBufferSizeInBytes: 96,
      originalVarLenBufferSizeInBytes: 128,
      originalValidityLenBufferSizeInBytes: 0
    },
    {
      name: 'a1',
      fixedLenBufferSizeInBytes: 24,
      varLenBufferSizeInBytes: 8,
      validityLenBufferSizeInBytes: 0,
      originalFixedLenBufferSizeInBytes: 96,
      originalVarLenBufferSizeInBytes: 9,
      originalValidityLenBufferSizeInBytes: 0
    },
    {
      name: 'a3',
      fixedLenBufferSizeInBytes: 12,
      varLenBufferSizeInBytes: 0,
      validityLenBufferSizeInBytes: 0,
      originalFixedLenBufferSizeInBytes: 12,
      originalVarLenBufferSizeInBytes: 0,
      originalValidityLenBufferSizeInBytes: 0
    },
    {
      name: 'a6',
      fixedLenBufferSizeInBytes: 24,
      varLenBufferSizeInBytes: 16,
      validityLenBufferSizeInBytes: 3,
      originalFixedLenBufferSizeInBytes: 32,
      originalVarLenBufferSizeInBytes: 32,
      originalValidityLenBufferSizeInBytes: 8
    },
    {
      name: 'a2',
      fixedLenBufferSizeInBytes: 24,
      varLenBufferSizeInBytes: 32,
      validityLenBufferSizeInBytes: 0,
      originalFixedLenBufferSizeInBytes: 96,
      originalVarLenBufferSizeInBytes: 0,
      originalValidityLenBufferSizeInBytes: 0
    },
    {
      name: 'a0',
      fixedLenBufferSizeInBytes: 12,
      varLenBufferSizeInBytes: 0,
      validityLenBufferSizeInBytes: 0,
      originalFixedLenBufferSizeInBytes: 12,
      originalVarLenBufferSizeInBytes: 0,
      originalValidityLenBufferSizeInBytes: 0
    }
  ],
  totalVarLenBufferBytes: 72,
  totalFixedLengthBufferBytes: 132,
  totalValidityBufferBytes: 6,
  type: "READ",
  status: "INCOMPLETE",
  layout: "row-major",
  reader: {
    layout: "row-major",
    subarray: {
      layout: "row-major",
      ranges: [
        {
          type: "INT32",
          hasDefaultRange: false,
          buffer: [1, 0, 0, 0, 2, 0, 0, 0],
          bufferSizes: [ 8 ],
          bufferStartSizes: [ 0 ]
        },
        {
          type: "INT32",
          hasDefaultRange: false,
          buffer: [2, 0, 0, 0, 4, 0, 0, 0],
          bufferSizes: [ 8 ],
          bufferStartSizes: [ 0 ]
        },
      ],
    },
    readState: {
      overflowed: false,
      unsplittable: false,
      initialized: true,
      subarrayPartitioner: {
        subarray: {
          layout: 'row-major',
          ranges: [
            {
              type: 'INT32',
              hasDefaultRange: false,
              buffer: [
                1, 0, 0, 0,
                2, 0, 0, 0
              ],
              bufferSizes: [ 8 ],
              bufferStartSizes: [ 0 ]
            },
            {
              type: 'INT32',
              hasDefaultRange: false,
              buffer: [
                2, 0, 0, 0,
                4, 0, 0, 0
              ],
              bufferSizes: [ 8 ],
              bufferStartSizes: [ 0 ]
            }
          ]
        },
        budget: [
          { attribute: 'a0' },
          { attribute: 'a2' },
          { attribute: 'a6' },
          { attribute: 'a3' },
          { attribute: 'a1' },
          { attribute: 'a4' },
          { attribute: 'a5' }
        ],
        current: {
          subarray: {
            layout: 'row-major',
            ranges: [
              {
                type: 'INT32',
                hasDefaultRange: false,
                buffer: [
                  1, 0, 0, 0,
                  1, 0, 0, 0
                ],
                bufferSizes: [ 8 ],
                bufferStartSizes: [ 0 ]
              },
              {
                type: 'INT32',
                hasDefaultRange: false,
                buffer: [
                  2, 0, 0, 0,
                  4, 0, 0, 0
                ],
                bufferSizes: [ 8 ],
                bufferStartSizes: [ 0 ]
              }
            ]            
          },
          start: 0,
          end: 0,
          splitMultiRange: true
        },
        state: {
          overflowed: false,
          unsplittable: false,
          initialized: false,
          subarrayPartitioner: {
            subarray: [],
            budget: [],
            current: { subarray: [], start: 0, end: 0, splitMultiRange: false },
            state: { start: 0, end: 0, singleRange: [], multiRange: [] },
            memoryBudget: 0,
            memoryBudgetVar: 0,
            memoryBudgetValidity: 0,
            stats: { timers: [], counters: [] }
          }
        },
        memoryBudget: 0,
        memoryBudgetVar: 0,
        memoryBudgetValidity: 0,
        stats: {
          timers: [
            {
              key: 'Context.StorageManager.Query.Reader.SubarrayPartitioner.read_next_partition.max',
              value: 0.000624393
            },
            {
              key: 'Context.StorageManager.Query.Reader.SubarrayPartitioner.read_next_partition.sum',
              value: 0.000624393
            }
          ],
          counters: [
            {
              key: 'Context.StorageManager.Query.Reader.SubarrayPartitioner.read_next_partition.timer_count',
              value: 1
            },
            {
              key: 'Context.StorageManager.Query.Reader.SubarrayPartitioner.compute_current_start_end.not_found',
              value: 1
            },
            {
              key: 'Context.StorageManager.Query.Reader.SubarrayPartitioner.compute_current_start_end.fixed_result_size_overflow',
              value: 1
            }
          ]
        }
      }
    }
  },
  array: {
    endTimestamp: 1626444398441,
    queryType: '',
    uri: 'file:///home/sgus/Development/Go/src/github.com/TileDB-Inc/TileDB-Cloud-JS/fixtures/variable_length_array',
    startTimestamp: 0
  }
};


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
// makeCall();
// readBodyFile();
// serializeAndDeserializeBody();
makeSimpleCallFixedSizedAttributes();


function serializeAndDeserializeBody() {
  const serialized = serializer.default(query);
  const deserialized = deSerializer.default(serialized);
  console.log(deserialized.reader.readState.subarrayPartitioner.current.subarray.ranges);
  console.log('------------------------------');

  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_mixed.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const deserializedFromBodyFile = deSerializer.default(arrayBuffer);
      console.log(deserializedFromBodyFile.reader.readState.subarrayPartitioner.current.subarray.ranges);
    }
  );
}

function callVarAndFixedSimpleArray() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_a0_a1.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const QueryHelper = new TileDBQuery.default({
        username: "kostas",
        password: "password",
        basePath: basePathV2,
      });
      QueryHelper.SubmitQuery(
        "kostas",
        "variable_fixed_char_array",
        arrayBuffer
      )
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  );
}

function makeSimpleCallFixedSizedAttributes() {
  fs.readFile(path.resolve(__dirname, "../fixtures/body_mixed.raw"), (__, data) => {
    const arrayBuffer = toArrayBuffer(data);
    const QueryHelper = new TileDBQuery.default({
      username: "kostas",
      password: "password",
      basePath: basePathV2,
    });
    QueryHelper.SubmitQuery("kostas", "var_length", query)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  });
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

function readServerResponseFromFile() {
  const responseFiles = [
    "../fixtures/response_from_rest.raw",
    "../fixtures/response_mixed.raw",
    "../fixtures/response_a0_a1.raw",
    "../fixtures/response_from_server_a0_a1.raw",
  ];
  fs.readFile(path.resolve(__dirname, responseFiles[1]), (__, data) => {
    const arrayBuffer = toArrayBuffer(data);
    // console.log(arrayBuffer.byteLength);
    const result = deSerializer.default(arrayBuffer);
    console.log(result);
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

function makeCall() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_mixed.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);

      const QueryHelper = new TileDBQuery.default({
        username: "kostas",
        password: "password",
        basePath: basePathV2,
      });

      QueryHelper.SubmitQuery("kostas", "var_length", query)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });

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
    }
  );
}

function saveResponseFromServerToFile() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_a0_a1.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const QueryHelper = new TileDBQuery.default({
        username: "kostas",
        password: "password",
        basePath: basePathV2,
      });
      QueryHelper.SubmitQuery(
        "kostas",
        "variable_fixed_char_array",
        arrayBuffer
      )
        .then((res) => {
          console.log(res);

          fs.writeFile(
            path.resolve(
              __dirname,
              "../fixtures/response_from_server_a0_a1.raw"
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
