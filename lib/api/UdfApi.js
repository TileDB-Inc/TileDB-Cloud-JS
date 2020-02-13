"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Error = _interopRequireDefault(require("../model/Error"));

var _UDF = _interopRequireDefault(require("../model/UDF"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Udf service.
* @module api/UdfApi
* @version 1.4.0
*/
var UdfApi =
/*#__PURE__*/
function () {
  /**
  * Constructs a new UdfApi. 
  * @alias module:api/UdfApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function UdfApi(apiClient) {
    _classCallCheck(this, UdfApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * Callback function to receive the result of the submitUDF operation.
   * @callback module:api/UdfApi~submitUDFCallback
   * @param {String} error Error message, if any.
   * @param {File} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * send a UDF to run against a specified array/URI registered to a group/project
   * @param {String} namespace namespace array is in (an organization name or user's username)
   * @param {String} _array name/uri of array that is url-encoded
   * @param {module:model/UDF} udf udf to run
   * @param {Object} opts Optional parameters
   * @param {String} opts.xPayer Name of organization or user who should be charged for this request
   * @param {String} opts.acceptEncoding Encoding to use
   * @param {module:api/UdfApi~submitUDFCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link File}
   */


  _createClass(UdfApi, [{
    key: "submitUDF",
    value: function submitUDF(namespace, _array, udf, opts, callback) {
      opts = opts || {};
      var postBody = udf; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling submitUDF");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling submitUDF");
      } // verify the required parameter 'udf' is set


      if (udf === undefined || udf === null) {
        throw new _Error["default"]("Missing the required parameter 'udf' when calling submitUDF");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {
        'X-Payer': opts['xPayer'],
        'Accept-Encoding': opts['acceptEncoding']
      };
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/octet-stream'];
      var returnType = File;
      return this.apiClient.callApi('/arrays/{namespace}/{array}/udf/submit', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return UdfApi;
}();

exports["default"] = UdfApi;