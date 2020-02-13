"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActivityEventType = _interopRequireDefault(require("./ActivityEventType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ArrayActivityLog model module.
 * @module model/ArrayActivityLog
 * @version 1.4.0
 */
var ArrayActivityLog =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ArrayActivityLog</code>.
   * Actvity of an Array
   * @alias module:model/ArrayActivityLog
   */
  function ArrayActivityLog() {
    _classCallCheck(this, ArrayActivityLog);

    ArrayActivityLog.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArrayActivityLog, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ArrayActivityLog</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArrayActivityLog} obj Optional instance to populate.
     * @return {module:model/ArrayActivityLog} The populated <code>ArrayActivityLog</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArrayActivityLog();

        if (data.hasOwnProperty('event_at')) {
          obj['event_at'] = _ApiClient["default"].convertToType(data['event_at'], 'Date');
        }

        if (data.hasOwnProperty('action')) {
          obj['action'] = _ActivityEventType["default"].constructFromObject(data['action']);
        }

        if (data.hasOwnProperty('username')) {
          obj['username'] = _ApiClient["default"].convertToType(data['username'], 'String');
        }

        if (data.hasOwnProperty('bytes_sent')) {
          obj['bytes_sent'] = _ApiClient["default"].convertToType(data['bytes_sent'], 'Number');
        }

        if (data.hasOwnProperty('bytes_received')) {
          obj['bytes_received'] = _ApiClient["default"].convertToType(data['bytes_received'], 'Number');
        }

        if (data.hasOwnProperty('array_task_id')) {
          obj['array_task_id'] = _ApiClient["default"].convertToType(data['array_task_id'], 'String');
        }

        if (data.hasOwnProperty('query_ranges')) {
          obj['query_ranges'] = _ApiClient["default"].convertToType(data['query_ranges'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ArrayActivityLog;
}();
/**
 * time event took place (RFC3339)
 * @member {Date} event_at
 */


ArrayActivityLog.prototype['event_at'] = undefined;
/**
 * @member {module:model/ActivityEventType} action
 */

ArrayActivityLog.prototype['action'] = undefined;
/**
 * User who performed action
 * @member {String} username
 */

ArrayActivityLog.prototype['username'] = undefined;
/**
 * Bytes sent to client
 * @member {Number} bytes_sent
 */

ArrayActivityLog.prototype['bytes_sent'] = undefined;
/**
 * Bytes recieved from client
 * @member {Number} bytes_received
 */

ArrayActivityLog.prototype['bytes_received'] = undefined;
/**
 * uuid of associated array task
 * @member {String} array_task_id
 */

ArrayActivityLog.prototype['array_task_id'] = undefined;
/**
 * ranges for query
 * @member {String} query_ranges
 */

ArrayActivityLog.prototype['query_ranges'] = undefined;
var _default = ArrayActivityLog;
exports["default"] = _default;