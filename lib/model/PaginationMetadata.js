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
 * The PaginationMetadata model module.
 * @module model/PaginationMetadata
 * @version 1.4.0
 */
var PaginationMetadata =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>PaginationMetadata</code>.
   * @alias module:model/PaginationMetadata
   */
  function PaginationMetadata() {
    _classCallCheck(this, PaginationMetadata);

    PaginationMetadata.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(PaginationMetadata, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>PaginationMetadata</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PaginationMetadata} obj Optional instance to populate.
     * @return {module:model/PaginationMetadata} The populated <code>PaginationMetadata</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new PaginationMetadata();

        if (data.hasOwnProperty('page')) {
          obj['page'] = _ApiClient["default"].convertToType(data['page'], 'Number');
        }

        if (data.hasOwnProperty('per_page')) {
          obj['per_page'] = _ApiClient["default"].convertToType(data['per_page'], 'Number');
        }

        if (data.hasOwnProperty('total_pages')) {
          obj['total_pages'] = _ApiClient["default"].convertToType(data['total_pages'], 'Number');
        }

        if (data.hasOwnProperty('total_items')) {
          obj['total_items'] = _ApiClient["default"].convertToType(data['total_items'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return PaginationMetadata;
}();
/**
 * pagination offset
 * @member {Number} page
 */


PaginationMetadata.prototype['page'] = undefined;
/**
 * pagination limit
 * @member {Number} per_page
 */

PaginationMetadata.prototype['per_page'] = undefined;
/**
 * number of total pages with current limit
 * @member {Number} total_pages
 */

PaginationMetadata.prototype['total_pages'] = undefined;
/**
 * number of total available items
 * @member {Number} total_items
 */

PaginationMetadata.prototype['total_items'] = undefined;
var _default = PaginationMetadata;
exports["default"] = _default;