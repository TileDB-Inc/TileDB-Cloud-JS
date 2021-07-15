const TileDBQuery = require("../lib/TileDBQuery");
const { getResults } = require("../lib/TileDBQuery/TileDBQuery");
const serializer = require("../lib/utils/capnpQuerySerializer");
const deSerializer = require("../lib/utils/capnpQueryDeSerializer");

const fs = require("fs");
const path = require("path");

const query = {
  layout: 'row-major',
  reader: {
    layout: 'row-major',
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
        },
        {
          type: 'INT32',
          hasDefaultRange: false,
          buffer: [
            2, 0, 0, 0,
            4, 0, 0, 0
          ]
        }
      ]
    }
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

readServerResponseFromFile();
// makeCall();
// makeSimpleCallFixedSizedAttributes();


function makeSimpleCallFixedSizedAttributes() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const QueryHelper = new TileDBQuery.default({
        username: "kostas",
        password: "password",
        basePath: "https://api.dev.tiledb.io/v2"
      });
      QueryHelper.SubmitQuery("kostas", "quickstart_sparse_array", arrayBuffer).then((res) => {
        console.log(res);

      }).catch((e) => {
        console.error(e);
      })
    }
  );
}

function readServerResponseFromFile() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/response_from_rest.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);


      const result = deSerializer.default(arrayBuffer);


      console.log(getResults(arrayBuffer, result.attributeBufferHeaders, arraySchemaAttributes));

    }
  );
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
        basePath: "https://api.dev.tiledb.io/v2",
      });

      QueryHelper.SubmitQuery("kostas", "var_length", arrayBuffer).then((res) => {
        console.log(res);
      }).catch((e) => {
        console.error(e);
      })

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
