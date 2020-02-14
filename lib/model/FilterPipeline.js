"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FilterPipeline {
    static getAttributeTypeMap() {
        return FilterPipeline.attributeTypeMap;
    }
}
FilterPipeline.discriminator = undefined;
FilterPipeline.attributeTypeMap = [
    {
        "name": "filters",
        "baseName": "filters",
        "type": "Array<Filter>"
    }
];
exports.FilterPipeline = FilterPipeline;
//# sourceMappingURL=filterPipeline.js.map