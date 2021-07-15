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
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = require("../v2");
class TileDBQuery {
    constructor(params) {
        this.configurationParams = params;
    }
    SubmitQuery(namespace, arrayName, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = new v2_1.Configuration(this.configurationParams);
            const queryAPI = new v2_1.QueryApi(config);
            const response = yield queryAPI.submitQuery(namespace, arrayName, "read", "application/capnp", body, undefined, undefined, undefined, {
                headers: {
                    "Content-Type": "application/capnp",
                },
            });
            return response;
        });
    }
}
exports.default = TileDBQuery;
//# sourceMappingURL=TileDBQuery.js.map