function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-env browser */
import ScrollBehavior, { ScrollPosition } from 'scroll-behavior';
export { ScrollPosition } from 'scroll-behavior';
export var RudyScrollRestorer = function RudyScrollRestorer(api) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, RudyScrollRestorer);

  _defineProperty(this, "options", void 0);

  _defineProperty(this, "behavior", void 0);

  _defineProperty(this, "lastRequest", void 0);

  _defineProperty(this, "api", void 0);

  _defineProperty(this, "transitionHooks", {});

  _defineProperty(this, "nextHookIndex", 0);

  _defineProperty(this, "makeStorageKey", function (entry, scrollBehaviorKey) {
    return "@@rudy-restore-scroll/".concat(entry ? "".concat(entry.location.key, "/") : "").concat(JSON.stringify(scrollBehaviorKey));
  });

  _defineProperty(this, "saveScrollPosition", function (entry, key, value) {
    window.sessionStorage.setItem(_this.makeStorageKey(entry, key), JSON.stringify(value));
  });

  _defineProperty(this, "readScrollPosition", function (entry, key) {
    var savedItem = window.sessionStorage.getItem(_this.makeStorageKey(entry, key));

    if (savedItem === null) {
      return null;
    }

    try {
      return JSON.parse(savedItem);
    } catch (_unused) {
      return null;
    }
  });

  _defineProperty(this, "getCurrentLocation", function () {
    var location = _this.api.getLocation();

    return _objectSpread({}, location.entries[location.index], {
      action: 'unknown'
    });
  });

  _defineProperty(this, "saveScroll", function () {
    return function (request, next) {
      _this.lastRequest = request;
      var action = request.action;

      if (!('location' in action && action.location.prev)) {
        // If there is no previous location, there is no position to save
        return next();
      }

      Object.keys(_this.transitionHooks).forEach(function (hookIndex) {
        _this.transitionHooks[hookIndex]();
      });
      return next();
    };
  });

  _defineProperty(this, "restoreScroll", function () {
    return function (request, next) {
      _this.behavior.updateScroll(null, request);

      return next();
    };
  });

  _defineProperty(this, "updateScroll", function () {
    if (_this.lastRequest) {
      _this.behavior.updateScroll(null, _this.lastRequest);
    }
  });

  this.api = api;
  this.options = options;
  this.behavior = new ScrollBehavior({
    addTransitionHook: function addTransitionHook(hook) {
      var hookIndex = _this.nextHookIndex;
      _this.nextHookIndex += 1;
      _this.transitionHooks[hookIndex] = hook;
      return function () {
        delete _this.transitionHooks[hookIndex];
      };
    },
    stateStorage: {
      save: this.saveScrollPosition,
      read: this.readScrollPosition
    },
    getCurrentLocation: function getCurrentLocation() {
      return _this.getCurrentLocation();
    },
    shouldUpdateScroll: function shouldUpdateScroll(_, request) {
      if (!_this.options.shouldUpdateScroll) {
        return true; // default behaviour
      }

      return _this.options.shouldUpdateScroll(request);
    }
  });
};
export default (function (options) {
  return function (api) {
    return new RudyScrollRestorer(api, options);
  };
});
//# sourceMappingURL=index.js.map