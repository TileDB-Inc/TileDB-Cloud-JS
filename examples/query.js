const TileDBQuery = require("../lib/TileDBQuery");
const { getResults } = require("../lib/TileDBQuery/TileDBQuery");
const serializer = require("../lib/utils/capnpQuerySerializer");
const deSerializer = require("../lib/utils/capnpQueryDeSerializer");
const fs = require("fs");
const path = require("path");
const { mixedQueryData, arraySchemaAttributes, stringQueryData, dtQueryData } = require("./data");

const basePathV2 = "https://api.dev.tiledb.io/v2";
const username = process.env.TDB_USER;
const password = process.env.TDB_PASS;


// saveResponseFromServerToFile();
// readServerResponseFromFile();
// readBodyFile();
// makeSimpleCallFixedSizedAttributes();
// makeVarLengthCall();
// compareQueryObjects();
// callVarAndFixedSimpleArray();
// callFixedA0A3();
// serializeAndDeserializeBody();
// callSparseString();
// callSparseDt();
// callDemo();
// callNullable();
callMultiAttr();


function callMultiAttr() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_multi_attr.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const QueryHelper = new TileDBQuery.default({
        username,
        password,
        basePath: basePathV2,
      });
      const deserializedFromBodyFile = deSerializer.default(arrayBuffer);

      const query = {
        layout: "row-major",
        ranges: [[1,2], [1,2]],
        bufferSize: 15000,
      }
      QueryHelper.SubmitQuery("kostas", "multi_attribute_array", query)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  );
}

function callNullable() {
  fs.readFile(
    path.resolve(__dirname, "../fixtures/body_char.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const QueryHelper = new TileDBQuery.default({
        username,
        password,
        basePath: basePathV2,
      });
      const deserializedFromBodyFile = deSerializer.default(arrayBuffer);
      const query = {
        layout: "row-major",
        ranges: [[1,2], [1,2]],
        bufferSize: 15000,
      }
      QueryHelper.SubmitQuery("kostas", "nullable_attr", query)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  );
}

function callDemo() {
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

      const query = {
        layout: "row-major",
        ranges: [[23, 24], [0, 18446740473709551615], [0, 18446744073709551614]],
        bufferSize: 1500000,
      }
      QueryHelper.SubmitQuery("TileDB-Inc", "trade_20180730", query)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  );
}


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
      QueryHelper.SubmitQuery("kostas", "quickstart_sparse_string_array", arrayBuffer)
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
    path.resolve(__dirname, "../fixtures/body_char.raw"),
    (__, data) => {
      const arrayBuffer = toArrayBuffer(data);
      const deserializedFromBodyFile = deSerializer.default(arrayBuffer);
      console.log(deserializedFromBodyFile.attributeBufferHeaders);
      const serialized = serializer.default(deserializedFromBodyFile);
      const endResult = deSerializer.default(serialized);
      console.log(endResult.attributeBufferHeaders);
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
    "../fixtures/response_char2.raw",
  ];
  fs.readFile(path.resolve(__dirname, responseFiles[7]), (__, data) => {
    const arrayBuffer = toArrayBuffer(data);
    const result = deSerializer.default(arrayBuffer);
    console.log(result.attributeBufferHeaders);
    // for (let offset = 0; offset < 8; offset++) {
    //   offset = 0;
    //   const end = offset ? -1 * offset : undefined;
    //   const typedArray = new Int8Array(arrayBuffer.slice(-60 - offset, end))
    //   const arr = [...typedArray];
    //   // console.log(arr.length)
    //   console.log(arr.indexOf(0));
    //   console.log(arr.indexOf(3));
    //   console.log(arr.indexOf(4));
    //   console.log(arr.indexOf(5));
    //   console.log('-----');
    //   // 3 ~ 3143 - 3150
    //   // 4 ~ 3151 - 3158
    //   // 5 ~ 3159 - 3166
    // }

    let offset = 0;
    const end = offset ? -1 * offset : undefined;
      const typedArray = new Uint8Array(arrayBuffer.slice(-65, - 33))
      const arr = [...typedArray];
      // console.log(arr.length)
      // console.log(arr);
      // console.log(arr.indexOf(0));
      // console.log(arr.indexOf(3));
      // console.log(arr.indexOf(4));
      // console.log(arr.indexOf(5));
      // console.log('-----');

    // return;
    const attr = [
      {
        "cellValNum": "1",
        "filterPipeline": {},
        "name": "a1",
        "type": "INT32"
      },
      {
        "cellValNum": "4294967295",
        "filterPipeline": {},
        "name": "a2",
        "type": "INT32"
      },
      {
        "cellValNum": "4294967295",
        "filterPipeline": {},
        "name": "a3",
        "type": "STRING_UTF8"
      }
    ];

    console.log(
      getResults(
        arrayBuffer,
        result.attributeBufferHeaders,
        attr
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
