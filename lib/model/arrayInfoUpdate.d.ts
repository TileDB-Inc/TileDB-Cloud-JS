export declare class ArrayInfoUpdate {
    'description'?: string;
    'name'?: string;
    'uri'?: string;
    'accessCredentialsName'?: string;
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
