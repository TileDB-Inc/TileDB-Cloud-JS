import { Query as QueryType } from "../v2";
import { Query } from "../capnp/query.capnp";
import * as capnp from "capnp-ts";

const capnpQuerySerializer = (data: Partial<QueryType>) => {
  const message = new capnp.Message();
  const queryData = message.initRoot(Query);
  const { reader } = data;

  queryData.setLayout(data.layout);
  //   queryData.setStatus(data.status);
  //   queryData.setType(data.type);
  //   queryData.setTotalFixedLengthBufferBytes(data.totalFixedLengthBufferBytes);

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
    });

    queryReader.setLayout(reader.layout);
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
