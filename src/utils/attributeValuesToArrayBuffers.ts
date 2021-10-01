import { AttributeValues } from "../TileDBQuery/TileDBQuery";
import { Attribute, Dimension } from "../v1";
import dataToArrayBuffer from "./dataToArrayBuffer";
import { Datatype } from "../v2";
import mapToBigIntIfNeeded from "./mapToBigIntIfNeeded";

interface ValueBuffer {
  validityBuffer: ArrayBuffer;
  offsetsBuffer: ArrayBuffer;
  valuesBuffer: ArrayBuffer;
}

export type ValueBuffers = Record<string, ValueBuffer>;

const attributeValuesToArrayBuffers = (
  values: AttributeValues,
  dimensions: Dimension[],
  attributes: Attribute[]
): ValueBuffers => {
  const data = {};
  const dimensionsAndAttributes = [...dimensions, ...attributes];

  for (let [attrName, attribute] of Object.entries(values)) {
    const selectedSchema = dimensionsAndAttributes.find(
      (attr) => attr.name === attrName
    );
    const { type } = selectedSchema;
    const { validity = [], offsets = [], values = [] } = attribute;
    
    data[attrName] = {
      offsetsBuffer: dataToArrayBuffer(mapToBigIntIfNeeded(offsets, Datatype.Uint64), Datatype.Uint64),
      valuesBuffer: dataToArrayBuffer(mapToBigIntIfNeeded(values, type), type),
      validityBuffer: dataToArrayBuffer(validity, Datatype.Uint8),
    };
  }
  
  return data;
};

export default attributeValuesToArrayBuffers;
