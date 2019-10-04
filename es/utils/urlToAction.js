function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import resolvePathname from 'resolve-pathname';
import { urlToLocation, locationToUrl, cleanBasename, matchUrl } from './index';
import { notFound } from '../actions';
export default (function (api, url) {
  var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : createKey();
  var getLocation = api.getLocation,
      routes = api.routes,
      opts = api.options;
  var curr = getLocation ? getLocation() : {};

  var _resolveBasename = resolveBasename(url, opts, state, curr),
      basename = _resolveBasename.basename,
      slashBasename = _resolveBasename.slashBasename;

  var location = createLocation(url, opts, slashBasename, curr);
  var action = createAction(location, routes, opts, state, curr);
  return _objectSpread({}, action, {
    // { type, params, query, state, hash }
    basename: basename,
    location: {
      key: key,
      scene: routes[action.type].scene || '',
      url: slashBasename + locationToUrl(location),
      pathname: location.pathname,
      search: location.search
    }
  });
});

var createLocation = function createLocation(url, opts, bn, curr) {
  if (!url) {
    url = curr.pathname || '/';
  } else if (curr.pathname && url.charAt(0) !== '/') {
    url = resolvePathname(url, curr.pathname); // resolve pathname relative to current location
  } else {
    url = stripBasename(url, bn); // eg: /base/foo?a=b#bar -> /foo?a=b#bar
  }

  return urlToLocation(url); // gets us: { pathname, search, hash } properly formatted
};

var createAction = function createAction(loc, routes, opts) {
  var st = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var curr = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var types = Object.keys(routes).filter(function (type) {
    return routes[type].path;
  });

  for (var i = 0; i < types.length; i++) {
    var _type = types[i];
    var route = routes[_type];
    var transformers = {
      formatParams: formatParams,
      formatQuery: formatQuery,
      formatHash: formatHash
    };
    var match = matchUrl(loc, route, transformers, route, opts);

    if (match) {
      var params = match.params,
          query = match.query,
          hash = match.hash;
      var state = formatState(st, route, opts);
      return {
        type: _type,
        params: params,
        query: query,
        hash: hash,
        state: state
      };
    }
  }

  var _ref = routes[curr.type] || {},
      scene = _ref.scene; // TODO: Need some clairfication on scene stuff
  // $FlowFixMe


  var type = routes["".concat(scene, "/NOT_FOUND")] && "".concat(scene, "/NOT_FOUND"); // try to interpret scene-level NOT_FOUND if available (note: links create plain NOT_FOUND actions)

  return _objectSpread({}, notFound(st, type), {
    params: {},
    // we can't know these in this case
    query: loc.search ? parseSearch(loc.search, routes, opts) : {},
    // keep this info
    hash: loc.hash || ''
  });
}; // EVERYTHING BELOW IS RELATED TO THE TRANSFORMERS PASSED TO `matchUrl`:


var formatParams = function formatParams(params, route, keys, opts) {
  var fromPath = route.fromPath || opts.fromPath || defaultFromPath;
  keys.forEach(function (_ref2) {
    var name = _ref2.name,
        repeat = _ref2.repeat,
        optional = _ref2.optional;

    if (!Object.prototype.hasOwnProperty.call(params, name)) {
      return;
    }

    var val = params[name]; // don't decode undefined values from optional params

    params[name] = fromPath(val, {
      name: name.toString(),
      repeat: repeat,
      optional: optional
    }, route, opts);

    if (params[name] === undefined) {
      // allow optional params to be overriden by defaultParams
      delete params[name];
    }
  });
  var def = route.defaultParams || opts.defaultParams;
  return def ? typeof def === 'function' ? def(params, route, opts) : _objectSpread({}, def, {}, params) : params;
};

var fromSegment = function fromSegment(val, convertNum, capitalize) {
  if (typeof val !== 'string') {
    // defensive
    throw TypeError('[rudy]: received invalid type from URL');
  }

  if (convertNum && isNumber(val)) {
    return Number.parseFloat(val);
  }

  if (capitalize) {
    // 'my-category' -> 'My Category'
    return val.replace(/-/g, ' ').replace(/\b\w/g, function (ltr) {
      return ltr.toUpperCase();
    });
  }

  return val;
};

export var defaultFromPath = function defaultFromPath(val, _ref3, route, opts) {
  var repeat = _ref3.repeat,
      optional = _ref3.optional;
  var convertNum = route.convertNumbers || opts.convertNumbers && route.convertNumbers !== false;
  var capitalize = route.capitalizedWords || opts.capitalizedWords && route.capitalizedWords !== false;

  if (repeat && (Array.isArray(val) || val === undefined)) {
    return val && val.length ? val.join('/') : undefined;
  }

  if (!repeat && optional && val === undefined) {
    return undefined;
  }

  if (typeof val === 'string') {
    return fromSegment(val, convertNum, capitalize);
  } // defensive


  throw TypeError("[rudy]: Received invalid param from URL");
};

var formatQuery = function formatQuery(query, route, opts) {
  // TODO: Is this fromPath ? its got the same props going into it?
  // $FlowFixMe
  var from = route.fromSearch || opts.fromSearch;

  if (from) {
    Object.keys(query).forEach(function (key) {
      query[key] = from(query[key], key, route, opts);

      if (query[key] === undefined) {
        // allow undefined values to be overridden by defaultQuery
        delete query[key];
      }
    });
  }

  var def = route.defaultQuery || opts.defaultQuery;
  return def ? typeof def === 'function' ? def(query, route, opts) : _objectSpread({}, def, {}, query) : query;
};

var formatHash = function formatHash(hash, route, opts) {
  // TODO: is this toHash?
  // $FlowFixMe
  var from = route.fromHash || opts.fromHash; // $FlowFixMe

  hash = from ? from(hash, route, opts) : hash;
  var def = route.defaultHash || opts.defaultHash;
  return def ? typeof def === 'function' ? def(hash, route, opts) : hash || def : hash;
};

var formatState = function formatState(state, route, opts) {
  var def = route.defaultState || opts.defaultState;
  return def ? typeof def === 'function' ? def(state, route, opts) : _objectSpread({}, def, {}, state) : state;
}; // state has no string counter part in the address bar, so there is no `fromState`


var isNumber = function isNumber(str) {
  return !Number.isNaN(Number.parseFloat(str));
};

var parseSearch = function parseSearch(search, routes, opts) {
  return (routes.NOT_FOUND.parseSearch || opts.parseSearch)(search);
}; // BASENAME HANDLING:


var resolveBasename = function resolveBasename(url, opts, state, curr) {
  // TODO: Whats going on with this huge option type?
  // $FlowFixMe
  var bn = state._emptyBn ? '' : findBasename(url, opts.basenames) || curr.basename;
  var slashBasename = cleanBasename(bn);
  var basename = slashBasename.replace(/^\//, ''); // eg: '/base' -> 'base'

  delete state._emptyBn; // not cool kyle

  return {
    basename: basename,
    slashBasename: slashBasename
  }; // { 'base', '/base' }
};

export var stripBasename = function stripBasename(path, bn) {
  return path.indexOf(bn) === 0 ? path.substr(bn.length) : path;
};
export var findBasename = function findBasename(path) {
  var bns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return bns.find(function (bn) {
    return path.indexOf(bn) === 0;
  });
}; // MISC

var createKey = function createKey() {
  if (process.env.NODE_ENV === 'test') {
    return '123456789'.toString(36).substr(2, 6);
  }

  return Math.random().toString(36).substr(2, 6);
};
//# sourceMappingURL=urlToAction.js.map