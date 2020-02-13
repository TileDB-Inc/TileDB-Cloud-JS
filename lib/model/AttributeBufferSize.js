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
 * The AttributeBufferSize model module.
 * @module model/AttributeBufferSize
 * @version 1.4.0
 */
var AttributeBufferSize =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>AttributeBufferSize</code>.
   * object representing buffer size of an attribute
   * @alias module:model/AttributeBufferSize
   * @param attribute {String} name of attribute
   * @param offsetBytes {Number} buffer size (in bytes) of offset buffer
   * @param dataBytes {Number} buffer size (in bytes) of data buffer
   */
  function AttributeBufferSize(attribute, offsetBytes, dataBytes) {
    _classCallCheck(this, AttributeBufferSize);

    AttributeBufferSize.initialize(this, attribute, offsetBytes, dataBytes);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(AttributeBufferSize, null, [{
    key: "initialize",
    value: function initialize(obj, attribute, offsetBytes, dataBytes) {
      obj['attribute'] = attribute;
      obj['offsetBytes'] = offsetBytes;
      obj['dataBytes'] = dataBytes;
    }
    /**
     * Constructs a <code>AttributeBufferSize</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AttributeBufferSize} obj Optional instance to populate.
     * @return {module:model/AttributeBufferSize} The populated <code>AttributeBufferSize</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new AttributeBufferSize();

        if (data.hasOwnProperty('attribute')) {
          obj['attribute'] = _ApiClient["default"].convertToType(data['attribute'], 'String');
        }

        if (data.hasOwnProperty('offsetBytes')) {
          obj['offsetBytes'] = _ApiClient["default"].convertToType(data['offsetBytes'], 'Number');
        }

        if (data.hasOwnProperty('dataBytes')) {
          obj['dataBytes'] = _ApiClient["default"].convertToType(data['dataBytes'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return AttributeBufferSize;
}();
/**
 * name of attribute
 * @member {String} attribute
 */


AttributeBufferSize.prototype['attribute'] = undefined;
/**
 * buffer size (in bytes) of offset buffer
 * @member {Number} offsetBytes
 */

AttributeBufferSize.prototype['offsetBytes'] = undefined;
/**
 * buffer size (in bytes) of data buffer
 * @member {Number} dataBytes
 */

AttributeBufferSize.prototype['dataBytes'] = undefined;
var _default = AttributeBufferSize;
exports["default"] = _default;