import { Datatype } from './datatype';
import { Dimension } from './dimension';
import { Layout } from './layout';
export declare class Domain {
    'type': Datatype;
    'tileOrder': Layout;
    'cellOrder': Layout;
    'dimensions': Array<Dimension>;
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
