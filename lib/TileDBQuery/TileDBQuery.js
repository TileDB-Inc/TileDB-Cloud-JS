"use strict";
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
exports.getResults = void 0;
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
                const [arraySchemaResponse, queryResponse] = yield Promise.all([
                    arrayAPI.getArray(namespace, arrayName, "application/json"),
                    queryAPI.submitQuery(namespace, arrayName, v2_1.Querytype.Read, "application/capnp", body, undefined, undefined, undefined, {
                        headers: {
                            "Content-Type": "application/capnp",
                        },
                        // responseType: "arraybuffer",
                    }),
                ]);
                const arraySchema = arraySchemaResponse.data;
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
        let result = getAttributeResult(arrayBuffer.slice(start, end), selectedAttributeSchema.type);
        if (isNullable) {
            const nullableArrayEnd = ending + attribute.validityLenBufferSizeInBytes;
            const nullableArrayBuffer = arrayBuffer.slice(ending, nullableArrayEnd ? nullableArrayEnd : undefined);
            const nullablesTypedArray = bufferToInt8(nullableArrayBuffer);
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
const getAttributeResult = (arrayBuffer, type) => {
    if (type === v2_1.Datatype.Int32) {
        return bufferToInt32(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Uint64) {
        return bufferToUint64(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Int64) {
        return bufferToInt64(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Float32) {
        return bufferToFloat32(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Float64) {
        return bufferToFloat64(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Char) {
        return bufferToString(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Int8) {
        return bufferToInt8(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Uint8) {
        return bufferToUint8(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Int16) {
        return bufferToInt16(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Uint16) {
        return bufferToUint16(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Uint32) {
        return bufferToUint32(arrayBuffer);
    }
    else if (type === v2_1.Datatype.StringAscii) {
        return bufferToAscii(arrayBuffer);
    }
    else if (type === v2_1.Datatype.StringUtf8) {
        return bufferToString(arrayBuffer);
    }
    else if (type === v2_1.Datatype.StringUtf16) {
        return bufferToUTF16(arrayBuffer);
    }
    else if (type === v2_1.Datatype.StringUtf32) {
        return bufferToUTF32(arrayBuffer);
    }
    else if (type === v2_1.Datatype.StringUcs2) {
        return bufferToUTF16(arrayBuffer);
    }
    else if (type === v2_1.Datatype.StringUcs4) {
        return bufferToUTF32(arrayBuffer);
    }
    return arrayBuffer;
};
const bufferToInt8 = (arrayBuffer) => new Int8Array(arrayBuffer);
const bufferToUint8 = (arrayBuffer) => new Uint8Array(arrayBuffer);
const bufferToUint16 = (arrayBuffer) => new Uint16Array(arrayBuffer);
const bufferToUint32 = (arrayBuffer) => new Uint32Array(arrayBuffer);
const bufferToInt16 = (arrayBuffer) => new Int16Array(arrayBuffer);
const bufferToInt32 = (arrayBuffer) => new Int32Array(arrayBuffer);
const bufferToUint64 = (arrayBuffer) => new BigUint64Array(arrayBuffer);
const bufferToInt64 = (arrayBuffer) => new BigInt64Array(arrayBuffer);
const bufferToFloat32 = (arrayBuffer) => new Float32Array(arrayBuffer);
const bufferToFloat64 = (arrayBuffer) => new Float64Array(arrayBuffer);
const bufferToString = (arrayBuffer) => {
    const utf8decoder = new TextDecoder();
    return utf8decoder.decode(arrayBuffer);
};
const bufferToAscii = (arrayBuffer) => {
    const utf8decoder = new TextDecoder("ascii");
    return utf8decoder.decode(arrayBuffer);
};
const bufferToUTF16 = (arrayBuffer) => {
    const utf8decoder = new TextDecoder("utf-16");
    return utf8decoder.decode(arrayBuffer);
};
const bufferToUTF32 = (arrayBuffer) => {
    const view = new DataView(arrayBuffer, 0, arrayBuffer.byteLength);
    let result = "";
    for (let i = 0; i < arrayBuffer.byteLength; i += 4) {
        result += String.fromCodePoint(view.getInt32(i, true));
    }
    return result;
};
//# sourceMappingURL=TileDBQuery.js.map