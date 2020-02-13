"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AttributeBufferSize = _interopRequireDefault(require("./AttributeBufferSize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The MaxBufferSizes model module.
 * @module model/MaxBufferSizes
 * @version 1.4.0
 */
var MaxBufferSizes =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>MaxBufferSizes</code>.
   * a list of max buffer sizes, one per attribute
   * @alias module:model/MaxBufferSizes
   */
  function MaxBufferSizes() {
    _classCallCheck(this, MaxBufferSizes);

    MaxBufferSizes.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(MaxBufferSizes, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>MaxBufferSizes</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MaxBufferSizes} obj Optional instance to populate.
     * @return {module:model/MaxBufferSizes} The populated <code>MaxBufferSizes</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new MaxBufferSizes();

        if (data.hasOwnProperty('maxBufferSizes')) {
          obj['maxBufferSizes'] = _ApiClient["default"].convertToType(data['maxBufferSizes'], [_AttributeBufferSize["default"]]);
        }
      }

      return obj;
    }
  }]);

  return MaxBufferSizes;
}();
/**
 * @member {Array.<module:model/AttributeBufferSize>} maxBufferSizes
 */


MaxBufferSizes.prototype['maxBufferSizes'] = undefined;
var _default = MaxBufferSizes;
exports["default"] = _default;