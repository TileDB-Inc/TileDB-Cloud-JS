"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ArrayMetadataEntry = _interopRequireDefault(require("./ArrayMetadataEntry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ArrayMetadata model module.
 * @module model/ArrayMetadata
 * @version 1.4.0
 */
var ArrayMetadata =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ArrayMetadata</code>.
   * user&#39;s TileDB array metadata
   * @alias module:model/ArrayMetadata
   */
  function ArrayMetadata() {
    _classCallCheck(this, ArrayMetadata);

    ArrayMetadata.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArrayMetadata, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ArrayMetadata</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArrayMetadata} obj Optional instance to populate.
     * @return {module:model/ArrayMetadata} The populated <code>ArrayMetadata</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArrayMetadata();

        if (data.hasOwnProperty('ranges')) {
          obj['ranges'] = _ApiClient["default"].convertToType(data['ranges'], [_ArrayMetadataEntry["default"]]);
        }
      }

      return obj;
    }
  }]);

  return ArrayMetadata;
}();
/**
 * List of metadata entries
 * @member {Array.<module:model/ArrayMetadataEntry>} ranges
 */


ArrayMetadata.prototype['ranges'] = undefined;
var _default = ArrayMetadata;
exports["default"] = _default;