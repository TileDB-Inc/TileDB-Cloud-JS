export declare class ArrayMetadataEntry {
    'key'?: string;
    'type'?: string;
    'valueNum'?: number;
    'value'?: Array<number>;
    'del'?: boolean;
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
