"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelError {
    static getAttributeTypeMap() {
        return ModelError.attributeTypeMap;
    }
}
ModelError.discriminator = undefined;
ModelError.attributeTypeMap = [
    {
        "name": "code",
        "baseName": "code",
        "type": "number"
    },
    {
        "name": "message",
        "baseName": "message",
        "type": "string"
    }
];
exports.ModelError = ModelError;
//# sourceMappingURL=modelError.js.map