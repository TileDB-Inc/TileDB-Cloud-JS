export declare class AttributeBufferHeader {
    'name': string;
    'fixedLenBufferSizeInBytes': number;
    'varLenBufferSizeInBytes': number;
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
