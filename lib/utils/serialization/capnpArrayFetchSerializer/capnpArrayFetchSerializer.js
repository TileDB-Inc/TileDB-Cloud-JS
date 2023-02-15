"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const capnp = __importStar(require("capnp-ts"));
const query_capnp_1 = require("../../../capnp/query_capnp");
const capnpArrayFetchSerializer = (arrayFetch) => {
    var _a, _b, _c, _d;
    const message = new capnp.Message();
    const arrayFetchData = message.initRoot(query_capnp_1.ArrayOpen);
    arrayFetchData.setQueryType(arrayFetch.queryType || "READ");
    const entriesLength = (_b = (_a = arrayFetch.config) === null || _a === void 0 ? void 0 : _a.entries) === null || _b === void 0 ? void 0 : _b.length;
    if (entriesLength) {
        const config = arrayFetchData.initConfig();
        const entries = config.initEntries(entriesLength);
        (_d = (_c = arrayFetch.config) === null || _c === void 0 ? void 0 : _c.entries) === null || _d === void 0 ? void 0 : _d.forEach((entry, i) => {
            const entryData = entries.get(i);
            entryData.setKey(entry.key);
            entryData.setValue(entry.value);
        });
    }
    return message.toArrayBuffer();
};
exports.default = capnpArrayFetchSerializer;
//# sourceMappingURL=capnpArrayFetchSerializer.js.map