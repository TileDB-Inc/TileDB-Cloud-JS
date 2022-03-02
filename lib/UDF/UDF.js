"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = require("../v1");
const axios_1 = __importDefault(require("axios"));
class UDF {
    constructor(params, axios = axios_1.default) {
        const config = new v1_1.Configuration(params);
        this.config = config;
        this.API = new v1_1.UdfApi(config, undefined, axios);
    }
    //NOTE: TDB: We could use `btoa` to encode64 the `exec` field.
    registerUdf(namespace, name, udf) {
        return this.API.registerUDFInfo(namespace, name, udf);
    }
    registerGenericUdf(namespace, name, udf) {
        const udfObject = Object.assign(Object.assign({}, udf), { type: v1_1.UDFType.Generic });
        return this.API.registerUDFInfo(namespace, name, udfObject);
    }
    registerSingleArrayUdf(namespace, name, udf) {
        const udfObject = Object.assign(Object.assign({}, udf), { type: v1_1.UDFType.SingleArray });
        return this.API.registerUDFInfo(namespace, name, udfObject);
    }
    updateUdf(namespace, name, udf) {
        return this.API.updateUDFInfo(namespace, name, udf);
    }
    updateGenericUdf(namespace, name, udf) {
        const udfObject = Object.assign(Object.assign({}, udf), { type: v1_1.UDFType.Generic });
        return this.API.updateUDFInfo(namespace, name, udfObject);
    }
    updateSingleArrayUdf(namespace, name, udf) {
        const udfObject = Object.assign(Object.assign({}, udf), { type: v1_1.UDFType.SingleArray });
        return this.API.updateUDFInfo(namespace, name, udfObject);
    }
    exec(namespace, udf) {
        return this.API.submitGenericUDF(namespace, udf);
    }
    info(namespace, udfName) {
        return this.API.getUDFInfo(namespace, udfName);
    }
    share(namespace, udfName, udfSharing) {
        return this.API.shareUDFInfo(namespace, udfName, udfSharing);
    }
    unshare(namespace, udfName, namespaceToUnshare) {
        const noActions = {
            namespace: namespaceToUnshare,
            actions: [],
        };
        return this.API.shareUDFInfo(namespace, udfName, noActions);
    }
    delete(namespace, udfName) {
        return this.API.deleteUDFInfo(namespace, udfName);
    }
}
exports.default = UDF;
//# sourceMappingURL=UDF.js.map