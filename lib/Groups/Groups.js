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
const v2_1 = require("../v2");
const axios_1 = __importDefault(require("axios"));
class Groups {
    constructor(params, paramsV2, axios = axios_1.default) {
        this.API = new v1_1.GroupsApi(params, undefined, axios);
        this.V2API = new v2_1.GroupsApi(paramsV2, undefined, axios);
    }
    getGroupContents(namespace, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.API.getGroupContents(namespace, name);
            return result.data;
        });
    }
}
exports.default = Groups;
//# sourceMappingURL=Groups.js.map