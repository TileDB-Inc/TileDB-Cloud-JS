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
 * The AttributeBufferHeader model module.
 * @module model/AttributeBufferHeader
 * @version 1.4.0
 */
var AttributeBufferHeader =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>AttributeBufferHeader</code>.
   * Represents an attribute buffer header information
   * @alias module:model/AttributeBufferHeader
   * @param name {String} Attribute name
   * @param fixedLenBufferSizeInBytes {Number} Number of bytes in the fixed-length attribute data buffer (offsets for var-len attributes)
   * @param varLenBufferSizeInBytes {Number} Number of bytes in the var-length attribute data buffer
   */
  function AttributeBufferHeader(name, fixedLenBufferSizeInBytes, varLenBufferSizeInBytes) {
    _classCallCheck(this, AttributeBufferHeader);

    AttributeBufferHeader.initialize(this, name, fixedLenBufferSizeInBytes, varLenBufferSizeInBytes);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(AttributeBufferHeader, null, [{
    key: "initialize",
    value: function initialize(obj, name, fixedLenBufferSizeInBytes, varLenBufferSizeInBytes) {
      obj['name'] = name;
      obj['fixedLenBufferSizeInBytes'] = fixedLenBufferSizeInBytes;
      obj['varLenBufferSizeInBytes'] = varLenBufferSizeInBytes;
    }
    /**
     * Constructs a <code>AttributeBufferHeader</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AttributeBufferHeader} obj Optional instance to populate.
     * @return {module:model/AttributeBufferHeader} The populated <code>AttributeBufferHeader</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new AttributeBufferHeader();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('fixedLenBufferSizeInBytes')) {
          obj['fixedLenBufferSizeInBytes'] = _ApiClient["default"].convertToType(data['fixedLenBufferSizeInBytes'], 'Number');
        }

        if (data.hasOwnProperty('varLenBufferSizeInBytes')) {
          obj['varLenBufferSizeInBytes'] = _ApiClient["default"].convertToType(data['varLenBufferSizeInBytes'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return AttributeBufferHeader;
}();
/**
 * Attribute name
 * @member {String} name
 */


AttributeBufferHeader.prototype['name'] = undefined;
/**
 * Number of bytes in the fixed-length attribute data buffer (offsets for var-len attributes)
 * @member {Number} fixedLenBufferSizeInBytes
 */

AttributeBufferHeader.prototype['fixedLenBufferSizeInBytes'] = undefined;
/**
 * Number of bytes in the var-length attribute data buffer
 * @member {Number} varLenBufferSizeInBytes
 */

AttributeBufferHeader.prototype['varLenBufferSizeInBytes'] = undefined;
var _default = AttributeBufferHeader;
exports["default"] = _default;