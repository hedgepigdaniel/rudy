"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportsDom = void 0;

/* global window */
// eslint-disable-next-line import/prefer-default-export
var supportsDom = function supportsDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

exports.supportsDom = supportsDom;
//# sourceMappingURL=supports.js.map