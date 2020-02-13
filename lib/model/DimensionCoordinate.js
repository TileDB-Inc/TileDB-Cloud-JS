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
 * The DimensionCoordinate model module.
 * @module model/DimensionCoordinate
 * @version 1.4.0
 */
var DimensionCoordinate =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>DimensionCoordinate</code>.
   * A single, typed coordinate for a dimension
   * @alias module:model/DimensionCoordinate
   */
  function DimensionCoordinate() {
    _classCallCheck(this, DimensionCoordinate);

    DimensionCoordinate.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(DimensionCoordinate, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>DimensionCoordinate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DimensionCoordinate} obj Optional instance to populate.
     * @return {module:model/DimensionCoordinate} The populated <code>DimensionCoordinate</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new DimensionCoordinate();

        if (data.hasOwnProperty('int8')) {
          obj['int8'] = _ApiClient["default"].convertToType(data['int8'], 'Number');
        }

        if (data.hasOwnProperty('uint8')) {
          obj['uint8'] = _ApiClient["default"].convertToType(data['uint8'], 'Number');
        }

        if (data.hasOwnProperty('int16')) {
          obj['int16'] = _ApiClient["default"].convertToType(data['int16'], 'Number');
        }

        if (data.hasOwnProperty('uint16')) {
          obj['uint16'] = _ApiClient["default"].convertToType(data['uint16'], 'Number');
        }

        if (data.hasOwnProperty('int32')) {
          obj['int32'] = _ApiClient["default"].convertToType(data['int32'], 'Number');
        }

        if (data.hasOwnProperty('uint32')) {
          obj['uint32'] = _ApiClient["default"].convertToType(data['uint32'], 'Number');
        }

        if (data.hasOwnProperty('int64')) {
          obj['int64'] = _ApiClient["default"].convertToType(data['int64'], 'Number');
        }

        if (data.hasOwnProperty('uint64')) {
          obj['uint64'] = _ApiClient["default"].convertToType(data['uint64'], 'Number');
        }

        if (data.hasOwnProperty('float32')) {
          obj['float32'] = _ApiClient["default"].convertToType(data['float32'], 'Number');
        }

        if (data.hasOwnProperty('float64')) {
          obj['float64'] = _ApiClient["default"].convertToType(data['float64'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return DimensionCoordinate;
}();
/**
 * @member {Number} int8
 */


DimensionCoordinate.prototype['int8'] = undefined;
/**
 * @member {Number} uint8
 */

DimensionCoordinate.prototype['uint8'] = undefined;
/**
 * @member {Number} int16
 */

DimensionCoordinate.prototype['int16'] = undefined;
/**
 * @member {Number} uint16
 */

DimensionCoordinate.prototype['uint16'] = undefined;
/**
 * @member {Number} int32
 */

DimensionCoordinate.prototype['int32'] = undefined;
/**
 * @member {Number} uint32
 */

DimensionCoordinate.prototype['uint32'] = undefined;
/**
 * @member {Number} int64
 */

DimensionCoordinate.prototype['int64'] = undefined;
/**
 * @member {Number} uint64
 */

DimensionCoordinate.prototype['uint64'] = undefined;
/**
 * @member {Number} float32
 */

DimensionCoordinate.prototype['float32'] = undefined;
/**
 * @member {Number} float64
 */

DimensionCoordinate.prototype['float64'] = undefined;
var _default = DimensionCoordinate;
exports["default"] = _default;