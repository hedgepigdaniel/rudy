"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RudyConsumer = exports.RudyProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var RudyContext = (0, _react.createContext)('rudy-link');

var RudyProvider = function RudyProvider(_ref) {
  var api = _ref.api,
      children = _ref.children;
  return _react.default.createElement(RudyContext.Provider, {
    value: api
  }, children);
};

exports.RudyProvider = RudyProvider;
RudyProvider.propTypes = {
  children: _propTypes.default.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  api: _propTypes.default.object.isRequired
};
var RudyConsumer = RudyContext.Consumer;
exports.RudyConsumer = RudyConsumer;
//# sourceMappingURL=provider.js.map