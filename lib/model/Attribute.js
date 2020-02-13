"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Datatype = _interopRequireDefault(require("./Datatype"));

var _FilterPipeline = _interopRequireDefault(require("./FilterPipeline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Attribute model module.
 * @module model/Attribute
 * @version 1.4.0
 */
var Attribute =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>Attribute</code>.
   * Attribute of array
   * @alias module:model/Attribute
   * @param name {String} Attribute name
   * @param type {module:model/Datatype} 
   * @param filterPipeline {module:model/FilterPipeline} 
   * @param cellValNum {Number} Attribute number of values per cell
   */
  function Attribute(name, type, filterPipeline, cellValNum) {
    _classCallCheck(this, Attribute);

    Attribute.initialize(this, name, type, filterPipeline, cellValNum);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Attribute, null, [{
    key: "initialize",
    value: function initialize(obj, name, type, filterPipeline, cellValNum) {
      obj['name'] = name;
      obj['type'] = type;
      obj['filterPipeline'] = filterPipeline;
      obj['cellValNum'] = cellValNum;
    }
    /**
     * Constructs a <code>Attribute</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Attribute} obj Optional instance to populate.
     * @return {module:model/Attribute} The populated <code>Attribute</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Attribute();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _Datatype["default"].constructFromObject(data['type']);
        }

        if (data.hasOwnProperty('filterPipeline')) {
          obj['filterPipeline'] = _FilterPipeline["default"].constructFromObject(data['filterPipeline']);
        }

        if (data.hasOwnProperty('cellValNum')) {
          obj['cellValNum'] = _ApiClient["default"].convertToType(data['cellValNum'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return Attribute;
}();
/**
 * Attribute name
 * @member {String} name
 */


Attribute.prototype['name'] = undefined;
/**
 * @member {module:model/Datatype} type
 */

Attribute.prototype['type'] = undefined;
/**
 * @member {module:model/FilterPipeline} filterPipeline
 */

Attribute.prototype['filterPipeline'] = undefined;
/**
 * Attribute number of values per cell
 * @member {Number} cellValNum
 */

Attribute.prototype['cellValNum'] = undefined;
var _default = Attribute;
exports["default"] = _default;