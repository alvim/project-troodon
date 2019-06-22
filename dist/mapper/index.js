"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Responsible for automically building a React layout. */
var PageBuilder =
/*#__PURE__*/
function () {
  /**
   * Create a page builder.
   * @param {object} store Object containing all components to be used.
   * @param {object} map Object containing transforms to be used in each
   * component _getElement execution.
   * @param {object} options Object containing options.
   * @param {boolean} options.renderInvalidComponent Should render warning
   * when component is not found?
   */
  function PageBuilder(store) {
    var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, PageBuilder);

    var defaultOptions = {
      renderInvalidComponent: true
    };
    this.store = store;
    this.map = map;
    this.options = Object.assign({}, defaultOptions, options);
  }
  /** Build a component instance. Used iteratively in build method.
   * @param {object} data Contains name and settings of the component.
   * @param {number} index Index of iteration
   * @returns {React.Element}
   */


  _createClass(PageBuilder, [{
    key: "_buildComponent",
    value: function _buildComponent(data, index) {
      var _this$_getElement = this._getElement(data),
          type = _this$_getElement.type,
          props = _this$_getElement.props;

      if (type) return _react["default"].createElement(type, _objectSpread({}, props, {
        key: index
      }), props.children);else return this._renderInvalidComponent(data.component);
    }
    /** Get component name and props 
     * @param {object} data Object containing element settings.
     * @returns {object} Object containing type and props of the element.
    */

  }, {
    key: "_getElement",
    value: function _getElement(data) {
      var map = this.map[data.component] || {};
      var component = map.component || data.component;
      var type = this.store[component];
      if (!type) return {};

      var props = this._getProps(data, map);

      return {
        type: type,
        props: props
      };
    }
    /** Get element props from a settings object 
     * @param {object} settings Contains element settings.
     * @param {object} map Map for element properties transformation.
     * @returns {object} Props object.
    */

  }, {
    key: "_getProps",
    value: function _getProps(data, map) {
      var defaultMap = {
        __starter: function __starter(object) {
          return object.props;
        }
      };
      return (0, _utils.transform)(data, defaultMap, map);
    }
    /** Responsible for managing not found components rendering.
     * @param {string} name Name of the not found component.
     * @returns {React.Element|null}
     */

  }, {
    key: "_renderInvalidComponent",
    value: function _renderInvalidComponent(name) {
      console.warn("Page Builder couldn't find a component named \"".concat(name, "\"."));
      if (this.options.renderInvalidComponent) return _react["default"].createElement("span", null, "Invalid Component: ", name);
    }
    /** Builds a page based on a components store.
     * @param {array|React.Element} page Array containing page data. e.g. Cockpit layout.
     * @param {object} options - Overwrite any PageBuilder options.
     * @param {boolean} options.amp - Should the components load AMP version?
     * @returns {React.Element[]} Contains the page layout with elements.
     */

  }, {
    key: "build",
    value: function build(page, options) {
      if (Array.isArray(page)) return page.map(this._buildComponent, this);else return page;
    }
  }]);

  return PageBuilder;
}();

var _default = PageBuilder;
exports["default"] = _default;