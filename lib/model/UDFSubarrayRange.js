"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _DimensionCoordinate = _interopRequireDefault(require("./DimensionCoordinate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The UDFSubarrayRange model module.
 * @module model/UDFSubarrayRange
 * @version 1.4.0
 */
var UDFSubarrayRange =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>UDFSubarrayRange</code>.
   * A dimension range to query
   * @alias module:model/UDFSubarrayRange
   */
  function UDFSubarrayRange() {
    _classCallCheck(this, UDFSubarrayRange);

    UDFSubarrayRange.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UDFSubarrayRange, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>UDFSubarrayRange</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UDFSubarrayRange} obj Optional instance to populate.
     * @return {module:model/UDFSubarrayRange} The populated <code>UDFSubarrayRange</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UDFSubarrayRange();

        if (data.hasOwnProperty('dimension_id')) {
          obj['dimension_id'] = _ApiClient["default"].convertToType(data['dimension_id'], 'Number');
        }

        if (data.hasOwnProperty('range_start')) {
          obj['range_start'] = _DimensionCoordinate["default"].constructFromObject(data['range_start']);
        }

        if (data.hasOwnProperty('range_end')) {
          obj['range_end'] = _DimensionCoordinate["default"].constructFromObject(data['range_end']);
        }
      }

      return obj;
    }
  }]);

  return UDFSubarrayRange;
}();
/**
 * The dimension index
 * @member {Number} dimension_id
 */


UDFSubarrayRange.prototype['dimension_id'] = undefined;
/**
 * @member {module:model/DimensionCoordinate} range_start
 */

UDFSubarrayRange.prototype['range_start'] = undefined;
/**
 * @member {module:model/DimensionCoordinate} range_end
 */

UDFSubarrayRange.prototype['range_end'] = undefined;
var _default = UDFSubarrayRange;
exports["default"] = _default;