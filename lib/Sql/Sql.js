"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = require("../v1");
const axios_1 = __importDefault(require("axios"));
class Sql {
    constructor(params, axios = axios_1.default) {
        const config = new v1_1.Configuration(params);
        this.config = config;
        this.API = new v1_1.SqlApi(config, undefined, axios);
    }
    exec(namespace, query) {
        const sql = {
            query,
        };
        return this.API.runSQL(namespace, sql);
    }
}
exports.default = Sql;
//# sourceMappingURL=Sql.js.map