"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataToArrayBuffer_1 = __importDefault(require("./dataToArrayBuffer"));
const v2_1 = require("../v2");
const attributeValuesToArrayBuffers = (values, dimensions, attributes) => {
    const data = {};
    const dimensionsAndAttributes = [...dimensions, ...attributes];
    for (let [key, attribute] of Object.entries(values)) {
        const selectedSchema = dimensionsAndAttributes.find((attr) => attr.name === key);
        const { type } = selectedSchema;
        const { validity = [], offsets = [], values = [] } = attribute;
        data[key] = {
            offsetsBuffer: dataToArrayBuffer_1.default(offsets, v2_1.Datatype.Uint64),
            valuesBuffer: dataToArrayBuffer_1.default(values, type),
            validityBuffer: dataToArrayBuffer_1.default(validity, v2_1.Datatype.Uint8),
        };
    }
    return data;
};
exports.default = attributeValuesToArrayBuffers;
//# sourceMappingURL=attributeValuesToArrayBuffers.js.map