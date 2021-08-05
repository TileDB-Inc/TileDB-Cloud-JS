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
/**
 * Serialize the Query object to capnp
 * @param data Query javascript object
 * @returns ArrayBuffer of the capnp Query object
 */
const capnpQuerySerializer = (data) => {
    const message = new capnp.Message();
    const queryData = message.initRoot(query_capnp_1.Query);
    const { reader = {}, writer = {}, array = {}, attributeBufferHeaders = [], layout = "", status = "", type = "", } = data;
    queryData.setLayout(layout);
    queryData.setStatus(status);
    queryData.setType(type);
    queryData.setTotalFixedLengthBufferBytes(capnp.Uint64.fromNumber(data.totalFixedLengthBufferBytes));
    queryData.setTotalVarLenBufferBytes(capnp.Uint64.fromNumber(data.totalVarLenBufferBytes));
    queryData.setTotalValidityBufferBytes(capnp.Uint64.fromNumber(data.totalValidityBufferBytes));
    queryData.setVarOffsetsMode("bytes");
    queryData.setVarOffsetsAddExtraElement(false);
    queryData.setVarOffsetsBitsize(64);
    const attrBuffers = queryData.initAttributeBufferHeaders(attributeBufferHeaders.length);
    attributeBufferHeaders.forEach((attrHeader, i) => {
        const attrBufferHeader = attrBuffers.get(i);
        attrBufferHeader.setName(attrHeader.name);
        attrBufferHeader.setFixedLenBufferSizeInBytes(capnp.Uint64.fromNumber(attrHeader.fixedLenBufferSizeInBytes));
        attrBufferHeader.setValidityLenBufferSizeInBytes(capnp.Uint64.fromNumber(attrHeader.validityLenBufferSizeInBytes));
        attrBufferHeader.setVarLenBufferSizeInBytes(capnp.Uint64.fromNumber(attrHeader.varLenBufferSizeInBytes));
        const { originalFixedLenBufferSizeInBytes = 0, originalVarLenBufferSizeInBytes = 0, originalValidityLenBufferSizeInBytes = 0, } = attrHeader;
        attrBufferHeader.setOriginalFixedLenBufferSizeInBytes(capnp.Uint64.fromNumber(originalFixedLenBufferSizeInBytes));
        attrBufferHeader.setOriginalVarLenBufferSizeInBytes(capnp.Uint64.fromNumber(originalVarLenBufferSizeInBytes));
        attrBufferHeader.setOriginalValidityLenBufferSizeInBytes(capnp.Uint64.fromNumber(originalValidityLenBufferSizeInBytes));
    });
    if (writer) {
        const { subarrayRanges = {}, subarray = {} } = writer;
        const queryWriter = queryData.initWriter();
        queryWriter.setCheckCoordDups(writer.checkCoordDups);
        queryWriter.setCheckCoordOOB(writer.checkCoordOOB);
        queryWriter.setDedupCoords(writer.dedupCoords);
        const writerSubArray = queryWriter.initSubarrayRanges();
        serializeSubArray(writerSubArray, subarrayRanges);
        const writerDomain = queryWriter.initSubarray();
        serializeDomainArray(writerDomain, subarray);
    }
    if (reader) {
        const queryReader = queryData.initReader();
        const subArrayCap = queryReader.initSubarray();
        const { subarray: subarrayData = {}, readState = {}, layout = "" } = reader;
        serializeSubArray(subArrayCap, subarrayData);
        queryReader.setLayout(layout);
        const readStateData = queryReader.initReadState();
        readStateData.setOverflowed(readState.overflowed);
        readStateData.setUnsplittable(readState.unsplittable);
        readStateData.setInitialized(readState.initialized);
        // subarrayPartitioner
        const { subarrayPartitioner = {} } = readState;
        const { budget = [], subarray = {}, current = {}, state = {}, memoryBudget = 0, memoryBudgetVar = 0, } = subarrayPartitioner;
        const subPartitioner = readStateData.initSubarrayPartitioner();
        subPartitioner.setMemoryBudget(capnp.Uint64.fromNumber(memoryBudget));
        subPartitioner.setMemoryBudgetVar(capnp.Uint64.fromNumber(memoryBudgetVar));
        // TODO: fix type
        // subPartitioner.setMemoryBudgetValidity(capnp.Uint64.fromNumber(0));
        const budgetData = subPartitioner.initBudget(budget.length);
        // subarrayPartitioner.Buget
        budget.forEach((b, i) => {
            const singleBudget = budgetData.get(i);
            singleBudget.setAttribute(b.attribute);
        });
        // subarrayPartitioner.Subarray
        const subArrayData = subPartitioner.initSubarray();
        serializeSubArray(subArrayData, subarray);
        // subarrayPartitioner.Current
        const currentData = subPartitioner.initCurrent();
        currentData.setSplitMultiRange(current.splitMultiRange);
        currentData.setStart(capnp.Uint64.fromNumber(current.start || 0));
        currentData.setEnd(capnp.Uint64.fromNumber(current.end || 0));
        const currentSubarray = currentData.initSubarray();
        serializeSubArray(currentSubarray, current.subarray || {});
        // subarrayPartitioner.State
        const capSubPartitionerState = subPartitioner.initState();
        capSubPartitionerState.setStart(capnp.Uint64.fromNumber(state.start || 0));
        capSubPartitionerState.setEnd(capnp.Uint64.fromNumber(state.end || 0));
        const multiRange = state.multiRange || [];
        const singleRange = state.singleRange || [];
        const capSubPartitionerStateMultiRange = capSubPartitionerState.initMultiRange(multiRange.length);
        const capSubPartitionerStateSingleRange = capSubPartitionerState.initSingleRange(singleRange.length);
        multiRange.forEach((mRange, i) => {
            const capMultiRange = capSubPartitionerStateMultiRange.get(i);
            serializeSubArray(capMultiRange, mRange);
        });
        singleRange.forEach((sRange, i) => {
            const capSingleRange = capSubPartitionerStateSingleRange.get(i);
            serializeSubArray(capSingleRange, sRange);
        });
    }
    if (array) {
        const queryArray = queryData.initArray();
        const startTimeStamp = clamp(array.startTimestamp || 0, 0, Date.now());
        queryArray.setStartTimestamp(capnp.Uint64.fromNumber(startTimeStamp));
        const endTimeStamp = clamp(array.endTimestamp || Date.now(), 0, Date.now());
        queryArray.setEndTimestamp(capnp.Uint64.fromNumber(endTimeStamp));
        queryArray.setQueryType(array.queryType || "");
        queryArray.setUri(array.uri || "");
    }
    return message.toArrayBuffer();
};
const add = (a, b) => a + b;
exports.default = capnpQuerySerializer;
const serializeDomainArray = (domainArray, data) => {
    const { float32 = [], float64 = [], int8 = [], int16 = [], int32 = [], int64 = [], uint8 = [], uint16 = [], uint32 = [], uint64 = [] } = data;
    const dFloat32 = domainArray.initFloat32(float32.length);
    float32.forEach((num, i) => {
        dFloat32.set(i, num);
    });
    const dFloat64 = domainArray.initFloat64(float64.length);
    float64.forEach((num, i) => {
        dFloat64.set(i, num);
    });
    const dInt8 = domainArray.initInt8(int8.length);
    int8.forEach((num, i) => {
        dInt8.set(i, num);
    });
    const dInt16 = domainArray.initInt16(int16.length);
    int16.forEach((num, i) => {
        dInt16.set(i, num);
    });
    const dInt32 = domainArray.initInt32(int32.length);
    int32.forEach((num, i) => {
        dInt32.set(i, num);
    });
    const dInt64 = domainArray.initInt64(int64.length);
    int64.forEach((num, i) => {
        dInt64.set(i, capnp.Int64.fromNumber(num));
    });
    const dUint8 = domainArray.initUint8(uint8.length);
    uint8.forEach((num, i) => {
        dUint8.set(i, num);
    });
    const dUint16 = domainArray.initUint16(uint16.length);
    uint16.forEach((num, i) => {
        dUint16.set(i, num);
    });
    const dUint32 = domainArray.initUint32(uint32.length);
    uint32.forEach((num, i) => {
        dUint32.set(i, num);
    });
    const dUint64 = domainArray.initUint64(uint64.length);
    uint64.forEach((num, i) => {
        dUint64.set(i, capnp.Uint64.fromNumber(num));
    });
};
const serializeSubArray = (capSubArray, subArray) => {
    const { ranges = [], layout = "" } = subArray;
    capSubArray.setLayout(layout);
    const capRanges = capSubArray.initRanges(ranges.length);
    ranges.forEach((range, i) => {
        const r = capRanges.get(i);
        const bufferSizesArray = range.bufferSizes || [];
        r.setType(range.type);
        r.setHasDefaultRange(range.hasDefaultRange);
        const totalBufferSize = bufferSizesArray.reduce(add);
        const bufferData = r.initBuffer(totalBufferSize);
        const view = Uint8Array.from(range.buffer);
        bufferData.copyBuffer(view);
        r.setBuffer(bufferData);
        const bufferSizes = r.initBufferSizes(bufferSizesArray.length);
        bufferSizesArray.forEach((bsize, i) => {
            bufferSizes.set(i, capnp.Uint64.fromNumber(bsize));
        });
        r.setBufferSizes(bufferSizes);
        const bufferStartSizesArray = range.bufferStartSizes || [];
        const bufferStartSizes = r.initBufferStartSizes(bufferStartSizesArray.length);
        bufferStartSizesArray.forEach((bsize, i) => {
            bufferStartSizes.set(i, capnp.Uint64.fromNumber(bsize));
        });
        r.setBufferStartSizes(bufferStartSizes);
    });
};
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
//# sourceMappingURL=capnpQuerySerializer.js.map