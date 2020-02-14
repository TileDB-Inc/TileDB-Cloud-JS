"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubarrayPartitionerCurrent {
    static getAttributeTypeMap() {
        return SubarrayPartitionerCurrent.attributeTypeMap;
    }
}
SubarrayPartitionerCurrent.discriminator = undefined;
SubarrayPartitionerCurrent.attributeTypeMap = [
    {
        "name": "subarray",
        "baseName": "subarray",
        "type": "Subarray"
    },
    {
        "name": "start",
        "baseName": "start",
        "type": "number"
    },
    {
        "name": "end",
        "baseName": "end",
        "type": "number"
    },
    {
        "name": "splitMultiRange",
        "baseName": "splitMultiRange",
        "type": "boolean"
    }
];
exports.SubarrayPartitionerCurrent = SubarrayPartitionerCurrent;
//# sourceMappingURL=subarrayPartitionerCurrent.js.map