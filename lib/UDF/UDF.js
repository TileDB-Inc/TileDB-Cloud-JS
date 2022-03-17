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
    exec(namespaceAndUdf, args, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!namespaceAndUdf.includes('/')) {
                throw new Error("First argument should include namespace and the udf name separated by a '/' e.g. TileDB/myUDF");
            }
            if (args && !Array.isArray(args)) {
                throw new Error("Arguments should be contained in an array");
            }
            const [namespace] = namespaceAndUdf.split("/");
            const udf = Object.assign(Object.assign({ udf_info_name: namespaceAndUdf }, (args ? { argument: JSON.stringify(args) } : {})), options);
            const result = yield this.API.submitGenericUDF(namespace, udf);
            return result.data;
        });
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