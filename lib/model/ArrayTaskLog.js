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
 * The ArrayTaskLog model module.
 * @module model/ArrayTaskLog
 * @version 1.4.0
 */
var ArrayTaskLog =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ArrayTaskLog</code>.
   * Array task stderr/stdout logs
   * @alias module:model/ArrayTaskLog
   */
  function ArrayTaskLog() {
    _classCallCheck(this, ArrayTaskLog);

    ArrayTaskLog.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArrayTaskLog, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ArrayTaskLog</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArrayTaskLog} obj Optional instance to populate.
     * @return {module:model/ArrayTaskLog} The populated <code>ArrayTaskLog</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArrayTaskLog();

        if (data.hasOwnProperty('array_task_id')) {
          obj['array_task_id'] = _ApiClient["default"].convertToType(data['array_task_id'], 'String');
        }

        if (data.hasOwnProperty('logs')) {
          obj['logs'] = _ApiClient["default"].convertToType(data['logs'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ArrayTaskLog;
}();
/**
 * ID of associated task
 * @member {String} array_task_id
 */


ArrayTaskLog.prototype['array_task_id'] = undefined;
/**
 * logs from array task
 * @member {String} logs
 */

ArrayTaskLog.prototype['logs'] = undefined;
var _default = ArrayTaskLog;
exports["default"] = _default;