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
 * The Token model module.
 * @module model/Token
 * @version 1.4.0
 */
var Token =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>Token</code>.
   * A api token and its metadata
   * @alias module:model/Token
   */
  function Token() {
    _classCallCheck(this, Token);

    Token.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Token, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Token</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Token} obj Optional instance to populate.
     * @return {module:model/Token} The populated <code>Token</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Token();

        if (data.hasOwnProperty('token')) {
          obj['token'] = _ApiClient["default"].convertToType(data['token'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('issued_at')) {
          obj['issued_at'] = _ApiClient["default"].convertToType(data['issued_at'], 'Date');
        }

        if (data.hasOwnProperty('expires_at')) {
          obj['expires_at'] = _ApiClient["default"].convertToType(data['expires_at'], 'Date');
        }

        if (data.hasOwnProperty('scope')) {
          obj['scope'] = _ApiClient["default"].convertToType(data['scope'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Token;
}();
/**
 * A api token
 * @member {String} token
 */


Token.prototype['token'] = undefined;
/**
 * Name of token to revoke
 * @member {String} name
 */

Token.prototype['name'] = undefined;
/**
 * datetime the token was created at
 * @member {Date} issued_at
 */

Token.prototype['issued_at'] = undefined;
/**
 * datetime the token when token will expire
 * @member {Date} expires_at
 */

Token.prototype['expires_at'] = undefined;
/**
 * Optional scope to limit token, defaults to all permissions, current supported values are password_reset or *
 * @member {String} scope
 * @default '*'
 */

Token.prototype['scope'] = '*';
var _default = Token;
exports["default"] = _default;