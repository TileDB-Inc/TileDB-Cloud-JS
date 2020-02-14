"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Attribute {
    static getAttributeTypeMap() {
        return Attribute.attributeTypeMap;
    }
}
Attribute.discriminator = undefined;
Attribute.attributeTypeMap = [
    {
        "name": "name",
        "baseName": "name",
        "type": "string"
    },
    {
        "name": "type",
        "baseName": "type",
        "type": "Datatype"
    },
    {
        "name": "filterPipeline",
        "baseName": "filterPipeline",
        "type": "FilterPipeline"
    },
    {
        "name": "cellValNum",
        "baseName": "cellValNum",
        "type": "number"
    }
];
exports.Attribute = Attribute;
//# sourceMappingURL=attribute.js.map