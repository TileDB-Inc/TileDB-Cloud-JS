import { Subarray } from './subarray';
export declare class SubarrayPartitionerCurrent {
    'subarray'?: Subarray;
    'start'?: number;
    'end'?: number;
    'splitMultiRange'?: boolean;
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
