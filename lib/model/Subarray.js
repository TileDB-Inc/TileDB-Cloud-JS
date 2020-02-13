"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Layout = _interopRequireDefault(require("./Layout"));

var _SubarrayRanges = _interopRequireDefault(require("./SubarrayRanges"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Subarray model module.
 * @module model/Subarray
 * @version 1.4.0
 */
var Subarray =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>Subarray</code>.
   * A Subarray
   * @alias module:model/Subarray
   */
  function Subarray() {
    _classCallCheck(this, Subarray);

    Subarray.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Subarray, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Subarray</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Subarray} obj Optional instance to populate.
     * @return {module:model/Subarray} The populated <code>Subarray</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Subarray();

        if (data.hasOwnProperty('layout')) {
          obj['layout'] = _Layout["default"].constructFromObject(data['layout']);
        }

        if (data.hasOwnProperty('ranges')) {
          obj['ranges'] = _ApiClient["default"].convertToType(data['ranges'], [_SubarrayRanges["default"]]);
        }
      }

      return obj;
    }
  }]);

  return Subarray;
}();
/**
 * @member {module:model/Layout} layout
 */


Subarray.prototype['layout'] = undefined;
/**
 * List of 1D ranges, one per dimension
 * @member {Array.<module:model/SubarrayRanges>} ranges
 */

Subarray.prototype['ranges'] = undefined;
var _default = Subarray;
exports["default"] = _default;