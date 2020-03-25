"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-env browser */
var _supportsSessionStorage;

var _default = function _default() {
  if (_supportsSessionStorage !== undefined) {
    return _supportsSessionStorage;
  }

  try {
    window.sessionStorage.setItem('rudytestitem', 'testvalue');

    if (window.sessionStorage.getItem('rudytestitem') === 'testvalue') {
      window.sessionStorage.removeItem('rudytestitem');
      _supportsSessionStorage = true;
    } else {
      _supportsSessionStorage = false;
    }
  } catch (_unused) {
    _supportsSessionStorage = false;
  }

  if (!_supportsSessionStorage) {
    // eslint-disable-next-line no-console
    console.warn('[rudy]: WARNING: This browser does not support sessionStorage!');
  }

  return _supportsSessionStorage;
};

exports.default = _default;
//# sourceMappingURL=supportsSessionStorage.js.map