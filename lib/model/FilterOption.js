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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
* Enum class FilterOption.
* @enum {}
* @readonly
*/
var FilterOption =
/*#__PURE__*/
function () {
  function FilterOption() {
    _classCallCheck(this, FilterOption);

    _defineProperty(this, "COMPRESSION_LEVEL", "COMPRESSION_LEVEL");

    _defineProperty(this, "BIT_WIDTH_MAX_WINDOW", "BIT_WIDTH_MAX_WINDOW");

    _defineProperty(this, "POSITIVE_DELTA_MAX_WINDOW", "POSITIVE_DELTA_MAX_WINDOW");
  }

  _createClass(FilterOption, null, [{
    key: "constructFromObject",

    /**
    * Returns a <code>FilterOption</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/FilterOption} The enum <code>FilterOption</code> value.
    */
    value: function constructFromObject(object) {
      return object;
    }
  }]);

  return FilterOption;
}();

exports["default"] = FilterOption;