import getAttributeSizeInBytes from './getAttributeSizeInBytes';
import { AttributeBufferHeader } from '../v2';

/**
 * Calculate the total bytes of all the attributes
 * @param attributes
 * @returns number of the total bytes of all the attributes
 */
const getSizeInBytesOfAllAttributes = (attributes: AttributeBufferHeader[]) =>
  attributes.reduce((accum, attr) => accum + getAttributeSizeInBytes(attr), 0);

export default getSizeInBytesOfAllAttributes;
