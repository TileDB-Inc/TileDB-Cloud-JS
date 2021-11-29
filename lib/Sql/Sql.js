"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = require("../v1");
class Sql {
    constructor(params) {
        const config = new v1_1.Configuration(params);
        this.config = config;
        this.API = new v1_1.SqlApi(config);
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