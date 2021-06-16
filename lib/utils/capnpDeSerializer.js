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
exports.capnpDeserializer = void 0;
const arrayMetadata_capnp_1 = require("../capnp/arrayMetadata.capnp");
const capnp = __importStar(require("capnp-ts"));
const capnpDeserializer = (data, type) => {
    if (!isArrayBuffer(data)) {
        throw new Error(`Data is not of type ArrayBuffer`);
    }
    if (type === 'arrayMetadata') {
        return capnpArrayMetadaDeSerializer(data);
    }
};
exports.capnpDeserializer = capnpDeserializer;
const capnpArrayMetadaDeSerializer = (buffer) => {
    const message = new capnp.Message(buffer, false);
    const arrayMetadata = message.getRoot(arrayMetadata_capnp_1.ArrayMetadata);
    const entries = arrayMetadata.getEntries().map((entry) => {
        const value = entry.getValue().toArray();
        return {
            value,
            del: entry.getDel(),
            key: entry.getKey(),
            type: entry.getType(),
            valueNum: entry.getValueNum(),
        };
    });
    return { entries };
};
const isArrayBuffer = (data) => {
    if (data && data.byteLength && data.slice) {
        return true;
    }
    return false;
};
//# sourceMappingURL=capnpDeSerializer.js.map