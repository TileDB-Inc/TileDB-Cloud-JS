import { ArrayMetadata as ArrayMetadataType } from './../api';
export declare const capnpArrayMetadaDeSerializer: (buffer: ArrayBuffer | ArrayBufferLike | ArrayMetadataType) => {
    entries: {
        value: number[];
        del: boolean;
        key: string;
        type: string;
        valueNum: number;
    }[];
};
