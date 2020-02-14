import { Layout } from './layout';
import { UDFSubarrayRange } from './uDFSubarrayRange';
export declare class UDFSubarray {
    'layout'?: Layout;
    'ranges'?: Array<UDFSubarrayRange>;
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
