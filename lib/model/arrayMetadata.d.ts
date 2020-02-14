import { ArrayMetadataEntry } from './arrayMetadataEntry';
export declare class ArrayMetadata {
    'ranges'?: Array<ArrayMetadataEntry>;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
