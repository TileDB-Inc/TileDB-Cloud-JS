"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The AWSAccessCredentials model module.
 * @module model/AWSAccessCredentials
 * @version 1.4.0
 */
var AWSAccessCredentials =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>AWSAccessCredentials</code>.
   * Model representing aws keys or service role, service roles are currently ignored, but will be preferred option in the future
   * @alias module:model/AWSAccessCredentials
   */
  function AWSAccessCredentials() {
    _classCallCheck(this, AWSAccessCredentials);

    AWSAccessCredentials.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(AWSAccessCredentials, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>AWSAccessCredentials</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AWSAccessCredentials} obj Optional instance to populate.
     * @return {module:model/AWSAccessCredentials} The populated <code>AWSAccessCredentials</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new AWSAccessCredentials();

        if (data.hasOwnProperty('secret_access_key')) {
          obj['secret_access_key'] = _ApiClient["default"].convertToType(data['secret_access_key'], 'String');
        }

        if (data.hasOwnProperty('access_key_id')) {
          obj['access_key_id'] = _ApiClient["default"].convertToType(data['access_key_id'], 'String');
        }

        if (data.hasOwnProperty('service_role_arn')) {
          obj['service_role_arn'] = _ApiClient["default"].convertToType(data['service_role_arn'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('default')) {
          obj['default'] = _ApiClient["default"].convertToType(data['default'], 'Boolean');
        }

        if (data.hasOwnProperty('buckets')) {
          obj['buckets'] = _ApiClient["default"].convertToType(data['buckets'], ['String']);
        }

        if (data.hasOwnProperty('created_at')) {
          obj['created_at'] = _ApiClient["default"].convertToType(data['created_at'], 'Date');
        }

        if (data.hasOwnProperty('updated_at')) {
          obj['updated_at'] = _ApiClient["default"].convertToType(data['updated_at'], 'Date');
        }
      }

      return obj;
    }
  }]);

  return AWSAccessCredentials;
}();
/**
 * aws secret access key, never returned in get requests
 * @member {String} secret_access_key
 */


AWSAccessCredentials.prototype['secret_access_key'] = undefined;
/**
 * aws access key
 * @member {String} access_key_id
 */

AWSAccessCredentials.prototype['access_key_id'] = undefined;
/**
 * aws service role to use for access
 * @member {String} service_role_arn
 */

AWSAccessCredentials.prototype['service_role_arn'] = undefined;
/**
 * human readable name
 * @member {String} name
 */

AWSAccessCredentials.prototype['name'] = undefined;
/**
 * true if this is the default credential to be used within this namespace
 * @member {Boolean} default
 */

AWSAccessCredentials.prototype['default'] = undefined;
/**
 * a whitelist of one or more buckets this key should access
 * @member {Array.<String>} buckets
 */

AWSAccessCredentials.prototype['buckets'] = undefined;
/**
 * Time when udf dependencies was created (rfc3339)
 * @member {Date} created_at
 */

AWSAccessCredentials.prototype['created_at'] = undefined;
/**
 * Time when udf dependencies was last updated (rfc3339)
 * @member {Date} updated_at
 */

AWSAccessCredentials.prototype['updated_at'] = undefined;
var _default = AWSAccessCredentials;
exports["default"] = _default;