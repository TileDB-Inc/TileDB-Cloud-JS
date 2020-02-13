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
 * The ArrayMetadataEntry model module.
 * @module model/ArrayMetadataEntry
 * @version 1.4.0
 */
var ArrayMetadataEntry =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ArrayMetadataEntry</code>.
   * key/value pair representing an array metadata map entry
   * @alias module:model/ArrayMetadataEntry
   */
  function ArrayMetadataEntry() {
    _classCallCheck(this, ArrayMetadataEntry);

    ArrayMetadataEntry.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArrayMetadataEntry, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ArrayMetadataEntry</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArrayMetadataEntry} obj Optional instance to populate.
     * @return {module:model/ArrayMetadataEntry} The populated <code>ArrayMetadataEntry</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArrayMetadataEntry();

        if (data.hasOwnProperty('key')) {
          obj['key'] = _ApiClient["default"].convertToType(data['key'], 'String');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }

        if (data.hasOwnProperty('value_num')) {
          obj['value_num'] = _ApiClient["default"].convertToType(data['value_num'], 'Number');
        }

        if (data.hasOwnProperty('value')) {
          obj['value'] = _ApiClient["default"].convertToType(data['value'], ['Number']);
        }

        if (data.hasOwnProperty('del')) {
          obj['del'] = _ApiClient["default"].convertToType(data['del'], 'Boolean');
        }
      }

      return obj;
    }
  }]);

  return ArrayMetadataEntry;
}();
/**
 * @member {String} key
 */


ArrayMetadataEntry.prototype['key'] = undefined;
/**
 * @member {String} type
 */

ArrayMetadataEntry.prototype['type'] = undefined;
/**
 * @member {Number} value_num
 */

ArrayMetadataEntry.prototype['value_num'] = undefined;
/**
 * @member {Array.<Number>} value
 */

ArrayMetadataEntry.prototype['value'] = undefined;
/**
 * @member {Boolean} del
 */

ArrayMetadataEntry.prototype['del'] = undefined;
var _default = ArrayMetadataEntry;
exports["default"] = _default;