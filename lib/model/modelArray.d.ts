import { Querytype } from './querytype';
export declare class ModelArray {
    'timestamp': number;
    'queryType': Querytype;
    'uri': string;
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
