import { NotebookApi } from "./../v1/api";
import { ArrayApi, ArrayInfoUpdate, ArraySharing, OrganizationApi, TasksApi, UserApi } from "../v1";
import { ConfigurationParameters, Configuration } from "../v2";
declare class TileDBClient {
    config: Configuration;
    configV2: Configuration;
    ArrayApi: ArrayApi;
    OrganizationApi: OrganizationApi;
    UserApi: UserApi;
    NotebookApi: NotebookApi;
    TasksApi: TasksApi;
    constructor(params: ConfigurationParameters);
    info(namespace: string, array: string, options?: any): Promise<import("axios").AxiosResponse<import("../v1").ArrayInfo, any>>;
    arrayActivity(namespace: string, array: string, start?: number, end?: number, eventTypes?: string, taskId?: string, hasTaskId?: boolean, options?: any): Promise<import("axios").AxiosResponse<import("../v1").ArrayActivityLog[], any>>;
    deregisterArray(namespace: string, array: string, options?: any): Promise<import("axios").AxiosResponse<void, any>>;
    listSharedWith(namespace: string, array: string, options?: any): Promise<import("axios").AxiosResponse<ArraySharing[], any>>;
    registerArray(namespace: string, array: string, arrayMetadata: ArrayInfoUpdate, options?: any): Promise<import("axios").AxiosResponse<void, any>>;
    shareArray(namespace: string, array: string, arraySharing: ArraySharing, options?: any): Promise<import("axios").AxiosResponse<void, any>>;
    unshareArray(namespace: string, array: string, options?: any): Promise<import("axios").AxiosResponse<void, any>>;
    /**
     * List arrays in a user account
     */
    listArrays(params?: {
        page?: number;
        perPage?: number;
        search?: string;
        namespace?: string;
        orderby?: string;
        permissions?: string;
        tag?: string[];
        excludeTag?: string[];
        fileType?: string[];
        excludeFileType?: string[];
        fileProperty?: string[];
        options?: any;
    }): Promise<import("axios").AxiosResponse<import("../v1").ArrayBrowserData, any>>;
    /**
     * List public arrays
     */
    listPublicArrays(params?: {
        page?: number;
        perPage?: number;
        search?: string;
        namespace?: string;
        orderby?: string;
        permissions?: string;
        tag?: string[];
        excludeTag?: string[];
        fileType?: string[];
        excludeFileType?: string[];
        fileProperty?: string[];
        options?: any;
    }): Promise<import("axios").AxiosResponse<import("../v1").ArrayBrowserData, any>>;
    /**
     * List shared arrays
     */
    listSharedArrays(params?: {
        page?: number;
        perPage?: number;
        search?: string;
        namespace?: string;
        orderby?: string;
        permissions?: string;
        tag?: string[];
        excludeTag?: string[];
        fileType?: string[];
        excludeFileType?: string[];
        fileProperty?: string[];
        options?: any;
    }): Promise<import("axios").AxiosResponse<import("../v1").ArrayBrowserData, any>>;
    /**
     * Organization to fetch
     */
    organization(organization: string, options?: any): Promise<import("axios").AxiosResponse<import("../v1").Organization, any>>;
    /**
     * List of all organizations user is part of
     */
    organizations(options?: any): Promise<import("axios").AxiosResponse<import("../v1").Organization[], any>>;
    /**
     * Your user profile
     */
    userProfile(options?: any): Promise<import("axios").AxiosResponse<import("../v1").User, any>>;
    /**
     * Rename a notebook's name
     */
    renameNotebook(namespace: string, array: string, notebookName: string, options?: any): Promise<import("axios").AxiosResponse<void, any>>;
    task(id: string, options?: any): Promise<import("axios").AxiosResponse<import("../v1").ArrayTask, any>>;
    downloadNotebookContents(): string;
    downloadNotebookToFile(): Promise<string>;
    uploadNotebookContents(): void;
    uploadNotebookFromFile(): void;
    lastSqlTask(): void;
    lastUDFTask(): void;
}
export default TileDBClient;
