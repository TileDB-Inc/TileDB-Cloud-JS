import { Layout } from './layout';
import { ReadState } from './readState';
import { Subarray } from './subarray';
export declare class QueryReader {
    'layout'?: Layout;
    'subarray'?: Subarray;
    'readState'?: ReadState;
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
