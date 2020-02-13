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
 * The ArrayTaskBrowserSidebar model module.
 * @module model/ArrayTaskBrowserSidebar
 * @version 1.4.0
 */
var ArrayTaskBrowserSidebar =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ArrayTaskBrowserSidebar</code>.
   * Object for ui array tasks browser page
   * @alias module:model/ArrayTaskBrowserSidebar
   */
  function ArrayTaskBrowserSidebar() {
    _classCallCheck(this, ArrayTaskBrowserSidebar);

    ArrayTaskBrowserSidebar.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArrayTaskBrowserSidebar, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ArrayTaskBrowserSidebar</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArrayTaskBrowserSidebar} obj Optional instance to populate.
     * @return {module:model/ArrayTaskBrowserSidebar} The populated <code>ArrayTaskBrowserSidebar</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArrayTaskBrowserSidebar();

        if (data.hasOwnProperty('organizations')) {
          obj['organizations'] = _ApiClient["default"].convertToType(data['organizations'], ['String']);
        }

        if (data.hasOwnProperty('result_count_for_all')) {
          obj['result_count_for_all'] = _ApiClient["default"].convertToType(data['result_count_for_all'], 'Number');
        }

        if (data.hasOwnProperty('result_count_by_namespace')) {
          obj['result_count_by_namespace'] = _ApiClient["default"].convertToType(data['result_count_by_namespace'], Object);
        }
      }

      return obj;
    }
  }]);

  return ArrayTaskBrowserSidebar;
}();
/**
 * list of all unique organizations the user is part of that have array tasks
 * @member {Array.<String>} organizations
 */


ArrayTaskBrowserSidebar.prototype['organizations'] = undefined;
/**
 * A count of \"all\"
 * @member {Number} result_count_for_all
 */

ArrayTaskBrowserSidebar.prototype['result_count_for_all'] = undefined;
/**
 * A map that includes the result count by namespace
 * @member {Object} result_count_by_namespace
 */

ArrayTaskBrowserSidebar.prototype['result_count_by_namespace'] = undefined;
var _default = ArrayTaskBrowserSidebar;
exports["default"] = _default;