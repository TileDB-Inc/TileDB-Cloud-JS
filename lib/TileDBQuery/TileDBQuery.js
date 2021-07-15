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
                const results = getResults(resultsBuffer, attributeHeaders, arraySchema.attributes);
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
    const attrs = attributes.reverse();
    const data = {};
    attrs.reduce((offset, attribute) => {
        const totalNumberOfBytesOfAttribute = getAttributeSizeInBytes(attribute);
        const isNullable = !!attribute.validityLenBufferSizeInBytes;
        const isVarLengthSized = !!attribute.varLenBufferSizeInBytes;
        const attributeType = getAttributeSchema(attribute.name, attributesSchema);
        const negativeOffset = -1 * offset;
        const start = negativeOffset -
            totalNumberOfBytesOfAttribute +
            (isVarLengthSized ? attribute.fixedLenBufferSizeInBytes : 0);
        const ending = negativeOffset -
            (isNullable ? attribute.validityLenBufferSizeInBytes : 0);
        const end = ending ? ending : undefined;
        const retult = getAttributeResult(arrayBuffer.slice(start, end), attributeType);
        data[attribute.name] = retult;
        return offset + totalNumberOfBytesOfAttribute;
    }, 0);
    return data;
};
const getAttributeSchema = (name, attributesSchema) => {
    return attributesSchema.find((attr) => (attr.name = name)).type;
};
const getAttributeResult = (arrayBuffer, type) => {
    if (type === v2_1.Datatype.Int32) {
        return bufferToInt32(arrayBuffer);
    }
    else if (type === v2_1.Datatype.Uint64) {
        return bufferToUint64(arrayBuffer);
    }
};
const bufferToInt32 = (arrayBuffer) => new Int32Array(arrayBuffer);
const bufferToUint64 = (arrayBuffer) => new BigInt64Array(arrayBuffer);
//# sourceMappingURL=TileDBQuery.js.map