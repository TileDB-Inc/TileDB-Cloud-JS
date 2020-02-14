"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UDFSubarray {
    static getAttributeTypeMap() {
        return UDFSubarray.attributeTypeMap;
    }
}
UDFSubarray.discriminator = undefined;
UDFSubarray.attributeTypeMap = [
    {
        "name": "layout",
        "baseName": "layout",
        "type": "Layout"
    },
    {
        "name": "ranges",
        "baseName": "ranges",
        "type": "Array<UDFSubarrayRange>"
    }
];
exports.UDFSubarray = UDFSubarray;
//# sourceMappingURL=uDFSubarray.js.map