"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ArrayTask = _interopRequireDefault(require("../model/ArrayTask"));

var _ArrayTaskData = _interopRequireDefault(require("../model/ArrayTaskData"));

var _Error = _interopRequireDefault(require("../model/Error"));

var _SQLParameters = _interopRequireDefault(require("../model/SQLParameters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Tasks service.
* @module api/TasksApi
* @version 1.4.0
*/
var TasksApi =
/*#__PURE__*/
function () {
  /**
  * Constructs a new TasksApi. 
  * @alias module:api/TasksApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function TasksApi(apiClient) {
    _classCallCheck(this, TasksApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * Callback function to receive the result of the runSQL operation.
   * @callback module:api/TasksApi~runSQLCallback
   * @param {String} error Error message, if any.
   * @param {Array.<Object>} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Run a sql query
   * @param {String} namespace namespace to run task under is in (an organization name or user's username)
   * @param {module:model/SQLParameters} sql sql being submitted
   * @param {Object} opts Optional parameters
   * @param {String} opts.acceptEncoding Encoding to use
   * @param {module:api/TasksApi~runSQLCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link Array.<Object>}
   */


  _createClass(TasksApi, [{
    key: "runSQL",
    value: function runSQL(namespace, sql, opts, callback) {
      opts = opts || {};
      var postBody = sql; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling runSQL");
      } // verify the required parameter 'sql' is set


      if (sql === undefined || sql === null) {
        throw new _Error["default"]("Missing the required parameter 'sql' when calling runSQL");
      }

      var pathParams = {
        'namespace': namespace
      };
      var queryParams = {};
      var headerParams = {
        'Accept-Encoding': opts['acceptEncoding']
      };
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Object];
      return this.apiClient.callApi('/sql/{namespace}', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the taskIdGet operation.
     * @callback module:api/TasksApi~taskIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ArrayTask} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Fetch an array task
     * @param {String} id task id to fetch
     * @param {module:api/TasksApi~taskIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ArrayTask}
     */

  }, {
    key: "taskIdGet",
    value: function taskIdGet(id, callback) {
      var postBody = null; // verify the required parameter 'id' is set

      if (id === undefined || id === null) {
        throw new _Error["default"]("Missing the required parameter 'id' when calling taskIdGet");
      }

      var pathParams = {
        'id': id
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ArrayTask["default"];
      return this.apiClient.callApi('/task/{id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the tasksGet operation.
     * @callback module:api/TasksApi~tasksGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ArrayTaskData} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Fetch a list of all array tasks a user has access to
     * @param {Object} opts Optional parameters
     * @param {String} opts.namespace namespace to filter
     * @param {String} opts.createdBy username to filter
     * @param {String} opts._array name/uri of array that is url-encoded to filter
     * @param {Number} opts.start start time for tasks to filter by
     * @param {Number} opts.end end time for tasks to filter by
     * @param {Number} opts.page pagination offset
     * @param {Number} opts.perPage pagination limit
     * @param {String} opts.type task type, \"QUERY\", \"SQL\", \"UDF\"
     * @param {String} opts.status Filter to only return these statuses
     * @param {String} opts.search search string that will look at name, namespace or description fields
     * @param {String} opts.orderby sort by which field valid values include start_time, name
     * @param {module:api/TasksApi~tasksGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ArrayTaskData}
     */

  }, {
    key: "tasksGet",
    value: function tasksGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'namespace': opts['namespace'],
        'created_by': opts['createdBy'],
        'array': opts['_array'],
        'start': opts['start'],
        'end': opts['end'],
        'page': opts['page'],
        'per_page': opts['perPage'],
        'type': opts['type'],
        'status': opts['status'],
        'search': opts['search'],
        'orderby': opts['orderby']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ArrayTaskData["default"];
      return this.apiClient.callApi('/tasks', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return TasksApi;
}();

exports["default"] = TasksApi;