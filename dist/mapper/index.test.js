"use strict";

var _react = _interopRequireDefault(require("react"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var lib = {
  Paragraph: function Paragraph(text) {
    return _react["default"].createElement("p", null, text);
  },
  Divider: function Divider() {
    return _react["default"].createElement("hr", null);
  },
  Span: function Span() {
    return _react["default"].createElement("span", null);
  },
  Banner: function Banner(_ref) {
    var children = _ref.children;
    return _react["default"].createElement("div", null, children);
  }
};
var page = [{
  name: "Paragraph",
  settings: {}
}, {
  name: "Divider",
  settings: {}
}, {
  name: "span",
  settings: {}
}];
var map = {
  "span": {
    "component": "Span"
  },
  "Banner": {
    "children": function children(object) {
      return object.children;
    }
  }
};
var builder;
beforeEach(function () {
  builder = new _["default"](lib, map);
});
describe('Builder structure', function () {
  it('should have specific properties', function () {
    expect(builder).toHaveProperty('store');
  });
  it('should have specific methods', function () {
    expect(builder).toHaveProperty('build');
  });
});
describe('PageBuilder build method', function () {
  it('should return an array of component instances', function () {
    var layout = builder.build(page);
    expect(Array.isArray(layout)).toBe(true);
    expect(layout.every(function (el) {
      return _react["default"].isValidElement(el);
    })).toBe(true);
  });
  it('should accept valid options', function () {});
});
describe('PageBuilder _buildComponent method', function () {
  it('should not render a not found component if passed in PageBuilder options', function () {
    builder = new _["default"](lib, {}, {
      renderInvalidComponent: false
    });
    expect(builder._renderInvalidComponent('foo')).toBeUndefined();
  });
  it('should render a not found component by default', function () {
    expect(_react["default"].isValidElement(builder._renderInvalidComponent('foo'))).toBe(true);
  });
});
describe('PageBuilder _getElement method', function () {
  it('should return a properly mapped component if a map is passed', function () {
    expect(builder._getElement({
      component: "span",
      settings: {}
    }).type.name).toEqual("Span");
  });
});
describe('PageBuilder _getProps method', function () {
  it('should remap properties according to template', function () {
    expect(builder._getProps({
      component: "Paragraph",
      settings: {
        "class": 'button'
      }
    })).toEqual({
      className: 'button'
    });
  });
  it('should build recursively children and fields starting with "_"', function () {
    expect(_react["default"].isValidElement(builder._getProps({
      component: "Banner",
      children: [{
        component: "Paragraph",
        settings: {}
      }],
      settings: {}
    }, map.Banner).children[0])).toBe(true);
    expect(builder._getProps({
      component: "Text",
      settings: {
        children: "Yay"
      }
    }).children).toEqual("Yay");
    expect(_react["default"].isValidElement(builder._getProps({
      component: "BannerWithModal",
      settings: {
        modal: [{
          component: "Paragraph",
          settings: {}
        }]
      }
    }).modal[0])).toEqual(true);
  });
});