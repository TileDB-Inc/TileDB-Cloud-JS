export declare class FilterData {
    'int8'?: number;
    'uint8'?: number;
    'int16'?: number;
    'uint16'?: number;
    'int32'?: number;
    'uint32'?: number;
    'int64'?: number;
    'uint64'?: number;
    'float32'?: number;
    'float64'?: number;
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
