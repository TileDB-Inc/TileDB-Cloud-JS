import { Attribute } from "../v1";
import { Datatype, Query, Querystatus, Querytype } from "../v2";

export interface QueryData extends Pick<Query, "layout"> {
  ranges: Array<number[]>;
  bufferSize: number;
}

const dataToQuery = (data: QueryData, attributes: Attribute[]): Query => {
  const { bufferSize } = data;
  //   TODO: Distribute buffer size depending on the data's type (e.g. INT64 needs more bytes than INT8)
  const AVERAGE_BUFFER_SIZE = Math.floor(bufferSize / (attributes.length * 3));
  const ranges = data.ranges.map((range) => {
    const BYTE_LENGTH = Int32Array.BYTES_PER_ELEMENT * range.length;
    return {
      type: Datatype.Int32,
      hasDefaultRange: false,
      buffer: range,
      bufferSizes: [BYTE_LENGTH],
      bufferStartSizes: [0],
    };
  });
  const attributeBufferHeaders = attributes.map((attr) => ({
    name: attr.name,
    fixedLenBufferSizeInBytes: 0,
    varLenBufferSizeInBytes: 0,
    validityLenBufferSizeInBytes: 0,
    originalFixedLenBufferSizeInBytes: AVERAGE_BUFFER_SIZE,
    originalVarLenBufferSizeInBytes: AVERAGE_BUFFER_SIZE,
    originalValidityLenBufferSizeInBytes: AVERAGE_BUFFER_SIZE,
  }));
  return {
    attributeBufferHeaders,
    layout: data.layout,
    status: Querystatus.Uninitialized,
    type: Querytype.Read,
    reader: {
      layout: data.layout,
      subarray: {
        layout: data.layout,
        ranges,
      },
      readState: {
        subarrayPartitioner: {
          subarray: {
            layout: data.layout,
            ranges: [],
          },
          budget: [],
          current: {
            subarray: {
              layout: data.layout,
              ranges: [],
            },
          },
        },
      },
    },
  } as Query;
};

export default dataToQuery;
