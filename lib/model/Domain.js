"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Domain {
    static getAttributeTypeMap() {
        return Domain.attributeTypeMap;
    }
}
Domain.discriminator = undefined;
Domain.attributeTypeMap = [
    {
        "name": "type",
        "baseName": "type",
        "type": "Datatype"
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
        "name": "dimensions",
        "baseName": "dimensions",
        "type": "Array<Dimension>"
    }
];
exports.Domain = Domain;
//# sourceMappingURL=domain.js.map