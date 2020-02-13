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
 * The SQLParameters model module.
 * @module model/SQLParameters
 * @version 1.4.0
 */
var SQLParameters =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>SQLParameters</code>.
   * Parameters for running sql query
   * @alias module:model/SQLParameters
   */
  function SQLParameters() {
    _classCallCheck(this, SQLParameters);

    SQLParameters.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(SQLParameters, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>SQLParameters</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SQLParameters} obj Optional instance to populate.
     * @return {module:model/SQLParameters} The populated <code>SQLParameters</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SQLParameters();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('query')) {
          obj['query'] = _ApiClient["default"].convertToType(data['query'], 'String');
        }

        if (data.hasOwnProperty('output_uri')) {
          obj['output_uri'] = _ApiClient["default"].convertToType(data['output_uri'], 'String');
        }
      }

      return obj;
    }
  }]);

  return SQLParameters;
}();
/**
 * name of task, optional
 * @member {String} name
 */


SQLParameters.prototype['name'] = undefined;
/**
 * query to run
 * @member {String} query
 */

SQLParameters.prototype['query'] = undefined;
/**
 * Output array uri
 * @member {String} output_uri
 */

SQLParameters.prototype['output_uri'] = undefined;
var _default = SQLParameters;
exports["default"] = _default;