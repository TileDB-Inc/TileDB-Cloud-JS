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
 * The TokenRequest model module.
 * @module model/TokenRequest
 * @version 1.4.0
 */
var TokenRequest =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>TokenRequest</code>.
   * A request from a user for an api token
   * @alias module:model/TokenRequest
   */
  function TokenRequest() {
    _classCallCheck(this, TokenRequest);

    TokenRequest.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(TokenRequest, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>TokenRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TokenRequest} obj Optional instance to populate.
     * @return {module:model/TokenRequest} The populated <code>TokenRequest</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new TokenRequest();

        if (data.hasOwnProperty('expires')) {
          obj['expires'] = _ApiClient["default"].convertToType(data['expires'], 'Date');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('scope')) {
          obj['scope'] = _ApiClient["default"].convertToType(data['scope'], 'String');
        }
      }

      return obj;
    }
  }]);

  return TokenRequest;
}();
/**
 * Expiration date for token, if empty token defaults to 30 minutes
 * @member {Date} expires
 */


TokenRequest.prototype['expires'] = undefined;
/**
 * Optional name for token, if the name already exists for the user it will be auto incremented (i.e. myToken-1)
 * @member {String} name
 */

TokenRequest.prototype['name'] = undefined;
/**
 * Optional scope to limit token, defaults to all permissions, current supported values are password_reset or *
 * @member {String} scope
 * @default '*'
 */

TokenRequest.prototype['scope'] = '*';
var _default = TokenRequest;
exports["default"] = _default;