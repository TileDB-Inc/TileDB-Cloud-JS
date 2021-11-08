import { AttributeBufferHeader } from "../v2";
/**
 * Calculate the total bytes of all the attributes
 * @param attributes
 * @returns number of the total bytes of all the attributes
 */
declare const getSizeInBytesOfAllAttributes: (attributes: AttributeBufferHeader[]) => number;
export default getSizeInBytesOfAllAttributes;
