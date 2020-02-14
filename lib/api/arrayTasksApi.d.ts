/// <reference types="node" />
import http = require('http');
import { ArrayTaskBrowserSidebar } from '../model/arrayTaskBrowserSidebar';
import { Authentication } from '../model/models';
import { HttpBasicAuth, ApiKeyAuth, OAuth } from '../model/models';
export declare enum ArrayTasksApiApiKeys {
    ApiKeyAuth = 0
}
export declare class ArrayTasksApi {
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
    setApiKey(key: ArrayTasksApiApiKeys, value: string): void;
    accessToken: string;
    username: string;
    password: string;
    getArrayTasksSidebar(start?: number, end?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ArrayTaskBrowserSidebar;
    }>;
}
