"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UDF {
    static getAttributeTypeMap() {
        return UDF.attributeTypeMap;
    }
}
UDF.discriminator = undefined;
UDF.attributeTypeMap = [
    {
        "name": "type",
        "baseName": "type",
        "type": "UDFType"
    },
    {
        "name": "version",
        "baseName": "version",
        "type": "string"
    },
    {
        "name": "imageName",
        "baseName": "image_name",
        "type": "string"
    },
    {
        "name": "subarray",
        "baseName": "subarray",
        "type": "UDFSubarray"
    },
    {
        "name": "exec",
        "baseName": "exec",
        "type": "string"
    },
    {
        "name": "buffers",
        "baseName": "buffers",
        "type": "Array<string>"
    }
];
exports.UDF = UDF;
//# sourceMappingURL=uDF.js.map