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
* Enum class ActivityEventType.
* @enum {}
* @readonly
*/
var ActivityEventType =
/*#__PURE__*/
function () {
  function ActivityEventType() {
    _classCallCheck(this, ActivityEventType);

    _defineProperty(this, "read_schema", "read_schema");

    _defineProperty(this, "max_buffer_sizes", "max_buffer_sizes");

    _defineProperty(this, "non_empty_domain", "non_empty_domain");

    _defineProperty(this, "query_read", "query_read");

    _defineProperty(this, "query_write", "query_write");

    _defineProperty(this, "create", "create");

    _defineProperty(this, "delete", "delete");

    _defineProperty(this, "register", "register");

    _defineProperty(this, "deregister", "deregister");

    _defineProperty(this, "udf", "udf");

    _defineProperty(this, "array_metadata_get", "array_metadata_get");

    _defineProperty(this, "array_metadata_update", "array_metadata_update");
  }

  _createClass(ActivityEventType, null, [{
    key: "constructFromObject",

    /**
    * Returns a <code>ActivityEventType</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/ActivityEventType} The enum <code>ActivityEventType</code> value.
    */
    value: function constructFromObject(object) {
      return object;
    }
  }]);

  return ActivityEventType;
}();

exports["default"] = ActivityEventType;