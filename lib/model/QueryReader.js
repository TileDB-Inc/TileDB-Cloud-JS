"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Layout = _interopRequireDefault(require("./Layout"));

var _ReadState = _interopRequireDefault(require("./ReadState"));

var _Subarray = _interopRequireDefault(require("./Subarray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The QueryReader model module.
 * @module model/QueryReader
 * @version 1.4.0
 */
var QueryReader =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>QueryReader</code>.
   * Read struct (can&#39;t be called reader due to class name conflict)
   * @alias module:model/QueryReader
   */
  function QueryReader() {
    _classCallCheck(this, QueryReader);

    QueryReader.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(QueryReader, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>QueryReader</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/QueryReader} obj Optional instance to populate.
     * @return {module:model/QueryReader} The populated <code>QueryReader</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new QueryReader();

        if (data.hasOwnProperty('layout')) {
          obj['layout'] = _Layout["default"].constructFromObject(data['layout']);
        }

        if (data.hasOwnProperty('subarray')) {
          obj['subarray'] = _Subarray["default"].constructFromObject(data['subarray']);
        }

        if (data.hasOwnProperty('readState')) {
          obj['readState'] = _ReadState["default"].constructFromObject(data['readState']);
        }
      }

      return obj;
    }
  }]);

  return QueryReader;
}();
/**
 * @member {module:model/Layout} layout
 */


QueryReader.prototype['layout'] = undefined;
/**
 * @member {module:model/Subarray} subarray
 */

QueryReader.prototype['subarray'] = undefined;
/**
 * @member {module:model/ReadState} readState
 */

QueryReader.prototype['readState'] = undefined;
var _default = QueryReader;
exports["default"] = _default;