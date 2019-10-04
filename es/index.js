function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-env browser */
import ScrollBehavior from 'scroll-behavior';
export var ScrollRestorer = function ScrollRestorer(api) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, ScrollRestorer);

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

    return location.entries[location.index];
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
      _this.behavior.updateScroll(request);

      return next();
    };
  });

  _defineProperty(this, "updateScroll", function () {
    _this.behavior.updateScroll(_this.lastRequest);
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
    shouldUpdateScroll: function shouldUpdateScroll(request) {
      if (!_this.options.shouldUpdateScroll) {
        return true; // default behaviour
      }

      return _this.options.shouldUpdateScroll(request, undefined);
    }
  });
};
export default (function (options) {
  return function (api) {
    return new ScrollRestorer(api, options);
  };
});
//# sourceMappingURL=index.js.map