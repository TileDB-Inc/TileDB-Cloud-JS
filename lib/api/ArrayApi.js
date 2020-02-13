"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ArrayActivityLog = _interopRequireDefault(require("../model/ArrayActivityLog"));

var _ArrayInfo = _interopRequireDefault(require("../model/ArrayInfo"));

var _ArrayInfoUpdate = _interopRequireDefault(require("../model/ArrayInfoUpdate"));

var _ArraySample = _interopRequireDefault(require("../model/ArraySample"));

var _ArraySchema = _interopRequireDefault(require("../model/ArraySchema"));

var _ArraySharing = _interopRequireDefault(require("../model/ArraySharing"));

var _Error = _interopRequireDefault(require("../model/Error"));

var _LastAccessedArray = _interopRequireDefault(require("../model/LastAccessedArray"));

var _MaxBufferSizes = _interopRequireDefault(require("../model/MaxBufferSizes"));

var _NonEmptyDomain = _interopRequireDefault(require("../model/NonEmptyDomain"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Array service.
* @module api/ArrayApi
* @version 1.4.0
*/
var ArrayApi =
/*#__PURE__*/
function () {
  /**
  * Constructs a new ArrayApi. 
  * @alias module:api/ArrayApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function ArrayApi(apiClient) {
    _classCallCheck(this, ArrayApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * Callback function to receive the result of the arrayActivityLog operation.
   * @callback module:api/ArrayApi~arrayActivityLogCallback
   * @param {String} error Error message, if any.
   * @param {Array.<module:model/ArrayActivityLog>} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * get array activity logs
   * @param {String} namespace namespace array is in (an organization name or user's username)
   * @param {String} _array name/uri of array that is url-encoded
   * @param {Object} opts Optional parameters
   * @param {Number} opts.start Start time of window of fetch logs, unix epoch in seconds (default: seven days ago)
   * @param {Number} opts.end End time of window of fetch logs, unix epoch in seconds (default: current utc timestamp)
   * @param {String} opts.eventTypes Event values can be one or more of the following read, write, create, delete, register, deregister, comma separated
   * @param {String} opts.taskId Array task id To filter activity to
   * @param {module:api/ArrayApi~arrayActivityLogCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link Array.<module:model/ArrayActivityLog>}
   */


  _createClass(ArrayApi, [{
    key: "arrayActivityLog",
    value: function arrayActivityLog(namespace, _array, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling arrayActivityLog");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling arrayActivityLog");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {
        'start': opts['start'],
        'end': opts['end'],
        'event_types': opts['eventTypes'],
        'task_id': opts['taskId']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_ArrayActivityLog["default"]];
      return this.apiClient.callApi('/arrays/{namespace}/{array}/activity', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the createArray operation.
     * @callback module:api/ArrayApi~createArrayCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * create a array schema at a specified URI registered to a group/project
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {String} contentType Content Type of input and return mime
     * @param {module:model/ArraySchema} arraySchema ArraySchema being created
     * @param {module:api/ArrayApi~createArrayCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "createArray",
    value: function createArray(namespace, _array, contentType, arraySchema, callback) {
      var postBody = arraySchema; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling createArray");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling createArray");
      } // verify the required parameter 'contentType' is set


      if (contentType === undefined || contentType === null) {
        throw new _Error["default"]("Missing the required parameter 'contentType' when calling createArray");
      } // verify the required parameter 'arraySchema' is set


      if (arraySchema === undefined || arraySchema === null) {
        throw new _Error["default"]("Missing the required parameter 'arraySchema' when calling createArray");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {
        'Content-Type': contentType
      };
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/arrays/{namespace}/{array}', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteArray operation.
     * @callback module:api/ArrayApi~deleteArrayCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * delete a array
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {String} contentType Content Type of input and return mime
     * @param {module:api/ArrayApi~deleteArrayCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "deleteArray",
    value: function deleteArray(namespace, _array, contentType, callback) {
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling deleteArray");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling deleteArray");
      } // verify the required parameter 'contentType' is set


      if (contentType === undefined || contentType === null) {
        throw new _Error["default"]("Missing the required parameter 'contentType' when calling deleteArray");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {
        'Content-Type': contentType
      };
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/arrays/{namespace}/{array}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deregisterArray operation.
     * @callback module:api/ArrayApi~deregisterArrayCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * deregister a array
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {module:api/ArrayApi~deregisterArrayCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "deregisterArray",
    value: function deregisterArray(namespace, _array, callback) {
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling deregisterArray");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling deregisterArray");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/arrays/{namespace}/{array}/deregister', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getAllArrayMetadata operation.
     * @callback module:api/ArrayApi~getAllArrayMetadataCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ArrayInfo>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get all array metadata user has access to
     * @param {Object} opts Optional parameters
     * @param {String} opts.publicShare Public share values can be one of exclude, only
     * @param {module:api/ArrayApi~getAllArrayMetadataCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ArrayInfo>}
     */

  }, {
    key: "getAllArrayMetadata",
    value: function getAllArrayMetadata(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'public_share': opts['publicShare']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_ArrayInfo["default"]];
      return this.apiClient.callApi('/arrays', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getArray operation.
     * @callback module:api/ArrayApi~getArrayCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ArraySchema} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get an ArraySchema using a url encoded uri
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {String} contentType Content Type of input and return mime
     * @param {module:api/ArrayApi~getArrayCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ArraySchema}
     */

  }, {
    key: "getArray",
    value: function getArray(namespace, _array, contentType, callback) {
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling getArray");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling getArray");
      } // verify the required parameter 'contentType' is set


      if (contentType === undefined || contentType === null) {
        throw new _Error["default"]("Missing the required parameter 'contentType' when calling getArray");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {
        'Content-Type': contentType
      };
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json', 'application/capnp'];
      var returnType = _ArraySchema["default"];
      return this.apiClient.callApi('/arrays/{namespace}/{array}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getArrayMaxBufferSizes operation.
     * @callback module:api/ArrayApi~getArrayMaxBufferSizesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MaxBufferSizes} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get the max buffer sizes of an array for a subarray
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {String} subarray CSV string of subarray to get max buffer sizes for
     * @param {String} contentType Content Type of input and return mime
     * @param {Object} opts Optional parameters
     * @param {String} opts.xPayer Name of organization or user who should be charged for this request
     * @param {module:api/ArrayApi~getArrayMaxBufferSizesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MaxBufferSizes}
     */

  }, {
    key: "getArrayMaxBufferSizes",
    value: function getArrayMaxBufferSizes(namespace, _array, subarray, contentType, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling getArrayMaxBufferSizes");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling getArrayMaxBufferSizes");
      } // verify the required parameter 'subarray' is set


      if (subarray === undefined || subarray === null) {
        throw new _Error["default"]("Missing the required parameter 'subarray' when calling getArrayMaxBufferSizes");
      } // verify the required parameter 'contentType' is set


      if (contentType === undefined || contentType === null) {
        throw new _Error["default"]("Missing the required parameter 'contentType' when calling getArrayMaxBufferSizes");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {
        'subarray': subarray
      };
      var headerParams = {
        'Content-Type': contentType,
        'X-Payer': opts['xPayer']
      };
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _MaxBufferSizes["default"];
      return this.apiClient.callApi('/arrays/{namespace}/{array}/max_buffer_sizes', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getArrayMetaDataJson operation.
     * @callback module:api/ArrayApi~getArrayMetaDataJsonCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get metadata from the array in json format
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {module:api/ArrayApi~getArrayMetaDataJsonCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */

  }, {
    key: "getArrayMetaDataJson",
    value: function getArrayMetaDataJson(namespace, _array, callback) {
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling getArrayMetaDataJson");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling getArrayMetaDataJson");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = Object;
      return this.apiClient.callApi('/arrays/{namespace}/{array}/metadata_json', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getArrayMetadata operation.
     * @callback module:api/ArrayApi~getArrayMetadataCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ArrayInfo} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get metadata on an array
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {module:api/ArrayApi~getArrayMetadataCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ArrayInfo}
     */

  }, {
    key: "getArrayMetadata",
    value: function getArrayMetadata(namespace, _array, callback) {
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling getArrayMetadata");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling getArrayMetadata");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ArrayInfo["default"];
      return this.apiClient.callApi('/arrays/{namespace}/{array}/metadata', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getArrayNonEmptyDomain operation.
     * @callback module:api/ArrayApi~getArrayNonEmptyDomainCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NonEmptyDomain} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get the non empty domain of an array
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {String} contentType Content Type of input and return mime
     * @param {Object} opts Optional parameters
     * @param {String} opts.xPayer Name of organization or user who should be charged for this request
     * @param {module:api/ArrayApi~getArrayNonEmptyDomainCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NonEmptyDomain}
     */

  }, {
    key: "getArrayNonEmptyDomain",
    value: function getArrayNonEmptyDomain(namespace, _array, contentType, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling getArrayNonEmptyDomain");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling getArrayNonEmptyDomain");
      } // verify the required parameter 'contentType' is set


      if (contentType === undefined || contentType === null) {
        throw new _Error["default"]("Missing the required parameter 'contentType' when calling getArrayNonEmptyDomain");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {
        'Content-Type': contentType,
        'X-Payer': opts['xPayer']
      };
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _NonEmptyDomain["default"];
      return this.apiClient.callApi('/arrays/{namespace}/{array}/non_empty_domain', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getArraySampleData operation.
     * @callback module:api/ArrayApi~getArraySampleDataCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ArraySample} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get an sample set of data from the array
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {Object} opts Optional parameters
     * @param {Number} opts.samples Number of sample results to return (default to 5.0)
     * @param {module:api/ArrayApi~getArraySampleDataCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ArraySample}
     */

  }, {
    key: "getArraySampleData",
    value: function getArraySampleData(namespace, _array, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling getArraySampleData");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling getArraySampleData");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {
        'samples': opts['samples']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ArraySample["default"];
      return this.apiClient.callApi('/arrays/{namespace}/{array}/sample', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getArraySharingPolicies operation.
     * @callback module:api/ArrayApi~getArraySharingPoliciesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ArraySharing>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get all sharing details of the array
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {module:api/ArrayApi~getArraySharingPoliciesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ArraySharing>}
     */

  }, {
    key: "getArraySharingPolicies",
    value: function getArraySharingPolicies(namespace, _array, callback) {
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling getArraySharingPolicies");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling getArraySharingPolicies");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_ArraySharing["default"]];
      return this.apiClient.callApi('/arrays/{namespace}/{array}/share', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getArraysInNamespace operation.
     * @callback module:api/ArrayApi~getArraysInNamespaceCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ArrayInfo>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get metadata on all arrays in a namespace
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {module:api/ArrayApi~getArraysInNamespaceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ArrayInfo>}
     */

  }, {
    key: "getArraysInNamespace",
    value: function getArraysInNamespace(namespace, callback) {
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling getArraysInNamespace");
      }

      var pathParams = {
        'namespace': namespace
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_ArrayInfo["default"]];
      return this.apiClient.callApi('/arrays/{namespace}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getLastAccessedArrays operation.
     * @callback module:api/ArrayApi~getLastAccessedArraysCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/LastAccessedArray>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/ArrayApi~getLastAccessedArraysCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/LastAccessedArray>}
     */

  }, {
    key: "getLastAccessedArrays",
    value: function getLastAccessedArrays(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_LastAccessedArray["default"]];
      return this.apiClient.callApi('/arrays/last_accessed', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the registerArray operation.
     * @callback module:api/ArrayApi~registerArrayCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * register an array at a specified URI registered to the given namespace
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {module:model/ArrayInfoUpdate} arrayMetadata metadata associated with array
     * @param {module:api/ArrayApi~registerArrayCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "registerArray",
    value: function registerArray(namespace, _array, arrayMetadata, callback) {
      var postBody = arrayMetadata; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling registerArray");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling registerArray");
      } // verify the required parameter 'arrayMetadata' is set


      if (arrayMetadata === undefined || arrayMetadata === null) {
        throw new _Error["default"]("Missing the required parameter 'arrayMetadata' when calling registerArray");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/arrays/{namespace}/{array}/register', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the shareArray operation.
     * @callback module:api/ArrayApi~shareArrayCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Share an array with a user
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {module:model/ArraySharing} arraySharing Namespace and list of permissions to share with. An empty list of permissions will remove the namespace, if permissions already exist they will be deleted then new ones added. In the event of a failure, the new polcies will be rolled back to prevent partial policies, and its likely the array will not be shared with the namespace at all
     * @param {module:api/ArrayApi~shareArrayCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "shareArray",
    value: function shareArray(namespace, _array, arraySharing, callback) {
      var postBody = arraySharing; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling shareArray");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling shareArray");
      } // verify the required parameter 'arraySharing' is set


      if (arraySharing === undefined || arraySharing === null) {
        throw new _Error["default"]("Missing the required parameter 'arraySharing' when calling shareArray");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/arrays/{namespace}/{array}/share', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateArrayMetadata operation.
     * @callback module:api/ArrayApi~updateArrayMetadataCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * update metadata on an array
     * @param {String} namespace namespace array is in (an organization name or user's username)
     * @param {String} _array name/uri of array that is url-encoded
     * @param {module:model/ArrayInfoUpdate} arrayMetadata array metadata to update
     * @param {module:api/ArrayApi~updateArrayMetadataCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "updateArrayMetadata",
    value: function updateArrayMetadata(namespace, _array, arrayMetadata, callback) {
      var postBody = arrayMetadata; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling updateArrayMetadata");
      } // verify the required parameter '_array' is set


      if (_array === undefined || _array === null) {
        throw new _Error["default"]("Missing the required parameter '_array' when calling updateArrayMetadata");
      } // verify the required parameter 'arrayMetadata' is set


      if (arrayMetadata === undefined || arrayMetadata === null) {
        throw new _Error["default"]("Missing the required parameter 'arrayMetadata' when calling updateArrayMetadata");
      }

      var pathParams = {
        'namespace': namespace,
        'array': _array
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/arrays/{namespace}/{array}/metadata', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return ArrayApi;
}();

exports["default"] = ArrayApi;