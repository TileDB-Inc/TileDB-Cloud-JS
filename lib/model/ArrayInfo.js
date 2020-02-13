"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ArrayActions = _interopRequireDefault(require("./ArrayActions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ArrayInfo model module.
 * @module model/ArrayInfo
 * @version 1.4.0
 */
var ArrayInfo =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ArrayInfo</code>.
   * metadata of an array
   * @alias module:model/ArrayInfo
   */
  function ArrayInfo() {
    _classCallCheck(this, ArrayInfo);

    ArrayInfo.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArrayInfo, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ArrayInfo</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArrayInfo} obj Optional instance to populate.
     * @return {module:model/ArrayInfo} The populated <code>ArrayInfo</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArrayInfo();

        if (data.hasOwnProperty('id')) {
          obj['id'] = _ApiClient["default"].convertToType(data['id'], 'String');
        }

        if (data.hasOwnProperty('uri')) {
          obj['uri'] = _ApiClient["default"].convertToType(data['uri'], 'String');
        }

        if (data.hasOwnProperty('namespace')) {
          obj['namespace'] = _ApiClient["default"].convertToType(data['namespace'], 'String');
        }

        if (data.hasOwnProperty('size')) {
          obj['size'] = _ApiClient["default"].convertToType(data['size'], 'Number');
        }

        if (data.hasOwnProperty('last_accessed')) {
          obj['last_accessed'] = _ApiClient["default"].convertToType(data['last_accessed'], 'Date');
        }

        if (data.hasOwnProperty('description')) {
          obj['description'] = _ApiClient["default"].convertToType(data['description'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('allowed_actions')) {
          obj['allowed_actions'] = _ApiClient["default"].convertToType(data['allowed_actions'], [_ArrayActions["default"]]);
        }

        if (data.hasOwnProperty('logo')) {
          obj['logo'] = _ApiClient["default"].convertToType(data['logo'], 'String');
        }

        if (data.hasOwnProperty('access_credentials_name')) {
          obj['access_credentials_name'] = _ApiClient["default"].convertToType(data['access_credentials_name'], 'String');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }

        if (data.hasOwnProperty('share_count')) {
          obj['share_count'] = _ApiClient["default"].convertToType(data['share_count'], 'Number');
        }

        if (data.hasOwnProperty('public_share')) {
          obj['public_share'] = _ApiClient["default"].convertToType(data['public_share'], 'Boolean');
        }

        if (data.hasOwnProperty('tiledb_uri')) {
          obj['tiledb_uri'] = _ApiClient["default"].convertToType(data['tiledb_uri'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ArrayInfo;
}();
/**
 * unique id of registered array
 * @member {String} id
 */


ArrayInfo.prototype['id'] = undefined;
/**
 * uri of array
 * @member {String} uri
 */

ArrayInfo.prototype['uri'] = undefined;
/**
 * namespace array is in
 * @member {String} namespace
 */

ArrayInfo.prototype['namespace'] = undefined;
/**
 * size in bytes of array
 * @member {Number} size
 */

ArrayInfo.prototype['size'] = undefined;
/**
 * Datetime array was last accessed in UTC
 * @member {Date} last_accessed
 */

ArrayInfo.prototype['last_accessed'] = undefined;
/**
 * description of array
 * @member {String} description
 */

ArrayInfo.prototype['description'] = undefined;
/**
 * name of array
 * @member {String} name
 */

ArrayInfo.prototype['name'] = undefined;
/**
 * list of actions user is allowed to do on this array
 * @member {Array.<module:model/ArrayActions>} allowed_actions
 */

ArrayInfo.prototype['allowed_actions'] = undefined;
/**
 * logo (base64 encoded) for the array. Optional
 * @member {String} logo
 */

ArrayInfo.prototype['logo'] = undefined;
/**
 * the name of the access credentials to use. if unset, the default credentials will be used
 * @member {String} access_credentials_name
 */

ArrayInfo.prototype['access_credentials_name'] = undefined;
/**
 * Array type (dense, key-value, sparse)
 * @member {String} type
 */

ArrayInfo.prototype['type'] = undefined;
/**
 * number of unique namespaces this array is shared with
 * @member {Number} share_count
 */

ArrayInfo.prototype['share_count'] = undefined;
/**
 * Suggests if the array was shared to public by owner
 * @member {Boolean} public_share
 */

ArrayInfo.prototype['public_share'] = undefined;
/**
 * uri for access through TileDB cloud
 * @member {String} tiledb_uri
 */

ArrayInfo.prototype['tiledb_uri'] = undefined;
var _default = ArrayInfo;
exports["default"] = _default;