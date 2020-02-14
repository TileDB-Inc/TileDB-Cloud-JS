"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayTask {
    static getAttributeTypeMap() {
        return ArrayTask.attributeTypeMap;
    }
}
ArrayTask.discriminator = undefined;
ArrayTask.attributeTypeMap = [
    {
        "name": "id",
        "baseName": "id",
        "type": "string"
    },
    {
        "name": "name",
        "baseName": "name",
        "type": "string"
    },
    {
        "name": "description",
        "baseName": "description",
        "type": "string"
    },
    {
        "name": "arrayMetadata",
        "baseName": "array_metadata",
        "type": "ArrayInfo"
    },
    {
        "name": "subarray",
        "baseName": "subarray",
        "type": "DomainArray"
    },
    {
        "name": "memory",
        "baseName": "memory",
        "type": "number"
    },
    {
        "name": "cpu",
        "baseName": "cpu",
        "type": "number"
    },
    {
        "name": "namespace",
        "baseName": "namespace",
        "type": "string"
    },
    {
        "name": "status",
        "baseName": "status",
        "type": "ArrayTaskStatus"
    },
    {
        "name": "startTime",
        "baseName": "start_time",
        "type": "Date"
    },
    {
        "name": "finishTime",
        "baseName": "finish_time",
        "type": "Date"
    },
    {
        "name": "cost",
        "baseName": "cost",
        "type": "number"
    },
    {
        "name": "queryType",
        "baseName": "query_type",
        "type": "Querytype"
    },
    {
        "name": "udfCode",
        "baseName": "udf_code",
        "type": "string"
    },
    {
        "name": "udfLanguage",
        "baseName": "udf_language",
        "type": "string"
    },
    {
        "name": "sqlQuery",
        "baseName": "sql_query",
        "type": "string"
    },
    {
        "name": "type",
        "baseName": "type",
        "type": "ArrayTaskType"
    },
    {
        "name": "activity",
        "baseName": "activity",
        "type": "Array<ArrayActivityLog>"
    },
    {
        "name": "logs",
        "baseName": "logs",
        "type": "string"
    }
];
exports.ArrayTask = ArrayTask;
//# sourceMappingURL=arrayTask.js.map