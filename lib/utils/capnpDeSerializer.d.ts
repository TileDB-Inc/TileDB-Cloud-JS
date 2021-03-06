export declare enum DeserializableType {
    "arrayMetadata" = 0
}
export declare const deserializeCapnp: (data: any, type: DeserializableType) => {
    entries: {
        value: number[];
        del: boolean;
        key: string;
        type: string;
        valueNum: number;
    }[];
};
