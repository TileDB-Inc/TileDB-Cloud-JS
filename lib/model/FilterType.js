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
* Enum class FilterType.
* @enum {}
* @readonly
*/
var FilterType =
/*#__PURE__*/
function () {
  function FilterType() {
    _classCallCheck(this, FilterType);

    _defineProperty(this, "NONE", "FILTER_NONE");

    _defineProperty(this, "GZIP", "FILTER_GZIP");

    _defineProperty(this, "ZSTD", "FILTER_ZSTD");

    _defineProperty(this, "LZ4", "FILTER_LZ4");

    _defineProperty(this, "RLE", "FILTER_RLE");

    _defineProperty(this, "BZIP2", "FILTER_BZIP2");

    _defineProperty(this, "DOUBLE_DELTA", "FILTER_DOUBLE_DELTA");

    _defineProperty(this, "BIT_WIDTH_REDUCTION", "FILTER_BIT_WIDTH_REDUCTION");

    _defineProperty(this, "BITSHUFFLE", "FILTER_BITSHUFFLE");

    _defineProperty(this, "BYTESHUFFLE", "FILTER_BYTESHUFFLE");

    _defineProperty(this, "POSITIVE_DELTA", "FILTER_POSITIVE_DELTA");
  }

  _createClass(FilterType, null, [{
    key: "constructFromObject",

    /**
    * Returns a <code>FilterType</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/FilterType} The enum <code>FilterType</code> value.
    */
    value: function constructFromObject(object) {
      return object;
    }
  }]);

  return FilterType;
}();

exports["default"] = FilterType;