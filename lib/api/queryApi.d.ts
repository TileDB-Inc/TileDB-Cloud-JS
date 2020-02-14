/// <reference types="node" />
import http = require('http');
import { Query } from '../model/query';
import { Authentication } from '../model/models';
import { HttpBasicAuth, ApiKeyAuth, OAuth } from '../model/models';
export declare enum QueryApiApiKeys {
    ApiKeyAuth = 0
}
export declare class QueryApi {
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
    setApiKey(key: QueryApiApiKeys, value: string): void;
    accessToken: string;
    username: string;
    password: string;
    finalizeQuery(namespace: string, array: string, type: string, contentType: string, query: Query, xPayer?: string, openAt?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Query;
    }>;
    submitQuery(namespace: string, array: string, type: string, contentType: string, query: Query, xPayer?: string, openAt?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Query;
    }>;
}
