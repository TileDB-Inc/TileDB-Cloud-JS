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
   * Add aws keys
   * @param {String} namespace namespace
   * @param {module:model/AWSAccessCredentials} awsAccessCredentials aws access credentials to store for a namespace
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
   */


  _createClass(UserApi, [{
    key: "addAWSAccessCredentialsWithHttpInfo",
    value: function addAWSAccessCredentialsWithHttpInfo(namespace, awsAccessCredentials) {
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
      return this.apiClient.callApi('/credentials/{namespace}/aws', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * Add aws keys
     * @param {String} namespace namespace
     * @param {module:model/AWSAccessCredentials} awsAccessCredentials aws access credentials to store for a namespace
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "addAWSAccessCredentials",
    value: function addAWSAccessCredentials(namespace, awsAccessCredentials) {
      return this.addAWSAccessCredentialsWithHttpInfo(namespace, awsAccessCredentials).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * add a user to an organization
     * @param {String} organization organization name
     * @param {module:model/OrganizationUser} user user to add
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */

  }, {
    key: "addUserToOrganizationWithHttpInfo",
    value: function addUserToOrganizationWithHttpInfo(organization, user) {
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
      return this.apiClient.callApi('/organizations/{organization}/user', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * add a user to an organization
     * @param {String} organization organization name
     * @param {module:model/OrganizationUser} user user to add
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "addUserToOrganization",
    value: function addUserToOrganization(organization, user) {
      return this.addUserToOrganizationWithHttpInfo(organization, user).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * Check if aws keys are set
     * @param {String} namespace namespace
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/AWSAccessCredentials>} and HTTP response
     */

  }, {
    key: "checkAWSAccessCredentialsWithHttpInfo",
    value: function checkAWSAccessCredentialsWithHttpInfo(namespace) {
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
      return this.apiClient.callApi('/credentials/{namespace}/aws', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * Check if aws keys are set
     * @param {String} namespace namespace
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/AWSAccessCredentials>}
     */

  }, {
    key: "checkAWSAccessCredentials",
    value: function checkAWSAccessCredentials(namespace) {
      return this.checkAWSAccessCredentialsWithHttpInfo(namespace).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * Check if aws keys are set by name
     * @param {String} namespace namespace
     * @param {String} name name
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/AWSAccessCredentials} and HTTP response
     */

  }, {
    key: "checkAWSAccessCredentialsByNameWithHttpInfo",
    value: function checkAWSAccessCredentialsByNameWithHttpInfo(namespace, name) {
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
      return this.apiClient.callApi('/credentials/{namespace}/aws/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * Check if aws keys are set by name
     * @param {String} namespace namespace
     * @param {String} name name
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/AWSAccessCredentials}
     */

  }, {
    key: "checkAWSAccessCredentialsByName",
    value: function checkAWSAccessCredentialsByName(namespace, name) {
      return this.checkAWSAccessCredentialsByNameWithHttpInfo(namespace, name).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * confirm user email
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */

  }, {
    key: "confirmEmailWithHttpInfo",
    value: function confirmEmailWithHttpInfo() {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = null;
      return this.apiClient.callApi('/user/confirm_email', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * confirm user email
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "confirmEmail",
    value: function confirmEmail() {
      return this.confirmEmailWithHttpInfo().then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * create a user
     * @param {module:model/User} user user to create
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */

  }, {
    key: "createUserWithHttpInfo",
    value: function createUserWithHttpInfo(user) {
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
      return this.apiClient.callApi('/user', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * create a user
     * @param {module:model/User} user user to create
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "createUser",
    value: function createUser(user) {
      return this.createUserWithHttpInfo(user).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * delete a AWS Access credentials in a namespace. This will likely cause arrays to become unreachable
     * @param {String} namespace namespace
     * @param {String} name name
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */

  }, {
    key: "deleteAWSAccessCredentialsWithHttpInfo",
    value: function deleteAWSAccessCredentialsWithHttpInfo(namespace, name) {
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
      return this.apiClient.callApi('/credentials/{namespace}/aws/{name}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * delete a AWS Access credentials in a namespace. This will likely cause arrays to become unreachable
     * @param {String} namespace namespace
     * @param {String} name name
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "deleteAWSAccessCredentials",
    value: function deleteAWSAccessCredentials(namespace, name) {
      return this.deleteAWSAccessCredentialsWithHttpInfo(namespace, name).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * delete a user
     * @param {String} username username or id
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */

  }, {
    key: "deleteUserWithHttpInfo",
    value: function deleteUserWithHttpInfo(username) {
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
      return this.apiClient.callApi('/users/{username}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * delete a user
     * @param {String} username username or id
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "deleteUser",
    value: function deleteUser(username) {
      return this.deleteUserWithHttpInfo(username).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * delete a user from an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */

  }, {
    key: "deleteUserFromOrganizationWithHttpInfo",
    value: function deleteUserFromOrganizationWithHttpInfo(organization, username) {
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
      return this.apiClient.callApi('/organizations/{organization}/{username}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * delete a user from an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "deleteUserFromOrganization",
    value: function deleteUserFromOrganization(organization, username) {
      return this.deleteUserFromOrganizationWithHttpInfo(organization, username).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * get a user from an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/OrganizationUser} and HTTP response
     */

  }, {
    key: "getOrganizationUserWithHttpInfo",
    value: function getOrganizationUserWithHttpInfo(organization, username) {
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
      return this.apiClient.callApi('/organizations/{organization}/{username}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * get a user from an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/OrganizationUser}
     */

  }, {
    key: "getOrganizationUser",
    value: function getOrganizationUser(organization, username) {
      return this.getOrganizationUserWithHttpInfo(organization, username).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * Get session token for user
     * @param {Object} opts Optional parameters
     * @param {String} opts.rememberMe flag to create a token with expiration of 30 days, default is false
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Token} and HTTP response
     */

  }, {
    key: "getSessionWithHttpInfo",
    value: function getSessionWithHttpInfo(opts) {
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
      return this.apiClient.callApi('/session', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * Get session token for user
     * @param {Object} opts Optional parameters
     * @param {String} opts.rememberMe flag to create a token with expiration of 30 days, default is false
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Token}
     */

  }, {
    key: "getSession",
    value: function getSession(opts) {
      return this.getSessionWithHttpInfo(opts).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * get a user
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/User} and HTTP response
     */

  }, {
    key: "getUserWithHttpInfo",
    value: function getUserWithHttpInfo() {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _User["default"];
      return this.apiClient.callApi('/user', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * get a user
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/User}
     */

  }, {
    key: "getUser",
    value: function getUser() {
      return this.getUserWithHttpInfo().then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * get a user
     * @param {String} username username or id
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/User} and HTTP response
     */

  }, {
    key: "getUserWithUsernameWithHttpInfo",
    value: function getUserWithUsernameWithHttpInfo(username) {
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
      return this.apiClient.callApi('/users/{username}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * get a user
     * @param {String} username username or id
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/User}
     */

  }, {
    key: "getUserWithUsername",
    value: function getUserWithUsername(username) {
      return this.getUserWithUsernameWithHttpInfo(username).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * Request an authorization token, optionally taken a TokenRequest object to set parameters on the token
     * @param {Object} opts Optional parameters
     * @param {module:model/TokenRequest} opts.tokenRequest token request object
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Token} and HTTP response
     */

  }, {
    key: "requestTokenWithHttpInfo",
    value: function requestTokenWithHttpInfo(opts) {
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
      return this.apiClient.callApi('/token', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * Request an authorization token, optionally taken a TokenRequest object to set parameters on the token
     * @param {Object} opts Optional parameters
     * @param {module:model/TokenRequest} opts.tokenRequest token request object
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Token}
     */

  }, {
    key: "requestToken",
    value: function requestToken(opts) {
      return this.requestTokenWithHttpInfo(opts).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * reset user password
     * @param {module:model/InlineObject} user 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */

  }, {
    key: "resetUserPasswordWithHttpInfo",
    value: function resetUserPasswordWithHttpInfo(user) {
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
      return this.apiClient.callApi('/user/password_reset', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * reset user password
     * @param {module:model/InlineObject} user 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "resetUserPassword",
    value: function resetUserPassword(user) {
      return this.resetUserPasswordWithHttpInfo(user).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * revoke an authorization token
     * @param {String} token token name or token itself
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */

  }, {
    key: "revokeTokenWithHttpInfo",
    value: function revokeTokenWithHttpInfo(token) {
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
      return this.apiClient.callApi('/tokens/{token}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * revoke an authorization token
     * @param {String} token token name or token itself
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "revokeToken",
    value: function revokeToken(token) {
      return this.revokeTokenWithHttpInfo(token).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * Fetch a list of user tokens
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/Token>} and HTTP response
     */

  }, {
    key: "tokensGetWithHttpInfo",
    value: function tokensGetWithHttpInfo() {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['ApiKeyAuth', 'BasicAuth', 'OAuth2'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Token["default"]];
      return this.apiClient.callApi('/tokens', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * Fetch a list of user tokens
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/Token>}
     */

  }, {
    key: "tokensGet",
    value: function tokensGet() {
      return this.tokensGetWithHttpInfo().then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * Update aws keys or associated buckets. This will update the key associations for each array in the namespace
     * @param {String} namespace namespace
     * @param {String} name name
     * @param {module:model/AWSAccessCredentials} awsAccessCredentials aws credentials to update
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */

  }, {
    key: "updateAWSAccessCredentialsWithHttpInfo",
    value: function updateAWSAccessCredentialsWithHttpInfo(namespace, name, awsAccessCredentials) {
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
      return this.apiClient.callApi('/credentials/{namespace}/aws/{name}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * Update aws keys or associated buckets. This will update the key associations for each array in the namespace
     * @param {String} namespace namespace
     * @param {String} name name
     * @param {module:model/AWSAccessCredentials} awsAccessCredentials aws credentials to update
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "updateAWSAccessCredentials",
    value: function updateAWSAccessCredentials(namespace, name, awsAccessCredentials) {
      return this.updateAWSAccessCredentialsWithHttpInfo(namespace, name, awsAccessCredentials).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * update a user
     * @param {String} username username or id
     * @param {module:model/User} user user details to update
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */

  }, {
    key: "updateUserWithHttpInfo",
    value: function updateUserWithHttpInfo(username, user) {
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
      return this.apiClient.callApi('/users/{username}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * update a user
     * @param {String} username username or id
     * @param {module:model/User} user user details to update
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "updateUser",
    value: function updateUser(username, user) {
      return this.updateUserWithHttpInfo(username, user).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * update a user in an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @param {module:model/OrganizationUser} user user details to update
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */

  }, {
    key: "updateUserInOrganizationWithHttpInfo",
    value: function updateUserInOrganizationWithHttpInfo(organization, username, user) {
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
      return this.apiClient.callApi('/organizations/{organization}/{username}', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * update a user in an organization
     * @param {String} organization organization name
     * @param {String} username username to manipulate
     * @param {module:model/OrganizationUser} user user details to update
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */

  }, {
    key: "updateUserInOrganization",
    value: function updateUserInOrganization(organization, username, user) {
      return this.updateUserInOrganizationWithHttpInfo(organization, username, user).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
  }]);

  return UserApi;
}();

exports["default"] = UserApi;