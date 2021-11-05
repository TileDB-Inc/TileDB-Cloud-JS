import { AttributeBufferHeader } from "../v2";

const MockAttributeBufferHeader = (fixedBuffer: number, varLenBuffer: number, validityBuffer: number, name = 'attr0'): AttributeBufferHeader => ({
    fixedLenBufferSizeInBytes: fixedBuffer,
    name,
    varLenBufferSizeInBytes: varLenBuffer,
    validityLenBufferSizeInBytes: validityBuffer,
    originalFixedLenBufferSizeInBytes: fixedBuffer,
    originalValidityLenBufferSizeInBytes: validityBuffer,
    originalVarLenBufferSizeInBytes: varLenBuffer
})


export default MockAttributeBufferHeader;