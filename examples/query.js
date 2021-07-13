const deserializer = require("../lib/utils/capnpQueryDeSerializer")
const fs = require("fs");
const path = require("path");

const utf8decoder = new TextDecoder();

fs.readFile(path.resolve(__dirname, '../fixtures/response_var.raw'), (err, data) => {
    const arrayBuffer = toArrayBuffer(data);
    const result = deserializer.default(arrayBuffer);
    console.log(result);
    const numberOfResultsInBytes = getResultSizeInBytes(result.attributeBufferHeaders);
    // get last X bytes where the results are
    const resultsBuffer = arrayBuffer.slice(-1 * numberOfResultsInBytes);
    
    // getFixedLengthVariables(result.attributeBufferHeaders, resultsBuffer);
    getVarLengthVariables(result.attributeBufferHeaders, resultsBuffer);
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

/** fixtures/response_fixed.raw
 * Cell (2, 3) has data 33
 * Cell (2, 4) has data 28
 */


/** fixtures/response_var.raw
 * a1: bb, a2: 2 2 
 * a1: ccc, a2: 3 
 * a1: dd, a2: 4 
*/

function getVarLengthVariables(attributeBufferHeaders, resultsBuffer) {
    let offsetBytes = 0;
    const attributeResults = attributeBufferHeaders.reduce((cur, attr) => {
        const numOfBytesOfAttr = attr.varLenBufferSizeInBytes;
        const fixOffsetOfAttr = attr.fixedLenBufferSizeInBytes;
        const offsetBytesWithCurrentDataBytes = offsetBytes + numOfBytesOfAttr;
        let res;
        const slicedBuffer = resultsBuffer.slice(offsetBytes, offsetBytes + numOfBytesOfAttr);
        // TODO: Get type of the attribute and return correct result
        if (!offsetBytes) {
            // NOTE: First attribute is number
            res = getInt32TypedArray(slicedBuffer);

        } else {
            // NOTE: Second attribute is string
            res = getStringFromBytes(slicedBuffer);
        }
        offsetBytes = offsetBytesWithCurrentDataBytes + fixOffsetOfAttr;
        cur[attr.name] = res;
        return cur;
    }, {});

    console.log(attributeResults);
}


function getFixedLengthVariables(attributeBufferHeaders, resultsBuffer) {
    let offsetBytes = 0;
    
    const attributeResults = attributeBufferHeaders.reduce((cur, attr) => {
        const numOfBytesOfAttr = attr.fixedLenBufferSizeInBytes;
        const offsetBytesWithCurrentDataBytes = offsetBytes + numOfBytesOfAttr;
        const slicedBuffer = resultsBuffer.slice(offsetBytes, offsetBytesWithCurrentDataBytes);
        const result = getInt32TypedArray(slicedBuffer);
        offsetBytes = offsetBytesWithCurrentDataBytes;
        cur[attr.name] = result;
        return cur;
    }, {});

    console.log(attributeResults);
}


function getInt32TypedArray(slicedBuffer) {
    return new Int32Array(slicedBuffer);
}

function getStringFromBytes(slicedBuffer) {
    const typedUint8Array = new Uint8Array(slicedBuffer);
    const utf8decoder = new TextDecoder();

    return utf8decoder.decode(typedUint8Array)
}


function getResultSizeInBytes(attributeBufferHeaders) {
    return attributeBufferHeaders.reduce((curr, attrHeader, index) => {
        const isLast = index === attributeBufferHeaders.length - 1;
        const isAttrVarLength = isAttributeVarLength(attrHeader);
        const attributeSizeInBytes = isLast && isAttrVarLength ? attrHeader.varLenBufferSizeInBytes : attrHeader.fixedLenBufferSizeInBytes + attrHeader.varLenBufferSizeInBytes;

        return curr + attributeSizeInBytes;
    }, 0)
}


function isAttributeVarLength(attr) {
    return !!attr.varLenBufferSizeInBytes;
}
