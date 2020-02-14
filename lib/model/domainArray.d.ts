export declare class DomainArray {
    'int8'?: Array<number>;
    'uint8'?: Array<number>;
    'int16'?: Array<number>;
    'uint16'?: Array<number>;
    'int32'?: Array<number>;
    'uint32'?: Array<number>;
    'int64'?: Array<number>;
    'uint64'?: Array<number>;
    'float32'?: Array<number>;
    'float64'?: Array<number>;
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
