import save from 'save-file';
import axios, { AxiosInstance } from 'axios';
import {
  ArrayApi,
  ArrayInfoUpdate,
  ArraySharing,
  OrganizationApi,
  NotebookApi,
  TasksApi,
  UserApi,
  LoadEnumerationsRequest
} from '../v1';
import UDF from '../UDF';
import Sql from '../Sql';
import Groups from '../Groups';
import { ConfigurationParameters, Configuration, Layout } from '../v2';
import TileDBQuery from '../TileDBQuery';
import enumerationToHumanReadable from '../utils/enumerationToHumanReadable';

interface NotebookOrFileDimensions {
  contents: number[];
  position: number[];
}

const defaultConfig: ConfigurationParameters = {
  basePath: 'https://api.tiledb.com'
};

const isNode = typeof process === 'object';

if (isNode) {
  if (process.env.TILEDB_REST_HOST) {
    defaultConfig.basePath = process.env.TILEDB_REST_HOST;
  }
  if (process.env.TILEDB_REST_TOKEN) {
    defaultConfig.apiKey = process.env.TILEDB_REST_TOKEN;
  }
}

class TileDBClient {
  config: Configuration;
  configV2: Configuration;
  ArrayApi: ArrayApi;
  OrganizationApi: OrganizationApi;
  UserApi: UserApi;
  NotebookApi: NotebookApi;
  TasksApi: TasksApi;
  udf: UDF;
  groups: Groups;
  sql: Sql;
  query: TileDBQuery;
  private axios: AxiosInstance;

  constructor(
    params: Omit<
      ConfigurationParameters,
      'username' | 'password'
    > = defaultConfig
  ) {
    const config = {
      ...defaultConfig,
      ...params
    };
    this.axios = axios.create();

    this.config = new Configuration({
      ...config,
      // for v1 API calls basePath needs /v1 suffix
      basePath: config.basePath + '/v1'
    });

    // Add versioning if basePath exists
    this.configV2 = new Configuration({
      ...defaultConfig,
      ...params,
      // for v2 API calls, basePath needs /v2 suffix
      basePath: config.basePath + '/v2'
    });

    this.ArrayApi = new ArrayApi(this.config, undefined, this.axios);
    this.OrganizationApi = new OrganizationApi(
      this.config,
      undefined,
      this.axios
    );
    this.UserApi = new UserApi(this.config, undefined, this.axios);
    this.NotebookApi = new NotebookApi(this.config, undefined, this.axios);
    this.TasksApi = new TasksApi(this.config, undefined, this.axios);
    this.udf = new UDF(this.config, this.axios);
    this.sql = new Sql(this.config, this.axios);
    this.groups = new Groups(this.config, this.configV2, this.axios);
    this.query = new TileDBQuery(this.configV2, this.axios);
  }

  public info(
    workspace: string,
    teamspace: string,
    array: string,
    options?: any
  ) {
    return this.ArrayApi.getArrayMetadata(workspace, teamspace, array, options);
  }

  public async loadEnumerationsRequest(
    workspace: string,
    teamspace: string,
    array: string,
    config: {
      enumerations: string[];
      enumerationsMaxSize?: string;
      enumerationsTotalSize?: string;
    }
  ) {
    const {
      enumerations,
      enumerationsMaxSize = '10485760',
      enumerationsTotalSize = '52428800'
    } = config;
    const loadEnumerationsOptions: LoadEnumerationsRequest = {
      config: {
        entries: [
          {
            key: 'sm.enumerations_max_size',
            value: enumerationsMaxSize
          },
          {
            key: 'sm.enumerations_max_total_size',
            value: enumerationsTotalSize
          }
        ]
      },
      enumerations: enumerations
    };
    const response = await this.ArrayApi.loadEnumerations(
      workspace,
      teamspace,
      array,
      loadEnumerationsOptions
    );

    const resultPromises = response.data.enumerations.map(
      enumerationToHumanReadable
    );

    return await Promise.all(resultPromises);
  }

  public arrayActivity(
    workspace: string,
    teamspace: string,
    array: string,
    start?: number,
    end?: number,
    eventTypes?: string,
    taskId?: string,
    hasTaskId?: boolean,
    options?: any
  ) {
    return this.ArrayApi.arrayActivityLog(
      workspace,
      teamspace,
      array,
      start,
      end,
      eventTypes,
      taskId,
      hasTaskId,
      options
    );
  }

  public deregisterArray(
    workspace: string,
    teamspace: string,
    array: string,
    options?: any
  ) {
    return this.ArrayApi.deregisterArray(workspace, teamspace, array, options);
  }

  public registerArray(
    workspace: string,
    teamspace: string,
    array: string,
    arrayMetadata: ArrayInfoUpdate,
    options?: any
  ) {
    return this.ArrayApi.registerArray(
      workspace,
      teamspace,
      array,
      arrayMetadata,
      options
    );
  }

  public listSharedWith(
    workspace: string,
    teamspace: string,
    array: string,
    options?: any
  ) {
    return this.ArrayApi.getArraySharingPolicies(
      workspace,
      teamspace,
      array,
      options
    );
  }

  public shareArray(
    workspace: string,
    teamspace: string,
    array: string,
    arraySharing: ArraySharing,
    options?: any
  ) {
    return this.ArrayApi.shareArray(
      workspace,
      teamspace,
      array,
      arraySharing,
      options
    );
  }

  public unshareArray(
    workspace: string,
    teamspace: string,
    array: string,
    teamspaceToUnshare: string,
    options?: any
  ) {
    const noActions = {
      actions: [],
      namespace: teamspaceToUnshare
    };
    return this.ArrayApi.shareArray(
      workspace,
      teamspace,
      array,
      noActions,
      options
    );
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
      options
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
      options
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
      options
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
    workspace: string,
    teamspace: string,
    array: string,
    notebookName: string,
    options?: any
  ) {
    const notebookMetadata = {
      name: notebookName
    };
    return this.NotebookApi.updateNotebookName(
      workspace,
      teamspace,
      array,
      notebookMetadata,
      options
    );
  }

  public task(workspace: string, id: string, options?: any) {
    return this.TasksApi.taskWorkspaceIdGet(workspace, id, options);
  }

  public async downloadNotebookContents(
    workspace: string,
    teamspace: string,
    notebook: string
  ) {
    interface NotebookMetadata {
      file_size: number;
    }
    const res = await this.ArrayApi.getArrayMetaDataJson(
      workspace,
      teamspace,
      notebook
    );
    const notebookSize = (res.data as NotebookMetadata).file_size;
    if (!notebookSize) {
      throw new Error(
        `file_size was not found inside the array's metadata, are you sure that "${workspace}/${teamspace}/${notebook}" is a TileDB notebook?`
      );
    }
    const query = {
      layout: Layout.RowMajor,
      ranges: [[0, notebookSize]],
      bufferSize: notebookSize,
      attributes: ['contents']
    };
    // NotebookContents is an Array of Uint8
    let notebookContents: number[] = [];

    for await (const results of this.query.ReadQuery(
      workspace,
      teamspace,
      notebook,
      query
    )) {
      notebookContents = notebookContents.concat(
        (results as NotebookOrFileDimensions).contents
      );
    }

    const buffer = Uint8Array.from(notebookContents);
    const decoder = new TextDecoder();
    const json = decoder.decode(buffer);

    // Replace unprintable characters
    return json.replace(/[^\x20-\x7E]/g, '');
  }

  public async downloadNotebookToFile(
    workspace: string,
    teamspace: string,
    notebook: string
  ) {
    const contents = await this.downloadNotebookContents(
      workspace,
      teamspace,
      notebook
    );
    await save(contents, `${notebook}.ipynb`);
  }

  public async getFileContents(
    workspace: string,
    teamspace: string,
    file: string
  ) {
    interface FileMetadata {
      original_file_name: string;
      file_size: number;
      file_extension: string;
      mime_type: string;
    }
    const res = await this.ArrayApi.getArrayMetaDataJson(
      workspace,
      teamspace,
      file
    );
    const { original_file_name, file_size, mime_type } =
      res.data as FileMetadata;

    if (!original_file_name || !file_size) {
      throw new Error(
        `file_size or original_file_name were not found inside the array's metadata, are you sure that "${workspace}/${teamspace}/${file}" is a TileDB file?`
      );
    }

    // FileContents is an Array of Uint8
    let fileContents: number[] = [];

    const query = {
      layout: Layout.RowMajor,
      ranges: [[0, file_size]],
      bufferSize: file_size,
      attributes: ['contents']
    };

    for await (const results of this.query.ReadQuery(
      workspace,
      teamspace,
      file,
      query
    )) {
      fileContents = fileContents.concat(
        (results as NotebookOrFileDimensions).contents
      );
    }

    const buffer = Uint8Array.from(fileContents).buffer;

    return {
      buffer,
      originalFileName: original_file_name,
      mimeType: mime_type
    };
  }

  public async downloadFile(
    workspace: string,
    teamspace: string,
    file: string
  ) {
    const { buffer, originalFileName } = await this.getFileContents(
      workspace,
      teamspace,
      file
    );

    await save(buffer, originalFileName);
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
