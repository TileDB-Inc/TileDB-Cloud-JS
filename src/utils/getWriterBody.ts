import dataToQueryWriter from "./dataToQueryWriter";
import attributeValuesToArrayBuffers from "./attributeValuesToArrayBuffers";
import capnpQuerySerializer from "./serialization/capnpQuerySerializer";
import concatArrayBuffers from "./concatArrayBuffers";
import { QueryWrite } from "../TileDBQuery/TileDBQuery";
import { ArrayData, ArraySchema } from "../v2";

const emptyArrayBuffer = new ArrayBuffer(0);

const getWriterBody = (data: QueryWrite, arrayStruct: ArrayData) => {
  const arraySchema = arrayStruct.arraySchemaLatest as ArraySchema;
  const dimensions = arraySchema.domain.dimensions;
  const attributes = arraySchema.attributes;
  const valueBuffers = attributeValuesToArrayBuffers(
    data.values,
    dimensions,
    attributes
  );
  const queryObject = dataToQueryWriter(data, dimensions, arrayStruct, valueBuffers);

  const querySerialized = capnpQuerySerializer(queryObject);
  const attributeBuffersArray = Object.values(valueBuffers).reduce(
    (accum, valueBuffer) => {
      const attributeBuffer = concatArrayBuffers(
        valueBuffer.offsetsBuffer,
        valueBuffer.valuesBuffer,
        valueBuffer.validityBuffer,
      );

      return concatArrayBuffers(accum, attributeBuffer);
    },
    emptyArrayBuffer
  );
  const body = concatArrayBuffers(querySerialized, attributeBuffersArray);

  return body;
};

export default getWriterBody;
