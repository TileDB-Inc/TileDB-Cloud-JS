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
const v2_1 = require("../v2");
const query_capnp_1 = require("../capnp/query.capnp");
const capnp = __importStar(require("capnp-ts"));
const capnpQuerySerializer = (data) => {
    const message = new capnp.Message();
    const queryData = message.initRoot(query_capnp_1.Query);
    const { reader = {}, array = {}, attributeBufferHeaders = [], layout = "", status = "", type = "", } = data;
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
exports.default = capnpQuerySerializer;
const serializeSubArray = (capSubArray, subArray) => {
    const { ranges = [], layout = "" } = subArray;
    capSubArray.setLayout(layout);
    const capRanges = capSubArray.initRanges(ranges.length);
    ranges.forEach((range, i) => {
        const r = capRanges.get(i);
        const bufferSizesArray = range.bufferSizes || [];
        r.setType(range.type);
        r.setHasDefaultRange(range.hasDefaultRange);
        const [bufferSize] = bufferSizesArray;
        // const subArrayRangeBufferLength = range.buffer.length;
        const bufferData = r.initBuffer(bufferSize);
        const view = numbersToBuffer(range.buffer, bufferSize, range.type);
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
const numbersToBuffer = (nums, bufferSize, type) => {
    const arrBuffer = new ArrayBuffer(bufferSize);
    const TypedArray = getTypedArrayFromDataType(type);
    const BYTE_LENGTH = TypedArray.BYTES_PER_ELEMENT;
    const view = new Uint8Array(arrBuffer);
    nums.forEach((num, i) => {
        view[i * BYTE_LENGTH] = num;
    });
    return view;
};
const getTypedArrayFromDataType = (type) => {
    if (type === v2_1.Datatype.Int32) {
        return Int32Array;
    }
    else if (type === v2_1.Datatype.Int16) {
        return Int16Array;
    }
    else if (type === v2_1.Datatype.Int8) {
        return Int8Array;
    }
    else if (type === v2_1.Datatype.Int64) {
        return BigInt64Array;
    }
    else if (type === v2_1.Datatype.Uint16) {
        return Uint16Array;
    }
    else if (type === v2_1.Datatype.Uint32) {
        return Uint32Array;
    }
    else if (type === v2_1.Datatype.Uint8) {
        return Uint8Array;
    }
    else if (type === v2_1.Datatype.Uint64) {
        return BigUint64Array;
    }
    else if (type === v2_1.Datatype.Float32) {
        return Float32Array;
    }
    else if (type === v2_1.Datatype.Float64) {
        return Float64Array;
    }
    return Uint8Array;
};
//# sourceMappingURL=capnpQuerySerializer.js.map