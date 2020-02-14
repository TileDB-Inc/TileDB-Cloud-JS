"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayActivityLog {
    static getAttributeTypeMap() {
        return ArrayActivityLog.attributeTypeMap;
    }
}
ArrayActivityLog.discriminator = undefined;
ArrayActivityLog.attributeTypeMap = [
    {
        "name": "eventAt",
        "baseName": "event_at",
        "type": "Date"
    },
    {
        "name": "action",
        "baseName": "action",
        "type": "ActivityEventType"
    },
    {
        "name": "username",
        "baseName": "username",
        "type": "string"
    },
    {
        "name": "bytesSent",
        "baseName": "bytes_sent",
        "type": "number"
    },
    {
        "name": "bytesReceived",
        "baseName": "bytes_received",
        "type": "number"
    },
    {
        "name": "arrayTaskId",
        "baseName": "array_task_id",
        "type": "string"
    },
    {
        "name": "queryRanges",
        "baseName": "query_ranges",
        "type": "string"
    }
];
exports.ArrayActivityLog = ArrayActivityLog;
//# sourceMappingURL=arrayActivityLog.js.map