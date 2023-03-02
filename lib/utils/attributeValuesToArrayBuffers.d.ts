import { AttributeValues } from "../TileDBQuery/TileDBQuery";
import { Attribute, Dimension } from "../v1";
interface ValueBuffer {
    validityBuffer: ArrayBuffer;
    offsetsBuffer: ArrayBuffer;
    valuesBuffer: ArrayBuffer;
}
export type ValueBuffers = Record<string, ValueBuffer>;
declare const attributeValuesToArrayBuffers: (values: AttributeValues, dimensions: Dimension[], attributes: Attribute[]) => ValueBuffers;
export default attributeValuesToArrayBuffers;
