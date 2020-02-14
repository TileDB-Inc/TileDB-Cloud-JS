"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Token {
    static getAttributeTypeMap() {
        return Token.attributeTypeMap;
    }
}
Token.discriminator = undefined;
Token.attributeTypeMap = [
    {
        "name": "token",
        "baseName": "token",
        "type": "string"
    },
    {
        "name": "name",
        "baseName": "name",
        "type": "string"
    },
    {
        "name": "issuedAt",
        "baseName": "issued_at",
        "type": "Date"
    },
    {
        "name": "expiresAt",
        "baseName": "expires_at",
        "type": "Date"
    },
    {
        "name": "scope",
        "baseName": "scope",
        "type": "string"
    }
];
exports.Token = Token;
//# sourceMappingURL=token.js.map