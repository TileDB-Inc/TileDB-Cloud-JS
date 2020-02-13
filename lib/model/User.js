"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _NamespaceActions = _interopRequireDefault(require("./NamespaceActions"));

var _OrganizationUser = _interopRequireDefault(require("./OrganizationUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The User model module.
 * @module model/User
 * @version 1.4.0
 */
var User =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>User</code>.
   * User
   * @alias module:model/User
   * @param username {String} username must be unique
   */
  function User(username) {
    _classCallCheck(this, User);

    User.initialize(this, username);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(User, null, [{
    key: "initialize",
    value: function initialize(obj, username) {
      obj['username'] = username;
    }
    /**
     * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/User} obj Optional instance to populate.
     * @return {module:model/User} The populated <code>User</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new User();

        if (data.hasOwnProperty('id')) {
          obj['id'] = _ApiClient["default"].convertToType(data['id'], 'String');
        }

        if (data.hasOwnProperty('username')) {
          obj['username'] = _ApiClient["default"].convertToType(data['username'], 'String');
        }

        if (data.hasOwnProperty('password')) {
          obj['password'] = _ApiClient["default"].convertToType(data['password'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('email')) {
          obj['email'] = _ApiClient["default"].convertToType(data['email'], 'String');
        }

        if (data.hasOwnProperty('is_valid_email')) {
          obj['is_valid_email'] = _ApiClient["default"].convertToType(data['is_valid_email'], 'Boolean');
        }

        if (data.hasOwnProperty('logo')) {
          obj['logo'] = _ApiClient["default"].convertToType(data['logo'], 'String');
        }

        if (data.hasOwnProperty('last_activity_date')) {
          obj['last_activity_date'] = _ApiClient["default"].convertToType(data['last_activity_date'], 'Date');
        }

        if (data.hasOwnProperty('timezone')) {
          obj['timezone'] = _ApiClient["default"].convertToType(data['timezone'], 'String');
        }

        if (data.hasOwnProperty('organizations')) {
          obj['organizations'] = _ApiClient["default"].convertToType(data['organizations'], [_OrganizationUser["default"]]);
        }

        if (data.hasOwnProperty('allowed_actions')) {
          obj['allowed_actions'] = _ApiClient["default"].convertToType(data['allowed_actions'], [_NamespaceActions["default"]]);
        }

        if (data.hasOwnProperty('enabled_features')) {
          obj['enabled_features'] = _ApiClient["default"].convertToType(data['enabled_features'], ['String']);
        }
      }

      return obj;
    }
  }]);

  return User;
}();
/**
 * unique id of user
 * @member {String} id
 */


User.prototype['id'] = undefined;
/**
 * username must be unique
 * @member {String} username
 */

User.prototype['username'] = undefined;
/**
 * password
 * @member {String} password
 */

User.prototype['password'] = undefined;
/**
 * the user's full, real name
 * @member {String} name
 */

User.prototype['name'] = undefined;
/**
 * the user's email
 * @member {String} email
 */

User.prototype['email'] = undefined;
/**
 * user's email is validated to be correct
 * @member {Boolean} is_valid_email
 */

User.prototype['is_valid_email'] = undefined;
/**
 * the user's logo
 * @member {String} logo
 */

User.prototype['logo'] = undefined;
/**
 * when the user last logged in (set by the server)
 * @member {Date} last_activity_date
 */

User.prototype['last_activity_date'] = undefined;
/**
 * @member {String} timezone
 */

User.prototype['timezone'] = undefined;
/**
 * Array of organizations a user is part of and their roles
 * @member {Array.<module:model/OrganizationUser>} organizations
 */

User.prototype['organizations'] = undefined;
/**
 * list of actions user is allowed to do on this organization
 * @member {Array.<module:model/NamespaceActions>} allowed_actions
 */

User.prototype['allowed_actions'] = undefined;
/**
 * List of extra/optional/beta features to enable for namespace
 * @member {Array.<String>} enabled_features
 */

User.prototype['enabled_features'] = undefined;
var _default = User;
exports["default"] = _default;