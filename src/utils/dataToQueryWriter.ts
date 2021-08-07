import { Dimension } from "../v1";
import { ValueBuffers } from "./attributeValuesToArrayBuffers";
import { Querystatus, Querytype } from "../v2";
import getRanges from "./getRanges";
import { QueryWrite } from '../TileDBQuery/TileDBQuery';

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
