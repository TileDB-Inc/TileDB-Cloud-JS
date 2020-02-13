"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ArrayActivityLog = _interopRequireDefault(require("./ArrayActivityLog"));

var _ArrayInfo = _interopRequireDefault(require("./ArrayInfo"));

var _ArrayTaskStatus = _interopRequireDefault(require("./ArrayTaskStatus"));

var _ArrayTaskType = _interopRequireDefault(require("./ArrayTaskType"));

var _DomainArray = _interopRequireDefault(require("./DomainArray"));

var _Querytype = _interopRequireDefault(require("./Querytype"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ArrayTask model module.
 * @module model/ArrayTask
 * @version 1.4.0
 */
var ArrayTask =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ArrayTask</code>.
   * Synchronous Task to Run
   * @alias module:model/ArrayTask
   */
  function ArrayTask() {
    _classCallCheck(this, ArrayTask);

    ArrayTask.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArrayTask, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ArrayTask</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArrayTask} obj Optional instance to populate.
     * @return {module:model/ArrayTask} The populated <code>ArrayTask</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArrayTask();

        if (data.hasOwnProperty('id')) {
          obj['id'] = _ApiClient["default"].convertToType(data['id'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('description')) {
          obj['description'] = _ApiClient["default"].convertToType(data['description'], 'String');
        }

        if (data.hasOwnProperty('array_metadata')) {
          obj['array_metadata'] = _ArrayInfo["default"].constructFromObject(data['array_metadata']);
        }

        if (data.hasOwnProperty('subarray')) {
          obj['subarray'] = _DomainArray["default"].constructFromObject(data['subarray']);
        }

        if (data.hasOwnProperty('memory')) {
          obj['memory'] = _ApiClient["default"].convertToType(data['memory'], 'Number');
        }

        if (data.hasOwnProperty('cpu')) {
          obj['cpu'] = _ApiClient["default"].convertToType(data['cpu'], 'Number');
        }

        if (data.hasOwnProperty('namespace')) {
          obj['namespace'] = _ApiClient["default"].convertToType(data['namespace'], 'String');
        }

        if (data.hasOwnProperty('status')) {
          obj['status'] = _ArrayTaskStatus["default"].constructFromObject(data['status']);
        }

        if (data.hasOwnProperty('start_time')) {
          obj['start_time'] = _ApiClient["default"].convertToType(data['start_time'], 'Date');
        }

        if (data.hasOwnProperty('finish_time')) {
          obj['finish_time'] = _ApiClient["default"].convertToType(data['finish_time'], 'Date');
        }

        if (data.hasOwnProperty('cost')) {
          obj['cost'] = _ApiClient["default"].convertToType(data['cost'], 'Number');
        }

        if (data.hasOwnProperty('query_type')) {
          obj['query_type'] = _Querytype["default"].constructFromObject(data['query_type']);
        }

        if (data.hasOwnProperty('udf_code')) {
          obj['udf_code'] = _ApiClient["default"].convertToType(data['udf_code'], 'String');
        }

        if (data.hasOwnProperty('udf_language')) {
          obj['udf_language'] = _ApiClient["default"].convertToType(data['udf_language'], 'String');
        }

        if (data.hasOwnProperty('sql_query')) {
          obj['sql_query'] = _ApiClient["default"].convertToType(data['sql_query'], 'String');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ArrayTaskType["default"].constructFromObject(data['type']);
        }

        if (data.hasOwnProperty('activity')) {
          obj['activity'] = _ApiClient["default"].convertToType(data['activity'], [_ArrayActivityLog["default"]]);
        }

        if (data.hasOwnProperty('logs')) {
          obj['logs'] = _ApiClient["default"].convertToType(data['logs'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ArrayTask;
}();
/**
 * task id
 * @member {String} id
 */


ArrayTask.prototype['id'] = undefined;
/**
 * Optional task name
 * @member {String} name
 */

ArrayTask.prototype['name'] = undefined;
/**
 * Optional task description (Tasks purpose)
 * @member {String} description
 */

ArrayTask.prototype['description'] = undefined;
/**
 * @member {module:model/ArrayInfo} array_metadata
 */

ArrayTask.prototype['array_metadata'] = undefined;
/**
 * @member {module:model/DomainArray} subarray
 */

ArrayTask.prototype['subarray'] = undefined;
/**
 * memory allocated to task in bytes
 * @member {Number} memory
 */

ArrayTask.prototype['memory'] = undefined;
/**
 * millicpu allocated to task
 * @member {Number} cpu
 */

ArrayTask.prototype['cpu'] = undefined;
/**
 * namespace task is tied to
 * @member {String} namespace
 */

ArrayTask.prototype['namespace'] = undefined;
/**
 * @member {module:model/ArrayTaskStatus} status
 */

ArrayTask.prototype['status'] = undefined;
/**
 * Start time RFC3339 for job
 * @member {Date} start_time
 */

ArrayTask.prototype['start_time'] = undefined;
/**
 * Finish time RFC3339 for job
 * @member {Date} finish_time
 */

ArrayTask.prototype['finish_time'] = undefined;
/**
 * Cost accumulated for task in 0.01 USD, example is 1 USD
 * @member {Number} cost
 */

ArrayTask.prototype['cost'] = undefined;
/**
 * @member {module:model/Querytype} query_type
 */

ArrayTask.prototype['query_type'] = undefined;
/**
 * Optional actual code that is going to be executed
 * @member {String} udf_code
 */

ArrayTask.prototype['udf_code'] = undefined;
/**
 * Optional actual language used to express udf_code
 * @member {String} udf_language
 */

ArrayTask.prototype['udf_language'] = undefined;
/**
 * Optional actual sql query that is going to be executed
 * @member {String} sql_query
 */

ArrayTask.prototype['sql_query'] = undefined;
/**
 * @member {module:model/ArrayTaskType} type
 */

ArrayTask.prototype['type'] = undefined;
/**
 * Array activity logs for task
 * @member {Array.<module:model/ArrayActivityLog>} activity
 */

ArrayTask.prototype['activity'] = undefined;
/**
 * logs from array task
 * @member {String} logs
 */

ArrayTask.prototype['logs'] = undefined;
var _default = ArrayTask;
exports["default"] = _default;