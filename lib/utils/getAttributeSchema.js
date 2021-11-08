"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get attribute data from attribute name, attribute data contains the type of the attribute (e.g. INT32, StringUTF8 etc)
 */
const getAttributeSchema = (attrName, attributesSchema) => {
    return attributesSchema.find((attr) => attr.name === attrName);
};
exports.default = getAttributeSchema;
//# sourceMappingURL=getAttributeSchema.js.map