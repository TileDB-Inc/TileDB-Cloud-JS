/// <reference types="node" />
import http = require('http');
import { ArrayTask } from '../model/arrayTask';
import { ArrayTaskData } from '../model/arrayTaskData';
import { SQLParameters } from '../model/sQLParameters';
import { Authentication } from '../model/models';
import { HttpBasicAuth, ApiKeyAuth, OAuth } from '../model/models';
export declare enum TasksApiApiKeys {
    ApiKeyAuth = 0
}
export declare class TasksApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
        'OAuth2': OAuth;
        'BasicAuth': HttpBasicAuth;
        'ApiKeyAuth': ApiKeyAuth;
    };
    constructor(basePath?: string);
    constructor(username: string, password: string, basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: TasksApiApiKeys, value: string): void;
    accessToken: string;
    username: string;
    password: string;
    runSQL(namespace: string, sql: SQLParameters, acceptEncoding?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Array<object>;
    }>;
    taskIdGet(id: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ArrayTask;
    }>;
    tasksGet(namespace?: string, createdBy?: string, array?: string, start?: number, end?: number, page?: number, perPage?: number, type?: string, status?: string, search?: string, orderby?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ArrayTaskData;
    }>;
}
