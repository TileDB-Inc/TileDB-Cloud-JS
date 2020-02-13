"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ArrayTask = _interopRequireDefault(require("./ArrayTask"));

var _PaginationMetadata = _interopRequireDefault(require("./PaginationMetadata"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ArrayTaskData model module.
 * @module model/ArrayTaskData
 * @version 1.4.0
 */
var ArrayTaskData =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ArrayTaskData</code>.
   * Object including array tasks and metadata
   * @alias module:model/ArrayTaskData
   */
  function ArrayTaskData() {
    _classCallCheck(this, ArrayTaskData);

    ArrayTaskData.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArrayTaskData, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ArrayTaskData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArrayTaskData} obj Optional instance to populate.
     * @return {module:model/ArrayTaskData} The populated <code>ArrayTaskData</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArrayTaskData();

        if (data.hasOwnProperty('array_tasks')) {
          obj['array_tasks'] = _ApiClient["default"].convertToType(data['array_tasks'], [_ArrayTask["default"]]);
        }

        if (data.hasOwnProperty('pagination_metadata')) {
          obj['pagination_metadata'] = _PaginationMetadata["default"].constructFromObject(data['pagination_metadata']);
        }
      }

      return obj;
    }
  }]);

  return ArrayTaskData;
}();
/**
 * Array Tasks
 * @member {Array.<module:model/ArrayTask>} array_tasks
 */


ArrayTaskData.prototype['array_tasks'] = undefined;
/**
 * @member {module:model/PaginationMetadata} pagination_metadata
 */

ArrayTaskData.prototype['pagination_metadata'] = undefined;
var _default = ArrayTaskData;
exports["default"] = _default;