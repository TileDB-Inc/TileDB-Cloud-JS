"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _NamespaceActions = _interopRequireDefault(require("./NamespaceActions"));

var _OrganizationRoles = _interopRequireDefault(require("./OrganizationRoles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The OrganizationUser model module.
 * @module model/OrganizationUser
 * @version 1.4.0
 */
var OrganizationUser =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>OrganizationUser</code>.
   * user in an organization
   * @alias module:model/OrganizationUser
   */
  function OrganizationUser() {
    _classCallCheck(this, OrganizationUser);

    OrganizationUser.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(OrganizationUser, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>OrganizationUser</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OrganizationUser} obj Optional instance to populate.
     * @return {module:model/OrganizationUser} The populated <code>OrganizationUser</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new OrganizationUser();

        if (data.hasOwnProperty('user_id')) {
          obj['user_id'] = _ApiClient["default"].convertToType(data['user_id'], 'String');
        }

        if (data.hasOwnProperty('organization_id')) {
          obj['organization_id'] = _ApiClient["default"].convertToType(data['organization_id'], 'String');
        }

        if (data.hasOwnProperty('username')) {
          obj['username'] = _ApiClient["default"].convertToType(data['username'], 'String');
        }

        if (data.hasOwnProperty('organization_name')) {
          obj['organization_name'] = _ApiClient["default"].convertToType(data['organization_name'], 'String');
        }

        if (data.hasOwnProperty('role')) {
          obj['role'] = _OrganizationRoles["default"].constructFromObject(data['role']);
        }

        if (data.hasOwnProperty('allowed_actions')) {
          obj['allowed_actions'] = _ApiClient["default"].convertToType(data['allowed_actions'], [_NamespaceActions["default"]]);
        }
      }

      return obj;
    }
  }]);

  return OrganizationUser;
}();
/**
 * unique id of user
 * @member {String} user_id
 */


OrganizationUser.prototype['user_id'] = undefined;
/**
 * unique id of organization
 * @member {String} organization_id
 */

OrganizationUser.prototype['organization_id'] = undefined;
/**
 * username for user
 * @member {String} username
 */

OrganizationUser.prototype['username'] = undefined;
/**
 * name of organization
 * @member {String} organization_name
 */

OrganizationUser.prototype['organization_name'] = undefined;
/**
 * @member {module:model/OrganizationRoles} role
 */

OrganizationUser.prototype['role'] = undefined;
/**
 * list of actions user is allowed to do on this organization
 * @member {Array.<module:model/NamespaceActions>} allowed_actions
 */

OrganizationUser.prototype['allowed_actions'] = undefined;
var _default = OrganizationUser;
exports["default"] = _default;