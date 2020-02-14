"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayMetadata {
    static getAttributeTypeMap() {
        return ArrayMetadata.attributeTypeMap;
    }
}
ArrayMetadata.discriminator = undefined;
ArrayMetadata.attributeTypeMap = [
    {
        "name": "ranges",
        "baseName": "ranges",
        "type": "Array<ArrayMetadataEntry>"
    }
];
exports.ArrayMetadata = ArrayMetadata;
//# sourceMappingURL=arrayMetadata.js.map