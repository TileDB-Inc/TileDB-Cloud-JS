import { Attribute, Dimension } from "../v1";
import { AttributeBufferHeader, ConfigurationParameters } from "../v2";
import { Query } from "../v2";
declare type Range = number[] | string[];
export interface QueryData extends Pick<Query, "layout"> {
    ranges: Array<Range | Array<Range>>;
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
                    }[]; /**
                     * Calculate the total bytes of all the attributes
                     * @param attributes
                     * @returns number of the total bytes of all the attributes
                     */
                    counters: {
                        key: string;
                        value: number;
                    }[];
                };
                ranges: {
                    type: string;
                    hasDefaultRange: boolean;
                    /**
                     * Add all buffers of an attribute
                     * @param attr AttributeBufferHeader
                     * @returns number of the total bytes of the attribute
                     */
                    buffer: number[];
                    bufferSizes: number[];
                    bufferStartSizes: number[];
                }[];
            };
            stats: {
                timers: {
                    key: string;
                    value: number;
                }[]; /**
                 * Calculate the total bytes of all the attributes
                 * @param attributes
                 * @returns number of the total bytes of all the attributes
                 */
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
                    }[]; /**
                     * Calculate the total bytes of all the attributes
                     * @param attributes
                     * @returns number of the total bytes of all the attributes
                     */
                    counters: {
                        key: string;
                        value: number;
                    }[];
                };
                ranges: {
                    type: string;
                    hasDefaultRange: boolean;
                    /**
                     * Add all buffers of an attribute
                     * @param attr AttributeBufferHeader
                     * @returns number of the total bytes of the attribute
                     */
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
                            }[]; /**
                             * Calculate the total bytes of all the attributes
                             * @param attributes
                             * @returns number of the total bytes of all the attributes
                             */
                            counters: {
                                key: string;
                                value: number;
                            }[];
                        };
                        ranges: {
                            type: string;
                            hasDefaultRange: boolean;
                            /**
                             * Add all buffers of an attribute
                             * @param attr AttributeBufferHeader
                             * @returns number of the total bytes of the attribute
                             */
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
                                }[]; /**
                                 * Calculate the total bytes of all the attributes
                                 * @param attributes
                                 * @returns number of the total bytes of all the attributes
                                 */
                                counters: {
                                    key: string;
                                    value: number;
                                }[];
                            };
                            ranges: {
                                type: string;
                                hasDefaultRange: boolean;
                                /**
                                 * Add all buffers of an attribute
                                 * @param attr AttributeBufferHeader
                                 * @returns number of the total bytes of the attribute
                                 */
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
                                }[]; /**
                                 * Calculate the total bytes of all the attributes
                                 * @param attributes
                                 * @returns number of the total bytes of all the attributes
                                 */
                                counters: {
                                    key: string;
                                    value: number;
                                }[];
                            };
                            ranges: {
                                type: string;
                                hasDefaultRange: boolean;
                                /**
                                 * Add all buffers of an attribute
                                 * @param attr AttributeBufferHeader
                                 * @returns number of the total bytes of the attribute
                                 */
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
                                }[]; /**
                                 * Calculate the total bytes of all the attributes
                                 * @param attributes
                                 * @returns number of the total bytes of all the attributes
                                 */
                                counters: {
                                    key: string;
                                    value: number;
                                }[];
                            };
                            ranges: {
                                type: string;
                                hasDefaultRange: boolean;
                                /**
                                 * Add all buffers of an attribute
                                 * @param attr AttributeBufferHeader
                                 * @returns number of the total bytes of the attribute
                                 */
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
                        }[]; /**
                         * Calculate the total bytes of all the attributes
                         * @param attributes
                         * @returns number of the total bytes of all the attributes
                         */
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
                }[]; /**
                 * Calculate the total bytes of all the attributes
                 * @param attributes
                 * @returns number of the total bytes of all the attributes
                 */
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
            }[]; /**
             * Calculate the total bytes of all the attributes
             * @param attributes
             * @returns number of the total bytes of all the attributes
             */
            counters: {
                key: string;
                value: number;
            }[];
        };
    }>;
    ReadQuery(namespace: string, arrayName: string, body: QueryData): Promise<{}>;
}
export default TileDBQuery;
/**
 * Convert an ArrayBuffer to a map of attributes with their results
 * @param arrayBuffer The slice ArrayBuffer that contains the results
 * @param attributes
 * @param attributesSchema
 * @returns A map of attribute names with the results of every attribute
 */
export declare const getResults: (arrayBuffer: ArrayBuffer, attributes: AttributeBufferHeader[], attributesSchema: Array<Dimension | Attribute>) => {};
