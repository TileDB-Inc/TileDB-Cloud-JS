"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _FilterData = _interopRequireDefault(require("./FilterData"));

var _FilterType = _interopRequireDefault(require("./FilterType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Filter model module.
 * @module model/Filter
 * @version 1.4.0
 */
var Filter =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>Filter</code>.
   * Filter
   * @alias module:model/Filter
   * @param type {module:model/FilterType} 
   */
  function Filter(type) {
    _classCallCheck(this, Filter);

    Filter.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Filter, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['type'] = type;
    }
    /**
     * Constructs a <code>Filter</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Filter} obj Optional instance to populate.
     * @return {module:model/Filter} The populated <code>Filter</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Filter();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _FilterType["default"].constructFromObject(data['type']);
        }

        if (data.hasOwnProperty('data')) {
          obj['data'] = _FilterData["default"].constructFromObject(data['data']);
        }
      }

      return obj;
    }
  }]);

  return Filter;
}();
/**
 * @member {module:model/FilterType} type
 */


Filter.prototype['type'] = undefined;
/**
 * @member {module:model/FilterData} data
 */

Filter.prototype['data'] = undefined;
var _default = Filter;
exports["default"] = _default;