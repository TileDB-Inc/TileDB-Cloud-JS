"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./arrayApi"));
const arrayApi_1 = require("./arrayApi");
__export(require("./arrayTasksApi"));
const arrayTasksApi_1 = require("./arrayTasksApi");
__export(require("./organizationApi"));
const organizationApi_1 = require("./organizationApi");
__export(require("./queryApi"));
const queryApi_1 = require("./queryApi");
__export(require("./sqlApi"));
const sqlApi_1 = require("./sqlApi");
__export(require("./statsApi"));
const statsApi_1 = require("./statsApi");
__export(require("./tasksApi"));
const tasksApi_1 = require("./tasksApi");
__export(require("./udfApi"));
const udfApi_1 = require("./udfApi");
__export(require("./userApi"));
const userApi_1 = require("./userApi");
class HttpError extends Error {
    constructor(response, body, statusCode) {
        super('HTTP request failed');
        this.response = response;
        this.body = body;
        this.statusCode = statusCode;
        this.name = 'HttpError';
    }
}
exports.HttpError = HttpError;
exports.APIS = [arrayApi_1.ArrayApi, arrayTasksApi_1.ArrayTasksApi, organizationApi_1.OrganizationApi, queryApi_1.QueryApi, sqlApi_1.SqlApi, statsApi_1.StatsApi, tasksApi_1.TasksApi, udfApi_1.UdfApi, userApi_1.UserApi];
//# sourceMappingURL=apis.js.map