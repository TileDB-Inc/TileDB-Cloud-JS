"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubarrayRanges {
    static getAttributeTypeMap() {
        return SubarrayRanges.attributeTypeMap;
    }
}
SubarrayRanges.discriminator = undefined;
SubarrayRanges.attributeTypeMap = [
    {
        "name": "type",
        "baseName": "type",
        "type": "Datatype"
    },
    {
        "name": "hasDefaultRange",
        "baseName": "hasDefaultRange",
        "type": "boolean"
    },
    {
        "name": "buffer",
        "baseName": "buffer",
        "type": "Array<number>"
    }
];
exports.SubarrayRanges = SubarrayRanges;
//# sourceMappingURL=subarrayRanges.js.map