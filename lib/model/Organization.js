"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Organization {
    static getAttributeTypeMap() {
        return Organization.attributeTypeMap;
    }
}
Organization.discriminator = undefined;
Organization.attributeTypeMap = [
    {
        "name": "id",
        "baseName": "id",
        "type": "string"
    },
    {
        "name": "role",
        "baseName": "role",
        "type": "OrganizationRoles"
    },
    {
        "name": "name",
        "baseName": "name",
        "type": "string"
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
    },
    {
        "name": "logo",
        "baseName": "logo",
        "type": "string"
    },
    {
        "name": "description",
        "baseName": "description",
        "type": "string"
    },
    {
        "name": "users",
        "baseName": "users",
        "type": "Array<OrganizationUser>"
    },
    {
        "name": "allowedActions",
        "baseName": "allowed_actions",
        "type": "Array<NamespaceActions>"
    },
    {
        "name": "numOfArrays",
        "baseName": "num_of_arrays",
        "type": "number"
    },
    {
        "name": "enabledFeatures",
        "baseName": "enabled_features",
        "type": "Array<string>"
    }
];
exports.Organization = Organization;
//# sourceMappingURL=organization.js.map