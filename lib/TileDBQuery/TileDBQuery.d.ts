import { ConfigurationParameters, Query, Querytype, ArrayData } from "../v3";
import { ArraySchema } from "../v2";
import { Options } from "../utils/getResultsFromArrayBuffer";
import { AxiosInstance } from "axios";
type Range = number[] | string[];
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
export type AttributeValues = Record<string, AttributeValue>;
export interface QueryWrite extends Pick<Query, "layout"> {
    values: AttributeValues;
    subarray?: Array<number[] | string[]>;
}
export declare class TileDBQuery {
    configurationParams: ConfigurationParameters;
    private axios;
    private queryAPI;
    private arrayAPIV2;
    private config;
    constructor(params: ConfigurationParameters, axios?: AxiosInstance);
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
        layout: string;
        status: string;
        type: string;
        writer: {
            checkCoordDups: boolean;
            checkCoordOOB: boolean;
            dedupCoords: boolean;
            subarray: import("../v2").DomainArray;
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
        array: import("../v2").ArrayData;
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
    ReadQuery(namespace: string, arrayName: string, body: QueryData, arraySchema?: ArraySchema, queryObj?: any): AsyncGenerator<{}, void, unknown>;
    private getResultsFromArrayBuffer;
    private throwError;
    ArrayOpen(namespace: string, array: string, queryType: Querytype): Promise<ArrayData>;
}
export default TileDBQuery;
