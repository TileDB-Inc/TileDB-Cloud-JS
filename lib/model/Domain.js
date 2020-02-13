"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Datatype = _interopRequireDefault(require("./Datatype"));

var _Dimension = _interopRequireDefault(require("./Dimension"));

var _Layout = _interopRequireDefault(require("./Layout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Domain model module.
 * @module model/Domain
 * @version 1.4.0
 */
var Domain =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>Domain</code>.
   * Domain of array
   * @alias module:model/Domain
   * @param type {module:model/Datatype} 
   * @param tileOrder {module:model/Layout} 
   * @param cellOrder {module:model/Layout} 
   * @param dimensions {Array.<module:model/Dimension>} Array of dimensions
   */
  function Domain(type, tileOrder, cellOrder, dimensions) {
    _classCallCheck(this, Domain);

    Domain.initialize(this, type, tileOrder, cellOrder, dimensions);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Domain, null, [{
    key: "initialize",
    value: function initialize(obj, type, tileOrder, cellOrder, dimensions) {
      obj['type'] = type;
      obj['tileOrder'] = tileOrder;
      obj['cellOrder'] = cellOrder;
      obj['dimensions'] = dimensions;
    }
    /**
     * Constructs a <code>Domain</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Domain} obj Optional instance to populate.
     * @return {module:model/Domain} The populated <code>Domain</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Domain();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _Datatype["default"].constructFromObject(data['type']);
        }

        if (data.hasOwnProperty('tileOrder')) {
          obj['tileOrder'] = _Layout["default"].constructFromObject(data['tileOrder']);
        }

        if (data.hasOwnProperty('cellOrder')) {
          obj['cellOrder'] = _Layout["default"].constructFromObject(data['cellOrder']);
        }

        if (data.hasOwnProperty('dimensions')) {
          obj['dimensions'] = _ApiClient["default"].convertToType(data['dimensions'], [_Dimension["default"]]);
        }
      }

      return obj;
    }
  }]);

  return Domain;
}();
/**
 * @member {module:model/Datatype} type
 */


Domain.prototype['type'] = undefined;
/**
 * @member {module:model/Layout} tileOrder
 */

Domain.prototype['tileOrder'] = undefined;
/**
 * @member {module:model/Layout} cellOrder
 */

Domain.prototype['cellOrder'] = undefined;
/**
 * Array of dimensions
 * @member {Array.<module:model/Dimension>} dimensions
 */

Domain.prototype['dimensions'] = undefined;
var _default = Domain;
exports["default"] = _default;