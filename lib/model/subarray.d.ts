import { Layout } from './layout';
import { SubarrayRanges } from './subarrayRanges';
export declare class Subarray {
    'layout'?: Layout;
    'ranges'?: Array<SubarrayRanges>;
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
