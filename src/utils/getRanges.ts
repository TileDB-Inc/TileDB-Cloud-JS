import rangesToBuffer from "./rangesToBuffer";
import flatten from "./flatten";
import { QueryData } from "../TileDBQuery/TileDBQuery";
import { Dimension } from "../v1";
import getByteLengthOfdata from "./getByteLengthOfData";
import checkRangeOutOfBounds from "./checkRangeOutOfBounds";
import { DomainArray } from "../v2";

/**
 * Checks if data is an array of numbers
 * @param data
 * @returns Boolean if data is an array of numbers
 */
const isNumberArray = (data: any[]): data is number[] => {
  return typeof data[0] === "number";
};

const getRanges = (
  ranges: QueryData["ranges"],
  dimensions: Dimension[],
  hasDefaultRange?: boolean
) => {
  
  return ranges.map((range = [], i) => {
    const [firstRange] = range;
    const dimension = dimensions[i];
    
    const type = dimension.type;
    const isArrayOfArrays = Array.isArray(firstRange);
    const isArrayOfInts = isNumberArray(flatten(range));
    const isEmpty = !range.length;
    const domainKey = type?.toLowerCase() as keyof DomainArray | undefined;
    const bounds = dimension?.domain?.[domainKey];

    if (bounds && !checkRangeOutOfBounds(range, bounds)) {
      throw new Error(`Range ${JSON.stringify(range)} for dimension ${dimension?.name} is out of bounds`);
    }
    
    const bufferSizes = isArrayOfArrays
      ? range.map((r) => getByteLengthOfdata(r, type))
      : [getByteLengthOfdata(range as number[], type)];
    const startRanges = isArrayOfArrays ? range.map((r) => r[0]) : [firstRange];
    const bufferStartSizes = startRanges.map((startingRange) => {
      if (!startingRange) {
        return 0;
      }
      return getByteLengthOfdata([startingRange], type)
    }
    );
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
      hasDefaultRange: isEmpty || !!hasDefaultRange,
      buffer: rangesToBuffer(flatten(range), type),
      bufferSizes,
      bufferStartSizes: isEmpty ? [0] : bufferStartSizes,
    };
  });
};

export default getRanges;
