"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _DomainArray = _interopRequireDefault(require("./DomainArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Writer model module.
 * @module model/Writer
 * @version 1.4.0
 */
var Writer =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>Writer</code>.
   * @alias module:model/Writer
   */
  function Writer() {
    _classCallCheck(this, Writer);

    Writer.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Writer, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Writer</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Writer} obj Optional instance to populate.
     * @return {module:model/Writer} The populated <code>Writer</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Writer();

        if (data.hasOwnProperty('checkCoordDups')) {
          obj['checkCoordDups'] = _ApiClient["default"].convertToType(data['checkCoordDups'], 'Boolean');
        }

        if (data.hasOwnProperty('checkCoordOOB')) {
          obj['checkCoordOOB'] = _ApiClient["default"].convertToType(data['checkCoordOOB'], 'Boolean');
        }

        if (data.hasOwnProperty('dedupCoords')) {
          obj['dedupCoords'] = _ApiClient["default"].convertToType(data['dedupCoords'], 'Boolean');
        }

        if (data.hasOwnProperty('subarray')) {
          obj['subarray'] = _DomainArray["default"].constructFromObject(data['subarray']);
        }
      }

      return obj;
    }
  }]);

  return Writer;
}();
/**
 * @member {Boolean} checkCoordDups
 */


Writer.prototype['checkCoordDups'] = undefined;
/**
 * @member {Boolean} checkCoordOOB
 */

Writer.prototype['checkCoordOOB'] = undefined;
/**
 * @member {Boolean} dedupCoords
 */

Writer.prototype['dedupCoords'] = undefined;
/**
 * @member {module:model/DomainArray} subarray
 */

Writer.prototype['subarray'] = undefined;
var _default = Writer;
exports["default"] = _default;