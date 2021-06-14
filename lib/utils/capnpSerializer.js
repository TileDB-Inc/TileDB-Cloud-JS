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
const arrayMetadata_capnp_1 = require("../capnp/arrayMetadata.capnp");
const capnp = __importStar(require("capnp-ts"));
const capnpSerializer = (data) => {
    if (data && Array.isArray(data.entries)) {
        const entriesLength = data.entries.length;
        const message = new capnp.Message();
        const metadata = message.initRoot(arrayMetadata_capnp_1.ArrayMetadata);
        const entries = metadata.initEntries(entriesLength);
        data.entries.forEach((entryData, i) => {
            const entry = entries.get(i);
            entry.setKey(entryData.key);
            entry.setType(entryData.type);
            entry.setValueNum(entryData.valueNum);
            const valueLength = entryData.value.length;
            const data = entry.initValue(valueLength);
            const arrBuffer = new ArrayBuffer(valueLength);
            const view = new Uint8Array(arrBuffer);
            entryData.value.forEach((num, i) => {
                view[i] = num;
            });
            data.copyBuffer(view);
            entry.setValue(data);
            entry.setDel(entryData.del);
        });
        return message;
    }
};
exports.default = capnpSerializer;
//# sourceMappingURL=capnpSerializer.js.map