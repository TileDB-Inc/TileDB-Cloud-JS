"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AttributeBufferHeader {
    static getAttributeTypeMap() {
        return AttributeBufferHeader.attributeTypeMap;
    }
}
AttributeBufferHeader.discriminator = undefined;
AttributeBufferHeader.attributeTypeMap = [
    {
        "name": "name",
        "baseName": "name",
        "type": "string"
    },
    {
        "name": "fixedLenBufferSizeInBytes",
        "baseName": "fixedLenBufferSizeInBytes",
        "type": "number"
    },
    {
        "name": "varLenBufferSizeInBytes",
        "baseName": "varLenBufferSizeInBytes",
        "type": "number"
    }
];
exports.AttributeBufferHeader = AttributeBufferHeader;
//# sourceMappingURL=attributeBufferHeader.js.map