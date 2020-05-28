/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/algoliasearch/node_modules/debug/src/browser.js":
/*!**********************************************************************!*\
  !*** ./node_modules/algoliasearch/node_modules/debug/src/browser.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/algoliasearch/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/algoliasearch/node_modules/debug/src/debug.js":
/*!********************************************************************!*\
  !*** ./node_modules/algoliasearch/node_modules/debug/src/debug.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/algoliasearch/node_modules/ms/index.js");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/algoliasearch/node_modules/isarray/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/algoliasearch/node_modules/isarray/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/algoliasearch/node_modules/ms/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/node_modules/ms/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/AlgoliaSearchCore.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/AlgoliaSearchCore.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {module.exports = AlgoliaSearchCore;

var errors = __webpack_require__(/*! ./errors */ "./node_modules/algoliasearch/src/errors.js");
var exitPromise = __webpack_require__(/*! ./exitPromise.js */ "./node_modules/algoliasearch/src/exitPromise.js");
var IndexCore = __webpack_require__(/*! ./IndexCore.js */ "./node_modules/algoliasearch/src/IndexCore.js");
var store = __webpack_require__(/*! ./store.js */ "./node_modules/algoliasearch/src/store.js");

// We will always put the API KEY in the JSON body in case of too long API KEY,
// to avoid query string being too long and failing in various conditions (our server limit, browser limit,
// proxies limit)
var MAX_API_KEY_LENGTH = 500;
var RESET_APP_DATA_TIMER =
  process.env.RESET_APP_DATA_TIMER && parseInt(process.env.RESET_APP_DATA_TIMER, 10) ||
  60 * 2 * 1000; // after 2 minutes reset to first host

/*
 * Algolia Search library initialization
 * https://www.algolia.com/
 *
 * @param {string} applicationID - Your applicationID, found in your dashboard
 * @param {string} apiKey - Your API key, found in your dashboard
 * @param {Object} [opts]
 * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
 * another request will be issued after this timeout
 * @param {string} [opts.protocol='https:'] - The protocol used to query Algolia Search API.
 *                                        Set to 'http:' to force using http.
 * @param {Object|Array} [opts.hosts={
 *           read: [this.applicationID + '-dsn.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]),
 *           write: [this.applicationID + '.algolia.net'].concat([
 *             this.applicationID + '-1.algolianet.com',
 *             this.applicationID + '-2.algolianet.com',
 *             this.applicationID + '-3.algolianet.com']
 *           ]) - The hosts to use for Algolia Search API.
 *           If you provide them, you will less benefit from our HA implementation
 */
function AlgoliaSearchCore(applicationID, apiKey, opts) {
  var debug = __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js")('algoliasearch');

  var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';

  if (opts._allowEmptyCredentials !== true && !applicationID) {
    throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
  }

  if (opts._allowEmptyCredentials !== true && !apiKey) {
    throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
  }

  this.applicationID = applicationID;
  this.apiKey = apiKey;

  this.hosts = {
    read: [],
    write: []
  };

  opts = opts || {};

  this._timeouts = opts.timeouts || {
    connect: 1 * 1000, // 500ms connect is GPRS latency
    read: 2 * 1000,
    write: 30 * 1000
  };

  // backward compat, if opts.timeout is passed, we use it to configure all timeouts like before
  if (opts.timeout) {
    this._timeouts.connect = this._timeouts.read = this._timeouts.write = opts.timeout;
  }

  var protocol = opts.protocol || 'https:';
  // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
  // we also accept `http` and `https`. It's a common error.
  if (!/:$/.test(protocol)) {
    protocol = protocol + ':';
  }

  if (protocol !== 'http:' && protocol !== 'https:') {
    throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
  }

  this._checkAppIdData();

  if (!opts.hosts) {
    var defaultHosts = map(this._shuffleResult, function(hostNumber) {
      return applicationID + '-' + hostNumber + '.algolianet.com';
    });

    // no hosts given, compute defaults
    var mainSuffix = (opts.dsn === false ? '' : '-dsn') + '.algolia.net';
    this.hosts.read = [this.applicationID + mainSuffix].concat(defaultHosts);
    this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
  } else if (isArray(opts.hosts)) {
    // when passing custom hosts, we need to have a different host index if the number
    // of write/read hosts are different.
    this.hosts.read = clone(opts.hosts);
    this.hosts.write = clone(opts.hosts);
  } else {
    this.hosts.read = clone(opts.hosts.read);
    this.hosts.write = clone(opts.hosts.write);
  }

  // add protocol and lowercase hosts
  this.hosts.read = map(this.hosts.read, prepareHost(protocol));
  this.hosts.write = map(this.hosts.write, prepareHost(protocol));

  this.extraHeaders = {};

  // In some situations you might want to warm the cache
  this.cache = opts._cache || {};

  this._ua = opts._ua;
  this._useCache = opts._useCache === undefined || opts._cache ? true : opts._useCache;
  this._useRequestCache = this._useCache && opts._useRequestCache;
  this._useFallback = opts.useFallback === undefined ? true : opts.useFallback;

  this._setTimeout = opts._setTimeout;

  debug('init done, %j', this);
}

/*
 * Get the index object initialized
 *
 * @param indexName the name of index
 * @param callback the result callback with one argument (the Index instance)
 */
AlgoliaSearchCore.prototype.initIndex = function(indexName) {
  return new IndexCore(this, indexName);
};

/**
* Add an extra field to the HTTP request
*
* @param name the header field name
* @param value the header field value
*/
AlgoliaSearchCore.prototype.setExtraHeader = function(name, value) {
  this.extraHeaders[name.toLowerCase()] = value;
};

/**
* Get the value of an extra HTTP header
*
* @param name the header field name
*/
AlgoliaSearchCore.prototype.getExtraHeader = function(name) {
  return this.extraHeaders[name.toLowerCase()];
};

/**
* Remove an extra field from the HTTP request
*
* @param name the header field name
*/
AlgoliaSearchCore.prototype.unsetExtraHeader = function(name) {
  delete this.extraHeaders[name.toLowerCase()];
};

/**
* Augment sent x-algolia-agent with more data, each agent part
* is automatically separated from the others by a semicolon;
*
* @param algoliaAgent the agent to add
*/
AlgoliaSearchCore.prototype.addAlgoliaAgent = function(algoliaAgent) {
  var algoliaAgentWithDelimiter = '; ' + algoliaAgent;

  if (this._ua.indexOf(algoliaAgentWithDelimiter) === -1) {
    this._ua += algoliaAgentWithDelimiter;
  }
};

/*
 * Wrapper that try all hosts to maximize the quality of service
 */
AlgoliaSearchCore.prototype._jsonRequest = function(initialOpts) {
  this._checkAppIdData();

  var requestDebug = __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js")('algoliasearch:' + initialOpts.url);


  var body;
  var cacheID;
  var additionalUA = initialOpts.additionalUA || '';
  var cache = initialOpts.cache;
  var client = this;
  var tries = 0;
  var usingFallback = false;
  var hasFallback = client._useFallback && client._request.fallback && initialOpts.fallback;
  var headers;

  if (
    this.apiKey.length > MAX_API_KEY_LENGTH &&
    initialOpts.body !== undefined &&
    (initialOpts.body.params !== undefined || // index.search()
    initialOpts.body.requests !== undefined) // client.search()
  ) {
    initialOpts.body.apiKey = this.apiKey;
    headers = this._computeRequestHeaders({
      additionalUA: additionalUA,
      withApiKey: false,
      headers: initialOpts.headers
    });
  } else {
    headers = this._computeRequestHeaders({
      additionalUA: additionalUA,
      headers: initialOpts.headers
    });
  }

  if (initialOpts.body !== undefined) {
    body = safeJSONStringify(initialOpts.body);
  }

  requestDebug('request start');
  var debugData = [];


  function doRequest(requester, reqOpts) {
    client._checkAppIdData();

    var startTime = new Date();

    if (client._useCache && !client._useRequestCache) {
      cacheID = initialOpts.url;
    }

    // as we sometime use POST requests to pass parameters (like query='aa'),
    // the cacheID must also include the body to be different between calls
    if (client._useCache && !client._useRequestCache && body) {
      cacheID += '_body_' + reqOpts.body;
    }

    // handle cache existence
    if (isCacheValidWithCurrentID(!client._useRequestCache, cache, cacheID)) {
      requestDebug('serving response from cache');

      var responseText = cache[cacheID];

      // Cache response must match the type of the original one
      return client._promise.resolve({
        body: JSON.parse(responseText),
        responseText: responseText
      });
    }

    // if we reached max tries
    if (tries >= client.hosts[initialOpts.hostType].length) {
      if (!hasFallback || usingFallback) {
        requestDebug('could not get any response');
        // then stop
        return client._promise.reject(new errors.AlgoliaSearchError(
          'Cannot connect to the AlgoliaSearch API.' +
          ' Send an email to support@algolia.com to report and resolve the issue.' +
          ' Application id was: ' + client.applicationID, {debugData: debugData}
        ));
      }

      requestDebug('switching to fallback');

      // let's try the fallback starting from here
      tries = 0;

      // method, url and body are fallback dependent
      reqOpts.method = initialOpts.fallback.method;
      reqOpts.url = initialOpts.fallback.url;
      reqOpts.jsonBody = initialOpts.fallback.body;
      if (reqOpts.jsonBody) {
        reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
      }
      // re-compute headers, they could be omitting the API KEY
      headers = client._computeRequestHeaders({
        additionalUA: additionalUA,
        headers: initialOpts.headers
      });

      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
      client._setHostIndexByType(0, initialOpts.hostType);
      usingFallback = true; // the current request is now using fallback
      return doRequest(client._request.fallback, reqOpts);
    }

    var currentHost = client._getHostByType(initialOpts.hostType);

    var url = currentHost + reqOpts.url;
    var options = {
      body: reqOpts.body,
      jsonBody: reqOpts.jsonBody,
      method: reqOpts.method,
      headers: headers,
      timeouts: reqOpts.timeouts,
      debug: requestDebug,
      forceAuthHeaders: reqOpts.forceAuthHeaders
    };

    requestDebug('method: %s, url: %s, headers: %j, timeouts: %d',
      options.method, url, options.headers, options.timeouts);

    if (requester === client._request.fallback) {
      requestDebug('using fallback');
    }

    // `requester` is any of this._request or this._request.fallback
    // thus it needs to be called using the client as context
    return requester.call(client, url, options).then(success, tryFallback);

    function success(httpResponse) {
      // compute the status of the response,
      //
      // When in browser mode, using XDR or JSONP, we have no statusCode available
      // So we rely on our API response `status` property.
      // But `waitTask` can set a `status` property which is not the statusCode (it's the task status)
      // So we check if there's a `message` along `status` and it means it's an error
      //
      // That's the only case where we have a response.status that's not the http statusCode
      var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status ||

        // this is important to check the request statusCode AFTER the body eventual
        // statusCode because some implementations (jQuery XDomainRequest transport) may
        // send statusCode 200 while we had an error
        httpResponse.statusCode ||

        // When in browser mode, using XDR or JSONP
        // we default to success when no error (no response.status && response.message)
        // If there was a JSON.parse() error then body is null and it fails
        httpResponse && httpResponse.body && 200;

      requestDebug('received response: statusCode: %s, computed statusCode: %d, headers: %j',
        httpResponse.statusCode, status, httpResponse.headers);

      var httpResponseOk = Math.floor(status / 100) === 2;

      var endTime = new Date();
      debugData.push({
        currentHost: currentHost,
        headers: removeCredentials(headers),
        content: body || null,
        contentLength: body !== undefined ? body.length : null,
        method: reqOpts.method,
        timeouts: reqOpts.timeouts,
        url: reqOpts.url,
        startTime: startTime,
        endTime: endTime,
        duration: endTime - startTime,
        statusCode: status
      });

      if (httpResponseOk) {
        if (client._useCache && !client._useRequestCache && cache) {
          cache[cacheID] = httpResponse.responseText;
        }

        return {
          responseText: httpResponse.responseText,
          body: httpResponse.body
        };
      }

      var shouldRetry = Math.floor(status / 100) !== 4;

      if (shouldRetry) {
        tries += 1;
        return retryRequest();
      }

      requestDebug('unrecoverable error');

      // no success and no retry => fail
      var unrecoverableError = new errors.AlgoliaSearchError(
        httpResponse.body && httpResponse.body.message, {debugData: debugData, statusCode: status}
      );

      return client._promise.reject(unrecoverableError);
    }

    function tryFallback(err) {
      // error cases:
      //  While not in fallback mode:
      //    - CORS not supported
      //    - network error
      //  While in fallback mode:
      //    - timeout
      //    - network error
      //    - badly formatted JSONP (script loaded, did not call our callback)
      //  In both cases:
      //    - uncaught exception occurs (TypeError)
      requestDebug('error: %s, stack: %s', err.message, err.stack);

      var endTime = new Date();
      debugData.push({
        currentHost: currentHost,
        headers: removeCredentials(headers),
        content: body || null,
        contentLength: body !== undefined ? body.length : null,
        method: reqOpts.method,
        timeouts: reqOpts.timeouts,
        url: reqOpts.url,
        startTime: startTime,
        endTime: endTime,
        duration: endTime - startTime
      });

      if (!(err instanceof errors.AlgoliaSearchError)) {
        err = new errors.Unknown(err && err.message, err);
      }

      tries += 1;

      // stop the request implementation when:
      if (
        // we did not generate this error,
        // it comes from a throw in some other piece of code
        err instanceof errors.Unknown ||

        // server sent unparsable JSON
        err instanceof errors.UnparsableJSON ||

        // max tries and already using fallback or no fallback
        tries >= client.hosts[initialOpts.hostType].length &&
        (usingFallback || !hasFallback)) {
        // stop request implementation for this command
        err.debugData = debugData;
        return client._promise.reject(err);
      }

      // When a timeout occurred, retry by raising timeout
      if (err instanceof errors.RequestTimeout) {
        return retryRequestWithHigherTimeout();
      }

      return retryRequest();
    }

    function retryRequest() {
      requestDebug('retrying request');
      client._incrementHostIndex(initialOpts.hostType);
      return doRequest(requester, reqOpts);
    }

    function retryRequestWithHigherTimeout() {
      requestDebug('retrying request with higher timeout');
      client._incrementHostIndex(initialOpts.hostType);
      client._incrementTimeoutMultipler();
      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
      return doRequest(requester, reqOpts);
    }
  }

  function isCacheValidWithCurrentID(
    useRequestCache,
    currentCache,
    currentCacheID
  ) {
    return (
      client._useCache &&
      useRequestCache &&
      currentCache &&
      currentCache[currentCacheID] !== undefined
    );
  }


  function interopCallbackReturn(request, callback) {
    if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
      request.catch(function() {
        // Release the cache on error
        delete cache[cacheID];
      });
    }

    if (typeof initialOpts.callback === 'function') {
      // either we have a callback
      request.then(function okCb(content) {
        exitPromise(function() {
          initialOpts.callback(null, callback(content));
        }, client._setTimeout || setTimeout);
      }, function nookCb(err) {
        exitPromise(function() {
          initialOpts.callback(err);
        }, client._setTimeout || setTimeout);
      });
    } else {
      // either we are using promises
      return request.then(callback);
    }
  }

  if (client._useCache && client._useRequestCache) {
    cacheID = initialOpts.url;
  }

  // as we sometime use POST requests to pass parameters (like query='aa'),
  // the cacheID must also include the body to be different between calls
  if (client._useCache && client._useRequestCache && body) {
    cacheID += '_body_' + body;
  }

  if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
    requestDebug('serving request from cache');

    var maybePromiseForCache = cache[cacheID];

    // In case the cache is warmup with value that is not a promise
    var promiseForCache = typeof maybePromiseForCache.then !== 'function'
      ? client._promise.resolve({responseText: maybePromiseForCache})
      : maybePromiseForCache;

    return interopCallbackReturn(promiseForCache, function(content) {
      // In case of the cache request, return the original value
      return JSON.parse(content.responseText);
    });
  }

  var request = doRequest(
    client._request, {
      url: initialOpts.url,
      method: initialOpts.method,
      body: body,
      jsonBody: initialOpts.body,
      timeouts: client._getTimeoutsForRequest(initialOpts.hostType),
      forceAuthHeaders: initialOpts.forceAuthHeaders
    }
  );

  if (client._useCache && client._useRequestCache && cache) {
    cache[cacheID] = request;
  }

  return interopCallbackReturn(request, function(content) {
    // In case of the first request, return the JSON value
    return content.body;
  });
};

/*
* Transform search param object in query string
* @param {object} args arguments to add to the current query string
* @param {string} params current query string
* @return {string} the final query string
*/
AlgoliaSearchCore.prototype._getSearchParams = function(args, params) {
  if (args === undefined || args === null) {
    return params;
  }
  for (var key in args) {
    if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
      params += params === '' ? '' : '&';
      params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
    }
  }
  return params;
};

/**
 * Compute the headers for a request
 *
 * @param [string] options.additionalUA semi-colon separated string with other user agents to add
 * @param [boolean=true] options.withApiKey Send the api key as a header
 * @param [Object] options.headers Extra headers to send
 */
AlgoliaSearchCore.prototype._computeRequestHeaders = function(options) {
  var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

  var ua = options.additionalUA ?
    this._ua + '; ' + options.additionalUA :
    this._ua;

  var requestHeaders = {
    'x-algolia-agent': ua,
    'x-algolia-application-id': this.applicationID
  };

  // browser will inline headers in the url, node.js will use http headers
  // but in some situations, the API KEY will be too long (big secured API keys)
  // so if the request is a POST and the KEY is very long, we will be asked to not put
  // it into headers but in the JSON body
  if (options.withApiKey !== false) {
    requestHeaders['x-algolia-api-key'] = this.apiKey;
  }

  if (this.userToken) {
    requestHeaders['x-algolia-usertoken'] = this.userToken;
  }

  if (this.securityTags) {
    requestHeaders['x-algolia-tagfilters'] = this.securityTags;
  }

  forEach(this.extraHeaders, function addToRequestHeaders(value, key) {
    requestHeaders[key] = value;
  });

  if (options.headers) {
    forEach(options.headers, function addToRequestHeaders(value, key) {
      requestHeaders[key] = value;
    });
  }

  return requestHeaders;
};

/**
 * Search through multiple indices at the same time
 * @param  {Object[]}   queries  An array of queries you want to run.
 * @param {string} queries[].indexName The index name you want to target
 * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
 * @param {Object} queries[].params Any search param like hitsPerPage, ..
 * @param  {Function} callback Callback to be called
 * @return {Promise|undefined} Returns a promise if no callback given
 */
AlgoliaSearchCore.prototype.search = function(queries, opts, callback) {
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: client.search(arrayOfQueries[, callback])';

  if (!isArray(queries)) {
    throw new Error(usage);
  }

  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  } else if (opts === undefined) {
    opts = {};
  }

  var client = this;

  var postObj = {
    requests: map(queries, function prepareRequest(query) {
      var params = '';

      // allow query.query
      // so we are mimicing the index.search(query, params) method
      // {indexName:, query:, params:}
      if (query.query !== undefined) {
        params += 'query=' + encodeURIComponent(query.query);
      }

      return {
        indexName: query.indexName,
        params: client._getSearchParams(query.params, params)
      };
    })
  };

  var JSONPParams = map(postObj.requests, function prepareJSONPParams(request, requestId) {
    return requestId + '=' +
      encodeURIComponent(
        '/1/indexes/' + encodeURIComponent(request.indexName) + '?' +
        request.params
      );
  }).join('&');

  var url = '/1/indexes/*/queries';

  if (opts.strategy !== undefined) {
    postObj.strategy = opts.strategy;
  }

  return this._jsonRequest({
    cache: this.cache,
    method: 'POST',
    url: url,
    body: postObj,
    hostType: 'read',
    fallback: {
      method: 'GET',
      url: '/1/indexes/*',
      body: {
        params: JSONPParams
      }
    },
    callback: callback
  });
};

/**
* Search for facet values
* https://www.algolia.com/doc/rest-api/search#search-for-facet-values
* This is the top-level API for SFFV.
*
* @param {object[]} queries An array of queries to run.
* @param {string} queries[].indexName Index name, name of the index to search.
* @param {object} queries[].params Query parameters.
* @param {string} queries[].params.facetName Facet name, name of the attribute to search for values in.
* Must be declared as a facet
* @param {string} queries[].params.facetQuery Query for the facet search
* @param {string} [queries[].params.*] Any search parameter of Algolia,
* see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
* Pagination is not supported. The page and hitsPerPage parameters will be ignored.
*/
AlgoliaSearchCore.prototype.searchForFacetValues = function(queries) {
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: client.searchForFacetValues([{indexName, params: {facetName, facetQuery, ...params}}, ...queries])'; // eslint-disable-line max-len

  if (!isArray(queries)) {
    throw new Error(usage);
  }

  var client = this;

  return client._promise.all(map(queries, function performQuery(query) {
    if (
      !query ||
      query.indexName === undefined ||
      query.params.facetName === undefined ||
      query.params.facetQuery === undefined
    ) {
      throw new Error(usage);
    }

    var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
    var omit = __webpack_require__(/*! ./omit.js */ "./node_modules/algoliasearch/src/omit.js");

    var indexName = query.indexName;
    var params = query.params;

    var facetName = params.facetName;
    var filteredParams = omit(clone(params), function(keyName) {
      return keyName === 'facetName';
    });
    var searchParameters = client._getSearchParams(filteredParams, '');

    return client._jsonRequest({
      cache: client.cache,
      method: 'POST',
      url:
        '/1/indexes/' +
        encodeURIComponent(indexName) +
        '/facets/' +
        encodeURIComponent(facetName) +
        '/query',
      hostType: 'read',
      body: {params: searchParameters}
    });
  }));
};

/**
 * Set the extra security tagFilters header
 * @param {string|array} tags The list of tags defining the current security filters
 */
AlgoliaSearchCore.prototype.setSecurityTags = function(tags) {
  if (Object.prototype.toString.call(tags) === '[object Array]') {
    var strTags = [];
    for (var i = 0; i < tags.length; ++i) {
      if (Object.prototype.toString.call(tags[i]) === '[object Array]') {
        var oredTags = [];
        for (var j = 0; j < tags[i].length; ++j) {
          oredTags.push(tags[i][j]);
        }
        strTags.push('(' + oredTags.join(',') + ')');
      } else {
        strTags.push(tags[i]);
      }
    }
    tags = strTags.join(',');
  }

  this.securityTags = tags;
};

/**
 * Set the extra user token header
 * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
 */
AlgoliaSearchCore.prototype.setUserToken = function(userToken) {
  this.userToken = userToken;
};

/**
 * Clear all queries in client's cache
 * @return undefined
 */
AlgoliaSearchCore.prototype.clearCache = function() {
  this.cache = {};
};

/**
* Set the number of milliseconds a request can take before automatically being terminated.
* @deprecated
* @param {Number} milliseconds
*/
AlgoliaSearchCore.prototype.setRequestTimeout = function(milliseconds) {
  if (milliseconds) {
    this._timeouts.connect = this._timeouts.read = this._timeouts.write = milliseconds;
  }
};

/**
* Set the three different (connect, read, write) timeouts to be used when requesting
* @param {Object} timeouts
*/
AlgoliaSearchCore.prototype.setTimeouts = function(timeouts) {
  this._timeouts = timeouts;
};

/**
* Get the three different (connect, read, write) timeouts to be used when requesting
* @param {Object} timeouts
*/
AlgoliaSearchCore.prototype.getTimeouts = function() {
  return this._timeouts;
};

AlgoliaSearchCore.prototype._getAppIdData = function() {
  var data = store.get(this.applicationID);
  if (data !== null) this._cacheAppIdData(data);
  return data;
};

AlgoliaSearchCore.prototype._setAppIdData = function(data) {
  data.lastChange = (new Date()).getTime();
  this._cacheAppIdData(data);
  return store.set(this.applicationID, data);
};

AlgoliaSearchCore.prototype._checkAppIdData = function() {
  var data = this._getAppIdData();
  var now = (new Date()).getTime();
  if (data === null || now - data.lastChange > RESET_APP_DATA_TIMER) {
    return this._resetInitialAppIdData(data);
  }

  return data;
};

AlgoliaSearchCore.prototype._resetInitialAppIdData = function(data) {
  var newData = data || {};
  newData.hostIndexes = {read: 0, write: 0};
  newData.timeoutMultiplier = 1;
  newData.shuffleResult = newData.shuffleResult || shuffle([1, 2, 3]);
  return this._setAppIdData(newData);
};

AlgoliaSearchCore.prototype._cacheAppIdData = function(data) {
  this._hostIndexes = data.hostIndexes;
  this._timeoutMultiplier = data.timeoutMultiplier;
  this._shuffleResult = data.shuffleResult;
};

AlgoliaSearchCore.prototype._partialAppIdDataUpdate = function(newData) {
  var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");
  var currentData = this._getAppIdData();
  foreach(newData, function(value, key) {
    currentData[key] = value;
  });

  return this._setAppIdData(currentData);
};

AlgoliaSearchCore.prototype._getHostByType = function(hostType) {
  return this.hosts[hostType][this._getHostIndexByType(hostType)];
};

AlgoliaSearchCore.prototype._getTimeoutMultiplier = function() {
  return this._timeoutMultiplier;
};

AlgoliaSearchCore.prototype._getHostIndexByType = function(hostType) {
  return this._hostIndexes[hostType];
};

AlgoliaSearchCore.prototype._setHostIndexByType = function(hostIndex, hostType) {
  var clone = __webpack_require__(/*! ./clone */ "./node_modules/algoliasearch/src/clone.js");
  var newHostIndexes = clone(this._hostIndexes);
  newHostIndexes[hostType] = hostIndex;
  this._partialAppIdDataUpdate({hostIndexes: newHostIndexes});
  return hostIndex;
};

AlgoliaSearchCore.prototype._incrementHostIndex = function(hostType) {
  return this._setHostIndexByType(
    (this._getHostIndexByType(hostType) + 1) % this.hosts[hostType].length, hostType
  );
};

AlgoliaSearchCore.prototype._incrementTimeoutMultipler = function() {
  var timeoutMultiplier = Math.max(this._timeoutMultiplier + 1, 4);
  return this._partialAppIdDataUpdate({timeoutMultiplier: timeoutMultiplier});
};

AlgoliaSearchCore.prototype._getTimeoutsForRequest = function(hostType) {
  return {
    connect: this._timeouts.connect * this._timeoutMultiplier,
    complete: this._timeouts[hostType] * this._timeoutMultiplier
  };
};

function prepareHost(protocol) {
  return function prepare(host) {
    return protocol + '//' + host.toLowerCase();
  };
}

// Prototype.js < 1.7, a widely used library, defines a weird
// Array.prototype.toJSON function that will fail to stringify our content
// appropriately
// refs:
//   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
//   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
//   - http://stackoverflow.com/a/3148441/147079
function safeJSONStringify(obj) {
  /* eslint no-extend-native:0 */

  if (Array.prototype.toJSON === undefined) {
    return JSON.stringify(obj);
  }

  var toJSON = Array.prototype.toJSON;
  delete Array.prototype.toJSON;
  var out = JSON.stringify(obj);
  Array.prototype.toJSON = toJSON;

  return out;
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function removeCredentials(headers) {
  var newHeaders = {};

  for (var headerName in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, headerName)) {
      var value;

      if (headerName === 'x-algolia-api-key' || headerName === 'x-algolia-application-id') {
        value = '**hidden for security purposes**';
      } else {
        value = headers[headerName];
      }

      newHeaders[headerName] = value;
    }
  }

  return newHeaders;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/algoliasearch/src/IndexCore.js":
/*!*****************************************************!*\
  !*** ./node_modules/algoliasearch/src/IndexCore.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var buildSearchMethod = __webpack_require__(/*! ./buildSearchMethod.js */ "./node_modules/algoliasearch/src/buildSearchMethod.js");
var deprecate = __webpack_require__(/*! ./deprecate.js */ "./node_modules/algoliasearch/src/deprecate.js");
var deprecatedMessage = __webpack_require__(/*! ./deprecatedMessage.js */ "./node_modules/algoliasearch/src/deprecatedMessage.js");

module.exports = IndexCore;

/*
* Index class constructor.
* You should not use this method directly but use initIndex() function
*/
function IndexCore(algoliasearch, indexName) {
  this.indexName = indexName;
  this.as = algoliasearch;
  this.typeAheadArgs = null;
  this.typeAheadValueOption = null;

  // make sure every index instance has it's own cache
  this.cache = {};
}

/*
* Clear all queries in cache
*/
IndexCore.prototype.clearCache = function() {
  this.cache = {};
};

/*
* Search inside the index using XMLHttpRequest request (Using a POST query to
* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
*
* @param {string} [query] the full text query
* @param {object} [args] (optional) if set, contains an object with query parameters:
* - page: (integer) Pagination parameter used to select the page to retrieve.
*                   Page is zero-based and defaults to 0. Thus,
*                   to retrieve the 10th page you need to set page=9
* - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
* - attributesToRetrieve: a string that contains the list of object attributes
* you want to retrieve (let you minimize the answer size).
*   Attributes are separated with a comma (for example "name,address").
*   You can also use an array (for example ["name","address"]).
*   By default, all attributes are retrieved. You can also use '*' to retrieve all
*   values when an attributesToRetrieve setting is specified for your index.
* - attributesToHighlight: a string that contains the list of attributes you
*   want to highlight according to the query.
*   Attributes are separated by a comma. You can also use an array (for example ["name","address"]).
*   If an attribute has no match for the query, the raw value is returned.
*   By default all indexed text attributes are highlighted.
*   You can use `*` if you want to highlight all textual attributes.
*   Numerical attributes are not highlighted.
*   A matchLevel is returned for each highlighted attribute and can contain:
*      - full: if all the query terms were found in the attribute,
*      - partial: if only some of the query terms were found,
*      - none: if none of the query terms were found.
* - attributesToSnippet: a string that contains the list of attributes to snippet alongside
* the number of words to return (syntax is `attributeName:nbWords`).
*    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
*    You can also use an array (Example: attributesToSnippet: ['name:10','content:10']).
*    By default no snippet is computed.
* - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word.
* Defaults to 3.
* - minWordSizefor2Typos: the minimum number of characters in a query word
* to accept two typos in this word. Defaults to 7.
* - getRankingInfo: if set to 1, the result hits will contain ranking
* information in _rankingInfo attribute.
* - aroundLatLng: search for entries around a given
* latitude/longitude (specified as two floats separated by a comma).
*   For example aroundLatLng=47.316669,5.016670).
*   You can specify the maximum distance in meters with the aroundRadius parameter (in meters)
*   and the precision for ranking with aroundPrecision
*   (for example if you set aroundPrecision=100, two objects that are distant of
*   less than 100m will be considered as identical for "geo" ranking parameter).
*   At indexing, you should specify geoloc of an object with the _geoloc attribute
*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
* - insideBoundingBox: search entries inside a given area defined by the two extreme points
* of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
*   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
*   At indexing, you should specify geoloc of an object with the _geoloc attribute
*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
* - numericFilters: a string that contains the list of numeric filters you want to
* apply separated by a comma.
*   The syntax of one filter is `attributeName` followed by `operand` followed by `value`.
*   Supported operands are `<`, `<=`, `=`, `>` and `>=`.
*   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
*   You can also use an array (for example numericFilters: ["price>100","price<1000"]).
* - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
*   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
*   You can also use an array, for example tagFilters: ["tag1",["tag2","tag3"]]
*   means tag1 AND (tag2 OR tag3).
*   At indexing, tags should be added in the _tags** attribute
*   of objects (for example {"_tags":["tag1","tag2"]}).
* - facetFilters: filter the query by a list of facets.
*   Facets are separated by commas and each facet is encoded as `attributeName:value`.
*   For example: `facetFilters=category:Book,author:John%20Doe`.
*   You can also use an array (for example `["category:Book","author:John%20Doe"]`).
* - facets: List of object attributes that you want to use for faceting.
*   Comma separated list: `"category,author"` or array `['category','author']`
*   Only attributes that have been added in **attributesForFaceting** index setting
*   can be used in this parameter.
*   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
* - queryType: select how the query words are interpreted, it can be one of the following value:
*    - prefixAll: all query words are interpreted as prefixes,
*    - prefixLast: only the last word is interpreted as a prefix (default behavior),
*    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
* - optionalWords: a string that contains the list of words that should
* be considered as optional when found in the query.
*   Comma separated and array are accepted.
* - distinct: If set to 1, enable the distinct feature (disabled by default)
* if the attributeForDistinct index setting is set.
*   This feature is similar to the SQL "distinct" keyword: when enabled
*   in a query with the distinct=1 parameter,
*   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
*   For example, if the chosen attribute is show_name and several hits have
*   the same value for show_name, then only the best
*   one is kept and others are removed.
* - restrictSearchableAttributes: List of attributes you want to use for
* textual search (must be a subset of the attributesToIndex index setting)
* either comma separated or as an array
* @param {function} [callback] the result callback called with two arguments:
*  error: null or Error('message'). If false, the content contains the error.
*  content: the server answer that contains the list of results.
*/
IndexCore.prototype.search = buildSearchMethod('query');

/*
* -- BETA --
* Search a record similar to the query inside the index using XMLHttpRequest request (Using a POST query to
* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
*
* @param {string} [query] the similar query
* @param {object} [args] (optional) if set, contains an object with query parameters.
*   All search parameters are supported (see search function), restrictSearchableAttributes and facetFilters
*   are the two most useful to restrict the similar results and get more relevant content
*/
IndexCore.prototype.similarSearch = deprecate(
  buildSearchMethod('similarQuery'),
  deprecatedMessage(
    'index.similarSearch(query[, callback])',
    'index.search({ similarQuery: query }[, callback])'
  )
);

/*
* Browse index content. The response content will have a `cursor` property that you can use
* to browse subsequent pages for this query. Use `index.browseFrom(cursor)` when you want.
*
* @param {string} query - The full text query
* @param {Object} [queryParameters] - Any search query parameter
* @param {Function} [callback] - The result callback called with two arguments
*   error: null or Error('message')
*   content: the server answer with the browse result
* @return {Promise|undefined} Returns a promise if no callback given
* @example
* index.browse('cool songs', {
*   tagFilters: 'public,comments',
*   hitsPerPage: 500
* }, callback);
* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
*/
IndexCore.prototype.browse = function(query, queryParameters, callback) {
  var merge = __webpack_require__(/*! ./merge.js */ "./node_modules/algoliasearch/src/merge.js");

  var indexObj = this;

  var page;
  var hitsPerPage;

  // we check variadic calls that are not the one defined
  // .browse()/.browse(fn)
  // => page = 0
  if (arguments.length === 0 || arguments.length === 1 && typeof arguments[0] === 'function') {
    page = 0;
    callback = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'number') {
    // .browse(2)/.browse(2, 10)/.browse(2, fn)/.browse(2, 10, fn)
    page = arguments[0];
    if (typeof arguments[1] === 'number') {
      hitsPerPage = arguments[1];
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
      hitsPerPage = undefined;
    }
    query = undefined;
    queryParameters = undefined;
  } else if (typeof arguments[0] === 'object') {
    // .browse(queryParameters)/.browse(queryParameters, cb)
    if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }
    queryParameters = arguments[0];
    query = undefined;
  } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
    // .browse(query, cb)
    callback = arguments[1];
    queryParameters = undefined;
  }

  // otherwise it's a .browse(query)/.browse(query, queryParameters)/.browse(query, queryParameters, cb)

  // get search query parameters combining various possible calls
  // to .browse();
  queryParameters = merge({}, queryParameters || {}, {
    page: page,
    hitsPerPage: hitsPerPage,
    query: query
  });

  var params = this.as._getSearchParams(queryParameters, '');

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse',
    body: {params: params},
    hostType: 'read',
    callback: callback
  });
};

/*
* Continue browsing from a previous position (cursor), obtained via a call to `.browse()`.
*
* @param {string} query - The full text query
* @param {Object} [queryParameters] - Any search query parameter
* @param {Function} [callback] - The result callback called with two arguments
*   error: null or Error('message')
*   content: the server answer with the browse result
* @return {Promise|undefined} Returns a promise if no callback given
* @example
* index.browseFrom('14lkfsakl32', callback);
* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
*/
IndexCore.prototype.browseFrom = function(cursor, callback) {
  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse',
    body: {cursor: cursor},
    hostType: 'read',
    callback: callback
  });
};

/*
* Search for facet values
* https://www.algolia.com/doc/rest-api/search#search-for-facet-values
*
* @param {string} params.facetName Facet name, name of the attribute to search for values in.
* Must be declared as a facet
* @param {string} params.facetQuery Query for the facet search
* @param {string} [params.*] Any search parameter of Algolia,
* see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
* Pagination is not supported. The page and hitsPerPage parameters will be ignored.
* @param callback (optional)
*/
IndexCore.prototype.searchForFacetValues = function(params, callback) {
  var clone = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");
  var omit = __webpack_require__(/*! ./omit.js */ "./node_modules/algoliasearch/src/omit.js");
  var usage = 'Usage: index.searchForFacetValues({facetName, facetQuery, ...params}[, callback])';

  if (params.facetName === undefined || params.facetQuery === undefined) {
    throw new Error(usage);
  }

  var facetName = params.facetName;
  var filteredParams = omit(clone(params), function(keyName) {
    return keyName === 'facetName';
  });
  var searchParameters = this.as._getSearchParams(filteredParams, '');

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/' +
      encodeURIComponent(this.indexName) + '/facets/' + encodeURIComponent(facetName) + '/query',
    hostType: 'read',
    body: {params: searchParameters},
    callback: callback
  });
};

IndexCore.prototype.searchFacet = deprecate(function(params, callback) {
  return this.searchForFacetValues(params, callback);
}, deprecatedMessage(
  'index.searchFacet(params[, callback])',
  'index.searchForFacetValues(params[, callback])'
));

IndexCore.prototype._search = function(params, url, callback, additionalUA) {
  return this.as._jsonRequest({
    cache: this.cache,
    method: 'POST',
    url: url || '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
    body: {params: params},
    hostType: 'read',
    fallback: {
      method: 'GET',
      url: '/1/indexes/' + encodeURIComponent(this.indexName),
      body: {params: params}
    },
    callback: callback,
    additionalUA: additionalUA
  });
};

/*
* Get an object from this index
*
* @param objectID the unique identifier of the object to retrieve
* @param attrs (optional) if set, contains the array of attribute names to retrieve
* @param callback (optional) the result callback called with two arguments
*  error: null or Error('message')
*  content: the object to retrieve or the error message if a failure occurred
*/
IndexCore.prototype.getObject = function(objectID, attrs, callback) {
  var indexObj = this;

  if (arguments.length === 1 || typeof attrs === 'function') {
    callback = attrs;
    attrs = undefined;
  }

  var params = '';
  if (attrs !== undefined) {
    params = '?attributes=';
    for (var i = 0; i < attrs.length; ++i) {
      if (i !== 0) {
        params += ',';
      }
      params += attrs[i];
    }
  }

  return this.as._jsonRequest({
    method: 'GET',
    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
    hostType: 'read',
    callback: callback
  });
};

/*
* Get several objects from this index
*
* @param objectIDs the array of unique identifier of objects to retrieve
*/
IndexCore.prototype.getObjects = function(objectIDs, attributesToRetrieve, callback) {
  var isArray = __webpack_require__(/*! isarray */ "./node_modules/algoliasearch/node_modules/isarray/index.js");
  var map = __webpack_require__(/*! ./map.js */ "./node_modules/algoliasearch/src/map.js");

  var usage = 'Usage: index.getObjects(arrayOfObjectIDs[, callback])';

  if (!isArray(objectIDs)) {
    throw new Error(usage);
  }

  var indexObj = this;

  if (arguments.length === 1 || typeof attributesToRetrieve === 'function') {
    callback = attributesToRetrieve;
    attributesToRetrieve = undefined;
  }

  var body = {
    requests: map(objectIDs, function prepareRequest(objectID) {
      var request = {
        indexName: indexObj.indexName,
        objectID: objectID
      };

      if (attributesToRetrieve) {
        request.attributesToRetrieve = attributesToRetrieve.join(',');
      }

      return request;
    })
  };

  return this.as._jsonRequest({
    method: 'POST',
    url: '/1/indexes/*/objects',
    hostType: 'read',
    body: body,
    callback: callback
  });
};

IndexCore.prototype.as = null;
IndexCore.prototype.indexName = null;
IndexCore.prototype.typeAheadArgs = null;
IndexCore.prototype.typeAheadValueOption = null;


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js":
/*!****************************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AlgoliaSearchCore = __webpack_require__(/*! ../../AlgoliaSearchCore.js */ "./node_modules/algoliasearch/src/AlgoliaSearchCore.js");
var createAlgoliasearch = __webpack_require__(/*! ../createAlgoliasearch.js */ "./node_modules/algoliasearch/src/browser/createAlgoliasearch.js");

module.exports = createAlgoliasearch(AlgoliaSearchCore, 'Browser (lite)');


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/createAlgoliasearch.js":
/*!***********************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/createAlgoliasearch.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! global */ "./node_modules/global/window.js");
var Promise = global.Promise || __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").Promise;

// This is the standalone browser build entry point
// Browser implementation of the Algolia Search JavaScript client,
// using XMLHttpRequest, XDomainRequest and JSONP as fallback
module.exports = function createAlgoliasearch(AlgoliaSearch, uaSuffix) {
  var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");
  var errors = __webpack_require__(/*! ../errors */ "./node_modules/algoliasearch/src/errors.js");
  var inlineHeaders = __webpack_require__(/*! ./inline-headers */ "./node_modules/algoliasearch/src/browser/inline-headers.js");
  var jsonpRequest = __webpack_require__(/*! ./jsonp-request */ "./node_modules/algoliasearch/src/browser/jsonp-request.js");
  var places = __webpack_require__(/*! ../places.js */ "./node_modules/algoliasearch/src/places.js");
  uaSuffix = uaSuffix || '';

  if (false) {}

  function algoliasearch(applicationID, apiKey, opts) {
    var cloneDeep = __webpack_require__(/*! ../clone.js */ "./node_modules/algoliasearch/src/clone.js");

    opts = cloneDeep(opts || {});

    opts._ua = opts._ua || algoliasearch.ua;

    return new AlgoliaSearchBrowser(applicationID, apiKey, opts);
  }

  algoliasearch.version = __webpack_require__(/*! ../version.js */ "./node_modules/algoliasearch/src/version.js");

  algoliasearch.ua =
    'Algolia for JavaScript (' + algoliasearch.version + '); ' + uaSuffix;

  algoliasearch.initPlaces = places(algoliasearch);

  // we expose into window no matter how we are used, this will allow
  // us to easily debug any website running algolia
  global.__algolia = {
    debug: __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js"),
    algoliasearch: algoliasearch
  };

  var support = {
    hasXMLHttpRequest: 'XMLHttpRequest' in global,
    hasXDomainRequest: 'XDomainRequest' in global
  };

  if (support.hasXMLHttpRequest) {
    support.cors = 'withCredentials' in new XMLHttpRequest();
  }

  function AlgoliaSearchBrowser() {
    // call AlgoliaSearch constructor
    AlgoliaSearch.apply(this, arguments);
  }

  inherits(AlgoliaSearchBrowser, AlgoliaSearch);

  AlgoliaSearchBrowser.prototype._request = function request(url, opts) {
    return new Promise(function wrapRequest(resolve, reject) {
      // no cors or XDomainRequest, no request
      if (!support.cors && !support.hasXDomainRequest) {
        // very old browser, not supported
        reject(new errors.Network('CORS not supported'));
        return;
      }

      url = inlineHeaders(url, opts.headers);

      var body = opts.body;
      var req = support.cors ? new XMLHttpRequest() : new XDomainRequest();
      var reqTimeout;
      var timedOut;
      var connected = false;

      reqTimeout = setTimeout(onTimeout, opts.timeouts.connect);
      // we set an empty onprogress listener
      // so that XDomainRequest on IE9 is not aborted
      // refs:
      //  - https://github.com/algolia/algoliasearch-client-js/issues/76
      //  - https://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
      req.onprogress = onProgress;
      if ('onreadystatechange' in req) req.onreadystatechange = onReadyStateChange;
      req.onload = onLoad;
      req.onerror = onError;

      // do not rely on default XHR async flag, as some analytics code like hotjar
      // breaks it and set it to false by default
      if (req instanceof XMLHttpRequest) {
        req.open(opts.method, url, true);

        // The Analytics API never accepts Auth headers as query string
        // this option exists specifically for them.
        if (opts.forceAuthHeaders) {
          req.setRequestHeader(
            'x-algolia-application-id',
            opts.headers['x-algolia-application-id']
          );
          req.setRequestHeader(
            'x-algolia-api-key',
            opts.headers['x-algolia-api-key']
          );
        }
      } else {
        req.open(opts.method, url);
      }

      // headers are meant to be sent after open
      if (support.cors) {
        if (body) {
          if (opts.method === 'POST') {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
            req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
          } else {
            req.setRequestHeader('content-type', 'application/json');
          }
        }
        req.setRequestHeader('accept', 'application/json');
      }

      if (body) {
        req.send(body);
      } else {
        req.send();
      }

      // event object not received in IE8, at least
      // but we do not use it, still important to note
      function onLoad(/* event */) {
        // When browser does not supports req.timeout, we can
        // have both a load and timeout event, since handled by a dumb setTimeout
        if (timedOut) {
          return;
        }

        clearTimeout(reqTimeout);

        var out;

        try {
          out = {
            body: JSON.parse(req.responseText),
            responseText: req.responseText,
            statusCode: req.status,
            // XDomainRequest does not have any response headers
            headers: req.getAllResponseHeaders && req.getAllResponseHeaders() || {}
          };
        } catch (e) {
          out = new errors.UnparsableJSON({
            more: req.responseText
          });
        }

        if (out instanceof errors.UnparsableJSON) {
          reject(out);
        } else {
          resolve(out);
        }
      }

      function onError(event) {
        if (timedOut) {
          return;
        }

        clearTimeout(reqTimeout);

        // error event is trigerred both with XDR/XHR on:
        //   - DNS error
        //   - unallowed cross domain request
        reject(
          new errors.Network({
            more: event
          })
        );
      }

      function onTimeout() {
        timedOut = true;
        req.abort();

        reject(new errors.RequestTimeout());
      }

      function onConnect() {
        connected = true;
        clearTimeout(reqTimeout);
        reqTimeout = setTimeout(onTimeout, opts.timeouts.complete);
      }

      function onProgress() {
        if (!connected) onConnect();
      }

      function onReadyStateChange() {
        if (!connected && req.readyState > 1) onConnect();
      }
    });
  };

  AlgoliaSearchBrowser.prototype._request.fallback = function requestFallback(url, opts) {
    url = inlineHeaders(url, opts.headers);

    return new Promise(function wrapJsonpRequest(resolve, reject) {
      jsonpRequest(url, opts, function jsonpRequestDone(err, content) {
        if (err) {
          reject(err);
          return;
        }

        resolve(content);
      });
    });
  };

  AlgoliaSearchBrowser.prototype._promise = {
    reject: function rejectPromise(val) {
      return Promise.reject(val);
    },
    resolve: function resolvePromise(val) {
      return Promise.resolve(val);
    },
    delay: function delayPromise(ms) {
      return new Promise(function resolveOnTimeout(resolve/* , reject*/) {
        setTimeout(resolve, ms);
      });
    },
    all: function all(promises) {
      return Promise.all(promises);
    }
  };

  return algoliasearch;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/inline-headers.js":
/*!******************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/inline-headers.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = inlineHeaders;

var encode = __webpack_require__(/*! querystring-es3/encode */ "./node_modules/querystring-es3/encode.js");

function inlineHeaders(url, headers) {
  if (/\?/.test(url)) {
    url += '&';
  } else {
    url += '?';
  }

  return url + encode(headers);
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/browser/jsonp-request.js":
/*!*****************************************************************!*\
  !*** ./node_modules/algoliasearch/src/browser/jsonp-request.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = jsonpRequest;

var errors = __webpack_require__(/*! ../errors */ "./node_modules/algoliasearch/src/errors.js");

var JSONPCounter = 0;

function jsonpRequest(url, opts, cb) {
  if (opts.method !== 'GET') {
    cb(new Error('Method ' + opts.method + ' ' + url + ' is not supported by JSONP.'));
    return;
  }

  opts.debug('JSONP: start');

  var cbCalled = false;
  var timedOut = false;

  JSONPCounter += 1;
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  var cbName = 'algoliaJSONP_' + JSONPCounter;
  var done = false;

  window[cbName] = function(data) {
    removeGlobals();

    if (timedOut) {
      opts.debug('JSONP: Late answer, ignoring');
      return;
    }

    cbCalled = true;

    clean();

    cb(null, {
      body: data,
      responseText: JSON.stringify(data)/* ,
      // We do not send the statusCode, there's no statusCode in JSONP, it will be
      // computed using data.status && data.message like with XDR
      statusCode*/
    });
  };

  // add callback by hand
  url += '&callback=' + cbName;

  // add body params manually
  if (opts.jsonBody && opts.jsonBody.params) {
    url += '&' + opts.jsonBody.params;
  }

  var ontimeout = setTimeout(timeout, opts.timeouts.complete);

  // script onreadystatechange needed only for
  // <= IE8
  // https://github.com/angular/angular.js/issues/4523
  script.onreadystatechange = readystatechange;
  script.onload = success;
  script.onerror = error;

  script.async = true;
  script.defer = true;
  script.src = url;
  head.appendChild(script);

  function success() {
    opts.debug('JSONP: success');

    if (done || timedOut) {
      return;
    }

    done = true;

    // script loaded but did not call the fn => script loading error
    if (!cbCalled) {
      opts.debug('JSONP: Fail. Script loaded but did not call the callback');
      clean();
      cb(new errors.JSONPScriptFail());
    }
  }

  function readystatechange() {
    if (this.readyState === 'loaded' || this.readyState === 'complete') {
      success();
    }
  }

  function clean() {
    clearTimeout(ontimeout);
    script.onload = null;
    script.onreadystatechange = null;
    script.onerror = null;
    head.removeChild(script);
  }

  function removeGlobals() {
    try {
      delete window[cbName];
      delete window[cbName + '_loaded'];
    } catch (e) {
      window[cbName] = window[cbName + '_loaded'] = undefined;
    }
  }

  function timeout() {
    opts.debug('JSONP: Script timeout');
    timedOut = true;
    clean();
    cb(new errors.RequestTimeout());
  }

  function error() {
    opts.debug('JSONP: Script error');

    if (done || timedOut) {
      return;
    }

    clean();
    cb(new errors.JSONPScriptError());
  }
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/buildSearchMethod.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/buildSearchMethod.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = buildSearchMethod;

var errors = __webpack_require__(/*! ./errors.js */ "./node_modules/algoliasearch/src/errors.js");

/**
 * Creates a search method to be used in clients
 * @param {string} queryParam the name of the attribute used for the query
 * @param {string} url the url
 * @return {function} the search method
 */
function buildSearchMethod(queryParam, url) {
  /**
   * The search method. Prepares the data and send the query to Algolia.
   * @param {string} query the string used for query search
   * @param {object} args additional parameters to send with the search
   * @param {function} [callback] the callback to be called with the client gets the answer
   * @return {undefined|Promise} If the callback is not provided then this methods returns a Promise
   */
  return function search(query, args, callback) {
    // warn V2 users on how to search
    if (typeof query === 'function' && typeof args === 'object' ||
      typeof callback === 'object') {
      // .search(query, params, cb)
      // .search(cb, params)
      throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
    }

    // Normalizing the function signature
    if (arguments.length === 0 || typeof query === 'function') {
      // Usage : .search(), .search(cb)
      callback = query;
      query = '';
    } else if (arguments.length === 1 || typeof args === 'function') {
      // Usage : .search(query/args), .search(query, cb)
      callback = args;
      args = undefined;
    }
    // At this point we have 3 arguments with values

    // Usage : .search(args) // careful: typeof null === 'object'
    if (typeof query === 'object' && query !== null) {
      args = query;
      query = undefined;
    } else if (query === undefined || query === null) { // .search(undefined/null)
      query = '';
    }

    var params = '';

    if (query !== undefined) {
      params += queryParam + '=' + encodeURIComponent(query);
    }

    var additionalUA;
    if (args !== undefined) {
      if (args.additionalUA) {
        additionalUA = args.additionalUA;
        delete args.additionalUA;
      }
      // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
      params = this.as._getSearchParams(args, params);
    }


    return this._search(params, url, callback, additionalUA);
  };
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/clone.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/clone.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/deprecate.js":
/*!*****************************************************!*\
  !*** ./node_modules/algoliasearch/src/deprecate.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function deprecate(fn, message) {
  var warned = false;

  function deprecated() {
    if (!warned) {
      /* eslint no-console:0 */
      console.warn(message);
      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/deprecatedMessage.js":
/*!*************************************************************!*\
  !*** ./node_modules/algoliasearch/src/deprecatedMessage.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function deprecatedMessage(previousUsage, newUsage) {
  var githubAnchorLink = previousUsage.toLowerCase()
    .replace(/[\.\(\)]/g, '');

  return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage +
    '`. Please see https://github.com/algolia/algoliasearch-client-javascript/wiki/Deprecated#' + githubAnchorLink;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/errors.js":
/*!**************************************************!*\
  !*** ./node_modules/algoliasearch/src/errors.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This file hosts our error definitions
// We use custom error "types" so that we can act on them when we need it
// e.g.: if error instanceof errors.UnparsableJSON then..

var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

function AlgoliaSearchError(message, extraProperties) {
  var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

  var error = this;

  // try to get a stacktrace
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    error.stack = (new Error()).stack || 'Cannot get a stacktrace, browser is too old';
  }

  this.name = 'AlgoliaSearchError';
  this.message = message || 'Unknown error';

  if (extraProperties) {
    forEach(extraProperties, function addToErrorObject(value, key) {
      error[key] = value;
    });
  }
}

inherits(AlgoliaSearchError, Error);

function createCustomError(name, message) {
  function AlgoliaSearchCustomError() {
    var args = Array.prototype.slice.call(arguments, 0);

    // custom message not set, use default
    if (typeof args[0] !== 'string') {
      args.unshift(message);
    }

    AlgoliaSearchError.apply(this, args);
    this.name = 'AlgoliaSearch' + name + 'Error';
  }

  inherits(AlgoliaSearchCustomError, AlgoliaSearchError);

  return AlgoliaSearchCustomError;
}

// late exports to let various fn defs and inherits take place
module.exports = {
  AlgoliaSearchError: AlgoliaSearchError,
  UnparsableJSON: createCustomError(
    'UnparsableJSON',
    'Could not parse the incoming response as JSON, see err.more for details'
  ),
  RequestTimeout: createCustomError(
    'RequestTimeout',
    'Request timed out before getting a response'
  ),
  Network: createCustomError(
    'Network',
    'Network issue, see err.more for details'
  ),
  JSONPScriptFail: createCustomError(
    'JSONPScriptFail',
    '<script> was loaded but did not call our provided callback'
  ),
  ValidUntilNotFound: createCustomError(
    'ValidUntilNotFound',
    'The SecuredAPIKey does not have a validUntil parameter.'
  ),
  JSONPScriptError: createCustomError(
    'JSONPScriptError',
    '<script> unable to load due to an `error` event on it'
  ),
  ObjectNotFound: createCustomError(
    'ObjectNotFound',
    'Object not found'
  ),
  Unknown: createCustomError(
    'Unknown',
    'Unknown error occured'
  )
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/exitPromise.js":
/*!*******************************************************!*\
  !*** ./node_modules/algoliasearch/src/exitPromise.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Parse cloud does not supports setTimeout
// We do not store a setTimeout reference in the client everytime
// We only fallback to a fake setTimeout when not available
// setTimeout cannot be override globally sadly
module.exports = function exitPromise(fn, _setTimeout) {
  _setTimeout(fn, 0);
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/map.js":
/*!***********************************************!*\
  !*** ./node_modules/algoliasearch/src/map.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

module.exports = function map(arr, fn) {
  var newArr = [];
  foreach(arr, function(item, itemIndex) {
    newArr.push(fn(item, itemIndex, arr));
  });
  return newArr;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/merge.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/merge.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

module.exports = function merge(destination/* , sources */) {
  var sources = Array.prototype.slice.call(arguments);

  foreach(sources, function(source) {
    for (var keyName in source) {
      if (source.hasOwnProperty(keyName)) {
        if (typeof destination[keyName] === 'object' && typeof source[keyName] === 'object') {
          destination[keyName] = merge({}, destination[keyName], source[keyName]);
        } else if (source[keyName] !== undefined) {
          destination[keyName] = source[keyName];
        }
      }
    }
  });

  return destination;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/omit.js":
/*!************************************************!*\
  !*** ./node_modules/algoliasearch/src/omit.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function omit(obj, test) {
  var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
  var foreach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");

  var filtered = {};

  foreach(keys(obj), function doFilter(keyName) {
    if (test(keyName) !== true) {
      filtered[keyName] = obj[keyName];
    }
  });

  return filtered;
};


/***/ }),

/***/ "./node_modules/algoliasearch/src/places.js":
/*!**************************************************!*\
  !*** ./node_modules/algoliasearch/src/places.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = createPlacesClient;

var qs3 = __webpack_require__(/*! querystring-es3 */ "./node_modules/querystring-es3/index.js");
var buildSearchMethod = __webpack_require__(/*! ./buildSearchMethod.js */ "./node_modules/algoliasearch/src/buildSearchMethod.js");

function createPlacesClient(algoliasearch) {
  return function places(appID, apiKey, opts) {
    var cloneDeep = __webpack_require__(/*! ./clone.js */ "./node_modules/algoliasearch/src/clone.js");

    opts = opts && cloneDeep(opts) || {};
    opts.hosts = opts.hosts || [
      'places-dsn.algolia.net',
      'places-1.algolianet.com',
      'places-2.algolianet.com',
      'places-3.algolianet.com'
    ];

    // allow initPlaces() no arguments => community rate limited
    if (arguments.length === 0 || typeof appID === 'object' || appID === undefined) {
      appID = '';
      apiKey = '';
      opts._allowEmptyCredentials = true;
    }

    var client = algoliasearch(appID, apiKey, opts);
    var index = client.initIndex('places');
    index.search = buildSearchMethod('query', '/1/places/query');
    index.reverse = function(options, callback) {
      var encoded = qs3.encode(options);

      return this.as._jsonRequest({
        method: 'GET',
        url: '/1/places/reverse?' + encoded,
        hostType: 'read',
        callback: callback
      });
    };

    index.getObject = function(objectID, callback) {
      return this.as._jsonRequest({
        method: 'GET',
        url: '/1/places/' + encodeURIComponent(objectID),
        hostType: 'read',
        callback: callback
      });
    };
    return index;
  };
}


/***/ }),

/***/ "./node_modules/algoliasearch/src/store.js":
/*!*************************************************!*\
  !*** ./node_modules/algoliasearch/src/store.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var debug = __webpack_require__(/*! debug */ "./node_modules/algoliasearch/node_modules/debug/src/browser.js")('algoliasearch:src/hostIndexState.js');
var localStorageNamespace = 'algoliasearch-client-js';

var store;
var moduleStore = {
  state: {},
  set: function(key, data) {
    this.state[key] = data;
    return this.state[key];
  },
  get: function(key) {
    return this.state[key] || null;
  }
};

var localStorageStore = {
  set: function(key, data) {
    moduleStore.set(key, data); // always replicate localStorageStore to moduleStore in case of failure

    try {
      var namespace = JSON.parse(global.localStorage[localStorageNamespace]);
      namespace[key] = data;
      global.localStorage[localStorageNamespace] = JSON.stringify(namespace);
      return namespace[key];
    } catch (e) {
      return localStorageFailure(key, e);
    }
  },
  get: function(key) {
    try {
      return JSON.parse(global.localStorage[localStorageNamespace])[key] || null;
    } catch (e) {
      return localStorageFailure(key, e);
    }
  }
};

function localStorageFailure(key, e) {
  debug('localStorage failed with', e);
  cleanup();
  store = moduleStore;
  return store.get(key);
}

store = supportsLocalStorage() ? localStorageStore : moduleStore;

module.exports = {
  get: getOrSet,
  set: getOrSet,
  supportsLocalStorage: supportsLocalStorage
};

function getOrSet(key, data) {
  if (arguments.length === 1) {
    return store.get(key);
  }

  return store.set(key, data);
}

function supportsLocalStorage() {
  try {
    if ('localStorage' in global &&
      global.localStorage !== null) {
      if (!global.localStorage[localStorageNamespace]) {
        // actual creation of the namespace
        global.localStorage.setItem(localStorageNamespace, JSON.stringify({}));
      }
      return true;
    }

    return false;
  } catch (_) {
    return false;
  }
}

// In case of any error on localStorage, we clean our own namespace, this should handle
// quota errors when a lot of keys + data are used
function cleanup() {
  try {
    global.localStorage.removeItem(localStorageNamespace);
  } catch (_) {
    // nothing to do
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/algoliasearch/src/version.js":
/*!***************************************************!*\
  !*** ./node_modules/algoliasearch/src/version.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = '3.35.1';


/***/ }),

/***/ "./node_modules/autocomplete.js/index.js":
/*!***********************************************!*\
  !*** ./node_modules/autocomplete.js/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./src/standalone/ */ "./node_modules/autocomplete.js/src/standalone/index.js");


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/css.js":
/*!**************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/css.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");

var css = {
  wrapper: {
    position: 'relative',
    display: 'inline-block'
  },
  hint: {
    position: 'absolute',
    top: '0',
    left: '0',
    borderColor: 'transparent',
    boxShadow: 'none',
    // #741: fix hint opacity issue on iOS
    opacity: '1'
  },
  input: {
    position: 'relative',
    verticalAlign: 'top',
    backgroundColor: 'transparent'
  },
  inputWithNoHint: {
    position: 'relative',
    verticalAlign: 'top'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '100',
    display: 'none'
  },
  suggestions: {
    display: 'block'
  },
  suggestion: {
    whiteSpace: 'nowrap',
    cursor: 'pointer'
  },
  suggestionChild: {
    whiteSpace: 'normal'
  },
  ltr: {
    left: '0',
    right: 'auto'
  },
  rtl: {
    left: 'auto',
    right: '0'
  },
  defaultClasses: {
    root: 'algolia-autocomplete',
    prefix: 'aa',
    noPrefix: false,
    dropdownMenu: 'dropdown-menu',
    input: 'input',
    hint: 'hint',
    suggestions: 'suggestions',
    suggestion: 'suggestion',
    cursor: 'cursor',
    dataset: 'dataset',
    empty: 'empty'
  },
  // will be merged with the default ones if appendTo is used
  appendTo: {
    wrapper: {
      position: 'absolute',
      zIndex: '100',
      display: 'none'
    },
    input: {},
    inputWithNoHint: {},
    dropdown: {
      display: 'block'
    }
  }
};

// ie specific styling
if (_.isMsie()) {
  // ie6-8 (and 9?) doesn't fire hover and click events for elements with
  // transparent backgrounds, for a workaround, use 1x1 transparent gif
  _.mixin(css.input, {
    backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
  });
}

// ie7 and under specific styling
if (_.isMsie() && _.isMsie() <= 7) {
  // if someone can tell me why this is necessary to align
  // the hint with the query in ie7, i'll send you $5 - @JakeHarding
  _.mixin(css.input, {marginTop: '-1px'});
}

module.exports = css;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/dataset.js":
/*!******************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/dataset.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var datasetKey = 'aaDataset';
var valueKey = 'aaValue';
var datumKey = 'aaDatum';

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var html = __webpack_require__(/*! ./html.js */ "./node_modules/autocomplete.js/src/autocomplete/html.js");
var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");
var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");

// constructor
// -----------

function Dataset(o) {
  o = o || {};
  o.templates = o.templates || {};

  if (!o.source) {
    _.error('missing source');
  }

  if (o.name && !isValidName(o.name)) {
    _.error('invalid dataset name: ' + o.name);
  }

  // tracks the last query the dataset was updated for
  this.query = null;
  this._isEmpty = true;

  this.highlight = !!o.highlight;
  this.name = typeof o.name === 'undefined' || o.name === null ? _.getUniqueId() : o.name;

  this.source = o.source;
  this.displayFn = getDisplayFn(o.display || o.displayKey);

  this.debounce = o.debounce;

  this.cache = o.cache !== false;

  this.templates = getTemplates(o.templates, this.displayFn);

  this.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
  this.cssClasses.prefix =
    o.cssClasses.formattedPrefix || _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);

  var clazz = _.className(this.cssClasses.prefix, this.cssClasses.dataset);
  this.$el = o.$menu && o.$menu.find(clazz + '-' + this.name).length > 0 ?
    DOM.element(o.$menu.find(clazz + '-' + this.name)[0]) :
    DOM.element(
      html.dataset.replace('%CLASS%', this.name)
        .replace('%PREFIX%', this.cssClasses.prefix)
        .replace('%DATASET%', this.cssClasses.dataset)
    );

  this.$menu = o.$menu;
  this.clearCachedSuggestions();
}

// static methods
// --------------

Dataset.extractDatasetName = function extractDatasetName(el) {
  return DOM.element(el).data(datasetKey);
};

Dataset.extractValue = function extractValue(el) {
  return DOM.element(el).data(valueKey);
};

Dataset.extractDatum = function extractDatum(el) {
  var datum = DOM.element(el).data(datumKey);
  if (typeof datum === 'string') {
    // Zepto has an automatic deserialization of the
    // JSON encoded data attribute
    datum = JSON.parse(datum);
  }
  return datum;
};

// instance methods
// ----------------

_.mixin(Dataset.prototype, EventEmitter, {

  // ### private

  _render: function render(query, suggestions) {
    if (!this.$el) {
      return;
    }
    var that = this;

    var hasSuggestions;
    var renderArgs = [].slice.call(arguments, 2);
    this.$el.empty();

    hasSuggestions = suggestions && suggestions.length;
    this._isEmpty = !hasSuggestions;

    if (!hasSuggestions && this.templates.empty) {
      this.$el
        .html(getEmptyHtml.apply(this, renderArgs))
        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
    } else if (hasSuggestions) {
      this.$el
        .html(getSuggestionsHtml.apply(this, renderArgs))
        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
    } else if (suggestions && !Array.isArray(suggestions)) {
      throw new TypeError('suggestions must be an array');
    }

    if (this.$menu) {
      this.$menu.addClass(
        this.cssClasses.prefix + (hasSuggestions ? 'with' : 'without') + '-' + this.name
      ).removeClass(
        this.cssClasses.prefix + (hasSuggestions ? 'without' : 'with') + '-' + this.name
      );
    }

    this.trigger('rendered', query);

    function getEmptyHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: true}].concat(args);
      return that.templates.empty.apply(this, args);
    }

    function getSuggestionsHtml() {
      var args = [].slice.call(arguments, 0);
      var $suggestions;
      var nodes;
      var self = this;

      var suggestionsHtml = html.suggestions.
        replace('%PREFIX%', this.cssClasses.prefix).
        replace('%SUGGESTIONS%', this.cssClasses.suggestions);
      $suggestions = DOM
        .element(suggestionsHtml)
        .css(this.css.suggestions);

      // jQuery#append doesn't support arrays as the first argument
      // until version 1.8, see http://bugs.jquery.com/ticket/11231
      nodes = _.map(suggestions, getSuggestionNode);
      $suggestions.append.apply($suggestions, nodes);

      return $suggestions;

      function getSuggestionNode(suggestion) {
        var $el;

        var suggestionHtml = html.suggestion.
          replace('%PREFIX%', self.cssClasses.prefix).
          replace('%SUGGESTION%', self.cssClasses.suggestion);
        $el = DOM.element(suggestionHtml)
          .attr({
            role: 'option',
            id: ['option', Math.floor(Math.random() * 100000000)].join('-')
          })
          .append(that.templates.suggestion.apply(this, [suggestion].concat(args)));

        $el.data(datasetKey, that.name);
        $el.data(valueKey, that.displayFn(suggestion) || undefined); // this led to undefined return value
        $el.data(datumKey, JSON.stringify(suggestion));
        $el.children().each(function() { DOM.element(this).css(self.css.suggestionChild); });

        return $el;
      }
    }

    function getHeaderHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
      return that.templates.header.apply(this, args);
    }

    function getFooterHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
      return that.templates.footer.apply(this, args);
    }
  },

  // ### public

  getRoot: function getRoot() {
    return this.$el;
  },

  update: function update(query) {
    function handleSuggestions(suggestions) {
      // if the update has been canceled or if the query has changed
      // do not render the suggestions as they've become outdated
      if (!this.canceled && query === this.query) {
        // concat all the other arguments that could have been passed
        // to the render function, and forward them to _render
        var extraArgs = [].slice.call(arguments, 1);
        this.cacheSuggestions(query, suggestions, extraArgs);
        this._render.apply(this, [query, suggestions].concat(extraArgs));
      }
    }

    this.query = query;
    this.canceled = false;

    if (this.shouldFetchFromCache(query)) {
      handleSuggestions.apply(this, [this.cachedSuggestions].concat(this.cachedRenderExtraArgs));
    } else {
      var that = this;
      var execSource = function() {
        // When the call is debounced the condition avoid to do a useless
        // request with the last character when the input has been cleared
        if (!that.canceled) {
          that.source(query, handleSuggestions.bind(that));
        }
      };

      if (this.debounce) {
        var later = function() {
          that.debounceTimeout = null;
          execSource();
        };
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(later, this.debounce);
      } else {
        execSource();
      }
    }
  },

  cacheSuggestions: function cacheSuggestions(query, suggestions, extraArgs) {
    this.cachedQuery = query;
    this.cachedSuggestions = suggestions;
    this.cachedRenderExtraArgs = extraArgs;
  },

  shouldFetchFromCache: function shouldFetchFromCache(query) {
    return this.cache &&
      this.cachedQuery === query &&
      this.cachedSuggestions &&
      this.cachedSuggestions.length;
  },

  clearCachedSuggestions: function clearCachedSuggestions() {
    delete this.cachedQuery;
    delete this.cachedSuggestions;
    delete this.cachedRenderExtraArgs;
  },

  cancel: function cancel() {
    this.canceled = true;
  },

  clear: function clear() {
    if (this.$el) {
      this.cancel();
      this.$el.empty();
      this.trigger('rendered', '');
    }
  },

  isEmpty: function isEmpty() {
    return this._isEmpty;
  },

  destroy: function destroy() {
    this.clearCachedSuggestions();
    this.$el = null;
  }
});

// helper functions
// ----------------

function getDisplayFn(display) {
  display = display || 'value';

  return _.isFunction(display) ? display : displayFn;

  function displayFn(obj) {
    return obj[display];
  }
}

function getTemplates(templates, displayFn) {
  return {
    empty: templates.empty && _.templatify(templates.empty),
    header: templates.header && _.templatify(templates.header),
    footer: templates.footer && _.templatify(templates.footer),
    suggestion: templates.suggestion || suggestionTemplate
  };

  function suggestionTemplate(context) {
    return '<p>' + displayFn(context) + '</p>';
  }
}

function isValidName(str) {
  // dashes, underscores, letters, and numbers
  return (/^[_a-zA-Z0-9-]+$/).test(str);
}

module.exports = Dataset;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/dropdown.js":
/*!*******************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/dropdown.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");
var Dataset = __webpack_require__(/*! ./dataset.js */ "./node_modules/autocomplete.js/src/autocomplete/dataset.js");
var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");

// constructor
// -----------

function Dropdown(o) {
  var that = this;
  var onSuggestionClick;
  var onSuggestionMouseEnter;
  var onSuggestionMouseLeave;

  o = o || {};

  if (!o.menu) {
    _.error('menu is required');
  }

  if (!_.isArray(o.datasets) && !_.isObject(o.datasets)) {
    _.error('1 or more datasets required');
  }
  if (!o.datasets) {
    _.error('datasets is required');
  }

  this.isOpen = false;
  this.isEmpty = true;
  this.minLength = o.minLength || 0;
  this.templates = {};
  this.appendTo = o.appendTo || false;
  this.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
  this.cssClasses.prefix =
    o.cssClasses.formattedPrefix || _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);

  // bound functions
  onSuggestionClick = _.bind(this._onSuggestionClick, this);
  onSuggestionMouseEnter = _.bind(this._onSuggestionMouseEnter, this);
  onSuggestionMouseLeave = _.bind(this._onSuggestionMouseLeave, this);

  var cssClass = _.className(this.cssClasses.prefix, this.cssClasses.suggestion);
  this.$menu = DOM.element(o.menu)
    .on('mouseenter.aa', cssClass, onSuggestionMouseEnter)
    .on('mouseleave.aa', cssClass, onSuggestionMouseLeave)
    .on('click.aa', cssClass, onSuggestionClick);

  this.$container = o.appendTo ? o.wrapper : this.$menu;

  if (o.templates && o.templates.header) {
    this.templates.header = _.templatify(o.templates.header);
    this.$menu.prepend(this.templates.header());
  }

  if (o.templates && o.templates.empty) {
    this.templates.empty = _.templatify(o.templates.empty);
    this.$empty = DOM.element('<div class="' +
      _.className(this.cssClasses.prefix, this.cssClasses.empty, true) + '">' +
      '</div>');
    this.$menu.append(this.$empty);
    this.$empty.hide();
  }

  this.datasets = _.map(o.datasets, function(oDataset) {
    return initializeDataset(that.$menu, oDataset, o.cssClasses);
  });
  _.each(this.datasets, function(dataset) {
    var root = dataset.getRoot();
    if (root && root.parent().length === 0) {
      that.$menu.append(root);
    }
    dataset.onSync('rendered', that._onRendered, that);
  });

  if (o.templates && o.templates.footer) {
    this.templates.footer = _.templatify(o.templates.footer);
    this.$menu.append(this.templates.footer());
  }

  var self = this;
  DOM.element(window).resize(function() {
    self._redraw();
  });
}

// instance methods
// ----------------

_.mixin(Dropdown.prototype, EventEmitter, {

  // ### private

  _onSuggestionClick: function onSuggestionClick($e) {
    this.trigger('suggestionClicked', DOM.element($e.currentTarget));
  },

  _onSuggestionMouseEnter: function onSuggestionMouseEnter($e) {
    var elt = DOM.element($e.currentTarget);
    if (elt.hasClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))) {
      // we're already on the cursor
      // => we're probably entering it again after leaving it for a nested div
      return;
    }
    this._removeCursor();

    // Fixes iOS double tap behaviour, by modifying the DOM right before the
    // native href clicks happens, iOS will requires another tap to follow
    // a suggestion that has an <a href> element inside
    // https://www.google.com/search?q=ios+double+tap+bug+href
    var suggestion = this;
    setTimeout(function() {
      // this exact line, when inside the main loop, will trigger a double tap bug
      // on iOS devices
      suggestion._setCursor(elt, false);
    }, 0);
  },

  _onSuggestionMouseLeave: function onSuggestionMouseLeave($e) {
    // $e.relatedTarget is the `EventTarget` the pointing device entered to
    if ($e.relatedTarget) {
      var elt = DOM.element($e.relatedTarget);
      if (elt.closest('.' + _.className(this.cssClasses.prefix, this.cssClasses.cursor, true)).length > 0) {
        // our father is a cursor
        // => it means we're just leaving the suggestion for a nested div
        return;
      }
    }
    this._removeCursor();
    this.trigger('cursorRemoved');
  },

  _onRendered: function onRendered(e, query) {
    this.isEmpty = _.every(this.datasets, isDatasetEmpty);

    if (this.isEmpty) {
      if (query.length >= this.minLength) {
        this.trigger('empty');
      }

      if (this.$empty) {
        if (query.length < this.minLength) {
          this._hide();
        } else {
          var html = this.templates.empty({
            query: this.datasets[0] && this.datasets[0].query
          });
          this.$empty.html(html);
          this.$empty.show();
          this._show();
        }
      } else if (_.any(this.datasets, hasEmptyTemplate)) {
        if (query.length < this.minLength) {
          this._hide();
        } else {
          this._show();
        }
      } else {
        this._hide();
      }
    } else if (this.isOpen) {
      if (this.$empty) {
        this.$empty.empty();
        this.$empty.hide();
      }

      if (query.length >= this.minLength) {
        this._show();
      } else {
        this._hide();
      }
    }

    this.trigger('datasetRendered');

    function isDatasetEmpty(dataset) {
      return dataset.isEmpty();
    }

    function hasEmptyTemplate(dataset) {
      return dataset.templates && dataset.templates.empty;
    }
  },

  _hide: function() {
    this.$container.hide();
  },

  _show: function() {
    // can't use jQuery#show because $menu is a span element we want
    // display: block; not dislay: inline;
    this.$container.css('display', 'block');

    this._redraw();

    this.trigger('shown');
  },

  _redraw: function redraw() {
    if (!this.isOpen || !this.appendTo) return;

    this.trigger('redrawn');
  },

  _getSuggestions: function getSuggestions() {
    return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.suggestion));
  },

  _getCursor: function getCursor() {
    return this.$menu.find(_.className(this.cssClasses.prefix, this.cssClasses.cursor)).first();
  },

  _setCursor: function setCursor($el, updateInput) {
    $el.first()
      .addClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))
      .attr('aria-selected', 'true');
    this.trigger('cursorMoved', updateInput);
  },

  _removeCursor: function removeCursor() {
    this._getCursor()
      .removeClass(_.className(this.cssClasses.prefix, this.cssClasses.cursor, true))
      .removeAttr('aria-selected');
  },

  _moveCursor: function moveCursor(increment) {
    var $suggestions;
    var $oldCursor;
    var newCursorIndex;
    var $newCursor;

    if (!this.isOpen) {
      return;
    }

    $oldCursor = this._getCursor();
    $suggestions = this._getSuggestions();

    this._removeCursor();

    // shifting before and after modulo to deal with -1 index
    newCursorIndex = $suggestions.index($oldCursor) + increment;
    newCursorIndex = (newCursorIndex + 1) % ($suggestions.length + 1) - 1;

    if (newCursorIndex === -1) {
      this.trigger('cursorRemoved');

      return;
    } else if (newCursorIndex < -1) {
      newCursorIndex = $suggestions.length - 1;
    }

    this._setCursor($newCursor = $suggestions.eq(newCursorIndex), true);

    // in the case of scrollable overflow
    // make sure the cursor is visible in the menu
    this._ensureVisible($newCursor);
  },

  _ensureVisible: function ensureVisible($el) {
    var elTop;
    var elBottom;
    var menuScrollTop;
    var menuHeight;

    elTop = $el.position().top;
    elBottom = elTop + $el.height() +
      parseInt($el.css('margin-top'), 10) +
      parseInt($el.css('margin-bottom'), 10);
    menuScrollTop = this.$menu.scrollTop();
    menuHeight = this.$menu.height() +
      parseInt(this.$menu.css('padding-top'), 10) +
      parseInt(this.$menu.css('padding-bottom'), 10);

    if (elTop < 0) {
      this.$menu.scrollTop(menuScrollTop + elTop);
    } else if (menuHeight < elBottom) {
      this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
    }
  },

  // ### public

  close: function close() {
    if (this.isOpen) {
      this.isOpen = false;

      this._removeCursor();
      this._hide();

      this.trigger('closed');
    }
  },

  open: function open() {
    if (!this.isOpen) {
      this.isOpen = true;

      if (!this.isEmpty) {
        this._show();
      }

      this.trigger('opened');
    }
  },

  setLanguageDirection: function setLanguageDirection(dir) {
    this.$menu.css(dir === 'ltr' ? this.css.ltr : this.css.rtl);
  },

  moveCursorUp: function moveCursorUp() {
    this._moveCursor(-1);
  },

  moveCursorDown: function moveCursorDown() {
    this._moveCursor(+1);
  },

  getDatumForSuggestion: function getDatumForSuggestion($el) {
    var datum = null;

    if ($el.length) {
      datum = {
        raw: Dataset.extractDatum($el),
        value: Dataset.extractValue($el),
        datasetName: Dataset.extractDatasetName($el)
      };
    }

    return datum;
  },

  getCurrentCursor: function getCurrentCursor() {
    return this._getCursor().first();
  },

  getDatumForCursor: function getDatumForCursor() {
    return this.getDatumForSuggestion(this._getCursor().first());
  },

  getDatumForTopSuggestion: function getDatumForTopSuggestion() {
    return this.getDatumForSuggestion(this._getSuggestions().first());
  },

  cursorTopSuggestion: function cursorTopSuggestion() {
    this._setCursor(this._getSuggestions().first(), false);
  },

  update: function update(query) {
    _.each(this.datasets, updateDataset);

    function updateDataset(dataset) {
      dataset.update(query);
    }
  },

  empty: function empty() {
    _.each(this.datasets, clearDataset);
    this.isEmpty = true;

    function clearDataset(dataset) {
      dataset.clear();
    }
  },

  isVisible: function isVisible() {
    return this.isOpen && !this.isEmpty;
  },

  destroy: function destroy() {
    this.$menu.off('.aa');

    this.$menu = null;

    _.each(this.datasets, destroyDataset);

    function destroyDataset(dataset) {
      dataset.destroy();
    }
  }
});

// helper functions
// ----------------
Dropdown.Dataset = Dataset;

function initializeDataset($menu, oDataset, cssClasses) {
  return new Dropdown.Dataset(_.mixin({$menu: $menu, cssClasses: cssClasses}, oDataset));
}

module.exports = Dropdown;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js":
/*!********************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/event_bus.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var namespace = 'autocomplete:';

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");

// constructor
// -----------

function EventBus(o) {
  if (!o || !o.el) {
    _.error('EventBus initialized without el');
  }

  this.$el = DOM.element(o.el);
}

// instance methods
// ----------------

_.mixin(EventBus.prototype, {

  // ### public

  trigger: function(type, suggestion, dataset, context) {
    var event = _.Event(namespace + type);
    this.$el.trigger(event, [suggestion, dataset, context]);
    return event;
  }
});

module.exports = EventBus;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js":
/*!************************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/event_emitter.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var immediate = __webpack_require__(/*! immediate */ "./node_modules/immediate/lib/index.js");
var splitter = /\s+/;

module.exports = {
  onSync: onSync,
  onAsync: onAsync,
  off: off,
  trigger: trigger
};

function on(method, types, cb, context) {
  var type;

  if (!cb) {
    return this;
  }

  types = types.split(splitter);
  cb = context ? bindContext(cb, context) : cb;

  this._callbacks = this._callbacks || {};

  while (type = types.shift()) {
    this._callbacks[type] = this._callbacks[type] || {sync: [], async: []};
    this._callbacks[type][method].push(cb);
  }

  return this;
}

function onAsync(types, cb, context) {
  return on.call(this, 'async', types, cb, context);
}

function onSync(types, cb, context) {
  return on.call(this, 'sync', types, cb, context);
}

function off(types) {
  var type;

  if (!this._callbacks) {
    return this;
  }

  types = types.split(splitter);

  while (type = types.shift()) {
    delete this._callbacks[type];
  }

  return this;
}

function trigger(types) {
  var type;
  var callbacks;
  var args;
  var syncFlush;
  var asyncFlush;

  if (!this._callbacks) {
    return this;
  }

  types = types.split(splitter);
  args = [].slice.call(arguments, 1);

  while ((type = types.shift()) && (callbacks = this._callbacks[type])) { // eslint-disable-line
    syncFlush = getFlush(callbacks.sync, this, [type].concat(args));
    asyncFlush = getFlush(callbacks.async, this, [type].concat(args));

    if (syncFlush()) {
      immediate(asyncFlush);
    }
  }

  return this;
}

function getFlush(callbacks, context, args) {
  return flush;

  function flush() {
    var cancelled;

    for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
      // only cancel if the callback explicitly returns false
      cancelled = callbacks[i].apply(context, args) === false;
    }

    return !cancelled;
  }
}

function bindContext(fn, context) {
  return fn.bind ?
    fn.bind(context) :
    function() { fn.apply(context, [].slice.call(arguments, 0)); };
}


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/html.js":
/*!***************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/html.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  wrapper: '<span class="%ROOT%"></span>',
  dropdown: '<span class="%PREFIX%%DROPDOWN_MENU%"></span>',
  dataset: '<div class="%PREFIX%%DATASET%-%CLASS%"></div>',
  suggestions: '<span class="%PREFIX%%SUGGESTIONS%"></span>',
  suggestion: '<div class="%PREFIX%%SUGGESTION%"></div>'
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/input.js":
/*!****************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/input.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var specialKeyCodeMap;

specialKeyCodeMap = {
  9: 'tab',
  27: 'esc',
  37: 'left',
  39: 'right',
  13: 'enter',
  38: 'up',
  40: 'down'
};

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var EventEmitter = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/autocomplete.js/src/autocomplete/event_emitter.js");

// constructor
// -----------

function Input(o) {
  var that = this;
  var onBlur;
  var onFocus;
  var onKeydown;
  var onInput;

  o = o || {};

  if (!o.input) {
    _.error('input is missing');
  }

  // bound functions
  onBlur = _.bind(this._onBlur, this);
  onFocus = _.bind(this._onFocus, this);
  onKeydown = _.bind(this._onKeydown, this);
  onInput = _.bind(this._onInput, this);

  this.$hint = DOM.element(o.hint);
  this.$input = DOM.element(o.input)
    .on('blur.aa', onBlur)
    .on('focus.aa', onFocus)
    .on('keydown.aa', onKeydown);

  // if no hint, noop all the hint related functions
  if (this.$hint.length === 0) {
    this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
  }

  // ie7 and ie8 don't support the input event
  // ie9 doesn't fire the input event when characters are removed
  // not sure if ie10 is compatible
  if (!_.isMsie()) {
    this.$input.on('input.aa', onInput);
  } else {
    this.$input.on('keydown.aa keypress.aa cut.aa paste.aa', function($e) {
      // if a special key triggered this, ignore it
      if (specialKeyCodeMap[$e.which || $e.keyCode]) {
        return;
      }

      // give the browser a chance to update the value of the input
      // before checking to see if the query changed
      _.defer(_.bind(that._onInput, that, $e));
    });
  }

  // the query defaults to whatever the value of the input is
  // on initialization, it'll most likely be an empty string
  this.query = this.$input.val();

  // helps with calculating the width of the input's value
  this.$overflowHelper = buildOverflowHelper(this.$input);
}

// static methods
// --------------

Input.normalizeQuery = function(str) {
  // strips leading whitespace and condenses all whitespace
  return (str || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' ');
};

// instance methods
// ----------------

_.mixin(Input.prototype, EventEmitter, {

  // ### private

  _onBlur: function onBlur() {
    this.resetInputValue();
    this.$input.removeAttr('aria-activedescendant');
    this.trigger('blurred');
  },

  _onFocus: function onFocus() {
    this.trigger('focused');
  },

  _onKeydown: function onKeydown($e) {
    // which is normalized and consistent (but not for ie)
    var keyName = specialKeyCodeMap[$e.which || $e.keyCode];

    this._managePreventDefault(keyName, $e);
    if (keyName && this._shouldTrigger(keyName, $e)) {
      this.trigger(keyName + 'Keyed', $e);
    }
  },

  _onInput: function onInput() {
    this._checkInputValue();
  },

  _managePreventDefault: function managePreventDefault(keyName, $e) {
    var preventDefault;
    var hintValue;
    var inputValue;

    switch (keyName) {
    case 'tab':
      hintValue = this.getHint();
      inputValue = this.getInputValue();

      preventDefault = hintValue &&
        hintValue !== inputValue &&
        !withModifier($e);
      break;

    case 'up':
    case 'down':
      preventDefault = !withModifier($e);
      break;

    default:
      preventDefault = false;
    }

    if (preventDefault) {
      $e.preventDefault();
    }
  },

  _shouldTrigger: function shouldTrigger(keyName, $e) {
    var trigger;

    switch (keyName) {
    case 'tab':
      trigger = !withModifier($e);
      break;

    default:
      trigger = true;
    }

    return trigger;
  },

  _checkInputValue: function checkInputValue() {
    var inputValue;
    var areEquivalent;
    var hasDifferentWhitespace;

    inputValue = this.getInputValue();
    areEquivalent = areQueriesEquivalent(inputValue, this.query);
    hasDifferentWhitespace = areEquivalent && this.query ?
      this.query.length !== inputValue.length : false;

    this.query = inputValue;

    if (!areEquivalent) {
      this.trigger('queryChanged', this.query);
    } else if (hasDifferentWhitespace) {
      this.trigger('whitespaceChanged', this.query);
    }
  },

  // ### public

  focus: function focus() {
    this.$input.focus();
  },

  blur: function blur() {
    this.$input.blur();
  },

  getQuery: function getQuery() {
    return this.query;
  },

  setQuery: function setQuery(query) {
    this.query = query;
  },

  getInputValue: function getInputValue() {
    return this.$input.val();
  },

  setInputValue: function setInputValue(value, silent) {
    if (typeof value === 'undefined') {
      value = this.query;
    }
    this.$input.val(value);

    // silent prevents any additional events from being triggered
    if (silent) {
      this.clearHint();
    } else {
      this._checkInputValue();
    }
  },

  expand: function expand() {
    this.$input.attr('aria-expanded', 'true');
  },

  collapse: function collapse() {
    this.$input.attr('aria-expanded', 'false');
  },

  setActiveDescendant: function setActiveDescendant(activedescendantId) {
    this.$input.attr('aria-activedescendant', activedescendantId);
  },

  removeActiveDescendant: function removeActiveDescendant() {
    this.$input.removeAttr('aria-activedescendant');
  },

  resetInputValue: function resetInputValue() {
    this.setInputValue(this.query, true);
  },

  getHint: function getHint() {
    return this.$hint.val();
  },

  setHint: function setHint(value) {
    this.$hint.val(value);
  },

  clearHint: function clearHint() {
    this.setHint('');
  },

  clearHintIfInvalid: function clearHintIfInvalid() {
    var val;
    var hint;
    var valIsPrefixOfHint;
    var isValid;

    val = this.getInputValue();
    hint = this.getHint();
    valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
    isValid = val !== '' && valIsPrefixOfHint && !this.hasOverflow();

    if (!isValid) {
      this.clearHint();
    }
  },

  getLanguageDirection: function getLanguageDirection() {
    return (this.$input.css('direction') || 'ltr').toLowerCase();
  },

  hasOverflow: function hasOverflow() {
    // 2 is arbitrary, just picking a small number to handle edge cases
    var constraint = this.$input.width() - 2;

    this.$overflowHelper.text(this.getInputValue());

    return this.$overflowHelper.width() >= constraint;
  },

  isCursorAtEnd: function() {
    var valueLength;
    var selectionStart;
    var range;

    valueLength = this.$input.val().length;
    selectionStart = this.$input[0].selectionStart;

    if (_.isNumber(selectionStart)) {
      return selectionStart === valueLength;
    } else if (document.selection) {
      // NOTE: this won't work unless the input has focus, the good news
      // is this code should only get called when the input has focus
      range = document.selection.createRange();
      range.moveStart('character', -valueLength);

      return valueLength === range.text.length;
    }

    return true;
  },

  destroy: function destroy() {
    this.$hint.off('.aa');
    this.$input.off('.aa');

    this.$hint = this.$input = this.$overflowHelper = null;
  }
});

// helper functions
// ----------------

function buildOverflowHelper($input) {
  return DOM.element('<pre aria-hidden="true"></pre>')
    .css({
      // position helper off-screen
      position: 'absolute',
      visibility: 'hidden',
      // avoid line breaks and whitespace collapsing
      whiteSpace: 'pre',
      // use same font css as input to calculate accurate width
      fontFamily: $input.css('font-family'),
      fontSize: $input.css('font-size'),
      fontStyle: $input.css('font-style'),
      fontVariant: $input.css('font-variant'),
      fontWeight: $input.css('font-weight'),
      wordSpacing: $input.css('word-spacing'),
      letterSpacing: $input.css('letter-spacing'),
      textIndent: $input.css('text-indent'),
      textRendering: $input.css('text-rendering'),
      textTransform: $input.css('text-transform')
    })
    .insertAfter($input);
}

function areQueriesEquivalent(a, b) {
  return Input.normalizeQuery(a) === Input.normalizeQuery(b);
}

function withModifier($e) {
  return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
}

module.exports = Input;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/autocomplete/typeahead.js":
/*!********************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/autocomplete/typeahead.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var attrsKey = 'aaAttrs';

var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
var EventBus = __webpack_require__(/*! ./event_bus.js */ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js");
var Input = __webpack_require__(/*! ./input.js */ "./node_modules/autocomplete.js/src/autocomplete/input.js");
var Dropdown = __webpack_require__(/*! ./dropdown.js */ "./node_modules/autocomplete.js/src/autocomplete/dropdown.js");
var html = __webpack_require__(/*! ./html.js */ "./node_modules/autocomplete.js/src/autocomplete/html.js");
var css = __webpack_require__(/*! ./css.js */ "./node_modules/autocomplete.js/src/autocomplete/css.js");

// constructor
// -----------

// THOUGHT: what if datasets could dynamically be added/removed?
function Typeahead(o) {
  var $menu;
  var $hint;

  o = o || {};

  if (!o.input) {
    _.error('missing input');
  }

  this.isActivated = false;
  this.debug = !!o.debug;
  this.autoselect = !!o.autoselect;
  this.autoselectOnBlur = !!o.autoselectOnBlur;
  this.openOnFocus = !!o.openOnFocus;
  this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
  this.autoWidth = (o.autoWidth === undefined) ? true : !!o.autoWidth;
  this.clearOnSelected = !!o.clearOnSelected;
  this.tabAutocomplete = (o.tabAutocomplete === undefined) ? true : !!o.tabAutocomplete;

  o.hint = !!o.hint;

  if (o.hint && o.appendTo) {
    throw new Error('[autocomplete.js] hint and appendTo options can\'t be used at the same time');
  }

  this.css = o.css = _.mixin({}, css, o.appendTo ? css.appendTo : {});
  this.cssClasses = o.cssClasses = _.mixin({}, css.defaultClasses, o.cssClasses || {});
  this.cssClasses.prefix =
    o.cssClasses.formattedPrefix = _.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix);
  this.listboxId = o.listboxId = [this.cssClasses.root, 'listbox', _.getUniqueId()].join('-');

  var domElts = buildDom(o);

  this.$node = domElts.wrapper;
  var $input = this.$input = domElts.input;
  $menu = domElts.menu;
  $hint = domElts.hint;

  if (o.dropdownMenuContainer) {
    DOM.element(o.dropdownMenuContainer)
      .css('position', 'relative') // ensure the container has a relative position
      .append($menu.css('top', '0')); // override the top: 100%
  }

  // #705: if there's scrollable overflow, ie doesn't support
  // blur cancellations when the scrollbar is clicked
  //
  // #351: preventDefault won't cancel blurs in ie <= 8
  $input.on('blur.aa', function($e) {
    var active = document.activeElement;
    if (_.isMsie() && ($menu[0] === active || $menu[0].contains(active))) {
      $e.preventDefault();
      // stop immediate in order to prevent Input#_onBlur from
      // getting exectued
      $e.stopImmediatePropagation();
      _.defer(function() { $input.focus(); });
    }
  });

  // #351: prevents input blur due to clicks within dropdown menu
  $menu.on('mousedown.aa', function($e) { $e.preventDefault(); });

  this.eventBus = o.eventBus || new EventBus({el: $input});

  this.dropdown = new Typeahead.Dropdown({
    appendTo: o.appendTo,
    wrapper: this.$node,
    menu: $menu,
    datasets: o.datasets,
    templates: o.templates,
    cssClasses: o.cssClasses,
    minLength: this.minLength
  })
    .onSync('suggestionClicked', this._onSuggestionClicked, this)
    .onSync('cursorMoved', this._onCursorMoved, this)
    .onSync('cursorRemoved', this._onCursorRemoved, this)
    .onSync('opened', this._onOpened, this)
    .onSync('closed', this._onClosed, this)
    .onSync('shown', this._onShown, this)
    .onSync('empty', this._onEmpty, this)
    .onSync('redrawn', this._onRedrawn, this)
    .onAsync('datasetRendered', this._onDatasetRendered, this);

  this.input = new Typeahead.Input({input: $input, hint: $hint})
    .onSync('focused', this._onFocused, this)
    .onSync('blurred', this._onBlurred, this)
    .onSync('enterKeyed', this._onEnterKeyed, this)
    .onSync('tabKeyed', this._onTabKeyed, this)
    .onSync('escKeyed', this._onEscKeyed, this)
    .onSync('upKeyed', this._onUpKeyed, this)
    .onSync('downKeyed', this._onDownKeyed, this)
    .onSync('leftKeyed', this._onLeftKeyed, this)
    .onSync('rightKeyed', this._onRightKeyed, this)
    .onSync('queryChanged', this._onQueryChanged, this)
    .onSync('whitespaceChanged', this._onWhitespaceChanged, this);

  this._bindKeyboardShortcuts(o);

  this._setLanguageDirection();
}

// instance methods
// ----------------

_.mixin(Typeahead.prototype, {
  // ### private

  _bindKeyboardShortcuts: function(options) {
    if (!options.keyboardShortcuts) {
      return;
    }
    var $input = this.$input;
    var keyboardShortcuts = [];
    _.each(options.keyboardShortcuts, function(key) {
      if (typeof key === 'string') {
        key = key.toUpperCase().charCodeAt(0);
      }
      keyboardShortcuts.push(key);
    });
    DOM.element(document).keydown(function(event) {
      var elt = (event.target || event.srcElement);
      var tagName = elt.tagName;
      if (elt.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA') {
        // already in an input
        return;
      }

      var which = event.which || event.keyCode;
      if (keyboardShortcuts.indexOf(which) === -1) {
        // not the right shortcut
        return;
      }

      $input.focus();
      event.stopPropagation();
      event.preventDefault();
    });
  },

  _onSuggestionClicked: function onSuggestionClicked(type, $el) {
    var datum;
    var context = {selectionMethod: 'click'};

    if (datum = this.dropdown.getDatumForSuggestion($el)) {
      this._select(datum, context);
    }
  },

  _onCursorMoved: function onCursorMoved(event, updateInput) {
    var datum = this.dropdown.getDatumForCursor();
    var currentCursorId = this.dropdown.getCurrentCursor().attr('id');
    this.input.setActiveDescendant(currentCursorId);

    if (datum) {
      if (updateInput) {
        this.input.setInputValue(datum.value, true);
      }

      this.eventBus.trigger('cursorchanged', datum.raw, datum.datasetName);
    }
  },

  _onCursorRemoved: function onCursorRemoved() {
    this.input.resetInputValue();
    this._updateHint();
    this.eventBus.trigger('cursorremoved');
  },

  _onDatasetRendered: function onDatasetRendered() {
    this._updateHint();

    this.eventBus.trigger('updated');
  },

  _onOpened: function onOpened() {
    this._updateHint();
    this.input.expand();

    this.eventBus.trigger('opened');
  },

  _onEmpty: function onEmpty() {
    this.eventBus.trigger('empty');
  },

  _onRedrawn: function onRedrawn() {
    this.$node.css('top', 0 + 'px');
    this.$node.css('left', 0 + 'px');

    var inputRect = this.$input[0].getBoundingClientRect();

    if (this.autoWidth) {
      this.$node.css('width', inputRect.width + 'px');
    }

    var wrapperRect = this.$node[0].getBoundingClientRect();

    var top = inputRect.bottom - wrapperRect.top;
    this.$node.css('top', top + 'px');
    var left = inputRect.left - wrapperRect.left;
    this.$node.css('left', left + 'px');

    this.eventBus.trigger('redrawn');
  },

  _onShown: function onShown() {
    this.eventBus.trigger('shown');
    if (this.autoselect) {
      this.dropdown.cursorTopSuggestion();
    }
  },

  _onClosed: function onClosed() {
    this.input.clearHint();
    this.input.removeActiveDescendant();
    this.input.collapse();

    this.eventBus.trigger('closed');
  },

  _onFocused: function onFocused() {
    this.isActivated = true;

    if (this.openOnFocus) {
      var query = this.input.getQuery();
      if (query.length >= this.minLength) {
        this.dropdown.update(query);
      } else {
        this.dropdown.empty();
      }

      this.dropdown.open();
    }
  },

  _onBlurred: function onBlurred() {
    var cursorDatum;
    var topSuggestionDatum;

    cursorDatum = this.dropdown.getDatumForCursor();
    topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
    var context = {selectionMethod: 'blur'};

    if (!this.debug) {
      if (this.autoselectOnBlur && cursorDatum) {
        this._select(cursorDatum, context);
      } else if (this.autoselectOnBlur && topSuggestionDatum) {
        this._select(topSuggestionDatum, context);
      } else {
        this.isActivated = false;
        this.dropdown.empty();
        this.dropdown.close();
      }
    }
  },

  _onEnterKeyed: function onEnterKeyed(type, $e) {
    var cursorDatum;
    var topSuggestionDatum;

    cursorDatum = this.dropdown.getDatumForCursor();
    topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
    var context = {selectionMethod: 'enterKey'};

    if (cursorDatum) {
      this._select(cursorDatum, context);
      $e.preventDefault();
    } else if (this.autoselect && topSuggestionDatum) {
      this._select(topSuggestionDatum, context);
      $e.preventDefault();
    }
  },

  _onTabKeyed: function onTabKeyed(type, $e) {
    if (!this.tabAutocomplete) {
      // Closing the dropdown enables further tabbing
      this.dropdown.close();
      return;
    }

    var datum;
    var context = {selectionMethod: 'tabKey'};

    if (datum = this.dropdown.getDatumForCursor()) {
      this._select(datum, context);
      $e.preventDefault();
    } else {
      this._autocomplete(true);
    }
  },

  _onEscKeyed: function onEscKeyed() {
    this.dropdown.close();
    this.input.resetInputValue();
  },

  _onUpKeyed: function onUpKeyed() {
    var query = this.input.getQuery();

    if (this.dropdown.isEmpty && query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.moveCursorUp();
    }

    this.dropdown.open();
  },

  _onDownKeyed: function onDownKeyed() {
    var query = this.input.getQuery();

    if (this.dropdown.isEmpty && query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.moveCursorDown();
    }

    this.dropdown.open();
  },

  _onLeftKeyed: function onLeftKeyed() {
    if (this.dir === 'rtl') {
      this._autocomplete();
    }
  },

  _onRightKeyed: function onRightKeyed() {
    if (this.dir === 'ltr') {
      this._autocomplete();
    }
  },

  _onQueryChanged: function onQueryChanged(e, query) {
    this.input.clearHintIfInvalid();

    if (query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.empty();
    }

    this.dropdown.open();
    this._setLanguageDirection();
  },

  _onWhitespaceChanged: function onWhitespaceChanged() {
    this._updateHint();
    this.dropdown.open();
  },

  _setLanguageDirection: function setLanguageDirection() {
    var dir = this.input.getLanguageDirection();

    if (this.dir !== dir) {
      this.dir = dir;
      this.$node.css('direction', dir);
      this.dropdown.setLanguageDirection(dir);
    }
  },

  _updateHint: function updateHint() {
    var datum;
    var val;
    var query;
    var escapedQuery;
    var frontMatchRegEx;
    var match;

    datum = this.dropdown.getDatumForTopSuggestion();

    if (datum && this.dropdown.isVisible() && !this.input.hasOverflow()) {
      val = this.input.getInputValue();
      query = Input.normalizeQuery(val);
      escapedQuery = _.escapeRegExChars(query);

      // match input value, then capture trailing text
      frontMatchRegEx = new RegExp('^(?:' + escapedQuery + ')(.+$)', 'i');
      match = frontMatchRegEx.exec(datum.value);

      // clear hint if there's no trailing text
      if (match) {
        this.input.setHint(val + match[1]);
      } else {
        this.input.clearHint();
      }
    } else {
      this.input.clearHint();
    }
  },

  _autocomplete: function autocomplete(laxCursor) {
    var hint;
    var query;
    var isCursorAtEnd;
    var datum;

    hint = this.input.getHint();
    query = this.input.getQuery();
    isCursorAtEnd = laxCursor || this.input.isCursorAtEnd();

    if (hint && query !== hint && isCursorAtEnd) {
      datum = this.dropdown.getDatumForTopSuggestion();
      if (datum) {
        this.input.setInputValue(datum.value);
      }

      this.eventBus.trigger('autocompleted', datum.raw, datum.datasetName);
    }
  },

  _select: function select(datum, context) {
    if (typeof datum.value !== 'undefined') {
      this.input.setQuery(datum.value);
    }
    if (this.clearOnSelected) {
      this.setVal('');
    } else {
      this.input.setInputValue(datum.value, true);
    }

    this._setLanguageDirection();

    var event = this.eventBus.trigger('selected', datum.raw, datum.datasetName, context);
    if (event.isDefaultPrevented() === false) {
      this.dropdown.close();

      // #118: allow click event to bubble up to the body before removing
      // the suggestions otherwise we break event delegation
      _.defer(_.bind(this.dropdown.empty, this.dropdown));
    }
  },

  // ### public

  open: function open() {
    // if the menu is not activated yet, we need to update
    // the underlying dropdown menu to trigger the search
    // otherwise we're not gonna see anything
    if (!this.isActivated) {
      var query = this.input.getInputValue();
      if (query.length >= this.minLength) {
        this.dropdown.update(query);
      } else {
        this.dropdown.empty();
      }
    }
    this.dropdown.open();
  },

  close: function close() {
    this.dropdown.close();
  },

  setVal: function setVal(val) {
    // expect val to be a string, so be safe, and coerce
    val = _.toStr(val);

    if (this.isActivated) {
      this.input.setInputValue(val);
    } else {
      this.input.setQuery(val);
      this.input.setInputValue(val, true);
    }

    this._setLanguageDirection();
  },

  getVal: function getVal() {
    return this.input.getQuery();
  },

  destroy: function destroy() {
    this.input.destroy();
    this.dropdown.destroy();

    destroyDomStructure(this.$node, this.cssClasses);

    this.$node = null;
  },

  getWrapper: function getWrapper() {
    return this.dropdown.$container[0];
  }
});

function buildDom(options) {
  var $input;
  var $wrapper;
  var $dropdown;
  var $hint;

  $input = DOM.element(options.input);
  $wrapper = DOM
    .element(html.wrapper.replace('%ROOT%', options.cssClasses.root))
    .css(options.css.wrapper);

  // override the display property with the table-cell value
  // if the parent element is a table and the original input was a block
  //  -> https://github.com/algolia/autocomplete.js/issues/16
  if (!options.appendTo && $input.css('display') === 'block' && $input.parent().css('display') === 'table') {
    $wrapper.css('display', 'table-cell');
  }
  var dropdownHtml = html.dropdown.
    replace('%PREFIX%', options.cssClasses.prefix).
    replace('%DROPDOWN_MENU%', options.cssClasses.dropdownMenu);
  $dropdown = DOM.element(dropdownHtml)
    .css(options.css.dropdown)
    .attr({
      role: 'listbox',
      id: options.listboxId
    });
  if (options.templates && options.templates.dropdownMenu) {
    $dropdown.html(_.templatify(options.templates.dropdownMenu)());
  }
  $hint = $input.clone().css(options.css.hint).css(getBackgroundStyles($input));

  $hint
    .val('')
    .addClass(_.className(options.cssClasses.prefix, options.cssClasses.hint, true))
    .removeAttr('id name placeholder required')
    .prop('readonly', true)
    .attr({
      'aria-hidden': 'true',
      autocomplete: 'off',
      spellcheck: 'false',
      tabindex: -1
    });
  if ($hint.removeData) {
    $hint.removeData();
  }

  // store the original values of the attrs that get modified
  // so modifications can be reverted on destroy
  $input.data(attrsKey, {
    'aria-autocomplete': $input.attr('aria-autocomplete'),
    'aria-expanded': $input.attr('aria-expanded'),
    'aria-owns': $input.attr('aria-owns'),
    autocomplete: $input.attr('autocomplete'),
    dir: $input.attr('dir'),
    role: $input.attr('role'),
    spellcheck: $input.attr('spellcheck'),
    style: $input.attr('style'),
    type: $input.attr('type')
  });

  $input
    .addClass(_.className(options.cssClasses.prefix, options.cssClasses.input, true))
    .attr({
      autocomplete: 'off',
      spellcheck: false,

      // Accessibility features
      // Give the field a presentation of a "select".
      // Combobox is the combined presentation of a single line textfield
      // with a listbox popup.
      // https://www.w3.org/WAI/PF/aria/roles#combobox
      role: 'combobox',
      // Let the screen reader know the field has an autocomplete
      // feature to it.
      'aria-autocomplete': (options.datasets &&
        options.datasets[0] && options.datasets[0].displayKey ? 'both' : 'list'),
      // Indicates whether the dropdown it controls is currently expanded or collapsed
      'aria-expanded': 'false',
      'aria-label': options.ariaLabel,
      // Explicitly point to the listbox,
      // which is a list of suggestions (aka options)
      'aria-owns': options.listboxId
    })
    .css(options.hint ? options.css.input : options.css.inputWithNoHint);

  // ie7 does not like it when dir is set to auto
  try {
    if (!$input.attr('dir')) {
      $input.attr('dir', 'auto');
    }
  } catch (e) {
    // ignore
  }

  $wrapper = options.appendTo
    ? $wrapper.appendTo(DOM.element(options.appendTo).eq(0)).eq(0)
    : $input.wrap($wrapper).parent();

  $wrapper
    .prepend(options.hint ? $hint : null)
    .append($dropdown);

  return {
    wrapper: $wrapper,
    input: $input,
    hint: $hint,
    menu: $dropdown
  };
}

function getBackgroundStyles($el) {
  return {
    backgroundAttachment: $el.css('background-attachment'),
    backgroundClip: $el.css('background-clip'),
    backgroundColor: $el.css('background-color'),
    backgroundImage: $el.css('background-image'),
    backgroundOrigin: $el.css('background-origin'),
    backgroundPosition: $el.css('background-position'),
    backgroundRepeat: $el.css('background-repeat'),
    backgroundSize: $el.css('background-size')
  };
}

function destroyDomStructure($node, cssClasses) {
  var $input = $node.find(_.className(cssClasses.prefix, cssClasses.input));

  // need to remove attrs that weren't previously defined and
  // revert attrs that originally had a value
  _.each($input.data(attrsKey), function(val, key) {
    if (val === undefined) {
      $input.removeAttr(key);
    } else {
      $input.attr(key, val);
    }
  });

  $input
    .detach()
    .removeClass(_.className(cssClasses.prefix, cssClasses.input, true))
    .insertAfter($node);
  if ($input.removeData) {
    $input.removeData(attrsKey);
  }

  $node.remove();
}

Typeahead.Dropdown = Dropdown;
Typeahead.Input = Input;
Typeahead.sources = __webpack_require__(/*! ../sources/index.js */ "./node_modules/autocomplete.js/src/sources/index.js");

module.exports = Typeahead;


/***/ }),

/***/ "./node_modules/autocomplete.js/src/common/dom.js":
/*!********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/dom.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  element: null
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js":
/*!******************************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseAlgoliaClientVersion(agent) {
  var parsed =
    // User agent for algoliasearch >= 3.33.0
    agent.match(/Algolia for JavaScript \((\d+\.)(\d+\.)(\d+)\)/) ||
    // User agent for algoliasearch < 3.33.0
    agent.match(/Algolia for vanilla JavaScript (\d+\.)(\d+\.)(\d+)/);

  if (parsed) {
    return [parsed[1], parsed[2], parsed[3]];
  }

  return undefined;
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/common/utils.js":
/*!**********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/common/utils.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DOM = __webpack_require__(/*! ./dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

module.exports = {
  // those methods are implemented differently
  // depending on which build it is, using
  // $... or angular... or Zepto... or require(...)
  isArray: null,
  isFunction: null,
  isObject: null,
  bind: null,
  each: null,
  map: null,
  mixin: null,

  isMsie: function(agentString) {
    if (agentString === undefined) { agentString = navigator.userAgent; }
    // from https://github.com/ded/bowser/blob/master/bowser.js
    if ((/(msie|trident)/i).test(agentString)) {
      var match = agentString.match(/(msie |rv:)(\d+(.\d+)?)/i);
      if (match) { return match[2]; }
    }
    return false;
  },

  // http://stackoverflow.com/a/6969486
  escapeRegExChars: function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  },

  isNumber: function(obj) { return typeof obj === 'number'; },

  toStr: function toStr(s) {
    return s === undefined || s === null ? '' : s + '';
  },

  cloneDeep: function cloneDeep(obj) {
    var clone = this.mixin({}, obj);
    var self = this;
    this.each(clone, function(value, key) {
      if (value) {
        if (self.isArray(value)) {
          clone[key] = [].concat(value);
        } else if (self.isObject(value)) {
          clone[key] = self.cloneDeep(value);
        }
      }
    });
    return clone;
  },

  error: function(msg) {
    throw new Error(msg);
  },

  every: function(obj, test) {
    var result = true;
    if (!obj) {
      return result;
    }
    this.each(obj, function(val, key) {
      if (result) {
        result = test.call(null, val, key, obj) && result;
      }
    });
    return !!result;
  },

  any: function(obj, test) {
    var found = false;
    if (!obj) {
      return found;
    }
    this.each(obj, function(val, key) {
      if (test.call(null, val, key, obj)) {
        found = true;
        return false;
      }
    });
    return found;
  },

  getUniqueId: (function() {
    var counter = 0;
    return function() { return counter++; };
  })(),

  templatify: function templatify(obj) {
    if (this.isFunction(obj)) {
      return obj;
    }
    var $template = DOM.element(obj);
    if ($template.prop('tagName') === 'SCRIPT') {
      return function template() { return $template.text(); };
    }
    return function template() { return String(obj); };
  },

  defer: function(fn) { setTimeout(fn, 0); },

  noop: function() {},

  formatPrefix: function(prefix, noPrefix) {
    return noPrefix ? '' : prefix + '-';
  },

  className: function(prefix, clazz, skipDot) {
    return (skipDot ? '' : '.') + prefix + clazz;
  },

  escapeHighlightedString: function(str, highlightPreTag, highlightPostTag) {
    highlightPreTag = highlightPreTag || '<em>';
    var pre = document.createElement('div');
    pre.appendChild(document.createTextNode(highlightPreTag));

    highlightPostTag = highlightPostTag || '</em>';
    var post = document.createElement('div');
    post.appendChild(document.createTextNode(highlightPostTag));

    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML
      .replace(RegExp(escapeRegExp(pre.innerHTML), 'g'), highlightPreTag)
      .replace(RegExp(escapeRegExp(post.innerHTML), 'g'), highlightPostTag);
  }
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/sources/hits.js":
/*!**********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/hits.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var version = __webpack_require__(/*! ../../version.js */ "./node_modules/autocomplete.js/version.js");
var parseAlgoliaClientVersion = __webpack_require__(/*! ../common/parseAlgoliaClientVersion.js */ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js");

module.exports = function search(index, params) {
  var algoliaVersion = parseAlgoliaClientVersion(index.as._ua);
  if (algoliaVersion && algoliaVersion[0] >= 3 && algoliaVersion[1] > 20) {
    params = params || {};
    params.additionalUA = 'autocomplete.js ' + version;
  }
  return sourceFn;

  function sourceFn(query, cb) {
    index.search(query, params, function(error, content) {
      if (error) {
        _.error(error.message);
        return;
      }
      cb(content.hits, content);
    });
  }
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/sources/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  hits: __webpack_require__(/*! ./hits.js */ "./node_modules/autocomplete.js/src/sources/hits.js"),
  popularIn: __webpack_require__(/*! ./popularIn.js */ "./node_modules/autocomplete.js/src/sources/popularIn.js")
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/sources/popularIn.js":
/*!***************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/sources/popularIn.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
var version = __webpack_require__(/*! ../../version.js */ "./node_modules/autocomplete.js/version.js");
var parseAlgoliaClientVersion = __webpack_require__(/*! ../common/parseAlgoliaClientVersion.js */ "./node_modules/autocomplete.js/src/common/parseAlgoliaClientVersion.js");

module.exports = function popularIn(index, params, details, options) {
  var algoliaVersion = parseAlgoliaClientVersion(index.as._ua);
  if (algoliaVersion && algoliaVersion[0] >= 3 && algoliaVersion[1] > 20) {
    params = params || {};
    params.additionalUA = 'autocomplete.js ' + version;
  }
  if (!details.source) {
    return _.error("Missing 'source' key");
  }
  var source = _.isFunction(details.source) ? details.source : function(hit) { return hit[details.source]; };

  if (!details.index) {
    return _.error("Missing 'index' key");
  }
  var detailsIndex = details.index;

  options = options || {};

  return sourceFn;

  function sourceFn(query, cb) {
    index.search(query, params, function(error, content) {
      if (error) {
        _.error(error.message);
        return;
      }

      if (content.hits.length > 0) {
        var first = content.hits[0];

        var detailsParams = _.mixin({hitsPerPage: 0}, details);
        delete detailsParams.source; // not a query parameter
        delete detailsParams.index; // not a query parameter

        var detailsAlgoliaVersion = parseAlgoliaClientVersion(detailsIndex.as._ua);
        if (detailsAlgoliaVersion && detailsAlgoliaVersion[0] >= 3 && detailsAlgoliaVersion[1] > 20) {
          params.additionalUA = 'autocomplete.js ' + version;
        }

        detailsIndex.search(source(first), detailsParams, function(error2, content2) {
          if (error2) {
            _.error(error2.message);
            return;
          }

          var suggestions = [];

          // add the 'all department' entry before others
          if (options.includeAll) {
            var label = options.allTitle || 'All departments';
            suggestions.push(_.mixin({
              facet: {value: label, count: content2.nbHits}
            }, _.cloneDeep(first)));
          }

          // enrich the first hit iterating over the facets
          _.each(content2.facets, function(values, facet) {
            _.each(values, function(count, value) {
              suggestions.push(_.mixin({
                facet: {facet: facet, value: value, count: count}
              }, _.cloneDeep(first)));
            });
          });

          // append all other hits
          for (var i = 1; i < content.hits.length; ++i) {
            suggestions.push(content.hits[i]);
          }

          cb(suggestions, content);
        });

        return;
      }

      cb([]);
    });
  }
};


/***/ }),

/***/ "./node_modules/autocomplete.js/src/standalone/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/autocomplete.js/src/standalone/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// this will inject Zepto in window, unfortunately no easy commonJS zepto build
var zepto = __webpack_require__(/*! ../../zepto.js */ "./node_modules/autocomplete.js/zepto.js");

// setup DOM element
var DOM = __webpack_require__(/*! ../common/dom.js */ "./node_modules/autocomplete.js/src/common/dom.js");
DOM.element = zepto;

// setup utils functions
var _ = __webpack_require__(/*! ../common/utils.js */ "./node_modules/autocomplete.js/src/common/utils.js");
_.isArray = zepto.isArray;
_.isFunction = zepto.isFunction;
_.isObject = zepto.isPlainObject;
_.bind = zepto.proxy;
_.each = function(collection, cb) {
  // stupid argument order for jQuery.each
  zepto.each(collection, reverseArgs);
  function reverseArgs(index, value) {
    return cb(value, index);
  }
};
_.map = zepto.map;
_.mixin = zepto.extend;
_.Event = zepto.Event;

var typeaheadKey = 'aaAutocomplete';
var Typeahead = __webpack_require__(/*! ../autocomplete/typeahead.js */ "./node_modules/autocomplete.js/src/autocomplete/typeahead.js");
var EventBus = __webpack_require__(/*! ../autocomplete/event_bus.js */ "./node_modules/autocomplete.js/src/autocomplete/event_bus.js");

function autocomplete(selector, options, datasets, typeaheadObject) {
  datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 2);

  var inputs = zepto(selector).each(function(i, input) {
    var $input = zepto(input);
    var eventBus = new EventBus({el: $input});
    var typeahead = typeaheadObject || new Typeahead({
      input: $input,
      eventBus: eventBus,
      dropdownMenuContainer: options.dropdownMenuContainer,
      hint: options.hint === undefined ? true : !!options.hint,
      minLength: options.minLength,
      autoselect: options.autoselect,
      autoselectOnBlur: options.autoselectOnBlur,
      tabAutocomplete: options.tabAutocomplete,
      openOnFocus: options.openOnFocus,
      templates: options.templates,
      debug: options.debug,
      clearOnSelected: options.clearOnSelected,
      cssClasses: options.cssClasses,
      datasets: datasets,
      keyboardShortcuts: options.keyboardShortcuts,
      appendTo: options.appendTo,
      autoWidth: options.autoWidth,
      ariaLabel: options.ariaLabel || input.getAttribute('aria-label')
    });
    $input.data(typeaheadKey, typeahead);
  });

  // expose all methods in the `autocomplete` attribute
  inputs.autocomplete = {};
  _.each(['open', 'close', 'getVal', 'setVal', 'destroy', 'getWrapper'], function(method) {
    inputs.autocomplete[method] = function() {
      var methodArguments = arguments;
      var result;
      inputs.each(function(j, input) {
        var typeahead = zepto(input).data(typeaheadKey);
        result = typeahead[method].apply(typeahead, methodArguments);
      });
      return result;
    };
  });

  return inputs;
}

autocomplete.sources = Typeahead.sources;
autocomplete.escapeHighlightedString = _.escapeHighlightedString;

var wasAutocompleteSet = 'autocomplete' in window;
var oldAutocomplete = window.autocomplete;
autocomplete.noConflict = function noConflict() {
  if (wasAutocompleteSet) {
    window.autocomplete = oldAutocomplete;
  } else {
    delete window.autocomplete;
  }
  return autocomplete;
};

module.exports = autocomplete;


/***/ }),

/***/ "./node_modules/autocomplete.js/version.js":
/*!*************************************************!*\
  !*** ./node_modules/autocomplete.js/version.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "0.37.1";


/***/ }),

/***/ "./node_modules/autocomplete.js/zepto.js":
/*!***********************************************!*\
  !*** ./node_modules/autocomplete.js/zepto.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* istanbul ignore next */
/* Zepto v1.2.0 - zepto event assets data - zeptojs.com/license */
(function(global, factory) {
  module.exports = factory(global);
}(/* this ##### UPDATED: here we want to use window/global instead of this which is the current file context ##### */ window, function(window) {
  var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.matches || element.webkitMatchesSelector ||
                          element.mozMatchesSelector || element.oMatchesSelector ||
                          element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }

  function likeArray(obj) {
    var length = !!obj && 'length' in obj && obj.length,
      type = $.type(obj)

    return 'function' != type && !isWindow(obj) && (
      'array' == type || length === 0 ||
        (typeof length == 'number' && length > 0 && (length - 1) in obj)
    )
  }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overridden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. This method can be overridden in plugins.
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overridden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overridden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overridden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
      slice.call(
        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          +value + "" == value ? +value :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.isNumeric = function(val) {
    var num = Number(val), type = typeof val
    return val != null && type != 'boolean' &&
      (type != 'string' || val.length) &&
      !isNaN(num) && isFinite(num) || false
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }
  $.noop = function() {}

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    constructor: zepto.Z,
    length: 0,

    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    splice: emptyArray.splice,
    indexOf: emptyArray.indexOf,
    concat: function(){
      var i, value, args = []
      for (i = 0; i < arguments.length; i++) {
        value = arguments[i]
        args[i] = zepto.isZ(value) ? value.toArray() : value
      }
      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
    },

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (!selector) result = $()
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var nodes = [], collection = typeof selector == 'object' && $(selector)
      this.each(function(_, node){
        while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
          node = node !== context && !isDocument(node) && node.parentNode
        if (node && nodes.indexOf(node) < 0) nodes.push(node)
      })
      return $(nodes)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this.pluck('textContent').join("") : null)
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
        setAttribute(this, attribute)
      }, this)})
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :
        (this[0] && this[0][name])
    },
    removeProp: function(name){
      name = propMap[name] || name
      return this.each(function(){ delete this[name] })
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      if (0 in arguments) {
        if (value == null) value = ""
        return this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
      } else {
        return this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
      }
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (!this.length) return null
      if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))
        return {top: 0, left: 0}
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var element = this[0]
        if (typeof property == 'string') {
          if (!element) return
          return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
        } else if (isArray(property)) {
          if (!element) return
          var props = {}
          var computedStyle = getComputedStyle(element, '')
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        if (!('className' in this)) return
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (!('className' in this)) return
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            var arr = []
            argType = type(arg)
            if (argType == "array") {
              arg.forEach(function(el) {
                if (el.nodeType !== undefined) return arr.push(el)
                else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())
                arr = arr.concat(zepto.fragment(el))
              })
              return arr
            }
            return argType == "object" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src){
              var target = el.ownerDocument ? el.ownerDocument.defaultView : window
              target['eval'].call(target, el.innerHTML)
            }
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        try {
          var dataPropDescriptor = Object.getOwnPropertyDescriptor(e, 'data')
          if (!dataPropDescriptor || dataPropDescriptor.writable)
            e.data = data
        } catch (e) {} // when using strict mode dataPropDescriptor will be undefined when e is InputEvent (even though data property exists). So we surround with try/catch
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2)
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn)
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      try {
        event.timeStamp || (event.timeStamp = Date.now())
      } catch (ignored) { }

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (callback === undefined || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return (0 in arguments) ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function($){
  var cache = [], timeout

  $.fn.remove = function(){
    return this.each(function(){
      if(this.parentNode){
        if(this.tagName === 'IMG'){
          cache.push(this)
          this.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
          if (timeout) clearTimeout(timeout)
          timeout = setTimeout(function(){ cache = [] }, 60000)
        }
        this.parentNode.removeChild(this)
      }
    })
  }
})(Zepto)

;(function($){
  var data = {}, dataAttr = $.fn.data, camelize = $.camelCase,
    exp = $.expando = 'Zepto' + (+new Date()), emptyArray = []

  // Get value from node:
  // 1. first try key as given,
  // 2. then try camelized key,
  // 3. fall back to reading "data-*" attribute.
  function getData(node, name) {
    var id = node[exp], store = id && data[id]
    if (name === undefined) return store || setData(node)
    else {
      if (store) {
        if (name in store) return store[name]
        var camelName = camelize(name)
        if (camelName in store) return store[camelName]
      }
      return dataAttr.call($(node), name)
    }
  }

  // Store value under camelized key on node
  function setData(node, name, value) {
    var id = node[exp] || (node[exp] = ++$.uuid),
      store = data[id] || (data[id] = attributeData(node))
    if (name !== undefined) store[camelize(name)] = value
    return store
  }

  // Read all "data-*" attributes from a node
  function attributeData(node) {
    var store = {}
    $.each(node.attributes || emptyArray, function(i, attr){
      if (attr.name.indexOf('data-') == 0)
        store[camelize(attr.name.replace('data-', ''))] =
          $.zepto.deserializeValue(attr.value)
    })
    return store
  }

  $.fn.data = function(name, value) {
    return value === undefined ?
      // set multiple values via object
      $.isPlainObject(name) ?
        this.each(function(i, node){
          $.each(name, function(key, value){ setData(node, key, value) })
        }) :
        // get value from first element
        (0 in this ? getData(this[0], name) : undefined) :
      // set value on all elements
      this.each(function(){ setData(this, name, value) })
  }

  $.data = function(elem, name, value) {
    return $(elem).data(name, value)
  }

  $.hasData = function(elem) {
    var id = elem[exp], store = id && data[id]
    return store ? !$.isEmptyObject(store) : false
  }

  $.fn.removeData = function(names) {
    if (typeof names == 'string') names = names.split(/\s+/)
    return this.each(function(){
      var id = this[exp], store = id && data[id]
      if (store) $.each(names || store, function(key){
        delete store[names ? camelize(this) : key]
      })
    })
  }

  // Generate extended `remove` and `empty` functions
  ;['remove', 'empty'].forEach(function(methodName){
    var origFn = $.fn[methodName]
    $.fn[methodName] = function() {
      var elements = this.find('*')
      if (methodName === 'remove') elements = elements.add(this)
      elements.removeData()
      return origFn.call(this)
    }
  })
})(Zepto)
  return Zepto
}))


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/style.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Acme&display=swap);"]);
// Module
exports.push([module.i, "@-webkit-keyframes backPulse {\n  from {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  to {\n    -webkit-transform: scale(1.2);\n            transform: scale(1.2);\n  }\n}\n@keyframes backPulse {\n  from {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  to {\n    -webkit-transform: scale(1.2);\n            transform: scale(1.2);\n  }\n}\n\n@-webkit-keyframes backOutDown {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  20% {\n    -webkit-transform: translate(0px) scale(0.7);\n            transform: translate(0px) scale(0.7);\n    opacity: 0.7;\n  }\n  100% {\n    -webkit-transform: translateY(700px) scale(0.7);\n            transform: translateY(700px) scale(0.7);\n  }\n}\n\n@keyframes backOutDown {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  20% {\n    -webkit-transform: translate(0px) scale(0.7);\n            transform: translate(0px) scale(0.7);\n    opacity: 0.7;\n  }\n  100% {\n    -webkit-transform: translateY(700px) scale(0.7);\n            transform: translateY(700px) scale(0.7);\n  }\n}\n\n@-webkit-keyframes backOutUp {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  20% {\n    -webkit-transform: translate(0px) scale(0.7);\n            transform: translate(0px) scale(0.7);\n    opacity: 0.7;\n  }\n  100% {\n    -webkit-transform: translateY(-700px) scale(0.7);\n            transform: translateY(-700px) scale(0.7);\n  }\n}\n\n@keyframes backOutUp {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  20% {\n    -webkit-transform: translate(0px) scale(0.7);\n            transform: translate(0px) scale(0.7);\n    opacity: 0.7;\n  }\n  100% {\n    -webkit-transform: translateY(-700px) scale(0.7);\n            transform: translateY(-700px) scale(0.7);\n  }\n}\n\nbody {\n  background: black;\n  color: #fbaf00;\n  font-family: \"Acme\", sans-serif;\n  overflow: hidden;\n}\n\n#loading-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100vh;\n  display: none;\n}\n\n#loading-container img {\n  width: 10vw;\n}\n\n#search-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100vh;\n  min-width: 700px;\n}\n\n#search-container h1 {\n  line-height: 108px;\n  font-weight: 700;\n  font-size: 4.6vh;\n  color: #997f41;\n}\n\n#search-container .search-btn {\n  font-size: 1.5em;\n  border-radius: 5px;\n  background-color: transparent;\n  outline: none;\n  color: #997f41;\n  border: 1px solid #997f41;\n}\n\n#search-container .search-btn:hover {\n  -webkit-animation-duration: 0.5s;\n          animation-duration: 0.5s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-name: backPulse;\n          animation-name: backPulse;\n  -webkit-animation-direction: alternate;\n          animation-direction: alternate;\n  -webkit-animation-timing-function: ease;\n          animation-timing-function: ease;\n  -webkit-animation-delay: 0;\n          animation-delay: 0;\n  cursor: pointer;\n}\n\n#search-container #search-query,\n#search-container .ap-name {\n  color: #3a7ca5;\n}\n\n.backOutUp {\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n  -webkit-animation-iteration-count: 1;\n          animation-iteration-count: 1;\n  -webkit-animation-name: backOutUp;\n          animation-name: backOutUp;\n  -webkit-animation-direction: normal;\n          animation-direction: normal;\n  -webkit-animation-timing-function: ease;\n          animation-timing-function: ease;\n  -webkit-animation-delay: 0.3;\n          animation-delay: 0.3;\n}\n\n.backOutDown {\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n  -webkit-animation-iteration-count: 1;\n          animation-iteration-count: 1;\n  -webkit-animation-name: backOutDown;\n          animation-name: backOutDown;\n  -webkit-animation-direction: normal;\n          animation-direction: normal;\n  -webkit-animation-timing-function: ease;\n          animation-timing-function: ease;\n  -webkit-animation-delay: 0.3;\n          animation-delay: 0.3;\n  pointer-events: none;\n}\n\n.algolia-places {\n  width: 50%;\n  margin-bottom: 20px;\n}\n\nbutton.ap-input-icon:nth-child(5) {\n  display: none;\n}\n\n#result-container {\n  display: none;\n}\n\n#result-container #location-name {\n  height: 10vh;\n  text-align: center;\n  font-size: 3vw;\n}\n\n#result-container #weather-container {\n  height: 45vh;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n#result-container #temperature-container {\n  background: #0c554e;\n  height: 60%;\n  width: 25vw;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 10px;\n  text-align: center;\n  border: 1px solid white;\n  border-radius: 10px;\n}\n\n#result-container #condition-container {\n  background: #0c554e;\n  height: 60%;\n  width: 25vw;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 10px;\n  text-align: center;\n  border: 1px solid white;\n  border-radius: 10px;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n#result-container #change-temp {\n  font-size: 2.3vw;\n}\n\n#result-container #change-temp button {\n  border-radius: 5px;\n  background: #6031a4;\n  color: #ffb300;\n  width: 40%;\n  border: 2px solid black;\n  cursor: pointer;\n}\n\n#result-container #change-temp button:hover {\n  opacity: 0.8;\n  border: 2px solid white;\n}\n\n#result-container #change-temp button:active {\n  opacity: 0.5;\n}\n\n#result-container #temp-info-container {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: space-evenly;\n      -ms-flex-pack: space-evenly;\n          justify-content: space-evenly;\n  width: 50%;\n}\n\n#result-container #condition {\n  font-size: 3.37vw;\n  margin: 0;\n}\n\n#result-container #temperature {\n  font-size: 4.6vw;\n  margin: 0;\n  z-index: 1;\n}\n\n#result-container #search-btn {\n  cursor: pointer;\n  border-radius: 50%;\n  -webkit-transition: all 0.2s linear;\n  transition: all 0.2s linear;\n  max-height: 200px;\n}\n\n#result-container #search-btn:hover {\n  -webkit-box-shadow: 0 0 15px #78b9eb;\n          box-shadow: 0 0 15px #78b9eb;\n}\n\n#result-container iframe {\n  height: 35vh;\n  width: 50%;\n  margin: auto;\n  display: block;\n  border-radius: 15px;\n}\n\n#result-container img[src$='.svg'] {\n  height: 70%;\n  max-width: 50%;\n}\n\n.F::after {\n  content: '\\2109';\n}\n\n.C::after {\n  content: '\\2103';\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/foreach/index.js":
/*!***************************************!*\
  !*** ./node_modules/foreach/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),

/***/ "./node_modules/global/window.js":
/*!***************************************!*\
  !*** ./node_modules/global/window.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/immediate/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var types = [
  __webpack_require__(/*! ./nextTick */ "./node_modules/immediate/lib/nextTick.js"),
  __webpack_require__(/*! ./mutation.js */ "./node_modules/immediate/lib/mutation.js"),
  __webpack_require__(/*! ./messageChannel */ "./node_modules/immediate/lib/messageChannel.js"),
  __webpack_require__(/*! ./stateChange */ "./node_modules/immediate/lib/stateChange.js"),
  __webpack_require__(/*! ./timeout */ "./node_modules/immediate/lib/timeout.js")
];
var draining;
var currentQueue;
var queueIndex = -1;
var queue = [];
var scheduled = false;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    nextTick();
  }
}

//named nextTick for less confusing stack traces
function nextTick() {
  if (draining) {
    return;
  }
  scheduled = false;
  draining = true;
  var len = queue.length;
  var timeout = setTimeout(cleanUpNextTick);
  while (len) {
    currentQueue = queue;
    queue = [];
    while (currentQueue && ++queueIndex < len) {
      currentQueue[queueIndex].run();
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  queueIndex = -1;
  draining = false;
  clearTimeout(timeout);
}
var scheduleDrain;
var i = -1;
var len = types.length;
while (++i < len) {
  if (types[i] && types[i].test && types[i].test()) {
    scheduleDrain = types[i].install(nextTick);
    break;
  }
}
// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  var fun = this.fun;
  var array = this.array;
  switch (array.length) {
  case 0:
    return fun();
  case 1:
    return fun(array[0]);
  case 2:
    return fun(array[0], array[1]);
  case 3:
    return fun(array[0], array[1], array[2]);
  default:
    return fun.apply(null, array);
  }

};
module.exports = immediate;
function immediate(task) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(task, args));
  if (!scheduled && !draining) {
    scheduled = true;
    scheduleDrain();
  }
}


/***/ }),

/***/ "./node_modules/immediate/lib/messageChannel.js":
/*!******************************************************!*\
  !*** ./node_modules/immediate/lib/messageChannel.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.test = function () {
  if (global.setImmediate) {
    // we can only get here in IE10
    // which doesn't handel postMessage well
    return false;
  }
  return typeof global.MessageChannel !== 'undefined';
};

exports.install = function (func) {
  var channel = new global.MessageChannel();
  channel.port1.onmessage = func;
  return function () {
    channel.port2.postMessage(0);
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/mutation.js":
/*!************************************************!*\
  !*** ./node_modules/immediate/lib/mutation.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
//based off rsvp https://github.com/tildeio/rsvp.js
//license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

var Mutation = global.MutationObserver || global.WebKitMutationObserver;

exports.test = function () {
  return Mutation;
};

exports.install = function (handle) {
  var called = 0;
  var observer = new Mutation(handle);
  var element = global.document.createTextNode('');
  observer.observe(element, {
    characterData: true
  });
  return function () {
    element.data = (called = ++called % 2);
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/nextTick.js":
/*!************************************************!*\
  !*** ./node_modules/immediate/lib/nextTick.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
exports.test = function () {
  // Don't get fooled by e.g. browserify environments.
  return (typeof process !== 'undefined') && !process.browser;
};

exports.install = function (func) {
  return function () {
    process.nextTick(func);
  };
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/stateChange.js":
/*!***************************************************!*\
  !*** ./node_modules/immediate/lib/stateChange.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.test = function () {
  return 'document' in global && 'onreadystatechange' in global.document.createElement('script');
};

exports.install = function (handle) {
  return function () {

    // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
    // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
    var scriptEl = global.document.createElement('script');
    scriptEl.onreadystatechange = function () {
      handle();

      scriptEl.onreadystatechange = null;
      scriptEl.parentNode.removeChild(scriptEl);
      scriptEl = null;
    };
    global.document.documentElement.appendChild(scriptEl);

    return handle;
  };
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/immediate/lib/timeout.js":
/*!***********************************************!*\
  !*** ./node_modules/immediate/lib/timeout.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.test = function () {
  return true;
};

exports.install = function (t) {
  return function () {
    setTimeout(t, 0);
  };
};

/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/insert-css/index.js":
/*!******************************************!*\
  !*** ./node_modules/insert-css/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var containers = []; // will store container HTMLElement references
var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

function insertCss(css, options) {
    options = options || {};

    if (css === undefined) {
        throw new Error(usage);
    }

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css
    } else {
        styleElement.textContent += css;
    }

    return styleElement;
};

function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

module.exports = insertCss;
module.exports.insertCss = insertCss;


/***/ }),

/***/ "./node_modules/normalize.css/normalize.css":
/*!**************************************************!*\
  !*** ./node_modules/normalize.css/normalize.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../css-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/places.js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/places.js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// we need to export using commonjs for ease of usage in all
// JavaScript environments
// We therefore need to import in commonjs too. see:
// https://github.com/webpack/webpack/issues/4039

/* eslint-disable import/no-commonjs */
var places = __webpack_require__(/*! ./src/places */ "./node_modules/places.js/src/places.js");

var version = __webpack_require__(/*! ./src/version */ "./node_modules/places.js/src/version.js"); // must use module.exports to be commonJS compatible


module.exports = places["default"];
module.exports.version = version["default"];
/* eslint-enable import/no-commonjs */


/***/ }),

/***/ "./node_modules/places.js/src/configure/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/places.js/src/configure/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var extractParams = function extractParams(_ref) {
  var hitsPerPage = _ref.hitsPerPage,
      postcodeSearch = _ref.postcodeSearch,
      aroundLatLng = _ref.aroundLatLng,
      aroundRadius = _ref.aroundRadius,
      aroundLatLngViaIP = _ref.aroundLatLngViaIP,
      insideBoundingBox = _ref.insideBoundingBox,
      insidePolygon = _ref.insidePolygon,
      getRankingInfo = _ref.getRankingInfo,
      countries = _ref.countries,
      language = _ref.language,
      type = _ref.type;
  var extracted = {
    countries: countries,
    hitsPerPage: hitsPerPage || 5,
    language: language || navigator.language.split('-')[0],
    type: type
  };

  if (Array.isArray(countries)) {
    extracted.countries = extracted.countries.map(function (country) {
      return country.toLowerCase();
    });
  }

  if (typeof extracted.language === 'string') {
    extracted.language = extracted.language.toLowerCase();
  }

  if (aroundLatLng) {
    extracted.aroundLatLng = aroundLatLng;
  } else if (aroundLatLngViaIP !== undefined) {
    extracted.aroundLatLngViaIP = aroundLatLngViaIP;
  }

  if (postcodeSearch) {
    extracted.restrictSearchableAttributes = 'postcode';
  }

  return _objectSpread({}, extracted, {
    aroundRadius: aroundRadius,
    insideBoundingBox: insideBoundingBox,
    insidePolygon: insidePolygon,
    getRankingInfo: getRankingInfo
  });
};

var extractControls = function extractControls(_ref2) {
  var _ref2$useDeviceLocati = _ref2.useDeviceLocation,
      useDeviceLocation = _ref2$useDeviceLocati === void 0 ? false : _ref2$useDeviceLocati,
      _ref2$computeQueryPar = _ref2.computeQueryParams,
      computeQueryParams = _ref2$computeQueryPar === void 0 ? function (params) {
    return params;
  } : _ref2$computeQueryPar,
      formatInputValue = _ref2.formatInputValue,
      _ref2$onHits = _ref2.onHits,
      onHits = _ref2$onHits === void 0 ? function () {} : _ref2$onHits,
      _ref2$onError = _ref2.onError,
      onError = _ref2$onError === void 0 ? function (e) {
    throw e;
  } : _ref2$onError,
      onRateLimitReached = _ref2.onRateLimitReached,
      onInvalidCredentials = _ref2.onInvalidCredentials;
  return {
    useDeviceLocation: useDeviceLocation,
    computeQueryParams: computeQueryParams,
    formatInputValue: formatInputValue,
    onHits: onHits,
    onError: onError,
    onRateLimitReached: onRateLimitReached,
    onInvalidCredentials: onInvalidCredentials
  };
};

var params = {};
var controls = {};

var configure = function configure(configuration) {
  params = extractParams(_objectSpread({}, params, {}, configuration));
  controls = extractControls(_objectSpread({}, controls, {}, configuration));
  return {
    params: params,
    controls: controls
  };
};

var _default = configure;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/places.js/src/createAutocompleteDataset.js":
/*!*****************************************************************!*\
  !*** ./node_modules/places.js/src/createAutocompleteDataset.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createAutocompleteDataset;

var _createAutocompleteSource = _interopRequireDefault(__webpack_require__(/*! ./createAutocompleteSource */ "./node_modules/places.js/src/createAutocompleteSource.js"));

var _defaultTemplates = _interopRequireDefault(__webpack_require__(/*! ./defaultTemplates */ "./node_modules/places.js/src/defaultTemplates.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAutocompleteDataset(options) {
  var templates = _objectSpread({}, _defaultTemplates["default"], {}, options.templates);

  var source = (0, _createAutocompleteSource["default"])(_objectSpread({}, options, {
    formatInputValue: templates.value,
    templates: undefined
  }));
  return {
    source: source,
    templates: templates,
    displayKey: 'value',
    name: 'places',
    cache: false
  };
}

/***/ }),

/***/ "./node_modules/places.js/src/createAutocompleteSource.js":
/*!****************************************************************!*\
  !*** ./node_modules/places.js/src/createAutocompleteSource.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createAutocompleteSource;

var _configure = _interopRequireDefault(__webpack_require__(/*! ./configure */ "./node_modules/places.js/src/configure/index.js"));

var _formatHit = _interopRequireDefault(__webpack_require__(/*! ./formatHit */ "./node_modules/places.js/src/formatHit.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version */ "./node_modules/places.js/src/version.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createAutocompleteSource(_ref) {
  var algoliasearch = _ref.algoliasearch,
      clientOptions = _ref.clientOptions,
      apiKey = _ref.apiKey,
      appId = _ref.appId,
      hitsPerPage = _ref.hitsPerPage,
      postcodeSearch = _ref.postcodeSearch,
      aroundLatLng = _ref.aroundLatLng,
      aroundRadius = _ref.aroundRadius,
      aroundLatLngViaIP = _ref.aroundLatLngViaIP,
      insideBoundingBox = _ref.insideBoundingBox,
      insidePolygon = _ref.insidePolygon,
      getRankingInfo = _ref.getRankingInfo,
      countries = _ref.countries,
      formatInputValue = _ref.formatInputValue,
      _ref$computeQueryPara = _ref.computeQueryParams,
      computeQueryParams = _ref$computeQueryPara === void 0 ? function (params) {
    return params;
  } : _ref$computeQueryPara,
      _ref$useDeviceLocatio = _ref.useDeviceLocation,
      useDeviceLocation = _ref$useDeviceLocatio === void 0 ? false : _ref$useDeviceLocatio,
      _ref$language = _ref.language,
      language = _ref$language === void 0 ? navigator.language.split('-')[0] : _ref$language,
      _ref$onHits = _ref.onHits,
      onHits = _ref$onHits === void 0 ? function () {} : _ref$onHits,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? function (e) {
    throw e;
  } : _ref$onError,
      onRateLimitReached = _ref.onRateLimitReached,
      onInvalidCredentials = _ref.onInvalidCredentials,
      type = _ref.type;
  var placesClient = algoliasearch.initPlaces(appId, apiKey, clientOptions);
  placesClient.as.addAlgoliaAgent("Algolia Places ".concat(_version["default"]));
  var configuration = (0, _configure["default"])({
    hitsPerPage: hitsPerPage,
    type: type,
    postcodeSearch: postcodeSearch,
    countries: countries,
    language: language,
    aroundLatLng: aroundLatLng,
    aroundRadius: aroundRadius,
    aroundLatLngViaIP: aroundLatLngViaIP,
    insideBoundingBox: insideBoundingBox,
    insidePolygon: insidePolygon,
    getRankingInfo: getRankingInfo,
    formatInputValue: formatInputValue,
    computeQueryParams: computeQueryParams,
    useDeviceLocation: useDeviceLocation,
    onHits: onHits,
    onError: onError,
    onRateLimitReached: onRateLimitReached,
    onInvalidCredentials: onInvalidCredentials
  });
  var params = configuration.params;
  var controls = configuration.controls;
  var userCoords;
  var tracker = null;

  if (controls.useDeviceLocation) {
    tracker = navigator.geolocation.watchPosition(function (_ref2) {
      var coords = _ref2.coords;
      userCoords = "".concat(coords.latitude, ",").concat(coords.longitude);
    });
  }

  function searcher(query, cb) {
    var searchParams = _objectSpread({}, params, {
      query: query
    });

    if (userCoords) {
      searchParams.aroundLatLng = userCoords;
    }

    return placesClient.search(controls.computeQueryParams(searchParams)).then(function (content) {
      var hits = content.hits.map(function (hit, hitIndex) {
        return (0, _formatHit["default"])({
          formatInputValue: controls.formatInputValue,
          hit: hit,
          hitIndex: hitIndex,
          query: query,
          rawAnswer: content
        });
      });
      controls.onHits({
        hits: hits,
        query: query,
        rawAnswer: content
      });
      return hits;
    }).then(cb)["catch"](function (e) {
      if (e.statusCode === 403 && e.message === 'Invalid Application-ID or API key') {
        controls.onInvalidCredentials();
        return;
      } else if (e.statusCode === 429) {
        controls.onRateLimitReached();
        return;
      }

      controls.onError(e);
    });
  }

  searcher.configure = function (partial) {
    var updated = (0, _configure["default"])(_objectSpread({}, params, {}, controls, {}, partial));
    params = updated.params;
    controls = updated.controls;

    if (controls.useDeviceLocation && tracker === null) {
      tracker = navigator.geolocation.watchPosition(function (_ref3) {
        var coords = _ref3.coords;
        userCoords = "".concat(coords.latitude, ",").concat(coords.longitude);
      });
    } else if (!controls.useDeviceLocation && tracker !== null) {
      navigator.geolocation.clearWatch(tracker);
      tracker = null;
      userCoords = null;
    }
  };

  return searcher;
}

/***/ }),

/***/ "./node_modules/places.js/src/createReverseGeocodingSource.js":
/*!********************************************************************!*\
  !*** ./node_modules/places.js/src/createReverseGeocodingSource.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _configure = _interopRequireDefault(__webpack_require__(/*! ./configure */ "./node_modules/places.js/src/configure/index.js"));

var _formatHit = _interopRequireDefault(__webpack_require__(/*! ./formatHit */ "./node_modules/places.js/src/formatHit.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version */ "./node_modules/places.js/src/version.js"));

var _defaultTemplates = _interopRequireDefault(__webpack_require__(/*! ./defaultTemplates */ "./node_modules/places.js/src/defaultTemplates.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var filterApplicableParams = function filterApplicableParams(params) {
  var hitsPerPage = params.hitsPerPage,
      aroundLatLng = params.aroundLatLng,
      getRankingInfo = params.getRankingInfo,
      language = params.language;
  var filtered = {};

  if (typeof hitsPerPage === 'number') {
    filtered.hitsPerPage = hitsPerPage;
  }

  if (typeof language === 'string') {
    filtered.language = language;
  }

  if (typeof getRankingInfo === 'boolean') {
    filtered.getRankingInfo = getRankingInfo;
  }

  if (typeof aroundLatLng === 'string') {
    filtered.aroundLatLng = aroundLatLng;
  }

  return filtered;
};

var createReverseGeocodingSource = function createReverseGeocodingSource(_ref) {
  var algoliasearch = _ref.algoliasearch,
      clientOptions = _ref.clientOptions,
      apiKey = _ref.apiKey,
      appId = _ref.appId,
      hitsPerPage = _ref.hitsPerPage,
      aroundLatLng = _ref.aroundLatLng,
      getRankingInfo = _ref.getRankingInfo,
      _ref$formatInputValue = _ref.formatInputValue,
      formatInputValue = _ref$formatInputValue === void 0 ? _defaultTemplates["default"].value : _ref$formatInputValue,
      _ref$language = _ref.language,
      language = _ref$language === void 0 ? navigator.language.split('-')[0] : _ref$language,
      _ref$onHits = _ref.onHits,
      onHits = _ref$onHits === void 0 ? function () {} : _ref$onHits,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? function (e) {
    throw e;
  } : _ref$onError,
      onRateLimitReached = _ref.onRateLimitReached,
      onInvalidCredentials = _ref.onInvalidCredentials;
  var placesClient = algoliasearch.initPlaces(appId, apiKey, clientOptions);
  placesClient.as.addAlgoliaAgent("Algolia Places ".concat(_version["default"]));
  var configuration = (0, _configure["default"])({
    apiKey: apiKey,
    appId: appId,
    hitsPerPage: hitsPerPage,
    aroundLatLng: aroundLatLng,
    getRankingInfo: getRankingInfo,
    language: language,
    formatInputValue: formatInputValue,
    onHits: onHits,
    onError: onError,
    onRateLimitReached: onRateLimitReached,
    onInvalidCredentials: onInvalidCredentials
  });
  var params = filterApplicableParams(configuration.params);
  var controls = configuration.controls;

  var searcher = function searcher(queryAroundLatLng, cb) {
    var finalAroundLatLng = queryAroundLatLng || params.aroundLatLng;

    if (!finalAroundLatLng) {
      var error = new Error('A location must be provided for reverse geocoding');
      return Promise.reject(error);
    }

    return placesClient.reverse(_objectSpread({}, params, {
      aroundLatLng: finalAroundLatLng
    })).then(function (content) {
      var hits = content.hits.map(function (hit, hitIndex) {
        return (0, _formatHit["default"])({
          formatInputValue: controls.formatInputValue,
          hit: hit,
          hitIndex: hitIndex,
          query: finalAroundLatLng,
          rawAnswer: content
        });
      });
      controls.onHits({
        hits: hits,
        query: finalAroundLatLng,
        rawAnswer: content
      });
      return hits;
    }).then(cb)["catch"](function (e) {
      if (e.statusCode === 403 && e.message === 'Invalid Application-ID or API key') {
        controls.onInvalidCredentials();
        return;
      } else if (e.statusCode === 429) {
        controls.onRateLimitReached();
        return;
      }

      controls.onError(e);
    });
  };

  searcher.configure = function (partial) {
    var updated = (0, _configure["default"])(_objectSpread({}, params, {}, controls, {}, partial));
    params = filterApplicableParams(updated.params);
    controls = updated.controls;
    return searcher;
  };

  return searcher;
};

var _default = createReverseGeocodingSource;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/places.js/src/defaultTemplates.js":
/*!********************************************************!*\
  !*** ./node_modules/places.js/src/defaultTemplates.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _formatInputValue = _interopRequireDefault(__webpack_require__(/*! ./formatInputValue */ "./node_modules/places.js/src/formatInputValue.js"));

var _formatDropdownValue = _interopRequireDefault(__webpack_require__(/*! ./formatDropdownValue */ "./node_modules/places.js/src/formatDropdownValue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* babel-plugin-inline-import './icons/algolia.svg' */
var algoliaLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"117\" height=\"17\" viewBox=\"0 0 130 19\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill-rule=\"nonzero\"><path fill=\"#5468FF\" d=\"M59.399.044h13.299a2.372 2.372 0 0 1 2.377 2.364v13.234a2.372 2.372 0 0 1-2.377 2.364H59.399a2.372 2.372 0 0 1-2.377-2.364V2.403A2.368 2.368 0 0 1 59.399.044z\"/><path fill=\"#FFF\" d=\"M66.257 4.582c-2.815 0-5.1 2.272-5.1 5.078 0 2.806 2.284 5.072 5.1 5.072 2.815 0 5.1-2.272 5.1-5.078 0-2.806-2.279-5.072-5.1-5.072zm0 8.652c-1.983 0-3.593-1.602-3.593-3.574 0-1.972 1.61-3.574 3.593-3.574 1.983 0 3.593 1.602 3.593 3.574a3.582 3.582 0 0 1-3.593 3.574zm0-6.418V9.48c0 .076.082.131.153.093l2.377-1.226c.055-.027.071-.093.044-.147a2.96 2.96 0 0 0-2.465-1.487c-.055 0-.11.044-.11.104h.001zm-3.33-1.956l-.312-.31a.783.783 0 0 0-1.106 0l-.372.37a.773.773 0 0 0 0 1.1l.307.305c.049.05.121.038.164-.01.181-.246.378-.48.597-.698.225-.223.455-.42.707-.599.055-.033.06-.109.016-.158h-.001zm5.001-.806v-.616a.781.781 0 0 0-.783-.779h-1.824a.78.78 0 0 0-.783.78v.631c0 .071.066.12.137.104a5.736 5.736 0 0 1 1.588-.223c.52 0 1.035.071 1.534.207a.106.106 0 0 0 .131-.104z\"/><path fill=\"#252C61\" d=\"M5.027 10.246c0 .698-.252 1.246-.757 1.644-.505.397-1.201.596-2.089.596-.888 0-1.615-.138-2.181-.414v-1.214c.358.168.739.301 1.141.397.403.097.778.145 1.125.145.508 0 .884-.097 1.125-.29a.945.945 0 0 0 .363-.779.978.978 0 0 0-.333-.747c-.222-.204-.68-.446-1.375-.725C1.33 8.57.825 8.24.531 7.865c-.294-.372-.44-.82-.44-1.343 0-.655.233-1.17.698-1.547.465-.376 1.09-.564 1.875-.564.752 0 1.5.165 2.245.494l-.408 1.047c-.698-.294-1.321-.44-1.869-.44-.415 0-.73.09-.945.271a.89.89 0 0 0-.322.717c0 .204.043.38.129.524.086.145.227.282.424.411.197.13.551.3 1.063.51.577.24.999.464 1.268.671.269.208.465.442.591.704.125.261.188.57.188.924l-.001.002zm3.98 2.24c-.924 0-1.646-.269-2.167-.808-.521-.539-.781-1.28-.781-2.226 0-.97.242-1.733.725-2.288.483-.555 1.148-.833 1.993-.833.784 0 1.404.238 1.858.714.455.476.682 1.132.682 1.966v.682H7.359c.018.577.174 1.02.467 1.33.294.31.707.464 1.241.464.351 0 .678-.033.98-.099a5.1 5.1 0 0 0 .975-.33v1.026a3.865 3.865 0 0 1-.935.312 5.723 5.723 0 0 1-1.08.091zm7.46-.107l-.252-.827h-.043c-.286.362-.575.608-.865.74-.29.13-.662.195-1.117.195-.584 0-1.039-.158-1.367-.473-.328-.315-.491-.76-.491-1.337 0-.612.227-1.074.682-1.386.455-.312 1.148-.482 2.079-.51l1.026-.032v-.317c0-.38-.089-.663-.266-.85-.177-.189-.452-.283-.824-.283-.304 0-.596.045-.875.134a6.68 6.68 0 0 0-.806.317l-.408-.902a4.414 4.414 0 0 1 1.058-.384 4.856 4.856 0 0 1 1.085-.132c.756 0 1.326.165 1.711.494.385.33.577.847.577 1.552v4.001h-.904zm5.677-6.048c.254 0 .464.018.628.054l-.124 1.176a2.383 2.383 0 0 0-.559-.064c-.505 0-.914.165-1.227.494-.313.33-.47.757-.47 1.284v3.104H19.13V6.44h.988l.167 1.047h.064c.197-.354.454-.636.771-.843a1.83 1.83 0 0 1 1.023-.312h.001zm4.125 6.155c-.899 0-1.582-.262-2.049-.787-.467-.525-.701-1.277-.701-2.259 0-.999.244-1.767.733-2.304.489-.537 1.195-.806 2.119-.806.627 0 1.191.116 1.692.35l-.381 1.014c-.534-.208-.974-.312-1.321-.312-1.028 0-1.542.682-1.542 2.046 0 .666.128 1.166.384 1.501.256.335.631.502 1.125.502a3.23 3.23 0 0 0 1.595-.419v1.101a2.53 2.53 0 0 1-.722.285 4.356 4.356 0 0 1-.932.086v.002zm8.277-.107h-1.268V8.727c0-.458-.092-.8-.277-1.026-.184-.226-.477-.338-.878-.338-.53 0-.919.158-1.168.475-.249.317-.373.848-.373 1.593v2.95H29.32V4.022h1.262v2.122c0 .34-.021.704-.064 1.09h.081a1.76 1.76 0 0 1 .717-.666c.306-.158.663-.236 1.072-.236 1.439 0 2.159.725 2.159 2.175v3.873l-.001-.002zm7.648-6.048c.741 0 1.319.27 1.732.806.414.537.62 1.291.62 2.261 0 .974-.209 1.732-.628 2.275-.419.542-1.001.814-1.746.814-.752 0-1.336-.27-1.751-.81h-.086l-.231.703h-.945V4.023h1.262V6.01l-.021.655-.032.553h.054c.401-.59.992-.886 1.772-.886zm2.917.107h1.375l1.208 3.368c.183.48.304.931.365 1.354h.043c.032-.197.091-.436.177-.717.086-.28.541-1.616 1.364-4.004h1.364l-2.541 6.73c-.462 1.235-1.232 1.853-2.31 1.853-.279 0-.551-.03-.816-.09v-1c.19.043.406.064.65.064.609 0 1.037-.353 1.284-1.058l.22-.559-2.385-5.94h.002zm-3.244.924c-.508 0-.875.15-1.098.448-.224.3-.339.8-.346 1.501v.086c0 .723.115 1.247.344 1.571.229.324.603.486 1.123.486.448 0 .787-.177 1.018-.532.231-.354.346-.867.346-1.536 0-1.35-.462-2.025-1.386-2.025l-.001.001zm-27.28 4.157c.458 0 .826-.128 1.104-.384.278-.256.416-.615.416-1.077v-.516l-.763.032c-.594.021-1.027.121-1.297.298s-.406.448-.406.814c0 .265.079.47.236.615.158.145.394.218.709.218h.001zM8.775 7.287c-.401 0-.722.127-.964.381s-.386.625-.432 1.112h2.696c-.007-.49-.125-.862-.354-1.115-.229-.252-.544-.379-.945-.379l-.001.001z\"/></g><path fill=\"#5468FF\" d=\"M102.162 13.784c0 1.455-.372 2.517-1.123 3.193-.75.676-1.895 1.013-3.44 1.013-.564 0-1.736-.109-2.673-.316l.345-1.689c.783.163 1.819.207 2.361.207.86 0 1.473-.174 1.84-.523.367-.349.548-.866.548-1.553v-.349a6.374 6.374 0 0 1-.838.316 4.151 4.151 0 0 1-1.194.158 4.515 4.515 0 0 1-1.616-.278 3.385 3.385 0 0 1-1.254-.817 3.744 3.744 0 0 1-.811-1.35c-.192-.54-.29-1.505-.29-2.213 0-.665.104-1.498.307-2.054a3.925 3.925 0 0 1 .904-1.433 4.124 4.124 0 0 1 1.441-.926 5.31 5.31 0 0 1 1.945-.365c.696 0 1.337.087 1.961.191a15.86 15.86 0 0 1 1.588.332v8.456h-.001zm-5.955-4.206c0 .893.197 1.885.592 2.3.394.413.904.62 1.528.62.34 0 .663-.049.964-.142a2.75 2.75 0 0 0 .734-.332v-5.29a8.531 8.531 0 0 0-1.413-.18c-.778-.022-1.369.294-1.786.801-.411.507-.619 1.395-.619 2.223zm16.121 0c0 .72-.104 1.264-.318 1.858a4.389 4.389 0 0 1-.904 1.52c-.389.42-.854.746-1.402.975-.548.23-1.391.36-1.813.36-.422-.005-1.26-.125-1.802-.36a4.088 4.088 0 0 1-1.397-.975 4.486 4.486 0 0 1-.909-1.52 5.037 5.037 0 0 1-.329-1.858c0-.719.099-1.41.318-1.999.219-.588.526-1.09.92-1.509.394-.42.865-.74 1.402-.97a4.547 4.547 0 0 1 1.786-.338 4.69 4.69 0 0 1 1.791.338c.548.23 1.019.55 1.402.97.389.42.69.921.909 1.51.23.587.345 1.28.345 1.998h.001zm-2.192.005c0-.92-.203-1.689-.597-2.223-.394-.539-.948-.806-1.654-.806-.707 0-1.26.267-1.654.806-.394.54-.586 1.302-.586 2.223 0 .932.197 1.558.592 2.098.394.545.948.812 1.654.812.707 0 1.26-.272 1.654-.812.394-.545.592-1.166.592-2.098h-.001zm6.963 4.708c-3.511.016-3.511-2.822-3.511-3.274L113.583.95l2.142-.338v10.003c0 .256 0 1.88 1.375 1.885v1.793h-.001zM120.873 14.291h-2.153V5.095l2.153-.338zM119.794 3.75c.718 0 1.304-.579 1.304-1.292 0-.714-.581-1.29-1.304-1.29-.723 0-1.304.577-1.304 1.29 0 .714.586 1.291 1.304 1.291zm6.431 1.012c.707 0 1.304.087 1.786.262.482.174.871.42 1.156.73.285.311.488.735.608 1.182.126.447.186.937.186 1.476v5.481a25.24 25.24 0 0 1-1.495.251c-.668.098-1.419.147-2.251.147a6.829 6.829 0 0 1-1.517-.158 3.213 3.213 0 0 1-1.178-.507 2.455 2.455 0 0 1-.761-.904c-.181-.37-.274-.893-.274-1.438 0-.523.104-.855.307-1.215.208-.36.487-.654.838-.883a3.609 3.609 0 0 1 1.227-.49 7.073 7.073 0 0 1 2.202-.103c.263.027.537.076.833.147v-.349c0-.245-.027-.479-.088-.697a1.486 1.486 0 0 0-.307-.583c-.148-.169-.34-.3-.581-.392a2.536 2.536 0 0 0-.915-.163c-.493 0-.942.06-1.353.131-.411.071-.75.153-1.008.245l-.257-1.749c.268-.093.668-.185 1.183-.278a9.335 9.335 0 0 1 1.66-.142h-.001zm.179 7.73c.657 0 1.145-.038 1.484-.104V10.22a5.097 5.097 0 0 0-1.978-.104c-.241.033-.46.098-.652.191a1.167 1.167 0 0 0-.466.392c-.121.17-.175.267-.175.523 0 .501.175.79.493.981.323.196.75.29 1.293.29h.001zM84.108 4.816c.707 0 1.304.087 1.786.262.482.174.871.42 1.156.73.29.316.487.735.608 1.182.126.447.186.937.186 1.476v5.481a25.24 25.24 0 0 1-1.495.251c-.668.098-1.419.147-2.251.147a6.829 6.829 0 0 1-1.517-.158 3.213 3.213 0 0 1-1.178-.507 2.455 2.455 0 0 1-.761-.904c-.181-.37-.274-.893-.274-1.438 0-.523.104-.855.307-1.215.208-.36.487-.654.838-.883a3.609 3.609 0 0 1 1.227-.49 7.073 7.073 0 0 1 2.202-.103c.257.027.537.076.833.147v-.349c0-.245-.027-.479-.088-.697a1.486 1.486 0 0 0-.307-.583c-.148-.169-.34-.3-.581-.392a2.536 2.536 0 0 0-.915-.163c-.493 0-.942.06-1.353.131-.411.071-.75.153-1.008.245l-.257-1.749c.268-.093.668-.185 1.183-.278a8.89 8.89 0 0 1 1.66-.142h-.001zm.185 7.736c.657 0 1.145-.038 1.484-.104V10.28a5.097 5.097 0 0 0-1.978-.104c-.241.033-.46.098-.652.191a1.167 1.167 0 0 0-.466.392c-.121.17-.175.267-.175.523 0 .501.175.79.493.981.318.191.75.29 1.293.29h.001zm8.683 1.738c-3.511.016-3.511-2.822-3.511-3.274L89.46.948 91.602.61v10.003c0 .256 0 1.88 1.375 1.885v1.793h-.001z\"/></g></svg>";

/* babel-plugin-inline-import './icons/osm.svg' */
var osmLogo = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\">\n  <path fill=\"#797979\" fill-rule=\"evenodd\" d=\"M6.577.5L5.304.005 2.627 1.02 0 0l.992 2.767-.986 2.685.998 2.76-1 2.717.613.22 3.39-3.45.563.06.726-.69s-.717-.92-.91-1.86c.193-.146.184-.14.355-.285C4.1 1.93 6.58.5 6.58.5zm-4.17 11.354l.22.12 2.68-1.05 2.62 1.04 2.644-1.03 1.02-2.717-.33-.944s-1.13 1.26-3.44.878c-.174.29-.25.37-.25.37s-1.11-.31-1.683-.89c-.573.58-.795.71-.795.71l.08.634-2.76 2.89zm6.26-4.395c1.817 0 3.29-1.53 3.29-3.4 0-1.88-1.473-3.4-3.29-3.4s-3.29 1.52-3.29 3.4c0 1.87 1.473 3.4 3.29 3.4z\"/>\n</svg>\n";
var _default = {
  footer: "<div class=\"ap-footer\">\n  <a href=\"https://www.algolia.com/places\" title=\"Search by Algolia\" class=\"ap-footer-algolia\">".concat(algoliaLogo.trim(), "</a>\n  using <a href=\"https://community.algolia.com/places/documentation.html#license\" class=\"ap-footer-osm\" title=\"Algolia Places data \xA9 OpenStreetMap contributors\">").concat(osmLogo.trim(), " <span>data</span></a>\n  </div>"),
  value: _formatInputValue["default"],
  suggestion: _formatDropdownValue["default"]
};
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/places.js/src/errors.js":
/*!**********************************************!*\
  !*** ./node_modules/places.js/src/errors.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  multiContainers: "Algolia Places: 'container' must point to a single <input> element.\nExample: instantiate the library twice if you want to bind two <inputs>.\n\nSee https://community.algolia.com/places/documentation.html#api-options-container",
  badContainer: "Algolia Places: 'container' must point to an <input> element.\n\nSee https://community.algolia.com/places/documentation.html#api-options-container",
  rateLimitReached: "Algolia Places: Current rate limit reached.\n\nSign up for a free 100,000 queries/month account at\nhttps://www.algolia.com/users/sign_up/places.\n\nOr upgrade your 100,000 queries/month plan by contacting us at\nhttps://community.algolia.com/places/contact.html.",
  invalidCredentials: "The APP ID or API key provided is invalid.",
  invalidAppId: "Your APP ID is invalid. A Places APP ID starts with 'pl'. You must create a valid Places app first.\n\nCreate a free Places app here: https://www.algolia.com/users/sign_up/places"
};
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/places.js/src/findCountryCode.js":
/*!*******************************************************!*\
  !*** ./node_modules/places.js/src/findCountryCode.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = findCountryCode;

function findCountryCode(tags) {
  for (var tagIndex = 0; tagIndex < tags.length; tagIndex++) {
    var tag = tags[tagIndex];
    var find = tag.match(/country\/(.*)?/);

    if (find) {
      return find[1];
    }
  }

  return undefined;
}

/***/ }),

/***/ "./node_modules/places.js/src/findType.js":
/*!************************************************!*\
  !*** ./node_modules/places.js/src/findType.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = findType;

function findType(tags) {
  var types = {
    country: 'country',
    city: 'city',
    'amenity/bus_station': 'busStop',
    'amenity/townhall': 'townhall',
    'railway/station': 'trainStation',
    'aeroway/aerodrome': 'airport',
    'aeroway/terminal': 'airport',
    'aeroway/gate': 'airport'
  };

  for (var t in types) {
    if (tags.indexOf(t) !== -1) {
      return types[t];
    }
  }

  return 'address';
}

/***/ }),

/***/ "./node_modules/places.js/src/formatDropdownValue.js":
/*!***********************************************************!*\
  !*** ./node_modules/places.js/src/formatDropdownValue.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatDropdownValue;

/* babel-plugin-inline-import './icons/address.svg' */
var addressIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n";

/* babel-plugin-inline-import './icons/city.svg' */
var cityIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 18 19\"><path d=\"M12 9V3L9 0 6 3v2H0v14h18V9h-6zm-8 8H2v-2h2v2zm0-4H2v-2h2v2zm0-4H2V7h2v2zm6 8H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V7h2v2zm0-4H8V3h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z\"/></svg>\n";

/* babel-plugin-inline-import './icons/country.svg' */
var countryIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n  <path d=\"M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L7 13v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H6V8h2c.55 0 1-.45 1-1V5h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\"/>\n</svg>\n";

/* babel-plugin-inline-import './icons/bus.svg' */
var busIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 54.9 50.5\"><path d=\"M9.6 12.7H8.5c-2.3 0-4.1 1.9-4.1 4.1v1.1c0 2.2 1.8 4 4 4.1v21.7h-.7c-1.3 0-2.3 1-2.3 2.3h7.1c0-1.3-1-2.3-2.3-2.3h-.5V22.1c2.2-.1 4-1.9 4-4.1v-1.1c0-2.3-1.8-4.2-4.1-4.2zM46 7.6h-7.5c0-1.8-1.5-3.3-3.3-3.3h-3.6c-1.8 0-3.3 1.5-3.3 3.3H21c-2.5 0-4.6 2-4.6 4.6v26.3c0 1.7 1.3 3.1 3 3.1h.8v1.6c0 1.7 1.4 3.1 3.1 3.1 1.7 0 3-1.4 3-3.1v-1.6h14.3v1.6c0 1.7 1.4 3.1 3.1 3.1 1.7 0 3.1-1.4 3.1-3.1v-1.6h.8c1.7 0 3.1-1.4 3.1-3.1V12.2c-.2-2.5-2.2-4.6-4.7-4.6zm-27.4 4.6c0-1.3 1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4v.3c0 1.3-1.1 2.4-2.4 2.4H21c-1.3 0-2.4-1.1-2.4-2.4v-.3zM21 38c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7zm0-10.1c-1.3 0-2.4-1.1-2.4-2.4v-6.6c0-1.3 1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4v6.6c0 1.3-1.1 2.4-2.4 2.4H21zm24.8 10c-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7z\"/></svg>\n";

/* babel-plugin-inline-import './icons/train.svg' */
var trainIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 15 20\">\n  <path d=\"M13.105 20l-2.366-3.354H4.26L1.907 20H0l3.297-4.787c-1.1-.177-2.196-1.287-2.194-2.642V2.68C1.1 1.28 2.317-.002 3.973 0h7.065c1.647-.002 2.863 1.28 2.86 2.676v9.895c.003 1.36-1.094 2.47-2.194 2.647L15 20h-1.895zM6.11 2h2.78c.264 0 .472-.123.472-.27v-.46c0-.147-.22-.268-.472-.27H6.11c-.252.002-.47.123-.47.27v.46c0 .146.206.27.47.27zm6.26 3.952V4.175c-.004-.74-.5-1.387-1.436-1.388H4.066c-.936 0-1.43.648-1.436 1.388v1.777c-.002.86.644 1.384 1.436 1.388h6.868c.793-.004 1.44-.528 1.436-1.388zm-8.465 5.386c-.69-.003-1.254.54-1.252 1.21-.002.673.56 1.217 1.252 1.222.697-.006 1.26-.55 1.262-1.22-.002-.672-.565-1.215-1.262-1.212zm8.42 1.21c-.005-.67-.567-1.213-1.265-1.21-.69-.003-1.253.54-1.25 1.21-.003.673.56 1.217 1.25 1.222.698-.006 1.26-.55 1.264-1.22z\"/>\n</svg>\n";

/* babel-plugin-inline-import './icons/townhall.svg' */
var townhallIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\"><path d=\"M12 .6L2.5 6.9h18.9L12 .6zM3.8 8.2c-.7 0-1.3.6-1.3 1.3v8.8L.3 22.1c-.2.3-.3.5-.3.6 0 .6.8.6 1.3.6h21.5c.4 0 1.3 0 1.3-.6 0-.2-.1-.3-.3-.6l-2.2-3.8V9.5c0-.7-.6-1.3-1.3-1.3H3.8zm2.5 2.5c.7 0 1.1.6 1.3 1.3v7.6H5.1V12c0-.7.5-1.3 1.2-1.3zm5.7 0c.7 0 1.3.6 1.3 1.3v7.6h-2.5V12c-.1-.7.5-1.3 1.2-1.3zm5.7 0c.7 0 1.3.6 1.3 1.3v7.6h-2.5V12c-.1-.7.5-1.3 1.2-1.3z\"/></svg>\n";

/* babel-plugin-inline-import './icons/plane.svg' */
var planeIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\"><path d=\"M22.9 1.1s1.3.3-4.3 6.5l.7 3.8.2-.2c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-1.2 1.2.3 1.7.1-.1c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-1.1 1.1c.2 1.9.3 3.6.1 4.5 0 0-1.2 1.2-1.8.5 0 0-2.3-7.7-3.8-11.1-5.9 6-6.4 5.6-6.4 5.6s1.2 3.8-.2 5.2l-2.3-4.3h.1l-4.3-2.3c1.3-1.3 5.2-.2 5.2-.2s-.5-.4 5.6-6.3C8.9 7.7 1.2 5.5 1.2 5.5c-.7-.7.5-1.8.5-1.8.9-.2 2.6-.1 4.5.1l1.1-1.1c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l1.7.3 1.2-1.2c.4-.4 1-.4 1.3 0 .4.4.4 1 0 1.3l-.2.2 3.8.7c6.2-5.5 6.5-4.2 6.5-4.2z\"/></svg>\n";
var icons = {
  address: addressIcon,
  city: cityIcon,
  country: countryIcon,
  busStop: busIcon,
  trainStation: trainIcon,
  townhall: townhallIcon,
  airport: planeIcon
};

function formatDropdownValue(_ref) {
  var type = _ref.type,
      highlight = _ref.highlight;
  var name = highlight.name,
      administrative = highlight.administrative,
      city = highlight.city,
      country = highlight.country;
  var out = "<span class=\"ap-suggestion-icon\">".concat(icons[type].trim(), "</span>\n<span class=\"ap-name\">").concat(name, "</span>\n<span class=\"ap-address\">\n  ").concat([city, administrative, country].filter(function (token) {
    return token !== undefined;
  }).join(', '), "</span>").replace(/\s*\n\s*/g, ' ');
  return out;
}

/***/ }),

/***/ "./node_modules/places.js/src/formatHit.js":
/*!*************************************************!*\
  !*** ./node_modules/places.js/src/formatHit.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatHit;

var _findCountryCode = _interopRequireDefault(__webpack_require__(/*! ./findCountryCode */ "./node_modules/places.js/src/findCountryCode.js"));

var _findType = _interopRequireDefault(__webpack_require__(/*! ./findType */ "./node_modules/places.js/src/findType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getBestHighlightedForm(highlightedValues) {
  var defaultValue = highlightedValues[0].value; // collect all other matches

  var bestAttributes = [];

  for (var i = 1; i < highlightedValues.length; ++i) {
    if (highlightedValues[i].matchLevel !== 'none') {
      bestAttributes.push({
        index: i,
        words: highlightedValues[i].matchedWords
      });
    }
  } // no matches in this attribute, retrieve first value


  if (bestAttributes.length === 0) {
    return defaultValue;
  } // sort the matches by `desc(words), asc(index)`


  bestAttributes.sort(function (a, b) {
    if (a.words > b.words) {
      return -1;
    } else if (a.words < b.words) {
      return 1;
    }

    return a.index - b.index;
  }); // and append the best match to the first value

  return bestAttributes[0].index === 0 ? "".concat(defaultValue, " (").concat(highlightedValues[bestAttributes[1].index].value, ")") : "".concat(highlightedValues[bestAttributes[0].index].value, " (").concat(defaultValue, ")");
}

function getBestPostcode(postcodes, highlightedPostcodes) {
  var defaultValue = highlightedPostcodes[0].value; // collect all other matches

  var bestAttributes = [];

  for (var i = 1; i < highlightedPostcodes.length; ++i) {
    if (highlightedPostcodes[i].matchLevel !== 'none') {
      bestAttributes.push({
        index: i,
        words: highlightedPostcodes[i].matchedWords
      });
    }
  } // no matches in this attribute, retrieve first value


  if (bestAttributes.length === 0) {
    return {
      postcode: postcodes[0],
      highlightedPostcode: defaultValue
    };
  } // sort the matches by `desc(words)`


  bestAttributes.sort(function (a, b) {
    if (a.words > b.words) {
      return -1;
    } else if (a.words < b.words) {
      return 1;
    }

    return a.index - b.index;
  });
  var postcode = postcodes[bestAttributes[0].index];
  return {
    postcode: postcode,
    highlightedPostcode: highlightedPostcodes[bestAttributes[0].index].value
  };
}

function formatHit(_ref) {
  var formatInputValue = _ref.formatInputValue,
      hit = _ref.hit,
      hitIndex = _ref.hitIndex,
      query = _ref.query,
      rawAnswer = _ref.rawAnswer;

  try {
    var name = hit.locale_names[0];
    var country = hit.country;
    var administrative = hit.administrative && hit.administrative[0] !== name ? hit.administrative[0] : undefined;
    var city = hit.city && hit.city[0] !== name ? hit.city[0] : undefined;
    var suburb = hit.suburb && hit.suburb[0] !== name ? hit.suburb[0] : undefined;
    var county = hit.county && hit.county[0] !== name ? hit.county[0] : undefined;

    var _ref2 = hit.postcode && hit.postcode.length ? getBestPostcode(hit.postcode, hit._highlightResult.postcode) : {
      postcode: undefined,
      highlightedPostcode: undefined
    },
        postcode = _ref2.postcode,
        highlightedPostcode = _ref2.highlightedPostcode;

    var highlight = {
      name: getBestHighlightedForm(hit._highlightResult.locale_names),
      city: city ? getBestHighlightedForm(hit._highlightResult.city) : undefined,
      administrative: administrative ? getBestHighlightedForm(hit._highlightResult.administrative) : undefined,
      country: country ? hit._highlightResult.country.value : undefined,
      suburb: suburb ? getBestHighlightedForm(hit._highlightResult.suburb) : undefined,
      county: county ? getBestHighlightedForm(hit._highlightResult.county) : undefined,
      postcode: highlightedPostcode
    };
    var suggestion = {
      name: name,
      administrative: administrative,
      county: county,
      city: city,
      suburb: suburb,
      country: country,
      countryCode: (0, _findCountryCode["default"])(hit._tags),
      type: (0, _findType["default"])(hit._tags),
      latlng: {
        lat: hit._geoloc.lat,
        lng: hit._geoloc.lng
      },
      postcode: postcode,
      postcodes: hit.postcode && hit.postcode.length ? hit.postcode : undefined
    }; // this is the value to put inside the <input value=

    var value = formatInputValue(suggestion);
    return _objectSpread({}, suggestion, {
      highlight: highlight,
      hit: hit,
      hitIndex: hitIndex,
      query: query,
      rawAnswer: rawAnswer,
      value: value
    });
  } catch (e) {
    /* eslint-disable no-console */
    console.error('Could not parse object', hit);
    console.error(e);
    /* eslint-enable no-console */

    return {
      value: 'Could not parse object'
    };
  }
}

/***/ }),

/***/ "./node_modules/places.js/src/formatInputValue.js":
/*!********************************************************!*\
  !*** ./node_modules/places.js/src/formatInputValue.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatInputValue;

function formatInputValue(_ref) {
  var administrative = _ref.administrative,
      city = _ref.city,
      country = _ref.country,
      name = _ref.name,
      type = _ref.type;
  var out = "".concat(name).concat(type !== 'country' && country !== undefined ? ',' : '', "\n ").concat(city ? "".concat(city, ",") : '', "\n ").concat(administrative ? "".concat(administrative, ",") : '', "\n ").concat(country ? country : '').replace(/\s*\n\s*/g, ' ').trim();
  return out;
}

/***/ }),

/***/ "./node_modules/places.js/src/navigatorLanguage.js":
/*!*********************************************************!*\
  !*** ./node_modules/places.js/src/navigatorLanguage.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// polyfill for navigator.language (IE <= 10)
// not polyfilled by https://cdn.polyfill.io/v2/docs/
// Defined: http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#navigatorlanguage
//   with allowable values at http://www.ietf.org/rfc/bcp/bcp47.txt
// Note that the HTML spec suggests that anonymizing services return "en-US" by default for
//   user privacy (so your app may wish to provide a means of changing the locale)
if (!('language' in navigator)) {
  navigator.language = // IE 10 in IE8 mode on Windows 7 uses upper-case in
  // navigator.userLanguage country codes but per
  // http://msdn.microsoft.com/en-us/library/ie/ms533052.aspx (via
  // http://msdn.microsoft.com/en-us/library/ie/ms534713.aspx), they
  // appear to be in lower case, so we bring them into harmony with navigator.language.
  navigator.userLanguage && navigator.userLanguage.replace(/-[a-z]{2}$/, String.prototype.toUpperCase) || 'en-US'; // Default for anonymizing services: http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#navigatorlanguage
}

/***/ }),

/***/ "./node_modules/places.js/src/places.js":
/*!**********************************************!*\
  !*** ./node_modules/places.js/src/places.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = places;

var _events = _interopRequireDefault(__webpack_require__(/*! events */ "./node_modules/events/events.js"));

var _algoliasearchLite = _interopRequireDefault(__webpack_require__(/*! algoliasearch/src/browser/builds/algoliasearchLite */ "./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js"));

var _autocomplete = _interopRequireDefault(__webpack_require__(/*! autocomplete.js */ "./node_modules/autocomplete.js/index.js"));

__webpack_require__(/*! ./navigatorLanguage */ "./node_modules/places.js/src/navigatorLanguage.js");

var _createAutocompleteDataset = _interopRequireDefault(__webpack_require__(/*! ./createAutocompleteDataset */ "./node_modules/places.js/src/createAutocompleteDataset.js"));

var _insertCss = _interopRequireDefault(__webpack_require__(/*! insert-css */ "./node_modules/insert-css/index.js"));

var _errors = _interopRequireDefault(__webpack_require__(/*! ./errors */ "./node_modules/places.js/src/errors.js"));

var _createReverseGeocodingSource = _interopRequireDefault(__webpack_require__(/*! ./createReverseGeocodingSource */ "./node_modules/places.js/src/createReverseGeocodingSource.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* babel-plugin-inline-import './icons/clear.svg' */
var clearIcon = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M.566 1.698L0 1.13 1.132 0l.565.566L6 4.868 10.302.566 10.868 0 12 1.132l-.566.565L7.132 6l4.302 4.3.566.568L10.868 12l-.565-.566L6 7.132l-4.3 4.302L1.13 12 0 10.868l.566-.565L4.868 6 .566 1.698z\"/></svg>\n";

/* babel-plugin-inline-import './icons/address.svg' */
var pinIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 14 20\"><path d=\"M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5C5.62 9.5 4.5 8.38 4.5 7S5.62 4.5 7 4.5 9.5 5.62 9.5 7 8.38 9.5 7 9.5z\"/></svg>\n";

/* babel-plugin-inline-import './places.css' */
var css = ".algolia-places {\n  width: 100%;\n}\n\n.ap-input, .ap-hint {\n  width: 100%;\n  padding-right: 35px;\n  padding-left: 16px;\n  line-height: 40px;\n  height: 40px;\n  border: 1px solid #CCC;\n  border-radius: 3px;\n  outline: none;\n  font: inherit;\n  appearance: none;\n  -webkit-appearance: none;\n  box-sizing: border-box;\n}\n\n.ap-input::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n.ap-input::-ms-clear {\n  display: none;\n}\n\n.ap-input:hover ~ .ap-input-icon svg,\n.ap-input:focus ~ .ap-input-icon svg,\n.ap-input-icon:hover svg {\n  fill: #aaaaaa;\n}\n\n.ap-dropdown-menu {\n  width: 100%;\n  background: #ffffff;\n  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  margin-top: 3px;\n  overflow: hidden;\n}\n\n.ap-suggestion {\n  cursor: pointer;\n  height: 46px;\n  line-height: 46px;\n  padding-left: 18px;\n  overflow: hidden;\n}\n\n.ap-suggestion em {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.ap-address {\n  font-size: smaller;\n  margin-left: 12px;\n  color: #aaaaaa;\n}\n\n.ap-suggestion-icon {\n  margin-right: 10px;\n  width: 14px;\n  height: 20px;\n  vertical-align: middle;\n}\n\n.ap-suggestion-icon svg {\n  display: inherit;\n  -webkit-transform: scale(0.9) translateY(2px);\n          transform: scale(0.9) translateY(2px);\n  fill: #cfcfcf;\n}\n\n.ap-input-icon {\n  border: 0;\n  background: transparent;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 16px;\n  outline: none;\n}\n\n.ap-input-icon.ap-icon-pin {\n  cursor: pointer;\n}\n\n.ap-input-icon svg {\n  fill: #cfcfcf;\n  position: absolute;\n  top: 50%;\n  right: 0;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.ap-cursor {\n  background: #efefef;\n}\n\n.ap-cursor .ap-suggestion-icon svg {\n  -webkit-transform: scale(1) translateY(2px);\n          transform: scale(1) translateY(2px);\n  fill: #aaaaaa;\n}\n\n.ap-footer {\n  opacity: .8;\n  text-align: right;\n  padding: .5em 1em .5em 0;\n  font-size: 12px;\n  line-height: 12px;\n}\n\n.ap-footer a {\n  color: inherit;\n  text-decoration: none;\n}\n\n.ap-footer a svg {\n  vertical-align: middle;\n}\n\n.ap-footer:hover {\n  opacity: 1;\n}\n";
(0, _insertCss["default"])(css, {
  prepend: true
});

var applyAttributes = function applyAttributes(elt, attrs) {
  Object.entries(attrs).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        value = _ref2[1];

    elt.setAttribute(name, "".concat(value));
  });
  return elt;
};

function places(options) {
  var container = options.container,
      style = options.style,
      accessibility = options.accessibility,
      _options$autocomplete = options.autocompleteOptions,
      userAutocompleteOptions = _options$autocomplete === void 0 ? {} : _options$autocomplete; // multiple DOM elements targeted

  if (container instanceof NodeList) {
    if (container.length > 1) {
      throw new Error(_errors["default"].multiContainers);
    } // if single node NodeList received, resolve to the first one


    return places(_objectSpread({}, options, {
      container: container[0]
    }));
  } // container sent as a string, resolve it for multiple DOM elements issue


  if (typeof container === 'string') {
    var resolvedContainer = document.querySelectorAll(container);
    return places(_objectSpread({}, options, {
      container: resolvedContainer
    }));
  } // if not an <input>, error


  if (!(container instanceof HTMLInputElement)) {
    throw new Error(_errors["default"].badContainer);
  }

  var placesInstance = new _events["default"]();
  var prefix = "ap".concat(style === false ? '-nostyle' : '');

  var autocompleteOptions = _objectSpread({
    autoselect: true,
    hint: false,
    cssClasses: {
      root: "algolia-places".concat(style === false ? '-nostyle' : ''),
      prefix: prefix
    },
    debug: "development" === 'development'
  }, userAutocompleteOptions);

  var autocompleteDataset = (0, _createAutocompleteDataset["default"])(_objectSpread({}, options, {
    algoliasearch: _algoliasearchLite["default"],
    onHits: function onHits(_ref3) {
      var hits = _ref3.hits,
          rawAnswer = _ref3.rawAnswer,
          query = _ref3.query;
      return placesInstance.emit('suggestions', {
        rawAnswer: rawAnswer,
        query: query,
        suggestions: hits
      });
    },
    onError: function onError(e) {
      return placesInstance.emit('error', e);
    },
    onRateLimitReached: function onRateLimitReached() {
      var listeners = placesInstance.listenerCount('limit');

      if (listeners === 0) {
        console.log(_errors["default"].rateLimitReached); // eslint-disable-line no-console

        return;
      }

      placesInstance.emit('limit', {
        message: _errors["default"].rateLimitReached
      });
    },
    onInvalidCredentials: function onInvalidCredentials() {
      if (options && options.appId && options.appId.startsWith('pl')) {
        console.error(_errors["default"].invalidCredentials); // eslint-disable-line no-console
      } else {
        console.error(_errors["default"].invalidAppId); // eslint-disable-line no-console
      }
    },
    container: undefined
  }));
  var autocompleteInstance = (0, _autocomplete["default"])(container, autocompleteOptions, autocompleteDataset);
  var autocompleteContainer = container.parentNode;
  var autocompleteChangeEvents = ['selected', 'autocompleted'];
  autocompleteChangeEvents.forEach(function (eventName) {
    autocompleteInstance.on("autocomplete:".concat(eventName), function (_, suggestion) {
      placesInstance.emit('change', {
        rawAnswer: suggestion.rawAnswer,
        query: suggestion.query,
        suggestion: suggestion,
        suggestionIndex: suggestion.hitIndex
      });
    });
  });
  autocompleteInstance.on('autocomplete:cursorchanged', function (_, suggestion) {
    placesInstance.emit('cursorchanged', {
      rawAnswer: suggestion.rawAnswer,
      query: suggestion.query,
      suggestion: suggestion,
      suggestionIndex: suggestion.hitIndex
    });
  });
  var clear = document.createElement('button');
  clear.setAttribute('type', 'button');
  clear.setAttribute('aria-label', 'clear');

  if (accessibility && accessibility.clearButton && accessibility.clearButton instanceof Object) {
    applyAttributes(clear, accessibility.clearButton);
  }

  clear.classList.add("".concat(prefix, "-input-icon"));
  clear.classList.add("".concat(prefix, "-icon-clear"));
  clear.innerHTML = clearIcon;
  autocompleteContainer.appendChild(clear);
  clear.style.display = 'none';
  var pin = document.createElement('button');
  pin.setAttribute('type', 'button');
  pin.setAttribute('aria-label', 'focus');

  if (accessibility && accessibility.pinButton && accessibility.pinButton instanceof Object) {
    applyAttributes(pin, accessibility.pinButton);
  }

  pin.classList.add("".concat(prefix, "-input-icon"));
  pin.classList.add("".concat(prefix, "-icon-pin"));
  pin.innerHTML = pinIcon;
  autocompleteContainer.appendChild(pin);
  pin.addEventListener('click', function () {
    autocompleteDataset.source.configure({
      useDeviceLocation: true
    });
    autocompleteInstance.focus();
  });
  clear.addEventListener('click', function () {
    autocompleteInstance.autocomplete.setVal('');
    autocompleteInstance.focus();
    clear.style.display = 'none';
    pin.style.display = '';
    placesInstance.emit('clear');
  });
  var previousQuery = '';

  var inputListener = function inputListener() {
    var query = autocompleteInstance.val();

    if (query === '') {
      pin.style.display = '';
      clear.style.display = 'none';

      if (previousQuery !== query) {
        placesInstance.emit('clear');
      }
    } else {
      clear.style.display = '';
      pin.style.display = 'none';
    }

    previousQuery = query;
  };

  autocompleteContainer.querySelector(".".concat(prefix, "-input")).addEventListener('input', inputListener);
  var autocompleteIsomorphicMethods = ['open', 'close'];
  autocompleteIsomorphicMethods.forEach(function (methodName) {
    placesInstance[methodName] = function () {
      var _autocompleteInstance;

      (_autocompleteInstance = autocompleteInstance.autocomplete)[methodName].apply(_autocompleteInstance, arguments);
    };
  });

  placesInstance.getVal = function () {
    return autocompleteInstance.val();
  };

  placesInstance.destroy = function () {
    var _autocompleteInstance2;

    autocompleteContainer.querySelector(".".concat(prefix, "-input")).removeEventListener('input', inputListener);

    (_autocompleteInstance2 = autocompleteInstance.autocomplete).destroy.apply(_autocompleteInstance2, arguments);
  };

  placesInstance.setVal = function () {
    var _autocompleteInstance3;

    previousQuery = arguments.length <= 0 ? undefined : arguments[0];

    if (previousQuery === '') {
      pin.style.display = '';
      clear.style.display = 'none';
    } else {
      clear.style.display = '';
      pin.style.display = 'none';
    }

    (_autocompleteInstance3 = autocompleteInstance.autocomplete).setVal.apply(_autocompleteInstance3, arguments);
  };

  placesInstance.autocomplete = autocompleteInstance;

  placesInstance.search = function () {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return new Promise(function (resolve) {
      autocompleteDataset.source(query, resolve);
    });
  };

  placesInstance.configure = function (configuration) {
    var safeConfig = _objectSpread({}, configuration);

    delete safeConfig.onHits;
    delete safeConfig.onError;
    delete safeConfig.onRateLimitReached;
    delete safeConfig.onInvalidCredentials;
    delete safeConfig.templates;
    autocompleteDataset.source.configure(safeConfig);
    return placesInstance;
  };

  placesInstance.reverse = (0, _createReverseGeocodingSource["default"])(_objectSpread({}, options, {
    algoliasearch: _algoliasearchLite["default"],
    formatInputValue: (options.templates || {}).value,
    onHits: function onHits(_ref4) {
      var hits = _ref4.hits,
          rawAnswer = _ref4.rawAnswer,
          query = _ref4.query;
      return placesInstance.emit('reverse', {
        rawAnswer: rawAnswer,
        query: query,
        suggestions: hits
      });
    },
    onError: function onError(e) {
      return placesInstance.emit('error', e);
    },
    onRateLimitReached: function onRateLimitReached() {
      var listeners = placesInstance.listenerCount('limit');

      if (listeners === 0) {
        console.log(_errors["default"].rateLimitReached); // eslint-disable-line no-console

        return;
      }

      placesInstance.emit('limit', {
        message: _errors["default"].rateLimitReached
      });
    },
    onInvalidCredentials: function onInvalidCredentials() {
      if (options && options.appId && options.appId.startsWith('pl')) {
        console.error(_errors["default"].invalidCredentials); // eslint-disable-line no-console
      } else {
        console.error(_errors["default"].invalidAppId); // eslint-disable-line no-console
      }
    }
  }));
  return placesInstance;
}

/***/ }),

/***/ "./node_modules/places.js/src/version.js":
/*!***********************************************!*\
  !*** ./node_modules/places.js/src/version.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = '1.18.2';
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/algolia.js":
/*!************************!*\
  !*** ./src/algolia.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_places_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/places.js */ "./node_modules/places.js/index.js");
/* harmony import */ var _node_modules_places_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_places_js__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = ((function algolia() {
  let lat;
  let lon;
  let city;
  let country;

  const placesAutocomplete = _node_modules_places_js__WEBPACK_IMPORTED_MODULE_0___default()({
    appId: 'pl0O1GN8NY5H',
    apiKey: 'ba6758305a11697b5bb20da5f2541d8a',
    container: document.querySelector('#search-query'),
  }).configure({
    type: 'city',
    aroundLatLngViaIP: false,
  });

  placesAutocomplete.on('change', (e) => {
    lat = e.suggestion.latlng.lat;
    lon = e.suggestion.latlng.lng;
    city = e.suggestion.name;
    country = e.suggestion.country;
  });

  const getLatLon = () => [lat, lon];
  const getCityCountry = () => `${city}, ${country}`;
  const resetSearch = () => {
    lat = '';
    lon = '';
  };

  return { getLatLon, getCityCountry, resetSearch };
})());


/***/ }),

/***/ "./src/animationActivate.js":
/*!**********************************!*\
  !*** ./src/animationActivate.js ***!
  \**********************************/
/*! exports provided: resultAnimation, searchAnimation, loadingAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resultAnimation", function() { return resultAnimation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchAnimation", function() { return searchAnimation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadingAnimation", function() { return loadingAnimation; });
function resultAnimation() {
  $('.search-submit,.ap-input-icon').toggleClass('backOutDown');
  $('#search-container > h1').toggleClass('backOutUp');
  $('#search-container').fadeOut();

  setTimeout(() => {
    $('.search-submit,.ap-input-icon').toggleClass('backOutDown');
    $('#search-container > h1').toggleClass('backOutUp');
  }, 1000);
}

function searchAnimation() {
  $('#result-container').fadeOut(400);
  $('#search-container').fadeIn(1500);
}

function loadingAnimation() {
  $('#loading-container').css('display', 'flex').fadeIn(1200);
  $('#loading-container').fadeOut(1200);
}



// $('.result-container').slideDown(900);
// $('#result-container').show();


/***/ }),

/***/ "./src/eventListeners.js":
/*!*******************************!*\
  !*** ./src/eventListeners.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animationActivate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animationActivate */ "./src/animationActivate.js");
/* harmony import */ var _retrieveWeather__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retrieveWeather */ "./src/retrieveWeather.js");
/* harmony import */ var _retrieveWebcam__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retrieveWebcam */ "./src/retrieveWebcam.js");
/* harmony import */ var _algolia__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./algolia */ "./src/algolia.js");





// When pressing enter on search bar or clicking the let's go button
$('.search-submit').on('click keypress', function (e) {
  if (e.which === 13 || e.target.tagName === 'BUTTON') {
    const [lat, lon] = _algolia__WEBPACK_IMPORTED_MODULE_3__["default"].getLatLon();
    $('#location-name').text(_algolia__WEBPACK_IMPORTED_MODULE_3__["default"].getCityCountry());
    $('#search-query').val('');

    // Only execute when we have resolved data
    Object(_retrieveWeather__WEBPACK_IMPORTED_MODULE_1__["default"])(lat, lon)
      .then(() => {
        _algolia__WEBPACK_IMPORTED_MODULE_3__["default"].resetSearch();
        $('#temperature').removeClass().addClass('F');
        Object(_animationActivate__WEBPACK_IMPORTED_MODULE_0__["loadingAnimation"])();
        Object(_animationActivate__WEBPACK_IMPORTED_MODULE_0__["resultAnimation"])();
        Object(_retrieveWebcam__WEBPACK_IMPORTED_MODULE_2__["default"])(lat, lon).then(() => {
          $('#result-container').delay(1300).slideDown(1500);
        });
      })
      .catch((err) => console.log(err));
  }
});

$('#search-btn').on('click', function () {
  Object(_animationActivate__WEBPACK_IMPORTED_MODULE_0__["searchAnimation"])();
});

$('#fahrenheit').on('click', function () {
  const value = $('#temperature').text();
  if ($('#temperature').hasClass('C')) {
    const convertedToCelcius = value * 1.8 + 32;
    toggleTemperature(convertedToCelcius);
  }
});
$('#celcius').on('click', function () {
  const value = $('#temperature').text();
  if ($('#temperature').hasClass('F')) {
    const convertedToCelcius = (value - 32) / 1.8;
    toggleTemperature(convertedToCelcius);
  }
});

function toggleTemperature(value) {
  $('#temperature').text(value.toFixed(1));
  $('#temperature').toggleClass('F');
  $('#temperature').toggleClass('C');
}


/***/ }),

/***/ "./src/images sync recursive \\.svg$":
/*!********************************!*\
  !*** ./src/images sync \.svg$ ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./clear-sky.svg": "./src/images/clear-sky.svg",
	"./cloud.svg": "./src/images/cloud.svg",
	"./haze.svg": "./src/images/haze.svg",
	"./loading.svg": "./src/images/loading.svg",
	"./mist.svg": "./src/images/mist.svg",
	"./rain.svg": "./src/images/rain.svg",
	"./search.svg": "./src/images/search.svg",
	"./snow.svg": "./src/images/snow.svg",
	"./temp.svg": "./src/images/temp.svg",
	"./thunderstorm.svg": "./src/images/thunderstorm.svg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/images sync recursive \\.svg$";

/***/ }),

/***/ "./src/images/clear-sky.svg":
/*!**********************************!*\
  !*** ./src/images/clear-sky.svg ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/clear-sky.svg");

/***/ }),

/***/ "./src/images/cloud.svg":
/*!******************************!*\
  !*** ./src/images/cloud.svg ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/cloud.svg");

/***/ }),

/***/ "./src/images/haze.svg":
/*!*****************************!*\
  !*** ./src/images/haze.svg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/haze.svg");

/***/ }),

/***/ "./src/images/loading.svg":
/*!********************************!*\
  !*** ./src/images/loading.svg ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/loading.svg");

/***/ }),

/***/ "./src/images/mist.svg":
/*!*****************************!*\
  !*** ./src/images/mist.svg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/mist.svg");

/***/ }),

/***/ "./src/images/rain.svg":
/*!*****************************!*\
  !*** ./src/images/rain.svg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/rain.svg");

/***/ }),

/***/ "./src/images/search.svg":
/*!*******************************!*\
  !*** ./src/images/search.svg ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/search.svg");

/***/ }),

/***/ "./src/images/snow.svg":
/*!*****************************!*\
  !*** ./src/images/snow.svg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/snow.svg");

/***/ }),

/***/ "./src/images/temp.svg":
/*!*****************************!*\
  !*** ./src/images/temp.svg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/temp.svg");

/***/ }),

/***/ "./src/images/thunderstorm.svg":
/*!*************************************!*\
  !*** ./src/images/thunderstorm.svg ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/thunderstorm.svg");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(normalize_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/style.css */ "./src/styles/style.css");
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_style_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventListeners */ "./src/eventListeners.js");



// import all images
const reqSvgs = __webpack_require__("./src/images sync recursive \\.svg$");



/***/ }),

/***/ "./src/retrieveWeather.js":
/*!********************************!*\
  !*** ./src/retrieveWeather.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
async function getWeatherData(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=f2e53489e36affec9f5b85aafc39a5b1`
    );
    const data = await response.json();
    
    $('#temperature').html(`${data.main.temp.toFixed(1)}`);
    const weatherCondition = data.weather[0].description;
    $('#condition').text(capitalizeFirstLetter(weatherCondition));
    $('#condition-img').attr('src', `./images/${assignImage(weatherCondition)}.svg`);
  } catch (err) {
    alert('Invalid city! Please enter a valid city!');
    throw new Error(`HTTP error! status:${err.status}`);
  }
}

// For situations like 'scattered clouds'
function assignImage(weatherCondition) {
  if (weatherCondition.includes('cloud')) return 'cloud';
  if (weatherCondition.includes('rain')) return 'rain';
  if (weatherCondition.includes('clear')) return 'clear-sky';
  return weatherCondition;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/* harmony default export */ __webpack_exports__["default"] = (getWeatherData);


/***/ }),

/***/ "./src/retrieveWebcam.js":
/*!*******************************!*\
  !*** ./src/retrieveWebcam.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
async function getWebcam(lat, lon) {
  try {
    const response = await fetch(
      `https://api.windy.com/api/webcams/v2/list/nearby=${lat},${lon},5?show=webcams:location,player&key=xebab4fii9wlfSyuk4n363aFNPn4faml`
    );
    const data = await response.json();

    const webcams = data.result.webcams;
    const webcamLink = webcams.length > 0 ? webcams[0].player.day.embed : '';
    $('iframe').attr('src', webcamLink);
  } catch (e) {
    throw new Error(`HTTP error! status:${err.status}`);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (getWebcam);


/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9BbGdvbGlhU2VhcmNoQ29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvSW5kZXhDb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9icm93c2VyL2J1aWxkcy9hbGdvbGlhc2VhcmNoTGl0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvYnJvd3Nlci9jcmVhdGVBbGdvbGlhc2VhcmNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9icm93c2VyL2lubGluZS1oZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9icm93c2VyL2pzb25wLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvc3JjL2J1aWxkU2VhcmNoTWV0aG9kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9jbG9uZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvZGVwcmVjYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9kZXByZWNhdGVkTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvZXJyb3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9leGl0UHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvbWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvb21pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvcGxhY2VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvc3JjL2F1dG9jb21wbGV0ZS9jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2RhdGFzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2Ryb3Bkb3duLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvc3JjL2F1dG9jb21wbGV0ZS9ldmVudF9idXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2V2ZW50X2VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2lucHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvc3JjL2F1dG9jb21wbGV0ZS90eXBlYWhlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvY29tbW9uL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9jb21tb24vcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9jb21tb24vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvc291cmNlcy9oaXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvc3JjL3NvdXJjZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvc291cmNlcy9wb3B1bGFySW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvc3RhbmRhbG9uZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy96ZXB0by5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvcmVhY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsb2JhbC93aW5kb3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvbWVzc2FnZUNoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvbXV0YXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvbmV4dFRpY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvc3RhdGVDaGFuZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvdGltZW91dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5zZXJ0LWNzcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzPzM0MmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9jb25maWd1cmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvY3JlYXRlQXV0b2NvbXBsZXRlRGF0YXNldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9jcmVhdGVBdXRvY29tcGxldGVTb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvY3JlYXRlUmV2ZXJzZUdlb2NvZGluZ1NvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9kZWZhdWx0VGVtcGxhdGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wbGFjZXMuanMvc3JjL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9maW5kQ291bnRyeUNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvZmluZFR5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvZm9ybWF0RHJvcGRvd25WYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9mb3JtYXRIaXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvZm9ybWF0SW5wdXRWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9uYXZpZ2F0b3JMYW5ndWFnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9wbGFjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZGVjb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29saWEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbkFjdGl2YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzIHN5bmMgXFwuc3ZnJCIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2NsZWFyLXNreS5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9jbG91ZC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9oYXplLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2xvYWRpbmcuc3ZnIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvbWlzdC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9yYWluLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL3NlYXJjaC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9zbm93LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL3RlbXAuc3ZnIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvdGh1bmRlcnN0b3JtLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JldHJpZXZlV2VhdGhlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmV0cmlldmVXZWJjYW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3M/ZmY5NCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsbUJBQU8sQ0FBQyw2RUFBUztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQU8sQ0FBQyxpRUFBSTs7QUFFL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZ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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG1CQUFPLENBQUMsNkVBQU87OztBQUdwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUMsbUNBQW1DO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE9BQU87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QUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQU8sQ0FBQyw2RUFBTztBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFL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RUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFDQUFxQztBQUM1RCw2Q0FBNkMsd0NBQXdDO0FBQ3JGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDLHFDQUFxQztBQUM1RTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ3pZYTs7QUFFYjs7QUFFQSxRQUFRLG1CQUFPLENBQUMsOEVBQW9CO0FBQ3BDLFVBQVUsbUJBQU8sQ0FBQywwRUFBa0I7O0FBRXBDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7O0FDaENhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLHdEQUFXO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5RUFBeUU7QUFDekU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQ0FBMkMsdUJBQXVCO0FBQ2xFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdEQUFnRDtBQUNoRTs7Ozs7Ozs7Ozs7OztBQ3JHYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1JhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLG1CQUFPLENBQUMsOEVBQW9CO0FBQ3BDLFVBQVUsbUJBQU8sQ0FBQywwRUFBa0I7QUFDcEMsbUJBQW1CLG1CQUFPLENBQUMsNEZBQW9COztBQUUvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0QsR0FBRztBQUN6RDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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QUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQyxnRkFBcUI7O0FBRWpEOzs7Ozs7Ozs7Ozs7O0FDN29CYTs7QUFFYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNKYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNkYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsa0VBQVU7O0FBRTVCO0FBQ0EsaUNBQWlDLEVBQUU7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxtQ0FBbUM7QUFDdkU7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsbUNBQW1DLEVBQUU7QUFDckMsR0FBRzs7QUFFSCwyQkFBMkIsZ0NBQWdDLEVBQUU7O0FBRTdEO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QyxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx5QkFBeUI7QUFDM0Q7QUFDQSxnQ0FBZ0Msb0JBQW9CO0FBQ3BELEdBQUc7O0FBRUgsdUJBQXVCLG1CQUFtQixFQUFFOztBQUU1QyxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xJYTs7QUFFYixRQUFRLG1CQUFPLENBQUMsOEVBQW9CO0FBQ3BDLGNBQWMsbUJBQU8sQ0FBQyxtRUFBa0I7QUFDeEMsZ0NBQWdDLG1CQUFPLENBQUMsc0hBQXdDOztBQUVoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkJhOztBQUViO0FBQ0EsUUFBUSxtQkFBTyxDQUFDLHFFQUFXO0FBQzNCLGFBQWEsbUJBQU8sQ0FBQywrRUFBZ0I7QUFDckM7Ozs7Ozs7Ozs7Ozs7QUNMYTs7QUFFYixRQUFRLG1CQUFPLENBQUMsOEVBQW9CO0FBQ3BDLGNBQWMsbUJBQU8sQ0FBQyxtRUFBa0I7QUFDeEMsZ0NBQWdDLG1CQUFPLENBQUMsc0hBQXdDOztBQUVoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsNEJBQTRCOztBQUUxRztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxxQ0FBcUMsZUFBZTtBQUNwRCxvQ0FBb0M7QUFDcEMsbUNBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QixlQUFlO0FBQ2YsYUFBYTtBQUNiLFdBQVc7O0FBRVg7QUFDQSx5QkFBeUIseUJBQXlCO0FBQ2xEO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBLFlBQVksbUJBQU8sQ0FBQywrREFBZ0I7O0FBRXBDO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLDBFQUFrQjtBQUNwQzs7QUFFQTtBQUNBLFFBQVEsbUJBQU8sQ0FBQyw4RUFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixtQkFBTyxDQUFDLGtHQUE4QjtBQUN0RCxlQUFlLG1CQUFPLENBQUMsa0dBQThCOztBQUVyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUMsV0FBVztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMxRkE7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEMsaUJBQWlCLDRHQUE0RztBQUM3SDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5Qiw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsMENBQTBDLHNCQUFzQjtBQUMzRiwyQkFBMkI7QUFDM0IsMkJBQTJCLG9EQUFvRCxzQ0FBc0M7QUFDckg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsK0NBQStDLG9DQUFvQzs7QUFFNUc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0Msc0NBQXNDO0FBQ3JGOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRCQUE0QjtBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQiw2Q0FBNkM7QUFDaEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCLFVBQVUsT0FBTztBQUNqQjtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE1BQU07QUFDaEI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxxQkFBcUIsWUFBWTtBQUNqQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFVBQVUsSUFBSTtBQUNkO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLFVBQVUsU0FBUztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsVUFBVSxTQUFTO0FBQ25CLFVBQVUsU0FBUztBQUNuQjtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQSxXQUFXO0FBQ1g7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUIsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLFlBQVksU0FBUztBQUNyQixhQUFhO0FBQ2I7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7Ozs7QUFJRDs7Ozs7Ozs7Ozs7Ozs7QUNycENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxL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QUVBO0FBQ0E7O0FBRUE7Ozs7QUFJQSxzQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZVxuICAgICAgICAgICAgICAgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICA/IGNocm9tZS5zdG9yYWdlLmxvY2FsXG4gICAgICAgICAgICAgICAgICA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJ2xpZ2h0c2VhZ3JlZW4nLFxuICAnZm9yZXN0Z3JlZW4nLFxuICAnZ29sZGVucm9kJyxcbiAgJ2RvZGdlcmJsdWUnLFxuICAnZGFya29yY2hpZCcsXG4gICdjcmltc29uJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFByZXZpb3VzIGxvZyB0aW1lc3RhbXAuXG4gKi9cblxudmFyIHByZXZUaW1lO1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAvLyBkaXNhYmxlZD9cbiAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gZGVidWc7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIHR1cm4gdGhlIGBhcmd1bWVudHNgIGludG8gYSBwcm9wZXIgQXJyYXlcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cbiAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcbiAgICBleHBvcnRzLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuICAgIHZhciBsb2dGbiA9IGRlYnVnLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG5cbiAgZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICBkZWJ1Zy5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk7XG4gIGRlYnVnLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICByZXR1cm4gZGVidWc7XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgZXhwb3J0cy5uYW1lcyA9IFtdO1xuICBleHBvcnRzLnNraXBzID0gW107XG5cbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFzcGxpdFtpXSkgY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG4gICAgbmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuICAgICAgZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgZXhwb3J0cy5lbmFibGUoJycpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG4gIHZhciBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENvZXJjZSBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzTmFOKHZhbCkgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigoPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIGlmIChtcyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtcyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICByZXR1cm4gcGx1cmFsKG1zLCBkLCAnZGF5JykgfHxcbiAgICBwbHVyYWwobXMsIGgsICdob3VyJykgfHxcbiAgICBwbHVyYWwobXMsIG0sICdtaW51dGUnKSB8fFxuICAgIHBsdXJhbChtcywgcywgJ3NlY29uZCcpIHx8XG4gICAgbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG4sIG5hbWUpIHtcbiAgaWYgKG1zIDwgbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobXMgPCBuICogMS41KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobXMgLyBuKSArICcgJyArIG5hbWU7XG4gIH1cbiAgcmV0dXJuIE1hdGguY2VpbChtcyAvIG4pICsgJyAnICsgbmFtZSArICdzJztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gQWxnb2xpYVNlYXJjaENvcmU7XG5cbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIGV4aXRQcm9taXNlID0gcmVxdWlyZSgnLi9leGl0UHJvbWlzZS5qcycpO1xudmFyIEluZGV4Q29yZSA9IHJlcXVpcmUoJy4vSW5kZXhDb3JlLmpzJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuL3N0b3JlLmpzJyk7XG5cbi8vIFdlIHdpbGwgYWx3YXlzIHB1dCB0aGUgQVBJIEtFWSBpbiB0aGUgSlNPTiBib2R5IGluIGNhc2Ugb2YgdG9vIGxvbmcgQVBJIEtFWSxcbi8vIHRvIGF2b2lkIHF1ZXJ5IHN0cmluZyBiZWluZyB0b28gbG9uZyBhbmQgZmFpbGluZyBpbiB2YXJpb3VzIGNvbmRpdGlvbnMgKG91ciBzZXJ2ZXIgbGltaXQsIGJyb3dzZXIgbGltaXQsXG4vLyBwcm94aWVzIGxpbWl0KVxudmFyIE1BWF9BUElfS0VZX0xFTkdUSCA9IDUwMDtcbnZhciBSRVNFVF9BUFBfREFUQV9USU1FUiA9XG4gIHByb2Nlc3MuZW52LlJFU0VUX0FQUF9EQVRBX1RJTUVSICYmIHBhcnNlSW50KHByb2Nlc3MuZW52LlJFU0VUX0FQUF9EQVRBX1RJTUVSLCAxMCkgfHxcbiAgNjAgKiAyICogMTAwMDsgLy8gYWZ0ZXIgMiBtaW51dGVzIHJlc2V0IHRvIGZpcnN0IGhvc3RcblxuLypcbiAqIEFsZ29saWEgU2VhcmNoIGxpYnJhcnkgaW5pdGlhbGl6YXRpb25cbiAqIGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHBsaWNhdGlvbklEIC0gWW91ciBhcHBsaWNhdGlvbklELCBmb3VuZCBpbiB5b3VyIGRhc2hib2FyZFxuICogQHBhcmFtIHtzdHJpbmd9IGFwaUtleSAtIFlvdXIgQVBJIGtleSwgZm91bmQgaW4geW91ciBkYXNoYm9hcmRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c11cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy50aW1lb3V0PTIwMDBdIC0gVGhlIHJlcXVlc3QgdGltZW91dCBzZXQgaW4gbWlsbGlzZWNvbmRzLFxuICogYW5vdGhlciByZXF1ZXN0IHdpbGwgYmUgaXNzdWVkIGFmdGVyIHRoaXMgdGltZW91dFxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLnByb3RvY29sPSdodHRwczonXSAtIFRoZSBwcm90b2NvbCB1c2VkIHRvIHF1ZXJ5IEFsZ29saWEgU2VhcmNoIEFQSS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNldCB0byAnaHR0cDonIHRvIGZvcmNlIHVzaW5nIGh0dHAuXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gW29wdHMuaG9zdHM9e1xuICogICAgICAgICAgIHJlYWQ6IFt0aGlzLmFwcGxpY2F0aW9uSUQgKyAnLWRzbi5hbGdvbGlhLm5ldCddLmNvbmNhdChbXG4gKiAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uSUQgKyAnLTEuYWxnb2xpYW5ldC5jb20nLFxuICogICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbklEICsgJy0yLmFsZ29saWFuZXQuY29tJyxcbiAqICAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25JRCArICctMy5hbGdvbGlhbmV0LmNvbSddXG4gKiAgICAgICAgICAgXSksXG4gKiAgICAgICAgICAgd3JpdGU6IFt0aGlzLmFwcGxpY2F0aW9uSUQgKyAnLmFsZ29saWEubmV0J10uY29uY2F0KFtcbiAqICAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25JRCArICctMS5hbGdvbGlhbmV0LmNvbScsXG4gKiAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uSUQgKyAnLTIuYWxnb2xpYW5ldC5jb20nLFxuICogICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbklEICsgJy0zLmFsZ29saWFuZXQuY29tJ11cbiAqICAgICAgICAgICBdKSAtIFRoZSBob3N0cyB0byB1c2UgZm9yIEFsZ29saWEgU2VhcmNoIEFQSS5cbiAqICAgICAgICAgICBJZiB5b3UgcHJvdmlkZSB0aGVtLCB5b3Ugd2lsbCBsZXNzIGJlbmVmaXQgZnJvbSBvdXIgSEEgaW1wbGVtZW50YXRpb25cbiAqL1xuZnVuY3Rpb24gQWxnb2xpYVNlYXJjaENvcmUoYXBwbGljYXRpb25JRCwgYXBpS2V5LCBvcHRzKSB7XG4gIHZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2FsZ29saWFzZWFyY2gnKTtcblxuICB2YXIgY2xvbmUgPSByZXF1aXJlKCcuL2Nsb25lLmpzJyk7XG4gIHZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xuICB2YXIgbWFwID0gcmVxdWlyZSgnLi9tYXAuanMnKTtcblxuICB2YXIgdXNhZ2UgPSAnVXNhZ2U6IGFsZ29saWFzZWFyY2goYXBwbGljYXRpb25JRCwgYXBpS2V5LCBvcHRzKSc7XG5cbiAgaWYgKG9wdHMuX2FsbG93RW1wdHlDcmVkZW50aWFscyAhPT0gdHJ1ZSAmJiAhYXBwbGljYXRpb25JRCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuQWxnb2xpYVNlYXJjaEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhbiBhcHBsaWNhdGlvbiBJRC4gJyArIHVzYWdlKTtcbiAgfVxuXG4gIGlmIChvcHRzLl9hbGxvd0VtcHR5Q3JlZGVudGlhbHMgIT09IHRydWUgJiYgIWFwaUtleSkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuQWxnb2xpYVNlYXJjaEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhbiBBUEkga2V5LiAnICsgdXNhZ2UpO1xuICB9XG5cbiAgdGhpcy5hcHBsaWNhdGlvbklEID0gYXBwbGljYXRpb25JRDtcbiAgdGhpcy5hcGlLZXkgPSBhcGlLZXk7XG5cbiAgdGhpcy5ob3N0cyA9IHtcbiAgICByZWFkOiBbXSxcbiAgICB3cml0ZTogW11cbiAgfTtcblxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICB0aGlzLl90aW1lb3V0cyA9IG9wdHMudGltZW91dHMgfHwge1xuICAgIGNvbm5lY3Q6IDEgKiAxMDAwLCAvLyA1MDBtcyBjb25uZWN0IGlzIEdQUlMgbGF0ZW5jeVxuICAgIHJlYWQ6IDIgKiAxMDAwLFxuICAgIHdyaXRlOiAzMCAqIDEwMDBcbiAgfTtcblxuICAvLyBiYWNrd2FyZCBjb21wYXQsIGlmIG9wdHMudGltZW91dCBpcyBwYXNzZWQsIHdlIHVzZSBpdCB0byBjb25maWd1cmUgYWxsIHRpbWVvdXRzIGxpa2UgYmVmb3JlXG4gIGlmIChvcHRzLnRpbWVvdXQpIHtcbiAgICB0aGlzLl90aW1lb3V0cy5jb25uZWN0ID0gdGhpcy5fdGltZW91dHMucmVhZCA9IHRoaXMuX3RpbWVvdXRzLndyaXRlID0gb3B0cy50aW1lb3V0O1xuICB9XG5cbiAgdmFyIHByb3RvY29sID0gb3B0cy5wcm90b2NvbCB8fCAnaHR0cHM6JztcbiAgLy8gd2hpbGUgd2UgYWR2b2NhdGUgZm9yIGNvbG9uLWF0LXRoZS1lbmQgdmFsdWVzOiAnaHR0cDonIGZvciBgb3B0cy5wcm90b2NvbGBcbiAgLy8gd2UgYWxzbyBhY2NlcHQgYGh0dHBgIGFuZCBgaHR0cHNgLiBJdCdzIGEgY29tbW9uIGVycm9yLlxuICBpZiAoIS86JC8udGVzdChwcm90b2NvbCkpIHtcbiAgICBwcm90b2NvbCA9IHByb3RvY29sICsgJzonO1xuICB9XG5cbiAgaWYgKHByb3RvY29sICE9PSAnaHR0cDonICYmIHByb3RvY29sICE9PSAnaHR0cHM6Jykge1xuICAgIHRocm93IG5ldyBlcnJvcnMuQWxnb2xpYVNlYXJjaEVycm9yKCdwcm90b2NvbCBtdXN0IGJlIGBodHRwOmAgb3IgYGh0dHBzOmAgKHdhcyBgJyArIG9wdHMucHJvdG9jb2wgKyAnYCknKTtcbiAgfVxuXG4gIHRoaXMuX2NoZWNrQXBwSWREYXRhKCk7XG5cbiAgaWYgKCFvcHRzLmhvc3RzKSB7XG4gICAgdmFyIGRlZmF1bHRIb3N0cyA9IG1hcCh0aGlzLl9zaHVmZmxlUmVzdWx0LCBmdW5jdGlvbihob3N0TnVtYmVyKSB7XG4gICAgICByZXR1cm4gYXBwbGljYXRpb25JRCArICctJyArIGhvc3ROdW1iZXIgKyAnLmFsZ29saWFuZXQuY29tJztcbiAgICB9KTtcblxuICAgIC8vIG5vIGhvc3RzIGdpdmVuLCBjb21wdXRlIGRlZmF1bHRzXG4gICAgdmFyIG1haW5TdWZmaXggPSAob3B0cy5kc24gPT09IGZhbHNlID8gJycgOiAnLWRzbicpICsgJy5hbGdvbGlhLm5ldCc7XG4gICAgdGhpcy5ob3N0cy5yZWFkID0gW3RoaXMuYXBwbGljYXRpb25JRCArIG1haW5TdWZmaXhdLmNvbmNhdChkZWZhdWx0SG9zdHMpO1xuICAgIHRoaXMuaG9zdHMud3JpdGUgPSBbdGhpcy5hcHBsaWNhdGlvbklEICsgJy5hbGdvbGlhLm5ldCddLmNvbmNhdChkZWZhdWx0SG9zdHMpO1xuICB9IGVsc2UgaWYgKGlzQXJyYXkob3B0cy5ob3N0cykpIHtcbiAgICAvLyB3aGVuIHBhc3NpbmcgY3VzdG9tIGhvc3RzLCB3ZSBuZWVkIHRvIGhhdmUgYSBkaWZmZXJlbnQgaG9zdCBpbmRleCBpZiB0aGUgbnVtYmVyXG4gICAgLy8gb2Ygd3JpdGUvcmVhZCBob3N0cyBhcmUgZGlmZmVyZW50LlxuICAgIHRoaXMuaG9zdHMucmVhZCA9IGNsb25lKG9wdHMuaG9zdHMpO1xuICAgIHRoaXMuaG9zdHMud3JpdGUgPSBjbG9uZShvcHRzLmhvc3RzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmhvc3RzLnJlYWQgPSBjbG9uZShvcHRzLmhvc3RzLnJlYWQpO1xuICAgIHRoaXMuaG9zdHMud3JpdGUgPSBjbG9uZShvcHRzLmhvc3RzLndyaXRlKTtcbiAgfVxuXG4gIC8vIGFkZCBwcm90b2NvbCBhbmQgbG93ZXJjYXNlIGhvc3RzXG4gIHRoaXMuaG9zdHMucmVhZCA9IG1hcCh0aGlzLmhvc3RzLnJlYWQsIHByZXBhcmVIb3N0KHByb3RvY29sKSk7XG4gIHRoaXMuaG9zdHMud3JpdGUgPSBtYXAodGhpcy5ob3N0cy53cml0ZSwgcHJlcGFyZUhvc3QocHJvdG9jb2wpKTtcblxuICB0aGlzLmV4dHJhSGVhZGVycyA9IHt9O1xuXG4gIC8vIEluIHNvbWUgc2l0dWF0aW9ucyB5b3UgbWlnaHQgd2FudCB0byB3YXJtIHRoZSBjYWNoZVxuICB0aGlzLmNhY2hlID0gb3B0cy5fY2FjaGUgfHwge307XG5cbiAgdGhpcy5fdWEgPSBvcHRzLl91YTtcbiAgdGhpcy5fdXNlQ2FjaGUgPSBvcHRzLl91c2VDYWNoZSA9PT0gdW5kZWZpbmVkIHx8IG9wdHMuX2NhY2hlID8gdHJ1ZSA6IG9wdHMuX3VzZUNhY2hlO1xuICB0aGlzLl91c2VSZXF1ZXN0Q2FjaGUgPSB0aGlzLl91c2VDYWNoZSAmJiBvcHRzLl91c2VSZXF1ZXN0Q2FjaGU7XG4gIHRoaXMuX3VzZUZhbGxiYWNrID0gb3B0cy51c2VGYWxsYmFjayA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdHMudXNlRmFsbGJhY2s7XG5cbiAgdGhpcy5fc2V0VGltZW91dCA9IG9wdHMuX3NldFRpbWVvdXQ7XG5cbiAgZGVidWcoJ2luaXQgZG9uZSwgJWonLCB0aGlzKTtcbn1cblxuLypcbiAqIEdldCB0aGUgaW5kZXggb2JqZWN0IGluaXRpYWxpemVkXG4gKlxuICogQHBhcmFtIGluZGV4TmFtZSB0aGUgbmFtZSBvZiBpbmRleFxuICogQHBhcmFtIGNhbGxiYWNrIHRoZSByZXN1bHQgY2FsbGJhY2sgd2l0aCBvbmUgYXJndW1lbnQgKHRoZSBJbmRleCBpbnN0YW5jZSlcbiAqL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLmluaXRJbmRleCA9IGZ1bmN0aW9uKGluZGV4TmFtZSkge1xuICByZXR1cm4gbmV3IEluZGV4Q29yZSh0aGlzLCBpbmRleE5hbWUpO1xufTtcblxuLyoqXG4qIEFkZCBhbiBleHRyYSBmaWVsZCB0byB0aGUgSFRUUCByZXF1ZXN0XG4qXG4qIEBwYXJhbSBuYW1lIHRoZSBoZWFkZXIgZmllbGQgbmFtZVxuKiBAcGFyYW0gdmFsdWUgdGhlIGhlYWRlciBmaWVsZCB2YWx1ZVxuKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5zZXRFeHRyYUhlYWRlciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuZXh0cmFIZWFkZXJzW25hbWUudG9Mb3dlckNhc2UoKV0gPSB2YWx1ZTtcbn07XG5cbi8qKlxuKiBHZXQgdGhlIHZhbHVlIG9mIGFuIGV4dHJhIEhUVFAgaGVhZGVyXG4qXG4qIEBwYXJhbSBuYW1lIHRoZSBoZWFkZXIgZmllbGQgbmFtZVxuKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5nZXRFeHRyYUhlYWRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXMuZXh0cmFIZWFkZXJzW25hbWUudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiogUmVtb3ZlIGFuIGV4dHJhIGZpZWxkIGZyb20gdGhlIEhUVFAgcmVxdWVzdFxuKlxuKiBAcGFyYW0gbmFtZSB0aGUgaGVhZGVyIGZpZWxkIG5hbWVcbiovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUudW5zZXRFeHRyYUhlYWRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgZGVsZXRlIHRoaXMuZXh0cmFIZWFkZXJzW25hbWUudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiogQXVnbWVudCBzZW50IHgtYWxnb2xpYS1hZ2VudCB3aXRoIG1vcmUgZGF0YSwgZWFjaCBhZ2VudCBwYXJ0XG4qIGlzIGF1dG9tYXRpY2FsbHkgc2VwYXJhdGVkIGZyb20gdGhlIG90aGVycyBieSBhIHNlbWljb2xvbjtcbipcbiogQHBhcmFtIGFsZ29saWFBZ2VudCB0aGUgYWdlbnQgdG8gYWRkXG4qL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLmFkZEFsZ29saWFBZ2VudCA9IGZ1bmN0aW9uKGFsZ29saWFBZ2VudCkge1xuICB2YXIgYWxnb2xpYUFnZW50V2l0aERlbGltaXRlciA9ICc7ICcgKyBhbGdvbGlhQWdlbnQ7XG5cbiAgaWYgKHRoaXMuX3VhLmluZGV4T2YoYWxnb2xpYUFnZW50V2l0aERlbGltaXRlcikgPT09IC0xKSB7XG4gICAgdGhpcy5fdWEgKz0gYWxnb2xpYUFnZW50V2l0aERlbGltaXRlcjtcbiAgfVxufTtcblxuLypcbiAqIFdyYXBwZXIgdGhhdCB0cnkgYWxsIGhvc3RzIHRvIG1heGltaXplIHRoZSBxdWFsaXR5IG9mIHNlcnZpY2VcbiAqL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9qc29uUmVxdWVzdCA9IGZ1bmN0aW9uKGluaXRpYWxPcHRzKSB7XG4gIHRoaXMuX2NoZWNrQXBwSWREYXRhKCk7XG5cbiAgdmFyIHJlcXVlc3REZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2FsZ29saWFzZWFyY2g6JyArIGluaXRpYWxPcHRzLnVybCk7XG5cblxuICB2YXIgYm9keTtcbiAgdmFyIGNhY2hlSUQ7XG4gIHZhciBhZGRpdGlvbmFsVUEgPSBpbml0aWFsT3B0cy5hZGRpdGlvbmFsVUEgfHwgJyc7XG4gIHZhciBjYWNoZSA9IGluaXRpYWxPcHRzLmNhY2hlO1xuICB2YXIgY2xpZW50ID0gdGhpcztcbiAgdmFyIHRyaWVzID0gMDtcbiAgdmFyIHVzaW5nRmFsbGJhY2sgPSBmYWxzZTtcbiAgdmFyIGhhc0ZhbGxiYWNrID0gY2xpZW50Ll91c2VGYWxsYmFjayAmJiBjbGllbnQuX3JlcXVlc3QuZmFsbGJhY2sgJiYgaW5pdGlhbE9wdHMuZmFsbGJhY2s7XG4gIHZhciBoZWFkZXJzO1xuXG4gIGlmIChcbiAgICB0aGlzLmFwaUtleS5sZW5ndGggPiBNQVhfQVBJX0tFWV9MRU5HVEggJiZcbiAgICBpbml0aWFsT3B0cy5ib2R5ICE9PSB1bmRlZmluZWQgJiZcbiAgICAoaW5pdGlhbE9wdHMuYm9keS5wYXJhbXMgIT09IHVuZGVmaW5lZCB8fCAvLyBpbmRleC5zZWFyY2goKVxuICAgIGluaXRpYWxPcHRzLmJvZHkucmVxdWVzdHMgIT09IHVuZGVmaW5lZCkgLy8gY2xpZW50LnNlYXJjaCgpXG4gICkge1xuICAgIGluaXRpYWxPcHRzLmJvZHkuYXBpS2V5ID0gdGhpcy5hcGlLZXk7XG4gICAgaGVhZGVycyA9IHRoaXMuX2NvbXB1dGVSZXF1ZXN0SGVhZGVycyh7XG4gICAgICBhZGRpdGlvbmFsVUE6IGFkZGl0aW9uYWxVQSxcbiAgICAgIHdpdGhBcGlLZXk6IGZhbHNlLFxuICAgICAgaGVhZGVyczogaW5pdGlhbE9wdHMuaGVhZGVyc1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGhlYWRlcnMgPSB0aGlzLl9jb21wdXRlUmVxdWVzdEhlYWRlcnMoe1xuICAgICAgYWRkaXRpb25hbFVBOiBhZGRpdGlvbmFsVUEsXG4gICAgICBoZWFkZXJzOiBpbml0aWFsT3B0cy5oZWFkZXJzXG4gICAgfSk7XG4gIH1cblxuICBpZiAoaW5pdGlhbE9wdHMuYm9keSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgYm9keSA9IHNhZmVKU09OU3RyaW5naWZ5KGluaXRpYWxPcHRzLmJvZHkpO1xuICB9XG5cbiAgcmVxdWVzdERlYnVnKCdyZXF1ZXN0IHN0YXJ0Jyk7XG4gIHZhciBkZWJ1Z0RhdGEgPSBbXTtcblxuXG4gIGZ1bmN0aW9uIGRvUmVxdWVzdChyZXF1ZXN0ZXIsIHJlcU9wdHMpIHtcbiAgICBjbGllbnQuX2NoZWNrQXBwSWREYXRhKCk7XG5cbiAgICB2YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgIGlmIChjbGllbnQuX3VzZUNhY2hlICYmICFjbGllbnQuX3VzZVJlcXVlc3RDYWNoZSkge1xuICAgICAgY2FjaGVJRCA9IGluaXRpYWxPcHRzLnVybDtcbiAgICB9XG5cbiAgICAvLyBhcyB3ZSBzb21ldGltZSB1c2UgUE9TVCByZXF1ZXN0cyB0byBwYXNzIHBhcmFtZXRlcnMgKGxpa2UgcXVlcnk9J2FhJyksXG4gICAgLy8gdGhlIGNhY2hlSUQgbXVzdCBhbHNvIGluY2x1ZGUgdGhlIGJvZHkgdG8gYmUgZGlmZmVyZW50IGJldHdlZW4gY2FsbHNcbiAgICBpZiAoY2xpZW50Ll91c2VDYWNoZSAmJiAhY2xpZW50Ll91c2VSZXF1ZXN0Q2FjaGUgJiYgYm9keSkge1xuICAgICAgY2FjaGVJRCArPSAnX2JvZHlfJyArIHJlcU9wdHMuYm9keTtcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUgY2FjaGUgZXhpc3RlbmNlXG4gICAgaWYgKGlzQ2FjaGVWYWxpZFdpdGhDdXJyZW50SUQoIWNsaWVudC5fdXNlUmVxdWVzdENhY2hlLCBjYWNoZSwgY2FjaGVJRCkpIHtcbiAgICAgIHJlcXVlc3REZWJ1Zygnc2VydmluZyByZXNwb25zZSBmcm9tIGNhY2hlJyk7XG5cbiAgICAgIHZhciByZXNwb25zZVRleHQgPSBjYWNoZVtjYWNoZUlEXTtcblxuICAgICAgLy8gQ2FjaGUgcmVzcG9uc2UgbXVzdCBtYXRjaCB0aGUgdHlwZSBvZiB0aGUgb3JpZ2luYWwgb25lXG4gICAgICByZXR1cm4gY2xpZW50Ll9wcm9taXNlLnJlc29sdmUoe1xuICAgICAgICBib2R5OiBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCksXG4gICAgICAgIHJlc3BvbnNlVGV4dDogcmVzcG9uc2VUZXh0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSByZWFjaGVkIG1heCB0cmllc1xuICAgIGlmICh0cmllcyA+PSBjbGllbnQuaG9zdHNbaW5pdGlhbE9wdHMuaG9zdFR5cGVdLmxlbmd0aCkge1xuICAgICAgaWYgKCFoYXNGYWxsYmFjayB8fCB1c2luZ0ZhbGxiYWNrKSB7XG4gICAgICAgIHJlcXVlc3REZWJ1ZygnY291bGQgbm90IGdldCBhbnkgcmVzcG9uc2UnKTtcbiAgICAgICAgLy8gdGhlbiBzdG9wXG4gICAgICAgIHJldHVybiBjbGllbnQuX3Byb21pc2UucmVqZWN0KG5ldyBlcnJvcnMuQWxnb2xpYVNlYXJjaEVycm9yKFxuICAgICAgICAgICdDYW5ub3QgY29ubmVjdCB0byB0aGUgQWxnb2xpYVNlYXJjaCBBUEkuJyArXG4gICAgICAgICAgJyBTZW5kIGFuIGVtYWlsIHRvIHN1cHBvcnRAYWxnb2xpYS5jb20gdG8gcmVwb3J0IGFuZCByZXNvbHZlIHRoZSBpc3N1ZS4nICtcbiAgICAgICAgICAnIEFwcGxpY2F0aW9uIGlkIHdhczogJyArIGNsaWVudC5hcHBsaWNhdGlvbklELCB7ZGVidWdEYXRhOiBkZWJ1Z0RhdGF9XG4gICAgICAgICkpO1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0RGVidWcoJ3N3aXRjaGluZyB0byBmYWxsYmFjaycpO1xuXG4gICAgICAvLyBsZXQncyB0cnkgdGhlIGZhbGxiYWNrIHN0YXJ0aW5nIGZyb20gaGVyZVxuICAgICAgdHJpZXMgPSAwO1xuXG4gICAgICAvLyBtZXRob2QsIHVybCBhbmQgYm9keSBhcmUgZmFsbGJhY2sgZGVwZW5kZW50XG4gICAgICByZXFPcHRzLm1ldGhvZCA9IGluaXRpYWxPcHRzLmZhbGxiYWNrLm1ldGhvZDtcbiAgICAgIHJlcU9wdHMudXJsID0gaW5pdGlhbE9wdHMuZmFsbGJhY2sudXJsO1xuICAgICAgcmVxT3B0cy5qc29uQm9keSA9IGluaXRpYWxPcHRzLmZhbGxiYWNrLmJvZHk7XG4gICAgICBpZiAocmVxT3B0cy5qc29uQm9keSkge1xuICAgICAgICByZXFPcHRzLmJvZHkgPSBzYWZlSlNPTlN0cmluZ2lmeShyZXFPcHRzLmpzb25Cb2R5KTtcbiAgICAgIH1cbiAgICAgIC8vIHJlLWNvbXB1dGUgaGVhZGVycywgdGhleSBjb3VsZCBiZSBvbWl0dGluZyB0aGUgQVBJIEtFWVxuICAgICAgaGVhZGVycyA9IGNsaWVudC5fY29tcHV0ZVJlcXVlc3RIZWFkZXJzKHtcbiAgICAgICAgYWRkaXRpb25hbFVBOiBhZGRpdGlvbmFsVUEsXG4gICAgICAgIGhlYWRlcnM6IGluaXRpYWxPcHRzLmhlYWRlcnNcbiAgICAgIH0pO1xuXG4gICAgICByZXFPcHRzLnRpbWVvdXRzID0gY2xpZW50Ll9nZXRUaW1lb3V0c0ZvclJlcXVlc3QoaW5pdGlhbE9wdHMuaG9zdFR5cGUpO1xuICAgICAgY2xpZW50Ll9zZXRIb3N0SW5kZXhCeVR5cGUoMCwgaW5pdGlhbE9wdHMuaG9zdFR5cGUpO1xuICAgICAgdXNpbmdGYWxsYmFjayA9IHRydWU7IC8vIHRoZSBjdXJyZW50IHJlcXVlc3QgaXMgbm93IHVzaW5nIGZhbGxiYWNrXG4gICAgICByZXR1cm4gZG9SZXF1ZXN0KGNsaWVudC5fcmVxdWVzdC5mYWxsYmFjaywgcmVxT3B0cyk7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRIb3N0ID0gY2xpZW50Ll9nZXRIb3N0QnlUeXBlKGluaXRpYWxPcHRzLmhvc3RUeXBlKTtcblxuICAgIHZhciB1cmwgPSBjdXJyZW50SG9zdCArIHJlcU9wdHMudXJsO1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgYm9keTogcmVxT3B0cy5ib2R5LFxuICAgICAganNvbkJvZHk6IHJlcU9wdHMuanNvbkJvZHksXG4gICAgICBtZXRob2Q6IHJlcU9wdHMubWV0aG9kLFxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIHRpbWVvdXRzOiByZXFPcHRzLnRpbWVvdXRzLFxuICAgICAgZGVidWc6IHJlcXVlc3REZWJ1ZyxcbiAgICAgIGZvcmNlQXV0aEhlYWRlcnM6IHJlcU9wdHMuZm9yY2VBdXRoSGVhZGVyc1xuICAgIH07XG5cbiAgICByZXF1ZXN0RGVidWcoJ21ldGhvZDogJXMsIHVybDogJXMsIGhlYWRlcnM6ICVqLCB0aW1lb3V0czogJWQnLFxuICAgICAgb3B0aW9ucy5tZXRob2QsIHVybCwgb3B0aW9ucy5oZWFkZXJzLCBvcHRpb25zLnRpbWVvdXRzKTtcblxuICAgIGlmIChyZXF1ZXN0ZXIgPT09IGNsaWVudC5fcmVxdWVzdC5mYWxsYmFjaykge1xuICAgICAgcmVxdWVzdERlYnVnKCd1c2luZyBmYWxsYmFjaycpO1xuICAgIH1cblxuICAgIC8vIGByZXF1ZXN0ZXJgIGlzIGFueSBvZiB0aGlzLl9yZXF1ZXN0IG9yIHRoaXMuX3JlcXVlc3QuZmFsbGJhY2tcbiAgICAvLyB0aHVzIGl0IG5lZWRzIHRvIGJlIGNhbGxlZCB1c2luZyB0aGUgY2xpZW50IGFzIGNvbnRleHRcbiAgICByZXR1cm4gcmVxdWVzdGVyLmNhbGwoY2xpZW50LCB1cmwsIG9wdGlvbnMpLnRoZW4oc3VjY2VzcywgdHJ5RmFsbGJhY2spO1xuXG4gICAgZnVuY3Rpb24gc3VjY2VzcyhodHRwUmVzcG9uc2UpIHtcbiAgICAgIC8vIGNvbXB1dGUgdGhlIHN0YXR1cyBvZiB0aGUgcmVzcG9uc2UsXG4gICAgICAvL1xuICAgICAgLy8gV2hlbiBpbiBicm93c2VyIG1vZGUsIHVzaW5nIFhEUiBvciBKU09OUCwgd2UgaGF2ZSBubyBzdGF0dXNDb2RlIGF2YWlsYWJsZVxuICAgICAgLy8gU28gd2UgcmVseSBvbiBvdXIgQVBJIHJlc3BvbnNlIGBzdGF0dXNgIHByb3BlcnR5LlxuICAgICAgLy8gQnV0IGB3YWl0VGFza2AgY2FuIHNldCBhIGBzdGF0dXNgIHByb3BlcnR5IHdoaWNoIGlzIG5vdCB0aGUgc3RhdHVzQ29kZSAoaXQncyB0aGUgdGFzayBzdGF0dXMpXG4gICAgICAvLyBTbyB3ZSBjaGVjayBpZiB0aGVyZSdzIGEgYG1lc3NhZ2VgIGFsb25nIGBzdGF0dXNgIGFuZCBpdCBtZWFucyBpdCdzIGFuIGVycm9yXG4gICAgICAvL1xuICAgICAgLy8gVGhhdCdzIHRoZSBvbmx5IGNhc2Ugd2hlcmUgd2UgaGF2ZSBhIHJlc3BvbnNlLnN0YXR1cyB0aGF0J3Mgbm90IHRoZSBodHRwIHN0YXR1c0NvZGVcbiAgICAgIHZhciBzdGF0dXMgPSBodHRwUmVzcG9uc2UgJiYgaHR0cFJlc3BvbnNlLmJvZHkgJiYgaHR0cFJlc3BvbnNlLmJvZHkubWVzc2FnZSAmJiBodHRwUmVzcG9uc2UuYm9keS5zdGF0dXMgfHxcblxuICAgICAgICAvLyB0aGlzIGlzIGltcG9ydGFudCB0byBjaGVjayB0aGUgcmVxdWVzdCBzdGF0dXNDb2RlIEFGVEVSIHRoZSBib2R5IGV2ZW50dWFsXG4gICAgICAgIC8vIHN0YXR1c0NvZGUgYmVjYXVzZSBzb21lIGltcGxlbWVudGF0aW9ucyAoalF1ZXJ5IFhEb21haW5SZXF1ZXN0IHRyYW5zcG9ydCkgbWF5XG4gICAgICAgIC8vIHNlbmQgc3RhdHVzQ29kZSAyMDAgd2hpbGUgd2UgaGFkIGFuIGVycm9yXG4gICAgICAgIGh0dHBSZXNwb25zZS5zdGF0dXNDb2RlIHx8XG5cbiAgICAgICAgLy8gV2hlbiBpbiBicm93c2VyIG1vZGUsIHVzaW5nIFhEUiBvciBKU09OUFxuICAgICAgICAvLyB3ZSBkZWZhdWx0IHRvIHN1Y2Nlc3Mgd2hlbiBubyBlcnJvciAobm8gcmVzcG9uc2Uuc3RhdHVzICYmIHJlc3BvbnNlLm1lc3NhZ2UpXG4gICAgICAgIC8vIElmIHRoZXJlIHdhcyBhIEpTT04ucGFyc2UoKSBlcnJvciB0aGVuIGJvZHkgaXMgbnVsbCBhbmQgaXQgZmFpbHNcbiAgICAgICAgaHR0cFJlc3BvbnNlICYmIGh0dHBSZXNwb25zZS5ib2R5ICYmIDIwMDtcblxuICAgICAgcmVxdWVzdERlYnVnKCdyZWNlaXZlZCByZXNwb25zZTogc3RhdHVzQ29kZTogJXMsIGNvbXB1dGVkIHN0YXR1c0NvZGU6ICVkLCBoZWFkZXJzOiAlaicsXG4gICAgICAgIGh0dHBSZXNwb25zZS5zdGF0dXNDb2RlLCBzdGF0dXMsIGh0dHBSZXNwb25zZS5oZWFkZXJzKTtcblxuICAgICAgdmFyIGh0dHBSZXNwb25zZU9rID0gTWF0aC5mbG9vcihzdGF0dXMgLyAxMDApID09PSAyO1xuXG4gICAgICB2YXIgZW5kVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICBkZWJ1Z0RhdGEucHVzaCh7XG4gICAgICAgIGN1cnJlbnRIb3N0OiBjdXJyZW50SG9zdCxcbiAgICAgICAgaGVhZGVyczogcmVtb3ZlQ3JlZGVudGlhbHMoaGVhZGVycyksXG4gICAgICAgIGNvbnRlbnQ6IGJvZHkgfHwgbnVsbCxcbiAgICAgICAgY29udGVudExlbmd0aDogYm9keSAhPT0gdW5kZWZpbmVkID8gYm9keS5sZW5ndGggOiBudWxsLFxuICAgICAgICBtZXRob2Q6IHJlcU9wdHMubWV0aG9kLFxuICAgICAgICB0aW1lb3V0czogcmVxT3B0cy50aW1lb3V0cyxcbiAgICAgICAgdXJsOiByZXFPcHRzLnVybCxcbiAgICAgICAgc3RhcnRUaW1lOiBzdGFydFRpbWUsXG4gICAgICAgIGVuZFRpbWU6IGVuZFRpbWUsXG4gICAgICAgIGR1cmF0aW9uOiBlbmRUaW1lIC0gc3RhcnRUaW1lLFxuICAgICAgICBzdGF0dXNDb2RlOiBzdGF0dXNcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaHR0cFJlc3BvbnNlT2spIHtcbiAgICAgICAgaWYgKGNsaWVudC5fdXNlQ2FjaGUgJiYgIWNsaWVudC5fdXNlUmVxdWVzdENhY2hlICYmIGNhY2hlKSB7XG4gICAgICAgICAgY2FjaGVbY2FjaGVJRF0gPSBodHRwUmVzcG9uc2UucmVzcG9uc2VUZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZXNwb25zZVRleHQ6IGh0dHBSZXNwb25zZS5yZXNwb25zZVRleHQsXG4gICAgICAgICAgYm9keTogaHR0cFJlc3BvbnNlLmJvZHlcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNob3VsZFJldHJ5ID0gTWF0aC5mbG9vcihzdGF0dXMgLyAxMDApICE9PSA0O1xuXG4gICAgICBpZiAoc2hvdWxkUmV0cnkpIHtcbiAgICAgICAgdHJpZXMgKz0gMTtcbiAgICAgICAgcmV0dXJuIHJldHJ5UmVxdWVzdCgpO1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0RGVidWcoJ3VucmVjb3ZlcmFibGUgZXJyb3InKTtcblxuICAgICAgLy8gbm8gc3VjY2VzcyBhbmQgbm8gcmV0cnkgPT4gZmFpbFxuICAgICAgdmFyIHVucmVjb3ZlcmFibGVFcnJvciA9IG5ldyBlcnJvcnMuQWxnb2xpYVNlYXJjaEVycm9yKFxuICAgICAgICBodHRwUmVzcG9uc2UuYm9keSAmJiBodHRwUmVzcG9uc2UuYm9keS5tZXNzYWdlLCB7ZGVidWdEYXRhOiBkZWJ1Z0RhdGEsIHN0YXR1c0NvZGU6IHN0YXR1c31cbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBjbGllbnQuX3Byb21pc2UucmVqZWN0KHVucmVjb3ZlcmFibGVFcnJvcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJ5RmFsbGJhY2soZXJyKSB7XG4gICAgICAvLyBlcnJvciBjYXNlczpcbiAgICAgIC8vICBXaGlsZSBub3QgaW4gZmFsbGJhY2sgbW9kZTpcbiAgICAgIC8vICAgIC0gQ09SUyBub3Qgc3VwcG9ydGVkXG4gICAgICAvLyAgICAtIG5ldHdvcmsgZXJyb3JcbiAgICAgIC8vICBXaGlsZSBpbiBmYWxsYmFjayBtb2RlOlxuICAgICAgLy8gICAgLSB0aW1lb3V0XG4gICAgICAvLyAgICAtIG5ldHdvcmsgZXJyb3JcbiAgICAgIC8vICAgIC0gYmFkbHkgZm9ybWF0dGVkIEpTT05QIChzY3JpcHQgbG9hZGVkLCBkaWQgbm90IGNhbGwgb3VyIGNhbGxiYWNrKVxuICAgICAgLy8gIEluIGJvdGggY2FzZXM6XG4gICAgICAvLyAgICAtIHVuY2F1Z2h0IGV4Y2VwdGlvbiBvY2N1cnMgKFR5cGVFcnJvcilcbiAgICAgIHJlcXVlc3REZWJ1ZygnZXJyb3I6ICVzLCBzdGFjazogJXMnLCBlcnIubWVzc2FnZSwgZXJyLnN0YWNrKTtcblxuICAgICAgdmFyIGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgZGVidWdEYXRhLnB1c2goe1xuICAgICAgICBjdXJyZW50SG9zdDogY3VycmVudEhvc3QsXG4gICAgICAgIGhlYWRlcnM6IHJlbW92ZUNyZWRlbnRpYWxzKGhlYWRlcnMpLFxuICAgICAgICBjb250ZW50OiBib2R5IHx8IG51bGwsXG4gICAgICAgIGNvbnRlbnRMZW5ndGg6IGJvZHkgIT09IHVuZGVmaW5lZCA/IGJvZHkubGVuZ3RoIDogbnVsbCxcbiAgICAgICAgbWV0aG9kOiByZXFPcHRzLm1ldGhvZCxcbiAgICAgICAgdGltZW91dHM6IHJlcU9wdHMudGltZW91dHMsXG4gICAgICAgIHVybDogcmVxT3B0cy51cmwsXG4gICAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lLFxuICAgICAgICBlbmRUaW1lOiBlbmRUaW1lLFxuICAgICAgICBkdXJhdGlvbjogZW5kVGltZSAtIHN0YXJ0VGltZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghKGVyciBpbnN0YW5jZW9mIGVycm9ycy5BbGdvbGlhU2VhcmNoRXJyb3IpKSB7XG4gICAgICAgIGVyciA9IG5ldyBlcnJvcnMuVW5rbm93bihlcnIgJiYgZXJyLm1lc3NhZ2UsIGVycik7XG4gICAgICB9XG5cbiAgICAgIHRyaWVzICs9IDE7XG5cbiAgICAgIC8vIHN0b3AgdGhlIHJlcXVlc3QgaW1wbGVtZW50YXRpb24gd2hlbjpcbiAgICAgIGlmIChcbiAgICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSB0aGlzIGVycm9yLFxuICAgICAgICAvLyBpdCBjb21lcyBmcm9tIGEgdGhyb3cgaW4gc29tZSBvdGhlciBwaWVjZSBvZiBjb2RlXG4gICAgICAgIGVyciBpbnN0YW5jZW9mIGVycm9ycy5Vbmtub3duIHx8XG5cbiAgICAgICAgLy8gc2VydmVyIHNlbnQgdW5wYXJzYWJsZSBKU09OXG4gICAgICAgIGVyciBpbnN0YW5jZW9mIGVycm9ycy5VbnBhcnNhYmxlSlNPTiB8fFxuXG4gICAgICAgIC8vIG1heCB0cmllcyBhbmQgYWxyZWFkeSB1c2luZyBmYWxsYmFjayBvciBubyBmYWxsYmFja1xuICAgICAgICB0cmllcyA+PSBjbGllbnQuaG9zdHNbaW5pdGlhbE9wdHMuaG9zdFR5cGVdLmxlbmd0aCAmJlxuICAgICAgICAodXNpbmdGYWxsYmFjayB8fCAhaGFzRmFsbGJhY2spKSB7XG4gICAgICAgIC8vIHN0b3AgcmVxdWVzdCBpbXBsZW1lbnRhdGlvbiBmb3IgdGhpcyBjb21tYW5kXG4gICAgICAgIGVyci5kZWJ1Z0RhdGEgPSBkZWJ1Z0RhdGE7XG4gICAgICAgIHJldHVybiBjbGllbnQuX3Byb21pc2UucmVqZWN0KGVycik7XG4gICAgICB9XG5cbiAgICAgIC8vIFdoZW4gYSB0aW1lb3V0IG9jY3VycmVkLCByZXRyeSBieSByYWlzaW5nIHRpbWVvdXRcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBlcnJvcnMuUmVxdWVzdFRpbWVvdXQpIHtcbiAgICAgICAgcmV0dXJuIHJldHJ5UmVxdWVzdFdpdGhIaWdoZXJUaW1lb3V0KCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXRyeVJlcXVlc3QoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXRyeVJlcXVlc3QoKSB7XG4gICAgICByZXF1ZXN0RGVidWcoJ3JldHJ5aW5nIHJlcXVlc3QnKTtcbiAgICAgIGNsaWVudC5faW5jcmVtZW50SG9zdEluZGV4KGluaXRpYWxPcHRzLmhvc3RUeXBlKTtcbiAgICAgIHJldHVybiBkb1JlcXVlc3QocmVxdWVzdGVyLCByZXFPcHRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXRyeVJlcXVlc3RXaXRoSGlnaGVyVGltZW91dCgpIHtcbiAgICAgIHJlcXVlc3REZWJ1ZygncmV0cnlpbmcgcmVxdWVzdCB3aXRoIGhpZ2hlciB0aW1lb3V0Jyk7XG4gICAgICBjbGllbnQuX2luY3JlbWVudEhvc3RJbmRleChpbml0aWFsT3B0cy5ob3N0VHlwZSk7XG4gICAgICBjbGllbnQuX2luY3JlbWVudFRpbWVvdXRNdWx0aXBsZXIoKTtcbiAgICAgIHJlcU9wdHMudGltZW91dHMgPSBjbGllbnQuX2dldFRpbWVvdXRzRm9yUmVxdWVzdChpbml0aWFsT3B0cy5ob3N0VHlwZSk7XG4gICAgICByZXR1cm4gZG9SZXF1ZXN0KHJlcXVlc3RlciwgcmVxT3B0cyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNDYWNoZVZhbGlkV2l0aEN1cnJlbnRJRChcbiAgICB1c2VSZXF1ZXN0Q2FjaGUsXG4gICAgY3VycmVudENhY2hlLFxuICAgIGN1cnJlbnRDYWNoZUlEXG4gICkge1xuICAgIHJldHVybiAoXG4gICAgICBjbGllbnQuX3VzZUNhY2hlICYmXG4gICAgICB1c2VSZXF1ZXN0Q2FjaGUgJiZcbiAgICAgIGN1cnJlbnRDYWNoZSAmJlxuICAgICAgY3VycmVudENhY2hlW2N1cnJlbnRDYWNoZUlEXSAhPT0gdW5kZWZpbmVkXG4gICAgKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gaW50ZXJvcENhbGxiYWNrUmV0dXJuKHJlcXVlc3QsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGlzQ2FjaGVWYWxpZFdpdGhDdXJyZW50SUQoY2xpZW50Ll91c2VSZXF1ZXN0Q2FjaGUsIGNhY2hlLCBjYWNoZUlEKSkge1xuICAgICAgcmVxdWVzdC5jYXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gUmVsZWFzZSB0aGUgY2FjaGUgb24gZXJyb3JcbiAgICAgICAgZGVsZXRlIGNhY2hlW2NhY2hlSURdO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbml0aWFsT3B0cy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gZWl0aGVyIHdlIGhhdmUgYSBjYWxsYmFja1xuICAgICAgcmVxdWVzdC50aGVuKGZ1bmN0aW9uIG9rQ2IoY29udGVudCkge1xuICAgICAgICBleGl0UHJvbWlzZShmdW5jdGlvbigpIHtcbiAgICAgICAgICBpbml0aWFsT3B0cy5jYWxsYmFjayhudWxsLCBjYWxsYmFjayhjb250ZW50KSk7XG4gICAgICAgIH0sIGNsaWVudC5fc2V0VGltZW91dCB8fCBzZXRUaW1lb3V0KTtcbiAgICAgIH0sIGZ1bmN0aW9uIG5vb2tDYihlcnIpIHtcbiAgICAgICAgZXhpdFByb21pc2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaW5pdGlhbE9wdHMuY2FsbGJhY2soZXJyKTtcbiAgICAgICAgfSwgY2xpZW50Ll9zZXRUaW1lb3V0IHx8IHNldFRpbWVvdXQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVpdGhlciB3ZSBhcmUgdXNpbmcgcHJvbWlzZXNcbiAgICAgIHJldHVybiByZXF1ZXN0LnRoZW4oY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjbGllbnQuX3VzZUNhY2hlICYmIGNsaWVudC5fdXNlUmVxdWVzdENhY2hlKSB7XG4gICAgY2FjaGVJRCA9IGluaXRpYWxPcHRzLnVybDtcbiAgfVxuXG4gIC8vIGFzIHdlIHNvbWV0aW1lIHVzZSBQT1NUIHJlcXVlc3RzIHRvIHBhc3MgcGFyYW1ldGVycyAobGlrZSBxdWVyeT0nYWEnKSxcbiAgLy8gdGhlIGNhY2hlSUQgbXVzdCBhbHNvIGluY2x1ZGUgdGhlIGJvZHkgdG8gYmUgZGlmZmVyZW50IGJldHdlZW4gY2FsbHNcbiAgaWYgKGNsaWVudC5fdXNlQ2FjaGUgJiYgY2xpZW50Ll91c2VSZXF1ZXN0Q2FjaGUgJiYgYm9keSkge1xuICAgIGNhY2hlSUQgKz0gJ19ib2R5XycgKyBib2R5O1xuICB9XG5cbiAgaWYgKGlzQ2FjaGVWYWxpZFdpdGhDdXJyZW50SUQoY2xpZW50Ll91c2VSZXF1ZXN0Q2FjaGUsIGNhY2hlLCBjYWNoZUlEKSkge1xuICAgIHJlcXVlc3REZWJ1Zygnc2VydmluZyByZXF1ZXN0IGZyb20gY2FjaGUnKTtcblxuICAgIHZhciBtYXliZVByb21pc2VGb3JDYWNoZSA9IGNhY2hlW2NhY2hlSURdO1xuXG4gICAgLy8gSW4gY2FzZSB0aGUgY2FjaGUgaXMgd2FybXVwIHdpdGggdmFsdWUgdGhhdCBpcyBub3QgYSBwcm9taXNlXG4gICAgdmFyIHByb21pc2VGb3JDYWNoZSA9IHR5cGVvZiBtYXliZVByb21pc2VGb3JDYWNoZS50aGVuICE9PSAnZnVuY3Rpb24nXG4gICAgICA/IGNsaWVudC5fcHJvbWlzZS5yZXNvbHZlKHtyZXNwb25zZVRleHQ6IG1heWJlUHJvbWlzZUZvckNhY2hlfSlcbiAgICAgIDogbWF5YmVQcm9taXNlRm9yQ2FjaGU7XG5cbiAgICByZXR1cm4gaW50ZXJvcENhbGxiYWNrUmV0dXJuKHByb21pc2VGb3JDYWNoZSwgZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgLy8gSW4gY2FzZSBvZiB0aGUgY2FjaGUgcmVxdWVzdCwgcmV0dXJuIHRoZSBvcmlnaW5hbCB2YWx1ZVxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudC5yZXNwb25zZVRleHQpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHJlcXVlc3QgPSBkb1JlcXVlc3QoXG4gICAgY2xpZW50Ll9yZXF1ZXN0LCB7XG4gICAgICB1cmw6IGluaXRpYWxPcHRzLnVybCxcbiAgICAgIG1ldGhvZDogaW5pdGlhbE9wdHMubWV0aG9kLFxuICAgICAgYm9keTogYm9keSxcbiAgICAgIGpzb25Cb2R5OiBpbml0aWFsT3B0cy5ib2R5LFxuICAgICAgdGltZW91dHM6IGNsaWVudC5fZ2V0VGltZW91dHNGb3JSZXF1ZXN0KGluaXRpYWxPcHRzLmhvc3RUeXBlKSxcbiAgICAgIGZvcmNlQXV0aEhlYWRlcnM6IGluaXRpYWxPcHRzLmZvcmNlQXV0aEhlYWRlcnNcbiAgICB9XG4gICk7XG5cbiAgaWYgKGNsaWVudC5fdXNlQ2FjaGUgJiYgY2xpZW50Ll91c2VSZXF1ZXN0Q2FjaGUgJiYgY2FjaGUpIHtcbiAgICBjYWNoZVtjYWNoZUlEXSA9IHJlcXVlc3Q7XG4gIH1cblxuICByZXR1cm4gaW50ZXJvcENhbGxiYWNrUmV0dXJuKHJlcXVlc3QsIGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAvLyBJbiBjYXNlIG9mIHRoZSBmaXJzdCByZXF1ZXN0LCByZXR1cm4gdGhlIEpTT04gdmFsdWVcbiAgICByZXR1cm4gY29udGVudC5ib2R5O1xuICB9KTtcbn07XG5cbi8qXG4qIFRyYW5zZm9ybSBzZWFyY2ggcGFyYW0gb2JqZWN0IGluIHF1ZXJ5IHN0cmluZ1xuKiBAcGFyYW0ge29iamVjdH0gYXJncyBhcmd1bWVudHMgdG8gYWRkIHRvIHRoZSBjdXJyZW50IHF1ZXJ5IHN0cmluZ1xuKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zIGN1cnJlbnQgcXVlcnkgc3RyaW5nXG4qIEByZXR1cm4ge3N0cmluZ30gdGhlIGZpbmFsIHF1ZXJ5IHN0cmluZ1xuKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fZ2V0U2VhcmNoUGFyYW1zID0gZnVuY3Rpb24oYXJncywgcGFyYW1zKSB7XG4gIGlmIChhcmdzID09PSB1bmRlZmluZWQgfHwgYXJncyA9PT0gbnVsbCkge1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIGFyZ3MpIHtcbiAgICBpZiAoa2V5ICE9PSBudWxsICYmIGFyZ3Nba2V5XSAhPT0gdW5kZWZpbmVkICYmIGFyZ3MuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcGFyYW1zICs9IHBhcmFtcyA9PT0gJycgPyAnJyA6ICcmJztcbiAgICAgIHBhcmFtcyArPSBrZXkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3Nba2V5XSkgPT09ICdbb2JqZWN0IEFycmF5XScgPyBzYWZlSlNPTlN0cmluZ2lmeShhcmdzW2tleV0pIDogYXJnc1trZXldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBhcmFtcztcbn07XG5cbi8qKlxuICogQ29tcHV0ZSB0aGUgaGVhZGVycyBmb3IgYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIFtzdHJpbmddIG9wdGlvbnMuYWRkaXRpb25hbFVBIHNlbWktY29sb24gc2VwYXJhdGVkIHN0cmluZyB3aXRoIG90aGVyIHVzZXIgYWdlbnRzIHRvIGFkZFxuICogQHBhcmFtIFtib29sZWFuPXRydWVdIG9wdGlvbnMud2l0aEFwaUtleSBTZW5kIHRoZSBhcGkga2V5IGFzIGEgaGVhZGVyXG4gKiBAcGFyYW0gW09iamVjdF0gb3B0aW9ucy5oZWFkZXJzIEV4dHJhIGhlYWRlcnMgdG8gc2VuZFxuICovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2NvbXB1dGVSZXF1ZXN0SGVhZGVycyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdmFyIGZvckVhY2ggPSByZXF1aXJlKCdmb3JlYWNoJyk7XG5cbiAgdmFyIHVhID0gb3B0aW9ucy5hZGRpdGlvbmFsVUEgP1xuICAgIHRoaXMuX3VhICsgJzsgJyArIG9wdGlvbnMuYWRkaXRpb25hbFVBIDpcbiAgICB0aGlzLl91YTtcblxuICB2YXIgcmVxdWVzdEhlYWRlcnMgPSB7XG4gICAgJ3gtYWxnb2xpYS1hZ2VudCc6IHVhLFxuICAgICd4LWFsZ29saWEtYXBwbGljYXRpb24taWQnOiB0aGlzLmFwcGxpY2F0aW9uSURcbiAgfTtcblxuICAvLyBicm93c2VyIHdpbGwgaW5saW5lIGhlYWRlcnMgaW4gdGhlIHVybCwgbm9kZS5qcyB3aWxsIHVzZSBodHRwIGhlYWRlcnNcbiAgLy8gYnV0IGluIHNvbWUgc2l0dWF0aW9ucywgdGhlIEFQSSBLRVkgd2lsbCBiZSB0b28gbG9uZyAoYmlnIHNlY3VyZWQgQVBJIGtleXMpXG4gIC8vIHNvIGlmIHRoZSByZXF1ZXN0IGlzIGEgUE9TVCBhbmQgdGhlIEtFWSBpcyB2ZXJ5IGxvbmcsIHdlIHdpbGwgYmUgYXNrZWQgdG8gbm90IHB1dFxuICAvLyBpdCBpbnRvIGhlYWRlcnMgYnV0IGluIHRoZSBKU09OIGJvZHlcbiAgaWYgKG9wdGlvbnMud2l0aEFwaUtleSAhPT0gZmFsc2UpIHtcbiAgICByZXF1ZXN0SGVhZGVyc1sneC1hbGdvbGlhLWFwaS1rZXknXSA9IHRoaXMuYXBpS2V5O1xuICB9XG5cbiAgaWYgKHRoaXMudXNlclRva2VuKSB7XG4gICAgcmVxdWVzdEhlYWRlcnNbJ3gtYWxnb2xpYS11c2VydG9rZW4nXSA9IHRoaXMudXNlclRva2VuO1xuICB9XG5cbiAgaWYgKHRoaXMuc2VjdXJpdHlUYWdzKSB7XG4gICAgcmVxdWVzdEhlYWRlcnNbJ3gtYWxnb2xpYS10YWdmaWx0ZXJzJ10gPSB0aGlzLnNlY3VyaXR5VGFncztcbiAgfVxuXG4gIGZvckVhY2godGhpcy5leHRyYUhlYWRlcnMsIGZ1bmN0aW9uIGFkZFRvUmVxdWVzdEhlYWRlcnModmFsdWUsIGtleSkge1xuICAgIHJlcXVlc3RIZWFkZXJzW2tleV0gPSB2YWx1ZTtcbiAgfSk7XG5cbiAgaWYgKG9wdGlvbnMuaGVhZGVycykge1xuICAgIGZvckVhY2gob3B0aW9ucy5oZWFkZXJzLCBmdW5jdGlvbiBhZGRUb1JlcXVlc3RIZWFkZXJzKHZhbHVlLCBrZXkpIHtcbiAgICAgIHJlcXVlc3RIZWFkZXJzW2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXF1ZXN0SGVhZGVycztcbn07XG5cbi8qKlxuICogU2VhcmNoIHRocm91Z2ggbXVsdGlwbGUgaW5kaWNlcyBhdCB0aGUgc2FtZSB0aW1lXG4gKiBAcGFyYW0gIHtPYmplY3RbXX0gICBxdWVyaWVzICBBbiBhcnJheSBvZiBxdWVyaWVzIHlvdSB3YW50IHRvIHJ1bi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyaWVzW10uaW5kZXhOYW1lIFRoZSBpbmRleCBuYW1lIHlvdSB3YW50IHRvIHRhcmdldFxuICogQHBhcmFtIHtzdHJpbmd9IFtxdWVyaWVzW10ucXVlcnldIFRoZSBxdWVyeSB0byBpc3N1ZSBvbiB0aGlzIGluZGV4LiBDYW4gYWxzbyBiZSBwYXNzZWQgaW50byBgcGFyYW1zYFxuICogQHBhcmFtIHtPYmplY3R9IHF1ZXJpZXNbXS5wYXJhbXMgQW55IHNlYXJjaCBwYXJhbSBsaWtlIGhpdHNQZXJQYWdlLCAuLlxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGJlIGNhbGxlZFxuICogQHJldHVybiB7UHJvbWlzZXx1bmRlZmluZWR9IFJldHVybnMgYSBwcm9taXNlIGlmIG5vIGNhbGxiYWNrIGdpdmVuXG4gKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbihxdWVyaWVzLCBvcHRzLCBjYWxsYmFjaykge1xuICB2YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbiAgdmFyIG1hcCA9IHJlcXVpcmUoJy4vbWFwLmpzJyk7XG5cbiAgdmFyIHVzYWdlID0gJ1VzYWdlOiBjbGllbnQuc2VhcmNoKGFycmF5T2ZRdWVyaWVzWywgY2FsbGJhY2tdKSc7XG5cbiAgaWYgKCFpc0FycmF5KHF1ZXJpZXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHVzYWdlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0cztcbiAgICBvcHRzID0ge307XG4gIH0gZWxzZSBpZiAob3B0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgb3B0cyA9IHt9O1xuICB9XG5cbiAgdmFyIGNsaWVudCA9IHRoaXM7XG5cbiAgdmFyIHBvc3RPYmogPSB7XG4gICAgcmVxdWVzdHM6IG1hcChxdWVyaWVzLCBmdW5jdGlvbiBwcmVwYXJlUmVxdWVzdChxdWVyeSkge1xuICAgICAgdmFyIHBhcmFtcyA9ICcnO1xuXG4gICAgICAvLyBhbGxvdyBxdWVyeS5xdWVyeVxuICAgICAgLy8gc28gd2UgYXJlIG1pbWljaW5nIHRoZSBpbmRleC5zZWFyY2gocXVlcnksIHBhcmFtcykgbWV0aG9kXG4gICAgICAvLyB7aW5kZXhOYW1lOiwgcXVlcnk6LCBwYXJhbXM6fVxuICAgICAgaWYgKHF1ZXJ5LnF1ZXJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGFyYW1zICs9ICdxdWVyeT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5LnF1ZXJ5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXhOYW1lOiBxdWVyeS5pbmRleE5hbWUsXG4gICAgICAgIHBhcmFtczogY2xpZW50Ll9nZXRTZWFyY2hQYXJhbXMocXVlcnkucGFyYW1zLCBwYXJhbXMpXG4gICAgICB9O1xuICAgIH0pXG4gIH07XG5cbiAgdmFyIEpTT05QUGFyYW1zID0gbWFwKHBvc3RPYmoucmVxdWVzdHMsIGZ1bmN0aW9uIHByZXBhcmVKU09OUFBhcmFtcyhyZXF1ZXN0LCByZXF1ZXN0SWQpIHtcbiAgICByZXR1cm4gcmVxdWVzdElkICsgJz0nICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgJy8xL2luZGV4ZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXF1ZXN0LmluZGV4TmFtZSkgKyAnPycgK1xuICAgICAgICByZXF1ZXN0LnBhcmFtc1xuICAgICAgKTtcbiAgfSkuam9pbignJicpO1xuXG4gIHZhciB1cmwgPSAnLzEvaW5kZXhlcy8qL3F1ZXJpZXMnO1xuXG4gIGlmIChvcHRzLnN0cmF0ZWd5ICE9PSB1bmRlZmluZWQpIHtcbiAgICBwb3N0T2JqLnN0cmF0ZWd5ID0gb3B0cy5zdHJhdGVneTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9qc29uUmVxdWVzdCh7XG4gICAgY2FjaGU6IHRoaXMuY2FjaGUsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgdXJsOiB1cmwsXG4gICAgYm9keTogcG9zdE9iaixcbiAgICBob3N0VHlwZTogJ3JlYWQnLFxuICAgIGZhbGxiYWNrOiB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiAnLzEvaW5kZXhlcy8qJyxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgcGFyYW1zOiBKU09OUFBhcmFtc1xuICAgICAgfVxuICAgIH0sXG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gIH0pO1xufTtcblxuLyoqXG4qIFNlYXJjaCBmb3IgZmFjZXQgdmFsdWVzXG4qIGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL2RvYy9yZXN0LWFwaS9zZWFyY2gjc2VhcmNoLWZvci1mYWNldC12YWx1ZXNcbiogVGhpcyBpcyB0aGUgdG9wLWxldmVsIEFQSSBmb3IgU0ZGVi5cbipcbiogQHBhcmFtIHtvYmplY3RbXX0gcXVlcmllcyBBbiBhcnJheSBvZiBxdWVyaWVzIHRvIHJ1bi5cbiogQHBhcmFtIHtzdHJpbmd9IHF1ZXJpZXNbXS5pbmRleE5hbWUgSW5kZXggbmFtZSwgbmFtZSBvZiB0aGUgaW5kZXggdG8gc2VhcmNoLlxuKiBAcGFyYW0ge29iamVjdH0gcXVlcmllc1tdLnBhcmFtcyBRdWVyeSBwYXJhbWV0ZXJzLlxuKiBAcGFyYW0ge3N0cmluZ30gcXVlcmllc1tdLnBhcmFtcy5mYWNldE5hbWUgRmFjZXQgbmFtZSwgbmFtZSBvZiB0aGUgYXR0cmlidXRlIHRvIHNlYXJjaCBmb3IgdmFsdWVzIGluLlxuKiBNdXN0IGJlIGRlY2xhcmVkIGFzIGEgZmFjZXRcbiogQHBhcmFtIHtzdHJpbmd9IHF1ZXJpZXNbXS5wYXJhbXMuZmFjZXRRdWVyeSBRdWVyeSBmb3IgdGhlIGZhY2V0IHNlYXJjaFxuKiBAcGFyYW0ge3N0cmluZ30gW3F1ZXJpZXNbXS5wYXJhbXMuKl0gQW55IHNlYXJjaCBwYXJhbWV0ZXIgb2YgQWxnb2xpYSxcbiogc2VlIGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL2RvYy9hcGktY2xpZW50L2phdmFzY3JpcHQvc2VhcmNoI3NlYXJjaC1wYXJhbWV0ZXJzXG4qIFBhZ2luYXRpb24gaXMgbm90IHN1cHBvcnRlZC4gVGhlIHBhZ2UgYW5kIGhpdHNQZXJQYWdlIHBhcmFtZXRlcnMgd2lsbCBiZSBpZ25vcmVkLlxuKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5zZWFyY2hGb3JGYWNldFZhbHVlcyA9IGZ1bmN0aW9uKHF1ZXJpZXMpIHtcbiAgdmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG4gIHZhciBtYXAgPSByZXF1aXJlKCcuL21hcC5qcycpO1xuXG4gIHZhciB1c2FnZSA9ICdVc2FnZTogY2xpZW50LnNlYXJjaEZvckZhY2V0VmFsdWVzKFt7aW5kZXhOYW1lLCBwYXJhbXM6IHtmYWNldE5hbWUsIGZhY2V0UXVlcnksIC4uLnBhcmFtc319LCAuLi5xdWVyaWVzXSknOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1sZW5cblxuICBpZiAoIWlzQXJyYXkocXVlcmllcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodXNhZ2UpO1xuICB9XG5cbiAgdmFyIGNsaWVudCA9IHRoaXM7XG5cbiAgcmV0dXJuIGNsaWVudC5fcHJvbWlzZS5hbGwobWFwKHF1ZXJpZXMsIGZ1bmN0aW9uIHBlcmZvcm1RdWVyeShxdWVyeSkge1xuICAgIGlmIChcbiAgICAgICFxdWVyeSB8fFxuICAgICAgcXVlcnkuaW5kZXhOYW1lID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHF1ZXJ5LnBhcmFtcy5mYWNldE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgcXVlcnkucGFyYW1zLmZhY2V0UXVlcnkgPT09IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHVzYWdlKTtcbiAgICB9XG5cbiAgICB2YXIgY2xvbmUgPSByZXF1aXJlKCcuL2Nsb25lLmpzJyk7XG4gICAgdmFyIG9taXQgPSByZXF1aXJlKCcuL29taXQuanMnKTtcblxuICAgIHZhciBpbmRleE5hbWUgPSBxdWVyeS5pbmRleE5hbWU7XG4gICAgdmFyIHBhcmFtcyA9IHF1ZXJ5LnBhcmFtcztcblxuICAgIHZhciBmYWNldE5hbWUgPSBwYXJhbXMuZmFjZXROYW1lO1xuICAgIHZhciBmaWx0ZXJlZFBhcmFtcyA9IG9taXQoY2xvbmUocGFyYW1zKSwgZnVuY3Rpb24oa2V5TmFtZSkge1xuICAgICAgcmV0dXJuIGtleU5hbWUgPT09ICdmYWNldE5hbWUnO1xuICAgIH0pO1xuICAgIHZhciBzZWFyY2hQYXJhbWV0ZXJzID0gY2xpZW50Ll9nZXRTZWFyY2hQYXJhbXMoZmlsdGVyZWRQYXJhbXMsICcnKTtcblxuICAgIHJldHVybiBjbGllbnQuX2pzb25SZXF1ZXN0KHtcbiAgICAgIGNhY2hlOiBjbGllbnQuY2FjaGUsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDpcbiAgICAgICAgJy8xL2luZGV4ZXMvJyArXG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChpbmRleE5hbWUpICtcbiAgICAgICAgJy9mYWNldHMvJyArXG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChmYWNldE5hbWUpICtcbiAgICAgICAgJy9xdWVyeScsXG4gICAgICBob3N0VHlwZTogJ3JlYWQnLFxuICAgICAgYm9keToge3BhcmFtczogc2VhcmNoUGFyYW1ldGVyc31cbiAgICB9KTtcbiAgfSkpO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGV4dHJhIHNlY3VyaXR5IHRhZ0ZpbHRlcnMgaGVhZGVyXG4gKiBAcGFyYW0ge3N0cmluZ3xhcnJheX0gdGFncyBUaGUgbGlzdCBvZiB0YWdzIGRlZmluaW5nIHRoZSBjdXJyZW50IHNlY3VyaXR5IGZpbHRlcnNcbiAqL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLnNldFNlY3VyaXR5VGFncyA9IGZ1bmN0aW9uKHRhZ3MpIHtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0YWdzKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHZhciBzdHJUYWdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWdzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRhZ3NbaV0pID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgIHZhciBvcmVkVGFncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRhZ3NbaV0ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICBvcmVkVGFncy5wdXNoKHRhZ3NbaV1bal0pO1xuICAgICAgICB9XG4gICAgICAgIHN0clRhZ3MucHVzaCgnKCcgKyBvcmVkVGFncy5qb2luKCcsJykgKyAnKScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyVGFncy5wdXNoKHRhZ3NbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0YWdzID0gc3RyVGFncy5qb2luKCcsJyk7XG4gIH1cblxuICB0aGlzLnNlY3VyaXR5VGFncyA9IHRhZ3M7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgZXh0cmEgdXNlciB0b2tlbiBoZWFkZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyVG9rZW4gVGhlIHRva2VuIGlkZW50aWZ5aW5nIGEgdW5pcSB1c2VyICh1c2VkIHRvIGFwcGx5IHJhdGUgbGltaXRzKVxuICovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuc2V0VXNlclRva2VuID0gZnVuY3Rpb24odXNlclRva2VuKSB7XG4gIHRoaXMudXNlclRva2VuID0gdXNlclRva2VuO1xufTtcblxuLyoqXG4gKiBDbGVhciBhbGwgcXVlcmllcyBpbiBjbGllbnQncyBjYWNoZVxuICogQHJldHVybiB1bmRlZmluZWRcbiAqL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jYWNoZSA9IHt9O1xufTtcblxuLyoqXG4qIFNldCB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBhIHJlcXVlc3QgY2FuIHRha2UgYmVmb3JlIGF1dG9tYXRpY2FsbHkgYmVpbmcgdGVybWluYXRlZC5cbiogQGRlcHJlY2F0ZWRcbiogQHBhcmFtIHtOdW1iZXJ9IG1pbGxpc2Vjb25kc1xuKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5zZXRSZXF1ZXN0VGltZW91dCA9IGZ1bmN0aW9uKG1pbGxpc2Vjb25kcykge1xuICBpZiAobWlsbGlzZWNvbmRzKSB7XG4gICAgdGhpcy5fdGltZW91dHMuY29ubmVjdCA9IHRoaXMuX3RpbWVvdXRzLnJlYWQgPSB0aGlzLl90aW1lb3V0cy53cml0ZSA9IG1pbGxpc2Vjb25kcztcbiAgfVxufTtcblxuLyoqXG4qIFNldCB0aGUgdGhyZWUgZGlmZmVyZW50IChjb25uZWN0LCByZWFkLCB3cml0ZSkgdGltZW91dHMgdG8gYmUgdXNlZCB3aGVuIHJlcXVlc3RpbmdcbiogQHBhcmFtIHtPYmplY3R9IHRpbWVvdXRzXG4qL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLnNldFRpbWVvdXRzID0gZnVuY3Rpb24odGltZW91dHMpIHtcbiAgdGhpcy5fdGltZW91dHMgPSB0aW1lb3V0cztcbn07XG5cbi8qKlxuKiBHZXQgdGhlIHRocmVlIGRpZmZlcmVudCAoY29ubmVjdCwgcmVhZCwgd3JpdGUpIHRpbWVvdXRzIHRvIGJlIHVzZWQgd2hlbiByZXF1ZXN0aW5nXG4qIEBwYXJhbSB7T2JqZWN0fSB0aW1lb3V0c1xuKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5nZXRUaW1lb3V0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fdGltZW91dHM7XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2dldEFwcElkRGF0YSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZGF0YSA9IHN0b3JlLmdldCh0aGlzLmFwcGxpY2F0aW9uSUQpO1xuICBpZiAoZGF0YSAhPT0gbnVsbCkgdGhpcy5fY2FjaGVBcHBJZERhdGEoZGF0YSk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9zZXRBcHBJZERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIGRhdGEubGFzdENoYW5nZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gIHRoaXMuX2NhY2hlQXBwSWREYXRhKGRhdGEpO1xuICByZXR1cm4gc3RvcmUuc2V0KHRoaXMuYXBwbGljYXRpb25JRCwgZGF0YSk7XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2NoZWNrQXBwSWREYXRhID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fZ2V0QXBwSWREYXRhKCk7XG4gIHZhciBub3cgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICBpZiAoZGF0YSA9PT0gbnVsbCB8fCBub3cgLSBkYXRhLmxhc3RDaGFuZ2UgPiBSRVNFVF9BUFBfREFUQV9USU1FUikge1xuICAgIHJldHVybiB0aGlzLl9yZXNldEluaXRpYWxBcHBJZERhdGEoZGF0YSk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fcmVzZXRJbml0aWFsQXBwSWREYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICB2YXIgbmV3RGF0YSA9IGRhdGEgfHwge307XG4gIG5ld0RhdGEuaG9zdEluZGV4ZXMgPSB7cmVhZDogMCwgd3JpdGU6IDB9O1xuICBuZXdEYXRhLnRpbWVvdXRNdWx0aXBsaWVyID0gMTtcbiAgbmV3RGF0YS5zaHVmZmxlUmVzdWx0ID0gbmV3RGF0YS5zaHVmZmxlUmVzdWx0IHx8IHNodWZmbGUoWzEsIDIsIDNdKTtcbiAgcmV0dXJuIHRoaXMuX3NldEFwcElkRGF0YShuZXdEYXRhKTtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fY2FjaGVBcHBJZERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMuX2hvc3RJbmRleGVzID0gZGF0YS5ob3N0SW5kZXhlcztcbiAgdGhpcy5fdGltZW91dE11bHRpcGxpZXIgPSBkYXRhLnRpbWVvdXRNdWx0aXBsaWVyO1xuICB0aGlzLl9zaHVmZmxlUmVzdWx0ID0gZGF0YS5zaHVmZmxlUmVzdWx0O1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9wYXJ0aWFsQXBwSWREYXRhVXBkYXRlID0gZnVuY3Rpb24obmV3RGF0YSkge1xuICB2YXIgZm9yZWFjaCA9IHJlcXVpcmUoJ2ZvcmVhY2gnKTtcbiAgdmFyIGN1cnJlbnREYXRhID0gdGhpcy5fZ2V0QXBwSWREYXRhKCk7XG4gIGZvcmVhY2gobmV3RGF0YSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIGN1cnJlbnREYXRhW2tleV0gPSB2YWx1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIHRoaXMuX3NldEFwcElkRGF0YShjdXJyZW50RGF0YSk7XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2dldEhvc3RCeVR5cGUgPSBmdW5jdGlvbihob3N0VHlwZSkge1xuICByZXR1cm4gdGhpcy5ob3N0c1tob3N0VHlwZV1bdGhpcy5fZ2V0SG9zdEluZGV4QnlUeXBlKGhvc3RUeXBlKV07XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2dldFRpbWVvdXRNdWx0aXBsaWVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl90aW1lb3V0TXVsdGlwbGllcjtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fZ2V0SG9zdEluZGV4QnlUeXBlID0gZnVuY3Rpb24oaG9zdFR5cGUpIHtcbiAgcmV0dXJuIHRoaXMuX2hvc3RJbmRleGVzW2hvc3RUeXBlXTtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fc2V0SG9zdEluZGV4QnlUeXBlID0gZnVuY3Rpb24oaG9zdEluZGV4LCBob3N0VHlwZSkge1xuICB2YXIgY2xvbmUgPSByZXF1aXJlKCcuL2Nsb25lJyk7XG4gIHZhciBuZXdIb3N0SW5kZXhlcyA9IGNsb25lKHRoaXMuX2hvc3RJbmRleGVzKTtcbiAgbmV3SG9zdEluZGV4ZXNbaG9zdFR5cGVdID0gaG9zdEluZGV4O1xuICB0aGlzLl9wYXJ0aWFsQXBwSWREYXRhVXBkYXRlKHtob3N0SW5kZXhlczogbmV3SG9zdEluZGV4ZXN9KTtcbiAgcmV0dXJuIGhvc3RJbmRleDtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5faW5jcmVtZW50SG9zdEluZGV4ID0gZnVuY3Rpb24oaG9zdFR5cGUpIHtcbiAgcmV0dXJuIHRoaXMuX3NldEhvc3RJbmRleEJ5VHlwZShcbiAgICAodGhpcy5fZ2V0SG9zdEluZGV4QnlUeXBlKGhvc3RUeXBlKSArIDEpICUgdGhpcy5ob3N0c1tob3N0VHlwZV0ubGVuZ3RoLCBob3N0VHlwZVxuICApO1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9pbmNyZW1lbnRUaW1lb3V0TXVsdGlwbGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aW1lb3V0TXVsdGlwbGllciA9IE1hdGgubWF4KHRoaXMuX3RpbWVvdXRNdWx0aXBsaWVyICsgMSwgNCk7XG4gIHJldHVybiB0aGlzLl9wYXJ0aWFsQXBwSWREYXRhVXBkYXRlKHt0aW1lb3V0TXVsdGlwbGllcjogdGltZW91dE11bHRpcGxpZXJ9KTtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fZ2V0VGltZW91dHNGb3JSZXF1ZXN0ID0gZnVuY3Rpb24oaG9zdFR5cGUpIHtcbiAgcmV0dXJuIHtcbiAgICBjb25uZWN0OiB0aGlzLl90aW1lb3V0cy5jb25uZWN0ICogdGhpcy5fdGltZW91dE11bHRpcGxpZXIsXG4gICAgY29tcGxldGU6IHRoaXMuX3RpbWVvdXRzW2hvc3RUeXBlXSAqIHRoaXMuX3RpbWVvdXRNdWx0aXBsaWVyXG4gIH07XG59O1xuXG5mdW5jdGlvbiBwcmVwYXJlSG9zdChwcm90b2NvbCkge1xuICByZXR1cm4gZnVuY3Rpb24gcHJlcGFyZShob3N0KSB7XG4gICAgcmV0dXJuIHByb3RvY29sICsgJy8vJyArIGhvc3QudG9Mb3dlckNhc2UoKTtcbiAgfTtcbn1cblxuLy8gUHJvdG90eXBlLmpzIDwgMS43LCBhIHdpZGVseSB1c2VkIGxpYnJhcnksIGRlZmluZXMgYSB3ZWlyZFxuLy8gQXJyYXkucHJvdG90eXBlLnRvSlNPTiBmdW5jdGlvbiB0aGF0IHdpbGwgZmFpbCB0byBzdHJpbmdpZnkgb3VyIGNvbnRlbnRcbi8vIGFwcHJvcHJpYXRlbHlcbi8vIHJlZnM6XG4vLyAgIC0gaHR0cHM6Ly9ncm91cHMuZ29vZ2xlLmNvbS9mb3J1bS8jIXRvcGljL3Byb3RvdHlwZS1jb3JlL0UtU0FWdlZfVjlRXG4vLyAgIC0gaHR0cHM6Ly9naXRodWIuY29tL3NzdGVwaGVuc29uL3Byb3RvdHlwZS9jb21taXQvMDM4YTI5ODVhNzA1OTNjMWE4NmMyMzBmYWRiZGZlMmU0ODk4YTQ4Y1xuLy8gICAtIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMxNDg0NDEvMTQ3MDc5XG5mdW5jdGlvbiBzYWZlSlNPTlN0cmluZ2lmeShvYmopIHtcbiAgLyogZXNsaW50IG5vLWV4dGVuZC1uYXRpdmU6MCAqL1xuXG4gIGlmIChBcnJheS5wcm90b3R5cGUudG9KU09OID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfVxuXG4gIHZhciB0b0pTT04gPSBBcnJheS5wcm90b3R5cGUudG9KU09OO1xuICBkZWxldGUgQXJyYXkucHJvdG90eXBlLnRvSlNPTjtcbiAgdmFyIG91dCA9IEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIEFycmF5LnByb3RvdHlwZS50b0pTT04gPSB0b0pTT047XG5cbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xuICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoO1xuICB2YXIgdGVtcG9yYXJ5VmFsdWU7XG4gIHZhciByYW5kb21JbmRleDtcblxuICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICB3aGlsZSAoY3VycmVudEluZGV4ICE9PSAwKSB7XG4gICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuXG4gICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgIHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcbiAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiByZW1vdmVDcmVkZW50aWFscyhoZWFkZXJzKSB7XG4gIHZhciBuZXdIZWFkZXJzID0ge307XG5cbiAgZm9yICh2YXIgaGVhZGVyTmFtZSBpbiBoZWFkZXJzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoZWFkZXJzLCBoZWFkZXJOYW1lKSkge1xuICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICBpZiAoaGVhZGVyTmFtZSA9PT0gJ3gtYWxnb2xpYS1hcGkta2V5JyB8fCBoZWFkZXJOYW1lID09PSAneC1hbGdvbGlhLWFwcGxpY2F0aW9uLWlkJykge1xuICAgICAgICB2YWx1ZSA9ICcqKmhpZGRlbiBmb3Igc2VjdXJpdHkgcHVycG9zZXMqKic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGhlYWRlcnNbaGVhZGVyTmFtZV07XG4gICAgICB9XG5cbiAgICAgIG5ld0hlYWRlcnNbaGVhZGVyTmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3SGVhZGVycztcbn1cbiIsInZhciBidWlsZFNlYXJjaE1ldGhvZCA9IHJlcXVpcmUoJy4vYnVpbGRTZWFyY2hNZXRob2QuanMnKTtcbnZhciBkZXByZWNhdGUgPSByZXF1aXJlKCcuL2RlcHJlY2F0ZS5qcycpO1xudmFyIGRlcHJlY2F0ZWRNZXNzYWdlID0gcmVxdWlyZSgnLi9kZXByZWNhdGVkTWVzc2FnZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEluZGV4Q29yZTtcblxuLypcbiogSW5kZXggY2xhc3MgY29uc3RydWN0b3IuXG4qIFlvdSBzaG91bGQgbm90IHVzZSB0aGlzIG1ldGhvZCBkaXJlY3RseSBidXQgdXNlIGluaXRJbmRleCgpIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gSW5kZXhDb3JlKGFsZ29saWFzZWFyY2gsIGluZGV4TmFtZSkge1xuICB0aGlzLmluZGV4TmFtZSA9IGluZGV4TmFtZTtcbiAgdGhpcy5hcyA9IGFsZ29saWFzZWFyY2g7XG4gIHRoaXMudHlwZUFoZWFkQXJncyA9IG51bGw7XG4gIHRoaXMudHlwZUFoZWFkVmFsdWVPcHRpb24gPSBudWxsO1xuXG4gIC8vIG1ha2Ugc3VyZSBldmVyeSBpbmRleCBpbnN0YW5jZSBoYXMgaXQncyBvd24gY2FjaGVcbiAgdGhpcy5jYWNoZSA9IHt9O1xufVxuXG4vKlxuKiBDbGVhciBhbGwgcXVlcmllcyBpbiBjYWNoZVxuKi9cbkluZGV4Q29yZS5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNhY2hlID0ge307XG59O1xuXG4vKlxuKiBTZWFyY2ggaW5zaWRlIHRoZSBpbmRleCB1c2luZyBYTUxIdHRwUmVxdWVzdCByZXF1ZXN0IChVc2luZyBhIFBPU1QgcXVlcnkgdG9cbiogbWluaW1pemUgbnVtYmVyIG9mIE9QVElPTlMgcXVlcmllczogQ3Jvc3MtT3JpZ2luIFJlc291cmNlIFNoYXJpbmcpLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gW3F1ZXJ5XSB0aGUgZnVsbCB0ZXh0IHF1ZXJ5XG4qIEBwYXJhbSB7b2JqZWN0fSBbYXJnc10gKG9wdGlvbmFsKSBpZiBzZXQsIGNvbnRhaW5zIGFuIG9iamVjdCB3aXRoIHF1ZXJ5IHBhcmFtZXRlcnM6XG4qIC0gcGFnZTogKGludGVnZXIpIFBhZ2luYXRpb24gcGFyYW1ldGVyIHVzZWQgdG8gc2VsZWN0IHRoZSBwYWdlIHRvIHJldHJpZXZlLlxuKiAgICAgICAgICAgICAgICAgICBQYWdlIGlzIHplcm8tYmFzZWQgYW5kIGRlZmF1bHRzIHRvIDAuIFRodXMsXG4qICAgICAgICAgICAgICAgICAgIHRvIHJldHJpZXZlIHRoZSAxMHRoIHBhZ2UgeW91IG5lZWQgdG8gc2V0IHBhZ2U9OVxuKiAtIGhpdHNQZXJQYWdlOiAoaW50ZWdlcikgUGFnaW5hdGlvbiBwYXJhbWV0ZXIgdXNlZCB0byBzZWxlY3QgdGhlIG51bWJlciBvZiBoaXRzIHBlciBwYWdlLiBEZWZhdWx0cyB0byAyMC5cbiogLSBhdHRyaWJ1dGVzVG9SZXRyaWV2ZTogYSBzdHJpbmcgdGhhdCBjb250YWlucyB0aGUgbGlzdCBvZiBvYmplY3QgYXR0cmlidXRlc1xuKiB5b3Ugd2FudCB0byByZXRyaWV2ZSAobGV0IHlvdSBtaW5pbWl6ZSB0aGUgYW5zd2VyIHNpemUpLlxuKiAgIEF0dHJpYnV0ZXMgYXJlIHNlcGFyYXRlZCB3aXRoIGEgY29tbWEgKGZvciBleGFtcGxlIFwibmFtZSxhZGRyZXNzXCIpLlxuKiAgIFlvdSBjYW4gYWxzbyB1c2UgYW4gYXJyYXkgKGZvciBleGFtcGxlIFtcIm5hbWVcIixcImFkZHJlc3NcIl0pLlxuKiAgIEJ5IGRlZmF1bHQsIGFsbCBhdHRyaWJ1dGVzIGFyZSByZXRyaWV2ZWQuIFlvdSBjYW4gYWxzbyB1c2UgJyonIHRvIHJldHJpZXZlIGFsbFxuKiAgIHZhbHVlcyB3aGVuIGFuIGF0dHJpYnV0ZXNUb1JldHJpZXZlIHNldHRpbmcgaXMgc3BlY2lmaWVkIGZvciB5b3VyIGluZGV4LlxuKiAtIGF0dHJpYnV0ZXNUb0hpZ2hsaWdodDogYSBzdHJpbmcgdGhhdCBjb250YWlucyB0aGUgbGlzdCBvZiBhdHRyaWJ1dGVzIHlvdVxuKiAgIHdhbnQgdG8gaGlnaGxpZ2h0IGFjY29yZGluZyB0byB0aGUgcXVlcnkuXG4qICAgQXR0cmlidXRlcyBhcmUgc2VwYXJhdGVkIGJ5IGEgY29tbWEuIFlvdSBjYW4gYWxzbyB1c2UgYW4gYXJyYXkgKGZvciBleGFtcGxlIFtcIm5hbWVcIixcImFkZHJlc3NcIl0pLlxuKiAgIElmIGFuIGF0dHJpYnV0ZSBoYXMgbm8gbWF0Y2ggZm9yIHRoZSBxdWVyeSwgdGhlIHJhdyB2YWx1ZSBpcyByZXR1cm5lZC5cbiogICBCeSBkZWZhdWx0IGFsbCBpbmRleGVkIHRleHQgYXR0cmlidXRlcyBhcmUgaGlnaGxpZ2h0ZWQuXG4qICAgWW91IGNhbiB1c2UgYCpgIGlmIHlvdSB3YW50IHRvIGhpZ2hsaWdodCBhbGwgdGV4dHVhbCBhdHRyaWJ1dGVzLlxuKiAgIE51bWVyaWNhbCBhdHRyaWJ1dGVzIGFyZSBub3QgaGlnaGxpZ2h0ZWQuXG4qICAgQSBtYXRjaExldmVsIGlzIHJldHVybmVkIGZvciBlYWNoIGhpZ2hsaWdodGVkIGF0dHJpYnV0ZSBhbmQgY2FuIGNvbnRhaW46XG4qICAgICAgLSBmdWxsOiBpZiBhbGwgdGhlIHF1ZXJ5IHRlcm1zIHdlcmUgZm91bmQgaW4gdGhlIGF0dHJpYnV0ZSxcbiogICAgICAtIHBhcnRpYWw6IGlmIG9ubHkgc29tZSBvZiB0aGUgcXVlcnkgdGVybXMgd2VyZSBmb3VuZCxcbiogICAgICAtIG5vbmU6IGlmIG5vbmUgb2YgdGhlIHF1ZXJ5IHRlcm1zIHdlcmUgZm91bmQuXG4qIC0gYXR0cmlidXRlc1RvU25pcHBldDogYSBzdHJpbmcgdGhhdCBjb250YWlucyB0aGUgbGlzdCBvZiBhdHRyaWJ1dGVzIHRvIHNuaXBwZXQgYWxvbmdzaWRlXG4qIHRoZSBudW1iZXIgb2Ygd29yZHMgdG8gcmV0dXJuIChzeW50YXggaXMgYGF0dHJpYnV0ZU5hbWU6bmJXb3Jkc2ApLlxuKiAgICBBdHRyaWJ1dGVzIGFyZSBzZXBhcmF0ZWQgYnkgYSBjb21tYSAoRXhhbXBsZTogYXR0cmlidXRlc1RvU25pcHBldD1uYW1lOjEwLGNvbnRlbnQ6MTApLlxuKiAgICBZb3UgY2FuIGFsc28gdXNlIGFuIGFycmF5IChFeGFtcGxlOiBhdHRyaWJ1dGVzVG9TbmlwcGV0OiBbJ25hbWU6MTAnLCdjb250ZW50OjEwJ10pLlxuKiAgICBCeSBkZWZhdWx0IG5vIHNuaXBwZXQgaXMgY29tcHV0ZWQuXG4qIC0gbWluV29yZFNpemVmb3IxVHlwbzogdGhlIG1pbmltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gYSBxdWVyeSB3b3JkIHRvIGFjY2VwdCBvbmUgdHlwbyBpbiB0aGlzIHdvcmQuXG4qIERlZmF1bHRzIHRvIDMuXG4qIC0gbWluV29yZFNpemVmb3IyVHlwb3M6IHRoZSBtaW5pbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIGluIGEgcXVlcnkgd29yZFxuKiB0byBhY2NlcHQgdHdvIHR5cG9zIGluIHRoaXMgd29yZC4gRGVmYXVsdHMgdG8gNy5cbiogLSBnZXRSYW5raW5nSW5mbzogaWYgc2V0IHRvIDEsIHRoZSByZXN1bHQgaGl0cyB3aWxsIGNvbnRhaW4gcmFua2luZ1xuKiBpbmZvcm1hdGlvbiBpbiBfcmFua2luZ0luZm8gYXR0cmlidXRlLlxuKiAtIGFyb3VuZExhdExuZzogc2VhcmNoIGZvciBlbnRyaWVzIGFyb3VuZCBhIGdpdmVuXG4qIGxhdGl0dWRlL2xvbmdpdHVkZSAoc3BlY2lmaWVkIGFzIHR3byBmbG9hdHMgc2VwYXJhdGVkIGJ5IGEgY29tbWEpLlxuKiAgIEZvciBleGFtcGxlIGFyb3VuZExhdExuZz00Ny4zMTY2NjksNS4wMTY2NzApLlxuKiAgIFlvdSBjYW4gc3BlY2lmeSB0aGUgbWF4aW11bSBkaXN0YW5jZSBpbiBtZXRlcnMgd2l0aCB0aGUgYXJvdW5kUmFkaXVzIHBhcmFtZXRlciAoaW4gbWV0ZXJzKVxuKiAgIGFuZCB0aGUgcHJlY2lzaW9uIGZvciByYW5raW5nIHdpdGggYXJvdW5kUHJlY2lzaW9uXG4qICAgKGZvciBleGFtcGxlIGlmIHlvdSBzZXQgYXJvdW5kUHJlY2lzaW9uPTEwMCwgdHdvIG9iamVjdHMgdGhhdCBhcmUgZGlzdGFudCBvZlxuKiAgIGxlc3MgdGhhbiAxMDBtIHdpbGwgYmUgY29uc2lkZXJlZCBhcyBpZGVudGljYWwgZm9yIFwiZ2VvXCIgcmFua2luZyBwYXJhbWV0ZXIpLlxuKiAgIEF0IGluZGV4aW5nLCB5b3Ugc2hvdWxkIHNwZWNpZnkgZ2VvbG9jIG9mIGFuIG9iamVjdCB3aXRoIHRoZSBfZ2VvbG9jIGF0dHJpYnV0ZVxuKiAgIChpbiB0aGUgZm9ybSB7XCJfZ2VvbG9jXCI6e1wibGF0XCI6NDguODUzNDA5LCBcImxuZ1wiOjIuMzQ4ODAwfX0pXG4qIC0gaW5zaWRlQm91bmRpbmdCb3g6IHNlYXJjaCBlbnRyaWVzIGluc2lkZSBhIGdpdmVuIGFyZWEgZGVmaW5lZCBieSB0aGUgdHdvIGV4dHJlbWUgcG9pbnRzXG4qIG9mIGEgcmVjdGFuZ2xlIChkZWZpbmVkIGJ5IDQgZmxvYXRzOiBwMUxhdCxwMUxuZyxwMkxhdCxwMkxuZykuXG4qICAgRm9yIGV4YW1wbGUgaW5zaWRlQm91bmRpbmdCb3g9NDcuMzE2NSw0Ljk2NjUsNDcuMzQyNCw1LjAyMDEpLlxuKiAgIEF0IGluZGV4aW5nLCB5b3Ugc2hvdWxkIHNwZWNpZnkgZ2VvbG9jIG9mIGFuIG9iamVjdCB3aXRoIHRoZSBfZ2VvbG9jIGF0dHJpYnV0ZVxuKiAgIChpbiB0aGUgZm9ybSB7XCJfZ2VvbG9jXCI6e1wibGF0XCI6NDguODUzNDA5LCBcImxuZ1wiOjIuMzQ4ODAwfX0pXG4qIC0gbnVtZXJpY0ZpbHRlcnM6IGEgc3RyaW5nIHRoYXQgY29udGFpbnMgdGhlIGxpc3Qgb2YgbnVtZXJpYyBmaWx0ZXJzIHlvdSB3YW50IHRvXG4qIGFwcGx5IHNlcGFyYXRlZCBieSBhIGNvbW1hLlxuKiAgIFRoZSBzeW50YXggb2Ygb25lIGZpbHRlciBpcyBgYXR0cmlidXRlTmFtZWAgZm9sbG93ZWQgYnkgYG9wZXJhbmRgIGZvbGxvd2VkIGJ5IGB2YWx1ZWAuXG4qICAgU3VwcG9ydGVkIG9wZXJhbmRzIGFyZSBgPGAsIGA8PWAsIGA9YCwgYD5gIGFuZCBgPj1gLlxuKiAgIFlvdSBjYW4gaGF2ZSBtdWx0aXBsZSBjb25kaXRpb25zIG9uIG9uZSBhdHRyaWJ1dGUgbGlrZSBmb3IgZXhhbXBsZSBudW1lcmljRmlsdGVycz1wcmljZT4xMDAscHJpY2U8MTAwMC5cbiogICBZb3UgY2FuIGFsc28gdXNlIGFuIGFycmF5IChmb3IgZXhhbXBsZSBudW1lcmljRmlsdGVyczogW1wicHJpY2U+MTAwXCIsXCJwcmljZTwxMDAwXCJdKS5cbiogLSB0YWdGaWx0ZXJzOiBmaWx0ZXIgdGhlIHF1ZXJ5IGJ5IGEgc2V0IG9mIHRhZ3MuIFlvdSBjYW4gQU5EIHRhZ3MgYnkgc2VwYXJhdGluZyB0aGVtIGJ5IGNvbW1hcy5cbiogICBUbyBPUiB0YWdzLCB5b3UgbXVzdCBhZGQgcGFyZW50aGVzZXMuIEZvciBleGFtcGxlLCB0YWdzPXRhZzEsKHRhZzIsdGFnMykgbWVhbnMgdGFnMSBBTkQgKHRhZzIgT1IgdGFnMykuXG4qICAgWW91IGNhbiBhbHNvIHVzZSBhbiBhcnJheSwgZm9yIGV4YW1wbGUgdGFnRmlsdGVyczogW1widGFnMVwiLFtcInRhZzJcIixcInRhZzNcIl1dXG4qICAgbWVhbnMgdGFnMSBBTkQgKHRhZzIgT1IgdGFnMykuXG4qICAgQXQgaW5kZXhpbmcsIHRhZ3Mgc2hvdWxkIGJlIGFkZGVkIGluIHRoZSBfdGFncyoqIGF0dHJpYnV0ZVxuKiAgIG9mIG9iamVjdHMgKGZvciBleGFtcGxlIHtcIl90YWdzXCI6W1widGFnMVwiLFwidGFnMlwiXX0pLlxuKiAtIGZhY2V0RmlsdGVyczogZmlsdGVyIHRoZSBxdWVyeSBieSBhIGxpc3Qgb2YgZmFjZXRzLlxuKiAgIEZhY2V0cyBhcmUgc2VwYXJhdGVkIGJ5IGNvbW1hcyBhbmQgZWFjaCBmYWNldCBpcyBlbmNvZGVkIGFzIGBhdHRyaWJ1dGVOYW1lOnZhbHVlYC5cbiogICBGb3IgZXhhbXBsZTogYGZhY2V0RmlsdGVycz1jYXRlZ29yeTpCb29rLGF1dGhvcjpKb2huJTIwRG9lYC5cbiogICBZb3UgY2FuIGFsc28gdXNlIGFuIGFycmF5IChmb3IgZXhhbXBsZSBgW1wiY2F0ZWdvcnk6Qm9va1wiLFwiYXV0aG9yOkpvaG4lMjBEb2VcIl1gKS5cbiogLSBmYWNldHM6IExpc3Qgb2Ygb2JqZWN0IGF0dHJpYnV0ZXMgdGhhdCB5b3Ugd2FudCB0byB1c2UgZm9yIGZhY2V0aW5nLlxuKiAgIENvbW1hIHNlcGFyYXRlZCBsaXN0OiBgXCJjYXRlZ29yeSxhdXRob3JcImAgb3IgYXJyYXkgYFsnY2F0ZWdvcnknLCdhdXRob3InXWBcbiogICBPbmx5IGF0dHJpYnV0ZXMgdGhhdCBoYXZlIGJlZW4gYWRkZWQgaW4gKiphdHRyaWJ1dGVzRm9yRmFjZXRpbmcqKiBpbmRleCBzZXR0aW5nXG4qICAgY2FuIGJlIHVzZWQgaW4gdGhpcyBwYXJhbWV0ZXIuXG4qICAgWW91IGNhbiBhbHNvIHVzZSBgKmAgdG8gcGVyZm9ybSBmYWNldGluZyBvbiBhbGwgYXR0cmlidXRlcyBzcGVjaWZpZWQgaW4gKiphdHRyaWJ1dGVzRm9yRmFjZXRpbmcqKi5cbiogLSBxdWVyeVR5cGU6IHNlbGVjdCBob3cgdGhlIHF1ZXJ5IHdvcmRzIGFyZSBpbnRlcnByZXRlZCwgaXQgY2FuIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nIHZhbHVlOlxuKiAgICAtIHByZWZpeEFsbDogYWxsIHF1ZXJ5IHdvcmRzIGFyZSBpbnRlcnByZXRlZCBhcyBwcmVmaXhlcyxcbiogICAgLSBwcmVmaXhMYXN0OiBvbmx5IHRoZSBsYXN0IHdvcmQgaXMgaW50ZXJwcmV0ZWQgYXMgYSBwcmVmaXggKGRlZmF1bHQgYmVoYXZpb3IpLFxuKiAgICAtIHByZWZpeE5vbmU6IG5vIHF1ZXJ5IHdvcmQgaXMgaW50ZXJwcmV0ZWQgYXMgYSBwcmVmaXguIFRoaXMgb3B0aW9uIGlzIG5vdCByZWNvbW1lbmRlZC5cbiogLSBvcHRpb25hbFdvcmRzOiBhIHN0cmluZyB0aGF0IGNvbnRhaW5zIHRoZSBsaXN0IG9mIHdvcmRzIHRoYXQgc2hvdWxkXG4qIGJlIGNvbnNpZGVyZWQgYXMgb3B0aW9uYWwgd2hlbiBmb3VuZCBpbiB0aGUgcXVlcnkuXG4qICAgQ29tbWEgc2VwYXJhdGVkIGFuZCBhcnJheSBhcmUgYWNjZXB0ZWQuXG4qIC0gZGlzdGluY3Q6IElmIHNldCB0byAxLCBlbmFibGUgdGhlIGRpc3RpbmN0IGZlYXR1cmUgKGRpc2FibGVkIGJ5IGRlZmF1bHQpXG4qIGlmIHRoZSBhdHRyaWJ1dGVGb3JEaXN0aW5jdCBpbmRleCBzZXR0aW5nIGlzIHNldC5cbiogICBUaGlzIGZlYXR1cmUgaXMgc2ltaWxhciB0byB0aGUgU1FMIFwiZGlzdGluY3RcIiBrZXl3b3JkOiB3aGVuIGVuYWJsZWRcbiogICBpbiBhIHF1ZXJ5IHdpdGggdGhlIGRpc3RpbmN0PTEgcGFyYW1ldGVyLFxuKiAgIGFsbCBoaXRzIGNvbnRhaW5pbmcgYSBkdXBsaWNhdGUgdmFsdWUgZm9yIHRoZSBhdHRyaWJ1dGVGb3JEaXN0aW5jdCBhdHRyaWJ1dGUgYXJlIHJlbW92ZWQgZnJvbSByZXN1bHRzLlxuKiAgIEZvciBleGFtcGxlLCBpZiB0aGUgY2hvc2VuIGF0dHJpYnV0ZSBpcyBzaG93X25hbWUgYW5kIHNldmVyYWwgaGl0cyBoYXZlXG4qICAgdGhlIHNhbWUgdmFsdWUgZm9yIHNob3dfbmFtZSwgdGhlbiBvbmx5IHRoZSBiZXN0XG4qICAgb25lIGlzIGtlcHQgYW5kIG90aGVycyBhcmUgcmVtb3ZlZC5cbiogLSByZXN0cmljdFNlYXJjaGFibGVBdHRyaWJ1dGVzOiBMaXN0IG9mIGF0dHJpYnV0ZXMgeW91IHdhbnQgdG8gdXNlIGZvclxuKiB0ZXh0dWFsIHNlYXJjaCAobXVzdCBiZSBhIHN1YnNldCBvZiB0aGUgYXR0cmlidXRlc1RvSW5kZXggaW5kZXggc2V0dGluZylcbiogZWl0aGVyIGNvbW1hIHNlcGFyYXRlZCBvciBhcyBhbiBhcnJheVxuKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIHRoZSByZXN1bHQgY2FsbGJhY2sgY2FsbGVkIHdpdGggdHdvIGFyZ3VtZW50czpcbiogIGVycm9yOiBudWxsIG9yIEVycm9yKCdtZXNzYWdlJykuIElmIGZhbHNlLCB0aGUgY29udGVudCBjb250YWlucyB0aGUgZXJyb3IuXG4qICBjb250ZW50OiB0aGUgc2VydmVyIGFuc3dlciB0aGF0IGNvbnRhaW5zIHRoZSBsaXN0IG9mIHJlc3VsdHMuXG4qL1xuSW5kZXhDb3JlLnByb3RvdHlwZS5zZWFyY2ggPSBidWlsZFNlYXJjaE1ldGhvZCgncXVlcnknKTtcblxuLypcbiogLS0gQkVUQSAtLVxuKiBTZWFyY2ggYSByZWNvcmQgc2ltaWxhciB0byB0aGUgcXVlcnkgaW5zaWRlIHRoZSBpbmRleCB1c2luZyBYTUxIdHRwUmVxdWVzdCByZXF1ZXN0IChVc2luZyBhIFBPU1QgcXVlcnkgdG9cbiogbWluaW1pemUgbnVtYmVyIG9mIE9QVElPTlMgcXVlcmllczogQ3Jvc3MtT3JpZ2luIFJlc291cmNlIFNoYXJpbmcpLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gW3F1ZXJ5XSB0aGUgc2ltaWxhciBxdWVyeVxuKiBAcGFyYW0ge29iamVjdH0gW2FyZ3NdIChvcHRpb25hbCkgaWYgc2V0LCBjb250YWlucyBhbiBvYmplY3Qgd2l0aCBxdWVyeSBwYXJhbWV0ZXJzLlxuKiAgIEFsbCBzZWFyY2ggcGFyYW1ldGVycyBhcmUgc3VwcG9ydGVkIChzZWUgc2VhcmNoIGZ1bmN0aW9uKSwgcmVzdHJpY3RTZWFyY2hhYmxlQXR0cmlidXRlcyBhbmQgZmFjZXRGaWx0ZXJzXG4qICAgYXJlIHRoZSB0d28gbW9zdCB1c2VmdWwgdG8gcmVzdHJpY3QgdGhlIHNpbWlsYXIgcmVzdWx0cyBhbmQgZ2V0IG1vcmUgcmVsZXZhbnQgY29udGVudFxuKi9cbkluZGV4Q29yZS5wcm90b3R5cGUuc2ltaWxhclNlYXJjaCA9IGRlcHJlY2F0ZShcbiAgYnVpbGRTZWFyY2hNZXRob2QoJ3NpbWlsYXJRdWVyeScpLFxuICBkZXByZWNhdGVkTWVzc2FnZShcbiAgICAnaW5kZXguc2ltaWxhclNlYXJjaChxdWVyeVssIGNhbGxiYWNrXSknLFxuICAgICdpbmRleC5zZWFyY2goeyBzaW1pbGFyUXVlcnk6IHF1ZXJ5IH1bLCBjYWxsYmFja10pJ1xuICApXG4pO1xuXG4vKlxuKiBCcm93c2UgaW5kZXggY29udGVudC4gVGhlIHJlc3BvbnNlIGNvbnRlbnQgd2lsbCBoYXZlIGEgYGN1cnNvcmAgcHJvcGVydHkgdGhhdCB5b3UgY2FuIHVzZVxuKiB0byBicm93c2Ugc3Vic2VxdWVudCBwYWdlcyBmb3IgdGhpcyBxdWVyeS4gVXNlIGBpbmRleC5icm93c2VGcm9tKGN1cnNvcilgIHdoZW4geW91IHdhbnQuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSAtIFRoZSBmdWxsIHRleHQgcXVlcnlcbiogQHBhcmFtIHtPYmplY3R9IFtxdWVyeVBhcmFtZXRlcnNdIC0gQW55IHNlYXJjaCBxdWVyeSBwYXJhbWV0ZXJcbiogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIFRoZSByZXN1bHQgY2FsbGJhY2sgY2FsbGVkIHdpdGggdHdvIGFyZ3VtZW50c1xuKiAgIGVycm9yOiBudWxsIG9yIEVycm9yKCdtZXNzYWdlJylcbiogICBjb250ZW50OiB0aGUgc2VydmVyIGFuc3dlciB3aXRoIHRoZSBicm93c2UgcmVzdWx0XG4qIEByZXR1cm4ge1Byb21pc2V8dW5kZWZpbmVkfSBSZXR1cm5zIGEgcHJvbWlzZSBpZiBubyBjYWxsYmFjayBnaXZlblxuKiBAZXhhbXBsZVxuKiBpbmRleC5icm93c2UoJ2Nvb2wgc29uZ3MnLCB7XG4qICAgdGFnRmlsdGVyczogJ3B1YmxpYyxjb21tZW50cycsXG4qICAgaGl0c1BlclBhZ2U6IDUwMFxuKiB9LCBjYWxsYmFjayk7XG4qIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL2RvYy9yZXN0X2FwaSNCcm93c2V8QWxnb2xpYSBSRVNUIEFQSSBEb2N1bWVudGF0aW9ufVxuKi9cbkluZGV4Q29yZS5wcm90b3R5cGUuYnJvd3NlID0gZnVuY3Rpb24ocXVlcnksIHF1ZXJ5UGFyYW1ldGVycywgY2FsbGJhY2spIHtcbiAgdmFyIG1lcmdlID0gcmVxdWlyZSgnLi9tZXJnZS5qcycpO1xuXG4gIHZhciBpbmRleE9iaiA9IHRoaXM7XG5cbiAgdmFyIHBhZ2U7XG4gIHZhciBoaXRzUGVyUGFnZTtcblxuICAvLyB3ZSBjaGVjayB2YXJpYWRpYyBjYWxscyB0aGF0IGFyZSBub3QgdGhlIG9uZSBkZWZpbmVkXG4gIC8vIC5icm93c2UoKS8uYnJvd3NlKGZuKVxuICAvLyA9PiBwYWdlID0gMFxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICBwYWdlID0gMDtcbiAgICBjYWxsYmFjayA9IGFyZ3VtZW50c1swXTtcbiAgICBxdWVyeSA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnbnVtYmVyJykge1xuICAgIC8vIC5icm93c2UoMikvLmJyb3dzZSgyLCAxMCkvLmJyb3dzZSgyLCBmbikvLmJyb3dzZSgyLCAxMCwgZm4pXG4gICAgcGFnZSA9IGFyZ3VtZW50c1swXTtcbiAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGhpdHNQZXJQYWdlID0gYXJndW1lbnRzWzFdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSBhcmd1bWVudHNbMV07XG4gICAgICBoaXRzUGVyUGFnZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcXVlcnkgPSB1bmRlZmluZWQ7XG4gICAgcXVlcnlQYXJhbWV0ZXJzID0gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgLy8gLmJyb3dzZShxdWVyeVBhcmFtZXRlcnMpLy5icm93c2UocXVlcnlQYXJhbWV0ZXJzLCBjYilcbiAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSBhcmd1bWVudHNbMV07XG4gICAgfVxuICAgIHF1ZXJ5UGFyYW1ldGVycyA9IGFyZ3VtZW50c1swXTtcbiAgICBxdWVyeSA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgYXJndW1lbnRzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gLmJyb3dzZShxdWVyeSwgY2IpXG4gICAgY2FsbGJhY2sgPSBhcmd1bWVudHNbMV07XG4gICAgcXVlcnlQYXJhbWV0ZXJzID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gb3RoZXJ3aXNlIGl0J3MgYSAuYnJvd3NlKHF1ZXJ5KS8uYnJvd3NlKHF1ZXJ5LCBxdWVyeVBhcmFtZXRlcnMpLy5icm93c2UocXVlcnksIHF1ZXJ5UGFyYW1ldGVycywgY2IpXG5cbiAgLy8gZ2V0IHNlYXJjaCBxdWVyeSBwYXJhbWV0ZXJzIGNvbWJpbmluZyB2YXJpb3VzIHBvc3NpYmxlIGNhbGxzXG4gIC8vIHRvIC5icm93c2UoKTtcbiAgcXVlcnlQYXJhbWV0ZXJzID0gbWVyZ2Uoe30sIHF1ZXJ5UGFyYW1ldGVycyB8fCB7fSwge1xuICAgIHBhZ2U6IHBhZ2UsXG4gICAgaGl0c1BlclBhZ2U6IGhpdHNQZXJQYWdlLFxuICAgIHF1ZXJ5OiBxdWVyeVxuICB9KTtcblxuICB2YXIgcGFyYW1zID0gdGhpcy5hcy5fZ2V0U2VhcmNoUGFyYW1zKHF1ZXJ5UGFyYW1ldGVycywgJycpO1xuXG4gIHJldHVybiB0aGlzLmFzLl9qc29uUmVxdWVzdCh7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgdXJsOiAnLzEvaW5kZXhlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGluZGV4T2JqLmluZGV4TmFtZSkgKyAnL2Jyb3dzZScsXG4gICAgYm9keToge3BhcmFtczogcGFyYW1zfSxcbiAgICBob3N0VHlwZTogJ3JlYWQnLFxuICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICB9KTtcbn07XG5cbi8qXG4qIENvbnRpbnVlIGJyb3dzaW5nIGZyb20gYSBwcmV2aW91cyBwb3NpdGlvbiAoY3Vyc29yKSwgb2J0YWluZWQgdmlhIGEgY2FsbCB0byBgLmJyb3dzZSgpYC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IC0gVGhlIGZ1bGwgdGV4dCBxdWVyeVxuKiBAcGFyYW0ge09iamVjdH0gW3F1ZXJ5UGFyYW1ldGVyc10gLSBBbnkgc2VhcmNoIHF1ZXJ5IHBhcmFtZXRlclxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gVGhlIHJlc3VsdCBjYWxsYmFjayBjYWxsZWQgd2l0aCB0d28gYXJndW1lbnRzXG4qICAgZXJyb3I6IG51bGwgb3IgRXJyb3IoJ21lc3NhZ2UnKVxuKiAgIGNvbnRlbnQ6IHRoZSBzZXJ2ZXIgYW5zd2VyIHdpdGggdGhlIGJyb3dzZSByZXN1bHRcbiogQHJldHVybiB7UHJvbWlzZXx1bmRlZmluZWR9IFJldHVybnMgYSBwcm9taXNlIGlmIG5vIGNhbGxiYWNrIGdpdmVuXG4qIEBleGFtcGxlXG4qIGluZGV4LmJyb3dzZUZyb20oJzE0bGtmc2FrbDMyJywgY2FsbGJhY2spO1xuKiBAc2VlIHtAbGluayBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kb2MvcmVzdF9hcGkjQnJvd3NlfEFsZ29saWEgUkVTVCBBUEkgRG9jdW1lbnRhdGlvbn1cbiovXG5JbmRleENvcmUucHJvdG90eXBlLmJyb3dzZUZyb20gPSBmdW5jdGlvbihjdXJzb3IsIGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLmFzLl9qc29uUmVxdWVzdCh7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgdXJsOiAnLzEvaW5kZXhlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuaW5kZXhOYW1lKSArICcvYnJvd3NlJyxcbiAgICBib2R5OiB7Y3Vyc29yOiBjdXJzb3J9LFxuICAgIGhvc3RUeXBlOiAncmVhZCcsXG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gIH0pO1xufTtcblxuLypcbiogU2VhcmNoIGZvciBmYWNldCB2YWx1ZXNcbiogaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZG9jL3Jlc3QtYXBpL3NlYXJjaCNzZWFyY2gtZm9yLWZhY2V0LXZhbHVlc1xuKlxuKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmZhY2V0TmFtZSBGYWNldCBuYW1lLCBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdG8gc2VhcmNoIGZvciB2YWx1ZXMgaW4uXG4qIE11c3QgYmUgZGVjbGFyZWQgYXMgYSBmYWNldFxuKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmZhY2V0UXVlcnkgUXVlcnkgZm9yIHRoZSBmYWNldCBzZWFyY2hcbiogQHBhcmFtIHtzdHJpbmd9IFtwYXJhbXMuKl0gQW55IHNlYXJjaCBwYXJhbWV0ZXIgb2YgQWxnb2xpYSxcbiogc2VlIGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL2RvYy9hcGktY2xpZW50L2phdmFzY3JpcHQvc2VhcmNoI3NlYXJjaC1wYXJhbWV0ZXJzXG4qIFBhZ2luYXRpb24gaXMgbm90IHN1cHBvcnRlZC4gVGhlIHBhZ2UgYW5kIGhpdHNQZXJQYWdlIHBhcmFtZXRlcnMgd2lsbCBiZSBpZ25vcmVkLlxuKiBAcGFyYW0gY2FsbGJhY2sgKG9wdGlvbmFsKVxuKi9cbkluZGV4Q29yZS5wcm90b3R5cGUuc2VhcmNoRm9yRmFjZXRWYWx1ZXMgPSBmdW5jdGlvbihwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIHZhciBjbG9uZSA9IHJlcXVpcmUoJy4vY2xvbmUuanMnKTtcbiAgdmFyIG9taXQgPSByZXF1aXJlKCcuL29taXQuanMnKTtcbiAgdmFyIHVzYWdlID0gJ1VzYWdlOiBpbmRleC5zZWFyY2hGb3JGYWNldFZhbHVlcyh7ZmFjZXROYW1lLCBmYWNldFF1ZXJ5LCAuLi5wYXJhbXN9WywgY2FsbGJhY2tdKSc7XG5cbiAgaWYgKHBhcmFtcy5mYWNldE5hbWUgPT09IHVuZGVmaW5lZCB8fCBwYXJhbXMuZmFjZXRRdWVyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHVzYWdlKTtcbiAgfVxuXG4gIHZhciBmYWNldE5hbWUgPSBwYXJhbXMuZmFjZXROYW1lO1xuICB2YXIgZmlsdGVyZWRQYXJhbXMgPSBvbWl0KGNsb25lKHBhcmFtcyksIGZ1bmN0aW9uKGtleU5hbWUpIHtcbiAgICByZXR1cm4ga2V5TmFtZSA9PT0gJ2ZhY2V0TmFtZSc7XG4gIH0pO1xuICB2YXIgc2VhcmNoUGFyYW1ldGVycyA9IHRoaXMuYXMuX2dldFNlYXJjaFBhcmFtcyhmaWx0ZXJlZFBhcmFtcywgJycpO1xuXG4gIHJldHVybiB0aGlzLmFzLl9qc29uUmVxdWVzdCh7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgdXJsOiAnLzEvaW5kZXhlcy8nICtcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmluZGV4TmFtZSkgKyAnL2ZhY2V0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGZhY2V0TmFtZSkgKyAnL3F1ZXJ5JyxcbiAgICBob3N0VHlwZTogJ3JlYWQnLFxuICAgIGJvZHk6IHtwYXJhbXM6IHNlYXJjaFBhcmFtZXRlcnN9LFxuICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICB9KTtcbn07XG5cbkluZGV4Q29yZS5wcm90b3R5cGUuc2VhcmNoRmFjZXQgPSBkZXByZWNhdGUoZnVuY3Rpb24ocGFyYW1zLCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5zZWFyY2hGb3JGYWNldFZhbHVlcyhwYXJhbXMsIGNhbGxiYWNrKTtcbn0sIGRlcHJlY2F0ZWRNZXNzYWdlKFxuICAnaW5kZXguc2VhcmNoRmFjZXQocGFyYW1zWywgY2FsbGJhY2tdKScsXG4gICdpbmRleC5zZWFyY2hGb3JGYWNldFZhbHVlcyhwYXJhbXNbLCBjYWxsYmFja10pJ1xuKSk7XG5cbkluZGV4Q29yZS5wcm90b3R5cGUuX3NlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtcywgdXJsLCBjYWxsYmFjaywgYWRkaXRpb25hbFVBKSB7XG4gIHJldHVybiB0aGlzLmFzLl9qc29uUmVxdWVzdCh7XG4gICAgY2FjaGU6IHRoaXMuY2FjaGUsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgdXJsOiB1cmwgfHwgJy8xL2luZGV4ZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmluZGV4TmFtZSkgKyAnL3F1ZXJ5JyxcbiAgICBib2R5OiB7cGFyYW1zOiBwYXJhbXN9LFxuICAgIGhvc3RUeXBlOiAncmVhZCcsXG4gICAgZmFsbGJhY2s6IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvMS9pbmRleGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5pbmRleE5hbWUpLFxuICAgICAgYm9keToge3BhcmFtczogcGFyYW1zfVxuICAgIH0sXG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgIGFkZGl0aW9uYWxVQTogYWRkaXRpb25hbFVBXG4gIH0pO1xufTtcblxuLypcbiogR2V0IGFuIG9iamVjdCBmcm9tIHRoaXMgaW5kZXhcbipcbiogQHBhcmFtIG9iamVjdElEIHRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgb2JqZWN0IHRvIHJldHJpZXZlXG4qIEBwYXJhbSBhdHRycyAob3B0aW9uYWwpIGlmIHNldCwgY29udGFpbnMgdGhlIGFycmF5IG9mIGF0dHJpYnV0ZSBuYW1lcyB0byByZXRyaWV2ZVxuKiBAcGFyYW0gY2FsbGJhY2sgKG9wdGlvbmFsKSB0aGUgcmVzdWx0IGNhbGxiYWNrIGNhbGxlZCB3aXRoIHR3byBhcmd1bWVudHNcbiogIGVycm9yOiBudWxsIG9yIEVycm9yKCdtZXNzYWdlJylcbiogIGNvbnRlbnQ6IHRoZSBvYmplY3QgdG8gcmV0cmlldmUgb3IgdGhlIGVycm9yIG1lc3NhZ2UgaWYgYSBmYWlsdXJlIG9jY3VycmVkXG4qL1xuSW5kZXhDb3JlLnByb3RvdHlwZS5nZXRPYmplY3QgPSBmdW5jdGlvbihvYmplY3RJRCwgYXR0cnMsIGNhbGxiYWNrKSB7XG4gIHZhciBpbmRleE9iaiA9IHRoaXM7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgfHwgdHlwZW9mIGF0dHJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBhdHRycztcbiAgICBhdHRycyA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciBwYXJhbXMgPSAnJztcbiAgaWYgKGF0dHJzICE9PSB1bmRlZmluZWQpIHtcbiAgICBwYXJhbXMgPSAnP2F0dHJpYnV0ZXM9JztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICBwYXJhbXMgKz0gJywnO1xuICAgICAgfVxuICAgICAgcGFyYW1zICs9IGF0dHJzW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzLmFzLl9qc29uUmVxdWVzdCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6ICcvMS9pbmRleGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaW5kZXhPYmouaW5kZXhOYW1lKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChvYmplY3RJRCkgKyBwYXJhbXMsXG4gICAgaG9zdFR5cGU6ICdyZWFkJyxcbiAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgfSk7XG59O1xuXG4vKlxuKiBHZXQgc2V2ZXJhbCBvYmplY3RzIGZyb20gdGhpcyBpbmRleFxuKlxuKiBAcGFyYW0gb2JqZWN0SURzIHRoZSBhcnJheSBvZiB1bmlxdWUgaWRlbnRpZmllciBvZiBvYmplY3RzIHRvIHJldHJpZXZlXG4qL1xuSW5kZXhDb3JlLnByb3RvdHlwZS5nZXRPYmplY3RzID0gZnVuY3Rpb24ob2JqZWN0SURzLCBhdHRyaWJ1dGVzVG9SZXRyaWV2ZSwgY2FsbGJhY2spIHtcbiAgdmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG4gIHZhciBtYXAgPSByZXF1aXJlKCcuL21hcC5qcycpO1xuXG4gIHZhciB1c2FnZSA9ICdVc2FnZTogaW5kZXguZ2V0T2JqZWN0cyhhcnJheU9mT2JqZWN0SURzWywgY2FsbGJhY2tdKSc7XG5cbiAgaWYgKCFpc0FycmF5KG9iamVjdElEcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodXNhZ2UpO1xuICB9XG5cbiAgdmFyIGluZGV4T2JqID0gdGhpcztcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSB8fCB0eXBlb2YgYXR0cmlidXRlc1RvUmV0cmlldmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGF0dHJpYnV0ZXNUb1JldHJpZXZlO1xuICAgIGF0dHJpYnV0ZXNUb1JldHJpZXZlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdmFyIGJvZHkgPSB7XG4gICAgcmVxdWVzdHM6IG1hcChvYmplY3RJRHMsIGZ1bmN0aW9uIHByZXBhcmVSZXF1ZXN0KG9iamVjdElEKSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgaW5kZXhOYW1lOiBpbmRleE9iai5pbmRleE5hbWUsXG4gICAgICAgIG9iamVjdElEOiBvYmplY3RJRFxuICAgICAgfTtcblxuICAgICAgaWYgKGF0dHJpYnV0ZXNUb1JldHJpZXZlKSB7XG4gICAgICAgIHJlcXVlc3QuYXR0cmlidXRlc1RvUmV0cmlldmUgPSBhdHRyaWJ1dGVzVG9SZXRyaWV2ZS5qb2luKCcsJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgIH0pXG4gIH07XG5cbiAgcmV0dXJuIHRoaXMuYXMuX2pzb25SZXF1ZXN0KHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6ICcvMS9pbmRleGVzLyovb2JqZWN0cycsXG4gICAgaG9zdFR5cGU6ICdyZWFkJyxcbiAgICBib2R5OiBib2R5LFxuICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICB9KTtcbn07XG5cbkluZGV4Q29yZS5wcm90b3R5cGUuYXMgPSBudWxsO1xuSW5kZXhDb3JlLnByb3RvdHlwZS5pbmRleE5hbWUgPSBudWxsO1xuSW5kZXhDb3JlLnByb3RvdHlwZS50eXBlQWhlYWRBcmdzID0gbnVsbDtcbkluZGV4Q29yZS5wcm90b3R5cGUudHlwZUFoZWFkVmFsdWVPcHRpb24gPSBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQWxnb2xpYVNlYXJjaENvcmUgPSByZXF1aXJlKCcuLi8uLi9BbGdvbGlhU2VhcmNoQ29yZS5qcycpO1xudmFyIGNyZWF0ZUFsZ29saWFzZWFyY2ggPSByZXF1aXJlKCcuLi9jcmVhdGVBbGdvbGlhc2VhcmNoLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQWxnb2xpYXNlYXJjaChBbGdvbGlhU2VhcmNoQ29yZSwgJ0Jyb3dzZXIgKGxpdGUpJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnbG9iYWwgPSByZXF1aXJlKCdnbG9iYWwnKTtcbnZhciBQcm9taXNlID0gZ2xvYmFsLlByb21pc2UgfHwgcmVxdWlyZSgnZXM2LXByb21pc2UnKS5Qcm9taXNlO1xuXG4vLyBUaGlzIGlzIHRoZSBzdGFuZGFsb25lIGJyb3dzZXIgYnVpbGQgZW50cnkgcG9pbnRcbi8vIEJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgdGhlIEFsZ29saWEgU2VhcmNoIEphdmFTY3JpcHQgY2xpZW50LFxuLy8gdXNpbmcgWE1MSHR0cFJlcXVlc3QsIFhEb21haW5SZXF1ZXN0IGFuZCBKU09OUCBhcyBmYWxsYmFja1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVBbGdvbGlhc2VhcmNoKEFsZ29saWFTZWFyY2gsIHVhU3VmZml4KSB7XG4gIHZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG4gIHZhciBlcnJvcnMgPSByZXF1aXJlKCcuLi9lcnJvcnMnKTtcbiAgdmFyIGlubGluZUhlYWRlcnMgPSByZXF1aXJlKCcuL2lubGluZS1oZWFkZXJzJyk7XG4gIHZhciBqc29ucFJlcXVlc3QgPSByZXF1aXJlKCcuL2pzb25wLXJlcXVlc3QnKTtcbiAgdmFyIHBsYWNlcyA9IHJlcXVpcmUoJy4uL3BsYWNlcy5qcycpO1xuICB1YVN1ZmZpeCA9IHVhU3VmZml4IHx8ICcnO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RlYnVnJykge1xuICAgIHJlcXVpcmUoJ2RlYnVnJykuZW5hYmxlKCdhbGdvbGlhc2VhcmNoKicpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxnb2xpYXNlYXJjaChhcHBsaWNhdGlvbklELCBhcGlLZXksIG9wdHMpIHtcbiAgICB2YXIgY2xvbmVEZWVwID0gcmVxdWlyZSgnLi4vY2xvbmUuanMnKTtcblxuICAgIG9wdHMgPSBjbG9uZURlZXAob3B0cyB8fCB7fSk7XG5cbiAgICBvcHRzLl91YSA9IG9wdHMuX3VhIHx8IGFsZ29saWFzZWFyY2gudWE7XG5cbiAgICByZXR1cm4gbmV3IEFsZ29saWFTZWFyY2hCcm93c2VyKGFwcGxpY2F0aW9uSUQsIGFwaUtleSwgb3B0cyk7XG4gIH1cblxuICBhbGdvbGlhc2VhcmNoLnZlcnNpb24gPSByZXF1aXJlKCcuLi92ZXJzaW9uLmpzJyk7XG5cbiAgYWxnb2xpYXNlYXJjaC51YSA9XG4gICAgJ0FsZ29saWEgZm9yIEphdmFTY3JpcHQgKCcgKyBhbGdvbGlhc2VhcmNoLnZlcnNpb24gKyAnKTsgJyArIHVhU3VmZml4O1xuXG4gIGFsZ29saWFzZWFyY2guaW5pdFBsYWNlcyA9IHBsYWNlcyhhbGdvbGlhc2VhcmNoKTtcblxuICAvLyB3ZSBleHBvc2UgaW50byB3aW5kb3cgbm8gbWF0dGVyIGhvdyB3ZSBhcmUgdXNlZCwgdGhpcyB3aWxsIGFsbG93XG4gIC8vIHVzIHRvIGVhc2lseSBkZWJ1ZyBhbnkgd2Vic2l0ZSBydW5uaW5nIGFsZ29saWFcbiAgZ2xvYmFsLl9fYWxnb2xpYSA9IHtcbiAgICBkZWJ1ZzogcmVxdWlyZSgnZGVidWcnKSxcbiAgICBhbGdvbGlhc2VhcmNoOiBhbGdvbGlhc2VhcmNoXG4gIH07XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgaGFzWE1MSHR0cFJlcXVlc3Q6ICdYTUxIdHRwUmVxdWVzdCcgaW4gZ2xvYmFsLFxuICAgIGhhc1hEb21haW5SZXF1ZXN0OiAnWERvbWFpblJlcXVlc3QnIGluIGdsb2JhbFxuICB9O1xuXG4gIGlmIChzdXBwb3J0Lmhhc1hNTEh0dHBSZXF1ZXN0KSB7XG4gICAgc3VwcG9ydC5jb3JzID0gJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIH1cblxuICBmdW5jdGlvbiBBbGdvbGlhU2VhcmNoQnJvd3NlcigpIHtcbiAgICAvLyBjYWxsIEFsZ29saWFTZWFyY2ggY29uc3RydWN0b3JcbiAgICBBbGdvbGlhU2VhcmNoLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBpbmhlcml0cyhBbGdvbGlhU2VhcmNoQnJvd3NlciwgQWxnb2xpYVNlYXJjaCk7XG5cbiAgQWxnb2xpYVNlYXJjaEJyb3dzZXIucHJvdG90eXBlLl9yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdCh1cmwsIG9wdHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gd3JhcFJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAvLyBubyBjb3JzIG9yIFhEb21haW5SZXF1ZXN0LCBubyByZXF1ZXN0XG4gICAgICBpZiAoIXN1cHBvcnQuY29ycyAmJiAhc3VwcG9ydC5oYXNYRG9tYWluUmVxdWVzdCkge1xuICAgICAgICAvLyB2ZXJ5IG9sZCBicm93c2VyLCBub3Qgc3VwcG9ydGVkXG4gICAgICAgIHJlamVjdChuZXcgZXJyb3JzLk5ldHdvcmsoJ0NPUlMgbm90IHN1cHBvcnRlZCcpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cmwgPSBpbmxpbmVIZWFkZXJzKHVybCwgb3B0cy5oZWFkZXJzKTtcblxuICAgICAgdmFyIGJvZHkgPSBvcHRzLmJvZHk7XG4gICAgICB2YXIgcmVxID0gc3VwcG9ydC5jb3JzID8gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgOiBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIHZhciByZXFUaW1lb3V0O1xuICAgICAgdmFyIHRpbWVkT3V0O1xuICAgICAgdmFyIGNvbm5lY3RlZCA9IGZhbHNlO1xuXG4gICAgICByZXFUaW1lb3V0ID0gc2V0VGltZW91dChvblRpbWVvdXQsIG9wdHMudGltZW91dHMuY29ubmVjdCk7XG4gICAgICAvLyB3ZSBzZXQgYW4gZW1wdHkgb25wcm9ncmVzcyBsaXN0ZW5lclxuICAgICAgLy8gc28gdGhhdCBYRG9tYWluUmVxdWVzdCBvbiBJRTkgaXMgbm90IGFib3J0ZWRcbiAgICAgIC8vIHJlZnM6XG4gICAgICAvLyAgLSBodHRwczovL2dpdGh1Yi5jb20vYWxnb2xpYS9hbGdvbGlhc2VhcmNoLWNsaWVudC1qcy9pc3N1ZXMvNzZcbiAgICAgIC8vICAtIGh0dHBzOi8vc29jaWFsLm1zZG4ubWljcm9zb2Z0LmNvbS9Gb3J1bXMvaWUvZW4tVVMvMzBlZjNhZGQtNzY3Yy00NDM2LWI4YTktZjFjYTE5YjQ4MTJlL2llOS1ydG0teGRvbWFpbnJlcXVlc3QtaXNzdWVkLXJlcXVlc3RzLW1heS1hYm9ydC1pZi1hbGwtZXZlbnQtaGFuZGxlcnMtbm90LXNwZWNpZmllZD9mb3J1bT1pZXdlYmRldmVsb3BtZW50XG4gICAgICByZXEub25wcm9ncmVzcyA9IG9uUHJvZ3Jlc3M7XG4gICAgICBpZiAoJ29ucmVhZHlzdGF0ZWNoYW5nZScgaW4gcmVxKSByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gb25SZWFkeVN0YXRlQ2hhbmdlO1xuICAgICAgcmVxLm9ubG9hZCA9IG9uTG9hZDtcbiAgICAgIHJlcS5vbmVycm9yID0gb25FcnJvcjtcblxuICAgICAgLy8gZG8gbm90IHJlbHkgb24gZGVmYXVsdCBYSFIgYXN5bmMgZmxhZywgYXMgc29tZSBhbmFseXRpY3MgY29kZSBsaWtlIGhvdGphclxuICAgICAgLy8gYnJlYWtzIGl0IGFuZCBzZXQgaXQgdG8gZmFsc2UgYnkgZGVmYXVsdFxuICAgICAgaWYgKHJlcSBpbnN0YW5jZW9mIFhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICAgIHJlcS5vcGVuKG9wdHMubWV0aG9kLCB1cmwsIHRydWUpO1xuXG4gICAgICAgIC8vIFRoZSBBbmFseXRpY3MgQVBJIG5ldmVyIGFjY2VwdHMgQXV0aCBoZWFkZXJzIGFzIHF1ZXJ5IHN0cmluZ1xuICAgICAgICAvLyB0aGlzIG9wdGlvbiBleGlzdHMgc3BlY2lmaWNhbGx5IGZvciB0aGVtLlxuICAgICAgICBpZiAob3B0cy5mb3JjZUF1dGhIZWFkZXJzKSB7XG4gICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXG4gICAgICAgICAgICAneC1hbGdvbGlhLWFwcGxpY2F0aW9uLWlkJyxcbiAgICAgICAgICAgIG9wdHMuaGVhZGVyc1sneC1hbGdvbGlhLWFwcGxpY2F0aW9uLWlkJ11cbiAgICAgICAgICApO1xuICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFxuICAgICAgICAgICAgJ3gtYWxnb2xpYS1hcGkta2V5JyxcbiAgICAgICAgICAgIG9wdHMuaGVhZGVyc1sneC1hbGdvbGlhLWFwaS1rZXknXVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcS5vcGVuKG9wdHMubWV0aG9kLCB1cmwpO1xuICAgICAgfVxuXG4gICAgICAvLyBoZWFkZXJzIGFyZSBtZWFudCB0byBiZSBzZW50IGFmdGVyIG9wZW5cbiAgICAgIGlmIChzdXBwb3J0LmNvcnMpIHtcbiAgICAgICAgaWYgKGJvZHkpIHtcbiAgICAgICAgICBpZiAob3B0cy5tZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9BY2Nlc3NfY29udHJvbF9DT1JTI1NpbXBsZV9yZXF1ZXN0c1xuICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdhY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYm9keSkge1xuICAgICAgICByZXEuc2VuZChib2R5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcS5zZW5kKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGV2ZW50IG9iamVjdCBub3QgcmVjZWl2ZWQgaW4gSUU4LCBhdCBsZWFzdFxuICAgICAgLy8gYnV0IHdlIGRvIG5vdCB1c2UgaXQsIHN0aWxsIGltcG9ydGFudCB0byBub3RlXG4gICAgICBmdW5jdGlvbiBvbkxvYWQoLyogZXZlbnQgKi8pIHtcbiAgICAgICAgLy8gV2hlbiBicm93c2VyIGRvZXMgbm90IHN1cHBvcnRzIHJlcS50aW1lb3V0LCB3ZSBjYW5cbiAgICAgICAgLy8gaGF2ZSBib3RoIGEgbG9hZCBhbmQgdGltZW91dCBldmVudCwgc2luY2UgaGFuZGxlZCBieSBhIGR1bWIgc2V0VGltZW91dFxuICAgICAgICBpZiAodGltZWRPdXQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhclRpbWVvdXQocmVxVGltZW91dCk7XG5cbiAgICAgICAgdmFyIG91dDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIG91dCA9IHtcbiAgICAgICAgICAgIGJvZHk6IEpTT04ucGFyc2UocmVxLnJlc3BvbnNlVGV4dCksXG4gICAgICAgICAgICByZXNwb25zZVRleHQ6IHJlcS5yZXNwb25zZVRleHQsXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiByZXEuc3RhdHVzLFxuICAgICAgICAgICAgLy8gWERvbWFpblJlcXVlc3QgZG9lcyBub3QgaGF2ZSBhbnkgcmVzcG9uc2UgaGVhZGVyc1xuICAgICAgICAgICAgaGVhZGVyczogcmVxLmdldEFsbFJlc3BvbnNlSGVhZGVycyAmJiByZXEuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwge31cbiAgICAgICAgICB9O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgb3V0ID0gbmV3IGVycm9ycy5VbnBhcnNhYmxlSlNPTih7XG4gICAgICAgICAgICBtb3JlOiByZXEucmVzcG9uc2VUZXh0XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3V0IGluc3RhbmNlb2YgZXJyb3JzLlVucGFyc2FibGVKU09OKSB7XG4gICAgICAgICAgcmVqZWN0KG91dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShvdXQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRpbWVkT3V0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHJlcVRpbWVvdXQpO1xuXG4gICAgICAgIC8vIGVycm9yIGV2ZW50IGlzIHRyaWdlcnJlZCBib3RoIHdpdGggWERSL1hIUiBvbjpcbiAgICAgICAgLy8gICAtIEROUyBlcnJvclxuICAgICAgICAvLyAgIC0gdW5hbGxvd2VkIGNyb3NzIGRvbWFpbiByZXF1ZXN0XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBuZXcgZXJyb3JzLk5ldHdvcmsoe1xuICAgICAgICAgICAgbW9yZTogZXZlbnRcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICAgIHRpbWVkT3V0ID0gdHJ1ZTtcbiAgICAgICAgcmVxLmFib3J0KCk7XG5cbiAgICAgICAgcmVqZWN0KG5ldyBlcnJvcnMuUmVxdWVzdFRpbWVvdXQoKSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uQ29ubmVjdCgpIHtcbiAgICAgICAgY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHJlcVRpbWVvdXQpO1xuICAgICAgICByZXFUaW1lb3V0ID0gc2V0VGltZW91dChvblRpbWVvdXQsIG9wdHMudGltZW91dHMuY29tcGxldGUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvblByb2dyZXNzKCkge1xuICAgICAgICBpZiAoIWNvbm5lY3RlZCkgb25Db25uZWN0KCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uUmVhZHlTdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgaWYgKCFjb25uZWN0ZWQgJiYgcmVxLnJlYWR5U3RhdGUgPiAxKSBvbkNvbm5lY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBBbGdvbGlhU2VhcmNoQnJvd3Nlci5wcm90b3R5cGUuX3JlcXVlc3QuZmFsbGJhY2sgPSBmdW5jdGlvbiByZXF1ZXN0RmFsbGJhY2sodXJsLCBvcHRzKSB7XG4gICAgdXJsID0gaW5saW5lSGVhZGVycyh1cmwsIG9wdHMuaGVhZGVycyk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gd3JhcEpzb25wUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGpzb25wUmVxdWVzdCh1cmwsIG9wdHMsIGZ1bmN0aW9uIGpzb25wUmVxdWVzdERvbmUoZXJyLCBjb250ZW50KSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXNvbHZlKGNvbnRlbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQWxnb2xpYVNlYXJjaEJyb3dzZXIucHJvdG90eXBlLl9wcm9taXNlID0ge1xuICAgIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0UHJvbWlzZSh2YWwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh2YWwpO1xuICAgIH0sXG4gICAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UodmFsKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbCk7XG4gICAgfSxcbiAgICBkZWxheTogZnVuY3Rpb24gZGVsYXlQcm9taXNlKG1zKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gcmVzb2x2ZU9uVGltZW91dChyZXNvbHZlLyogLCByZWplY3QqLykge1xuICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgYWxsOiBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBhbGdvbGlhc2VhcmNoO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBpbmxpbmVIZWFkZXJzO1xuXG52YXIgZW5jb2RlID0gcmVxdWlyZSgncXVlcnlzdHJpbmctZXMzL2VuY29kZScpO1xuXG5mdW5jdGlvbiBpbmxpbmVIZWFkZXJzKHVybCwgaGVhZGVycykge1xuICBpZiAoL1xcPy8udGVzdCh1cmwpKSB7XG4gICAgdXJsICs9ICcmJztcbiAgfSBlbHNlIHtcbiAgICB1cmwgKz0gJz8nO1xuICB9XG5cbiAgcmV0dXJuIHVybCArIGVuY29kZShoZWFkZXJzKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBqc29ucFJlcXVlc3Q7XG5cbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuLi9lcnJvcnMnKTtcblxudmFyIEpTT05QQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIGpzb25wUmVxdWVzdCh1cmwsIG9wdHMsIGNiKSB7XG4gIGlmIChvcHRzLm1ldGhvZCAhPT0gJ0dFVCcpIHtcbiAgICBjYihuZXcgRXJyb3IoJ01ldGhvZCAnICsgb3B0cy5tZXRob2QgKyAnICcgKyB1cmwgKyAnIGlzIG5vdCBzdXBwb3J0ZWQgYnkgSlNPTlAuJykpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIG9wdHMuZGVidWcoJ0pTT05QOiBzdGFydCcpO1xuXG4gIHZhciBjYkNhbGxlZCA9IGZhbHNlO1xuICB2YXIgdGltZWRPdXQgPSBmYWxzZTtcblxuICBKU09OUENvdW50ZXIgKz0gMTtcbiAgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIHZhciBjYk5hbWUgPSAnYWxnb2xpYUpTT05QXycgKyBKU09OUENvdW50ZXI7XG4gIHZhciBkb25lID0gZmFsc2U7XG5cbiAgd2luZG93W2NiTmFtZV0gPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgcmVtb3ZlR2xvYmFscygpO1xuXG4gICAgaWYgKHRpbWVkT3V0KSB7XG4gICAgICBvcHRzLmRlYnVnKCdKU09OUDogTGF0ZSBhbnN3ZXIsIGlnbm9yaW5nJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2JDYWxsZWQgPSB0cnVlO1xuXG4gICAgY2xlYW4oKTtcblxuICAgIGNiKG51bGwsIHtcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICByZXNwb25zZVRleHQ6IEpTT04uc3RyaW5naWZ5KGRhdGEpLyogLFxuICAgICAgLy8gV2UgZG8gbm90IHNlbmQgdGhlIHN0YXR1c0NvZGUsIHRoZXJlJ3Mgbm8gc3RhdHVzQ29kZSBpbiBKU09OUCwgaXQgd2lsbCBiZVxuICAgICAgLy8gY29tcHV0ZWQgdXNpbmcgZGF0YS5zdGF0dXMgJiYgZGF0YS5tZXNzYWdlIGxpa2Ugd2l0aCBYRFJcbiAgICAgIHN0YXR1c0NvZGUqL1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIGFkZCBjYWxsYmFjayBieSBoYW5kXG4gIHVybCArPSAnJmNhbGxiYWNrPScgKyBjYk5hbWU7XG5cbiAgLy8gYWRkIGJvZHkgcGFyYW1zIG1hbnVhbGx5XG4gIGlmIChvcHRzLmpzb25Cb2R5ICYmIG9wdHMuanNvbkJvZHkucGFyYW1zKSB7XG4gICAgdXJsICs9ICcmJyArIG9wdHMuanNvbkJvZHkucGFyYW1zO1xuICB9XG5cbiAgdmFyIG9udGltZW91dCA9IHNldFRpbWVvdXQodGltZW91dCwgb3B0cy50aW1lb3V0cy5jb21wbGV0ZSk7XG5cbiAgLy8gc2NyaXB0IG9ucmVhZHlzdGF0ZWNoYW5nZSBuZWVkZWQgb25seSBmb3JcbiAgLy8gPD0gSUU4XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIuanMvaXNzdWVzLzQ1MjNcbiAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHJlYWR5c3RhdGVjaGFuZ2U7XG4gIHNjcmlwdC5vbmxvYWQgPSBzdWNjZXNzO1xuICBzY3JpcHQub25lcnJvciA9IGVycm9yO1xuXG4gIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gIHNjcmlwdC5kZWZlciA9IHRydWU7XG4gIHNjcmlwdC5zcmMgPSB1cmw7XG4gIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICBmdW5jdGlvbiBzdWNjZXNzKCkge1xuICAgIG9wdHMuZGVidWcoJ0pTT05QOiBzdWNjZXNzJyk7XG5cbiAgICBpZiAoZG9uZSB8fCB0aW1lZE91dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRvbmUgPSB0cnVlO1xuXG4gICAgLy8gc2NyaXB0IGxvYWRlZCBidXQgZGlkIG5vdCBjYWxsIHRoZSBmbiA9PiBzY3JpcHQgbG9hZGluZyBlcnJvclxuICAgIGlmICghY2JDYWxsZWQpIHtcbiAgICAgIG9wdHMuZGVidWcoJ0pTT05QOiBGYWlsLiBTY3JpcHQgbG9hZGVkIGJ1dCBkaWQgbm90IGNhbGwgdGhlIGNhbGxiYWNrJyk7XG4gICAgICBjbGVhbigpO1xuICAgICAgY2IobmV3IGVycm9ycy5KU09OUFNjcmlwdEZhaWwoKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZHlzdGF0ZWNoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSAnbG9hZGVkJyB8fCB0aGlzLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgIHN1Y2Nlc3MoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhbigpIHtcbiAgICBjbGVhclRpbWVvdXQob250aW1lb3V0KTtcbiAgICBzY3JpcHQub25sb2FkID0gbnVsbDtcbiAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICBzY3JpcHQub25lcnJvciA9IG51bGw7XG4gICAgaGVhZC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlR2xvYmFscygpIHtcbiAgICB0cnkge1xuICAgICAgZGVsZXRlIHdpbmRvd1tjYk5hbWVdO1xuICAgICAgZGVsZXRlIHdpbmRvd1tjYk5hbWUgKyAnX2xvYWRlZCddO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHdpbmRvd1tjYk5hbWVdID0gd2luZG93W2NiTmFtZSArICdfbG9hZGVkJ10gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdGltZW91dCgpIHtcbiAgICBvcHRzLmRlYnVnKCdKU09OUDogU2NyaXB0IHRpbWVvdXQnKTtcbiAgICB0aW1lZE91dCA9IHRydWU7XG4gICAgY2xlYW4oKTtcbiAgICBjYihuZXcgZXJyb3JzLlJlcXVlc3RUaW1lb3V0KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgb3B0cy5kZWJ1ZygnSlNPTlA6IFNjcmlwdCBlcnJvcicpO1xuXG4gICAgaWYgKGRvbmUgfHwgdGltZWRPdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGVhbigpO1xuICAgIGNiKG5ldyBlcnJvcnMuSlNPTlBTY3JpcHRFcnJvcigpKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBidWlsZFNlYXJjaE1ldGhvZDtcblxudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzLmpzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNlYXJjaCBtZXRob2QgdG8gYmUgdXNlZCBpbiBjbGllbnRzXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnlQYXJhbSB0aGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlIHVzZWQgZm9yIHRoZSBxdWVyeVxuICogQHBhcmFtIHtzdHJpbmd9IHVybCB0aGUgdXJsXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gdGhlIHNlYXJjaCBtZXRob2RcbiAqL1xuZnVuY3Rpb24gYnVpbGRTZWFyY2hNZXRob2QocXVlcnlQYXJhbSwgdXJsKSB7XG4gIC8qKlxuICAgKiBUaGUgc2VhcmNoIG1ldGhvZC4gUHJlcGFyZXMgdGhlIGRhdGEgYW5kIHNlbmQgdGhlIHF1ZXJ5IHRvIEFsZ29saWEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSB0aGUgc3RyaW5nIHVzZWQgZm9yIHF1ZXJ5IHNlYXJjaFxuICAgKiBAcGFyYW0ge29iamVjdH0gYXJncyBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgdG8gc2VuZCB3aXRoIHRoZSBzZWFyY2hcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2NhbGxiYWNrXSB0aGUgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIHdpdGggdGhlIGNsaWVudCBnZXRzIHRoZSBhbnN3ZXJcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfFByb21pc2V9IElmIHRoZSBjYWxsYmFjayBpcyBub3QgcHJvdmlkZWQgdGhlbiB0aGlzIG1ldGhvZHMgcmV0dXJucyBhIFByb21pc2VcbiAgICovXG4gIHJldHVybiBmdW5jdGlvbiBzZWFyY2gocXVlcnksIGFyZ3MsIGNhbGxiYWNrKSB7XG4gICAgLy8gd2FybiBWMiB1c2VycyBvbiBob3cgdG8gc2VhcmNoXG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgYXJncyA9PT0gJ29iamVjdCcgfHxcbiAgICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8vIC5zZWFyY2gocXVlcnksIHBhcmFtcywgY2IpXG4gICAgICAvLyAuc2VhcmNoKGNiLCBwYXJhbXMpXG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLkFsZ29saWFTZWFyY2hFcnJvcignaW5kZXguc2VhcmNoIHVzYWdlIGlzIGluZGV4LnNlYXJjaChxdWVyeSwgcGFyYW1zLCBjYiknKTtcbiAgICB9XG5cbiAgICAvLyBOb3JtYWxpemluZyB0aGUgZnVuY3Rpb24gc2lnbmF0dXJlXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgdHlwZW9mIHF1ZXJ5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBVc2FnZSA6IC5zZWFyY2goKSwgLnNlYXJjaChjYilcbiAgICAgIGNhbGxiYWNrID0gcXVlcnk7XG4gICAgICBxdWVyeSA9ICcnO1xuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSB8fCB0eXBlb2YgYXJncyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gVXNhZ2UgOiAuc2VhcmNoKHF1ZXJ5L2FyZ3MpLCAuc2VhcmNoKHF1ZXJ5LCBjYilcbiAgICAgIGNhbGxiYWNrID0gYXJncztcbiAgICAgIGFyZ3MgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8vIEF0IHRoaXMgcG9pbnQgd2UgaGF2ZSAzIGFyZ3VtZW50cyB3aXRoIHZhbHVlc1xuXG4gICAgLy8gVXNhZ2UgOiAuc2VhcmNoKGFyZ3MpIC8vIGNhcmVmdWw6IHR5cGVvZiBudWxsID09PSAnb2JqZWN0J1xuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdvYmplY3QnICYmIHF1ZXJ5ICE9PSBudWxsKSB7XG4gICAgICBhcmdzID0gcXVlcnk7XG4gICAgICBxdWVyeSA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKHF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgcXVlcnkgPT09IG51bGwpIHsgLy8gLnNlYXJjaCh1bmRlZmluZWQvbnVsbClcbiAgICAgIHF1ZXJ5ID0gJyc7XG4gICAgfVxuXG4gICAgdmFyIHBhcmFtcyA9ICcnO1xuXG4gICAgaWYgKHF1ZXJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcyArPSBxdWVyeVBhcmFtICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KTtcbiAgICB9XG5cbiAgICB2YXIgYWRkaXRpb25hbFVBO1xuICAgIGlmIChhcmdzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChhcmdzLmFkZGl0aW9uYWxVQSkge1xuICAgICAgICBhZGRpdGlvbmFsVUEgPSBhcmdzLmFkZGl0aW9uYWxVQTtcbiAgICAgICAgZGVsZXRlIGFyZ3MuYWRkaXRpb25hbFVBO1xuICAgICAgfVxuICAgICAgLy8gYF9nZXRTZWFyY2hQYXJhbXNgIHdpbGwgYXVnbWVudCBwYXJhbXMsIGRvIG5vdCBiZSBmb29sZWQgYnkgdGhlID0gdmVyc3VzICs9IGZyb20gcHJldmlvdXMgaWZcbiAgICAgIHBhcmFtcyA9IHRoaXMuYXMuX2dldFNlYXJjaFBhcmFtcyhhcmdzLCBwYXJhbXMpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHRoaXMuX3NlYXJjaChwYXJhbXMsIHVybCwgY2FsbGJhY2ssIGFkZGl0aW9uYWxVQSk7XG4gIH07XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsb25lKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlcHJlY2F0ZShmbiwgbWVzc2FnZSkge1xuICB2YXIgd2FybmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgLyogZXNsaW50IG5vLWNvbnNvbGU6MCAqL1xuICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVwcmVjYXRlZE1lc3NhZ2UocHJldmlvdXNVc2FnZSwgbmV3VXNhZ2UpIHtcbiAgdmFyIGdpdGh1YkFuY2hvckxpbmsgPSBwcmV2aW91c1VzYWdlLnRvTG93ZXJDYXNlKClcbiAgICAucmVwbGFjZSgvW1xcLlxcKFxcKV0vZywgJycpO1xuXG4gIHJldHVybiAnYWxnb2xpYXNlYXJjaDogYCcgKyBwcmV2aW91c1VzYWdlICsgJ2Agd2FzIHJlcGxhY2VkIGJ5IGAnICsgbmV3VXNhZ2UgK1xuICAgICdgLiBQbGVhc2Ugc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGdvbGlhL2FsZ29saWFzZWFyY2gtY2xpZW50LWphdmFzY3JpcHQvd2lraS9EZXByZWNhdGVkIycgKyBnaXRodWJBbmNob3JMaW5rO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gVGhpcyBmaWxlIGhvc3RzIG91ciBlcnJvciBkZWZpbml0aW9uc1xuLy8gV2UgdXNlIGN1c3RvbSBlcnJvciBcInR5cGVzXCIgc28gdGhhdCB3ZSBjYW4gYWN0IG9uIHRoZW0gd2hlbiB3ZSBuZWVkIGl0XG4vLyBlLmcuOiBpZiBlcnJvciBpbnN0YW5jZW9mIGVycm9ycy5VbnBhcnNhYmxlSlNPTiB0aGVuLi5cblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZnVuY3Rpb24gQWxnb2xpYVNlYXJjaEVycm9yKG1lc3NhZ2UsIGV4dHJhUHJvcGVydGllcykge1xuICB2YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2ZvcmVhY2gnKTtcblxuICB2YXIgZXJyb3IgPSB0aGlzO1xuXG4gIC8vIHRyeSB0byBnZXQgYSBzdGFja3RyYWNlXG4gIGlmICh0eXBlb2YgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICBlcnJvci5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2sgfHwgJ0Nhbm5vdCBnZXQgYSBzdGFja3RyYWNlLCBicm93c2VyIGlzIHRvbyBvbGQnO1xuICB9XG5cbiAgdGhpcy5uYW1lID0gJ0FsZ29saWFTZWFyY2hFcnJvcic7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgJ1Vua25vd24gZXJyb3InO1xuXG4gIGlmIChleHRyYVByb3BlcnRpZXMpIHtcbiAgICBmb3JFYWNoKGV4dHJhUHJvcGVydGllcywgZnVuY3Rpb24gYWRkVG9FcnJvck9iamVjdCh2YWx1ZSwga2V5KSB7XG4gICAgICBlcnJvcltrZXldID0gdmFsdWU7XG4gICAgfSk7XG4gIH1cbn1cblxuaW5oZXJpdHMoQWxnb2xpYVNlYXJjaEVycm9yLCBFcnJvcik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUVycm9yKG5hbWUsIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gQWxnb2xpYVNlYXJjaEN1c3RvbUVycm9yKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgIC8vIGN1c3RvbSBtZXNzYWdlIG5vdCBzZXQsIHVzZSBkZWZhdWx0XG4gICAgaWYgKHR5cGVvZiBhcmdzWzBdICE9PSAnc3RyaW5nJykge1xuICAgICAgYXJncy51bnNoaWZ0KG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIEFsZ29saWFTZWFyY2hFcnJvci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB0aGlzLm5hbWUgPSAnQWxnb2xpYVNlYXJjaCcgKyBuYW1lICsgJ0Vycm9yJztcbiAgfVxuXG4gIGluaGVyaXRzKEFsZ29saWFTZWFyY2hDdXN0b21FcnJvciwgQWxnb2xpYVNlYXJjaEVycm9yKTtcblxuICByZXR1cm4gQWxnb2xpYVNlYXJjaEN1c3RvbUVycm9yO1xufVxuXG4vLyBsYXRlIGV4cG9ydHMgdG8gbGV0IHZhcmlvdXMgZm4gZGVmcyBhbmQgaW5oZXJpdHMgdGFrZSBwbGFjZVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEFsZ29saWFTZWFyY2hFcnJvcjogQWxnb2xpYVNlYXJjaEVycm9yLFxuICBVbnBhcnNhYmxlSlNPTjogY3JlYXRlQ3VzdG9tRXJyb3IoXG4gICAgJ1VucGFyc2FibGVKU09OJyxcbiAgICAnQ291bGQgbm90IHBhcnNlIHRoZSBpbmNvbWluZyByZXNwb25zZSBhcyBKU09OLCBzZWUgZXJyLm1vcmUgZm9yIGRldGFpbHMnXG4gICksXG4gIFJlcXVlc3RUaW1lb3V0OiBjcmVhdGVDdXN0b21FcnJvcihcbiAgICAnUmVxdWVzdFRpbWVvdXQnLFxuICAgICdSZXF1ZXN0IHRpbWVkIG91dCBiZWZvcmUgZ2V0dGluZyBhIHJlc3BvbnNlJ1xuICApLFxuICBOZXR3b3JrOiBjcmVhdGVDdXN0b21FcnJvcihcbiAgICAnTmV0d29yaycsXG4gICAgJ05ldHdvcmsgaXNzdWUsIHNlZSBlcnIubW9yZSBmb3IgZGV0YWlscydcbiAgKSxcbiAgSlNPTlBTY3JpcHRGYWlsOiBjcmVhdGVDdXN0b21FcnJvcihcbiAgICAnSlNPTlBTY3JpcHRGYWlsJyxcbiAgICAnPHNjcmlwdD4gd2FzIGxvYWRlZCBidXQgZGlkIG5vdCBjYWxsIG91ciBwcm92aWRlZCBjYWxsYmFjaydcbiAgKSxcbiAgVmFsaWRVbnRpbE5vdEZvdW5kOiBjcmVhdGVDdXN0b21FcnJvcihcbiAgICAnVmFsaWRVbnRpbE5vdEZvdW5kJyxcbiAgICAnVGhlIFNlY3VyZWRBUElLZXkgZG9lcyBub3QgaGF2ZSBhIHZhbGlkVW50aWwgcGFyYW1ldGVyLidcbiAgKSxcbiAgSlNPTlBTY3JpcHRFcnJvcjogY3JlYXRlQ3VzdG9tRXJyb3IoXG4gICAgJ0pTT05QU2NyaXB0RXJyb3InLFxuICAgICc8c2NyaXB0PiB1bmFibGUgdG8gbG9hZCBkdWUgdG8gYW4gYGVycm9yYCBldmVudCBvbiBpdCdcbiAgKSxcbiAgT2JqZWN0Tm90Rm91bmQ6IGNyZWF0ZUN1c3RvbUVycm9yKFxuICAgICdPYmplY3ROb3RGb3VuZCcsXG4gICAgJ09iamVjdCBub3QgZm91bmQnXG4gICksXG4gIFVua25vd246IGNyZWF0ZUN1c3RvbUVycm9yKFxuICAgICdVbmtub3duJyxcbiAgICAnVW5rbm93biBlcnJvciBvY2N1cmVkJ1xuICApXG59O1xuIiwiLy8gUGFyc2UgY2xvdWQgZG9lcyBub3Qgc3VwcG9ydHMgc2V0VGltZW91dFxuLy8gV2UgZG8gbm90IHN0b3JlIGEgc2V0VGltZW91dCByZWZlcmVuY2UgaW4gdGhlIGNsaWVudCBldmVyeXRpbWVcbi8vIFdlIG9ubHkgZmFsbGJhY2sgdG8gYSBmYWtlIHNldFRpbWVvdXQgd2hlbiBub3QgYXZhaWxhYmxlXG4vLyBzZXRUaW1lb3V0IGNhbm5vdCBiZSBvdmVycmlkZSBnbG9iYWxseSBzYWRseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleGl0UHJvbWlzZShmbiwgX3NldFRpbWVvdXQpIHtcbiAgX3NldFRpbWVvdXQoZm4sIDApO1xufTtcbiIsInZhciBmb3JlYWNoID0gcmVxdWlyZSgnZm9yZWFjaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hcChhcnIsIGZuKSB7XG4gIHZhciBuZXdBcnIgPSBbXTtcbiAgZm9yZWFjaChhcnIsIGZ1bmN0aW9uKGl0ZW0sIGl0ZW1JbmRleCkge1xuICAgIG5ld0Fyci5wdXNoKGZuKGl0ZW0sIGl0ZW1JbmRleCwgYXJyKSk7XG4gIH0pO1xuICByZXR1cm4gbmV3QXJyO1xufTtcbiIsInZhciBmb3JlYWNoID0gcmVxdWlyZSgnZm9yZWFjaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlKGRlc3RpbmF0aW9uLyogLCBzb3VyY2VzICovKSB7XG4gIHZhciBzb3VyY2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblxuICBmb3JlYWNoKHNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgIGZvciAodmFyIGtleU5hbWUgaW4gc291cmNlKSB7XG4gICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGtleU5hbWUpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGVzdGluYXRpb25ba2V5TmFtZV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiBzb3VyY2Vba2V5TmFtZV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgZGVzdGluYXRpb25ba2V5TmFtZV0gPSBtZXJnZSh7fSwgZGVzdGluYXRpb25ba2V5TmFtZV0sIHNvdXJjZVtrZXlOYW1lXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc291cmNlW2tleU5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZXN0aW5hdGlvbltrZXlOYW1lXSA9IHNvdXJjZVtrZXlOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb21pdChvYmosIHRlc3QpIHtcbiAgdmFyIGtleXMgPSByZXF1aXJlKCdvYmplY3Qta2V5cycpO1xuICB2YXIgZm9yZWFjaCA9IHJlcXVpcmUoJ2ZvcmVhY2gnKTtcblxuICB2YXIgZmlsdGVyZWQgPSB7fTtcblxuICBmb3JlYWNoKGtleXMob2JqKSwgZnVuY3Rpb24gZG9GaWx0ZXIoa2V5TmFtZSkge1xuICAgIGlmICh0ZXN0KGtleU5hbWUpICE9PSB0cnVlKSB7XG4gICAgICBmaWx0ZXJlZFtrZXlOYW1lXSA9IG9ialtrZXlOYW1lXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBmaWx0ZXJlZDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVBsYWNlc0NsaWVudDtcblxudmFyIHFzMyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nLWVzMycpO1xudmFyIGJ1aWxkU2VhcmNoTWV0aG9kID0gcmVxdWlyZSgnLi9idWlsZFNlYXJjaE1ldGhvZC5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdGVQbGFjZXNDbGllbnQoYWxnb2xpYXNlYXJjaCkge1xuICByZXR1cm4gZnVuY3Rpb24gcGxhY2VzKGFwcElELCBhcGlLZXksIG9wdHMpIHtcbiAgICB2YXIgY2xvbmVEZWVwID0gcmVxdWlyZSgnLi9jbG9uZS5qcycpO1xuXG4gICAgb3B0cyA9IG9wdHMgJiYgY2xvbmVEZWVwKG9wdHMpIHx8IHt9O1xuICAgIG9wdHMuaG9zdHMgPSBvcHRzLmhvc3RzIHx8IFtcbiAgICAgICdwbGFjZXMtZHNuLmFsZ29saWEubmV0JyxcbiAgICAgICdwbGFjZXMtMS5hbGdvbGlhbmV0LmNvbScsXG4gICAgICAncGxhY2VzLTIuYWxnb2xpYW5ldC5jb20nLFxuICAgICAgJ3BsYWNlcy0zLmFsZ29saWFuZXQuY29tJ1xuICAgIF07XG5cbiAgICAvLyBhbGxvdyBpbml0UGxhY2VzKCkgbm8gYXJndW1lbnRzID0+IGNvbW11bml0eSByYXRlIGxpbWl0ZWRcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCB0eXBlb2YgYXBwSUQgPT09ICdvYmplY3QnIHx8IGFwcElEID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFwcElEID0gJyc7XG4gICAgICBhcGlLZXkgPSAnJztcbiAgICAgIG9wdHMuX2FsbG93RW1wdHlDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGNsaWVudCA9IGFsZ29saWFzZWFyY2goYXBwSUQsIGFwaUtleSwgb3B0cyk7XG4gICAgdmFyIGluZGV4ID0gY2xpZW50LmluaXRJbmRleCgncGxhY2VzJyk7XG4gICAgaW5kZXguc2VhcmNoID0gYnVpbGRTZWFyY2hNZXRob2QoJ3F1ZXJ5JywgJy8xL3BsYWNlcy9xdWVyeScpO1xuICAgIGluZGV4LnJldmVyc2UgPSBmdW5jdGlvbihvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGVuY29kZWQgPSBxczMuZW5jb2RlKG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gdGhpcy5hcy5fanNvblJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICcvMS9wbGFjZXMvcmV2ZXJzZT8nICsgZW5jb2RlZCxcbiAgICAgICAgaG9zdFR5cGU6ICdyZWFkJyxcbiAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaW5kZXguZ2V0T2JqZWN0ID0gZnVuY3Rpb24ob2JqZWN0SUQsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcy5fanNvblJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICcvMS9wbGFjZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChvYmplY3RJRCksXG4gICAgICAgIGhvc3RUeXBlOiAncmVhZCcsXG4gICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH07XG59XG4iLCJ2YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdhbGdvbGlhc2VhcmNoOnNyYy9ob3N0SW5kZXhTdGF0ZS5qcycpO1xudmFyIGxvY2FsU3RvcmFnZU5hbWVzcGFjZSA9ICdhbGdvbGlhc2VhcmNoLWNsaWVudC1qcyc7XG5cbnZhciBzdG9yZTtcbnZhciBtb2R1bGVTdG9yZSA9IHtcbiAgc3RhdGU6IHt9LFxuICBzZXQ6IGZ1bmN0aW9uKGtleSwgZGF0YSkge1xuICAgIHRoaXMuc3RhdGVba2V5XSA9IGRhdGE7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVba2V5XTtcbiAgfSxcbiAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZVtrZXldIHx8IG51bGw7XG4gIH1cbn07XG5cbnZhciBsb2NhbFN0b3JhZ2VTdG9yZSA9IHtcbiAgc2V0OiBmdW5jdGlvbihrZXksIGRhdGEpIHtcbiAgICBtb2R1bGVTdG9yZS5zZXQoa2V5LCBkYXRhKTsgLy8gYWx3YXlzIHJlcGxpY2F0ZSBsb2NhbFN0b3JhZ2VTdG9yZSB0byBtb2R1bGVTdG9yZSBpbiBjYXNlIG9mIGZhaWx1cmVcblxuICAgIHRyeSB7XG4gICAgICB2YXIgbmFtZXNwYWNlID0gSlNPTi5wYXJzZShnbG9iYWwubG9jYWxTdG9yYWdlW2xvY2FsU3RvcmFnZU5hbWVzcGFjZV0pO1xuICAgICAgbmFtZXNwYWNlW2tleV0gPSBkYXRhO1xuICAgICAgZ2xvYmFsLmxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VOYW1lc3BhY2VdID0gSlNPTi5zdHJpbmdpZnkobmFtZXNwYWNlKTtcbiAgICAgIHJldHVybiBuYW1lc3BhY2Vba2V5XTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlRmFpbHVyZShrZXksIGUpO1xuICAgIH1cbiAgfSxcbiAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZ2xvYmFsLmxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VOYW1lc3BhY2VdKVtrZXldIHx8IG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZUZhaWx1cmUoa2V5LCBlKTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGxvY2FsU3RvcmFnZUZhaWx1cmUoa2V5LCBlKSB7XG4gIGRlYnVnKCdsb2NhbFN0b3JhZ2UgZmFpbGVkIHdpdGgnLCBlKTtcbiAgY2xlYW51cCgpO1xuICBzdG9yZSA9IG1vZHVsZVN0b3JlO1xuICByZXR1cm4gc3RvcmUuZ2V0KGtleSk7XG59XG5cbnN0b3JlID0gc3VwcG9ydHNMb2NhbFN0b3JhZ2UoKSA/IGxvY2FsU3RvcmFnZVN0b3JlIDogbW9kdWxlU3RvcmU7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXQ6IGdldE9yU2V0LFxuICBzZXQ6IGdldE9yU2V0LFxuICBzdXBwb3J0c0xvY2FsU3RvcmFnZTogc3VwcG9ydHNMb2NhbFN0b3JhZ2Vcbn07XG5cbmZ1bmN0aW9uIGdldE9yU2V0KGtleSwgZGF0YSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBzdG9yZS5nZXQoa2V5KTtcbiAgfVxuXG4gIHJldHVybiBzdG9yZS5zZXQoa2V5LCBkYXRhKTtcbn1cblxuZnVuY3Rpb24gc3VwcG9ydHNMb2NhbFN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgaWYgKCdsb2NhbFN0b3JhZ2UnIGluIGdsb2JhbCAmJlxuICAgICAgZ2xvYmFsLmxvY2FsU3RvcmFnZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKCFnbG9iYWwubG9jYWxTdG9yYWdlW2xvY2FsU3RvcmFnZU5hbWVzcGFjZV0pIHtcbiAgICAgICAgLy8gYWN0dWFsIGNyZWF0aW9uIG9mIHRoZSBuYW1lc3BhY2VcbiAgICAgICAgZ2xvYmFsLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsU3RvcmFnZU5hbWVzcGFjZSwgSlNPTi5zdHJpbmdpZnkoe30pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSBjYXRjaCAoXykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBJbiBjYXNlIG9mIGFueSBlcnJvciBvbiBsb2NhbFN0b3JhZ2UsIHdlIGNsZWFuIG91ciBvd24gbmFtZXNwYWNlLCB0aGlzIHNob3VsZCBoYW5kbGVcbi8vIHF1b3RhIGVycm9ycyB3aGVuIGEgbG90IG9mIGtleXMgKyBkYXRhIGFyZSB1c2VkXG5mdW5jdGlvbiBjbGVhbnVwKCkge1xuICB0cnkge1xuICAgIGdsb2JhbC5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShsb2NhbFN0b3JhZ2VOYW1lc3BhY2UpO1xuICB9IGNhdGNoIChfKSB7XG4gICAgLy8gbm90aGluZyB0byBkb1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gJzMuMzUuMSc7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcmMvc3RhbmRhbG9uZS8nKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF8gPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMuanMnKTtcblxudmFyIGNzcyA9IHtcbiAgd3JhcHBlcjoge1xuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gIH0sXG4gIGhpbnQ6IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3A6ICcwJyxcbiAgICBsZWZ0OiAnMCcsXG4gICAgYm9yZGVyQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgYm94U2hhZG93OiAnbm9uZScsXG4gICAgLy8gIzc0MTogZml4IGhpbnQgb3BhY2l0eSBpc3N1ZSBvbiBpT1NcbiAgICBvcGFjaXR5OiAnMSdcbiAgfSxcbiAgaW5wdXQ6IHtcbiAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICB2ZXJ0aWNhbEFsaWduOiAndG9wJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgfSxcbiAgaW5wdXRXaXRoTm9IaW50OiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgdmVydGljYWxBbGlnbjogJ3RvcCdcbiAgfSxcbiAgZHJvcGRvd246IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3A6ICcxMDAlJyxcbiAgICBsZWZ0OiAnMCcsXG4gICAgekluZGV4OiAnMTAwJyxcbiAgICBkaXNwbGF5OiAnbm9uZSdcbiAgfSxcbiAgc3VnZ2VzdGlvbnM6IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snXG4gIH0sXG4gIHN1Z2dlc3Rpb246IHtcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICB9LFxuICBzdWdnZXN0aW9uQ2hpbGQ6IHtcbiAgICB3aGl0ZVNwYWNlOiAnbm9ybWFsJ1xuICB9LFxuICBsdHI6IHtcbiAgICBsZWZ0OiAnMCcsXG4gICAgcmlnaHQ6ICdhdXRvJ1xuICB9LFxuICBydGw6IHtcbiAgICBsZWZ0OiAnYXV0bycsXG4gICAgcmlnaHQ6ICcwJ1xuICB9LFxuICBkZWZhdWx0Q2xhc3Nlczoge1xuICAgIHJvb3Q6ICdhbGdvbGlhLWF1dG9jb21wbGV0ZScsXG4gICAgcHJlZml4OiAnYWEnLFxuICAgIG5vUHJlZml4OiBmYWxzZSxcbiAgICBkcm9wZG93bk1lbnU6ICdkcm9wZG93bi1tZW51JyxcbiAgICBpbnB1dDogJ2lucHV0JyxcbiAgICBoaW50OiAnaGludCcsXG4gICAgc3VnZ2VzdGlvbnM6ICdzdWdnZXN0aW9ucycsXG4gICAgc3VnZ2VzdGlvbjogJ3N1Z2dlc3Rpb24nLFxuICAgIGN1cnNvcjogJ2N1cnNvcicsXG4gICAgZGF0YXNldDogJ2RhdGFzZXQnLFxuICAgIGVtcHR5OiAnZW1wdHknXG4gIH0sXG4gIC8vIHdpbGwgYmUgbWVyZ2VkIHdpdGggdGhlIGRlZmF1bHQgb25lcyBpZiBhcHBlbmRUbyBpcyB1c2VkXG4gIGFwcGVuZFRvOiB7XG4gICAgd3JhcHBlcjoge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB6SW5kZXg6ICcxMDAnLFxuICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgfSxcbiAgICBpbnB1dDoge30sXG4gICAgaW5wdXRXaXRoTm9IaW50OiB7fSxcbiAgICBkcm9wZG93bjoge1xuICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgIH1cbiAgfVxufTtcblxuLy8gaWUgc3BlY2lmaWMgc3R5bGluZ1xuaWYgKF8uaXNNc2llKCkpIHtcbiAgLy8gaWU2LTggKGFuZCA5PykgZG9lc24ndCBmaXJlIGhvdmVyIGFuZCBjbGljayBldmVudHMgZm9yIGVsZW1lbnRzIHdpdGhcbiAgLy8gdHJhbnNwYXJlbnQgYmFja2dyb3VuZHMsIGZvciBhIHdvcmthcm91bmQsIHVzZSAxeDEgdHJhbnNwYXJlbnQgZ2lmXG4gIF8ubWl4aW4oY3NzLmlucHV0LCB7XG4gICAgYmFja2dyb3VuZEltYWdlOiAndXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNyknXG4gIH0pO1xufVxuXG4vLyBpZTcgYW5kIHVuZGVyIHNwZWNpZmljIHN0eWxpbmdcbmlmIChfLmlzTXNpZSgpICYmIF8uaXNNc2llKCkgPD0gNykge1xuICAvLyBpZiBzb21lb25lIGNhbiB0ZWxsIG1lIHdoeSB0aGlzIGlzIG5lY2Vzc2FyeSB0byBhbGlnblxuICAvLyB0aGUgaGludCB3aXRoIHRoZSBxdWVyeSBpbiBpZTcsIGknbGwgc2VuZCB5b3UgJDUgLSBASmFrZUhhcmRpbmdcbiAgXy5taXhpbihjc3MuaW5wdXQsIHttYXJnaW5Ub3A6ICctMXB4J30pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNzcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRhdGFzZXRLZXkgPSAnYWFEYXRhc2V0JztcbnZhciB2YWx1ZUtleSA9ICdhYVZhbHVlJztcbnZhciBkYXR1bUtleSA9ICdhYURhdHVtJztcblxudmFyIF8gPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMuanMnKTtcbnZhciBET00gPSByZXF1aXJlKCcuLi9jb21tb24vZG9tLmpzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbC5qcycpO1xudmFyIGNzcyA9IHJlcXVpcmUoJy4vY3NzLmpzJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi9ldmVudF9lbWl0dGVyLmpzJyk7XG5cbi8vIGNvbnN0cnVjdG9yXG4vLyAtLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBEYXRhc2V0KG8pIHtcbiAgbyA9IG8gfHwge307XG4gIG8udGVtcGxhdGVzID0gby50ZW1wbGF0ZXMgfHwge307XG5cbiAgaWYgKCFvLnNvdXJjZSkge1xuICAgIF8uZXJyb3IoJ21pc3Npbmcgc291cmNlJyk7XG4gIH1cblxuICBpZiAoby5uYW1lICYmICFpc1ZhbGlkTmFtZShvLm5hbWUpKSB7XG4gICAgXy5lcnJvcignaW52YWxpZCBkYXRhc2V0IG5hbWU6ICcgKyBvLm5hbWUpO1xuICB9XG5cbiAgLy8gdHJhY2tzIHRoZSBsYXN0IHF1ZXJ5IHRoZSBkYXRhc2V0IHdhcyB1cGRhdGVkIGZvclxuICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgdGhpcy5faXNFbXB0eSA9IHRydWU7XG5cbiAgdGhpcy5oaWdobGlnaHQgPSAhIW8uaGlnaGxpZ2h0O1xuICB0aGlzLm5hbWUgPSB0eXBlb2Ygby5uYW1lID09PSAndW5kZWZpbmVkJyB8fCBvLm5hbWUgPT09IG51bGwgPyBfLmdldFVuaXF1ZUlkKCkgOiBvLm5hbWU7XG5cbiAgdGhpcy5zb3VyY2UgPSBvLnNvdXJjZTtcbiAgdGhpcy5kaXNwbGF5Rm4gPSBnZXREaXNwbGF5Rm4oby5kaXNwbGF5IHx8IG8uZGlzcGxheUtleSk7XG5cbiAgdGhpcy5kZWJvdW5jZSA9IG8uZGVib3VuY2U7XG5cbiAgdGhpcy5jYWNoZSA9IG8uY2FjaGUgIT09IGZhbHNlO1xuXG4gIHRoaXMudGVtcGxhdGVzID0gZ2V0VGVtcGxhdGVzKG8udGVtcGxhdGVzLCB0aGlzLmRpc3BsYXlGbik7XG5cbiAgdGhpcy5jc3MgPSBfLm1peGluKHt9LCBjc3MsIG8uYXBwZW5kVG8gPyBjc3MuYXBwZW5kVG8gOiB7fSk7XG4gIHRoaXMuY3NzQ2xhc3NlcyA9IG8uY3NzQ2xhc3NlcyA9IF8ubWl4aW4oe30sIGNzcy5kZWZhdWx0Q2xhc3Nlcywgby5jc3NDbGFzc2VzIHx8IHt9KTtcbiAgdGhpcy5jc3NDbGFzc2VzLnByZWZpeCA9XG4gICAgby5jc3NDbGFzc2VzLmZvcm1hdHRlZFByZWZpeCB8fCBfLmZvcm1hdFByZWZpeCh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMubm9QcmVmaXgpO1xuXG4gIHZhciBjbGF6eiA9IF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5kYXRhc2V0KTtcbiAgdGhpcy4kZWwgPSBvLiRtZW51ICYmIG8uJG1lbnUuZmluZChjbGF6eiArICctJyArIHRoaXMubmFtZSkubGVuZ3RoID4gMCA/XG4gICAgRE9NLmVsZW1lbnQoby4kbWVudS5maW5kKGNsYXp6ICsgJy0nICsgdGhpcy5uYW1lKVswXSkgOlxuICAgIERPTS5lbGVtZW50KFxuICAgICAgaHRtbC5kYXRhc2V0LnJlcGxhY2UoJyVDTEFTUyUnLCB0aGlzLm5hbWUpXG4gICAgICAgIC5yZXBsYWNlKCclUFJFRklYJScsIHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgpXG4gICAgICAgIC5yZXBsYWNlKCclREFUQVNFVCUnLCB0aGlzLmNzc0NsYXNzZXMuZGF0YXNldClcbiAgICApO1xuXG4gIHRoaXMuJG1lbnUgPSBvLiRtZW51O1xuICB0aGlzLmNsZWFyQ2FjaGVkU3VnZ2VzdGlvbnMoKTtcbn1cblxuLy8gc3RhdGljIG1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tXG5cbkRhdGFzZXQuZXh0cmFjdERhdGFzZXROYW1lID0gZnVuY3Rpb24gZXh0cmFjdERhdGFzZXROYW1lKGVsKSB7XG4gIHJldHVybiBET00uZWxlbWVudChlbCkuZGF0YShkYXRhc2V0S2V5KTtcbn07XG5cbkRhdGFzZXQuZXh0cmFjdFZhbHVlID0gZnVuY3Rpb24gZXh0cmFjdFZhbHVlKGVsKSB7XG4gIHJldHVybiBET00uZWxlbWVudChlbCkuZGF0YSh2YWx1ZUtleSk7XG59O1xuXG5EYXRhc2V0LmV4dHJhY3REYXR1bSA9IGZ1bmN0aW9uIGV4dHJhY3REYXR1bShlbCkge1xuICB2YXIgZGF0dW0gPSBET00uZWxlbWVudChlbCkuZGF0YShkYXR1bUtleSk7XG4gIGlmICh0eXBlb2YgZGF0dW0gPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gWmVwdG8gaGFzIGFuIGF1dG9tYXRpYyBkZXNlcmlhbGl6YXRpb24gb2YgdGhlXG4gICAgLy8gSlNPTiBlbmNvZGVkIGRhdGEgYXR0cmlidXRlXG4gICAgZGF0dW0gPSBKU09OLnBhcnNlKGRhdHVtKTtcbiAgfVxuICByZXR1cm4gZGF0dW07XG59O1xuXG4vLyBpbnN0YW5jZSBtZXRob2RzXG4vLyAtLS0tLS0tLS0tLS0tLS0tXG5cbl8ubWl4aW4oRGF0YXNldC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuXG4gIC8vICMjIyBwcml2YXRlXG5cbiAgX3JlbmRlcjogZnVuY3Rpb24gcmVuZGVyKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgIGlmICghdGhpcy4kZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgdmFyIGhhc1N1Z2dlc3Rpb25zO1xuICAgIHZhciByZW5kZXJBcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHRoaXMuJGVsLmVtcHR5KCk7XG5cbiAgICBoYXNTdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zICYmIHN1Z2dlc3Rpb25zLmxlbmd0aDtcbiAgICB0aGlzLl9pc0VtcHR5ID0gIWhhc1N1Z2dlc3Rpb25zO1xuXG4gICAgaWYgKCFoYXNTdWdnZXN0aW9ucyAmJiB0aGlzLnRlbXBsYXRlcy5lbXB0eSkge1xuICAgICAgdGhpcy4kZWxcbiAgICAgICAgLmh0bWwoZ2V0RW1wdHlIdG1sLmFwcGx5KHRoaXMsIHJlbmRlckFyZ3MpKVxuICAgICAgICAucHJlcGVuZCh0aGF0LnRlbXBsYXRlcy5oZWFkZXIgPyBnZXRIZWFkZXJIdG1sLmFwcGx5KHRoaXMsIHJlbmRlckFyZ3MpIDogbnVsbClcbiAgICAgICAgLmFwcGVuZCh0aGF0LnRlbXBsYXRlcy5mb290ZXIgPyBnZXRGb290ZXJIdG1sLmFwcGx5KHRoaXMsIHJlbmRlckFyZ3MpIDogbnVsbCk7XG4gICAgfSBlbHNlIGlmIChoYXNTdWdnZXN0aW9ucykge1xuICAgICAgdGhpcy4kZWxcbiAgICAgICAgLmh0bWwoZ2V0U3VnZ2VzdGlvbnNIdG1sLmFwcGx5KHRoaXMsIHJlbmRlckFyZ3MpKVxuICAgICAgICAucHJlcGVuZCh0aGF0LnRlbXBsYXRlcy5oZWFkZXIgPyBnZXRIZWFkZXJIdG1sLmFwcGx5KHRoaXMsIHJlbmRlckFyZ3MpIDogbnVsbClcbiAgICAgICAgLmFwcGVuZCh0aGF0LnRlbXBsYXRlcy5mb290ZXIgPyBnZXRGb290ZXJIdG1sLmFwcGx5KHRoaXMsIHJlbmRlckFyZ3MpIDogbnVsbCk7XG4gICAgfSBlbHNlIGlmIChzdWdnZXN0aW9ucyAmJiAhQXJyYXkuaXNBcnJheShzdWdnZXN0aW9ucykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3N1Z2dlc3Rpb25zIG11c3QgYmUgYW4gYXJyYXknKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kbWVudSkge1xuICAgICAgdGhpcy4kbWVudS5hZGRDbGFzcyhcbiAgICAgICAgdGhpcy5jc3NDbGFzc2VzLnByZWZpeCArIChoYXNTdWdnZXN0aW9ucyA/ICd3aXRoJyA6ICd3aXRob3V0JykgKyAnLScgKyB0aGlzLm5hbWVcbiAgICAgICkucmVtb3ZlQ2xhc3MoXG4gICAgICAgIHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXggKyAoaGFzU3VnZ2VzdGlvbnMgPyAnd2l0aG91dCcgOiAnd2l0aCcpICsgJy0nICsgdGhpcy5uYW1lXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMudHJpZ2dlcigncmVuZGVyZWQnLCBxdWVyeSk7XG5cbiAgICBmdW5jdGlvbiBnZXRFbXB0eUh0bWwoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgIGFyZ3MgPSBbe3F1ZXJ5OiBxdWVyeSwgaXNFbXB0eTogdHJ1ZX1dLmNvbmNhdChhcmdzKTtcbiAgICAgIHJldHVybiB0aGF0LnRlbXBsYXRlcy5lbXB0eS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTdWdnZXN0aW9uc0h0bWwoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgIHZhciAkc3VnZ2VzdGlvbnM7XG4gICAgICB2YXIgbm9kZXM7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHZhciBzdWdnZXN0aW9uc0h0bWwgPSBodG1sLnN1Z2dlc3Rpb25zLlxuICAgICAgICByZXBsYWNlKCclUFJFRklYJScsIHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgpLlxuICAgICAgICByZXBsYWNlKCclU1VHR0VTVElPTlMlJywgdGhpcy5jc3NDbGFzc2VzLnN1Z2dlc3Rpb25zKTtcbiAgICAgICRzdWdnZXN0aW9ucyA9IERPTVxuICAgICAgICAuZWxlbWVudChzdWdnZXN0aW9uc0h0bWwpXG4gICAgICAgIC5jc3ModGhpcy5jc3Muc3VnZ2VzdGlvbnMpO1xuXG4gICAgICAvLyBqUXVlcnkjYXBwZW5kIGRvZXNuJ3Qgc3VwcG9ydCBhcnJheXMgYXMgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAgICAvLyB1bnRpbCB2ZXJzaW9uIDEuOCwgc2VlIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzExMjMxXG4gICAgICBub2RlcyA9IF8ubWFwKHN1Z2dlc3Rpb25zLCBnZXRTdWdnZXN0aW9uTm9kZSk7XG4gICAgICAkc3VnZ2VzdGlvbnMuYXBwZW5kLmFwcGx5KCRzdWdnZXN0aW9ucywgbm9kZXMpO1xuXG4gICAgICByZXR1cm4gJHN1Z2dlc3Rpb25zO1xuXG4gICAgICBmdW5jdGlvbiBnZXRTdWdnZXN0aW9uTm9kZShzdWdnZXN0aW9uKSB7XG4gICAgICAgIHZhciAkZWw7XG5cbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25IdG1sID0gaHRtbC5zdWdnZXN0aW9uLlxuICAgICAgICAgIHJlcGxhY2UoJyVQUkVGSVglJywgc2VsZi5jc3NDbGFzc2VzLnByZWZpeCkuXG4gICAgICAgICAgcmVwbGFjZSgnJVNVR0dFU1RJT04lJywgc2VsZi5jc3NDbGFzc2VzLnN1Z2dlc3Rpb24pO1xuICAgICAgICAkZWwgPSBET00uZWxlbWVudChzdWdnZXN0aW9uSHRtbClcbiAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICByb2xlOiAnb3B0aW9uJyxcbiAgICAgICAgICAgIGlkOiBbJ29wdGlvbicsIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMCldLmpvaW4oJy0nKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmFwcGVuZCh0aGF0LnRlbXBsYXRlcy5zdWdnZXN0aW9uLmFwcGx5KHRoaXMsIFtzdWdnZXN0aW9uXS5jb25jYXQoYXJncykpKTtcblxuICAgICAgICAkZWwuZGF0YShkYXRhc2V0S2V5LCB0aGF0Lm5hbWUpO1xuICAgICAgICAkZWwuZGF0YSh2YWx1ZUtleSwgdGhhdC5kaXNwbGF5Rm4oc3VnZ2VzdGlvbikgfHwgdW5kZWZpbmVkKTsgLy8gdGhpcyBsZWQgdG8gdW5kZWZpbmVkIHJldHVybiB2YWx1ZVxuICAgICAgICAkZWwuZGF0YShkYXR1bUtleSwgSlNPTi5zdHJpbmdpZnkoc3VnZ2VzdGlvbikpO1xuICAgICAgICAkZWwuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKCkgeyBET00uZWxlbWVudCh0aGlzKS5jc3Moc2VsZi5jc3Muc3VnZ2VzdGlvbkNoaWxkKTsgfSk7XG5cbiAgICAgICAgcmV0dXJuICRlbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIZWFkZXJIdG1sKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICBhcmdzID0gW3txdWVyeTogcXVlcnksIGlzRW1wdHk6ICFoYXNTdWdnZXN0aW9uc31dLmNvbmNhdChhcmdzKTtcbiAgICAgIHJldHVybiB0aGF0LnRlbXBsYXRlcy5oZWFkZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Rm9vdGVySHRtbCgpIHtcbiAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgYXJncyA9IFt7cXVlcnk6IHF1ZXJ5LCBpc0VtcHR5OiAhaGFzU3VnZ2VzdGlvbnN9XS5jb25jYXQoYXJncyk7XG4gICAgICByZXR1cm4gdGhhdC50ZW1wbGF0ZXMuZm9vdGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSxcblxuICAvLyAjIyMgcHVibGljXG5cbiAgZ2V0Um9vdDogZnVuY3Rpb24gZ2V0Um9vdCgpIHtcbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUocXVlcnkpIHtcbiAgICBmdW5jdGlvbiBoYW5kbGVTdWdnZXN0aW9ucyhzdWdnZXN0aW9ucykge1xuICAgICAgLy8gaWYgdGhlIHVwZGF0ZSBoYXMgYmVlbiBjYW5jZWxlZCBvciBpZiB0aGUgcXVlcnkgaGFzIGNoYW5nZWRcbiAgICAgIC8vIGRvIG5vdCByZW5kZXIgdGhlIHN1Z2dlc3Rpb25zIGFzIHRoZXkndmUgYmVjb21lIG91dGRhdGVkXG4gICAgICBpZiAoIXRoaXMuY2FuY2VsZWQgJiYgcXVlcnkgPT09IHRoaXMucXVlcnkpIHtcbiAgICAgICAgLy8gY29uY2F0IGFsbCB0aGUgb3RoZXIgYXJndW1lbnRzIHRoYXQgY291bGQgaGF2ZSBiZWVuIHBhc3NlZFxuICAgICAgICAvLyB0byB0aGUgcmVuZGVyIGZ1bmN0aW9uLCBhbmQgZm9yd2FyZCB0aGVtIHRvIF9yZW5kZXJcbiAgICAgICAgdmFyIGV4dHJhQXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgdGhpcy5jYWNoZVN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucywgZXh0cmFBcmdzKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyLmFwcGx5KHRoaXMsIFtxdWVyeSwgc3VnZ2VzdGlvbnNdLmNvbmNhdChleHRyYUFyZ3MpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgdGhpcy5jYW5jZWxlZCA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuc2hvdWxkRmV0Y2hGcm9tQ2FjaGUocXVlcnkpKSB7XG4gICAgICBoYW5kbGVTdWdnZXN0aW9ucy5hcHBseSh0aGlzLCBbdGhpcy5jYWNoZWRTdWdnZXN0aW9uc10uY29uY2F0KHRoaXMuY2FjaGVkUmVuZGVyRXh0cmFBcmdzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBleGVjU291cmNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFdoZW4gdGhlIGNhbGwgaXMgZGVib3VuY2VkIHRoZSBjb25kaXRpb24gYXZvaWQgdG8gZG8gYSB1c2VsZXNzXG4gICAgICAgIC8vIHJlcXVlc3Qgd2l0aCB0aGUgbGFzdCBjaGFyYWN0ZXIgd2hlbiB0aGUgaW5wdXQgaGFzIGJlZW4gY2xlYXJlZFxuICAgICAgICBpZiAoIXRoYXQuY2FuY2VsZWQpIHtcbiAgICAgICAgICB0aGF0LnNvdXJjZShxdWVyeSwgaGFuZGxlU3VnZ2VzdGlvbnMuYmluZCh0aGF0KSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLmRlYm91bmNlKSB7XG4gICAgICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQuZGVib3VuY2VUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICBleGVjU291cmNlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRlYm91bmNlVGltZW91dCk7XG4gICAgICAgIHRoaXMuZGVib3VuY2VUaW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgdGhpcy5kZWJvdW5jZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBleGVjU291cmNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGNhY2hlU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIGNhY2hlU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zLCBleHRyYUFyZ3MpIHtcbiAgICB0aGlzLmNhY2hlZFF1ZXJ5ID0gcXVlcnk7XG4gICAgdGhpcy5jYWNoZWRTdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zO1xuICAgIHRoaXMuY2FjaGVkUmVuZGVyRXh0cmFBcmdzID0gZXh0cmFBcmdzO1xuICB9LFxuXG4gIHNob3VsZEZldGNoRnJvbUNhY2hlOiBmdW5jdGlvbiBzaG91bGRGZXRjaEZyb21DYWNoZShxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlICYmXG4gICAgICB0aGlzLmNhY2hlZFF1ZXJ5ID09PSBxdWVyeSAmJlxuICAgICAgdGhpcy5jYWNoZWRTdWdnZXN0aW9ucyAmJlxuICAgICAgdGhpcy5jYWNoZWRTdWdnZXN0aW9ucy5sZW5ndGg7XG4gIH0sXG5cbiAgY2xlYXJDYWNoZWRTdWdnZXN0aW9uczogZnVuY3Rpb24gY2xlYXJDYWNoZWRTdWdnZXN0aW9ucygpIHtcbiAgICBkZWxldGUgdGhpcy5jYWNoZWRRdWVyeTtcbiAgICBkZWxldGUgdGhpcy5jYWNoZWRTdWdnZXN0aW9ucztcbiAgICBkZWxldGUgdGhpcy5jYWNoZWRSZW5kZXJFeHRyYUFyZ3M7XG4gIH0sXG5cbiAgY2FuY2VsOiBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgdGhpcy5jYW5jZWxlZCA9IHRydWU7XG4gIH0sXG5cbiAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIGlmICh0aGlzLiRlbCkge1xuICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgIHRoaXMuJGVsLmVtcHR5KCk7XG4gICAgICB0aGlzLnRyaWdnZXIoJ3JlbmRlcmVkJywgJycpO1xuICAgIH1cbiAgfSxcblxuICBpc0VtcHR5OiBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLl9pc0VtcHR5O1xuICB9LFxuXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbGVhckNhY2hlZFN1Z2dlc3Rpb25zKCk7XG4gICAgdGhpcy4kZWwgPSBudWxsO1xuICB9XG59KTtcblxuLy8gaGVscGVyIGZ1bmN0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5Rm4oZGlzcGxheSkge1xuICBkaXNwbGF5ID0gZGlzcGxheSB8fCAndmFsdWUnO1xuXG4gIHJldHVybiBfLmlzRnVuY3Rpb24oZGlzcGxheSkgPyBkaXNwbGF5IDogZGlzcGxheUZuO1xuXG4gIGZ1bmN0aW9uIGRpc3BsYXlGbihvYmopIHtcbiAgICByZXR1cm4gb2JqW2Rpc3BsYXldO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRlbXBsYXRlcyh0ZW1wbGF0ZXMsIGRpc3BsYXlGbikge1xuICByZXR1cm4ge1xuICAgIGVtcHR5OiB0ZW1wbGF0ZXMuZW1wdHkgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5lbXB0eSksXG4gICAgaGVhZGVyOiB0ZW1wbGF0ZXMuaGVhZGVyICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMuaGVhZGVyKSxcbiAgICBmb290ZXI6IHRlbXBsYXRlcy5mb290ZXIgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5mb290ZXIpLFxuICAgIHN1Z2dlc3Rpb246IHRlbXBsYXRlcy5zdWdnZXN0aW9uIHx8IHN1Z2dlc3Rpb25UZW1wbGF0ZVxuICB9O1xuXG4gIGZ1bmN0aW9uIHN1Z2dlc3Rpb25UZW1wbGF0ZShjb250ZXh0KSB7XG4gICAgcmV0dXJuICc8cD4nICsgZGlzcGxheUZuKGNvbnRleHQpICsgJzwvcD4nO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWROYW1lKHN0cikge1xuICAvLyBkYXNoZXMsIHVuZGVyc2NvcmVzLCBsZXR0ZXJzLCBhbmQgbnVtYmVyc1xuICByZXR1cm4gKC9eW19hLXpBLVowLTktXSskLykudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFzZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzLmpzJyk7XG52YXIgRE9NID0gcmVxdWlyZSgnLi4vY29tbW9uL2RvbS5qcycpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJy4vZXZlbnRfZW1pdHRlci5qcycpO1xudmFyIERhdGFzZXQgPSByZXF1aXJlKCcuL2RhdGFzZXQuanMnKTtcbnZhciBjc3MgPSByZXF1aXJlKCcuL2Nzcy5qcycpO1xuXG4vLyBjb25zdHJ1Y3RvclxuLy8gLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gRHJvcGRvd24obykge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBvblN1Z2dlc3Rpb25DbGljaztcbiAgdmFyIG9uU3VnZ2VzdGlvbk1vdXNlRW50ZXI7XG4gIHZhciBvblN1Z2dlc3Rpb25Nb3VzZUxlYXZlO1xuXG4gIG8gPSBvIHx8IHt9O1xuXG4gIGlmICghby5tZW51KSB7XG4gICAgXy5lcnJvcignbWVudSBpcyByZXF1aXJlZCcpO1xuICB9XG5cbiAgaWYgKCFfLmlzQXJyYXkoby5kYXRhc2V0cykgJiYgIV8uaXNPYmplY3Qoby5kYXRhc2V0cykpIHtcbiAgICBfLmVycm9yKCcxIG9yIG1vcmUgZGF0YXNldHMgcmVxdWlyZWQnKTtcbiAgfVxuICBpZiAoIW8uZGF0YXNldHMpIHtcbiAgICBfLmVycm9yKCdkYXRhc2V0cyBpcyByZXF1aXJlZCcpO1xuICB9XG5cbiAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgdGhpcy5pc0VtcHR5ID0gdHJ1ZTtcbiAgdGhpcy5taW5MZW5ndGggPSBvLm1pbkxlbmd0aCB8fCAwO1xuICB0aGlzLnRlbXBsYXRlcyA9IHt9O1xuICB0aGlzLmFwcGVuZFRvID0gby5hcHBlbmRUbyB8fCBmYWxzZTtcbiAgdGhpcy5jc3MgPSBfLm1peGluKHt9LCBjc3MsIG8uYXBwZW5kVG8gPyBjc3MuYXBwZW5kVG8gOiB7fSk7XG4gIHRoaXMuY3NzQ2xhc3NlcyA9IG8uY3NzQ2xhc3NlcyA9IF8ubWl4aW4oe30sIGNzcy5kZWZhdWx0Q2xhc3Nlcywgby5jc3NDbGFzc2VzIHx8IHt9KTtcbiAgdGhpcy5jc3NDbGFzc2VzLnByZWZpeCA9XG4gICAgby5jc3NDbGFzc2VzLmZvcm1hdHRlZFByZWZpeCB8fCBfLmZvcm1hdFByZWZpeCh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMubm9QcmVmaXgpO1xuXG4gIC8vIGJvdW5kIGZ1bmN0aW9uc1xuICBvblN1Z2dlc3Rpb25DbGljayA9IF8uYmluZCh0aGlzLl9vblN1Z2dlc3Rpb25DbGljaywgdGhpcyk7XG4gIG9uU3VnZ2VzdGlvbk1vdXNlRW50ZXIgPSBfLmJpbmQodGhpcy5fb25TdWdnZXN0aW9uTW91c2VFbnRlciwgdGhpcyk7XG4gIG9uU3VnZ2VzdGlvbk1vdXNlTGVhdmUgPSBfLmJpbmQodGhpcy5fb25TdWdnZXN0aW9uTW91c2VMZWF2ZSwgdGhpcyk7XG5cbiAgdmFyIGNzc0NsYXNzID0gXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLnN1Z2dlc3Rpb24pO1xuICB0aGlzLiRtZW51ID0gRE9NLmVsZW1lbnQoby5tZW51KVxuICAgIC5vbignbW91c2VlbnRlci5hYScsIGNzc0NsYXNzLCBvblN1Z2dlc3Rpb25Nb3VzZUVudGVyKVxuICAgIC5vbignbW91c2VsZWF2ZS5hYScsIGNzc0NsYXNzLCBvblN1Z2dlc3Rpb25Nb3VzZUxlYXZlKVxuICAgIC5vbignY2xpY2suYWEnLCBjc3NDbGFzcywgb25TdWdnZXN0aW9uQ2xpY2spO1xuXG4gIHRoaXMuJGNvbnRhaW5lciA9IG8uYXBwZW5kVG8gPyBvLndyYXBwZXIgOiB0aGlzLiRtZW51O1xuXG4gIGlmIChvLnRlbXBsYXRlcyAmJiBvLnRlbXBsYXRlcy5oZWFkZXIpIHtcbiAgICB0aGlzLnRlbXBsYXRlcy5oZWFkZXIgPSBfLnRlbXBsYXRpZnkoby50ZW1wbGF0ZXMuaGVhZGVyKTtcbiAgICB0aGlzLiRtZW51LnByZXBlbmQodGhpcy50ZW1wbGF0ZXMuaGVhZGVyKCkpO1xuICB9XG5cbiAgaWYgKG8udGVtcGxhdGVzICYmIG8udGVtcGxhdGVzLmVtcHR5KSB7XG4gICAgdGhpcy50ZW1wbGF0ZXMuZW1wdHkgPSBfLnRlbXBsYXRpZnkoby50ZW1wbGF0ZXMuZW1wdHkpO1xuICAgIHRoaXMuJGVtcHR5ID0gRE9NLmVsZW1lbnQoJzxkaXYgY2xhc3M9XCInICtcbiAgICAgIF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5lbXB0eSwgdHJ1ZSkgKyAnXCI+JyArXG4gICAgICAnPC9kaXY+Jyk7XG4gICAgdGhpcy4kbWVudS5hcHBlbmQodGhpcy4kZW1wdHkpO1xuICAgIHRoaXMuJGVtcHR5LmhpZGUoKTtcbiAgfVxuXG4gIHRoaXMuZGF0YXNldHMgPSBfLm1hcChvLmRhdGFzZXRzLCBmdW5jdGlvbihvRGF0YXNldCkge1xuICAgIHJldHVybiBpbml0aWFsaXplRGF0YXNldCh0aGF0LiRtZW51LCBvRGF0YXNldCwgby5jc3NDbGFzc2VzKTtcbiAgfSk7XG4gIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBmdW5jdGlvbihkYXRhc2V0KSB7XG4gICAgdmFyIHJvb3QgPSBkYXRhc2V0LmdldFJvb3QoKTtcbiAgICBpZiAocm9vdCAmJiByb290LnBhcmVudCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhhdC4kbWVudS5hcHBlbmQocm9vdCk7XG4gICAgfVxuICAgIGRhdGFzZXQub25TeW5jKCdyZW5kZXJlZCcsIHRoYXQuX29uUmVuZGVyZWQsIHRoYXQpO1xuICB9KTtcblxuICBpZiAoby50ZW1wbGF0ZXMgJiYgby50ZW1wbGF0ZXMuZm9vdGVyKSB7XG4gICAgdGhpcy50ZW1wbGF0ZXMuZm9vdGVyID0gXy50ZW1wbGF0aWZ5KG8udGVtcGxhdGVzLmZvb3Rlcik7XG4gICAgdGhpcy4kbWVudS5hcHBlbmQodGhpcy50ZW1wbGF0ZXMuZm9vdGVyKCkpO1xuICB9XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBET00uZWxlbWVudCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICBzZWxmLl9yZWRyYXcoKTtcbiAgfSk7XG59XG5cbi8vIGluc3RhbmNlIG1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS1cblxuXy5taXhpbihEcm9wZG93bi5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuXG4gIC8vICMjIyBwcml2YXRlXG5cbiAgX29uU3VnZ2VzdGlvbkNsaWNrOiBmdW5jdGlvbiBvblN1Z2dlc3Rpb25DbGljaygkZSkge1xuICAgIHRoaXMudHJpZ2dlcignc3VnZ2VzdGlvbkNsaWNrZWQnLCBET00uZWxlbWVudCgkZS5jdXJyZW50VGFyZ2V0KSk7XG4gIH0sXG5cbiAgX29uU3VnZ2VzdGlvbk1vdXNlRW50ZXI6IGZ1bmN0aW9uIG9uU3VnZ2VzdGlvbk1vdXNlRW50ZXIoJGUpIHtcbiAgICB2YXIgZWx0ID0gRE9NLmVsZW1lbnQoJGUuY3VycmVudFRhcmdldCk7XG4gICAgaWYgKGVsdC5oYXNDbGFzcyhfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuY3Vyc29yLCB0cnVlKSkpIHtcbiAgICAgIC8vIHdlJ3JlIGFscmVhZHkgb24gdGhlIGN1cnNvclxuICAgICAgLy8gPT4gd2UncmUgcHJvYmFibHkgZW50ZXJpbmcgaXQgYWdhaW4gYWZ0ZXIgbGVhdmluZyBpdCBmb3IgYSBuZXN0ZWQgZGl2XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZUN1cnNvcigpO1xuXG4gICAgLy8gRml4ZXMgaU9TIGRvdWJsZSB0YXAgYmVoYXZpb3VyLCBieSBtb2RpZnlpbmcgdGhlIERPTSByaWdodCBiZWZvcmUgdGhlXG4gICAgLy8gbmF0aXZlIGhyZWYgY2xpY2tzIGhhcHBlbnMsIGlPUyB3aWxsIHJlcXVpcmVzIGFub3RoZXIgdGFwIHRvIGZvbGxvd1xuICAgIC8vIGEgc3VnZ2VzdGlvbiB0aGF0IGhhcyBhbiA8YSBocmVmPiBlbGVtZW50IGluc2lkZVxuICAgIC8vIGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vc2VhcmNoP3E9aW9zK2RvdWJsZSt0YXArYnVnK2hyZWZcbiAgICB2YXIgc3VnZ2VzdGlvbiA9IHRoaXM7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIC8vIHRoaXMgZXhhY3QgbGluZSwgd2hlbiBpbnNpZGUgdGhlIG1haW4gbG9vcCwgd2lsbCB0cmlnZ2VyIGEgZG91YmxlIHRhcCBidWdcbiAgICAgIC8vIG9uIGlPUyBkZXZpY2VzXG4gICAgICBzdWdnZXN0aW9uLl9zZXRDdXJzb3IoZWx0LCBmYWxzZSk7XG4gICAgfSwgMCk7XG4gIH0sXG5cbiAgX29uU3VnZ2VzdGlvbk1vdXNlTGVhdmU6IGZ1bmN0aW9uIG9uU3VnZ2VzdGlvbk1vdXNlTGVhdmUoJGUpIHtcbiAgICAvLyAkZS5yZWxhdGVkVGFyZ2V0IGlzIHRoZSBgRXZlbnRUYXJnZXRgIHRoZSBwb2ludGluZyBkZXZpY2UgZW50ZXJlZCB0b1xuICAgIGlmICgkZS5yZWxhdGVkVGFyZ2V0KSB7XG4gICAgICB2YXIgZWx0ID0gRE9NLmVsZW1lbnQoJGUucmVsYXRlZFRhcmdldCk7XG4gICAgICBpZiAoZWx0LmNsb3Nlc3QoJy4nICsgXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLmN1cnNvciwgdHJ1ZSkpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gb3VyIGZhdGhlciBpcyBhIGN1cnNvclxuICAgICAgICAvLyA9PiBpdCBtZWFucyB3ZSdyZSBqdXN0IGxlYXZpbmcgdGhlIHN1Z2dlc3Rpb24gZm9yIGEgbmVzdGVkIGRpdlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZUN1cnNvcigpO1xuICAgIHRoaXMudHJpZ2dlcignY3Vyc29yUmVtb3ZlZCcpO1xuICB9LFxuXG4gIF9vblJlbmRlcmVkOiBmdW5jdGlvbiBvblJlbmRlcmVkKGUsIHF1ZXJ5KSB7XG4gICAgdGhpcy5pc0VtcHR5ID0gXy5ldmVyeSh0aGlzLmRhdGFzZXRzLCBpc0RhdGFzZXRFbXB0eSk7XG5cbiAgICBpZiAodGhpcy5pc0VtcHR5KSB7XG4gICAgICBpZiAocXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcignZW1wdHknKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuJGVtcHR5KSB7XG4gICAgICAgIGlmIChxdWVyeS5sZW5ndGggPCB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgaHRtbCA9IHRoaXMudGVtcGxhdGVzLmVtcHR5KHtcbiAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLmRhdGFzZXRzWzBdICYmIHRoaXMuZGF0YXNldHNbMF0ucXVlcnlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLiRlbXB0eS5odG1sKGh0bWwpO1xuICAgICAgICAgIHRoaXMuJGVtcHR5LnNob3coKTtcbiAgICAgICAgICB0aGlzLl9zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXy5hbnkodGhpcy5kYXRhc2V0cywgaGFzRW1wdHlUZW1wbGF0ZSkpIHtcbiAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3Nob3coKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIGlmICh0aGlzLiRlbXB0eSkge1xuICAgICAgICB0aGlzLiRlbXB0eS5lbXB0eSgpO1xuICAgICAgICB0aGlzLiRlbXB0eS5oaWRlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fc2hvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudHJpZ2dlcignZGF0YXNldFJlbmRlcmVkJyk7XG5cbiAgICBmdW5jdGlvbiBpc0RhdGFzZXRFbXB0eShkYXRhc2V0KSB7XG4gICAgICByZXR1cm4gZGF0YXNldC5pc0VtcHR5KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzRW1wdHlUZW1wbGF0ZShkYXRhc2V0KSB7XG4gICAgICByZXR1cm4gZGF0YXNldC50ZW1wbGF0ZXMgJiYgZGF0YXNldC50ZW1wbGF0ZXMuZW1wdHk7XG4gICAgfVxuICB9LFxuXG4gIF9oaWRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRjb250YWluZXIuaGlkZSgpO1xuICB9LFxuXG4gIF9zaG93OiBmdW5jdGlvbigpIHtcbiAgICAvLyBjYW4ndCB1c2UgalF1ZXJ5I3Nob3cgYmVjYXVzZSAkbWVudSBpcyBhIHNwYW4gZWxlbWVudCB3ZSB3YW50XG4gICAgLy8gZGlzcGxheTogYmxvY2s7IG5vdCBkaXNsYXk6IGlubGluZTtcbiAgICB0aGlzLiRjb250YWluZXIuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICB0aGlzLl9yZWRyYXcoKTtcblxuICAgIHRoaXMudHJpZ2dlcignc2hvd24nKTtcbiAgfSxcblxuICBfcmVkcmF3OiBmdW5jdGlvbiByZWRyYXcoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbiB8fCAhdGhpcy5hcHBlbmRUbykgcmV0dXJuO1xuXG4gICAgdGhpcy50cmlnZ2VyKCdyZWRyYXduJyk7XG4gIH0sXG5cbiAgX2dldFN1Z2dlc3Rpb25zOiBmdW5jdGlvbiBnZXRTdWdnZXN0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy4kbWVudS5maW5kKF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5zdWdnZXN0aW9uKSk7XG4gIH0sXG5cbiAgX2dldEN1cnNvcjogZnVuY3Rpb24gZ2V0Q3Vyc29yKCkge1xuICAgIHJldHVybiB0aGlzLiRtZW51LmZpbmQoXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLmN1cnNvcikpLmZpcnN0KCk7XG4gIH0sXG5cbiAgX3NldEN1cnNvcjogZnVuY3Rpb24gc2V0Q3Vyc29yKCRlbCwgdXBkYXRlSW5wdXQpIHtcbiAgICAkZWwuZmlyc3QoKVxuICAgICAgLmFkZENsYXNzKF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5jdXJzb3IsIHRydWUpKVxuICAgICAgLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgIHRoaXMudHJpZ2dlcignY3Vyc29yTW92ZWQnLCB1cGRhdGVJbnB1dCk7XG4gIH0sXG5cbiAgX3JlbW92ZUN1cnNvcjogZnVuY3Rpb24gcmVtb3ZlQ3Vyc29yKCkge1xuICAgIHRoaXMuX2dldEN1cnNvcigpXG4gICAgICAucmVtb3ZlQ2xhc3MoXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLmN1cnNvciwgdHJ1ZSkpXG4gICAgICAucmVtb3ZlQXR0cignYXJpYS1zZWxlY3RlZCcpO1xuICB9LFxuXG4gIF9tb3ZlQ3Vyc29yOiBmdW5jdGlvbiBtb3ZlQ3Vyc29yKGluY3JlbWVudCkge1xuICAgIHZhciAkc3VnZ2VzdGlvbnM7XG4gICAgdmFyICRvbGRDdXJzb3I7XG4gICAgdmFyIG5ld0N1cnNvckluZGV4O1xuICAgIHZhciAkbmV3Q3Vyc29yO1xuXG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgICRvbGRDdXJzb3IgPSB0aGlzLl9nZXRDdXJzb3IoKTtcbiAgICAkc3VnZ2VzdGlvbnMgPSB0aGlzLl9nZXRTdWdnZXN0aW9ucygpO1xuXG4gICAgdGhpcy5fcmVtb3ZlQ3Vyc29yKCk7XG5cbiAgICAvLyBzaGlmdGluZyBiZWZvcmUgYW5kIGFmdGVyIG1vZHVsbyB0byBkZWFsIHdpdGggLTEgaW5kZXhcbiAgICBuZXdDdXJzb3JJbmRleCA9ICRzdWdnZXN0aW9ucy5pbmRleCgkb2xkQ3Vyc29yKSArIGluY3JlbWVudDtcbiAgICBuZXdDdXJzb3JJbmRleCA9IChuZXdDdXJzb3JJbmRleCArIDEpICUgKCRzdWdnZXN0aW9ucy5sZW5ndGggKyAxKSAtIDE7XG5cbiAgICBpZiAobmV3Q3Vyc29ySW5kZXggPT09IC0xKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2N1cnNvclJlbW92ZWQnKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAobmV3Q3Vyc29ySW5kZXggPCAtMSkge1xuICAgICAgbmV3Q3Vyc29ySW5kZXggPSAkc3VnZ2VzdGlvbnMubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZXRDdXJzb3IoJG5ld0N1cnNvciA9ICRzdWdnZXN0aW9ucy5lcShuZXdDdXJzb3JJbmRleCksIHRydWUpO1xuXG4gICAgLy8gaW4gdGhlIGNhc2Ugb2Ygc2Nyb2xsYWJsZSBvdmVyZmxvd1xuICAgIC8vIG1ha2Ugc3VyZSB0aGUgY3Vyc29yIGlzIHZpc2libGUgaW4gdGhlIG1lbnVcbiAgICB0aGlzLl9lbnN1cmVWaXNpYmxlKCRuZXdDdXJzb3IpO1xuICB9LFxuXG4gIF9lbnN1cmVWaXNpYmxlOiBmdW5jdGlvbiBlbnN1cmVWaXNpYmxlKCRlbCkge1xuICAgIHZhciBlbFRvcDtcbiAgICB2YXIgZWxCb3R0b207XG4gICAgdmFyIG1lbnVTY3JvbGxUb3A7XG4gICAgdmFyIG1lbnVIZWlnaHQ7XG5cbiAgICBlbFRvcCA9ICRlbC5wb3NpdGlvbigpLnRvcDtcbiAgICBlbEJvdHRvbSA9IGVsVG9wICsgJGVsLmhlaWdodCgpICtcbiAgICAgIHBhcnNlSW50KCRlbC5jc3MoJ21hcmdpbi10b3AnKSwgMTApICtcbiAgICAgIHBhcnNlSW50KCRlbC5jc3MoJ21hcmdpbi1ib3R0b20nKSwgMTApO1xuICAgIG1lbnVTY3JvbGxUb3AgPSB0aGlzLiRtZW51LnNjcm9sbFRvcCgpO1xuICAgIG1lbnVIZWlnaHQgPSB0aGlzLiRtZW51LmhlaWdodCgpICtcbiAgICAgIHBhcnNlSW50KHRoaXMuJG1lbnUuY3NzKCdwYWRkaW5nLXRvcCcpLCAxMCkgK1xuICAgICAgcGFyc2VJbnQodGhpcy4kbWVudS5jc3MoJ3BhZGRpbmctYm90dG9tJyksIDEwKTtcblxuICAgIGlmIChlbFRvcCA8IDApIHtcbiAgICAgIHRoaXMuJG1lbnUuc2Nyb2xsVG9wKG1lbnVTY3JvbGxUb3AgKyBlbFRvcCk7XG4gICAgfSBlbHNlIGlmIChtZW51SGVpZ2h0IDwgZWxCb3R0b20pIHtcbiAgICAgIHRoaXMuJG1lbnUuc2Nyb2xsVG9wKG1lbnVTY3JvbGxUb3AgKyAoZWxCb3R0b20gLSBtZW51SGVpZ2h0KSk7XG4gICAgfVxuICB9LFxuXG4gIC8vICMjIyBwdWJsaWNcblxuICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXG4gICAgICB0aGlzLl9yZW1vdmVDdXJzb3IoKTtcbiAgICAgIHRoaXMuX2hpZGUoKTtcblxuICAgICAgdGhpcy50cmlnZ2VyKCdjbG9zZWQnKTtcbiAgICB9XG4gIH0sXG5cbiAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG5cbiAgICAgIGlmICghdGhpcy5pc0VtcHR5KSB7XG4gICAgICAgIHRoaXMuX3Nob3coKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50cmlnZ2VyKCdvcGVuZWQnKTtcbiAgICB9XG4gIH0sXG5cbiAgc2V0TGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIHNldExhbmd1YWdlRGlyZWN0aW9uKGRpcikge1xuICAgIHRoaXMuJG1lbnUuY3NzKGRpciA9PT0gJ2x0cicgPyB0aGlzLmNzcy5sdHIgOiB0aGlzLmNzcy5ydGwpO1xuICB9LFxuXG4gIG1vdmVDdXJzb3JVcDogZnVuY3Rpb24gbW92ZUN1cnNvclVwKCkge1xuICAgIHRoaXMuX21vdmVDdXJzb3IoLTEpO1xuICB9LFxuXG4gIG1vdmVDdXJzb3JEb3duOiBmdW5jdGlvbiBtb3ZlQ3Vyc29yRG93bigpIHtcbiAgICB0aGlzLl9tb3ZlQ3Vyc29yKCsxKTtcbiAgfSxcblxuICBnZXREYXR1bUZvclN1Z2dlc3Rpb246IGZ1bmN0aW9uIGdldERhdHVtRm9yU3VnZ2VzdGlvbigkZWwpIHtcbiAgICB2YXIgZGF0dW0gPSBudWxsO1xuXG4gICAgaWYgKCRlbC5sZW5ndGgpIHtcbiAgICAgIGRhdHVtID0ge1xuICAgICAgICByYXc6IERhdGFzZXQuZXh0cmFjdERhdHVtKCRlbCksXG4gICAgICAgIHZhbHVlOiBEYXRhc2V0LmV4dHJhY3RWYWx1ZSgkZWwpLFxuICAgICAgICBkYXRhc2V0TmFtZTogRGF0YXNldC5leHRyYWN0RGF0YXNldE5hbWUoJGVsKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0dW07XG4gIH0sXG5cbiAgZ2V0Q3VycmVudEN1cnNvcjogZnVuY3Rpb24gZ2V0Q3VycmVudEN1cnNvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q3Vyc29yKCkuZmlyc3QoKTtcbiAgfSxcblxuICBnZXREYXR1bUZvckN1cnNvcjogZnVuY3Rpb24gZ2V0RGF0dW1Gb3JDdXJzb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0dW1Gb3JTdWdnZXN0aW9uKHRoaXMuX2dldEN1cnNvcigpLmZpcnN0KCkpO1xuICB9LFxuXG4gIGdldERhdHVtRm9yVG9wU3VnZ2VzdGlvbjogZnVuY3Rpb24gZ2V0RGF0dW1Gb3JUb3BTdWdnZXN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldERhdHVtRm9yU3VnZ2VzdGlvbih0aGlzLl9nZXRTdWdnZXN0aW9ucygpLmZpcnN0KCkpO1xuICB9LFxuXG4gIGN1cnNvclRvcFN1Z2dlc3Rpb246IGZ1bmN0aW9uIGN1cnNvclRvcFN1Z2dlc3Rpb24oKSB7XG4gICAgdGhpcy5fc2V0Q3Vyc29yKHRoaXMuX2dldFN1Z2dlc3Rpb25zKCkuZmlyc3QoKSwgZmFsc2UpO1xuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHF1ZXJ5KSB7XG4gICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIHVwZGF0ZURhdGFzZXQpO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlRGF0YXNldChkYXRhc2V0KSB7XG4gICAgICBkYXRhc2V0LnVwZGF0ZShxdWVyeSk7XG4gICAgfVxuICB9LFxuXG4gIGVtcHR5OiBmdW5jdGlvbiBlbXB0eSgpIHtcbiAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgY2xlYXJEYXRhc2V0KTtcbiAgICB0aGlzLmlzRW1wdHkgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gY2xlYXJEYXRhc2V0KGRhdGFzZXQpIHtcbiAgICAgIGRhdGFzZXQuY2xlYXIoKTtcbiAgICB9XG4gIH0sXG5cbiAgaXNWaXNpYmxlOiBmdW5jdGlvbiBpc1Zpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuICYmICF0aGlzLmlzRW1wdHk7XG4gIH0sXG5cbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICB0aGlzLiRtZW51Lm9mZignLmFhJyk7XG5cbiAgICB0aGlzLiRtZW51ID0gbnVsbDtcblxuICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBkZXN0cm95RGF0YXNldCk7XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95RGF0YXNldChkYXRhc2V0KSB7XG4gICAgICBkYXRhc2V0LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBoZWxwZXIgZnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tXG5Ecm9wZG93bi5EYXRhc2V0ID0gRGF0YXNldDtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGFzZXQoJG1lbnUsIG9EYXRhc2V0LCBjc3NDbGFzc2VzKSB7XG4gIHJldHVybiBuZXcgRHJvcGRvd24uRGF0YXNldChfLm1peGluKHskbWVudTogJG1lbnUsIGNzc0NsYXNzZXM6IGNzc0NsYXNzZXN9LCBvRGF0YXNldCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3Bkb3duO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbmFtZXNwYWNlID0gJ2F1dG9jb21wbGV0ZTonO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscy5qcycpO1xudmFyIERPTSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9kb20uanMnKTtcblxuLy8gY29uc3RydWN0b3Jcbi8vIC0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIEV2ZW50QnVzKG8pIHtcbiAgaWYgKCFvIHx8ICFvLmVsKSB7XG4gICAgXy5lcnJvcignRXZlbnRCdXMgaW5pdGlhbGl6ZWQgd2l0aG91dCBlbCcpO1xuICB9XG5cbiAgdGhpcy4kZWwgPSBET00uZWxlbWVudChvLmVsKTtcbn1cblxuLy8gaW5zdGFuY2UgbWV0aG9kc1xuLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG5fLm1peGluKEV2ZW50QnVzLnByb3RvdHlwZSwge1xuXG4gIC8vICMjIyBwdWJsaWNcblxuICB0cmlnZ2VyOiBmdW5jdGlvbih0eXBlLCBzdWdnZXN0aW9uLCBkYXRhc2V0LCBjb250ZXh0KSB7XG4gICAgdmFyIGV2ZW50ID0gXy5FdmVudChuYW1lc3BhY2UgKyB0eXBlKTtcbiAgICB0aGlzLiRlbC50cmlnZ2VyKGV2ZW50LCBbc3VnZ2VzdGlvbiwgZGF0YXNldCwgY29udGV4dF0pO1xuICAgIHJldHVybiBldmVudDtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRCdXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbW1lZGlhdGUgPSByZXF1aXJlKCdpbW1lZGlhdGUnKTtcbnZhciBzcGxpdHRlciA9IC9cXHMrLztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uU3luYzogb25TeW5jLFxuICBvbkFzeW5jOiBvbkFzeW5jLFxuICBvZmY6IG9mZixcbiAgdHJpZ2dlcjogdHJpZ2dlclxufTtcblxuZnVuY3Rpb24gb24obWV0aG9kLCB0eXBlcywgY2IsIGNvbnRleHQpIHtcbiAgdmFyIHR5cGU7XG5cbiAgaWYgKCFjYikge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG4gIGNiID0gY29udGV4dCA/IGJpbmRDb250ZXh0KGNiLCBjb250ZXh0KSA6IGNiO1xuXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICB3aGlsZSAodHlwZSA9IHR5cGVzLnNoaWZ0KCkpIHtcbiAgICB0aGlzLl9jYWxsYmFja3NbdHlwZV0gPSB0aGlzLl9jYWxsYmFja3NbdHlwZV0gfHwge3N5bmM6IFtdLCBhc3luYzogW119O1xuICAgIHRoaXMuX2NhbGxiYWNrc1t0eXBlXVttZXRob2RdLnB1c2goY2IpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIG9uQXN5bmModHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gIHJldHVybiBvbi5jYWxsKHRoaXMsICdhc3luYycsIHR5cGVzLCBjYiwgY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIG9uU3luYyh0eXBlcywgY2IsIGNvbnRleHQpIHtcbiAgcmV0dXJuIG9uLmNhbGwodGhpcywgJ3N5bmMnLCB0eXBlcywgY2IsIGNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBvZmYodHlwZXMpIHtcbiAgdmFyIHR5cGU7XG5cbiAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHR5cGVzID0gdHlwZXMuc3BsaXQoc3BsaXR0ZXIpO1xuXG4gIHdoaWxlICh0eXBlID0gdHlwZXMuc2hpZnQoKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbdHlwZV07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gdHJpZ2dlcih0eXBlcykge1xuICB2YXIgdHlwZTtcbiAgdmFyIGNhbGxiYWNrcztcbiAgdmFyIGFyZ3M7XG4gIHZhciBzeW5jRmx1c2g7XG4gIHZhciBhc3luY0ZsdXNoO1xuXG4gIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcbiAgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICB3aGlsZSAoKHR5cGUgPSB0eXBlcy5zaGlmdCgpKSAmJiAoY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW3R5cGVdKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgc3luY0ZsdXNoID0gZ2V0Rmx1c2goY2FsbGJhY2tzLnN5bmMsIHRoaXMsIFt0eXBlXS5jb25jYXQoYXJncykpO1xuICAgIGFzeW5jRmx1c2ggPSBnZXRGbHVzaChjYWxsYmFja3MuYXN5bmMsIHRoaXMsIFt0eXBlXS5jb25jYXQoYXJncykpO1xuXG4gICAgaWYgKHN5bmNGbHVzaCgpKSB7XG4gICAgICBpbW1lZGlhdGUoYXN5bmNGbHVzaCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGdldEZsdXNoKGNhbGxiYWNrcywgY29udGV4dCwgYXJncykge1xuICByZXR1cm4gZmx1c2g7XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgdmFyIGNhbmNlbGxlZDtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyAhY2FuY2VsbGVkICYmIGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgLy8gb25seSBjYW5jZWwgaWYgdGhlIGNhbGxiYWNrIGV4cGxpY2l0bHkgcmV0dXJucyBmYWxzZVxuICAgICAgY2FuY2VsbGVkID0gY2FsbGJhY2tzW2ldLmFwcGx5KGNvbnRleHQsIGFyZ3MpID09PSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gIWNhbmNlbGxlZDtcbiAgfVxufVxuXG5mdW5jdGlvbiBiaW5kQ29udGV4dChmbiwgY29udGV4dCkge1xuICByZXR1cm4gZm4uYmluZCA/XG4gICAgZm4uYmluZChjb250ZXh0KSA6XG4gICAgZnVuY3Rpb24oKSB7IGZuLmFwcGx5KGNvbnRleHQsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7IH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB3cmFwcGVyOiAnPHNwYW4gY2xhc3M9XCIlUk9PVCVcIj48L3NwYW4+JyxcbiAgZHJvcGRvd246ICc8c3BhbiBjbGFzcz1cIiVQUkVGSVglJURST1BET1dOX01FTlUlXCI+PC9zcGFuPicsXG4gIGRhdGFzZXQ6ICc8ZGl2IGNsYXNzPVwiJVBSRUZJWCUlREFUQVNFVCUtJUNMQVNTJVwiPjwvZGl2PicsXG4gIHN1Z2dlc3Rpb25zOiAnPHNwYW4gY2xhc3M9XCIlUFJFRklYJSVTVUdHRVNUSU9OUyVcIj48L3NwYW4+JyxcbiAgc3VnZ2VzdGlvbjogJzxkaXYgY2xhc3M9XCIlUFJFRklYJSVTVUdHRVNUSU9OJVwiPjwvZGl2Pidcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzcGVjaWFsS2V5Q29kZU1hcDtcblxuc3BlY2lhbEtleUNvZGVNYXAgPSB7XG4gIDk6ICd0YWInLFxuICAyNzogJ2VzYycsXG4gIDM3OiAnbGVmdCcsXG4gIDM5OiAncmlnaHQnLFxuICAxMzogJ2VudGVyJyxcbiAgMzg6ICd1cCcsXG4gIDQwOiAnZG93bidcbn07XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzLmpzJyk7XG52YXIgRE9NID0gcmVxdWlyZSgnLi4vY29tbW9uL2RvbS5qcycpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJy4vZXZlbnRfZW1pdHRlci5qcycpO1xuXG4vLyBjb25zdHJ1Y3RvclxuLy8gLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gSW5wdXQobykge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBvbkJsdXI7XG4gIHZhciBvbkZvY3VzO1xuICB2YXIgb25LZXlkb3duO1xuICB2YXIgb25JbnB1dDtcblxuICBvID0gbyB8fCB7fTtcblxuICBpZiAoIW8uaW5wdXQpIHtcbiAgICBfLmVycm9yKCdpbnB1dCBpcyBtaXNzaW5nJyk7XG4gIH1cblxuICAvLyBib3VuZCBmdW5jdGlvbnNcbiAgb25CbHVyID0gXy5iaW5kKHRoaXMuX29uQmx1ciwgdGhpcyk7XG4gIG9uRm9jdXMgPSBfLmJpbmQodGhpcy5fb25Gb2N1cywgdGhpcyk7XG4gIG9uS2V5ZG93biA9IF8uYmluZCh0aGlzLl9vbktleWRvd24sIHRoaXMpO1xuICBvbklucHV0ID0gXy5iaW5kKHRoaXMuX29uSW5wdXQsIHRoaXMpO1xuXG4gIHRoaXMuJGhpbnQgPSBET00uZWxlbWVudChvLmhpbnQpO1xuICB0aGlzLiRpbnB1dCA9IERPTS5lbGVtZW50KG8uaW5wdXQpXG4gICAgLm9uKCdibHVyLmFhJywgb25CbHVyKVxuICAgIC5vbignZm9jdXMuYWEnLCBvbkZvY3VzKVxuICAgIC5vbigna2V5ZG93bi5hYScsIG9uS2V5ZG93bik7XG5cbiAgLy8gaWYgbm8gaGludCwgbm9vcCBhbGwgdGhlIGhpbnQgcmVsYXRlZCBmdW5jdGlvbnNcbiAgaWYgKHRoaXMuJGhpbnQubGVuZ3RoID09PSAwKSB7XG4gICAgdGhpcy5zZXRIaW50ID0gdGhpcy5nZXRIaW50ID0gdGhpcy5jbGVhckhpbnQgPSB0aGlzLmNsZWFySGludElmSW52YWxpZCA9IF8ubm9vcDtcbiAgfVxuXG4gIC8vIGllNyBhbmQgaWU4IGRvbid0IHN1cHBvcnQgdGhlIGlucHV0IGV2ZW50XG4gIC8vIGllOSBkb2Vzbid0IGZpcmUgdGhlIGlucHV0IGV2ZW50IHdoZW4gY2hhcmFjdGVycyBhcmUgcmVtb3ZlZFxuICAvLyBub3Qgc3VyZSBpZiBpZTEwIGlzIGNvbXBhdGlibGVcbiAgaWYgKCFfLmlzTXNpZSgpKSB7XG4gICAgdGhpcy4kaW5wdXQub24oJ2lucHV0LmFhJywgb25JbnB1dCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy4kaW5wdXQub24oJ2tleWRvd24uYWEga2V5cHJlc3MuYWEgY3V0LmFhIHBhc3RlLmFhJywgZnVuY3Rpb24oJGUpIHtcbiAgICAgIC8vIGlmIGEgc3BlY2lhbCBrZXkgdHJpZ2dlcmVkIHRoaXMsIGlnbm9yZSBpdFxuICAgICAgaWYgKHNwZWNpYWxLZXlDb2RlTWFwWyRlLndoaWNoIHx8ICRlLmtleUNvZGVdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gZ2l2ZSB0aGUgYnJvd3NlciBhIGNoYW5jZSB0byB1cGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dFxuICAgICAgLy8gYmVmb3JlIGNoZWNraW5nIHRvIHNlZSBpZiB0aGUgcXVlcnkgY2hhbmdlZFxuICAgICAgXy5kZWZlcihfLmJpbmQodGhhdC5fb25JbnB1dCwgdGhhdCwgJGUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHRoZSBxdWVyeSBkZWZhdWx0cyB0byB3aGF0ZXZlciB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGlzXG4gIC8vIG9uIGluaXRpYWxpemF0aW9uLCBpdCdsbCBtb3N0IGxpa2VseSBiZSBhbiBlbXB0eSBzdHJpbmdcbiAgdGhpcy5xdWVyeSA9IHRoaXMuJGlucHV0LnZhbCgpO1xuXG4gIC8vIGhlbHBzIHdpdGggY2FsY3VsYXRpbmcgdGhlIHdpZHRoIG9mIHRoZSBpbnB1dCdzIHZhbHVlXG4gIHRoaXMuJG92ZXJmbG93SGVscGVyID0gYnVpbGRPdmVyZmxvd0hlbHBlcih0aGlzLiRpbnB1dCk7XG59XG5cbi8vIHN0YXRpYyBtZXRob2RzXG4vLyAtLS0tLS0tLS0tLS0tLVxuXG5JbnB1dC5ub3JtYWxpemVRdWVyeSA9IGZ1bmN0aW9uKHN0cikge1xuICAvLyBzdHJpcHMgbGVhZGluZyB3aGl0ZXNwYWNlIGFuZCBjb25kZW5zZXMgYWxsIHdoaXRlc3BhY2VcbiAgcmV0dXJuIChzdHIgfHwgJycpLnJlcGxhY2UoL15cXHMqL2csICcnKS5yZXBsYWNlKC9cXHN7Mix9L2csICcgJyk7XG59O1xuXG4vLyBpbnN0YW5jZSBtZXRob2RzXG4vLyAtLS0tLS0tLS0tLS0tLS0tXG5cbl8ubWl4aW4oSW5wdXQucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIsIHtcblxuICAvLyAjIyMgcHJpdmF0ZVxuXG4gIF9vbkJsdXI6IGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICB0aGlzLnJlc2V0SW5wdXRWYWx1ZSgpO1xuICAgIHRoaXMuJGlucHV0LnJlbW92ZUF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIHRoaXMudHJpZ2dlcignYmx1cnJlZCcpO1xuICB9LFxuXG4gIF9vbkZvY3VzOiBmdW5jdGlvbiBvbkZvY3VzKCkge1xuICAgIHRoaXMudHJpZ2dlcignZm9jdXNlZCcpO1xuICB9LFxuXG4gIF9vbktleWRvd246IGZ1bmN0aW9uIG9uS2V5ZG93bigkZSkge1xuICAgIC8vIHdoaWNoIGlzIG5vcm1hbGl6ZWQgYW5kIGNvbnNpc3RlbnQgKGJ1dCBub3QgZm9yIGllKVxuICAgIHZhciBrZXlOYW1lID0gc3BlY2lhbEtleUNvZGVNYXBbJGUud2hpY2ggfHwgJGUua2V5Q29kZV07XG5cbiAgICB0aGlzLl9tYW5hZ2VQcmV2ZW50RGVmYXVsdChrZXlOYW1lLCAkZSk7XG4gICAgaWYgKGtleU5hbWUgJiYgdGhpcy5fc2hvdWxkVHJpZ2dlcihrZXlOYW1lLCAkZSkpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihrZXlOYW1lICsgJ0tleWVkJywgJGUpO1xuICAgIH1cbiAgfSxcblxuICBfb25JbnB1dDogZnVuY3Rpb24gb25JbnB1dCgpIHtcbiAgICB0aGlzLl9jaGVja0lucHV0VmFsdWUoKTtcbiAgfSxcblxuICBfbWFuYWdlUHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uIG1hbmFnZVByZXZlbnREZWZhdWx0KGtleU5hbWUsICRlKSB7XG4gICAgdmFyIHByZXZlbnREZWZhdWx0O1xuICAgIHZhciBoaW50VmFsdWU7XG4gICAgdmFyIGlucHV0VmFsdWU7XG5cbiAgICBzd2l0Y2ggKGtleU5hbWUpIHtcbiAgICBjYXNlICd0YWInOlxuICAgICAgaGludFZhbHVlID0gdGhpcy5nZXRIaW50KCk7XG4gICAgICBpbnB1dFZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlKCk7XG5cbiAgICAgIHByZXZlbnREZWZhdWx0ID0gaGludFZhbHVlICYmXG4gICAgICAgIGhpbnRWYWx1ZSAhPT0gaW5wdXRWYWx1ZSAmJlxuICAgICAgICAhd2l0aE1vZGlmaWVyKCRlKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAndXAnOlxuICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgcHJldmVudERlZmF1bHQgPSAhd2l0aE1vZGlmaWVyKCRlKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHByZXZlbnREZWZhdWx0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHByZXZlbnREZWZhdWx0KSB7XG4gICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSxcblxuICBfc2hvdWxkVHJpZ2dlcjogZnVuY3Rpb24gc2hvdWxkVHJpZ2dlcihrZXlOYW1lLCAkZSkge1xuICAgIHZhciB0cmlnZ2VyO1xuXG4gICAgc3dpdGNoIChrZXlOYW1lKSB7XG4gICAgY2FzZSAndGFiJzpcbiAgICAgIHRyaWdnZXIgPSAhd2l0aE1vZGlmaWVyKCRlKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRyaWdnZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiB0cmlnZ2VyO1xuICB9LFxuXG4gIF9jaGVja0lucHV0VmFsdWU6IGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcbiAgICB2YXIgaW5wdXRWYWx1ZTtcbiAgICB2YXIgYXJlRXF1aXZhbGVudDtcbiAgICB2YXIgaGFzRGlmZmVyZW50V2hpdGVzcGFjZTtcblxuICAgIGlucHV0VmFsdWUgPSB0aGlzLmdldElucHV0VmFsdWUoKTtcbiAgICBhcmVFcXVpdmFsZW50ID0gYXJlUXVlcmllc0VxdWl2YWxlbnQoaW5wdXRWYWx1ZSwgdGhpcy5xdWVyeSk7XG4gICAgaGFzRGlmZmVyZW50V2hpdGVzcGFjZSA9IGFyZUVxdWl2YWxlbnQgJiYgdGhpcy5xdWVyeSA/XG4gICAgICB0aGlzLnF1ZXJ5Lmxlbmd0aCAhPT0gaW5wdXRWYWx1ZS5sZW5ndGggOiBmYWxzZTtcblxuICAgIHRoaXMucXVlcnkgPSBpbnB1dFZhbHVlO1xuXG4gICAgaWYgKCFhcmVFcXVpdmFsZW50KSB7XG4gICAgICB0aGlzLnRyaWdnZXIoJ3F1ZXJ5Q2hhbmdlZCcsIHRoaXMucXVlcnkpO1xuICAgIH0gZWxzZSBpZiAoaGFzRGlmZmVyZW50V2hpdGVzcGFjZSkge1xuICAgICAgdGhpcy50cmlnZ2VyKCd3aGl0ZXNwYWNlQ2hhbmdlZCcsIHRoaXMucXVlcnkpO1xuICAgIH1cbiAgfSxcblxuICAvLyAjIyMgcHVibGljXG5cbiAgZm9jdXM6IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgIHRoaXMuJGlucHV0LmZvY3VzKCk7XG4gIH0sXG5cbiAgYmx1cjogZnVuY3Rpb24gYmx1cigpIHtcbiAgICB0aGlzLiRpbnB1dC5ibHVyKCk7XG4gIH0sXG5cbiAgZ2V0UXVlcnk6IGZ1bmN0aW9uIGdldFF1ZXJ5KCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5O1xuICB9LFxuXG4gIHNldFF1ZXJ5OiBmdW5jdGlvbiBzZXRRdWVyeShxdWVyeSkge1xuICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgfSxcblxuICBnZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiBnZXRJbnB1dFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLiRpbnB1dC52YWwoKTtcbiAgfSxcblxuICBzZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiBzZXRJbnB1dFZhbHVlKHZhbHVlLCBzaWxlbnQpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFsdWUgPSB0aGlzLnF1ZXJ5O1xuICAgIH1cbiAgICB0aGlzLiRpbnB1dC52YWwodmFsdWUpO1xuXG4gICAgLy8gc2lsZW50IHByZXZlbnRzIGFueSBhZGRpdGlvbmFsIGV2ZW50cyBmcm9tIGJlaW5nIHRyaWdnZXJlZFxuICAgIGlmIChzaWxlbnQpIHtcbiAgICAgIHRoaXMuY2xlYXJIaW50KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWx1ZSgpO1xuICAgIH1cbiAgfSxcblxuICBleHBhbmQ6IGZ1bmN0aW9uIGV4cGFuZCgpIHtcbiAgICB0aGlzLiRpbnB1dC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgfSxcblxuICBjb2xsYXBzZTogZnVuY3Rpb24gY29sbGFwc2UoKSB7XG4gICAgdGhpcy4kaW5wdXQuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICB9LFxuXG4gIHNldEFjdGl2ZURlc2NlbmRhbnQ6IGZ1bmN0aW9uIHNldEFjdGl2ZURlc2NlbmRhbnQoYWN0aXZlZGVzY2VuZGFudElkKSB7XG4gICAgdGhpcy4kaW5wdXQuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgYWN0aXZlZGVzY2VuZGFudElkKTtcbiAgfSxcblxuICByZW1vdmVBY3RpdmVEZXNjZW5kYW50OiBmdW5jdGlvbiByZW1vdmVBY3RpdmVEZXNjZW5kYW50KCkge1xuICAgIHRoaXMuJGlucHV0LnJlbW92ZUF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICB9LFxuXG4gIHJlc2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gcmVzZXRJbnB1dFZhbHVlKCkge1xuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnF1ZXJ5LCB0cnVlKTtcbiAgfSxcblxuICBnZXRIaW50OiBmdW5jdGlvbiBnZXRIaW50KCkge1xuICAgIHJldHVybiB0aGlzLiRoaW50LnZhbCgpO1xuICB9LFxuXG4gIHNldEhpbnQ6IGZ1bmN0aW9uIHNldEhpbnQodmFsdWUpIHtcbiAgICB0aGlzLiRoaW50LnZhbCh2YWx1ZSk7XG4gIH0sXG5cbiAgY2xlYXJIaW50OiBmdW5jdGlvbiBjbGVhckhpbnQoKSB7XG4gICAgdGhpcy5zZXRIaW50KCcnKTtcbiAgfSxcblxuICBjbGVhckhpbnRJZkludmFsaWQ6IGZ1bmN0aW9uIGNsZWFySGludElmSW52YWxpZCgpIHtcbiAgICB2YXIgdmFsO1xuICAgIHZhciBoaW50O1xuICAgIHZhciB2YWxJc1ByZWZpeE9mSGludDtcbiAgICB2YXIgaXNWYWxpZDtcblxuICAgIHZhbCA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgpO1xuICAgIGhpbnQgPSB0aGlzLmdldEhpbnQoKTtcbiAgICB2YWxJc1ByZWZpeE9mSGludCA9IHZhbCAhPT0gaGludCAmJiBoaW50LmluZGV4T2YodmFsKSA9PT0gMDtcbiAgICBpc1ZhbGlkID0gdmFsICE9PSAnJyAmJiB2YWxJc1ByZWZpeE9mSGludCAmJiAhdGhpcy5oYXNPdmVyZmxvdygpO1xuXG4gICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICB0aGlzLmNsZWFySGludCgpO1xuICAgIH1cbiAgfSxcblxuICBnZXRMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gZ2V0TGFuZ3VhZ2VEaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLiRpbnB1dC5jc3MoJ2RpcmVjdGlvbicpIHx8ICdsdHInKS50b0xvd2VyQ2FzZSgpO1xuICB9LFxuXG4gIGhhc092ZXJmbG93OiBmdW5jdGlvbiBoYXNPdmVyZmxvdygpIHtcbiAgICAvLyAyIGlzIGFyYml0cmFyeSwganVzdCBwaWNraW5nIGEgc21hbGwgbnVtYmVyIHRvIGhhbmRsZSBlZGdlIGNhc2VzXG4gICAgdmFyIGNvbnN0cmFpbnQgPSB0aGlzLiRpbnB1dC53aWR0aCgpIC0gMjtcblxuICAgIHRoaXMuJG92ZXJmbG93SGVscGVyLnRleHQodGhpcy5nZXRJbnB1dFZhbHVlKCkpO1xuXG4gICAgcmV0dXJuIHRoaXMuJG92ZXJmbG93SGVscGVyLndpZHRoKCkgPj0gY29uc3RyYWludDtcbiAgfSxcblxuICBpc0N1cnNvckF0RW5kOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsdWVMZW5ndGg7XG4gICAgdmFyIHNlbGVjdGlvblN0YXJ0O1xuICAgIHZhciByYW5nZTtcblxuICAgIHZhbHVlTGVuZ3RoID0gdGhpcy4kaW5wdXQudmFsKCkubGVuZ3RoO1xuICAgIHNlbGVjdGlvblN0YXJ0ID0gdGhpcy4kaW5wdXRbMF0uc2VsZWN0aW9uU3RhcnQ7XG5cbiAgICBpZiAoXy5pc051bWJlcihzZWxlY3Rpb25TdGFydCkpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb25TdGFydCA9PT0gdmFsdWVMZW5ndGg7XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24pIHtcbiAgICAgIC8vIE5PVEU6IHRoaXMgd29uJ3Qgd29yayB1bmxlc3MgdGhlIGlucHV0IGhhcyBmb2N1cywgdGhlIGdvb2QgbmV3c1xuICAgICAgLy8gaXMgdGhpcyBjb2RlIHNob3VsZCBvbmx5IGdldCBjYWxsZWQgd2hlbiB0aGUgaW5wdXQgaGFzIGZvY3VzXG4gICAgICByYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtdmFsdWVMZW5ndGgpO1xuXG4gICAgICByZXR1cm4gdmFsdWVMZW5ndGggPT09IHJhbmdlLnRleHQubGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdGhpcy4kaGludC5vZmYoJy5hYScpO1xuICAgIHRoaXMuJGlucHV0Lm9mZignLmFhJyk7XG5cbiAgICB0aGlzLiRoaW50ID0gdGhpcy4kaW5wdXQgPSB0aGlzLiRvdmVyZmxvd0hlbHBlciA9IG51bGw7XG4gIH1cbn0pO1xuXG4vLyBoZWxwZXIgZnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGJ1aWxkT3ZlcmZsb3dIZWxwZXIoJGlucHV0KSB7XG4gIHJldHVybiBET00uZWxlbWVudCgnPHByZSBhcmlhLWhpZGRlbj1cInRydWVcIj48L3ByZT4nKVxuICAgIC5jc3Moe1xuICAgICAgLy8gcG9zaXRpb24gaGVscGVyIG9mZi1zY3JlZW5cbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgICAvLyBhdm9pZCBsaW5lIGJyZWFrcyBhbmQgd2hpdGVzcGFjZSBjb2xsYXBzaW5nXG4gICAgICB3aGl0ZVNwYWNlOiAncHJlJyxcbiAgICAgIC8vIHVzZSBzYW1lIGZvbnQgY3NzIGFzIGlucHV0IHRvIGNhbGN1bGF0ZSBhY2N1cmF0ZSB3aWR0aFxuICAgICAgZm9udEZhbWlseTogJGlucHV0LmNzcygnZm9udC1mYW1pbHknKSxcbiAgICAgIGZvbnRTaXplOiAkaW5wdXQuY3NzKCdmb250LXNpemUnKSxcbiAgICAgIGZvbnRTdHlsZTogJGlucHV0LmNzcygnZm9udC1zdHlsZScpLFxuICAgICAgZm9udFZhcmlhbnQ6ICRpbnB1dC5jc3MoJ2ZvbnQtdmFyaWFudCcpLFxuICAgICAgZm9udFdlaWdodDogJGlucHV0LmNzcygnZm9udC13ZWlnaHQnKSxcbiAgICAgIHdvcmRTcGFjaW5nOiAkaW5wdXQuY3NzKCd3b3JkLXNwYWNpbmcnKSxcbiAgICAgIGxldHRlclNwYWNpbmc6ICRpbnB1dC5jc3MoJ2xldHRlci1zcGFjaW5nJyksXG4gICAgICB0ZXh0SW5kZW50OiAkaW5wdXQuY3NzKCd0ZXh0LWluZGVudCcpLFxuICAgICAgdGV4dFJlbmRlcmluZzogJGlucHV0LmNzcygndGV4dC1yZW5kZXJpbmcnKSxcbiAgICAgIHRleHRUcmFuc2Zvcm06ICRpbnB1dC5jc3MoJ3RleHQtdHJhbnNmb3JtJylcbiAgICB9KVxuICAgIC5pbnNlcnRBZnRlcigkaW5wdXQpO1xufVxuXG5mdW5jdGlvbiBhcmVRdWVyaWVzRXF1aXZhbGVudChhLCBiKSB7XG4gIHJldHVybiBJbnB1dC5ub3JtYWxpemVRdWVyeShhKSA9PT0gSW5wdXQubm9ybWFsaXplUXVlcnkoYik7XG59XG5cbmZ1bmN0aW9uIHdpdGhNb2RpZmllcigkZSkge1xuICByZXR1cm4gJGUuYWx0S2V5IHx8ICRlLmN0cmxLZXkgfHwgJGUubWV0YUtleSB8fCAkZS5zaGlmdEtleTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGF0dHJzS2V5ID0gJ2FhQXR0cnMnO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscy5qcycpO1xudmFyIERPTSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9kb20uanMnKTtcbnZhciBFdmVudEJ1cyA9IHJlcXVpcmUoJy4vZXZlbnRfYnVzLmpzJyk7XG52YXIgSW5wdXQgPSByZXF1aXJlKCcuL2lucHV0LmpzJyk7XG52YXIgRHJvcGRvd24gPSByZXF1aXJlKCcuL2Ryb3Bkb3duLmpzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbC5qcycpO1xudmFyIGNzcyA9IHJlcXVpcmUoJy4vY3NzLmpzJyk7XG5cbi8vIGNvbnN0cnVjdG9yXG4vLyAtLS0tLS0tLS0tLVxuXG4vLyBUSE9VR0hUOiB3aGF0IGlmIGRhdGFzZXRzIGNvdWxkIGR5bmFtaWNhbGx5IGJlIGFkZGVkL3JlbW92ZWQ/XG5mdW5jdGlvbiBUeXBlYWhlYWQobykge1xuICB2YXIgJG1lbnU7XG4gIHZhciAkaGludDtcblxuICBvID0gbyB8fCB7fTtcblxuICBpZiAoIW8uaW5wdXQpIHtcbiAgICBfLmVycm9yKCdtaXNzaW5nIGlucHV0Jyk7XG4gIH1cblxuICB0aGlzLmlzQWN0aXZhdGVkID0gZmFsc2U7XG4gIHRoaXMuZGVidWcgPSAhIW8uZGVidWc7XG4gIHRoaXMuYXV0b3NlbGVjdCA9ICEhby5hdXRvc2VsZWN0O1xuICB0aGlzLmF1dG9zZWxlY3RPbkJsdXIgPSAhIW8uYXV0b3NlbGVjdE9uQmx1cjtcbiAgdGhpcy5vcGVuT25Gb2N1cyA9ICEhby5vcGVuT25Gb2N1cztcbiAgdGhpcy5taW5MZW5ndGggPSBfLmlzTnVtYmVyKG8ubWluTGVuZ3RoKSA/IG8ubWluTGVuZ3RoIDogMTtcbiAgdGhpcy5hdXRvV2lkdGggPSAoby5hdXRvV2lkdGggPT09IHVuZGVmaW5lZCkgPyB0cnVlIDogISFvLmF1dG9XaWR0aDtcbiAgdGhpcy5jbGVhck9uU2VsZWN0ZWQgPSAhIW8uY2xlYXJPblNlbGVjdGVkO1xuICB0aGlzLnRhYkF1dG9jb21wbGV0ZSA9IChvLnRhYkF1dG9jb21wbGV0ZSA9PT0gdW5kZWZpbmVkKSA/IHRydWUgOiAhIW8udGFiQXV0b2NvbXBsZXRlO1xuXG4gIG8uaGludCA9ICEhby5oaW50O1xuXG4gIGlmIChvLmhpbnQgJiYgby5hcHBlbmRUbykge1xuICAgIHRocm93IG5ldyBFcnJvcignW2F1dG9jb21wbGV0ZS5qc10gaGludCBhbmQgYXBwZW5kVG8gb3B0aW9ucyBjYW5cXCd0IGJlIHVzZWQgYXQgdGhlIHNhbWUgdGltZScpO1xuICB9XG5cbiAgdGhpcy5jc3MgPSBvLmNzcyA9IF8ubWl4aW4oe30sIGNzcywgby5hcHBlbmRUbyA/IGNzcy5hcHBlbmRUbyA6IHt9KTtcbiAgdGhpcy5jc3NDbGFzc2VzID0gby5jc3NDbGFzc2VzID0gXy5taXhpbih7fSwgY3NzLmRlZmF1bHRDbGFzc2VzLCBvLmNzc0NsYXNzZXMgfHwge30pO1xuICB0aGlzLmNzc0NsYXNzZXMucHJlZml4ID1cbiAgICBvLmNzc0NsYXNzZXMuZm9ybWF0dGVkUHJlZml4ID0gXy5mb3JtYXRQcmVmaXgodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLm5vUHJlZml4KTtcbiAgdGhpcy5saXN0Ym94SWQgPSBvLmxpc3Rib3hJZCA9IFt0aGlzLmNzc0NsYXNzZXMucm9vdCwgJ2xpc3Rib3gnLCBfLmdldFVuaXF1ZUlkKCldLmpvaW4oJy0nKTtcblxuICB2YXIgZG9tRWx0cyA9IGJ1aWxkRG9tKG8pO1xuXG4gIHRoaXMuJG5vZGUgPSBkb21FbHRzLndyYXBwZXI7XG4gIHZhciAkaW5wdXQgPSB0aGlzLiRpbnB1dCA9IGRvbUVsdHMuaW5wdXQ7XG4gICRtZW51ID0gZG9tRWx0cy5tZW51O1xuICAkaGludCA9IGRvbUVsdHMuaGludDtcblxuICBpZiAoby5kcm9wZG93bk1lbnVDb250YWluZXIpIHtcbiAgICBET00uZWxlbWVudChvLmRyb3Bkb3duTWVudUNvbnRhaW5lcilcbiAgICAgIC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJykgLy8gZW5zdXJlIHRoZSBjb250YWluZXIgaGFzIGEgcmVsYXRpdmUgcG9zaXRpb25cbiAgICAgIC5hcHBlbmQoJG1lbnUuY3NzKCd0b3AnLCAnMCcpKTsgLy8gb3ZlcnJpZGUgdGhlIHRvcDogMTAwJVxuICB9XG5cbiAgLy8gIzcwNTogaWYgdGhlcmUncyBzY3JvbGxhYmxlIG92ZXJmbG93LCBpZSBkb2Vzbid0IHN1cHBvcnRcbiAgLy8gYmx1ciBjYW5jZWxsYXRpb25zIHdoZW4gdGhlIHNjcm9sbGJhciBpcyBjbGlja2VkXG4gIC8vXG4gIC8vICMzNTE6IHByZXZlbnREZWZhdWx0IHdvbid0IGNhbmNlbCBibHVycyBpbiBpZSA8PSA4XG4gICRpbnB1dC5vbignYmx1ci5hYScsIGZ1bmN0aW9uKCRlKSB7XG4gICAgdmFyIGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKF8uaXNNc2llKCkgJiYgKCRtZW51WzBdID09PSBhY3RpdmUgfHwgJG1lbnVbMF0uY29udGFpbnMoYWN0aXZlKSkpIHtcbiAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBzdG9wIGltbWVkaWF0ZSBpbiBvcmRlciB0byBwcmV2ZW50IElucHV0I19vbkJsdXIgZnJvbVxuICAgICAgLy8gZ2V0dGluZyBleGVjdHVlZFxuICAgICAgJGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBfLmRlZmVyKGZ1bmN0aW9uKCkgeyAkaW5wdXQuZm9jdXMoKTsgfSk7XG4gICAgfVxuICB9KTtcblxuICAvLyAjMzUxOiBwcmV2ZW50cyBpbnB1dCBibHVyIGR1ZSB0byBjbGlja3Mgd2l0aGluIGRyb3Bkb3duIG1lbnVcbiAgJG1lbnUub24oJ21vdXNlZG93bi5hYScsIGZ1bmN0aW9uKCRlKSB7ICRlLnByZXZlbnREZWZhdWx0KCk7IH0pO1xuXG4gIHRoaXMuZXZlbnRCdXMgPSBvLmV2ZW50QnVzIHx8IG5ldyBFdmVudEJ1cyh7ZWw6ICRpbnB1dH0pO1xuXG4gIHRoaXMuZHJvcGRvd24gPSBuZXcgVHlwZWFoZWFkLkRyb3Bkb3duKHtcbiAgICBhcHBlbmRUbzogby5hcHBlbmRUbyxcbiAgICB3cmFwcGVyOiB0aGlzLiRub2RlLFxuICAgIG1lbnU6ICRtZW51LFxuICAgIGRhdGFzZXRzOiBvLmRhdGFzZXRzLFxuICAgIHRlbXBsYXRlczogby50ZW1wbGF0ZXMsXG4gICAgY3NzQ2xhc3Nlczogby5jc3NDbGFzc2VzLFxuICAgIG1pbkxlbmd0aDogdGhpcy5taW5MZW5ndGhcbiAgfSlcbiAgICAub25TeW5jKCdzdWdnZXN0aW9uQ2xpY2tlZCcsIHRoaXMuX29uU3VnZ2VzdGlvbkNsaWNrZWQsIHRoaXMpXG4gICAgLm9uU3luYygnY3Vyc29yTW92ZWQnLCB0aGlzLl9vbkN1cnNvck1vdmVkLCB0aGlzKVxuICAgIC5vblN5bmMoJ2N1cnNvclJlbW92ZWQnLCB0aGlzLl9vbkN1cnNvclJlbW92ZWQsIHRoaXMpXG4gICAgLm9uU3luYygnb3BlbmVkJywgdGhpcy5fb25PcGVuZWQsIHRoaXMpXG4gICAgLm9uU3luYygnY2xvc2VkJywgdGhpcy5fb25DbG9zZWQsIHRoaXMpXG4gICAgLm9uU3luYygnc2hvd24nLCB0aGlzLl9vblNob3duLCB0aGlzKVxuICAgIC5vblN5bmMoJ2VtcHR5JywgdGhpcy5fb25FbXB0eSwgdGhpcylcbiAgICAub25TeW5jKCdyZWRyYXduJywgdGhpcy5fb25SZWRyYXduLCB0aGlzKVxuICAgIC5vbkFzeW5jKCdkYXRhc2V0UmVuZGVyZWQnLCB0aGlzLl9vbkRhdGFzZXRSZW5kZXJlZCwgdGhpcyk7XG5cbiAgdGhpcy5pbnB1dCA9IG5ldyBUeXBlYWhlYWQuSW5wdXQoe2lucHV0OiAkaW5wdXQsIGhpbnQ6ICRoaW50fSlcbiAgICAub25TeW5jKCdmb2N1c2VkJywgdGhpcy5fb25Gb2N1c2VkLCB0aGlzKVxuICAgIC5vblN5bmMoJ2JsdXJyZWQnLCB0aGlzLl9vbkJsdXJyZWQsIHRoaXMpXG4gICAgLm9uU3luYygnZW50ZXJLZXllZCcsIHRoaXMuX29uRW50ZXJLZXllZCwgdGhpcylcbiAgICAub25TeW5jKCd0YWJLZXllZCcsIHRoaXMuX29uVGFiS2V5ZWQsIHRoaXMpXG4gICAgLm9uU3luYygnZXNjS2V5ZWQnLCB0aGlzLl9vbkVzY0tleWVkLCB0aGlzKVxuICAgIC5vblN5bmMoJ3VwS2V5ZWQnLCB0aGlzLl9vblVwS2V5ZWQsIHRoaXMpXG4gICAgLm9uU3luYygnZG93bktleWVkJywgdGhpcy5fb25Eb3duS2V5ZWQsIHRoaXMpXG4gICAgLm9uU3luYygnbGVmdEtleWVkJywgdGhpcy5fb25MZWZ0S2V5ZWQsIHRoaXMpXG4gICAgLm9uU3luYygncmlnaHRLZXllZCcsIHRoaXMuX29uUmlnaHRLZXllZCwgdGhpcylcbiAgICAub25TeW5jKCdxdWVyeUNoYW5nZWQnLCB0aGlzLl9vblF1ZXJ5Q2hhbmdlZCwgdGhpcylcbiAgICAub25TeW5jKCd3aGl0ZXNwYWNlQ2hhbmdlZCcsIHRoaXMuX29uV2hpdGVzcGFjZUNoYW5nZWQsIHRoaXMpO1xuXG4gIHRoaXMuX2JpbmRLZXlib2FyZFNob3J0Y3V0cyhvKTtcblxuICB0aGlzLl9zZXRMYW5ndWFnZURpcmVjdGlvbigpO1xufVxuXG4vLyBpbnN0YW5jZSBtZXRob2RzXG4vLyAtLS0tLS0tLS0tLS0tLS0tXG5cbl8ubWl4aW4oVHlwZWFoZWFkLnByb3RvdHlwZSwge1xuICAvLyAjIyMgcHJpdmF0ZVxuXG4gIF9iaW5kS2V5Ym9hcmRTaG9ydGN1dHM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMua2V5Ym9hcmRTaG9ydGN1dHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyICRpbnB1dCA9IHRoaXMuJGlucHV0O1xuICAgIHZhciBrZXlib2FyZFNob3J0Y3V0cyA9IFtdO1xuICAgIF8uZWFjaChvcHRpb25zLmtleWJvYXJkU2hvcnRjdXRzLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgICBrZXkgPSBrZXkudG9VcHBlckNhc2UoKS5jaGFyQ29kZUF0KDApO1xuICAgICAgfVxuICAgICAga2V5Ym9hcmRTaG9ydGN1dHMucHVzaChrZXkpO1xuICAgIH0pO1xuICAgIERPTS5lbGVtZW50KGRvY3VtZW50KS5rZXlkb3duKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB2YXIgZWx0ID0gKGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50KTtcbiAgICAgIHZhciB0YWdOYW1lID0gZWx0LnRhZ05hbWU7XG4gICAgICBpZiAoZWx0LmlzQ29udGVudEVkaXRhYmxlIHx8IHRhZ05hbWUgPT09ICdJTlBVVCcgfHwgdGFnTmFtZSA9PT0gJ1NFTEVDVCcgfHwgdGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAvLyBhbHJlYWR5IGluIGFuIGlucHV0XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHdoaWNoID0gZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZTtcbiAgICAgIGlmIChrZXlib2FyZFNob3J0Y3V0cy5pbmRleE9mKHdoaWNoKSA9PT0gLTEpIHtcbiAgICAgICAgLy8gbm90IHRoZSByaWdodCBzaG9ydGN1dFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICRpbnB1dC5mb2N1cygpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICB9LFxuXG4gIF9vblN1Z2dlc3Rpb25DbGlja2VkOiBmdW5jdGlvbiBvblN1Z2dlc3Rpb25DbGlja2VkKHR5cGUsICRlbCkge1xuICAgIHZhciBkYXR1bTtcbiAgICB2YXIgY29udGV4dCA9IHtzZWxlY3Rpb25NZXRob2Q6ICdjbGljayd9O1xuXG4gICAgaWYgKGRhdHVtID0gdGhpcy5kcm9wZG93bi5nZXREYXR1bUZvclN1Z2dlc3Rpb24oJGVsKSkge1xuICAgICAgdGhpcy5fc2VsZWN0KGRhdHVtLCBjb250ZXh0KTtcbiAgICB9XG4gIH0sXG5cbiAgX29uQ3Vyc29yTW92ZWQ6IGZ1bmN0aW9uIG9uQ3Vyc29yTW92ZWQoZXZlbnQsIHVwZGF0ZUlucHV0KSB7XG4gICAgdmFyIGRhdHVtID0gdGhpcy5kcm9wZG93bi5nZXREYXR1bUZvckN1cnNvcigpO1xuICAgIHZhciBjdXJyZW50Q3Vyc29ySWQgPSB0aGlzLmRyb3Bkb3duLmdldEN1cnJlbnRDdXJzb3IoKS5hdHRyKCdpZCcpO1xuICAgIHRoaXMuaW5wdXQuc2V0QWN0aXZlRGVzY2VuZGFudChjdXJyZW50Q3Vyc29ySWQpO1xuXG4gICAgaWYgKGRhdHVtKSB7XG4gICAgICBpZiAodXBkYXRlSW5wdXQpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5zZXRJbnB1dFZhbHVlKGRhdHVtLnZhbHVlLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdjdXJzb3JjaGFuZ2VkJywgZGF0dW0ucmF3LCBkYXR1bS5kYXRhc2V0TmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIF9vbkN1cnNvclJlbW92ZWQ6IGZ1bmN0aW9uIG9uQ3Vyc29yUmVtb3ZlZCgpIHtcbiAgICB0aGlzLmlucHV0LnJlc2V0SW5wdXRWYWx1ZSgpO1xuICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ2N1cnNvcnJlbW92ZWQnKTtcbiAgfSxcblxuICBfb25EYXRhc2V0UmVuZGVyZWQ6IGZ1bmN0aW9uIG9uRGF0YXNldFJlbmRlcmVkKCkge1xuICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcblxuICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcigndXBkYXRlZCcpO1xuICB9LFxuXG4gIF9vbk9wZW5lZDogZnVuY3Rpb24gb25PcGVuZWQoKSB7XG4gICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgIHRoaXMuaW5wdXQuZXhwYW5kKCk7XG5cbiAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ29wZW5lZCcpO1xuICB9LFxuXG4gIF9vbkVtcHR5OiBmdW5jdGlvbiBvbkVtcHR5KCkge1xuICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignZW1wdHknKTtcbiAgfSxcblxuICBfb25SZWRyYXduOiBmdW5jdGlvbiBvblJlZHJhd24oKSB7XG4gICAgdGhpcy4kbm9kZS5jc3MoJ3RvcCcsIDAgKyAncHgnKTtcbiAgICB0aGlzLiRub2RlLmNzcygnbGVmdCcsIDAgKyAncHgnKTtcblxuICAgIHZhciBpbnB1dFJlY3QgPSB0aGlzLiRpbnB1dFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmICh0aGlzLmF1dG9XaWR0aCkge1xuICAgICAgdGhpcy4kbm9kZS5jc3MoJ3dpZHRoJywgaW5wdXRSZWN0LndpZHRoICsgJ3B4Jyk7XG4gICAgfVxuXG4gICAgdmFyIHdyYXBwZXJSZWN0ID0gdGhpcy4kbm9kZVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHZhciB0b3AgPSBpbnB1dFJlY3QuYm90dG9tIC0gd3JhcHBlclJlY3QudG9wO1xuICAgIHRoaXMuJG5vZGUuY3NzKCd0b3AnLCB0b3AgKyAncHgnKTtcbiAgICB2YXIgbGVmdCA9IGlucHV0UmVjdC5sZWZ0IC0gd3JhcHBlclJlY3QubGVmdDtcbiAgICB0aGlzLiRub2RlLmNzcygnbGVmdCcsIGxlZnQgKyAncHgnKTtcblxuICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcigncmVkcmF3bicpO1xuICB9LFxuXG4gIF9vblNob3duOiBmdW5jdGlvbiBvblNob3duKCkge1xuICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignc2hvd24nKTtcbiAgICBpZiAodGhpcy5hdXRvc2VsZWN0KSB7XG4gICAgICB0aGlzLmRyb3Bkb3duLmN1cnNvclRvcFN1Z2dlc3Rpb24oKTtcbiAgICB9XG4gIH0sXG5cbiAgX29uQ2xvc2VkOiBmdW5jdGlvbiBvbkNsb3NlZCgpIHtcbiAgICB0aGlzLmlucHV0LmNsZWFySGludCgpO1xuICAgIHRoaXMuaW5wdXQucmVtb3ZlQWN0aXZlRGVzY2VuZGFudCgpO1xuICAgIHRoaXMuaW5wdXQuY29sbGFwc2UoKTtcblxuICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignY2xvc2VkJyk7XG4gIH0sXG5cbiAgX29uRm9jdXNlZDogZnVuY3Rpb24gb25Gb2N1c2VkKCkge1xuICAgIHRoaXMuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMub3Blbk9uRm9jdXMpIHtcbiAgICAgIHZhciBxdWVyeSA9IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcbiAgICAgIGlmIChxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bi51cGRhdGUocXVlcnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5lbXB0eSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyb3Bkb3duLm9wZW4oKTtcbiAgICB9XG4gIH0sXG5cbiAgX29uQmx1cnJlZDogZnVuY3Rpb24gb25CbHVycmVkKCkge1xuICAgIHZhciBjdXJzb3JEYXR1bTtcbiAgICB2YXIgdG9wU3VnZ2VzdGlvbkRhdHVtO1xuXG4gICAgY3Vyc29yRGF0dW0gPSB0aGlzLmRyb3Bkb3duLmdldERhdHVtRm9yQ3Vyc29yKCk7XG4gICAgdG9wU3VnZ2VzdGlvbkRhdHVtID0gdGhpcy5kcm9wZG93bi5nZXREYXR1bUZvclRvcFN1Z2dlc3Rpb24oKTtcbiAgICB2YXIgY29udGV4dCA9IHtzZWxlY3Rpb25NZXRob2Q6ICdibHVyJ307XG5cbiAgICBpZiAoIXRoaXMuZGVidWcpIHtcbiAgICAgIGlmICh0aGlzLmF1dG9zZWxlY3RPbkJsdXIgJiYgY3Vyc29yRGF0dW0pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0KGN1cnNvckRhdHVtLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvc2VsZWN0T25CbHVyICYmIHRvcFN1Z2dlc3Rpb25EYXR1bSkge1xuICAgICAgICB0aGlzLl9zZWxlY3QodG9wU3VnZ2VzdGlvbkRhdHVtLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5lbXB0eSgpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9vbkVudGVyS2V5ZWQ6IGZ1bmN0aW9uIG9uRW50ZXJLZXllZCh0eXBlLCAkZSkge1xuICAgIHZhciBjdXJzb3JEYXR1bTtcbiAgICB2YXIgdG9wU3VnZ2VzdGlvbkRhdHVtO1xuXG4gICAgY3Vyc29yRGF0dW0gPSB0aGlzLmRyb3Bkb3duLmdldERhdHVtRm9yQ3Vyc29yKCk7XG4gICAgdG9wU3VnZ2VzdGlvbkRhdHVtID0gdGhpcy5kcm9wZG93bi5nZXREYXR1bUZvclRvcFN1Z2dlc3Rpb24oKTtcbiAgICB2YXIgY29udGV4dCA9IHtzZWxlY3Rpb25NZXRob2Q6ICdlbnRlcktleSd9O1xuXG4gICAgaWYgKGN1cnNvckRhdHVtKSB7XG4gICAgICB0aGlzLl9zZWxlY3QoY3Vyc29yRGF0dW0sIGNvbnRleHQpO1xuICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b3NlbGVjdCAmJiB0b3BTdWdnZXN0aW9uRGF0dW0pIHtcbiAgICAgIHRoaXMuX3NlbGVjdCh0b3BTdWdnZXN0aW9uRGF0dW0sIGNvbnRleHQpO1xuICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0sXG5cbiAgX29uVGFiS2V5ZWQ6IGZ1bmN0aW9uIG9uVGFiS2V5ZWQodHlwZSwgJGUpIHtcbiAgICBpZiAoIXRoaXMudGFiQXV0b2NvbXBsZXRlKSB7XG4gICAgICAvLyBDbG9zaW5nIHRoZSBkcm9wZG93biBlbmFibGVzIGZ1cnRoZXIgdGFiYmluZ1xuICAgICAgdGhpcy5kcm9wZG93bi5jbG9zZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBkYXR1bTtcbiAgICB2YXIgY29udGV4dCA9IHtzZWxlY3Rpb25NZXRob2Q6ICd0YWJLZXknfTtcblxuICAgIGlmIChkYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JDdXJzb3IoKSkge1xuICAgICAgdGhpcy5fc2VsZWN0KGRhdHVtLCBjb250ZXh0KTtcbiAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2F1dG9jb21wbGV0ZSh0cnVlKTtcbiAgICB9XG4gIH0sXG5cbiAgX29uRXNjS2V5ZWQ6IGZ1bmN0aW9uIG9uRXNjS2V5ZWQoKSB7XG4gICAgdGhpcy5kcm9wZG93bi5jbG9zZSgpO1xuICAgIHRoaXMuaW5wdXQucmVzZXRJbnB1dFZhbHVlKCk7XG4gIH0sXG5cbiAgX29uVXBLZXllZDogZnVuY3Rpb24gb25VcEtleWVkKCkge1xuICAgIHZhciBxdWVyeSA9IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcblxuICAgIGlmICh0aGlzLmRyb3Bkb3duLmlzRW1wdHkgJiYgcXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShxdWVyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcGRvd24ubW92ZUN1cnNvclVwKCk7XG4gICAgfVxuXG4gICAgdGhpcy5kcm9wZG93bi5vcGVuKCk7XG4gIH0sXG5cbiAgX29uRG93bktleWVkOiBmdW5jdGlvbiBvbkRvd25LZXllZCgpIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG5cbiAgICBpZiAodGhpcy5kcm9wZG93bi5pc0VtcHR5ICYmIHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgdGhpcy5kcm9wZG93bi51cGRhdGUocXVlcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyb3Bkb3duLm1vdmVDdXJzb3JEb3duKCk7XG4gICAgfVxuXG4gICAgdGhpcy5kcm9wZG93bi5vcGVuKCk7XG4gIH0sXG5cbiAgX29uTGVmdEtleWVkOiBmdW5jdGlvbiBvbkxlZnRLZXllZCgpIHtcbiAgICBpZiAodGhpcy5kaXIgPT09ICdydGwnKSB7XG4gICAgICB0aGlzLl9hdXRvY29tcGxldGUoKTtcbiAgICB9XG4gIH0sXG5cbiAgX29uUmlnaHRLZXllZDogZnVuY3Rpb24gb25SaWdodEtleWVkKCkge1xuICAgIGlmICh0aGlzLmRpciA9PT0gJ2x0cicpIHtcbiAgICAgIHRoaXMuX2F1dG9jb21wbGV0ZSgpO1xuICAgIH1cbiAgfSxcblxuICBfb25RdWVyeUNoYW5nZWQ6IGZ1bmN0aW9uIG9uUXVlcnlDaGFuZ2VkKGUsIHF1ZXJ5KSB7XG4gICAgdGhpcy5pbnB1dC5jbGVhckhpbnRJZkludmFsaWQoKTtcblxuICAgIGlmIChxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgIHRoaXMuZHJvcGRvd24udXBkYXRlKHF1ZXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wZG93bi5lbXB0eSgpO1xuICAgIH1cblxuICAgIHRoaXMuZHJvcGRvd24ub3BlbigpO1xuICAgIHRoaXMuX3NldExhbmd1YWdlRGlyZWN0aW9uKCk7XG4gIH0sXG5cbiAgX29uV2hpdGVzcGFjZUNoYW5nZWQ6IGZ1bmN0aW9uIG9uV2hpdGVzcGFjZUNoYW5nZWQoKSB7XG4gICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgIHRoaXMuZHJvcGRvd24ub3BlbigpO1xuICB9LFxuXG4gIF9zZXRMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oKSB7XG4gICAgdmFyIGRpciA9IHRoaXMuaW5wdXQuZ2V0TGFuZ3VhZ2VEaXJlY3Rpb24oKTtcblxuICAgIGlmICh0aGlzLmRpciAhPT0gZGlyKSB7XG4gICAgICB0aGlzLmRpciA9IGRpcjtcbiAgICAgIHRoaXMuJG5vZGUuY3NzKCdkaXJlY3Rpb24nLCBkaXIpO1xuICAgICAgdGhpcy5kcm9wZG93bi5zZXRMYW5ndWFnZURpcmVjdGlvbihkaXIpO1xuICAgIH1cbiAgfSxcblxuICBfdXBkYXRlSGludDogZnVuY3Rpb24gdXBkYXRlSGludCgpIHtcbiAgICB2YXIgZGF0dW07XG4gICAgdmFyIHZhbDtcbiAgICB2YXIgcXVlcnk7XG4gICAgdmFyIGVzY2FwZWRRdWVyeTtcbiAgICB2YXIgZnJvbnRNYXRjaFJlZ0V4O1xuICAgIHZhciBtYXRjaDtcblxuICAgIGRhdHVtID0gdGhpcy5kcm9wZG93bi5nZXREYXR1bUZvclRvcFN1Z2dlc3Rpb24oKTtcblxuICAgIGlmIChkYXR1bSAmJiB0aGlzLmRyb3Bkb3duLmlzVmlzaWJsZSgpICYmICF0aGlzLmlucHV0Lmhhc092ZXJmbG93KCkpIHtcbiAgICAgIHZhbCA9IHRoaXMuaW5wdXQuZ2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgcXVlcnkgPSBJbnB1dC5ub3JtYWxpemVRdWVyeSh2YWwpO1xuICAgICAgZXNjYXBlZFF1ZXJ5ID0gXy5lc2NhcGVSZWdFeENoYXJzKHF1ZXJ5KTtcblxuICAgICAgLy8gbWF0Y2ggaW5wdXQgdmFsdWUsIHRoZW4gY2FwdHVyZSB0cmFpbGluZyB0ZXh0XG4gICAgICBmcm9udE1hdGNoUmVnRXggPSBuZXcgUmVnRXhwKCdeKD86JyArIGVzY2FwZWRRdWVyeSArICcpKC4rJCknLCAnaScpO1xuICAgICAgbWF0Y2ggPSBmcm9udE1hdGNoUmVnRXguZXhlYyhkYXR1bS52YWx1ZSk7XG5cbiAgICAgIC8vIGNsZWFyIGhpbnQgaWYgdGhlcmUncyBubyB0cmFpbGluZyB0ZXh0XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5zZXRIaW50KHZhbCArIG1hdGNoWzFdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5wdXQuY2xlYXJIaW50KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5wdXQuY2xlYXJIaW50KCk7XG4gICAgfVxuICB9LFxuXG4gIF9hdXRvY29tcGxldGU6IGZ1bmN0aW9uIGF1dG9jb21wbGV0ZShsYXhDdXJzb3IpIHtcbiAgICB2YXIgaGludDtcbiAgICB2YXIgcXVlcnk7XG4gICAgdmFyIGlzQ3Vyc29yQXRFbmQ7XG4gICAgdmFyIGRhdHVtO1xuXG4gICAgaGludCA9IHRoaXMuaW5wdXQuZ2V0SGludCgpO1xuICAgIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuICAgIGlzQ3Vyc29yQXRFbmQgPSBsYXhDdXJzb3IgfHwgdGhpcy5pbnB1dC5pc0N1cnNvckF0RW5kKCk7XG5cbiAgICBpZiAoaGludCAmJiBxdWVyeSAhPT0gaGludCAmJiBpc0N1cnNvckF0RW5kKSB7XG4gICAgICBkYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JUb3BTdWdnZXN0aW9uKCk7XG4gICAgICBpZiAoZGF0dW0pIHtcbiAgICAgICAgdGhpcy5pbnB1dC5zZXRJbnB1dFZhbHVlKGRhdHVtLnZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdhdXRvY29tcGxldGVkJywgZGF0dW0ucmF3LCBkYXR1bS5kYXRhc2V0TmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIF9zZWxlY3Q6IGZ1bmN0aW9uIHNlbGVjdChkYXR1bSwgY29udGV4dCkge1xuICAgIGlmICh0eXBlb2YgZGF0dW0udmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmlucHV0LnNldFF1ZXJ5KGRhdHVtLnZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2xlYXJPblNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNldFZhbCgnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5wdXQuc2V0SW5wdXRWYWx1ZShkYXR1bS52YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oKTtcblxuICAgIHZhciBldmVudCA9IHRoaXMuZXZlbnRCdXMudHJpZ2dlcignc2VsZWN0ZWQnLCBkYXR1bS5yYXcsIGRhdHVtLmRhdGFzZXROYW1lLCBjb250ZXh0KTtcbiAgICBpZiAoZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duLmNsb3NlKCk7XG5cbiAgICAgIC8vICMxMTg6IGFsbG93IGNsaWNrIGV2ZW50IHRvIGJ1YmJsZSB1cCB0byB0aGUgYm9keSBiZWZvcmUgcmVtb3ZpbmdcbiAgICAgIC8vIHRoZSBzdWdnZXN0aW9ucyBvdGhlcndpc2Ugd2UgYnJlYWsgZXZlbnQgZGVsZWdhdGlvblxuICAgICAgXy5kZWZlcihfLmJpbmQodGhpcy5kcm9wZG93bi5lbXB0eSwgdGhpcy5kcm9wZG93bikpO1xuICAgIH1cbiAgfSxcblxuICAvLyAjIyMgcHVibGljXG5cbiAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICAvLyBpZiB0aGUgbWVudSBpcyBub3QgYWN0aXZhdGVkIHlldCwgd2UgbmVlZCB0byB1cGRhdGVcbiAgICAvLyB0aGUgdW5kZXJseWluZyBkcm9wZG93biBtZW51IHRvIHRyaWdnZXIgdGhlIHNlYXJjaFxuICAgIC8vIG90aGVyd2lzZSB3ZSdyZSBub3QgZ29ubmEgc2VlIGFueXRoaW5nXG4gICAgaWYgKCF0aGlzLmlzQWN0aXZhdGVkKSB7XG4gICAgICB2YXIgcXVlcnkgPSB0aGlzLmlucHV0LmdldElucHV0VmFsdWUoKTtcbiAgICAgIGlmIChxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bi51cGRhdGUocXVlcnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5lbXB0eSgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRyb3Bkb3duLm9wZW4oKTtcbiAgfSxcblxuICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgdGhpcy5kcm9wZG93bi5jbG9zZSgpO1xuICB9LFxuXG4gIHNldFZhbDogZnVuY3Rpb24gc2V0VmFsKHZhbCkge1xuICAgIC8vIGV4cGVjdCB2YWwgdG8gYmUgYSBzdHJpbmcsIHNvIGJlIHNhZmUsIGFuZCBjb2VyY2VcbiAgICB2YWwgPSBfLnRvU3RyKHZhbCk7XG5cbiAgICBpZiAodGhpcy5pc0FjdGl2YXRlZCkge1xuICAgICAgdGhpcy5pbnB1dC5zZXRJbnB1dFZhbHVlKHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5wdXQuc2V0UXVlcnkodmFsKTtcbiAgICAgIHRoaXMuaW5wdXQuc2V0SW5wdXRWYWx1ZSh2YWwsIHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuX3NldExhbmd1YWdlRGlyZWN0aW9uKCk7XG4gIH0sXG5cbiAgZ2V0VmFsOiBmdW5jdGlvbiBnZXRWYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcbiAgfSxcblxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgIHRoaXMuZHJvcGRvd24uZGVzdHJveSgpO1xuXG4gICAgZGVzdHJveURvbVN0cnVjdHVyZSh0aGlzLiRub2RlLCB0aGlzLmNzc0NsYXNzZXMpO1xuXG4gICAgdGhpcy4kbm9kZSA9IG51bGw7XG4gIH0sXG5cbiAgZ2V0V3JhcHBlcjogZnVuY3Rpb24gZ2V0V3JhcHBlcigpIHtcbiAgICByZXR1cm4gdGhpcy5kcm9wZG93bi4kY29udGFpbmVyWzBdO1xuICB9XG59KTtcblxuZnVuY3Rpb24gYnVpbGREb20ob3B0aW9ucykge1xuICB2YXIgJGlucHV0O1xuICB2YXIgJHdyYXBwZXI7XG4gIHZhciAkZHJvcGRvd247XG4gIHZhciAkaGludDtcblxuICAkaW5wdXQgPSBET00uZWxlbWVudChvcHRpb25zLmlucHV0KTtcbiAgJHdyYXBwZXIgPSBET01cbiAgICAuZWxlbWVudChodG1sLndyYXBwZXIucmVwbGFjZSgnJVJPT1QlJywgb3B0aW9ucy5jc3NDbGFzc2VzLnJvb3QpKVxuICAgIC5jc3Mob3B0aW9ucy5jc3Mud3JhcHBlcik7XG5cbiAgLy8gb3ZlcnJpZGUgdGhlIGRpc3BsYXkgcHJvcGVydHkgd2l0aCB0aGUgdGFibGUtY2VsbCB2YWx1ZVxuICAvLyBpZiB0aGUgcGFyZW50IGVsZW1lbnQgaXMgYSB0YWJsZSBhbmQgdGhlIG9yaWdpbmFsIGlucHV0IHdhcyBhIGJsb2NrXG4gIC8vICAtPiBodHRwczovL2dpdGh1Yi5jb20vYWxnb2xpYS9hdXRvY29tcGxldGUuanMvaXNzdWVzLzE2XG4gIGlmICghb3B0aW9ucy5hcHBlbmRUbyAmJiAkaW5wdXQuY3NzKCdkaXNwbGF5JykgPT09ICdibG9jaycgJiYgJGlucHV0LnBhcmVudCgpLmNzcygnZGlzcGxheScpID09PSAndGFibGUnKSB7XG4gICAgJHdyYXBwZXIuY3NzKCdkaXNwbGF5JywgJ3RhYmxlLWNlbGwnKTtcbiAgfVxuICB2YXIgZHJvcGRvd25IdG1sID0gaHRtbC5kcm9wZG93bi5cbiAgICByZXBsYWNlKCclUFJFRklYJScsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5wcmVmaXgpLlxuICAgIHJlcGxhY2UoJyVEUk9QRE9XTl9NRU5VJScsIG9wdGlvbnMuY3NzQ2xhc3Nlcy5kcm9wZG93bk1lbnUpO1xuICAkZHJvcGRvd24gPSBET00uZWxlbWVudChkcm9wZG93bkh0bWwpXG4gICAgLmNzcyhvcHRpb25zLmNzcy5kcm9wZG93bilcbiAgICAuYXR0cih7XG4gICAgICByb2xlOiAnbGlzdGJveCcsXG4gICAgICBpZDogb3B0aW9ucy5saXN0Ym94SWRcbiAgICB9KTtcbiAgaWYgKG9wdGlvbnMudGVtcGxhdGVzICYmIG9wdGlvbnMudGVtcGxhdGVzLmRyb3Bkb3duTWVudSkge1xuICAgICRkcm9wZG93bi5odG1sKF8udGVtcGxhdGlmeShvcHRpb25zLnRlbXBsYXRlcy5kcm9wZG93bk1lbnUpKCkpO1xuICB9XG4gICRoaW50ID0gJGlucHV0LmNsb25lKCkuY3NzKG9wdGlvbnMuY3NzLmhpbnQpLmNzcyhnZXRCYWNrZ3JvdW5kU3R5bGVzKCRpbnB1dCkpO1xuXG4gICRoaW50XG4gICAgLnZhbCgnJylcbiAgICAuYWRkQ2xhc3MoXy5jbGFzc05hbWUob3B0aW9ucy5jc3NDbGFzc2VzLnByZWZpeCwgb3B0aW9ucy5jc3NDbGFzc2VzLmhpbnQsIHRydWUpKVxuICAgIC5yZW1vdmVBdHRyKCdpZCBuYW1lIHBsYWNlaG9sZGVyIHJlcXVpcmVkJylcbiAgICAucHJvcCgncmVhZG9ubHknLCB0cnVlKVxuICAgIC5hdHRyKHtcbiAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gICAgICBzcGVsbGNoZWNrOiAnZmFsc2UnLFxuICAgICAgdGFiaW5kZXg6IC0xXG4gICAgfSk7XG4gIGlmICgkaGludC5yZW1vdmVEYXRhKSB7XG4gICAgJGhpbnQucmVtb3ZlRGF0YSgpO1xuICB9XG5cbiAgLy8gc3RvcmUgdGhlIG9yaWdpbmFsIHZhbHVlcyBvZiB0aGUgYXR0cnMgdGhhdCBnZXQgbW9kaWZpZWRcbiAgLy8gc28gbW9kaWZpY2F0aW9ucyBjYW4gYmUgcmV2ZXJ0ZWQgb24gZGVzdHJveVxuICAkaW5wdXQuZGF0YShhdHRyc0tleSwge1xuICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6ICRpbnB1dC5hdHRyKCdhcmlhLWF1dG9jb21wbGV0ZScpLFxuICAgICdhcmlhLWV4cGFuZGVkJzogJGlucHV0LmF0dHIoJ2FyaWEtZXhwYW5kZWQnKSxcbiAgICAnYXJpYS1vd25zJzogJGlucHV0LmF0dHIoJ2FyaWEtb3ducycpLFxuICAgIGF1dG9jb21wbGV0ZTogJGlucHV0LmF0dHIoJ2F1dG9jb21wbGV0ZScpLFxuICAgIGRpcjogJGlucHV0LmF0dHIoJ2RpcicpLFxuICAgIHJvbGU6ICRpbnB1dC5hdHRyKCdyb2xlJyksXG4gICAgc3BlbGxjaGVjazogJGlucHV0LmF0dHIoJ3NwZWxsY2hlY2snKSxcbiAgICBzdHlsZTogJGlucHV0LmF0dHIoJ3N0eWxlJyksXG4gICAgdHlwZTogJGlucHV0LmF0dHIoJ3R5cGUnKVxuICB9KTtcblxuICAkaW5wdXRcbiAgICAuYWRkQ2xhc3MoXy5jbGFzc05hbWUob3B0aW9ucy5jc3NDbGFzc2VzLnByZWZpeCwgb3B0aW9ucy5jc3NDbGFzc2VzLmlucHV0LCB0cnVlKSlcbiAgICAuYXR0cih7XG4gICAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICAgICAgc3BlbGxjaGVjazogZmFsc2UsXG5cbiAgICAgIC8vIEFjY2Vzc2liaWxpdHkgZmVhdHVyZXNcbiAgICAgIC8vIEdpdmUgdGhlIGZpZWxkIGEgcHJlc2VudGF0aW9uIG9mIGEgXCJzZWxlY3RcIi5cbiAgICAgIC8vIENvbWJvYm94IGlzIHRoZSBjb21iaW5lZCBwcmVzZW50YXRpb24gb2YgYSBzaW5nbGUgbGluZSB0ZXh0ZmllbGRcbiAgICAgIC8vIHdpdGggYSBsaXN0Ym94IHBvcHVwLlxuICAgICAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1dBSS9QRi9hcmlhL3JvbGVzI2NvbWJvYm94XG4gICAgICByb2xlOiAnY29tYm9ib3gnLFxuICAgICAgLy8gTGV0IHRoZSBzY3JlZW4gcmVhZGVyIGtub3cgdGhlIGZpZWxkIGhhcyBhbiBhdXRvY29tcGxldGVcbiAgICAgIC8vIGZlYXR1cmUgdG8gaXQuXG4gICAgICAnYXJpYS1hdXRvY29tcGxldGUnOiAob3B0aW9ucy5kYXRhc2V0cyAmJlxuICAgICAgICBvcHRpb25zLmRhdGFzZXRzWzBdICYmIG9wdGlvbnMuZGF0YXNldHNbMF0uZGlzcGxheUtleSA/ICdib3RoJyA6ICdsaXN0JyksXG4gICAgICAvLyBJbmRpY2F0ZXMgd2hldGhlciB0aGUgZHJvcGRvd24gaXQgY29udHJvbHMgaXMgY3VycmVudGx5IGV4cGFuZGVkIG9yIGNvbGxhcHNlZFxuICAgICAgJ2FyaWEtZXhwYW5kZWQnOiAnZmFsc2UnLFxuICAgICAgJ2FyaWEtbGFiZWwnOiBvcHRpb25zLmFyaWFMYWJlbCxcbiAgICAgIC8vIEV4cGxpY2l0bHkgcG9pbnQgdG8gdGhlIGxpc3Rib3gsXG4gICAgICAvLyB3aGljaCBpcyBhIGxpc3Qgb2Ygc3VnZ2VzdGlvbnMgKGFrYSBvcHRpb25zKVxuICAgICAgJ2FyaWEtb3ducyc6IG9wdGlvbnMubGlzdGJveElkXG4gICAgfSlcbiAgICAuY3NzKG9wdGlvbnMuaGludCA/IG9wdGlvbnMuY3NzLmlucHV0IDogb3B0aW9ucy5jc3MuaW5wdXRXaXRoTm9IaW50KTtcblxuICAvLyBpZTcgZG9lcyBub3QgbGlrZSBpdCB3aGVuIGRpciBpcyBzZXQgdG8gYXV0b1xuICB0cnkge1xuICAgIGlmICghJGlucHV0LmF0dHIoJ2RpcicpKSB7XG4gICAgICAkaW5wdXQuYXR0cignZGlyJywgJ2F1dG8nKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxuXG4gICR3cmFwcGVyID0gb3B0aW9ucy5hcHBlbmRUb1xuICAgID8gJHdyYXBwZXIuYXBwZW5kVG8oRE9NLmVsZW1lbnQob3B0aW9ucy5hcHBlbmRUbykuZXEoMCkpLmVxKDApXG4gICAgOiAkaW5wdXQud3JhcCgkd3JhcHBlcikucGFyZW50KCk7XG5cbiAgJHdyYXBwZXJcbiAgICAucHJlcGVuZChvcHRpb25zLmhpbnQgPyAkaGludCA6IG51bGwpXG4gICAgLmFwcGVuZCgkZHJvcGRvd24pO1xuXG4gIHJldHVybiB7XG4gICAgd3JhcHBlcjogJHdyYXBwZXIsXG4gICAgaW5wdXQ6ICRpbnB1dCxcbiAgICBoaW50OiAkaGludCxcbiAgICBtZW51OiAkZHJvcGRvd25cbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0QmFja2dyb3VuZFN0eWxlcygkZWwpIHtcbiAgcmV0dXJuIHtcbiAgICBiYWNrZ3JvdW5kQXR0YWNobWVudDogJGVsLmNzcygnYmFja2dyb3VuZC1hdHRhY2htZW50JyksXG4gICAgYmFja2dyb3VuZENsaXA6ICRlbC5jc3MoJ2JhY2tncm91bmQtY2xpcCcpLFxuICAgIGJhY2tncm91bmRDb2xvcjogJGVsLmNzcygnYmFja2dyb3VuZC1jb2xvcicpLFxuICAgIGJhY2tncm91bmRJbWFnZTogJGVsLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLFxuICAgIGJhY2tncm91bmRPcmlnaW46ICRlbC5jc3MoJ2JhY2tncm91bmQtb3JpZ2luJyksXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uOiAkZWwuY3NzKCdiYWNrZ3JvdW5kLXBvc2l0aW9uJyksXG4gICAgYmFja2dyb3VuZFJlcGVhdDogJGVsLmNzcygnYmFja2dyb3VuZC1yZXBlYXQnKSxcbiAgICBiYWNrZ3JvdW5kU2l6ZTogJGVsLmNzcygnYmFja2dyb3VuZC1zaXplJylcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVzdHJveURvbVN0cnVjdHVyZSgkbm9kZSwgY3NzQ2xhc3Nlcykge1xuICB2YXIgJGlucHV0ID0gJG5vZGUuZmluZChfLmNsYXNzTmFtZShjc3NDbGFzc2VzLnByZWZpeCwgY3NzQ2xhc3Nlcy5pbnB1dCkpO1xuXG4gIC8vIG5lZWQgdG8gcmVtb3ZlIGF0dHJzIHRoYXQgd2VyZW4ndCBwcmV2aW91c2x5IGRlZmluZWQgYW5kXG4gIC8vIHJldmVydCBhdHRycyB0aGF0IG9yaWdpbmFsbHkgaGFkIGEgdmFsdWVcbiAgXy5lYWNoKCRpbnB1dC5kYXRhKGF0dHJzS2V5KSwgZnVuY3Rpb24odmFsLCBrZXkpIHtcbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICRpbnB1dC5yZW1vdmVBdHRyKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRpbnB1dC5hdHRyKGtleSwgdmFsKTtcbiAgICB9XG4gIH0pO1xuXG4gICRpbnB1dFxuICAgIC5kZXRhY2goKVxuICAgIC5yZW1vdmVDbGFzcyhfLmNsYXNzTmFtZShjc3NDbGFzc2VzLnByZWZpeCwgY3NzQ2xhc3Nlcy5pbnB1dCwgdHJ1ZSkpXG4gICAgLmluc2VydEFmdGVyKCRub2RlKTtcbiAgaWYgKCRpbnB1dC5yZW1vdmVEYXRhKSB7XG4gICAgJGlucHV0LnJlbW92ZURhdGEoYXR0cnNLZXkpO1xuICB9XG5cbiAgJG5vZGUucmVtb3ZlKCk7XG59XG5cblR5cGVhaGVhZC5Ecm9wZG93biA9IERyb3Bkb3duO1xuVHlwZWFoZWFkLklucHV0ID0gSW5wdXQ7XG5UeXBlYWhlYWQuc291cmNlcyA9IHJlcXVpcmUoJy4uL3NvdXJjZXMvaW5kZXguanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBUeXBlYWhlYWQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbGVtZW50OiBudWxsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlQWxnb2xpYUNsaWVudFZlcnNpb24oYWdlbnQpIHtcbiAgdmFyIHBhcnNlZCA9XG4gICAgLy8gVXNlciBhZ2VudCBmb3IgYWxnb2xpYXNlYXJjaCA+PSAzLjMzLjBcbiAgICBhZ2VudC5tYXRjaCgvQWxnb2xpYSBmb3IgSmF2YVNjcmlwdCBcXCgoXFxkK1xcLikoXFxkK1xcLikoXFxkKylcXCkvKSB8fFxuICAgIC8vIFVzZXIgYWdlbnQgZm9yIGFsZ29saWFzZWFyY2ggPCAzLjMzLjBcbiAgICBhZ2VudC5tYXRjaCgvQWxnb2xpYSBmb3IgdmFuaWxsYSBKYXZhU2NyaXB0IChcXGQrXFwuKShcXGQrXFwuKShcXGQrKS8pO1xuXG4gIGlmIChwYXJzZWQpIHtcbiAgICByZXR1cm4gW3BhcnNlZFsxXSwgcGFyc2VkWzJdLCBwYXJzZWRbM11dO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBET00gPSByZXF1aXJlKCcuL2RvbS5qcycpO1xuXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csICdcXFxcJCYnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIHRob3NlIG1ldGhvZHMgYXJlIGltcGxlbWVudGVkIGRpZmZlcmVudGx5XG4gIC8vIGRlcGVuZGluZyBvbiB3aGljaCBidWlsZCBpdCBpcywgdXNpbmdcbiAgLy8gJC4uLiBvciBhbmd1bGFyLi4uIG9yIFplcHRvLi4uIG9yIHJlcXVpcmUoLi4uKVxuICBpc0FycmF5OiBudWxsLFxuICBpc0Z1bmN0aW9uOiBudWxsLFxuICBpc09iamVjdDogbnVsbCxcbiAgYmluZDogbnVsbCxcbiAgZWFjaDogbnVsbCxcbiAgbWFwOiBudWxsLFxuICBtaXhpbjogbnVsbCxcblxuICBpc01zaWU6IGZ1bmN0aW9uKGFnZW50U3RyaW5nKSB7XG4gICAgaWYgKGFnZW50U3RyaW5nID09PSB1bmRlZmluZWQpIHsgYWdlbnRTdHJpbmcgPSBuYXZpZ2F0b3IudXNlckFnZW50OyB9XG4gICAgLy8gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZGVkL2Jvd3Nlci9ibG9iL21hc3Rlci9ib3dzZXIuanNcbiAgICBpZiAoKC8obXNpZXx0cmlkZW50KS9pKS50ZXN0KGFnZW50U3RyaW5nKSkge1xuICAgICAgdmFyIG1hdGNoID0gYWdlbnRTdHJpbmcubWF0Y2goLyhtc2llIHxydjopKFxcZCsoLlxcZCspPykvaSk7XG4gICAgICBpZiAobWF0Y2gpIHsgcmV0dXJuIG1hdGNoWzJdOyB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82OTY5NDg2XG4gIGVzY2FwZVJlZ0V4Q2hhcnM6IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csICdcXFxcJCYnKTtcbiAgfSxcblxuICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJzsgfSxcblxuICB0b1N0cjogZnVuY3Rpb24gdG9TdHIocykge1xuICAgIHJldHVybiBzID09PSB1bmRlZmluZWQgfHwgcyA9PT0gbnVsbCA/ICcnIDogcyArICcnO1xuICB9LFxuXG4gIGNsb25lRGVlcDogZnVuY3Rpb24gY2xvbmVEZWVwKG9iaikge1xuICAgIHZhciBjbG9uZSA9IHRoaXMubWl4aW4oe30sIG9iaik7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuZWFjaChjbG9uZSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGlmIChzZWxmLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgY2xvbmVba2V5XSA9IFtdLmNvbmNhdCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZi5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICBjbG9uZVtrZXldID0gc2VsZi5jbG9uZURlZXAodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9LFxuXG4gIGVycm9yOiBmdW5jdGlvbihtc2cpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgfSxcblxuICBldmVyeTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgdmFyIHJlc3VsdCA9IHRydWU7XG4gICAgaWYgKCFvYmopIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRoaXMuZWFjaChvYmosIGZ1bmN0aW9uKHZhbCwga2V5KSB7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJlc3VsdCA9IHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSAmJiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuICEhcmVzdWx0O1xuICB9LFxuXG4gIGFueTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgaWYgKCFvYmopIHtcbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG4gICAgdGhpcy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsLCBrZXkpIHtcbiAgICAgIGlmICh0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9LFxuXG4gIGdldFVuaXF1ZUlkOiAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIGNvdW50ZXIrKzsgfTtcbiAgfSkoKSxcblxuICB0ZW1wbGF0aWZ5OiBmdW5jdGlvbiB0ZW1wbGF0aWZ5KG9iaikge1xuICAgIGlmICh0aGlzLmlzRnVuY3Rpb24ob2JqKSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgdmFyICR0ZW1wbGF0ZSA9IERPTS5lbGVtZW50KG9iaik7XG4gICAgaWYgKCR0ZW1wbGF0ZS5wcm9wKCd0YWdOYW1lJykgPT09ICdTQ1JJUFQnKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gdGVtcGxhdGUoKSB7IHJldHVybiAkdGVtcGxhdGUudGV4dCgpOyB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gdGVtcGxhdGUoKSB7IHJldHVybiBTdHJpbmcob2JqKTsgfTtcbiAgfSxcblxuICBkZWZlcjogZnVuY3Rpb24oZm4pIHsgc2V0VGltZW91dChmbiwgMCk7IH0sXG5cbiAgbm9vcDogZnVuY3Rpb24oKSB7fSxcblxuICBmb3JtYXRQcmVmaXg6IGZ1bmN0aW9uKHByZWZpeCwgbm9QcmVmaXgpIHtcbiAgICByZXR1cm4gbm9QcmVmaXggPyAnJyA6IHByZWZpeCArICctJztcbiAgfSxcblxuICBjbGFzc05hbWU6IGZ1bmN0aW9uKHByZWZpeCwgY2xhenosIHNraXBEb3QpIHtcbiAgICByZXR1cm4gKHNraXBEb3QgPyAnJyA6ICcuJykgKyBwcmVmaXggKyBjbGF6ejtcbiAgfSxcblxuICBlc2NhcGVIaWdobGlnaHRlZFN0cmluZzogZnVuY3Rpb24oc3RyLCBoaWdobGlnaHRQcmVUYWcsIGhpZ2hsaWdodFBvc3RUYWcpIHtcbiAgICBoaWdobGlnaHRQcmVUYWcgPSBoaWdobGlnaHRQcmVUYWcgfHwgJzxlbT4nO1xuICAgIHZhciBwcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcmUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaGlnaGxpZ2h0UHJlVGFnKSk7XG5cbiAgICBoaWdobGlnaHRQb3N0VGFnID0gaGlnaGxpZ2h0UG9zdFRhZyB8fCAnPC9lbT4nO1xuICAgIHZhciBwb3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcG9zdC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShoaWdobGlnaHRQb3N0VGFnKSk7XG5cbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MXG4gICAgICAucmVwbGFjZShSZWdFeHAoZXNjYXBlUmVnRXhwKHByZS5pbm5lckhUTUwpLCAnZycpLCBoaWdobGlnaHRQcmVUYWcpXG4gICAgICAucmVwbGFjZShSZWdFeHAoZXNjYXBlUmVnRXhwKHBvc3QuaW5uZXJIVE1MKSwgJ2cnKSwgaGlnaGxpZ2h0UG9zdFRhZyk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzLmpzJyk7XG52YXIgdmVyc2lvbiA9IHJlcXVpcmUoJy4uLy4uL3ZlcnNpb24uanMnKTtcbnZhciBwYXJzZUFsZ29saWFDbGllbnRWZXJzaW9uID0gcmVxdWlyZSgnLi4vY29tbW9uL3BhcnNlQWxnb2xpYUNsaWVudFZlcnNpb24uanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZWFyY2goaW5kZXgsIHBhcmFtcykge1xuICB2YXIgYWxnb2xpYVZlcnNpb24gPSBwYXJzZUFsZ29saWFDbGllbnRWZXJzaW9uKGluZGV4LmFzLl91YSk7XG4gIGlmIChhbGdvbGlhVmVyc2lvbiAmJiBhbGdvbGlhVmVyc2lvblswXSA+PSAzICYmIGFsZ29saWFWZXJzaW9uWzFdID4gMjApIHtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgcGFyYW1zLmFkZGl0aW9uYWxVQSA9ICdhdXRvY29tcGxldGUuanMgJyArIHZlcnNpb247XG4gIH1cbiAgcmV0dXJuIHNvdXJjZUZuO1xuXG4gIGZ1bmN0aW9uIHNvdXJjZUZuKHF1ZXJ5LCBjYikge1xuICAgIGluZGV4LnNlYXJjaChxdWVyeSwgcGFyYW1zLCBmdW5jdGlvbihlcnJvciwgY29udGVudCkge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIF8uZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNiKGNvbnRlbnQuaGl0cywgY29udGVudCk7XG4gICAgfSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoaXRzOiByZXF1aXJlKCcuL2hpdHMuanMnKSxcbiAgcG9wdWxhckluOiByZXF1aXJlKCcuL3BvcHVsYXJJbi5qcycpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscy5qcycpO1xudmFyIHZlcnNpb24gPSByZXF1aXJlKCcuLi8uLi92ZXJzaW9uLmpzJyk7XG52YXIgcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbiA9IHJlcXVpcmUoJy4uL2NvbW1vbi9wYXJzZUFsZ29saWFDbGllbnRWZXJzaW9uLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcG9wdWxhckluKGluZGV4LCBwYXJhbXMsIGRldGFpbHMsIG9wdGlvbnMpIHtcbiAgdmFyIGFsZ29saWFWZXJzaW9uID0gcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbihpbmRleC5hcy5fdWEpO1xuICBpZiAoYWxnb2xpYVZlcnNpb24gJiYgYWxnb2xpYVZlcnNpb25bMF0gPj0gMyAmJiBhbGdvbGlhVmVyc2lvblsxXSA+IDIwKSB7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgIHBhcmFtcy5hZGRpdGlvbmFsVUEgPSAnYXV0b2NvbXBsZXRlLmpzICcgKyB2ZXJzaW9uO1xuICB9XG4gIGlmICghZGV0YWlscy5zb3VyY2UpIHtcbiAgICByZXR1cm4gXy5lcnJvcihcIk1pc3NpbmcgJ3NvdXJjZScga2V5XCIpO1xuICB9XG4gIHZhciBzb3VyY2UgPSBfLmlzRnVuY3Rpb24oZGV0YWlscy5zb3VyY2UpID8gZGV0YWlscy5zb3VyY2UgOiBmdW5jdGlvbihoaXQpIHsgcmV0dXJuIGhpdFtkZXRhaWxzLnNvdXJjZV07IH07XG5cbiAgaWYgKCFkZXRhaWxzLmluZGV4KSB7XG4gICAgcmV0dXJuIF8uZXJyb3IoXCJNaXNzaW5nICdpbmRleCcga2V5XCIpO1xuICB9XG4gIHZhciBkZXRhaWxzSW5kZXggPSBkZXRhaWxzLmluZGV4O1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHJldHVybiBzb3VyY2VGbjtcblxuICBmdW5jdGlvbiBzb3VyY2VGbihxdWVyeSwgY2IpIHtcbiAgICBpbmRleC5zZWFyY2gocXVlcnksIHBhcmFtcywgZnVuY3Rpb24oZXJyb3IsIGNvbnRlbnQpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBfLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChjb250ZW50LmhpdHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgZmlyc3QgPSBjb250ZW50LmhpdHNbMF07XG5cbiAgICAgICAgdmFyIGRldGFpbHNQYXJhbXMgPSBfLm1peGluKHtoaXRzUGVyUGFnZTogMH0sIGRldGFpbHMpO1xuICAgICAgICBkZWxldGUgZGV0YWlsc1BhcmFtcy5zb3VyY2U7IC8vIG5vdCBhIHF1ZXJ5IHBhcmFtZXRlclxuICAgICAgICBkZWxldGUgZGV0YWlsc1BhcmFtcy5pbmRleDsgLy8gbm90IGEgcXVlcnkgcGFyYW1ldGVyXG5cbiAgICAgICAgdmFyIGRldGFpbHNBbGdvbGlhVmVyc2lvbiA9IHBhcnNlQWxnb2xpYUNsaWVudFZlcnNpb24oZGV0YWlsc0luZGV4LmFzLl91YSk7XG4gICAgICAgIGlmIChkZXRhaWxzQWxnb2xpYVZlcnNpb24gJiYgZGV0YWlsc0FsZ29saWFWZXJzaW9uWzBdID49IDMgJiYgZGV0YWlsc0FsZ29saWFWZXJzaW9uWzFdID4gMjApIHtcbiAgICAgICAgICBwYXJhbXMuYWRkaXRpb25hbFVBID0gJ2F1dG9jb21wbGV0ZS5qcyAnICsgdmVyc2lvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGFpbHNJbmRleC5zZWFyY2goc291cmNlKGZpcnN0KSwgZGV0YWlsc1BhcmFtcywgZnVuY3Rpb24oZXJyb3IyLCBjb250ZW50Mikge1xuICAgICAgICAgIGlmIChlcnJvcjIpIHtcbiAgICAgICAgICAgIF8uZXJyb3IoZXJyb3IyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzdWdnZXN0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgLy8gYWRkIHRoZSAnYWxsIGRlcGFydG1lbnQnIGVudHJ5IGJlZm9yZSBvdGhlcnNcbiAgICAgICAgICBpZiAob3B0aW9ucy5pbmNsdWRlQWxsKSB7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSBvcHRpb25zLmFsbFRpdGxlIHx8ICdBbGwgZGVwYXJ0bWVudHMnO1xuICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaChfLm1peGluKHtcbiAgICAgICAgICAgICAgZmFjZXQ6IHt2YWx1ZTogbGFiZWwsIGNvdW50OiBjb250ZW50Mi5uYkhpdHN9XG4gICAgICAgICAgICB9LCBfLmNsb25lRGVlcChmaXJzdCkpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBlbnJpY2ggdGhlIGZpcnN0IGhpdCBpdGVyYXRpbmcgb3ZlciB0aGUgZmFjZXRzXG4gICAgICAgICAgXy5lYWNoKGNvbnRlbnQyLmZhY2V0cywgZnVuY3Rpb24odmFsdWVzLCBmYWNldCkge1xuICAgICAgICAgICAgXy5lYWNoKHZhbHVlcywgZnVuY3Rpb24oY291bnQsIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goXy5taXhpbih7XG4gICAgICAgICAgICAgICAgZmFjZXQ6IHtmYWNldDogZmFjZXQsIHZhbHVlOiB2YWx1ZSwgY291bnQ6IGNvdW50fVxuICAgICAgICAgICAgICB9LCBfLmNsb25lRGVlcChmaXJzdCkpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gYXBwZW5kIGFsbCBvdGhlciBoaXRzXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBjb250ZW50LmhpdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zLnB1c2goY29udGVudC5oaXRzW2ldKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYihzdWdnZXN0aW9ucywgY29udGVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY2IoW10pO1xuICAgIH0pO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyB0aGlzIHdpbGwgaW5qZWN0IFplcHRvIGluIHdpbmRvdywgdW5mb3J0dW5hdGVseSBubyBlYXN5IGNvbW1vbkpTIHplcHRvIGJ1aWxkXG52YXIgemVwdG8gPSByZXF1aXJlKCcuLi8uLi96ZXB0by5qcycpO1xuXG4vLyBzZXR1cCBET00gZWxlbWVudFxudmFyIERPTSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9kb20uanMnKTtcbkRPTS5lbGVtZW50ID0gemVwdG87XG5cbi8vIHNldHVwIHV0aWxzIGZ1bmN0aW9uc1xudmFyIF8gPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMuanMnKTtcbl8uaXNBcnJheSA9IHplcHRvLmlzQXJyYXk7XG5fLmlzRnVuY3Rpb24gPSB6ZXB0by5pc0Z1bmN0aW9uO1xuXy5pc09iamVjdCA9IHplcHRvLmlzUGxhaW5PYmplY3Q7XG5fLmJpbmQgPSB6ZXB0by5wcm94eTtcbl8uZWFjaCA9IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGNiKSB7XG4gIC8vIHN0dXBpZCBhcmd1bWVudCBvcmRlciBmb3IgalF1ZXJ5LmVhY2hcbiAgemVwdG8uZWFjaChjb2xsZWN0aW9uLCByZXZlcnNlQXJncyk7XG4gIGZ1bmN0aW9uIHJldmVyc2VBcmdzKGluZGV4LCB2YWx1ZSkge1xuICAgIHJldHVybiBjYih2YWx1ZSwgaW5kZXgpO1xuICB9XG59O1xuXy5tYXAgPSB6ZXB0by5tYXA7XG5fLm1peGluID0gemVwdG8uZXh0ZW5kO1xuXy5FdmVudCA9IHplcHRvLkV2ZW50O1xuXG52YXIgdHlwZWFoZWFkS2V5ID0gJ2FhQXV0b2NvbXBsZXRlJztcbnZhciBUeXBlYWhlYWQgPSByZXF1aXJlKCcuLi9hdXRvY29tcGxldGUvdHlwZWFoZWFkLmpzJyk7XG52YXIgRXZlbnRCdXMgPSByZXF1aXJlKCcuLi9hdXRvY29tcGxldGUvZXZlbnRfYnVzLmpzJyk7XG5cbmZ1bmN0aW9uIGF1dG9jb21wbGV0ZShzZWxlY3Rvciwgb3B0aW9ucywgZGF0YXNldHMsIHR5cGVhaGVhZE9iamVjdCkge1xuICBkYXRhc2V0cyA9IF8uaXNBcnJheShkYXRhc2V0cykgPyBkYXRhc2V0cyA6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcblxuICB2YXIgaW5wdXRzID0gemVwdG8oc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oaSwgaW5wdXQpIHtcbiAgICB2YXIgJGlucHV0ID0gemVwdG8oaW5wdXQpO1xuICAgIHZhciBldmVudEJ1cyA9IG5ldyBFdmVudEJ1cyh7ZWw6ICRpbnB1dH0pO1xuICAgIHZhciB0eXBlYWhlYWQgPSB0eXBlYWhlYWRPYmplY3QgfHwgbmV3IFR5cGVhaGVhZCh7XG4gICAgICBpbnB1dDogJGlucHV0LFxuICAgICAgZXZlbnRCdXM6IGV2ZW50QnVzLFxuICAgICAgZHJvcGRvd25NZW51Q29udGFpbmVyOiBvcHRpb25zLmRyb3Bkb3duTWVudUNvbnRhaW5lcixcbiAgICAgIGhpbnQ6IG9wdGlvbnMuaGludCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6ICEhb3B0aW9ucy5oaW50LFxuICAgICAgbWluTGVuZ3RoOiBvcHRpb25zLm1pbkxlbmd0aCxcbiAgICAgIGF1dG9zZWxlY3Q6IG9wdGlvbnMuYXV0b3NlbGVjdCxcbiAgICAgIGF1dG9zZWxlY3RPbkJsdXI6IG9wdGlvbnMuYXV0b3NlbGVjdE9uQmx1cixcbiAgICAgIHRhYkF1dG9jb21wbGV0ZTogb3B0aW9ucy50YWJBdXRvY29tcGxldGUsXG4gICAgICBvcGVuT25Gb2N1czogb3B0aW9ucy5vcGVuT25Gb2N1cyxcbiAgICAgIHRlbXBsYXRlczogb3B0aW9ucy50ZW1wbGF0ZXMsXG4gICAgICBkZWJ1Zzogb3B0aW9ucy5kZWJ1ZyxcbiAgICAgIGNsZWFyT25TZWxlY3RlZDogb3B0aW9ucy5jbGVhck9uU2VsZWN0ZWQsXG4gICAgICBjc3NDbGFzc2VzOiBvcHRpb25zLmNzc0NsYXNzZXMsXG4gICAgICBkYXRhc2V0czogZGF0YXNldHMsXG4gICAgICBrZXlib2FyZFNob3J0Y3V0czogb3B0aW9ucy5rZXlib2FyZFNob3J0Y3V0cyxcbiAgICAgIGFwcGVuZFRvOiBvcHRpb25zLmFwcGVuZFRvLFxuICAgICAgYXV0b1dpZHRoOiBvcHRpb25zLmF1dG9XaWR0aCxcbiAgICAgIGFyaWFMYWJlbDogb3B0aW9ucy5hcmlhTGFiZWwgfHwgaW5wdXQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJylcbiAgICB9KTtcbiAgICAkaW5wdXQuZGF0YSh0eXBlYWhlYWRLZXksIHR5cGVhaGVhZCk7XG4gIH0pO1xuXG4gIC8vIGV4cG9zZSBhbGwgbWV0aG9kcyBpbiB0aGUgYGF1dG9jb21wbGV0ZWAgYXR0cmlidXRlXG4gIGlucHV0cy5hdXRvY29tcGxldGUgPSB7fTtcbiAgXy5lYWNoKFsnb3BlbicsICdjbG9zZScsICdnZXRWYWwnLCAnc2V0VmFsJywgJ2Rlc3Ryb3knLCAnZ2V0V3JhcHBlciddLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICBpbnB1dHMuYXV0b2NvbXBsZXRlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBtZXRob2RBcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgaW5wdXRzLmVhY2goZnVuY3Rpb24oaiwgaW5wdXQpIHtcbiAgICAgICAgdmFyIHR5cGVhaGVhZCA9IHplcHRvKGlucHV0KS5kYXRhKHR5cGVhaGVhZEtleSk7XG4gICAgICAgIHJlc3VsdCA9IHR5cGVhaGVhZFttZXRob2RdLmFwcGx5KHR5cGVhaGVhZCwgbWV0aG9kQXJndW1lbnRzKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4gaW5wdXRzO1xufVxuXG5hdXRvY29tcGxldGUuc291cmNlcyA9IFR5cGVhaGVhZC5zb3VyY2VzO1xuYXV0b2NvbXBsZXRlLmVzY2FwZUhpZ2hsaWdodGVkU3RyaW5nID0gXy5lc2NhcGVIaWdobGlnaHRlZFN0cmluZztcblxudmFyIHdhc0F1dG9jb21wbGV0ZVNldCA9ICdhdXRvY29tcGxldGUnIGluIHdpbmRvdztcbnZhciBvbGRBdXRvY29tcGxldGUgPSB3aW5kb3cuYXV0b2NvbXBsZXRlO1xuYXV0b2NvbXBsZXRlLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICBpZiAod2FzQXV0b2NvbXBsZXRlU2V0KSB7XG4gICAgd2luZG93LmF1dG9jb21wbGV0ZSA9IG9sZEF1dG9jb21wbGV0ZTtcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgd2luZG93LmF1dG9jb21wbGV0ZTtcbiAgfVxuICByZXR1cm4gYXV0b2NvbXBsZXRlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBhdXRvY29tcGxldGU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiMC4zNy4xXCI7XG4iLCIvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuLyogWmVwdG8gdjEuMi4wIC0gemVwdG8gZXZlbnQgYXNzZXRzIGRhdGEgLSB6ZXB0b2pzLmNvbS9saWNlbnNlICovXG4oZnVuY3Rpb24oZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShnbG9iYWwpO1xufSgvKiB0aGlzICMjIyMjIFVQREFURUQ6IGhlcmUgd2Ugd2FudCB0byB1c2Ugd2luZG93L2dsb2JhbCBpbnN0ZWFkIG9mIHRoaXMgd2hpY2ggaXMgdGhlIGN1cnJlbnQgZmlsZSBjb250ZXh0ICMjIyMjICovIHdpbmRvdywgZnVuY3Rpb24od2luZG93KSB7XG4gIHZhciBaZXB0byA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVuZGVmaW5lZCwga2V5LCAkLCBjbGFzc0xpc3QsIGVtcHR5QXJyYXkgPSBbXSwgY29uY2F0ID0gZW1wdHlBcnJheS5jb25jYXQsIGZpbHRlciA9IGVtcHR5QXJyYXkuZmlsdGVyLCBzbGljZSA9IGVtcHR5QXJyYXkuc2xpY2UsXG4gICAgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQsXG4gICAgZWxlbWVudERpc3BsYXkgPSB7fSwgY2xhc3NDYWNoZSA9IHt9LFxuICAgIGNzc051bWJlciA9IHsgJ2NvbHVtbi1jb3VudCc6IDEsICdjb2x1bW5zJzogMSwgJ2ZvbnQtd2VpZ2h0JzogMSwgJ2xpbmUtaGVpZ2h0JzogMSwnb3BhY2l0eSc6IDEsICd6LWluZGV4JzogMSwgJ3pvb20nOiAxIH0sXG4gICAgZnJhZ21lbnRSRSA9IC9eXFxzKjwoXFx3K3whKVtePl0qPi8sXG4gICAgc2luZ2xlVGFnUkUgPSAvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8sXG4gICAgdGFnRXhwYW5kZXJSRSA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6XSspW14+XSopXFwvPi9pZyxcbiAgICByb290Tm9kZVJFID0gL14oPzpib2R5fGh0bWwpJC9pLFxuICAgIGNhcGl0YWxSRSA9IC8oW0EtWl0pL2csXG5cbiAgICAvLyBzcGVjaWFsIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgYmUgZ2V0L3NldCB2aWEgbWV0aG9kIGNhbGxzXG4gICAgbWV0aG9kQXR0cmlidXRlcyA9IFsndmFsJywgJ2NzcycsICdodG1sJywgJ3RleHQnLCAnZGF0YScsICd3aWR0aCcsICdoZWlnaHQnLCAnb2Zmc2V0J10sXG5cbiAgICBhZGphY2VuY3lPcGVyYXRvcnMgPSBbICdhZnRlcicsICdwcmVwZW5kJywgJ2JlZm9yZScsICdhcHBlbmQnIF0sXG4gICAgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpLFxuICAgIHRhYmxlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSxcbiAgICBjb250YWluZXJzID0ge1xuICAgICAgJ3RyJzogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKSxcbiAgICAgICd0Ym9keSc6IHRhYmxlLCAndGhlYWQnOiB0YWJsZSwgJ3Rmb290JzogdGFibGUsXG4gICAgICAndGQnOiB0YWJsZVJvdywgJ3RoJzogdGFibGVSb3csXG4gICAgICAnKic6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgfSxcbiAgICByZWFkeVJFID0gL2NvbXBsZXRlfGxvYWRlZHxpbnRlcmFjdGl2ZS8sXG4gICAgc2ltcGxlU2VsZWN0b3JSRSA9IC9eW1xcdy1dKiQvLFxuICAgIGNsYXNzMnR5cGUgPSB7fSxcbiAgICB0b1N0cmluZyA9IGNsYXNzMnR5cGUudG9TdHJpbmcsXG4gICAgemVwdG8gPSB7fSxcbiAgICBjYW1lbGl6ZSwgdW5pcSxcbiAgICB0ZW1wUGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgcHJvcE1hcCA9IHtcbiAgICAgICd0YWJpbmRleCc6ICd0YWJJbmRleCcsXG4gICAgICAncmVhZG9ubHknOiAncmVhZE9ubHknLFxuICAgICAgJ2Zvcic6ICdodG1sRm9yJyxcbiAgICAgICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuICAgICAgJ21heGxlbmd0aCc6ICdtYXhMZW5ndGgnLFxuICAgICAgJ2NlbGxzcGFjaW5nJzogJ2NlbGxTcGFjaW5nJyxcbiAgICAgICdjZWxscGFkZGluZyc6ICdjZWxsUGFkZGluZycsXG4gICAgICAncm93c3Bhbic6ICdyb3dTcGFuJyxcbiAgICAgICdjb2xzcGFuJzogJ2NvbFNwYW4nLFxuICAgICAgJ3VzZW1hcCc6ICd1c2VNYXAnLFxuICAgICAgJ2ZyYW1lYm9yZGVyJzogJ2ZyYW1lQm9yZGVyJyxcbiAgICAgICdjb250ZW50ZWRpdGFibGUnOiAnY29udGVudEVkaXRhYmxlJ1xuICAgIH0sXG4gICAgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHxcbiAgICAgIGZ1bmN0aW9uKG9iamVjdCl7IHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSB9XG5cbiAgemVwdG8ubWF0Y2hlcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgaWYgKCFzZWxlY3RvciB8fCAhZWxlbWVudCB8fCBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSByZXR1cm4gZmFsc2VcbiAgICB2YXIgbWF0Y2hlc1NlbGVjdG9yID0gZWxlbWVudC5tYXRjaGVzIHx8IGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsZW1lbnQub01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm1hdGNoZXNTZWxlY3RvclxuICAgIGlmIChtYXRjaGVzU2VsZWN0b3IpIHJldHVybiBtYXRjaGVzU2VsZWN0b3IuY2FsbChlbGVtZW50LCBzZWxlY3RvcilcbiAgICAvLyBmYWxsIGJhY2sgdG8gcGVyZm9ybWluZyBhIHNlbGVjdG9yOlxuICAgIHZhciBtYXRjaCwgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlLCB0ZW1wID0gIXBhcmVudFxuICAgIGlmICh0ZW1wKSAocGFyZW50ID0gdGVtcFBhcmVudCkuYXBwZW5kQ2hpbGQoZWxlbWVudClcbiAgICBtYXRjaCA9IH56ZXB0by5xc2EocGFyZW50LCBzZWxlY3RvcikuaW5kZXhPZihlbGVtZW50KVxuICAgIHRlbXAgJiYgdGVtcFBhcmVudC5yZW1vdmVDaGlsZChlbGVtZW50KVxuICAgIHJldHVybiBtYXRjaFxuICB9XG5cbiAgZnVuY3Rpb24gdHlwZShvYmopIHtcbiAgICByZXR1cm4gb2JqID09IG51bGwgPyBTdHJpbmcob2JqKSA6XG4gICAgICBjbGFzczJ0eXBlW3RvU3RyaW5nLmNhbGwob2JqKV0gfHwgXCJvYmplY3RcIlxuICB9XG5cbiAgZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdHlwZSh2YWx1ZSkgPT0gXCJmdW5jdGlvblwiIH1cbiAgZnVuY3Rpb24gaXNXaW5kb3cob2JqKSAgICAgeyByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09IG9iai53aW5kb3cgfVxuICBmdW5jdGlvbiBpc0RvY3VtZW50KG9iaikgICB7IHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmoubm9kZVR5cGUgPT0gb2JqLkRPQ1VNRU5UX05PREUgfVxuICBmdW5jdGlvbiBpc09iamVjdChvYmopICAgICB7IHJldHVybiB0eXBlKG9iaikgPT0gXCJvYmplY3RcIiB9XG4gIGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KG9iaikgJiYgIWlzV2luZG93KG9iaikgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikgPT0gT2JqZWN0LnByb3RvdHlwZVxuICB9XG5cbiAgZnVuY3Rpb24gbGlrZUFycmF5KG9iaikge1xuICAgIHZhciBsZW5ndGggPSAhIW9iaiAmJiAnbGVuZ3RoJyBpbiBvYmogJiYgb2JqLmxlbmd0aCxcbiAgICAgIHR5cGUgPSAkLnR5cGUob2JqKVxuXG4gICAgcmV0dXJuICdmdW5jdGlvbicgIT0gdHlwZSAmJiAhaXNXaW5kb3cob2JqKSAmJiAoXG4gICAgICAnYXJyYXknID09IHR5cGUgfHwgbGVuZ3RoID09PSAwIHx8XG4gICAgICAgICh0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInICYmIGxlbmd0aCA+IDAgJiYgKGxlbmd0aCAtIDEpIGluIG9iailcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBjb21wYWN0KGFycmF5KSB7IHJldHVybiBmaWx0ZXIuY2FsbChhcnJheSwgZnVuY3Rpb24oaXRlbSl7IHJldHVybiBpdGVtICE9IG51bGwgfSkgfVxuICBmdW5jdGlvbiBmbGF0dGVuKGFycmF5KSB7IHJldHVybiBhcnJheS5sZW5ndGggPiAwID8gJC5mbi5jb25jYXQuYXBwbHkoW10sIGFycmF5KSA6IGFycmF5IH1cbiAgY2FtZWxpemUgPSBmdW5jdGlvbihzdHIpeyByZXR1cm4gc3RyLnJlcGxhY2UoLy0rKC4pPy9nLCBmdW5jdGlvbihtYXRjaCwgY2hyKXsgcmV0dXJuIGNociA/IGNoci50b1VwcGVyQ2FzZSgpIDogJycgfSkgfVxuICBmdW5jdGlvbiBkYXNoZXJpemUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC86Oi9nLCAnLycpXG4gICAgICAgICAgIC5yZXBsYWNlKC8oW0EtWl0rKShbQS1aXVthLXpdKS9nLCAnJDFfJDInKVxuICAgICAgICAgICAucmVwbGFjZSgvKFthLXpcXGRdKShbQS1aXSkvZywgJyQxXyQyJylcbiAgICAgICAgICAgLnJlcGxhY2UoL18vZywgJy0nKVxuICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICB9XG4gIHVuaXEgPSBmdW5jdGlvbihhcnJheSl7IHJldHVybiBmaWx0ZXIuY2FsbChhcnJheSwgZnVuY3Rpb24oaXRlbSwgaWR4KXsgcmV0dXJuIGFycmF5LmluZGV4T2YoaXRlbSkgPT0gaWR4IH0pIH1cblxuICBmdW5jdGlvbiBjbGFzc1JFKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZSBpbiBjbGFzc0NhY2hlID9cbiAgICAgIGNsYXNzQ2FjaGVbbmFtZV0gOiAoY2xhc3NDYWNoZVtuYW1lXSA9IG5ldyBSZWdFeHAoJyhefFxcXFxzKScgKyBuYW1lICsgJyhcXFxcc3wkKScpKVxuICB9XG5cbiAgZnVuY3Rpb24gbWF5YmVBZGRQeChuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiAodHlwZW9mIHZhbHVlID09IFwibnVtYmVyXCIgJiYgIWNzc051bWJlcltkYXNoZXJpemUobmFtZSldKSA/IHZhbHVlICsgXCJweFwiIDogdmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmF1bHREaXNwbGF5KG5vZGVOYW1lKSB7XG4gICAgdmFyIGVsZW1lbnQsIGRpc3BsYXlcbiAgICBpZiAoIWVsZW1lbnREaXNwbGF5W25vZGVOYW1lXSkge1xuICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpXG4gICAgICBkaXNwbGF5ID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCAnJykuZ2V0UHJvcGVydHlWYWx1ZShcImRpc3BsYXlcIilcbiAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KVxuICAgICAgZGlzcGxheSA9PSBcIm5vbmVcIiAmJiAoZGlzcGxheSA9IFwiYmxvY2tcIilcbiAgICAgIGVsZW1lbnREaXNwbGF5W25vZGVOYW1lXSA9IGRpc3BsYXlcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnREaXNwbGF5W25vZGVOYW1lXVxuICB9XG5cbiAgZnVuY3Rpb24gY2hpbGRyZW4oZWxlbWVudCkge1xuICAgIHJldHVybiAnY2hpbGRyZW4nIGluIGVsZW1lbnQgP1xuICAgICAgc2xpY2UuY2FsbChlbGVtZW50LmNoaWxkcmVuKSA6XG4gICAgICAkLm1hcChlbGVtZW50LmNoaWxkTm9kZXMsIGZ1bmN0aW9uKG5vZGUpeyBpZiAobm9kZS5ub2RlVHlwZSA9PSAxKSByZXR1cm4gbm9kZSB9KVxuICB9XG5cbiAgZnVuY3Rpb24gWihkb20sIHNlbGVjdG9yKSB7XG4gICAgdmFyIGksIGxlbiA9IGRvbSA/IGRvbS5sZW5ndGggOiAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB0aGlzW2ldID0gZG9tW2ldXG4gICAgdGhpcy5sZW5ndGggPSBsZW5cbiAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3IgfHwgJydcbiAgfVxuXG4gIC8vIGAkLnplcHRvLmZyYWdtZW50YCB0YWtlcyBhIGh0bWwgc3RyaW5nIGFuZCBhbiBvcHRpb25hbCB0YWcgbmFtZVxuICAvLyB0byBnZW5lcmF0ZSBET00gbm9kZXMgZnJvbSB0aGUgZ2l2ZW4gaHRtbCBzdHJpbmcuXG4gIC8vIFRoZSBnZW5lcmF0ZWQgRE9NIG5vZGVzIGFyZSByZXR1cm5lZCBhcyBhbiBhcnJheS5cbiAgLy8gVGhpcyBmdW5jdGlvbiBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBwbHVnaW5zIGZvciBleGFtcGxlIHRvIG1ha2VcbiAgLy8gaXQgY29tcGF0aWJsZSB3aXRoIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0aGUgRE9NIGZ1bGx5LlxuICB6ZXB0by5mcmFnbWVudCA9IGZ1bmN0aW9uKGh0bWwsIG5hbWUsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgZG9tLCBub2RlcywgY29udGFpbmVyXG5cbiAgICAvLyBBIHNwZWNpYWwgY2FzZSBvcHRpbWl6YXRpb24gZm9yIGEgc2luZ2xlIHRhZ1xuICAgIGlmIChzaW5nbGVUYWdSRS50ZXN0KGh0bWwpKSBkb20gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoUmVnRXhwLiQxKSlcblxuICAgIGlmICghZG9tKSB7XG4gICAgICBpZiAoaHRtbC5yZXBsYWNlKSBodG1sID0gaHRtbC5yZXBsYWNlKHRhZ0V4cGFuZGVyUkUsIFwiPCQxPjwvJDI+XCIpXG4gICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSBuYW1lID0gZnJhZ21lbnRSRS50ZXN0KGh0bWwpICYmIFJlZ0V4cC4kMVxuICAgICAgaWYgKCEobmFtZSBpbiBjb250YWluZXJzKSkgbmFtZSA9ICcqJ1xuXG4gICAgICBjb250YWluZXIgPSBjb250YWluZXJzW25hbWVdXG4gICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJycgKyBodG1sXG4gICAgICBkb20gPSAkLmVhY2goc2xpY2UuY2FsbChjb250YWluZXIuY2hpbGROb2RlcyksIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoaXNQbGFpbk9iamVjdChwcm9wZXJ0aWVzKSkge1xuICAgICAgbm9kZXMgPSAkKGRvbSlcbiAgICAgICQuZWFjaChwcm9wZXJ0aWVzLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChtZXRob2RBdHRyaWJ1dGVzLmluZGV4T2Yoa2V5KSA+IC0xKSBub2Rlc1trZXldKHZhbHVlKVxuICAgICAgICBlbHNlIG5vZGVzLmF0dHIoa2V5LCB2YWx1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGRvbVxuICB9XG5cbiAgLy8gYCQuemVwdG8uWmAgc3dhcHMgb3V0IHRoZSBwcm90b3R5cGUgb2YgdGhlIGdpdmVuIGBkb21gIGFycmF5XG4gIC8vIG9mIG5vZGVzIHdpdGggYCQuZm5gIGFuZCB0aHVzIHN1cHBseWluZyBhbGwgdGhlIFplcHRvIGZ1bmN0aW9uc1xuICAvLyB0byB0aGUgYXJyYXkuIFRoaXMgbWV0aG9kIGNhbiBiZSBvdmVycmlkZGVuIGluIHBsdWdpbnMuXG4gIHplcHRvLlogPSBmdW5jdGlvbihkb20sIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBaKGRvbSwgc2VsZWN0b3IpXG4gIH1cblxuICAvLyBgJC56ZXB0by5pc1pgIHNob3VsZCByZXR1cm4gYHRydWVgIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYSBaZXB0b1xuICAvLyBjb2xsZWN0aW9uLiBUaGlzIG1ldGhvZCBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBwbHVnaW5zLlxuICB6ZXB0by5pc1ogPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgemVwdG8uWlxuICB9XG5cbiAgLy8gYCQuemVwdG8uaW5pdGAgaXMgWmVwdG8ncyBjb3VudGVycGFydCB0byBqUXVlcnkncyBgJC5mbi5pbml0YCBhbmRcbiAgLy8gdGFrZXMgYSBDU1Mgc2VsZWN0b3IgYW5kIGFuIG9wdGlvbmFsIGNvbnRleHQgKGFuZCBoYW5kbGVzIHZhcmlvdXNcbiAgLy8gc3BlY2lhbCBjYXNlcykuXG4gIC8vIFRoaXMgbWV0aG9kIGNhbiBiZSBvdmVycmlkZGVuIGluIHBsdWdpbnMuXG4gIHplcHRvLmluaXQgPSBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHZhciBkb21cbiAgICAvLyBJZiBub3RoaW5nIGdpdmVuLCByZXR1cm4gYW4gZW1wdHkgWmVwdG8gY29sbGVjdGlvblxuICAgIGlmICghc2VsZWN0b3IpIHJldHVybiB6ZXB0by5aKClcbiAgICAvLyBPcHRpbWl6ZSBmb3Igc3RyaW5nIHNlbGVjdG9yc1xuICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJykge1xuICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci50cmltKClcbiAgICAgIC8vIElmIGl0J3MgYSBodG1sIGZyYWdtZW50LCBjcmVhdGUgbm9kZXMgZnJvbSBpdFxuICAgICAgLy8gTm90ZTogSW4gYm90aCBDaHJvbWUgMjEgYW5kIEZpcmVmb3ggMTUsIERPTSBlcnJvciAxMlxuICAgICAgLy8gaXMgdGhyb3duIGlmIHRoZSBmcmFnbWVudCBkb2Vzbid0IGJlZ2luIHdpdGggPFxuICAgICAgaWYgKHNlbGVjdG9yWzBdID09ICc8JyAmJiBmcmFnbWVudFJFLnRlc3Qoc2VsZWN0b3IpKVxuICAgICAgICBkb20gPSB6ZXB0by5mcmFnbWVudChzZWxlY3RvciwgUmVnRXhwLiQxLCBjb250ZXh0KSwgc2VsZWN0b3IgPSBudWxsXG4gICAgICAvLyBJZiB0aGVyZSdzIGEgY29udGV4dCwgY3JlYXRlIGEgY29sbGVjdGlvbiBvbiB0aGF0IGNvbnRleHQgZmlyc3QsIGFuZCBzZWxlY3RcbiAgICAgIC8vIG5vZGVzIGZyb20gdGhlcmVcbiAgICAgIGVsc2UgaWYgKGNvbnRleHQgIT09IHVuZGVmaW5lZCkgcmV0dXJuICQoY29udGV4dCkuZmluZChzZWxlY3RvcilcbiAgICAgIC8vIElmIGl0J3MgYSBDU1Mgc2VsZWN0b3IsIHVzZSBpdCB0byBzZWxlY3Qgbm9kZXMuXG4gICAgICBlbHNlIGRvbSA9IHplcHRvLnFzYShkb2N1bWVudCwgc2VsZWN0b3IpXG4gICAgfVxuICAgIC8vIElmIGEgZnVuY3Rpb24gaXMgZ2l2ZW4sIGNhbGwgaXQgd2hlbiB0aGUgRE9NIGlzIHJlYWR5XG4gICAgZWxzZSBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHJldHVybiAkKGRvY3VtZW50KS5yZWFkeShzZWxlY3RvcilcbiAgICAvLyBJZiBhIFplcHRvIGNvbGxlY3Rpb24gaXMgZ2l2ZW4sIGp1c3QgcmV0dXJuIGl0XG4gICAgZWxzZSBpZiAoemVwdG8uaXNaKHNlbGVjdG9yKSkgcmV0dXJuIHNlbGVjdG9yXG4gICAgZWxzZSB7XG4gICAgICAvLyBub3JtYWxpemUgYXJyYXkgaWYgYW4gYXJyYXkgb2Ygbm9kZXMgaXMgZ2l2ZW5cbiAgICAgIGlmIChpc0FycmF5KHNlbGVjdG9yKSkgZG9tID0gY29tcGFjdChzZWxlY3RvcilcbiAgICAgIC8vIFdyYXAgRE9NIG5vZGVzLlxuICAgICAgZWxzZSBpZiAoaXNPYmplY3Qoc2VsZWN0b3IpKVxuICAgICAgICBkb20gPSBbc2VsZWN0b3JdLCBzZWxlY3RvciA9IG51bGxcbiAgICAgIC8vIElmIGl0J3MgYSBodG1sIGZyYWdtZW50LCBjcmVhdGUgbm9kZXMgZnJvbSBpdFxuICAgICAgZWxzZSBpZiAoZnJhZ21lbnRSRS50ZXN0KHNlbGVjdG9yKSlcbiAgICAgICAgZG9tID0gemVwdG8uZnJhZ21lbnQoc2VsZWN0b3IudHJpbSgpLCBSZWdFeHAuJDEsIGNvbnRleHQpLCBzZWxlY3RvciA9IG51bGxcbiAgICAgIC8vIElmIHRoZXJlJ3MgYSBjb250ZXh0LCBjcmVhdGUgYSBjb2xsZWN0aW9uIG9uIHRoYXQgY29udGV4dCBmaXJzdCwgYW5kIHNlbGVjdFxuICAgICAgLy8gbm9kZXMgZnJvbSB0aGVyZVxuICAgICAgZWxzZSBpZiAoY29udGV4dCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gJChjb250ZXh0KS5maW5kKHNlbGVjdG9yKVxuICAgICAgLy8gQW5kIGxhc3QgYnV0IG5vIGxlYXN0LCBpZiBpdCdzIGEgQ1NTIHNlbGVjdG9yLCB1c2UgaXQgdG8gc2VsZWN0IG5vZGVzLlxuICAgICAgZWxzZSBkb20gPSB6ZXB0by5xc2EoZG9jdW1lbnQsIHNlbGVjdG9yKVxuICAgIH1cbiAgICAvLyBjcmVhdGUgYSBuZXcgWmVwdG8gY29sbGVjdGlvbiBmcm9tIHRoZSBub2RlcyBmb3VuZFxuICAgIHJldHVybiB6ZXB0by5aKGRvbSwgc2VsZWN0b3IpXG4gIH1cblxuICAvLyBgJGAgd2lsbCBiZSB0aGUgYmFzZSBgWmVwdG9gIG9iamVjdC4gV2hlbiBjYWxsaW5nIHRoaXNcbiAgLy8gZnVuY3Rpb24ganVzdCBjYWxsIGAkLnplcHRvLmluaXQsIHdoaWNoIG1ha2VzIHRoZSBpbXBsZW1lbnRhdGlvblxuICAvLyBkZXRhaWxzIG9mIHNlbGVjdGluZyBub2RlcyBhbmQgY3JlYXRpbmcgWmVwdG8gY29sbGVjdGlvbnNcbiAgLy8gcGF0Y2hhYmxlIGluIHBsdWdpbnMuXG4gICQgPSBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCl7XG4gICAgcmV0dXJuIHplcHRvLmluaXQoc2VsZWN0b3IsIGNvbnRleHQpXG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmQodGFyZ2V0LCBzb3VyY2UsIGRlZXApIHtcbiAgICBmb3IgKGtleSBpbiBzb3VyY2UpXG4gICAgICBpZiAoZGVlcCAmJiAoaXNQbGFpbk9iamVjdChzb3VyY2Vba2V5XSkgfHwgaXNBcnJheShzb3VyY2Vba2V5XSkpKSB7XG4gICAgICAgIGlmIChpc1BsYWluT2JqZWN0KHNvdXJjZVtrZXldKSAmJiAhaXNQbGFpbk9iamVjdCh0YXJnZXRba2V5XSkpXG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSB7fVxuICAgICAgICBpZiAoaXNBcnJheShzb3VyY2Vba2V5XSkgJiYgIWlzQXJyYXkodGFyZ2V0W2tleV0pKVxuICAgICAgICAgIHRhcmdldFtrZXldID0gW11cbiAgICAgICAgZXh0ZW5kKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSwgZGVlcClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHNvdXJjZVtrZXldICE9PSB1bmRlZmluZWQpIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgfVxuXG4gIC8vIENvcHkgYWxsIGJ1dCB1bmRlZmluZWQgcHJvcGVydGllcyBmcm9tIG9uZSBvciBtb3JlXG4gIC8vIG9iamVjdHMgdG8gdGhlIGB0YXJnZXRgIG9iamVjdC5cbiAgJC5leHRlbmQgPSBmdW5jdGlvbih0YXJnZXQpe1xuICAgIHZhciBkZWVwLCBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBkZWVwID0gdGFyZ2V0XG4gICAgICB0YXJnZXQgPSBhcmdzLnNoaWZ0KClcbiAgICB9XG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uKGFyZyl7IGV4dGVuZCh0YXJnZXQsIGFyZywgZGVlcCkgfSlcbiAgICByZXR1cm4gdGFyZ2V0XG4gIH1cblxuICAvLyBgJC56ZXB0by5xc2FgIGlzIFplcHRvJ3MgQ1NTIHNlbGVjdG9yIGltcGxlbWVudGF0aW9uIHdoaWNoXG4gIC8vIHVzZXMgYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgIGFuZCBvcHRpbWl6ZXMgZm9yIHNvbWUgc3BlY2lhbCBjYXNlcywgbGlrZSBgI2lkYC5cbiAgLy8gVGhpcyBtZXRob2QgY2FuIGJlIG92ZXJyaWRkZW4gaW4gcGx1Z2lucy5cbiAgemVwdG8ucXNhID0gZnVuY3Rpb24oZWxlbWVudCwgc2VsZWN0b3Ipe1xuICAgIHZhciBmb3VuZCxcbiAgICAgICAgbWF5YmVJRCA9IHNlbGVjdG9yWzBdID09ICcjJyxcbiAgICAgICAgbWF5YmVDbGFzcyA9ICFtYXliZUlEICYmIHNlbGVjdG9yWzBdID09ICcuJyxcbiAgICAgICAgbmFtZU9ubHkgPSBtYXliZUlEIHx8IG1heWJlQ2xhc3MgPyBzZWxlY3Rvci5zbGljZSgxKSA6IHNlbGVjdG9yLCAvLyBFbnN1cmUgdGhhdCBhIDEgY2hhciB0YWcgbmFtZSBzdGlsbCBnZXRzIGNoZWNrZWRcbiAgICAgICAgaXNTaW1wbGUgPSBzaW1wbGVTZWxlY3RvclJFLnRlc3QobmFtZU9ubHkpXG4gICAgcmV0dXJuIChlbGVtZW50LmdldEVsZW1lbnRCeUlkICYmIGlzU2ltcGxlICYmIG1heWJlSUQpID8gLy8gU2FmYXJpIERvY3VtZW50RnJhZ21lbnQgZG9lc24ndCBoYXZlIGdldEVsZW1lbnRCeUlkXG4gICAgICAoIChmb3VuZCA9IGVsZW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZU9ubHkpKSA/IFtmb3VuZF0gOiBbXSApIDpcbiAgICAgIChlbGVtZW50Lm5vZGVUeXBlICE9PSAxICYmIGVsZW1lbnQubm9kZVR5cGUgIT09IDkgJiYgZWxlbWVudC5ub2RlVHlwZSAhPT0gMTEpID8gW10gOlxuICAgICAgc2xpY2UuY2FsbChcbiAgICAgICAgaXNTaW1wbGUgJiYgIW1heWJlSUQgJiYgZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID8gLy8gRG9jdW1lbnRGcmFnbWVudCBkb2Vzbid0IGhhdmUgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZS9UYWdOYW1lXG4gICAgICAgICAgbWF5YmVDbGFzcyA/IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShuYW1lT25seSkgOiAvLyBJZiBpdCdzIHNpbXBsZSwgaXQgY291bGQgYmUgYSBjbGFzc1xuICAgICAgICAgIGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2VsZWN0b3IpIDogLy8gT3IgYSB0YWdcbiAgICAgICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpIC8vIE9yIGl0J3Mgbm90IHNpbXBsZSwgYW5kIHdlIG5lZWQgdG8gcXVlcnkgYWxsXG4gICAgICApXG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXJlZChub2Rlcywgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gc2VsZWN0b3IgPT0gbnVsbCA/ICQobm9kZXMpIDogJChub2RlcykuZmlsdGVyKHNlbGVjdG9yKVxuICB9XG5cbiAgJC5jb250YWlucyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyA/XG4gICAgZnVuY3Rpb24ocGFyZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gcGFyZW50ICE9PSBub2RlICYmIHBhcmVudC5jb250YWlucyhub2RlKVxuICAgIH0gOlxuICAgIGZ1bmN0aW9uKHBhcmVudCwgbm9kZSkge1xuICAgICAgd2hpbGUgKG5vZGUgJiYgKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKVxuICAgICAgICBpZiAobm9kZSA9PT0gcGFyZW50KSByZXR1cm4gdHJ1ZVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gIGZ1bmN0aW9uIGZ1bmNBcmcoY29udGV4dCwgYXJnLCBpZHgsIHBheWxvYWQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbihhcmcpID8gYXJnLmNhbGwoY29udGV4dCwgaWR4LCBwYXlsb2FkKSA6IGFyZ1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0QXR0cmlidXRlKG5vZGUsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFsdWUgPT0gbnVsbCA/IG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpIDogbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpXG4gIH1cblxuICAvLyBhY2Nlc3MgY2xhc3NOYW1lIHByb3BlcnR5IHdoaWxlIHJlc3BlY3RpbmcgU1ZHQW5pbWF0ZWRTdHJpbmdcbiAgZnVuY3Rpb24gY2xhc3NOYW1lKG5vZGUsIHZhbHVlKXtcbiAgICB2YXIga2xhc3MgPSBub2RlLmNsYXNzTmFtZSB8fCAnJyxcbiAgICAgICAgc3ZnICAgPSBrbGFzcyAmJiBrbGFzcy5iYXNlVmFsICE9PSB1bmRlZmluZWRcblxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gc3ZnID8ga2xhc3MuYmFzZVZhbCA6IGtsYXNzXG4gICAgc3ZnID8gKGtsYXNzLmJhc2VWYWwgPSB2YWx1ZSkgOiAobm9kZS5jbGFzc05hbWUgPSB2YWx1ZSlcbiAgfVxuXG4gIC8vIFwidHJ1ZVwiICA9PiB0cnVlXG4gIC8vIFwiZmFsc2VcIiA9PiBmYWxzZVxuICAvLyBcIm51bGxcIiAgPT4gbnVsbFxuICAvLyBcIjQyXCIgICAgPT4gNDJcbiAgLy8gXCI0Mi41XCIgID0+IDQyLjVcbiAgLy8gXCIwOFwiICAgID0+IFwiMDhcIlxuICAvLyBKU09OICAgID0+IHBhcnNlIGlmIHZhbGlkXG4gIC8vIFN0cmluZyAgPT4gc2VsZlxuICBmdW5jdGlvbiBkZXNlcmlhbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB2YWx1ZSA/XG4gICAgICAgIHZhbHVlID09IFwidHJ1ZVwiIHx8XG4gICAgICAgICggdmFsdWUgPT0gXCJmYWxzZVwiID8gZmFsc2UgOlxuICAgICAgICAgIHZhbHVlID09IFwibnVsbFwiID8gbnVsbCA6XG4gICAgICAgICAgK3ZhbHVlICsgXCJcIiA9PSB2YWx1ZSA/ICt2YWx1ZSA6XG4gICAgICAgICAgL15bXFxbXFx7XS8udGVzdCh2YWx1ZSkgPyAkLnBhcnNlSlNPTih2YWx1ZSkgOlxuICAgICAgICAgIHZhbHVlIClcbiAgICAgICAgOiB2YWx1ZVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICB9XG5cbiAgJC50eXBlID0gdHlwZVxuICAkLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uXG4gICQuaXNXaW5kb3cgPSBpc1dpbmRvd1xuICAkLmlzQXJyYXkgPSBpc0FycmF5XG4gICQuaXNQbGFpbk9iamVjdCA9IGlzUGxhaW5PYmplY3RcblxuICAkLmlzRW1wdHlPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgbmFtZVxuICAgIGZvciAobmFtZSBpbiBvYmopIHJldHVybiBmYWxzZVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAkLmlzTnVtZXJpYyA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHZhciBudW0gPSBOdW1iZXIodmFsKSwgdHlwZSA9IHR5cGVvZiB2YWxcbiAgICByZXR1cm4gdmFsICE9IG51bGwgJiYgdHlwZSAhPSAnYm9vbGVhbicgJiZcbiAgICAgICh0eXBlICE9ICdzdHJpbmcnIHx8IHZhbC5sZW5ndGgpICYmXG4gICAgICAhaXNOYU4obnVtKSAmJiBpc0Zpbml0ZShudW0pIHx8IGZhbHNlXG4gIH1cblxuICAkLmluQXJyYXkgPSBmdW5jdGlvbihlbGVtLCBhcnJheSwgaSl7XG4gICAgcmV0dXJuIGVtcHR5QXJyYXkuaW5kZXhPZi5jYWxsKGFycmF5LCBlbGVtLCBpKVxuICB9XG5cbiAgJC5jYW1lbENhc2UgPSBjYW1lbGl6ZVxuICAkLnRyaW0gPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gc3RyID09IG51bGwgPyBcIlwiIDogU3RyaW5nLnByb3RvdHlwZS50cmltLmNhbGwoc3RyKVxuICB9XG5cbiAgLy8gcGx1Z2luIGNvbXBhdGliaWxpdHlcbiAgJC51dWlkID0gMFxuICAkLnN1cHBvcnQgPSB7IH1cbiAgJC5leHByID0geyB9XG4gICQubm9vcCA9IGZ1bmN0aW9uKCkge31cblxuICAkLm1hcCA9IGZ1bmN0aW9uKGVsZW1lbnRzLCBjYWxsYmFjayl7XG4gICAgdmFyIHZhbHVlLCB2YWx1ZXMgPSBbXSwgaSwga2V5XG4gICAgaWYgKGxpa2VBcnJheShlbGVtZW50cykpXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBjYWxsYmFjayhlbGVtZW50c1tpXSwgaSlcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHZhbHVlcy5wdXNoKHZhbHVlKVxuICAgICAgfVxuICAgIGVsc2VcbiAgICAgIGZvciAoa2V5IGluIGVsZW1lbnRzKSB7XG4gICAgICAgIHZhbHVlID0gY2FsbGJhY2soZWxlbWVudHNba2V5XSwga2V5KVxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkgdmFsdWVzLnB1c2godmFsdWUpXG4gICAgICB9XG4gICAgcmV0dXJuIGZsYXR0ZW4odmFsdWVzKVxuICB9XG5cbiAgJC5lYWNoID0gZnVuY3Rpb24oZWxlbWVudHMsIGNhbGxiYWNrKXtcbiAgICB2YXIgaSwga2V5XG4gICAgaWYgKGxpa2VBcnJheShlbGVtZW50cykpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoZWxlbWVudHNbaV0sIGksIGVsZW1lbnRzW2ldKSA9PT0gZmFsc2UpIHJldHVybiBlbGVtZW50c1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGtleSBpbiBlbGVtZW50cylcbiAgICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoZWxlbWVudHNba2V5XSwga2V5LCBlbGVtZW50c1trZXldKSA9PT0gZmFsc2UpIHJldHVybiBlbGVtZW50c1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50c1xuICB9XG5cbiAgJC5ncmVwID0gZnVuY3Rpb24oZWxlbWVudHMsIGNhbGxiYWNrKXtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwoZWxlbWVudHMsIGNhbGxiYWNrKVxuICB9XG5cbiAgaWYgKHdpbmRvdy5KU09OKSAkLnBhcnNlSlNPTiA9IEpTT04ucGFyc2VcblxuICAvLyBQb3B1bGF0ZSB0aGUgY2xhc3MydHlwZSBtYXBcbiAgJC5lYWNoKFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvclwiLnNwbGl0KFwiIFwiKSwgZnVuY3Rpb24oaSwgbmFtZSkge1xuICAgIGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH0pXG5cbiAgLy8gRGVmaW5lIG1ldGhvZHMgdGhhdCB3aWxsIGJlIGF2YWlsYWJsZSBvbiBhbGxcbiAgLy8gWmVwdG8gY29sbGVjdGlvbnNcbiAgJC5mbiA9IHtcbiAgICBjb25zdHJ1Y3RvcjogemVwdG8uWixcbiAgICBsZW5ndGg6IDAsXG5cbiAgICAvLyBCZWNhdXNlIGEgY29sbGVjdGlvbiBhY3RzIGxpa2UgYW4gYXJyYXlcbiAgICAvLyBjb3B5IG92ZXIgdGhlc2UgdXNlZnVsIGFycmF5IGZ1bmN0aW9ucy5cbiAgICBmb3JFYWNoOiBlbXB0eUFycmF5LmZvckVhY2gsXG4gICAgcmVkdWNlOiBlbXB0eUFycmF5LnJlZHVjZSxcbiAgICBwdXNoOiBlbXB0eUFycmF5LnB1c2gsXG4gICAgc29ydDogZW1wdHlBcnJheS5zb3J0LFxuICAgIHNwbGljZTogZW1wdHlBcnJheS5zcGxpY2UsXG4gICAgaW5kZXhPZjogZW1wdHlBcnJheS5pbmRleE9mLFxuICAgIGNvbmNhdDogZnVuY3Rpb24oKXtcbiAgICAgIHZhciBpLCB2YWx1ZSwgYXJncyA9IFtdXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gYXJndW1lbnRzW2ldXG4gICAgICAgIGFyZ3NbaV0gPSB6ZXB0by5pc1oodmFsdWUpID8gdmFsdWUudG9BcnJheSgpIDogdmFsdWVcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb25jYXQuYXBwbHkoemVwdG8uaXNaKHRoaXMpID8gdGhpcy50b0FycmF5KCkgOiB0aGlzLCBhcmdzKVxuICAgIH0sXG5cbiAgICAvLyBgbWFwYCBhbmQgYHNsaWNlYCBpbiB0aGUgalF1ZXJ5IEFQSSB3b3JrIGRpZmZlcmVudGx5XG4gICAgLy8gZnJvbSB0aGVpciBhcnJheSBjb3VudGVycGFydHNcbiAgICBtYXA6IGZ1bmN0aW9uKGZuKXtcbiAgICAgIHJldHVybiAkKCQubWFwKHRoaXMsIGZ1bmN0aW9uKGVsLCBpKXsgcmV0dXJuIGZuLmNhbGwoZWwsIGksIGVsKSB9KSlcbiAgICB9LFxuICAgIHNsaWNlOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuICQoc2xpY2UuYXBwbHkodGhpcywgYXJndW1lbnRzKSlcbiAgICB9LFxuXG4gICAgcmVhZHk6IGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgIC8vIG5lZWQgdG8gY2hlY2sgaWYgZG9jdW1lbnQuYm9keSBleGlzdHMgZm9yIElFIGFzIHRoYXQgYnJvd3NlciByZXBvcnRzXG4gICAgICAvLyBkb2N1bWVudCByZWFkeSB3aGVuIGl0IGhhc24ndCB5ZXQgY3JlYXRlZCB0aGUgYm9keSBlbGVtZW50XG4gICAgICBpZiAocmVhZHlSRS50ZXN0KGRvY3VtZW50LnJlYWR5U3RhdGUpICYmIGRvY3VtZW50LmJvZHkpIGNhbGxiYWNrKCQpXG4gICAgICBlbHNlIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpeyBjYWxsYmFjaygkKSB9LCBmYWxzZSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKGlkeCl7XG4gICAgICByZXR1cm4gaWR4ID09PSB1bmRlZmluZWQgPyBzbGljZS5jYWxsKHRoaXMpIDogdGhpc1tpZHggPj0gMCA/IGlkeCA6IGlkeCArIHRoaXMubGVuZ3RoXVxuICAgIH0sXG4gICAgdG9BcnJheTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZ2V0KCkgfSxcbiAgICBzaXplOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoXG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUgIT0gbnVsbClcbiAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcylcbiAgICAgIH0pXG4gICAgfSxcbiAgICBlYWNoOiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICBlbXB0eUFycmF5LmV2ZXJ5LmNhbGwodGhpcywgZnVuY3Rpb24oZWwsIGlkeCl7XG4gICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKGVsLCBpZHgsIGVsKSAhPT0gZmFsc2VcbiAgICAgIH0pXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgZmlsdGVyOiBmdW5jdGlvbihzZWxlY3Rvcil7XG4gICAgICBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHJldHVybiB0aGlzLm5vdCh0aGlzLm5vdChzZWxlY3RvcikpXG4gICAgICByZXR1cm4gJChmaWx0ZXIuY2FsbCh0aGlzLCBmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIHplcHRvLm1hdGNoZXMoZWxlbWVudCwgc2VsZWN0b3IpXG4gICAgICB9KSlcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24oc2VsZWN0b3IsY29udGV4dCl7XG4gICAgICByZXR1cm4gJCh1bmlxKHRoaXMuY29uY2F0KCQoc2VsZWN0b3IsY29udGV4dCkpKSlcbiAgICB9LFxuICAgIGlzOiBmdW5jdGlvbihzZWxlY3Rvcil7XG4gICAgICByZXR1cm4gdGhpcy5sZW5ndGggPiAwICYmIHplcHRvLm1hdGNoZXModGhpc1swXSwgc2VsZWN0b3IpXG4gICAgfSxcbiAgICBub3Q6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHZhciBub2Rlcz1bXVxuICAgICAgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpICYmIHNlbGVjdG9yLmNhbGwgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgICAgaWYgKCFzZWxlY3Rvci5jYWxsKHRoaXMsaWR4KSkgbm9kZXMucHVzaCh0aGlzKVxuICAgICAgICB9KVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBleGNsdWRlcyA9IHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyA/IHRoaXMuZmlsdGVyKHNlbGVjdG9yKSA6XG4gICAgICAgICAgKGxpa2VBcnJheShzZWxlY3RvcikgJiYgaXNGdW5jdGlvbihzZWxlY3Rvci5pdGVtKSkgPyBzbGljZS5jYWxsKHNlbGVjdG9yKSA6ICQoc2VsZWN0b3IpXG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihlbCl7XG4gICAgICAgICAgaWYgKGV4Y2x1ZGVzLmluZGV4T2YoZWwpIDwgMCkgbm9kZXMucHVzaChlbClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHJldHVybiAkKG5vZGVzKVxuICAgIH0sXG4gICAgaGFzOiBmdW5jdGlvbihzZWxlY3Rvcil7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0KHNlbGVjdG9yKSA/XG4gICAgICAgICAgJC5jb250YWlucyh0aGlzLCBzZWxlY3RvcikgOlxuICAgICAgICAgICQodGhpcykuZmluZChzZWxlY3Rvcikuc2l6ZSgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgZXE6IGZ1bmN0aW9uKGlkeCl7XG4gICAgICByZXR1cm4gaWR4ID09PSAtMSA/IHRoaXMuc2xpY2UoaWR4KSA6IHRoaXMuc2xpY2UoaWR4LCArIGlkeCArIDEpXG4gICAgfSxcbiAgICBmaXJzdDogZnVuY3Rpb24oKXtcbiAgICAgIHZhciBlbCA9IHRoaXNbMF1cbiAgICAgIHJldHVybiBlbCAmJiAhaXNPYmplY3QoZWwpID8gZWwgOiAkKGVsKVxuICAgIH0sXG4gICAgbGFzdDogZnVuY3Rpb24oKXtcbiAgICAgIHZhciBlbCA9IHRoaXNbdGhpcy5sZW5ndGggLSAxXVxuICAgICAgcmV0dXJuIGVsICYmICFpc09iamVjdChlbCkgPyBlbCA6ICQoZWwpXG4gICAgfSxcbiAgICBmaW5kOiBmdW5jdGlvbihzZWxlY3Rvcil7XG4gICAgICB2YXIgcmVzdWx0LCAkdGhpcyA9IHRoaXNcbiAgICAgIGlmICghc2VsZWN0b3IpIHJlc3VsdCA9ICQoKVxuICAgICAgZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09ICdvYmplY3QnKVxuICAgICAgICByZXN1bHQgPSAkKHNlbGVjdG9yKS5maWx0ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXIgbm9kZSA9IHRoaXNcbiAgICAgICAgICByZXR1cm4gZW1wdHlBcnJheS5zb21lLmNhbGwoJHRoaXMsIGZ1bmN0aW9uKHBhcmVudCl7XG4gICAgICAgICAgICByZXR1cm4gJC5jb250YWlucyhwYXJlbnQsIG5vZGUpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIGVsc2UgaWYgKHRoaXMubGVuZ3RoID09IDEpIHJlc3VsdCA9ICQoemVwdG8ucXNhKHRoaXNbMF0sIHNlbGVjdG9yKSlcbiAgICAgIGVsc2UgcmVzdWx0ID0gdGhpcy5tYXAoZnVuY3Rpb24oKXsgcmV0dXJuIHplcHRvLnFzYSh0aGlzLCBzZWxlY3RvcikgfSlcbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9LFxuICAgIGNsb3Nlc3Q6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb250ZXh0KXtcbiAgICAgIHZhciBub2RlcyA9IFtdLCBjb2xsZWN0aW9uID0gdHlwZW9mIHNlbGVjdG9yID09ICdvYmplY3QnICYmICQoc2VsZWN0b3IpXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24oXywgbm9kZSl7XG4gICAgICAgIHdoaWxlIChub2RlICYmICEoY29sbGVjdGlvbiA/IGNvbGxlY3Rpb24uaW5kZXhPZihub2RlKSA+PSAwIDogemVwdG8ubWF0Y2hlcyhub2RlLCBzZWxlY3RvcikpKVxuICAgICAgICAgIG5vZGUgPSBub2RlICE9PSBjb250ZXh0ICYmICFpc0RvY3VtZW50KG5vZGUpICYmIG5vZGUucGFyZW50Tm9kZVxuICAgICAgICBpZiAobm9kZSAmJiBub2Rlcy5pbmRleE9mKG5vZGUpIDwgMCkgbm9kZXMucHVzaChub2RlKVxuICAgICAgfSlcbiAgICAgIHJldHVybiAkKG5vZGVzKVxuICAgIH0sXG4gICAgcGFyZW50czogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgdmFyIGFuY2VzdG9ycyA9IFtdLCBub2RlcyA9IHRoaXNcbiAgICAgIHdoaWxlIChub2Rlcy5sZW5ndGggPiAwKVxuICAgICAgICBub2RlcyA9ICQubWFwKG5vZGVzLCBmdW5jdGlvbihub2RlKXtcbiAgICAgICAgICBpZiAoKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpICYmICFpc0RvY3VtZW50KG5vZGUpICYmIGFuY2VzdG9ycy5pbmRleE9mKG5vZGUpIDwgMCkge1xuICAgICAgICAgICAgYW5jZXN0b3JzLnB1c2gobm9kZSlcbiAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgcmV0dXJuIGZpbHRlcmVkKGFuY2VzdG9ycywgc2VsZWN0b3IpXG4gICAgfSxcbiAgICBwYXJlbnQ6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHJldHVybiBmaWx0ZXJlZCh1bmlxKHRoaXMucGx1Y2soJ3BhcmVudE5vZGUnKSksIHNlbGVjdG9yKVxuICAgIH0sXG4gICAgY2hpbGRyZW46IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHJldHVybiBmaWx0ZXJlZCh0aGlzLm1hcChmdW5jdGlvbigpeyByZXR1cm4gY2hpbGRyZW4odGhpcykgfSksIHNlbGVjdG9yKVxuICAgIH0sXG4gICAgY29udGVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5jb250ZW50RG9jdW1lbnQgfHwgc2xpY2UuY2FsbCh0aGlzLmNoaWxkTm9kZXMpIH0pXG4gICAgfSxcbiAgICBzaWJsaW5nczogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgcmV0dXJuIGZpbHRlcmVkKHRoaXMubWFwKGZ1bmN0aW9uKGksIGVsKXtcbiAgICAgICAgcmV0dXJuIGZpbHRlci5jYWxsKGNoaWxkcmVuKGVsLnBhcmVudE5vZGUpLCBmdW5jdGlvbihjaGlsZCl7IHJldHVybiBjaGlsZCE9PWVsIH0pXG4gICAgICB9KSwgc2VsZWN0b3IpXG4gICAgfSxcbiAgICBlbXB0eTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXsgdGhpcy5pbm5lckhUTUwgPSAnJyB9KVxuICAgIH0sXG4gICAgLy8gYHBsdWNrYCBpcyBib3Jyb3dlZCBmcm9tIFByb3RvdHlwZS5qc1xuICAgIHBsdWNrOiBmdW5jdGlvbihwcm9wZXJ0eSl7XG4gICAgICByZXR1cm4gJC5tYXAodGhpcywgZnVuY3Rpb24oZWwpeyByZXR1cm4gZWxbcHJvcGVydHldIH0pXG4gICAgfSxcbiAgICBzaG93OiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIgJiYgKHRoaXMuc3R5bGUuZGlzcGxheSA9ICcnKVxuICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLCAnJykuZ2V0UHJvcGVydHlWYWx1ZShcImRpc3BsYXlcIikgPT0gXCJub25lXCIpXG4gICAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gZGVmYXVsdERpc3BsYXkodGhpcy5ub2RlTmFtZSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICByZXBsYWNlV2l0aDogZnVuY3Rpb24obmV3Q29udGVudCl7XG4gICAgICByZXR1cm4gdGhpcy5iZWZvcmUobmV3Q29udGVudCkucmVtb3ZlKClcbiAgICB9LFxuICAgIHdyYXA6IGZ1bmN0aW9uKHN0cnVjdHVyZSl7XG4gICAgICB2YXIgZnVuYyA9IGlzRnVuY3Rpb24oc3RydWN0dXJlKVxuICAgICAgaWYgKHRoaXNbMF0gJiYgIWZ1bmMpXG4gICAgICAgIHZhciBkb20gICA9ICQoc3RydWN0dXJlKS5nZXQoMCksXG4gICAgICAgICAgICBjbG9uZSA9IGRvbS5wYXJlbnROb2RlIHx8IHRoaXMubGVuZ3RoID4gMVxuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgJCh0aGlzKS53cmFwQWxsKFxuICAgICAgICAgIGZ1bmMgPyBzdHJ1Y3R1cmUuY2FsbCh0aGlzLCBpbmRleCkgOlxuICAgICAgICAgICAgY2xvbmUgPyBkb20uY2xvbmVOb2RlKHRydWUpIDogZG9tXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgfSxcbiAgICB3cmFwQWxsOiBmdW5jdGlvbihzdHJ1Y3R1cmUpe1xuICAgICAgaWYgKHRoaXNbMF0pIHtcbiAgICAgICAgJCh0aGlzWzBdKS5iZWZvcmUoc3RydWN0dXJlID0gJChzdHJ1Y3R1cmUpKVxuICAgICAgICB2YXIgY2hpbGRyZW5cbiAgICAgICAgLy8gZHJpbGwgZG93biB0byB0aGUgaW5tb3N0IGVsZW1lbnRcbiAgICAgICAgd2hpbGUgKChjaGlsZHJlbiA9IHN0cnVjdHVyZS5jaGlsZHJlbigpKS5sZW5ndGgpIHN0cnVjdHVyZSA9IGNoaWxkcmVuLmZpcnN0KClcbiAgICAgICAgJChzdHJ1Y3R1cmUpLmFwcGVuZCh0aGlzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIHdyYXBJbm5lcjogZnVuY3Rpb24oc3RydWN0dXJlKXtcbiAgICAgIHZhciBmdW5jID0gaXNGdW5jdGlvbihzdHJ1Y3R1cmUpXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpLCBjb250ZW50cyA9IHNlbGYuY29udGVudHMoKSxcbiAgICAgICAgICAgIGRvbSAgPSBmdW5jID8gc3RydWN0dXJlLmNhbGwodGhpcywgaW5kZXgpIDogc3RydWN0dXJlXG4gICAgICAgIGNvbnRlbnRzLmxlbmd0aCA/IGNvbnRlbnRzLndyYXBBbGwoZG9tKSA6IHNlbGYuYXBwZW5kKGRvbSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICB1bndyYXA6IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5yZXBsYWNlV2l0aCgkKHRoaXMpLmNoaWxkcmVuKCkpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGNsb25lOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmNsb25lTm9kZSh0cnVlKSB9KVxuICAgIH0sXG4gICAgaGlkZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgfSxcbiAgICB0b2dnbGU6IGZ1bmN0aW9uKHNldHRpbmcpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZWwgPSAkKHRoaXMpXG4gICAgICAgIDsoc2V0dGluZyA9PT0gdW5kZWZpbmVkID8gZWwuY3NzKFwiZGlzcGxheVwiKSA9PSBcIm5vbmVcIiA6IHNldHRpbmcpID8gZWwuc2hvdygpIDogZWwuaGlkZSgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgcHJldjogZnVuY3Rpb24oc2VsZWN0b3IpeyByZXR1cm4gJCh0aGlzLnBsdWNrKCdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJykpLmZpbHRlcihzZWxlY3RvciB8fCAnKicpIH0sXG4gICAgbmV4dDogZnVuY3Rpb24oc2VsZWN0b3IpeyByZXR1cm4gJCh0aGlzLnBsdWNrKCduZXh0RWxlbWVudFNpYmxpbmcnKSkuZmlsdGVyKHNlbGVjdG9yIHx8ICcqJykgfSxcbiAgICBodG1sOiBmdW5jdGlvbihodG1sKXtcbiAgICAgIHJldHVybiAwIGluIGFyZ3VtZW50cyA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHZhciBvcmlnaW5IdG1sID0gdGhpcy5pbm5lckhUTUxcbiAgICAgICAgICAkKHRoaXMpLmVtcHR5KCkuYXBwZW5kKCBmdW5jQXJnKHRoaXMsIGh0bWwsIGlkeCwgb3JpZ2luSHRtbCkgKVxuICAgICAgICB9KSA6XG4gICAgICAgICgwIGluIHRoaXMgPyB0aGlzWzBdLmlubmVySFRNTCA6IG51bGwpXG4gICAgfSxcbiAgICB0ZXh0OiBmdW5jdGlvbih0ZXh0KXtcbiAgICAgIHJldHVybiAwIGluIGFyZ3VtZW50cyA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHZhciBuZXdUZXh0ID0gZnVuY0FyZyh0aGlzLCB0ZXh0LCBpZHgsIHRoaXMudGV4dENvbnRlbnQpXG4gICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IG5ld1RleHQgPT0gbnVsbCA/ICcnIDogJycrbmV3VGV4dFxuICAgICAgICB9KSA6XG4gICAgICAgICgwIGluIHRoaXMgPyB0aGlzLnBsdWNrKCd0ZXh0Q29udGVudCcpLmpvaW4oXCJcIikgOiBudWxsKVxuICAgIH0sXG4gICAgYXR0cjogZnVuY3Rpb24obmFtZSwgdmFsdWUpe1xuICAgICAgdmFyIHJlc3VsdFxuICAgICAgcmV0dXJuICh0eXBlb2YgbmFtZSA9PSAnc3RyaW5nJyAmJiAhKDEgaW4gYXJndW1lbnRzKSkgP1xuICAgICAgICAoMCBpbiB0aGlzICYmIHRoaXNbMF0ubm9kZVR5cGUgPT0gMSAmJiAocmVzdWx0ID0gdGhpc1swXS5nZXRBdHRyaWJ1dGUobmFtZSkpICE9IG51bGwgPyByZXN1bHQgOiB1bmRlZmluZWQpIDpcbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgICAgaWYgKHRoaXMubm9kZVR5cGUgIT09IDEpIHJldHVyblxuICAgICAgICAgIGlmIChpc09iamVjdChuYW1lKSkgZm9yIChrZXkgaW4gbmFtZSkgc2V0QXR0cmlidXRlKHRoaXMsIGtleSwgbmFtZVtrZXldKVxuICAgICAgICAgIGVsc2Ugc2V0QXR0cmlidXRlKHRoaXMsIG5hbWUsIGZ1bmNBcmcodGhpcywgdmFsdWUsIGlkeCwgdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSkpKVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgcmVtb3ZlQXR0cjogZnVuY3Rpb24obmFtZSl7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7IHRoaXMubm9kZVR5cGUgPT09IDEgJiYgbmFtZS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlKXtcbiAgICAgICAgc2V0QXR0cmlidXRlKHRoaXMsIGF0dHJpYnV0ZSlcbiAgICAgIH0sIHRoaXMpfSlcbiAgICB9LFxuICAgIHByb3A6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKXtcbiAgICAgIG5hbWUgPSBwcm9wTWFwW25hbWVdIHx8IG5hbWVcbiAgICAgIHJldHVybiAoMSBpbiBhcmd1bWVudHMpID9cbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgICAgdGhpc1tuYW1lXSA9IGZ1bmNBcmcodGhpcywgdmFsdWUsIGlkeCwgdGhpc1tuYW1lXSlcbiAgICAgICAgfSkgOlxuICAgICAgICAodGhpc1swXSAmJiB0aGlzWzBdW25hbWVdKVxuICAgIH0sXG4gICAgcmVtb3ZlUHJvcDogZnVuY3Rpb24obmFtZSl7XG4gICAgICBuYW1lID0gcHJvcE1hcFtuYW1lXSB8fCBuYW1lXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7IGRlbGV0ZSB0aGlzW25hbWVdIH0pXG4gICAgfSxcbiAgICBkYXRhOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSl7XG4gICAgICB2YXIgYXR0ck5hbWUgPSAnZGF0YS0nICsgbmFtZS5yZXBsYWNlKGNhcGl0YWxSRSwgJy0kMScpLnRvTG93ZXJDYXNlKClcblxuICAgICAgdmFyIGRhdGEgPSAoMSBpbiBhcmd1bWVudHMpID9cbiAgICAgICAgdGhpcy5hdHRyKGF0dHJOYW1lLCB2YWx1ZSkgOlxuICAgICAgICB0aGlzLmF0dHIoYXR0ck5hbWUpXG5cbiAgICAgIHJldHVybiBkYXRhICE9PSBudWxsID8gZGVzZXJpYWxpemVWYWx1ZShkYXRhKSA6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgdmFsOiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZiAoMCBpbiBhcmd1bWVudHMpIHtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gXCJcIlxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgICAgdGhpcy52YWx1ZSA9IGZ1bmNBcmcodGhpcywgdmFsdWUsIGlkeCwgdGhpcy52YWx1ZSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzWzBdICYmICh0aGlzWzBdLm11bHRpcGxlID9cbiAgICAgICAgICAgJCh0aGlzWzBdKS5maW5kKCdvcHRpb24nKS5maWx0ZXIoZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgfSkucGx1Y2soJ3ZhbHVlJykgOlxuICAgICAgICAgICB0aGlzWzBdLnZhbHVlKVxuICAgICAgfVxuICAgIH0sXG4gICAgb2Zmc2V0OiBmdW5jdGlvbihjb29yZGluYXRlcyl7XG4gICAgICBpZiAoY29vcmRpbmF0ZXMpIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgY29vcmRzID0gZnVuY0FyZyh0aGlzLCBjb29yZGluYXRlcywgaW5kZXgsICR0aGlzLm9mZnNldCgpKSxcbiAgICAgICAgICAgIHBhcmVudE9mZnNldCA9ICR0aGlzLm9mZnNldFBhcmVudCgpLm9mZnNldCgpLFxuICAgICAgICAgICAgcHJvcHMgPSB7XG4gICAgICAgICAgICAgIHRvcDogIGNvb3Jkcy50b3AgIC0gcGFyZW50T2Zmc2V0LnRvcCxcbiAgICAgICAgICAgICAgbGVmdDogY29vcmRzLmxlZnQgLSBwYXJlbnRPZmZzZXQubGVmdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIGlmICgkdGhpcy5jc3MoJ3Bvc2l0aW9uJykgPT0gJ3N0YXRpYycpIHByb3BzWydwb3NpdGlvbiddID0gJ3JlbGF0aXZlJ1xuICAgICAgICAkdGhpcy5jc3MocHJvcHMpXG4gICAgICB9KVxuICAgICAgaWYgKCF0aGlzLmxlbmd0aCkgcmV0dXJuIG51bGxcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgIT09IHRoaXNbMF0gJiYgISQuY29udGFpbnMoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzWzBdKSlcbiAgICAgICAgcmV0dXJuIHt0b3A6IDAsIGxlZnQ6IDB9XG4gICAgICB2YXIgb2JqID0gdGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogb2JqLmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgICAgIHRvcDogb2JqLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCxcbiAgICAgICAgd2lkdGg6IE1hdGgucm91bmQob2JqLndpZHRoKSxcbiAgICAgICAgaGVpZ2h0OiBNYXRoLnJvdW5kKG9iai5oZWlnaHQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjc3M6IGZ1bmN0aW9uKHByb3BlcnR5LCB2YWx1ZSl7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzWzBdXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVyblxuICAgICAgICAgIHJldHVybiBlbGVtZW50LnN0eWxlW2NhbWVsaXplKHByb3BlcnR5KV0gfHwgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCAnJykuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSlcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHByb3BlcnR5KSkge1xuICAgICAgICAgIGlmICghZWxlbWVudCkgcmV0dXJuXG4gICAgICAgICAgdmFyIHByb3BzID0ge31cbiAgICAgICAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgJycpXG4gICAgICAgICAgJC5lYWNoKHByb3BlcnR5LCBmdW5jdGlvbihfLCBwcm9wKXtcbiAgICAgICAgICAgIHByb3BzW3Byb3BdID0gKGVsZW1lbnQuc3R5bGVbY2FtZWxpemUocHJvcCldIHx8IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBwcm9wc1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBjc3MgPSAnJ1xuICAgICAgaWYgKHR5cGUocHJvcGVydHkpID09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApXG4gICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCl7IHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkoZGFzaGVyaXplKHByb3BlcnR5KSkgfSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNzcyA9IGRhc2hlcml6ZShwcm9wZXJ0eSkgKyBcIjpcIiArIG1heWJlQWRkUHgocHJvcGVydHksIHZhbHVlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChrZXkgaW4gcHJvcGVydHkpXG4gICAgICAgICAgaWYgKCFwcm9wZXJ0eVtrZXldICYmIHByb3BlcnR5W2tleV0gIT09IDApXG4gICAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKXsgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShkYXNoZXJpemUoa2V5KSkgfSlcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjc3MgKz0gZGFzaGVyaXplKGtleSkgKyAnOicgKyBtYXliZUFkZFB4KGtleSwgcHJvcGVydHlba2V5XSkgKyAnOydcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpeyB0aGlzLnN0eWxlLmNzc1RleHQgKz0gJzsnICsgY3NzIH0pXG4gICAgfSxcbiAgICBpbmRleDogZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICByZXR1cm4gZWxlbWVudCA/IHRoaXMuaW5kZXhPZigkKGVsZW1lbnQpWzBdKSA6IHRoaXMucGFyZW50KCkuY2hpbGRyZW4oKS5pbmRleE9mKHRoaXNbMF0pXG4gICAgfSxcbiAgICBoYXNDbGFzczogZnVuY3Rpb24obmFtZSl7XG4gICAgICBpZiAoIW5hbWUpIHJldHVybiBmYWxzZVxuICAgICAgcmV0dXJuIGVtcHR5QXJyYXkuc29tZS5jYWxsKHRoaXMsIGZ1bmN0aW9uKGVsKXtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVzdChjbGFzc05hbWUoZWwpKVxuICAgICAgfSwgY2xhc3NSRShuYW1lKSlcbiAgICB9LFxuICAgIGFkZENsYXNzOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgIGlmICghbmFtZSkgcmV0dXJuIHRoaXNcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaWR4KXtcbiAgICAgICAgaWYgKCEoJ2NsYXNzTmFtZScgaW4gdGhpcykpIHJldHVyblxuICAgICAgICBjbGFzc0xpc3QgPSBbXVxuICAgICAgICB2YXIgY2xzID0gY2xhc3NOYW1lKHRoaXMpLCBuZXdOYW1lID0gZnVuY0FyZyh0aGlzLCBuYW1lLCBpZHgsIGNscylcbiAgICAgICAgbmV3TmFtZS5zcGxpdCgvXFxzKy9nKS5mb3JFYWNoKGZ1bmN0aW9uKGtsYXNzKXtcbiAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3Moa2xhc3MpKSBjbGFzc0xpc3QucHVzaChrbGFzcylcbiAgICAgICAgfSwgdGhpcylcbiAgICAgICAgY2xhc3NMaXN0Lmxlbmd0aCAmJiBjbGFzc05hbWUodGhpcywgY2xzICsgKGNscyA/IFwiIFwiIDogXCJcIikgKyBjbGFzc0xpc3Quam9pbihcIiBcIikpXG4gICAgICB9KVxuICAgIH0sXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICBpZiAoISgnY2xhc3NOYW1lJyBpbiB0aGlzKSkgcmV0dXJuXG4gICAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHJldHVybiBjbGFzc05hbWUodGhpcywgJycpXG4gICAgICAgIGNsYXNzTGlzdCA9IGNsYXNzTmFtZSh0aGlzKVxuICAgICAgICBmdW5jQXJnKHRoaXMsIG5hbWUsIGlkeCwgY2xhc3NMaXN0KS5zcGxpdCgvXFxzKy9nKS5mb3JFYWNoKGZ1bmN0aW9uKGtsYXNzKXtcbiAgICAgICAgICBjbGFzc0xpc3QgPSBjbGFzc0xpc3QucmVwbGFjZShjbGFzc1JFKGtsYXNzKSwgXCIgXCIpXG4gICAgICAgIH0pXG4gICAgICAgIGNsYXNzTmFtZSh0aGlzLCBjbGFzc0xpc3QudHJpbSgpKVxuICAgICAgfSlcbiAgICB9LFxuICAgIHRvZ2dsZUNsYXNzOiBmdW5jdGlvbihuYW1lLCB3aGVuKXtcbiAgICAgIGlmICghbmFtZSkgcmV0dXJuIHRoaXNcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaWR4KXtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSwgbmFtZXMgPSBmdW5jQXJnKHRoaXMsIG5hbWUsIGlkeCwgY2xhc3NOYW1lKHRoaXMpKVxuICAgICAgICBuYW1lcy5zcGxpdCgvXFxzKy9nKS5mb3JFYWNoKGZ1bmN0aW9uKGtsYXNzKXtcbiAgICAgICAgICAod2hlbiA9PT0gdW5kZWZpbmVkID8gISR0aGlzLmhhc0NsYXNzKGtsYXNzKSA6IHdoZW4pID9cbiAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKGtsYXNzKSA6ICR0aGlzLnJlbW92ZUNsYXNzKGtsYXNzKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9LFxuICAgIHNjcm9sbFRvcDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYgKCF0aGlzLmxlbmd0aCkgcmV0dXJuXG4gICAgICB2YXIgaGFzU2Nyb2xsVG9wID0gJ3Njcm9sbFRvcCcgaW4gdGhpc1swXVxuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBoYXNTY3JvbGxUb3AgPyB0aGlzWzBdLnNjcm9sbFRvcCA6IHRoaXNbMF0ucGFnZVlPZmZzZXRcbiAgICAgIHJldHVybiB0aGlzLmVhY2goaGFzU2Nyb2xsVG9wID9cbiAgICAgICAgZnVuY3Rpb24oKXsgdGhpcy5zY3JvbGxUb3AgPSB2YWx1ZSB9IDpcbiAgICAgICAgZnVuY3Rpb24oKXsgdGhpcy5zY3JvbGxUbyh0aGlzLnNjcm9sbFgsIHZhbHVlKSB9KVxuICAgIH0sXG4gICAgc2Nyb2xsTGVmdDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYgKCF0aGlzLmxlbmd0aCkgcmV0dXJuXG4gICAgICB2YXIgaGFzU2Nyb2xsTGVmdCA9ICdzY3JvbGxMZWZ0JyBpbiB0aGlzWzBdXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGhhc1Njcm9sbExlZnQgPyB0aGlzWzBdLnNjcm9sbExlZnQgOiB0aGlzWzBdLnBhZ2VYT2Zmc2V0XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGhhc1Njcm9sbExlZnQgP1xuICAgICAgICBmdW5jdGlvbigpeyB0aGlzLnNjcm9sbExlZnQgPSB2YWx1ZSB9IDpcbiAgICAgICAgZnVuY3Rpb24oKXsgdGhpcy5zY3JvbGxUbyh2YWx1ZSwgdGhpcy5zY3JvbGxZKSB9KVxuICAgIH0sXG4gICAgcG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICAgIHZhciBlbGVtID0gdGhpc1swXSxcbiAgICAgICAgLy8gR2V0ICpyZWFsKiBvZmZzZXRQYXJlbnRcbiAgICAgICAgb2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQoKSxcbiAgICAgICAgLy8gR2V0IGNvcnJlY3Qgb2Zmc2V0c1xuICAgICAgICBvZmZzZXQgICAgICAgPSB0aGlzLm9mZnNldCgpLFxuICAgICAgICBwYXJlbnRPZmZzZXQgPSByb290Tm9kZVJFLnRlc3Qob2Zmc2V0UGFyZW50WzBdLm5vZGVOYW1lKSA/IHsgdG9wOiAwLCBsZWZ0OiAwIH0gOiBvZmZzZXRQYXJlbnQub2Zmc2V0KClcblxuICAgICAgLy8gU3VidHJhY3QgZWxlbWVudCBtYXJnaW5zXG4gICAgICAvLyBub3RlOiB3aGVuIGFuIGVsZW1lbnQgaGFzIG1hcmdpbjogYXV0byB0aGUgb2Zmc2V0TGVmdCBhbmQgbWFyZ2luTGVmdFxuICAgICAgLy8gYXJlIHRoZSBzYW1lIGluIFNhZmFyaSBjYXVzaW5nIG9mZnNldC5sZWZ0IHRvIGluY29ycmVjdGx5IGJlIDBcbiAgICAgIG9mZnNldC50b3AgIC09IHBhcnNlRmxvYXQoICQoZWxlbSkuY3NzKCdtYXJnaW4tdG9wJykgKSB8fCAwXG4gICAgICBvZmZzZXQubGVmdCAtPSBwYXJzZUZsb2F0KCAkKGVsZW0pLmNzcygnbWFyZ2luLWxlZnQnKSApIHx8IDBcblxuICAgICAgLy8gQWRkIG9mZnNldFBhcmVudCBib3JkZXJzXG4gICAgICBwYXJlbnRPZmZzZXQudG9wICArPSBwYXJzZUZsb2F0KCAkKG9mZnNldFBhcmVudFswXSkuY3NzKCdib3JkZXItdG9wLXdpZHRoJykgKSB8fCAwXG4gICAgICBwYXJlbnRPZmZzZXQubGVmdCArPSBwYXJzZUZsb2F0KCAkKG9mZnNldFBhcmVudFswXSkuY3NzKCdib3JkZXItbGVmdC13aWR0aCcpICkgfHwgMFxuXG4gICAgICAvLyBTdWJ0cmFjdCB0aGUgdHdvIG9mZnNldHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogIG9mZnNldC50b3AgIC0gcGFyZW50T2Zmc2V0LnRvcCxcbiAgICAgICAgbGVmdDogb2Zmc2V0LmxlZnQgLSBwYXJlbnRPZmZzZXQubGVmdFxuICAgICAgfVxuICAgIH0sXG4gICAgb2Zmc2V0UGFyZW50OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnQuYm9keVxuICAgICAgICB3aGlsZSAocGFyZW50ICYmICFyb290Tm9kZVJFLnRlc3QocGFyZW50Lm5vZGVOYW1lKSAmJiAkKHBhcmVudCkuY3NzKFwicG9zaXRpb25cIikgPT0gXCJzdGF0aWNcIilcbiAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQub2Zmc2V0UGFyZW50XG4gICAgICAgIHJldHVybiBwYXJlbnRcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLy8gZm9yIG5vd1xuICAkLmZuLmRldGFjaCA9ICQuZm4ucmVtb3ZlXG5cbiAgLy8gR2VuZXJhdGUgdGhlIGB3aWR0aGAgYW5kIGBoZWlnaHRgIGZ1bmN0aW9uc1xuICA7Wyd3aWR0aCcsICdoZWlnaHQnXS5mb3JFYWNoKGZ1bmN0aW9uKGRpbWVuc2lvbil7XG4gICAgdmFyIGRpbWVuc2lvblByb3BlcnR5ID1cbiAgICAgIGRpbWVuc2lvbi5yZXBsYWNlKC8uLywgZnVuY3Rpb24obSl7IHJldHVybiBtWzBdLnRvVXBwZXJDYXNlKCkgfSlcblxuICAgICQuZm5bZGltZW5zaW9uXSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIHZhciBvZmZzZXQsIGVsID0gdGhpc1swXVxuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBpc1dpbmRvdyhlbCkgPyBlbFsnaW5uZXInICsgZGltZW5zaW9uUHJvcGVydHldIDpcbiAgICAgICAgaXNEb2N1bWVudChlbCkgPyBlbC5kb2N1bWVudEVsZW1lbnRbJ3Njcm9sbCcgKyBkaW1lbnNpb25Qcm9wZXJ0eV0gOlxuICAgICAgICAob2Zmc2V0ID0gdGhpcy5vZmZzZXQoKSkgJiYgb2Zmc2V0W2RpbWVuc2lvbl1cbiAgICAgIGVsc2UgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICBlbCA9ICQodGhpcylcbiAgICAgICAgZWwuY3NzKGRpbWVuc2lvbiwgZnVuY0FyZyh0aGlzLCB2YWx1ZSwgaWR4LCBlbFtkaW1lbnNpb25dKCkpKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gdHJhdmVyc2VOb2RlKG5vZGUsIGZ1bikge1xuICAgIGZ1bihub2RlKVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspXG4gICAgICB0cmF2ZXJzZU5vZGUobm9kZS5jaGlsZE5vZGVzW2ldLCBmdW4pXG4gIH1cblxuICAvLyBHZW5lcmF0ZSB0aGUgYGFmdGVyYCwgYHByZXBlbmRgLCBgYmVmb3JlYCwgYGFwcGVuZGAsXG4gIC8vIGBpbnNlcnRBZnRlcmAsIGBpbnNlcnRCZWZvcmVgLCBgYXBwZW5kVG9gLCBhbmQgYHByZXBlbmRUb2AgbWV0aG9kcy5cbiAgYWRqYWNlbmN5T3BlcmF0b3JzLmZvckVhY2goZnVuY3Rpb24ob3BlcmF0b3IsIG9wZXJhdG9ySW5kZXgpIHtcbiAgICB2YXIgaW5zaWRlID0gb3BlcmF0b3JJbmRleCAlIDIgLy89PiBwcmVwZW5kLCBhcHBlbmRcblxuICAgICQuZm5bb3BlcmF0b3JdID0gZnVuY3Rpb24oKXtcbiAgICAgIC8vIGFyZ3VtZW50cyBjYW4gYmUgbm9kZXMsIGFycmF5cyBvZiBub2RlcywgWmVwdG8gb2JqZWN0cyBhbmQgSFRNTCBzdHJpbmdzXG4gICAgICB2YXIgYXJnVHlwZSwgbm9kZXMgPSAkLm1hcChhcmd1bWVudHMsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICAgICAgdmFyIGFyciA9IFtdXG4gICAgICAgICAgICBhcmdUeXBlID0gdHlwZShhcmcpXG4gICAgICAgICAgICBpZiAoYXJnVHlwZSA9PSBcImFycmF5XCIpIHtcbiAgICAgICAgICAgICAgYXJnLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwubm9kZVR5cGUgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGFyci5wdXNoKGVsKVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCQuemVwdG8uaXNaKGVsKSkgcmV0dXJuIGFyciA9IGFyci5jb25jYXQoZWwuZ2V0KCkpXG4gICAgICAgICAgICAgICAgYXJyID0gYXJyLmNvbmNhdCh6ZXB0by5mcmFnbWVudChlbCkpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHJldHVybiBhcnJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhcmdUeXBlID09IFwib2JqZWN0XCIgfHwgYXJnID09IG51bGwgP1xuICAgICAgICAgICAgICBhcmcgOiB6ZXB0by5mcmFnbWVudChhcmcpXG4gICAgICAgICAgfSksXG4gICAgICAgICAgcGFyZW50LCBjb3B5QnlDbG9uZSA9IHRoaXMubGVuZ3RoID4gMVxuICAgICAgaWYgKG5vZGVzLmxlbmd0aCA8IDEpIHJldHVybiB0aGlzXG5cbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oXywgdGFyZ2V0KXtcbiAgICAgICAgcGFyZW50ID0gaW5zaWRlID8gdGFyZ2V0IDogdGFyZ2V0LnBhcmVudE5vZGVcblxuICAgICAgICAvLyBjb252ZXJ0IGFsbCBtZXRob2RzIHRvIGEgXCJiZWZvcmVcIiBvcGVyYXRpb25cbiAgICAgICAgdGFyZ2V0ID0gb3BlcmF0b3JJbmRleCA9PSAwID8gdGFyZ2V0Lm5leHRTaWJsaW5nIDpcbiAgICAgICAgICAgICAgICAgb3BlcmF0b3JJbmRleCA9PSAxID8gdGFyZ2V0LmZpcnN0Q2hpbGQgOlxuICAgICAgICAgICAgICAgICBvcGVyYXRvckluZGV4ID09IDIgPyB0YXJnZXQgOlxuICAgICAgICAgICAgICAgICBudWxsXG5cbiAgICAgICAgdmFyIHBhcmVudEluRG9jdW1lbnQgPSAkLmNvbnRhaW5zKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgcGFyZW50KVxuXG4gICAgICAgIG5vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSl7XG4gICAgICAgICAgaWYgKGNvcHlCeUNsb25lKSBub2RlID0gbm9kZS5jbG9uZU5vZGUodHJ1ZSlcbiAgICAgICAgICBlbHNlIGlmICghcGFyZW50KSByZXR1cm4gJChub2RlKS5yZW1vdmUoKVxuXG4gICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCB0YXJnZXQpXG4gICAgICAgICAgaWYgKHBhcmVudEluRG9jdW1lbnQpIHRyYXZlcnNlTm9kZShub2RlLCBmdW5jdGlvbihlbCl7XG4gICAgICAgICAgICBpZiAoZWwubm9kZU5hbWUgIT0gbnVsbCAmJiBlbC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0NSSVBUJyAmJlxuICAgICAgICAgICAgICAgKCFlbC50eXBlIHx8IGVsLnR5cGUgPT09ICd0ZXh0L2phdmFzY3JpcHQnKSAmJiAhZWwuc3JjKXtcbiAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGVsLm93bmVyRG9jdW1lbnQgPyBlbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IDogd2luZG93XG4gICAgICAgICAgICAgIHRhcmdldFsnZXZhbCddLmNhbGwodGFyZ2V0LCBlbC5pbm5lckhUTUwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gYWZ0ZXIgICAgPT4gaW5zZXJ0QWZ0ZXJcbiAgICAvLyBwcmVwZW5kICA9PiBwcmVwZW5kVG9cbiAgICAvLyBiZWZvcmUgICA9PiBpbnNlcnRCZWZvcmVcbiAgICAvLyBhcHBlbmQgICA9PiBhcHBlbmRUb1xuICAgICQuZm5baW5zaWRlID8gb3BlcmF0b3IrJ1RvJyA6ICdpbnNlcnQnKyhvcGVyYXRvckluZGV4ID8gJ0JlZm9yZScgOiAnQWZ0ZXInKV0gPSBmdW5jdGlvbihodG1sKXtcbiAgICAgICQoaHRtbClbb3BlcmF0b3JdKHRoaXMpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgfSlcblxuICB6ZXB0by5aLnByb3RvdHlwZSA9IFoucHJvdG90eXBlID0gJC5mblxuXG4gIC8vIEV4cG9ydCBpbnRlcm5hbCBBUEkgZnVuY3Rpb25zIGluIHRoZSBgJC56ZXB0b2AgbmFtZXNwYWNlXG4gIHplcHRvLnVuaXEgPSB1bmlxXG4gIHplcHRvLmRlc2VyaWFsaXplVmFsdWUgPSBkZXNlcmlhbGl6ZVZhbHVlXG4gICQuemVwdG8gPSB6ZXB0b1xuXG4gIHJldHVybiAkXG59KSgpXG5cbjsoZnVuY3Rpb24oJCl7XG4gIHZhciBfemlkID0gMSwgdW5kZWZpbmVkLFxuICAgICAgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UsXG4gICAgICBpc0Z1bmN0aW9uID0gJC5pc0Z1bmN0aW9uLFxuICAgICAgaXNTdHJpbmcgPSBmdW5jdGlvbihvYmopeyByZXR1cm4gdHlwZW9mIG9iaiA9PSAnc3RyaW5nJyB9LFxuICAgICAgaGFuZGxlcnMgPSB7fSxcbiAgICAgIHNwZWNpYWxFdmVudHM9e30sXG4gICAgICBmb2N1c2luU3VwcG9ydGVkID0gJ29uZm9jdXNpbicgaW4gd2luZG93LFxuICAgICAgZm9jdXMgPSB7IGZvY3VzOiAnZm9jdXNpbicsIGJsdXI6ICdmb2N1c291dCcgfSxcbiAgICAgIGhvdmVyID0geyBtb3VzZWVudGVyOiAnbW91c2VvdmVyJywgbW91c2VsZWF2ZTogJ21vdXNlb3V0JyB9XG5cbiAgc3BlY2lhbEV2ZW50cy5jbGljayA9IHNwZWNpYWxFdmVudHMubW91c2Vkb3duID0gc3BlY2lhbEV2ZW50cy5tb3VzZXVwID0gc3BlY2lhbEV2ZW50cy5tb3VzZW1vdmUgPSAnTW91c2VFdmVudHMnXG5cbiAgZnVuY3Rpb24gemlkKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5femlkIHx8IChlbGVtZW50Ll96aWQgPSBfemlkKyspXG4gIH1cbiAgZnVuY3Rpb24gZmluZEhhbmRsZXJzKGVsZW1lbnQsIGV2ZW50LCBmbiwgc2VsZWN0b3IpIHtcbiAgICBldmVudCA9IHBhcnNlKGV2ZW50KVxuICAgIGlmIChldmVudC5ucykgdmFyIG1hdGNoZXIgPSBtYXRjaGVyRm9yKGV2ZW50Lm5zKVxuICAgIHJldHVybiAoaGFuZGxlcnNbemlkKGVsZW1lbnQpXSB8fCBbXSkuZmlsdGVyKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBoYW5kbGVyXG4gICAgICAgICYmICghZXZlbnQuZSAgfHwgaGFuZGxlci5lID09IGV2ZW50LmUpXG4gICAgICAgICYmICghZXZlbnQubnMgfHwgbWF0Y2hlci50ZXN0KGhhbmRsZXIubnMpKVxuICAgICAgICAmJiAoIWZuICAgICAgIHx8IHppZChoYW5kbGVyLmZuKSA9PT0gemlkKGZuKSlcbiAgICAgICAgJiYgKCFzZWxlY3RvciB8fCBoYW5kbGVyLnNlbCA9PSBzZWxlY3RvcilcbiAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIHBhcnNlKGV2ZW50KSB7XG4gICAgdmFyIHBhcnRzID0gKCcnICsgZXZlbnQpLnNwbGl0KCcuJylcbiAgICByZXR1cm4ge2U6IHBhcnRzWzBdLCBuczogcGFydHMuc2xpY2UoMSkuc29ydCgpLmpvaW4oJyAnKX1cbiAgfVxuICBmdW5jdGlvbiBtYXRjaGVyRm9yKG5zKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyg/Ol58ICknICsgbnMucmVwbGFjZSgnICcsICcgLiogPycpICsgJyg/OiB8JCknKVxuICB9XG5cbiAgZnVuY3Rpb24gZXZlbnRDYXB0dXJlKGhhbmRsZXIsIGNhcHR1cmVTZXR0aW5nKSB7XG4gICAgcmV0dXJuIGhhbmRsZXIuZGVsICYmXG4gICAgICAoIWZvY3VzaW5TdXBwb3J0ZWQgJiYgKGhhbmRsZXIuZSBpbiBmb2N1cykpIHx8XG4gICAgICAhIWNhcHR1cmVTZXR0aW5nXG4gIH1cblxuICBmdW5jdGlvbiByZWFsRXZlbnQodHlwZSkge1xuICAgIHJldHVybiBob3Zlclt0eXBlXSB8fCAoZm9jdXNpblN1cHBvcnRlZCAmJiBmb2N1c1t0eXBlXSkgfHwgdHlwZVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkKGVsZW1lbnQsIGV2ZW50cywgZm4sIGRhdGEsIHNlbGVjdG9yLCBkZWxlZ2F0b3IsIGNhcHR1cmUpe1xuICAgIHZhciBpZCA9IHppZChlbGVtZW50KSwgc2V0ID0gKGhhbmRsZXJzW2lkXSB8fCAoaGFuZGxlcnNbaWRdID0gW10pKVxuICAgIGV2ZW50cy5zcGxpdCgvXFxzLykuZm9yRWFjaChmdW5jdGlvbihldmVudCl7XG4gICAgICBpZiAoZXZlbnQgPT0gJ3JlYWR5JykgcmV0dXJuICQoZG9jdW1lbnQpLnJlYWR5KGZuKVxuICAgICAgdmFyIGhhbmRsZXIgICA9IHBhcnNlKGV2ZW50KVxuICAgICAgaGFuZGxlci5mbiAgICA9IGZuXG4gICAgICBoYW5kbGVyLnNlbCAgID0gc2VsZWN0b3JcbiAgICAgIC8vIGVtdWxhdGUgbW91c2VlbnRlciwgbW91c2VsZWF2ZVxuICAgICAgaWYgKGhhbmRsZXIuZSBpbiBob3ZlcikgZm4gPSBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHJlbGF0ZWQgPSBlLnJlbGF0ZWRUYXJnZXRcbiAgICAgICAgaWYgKCFyZWxhdGVkIHx8IChyZWxhdGVkICE9PSB0aGlzICYmICEkLmNvbnRhaW5zKHRoaXMsIHJlbGF0ZWQpKSlcbiAgICAgICAgICByZXR1cm4gaGFuZGxlci5mbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9XG4gICAgICBoYW5kbGVyLmRlbCAgID0gZGVsZWdhdG9yXG4gICAgICB2YXIgY2FsbGJhY2sgID0gZGVsZWdhdG9yIHx8IGZuXG4gICAgICBoYW5kbGVyLnByb3h5ID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIGUgPSBjb21wYXRpYmxlKGUpXG4gICAgICAgIGlmIChlLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkpIHJldHVyblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBkYXRhUHJvcERlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsICdkYXRhJylcbiAgICAgICAgICBpZiAoIWRhdGFQcm9wRGVzY3JpcHRvciB8fCBkYXRhUHJvcERlc2NyaXB0b3Iud3JpdGFibGUpXG4gICAgICAgICAgICBlLmRhdGEgPSBkYXRhXG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9IC8vIHdoZW4gdXNpbmcgc3RyaWN0IG1vZGUgZGF0YVByb3BEZXNjcmlwdG9yIHdpbGwgYmUgdW5kZWZpbmVkIHdoZW4gZSBpcyBJbnB1dEV2ZW50IChldmVuIHRob3VnaCBkYXRhIHByb3BlcnR5IGV4aXN0cykuIFNvIHdlIHN1cnJvdW5kIHdpdGggdHJ5L2NhdGNoXG4gICAgICAgIHZhciByZXN1bHQgPSBjYWxsYmFjay5hcHBseShlbGVtZW50LCBlLl9hcmdzID09IHVuZGVmaW5lZCA/IFtlXSA6IFtlXS5jb25jYXQoZS5fYXJncykpXG4gICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSBlLnByZXZlbnREZWZhdWx0KCksIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfVxuICAgICAgaGFuZGxlci5pID0gc2V0Lmxlbmd0aFxuICAgICAgc2V0LnB1c2goaGFuZGxlcilcbiAgICAgIGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gZWxlbWVudClcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHJlYWxFdmVudChoYW5kbGVyLmUpLCBoYW5kbGVyLnByb3h5LCBldmVudENhcHR1cmUoaGFuZGxlciwgY2FwdHVyZSkpXG4gICAgfSlcbiAgfVxuICBmdW5jdGlvbiByZW1vdmUoZWxlbWVudCwgZXZlbnRzLCBmbiwgc2VsZWN0b3IsIGNhcHR1cmUpe1xuICAgIHZhciBpZCA9IHppZChlbGVtZW50KVxuICAgIDsoZXZlbnRzIHx8ICcnKS5zcGxpdCgvXFxzLykuZm9yRWFjaChmdW5jdGlvbihldmVudCl7XG4gICAgICBmaW5kSGFuZGxlcnMoZWxlbWVudCwgZXZlbnQsIGZuLCBzZWxlY3RvcikuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKXtcbiAgICAgICAgZGVsZXRlIGhhbmRsZXJzW2lkXVtoYW5kbGVyLmldXG4gICAgICBpZiAoJ3JlbW92ZUV2ZW50TGlzdGVuZXInIGluIGVsZW1lbnQpXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihyZWFsRXZlbnQoaGFuZGxlci5lKSwgaGFuZGxlci5wcm94eSwgZXZlbnRDYXB0dXJlKGhhbmRsZXIsIGNhcHR1cmUpKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgJC5ldmVudCA9IHsgYWRkOiBhZGQsIHJlbW92ZTogcmVtb3ZlIH1cblxuICAkLnByb3h5ID0gZnVuY3Rpb24oZm4sIGNvbnRleHQpIHtcbiAgICB2YXIgYXJncyA9ICgyIGluIGFyZ3VtZW50cykgJiYgc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG4gICAgaWYgKGlzRnVuY3Rpb24oZm4pKSB7XG4gICAgICB2YXIgcHJveHlGbiA9IGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmdzID8gYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSA6IGFyZ3VtZW50cykgfVxuICAgICAgcHJveHlGbi5femlkID0gemlkKGZuKVxuICAgICAgcmV0dXJuIHByb3h5Rm5cbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGNvbnRleHQpKSB7XG4gICAgICBpZiAoYXJncykge1xuICAgICAgICBhcmdzLnVuc2hpZnQoZm5bY29udGV4dF0sIGZuKVxuICAgICAgICByZXR1cm4gJC5wcm94eS5hcHBseShudWxsLCBhcmdzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICQucHJveHkoZm5bY29udGV4dF0sIGZuKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0ZWQgZnVuY3Rpb25cIilcbiAgICB9XG4gIH1cblxuICAkLmZuLmJpbmQgPSBmdW5jdGlvbihldmVudCwgZGF0YSwgY2FsbGJhY2spe1xuICAgIHJldHVybiB0aGlzLm9uKGV2ZW50LCBkYXRhLCBjYWxsYmFjaylcbiAgfVxuICAkLmZuLnVuYmluZCA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub2ZmKGV2ZW50LCBjYWxsYmFjaylcbiAgfVxuICAkLmZuLm9uZSA9IGZ1bmN0aW9uKGV2ZW50LCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2spe1xuICAgIHJldHVybiB0aGlzLm9uKGV2ZW50LCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIDEpXG4gIH1cblxuICB2YXIgcmV0dXJuVHJ1ZSA9IGZ1bmN0aW9uKCl7cmV0dXJuIHRydWV9LFxuICAgICAgcmV0dXJuRmFsc2UgPSBmdW5jdGlvbigpe3JldHVybiBmYWxzZX0sXG4gICAgICBpZ25vcmVQcm9wZXJ0aWVzID0gL14oW0EtWl18cmV0dXJuVmFsdWUkfGxheWVyW1hZXSR8d2Via2l0TW92ZW1lbnRbWFldJCkvLFxuICAgICAgZXZlbnRNZXRob2RzID0ge1xuICAgICAgICBwcmV2ZW50RGVmYXVsdDogJ2lzRGVmYXVsdFByZXZlbnRlZCcsXG4gICAgICAgIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjogJ2lzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkJyxcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiAnaXNQcm9wYWdhdGlvblN0b3BwZWQnXG4gICAgICB9XG5cbiAgZnVuY3Rpb24gY29tcGF0aWJsZShldmVudCwgc291cmNlKSB7XG4gICAgaWYgKHNvdXJjZSB8fCAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICBzb3VyY2UgfHwgKHNvdXJjZSA9IGV2ZW50KVxuXG4gICAgICAkLmVhY2goZXZlbnRNZXRob2RzLCBmdW5jdGlvbihuYW1lLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgdmFyIHNvdXJjZU1ldGhvZCA9IHNvdXJjZVtuYW1lXVxuICAgICAgICBldmVudFtuYW1lXSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdGhpc1twcmVkaWNhdGVdID0gcmV0dXJuVHJ1ZVxuICAgICAgICAgIHJldHVybiBzb3VyY2VNZXRob2QgJiYgc291cmNlTWV0aG9kLmFwcGx5KHNvdXJjZSwgYXJndW1lbnRzKVxuICAgICAgICB9XG4gICAgICAgIGV2ZW50W3ByZWRpY2F0ZV0gPSByZXR1cm5GYWxzZVxuICAgICAgfSlcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZXZlbnQudGltZVN0YW1wIHx8IChldmVudC50aW1lU3RhbXAgPSBEYXRlLm5vdygpKVxuICAgICAgfSBjYXRjaCAoaWdub3JlZCkgeyB9XG5cbiAgICAgIGlmIChzb3VyY2UuZGVmYXVsdFByZXZlbnRlZCAhPT0gdW5kZWZpbmVkID8gc291cmNlLmRlZmF1bHRQcmV2ZW50ZWQgOlxuICAgICAgICAgICdyZXR1cm5WYWx1ZScgaW4gc291cmNlID8gc291cmNlLnJldHVyblZhbHVlID09PSBmYWxzZSA6XG4gICAgICAgICAgc291cmNlLmdldFByZXZlbnREZWZhdWx0ICYmIHNvdXJjZS5nZXRQcmV2ZW50RGVmYXVsdCgpKVxuICAgICAgICBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQgPSByZXR1cm5UcnVlXG4gICAgfVxuICAgIHJldHVybiBldmVudFxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJveHkoZXZlbnQpIHtcbiAgICB2YXIga2V5LCBwcm94eSA9IHsgb3JpZ2luYWxFdmVudDogZXZlbnQgfVxuICAgIGZvciAoa2V5IGluIGV2ZW50KVxuICAgICAgaWYgKCFpZ25vcmVQcm9wZXJ0aWVzLnRlc3Qoa2V5KSAmJiBldmVudFtrZXldICE9PSB1bmRlZmluZWQpIHByb3h5W2tleV0gPSBldmVudFtrZXldXG5cbiAgICByZXR1cm4gY29tcGF0aWJsZShwcm94eSwgZXZlbnQpXG4gIH1cblxuICAkLmZuLmRlbGVnYXRlID0gZnVuY3Rpb24oc2VsZWN0b3IsIGV2ZW50LCBjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub24oZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaylcbiAgfVxuICAkLmZuLnVuZGVsZWdhdGUgPSBmdW5jdGlvbihzZWxlY3RvciwgZXZlbnQsIGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vZmYoZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaylcbiAgfVxuXG4gICQuZm4ubGl2ZSA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjayl7XG4gICAgJChkb2N1bWVudC5ib2R5KS5kZWxlZ2F0ZSh0aGlzLnNlbGVjdG9yLCBldmVudCwgY2FsbGJhY2spXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuICAkLmZuLmRpZSA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjayl7XG4gICAgJChkb2N1bWVudC5ib2R5KS51bmRlbGVnYXRlKHRoaXMuc2VsZWN0b3IsIGV2ZW50LCBjYWxsYmFjaylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgJC5mbi5vbiA9IGZ1bmN0aW9uKGV2ZW50LCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIG9uZSl7XG4gICAgdmFyIGF1dG9SZW1vdmUsIGRlbGVnYXRvciwgJHRoaXMgPSB0aGlzXG4gICAgaWYgKGV2ZW50ICYmICFpc1N0cmluZyhldmVudCkpIHtcbiAgICAgICQuZWFjaChldmVudCwgZnVuY3Rpb24odHlwZSwgZm4pe1xuICAgICAgICAkdGhpcy5vbih0eXBlLCBzZWxlY3RvciwgZGF0YSwgZm4sIG9uZSlcbiAgICAgIH0pXG4gICAgICByZXR1cm4gJHRoaXNcbiAgICB9XG5cbiAgICBpZiAoIWlzU3RyaW5nKHNlbGVjdG9yKSAmJiAhaXNGdW5jdGlvbihjYWxsYmFjaykgJiYgY2FsbGJhY2sgIT09IGZhbHNlKVxuICAgICAgY2FsbGJhY2sgPSBkYXRhLCBkYXRhID0gc2VsZWN0b3IsIHNlbGVjdG9yID0gdW5kZWZpbmVkXG4gICAgaWYgKGNhbGxiYWNrID09PSB1bmRlZmluZWQgfHwgZGF0YSA9PT0gZmFsc2UpXG4gICAgICBjYWxsYmFjayA9IGRhdGEsIGRhdGEgPSB1bmRlZmluZWRcblxuICAgIGlmIChjYWxsYmFjayA9PT0gZmFsc2UpIGNhbGxiYWNrID0gcmV0dXJuRmFsc2VcblxuICAgIHJldHVybiAkdGhpcy5lYWNoKGZ1bmN0aW9uKF8sIGVsZW1lbnQpe1xuICAgICAgaWYgKG9uZSkgYXV0b1JlbW92ZSA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICByZW1vdmUoZWxlbWVudCwgZS50eXBlLCBjYWxsYmFjaylcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdG9yKSBkZWxlZ2F0b3IgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIGV2dCwgbWF0Y2ggPSAkKGUudGFyZ2V0KS5jbG9zZXN0KHNlbGVjdG9yLCBlbGVtZW50KS5nZXQoMClcbiAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoICE9PSBlbGVtZW50KSB7XG4gICAgICAgICAgZXZ0ID0gJC5leHRlbmQoY3JlYXRlUHJveHkoZSksIHtjdXJyZW50VGFyZ2V0OiBtYXRjaCwgbGl2ZUZpcmVkOiBlbGVtZW50fSlcbiAgICAgICAgICByZXR1cm4gKGF1dG9SZW1vdmUgfHwgY2FsbGJhY2spLmFwcGx5KG1hdGNoLCBbZXZ0XS5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhZGQoZWxlbWVudCwgZXZlbnQsIGNhbGxiYWNrLCBkYXRhLCBzZWxlY3RvciwgZGVsZWdhdG9yIHx8IGF1dG9SZW1vdmUpXG4gICAgfSlcbiAgfVxuICAkLmZuLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2spe1xuICAgIHZhciAkdGhpcyA9IHRoaXNcbiAgICBpZiAoZXZlbnQgJiYgIWlzU3RyaW5nKGV2ZW50KSkge1xuICAgICAgJC5lYWNoKGV2ZW50LCBmdW5jdGlvbih0eXBlLCBmbil7XG4gICAgICAgICR0aGlzLm9mZih0eXBlLCBzZWxlY3RvciwgZm4pXG4gICAgICB9KVxuICAgICAgcmV0dXJuICR0aGlzXG4gICAgfVxuXG4gICAgaWYgKCFpc1N0cmluZyhzZWxlY3RvcikgJiYgIWlzRnVuY3Rpb24oY2FsbGJhY2spICYmIGNhbGxiYWNrICE9PSBmYWxzZSlcbiAgICAgIGNhbGxiYWNrID0gc2VsZWN0b3IsIHNlbGVjdG9yID0gdW5kZWZpbmVkXG5cbiAgICBpZiAoY2FsbGJhY2sgPT09IGZhbHNlKSBjYWxsYmFjayA9IHJldHVybkZhbHNlXG5cbiAgICByZXR1cm4gJHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgcmVtb3ZlKHRoaXMsIGV2ZW50LCBjYWxsYmFjaywgc2VsZWN0b3IpXG4gICAgfSlcbiAgfVxuXG4gICQuZm4udHJpZ2dlciA9IGZ1bmN0aW9uKGV2ZW50LCBhcmdzKXtcbiAgICBldmVudCA9IChpc1N0cmluZyhldmVudCkgfHwgJC5pc1BsYWluT2JqZWN0KGV2ZW50KSkgPyAkLkV2ZW50KGV2ZW50KSA6IGNvbXBhdGlibGUoZXZlbnQpXG4gICAgZXZlbnQuX2FyZ3MgPSBhcmdzXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgLy8gaGFuZGxlIGZvY3VzKCksIGJsdXIoKSBieSBjYWxsaW5nIHRoZW0gZGlyZWN0bHlcbiAgICAgIGlmIChldmVudC50eXBlIGluIGZvY3VzICYmIHR5cGVvZiB0aGlzW2V2ZW50LnR5cGVdID09IFwiZnVuY3Rpb25cIikgdGhpc1tldmVudC50eXBlXSgpXG4gICAgICAvLyBpdGVtcyBpbiB0aGUgY29sbGVjdGlvbiBtaWdodCBub3QgYmUgRE9NIGVsZW1lbnRzXG4gICAgICBlbHNlIGlmICgnZGlzcGF0Y2hFdmVudCcgaW4gdGhpcykgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICAgICAgZWxzZSAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKGV2ZW50LCBhcmdzKVxuICAgIH0pXG4gIH1cblxuICAvLyB0cmlnZ2VycyBldmVudCBoYW5kbGVycyBvbiBjdXJyZW50IGVsZW1lbnQganVzdCBhcyBpZiBhbiBldmVudCBvY2N1cnJlZCxcbiAgLy8gZG9lc24ndCB0cmlnZ2VyIGFuIGFjdHVhbCBldmVudCwgZG9lc24ndCBidWJibGVcbiAgJC5mbi50cmlnZ2VySGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50LCBhcmdzKXtcbiAgICB2YXIgZSwgcmVzdWx0XG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGksIGVsZW1lbnQpe1xuICAgICAgZSA9IGNyZWF0ZVByb3h5KGlzU3RyaW5nKGV2ZW50KSA/ICQuRXZlbnQoZXZlbnQpIDogZXZlbnQpXG4gICAgICBlLl9hcmdzID0gYXJnc1xuICAgICAgZS50YXJnZXQgPSBlbGVtZW50XG4gICAgICAkLmVhY2goZmluZEhhbmRsZXJzKGVsZW1lbnQsIGV2ZW50LnR5cGUgfHwgZXZlbnQpLCBmdW5jdGlvbihpLCBoYW5kbGVyKXtcbiAgICAgICAgcmVzdWx0ID0gaGFuZGxlci5wcm94eShlKVxuICAgICAgICBpZiAoZS5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpKSByZXR1cm4gZmFsc2VcbiAgICAgIH0pXG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvLyBzaG9ydGN1dCBtZXRob2RzIGZvciBgLmJpbmQoZXZlbnQsIGZuKWAgZm9yIGVhY2ggZXZlbnQgdHlwZVxuICA7KCdmb2N1c2luIGZvY3Vzb3V0IGZvY3VzIGJsdXIgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGljayAnK1xuICAnbW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgJytcbiAgJ2NoYW5nZSBzZWxlY3Qga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBlcnJvcicpLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbihldmVudCkge1xuICAgICQuZm5bZXZlbnRdID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiAoMCBpbiBhcmd1bWVudHMpID9cbiAgICAgICAgdGhpcy5iaW5kKGV2ZW50LCBjYWxsYmFjaykgOlxuICAgICAgICB0aGlzLnRyaWdnZXIoZXZlbnQpXG4gICAgfVxuICB9KVxuXG4gICQuRXZlbnQgPSBmdW5jdGlvbih0eXBlLCBwcm9wcykge1xuICAgIGlmICghaXNTdHJpbmcodHlwZSkpIHByb3BzID0gdHlwZSwgdHlwZSA9IHByb3BzLnR5cGVcbiAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChzcGVjaWFsRXZlbnRzW3R5cGVdIHx8ICdFdmVudHMnKSwgYnViYmxlcyA9IHRydWVcbiAgICBpZiAocHJvcHMpIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIChuYW1lID09ICdidWJibGVzJykgPyAoYnViYmxlcyA9ICEhcHJvcHNbbmFtZV0pIDogKGV2ZW50W25hbWVdID0gcHJvcHNbbmFtZV0pXG4gICAgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGJ1YmJsZXMsIHRydWUpXG4gICAgcmV0dXJuIGNvbXBhdGlibGUoZXZlbnQpXG4gIH1cblxufSkoWmVwdG8pXG5cbjsoZnVuY3Rpb24oJCl7XG4gIHZhciBjYWNoZSA9IFtdLCB0aW1lb3V0XG5cbiAgJC5mbi5yZW1vdmUgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIGlmKHRoaXMucGFyZW50Tm9kZSl7XG4gICAgICAgIGlmKHRoaXMudGFnTmFtZSA9PT0gJ0lNRycpe1xuICAgICAgICAgIGNhY2hlLnB1c2godGhpcylcbiAgICAgICAgICB0aGlzLnNyYyA9ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUFEL0FDd0FBQUFBQVFBQkFBQUNBRHM9J1xuICAgICAgICAgIGlmICh0aW1lb3V0KSBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpeyBjYWNoZSA9IFtdIH0sIDYwMDAwKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0pKFplcHRvKVxuXG47KGZ1bmN0aW9uKCQpe1xuICB2YXIgZGF0YSA9IHt9LCBkYXRhQXR0ciA9ICQuZm4uZGF0YSwgY2FtZWxpemUgPSAkLmNhbWVsQ2FzZSxcbiAgICBleHAgPSAkLmV4cGFuZG8gPSAnWmVwdG8nICsgKCtuZXcgRGF0ZSgpKSwgZW1wdHlBcnJheSA9IFtdXG5cbiAgLy8gR2V0IHZhbHVlIGZyb20gbm9kZTpcbiAgLy8gMS4gZmlyc3QgdHJ5IGtleSBhcyBnaXZlbixcbiAgLy8gMi4gdGhlbiB0cnkgY2FtZWxpemVkIGtleSxcbiAgLy8gMy4gZmFsbCBiYWNrIHRvIHJlYWRpbmcgXCJkYXRhLSpcIiBhdHRyaWJ1dGUuXG4gIGZ1bmN0aW9uIGdldERhdGEobm9kZSwgbmFtZSkge1xuICAgIHZhciBpZCA9IG5vZGVbZXhwXSwgc3RvcmUgPSBpZCAmJiBkYXRhW2lkXVxuICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHJldHVybiBzdG9yZSB8fCBzZXREYXRhKG5vZGUpXG4gICAgZWxzZSB7XG4gICAgICBpZiAoc3RvcmUpIHtcbiAgICAgICAgaWYgKG5hbWUgaW4gc3RvcmUpIHJldHVybiBzdG9yZVtuYW1lXVxuICAgICAgICB2YXIgY2FtZWxOYW1lID0gY2FtZWxpemUobmFtZSlcbiAgICAgICAgaWYgKGNhbWVsTmFtZSBpbiBzdG9yZSkgcmV0dXJuIHN0b3JlW2NhbWVsTmFtZV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhQXR0ci5jYWxsKCQobm9kZSksIG5hbWUpXG4gICAgfVxuICB9XG5cbiAgLy8gU3RvcmUgdmFsdWUgdW5kZXIgY2FtZWxpemVkIGtleSBvbiBub2RlXG4gIGZ1bmN0aW9uIHNldERhdGEobm9kZSwgbmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgaWQgPSBub2RlW2V4cF0gfHwgKG5vZGVbZXhwXSA9ICsrJC51dWlkKSxcbiAgICAgIHN0b3JlID0gZGF0YVtpZF0gfHwgKGRhdGFbaWRdID0gYXR0cmlidXRlRGF0YShub2RlKSlcbiAgICBpZiAobmFtZSAhPT0gdW5kZWZpbmVkKSBzdG9yZVtjYW1lbGl6ZShuYW1lKV0gPSB2YWx1ZVxuICAgIHJldHVybiBzdG9yZVxuICB9XG5cbiAgLy8gUmVhZCBhbGwgXCJkYXRhLSpcIiBhdHRyaWJ1dGVzIGZyb20gYSBub2RlXG4gIGZ1bmN0aW9uIGF0dHJpYnV0ZURhdGEobm9kZSkge1xuICAgIHZhciBzdG9yZSA9IHt9XG4gICAgJC5lYWNoKG5vZGUuYXR0cmlidXRlcyB8fCBlbXB0eUFycmF5LCBmdW5jdGlvbihpLCBhdHRyKXtcbiAgICAgIGlmIChhdHRyLm5hbWUuaW5kZXhPZignZGF0YS0nKSA9PSAwKVxuICAgICAgICBzdG9yZVtjYW1lbGl6ZShhdHRyLm5hbWUucmVwbGFjZSgnZGF0YS0nLCAnJykpXSA9XG4gICAgICAgICAgJC56ZXB0by5kZXNlcmlhbGl6ZVZhbHVlKGF0dHIudmFsdWUpXG4gICAgfSlcbiAgICByZXR1cm4gc3RvcmVcbiAgfVxuXG4gICQuZm4uZGF0YSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuICAgICAgLy8gc2V0IG11bHRpcGxlIHZhbHVlcyB2aWEgb2JqZWN0XG4gICAgICAkLmlzUGxhaW5PYmplY3QobmFtZSkgP1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaSwgbm9kZSl7XG4gICAgICAgICAgJC5lYWNoKG5hbWUsIGZ1bmN0aW9uKGtleSwgdmFsdWUpeyBzZXREYXRhKG5vZGUsIGtleSwgdmFsdWUpIH0pXG4gICAgICAgIH0pIDpcbiAgICAgICAgLy8gZ2V0IHZhbHVlIGZyb20gZmlyc3QgZWxlbWVudFxuICAgICAgICAoMCBpbiB0aGlzID8gZ2V0RGF0YSh0aGlzWzBdLCBuYW1lKSA6IHVuZGVmaW5lZCkgOlxuICAgICAgLy8gc2V0IHZhbHVlIG9uIGFsbCBlbGVtZW50c1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCl7IHNldERhdGEodGhpcywgbmFtZSwgdmFsdWUpIH0pXG4gIH1cblxuICAkLmRhdGEgPSBmdW5jdGlvbihlbGVtLCBuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiAkKGVsZW0pLmRhdGEobmFtZSwgdmFsdWUpXG4gIH1cblxuICAkLmhhc0RhdGEgPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgdmFyIGlkID0gZWxlbVtleHBdLCBzdG9yZSA9IGlkICYmIGRhdGFbaWRdXG4gICAgcmV0dXJuIHN0b3JlID8gISQuaXNFbXB0eU9iamVjdChzdG9yZSkgOiBmYWxzZVxuICB9XG5cbiAgJC5mbi5yZW1vdmVEYXRhID0gZnVuY3Rpb24obmFtZXMpIHtcbiAgICBpZiAodHlwZW9mIG5hbWVzID09ICdzdHJpbmcnKSBuYW1lcyA9IG5hbWVzLnNwbGl0KC9cXHMrLylcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaWQgPSB0aGlzW2V4cF0sIHN0b3JlID0gaWQgJiYgZGF0YVtpZF1cbiAgICAgIGlmIChzdG9yZSkgJC5lYWNoKG5hbWVzIHx8IHN0b3JlLCBmdW5jdGlvbihrZXkpe1xuICAgICAgICBkZWxldGUgc3RvcmVbbmFtZXMgPyBjYW1lbGl6ZSh0aGlzKSA6IGtleV1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIGV4dGVuZGVkIGByZW1vdmVgIGFuZCBgZW1wdHlgIGZ1bmN0aW9uc1xuICA7WydyZW1vdmUnLCAnZW1wdHknXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpe1xuICAgIHZhciBvcmlnRm4gPSAkLmZuW21ldGhvZE5hbWVdXG4gICAgJC5mblttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVsZW1lbnRzID0gdGhpcy5maW5kKCcqJylcbiAgICAgIGlmIChtZXRob2ROYW1lID09PSAncmVtb3ZlJykgZWxlbWVudHMgPSBlbGVtZW50cy5hZGQodGhpcylcbiAgICAgIGVsZW1lbnRzLnJlbW92ZURhdGEoKVxuICAgICAgcmV0dXJuIG9yaWdGbi5jYWxsKHRoaXMpXG4gICAgfVxuICB9KVxufSkoWmVwdG8pXG4gIHJldHVybiBaZXB0b1xufSkpXG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiEgbm9ybWFsaXplLmNzcyB2OC4wLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuXFxuLyogRG9jdW1lbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG59XFxuXFxuLyogU2VjdGlvbnNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLyoqXFxuICogUmVuZGVyIHRoZSBgbWFpbmAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXFxuICovXFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gYGgxYCBlbGVtZW50cyB3aXRoaW4gYHNlY3Rpb25gIGFuZFxcbiAqIGBhcnRpY2xlYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBtYXJnaW46IDAuNjdlbSAwO1xcbn1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxcbiAqIDIuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UgYW5kIElFLlxcbiAqL1xcblxcbmhyIHtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXFxuICBoZWlnaHQ6IDA7IC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnByZSB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qIFRleHQtbGV2ZWwgc2VtYW50aWNzXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBib3R0b20gYm9yZGVyIGluIENocm9tZSA1Ny1cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5iLFxcbnN0cm9uZyB7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5jb2RlLFxcbmtiZCxcXG5zYW1wIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc21hbGwge1xcbiAgZm9udC1zaXplOiA4MCU7XFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgYHN1YmAgYW5kIGBzdXBgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxcbiAqIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdWIsXFxuc3VwIHtcXG4gIGZvbnQtc2l6ZTogNzUlO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbnN1YiB7XFxuICBib3R0b206IC0wLjI1ZW07XFxufVxcblxcbnN1cCB7XFxuICB0b3A6IC0wLjVlbTtcXG59XFxuXFxuLyogRW1iZWRkZWQgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbn1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBmb250IHN0eWxlcyBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCxcXG5vcHRncm91cCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIG1hcmdpbjogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCB7IC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uLFxcbnNlbGVjdCB7IC8qIDEgKi9cXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl0sXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOjotbW96LWZvY3VzLWlubmVyIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cXG4gKi9cXG5cXG5idXR0b246LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTotbW96LWZvY3VzcmluZyB7XFxuICBvdXRsaW5lOiAxcHggZG90dGVkIEJ1dHRvblRleHQ7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5maWVsZHNldCB7XFxuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIHRleHQgd3JhcHBpbmcgaW4gRWRnZSBhbmQgSUUuXFxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBgZmllbGRzZXRgIGVsZW1lbnRzIGluIElFLlxcbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcXG4gKiAgICBgZmllbGRzZXRgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5sZWdlbmQge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgY29sb3I6IGluaGVyaXQ7IC8qIDIgKi9cXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXFxuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDMgKi9cXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cXG4gKi9cXG5cXG5wcm9ncmVzcyB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC5cXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXFxuICovXFxuXFxuW3R5cGU9XFxcImNoZWNrYm94XFxcIl0sXFxuW3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXFxuICovXFxuXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIG9kZCBhcHBlYXJhbmNlIGluIENocm9tZSBhbmQgU2FmYXJpLlxcbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IHRleHRmaWVsZDsgLyogMSAqL1xcbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxcbiAqL1xcblxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcbiAqL1xcblxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXG59XFxuXFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cXG4gKi9cXG5cXG5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdW1tYXJ5IHtcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXG59XFxuXFxuLyogTWlzY1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTArLlxcbiAqL1xcblxcbnRlbXBsYXRlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxcbiAqL1xcblxcbltoaWRkZW5dIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9QWNtZSZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBiYWNrUHVsc2Uge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgfVxcbiAgdG8ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4yKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgYmFja1B1bHNlIHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gIH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMik7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xcbiAgfVxcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYmFja091dERvd24ge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDIwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4KSBzY2FsZSgwLjcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCkgc2NhbGUoMC43KTtcXG4gICAgb3BhY2l0eTogMC43O1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDcwMHB4KSBzY2FsZSgwLjcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg3MDBweCkgc2NhbGUoMC43KTtcXG4gIH1cXG59XFxuXFxuQGtleWZyYW1lcyBiYWNrT3V0RG93biB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMjAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgpIHNjYWxlKDAuNyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4KSBzY2FsZSgwLjcpO1xcbiAgICBvcGFjaXR5OiAwLjc7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNzAwcHgpIHNjYWxlKDAuNyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDcwMHB4KSBzY2FsZSgwLjcpO1xcbiAgfVxcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYmFja091dFVwIHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAyMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCkgc2NhbGUoMC43KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgpIHNjYWxlKDAuNyk7XFxuICAgIG9wYWNpdHk6IDAuNztcXG4gIH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzAwcHgpIHNjYWxlKDAuNyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03MDBweCkgc2NhbGUoMC43KTtcXG4gIH1cXG59XFxuXFxuQGtleWZyYW1lcyBiYWNrT3V0VXAge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDIwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4KSBzY2FsZSgwLjcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCkgc2NhbGUoMC43KTtcXG4gICAgb3BhY2l0eTogMC43O1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03MDBweCkgc2NhbGUoMC43KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwMHB4KSBzY2FsZSgwLjcpO1xcbiAgfVxcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgY29sb3I6ICNmYmFmMDA7XFxuICBmb250LWZhbWlseTogXFxcIkFjbWVcXFwiLCBzYW5zLXNlcmlmO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuI2xvYWRpbmctY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI2xvYWRpbmctY29udGFpbmVyIGltZyB7XFxuICB3aWR0aDogMTB2dztcXG59XFxuXFxuI3NlYXJjaC1jb250YWluZXIge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBtaW4td2lkdGg6IDcwMHB4O1xcbn1cXG5cXG4jc2VhcmNoLWNvbnRhaW5lciBoMSB7XFxuICBsaW5lLWhlaWdodDogMTA4cHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiA0LjZ2aDtcXG4gIGNvbG9yOiAjOTk3ZjQxO1xcbn1cXG5cXG4jc2VhcmNoLWNvbnRhaW5lciAuc2VhcmNoLWJ0biB7XFxuICBmb250LXNpemU6IDEuNWVtO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgY29sb3I6ICM5OTdmNDE7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjOTk3ZjQxO1xcbn1cXG5cXG4jc2VhcmNoLWNvbnRhaW5lciAuc2VhcmNoLWJ0bjpob3ZlciB7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMC41cztcXG4gICAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjVzO1xcbiAgLXdlYmtpdC1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcXG4gICAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBiYWNrUHVsc2U7XFxuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBiYWNrUHVsc2U7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcXG4gICAgICAgICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xcbiAgLXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xcbiAgICAgICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xcbiAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDA7XFxuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI3NlYXJjaC1jb250YWluZXIgI3NlYXJjaC1xdWVyeSxcXG4jc2VhcmNoLWNvbnRhaW5lciAuYXAtbmFtZSB7XFxuICBjb2xvcjogIzNhN2NhNTtcXG59XFxuXFxuLmJhY2tPdXRVcCB7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxuICAgICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XFxuICAgICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBiYWNrT3V0VXA7XFxuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBiYWNrT3V0VXA7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAgICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgLXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xcbiAgICAgICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xcbiAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuMztcXG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjM7XFxufVxcblxcbi5iYWNrT3V0RG93biB7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxuICAgICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMXM7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XFxuICAgICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBiYWNrT3V0RG93bjtcXG4gICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJhY2tPdXREb3duO1xcbiAgLXdlYmtpdC1hbmltYXRpb24tZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgICAgIGFuaW1hdGlvbi1kaXJlY3Rpb246IG5vcm1hbDtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcXG4gICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjM7XFxuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4zO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi5hbGdvbGlhLXBsYWNlcyB7XFxuICB3aWR0aDogNTAlO1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuXFxuYnV0dG9uLmFwLWlucHV0LWljb246bnRoLWNoaWxkKDUpIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNyZXN1bHQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNyZXN1bHQtY29udGFpbmVyICNsb2NhdGlvbi1uYW1lIHtcXG4gIGhlaWdodDogMTB2aDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogM3Z3O1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjd2VhdGhlci1jb250YWluZXIge1xcbiAgaGVpZ2h0OiA0NXZoO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1wYWNrOiBkaXN0cmlidXRlO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjdGVtcGVyYXR1cmUtY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQ6ICMwYzU1NGU7XFxuICBoZWlnaHQ6IDYwJTtcXG4gIHdpZHRoOiAyNXZ3O1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxufVxcblxcbiNyZXN1bHQtY29udGFpbmVyICNjb25kaXRpb24tY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQ6ICMwYzU1NGU7XFxuICBoZWlnaHQ6IDYwJTtcXG4gIHdpZHRoOiAyNXZ3O1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiNyZXN1bHQtY29udGFpbmVyICNjaGFuZ2UtdGVtcCB7XFxuICBmb250LXNpemU6IDIuM3Z3O1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjY2hhbmdlLXRlbXAgYnV0dG9uIHtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJhY2tncm91bmQ6ICM2MDMxYTQ7XFxuICBjb2xvcjogI2ZmYjMwMDtcXG4gIHdpZHRoOiA0MCU7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI3Jlc3VsdC1jb250YWluZXIgI2NoYW5nZS10ZW1wIGJ1dHRvbjpob3ZlciB7XFxuICBvcGFjaXR5OiAwLjg7XFxuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcXG59XFxuXFxuI3Jlc3VsdC1jb250YWluZXIgI2NoYW5nZS10ZW1wIGJ1dHRvbjphY3RpdmUge1xcbiAgb3BhY2l0eTogMC41O1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjdGVtcC1pbmZvLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIC13ZWJraXQtYm94LXBhY2s6IHNwYWNlLWV2ZW5seTtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBzcGFjZS1ldmVubHk7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgd2lkdGg6IDUwJTtcXG59XFxuXFxuI3Jlc3VsdC1jb250YWluZXIgI2NvbmRpdGlvbiB7XFxuICBmb250LXNpemU6IDMuMzd2dztcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuI3Jlc3VsdC1jb250YWluZXIgI3RlbXBlcmF0dXJlIHtcXG4gIGZvbnQtc2l6ZTogNC42dnc7XFxuICBtYXJnaW46IDA7XFxuICB6LWluZGV4OiAxO1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjc2VhcmNoLWJ0biB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzIGxpbmVhcjtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGxpbmVhcjtcXG4gIG1heC1oZWlnaHQ6IDIwMHB4O1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjc2VhcmNoLWJ0bjpob3ZlciB7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAxNXB4ICM3OGI5ZWI7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAxNXB4ICM3OGI5ZWI7XFxufVxcblxcbiNyZXN1bHQtY29udGFpbmVyIGlmcmFtZSB7XFxuICBoZWlnaHQ6IDM1dmg7XFxuICB3aWR0aDogNTAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciBpbWdbc3JjJD0nLnN2ZyddIHtcXG4gIGhlaWdodDogNzAlO1xcbiAgbWF4LXdpZHRoOiA1MCU7XFxufVxcblxcbi5GOjphZnRlciB7XFxuICBjb250ZW50OiAnXFxcXDIxMDknO1xcbn1cXG5cXG4uQzo6YWZ0ZXIge1xcbiAgY29udGVudDogJ1xcXFwyMTAzJztcXG59XCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8ICcnKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICByZXR1cm4gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xufSIsIi8qIVxuICogQG92ZXJ2aWV3IGVzNi1wcm9taXNlIC0gYSB0aW55IGltcGxlbWVudGF0aW9uIG9mIFByb21pc2VzL0ErLlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTQgWWVodWRhIEthdHosIFRvbSBEYWxlLCBTdGVmYW4gUGVubmVyIGFuZCBjb250cmlidXRvcnMgKENvbnZlcnNpb24gdG8gRVM2IEFQSSBieSBKYWtlIEFyY2hpYmFsZClcbiAqIEBsaWNlbnNlICAgTGljZW5zZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqICAgICAgICAgICAgU2VlIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9zdGVmYW5wZW5uZXIvZXM2LXByb21pc2UvbWFzdGVyL0xJQ0VOU0VcbiAqIEB2ZXJzaW9uICAgdjQuMi44KzFlNjhkY2U2XG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLkVTNlByb21pc2UgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9iamVjdE9yRnVuY3Rpb24oeCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB4O1xuICByZXR1cm4geCAhPT0gbnVsbCAmJiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cblxuXG52YXIgX2lzQXJyYXkgPSB2b2lkIDA7XG5pZiAoQXJyYXkuaXNBcnJheSkge1xuICBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG59IGVsc2Uge1xuICBfaXNBcnJheSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcbn1cblxudmFyIGlzQXJyYXkgPSBfaXNBcnJheTtcblxudmFyIGxlbiA9IDA7XG52YXIgdmVydHhOZXh0ID0gdm9pZCAwO1xudmFyIGN1c3RvbVNjaGVkdWxlckZuID0gdm9pZCAwO1xuXG52YXIgYXNhcCA9IGZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGFyZykge1xuICBxdWV1ZVtsZW5dID0gY2FsbGJhY2s7XG4gIHF1ZXVlW2xlbiArIDFdID0gYXJnO1xuICBsZW4gKz0gMjtcbiAgaWYgKGxlbiA9PT0gMikge1xuICAgIC8vIElmIGxlbiBpcyAyLCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBzY2hlZHVsZSBhbiBhc3luYyBmbHVzaC5cbiAgICAvLyBJZiBhZGRpdGlvbmFsIGNhbGxiYWNrcyBhcmUgcXVldWVkIGJlZm9yZSB0aGUgcXVldWUgaXMgZmx1c2hlZCwgdGhleVxuICAgIC8vIHdpbGwgYmUgcHJvY2Vzc2VkIGJ5IHRoaXMgZmx1c2ggdGhhdCB3ZSBhcmUgc2NoZWR1bGluZy5cbiAgICBpZiAoY3VzdG9tU2NoZWR1bGVyRm4pIHtcbiAgICAgIGN1c3RvbVNjaGVkdWxlckZuKGZsdXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NoZWR1bGVGbHVzaCgpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gc2V0U2NoZWR1bGVyKHNjaGVkdWxlRm4pIHtcbiAgY3VzdG9tU2NoZWR1bGVyRm4gPSBzY2hlZHVsZUZuO1xufVxuXG5mdW5jdGlvbiBzZXRBc2FwKGFzYXBGbikge1xuICBhc2FwID0gYXNhcEZuO1xufVxuXG52YXIgYnJvd3NlcldpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdW5kZWZpbmVkO1xudmFyIGJyb3dzZXJHbG9iYWwgPSBicm93c2VyV2luZG93IHx8IHt9O1xudmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gYnJvd3Nlckdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGJyb3dzZXJHbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBpc05vZGUgPSB0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHt9LnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcblxuLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbnZhciBpc1dvcmtlciA9IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIG5vZGVcbmZ1bmN0aW9uIHVzZU5leHRUaWNrKCkge1xuICAvLyBub2RlIHZlcnNpb24gMC4xMC54IGRpc3BsYXlzIGEgZGVwcmVjYXRpb24gd2FybmluZyB3aGVuIG5leHRUaWNrIGlzIHVzZWQgcmVjdXJzaXZlbHlcbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jdWpvanMvd2hlbi9pc3N1ZXMvNDEwIGZvciBkZXRhaWxzXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICB9O1xufVxuXG4vLyB2ZXJ0eFxuZnVuY3Rpb24gdXNlVmVydHhUaW1lcigpIHtcbiAgaWYgKHR5cGVvZiB2ZXJ0eE5leHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZlcnR4TmV4dChmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XG59XG5cbmZ1bmN0aW9uIHVzZU11dGF0aW9uT2JzZXJ2ZXIoKSB7XG4gIHZhciBpdGVyYXRpb25zID0gMDtcbiAgdmFyIG9ic2VydmVyID0gbmV3IEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gIG9ic2VydmVyLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgbm9kZS5kYXRhID0gaXRlcmF0aW9ucyA9ICsraXRlcmF0aW9ucyAlIDI7XG4gIH07XG59XG5cbi8vIHdlYiB3b3JrZXJcbmZ1bmN0aW9uIHVzZU1lc3NhZ2VDaGFubmVsKCkge1xuICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZsdXNoO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1c2VTZXRUaW1lb3V0KCkge1xuICAvLyBTdG9yZSBzZXRUaW1lb3V0IHJlZmVyZW5jZSBzbyBlczYtcHJvbWlzZSB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbiAgLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG4gIHZhciBnbG9iYWxTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2xvYmFsU2V0VGltZW91dChmbHVzaCwgMSk7XG4gIH07XG59XG5cbnZhciBxdWV1ZSA9IG5ldyBBcnJheSgxMDAwKTtcbmZ1bmN0aW9uIGZsdXNoKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gcXVldWVbaV07XG4gICAgdmFyIGFyZyA9IHF1ZXVlW2kgKyAxXTtcblxuICAgIGNhbGxiYWNrKGFyZyk7XG5cbiAgICBxdWV1ZVtpXSA9IHVuZGVmaW5lZDtcbiAgICBxdWV1ZVtpICsgMV0gPSB1bmRlZmluZWQ7XG4gIH1cblxuICBsZW4gPSAwO1xufVxuXG5mdW5jdGlvbiBhdHRlbXB0VmVydHgoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHZlcnR4ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKS5yZXF1aXJlKCd2ZXJ0eCcpO1xuICAgIHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XG4gICAgcmV0dXJuIHVzZVZlcnR4VGltZXIoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XG4gIH1cbn1cblxudmFyIHNjaGVkdWxlRmx1c2ggPSB2b2lkIDA7XG4vLyBEZWNpZGUgd2hhdCBhc3luYyBtZXRob2QgdG8gdXNlIHRvIHRyaWdnZXJpbmcgcHJvY2Vzc2luZyBvZiBxdWV1ZWQgY2FsbGJhY2tzOlxuaWYgKGlzTm9kZSkge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTmV4dFRpY2soKTtcbn0gZWxzZSBpZiAoQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcbn0gZWxzZSBpZiAoaXNXb3JrZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU1lc3NhZ2VDaGFubmVsKCk7XG59IGVsc2UgaWYgKGJyb3dzZXJXaW5kb3cgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICBzY2hlZHVsZUZsdXNoID0gYXR0ZW1wdFZlcnR4KCk7XG59IGVsc2Uge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlU2V0VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiB0aGVuKG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzO1xuXG4gIHZhciBjaGlsZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG4gIGlmIChjaGlsZFtQUk9NSVNFX0lEXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWFrZVByb21pc2UoY2hpbGQpO1xuICB9XG5cbiAgdmFyIF9zdGF0ZSA9IHBhcmVudC5fc3RhdGU7XG5cblxuICBpZiAoX3N0YXRlKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzW19zdGF0ZSAtIDFdO1xuICAgIGFzYXAoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGludm9rZUNhbGxiYWNrKF9zdGF0ZSwgY2hpbGQsIGNhbGxiYWNrLCBwYXJlbnQuX3Jlc3VsdCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKTtcbiAgfVxuXG4gIHJldHVybiBjaGlsZDtcbn1cblxuLyoqXG4gIGBQcm9taXNlLnJlc29sdmVgIHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZWNvbWUgcmVzb2x2ZWQgd2l0aCB0aGVcbiAgcGFzc2VkIGB2YWx1ZWAuIEl0IGlzIHNob3J0aGFuZCBmb3IgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZXNvbHZlKDEpO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIHZhbHVlID09PSAxXG4gIH0pO1xuICBgYGBcblxuICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgxKTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIHZhbHVlID09PSAxXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIHJlc29sdmVcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FueX0gdmFsdWUgdmFsdWUgdGhhdCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGhcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSBmdWxmaWxsZWQgd2l0aCB0aGUgZ2l2ZW5cbiAgYHZhbHVlYFxuKi9cbmZ1bmN0aW9uIHJlc29sdmUkMShvYmplY3QpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICBpZiAob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIHJlc29sdmUocHJvbWlzZSwgb2JqZWN0KTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbnZhciBQUk9NSVNFX0lEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIpO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxudmFyIFBFTkRJTkcgPSB2b2lkIDA7XG52YXIgRlVMRklMTEVEID0gMTtcbnZhciBSRUpFQ1RFRCA9IDI7XG5cbmZ1bmN0aW9uIHNlbGZGdWxmaWxsbWVudCgpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXCJZb3UgY2Fubm90IHJlc29sdmUgYSBwcm9taXNlIHdpdGggaXRzZWxmXCIpO1xufVxuXG5mdW5jdGlvbiBjYW5ub3RSZXR1cm5Pd24oKSB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKCdBIHByb21pc2VzIGNhbGxiYWNrIGNhbm5vdCByZXR1cm4gdGhhdCBzYW1lIHByb21pc2UuJyk7XG59XG5cbmZ1bmN0aW9uIHRyeVRoZW4odGhlbiQkMSwgdmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcikge1xuICB0cnkge1xuICAgIHRoZW4kJDEuY2FsbCh2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSwgdGhlbiQkMSkge1xuICBhc2FwKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgdmFyIHNlYWxlZCA9IGZhbHNlO1xuICAgIHZhciBlcnJvciA9IHRyeVRoZW4odGhlbiQkMSwgdGhlbmFibGUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHNlYWxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgaWYgKHRoZW5hYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmIChzZWFsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VhbGVkID0gdHJ1ZTtcblxuICAgICAgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSwgJ1NldHRsZTogJyArIChwcm9taXNlLl9sYWJlbCB8fCAnIHVua25vd24gcHJvbWlzZScpKTtcblxuICAgIGlmICghc2VhbGVkICYmIGVycm9yKSB7XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICB9XG4gIH0sIHByb21pc2UpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSkge1xuICBpZiAodGhlbmFibGUuX3N0YXRlID09PSBGVUxGSUxMRUQpIHtcbiAgICBmdWxmaWxsKHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xuICB9IGVsc2UgaWYgKHRoZW5hYmxlLl9zdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICByZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHRoZW5hYmxlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHJldHVybiByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJDEpIHtcbiAgaWYgKG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IgPT09IHByb21pc2UuY29uc3RydWN0b3IgJiYgdGhlbiQkMSA9PT0gdGhlbiAmJiBtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yLnJlc29sdmUgPT09IHJlc29sdmUkMSkge1xuICAgIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICB9IGVsc2Uge1xuICAgIGlmICh0aGVuJCQxID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoZW4kJDEpKSB7XG4gICAgICBoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgcmVqZWN0KHByb21pc2UsIHNlbGZGdWxmaWxsbWVudCgpKTtcbiAgfSBlbHNlIGlmIChvYmplY3RPckZ1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciB0aGVuJCQxID0gdm9pZCAwO1xuICAgIHRyeSB7XG4gICAgICB0aGVuJCQxID0gdmFsdWUudGhlbjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSwgdGhlbiQkMSk7XG4gIH0gZWxzZSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVibGlzaFJlamVjdGlvbihwcm9taXNlKSB7XG4gIGlmIChwcm9taXNlLl9vbmVycm9yKSB7XG4gICAgcHJvbWlzZS5fb25lcnJvcihwcm9taXNlLl9yZXN1bHQpO1xuICB9XG5cbiAgcHVibGlzaChwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gZnVsZmlsbChwcm9taXNlLCB2YWx1ZSkge1xuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBwcm9taXNlLl9yZXN1bHQgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fc3RhdGUgPSBGVUxGSUxMRUQ7XG5cbiAgaWYgKHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCAhPT0gMCkge1xuICAgIGFzYXAocHVibGlzaCwgcHJvbWlzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVqZWN0KHByb21pc2UsIHJlYXNvbikge1xuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcHJvbWlzZS5fc3RhdGUgPSBSRUpFQ1RFRDtcbiAgcHJvbWlzZS5fcmVzdWx0ID0gcmVhc29uO1xuXG4gIGFzYXAocHVibGlzaFJlamVjdGlvbiwgcHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIHN1YnNjcmliZShwYXJlbnQsIGNoaWxkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbikge1xuICB2YXIgX3N1YnNjcmliZXJzID0gcGFyZW50Ll9zdWJzY3JpYmVycztcbiAgdmFyIGxlbmd0aCA9IF9zdWJzY3JpYmVycy5sZW5ndGg7XG5cblxuICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xuXG4gIF9zdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gIF9zdWJzY3JpYmVyc1tsZW5ndGggKyBGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcbiAgX3N1YnNjcmliZXJzW2xlbmd0aCArIFJFSkVDVEVEXSA9IG9uUmVqZWN0aW9uO1xuXG4gIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xuICAgIGFzYXAocHVibGlzaCwgcGFyZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdWJsaXNoKHByb21pc2UpIHtcbiAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjaGlsZCA9IHZvaWQgMCxcbiAgICAgIGNhbGxiYWNrID0gdm9pZCAwLFxuICAgICAgZGV0YWlsID0gcHJvbWlzZS5fcmVzdWx0O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICBjaGlsZCA9IHN1YnNjcmliZXJzW2ldO1xuICAgIGNhbGxiYWNrID0gc3Vic2NyaWJlcnNbaSArIHNldHRsZWRdO1xuXG4gICAgaWYgKGNoaWxkKSB7XG4gICAgICBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgfVxuICB9XG5cbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgcHJvbWlzZSwgY2FsbGJhY2ssIGRldGFpbCkge1xuICB2YXIgaGFzQ2FsbGJhY2sgPSBpc0Z1bmN0aW9uKGNhbGxiYWNrKSxcbiAgICAgIHZhbHVlID0gdm9pZCAwLFxuICAgICAgZXJyb3IgPSB2b2lkIDAsXG4gICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuXG4gIGlmIChoYXNDYWxsYmFjaykge1xuICAgIHRyeSB7XG4gICAgICB2YWx1ZSA9IGNhbGxiYWNrKGRldGFpbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgICBlcnJvciA9IGU7XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgY2Fubm90UmV0dXJuT3duKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IGRldGFpbDtcbiAgfVxuXG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIC8vIG5vb3BcbiAgfSBlbHNlIGlmIChoYXNDYWxsYmFjayAmJiBzdWNjZWVkZWQpIHtcbiAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgfSBlbHNlIGlmIChzdWNjZWVkZWQgPT09IGZhbHNlKSB7XG4gICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBGVUxGSUxMRUQpIHtcbiAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBSRUpFQ1RFRCkge1xuICAgIHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVByb21pc2UocHJvbWlzZSwgcmVzb2x2ZXIpIHtcbiAgdHJ5IHtcbiAgICByZXNvbHZlcihmdW5jdGlvbiByZXNvbHZlUHJvbWlzZSh2YWx1ZSkge1xuICAgICAgcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSwgZnVuY3Rpb24gcmVqZWN0UHJvbWlzZShyZWFzb24pIHtcbiAgICAgIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVqZWN0KHByb21pc2UsIGUpO1xuICB9XG59XG5cbnZhciBpZCA9IDA7XG5mdW5jdGlvbiBuZXh0SWQoKSB7XG4gIHJldHVybiBpZCsrO1xufVxuXG5mdW5jdGlvbiBtYWtlUHJvbWlzZShwcm9taXNlKSB7XG4gIHByb21pc2VbUFJPTUlTRV9JRF0gPSBpZCsrO1xuICBwcm9taXNlLl9zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgcHJvbWlzZS5fcmVzdWx0ID0gdW5kZWZpbmVkO1xuICBwcm9taXNlLl9zdWJzY3JpYmVycyA9IFtdO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0aW9uRXJyb3IoKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoJ0FycmF5IE1ldGhvZHMgbXVzdCBiZSBwcm92aWRlZCBhbiBBcnJheScpO1xufVxuXG52YXIgRW51bWVyYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRW51bWVyYXRvcihDb25zdHJ1Y3RvciwgaW5wdXQpIHtcbiAgICB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yID0gQ29uc3RydWN0b3I7XG4gICAgdGhpcy5wcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xuXG4gICAgaWYgKCF0aGlzLnByb21pc2VbUFJPTUlTRV9JRF0pIHtcbiAgICAgIG1ha2VQcm9taXNlKHRoaXMucHJvbWlzZSk7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcbiAgICAgIHRoaXMuX3JlbWFpbmluZyA9IGlucHV0Lmxlbmd0aDtcblxuICAgICAgdGhpcy5fcmVzdWx0ID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKTtcblxuICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aCB8fCAwO1xuICAgICAgICB0aGlzLl9lbnVtZXJhdGUoaW5wdXQpO1xuICAgICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVqZWN0KHRoaXMucHJvbWlzZSwgdmFsaWRhdGlvbkVycm9yKCkpO1xuICAgIH1cbiAgfVxuXG4gIEVudW1lcmF0b3IucHJvdG90eXBlLl9lbnVtZXJhdGUgPSBmdW5jdGlvbiBfZW51bWVyYXRlKGlucHV0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IHRoaXMuX3N0YXRlID09PSBQRU5ESU5HICYmIGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fZWFjaEVudHJ5KGlucHV0W2ldLCBpKTtcbiAgICB9XG4gIH07XG5cbiAgRW51bWVyYXRvci5wcm90b3R5cGUuX2VhY2hFbnRyeSA9IGZ1bmN0aW9uIF9lYWNoRW50cnkoZW50cnksIGkpIHtcbiAgICB2YXIgYyA9IHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3I7XG4gICAgdmFyIHJlc29sdmUkJDEgPSBjLnJlc29sdmU7XG5cblxuICAgIGlmIChyZXNvbHZlJCQxID09PSByZXNvbHZlJDEpIHtcbiAgICAgIHZhciBfdGhlbiA9IHZvaWQgMDtcbiAgICAgIHZhciBlcnJvciA9IHZvaWQgMDtcbiAgICAgIHZhciBkaWRFcnJvciA9IGZhbHNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgX3RoZW4gPSBlbnRyeS50aGVuO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkaWRFcnJvciA9IHRydWU7XG4gICAgICAgIGVycm9yID0gZTtcbiAgICAgIH1cblxuICAgICAgaWYgKF90aGVuID09PSB0aGVuICYmIGVudHJ5Ll9zdGF0ZSAhPT0gUEVORElORykge1xuICAgICAgICB0aGlzLl9zZXR0bGVkQXQoZW50cnkuX3N0YXRlLCBpLCBlbnRyeS5fcmVzdWx0KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIF90aGVuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuICAgICAgICB0aGlzLl9yZXN1bHRbaV0gPSBlbnRyeTtcbiAgICAgIH0gZWxzZSBpZiAoYyA9PT0gUHJvbWlzZSQxKSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IGMobm9vcCk7XG4gICAgICAgIGlmIChkaWRFcnJvcikge1xuICAgICAgICAgIHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBlbnRyeSwgX3RoZW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChuZXcgYyhmdW5jdGlvbiAocmVzb2x2ZSQkMSkge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlJCQxKGVudHJ5KTtcbiAgICAgICAgfSksIGkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93aWxsU2V0dGxlQXQocmVzb2x2ZSQkMShlbnRyeSksIGkpO1xuICAgIH1cbiAgfTtcblxuICBFbnVtZXJhdG9yLnByb3RvdHlwZS5fc2V0dGxlZEF0ID0gZnVuY3Rpb24gX3NldHRsZWRBdChzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMucHJvbWlzZTtcblxuXG4gICAgaWYgKHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgICB0aGlzLl9yZW1haW5pbmctLTtcblxuICAgICAgaWYgKHN0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgICAgICByZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0W2ldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgIH1cbiAgfTtcblxuICBFbnVtZXJhdG9yLnByb3RvdHlwZS5fd2lsbFNldHRsZUF0ID0gZnVuY3Rpb24gX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKSB7XG4gICAgdmFyIGVudW1lcmF0b3IgPSB0aGlzO1xuXG4gICAgc3Vic2NyaWJlKHByb21pc2UsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZW51bWVyYXRvci5fc2V0dGxlZEF0KEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHJldHVybiBlbnVtZXJhdG9yLl9zZXR0bGVkQXQoUkVKRUNURUQsIGksIHJlYXNvbik7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEVudW1lcmF0b3I7XG59KCk7XG5cbi8qKlxuICBgUHJvbWlzZS5hbGxgIGFjY2VwdHMgYW4gYXJyYXkgb2YgcHJvbWlzZXMsIGFuZCByZXR1cm5zIGEgbmV3IHByb21pc2Ugd2hpY2hcbiAgaXMgZnVsZmlsbGVkIHdpdGggYW4gYXJyYXkgb2YgZnVsZmlsbG1lbnQgdmFsdWVzIGZvciB0aGUgcGFzc2VkIHByb21pc2VzLCBvclxuICByZWplY3RlZCB3aXRoIHRoZSByZWFzb24gb2YgdGhlIGZpcnN0IHBhc3NlZCBwcm9taXNlIHRvIGJlIHJlamVjdGVkLiBJdCBjYXN0cyBhbGxcbiAgZWxlbWVudHMgb2YgdGhlIHBhc3NlZCBpdGVyYWJsZSB0byBwcm9taXNlcyBhcyBpdCBydW5zIHRoaXMgYWxnb3JpdGhtLlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSByZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSByZXNvbHZlKDIpO1xuICBsZXQgcHJvbWlzZTMgPSByZXNvbHZlKDMpO1xuICBsZXQgcHJvbWlzZXMgPSBbIHByb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTMgXTtcblxuICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gVGhlIGFycmF5IGhlcmUgd291bGQgYmUgWyAxLCAyLCAzIF07XG4gIH0pO1xuICBgYGBcblxuICBJZiBhbnkgb2YgdGhlIGBwcm9taXNlc2AgZ2l2ZW4gdG8gYGFsbGAgYXJlIHJlamVjdGVkLCB0aGUgZmlyc3QgcHJvbWlzZVxuICB0aGF0IGlzIHJlamVjdGVkIHdpbGwgYmUgZ2l2ZW4gYXMgYW4gYXJndW1lbnQgdG8gdGhlIHJldHVybmVkIHByb21pc2VzJ3NcbiAgcmVqZWN0aW9uIGhhbmRsZXIuIEZvciBleGFtcGxlOlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSByZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSByZWplY3QobmV3IEVycm9yKFwiMlwiKSk7XG4gIGxldCBwcm9taXNlMyA9IHJlamVjdChuZXcgRXJyb3IoXCIzXCIpKTtcbiAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XG5cbiAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zIGJlY2F1c2UgdGhlcmUgYXJlIHJlamVjdGVkIHByb21pc2VzIVxuICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgIC8vIGVycm9yLm1lc3NhZ2UgPT09IFwiMlwiXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIGFsbFxuICBAc3RhdGljXG4gIEBwYXJhbSB7QXJyYXl9IGVudHJpZXMgYXJyYXkgb2YgcHJvbWlzZXNcbiAgQHBhcmFtIHtTdHJpbmd9IGxhYmVsIG9wdGlvbmFsIHN0cmluZyBmb3IgbGFiZWxpbmcgdGhlIHByb21pc2UuXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aGVuIGFsbCBgcHJvbWlzZXNgIGhhdmUgYmVlblxuICBmdWxmaWxsZWQsIG9yIHJlamVjdGVkIGlmIGFueSBvZiB0aGVtIGJlY29tZSByZWplY3RlZC5cbiAgQHN0YXRpY1xuKi9cbmZ1bmN0aW9uIGFsbChlbnRyaWVzKSB7XG4gIHJldHVybiBuZXcgRW51bWVyYXRvcih0aGlzLCBlbnRyaWVzKS5wcm9taXNlO1xufVxuXG4vKipcbiAgYFByb21pc2UucmFjZWAgcmV0dXJucyBhIG5ldyBwcm9taXNlIHdoaWNoIGlzIHNldHRsZWQgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZVxuICBmaXJzdCBwYXNzZWQgcHJvbWlzZSB0byBzZXR0bGUuXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAxJyk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgbGV0IHByb21pc2UyID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDInKTtcbiAgICB9LCAxMDApO1xuICB9KTtcblxuICBQcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyByZXN1bHQgPT09ICdwcm9taXNlIDInIGJlY2F1c2UgaXQgd2FzIHJlc29sdmVkIGJlZm9yZSBwcm9taXNlMVxuICAgIC8vIHdhcyByZXNvbHZlZC5cbiAgfSk7XG4gIGBgYFxuXG4gIGBQcm9taXNlLnJhY2VgIGlzIGRldGVybWluaXN0aWMgaW4gdGhhdCBvbmx5IHRoZSBzdGF0ZSBvZiB0aGUgZmlyc3RcbiAgc2V0dGxlZCBwcm9taXNlIG1hdHRlcnMuIEZvciBleGFtcGxlLCBldmVuIGlmIG90aGVyIHByb21pc2VzIGdpdmVuIHRvIHRoZVxuICBgcHJvbWlzZXNgIGFycmF5IGFyZ3VtZW50IGFyZSByZXNvbHZlZCwgYnV0IHRoZSBmaXJzdCBzZXR0bGVkIHByb21pc2UgaGFzXG4gIGJlY29tZSByZWplY3RlZCBiZWZvcmUgdGhlIG90aGVyIHByb21pc2VzIGJlY2FtZSBmdWxmaWxsZWQsIHRoZSByZXR1cm5lZFxuICBwcm9taXNlIHdpbGwgYmVjb21lIHJlamVjdGVkOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDEnKTtcbiAgICB9LCAyMDApO1xuICB9KTtcblxuICBsZXQgcHJvbWlzZTIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoJ3Byb21pc2UgMicpKTtcbiAgICB9LCAxMDApO1xuICB9KTtcblxuICBQcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyBDb2RlIGhlcmUgbmV2ZXIgcnVuc1xuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAncHJvbWlzZSAyJyBiZWNhdXNlIHByb21pc2UgMiBiZWNhbWUgcmVqZWN0ZWQgYmVmb3JlXG4gICAgLy8gcHJvbWlzZSAxIGJlY2FtZSBmdWxmaWxsZWRcbiAgfSk7XG4gIGBgYFxuXG4gIEFuIGV4YW1wbGUgcmVhbC13b3JsZCB1c2UgY2FzZSBpcyBpbXBsZW1lbnRpbmcgdGltZW91dHM6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBQcm9taXNlLnJhY2UoW2FqYXgoJ2Zvby5qc29uJyksIHRpbWVvdXQoNTAwMCldKVxuICBgYGBcblxuICBAbWV0aG9kIHJhY2VcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FycmF5fSBwcm9taXNlcyBhcnJheSBvZiBwcm9taXNlcyB0byBvYnNlcnZlXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHdoaWNoIHNldHRsZXMgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZSBmaXJzdCBwYXNzZWRcbiAgcHJvbWlzZSB0byBzZXR0bGUuXG4qL1xuZnVuY3Rpb24gcmFjZShlbnRyaWVzKSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgaWYgKCFpc0FycmF5KGVudHJpZXMpKSB7XG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiAoXywgcmVqZWN0KSB7XG4gICAgICByZXR1cm4gcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gYXJyYXkgdG8gcmFjZS4nKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgbGVuZ3RoID0gZW50cmllcy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnJlc29sdmUoZW50cmllc1tpXSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICBgUHJvbWlzZS5yZWplY3RgIHJldHVybnMgYSBwcm9taXNlIHJlamVjdGVkIHdpdGggdGhlIHBhc3NlZCBgcmVhc29uYC5cbiAgSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHJlamVjdChuZXcgRXJyb3IoJ1dIT09QUycpKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ1dIT09QUydcbiAgfSk7XG4gIGBgYFxuXG4gIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ1dIT09QUydcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVqZWN0XG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBbnl9IHJlYXNvbiB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aC5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCB0aGUgZ2l2ZW4gYHJlYXNvbmAuXG4qL1xuZnVuY3Rpb24gcmVqZWN0JDEocmVhc29uKSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG4gIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xuICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIG5lZWRzUmVzb2x2ZXIoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbn1cblxuZnVuY3Rpb24gbmVlZHNOZXcoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdQcm9taXNlJzogUGxlYXNlIHVzZSB0aGUgJ25ldycgb3BlcmF0b3IsIHRoaXMgb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi5cIik7XG59XG5cbi8qKlxuICBQcm9taXNlIG9iamVjdHMgcmVwcmVzZW50IHRoZSBldmVudHVhbCByZXN1bHQgb2YgYW4gYXN5bmNocm9ub3VzIG9wZXJhdGlvbi4gVGhlXG4gIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsIHdoaWNoXG4gIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cblxuICBUZXJtaW5vbG9neVxuICAtLS0tLS0tLS0tLVxuXG4gIC0gYHByb21pc2VgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB3aXRoIGEgYHRoZW5gIG1ldGhvZCB3aG9zZSBiZWhhdmlvciBjb25mb3JtcyB0byB0aGlzIHNwZWNpZmljYXRpb24uXG4gIC0gYHRoZW5hYmxlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIGEgYHRoZW5gIG1ldGhvZC5cbiAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAtIGBleGNlcHRpb25gIGlzIGEgdmFsdWUgdGhhdCBpcyB0aHJvd24gdXNpbmcgdGhlIHRocm93IHN0YXRlbWVudC5cbiAgLSBgcmVhc29uYCBpcyBhIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoeSBhIHByb21pc2Ugd2FzIHJlamVjdGVkLlxuICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICBBIHByb21pc2UgY2FuIGJlIGluIG9uZSBvZiB0aHJlZSBzdGF0ZXM6IHBlbmRpbmcsIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQuXG5cbiAgUHJvbWlzZXMgdGhhdCBhcmUgZnVsZmlsbGVkIGhhdmUgYSBmdWxmaWxsbWVudCB2YWx1ZSBhbmQgYXJlIGluIHRoZSBmdWxmaWxsZWRcbiAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICByZWplY3RlZCBzdGF0ZS4gIEEgZnVsZmlsbG1lbnQgdmFsdWUgaXMgbmV2ZXIgYSB0aGVuYWJsZS5cblxuICBQcm9taXNlcyBjYW4gYWxzbyBiZSBzYWlkIHRvICpyZXNvbHZlKiBhIHZhbHVlLiAgSWYgdGhpcyB2YWx1ZSBpcyBhbHNvIGFcbiAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICBzZXR0bGVkIHN0YXRlLiAgU28gYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCByZWplY3RzIHdpbGxcbiAgaXRzZWxmIHJlamVjdCwgYW5kIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2lsbFxuICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gIEJhc2ljIFVzYWdlOlxuICAtLS0tLS0tLS0tLS1cblxuICBgYGBqc1xuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIC8vIG9uIHN1Y2Nlc3NcbiAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgIC8vIG9uIGZhaWx1cmVcbiAgICByZWplY3QocmVhc29uKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgLy8gb24gcmVqZWN0aW9uXG4gIH0pO1xuICBgYGBcblxuICBBZHZhbmNlZCBVc2FnZTpcbiAgLS0tLS0tLS0tLS0tLS0tXG5cbiAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICBgWE1MSHR0cFJlcXVlc3Rgcy5cblxuICBgYGBqc1xuICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBoYW5kbGVyO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgeGhyLnNlbmQoKTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2dldEpTT046IGAnICsgdXJsICsgJ2AgZmFpbGVkIHdpdGggc3RhdHVzOiBbJyArIHRoaXMuc3RhdHVzICsgJ10nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SlNPTignL3Bvc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAvLyBvbiBmdWxmaWxsbWVudFxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyBvbiByZWplY3Rpb25cbiAgfSk7XG4gIGBgYFxuXG4gIFVubGlrZSBjYWxsYmFja3MsIHByb21pc2VzIGFyZSBncmVhdCBjb21wb3NhYmxlIHByaW1pdGl2ZXMuXG5cbiAgYGBganNcbiAgUHJvbWlzZS5hbGwoW1xuICAgIGdldEpTT04oJy9wb3N0cycpLFxuICAgIGdldEpTT04oJy9jb21tZW50cycpXG4gIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICB2YWx1ZXNbMF0gLy8gPT4gcG9zdHNKU09OXG4gICAgdmFsdWVzWzFdIC8vID0+IGNvbW1lbnRzSlNPTlxuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfSk7XG4gIGBgYFxuXG4gIEBjbGFzcyBQcm9taXNlXG4gIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVyXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQGNvbnN0cnVjdG9yXG4qL1xuXG52YXIgUHJvbWlzZSQxID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQcm9taXNlKHJlc29sdmVyKSB7XG4gICAgdGhpc1tQUk9NSVNFX0lEXSA9IG5leHRJZCgpO1xuICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3N0YXRlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3N1YnNjcmliZXJzID0gW107XG5cbiAgICBpZiAobm9vcCAhPT0gcmVzb2x2ZXIpIHtcbiAgICAgIHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJyAmJiBuZWVkc1Jlc29sdmVyKCk7XG4gICAgICB0aGlzIGluc3RhbmNlb2YgUHJvbWlzZSA/IGluaXRpYWxpemVQcm9taXNlKHRoaXMsIHJlc29sdmVyKSA6IG5lZWRzTmV3KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gIFRoZSBwcmltYXJ5IHdheSBvZiBpbnRlcmFjdGluZyB3aXRoIGEgcHJvbWlzZSBpcyB0aHJvdWdoIGl0cyBgdGhlbmAgbWV0aG9kLFxuICB3aGljaCByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZVxuICByZWFzb24gd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG4gICBgYGBqc1xuICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgLy8gdXNlciBpcyBhdmFpbGFibGVcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICB9KTtcbiAgYGBgXG4gICBDaGFpbmluZ1xuICAtLS0tLS0tLVxuICAgVGhlIHJldHVybiB2YWx1ZSBvZiBgdGhlbmAgaXMgaXRzZWxmIGEgcHJvbWlzZS4gIFRoaXMgc2Vjb25kLCAnZG93bnN0cmVhbSdcbiAgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZpcnN0IHByb21pc2UncyBmdWxmaWxsbWVudFxuICBvciByZWplY3Rpb24gaGFuZGxlciwgb3IgcmVqZWN0ZWQgaWYgdGhlIGhhbmRsZXIgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbiAgIGBgYGpzXG4gIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgIHJldHVybiB1c2VyLm5hbWU7XG4gIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKHVzZXJOYW1lKSB7XG4gICAgLy8gSWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGB1c2VyTmFtZWAgd2lsbCBiZSB0aGUgdXNlcidzIG5hbWUsIG90aGVyd2lzZSBpdFxuICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICB9KTtcbiAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknKTtcbiAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScpO1xuICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIC8vIGlmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgcmVhc29uYCB3aWxsIGJlICdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScuXG4gICAgLy8gSWYgYGZpbmRVc2VyYCByZWplY3RlZCwgYHJlYXNvbmAgd2lsbCBiZSAnYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScuXG4gIH0pO1xuICBgYGBcbiAgSWYgdGhlIGRvd25zdHJlYW0gcHJvbWlzZSBkb2VzIG5vdCBzcGVjaWZ5IGEgcmVqZWN0aW9uIGhhbmRsZXIsIHJlamVjdGlvbiByZWFzb25zIHdpbGwgYmUgcHJvcGFnYXRlZCBmdXJ0aGVyIGRvd25zdHJlYW0uXG4gICBgYGBqc1xuICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICB0aHJvdyBuZXcgUGVkYWdvZ2ljYWxFeGNlcHRpb24oJ1Vwc3RyZWFtIGVycm9yJyk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gbmV2ZXIgcmVhY2hlZFxuICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIC8vIFRoZSBgUGVkZ2Fnb2NpYWxFeGNlcHRpb25gIGlzIHByb3BhZ2F0ZWQgYWxsIHRoZSB3YXkgZG93biB0byBoZXJlXG4gIH0pO1xuICBgYGBcbiAgIEFzc2ltaWxhdGlvblxuICAtLS0tLS0tLS0tLS1cbiAgIFNvbWV0aW1lcyB0aGUgdmFsdWUgeW91IHdhbnQgdG8gcHJvcGFnYXRlIHRvIGEgZG93bnN0cmVhbSBwcm9taXNlIGNhbiBvbmx5IGJlXG4gIHJldHJpZXZlZCBhc3luY2hyb25vdXNseS4gVGhpcyBjYW4gYmUgYWNoaWV2ZWQgYnkgcmV0dXJuaW5nIGEgcHJvbWlzZSBpbiB0aGVcbiAgZnVsZmlsbG1lbnQgb3IgcmVqZWN0aW9uIGhhbmRsZXIuIFRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCB0aGVuIGJlIHBlbmRpbmdcbiAgdW50aWwgdGhlIHJldHVybmVkIHByb21pc2UgaXMgc2V0dGxlZC4gVGhpcyBpcyBjYWxsZWQgKmFzc2ltaWxhdGlvbiouXG4gICBgYGBqc1xuICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgLy8gVGhlIHVzZXIncyBjb21tZW50cyBhcmUgbm93IGF2YWlsYWJsZVxuICB9KTtcbiAgYGBgXG4gICBJZiB0aGUgYXNzaW1saWF0ZWQgcHJvbWlzZSByZWplY3RzLCB0aGVuIHRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCBhbHNvIHJlamVjdC5cbiAgIGBgYGpzXG4gIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIGZ1bGZpbGxzLCB3ZSdsbCBoYXZlIHRoZSB2YWx1ZSBoZXJlXG4gIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIHJlamVjdHMsIHdlJ2xsIGhhdmUgdGhlIHJlYXNvbiBoZXJlXG4gIH0pO1xuICBgYGBcbiAgIFNpbXBsZSBFeGFtcGxlXG4gIC0tLS0tLS0tLS0tLS0tXG4gICBTeW5jaHJvbm91cyBFeGFtcGxlXG4gICBgYGBqYXZhc2NyaXB0XG4gIGxldCByZXN1bHQ7XG4gICB0cnkge1xuICAgIHJlc3VsdCA9IGZpbmRSZXN1bHQoKTtcbiAgICAvLyBzdWNjZXNzXG4gIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgLy8gZmFpbHVyZVxuICB9XG4gIGBgYFxuICAgRXJyYmFjayBFeGFtcGxlXG4gICBgYGBqc1xuICBmaW5kUmVzdWx0KGZ1bmN0aW9uKHJlc3VsdCwgZXJyKXtcbiAgICBpZiAoZXJyKSB7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9XG4gIH0pO1xuICBgYGBcbiAgIFByb21pc2UgRXhhbXBsZTtcbiAgIGBgYGphdmFzY3JpcHRcbiAgZmluZFJlc3VsdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyBzdWNjZXNzXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gZmFpbHVyZVxuICB9KTtcbiAgYGBgXG4gICBBZHZhbmNlZCBFeGFtcGxlXG4gIC0tLS0tLS0tLS0tLS0tXG4gICBTeW5jaHJvbm91cyBFeGFtcGxlXG4gICBgYGBqYXZhc2NyaXB0XG4gIGxldCBhdXRob3IsIGJvb2tzO1xuICAgdHJ5IHtcbiAgICBhdXRob3IgPSBmaW5kQXV0aG9yKCk7XG4gICAgYm9va3MgID0gZmluZEJvb2tzQnlBdXRob3IoYXV0aG9yKTtcbiAgICAvLyBzdWNjZXNzXG4gIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgLy8gZmFpbHVyZVxuICB9XG4gIGBgYFxuICAgRXJyYmFjayBFeGFtcGxlXG4gICBgYGBqc1xuICAgZnVuY3Rpb24gZm91bmRCb29rcyhib29rcykge1xuICAgfVxuICAgZnVuY3Rpb24gZmFpbHVyZShyZWFzb24pIHtcbiAgIH1cbiAgIGZpbmRBdXRob3IoZnVuY3Rpb24oYXV0aG9yLCBlcnIpe1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZmluZEJvb29rc0J5QXV0aG9yKGF1dGhvciwgZnVuY3Rpb24oYm9va3MsIGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZm91bmRCb29rcyhib29rcyk7XG4gICAgICAgICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAgICAgICBmYWlsdXJlKHJlYXNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgfVxuICAgICAgLy8gc3VjY2Vzc1xuICAgIH1cbiAgfSk7XG4gIGBgYFxuICAgUHJvbWlzZSBFeGFtcGxlO1xuICAgYGBgamF2YXNjcmlwdFxuICBmaW5kQXV0aG9yKCkuXG4gICAgdGhlbihmaW5kQm9va3NCeUF1dGhvcikuXG4gICAgdGhlbihmdW5jdGlvbihib29rcyl7XG4gICAgICAvLyBmb3VuZCBib29rc1xuICB9KS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gIH0pO1xuICBgYGBcbiAgIEBtZXRob2QgdGhlblxuICBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZ1bGZpbGxlZFxuICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGVkXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX1cbiAgKi9cblxuICAvKipcbiAgYGNhdGNoYCBpcyBzaW1wbHkgc3VnYXIgZm9yIGB0aGVuKHVuZGVmaW5lZCwgb25SZWplY3Rpb24pYCB3aGljaCBtYWtlcyBpdCB0aGUgc2FtZVxuICBhcyB0aGUgY2F0Y2ggYmxvY2sgb2YgYSB0cnkvY2F0Y2ggc3RhdGVtZW50LlxuICBgYGBqc1xuICBmdW5jdGlvbiBmaW5kQXV0aG9yKCl7XG4gIHRocm93IG5ldyBFcnJvcignY291bGRuJ3QgZmluZCB0aGF0IGF1dGhvcicpO1xuICB9XG4gIC8vIHN5bmNocm9ub3VzXG4gIHRyeSB7XG4gIGZpbmRBdXRob3IoKTtcbiAgfSBjYXRjaChyZWFzb24pIHtcbiAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgfVxuICAvLyBhc3luYyB3aXRoIHByb21pc2VzXG4gIGZpbmRBdXRob3IoKS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICB9KTtcbiAgYGBgXG4gIEBtZXRob2QgY2F0Y2hcbiAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3Rpb25cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuXG5cbiAgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbiBfY2F0Y2gob25SZWplY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgfTtcblxuICAvKipcbiAgICBgZmluYWxseWAgd2lsbCBiZSBpbnZva2VkIHJlZ2FyZGxlc3Mgb2YgdGhlIHByb21pc2UncyBmYXRlIGp1c3QgYXMgbmF0aXZlXG4gICAgdHJ5L2NhdGNoL2ZpbmFsbHkgYmVoYXZlc1xuICBcbiAgICBTeW5jaHJvbm91cyBleGFtcGxlOlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRBdXRob3IoKSB7XG4gICAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgQXV0aG9yKCk7XG4gICAgfVxuICBcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZpbmRBdXRob3IoKTsgLy8gc3VjY2VlZCBvciBmYWlsXG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgcmV0dXJuIGZpbmRPdGhlckF1dGhlcigpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyBhbHdheXMgcnVuc1xuICAgICAgLy8gZG9lc24ndCBhZmZlY3QgdGhlIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICBgYGBcbiAgXG4gICAgQXN5bmNocm9ub3VzIGV4YW1wbGU6XG4gIFxuICAgIGBgYGpzXG4gICAgZmluZEF1dGhvcigpLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICByZXR1cm4gZmluZE90aGVyQXV0aGVyKCk7XG4gICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgLy8gYXV0aG9yIHdhcyBlaXRoZXIgZm91bmQsIG9yIG5vdFxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBAbWV0aG9kIGZpbmFsbHlcbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICovXG5cblxuICBQcm9taXNlLnByb3RvdHlwZS5maW5hbGx5ID0gZnVuY3Rpb24gX2ZpbmFsbHkoY2FsbGJhY2spIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gcHJvbWlzZS5jb25zdHJ1Y3RvcjtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhyb3cgcmVhc29uO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlLnRoZW4oY2FsbGJhY2ssIGNhbGxiYWNrKTtcbiAgfTtcblxuICByZXR1cm4gUHJvbWlzZTtcbn0oKTtcblxuUHJvbWlzZSQxLnByb3RvdHlwZS50aGVuID0gdGhlbjtcblByb21pc2UkMS5hbGwgPSBhbGw7XG5Qcm9taXNlJDEucmFjZSA9IHJhY2U7XG5Qcm9taXNlJDEucmVzb2x2ZSA9IHJlc29sdmUkMTtcblByb21pc2UkMS5yZWplY3QgPSByZWplY3QkMTtcblByb21pc2UkMS5fc2V0U2NoZWR1bGVyID0gc2V0U2NoZWR1bGVyO1xuUHJvbWlzZSQxLl9zZXRBc2FwID0gc2V0QXNhcDtcblByb21pc2UkMS5fYXNhcCA9IGFzYXA7XG5cbi8qZ2xvYmFsIHNlbGYqL1xuZnVuY3Rpb24gcG9seWZpbGwoKSB7XG4gIHZhciBsb2NhbCA9IHZvaWQgMDtcblxuICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsb2NhbCA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsb2NhbCA9IHNlbGY7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BvbHlmaWxsIGZhaWxlZCBiZWNhdXNlIGdsb2JhbCBvYmplY3QgaXMgdW5hdmFpbGFibGUgaW4gdGhpcyBlbnZpcm9ubWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBQID0gbG9jYWwuUHJvbWlzZTtcblxuICBpZiAoUCkge1xuICAgIHZhciBwcm9taXNlVG9TdHJpbmcgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBwcm9taXNlVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUC5yZXNvbHZlKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNpbGVudGx5IGlnbm9yZWRcbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZVRvU3RyaW5nID09PSAnW29iamVjdCBQcm9taXNlXScgJiYgIVAuY2FzdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGxvY2FsLlByb21pc2UgPSBQcm9taXNlJDE7XG59XG5cbi8vIFN0cmFuZ2UgY29tcGF0Li5cblByb21pc2UkMS5wb2x5ZmlsbCA9IHBvbHlmaWxsO1xuUHJvbWlzZSQxLlByb21pc2UgPSBQcm9taXNlJDE7XG5cbnJldHVybiBQcm9taXNlJDE7XG5cbn0pKSk7XG5cblxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1lczYtcHJvbWlzZS5tYXBcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwiXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9yRWFjaCAob2JqLCBmbiwgY3R4KSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwoZm4pICE9PSAnW29iamVjdCBGdW5jdGlvbl0nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2l0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cbiAgICB2YXIgbCA9IG9iai5sZW5ndGg7XG4gICAgaWYgKGwgPT09ICtsKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBmbi5jYWxsKGN0eCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChvYmosIGspKSB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChjdHgsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbiIsInZhciB3aW47XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgd2luID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgd2luID0ge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2luO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHR5cGVzID0gW1xuICByZXF1aXJlKCcuL25leHRUaWNrJyksXG4gIHJlcXVpcmUoJy4vbXV0YXRpb24uanMnKSxcbiAgcmVxdWlyZSgnLi9tZXNzYWdlQ2hhbm5lbCcpLFxuICByZXF1aXJlKCcuL3N0YXRlQ2hhbmdlJyksXG4gIHJlcXVpcmUoJy4vdGltZW91dCcpXG5dO1xudmFyIGRyYWluaW5nO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG52YXIgcXVldWUgPSBbXTtcbnZhciBzY2hlZHVsZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRyYWluaW5nID0gZmFsc2U7XG4gIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgfSBlbHNlIHtcbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gIH1cbiAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgIG5leHRUaWNrKCk7XG4gIH1cbn1cblxuLy9uYW1lZCBuZXh0VGljayBmb3IgbGVzcyBjb25mdXNpbmcgc3RhY2sgdHJhY2VzXG5mdW5jdGlvbiBuZXh0VGljaygpIHtcbiAgaWYgKGRyYWluaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHNjaGVkdWxlZCA9IGZhbHNlO1xuICBkcmFpbmluZyA9IHRydWU7XG4gIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICB3aGlsZSAobGVuKSB7XG4gICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgcXVldWUgPSBbXTtcbiAgICB3aGlsZSAoY3VycmVudFF1ZXVlICYmICsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgIH1cbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICB9XG4gIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gIHF1ZXVlSW5kZXggPSAtMTtcbiAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxudmFyIHNjaGVkdWxlRHJhaW47XG52YXIgaSA9IC0xO1xudmFyIGxlbiA9IHR5cGVzLmxlbmd0aDtcbndoaWxlICgrK2kgPCBsZW4pIHtcbiAgaWYgKHR5cGVzW2ldICYmIHR5cGVzW2ldLnRlc3QgJiYgdHlwZXNbaV0udGVzdCgpKSB7XG4gICAgc2NoZWR1bGVEcmFpbiA9IHR5cGVzW2ldLmluc3RhbGwobmV4dFRpY2spO1xuICAgIGJyZWFrO1xuICB9XG59XG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgdGhpcy5mdW4gPSBmdW47XG4gIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZ1biA9IHRoaXMuZnVuO1xuICB2YXIgYXJyYXkgPSB0aGlzLmFycmF5O1xuICBzd2l0Y2ggKGFycmF5Lmxlbmd0aCkge1xuICBjYXNlIDA6XG4gICAgcmV0dXJuIGZ1bigpO1xuICBjYXNlIDE6XG4gICAgcmV0dXJuIGZ1bihhcnJheVswXSk7XG4gIGNhc2UgMjpcbiAgICByZXR1cm4gZnVuKGFycmF5WzBdLCBhcnJheVsxXSk7XG4gIGNhc2UgMzpcbiAgICByZXR1cm4gZnVuKGFycmF5WzBdLCBhcnJheVsxXSwgYXJyYXlbMl0pO1xuICBkZWZhdWx0OlxuICAgIHJldHVybiBmdW4uYXBwbHkobnVsbCwgYXJyYXkpO1xuICB9XG5cbn07XG5tb2R1bGUuZXhwb3J0cyA9IGltbWVkaWF0ZTtcbmZ1bmN0aW9uIGltbWVkaWF0ZSh0YXNrKSB7XG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgfVxuICBxdWV1ZS5wdXNoKG5ldyBJdGVtKHRhc2ssIGFyZ3MpKTtcbiAgaWYgKCFzY2hlZHVsZWQgJiYgIWRyYWluaW5nKSB7XG4gICAgc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICBzY2hlZHVsZURyYWluKCk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgIC8vIHdlIGNhbiBvbmx5IGdldCBoZXJlIGluIElFMTBcbiAgICAvLyB3aGljaCBkb2Vzbid0IGhhbmRlbCBwb3N0TWVzc2FnZSB3ZWxsXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0eXBlb2YgZ2xvYmFsLk1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJztcbn07XG5cbmV4cG9ydHMuaW5zdGFsbCA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gIHZhciBjaGFubmVsID0gbmV3IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCgpO1xuICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmM7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy9iYXNlZCBvZmYgcnN2cCBodHRwczovL2dpdGh1Yi5jb20vdGlsZGVpby9yc3ZwLmpzXG4vL2xpY2Vuc2UgaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qcy9ibG9iL21hc3Rlci9MSUNFTlNFXG4vL2h0dHBzOi8vZ2l0aHViLmNvbS90aWxkZWlvL3JzdnAuanMvYmxvYi9tYXN0ZXIvbGliL3JzdnAvYXNhcC5qc1xuXG52YXIgTXV0YXRpb24gPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcblxuZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gTXV0YXRpb247XG59O1xuXG5leHBvcnRzLmluc3RhbGwgPSBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gIHZhciBjYWxsZWQgPSAwO1xuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb24oaGFuZGxlKTtcbiAgdmFyIGVsZW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIHtcbiAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGVsZW1lbnQuZGF0YSA9IChjYWxsZWQgPSArK2NhbGxlZCAlIDIpO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5leHBvcnRzLnRlc3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgcmV0dXJuICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpICYmICFwcm9jZXNzLmJyb3dzZXI7XG59O1xuXG5leHBvcnRzLmluc3RhbGwgPSBmdW5jdGlvbiAoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuYyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLnRlc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnZG9jdW1lbnQnIGluIGdsb2JhbCAmJiAnb25yZWFkeXN0YXRlY2hhbmdlJyBpbiBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG59O1xuXG5leHBvcnRzLmluc3RhbGwgPSBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgIHZhciBzY3JpcHRFbCA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHRFbC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBoYW5kbGUoKTtcblxuICAgICAgc2NyaXB0RWwub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgIHNjcmlwdEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0RWwpO1xuICAgICAgc2NyaXB0RWwgPSBudWxsO1xuICAgIH07XG4gICAgZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChzY3JpcHRFbCk7XG5cbiAgICByZXR1cm4gaGFuZGxlO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5leHBvcnRzLnRlc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24gKHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBzZXRUaW1lb3V0KHQsIDApO1xuICB9O1xufTsiLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgY29udGFpbmVycyA9IFtdOyAvLyB3aWxsIHN0b3JlIGNvbnRhaW5lciBIVE1MRWxlbWVudCByZWZlcmVuY2VzXG52YXIgc3R5bGVFbGVtZW50cyA9IFtdOyAvLyB3aWxsIHN0b3JlIHtwcmVwZW5kOiBIVE1MRWxlbWVudCwgYXBwZW5kOiBIVE1MRWxlbWVudH1cblxudmFyIHVzYWdlID0gJ2luc2VydC1jc3M6IFlvdSBuZWVkIHRvIHByb3ZpZGUgYSBDU1Mgc3RyaW5nLiBVc2FnZTogaW5zZXJ0Q3NzKGNzc1N0cmluZ1ssIG9wdGlvbnNdKS4nO1xuXG5mdW5jdGlvbiBpbnNlcnRDc3MoY3NzLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICBpZiAoY3NzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHVzYWdlKTtcbiAgICB9XG5cbiAgICB2YXIgcG9zaXRpb24gPSBvcHRpb25zLnByZXBlbmQgPT09IHRydWUgPyAncHJlcGVuZCcgOiAnYXBwZW5kJztcbiAgICB2YXIgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY29udGFpbmVyIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xuICAgIHZhciBjb250YWluZXJJZCA9IGNvbnRhaW5lcnMuaW5kZXhPZihjb250YWluZXIpO1xuXG4gICAgLy8gZmlyc3QgdGltZSB3ZSBzZWUgdGhpcyBjb250YWluZXIsIGNyZWF0ZSB0aGUgbmVjZXNzYXJ5IGVudHJpZXNcbiAgICBpZiAoY29udGFpbmVySWQgPT09IC0xKSB7XG4gICAgICAgIGNvbnRhaW5lcklkID0gY29udGFpbmVycy5wdXNoKGNvbnRhaW5lcikgLSAxO1xuICAgICAgICBzdHlsZUVsZW1lbnRzW2NvbnRhaW5lcklkXSA9IHt9O1xuICAgIH1cblxuICAgIC8vIHRyeSB0byBnZXQgdGhlIGNvcnJlcG9uZGluZyBjb250YWluZXIgKyBwb3NpdGlvbiBzdHlsZUVsZW1lbnQsIGNyZWF0ZSBpdCBvdGhlcndpc2VcbiAgICB2YXIgc3R5bGVFbGVtZW50O1xuXG4gICAgaWYgKHN0eWxlRWxlbWVudHNbY29udGFpbmVySWRdICE9PSB1bmRlZmluZWQgJiYgc3R5bGVFbGVtZW50c1tjb250YWluZXJJZF1bcG9zaXRpb25dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3R5bGVFbGVtZW50ID0gc3R5bGVFbGVtZW50c1tjb250YWluZXJJZF1bcG9zaXRpb25dO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlRWxlbWVudCA9IHN0eWxlRWxlbWVudHNbY29udGFpbmVySWRdW3Bvc2l0aW9uXSA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3ByZXBlbmQnKSB7XG4gICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgY29udGFpbmVyLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzdHJpcCBwb3RlbnRpYWwgVVRGLTggQk9NIGlmIGNzcyB3YXMgcmVhZCBmcm9tIGEgZmlsZVxuICAgIGlmIChjc3MuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7IGNzcyA9IGNzcy5zdWJzdHIoMSwgY3NzLmxlbmd0aCk7IH1cblxuICAgIC8vIGFjdHVhbGx5IGFkZCB0aGUgc3R5bGVzaGVldFxuICAgIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgICAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ICs9IGNzc1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlRWxlbWVudC50ZXh0Q29udGVudCArPSBjc3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlRWxlbWVudDtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCgpIHtcbiAgICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgcmV0dXJuIHN0eWxlRWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRDc3M7XG5tb2R1bGUuZXhwb3J0cy5pbnNlcnRDc3MgPSBpbnNlcnRDc3M7XG4iLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKTtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIik7XG5cbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50Ll9fZXNNb2R1bGUgPyBjb250ZW50LmRlZmF1bHQgOiBjb250ZW50O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgICAgIH1cblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXNTaGltO1xuaWYgKCFPYmplY3Qua2V5cykge1xuXHQvLyBtb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbVxuXHR2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0dmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblx0dmFyIGlzQXJncyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBnbG9iYWwtcmVxdWlyZVxuXHR2YXIgaXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblx0dmFyIGhhc0RvbnRFbnVtQnVnID0gIWlzRW51bWVyYWJsZS5jYWxsKHsgdG9TdHJpbmc6IG51bGwgfSwgJ3RvU3RyaW5nJyk7XG5cdHZhciBoYXNQcm90b0VudW1CdWcgPSBpc0VudW1lcmFibGUuY2FsbChmdW5jdGlvbiAoKSB7fSwgJ3Byb3RvdHlwZScpO1xuXHR2YXIgZG9udEVudW1zID0gW1xuXHRcdCd0b1N0cmluZycsXG5cdFx0J3RvTG9jYWxlU3RyaW5nJyxcblx0XHQndmFsdWVPZicsXG5cdFx0J2hhc093blByb3BlcnR5Jyxcblx0XHQnaXNQcm90b3R5cGVPZicsXG5cdFx0J3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcblx0XHQnY29uc3RydWN0b3InXG5cdF07XG5cdHZhciBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0dmFyIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuXHRcdHJldHVybiBjdG9yICYmIGN0b3IucHJvdG90eXBlID09PSBvO1xuXHR9O1xuXHR2YXIgZXhjbHVkZWRLZXlzID0ge1xuXHRcdCRhcHBsaWNhdGlvbkNhY2hlOiB0cnVlLFxuXHRcdCRjb25zb2xlOiB0cnVlLFxuXHRcdCRleHRlcm5hbDogdHJ1ZSxcblx0XHQkZnJhbWU6IHRydWUsXG5cdFx0JGZyYW1lRWxlbWVudDogdHJ1ZSxcblx0XHQkZnJhbWVzOiB0cnVlLFxuXHRcdCRpbm5lckhlaWdodDogdHJ1ZSxcblx0XHQkaW5uZXJXaWR0aDogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuY2hhbmdlOiB0cnVlLFxuXHRcdCRvbm1vemZ1bGxzY3JlZW5lcnJvcjogdHJ1ZSxcblx0XHQkb3V0ZXJIZWlnaHQ6IHRydWUsXG5cdFx0JG91dGVyV2lkdGg6IHRydWUsXG5cdFx0JHBhZ2VYT2Zmc2V0OiB0cnVlLFxuXHRcdCRwYWdlWU9mZnNldDogdHJ1ZSxcblx0XHQkcGFyZW50OiB0cnVlLFxuXHRcdCRzY3JvbGxMZWZ0OiB0cnVlLFxuXHRcdCRzY3JvbGxUb3A6IHRydWUsXG5cdFx0JHNjcm9sbFg6IHRydWUsXG5cdFx0JHNjcm9sbFk6IHRydWUsXG5cdFx0JHNlbGY6IHRydWUsXG5cdFx0JHdlYmtpdEluZGV4ZWREQjogdHJ1ZSxcblx0XHQkd2Via2l0U3RvcmFnZUluZm86IHRydWUsXG5cdFx0JHdpbmRvdzogdHJ1ZVxuXHR9O1xuXHR2YXIgaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnID0gKGZ1bmN0aW9uICgpIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAodmFyIGsgaW4gd2luZG93KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVkS2V5c1snJCcgKyBrXSAmJiBoYXMuY2FsbCh3aW5kb3csIGspICYmIHdpbmRvd1trXSAhPT0gbnVsbCAmJiB0eXBlb2Ygd2luZG93W2tdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSh3aW5kb3dba10pO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KCkpO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5ID0gZnVuY3Rpb24gKG8pIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWcpIHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9O1xuXG5cdGtleXNTaGltID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcblx0XHR2YXIgaXNPYmplY3QgPSBvYmplY3QgIT09IG51bGwgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCc7XG5cdFx0dmFyIGlzRnVuY3Rpb24gPSB0b1N0ci5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdFx0dmFyIGlzQXJndW1lbnRzID0gaXNBcmdzKG9iamVjdCk7XG5cdFx0dmFyIGlzU3RyaW5nID0gaXNPYmplY3QgJiYgdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0XHR2YXIgdGhlS2V5cyA9IFtdO1xuXG5cdFx0aWYgKCFpc09iamVjdCAmJiAhaXNGdW5jdGlvbiAmJiAhaXNBcmd1bWVudHMpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBhIG5vbi1vYmplY3QnKTtcblx0XHR9XG5cblx0XHR2YXIgc2tpcFByb3RvID0gaGFzUHJvdG9FbnVtQnVnICYmIGlzRnVuY3Rpb247XG5cdFx0aWYgKGlzU3RyaW5nICYmIG9iamVjdC5sZW5ndGggPiAwICYmICFoYXMuY2FsbChvYmplY3QsIDApKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaXNBcmd1bWVudHMgJiYgb2JqZWN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgb2JqZWN0Lmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcoaikpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuXHRcdFx0XHRpZiAoIShza2lwUHJvdG8gJiYgbmFtZSA9PT0gJ3Byb3RvdHlwZScpICYmIGhhcy5jYWxsKG9iamVjdCwgbmFtZSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKG5hbWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChoYXNEb250RW51bUJ1Zykge1xuXHRcdFx0dmFyIHNraXBDb25zdHJ1Y3RvciA9IGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneShvYmplY3QpO1xuXG5cdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGRvbnRFbnVtcy5sZW5ndGg7ICsraykge1xuXHRcdFx0XHRpZiAoIShza2lwQ29uc3RydWN0b3IgJiYgZG9udEVudW1zW2tdID09PSAnY29uc3RydWN0b3InKSAmJiBoYXMuY2FsbChvYmplY3QsIGRvbnRFbnVtc1trXSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goZG9udEVudW1zW2tdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhlS2V5cztcblx0fTtcbn1cbm1vZHVsZS5leHBvcnRzID0ga2V5c1NoaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7XG5cbnZhciBvcmlnS2V5cyA9IE9iamVjdC5rZXlzO1xudmFyIGtleXNTaGltID0gb3JpZ0tleXMgPyBmdW5jdGlvbiBrZXlzKG8pIHsgcmV0dXJuIG9yaWdLZXlzKG8pOyB9IDogcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG52YXIgb3JpZ2luYWxLZXlzID0gT2JqZWN0LmtleXM7XG5cbmtleXNTaGltLnNoaW0gPSBmdW5jdGlvbiBzaGltT2JqZWN0S2V5cygpIHtcblx0aWYgKE9iamVjdC5rZXlzKSB7XG5cdFx0dmFyIGtleXNXb3Jrc1dpdGhBcmd1bWVudHMgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gU2FmYXJpIDUuMCBidWdcblx0XHRcdHZhciBhcmdzID0gT2JqZWN0LmtleXMoYXJndW1lbnRzKTtcblx0XHRcdHJldHVybiBhcmdzICYmIGFyZ3MubGVuZ3RoID09PSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdH0oMSwgMikpO1xuXHRcdGlmICgha2V5c1dvcmtzV2l0aEFyZ3VtZW50cykge1xuXHRcdFx0T2JqZWN0LmtleXMgPSBmdW5jdGlvbiBrZXlzKG9iamVjdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuXHRcdFx0XHRpZiAoaXNBcmdzKG9iamVjdCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxLZXlzKHNsaWNlLmNhbGwob2JqZWN0KSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhvYmplY3QpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0T2JqZWN0LmtleXMgPSBrZXlzU2hpbTtcblx0fVxuXHRyZXR1cm4gT2JqZWN0LmtleXMgfHwga2V5c1NoaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdHZhciBzdHIgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0dmFyIGlzQXJncyA9IHN0ciA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cdGlmICghaXNBcmdzKSB7XG5cdFx0aXNBcmdzID0gc3RyICE9PSAnW29iamVjdCBBcnJheV0nICYmXG5cdFx0XHR2YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcicgJiZcblx0XHRcdHZhbHVlLmxlbmd0aCA+PSAwICYmXG5cdFx0XHR0b1N0ci5jYWxsKHZhbHVlLmNhbGxlZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdH1cblx0cmV0dXJuIGlzQXJncztcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gd2UgbmVlZCB0byBleHBvcnQgdXNpbmcgY29tbW9uanMgZm9yIGVhc2Ugb2YgdXNhZ2UgaW4gYWxsXG4vLyBKYXZhU2NyaXB0IGVudmlyb25tZW50c1xuLy8gV2UgdGhlcmVmb3JlIG5lZWQgdG8gaW1wb3J0IGluIGNvbW1vbmpzIHRvby4gc2VlOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay9pc3N1ZXMvNDAzOVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY29tbW9uanMgKi9cbnZhciBwbGFjZXMgPSByZXF1aXJlKCcuL3NyYy9wbGFjZXMnKTtcblxudmFyIHZlcnNpb24gPSByZXF1aXJlKCcuL3NyYy92ZXJzaW9uJyk7IC8vIG11c3QgdXNlIG1vZHVsZS5leHBvcnRzIHRvIGJlIGNvbW1vbkpTIGNvbXBhdGlibGVcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHBsYWNlc1tcImRlZmF1bHRcIl07XG5tb2R1bGUuZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvbltcImRlZmF1bHRcIl07XG4vKiBlc2xpbnQtZW5hYmxlIGltcG9ydC9uby1jb21tb25qcyAqL1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBleHRyYWN0UGFyYW1zID0gZnVuY3Rpb24gZXh0cmFjdFBhcmFtcyhfcmVmKSB7XG4gIHZhciBoaXRzUGVyUGFnZSA9IF9yZWYuaGl0c1BlclBhZ2UsXG4gICAgICBwb3N0Y29kZVNlYXJjaCA9IF9yZWYucG9zdGNvZGVTZWFyY2gsXG4gICAgICBhcm91bmRMYXRMbmcgPSBfcmVmLmFyb3VuZExhdExuZyxcbiAgICAgIGFyb3VuZFJhZGl1cyA9IF9yZWYuYXJvdW5kUmFkaXVzLFxuICAgICAgYXJvdW5kTGF0TG5nVmlhSVAgPSBfcmVmLmFyb3VuZExhdExuZ1ZpYUlQLFxuICAgICAgaW5zaWRlQm91bmRpbmdCb3ggPSBfcmVmLmluc2lkZUJvdW5kaW5nQm94LFxuICAgICAgaW5zaWRlUG9seWdvbiA9IF9yZWYuaW5zaWRlUG9seWdvbixcbiAgICAgIGdldFJhbmtpbmdJbmZvID0gX3JlZi5nZXRSYW5raW5nSW5mbyxcbiAgICAgIGNvdW50cmllcyA9IF9yZWYuY291bnRyaWVzLFxuICAgICAgbGFuZ3VhZ2UgPSBfcmVmLmxhbmd1YWdlLFxuICAgICAgdHlwZSA9IF9yZWYudHlwZTtcbiAgdmFyIGV4dHJhY3RlZCA9IHtcbiAgICBjb3VudHJpZXM6IGNvdW50cmllcyxcbiAgICBoaXRzUGVyUGFnZTogaGl0c1BlclBhZ2UgfHwgNSxcbiAgICBsYW5ndWFnZTogbGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLmxhbmd1YWdlLnNwbGl0KCctJylbMF0sXG4gICAgdHlwZTogdHlwZVxuICB9O1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNvdW50cmllcykpIHtcbiAgICBleHRyYWN0ZWQuY291bnRyaWVzID0gZXh0cmFjdGVkLmNvdW50cmllcy5tYXAoZnVuY3Rpb24gKGNvdW50cnkpIHtcbiAgICAgIHJldHVybiBjb3VudHJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGV4dHJhY3RlZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHRyYWN0ZWQubGFuZ3VhZ2UgPSBleHRyYWN0ZWQubGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGlmIChhcm91bmRMYXRMbmcpIHtcbiAgICBleHRyYWN0ZWQuYXJvdW5kTGF0TG5nID0gYXJvdW5kTGF0TG5nO1xuICB9IGVsc2UgaWYgKGFyb3VuZExhdExuZ1ZpYUlQICE9PSB1bmRlZmluZWQpIHtcbiAgICBleHRyYWN0ZWQuYXJvdW5kTGF0TG5nVmlhSVAgPSBhcm91bmRMYXRMbmdWaWFJUDtcbiAgfVxuXG4gIGlmIChwb3N0Y29kZVNlYXJjaCkge1xuICAgIGV4dHJhY3RlZC5yZXN0cmljdFNlYXJjaGFibGVBdHRyaWJ1dGVzID0gJ3Bvc3Rjb2RlJztcbiAgfVxuXG4gIHJldHVybiBfb2JqZWN0U3ByZWFkKHt9LCBleHRyYWN0ZWQsIHtcbiAgICBhcm91bmRSYWRpdXM6IGFyb3VuZFJhZGl1cyxcbiAgICBpbnNpZGVCb3VuZGluZ0JveDogaW5zaWRlQm91bmRpbmdCb3gsXG4gICAgaW5zaWRlUG9seWdvbjogaW5zaWRlUG9seWdvbixcbiAgICBnZXRSYW5raW5nSW5mbzogZ2V0UmFua2luZ0luZm9cbiAgfSk7XG59O1xuXG52YXIgZXh0cmFjdENvbnRyb2xzID0gZnVuY3Rpb24gZXh0cmFjdENvbnRyb2xzKF9yZWYyKSB7XG4gIHZhciBfcmVmMiR1c2VEZXZpY2VMb2NhdGkgPSBfcmVmMi51c2VEZXZpY2VMb2NhdGlvbixcbiAgICAgIHVzZURldmljZUxvY2F0aW9uID0gX3JlZjIkdXNlRGV2aWNlTG9jYXRpID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYyJHVzZURldmljZUxvY2F0aSxcbiAgICAgIF9yZWYyJGNvbXB1dGVRdWVyeVBhciA9IF9yZWYyLmNvbXB1dGVRdWVyeVBhcmFtcyxcbiAgICAgIGNvbXB1dGVRdWVyeVBhcmFtcyA9IF9yZWYyJGNvbXB1dGVRdWVyeVBhciA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH0gOiBfcmVmMiRjb21wdXRlUXVlcnlQYXIsXG4gICAgICBmb3JtYXRJbnB1dFZhbHVlID0gX3JlZjIuZm9ybWF0SW5wdXRWYWx1ZSxcbiAgICAgIF9yZWYyJG9uSGl0cyA9IF9yZWYyLm9uSGl0cyxcbiAgICAgIG9uSGl0cyA9IF9yZWYyJG9uSGl0cyA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKCkge30gOiBfcmVmMiRvbkhpdHMsXG4gICAgICBfcmVmMiRvbkVycm9yID0gX3JlZjIub25FcnJvcixcbiAgICAgIG9uRXJyb3IgPSBfcmVmMiRvbkVycm9yID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoZSkge1xuICAgIHRocm93IGU7XG4gIH0gOiBfcmVmMiRvbkVycm9yLFxuICAgICAgb25SYXRlTGltaXRSZWFjaGVkID0gX3JlZjIub25SYXRlTGltaXRSZWFjaGVkLFxuICAgICAgb25JbnZhbGlkQ3JlZGVudGlhbHMgPSBfcmVmMi5vbkludmFsaWRDcmVkZW50aWFscztcbiAgcmV0dXJuIHtcbiAgICB1c2VEZXZpY2VMb2NhdGlvbjogdXNlRGV2aWNlTG9jYXRpb24sXG4gICAgY29tcHV0ZVF1ZXJ5UGFyYW1zOiBjb21wdXRlUXVlcnlQYXJhbXMsXG4gICAgZm9ybWF0SW5wdXRWYWx1ZTogZm9ybWF0SW5wdXRWYWx1ZSxcbiAgICBvbkhpdHM6IG9uSGl0cyxcbiAgICBvbkVycm9yOiBvbkVycm9yLFxuICAgIG9uUmF0ZUxpbWl0UmVhY2hlZDogb25SYXRlTGltaXRSZWFjaGVkLFxuICAgIG9uSW52YWxpZENyZWRlbnRpYWxzOiBvbkludmFsaWRDcmVkZW50aWFsc1xuICB9O1xufTtcblxudmFyIHBhcmFtcyA9IHt9O1xudmFyIGNvbnRyb2xzID0ge307XG5cbnZhciBjb25maWd1cmUgPSBmdW5jdGlvbiBjb25maWd1cmUoY29uZmlndXJhdGlvbikge1xuICBwYXJhbXMgPSBleHRyYWN0UGFyYW1zKF9vYmplY3RTcHJlYWQoe30sIHBhcmFtcywge30sIGNvbmZpZ3VyYXRpb24pKTtcbiAgY29udHJvbHMgPSBleHRyYWN0Q29udHJvbHMoX29iamVjdFNwcmVhZCh7fSwgY29udHJvbHMsIHt9LCBjb25maWd1cmF0aW9uKSk7XG4gIHJldHVybiB7XG4gICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgY29udHJvbHM6IGNvbnRyb2xzXG4gIH07XG59O1xuXG52YXIgX2RlZmF1bHQgPSBjb25maWd1cmU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBjcmVhdGVBdXRvY29tcGxldGVEYXRhc2V0O1xuXG52YXIgX2NyZWF0ZUF1dG9jb21wbGV0ZVNvdXJjZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vY3JlYXRlQXV0b2NvbXBsZXRlU291cmNlXCIpKTtcblxudmFyIF9kZWZhdWx0VGVtcGxhdGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9kZWZhdWx0VGVtcGxhdGVzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlOyB9KTsga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpOyB9IHJldHVybiBrZXlzOyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpZiAoaSAlIDIpIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBjcmVhdGVBdXRvY29tcGxldGVEYXRhc2V0KG9wdGlvbnMpIHtcbiAgdmFyIHRlbXBsYXRlcyA9IF9vYmplY3RTcHJlYWQoe30sIF9kZWZhdWx0VGVtcGxhdGVzW1wiZGVmYXVsdFwiXSwge30sIG9wdGlvbnMudGVtcGxhdGVzKTtcblxuICB2YXIgc291cmNlID0gKDAsIF9jcmVhdGVBdXRvY29tcGxldGVTb3VyY2VbXCJkZWZhdWx0XCJdKShfb2JqZWN0U3ByZWFkKHt9LCBvcHRpb25zLCB7XG4gICAgZm9ybWF0SW5wdXRWYWx1ZTogdGVtcGxhdGVzLnZhbHVlLFxuICAgIHRlbXBsYXRlczogdW5kZWZpbmVkXG4gIH0pKTtcbiAgcmV0dXJuIHtcbiAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICB0ZW1wbGF0ZXM6IHRlbXBsYXRlcyxcbiAgICBkaXNwbGF5S2V5OiAndmFsdWUnLFxuICAgIG5hbWU6ICdwbGFjZXMnLFxuICAgIGNhY2hlOiBmYWxzZVxuICB9O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBjcmVhdGVBdXRvY29tcGxldGVTb3VyY2U7XG5cbnZhciBfY29uZmlndXJlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9jb25maWd1cmVcIikpO1xuXG52YXIgX2Zvcm1hdEhpdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZm9ybWF0SGl0XCIpKTtcblxudmFyIF92ZXJzaW9uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92ZXJzaW9uXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlOyB9KTsga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpOyB9IHJldHVybiBrZXlzOyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpZiAoaSAlIDIpIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBjcmVhdGVBdXRvY29tcGxldGVTb3VyY2UoX3JlZikge1xuICB2YXIgYWxnb2xpYXNlYXJjaCA9IF9yZWYuYWxnb2xpYXNlYXJjaCxcbiAgICAgIGNsaWVudE9wdGlvbnMgPSBfcmVmLmNsaWVudE9wdGlvbnMsXG4gICAgICBhcGlLZXkgPSBfcmVmLmFwaUtleSxcbiAgICAgIGFwcElkID0gX3JlZi5hcHBJZCxcbiAgICAgIGhpdHNQZXJQYWdlID0gX3JlZi5oaXRzUGVyUGFnZSxcbiAgICAgIHBvc3Rjb2RlU2VhcmNoID0gX3JlZi5wb3N0Y29kZVNlYXJjaCxcbiAgICAgIGFyb3VuZExhdExuZyA9IF9yZWYuYXJvdW5kTGF0TG5nLFxuICAgICAgYXJvdW5kUmFkaXVzID0gX3JlZi5hcm91bmRSYWRpdXMsXG4gICAgICBhcm91bmRMYXRMbmdWaWFJUCA9IF9yZWYuYXJvdW5kTGF0TG5nVmlhSVAsXG4gICAgICBpbnNpZGVCb3VuZGluZ0JveCA9IF9yZWYuaW5zaWRlQm91bmRpbmdCb3gsXG4gICAgICBpbnNpZGVQb2x5Z29uID0gX3JlZi5pbnNpZGVQb2x5Z29uLFxuICAgICAgZ2V0UmFua2luZ0luZm8gPSBfcmVmLmdldFJhbmtpbmdJbmZvLFxuICAgICAgY291bnRyaWVzID0gX3JlZi5jb3VudHJpZXMsXG4gICAgICBmb3JtYXRJbnB1dFZhbHVlID0gX3JlZi5mb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgX3JlZiRjb21wdXRlUXVlcnlQYXJhID0gX3JlZi5jb21wdXRlUXVlcnlQYXJhbXMsXG4gICAgICBjb21wdXRlUXVlcnlQYXJhbXMgPSBfcmVmJGNvbXB1dGVRdWVyeVBhcmEgPT09IHZvaWQgMCA/IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9IDogX3JlZiRjb21wdXRlUXVlcnlQYXJhLFxuICAgICAgX3JlZiR1c2VEZXZpY2VMb2NhdGlvID0gX3JlZi51c2VEZXZpY2VMb2NhdGlvbixcbiAgICAgIHVzZURldmljZUxvY2F0aW9uID0gX3JlZiR1c2VEZXZpY2VMb2NhdGlvID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkdXNlRGV2aWNlTG9jYXRpbyxcbiAgICAgIF9yZWYkbGFuZ3VhZ2UgPSBfcmVmLmxhbmd1YWdlLFxuICAgICAgbGFuZ3VhZ2UgPSBfcmVmJGxhbmd1YWdlID09PSB2b2lkIDAgPyBuYXZpZ2F0b3IubGFuZ3VhZ2Uuc3BsaXQoJy0nKVswXSA6IF9yZWYkbGFuZ3VhZ2UsXG4gICAgICBfcmVmJG9uSGl0cyA9IF9yZWYub25IaXRzLFxuICAgICAgb25IaXRzID0gX3JlZiRvbkhpdHMgPT09IHZvaWQgMCA/IGZ1bmN0aW9uICgpIHt9IDogX3JlZiRvbkhpdHMsXG4gICAgICBfcmVmJG9uRXJyb3IgPSBfcmVmLm9uRXJyb3IsXG4gICAgICBvbkVycm9yID0gX3JlZiRvbkVycm9yID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoZSkge1xuICAgIHRocm93IGU7XG4gIH0gOiBfcmVmJG9uRXJyb3IsXG4gICAgICBvblJhdGVMaW1pdFJlYWNoZWQgPSBfcmVmLm9uUmF0ZUxpbWl0UmVhY2hlZCxcbiAgICAgIG9uSW52YWxpZENyZWRlbnRpYWxzID0gX3JlZi5vbkludmFsaWRDcmVkZW50aWFscyxcbiAgICAgIHR5cGUgPSBfcmVmLnR5cGU7XG4gIHZhciBwbGFjZXNDbGllbnQgPSBhbGdvbGlhc2VhcmNoLmluaXRQbGFjZXMoYXBwSWQsIGFwaUtleSwgY2xpZW50T3B0aW9ucyk7XG4gIHBsYWNlc0NsaWVudC5hcy5hZGRBbGdvbGlhQWdlbnQoXCJBbGdvbGlhIFBsYWNlcyBcIi5jb25jYXQoX3ZlcnNpb25bXCJkZWZhdWx0XCJdKSk7XG4gIHZhciBjb25maWd1cmF0aW9uID0gKDAsIF9jb25maWd1cmVbXCJkZWZhdWx0XCJdKSh7XG4gICAgaGl0c1BlclBhZ2U6IGhpdHNQZXJQYWdlLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgcG9zdGNvZGVTZWFyY2g6IHBvc3Rjb2RlU2VhcmNoLFxuICAgIGNvdW50cmllczogY291bnRyaWVzLFxuICAgIGxhbmd1YWdlOiBsYW5ndWFnZSxcbiAgICBhcm91bmRMYXRMbmc6IGFyb3VuZExhdExuZyxcbiAgICBhcm91bmRSYWRpdXM6IGFyb3VuZFJhZGl1cyxcbiAgICBhcm91bmRMYXRMbmdWaWFJUDogYXJvdW5kTGF0TG5nVmlhSVAsXG4gICAgaW5zaWRlQm91bmRpbmdCb3g6IGluc2lkZUJvdW5kaW5nQm94LFxuICAgIGluc2lkZVBvbHlnb246IGluc2lkZVBvbHlnb24sXG4gICAgZ2V0UmFua2luZ0luZm86IGdldFJhbmtpbmdJbmZvLFxuICAgIGZvcm1hdElucHV0VmFsdWU6IGZvcm1hdElucHV0VmFsdWUsXG4gICAgY29tcHV0ZVF1ZXJ5UGFyYW1zOiBjb21wdXRlUXVlcnlQYXJhbXMsXG4gICAgdXNlRGV2aWNlTG9jYXRpb246IHVzZURldmljZUxvY2F0aW9uLFxuICAgIG9uSGl0czogb25IaXRzLFxuICAgIG9uRXJyb3I6IG9uRXJyb3IsXG4gICAgb25SYXRlTGltaXRSZWFjaGVkOiBvblJhdGVMaW1pdFJlYWNoZWQsXG4gICAgb25JbnZhbGlkQ3JlZGVudGlhbHM6IG9uSW52YWxpZENyZWRlbnRpYWxzXG4gIH0pO1xuICB2YXIgcGFyYW1zID0gY29uZmlndXJhdGlvbi5wYXJhbXM7XG4gIHZhciBjb250cm9scyA9IGNvbmZpZ3VyYXRpb24uY29udHJvbHM7XG4gIHZhciB1c2VyQ29vcmRzO1xuICB2YXIgdHJhY2tlciA9IG51bGw7XG5cbiAgaWYgKGNvbnRyb2xzLnVzZURldmljZUxvY2F0aW9uKSB7XG4gICAgdHJhY2tlciA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgdmFyIGNvb3JkcyA9IF9yZWYyLmNvb3JkcztcbiAgICAgIHVzZXJDb29yZHMgPSBcIlwiLmNvbmNhdChjb29yZHMubGF0aXR1ZGUsIFwiLFwiKS5jb25jYXQoY29vcmRzLmxvbmdpdHVkZSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWFyY2hlcihxdWVyeSwgY2IpIHtcbiAgICB2YXIgc2VhcmNoUGFyYW1zID0gX29iamVjdFNwcmVhZCh7fSwgcGFyYW1zLCB7XG4gICAgICBxdWVyeTogcXVlcnlcbiAgICB9KTtcblxuICAgIGlmICh1c2VyQ29vcmRzKSB7XG4gICAgICBzZWFyY2hQYXJhbXMuYXJvdW5kTGF0TG5nID0gdXNlckNvb3JkcztcbiAgICB9XG5cbiAgICByZXR1cm4gcGxhY2VzQ2xpZW50LnNlYXJjaChjb250cm9scy5jb21wdXRlUXVlcnlQYXJhbXMoc2VhcmNoUGFyYW1zKSkudGhlbihmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgdmFyIGhpdHMgPSBjb250ZW50LmhpdHMubWFwKGZ1bmN0aW9uIChoaXQsIGhpdEluZGV4KSB7XG4gICAgICAgIHJldHVybiAoMCwgX2Zvcm1hdEhpdFtcImRlZmF1bHRcIl0pKHtcbiAgICAgICAgICBmb3JtYXRJbnB1dFZhbHVlOiBjb250cm9scy5mb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgICAgIGhpdDogaGl0LFxuICAgICAgICAgIGhpdEluZGV4OiBoaXRJbmRleCxcbiAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgcmF3QW5zd2VyOiBjb250ZW50XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjb250cm9scy5vbkhpdHMoe1xuICAgICAgICBoaXRzOiBoaXRzLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHJhd0Fuc3dlcjogY29udGVudFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGl0cztcbiAgICB9KS50aGVuKGNiKVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5zdGF0dXNDb2RlID09PSA0MDMgJiYgZS5tZXNzYWdlID09PSAnSW52YWxpZCBBcHBsaWNhdGlvbi1JRCBvciBBUEkga2V5Jykge1xuICAgICAgICBjb250cm9scy5vbkludmFsaWRDcmVkZW50aWFscygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKGUuc3RhdHVzQ29kZSA9PT0gNDI5KSB7XG4gICAgICAgIGNvbnRyb2xzLm9uUmF0ZUxpbWl0UmVhY2hlZCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnRyb2xzLm9uRXJyb3IoZSk7XG4gICAgfSk7XG4gIH1cblxuICBzZWFyY2hlci5jb25maWd1cmUgPSBmdW5jdGlvbiAocGFydGlhbCkge1xuICAgIHZhciB1cGRhdGVkID0gKDAsIF9jb25maWd1cmVbXCJkZWZhdWx0XCJdKShfb2JqZWN0U3ByZWFkKHt9LCBwYXJhbXMsIHt9LCBjb250cm9scywge30sIHBhcnRpYWwpKTtcbiAgICBwYXJhbXMgPSB1cGRhdGVkLnBhcmFtcztcbiAgICBjb250cm9scyA9IHVwZGF0ZWQuY29udHJvbHM7XG5cbiAgICBpZiAoY29udHJvbHMudXNlRGV2aWNlTG9jYXRpb24gJiYgdHJhY2tlciA9PT0gbnVsbCkge1xuICAgICAgdHJhY2tlciA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgICB2YXIgY29vcmRzID0gX3JlZjMuY29vcmRzO1xuICAgICAgICB1c2VyQ29vcmRzID0gXCJcIi5jb25jYXQoY29vcmRzLmxhdGl0dWRlLCBcIixcIikuY29uY2F0KGNvb3Jkcy5sb25naXR1ZGUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghY29udHJvbHMudXNlRGV2aWNlTG9jYXRpb24gJiYgdHJhY2tlciAhPT0gbnVsbCkge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2godHJhY2tlcik7XG4gICAgICB0cmFja2VyID0gbnVsbDtcbiAgICAgIHVzZXJDb29yZHMgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gc2VhcmNoZXI7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jb25maWd1cmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2NvbmZpZ3VyZVwiKSk7XG5cbnZhciBfZm9ybWF0SGl0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9mb3JtYXRIaXRcIikpO1xuXG52YXIgX3ZlcnNpb24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZlcnNpb25cIikpO1xuXG52YXIgX2RlZmF1bHRUZW1wbGF0ZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2RlZmF1bHRUZW1wbGF0ZXNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBmaWx0ZXJBcHBsaWNhYmxlUGFyYW1zID0gZnVuY3Rpb24gZmlsdGVyQXBwbGljYWJsZVBhcmFtcyhwYXJhbXMpIHtcbiAgdmFyIGhpdHNQZXJQYWdlID0gcGFyYW1zLmhpdHNQZXJQYWdlLFxuICAgICAgYXJvdW5kTGF0TG5nID0gcGFyYW1zLmFyb3VuZExhdExuZyxcbiAgICAgIGdldFJhbmtpbmdJbmZvID0gcGFyYW1zLmdldFJhbmtpbmdJbmZvLFxuICAgICAgbGFuZ3VhZ2UgPSBwYXJhbXMubGFuZ3VhZ2U7XG4gIHZhciBmaWx0ZXJlZCA9IHt9O1xuXG4gIGlmICh0eXBlb2YgaGl0c1BlclBhZ2UgPT09ICdudW1iZXInKSB7XG4gICAgZmlsdGVyZWQuaGl0c1BlclBhZ2UgPSBoaXRzUGVyUGFnZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyZWQubGFuZ3VhZ2UgPSBsYW5ndWFnZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZ2V0UmFua2luZ0luZm8gPT09ICdib29sZWFuJykge1xuICAgIGZpbHRlcmVkLmdldFJhbmtpbmdJbmZvID0gZ2V0UmFua2luZ0luZm87XG4gIH1cblxuICBpZiAodHlwZW9mIGFyb3VuZExhdExuZyA9PT0gJ3N0cmluZycpIHtcbiAgICBmaWx0ZXJlZC5hcm91bmRMYXRMbmcgPSBhcm91bmRMYXRMbmc7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyZWQ7XG59O1xuXG52YXIgY3JlYXRlUmV2ZXJzZUdlb2NvZGluZ1NvdXJjZSA9IGZ1bmN0aW9uIGNyZWF0ZVJldmVyc2VHZW9jb2RpbmdTb3VyY2UoX3JlZikge1xuICB2YXIgYWxnb2xpYXNlYXJjaCA9IF9yZWYuYWxnb2xpYXNlYXJjaCxcbiAgICAgIGNsaWVudE9wdGlvbnMgPSBfcmVmLmNsaWVudE9wdGlvbnMsXG4gICAgICBhcGlLZXkgPSBfcmVmLmFwaUtleSxcbiAgICAgIGFwcElkID0gX3JlZi5hcHBJZCxcbiAgICAgIGhpdHNQZXJQYWdlID0gX3JlZi5oaXRzUGVyUGFnZSxcbiAgICAgIGFyb3VuZExhdExuZyA9IF9yZWYuYXJvdW5kTGF0TG5nLFxuICAgICAgZ2V0UmFua2luZ0luZm8gPSBfcmVmLmdldFJhbmtpbmdJbmZvLFxuICAgICAgX3JlZiRmb3JtYXRJbnB1dFZhbHVlID0gX3JlZi5mb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgZm9ybWF0SW5wdXRWYWx1ZSA9IF9yZWYkZm9ybWF0SW5wdXRWYWx1ZSA9PT0gdm9pZCAwID8gX2RlZmF1bHRUZW1wbGF0ZXNbXCJkZWZhdWx0XCJdLnZhbHVlIDogX3JlZiRmb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgX3JlZiRsYW5ndWFnZSA9IF9yZWYubGFuZ3VhZ2UsXG4gICAgICBsYW5ndWFnZSA9IF9yZWYkbGFuZ3VhZ2UgPT09IHZvaWQgMCA/IG5hdmlnYXRvci5sYW5ndWFnZS5zcGxpdCgnLScpWzBdIDogX3JlZiRsYW5ndWFnZSxcbiAgICAgIF9yZWYkb25IaXRzID0gX3JlZi5vbkhpdHMsXG4gICAgICBvbkhpdHMgPSBfcmVmJG9uSGl0cyA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKCkge30gOiBfcmVmJG9uSGl0cyxcbiAgICAgIF9yZWYkb25FcnJvciA9IF9yZWYub25FcnJvcixcbiAgICAgIG9uRXJyb3IgPSBfcmVmJG9uRXJyb3IgPT09IHZvaWQgMCA/IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhyb3cgZTtcbiAgfSA6IF9yZWYkb25FcnJvcixcbiAgICAgIG9uUmF0ZUxpbWl0UmVhY2hlZCA9IF9yZWYub25SYXRlTGltaXRSZWFjaGVkLFxuICAgICAgb25JbnZhbGlkQ3JlZGVudGlhbHMgPSBfcmVmLm9uSW52YWxpZENyZWRlbnRpYWxzO1xuICB2YXIgcGxhY2VzQ2xpZW50ID0gYWxnb2xpYXNlYXJjaC5pbml0UGxhY2VzKGFwcElkLCBhcGlLZXksIGNsaWVudE9wdGlvbnMpO1xuICBwbGFjZXNDbGllbnQuYXMuYWRkQWxnb2xpYUFnZW50KFwiQWxnb2xpYSBQbGFjZXMgXCIuY29uY2F0KF92ZXJzaW9uW1wiZGVmYXVsdFwiXSkpO1xuICB2YXIgY29uZmlndXJhdGlvbiA9ICgwLCBfY29uZmlndXJlW1wiZGVmYXVsdFwiXSkoe1xuICAgIGFwaUtleTogYXBpS2V5LFxuICAgIGFwcElkOiBhcHBJZCxcbiAgICBoaXRzUGVyUGFnZTogaGl0c1BlclBhZ2UsXG4gICAgYXJvdW5kTGF0TG5nOiBhcm91bmRMYXRMbmcsXG4gICAgZ2V0UmFua2luZ0luZm86IGdldFJhbmtpbmdJbmZvLFxuICAgIGxhbmd1YWdlOiBsYW5ndWFnZSxcbiAgICBmb3JtYXRJbnB1dFZhbHVlOiBmb3JtYXRJbnB1dFZhbHVlLFxuICAgIG9uSGl0czogb25IaXRzLFxuICAgIG9uRXJyb3I6IG9uRXJyb3IsXG4gICAgb25SYXRlTGltaXRSZWFjaGVkOiBvblJhdGVMaW1pdFJlYWNoZWQsXG4gICAgb25JbnZhbGlkQ3JlZGVudGlhbHM6IG9uSW52YWxpZENyZWRlbnRpYWxzXG4gIH0pO1xuICB2YXIgcGFyYW1zID0gZmlsdGVyQXBwbGljYWJsZVBhcmFtcyhjb25maWd1cmF0aW9uLnBhcmFtcyk7XG4gIHZhciBjb250cm9scyA9IGNvbmZpZ3VyYXRpb24uY29udHJvbHM7XG5cbiAgdmFyIHNlYXJjaGVyID0gZnVuY3Rpb24gc2VhcmNoZXIocXVlcnlBcm91bmRMYXRMbmcsIGNiKSB7XG4gICAgdmFyIGZpbmFsQXJvdW5kTGF0TG5nID0gcXVlcnlBcm91bmRMYXRMbmcgfHwgcGFyYW1zLmFyb3VuZExhdExuZztcblxuICAgIGlmICghZmluYWxBcm91bmRMYXRMbmcpIHtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcignQSBsb2NhdGlvbiBtdXN0IGJlIHByb3ZpZGVkIGZvciByZXZlcnNlIGdlb2NvZGluZycpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGxhY2VzQ2xpZW50LnJldmVyc2UoX29iamVjdFNwcmVhZCh7fSwgcGFyYW1zLCB7XG4gICAgICBhcm91bmRMYXRMbmc6IGZpbmFsQXJvdW5kTGF0TG5nXG4gICAgfSkpLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIHZhciBoaXRzID0gY29udGVudC5oaXRzLm1hcChmdW5jdGlvbiAoaGl0LCBoaXRJbmRleCkge1xuICAgICAgICByZXR1cm4gKDAsIF9mb3JtYXRIaXRbXCJkZWZhdWx0XCJdKSh7XG4gICAgICAgICAgZm9ybWF0SW5wdXRWYWx1ZTogY29udHJvbHMuZm9ybWF0SW5wdXRWYWx1ZSxcbiAgICAgICAgICBoaXQ6IGhpdCxcbiAgICAgICAgICBoaXRJbmRleDogaGl0SW5kZXgsXG4gICAgICAgICAgcXVlcnk6IGZpbmFsQXJvdW5kTGF0TG5nLFxuICAgICAgICAgIHJhd0Fuc3dlcjogY29udGVudFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY29udHJvbHMub25IaXRzKHtcbiAgICAgICAgaGl0czogaGl0cyxcbiAgICAgICAgcXVlcnk6IGZpbmFsQXJvdW5kTGF0TG5nLFxuICAgICAgICByYXdBbnN3ZXI6IGNvbnRlbnRcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGhpdHM7XG4gICAgfSkudGhlbihjYilbXCJjYXRjaFwiXShmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUuc3RhdHVzQ29kZSA9PT0gNDAzICYmIGUubWVzc2FnZSA9PT0gJ0ludmFsaWQgQXBwbGljYXRpb24tSUQgb3IgQVBJIGtleScpIHtcbiAgICAgICAgY29udHJvbHMub25JbnZhbGlkQ3JlZGVudGlhbHMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChlLnN0YXR1c0NvZGUgPT09IDQyOSkge1xuICAgICAgICBjb250cm9scy5vblJhdGVMaW1pdFJlYWNoZWQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb250cm9scy5vbkVycm9yKGUpO1xuICAgIH0pO1xuICB9O1xuXG4gIHNlYXJjaGVyLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwYXJ0aWFsKSB7XG4gICAgdmFyIHVwZGF0ZWQgPSAoMCwgX2NvbmZpZ3VyZVtcImRlZmF1bHRcIl0pKF9vYmplY3RTcHJlYWQoe30sIHBhcmFtcywge30sIGNvbnRyb2xzLCB7fSwgcGFydGlhbCkpO1xuICAgIHBhcmFtcyA9IGZpbHRlckFwcGxpY2FibGVQYXJhbXModXBkYXRlZC5wYXJhbXMpO1xuICAgIGNvbnRyb2xzID0gdXBkYXRlZC5jb250cm9scztcbiAgICByZXR1cm4gc2VhcmNoZXI7XG4gIH07XG5cbiAgcmV0dXJuIHNlYXJjaGVyO1xufTtcblxudmFyIF9kZWZhdWx0ID0gY3JlYXRlUmV2ZXJzZUdlb2NvZGluZ1NvdXJjZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9mb3JtYXRJbnB1dFZhbHVlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9mb3JtYXRJbnB1dFZhbHVlXCIpKTtcblxudmFyIF9mb3JtYXREcm9wZG93blZhbHVlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9mb3JtYXREcm9wZG93blZhbHVlXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL2FsZ29saWEuc3ZnJyAqL1xudmFyIGFsZ29saWFMb2dvID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjExN1xcXCIgaGVpZ2h0PVxcXCIxN1xcXCIgdmlld0JveD1cXFwiMCAwIDEzMCAxOVxcXCI+PGcgZmlsbD1cXFwibm9uZVxcXCIgZmlsbC1ydWxlPVxcXCJldmVub2RkXFxcIj48ZyBmaWxsLXJ1bGU9XFxcIm5vbnplcm9cXFwiPjxwYXRoIGZpbGw9XFxcIiM1NDY4RkZcXFwiIGQ9XFxcIk01OS4zOTkuMDQ0aDEzLjI5OWEyLjM3MiAyLjM3MiAwIDAgMSAyLjM3NyAyLjM2NHYxMy4yMzRhMi4zNzIgMi4zNzIgMCAwIDEtMi4zNzcgMi4zNjRINTkuMzk5YTIuMzcyIDIuMzcyIDAgMCAxLTIuMzc3LTIuMzY0VjIuNDAzQTIuMzY4IDIuMzY4IDAgMCAxIDU5LjM5OS4wNDR6XFxcIi8+PHBhdGggZmlsbD1cXFwiI0ZGRlxcXCIgZD1cXFwiTTY2LjI1NyA0LjU4MmMtMi44MTUgMC01LjEgMi4yNzItNS4xIDUuMDc4IDAgMi44MDYgMi4yODQgNS4wNzIgNS4xIDUuMDcyIDIuODE1IDAgNS4xLTIuMjcyIDUuMS01LjA3OCAwLTIuODA2LTIuMjc5LTUuMDcyLTUuMS01LjA3MnptMCA4LjY1MmMtMS45ODMgMC0zLjU5My0xLjYwMi0zLjU5My0zLjU3NCAwLTEuOTcyIDEuNjEtMy41NzQgMy41OTMtMy41NzQgMS45ODMgMCAzLjU5MyAxLjYwMiAzLjU5MyAzLjU3NGEzLjU4MiAzLjU4MiAwIDAgMS0zLjU5MyAzLjU3NHptMC02LjQxOFY5LjQ4YzAgLjA3Ni4wODIuMTMxLjE1My4wOTNsMi4zNzctMS4yMjZjLjA1NS0uMDI3LjA3MS0uMDkzLjA0NC0uMTQ3YTIuOTYgMi45NiAwIDAgMC0yLjQ2NS0xLjQ4N2MtLjA1NSAwLS4xMS4wNDQtLjExLjEwNGguMDAxem0tMy4zMy0xLjk1NmwtLjMxMi0uMzFhLjc4My43ODMgMCAwIDAtMS4xMDYgMGwtLjM3Mi4zN2EuNzczLjc3MyAwIDAgMCAwIDEuMWwuMzA3LjMwNWMuMDQ5LjA1LjEyMS4wMzguMTY0LS4wMS4xODEtLjI0Ni4zNzgtLjQ4LjU5Ny0uNjk4LjIyNS0uMjIzLjQ1NS0uNDIuNzA3LS41OTkuMDU1LS4wMzMuMDYtLjEwOS4wMTYtLjE1OGgtLjAwMXptNS4wMDEtLjgwNnYtLjYxNmEuNzgxLjc4MSAwIDAgMC0uNzgzLS43NzloLTEuODI0YS43OC43OCAwIDAgMC0uNzgzLjc4di42MzFjMCAuMDcxLjA2Ni4xMi4xMzcuMTA0YTUuNzM2IDUuNzM2IDAgMCAxIDEuNTg4LS4yMjNjLjUyIDAgMS4wMzUuMDcxIDEuNTM0LjIwN2EuMTA2LjEwNiAwIDAgMCAuMTMxLS4xMDR6XFxcIi8+PHBhdGggZmlsbD1cXFwiIzI1MkM2MVxcXCIgZD1cXFwiTTUuMDI3IDEwLjI0NmMwIC42OTgtLjI1MiAxLjI0Ni0uNzU3IDEuNjQ0LS41MDUuMzk3LTEuMjAxLjU5Ni0yLjA4OS41OTYtLjg4OCAwLTEuNjE1LS4xMzgtMi4xODEtLjQxNHYtMS4yMTRjLjM1OC4xNjguNzM5LjMwMSAxLjE0MS4zOTcuNDAzLjA5Ny43NzguMTQ1IDEuMTI1LjE0NS41MDggMCAuODg0LS4wOTcgMS4xMjUtLjI5YS45NDUuOTQ1IDAgMCAwIC4zNjMtLjc3OS45NzguOTc4IDAgMCAwLS4zMzMtLjc0N2MtLjIyMi0uMjA0LS42OC0uNDQ2LTEuMzc1LS43MjVDMS4zMyA4LjU3LjgyNSA4LjI0LjUzMSA3Ljg2NWMtLjI5NC0uMzcyLS40NC0uODItLjQ0LTEuMzQzIDAtLjY1NS4yMzMtMS4xNy42OTgtMS41NDcuNDY1LS4zNzYgMS4wOS0uNTY0IDEuODc1LS41NjQuNzUyIDAgMS41LjE2NSAyLjI0NS40OTRsLS40MDggMS4wNDdjLS42OTgtLjI5NC0xLjMyMS0uNDQtMS44NjktLjQ0LS40MTUgMC0uNzMuMDktLjk0NS4yNzFhLjg5Ljg5IDAgMCAwLS4zMjIuNzE3YzAgLjIwNC4wNDMuMzguMTI5LjUyNC4wODYuMTQ1LjIyNy4yODIuNDI0LjQxMS4xOTcuMTMuNTUxLjMgMS4wNjMuNTEuNTc3LjI0Ljk5OS40NjQgMS4yNjguNjcxLjI2OS4yMDguNDY1LjQ0Mi41OTEuNzA0LjEyNS4yNjEuMTg4LjU3LjE4OC45MjRsLS4wMDEuMDAyem0zLjk4IDIuMjRjLS45MjQgMC0xLjY0Ni0uMjY5LTIuMTY3LS44MDgtLjUyMS0uNTM5LS43ODEtMS4yOC0uNzgxLTIuMjI2IDAtLjk3LjI0Mi0xLjczMy43MjUtMi4yODguNDgzLS41NTUgMS4xNDgtLjgzMyAxLjk5My0uODMzLjc4NCAwIDEuNDA0LjIzOCAxLjg1OC43MTQuNDU1LjQ3Ni42ODIgMS4xMzIuNjgyIDEuOTY2di42ODJINy4zNTljLjAxOC41NzcuMTc0IDEuMDIuNDY3IDEuMzMuMjk0LjMxLjcwNy40NjQgMS4yNDEuNDY0LjM1MSAwIC42NzgtLjAzMy45OC0uMDk5YTUuMSA1LjEgMCAwIDAgLjk3NS0uMzN2MS4wMjZhMy44NjUgMy44NjUgMCAwIDEtLjkzNS4zMTIgNS43MjMgNS43MjMgMCAwIDEtMS4wOC4wOTF6bTcuNDYtLjEwN2wtLjI1Mi0uODI3aC0uMDQzYy0uMjg2LjM2Mi0uNTc1LjYwOC0uODY1Ljc0LS4yOS4xMy0uNjYyLjE5NS0xLjExNy4xOTUtLjU4NCAwLTEuMDM5LS4xNTgtMS4zNjctLjQ3My0uMzI4LS4zMTUtLjQ5MS0uNzYtLjQ5MS0xLjMzNyAwLS42MTIuMjI3LTEuMDc0LjY4Mi0xLjM4Ni40NTUtLjMxMiAxLjE0OC0uNDgyIDIuMDc5LS41MWwxLjAyNi0uMDMydi0uMzE3YzAtLjM4LS4wODktLjY2My0uMjY2LS44NS0uMTc3LS4xODktLjQ1Mi0uMjgzLS44MjQtLjI4My0uMzA0IDAtLjU5Ni4wNDUtLjg3NS4xMzRhNi42OCA2LjY4IDAgMCAwLS44MDYuMzE3bC0uNDA4LS45MDJhNC40MTQgNC40MTQgMCAwIDEgMS4wNTgtLjM4NCA0Ljg1NiA0Ljg1NiAwIDAgMSAxLjA4NS0uMTMyYy43NTYgMCAxLjMyNi4xNjUgMS43MTEuNDk0LjM4NS4zMy41NzcuODQ3LjU3NyAxLjU1MnY0LjAwMWgtLjkwNHptNS42NzctNi4wNDhjLjI1NCAwIC40NjQuMDE4LjYyOC4wNTRsLS4xMjQgMS4xNzZhMi4zODMgMi4zODMgMCAwIDAtLjU1OS0uMDY0Yy0uNTA1IDAtLjkxNC4xNjUtMS4yMjcuNDk0LS4zMTMuMzMtLjQ3Ljc1Ny0uNDcgMS4yODR2My4xMDRIMTkuMTNWNi40NGguOTg4bC4xNjcgMS4wNDdoLjA2NGMuMTk3LS4zNTQuNDU0LS42MzYuNzcxLS44NDNhMS44MyAxLjgzIDAgMCAxIDEuMDIzLS4zMTJoLjAwMXptNC4xMjUgNi4xNTVjLS44OTkgMC0xLjU4Mi0uMjYyLTIuMDQ5LS43ODctLjQ2Ny0uNTI1LS43MDEtMS4yNzctLjcwMS0yLjI1OSAwLS45OTkuMjQ0LTEuNzY3LjczMy0yLjMwNC40ODktLjUzNyAxLjE5NS0uODA2IDIuMTE5LS44MDYuNjI3IDAgMS4xOTEuMTE2IDEuNjkyLjM1bC0uMzgxIDEuMDE0Yy0uNTM0LS4yMDgtLjk3NC0uMzEyLTEuMzIxLS4zMTItMS4wMjggMC0xLjU0Mi42ODItMS41NDIgMi4wNDYgMCAuNjY2LjEyOCAxLjE2Ni4zODQgMS41MDEuMjU2LjMzNS42MzEuNTAyIDEuMTI1LjUwMmEzLjIzIDMuMjMgMCAwIDAgMS41OTUtLjQxOXYxLjEwMWEyLjUzIDIuNTMgMCAwIDEtLjcyMi4yODUgNC4zNTYgNC4zNTYgMCAwIDEtLjkzMi4wODZ2LjAwMnptOC4yNzctLjEwN2gtMS4yNjhWOC43MjdjMC0uNDU4LS4wOTItLjgtLjI3Ny0xLjAyNi0uMTg0LS4yMjYtLjQ3Ny0uMzM4LS44NzgtLjMzOC0uNTMgMC0uOTE5LjE1OC0xLjE2OC40NzUtLjI0OS4zMTctLjM3My44NDgtLjM3MyAxLjU5M3YyLjk1SDI5LjMyVjQuMDIyaDEuMjYydjIuMTIyYzAgLjM0LS4wMjEuNzA0LS4wNjQgMS4wOWguMDgxYTEuNzYgMS43NiAwIDAgMSAuNzE3LS42NjZjLjMwNi0uMTU4LjY2My0uMjM2IDEuMDcyLS4yMzYgMS40MzkgMCAyLjE1OS43MjUgMi4xNTkgMi4xNzV2My44NzNsLS4wMDEtLjAwMnptNy42NDgtNi4wNDhjLjc0MSAwIDEuMzE5LjI3IDEuNzMyLjgwNi40MTQuNTM3LjYyIDEuMjkxLjYyIDIuMjYxIDAgLjk3NC0uMjA5IDEuNzMyLS42MjggMi4yNzUtLjQxOS41NDItMS4wMDEuODE0LTEuNzQ2LjgxNC0uNzUyIDAtMS4zMzYtLjI3LTEuNzUxLS44MWgtLjA4NmwtLjIzMS43MDNoLS45NDVWNC4wMjNoMS4yNjJWNi4wMWwtLjAyMS42NTUtLjAzMi41NTNoLjA1NGMuNDAxLS41OS45OTItLjg4NiAxLjc3Mi0uODg2em0yLjkxNy4xMDdoMS4zNzVsMS4yMDggMy4zNjhjLjE4My40OC4zMDQuOTMxLjM2NSAxLjM1NGguMDQzYy4wMzItLjE5Ny4wOTEtLjQzNi4xNzctLjcxNy4wODYtLjI4LjU0MS0xLjYxNiAxLjM2NC00LjAwNGgxLjM2NGwtMi41NDEgNi43M2MtLjQ2MiAxLjIzNS0xLjIzMiAxLjg1My0yLjMxIDEuODUzLS4yNzkgMC0uNTUxLS4wMy0uODE2LS4wOXYtMWMuMTkuMDQzLjQwNi4wNjQuNjUuMDY0LjYwOSAwIDEuMDM3LS4zNTMgMS4yODQtMS4wNThsLjIyLS41NTktMi4zODUtNS45NGguMDAyem0tMy4yNDQuOTI0Yy0uNTA4IDAtLjg3NS4xNS0xLjA5OC40NDgtLjIyNC4zLS4zMzkuOC0uMzQ2IDEuNTAxdi4wODZjMCAuNzIzLjExNSAxLjI0Ny4zNDQgMS41NzEuMjI5LjMyNC42MDMuNDg2IDEuMTIzLjQ4Ni40NDggMCAuNzg3LS4xNzcgMS4wMTgtLjUzMi4yMzEtLjM1NC4zNDYtLjg2Ny4zNDYtMS41MzYgMC0xLjM1LS40NjItMi4wMjUtMS4zODYtMi4wMjVsLS4wMDEuMDAxem0tMjcuMjggNC4xNTdjLjQ1OCAwIC44MjYtLjEyOCAxLjEwNC0uMzg0LjI3OC0uMjU2LjQxNi0uNjE1LjQxNi0xLjA3N3YtLjUxNmwtLjc2My4wMzJjLS41OTQuMDIxLTEuMDI3LjEyMS0xLjI5Ny4yOThzLS40MDYuNDQ4LS40MDYuODE0YzAgLjI2NS4wNzkuNDcuMjM2LjYxNS4xNTguMTQ1LjM5NC4yMTguNzA5LjIxOGguMDAxek04Ljc3NSA3LjI4N2MtLjQwMSAwLS43MjIuMTI3LS45NjQuMzgxcy0uMzg2LjYyNS0uNDMyIDEuMTEyaDIuNjk2Yy0uMDA3LS40OS0uMTI1LS44NjItLjM1NC0xLjExNS0uMjI5LS4yNTItLjU0NC0uMzc5LS45NDUtLjM3OWwtLjAwMS4wMDF6XFxcIi8+PC9nPjxwYXRoIGZpbGw9XFxcIiM1NDY4RkZcXFwiIGQ9XFxcIk0xMDIuMTYyIDEzLjc4NGMwIDEuNDU1LS4zNzIgMi41MTctMS4xMjMgMy4xOTMtLjc1LjY3Ni0xLjg5NSAxLjAxMy0zLjQ0IDEuMDEzLS41NjQgMC0xLjczNi0uMTA5LTIuNjczLS4zMTZsLjM0NS0xLjY4OWMuNzgzLjE2MyAxLjgxOS4yMDcgMi4zNjEuMjA3Ljg2IDAgMS40NzMtLjE3NCAxLjg0LS41MjMuMzY3LS4zNDkuNTQ4LS44NjYuNTQ4LTEuNTUzdi0uMzQ5YTYuMzc0IDYuMzc0IDAgMCAxLS44MzguMzE2IDQuMTUxIDQuMTUxIDAgMCAxLTEuMTk0LjE1OCA0LjUxNSA0LjUxNSAwIDAgMS0xLjYxNi0uMjc4IDMuMzg1IDMuMzg1IDAgMCAxLTEuMjU0LS44MTcgMy43NDQgMy43NDQgMCAwIDEtLjgxMS0xLjM1Yy0uMTkyLS41NC0uMjktMS41MDUtLjI5LTIuMjEzIDAtLjY2NS4xMDQtMS40OTguMzA3LTIuMDU0YTMuOTI1IDMuOTI1IDAgMCAxIC45MDQtMS40MzMgNC4xMjQgNC4xMjQgMCAwIDEgMS40NDEtLjkyNiA1LjMxIDUuMzEgMCAwIDEgMS45NDUtLjM2NWMuNjk2IDAgMS4zMzcuMDg3IDEuOTYxLjE5MWExNS44NiAxNS44NiAwIDAgMSAxLjU4OC4zMzJ2OC40NTZoLS4wMDF6bS01Ljk1NS00LjIwNmMwIC44OTMuMTk3IDEuODg1LjU5MiAyLjMuMzk0LjQxMy45MDQuNjIgMS41MjguNjIuMzQgMCAuNjYzLS4wNDkuOTY0LS4xNDJhMi43NSAyLjc1IDAgMCAwIC43MzQtLjMzMnYtNS4yOWE4LjUzMSA4LjUzMSAwIDAgMC0xLjQxMy0uMThjLS43NzgtLjAyMi0xLjM2OS4yOTQtMS43ODYuODAxLS40MTEuNTA3LS42MTkgMS4zOTUtLjYxOSAyLjIyM3ptMTYuMTIxIDBjMCAuNzItLjEwNCAxLjI2NC0uMzE4IDEuODU4YTQuMzg5IDQuMzg5IDAgMCAxLS45MDQgMS41MmMtLjM4OS40Mi0uODU0Ljc0Ni0xLjQwMi45NzUtLjU0OC4yMy0xLjM5MS4zNi0xLjgxMy4zNi0uNDIyLS4wMDUtMS4yNi0uMTI1LTEuODAyLS4zNmE0LjA4OCA0LjA4OCAwIDAgMS0xLjM5Ny0uOTc1IDQuNDg2IDQuNDg2IDAgMCAxLS45MDktMS41MiA1LjAzNyA1LjAzNyAwIDAgMS0uMzI5LTEuODU4YzAtLjcxOS4wOTktMS40MS4zMTgtMS45OTkuMjE5LS41ODguNTI2LTEuMDkuOTItMS41MDkuMzk0LS40Mi44NjUtLjc0IDEuNDAyLS45N2E0LjU0NyA0LjU0NyAwIDAgMSAxLjc4Ni0uMzM4IDQuNjkgNC42OSAwIDAgMSAxLjc5MS4zMzhjLjU0OC4yMyAxLjAxOS41NSAxLjQwMi45Ny4zODkuNDIuNjkuOTIxLjkwOSAxLjUxLjIzLjU4Ny4zNDUgMS4yOC4zNDUgMS45OThoLjAwMXptLTIuMTkyLjAwNWMwLS45Mi0uMjAzLTEuNjg5LS41OTctMi4yMjMtLjM5NC0uNTM5LS45NDgtLjgwNi0xLjY1NC0uODA2LS43MDcgMC0xLjI2LjI2Ny0xLjY1NC44MDYtLjM5NC41NC0uNTg2IDEuMzAyLS41ODYgMi4yMjMgMCAuOTMyLjE5NyAxLjU1OC41OTIgMi4wOTguMzk0LjU0NS45NDguODEyIDEuNjU0LjgxMi43MDcgMCAxLjI2LS4yNzIgMS42NTQtLjgxMi4zOTQtLjU0NS41OTItMS4xNjYuNTkyLTIuMDk4aC0uMDAxem02Ljk2MyA0LjcwOGMtMy41MTEuMDE2LTMuNTExLTIuODIyLTMuNTExLTMuMjc0TDExMy41ODMuOTVsMi4xNDItLjMzOHYxMC4wMDNjMCAuMjU2IDAgMS44OCAxLjM3NSAxLjg4NXYxLjc5M2gtLjAwMXpNMTIwLjg3MyAxNC4yOTFoLTIuMTUzVjUuMDk1bDIuMTUzLS4zMzh6TTExOS43OTQgMy43NWMuNzE4IDAgMS4zMDQtLjU3OSAxLjMwNC0xLjI5MiAwLS43MTQtLjU4MS0xLjI5LTEuMzA0LTEuMjktLjcyMyAwLTEuMzA0LjU3Ny0xLjMwNCAxLjI5IDAgLjcxNC41ODYgMS4yOTEgMS4zMDQgMS4yOTF6bTYuNDMxIDEuMDEyYy43MDcgMCAxLjMwNC4wODcgMS43ODYuMjYyLjQ4Mi4xNzQuODcxLjQyIDEuMTU2LjczLjI4NS4zMTEuNDg4LjczNS42MDggMS4xODIuMTI2LjQ0Ny4xODYuOTM3LjE4NiAxLjQ3NnY1LjQ4MWEyNS4yNCAyNS4yNCAwIDAgMS0xLjQ5NS4yNTFjLS42NjguMDk4LTEuNDE5LjE0Ny0yLjI1MS4xNDdhNi44MjkgNi44MjkgMCAwIDEtMS41MTctLjE1OCAzLjIxMyAzLjIxMyAwIDAgMS0xLjE3OC0uNTA3IDIuNDU1IDIuNDU1IDAgMCAxLS43NjEtLjkwNGMtLjE4MS0uMzctLjI3NC0uODkzLS4yNzQtMS40MzggMC0uNTIzLjEwNC0uODU1LjMwNy0xLjIxNS4yMDgtLjM2LjQ4Ny0uNjU0LjgzOC0uODgzYTMuNjA5IDMuNjA5IDAgMCAxIDEuMjI3LS40OSA3LjA3MyA3LjA3MyAwIDAgMSAyLjIwMi0uMTAzYy4yNjMuMDI3LjUzNy4wNzYuODMzLjE0N3YtLjM0OWMwLS4yNDUtLjAyNy0uNDc5LS4wODgtLjY5N2ExLjQ4NiAxLjQ4NiAwIDAgMC0uMzA3LS41ODNjLS4xNDgtLjE2OS0uMzQtLjMtLjU4MS0uMzkyYTIuNTM2IDIuNTM2IDAgMCAwLS45MTUtLjE2M2MtLjQ5MyAwLS45NDIuMDYtMS4zNTMuMTMxLS40MTEuMDcxLS43NS4xNTMtMS4wMDguMjQ1bC0uMjU3LTEuNzQ5Yy4yNjgtLjA5My42NjgtLjE4NSAxLjE4My0uMjc4YTkuMzM1IDkuMzM1IDAgMCAxIDEuNjYtLjE0MmgtLjAwMXptLjE3OSA3LjczYy42NTcgMCAxLjE0NS0uMDM4IDEuNDg0LS4xMDRWMTAuMjJhNS4wOTcgNS4wOTcgMCAwIDAtMS45NzgtLjEwNGMtLjI0MS4wMzMtLjQ2LjA5OC0uNjUyLjE5MWExLjE2NyAxLjE2NyAwIDAgMC0uNDY2LjM5MmMtLjEyMS4xNy0uMTc1LjI2Ny0uMTc1LjUyMyAwIC41MDEuMTc1Ljc5LjQ5My45ODEuMzIzLjE5Ni43NS4yOSAxLjI5My4yOWguMDAxek04NC4xMDggNC44MTZjLjcwNyAwIDEuMzA0LjA4NyAxLjc4Ni4yNjIuNDgyLjE3NC44NzEuNDIgMS4xNTYuNzMuMjkuMzE2LjQ4Ny43MzUuNjA4IDEuMTgyLjEyNi40NDcuMTg2LjkzNy4xODYgMS40NzZ2NS40ODFhMjUuMjQgMjUuMjQgMCAwIDEtMS40OTUuMjUxYy0uNjY4LjA5OC0xLjQxOS4xNDctMi4yNTEuMTQ3YTYuODI5IDYuODI5IDAgMCAxLTEuNTE3LS4xNTggMy4yMTMgMy4yMTMgMCAwIDEtMS4xNzgtLjUwNyAyLjQ1NSAyLjQ1NSAwIDAgMS0uNzYxLS45MDRjLS4xODEtLjM3LS4yNzQtLjg5My0uMjc0LTEuNDM4IDAtLjUyMy4xMDQtLjg1NS4zMDctMS4yMTUuMjA4LS4zNi40ODctLjY1NC44MzgtLjg4M2EzLjYwOSAzLjYwOSAwIDAgMSAxLjIyNy0uNDkgNy4wNzMgNy4wNzMgMCAwIDEgMi4yMDItLjEwM2MuMjU3LjAyNy41MzcuMDc2LjgzMy4xNDd2LS4zNDljMC0uMjQ1LS4wMjctLjQ3OS0uMDg4LS42OTdhMS40ODYgMS40ODYgMCAwIDAtLjMwNy0uNTgzYy0uMTQ4LS4xNjktLjM0LS4zLS41ODEtLjM5MmEyLjUzNiAyLjUzNiAwIDAgMC0uOTE1LS4xNjNjLS40OTMgMC0uOTQyLjA2LTEuMzUzLjEzMS0uNDExLjA3MS0uNzUuMTUzLTEuMDA4LjI0NWwtLjI1Ny0xLjc0OWMuMjY4LS4wOTMuNjY4LS4xODUgMS4xODMtLjI3OGE4Ljg5IDguODkgMCAwIDEgMS42Ni0uMTQyaC0uMDAxem0uMTg1IDcuNzM2Yy42NTcgMCAxLjE0NS0uMDM4IDEuNDg0LS4xMDRWMTAuMjhhNS4wOTcgNS4wOTcgMCAwIDAtMS45NzgtLjEwNGMtLjI0MS4wMzMtLjQ2LjA5OC0uNjUyLjE5MWExLjE2NyAxLjE2NyAwIDAgMC0uNDY2LjM5MmMtLjEyMS4xNy0uMTc1LjI2Ny0uMTc1LjUyMyAwIC41MDEuMTc1Ljc5LjQ5My45ODEuMzE4LjE5MS43NS4yOSAxLjI5My4yOWguMDAxem04LjY4MyAxLjczOGMtMy41MTEuMDE2LTMuNTExLTIuODIyLTMuNTExLTMuMjc0TDg5LjQ2Ljk0OCA5MS42MDIuNjF2MTAuMDAzYzAgLjI1NiAwIDEuODggMS4zNzUgMS44ODV2MS43OTNoLS4wMDF6XFxcIi8+PC9nPjwvc3ZnPlwiO1xuXG4vKiBiYWJlbC1wbHVnaW4taW5saW5lLWltcG9ydCAnLi9pY29ucy9vc20uc3ZnJyAqL1xudmFyIG9zbUxvZ28gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMTJcXFwiIGhlaWdodD1cXFwiMTJcXFwiPlxcbiAgPHBhdGggZmlsbD1cXFwiIzc5Nzk3OVxcXCIgZmlsbC1ydWxlPVxcXCJldmVub2RkXFxcIiBkPVxcXCJNNi41NzcuNUw1LjMwNC4wMDUgMi42MjcgMS4wMiAwIDBsLjk5MiAyLjc2Ny0uOTg2IDIuNjg1Ljk5OCAyLjc2LTEgMi43MTcuNjEzLjIyIDMuMzktMy40NS41NjMuMDYuNzI2LS42OXMtLjcxNy0uOTItLjkxLTEuODZjLjE5My0uMTQ2LjE4NC0uMTQuMzU1LS4yODVDNC4xIDEuOTMgNi41OC41IDYuNTguNXptLTQuMTcgMTEuMzU0bC4yMi4xMiAyLjY4LTEuMDUgMi42MiAxLjA0IDIuNjQ0LTEuMDMgMS4wMi0yLjcxNy0uMzMtLjk0NHMtMS4xMyAxLjI2LTMuNDQuODc4Yy0uMTc0LjI5LS4yNS4zNy0uMjUuMzdzLTEuMTEtLjMxLTEuNjgzLS44OWMtLjU3My41OC0uNzk1LjcxLS43OTUuNzFsLjA4LjYzNC0yLjc2IDIuODl6bTYuMjYtNC4zOTVjMS44MTcgMCAzLjI5LTEuNTMgMy4yOS0zLjQgMC0xLjg4LTEuNDczLTMuNC0zLjI5LTMuNHMtMy4yOSAxLjUyLTMuMjkgMy40YzAgMS44NyAxLjQ3MyAzLjQgMy4yOSAzLjR6XFxcIi8+XFxuPC9zdmc+XFxuXCI7XG52YXIgX2RlZmF1bHQgPSB7XG4gIGZvb3RlcjogXCI8ZGl2IGNsYXNzPVxcXCJhcC1mb290ZXJcXFwiPlxcbiAgPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vcGxhY2VzXFxcIiB0aXRsZT1cXFwiU2VhcmNoIGJ5IEFsZ29saWFcXFwiIGNsYXNzPVxcXCJhcC1mb290ZXItYWxnb2xpYVxcXCI+XCIuY29uY2F0KGFsZ29saWFMb2dvLnRyaW0oKSwgXCI8L2E+XFxuICB1c2luZyA8YSBocmVmPVxcXCJodHRwczovL2NvbW11bml0eS5hbGdvbGlhLmNvbS9wbGFjZXMvZG9jdW1lbnRhdGlvbi5odG1sI2xpY2Vuc2VcXFwiIGNsYXNzPVxcXCJhcC1mb290ZXItb3NtXFxcIiB0aXRsZT1cXFwiQWxnb2xpYSBQbGFjZXMgZGF0YSBcXHhBOSBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9yc1xcXCI+XCIpLmNvbmNhdChvc21Mb2dvLnRyaW0oKSwgXCIgPHNwYW4+ZGF0YTwvc3Bhbj48L2E+XFxuICA8L2Rpdj5cIiksXG4gIHZhbHVlOiBfZm9ybWF0SW5wdXRWYWx1ZVtcImRlZmF1bHRcIl0sXG4gIHN1Z2dlc3Rpb246IF9mb3JtYXREcm9wZG93blZhbHVlW1wiZGVmYXVsdFwiXVxufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9IHtcbiAgbXVsdGlDb250YWluZXJzOiBcIkFsZ29saWEgUGxhY2VzOiAnY29udGFpbmVyJyBtdXN0IHBvaW50IHRvIGEgc2luZ2xlIDxpbnB1dD4gZWxlbWVudC5cXG5FeGFtcGxlOiBpbnN0YW50aWF0ZSB0aGUgbGlicmFyeSB0d2ljZSBpZiB5b3Ugd2FudCB0byBiaW5kIHR3byA8aW5wdXRzPi5cXG5cXG5TZWUgaHR0cHM6Ly9jb21tdW5pdHkuYWxnb2xpYS5jb20vcGxhY2VzL2RvY3VtZW50YXRpb24uaHRtbCNhcGktb3B0aW9ucy1jb250YWluZXJcIixcbiAgYmFkQ29udGFpbmVyOiBcIkFsZ29saWEgUGxhY2VzOiAnY29udGFpbmVyJyBtdXN0IHBvaW50IHRvIGFuIDxpbnB1dD4gZWxlbWVudC5cXG5cXG5TZWUgaHR0cHM6Ly9jb21tdW5pdHkuYWxnb2xpYS5jb20vcGxhY2VzL2RvY3VtZW50YXRpb24uaHRtbCNhcGktb3B0aW9ucy1jb250YWluZXJcIixcbiAgcmF0ZUxpbWl0UmVhY2hlZDogXCJBbGdvbGlhIFBsYWNlczogQ3VycmVudCByYXRlIGxpbWl0IHJlYWNoZWQuXFxuXFxuU2lnbiB1cCBmb3IgYSBmcmVlIDEwMCwwMDAgcXVlcmllcy9tb250aCBhY2NvdW50IGF0XFxuaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vdXNlcnMvc2lnbl91cC9wbGFjZXMuXFxuXFxuT3IgdXBncmFkZSB5b3VyIDEwMCwwMDAgcXVlcmllcy9tb250aCBwbGFuIGJ5IGNvbnRhY3RpbmcgdXMgYXRcXG5odHRwczovL2NvbW11bml0eS5hbGdvbGlhLmNvbS9wbGFjZXMvY29udGFjdC5odG1sLlwiLFxuICBpbnZhbGlkQ3JlZGVudGlhbHM6IFwiVGhlIEFQUCBJRCBvciBBUEkga2V5IHByb3ZpZGVkIGlzIGludmFsaWQuXCIsXG4gIGludmFsaWRBcHBJZDogXCJZb3VyIEFQUCBJRCBpcyBpbnZhbGlkLiBBIFBsYWNlcyBBUFAgSUQgc3RhcnRzIHdpdGggJ3BsJy4gWW91IG11c3QgY3JlYXRlIGEgdmFsaWQgUGxhY2VzIGFwcCBmaXJzdC5cXG5cXG5DcmVhdGUgYSBmcmVlIFBsYWNlcyBhcHAgaGVyZTogaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vdXNlcnMvc2lnbl91cC9wbGFjZXNcIlxufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZpbmRDb3VudHJ5Q29kZTtcblxuZnVuY3Rpb24gZmluZENvdW50cnlDb2RlKHRhZ3MpIHtcbiAgZm9yICh2YXIgdGFnSW5kZXggPSAwOyB0YWdJbmRleCA8IHRhZ3MubGVuZ3RoOyB0YWdJbmRleCsrKSB7XG4gICAgdmFyIHRhZyA9IHRhZ3NbdGFnSW5kZXhdO1xuICAgIHZhciBmaW5kID0gdGFnLm1hdGNoKC9jb3VudHJ5XFwvKC4qKT8vKTtcblxuICAgIGlmIChmaW5kKSB7XG4gICAgICByZXR1cm4gZmluZFsxXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmaW5kVHlwZTtcblxuZnVuY3Rpb24gZmluZFR5cGUodGFncykge1xuICB2YXIgdHlwZXMgPSB7XG4gICAgY291bnRyeTogJ2NvdW50cnknLFxuICAgIGNpdHk6ICdjaXR5JyxcbiAgICAnYW1lbml0eS9idXNfc3RhdGlvbic6ICdidXNTdG9wJyxcbiAgICAnYW1lbml0eS90b3duaGFsbCc6ICd0b3duaGFsbCcsXG4gICAgJ3JhaWx3YXkvc3RhdGlvbic6ICd0cmFpblN0YXRpb24nLFxuICAgICdhZXJvd2F5L2Flcm9kcm9tZSc6ICdhaXJwb3J0JyxcbiAgICAnYWVyb3dheS90ZXJtaW5hbCc6ICdhaXJwb3J0JyxcbiAgICAnYWVyb3dheS9nYXRlJzogJ2FpcnBvcnQnXG4gIH07XG5cbiAgZm9yICh2YXIgdCBpbiB0eXBlcykge1xuICAgIGlmICh0YWdzLmluZGV4T2YodCkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gdHlwZXNbdF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICdhZGRyZXNzJztcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZm9ybWF0RHJvcGRvd25WYWx1ZTtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vaWNvbnMvYWRkcmVzcy5zdmcnICovXG52YXIgYWRkcmVzc0ljb24gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNCAyMFxcXCI+PHBhdGggZD1cXFwiTTcgMEMzLjEzIDAgMCAzLjEzIDAgN2MwIDUuMjUgNyAxMyA3IDEzczctNy43NSA3LTEzYzAtMy44Ny0zLjEzLTctNy03em0wIDkuNUM1LjYyIDkuNSA0LjUgOC4zOCA0LjUgN1M1LjYyIDQuNSA3IDQuNSA5LjUgNS42MiA5LjUgNyA4LjM4IDkuNSA3IDkuNXpcXFwiLz48L3N2Zz5cXG5cIjtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vaWNvbnMvY2l0eS5zdmcnICovXG52YXIgY2l0eUljb24gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAxOCAxOVxcXCI+PHBhdGggZD1cXFwiTTEyIDlWM0w5IDAgNiAzdjJIMHYxNGgxOFY5aC02em0tOCA4SDJ2LTJoMnYyem0wLTRIMnYtMmgydjJ6bTAtNEgyVjdoMnYyem02IDhIOHYtMmgydjJ6bTAtNEg4di0yaDJ2MnptMC00SDhWN2gydjJ6bTAtNEg4VjNoMnYyem02IDEyaC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnpcXFwiLz48L3N2Zz5cXG5cIjtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vaWNvbnMvY291bnRyeS5zdmcnICovXG52YXIgY291bnRyeUljb24gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAyMCAyMFxcXCI+XFxuICA8cGF0aCBkPVxcXCJNMTAgMEM0LjQ4IDAgMCA0LjQ4IDAgMTBzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE1LjUyIDAgMTAgMHpNOSAxNy45M2MtMy45NS0uNDktNy0zLjg1LTctNy45MyAwLS42Mi4wOC0xLjIxLjIxLTEuNzlMNyAxM3YxYzAgMS4xLjkgMiAyIDJ2MS45M3ptNi45LTIuNTRjLS4yNi0uODEtMS0xLjM5LTEuOS0xLjM5aC0xdi0zYzAtLjU1LS40NS0xLTEtMUg2VjhoMmMuNTUgMCAxLS40NSAxLTFWNWgyYzEuMSAwIDItLjkgMi0ydi0uNDFjMi45MyAxLjE5IDUgNC4wNiA1IDcuNDEgMCAyLjA4LS44IDMuOTctMi4xIDUuMzl6XFxcIi8+XFxuPC9zdmc+XFxuXCI7XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL2J1cy5zdmcnICovXG52YXIgYnVzSWNvbiA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgdmlld0JveD1cXFwiMCAwIDU0LjkgNTAuNVxcXCI+PHBhdGggZD1cXFwiTTkuNiAxMi43SDguNWMtMi4zIDAtNC4xIDEuOS00LjEgNC4xdjEuMWMwIDIuMiAxLjggNCA0IDQuMXYyMS43aC0uN2MtMS4zIDAtMi4zIDEtMi4zIDIuM2g3LjFjMC0xLjMtMS0yLjMtMi4zLTIuM2gtLjVWMjIuMWMyLjItLjEgNC0xLjkgNC00LjF2LTEuMWMwLTIuMy0xLjgtNC4yLTQuMS00LjJ6TTQ2IDcuNmgtNy41YzAtMS44LTEuNS0zLjMtMy4zLTMuM2gtMy42Yy0xLjggMC0zLjMgMS41LTMuMyAzLjNIMjFjLTIuNSAwLTQuNiAyLTQuNiA0LjZ2MjYuM2MwIDEuNyAxLjMgMy4xIDMgMy4xaC44djEuNmMwIDEuNyAxLjQgMy4xIDMuMSAzLjEgMS43IDAgMy0xLjQgMy0zLjF2LTEuNmgxNC4zdjEuNmMwIDEuNyAxLjQgMy4xIDMuMSAzLjEgMS43IDAgMy4xLTEuNCAzLjEtMy4xdi0xLjZoLjhjMS43IDAgMy4xLTEuNCAzLjEtMy4xVjEyLjJjLS4yLTIuNS0yLjItNC42LTQuNy00LjZ6bS0yNy40IDQuNmMwLTEuMyAxLjEtMi40IDIuNC0yLjRoMjVjMS4zIDAgMi40IDEuMSAyLjQgMi40di4zYzAgMS4zLTEuMSAyLjQtMi40IDIuNEgyMWMtMS4zIDAtMi40LTEuMS0yLjQtMi40di0uM3pNMjEgMzhjLTEuNSAwLTIuNy0xLjItMi43LTIuNyAwLTEuNSAxLjItMi43IDIuNy0yLjcgMS41IDAgMi43IDEuMiAyLjcgMi43IDAgMS41LTEuMiAyLjctMi43IDIuN3ptMC0xMC4xYy0xLjMgMC0yLjQtMS4xLTIuNC0yLjR2LTYuNmMwLTEuMyAxLjEtMi40IDIuNC0yLjRoMjVjMS4zIDAgMi40IDEuMSAyLjQgMi40djYuNmMwIDEuMy0xLjEgMi40LTIuNCAyLjRIMjF6bTI0LjggMTBjLTEuNSAwLTIuNy0xLjItMi43LTIuNyAwLTEuNSAxLjItMi43IDIuNy0yLjcgMS41IDAgMi43IDEuMiAyLjcgMi43IDAgMS41LTEuMiAyLjctMi43IDIuN3pcXFwiLz48L3N2Zz5cXG5cIjtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vaWNvbnMvdHJhaW4uc3ZnJyAqL1xudmFyIHRyYWluSWNvbiA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgdmlld0JveD1cXFwiMCAwIDE1IDIwXFxcIj5cXG4gIDxwYXRoIGQ9XFxcIk0xMy4xMDUgMjBsLTIuMzY2LTMuMzU0SDQuMjZMMS45MDcgMjBIMGwzLjI5Ny00Ljc4N2MtMS4xLS4xNzctMi4xOTYtMS4yODctMi4xOTQtMi42NDJWMi42OEMxLjEgMS4yOCAyLjMxNy0uMDAyIDMuOTczIDBoNy4wNjVjMS42NDctLjAwMiAyLjg2MyAxLjI4IDIuODYgMi42NzZ2OS44OTVjLjAwMyAxLjM2LTEuMDk0IDIuNDctMi4xOTQgMi42NDdMMTUgMjBoLTEuODk1ek02LjExIDJoMi43OGMuMjY0IDAgLjQ3Mi0uMTIzLjQ3Mi0uMjd2LS40NmMwLS4xNDctLjIyLS4yNjgtLjQ3Mi0uMjdINi4xMWMtLjI1Mi4wMDItLjQ3LjEyMy0uNDcuMjd2LjQ2YzAgLjE0Ni4yMDYuMjcuNDcuMjd6bTYuMjYgMy45NTJWNC4xNzVjLS4wMDQtLjc0LS41LTEuMzg3LTEuNDM2LTEuMzg4SDQuMDY2Yy0uOTM2IDAtMS40My42NDgtMS40MzYgMS4zODh2MS43NzdjLS4wMDIuODYuNjQ0IDEuMzg0IDEuNDM2IDEuMzg4aDYuODY4Yy43OTMtLjAwNCAxLjQ0LS41MjggMS40MzYtMS4zODh6bS04LjQ2NSA1LjM4NmMtLjY5LS4wMDMtMS4yNTQuNTQtMS4yNTIgMS4yMS0uMDAyLjY3My41NiAxLjIxNyAxLjI1MiAxLjIyMi42OTctLjAwNiAxLjI2LS41NSAxLjI2Mi0xLjIyLS4wMDItLjY3Mi0uNTY1LTEuMjE1LTEuMjYyLTEuMjEyem04LjQyIDEuMjFjLS4wMDUtLjY3LS41NjctMS4yMTMtMS4yNjUtMS4yMS0uNjktLjAwMy0xLjI1My41NC0xLjI1IDEuMjEtLjAwMy42NzMuNTYgMS4yMTcgMS4yNSAxLjIyMi42OTgtLjAwNiAxLjI2LS41NSAxLjI2NC0xLjIyelxcXCIvPlxcbjwvc3ZnPlxcblwiO1xuXG4vKiBiYWJlbC1wbHVnaW4taW5saW5lLWltcG9ydCAnLi9pY29ucy90b3duaGFsbC5zdmcnICovXG52YXIgdG93bmhhbGxJY29uID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjQgMjRcXFwiPjxwYXRoIGQ9XFxcIk0xMiAuNkwyLjUgNi45aDE4LjlMMTIgLjZ6TTMuOCA4LjJjLS43IDAtMS4zLjYtMS4zIDEuM3Y4LjhMLjMgMjIuMWMtLjIuMy0uMy41LS4zLjYgMCAuNi44LjYgMS4zLjZoMjEuNWMuNCAwIDEuMyAwIDEuMy0uNiAwLS4yLS4xLS4zLS4zLS42bC0yLjItMy44VjkuNWMwLS43LS42LTEuMy0xLjMtMS4zSDMuOHptMi41IDIuNWMuNyAwIDEuMS42IDEuMyAxLjN2Ny42SDUuMVYxMmMwLS43LjUtMS4zIDEuMi0xLjN6bTUuNyAwYy43IDAgMS4zLjYgMS4zIDEuM3Y3LjZoLTIuNVYxMmMtLjEtLjcuNS0xLjMgMS4yLTEuM3ptNS43IDBjLjcgMCAxLjMuNiAxLjMgMS4zdjcuNmgtMi41VjEyYy0uMS0uNy41LTEuMyAxLjItMS4zelxcXCIvPjwvc3ZnPlxcblwiO1xuXG4vKiBiYWJlbC1wbHVnaW4taW5saW5lLWltcG9ydCAnLi9pY29ucy9wbGFuZS5zdmcnICovXG52YXIgcGxhbmVJY29uID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjQgMjRcXFwiPjxwYXRoIGQ9XFxcIk0yMi45IDEuMXMxLjMuMy00LjMgNi41bC43IDMuOC4yLS4yYy40LS40IDEtLjQgMS4zIDAgLjQuNC40IDEgMCAxLjNsLTEuMiAxLjIuMyAxLjcuMS0uMWMuNC0uNCAxLS40IDEuMyAwIC40LjQuNCAxIDAgMS4zbC0xLjEgMS4xYy4yIDEuOS4zIDMuNi4xIDQuNSAwIDAtMS4yIDEuMi0xLjguNSAwIDAtMi4zLTcuNy0zLjgtMTEuMS01LjkgNi02LjQgNS42LTYuNCA1LjZzMS4yIDMuOC0uMiA1LjJsLTIuMy00LjNoLjFsLTQuMy0yLjNjMS4zLTEuMyA1LjItLjIgNS4yLS4ycy0uNS0uNCA1LjYtNi4zQzguOSA3LjcgMS4yIDUuNSAxLjIgNS41Yy0uNy0uNy41LTEuOC41LTEuOC45LS4yIDIuNi0uMSA0LjUuMWwxLjEtMS4xYy40LS40IDEtLjQgMS4zIDAgLjQuNC40IDEgMCAxLjNsMS43LjMgMS4yLTEuMmMuNC0uNCAxLS40IDEuMyAwIC40LjQuNCAxIDAgMS4zbC0uMi4yIDMuOC43YzYuMi01LjUgNi41LTQuMiA2LjUtNC4yelxcXCIvPjwvc3ZnPlxcblwiO1xudmFyIGljb25zID0ge1xuICBhZGRyZXNzOiBhZGRyZXNzSWNvbixcbiAgY2l0eTogY2l0eUljb24sXG4gIGNvdW50cnk6IGNvdW50cnlJY29uLFxuICBidXNTdG9wOiBidXNJY29uLFxuICB0cmFpblN0YXRpb246IHRyYWluSWNvbixcbiAgdG93bmhhbGw6IHRvd25oYWxsSWNvbixcbiAgYWlycG9ydDogcGxhbmVJY29uXG59O1xuXG5mdW5jdGlvbiBmb3JtYXREcm9wZG93blZhbHVlKF9yZWYpIHtcbiAgdmFyIHR5cGUgPSBfcmVmLnR5cGUsXG4gICAgICBoaWdobGlnaHQgPSBfcmVmLmhpZ2hsaWdodDtcbiAgdmFyIG5hbWUgPSBoaWdobGlnaHQubmFtZSxcbiAgICAgIGFkbWluaXN0cmF0aXZlID0gaGlnaGxpZ2h0LmFkbWluaXN0cmF0aXZlLFxuICAgICAgY2l0eSA9IGhpZ2hsaWdodC5jaXR5LFxuICAgICAgY291bnRyeSA9IGhpZ2hsaWdodC5jb3VudHJ5O1xuICB2YXIgb3V0ID0gXCI8c3BhbiBjbGFzcz1cXFwiYXAtc3VnZ2VzdGlvbi1pY29uXFxcIj5cIi5jb25jYXQoaWNvbnNbdHlwZV0udHJpbSgpLCBcIjwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwiYXAtbmFtZVxcXCI+XCIpLmNvbmNhdChuYW1lLCBcIjwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwiYXAtYWRkcmVzc1xcXCI+XFxuICBcIikuY29uY2F0KFtjaXR5LCBhZG1pbmlzdHJhdGl2ZSwgY291bnRyeV0uZmlsdGVyKGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHJldHVybiB0b2tlbiAhPT0gdW5kZWZpbmVkO1xuICB9KS5qb2luKCcsICcpLCBcIjwvc3Bhbj5cIikucmVwbGFjZSgvXFxzKlxcblxccyovZywgJyAnKTtcbiAgcmV0dXJuIG91dDtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZm9ybWF0SGl0O1xuXG52YXIgX2ZpbmRDb3VudHJ5Q29kZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZmluZENvdW50cnlDb2RlXCIpKTtcblxudmFyIF9maW5kVHlwZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZmluZFR5cGVcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIGdldEJlc3RIaWdobGlnaHRlZEZvcm0oaGlnaGxpZ2h0ZWRWYWx1ZXMpIHtcbiAgdmFyIGRlZmF1bHRWYWx1ZSA9IGhpZ2hsaWdodGVkVmFsdWVzWzBdLnZhbHVlOyAvLyBjb2xsZWN0IGFsbCBvdGhlciBtYXRjaGVzXG5cbiAgdmFyIGJlc3RBdHRyaWJ1dGVzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBoaWdobGlnaHRlZFZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChoaWdobGlnaHRlZFZhbHVlc1tpXS5tYXRjaExldmVsICE9PSAnbm9uZScpIHtcbiAgICAgIGJlc3RBdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgd29yZHM6IGhpZ2hsaWdodGVkVmFsdWVzW2ldLm1hdGNoZWRXb3Jkc1xuICAgICAgfSk7XG4gICAgfVxuICB9IC8vIG5vIG1hdGNoZXMgaW4gdGhpcyBhdHRyaWJ1dGUsIHJldHJpZXZlIGZpcnN0IHZhbHVlXG5cblxuICBpZiAoYmVzdEF0dHJpYnV0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgfSAvLyBzb3J0IHRoZSBtYXRjaGVzIGJ5IGBkZXNjKHdvcmRzKSwgYXNjKGluZGV4KWBcblxuXG4gIGJlc3RBdHRyaWJ1dGVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBpZiAoYS53b3JkcyA+IGIud29yZHMpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2UgaWYgKGEud29yZHMgPCBiLndvcmRzKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXg7XG4gIH0pOyAvLyBhbmQgYXBwZW5kIHRoZSBiZXN0IG1hdGNoIHRvIHRoZSBmaXJzdCB2YWx1ZVxuXG4gIHJldHVybiBiZXN0QXR0cmlidXRlc1swXS5pbmRleCA9PT0gMCA/IFwiXCIuY29uY2F0KGRlZmF1bHRWYWx1ZSwgXCIgKFwiKS5jb25jYXQoaGlnaGxpZ2h0ZWRWYWx1ZXNbYmVzdEF0dHJpYnV0ZXNbMV0uaW5kZXhdLnZhbHVlLCBcIilcIikgOiBcIlwiLmNvbmNhdChoaWdobGlnaHRlZFZhbHVlc1tiZXN0QXR0cmlidXRlc1swXS5pbmRleF0udmFsdWUsIFwiIChcIikuY29uY2F0KGRlZmF1bHRWYWx1ZSwgXCIpXCIpO1xufVxuXG5mdW5jdGlvbiBnZXRCZXN0UG9zdGNvZGUocG9zdGNvZGVzLCBoaWdobGlnaHRlZFBvc3Rjb2Rlcykge1xuICB2YXIgZGVmYXVsdFZhbHVlID0gaGlnaGxpZ2h0ZWRQb3N0Y29kZXNbMF0udmFsdWU7IC8vIGNvbGxlY3QgYWxsIG90aGVyIG1hdGNoZXNcblxuICB2YXIgYmVzdEF0dHJpYnV0ZXMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGhpZ2hsaWdodGVkUG9zdGNvZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGhpZ2hsaWdodGVkUG9zdGNvZGVzW2ldLm1hdGNoTGV2ZWwgIT09ICdub25lJykge1xuICAgICAgYmVzdEF0dHJpYnV0ZXMucHVzaCh7XG4gICAgICAgIGluZGV4OiBpLFxuICAgICAgICB3b3JkczogaGlnaGxpZ2h0ZWRQb3N0Y29kZXNbaV0ubWF0Y2hlZFdvcmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0gLy8gbm8gbWF0Y2hlcyBpbiB0aGlzIGF0dHJpYnV0ZSwgcmV0cmlldmUgZmlyc3QgdmFsdWVcblxuXG4gIGlmIChiZXN0QXR0cmlidXRlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9zdGNvZGU6IHBvc3Rjb2Rlc1swXSxcbiAgICAgIGhpZ2hsaWdodGVkUG9zdGNvZGU6IGRlZmF1bHRWYWx1ZVxuICAgIH07XG4gIH0gLy8gc29ydCB0aGUgbWF0Y2hlcyBieSBgZGVzYyh3b3JkcylgXG5cblxuICBiZXN0QXR0cmlidXRlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgaWYgKGEud29yZHMgPiBiLndvcmRzKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIGlmIChhLndvcmRzIDwgYi53b3Jkcykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGEuaW5kZXggLSBiLmluZGV4O1xuICB9KTtcbiAgdmFyIHBvc3Rjb2RlID0gcG9zdGNvZGVzW2Jlc3RBdHRyaWJ1dGVzWzBdLmluZGV4XTtcbiAgcmV0dXJuIHtcbiAgICBwb3N0Y29kZTogcG9zdGNvZGUsXG4gICAgaGlnaGxpZ2h0ZWRQb3N0Y29kZTogaGlnaGxpZ2h0ZWRQb3N0Y29kZXNbYmVzdEF0dHJpYnV0ZXNbMF0uaW5kZXhdLnZhbHVlXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhpdChfcmVmKSB7XG4gIHZhciBmb3JtYXRJbnB1dFZhbHVlID0gX3JlZi5mb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgaGl0ID0gX3JlZi5oaXQsXG4gICAgICBoaXRJbmRleCA9IF9yZWYuaGl0SW5kZXgsXG4gICAgICBxdWVyeSA9IF9yZWYucXVlcnksXG4gICAgICByYXdBbnN3ZXIgPSBfcmVmLnJhd0Fuc3dlcjtcblxuICB0cnkge1xuICAgIHZhciBuYW1lID0gaGl0LmxvY2FsZV9uYW1lc1swXTtcbiAgICB2YXIgY291bnRyeSA9IGhpdC5jb3VudHJ5O1xuICAgIHZhciBhZG1pbmlzdHJhdGl2ZSA9IGhpdC5hZG1pbmlzdHJhdGl2ZSAmJiBoaXQuYWRtaW5pc3RyYXRpdmVbMF0gIT09IG5hbWUgPyBoaXQuYWRtaW5pc3RyYXRpdmVbMF0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIGNpdHkgPSBoaXQuY2l0eSAmJiBoaXQuY2l0eVswXSAhPT0gbmFtZSA/IGhpdC5jaXR5WzBdIDogdW5kZWZpbmVkO1xuICAgIHZhciBzdWJ1cmIgPSBoaXQuc3VidXJiICYmIGhpdC5zdWJ1cmJbMF0gIT09IG5hbWUgPyBoaXQuc3VidXJiWzBdIDogdW5kZWZpbmVkO1xuICAgIHZhciBjb3VudHkgPSBoaXQuY291bnR5ICYmIGhpdC5jb3VudHlbMF0gIT09IG5hbWUgPyBoaXQuY291bnR5WzBdIDogdW5kZWZpbmVkO1xuXG4gICAgdmFyIF9yZWYyID0gaGl0LnBvc3Rjb2RlICYmIGhpdC5wb3N0Y29kZS5sZW5ndGggPyBnZXRCZXN0UG9zdGNvZGUoaGl0LnBvc3Rjb2RlLCBoaXQuX2hpZ2hsaWdodFJlc3VsdC5wb3N0Y29kZSkgOiB7XG4gICAgICBwb3N0Y29kZTogdW5kZWZpbmVkLFxuICAgICAgaGlnaGxpZ2h0ZWRQb3N0Y29kZTogdW5kZWZpbmVkXG4gICAgfSxcbiAgICAgICAgcG9zdGNvZGUgPSBfcmVmMi5wb3N0Y29kZSxcbiAgICAgICAgaGlnaGxpZ2h0ZWRQb3N0Y29kZSA9IF9yZWYyLmhpZ2hsaWdodGVkUG9zdGNvZGU7XG5cbiAgICB2YXIgaGlnaGxpZ2h0ID0ge1xuICAgICAgbmFtZTogZ2V0QmVzdEhpZ2hsaWdodGVkRm9ybShoaXQuX2hpZ2hsaWdodFJlc3VsdC5sb2NhbGVfbmFtZXMpLFxuICAgICAgY2l0eTogY2l0eSA/IGdldEJlc3RIaWdobGlnaHRlZEZvcm0oaGl0Ll9oaWdobGlnaHRSZXN1bHQuY2l0eSkgOiB1bmRlZmluZWQsXG4gICAgICBhZG1pbmlzdHJhdGl2ZTogYWRtaW5pc3RyYXRpdmUgPyBnZXRCZXN0SGlnaGxpZ2h0ZWRGb3JtKGhpdC5faGlnaGxpZ2h0UmVzdWx0LmFkbWluaXN0cmF0aXZlKSA6IHVuZGVmaW5lZCxcbiAgICAgIGNvdW50cnk6IGNvdW50cnkgPyBoaXQuX2hpZ2hsaWdodFJlc3VsdC5jb3VudHJ5LnZhbHVlIDogdW5kZWZpbmVkLFxuICAgICAgc3VidXJiOiBzdWJ1cmIgPyBnZXRCZXN0SGlnaGxpZ2h0ZWRGb3JtKGhpdC5faGlnaGxpZ2h0UmVzdWx0LnN1YnVyYikgOiB1bmRlZmluZWQsXG4gICAgICBjb3VudHk6IGNvdW50eSA/IGdldEJlc3RIaWdobGlnaHRlZEZvcm0oaGl0Ll9oaWdobGlnaHRSZXN1bHQuY291bnR5KSA6IHVuZGVmaW5lZCxcbiAgICAgIHBvc3Rjb2RlOiBoaWdobGlnaHRlZFBvc3Rjb2RlXG4gICAgfTtcbiAgICB2YXIgc3VnZ2VzdGlvbiA9IHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBhZG1pbmlzdHJhdGl2ZTogYWRtaW5pc3RyYXRpdmUsXG4gICAgICBjb3VudHk6IGNvdW50eSxcbiAgICAgIGNpdHk6IGNpdHksXG4gICAgICBzdWJ1cmI6IHN1YnVyYixcbiAgICAgIGNvdW50cnk6IGNvdW50cnksXG4gICAgICBjb3VudHJ5Q29kZTogKDAsIF9maW5kQ291bnRyeUNvZGVbXCJkZWZhdWx0XCJdKShoaXQuX3RhZ3MpLFxuICAgICAgdHlwZTogKDAsIF9maW5kVHlwZVtcImRlZmF1bHRcIl0pKGhpdC5fdGFncyksXG4gICAgICBsYXRsbmc6IHtcbiAgICAgICAgbGF0OiBoaXQuX2dlb2xvYy5sYXQsXG4gICAgICAgIGxuZzogaGl0Ll9nZW9sb2MubG5nXG4gICAgICB9LFxuICAgICAgcG9zdGNvZGU6IHBvc3Rjb2RlLFxuICAgICAgcG9zdGNvZGVzOiBoaXQucG9zdGNvZGUgJiYgaGl0LnBvc3Rjb2RlLmxlbmd0aCA/IGhpdC5wb3N0Y29kZSA6IHVuZGVmaW5lZFxuICAgIH07IC8vIHRoaXMgaXMgdGhlIHZhbHVlIHRvIHB1dCBpbnNpZGUgdGhlIDxpbnB1dCB2YWx1ZT1cblxuICAgIHZhciB2YWx1ZSA9IGZvcm1hdElucHV0VmFsdWUoc3VnZ2VzdGlvbik7XG4gICAgcmV0dXJuIF9vYmplY3RTcHJlYWQoe30sIHN1Z2dlc3Rpb24sIHtcbiAgICAgIGhpZ2hsaWdodDogaGlnaGxpZ2h0LFxuICAgICAgaGl0OiBoaXQsXG4gICAgICBoaXRJbmRleDogaGl0SW5kZXgsXG4gICAgICBxdWVyeTogcXVlcnksXG4gICAgICByYXdBbnN3ZXI6IHJhd0Fuc3dlcixcbiAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSBvYmplY3QnLCBoaXQpO1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6ICdDb3VsZCBub3QgcGFyc2Ugb2JqZWN0J1xuICAgIH07XG4gIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZm9ybWF0SW5wdXRWYWx1ZTtcblxuZnVuY3Rpb24gZm9ybWF0SW5wdXRWYWx1ZShfcmVmKSB7XG4gIHZhciBhZG1pbmlzdHJhdGl2ZSA9IF9yZWYuYWRtaW5pc3RyYXRpdmUsXG4gICAgICBjaXR5ID0gX3JlZi5jaXR5LFxuICAgICAgY291bnRyeSA9IF9yZWYuY291bnRyeSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICB0eXBlID0gX3JlZi50eXBlO1xuICB2YXIgb3V0ID0gXCJcIi5jb25jYXQobmFtZSkuY29uY2F0KHR5cGUgIT09ICdjb3VudHJ5JyAmJiBjb3VudHJ5ICE9PSB1bmRlZmluZWQgPyAnLCcgOiAnJywgXCJcXG4gXCIpLmNvbmNhdChjaXR5ID8gXCJcIi5jb25jYXQoY2l0eSwgXCIsXCIpIDogJycsIFwiXFxuIFwiKS5jb25jYXQoYWRtaW5pc3RyYXRpdmUgPyBcIlwiLmNvbmNhdChhZG1pbmlzdHJhdGl2ZSwgXCIsXCIpIDogJycsIFwiXFxuIFwiKS5jb25jYXQoY291bnRyeSA/IGNvdW50cnkgOiAnJykucmVwbGFjZSgvXFxzKlxcblxccyovZywgJyAnKS50cmltKCk7XG4gIHJldHVybiBvdXQ7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHBvbHlmaWxsIGZvciBuYXZpZ2F0b3IubGFuZ3VhZ2UgKElFIDw9IDEwKVxuLy8gbm90IHBvbHlmaWxsZWQgYnkgaHR0cHM6Ly9jZG4ucG9seWZpbGwuaW8vdjIvZG9jcy9cbi8vIERlZmluZWQ6IGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RpbWVycy5odG1sI25hdmlnYXRvcmxhbmd1YWdlXG4vLyAgIHdpdGggYWxsb3dhYmxlIHZhbHVlcyBhdCBodHRwOi8vd3d3LmlldGYub3JnL3JmYy9iY3AvYmNwNDcudHh0XG4vLyBOb3RlIHRoYXQgdGhlIEhUTUwgc3BlYyBzdWdnZXN0cyB0aGF0IGFub255bWl6aW5nIHNlcnZpY2VzIHJldHVybiBcImVuLVVTXCIgYnkgZGVmYXVsdCBmb3Jcbi8vICAgdXNlciBwcml2YWN5IChzbyB5b3VyIGFwcCBtYXkgd2lzaCB0byBwcm92aWRlIGEgbWVhbnMgb2YgY2hhbmdpbmcgdGhlIGxvY2FsZSlcbmlmICghKCdsYW5ndWFnZScgaW4gbmF2aWdhdG9yKSkge1xuICBuYXZpZ2F0b3IubGFuZ3VhZ2UgPSAvLyBJRSAxMCBpbiBJRTggbW9kZSBvbiBXaW5kb3dzIDcgdXNlcyB1cHBlci1jYXNlIGluXG4gIC8vIG5hdmlnYXRvci51c2VyTGFuZ3VhZ2UgY291bnRyeSBjb2RlcyBidXQgcGVyXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9tczUzMzA1Mi5hc3B4ICh2aWFcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL21zNTM0NzEzLmFzcHgpLCB0aGV5XG4gIC8vIGFwcGVhciB0byBiZSBpbiBsb3dlciBjYXNlLCBzbyB3ZSBicmluZyB0aGVtIGludG8gaGFybW9ueSB3aXRoIG5hdmlnYXRvci5sYW5ndWFnZS5cbiAgbmF2aWdhdG9yLnVzZXJMYW5ndWFnZSAmJiBuYXZpZ2F0b3IudXNlckxhbmd1YWdlLnJlcGxhY2UoLy1bYS16XXsyfSQvLCBTdHJpbmcucHJvdG90eXBlLnRvVXBwZXJDYXNlKSB8fCAnZW4tVVMnOyAvLyBEZWZhdWx0IGZvciBhbm9ueW1pemluZyBzZXJ2aWNlczogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvdGltZXJzLmh0bWwjbmF2aWdhdG9ybGFuZ3VhZ2Vcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gcGxhY2VzO1xuXG52YXIgX2V2ZW50cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImV2ZW50c1wiKSk7XG5cbnZhciBfYWxnb2xpYXNlYXJjaExpdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJhbGdvbGlhc2VhcmNoL3NyYy9icm93c2VyL2J1aWxkcy9hbGdvbGlhc2VhcmNoTGl0ZVwiKSk7XG5cbnZhciBfYXV0b2NvbXBsZXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiYXV0b2NvbXBsZXRlLmpzXCIpKTtcblxucmVxdWlyZShcIi4vbmF2aWdhdG9yTGFuZ3VhZ2VcIik7XG5cbnZhciBfY3JlYXRlQXV0b2NvbXBsZXRlRGF0YXNldCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vY3JlYXRlQXV0b2NvbXBsZXRlRGF0YXNldFwiKSk7XG5cbnZhciBfaW5zZXJ0Q3NzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiaW5zZXJ0LWNzc1wiKSk7XG5cbnZhciBfZXJyb3JzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9lcnJvcnNcIikpO1xuXG52YXIgX2NyZWF0ZVJldmVyc2VHZW9jb2RpbmdTb3VyY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2NyZWF0ZVJldmVyc2VHZW9jb2RpbmdTb3VyY2VcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShuKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL2NsZWFyLnN2ZycgKi9cbnZhciBjbGVhckljb24gPSBcIjxzdmcgd2lkdGg9XFxcIjEyXFxcIiBoZWlnaHQ9XFxcIjEyXFxcIiB2aWV3Qm94PVxcXCIwIDAgMTIgMTJcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBhdGggZD1cXFwiTS41NjYgMS42OThMMCAxLjEzIDEuMTMyIDBsLjU2NS41NjZMNiA0Ljg2OCAxMC4zMDIuNTY2IDEwLjg2OCAwIDEyIDEuMTMybC0uNTY2LjU2NUw3LjEzMiA2bDQuMzAyIDQuMy41NjYuNTY4TDEwLjg2OCAxMmwtLjU2NS0uNTY2TDYgNy4xMzJsLTQuMyA0LjMwMkwxLjEzIDEyIDAgMTAuODY4bC41NjYtLjU2NUw0Ljg2OCA2IC41NjYgMS42OTh6XFxcIi8+PC9zdmc+XFxuXCI7XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL2FkZHJlc3Muc3ZnJyAqL1xudmFyIHBpbkljb24gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNCAyMFxcXCI+PHBhdGggZD1cXFwiTTcgMEMzLjEzIDAgMCAzLjEzIDAgN2MwIDUuMjUgNyAxMyA3IDEzczctNy43NSA3LTEzYzAtMy44Ny0zLjEzLTctNy03em0wIDkuNUM1LjYyIDkuNSA0LjUgOC4zOCA0LjUgN1M1LjYyIDQuNSA3IDQuNSA5LjUgNS42MiA5LjUgNyA4LjM4IDkuNSA3IDkuNXpcXFwiLz48L3N2Zz5cXG5cIjtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vcGxhY2VzLmNzcycgKi9cbnZhciBjc3MgPSBcIi5hbGdvbGlhLXBsYWNlcyB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmFwLWlucHV0LCAuYXAtaGludCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmctcmlnaHQ6IDM1cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDE2cHg7XFxuICBsaW5lLWhlaWdodDogNDBweDtcXG4gIGhlaWdodDogNDBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNDQ0M7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4uYXAtaW5wdXQ6Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4uYXAtaW5wdXQ6Oi1tcy1jbGVhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uYXAtaW5wdXQ6aG92ZXIgfiAuYXAtaW5wdXQtaWNvbiBzdmcsXFxuLmFwLWlucHV0OmZvY3VzIH4gLmFwLWlucHV0LWljb24gc3ZnLFxcbi5hcC1pbnB1dC1pY29uOmhvdmVyIHN2ZyB7XFxuICBmaWxsOiAjYWFhYWFhO1xcbn1cXG5cXG4uYXAtZHJvcGRvd24tbWVudSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XFxuICBib3gtc2hhZG93OiAwIDFweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAycHggNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgbWFyZ2luLXRvcDogM3B4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLmFwLXN1Z2dlc3Rpb24ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgaGVpZ2h0OiA0NnB4O1xcbiAgbGluZS1oZWlnaHQ6IDQ2cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDE4cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uYXAtc3VnZ2VzdGlvbiBlbSB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuLmFwLWFkZHJlc3Mge1xcbiAgZm9udC1zaXplOiBzbWFsbGVyO1xcbiAgbWFyZ2luLWxlZnQ6IDEycHg7XFxuICBjb2xvcjogI2FhYWFhYTtcXG59XFxuXFxuLmFwLXN1Z2dlc3Rpb24taWNvbiB7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICB3aWR0aDogMTRweDtcXG4gIGhlaWdodDogMjBweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcblxcbi5hcC1zdWdnZXN0aW9uLWljb24gc3ZnIHtcXG4gIGRpc3BsYXk6IGluaGVyaXQ7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC45KSB0cmFuc2xhdGVZKDJweCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45KSB0cmFuc2xhdGVZKDJweCk7XFxuICBmaWxsOiAjY2ZjZmNmO1xcbn1cXG5cXG4uYXAtaW5wdXQtaWNvbiB7XFxuICBib3JkZXI6IDA7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiAxNnB4O1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLmFwLWlucHV0LWljb24uYXAtaWNvbi1waW4ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYXAtaW5wdXQtaWNvbiBzdmcge1xcbiAgZmlsbDogI2NmY2ZjZjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgcmlnaHQ6IDA7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbn1cXG5cXG4uYXAtY3Vyc29yIHtcXG4gIGJhY2tncm91bmQ6ICNlZmVmZWY7XFxufVxcblxcbi5hcC1jdXJzb3IgLmFwLXN1Z2dlc3Rpb24taWNvbiBzdmcge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpIHRyYW5zbGF0ZVkoMnB4KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKSB0cmFuc2xhdGVZKDJweCk7XFxuICBmaWxsOiAjYWFhYWFhO1xcbn1cXG5cXG4uYXAtZm9vdGVyIHtcXG4gIG9wYWNpdHk6IC44O1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICBwYWRkaW5nOiAuNWVtIDFlbSAuNWVtIDA7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsaW5lLWhlaWdodDogMTJweDtcXG59XFxuXFxuLmFwLWZvb3RlciBhIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG4uYXAtZm9vdGVyIGEgc3ZnIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcblxcbi5hcC1mb290ZXI6aG92ZXIge1xcbiAgb3BhY2l0eTogMTtcXG59XFxuXCI7XG4oMCwgX2luc2VydENzc1tcImRlZmF1bHRcIl0pKGNzcywge1xuICBwcmVwZW5kOiB0cnVlXG59KTtcblxudmFyIGFwcGx5QXR0cmlidXRlcyA9IGZ1bmN0aW9uIGFwcGx5QXR0cmlidXRlcyhlbHQsIGF0dHJzKSB7XG4gIE9iamVjdC5lbnRyaWVzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIF9yZWYyID0gX3NsaWNlZFRvQXJyYXkoX3JlZiwgMiksXG4gICAgICAgIG5hbWUgPSBfcmVmMlswXSxcbiAgICAgICAgdmFsdWUgPSBfcmVmMlsxXTtcblxuICAgIGVsdC5zZXRBdHRyaWJ1dGUobmFtZSwgXCJcIi5jb25jYXQodmFsdWUpKTtcbiAgfSk7XG4gIHJldHVybiBlbHQ7XG59O1xuXG5mdW5jdGlvbiBwbGFjZXMob3B0aW9ucykge1xuICB2YXIgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIsXG4gICAgICBzdHlsZSA9IG9wdGlvbnMuc3R5bGUsXG4gICAgICBhY2Nlc3NpYmlsaXR5ID0gb3B0aW9ucy5hY2Nlc3NpYmlsaXR5LFxuICAgICAgX29wdGlvbnMkYXV0b2NvbXBsZXRlID0gb3B0aW9ucy5hdXRvY29tcGxldGVPcHRpb25zLFxuICAgICAgdXNlckF1dG9jb21wbGV0ZU9wdGlvbnMgPSBfb3B0aW9ucyRhdXRvY29tcGxldGUgPT09IHZvaWQgMCA/IHt9IDogX29wdGlvbnMkYXV0b2NvbXBsZXRlOyAvLyBtdWx0aXBsZSBET00gZWxlbWVudHMgdGFyZ2V0ZWRcblxuICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICBpZiAoY29udGFpbmVyLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihfZXJyb3JzW1wiZGVmYXVsdFwiXS5tdWx0aUNvbnRhaW5lcnMpO1xuICAgIH0gLy8gaWYgc2luZ2xlIG5vZGUgTm9kZUxpc3QgcmVjZWl2ZWQsIHJlc29sdmUgdG8gdGhlIGZpcnN0IG9uZVxuXG5cbiAgICByZXR1cm4gcGxhY2VzKF9vYmplY3RTcHJlYWQoe30sIG9wdGlvbnMsIHtcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyWzBdXG4gICAgfSkpO1xuICB9IC8vIGNvbnRhaW5lciBzZW50IGFzIGEgc3RyaW5nLCByZXNvbHZlIGl0IGZvciBtdWx0aXBsZSBET00gZWxlbWVudHMgaXNzdWVcblxuXG4gIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgIHZhciByZXNvbHZlZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGFpbmVyKTtcbiAgICByZXR1cm4gcGxhY2VzKF9vYmplY3RTcHJlYWQoe30sIG9wdGlvbnMsIHtcbiAgICAgIGNvbnRhaW5lcjogcmVzb2x2ZWRDb250YWluZXJcbiAgICB9KSk7XG4gIH0gLy8gaWYgbm90IGFuIDxpbnB1dD4sIGVycm9yXG5cblxuICBpZiAoIShjb250YWluZXIgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihfZXJyb3JzW1wiZGVmYXVsdFwiXS5iYWRDb250YWluZXIpO1xuICB9XG5cbiAgdmFyIHBsYWNlc0luc3RhbmNlID0gbmV3IF9ldmVudHNbXCJkZWZhdWx0XCJdKCk7XG4gIHZhciBwcmVmaXggPSBcImFwXCIuY29uY2F0KHN0eWxlID09PSBmYWxzZSA/ICctbm9zdHlsZScgOiAnJyk7XG5cbiAgdmFyIGF1dG9jb21wbGV0ZU9wdGlvbnMgPSBfb2JqZWN0U3ByZWFkKHtcbiAgICBhdXRvc2VsZWN0OiB0cnVlLFxuICAgIGhpbnQ6IGZhbHNlLFxuICAgIGNzc0NsYXNzZXM6IHtcbiAgICAgIHJvb3Q6IFwiYWxnb2xpYS1wbGFjZXNcIi5jb25jYXQoc3R5bGUgPT09IGZhbHNlID8gJy1ub3N0eWxlJyA6ICcnKSxcbiAgICAgIHByZWZpeDogcHJlZml4XG4gICAgfSxcbiAgICBkZWJ1ZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCdcbiAgfSwgdXNlckF1dG9jb21wbGV0ZU9wdGlvbnMpO1xuXG4gIHZhciBhdXRvY29tcGxldGVEYXRhc2V0ID0gKDAsIF9jcmVhdGVBdXRvY29tcGxldGVEYXRhc2V0W1wiZGVmYXVsdFwiXSkoX29iamVjdFNwcmVhZCh7fSwgb3B0aW9ucywge1xuICAgIGFsZ29saWFzZWFyY2g6IF9hbGdvbGlhc2VhcmNoTGl0ZVtcImRlZmF1bHRcIl0sXG4gICAgb25IaXRzOiBmdW5jdGlvbiBvbkhpdHMoX3JlZjMpIHtcbiAgICAgIHZhciBoaXRzID0gX3JlZjMuaGl0cyxcbiAgICAgICAgICByYXdBbnN3ZXIgPSBfcmVmMy5yYXdBbnN3ZXIsXG4gICAgICAgICAgcXVlcnkgPSBfcmVmMy5xdWVyeTtcbiAgICAgIHJldHVybiBwbGFjZXNJbnN0YW5jZS5lbWl0KCdzdWdnZXN0aW9ucycsIHtcbiAgICAgICAgcmF3QW5zd2VyOiByYXdBbnN3ZXIsXG4gICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgc3VnZ2VzdGlvbnM6IGhpdHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25FcnJvcjogZnVuY3Rpb24gb25FcnJvcihlKSB7XG4gICAgICByZXR1cm4gcGxhY2VzSW5zdGFuY2UuZW1pdCgnZXJyb3InLCBlKTtcbiAgICB9LFxuICAgIG9uUmF0ZUxpbWl0UmVhY2hlZDogZnVuY3Rpb24gb25SYXRlTGltaXRSZWFjaGVkKCkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IHBsYWNlc0luc3RhbmNlLmxpc3RlbmVyQ291bnQoJ2xpbWl0Jyk7XG5cbiAgICAgIGlmIChsaXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coX2Vycm9yc1tcImRlZmF1bHRcIl0ucmF0ZUxpbWl0UmVhY2hlZCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcGxhY2VzSW5zdGFuY2UuZW1pdCgnbGltaXQnLCB7XG4gICAgICAgIG1lc3NhZ2U6IF9lcnJvcnNbXCJkZWZhdWx0XCJdLnJhdGVMaW1pdFJlYWNoZWRcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25JbnZhbGlkQ3JlZGVudGlhbHM6IGZ1bmN0aW9uIG9uSW52YWxpZENyZWRlbnRpYWxzKCkge1xuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hcHBJZCAmJiBvcHRpb25zLmFwcElkLnN0YXJ0c1dpdGgoJ3BsJykpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihfZXJyb3JzW1wiZGVmYXVsdFwiXS5pbnZhbGlkQ3JlZGVudGlhbHMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoX2Vycm9yc1tcImRlZmF1bHRcIl0uaW52YWxpZEFwcElkKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICB9XG4gICAgfSxcbiAgICBjb250YWluZXI6IHVuZGVmaW5lZFxuICB9KSk7XG4gIHZhciBhdXRvY29tcGxldGVJbnN0YW5jZSA9ICgwLCBfYXV0b2NvbXBsZXRlW1wiZGVmYXVsdFwiXSkoY29udGFpbmVyLCBhdXRvY29tcGxldGVPcHRpb25zLCBhdXRvY29tcGxldGVEYXRhc2V0KTtcbiAgdmFyIGF1dG9jb21wbGV0ZUNvbnRhaW5lciA9IGNvbnRhaW5lci5wYXJlbnROb2RlO1xuICB2YXIgYXV0b2NvbXBsZXRlQ2hhbmdlRXZlbnRzID0gWydzZWxlY3RlZCcsICdhdXRvY29tcGxldGVkJ107XG4gIGF1dG9jb21wbGV0ZUNoYW5nZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICBhdXRvY29tcGxldGVJbnN0YW5jZS5vbihcImF1dG9jb21wbGV0ZTpcIi5jb25jYXQoZXZlbnROYW1lKSwgZnVuY3Rpb24gKF8sIHN1Z2dlc3Rpb24pIHtcbiAgICAgIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgcmF3QW5zd2VyOiBzdWdnZXN0aW9uLnJhd0Fuc3dlcixcbiAgICAgICAgcXVlcnk6IHN1Z2dlc3Rpb24ucXVlcnksXG4gICAgICAgIHN1Z2dlc3Rpb246IHN1Z2dlc3Rpb24sXG4gICAgICAgIHN1Z2dlc3Rpb25JbmRleDogc3VnZ2VzdGlvbi5oaXRJbmRleFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBhdXRvY29tcGxldGVJbnN0YW5jZS5vbignYXV0b2NvbXBsZXRlOmN1cnNvcmNoYW5nZWQnLCBmdW5jdGlvbiAoXywgc3VnZ2VzdGlvbikge1xuICAgIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2N1cnNvcmNoYW5nZWQnLCB7XG4gICAgICByYXdBbnN3ZXI6IHN1Z2dlc3Rpb24ucmF3QW5zd2VyLFxuICAgICAgcXVlcnk6IHN1Z2dlc3Rpb24ucXVlcnksXG4gICAgICBzdWdnZXN0aW9uOiBzdWdnZXN0aW9uLFxuICAgICAgc3VnZ2VzdGlvbkluZGV4OiBzdWdnZXN0aW9uLmhpdEluZGV4XG4gICAgfSk7XG4gIH0pO1xuICB2YXIgY2xlYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgY2xlYXIuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICBjbGVhci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnY2xlYXInKTtcblxuICBpZiAoYWNjZXNzaWJpbGl0eSAmJiBhY2Nlc3NpYmlsaXR5LmNsZWFyQnV0dG9uICYmIGFjY2Vzc2liaWxpdHkuY2xlYXJCdXR0b24gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICBhcHBseUF0dHJpYnV0ZXMoY2xlYXIsIGFjY2Vzc2liaWxpdHkuY2xlYXJCdXR0b24pO1xuICB9XG5cbiAgY2xlYXIuY2xhc3NMaXN0LmFkZChcIlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0LWljb25cIikpO1xuICBjbGVhci5jbGFzc0xpc3QuYWRkKFwiXCIuY29uY2F0KHByZWZpeCwgXCItaWNvbi1jbGVhclwiKSk7XG4gIGNsZWFyLmlubmVySFRNTCA9IGNsZWFySWNvbjtcbiAgYXV0b2NvbXBsZXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsZWFyKTtcbiAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgdmFyIHBpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBwaW4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICBwaW4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ2ZvY3VzJyk7XG5cbiAgaWYgKGFjY2Vzc2liaWxpdHkgJiYgYWNjZXNzaWJpbGl0eS5waW5CdXR0b24gJiYgYWNjZXNzaWJpbGl0eS5waW5CdXR0b24gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICBhcHBseUF0dHJpYnV0ZXMocGluLCBhY2Nlc3NpYmlsaXR5LnBpbkJ1dHRvbik7XG4gIH1cblxuICBwaW4uY2xhc3NMaXN0LmFkZChcIlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0LWljb25cIikpO1xuICBwaW4uY2xhc3NMaXN0LmFkZChcIlwiLmNvbmNhdChwcmVmaXgsIFwiLWljb24tcGluXCIpKTtcbiAgcGluLmlubmVySFRNTCA9IHBpbkljb247XG4gIGF1dG9jb21wbGV0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwaW4pO1xuICBwaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgYXV0b2NvbXBsZXRlRGF0YXNldC5zb3VyY2UuY29uZmlndXJlKHtcbiAgICAgIHVzZURldmljZUxvY2F0aW9uOiB0cnVlXG4gICAgfSk7XG4gICAgYXV0b2NvbXBsZXRlSW5zdGFuY2UuZm9jdXMoKTtcbiAgfSk7XG4gIGNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGF1dG9jb21wbGV0ZUluc3RhbmNlLmF1dG9jb21wbGV0ZS5zZXRWYWwoJycpO1xuICAgIGF1dG9jb21wbGV0ZUluc3RhbmNlLmZvY3VzKCk7XG4gICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBwaW4uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2NsZWFyJyk7XG4gIH0pO1xuICB2YXIgcHJldmlvdXNRdWVyeSA9ICcnO1xuXG4gIHZhciBpbnB1dExpc3RlbmVyID0gZnVuY3Rpb24gaW5wdXRMaXN0ZW5lcigpIHtcbiAgICB2YXIgcXVlcnkgPSBhdXRvY29tcGxldGVJbnN0YW5jZS52YWwoKTtcblxuICAgIGlmIChxdWVyeSA9PT0gJycpIHtcbiAgICAgIHBpbi5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICBjbGVhci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICBpZiAocHJldmlvdXNRdWVyeSAhPT0gcXVlcnkpIHtcbiAgICAgICAgcGxhY2VzSW5zdGFuY2UuZW1pdCgnY2xlYXInKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgcGluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgcHJldmlvdXNRdWVyeSA9IHF1ZXJ5O1xuICB9O1xuXG4gIGF1dG9jb21wbGV0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0XCIpKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0TGlzdGVuZXIpO1xuICB2YXIgYXV0b2NvbXBsZXRlSXNvbW9ycGhpY01ldGhvZHMgPSBbJ29wZW4nLCAnY2xvc2UnXTtcbiAgYXV0b2NvbXBsZXRlSXNvbW9ycGhpY01ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgIHBsYWNlc0luc3RhbmNlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9hdXRvY29tcGxldGVJbnN0YW5jZTtcblxuICAgICAgKF9hdXRvY29tcGxldGVJbnN0YW5jZSA9IGF1dG9jb21wbGV0ZUluc3RhbmNlLmF1dG9jb21wbGV0ZSlbbWV0aG9kTmFtZV0uYXBwbHkoX2F1dG9jb21wbGV0ZUluc3RhbmNlLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIHBsYWNlc0luc3RhbmNlLmdldFZhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXV0b2NvbXBsZXRlSW5zdGFuY2UudmFsKCk7XG4gIH07XG5cbiAgcGxhY2VzSW5zdGFuY2UuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX2F1dG9jb21wbGV0ZUluc3RhbmNlMjtcblxuICAgIGF1dG9jb21wbGV0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0XCIpKS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0TGlzdGVuZXIpO1xuXG4gICAgKF9hdXRvY29tcGxldGVJbnN0YW5jZTIgPSBhdXRvY29tcGxldGVJbnN0YW5jZS5hdXRvY29tcGxldGUpLmRlc3Ryb3kuYXBwbHkoX2F1dG9jb21wbGV0ZUluc3RhbmNlMiwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBwbGFjZXNJbnN0YW5jZS5zZXRWYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9hdXRvY29tcGxldGVJbnN0YW5jZTM7XG5cbiAgICBwcmV2aW91c1F1ZXJ5ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzBdO1xuXG4gICAgaWYgKHByZXZpb3VzUXVlcnkgPT09ICcnKSB7XG4gICAgICBwaW4uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgcGluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgKF9hdXRvY29tcGxldGVJbnN0YW5jZTMgPSBhdXRvY29tcGxldGVJbnN0YW5jZS5hdXRvY29tcGxldGUpLnNldFZhbC5hcHBseShfYXV0b2NvbXBsZXRlSW5zdGFuY2UzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHBsYWNlc0luc3RhbmNlLmF1dG9jb21wbGV0ZSA9IGF1dG9jb21wbGV0ZUluc3RhbmNlO1xuXG4gIHBsYWNlc0luc3RhbmNlLnNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcXVlcnkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICcnO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgYXV0b2NvbXBsZXRlRGF0YXNldC5zb3VyY2UocXVlcnksIHJlc29sdmUpO1xuICAgIH0pO1xuICB9O1xuXG4gIHBsYWNlc0luc3RhbmNlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChjb25maWd1cmF0aW9uKSB7XG4gICAgdmFyIHNhZmVDb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCBjb25maWd1cmF0aW9uKTtcblxuICAgIGRlbGV0ZSBzYWZlQ29uZmlnLm9uSGl0cztcbiAgICBkZWxldGUgc2FmZUNvbmZpZy5vbkVycm9yO1xuICAgIGRlbGV0ZSBzYWZlQ29uZmlnLm9uUmF0ZUxpbWl0UmVhY2hlZDtcbiAgICBkZWxldGUgc2FmZUNvbmZpZy5vbkludmFsaWRDcmVkZW50aWFscztcbiAgICBkZWxldGUgc2FmZUNvbmZpZy50ZW1wbGF0ZXM7XG4gICAgYXV0b2NvbXBsZXRlRGF0YXNldC5zb3VyY2UuY29uZmlndXJlKHNhZmVDb25maWcpO1xuICAgIHJldHVybiBwbGFjZXNJbnN0YW5jZTtcbiAgfTtcblxuICBwbGFjZXNJbnN0YW5jZS5yZXZlcnNlID0gKDAsIF9jcmVhdGVSZXZlcnNlR2VvY29kaW5nU291cmNlW1wiZGVmYXVsdFwiXSkoX29iamVjdFNwcmVhZCh7fSwgb3B0aW9ucywge1xuICAgIGFsZ29saWFzZWFyY2g6IF9hbGdvbGlhc2VhcmNoTGl0ZVtcImRlZmF1bHRcIl0sXG4gICAgZm9ybWF0SW5wdXRWYWx1ZTogKG9wdGlvbnMudGVtcGxhdGVzIHx8IHt9KS52YWx1ZSxcbiAgICBvbkhpdHM6IGZ1bmN0aW9uIG9uSGl0cyhfcmVmNCkge1xuICAgICAgdmFyIGhpdHMgPSBfcmVmNC5oaXRzLFxuICAgICAgICAgIHJhd0Fuc3dlciA9IF9yZWY0LnJhd0Fuc3dlcixcbiAgICAgICAgICBxdWVyeSA9IF9yZWY0LnF1ZXJ5O1xuICAgICAgcmV0dXJuIHBsYWNlc0luc3RhbmNlLmVtaXQoJ3JldmVyc2UnLCB7XG4gICAgICAgIHJhd0Fuc3dlcjogcmF3QW5zd2VyLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHN1Z2dlc3Rpb25zOiBoaXRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uRXJyb3I6IGZ1bmN0aW9uIG9uRXJyb3IoZSkge1xuICAgICAgcmV0dXJuIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2Vycm9yJywgZSk7XG4gICAgfSxcbiAgICBvblJhdGVMaW1pdFJlYWNoZWQ6IGZ1bmN0aW9uIG9uUmF0ZUxpbWl0UmVhY2hlZCgpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBwbGFjZXNJbnN0YW5jZS5saXN0ZW5lckNvdW50KCdsaW1pdCcpO1xuXG4gICAgICBpZiAobGlzdGVuZXJzID09PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKF9lcnJvcnNbXCJkZWZhdWx0XCJdLnJhdGVMaW1pdFJlYWNoZWQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2xpbWl0Jywge1xuICAgICAgICBtZXNzYWdlOiBfZXJyb3JzW1wiZGVmYXVsdFwiXS5yYXRlTGltaXRSZWFjaGVkXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uSW52YWxpZENyZWRlbnRpYWxzOiBmdW5jdGlvbiBvbkludmFsaWRDcmVkZW50aWFscygpIHtcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuYXBwSWQgJiYgb3B0aW9ucy5hcHBJZC5zdGFydHNXaXRoKCdwbCcpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoX2Vycm9yc1tcImRlZmF1bHRcIl0uaW52YWxpZENyZWRlbnRpYWxzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKF9lcnJvcnNbXCJkZWZhdWx0XCJdLmludmFsaWRBcHBJZCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgfVxuICAgIH1cbiAgfSkpO1xuICByZXR1cm4gcGxhY2VzSW5zdGFuY2U7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9ICcxLjE4LjInO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gbWFwKG9ialtrXSwgZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuZnVuY3Rpb24gbWFwICh4cywgZikge1xuICBpZiAoeHMubWFwKSByZXR1cm4geHMubWFwKGYpO1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICByZXMucHVzaChmKHhzW2ldLCBpKSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmRlY29kZSA9IGV4cG9ydHMucGFyc2UgPSByZXF1aXJlKCcuL2RlY29kZScpO1xuZXhwb3J0cy5lbmNvZGUgPSBleHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB2YXIgYXR0cmlidXRlcyA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLm1lZGlhID8gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKS5jb25jYXQob2JqLmNzcywgXCJ9XCIpIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGlhJyk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIGJ0b2EpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlO1xuICB2YXIgdXBkYXRlO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuICAgIHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuICAvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuICB9XG5cbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuZXdMaXN0KSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRvbVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5Eb21bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5Eb20uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgcGxhY2VzIGZyb20gJy4uL25vZGVfbW9kdWxlcy9wbGFjZXMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gYWxnb2xpYSgpIHtcbiAgbGV0IGxhdDtcbiAgbGV0IGxvbjtcbiAgbGV0IGNpdHk7XG4gIGxldCBjb3VudHJ5O1xuXG4gIGNvbnN0IHBsYWNlc0F1dG9jb21wbGV0ZSA9IHBsYWNlcyh7XG4gICAgYXBwSWQ6ICdwbDBPMUdOOE5ZNUgnLFxuICAgIGFwaUtleTogJ2JhNjc1ODMwNWExMTY5N2I1YmIyMGRhNWYyNTQxZDhhJyxcbiAgICBjb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcXVlcnknKSxcbiAgfSkuY29uZmlndXJlKHtcbiAgICB0eXBlOiAnY2l0eScsXG4gICAgYXJvdW5kTGF0TG5nVmlhSVA6IGZhbHNlLFxuICB9KTtcblxuICBwbGFjZXNBdXRvY29tcGxldGUub24oJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgbGF0ID0gZS5zdWdnZXN0aW9uLmxhdGxuZy5sYXQ7XG4gICAgbG9uID0gZS5zdWdnZXN0aW9uLmxhdGxuZy5sbmc7XG4gICAgY2l0eSA9IGUuc3VnZ2VzdGlvbi5uYW1lO1xuICAgIGNvdW50cnkgPSBlLnN1Z2dlc3Rpb24uY291bnRyeTtcbiAgfSk7XG5cbiAgY29uc3QgZ2V0TGF0TG9uID0gKCkgPT4gW2xhdCwgbG9uXTtcbiAgY29uc3QgZ2V0Q2l0eUNvdW50cnkgPSAoKSA9PiBgJHtjaXR5fSwgJHtjb3VudHJ5fWA7XG4gIGNvbnN0IHJlc2V0U2VhcmNoID0gKCkgPT4ge1xuICAgIGxhdCA9ICcnO1xuICAgIGxvbiA9ICcnO1xuICB9O1xuXG4gIHJldHVybiB7IGdldExhdExvbiwgZ2V0Q2l0eUNvdW50cnksIHJlc2V0U2VhcmNoIH07XG59KSgpO1xuIiwiZnVuY3Rpb24gcmVzdWx0QW5pbWF0aW9uKCkge1xuICAkKCcuc2VhcmNoLXN1Ym1pdCwuYXAtaW5wdXQtaWNvbicpLnRvZ2dsZUNsYXNzKCdiYWNrT3V0RG93bicpO1xuICAkKCcjc2VhcmNoLWNvbnRhaW5lciA+IGgxJykudG9nZ2xlQ2xhc3MoJ2JhY2tPdXRVcCcpO1xuICAkKCcjc2VhcmNoLWNvbnRhaW5lcicpLmZhZGVPdXQoKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAkKCcuc2VhcmNoLXN1Ym1pdCwuYXAtaW5wdXQtaWNvbicpLnRvZ2dsZUNsYXNzKCdiYWNrT3V0RG93bicpO1xuICAgICQoJyNzZWFyY2gtY29udGFpbmVyID4gaDEnKS50b2dnbGVDbGFzcygnYmFja091dFVwJyk7XG4gIH0sIDEwMDApO1xufVxuXG5mdW5jdGlvbiBzZWFyY2hBbmltYXRpb24oKSB7XG4gICQoJyNyZXN1bHQtY29udGFpbmVyJykuZmFkZU91dCg0MDApO1xuICAkKCcjc2VhcmNoLWNvbnRhaW5lcicpLmZhZGVJbigxNTAwKTtcbn1cblxuZnVuY3Rpb24gbG9hZGluZ0FuaW1hdGlvbigpIHtcbiAgJCgnI2xvYWRpbmctY29udGFpbmVyJykuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKS5mYWRlSW4oMTIwMCk7XG4gICQoJyNsb2FkaW5nLWNvbnRhaW5lcicpLmZhZGVPdXQoMTIwMCk7XG59XG5cbmV4cG9ydCB7IHJlc3VsdEFuaW1hdGlvbiwgc2VhcmNoQW5pbWF0aW9uLCBsb2FkaW5nQW5pbWF0aW9uIH07XG5cbi8vICQoJy5yZXN1bHQtY29udGFpbmVyJykuc2xpZGVEb3duKDkwMCk7XG4vLyAkKCcjcmVzdWx0LWNvbnRhaW5lcicpLnNob3coKTtcbiIsImltcG9ydCB7IHJlc3VsdEFuaW1hdGlvbiwgc2VhcmNoQW5pbWF0aW9uLCBsb2FkaW5nQW5pbWF0aW9uIH0gZnJvbSAnLi9hbmltYXRpb25BY3RpdmF0ZSc7XG5pbXBvcnQgZ2V0V2VhdGhlckRhdGEgZnJvbSAnLi9yZXRyaWV2ZVdlYXRoZXInO1xuaW1wb3J0IGdldFdlYmNhbSBmcm9tICcuL3JldHJpZXZlV2ViY2FtJztcbmltcG9ydCBhbGdvbGlhIGZyb20gJy4vYWxnb2xpYSc7XG5cbi8vIFdoZW4gcHJlc3NpbmcgZW50ZXIgb24gc2VhcmNoIGJhciBvciBjbGlja2luZyB0aGUgbGV0J3MgZ28gYnV0dG9uXG4kKCcuc2VhcmNoLXN1Ym1pdCcpLm9uKCdjbGljayBrZXlwcmVzcycsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChlLndoaWNoID09PSAxMyB8fCBlLnRhcmdldC50YWdOYW1lID09PSAnQlVUVE9OJykge1xuICAgIGNvbnN0IFtsYXQsIGxvbl0gPSBhbGdvbGlhLmdldExhdExvbigpO1xuICAgICQoJyNsb2NhdGlvbi1uYW1lJykudGV4dChhbGdvbGlhLmdldENpdHlDb3VudHJ5KCkpO1xuICAgICQoJyNzZWFyY2gtcXVlcnknKS52YWwoJycpO1xuXG4gICAgLy8gT25seSBleGVjdXRlIHdoZW4gd2UgaGF2ZSByZXNvbHZlZCBkYXRhXG4gICAgZ2V0V2VhdGhlckRhdGEobGF0LCBsb24pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGFsZ29saWEucmVzZXRTZWFyY2goKTtcbiAgICAgICAgJCgnI3RlbXBlcmF0dXJlJykucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcygnRicpO1xuICAgICAgICBsb2FkaW5nQW5pbWF0aW9uKCk7XG4gICAgICAgIHJlc3VsdEFuaW1hdGlvbigpO1xuICAgICAgICBnZXRXZWJjYW0obGF0LCBsb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICQoJyNyZXN1bHQtY29udGFpbmVyJykuZGVsYXkoMTMwMCkuc2xpZGVEb3duKDE1MDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gIH1cbn0pO1xuXG4kKCcjc2VhcmNoLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgc2VhcmNoQW5pbWF0aW9uKCk7XG59KTtcblxuJCgnI2ZhaHJlbmhlaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHZhbHVlID0gJCgnI3RlbXBlcmF0dXJlJykudGV4dCgpO1xuICBpZiAoJCgnI3RlbXBlcmF0dXJlJykuaGFzQ2xhc3MoJ0MnKSkge1xuICAgIGNvbnN0IGNvbnZlcnRlZFRvQ2VsY2l1cyA9IHZhbHVlICogMS44ICsgMzI7XG4gICAgdG9nZ2xlVGVtcGVyYXR1cmUoY29udmVydGVkVG9DZWxjaXVzKTtcbiAgfVxufSk7XG4kKCcjY2VsY2l1cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgdmFsdWUgPSAkKCcjdGVtcGVyYXR1cmUnKS50ZXh0KCk7XG4gIGlmICgkKCcjdGVtcGVyYXR1cmUnKS5oYXNDbGFzcygnRicpKSB7XG4gICAgY29uc3QgY29udmVydGVkVG9DZWxjaXVzID0gKHZhbHVlIC0gMzIpIC8gMS44O1xuICAgIHRvZ2dsZVRlbXBlcmF0dXJlKGNvbnZlcnRlZFRvQ2VsY2l1cyk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiB0b2dnbGVUZW1wZXJhdHVyZSh2YWx1ZSkge1xuICAkKCcjdGVtcGVyYXR1cmUnKS50ZXh0KHZhbHVlLnRvRml4ZWQoMSkpO1xuICAkKCcjdGVtcGVyYXR1cmUnKS50b2dnbGVDbGFzcygnRicpO1xuICAkKCcjdGVtcGVyYXR1cmUnKS50b2dnbGVDbGFzcygnQycpO1xufVxuIiwidmFyIG1hcCA9IHtcblx0XCIuL2NsZWFyLXNreS5zdmdcIjogXCIuL3NyYy9pbWFnZXMvY2xlYXItc2t5LnN2Z1wiLFxuXHRcIi4vY2xvdWQuc3ZnXCI6IFwiLi9zcmMvaW1hZ2VzL2Nsb3VkLnN2Z1wiLFxuXHRcIi4vaGF6ZS5zdmdcIjogXCIuL3NyYy9pbWFnZXMvaGF6ZS5zdmdcIixcblx0XCIuL2xvYWRpbmcuc3ZnXCI6IFwiLi9zcmMvaW1hZ2VzL2xvYWRpbmcuc3ZnXCIsXG5cdFwiLi9taXN0LnN2Z1wiOiBcIi4vc3JjL2ltYWdlcy9taXN0LnN2Z1wiLFxuXHRcIi4vcmFpbi5zdmdcIjogXCIuL3NyYy9pbWFnZXMvcmFpbi5zdmdcIixcblx0XCIuL3NlYXJjaC5zdmdcIjogXCIuL3NyYy9pbWFnZXMvc2VhcmNoLnN2Z1wiLFxuXHRcIi4vc25vdy5zdmdcIjogXCIuL3NyYy9pbWFnZXMvc25vdy5zdmdcIixcblx0XCIuL3RlbXAuc3ZnXCI6IFwiLi9zcmMvaW1hZ2VzL3RlbXAuc3ZnXCIsXG5cdFwiLi90aHVuZGVyc3Rvcm0uc3ZnXCI6IFwiLi9zcmMvaW1hZ2VzL3RodW5kZXJzdG9ybS5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvaW1hZ2VzIHN5bmMgcmVjdXJzaXZlIFxcXFwuc3ZnJFwiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvY2xlYXItc2t5LnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvY2xvdWQuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltYWdlcy9oYXplLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvbG9hZGluZy5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1hZ2VzL21pc3Quc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltYWdlcy9yYWluLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvc2VhcmNoLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvc25vdy5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1hZ2VzL3RlbXAuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltYWdlcy90aHVuZGVyc3Rvcm0uc3ZnXCI7IiwiaW1wb3J0ICdub3JtYWxpemUuY3NzJztcbmltcG9ydCAnLi9zdHlsZXMvc3R5bGUuY3NzJztcbmltcG9ydCAnLi9ldmVudExpc3RlbmVycyc7XG4vLyBpbXBvcnQgYWxsIGltYWdlc1xuY29uc3QgcmVxU3ZncyA9IHJlcXVpcmUuY29udGV4dCgnLi9pbWFnZXMnLCB0cnVlLCAvXFwuc3ZnJC8pO1xuXG4iLCJhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsYXQsIGxvbikge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7bGF0fSZsb249JHtsb259JnVuaXRzPWltcGVyaWFsJmFwcGlkPWYyZTUzNDg5ZTM2YWZmZWM5ZjViODVhYWZjMzlhNWIxYFxuICAgICk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBcbiAgICAkKCcjdGVtcGVyYXR1cmUnKS5odG1sKGAke2RhdGEubWFpbi50ZW1wLnRvRml4ZWQoMSl9YCk7XG4gICAgY29uc3Qgd2VhdGhlckNvbmRpdGlvbiA9IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICAkKCcjY29uZGl0aW9uJykudGV4dChjYXBpdGFsaXplRmlyc3RMZXR0ZXIod2VhdGhlckNvbmRpdGlvbikpO1xuICAgICQoJyNjb25kaXRpb24taW1nJykuYXR0cignc3JjJywgYC4vaW1hZ2VzLyR7YXNzaWduSW1hZ2Uod2VhdGhlckNvbmRpdGlvbil9LnN2Z2ApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBhbGVydCgnSW52YWxpZCBjaXR5ISBQbGVhc2UgZW50ZXIgYSB2YWxpZCBjaXR5IScpO1xuICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgc3RhdHVzOiR7ZXJyLnN0YXR1c31gKTtcbiAgfVxufVxuXG4vLyBGb3Igc2l0dWF0aW9ucyBsaWtlICdzY2F0dGVyZWQgY2xvdWRzJ1xuZnVuY3Rpb24gYXNzaWduSW1hZ2Uod2VhdGhlckNvbmRpdGlvbikge1xuICBpZiAod2VhdGhlckNvbmRpdGlvbi5pbmNsdWRlcygnY2xvdWQnKSkgcmV0dXJuICdjbG91ZCc7XG4gIGlmICh3ZWF0aGVyQ29uZGl0aW9uLmluY2x1ZGVzKCdyYWluJykpIHJldHVybiAncmFpbic7XG4gIGlmICh3ZWF0aGVyQ29uZGl0aW9uLmluY2x1ZGVzKCdjbGVhcicpKSByZXR1cm4gJ2NsZWFyLXNreSc7XG4gIHJldHVybiB3ZWF0aGVyQ29uZGl0aW9uO1xufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFdlYXRoZXJEYXRhO1xuIiwiYXN5bmMgZnVuY3Rpb24gZ2V0V2ViY2FtKGxhdCwgbG9uKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS53aW5keS5jb20vYXBpL3dlYmNhbXMvdjIvbGlzdC9uZWFyYnk9JHtsYXR9LCR7bG9ufSw1P3Nob3c9d2ViY2Ftczpsb2NhdGlvbixwbGF5ZXIma2V5PXhlYmFiNGZpaTl3bGZTeXVrNG4zNjNhRk5QbjRmYW1sYFxuICAgICk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIGNvbnN0IHdlYmNhbXMgPSBkYXRhLnJlc3VsdC53ZWJjYW1zO1xuICAgIGNvbnN0IHdlYmNhbUxpbmsgPSB3ZWJjYW1zLmxlbmd0aCA+IDAgPyB3ZWJjYW1zWzBdLnBsYXllci5kYXkuZW1iZWQgOiAnJztcbiAgICAkKCdpZnJhbWUnKS5hdHRyKCdzcmMnLCB3ZWJjYW1MaW5rKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgc3RhdHVzOiR7ZXJyLnN0YXR1c31gKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRXZWJjYW07XG4iLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiXSwic291cmNlUm9vdCI6IiJ9