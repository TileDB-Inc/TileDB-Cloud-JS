"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Datatype = _interopRequireDefault(require("./Datatype"));

var _DimensionTileExtent = _interopRequireDefault(require("./DimensionTileExtent"));

var _DomainArray = _interopRequireDefault(require("./DomainArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Dimension model module.
 * @module model/Dimension
 * @version 1.4.0
 */
var Dimension =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>Dimension</code>.
   * Dimension of array
   * @alias module:model/Dimension
   * @param type {module:model/Datatype} 
   * @param domain {module:model/DomainArray} 
   * @param nullTileExtent {Boolean} Is tile extent null
   */
  function Dimension(type, domain, nullTileExtent) {
    _classCallCheck(this, Dimension);

    Dimension.initialize(this, type, domain, nullTileExtent);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Dimension, null, [{
    key: "initialize",
    value: function initialize(obj, type, domain, nullTileExtent) {
      obj['type'] = type;
      obj['domain'] = domain;
      obj['nullTileExtent'] = nullTileExtent;
    }
    /**
     * Constructs a <code>Dimension</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Dimension} obj Optional instance to populate.
     * @return {module:model/Dimension} The populated <code>Dimension</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Dimension();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _Datatype["default"].constructFromObject(data['type']);
        }

        if (data.hasOwnProperty('domain')) {
          obj['domain'] = _DomainArray["default"].constructFromObject(data['domain']);
        }

        if (data.hasOwnProperty('nullTileExtent')) {
          obj['nullTileExtent'] = _ApiClient["default"].convertToType(data['nullTileExtent'], 'Boolean');
        }

        if (data.hasOwnProperty('tileExtent')) {
          obj['tileExtent'] = _DimensionTileExtent["default"].constructFromObject(data['tileExtent']);
        }
      }

      return obj;
    }
  }]);

  return Dimension;
}();
/**
 * Dimension name
 * @member {String} name
 */


Dimension.prototype['name'] = undefined;
/**
 * @member {module:model/Datatype} type
 */

Dimension.prototype['type'] = undefined;
/**
 * @member {module:model/DomainArray} domain
 */

Dimension.prototype['domain'] = undefined;
/**
 * Is tile extent null
 * @member {Boolean} nullTileExtent
 */

Dimension.prototype['nullTileExtent'] = undefined;
/**
 * @member {module:model/DimensionTileExtent} tileExtent
 */

Dimension.prototype['tileExtent'] = undefined;
var _default = Dimension;
exports["default"] = _default;