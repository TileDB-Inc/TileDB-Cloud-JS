"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Query {
    static getAttributeTypeMap() {
        return Query.attributeTypeMap;
    }
}
Query.discriminator = undefined;
Query.attributeTypeMap = [
    {
        "name": "type",
        "baseName": "type",
        "type": "Querytype"
    },
    {
        "name": "layout",
        "baseName": "layout",
        "type": "Layout"
    },
    {
        "name": "status",
        "baseName": "status",
        "type": "Querystatus"
    },
    {
        "name": "attributeBufferHeaders",
        "baseName": "attributeBufferHeaders",
        "type": "Array<AttributeBufferHeader>"
    },
    {
        "name": "writer",
        "baseName": "writer",
        "type": "Writer"
    },
    {
        "name": "reader",
        "baseName": "reader",
        "type": "QueryReader"
    },
    {
        "name": "array",
        "baseName": "array",
        "type": "any"
    },
    {
        "name": "totalFixedLengthBufferBytes",
        "baseName": "totalFixedLengthBufferBytes",
        "type": "number"
    },
    {
        "name": "totalVarLenBufferBytes",
        "baseName": "totalVarLenBufferBytes",
        "type": "number"
    }
];
exports.Query = Query;
//# sourceMappingURL=query.js.map