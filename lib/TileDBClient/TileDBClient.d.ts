import { NotebookApi } from "./../v1/api";
import { ArrayApi, ArrayInfoUpdate, ArraySharing, OrganizationApi, TasksApi, UserApi } from "../v1";
import UDF from "../UDF";
import Sql from "../Sql";
import { ConfigurationParameters, Configuration } from "../v2";
import TileDBQuery from "../TileDBQuery";
declare class TileDBClient {
    config: Configuration;
    configV2: Configuration;
    ArrayApi: ArrayApi;
    OrganizationApi: OrganizationApi;
    UserApi: UserApi;
    NotebookApi: NotebookApi;
    TasksApi: TasksApi;
    udf: UDF;
    sql: Sql;
    query: TileDBQuery;
    constructor(params: ConfigurationParameters);
    info(namespace: string, array: string, options?: any): Promise<import("axios").AxiosResponse<import("../v1").ArrayInfo>>;
    arrayActivity(namespace: string, array: string, start?: number, end?: number, eventTypes?: string, taskId?: string, hasTaskId?: boolean, options?: any): Promise<import("axios").AxiosResponse<import("../v1").ArrayActivityLog[]>>;
    deregisterArray(namespace: string, array: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
    registerArray(namespace: string, array: string, arrayMetadata: ArrayInfoUpdate, options?: any): Promise<import("axios").AxiosResponse<void>>;
    listSharedWith(namespace: string, array: string, options?: any): Promise<import("axios").AxiosResponse<ArraySharing[]>>;
    shareArray(namespace: string, array: string, arraySharing: ArraySharing, options?: any): Promise<import("axios").AxiosResponse<void>>;
    unshareArray(namespace: string, array: string, namespaceToUnshare: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
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
    }): Promise<import("axios").AxiosResponse<import("../v1").ArrayBrowserData>>;
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
    }): Promise<import("axios").AxiosResponse<import("../v1").ArrayBrowserData>>;
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
    }): Promise<import("axios").AxiosResponse<import("../v1").ArrayBrowserData>>;
    /**
     * Organization to fetch
     */
    organization(organization: string, options?: any): Promise<import("axios").AxiosResponse<import("../v1").Organization>>;
    /**
     * List of all organizations user is part of
     */
    organizations(options?: any): Promise<import("axios").AxiosResponse<import("../v1").Organization[]>>;
    /**
     * Your user profile
     */
    userProfile(options?: any): Promise<import("axios").AxiosResponse<import("../v1").User>>;
    /**
     * Rename a notebook's name
     */
    renameNotebook(namespace: string, array: string, notebookName: string, options?: any): Promise<import("axios").AxiosResponse<void>>;
    task(id: string, options?: any): Promise<import("axios").AxiosResponse<import("../v1").ArrayTask>>;
    downloadNotebookContents(namespace: string, notebook: string): Promise<string>;
    downloadNotebookToFile(namespace: string, notebook: string): Promise<void>;
    uploadNotebookContents(): void;
    uploadNotebookFromFile(): void;
    lastSqlTask(): void;
    lastUDFTask(): void;
}
export default TileDBClient;
