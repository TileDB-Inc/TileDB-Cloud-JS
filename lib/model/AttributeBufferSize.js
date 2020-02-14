"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AttributeBufferSize {
    static getAttributeTypeMap() {
        return AttributeBufferSize.attributeTypeMap;
    }
}
AttributeBufferSize.discriminator = undefined;
AttributeBufferSize.attributeTypeMap = [
    {
        "name": "attribute",
        "baseName": "attribute",
        "type": "string"
    },
    {
        "name": "offsetBytes",
        "baseName": "offsetBytes",
        "type": "number"
    },
    {
        "name": "dataBytes",
        "baseName": "dataBytes",
        "type": "number"
    }
];
exports.AttributeBufferSize = AttributeBufferSize;
//# sourceMappingURL=attributeBufferSize.js.map