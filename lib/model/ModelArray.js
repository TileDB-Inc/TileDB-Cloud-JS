"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Querytype = _interopRequireDefault(require("./Querytype"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ModelArray model module.
 * @module model/ModelArray
 * @version 1.4.0
 */
var ModelArray =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ModelArray</code>.
   * Represents an open array
   * @alias module:model/ModelArray
   * @param timestamp {Number} timestamp (epoch milliseconds) array is opened at
   * @param queryType {module:model/Querytype} 
   * @param uri {String} Array uri
   */
  function ModelArray(timestamp, queryType, uri) {
    _classCallCheck(this, ModelArray);

    ModelArray.initialize(this, timestamp, queryType, uri);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ModelArray, null, [{
    key: "initialize",
    value: function initialize(obj, timestamp, queryType, uri) {
      obj['timestamp'] = timestamp;
      obj['queryType'] = queryType;
      obj['uri'] = uri;
    }
    /**
     * Constructs a <code>ModelArray</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ModelArray} obj Optional instance to populate.
     * @return {module:model/ModelArray} The populated <code>ModelArray</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ModelArray();

        if (data.hasOwnProperty('timestamp')) {
          obj['timestamp'] = _ApiClient["default"].convertToType(data['timestamp'], 'Number');
        }

        if (data.hasOwnProperty('queryType')) {
          obj['queryType'] = _Querytype["default"].constructFromObject(data['queryType']);
        }

        if (data.hasOwnProperty('uri')) {
          obj['uri'] = _ApiClient["default"].convertToType(data['uri'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ModelArray;
}();
/**
 * timestamp (epoch milliseconds) array is opened at
 * @member {Number} timestamp
 */


ModelArray.prototype['timestamp'] = undefined;
/**
 * @member {module:model/Querytype} queryType
 */

ModelArray.prototype['queryType'] = undefined;
/**
 * Array uri
 * @member {String} uri
 */

ModelArray.prototype['uri'] = undefined;
var _default = ModelArray;
exports["default"] = _default;