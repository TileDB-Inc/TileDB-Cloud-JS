/// <reference types="node" />
import http = require('http');
import { UDF } from '../model/uDF';
import { Authentication } from '../model/models';
import { HttpBasicAuth, ApiKeyAuth, OAuth } from '../model/models';
export declare enum UdfApiApiKeys {
    ApiKeyAuth = 0
}
export declare class UdfApi {
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
    setApiKey(key: UdfApiApiKeys, value: string): void;
    accessToken: string;
    username: string;
    password: string;
    submitUDF(namespace: string, array: string, udf: UDF, xPayer?: string, acceptEncoding?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
}
