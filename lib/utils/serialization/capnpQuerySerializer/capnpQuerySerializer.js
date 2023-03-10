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
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeArray = exports.serializeArrayData = void 0;
const query_capnp_1 = require("../../../capnp/query_capnp");
const capnp = __importStar(require("capnp-ts"));
/**
 * Serialize the Query object to capnp
 * @param data Query javascript object
 * @returns ArrayBuffer of the capnp Query object
 */
const capnpQuerySerializer = (data) => {
    const message = new capnp.Message();
    const queryData = message.initRoot(query_capnp_1.Query);
    const { reader = {}, writer = {}, array, attributeBufferHeaders = [], layout = "", status = "", type = "", } = data;
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
        (0, exports.serializeArray)(queryData.initArray(), array);
    }
    return message.toArrayBuffer();
};
const add = (a, b) => a + b;
exports.default = capnpQuerySerializer;
const serializeArrayData = (array) => {
    const message = new capnp.Message();
    const arrayData = message.initRoot(query_capnp_1.Array);
    (0, exports.serializeArray)(arrayData, array);
    return message.toArrayBuffer();
};
exports.serializeArrayData = serializeArrayData;
const serializeArray = (arrayCapNp, array) => {
    const startTimeStamp = clamp(array.startTimestamp || 0, 0, Date.now());
    arrayCapNp.setStartTimestamp(capnp.Uint64.fromNumber(startTimeStamp));
    const endTimeStamp = clamp(array.endTimestamp || Date.now(), 0, Date.now());
    arrayCapNp.setEndTimestamp(capnp.Uint64.fromNumber(endTimeStamp));
    arrayCapNp.setQueryType(array.queryType || "");
    arrayCapNp.setUri(array.uri || "");
    if (array.arraySchemaLatest) {
        serializeArraySchema(arrayCapNp.initArraySchemaLatest(), array.arraySchemaLatest);
    }
    if (array.nonEmptyDomain) {
        serializeNonEmptyDomainList(arrayCapNp.initNonEmptyDomain(), array.nonEmptyDomain);
    }
    if (array.arrayMetadata) {
        serializeArrayMetadata(arrayCapNp.initArrayMetadata(), array.arrayMetadata);
    }
    if (array.arraySchemasAll) {
        serializeArraySchemasAll(arrayCapNp.initArraySchemasAll(), array.arraySchemasAll);
    }
    if (array.arrayDirectory) {
        serializeArrayDirectory(arrayCapNp.initArrayDirectory(), array.arrayDirectory);
    }
};
exports.serializeArray = serializeArray;
const serializeArrayDirectory = (arrayDirectoryCapnp, arrayDirectory) => {
    if (arrayDirectory.unfilteredFragmentUris.length) {
        const unfilteredFragmentUrisCapnp = arrayDirectoryCapnp.initUnfilteredFragmentUris(arrayDirectory.unfilteredFragmentUris.length);
        arrayDirectory.unfilteredFragmentUris.forEach((unfilteredFragmentUri, i) => {
            unfilteredFragmentUrisCapnp.set(i, unfilteredFragmentUri);
        });
    }
    if (arrayDirectory.consolidatedCommitUris.length) {
        const consolidatedCommitUrisCapnp = arrayDirectoryCapnp.initConsolidatedCommitUris(arrayDirectory.consolidatedCommitUris.length);
        arrayDirectory.consolidatedCommitUris.forEach((consolidatedCommitUri, i) => {
            consolidatedCommitUrisCapnp.set(i, consolidatedCommitUri);
        });
    }
    if (arrayDirectory.arraySchemaUris.length) {
        const arraySchemaUrisCapnp = arrayDirectoryCapnp.initArraySchemaUris(arrayDirectory.arraySchemaUris.length);
        arrayDirectory.arraySchemaUris.forEach((arraySchemaUri, i) => {
            arraySchemaUrisCapnp.set(i, arraySchemaUri);
        });
    }
    arrayDirectoryCapnp.setLatestArraySchemaUri(arrayDirectory.latestArraySchemaUri);
    if (arrayDirectory.arrayMetaUrisToVacuum.length) {
        const arrayMetaUrisToVacuumCapnp = arrayDirectoryCapnp.initArrayMetaUrisToVacuum(arrayDirectory.arrayMetaUrisToVacuum.length);
        arrayDirectory.arrayMetaUrisToVacuum.forEach((arrayMetaUriToVacuum, i) => {
            arrayMetaUrisToVacuumCapnp.set(i, arrayMetaUriToVacuum);
        });
    }
    if (arrayDirectory.arrayMetaVacUrisToVacuum.length) {
        const arrayMetaVacUrisToVacuumCapnp = arrayDirectoryCapnp.initArrayMetaVacUrisToVacuum(arrayDirectory.arrayMetaVacUrisToVacuum.length);
        arrayDirectory.arrayMetaVacUrisToVacuum.forEach((arrayMetaVacUriToVacuum, i) => {
            arrayMetaVacUrisToVacuumCapnp.set(i, arrayMetaVacUriToVacuum);
        });
    }
    if (arrayDirectory.commitUrisToConsolidate.length) {
        const commitUrisToConsolidateCapnp = arrayDirectoryCapnp.initCommitUrisToConsolidate(arrayDirectory.commitUrisToConsolidate.length);
        arrayDirectory.commitUrisToConsolidate.forEach((commitUriToConsolidate, i) => {
            commitUrisToConsolidateCapnp.set(i, commitUriToConsolidate);
        });
    }
    if (arrayDirectory.commitUrisToVacuum.length) {
        const commitUrisToVacuumCapnp = arrayDirectoryCapnp.initCommitUrisToVacuum(arrayDirectory.commitUrisToVacuum.length);
        arrayDirectory.commitUrisToVacuum.forEach((commitUriToVacuum, i) => {
            commitUrisToVacuumCapnp.set(i, commitUriToVacuum);
        });
    }
    if (arrayDirectory.consolidatedCommitUrisToVacuum.length) {
        const consolidatedCommitUrisToVacuumCapnp = arrayDirectoryCapnp.initConsolidatedCommitUrisToVacuum(arrayDirectory.consolidatedCommitUrisToVacuum.length);
        arrayDirectory.consolidatedCommitUrisToVacuum.forEach((consolidatedCommitUriToVacuum, i) => {
            consolidatedCommitUrisToVacuumCapnp.set(i, consolidatedCommitUriToVacuum);
        });
    }
    if (arrayDirectory.arrayMetaUris.length) {
        arrayDirectoryCapnp
            .initArrayMetaUris(arrayDirectory.arrayMetaUris.length)
            .map((metaURICapnp, i) => serializeArrayMetaUri(metaURICapnp, arrayDirectory.arrayMetaUris[i]));
    }
    if (arrayDirectory.fragmentMetaUris.length) {
        const fragmentMetaUrisCapnp = arrayDirectoryCapnp.initFragmentMetaUris(arrayDirectory.fragmentMetaUris.length);
        arrayDirectory.fragmentMetaUris.forEach((fragmentURI, i) => {
            fragmentMetaUrisCapnp.set(i, fragmentURI);
        });
    }
    if (arrayDirectory.deleteAndUpdateTileLocation.length) {
        arrayDirectoryCapnp
            .initDeleteAndUpdateTileLocation(arrayDirectory.deleteAndUpdateTileLocation.length)
            .map((deleteAndUpdateTileLocationCapnp, i) => serializeDeleteAndUpdateTileLocation(deleteAndUpdateTileLocationCapnp, arrayDirectory.deleteAndUpdateTileLocation[i]));
    }
    arrayDirectoryCapnp.setTimestampStart(capnp.Uint64.fromNumber(arrayDirectory.timestampStart || 0));
    arrayDirectoryCapnp.setTimestampEnd(capnp.Uint64.fromNumber(arrayDirectory.timestampEnd || 0));
};
const serializeDeleteAndUpdateTileLocation = (deleteAndUpdateTileLocationCapnp, deleteAndUpdateTileLocation) => {
    deleteAndUpdateTileLocationCapnp.setConditionMarker(deleteAndUpdateTileLocation.conditionMarker);
    deleteAndUpdateTileLocationCapnp.setUri(deleteAndUpdateTileLocation.uri);
    deleteAndUpdateTileLocationCapnp.setOffset(capnp.Uint64.fromNumber(deleteAndUpdateTileLocation.offset));
};
const serializeArrayMetaUri = (arrayMetaUriCapnp, timestampedURI) => {
    arrayMetaUriCapnp.setTimestampStart(capnp.Uint64.fromNumber(timestampedURI.timestampStart));
    arrayMetaUriCapnp.setTimestampEnd(capnp.Uint64.fromNumber(timestampedURI.timestampEnd));
    arrayMetaUriCapnp.setUri(timestampedURI.uri);
};
const serializeArraySchemasAll = (arraySchemasAllCapnp, arraySchemasAll) => {
    const entriesCapnp = arraySchemasAllCapnp.initEntries(arraySchemasAll.entries.length);
    entriesCapnp.forEach((entryCapnp, i) => {
        const entry = arraySchemasAll.entries[i];
        entryCapnp.setKey(entry.key);
        serializeArraySchema(entryCapnp.initValue(), entry.value);
    });
};
const serializeArrayMetadata = (arrayMetadataCapnp, arrayMetadata) => {
    const { entries = [] } = arrayMetadata;
    const entriesCapnp = arrayMetadataCapnp.initEntries(arrayMetadata.entries.length || 0);
    entriesCapnp.forEach((entryCapnp, i) => {
        const entry = entries[i];
        entryCapnp.setKey(entry.key);
        entryCapnp.setDel(entry.del);
        entryCapnp.setType(entry.type);
        entryCapnp.setValueNum(entry.valueNum);
        if (entry.value.length) {
            const entryList = entryCapnp.initValue(entry.value.length);
            entryList.forEach((entryC, i) => {
                entryList.set(i, entry.value[i]);
            });
        }
    });
};
const serializeNonEmptyDomainList = (nonEmptyDomainListCapnp, nonEmptyDomainList) => {
    if (nonEmptyDomainList.nonEmptyDomains.length) {
        const nonEmptyDomains = nonEmptyDomainListCapnp.initNonEmptyDomains(nonEmptyDomainList.nonEmptyDomains.length);
        nonEmptyDomains.forEach((nonEmptyDomainCapnp, i) => {
            serializeNonEmptyDomain(nonEmptyDomainCapnp, nonEmptyDomainList.nonEmptyDomains[i]);
        });
    }
};
const serializeNonEmptyDomain = (nonEmptyDomainCapnp, nonEmptyDomain) => {
    nonEmptyDomainCapnp.setIsEmpty(nonEmptyDomain.isEmpty);
    serializeDomainArray(nonEmptyDomainCapnp.initNonEmptyDomain(), nonEmptyDomain.nonEmptyDomain);
    const sizes = nonEmptyDomainCapnp.initSizes(nonEmptyDomain.sizes.length);
    nonEmptyDomain.sizes.forEach((size, i) => {
        sizes.set(i, capnp.Uint64.fromNumber(size));
    });
};
const serializeArraySchema = (arraySchemaCapnp, arraySchema) => {
    var _a;
    arraySchemaCapnp.setArrayType(arraySchema.arrayType);
    arraySchemaCapnp.setCapacity(capnp.Uint64.fromNumber(arraySchema.capacity));
    arraySchemaCapnp.setCellOrder(arraySchema.cellOrder);
    arraySchemaCapnp.setTileOrder(arraySchema.tileOrder);
    arraySchemaCapnp.setUri(arraySchema.uri);
    arraySchemaCapnp.setAllowsDuplicates(arraySchema.allowsDuplicates);
    arraySchemaCapnp.setName(arraySchema.name);
    const versions = arraySchemaCapnp.initVersion(arraySchema.version.length || 0);
    arraySchema.version.forEach((num, i) => {
        versions.set(i, num);
    });
    const timestamps = arraySchemaCapnp.initTimestampRange(arraySchema.timestampRange.length || 0);
    arraySchema.timestampRange.forEach((num, i) => {
        timestamps.set(i, capnp.Uint64.fromNumber(num));
    });
    serializeFilterPipeline(arraySchemaCapnp.initCoordsFilterPipeline(), arraySchema.coordsFilterPipeline);
    serializeFilterPipeline(arraySchemaCapnp.initOffsetFilterPipeline(), arraySchema.offsetFilterPipeline);
    serializeFilterPipeline(arraySchemaCapnp.initValidityFilterPipeline(), arraySchema.validityFilterPipeline);
    if ((_a = arraySchema.attributes) === null || _a === void 0 ? void 0 : _a.length) {
        const attributes = arraySchemaCapnp.initAttributes(arraySchema.attributes.length);
        attributes.map((attr, i) => serializeAttribute(attr, arraySchema.attributes[i]));
    }
    serializeDomain(arraySchemaCapnp.initDomain(), arraySchema.domain);
    return arraySchemaCapnp;
};
const serializeDomain = (domainCapnp, domain) => {
    domainCapnp.setCellOrder(domain.cellOrder);
    domainCapnp.setTileOrder(domain.tileOrder);
    domainCapnp.setType(domain.type);
    const dimensions = domainCapnp.initDimensions(domain.dimensions.length);
    dimensions.forEach((dimensionCapnp, i) => {
        serializeDimension(dimensionCapnp, domain.dimensions[i]);
    });
};
const serializeDimension = (dimensionCapnp, dimension) => {
    dimensionCapnp.setName(dimension.name);
    dimensionCapnp.setNullTileExtent(dimension.nullTileExtent);
    dimensionCapnp.setType(dimension.type);
    serializeFilterPipeline(dimensionCapnp.initFilterPipeline(), dimension.filterPipeline);
    serializeDomainArray(dimensionCapnp.initDomain(), dimension.domain);
    const { tileExtent } = dimension;
    const tileExtentCapnp = dimensionCapnp.initTileExtent();
    if (tileExtent.float32) {
        tileExtentCapnp.setFloat32(tileExtent.float32);
    }
    if (tileExtent.float64) {
        tileExtentCapnp.setFloat64(tileExtent.float64);
    }
    if (tileExtent.int16) {
        tileExtentCapnp.setInt16(tileExtent.int16);
    }
    if (tileExtent.int32) {
        tileExtentCapnp.setInt32(tileExtent.int32);
    }
    if (tileExtent.int64) {
        tileExtentCapnp.setInt64(capnp.Int64.fromNumber(tileExtent.int64));
    }
    if (tileExtent.int8) {
        tileExtentCapnp.setInt8(tileExtent.int8);
    }
    if (tileExtent.uint16) {
        tileExtentCapnp.setUint16(tileExtent.uint16);
    }
    if (tileExtent.uint32) {
        tileExtentCapnp.setUint32(tileExtent.uint32);
    }
    if (tileExtent.uint64) {
        tileExtentCapnp.setUint64(capnp.Uint64.fromNumber(tileExtent.uint64));
    }
    if (tileExtent.uint8) {
        tileExtentCapnp.setUint8(tileExtent.uint8);
    }
};
const serializeAttribute = (attributeCapnp, attribute) => {
    attributeCapnp.setCellValNum(attribute.cellValNum);
    attributeCapnp.setName(attribute.name);
    attributeCapnp.setType(attribute.type);
    attributeCapnp.setNullable(attribute.nullable);
    attributeCapnp.setFillValueValidity(attribute.fillValueValidity);
    if (attribute.fillValue.length) {
        const fillValueData = attributeCapnp.initFillValue(attribute.fillValue.length);
        attribute.fillValue.forEach((fillValue, i) => {
            fillValueData.set(i, fillValue);
        });
    }
    serializeFilterPipeline(attributeCapnp.initFilterPipeline(), attribute.filterPipeline);
};
const serializeFilterPipeline = (filterPipelineCapnp, filterPipeline) => {
    const filters = filterPipelineCapnp.initFilters(filterPipeline.filters.length || 0);
    filters.map((filter, i) => {
        const filterData = filterPipeline.filters[i];
        filter.setType(filterData.type);
        const data = filter.initData();
        if (filterData.data.float32) {
            data.setFloat32(filterData.data.float32);
        }
        if (filterData.data.float64) {
            data.setFloat64(filterData.data.float64);
        }
        if (filterData.data.int32) {
            data.setInt32(filterData.data.int32);
        }
        if (filterData.data.int16) {
            data.setInt16(filterData.data.int16);
        }
        if (filterData.data.int8) {
            data.setInt8(filterData.data.int8);
        }
        if (filterData.data.int64) {
            data.setInt64(capnp.Int64.fromNumber(filterData.data.int64));
        }
        if (filterData.data.uint16) {
            data.setUint16(filterData.data.uint16);
        }
        if (filterData.data.uint32) {
            data.setUint32(filterData.data.uint32);
        }
        if (filterData.data.uint8) {
            data.setUint8(filterData.data.uint8);
        }
        if (filterData.data.uint64) {
            data.setUint64(capnp.Uint64.fromNumber(filterData.data.uint64));
        }
        if (filterData.floatScaleConfig) {
            serializeFloatScaleConfig(filter.initFloatScaleConfig(), filterData.floatScaleConfig);
        }
        return filter;
    });
    filterPipelineCapnp.setFilters(filters);
    return filterPipelineCapnp;
};
const serializeFloatScaleConfig = (floatScaleConfig, floatScaleData) => {
    if (floatScaleData.byteWidth) {
        floatScaleConfig.setByteWidth(capnp.Uint64.fromNumber(floatScaleData.byteWidth));
    }
    if (floatScaleData.offset) {
        floatScaleConfig.setOffset(floatScaleData.offset);
    }
    if (floatScaleData.scale) {
        floatScaleConfig.setScale(floatScaleData.scale);
    }
};
const serializeDomainArray = (domainArray, data) => {
    const { float32 = [], float64 = [], int8 = [], int16 = [], int32 = [], int64 = [], uint8 = [], uint16 = [], uint32 = [], uint64 = [], } = data;
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