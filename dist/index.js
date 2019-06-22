"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _builder = _interopRequireDefault(require("./builder"));

var _mapper = _interopRequireDefault(require("./mapper"));

var _renderer = _interopRequireDefault(require("./renderer"));

var _stock = _interopRequireDefault(require("./stock.0"));

var _stock2 = _interopRequireDefault(require("./stock.1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();
var builder = new _builder["default"]();
var mapper = new _mapper["default"](_stock2["default"]);
app.get("/",
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var json, page;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return builder.getPage();

          case 2:
            json = _context.sent;
            page = mapper.build(json);
            res.send((0, _renderer["default"])(page));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.listen(3000, function () {
  console.log("Server listening on 3000.");
});