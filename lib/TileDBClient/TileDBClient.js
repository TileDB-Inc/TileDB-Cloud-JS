"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const save_file_1 = __importDefault(require("save-file"));
const api_1 = require("./../v1/api");
const v1_1 = require("../v1");
const UDF_1 = __importDefault(require("../UDF"));
const v2_1 = require("../v2");
const TileDBQuery_1 = __importDefault(require("../TileDBQuery"));
class TileDBClient {
    constructor(params) {
        var _a;
        const config = new v2_1.Configuration(params);
        const baseV2Path = (_a = config.basePath) === null || _a === void 0 ? void 0 : _a.replace("v1", "v2");
        // Add versioning if basePath exists
        this.configV2 = new v2_1.Configuration(Object.assign(Object.assign({}, params), (baseV2Path ? { basePath: baseV2Path } : {})));
        this.config = config;
        this.ArrayApi = new v1_1.ArrayApi(params);
        this.OrganizationApi = new v1_1.OrganizationApi(params);
        this.UserApi = new v1_1.UserApi(params);
        this.NotebookApi = new api_1.NotebookApi(params);
        this.TasksApi = new v1_1.TasksApi(params);
        this.udf = new UDF_1.default(this.config);
    }
    info(namespace, array, options) {
        return this.ArrayApi.getArrayMetadata(namespace, array, options);
    }
    arrayActivity(namespace, array, start, end, eventTypes, taskId, hasTaskId, options) {
        return this.ArrayApi.arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, options);
    }
    deregisterArray(namespace, array, options) {
        return this.ArrayApi.deregisterArray(namespace, array, options);
    }
    listSharedWith(namespace, array, options) {
        return this.ArrayApi.getArraySharingPolicies(namespace, array, options);
    }
    registerArray(namespace, array, arrayMetadata, options) {
        return this.ArrayApi.registerArray(namespace, array, arrayMetadata, options);
    }
    shareArray(namespace, array, arraySharing, options) {
        return this.ArrayApi.shareArray(namespace, array, arraySharing, options);
    }
    unshareArray(namespace, array, namespaceToUnshare, options) {
        const noActions = {
            actions: [],
            namespace: namespaceToUnshare,
        };
        return this.ArrayApi.shareArray(namespace, array, noActions, options);
    }
    /**
     * List arrays in a user account
     */
    listArrays(params = {}) {
        const { page = 1, perPage = 1000, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options, } = params;
        return this.ArrayApi.arraysBrowserOwnedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options);
    }
    /**
     * List public arrays
     */
    listPublicArrays(params = {}) {
        const { page = 1, perPage = 1000, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options, } = params;
        return this.ArrayApi.arraysBrowserPublicGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options);
    }
    /**
     * List shared arrays
     */
    listSharedArrays(params = {}) {
        const { page = 1, perPage = 1000, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options, } = params;
        return this.ArrayApi.arraysBrowserSharedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options);
    }
    /**
     * Organization to fetch
     */
    organization(organization, options) {
        return this.OrganizationApi.getOrganization(organization, options);
    }
    /**
     * List of all organizations user is part of
     */
    organizations(options) {
        return this.OrganizationApi.getAllOrganizations(options);
    }
    /**
     * Your user profile
     */
    userProfile(options) {
        return this.UserApi.getUser(options);
    }
    /**
     * Rename a notebook's name
     */
    renameNotebook(namespace, array, notebookName, options) {
        const notebookMetadata = {
            name: notebookName,
        };
        return this.NotebookApi.updateNotebookName(namespace, array, notebookMetadata, options);
    }
    task(id, options) {
        return this.TasksApi.taskIdGet(id, options);
    }
    downloadNotebookContents(namespace, notebook) {
        return __awaiter(this, void 0, void 0, function* () {
            const notebookInfo = yield this.info(namespace, notebook);
            const tiledbQuery = new TileDBQuery_1.default(this.configV2);
            const notebookSize = notebookInfo.data.size;
            const query = {
                layout: v2_1.Layout.RowMajor,
                ranges: [[]],
                // TODO: What is the correct buffer size?
                // Sometimes getting error 502 (buffer size is too big) or not the complete contents
                bufferSize: 0.6 * notebookSize,
                attributes: ["contents"],
            };
            const gen = tiledbQuery.ReadQuery(namespace, notebook, query);
            const { value } = yield gen.next();
            const buffer = Uint8Array.from(value.contents);
            const decoder = new TextDecoder();
            const json = decoder.decode(buffer);
            return json.replace(/[^\x20-\x7E]/g, "");
        });
    }
    downloadNotebookToFile(namespace, notebook) {
        return __awaiter(this, void 0, void 0, function* () {
            const contents = yield this.downloadNotebookContents(namespace, notebook);
            yield save_file_1.default(contents, `${notebook}.ipynb`);
        });
    }
    // TODO: We need a way to create an array and save contents as "contents" attribute
    uploadNotebookContents() { }
    // TODO: We should read file and call uploadNotebookContents
    uploadNotebookFromFile() { }
    // TODO: add this method
    lastSqlTask() { }
    // TODO: add this method
    lastUDFTask() { }
}
exports.default = TileDBClient;
//# sourceMappingURL=TileDBClient.js.map