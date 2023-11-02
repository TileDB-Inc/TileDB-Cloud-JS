import { ArraySchema } from '../../v1';
import dataToQueryWriter from '../dataToQueryWriter/dataToQueryWriter';
import attributeValuesToArrayBuffers from '../attributeValuesToArrayBuffers/attributeValuesToArrayBuffers';
import capnpQuerySerializer from '../serialization/capnpQuerySerializer';
import concatArrayBuffers from '../concatArrayBuffers/concatArrayBuffers';
import { QueryWrite } from '../../TileDBQuery/TileDBQuery';

const emptyArrayBuffer = new ArrayBuffer(0);

const getWriterBody = (data: QueryWrite, arraySchema: ArraySchema) => {
  const dimensions = arraySchema.domain.dimensions;
  const attributes = arraySchema.attributes;
  const valueBuffers = attributeValuesToArrayBuffers(
    data.values,
    dimensions,
    attributes
  );
  const queryObject = dataToQueryWriter(data, dimensions, valueBuffers);

  const querySerialized = capnpQuerySerializer(queryObject);
  const attributeBuffersArray = Object.values(valueBuffers).reduce(
    (accum, valueBuffer) => {
      const attributeBuffer = concatArrayBuffers(
        valueBuffer.offsetsBuffer,
        valueBuffer.valuesBuffer,
        valueBuffer.validityBuffer
      );

      return concatArrayBuffers(accum, attributeBuffer);
    },
    emptyArrayBuffer
  );
  const body = concatArrayBuffers(querySerialized, attributeBuffersArray);

  return body;
};

export default getWriterBody;
