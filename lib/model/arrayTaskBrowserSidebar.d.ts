export declare class ArrayTaskBrowserSidebar {
    'organizations'?: Array<string>;
    'resultCountForAll'?: number;
    'resultCountByNamespace'?: object;
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
