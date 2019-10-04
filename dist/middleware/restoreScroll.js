"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(api) {
  var scrollRestorer = api.scrollRestorer;

  if (scrollRestorer) {
    return scrollRestorer.restoreScroll(api);
  }

  return function (_, next) {
    return next();
  };
};

exports.default = _default;
//# sourceMappingURL=restoreScroll.js.map