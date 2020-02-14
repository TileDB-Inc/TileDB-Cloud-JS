import { UDFSubarray } from './uDFSubarray';
import { UDFType } from './uDFType';
export declare class UDF {
    'type'?: UDFType;
    'version'?: string;
    'imageName'?: string;
    'subarray'?: UDFSubarray;
    'exec'?: string;
    'buffers'?: Array<string>;
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
