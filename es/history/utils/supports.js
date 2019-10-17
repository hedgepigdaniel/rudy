/* global window */
// eslint-disable-next-line import/prefer-default-export
export var supportsDom = function supportsDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};
//# sourceMappingURL=supports.js.map