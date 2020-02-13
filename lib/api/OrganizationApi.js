"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AWSAccessCredentials = _interopRequireDefault(require("../model/AWSAccessCredentials"));

var _Error = _interopRequireDefault(require("../model/Error"));

var _Organization = _interopRequireDefault(require("../model/Organization"));

var _OrganizationUser = _interopRequireDefault(require("../model/OrganizationUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Organization service.
* @module api/OrganizationApi
* @version 1.4.0
*/
var OrganizationApi =
/*#__PURE__*/
function () {
  /**
  * Constructs a new OrganizationApi. 
  * @alias module:api/OrganizationApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function OrganizationApi(apiClient) {
    _classCallCheck(this, OrganizationApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * Callback function to receive the result of the addAWSAccessCredentials operation.
   * @callback module:api/OrganizationApi~addAWSAccessCredentialsCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Add aws keys
   * @param {String} namespace namespace
   * @param {module:model/AWSAccessCredentials} awsAccessCredentials aws access credentials to store for a namespace
   * @param {module:api/OrganizationApi~addAWSAccessCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
   */


  _createClass(OrganizationApi, [{
    key: "addAWSAccessCredentials",
    value: function addAWSAccessCredentials(namespace, awsAccessCredentials, callback) {
      var postBody = awsAccessCredentials; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling addAWSAccessCredentials");
      } // verify the required parameter 'awsAccessCredentials' is set


      if (awsAccessCredentials === undefined || awsAccessCredentials === null) {
        throw new _Error["default"]("Missing the required parameter 'awsAccessCredentials' when calling addAWSAccessCredentials");
      }

      var pathParams = {
        'namespace': namespace
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/credentials/{namespace}/aws', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the addUserToOrganization operation.
     * @callback module:api/OrganizationApi~addUserToOrganizationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * add a user to an organization
     * @param {String} organization organization name
     * @param {module:model/OrganizationUser} user user to add
     * @param {module:api/OrganizationApi~addUserToOrganizationCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "addUserToOrganization",
    value: function addUserToOrganization(organization, user, callback) {
      var postBody = user; // verify the required parameter 'organization' is set

      if (organization === undefined || organization === null) {
        throw new _Error["default"]("Missing the required parameter 'organization' when calling addUserToOrganization");
      } // verify the required parameter 'user' is set


      if (user === undefined || user === null) {
        throw new _Error["default"]("Missing the required parameter 'user' when calling addUserToOrganization");
      }

      var pathParams = {
        'organization': organization
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/organizations/{organization}/user', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the checkAWSAccessCredentials operation.
     * @callback module:api/OrganizationApi~checkAWSAccessCredentialsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/AWSAccessCredentials>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Check if aws keys are set
     * @param {String} namespace namespace
     * @param {module:api/OrganizationApi~checkAWSAccessCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/AWSAccessCredentials>}
     */

  }, {
    key: "checkAWSAccessCredentials",
    value: function checkAWSAccessCredentials(namespace, callback) {
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling checkAWSAccessCredentials");
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
      var returnType = [_AWSAccessCredentials["default"]];
      return this.apiClient.callApi('/credentials/{namespace}/aws', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the checkAWSAccessCredentialsByName operation.
     * @callback module:api/OrganizationApi~checkAWSAccessCredentialsByNameCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AWSAccessCredentials} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Check if aws keys are set by name
     * @param {String} namespace namespace
     * @param {String} name name
     * @param {module:api/OrganizationApi~checkAWSAccessCredentialsByNameCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AWSAccessCredentials}
     */

  }, {
    key: "checkAWSAccessCredentialsByName",
    value: function checkAWSAccessCredentialsByName(namespace, name, callback) {
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling checkAWSAccessCredentialsByName");
      } // verify the required parameter 'name' is set


      if (name === undefined || name === null) {
        throw new _Error["default"]("Missing the required parameter 'name' when calling checkAWSAccessCredentialsByName");
      }

      var pathParams = {
        'namespace': namespace,
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _AWSAccessCredentials["default"];
      return this.apiClient.callApi('/credentials/{namespace}/aws/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the createOrganization operation.
     * @callback module:api/OrganizationApi~createOrganizationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * create a organization, the user creating will be listed as owner
     * @param {module:model/Organization} organization organization to create
     * @param {module:api/OrganizationApi~createOrganizationCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "createOrganization",
    value: function createOrganization(organization, callback) {
      var postBody = organization; // verify the required parameter 'organization' is set

      if (organization === undefined || organization === null) {
        throw new _Error["default"]("Missing the required parameter 'organization' when calling createOrganization");
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/organization', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteAWSAccessCredentials operation.
     * @callback module:api/OrganizationApi~deleteAWSAccessCredentialsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * delete a AWS Access credentials in a namespace. This will likely cause arrays to become unreachable
     * @param {String} namespace namespace
     * @param {String} name name
     * @param {module:api/OrganizationApi~deleteAWSAccessCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "deleteAWSAccessCredentials",
    value: function deleteAWSAccessCredentials(namespace, name, callback) {
      var postBody = null; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling deleteAWSAccessCredentials");
      } // verify the required parameter 'name' is set


      if (name === undefined || name === null) {
        throw new _Error["default"]("Missing the required parameter 'name' when calling deleteAWSAccessCredentials");
      }

      var pathParams = {
        'namespace': namespace,
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/credentials/{namespace}/aws/{name}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteOrganization operation.
     * @callback module:api/OrganizationApi~deleteOrganizationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * delete a organization
     * @param {String} organization organization name or id
     * @param {module:api/OrganizationApi~deleteOrganizationCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "deleteOrganization",
    value: function deleteOrganization(organization, callback) {
      var postBody = null; // verify the required parameter 'organization' is set

      if (organization === undefined || organization === null) {
        throw new _Error["default"]("Missing the required parameter 'organization' when calling deleteOrganization");
      }

      var pathParams = {
        'organization': organization
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/organizations/{organization}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteUserFromOrganization operation.
     * @callback module:api/OrganizationApi~deleteUserFromOrganizationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * delete a user from an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @param {module:api/OrganizationApi~deleteUserFromOrganizationCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "deleteUserFromOrganization",
    value: function deleteUserFromOrganization(organization, username, callback) {
      var postBody = null; // verify the required parameter 'organization' is set

      if (organization === undefined || organization === null) {
        throw new _Error["default"]("Missing the required parameter 'organization' when calling deleteUserFromOrganization");
      } // verify the required parameter 'username' is set


      if (username === undefined || username === null) {
        throw new _Error["default"]("Missing the required parameter 'username' when calling deleteUserFromOrganization");
      }

      var pathParams = {
        'organization': organization,
        'username': username
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/organizations/{organization}/{username}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getAllOrganizations operation.
     * @callback module:api/OrganizationApi~getAllOrganizationsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Organization>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get all organizations that the user is member of
     * @param {module:api/OrganizationApi~getAllOrganizationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Organization>}
     */

  }, {
    key: "getAllOrganizations",
    value: function getAllOrganizations(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Organization["default"]];
      return this.apiClient.callApi('/organizations', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getOrganization operation.
     * @callback module:api/OrganizationApi~getOrganizationCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Organization} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get a organization
     * @param {String} organization organization name or id
     * @param {module:api/OrganizationApi~getOrganizationCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Organization}
     */

  }, {
    key: "getOrganization",
    value: function getOrganization(organization, callback) {
      var postBody = null; // verify the required parameter 'organization' is set

      if (organization === undefined || organization === null) {
        throw new _Error["default"]("Missing the required parameter 'organization' when calling getOrganization");
      }

      var pathParams = {
        'organization': organization
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Organization["default"];
      return this.apiClient.callApi('/organizations/{organization}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getOrganizationUser operation.
     * @callback module:api/OrganizationApi~getOrganizationUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OrganizationUser} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get a user from an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @param {module:api/OrganizationApi~getOrganizationUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/OrganizationUser}
     */

  }, {
    key: "getOrganizationUser",
    value: function getOrganizationUser(organization, username, callback) {
      var postBody = null; // verify the required parameter 'organization' is set

      if (organization === undefined || organization === null) {
        throw new _Error["default"]("Missing the required parameter 'organization' when calling getOrganizationUser");
      } // verify the required parameter 'username' is set


      if (username === undefined || username === null) {
        throw new _Error["default"]("Missing the required parameter 'username' when calling getOrganizationUser");
      }

      var pathParams = {
        'organization': organization,
        'username': username
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _OrganizationUser["default"];
      return this.apiClient.callApi('/organizations/{organization}/{username}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateAWSAccessCredentials operation.
     * @callback module:api/OrganizationApi~updateAWSAccessCredentialsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update aws keys or associated buckets. This will update the key associations for each array in the namespace
     * @param {String} namespace namespace
     * @param {String} name name
     * @param {module:model/AWSAccessCredentials} awsAccessCredentials aws credentials to update
     * @param {module:api/OrganizationApi~updateAWSAccessCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "updateAWSAccessCredentials",
    value: function updateAWSAccessCredentials(namespace, name, awsAccessCredentials, callback) {
      var postBody = awsAccessCredentials; // verify the required parameter 'namespace' is set

      if (namespace === undefined || namespace === null) {
        throw new _Error["default"]("Missing the required parameter 'namespace' when calling updateAWSAccessCredentials");
      } // verify the required parameter 'name' is set


      if (name === undefined || name === null) {
        throw new _Error["default"]("Missing the required parameter 'name' when calling updateAWSAccessCredentials");
      } // verify the required parameter 'awsAccessCredentials' is set


      if (awsAccessCredentials === undefined || awsAccessCredentials === null) {
        throw new _Error["default"]("Missing the required parameter 'awsAccessCredentials' when calling updateAWSAccessCredentials");
      }

      var pathParams = {
        'namespace': namespace,
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/credentials/{namespace}/aws/{name}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateOrganization operation.
     * @callback module:api/OrganizationApi~updateOrganizationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * update a organization
     * @param {String} organization organization name or id
     * @param {module:model/Organization} organizationDetails organization details to update
     * @param {module:api/OrganizationApi~updateOrganizationCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "updateOrganization",
    value: function updateOrganization(organization, organizationDetails, callback) {
      var postBody = organizationDetails; // verify the required parameter 'organization' is set

      if (organization === undefined || organization === null) {
        throw new _Error["default"]("Missing the required parameter 'organization' when calling updateOrganization");
      } // verify the required parameter 'organizationDetails' is set


      if (organizationDetails === undefined || organizationDetails === null) {
        throw new _Error["default"]("Missing the required parameter 'organizationDetails' when calling updateOrganization");
      }

      var pathParams = {
        'organization': organization
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/organizations/{organization}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateUserInOrganization operation.
     * @callback module:api/OrganizationApi~updateUserInOrganizationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * update a user in an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @param {module:model/OrganizationUser} user user details to update
     * @param {module:api/OrganizationApi~updateUserInOrganizationCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "updateUserInOrganization",
    value: function updateUserInOrganization(organization, username, user, callback) {
      var postBody = user; // verify the required parameter 'organization' is set

      if (organization === undefined || organization === null) {
        throw new _Error["default"]("Missing the required parameter 'organization' when calling updateUserInOrganization");
      } // verify the required parameter 'username' is set


      if (username === undefined || username === null) {
        throw new _Error["default"]("Missing the required parameter 'username' when calling updateUserInOrganization");
      } // verify the required parameter 'user' is set


      if (user === undefined || user === null) {
        throw new _Error["default"]("Missing the required parameter 'user' when calling updateUserInOrganization");
      }

      var pathParams = {
        'organization': organization,
        'username': username
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/organizations/{organization}/{username}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return OrganizationApi;
}();

exports["default"] = OrganizationApi;