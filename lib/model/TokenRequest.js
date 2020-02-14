"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenRequest {
    static getAttributeTypeMap() {
        return TokenRequest.attributeTypeMap;
    }
}
TokenRequest.discriminator = undefined;
TokenRequest.attributeTypeMap = [
    {
        "name": "expires",
        "baseName": "expires",
        "type": "Date"
    },
    {
        "name": "name",
        "baseName": "name",
        "type": "string"
    },
    {
        "name": "scope",
        "baseName": "scope",
        "type": "string"
    }
];
exports.TokenRequest = TokenRequest;
//# sourceMappingURL=tokenRequest.js.map