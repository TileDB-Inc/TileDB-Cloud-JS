import { Dimension } from "../v1";
import { ValueBuffers } from "./attributeValuesToArrayBuffers";
import { Query, Querystatus, Querytype } from "../v2";
import { getRanges } from "./dataToQuery";

interface AttributeValue {
  validity?: number[];
  offsets?: number[];
  values: any[];
}

export type AttributeValues = Record<string, AttributeValue>

export interface QueryWrite extends Pick<Query, "layout"> {
  values: AttributeValues;
}

const dataToQueryWriter = (
  data: QueryWrite,
  dimensions: Dimension[],
  valueBuffer: ValueBuffers
) => {
  const attributeBufferHeaders = Object.entries(valueBuffer).map(
    ([key, val]) => {
      const isVarLength = val.offsetsBuffer.byteLength;

      return {
        name: key,
        fixedLenBufferSizeInBytes:
          val.offsetsBuffer.byteLength || val.valuesBuffer.byteLength,
        varLenBufferSizeInBytes: isVarLength ? val.valuesBuffer.byteLength : 0,
        validityLenBufferSizeInBytes: val.validityBuffer.byteLength,
        originalFixedLenBufferSizeInBytes:
          val.offsetsBuffer.byteLength || val.valuesBuffer.byteLength,
        originalVarLenBufferSizeInBytes: isVarLength
          ? val.valuesBuffer.byteLength
          : 0,
        originalValidityLenBufferSizeInBytes: val.validityBuffer.byteLength,
      };
    }
  );

  const dimensionDomains = dimensions.map((dim) => {
    const [firstValue] = Object.values(dim.domain);
    return firstValue;
  });
  const ranges = getRanges(dimensionDomains, dimensions, true);

  return {
    attributeBufferHeaders,
    layout: data.layout,
    status: Querystatus.Uninitialized,
    type: Querytype.Write,
    writer: {
      checkCoordDups: false,
      checkCoordOOB: false,
      dedupCoords: false,
      subarray: {
        int8: [],
        uint8: [],
        int16: [],
        uint16: [],
        int32: [],
        uint32: [],
        int64: [],
        uint64: [],
        float32: [],
        float64: [],
      },
      subarrayRanges: {
        layout: data.layout,
        ranges,
      },
    },
  };
};

export default dataToQueryWriter;

// const res = {
//   attributeBufferHeaders: [
//     {
//       name: "cols",
//       fixedLenBufferSizeInBytes: 12,
//       varLenBufferSizeInBytes: 0,
//       validityLenBufferSizeInBytes: 0,
//       originalFixedLenBufferSizeInBytes: 12,
//       originalVarLenBufferSizeInBytes: 0,
//       originalValidityLenBufferSizeInBytes: 0,
//     },
//     {
//       name: "rows",
//       fixedLenBufferSizeInBytes: 12,
//       varLenBufferSizeInBytes: 0,
//       validityLenBufferSizeInBytes: 0,
//       originalFixedLenBufferSizeInBytes: 12,
//       originalVarLenBufferSizeInBytes: 0,
//       originalValidityLenBufferSizeInBytes: 0,
//     },
//     {
//       name: "a",
//       fixedLenBufferSizeInBytes: 12,
//       varLenBufferSizeInBytes: 0,
//       validityLenBufferSizeInBytes: 0,
//       originalFixedLenBufferSizeInBytes: 12,
//       originalVarLenBufferSizeInBytes: 0,
//       originalValidityLenBufferSizeInBytes: 0,
//     },
//   ],
//   layout: "unordered",
//   status: "UNINITIALIZED",
//   type: "WRITE",
//   writer: {
//     checkCoordDups: false,
//     checkCoordOOB: false,
//     dedupCoords: false,
//     subarray: {
//       int8: [],
//       uint8: [],
//       int16: [],
//       uint16: [],
//       int32: [],
//       uint32: [],
//       int64: [],
//       uint64: [],
//       float32: [],
//       float64: [],
//     },
//     subarrayRanges: {
//       layout: "unordered",
//       stats: { timers: [], counters: [] },
//       ranges: [
//         {
//           type: "INT32",
//           hasDefaultRange: true,
//           buffer: [1, 0, 0, 0, 4, 0, 0, 0],
//           bufferSizes: [8],
//           bufferStartSizes: [0],
//         },
//         {
//           type: "INT32",
//           hasDefaultRange: true,
//           buffer: [1, 0, 0, 0, 4, 0, 0, 0],
//           bufferSizes: [8],
//           bufferStartSizes: [0],
//         },
//       ],
//     },
//     stats: { timers: [], counters: [] },
//   },
//   reader: {
//     layout: "",
//     subarray: { layout: "", stats: { timers: [], counters: [] }, ranges: [] },
//     readState: {
//       overflowed: false,
//       unsplittable: false,
//       initialized: false,
//       subarrayPartitioner: {
//         subarray: {
//           layout: "",
//           stats: { timers: [], counters: [] },
//           ranges: [],
//         },
//         budget: [],
//         current: {
//           subarray: {
//             layout: "",
//             stats: { timers: [], counters: [] },
//             ranges: [],
//           },
//           start: 0,
//           end: 0,
//           splitMultiRange: false,
//         },
//         state: { start: 0, end: 0, singleRange: [], multiRange: [] },
//         memoryBudget: 0,
//         memoryBudgetVar: 0,
//         memoryBudgetValidity: 0,
//         stats: { timers: [], counters: [] },
//       },
//     },
//     condition: { clauses: [], clauseCombinationOps: [] },
//     stats: { timers: [], counters: [] },
//   },
//   array: {
//     endTimestamp: null,
//     queryType: "",
//     uri: "file:///Users/konstantinossarantopoulos/Development/Go/src/github.com/TileDB-Inc/TileDB-Cloud-JS/fixtures/quickstart_sparse_array",
//     startTimestamp: 0,
//   },
//   totalFixedLengthBufferBytes: 36,
//   totalVarLenBufferBytes: 0,
//   totalValidityBufferBytes: 0,
//   varOffsetsMode: "",
//   varOffsetsAddExtraElement: false,
//   varOffsetsBitsize: 64,
//   config: {
    
//   },
//   stats: { timers: [], counters: [] },
// };
