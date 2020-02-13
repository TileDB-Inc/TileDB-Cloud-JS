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
 * The LastAccessedArray model module.
 * @module model/LastAccessedArray
 * @version 1.4.0
 */
var LastAccessedArray =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>LastAccessedArray</code>.
   * Information related to last access of an array
   * @alias module:model/LastAccessedArray
   */
  function LastAccessedArray() {
    _classCallCheck(this, LastAccessedArray);

    LastAccessedArray.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(LastAccessedArray, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>LastAccessedArray</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LastAccessedArray} obj Optional instance to populate.
     * @return {module:model/LastAccessedArray} The populated <code>LastAccessedArray</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new LastAccessedArray();

        if (data.hasOwnProperty('array_id')) {
          obj['array_id'] = _ApiClient["default"].convertToType(data['array_id'], 'String');
        }

        if (data.hasOwnProperty('array_name')) {
          obj['array_name'] = _ApiClient["default"].convertToType(data['array_name'], 'String');
        }

        if (data.hasOwnProperty('namespace')) {
          obj['namespace'] = _ApiClient["default"].convertToType(data['namespace'], 'String');
        }

        if (data.hasOwnProperty('accessed_time')) {
          obj['accessed_time'] = _ApiClient["default"].convertToType(data['accessed_time'], 'Number');
        }

        if (data.hasOwnProperty('access_type')) {
          obj['access_type'] = _ActivityEventType["default"].constructFromObject(data['access_type']);
        }
      }

      return obj;
    }
  }]);

  return LastAccessedArray;
}();
/**
 * unique id of array
 * @member {String} array_id
 */


LastAccessedArray.prototype['array_id'] = undefined;
/**
 * name of the array
 * @member {String} array_name
 */

LastAccessedArray.prototype['array_name'] = undefined;
/**
 * namespace of a user or organization
 * @member {String} namespace
 */

LastAccessedArray.prototype['namespace'] = undefined;
/**
 * timestamp (epoch milliseconds) array is last accessed
 * @member {Number} accessed_time
 */

LastAccessedArray.prototype['accessed_time'] = undefined;
/**
 * @member {module:model/ActivityEventType} access_type
 */

LastAccessedArray.prototype['access_type'] = undefined;
var _default = LastAccessedArray;
exports["default"] = _default;