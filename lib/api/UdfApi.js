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
var UdfApiApiKeys;
(function (UdfApiApiKeys) {
    UdfApiApiKeys[UdfApiApiKeys["ApiKeyAuth"] = 0] = "ApiKeyAuth";
})(UdfApiApiKeys = exports.UdfApiApiKeys || (exports.UdfApiApiKeys = {}));
class UdfApi {
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
        this.authentications[UdfApiApiKeys[key]].apiKey = value;
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
    submitUDF(namespace, array, udf, xPayer, acceptEncoding, options = { headers: {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            const localVarPath = this.basePath + '/arrays/{namespace}/{array}/udf/submit'
                .replace('{' + 'namespace' + '}', encodeURIComponent(String(namespace)))
                .replace('{' + 'array' + '}', encodeURIComponent(String(array)));
            let localVarQueryParameters = {};
            let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
            const produces = ['application/octet-stream'];
            if (produces.indexOf('application/json') >= 0) {
                localVarHeaderParams.Accept = 'application/json';
            }
            else {
                localVarHeaderParams.Accept = produces.join(',');
            }
            let localVarFormParams = {};
            if (namespace === null || namespace === undefined) {
                throw new Error('Required parameter namespace was null or undefined when calling submitUDF.');
            }
            if (array === null || array === undefined) {
                throw new Error('Required parameter array was null or undefined when calling submitUDF.');
            }
            if (udf === null || udf === undefined) {
                throw new Error('Required parameter udf was null or undefined when calling submitUDF.');
            }
            localVarHeaderParams['X-Payer'] = models_1.ObjectSerializer.serialize(xPayer, "string");
            localVarHeaderParams['Accept-Encoding'] = models_1.ObjectSerializer.serialize(acceptEncoding, "string");
            Object.assign(localVarHeaderParams, options.headers);
            let localVarUseFormData = false;
            let localVarRequestOptions = {
                method: 'POST',
                qs: localVarQueryParameters,
                headers: localVarHeaderParams,
                uri: localVarPath,
                useQuerystring: this._useQuerystring,
                encoding: null,
                body: models_1.ObjectSerializer.serialize(udf, "UDF")
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
                            body = models_1.ObjectSerializer.deserialize(body, "Buffer");
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
exports.UdfApi = UdfApi;
//# sourceMappingURL=udfApi.js.map