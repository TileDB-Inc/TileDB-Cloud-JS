export declare class AWSAccessCredentials {
    'secretAccessKey'?: string;
    'accessKeyId'?: string;
    'serviceRoleArn'?: string;
    'name'?: string;
    '_default'?: boolean;
    'buckets'?: Array<string>;
    'createdAt'?: Date;
    'updatedAt'?: Date;
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
