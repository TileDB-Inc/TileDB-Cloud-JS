export declare enum DeserializableType {
    "arrayMetadata" = 0,
    "query" = 1,
    "array" = 2
}
export declare const deserializeCapnp: (data: any, type: DeserializableType) => unknown;
