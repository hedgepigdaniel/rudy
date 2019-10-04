function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable react/prop-types,react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { matchUrl, urlToLocation } from '@respond-framework/rudy';
import { toUrlAndAction, handlePress, preventDefault } from './utils';
import { RudyConsumer } from './provider';

var LinkInner = function LinkInner(props) {
  var to = props.to,
      redirect = props.redirect,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'a' : _props$component,
      children = props.children,
      onPress = props.onPress,
      onClick = props.onClick,
      _props$down = props.down,
      down = _props$down === void 0 ? false : _props$down,
      _props$shouldDispatch = props.shouldDispatch,
      shouldDispatch = _props$shouldDispatch === void 0 ? true : _props$shouldDispatch,
      target = props.target,
      dispatch = props.dispatch,
      bn = props.basename,
      cp = props.currentPathname,
      api = props.api,
      routesAdded = props.routesAdded,
      u = props.url,
      isActive = props.isActive,
      partial = props.partial,
      strict = props.strict,
      query = props.query,
      hash = props.hash,
      activeStyle = props.activeStyle,
      activeClassName = props.activeClassName,
      ariaCurrent = props.ariaCurrent,
      p = _objectWithoutProperties(props, ["to", "redirect", "component", "children", "onPress", "onClick", "down", "shouldDispatch", "target", "dispatch", "basename", "currentPathname", "api", "routesAdded", "url", "isActive", "partial", "strict", "query", "hash", "activeStyle", "activeClassName", "ariaCurrent"]);

  var routes = api.routes,
      getLocation = api.getLocation,
      options = api.options,
      history = api.history;
  var curr = cp || getLocation().pathname; // for relative paths and incorrect actions (incorrect actions don't waste re-renderings and just get current pathname from context)

  var _toUrlAndAction = toUrlAndAction(to, routes, bn, curr, options),
      fullUrl = _toUrlAndAction.fullUrl,
      action = _toUrlAndAction.action;

  var hasHref = Component === 'a' || typeof Component !== 'string';
  var handler = handlePress.bind(null, action, api.routes, shouldDispatch, dispatch, onPress || onClick, target, redirect, fullUrl, history);
  return React.createElement(Component, _extends({
    onClick: !down && handler || preventDefault,
    href: hasHref ? fullUrl : undefined,
    onMouseDown: down ? handler : undefined,
    onTouchStart: down ? handler : undefined,
    target: target
  }, p, navLinkProps(props, fullUrl, action)), children);
};

var navLinkProps = function navLinkProps(props, toFullUrl, action) {
  if (!props.url) return undefined;
  var url = props.url,
      isActive = props.isActive,
      partial = props.partial,
      strict = props.strict,
      q = props.query,
      h = props.hash,
      style = props.style,
      className = props.className,
      activeStyle = props.activeStyle,
      _props$activeClassNam = props.activeClassName,
      activeClassName = _props$activeClassNam === void 0 ? '' : _props$activeClassNam,
      _props$ariaCurrent = props.ariaCurrent,
      ariaCurrent = _props$ariaCurrent === void 0 ? 'true' : _props$ariaCurrent,
      api = props.api;
  var getLocation = api.getLocation,
      options = api.options,
      routes = api.routes;

  var _urlToLocation = urlToLocation(toFullUrl),
      pathname = _urlToLocation.pathname,
      query = _urlToLocation.query,
      hash = _urlToLocation.hash;

  var matchers = {
    path: pathname,
    query: q && query,
    hash: h && hash
  };
  var opts = {
    partial: partial,
    strict: strict
  };
  var route = routes[action.type] || {};
  var match = matchUrl(url, matchers, opts, route, options);

  if (match) {
    Object.assign(match, action);
  }

  var active = !!(isActive ? isActive(match, getLocation()) : match);
  return {
    style: active ? _objectSpread({}, style, {}, activeStyle) : style,
    className: "".concat(className || '', " ").concat(active ? activeClassName : '').trim(),
    'aria-current': active && ariaCurrent
  };
};

var mapState = function mapState(state, _ref) {
  var api = _ref.api,
      props = _objectWithoutProperties(_ref, ["api"]);

  var _api$getLocation = api.getLocation(),
      url = _api$getLocation.url,
      pathname = _api$getLocation.pathname,
      bn = _api$getLocation.basename,
      routesAdded = _api$getLocation.routesAdded;

  var isNav = props.activeClassName || props.activeStyle; // only NavLinks re-render when the URL changes
  // We are very precise about what we want to cause re-renderings, as perf is
  // important! So only pass currentPathname if the user will in fact be making
  // use of it for relative paths.

  var currentPathname;

  if (typeof props.to === 'string' && props.to.charAt(0) !== '/') {
    currentPathname = pathname;
  }

  var basename = bn ? "/".concat(bn) : '';
  return {
    api: api,
    basename: basename,
    routesAdded: routesAdded,
    url: isNav && url,
    currentPathname: currentPathname
  };
};

var connector = connect(mapState);
var LinkConnected = connector(LinkInner);
export var Link = function Link(props) {
  return React.createElement(RudyConsumer, null, function (api) {
    return React.createElement(LinkConnected, _extends({
      api: api
    }, props));
  });
};
export var NavLink = function NavLink(_ref2) {
  var _ref2$activeClassName = _ref2.activeClassName,
      activeClassName = _ref2$activeClassName === void 0 ? 'active' : _ref2$activeClassName,
      props = _objectWithoutProperties(_ref2, ["activeClassName"]);

  return React.createElement(Link, _extends({
    activeClassName: activeClassName
  }, props));
};
//# sourceMappingURL=link.js.map