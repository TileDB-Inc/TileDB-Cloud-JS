"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Subarray {
    static getAttributeTypeMap() {
        return Subarray.attributeTypeMap;
    }
}
Subarray.discriminator = undefined;
Subarray.attributeTypeMap = [
    {
        "name": "layout",
        "baseName": "layout",
        "type": "Layout"
    },
    {
        "name": "ranges",
        "baseName": "ranges",
        "type": "Array<SubarrayRanges>"
    }
];
exports.Subarray = Subarray;
//# sourceMappingURL=subarray.js.map