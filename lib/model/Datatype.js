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
* Enum class Datatype.
* @enum {}
* @readonly
*/
var Datatype =
/*#__PURE__*/
function () {
  function Datatype() {
    _classCallCheck(this, Datatype);

    _defineProperty(this, "INT32", "INT32");

    _defineProperty(this, "INT64", "INT64");

    _defineProperty(this, "FLOAT32", "FLOAT32");

    _defineProperty(this, "FLOAT64", "FLOAT64");

    _defineProperty(this, "CHAR", "CHAR");

    _defineProperty(this, "INT8", "INT8");

    _defineProperty(this, "UINT8", "UINT8");

    _defineProperty(this, "INT16", "INT16");

    _defineProperty(this, "UINT16", "UINT16");

    _defineProperty(this, "UINT32", "UINT32");

    _defineProperty(this, "UINT64", "UINT64");

    _defineProperty(this, "STRING_ASCII", "STRING_ASCII");

    _defineProperty(this, "STRING_UTF8", "STRING_UTF8");

    _defineProperty(this, "STRING_UTF16", "STRING_UTF16");

    _defineProperty(this, "STRING_UTF32", "STRING_UTF32");

    _defineProperty(this, "STRING_UCS2", "STRING_UCS2");

    _defineProperty(this, "STRING_UCS4", "STRING_UCS4");

    _defineProperty(this, "ANY", "ANY");
  }

  _createClass(Datatype, null, [{
    key: "constructFromObject",

    /**
    * Returns a <code>Datatype</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/Datatype} The enum <code>Datatype</code> value.
    */
    value: function constructFromObject(object) {
      return object;
    }
  }]);

  return Datatype;
}();

exports["default"] = Datatype;