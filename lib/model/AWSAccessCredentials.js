"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AWSAccessCredentials {
    static getAttributeTypeMap() {
        return AWSAccessCredentials.attributeTypeMap;
    }
}
AWSAccessCredentials.discriminator = undefined;
AWSAccessCredentials.attributeTypeMap = [
    {
        "name": "secretAccessKey",
        "baseName": "secret_access_key",
        "type": "string"
    },
    {
        "name": "accessKeyId",
        "baseName": "access_key_id",
        "type": "string"
    },
    {
        "name": "serviceRoleArn",
        "baseName": "service_role_arn",
        "type": "string"
    },
    {
        "name": "name",
        "baseName": "name",
        "type": "string"
    },
    {
        "name": "_default",
        "baseName": "default",
        "type": "boolean"
    },
    {
        "name": "buckets",
        "baseName": "buckets",
        "type": "Array<string>"
    },
    {
        "name": "createdAt",
        "baseName": "created_at",
        "type": "Date"
    },
    {
        "name": "updatedAt",
        "baseName": "updated_at",
        "type": "Date"
    }
];
exports.AWSAccessCredentials = AWSAccessCredentials;
//# sourceMappingURL=aWSAccessCredentials.js.map