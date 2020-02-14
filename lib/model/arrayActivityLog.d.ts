import { ActivityEventType } from './activityEventType';
export declare class ArrayActivityLog {
    'eventAt'?: Date;
    'action'?: ActivityEventType;
    'username'?: string;
    'bytesSent'?: number;
    'bytesReceived'?: number;
    'arrayTaskId'?: string;
    'queryRanges'?: string;
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
