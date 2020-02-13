"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ArrayType = _interopRequireDefault(require("./ArrayType"));

var _Attribute = _interopRequireDefault(require("./Attribute"));

var _Domain = _interopRequireDefault(require("./Domain"));

var _FilterPipeline = _interopRequireDefault(require("./FilterPipeline"));

var _Layout = _interopRequireDefault(require("./Layout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ArraySchema model module.
 * @module model/ArraySchema
 * @version 1.4.0
 */
var ArraySchema =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ArraySchema</code>.
   * ArraySchema during creation or retrieval
   * @alias module:model/ArraySchema
   * @param version {Array.<Number>} file format version
   * @param arrayType {module:model/ArrayType} 
   * @param tileOrder {module:model/Layout} 
   * @param cellOrder {module:model/Layout} 
   * @param capacity {Number} Capacity of array
   * @param coordsFilterPipeline {module:model/FilterPipeline} 
   * @param offsetFilterPipeline {module:model/FilterPipeline} 
   * @param domain {module:model/Domain} 
   * @param attributes {Array.<module:model/Attribute>} Attributes of array
   */
  function ArraySchema(version, arrayType, tileOrder, cellOrder, capacity, coordsFilterPipeline, offsetFilterPipeline, domain, attributes) {
    _classCallCheck(this, ArraySchema);

    ArraySchema.initialize(this, version, arrayType, tileOrder, cellOrder, capacity, coordsFilterPipeline, offsetFilterPipeline, domain, attributes);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArraySchema, null, [{
    key: "initialize",
    value: function initialize(obj, version, arrayType, tileOrder, cellOrder, capacity, coordsFilterPipeline, offsetFilterPipeline, domain, attributes) {
      obj['version'] = version;
      obj['arrayType'] = arrayType;
      obj['tileOrder'] = tileOrder;
      obj['cellOrder'] = cellOrder;
      obj['capacity'] = capacity;
      obj['coordsFilterPipeline'] = coordsFilterPipeline;
      obj['offsetFilterPipeline'] = offsetFilterPipeline;
      obj['domain'] = domain;
      obj['attributes'] = attributes;
    }
    /**
     * Constructs a <code>ArraySchema</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArraySchema} obj Optional instance to populate.
     * @return {module:model/ArraySchema} The populated <code>ArraySchema</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArraySchema();

        if (data.hasOwnProperty('uri')) {
          obj['uri'] = _ApiClient["default"].convertToType(data['uri'], 'String');
        }

        if (data.hasOwnProperty('version')) {
          obj['version'] = _ApiClient["default"].convertToType(data['version'], ['Number']);
        }

        if (data.hasOwnProperty('arrayType')) {
          obj['arrayType'] = _ArrayType["default"].constructFromObject(data['arrayType']);
        }

        if (data.hasOwnProperty('tileOrder')) {
          obj['tileOrder'] = _Layout["default"].constructFromObject(data['tileOrder']);
        }

        if (data.hasOwnProperty('cellOrder')) {
          obj['cellOrder'] = _Layout["default"].constructFromObject(data['cellOrder']);
        }

        if (data.hasOwnProperty('capacity')) {
          obj['capacity'] = _ApiClient["default"].convertToType(data['capacity'], 'Number');
        }

        if (data.hasOwnProperty('coordsFilterPipeline')) {
          obj['coordsFilterPipeline'] = _FilterPipeline["default"].constructFromObject(data['coordsFilterPipeline']);
        }

        if (data.hasOwnProperty('offsetFilterPipeline')) {
          obj['offsetFilterPipeline'] = _FilterPipeline["default"].constructFromObject(data['offsetFilterPipeline']);
        }

        if (data.hasOwnProperty('domain')) {
          obj['domain'] = _Domain["default"].constructFromObject(data['domain']);
        }

        if (data.hasOwnProperty('attributes')) {
          obj['attributes'] = _ApiClient["default"].convertToType(data['attributes'], [_Attribute["default"]]);
        }
      }

      return obj;
    }
  }]);

  return ArraySchema;
}();
/**
 * URI of schema
 * @member {String} uri
 */


ArraySchema.prototype['uri'] = undefined;
/**
 * file format version
 * @member {Array.<Number>} version
 */

ArraySchema.prototype['version'] = undefined;
/**
 * @member {module:model/ArrayType} arrayType
 */

ArraySchema.prototype['arrayType'] = undefined;
/**
 * @member {module:model/Layout} tileOrder
 */

ArraySchema.prototype['tileOrder'] = undefined;
/**
 * @member {module:model/Layout} cellOrder
 */

ArraySchema.prototype['cellOrder'] = undefined;
/**
 * Capacity of array
 * @member {Number} capacity
 */

ArraySchema.prototype['capacity'] = undefined;
/**
 * @member {module:model/FilterPipeline} coordsFilterPipeline
 */

ArraySchema.prototype['coordsFilterPipeline'] = undefined;
/**
 * @member {module:model/FilterPipeline} offsetFilterPipeline
 */

ArraySchema.prototype['offsetFilterPipeline'] = undefined;
/**
 * @member {module:model/Domain} domain
 */

ArraySchema.prototype['domain'] = undefined;
/**
 * Attributes of array
 * @member {Array.<module:model/Attribute>} attributes
 */

ArraySchema.prototype['attributes'] = undefined;
var _default = ArraySchema;
exports["default"] = _default;