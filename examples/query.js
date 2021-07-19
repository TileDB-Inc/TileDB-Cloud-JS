const TileDBQuery = require("../lib/TileDBQuery");
const { getResults } = require("../lib/TileDBQuery/TileDBQuery");
const serializer = require("../lib/utils/capnpQuerySerializer");
const deSerializer = require("../lib/utils/capnpQueryDeSerializer");
const fs = require("fs");
const path = require("path");
const { query, arraySchemaAttributes, queryFixed, queryFixedA0A3 } = require("./data");

// const basePathV2 = "http://rest-server:8181/v2";
const basePathV2 = "https://api.dev.tiledb.io/v2";
const username = process.env.TDB_USER;
const password = process.env.TDB_PASS;

// readServerResponseFromFile();
// callVarAndFixedSimpleArray();
// saveResponseFromServerToFile();
// readBodyFile();
// serializeAndDeserializeBody();
makeSimpleCallFixedSizedAttributes();
// makeVarLengthCall();
// callFixedA0A3();

function serializeAndDeserializeBody() {
  const serialized = serializer.default(query);
  const deserialized = deSerializer.default(serialized);
  // console.log(deserialized);

  console.log("------------------------------");
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_fixed_new.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const deserializedFromBodyFile = deSerializer.default(arrayBuffer);
      console.log(deserializedFromBodyFile);
      console.log("------------------------------");
      console.log("------------------------------");
      console.log("------------------------------");
      const serialized = serializer.default(deserializedFromBodyFile);
      const deserialized = deSerializer.default(serialized);
      console.log(deserialized);
      // console.log(JSON.stringify(deserialized.reader) === JSON.stringify(deserializedFromBodyFile.reader));

      // console.log(
      //   JSON.stringify(deserializedFromBodyFile) ===
      //     JSON.stringify(deserialized)
      // );
    }
  );
}

function callFixedA0A3() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_fixed_new.raw"),
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

      QueryHelper.SubmitQuery("kostas", "fixed_a0_a3", queryFixedA0A3)
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
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body.raw"),
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
      
      QueryHelper.SubmitQuery("kostas", "quickstart_sparse_array", serialized)
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
    "../fixtures/body_fixed_new.raw",
  ];
  fs.readFile(path.resolve(__dirname, bodyFiles[3]), (__, data) => {
    const arrayBuffer = toArrayBuffer(data);
    // const textDecoder = new TextDecoder();
    // console.log(textDecoder.decode(arrayBuffer));
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
    "../fixtures/response_fixed_new.raw",
    "../fixtures/response_from_server_mixed.raw",
    "../fixtures/response_a0_a1.raw",
    "../fixtures/response_from_server_a0_a1.raw",
  ];
  fs.readFile(path.resolve(__dirname, responseFiles[2]), (__, data) => {
    const arrayBuffer = toArrayBuffer(data);
    // console.log(arrayBuffer.byteLength);
    const result = deSerializer.default(arrayBuffer);
    console.log(result.reader.readState.subarrayPartitioner);

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

function makeVarLengthCall() {
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
