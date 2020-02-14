"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayTaskBrowserSidebar {
    static getAttributeTypeMap() {
        return ArrayTaskBrowserSidebar.attributeTypeMap;
    }
}
ArrayTaskBrowserSidebar.discriminator = undefined;
ArrayTaskBrowserSidebar.attributeTypeMap = [
    {
        "name": "organizations",
        "baseName": "organizations",
        "type": "Array<string>"
    },
    {
        "name": "resultCountForAll",
        "baseName": "result_count_for_all",
        "type": "number"
    },
    {
        "name": "resultCountByNamespace",
        "baseName": "result_count_by_namespace",
        "type": "object"
    }
];
exports.ArrayTaskBrowserSidebar = ArrayTaskBrowserSidebar;
//# sourceMappingURL=arrayTaskBrowserSidebar.js.map