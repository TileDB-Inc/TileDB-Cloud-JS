import { ArrayType } from './arrayType';
import { Attribute } from './attribute';
import { Domain } from './domain';
import { FilterPipeline } from './filterPipeline';
import { Layout } from './layout';
export declare class ArraySchema {
    'uri'?: string;
    'version': Array<number>;
    'arrayType': ArrayType;
    'tileOrder': Layout;
    'cellOrder': Layout;
    'capacity': number;
    'coordsFilterPipeline': FilterPipeline;
    'offsetFilterPipeline': FilterPipeline;
    'domain': Domain;
    'attributes': Array<Attribute>;
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
