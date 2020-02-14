import { DomainArray } from './domainArray';
export declare class Writer {
    'checkCoordDups'?: boolean;
    'checkCoordOOB'?: boolean;
    'dedupCoords'?: boolean;
    'subarray'?: DomainArray;
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
