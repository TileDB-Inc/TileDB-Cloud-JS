import { Attribute, Dimension } from "../v1";
import { Datatype, Query, Querystatus, Querytype } from "../v2";
import flatten from "./flatten";
import getTypedArrayFromDataType from "./getTypedArrayFromDataType";
import rangesToBuffer from "./rangesToBuffer";
import mapToBigIntIfNeeded from "./mapToBigIntIfNeeded";

export interface QueryData extends Pick<Query, "layout"> {
  ranges: Array<number[] | Array<number[]>>;
  bufferSize: number;
}

const getByteLengthOfDataType = (data: number[] | string[], type: Datatype) => { 
  const TypedArray = getTypedArrayFromDataType(type);
  // case 1: it's number of arrays
  if (TypedArray) {
    const nums = mapToBigIntIfNeeded(data as number[], type);
    return (TypedArray as Int32ArrayConstructor).from(nums as number[]).byteLength;
  }
  // otherwise it's string
  if (type === Datatype.Char || Datatype.StringAscii) {
    return data.length * 1;
  }
  if (type === Datatype.StringUcs2) {
    return data.length * 2;
  }
  if (type === Datatype.StringUcs4) {
    return data.length * 4;
  }
  // TODO: get other types
  if (type === Datatype.StringUtf8) {
    const encoder = new TextEncoder()
    const encodedStr = data.map((str) => encoder.encode(str))
    return encodedStr.reduce((accum, encodedString) => {
      return accum + encodedString.byteLength;
    }, 0);
  }
}

const isNumberArray = (data: any[]): data is number[] => {
  return typeof data[0] === 'number';
}


const dataToQuery = (data: QueryData, attributes: Attribute[], dimensions: Dimension[]): Query => {
  if (!data.layout) {
    return data as any;
  }
  const { bufferSize } = data;
  //   TODO: Distribute buffer size depending on the data's type (e.g. INT64 needs 8 times the bytes of an INT8)
  const AVERAGE_BUFFER_SIZE = Math.floor(bufferSize / (attributes.length * 3));
  const ranges = data.ranges.map((range, i) => {
    const [firstRange] = range;
    const type = dimensions[i].type;
    const isArrayOfArrays = Array.isArray(firstRange);
    const isArrayOfInts = isNumberArray(flatten(range));
    
    const bufferSizes = isArrayOfArrays
    ? range.map((r) => getByteLengthOfDataType(r, type))
    : [getByteLengthOfDataType(range as number[], type)];
    
    const startRanges = isArrayOfArrays ? range.map(r => r[0]) : [firstRange];
    const bufferStartSizes = startRanges.map((startingRange) => getByteLengthOfDataType([startingRange], type));
    /**
     * bufferStartSizes is used only for var length string ascii dimensions,
     * for ints is 0
     */
    if (isArrayOfInts) {
      bufferStartSizes.fill(0);
    }
    
    return {
      type,
      hasDefaultRange: false,
      buffer: rangesToBuffer(flatten(range), type),
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

