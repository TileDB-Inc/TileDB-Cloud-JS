const deserializer = require("../lib/utils/capnpQueryDeSerializer")
const fs = require("fs");
const path = require("path");


fs.readFile(path.resolve(__dirname, '../fixtures/response.raw'), (err, data) => {
    const arrayBuffer = toArrayBuffer(data);
    const result = deserializer.default(arrayBuffer);
    // get last X bytes and cast them to int32
    const resultsBuffer = arrayBuffer.slice(-1 * result.totalFixedLengthBufferBytes);
    resultsBuffer.byteLength;
    let offsetBytes = 0;
    
    const attributeResults = result.attributeBufferHeaders.reduce((cur, attr) => {
        const numOfBytesOfAttr = attr.fixedLenBufferSizeInBytes;
        const offsetBytesWithCurrentDataBytes = offsetBytes + numOfBytesOfAttr;
        const result = new Int32Array(resultsBuffer.slice(offsetBytes, offsetBytesWithCurrentDataBytes));
        offsetBytes = offsetBytesWithCurrentDataBytes;
        cur[attr.name] = result;
        return cur;
    }, {});

    console.log(attributeResults);
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
 * Cell (2, 3) has data 33
 * Cell (2, 4) has data 28
 */


