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
const v1_1 = require("../v1");
const v2_1 = require("../v2");
class TileDBQuery {
    constructor(params) {
        this.configurationParams = params;
    }
    SubmitQuery(namespace, arrayName, body) {
        var _a;
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
                arraySchema.domain;
                const queryResponse = yield queryAPI.submitQuery(namespace, arrayName, v2_1.Querytype.Read, "application/capnp", dataToQuery_1.default(body, arraySchema.attributes, arraySchema.domain.dimensions), undefined, undefined, undefined, {
                    headers: {
                        "Content-Type": "application/capnp",
                    },
                    responseType: "arraybuffer",
                });
                const queryData = convertToArrayBufferIfNodeBuffer(queryResponse.data);
                const bufferWithoutFirstEightBytes = queryData.slice(8);
                const queryObject = capnpQueryDeSerializer_1.default(bufferWithoutFirstEightBytes);
                const attributeHeaders = queryObject.attributeBufferHeaders;
                const numberOfBytesOfResults = getSizeInBytesOfAllAttributes(attributeHeaders);
                const resultsBuffer = bufferWithoutFirstEightBytes.slice(-1 * numberOfBytesOfResults);
                const mergeAttributesAndDimensions = [
                    ...arraySchema.domain.dimensions,
                    ...arraySchema.attributes,
                ];
                const results = exports.getResults(resultsBuffer, attributeHeaders, mergeAttributesAndDimensions);
                return results;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.TileDBQuery = TileDBQuery;
exports.default = TileDBQuery;
function convertToArrayBufferIfNodeBuffer(buffer) {
    if (buffer.buffer) {
        return new Uint8Array(buffer).buffer;
    }
    return buffer;
}
const getAttributeSizeInBytes = (attr) => {
    return (attr.fixedLenBufferSizeInBytes +
        attr.varLenBufferSizeInBytes +
        attr.validityLenBufferSizeInBytes);
};
const getSizeInBytesOfAllAttributes = (attributes) => attributes.reduce((accum, attr) => accum + getAttributeSizeInBytes(attr), 0);
const getResults = (arrayBuffer, attributes, attributesSchema) => {
    const data = {};
    attributes.reverse().reduce((offset, attribute) => {
        const totalNumberOfBytesOfAttribute = getAttributeSizeInBytes(attribute);
        const isNullable = !!attribute.validityLenBufferSizeInBytes;
        const isVarLengthSized = !!attribute.varLenBufferSizeInBytes;
        const selectedAttributeSchema = getAttributeSchema(attribute.name, attributesSchema);
        const negativeOffset = -1 * offset;
        const start = negativeOffset -
            totalNumberOfBytesOfAttribute +
            (isVarLengthSized ? attribute.fixedLenBufferSizeInBytes : 0);
        const ending = negativeOffset -
            (isNullable ? attribute.validityLenBufferSizeInBytes : 0);
        const end = ending ? ending : undefined;
        let result = bufferToData_1.default(arrayBuffer.slice(start, end), selectedAttributeSchema.type);
        if (isNullable) {
            const nullableArrayEnd = ending + attribute.validityLenBufferSizeInBytes;
            const nullableArrayBuffer = arrayBuffer.slice(ending, nullableArrayEnd ? nullableArrayEnd : undefined);
            const nullablesTypedArray = bufferToData_1.bufferToInt8(nullableArrayBuffer);
            const nullablesArray = Array.from(nullablesTypedArray);
            result = setNullables(Array.from(result), nullablesArray);
        }
        data[attribute.name] = result;
        return offset + totalNumberOfBytesOfAttribute;
    }, 0);
    return data;
};
exports.getResults = getResults;
const setNullables = (vals, nullables) => {
    return vals.map((val, i) => (nullables[i] ? val : null));
};
const getAttributeSchema = (attrName, attributesSchema) => {
    return attributesSchema.find((attr) => attr.name === attrName);
};
//# sourceMappingURL=TileDBQuery.js.map