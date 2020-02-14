export declare class Token {
    'token'?: string;
    'name'?: string;
    'issuedAt'?: Date;
    'expiresAt'?: Date;
    'scope'?: string;
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
