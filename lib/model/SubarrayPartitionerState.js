"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubarrayPartitionerState {
    static getAttributeTypeMap() {
        return SubarrayPartitionerState.attributeTypeMap;
    }
}
SubarrayPartitionerState.discriminator = undefined;
SubarrayPartitionerState.attributeTypeMap = [
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
        "name": "singleRange",
        "baseName": "singleRange",
        "type": "Array<Subarray>"
    },
    {
        "name": "multiRange",
        "baseName": "multiRange",
        "type": "Array<Subarray>"
    }
];
exports.SubarrayPartitionerState = SubarrayPartitionerState;
//# sourceMappingURL=subarrayPartitionerState.js.map