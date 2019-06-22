"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = exports.flat = exports.isImage = exports.isRepeater = exports.isBuildable = exports.getStyleObject = exports.camelize = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/** Transforms a string in an camelCaseString 
 * @param {string} text String to be transformed
 * @param {string} separator Separator to be used in split
 * @returns {string} Camel case string
*/
var camelize = function camelize(text) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  var words = text.split(separator);
  var result = "";

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    result += i == 0 ? word : capitalizedWord;
  }

  return result;
};
/** Transforms a style string into an style object 
 * @param {string} str String to be transformed
 * @returns {object} Style object
*/


exports.camelize = camelize;

var getStyleObject = function getStyleObject(str) {
  if (!str) return null;
  return str.replace(/(\n|;$)/g, '').replace(/:\s/g, ':').split(';').reduce(function (obj, declaration) {
    var _declaration$split = declaration.split(':'),
        _declaration$split2 = _slicedToArray(_declaration$split, 2),
        key = _declaration$split2[0],
        val = _declaration$split2[1];

    obj[camelize(key)] = val;
    return obj;
  }, {});
};
/** Check if field has children to build
 * Uses a convention where any field started with "_" is buildable
 * @param {string} key Name of the field
 * @returns {boolean} Should build?
*/


exports.getStyleObject = getStyleObject;

var isBuildable = function isBuildable(object, key) {
  return key === "children" || Array.isArray(object[key]) && object[key].every(function (item) {
    return item.component;
  });
}; // Duck typing

/** Check if type of a field is Repeater
 * @param {object} field Field which type will be checked
 * @returns {boolean} Is it a repeater?
*/


exports.isBuildable = isBuildable;

var isRepeater = function isRepeater(field) {
  return Array.isArray(field) && field[0] && field[0].field && field[0].value;
};
/** Check if type of a field is Image 
 * @param {object} field Field which type will be checked
 * @returns {boolean} Is it an Image?
*/


exports.isRepeater = isRepeater;

var isImage = function isImage(field) {
  return field && !!field.image;
};
/** Array flat
 * @param {array} arr Multidimensional array to be flatted.
 * @returns {array} Single dimension array.
 */


exports.isImage = isImage;

var flat = function flat(arr) {
  return arr.reduce(function (acc, val) {
    return acc.concat(val);
  }, []);
};
/** Transforms an object based in a template object.
 * @param {object} data Source to be transformed
 * @param {object} template
 * @param {function} template.__starter A function that receives data object as
 * a param. Should return the initial object.
 * @param {function} template[key] A function that receives data object as a param.
 * Should return the new value.
 * @param {(string[]|function[])} template.__delete Array of strings or functions
 * containing every key to be deleted from final object. Deletes are executed
 * in builder object.
 * @param {ConditionedTransform[]} templates["*"] Array or rest of the arguments
 * containing conditions to be checked with every property. If condition is true,
 * template should be applied. Transforms are executed in builded object.
 * @param {function} ConditionedTransform.condition Function that receives
 * object and key of each property. Return boolean. If true, trigger transform.
 * @param {function} ConditionedTransform.transform Function that receives
 * object and key of each property. Return transformed value.
 * @returns {object} Transformed object.
 */


exports.flat = flat;

var transform = function transform(data) {
  for (var _len = arguments.length, templates = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    templates[_key - 1] = arguments[_key];
  }

  // Configuration objects
  var template = Object.assign.apply(Object, [{}].concat(_toConsumableArray(flat(templates))));
  console.log(data, template); // Operations

  var newObject;
  var customProps = Object.keys(template).filter(function (key) {
    return !['__delete', '__starter', '*'].some(function (prop) {
      return prop === key;
    });
  });

  if (template.__starter) {
    newObject = Object.assign({}, template.__starter(data));
  }

  newObject = Object.assign({}, newObject, customProps.reduce(function (prev, key) {
    return Object.assign(prev, _defineProperty({}, key, typeof template[key] === "function" ? template[key](data) : template[key]));
  }, {}));

  if (template["*"]) {
    Object.keys(newObject).map(function (key) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = template["*"][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var obj = _step.value;

          if (obj.condition(newObject, key)) {
            newObject[key] = obj.transform(newObject, key);
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
  }

  if (template.__delete) {
    Object.keys(newObject).map(function (key) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = template.__delete[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var condition = _step2.value;

          if (typeof condition === "function") {
            if (condition(newObject, key)) {
              delete newObject[key];
            }
          } else if (condition === key) delete newObject[key];
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    });
  }

  console.log(newObject);
  return newObject;
};

exports.transform = transform;