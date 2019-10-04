"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("@respond-framework/utils");

var _History2 = _interopRequireDefault(require("./History"));

var _utils2 = require("./utils");

var _utils3 = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MemoryHistory =
/*#__PURE__*/
function (_History) {
  _inherits(MemoryHistory, _History);

  function MemoryHistory() {
    _classCallCheck(this, MemoryHistory);

    return _possibleConstructorReturn(this, _getPrototypeOf(MemoryHistory).apply(this, arguments));
  }

  _createClass(MemoryHistory, [{
    key: "_restore",
    value: function _restore() {
      var opts = this.options;
      var i = opts.initialIndex,
          ents = opts.initialEntries,
          n = opts.initialN;
      var useSession = !(0, _utils.isServer)() && opts.testBrowser !== false;
      opts.restore = opts.restore || useSession && _utils2.restoreHistory;
      opts.save = opts.save || useSession && _utils2.saveHistory;
      return opts.restore ? opts.restore(this) : (0, _utils3.toEntries)(this, ents, i, n); // when used as a browser fallback, we restore from sessionStorage
    }
  }]);

  return MemoryHistory;
}(_History2.default);

exports.default = MemoryHistory;
//# sourceMappingURL=MemoryHistory.js.map