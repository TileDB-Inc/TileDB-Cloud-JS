"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Datatype = _interopRequireDefault(require("./Datatype"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The SubarrayRanges model module.
 * @module model/SubarrayRanges
 * @version 1.4.0
 */
var SubarrayRanges =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>SubarrayRanges</code>.
   * A set of 1D ranges for a subarray
   * @alias module:model/SubarrayRanges
   */
  function SubarrayRanges() {
    _classCallCheck(this, SubarrayRanges);

    SubarrayRanges.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(SubarrayRanges, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>SubarrayRanges</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubarrayRanges} obj Optional instance to populate.
     * @return {module:model/SubarrayRanges} The populated <code>SubarrayRanges</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SubarrayRanges();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _Datatype["default"].constructFromObject(data['type']);
        }

        if (data.hasOwnProperty('hasDefaultRange')) {
          obj['hasDefaultRange'] = _ApiClient["default"].convertToType(data['hasDefaultRange'], 'Boolean');
        }

        if (data.hasOwnProperty('buffer')) {
          obj['buffer'] = _ApiClient["default"].convertToType(data['buffer'], ['Number']);
        }
      }

      return obj;
    }
  }]);

  return SubarrayRanges;
}();
/**
 * @member {module:model/Datatype} type
 */


SubarrayRanges.prototype['type'] = undefined;
/**
 * True if the range is the default range
 * @member {Boolean} hasDefaultRange
 */

SubarrayRanges.prototype['hasDefaultRange'] = undefined;
/**
 * The bytes of the ranges
 * @member {Array.<Number>} buffer
 */

SubarrayRanges.prototype['buffer'] = undefined;
var _default = SubarrayRanges;
exports["default"] = _default;