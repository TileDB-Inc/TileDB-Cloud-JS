"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArraySharing {
    static getAttributeTypeMap() {
        return ArraySharing.attributeTypeMap;
    }
}
ArraySharing.discriminator = undefined;
ArraySharing.attributeTypeMap = [
    {
        "name": "actions",
        "baseName": "actions",
        "type": "Array<ArrayActions>"
    },
    {
        "name": "namespace",
        "baseName": "namespace",
        "type": "string"
    },
    {
        "name": "namespaceType",
        "baseName": "namespace_type",
        "type": "string"
    }
];
exports.ArraySharing = ArraySharing;
//# sourceMappingURL=arraySharing.js.map