"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _UDFSubarray = _interopRequireDefault(require("./UDFSubarray"));

var _UDFType = _interopRequireDefault(require("./UDFType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The UDF model module.
 * @module model/UDF
 * @version 1.4.0
 */
var UDF =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>UDF</code>.
   * User-defined function
   * @alias module:model/UDF
   */
  function UDF() {
    _classCallCheck(this, UDF);

    UDF.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UDF, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>UDF</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UDF} obj Optional instance to populate.
     * @return {module:model/UDF} The populated <code>UDF</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UDF();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _UDFType["default"].constructFromObject(data['type']);
        }

        if (data.hasOwnProperty('version')) {
          obj['version'] = _ApiClient["default"].convertToType(data['version'], 'String');
        }

        if (data.hasOwnProperty('image_name')) {
          obj['image_name'] = _ApiClient["default"].convertToType(data['image_name'], 'String');
        }

        if (data.hasOwnProperty('subarray')) {
          obj['subarray'] = _UDFSubarray["default"].constructFromObject(data['subarray']);
        }

        if (data.hasOwnProperty('exec')) {
          obj['exec'] = _ApiClient["default"].convertToType(data['exec'], 'String');
        }

        if (data.hasOwnProperty('buffers')) {
          obj['buffers'] = _ApiClient["default"].convertToType(data['buffers'], ['String']);
        }
      }

      return obj;
    }
  }]);

  return UDF;
}();
/**
 * @member {module:model/UDFType} type
 */


UDF.prototype['type'] = undefined;
/**
 * Type-specific version
 * @member {String} version
 */

UDF.prototype['version'] = undefined;
/**
 * Docker image name to use for udf
 * @member {String} image_name
 */

UDF.prototype['image_name'] = undefined;
/**
 * @member {module:model/UDFSubarray} subarray
 */

UDF.prototype['subarray'] = undefined;
/**
 * Type-specific executable text
 * @member {String} exec
 */

UDF.prototype['exec'] = undefined;
/**
 * List of buffers to fetch (attributes + coordinates)
 * @member {Array.<String>} buffers
 */

UDF.prototype['buffers'] = undefined;
var _default = UDF;
exports["default"] = _default;