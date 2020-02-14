"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainArray {
    static getAttributeTypeMap() {
        return DomainArray.attributeTypeMap;
    }
}
DomainArray.discriminator = undefined;
DomainArray.attributeTypeMap = [
    {
        "name": "int8",
        "baseName": "int8",
        "type": "Array<number>"
    },
    {
        "name": "uint8",
        "baseName": "uint8",
        "type": "Array<number>"
    },
    {
        "name": "int16",
        "baseName": "int16",
        "type": "Array<number>"
    },
    {
        "name": "uint16",
        "baseName": "uint16",
        "type": "Array<number>"
    },
    {
        "name": "int32",
        "baseName": "int32",
        "type": "Array<number>"
    },
    {
        "name": "uint32",
        "baseName": "uint32",
        "type": "Array<number>"
    },
    {
        "name": "int64",
        "baseName": "int64",
        "type": "Array<number>"
    },
    {
        "name": "uint64",
        "baseName": "uint64",
        "type": "Array<number>"
    },
    {
        "name": "float32",
        "baseName": "float32",
        "type": "Array<number>"
    },
    {
        "name": "float64",
        "baseName": "float64",
        "type": "Array<number>"
    }
];
exports.DomainArray = DomainArray;
//# sourceMappingURL=domainArray.js.map