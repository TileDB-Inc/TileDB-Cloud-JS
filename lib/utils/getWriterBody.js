"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataToQueryWriter_1 = __importDefault(require("./dataToQueryWriter"));
const attributeValuesToArrayBuffers_1 = __importDefault(require("./attributeValuesToArrayBuffers"));
const capnpQuerySerializer_1 = __importDefault(require("./capnpQuerySerializer"));
const concatArrayBuffers_1 = __importDefault(require("./concatArrayBuffers"));
const emptyArrayBuffer = new ArrayBuffer(0);
const getWriterBody = (data, arraySchema) => {
    const dimensions = arraySchema.domain.dimensions;
    const attributes = arraySchema.attributes;
    const valueBuffers = (0, attributeValuesToArrayBuffers_1.default)(data.values, dimensions, attributes);
    const queryObject = (0, dataToQueryWriter_1.default)(data, dimensions, valueBuffers);
    const querySerialized = (0, capnpQuerySerializer_1.default)(queryObject);
    const attributeBuffersArray = Object.values(valueBuffers).reduce((accum, valueBuffer) => {
        const attributeBuffer = (0, concatArrayBuffers_1.default)(valueBuffer.offsetsBuffer, valueBuffer.valuesBuffer, valueBuffer.validityBuffer);
        return (0, concatArrayBuffers_1.default)(accum, attributeBuffer);
    }, emptyArrayBuffer);
    const body = (0, concatArrayBuffers_1.default)(querySerialized, attributeBuffersArray);
    return body;
};
exports.default = getWriterBody;
//# sourceMappingURL=getWriterBody.js.map