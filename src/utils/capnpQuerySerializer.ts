import { Query as QueryType } from "../v2";
import { Query } from "../capnp/query.capnp";
import * as capnp from "capnp-ts";

const capnpQuerySerializer = (data: Partial<QueryType>) => {
  const message = new capnp.Message();
  const queryData = message.initRoot(Query);
  const { reader, array, attributeBufferHeaders = [] } = data;

  queryData.setLayout(data.layout);
    queryData.setStatus(data.status || '');
    queryData.setType(data.type || '');
    queryData.setTotalFixedLengthBufferBytes(capnp.Uint64.fromNumber(data.totalFixedLengthBufferBytes));
    queryData.setTotalVarLenBufferBytes(capnp.Uint64.fromNumber(data.totalVarLenBufferBytes));
    queryData.setTotalValidityBufferBytes(capnp.Uint64.fromNumber(data.totalValidityBufferBytes))
    queryData.setVarOffsetsMode("bytes");
    queryData.setVarOffsetsAddExtraElement(false);
    queryData.setVarOffsetsBitsize(64);
    const attrBuffers = queryData.initAttributeBufferHeaders(attributeBufferHeaders.length);
    attributeBufferHeaders.forEach((attrHeader, i) => {
      const attrBufferHeader = attrBuffers.get(i);
      attrBufferHeader.setName(attrHeader.name);
      attrBufferHeader.setFixedLenBufferSizeInBytes(capnp.Uint64.fromNumber(attrHeader.fixedLenBufferSizeInBytes));
      attrBufferHeader.setValidityLenBufferSizeInBytes(capnp.Uint64.fromNumber(attrHeader.validityLenBufferSizeInBytes));
      attrBufferHeader.setVarLenBufferSizeInBytes(capnp.Uint64.fromNumber(attrHeader.varLenBufferSizeInBytes));
    });

  if (reader) {
    const queryReader = queryData.initReader();
    const subArray = queryReader.initSubarray();
    subArray.setLayout(reader.layout);
    const subArrayRanges = reader.subarray?.ranges || [];
    const numOfRanges = subArrayRanges.length;
    const ranges = subArray.initRanges(numOfRanges);

    subArrayRanges.forEach((subArrayRange, i) => {
      const range = ranges.get(i);
      range.setType(subArrayRange.type);
      range.setHasDefaultRange(subArrayRange.hasDefaultRange);
      const subArrayRangeBufferLength = subArrayRange.buffer.length;
      const bufferData = range.initBuffer(subArrayRangeBufferLength);
      const view = numbersToBuffer(
        subArrayRange.buffer,
        subArrayRangeBufferLength
      );
      bufferData.copyBuffer(view);
      range.setBuffer(bufferData);

      const bufferSizesArray = subArrayRange.bufferSizes || [];
      const bufferSizes = range.initBufferSizes(bufferSizesArray.length)
      bufferSizesArray.forEach((bsize, i) => {
        bufferSizes.set(i, capnp.Uint64.fromNumber(bsize));
      })
      
      range.setBufferSizes(bufferSizes)


      const bufferStartSizesArray = subArrayRange.bufferStartSizes || [];
      const bufferStartSizes = range.initBufferStartSizes(bufferStartSizesArray.length)
      bufferStartSizesArray.forEach((bsize, i) => {
        bufferStartSizes.set(i, capnp.Uint64.fromNumber(bsize));
      })
      
      range.setBufferStartSizes(bufferStartSizes)
    });

    queryReader.setLayout(reader.layout);
  }


  if (array) {
    const queryArray = queryData.initArray();
    queryArray.setEndTimestamp(capnp.Uint64.fromNumber(array.endTimestamp === Infinity ? 1626444398441 : array.endTimestamp));
    queryArray.setStartTimestamp(capnp.Uint64.fromNumber(array.startTimestamp));
    queryArray.setQueryType(array.queryType);
    queryArray.setUri(array.uri);
  }

  return message.toArrayBuffer();
};

export default capnpQuerySerializer;

const numbersToBuffer = (nums: number[], numsLength: number) => {
  const arrBuffer = new ArrayBuffer(numsLength);
  const view = new Uint8Array(arrBuffer);
  nums.forEach((num, i) => {
    view[i] = num;
  });

  return view;
};
