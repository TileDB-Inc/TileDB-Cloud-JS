"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Subarray = _interopRequireDefault(require("./Subarray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The SubarrayPartitionerCurrent model module.
 * @module model/SubarrayPartitionerCurrent
 * @version 1.4.0
 */
var SubarrayPartitionerCurrent =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>SubarrayPartitionerCurrent</code>.
   * The current partition info
   * @alias module:model/SubarrayPartitionerCurrent
   */
  function SubarrayPartitionerCurrent() {
    _classCallCheck(this, SubarrayPartitionerCurrent);

    SubarrayPartitionerCurrent.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(SubarrayPartitionerCurrent, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>SubarrayPartitionerCurrent</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubarrayPartitionerCurrent} obj Optional instance to populate.
     * @return {module:model/SubarrayPartitionerCurrent} The populated <code>SubarrayPartitionerCurrent</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SubarrayPartitionerCurrent();

        if (data.hasOwnProperty('subarray')) {
          obj['subarray'] = _Subarray["default"].constructFromObject(data['subarray']);
        }

        if (data.hasOwnProperty('start')) {
          obj['start'] = _ApiClient["default"].convertToType(data['start'], 'Number');
        }

        if (data.hasOwnProperty('end')) {
          obj['end'] = _ApiClient["default"].convertToType(data['end'], 'Number');
        }

        if (data.hasOwnProperty('splitMultiRange')) {
          obj['splitMultiRange'] = _ApiClient["default"].convertToType(data['splitMultiRange'], 'Boolean');
        }
      }

      return obj;
    }
  }]);

  return SubarrayPartitionerCurrent;
}();
/**
 * @member {module:model/Subarray} subarray
 */


SubarrayPartitionerCurrent.prototype['subarray'] = undefined;
/**
 * PartitionInfo start
 * @member {Number} start
 */

SubarrayPartitionerCurrent.prototype['start'] = undefined;
/**
 * PartitionInfo end
 * @member {Number} end
 */

SubarrayPartitionerCurrent.prototype['end'] = undefined;
/**
 * PartitionInfo splitMultiRange
 * @member {Boolean} splitMultiRange
 */

SubarrayPartitionerCurrent.prototype['splitMultiRange'] = undefined;
var _default = SubarrayPartitionerCurrent;
exports["default"] = _default;