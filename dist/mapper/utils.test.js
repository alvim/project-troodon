"use strict";

var _utils = require("./utils");

describe('Flat function', function () {
  it('should flat multidimensional arrays', function () {
    expect((0, _utils.flat)([1, 2, [3, 4]])).toEqual([1, 2, 3, 4]);
  });
});
describe('Transform function', function () {
  it('should return an object from data according to default template', function () {
    expect((0, _utils.transform)({
      "component": "Button",
      "settings": {
        "class": "foo",
        "bar": undefined
      }
    }, {
      "__starter": function __starter(obj) {
        return obj.settings;
      },
      "className": function className(obj) {
        return obj.settings["class"];
      },
      "__delete": ["class", function (object, key) {
        return !object[key];
      }]
    })).toEqual({
      "className": "foo"
    });
    expect((0, _utils.transform)({
      "bar": {
        "image": "src-foo-bar",
        "path": "/src/foo/bar.jpg",
        "size": "200x200"
      }
    }, {
      "bar": function bar(object) {
        return object.bar.path;
      }
    })).toEqual({
      "bar": "/src/foo/bar.jpg"
    });
  });
});
describe('Camelize function', function () {
  it('transforms a string in Camel Case', function () {
    expect((0, _utils.camelize)('flex-direction')).toBe('flexDirection');
  });
});
describe('getStyleObject function', function () {
  it('returns a style object from a style string', function () {
    var str = "flex-direction: column;\nborder: 1px solid white;";
    expect((0, _utils.getStyleObject)(str)).toMatchObject({
      flexDirection: "column",
      border: "1px solid white"
    });
  });
  it('returns null if string is falsey', function () {
    expect((0, _utils.getStyleObject)("")).toBeNull();
  });
});