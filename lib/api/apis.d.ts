/// <reference types="node" />
export * from './arrayApi';
import { ArrayApi } from './arrayApi';
export * from './arrayTasksApi';
import { ArrayTasksApi } from './arrayTasksApi';
export * from './organizationApi';
import { OrganizationApi } from './organizationApi';
export * from './queryApi';
import { QueryApi } from './queryApi';
export * from './sqlApi';
import { SqlApi } from './sqlApi';
export * from './statsApi';
import { StatsApi } from './statsApi';
export * from './tasksApi';
import { TasksApi } from './tasksApi';
export * from './udfApi';
import { UdfApi } from './udfApi';
export * from './userApi';
import { UserApi } from './userApi';
import * as fs from 'fs';
import * as http from 'http';
export declare class HttpError extends Error {
    response: http.IncomingMessage;
    body: any;
    statusCode?: number | undefined;
    constructor(response: http.IncomingMessage, body: any, statusCode?: number | undefined);
}
export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    };
}
export declare type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;
export declare const APIS: (typeof ArrayApi | typeof ArrayTasksApi | typeof OrganizationApi | typeof QueryApi | typeof SqlApi | typeof StatsApi | typeof TasksApi | typeof UdfApi | typeof UserApi)[];
