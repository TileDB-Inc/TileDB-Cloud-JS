"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = require("../v1");
class TileDBClient {
    constructor(params) {
        this.config = params;
        this.ArrayApi = new v1_1.ArrayApi(params);
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
    unshareArray(namespace, array, options) {
        const noActions = {
            actions: [],
            namespace,
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
}
exports.default = TileDBClient;
//# sourceMappingURL=TileDBClient.js.map