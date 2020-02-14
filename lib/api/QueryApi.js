"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const localVarRequest = require("request");
const models_1 = require("../model/models");
const models_2 = require("../model/models");
const apis_1 = require("./apis");
let defaultBasePath = 'http://api.tiledb.com/v1';
var QueryApiApiKeys;
(function (QueryApiApiKeys) {
    QueryApiApiKeys[QueryApiApiKeys["ApiKeyAuth"] = 0] = "ApiKeyAuth";
})(QueryApiApiKeys = exports.QueryApiApiKeys || (exports.QueryApiApiKeys = {}));
class QueryApi {
    constructor(basePathOrUsername, password, basePath) {
        this._basePath = defaultBasePath;
        this.defaultHeaders = {};
        this._useQuerystring = false;
        this.authentications = {
            'default': new models_1.VoidAuth(),
            'OAuth2': new models_2.OAuth(),
            'BasicAuth': new models_2.HttpBasicAuth(),
            'ApiKeyAuth': new models_2.ApiKeyAuth('header', 'X-TILEDB-REST-API-KEY'),
        };
        if (password) {
            this.username = basePathOrUsername;
            this.password = password;
            if (basePath) {
                this.basePath = basePath;
            }
        }
        else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername;
            }
        }
    }
    set useQuerystring(value) {
        this._useQuerystring = value;
    }
    set basePath(basePath) {
        this._basePath = basePath;
    }
    get basePath() {
        return this._basePath;
    }
    setDefaultAuthentication(auth) {
        this.authentications.default = auth;
    }
    setApiKey(key, value) {
        this.authentications[QueryApiApiKeys[key]].apiKey = value;
    }
    set accessToken(token) {
        this.authentications.OAuth2.accessToken = token;
    }
    set username(username) {
        this.authentications.BasicAuth.username = username;
    }
    set password(password) {
        this.authentications.BasicAuth.password = password;
    }
    finalizeQuery(namespace, array, type, contentType, query, xPayer, openAt, options = { headers: {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            const localVarPath = this.basePath + '/arrays/{namespace}/{array}/query/finalize'
                .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
                .replace('{' + 'array' + '}', encodeURIComponent(String(array)));
            let localVarQueryParameters = {};
            let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
            const produces = ['application/json', 'application/capnp'];
            if (produces.indexOf('application/json') >= 0) {
                localVarHeaderParams.Accept = 'application/json';
            }
            else {
                localVarHeaderParams.Accept = produces.join(',');
            }
            let localVarFormParams = {};
            if (namespace === null || namespace === undefined) {
                throw new Error('Required parameter namespace was null or undefined when calling finalizeQuery.');
            }
            if (array === null || array === undefined) {
                throw new Error('Required parameter array was null or undefined when calling finalizeQuery.');
            }
            if (type === null || type === undefined) {
                throw new Error('Required parameter type was null or undefined when calling finalizeQuery.');
            }
            if (contentType === null || contentType === undefined) {
                throw new Error('Required parameter contentType was null or undefined when calling finalizeQuery.');
            }
            if (query === null || query === undefined) {
                throw new Error('Required parameter query was null or undefined when calling finalizeQuery.');
            }
            if (type !== undefined) {
                localVarQueryParameters['type'] = models_1.ObjectSerializer.serialize(type, "string");
            }
            if (openAt !== undefined) {
                localVarQueryParameters['open_at'] = models_1.ObjectSerializer.serialize(openAt, "number");
            }
            localVarHeaderParams['Content-Type'] = models_1.ObjectSerializer.serialize(contentType, "string");
            localVarHeaderParams['X-Payer'] = models_1.ObjectSerializer.serialize(xPayer, "string");
            Object.assign(localVarHeaderParams, options.headers);
            let localVarUseFormData = false;
            let localVarRequestOptions = {
                method: 'POST',
                qs: localVarQueryParameters,
                headers: localVarHeaderParams,
                uri: localVarPath,
                useQuerystring: this._useQuerystring,
                json: true,
                body: models_1.ObjectSerializer.serialize(query, "Query")
            };
            let authenticationPromise = Promise.resolve();
            authenticationPromise = authenticationPromise.then(() => this.authentications.ApiKeyAuth.applyToRequest(localVarRequestOptions));
            authenticationPromise = authenticationPromise.then(() => this.authentications.BasicAuth.applyToRequest(localVarRequestOptions));
            authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
            authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
            return authenticationPromise.then(() => {
                if (Object.keys(localVarFormParams).length) {
                    if (localVarUseFormData) {
                        localVarRequestOptions.formData = localVarFormParams;
                    }
                    else {
                        localVarRequestOptions.form = localVarFormParams;
                    }
                }
                return new Promise((resolve, reject) => {
                    localVarRequest(localVarRequestOptions, (error, response, body) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            body = models_1.ObjectSerializer.deserialize(body, "Query");
                            if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                                resolve({ response: response, body: body });
                            }
                            else {
                                reject(new apis_1.HttpError(response, body, response.statusCode));
                            }
                        }
                    });
                });
            });
        });
    }
    submitQuery(namespace, array, type, contentType, query, xPayer, openAt, options = { headers: {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            const localVarPath = this.basePath + '/arrays/{namespace}/{array}/query/submit'
                .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
                .replace('{' + 'array' + '}', encodeURIComponent(String(array)));
            let localVarQueryParameters = {};
            let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
            const produces = ['application/json', 'application/capnp'];
            if (produces.indexOf('application/json') >= 0) {
                localVarHeaderParams.Accept = 'application/json';
            }
            else {
                localVarHeaderParams.Accept = produces.join(',');
            }
            let localVarFormParams = {};
            if (namespace === null || namespace === undefined) {
                throw new Error('Required parameter namespace was null or undefined when calling submitQuery.');
            }
            if (array === null || array === undefined) {
                throw new Error('Required parameter array was null or undefined when calling submitQuery.');
            }
            if (type === null || type === undefined) {
                throw new Error('Required parameter type was null or undefined when calling submitQuery.');
            }
            if (contentType === null || contentType === undefined) {
                throw new Error('Required parameter contentType was null or undefined when calling submitQuery.');
            }
            if (query === null || query === undefined) {
                throw new Error('Required parameter query was null or undefined when calling submitQuery.');
            }
            if (type !== undefined) {
                localVarQueryParameters['type'] = models_1.ObjectSerializer.serialize(type, "string");
            }
            if (openAt !== undefined) {
                localVarQueryParameters['open_at'] = models_1.ObjectSerializer.serialize(openAt, "number");
            }
            localVarHeaderParams['Content-Type'] = models_1.ObjectSerializer.serialize(contentType, "string");
            localVarHeaderParams['X-Payer'] = models_1.ObjectSerializer.serialize(xPayer, "string");
            Object.assign(localVarHeaderParams, options.headers);
            let localVarUseFormData = false;
            let localVarRequestOptions = {
                method: 'POST',
                qs: localVarQueryParameters,
                headers: localVarHeaderParams,
                uri: localVarPath,
                useQuerystring: this._useQuerystring,
                json: true,
                body: models_1.ObjectSerializer.serialize(query, "Query")
            };
            let authenticationPromise = Promise.resolve();
            authenticationPromise = authenticationPromise.then(() => this.authentications.ApiKeyAuth.applyToRequest(localVarRequestOptions));
            authenticationPromise = authenticationPromise.then(() => this.authentications.BasicAuth.applyToRequest(localVarRequestOptions));
            authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
            authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
            return authenticationPromise.then(() => {
                if (Object.keys(localVarFormParams).length) {
                    if (localVarUseFormData) {
                        localVarRequestOptions.formData = localVarFormParams;
                    }
                    else {
                        localVarRequestOptions.form = localVarFormParams;
                    }
                }
                return new Promise((resolve, reject) => {
                    localVarRequest(localVarRequestOptions, (error, response, body) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            body = models_1.ObjectSerializer.deserialize(body, "Query");
                            if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                                resolve({ response: response, body: body });
                            }
                            else {
                                reject(new apis_1.HttpError(response, body, response.statusCode));
                            }
                        }
                    });
                });
            });
        });
    }
}
exports.QueryApi = QueryApi;
//# sourceMappingURL=queryApi.js.map