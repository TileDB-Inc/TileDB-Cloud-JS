"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataToQueryWriter_1 = __importDefault(require("./dataToQueryWriter"));
const attributeValuesToArrayBuffers_1 = __importDefault(require("./attributeValuesToArrayBuffers"));
const capnpQuerySerializer_1 = __importDefault(require("./serialization/capnpQuerySerializer"));
const concatArrayBuffers_1 = __importDefault(require("./concatArrayBuffers"));
const emptyArrayBuffer = new ArrayBuffer(0);
const getWriterBody = (data, arraySchema) => {
    const dimensions = arraySchema.domain.dimensions;
    const attributes = arraySchema.attributes;
    const valueBuffers = attributeValuesToArrayBuffers_1.default(data.values, dimensions, attributes);
    const queryObject = dataToQueryWriter_1.default(data, dimensions, valueBuffers);
    const querySerialized = capnpQuerySerializer_1.default(queryObject);
    const attributeBuffersArray = Object.values(valueBuffers).reduce((accum, valueBuffer) => {
        const attributeBuffer = concatArrayBuffers_1.default(valueBuffer.offsetsBuffer, valueBuffer.valuesBuffer, valueBuffer.validityBuffer);
        return concatArrayBuffers_1.default(accum, attributeBuffer);
    }, emptyArrayBuffer);
    const body = concatArrayBuffers_1.default(querySerialized, attributeBuffersArray);
    return body;
};
exports.default = getWriterBody;
//# sourceMappingURL=getWriterBody.js.map