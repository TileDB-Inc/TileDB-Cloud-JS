import { ArrayTask } from './arrayTask';
import { PaginationMetadata } from './paginationMetadata';
export declare class ArrayTaskData {
    'arrayTasks'?: Array<ArrayTask>;
    'paginationMetadata'?: PaginationMetadata;
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
