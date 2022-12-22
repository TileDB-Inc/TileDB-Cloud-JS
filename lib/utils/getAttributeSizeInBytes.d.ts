import { AttributeBufferHeader } from "../v2";
/**
 * Add all buffers of an attribute
 * @param attr AttributeBufferHeader
 * @returns number of the total bytes of the attribute
 */
declare const getAttributeSizeInBytes: (attr: AttributeBufferHeader) => number;
export default getAttributeSizeInBytes;
