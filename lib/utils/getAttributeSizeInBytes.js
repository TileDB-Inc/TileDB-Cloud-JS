"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Add all buffers of an attribute
 * @param attr AttributeBufferHeader
 * @returns number of the total bytes of the attribute
 */
const getAttributeSizeInBytes = (attr) => {
    return (attr.fixedLenBufferSizeInBytes +
        attr.varLenBufferSizeInBytes +
        attr.validityLenBufferSizeInBytes);
};
exports.default = getAttributeSizeInBytes;
//# sourceMappingURL=getAttributeSizeInBytes.js.map