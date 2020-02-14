"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dimension {
    static getAttributeTypeMap() {
        return Dimension.attributeTypeMap;
    }
}
Dimension.discriminator = undefined;
Dimension.attributeTypeMap = [
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
        "name": "domain",
        "baseName": "domain",
        "type": "DomainArray"
    },
    {
        "name": "nullTileExtent",
        "baseName": "nullTileExtent",
        "type": "boolean"
    },
    {
        "name": "tileExtent",
        "baseName": "tileExtent",
        "type": "DimensionTileExtent"
    }
];
exports.Dimension = Dimension;
//# sourceMappingURL=dimension.js.map