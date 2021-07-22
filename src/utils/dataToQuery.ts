import { Attribute } from "../v1";
import { Datatype, Query, Querystatus, Querytype } from "../v2";
import flatten from "./flatten";

export interface QueryData extends Pick<Query, "layout"> {
  ranges: Array<number[] | Array<number[]>>;
  bufferSize: number;
}

const getByteLengthOfInt32Array = (nums: number[]) =>
  Int32Array.from(nums).byteLength;

const int32ArrayToUint8 = (nums: number[]) => {
  const BYTES_FOR_INT32 = Int32Array.BYTES_PER_ELEMENT;
  const int8NumsArray = new Array(nums.length * BYTES_FOR_INT32).fill(0);
  nums.forEach((num, i) => {
    int8NumsArray[i * BYTES_FOR_INT32] = num;
  });

  return int8NumsArray;
};

const dataToQuery = (data: QueryData, attributes: Attribute[]): Query => {
  if (!data.layout) {
    return data as any;
  }
  const { bufferSize } = data;
  //   TODO: Distribute buffer size depending on the data's type (e.g. INT64 needs more bytes than INT8)
  const AVERAGE_BUFFER_SIZE = Math.floor(bufferSize / (attributes.length * 3));
  const ranges = data.ranges.map((range) => {
    const [firstRange] = range;
    const isArrayOfArrays = Array.isArray(firstRange);

    const bufferSizes = isArrayOfArrays
      ? range.map((r) => getByteLengthOfInt32Array(r))
      : [getByteLengthOfInt32Array(range as number[])];
    const bufferStartSizes = isArrayOfArrays ? range.map(() => 0) : [0];

    return {
      type: Datatype.Int32,
      hasDefaultRange: false,
      buffer: int32ArrayToUint8(flatten(range)),
      bufferSizes,
      bufferStartSizes,
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
