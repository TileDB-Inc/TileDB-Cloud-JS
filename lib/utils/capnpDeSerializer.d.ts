import * as capnp from "capnp-ts";
export declare enum DeserializableType {
    "arrayMetadata" = 0,
    "query" = 1
}
export declare const deserializeCapnp: (data: any, type: DeserializableType) => {
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
        subarray: {
            int8: number[];
            uint8: number[];
            int16: number[];
            uint16: number[];
            int32: number[];
            uint32: number[];
            int64: capnp.Int64[];
            uint64: capnp.Uint64[];
            float32: number[];
            float64: number[];
        };
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
    array: {
        endTimestamp: number;
        queryType: string;
        uri: string;
        startTimestamp: number;
    };
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
} | {
    entries: {
        value: number[];
        del: boolean;
        key: string;
        type: string;
        valueNum: number;
    }[];
};
