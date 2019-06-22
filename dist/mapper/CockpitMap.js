"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _this = void 0;

var defaultTemplate = {
  __starter: function __starter(object) {
    return object.settings;
  },
  className: function className(object) {
    return object.settings["class"];
  },
  style: function style(object) {
    return getStyleObject(object.settings.style);
  },
  "*": [{
    condition: function condition(object, key) {
      return isRepeater(object[key]);
    },
    transform: function transform(object, key) {
      return object[key].map(function (obj) {
        return obj.value;
      });
    }
  }, {
    condition: function condition(object, key) {
      return isImage(object[key]);
    },
    transform: function transform(object, key) {
      return object[key].path;
    }
  }, {
    condition: function condition(object, key) {
      return isBuildable(object, key);
    },
    transform: function transform(object, key) {
      return _this.build(object[key]);
    }
  }],
  __delete: ["class", "component", function (object, key) {
    return !object[key];
  }]
};
var defaultMap = {
  "Html": {
    "component": "RawHtml"
  },
  "Text": {
    "component": "RawHtml"
  },
  "Image": {
    "src": function src(object) {
      return object.settings.image;
    }
  },
  "Banner": {
    "children": function children(object) {
      return object.children;
    }
  },
  "Container": {
    "children": function children(object) {
      return object.children;
    }
  },
  "grid": {
    "component": "Grid",
    "children": function children(object) {
      return object.columns;
    }
  },
  "column": {
    "component": "Column",
    "children": function children(object) {
      return object.children;
    }
  },
  "Section": {
    "children": function children(object) {
      return object.children;
    }
  }
};
var _default = defaultMap;
exports["default"] = _default;