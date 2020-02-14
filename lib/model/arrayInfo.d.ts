import { ArrayActions } from './arrayActions';
export declare class ArrayInfo {
    'id'?: string;
    'uri'?: string;
    'namespace'?: string;
    'size'?: number;
    'lastAccessed'?: Date;
    'description'?: string;
    'name'?: string;
    'allowedActions'?: Array<ArrayActions>;
    'logo'?: string;
    'accessCredentialsName'?: string;
    'type'?: string;
    'shareCount'?: number;
    'publicShare'?: boolean;
    'tiledbUri'?: string;
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
