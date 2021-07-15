import { Query as QueryType, Subarray as SubarrayType } from "../v2";
import { Query, Subarray } from "../capnp/query.capnp";
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
    const subArrayCap = queryReader.initSubarray();
    const {subarray: subarrayData = {}} = reader;
    serializeSubArray(subArrayCap, subarrayData);

    queryReader.setLayout(reader.layout);

    const {readState = {}} = reader;
    const readStateData = queryReader.initReadState();

    readStateData.setOverflowed(readState.overflowed);
    readStateData.setUnsplittable(readState.unsplittable);
    readStateData.setInitialized(readState.initialized);

    const {subarrayPartitioner = {}} = readState;
    const {budget = [], subarray, current = {}} = subarrayPartitioner;
    const subPartitioner = readStateData.initSubarrayPartitioner();
    const budgetData = subPartitioner.initBudget(budget.length);

    budget.forEach((b, i) => {
      const singleBudget = budgetData.get(i);
      singleBudget.setAttribute(b.attribute);
    });

    const subArrayData = subPartitioner.initSubarray();
    serializeSubArray(subArrayData, subarray);

    // Current
    const currentData = subPartitioner.initCurrent();
    currentData.setSplitMultiRange(current.splitMultiRange);
    currentData.setStart(capnp.Uint64.fromNumber(current.start || 0))
    currentData.setEnd(capnp.Uint64.fromNumber(current.end || 0))
    const currentSubarray = currentData.initSubarray();
    serializeSubArray(currentSubarray, current.subarray || {});
  }


  if (array) {
    const queryArray = queryData.initArray();
    queryArray.setEndTimestamp(capnp.Uint64.fromNumber(array.endTimestamp));
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

const serializeSubArray = (capSubArray: Subarray, subArray: SubarrayType) => {
  const {ranges = []} = subArray;
  capSubArray.setLayout(subArray.layout);
  const capRanges = capSubArray.initRanges(ranges.length);

  ranges.forEach((range, i) => {
    const r = capRanges.get(i);
    r.setType(range.type);
    r.setHasDefaultRange(range.hasDefaultRange);

    const subArrayRangeBufferLength = range.buffer.length;
      const bufferData = r.initBuffer(subArrayRangeBufferLength);
      const view = numbersToBuffer(
        range.buffer,
        subArrayRangeBufferLength
      );
      bufferData.copyBuffer(view);
      r.setBuffer(bufferData);

      const bufferSizesArray = range.bufferSizes || [];
      const bufferSizes = r.initBufferSizes(bufferSizesArray.length);
      bufferSizesArray.forEach((bsize, i) => {
        bufferSizes.set(i, capnp.Uint64.fromNumber(bsize));
      });
      
      r.setBufferSizes(bufferSizes);


      const bufferStartSizesArray = range.bufferStartSizes || [];
      const bufferStartSizes = r.initBufferStartSizes(bufferStartSizesArray.length)
      bufferStartSizesArray.forEach((bsize, i) => {
        bufferStartSizes.set(i, capnp.Uint64.fromNumber(bsize));
      });
      
      r.setBufferStartSizes(bufferStartSizes)
  })
}