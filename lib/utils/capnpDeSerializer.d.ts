declare type DeserializableTypes = "arrayMetadata";
export declare const capnpDeserializer: (data: any, type: DeserializableTypes) => {
    entries: {
        value: number[];
        del: boolean;
        key: string;
        type: string;
        valueNum: number;
    }[];
};
export {};
