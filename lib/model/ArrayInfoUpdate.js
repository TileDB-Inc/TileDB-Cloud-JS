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
 * The ArrayInfoUpdate model module.
 * @module model/ArrayInfoUpdate
 * @version 1.4.0
 */
var ArrayInfoUpdate =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ArrayInfoUpdate</code>.
   * metadata of an array
   * @alias module:model/ArrayInfoUpdate
   */
  function ArrayInfoUpdate() {
    _classCallCheck(this, ArrayInfoUpdate);

    ArrayInfoUpdate.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArrayInfoUpdate, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ArrayInfoUpdate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArrayInfoUpdate} obj Optional instance to populate.
     * @return {module:model/ArrayInfoUpdate} The populated <code>ArrayInfoUpdate</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArrayInfoUpdate();

        if (data.hasOwnProperty('description')) {
          obj['description'] = _ApiClient["default"].convertToType(data['description'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('uri')) {
          obj['uri'] = _ApiClient["default"].convertToType(data['uri'], 'String');
        }

        if (data.hasOwnProperty('access_credentials_name')) {
          obj['access_credentials_name'] = _ApiClient["default"].convertToType(data['access_credentials_name'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ArrayInfoUpdate;
}();
/**
 * description of array
 * @member {String} description
 */


ArrayInfoUpdate.prototype['description'] = undefined;
/**
 * description of array
 * @member {String} name
 */

ArrayInfoUpdate.prototype['name'] = undefined;
/**
 * uri of array
 * @member {String} uri
 */

ArrayInfoUpdate.prototype['uri'] = undefined;
/**
 * the name of the access credentials to use. if unset, the default credentials will be used
 * @member {String} access_credentials_name
 */

ArrayInfoUpdate.prototype['access_credentials_name'] = undefined;
var _default = ArrayInfoUpdate;
exports["default"] = _default;