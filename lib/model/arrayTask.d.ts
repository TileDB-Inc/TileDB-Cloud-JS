import { ArrayActivityLog } from './arrayActivityLog';
import { ArrayInfo } from './arrayInfo';
import { ArrayTaskStatus } from './arrayTaskStatus';
import { ArrayTaskType } from './arrayTaskType';
import { DomainArray } from './domainArray';
import { Querytype } from './querytype';
export declare class ArrayTask {
    'id'?: string;
    'name'?: string;
    'description'?: string;
    'arrayMetadata'?: ArrayInfo;
    'subarray'?: DomainArray;
    'memory'?: number;
    'cpu'?: number;
    'namespace'?: string;
    'status'?: ArrayTaskStatus;
    'startTime'?: Date;
    'finishTime'?: Date;
    'cost'?: number;
    'queryType'?: Querytype;
    'udfCode'?: string;
    'udfLanguage'?: string;
    'sqlQuery'?: string;
    'type'?: ArrayTaskType;
    'activity'?: Array<ArrayActivityLog>;
    'logs'?: string;
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
