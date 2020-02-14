"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Writer {
    static getAttributeTypeMap() {
        return Writer.attributeTypeMap;
    }
}
Writer.discriminator = undefined;
Writer.attributeTypeMap = [
    {
        "name": "checkCoordDups",
        "baseName": "checkCoordDups",
        "type": "boolean"
    },
    {
        "name": "checkCoordOOB",
        "baseName": "checkCoordOOB",
        "type": "boolean"
    },
    {
        "name": "dedupCoords",
        "baseName": "dedupCoords",
        "type": "boolean"
    },
    {
        "name": "subarray",
        "baseName": "subarray",
        "type": "DomainArray"
    }
];
exports.Writer = Writer;
//# sourceMappingURL=writer.js.map