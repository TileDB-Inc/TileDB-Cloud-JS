"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayInfoUpdate {
    static getAttributeTypeMap() {
        return ArrayInfoUpdate.attributeTypeMap;
    }
}
ArrayInfoUpdate.discriminator = undefined;
ArrayInfoUpdate.attributeTypeMap = [
    {
        "name": "description",
        "baseName": "description",
        "type": "string"
    },
    {
        "name": "name",
        "baseName": "name",
        "type": "string"
    },
    {
        "name": "uri",
        "baseName": "uri",
        "type": "string"
    },
    {
        "name": "accessCredentialsName",
        "baseName": "access_credentials_name",
        "type": "string"
    }
];
exports.ArrayInfoUpdate = ArrayInfoUpdate;
//# sourceMappingURL=arrayInfoUpdate.js.map