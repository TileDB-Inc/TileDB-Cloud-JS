"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AttributeBufferSize = _interopRequireDefault(require("./AttributeBufferSize"));

var _Subarray = _interopRequireDefault(require("./Subarray"));

var _SubarrayPartitionerCurrent = _interopRequireDefault(require("./SubarrayPartitionerCurrent"));

var _SubarrayPartitionerState = _interopRequireDefault(require("./SubarrayPartitionerState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The SubarrayPartitioner model module.
 * @module model/SubarrayPartitioner
 * @version 1.4.0
 */
var SubarrayPartitioner =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>SubarrayPartitioner</code>.
   * The subarray partitioner
   * @alias module:model/SubarrayPartitioner
   */
  function SubarrayPartitioner() {
    _classCallCheck(this, SubarrayPartitioner);

    SubarrayPartitioner.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(SubarrayPartitioner, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>SubarrayPartitioner</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubarrayPartitioner} obj Optional instance to populate.
     * @return {module:model/SubarrayPartitioner} The populated <code>SubarrayPartitioner</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SubarrayPartitioner();

        if (data.hasOwnProperty('subarray')) {
          obj['subarray'] = _Subarray["default"].constructFromObject(data['subarray']);
        }

        if (data.hasOwnProperty('budget')) {
          obj['budget'] = _ApiClient["default"].convertToType(data['budget'], [_AttributeBufferSize["default"]]);
        }

        if (data.hasOwnProperty('current')) {
          obj['current'] = _SubarrayPartitionerCurrent["default"].constructFromObject(data['current']);
        }

        if (data.hasOwnProperty('state')) {
          obj['state'] = _SubarrayPartitionerState["default"].constructFromObject(data['state']);
        }

        if (data.hasOwnProperty('memoryBudget')) {
          obj['memoryBudget'] = _ApiClient["default"].convertToType(data['memoryBudget'], 'Number');
        }

        if (data.hasOwnProperty('memoryBudgetVar')) {
          obj['memoryBudgetVar'] = _ApiClient["default"].convertToType(data['memoryBudgetVar'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return SubarrayPartitioner;
}();
/**
 * @member {module:model/Subarray} subarray
 */


SubarrayPartitioner.prototype['subarray'] = undefined;
/**
 * Result size budget (in bytes) for all attributes.
 * @member {Array.<module:model/AttributeBufferSize>} budget
 */

SubarrayPartitioner.prototype['budget'] = undefined;
/**
 * @member {module:model/SubarrayPartitionerCurrent} current
 */

SubarrayPartitioner.prototype['current'] = undefined;
/**
 * @member {module:model/SubarrayPartitionerState} state
 */

SubarrayPartitioner.prototype['state'] = undefined;
/**
 * The memory budget for the fixed-sized attributes and the offsets of the var-sized attributes
 * @member {Number} memoryBudget
 */

SubarrayPartitioner.prototype['memoryBudget'] = undefined;
/**
 * The memory budget for the var-sized attributes
 * @member {Number} memoryBudgetVar
 */

SubarrayPartitioner.prototype['memoryBudgetVar'] = undefined;
var _default = SubarrayPartitioner;
exports["default"] = _default;