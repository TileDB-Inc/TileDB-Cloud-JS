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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const save_file_1 = __importDefault(require("save-file"));
const api_1 = require("./../v1/api");
const v1_1 = require("../v1");
const UDF_1 = __importDefault(require("../UDF"));
const Sql_1 = __importDefault(require("../Sql"));
const v2_1 = require("../v2");
const TileDBQuery_1 = __importDefault(require("../TileDBQuery"));
const defaultConfig = {};
// const isNode = typeof process === "object";
// if (isNode) {
//   if (process.env.TILEDB_REST_HOST) {
//     defaultConfig.basePath = process.env.TILEDB_REST_HOST;
//   }
//   if (process.env.TILEDB_REST_TOKEN) {
//     defaultConfig.apiKey = process.env.TILEDB_REST_TOKEN;
//   }
// }
class TileDBClient {
    constructor(params) {
        var _a;
        const config = new v2_1.Configuration(Object.assign(Object.assign({}, defaultConfig), params));
        console.log(Object.assign(Object.assign({}, defaultConfig), params));
        const baseV2Path = (_a = config.basePath) === null || _a === void 0 ? void 0 : _a.replace("v1", "v2");
        // Add versioning if basePath exists
        this.configV2 = new v2_1.Configuration(Object.assign(Object.assign(Object.assign({}, defaultConfig), params), (baseV2Path ? { basePath: baseV2Path } : {})));
        this.config = config;
        this.ArrayApi = new v1_1.ArrayApi(params);
        this.OrganizationApi = new v1_1.OrganizationApi(params);
        this.UserApi = new v1_1.UserApi(params);
        this.NotebookApi = new api_1.NotebookApi(params);
        this.TasksApi = new v1_1.TasksApi(params);
        this.udf = new UDF_1.default(this.config);
        this.sql = new Sql_1.default(this.config);
        this.query = new TileDBQuery_1.default(this.configV2);
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
    registerArray(namespace, array, arrayMetadata, options) {
        return this.ArrayApi.registerArray(namespace, array, arrayMetadata, options);
    }
    listSharedWith(namespace, array, options) {
        return this.ArrayApi.getArraySharingPolicies(namespace, array, options);
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
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.ArrayApi.getArrayMetaDataJson(namespace, notebook);
            const tiledbQuery = new TileDBQuery_1.default(this.configV2);
            const notebookSize = res.data.file_size;
            if (!notebookSize) {
                throw new Error(`file_size was not found inside the array's metadata, are you sure that "${namespace}/${notebook}" is a TileDB notebook?`);
            }
            const query = {
                layout: v2_1.Layout.RowMajor,
                ranges: [[0, notebookSize]],
                bufferSize: notebookSize,
                attributes: ["contents"],
            };
            // NotebookContents is an Array of Uint8
            let notebookContents = [];
            try {
                for (var _b = __asyncValues(tiledbQuery.ReadQuery(namespace, notebook, query)), _c; _c = yield _b.next(), !_c.done;) {
                    let results = _c.value;
                    notebookContents = notebookContents.concat(results.contents);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            const buffer = Uint8Array.from(notebookContents);
            const decoder = new TextDecoder();
            const json = decoder.decode(buffer);
            // Replace unprintable characters
            return json.replace(/[^\x20-\x7E]/g, "");
        });
    }
    downloadNotebookToFile(namespace, notebook) {
        return __awaiter(this, void 0, void 0, function* () {
            const contents = yield this.downloadNotebookContents(namespace, notebook);
            yield save_file_1.default(contents, `${notebook}.ipynb`);
        });
    }
    downloadFile(namespace, file) {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.ArrayApi.getArrayMetaDataJson(namespace, file);
            const { original_file_name, file_size } = res.data;
            if (!original_file_name || !file_size) {
                throw new Error(`file_size or original_file_name were not found inside the array's metadata, are you sure that "${namespace}/${file}" is a TileDB file?`);
            }
            const tiledbQuery = new TileDBQuery_1.default(this.configV2);
            // FileContents is an Array of Uint8
            let fileContents = [];
            const query = {
                layout: v2_1.Layout.RowMajor,
                ranges: [[0, file_size]],
                bufferSize: file_size,
                attributes: ["contents"],
            };
            try {
                for (var _b = __asyncValues(tiledbQuery.ReadQuery(namespace, file, query)), _c; _c = yield _b.next(), !_c.done;) {
                    let results = _c.value;
                    fileContents = fileContents.concat(results.contents);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            const buffer = Uint8Array.from(fileContents).buffer;
            yield save_file_1.default(buffer, original_file_name);
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