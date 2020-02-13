"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AttributeBufferHeader = _interopRequireDefault(require("./AttributeBufferHeader"));

var _Layout = _interopRequireDefault(require("./Layout"));

var _ModelArray = _interopRequireDefault(require("./ModelArray"));

var _QueryReader = _interopRequireDefault(require("./QueryReader"));

var _Querystatus = _interopRequireDefault(require("./Querystatus"));

var _Querytype = _interopRequireDefault(require("./Querytype"));

var _Writer = _interopRequireDefault(require("./Writer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Query model module.
 * @module model/Query
 * @version 1.4.0
 */
var Query =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>Query</code>.
   * @alias module:model/Query
   * @param type {module:model/Querytype} 
   * @param layout {module:model/Layout} 
   * @param status {module:model/Querystatus} 
   * @param attributeBufferHeaders {Array.<module:model/AttributeBufferHeader>} List of attribute buffer headers
   * @param _array {module:model/ModelArray} 
   * @param totalFixedLengthBufferBytes {Number} Total number of bytes in fixed size attribute buffers.
   * @param totalVarLenBufferBytes {Number} Total number of bytes in variable size attribute buffers.
   */
  function Query(type, layout, status, attributeBufferHeaders, _array, totalFixedLengthBufferBytes, totalVarLenBufferBytes) {
    _classCallCheck(this, Query);

    Query.initialize(this, type, layout, status, attributeBufferHeaders, _array, totalFixedLengthBufferBytes, totalVarLenBufferBytes);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Query, null, [{
    key: "initialize",
    value: function initialize(obj, type, layout, status, attributeBufferHeaders, _array, totalFixedLengthBufferBytes, totalVarLenBufferBytes) {
      obj['type'] = type;
      obj['layout'] = layout;
      obj['status'] = status;
      obj['attributeBufferHeaders'] = attributeBufferHeaders;
      obj['array'] = _array;
      obj['totalFixedLengthBufferBytes'] = totalFixedLengthBufferBytes;
      obj['totalVarLenBufferBytes'] = totalVarLenBufferBytes;
    }
    /**
     * Constructs a <code>Query</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Query} obj Optional instance to populate.
     * @return {module:model/Query} The populated <code>Query</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Query();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _Querytype["default"].constructFromObject(data['type']);
        }

        if (data.hasOwnProperty('layout')) {
          obj['layout'] = _Layout["default"].constructFromObject(data['layout']);
        }

        if (data.hasOwnProperty('status')) {
          obj['status'] = _Querystatus["default"].constructFromObject(data['status']);
        }

        if (data.hasOwnProperty('attributeBufferHeaders')) {
          obj['attributeBufferHeaders'] = _ApiClient["default"].convertToType(data['attributeBufferHeaders'], [_AttributeBufferHeader["default"]]);
        }

        if (data.hasOwnProperty('writer')) {
          obj['writer'] = _Writer["default"].constructFromObject(data['writer']);
        }

        if (data.hasOwnProperty('reader')) {
          obj['reader'] = _QueryReader["default"].constructFromObject(data['reader']);
        }

        if (data.hasOwnProperty('array')) {
          obj['array'] = _ModelArray["default"].constructFromObject(data['array']);
        }

        if (data.hasOwnProperty('totalFixedLengthBufferBytes')) {
          obj['totalFixedLengthBufferBytes'] = _ApiClient["default"].convertToType(data['totalFixedLengthBufferBytes'], 'Number');
        }

        if (data.hasOwnProperty('totalVarLenBufferBytes')) {
          obj['totalVarLenBufferBytes'] = _ApiClient["default"].convertToType(data['totalVarLenBufferBytes'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return Query;
}();
/**
 * @member {module:model/Querytype} type
 */


Query.prototype['type'] = undefined;
/**
 * @member {module:model/Layout} layout
 */

Query.prototype['layout'] = undefined;
/**
 * @member {module:model/Querystatus} status
 */

Query.prototype['status'] = undefined;
/**
 * List of attribute buffer headers
 * @member {Array.<module:model/AttributeBufferHeader>} attributeBufferHeaders
 */

Query.prototype['attributeBufferHeaders'] = undefined;
/**
 * @member {module:model/Writer} writer
 */

Query.prototype['writer'] = undefined;
/**
 * @member {module:model/QueryReader} reader
 */

Query.prototype['reader'] = undefined;
/**
 * @member {module:model/ModelArray} array
 */

Query.prototype['array'] = undefined;
/**
 * Total number of bytes in fixed size attribute buffers.
 * @member {Number} totalFixedLengthBufferBytes
 */

Query.prototype['totalFixedLengthBufferBytes'] = undefined;
/**
 * Total number of bytes in variable size attribute buffers.
 * @member {Number} totalVarLenBufferBytes
 */

Query.prototype['totalVarLenBufferBytes'] = undefined;
var _default = Query;
exports["default"] = _default;