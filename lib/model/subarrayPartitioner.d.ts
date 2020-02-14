import { AttributeBufferSize } from './attributeBufferSize';
import { Subarray } from './subarray';
import { SubarrayPartitionerCurrent } from './subarrayPartitionerCurrent';
import { SubarrayPartitionerState } from './subarrayPartitionerState';
export declare class SubarrayPartitioner {
    'subarray'?: Subarray;
    'budget'?: Array<AttributeBufferSize>;
    'current'?: SubarrayPartitionerCurrent;
    'state'?: SubarrayPartitionerState;
    'memoryBudget'?: number;
    'memoryBudgetVar'?: number;
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
