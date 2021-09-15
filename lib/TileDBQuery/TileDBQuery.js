"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResults = exports.TileDBQuery = void 0;
const dataToQuery_1 = __importDefault(require("../utils/dataToQuery"));
const bufferToData_1 = __importStar(require("../utils/bufferToData"));
const capnpQueryDeSerializer_1 = __importDefault(require("../utils/capnpQueryDeSerializer"));
const setNullables_1 = __importDefault(require("../utils/setNullables"));
const v1_1 = require("../v1");
const v2_1 = require("../v2");
const getByteLengthOfDatatype_1 = __importDefault(require("../utils/getByteLengthOfDatatype"));
const flatten_1 = __importDefault(require("../utils/flatten"));
const getWriterBody_1 = __importDefault(require("../utils/getWriterBody"));
const groupValuesByOffsets_1 = __importDefault(require("../utils/groupValuesByOffsets"));
const isArrayOfArrays_1 = __importDefault(require("../utils/isArrayOfArrays"));
class TileDBQuery {
    constructor(params) {
        this.configurationParams = params;
    }
    WriteQuery(namespace, arrayName, data) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const config = new v2_1.Configuration(this.configurationParams);
            const baseV1 = (_a = config.basePath) === null || _a === void 0 ? void 0 : _a.replace("v2", "v1");
            // Add versioning if basePath exists
            const configV1 = new v2_1.Configuration(Object.assign(Object.assign({}, this.configurationParams), (baseV1 ? { basePath: baseV1 } : {})));
            const queryAPI = new v2_1.QueryApi(config);
            const arrayAPI = new v1_1.ArrayApi(configV1);
            try {
                const arraySchemaResponse = yield arrayAPI.getArray(namespace, arrayName, "application/json");
                const arraySchema = arraySchemaResponse.data;
                const body = getWriterBody_1.default(data, arraySchema);
                const queryResponse = yield queryAPI.submitQuery(namespace, arrayName, v2_1.Querytype.Write, "application/capnp", body, undefined, undefined, undefined, {
                    headers: {
                        "Content-Type": "application/capnp",
                    },
                    responseType: "arraybuffer",
                });
                /**
                 * Axios in nodeJS environments casts the response to a Buffer object
                 * we convert it back to an ArrayBuffer if needed
                 */
                const queryData = convertToArrayBufferIfNodeBuffer(queryResponse.data);
                const bufferWithoutFirstEightBytes = queryData.slice(8);
                return capnpQueryDeSerializer_1.default(bufferWithoutFirstEightBytes);
            }
            catch (e) {
                /**
                 * Since we set the responseType to "arrayBuffer", in case the
                 * response error message is a buffer, we deserialize the message before throwing
                 */
                const errorIsABuffer = ((_c = (_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.buffer) || ((_e = (_d = e === null || e === void 0 ? void 0 : e.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.length);
                if (errorIsABuffer) {
                    const errorArrayBuffer = convertToArrayBufferIfNodeBuffer(e.response.data);
                    const decodedMessage = new TextDecoder().decode(errorArrayBuffer);
                    throw new Error(decodedMessage);
                }
                else {
                    throw e;
                }
            }
        });
    }
    ReadQuery(namespace, arrayName, body) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const config = new v2_1.Configuration(this.configurationParams);
            const baseV1 = (_a = config.basePath) === null || _a === void 0 ? void 0 : _a.replace("v2", "v1");
            // Add versioning if basePath exists
            const configV1 = new v2_1.Configuration(Object.assign(Object.assign({}, this.configurationParams), (baseV1 ? { basePath: baseV1 } : {})));
            const queryAPI = new v2_1.QueryApi(config);
            const arrayAPI = new v1_1.ArrayApi(configV1);
            try {
                // Get ArraySchema of arrray, to get type information of the dimensions and the attributes
                const arraySchemaResponse = yield arrayAPI.getArray(namespace, arrayName, "application/json");
                const arraySchema = arraySchemaResponse.data;
                /**
                 * Get the query response in capnp, we set responseType to arraybuffer instead of JSON
                 * in order to deserialize the query capnp object.
                 */
                const queryResponse = yield queryAPI.submitQuery(namespace, arrayName, v2_1.Querytype.Read, "application/capnp", dataToQuery_1.default(body, arraySchema.attributes, arraySchema.domain.dimensions), undefined, undefined, undefined, {
                    headers: {
                        "Content-Type": "application/capnp",
                    },
                    responseType: "arraybuffer",
                });
                /**
                 * Axios in nodeJS environments casts the response to a Buffer object
                 * we convert it back to an ArrayBuffer if needed
                 */
                const queryData = convertToArrayBufferIfNodeBuffer(queryResponse.data);
                /**
                 * First 8 bytes of the response, contain a Uint64 number
                 * which is the size of the response we skip it.
                 */
                const bufferWithoutFirstEightBytes = queryData.slice(8);
                /**
                 * Deserialize buffer to a Query object
                 */
                const queryObject = capnpQueryDeSerializer_1.default(bufferWithoutFirstEightBytes);
                const attributeHeaders = queryObject.attributeBufferHeaders;
                /**
                 * Calculate the size of bytes of the attributes from the attributeBufferHeaders of the Query object.
                 */
                const numberOfBytesOfResults = getSizeInBytesOfAllAttributes(attributeHeaders);
                /**
                 * We get the last N bytes (N is the number of total bytes of the attributes), which contain
                 * the results of all the attributes
                 */
                const resultsBuffer = bufferWithoutFirstEightBytes.slice(-1 * numberOfBytesOfResults);
                const mergeAttributesAndDimensions = [
                    ...arraySchema.domain.dimensions,
                    ...arraySchema.attributes,
                ];
                // Calculate results
                const results = exports.getResults(resultsBuffer, attributeHeaders, mergeAttributesAndDimensions);
                return results;
            }
            catch (e) {
                /**
                 * Since we set the responseType to "arrayBuffer", in case the
                 * response error message is a buffer, we deserialize the message before throwing
                 */
                const errorIsABuffer = ((_c = (_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.buffer) || ((_e = (_d = e === null || e === void 0 ? void 0 : e.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.length);
                if (errorIsABuffer) {
                    const errorArrayBuffer = convertToArrayBufferIfNodeBuffer(e.response.data);
                    const decodedMessage = new TextDecoder().decode(errorArrayBuffer);
                    throw new Error(decodedMessage);
                }
                else {
                    throw e;
                }
            }
        });
    }
}
exports.TileDBQuery = TileDBQuery;
exports.default = TileDBQuery;
/**
 * If buffer is a NodeJS Buffer object we convert it back to an ArrayBuffer
 * @param buffer ArrayBuffer or Nodejs Buffer
 * @returns ArrayBuffer
 */
function convertToArrayBufferIfNodeBuffer(buffer) {
    if (buffer.buffer) {
        return new Uint8Array(buffer).buffer;
    }
    return buffer;
}
/**
 * Add all buffers of an attribute
 * @param attr AttributeBufferHeader
 * @returns number of the total bytes of the attribute
 */
const getAttributeSizeInBytes = (attr) => {
    return (attr.fixedLenBufferSizeInBytes +
        attr.varLenBufferSizeInBytes +
        attr.validityLenBufferSizeInBytes);
};
/**
 * Calculate the total bytes of all the attributes
 * @param attributes
 * @returns number of the total bytes of all the attributes
 */
const getSizeInBytesOfAllAttributes = (attributes) => attributes.reduce((accum, attr) => accum + getAttributeSizeInBytes(attr), 0);
/**
 * Convert an ArrayBuffer to a map of attributes with their results
 * @param arrayBuffer The slice ArrayBuffer that contains the results
 * @param attributes
 * @param attributesSchema
 * @returns A map of attribute names with the results of every attribute
 */
const getResults = (arrayBuffer, attributes, attributesSchema) => {
    const data = {};
    /**
     * We start from the last attribute which is at the end of the buffer
     */
    attributes.reverse().reduce((offset, attribute) => {
        const totalNumberOfBytesOfAttribute = getAttributeSizeInBytes(attribute);
        if (!totalNumberOfBytesOfAttribute) {
            data[attribute.name] = null;
            return offset;
        }
        // If there are validityLenBufferSizeInBytes the attribute is nullable
        const isNullable = !!attribute.validityLenBufferSizeInBytes;
        // If there are varLenBufferSizeInBytes the attribute is varLengthSized
        const isVarLengthSized = !!attribute.varLenBufferSizeInBytes;
        const selectedAttributeSchema = getAttributeSchema(attribute.name, attributesSchema);
        const negativeOffset = -1 * offset;
        /**
         * If attribute is varLengthSized, we ignore the first N bytes (where N = fixedLenBufferSizeInBytes)
         * These first N bytes contain the offsets of the attribute, which is a uint64 array.
         */
        const start = negativeOffset -
            totalNumberOfBytesOfAttribute +
            (isVarLengthSized ? attribute.fixedLenBufferSizeInBytes : 0);
        /**
         * If attribute is isNullable we ignore the last N bytes (where N = validityLenBufferSizeInBytes)
         * These last N bytes contain a uint8 array of zeros and ones, where every zero represents
         * that in that index the attribute is null.
         */
        const ending = negativeOffset -
            (isNullable ? attribute.validityLenBufferSizeInBytes : 0);
        const end = ending ? ending : undefined;
        let result = bufferToData_1.default(arrayBuffer.slice(start, end), selectedAttributeSchema.type);
        let offsets = [];
        if (isVarLengthSized) {
            const BYTE_PER_ELEMENT = getByteLengthOfDatatype_1.default(selectedAttributeSchema.type);
            const startOfBuffer = negativeOffset - totalNumberOfBytesOfAttribute;
            const offsetsBuffer = arrayBuffer.slice(startOfBuffer, startOfBuffer + attribute.fixedLenBufferSizeInBytes);
            /**
             * Offsets are Uint64 numbers, buffer contains byte offsets though,
             * e.g. if type of the attribute is an INT32 (4 bytes per number) and the offsets are [0, 3, 4]
             * the buffer contains the offsets * bytes of the element instead of just the offsets [0, 3 * 4, 4 * 4] = [0, 12, 16]
             */
            const byteOffsets = Array.from(new BigUint64Array(offsetsBuffer));
            // Convert byte offsets to offsets
            offsets = byteOffsets.map((o) => Number(o) / BYTE_PER_ELEMENT);
        }
        if (isNullable) {
            /**
             * If attribute is Nullable, we get the last N bytes, cast it to uint8 array to get
             * what is null.
             */
            const nullableArrayEnd = ending + attribute.validityLenBufferSizeInBytes;
            const nullableArrayBuffer = arrayBuffer.slice(ending, nullableArrayEnd ? nullableArrayEnd : undefined);
            const nullablesTypedArray = bufferToData_1.bufferToInt8(nullableArrayBuffer);
            /**
             * nullablesArray should be an array of zeros and ones (e.g. [0, 1, 1, 0])
             * Every zero represents that in that specific index the attribute is NULL
             */
            const nullablesArray = Array.from(nullablesTypedArray);
            result = setNullables_1.default(Array.from(result), nullablesArray, offsets);
        }
        // If result is a String slice the String by the offsets to make it an array
        if (isVarLengthSized && typeof result === "string") {
            result = groupValuesByOffsets_1.default([...result], offsets).map((s) => s.join(''));
        }
        data[attribute.name] = isArrayOfArrays_1.default(result) ? flatten_1.default(result) : result;
        return offset + totalNumberOfBytesOfAttribute;
    }, 0);
    return data;
};
exports.getResults = getResults;
/**
 * Get attribute data from attribute name, attribute data contains the type of the attribute (e.g. INT32, StringUTF8 etc)
 */
const getAttributeSchema = (attrName, attributesSchema) => {
    return attributesSchema.find((attr) => attr.name === attrName);
};
//# sourceMappingURL=TileDBQuery.js.map