import { AttributeValues } from "../TileDBQuery/TileDBQuery";
import { Attribute, Dimension } from "../v2";
interface ValueBuffer {
    validityBuffer: ArrayBuffer;
    offsetsBuffer: ArrayBuffer;
    valuesBuffer: ArrayBuffer;
}
export type ValueBuffers = Record<string, ValueBuffer>;
declare const attributeValuesToArrayBuffers: (values: AttributeValues, dimensions: Dimension[], attributes: Attribute[]) => ValueBuffers;
export default attributeValuesToArrayBuffers;
