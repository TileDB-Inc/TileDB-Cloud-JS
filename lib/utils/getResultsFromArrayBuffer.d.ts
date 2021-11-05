import { Attribute, Dimension } from "../v1";
import { AttributeBufferHeader } from '../v2';
/**
 * Convert an ArrayBuffer to a map of attributes with their results
 * @param arrayBuffer The slice ArrayBuffer that contains the results
 * @param attributes
 * @param attributesSchema
 * @returns A map of attribute names with the results of every attribute
 */
export declare const getResultsFromArrayBuffer: (arrayBuffer: ArrayBuffer, attributes: AttributeBufferHeader[], attributesSchema: Array<Dimension | Attribute>) => {};
export default getResultsFromArrayBuffer;
