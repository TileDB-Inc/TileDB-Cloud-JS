"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayMetadataEntry {
    static getAttributeTypeMap() {
        return ArrayMetadataEntry.attributeTypeMap;
    }
}
ArrayMetadataEntry.discriminator = undefined;
ArrayMetadataEntry.attributeTypeMap = [
    {
        "name": "key",
        "baseName": "key",
        "type": "string"
    },
    {
        "name": "type",
        "baseName": "type",
        "type": "string"
    },
    {
        "name": "valueNum",
        "baseName": "value_num",
        "type": "number"
    },
    {
        "name": "value",
        "baseName": "value",
        "type": "Array<number>"
    },
    {
        "name": "del",
        "baseName": "del",
        "type": "boolean"
    }
];
exports.ArrayMetadataEntry = ArrayMetadataEntry;
//# sourceMappingURL=arrayMetadataEntry.js.map