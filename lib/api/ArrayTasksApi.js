"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ArrayTaskBrowserSidebar = _interopRequireDefault(require("../model/ArrayTaskBrowserSidebar"));

var _Error = _interopRequireDefault(require("../model/Error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* ArrayTasks service.
* @module api/ArrayTasksApi
* @version 1.4.0
*/
var ArrayTasksApi =
/*#__PURE__*/
function () {
  /**
  * Constructs a new ArrayTasksApi. 
  * @alias module:api/ArrayTasksApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function ArrayTasksApi(apiClient) {
    _classCallCheck(this, ArrayTasksApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * @param {Object} opts Optional parameters
   * @param {Number} opts.start Fetch tasks created after this time, unix epoch in seconds, default 7 days ago
   * @param {Number} opts.end Fetch tasks created before this time, unix epoch in seconds, default now
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/ArrayTaskBrowserSidebar} and HTTP response
   */


  _createClass(ArrayTasksApi, [{
    key: "getArrayTasksSidebarWithHttpInfo",
    value: function getArrayTasksSidebarWithHttpInfo(opts) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'start': opts['start'],
        'end': opts['end']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ArrayTaskBrowserSidebar["default"];
      return this.apiClient.callApi('/tasks/sidebar', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * @param {Object} opts Optional parameters
     * @param {Number} opts.start Fetch tasks created after this time, unix epoch in seconds, default 7 days ago
     * @param {Number} opts.end Fetch tasks created before this time, unix epoch in seconds, default now
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/ArrayTaskBrowserSidebar}
     */

  }, {
    key: "getArrayTasksSidebar",
    value: function getArrayTasksSidebar(opts) {
      return this.getArrayTasksSidebarWithHttpInfo(opts).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
  }]);

  return ArrayTasksApi;
}();

exports["default"] = ArrayTasksApi;