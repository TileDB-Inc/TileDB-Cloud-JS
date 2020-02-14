"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayTaskLog {
    static getAttributeTypeMap() {
        return ArrayTaskLog.attributeTypeMap;
    }
}
ArrayTaskLog.discriminator = undefined;
ArrayTaskLog.attributeTypeMap = [
    {
        "name": "arrayTaskId",
        "baseName": "array_task_id",
        "type": "string"
    },
    {
        "name": "logs",
        "baseName": "logs",
        "type": "string"
    }
];
exports.ArrayTaskLog = ArrayTaskLog;
//# sourceMappingURL=arrayTaskLog.js.map