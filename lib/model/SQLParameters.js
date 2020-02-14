"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SQLParameters {
    static getAttributeTypeMap() {
        return SQLParameters.attributeTypeMap;
    }
}
SQLParameters.discriminator = undefined;
SQLParameters.attributeTypeMap = [
    {
        "name": "name",
        "baseName": "name",
        "type": "string"
    },
    {
        "name": "query",
        "baseName": "query",
        "type": "string"
    },
    {
        "name": "outputUri",
        "baseName": "output_uri",
        "type": "string"
    }
];
exports.SQLParameters = SQLParameters;
//# sourceMappingURL=sQLParameters.js.map