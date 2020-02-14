"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DimensionCoordinate {
    static getAttributeTypeMap() {
        return DimensionCoordinate.attributeTypeMap;
    }
}
DimensionCoordinate.discriminator = undefined;
DimensionCoordinate.attributeTypeMap = [
    {
        "name": "int8",
        "baseName": "int8",
        "type": "number"
    },
    {
        "name": "uint8",
        "baseName": "uint8",
        "type": "number"
    },
    {
        "name": "int16",
        "baseName": "int16",
        "type": "number"
    },
    {
        "name": "uint16",
        "baseName": "uint16",
        "type": "number"
    },
    {
        "name": "int32",
        "baseName": "int32",
        "type": "number"
    },
    {
        "name": "uint32",
        "baseName": "uint32",
        "type": "number"
    },
    {
        "name": "int64",
        "baseName": "int64",
        "type": "number"
    },
    {
        "name": "uint64",
        "baseName": "uint64",
        "type": "number"
    },
    {
        "name": "float32",
        "baseName": "float32",
        "type": "number"
    },
    {
        "name": "float64",
        "baseName": "float64",
        "type": "number"
    }
];
exports.DimensionCoordinate = DimensionCoordinate;
//# sourceMappingURL=dimensionCoordinate.js.map