"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeCapnp = exports.DeserializableType = void 0;
const capnp = __importStar(require("capnp-ts"));
const arrayMetadata_capnp_1 = require("../../../capnp/arrayMetadata_capnp");
const capnpQueryDeSerializer_1 = __importDefault(require("../capnpQueryDeSerializer"));
const capnpArrayDeserializer_1 = __importDefault(require("../capnpArrayDeserializer"));
var DeserializableType;
(function (DeserializableType) {
    DeserializableType[DeserializableType["arrayMetadata"] = 0] = "arrayMetadata";
    DeserializableType[DeserializableType["query"] = 1] = "query";
    DeserializableType[DeserializableType["array"] = 2] = "array";
})(DeserializableType = exports.DeserializableType || (exports.DeserializableType = {}));
const deserializeCapnp = (data, type) => {
    if (!isArrayBuffer(data)) {
        throw new Error(`Data is not of type ArrayBuffer`);
    }
    if (type === DeserializableType.array) {
        return (0, capnpArrayDeserializer_1.default)(data);
    }
    if (type === DeserializableType.query) {
        return (0, capnpQueryDeSerializer_1.default)(data);
    }
    if (type === DeserializableType.arrayMetadata) {
        return capnpArrayMetadaDeSerializer(data);
    }
};
exports.deserializeCapnp = deserializeCapnp;
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