import { ArraySchema } from '../../v1';
import { Dimension, Attribute } from '../../v2';
import dataToQueryWriter from '../dataToQueryWriter';
import attributeValuesToArrayBuffers from '../attributeValuesToArrayBuffers';
import capnpQuerySerializer from '../serialization/capnpQuerySerializer';
import concatArrayBuffers from '../concatArrayBuffers';
import { QueryWrite } from '../../TileDBQuery';

const emptyArrayBuffer = new ArrayBuffer(0);

const getWriterBody = (data: QueryWrite, arraySchema: ArraySchema) => {
  const dimensions = arraySchema.domain.dimensions as Dimension[];
  const attributes = arraySchema.attributes as Attribute[];
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
