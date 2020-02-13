"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Error = _interopRequireDefault(require("../model/Error"));

var _SQLParameters = _interopRequireDefault(require("../model/SQLParameters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Sql service.
* @module api/SqlApi
* @version 1.4.0
*/
var SqlApi =
/*#__PURE__*/
function () {
  /**
  * Constructs a new SqlApi. 
  * @alias module:api/SqlApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function SqlApi(apiClient) {
    _classCallCheck(this, SqlApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * Callback function to receive the result of the runSQL operation.
   * @callback module:api/SqlApi~runSQLCallback
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
   * @param {module:api/SqlApi~runSQLCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link Array.<Object>}
   */


  _createClass(SqlApi, [{
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
  }]);

  return SqlApi;
}();

exports["default"] = SqlApi;