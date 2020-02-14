import { ArrayActions } from './arrayActions';
export declare class ArraySharing {
    'actions'?: Array<ArrayActions>;
    'namespace'?: string;
    'namespaceType'?: string;
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
