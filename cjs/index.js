"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("@respond-framework/utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(options) {
  var _ref = options || {},
      keyOrSelector = _ref.title,
      _ref$isServer = _ref.isServer,
      isServer = _ref$isServer === void 0 ? _utils.isServer : _ref$isServer,
      _ref$createSelector = _ref.createSelector,
      createSelector = _ref$createSelector === void 0 ? _utils.createSelector : _ref$createSelector,
      _ref$setTitle = _ref.setTitle,
      setTitle = _ref$setTitle === void 0 ? function (title) {
    // eslint-disable-next-line no-undef
    window.document.title = title;
  } : _ref$setTitle;

  var selectTitleState = createSelector('title', keyOrSelector);
  return function (api) {
    return (
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(req, next) {
          var title;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  title = selectTitleState(api.getState());

                  if (!isServer() && typeof title === 'string') {
                    setTitle(title);
                  }

                  return _context.abrupt("return", next());

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }()
    );
  };
};

exports.default = _default;
//# sourceMappingURL=index.js.map