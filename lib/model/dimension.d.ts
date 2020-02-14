import { Datatype } from './datatype';
import { DimensionTileExtent } from './dimensionTileExtent';
import { DomainArray } from './domainArray';
export declare class Dimension {
    'name'?: string;
    'type': Datatype;
    'domain': DomainArray;
    'nullTileExtent': boolean;
    'tileExtent'?: DimensionTileExtent;
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
