import { ArraySchema } from "../v1";
import { ConfigurationParameters, Query } from "../v2";
import { Options } from "../utils/getResultsFromArrayBuffer";
declare type Range = number[] | string[];
export interface QueryData extends Pick<Query, "layout">, Options {
    ranges: Array<Range | Array<Range>>;
    /**
     * Number of bytes allocated to the server for the query.
     */
    bufferSize: number;
}
interface AttributeValue {
    validity?: number[];
    offsets?: number[];
    values: any[];
}
export declare type AttributeValues = Record<string, AttributeValue>;
export interface QueryWrite extends Pick<Query, "layout"> {
    values: AttributeValues;
    subarray?: Array<number[] | string[]>;
}
export declare class TileDBQuery {
    configurationParams: ConfigurationParameters;
    constructor(params: ConfigurationParameters);
    WriteQuery(namespace: string, arrayName: string, data: QueryWrite): Promise<{
        attributeBufferHeaders: {
            name: string;
            fixedLenBufferSizeInBytes: number;
            varLenBufferSizeInBytes: number;
            validityLenBufferSizeInBytes: number;
            originalFixedLenBufferSizeInBytes: number;
            originalVarLenBufferSizeInBytes: number;
            originalValidityLenBufferSizeInBytes: number;
        }[];
        layout: string; /**
         * Number of bytes allocated to the server for the query.
         */
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
                int64: import("capnp-ts").Int64[];
                uint64: import("capnp-ts").Uint64[];
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
                        }; /**
                         * Deserialize buffer to a Query object
                         */
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
                    op: string; /**
                     * Since we set the responseType to "arrayBuffer", in case the
                     * response error message is a buffer, we deserialize the message before throwing
                     */
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
    }>;
    ReadIncompleteQuery(arraySchema: ArraySchema, queryAsArrayBuffer: ArrayBuffer, namespace: string, arrayName: string, options: Options): Promise<{
        query: Query;
        results: Record<string, any>;
        queryAsArrayBuffer: ArrayBuffer;
    }>;
    ReadQuery(namespace: string, arrayName: string, body: QueryData): AsyncGenerator<{}, void, unknown>;
    private getResultsFromArrayBuffer;
    private throwError;
}
export default TileDBQuery;
