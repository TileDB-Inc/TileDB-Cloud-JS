"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrganizationUser {
    static getAttributeTypeMap() {
        return OrganizationUser.attributeTypeMap;
    }
}
OrganizationUser.discriminator = undefined;
OrganizationUser.attributeTypeMap = [
    {
        "name": "userId",
        "baseName": "user_id",
        "type": "string"
    },
    {
        "name": "organizationId",
        "baseName": "organization_id",
        "type": "string"
    },
    {
        "name": "username",
        "baseName": "username",
        "type": "string"
    },
    {
        "name": "organizationName",
        "baseName": "organization_name",
        "type": "string"
    },
    {
        "name": "role",
        "baseName": "role",
        "type": "OrganizationRoles"
    },
    {
        "name": "allowedActions",
        "baseName": "allowed_actions",
        "type": "Array<NamespaceActions>"
    }
];
exports.OrganizationUser = OrganizationUser;
//# sourceMappingURL=organizationUser.js.map