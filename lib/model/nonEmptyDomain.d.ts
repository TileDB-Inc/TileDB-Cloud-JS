import { DomainArray } from './domainArray';
export declare class NonEmptyDomain {
    'nonEmptyDomain': DomainArray;
    'isEmpty': boolean;
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
