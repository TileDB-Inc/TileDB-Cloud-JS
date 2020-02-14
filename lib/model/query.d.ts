import { AttributeBufferHeader } from './attributeBufferHeader';
import { Layout } from './layout';
import { QueryReader } from './queryReader';
import { Querystatus } from './querystatus';
import { Querytype } from './querytype';
import { Writer } from './writer';
export declare class Query {
    'type': Querytype;
    'layout': Layout;
    'status': Querystatus;
    'attributeBufferHeaders': Array<AttributeBufferHeader>;
    'writer'?: Writer;
    'reader'?: QueryReader;
    'array': any;
    'totalFixedLengthBufferBytes': number;
    'totalVarLenBufferBytes': number;
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
