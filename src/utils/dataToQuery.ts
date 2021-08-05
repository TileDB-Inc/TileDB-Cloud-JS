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

/**
 * Calculate the number of bytes of an array of numbers or strings
 * @param data Array of numbers or strings
 * @param type Datatype (e.g. UINT64, StringUcs2 etc)
 * @returns number of total bytes
 */
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

  if (type === Datatype.StringUtf8) {
    const encoder = new TextEncoder()
    const encodedStr = data.map((str) => encoder.encode(str))
    return encodedStr.reduce((accum, encodedString) => {
      return accum + encodedString.byteLength;
    }, 0);
  }
}

/**
 * Checks if data is an array of numbers
 * @param data 
 * @returns Boolean if data is an array of numbers
 */
const isNumberArray = (data: any[]): data is number[] => {
  return typeof data[0] === 'number';
}

export const getRanges = (ranges: QueryData['ranges'], dimensions: Dimension[], hasDefaultRange?: boolean) => {
  return ranges.map((range, i) => {
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
      // TODO: How do we know "hasDefaultRange" ? Is it related with the domain?
      hasDefaultRange,
      buffer: rangesToBuffer(flatten(range), type),
      bufferSizes,
      bufferStartSizes,
    };
  });
};

/**
 * Helper function that takes user data and returns a Query object.
 * Since the Query object is really big we don't expect user to manually set all the values.
 * We get the essential minimal data needed from the user (such as the layout and ranges) and
 * convert it to a Query object.
 * @param data 
 * @param attributes 
 * @param dimensions 
 * @returns Query object
 */
const dataToQuery = (data: QueryData, attributes: Attribute[], dimensions: Dimension[]): Query => {
  if (!data.layout) {
    return data as any;
  }
  const { bufferSize } = data;
  //   TODO: Distribute buffer size depending on the data's type (e.g. INT64 needs 8 times the bytes of an INT8)
  const AVERAGE_BUFFER_SIZE = Math.floor(bufferSize / (attributes.length * 3));
  const ranges = getRanges(data.ranges, dimensions);
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

