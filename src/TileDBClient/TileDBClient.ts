import { NotebookApi } from "./../v1/api";
import {
  ArrayApi,
  ArrayInfoUpdate,
  ArraySharing,
  OrganizationApi,
  TasksApi,
  UserApi,
} from "../v1";
import { ConfigurationParameters, Configuration } from "../v2";

class TileDBClient {
  config: Configuration;
  configV2: Configuration;
  ArrayApi: ArrayApi;
  OrganizationApi: OrganizationApi;
  UserApi: UserApi;
  NotebookApi: NotebookApi;
  TasksApi: TasksApi;

  constructor(params: ConfigurationParameters) {
    const config = new Configuration(params);
    const baseV2Path = config.basePath?.replace("v1", "v2");
    // Add versioning if basePath exists
    this.configV2 = new Configuration({
      ...params,
      // Override basePath v2 for v1 to make calls to get ArraySchema (from v1 API)
      ...(baseV2Path ? { basePath: baseV2Path } : {}),
    });

    this.config = config;
    this.ArrayApi = new ArrayApi(params);
    this.OrganizationApi = new OrganizationApi(params);
    this.UserApi = new UserApi(params);
    this.NotebookApi = new NotebookApi(params);
    this.TasksApi = new TasksApi(params);
  }

  public info(namespace: string, array: string, options?: any) {
    return this.ArrayApi.getArrayMetadata(namespace, array, options);
  }

  public arrayActivity(
    namespace: string,
    array: string,
    start?: number,
    end?: number,
    eventTypes?: string,
    taskId?: string,
    hasTaskId?: boolean,
    options?: any
  ) {
    return this.ArrayApi.arrayActivityLog(
      namespace,
      array,
      start,
      end,
      eventTypes,
      taskId,
      hasTaskId,
      options
    );
  }

  public deregisterArray(namespace: string, array: string, options?: any) {
    return this.ArrayApi.deregisterArray(namespace, array, options);
  }

  public listSharedWith(namespace: string, array: string, options?: any) {
    return this.ArrayApi.getArraySharingPolicies(namespace, array, options);
  }

  public registerArray(
    namespace: string,
    array: string,
    arrayMetadata: ArrayInfoUpdate,
    options?: any
  ) {
    return this.ArrayApi.registerArray(
      namespace,
      array,
      arrayMetadata,
      options
    );
  }

  public shareArray(
    namespace: string,
    array: string,
    arraySharing: ArraySharing,
    options?: any
  ) {
    return this.ArrayApi.shareArray(namespace, array, arraySharing, options);
  }

  public unshareArray(namespace: string, array: string, options?: any) {
    const noActions = {
      actions: [],
      namespace,
    };
    return this.ArrayApi.shareArray(namespace, array, noActions, options);
  }

  /**
   * List arrays in a user account
   */
  public listArrays(
    params: {
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
    } = {}
  ) {
    const {
      page = 1,
      perPage = 1000,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options,
    } = params;
    return this.ArrayApi.arraysBrowserOwnedGet(
      page,
      perPage,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options
    );
  }

  /**
   * List public arrays
   */
  public listPublicArrays(
    params: {
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
    } = {}
  ) {
    const {
      page = 1,
      perPage = 1000,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options,
    } = params;
    return this.ArrayApi.arraysBrowserPublicGet(
      page,
      perPage,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options
    );
  }

  /**
   * List shared arrays
   */
  public listSharedArrays(
    params: {
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
    } = {}
  ) {
    const {
      page = 1,
      perPage = 1000,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options,
    } = params;
    return this.ArrayApi.arraysBrowserSharedGet(
      page,
      perPage,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options
    );
  }

  /**
   * Organization to fetch
   */
  public organization(organization: string, options?: any) {
    return this.OrganizationApi.getOrganization(organization, options);
  }

  /**
   * List of all organizations user is part of
   */
  public organizations(options?: any) {
    return this.OrganizationApi.getAllOrganizations(options);
  }

  /**
   * Your user profile
   */
  public userProfile(options?: any) {
    return this.UserApi.getUser(options);
  }

  /**
   * Rename a notebook's name
   */
  public renameNotebook(
    namespace: string,
    array: string,
    notebookName: string,
    options?: any
  ) {
    const notebookMetadata = {
      name: notebookName,
    };
    return this.NotebookApi.updateNotebookName(
      namespace,
      array,
      notebookMetadata,
      options
    );
  }

  public task(id: string, options?: any) {
    return this.TasksApi.taskIdGet(id, options);
  }

  // TODO: Fix queries to get only one attribute (contents)
  public downloadNotebookContents() {
    return "";
  }

  // TODO: Download contents as file (https://github.com/eligrey/FileSaver.js)
  public async downloadNotebookToFile() {
    const contents = await this.downloadNotebookContents();
    return contents;
  }

  // TODO: We need a way to create an array and save contents as "contents" attribute
  public uploadNotebookContents() {}

  // TODO: We should read file and call uploadNotebookContents
  public uploadNotebookFromFile() {}

  // TODO: add this method
  public lastSqlTask() {}

  // TODO: add this method
  public lastUDFTask() {}
}

export default TileDBClient;
