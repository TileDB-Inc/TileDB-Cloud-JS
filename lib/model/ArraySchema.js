"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArraySchema {
    static getAttributeTypeMap() {
        return ArraySchema.attributeTypeMap;
    }
}
ArraySchema.discriminator = undefined;
ArraySchema.attributeTypeMap = [
    {
        "name": "uri",
        "baseName": "uri",
        "type": "string"
    },
    {
        "name": "version",
        "baseName": "version",
        "type": "Array<number>"
    },
    {
        "name": "arrayType",
        "baseName": "arrayType",
        "type": "ArrayType"
    },
    {
        "name": "tileOrder",
        "baseName": "tileOrder",
        "type": "Layout"
    },
    {
        "name": "cellOrder",
        "baseName": "cellOrder",
        "type": "Layout"
    },
    {
        "name": "capacity",
        "baseName": "capacity",
        "type": "number"
    },
    {
        "name": "coordsFilterPipeline",
        "baseName": "coordsFilterPipeline",
        "type": "FilterPipeline"
    },
    {
        "name": "offsetFilterPipeline",
        "baseName": "offsetFilterPipeline",
        "type": "FilterPipeline"
    },
    {
        "name": "domain",
        "baseName": "domain",
        "type": "Domain"
    },
    {
        "name": "attributes",
        "baseName": "attributes",
        "type": "Array<Attribute>"
    }
];
exports.ArraySchema = ArraySchema;
//# sourceMappingURL=arraySchema.js.map