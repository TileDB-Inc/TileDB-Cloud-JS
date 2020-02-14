"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryReader {
    static getAttributeTypeMap() {
        return QueryReader.attributeTypeMap;
    }
}
QueryReader.discriminator = undefined;
QueryReader.attributeTypeMap = [
    {
        "name": "layout",
        "baseName": "layout",
        "type": "Layout"
    },
    {
        "name": "subarray",
        "baseName": "subarray",
        "type": "Subarray"
    },
    {
        "name": "readState",
        "baseName": "readState",
        "type": "ReadState"
    }
];
exports.QueryReader = QueryReader;
//# sourceMappingURL=queryReader.js.map