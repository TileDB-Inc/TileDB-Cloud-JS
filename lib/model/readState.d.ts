import { SubarrayPartitioner } from './subarrayPartitioner';
export declare class ReadState {
    'initialized'?: boolean;
    'overflowed'?: boolean;
    'unsplittable'?: boolean;
    'subarrayPartitioner'?: SubarrayPartitioner;
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
