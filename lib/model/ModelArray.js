"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelArray {
    static getAttributeTypeMap() {
        return ModelArray.attributeTypeMap;
    }
}
ModelArray.discriminator = undefined;
ModelArray.attributeTypeMap = [
    {
        "name": "timestamp",
        "baseName": "timestamp",
        "type": "number"
    },
    {
        "name": "queryType",
        "baseName": "queryType",
        "type": "Querytype"
    },
    {
        "name": "uri",
        "baseName": "uri",
        "type": "string"
    }
];
exports.ModelArray = ModelArray;
//# sourceMappingURL=modelArray.js.map