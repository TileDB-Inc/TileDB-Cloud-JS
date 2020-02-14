"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    static getAttributeTypeMap() {
        return User.attributeTypeMap;
    }
}
User.discriminator = undefined;
User.attributeTypeMap = [
    {
        "name": "id",
        "baseName": "id",
        "type": "string"
    },
    {
        "name": "username",
        "baseName": "username",
        "type": "string"
    },
    {
        "name": "password",
        "baseName": "password",
        "type": "string"
    },
    {
        "name": "name",
        "baseName": "name",
        "type": "string"
    },
    {
        "name": "email",
        "baseName": "email",
        "type": "string"
    },
    {
        "name": "isValidEmail",
        "baseName": "is_valid_email",
        "type": "boolean"
    },
    {
        "name": "logo",
        "baseName": "logo",
        "type": "string"
    },
    {
        "name": "lastActivityDate",
        "baseName": "last_activity_date",
        "type": "Date"
    },
    {
        "name": "timezone",
        "baseName": "timezone",
        "type": "string"
    },
    {
        "name": "organizations",
        "baseName": "organizations",
        "type": "Array<OrganizationUser>"
    },
    {
        "name": "allowedActions",
        "baseName": "allowed_actions",
        "type": "Array<NamespaceActions>"
    },
    {
        "name": "enabledFeatures",
        "baseName": "enabled_features",
        "type": "Array<string>"
    }
];
exports.User = User;
//# sourceMappingURL=user.js.map