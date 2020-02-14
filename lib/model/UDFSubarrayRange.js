"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UDFSubarrayRange {
    static getAttributeTypeMap() {
        return UDFSubarrayRange.attributeTypeMap;
    }
}
UDFSubarrayRange.discriminator = undefined;
UDFSubarrayRange.attributeTypeMap = [
    {
        "name": "dimensionId",
        "baseName": "dimension_id",
        "type": "number"
    },
    {
        "name": "rangeStart",
        "baseName": "range_start",
        "type": "DimensionCoordinate"
    },
    {
        "name": "rangeEnd",
        "baseName": "range_end",
        "type": "DimensionCoordinate"
    }
];
exports.UDFSubarrayRange = UDFSubarrayRange;
//# sourceMappingURL=uDFSubarrayRange.js.map