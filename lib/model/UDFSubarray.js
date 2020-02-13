"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Layout = _interopRequireDefault(require("./Layout"));

var _UDFSubarrayRange = _interopRequireDefault(require("./UDFSubarrayRange"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The UDFSubarray model module.
 * @module model/UDFSubarray
 * @version 1.4.0
 */
var UDFSubarray =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>UDFSubarray</code>.
   * Subarray bounds to query for a UDF to operate on
   * @alias module:model/UDFSubarray
   */
  function UDFSubarray() {
    _classCallCheck(this, UDFSubarray);

    UDFSubarray.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UDFSubarray, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>UDFSubarray</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UDFSubarray} obj Optional instance to populate.
     * @return {module:model/UDFSubarray} The populated <code>UDFSubarray</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UDFSubarray();

        if (data.hasOwnProperty('layout')) {
          obj['layout'] = _Layout["default"].constructFromObject(data['layout']);
        }

        if (data.hasOwnProperty('ranges')) {
          obj['ranges'] = _ApiClient["default"].convertToType(data['ranges'], [_UDFSubarrayRange["default"]]);
        }
      }

      return obj;
    }
  }]);

  return UDFSubarray;
}();
/**
 * @member {module:model/Layout} layout
 */


UDFSubarray.prototype['layout'] = undefined;
/**
 * List of ranges,
 * @member {Array.<module:model/UDFSubarrayRange>} ranges
 */

UDFSubarray.prototype['ranges'] = undefined;
var _default = UDFSubarray;
exports["default"] = _default;