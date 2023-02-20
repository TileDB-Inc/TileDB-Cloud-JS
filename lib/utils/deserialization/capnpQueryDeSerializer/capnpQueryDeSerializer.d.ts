import { Array as ArrayCapnp, ArraySchema, Attribute, Dimension, Dimension_TileExtent, Domain, Filter_Data, Config, DomainArray, Filter, FilterPipeline, MapFloat64, MapUInt64, Query, QueryReader, Stats, Subarray, NonEmptyDomainList, NonEmptyDomain } from "../../../capnp/query_capnp";
import { ArrayMetadata, ArrayMetadata_MetadataEntry } from "../../../capnp/arrayMetadata_capnp";
import { DomainArray as DomainArrayV2, DimensionTileExtent, ArrayData, ArraySchema as ArraySchemaV2, FilterPipeline as FilterPipelineV2, Filter as FilterV2, Domain as DomainV2, Dimension as DimensionV2, Attribute as AttributeV2 } from "../../../v2";
/**
 * Deserializes an ArrayBuffer to a Query object
 * @param buffer ArrayBuffer of the capnp Query object
 * @returns Query object
 */
declare const capnpQueryDeSerializer: (buffer: ArrayBuffer | ArrayBufferLike) => {
    attributeBufferHeaders: {
        name: string;
        fixedLenBufferSizeInBytes: number;
        varLenBufferSizeInBytes: number;
        validityLenBufferSizeInBytes: number;
        originalFixedLenBufferSizeInBytes: number;
        originalVarLenBufferSizeInBytes: number;
        originalValidityLenBufferSizeInBytes: number;
    }[];
    layout: string;
    status: string;
    type: string;
    writer: {
        checkCoordDups: boolean;
        checkCoordOOB: boolean;
        dedupCoords: boolean;
        subarray: DomainArrayV2;
        subarrayRanges: {
            layout: string;
            stats: {
                timers: {
                    key: string;
                    value: number;
                }[];
                counters: {
                    key: string;
                    value: number;
                }[];
            };
            ranges: {
                type: string;
                hasDefaultRange: boolean;
                buffer: number[];
                bufferSizes: number[];
                bufferStartSizes: number[];
            }[];
        };
        stats: {
            timers: {
                key: string;
                value: number;
            }[];
            counters: {
                key: string;
                value: number;
            }[];
        };
    };
    reader: {
        layout: string;
        subarray: {
            layout: string;
            stats: {
                timers: {
                    key: string;
                    value: number;
                }[];
                counters: {
                    key: string;
                    value: number;
                }[];
            };
            ranges: {
                type: string;
                hasDefaultRange: boolean;
                buffer: number[];
                bufferSizes: number[];
                bufferStartSizes: number[];
            }[];
        };
        readState: {
            overflowed: boolean;
            unsplittable: boolean;
            initialized: boolean;
            subarrayPartitioner: {
                subarray: {
                    layout: string;
                    stats: {
                        timers: {
                            key: string;
                            value: number;
                        }[];
                        counters: {
                            key: string;
                            value: number;
                        }[];
                    };
                    ranges: {
                        type: string;
                        hasDefaultRange: boolean;
                        buffer: number[];
                        bufferSizes: number[];
                        bufferStartSizes: number[];
                    }[];
                };
                budget: {
                    attribute: string;
                }[];
                current: {
                    subarray: {
                        layout: string;
                        stats: {
                            timers: {
                                key: string;
                                value: number;
                            }[];
                            counters: {
                                key: string;
                                value: number;
                            }[];
                        };
                        ranges: {
                            type: string;
                            hasDefaultRange: boolean;
                            buffer: number[];
                            bufferSizes: number[];
                            bufferStartSizes: number[];
                        }[];
                    };
                    start: number;
                    end: number;
                    splitMultiRange: boolean;
                };
                state: {
                    start: number;
                    end: number;
                    singleRange: {
                        layout: string;
                        stats: {
                            timers: {
                                key: string;
                                value: number;
                            }[];
                            counters: {
                                key: string;
                                value: number;
                            }[];
                        };
                        ranges: {
                            type: string;
                            hasDefaultRange: boolean;
                            buffer: number[];
                            bufferSizes: number[];
                            bufferStartSizes: number[];
                        }[];
                    }[];
                    multiRange: {
                        layout: string;
                        stats: {
                            timers: {
                                key: string;
                                value: number;
                            }[];
                            counters: {
                                key: string;
                                value: number;
                            }[];
                        };
                        ranges: {
                            type: string;
                            hasDefaultRange: boolean;
                            buffer: number[];
                            bufferSizes: number[];
                            bufferStartSizes: number[];
                        }[];
                    }[];
                };
                memoryBudget: number;
                memoryBudgetVar: number;
                memoryBudgetValidity: number;
                stats: {
                    timers: {
                        key: string;
                        value: number;
                    }[];
                    counters: {
                        key: string;
                        value: number;
                    }[];
                };
            };
        };
        condition: {
            clauses: {
                fieldName: string;
                value: number[];
                op: string;
            }[];
            clauseCombinationOps: string[];
        };
        stats: {
            timers: {
                key: string;
                value: number;
            }[];
            counters: {
                key: string;
                value: number;
            }[];
        };
    };
    array: ArrayData;
    totalFixedLengthBufferBytes: number;
    totalVarLenBufferBytes: number;
    totalValidityBufferBytes: number;
    varOffsetsMode: string;
    varOffsetsAddExtraElement: boolean;
    varOffsetsBitsize: number;
    config: {
        entries: {
            key: string;
            value: string;
        }[];
    };
    stats: {
        timers: {
            key: string;
            value: number;
        }[];
        counters: {
            key: string;
            value: number;
        }[];
    };
};
export default capnpQueryDeSerializer;
export declare const deserializeArray: (arr: ArrayCapnp) => ArrayData;
export declare const deserializeNonEmptyDomainList: (nonEmptyDomainList: NonEmptyDomainList) => {
    nonEmptyDomains: {
        isEmpty: boolean;
        sizes: number[];
        nonEmptyDomain: DomainArrayV2;
    }[];
};
export declare const deserializeNonEmptyDomain: (nonEmptyDomain: NonEmptyDomain) => {
    isEmpty: boolean;
    sizes: number[];
    nonEmptyDomain: DomainArrayV2;
};
export declare const deserializeArrayMetadata: (arrayMetadata: ArrayMetadata) => {
    entries: {
        key: string;
        type: string;
        valueNum: number;
        del: boolean;
    }[];
};
export declare const deserializeMetadataEntry: (entry: ArrayMetadata_MetadataEntry) => {
    key: string;
    type: string;
    valueNum: number;
    del: boolean;
};
export declare const deserializeArraySchema: (schema: ArraySchema) => ArraySchemaV2;
export declare const deserializeAttribute: (attribute: Attribute) => AttributeV2;
export declare const deserializeDomain: (domain: Domain) => DomainV2;
export declare const deserializeDimension: (dimension: Dimension) => DimensionV2;
export declare const deserializeTileExtent: (tileExtent: Dimension_TileExtent) => DimensionTileExtent;
export declare const deserializeFilterPipeline: (filterPipeline: FilterPipeline) => FilterPipelineV2;
export declare const deserializeFilter: (filter: Filter) => FilterV2;
export declare const deserializeFilterData: (data: Filter_Data) => {};
export declare const deserializeConfig: (config: Config) => {
    entries: {
        key: string;
        value: string;
    }[];
};
export declare const deserializeQueryReader: (reader: QueryReader) => {
    layout: string;
    subarray: {
        layout: string;
        stats: {
            timers: {
                key: string;
                value: number;
            }[];
            counters: {
                key: string;
                value: number;
            }[];
        };
        ranges: {
            type: string;
            hasDefaultRange: boolean;
            buffer: number[];
            bufferSizes: number[];
            bufferStartSizes: number[];
        }[];
    };
    readState: {
        overflowed: boolean;
        unsplittable: boolean;
        initialized: boolean;
        subarrayPartitioner: {
            subarray: {
                layout: string;
                stats: {
                    timers: {
                        key: string;
                        value: number;
                    }[];
                    counters: {
                        key: string;
                        value: number;
                    }[];
                };
                ranges: {
                    type: string;
                    hasDefaultRange: boolean;
                    buffer: number[];
                    bufferSizes: number[];
                    bufferStartSizes: number[];
                }[];
            };
            budget: {
                attribute: string;
            }[];
            current: {
                subarray: {
                    layout: string;
                    stats: {
                        timers: {
                            key: string;
                            value: number;
                        }[];
                        counters: {
                            key: string;
                            value: number;
                        }[];
                    };
                    ranges: {
                        type: string;
                        hasDefaultRange: boolean;
                        buffer: number[];
                        bufferSizes: number[];
                        bufferStartSizes: number[];
                    }[];
                };
                start: number;
                end: number;
                splitMultiRange: boolean;
            };
            state: {
                start: number;
                end: number;
                singleRange: {
                    layout: string;
                    stats: {
                        timers: {
                            key: string;
                            value: number;
                        }[];
                        counters: {
                            key: string;
                            value: number;
                        }[];
                    };
                    ranges: {
                        type: string;
                        hasDefaultRange: boolean;
                        buffer: number[];
                        bufferSizes: number[];
                        bufferStartSizes: number[];
                    }[];
                }[];
                multiRange: {
                    layout: string;
                    stats: {
                        timers: {
                            key: string;
                            value: number;
                        }[];
                        counters: {
                            key: string;
                            value: number;
                        }[];
                    };
                    ranges: {
                        type: string;
                        hasDefaultRange: boolean;
                        buffer: number[];
                        bufferSizes: number[];
                        bufferStartSizes: number[];
                    }[];
                }[];
            };
            memoryBudget: number;
            memoryBudgetVar: number;
            memoryBudgetValidity: number;
            stats: {
                timers: {
                    key: string;
                    value: number;
                }[];
                counters: {
                    key: string;
                    value: number;
                }[];
            };
        };
    };
    condition: {
        clauses: {
            fieldName: string;
            value: number[];
            op: string;
        }[];
        clauseCombinationOps: string[];
    };
    stats: {
        timers: {
            key: string;
            value: number;
        }[];
        counters: {
            key: string;
            value: number;
        }[];
    };
};
export declare const deserializeWrite: (query: Query) => {
    checkCoordDups: boolean;
    checkCoordOOB: boolean;
    dedupCoords: boolean;
    subarray: DomainArrayV2;
    subarrayRanges: {
        layout: string;
        stats: {
            timers: {
                key: string;
                value: number;
            }[];
            counters: {
                key: string;
                value: number;
            }[];
        };
        ranges: {
            type: string;
            hasDefaultRange: boolean;
            buffer: number[];
            bufferSizes: number[];
            bufferStartSizes: number[];
        }[];
    };
    stats: {
        timers: {
            key: string;
            value: number;
        }[];
        counters: {
            key: string;
            value: number;
        }[];
    };
};
export declare const deserializeDomainArray: (domainArray: DomainArray) => DomainArrayV2;
export declare const deserializeSubarray: (subArray: Subarray) => {
    layout: string;
    stats: {
        timers: {
            key: string;
            value: number;
        }[];
        counters: {
            key: string;
            value: number;
        }[];
    };
    ranges: {
        type: string;
        hasDefaultRange: boolean;
        buffer: number[];
        bufferSizes: number[];
        bufferStartSizes: number[];
    }[];
};
export declare const deserializeStats: (stats: Stats) => {
    timers: {
        key: string;
        value: number;
    }[];
    counters: {
        key: string;
        value: number;
    }[];
};
export declare const deserializeMapFloat64: (mapFloat64: MapFloat64) => {
    key: string;
    value: number;
}[];
export declare const deserializeMapUInt64: (mapUint64: MapUInt64) => {
    key: string;
    value: number;
}[];
