import { ArrayApi, ArrayInfoUpdate, ArraySharing } from "../v1";
import { ConfigurationParameters } from "../v2";
declare class TileDBClient {
    config: ConfigurationParameters;
    ArrayApi: ArrayApi;
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
}
export default TileDBClient;
