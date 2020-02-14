"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginationMetadata {
    static getAttributeTypeMap() {
        return PaginationMetadata.attributeTypeMap;
    }
}
PaginationMetadata.discriminator = undefined;
PaginationMetadata.attributeTypeMap = [
    {
        "name": "page",
        "baseName": "page",
        "type": "number"
    },
    {
        "name": "perPage",
        "baseName": "per_page",
        "type": "number"
    },
    {
        "name": "totalPages",
        "baseName": "total_pages",
        "type": "number"
    },
    {
        "name": "totalItems",
        "baseName": "total_items",
        "type": "number"
    }
];
exports.PaginationMetadata = PaginationMetadata;
//# sourceMappingURL=paginationMetadata.js.map