"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Filter = _interopRequireDefault(require("./Filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The FilterPipeline model module.
 * @module model/FilterPipeline
 * @version 1.4.0
 */
var FilterPipeline =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>FilterPipeline</code>.
   * One or more filters to apply
   * @alias module:model/FilterPipeline
   */
  function FilterPipeline() {
    _classCallCheck(this, FilterPipeline);

    FilterPipeline.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(FilterPipeline, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>FilterPipeline</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FilterPipeline} obj Optional instance to populate.
     * @return {module:model/FilterPipeline} The populated <code>FilterPipeline</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new FilterPipeline();

        if (data.hasOwnProperty('filters')) {
          obj['filters'] = _ApiClient["default"].convertToType(data['filters'], [_Filter["default"]]);
        }
      }

      return obj;
    }
  }]);

  return FilterPipeline;
}();
/**
 * @member {Array.<module:model/Filter>} filters
 */


FilterPipeline.prototype['filters'] = undefined;
var _default = FilterPipeline;
exports["default"] = _default;