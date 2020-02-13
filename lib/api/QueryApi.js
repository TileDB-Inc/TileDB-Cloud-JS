"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Error = _interopRequireDefault(require("../model/Error"));

var _Query = _interopRequireDefault(require("../model/Query"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Query service.
* @module api/QueryApi
* @version 1.4.0
*/
var QueryApi =
/*#__PURE__*/
function () {
  /**
  * Constructs a new QueryApi. 
  * @alias module:api/QueryApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function QueryApi(apiClient) {
    _classCallCheck(this, QueryApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * Callback function to receive the result of the finalizeQuery operation.
   * @callback module:api/QueryApi~finalizeQueryCallback
   * @param {String} error Error message, if any.
   * @param {module:model/Query} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * send a query to run against a specified array/URI registered to a group/project
   * @param {String} namespace namespace array is in (an organization name or user's username)
   * @param {String} _array name/uri of array that is url-encoded
   * @param {String} type type of query
   * @param {String} contentType Content Type of input and return mime
   * @param {module:model/Query} query query to run
   * @param {Object} opts Optional parameters
   * @param {String} opts.xPayer Name of organization or user who should be charged for this request
   * @param {Number} opts.openAt open_at for array in unix epoch
   * @param {module:api/QueryApi~finalizeQueryCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/Query}
   */


  _createClass(QueryApi, [{
    key: "finalizeQuery",
    value: function finalizeQuery(namespace, _array, type, contentType, query, opts, callback) {
      opts = opts || {};
      var postBody = query; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling finalizeQuery");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling finalizeQuery");
      } // verify the required parameter 'type' is set


      if (type === undefined || type === null) {
        throw new _Error["default"]("Missing the required parameter 'type' when calling finalizeQuery");
      } // verify the required parameter 'contentType' is set


      if (contentType === undefined || contentType === null) {
        throw new _Error["default"]("Missing the required parameter 'contentType' when calling finalizeQuery");
      } // verify the required parameter 'query' is set


      if (query === undefined || query === null) {
        throw new _Error["default"]("Missing the required parameter 'query' when calling finalizeQuery");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {
        'type': type,
        'open_at': opts['openAt']
      };
      var headerParams = {
        'Content-Type': contentType,
        'X-Payer': opts['xPayer']
      };
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json', 'application/capnp'];
      var accepts = ['application/json', 'application/capnp'];
      var returnType = _Query["default"];
      return this.apiClient.callApi('/arrays/{namespace}/{array}/query/finalize', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the submitQuery operation.
     * @callback module:api/QueryApi~submitQueryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Query} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * send a query to run against a specified array/URI registered to a group/project
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {String} type type of query
     * @param {String} contentType Content Type of input and return mime
     * @param {module:model/Query} query query to run
     * @param {Object} opts Optional parameters
     * @param {String} opts.xPayer Name of organization or user who should be charged for this request
     * @param {Number} opts.openAt open_at for array in unix epoch
     * @param {module:api/QueryApi~submitQueryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Query}
     */

  }, {
    key: "submitQuery",
    value: function submitQuery(namespace, _array, type, contentType, query, opts, callback) {
      opts = opts || {};
      var postBody = query; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling submitQuery");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling submitQuery");
      } // verify the required parameter 'type' is set


      if (type === undefined || type === null) {
        throw new _Error["default"]("Missing the required parameter 'type' when calling submitQuery");
      } // verify the required parameter 'contentType' is set


      if (contentType === undefined || contentType === null) {
        throw new _Error["default"]("Missing the required parameter 'contentType' when calling submitQuery");
      } // verify the required parameter 'query' is set


      if (query === undefined || query === null) {
        throw new _Error["default"]("Missing the required parameter 'query' when calling submitQuery");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {
        'type': type,
        'open_at': opts['openAt']
      };
      var headerParams = {
        'Content-Type': contentType,
        'X-Payer': opts['xPayer']
      };
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json', 'application/capnp'];
      var accepts = ['application/json', 'application/capnp'];
      var returnType = _Query["default"];
      return this.apiClient.callApi('/arrays/{namespace}/{array}/query/submit', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return QueryApi;
}();

exports["default"] = QueryApi;