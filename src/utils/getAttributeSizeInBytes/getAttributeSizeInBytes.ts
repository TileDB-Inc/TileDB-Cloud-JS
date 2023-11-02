import { AttributeBufferHeader } from '../../v2';

/**
 * Add all buffers of an attribute
 * @param attr AttributeBufferHeader
 * @returns number of the total bytes of the attribute
 */
const getAttributeSizeInBytes = (attr: AttributeBufferHeader) => {
  return (
    attr.fixedLenBufferSizeInBytes +
    attr.varLenBufferSizeInBytes +
    attr.validityLenBufferSizeInBytes
  );
};

export default getAttributeSizeInBytes;
