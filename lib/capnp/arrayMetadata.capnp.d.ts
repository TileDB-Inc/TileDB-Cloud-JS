/**
 * This file has been automatically generated by the [capnpc-ts utility](https://github.com/jdiaz5513/capnp-ts).
 */
import * as capnp from "capnp-ts";
import { Struct as __S } from 'capnp-ts';
export declare const _capnpFileId = "b57d9224b587d87f";
export declare class ArrayMetadata_MetadataEntry extends __S {
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    getKey(): string;
    setKey(value: string): void;
    getType(): string;
    setType(value: string): void;
    getValueNum(): number;
    setValueNum(value: number): void;
    adoptValue(value: capnp.Orphan<capnp.Data>): void;
    disownValue(): capnp.Orphan<capnp.Data>;
    getValue(): capnp.Data;
    hasValue(): boolean;
    initValue(length: number): capnp.Data;
    setValue(value: capnp.Data): void;
    getDel(): boolean;
    setDel(value: boolean): void;
    toString(): string;
}
export declare class ArrayMetadata extends __S {
    static readonly MetadataEntry: typeof ArrayMetadata_MetadataEntry;
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    static _Entries: capnp.ListCtor<ArrayMetadata_MetadataEntry>;
    adoptEntries(value: capnp.Orphan<capnp.List<ArrayMetadata_MetadataEntry>>): void;
    disownEntries(): capnp.Orphan<capnp.List<ArrayMetadata_MetadataEntry>>;
    getEntries(): capnp.List<ArrayMetadata_MetadataEntry>;
    hasEntries(): boolean;
    initEntries(length: number): capnp.List<ArrayMetadata_MetadataEntry>;
    setEntries(value: capnp.List<ArrayMetadata_MetadataEntry>): void;
    toString(): string;
}