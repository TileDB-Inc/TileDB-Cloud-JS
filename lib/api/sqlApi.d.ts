/// <reference types="node" />
import http = require('http');
import { SQLParameters } from '../model/sQLParameters';
import { Authentication } from '../model/models';
import { HttpBasicAuth, ApiKeyAuth, OAuth } from '../model/models';
export declare enum SqlApiApiKeys {
    ApiKeyAuth = 0
}
export declare class SqlApi {
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
    setApiKey(key: SqlApiApiKeys, value: string): void;
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
}
