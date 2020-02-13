"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _NamespaceActions = _interopRequireDefault(require("./NamespaceActions"));

var _OrganizationRoles = _interopRequireDefault(require("./OrganizationRoles"));

var _OrganizationUser = _interopRequireDefault(require("./OrganizationUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Organization model module.
 * @module model/Organization
 * @version 1.4.0
 */
var Organization =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>Organization</code>.
   * Organization
   * @alias module:model/Organization
   * @param name {String} organization name must be unique
   */
  function Organization(name) {
    _classCallCheck(this, Organization);

    Organization.initialize(this, name);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Organization, null, [{
    key: "initialize",
    value: function initialize(obj, name) {
      obj['name'] = name;
    }
    /**
     * Constructs a <code>Organization</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Organization} obj Optional instance to populate.
     * @return {module:model/Organization} The populated <code>Organization</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Organization();

        if (data.hasOwnProperty('id')) {
          obj['id'] = _ApiClient["default"].convertToType(data['id'], 'String');
        }

        if (data.hasOwnProperty('role')) {
          obj['role'] = _OrganizationRoles["default"].constructFromObject(data['role']);
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('created_at')) {
          obj['created_at'] = _ApiClient["default"].convertToType(data['created_at'], 'Date');
        }

        if (data.hasOwnProperty('updated_at')) {
          obj['updated_at'] = _ApiClient["default"].convertToType(data['updated_at'], 'Date');
        }

        if (data.hasOwnProperty('logo')) {
          obj['logo'] = _ApiClient["default"].convertToType(data['logo'], 'String');
        }

        if (data.hasOwnProperty('description')) {
          obj['description'] = _ApiClient["default"].convertToType(data['description'], 'String');
        }

        if (data.hasOwnProperty('users')) {
          obj['users'] = _ApiClient["default"].convertToType(data['users'], [_OrganizationUser["default"]]);
        }

        if (data.hasOwnProperty('allowed_actions')) {
          obj['allowed_actions'] = _ApiClient["default"].convertToType(data['allowed_actions'], [_NamespaceActions["default"]]);
        }

        if (data.hasOwnProperty('num_of_arrays')) {
          obj['num_of_arrays'] = _ApiClient["default"].convertToType(data['num_of_arrays'], 'Number');
        }

        if (data.hasOwnProperty('enabled_features')) {
          obj['enabled_features'] = _ApiClient["default"].convertToType(data['enabled_features'], ['String']);
        }
      }

      return obj;
    }
  }]);

  return Organization;
}();
/**
 * unique id of organization
 * @member {String} id
 */


Organization.prototype['id'] = undefined;
/**
 * @member {module:model/OrganizationRoles} role
 */

Organization.prototype['role'] = undefined;
/**
 * organization name must be unique
 * @member {String} name
 */

Organization.prototype['name'] = undefined;
/**
 * Datetime organization was created in UTC
 * @member {Date} created_at
 */

Organization.prototype['created_at'] = undefined;
/**
 * Datetime organization was updated in UTC
 * @member {Date} updated_at
 */

Organization.prototype['updated_at'] = undefined;
/**
 * Organization logo
 * @member {String} logo
 */

Organization.prototype['logo'] = undefined;
/**
 * Organization description
 * @member {String} description
 */

Organization.prototype['description'] = undefined;
/**
 * @member {Array.<module:model/OrganizationUser>} users
 */

Organization.prototype['users'] = undefined;
/**
 * list of actions user is allowed to do on this organization
 * @member {Array.<module:model/NamespaceActions>} allowed_actions
 */

Organization.prototype['allowed_actions'] = undefined;
/**
 * number of registered arrays for this organization
 * @member {Number} num_of_arrays
 */

Organization.prototype['num_of_arrays'] = undefined;
/**
 * List of extra/optional/beta features to enable for namespace
 * @member {Array.<String>} enabled_features
 */

Organization.prototype['enabled_features'] = undefined;
var _default = Organization;
exports["default"] = _default;