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
 * The NonEmptyDomain model module.
 * @module model/NonEmptyDomain
 * @version 1.4.0
 */
var NonEmptyDomain =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>NonEmptyDomain</code>.
   * object representing a non-empty domain
   * @alias module:model/NonEmptyDomain
   * @param nonEmptyDomain {module:model/DomainArray} 
   * @param isEmpty {Boolean} Is non-empty domain really empty?
   */
  function NonEmptyDomain(nonEmptyDomain, isEmpty) {
    _classCallCheck(this, NonEmptyDomain);

    NonEmptyDomain.initialize(this, nonEmptyDomain, isEmpty);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(NonEmptyDomain, null, [{
    key: "initialize",
    value: function initialize(obj, nonEmptyDomain, isEmpty) {
      obj['nonEmptyDomain'] = nonEmptyDomain;
      obj['isEmpty'] = isEmpty;
    }
    /**
     * Constructs a <code>NonEmptyDomain</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NonEmptyDomain} obj Optional instance to populate.
     * @return {module:model/NonEmptyDomain} The populated <code>NonEmptyDomain</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new NonEmptyDomain();

        if (data.hasOwnProperty('nonEmptyDomain')) {
          obj['nonEmptyDomain'] = _DomainArray["default"].constructFromObject(data['nonEmptyDomain']);
        }

        if (data.hasOwnProperty('isEmpty')) {
          obj['isEmpty'] = _ApiClient["default"].convertToType(data['isEmpty'], 'Boolean');
        }
      }

      return obj;
    }
  }]);

  return NonEmptyDomain;
}();
/**
 * @member {module:model/DomainArray} nonEmptyDomain
 */


NonEmptyDomain.prototype['nonEmptyDomain'] = undefined;
/**
 * Is non-empty domain really empty?
 * @member {Boolean} isEmpty
 */

NonEmptyDomain.prototype['isEmpty'] = undefined;
var _default = NonEmptyDomain;
exports["default"] = _default;