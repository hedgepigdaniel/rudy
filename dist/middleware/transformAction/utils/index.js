"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "formatAction", {
  enumerable: true,
  get: function get() {
    return _formatAction.default;
  }
});
Object.defineProperty(exports, "replacePopAction", {
  enumerable: true,
  get: function get() {
    return _replacePopAction.default;
  }
});
Object.defineProperty(exports, "findNeighboringN", {
  enumerable: true,
  get: function get() {
    return _replacePopAction.findNeighboringN;
  }
});

var _formatAction = _interopRequireDefault(require("./formatAction"));

var _replacePopAction = _interopRequireWildcard(require("./replacePopAction"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map