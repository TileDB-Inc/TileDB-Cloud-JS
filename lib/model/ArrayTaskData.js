"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayTaskData {
    static getAttributeTypeMap() {
        return ArrayTaskData.attributeTypeMap;
    }
}
ArrayTaskData.discriminator = undefined;
ArrayTaskData.attributeTypeMap = [
    {
        "name": "arrayTasks",
        "baseName": "array_tasks",
        "type": "Array<ArrayTask>"
    },
    {
        "name": "paginationMetadata",
        "baseName": "pagination_metadata",
        "type": "PaginationMetadata"
    }
];
exports.ArrayTaskData = ArrayTaskData;
//# sourceMappingURL=arrayTaskData.js.map