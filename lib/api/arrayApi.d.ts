/// <reference types="node" />
import http = require('http');
import { ArrayActivityLog } from '../model/arrayActivityLog';
import { ArrayInfo } from '../model/arrayInfo';
import { ArrayInfoUpdate } from '../model/arrayInfoUpdate';
import { ArraySample } from '../model/arraySample';
import { ArraySchema } from '../model/arraySchema';
import { ArraySharing } from '../model/arraySharing';
import { LastAccessedArray } from '../model/lastAccessedArray';
import { MaxBufferSizes } from '../model/maxBufferSizes';
import { NonEmptyDomain } from '../model/nonEmptyDomain';
import { Authentication } from '../model/models';
import { HttpBasicAuth, ApiKeyAuth, OAuth } from '../model/models';
export declare enum ArrayApiApiKeys {
    ApiKeyAuth = 0
}
export declare class ArrayApi {
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
    setApiKey(key: ArrayApiApiKeys, value: string): void;
    accessToken: string;
    username: string;
    password: string;
    arrayActivityLog(namespace: string, array: string, start?: number, end?: number, eventTypes?: string, taskId?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Array<ArrayActivityLog>;
    }>;
    createArray(namespace: string, array: string, contentType: string, arraySchema: ArraySchema, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    deleteArray(namespace: string, array: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    deregisterArray(namespace: string, array: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    getAllArrayMetadata(publicShare?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Array<ArrayInfo>;
    }>;
    getArray(namespace: string, array: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ArraySchema;
    }>;
    getArrayMaxBufferSizes(namespace: string, array: string, subarray: string, contentType: string, xPayer?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: MaxBufferSizes;
    }>;
    getArrayMetaDataJson(namespace: string, array: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: object;
    }>;
    getArrayMetadata(namespace: string, array: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ArrayInfo;
    }>;
    getArrayNonEmptyDomain(namespace: string, array: string, contentType: string, xPayer?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: NonEmptyDomain;
    }>;
    getArraySampleData(namespace: string, array: string, samples?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ArraySample;
    }>;
    getArraySharingPolicies(namespace: string, array: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Array<ArraySharing>;
    }>;
    getArraysInNamespace(namespace: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Array<ArrayInfo>;
    }>;
    getLastAccessedArrays(options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Array<LastAccessedArray>;
    }>;
    registerArray(namespace: string, array: string, arrayMetadata: ArrayInfoUpdate, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    shareArray(namespace: string, array: string, arraySharing: ArraySharing, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    updateArrayMetadata(namespace: string, array: string, arrayMetadata: ArrayInfoUpdate, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
}
