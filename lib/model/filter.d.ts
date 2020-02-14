import { FilterData } from './filterData';
import { FilterType } from './filterType';
export declare class Filter {
    'type': FilterType;
    'data'?: FilterData;
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
