import { DimensionCoordinate } from './dimensionCoordinate';
export declare class UDFSubarrayRange {
    'dimensionId'?: number;
    'rangeStart'?: DimensionCoordinate;
    'rangeEnd'?: DimensionCoordinate;
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
