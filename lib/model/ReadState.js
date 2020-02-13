"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _SubarrayPartitioner = _interopRequireDefault(require("./SubarrayPartitioner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ReadState model module.
 * @module model/ReadState
 * @version 1.4.0
 */
var ReadState =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>ReadState</code>.
   * state for reads
   * @alias module:model/ReadState
   */
  function ReadState() {
    _classCallCheck(this, ReadState);

    ReadState.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ReadState, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ReadState</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ReadState} obj Optional instance to populate.
     * @return {module:model/ReadState} The populated <code>ReadState</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ReadState();

        if (data.hasOwnProperty('initialized')) {
          obj['initialized'] = _ApiClient["default"].convertToType(data['initialized'], 'Boolean');
        }

        if (data.hasOwnProperty('overflowed')) {
          obj['overflowed'] = _ApiClient["default"].convertToType(data['overflowed'], 'Boolean');
        }

        if (data.hasOwnProperty('unsplittable')) {
          obj['unsplittable'] = _ApiClient["default"].convertToType(data['unsplittable'], 'Boolean');
        }

        if (data.hasOwnProperty('subarrayPartitioner')) {
          obj['subarrayPartitioner'] = _SubarrayPartitioner["default"].constructFromObject(data['subarrayPartitioner']);
        }
      }

      return obj;
    }
  }]);

  return ReadState;
}();
/**
 * True if the reader has been initialized.
 * @member {Boolean} initialized
 */


ReadState.prototype['initialized'] = undefined;
/**
 * True if the query produced results that could not fit in some buffer.
 * @member {Boolean} overflowed
 */

ReadState.prototype['overflowed'] = undefined;
/**
 * True if the current subarray partition is unsplittable.
 * @member {Boolean} unsplittable
 */

ReadState.prototype['unsplittable'] = undefined;
/**
 * @member {module:model/SubarrayPartitioner} subarrayPartitioner
 */

ReadState.prototype['subarrayPartitioner'] = undefined;
var _default = ReadState;
exports["default"] = _default;