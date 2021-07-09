const deserializer = require("../lib/utils/capnpQueryDeSerializer")
const fs = require("fs");
const path = require("path");



fs.readFile(path.resolve(__dirname, '../fixtures/response.raw'), (err, data) => {
    const arrayBuffer = toArrayBuffer(data);
    console.log(arrayBuffer.byteLength); // 1224
    const result = deserializer.default(arrayBuffer);
    // get last 36 bytes and cast them to int32
    const resultsBuffer = arrayBuffer.slice(-36);
    const nums = new Int32Array(resultsBuffer);
    console.log(nums);
    // console.log(result);
  });


/**
 * Transform node buffer to ArrayBuffer
 */
function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

/** fixtures/response.raw
 * Cell (2, 3) has data 3
 * Cell (2, 4) has data 2
 */


