"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReadState {
    static getAttributeTypeMap() {
        return ReadState.attributeTypeMap;
    }
}
ReadState.discriminator = undefined;
ReadState.attributeTypeMap = [
    {
        "name": "initialized",
        "baseName": "initialized",
        "type": "boolean"
    },
    {
        "name": "overflowed",
        "baseName": "overflowed",
        "type": "boolean"
    },
    {
        "name": "unsplittable",
        "baseName": "unsplittable",
        "type": "boolean"
    },
    {
        "name": "subarrayPartitioner",
        "baseName": "subarrayPartitioner",
        "type": "SubarrayPartitioner"
    }
];
exports.ReadState = ReadState;
//# sourceMappingURL=readState.js.map