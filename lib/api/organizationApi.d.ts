/// <reference types="node" />
import http = require('http');
import { AWSAccessCredentials } from '../model/aWSAccessCredentials';
import { Organization } from '../model/organization';
import { OrganizationUser } from '../model/organizationUser';
import { Authentication } from '../model/models';
import { HttpBasicAuth, ApiKeyAuth, OAuth } from '../model/models';
export declare enum OrganizationApiApiKeys {
    ApiKeyAuth = 0
}
export declare class OrganizationApi {
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
    setApiKey(key: OrganizationApiApiKeys, value: string): void;
    accessToken: string;
    username: string;
    password: string;
    addAWSAccessCredentials(namespace: string, awsAccessCredentials: AWSAccessCredentials, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    addUserToOrganization(organization: string, user: OrganizationUser, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    checkAWSAccessCredentials(namespace: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Array<AWSAccessCredentials>;
    }>;
    checkAWSAccessCredentialsByName(namespace: string, name: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: AWSAccessCredentials;
    }>;
    createOrganization(organization: Organization, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    deleteAWSAccessCredentials(namespace: string, name: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    deleteOrganization(organization: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    deleteUserFromOrganization(organization: string, username: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    getAllOrganizations(options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Array<Organization>;
    }>;
    getOrganization(organization: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Organization;
    }>;
    getOrganizationUser(organization: string, username: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: OrganizationUser;
    }>;
    updateAWSAccessCredentials(namespace: string, name: string, awsAccessCredentials: AWSAccessCredentials, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    updateOrganization(organization: string, organizationDetails: Organization, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    updateUserInOrganization(organization: string, username: string, user: OrganizationUser, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
}
