"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NonEmptyDomain {
    static getAttributeTypeMap() {
        return NonEmptyDomain.attributeTypeMap;
    }
}
NonEmptyDomain.discriminator = undefined;
NonEmptyDomain.attributeTypeMap = [
    {
        "name": "nonEmptyDomain",
        "baseName": "nonEmptyDomain",
        "type": "DomainArray"
    },
    {
        "name": "isEmpty",
        "baseName": "isEmpty",
        "type": "boolean"
    }
];
exports.NonEmptyDomain = NonEmptyDomain;
//# sourceMappingURL=nonEmptyDomain.js.map