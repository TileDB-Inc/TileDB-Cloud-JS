import { Subarray } from './subarray';
export declare class SubarrayPartitionerState {
    'start'?: number;
    'end'?: number;
    'singleRange'?: Array<Subarray>;
    'multiRange'?: Array<Subarray>;
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
