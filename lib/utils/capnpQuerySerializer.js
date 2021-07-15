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
const query_capnp_1 = require("../capnp/query.capnp");
const capnp = __importStar(require("capnp-ts"));
const capnpQuerySerializer = (data) => {
    var _a;
    const message = new capnp.Message();
    const queryData = message.initRoot(query_capnp_1.Query);
    const { reader } = data;
    queryData.setLayout(data.layout);
    queryData.setStatus(data.status || '');
    queryData.setType(data.type || '');
    queryData.setTotalFixedLengthBufferBytes(capnp.Uint64.fromNumber(data.totalFixedLengthBufferBytes));
    queryData.setTotalVarLenBufferBytes(capnp.Uint64.fromNumber(data.totalVarLenBufferBytes));
    if (reader) {
        const queryReader = queryData.initReader();
        const subArray = queryReader.initSubarray();
        subArray.setLayout(reader.layout);
        const subArrayRanges = ((_a = reader.subarray) === null || _a === void 0 ? void 0 : _a.ranges) || [];
        const numOfRanges = subArrayRanges.length;
        const ranges = subArray.initRanges(numOfRanges);
        subArrayRanges.forEach((subArrayRange, i) => {
            const range = ranges.get(i);
            range.setType(subArrayRange.type);
            range.setHasDefaultRange(subArrayRange.hasDefaultRange);
            const subArrayRangeBufferLength = subArrayRange.buffer.length;
            const bufferData = range.initBuffer(subArrayRangeBufferLength);
            const view = numbersToBuffer(subArrayRange.buffer, subArrayRangeBufferLength);
            bufferData.copyBuffer(view);
            range.setBuffer(bufferData);
        });
        queryReader.setLayout(reader.layout);
    }
    return message.toArrayBuffer();
};
exports.default = capnpQuerySerializer;
const numbersToBuffer = (nums, numsLength) => {
    const arrBuffer = new ArrayBuffer(numsLength);
    const view = new Uint8Array(arrBuffer);
    nums.forEach((num, i) => {
        view[i] = num;
    });
    return view;
};
//# sourceMappingURL=capnpQuerySerializer.js.map