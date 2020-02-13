"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ArrayActions = _interopRequireDefault(require("./ArrayActions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ArraySharing model module.
 * @module model/ArraySharing
 * @version 1.4.0
 */
var ArraySharing =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ArraySharing</code>.
   * details for sharing a given array
   * @alias module:model/ArraySharing
   */
  function ArraySharing() {
    _classCallCheck(this, ArraySharing);

    ArraySharing.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArraySharing, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ArraySharing</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArraySharing} obj Optional instance to populate.
     * @return {module:model/ArraySharing} The populated <code>ArraySharing</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArraySharing();

        if (data.hasOwnProperty('actions')) {
          obj['actions'] = _ApiClient["default"].convertToType(data['actions'], [_ArrayActions["default"]]);
        }

        if (data.hasOwnProperty('namespace')) {
          obj['namespace'] = _ApiClient["default"].convertToType(data['namespace'], 'String');
        }

        if (data.hasOwnProperty('namespace_type')) {
          obj['namespace_type'] = _ApiClient["default"].convertToType(data['namespace_type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ArraySharing;
}();
/**
 * List of permitted actions
 * @member {Array.<module:model/ArrayActions>} actions
 */


ArraySharing.prototype['actions'] = undefined;
/**
 * namespace being granted array access can be a user or organization
 * @member {String} namespace
 */

ArraySharing.prototype['namespace'] = undefined;
/**
 * details on if the namespace is a organization or user
 * @member {String} namespace_type
 */

ArraySharing.prototype['namespace_type'] = undefined;
var _default = ArraySharing;
exports["default"] = _default;