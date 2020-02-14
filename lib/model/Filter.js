"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Filter {
    static getAttributeTypeMap() {
        return Filter.attributeTypeMap;
    }
}
Filter.discriminator = undefined;
Filter.attributeTypeMap = [
    {
        "name": "type",
        "baseName": "type",
        "type": "FilterType"
    },
    {
        "name": "data",
        "baseName": "data",
        "type": "FilterData"
    }
];
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map