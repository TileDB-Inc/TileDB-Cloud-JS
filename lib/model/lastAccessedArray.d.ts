import { ActivityEventType } from './activityEventType';
export declare class LastAccessedArray {
    'arrayId'?: string;
    'arrayName'?: string;
    'namespace'?: string;
    'accessedTime'?: number;
    'accessType'?: ActivityEventType;
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
