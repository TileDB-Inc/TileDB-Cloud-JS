const deserializer = require("../lib/utils/capnpQueryDeSerializer");
const fs = require("fs");
const path = require("path");

fs.readFile(
  path.resolve(__dirname, "../fixtures/response_mixed.raw"),
  (__, data) => {
    const arrayBuffer = toArrayBuffer(data);
    const result = deserializer.default(arrayBuffer);
    console.log(result.attributeBufferHeaders);
    const numberOfResultsInBytes = getResultSizeInBytes(
      result.attributeBufferHeaders
    );
    // get last X bytes where the results are
    const resultsBuffer = arrayBuffer.slice(-1 * numberOfResultsInBytes);

    // getFixedLengthVariables(result.attributeBufferHeaders, resultsBuffer);
    // getVarLengthVariables(result.attributeBufferHeaders, resultsBuffer);
    
    
    console.log(new Int32Array(arrayBuffer.slice(-12))) // a0 (12, 234, 17)   FIXED
    console.log(new BigUint64Array(arrayBuffer.slice(-44, -12))) // a2  [ 20, 311, 27, 82 ]  VAR + 24 bytes tail
    console.log(new Int8Array(arrayBuffer.slice(-71, -68))); // a6 validity buffers
    console.log(new Int32Array(arrayBuffer.slice(-87, -71))) // a6  [ 12 NULL 21 NULL NULL NULL NULL NULL ]  3 BYTES (validityLenBufferSizeInBytes) + VAR + NULLABLE + 24 bytes tail
    console.log(new Int32Array(arrayBuffer.slice(-123, -111))) // a3 (12, 23, 44)  FIXED
    const typedUint8Array = new Uint8Array(arrayBuffer.slice(-131, -123));
    const utf8decoder = new TextDecoder();
    console.log(utf8decoder.decode(typedUint8Array)) // a1 (bbcccddd)    VAR + 24 bytes tail
    console.log(new Int32Array(arrayBuffer.slice(-171, -155))); // a4  [ 2, 19, 27, 81 ]    VAR
    console.log(new Int8Array(arrayBuffer.slice(-198, -195))); // a5  [ 8 NULL 17 NULL ]    FIXED
    console.log(new Int32Array(arrayBuffer.slice(-210, -198))); // a5  [ 8 NULL 17 NULL ]    FIXED
    

    // console.log(new BigInt64Array(arrayBuffer.slice(-96, -72))) // offset of VAR attributes???
  }
);

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


function getVarLengthVariables(attributeBufferHeaders, resultsBuffer) {
  let offsetBytes = 0;
  const attributeResults = attributeBufferHeaders.reduce((cur, attr) => {
    const numOfBytesOfAttr = attr.varLenBufferSizeInBytes;
    const fixOffsetOfAttr = attr.fixedLenBufferSizeInBytes;
    const offsetBytesWithCurrentDataBytes = offsetBytes + numOfBytesOfAttr;
    let res;
    const slicedBuffer = resultsBuffer.slice(
      offsetBytes,
      offsetBytes + numOfBytesOfAttr
    );
    console.log(offsetBytes)
    // TODO: Get type of the attribute and return correct result
    if (!offsetBytes) {
      // NOTE: First attribute is number
      res = getInt32TypedArray(slicedBuffer);
    } else if(offsetBytes === 40) {
      // NOTE: Second attribute is string
      res = getStringFromBytes(slicedBuffer);
    } else {
        res = getInt32TypedArray(slicedBuffer);
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
    const slicedBuffer = resultsBuffer.slice(
      offsetBytes,
      offsetBytesWithCurrentDataBytes
    );
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

  return utf8decoder.decode(typedUint8Array);
}

function getResultSizeInBytes(attributeBufferHeaders) {
  return attributeBufferHeaders.reduce((curr, attrHeader, index) => {
    const isLast = index === attributeBufferHeaders.length - 1;
    const isAttrVarLength = isAttributeVarLength(attrHeader);
    const attributeSizeInBytes =
      isLast && isAttrVarLength
        ? attrHeader.varLenBufferSizeInBytes
        : attrHeader.fixedLenBufferSizeInBytes +
          attrHeader.varLenBufferSizeInBytes;

    return curr + attributeSizeInBytes;
  }, 0);
}

function isAttributeVarLength(attr) {
  return !!attr.varLenBufferSizeInBytes;
}

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
