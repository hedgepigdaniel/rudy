"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../utils");

var _actions = require("../../actions");

var _index = require("./index");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(route, type, key, basename) {
  var subtypes = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var ac = typeof route[key] === 'function' ? route[key] : null; // look for action creators on route
  // `info` arg contains 'isThunk' or optional `path` for `notFound` action creators

  var defaultCreator = function defaultCreator(arg, info) {
    var _ref;

    // optionally handle action creators that return functions (aka `thunk`)
    if (typeof arg === 'function') {
      var thunk = arg;
      return function () {
        return defaultCreator(thunk.apply(void 0, arguments), 'isThunk');
      };
    } // do nothing if a `thunk` returned nothing (i.e. manually used `dispatch`)


    if (info === 'isThunk' && arg === undefined) return; // for good measure honor promises (`dispatch` will have manually been used)

    if (info === 'isThunk' && arg && arg.then) return arg; // use built-in `notFound` action creator if `NOT_FOUND` type

    if ((0, _utils.isNotFound)(type)) {
      var state = arg;
      var act = (0, _actions.notFound)(state, type);
      if (basename) act.basename = basename;
      return act;
    } // handle error action creator


    var t = arg && arg.type || type;
    if (key === 'error') return (0, _index.handleError)(arg, t, basename); // the default behavior of transforming an `arg` object into an action with its type

    if ((0, _utils.isAction)(arg)) return _objectSpread({
      type: type,
      basename: basename
    }, arg); // if no `payload`, `query`, etc, treat arg as a `params/payload` for convenience

    var name = subtypes.includes(key) || !route.path ? 'payload' : 'params'; // non-route-changing actions (eg: _COMPLETE) or pathless routes use `payload` key

    return _ref = {
      type: type
    }, _defineProperty(_ref, name, arg || {}), _defineProperty(_ref, "basename", basename), _ref;
  }; // optionally allow custom action creators


  if (ac) {
    return function () {
      return defaultCreator(ac.apply(void 0, arguments));
    };
  } // primary use case: generate an action creator (will only trigger last lines of `defaultCreator`)


  return defaultCreator;
};

exports.default = _default;
//# sourceMappingURL=makeActionCreator.js.map