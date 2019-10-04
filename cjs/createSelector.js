"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
var _default = function _default(name, selector) {
  if (typeof selector === 'function') {
    return selector;
  }

  if (selector) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (state) {
      return state ? state[selector] : undefined;
    };
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any


  return function (state) {
    return state ? state[name] : undefined;
  };
};

exports.default = _default;
//# sourceMappingURL=createSelector.js.map