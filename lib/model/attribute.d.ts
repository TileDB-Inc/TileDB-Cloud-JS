import { Datatype } from './datatype';
import { FilterPipeline } from './filterPipeline';
export declare class Attribute {
    'name': string;
    'type': Datatype;
    'filterPipeline': FilterPipeline;
    'cellValNum': number;
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
