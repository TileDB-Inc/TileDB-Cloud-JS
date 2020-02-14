/// <reference types="node" />
import http = require('http');
import { InlineResponse200 } from '../model/inlineResponse200';
import { Authentication } from '../model/models';
import { HttpBasicAuth, ApiKeyAuth, OAuth } from '../model/models';
export declare enum StatsApiApiKeys {
    ApiKeyAuth = 0
}
export declare class StatsApi {
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
    setApiKey(key: StatsApiApiKeys, value: string): void;
    accessToken: string;
    username: string;
    password: string;
    getTiledbStats(options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: InlineResponse200;
    }>;
}
