"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var json = [{
  component: "Button",
  props: {
    text: "This is a button"
  }
}];

var Builder =
/*#__PURE__*/
function () {
  function Builder() {
    _classCallCheck(this, Builder);
  }

  _createClass(Builder, [{
    key: "getPage",
    value: function getPage(route) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return resolve(json);
        }, 1000);
      });
    }
  }]);

  return Builder;
}();

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.get("/", function (req, res, next) {
  res.status(200).json(json);
});
app.listen(3000, function () {
  console.log("Builder listening on 3000.");
});
var _default = Builder;
exports["default"] = _default;