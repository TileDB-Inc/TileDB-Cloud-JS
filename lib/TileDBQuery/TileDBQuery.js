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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileDBQuery = void 0;
const dataToQuery_1 = __importDefault(require("../utils/dataToQuery"));
const capnpQueryDeSerializer_1 = __importDefault(require("../utils/capnpQueryDeSerializer"));
const v1_1 = require("../v1");
const v2_1 = require("../v2");
const getWriterBody_1 = __importDefault(require("../utils/getWriterBody"));
const convertToArrayBufferIfNodeBuffer_1 = __importDefault(require("../utils/convertToArrayBufferIfNodeBuffer"));
const getSizeInBytesOfAllAttributes_1 = __importDefault(require("../utils/getSizeInBytesOfAllAttributes"));
const getResultsFromArrayBuffer_1 = __importDefault(require("../utils/getResultsFromArrayBuffer"));
const axios_1 = __importDefault(require("axios"));
class TileDBQuery {
    constructor(params, axios = axios_1.default) {
        var _a;
        this.configurationParams = params;
        const config = new v2_1.Configuration(this.configurationParams);
        const baseV1 = (_a = config.basePath) === null || _a === void 0 ? void 0 : _a.replace("v2", "v1");
        // Add versioning if basePath exists
        const configV1 = new v2_1.Configuration(Object.assign(Object.assign({}, this.configurationParams), (baseV1 ? { basePath: baseV1 } : {})));
        this.queryAPI = new v2_1.QueryApi(config, undefined, this.axios);
        this.arrayAPI = new v1_1.ArrayApi(configV1, undefined, this.axios);
    }
    WriteQuery(namespace, arrayName, data) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const arraySchemaResponse = yield this.arrayAPI.getArray(namespace, arrayName, "application/json");
                const arraySchema = arraySchemaResponse.data;
                const body = getWriterBody_1.default(data, arraySchema);
                const queryResponse = yield this.queryAPI.submitQuery(namespace, arrayName, v2_1.Querytype.Write, "application/capnp", body, undefined, undefined, undefined, {
                    headers: {
                        "Content-Type": "application/capnp",
                    },
                    responseType: "arraybuffer",
                });
                /**
                 * Axios in nodeJS environments casts the response to a Buffer object
                 * we convert it back to an ArrayBuffer if needed
                 */
                const queryData = convertToArrayBufferIfNodeBuffer_1.default(queryResponse.data);
                const bufferWithoutFirstEightBytes = queryData.slice(8);
                return capnpQueryDeSerializer_1.default(bufferWithoutFirstEightBytes);
            }
            catch (e) {
                /**
                 * Since we set the responseType to "arrayBuffer", in case the
                 * response error message is a buffer, we deserialize the message before throwing
                 */
                const errorIsABuffer = ((_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.buffer) || ((_d = (_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length);
                if (errorIsABuffer) {
                    const errorArrayBuffer = convertToArrayBufferIfNodeBuffer_1.default(e.response.data);
                    const decodedMessage = new TextDecoder().decode(errorArrayBuffer);
                    throw new Error(decodedMessage);
                }
                else {
                    throw e;
                }
            }
        });
    }
    ReadIncompleteQuery(arraySchema, queryAsArrayBuffer, namespace, arrayName, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryResponse = yield this.queryAPI.submitQuery(namespace, arrayName, v2_1.Querytype.Read, "application/capnp", queryAsArrayBuffer, undefined, undefined, undefined, {
                headers: {
                    "Content-Type": "application/capnp",
                },
                responseType: "arraybuffer",
            });
            /**
             * Axios in nodeJS environments casts the response to a Buffer object
             * we convert it back to an ArrayBuffer if needed
             */
            const queryData = convertToArrayBufferIfNodeBuffer_1.default(queryResponse.data);
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
            const results = yield this.getResultsFromArrayBuffer(arraySchema, bufferWithoutFirstEightBytes, attributeHeaders, options);
            return {
                results,
                query: queryObject,
                queryAsArrayBuffer: bufferWithoutFirstEightBytes,
            };
        });
    }
    ReadQuery(namespace, arrayName, body) {
        return __asyncGenerator(this, arguments, function* ReadQuery_1() {
            try {
                // Get ArraySchema of arrray, to get type information of the dimensions and the attributes
                const arraySchemaResponse = yield __await(this.arrayAPI.getArray(namespace, arrayName, "application/json"));
                const arraySchema = arraySchemaResponse.data;
                const options = {
                    ignoreNullables: body.ignoreNullables,
                    ignoreOffsets: body.ignoreOffsets,
                    attributes: body.attributes,
                };
                /**
                 * Get the query response in capnp, we set responseType to arraybuffer instead of JSON
                 * in order to deserialize the query capnp object.
                 */
                const queryResponse = yield __await(this.queryAPI.submitQuery(namespace, arrayName, v2_1.Querytype.Read, "application/capnp", dataToQuery_1.default(body, arraySchema.attributes, arraySchema.domain.dimensions, options), undefined, undefined, undefined, {
                    headers: {
                        "Content-Type": "application/capnp",
                    },
                    responseType: "arraybuffer",
                }));
                /**
                 * Axios in nodeJS environments casts the response to a Buffer object
                 * we convert it back to an ArrayBuffer if needed
                 */
                const queryData = convertToArrayBufferIfNodeBuffer_1.default(queryResponse.data);
                /**
                 * First 8 bytes of the response, contain a Uint64 number
                 * which is the size of the response we skip it.
                 */
                let bufferWithoutFirstEightBytes = queryData.slice(8);
                /**
                 * Deserialize buffer to a Query object
                 */
                const queryObject = capnpQueryDeSerializer_1.default(bufferWithoutFirstEightBytes);
                const attributeHeaders = queryObject.attributeBufferHeaders;
                // Case it's incomplete query
                if (queryObject.status === v2_1.Querystatus.Incomplete) {
                    try {
                        yield yield __await(yield __await(this.getResultsFromArrayBuffer(arraySchema, bufferWithoutFirstEightBytes, attributeHeaders, options)));
                        while (true) {
                            const { results, query, queryAsArrayBuffer } = yield __await(this.ReadIncompleteQuery(arraySchema, bufferWithoutFirstEightBytes, namespace, arrayName, options));
                            // Override query object with the new one returned from `ReadIncompleteQuery`
                            bufferWithoutFirstEightBytes = queryAsArrayBuffer;
                            if (query.status === v2_1.Querystatus.Incomplete) {
                                yield yield __await(results);
                            }
                            else {
                                // Case query is not incomplete
                                yield yield __await(results);
                                return yield __await(void 0);
                            }
                        }
                    }
                    catch (e) {
                        this.throwError(e);
                    }
                }
                yield yield __await(this.getResultsFromArrayBuffer(arraySchema, bufferWithoutFirstEightBytes, attributeHeaders, options));
                return yield __await(void 0);
            }
            catch (e) {
                this.throwError(e);
            }
        });
    }
    getResultsFromArrayBuffer(arraySchema, bufferResults, attributeHeaders, options) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Calculate the size of bytes of the attributes from the attributeBufferHeaders of the Query object.
             */
            const numberOfBytesOfResults = getSizeInBytesOfAllAttributes_1.default(attributeHeaders);
            /**
             * We get the last N bytes (N is the number of total bytes of the attributes), which contain
             * the results of all the attributes
             */
            const resultsBuffer = bufferResults.slice(-1 * numberOfBytesOfResults);
            const mergeAttributesAndDimensions = [
                ...arraySchema.domain.dimensions,
                ...arraySchema.attributes,
            ];
            // Calculate results
            const results = yield getResultsFromArrayBuffer_1.default(resultsBuffer, attributeHeaders, mergeAttributesAndDimensions, options);
            return results;
        });
    }
    throwError(e) {
        var _a, _b, _c, _d;
        /**
         * Since we set the responseType to "arrayBuffer", in case the
         * response error message is a buffer, we deserialize the message before throwing
         */
        const errorIsABuffer = ((_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.buffer) || ((_d = (_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length);
        if (errorIsABuffer) {
            const errorArrayBuffer = convertToArrayBufferIfNodeBuffer_1.default(e.response.data);
            const decodedMessage = new TextDecoder().decode(errorArrayBuffer);
            throw new Error(decodedMessage);
        }
        else {
            throw e;
        }
    }
}
exports.TileDBQuery = TileDBQuery;
exports.default = TileDBQuery;
//# sourceMappingURL=TileDBQuery.js.map