"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LastAccessedArray {
    static getAttributeTypeMap() {
        return LastAccessedArray.attributeTypeMap;
    }
}
LastAccessedArray.discriminator = undefined;
LastAccessedArray.attributeTypeMap = [
    {
        "name": "arrayId",
        "baseName": "array_id",
        "type": "string"
    },
    {
        "name": "arrayName",
        "baseName": "array_name",
        "type": "string"
    },
    {
        "name": "namespace",
        "baseName": "namespace",
        "type": "string"
    },
    {
        "name": "accessedTime",
        "baseName": "accessed_time",
        "type": "number"
    },
    {
        "name": "accessType",
        "baseName": "access_type",
        "type": "ActivityEventType"
    }
];
exports.LastAccessedArray = LastAccessedArray;
//# sourceMappingURL=lastAccessedArray.js.map