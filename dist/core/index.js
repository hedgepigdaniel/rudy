"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createRouter", {
  enumerable: true,
  get: function get() {
    return _createRouter.default;
  }
});
Object.defineProperty(exports, "createRequest", {
  enumerable: true,
  get: function get() {
    return _createRequest.default;
  }
});
Object.defineProperty(exports, "createHistory", {
  enumerable: true,
  get: function get() {
    return _createHistory.default;
  }
});
Object.defineProperty(exports, "compose", {
  enumerable: true,
  get: function get() {
    return _compose.default;
  }
});
Object.defineProperty(exports, "createReducer", {
  enumerable: true,
  get: function get() {
    return _createReducer.default;
  }
});
Object.defineProperty(exports, "createInitialState", {
  enumerable: true,
  get: function get() {
    return _createReducer.createInitialState;
  }
});
Object.defineProperty(exports, "createPrev", {
  enumerable: true,
  get: function get() {
    return _createReducer.createPrev;
  }
});
Object.defineProperty(exports, "createPrevEmpty", {
  enumerable: true,
  get: function get() {
    return _createReducer.createPrevEmpty;
  }
});

var _createRouter = _interopRequireDefault(require("./createRouter"));

var _createRequest = _interopRequireDefault(require("./createRequest"));

var _createHistory = _interopRequireDefault(require("./createHistory"));

var _compose = _interopRequireDefault(require("./compose"));

var _createReducer = _interopRequireWildcard(require("./createReducer"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map