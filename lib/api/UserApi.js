"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AWSAccessCredentials = _interopRequireDefault(require("../model/AWSAccessCredentials"));

var _Error = _interopRequireDefault(require("../model/Error"));

var _InlineObject = _interopRequireDefault(require("../model/InlineObject"));

var _OrganizationUser = _interopRequireDefault(require("../model/OrganizationUser"));

var _Token = _interopRequireDefault(require("../model/Token"));

var _TokenRequest = _interopRequireDefault(require("../model/TokenRequest"));

var _User = _interopRequireDefault(require("../model/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* User service.
* @module api/UserApi
* @version 1.4.0
*/
var UserApi =
/*#__PURE__*/
function () {
  /**
  * Constructs a new UserApi. 
  * @alias module:api/UserApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function UserApi(apiClient) {
    _classCallCheck(this, UserApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * Callback function to receive the result of the addAWSAccessCredentials operation.
   * @callback module:api/UserApi~addAWSAccessCredentialsCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Add aws keys
   * @param {String} namespace namespace
   * @param {module:model/AWSAccessCredentials} awsAccessCredentials aws access credentials to store for a namespace
   * @param {module:api/UserApi~addAWSAccessCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
   */


  _createClass(UserApi, [{
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
     * @callback module:api/UserApi~addUserToOrganizationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * add a user to an organization
     * @param {String} organization organization name
     * @param {module:model/OrganizationUser} user user to add
     * @param {module:api/UserApi~addUserToOrganizationCallback} callback The callback function, accepting three arguments: error, data, response
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
     * @callback module:api/UserApi~checkAWSAccessCredentialsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/AWSAccessCredentials>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Check if aws keys are set
     * @param {String} namespace namespace
     * @param {module:api/UserApi~checkAWSAccessCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
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
     * @callback module:api/UserApi~checkAWSAccessCredentialsByNameCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AWSAccessCredentials} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Check if aws keys are set by name
     * @param {String} namespace namespace
     * @param {String} name name
     * @param {module:api/UserApi~checkAWSAccessCredentialsByNameCallback} callback The callback function, accepting three arguments: error, data, response
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
     * Callback function to receive the result of the confirmEmail operation.
     * @callback module:api/UserApi~confirmEmailCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * confirm user email
     * @param {module:api/UserApi~confirmEmailCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "confirmEmail",
    value: function confirmEmail(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/user/confirm_email', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the createUser operation.
     * @callback module:api/UserApi~createUserCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * create a user
     * @param {module:model/User} user user to create
     * @param {module:api/UserApi~createUserCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "createUser",
    value: function createUser(user, callback) {
      var postBody = user; // verify the required parameter 'user' is set

      if (user === undefined || user === null) {
        throw new _Error["default"]("Missing the required parameter 'user' when calling createUser");
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/user', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteAWSAccessCredentials operation.
     * @callback module:api/UserApi~deleteAWSAccessCredentialsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * delete a AWS Access credentials in a namespace. This will likely cause arrays to become unreachable
     * @param {String} namespace namespace
     * @param {String} name name
     * @param {module:api/UserApi~deleteAWSAccessCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
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
     * Callback function to receive the result of the deleteUser operation.
     * @callback module:api/UserApi~deleteUserCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * delete a user
     * @param {String} username username or id
     * @param {module:api/UserApi~deleteUserCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "deleteUser",
    value: function deleteUser(username, callback) {
      var postBody = null; // verify the required parameter 'username' is set

      if (username === undefined || username === null) {
        throw new _Error["default"]("Missing the required parameter 'username' when calling deleteUser");
      }

      var pathParams = {
        'username': username
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/users/{username}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the deleteUserFromOrganization operation.
     * @callback module:api/UserApi~deleteUserFromOrganizationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * delete a user from an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @param {module:api/UserApi~deleteUserFromOrganizationCallback} callback The callback function, accepting three arguments: error, data, response
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
     * Callback function to receive the result of the getOrganizationUser operation.
     * @callback module:api/UserApi~getOrganizationUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OrganizationUser} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get a user from an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @param {module:api/UserApi~getOrganizationUserCallback} callback The callback function, accepting three arguments: error, data, response
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
     * Callback function to receive the result of the getSession operation.
     * @callback module:api/UserApi~getSessionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Token} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get session token for user
     * @param {Object} opts Optional parameters
     * @param {String} opts.rememberMe flag to create a token with expiration of 30 days, default is false
     * @param {module:api/UserApi~getSessionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Token}
     */

  }, {
    key: "getSession",
    value: function getSession(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'remember_me': opts['rememberMe']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Token["default"];
      return this.apiClient.callApi('/session', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getUser operation.
     * @callback module:api/UserApi~getUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/User} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get a user
     * @param {module:api/UserApi~getUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/User}
     */

  }, {
    key: "getUser",
    value: function getUser(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _User["default"];
      return this.apiClient.callApi('/user', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the getUserWithUsername operation.
     * @callback module:api/UserApi~getUserWithUsernameCallback
     * @param {String} error Error message, if any.
     * @param {module:model/User} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * get a user
     * @param {String} username username or id
     * @param {module:api/UserApi~getUserWithUsernameCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/User}
     */

  }, {
    key: "getUserWithUsername",
    value: function getUserWithUsername(username, callback) {
      var postBody = null; // verify the required parameter 'username' is set

      if (username === undefined || username === null) {
        throw new _Error["default"]("Missing the required parameter 'username' when calling getUserWithUsername");
      }

      var pathParams = {
        'username': username
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _User["default"];
      return this.apiClient.callApi('/users/{username}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the requestToken operation.
     * @callback module:api/UserApi~requestTokenCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Token} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Request an authorization token, optionally taken a TokenRequest object to set parameters on the token
     * @param {Object} opts Optional parameters
     * @param {module:model/TokenRequest} opts.tokenRequest token request object
     * @param {module:api/UserApi~requestTokenCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Token}
     */

  }, {
    key: "requestToken",
    value: function requestToken(opts, callback) {
      opts = opts || {};
      var postBody = opts['tokenRequest'];
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Token["default"];
      return this.apiClient.callApi('/token', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the resetUserPassword operation.
     * @callback module:api/UserApi~resetUserPasswordCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * reset user password
     * @param {module:model/InlineObject} user 
     * @param {module:api/UserApi~resetUserPasswordCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "resetUserPassword",
    value: function resetUserPassword(user, callback) {
      var postBody = user; // verify the required parameter 'user' is set

      if (user === undefined || user === null) {
        throw new _Error["default"]("Missing the required parameter 'user' when calling resetUserPassword");
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/user/password_reset', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the revokeToken operation.
     * @callback module:api/UserApi~revokeTokenCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * revoke an authorization token
     * @param {String} token token name or token itself
     * @param {module:api/UserApi~revokeTokenCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "revokeToken",
    value: function revokeToken(token, callback) {
      var postBody = null; // verify the required parameter 'token' is set

      if (token === undefined || token === null) {
        throw new _Error["default"]("Missing the required parameter 'token' when calling revokeToken");
      }

      var pathParams = {
        'token': token
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/tokens/{token}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the tokensGet operation.
     * @callback module:api/UserApi~tokensGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Token>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Fetch a list of user tokens
     * @param {module:api/UserApi~tokensGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Token>}
     */

  }, {
    key: "tokensGet",
    value: function tokensGet(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Token["default"]];
      return this.apiClient.callApi('/tokens', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateAWSAccessCredentials operation.
     * @callback module:api/UserApi~updateAWSAccessCredentialsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update aws keys or associated buckets. This will update the key associations for each array in the namespace
     * @param {String} namespace namespace
     * @param {String} name name
     * @param {module:model/AWSAccessCredentials} awsAccessCredentials aws credentials to update
     * @param {module:api/UserApi~updateAWSAccessCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
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
     * Callback function to receive the result of the updateUser operation.
     * @callback module:api/UserApi~updateUserCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * update a user
     * @param {String} username username or id
     * @param {module:model/User} user user details to update
     * @param {module:api/UserApi~updateUserCallback} callback The callback function, accepting three arguments: error, data, response
     */

  }, {
    key: "updateUser",
    value: function updateUser(username, user, callback) {
      var postBody = user; // verify the required parameter 'username' is set

      if (username === undefined || username === null) {
        throw new _Error["default"]("Missing the required parameter 'username' when calling updateUser");
      } // verify the required parameter 'user' is set


      if (user === undefined || user === null) {
        throw new _Error["default"]("Missing the required parameter 'user' when calling updateUser");
      }

      var pathParams = {
        'username': username
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/users/{username}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the updateUserInOrganization operation.
     * @callback module:api/UserApi~updateUserInOrganizationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * update a user in an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @param {module:model/OrganizationUser} user user details to update
     * @param {module:api/UserApi~updateUserInOrganizationCallback} callback The callback function, accepting three arguments: error, data, response
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

  return UserApi;
}();

exports["default"] = UserApi;