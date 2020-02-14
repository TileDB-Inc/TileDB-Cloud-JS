"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubarrayPartitioner {
    static getAttributeTypeMap() {
        return SubarrayPartitioner.attributeTypeMap;
    }
}
SubarrayPartitioner.discriminator = undefined;
SubarrayPartitioner.attributeTypeMap = [
    {
        "name": "subarray",
        "baseName": "subarray",
        "type": "Subarray"
    },
    {
        "name": "budget",
        "baseName": "budget",
        "type": "Array<AttributeBufferSize>"
    },
    {
        "name": "current",
        "baseName": "current",
        "type": "SubarrayPartitionerCurrent"
    },
    {
        "name": "state",
        "baseName": "state",
        "type": "SubarrayPartitionerState"
    },
    {
        "name": "memoryBudget",
        "baseName": "memoryBudget",
        "type": "number"
    },
    {
        "name": "memoryBudgetVar",
        "baseName": "memoryBudgetVar",
        "type": "number"
    }
];
exports.SubarrayPartitioner = SubarrayPartitioner;
//# sourceMappingURL=subarrayPartitioner.js.map