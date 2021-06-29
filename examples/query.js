const deserializer = require("../lib/utils/capnpQueryDeSerializer")
const fs = require("fs");
const path = require("path");



fs.readFile(path.resolve(__dirname, './body.raw'), (err, data) => {
    const arrayBuffer = toArrayBuffer(data);
    const result = deserializer.default(arrayBuffer)
    console.log(result);
  });


function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}