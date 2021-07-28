const TileDBQuery = require("../lib/TileDBQuery");
const { getResults } = require("../lib/TileDBQuery/TileDBQuery");
const serializer = require("../lib/utils/capnpQuerySerializer");
const deSerializer = require("../lib/utils/capnpQueryDeSerializer");
const fs = require("fs");
const path = require("path");
const { mixedQueryData, arraySchemaAttributes, stringQueryData, dtQueryData } = require("./data");

// const basePathV2 = "http://rest-server:8181/v2";
const basePathV2 = "https://api.dev.tiledb.io/v2";
const username = process.env.TDB_USER;
const password = process.env.TDB_PASS;


// saveResponseFromServerToFile();
// readServerResponseFromFile();
// readBodyFile();
// makeSimpleCallFixedSizedAttributes();
// makeVarLengthCall();
// compareQueryObjects();
callVarAndFixedSimpleArray();
// callFixedA0A3();
// serializeAndDeserializeBody();
// callSparseString();
// callSparseDt();


function callSparseDt() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_dt.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const QueryHelper = new TileDBQuery.default({
        username,
        password,
        basePath: basePathV2,
      });

      const deserializedFromBodyFile = deSerializer.default(arrayBuffer);
      QueryHelper.SubmitQuery("kostas", "sparse_dt", dtQueryData)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  );
}

function callSparseString() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_sparse_string.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const QueryHelper = new TileDBQuery.default({
        username,
        password,
        basePath: basePathV2,
      });
      const deserializedFromBodyFile = deSerializer.default(arrayBuffer);
      QueryHelper.SubmitQuery("kostas", "quickstart_sparse_string_array", stringQueryData)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  );
}

function compareQueryObjects() {
  console.log(JSON.stringify(query.attributeBufferHeaders) === JSON.stringify(queryVarLengthFromPreviousCommit.attributeBufferHeaders));
  console.log(query.attributeBufferHeaders)
  console.log(queryVarLengthFromPreviousCommit.attributeBufferHeaders);
}

function callVarAndFixedSimpleArray() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_mixed_overlapped_range.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const QueryHelper = new TileDBQuery.default({
        username,
        password,
        basePath: basePathV2,
      });
      const deserializedFromBodyFile = deSerializer.default(arrayBuffer);
      QueryHelper.SubmitQuery("kostas", "var_length", mixedQueryData)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  );
}

function serializeAndDeserializeBody() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_dt.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const deserializedFromBodyFile = deSerializer.default(arrayBuffer);
      console.log(deserializedFromBodyFile.reader.subarray.ranges);
      const serialized = serializer.default(deserializedFromBodyFile);
      const endResult = deSerializer.default(serialized);
      console.log(endResult.reader.subarray.ranges);
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

      QueryHelper.SubmitQuery("kostas", "fixed_a0_a3", mixedQueryData)
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
    "../fixtures/body_mixed_range.raw",
    "../fixtures/body_mixed_overlapped_range.raw",
    "../fixtures/body_sparse_string.raw",
    "../fixtures/body_sparse_string64.raw",
    "../fixtures/body_dt.raw",
  ];
  fs.readFile(path.resolve(__dirname, bodyFiles[8]), (__, data) => {
    const arrayBuffer = toArrayBuffer(data);
    const result = deSerializer.default(arrayBuffer);
    console.log(result.reader.subarray.ranges);
  });
}

function readServerResponseFromFile() {
  const responseFiles = [
    "../fixtures/response_from_rest.raw",
    "../fixtures/response_mixed.raw",
    "../fixtures/response_fixed_new.raw",
    "../fixtures/response_from_server_mixed.raw",
    "../fixtures/response_a0_a1.raw",
    "../fixtures/response_from_server_a0_a1.raw",
    "../fixtures/response_mixed_overlapped_range.raw",
  ];
  fs.readFile(path.resolve(__dirname, responseFiles[6]), (__, data) => {
    const arrayBuffer = toArrayBuffer(data);
    // console.log(arrayBuffer.byteLength);
    const result = deSerializer.default(arrayBuffer);
    console.log(result.reader.subarray.ranges);

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

/**
 * Transform node buffer to ArrayBuffer
 */
function toArrayBuffer(buf) {
  return new Uint8Array(buf).buffer;
}
