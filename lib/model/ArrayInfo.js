"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayInfo {
    static getAttributeTypeMap() {
        return ArrayInfo.attributeTypeMap;
    }
}
ArrayInfo.discriminator = undefined;
ArrayInfo.attributeTypeMap = [
    {
        "name": "id",
        "baseName": "id",
        "type": "string"
    },
    {
        "name": "uri",
        "baseName": "uri",
        "type": "string"
    },
    {
        "name": "namespace",
        "baseName": "namespace",
        "type": "string"
    },
    {
        "name": "size",
        "baseName": "size",
        "type": "number"
    },
    {
        "name": "lastAccessed",
        "baseName": "last_accessed",
        "type": "Date"
    },
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
        "name": "allowedActions",
        "baseName": "allowed_actions",
        "type": "Array<ArrayActions>"
    },
    {
        "name": "logo",
        "baseName": "logo",
        "type": "string"
    },
    {
        "name": "accessCredentialsName",
        "baseName": "access_credentials_name",
        "type": "string"
    },
    {
        "name": "type",
        "baseName": "type",
        "type": "string"
    },
    {
        "name": "shareCount",
        "baseName": "share_count",
        "type": "number"
    },
    {
        "name": "publicShare",
        "baseName": "public_share",
        "type": "boolean"
    },
    {
        "name": "tiledbUri",
        "baseName": "tiledb_uri",
        "type": "string"
    }
];
exports.ArrayInfo = ArrayInfo;
//# sourceMappingURL=arrayInfo.js.map