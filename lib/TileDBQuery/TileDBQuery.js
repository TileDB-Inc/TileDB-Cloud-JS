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
// import { AttributeBufferHeader } from './../v2/api';
const capnpQueryDeSerializer_1 = __importDefault(require("../utils/capnpQueryDeSerializer"));
const v1_1 = require("../v1");
const v2_1 = require("../v2");
class TileDBQuery {
    constructor(params) {
        this.configurationParams = params;
    }
    // TODO: Get Query javascript object instead of the array buffer and serialize it through the serializer
    SubmitQuery(namespace, arrayName, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = new v2_1.Configuration(this.configurationParams);
            // Add versioning if basePath exists
            const configV1 = new v2_1.Configuration(Object.assign(Object.assign({}, this.configurationParams), { basePath: "https://api.dev.tiledb.io/v1" }));
            const queryAPI = new v2_1.QueryApi(config);
            const arrayAPI = new v1_1.ArrayApi(configV1);
            try {
                const [arraySchemaResponse, queryResponse] = yield Promise.all([
                    arrayAPI.getArray(namespace, arrayName, "application/json"),
                    queryAPI.submitQuery(namespace, arrayName, v2_1.Querytype.Read, "application/capnp", body, undefined, undefined, undefined, {
                        headers: {
                            "Content-Type": "application/capnp",
                        },
                        responseType: "arraybuffer",
                    }),
                ]);
                const arraySchema = arraySchemaResponse.data;
                const queryData = queryResponse.data;
                const queryObject = capnpQueryDeSerializer_1.default(queryData.slice(8));
                const attributeHeaders = queryObject.attributeBufferHeaders;
                const numberOfBytesOfResults = getSizeInBytesOfAllAttributes(attributeHeaders);
                const resultsBuffer = queryData.slice(-1 * numberOfBytesOfResults);
                const results = exports.getResults(resultsBuffer, attributeHeaders, arraySchema.attributes);
                return results;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = TileDBQuery;
const getAttributeSizeInBytes = (attr) => {
    return (attr.fixedLenBufferSizeInBytes +
        attr.varLenBufferSizeInBytes +
        attr.validityLenBufferSizeInBytes);
};
const getSizeInBytesOfAllAttributes = (attributes) => attributes.reduce((accum, attr) => accum + getAttributeSizeInBytes(attr), 0);
const getResults = (arrayBuffer, attributes, attributesSchema) => {
    // Let's reverse attributes to start from the end
    //   const attrs = attributes.reverse();
    const data = {};
    console.log(attributes);
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
        console.log(`Attrbibute ${attribute.name}: start: ${start}, end: ${end}`);
        let result = getAttributeResult(arrayBuffer.slice(start, end), selectedAttributeSchema.type);
        if (isNullable) {
            const nullableArrayBuffer = arrayBuffer.slice(ending, ending + attribute.validityLenBufferSizeInBytes);
            const nullablesTypedArray = bufferToInt8(nullableArrayBuffer);
            const nullablesArray = Array.from(nullablesTypedArray);
            // console.log(`For nullable ending in ${ending} and validity buffer size ${attribute.validityLenBufferSizeInBytes}`)
            result = setNullables(Array.from(result), nullablesArray);
        }
        data[attribute.name] = result;
        return offset + totalNumberOfBytesOfAttribute;
    }, 0);
    return data;
};
exports.getResults = getResults;
const setNullables = (vals, nullables) => {
    return vals.map((val, i) => nullables[i] ? val : null);
};
const getAttributeSchema = (attrName, attributesSchema) => {
    return attributesSchema.find((attr) => (attr.name === attrName));
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