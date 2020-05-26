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
exports.push([module.i, "@-webkit-keyframes backPulse {\n  from {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  to {\n    -webkit-transform: scale(1.2);\n            transform: scale(1.2);\n  }\n}\n@keyframes backPulse {\n  from {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  to {\n    -webkit-transform: scale(1.2);\n            transform: scale(1.2);\n  }\n}\n\n@-webkit-keyframes backOutDown {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  20% {\n    -webkit-transform: translate(0px) scale(0.7);\n            transform: translate(0px) scale(0.7);\n    opacity: 0.7;\n  }\n  100% {\n    -webkit-transform: translateY(700px) scale(0.7);\n            transform: translateY(700px) scale(0.7);\n  }\n}\n\n@keyframes backOutDown {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  20% {\n    -webkit-transform: translate(0px) scale(0.7);\n            transform: translate(0px) scale(0.7);\n    opacity: 0.7;\n  }\n  100% {\n    -webkit-transform: translateY(700px) scale(0.7);\n            transform: translateY(700px) scale(0.7);\n  }\n}\n\n@-webkit-keyframes backOutUp {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  20% {\n    -webkit-transform: translate(0px) scale(0.7);\n            transform: translate(0px) scale(0.7);\n    opacity: 0.7;\n  }\n  100% {\n    -webkit-transform: translateY(-700px) scale(0.7);\n            transform: translateY(-700px) scale(0.7);\n  }\n}\n\n@keyframes backOutUp {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n  }\n  20% {\n    -webkit-transform: translate(0px) scale(0.7);\n            transform: translate(0px) scale(0.7);\n    opacity: 0.7;\n  }\n  100% {\n    -webkit-transform: translateY(-700px) scale(0.7);\n            transform: translateY(-700px) scale(0.7);\n  }\n}\n\nbody {\n  background: black;\n  color: #fbaf00;\n  font-family: \"Acme\", sans-serif;\n  overflow: hidden;\n}\n\n#loading-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100vh;\n  display: none;\n}\n\n#loading-container img {\n  width: 10vw;\n}\n\n#search-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100vh;\n  min-width: 700px;\n}\n\n#search-container h1 {\n  line-height: 108px;\n  font-weight: 700;\n  font-size: 4.6vh;\n  color: #997f41;\n}\n\n#search-container .search-btn {\n  font-size: 1.5em;\n  border-radius: 5px;\n  background-color: transparent;\n  outline: none;\n  color: #997f41;\n  border: 1px solid #997f41;\n}\n\n#search-container .search-btn:hover {\n  -webkit-animation-duration: 0.5s;\n          animation-duration: 0.5s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-name: backPulse;\n          animation-name: backPulse;\n  -webkit-animation-direction: alternate;\n          animation-direction: alternate;\n  -webkit-animation-timing-function: ease;\n          animation-timing-function: ease;\n  -webkit-animation-delay: 0;\n          animation-delay: 0;\n  cursor: pointer;\n}\n\n#search-container #search-query,\n#search-container .ap-name {\n  color: #3a7ca5;\n}\n\n.backOutUp {\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n  -webkit-animation-iteration-count: 1;\n          animation-iteration-count: 1;\n  -webkit-animation-name: backOutUp;\n          animation-name: backOutUp;\n  -webkit-animation-direction: normal;\n          animation-direction: normal;\n  -webkit-animation-timing-function: ease;\n          animation-timing-function: ease;\n  -webkit-animation-delay: 0.3;\n          animation-delay: 0.3;\n}\n\n.backOutDown {\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n  -webkit-animation-iteration-count: 1;\n          animation-iteration-count: 1;\n  -webkit-animation-name: backOutDown;\n          animation-name: backOutDown;\n  -webkit-animation-direction: normal;\n          animation-direction: normal;\n  -webkit-animation-timing-function: ease;\n          animation-timing-function: ease;\n  -webkit-animation-delay: 0.3;\n          animation-delay: 0.3;\n  pointer-events: none;\n}\n\n.algolia-places {\n  width: 50%;\n  margin-bottom: 20px;\n}\n\nbutton.ap-input-icon:nth-child(5) {\n  display: none;\n}\n\n#result-container {\n  display: none;\n}\n\n#result-container #location-name {\n  height: 10vh;\n  text-align: center;\n}\n\n#result-container #weather-container {\n  height: 45vh;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n#result-container #temperature-container {\n  background: #0c554e;\n  height: 60%;\n  width: 25vw;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 10px;\n  text-align: center;\n  border: 1px solid white;\n  border-radius: 10px;\n}\n\n#result-container #condition-container {\n  background: #0c554e;\n  height: 60%;\n  width: 25vw;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 10px;\n  text-align: center;\n  border: 1px solid white;\n  border-radius: 10px;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n#result-container #change-temp {\n  font-size: 2.3vw;\n}\n\n#result-container #change-temp button {\n  border-radius: 5px;\n  background: #6031a4;\n  color: #ffb300;\n  width: 40%;\n  border: 2px solid black;\n  cursor: pointer;\n}\n\n#result-container #change-temp button:hover {\n  opacity: 0.8;\n  border: 2px solid white;\n}\n\n#result-container #change-temp button:active {\n  opacity: 0.5;\n}\n\n#result-container #temp-info-container {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: space-evenly;\n      -ms-flex-pack: space-evenly;\n          justify-content: space-evenly;\n  width: 50%;\n}\n\n#result-container #condition {\n  font-size: 3.37vw;\n  margin: 0;\n}\n\n#result-container #temperature {\n  font-size: 4.6vw;\n  margin: 0;\n  z-index: 1;\n}\n\n#result-container #search-btn {\n  cursor: pointer;\n  border-radius: 50%;\n  -webkit-transition: all 0.2s linear;\n  transition: all 0.2s linear;\n  max-height: 200px;\n}\n\n#result-container #search-btn:hover {\n  -webkit-box-shadow: 0 0 15px #78b9eb;\n          box-shadow: 0 0 15px #78b9eb;\n}\n\n#result-container iframe {\n  height: 35vh;\n  width: 50%;\n  margin: auto;\n  display: block;\n  border-radius: 15px;\n}\n\n#result-container img[src$='.svg'] {\n  height: 70%;\n  max-width: 50%;\n}\n\n.F::after {\n  content: '\\2109';\n}\n\n.C::after {\n  content: '\\2103';\n}", ""]);
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

  placesAutocomplete.on('clear', function () {
    $('#search-query').textContent = 'none';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9BbGdvbGlhU2VhcmNoQ29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvSW5kZXhDb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9icm93c2VyL2J1aWxkcy9hbGdvbGlhc2VhcmNoTGl0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvYnJvd3Nlci9jcmVhdGVBbGdvbGlhc2VhcmNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9icm93c2VyL2lubGluZS1oZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9icm93c2VyL2pzb25wLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FsZ29saWFzZWFyY2gvc3JjL2J1aWxkU2VhcmNoTWV0aG9kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9jbG9uZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvZGVwcmVjYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9kZXByZWNhdGVkTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvZXJyb3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9leGl0UHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvbWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvb21pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvcGxhY2VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbGdvbGlhc2VhcmNoL3NyYy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWxnb2xpYXNlYXJjaC9zcmMvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvc3JjL2F1dG9jb21wbGV0ZS9jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2RhdGFzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2Ryb3Bkb3duLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvc3JjL2F1dG9jb21wbGV0ZS9ldmVudF9idXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2V2ZW50X2VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvYXV0b2NvbXBsZXRlL2lucHV0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvc3JjL2F1dG9jb21wbGV0ZS90eXBlYWhlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvY29tbW9uL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9jb21tb24vcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3NyYy9jb21tb24vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvc291cmNlcy9oaXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdXRvY29tcGxldGUuanMvc3JjL3NvdXJjZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvc291cmNlcy9wb3B1bGFySW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy9zcmMvc3RhbmRhbG9uZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXV0b2NvbXBsZXRlLmpzL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F1dG9jb21wbGV0ZS5qcy96ZXB0by5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvcmVhY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsb2JhbC93aW5kb3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvbWVzc2FnZUNoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvbXV0YXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvbmV4dFRpY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvc3RhdGVDaGFuZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ltbWVkaWF0ZS9saWIvdGltZW91dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5zZXJ0LWNzcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzPzM0MmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaXNBcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9jb25maWd1cmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvY3JlYXRlQXV0b2NvbXBsZXRlRGF0YXNldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9jcmVhdGVBdXRvY29tcGxldGVTb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvY3JlYXRlUmV2ZXJzZUdlb2NvZGluZ1NvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9kZWZhdWx0VGVtcGxhdGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wbGFjZXMuanMvc3JjL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9maW5kQ291bnRyeUNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvZmluZFR5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvZm9ybWF0RHJvcGRvd25WYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9mb3JtYXRIaXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvZm9ybWF0SW5wdXRWYWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9uYXZpZ2F0b3JMYW5ndWFnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGxhY2VzLmpzL3NyYy9wbGFjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BsYWNlcy5qcy9zcmMvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZGVjb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FsZ29saWEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbkFjdGl2YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzIHN5bmMgXFwuc3ZnJCIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2NsZWFyLXNreS5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9jbG91ZC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9oYXplLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2xvYWRpbmcuc3ZnIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvbWlzdC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9yYWluLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL3NlYXJjaC5zdmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9zbm93LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL3RlbXAuc3ZnIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvdGh1bmRlcnN0b3JtLnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JldHJpZXZlV2VhdGhlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmV0cmlldmVXZWJjYW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3M/ZmY5NCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsbUJBQU8sQ0FBQyw2RUFBUztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQU8sQ0FBQyxpRUFBSTs7QUFFL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZ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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG1CQUFPLENBQUMsNkVBQU87OztBQUdwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUMsbUNBQW1DO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE9BQU87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QUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQU8sQ0FBQyw2RUFBTztBQUMxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDM09hOztBQUViOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyx3RUFBd0I7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNkYTs7QUFFYjs7QUFFQSxhQUFhLG1CQUFPLENBQUMsNkRBQVc7O0FBRWhDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0hBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQywrREFBYTs7QUFFbEM7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFNBQVM7QUFDdEIsY0FBYyxrQkFBa0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssa0RBQWtEO0FBQ3ZEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNOYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxtQkFBTyxDQUFDLDZEQUFVOztBQUVqQztBQUNBLGdCQUFnQixtQkFBTyxDQUFDLGdEQUFTOztBQUVqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDTkEsY0FBYyxtQkFBTyxDQUFDLGdEQUFTOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7QUNSQSxjQUFjLG1CQUFPLENBQUMsZ0RBQVM7O0FBRS9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekMsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQSxhQUFhLG1CQUFPLENBQUMsd0RBQWE7QUFDbEMsZ0JBQWdCLG1CQUFPLENBQUMsZ0RBQVM7O0FBRWpDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7Ozs7Ozs7QUNiQTs7QUFFQSxVQUFVLG1CQUFPLENBQUMsZ0VBQWlCO0FBQ25DLHdCQUF3QixtQkFBTyxDQUFDLHFGQUF3Qjs7QUFFeEQ7QUFDQTtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLDZEQUFZOztBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaERBLDBEQUFZLG1CQUFPLENBQUMsNkVBQU87QUFDM0I7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3JGYTs7QUFFYjs7Ozs7Ozs7Ozs7OztBQ0ZhOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLGlGQUFtQjs7Ozs7Ozs7Ozs7OztBQ0YvQjs7QUFFYixRQUFRLG1CQUFPLENBQUMsOEVBQW9COztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsYUFBYTtBQUNiLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekMsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGtCQUFrQjtBQUN4Qzs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2hHYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxtQkFBTyxDQUFDLDhFQUFvQjtBQUNwQyxVQUFVLG1CQUFPLENBQUMsMEVBQWtCO0FBQ3BDLFdBQVcsbUJBQU8sQ0FBQywwRUFBVztBQUM5QixVQUFVLG1CQUFPLENBQUMsd0VBQVU7QUFDNUIsbUJBQW1CLG1CQUFPLENBQUMsNEZBQW9COztBQUUvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsdUJBQXVCLHFDQUFxQztBQUM1RCw2Q0FBNkMsd0NBQXdDO0FBQ3JGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLDRCQUE0QjtBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQSxvRUFBb0U7QUFDcEU7QUFDQSx3Q0FBd0MsaURBQWlELEVBQUU7O0FBRTNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSx1Q0FBdUM7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSx1Q0FBdUM7QUFDdEQ7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNsVGE7O0FBRWIsUUFBUSxtQkFBTyxDQUFDLDhFQUFvQjtBQUNwQyxVQUFVLG1CQUFPLENBQUMsMEVBQWtCO0FBQ3BDLG1CQUFtQixtQkFBTyxDQUFDLDRGQUFvQjtBQUMvQyxjQUFjLG1CQUFPLENBQUMsZ0ZBQWM7QUFDcEMsVUFBVSxtQkFBTyxDQUFDLHdFQUFVOztBQUU1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFDQUFxQztBQUM1RCw2Q0FBNkMsd0NBQXdDO0FBQ3JGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDLHFDQUFxQztBQUM1RTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ3pZYTs7QUFFYjs7QUFFQSxRQUFRLG1CQUFPLENBQUMsOEVBQW9CO0FBQ3BDLFVBQVUsbUJBQU8sQ0FBQywwRUFBa0I7O0FBRXBDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7O0FDaENhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLHdEQUFXO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5RUFBeUU7QUFDekU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQ0FBMkMsdUJBQXVCO0FBQ2xFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdEQUFnRDtBQUNoRTs7Ozs7Ozs7Ozs7OztBQ3JHYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1JhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLG1CQUFPLENBQUMsOEVBQW9CO0FBQ3BDLFVBQVUsbUJBQU8sQ0FBQywwRUFBa0I7QUFDcEMsbUJBQW1CLG1CQUFPLENBQUMsNEZBQW9COztBQUUvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0QsR0FBRztBQUN6RDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNwVmE7O0FBRWI7O0FBRUEsUUFBUSxtQkFBTyxDQUFDLDhFQUFvQjtBQUNwQyxVQUFVLG1CQUFPLENBQUMsMEVBQWtCO0FBQ3BDLGVBQWUsbUJBQU8sQ0FBQyxvRkFBZ0I7QUFDdkMsWUFBWSxtQkFBTyxDQUFDLDRFQUFZO0FBQ2hDLGVBQWUsbUJBQU8sQ0FBQyxrRkFBZTtBQUN0QyxXQUFXLG1CQUFPLENBQUMsMEVBQVc7QUFDOUIsVUFBVSxtQkFBTyxDQUFDLHdFQUFVOztBQUU1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLCtCQUErQixxQ0FBcUM7QUFDcEUsNkNBQTZDLHdDQUF3QztBQUNyRjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsZ0JBQWdCLEVBQUU7QUFDNUM7QUFDQSxHQUFHOztBQUVIO0FBQ0EseUNBQXlDLHFCQUFxQixFQUFFOztBQUVoRSw4Q0FBOEMsV0FBVzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLDJCQUEyQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0Msc0NBQXNDO0FBQ3JGOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRCQUE0QjtBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLDZDQUE2QztBQUNoRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE1BQU07QUFDaEIsVUFBVSxPQUFPO0FBQ2pCO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsTUFBTTtBQUNoQjtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLHFCQUFxQixZQUFZO0FBQ2pDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxJQUFJO0FBQ2Q7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsVUFBVSxTQUFTO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxVQUFVLFNBQVM7QUFDbkIsVUFBVSxTQUFTO0FBQ25CO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLFVBQVUsU0FBUztBQUNuQjtBQUNBLFdBQVc7QUFDWDs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQixLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCLGFBQWE7QUFDYjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7OztBQUlEOzs7Ozs7Ozs7Ozs7OztBQ3JwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSx5QkFBeUI7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNWJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BCQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDWmE7QUFDYjtBQUNBLEVBQUUsbUJBQU8sQ0FBQyw0REFBWTtBQUN0QixFQUFFLG1CQUFPLENBQUMsK0RBQWU7QUFDekIsRUFBRSxtQkFBTyxDQUFDLHdFQUFrQjtBQUM1QixFQUFFLG1CQUFPLENBQUMsa0VBQWU7QUFDekIsRUFBRSxtQkFBTyxDQUFDLDBEQUFXO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvRkEsOENBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7O0FDakJBLDhDQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7OztBQ3JCQSwrQ0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDVkEsOENBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7Ozs7QUN2QmE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFCQSxvQkFBb0I7QUFDcEIsdUJBQXVCLGdCQUFnQjs7QUFFdkM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDLGlDQUFpQzs7QUFFeEU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pEQSxVQUFVLG1CQUFPLENBQUMsc0lBQTJEO0FBQzdFLDBCQUEwQixtQkFBTyxDQUFDLG9JQUE2Qzs7QUFFL0U7O0FBRUE7QUFDQSwwQkFBMEIsUUFBUztBQUNuQzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7O0FBSUEsc0M7Ozs7Ozs7Ozs7OztBQ2xCYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLGdFQUFlLEVBQUU7QUFDdkM7QUFDQSwwQ0FBMEMsaUJBQWlCO0FBQzNELHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxjQUFjO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0Isc0JBQXNCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pIYTs7QUFFYjtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxnRUFBZTs7QUFFcEM7QUFDQSw0Q0FBNEMsb0JBQW9CLEVBQUUsR0FBRyxtQkFBTyxDQUFDLHNFQUFrQjs7QUFFL0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQy9CYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hCYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsbUJBQU8sQ0FBQyw0REFBYzs7QUFFbkMsY0FBYyxtQkFBTyxDQUFDLDhEQUFlLEVBQUU7OztBQUd2QztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNmYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLDBDQUEwQyxnQ0FBZ0Msb0NBQW9DLG9EQUFvRCw4REFBOEQsZ0VBQWdFLEVBQUUsRUFBRSxnQ0FBZ0MsRUFBRSxhQUFhOztBQUVuVixnQ0FBZ0MsZ0JBQWdCLHNCQUFzQixPQUFPLHVEQUF1RCxhQUFhLHVEQUF1RCwyQ0FBMkMsRUFBRSxFQUFFLEVBQUUsNkNBQTZDLDJFQUEyRSxFQUFFLE9BQU8saURBQWlELGtGQUFrRixFQUFFLEVBQUUsRUFBRSxFQUFFLGVBQWU7O0FBRXBoQiwyQ0FBMkMsa0JBQWtCLGtDQUFrQyxxRUFBcUUsRUFBRSxFQUFFLE9BQU8sa0JBQWtCLEVBQUUsWUFBWTs7QUFFL007QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EseUNBQXlDLFlBQVk7QUFDckQsNkNBQTZDLGNBQWM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCOzs7Ozs7Ozs7Ozs7QUNwR2E7O0FBRWI7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQSx1REFBdUQsbUJBQU8sQ0FBQyw0RkFBNEI7O0FBRTNGLCtDQUErQyxtQkFBTyxDQUFDLDRFQUFvQjs7QUFFM0Usc0NBQXNDLHVDQUF1QyxrQkFBa0I7O0FBRS9GLDBDQUEwQyxnQ0FBZ0Msb0NBQW9DLG9EQUFvRCw4REFBOEQsZ0VBQWdFLEVBQUUsRUFBRSxnQ0FBZ0MsRUFBRSxhQUFhOztBQUVuVixnQ0FBZ0MsZ0JBQWdCLHNCQUFzQixPQUFPLHVEQUF1RCxhQUFhLHVEQUF1RCwyQ0FBMkMsRUFBRSxFQUFFLEVBQUUsNkNBQTZDLDJFQUEyRSxFQUFFLE9BQU8saURBQWlELGtGQUFrRixFQUFFLEVBQUUsRUFBRSxFQUFFLGVBQWU7O0FBRXBoQiwyQ0FBMkMsa0JBQWtCLGtDQUFrQyxxRUFBcUUsRUFBRSxFQUFFLE9BQU8sa0JBQWtCLEVBQUUsWUFBWTs7QUFFL007QUFDQSxrQ0FBa0Msa0NBQWtDOztBQUVwRSx5RUFBeUU7QUFDekU7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLHdDQUF3QyxtQkFBTyxDQUFDLG9FQUFhOztBQUU3RCx3Q0FBd0MsbUJBQU8sQ0FBQyw4REFBYTs7QUFFN0Qsc0NBQXNDLG1CQUFPLENBQUMsMERBQVc7O0FBRXpELHNDQUFzQyx1Q0FBdUMsa0JBQWtCOztBQUUvRiwwQ0FBMEMsZ0NBQWdDLG9DQUFvQyxvREFBb0QsOERBQThELGdFQUFnRSxFQUFFLEVBQUUsZ0NBQWdDLEVBQUUsYUFBYTs7QUFFblYsZ0NBQWdDLGdCQUFnQixzQkFBc0IsT0FBTyx1REFBdUQsYUFBYSx1REFBdUQsMkNBQTJDLEVBQUUsRUFBRSxFQUFFLDZDQUE2QywyRUFBMkUsRUFBRSxPQUFPLGlEQUFpRCxrRkFBa0YsRUFBRSxFQUFFLEVBQUUsRUFBRSxlQUFlOztBQUVwaEIsMkNBQTJDLGtCQUFrQixrQ0FBa0MscUVBQXFFLEVBQUUsRUFBRSxPQUFPLGtCQUFrQixFQUFFLFlBQVk7O0FBRS9NO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsNkRBQTZELFlBQVksY0FBYztBQUN2RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDL0lhOztBQUViO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUEsd0NBQXdDLG1CQUFPLENBQUMsb0VBQWE7O0FBRTdELHdDQUF3QyxtQkFBTyxDQUFDLDhEQUFhOztBQUU3RCxzQ0FBc0MsbUJBQU8sQ0FBQywwREFBVzs7QUFFekQsK0NBQStDLG1CQUFPLENBQUMsNEVBQW9COztBQUUzRSxzQ0FBc0MsdUNBQXVDLGtCQUFrQjs7QUFFL0YsMENBQTBDLGdDQUFnQyxvQ0FBb0Msb0RBQW9ELDhEQUE4RCxnRUFBZ0UsRUFBRSxFQUFFLGdDQUFnQyxFQUFFLGFBQWE7O0FBRW5WLGdDQUFnQyxnQkFBZ0Isc0JBQXNCLE9BQU8sdURBQXVELGFBQWEsdURBQXVELDJDQUEyQyxFQUFFLEVBQUUsRUFBRSw2Q0FBNkMsMkVBQTJFLEVBQUUsT0FBTyxpREFBaUQsa0ZBQWtGLEVBQUUsRUFBRSxFQUFFLEVBQUUsZUFBZTs7QUFFcGhCLDJDQUEyQyxrQkFBa0Isa0NBQWtDLHFFQUFxRSxFQUFFLEVBQUUsT0FBTyxrQkFBa0IsRUFBRSxZQUFZOztBQUUvTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnREFBZ0Q7QUFDaEQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSw2REFBNkQsWUFBWSxjQUFjO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw4Qjs7Ozs7Ozs7Ozs7O0FDeklhOztBQUViO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUEsK0NBQStDLG1CQUFPLENBQUMsNEVBQW9COztBQUUzRSxrREFBa0QsbUJBQU8sQ0FBQyxrRkFBdUI7O0FBRWpGLHNDQUFzQyx1Q0FBdUMsa0JBQWtCOztBQUUvRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEI7Ozs7Ozs7Ozs7OztBQ3ZCYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Qjs7Ozs7Ozs7Ozs7O0FDYmE7O0FBRWI7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBLHdCQUF3Qix3QkFBd0I7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2xCYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQzFCYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDaERhOztBQUViO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUEsOENBQThDLG1CQUFPLENBQUMsMEVBQW1COztBQUV6RSx1Q0FBdUMsbUJBQU8sQ0FBQyw0REFBWTs7QUFFM0Qsc0NBQXNDLHVDQUF1QyxrQkFBa0I7O0FBRS9GLDBDQUEwQyxnQ0FBZ0Msb0NBQW9DLG9EQUFvRCw4REFBOEQsZ0VBQWdFLEVBQUUsRUFBRSxnQ0FBZ0MsRUFBRSxhQUFhOztBQUVuVixnQ0FBZ0MsZ0JBQWdCLHNCQUFzQixPQUFPLHVEQUF1RCxhQUFhLHVEQUF1RCwyQ0FBMkMsRUFBRSxFQUFFLEVBQUUsNkNBQTZDLDJFQUEyRSxFQUFFLE9BQU8saURBQWlELGtGQUFrRixFQUFFLEVBQUUsRUFBRSxFQUFFLGVBQWU7O0FBRXBoQiwyQ0FBMkMsa0JBQWtCLGtDQUFrQyxxRUFBcUUsRUFBRSxFQUFFLE9BQU8sa0JBQWtCLEVBQUUsWUFBWTs7QUFFL007QUFDQSxnREFBZ0Q7O0FBRWhEOztBQUVBLGlCQUFpQiw4QkFBOEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxHQUFHLEVBQUU7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRDs7QUFFbkQ7O0FBRUEsaUJBQWlCLGlDQUFpQztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDOUphOztBQUViO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2ZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxFQUFFLDZDQUE2QztBQUNsSCxDOzs7Ozs7Ozs7Ozs7QUNmYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLHFDQUFxQyxtQkFBTyxDQUFDLCtDQUFROztBQUVyRCxnREFBZ0QsbUJBQU8sQ0FBQyxnSUFBb0Q7O0FBRTVHLDJDQUEyQyxtQkFBTyxDQUFDLGdFQUFpQjs7QUFFcEUsbUJBQU8sQ0FBQyw4RUFBcUI7O0FBRTdCLHdEQUF3RCxtQkFBTyxDQUFDLDhGQUE2Qjs7QUFFN0Ysd0NBQXdDLG1CQUFPLENBQUMsc0RBQVk7O0FBRTVELHFDQUFxQyxtQkFBTyxDQUFDLHdEQUFVOztBQUV2RCwyREFBMkQsbUJBQU8sQ0FBQyxvR0FBZ0M7O0FBRW5HLHNDQUFzQyx1Q0FBdUMsa0JBQWtCOztBQUUvRiwwQ0FBMEMsZ0NBQWdDLG9DQUFvQyxvREFBb0QsOERBQThELGdFQUFnRSxFQUFFLEVBQUUsZ0NBQWdDLEVBQUUsYUFBYTs7QUFFblYsZ0NBQWdDLGdCQUFnQixzQkFBc0IsT0FBTyx1REFBdUQsYUFBYSx1REFBdUQsMkNBQTJDLEVBQUUsRUFBRSxFQUFFLDZDQUE2QywyRUFBMkUsRUFBRSxPQUFPLGlEQUFpRCxrRkFBa0YsRUFBRSxFQUFFLEVBQUUsRUFBRSxlQUFlOztBQUVwaEIsMkNBQTJDLGtCQUFrQixrQ0FBa0MscUVBQXFFLEVBQUUsRUFBRSxPQUFPLGtCQUFrQixFQUFFLFlBQVk7O0FBRS9NLGlDQUFpQywySEFBMkg7O0FBRTVKLDZCQUE2QixrS0FBa0s7O0FBRS9MLGlEQUFpRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNELGtIQUFrSDs7QUFFOVosc0NBQXNDLHVEQUF1RCx1Q0FBdUMsU0FBUyxPQUFPLGtCQUFrQixFQUFFLGFBQWE7O0FBRXJMLHdDQUF3QyxnRkFBZ0YsZUFBZSxlQUFlLGdCQUFnQixvQkFBb0IsTUFBTSwwQ0FBMEMsK0JBQStCLGFBQWEscUJBQXFCLG1DQUFtQyxFQUFFLEVBQUUsY0FBYyxXQUFXLFVBQVUsRUFBRSxVQUFVLE1BQU0saURBQWlELEVBQUUsVUFBVSxrQkFBa0IsRUFBRSxFQUFFLGFBQWE7O0FBRXZlLCtCQUErQixvQ0FBb0M7O0FBRW5FO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QixnQkFBZ0IsR0FBRyx5QkFBeUIsZ0JBQWdCLHdCQUF3Qix1QkFBdUIsc0JBQXNCLGlCQUFpQiwyQkFBMkIsdUJBQXVCLGtCQUFrQixrQkFBa0IscUJBQXFCLDZCQUE2QiwyQkFBMkIsR0FBRywwQ0FBMEMsNkJBQTZCLEdBQUcsMEJBQTBCLGtCQUFrQixHQUFHLDRHQUE0RyxrQkFBa0IsR0FBRyx1QkFBdUIsZ0JBQWdCLHdCQUF3Qiw4RUFBOEUsdUJBQXVCLG9CQUFvQixxQkFBcUIsR0FBRyxvQkFBb0Isb0JBQW9CLGlCQUFpQixzQkFBc0IsdUJBQXVCLHFCQUFxQixHQUFHLHVCQUF1QixzQkFBc0IsdUJBQXVCLEdBQUcsaUJBQWlCLHVCQUF1QixzQkFBc0IsbUJBQW1CLEdBQUcseUJBQXlCLHVCQUF1QixnQkFBZ0IsaUJBQWlCLDJCQUEyQixHQUFHLDZCQUE2QixxQkFBcUIsa0RBQWtELGtEQUFrRCxrQkFBa0IsR0FBRyxvQkFBb0IsY0FBYyw0QkFBNEIsdUJBQXVCLFdBQVcsY0FBYyxnQkFBZ0Isa0JBQWtCLEdBQUcsZ0NBQWdDLG9CQUFvQixHQUFHLHdCQUF3QixrQkFBa0IsdUJBQXVCLGFBQWEsYUFBYSx3Q0FBd0Msd0NBQXdDLEdBQUcsZ0JBQWdCLHdCQUF3QixHQUFHLHdDQUF3QyxnREFBZ0QsZ0RBQWdELGtCQUFrQixHQUFHLGdCQUFnQixnQkFBZ0Isc0JBQXNCLDZCQUE2QixvQkFBb0Isc0JBQXNCLEdBQUcsa0JBQWtCLG1CQUFtQiwwQkFBMEIsR0FBRyxzQkFBc0IsMkJBQTJCLEdBQUcsc0JBQXNCLGVBQWUsR0FBRztBQUMvcUU7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUseUJBQXlCOztBQUU5RjtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTCxrQ0FBa0M7QUFDbEM7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7O0FBR0g7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBLEtBQUs7QUFDTCxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsV0FBVyxhQUFvQjtBQUMvQixHQUFHOztBQUVILHVGQUF1RjtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RDs7QUFFekQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdELE9BQU87QUFDUCx1REFBdUQ7QUFDdkQ7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUZBQXlGO0FBQ3pGO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RDs7QUFFekQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdELE9BQU87QUFDUCx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ25VYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSw4Qjs7Ozs7Ozs7Ozs7QUNQQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixlQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcEZhOztBQUViLGlDQUFpQyxtQkFBTyxDQUFDLDBEQUFVO0FBQ25ELHFDQUFxQyxtQkFBTyxDQUFDLDBEQUFVOzs7Ozs7Ozs7Ozs7O0FDSDFDOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxTQUFJOztBQUVuRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxxRUFBcUUscUJBQXFCLGFBQWE7O0FBRXZHOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsR0FBRzs7QUFFSDs7O0FBR0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQiw0QkFBNEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0JBQW9CLDZCQUE2QjtBQUNqRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUM1UUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQUE7QUFBQTtBQUErQzs7QUFFaEM7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkIsOERBQU07QUFDbkM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQ0FBa0MsS0FBSyxJQUFJLFFBQVE7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWLENBQUMsR0FBRyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDbkNMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUU4RDs7QUFFOUQ7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXlGO0FBQzFDO0FBQ047QUFDVDs7QUFFaEM7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGdEQUFPO0FBQzlCLDZCQUE2QixnREFBTztBQUNwQzs7QUFFQTtBQUNBLElBQUksZ0VBQWM7QUFDbEI7QUFDQSxRQUFRLGdEQUFPO0FBQ2YsUUFBUSwyRUFBZ0I7QUFDeEIsUUFBUSwwRUFBZTtBQUN2QixRQUFRLCtEQUFTO0FBQ2pCO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLEVBQUUsMEVBQWU7QUFDakIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEQ7Ozs7Ozs7Ozs7OztBQy9CQTtBQUFlLG9GQUF1Qix5QkFBeUIsRTs7Ozs7Ozs7Ozs7O0FDQS9EO0FBQWUsb0ZBQXVCLHFCQUFxQixFOzs7Ozs7Ozs7Ozs7QUNBM0Q7QUFBZSxvRkFBdUIsb0JBQW9CLEU7Ozs7Ozs7Ozs7OztBQ0ExRDtBQUFlLG9GQUF1Qix1QkFBdUIsRTs7Ozs7Ozs7Ozs7O0FDQTdEO0FBQWUsb0ZBQXVCLG9CQUFvQixFOzs7Ozs7Ozs7Ozs7QUNBMUQ7QUFBZSxvRkFBdUIsb0JBQW9CLEU7Ozs7Ozs7Ozs7OztBQ0ExRDtBQUFlLG9GQUF1QixzQkFBc0IsRTs7Ozs7Ozs7Ozs7O0FDQTVEO0FBQWUsb0ZBQXVCLG9CQUFvQixFOzs7Ozs7Ozs7Ozs7QUNBMUQ7QUFBZSxvRkFBdUIsb0JBQW9CLEU7Ozs7Ozs7Ozs7OztBQ0ExRDtBQUFlLG9GQUF1Qiw0QkFBNEIsRTs7Ozs7Ozs7Ozs7O0FDQWxFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1QjtBQUNLO0FBQ0Y7QUFDMUI7QUFDQSxnQkFBZ0IsMERBQTJDOzs7Ozs7Ozs7Ozs7OztBQ0ozRDtBQUFBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxJQUFJLE9BQU8sSUFBSTtBQUM1RTtBQUNBOztBQUVBLDhCQUE4QiwwQkFBMEI7QUFDeEQ7QUFDQTtBQUNBLGdEQUFnRCw4QkFBOEI7QUFDOUUsR0FBRztBQUNIO0FBQ0EsMENBQTBDLFdBQVc7QUFDckQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRWUsNkVBQWMsRUFBQzs7Ozs7Ozs7Ozs7OztBQzdCOUI7QUFBQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsSUFBSSxHQUFHLElBQUk7QUFDckU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsMENBQTBDLFdBQVc7QUFDckQ7QUFDQTs7QUFFZSx3RUFBUyxFQUFDOzs7Ozs7Ozs7Ozs7QUNmekIsVUFBVSxtQkFBTyxDQUFDLHNKQUEyRTtBQUM3RiwwQkFBMEIsbUJBQU8sQ0FBQyw0SEFBeUQ7O0FBRTNGOztBQUVBO0FBQ0EsMEJBQTBCLFFBQVM7QUFDbkM7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7OztBQUlBLHNDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnbGlnaHRzZWFncmVlbicsXG4gICdmb3Jlc3RncmVlbicsXG4gICdnb2xkZW5yb2QnLFxuICAnZG9kZ2VyYmx1ZScsXG4gICdkYXJrb3JjaGlkJyxcbiAgJ2NyaW1zb24nXG5dO1xuXG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcbiAgLy8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuICAvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuICAvLyBleHBsaWNpdGx5XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiB3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0JylcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgLy8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuICBpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcbiAgICByID0gcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH1cblxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWdbJ2RlZmF1bHQnXSA9IGNyZWF0ZURlYnVnO1xuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG5leHBvcnRzLmRpc2FibGUgPSBkaXNhYmxlO1xuZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG5leHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuZXhwb3J0cy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cbi8qKlxuICogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXG4gKi9cblxuZXhwb3J0cy5uYW1lcyA9IFtdO1xuZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4vKipcbiAqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cbiAqXG4gKiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlciBvciB1cHBlci1jYXNlIGxldHRlciwgaS5lLiBcIm5cIiBhbmQgXCJOXCIuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307XG5cbi8qKlxuICogUHJldmlvdXMgbG9nIHRpbWVzdGFtcC5cbiAqL1xuXG52YXIgcHJldlRpbWU7XG5cbi8qKlxuICogU2VsZWN0IGEgY29sb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcbiAgdmFyIGhhc2ggPSAwLCBpO1xuXG4gIGZvciAoaSBpbiBuYW1lc3BhY2UpIHtcbiAgICBoYXNoICA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgfVxuXG4gIHJldHVybiBleHBvcnRzLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGV4cG9ydHMuY29sb3JzLmxlbmd0aF07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuXG4gIC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5pbml0KSB7XG4gICAgZXhwb3J0cy5pbml0KGRlYnVnKTtcbiAgfVxuXG4gIHJldHVybiBkZWJ1Zztcbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKCg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgaWYgKG1zID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtcyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHJldHVybiBwbHVyYWwobXMsIGQsICdkYXknKSB8fFxuICAgIHBsdXJhbChtcywgaCwgJ2hvdXInKSB8fFxuICAgIHBsdXJhbChtcywgbSwgJ21pbnV0ZScpIHx8XG4gICAgcGx1cmFsKG1zLCBzLCAnc2Vjb25kJykgfHxcbiAgICBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbiwgbmFtZSkge1xuICBpZiAobXMgPCBuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChtcyA8IG4gKiAxLjUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZTtcbiAgfVxuICByZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBBbGdvbGlhU2VhcmNoQ29yZTtcblxudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzJyk7XG52YXIgZXhpdFByb21pc2UgPSByZXF1aXJlKCcuL2V4aXRQcm9taXNlLmpzJyk7XG52YXIgSW5kZXhDb3JlID0gcmVxdWlyZSgnLi9JbmRleENvcmUuanMnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4vc3RvcmUuanMnKTtcblxuLy8gV2Ugd2lsbCBhbHdheXMgcHV0IHRoZSBBUEkgS0VZIGluIHRoZSBKU09OIGJvZHkgaW4gY2FzZSBvZiB0b28gbG9uZyBBUEkgS0VZLFxuLy8gdG8gYXZvaWQgcXVlcnkgc3RyaW5nIGJlaW5nIHRvbyBsb25nIGFuZCBmYWlsaW5nIGluIHZhcmlvdXMgY29uZGl0aW9ucyAob3VyIHNlcnZlciBsaW1pdCwgYnJvd3NlciBsaW1pdCxcbi8vIHByb3hpZXMgbGltaXQpXG52YXIgTUFYX0FQSV9LRVlfTEVOR1RIID0gNTAwO1xudmFyIFJFU0VUX0FQUF9EQVRBX1RJTUVSID1cbiAgcHJvY2Vzcy5lbnYuUkVTRVRfQVBQX0RBVEFfVElNRVIgJiYgcGFyc2VJbnQocHJvY2Vzcy5lbnYuUkVTRVRfQVBQX0RBVEFfVElNRVIsIDEwKSB8fFxuICA2MCAqIDIgKiAxMDAwOyAvLyBhZnRlciAyIG1pbnV0ZXMgcmVzZXQgdG8gZmlyc3QgaG9zdFxuXG4vKlxuICogQWxnb2xpYSBTZWFyY2ggbGlicmFyeSBpbml0aWFsaXphdGlvblxuICogaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFwcGxpY2F0aW9uSUQgLSBZb3VyIGFwcGxpY2F0aW9uSUQsIGZvdW5kIGluIHlvdXIgZGFzaGJvYXJkXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBpS2V5IC0gWW91ciBBUEkga2V5LCBmb3VuZCBpbiB5b3VyIGRhc2hib2FyZFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXVxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVvdXQ9MjAwMF0gLSBUaGUgcmVxdWVzdCB0aW1lb3V0IHNldCBpbiBtaWxsaXNlY29uZHMsXG4gKiBhbm90aGVyIHJlcXVlc3Qgd2lsbCBiZSBpc3N1ZWQgYWZ0ZXIgdGhpcyB0aW1lb3V0XG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdHMucHJvdG9jb2w9J2h0dHBzOiddIC0gVGhlIHByb3RvY29sIHVzZWQgdG8gcXVlcnkgQWxnb2xpYSBTZWFyY2ggQVBJLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2V0IHRvICdodHRwOicgdG8gZm9yY2UgdXNpbmcgaHR0cC5cbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBbb3B0cy5ob3N0cz17XG4gKiAgICAgICAgICAgcmVhZDogW3RoaXMuYXBwbGljYXRpb25JRCArICctZHNuLmFsZ29saWEubmV0J10uY29uY2F0KFtcbiAqICAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25JRCArICctMS5hbGdvbGlhbmV0LmNvbScsXG4gKiAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uSUQgKyAnLTIuYWxnb2xpYW5ldC5jb20nLFxuICogICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbklEICsgJy0zLmFsZ29saWFuZXQuY29tJ11cbiAqICAgICAgICAgICBdKSxcbiAqICAgICAgICAgICB3cml0ZTogW3RoaXMuYXBwbGljYXRpb25JRCArICcuYWxnb2xpYS5uZXQnXS5jb25jYXQoW1xuICogICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbklEICsgJy0xLmFsZ29saWFuZXQuY29tJyxcbiAqICAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25JRCArICctMi5hbGdvbGlhbmV0LmNvbScsXG4gKiAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uSUQgKyAnLTMuYWxnb2xpYW5ldC5jb20nXVxuICogICAgICAgICAgIF0pIC0gVGhlIGhvc3RzIHRvIHVzZSBmb3IgQWxnb2xpYSBTZWFyY2ggQVBJLlxuICogICAgICAgICAgIElmIHlvdSBwcm92aWRlIHRoZW0sIHlvdSB3aWxsIGxlc3MgYmVuZWZpdCBmcm9tIG91ciBIQSBpbXBsZW1lbnRhdGlvblxuICovXG5mdW5jdGlvbiBBbGdvbGlhU2VhcmNoQ29yZShhcHBsaWNhdGlvbklELCBhcGlLZXksIG9wdHMpIHtcbiAgdmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnYWxnb2xpYXNlYXJjaCcpO1xuXG4gIHZhciBjbG9uZSA9IHJlcXVpcmUoJy4vY2xvbmUuanMnKTtcbiAgdmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG4gIHZhciBtYXAgPSByZXF1aXJlKCcuL21hcC5qcycpO1xuXG4gIHZhciB1c2FnZSA9ICdVc2FnZTogYWxnb2xpYXNlYXJjaChhcHBsaWNhdGlvbklELCBhcGlLZXksIG9wdHMpJztcblxuICBpZiAob3B0cy5fYWxsb3dFbXB0eUNyZWRlbnRpYWxzICE9PSB0cnVlICYmICFhcHBsaWNhdGlvbklEKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5BbGdvbGlhU2VhcmNoRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGFuIGFwcGxpY2F0aW9uIElELiAnICsgdXNhZ2UpO1xuICB9XG5cbiAgaWYgKG9wdHMuX2FsbG93RW1wdHlDcmVkZW50aWFscyAhPT0gdHJ1ZSAmJiAhYXBpS2V5KSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5BbGdvbGlhU2VhcmNoRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGFuIEFQSSBrZXkuICcgKyB1c2FnZSk7XG4gIH1cblxuICB0aGlzLmFwcGxpY2F0aW9uSUQgPSBhcHBsaWNhdGlvbklEO1xuICB0aGlzLmFwaUtleSA9IGFwaUtleTtcblxuICB0aGlzLmhvc3RzID0ge1xuICAgIHJlYWQ6IFtdLFxuICAgIHdyaXRlOiBbXVxuICB9O1xuXG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIHRoaXMuX3RpbWVvdXRzID0gb3B0cy50aW1lb3V0cyB8fCB7XG4gICAgY29ubmVjdDogMSAqIDEwMDAsIC8vIDUwMG1zIGNvbm5lY3QgaXMgR1BSUyBsYXRlbmN5XG4gICAgcmVhZDogMiAqIDEwMDAsXG4gICAgd3JpdGU6IDMwICogMTAwMFxuICB9O1xuXG4gIC8vIGJhY2t3YXJkIGNvbXBhdCwgaWYgb3B0cy50aW1lb3V0IGlzIHBhc3NlZCwgd2UgdXNlIGl0IHRvIGNvbmZpZ3VyZSBhbGwgdGltZW91dHMgbGlrZSBiZWZvcmVcbiAgaWYgKG9wdHMudGltZW91dCkge1xuICAgIHRoaXMuX3RpbWVvdXRzLmNvbm5lY3QgPSB0aGlzLl90aW1lb3V0cy5yZWFkID0gdGhpcy5fdGltZW91dHMud3JpdGUgPSBvcHRzLnRpbWVvdXQ7XG4gIH1cblxuICB2YXIgcHJvdG9jb2wgPSBvcHRzLnByb3RvY29sIHx8ICdodHRwczonO1xuICAvLyB3aGlsZSB3ZSBhZHZvY2F0ZSBmb3IgY29sb24tYXQtdGhlLWVuZCB2YWx1ZXM6ICdodHRwOicgZm9yIGBvcHRzLnByb3RvY29sYFxuICAvLyB3ZSBhbHNvIGFjY2VwdCBgaHR0cGAgYW5kIGBodHRwc2AuIEl0J3MgYSBjb21tb24gZXJyb3IuXG4gIGlmICghLzokLy50ZXN0KHByb3RvY29sKSkge1xuICAgIHByb3RvY29sID0gcHJvdG9jb2wgKyAnOic7XG4gIH1cblxuICBpZiAocHJvdG9jb2wgIT09ICdodHRwOicgJiYgcHJvdG9jb2wgIT09ICdodHRwczonKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5BbGdvbGlhU2VhcmNoRXJyb3IoJ3Byb3RvY29sIG11c3QgYmUgYGh0dHA6YCBvciBgaHR0cHM6YCAod2FzIGAnICsgb3B0cy5wcm90b2NvbCArICdgKScpO1xuICB9XG5cbiAgdGhpcy5fY2hlY2tBcHBJZERhdGEoKTtcblxuICBpZiAoIW9wdHMuaG9zdHMpIHtcbiAgICB2YXIgZGVmYXVsdEhvc3RzID0gbWFwKHRoaXMuX3NodWZmbGVSZXN1bHQsIGZ1bmN0aW9uKGhvc3ROdW1iZXIpIHtcbiAgICAgIHJldHVybiBhcHBsaWNhdGlvbklEICsgJy0nICsgaG9zdE51bWJlciArICcuYWxnb2xpYW5ldC5jb20nO1xuICAgIH0pO1xuXG4gICAgLy8gbm8gaG9zdHMgZ2l2ZW4sIGNvbXB1dGUgZGVmYXVsdHNcbiAgICB2YXIgbWFpblN1ZmZpeCA9IChvcHRzLmRzbiA9PT0gZmFsc2UgPyAnJyA6ICctZHNuJykgKyAnLmFsZ29saWEubmV0JztcbiAgICB0aGlzLmhvc3RzLnJlYWQgPSBbdGhpcy5hcHBsaWNhdGlvbklEICsgbWFpblN1ZmZpeF0uY29uY2F0KGRlZmF1bHRIb3N0cyk7XG4gICAgdGhpcy5ob3N0cy53cml0ZSA9IFt0aGlzLmFwcGxpY2F0aW9uSUQgKyAnLmFsZ29saWEubmV0J10uY29uY2F0KGRlZmF1bHRIb3N0cyk7XG4gIH0gZWxzZSBpZiAoaXNBcnJheShvcHRzLmhvc3RzKSkge1xuICAgIC8vIHdoZW4gcGFzc2luZyBjdXN0b20gaG9zdHMsIHdlIG5lZWQgdG8gaGF2ZSBhIGRpZmZlcmVudCBob3N0IGluZGV4IGlmIHRoZSBudW1iZXJcbiAgICAvLyBvZiB3cml0ZS9yZWFkIGhvc3RzIGFyZSBkaWZmZXJlbnQuXG4gICAgdGhpcy5ob3N0cy5yZWFkID0gY2xvbmUob3B0cy5ob3N0cyk7XG4gICAgdGhpcy5ob3N0cy53cml0ZSA9IGNsb25lKG9wdHMuaG9zdHMpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaG9zdHMucmVhZCA9IGNsb25lKG9wdHMuaG9zdHMucmVhZCk7XG4gICAgdGhpcy5ob3N0cy53cml0ZSA9IGNsb25lKG9wdHMuaG9zdHMud3JpdGUpO1xuICB9XG5cbiAgLy8gYWRkIHByb3RvY29sIGFuZCBsb3dlcmNhc2UgaG9zdHNcbiAgdGhpcy5ob3N0cy5yZWFkID0gbWFwKHRoaXMuaG9zdHMucmVhZCwgcHJlcGFyZUhvc3QocHJvdG9jb2wpKTtcbiAgdGhpcy5ob3N0cy53cml0ZSA9IG1hcCh0aGlzLmhvc3RzLndyaXRlLCBwcmVwYXJlSG9zdChwcm90b2NvbCkpO1xuXG4gIHRoaXMuZXh0cmFIZWFkZXJzID0ge307XG5cbiAgLy8gSW4gc29tZSBzaXR1YXRpb25zIHlvdSBtaWdodCB3YW50IHRvIHdhcm0gdGhlIGNhY2hlXG4gIHRoaXMuY2FjaGUgPSBvcHRzLl9jYWNoZSB8fCB7fTtcblxuICB0aGlzLl91YSA9IG9wdHMuX3VhO1xuICB0aGlzLl91c2VDYWNoZSA9IG9wdHMuX3VzZUNhY2hlID09PSB1bmRlZmluZWQgfHwgb3B0cy5fY2FjaGUgPyB0cnVlIDogb3B0cy5fdXNlQ2FjaGU7XG4gIHRoaXMuX3VzZVJlcXVlc3RDYWNoZSA9IHRoaXMuX3VzZUNhY2hlICYmIG9wdHMuX3VzZVJlcXVlc3RDYWNoZTtcbiAgdGhpcy5fdXNlRmFsbGJhY2sgPSBvcHRzLnVzZUZhbGxiYWNrID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0cy51c2VGYWxsYmFjaztcblxuICB0aGlzLl9zZXRUaW1lb3V0ID0gb3B0cy5fc2V0VGltZW91dDtcblxuICBkZWJ1ZygnaW5pdCBkb25lLCAlaicsIHRoaXMpO1xufVxuXG4vKlxuICogR2V0IHRoZSBpbmRleCBvYmplY3QgaW5pdGlhbGl6ZWRcbiAqXG4gKiBAcGFyYW0gaW5kZXhOYW1lIHRoZSBuYW1lIG9mIGluZGV4XG4gKiBAcGFyYW0gY2FsbGJhY2sgdGhlIHJlc3VsdCBjYWxsYmFjayB3aXRoIG9uZSBhcmd1bWVudCAodGhlIEluZGV4IGluc3RhbmNlKVxuICovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuaW5pdEluZGV4ID0gZnVuY3Rpb24oaW5kZXhOYW1lKSB7XG4gIHJldHVybiBuZXcgSW5kZXhDb3JlKHRoaXMsIGluZGV4TmFtZSk7XG59O1xuXG4vKipcbiogQWRkIGFuIGV4dHJhIGZpZWxkIHRvIHRoZSBIVFRQIHJlcXVlc3RcbipcbiogQHBhcmFtIG5hbWUgdGhlIGhlYWRlciBmaWVsZCBuYW1lXG4qIEBwYXJhbSB2YWx1ZSB0aGUgaGVhZGVyIGZpZWxkIHZhbHVlXG4qL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLnNldEV4dHJhSGVhZGVyID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5leHRyYUhlYWRlcnNbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IHZhbHVlO1xufTtcblxuLyoqXG4qIEdldCB0aGUgdmFsdWUgb2YgYW4gZXh0cmEgSFRUUCBoZWFkZXJcbipcbiogQHBhcmFtIG5hbWUgdGhlIGhlYWRlciBmaWVsZCBuYW1lXG4qL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLmdldEV4dHJhSGVhZGVyID0gZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpcy5leHRyYUhlYWRlcnNbbmFtZS50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuKiBSZW1vdmUgYW4gZXh0cmEgZmllbGQgZnJvbSB0aGUgSFRUUCByZXF1ZXN0XG4qXG4qIEBwYXJhbSBuYW1lIHRoZSBoZWFkZXIgZmllbGQgbmFtZVxuKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS51bnNldEV4dHJhSGVhZGVyID0gZnVuY3Rpb24obmFtZSkge1xuICBkZWxldGUgdGhpcy5leHRyYUhlYWRlcnNbbmFtZS50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuKiBBdWdtZW50IHNlbnQgeC1hbGdvbGlhLWFnZW50IHdpdGggbW9yZSBkYXRhLCBlYWNoIGFnZW50IHBhcnRcbiogaXMgYXV0b21hdGljYWxseSBzZXBhcmF0ZWQgZnJvbSB0aGUgb3RoZXJzIGJ5IGEgc2VtaWNvbG9uO1xuKlxuKiBAcGFyYW0gYWxnb2xpYUFnZW50IHRoZSBhZ2VudCB0byBhZGRcbiovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuYWRkQWxnb2xpYUFnZW50ID0gZnVuY3Rpb24oYWxnb2xpYUFnZW50KSB7XG4gIHZhciBhbGdvbGlhQWdlbnRXaXRoRGVsaW1pdGVyID0gJzsgJyArIGFsZ29saWFBZ2VudDtcblxuICBpZiAodGhpcy5fdWEuaW5kZXhPZihhbGdvbGlhQWdlbnRXaXRoRGVsaW1pdGVyKSA9PT0gLTEpIHtcbiAgICB0aGlzLl91YSArPSBhbGdvbGlhQWdlbnRXaXRoRGVsaW1pdGVyO1xuICB9XG59O1xuXG4vKlxuICogV3JhcHBlciB0aGF0IHRyeSBhbGwgaG9zdHMgdG8gbWF4aW1pemUgdGhlIHF1YWxpdHkgb2Ygc2VydmljZVxuICovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2pzb25SZXF1ZXN0ID0gZnVuY3Rpb24oaW5pdGlhbE9wdHMpIHtcbiAgdGhpcy5fY2hlY2tBcHBJZERhdGEoKTtcblxuICB2YXIgcmVxdWVzdERlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnYWxnb2xpYXNlYXJjaDonICsgaW5pdGlhbE9wdHMudXJsKTtcblxuXG4gIHZhciBib2R5O1xuICB2YXIgY2FjaGVJRDtcbiAgdmFyIGFkZGl0aW9uYWxVQSA9IGluaXRpYWxPcHRzLmFkZGl0aW9uYWxVQSB8fCAnJztcbiAgdmFyIGNhY2hlID0gaW5pdGlhbE9wdHMuY2FjaGU7XG4gIHZhciBjbGllbnQgPSB0aGlzO1xuICB2YXIgdHJpZXMgPSAwO1xuICB2YXIgdXNpbmdGYWxsYmFjayA9IGZhbHNlO1xuICB2YXIgaGFzRmFsbGJhY2sgPSBjbGllbnQuX3VzZUZhbGxiYWNrICYmIGNsaWVudC5fcmVxdWVzdC5mYWxsYmFjayAmJiBpbml0aWFsT3B0cy5mYWxsYmFjaztcbiAgdmFyIGhlYWRlcnM7XG5cbiAgaWYgKFxuICAgIHRoaXMuYXBpS2V5Lmxlbmd0aCA+IE1BWF9BUElfS0VZX0xFTkdUSCAmJlxuICAgIGluaXRpYWxPcHRzLmJvZHkgIT09IHVuZGVmaW5lZCAmJlxuICAgIChpbml0aWFsT3B0cy5ib2R5LnBhcmFtcyAhPT0gdW5kZWZpbmVkIHx8IC8vIGluZGV4LnNlYXJjaCgpXG4gICAgaW5pdGlhbE9wdHMuYm9keS5yZXF1ZXN0cyAhPT0gdW5kZWZpbmVkKSAvLyBjbGllbnQuc2VhcmNoKClcbiAgKSB7XG4gICAgaW5pdGlhbE9wdHMuYm9keS5hcGlLZXkgPSB0aGlzLmFwaUtleTtcbiAgICBoZWFkZXJzID0gdGhpcy5fY29tcHV0ZVJlcXVlc3RIZWFkZXJzKHtcbiAgICAgIGFkZGl0aW9uYWxVQTogYWRkaXRpb25hbFVBLFxuICAgICAgd2l0aEFwaUtleTogZmFsc2UsXG4gICAgICBoZWFkZXJzOiBpbml0aWFsT3B0cy5oZWFkZXJzXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgaGVhZGVycyA9IHRoaXMuX2NvbXB1dGVSZXF1ZXN0SGVhZGVycyh7XG4gICAgICBhZGRpdGlvbmFsVUE6IGFkZGl0aW9uYWxVQSxcbiAgICAgIGhlYWRlcnM6IGluaXRpYWxPcHRzLmhlYWRlcnNcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChpbml0aWFsT3B0cy5ib2R5ICE9PSB1bmRlZmluZWQpIHtcbiAgICBib2R5ID0gc2FmZUpTT05TdHJpbmdpZnkoaW5pdGlhbE9wdHMuYm9keSk7XG4gIH1cblxuICByZXF1ZXN0RGVidWcoJ3JlcXVlc3Qgc3RhcnQnKTtcbiAgdmFyIGRlYnVnRGF0YSA9IFtdO1xuXG5cbiAgZnVuY3Rpb24gZG9SZXF1ZXN0KHJlcXVlc3RlciwgcmVxT3B0cykge1xuICAgIGNsaWVudC5fY2hlY2tBcHBJZERhdGEoKTtcblxuICAgIHZhciBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgaWYgKGNsaWVudC5fdXNlQ2FjaGUgJiYgIWNsaWVudC5fdXNlUmVxdWVzdENhY2hlKSB7XG4gICAgICBjYWNoZUlEID0gaW5pdGlhbE9wdHMudXJsO1xuICAgIH1cblxuICAgIC8vIGFzIHdlIHNvbWV0aW1lIHVzZSBQT1NUIHJlcXVlc3RzIHRvIHBhc3MgcGFyYW1ldGVycyAobGlrZSBxdWVyeT0nYWEnKSxcbiAgICAvLyB0aGUgY2FjaGVJRCBtdXN0IGFsc28gaW5jbHVkZSB0aGUgYm9keSB0byBiZSBkaWZmZXJlbnQgYmV0d2VlbiBjYWxsc1xuICAgIGlmIChjbGllbnQuX3VzZUNhY2hlICYmICFjbGllbnQuX3VzZVJlcXVlc3RDYWNoZSAmJiBib2R5KSB7XG4gICAgICBjYWNoZUlEICs9ICdfYm9keV8nICsgcmVxT3B0cy5ib2R5O1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBjYWNoZSBleGlzdGVuY2VcbiAgICBpZiAoaXNDYWNoZVZhbGlkV2l0aEN1cnJlbnRJRCghY2xpZW50Ll91c2VSZXF1ZXN0Q2FjaGUsIGNhY2hlLCBjYWNoZUlEKSkge1xuICAgICAgcmVxdWVzdERlYnVnKCdzZXJ2aW5nIHJlc3BvbnNlIGZyb20gY2FjaGUnKTtcblxuICAgICAgdmFyIHJlc3BvbnNlVGV4dCA9IGNhY2hlW2NhY2hlSURdO1xuXG4gICAgICAvLyBDYWNoZSByZXNwb25zZSBtdXN0IG1hdGNoIHRoZSB0eXBlIG9mIHRoZSBvcmlnaW5hbCBvbmVcbiAgICAgIHJldHVybiBjbGllbnQuX3Byb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIGJvZHk6IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KSxcbiAgICAgICAgcmVzcG9uc2VUZXh0OiByZXNwb25zZVRleHRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGlmIHdlIHJlYWNoZWQgbWF4IHRyaWVzXG4gICAgaWYgKHRyaWVzID49IGNsaWVudC5ob3N0c1tpbml0aWFsT3B0cy5ob3N0VHlwZV0ubGVuZ3RoKSB7XG4gICAgICBpZiAoIWhhc0ZhbGxiYWNrIHx8IHVzaW5nRmFsbGJhY2spIHtcbiAgICAgICAgcmVxdWVzdERlYnVnKCdjb3VsZCBub3QgZ2V0IGFueSByZXNwb25zZScpO1xuICAgICAgICAvLyB0aGVuIHN0b3BcbiAgICAgICAgcmV0dXJuIGNsaWVudC5fcHJvbWlzZS5yZWplY3QobmV3IGVycm9ycy5BbGdvbGlhU2VhcmNoRXJyb3IoXG4gICAgICAgICAgJ0Nhbm5vdCBjb25uZWN0IHRvIHRoZSBBbGdvbGlhU2VhcmNoIEFQSS4nICtcbiAgICAgICAgICAnIFNlbmQgYW4gZW1haWwgdG8gc3VwcG9ydEBhbGdvbGlhLmNvbSB0byByZXBvcnQgYW5kIHJlc29sdmUgdGhlIGlzc3VlLicgK1xuICAgICAgICAgICcgQXBwbGljYXRpb24gaWQgd2FzOiAnICsgY2xpZW50LmFwcGxpY2F0aW9uSUQsIHtkZWJ1Z0RhdGE6IGRlYnVnRGF0YX1cbiAgICAgICAgKSk7XG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3REZWJ1Zygnc3dpdGNoaW5nIHRvIGZhbGxiYWNrJyk7XG5cbiAgICAgIC8vIGxldCdzIHRyeSB0aGUgZmFsbGJhY2sgc3RhcnRpbmcgZnJvbSBoZXJlXG4gICAgICB0cmllcyA9IDA7XG5cbiAgICAgIC8vIG1ldGhvZCwgdXJsIGFuZCBib2R5IGFyZSBmYWxsYmFjayBkZXBlbmRlbnRcbiAgICAgIHJlcU9wdHMubWV0aG9kID0gaW5pdGlhbE9wdHMuZmFsbGJhY2subWV0aG9kO1xuICAgICAgcmVxT3B0cy51cmwgPSBpbml0aWFsT3B0cy5mYWxsYmFjay51cmw7XG4gICAgICByZXFPcHRzLmpzb25Cb2R5ID0gaW5pdGlhbE9wdHMuZmFsbGJhY2suYm9keTtcbiAgICAgIGlmIChyZXFPcHRzLmpzb25Cb2R5KSB7XG4gICAgICAgIHJlcU9wdHMuYm9keSA9IHNhZmVKU09OU3RyaW5naWZ5KHJlcU9wdHMuanNvbkJvZHkpO1xuICAgICAgfVxuICAgICAgLy8gcmUtY29tcHV0ZSBoZWFkZXJzLCB0aGV5IGNvdWxkIGJlIG9taXR0aW5nIHRoZSBBUEkgS0VZXG4gICAgICBoZWFkZXJzID0gY2xpZW50Ll9jb21wdXRlUmVxdWVzdEhlYWRlcnMoe1xuICAgICAgICBhZGRpdGlvbmFsVUE6IGFkZGl0aW9uYWxVQSxcbiAgICAgICAgaGVhZGVyczogaW5pdGlhbE9wdHMuaGVhZGVyc1xuICAgICAgfSk7XG5cbiAgICAgIHJlcU9wdHMudGltZW91dHMgPSBjbGllbnQuX2dldFRpbWVvdXRzRm9yUmVxdWVzdChpbml0aWFsT3B0cy5ob3N0VHlwZSk7XG4gICAgICBjbGllbnQuX3NldEhvc3RJbmRleEJ5VHlwZSgwLCBpbml0aWFsT3B0cy5ob3N0VHlwZSk7XG4gICAgICB1c2luZ0ZhbGxiYWNrID0gdHJ1ZTsgLy8gdGhlIGN1cnJlbnQgcmVxdWVzdCBpcyBub3cgdXNpbmcgZmFsbGJhY2tcbiAgICAgIHJldHVybiBkb1JlcXVlc3QoY2xpZW50Ll9yZXF1ZXN0LmZhbGxiYWNrLCByZXFPcHRzKTtcbiAgICB9XG5cbiAgICB2YXIgY3VycmVudEhvc3QgPSBjbGllbnQuX2dldEhvc3RCeVR5cGUoaW5pdGlhbE9wdHMuaG9zdFR5cGUpO1xuXG4gICAgdmFyIHVybCA9IGN1cnJlbnRIb3N0ICsgcmVxT3B0cy51cmw7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBib2R5OiByZXFPcHRzLmJvZHksXG4gICAgICBqc29uQm9keTogcmVxT3B0cy5qc29uQm9keSxcbiAgICAgIG1ldGhvZDogcmVxT3B0cy5tZXRob2QsXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgdGltZW91dHM6IHJlcU9wdHMudGltZW91dHMsXG4gICAgICBkZWJ1ZzogcmVxdWVzdERlYnVnLFxuICAgICAgZm9yY2VBdXRoSGVhZGVyczogcmVxT3B0cy5mb3JjZUF1dGhIZWFkZXJzXG4gICAgfTtcblxuICAgIHJlcXVlc3REZWJ1ZygnbWV0aG9kOiAlcywgdXJsOiAlcywgaGVhZGVyczogJWosIHRpbWVvdXRzOiAlZCcsXG4gICAgICBvcHRpb25zLm1ldGhvZCwgdXJsLCBvcHRpb25zLmhlYWRlcnMsIG9wdGlvbnMudGltZW91dHMpO1xuXG4gICAgaWYgKHJlcXVlc3RlciA9PT0gY2xpZW50Ll9yZXF1ZXN0LmZhbGxiYWNrKSB7XG4gICAgICByZXF1ZXN0RGVidWcoJ3VzaW5nIGZhbGxiYWNrJyk7XG4gICAgfVxuXG4gICAgLy8gYHJlcXVlc3RlcmAgaXMgYW55IG9mIHRoaXMuX3JlcXVlc3Qgb3IgdGhpcy5fcmVxdWVzdC5mYWxsYmFja1xuICAgIC8vIHRodXMgaXQgbmVlZHMgdG8gYmUgY2FsbGVkIHVzaW5nIHRoZSBjbGllbnQgYXMgY29udGV4dFxuICAgIHJldHVybiByZXF1ZXN0ZXIuY2FsbChjbGllbnQsIHVybCwgb3B0aW9ucykudGhlbihzdWNjZXNzLCB0cnlGYWxsYmFjayk7XG5cbiAgICBmdW5jdGlvbiBzdWNjZXNzKGh0dHBSZXNwb25zZSkge1xuICAgICAgLy8gY29tcHV0ZSB0aGUgc3RhdHVzIG9mIHRoZSByZXNwb25zZSxcbiAgICAgIC8vXG4gICAgICAvLyBXaGVuIGluIGJyb3dzZXIgbW9kZSwgdXNpbmcgWERSIG9yIEpTT05QLCB3ZSBoYXZlIG5vIHN0YXR1c0NvZGUgYXZhaWxhYmxlXG4gICAgICAvLyBTbyB3ZSByZWx5IG9uIG91ciBBUEkgcmVzcG9uc2UgYHN0YXR1c2AgcHJvcGVydHkuXG4gICAgICAvLyBCdXQgYHdhaXRUYXNrYCBjYW4gc2V0IGEgYHN0YXR1c2AgcHJvcGVydHkgd2hpY2ggaXMgbm90IHRoZSBzdGF0dXNDb2RlIChpdCdzIHRoZSB0YXNrIHN0YXR1cylcbiAgICAgIC8vIFNvIHdlIGNoZWNrIGlmIHRoZXJlJ3MgYSBgbWVzc2FnZWAgYWxvbmcgYHN0YXR1c2AgYW5kIGl0IG1lYW5zIGl0J3MgYW4gZXJyb3JcbiAgICAgIC8vXG4gICAgICAvLyBUaGF0J3MgdGhlIG9ubHkgY2FzZSB3aGVyZSB3ZSBoYXZlIGEgcmVzcG9uc2Uuc3RhdHVzIHRoYXQncyBub3QgdGhlIGh0dHAgc3RhdHVzQ29kZVxuICAgICAgdmFyIHN0YXR1cyA9IGh0dHBSZXNwb25zZSAmJiBodHRwUmVzcG9uc2UuYm9keSAmJiBodHRwUmVzcG9uc2UuYm9keS5tZXNzYWdlICYmIGh0dHBSZXNwb25zZS5ib2R5LnN0YXR1cyB8fFxuXG4gICAgICAgIC8vIHRoaXMgaXMgaW1wb3J0YW50IHRvIGNoZWNrIHRoZSByZXF1ZXN0IHN0YXR1c0NvZGUgQUZURVIgdGhlIGJvZHkgZXZlbnR1YWxcbiAgICAgICAgLy8gc3RhdHVzQ29kZSBiZWNhdXNlIHNvbWUgaW1wbGVtZW50YXRpb25zIChqUXVlcnkgWERvbWFpblJlcXVlc3QgdHJhbnNwb3J0KSBtYXlcbiAgICAgICAgLy8gc2VuZCBzdGF0dXNDb2RlIDIwMCB3aGlsZSB3ZSBoYWQgYW4gZXJyb3JcbiAgICAgICAgaHR0cFJlc3BvbnNlLnN0YXR1c0NvZGUgfHxcblxuICAgICAgICAvLyBXaGVuIGluIGJyb3dzZXIgbW9kZSwgdXNpbmcgWERSIG9yIEpTT05QXG4gICAgICAgIC8vIHdlIGRlZmF1bHQgdG8gc3VjY2VzcyB3aGVuIG5vIGVycm9yIChubyByZXNwb25zZS5zdGF0dXMgJiYgcmVzcG9uc2UubWVzc2FnZSlcbiAgICAgICAgLy8gSWYgdGhlcmUgd2FzIGEgSlNPTi5wYXJzZSgpIGVycm9yIHRoZW4gYm9keSBpcyBudWxsIGFuZCBpdCBmYWlsc1xuICAgICAgICBodHRwUmVzcG9uc2UgJiYgaHR0cFJlc3BvbnNlLmJvZHkgJiYgMjAwO1xuXG4gICAgICByZXF1ZXN0RGVidWcoJ3JlY2VpdmVkIHJlc3BvbnNlOiBzdGF0dXNDb2RlOiAlcywgY29tcHV0ZWQgc3RhdHVzQ29kZTogJWQsIGhlYWRlcnM6ICVqJyxcbiAgICAgICAgaHR0cFJlc3BvbnNlLnN0YXR1c0NvZGUsIHN0YXR1cywgaHR0cFJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgICB2YXIgaHR0cFJlc3BvbnNlT2sgPSBNYXRoLmZsb29yKHN0YXR1cyAvIDEwMCkgPT09IDI7XG5cbiAgICAgIHZhciBlbmRUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgIGRlYnVnRGF0YS5wdXNoKHtcbiAgICAgICAgY3VycmVudEhvc3Q6IGN1cnJlbnRIb3N0LFxuICAgICAgICBoZWFkZXJzOiByZW1vdmVDcmVkZW50aWFscyhoZWFkZXJzKSxcbiAgICAgICAgY29udGVudDogYm9keSB8fCBudWxsLFxuICAgICAgICBjb250ZW50TGVuZ3RoOiBib2R5ICE9PSB1bmRlZmluZWQgPyBib2R5Lmxlbmd0aCA6IG51bGwsXG4gICAgICAgIG1ldGhvZDogcmVxT3B0cy5tZXRob2QsXG4gICAgICAgIHRpbWVvdXRzOiByZXFPcHRzLnRpbWVvdXRzLFxuICAgICAgICB1cmw6IHJlcU9wdHMudXJsLFxuICAgICAgICBzdGFydFRpbWU6IHN0YXJ0VGltZSxcbiAgICAgICAgZW5kVGltZTogZW5kVGltZSxcbiAgICAgICAgZHVyYXRpb246IGVuZFRpbWUgLSBzdGFydFRpbWUsXG4gICAgICAgIHN0YXR1c0NvZGU6IHN0YXR1c1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChodHRwUmVzcG9uc2VPaykge1xuICAgICAgICBpZiAoY2xpZW50Ll91c2VDYWNoZSAmJiAhY2xpZW50Ll91c2VSZXF1ZXN0Q2FjaGUgJiYgY2FjaGUpIHtcbiAgICAgICAgICBjYWNoZVtjYWNoZUlEXSA9IGh0dHBSZXNwb25zZS5yZXNwb25zZVRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlc3BvbnNlVGV4dDogaHR0cFJlc3BvbnNlLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICBib2R5OiBodHRwUmVzcG9uc2UuYm9keVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB2YXIgc2hvdWxkUmV0cnkgPSBNYXRoLmZsb29yKHN0YXR1cyAvIDEwMCkgIT09IDQ7XG5cbiAgICAgIGlmIChzaG91bGRSZXRyeSkge1xuICAgICAgICB0cmllcyArPSAxO1xuICAgICAgICByZXR1cm4gcmV0cnlSZXF1ZXN0KCk7XG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3REZWJ1ZygndW5yZWNvdmVyYWJsZSBlcnJvcicpO1xuXG4gICAgICAvLyBubyBzdWNjZXNzIGFuZCBubyByZXRyeSA9PiBmYWlsXG4gICAgICB2YXIgdW5yZWNvdmVyYWJsZUVycm9yID0gbmV3IGVycm9ycy5BbGdvbGlhU2VhcmNoRXJyb3IoXG4gICAgICAgIGh0dHBSZXNwb25zZS5ib2R5ICYmIGh0dHBSZXNwb25zZS5ib2R5Lm1lc3NhZ2UsIHtkZWJ1Z0RhdGE6IGRlYnVnRGF0YSwgc3RhdHVzQ29kZTogc3RhdHVzfVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGNsaWVudC5fcHJvbWlzZS5yZWplY3QodW5yZWNvdmVyYWJsZUVycm9yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cnlGYWxsYmFjayhlcnIpIHtcbiAgICAgIC8vIGVycm9yIGNhc2VzOlxuICAgICAgLy8gIFdoaWxlIG5vdCBpbiBmYWxsYmFjayBtb2RlOlxuICAgICAgLy8gICAgLSBDT1JTIG5vdCBzdXBwb3J0ZWRcbiAgICAgIC8vICAgIC0gbmV0d29yayBlcnJvclxuICAgICAgLy8gIFdoaWxlIGluIGZhbGxiYWNrIG1vZGU6XG4gICAgICAvLyAgICAtIHRpbWVvdXRcbiAgICAgIC8vICAgIC0gbmV0d29yayBlcnJvclxuICAgICAgLy8gICAgLSBiYWRseSBmb3JtYXR0ZWQgSlNPTlAgKHNjcmlwdCBsb2FkZWQsIGRpZCBub3QgY2FsbCBvdXIgY2FsbGJhY2spXG4gICAgICAvLyAgSW4gYm90aCBjYXNlczpcbiAgICAgIC8vICAgIC0gdW5jYXVnaHQgZXhjZXB0aW9uIG9jY3VycyAoVHlwZUVycm9yKVxuICAgICAgcmVxdWVzdERlYnVnKCdlcnJvcjogJXMsIHN0YWNrOiAlcycsIGVyci5tZXNzYWdlLCBlcnIuc3RhY2spO1xuXG4gICAgICB2YXIgZW5kVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICBkZWJ1Z0RhdGEucHVzaCh7XG4gICAgICAgIGN1cnJlbnRIb3N0OiBjdXJyZW50SG9zdCxcbiAgICAgICAgaGVhZGVyczogcmVtb3ZlQ3JlZGVudGlhbHMoaGVhZGVycyksXG4gICAgICAgIGNvbnRlbnQ6IGJvZHkgfHwgbnVsbCxcbiAgICAgICAgY29udGVudExlbmd0aDogYm9keSAhPT0gdW5kZWZpbmVkID8gYm9keS5sZW5ndGggOiBudWxsLFxuICAgICAgICBtZXRob2Q6IHJlcU9wdHMubWV0aG9kLFxuICAgICAgICB0aW1lb3V0czogcmVxT3B0cy50aW1lb3V0cyxcbiAgICAgICAgdXJsOiByZXFPcHRzLnVybCxcbiAgICAgICAgc3RhcnRUaW1lOiBzdGFydFRpbWUsXG4gICAgICAgIGVuZFRpbWU6IGVuZFRpbWUsXG4gICAgICAgIGR1cmF0aW9uOiBlbmRUaW1lIC0gc3RhcnRUaW1lXG4gICAgICB9KTtcblxuICAgICAgaWYgKCEoZXJyIGluc3RhbmNlb2YgZXJyb3JzLkFsZ29saWFTZWFyY2hFcnJvcikpIHtcbiAgICAgICAgZXJyID0gbmV3IGVycm9ycy5Vbmtub3duKGVyciAmJiBlcnIubWVzc2FnZSwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgdHJpZXMgKz0gMTtcblxuICAgICAgLy8gc3RvcCB0aGUgcmVxdWVzdCBpbXBsZW1lbnRhdGlvbiB3aGVuOlxuICAgICAgaWYgKFxuICAgICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIHRoaXMgZXJyb3IsXG4gICAgICAgIC8vIGl0IGNvbWVzIGZyb20gYSB0aHJvdyBpbiBzb21lIG90aGVyIHBpZWNlIG9mIGNvZGVcbiAgICAgICAgZXJyIGluc3RhbmNlb2YgZXJyb3JzLlVua25vd24gfHxcblxuICAgICAgICAvLyBzZXJ2ZXIgc2VudCB1bnBhcnNhYmxlIEpTT05cbiAgICAgICAgZXJyIGluc3RhbmNlb2YgZXJyb3JzLlVucGFyc2FibGVKU09OIHx8XG5cbiAgICAgICAgLy8gbWF4IHRyaWVzIGFuZCBhbHJlYWR5IHVzaW5nIGZhbGxiYWNrIG9yIG5vIGZhbGxiYWNrXG4gICAgICAgIHRyaWVzID49IGNsaWVudC5ob3N0c1tpbml0aWFsT3B0cy5ob3N0VHlwZV0ubGVuZ3RoICYmXG4gICAgICAgICh1c2luZ0ZhbGxiYWNrIHx8ICFoYXNGYWxsYmFjaykpIHtcbiAgICAgICAgLy8gc3RvcCByZXF1ZXN0IGltcGxlbWVudGF0aW9uIGZvciB0aGlzIGNvbW1hbmRcbiAgICAgICAgZXJyLmRlYnVnRGF0YSA9IGRlYnVnRGF0YTtcbiAgICAgICAgcmV0dXJuIGNsaWVudC5fcHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgIH1cblxuICAgICAgLy8gV2hlbiBhIHRpbWVvdXQgb2NjdXJyZWQsIHJldHJ5IGJ5IHJhaXNpbmcgdGltZW91dFxuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIGVycm9ycy5SZXF1ZXN0VGltZW91dCkge1xuICAgICAgICByZXR1cm4gcmV0cnlSZXF1ZXN0V2l0aEhpZ2hlclRpbWVvdXQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJldHJ5UmVxdWVzdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJldHJ5UmVxdWVzdCgpIHtcbiAgICAgIHJlcXVlc3REZWJ1ZygncmV0cnlpbmcgcmVxdWVzdCcpO1xuICAgICAgY2xpZW50Ll9pbmNyZW1lbnRIb3N0SW5kZXgoaW5pdGlhbE9wdHMuaG9zdFR5cGUpO1xuICAgICAgcmV0dXJuIGRvUmVxdWVzdChyZXF1ZXN0ZXIsIHJlcU9wdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJldHJ5UmVxdWVzdFdpdGhIaWdoZXJUaW1lb3V0KCkge1xuICAgICAgcmVxdWVzdERlYnVnKCdyZXRyeWluZyByZXF1ZXN0IHdpdGggaGlnaGVyIHRpbWVvdXQnKTtcbiAgICAgIGNsaWVudC5faW5jcmVtZW50SG9zdEluZGV4KGluaXRpYWxPcHRzLmhvc3RUeXBlKTtcbiAgICAgIGNsaWVudC5faW5jcmVtZW50VGltZW91dE11bHRpcGxlcigpO1xuICAgICAgcmVxT3B0cy50aW1lb3V0cyA9IGNsaWVudC5fZ2V0VGltZW91dHNGb3JSZXF1ZXN0KGluaXRpYWxPcHRzLmhvc3RUeXBlKTtcbiAgICAgIHJldHVybiBkb1JlcXVlc3QocmVxdWVzdGVyLCByZXFPcHRzKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc0NhY2hlVmFsaWRXaXRoQ3VycmVudElEKFxuICAgIHVzZVJlcXVlc3RDYWNoZSxcbiAgICBjdXJyZW50Q2FjaGUsXG4gICAgY3VycmVudENhY2hlSURcbiAgKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNsaWVudC5fdXNlQ2FjaGUgJiZcbiAgICAgIHVzZVJlcXVlc3RDYWNoZSAmJlxuICAgICAgY3VycmVudENhY2hlICYmXG4gICAgICBjdXJyZW50Q2FjaGVbY3VycmVudENhY2hlSURdICE9PSB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cblxuICBmdW5jdGlvbiBpbnRlcm9wQ2FsbGJhY2tSZXR1cm4ocmVxdWVzdCwgY2FsbGJhY2spIHtcbiAgICBpZiAoaXNDYWNoZVZhbGlkV2l0aEN1cnJlbnRJRChjbGllbnQuX3VzZVJlcXVlc3RDYWNoZSwgY2FjaGUsIGNhY2hlSUQpKSB7XG4gICAgICByZXF1ZXN0LmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBSZWxlYXNlIHRoZSBjYWNoZSBvbiBlcnJvclxuICAgICAgICBkZWxldGUgY2FjaGVbY2FjaGVJRF07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGluaXRpYWxPcHRzLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBlaXRoZXIgd2UgaGF2ZSBhIGNhbGxiYWNrXG4gICAgICByZXF1ZXN0LnRoZW4oZnVuY3Rpb24gb2tDYihjb250ZW50KSB7XG4gICAgICAgIGV4aXRQcm9taXNlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGluaXRpYWxPcHRzLmNhbGxiYWNrKG51bGwsIGNhbGxiYWNrKGNvbnRlbnQpKTtcbiAgICAgICAgfSwgY2xpZW50Ll9zZXRUaW1lb3V0IHx8IHNldFRpbWVvdXQpO1xuICAgICAgfSwgZnVuY3Rpb24gbm9va0NiKGVycikge1xuICAgICAgICBleGl0UHJvbWlzZShmdW5jdGlvbigpIHtcbiAgICAgICAgICBpbml0aWFsT3B0cy5jYWxsYmFjayhlcnIpO1xuICAgICAgICB9LCBjbGllbnQuX3NldFRpbWVvdXQgfHwgc2V0VGltZW91dCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZWl0aGVyIHdlIGFyZSB1c2luZyBwcm9taXNlc1xuICAgICAgcmV0dXJuIHJlcXVlc3QudGhlbihjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNsaWVudC5fdXNlQ2FjaGUgJiYgY2xpZW50Ll91c2VSZXF1ZXN0Q2FjaGUpIHtcbiAgICBjYWNoZUlEID0gaW5pdGlhbE9wdHMudXJsO1xuICB9XG5cbiAgLy8gYXMgd2Ugc29tZXRpbWUgdXNlIFBPU1QgcmVxdWVzdHMgdG8gcGFzcyBwYXJhbWV0ZXJzIChsaWtlIHF1ZXJ5PSdhYScpLFxuICAvLyB0aGUgY2FjaGVJRCBtdXN0IGFsc28gaW5jbHVkZSB0aGUgYm9keSB0byBiZSBkaWZmZXJlbnQgYmV0d2VlbiBjYWxsc1xuICBpZiAoY2xpZW50Ll91c2VDYWNoZSAmJiBjbGllbnQuX3VzZVJlcXVlc3RDYWNoZSAmJiBib2R5KSB7XG4gICAgY2FjaGVJRCArPSAnX2JvZHlfJyArIGJvZHk7XG4gIH1cblxuICBpZiAoaXNDYWNoZVZhbGlkV2l0aEN1cnJlbnRJRChjbGllbnQuX3VzZVJlcXVlc3RDYWNoZSwgY2FjaGUsIGNhY2hlSUQpKSB7XG4gICAgcmVxdWVzdERlYnVnKCdzZXJ2aW5nIHJlcXVlc3QgZnJvbSBjYWNoZScpO1xuXG4gICAgdmFyIG1heWJlUHJvbWlzZUZvckNhY2hlID0gY2FjaGVbY2FjaGVJRF07XG5cbiAgICAvLyBJbiBjYXNlIHRoZSBjYWNoZSBpcyB3YXJtdXAgd2l0aCB2YWx1ZSB0aGF0IGlzIG5vdCBhIHByb21pc2VcbiAgICB2YXIgcHJvbWlzZUZvckNhY2hlID0gdHlwZW9mIG1heWJlUHJvbWlzZUZvckNhY2hlLnRoZW4gIT09ICdmdW5jdGlvbidcbiAgICAgID8gY2xpZW50Ll9wcm9taXNlLnJlc29sdmUoe3Jlc3BvbnNlVGV4dDogbWF5YmVQcm9taXNlRm9yQ2FjaGV9KVxuICAgICAgOiBtYXliZVByb21pc2VGb3JDYWNoZTtcblxuICAgIHJldHVybiBpbnRlcm9wQ2FsbGJhY2tSZXR1cm4ocHJvbWlzZUZvckNhY2hlLCBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAvLyBJbiBjYXNlIG9mIHRoZSBjYWNoZSByZXF1ZXN0LCByZXR1cm4gdGhlIG9yaWdpbmFsIHZhbHVlXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShjb250ZW50LnJlc3BvbnNlVGV4dCk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgcmVxdWVzdCA9IGRvUmVxdWVzdChcbiAgICBjbGllbnQuX3JlcXVlc3QsIHtcbiAgICAgIHVybDogaW5pdGlhbE9wdHMudXJsLFxuICAgICAgbWV0aG9kOiBpbml0aWFsT3B0cy5tZXRob2QsXG4gICAgICBib2R5OiBib2R5LFxuICAgICAganNvbkJvZHk6IGluaXRpYWxPcHRzLmJvZHksXG4gICAgICB0aW1lb3V0czogY2xpZW50Ll9nZXRUaW1lb3V0c0ZvclJlcXVlc3QoaW5pdGlhbE9wdHMuaG9zdFR5cGUpLFxuICAgICAgZm9yY2VBdXRoSGVhZGVyczogaW5pdGlhbE9wdHMuZm9yY2VBdXRoSGVhZGVyc1xuICAgIH1cbiAgKTtcblxuICBpZiAoY2xpZW50Ll91c2VDYWNoZSAmJiBjbGllbnQuX3VzZVJlcXVlc3RDYWNoZSAmJiBjYWNoZSkge1xuICAgIGNhY2hlW2NhY2hlSURdID0gcmVxdWVzdDtcbiAgfVxuXG4gIHJldHVybiBpbnRlcm9wQ2FsbGJhY2tSZXR1cm4ocmVxdWVzdCwgZnVuY3Rpb24oY29udGVudCkge1xuICAgIC8vIEluIGNhc2Ugb2YgdGhlIGZpcnN0IHJlcXVlc3QsIHJldHVybiB0aGUgSlNPTiB2YWx1ZVxuICAgIHJldHVybiBjb250ZW50LmJvZHk7XG4gIH0pO1xufTtcblxuLypcbiogVHJhbnNmb3JtIHNlYXJjaCBwYXJhbSBvYmplY3QgaW4gcXVlcnkgc3RyaW5nXG4qIEBwYXJhbSB7b2JqZWN0fSBhcmdzIGFyZ3VtZW50cyB0byBhZGQgdG8gdGhlIGN1cnJlbnQgcXVlcnkgc3RyaW5nXG4qIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMgY3VycmVudCBxdWVyeSBzdHJpbmdcbiogQHJldHVybiB7c3RyaW5nfSB0aGUgZmluYWwgcXVlcnkgc3RyaW5nXG4qL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9nZXRTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbihhcmdzLCBwYXJhbXMpIHtcbiAgaWYgKGFyZ3MgPT09IHVuZGVmaW5lZCB8fCBhcmdzID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gYXJncykge1xuICAgIGlmIChrZXkgIT09IG51bGwgJiYgYXJnc1trZXldICE9PSB1bmRlZmluZWQgJiYgYXJncy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBwYXJhbXMgKz0gcGFyYW1zID09PSAnJyA/ICcnIDogJyYnO1xuICAgICAgcGFyYW1zICs9IGtleSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnc1trZXldKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA/IHNhZmVKU09OU3RyaW5naWZ5KGFyZ3Nba2V5XSkgOiBhcmdzW2tleV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGFyYW1zO1xufTtcblxuLyoqXG4gKiBDb21wdXRlIHRoZSBoZWFkZXJzIGZvciBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gW3N0cmluZ10gb3B0aW9ucy5hZGRpdGlvbmFsVUEgc2VtaS1jb2xvbiBzZXBhcmF0ZWQgc3RyaW5nIHdpdGggb3RoZXIgdXNlciBhZ2VudHMgdG8gYWRkXG4gKiBAcGFyYW0gW2Jvb2xlYW49dHJ1ZV0gb3B0aW9ucy53aXRoQXBpS2V5IFNlbmQgdGhlIGFwaSBrZXkgYXMgYSBoZWFkZXJcbiAqIEBwYXJhbSBbT2JqZWN0XSBvcHRpb25zLmhlYWRlcnMgRXh0cmEgaGVhZGVycyB0byBzZW5kXG4gKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fY29tcHV0ZVJlcXVlc3RIZWFkZXJzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2ZvcmVhY2gnKTtcblxuICB2YXIgdWEgPSBvcHRpb25zLmFkZGl0aW9uYWxVQSA/XG4gICAgdGhpcy5fdWEgKyAnOyAnICsgb3B0aW9ucy5hZGRpdGlvbmFsVUEgOlxuICAgIHRoaXMuX3VhO1xuXG4gIHZhciByZXF1ZXN0SGVhZGVycyA9IHtcbiAgICAneC1hbGdvbGlhLWFnZW50JzogdWEsXG4gICAgJ3gtYWxnb2xpYS1hcHBsaWNhdGlvbi1pZCc6IHRoaXMuYXBwbGljYXRpb25JRFxuICB9O1xuXG4gIC8vIGJyb3dzZXIgd2lsbCBpbmxpbmUgaGVhZGVycyBpbiB0aGUgdXJsLCBub2RlLmpzIHdpbGwgdXNlIGh0dHAgaGVhZGVyc1xuICAvLyBidXQgaW4gc29tZSBzaXR1YXRpb25zLCB0aGUgQVBJIEtFWSB3aWxsIGJlIHRvbyBsb25nIChiaWcgc2VjdXJlZCBBUEkga2V5cylcbiAgLy8gc28gaWYgdGhlIHJlcXVlc3QgaXMgYSBQT1NUIGFuZCB0aGUgS0VZIGlzIHZlcnkgbG9uZywgd2Ugd2lsbCBiZSBhc2tlZCB0byBub3QgcHV0XG4gIC8vIGl0IGludG8gaGVhZGVycyBidXQgaW4gdGhlIEpTT04gYm9keVxuICBpZiAob3B0aW9ucy53aXRoQXBpS2V5ICE9PSBmYWxzZSkge1xuICAgIHJlcXVlc3RIZWFkZXJzWyd4LWFsZ29saWEtYXBpLWtleSddID0gdGhpcy5hcGlLZXk7XG4gIH1cblxuICBpZiAodGhpcy51c2VyVG9rZW4pIHtcbiAgICByZXF1ZXN0SGVhZGVyc1sneC1hbGdvbGlhLXVzZXJ0b2tlbiddID0gdGhpcy51c2VyVG9rZW47XG4gIH1cblxuICBpZiAodGhpcy5zZWN1cml0eVRhZ3MpIHtcbiAgICByZXF1ZXN0SGVhZGVyc1sneC1hbGdvbGlhLXRhZ2ZpbHRlcnMnXSA9IHRoaXMuc2VjdXJpdHlUYWdzO1xuICB9XG5cbiAgZm9yRWFjaCh0aGlzLmV4dHJhSGVhZGVycywgZnVuY3Rpb24gYWRkVG9SZXF1ZXN0SGVhZGVycyh2YWx1ZSwga2V5KSB7XG4gICAgcmVxdWVzdEhlYWRlcnNba2V5XSA9IHZhbHVlO1xuICB9KTtcblxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgZm9yRWFjaChvcHRpb25zLmhlYWRlcnMsIGZ1bmN0aW9uIGFkZFRvUmVxdWVzdEhlYWRlcnModmFsdWUsIGtleSkge1xuICAgICAgcmVxdWVzdEhlYWRlcnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJlcXVlc3RIZWFkZXJzO1xufTtcblxuLyoqXG4gKiBTZWFyY2ggdGhyb3VnaCBtdWx0aXBsZSBpbmRpY2VzIGF0IHRoZSBzYW1lIHRpbWVcbiAqIEBwYXJhbSAge09iamVjdFtdfSAgIHF1ZXJpZXMgIEFuIGFycmF5IG9mIHF1ZXJpZXMgeW91IHdhbnQgdG8gcnVuLlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJpZXNbXS5pbmRleE5hbWUgVGhlIGluZGV4IG5hbWUgeW91IHdhbnQgdG8gdGFyZ2V0XG4gKiBAcGFyYW0ge3N0cmluZ30gW3F1ZXJpZXNbXS5xdWVyeV0gVGhlIHF1ZXJ5IHRvIGlzc3VlIG9uIHRoaXMgaW5kZXguIENhbiBhbHNvIGJlIHBhc3NlZCBpbnRvIGBwYXJhbXNgXG4gKiBAcGFyYW0ge09iamVjdH0gcXVlcmllc1tdLnBhcmFtcyBBbnkgc2VhcmNoIHBhcmFtIGxpa2UgaGl0c1BlclBhZ2UsIC4uXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gYmUgY2FsbGVkXG4gKiBAcmV0dXJuIHtQcm9taXNlfHVuZGVmaW5lZH0gUmV0dXJucyBhIHByb21pc2UgaWYgbm8gY2FsbGJhY2sgZ2l2ZW5cbiAqL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uKHF1ZXJpZXMsIG9wdHMsIGNhbGxiYWNrKSB7XG4gIHZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xuICB2YXIgbWFwID0gcmVxdWlyZSgnLi9tYXAuanMnKTtcblxuICB2YXIgdXNhZ2UgPSAnVXNhZ2U6IGNsaWVudC5zZWFyY2goYXJyYXlPZlF1ZXJpZXNbLCBjYWxsYmFja10pJztcblxuICBpZiAoIWlzQXJyYXkocXVlcmllcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodXNhZ2UpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRzO1xuICAgIG9wdHMgPSB7fTtcbiAgfSBlbHNlIGlmIChvcHRzID09PSB1bmRlZmluZWQpIHtcbiAgICBvcHRzID0ge307XG4gIH1cblxuICB2YXIgY2xpZW50ID0gdGhpcztcblxuICB2YXIgcG9zdE9iaiA9IHtcbiAgICByZXF1ZXN0czogbWFwKHF1ZXJpZXMsIGZ1bmN0aW9uIHByZXBhcmVSZXF1ZXN0KHF1ZXJ5KSB7XG4gICAgICB2YXIgcGFyYW1zID0gJyc7XG5cbiAgICAgIC8vIGFsbG93IHF1ZXJ5LnF1ZXJ5XG4gICAgICAvLyBzbyB3ZSBhcmUgbWltaWNpbmcgdGhlIGluZGV4LnNlYXJjaChxdWVyeSwgcGFyYW1zKSBtZXRob2RcbiAgICAgIC8vIHtpbmRleE5hbWU6LCBxdWVyeTosIHBhcmFtczp9XG4gICAgICBpZiAocXVlcnkucXVlcnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYXJhbXMgKz0gJ3F1ZXJ5PScgKyBlbmNvZGVVUklDb21wb25lbnQocXVlcnkucXVlcnkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmRleE5hbWU6IHF1ZXJ5LmluZGV4TmFtZSxcbiAgICAgICAgcGFyYW1zOiBjbGllbnQuX2dldFNlYXJjaFBhcmFtcyhxdWVyeS5wYXJhbXMsIHBhcmFtcylcbiAgICAgIH07XG4gICAgfSlcbiAgfTtcblxuICB2YXIgSlNPTlBQYXJhbXMgPSBtYXAocG9zdE9iai5yZXF1ZXN0cywgZnVuY3Rpb24gcHJlcGFyZUpTT05QUGFyYW1zKHJlcXVlc3QsIHJlcXVlc3RJZCkge1xuICAgIHJldHVybiByZXF1ZXN0SWQgKyAnPScgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAnLzEvaW5kZXhlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlcXVlc3QuaW5kZXhOYW1lKSArICc/JyArXG4gICAgICAgIHJlcXVlc3QucGFyYW1zXG4gICAgICApO1xuICB9KS5qb2luKCcmJyk7XG5cbiAgdmFyIHVybCA9ICcvMS9pbmRleGVzLyovcXVlcmllcyc7XG5cbiAgaWYgKG9wdHMuc3RyYXRlZ3kgIT09IHVuZGVmaW5lZCkge1xuICAgIHBvc3RPYmouc3RyYXRlZ3kgPSBvcHRzLnN0cmF0ZWd5O1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuX2pzb25SZXF1ZXN0KHtcbiAgICBjYWNoZTogdGhpcy5jYWNoZSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6IHVybCxcbiAgICBib2R5OiBwb3N0T2JqLFxuICAgIGhvc3RUeXBlOiAncmVhZCcsXG4gICAgZmFsbGJhY2s6IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6ICcvMS9pbmRleGVzLyonLFxuICAgICAgYm9keToge1xuICAgICAgICBwYXJhbXM6IEpTT05QUGFyYW1zXG4gICAgICB9XG4gICAgfSxcbiAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgfSk7XG59O1xuXG4vKipcbiogU2VhcmNoIGZvciBmYWNldCB2YWx1ZXNcbiogaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZG9jL3Jlc3QtYXBpL3NlYXJjaCNzZWFyY2gtZm9yLWZhY2V0LXZhbHVlc1xuKiBUaGlzIGlzIHRoZSB0b3AtbGV2ZWwgQVBJIGZvciBTRkZWLlxuKlxuKiBAcGFyYW0ge29iamVjdFtdfSBxdWVyaWVzIEFuIGFycmF5IG9mIHF1ZXJpZXMgdG8gcnVuLlxuKiBAcGFyYW0ge3N0cmluZ30gcXVlcmllc1tdLmluZGV4TmFtZSBJbmRleCBuYW1lLCBuYW1lIG9mIHRoZSBpbmRleCB0byBzZWFyY2guXG4qIEBwYXJhbSB7b2JqZWN0fSBxdWVyaWVzW10ucGFyYW1zIFF1ZXJ5IHBhcmFtZXRlcnMuXG4qIEBwYXJhbSB7c3RyaW5nfSBxdWVyaWVzW10ucGFyYW1zLmZhY2V0TmFtZSBGYWNldCBuYW1lLCBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdG8gc2VhcmNoIGZvciB2YWx1ZXMgaW4uXG4qIE11c3QgYmUgZGVjbGFyZWQgYXMgYSBmYWNldFxuKiBAcGFyYW0ge3N0cmluZ30gcXVlcmllc1tdLnBhcmFtcy5mYWNldFF1ZXJ5IFF1ZXJ5IGZvciB0aGUgZmFjZXQgc2VhcmNoXG4qIEBwYXJhbSB7c3RyaW5nfSBbcXVlcmllc1tdLnBhcmFtcy4qXSBBbnkgc2VhcmNoIHBhcmFtZXRlciBvZiBBbGdvbGlhLFxuKiBzZWUgaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZG9jL2FwaS1jbGllbnQvamF2YXNjcmlwdC9zZWFyY2gjc2VhcmNoLXBhcmFtZXRlcnNcbiogUGFnaW5hdGlvbiBpcyBub3Qgc3VwcG9ydGVkLiBUaGUgcGFnZSBhbmQgaGl0c1BlclBhZ2UgcGFyYW1ldGVycyB3aWxsIGJlIGlnbm9yZWQuXG4qL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLnNlYXJjaEZvckZhY2V0VmFsdWVzID0gZnVuY3Rpb24ocXVlcmllcykge1xuICB2YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbiAgdmFyIG1hcCA9IHJlcXVpcmUoJy4vbWFwLmpzJyk7XG5cbiAgdmFyIHVzYWdlID0gJ1VzYWdlOiBjbGllbnQuc2VhcmNoRm9yRmFjZXRWYWx1ZXMoW3tpbmRleE5hbWUsIHBhcmFtczoge2ZhY2V0TmFtZSwgZmFjZXRRdWVyeSwgLi4ucGFyYW1zfX0sIC4uLnF1ZXJpZXNdKSc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbWF4LWxlblxuXG4gIGlmICghaXNBcnJheShxdWVyaWVzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcih1c2FnZSk7XG4gIH1cblxuICB2YXIgY2xpZW50ID0gdGhpcztcblxuICByZXR1cm4gY2xpZW50Ll9wcm9taXNlLmFsbChtYXAocXVlcmllcywgZnVuY3Rpb24gcGVyZm9ybVF1ZXJ5KHF1ZXJ5KSB7XG4gICAgaWYgKFxuICAgICAgIXF1ZXJ5IHx8XG4gICAgICBxdWVyeS5pbmRleE5hbWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgcXVlcnkucGFyYW1zLmZhY2V0TmFtZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBxdWVyeS5wYXJhbXMuZmFjZXRRdWVyeSA9PT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodXNhZ2UpO1xuICAgIH1cblxuICAgIHZhciBjbG9uZSA9IHJlcXVpcmUoJy4vY2xvbmUuanMnKTtcbiAgICB2YXIgb21pdCA9IHJlcXVpcmUoJy4vb21pdC5qcycpO1xuXG4gICAgdmFyIGluZGV4TmFtZSA9IHF1ZXJ5LmluZGV4TmFtZTtcbiAgICB2YXIgcGFyYW1zID0gcXVlcnkucGFyYW1zO1xuXG4gICAgdmFyIGZhY2V0TmFtZSA9IHBhcmFtcy5mYWNldE5hbWU7XG4gICAgdmFyIGZpbHRlcmVkUGFyYW1zID0gb21pdChjbG9uZShwYXJhbXMpLCBmdW5jdGlvbihrZXlOYW1lKSB7XG4gICAgICByZXR1cm4ga2V5TmFtZSA9PT0gJ2ZhY2V0TmFtZSc7XG4gICAgfSk7XG4gICAgdmFyIHNlYXJjaFBhcmFtZXRlcnMgPSBjbGllbnQuX2dldFNlYXJjaFBhcmFtcyhmaWx0ZXJlZFBhcmFtcywgJycpO1xuXG4gICAgcmV0dXJuIGNsaWVudC5fanNvblJlcXVlc3Qoe1xuICAgICAgY2FjaGU6IGNsaWVudC5jYWNoZSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOlxuICAgICAgICAnLzEvaW5kZXhlcy8nICtcbiAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGluZGV4TmFtZSkgK1xuICAgICAgICAnL2ZhY2V0cy8nICtcbiAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGZhY2V0TmFtZSkgK1xuICAgICAgICAnL3F1ZXJ5JyxcbiAgICAgIGhvc3RUeXBlOiAncmVhZCcsXG4gICAgICBib2R5OiB7cGFyYW1zOiBzZWFyY2hQYXJhbWV0ZXJzfVxuICAgIH0pO1xuICB9KSk7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgZXh0cmEgc2VjdXJpdHkgdGFnRmlsdGVycyBoZWFkZXJcbiAqIEBwYXJhbSB7c3RyaW5nfGFycmF5fSB0YWdzIFRoZSBsaXN0IG9mIHRhZ3MgZGVmaW5pbmcgdGhlIGN1cnJlbnQgc2VjdXJpdHkgZmlsdGVyc1xuICovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuc2V0U2VjdXJpdHlUYWdzID0gZnVuY3Rpb24odGFncykge1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRhZ3MpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgdmFyIHN0clRhZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGFnc1tpXSkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgdmFyIG9yZWRUYWdzID0gW107XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGFnc1tpXS5sZW5ndGg7ICsraikge1xuICAgICAgICAgIG9yZWRUYWdzLnB1c2godGFnc1tpXVtqXSk7XG4gICAgICAgIH1cbiAgICAgICAgc3RyVGFncy5wdXNoKCcoJyArIG9yZWRUYWdzLmpvaW4oJywnKSArICcpJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHJUYWdzLnB1c2godGFnc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRhZ3MgPSBzdHJUYWdzLmpvaW4oJywnKTtcbiAgfVxuXG4gIHRoaXMuc2VjdXJpdHlUYWdzID0gdGFncztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBleHRyYSB1c2VyIHRva2VuIGhlYWRlclxuICogQHBhcmFtIHtzdHJpbmd9IHVzZXJUb2tlbiBUaGUgdG9rZW4gaWRlbnRpZnlpbmcgYSB1bmlxIHVzZXIgKHVzZWQgdG8gYXBwbHkgcmF0ZSBsaW1pdHMpXG4gKi9cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5zZXRVc2VyVG9rZW4gPSBmdW5jdGlvbih1c2VyVG9rZW4pIHtcbiAgdGhpcy51c2VyVG9rZW4gPSB1c2VyVG9rZW47XG59O1xuXG4vKipcbiAqIENsZWFyIGFsbCBxdWVyaWVzIGluIGNsaWVudCdzIGNhY2hlXG4gKiBAcmV0dXJuIHVuZGVmaW5lZFxuICovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNhY2hlID0ge307XG59O1xuXG4vKipcbiogU2V0IHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGEgcmVxdWVzdCBjYW4gdGFrZSBiZWZvcmUgYXV0b21hdGljYWxseSBiZWluZyB0ZXJtaW5hdGVkLlxuKiBAZGVwcmVjYXRlZFxuKiBAcGFyYW0ge051bWJlcn0gbWlsbGlzZWNvbmRzXG4qL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLnNldFJlcXVlc3RUaW1lb3V0ID0gZnVuY3Rpb24obWlsbGlzZWNvbmRzKSB7XG4gIGlmIChtaWxsaXNlY29uZHMpIHtcbiAgICB0aGlzLl90aW1lb3V0cy5jb25uZWN0ID0gdGhpcy5fdGltZW91dHMucmVhZCA9IHRoaXMuX3RpbWVvdXRzLndyaXRlID0gbWlsbGlzZWNvbmRzO1xuICB9XG59O1xuXG4vKipcbiogU2V0IHRoZSB0aHJlZSBkaWZmZXJlbnQgKGNvbm5lY3QsIHJlYWQsIHdyaXRlKSB0aW1lb3V0cyB0byBiZSB1c2VkIHdoZW4gcmVxdWVzdGluZ1xuKiBAcGFyYW0ge09iamVjdH0gdGltZW91dHNcbiovXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuc2V0VGltZW91dHMgPSBmdW5jdGlvbih0aW1lb3V0cykge1xuICB0aGlzLl90aW1lb3V0cyA9IHRpbWVvdXRzO1xufTtcblxuLyoqXG4qIEdldCB0aGUgdGhyZWUgZGlmZmVyZW50IChjb25uZWN0LCByZWFkLCB3cml0ZSkgdGltZW91dHMgdG8gYmUgdXNlZCB3aGVuIHJlcXVlc3RpbmdcbiogQHBhcmFtIHtPYmplY3R9IHRpbWVvdXRzXG4qL1xuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLmdldFRpbWVvdXRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl90aW1lb3V0cztcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fZ2V0QXBwSWREYXRhID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkYXRhID0gc3RvcmUuZ2V0KHRoaXMuYXBwbGljYXRpb25JRCk7XG4gIGlmIChkYXRhICE9PSBudWxsKSB0aGlzLl9jYWNoZUFwcElkRGF0YShkYXRhKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX3NldEFwcElkRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgZGF0YS5sYXN0Q2hhbmdlID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgdGhpcy5fY2FjaGVBcHBJZERhdGEoZGF0YSk7XG4gIHJldHVybiBzdG9yZS5zZXQodGhpcy5hcHBsaWNhdGlvbklELCBkYXRhKTtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fY2hlY2tBcHBJZERhdGEgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9nZXRBcHBJZERhdGEoKTtcbiAgdmFyIG5vdyA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gIGlmIChkYXRhID09PSBudWxsIHx8IG5vdyAtIGRhdGEubGFzdENoYW5nZSA+IFJFU0VUX0FQUF9EQVRBX1RJTUVSKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc2V0SW5pdGlhbEFwcElkRGF0YShkYXRhKTtcbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9yZXNldEluaXRpYWxBcHBJZERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHZhciBuZXdEYXRhID0gZGF0YSB8fCB7fTtcbiAgbmV3RGF0YS5ob3N0SW5kZXhlcyA9IHtyZWFkOiAwLCB3cml0ZTogMH07XG4gIG5ld0RhdGEudGltZW91dE11bHRpcGxpZXIgPSAxO1xuICBuZXdEYXRhLnNodWZmbGVSZXN1bHQgPSBuZXdEYXRhLnNodWZmbGVSZXN1bHQgfHwgc2h1ZmZsZShbMSwgMiwgM10pO1xuICByZXR1cm4gdGhpcy5fc2V0QXBwSWREYXRhKG5ld0RhdGEpO1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9jYWNoZUFwcElkRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdGhpcy5faG9zdEluZGV4ZXMgPSBkYXRhLmhvc3RJbmRleGVzO1xuICB0aGlzLl90aW1lb3V0TXVsdGlwbGllciA9IGRhdGEudGltZW91dE11bHRpcGxpZXI7XG4gIHRoaXMuX3NodWZmbGVSZXN1bHQgPSBkYXRhLnNodWZmbGVSZXN1bHQ7XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX3BhcnRpYWxBcHBJZERhdGFVcGRhdGUgPSBmdW5jdGlvbihuZXdEYXRhKSB7XG4gIHZhciBmb3JlYWNoID0gcmVxdWlyZSgnZm9yZWFjaCcpO1xuICB2YXIgY3VycmVudERhdGEgPSB0aGlzLl9nZXRBcHBJZERhdGEoKTtcbiAgZm9yZWFjaChuZXdEYXRhLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgY3VycmVudERhdGFba2V5XSA9IHZhbHVlO1xuICB9KTtcblxuICByZXR1cm4gdGhpcy5fc2V0QXBwSWREYXRhKGN1cnJlbnREYXRhKTtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fZ2V0SG9zdEJ5VHlwZSA9IGZ1bmN0aW9uKGhvc3RUeXBlKSB7XG4gIHJldHVybiB0aGlzLmhvc3RzW2hvc3RUeXBlXVt0aGlzLl9nZXRIb3N0SW5kZXhCeVR5cGUoaG9zdFR5cGUpXTtcbn07XG5cbkFsZ29saWFTZWFyY2hDb3JlLnByb3RvdHlwZS5fZ2V0VGltZW91dE11bHRpcGxpZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX3RpbWVvdXRNdWx0aXBsaWVyO1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9nZXRIb3N0SW5kZXhCeVR5cGUgPSBmdW5jdGlvbihob3N0VHlwZSkge1xuICByZXR1cm4gdGhpcy5faG9zdEluZGV4ZXNbaG9zdFR5cGVdO1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9zZXRIb3N0SW5kZXhCeVR5cGUgPSBmdW5jdGlvbihob3N0SW5kZXgsIGhvc3RUeXBlKSB7XG4gIHZhciBjbG9uZSA9IHJlcXVpcmUoJy4vY2xvbmUnKTtcbiAgdmFyIG5ld0hvc3RJbmRleGVzID0gY2xvbmUodGhpcy5faG9zdEluZGV4ZXMpO1xuICBuZXdIb3N0SW5kZXhlc1tob3N0VHlwZV0gPSBob3N0SW5kZXg7XG4gIHRoaXMuX3BhcnRpYWxBcHBJZERhdGFVcGRhdGUoe2hvc3RJbmRleGVzOiBuZXdIb3N0SW5kZXhlc30pO1xuICByZXR1cm4gaG9zdEluZGV4O1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9pbmNyZW1lbnRIb3N0SW5kZXggPSBmdW5jdGlvbihob3N0VHlwZSkge1xuICByZXR1cm4gdGhpcy5fc2V0SG9zdEluZGV4QnlUeXBlKFxuICAgICh0aGlzLl9nZXRIb3N0SW5kZXhCeVR5cGUoaG9zdFR5cGUpICsgMSkgJSB0aGlzLmhvc3RzW2hvc3RUeXBlXS5sZW5ndGgsIGhvc3RUeXBlXG4gICk7XG59O1xuXG5BbGdvbGlhU2VhcmNoQ29yZS5wcm90b3R5cGUuX2luY3JlbWVudFRpbWVvdXRNdWx0aXBsZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRpbWVvdXRNdWx0aXBsaWVyID0gTWF0aC5tYXgodGhpcy5fdGltZW91dE11bHRpcGxpZXIgKyAxLCA0KTtcbiAgcmV0dXJuIHRoaXMuX3BhcnRpYWxBcHBJZERhdGFVcGRhdGUoe3RpbWVvdXRNdWx0aXBsaWVyOiB0aW1lb3V0TXVsdGlwbGllcn0pO1xufTtcblxuQWxnb2xpYVNlYXJjaENvcmUucHJvdG90eXBlLl9nZXRUaW1lb3V0c0ZvclJlcXVlc3QgPSBmdW5jdGlvbihob3N0VHlwZSkge1xuICByZXR1cm4ge1xuICAgIGNvbm5lY3Q6IHRoaXMuX3RpbWVvdXRzLmNvbm5lY3QgKiB0aGlzLl90aW1lb3V0TXVsdGlwbGllcixcbiAgICBjb21wbGV0ZTogdGhpcy5fdGltZW91dHNbaG9zdFR5cGVdICogdGhpcy5fdGltZW91dE11bHRpcGxpZXJcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHByZXBhcmVIb3N0KHByb3RvY29sKSB7XG4gIHJldHVybiBmdW5jdGlvbiBwcmVwYXJlKGhvc3QpIHtcbiAgICByZXR1cm4gcHJvdG9jb2wgKyAnLy8nICsgaG9zdC50b0xvd2VyQ2FzZSgpO1xuICB9O1xufVxuXG4vLyBQcm90b3R5cGUuanMgPCAxLjcsIGEgd2lkZWx5IHVzZWQgbGlicmFyeSwgZGVmaW5lcyBhIHdlaXJkXG4vLyBBcnJheS5wcm90b3R5cGUudG9KU09OIGZ1bmN0aW9uIHRoYXQgd2lsbCBmYWlsIHRvIHN0cmluZ2lmeSBvdXIgY29udGVudFxuLy8gYXBwcm9wcmlhdGVseVxuLy8gcmVmczpcbi8vICAgLSBodHRwczovL2dyb3Vwcy5nb29nbGUuY29tL2ZvcnVtLyMhdG9waWMvcHJvdG90eXBlLWNvcmUvRS1TQVZ2Vl9WOVFcbi8vICAgLSBodHRwczovL2dpdGh1Yi5jb20vc3N0ZXBoZW5zb24vcHJvdG90eXBlL2NvbW1pdC8wMzhhMjk4NWE3MDU5M2MxYTg2YzIzMGZhZGJkZmUyZTQ4OThhNDhjXG4vLyAgIC0gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzE0ODQ0MS8xNDcwNzlcbmZ1bmN0aW9uIHNhZmVKU09OU3RyaW5naWZ5KG9iaikge1xuICAvKiBlc2xpbnQgbm8tZXh0ZW5kLW5hdGl2ZTowICovXG5cbiAgaWYgKEFycmF5LnByb3RvdHlwZS50b0pTT04gPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICB9XG5cbiAgdmFyIHRvSlNPTiA9IEFycmF5LnByb3RvdHlwZS50b0pTT047XG4gIGRlbGV0ZSBBcnJheS5wcm90b3R5cGUudG9KU09OO1xuICB2YXIgb3V0ID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgQXJyYXkucHJvdG90eXBlLnRvSlNPTiA9IHRvSlNPTjtcblxuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gIHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGg7XG4gIHZhciB0ZW1wb3JhcnlWYWx1ZTtcbiAgdmFyIHJhbmRvbUluZGV4O1xuXG4gIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gIHdoaWxlIChjdXJyZW50SW5kZXggIT09IDApIHtcbiAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgY3VycmVudEluZGV4IC09IDE7XG5cbiAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gIH1cblxuICByZXR1cm4gYXJyYXk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNyZWRlbnRpYWxzKGhlYWRlcnMpIHtcbiAgdmFyIG5ld0hlYWRlcnMgPSB7fTtcblxuICBmb3IgKHZhciBoZWFkZXJOYW1lIGluIGhlYWRlcnMpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhlYWRlcnMsIGhlYWRlck5hbWUpKSB7XG4gICAgICB2YXIgdmFsdWU7XG5cbiAgICAgIGlmIChoZWFkZXJOYW1lID09PSAneC1hbGdvbGlhLWFwaS1rZXknIHx8IGhlYWRlck5hbWUgPT09ICd4LWFsZ29saWEtYXBwbGljYXRpb24taWQnKSB7XG4gICAgICAgIHZhbHVlID0gJyoqaGlkZGVuIGZvciBzZWN1cml0eSBwdXJwb3NlcyoqJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gaGVhZGVyc1toZWFkZXJOYW1lXTtcbiAgICAgIH1cblxuICAgICAgbmV3SGVhZGVyc1toZWFkZXJOYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdIZWFkZXJzO1xufVxuIiwidmFyIGJ1aWxkU2VhcmNoTWV0aG9kID0gcmVxdWlyZSgnLi9idWlsZFNlYXJjaE1ldGhvZC5qcycpO1xudmFyIGRlcHJlY2F0ZSA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlLmpzJyk7XG52YXIgZGVwcmVjYXRlZE1lc3NhZ2UgPSByZXF1aXJlKCcuL2RlcHJlY2F0ZWRNZXNzYWdlLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5kZXhDb3JlO1xuXG4vKlxuKiBJbmRleCBjbGFzcyBjb25zdHJ1Y3Rvci5cbiogWW91IHNob3VsZCBub3QgdXNlIHRoaXMgbWV0aG9kIGRpcmVjdGx5IGJ1dCB1c2UgaW5pdEluZGV4KCkgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiBJbmRleENvcmUoYWxnb2xpYXNlYXJjaCwgaW5kZXhOYW1lKSB7XG4gIHRoaXMuaW5kZXhOYW1lID0gaW5kZXhOYW1lO1xuICB0aGlzLmFzID0gYWxnb2xpYXNlYXJjaDtcbiAgdGhpcy50eXBlQWhlYWRBcmdzID0gbnVsbDtcbiAgdGhpcy50eXBlQWhlYWRWYWx1ZU9wdGlvbiA9IG51bGw7XG5cbiAgLy8gbWFrZSBzdXJlIGV2ZXJ5IGluZGV4IGluc3RhbmNlIGhhcyBpdCdzIG93biBjYWNoZVxuICB0aGlzLmNhY2hlID0ge307XG59XG5cbi8qXG4qIENsZWFyIGFsbCBxdWVyaWVzIGluIGNhY2hlXG4qL1xuSW5kZXhDb3JlLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2FjaGUgPSB7fTtcbn07XG5cbi8qXG4qIFNlYXJjaCBpbnNpZGUgdGhlIGluZGV4IHVzaW5nIFhNTEh0dHBSZXF1ZXN0IHJlcXVlc3QgKFVzaW5nIGEgUE9TVCBxdWVyeSB0b1xuKiBtaW5pbWl6ZSBudW1iZXIgb2YgT1BUSU9OUyBxdWVyaWVzOiBDcm9zcy1PcmlnaW4gUmVzb3VyY2UgU2hhcmluZykuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBbcXVlcnldIHRoZSBmdWxsIHRleHQgcXVlcnlcbiogQHBhcmFtIHtvYmplY3R9IFthcmdzXSAob3B0aW9uYWwpIGlmIHNldCwgY29udGFpbnMgYW4gb2JqZWN0IHdpdGggcXVlcnkgcGFyYW1ldGVyczpcbiogLSBwYWdlOiAoaW50ZWdlcikgUGFnaW5hdGlvbiBwYXJhbWV0ZXIgdXNlZCB0byBzZWxlY3QgdGhlIHBhZ2UgdG8gcmV0cmlldmUuXG4qICAgICAgICAgICAgICAgICAgIFBhZ2UgaXMgemVyby1iYXNlZCBhbmQgZGVmYXVsdHMgdG8gMC4gVGh1cyxcbiogICAgICAgICAgICAgICAgICAgdG8gcmV0cmlldmUgdGhlIDEwdGggcGFnZSB5b3UgbmVlZCB0byBzZXQgcGFnZT05XG4qIC0gaGl0c1BlclBhZ2U6IChpbnRlZ2VyKSBQYWdpbmF0aW9uIHBhcmFtZXRlciB1c2VkIHRvIHNlbGVjdCB0aGUgbnVtYmVyIG9mIGhpdHMgcGVyIHBhZ2UuIERlZmF1bHRzIHRvIDIwLlxuKiAtIGF0dHJpYnV0ZXNUb1JldHJpZXZlOiBhIHN0cmluZyB0aGF0IGNvbnRhaW5zIHRoZSBsaXN0IG9mIG9iamVjdCBhdHRyaWJ1dGVzXG4qIHlvdSB3YW50IHRvIHJldHJpZXZlIChsZXQgeW91IG1pbmltaXplIHRoZSBhbnN3ZXIgc2l6ZSkuXG4qICAgQXR0cmlidXRlcyBhcmUgc2VwYXJhdGVkIHdpdGggYSBjb21tYSAoZm9yIGV4YW1wbGUgXCJuYW1lLGFkZHJlc3NcIikuXG4qICAgWW91IGNhbiBhbHNvIHVzZSBhbiBhcnJheSAoZm9yIGV4YW1wbGUgW1wibmFtZVwiLFwiYWRkcmVzc1wiXSkuXG4qICAgQnkgZGVmYXVsdCwgYWxsIGF0dHJpYnV0ZXMgYXJlIHJldHJpZXZlZC4gWW91IGNhbiBhbHNvIHVzZSAnKicgdG8gcmV0cmlldmUgYWxsXG4qICAgdmFsdWVzIHdoZW4gYW4gYXR0cmlidXRlc1RvUmV0cmlldmUgc2V0dGluZyBpcyBzcGVjaWZpZWQgZm9yIHlvdXIgaW5kZXguXG4qIC0gYXR0cmlidXRlc1RvSGlnaGxpZ2h0OiBhIHN0cmluZyB0aGF0IGNvbnRhaW5zIHRoZSBsaXN0IG9mIGF0dHJpYnV0ZXMgeW91XG4qICAgd2FudCB0byBoaWdobGlnaHQgYWNjb3JkaW5nIHRvIHRoZSBxdWVyeS5cbiogICBBdHRyaWJ1dGVzIGFyZSBzZXBhcmF0ZWQgYnkgYSBjb21tYS4gWW91IGNhbiBhbHNvIHVzZSBhbiBhcnJheSAoZm9yIGV4YW1wbGUgW1wibmFtZVwiLFwiYWRkcmVzc1wiXSkuXG4qICAgSWYgYW4gYXR0cmlidXRlIGhhcyBubyBtYXRjaCBmb3IgdGhlIHF1ZXJ5LCB0aGUgcmF3IHZhbHVlIGlzIHJldHVybmVkLlxuKiAgIEJ5IGRlZmF1bHQgYWxsIGluZGV4ZWQgdGV4dCBhdHRyaWJ1dGVzIGFyZSBoaWdobGlnaHRlZC5cbiogICBZb3UgY2FuIHVzZSBgKmAgaWYgeW91IHdhbnQgdG8gaGlnaGxpZ2h0IGFsbCB0ZXh0dWFsIGF0dHJpYnV0ZXMuXG4qICAgTnVtZXJpY2FsIGF0dHJpYnV0ZXMgYXJlIG5vdCBoaWdobGlnaHRlZC5cbiogICBBIG1hdGNoTGV2ZWwgaXMgcmV0dXJuZWQgZm9yIGVhY2ggaGlnaGxpZ2h0ZWQgYXR0cmlidXRlIGFuZCBjYW4gY29udGFpbjpcbiogICAgICAtIGZ1bGw6IGlmIGFsbCB0aGUgcXVlcnkgdGVybXMgd2VyZSBmb3VuZCBpbiB0aGUgYXR0cmlidXRlLFxuKiAgICAgIC0gcGFydGlhbDogaWYgb25seSBzb21lIG9mIHRoZSBxdWVyeSB0ZXJtcyB3ZXJlIGZvdW5kLFxuKiAgICAgIC0gbm9uZTogaWYgbm9uZSBvZiB0aGUgcXVlcnkgdGVybXMgd2VyZSBmb3VuZC5cbiogLSBhdHRyaWJ1dGVzVG9TbmlwcGV0OiBhIHN0cmluZyB0aGF0IGNvbnRhaW5zIHRoZSBsaXN0IG9mIGF0dHJpYnV0ZXMgdG8gc25pcHBldCBhbG9uZ3NpZGVcbiogdGhlIG51bWJlciBvZiB3b3JkcyB0byByZXR1cm4gKHN5bnRheCBpcyBgYXR0cmlidXRlTmFtZTpuYldvcmRzYCkuXG4qICAgIEF0dHJpYnV0ZXMgYXJlIHNlcGFyYXRlZCBieSBhIGNvbW1hIChFeGFtcGxlOiBhdHRyaWJ1dGVzVG9TbmlwcGV0PW5hbWU6MTAsY29udGVudDoxMCkuXG4qICAgIFlvdSBjYW4gYWxzbyB1c2UgYW4gYXJyYXkgKEV4YW1wbGU6IGF0dHJpYnV0ZXNUb1NuaXBwZXQ6IFsnbmFtZToxMCcsJ2NvbnRlbnQ6MTAnXSkuXG4qICAgIEJ5IGRlZmF1bHQgbm8gc25pcHBldCBpcyBjb21wdXRlZC5cbiogLSBtaW5Xb3JkU2l6ZWZvcjFUeXBvOiB0aGUgbWluaW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyBpbiBhIHF1ZXJ5IHdvcmQgdG8gYWNjZXB0IG9uZSB0eXBvIGluIHRoaXMgd29yZC5cbiogRGVmYXVsdHMgdG8gMy5cbiogLSBtaW5Xb3JkU2l6ZWZvcjJUeXBvczogdGhlIG1pbmltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgaW4gYSBxdWVyeSB3b3JkXG4qIHRvIGFjY2VwdCB0d28gdHlwb3MgaW4gdGhpcyB3b3JkLiBEZWZhdWx0cyB0byA3LlxuKiAtIGdldFJhbmtpbmdJbmZvOiBpZiBzZXQgdG8gMSwgdGhlIHJlc3VsdCBoaXRzIHdpbGwgY29udGFpbiByYW5raW5nXG4qIGluZm9ybWF0aW9uIGluIF9yYW5raW5nSW5mbyBhdHRyaWJ1dGUuXG4qIC0gYXJvdW5kTGF0TG5nOiBzZWFyY2ggZm9yIGVudHJpZXMgYXJvdW5kIGEgZ2l2ZW5cbiogbGF0aXR1ZGUvbG9uZ2l0dWRlIChzcGVjaWZpZWQgYXMgdHdvIGZsb2F0cyBzZXBhcmF0ZWQgYnkgYSBjb21tYSkuXG4qICAgRm9yIGV4YW1wbGUgYXJvdW5kTGF0TG5nPTQ3LjMxNjY2OSw1LjAxNjY3MCkuXG4qICAgWW91IGNhbiBzcGVjaWZ5IHRoZSBtYXhpbXVtIGRpc3RhbmNlIGluIG1ldGVycyB3aXRoIHRoZSBhcm91bmRSYWRpdXMgcGFyYW1ldGVyIChpbiBtZXRlcnMpXG4qICAgYW5kIHRoZSBwcmVjaXNpb24gZm9yIHJhbmtpbmcgd2l0aCBhcm91bmRQcmVjaXNpb25cbiogICAoZm9yIGV4YW1wbGUgaWYgeW91IHNldCBhcm91bmRQcmVjaXNpb249MTAwLCB0d28gb2JqZWN0cyB0aGF0IGFyZSBkaXN0YW50IG9mXG4qICAgbGVzcyB0aGFuIDEwMG0gd2lsbCBiZSBjb25zaWRlcmVkIGFzIGlkZW50aWNhbCBmb3IgXCJnZW9cIiByYW5raW5nIHBhcmFtZXRlcikuXG4qICAgQXQgaW5kZXhpbmcsIHlvdSBzaG91bGQgc3BlY2lmeSBnZW9sb2Mgb2YgYW4gb2JqZWN0IHdpdGggdGhlIF9nZW9sb2MgYXR0cmlidXRlXG4qICAgKGluIHRoZSBmb3JtIHtcIl9nZW9sb2NcIjp7XCJsYXRcIjo0OC44NTM0MDksIFwibG5nXCI6Mi4zNDg4MDB9fSlcbiogLSBpbnNpZGVCb3VuZGluZ0JveDogc2VhcmNoIGVudHJpZXMgaW5zaWRlIGEgZ2l2ZW4gYXJlYSBkZWZpbmVkIGJ5IHRoZSB0d28gZXh0cmVtZSBwb2ludHNcbiogb2YgYSByZWN0YW5nbGUgKGRlZmluZWQgYnkgNCBmbG9hdHM6IHAxTGF0LHAxTG5nLHAyTGF0LHAyTG5nKS5cbiogICBGb3IgZXhhbXBsZSBpbnNpZGVCb3VuZGluZ0JveD00Ny4zMTY1LDQuOTY2NSw0Ny4zNDI0LDUuMDIwMSkuXG4qICAgQXQgaW5kZXhpbmcsIHlvdSBzaG91bGQgc3BlY2lmeSBnZW9sb2Mgb2YgYW4gb2JqZWN0IHdpdGggdGhlIF9nZW9sb2MgYXR0cmlidXRlXG4qICAgKGluIHRoZSBmb3JtIHtcIl9nZW9sb2NcIjp7XCJsYXRcIjo0OC44NTM0MDksIFwibG5nXCI6Mi4zNDg4MDB9fSlcbiogLSBudW1lcmljRmlsdGVyczogYSBzdHJpbmcgdGhhdCBjb250YWlucyB0aGUgbGlzdCBvZiBudW1lcmljIGZpbHRlcnMgeW91IHdhbnQgdG9cbiogYXBwbHkgc2VwYXJhdGVkIGJ5IGEgY29tbWEuXG4qICAgVGhlIHN5bnRheCBvZiBvbmUgZmlsdGVyIGlzIGBhdHRyaWJ1dGVOYW1lYCBmb2xsb3dlZCBieSBgb3BlcmFuZGAgZm9sbG93ZWQgYnkgYHZhbHVlYC5cbiogICBTdXBwb3J0ZWQgb3BlcmFuZHMgYXJlIGA8YCwgYDw9YCwgYD1gLCBgPmAgYW5kIGA+PWAuXG4qICAgWW91IGNhbiBoYXZlIG11bHRpcGxlIGNvbmRpdGlvbnMgb24gb25lIGF0dHJpYnV0ZSBsaWtlIGZvciBleGFtcGxlIG51bWVyaWNGaWx0ZXJzPXByaWNlPjEwMCxwcmljZTwxMDAwLlxuKiAgIFlvdSBjYW4gYWxzbyB1c2UgYW4gYXJyYXkgKGZvciBleGFtcGxlIG51bWVyaWNGaWx0ZXJzOiBbXCJwcmljZT4xMDBcIixcInByaWNlPDEwMDBcIl0pLlxuKiAtIHRhZ0ZpbHRlcnM6IGZpbHRlciB0aGUgcXVlcnkgYnkgYSBzZXQgb2YgdGFncy4gWW91IGNhbiBBTkQgdGFncyBieSBzZXBhcmF0aW5nIHRoZW0gYnkgY29tbWFzLlxuKiAgIFRvIE9SIHRhZ3MsIHlvdSBtdXN0IGFkZCBwYXJlbnRoZXNlcy4gRm9yIGV4YW1wbGUsIHRhZ3M9dGFnMSwodGFnMix0YWczKSBtZWFucyB0YWcxIEFORCAodGFnMiBPUiB0YWczKS5cbiogICBZb3UgY2FuIGFsc28gdXNlIGFuIGFycmF5LCBmb3IgZXhhbXBsZSB0YWdGaWx0ZXJzOiBbXCJ0YWcxXCIsW1widGFnMlwiLFwidGFnM1wiXV1cbiogICBtZWFucyB0YWcxIEFORCAodGFnMiBPUiB0YWczKS5cbiogICBBdCBpbmRleGluZywgdGFncyBzaG91bGQgYmUgYWRkZWQgaW4gdGhlIF90YWdzKiogYXR0cmlidXRlXG4qICAgb2Ygb2JqZWN0cyAoZm9yIGV4YW1wbGUge1wiX3RhZ3NcIjpbXCJ0YWcxXCIsXCJ0YWcyXCJdfSkuXG4qIC0gZmFjZXRGaWx0ZXJzOiBmaWx0ZXIgdGhlIHF1ZXJ5IGJ5IGEgbGlzdCBvZiBmYWNldHMuXG4qICAgRmFjZXRzIGFyZSBzZXBhcmF0ZWQgYnkgY29tbWFzIGFuZCBlYWNoIGZhY2V0IGlzIGVuY29kZWQgYXMgYGF0dHJpYnV0ZU5hbWU6dmFsdWVgLlxuKiAgIEZvciBleGFtcGxlOiBgZmFjZXRGaWx0ZXJzPWNhdGVnb3J5OkJvb2ssYXV0aG9yOkpvaG4lMjBEb2VgLlxuKiAgIFlvdSBjYW4gYWxzbyB1c2UgYW4gYXJyYXkgKGZvciBleGFtcGxlIGBbXCJjYXRlZ29yeTpCb29rXCIsXCJhdXRob3I6Sm9obiUyMERvZVwiXWApLlxuKiAtIGZhY2V0czogTGlzdCBvZiBvYmplY3QgYXR0cmlidXRlcyB0aGF0IHlvdSB3YW50IHRvIHVzZSBmb3IgZmFjZXRpbmcuXG4qICAgQ29tbWEgc2VwYXJhdGVkIGxpc3Q6IGBcImNhdGVnb3J5LGF1dGhvclwiYCBvciBhcnJheSBgWydjYXRlZ29yeScsJ2F1dGhvciddYFxuKiAgIE9ubHkgYXR0cmlidXRlcyB0aGF0IGhhdmUgYmVlbiBhZGRlZCBpbiAqKmF0dHJpYnV0ZXNGb3JGYWNldGluZyoqIGluZGV4IHNldHRpbmdcbiogICBjYW4gYmUgdXNlZCBpbiB0aGlzIHBhcmFtZXRlci5cbiogICBZb3UgY2FuIGFsc28gdXNlIGAqYCB0byBwZXJmb3JtIGZhY2V0aW5nIG9uIGFsbCBhdHRyaWJ1dGVzIHNwZWNpZmllZCBpbiAqKmF0dHJpYnV0ZXNGb3JGYWNldGluZyoqLlxuKiAtIHF1ZXJ5VHlwZTogc2VsZWN0IGhvdyB0aGUgcXVlcnkgd29yZHMgYXJlIGludGVycHJldGVkLCBpdCBjYW4gYmUgb25lIG9mIHRoZSBmb2xsb3dpbmcgdmFsdWU6XG4qICAgIC0gcHJlZml4QWxsOiBhbGwgcXVlcnkgd29yZHMgYXJlIGludGVycHJldGVkIGFzIHByZWZpeGVzLFxuKiAgICAtIHByZWZpeExhc3Q6IG9ubHkgdGhlIGxhc3Qgd29yZCBpcyBpbnRlcnByZXRlZCBhcyBhIHByZWZpeCAoZGVmYXVsdCBiZWhhdmlvciksXG4qICAgIC0gcHJlZml4Tm9uZTogbm8gcXVlcnkgd29yZCBpcyBpbnRlcnByZXRlZCBhcyBhIHByZWZpeC4gVGhpcyBvcHRpb24gaXMgbm90IHJlY29tbWVuZGVkLlxuKiAtIG9wdGlvbmFsV29yZHM6IGEgc3RyaW5nIHRoYXQgY29udGFpbnMgdGhlIGxpc3Qgb2Ygd29yZHMgdGhhdCBzaG91bGRcbiogYmUgY29uc2lkZXJlZCBhcyBvcHRpb25hbCB3aGVuIGZvdW5kIGluIHRoZSBxdWVyeS5cbiogICBDb21tYSBzZXBhcmF0ZWQgYW5kIGFycmF5IGFyZSBhY2NlcHRlZC5cbiogLSBkaXN0aW5jdDogSWYgc2V0IHRvIDEsIGVuYWJsZSB0aGUgZGlzdGluY3QgZmVhdHVyZSAoZGlzYWJsZWQgYnkgZGVmYXVsdClcbiogaWYgdGhlIGF0dHJpYnV0ZUZvckRpc3RpbmN0IGluZGV4IHNldHRpbmcgaXMgc2V0LlxuKiAgIFRoaXMgZmVhdHVyZSBpcyBzaW1pbGFyIHRvIHRoZSBTUUwgXCJkaXN0aW5jdFwiIGtleXdvcmQ6IHdoZW4gZW5hYmxlZFxuKiAgIGluIGEgcXVlcnkgd2l0aCB0aGUgZGlzdGluY3Q9MSBwYXJhbWV0ZXIsXG4qICAgYWxsIGhpdHMgY29udGFpbmluZyBhIGR1cGxpY2F0ZSB2YWx1ZSBmb3IgdGhlIGF0dHJpYnV0ZUZvckRpc3RpbmN0IGF0dHJpYnV0ZSBhcmUgcmVtb3ZlZCBmcm9tIHJlc3VsdHMuXG4qICAgRm9yIGV4YW1wbGUsIGlmIHRoZSBjaG9zZW4gYXR0cmlidXRlIGlzIHNob3dfbmFtZSBhbmQgc2V2ZXJhbCBoaXRzIGhhdmVcbiogICB0aGUgc2FtZSB2YWx1ZSBmb3Igc2hvd19uYW1lLCB0aGVuIG9ubHkgdGhlIGJlc3RcbiogICBvbmUgaXMga2VwdCBhbmQgb3RoZXJzIGFyZSByZW1vdmVkLlxuKiAtIHJlc3RyaWN0U2VhcmNoYWJsZUF0dHJpYnV0ZXM6IExpc3Qgb2YgYXR0cmlidXRlcyB5b3Ugd2FudCB0byB1c2UgZm9yXG4qIHRleHR1YWwgc2VhcmNoIChtdXN0IGJlIGEgc3Vic2V0IG9mIHRoZSBhdHRyaWJ1dGVzVG9JbmRleCBpbmRleCBzZXR0aW5nKVxuKiBlaXRoZXIgY29tbWEgc2VwYXJhdGVkIG9yIGFzIGFuIGFycmF5XG4qIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja10gdGhlIHJlc3VsdCBjYWxsYmFjayBjYWxsZWQgd2l0aCB0d28gYXJndW1lbnRzOlxuKiAgZXJyb3I6IG51bGwgb3IgRXJyb3IoJ21lc3NhZ2UnKS4gSWYgZmFsc2UsIHRoZSBjb250ZW50IGNvbnRhaW5zIHRoZSBlcnJvci5cbiogIGNvbnRlbnQ6IHRoZSBzZXJ2ZXIgYW5zd2VyIHRoYXQgY29udGFpbnMgdGhlIGxpc3Qgb2YgcmVzdWx0cy5cbiovXG5JbmRleENvcmUucHJvdG90eXBlLnNlYXJjaCA9IGJ1aWxkU2VhcmNoTWV0aG9kKCdxdWVyeScpO1xuXG4vKlxuKiAtLSBCRVRBIC0tXG4qIFNlYXJjaCBhIHJlY29yZCBzaW1pbGFyIHRvIHRoZSBxdWVyeSBpbnNpZGUgdGhlIGluZGV4IHVzaW5nIFhNTEh0dHBSZXF1ZXN0IHJlcXVlc3QgKFVzaW5nIGEgUE9TVCBxdWVyeSB0b1xuKiBtaW5pbWl6ZSBudW1iZXIgb2YgT1BUSU9OUyBxdWVyaWVzOiBDcm9zcy1PcmlnaW4gUmVzb3VyY2UgU2hhcmluZykuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBbcXVlcnldIHRoZSBzaW1pbGFyIHF1ZXJ5XG4qIEBwYXJhbSB7b2JqZWN0fSBbYXJnc10gKG9wdGlvbmFsKSBpZiBzZXQsIGNvbnRhaW5zIGFuIG9iamVjdCB3aXRoIHF1ZXJ5IHBhcmFtZXRlcnMuXG4qICAgQWxsIHNlYXJjaCBwYXJhbWV0ZXJzIGFyZSBzdXBwb3J0ZWQgKHNlZSBzZWFyY2ggZnVuY3Rpb24pLCByZXN0cmljdFNlYXJjaGFibGVBdHRyaWJ1dGVzIGFuZCBmYWNldEZpbHRlcnNcbiogICBhcmUgdGhlIHR3byBtb3N0IHVzZWZ1bCB0byByZXN0cmljdCB0aGUgc2ltaWxhciByZXN1bHRzIGFuZCBnZXQgbW9yZSByZWxldmFudCBjb250ZW50XG4qL1xuSW5kZXhDb3JlLnByb3RvdHlwZS5zaW1pbGFyU2VhcmNoID0gZGVwcmVjYXRlKFxuICBidWlsZFNlYXJjaE1ldGhvZCgnc2ltaWxhclF1ZXJ5JyksXG4gIGRlcHJlY2F0ZWRNZXNzYWdlKFxuICAgICdpbmRleC5zaW1pbGFyU2VhcmNoKHF1ZXJ5WywgY2FsbGJhY2tdKScsXG4gICAgJ2luZGV4LnNlYXJjaCh7IHNpbWlsYXJRdWVyeTogcXVlcnkgfVssIGNhbGxiYWNrXSknXG4gIClcbik7XG5cbi8qXG4qIEJyb3dzZSBpbmRleCBjb250ZW50LiBUaGUgcmVzcG9uc2UgY29udGVudCB3aWxsIGhhdmUgYSBgY3Vyc29yYCBwcm9wZXJ0eSB0aGF0IHlvdSBjYW4gdXNlXG4qIHRvIGJyb3dzZSBzdWJzZXF1ZW50IHBhZ2VzIGZvciB0aGlzIHF1ZXJ5LiBVc2UgYGluZGV4LmJyb3dzZUZyb20oY3Vyc29yKWAgd2hlbiB5b3Ugd2FudC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IC0gVGhlIGZ1bGwgdGV4dCBxdWVyeVxuKiBAcGFyYW0ge09iamVjdH0gW3F1ZXJ5UGFyYW1ldGVyc10gLSBBbnkgc2VhcmNoIHF1ZXJ5IHBhcmFtZXRlclxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gVGhlIHJlc3VsdCBjYWxsYmFjayBjYWxsZWQgd2l0aCB0d28gYXJndW1lbnRzXG4qICAgZXJyb3I6IG51bGwgb3IgRXJyb3IoJ21lc3NhZ2UnKVxuKiAgIGNvbnRlbnQ6IHRoZSBzZXJ2ZXIgYW5zd2VyIHdpdGggdGhlIGJyb3dzZSByZXN1bHRcbiogQHJldHVybiB7UHJvbWlzZXx1bmRlZmluZWR9IFJldHVybnMgYSBwcm9taXNlIGlmIG5vIGNhbGxiYWNrIGdpdmVuXG4qIEBleGFtcGxlXG4qIGluZGV4LmJyb3dzZSgnY29vbCBzb25ncycsIHtcbiogICB0YWdGaWx0ZXJzOiAncHVibGljLGNvbW1lbnRzJyxcbiogICBoaXRzUGVyUGFnZTogNTAwXG4qIH0sIGNhbGxiYWNrKTtcbiogQHNlZSB7QGxpbmsgaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZG9jL3Jlc3RfYXBpI0Jyb3dzZXxBbGdvbGlhIFJFU1QgQVBJIERvY3VtZW50YXRpb259XG4qL1xuSW5kZXhDb3JlLnByb3RvdHlwZS5icm93c2UgPSBmdW5jdGlvbihxdWVyeSwgcXVlcnlQYXJhbWV0ZXJzLCBjYWxsYmFjaykge1xuICB2YXIgbWVyZ2UgPSByZXF1aXJlKCcuL21lcmdlLmpzJyk7XG5cbiAgdmFyIGluZGV4T2JqID0gdGhpcztcblxuICB2YXIgcGFnZTtcbiAgdmFyIGhpdHNQZXJQYWdlO1xuXG4gIC8vIHdlIGNoZWNrIHZhcmlhZGljIGNhbGxzIHRoYXQgYXJlIG5vdCB0aGUgb25lIGRlZmluZWRcbiAgLy8gLmJyb3dzZSgpLy5icm93c2UoZm4pXG4gIC8vID0+IHBhZ2UgPSAwXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHBhZ2UgPSAwO1xuICAgIGNhbGxiYWNrID0gYXJndW1lbnRzWzBdO1xuICAgIHF1ZXJ5ID0gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdudW1iZXInKSB7XG4gICAgLy8gLmJyb3dzZSgyKS8uYnJvd3NlKDIsIDEwKS8uYnJvd3NlKDIsIGZuKS8uYnJvd3NlKDIsIDEwLCBmbilcbiAgICBwYWdlID0gYXJndW1lbnRzWzBdO1xuICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzFdID09PSAnbnVtYmVyJykge1xuICAgICAgaGl0c1BlclBhZ2UgPSBhcmd1bWVudHNbMV07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGhpdHNQZXJQYWdlID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBxdWVyeSA9IHVuZGVmaW5lZDtcbiAgICBxdWVyeVBhcmFtZXRlcnMgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyAuYnJvd3NlKHF1ZXJ5UGFyYW1ldGVycykvLmJyb3dzZShxdWVyeVBhcmFtZXRlcnMsIGNiKVxuICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IGFyZ3VtZW50c1sxXTtcbiAgICB9XG4gICAgcXVlcnlQYXJhbWV0ZXJzID0gYXJndW1lbnRzWzBdO1xuICAgIHF1ZXJ5ID0gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdzdHJpbmcnICYmIHR5cGVvZiBhcmd1bWVudHNbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyAuYnJvd3NlKHF1ZXJ5LCBjYilcbiAgICBjYWxsYmFjayA9IGFyZ3VtZW50c1sxXTtcbiAgICBxdWVyeVBhcmFtZXRlcnMgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBvdGhlcndpc2UgaXQncyBhIC5icm93c2UocXVlcnkpLy5icm93c2UocXVlcnksIHF1ZXJ5UGFyYW1ldGVycykvLmJyb3dzZShxdWVyeSwgcXVlcnlQYXJhbWV0ZXJzLCBjYilcblxuICAvLyBnZXQgc2VhcmNoIHF1ZXJ5IHBhcmFtZXRlcnMgY29tYmluaW5nIHZhcmlvdXMgcG9zc2libGUgY2FsbHNcbiAgLy8gdG8gLmJyb3dzZSgpO1xuICBxdWVyeVBhcmFtZXRlcnMgPSBtZXJnZSh7fSwgcXVlcnlQYXJhbWV0ZXJzIHx8IHt9LCB7XG4gICAgcGFnZTogcGFnZSxcbiAgICBoaXRzUGVyUGFnZTogaGl0c1BlclBhZ2UsXG4gICAgcXVlcnk6IHF1ZXJ5XG4gIH0pO1xuXG4gIHZhciBwYXJhbXMgPSB0aGlzLmFzLl9nZXRTZWFyY2hQYXJhbXMocXVlcnlQYXJhbWV0ZXJzLCAnJyk7XG5cbiAgcmV0dXJuIHRoaXMuYXMuX2pzb25SZXF1ZXN0KHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6ICcvMS9pbmRleGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaW5kZXhPYmouaW5kZXhOYW1lKSArICcvYnJvd3NlJyxcbiAgICBib2R5OiB7cGFyYW1zOiBwYXJhbXN9LFxuICAgIGhvc3RUeXBlOiAncmVhZCcsXG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gIH0pO1xufTtcblxuLypcbiogQ29udGludWUgYnJvd3NpbmcgZnJvbSBhIHByZXZpb3VzIHBvc2l0aW9uIChjdXJzb3IpLCBvYnRhaW5lZCB2aWEgYSBjYWxsIHRvIGAuYnJvd3NlKClgLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgLSBUaGUgZnVsbCB0ZXh0IHF1ZXJ5XG4qIEBwYXJhbSB7T2JqZWN0fSBbcXVlcnlQYXJhbWV0ZXJzXSAtIEFueSBzZWFyY2ggcXVlcnkgcGFyYW1ldGVyXG4qIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBUaGUgcmVzdWx0IGNhbGxiYWNrIGNhbGxlZCB3aXRoIHR3byBhcmd1bWVudHNcbiogICBlcnJvcjogbnVsbCBvciBFcnJvcignbWVzc2FnZScpXG4qICAgY29udGVudDogdGhlIHNlcnZlciBhbnN3ZXIgd2l0aCB0aGUgYnJvd3NlIHJlc3VsdFxuKiBAcmV0dXJuIHtQcm9taXNlfHVuZGVmaW5lZH0gUmV0dXJucyBhIHByb21pc2UgaWYgbm8gY2FsbGJhY2sgZ2l2ZW5cbiogQGV4YW1wbGVcbiogaW5kZXguYnJvd3NlRnJvbSgnMTRsa2ZzYWtsMzInLCBjYWxsYmFjayk7XG4qIEBzZWUge0BsaW5rIGh0dHBzOi8vd3d3LmFsZ29saWEuY29tL2RvYy9yZXN0X2FwaSNCcm93c2V8QWxnb2xpYSBSRVNUIEFQSSBEb2N1bWVudGF0aW9ufVxuKi9cbkluZGV4Q29yZS5wcm90b3R5cGUuYnJvd3NlRnJvbSA9IGZ1bmN0aW9uKGN1cnNvciwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIHRoaXMuYXMuX2pzb25SZXF1ZXN0KHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6ICcvMS9pbmRleGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5pbmRleE5hbWUpICsgJy9icm93c2UnLFxuICAgIGJvZHk6IHtjdXJzb3I6IGN1cnNvcn0sXG4gICAgaG9zdFR5cGU6ICdyZWFkJyxcbiAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgfSk7XG59O1xuXG4vKlxuKiBTZWFyY2ggZm9yIGZhY2V0IHZhbHVlc1xuKiBodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kb2MvcmVzdC1hcGkvc2VhcmNoI3NlYXJjaC1mb3ItZmFjZXQtdmFsdWVzXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuZmFjZXROYW1lIEZhY2V0IG5hbWUsIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB0byBzZWFyY2ggZm9yIHZhbHVlcyBpbi5cbiogTXVzdCBiZSBkZWNsYXJlZCBhcyBhIGZhY2V0XG4qIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuZmFjZXRRdWVyeSBRdWVyeSBmb3IgdGhlIGZhY2V0IHNlYXJjaFxuKiBAcGFyYW0ge3N0cmluZ30gW3BhcmFtcy4qXSBBbnkgc2VhcmNoIHBhcmFtZXRlciBvZiBBbGdvbGlhLFxuKiBzZWUgaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZG9jL2FwaS1jbGllbnQvamF2YXNjcmlwdC9zZWFyY2gjc2VhcmNoLXBhcmFtZXRlcnNcbiogUGFnaW5hdGlvbiBpcyBub3Qgc3VwcG9ydGVkLiBUaGUgcGFnZSBhbmQgaGl0c1BlclBhZ2UgcGFyYW1ldGVycyB3aWxsIGJlIGlnbm9yZWQuXG4qIEBwYXJhbSBjYWxsYmFjayAob3B0aW9uYWwpXG4qL1xuSW5kZXhDb3JlLnByb3RvdHlwZS5zZWFyY2hGb3JGYWNldFZhbHVlcyA9IGZ1bmN0aW9uKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgdmFyIGNsb25lID0gcmVxdWlyZSgnLi9jbG9uZS5qcycpO1xuICB2YXIgb21pdCA9IHJlcXVpcmUoJy4vb21pdC5qcycpO1xuICB2YXIgdXNhZ2UgPSAnVXNhZ2U6IGluZGV4LnNlYXJjaEZvckZhY2V0VmFsdWVzKHtmYWNldE5hbWUsIGZhY2V0UXVlcnksIC4uLnBhcmFtc31bLCBjYWxsYmFja10pJztcblxuICBpZiAocGFyYW1zLmZhY2V0TmFtZSA9PT0gdW5kZWZpbmVkIHx8IHBhcmFtcy5mYWNldFF1ZXJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IodXNhZ2UpO1xuICB9XG5cbiAgdmFyIGZhY2V0TmFtZSA9IHBhcmFtcy5mYWNldE5hbWU7XG4gIHZhciBmaWx0ZXJlZFBhcmFtcyA9IG9taXQoY2xvbmUocGFyYW1zKSwgZnVuY3Rpb24oa2V5TmFtZSkge1xuICAgIHJldHVybiBrZXlOYW1lID09PSAnZmFjZXROYW1lJztcbiAgfSk7XG4gIHZhciBzZWFyY2hQYXJhbWV0ZXJzID0gdGhpcy5hcy5fZ2V0U2VhcmNoUGFyYW1zKGZpbHRlcmVkUGFyYW1zLCAnJyk7XG5cbiAgcmV0dXJuIHRoaXMuYXMuX2pzb25SZXF1ZXN0KHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6ICcvMS9pbmRleGVzLycgK1xuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuaW5kZXhOYW1lKSArICcvZmFjZXRzLycgKyBlbmNvZGVVUklDb21wb25lbnQoZmFjZXROYW1lKSArICcvcXVlcnknLFxuICAgIGhvc3RUeXBlOiAncmVhZCcsXG4gICAgYm9keToge3BhcmFtczogc2VhcmNoUGFyYW1ldGVyc30sXG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gIH0pO1xufTtcblxuSW5kZXhDb3JlLnByb3RvdHlwZS5zZWFyY2hGYWNldCA9IGRlcHJlY2F0ZShmdW5jdGlvbihwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLnNlYXJjaEZvckZhY2V0VmFsdWVzKHBhcmFtcywgY2FsbGJhY2spO1xufSwgZGVwcmVjYXRlZE1lc3NhZ2UoXG4gICdpbmRleC5zZWFyY2hGYWNldChwYXJhbXNbLCBjYWxsYmFja10pJyxcbiAgJ2luZGV4LnNlYXJjaEZvckZhY2V0VmFsdWVzKHBhcmFtc1ssIGNhbGxiYWNrXSknXG4pKTtcblxuSW5kZXhDb3JlLnByb3RvdHlwZS5fc2VhcmNoID0gZnVuY3Rpb24ocGFyYW1zLCB1cmwsIGNhbGxiYWNrLCBhZGRpdGlvbmFsVUEpIHtcbiAgcmV0dXJuIHRoaXMuYXMuX2pzb25SZXF1ZXN0KHtcbiAgICBjYWNoZTogdGhpcy5jYWNoZSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6IHVybCB8fCAnLzEvaW5kZXhlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuaW5kZXhOYW1lKSArICcvcXVlcnknLFxuICAgIGJvZHk6IHtwYXJhbXM6IHBhcmFtc30sXG4gICAgaG9zdFR5cGU6ICdyZWFkJyxcbiAgICBmYWxsYmFjazoge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy8xL2luZGV4ZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmluZGV4TmFtZSksXG4gICAgICBib2R5OiB7cGFyYW1zOiBwYXJhbXN9XG4gICAgfSxcbiAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgYWRkaXRpb25hbFVBOiBhZGRpdGlvbmFsVUFcbiAgfSk7XG59O1xuXG4vKlxuKiBHZXQgYW4gb2JqZWN0IGZyb20gdGhpcyBpbmRleFxuKlxuKiBAcGFyYW0gb2JqZWN0SUQgdGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBvYmplY3QgdG8gcmV0cmlldmVcbiogQHBhcmFtIGF0dHJzIChvcHRpb25hbCkgaWYgc2V0LCBjb250YWlucyB0aGUgYXJyYXkgb2YgYXR0cmlidXRlIG5hbWVzIHRvIHJldHJpZXZlXG4qIEBwYXJhbSBjYWxsYmFjayAob3B0aW9uYWwpIHRoZSByZXN1bHQgY2FsbGJhY2sgY2FsbGVkIHdpdGggdHdvIGFyZ3VtZW50c1xuKiAgZXJyb3I6IG51bGwgb3IgRXJyb3IoJ21lc3NhZ2UnKVxuKiAgY29udGVudDogdGhlIG9iamVjdCB0byByZXRyaWV2ZSBvciB0aGUgZXJyb3IgbWVzc2FnZSBpZiBhIGZhaWx1cmUgb2NjdXJyZWRcbiovXG5JbmRleENvcmUucHJvdG90eXBlLmdldE9iamVjdCA9IGZ1bmN0aW9uKG9iamVjdElELCBhdHRycywgY2FsbGJhY2spIHtcbiAgdmFyIGluZGV4T2JqID0gdGhpcztcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSB8fCB0eXBlb2YgYXR0cnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGF0dHJzO1xuICAgIGF0dHJzID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdmFyIHBhcmFtcyA9ICcnO1xuICBpZiAoYXR0cnMgIT09IHVuZGVmaW5lZCkge1xuICAgIHBhcmFtcyA9ICc/YXR0cmlidXRlcz0nO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgIHBhcmFtcyArPSAnLCc7XG4gICAgICB9XG4gICAgICBwYXJhbXMgKz0gYXR0cnNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuYXMuX2pzb25SZXF1ZXN0KHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDogJy8xL2luZGV4ZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpbmRleE9iai5pbmRleE5hbWUpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iamVjdElEKSArIHBhcmFtcyxcbiAgICBob3N0VHlwZTogJ3JlYWQnLFxuICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICB9KTtcbn07XG5cbi8qXG4qIEdldCBzZXZlcmFsIG9iamVjdHMgZnJvbSB0aGlzIGluZGV4XG4qXG4qIEBwYXJhbSBvYmplY3RJRHMgdGhlIGFycmF5IG9mIHVuaXF1ZSBpZGVudGlmaWVyIG9mIG9iamVjdHMgdG8gcmV0cmlldmVcbiovXG5JbmRleENvcmUucHJvdG90eXBlLmdldE9iamVjdHMgPSBmdW5jdGlvbihvYmplY3RJRHMsIGF0dHJpYnV0ZXNUb1JldHJpZXZlLCBjYWxsYmFjaykge1xuICB2YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbiAgdmFyIG1hcCA9IHJlcXVpcmUoJy4vbWFwLmpzJyk7XG5cbiAgdmFyIHVzYWdlID0gJ1VzYWdlOiBpbmRleC5nZXRPYmplY3RzKGFycmF5T2ZPYmplY3RJRHNbLCBjYWxsYmFja10pJztcblxuICBpZiAoIWlzQXJyYXkob2JqZWN0SURzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcih1c2FnZSk7XG4gIH1cblxuICB2YXIgaW5kZXhPYmogPSB0aGlzO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxIHx8IHR5cGVvZiBhdHRyaWJ1dGVzVG9SZXRyaWV2ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gYXR0cmlidXRlc1RvUmV0cmlldmU7XG4gICAgYXR0cmlidXRlc1RvUmV0cmlldmUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIgYm9keSA9IHtcbiAgICByZXF1ZXN0czogbWFwKG9iamVjdElEcywgZnVuY3Rpb24gcHJlcGFyZVJlcXVlc3Qob2JqZWN0SUQpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICBpbmRleE5hbWU6IGluZGV4T2JqLmluZGV4TmFtZSxcbiAgICAgICAgb2JqZWN0SUQ6IG9iamVjdElEXG4gICAgICB9O1xuXG4gICAgICBpZiAoYXR0cmlidXRlc1RvUmV0cmlldmUpIHtcbiAgICAgICAgcmVxdWVzdC5hdHRyaWJ1dGVzVG9SZXRyaWV2ZSA9IGF0dHJpYnV0ZXNUb1JldHJpZXZlLmpvaW4oJywnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgfSlcbiAgfTtcblxuICByZXR1cm4gdGhpcy5hcy5fanNvblJlcXVlc3Qoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogJy8xL2luZGV4ZXMvKi9vYmplY3RzJyxcbiAgICBob3N0VHlwZTogJ3JlYWQnLFxuICAgIGJvZHk6IGJvZHksXG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gIH0pO1xufTtcblxuSW5kZXhDb3JlLnByb3RvdHlwZS5hcyA9IG51bGw7XG5JbmRleENvcmUucHJvdG90eXBlLmluZGV4TmFtZSA9IG51bGw7XG5JbmRleENvcmUucHJvdG90eXBlLnR5cGVBaGVhZEFyZ3MgPSBudWxsO1xuSW5kZXhDb3JlLnByb3RvdHlwZS50eXBlQWhlYWRWYWx1ZU9wdGlvbiA9IG51bGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBBbGdvbGlhU2VhcmNoQ29yZSA9IHJlcXVpcmUoJy4uLy4uL0FsZ29saWFTZWFyY2hDb3JlLmpzJyk7XG52YXIgY3JlYXRlQWxnb2xpYXNlYXJjaCA9IHJlcXVpcmUoJy4uL2NyZWF0ZUFsZ29saWFzZWFyY2guanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBbGdvbGlhc2VhcmNoKEFsZ29saWFTZWFyY2hDb3JlLCAnQnJvd3NlciAobGl0ZSknKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJ2dsb2JhbCcpO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZSB8fCByZXF1aXJlKCdlczYtcHJvbWlzZScpLlByb21pc2U7XG5cbi8vIFRoaXMgaXMgdGhlIHN0YW5kYWxvbmUgYnJvd3NlciBidWlsZCBlbnRyeSBwb2ludFxuLy8gQnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgQWxnb2xpYSBTZWFyY2ggSmF2YVNjcmlwdCBjbGllbnQsXG4vLyB1c2luZyBYTUxIdHRwUmVxdWVzdCwgWERvbWFpblJlcXVlc3QgYW5kIEpTT05QIGFzIGZhbGxiYWNrXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUFsZ29saWFzZWFyY2goQWxnb2xpYVNlYXJjaCwgdWFTdWZmaXgpIHtcbiAgdmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbiAgdmFyIGVycm9ycyA9IHJlcXVpcmUoJy4uL2Vycm9ycycpO1xuICB2YXIgaW5saW5lSGVhZGVycyA9IHJlcXVpcmUoJy4vaW5saW5lLWhlYWRlcnMnKTtcbiAgdmFyIGpzb25wUmVxdWVzdCA9IHJlcXVpcmUoJy4vanNvbnAtcmVxdWVzdCcpO1xuICB2YXIgcGxhY2VzID0gcmVxdWlyZSgnLi4vcGxhY2VzLmpzJyk7XG4gIHVhU3VmZml4ID0gdWFTdWZmaXggfHwgJyc7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGVidWcnKSB7XG4gICAgcmVxdWlyZSgnZGVidWcnKS5lbmFibGUoJ2FsZ29saWFzZWFyY2gqJyk7XG4gIH1cblxuICBmdW5jdGlvbiBhbGdvbGlhc2VhcmNoKGFwcGxpY2F0aW9uSUQsIGFwaUtleSwgb3B0cykge1xuICAgIHZhciBjbG9uZURlZXAgPSByZXF1aXJlKCcuLi9jbG9uZS5qcycpO1xuXG4gICAgb3B0cyA9IGNsb25lRGVlcChvcHRzIHx8IHt9KTtcblxuICAgIG9wdHMuX3VhID0gb3B0cy5fdWEgfHwgYWxnb2xpYXNlYXJjaC51YTtcblxuICAgIHJldHVybiBuZXcgQWxnb2xpYVNlYXJjaEJyb3dzZXIoYXBwbGljYXRpb25JRCwgYXBpS2V5LCBvcHRzKTtcbiAgfVxuXG4gIGFsZ29saWFzZWFyY2gudmVyc2lvbiA9IHJlcXVpcmUoJy4uL3ZlcnNpb24uanMnKTtcblxuICBhbGdvbGlhc2VhcmNoLnVhID1cbiAgICAnQWxnb2xpYSBmb3IgSmF2YVNjcmlwdCAoJyArIGFsZ29saWFzZWFyY2gudmVyc2lvbiArICcpOyAnICsgdWFTdWZmaXg7XG5cbiAgYWxnb2xpYXNlYXJjaC5pbml0UGxhY2VzID0gcGxhY2VzKGFsZ29saWFzZWFyY2gpO1xuXG4gIC8vIHdlIGV4cG9zZSBpbnRvIHdpbmRvdyBubyBtYXR0ZXIgaG93IHdlIGFyZSB1c2VkLCB0aGlzIHdpbGwgYWxsb3dcbiAgLy8gdXMgdG8gZWFzaWx5IGRlYnVnIGFueSB3ZWJzaXRlIHJ1bm5pbmcgYWxnb2xpYVxuICBnbG9iYWwuX19hbGdvbGlhID0ge1xuICAgIGRlYnVnOiByZXF1aXJlKCdkZWJ1ZycpLFxuICAgIGFsZ29saWFzZWFyY2g6IGFsZ29saWFzZWFyY2hcbiAgfTtcblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBoYXNYTUxIdHRwUmVxdWVzdDogJ1hNTEh0dHBSZXF1ZXN0JyBpbiBnbG9iYWwsXG4gICAgaGFzWERvbWFpblJlcXVlc3Q6ICdYRG9tYWluUmVxdWVzdCcgaW4gZ2xvYmFsXG4gIH07XG5cbiAgaWYgKHN1cHBvcnQuaGFzWE1MSHR0cFJlcXVlc3QpIHtcbiAgICBzdXBwb3J0LmNvcnMgPSAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEFsZ29saWFTZWFyY2hCcm93c2VyKCkge1xuICAgIC8vIGNhbGwgQWxnb2xpYVNlYXJjaCBjb25zdHJ1Y3RvclxuICAgIEFsZ29saWFTZWFyY2guYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIGluaGVyaXRzKEFsZ29saWFTZWFyY2hCcm93c2VyLCBBbGdvbGlhU2VhcmNoKTtcblxuICBBbGdvbGlhU2VhcmNoQnJvd3Nlci5wcm90b3R5cGUuX3JlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KHVybCwgb3B0cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiB3cmFwUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIC8vIG5vIGNvcnMgb3IgWERvbWFpblJlcXVlc3QsIG5vIHJlcXVlc3RcbiAgICAgIGlmICghc3VwcG9ydC5jb3JzICYmICFzdXBwb3J0Lmhhc1hEb21haW5SZXF1ZXN0KSB7XG4gICAgICAgIC8vIHZlcnkgb2xkIGJyb3dzZXIsIG5vdCBzdXBwb3J0ZWRcbiAgICAgICAgcmVqZWN0KG5ldyBlcnJvcnMuTmV0d29yaygnQ09SUyBub3Qgc3VwcG9ydGVkJykpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVybCA9IGlubGluZUhlYWRlcnModXJsLCBvcHRzLmhlYWRlcnMpO1xuXG4gICAgICB2YXIgYm9keSA9IG9wdHMuYm9keTtcbiAgICAgIHZhciByZXEgPSBzdXBwb3J0LmNvcnMgPyBuZXcgWE1MSHR0cFJlcXVlc3QoKSA6IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgICAgdmFyIHJlcVRpbWVvdXQ7XG4gICAgICB2YXIgdGltZWRPdXQ7XG4gICAgICB2YXIgY29ubmVjdGVkID0gZmFsc2U7XG5cbiAgICAgIHJlcVRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uVGltZW91dCwgb3B0cy50aW1lb3V0cy5jb25uZWN0KTtcbiAgICAgIC8vIHdlIHNldCBhbiBlbXB0eSBvbnByb2dyZXNzIGxpc3RlbmVyXG4gICAgICAvLyBzbyB0aGF0IFhEb21haW5SZXF1ZXN0IG9uIElFOSBpcyBub3QgYWJvcnRlZFxuICAgICAgLy8gcmVmczpcbiAgICAgIC8vICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGdvbGlhL2FsZ29saWFzZWFyY2gtY2xpZW50LWpzL2lzc3Vlcy83NlxuICAgICAgLy8gIC0gaHR0cHM6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9pZS9lbi1VUy8zMGVmM2FkZC03NjdjLTQ0MzYtYjhhOS1mMWNhMTliNDgxMmUvaWU5LXJ0bS14ZG9tYWlucmVxdWVzdC1pc3N1ZWQtcmVxdWVzdHMtbWF5LWFib3J0LWlmLWFsbC1ldmVudC1oYW5kbGVycy1ub3Qtc3BlY2lmaWVkP2ZvcnVtPWlld2ViZGV2ZWxvcG1lbnRcbiAgICAgIHJlcS5vbnByb2dyZXNzID0gb25Qcm9ncmVzcztcbiAgICAgIGlmICgnb25yZWFkeXN0YXRlY2hhbmdlJyBpbiByZXEpIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBvblJlYWR5U3RhdGVDaGFuZ2U7XG4gICAgICByZXEub25sb2FkID0gb25Mb2FkO1xuICAgICAgcmVxLm9uZXJyb3IgPSBvbkVycm9yO1xuXG4gICAgICAvLyBkbyBub3QgcmVseSBvbiBkZWZhdWx0IFhIUiBhc3luYyBmbGFnLCBhcyBzb21lIGFuYWx5dGljcyBjb2RlIGxpa2UgaG90amFyXG4gICAgICAvLyBicmVha3MgaXQgYW5kIHNldCBpdCB0byBmYWxzZSBieSBkZWZhdWx0XG4gICAgICBpZiAocmVxIGluc3RhbmNlb2YgWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgICAgcmVxLm9wZW4ob3B0cy5tZXRob2QsIHVybCwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gVGhlIEFuYWx5dGljcyBBUEkgbmV2ZXIgYWNjZXB0cyBBdXRoIGhlYWRlcnMgYXMgcXVlcnkgc3RyaW5nXG4gICAgICAgIC8vIHRoaXMgb3B0aW9uIGV4aXN0cyBzcGVjaWZpY2FsbHkgZm9yIHRoZW0uXG4gICAgICAgIGlmIChvcHRzLmZvcmNlQXV0aEhlYWRlcnMpIHtcbiAgICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcbiAgICAgICAgICAgICd4LWFsZ29saWEtYXBwbGljYXRpb24taWQnLFxuICAgICAgICAgICAgb3B0cy5oZWFkZXJzWyd4LWFsZ29saWEtYXBwbGljYXRpb24taWQnXVxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXG4gICAgICAgICAgICAneC1hbGdvbGlhLWFwaS1rZXknLFxuICAgICAgICAgICAgb3B0cy5oZWFkZXJzWyd4LWFsZ29saWEtYXBpLWtleSddXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxLm9wZW4ob3B0cy5tZXRob2QsIHVybCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGhlYWRlcnMgYXJlIG1lYW50IHRvIGJlIHNlbnQgYWZ0ZXIgb3BlblxuICAgICAgaWYgKHN1cHBvcnQuY29ycykge1xuICAgICAgICBpZiAoYm9keSkge1xuICAgICAgICAgIGlmIChvcHRzLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0FjY2Vzc19jb250cm9sX0NPUlMjU2ltcGxlX3JlcXVlc3RzXG4gICAgICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcignY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcignY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoJ2FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChib2R5KSB7XG4gICAgICAgIHJlcS5zZW5kKGJvZHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxLnNlbmQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gZXZlbnQgb2JqZWN0IG5vdCByZWNlaXZlZCBpbiBJRTgsIGF0IGxlYXN0XG4gICAgICAvLyBidXQgd2UgZG8gbm90IHVzZSBpdCwgc3RpbGwgaW1wb3J0YW50IHRvIG5vdGVcbiAgICAgIGZ1bmN0aW9uIG9uTG9hZCgvKiBldmVudCAqLykge1xuICAgICAgICAvLyBXaGVuIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydHMgcmVxLnRpbWVvdXQsIHdlIGNhblxuICAgICAgICAvLyBoYXZlIGJvdGggYSBsb2FkIGFuZCB0aW1lb3V0IGV2ZW50LCBzaW5jZSBoYW5kbGVkIGJ5IGEgZHVtYiBzZXRUaW1lb3V0XG4gICAgICAgIGlmICh0aW1lZE91dCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyVGltZW91dChyZXFUaW1lb3V0KTtcblxuICAgICAgICB2YXIgb3V0O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgb3V0ID0ge1xuICAgICAgICAgICAgYm9keTogSlNPTi5wYXJzZShyZXEucmVzcG9uc2VUZXh0KSxcbiAgICAgICAgICAgIHJlc3BvbnNlVGV4dDogcmVxLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlcS5zdGF0dXMsXG4gICAgICAgICAgICAvLyBYRG9tYWluUmVxdWVzdCBkb2VzIG5vdCBoYXZlIGFueSByZXNwb25zZSBoZWFkZXJzXG4gICAgICAgICAgICBoZWFkZXJzOiByZXEuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzICYmIHJlcS5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCB7fVxuICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBvdXQgPSBuZXcgZXJyb3JzLlVucGFyc2FibGVKU09OKHtcbiAgICAgICAgICAgIG1vcmU6IHJlcS5yZXNwb25zZVRleHRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdXQgaW5zdGFuY2VvZiBlcnJvcnMuVW5wYXJzYWJsZUpTT04pIHtcbiAgICAgICAgICByZWplY3Qob3V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKG91dCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25FcnJvcihldmVudCkge1xuICAgICAgICBpZiAodGltZWRPdXQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhclRpbWVvdXQocmVxVGltZW91dCk7XG5cbiAgICAgICAgLy8gZXJyb3IgZXZlbnQgaXMgdHJpZ2VycmVkIGJvdGggd2l0aCBYRFIvWEhSIG9uOlxuICAgICAgICAvLyAgIC0gRE5TIGVycm9yXG4gICAgICAgIC8vICAgLSB1bmFsbG93ZWQgY3Jvc3MgZG9tYWluIHJlcXVlc3RcbiAgICAgICAgcmVqZWN0KFxuICAgICAgICAgIG5ldyBlcnJvcnMuTmV0d29yayh7XG4gICAgICAgICAgICBtb3JlOiBldmVudFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgICAgdGltZWRPdXQgPSB0cnVlO1xuICAgICAgICByZXEuYWJvcnQoKTtcblxuICAgICAgICByZWplY3QobmV3IGVycm9ycy5SZXF1ZXN0VGltZW91dCgpKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25Db25uZWN0KCkge1xuICAgICAgICBjb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICBjbGVhclRpbWVvdXQocmVxVGltZW91dCk7XG4gICAgICAgIHJlcVRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uVGltZW91dCwgb3B0cy50aW1lb3V0cy5jb21wbGV0ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uUHJvZ3Jlc3MoKSB7XG4gICAgICAgIGlmICghY29ubmVjdGVkKSBvbkNvbm5lY3QoKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25SZWFkeVN0YXRlQ2hhbmdlKCkge1xuICAgICAgICBpZiAoIWNvbm5lY3RlZCAmJiByZXEucmVhZHlTdGF0ZSA+IDEpIG9uQ29ubmVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIEFsZ29saWFTZWFyY2hCcm93c2VyLnByb3RvdHlwZS5fcmVxdWVzdC5mYWxsYmFjayA9IGZ1bmN0aW9uIHJlcXVlc3RGYWxsYmFjayh1cmwsIG9wdHMpIHtcbiAgICB1cmwgPSBpbmxpbmVIZWFkZXJzKHVybCwgb3B0cy5oZWFkZXJzKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiB3cmFwSnNvbnBSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgICAganNvbnBSZXF1ZXN0KHVybCwgb3B0cywgZnVuY3Rpb24ganNvbnBSZXF1ZXN0RG9uZShlcnIsIGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc29sdmUoY29udGVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBBbGdvbGlhU2VhcmNoQnJvd3Nlci5wcm90b3R5cGUuX3Byb21pc2UgPSB7XG4gICAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3RQcm9taXNlKHZhbCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHZhbCk7XG4gICAgfSxcbiAgICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlUHJvbWlzZSh2YWwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsKTtcbiAgICB9LFxuICAgIGRlbGF5OiBmdW5jdGlvbiBkZWxheVByb21pc2UobXMpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiByZXNvbHZlT25UaW1lb3V0KHJlc29sdmUvKiAsIHJlamVjdCovKSB7XG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBhbGw6IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGFsZ29saWFzZWFyY2g7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlubGluZUhlYWRlcnM7XG5cbnZhciBlbmNvZGUgPSByZXF1aXJlKCdxdWVyeXN0cmluZy1lczMvZW5jb2RlJyk7XG5cbmZ1bmN0aW9uIGlubGluZUhlYWRlcnModXJsLCBoZWFkZXJzKSB7XG4gIGlmICgvXFw/Ly50ZXN0KHVybCkpIHtcbiAgICB1cmwgKz0gJyYnO1xuICB9IGVsc2Uge1xuICAgIHVybCArPSAnPyc7XG4gIH1cblxuICByZXR1cm4gdXJsICsgZW5jb2RlKGhlYWRlcnMpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGpzb25wUmVxdWVzdDtcblxudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4uL2Vycm9ycycpO1xuXG52YXIgSlNPTlBDb3VudGVyID0gMDtcblxuZnVuY3Rpb24ganNvbnBSZXF1ZXN0KHVybCwgb3B0cywgY2IpIHtcbiAgaWYgKG9wdHMubWV0aG9kICE9PSAnR0VUJykge1xuICAgIGNiKG5ldyBFcnJvcignTWV0aG9kICcgKyBvcHRzLm1ldGhvZCArICcgJyArIHVybCArICcgaXMgbm90IHN1cHBvcnRlZCBieSBKU09OUC4nKSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgb3B0cy5kZWJ1ZygnSlNPTlA6IHN0YXJ0Jyk7XG5cbiAgdmFyIGNiQ2FsbGVkID0gZmFsc2U7XG4gIHZhciB0aW1lZE91dCA9IGZhbHNlO1xuXG4gIEpTT05QQ291bnRlciArPSAxO1xuICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgdmFyIGNiTmFtZSA9ICdhbGdvbGlhSlNPTlBfJyArIEpTT05QQ291bnRlcjtcbiAgdmFyIGRvbmUgPSBmYWxzZTtcblxuICB3aW5kb3dbY2JOYW1lXSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICByZW1vdmVHbG9iYWxzKCk7XG5cbiAgICBpZiAodGltZWRPdXQpIHtcbiAgICAgIG9wdHMuZGVidWcoJ0pTT05QOiBMYXRlIGFuc3dlciwgaWdub3JpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjYkNhbGxlZCA9IHRydWU7XG5cbiAgICBjbGVhbigpO1xuXG4gICAgY2IobnVsbCwge1xuICAgICAgYm9keTogZGF0YSxcbiAgICAgIHJlc3BvbnNlVGV4dDogSlNPTi5zdHJpbmdpZnkoZGF0YSkvKiAsXG4gICAgICAvLyBXZSBkbyBub3Qgc2VuZCB0aGUgc3RhdHVzQ29kZSwgdGhlcmUncyBubyBzdGF0dXNDb2RlIGluIEpTT05QLCBpdCB3aWxsIGJlXG4gICAgICAvLyBjb21wdXRlZCB1c2luZyBkYXRhLnN0YXR1cyAmJiBkYXRhLm1lc3NhZ2UgbGlrZSB3aXRoIFhEUlxuICAgICAgc3RhdHVzQ29kZSovXG4gICAgfSk7XG4gIH07XG5cbiAgLy8gYWRkIGNhbGxiYWNrIGJ5IGhhbmRcbiAgdXJsICs9ICcmY2FsbGJhY2s9JyArIGNiTmFtZTtcblxuICAvLyBhZGQgYm9keSBwYXJhbXMgbWFudWFsbHlcbiAgaWYgKG9wdHMuanNvbkJvZHkgJiYgb3B0cy5qc29uQm9keS5wYXJhbXMpIHtcbiAgICB1cmwgKz0gJyYnICsgb3B0cy5qc29uQm9keS5wYXJhbXM7XG4gIH1cblxuICB2YXIgb250aW1lb3V0ID0gc2V0VGltZW91dCh0aW1lb3V0LCBvcHRzLnRpbWVvdXRzLmNvbXBsZXRlKTtcblxuICAvLyBzY3JpcHQgb25yZWFkeXN0YXRlY2hhbmdlIG5lZWRlZCBvbmx5IGZvclxuICAvLyA8PSBJRThcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci5qcy9pc3N1ZXMvNDUyM1xuICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gcmVhZHlzdGF0ZWNoYW5nZTtcbiAgc2NyaXB0Lm9ubG9hZCA9IHN1Y2Nlc3M7XG4gIHNjcmlwdC5vbmVycm9yID0gZXJyb3I7XG5cbiAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgc2NyaXB0LmRlZmVyID0gdHJ1ZTtcbiAgc2NyaXB0LnNyYyA9IHVybDtcbiAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gIGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XG4gICAgb3B0cy5kZWJ1ZygnSlNPTlA6IHN1Y2Nlc3MnKTtcblxuICAgIGlmIChkb25lIHx8IHRpbWVkT3V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZG9uZSA9IHRydWU7XG5cbiAgICAvLyBzY3JpcHQgbG9hZGVkIGJ1dCBkaWQgbm90IGNhbGwgdGhlIGZuID0+IHNjcmlwdCBsb2FkaW5nIGVycm9yXG4gICAgaWYgKCFjYkNhbGxlZCkge1xuICAgICAgb3B0cy5kZWJ1ZygnSlNPTlA6IEZhaWwuIFNjcmlwdCBsb2FkZWQgYnV0IGRpZCBub3QgY2FsbCB0aGUgY2FsbGJhY2snKTtcbiAgICAgIGNsZWFuKCk7XG4gICAgICBjYihuZXcgZXJyb3JzLkpTT05QU2NyaXB0RmFpbCgpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkeXN0YXRlY2hhbmdlKCkge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09ICdsb2FkZWQnIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgc3VjY2VzcygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFuKCkge1xuICAgIGNsZWFyVGltZW91dChvbnRpbWVvdXQpO1xuICAgIHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgIHNjcmlwdC5vbmVycm9yID0gbnVsbDtcbiAgICBoZWFkLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVHbG9iYWxzKCkge1xuICAgIHRyeSB7XG4gICAgICBkZWxldGUgd2luZG93W2NiTmFtZV07XG4gICAgICBkZWxldGUgd2luZG93W2NiTmFtZSArICdfbG9hZGVkJ107XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgd2luZG93W2NiTmFtZV0gPSB3aW5kb3dbY2JOYW1lICsgJ19sb2FkZWQnXSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lb3V0KCkge1xuICAgIG9wdHMuZGVidWcoJ0pTT05QOiBTY3JpcHQgdGltZW91dCcpO1xuICAgIHRpbWVkT3V0ID0gdHJ1ZTtcbiAgICBjbGVhbigpO1xuICAgIGNiKG5ldyBlcnJvcnMuUmVxdWVzdFRpbWVvdXQoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICBvcHRzLmRlYnVnKCdKU09OUDogU2NyaXB0IGVycm9yJyk7XG5cbiAgICBpZiAoZG9uZSB8fCB0aW1lZE91dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNsZWFuKCk7XG4gICAgY2IobmV3IGVycm9ycy5KU09OUFNjcmlwdEVycm9yKCkpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGJ1aWxkU2VhcmNoTWV0aG9kO1xuXG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMuanMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc2VhcmNoIG1ldGhvZCB0byBiZSB1c2VkIGluIGNsaWVudHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeVBhcmFtIHRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdXNlZCBmb3IgdGhlIHF1ZXJ5XG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIHRoZSB1cmxcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSB0aGUgc2VhcmNoIG1ldGhvZFxuICovXG5mdW5jdGlvbiBidWlsZFNlYXJjaE1ldGhvZChxdWVyeVBhcmFtLCB1cmwpIHtcbiAgLyoqXG4gICAqIFRoZSBzZWFyY2ggbWV0aG9kLiBQcmVwYXJlcyB0aGUgZGF0YSBhbmQgc2VuZCB0aGUgcXVlcnkgdG8gQWxnb2xpYS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IHRoZSBzdHJpbmcgdXNlZCBmb3IgcXVlcnkgc2VhcmNoXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBhcmdzIGFkZGl0aW9uYWwgcGFyYW1ldGVycyB0byBzZW5kIHdpdGggdGhlIHNlYXJjaFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdIHRoZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgd2l0aCB0aGUgY2xpZW50IGdldHMgdGhlIGFuc3dlclxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR8UHJvbWlzZX0gSWYgdGhlIGNhbGxiYWNrIGlzIG5vdCBwcm92aWRlZCB0aGVuIHRoaXMgbWV0aG9kcyByZXR1cm5zIGEgUHJvbWlzZVxuICAgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uIHNlYXJjaChxdWVyeSwgYXJncywgY2FsbGJhY2spIHtcbiAgICAvLyB3YXJuIFYyIHVzZXJzIG9uIGhvdyB0byBzZWFyY2hcbiAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyB8fFxuICAgICAgdHlwZW9mIGNhbGxiYWNrID09PSAnb2JqZWN0Jykge1xuICAgICAgLy8gLnNlYXJjaChxdWVyeSwgcGFyYW1zLCBjYilcbiAgICAgIC8vIC5zZWFyY2goY2IsIHBhcmFtcylcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuQWxnb2xpYVNlYXJjaEVycm9yKCdpbmRleC5zZWFyY2ggdXNhZ2UgaXMgaW5kZXguc2VhcmNoKHF1ZXJ5LCBwYXJhbXMsIGNiKScpO1xuICAgIH1cblxuICAgIC8vIE5vcm1hbGl6aW5nIHRoZSBmdW5jdGlvbiBzaWduYXR1cmVcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCB0eXBlb2YgcXVlcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIFVzYWdlIDogLnNlYXJjaCgpLCAuc2VhcmNoKGNiKVxuICAgICAgY2FsbGJhY2sgPSBxdWVyeTtcbiAgICAgIHF1ZXJ5ID0gJyc7XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxIHx8IHR5cGVvZiBhcmdzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBVc2FnZSA6IC5zZWFyY2gocXVlcnkvYXJncyksIC5zZWFyY2gocXVlcnksIGNiKVxuICAgICAgY2FsbGJhY2sgPSBhcmdzO1xuICAgICAgYXJncyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBoYXZlIDMgYXJndW1lbnRzIHdpdGggdmFsdWVzXG5cbiAgICAvLyBVc2FnZSA6IC5zZWFyY2goYXJncykgLy8gY2FyZWZ1bDogdHlwZW9mIG51bGwgPT09ICdvYmplY3QnXG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcgJiYgcXVlcnkgIT09IG51bGwpIHtcbiAgICAgIGFyZ3MgPSBxdWVyeTtcbiAgICAgIHF1ZXJ5ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAocXVlcnkgPT09IHVuZGVmaW5lZCB8fCBxdWVyeSA9PT0gbnVsbCkgeyAvLyAuc2VhcmNoKHVuZGVmaW5lZC9udWxsKVxuICAgICAgcXVlcnkgPSAnJztcbiAgICB9XG5cbiAgICB2YXIgcGFyYW1zID0gJyc7XG5cbiAgICBpZiAocXVlcnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zICs9IHF1ZXJ5UGFyYW0gKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpO1xuICAgIH1cblxuICAgIHZhciBhZGRpdGlvbmFsVUE7XG4gICAgaWYgKGFyZ3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGFyZ3MuYWRkaXRpb25hbFVBKSB7XG4gICAgICAgIGFkZGl0aW9uYWxVQSA9IGFyZ3MuYWRkaXRpb25hbFVBO1xuICAgICAgICBkZWxldGUgYXJncy5hZGRpdGlvbmFsVUE7XG4gICAgICB9XG4gICAgICAvLyBgX2dldFNlYXJjaFBhcmFtc2Agd2lsbCBhdWdtZW50IHBhcmFtcywgZG8gbm90IGJlIGZvb2xlZCBieSB0aGUgPSB2ZXJzdXMgKz0gZnJvbSBwcmV2aW91cyBpZlxuICAgICAgcGFyYW1zID0gdGhpcy5hcy5fZ2V0U2VhcmNoUGFyYW1zKGFyZ3MsIHBhcmFtcyk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gdGhpcy5fc2VhcmNoKHBhcmFtcywgdXJsLCBjYWxsYmFjaywgYWRkaXRpb25hbFVBKTtcbiAgfTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVwcmVjYXRlKGZuLCBtZXNzYWdlKSB7XG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICAvKiBlc2xpbnQgbm8tY29uc29sZTowICovXG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZXByZWNhdGVkTWVzc2FnZShwcmV2aW91c1VzYWdlLCBuZXdVc2FnZSkge1xuICB2YXIgZ2l0aHViQW5jaG9yTGluayA9IHByZXZpb3VzVXNhZ2UudG9Mb3dlckNhc2UoKVxuICAgIC5yZXBsYWNlKC9bXFwuXFwoXFwpXS9nLCAnJyk7XG5cbiAgcmV0dXJuICdhbGdvbGlhc2VhcmNoOiBgJyArIHByZXZpb3VzVXNhZ2UgKyAnYCB3YXMgcmVwbGFjZWQgYnkgYCcgKyBuZXdVc2FnZSArXG4gICAgJ2AuIFBsZWFzZSBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FsZ29saWEvYWxnb2xpYXNlYXJjaC1jbGllbnQtamF2YXNjcmlwdC93aWtpL0RlcHJlY2F0ZWQjJyArIGdpdGh1YkFuY2hvckxpbms7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGlzIGZpbGUgaG9zdHMgb3VyIGVycm9yIGRlZmluaXRpb25zXG4vLyBXZSB1c2UgY3VzdG9tIGVycm9yIFwidHlwZXNcIiBzbyB0aGF0IHdlIGNhbiBhY3Qgb24gdGhlbSB3aGVuIHdlIG5lZWQgaXRcbi8vIGUuZy46IGlmIGVycm9yIGluc3RhbmNlb2YgZXJyb3JzLlVucGFyc2FibGVKU09OIHRoZW4uLlxuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5mdW5jdGlvbiBBbGdvbGlhU2VhcmNoRXJyb3IobWVzc2FnZSwgZXh0cmFQcm9wZXJ0aWVzKSB7XG4gIHZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yZWFjaCcpO1xuXG4gIHZhciBlcnJvciA9IHRoaXM7XG5cbiAgLy8gdHJ5IHRvIGdldCBhIHN0YWNrdHJhY2VcbiAgaWYgKHR5cGVvZiBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIGVycm9yLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjayB8fCAnQ2Fubm90IGdldCBhIHN0YWNrdHJhY2UsIGJyb3dzZXIgaXMgdG9vIG9sZCc7XG4gIH1cblxuICB0aGlzLm5hbWUgPSAnQWxnb2xpYVNlYXJjaEVycm9yJztcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCAnVW5rbm93biBlcnJvcic7XG5cbiAgaWYgKGV4dHJhUHJvcGVydGllcykge1xuICAgIGZvckVhY2goZXh0cmFQcm9wZXJ0aWVzLCBmdW5jdGlvbiBhZGRUb0Vycm9yT2JqZWN0KHZhbHVlLCBrZXkpIHtcbiAgICAgIGVycm9yW2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxufVxuXG5pbmhlcml0cyhBbGdvbGlhU2VhcmNoRXJyb3IsIEVycm9yKTtcblxuZnVuY3Rpb24gY3JlYXRlQ3VzdG9tRXJyb3IobmFtZSwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBBbGdvbGlhU2VhcmNoQ3VzdG9tRXJyb3IoKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgLy8gY3VzdG9tIG1lc3NhZ2Ugbm90IHNldCwgdXNlIGRlZmF1bHRcbiAgICBpZiAodHlwZW9mIGFyZ3NbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICBhcmdzLnVuc2hpZnQobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgQWxnb2xpYVNlYXJjaEVycm9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIHRoaXMubmFtZSA9ICdBbGdvbGlhU2VhcmNoJyArIG5hbWUgKyAnRXJyb3InO1xuICB9XG5cbiAgaW5oZXJpdHMoQWxnb2xpYVNlYXJjaEN1c3RvbUVycm9yLCBBbGdvbGlhU2VhcmNoRXJyb3IpO1xuXG4gIHJldHVybiBBbGdvbGlhU2VhcmNoQ3VzdG9tRXJyb3I7XG59XG5cbi8vIGxhdGUgZXhwb3J0cyB0byBsZXQgdmFyaW91cyBmbiBkZWZzIGFuZCBpbmhlcml0cyB0YWtlIHBsYWNlXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQWxnb2xpYVNlYXJjaEVycm9yOiBBbGdvbGlhU2VhcmNoRXJyb3IsXG4gIFVucGFyc2FibGVKU09OOiBjcmVhdGVDdXN0b21FcnJvcihcbiAgICAnVW5wYXJzYWJsZUpTT04nLFxuICAgICdDb3VsZCBub3QgcGFyc2UgdGhlIGluY29taW5nIHJlc3BvbnNlIGFzIEpTT04sIHNlZSBlcnIubW9yZSBmb3IgZGV0YWlscydcbiAgKSxcbiAgUmVxdWVzdFRpbWVvdXQ6IGNyZWF0ZUN1c3RvbUVycm9yKFxuICAgICdSZXF1ZXN0VGltZW91dCcsXG4gICAgJ1JlcXVlc3QgdGltZWQgb3V0IGJlZm9yZSBnZXR0aW5nIGEgcmVzcG9uc2UnXG4gICksXG4gIE5ldHdvcms6IGNyZWF0ZUN1c3RvbUVycm9yKFxuICAgICdOZXR3b3JrJyxcbiAgICAnTmV0d29yayBpc3N1ZSwgc2VlIGVyci5tb3JlIGZvciBkZXRhaWxzJ1xuICApLFxuICBKU09OUFNjcmlwdEZhaWw6IGNyZWF0ZUN1c3RvbUVycm9yKFxuICAgICdKU09OUFNjcmlwdEZhaWwnLFxuICAgICc8c2NyaXB0PiB3YXMgbG9hZGVkIGJ1dCBkaWQgbm90IGNhbGwgb3VyIHByb3ZpZGVkIGNhbGxiYWNrJ1xuICApLFxuICBWYWxpZFVudGlsTm90Rm91bmQ6IGNyZWF0ZUN1c3RvbUVycm9yKFxuICAgICdWYWxpZFVudGlsTm90Rm91bmQnLFxuICAgICdUaGUgU2VjdXJlZEFQSUtleSBkb2VzIG5vdCBoYXZlIGEgdmFsaWRVbnRpbCBwYXJhbWV0ZXIuJ1xuICApLFxuICBKU09OUFNjcmlwdEVycm9yOiBjcmVhdGVDdXN0b21FcnJvcihcbiAgICAnSlNPTlBTY3JpcHRFcnJvcicsXG4gICAgJzxzY3JpcHQ+IHVuYWJsZSB0byBsb2FkIGR1ZSB0byBhbiBgZXJyb3JgIGV2ZW50IG9uIGl0J1xuICApLFxuICBPYmplY3ROb3RGb3VuZDogY3JlYXRlQ3VzdG9tRXJyb3IoXG4gICAgJ09iamVjdE5vdEZvdW5kJyxcbiAgICAnT2JqZWN0IG5vdCBmb3VuZCdcbiAgKSxcbiAgVW5rbm93bjogY3JlYXRlQ3VzdG9tRXJyb3IoXG4gICAgJ1Vua25vd24nLFxuICAgICdVbmtub3duIGVycm9yIG9jY3VyZWQnXG4gIClcbn07XG4iLCIvLyBQYXJzZSBjbG91ZCBkb2VzIG5vdCBzdXBwb3J0cyBzZXRUaW1lb3V0XG4vLyBXZSBkbyBub3Qgc3RvcmUgYSBzZXRUaW1lb3V0IHJlZmVyZW5jZSBpbiB0aGUgY2xpZW50IGV2ZXJ5dGltZVxuLy8gV2Ugb25seSBmYWxsYmFjayB0byBhIGZha2Ugc2V0VGltZW91dCB3aGVuIG5vdCBhdmFpbGFibGVcbi8vIHNldFRpbWVvdXQgY2Fubm90IGJlIG92ZXJyaWRlIGdsb2JhbGx5IHNhZGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4aXRQcm9taXNlKGZuLCBfc2V0VGltZW91dCkge1xuICBfc2V0VGltZW91dChmbiwgMCk7XG59O1xuIiwidmFyIGZvcmVhY2ggPSByZXF1aXJlKCdmb3JlYWNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWFwKGFyciwgZm4pIHtcbiAgdmFyIG5ld0FyciA9IFtdO1xuICBmb3JlYWNoKGFyciwgZnVuY3Rpb24oaXRlbSwgaXRlbUluZGV4KSB7XG4gICAgbmV3QXJyLnB1c2goZm4oaXRlbSwgaXRlbUluZGV4LCBhcnIpKTtcbiAgfSk7XG4gIHJldHVybiBuZXdBcnI7XG59O1xuIiwidmFyIGZvcmVhY2ggPSByZXF1aXJlKCdmb3JlYWNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2UoZGVzdGluYXRpb24vKiAsIHNvdXJjZXMgKi8pIHtcbiAgdmFyIHNvdXJjZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gIGZvcmVhY2goc291cmNlcywgZnVuY3Rpb24oc291cmNlKSB7XG4gICAgZm9yICh2YXIga2V5TmFtZSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5TmFtZSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkZXN0aW5hdGlvbltrZXlOYW1lXSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHNvdXJjZVtrZXlOYW1lXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBkZXN0aW5hdGlvbltrZXlOYW1lXSA9IG1lcmdlKHt9LCBkZXN0aW5hdGlvbltrZXlOYW1lXSwgc291cmNlW2tleU5hbWVdKTtcbiAgICAgICAgfSBlbHNlIGlmIChzb3VyY2Vba2V5TmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlc3RpbmF0aW9uW2tleU5hbWVdID0gc291cmNlW2tleU5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGVzdGluYXRpb247XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbWl0KG9iaiwgdGVzdCkge1xuICB2YXIga2V5cyA9IHJlcXVpcmUoJ29iamVjdC1rZXlzJyk7XG4gIHZhciBmb3JlYWNoID0gcmVxdWlyZSgnZm9yZWFjaCcpO1xuXG4gIHZhciBmaWx0ZXJlZCA9IHt9O1xuXG4gIGZvcmVhY2goa2V5cyhvYmopLCBmdW5jdGlvbiBkb0ZpbHRlcihrZXlOYW1lKSB7XG4gICAgaWYgKHRlc3Qoa2V5TmFtZSkgIT09IHRydWUpIHtcbiAgICAgIGZpbHRlcmVkW2tleU5hbWVdID0gb2JqW2tleU5hbWVdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGZpbHRlcmVkO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUGxhY2VzQ2xpZW50O1xuXG52YXIgcXMzID0gcmVxdWlyZSgncXVlcnlzdHJpbmctZXMzJyk7XG52YXIgYnVpbGRTZWFyY2hNZXRob2QgPSByZXF1aXJlKCcuL2J1aWxkU2VhcmNoTWV0aG9kLmpzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYWNlc0NsaWVudChhbGdvbGlhc2VhcmNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBwbGFjZXMoYXBwSUQsIGFwaUtleSwgb3B0cykge1xuICAgIHZhciBjbG9uZURlZXAgPSByZXF1aXJlKCcuL2Nsb25lLmpzJyk7XG5cbiAgICBvcHRzID0gb3B0cyAmJiBjbG9uZURlZXAob3B0cykgfHwge307XG4gICAgb3B0cy5ob3N0cyA9IG9wdHMuaG9zdHMgfHwgW1xuICAgICAgJ3BsYWNlcy1kc24uYWxnb2xpYS5uZXQnLFxuICAgICAgJ3BsYWNlcy0xLmFsZ29saWFuZXQuY29tJyxcbiAgICAgICdwbGFjZXMtMi5hbGdvbGlhbmV0LmNvbScsXG4gICAgICAncGxhY2VzLTMuYWxnb2xpYW5ldC5jb20nXG4gICAgXTtcblxuICAgIC8vIGFsbG93IGluaXRQbGFjZXMoKSBubyBhcmd1bWVudHMgPT4gY29tbXVuaXR5IHJhdGUgbGltaXRlZFxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IHR5cGVvZiBhcHBJRCA9PT0gJ29iamVjdCcgfHwgYXBwSUQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgYXBwSUQgPSAnJztcbiAgICAgIGFwaUtleSA9ICcnO1xuICAgICAgb3B0cy5fYWxsb3dFbXB0eUNyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgY2xpZW50ID0gYWxnb2xpYXNlYXJjaChhcHBJRCwgYXBpS2V5LCBvcHRzKTtcbiAgICB2YXIgaW5kZXggPSBjbGllbnQuaW5pdEluZGV4KCdwbGFjZXMnKTtcbiAgICBpbmRleC5zZWFyY2ggPSBidWlsZFNlYXJjaE1ldGhvZCgncXVlcnknLCAnLzEvcGxhY2VzL3F1ZXJ5Jyk7XG4gICAgaW5kZXgucmV2ZXJzZSA9IGZ1bmN0aW9uKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgZW5jb2RlZCA9IHFzMy5lbmNvZGUob3B0aW9ucyk7XG5cbiAgICAgIHJldHVybiB0aGlzLmFzLl9qc29uUmVxdWVzdCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogJy8xL3BsYWNlcy9yZXZlcnNlPycgKyBlbmNvZGVkLFxuICAgICAgICBob3N0VHlwZTogJ3JlYWQnLFxuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpbmRleC5nZXRPYmplY3QgPSBmdW5jdGlvbihvYmplY3RJRCwgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLmFzLl9qc29uUmVxdWVzdCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogJy8xL3BsYWNlcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iamVjdElEKSxcbiAgICAgICAgaG9zdFR5cGU6ICdyZWFkJyxcbiAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBpbmRleDtcbiAgfTtcbn1cbiIsInZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2FsZ29saWFzZWFyY2g6c3JjL2hvc3RJbmRleFN0YXRlLmpzJyk7XG52YXIgbG9jYWxTdG9yYWdlTmFtZXNwYWNlID0gJ2FsZ29saWFzZWFyY2gtY2xpZW50LWpzJztcblxudmFyIHN0b3JlO1xudmFyIG1vZHVsZVN0b3JlID0ge1xuICBzdGF0ZToge30sXG4gIHNldDogZnVuY3Rpb24oa2V5LCBkYXRhKSB7XG4gICAgdGhpcy5zdGF0ZVtrZXldID0gZGF0YTtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZVtrZXldO1xuICB9LFxuICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlW2tleV0gfHwgbnVsbDtcbiAgfVxufTtcblxudmFyIGxvY2FsU3RvcmFnZVN0b3JlID0ge1xuICBzZXQ6IGZ1bmN0aW9uKGtleSwgZGF0YSkge1xuICAgIG1vZHVsZVN0b3JlLnNldChrZXksIGRhdGEpOyAvLyBhbHdheXMgcmVwbGljYXRlIGxvY2FsU3RvcmFnZVN0b3JlIHRvIG1vZHVsZVN0b3JlIGluIGNhc2Ugb2YgZmFpbHVyZVxuXG4gICAgdHJ5IHtcbiAgICAgIHZhciBuYW1lc3BhY2UgPSBKU09OLnBhcnNlKGdsb2JhbC5sb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlTmFtZXNwYWNlXSk7XG4gICAgICBuYW1lc3BhY2Vba2V5XSA9IGRhdGE7XG4gICAgICBnbG9iYWwubG9jYWxTdG9yYWdlW2xvY2FsU3RvcmFnZU5hbWVzcGFjZV0gPSBKU09OLnN0cmluZ2lmeShuYW1lc3BhY2UpO1xuICAgICAgcmV0dXJuIG5hbWVzcGFjZVtrZXldO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2VGYWlsdXJlKGtleSwgZSk7XG4gICAgfVxuICB9LFxuICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShnbG9iYWwubG9jYWxTdG9yYWdlW2xvY2FsU3RvcmFnZU5hbWVzcGFjZV0pW2tleV0gfHwgbnVsbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlRmFpbHVyZShrZXksIGUpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gbG9jYWxTdG9yYWdlRmFpbHVyZShrZXksIGUpIHtcbiAgZGVidWcoJ2xvY2FsU3RvcmFnZSBmYWlsZWQgd2l0aCcsIGUpO1xuICBjbGVhbnVwKCk7XG4gIHN0b3JlID0gbW9kdWxlU3RvcmU7XG4gIHJldHVybiBzdG9yZS5nZXQoa2V5KTtcbn1cblxuc3RvcmUgPSBzdXBwb3J0c0xvY2FsU3RvcmFnZSgpID8gbG9jYWxTdG9yYWdlU3RvcmUgOiBtb2R1bGVTdG9yZTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldDogZ2V0T3JTZXQsXG4gIHNldDogZ2V0T3JTZXQsXG4gIHN1cHBvcnRzTG9jYWxTdG9yYWdlOiBzdXBwb3J0c0xvY2FsU3RvcmFnZVxufTtcblxuZnVuY3Rpb24gZ2V0T3JTZXQoa2V5LCBkYXRhKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIHN0b3JlLmdldChrZXkpO1xuICB9XG5cbiAgcmV0dXJuIHN0b3JlLnNldChrZXksIGRhdGEpO1xufVxuXG5mdW5jdGlvbiBzdXBwb3J0c0xvY2FsU3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICBpZiAoJ2xvY2FsU3RvcmFnZScgaW4gZ2xvYmFsICYmXG4gICAgICBnbG9iYWwubG9jYWxTdG9yYWdlICE9PSBudWxsKSB7XG4gICAgICBpZiAoIWdsb2JhbC5sb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlTmFtZXNwYWNlXSkge1xuICAgICAgICAvLyBhY3R1YWwgY3JlYXRpb24gb2YgdGhlIG5hbWVzcGFjZVxuICAgICAgICBnbG9iYWwubG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxTdG9yYWdlTmFtZXNwYWNlLCBKU09OLnN0cmluZ2lmeSh7fSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIEluIGNhc2Ugb2YgYW55IGVycm9yIG9uIGxvY2FsU3RvcmFnZSwgd2UgY2xlYW4gb3VyIG93biBuYW1lc3BhY2UsIHRoaXMgc2hvdWxkIGhhbmRsZVxuLy8gcXVvdGEgZXJyb3JzIHdoZW4gYSBsb3Qgb2Yga2V5cyArIGRhdGEgYXJlIHVzZWRcbmZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gIHRyeSB7XG4gICAgZ2xvYmFsLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGxvY2FsU3RvcmFnZU5hbWVzcGFjZSk7XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICAvLyBub3RoaW5nIHRvIGRvXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAnMy4zNS4xJztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NyYy9zdGFuZGFsb25lLycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscy5qcycpO1xuXG52YXIgY3NzID0ge1xuICB3cmFwcGVyOiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgfSxcbiAgaGludDoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogJzAnLFxuICAgIGxlZnQ6ICcwJyxcbiAgICBib3JkZXJDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICBib3hTaGFkb3c6ICdub25lJyxcbiAgICAvLyAjNzQxOiBmaXggaGludCBvcGFjaXR5IGlzc3VlIG9uIGlPU1xuICAgIG9wYWNpdHk6ICcxJ1xuICB9LFxuICBpbnB1dDoge1xuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgIHZlcnRpY2FsQWxpZ246ICd0b3AnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICB9LFxuICBpbnB1dFdpdGhOb0hpbnQ6IHtcbiAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICB2ZXJ0aWNhbEFsaWduOiAndG9wJ1xuICB9LFxuICBkcm9wZG93bjoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogJzEwMCUnLFxuICAgIGxlZnQ6ICcwJyxcbiAgICB6SW5kZXg6ICcxMDAnLFxuICAgIGRpc3BsYXk6ICdub25lJ1xuICB9LFxuICBzdWdnZXN0aW9uczoge1xuICAgIGRpc3BsYXk6ICdibG9jaydcbiAgfSxcbiAgc3VnZ2VzdGlvbjoge1xuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gIH0sXG4gIHN1Z2dlc3Rpb25DaGlsZDoge1xuICAgIHdoaXRlU3BhY2U6ICdub3JtYWwnXG4gIH0sXG4gIGx0cjoge1xuICAgIGxlZnQ6ICcwJyxcbiAgICByaWdodDogJ2F1dG8nXG4gIH0sXG4gIHJ0bDoge1xuICAgIGxlZnQ6ICdhdXRvJyxcbiAgICByaWdodDogJzAnXG4gIH0sXG4gIGRlZmF1bHRDbGFzc2VzOiB7XG4gICAgcm9vdDogJ2FsZ29saWEtYXV0b2NvbXBsZXRlJyxcbiAgICBwcmVmaXg6ICdhYScsXG4gICAgbm9QcmVmaXg6IGZhbHNlLFxuICAgIGRyb3Bkb3duTWVudTogJ2Ryb3Bkb3duLW1lbnUnLFxuICAgIGlucHV0OiAnaW5wdXQnLFxuICAgIGhpbnQ6ICdoaW50JyxcbiAgICBzdWdnZXN0aW9uczogJ3N1Z2dlc3Rpb25zJyxcbiAgICBzdWdnZXN0aW9uOiAnc3VnZ2VzdGlvbicsXG4gICAgY3Vyc29yOiAnY3Vyc29yJyxcbiAgICBkYXRhc2V0OiAnZGF0YXNldCcsXG4gICAgZW1wdHk6ICdlbXB0eSdcbiAgfSxcbiAgLy8gd2lsbCBiZSBtZXJnZWQgd2l0aCB0aGUgZGVmYXVsdCBvbmVzIGlmIGFwcGVuZFRvIGlzIHVzZWRcbiAgYXBwZW5kVG86IHtcbiAgICB3cmFwcGVyOiB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHpJbmRleDogJzEwMCcsXG4gICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICB9LFxuICAgIGlucHV0OiB7fSxcbiAgICBpbnB1dFdpdGhOb0hpbnQ6IHt9LFxuICAgIGRyb3Bkb3duOiB7XG4gICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgfVxuICB9XG59O1xuXG4vLyBpZSBzcGVjaWZpYyBzdHlsaW5nXG5pZiAoXy5pc01zaWUoKSkge1xuICAvLyBpZTYtOCAoYW5kIDk/KSBkb2Vzbid0IGZpcmUgaG92ZXIgYW5kIGNsaWNrIGV2ZW50cyBmb3IgZWxlbWVudHMgd2l0aFxuICAvLyB0cmFuc3BhcmVudCBiYWNrZ3JvdW5kcywgZm9yIGEgd29ya2Fyb3VuZCwgdXNlIDF4MSB0cmFuc3BhcmVudCBnaWZcbiAgXy5taXhpbihjc3MuaW5wdXQsIHtcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3KSdcbiAgfSk7XG59XG5cbi8vIGllNyBhbmQgdW5kZXIgc3BlY2lmaWMgc3R5bGluZ1xuaWYgKF8uaXNNc2llKCkgJiYgXy5pc01zaWUoKSA8PSA3KSB7XG4gIC8vIGlmIHNvbWVvbmUgY2FuIHRlbGwgbWUgd2h5IHRoaXMgaXMgbmVjZXNzYXJ5IHRvIGFsaWduXG4gIC8vIHRoZSBoaW50IHdpdGggdGhlIHF1ZXJ5IGluIGllNywgaSdsbCBzZW5kIHlvdSAkNSAtIEBKYWtlSGFyZGluZ1xuICBfLm1peGluKGNzcy5pbnB1dCwge21hcmdpblRvcDogJy0xcHgnfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3NzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGF0YXNldEtleSA9ICdhYURhdGFzZXQnO1xudmFyIHZhbHVlS2V5ID0gJ2FhVmFsdWUnO1xudmFyIGRhdHVtS2V5ID0gJ2FhRGF0dW0nO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscy5qcycpO1xudmFyIERPTSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9kb20uanMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sLmpzJyk7XG52YXIgY3NzID0gcmVxdWlyZSgnLi9jc3MuanMnKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL2V2ZW50X2VtaXR0ZXIuanMnKTtcblxuLy8gY29uc3RydWN0b3Jcbi8vIC0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIERhdGFzZXQobykge1xuICBvID0gbyB8fCB7fTtcbiAgby50ZW1wbGF0ZXMgPSBvLnRlbXBsYXRlcyB8fCB7fTtcblxuICBpZiAoIW8uc291cmNlKSB7XG4gICAgXy5lcnJvcignbWlzc2luZyBzb3VyY2UnKTtcbiAgfVxuXG4gIGlmIChvLm5hbWUgJiYgIWlzVmFsaWROYW1lKG8ubmFtZSkpIHtcbiAgICBfLmVycm9yKCdpbnZhbGlkIGRhdGFzZXQgbmFtZTogJyArIG8ubmFtZSk7XG4gIH1cblxuICAvLyB0cmFja3MgdGhlIGxhc3QgcXVlcnkgdGhlIGRhdGFzZXQgd2FzIHVwZGF0ZWQgZm9yXG4gIHRoaXMucXVlcnkgPSBudWxsO1xuICB0aGlzLl9pc0VtcHR5ID0gdHJ1ZTtcblxuICB0aGlzLmhpZ2hsaWdodCA9ICEhby5oaWdobGlnaHQ7XG4gIHRoaXMubmFtZSA9IHR5cGVvZiBvLm5hbWUgPT09ICd1bmRlZmluZWQnIHx8IG8ubmFtZSA9PT0gbnVsbCA/IF8uZ2V0VW5pcXVlSWQoKSA6IG8ubmFtZTtcblxuICB0aGlzLnNvdXJjZSA9IG8uc291cmNlO1xuICB0aGlzLmRpc3BsYXlGbiA9IGdldERpc3BsYXlGbihvLmRpc3BsYXkgfHwgby5kaXNwbGF5S2V5KTtcblxuICB0aGlzLmRlYm91bmNlID0gby5kZWJvdW5jZTtcblxuICB0aGlzLmNhY2hlID0gby5jYWNoZSAhPT0gZmFsc2U7XG5cbiAgdGhpcy50ZW1wbGF0ZXMgPSBnZXRUZW1wbGF0ZXMoby50ZW1wbGF0ZXMsIHRoaXMuZGlzcGxheUZuKTtcblxuICB0aGlzLmNzcyA9IF8ubWl4aW4oe30sIGNzcywgby5hcHBlbmRUbyA/IGNzcy5hcHBlbmRUbyA6IHt9KTtcbiAgdGhpcy5jc3NDbGFzc2VzID0gby5jc3NDbGFzc2VzID0gXy5taXhpbih7fSwgY3NzLmRlZmF1bHRDbGFzc2VzLCBvLmNzc0NsYXNzZXMgfHwge30pO1xuICB0aGlzLmNzc0NsYXNzZXMucHJlZml4ID1cbiAgICBvLmNzc0NsYXNzZXMuZm9ybWF0dGVkUHJlZml4IHx8IF8uZm9ybWF0UHJlZml4KHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5ub1ByZWZpeCk7XG5cbiAgdmFyIGNsYXp6ID0gXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLmRhdGFzZXQpO1xuICB0aGlzLiRlbCA9IG8uJG1lbnUgJiYgby4kbWVudS5maW5kKGNsYXp6ICsgJy0nICsgdGhpcy5uYW1lKS5sZW5ndGggPiAwID9cbiAgICBET00uZWxlbWVudChvLiRtZW51LmZpbmQoY2xhenogKyAnLScgKyB0aGlzLm5hbWUpWzBdKSA6XG4gICAgRE9NLmVsZW1lbnQoXG4gICAgICBodG1sLmRhdGFzZXQucmVwbGFjZSgnJUNMQVNTJScsIHRoaXMubmFtZSlcbiAgICAgICAgLnJlcGxhY2UoJyVQUkVGSVglJywgdGhpcy5jc3NDbGFzc2VzLnByZWZpeClcbiAgICAgICAgLnJlcGxhY2UoJyVEQVRBU0VUJScsIHRoaXMuY3NzQ2xhc3Nlcy5kYXRhc2V0KVxuICAgICk7XG5cbiAgdGhpcy4kbWVudSA9IG8uJG1lbnU7XG4gIHRoaXMuY2xlYXJDYWNoZWRTdWdnZXN0aW9ucygpO1xufVxuXG4vLyBzdGF0aWMgbWV0aG9kc1xuLy8gLS0tLS0tLS0tLS0tLS1cblxuRGF0YXNldC5leHRyYWN0RGF0YXNldE5hbWUgPSBmdW5jdGlvbiBleHRyYWN0RGF0YXNldE5hbWUoZWwpIHtcbiAgcmV0dXJuIERPTS5lbGVtZW50KGVsKS5kYXRhKGRhdGFzZXRLZXkpO1xufTtcblxuRGF0YXNldC5leHRyYWN0VmFsdWUgPSBmdW5jdGlvbiBleHRyYWN0VmFsdWUoZWwpIHtcbiAgcmV0dXJuIERPTS5lbGVtZW50KGVsKS5kYXRhKHZhbHVlS2V5KTtcbn07XG5cbkRhdGFzZXQuZXh0cmFjdERhdHVtID0gZnVuY3Rpb24gZXh0cmFjdERhdHVtKGVsKSB7XG4gIHZhciBkYXR1bSA9IERPTS5lbGVtZW50KGVsKS5kYXRhKGRhdHVtS2V5KTtcbiAgaWYgKHR5cGVvZiBkYXR1bSA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBaZXB0byBoYXMgYW4gYXV0b21hdGljIGRlc2VyaWFsaXphdGlvbiBvZiB0aGVcbiAgICAvLyBKU09OIGVuY29kZWQgZGF0YSBhdHRyaWJ1dGVcbiAgICBkYXR1bSA9IEpTT04ucGFyc2UoZGF0dW0pO1xuICB9XG4gIHJldHVybiBkYXR1bTtcbn07XG5cbi8vIGluc3RhbmNlIG1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS1cblxuXy5taXhpbihEYXRhc2V0LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG5cbiAgLy8gIyMjIHByaXZhdGVcblxuICBfcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgaWYgKCF0aGlzLiRlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICB2YXIgaGFzU3VnZ2VzdGlvbnM7XG4gICAgdmFyIHJlbmRlckFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgdGhpcy4kZWwuZW1wdHkoKTtcblxuICAgIGhhc1N1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnMgJiYgc3VnZ2VzdGlvbnMubGVuZ3RoO1xuICAgIHRoaXMuX2lzRW1wdHkgPSAhaGFzU3VnZ2VzdGlvbnM7XG5cbiAgICBpZiAoIWhhc1N1Z2dlc3Rpb25zICYmIHRoaXMudGVtcGxhdGVzLmVtcHR5KSB7XG4gICAgICB0aGlzLiRlbFxuICAgICAgICAuaHRtbChnZXRFbXB0eUh0bWwuYXBwbHkodGhpcywgcmVuZGVyQXJncykpXG4gICAgICAgIC5wcmVwZW5kKHRoYXQudGVtcGxhdGVzLmhlYWRlciA/IGdldEhlYWRlckh0bWwuYXBwbHkodGhpcywgcmVuZGVyQXJncykgOiBudWxsKVxuICAgICAgICAuYXBwZW5kKHRoYXQudGVtcGxhdGVzLmZvb3RlciA/IGdldEZvb3Rlckh0bWwuYXBwbHkodGhpcywgcmVuZGVyQXJncykgOiBudWxsKTtcbiAgICB9IGVsc2UgaWYgKGhhc1N1Z2dlc3Rpb25zKSB7XG4gICAgICB0aGlzLiRlbFxuICAgICAgICAuaHRtbChnZXRTdWdnZXN0aW9uc0h0bWwuYXBwbHkodGhpcywgcmVuZGVyQXJncykpXG4gICAgICAgIC5wcmVwZW5kKHRoYXQudGVtcGxhdGVzLmhlYWRlciA/IGdldEhlYWRlckh0bWwuYXBwbHkodGhpcywgcmVuZGVyQXJncykgOiBudWxsKVxuICAgICAgICAuYXBwZW5kKHRoYXQudGVtcGxhdGVzLmZvb3RlciA/IGdldEZvb3Rlckh0bWwuYXBwbHkodGhpcywgcmVuZGVyQXJncykgOiBudWxsKTtcbiAgICB9IGVsc2UgaWYgKHN1Z2dlc3Rpb25zICYmICFBcnJheS5pc0FycmF5KHN1Z2dlc3Rpb25zKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc3VnZ2VzdGlvbnMgbXVzdCBiZSBhbiBhcnJheScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiRtZW51KSB7XG4gICAgICB0aGlzLiRtZW51LmFkZENsYXNzKFxuICAgICAgICB0aGlzLmNzc0NsYXNzZXMucHJlZml4ICsgKGhhc1N1Z2dlc3Rpb25zID8gJ3dpdGgnIDogJ3dpdGhvdXQnKSArICctJyArIHRoaXMubmFtZVxuICAgICAgKS5yZW1vdmVDbGFzcyhcbiAgICAgICAgdGhpcy5jc3NDbGFzc2VzLnByZWZpeCArIChoYXNTdWdnZXN0aW9ucyA/ICd3aXRob3V0JyA6ICd3aXRoJykgKyAnLScgKyB0aGlzLm5hbWVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcsIHF1ZXJ5KTtcblxuICAgIGZ1bmN0aW9uIGdldEVtcHR5SHRtbCgpIHtcbiAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgYXJncyA9IFt7cXVlcnk6IHF1ZXJ5LCBpc0VtcHR5OiB0cnVlfV0uY29uY2F0KGFyZ3MpO1xuICAgICAgcmV0dXJuIHRoYXQudGVtcGxhdGVzLmVtcHR5LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN1Z2dlc3Rpb25zSHRtbCgpIHtcbiAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgdmFyICRzdWdnZXN0aW9ucztcbiAgICAgIHZhciBub2RlcztcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdmFyIHN1Z2dlc3Rpb25zSHRtbCA9IGh0bWwuc3VnZ2VzdGlvbnMuXG4gICAgICAgIHJlcGxhY2UoJyVQUkVGSVglJywgdGhpcy5jc3NDbGFzc2VzLnByZWZpeCkuXG4gICAgICAgIHJlcGxhY2UoJyVTVUdHRVNUSU9OUyUnLCB0aGlzLmNzc0NsYXNzZXMuc3VnZ2VzdGlvbnMpO1xuICAgICAgJHN1Z2dlc3Rpb25zID0gRE9NXG4gICAgICAgIC5lbGVtZW50KHN1Z2dlc3Rpb25zSHRtbClcbiAgICAgICAgLmNzcyh0aGlzLmNzcy5zdWdnZXN0aW9ucyk7XG5cbiAgICAgIC8vIGpRdWVyeSNhcHBlbmQgZG9lc24ndCBzdXBwb3J0IGFycmF5cyBhcyB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICAgIC8vIHVudGlsIHZlcnNpb24gMS44LCBzZWUgaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTEyMzFcbiAgICAgIG5vZGVzID0gXy5tYXAoc3VnZ2VzdGlvbnMsIGdldFN1Z2dlc3Rpb25Ob2RlKTtcbiAgICAgICRzdWdnZXN0aW9ucy5hcHBlbmQuYXBwbHkoJHN1Z2dlc3Rpb25zLCBub2Rlcyk7XG5cbiAgICAgIHJldHVybiAkc3VnZ2VzdGlvbnM7XG5cbiAgICAgIGZ1bmN0aW9uIGdldFN1Z2dlc3Rpb25Ob2RlKHN1Z2dlc3Rpb24pIHtcbiAgICAgICAgdmFyICRlbDtcblxuICAgICAgICB2YXIgc3VnZ2VzdGlvbkh0bWwgPSBodG1sLnN1Z2dlc3Rpb24uXG4gICAgICAgICAgcmVwbGFjZSgnJVBSRUZJWCUnLCBzZWxmLmNzc0NsYXNzZXMucHJlZml4KS5cbiAgICAgICAgICByZXBsYWNlKCclU1VHR0VTVElPTiUnLCBzZWxmLmNzc0NsYXNzZXMuc3VnZ2VzdGlvbik7XG4gICAgICAgICRlbCA9IERPTS5lbGVtZW50KHN1Z2dlc3Rpb25IdG1sKVxuICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgIHJvbGU6ICdvcHRpb24nLFxuICAgICAgICAgICAgaWQ6IFsnb3B0aW9uJywgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwKV0uam9pbignLScpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuYXBwZW5kKHRoYXQudGVtcGxhdGVzLnN1Z2dlc3Rpb24uYXBwbHkodGhpcywgW3N1Z2dlc3Rpb25dLmNvbmNhdChhcmdzKSkpO1xuXG4gICAgICAgICRlbC5kYXRhKGRhdGFzZXRLZXksIHRoYXQubmFtZSk7XG4gICAgICAgICRlbC5kYXRhKHZhbHVlS2V5LCB0aGF0LmRpc3BsYXlGbihzdWdnZXN0aW9uKSB8fCB1bmRlZmluZWQpOyAvLyB0aGlzIGxlZCB0byB1bmRlZmluZWQgcmV0dXJuIHZhbHVlXG4gICAgICAgICRlbC5kYXRhKGRhdHVtS2V5LCBKU09OLnN0cmluZ2lmeShzdWdnZXN0aW9uKSk7XG4gICAgICAgICRlbC5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oKSB7IERPTS5lbGVtZW50KHRoaXMpLmNzcyhzZWxmLmNzcy5zdWdnZXN0aW9uQ2hpbGQpOyB9KTtcblxuICAgICAgICByZXR1cm4gJGVsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEhlYWRlckh0bWwoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgIGFyZ3MgPSBbe3F1ZXJ5OiBxdWVyeSwgaXNFbXB0eTogIWhhc1N1Z2dlc3Rpb25zfV0uY29uY2F0KGFyZ3MpO1xuICAgICAgcmV0dXJuIHRoYXQudGVtcGxhdGVzLmhlYWRlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb290ZXJIdG1sKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICBhcmdzID0gW3txdWVyeTogcXVlcnksIGlzRW1wdHk6ICFoYXNTdWdnZXN0aW9uc31dLmNvbmNhdChhcmdzKTtcbiAgICAgIHJldHVybiB0aGF0LnRlbXBsYXRlcy5mb290ZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9LFxuXG4gIC8vICMjIyBwdWJsaWNcblxuICBnZXRSb290OiBmdW5jdGlvbiBnZXRSb290KCkge1xuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShxdWVyeSkge1xuICAgIGZ1bmN0aW9uIGhhbmRsZVN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zKSB7XG4gICAgICAvLyBpZiB0aGUgdXBkYXRlIGhhcyBiZWVuIGNhbmNlbGVkIG9yIGlmIHRoZSBxdWVyeSBoYXMgY2hhbmdlZFxuICAgICAgLy8gZG8gbm90IHJlbmRlciB0aGUgc3VnZ2VzdGlvbnMgYXMgdGhleSd2ZSBiZWNvbWUgb3V0ZGF0ZWRcbiAgICAgIGlmICghdGhpcy5jYW5jZWxlZCAmJiBxdWVyeSA9PT0gdGhpcy5xdWVyeSkge1xuICAgICAgICAvLyBjb25jYXQgYWxsIHRoZSBvdGhlciBhcmd1bWVudHMgdGhhdCBjb3VsZCBoYXZlIGJlZW4gcGFzc2VkXG4gICAgICAgIC8vIHRvIHRoZSByZW5kZXIgZnVuY3Rpb24sIGFuZCBmb3J3YXJkIHRoZW0gdG8gX3JlbmRlclxuICAgICAgICB2YXIgZXh0cmFBcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICB0aGlzLmNhY2hlU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zLCBleHRyYUFyZ3MpO1xuICAgICAgICB0aGlzLl9yZW5kZXIuYXBwbHkodGhpcywgW3F1ZXJ5LCBzdWdnZXN0aW9uc10uY29uY2F0KGV4dHJhQXJncykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICB0aGlzLmNhbmNlbGVkID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5zaG91bGRGZXRjaEZyb21DYWNoZShxdWVyeSkpIHtcbiAgICAgIGhhbmRsZVN1Z2dlc3Rpb25zLmFwcGx5KHRoaXMsIFt0aGlzLmNhY2hlZFN1Z2dlc3Rpb25zXS5jb25jYXQodGhpcy5jYWNoZWRSZW5kZXJFeHRyYUFyZ3MpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGV4ZWNTb3VyY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gV2hlbiB0aGUgY2FsbCBpcyBkZWJvdW5jZWQgdGhlIGNvbmRpdGlvbiBhdm9pZCB0byBkbyBhIHVzZWxlc3NcbiAgICAgICAgLy8gcmVxdWVzdCB3aXRoIHRoZSBsYXN0IGNoYXJhY3RlciB3aGVuIHRoZSBpbnB1dCBoYXMgYmVlbiBjbGVhcmVkXG4gICAgICAgIGlmICghdGhhdC5jYW5jZWxlZCkge1xuICAgICAgICAgIHRoYXQuc291cmNlKHF1ZXJ5LCBoYW5kbGVTdWdnZXN0aW9ucy5iaW5kKHRoYXQpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMuZGVib3VuY2UpIHtcbiAgICAgICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5kZWJvdW5jZVRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgIGV4ZWNTb3VyY2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGVib3VuY2VUaW1lb3V0KTtcbiAgICAgICAgdGhpcy5kZWJvdW5jZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB0aGlzLmRlYm91bmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV4ZWNTb3VyY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY2FjaGVTdWdnZXN0aW9uczogZnVuY3Rpb24gY2FjaGVTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMsIGV4dHJhQXJncykge1xuICAgIHRoaXMuY2FjaGVkUXVlcnkgPSBxdWVyeTtcbiAgICB0aGlzLmNhY2hlZFN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnM7XG4gICAgdGhpcy5jYWNoZWRSZW5kZXJFeHRyYUFyZ3MgPSBleHRyYUFyZ3M7XG4gIH0sXG5cbiAgc2hvdWxkRmV0Y2hGcm9tQ2FjaGU6IGZ1bmN0aW9uIHNob3VsZEZldGNoRnJvbUNhY2hlKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUgJiZcbiAgICAgIHRoaXMuY2FjaGVkUXVlcnkgPT09IHF1ZXJ5ICYmXG4gICAgICB0aGlzLmNhY2hlZFN1Z2dlc3Rpb25zICYmXG4gICAgICB0aGlzLmNhY2hlZFN1Z2dlc3Rpb25zLmxlbmd0aDtcbiAgfSxcblxuICBjbGVhckNhY2hlZFN1Z2dlc3Rpb25zOiBmdW5jdGlvbiBjbGVhckNhY2hlZFN1Z2dlc3Rpb25zKCkge1xuICAgIGRlbGV0ZSB0aGlzLmNhY2hlZFF1ZXJ5O1xuICAgIGRlbGV0ZSB0aGlzLmNhY2hlZFN1Z2dlc3Rpb25zO1xuICAgIGRlbGV0ZSB0aGlzLmNhY2hlZFJlbmRlckV4dHJhQXJncztcbiAgfSxcblxuICBjYW5jZWw6IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICB0aGlzLmNhbmNlbGVkID0gdHJ1ZTtcbiAgfSxcblxuICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuJGVsKSB7XG4gICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgdGhpcy4kZWwuZW1wdHkoKTtcbiAgICAgIHRoaXMudHJpZ2dlcigncmVuZGVyZWQnLCAnJyk7XG4gICAgfVxuICB9LFxuXG4gIGlzRW1wdHk6IGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRW1wdHk7XG4gIH0sXG5cbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICB0aGlzLmNsZWFyQ2FjaGVkU3VnZ2VzdGlvbnMoKTtcbiAgICB0aGlzLiRlbCA9IG51bGw7XG4gIH1cbn0pO1xuXG4vLyBoZWxwZXIgZnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGdldERpc3BsYXlGbihkaXNwbGF5KSB7XG4gIGRpc3BsYXkgPSBkaXNwbGF5IHx8ICd2YWx1ZSc7XG5cbiAgcmV0dXJuIF8uaXNGdW5jdGlvbihkaXNwbGF5KSA/IGRpc3BsYXkgOiBkaXNwbGF5Rm47XG5cbiAgZnVuY3Rpb24gZGlzcGxheUZuKG9iaikge1xuICAgIHJldHVybiBvYmpbZGlzcGxheV07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGVtcGxhdGVzKHRlbXBsYXRlcywgZGlzcGxheUZuKSB7XG4gIHJldHVybiB7XG4gICAgZW1wdHk6IHRlbXBsYXRlcy5lbXB0eSAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLmVtcHR5KSxcbiAgICBoZWFkZXI6IHRlbXBsYXRlcy5oZWFkZXIgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5oZWFkZXIpLFxuICAgIGZvb3RlcjogdGVtcGxhdGVzLmZvb3RlciAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLmZvb3RlciksXG4gICAgc3VnZ2VzdGlvbjogdGVtcGxhdGVzLnN1Z2dlc3Rpb24gfHwgc3VnZ2VzdGlvblRlbXBsYXRlXG4gIH07XG5cbiAgZnVuY3Rpb24gc3VnZ2VzdGlvblRlbXBsYXRlKGNvbnRleHQpIHtcbiAgICByZXR1cm4gJzxwPicgKyBkaXNwbGF5Rm4oY29udGV4dCkgKyAnPC9wPic7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNWYWxpZE5hbWUoc3RyKSB7XG4gIC8vIGRhc2hlcywgdW5kZXJzY29yZXMsIGxldHRlcnMsIGFuZCBudW1iZXJzXG4gIHJldHVybiAoL15bX2EtekEtWjAtOS1dKyQvKS50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YXNldDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF8gPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMuanMnKTtcbnZhciBET00gPSByZXF1aXJlKCcuLi9jb21tb24vZG9tLmpzJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi9ldmVudF9lbWl0dGVyLmpzJyk7XG52YXIgRGF0YXNldCA9IHJlcXVpcmUoJy4vZGF0YXNldC5qcycpO1xudmFyIGNzcyA9IHJlcXVpcmUoJy4vY3NzLmpzJyk7XG5cbi8vIGNvbnN0cnVjdG9yXG4vLyAtLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBEcm9wZG93bihvKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIG9uU3VnZ2VzdGlvbkNsaWNrO1xuICB2YXIgb25TdWdnZXN0aW9uTW91c2VFbnRlcjtcbiAgdmFyIG9uU3VnZ2VzdGlvbk1vdXNlTGVhdmU7XG5cbiAgbyA9IG8gfHwge307XG5cbiAgaWYgKCFvLm1lbnUpIHtcbiAgICBfLmVycm9yKCdtZW51IGlzIHJlcXVpcmVkJyk7XG4gIH1cblxuICBpZiAoIV8uaXNBcnJheShvLmRhdGFzZXRzKSAmJiAhXy5pc09iamVjdChvLmRhdGFzZXRzKSkge1xuICAgIF8uZXJyb3IoJzEgb3IgbW9yZSBkYXRhc2V0cyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICghby5kYXRhc2V0cykge1xuICAgIF8uZXJyb3IoJ2RhdGFzZXRzIGlzIHJlcXVpcmVkJyk7XG4gIH1cblxuICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICB0aGlzLmlzRW1wdHkgPSB0cnVlO1xuICB0aGlzLm1pbkxlbmd0aCA9IG8ubWluTGVuZ3RoIHx8IDA7XG4gIHRoaXMudGVtcGxhdGVzID0ge307XG4gIHRoaXMuYXBwZW5kVG8gPSBvLmFwcGVuZFRvIHx8IGZhbHNlO1xuICB0aGlzLmNzcyA9IF8ubWl4aW4oe30sIGNzcywgby5hcHBlbmRUbyA/IGNzcy5hcHBlbmRUbyA6IHt9KTtcbiAgdGhpcy5jc3NDbGFzc2VzID0gby5jc3NDbGFzc2VzID0gXy5taXhpbih7fSwgY3NzLmRlZmF1bHRDbGFzc2VzLCBvLmNzc0NsYXNzZXMgfHwge30pO1xuICB0aGlzLmNzc0NsYXNzZXMucHJlZml4ID1cbiAgICBvLmNzc0NsYXNzZXMuZm9ybWF0dGVkUHJlZml4IHx8IF8uZm9ybWF0UHJlZml4KHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5ub1ByZWZpeCk7XG5cbiAgLy8gYm91bmQgZnVuY3Rpb25zXG4gIG9uU3VnZ2VzdGlvbkNsaWNrID0gXy5iaW5kKHRoaXMuX29uU3VnZ2VzdGlvbkNsaWNrLCB0aGlzKTtcbiAgb25TdWdnZXN0aW9uTW91c2VFbnRlciA9IF8uYmluZCh0aGlzLl9vblN1Z2dlc3Rpb25Nb3VzZUVudGVyLCB0aGlzKTtcbiAgb25TdWdnZXN0aW9uTW91c2VMZWF2ZSA9IF8uYmluZCh0aGlzLl9vblN1Z2dlc3Rpb25Nb3VzZUxlYXZlLCB0aGlzKTtcblxuICB2YXIgY3NzQ2xhc3MgPSBfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuc3VnZ2VzdGlvbik7XG4gIHRoaXMuJG1lbnUgPSBET00uZWxlbWVudChvLm1lbnUpXG4gICAgLm9uKCdtb3VzZWVudGVyLmFhJywgY3NzQ2xhc3MsIG9uU3VnZ2VzdGlvbk1vdXNlRW50ZXIpXG4gICAgLm9uKCdtb3VzZWxlYXZlLmFhJywgY3NzQ2xhc3MsIG9uU3VnZ2VzdGlvbk1vdXNlTGVhdmUpXG4gICAgLm9uKCdjbGljay5hYScsIGNzc0NsYXNzLCBvblN1Z2dlc3Rpb25DbGljayk7XG5cbiAgdGhpcy4kY29udGFpbmVyID0gby5hcHBlbmRUbyA/IG8ud3JhcHBlciA6IHRoaXMuJG1lbnU7XG5cbiAgaWYgKG8udGVtcGxhdGVzICYmIG8udGVtcGxhdGVzLmhlYWRlcikge1xuICAgIHRoaXMudGVtcGxhdGVzLmhlYWRlciA9IF8udGVtcGxhdGlmeShvLnRlbXBsYXRlcy5oZWFkZXIpO1xuICAgIHRoaXMuJG1lbnUucHJlcGVuZCh0aGlzLnRlbXBsYXRlcy5oZWFkZXIoKSk7XG4gIH1cblxuICBpZiAoby50ZW1wbGF0ZXMgJiYgby50ZW1wbGF0ZXMuZW1wdHkpIHtcbiAgICB0aGlzLnRlbXBsYXRlcy5lbXB0eSA9IF8udGVtcGxhdGlmeShvLnRlbXBsYXRlcy5lbXB0eSk7XG4gICAgdGhpcy4kZW1wdHkgPSBET00uZWxlbWVudCgnPGRpdiBjbGFzcz1cIicgK1xuICAgICAgXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLmVtcHR5LCB0cnVlKSArICdcIj4nICtcbiAgICAgICc8L2Rpdj4nKTtcbiAgICB0aGlzLiRtZW51LmFwcGVuZCh0aGlzLiRlbXB0eSk7XG4gICAgdGhpcy4kZW1wdHkuaGlkZSgpO1xuICB9XG5cbiAgdGhpcy5kYXRhc2V0cyA9IF8ubWFwKG8uZGF0YXNldHMsIGZ1bmN0aW9uKG9EYXRhc2V0KSB7XG4gICAgcmV0dXJuIGluaXRpYWxpemVEYXRhc2V0KHRoYXQuJG1lbnUsIG9EYXRhc2V0LCBvLmNzc0NsYXNzZXMpO1xuICB9KTtcbiAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGZ1bmN0aW9uKGRhdGFzZXQpIHtcbiAgICB2YXIgcm9vdCA9IGRhdGFzZXQuZ2V0Um9vdCgpO1xuICAgIGlmIChyb290ICYmIHJvb3QucGFyZW50KCkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGF0LiRtZW51LmFwcGVuZChyb290KTtcbiAgICB9XG4gICAgZGF0YXNldC5vblN5bmMoJ3JlbmRlcmVkJywgdGhhdC5fb25SZW5kZXJlZCwgdGhhdCk7XG4gIH0pO1xuXG4gIGlmIChvLnRlbXBsYXRlcyAmJiBvLnRlbXBsYXRlcy5mb290ZXIpIHtcbiAgICB0aGlzLnRlbXBsYXRlcy5mb290ZXIgPSBfLnRlbXBsYXRpZnkoby50ZW1wbGF0ZXMuZm9vdGVyKTtcbiAgICB0aGlzLiRtZW51LmFwcGVuZCh0aGlzLnRlbXBsYXRlcy5mb290ZXIoKSk7XG4gIH1cblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIERPTS5lbGVtZW50KHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuX3JlZHJhdygpO1xuICB9KTtcbn1cblxuLy8gaW5zdGFuY2UgbWV0aG9kc1xuLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG5fLm1peGluKERyb3Bkb3duLnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG5cbiAgLy8gIyMjIHByaXZhdGVcblxuICBfb25TdWdnZXN0aW9uQ2xpY2s6IGZ1bmN0aW9uIG9uU3VnZ2VzdGlvbkNsaWNrKCRlKSB7XG4gICAgdGhpcy50cmlnZ2VyKCdzdWdnZXN0aW9uQ2xpY2tlZCcsIERPTS5lbGVtZW50KCRlLmN1cnJlbnRUYXJnZXQpKTtcbiAgfSxcblxuICBfb25TdWdnZXN0aW9uTW91c2VFbnRlcjogZnVuY3Rpb24gb25TdWdnZXN0aW9uTW91c2VFbnRlcigkZSkge1xuICAgIHZhciBlbHQgPSBET00uZWxlbWVudCgkZS5jdXJyZW50VGFyZ2V0KTtcbiAgICBpZiAoZWx0Lmhhc0NsYXNzKF8uY2xhc3NOYW1lKHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXgsIHRoaXMuY3NzQ2xhc3Nlcy5jdXJzb3IsIHRydWUpKSkge1xuICAgICAgLy8gd2UncmUgYWxyZWFkeSBvbiB0aGUgY3Vyc29yXG4gICAgICAvLyA9PiB3ZSdyZSBwcm9iYWJseSBlbnRlcmluZyBpdCBhZ2FpbiBhZnRlciBsZWF2aW5nIGl0IGZvciBhIG5lc3RlZCBkaXZcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlQ3Vyc29yKCk7XG5cbiAgICAvLyBGaXhlcyBpT1MgZG91YmxlIHRhcCBiZWhhdmlvdXIsIGJ5IG1vZGlmeWluZyB0aGUgRE9NIHJpZ2h0IGJlZm9yZSB0aGVcbiAgICAvLyBuYXRpdmUgaHJlZiBjbGlja3MgaGFwcGVucywgaU9TIHdpbGwgcmVxdWlyZXMgYW5vdGhlciB0YXAgdG8gZm9sbG93XG4gICAgLy8gYSBzdWdnZXN0aW9uIHRoYXQgaGFzIGFuIDxhIGhyZWY+IGVsZW1lbnQgaW5zaWRlXG4gICAgLy8gaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9zZWFyY2g/cT1pb3MrZG91YmxlK3RhcCtidWcraHJlZlxuICAgIHZhciBzdWdnZXN0aW9uID0gdGhpcztcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgLy8gdGhpcyBleGFjdCBsaW5lLCB3aGVuIGluc2lkZSB0aGUgbWFpbiBsb29wLCB3aWxsIHRyaWdnZXIgYSBkb3VibGUgdGFwIGJ1Z1xuICAgICAgLy8gb24gaU9TIGRldmljZXNcbiAgICAgIHN1Z2dlc3Rpb24uX3NldEN1cnNvcihlbHQsIGZhbHNlKTtcbiAgICB9LCAwKTtcbiAgfSxcblxuICBfb25TdWdnZXN0aW9uTW91c2VMZWF2ZTogZnVuY3Rpb24gb25TdWdnZXN0aW9uTW91c2VMZWF2ZSgkZSkge1xuICAgIC8vICRlLnJlbGF0ZWRUYXJnZXQgaXMgdGhlIGBFdmVudFRhcmdldGAgdGhlIHBvaW50aW5nIGRldmljZSBlbnRlcmVkIHRvXG4gICAgaWYgKCRlLnJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgIHZhciBlbHQgPSBET00uZWxlbWVudCgkZS5yZWxhdGVkVGFyZ2V0KTtcbiAgICAgIGlmIChlbHQuY2xvc2VzdCgnLicgKyBfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuY3Vyc29yLCB0cnVlKSkubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBvdXIgZmF0aGVyIGlzIGEgY3Vyc29yXG4gICAgICAgIC8vID0+IGl0IG1lYW5zIHdlJ3JlIGp1c3QgbGVhdmluZyB0aGUgc3VnZ2VzdGlvbiBmb3IgYSBuZXN0ZWQgZGl2XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlQ3Vyc29yKCk7XG4gICAgdGhpcy50cmlnZ2VyKCdjdXJzb3JSZW1vdmVkJyk7XG4gIH0sXG5cbiAgX29uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUmVuZGVyZWQoZSwgcXVlcnkpIHtcbiAgICB0aGlzLmlzRW1wdHkgPSBfLmV2ZXJ5KHRoaXMuZGF0YXNldHMsIGlzRGF0YXNldEVtcHR5KTtcblxuICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcbiAgICAgIGlmIChxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdlbXB0eScpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy4kZW1wdHkpIHtcbiAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBodG1sID0gdGhpcy50ZW1wbGF0ZXMuZW1wdHkoe1xuICAgICAgICAgICAgcXVlcnk6IHRoaXMuZGF0YXNldHNbMF0gJiYgdGhpcy5kYXRhc2V0c1swXS5xdWVyeVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuJGVtcHR5Lmh0bWwoaHRtbCk7XG4gICAgICAgICAgdGhpcy4kZW1wdHkuc2hvdygpO1xuICAgICAgICAgIHRoaXMuX3Nob3coKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfLmFueSh0aGlzLmRhdGFzZXRzLCBoYXNFbXB0eVRlbXBsYXRlKSkge1xuICAgICAgICBpZiAocXVlcnkubGVuZ3RoIDwgdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fc2hvdygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgaWYgKHRoaXMuJGVtcHR5KSB7XG4gICAgICAgIHRoaXMuJGVtcHR5LmVtcHR5KCk7XG4gICAgICAgIHRoaXMuJGVtcHR5LmhpZGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgICB0aGlzLl9zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50cmlnZ2VyKCdkYXRhc2V0UmVuZGVyZWQnKTtcblxuICAgIGZ1bmN0aW9uIGlzRGF0YXNldEVtcHR5KGRhdGFzZXQpIHtcbiAgICAgIHJldHVybiBkYXRhc2V0LmlzRW1wdHkoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNFbXB0eVRlbXBsYXRlKGRhdGFzZXQpIHtcbiAgICAgIHJldHVybiBkYXRhc2V0LnRlbXBsYXRlcyAmJiBkYXRhc2V0LnRlbXBsYXRlcy5lbXB0eTtcbiAgICB9XG4gIH0sXG5cbiAgX2hpZGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJGNvbnRhaW5lci5oaWRlKCk7XG4gIH0sXG5cbiAgX3Nob3c6IGZ1bmN0aW9uKCkge1xuICAgIC8vIGNhbid0IHVzZSBqUXVlcnkjc2hvdyBiZWNhdXNlICRtZW51IGlzIGEgc3BhbiBlbGVtZW50IHdlIHdhbnRcbiAgICAvLyBkaXNwbGF5OiBibG9jazsgbm90IGRpc2xheTogaW5saW5lO1xuICAgIHRoaXMuJGNvbnRhaW5lci5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgIHRoaXMuX3JlZHJhdygpO1xuXG4gICAgdGhpcy50cmlnZ2VyKCdzaG93bicpO1xuICB9LFxuXG4gIF9yZWRyYXc6IGZ1bmN0aW9uIHJlZHJhdygpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuIHx8ICF0aGlzLmFwcGVuZFRvKSByZXR1cm47XG5cbiAgICB0aGlzLnRyaWdnZXIoJ3JlZHJhd24nKTtcbiAgfSxcblxuICBfZ2V0U3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIGdldFN1Z2dlc3Rpb25zKCkge1xuICAgIHJldHVybiB0aGlzLiRtZW51LmZpbmQoXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLnN1Z2dlc3Rpb24pKTtcbiAgfSxcblxuICBfZ2V0Q3Vyc29yOiBmdW5jdGlvbiBnZXRDdXJzb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuJG1lbnUuZmluZChfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuY3Vyc29yKSkuZmlyc3QoKTtcbiAgfSxcblxuICBfc2V0Q3Vyc29yOiBmdW5jdGlvbiBzZXRDdXJzb3IoJGVsLCB1cGRhdGVJbnB1dCkge1xuICAgICRlbC5maXJzdCgpXG4gICAgICAuYWRkQ2xhc3MoXy5jbGFzc05hbWUodGhpcy5jc3NDbGFzc2VzLnByZWZpeCwgdGhpcy5jc3NDbGFzc2VzLmN1cnNvciwgdHJ1ZSkpXG4gICAgICAuYXR0cignYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgdGhpcy50cmlnZ2VyKCdjdXJzb3JNb3ZlZCcsIHVwZGF0ZUlucHV0KTtcbiAgfSxcblxuICBfcmVtb3ZlQ3Vyc29yOiBmdW5jdGlvbiByZW1vdmVDdXJzb3IoKSB7XG4gICAgdGhpcy5fZ2V0Q3Vyc29yKClcbiAgICAgIC5yZW1vdmVDbGFzcyhfLmNsYXNzTmFtZSh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMuY3Vyc29yLCB0cnVlKSlcbiAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLXNlbGVjdGVkJyk7XG4gIH0sXG5cbiAgX21vdmVDdXJzb3I6IGZ1bmN0aW9uIG1vdmVDdXJzb3IoaW5jcmVtZW50KSB7XG4gICAgdmFyICRzdWdnZXN0aW9ucztcbiAgICB2YXIgJG9sZEN1cnNvcjtcbiAgICB2YXIgbmV3Q3Vyc29ySW5kZXg7XG4gICAgdmFyICRuZXdDdXJzb3I7XG5cbiAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgJG9sZEN1cnNvciA9IHRoaXMuX2dldEN1cnNvcigpO1xuICAgICRzdWdnZXN0aW9ucyA9IHRoaXMuX2dldFN1Z2dlc3Rpb25zKCk7XG5cbiAgICB0aGlzLl9yZW1vdmVDdXJzb3IoKTtcblxuICAgIC8vIHNoaWZ0aW5nIGJlZm9yZSBhbmQgYWZ0ZXIgbW9kdWxvIHRvIGRlYWwgd2l0aCAtMSBpbmRleFxuICAgIG5ld0N1cnNvckluZGV4ID0gJHN1Z2dlc3Rpb25zLmluZGV4KCRvbGRDdXJzb3IpICsgaW5jcmVtZW50O1xuICAgIG5ld0N1cnNvckluZGV4ID0gKG5ld0N1cnNvckluZGV4ICsgMSkgJSAoJHN1Z2dlc3Rpb25zLmxlbmd0aCArIDEpIC0gMTtcblxuICAgIGlmIChuZXdDdXJzb3JJbmRleCA9PT0gLTEpIHtcbiAgICAgIHRoaXMudHJpZ2dlcignY3Vyc29yUmVtb3ZlZCcpO1xuXG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChuZXdDdXJzb3JJbmRleCA8IC0xKSB7XG4gICAgICBuZXdDdXJzb3JJbmRleCA9ICRzdWdnZXN0aW9ucy5sZW5ndGggLSAxO1xuICAgIH1cblxuICAgIHRoaXMuX3NldEN1cnNvcigkbmV3Q3Vyc29yID0gJHN1Z2dlc3Rpb25zLmVxKG5ld0N1cnNvckluZGV4KSwgdHJ1ZSk7XG5cbiAgICAvLyBpbiB0aGUgY2FzZSBvZiBzY3JvbGxhYmxlIG92ZXJmbG93XG4gICAgLy8gbWFrZSBzdXJlIHRoZSBjdXJzb3IgaXMgdmlzaWJsZSBpbiB0aGUgbWVudVxuICAgIHRoaXMuX2Vuc3VyZVZpc2libGUoJG5ld0N1cnNvcik7XG4gIH0sXG5cbiAgX2Vuc3VyZVZpc2libGU6IGZ1bmN0aW9uIGVuc3VyZVZpc2libGUoJGVsKSB7XG4gICAgdmFyIGVsVG9wO1xuICAgIHZhciBlbEJvdHRvbTtcbiAgICB2YXIgbWVudVNjcm9sbFRvcDtcbiAgICB2YXIgbWVudUhlaWdodDtcblxuICAgIGVsVG9wID0gJGVsLnBvc2l0aW9uKCkudG9wO1xuICAgIGVsQm90dG9tID0gZWxUb3AgKyAkZWwuaGVpZ2h0KCkgK1xuICAgICAgcGFyc2VJbnQoJGVsLmNzcygnbWFyZ2luLXRvcCcpLCAxMCkgK1xuICAgICAgcGFyc2VJbnQoJGVsLmNzcygnbWFyZ2luLWJvdHRvbScpLCAxMCk7XG4gICAgbWVudVNjcm9sbFRvcCA9IHRoaXMuJG1lbnUuc2Nyb2xsVG9wKCk7XG4gICAgbWVudUhlaWdodCA9IHRoaXMuJG1lbnUuaGVpZ2h0KCkgK1xuICAgICAgcGFyc2VJbnQodGhpcy4kbWVudS5jc3MoJ3BhZGRpbmctdG9wJyksIDEwKSArXG4gICAgICBwYXJzZUludCh0aGlzLiRtZW51LmNzcygncGFkZGluZy1ib3R0b20nKSwgMTApO1xuXG4gICAgaWYgKGVsVG9wIDwgMCkge1xuICAgICAgdGhpcy4kbWVudS5zY3JvbGxUb3AobWVudVNjcm9sbFRvcCArIGVsVG9wKTtcbiAgICB9IGVsc2UgaWYgKG1lbnVIZWlnaHQgPCBlbEJvdHRvbSkge1xuICAgICAgdGhpcy4kbWVudS5zY3JvbGxUb3AobWVudVNjcm9sbFRvcCArIChlbEJvdHRvbSAtIG1lbnVIZWlnaHQpKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gIyMjIHB1YmxpY1xuXG4gIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuX3JlbW92ZUN1cnNvcigpO1xuICAgICAgdGhpcy5faGlkZSgpO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoJ2Nsb3NlZCcpO1xuICAgIH1cbiAgfSxcblxuICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcblxuICAgICAgaWYgKCF0aGlzLmlzRW1wdHkpIHtcbiAgICAgICAgdGhpcy5fc2hvdygpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRyaWdnZXIoJ29wZW5lZCcpO1xuICAgIH1cbiAgfSxcblxuICBzZXRMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKSB7XG4gICAgdGhpcy4kbWVudS5jc3MoZGlyID09PSAnbHRyJyA/IHRoaXMuY3NzLmx0ciA6IHRoaXMuY3NzLnJ0bCk7XG4gIH0sXG5cbiAgbW92ZUN1cnNvclVwOiBmdW5jdGlvbiBtb3ZlQ3Vyc29yVXAoKSB7XG4gICAgdGhpcy5fbW92ZUN1cnNvcigtMSk7XG4gIH0sXG5cbiAgbW92ZUN1cnNvckRvd246IGZ1bmN0aW9uIG1vdmVDdXJzb3JEb3duKCkge1xuICAgIHRoaXMuX21vdmVDdXJzb3IoKzEpO1xuICB9LFxuXG4gIGdldERhdHVtRm9yU3VnZ2VzdGlvbjogZnVuY3Rpb24gZ2V0RGF0dW1Gb3JTdWdnZXN0aW9uKCRlbCkge1xuICAgIHZhciBkYXR1bSA9IG51bGw7XG5cbiAgICBpZiAoJGVsLmxlbmd0aCkge1xuICAgICAgZGF0dW0gPSB7XG4gICAgICAgIHJhdzogRGF0YXNldC5leHRyYWN0RGF0dW0oJGVsKSxcbiAgICAgICAgdmFsdWU6IERhdGFzZXQuZXh0cmFjdFZhbHVlKCRlbCksXG4gICAgICAgIGRhdGFzZXROYW1lOiBEYXRhc2V0LmV4dHJhY3REYXRhc2V0TmFtZSgkZWwpXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBkYXR1bTtcbiAgfSxcblxuICBnZXRDdXJyZW50Q3Vyc29yOiBmdW5jdGlvbiBnZXRDdXJyZW50Q3Vyc29yKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRDdXJzb3IoKS5maXJzdCgpO1xuICB9LFxuXG4gIGdldERhdHVtRm9yQ3Vyc29yOiBmdW5jdGlvbiBnZXREYXR1bUZvckN1cnNvcigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXR1bUZvclN1Z2dlc3Rpb24odGhpcy5fZ2V0Q3Vyc29yKCkuZmlyc3QoKSk7XG4gIH0sXG5cbiAgZ2V0RGF0dW1Gb3JUb3BTdWdnZXN0aW9uOiBmdW5jdGlvbiBnZXREYXR1bUZvclRvcFN1Z2dlc3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0dW1Gb3JTdWdnZXN0aW9uKHRoaXMuX2dldFN1Z2dlc3Rpb25zKCkuZmlyc3QoKSk7XG4gIH0sXG5cbiAgY3Vyc29yVG9wU3VnZ2VzdGlvbjogZnVuY3Rpb24gY3Vyc29yVG9wU3VnZ2VzdGlvbigpIHtcbiAgICB0aGlzLl9zZXRDdXJzb3IodGhpcy5fZ2V0U3VnZ2VzdGlvbnMoKS5maXJzdCgpLCBmYWxzZSk7XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUocXVlcnkpIHtcbiAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgdXBkYXRlRGF0YXNldCk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVEYXRhc2V0KGRhdGFzZXQpIHtcbiAgICAgIGRhdGFzZXQudXBkYXRlKHF1ZXJ5KTtcbiAgICB9XG4gIH0sXG5cbiAgZW1wdHk6IGZ1bmN0aW9uIGVtcHR5KCkge1xuICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBjbGVhckRhdGFzZXQpO1xuICAgIHRoaXMuaXNFbXB0eSA9IHRydWU7XG5cbiAgICBmdW5jdGlvbiBjbGVhckRhdGFzZXQoZGF0YXNldCkge1xuICAgICAgZGF0YXNldC5jbGVhcigpO1xuICAgIH1cbiAgfSxcblxuICBpc1Zpc2libGU6IGZ1bmN0aW9uIGlzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW4gJiYgIXRoaXMuaXNFbXB0eTtcbiAgfSxcblxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHRoaXMuJG1lbnUub2ZmKCcuYWEnKTtcblxuICAgIHRoaXMuJG1lbnUgPSBudWxsO1xuXG4gICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGRlc3Ryb3lEYXRhc2V0KTtcblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3lEYXRhc2V0KGRhdGFzZXQpIHtcbiAgICAgIGRhdGFzZXQuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIGhlbHBlciBmdW5jdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS1cbkRyb3Bkb3duLkRhdGFzZXQgPSBEYXRhc2V0O1xuXG5mdW5jdGlvbiBpbml0aWFsaXplRGF0YXNldCgkbWVudSwgb0RhdGFzZXQsIGNzc0NsYXNzZXMpIHtcbiAgcmV0dXJuIG5ldyBEcm9wZG93bi5EYXRhc2V0KF8ubWl4aW4oeyRtZW51OiAkbWVudSwgY3NzQ2xhc3NlczogY3NzQ2xhc3Nlc30sIG9EYXRhc2V0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcGRvd247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBuYW1lc3BhY2UgPSAnYXV0b2NvbXBsZXRlOic7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzLmpzJyk7XG52YXIgRE9NID0gcmVxdWlyZSgnLi4vY29tbW9uL2RvbS5qcycpO1xuXG4vLyBjb25zdHJ1Y3RvclxuLy8gLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gRXZlbnRCdXMobykge1xuICBpZiAoIW8gfHwgIW8uZWwpIHtcbiAgICBfLmVycm9yKCdFdmVudEJ1cyBpbml0aWFsaXplZCB3aXRob3V0IGVsJyk7XG4gIH1cblxuICB0aGlzLiRlbCA9IERPTS5lbGVtZW50KG8uZWwpO1xufVxuXG4vLyBpbnN0YW5jZSBtZXRob2RzXG4vLyAtLS0tLS0tLS0tLS0tLS0tXG5cbl8ubWl4aW4oRXZlbnRCdXMucHJvdG90eXBlLCB7XG5cbiAgLy8gIyMjIHB1YmxpY1xuXG4gIHRyaWdnZXI6IGZ1bmN0aW9uKHR5cGUsIHN1Z2dlc3Rpb24sIGRhdGFzZXQsIGNvbnRleHQpIHtcbiAgICB2YXIgZXZlbnQgPSBfLkV2ZW50KG5hbWVzcGFjZSArIHR5cGUpO1xuICAgIHRoaXMuJGVsLnRyaWdnZXIoZXZlbnQsIFtzdWdnZXN0aW9uLCBkYXRhc2V0LCBjb250ZXh0XSk7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEJ1cztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltbWVkaWF0ZSA9IHJlcXVpcmUoJ2ltbWVkaWF0ZScpO1xudmFyIHNwbGl0dGVyID0gL1xccysvO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb25TeW5jOiBvblN5bmMsXG4gIG9uQXN5bmM6IG9uQXN5bmMsXG4gIG9mZjogb2ZmLFxuICB0cmlnZ2VyOiB0cmlnZ2VyXG59O1xuXG5mdW5jdGlvbiBvbihtZXRob2QsIHR5cGVzLCBjYiwgY29udGV4dCkge1xuICB2YXIgdHlwZTtcblxuICBpZiAoIWNiKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcbiAgY2IgPSBjb250ZXh0ID8gYmluZENvbnRleHQoY2IsIGNvbnRleHQpIDogY2I7XG5cbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIHdoaWxlICh0eXBlID0gdHlwZXMuc2hpZnQoKSkge1xuICAgIHRoaXMuX2NhbGxiYWNrc1t0eXBlXSA9IHRoaXMuX2NhbGxiYWNrc1t0eXBlXSB8fCB7c3luYzogW10sIGFzeW5jOiBbXX07XG4gICAgdGhpcy5fY2FsbGJhY2tzW3R5cGVdW21ldGhvZF0ucHVzaChjYik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gb25Bc3luYyh0eXBlcywgY2IsIGNvbnRleHQpIHtcbiAgcmV0dXJuIG9uLmNhbGwodGhpcywgJ2FzeW5jJywgdHlwZXMsIGNiLCBjb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gb25TeW5jKHR5cGVzLCBjYiwgY29udGV4dCkge1xuICByZXR1cm4gb24uY2FsbCh0aGlzLCAnc3luYycsIHR5cGVzLCBjYiwgY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIG9mZih0eXBlcykge1xuICB2YXIgdHlwZTtcblxuICBpZiAoIXRoaXMuX2NhbGxiYWNrcykge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG5cbiAgd2hpbGUgKHR5cGUgPSB0eXBlcy5zaGlmdCgpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1t0eXBlXTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiB0cmlnZ2VyKHR5cGVzKSB7XG4gIHZhciB0eXBlO1xuICB2YXIgY2FsbGJhY2tzO1xuICB2YXIgYXJncztcbiAgdmFyIHN5bmNGbHVzaDtcbiAgdmFyIGFzeW5jRmx1c2g7XG5cbiAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHR5cGVzID0gdHlwZXMuc3BsaXQoc3BsaXR0ZXIpO1xuICBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gIHdoaWxlICgodHlwZSA9IHR5cGVzLnNoaWZ0KCkpICYmIChjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbdHlwZV0pKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBzeW5jRmx1c2ggPSBnZXRGbHVzaChjYWxsYmFja3Muc3luYywgdGhpcywgW3R5cGVdLmNvbmNhdChhcmdzKSk7XG4gICAgYXN5bmNGbHVzaCA9IGdldEZsdXNoKGNhbGxiYWNrcy5hc3luYywgdGhpcywgW3R5cGVdLmNvbmNhdChhcmdzKSk7XG5cbiAgICBpZiAoc3luY0ZsdXNoKCkpIHtcbiAgICAgIGltbWVkaWF0ZShhc3luY0ZsdXNoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gZ2V0Rmx1c2goY2FsbGJhY2tzLCBjb250ZXh0LCBhcmdzKSB7XG4gIHJldHVybiBmbHVzaDtcblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICB2YXIgY2FuY2VsbGVkO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7ICFjYW5jZWxsZWQgJiYgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAvLyBvbmx5IGNhbmNlbCBpZiB0aGUgY2FsbGJhY2sgZXhwbGljaXRseSByZXR1cm5zIGZhbHNlXG4gICAgICBjYW5jZWxsZWQgPSBjYWxsYmFja3NbaV0uYXBwbHkoY29udGV4dCwgYXJncykgPT09IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhY2FuY2VsbGVkO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJpbmRDb250ZXh0KGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBmbi5iaW5kID9cbiAgICBmbi5iaW5kKGNvbnRleHQpIDpcbiAgICBmdW5jdGlvbigpIHsgZm4uYXBwbHkoY29udGV4dCwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTsgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHdyYXBwZXI6ICc8c3BhbiBjbGFzcz1cIiVST09UJVwiPjwvc3Bhbj4nLFxuICBkcm9wZG93bjogJzxzcGFuIGNsYXNzPVwiJVBSRUZJWCUlRFJPUERPV05fTUVOVSVcIj48L3NwYW4+JyxcbiAgZGF0YXNldDogJzxkaXYgY2xhc3M9XCIlUFJFRklYJSVEQVRBU0VUJS0lQ0xBU1MlXCI+PC9kaXY+JyxcbiAgc3VnZ2VzdGlvbnM6ICc8c3BhbiBjbGFzcz1cIiVQUkVGSVglJVNVR0dFU1RJT05TJVwiPjwvc3Bhbj4nLFxuICBzdWdnZXN0aW9uOiAnPGRpdiBjbGFzcz1cIiVQUkVGSVglJVNVR0dFU1RJT04lXCI+PC9kaXY+J1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNwZWNpYWxLZXlDb2RlTWFwO1xuXG5zcGVjaWFsS2V5Q29kZU1hcCA9IHtcbiAgOTogJ3RhYicsXG4gIDI3OiAnZXNjJyxcbiAgMzc6ICdsZWZ0JyxcbiAgMzk6ICdyaWdodCcsXG4gIDEzOiAnZW50ZXInLFxuICAzODogJ3VwJyxcbiAgNDA6ICdkb3duJ1xufTtcblxudmFyIF8gPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMuanMnKTtcbnZhciBET00gPSByZXF1aXJlKCcuLi9jb21tb24vZG9tLmpzJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi9ldmVudF9lbWl0dGVyLmpzJyk7XG5cbi8vIGNvbnN0cnVjdG9yXG4vLyAtLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBJbnB1dChvKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIG9uQmx1cjtcbiAgdmFyIG9uRm9jdXM7XG4gIHZhciBvbktleWRvd247XG4gIHZhciBvbklucHV0O1xuXG4gIG8gPSBvIHx8IHt9O1xuXG4gIGlmICghby5pbnB1dCkge1xuICAgIF8uZXJyb3IoJ2lucHV0IGlzIG1pc3NpbmcnKTtcbiAgfVxuXG4gIC8vIGJvdW5kIGZ1bmN0aW9uc1xuICBvbkJsdXIgPSBfLmJpbmQodGhpcy5fb25CbHVyLCB0aGlzKTtcbiAgb25Gb2N1cyA9IF8uYmluZCh0aGlzLl9vbkZvY3VzLCB0aGlzKTtcbiAgb25LZXlkb3duID0gXy5iaW5kKHRoaXMuX29uS2V5ZG93biwgdGhpcyk7XG4gIG9uSW5wdXQgPSBfLmJpbmQodGhpcy5fb25JbnB1dCwgdGhpcyk7XG5cbiAgdGhpcy4kaGludCA9IERPTS5lbGVtZW50KG8uaGludCk7XG4gIHRoaXMuJGlucHV0ID0gRE9NLmVsZW1lbnQoby5pbnB1dClcbiAgICAub24oJ2JsdXIuYWEnLCBvbkJsdXIpXG4gICAgLm9uKCdmb2N1cy5hYScsIG9uRm9jdXMpXG4gICAgLm9uKCdrZXlkb3duLmFhJywgb25LZXlkb3duKTtcblxuICAvLyBpZiBubyBoaW50LCBub29wIGFsbCB0aGUgaGludCByZWxhdGVkIGZ1bmN0aW9uc1xuICBpZiAodGhpcy4kaGludC5sZW5ndGggPT09IDApIHtcbiAgICB0aGlzLnNldEhpbnQgPSB0aGlzLmdldEhpbnQgPSB0aGlzLmNsZWFySGludCA9IHRoaXMuY2xlYXJIaW50SWZJbnZhbGlkID0gXy5ub29wO1xuICB9XG5cbiAgLy8gaWU3IGFuZCBpZTggZG9uJ3Qgc3VwcG9ydCB0aGUgaW5wdXQgZXZlbnRcbiAgLy8gaWU5IGRvZXNuJ3QgZmlyZSB0aGUgaW5wdXQgZXZlbnQgd2hlbiBjaGFyYWN0ZXJzIGFyZSByZW1vdmVkXG4gIC8vIG5vdCBzdXJlIGlmIGllMTAgaXMgY29tcGF0aWJsZVxuICBpZiAoIV8uaXNNc2llKCkpIHtcbiAgICB0aGlzLiRpbnB1dC5vbignaW5wdXQuYWEnLCBvbklucHV0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLiRpbnB1dC5vbigna2V5ZG93bi5hYSBrZXlwcmVzcy5hYSBjdXQuYWEgcGFzdGUuYWEnLCBmdW5jdGlvbigkZSkge1xuICAgICAgLy8gaWYgYSBzcGVjaWFsIGtleSB0cmlnZ2VyZWQgdGhpcywgaWdub3JlIGl0XG4gICAgICBpZiAoc3BlY2lhbEtleUNvZGVNYXBbJGUud2hpY2ggfHwgJGUua2V5Q29kZV0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBnaXZlIHRoZSBicm93c2VyIGEgY2hhbmNlIHRvIHVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGlucHV0XG4gICAgICAvLyBiZWZvcmUgY2hlY2tpbmcgdG8gc2VlIGlmIHRoZSBxdWVyeSBjaGFuZ2VkXG4gICAgICBfLmRlZmVyKF8uYmluZCh0aGF0Ll9vbklucHV0LCB0aGF0LCAkZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gdGhlIHF1ZXJ5IGRlZmF1bHRzIHRvIHdoYXRldmVyIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgaXNcbiAgLy8gb24gaW5pdGlhbGl6YXRpb24sIGl0J2xsIG1vc3QgbGlrZWx5IGJlIGFuIGVtcHR5IHN0cmluZ1xuICB0aGlzLnF1ZXJ5ID0gdGhpcy4kaW5wdXQudmFsKCk7XG5cbiAgLy8gaGVscHMgd2l0aCBjYWxjdWxhdGluZyB0aGUgd2lkdGggb2YgdGhlIGlucHV0J3MgdmFsdWVcbiAgdGhpcy4kb3ZlcmZsb3dIZWxwZXIgPSBidWlsZE92ZXJmbG93SGVscGVyKHRoaXMuJGlucHV0KTtcbn1cblxuLy8gc3RhdGljIG1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tXG5cbklucHV0Lm5vcm1hbGl6ZVF1ZXJ5ID0gZnVuY3Rpb24oc3RyKSB7XG4gIC8vIHN0cmlwcyBsZWFkaW5nIHdoaXRlc3BhY2UgYW5kIGNvbmRlbnNlcyBhbGwgd2hpdGVzcGFjZVxuICByZXR1cm4gKHN0ciB8fCAnJykucmVwbGFjZSgvXlxccyovZywgJycpLnJlcGxhY2UoL1xcc3syLH0vZywgJyAnKTtcbn07XG5cbi8vIGluc3RhbmNlIG1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS1cblxuXy5taXhpbihJbnB1dC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuXG4gIC8vICMjIyBwcml2YXRlXG5cbiAgX29uQmx1cjogZnVuY3Rpb24gb25CbHVyKCkge1xuICAgIHRoaXMucmVzZXRJbnB1dFZhbHVlKCk7XG4gICAgdGhpcy4kaW5wdXQucmVtb3ZlQXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgdGhpcy50cmlnZ2VyKCdibHVycmVkJyk7XG4gIH0sXG5cbiAgX29uRm9jdXM6IGZ1bmN0aW9uIG9uRm9jdXMoKSB7XG4gICAgdGhpcy50cmlnZ2VyKCdmb2N1c2VkJyk7XG4gIH0sXG5cbiAgX29uS2V5ZG93bjogZnVuY3Rpb24gb25LZXlkb3duKCRlKSB7XG4gICAgLy8gd2hpY2ggaXMgbm9ybWFsaXplZCBhbmQgY29uc2lzdGVudCAoYnV0IG5vdCBmb3IgaWUpXG4gICAgdmFyIGtleU5hbWUgPSBzcGVjaWFsS2V5Q29kZU1hcFskZS53aGljaCB8fCAkZS5rZXlDb2RlXTtcblxuICAgIHRoaXMuX21hbmFnZVByZXZlbnREZWZhdWx0KGtleU5hbWUsICRlKTtcbiAgICBpZiAoa2V5TmFtZSAmJiB0aGlzLl9zaG91bGRUcmlnZ2VyKGtleU5hbWUsICRlKSkge1xuICAgICAgdGhpcy50cmlnZ2VyKGtleU5hbWUgKyAnS2V5ZWQnLCAkZSk7XG4gICAgfVxuICB9LFxuXG4gIF9vbklucHV0OiBmdW5jdGlvbiBvbklucHV0KCkge1xuICAgIHRoaXMuX2NoZWNrSW5wdXRWYWx1ZSgpO1xuICB9LFxuXG4gIF9tYW5hZ2VQcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24gbWFuYWdlUHJldmVudERlZmF1bHQoa2V5TmFtZSwgJGUpIHtcbiAgICB2YXIgcHJldmVudERlZmF1bHQ7XG4gICAgdmFyIGhpbnRWYWx1ZTtcbiAgICB2YXIgaW5wdXRWYWx1ZTtcblxuICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgIGNhc2UgJ3RhYic6XG4gICAgICBoaW50VmFsdWUgPSB0aGlzLmdldEhpbnQoKTtcbiAgICAgIGlucHV0VmFsdWUgPSB0aGlzLmdldElucHV0VmFsdWUoKTtcblxuICAgICAgcHJldmVudERlZmF1bHQgPSBoaW50VmFsdWUgJiZcbiAgICAgICAgaGludFZhbHVlICE9PSBpbnB1dFZhbHVlICYmXG4gICAgICAgICF3aXRoTW9kaWZpZXIoJGUpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICd1cCc6XG4gICAgY2FzZSAnZG93bic6XG4gICAgICBwcmV2ZW50RGVmYXVsdCA9ICF3aXRoTW9kaWZpZXIoJGUpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAocHJldmVudERlZmF1bHQpIHtcbiAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LFxuXG4gIF9zaG91bGRUcmlnZ2VyOiBmdW5jdGlvbiBzaG91bGRUcmlnZ2VyKGtleU5hbWUsICRlKSB7XG4gICAgdmFyIHRyaWdnZXI7XG5cbiAgICBzd2l0Y2ggKGtleU5hbWUpIHtcbiAgICBjYXNlICd0YWInOlxuICAgICAgdHJpZ2dlciA9ICF3aXRoTW9kaWZpZXIoJGUpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdHJpZ2dlciA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyaWdnZXI7XG4gIH0sXG5cbiAgX2NoZWNrSW5wdXRWYWx1ZTogZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xuICAgIHZhciBpbnB1dFZhbHVlO1xuICAgIHZhciBhcmVFcXVpdmFsZW50O1xuICAgIHZhciBoYXNEaWZmZXJlbnRXaGl0ZXNwYWNlO1xuXG4gICAgaW5wdXRWYWx1ZSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgpO1xuICAgIGFyZUVxdWl2YWxlbnQgPSBhcmVRdWVyaWVzRXF1aXZhbGVudChpbnB1dFZhbHVlLCB0aGlzLnF1ZXJ5KTtcbiAgICBoYXNEaWZmZXJlbnRXaGl0ZXNwYWNlID0gYXJlRXF1aXZhbGVudCAmJiB0aGlzLnF1ZXJ5ID9cbiAgICAgIHRoaXMucXVlcnkubGVuZ3RoICE9PSBpbnB1dFZhbHVlLmxlbmd0aCA6IGZhbHNlO1xuXG4gICAgdGhpcy5xdWVyeSA9IGlucHV0VmFsdWU7XG5cbiAgICBpZiAoIWFyZUVxdWl2YWxlbnQpIHtcbiAgICAgIHRoaXMudHJpZ2dlcigncXVlcnlDaGFuZ2VkJywgdGhpcy5xdWVyeSk7XG4gICAgfSBlbHNlIGlmIChoYXNEaWZmZXJlbnRXaGl0ZXNwYWNlKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoJ3doaXRlc3BhY2VDaGFuZ2VkJywgdGhpcy5xdWVyeSk7XG4gICAgfVxuICB9LFxuXG4gIC8vICMjIyBwdWJsaWNcblxuICBmb2N1czogZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcbiAgfSxcblxuICBibHVyOiBmdW5jdGlvbiBibHVyKCkge1xuICAgIHRoaXMuJGlucHV0LmJsdXIoKTtcbiAgfSxcblxuICBnZXRRdWVyeTogZnVuY3Rpb24gZ2V0UXVlcnkoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnk7XG4gIH0sXG5cbiAgc2V0UXVlcnk6IGZ1bmN0aW9uIHNldFF1ZXJ5KHF1ZXJ5KSB7XG4gICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuICB9LFxuXG4gIGdldElucHV0VmFsdWU6IGZ1bmN0aW9uIGdldElucHV0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuJGlucHV0LnZhbCgpO1xuICB9LFxuXG4gIHNldElucHV0VmFsdWU6IGZ1bmN0aW9uIHNldElucHV0VmFsdWUodmFsdWUsIHNpbGVudCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucXVlcnk7XG4gICAgfVxuICAgIHRoaXMuJGlucHV0LnZhbCh2YWx1ZSk7XG5cbiAgICAvLyBzaWxlbnQgcHJldmVudHMgYW55IGFkZGl0aW9uYWwgZXZlbnRzIGZyb20gYmVpbmcgdHJpZ2dlcmVkXG4gICAgaWYgKHNpbGVudCkge1xuICAgICAgdGhpcy5jbGVhckhpbnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbHVlKCk7XG4gICAgfVxuICB9LFxuXG4gIGV4cGFuZDogZnVuY3Rpb24gZXhwYW5kKCkge1xuICAgIHRoaXMuJGlucHV0LmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICB9LFxuXG4gIGNvbGxhcHNlOiBmdW5jdGlvbiBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLiRpbnB1dC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gIH0sXG5cbiAgc2V0QWN0aXZlRGVzY2VuZGFudDogZnVuY3Rpb24gc2V0QWN0aXZlRGVzY2VuZGFudChhY3RpdmVkZXNjZW5kYW50SWQpIHtcbiAgICB0aGlzLiRpbnB1dC5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBhY3RpdmVkZXNjZW5kYW50SWQpO1xuICB9LFxuXG4gIHJlbW92ZUFjdGl2ZURlc2NlbmRhbnQ6IGZ1bmN0aW9uIHJlbW92ZUFjdGl2ZURlc2NlbmRhbnQoKSB7XG4gICAgdGhpcy4kaW5wdXQucmVtb3ZlQXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gIH0sXG5cbiAgcmVzZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiByZXNldElucHV0VmFsdWUoKSB7XG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucXVlcnksIHRydWUpO1xuICB9LFxuXG4gIGdldEhpbnQ6IGZ1bmN0aW9uIGdldEhpbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuJGhpbnQudmFsKCk7XG4gIH0sXG5cbiAgc2V0SGludDogZnVuY3Rpb24gc2V0SGludCh2YWx1ZSkge1xuICAgIHRoaXMuJGhpbnQudmFsKHZhbHVlKTtcbiAgfSxcblxuICBjbGVhckhpbnQ6IGZ1bmN0aW9uIGNsZWFySGludCgpIHtcbiAgICB0aGlzLnNldEhpbnQoJycpO1xuICB9LFxuXG4gIGNsZWFySGludElmSW52YWxpZDogZnVuY3Rpb24gY2xlYXJIaW50SWZJbnZhbGlkKCkge1xuICAgIHZhciB2YWw7XG4gICAgdmFyIGhpbnQ7XG4gICAgdmFyIHZhbElzUHJlZml4T2ZIaW50O1xuICAgIHZhciBpc1ZhbGlkO1xuXG4gICAgdmFsID0gdGhpcy5nZXRJbnB1dFZhbHVlKCk7XG4gICAgaGludCA9IHRoaXMuZ2V0SGludCgpO1xuICAgIHZhbElzUHJlZml4T2ZIaW50ID0gdmFsICE9PSBoaW50ICYmIGhpbnQuaW5kZXhPZih2YWwpID09PSAwO1xuICAgIGlzVmFsaWQgPSB2YWwgIT09ICcnICYmIHZhbElzUHJlZml4T2ZIaW50ICYmICF0aGlzLmhhc092ZXJmbG93KCk7XG5cbiAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgIHRoaXMuY2xlYXJIaW50KCk7XG4gICAgfVxuICB9LFxuXG4gIGdldExhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBnZXRMYW5ndWFnZURpcmVjdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuJGlucHV0LmNzcygnZGlyZWN0aW9uJykgfHwgJ2x0cicpLnRvTG93ZXJDYXNlKCk7XG4gIH0sXG5cbiAgaGFzT3ZlcmZsb3c6IGZ1bmN0aW9uIGhhc092ZXJmbG93KCkge1xuICAgIC8vIDIgaXMgYXJiaXRyYXJ5LCBqdXN0IHBpY2tpbmcgYSBzbWFsbCBudW1iZXIgdG8gaGFuZGxlIGVkZ2UgY2FzZXNcbiAgICB2YXIgY29uc3RyYWludCA9IHRoaXMuJGlucHV0LndpZHRoKCkgLSAyO1xuXG4gICAgdGhpcy4kb3ZlcmZsb3dIZWxwZXIudGV4dCh0aGlzLmdldElucHV0VmFsdWUoKSk7XG5cbiAgICByZXR1cm4gdGhpcy4kb3ZlcmZsb3dIZWxwZXIud2lkdGgoKSA+PSBjb25zdHJhaW50O1xuICB9LFxuXG4gIGlzQ3Vyc29yQXRFbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YWx1ZUxlbmd0aDtcbiAgICB2YXIgc2VsZWN0aW9uU3RhcnQ7XG4gICAgdmFyIHJhbmdlO1xuXG4gICAgdmFsdWVMZW5ndGggPSB0aGlzLiRpbnB1dC52YWwoKS5sZW5ndGg7XG4gICAgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLiRpbnB1dFswXS5zZWxlY3Rpb25TdGFydDtcblxuICAgIGlmIChfLmlzTnVtYmVyKHNlbGVjdGlvblN0YXJ0KSkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvblN0YXJ0ID09PSB2YWx1ZUxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xuICAgICAgLy8gTk9URTogdGhpcyB3b24ndCB3b3JrIHVubGVzcyB0aGUgaW5wdXQgaGFzIGZvY3VzLCB0aGUgZ29vZCBuZXdzXG4gICAgICAvLyBpcyB0aGlzIGNvZGUgc2hvdWxkIG9ubHkgZ2V0IGNhbGxlZCB3aGVuIHRoZSBpbnB1dCBoYXMgZm9jdXNcbiAgICAgIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC12YWx1ZUxlbmd0aCk7XG5cbiAgICAgIHJldHVybiB2YWx1ZUxlbmd0aCA9PT0gcmFuZ2UudGV4dC5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICB0aGlzLiRoaW50Lm9mZignLmFhJyk7XG4gICAgdGhpcy4kaW5wdXQub2ZmKCcuYWEnKTtcblxuICAgIHRoaXMuJGhpbnQgPSB0aGlzLiRpbnB1dCA9IHRoaXMuJG92ZXJmbG93SGVscGVyID0gbnVsbDtcbiAgfVxufSk7XG5cbi8vIGhlbHBlciBmdW5jdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gYnVpbGRPdmVyZmxvd0hlbHBlcigkaW5wdXQpIHtcbiAgcmV0dXJuIERPTS5lbGVtZW50KCc8cHJlIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvcHJlPicpXG4gICAgLmNzcyh7XG4gICAgICAvLyBwb3NpdGlvbiBoZWxwZXIgb2ZmLXNjcmVlblxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICAgIC8vIGF2b2lkIGxpbmUgYnJlYWtzIGFuZCB3aGl0ZXNwYWNlIGNvbGxhcHNpbmdcbiAgICAgIHdoaXRlU3BhY2U6ICdwcmUnLFxuICAgICAgLy8gdXNlIHNhbWUgZm9udCBjc3MgYXMgaW5wdXQgdG8gY2FsY3VsYXRlIGFjY3VyYXRlIHdpZHRoXG4gICAgICBmb250RmFtaWx5OiAkaW5wdXQuY3NzKCdmb250LWZhbWlseScpLFxuICAgICAgZm9udFNpemU6ICRpbnB1dC5jc3MoJ2ZvbnQtc2l6ZScpLFxuICAgICAgZm9udFN0eWxlOiAkaW5wdXQuY3NzKCdmb250LXN0eWxlJyksXG4gICAgICBmb250VmFyaWFudDogJGlucHV0LmNzcygnZm9udC12YXJpYW50JyksXG4gICAgICBmb250V2VpZ2h0OiAkaW5wdXQuY3NzKCdmb250LXdlaWdodCcpLFxuICAgICAgd29yZFNwYWNpbmc6ICRpbnB1dC5jc3MoJ3dvcmQtc3BhY2luZycpLFxuICAgICAgbGV0dGVyU3BhY2luZzogJGlucHV0LmNzcygnbGV0dGVyLXNwYWNpbmcnKSxcbiAgICAgIHRleHRJbmRlbnQ6ICRpbnB1dC5jc3MoJ3RleHQtaW5kZW50JyksXG4gICAgICB0ZXh0UmVuZGVyaW5nOiAkaW5wdXQuY3NzKCd0ZXh0LXJlbmRlcmluZycpLFxuICAgICAgdGV4dFRyYW5zZm9ybTogJGlucHV0LmNzcygndGV4dC10cmFuc2Zvcm0nKVxuICAgIH0pXG4gICAgLmluc2VydEFmdGVyKCRpbnB1dCk7XG59XG5cbmZ1bmN0aW9uIGFyZVF1ZXJpZXNFcXVpdmFsZW50KGEsIGIpIHtcbiAgcmV0dXJuIElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KGEpID09PSBJbnB1dC5ub3JtYWxpemVRdWVyeShiKTtcbn1cblxuZnVuY3Rpb24gd2l0aE1vZGlmaWVyKCRlKSB7XG4gIHJldHVybiAkZS5hbHRLZXkgfHwgJGUuY3RybEtleSB8fCAkZS5tZXRhS2V5IHx8ICRlLnNoaWZ0S2V5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXR0cnNLZXkgPSAnYWFBdHRycyc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzLmpzJyk7XG52YXIgRE9NID0gcmVxdWlyZSgnLi4vY29tbW9uL2RvbS5qcycpO1xudmFyIEV2ZW50QnVzID0gcmVxdWlyZSgnLi9ldmVudF9idXMuanMnKTtcbnZhciBJbnB1dCA9IHJlcXVpcmUoJy4vaW5wdXQuanMnKTtcbnZhciBEcm9wZG93biA9IHJlcXVpcmUoJy4vZHJvcGRvd24uanMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sLmpzJyk7XG52YXIgY3NzID0gcmVxdWlyZSgnLi9jc3MuanMnKTtcblxuLy8gY29uc3RydWN0b3Jcbi8vIC0tLS0tLS0tLS0tXG5cbi8vIFRIT1VHSFQ6IHdoYXQgaWYgZGF0YXNldHMgY291bGQgZHluYW1pY2FsbHkgYmUgYWRkZWQvcmVtb3ZlZD9cbmZ1bmN0aW9uIFR5cGVhaGVhZChvKSB7XG4gIHZhciAkbWVudTtcbiAgdmFyICRoaW50O1xuXG4gIG8gPSBvIHx8IHt9O1xuXG4gIGlmICghby5pbnB1dCkge1xuICAgIF8uZXJyb3IoJ21pc3NpbmcgaW5wdXQnKTtcbiAgfVxuXG4gIHRoaXMuaXNBY3RpdmF0ZWQgPSBmYWxzZTtcbiAgdGhpcy5kZWJ1ZyA9ICEhby5kZWJ1ZztcbiAgdGhpcy5hdXRvc2VsZWN0ID0gISFvLmF1dG9zZWxlY3Q7XG4gIHRoaXMuYXV0b3NlbGVjdE9uQmx1ciA9ICEhby5hdXRvc2VsZWN0T25CbHVyO1xuICB0aGlzLm9wZW5PbkZvY3VzID0gISFvLm9wZW5PbkZvY3VzO1xuICB0aGlzLm1pbkxlbmd0aCA9IF8uaXNOdW1iZXIoby5taW5MZW5ndGgpID8gby5taW5MZW5ndGggOiAxO1xuICB0aGlzLmF1dG9XaWR0aCA9IChvLmF1dG9XaWR0aCA9PT0gdW5kZWZpbmVkKSA/IHRydWUgOiAhIW8uYXV0b1dpZHRoO1xuICB0aGlzLmNsZWFyT25TZWxlY3RlZCA9ICEhby5jbGVhck9uU2VsZWN0ZWQ7XG4gIHRoaXMudGFiQXV0b2NvbXBsZXRlID0gKG8udGFiQXV0b2NvbXBsZXRlID09PSB1bmRlZmluZWQpID8gdHJ1ZSA6ICEhby50YWJBdXRvY29tcGxldGU7XG5cbiAgby5oaW50ID0gISFvLmhpbnQ7XG5cbiAgaWYgKG8uaGludCAmJiBvLmFwcGVuZFRvKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdbYXV0b2NvbXBsZXRlLmpzXSBoaW50IGFuZCBhcHBlbmRUbyBvcHRpb25zIGNhblxcJ3QgYmUgdXNlZCBhdCB0aGUgc2FtZSB0aW1lJyk7XG4gIH1cblxuICB0aGlzLmNzcyA9IG8uY3NzID0gXy5taXhpbih7fSwgY3NzLCBvLmFwcGVuZFRvID8gY3NzLmFwcGVuZFRvIDoge30pO1xuICB0aGlzLmNzc0NsYXNzZXMgPSBvLmNzc0NsYXNzZXMgPSBfLm1peGluKHt9LCBjc3MuZGVmYXVsdENsYXNzZXMsIG8uY3NzQ2xhc3NlcyB8fCB7fSk7XG4gIHRoaXMuY3NzQ2xhc3Nlcy5wcmVmaXggPVxuICAgIG8uY3NzQ2xhc3Nlcy5mb3JtYXR0ZWRQcmVmaXggPSBfLmZvcm1hdFByZWZpeCh0aGlzLmNzc0NsYXNzZXMucHJlZml4LCB0aGlzLmNzc0NsYXNzZXMubm9QcmVmaXgpO1xuICB0aGlzLmxpc3Rib3hJZCA9IG8ubGlzdGJveElkID0gW3RoaXMuY3NzQ2xhc3Nlcy5yb290LCAnbGlzdGJveCcsIF8uZ2V0VW5pcXVlSWQoKV0uam9pbignLScpO1xuXG4gIHZhciBkb21FbHRzID0gYnVpbGREb20obyk7XG5cbiAgdGhpcy4kbm9kZSA9IGRvbUVsdHMud3JhcHBlcjtcbiAgdmFyICRpbnB1dCA9IHRoaXMuJGlucHV0ID0gZG9tRWx0cy5pbnB1dDtcbiAgJG1lbnUgPSBkb21FbHRzLm1lbnU7XG4gICRoaW50ID0gZG9tRWx0cy5oaW50O1xuXG4gIGlmIChvLmRyb3Bkb3duTWVudUNvbnRhaW5lcikge1xuICAgIERPTS5lbGVtZW50KG8uZHJvcGRvd25NZW51Q29udGFpbmVyKVxuICAgICAgLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKSAvLyBlbnN1cmUgdGhlIGNvbnRhaW5lciBoYXMgYSByZWxhdGl2ZSBwb3NpdGlvblxuICAgICAgLmFwcGVuZCgkbWVudS5jc3MoJ3RvcCcsICcwJykpOyAvLyBvdmVycmlkZSB0aGUgdG9wOiAxMDAlXG4gIH1cblxuICAvLyAjNzA1OiBpZiB0aGVyZSdzIHNjcm9sbGFibGUgb3ZlcmZsb3csIGllIGRvZXNuJ3Qgc3VwcG9ydFxuICAvLyBibHVyIGNhbmNlbGxhdGlvbnMgd2hlbiB0aGUgc2Nyb2xsYmFyIGlzIGNsaWNrZWRcbiAgLy9cbiAgLy8gIzM1MTogcHJldmVudERlZmF1bHQgd29uJ3QgY2FuY2VsIGJsdXJzIGluIGllIDw9IDhcbiAgJGlucHV0Lm9uKCdibHVyLmFhJywgZnVuY3Rpb24oJGUpIHtcbiAgICB2YXIgYWN0aXZlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAoXy5pc01zaWUoKSAmJiAoJG1lbnVbMF0gPT09IGFjdGl2ZSB8fCAkbWVudVswXS5jb250YWlucyhhY3RpdmUpKSkge1xuICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIHN0b3AgaW1tZWRpYXRlIGluIG9yZGVyIHRvIHByZXZlbnQgSW5wdXQjX29uQmx1ciBmcm9tXG4gICAgICAvLyBnZXR0aW5nIGV4ZWN0dWVkXG4gICAgICAkZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIF8uZGVmZXIoZnVuY3Rpb24oKSB7ICRpbnB1dC5mb2N1cygpOyB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vICMzNTE6IHByZXZlbnRzIGlucHV0IGJsdXIgZHVlIHRvIGNsaWNrcyB3aXRoaW4gZHJvcGRvd24gbWVudVxuICAkbWVudS5vbignbW91c2Vkb3duLmFhJywgZnVuY3Rpb24oJGUpIHsgJGUucHJldmVudERlZmF1bHQoKTsgfSk7XG5cbiAgdGhpcy5ldmVudEJ1cyA9IG8uZXZlbnRCdXMgfHwgbmV3IEV2ZW50QnVzKHtlbDogJGlucHV0fSk7XG5cbiAgdGhpcy5kcm9wZG93biA9IG5ldyBUeXBlYWhlYWQuRHJvcGRvd24oe1xuICAgIGFwcGVuZFRvOiBvLmFwcGVuZFRvLFxuICAgIHdyYXBwZXI6IHRoaXMuJG5vZGUsXG4gICAgbWVudTogJG1lbnUsXG4gICAgZGF0YXNldHM6IG8uZGF0YXNldHMsXG4gICAgdGVtcGxhdGVzOiBvLnRlbXBsYXRlcyxcbiAgICBjc3NDbGFzc2VzOiBvLmNzc0NsYXNzZXMsXG4gICAgbWluTGVuZ3RoOiB0aGlzLm1pbkxlbmd0aFxuICB9KVxuICAgIC5vblN5bmMoJ3N1Z2dlc3Rpb25DbGlja2VkJywgdGhpcy5fb25TdWdnZXN0aW9uQ2xpY2tlZCwgdGhpcylcbiAgICAub25TeW5jKCdjdXJzb3JNb3ZlZCcsIHRoaXMuX29uQ3Vyc29yTW92ZWQsIHRoaXMpXG4gICAgLm9uU3luYygnY3Vyc29yUmVtb3ZlZCcsIHRoaXMuX29uQ3Vyc29yUmVtb3ZlZCwgdGhpcylcbiAgICAub25TeW5jKCdvcGVuZWQnLCB0aGlzLl9vbk9wZW5lZCwgdGhpcylcbiAgICAub25TeW5jKCdjbG9zZWQnLCB0aGlzLl9vbkNsb3NlZCwgdGhpcylcbiAgICAub25TeW5jKCdzaG93bicsIHRoaXMuX29uU2hvd24sIHRoaXMpXG4gICAgLm9uU3luYygnZW1wdHknLCB0aGlzLl9vbkVtcHR5LCB0aGlzKVxuICAgIC5vblN5bmMoJ3JlZHJhd24nLCB0aGlzLl9vblJlZHJhd24sIHRoaXMpXG4gICAgLm9uQXN5bmMoJ2RhdGFzZXRSZW5kZXJlZCcsIHRoaXMuX29uRGF0YXNldFJlbmRlcmVkLCB0aGlzKTtcblxuICB0aGlzLmlucHV0ID0gbmV3IFR5cGVhaGVhZC5JbnB1dCh7aW5wdXQ6ICRpbnB1dCwgaGludDogJGhpbnR9KVxuICAgIC5vblN5bmMoJ2ZvY3VzZWQnLCB0aGlzLl9vbkZvY3VzZWQsIHRoaXMpXG4gICAgLm9uU3luYygnYmx1cnJlZCcsIHRoaXMuX29uQmx1cnJlZCwgdGhpcylcbiAgICAub25TeW5jKCdlbnRlcktleWVkJywgdGhpcy5fb25FbnRlcktleWVkLCB0aGlzKVxuICAgIC5vblN5bmMoJ3RhYktleWVkJywgdGhpcy5fb25UYWJLZXllZCwgdGhpcylcbiAgICAub25TeW5jKCdlc2NLZXllZCcsIHRoaXMuX29uRXNjS2V5ZWQsIHRoaXMpXG4gICAgLm9uU3luYygndXBLZXllZCcsIHRoaXMuX29uVXBLZXllZCwgdGhpcylcbiAgICAub25TeW5jKCdkb3duS2V5ZWQnLCB0aGlzLl9vbkRvd25LZXllZCwgdGhpcylcbiAgICAub25TeW5jKCdsZWZ0S2V5ZWQnLCB0aGlzLl9vbkxlZnRLZXllZCwgdGhpcylcbiAgICAub25TeW5jKCdyaWdodEtleWVkJywgdGhpcy5fb25SaWdodEtleWVkLCB0aGlzKVxuICAgIC5vblN5bmMoJ3F1ZXJ5Q2hhbmdlZCcsIHRoaXMuX29uUXVlcnlDaGFuZ2VkLCB0aGlzKVxuICAgIC5vblN5bmMoJ3doaXRlc3BhY2VDaGFuZ2VkJywgdGhpcy5fb25XaGl0ZXNwYWNlQ2hhbmdlZCwgdGhpcyk7XG5cbiAgdGhpcy5fYmluZEtleWJvYXJkU2hvcnRjdXRzKG8pO1xuXG4gIHRoaXMuX3NldExhbmd1YWdlRGlyZWN0aW9uKCk7XG59XG5cbi8vIGluc3RhbmNlIG1ldGhvZHNcbi8vIC0tLS0tLS0tLS0tLS0tLS1cblxuXy5taXhpbihUeXBlYWhlYWQucHJvdG90eXBlLCB7XG4gIC8vICMjIyBwcml2YXRlXG5cbiAgX2JpbmRLZXlib2FyZFNob3J0Y3V0czogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5rZXlib2FyZFNob3J0Y3V0cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgJGlucHV0ID0gdGhpcy4kaW5wdXQ7XG4gICAgdmFyIGtleWJvYXJkU2hvcnRjdXRzID0gW107XG4gICAgXy5lYWNoKG9wdGlvbnMua2V5Ym9hcmRTaG9ydGN1dHMsIGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpLmNoYXJDb2RlQXQoMCk7XG4gICAgICB9XG4gICAgICBrZXlib2FyZFNob3J0Y3V0cy5wdXNoKGtleSk7XG4gICAgfSk7XG4gICAgRE9NLmVsZW1lbnQoZG9jdW1lbnQpLmtleWRvd24oZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBlbHQgPSAoZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQpO1xuICAgICAgdmFyIHRhZ05hbWUgPSBlbHQudGFnTmFtZTtcbiAgICAgIGlmIChlbHQuaXNDb250ZW50RWRpdGFibGUgfHwgdGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCB0YWdOYW1lID09PSAnU0VMRUNUJyB8fCB0YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIC8vIGFscmVhZHkgaW4gYW4gaW5wdXRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgd2hpY2ggPSBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlO1xuICAgICAgaWYgKGtleWJvYXJkU2hvcnRjdXRzLmluZGV4T2Yod2hpY2gpID09PSAtMSkge1xuICAgICAgICAvLyBub3QgdGhlIHJpZ2h0IHNob3J0Y3V0XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgJGlucHV0LmZvY3VzKCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gIH0sXG5cbiAgX29uU3VnZ2VzdGlvbkNsaWNrZWQ6IGZ1bmN0aW9uIG9uU3VnZ2VzdGlvbkNsaWNrZWQodHlwZSwgJGVsKSB7XG4gICAgdmFyIGRhdHVtO1xuICAgIHZhciBjb250ZXh0ID0ge3NlbGVjdGlvbk1ldGhvZDogJ2NsaWNrJ307XG5cbiAgICBpZiAoZGF0dW0gPSB0aGlzLmRyb3Bkb3duLmdldERhdHVtRm9yU3VnZ2VzdGlvbigkZWwpKSB7XG4gICAgICB0aGlzLl9zZWxlY3QoZGF0dW0sIGNvbnRleHQpO1xuICAgIH1cbiAgfSxcblxuICBfb25DdXJzb3JNb3ZlZDogZnVuY3Rpb24gb25DdXJzb3JNb3ZlZChldmVudCwgdXBkYXRlSW5wdXQpIHtcbiAgICB2YXIgZGF0dW0gPSB0aGlzLmRyb3Bkb3duLmdldERhdHVtRm9yQ3Vyc29yKCk7XG4gICAgdmFyIGN1cnJlbnRDdXJzb3JJZCA9IHRoaXMuZHJvcGRvd24uZ2V0Q3VycmVudEN1cnNvcigpLmF0dHIoJ2lkJyk7XG4gICAgdGhpcy5pbnB1dC5zZXRBY3RpdmVEZXNjZW5kYW50KGN1cnJlbnRDdXJzb3JJZCk7XG5cbiAgICBpZiAoZGF0dW0pIHtcbiAgICAgIGlmICh1cGRhdGVJbnB1dCkge1xuICAgICAgICB0aGlzLmlucHV0LnNldElucHV0VmFsdWUoZGF0dW0udmFsdWUsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ2N1cnNvcmNoYW5nZWQnLCBkYXR1bS5yYXcsIGRhdHVtLmRhdGFzZXROYW1lKTtcbiAgICB9XG4gIH0sXG5cbiAgX29uQ3Vyc29yUmVtb3ZlZDogZnVuY3Rpb24gb25DdXJzb3JSZW1vdmVkKCkge1xuICAgIHRoaXMuaW5wdXQucmVzZXRJbnB1dFZhbHVlKCk7XG4gICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignY3Vyc29ycmVtb3ZlZCcpO1xuICB9LFxuXG4gIF9vbkRhdGFzZXRSZW5kZXJlZDogZnVuY3Rpb24gb25EYXRhc2V0UmVuZGVyZWQoKSB7XG4gICAgdGhpcy5fdXBkYXRlSGludCgpO1xuXG4gICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCd1cGRhdGVkJyk7XG4gIH0sXG5cbiAgX29uT3BlbmVkOiBmdW5jdGlvbiBvbk9wZW5lZCgpIHtcbiAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgdGhpcy5pbnB1dC5leHBhbmQoKTtcblxuICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignb3BlbmVkJyk7XG4gIH0sXG5cbiAgX29uRW1wdHk6IGZ1bmN0aW9uIG9uRW1wdHkoKSB7XG4gICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdlbXB0eScpO1xuICB9LFxuXG4gIF9vblJlZHJhd246IGZ1bmN0aW9uIG9uUmVkcmF3bigpIHtcbiAgICB0aGlzLiRub2RlLmNzcygndG9wJywgMCArICdweCcpO1xuICAgIHRoaXMuJG5vZGUuY3NzKCdsZWZ0JywgMCArICdweCcpO1xuXG4gICAgdmFyIGlucHV0UmVjdCA9IHRoaXMuJGlucHV0WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKHRoaXMuYXV0b1dpZHRoKSB7XG4gICAgICB0aGlzLiRub2RlLmNzcygnd2lkdGgnLCBpbnB1dFJlY3Qud2lkdGggKyAncHgnKTtcbiAgICB9XG5cbiAgICB2YXIgd3JhcHBlclJlY3QgPSB0aGlzLiRub2RlWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdmFyIHRvcCA9IGlucHV0UmVjdC5ib3R0b20gLSB3cmFwcGVyUmVjdC50b3A7XG4gICAgdGhpcy4kbm9kZS5jc3MoJ3RvcCcsIHRvcCArICdweCcpO1xuICAgIHZhciBsZWZ0ID0gaW5wdXRSZWN0LmxlZnQgLSB3cmFwcGVyUmVjdC5sZWZ0O1xuICAgIHRoaXMuJG5vZGUuY3NzKCdsZWZ0JywgbGVmdCArICdweCcpO1xuXG4gICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdyZWRyYXduJyk7XG4gIH0sXG5cbiAgX29uU2hvd246IGZ1bmN0aW9uIG9uU2hvd24oKSB7XG4gICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdzaG93bicpO1xuICAgIGlmICh0aGlzLmF1dG9zZWxlY3QpIHtcbiAgICAgIHRoaXMuZHJvcGRvd24uY3Vyc29yVG9wU3VnZ2VzdGlvbigpO1xuICAgIH1cbiAgfSxcblxuICBfb25DbG9zZWQ6IGZ1bmN0aW9uIG9uQ2xvc2VkKCkge1xuICAgIHRoaXMuaW5wdXQuY2xlYXJIaW50KCk7XG4gICAgdGhpcy5pbnB1dC5yZW1vdmVBY3RpdmVEZXNjZW5kYW50KCk7XG4gICAgdGhpcy5pbnB1dC5jb2xsYXBzZSgpO1xuXG4gICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdjbG9zZWQnKTtcbiAgfSxcblxuICBfb25Gb2N1c2VkOiBmdW5jdGlvbiBvbkZvY3VzZWQoKSB7XG4gICAgdGhpcy5pc0FjdGl2YXRlZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5vcGVuT25Gb2N1cykge1xuICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShxdWVyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmVtcHR5KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJvcGRvd24ub3BlbigpO1xuICAgIH1cbiAgfSxcblxuICBfb25CbHVycmVkOiBmdW5jdGlvbiBvbkJsdXJyZWQoKSB7XG4gICAgdmFyIGN1cnNvckRhdHVtO1xuICAgIHZhciB0b3BTdWdnZXN0aW9uRGF0dW07XG5cbiAgICBjdXJzb3JEYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JDdXJzb3IoKTtcbiAgICB0b3BTdWdnZXN0aW9uRGF0dW0gPSB0aGlzLmRyb3Bkb3duLmdldERhdHVtRm9yVG9wU3VnZ2VzdGlvbigpO1xuICAgIHZhciBjb250ZXh0ID0ge3NlbGVjdGlvbk1ldGhvZDogJ2JsdXInfTtcblxuICAgIGlmICghdGhpcy5kZWJ1Zykge1xuICAgICAgaWYgKHRoaXMuYXV0b3NlbGVjdE9uQmx1ciAmJiBjdXJzb3JEYXR1bSkge1xuICAgICAgICB0aGlzLl9zZWxlY3QoY3Vyc29yRGF0dW0sIGNvbnRleHQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9zZWxlY3RPbkJsdXIgJiYgdG9wU3VnZ2VzdGlvbkRhdHVtKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdCh0b3BTdWdnZXN0aW9uRGF0dW0sIGNvbnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc0FjdGl2YXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmVtcHR5KCk7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX29uRW50ZXJLZXllZDogZnVuY3Rpb24gb25FbnRlcktleWVkKHR5cGUsICRlKSB7XG4gICAgdmFyIGN1cnNvckRhdHVtO1xuICAgIHZhciB0b3BTdWdnZXN0aW9uRGF0dW07XG5cbiAgICBjdXJzb3JEYXR1bSA9IHRoaXMuZHJvcGRvd24uZ2V0RGF0dW1Gb3JDdXJzb3IoKTtcbiAgICB0b3BTdWdnZXN0aW9uRGF0dW0gPSB0aGlzLmRyb3Bkb3duLmdldERhdHVtRm9yVG9wU3VnZ2VzdGlvbigpO1xuICAgIHZhciBjb250ZXh0ID0ge3NlbGVjdGlvbk1ldGhvZDogJ2VudGVyS2V5J307XG5cbiAgICBpZiAoY3Vyc29yRGF0dW0pIHtcbiAgICAgIHRoaXMuX3NlbGVjdChjdXJzb3JEYXR1bSwgY29udGV4dCk7XG4gICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvc2VsZWN0ICYmIHRvcFN1Z2dlc3Rpb25EYXR1bSkge1xuICAgICAgdGhpcy5fc2VsZWN0KHRvcFN1Z2dlc3Rpb25EYXR1bSwgY29udGV4dCk7XG4gICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSxcblxuICBfb25UYWJLZXllZDogZnVuY3Rpb24gb25UYWJLZXllZCh0eXBlLCAkZSkge1xuICAgIGlmICghdGhpcy50YWJBdXRvY29tcGxldGUpIHtcbiAgICAgIC8vIENsb3NpbmcgdGhlIGRyb3Bkb3duIGVuYWJsZXMgZnVydGhlciB0YWJiaW5nXG4gICAgICB0aGlzLmRyb3Bkb3duLmNsb3NlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGRhdHVtO1xuICAgIHZhciBjb250ZXh0ID0ge3NlbGVjdGlvbk1ldGhvZDogJ3RhYktleSd9O1xuXG4gICAgaWYgKGRhdHVtID0gdGhpcy5kcm9wZG93bi5nZXREYXR1bUZvckN1cnNvcigpKSB7XG4gICAgICB0aGlzLl9zZWxlY3QoZGF0dW0sIGNvbnRleHQpO1xuICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYXV0b2NvbXBsZXRlKHRydWUpO1xuICAgIH1cbiAgfSxcblxuICBfb25Fc2NLZXllZDogZnVuY3Rpb24gb25Fc2NLZXllZCgpIHtcbiAgICB0aGlzLmRyb3Bkb3duLmNsb3NlKCk7XG4gICAgdGhpcy5pbnB1dC5yZXNldElucHV0VmFsdWUoKTtcbiAgfSxcblxuICBfb25VcEtleWVkOiBmdW5jdGlvbiBvblVwS2V5ZWQoKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuXG4gICAgaWYgKHRoaXMuZHJvcGRvd24uaXNFbXB0eSAmJiBxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgIHRoaXMuZHJvcGRvd24udXBkYXRlKHF1ZXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wZG93bi5tb3ZlQ3Vyc29yVXAoKTtcbiAgICB9XG5cbiAgICB0aGlzLmRyb3Bkb3duLm9wZW4oKTtcbiAgfSxcblxuICBfb25Eb3duS2V5ZWQ6IGZ1bmN0aW9uIG9uRG93bktleWVkKCkge1xuICAgIHZhciBxdWVyeSA9IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcblxuICAgIGlmICh0aGlzLmRyb3Bkb3duLmlzRW1wdHkgJiYgcXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShxdWVyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcGRvd24ubW92ZUN1cnNvckRvd24oKTtcbiAgICB9XG5cbiAgICB0aGlzLmRyb3Bkb3duLm9wZW4oKTtcbiAgfSxcblxuICBfb25MZWZ0S2V5ZWQ6IGZ1bmN0aW9uIG9uTGVmdEtleWVkKCkge1xuICAgIGlmICh0aGlzLmRpciA9PT0gJ3J0bCcpIHtcbiAgICAgIHRoaXMuX2F1dG9jb21wbGV0ZSgpO1xuICAgIH1cbiAgfSxcblxuICBfb25SaWdodEtleWVkOiBmdW5jdGlvbiBvblJpZ2h0S2V5ZWQoKSB7XG4gICAgaWYgKHRoaXMuZGlyID09PSAnbHRyJykge1xuICAgICAgdGhpcy5fYXV0b2NvbXBsZXRlKCk7XG4gICAgfVxuICB9LFxuXG4gIF9vblF1ZXJ5Q2hhbmdlZDogZnVuY3Rpb24gb25RdWVyeUNoYW5nZWQoZSwgcXVlcnkpIHtcbiAgICB0aGlzLmlucHV0LmNsZWFySGludElmSW52YWxpZCgpO1xuXG4gICAgaWYgKHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgdGhpcy5kcm9wZG93bi51cGRhdGUocXVlcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyb3Bkb3duLmVtcHR5KCk7XG4gICAgfVxuXG4gICAgdGhpcy5kcm9wZG93bi5vcGVuKCk7XG4gICAgdGhpcy5fc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbiAgfSxcblxuICBfb25XaGl0ZXNwYWNlQ2hhbmdlZDogZnVuY3Rpb24gb25XaGl0ZXNwYWNlQ2hhbmdlZCgpIHtcbiAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgdGhpcy5kcm9wZG93bi5vcGVuKCk7XG4gIH0sXG5cbiAgX3NldExhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBzZXRMYW5ndWFnZURpcmVjdGlvbigpIHtcbiAgICB2YXIgZGlyID0gdGhpcy5pbnB1dC5nZXRMYW5ndWFnZURpcmVjdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuZGlyICE9PSBkaXIpIHtcbiAgICAgIHRoaXMuZGlyID0gZGlyO1xuICAgICAgdGhpcy4kbm9kZS5jc3MoJ2RpcmVjdGlvbicsIGRpcik7XG4gICAgICB0aGlzLmRyb3Bkb3duLnNldExhbmd1YWdlRGlyZWN0aW9uKGRpcik7XG4gICAgfVxuICB9LFxuXG4gIF91cGRhdGVIaW50OiBmdW5jdGlvbiB1cGRhdGVIaW50KCkge1xuICAgIHZhciBkYXR1bTtcbiAgICB2YXIgdmFsO1xuICAgIHZhciBxdWVyeTtcbiAgICB2YXIgZXNjYXBlZFF1ZXJ5O1xuICAgIHZhciBmcm9udE1hdGNoUmVnRXg7XG4gICAgdmFyIG1hdGNoO1xuXG4gICAgZGF0dW0gPSB0aGlzLmRyb3Bkb3duLmdldERhdHVtRm9yVG9wU3VnZ2VzdGlvbigpO1xuXG4gICAgaWYgKGRhdHVtICYmIHRoaXMuZHJvcGRvd24uaXNWaXNpYmxlKCkgJiYgIXRoaXMuaW5wdXQuaGFzT3ZlcmZsb3coKSkge1xuICAgICAgdmFsID0gdGhpcy5pbnB1dC5nZXRJbnB1dFZhbHVlKCk7XG4gICAgICBxdWVyeSA9IElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KHZhbCk7XG4gICAgICBlc2NhcGVkUXVlcnkgPSBfLmVzY2FwZVJlZ0V4Q2hhcnMocXVlcnkpO1xuXG4gICAgICAvLyBtYXRjaCBpbnB1dCB2YWx1ZSwgdGhlbiBjYXB0dXJlIHRyYWlsaW5nIHRleHRcbiAgICAgIGZyb250TWF0Y2hSZWdFeCA9IG5ldyBSZWdFeHAoJ14oPzonICsgZXNjYXBlZFF1ZXJ5ICsgJykoLiskKScsICdpJyk7XG4gICAgICBtYXRjaCA9IGZyb250TWF0Y2hSZWdFeC5leGVjKGRhdHVtLnZhbHVlKTtcblxuICAgICAgLy8gY2xlYXIgaGludCBpZiB0aGVyZSdzIG5vIHRyYWlsaW5nIHRleHRcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICB0aGlzLmlucHV0LnNldEhpbnQodmFsICsgbWF0Y2hbMV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcbiAgICB9XG4gIH0sXG5cbiAgX2F1dG9jb21wbGV0ZTogZnVuY3Rpb24gYXV0b2NvbXBsZXRlKGxheEN1cnNvcikge1xuICAgIHZhciBoaW50O1xuICAgIHZhciBxdWVyeTtcbiAgICB2YXIgaXNDdXJzb3JBdEVuZDtcbiAgICB2YXIgZGF0dW07XG5cbiAgICBoaW50ID0gdGhpcy5pbnB1dC5nZXRIaW50KCk7XG4gICAgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gICAgaXNDdXJzb3JBdEVuZCA9IGxheEN1cnNvciB8fCB0aGlzLmlucHV0LmlzQ3Vyc29yQXRFbmQoKTtcblxuICAgIGlmIChoaW50ICYmIHF1ZXJ5ICE9PSBoaW50ICYmIGlzQ3Vyc29yQXRFbmQpIHtcbiAgICAgIGRhdHVtID0gdGhpcy5kcm9wZG93bi5nZXREYXR1bUZvclRvcFN1Z2dlc3Rpb24oKTtcbiAgICAgIGlmIChkYXR1bSkge1xuICAgICAgICB0aGlzLmlucHV0LnNldElucHV0VmFsdWUoZGF0dW0udmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ2F1dG9jb21wbGV0ZWQnLCBkYXR1bS5yYXcsIGRhdHVtLmRhdGFzZXROYW1lKTtcbiAgICB9XG4gIH0sXG5cbiAgX3NlbGVjdDogZnVuY3Rpb24gc2VsZWN0KGRhdHVtLCBjb250ZXh0KSB7XG4gICAgaWYgKHR5cGVvZiBkYXR1bS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaW5wdXQuc2V0UXVlcnkoZGF0dW0udmFsdWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jbGVhck9uU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2V0VmFsKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnB1dC5zZXRJbnB1dFZhbHVlKGRhdHVtLnZhbHVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZXRMYW5ndWFnZURpcmVjdGlvbigpO1xuXG4gICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdzZWxlY3RlZCcsIGRhdHVtLnJhdywgZGF0dW0uZGF0YXNldE5hbWUsIGNvbnRleHQpO1xuICAgIGlmIChldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZHJvcGRvd24uY2xvc2UoKTtcblxuICAgICAgLy8gIzExODogYWxsb3cgY2xpY2sgZXZlbnQgdG8gYnViYmxlIHVwIHRvIHRoZSBib2R5IGJlZm9yZSByZW1vdmluZ1xuICAgICAgLy8gdGhlIHN1Z2dlc3Rpb25zIG90aGVyd2lzZSB3ZSBicmVhayBldmVudCBkZWxlZ2F0aW9uXG4gICAgICBfLmRlZmVyKF8uYmluZCh0aGlzLmRyb3Bkb3duLmVtcHR5LCB0aGlzLmRyb3Bkb3duKSk7XG4gICAgfVxuICB9LFxuXG4gIC8vICMjIyBwdWJsaWNcblxuICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgIC8vIGlmIHRoZSBtZW51IGlzIG5vdCBhY3RpdmF0ZWQgeWV0LCB3ZSBuZWVkIHRvIHVwZGF0ZVxuICAgIC8vIHRoZSB1bmRlcmx5aW5nIGRyb3Bkb3duIG1lbnUgdG8gdHJpZ2dlciB0aGUgc2VhcmNoXG4gICAgLy8gb3RoZXJ3aXNlIHdlJ3JlIG5vdCBnb25uYSBzZWUgYW55dGhpbmdcbiAgICBpZiAoIXRoaXMuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHZhciBxdWVyeSA9IHRoaXMuaW5wdXQuZ2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLnVwZGF0ZShxdWVyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmVtcHR5KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZHJvcGRvd24ub3BlbigpO1xuICB9LFxuXG4gIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICB0aGlzLmRyb3Bkb3duLmNsb3NlKCk7XG4gIH0sXG5cbiAgc2V0VmFsOiBmdW5jdGlvbiBzZXRWYWwodmFsKSB7XG4gICAgLy8gZXhwZWN0IHZhbCB0byBiZSBhIHN0cmluZywgc28gYmUgc2FmZSwgYW5kIGNvZXJjZVxuICAgIHZhbCA9IF8udG9TdHIodmFsKTtcblxuICAgIGlmICh0aGlzLmlzQWN0aXZhdGVkKSB7XG4gICAgICB0aGlzLmlucHV0LnNldElucHV0VmFsdWUodmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnB1dC5zZXRRdWVyeSh2YWwpO1xuICAgICAgdGhpcy5pbnB1dC5zZXRJbnB1dFZhbHVlKHZhbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbiAgfSxcblxuICBnZXRWYWw6IGZ1bmN0aW9uIGdldFZhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuICB9LFxuXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgdGhpcy5kcm9wZG93bi5kZXN0cm95KCk7XG5cbiAgICBkZXN0cm95RG9tU3RydWN0dXJlKHRoaXMuJG5vZGUsIHRoaXMuY3NzQ2xhc3Nlcyk7XG5cbiAgICB0aGlzLiRub2RlID0gbnVsbDtcbiAgfSxcblxuICBnZXRXcmFwcGVyOiBmdW5jdGlvbiBnZXRXcmFwcGVyKCkge1xuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duLiRjb250YWluZXJbMF07XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBidWlsZERvbShvcHRpb25zKSB7XG4gIHZhciAkaW5wdXQ7XG4gIHZhciAkd3JhcHBlcjtcbiAgdmFyICRkcm9wZG93bjtcbiAgdmFyICRoaW50O1xuXG4gICRpbnB1dCA9IERPTS5lbGVtZW50KG9wdGlvbnMuaW5wdXQpO1xuICAkd3JhcHBlciA9IERPTVxuICAgIC5lbGVtZW50KGh0bWwud3JhcHBlci5yZXBsYWNlKCclUk9PVCUnLCBvcHRpb25zLmNzc0NsYXNzZXMucm9vdCkpXG4gICAgLmNzcyhvcHRpb25zLmNzcy53cmFwcGVyKTtcblxuICAvLyBvdmVycmlkZSB0aGUgZGlzcGxheSBwcm9wZXJ0eSB3aXRoIHRoZSB0YWJsZS1jZWxsIHZhbHVlXG4gIC8vIGlmIHRoZSBwYXJlbnQgZWxlbWVudCBpcyBhIHRhYmxlIGFuZCB0aGUgb3JpZ2luYWwgaW5wdXQgd2FzIGEgYmxvY2tcbiAgLy8gIC0+IGh0dHBzOi8vZ2l0aHViLmNvbS9hbGdvbGlhL2F1dG9jb21wbGV0ZS5qcy9pc3N1ZXMvMTZcbiAgaWYgKCFvcHRpb25zLmFwcGVuZFRvICYmICRpbnB1dC5jc3MoJ2Rpc3BsYXknKSA9PT0gJ2Jsb2NrJyAmJiAkaW5wdXQucGFyZW50KCkuY3NzKCdkaXNwbGF5JykgPT09ICd0YWJsZScpIHtcbiAgICAkd3JhcHBlci5jc3MoJ2Rpc3BsYXknLCAndGFibGUtY2VsbCcpO1xuICB9XG4gIHZhciBkcm9wZG93bkh0bWwgPSBodG1sLmRyb3Bkb3duLlxuICAgIHJlcGxhY2UoJyVQUkVGSVglJywgb3B0aW9ucy5jc3NDbGFzc2VzLnByZWZpeCkuXG4gICAgcmVwbGFjZSgnJURST1BET1dOX01FTlUlJywgb3B0aW9ucy5jc3NDbGFzc2VzLmRyb3Bkb3duTWVudSk7XG4gICRkcm9wZG93biA9IERPTS5lbGVtZW50KGRyb3Bkb3duSHRtbClcbiAgICAuY3NzKG9wdGlvbnMuY3NzLmRyb3Bkb3duKVxuICAgIC5hdHRyKHtcbiAgICAgIHJvbGU6ICdsaXN0Ym94JyxcbiAgICAgIGlkOiBvcHRpb25zLmxpc3Rib3hJZFxuICAgIH0pO1xuICBpZiAob3B0aW9ucy50ZW1wbGF0ZXMgJiYgb3B0aW9ucy50ZW1wbGF0ZXMuZHJvcGRvd25NZW51KSB7XG4gICAgJGRyb3Bkb3duLmh0bWwoXy50ZW1wbGF0aWZ5KG9wdGlvbnMudGVtcGxhdGVzLmRyb3Bkb3duTWVudSkoKSk7XG4gIH1cbiAgJGhpbnQgPSAkaW5wdXQuY2xvbmUoKS5jc3Mob3B0aW9ucy5jc3MuaGludCkuY3NzKGdldEJhY2tncm91bmRTdHlsZXMoJGlucHV0KSk7XG5cbiAgJGhpbnRcbiAgICAudmFsKCcnKVxuICAgIC5hZGRDbGFzcyhfLmNsYXNzTmFtZShvcHRpb25zLmNzc0NsYXNzZXMucHJlZml4LCBvcHRpb25zLmNzc0NsYXNzZXMuaGludCwgdHJ1ZSkpXG4gICAgLnJlbW92ZUF0dHIoJ2lkIG5hbWUgcGxhY2Vob2xkZXIgcmVxdWlyZWQnKVxuICAgIC5wcm9wKCdyZWFkb25seScsIHRydWUpXG4gICAgLmF0dHIoe1xuICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgICAgIHNwZWxsY2hlY2s6ICdmYWxzZScsXG4gICAgICB0YWJpbmRleDogLTFcbiAgICB9KTtcbiAgaWYgKCRoaW50LnJlbW92ZURhdGEpIHtcbiAgICAkaGludC5yZW1vdmVEYXRhKCk7XG4gIH1cblxuICAvLyBzdG9yZSB0aGUgb3JpZ2luYWwgdmFsdWVzIG9mIHRoZSBhdHRycyB0aGF0IGdldCBtb2RpZmllZFxuICAvLyBzbyBtb2RpZmljYXRpb25zIGNhbiBiZSByZXZlcnRlZCBvbiBkZXN0cm95XG4gICRpbnB1dC5kYXRhKGF0dHJzS2V5LCB7XG4gICAgJ2FyaWEtYXV0b2NvbXBsZXRlJzogJGlucHV0LmF0dHIoJ2FyaWEtYXV0b2NvbXBsZXRlJyksXG4gICAgJ2FyaWEtZXhwYW5kZWQnOiAkaW5wdXQuYXR0cignYXJpYS1leHBhbmRlZCcpLFxuICAgICdhcmlhLW93bnMnOiAkaW5wdXQuYXR0cignYXJpYS1vd25zJyksXG4gICAgYXV0b2NvbXBsZXRlOiAkaW5wdXQuYXR0cignYXV0b2NvbXBsZXRlJyksXG4gICAgZGlyOiAkaW5wdXQuYXR0cignZGlyJyksXG4gICAgcm9sZTogJGlucHV0LmF0dHIoJ3JvbGUnKSxcbiAgICBzcGVsbGNoZWNrOiAkaW5wdXQuYXR0cignc3BlbGxjaGVjaycpLFxuICAgIHN0eWxlOiAkaW5wdXQuYXR0cignc3R5bGUnKSxcbiAgICB0eXBlOiAkaW5wdXQuYXR0cigndHlwZScpXG4gIH0pO1xuXG4gICRpbnB1dFxuICAgIC5hZGRDbGFzcyhfLmNsYXNzTmFtZShvcHRpb25zLmNzc0NsYXNzZXMucHJlZml4LCBvcHRpb25zLmNzc0NsYXNzZXMuaW5wdXQsIHRydWUpKVxuICAgIC5hdHRyKHtcbiAgICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gICAgICBzcGVsbGNoZWNrOiBmYWxzZSxcblxuICAgICAgLy8gQWNjZXNzaWJpbGl0eSBmZWF0dXJlc1xuICAgICAgLy8gR2l2ZSB0aGUgZmllbGQgYSBwcmVzZW50YXRpb24gb2YgYSBcInNlbGVjdFwiLlxuICAgICAgLy8gQ29tYm9ib3ggaXMgdGhlIGNvbWJpbmVkIHByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBsaW5lIHRleHRmaWVsZFxuICAgICAgLy8gd2l0aCBhIGxpc3Rib3ggcG9wdXAuXG4gICAgICAvLyBodHRwczovL3d3dy53My5vcmcvV0FJL1BGL2FyaWEvcm9sZXMjY29tYm9ib3hcbiAgICAgIHJvbGU6ICdjb21ib2JveCcsXG4gICAgICAvLyBMZXQgdGhlIHNjcmVlbiByZWFkZXIga25vdyB0aGUgZmllbGQgaGFzIGFuIGF1dG9jb21wbGV0ZVxuICAgICAgLy8gZmVhdHVyZSB0byBpdC5cbiAgICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6IChvcHRpb25zLmRhdGFzZXRzICYmXG4gICAgICAgIG9wdGlvbnMuZGF0YXNldHNbMF0gJiYgb3B0aW9ucy5kYXRhc2V0c1swXS5kaXNwbGF5S2V5ID8gJ2JvdGgnIDogJ2xpc3QnKSxcbiAgICAgIC8vIEluZGljYXRlcyB3aGV0aGVyIHRoZSBkcm9wZG93biBpdCBjb250cm9scyBpcyBjdXJyZW50bHkgZXhwYW5kZWQgb3IgY29sbGFwc2VkXG4gICAgICAnYXJpYS1leHBhbmRlZCc6ICdmYWxzZScsXG4gICAgICAnYXJpYS1sYWJlbCc6IG9wdGlvbnMuYXJpYUxhYmVsLFxuICAgICAgLy8gRXhwbGljaXRseSBwb2ludCB0byB0aGUgbGlzdGJveCxcbiAgICAgIC8vIHdoaWNoIGlzIGEgbGlzdCBvZiBzdWdnZXN0aW9ucyAoYWthIG9wdGlvbnMpXG4gICAgICAnYXJpYS1vd25zJzogb3B0aW9ucy5saXN0Ym94SWRcbiAgICB9KVxuICAgIC5jc3Mob3B0aW9ucy5oaW50ID8gb3B0aW9ucy5jc3MuaW5wdXQgOiBvcHRpb25zLmNzcy5pbnB1dFdpdGhOb0hpbnQpO1xuXG4gIC8vIGllNyBkb2VzIG5vdCBsaWtlIGl0IHdoZW4gZGlyIGlzIHNldCB0byBhdXRvXG4gIHRyeSB7XG4gICAgaWYgKCEkaW5wdXQuYXR0cignZGlyJykpIHtcbiAgICAgICRpbnB1dC5hdHRyKCdkaXInLCAnYXV0bycpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGlnbm9yZVxuICB9XG5cbiAgJHdyYXBwZXIgPSBvcHRpb25zLmFwcGVuZFRvXG4gICAgPyAkd3JhcHBlci5hcHBlbmRUbyhET00uZWxlbWVudChvcHRpb25zLmFwcGVuZFRvKS5lcSgwKSkuZXEoMClcbiAgICA6ICRpbnB1dC53cmFwKCR3cmFwcGVyKS5wYXJlbnQoKTtcblxuICAkd3JhcHBlclxuICAgIC5wcmVwZW5kKG9wdGlvbnMuaGludCA/ICRoaW50IDogbnVsbClcbiAgICAuYXBwZW5kKCRkcm9wZG93bik7XG5cbiAgcmV0dXJuIHtcbiAgICB3cmFwcGVyOiAkd3JhcHBlcixcbiAgICBpbnB1dDogJGlucHV0LFxuICAgIGhpbnQ6ICRoaW50LFxuICAgIG1lbnU6ICRkcm9wZG93blxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRCYWNrZ3JvdW5kU3R5bGVzKCRlbCkge1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmRBdHRhY2htZW50OiAkZWwuY3NzKCdiYWNrZ3JvdW5kLWF0dGFjaG1lbnQnKSxcbiAgICBiYWNrZ3JvdW5kQ2xpcDogJGVsLmNzcygnYmFja2dyb3VuZC1jbGlwJyksXG4gICAgYmFja2dyb3VuZENvbG9yOiAkZWwuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyksXG4gICAgYmFja2dyb3VuZEltYWdlOiAkZWwuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXG4gICAgYmFja2dyb3VuZE9yaWdpbjogJGVsLmNzcygnYmFja2dyb3VuZC1vcmlnaW4nKSxcbiAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICRlbC5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24nKSxcbiAgICBiYWNrZ3JvdW5kUmVwZWF0OiAkZWwuY3NzKCdiYWNrZ3JvdW5kLXJlcGVhdCcpLFxuICAgIGJhY2tncm91bmRTaXplOiAkZWwuY3NzKCdiYWNrZ3JvdW5kLXNpemUnKVxuICB9O1xufVxuXG5mdW5jdGlvbiBkZXN0cm95RG9tU3RydWN0dXJlKCRub2RlLCBjc3NDbGFzc2VzKSB7XG4gIHZhciAkaW5wdXQgPSAkbm9kZS5maW5kKF8uY2xhc3NOYW1lKGNzc0NsYXNzZXMucHJlZml4LCBjc3NDbGFzc2VzLmlucHV0KSk7XG5cbiAgLy8gbmVlZCB0byByZW1vdmUgYXR0cnMgdGhhdCB3ZXJlbid0IHByZXZpb3VzbHkgZGVmaW5lZCBhbmRcbiAgLy8gcmV2ZXJ0IGF0dHJzIHRoYXQgb3JpZ2luYWxseSBoYWQgYSB2YWx1ZVxuICBfLmVhY2goJGlucHV0LmRhdGEoYXR0cnNLZXkpLCBmdW5jdGlvbih2YWwsIGtleSkge1xuICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgJGlucHV0LnJlbW92ZUF0dHIoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGlucHV0LmF0dHIoa2V5LCB2YWwpO1xuICAgIH1cbiAgfSk7XG5cbiAgJGlucHV0XG4gICAgLmRldGFjaCgpXG4gICAgLnJlbW92ZUNsYXNzKF8uY2xhc3NOYW1lKGNzc0NsYXNzZXMucHJlZml4LCBjc3NDbGFzc2VzLmlucHV0LCB0cnVlKSlcbiAgICAuaW5zZXJ0QWZ0ZXIoJG5vZGUpO1xuICBpZiAoJGlucHV0LnJlbW92ZURhdGEpIHtcbiAgICAkaW5wdXQucmVtb3ZlRGF0YShhdHRyc0tleSk7XG4gIH1cblxuICAkbm9kZS5yZW1vdmUoKTtcbn1cblxuVHlwZWFoZWFkLkRyb3Bkb3duID0gRHJvcGRvd247XG5UeXBlYWhlYWQuSW5wdXQgPSBJbnB1dDtcblR5cGVhaGVhZC5zb3VyY2VzID0gcmVxdWlyZSgnLi4vc291cmNlcy9pbmRleC5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGVhaGVhZDtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVsZW1lbnQ6IG51bGxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbihhZ2VudCkge1xuICB2YXIgcGFyc2VkID1cbiAgICAvLyBVc2VyIGFnZW50IGZvciBhbGdvbGlhc2VhcmNoID49IDMuMzMuMFxuICAgIGFnZW50Lm1hdGNoKC9BbGdvbGlhIGZvciBKYXZhU2NyaXB0IFxcKChcXGQrXFwuKShcXGQrXFwuKShcXGQrKVxcKS8pIHx8XG4gICAgLy8gVXNlciBhZ2VudCBmb3IgYWxnb2xpYXNlYXJjaCA8IDMuMzMuMFxuICAgIGFnZW50Lm1hdGNoKC9BbGdvbGlhIGZvciB2YW5pbGxhIEphdmFTY3JpcHQgKFxcZCtcXC4pKFxcZCtcXC4pKFxcZCspLyk7XG5cbiAgaWYgKHBhcnNlZCkge1xuICAgIHJldHVybiBbcGFyc2VkWzFdLCBwYXJzZWRbMl0sIHBhcnNlZFszXV07XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIERPTSA9IHJlcXVpcmUoJy4vZG9tLmpzJyk7XG5cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgJ1xcXFwkJicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gdGhvc2UgbWV0aG9kcyBhcmUgaW1wbGVtZW50ZWQgZGlmZmVyZW50bHlcbiAgLy8gZGVwZW5kaW5nIG9uIHdoaWNoIGJ1aWxkIGl0IGlzLCB1c2luZ1xuICAvLyAkLi4uIG9yIGFuZ3VsYXIuLi4gb3IgWmVwdG8uLi4gb3IgcmVxdWlyZSguLi4pXG4gIGlzQXJyYXk6IG51bGwsXG4gIGlzRnVuY3Rpb246IG51bGwsXG4gIGlzT2JqZWN0OiBudWxsLFxuICBiaW5kOiBudWxsLFxuICBlYWNoOiBudWxsLFxuICBtYXA6IG51bGwsXG4gIG1peGluOiBudWxsLFxuXG4gIGlzTXNpZTogZnVuY3Rpb24oYWdlbnRTdHJpbmcpIHtcbiAgICBpZiAoYWdlbnRTdHJpbmcgPT09IHVuZGVmaW5lZCkgeyBhZ2VudFN0cmluZyA9IG5hdmlnYXRvci51c2VyQWdlbnQ7IH1cbiAgICAvLyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvYm93c2VyL2Jsb2IvbWFzdGVyL2Jvd3Nlci5qc1xuICAgIGlmICgoLyhtc2llfHRyaWRlbnQpL2kpLnRlc3QoYWdlbnRTdHJpbmcpKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBhZ2VudFN0cmluZy5tYXRjaCgvKG1zaWUgfHJ2OikoXFxkKyguXFxkKyk/KS9pKTtcbiAgICAgIGlmIChtYXRjaCkgeyByZXR1cm4gbWF0Y2hbMl07IH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzY5Njk0ODZcbiAgZXNjYXBlUmVnRXhDaGFyczogZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgJ1xcXFwkJicpO1xuICB9LFxuXG4gIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdudW1iZXInOyB9LFxuXG4gIHRvU3RyOiBmdW5jdGlvbiB0b1N0cihzKSB7XG4gICAgcmV0dXJuIHMgPT09IHVuZGVmaW5lZCB8fCBzID09PSBudWxsID8gJycgOiBzICsgJyc7XG4gIH0sXG5cbiAgY2xvbmVEZWVwOiBmdW5jdGlvbiBjbG9uZURlZXAob2JqKSB7XG4gICAgdmFyIGNsb25lID0gdGhpcy5taXhpbih7fSwgb2JqKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5lYWNoKGNsb25lLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHNlbGYuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBjbG9uZVtrZXldID0gW10uY29uY2F0KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmLmlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgIGNsb25lW2tleV0gPSBzZWxmLmNsb25lRGVlcCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH0sXG5cbiAgZXJyb3I6IGZ1bmN0aW9uKG1zZykge1xuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICB9LFxuXG4gIGV2ZXJ5OiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICBpZiAoIW9iaikge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdGhpcy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsLCBrZXkpIHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopICYmIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gISFyZXN1bHQ7XG4gIH0sXG5cbiAgYW55OiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICBpZiAoIW9iaikge1xuICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICB0aGlzLmVhY2gob2JqLCBmdW5jdGlvbih2YWwsIGtleSkge1xuICAgICAgaWYgKHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH0sXG5cbiAgZ2V0VW5pcXVlSWQ6IChmdW5jdGlvbigpIHtcbiAgICB2YXIgY291bnRlciA9IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gY291bnRlcisrOyB9O1xuICB9KSgpLFxuXG4gIHRlbXBsYXRpZnk6IGZ1bmN0aW9uIHRlbXBsYXRpZnkob2JqKSB7XG4gICAgaWYgKHRoaXMuaXNGdW5jdGlvbihvYmopKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICB2YXIgJHRlbXBsYXRlID0gRE9NLmVsZW1lbnQob2JqKTtcbiAgICBpZiAoJHRlbXBsYXRlLnByb3AoJ3RhZ05hbWUnKSA9PT0gJ1NDUklQVCcpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiB0ZW1wbGF0ZSgpIHsgcmV0dXJuICR0ZW1wbGF0ZS50ZXh0KCk7IH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiB0ZW1wbGF0ZSgpIHsgcmV0dXJuIFN0cmluZyhvYmopOyB9O1xuICB9LFxuXG4gIGRlZmVyOiBmdW5jdGlvbihmbikgeyBzZXRUaW1lb3V0KGZuLCAwKTsgfSxcblxuICBub29wOiBmdW5jdGlvbigpIHt9LFxuXG4gIGZvcm1hdFByZWZpeDogZnVuY3Rpb24ocHJlZml4LCBub1ByZWZpeCkge1xuICAgIHJldHVybiBub1ByZWZpeCA/ICcnIDogcHJlZml4ICsgJy0nO1xuICB9LFxuXG4gIGNsYXNzTmFtZTogZnVuY3Rpb24ocHJlZml4LCBjbGF6eiwgc2tpcERvdCkge1xuICAgIHJldHVybiAoc2tpcERvdCA/ICcnIDogJy4nKSArIHByZWZpeCArIGNsYXp6O1xuICB9LFxuXG4gIGVzY2FwZUhpZ2hsaWdodGVkU3RyaW5nOiBmdW5jdGlvbihzdHIsIGhpZ2hsaWdodFByZVRhZywgaGlnaGxpZ2h0UG9zdFRhZykge1xuICAgIGhpZ2hsaWdodFByZVRhZyA9IGhpZ2hsaWdodFByZVRhZyB8fCAnPGVtPic7XG4gICAgdmFyIHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShoaWdobGlnaHRQcmVUYWcpKTtcblxuICAgIGhpZ2hsaWdodFBvc3RUYWcgPSBoaWdobGlnaHRQb3N0VGFnIHx8ICc8L2VtPic7XG4gICAgdmFyIHBvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwb3N0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGhpZ2hsaWdodFBvc3RUYWcpKTtcblxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyKSk7XG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUxcbiAgICAgIC5yZXBsYWNlKFJlZ0V4cChlc2NhcGVSZWdFeHAocHJlLmlubmVySFRNTCksICdnJyksIGhpZ2hsaWdodFByZVRhZylcbiAgICAgIC5yZXBsYWNlKFJlZ0V4cChlc2NhcGVSZWdFeHAocG9zdC5pbm5lckhUTUwpLCAnZycpLCBoaWdobGlnaHRQb3N0VGFnKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF8gPSByZXF1aXJlKCcuLi9jb21tb24vdXRpbHMuanMnKTtcbnZhciB2ZXJzaW9uID0gcmVxdWlyZSgnLi4vLi4vdmVyc2lvbi5qcycpO1xudmFyIHBhcnNlQWxnb2xpYUNsaWVudFZlcnNpb24gPSByZXF1aXJlKCcuLi9jb21tb24vcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbi5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNlYXJjaChpbmRleCwgcGFyYW1zKSB7XG4gIHZhciBhbGdvbGlhVmVyc2lvbiA9IHBhcnNlQWxnb2xpYUNsaWVudFZlcnNpb24oaW5kZXguYXMuX3VhKTtcbiAgaWYgKGFsZ29saWFWZXJzaW9uICYmIGFsZ29saWFWZXJzaW9uWzBdID49IDMgJiYgYWxnb2xpYVZlcnNpb25bMV0gPiAyMCkge1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICBwYXJhbXMuYWRkaXRpb25hbFVBID0gJ2F1dG9jb21wbGV0ZS5qcyAnICsgdmVyc2lvbjtcbiAgfVxuICByZXR1cm4gc291cmNlRm47XG5cbiAgZnVuY3Rpb24gc291cmNlRm4ocXVlcnksIGNiKSB7XG4gICAgaW5kZXguc2VhcmNoKHF1ZXJ5LCBwYXJhbXMsIGZ1bmN0aW9uKGVycm9yLCBjb250ZW50KSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgXy5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY2IoY29udGVudC5oaXRzLCBjb250ZW50KTtcbiAgICB9KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhpdHM6IHJlcXVpcmUoJy4vaGl0cy5qcycpLFxuICBwb3B1bGFySW46IHJlcXVpcmUoJy4vcG9wdWxhckluLmpzJylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vY29tbW9uL3V0aWxzLmpzJyk7XG52YXIgdmVyc2lvbiA9IHJlcXVpcmUoJy4uLy4uL3ZlcnNpb24uanMnKTtcbnZhciBwYXJzZUFsZ29saWFDbGllbnRWZXJzaW9uID0gcmVxdWlyZSgnLi4vY29tbW9uL3BhcnNlQWxnb2xpYUNsaWVudFZlcnNpb24uanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwb3B1bGFySW4oaW5kZXgsIHBhcmFtcywgZGV0YWlscywgb3B0aW9ucykge1xuICB2YXIgYWxnb2xpYVZlcnNpb24gPSBwYXJzZUFsZ29saWFDbGllbnRWZXJzaW9uKGluZGV4LmFzLl91YSk7XG4gIGlmIChhbGdvbGlhVmVyc2lvbiAmJiBhbGdvbGlhVmVyc2lvblswXSA+PSAzICYmIGFsZ29saWFWZXJzaW9uWzFdID4gMjApIHtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgcGFyYW1zLmFkZGl0aW9uYWxVQSA9ICdhdXRvY29tcGxldGUuanMgJyArIHZlcnNpb247XG4gIH1cbiAgaWYgKCFkZXRhaWxzLnNvdXJjZSkge1xuICAgIHJldHVybiBfLmVycm9yKFwiTWlzc2luZyAnc291cmNlJyBrZXlcIik7XG4gIH1cbiAgdmFyIHNvdXJjZSA9IF8uaXNGdW5jdGlvbihkZXRhaWxzLnNvdXJjZSkgPyBkZXRhaWxzLnNvdXJjZSA6IGZ1bmN0aW9uKGhpdCkgeyByZXR1cm4gaGl0W2RldGFpbHMuc291cmNlXTsgfTtcblxuICBpZiAoIWRldGFpbHMuaW5kZXgpIHtcbiAgICByZXR1cm4gXy5lcnJvcihcIk1pc3NpbmcgJ2luZGV4JyBrZXlcIik7XG4gIH1cbiAgdmFyIGRldGFpbHNJbmRleCA9IGRldGFpbHMuaW5kZXg7XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgcmV0dXJuIHNvdXJjZUZuO1xuXG4gIGZ1bmN0aW9uIHNvdXJjZUZuKHF1ZXJ5LCBjYikge1xuICAgIGluZGV4LnNlYXJjaChxdWVyeSwgcGFyYW1zLCBmdW5jdGlvbihlcnJvciwgY29udGVudCkge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIF8uZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRlbnQuaGl0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBmaXJzdCA9IGNvbnRlbnQuaGl0c1swXTtcblxuICAgICAgICB2YXIgZGV0YWlsc1BhcmFtcyA9IF8ubWl4aW4oe2hpdHNQZXJQYWdlOiAwfSwgZGV0YWlscyk7XG4gICAgICAgIGRlbGV0ZSBkZXRhaWxzUGFyYW1zLnNvdXJjZTsgLy8gbm90IGEgcXVlcnkgcGFyYW1ldGVyXG4gICAgICAgIGRlbGV0ZSBkZXRhaWxzUGFyYW1zLmluZGV4OyAvLyBub3QgYSBxdWVyeSBwYXJhbWV0ZXJcblxuICAgICAgICB2YXIgZGV0YWlsc0FsZ29saWFWZXJzaW9uID0gcGFyc2VBbGdvbGlhQ2xpZW50VmVyc2lvbihkZXRhaWxzSW5kZXguYXMuX3VhKTtcbiAgICAgICAgaWYgKGRldGFpbHNBbGdvbGlhVmVyc2lvbiAmJiBkZXRhaWxzQWxnb2xpYVZlcnNpb25bMF0gPj0gMyAmJiBkZXRhaWxzQWxnb2xpYVZlcnNpb25bMV0gPiAyMCkge1xuICAgICAgICAgIHBhcmFtcy5hZGRpdGlvbmFsVUEgPSAnYXV0b2NvbXBsZXRlLmpzICcgKyB2ZXJzaW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgZGV0YWlsc0luZGV4LnNlYXJjaChzb3VyY2UoZmlyc3QpLCBkZXRhaWxzUGFyYW1zLCBmdW5jdGlvbihlcnJvcjIsIGNvbnRlbnQyKSB7XG4gICAgICAgICAgaWYgKGVycm9yMikge1xuICAgICAgICAgICAgXy5lcnJvcihlcnJvcjIubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gW107XG5cbiAgICAgICAgICAvLyBhZGQgdGhlICdhbGwgZGVwYXJ0bWVudCcgZW50cnkgYmVmb3JlIG90aGVyc1xuICAgICAgICAgIGlmIChvcHRpb25zLmluY2x1ZGVBbGwpIHtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IG9wdGlvbnMuYWxsVGl0bGUgfHwgJ0FsbCBkZXBhcnRtZW50cyc7XG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5wdXNoKF8ubWl4aW4oe1xuICAgICAgICAgICAgICBmYWNldDoge3ZhbHVlOiBsYWJlbCwgY291bnQ6IGNvbnRlbnQyLm5iSGl0c31cbiAgICAgICAgICAgIH0sIF8uY2xvbmVEZWVwKGZpcnN0KSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGVucmljaCB0aGUgZmlyc3QgaGl0IGl0ZXJhdGluZyBvdmVyIHRoZSBmYWNldHNcbiAgICAgICAgICBfLmVhY2goY29udGVudDIuZmFjZXRzLCBmdW5jdGlvbih2YWx1ZXMsIGZhY2V0KSB7XG4gICAgICAgICAgICBfLmVhY2godmFsdWVzLCBmdW5jdGlvbihjb3VudCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaChfLm1peGluKHtcbiAgICAgICAgICAgICAgICBmYWNldDoge2ZhY2V0OiBmYWNldCwgdmFsdWU6IHZhbHVlLCBjb3VudDogY291bnR9XG4gICAgICAgICAgICAgIH0sIF8uY2xvbmVEZWVwKGZpcnN0KSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBhcHBlbmQgYWxsIG90aGVyIGhpdHNcbiAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGNvbnRlbnQuaGl0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaChjb250ZW50LmhpdHNbaV0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNiKHN1Z2dlc3Rpb25zLCBjb250ZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjYihbXSk7XG4gICAgfSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIHRoaXMgd2lsbCBpbmplY3QgWmVwdG8gaW4gd2luZG93LCB1bmZvcnR1bmF0ZWx5IG5vIGVhc3kgY29tbW9uSlMgemVwdG8gYnVpbGRcbnZhciB6ZXB0byA9IHJlcXVpcmUoJy4uLy4uL3plcHRvLmpzJyk7XG5cbi8vIHNldHVwIERPTSBlbGVtZW50XG52YXIgRE9NID0gcmVxdWlyZSgnLi4vY29tbW9uL2RvbS5qcycpO1xuRE9NLmVsZW1lbnQgPSB6ZXB0bztcblxuLy8gc2V0dXAgdXRpbHMgZnVuY3Rpb25zXG52YXIgXyA9IHJlcXVpcmUoJy4uL2NvbW1vbi91dGlscy5qcycpO1xuXy5pc0FycmF5ID0gemVwdG8uaXNBcnJheTtcbl8uaXNGdW5jdGlvbiA9IHplcHRvLmlzRnVuY3Rpb247XG5fLmlzT2JqZWN0ID0gemVwdG8uaXNQbGFpbk9iamVjdDtcbl8uYmluZCA9IHplcHRvLnByb3h5O1xuXy5lYWNoID0gZnVuY3Rpb24oY29sbGVjdGlvbiwgY2IpIHtcbiAgLy8gc3R1cGlkIGFyZ3VtZW50IG9yZGVyIGZvciBqUXVlcnkuZWFjaFxuICB6ZXB0by5lYWNoKGNvbGxlY3Rpb24sIHJldmVyc2VBcmdzKTtcbiAgZnVuY3Rpb24gcmV2ZXJzZUFyZ3MoaW5kZXgsIHZhbHVlKSB7XG4gICAgcmV0dXJuIGNiKHZhbHVlLCBpbmRleCk7XG4gIH1cbn07XG5fLm1hcCA9IHplcHRvLm1hcDtcbl8ubWl4aW4gPSB6ZXB0by5leHRlbmQ7XG5fLkV2ZW50ID0gemVwdG8uRXZlbnQ7XG5cbnZhciB0eXBlYWhlYWRLZXkgPSAnYWFBdXRvY29tcGxldGUnO1xudmFyIFR5cGVhaGVhZCA9IHJlcXVpcmUoJy4uL2F1dG9jb21wbGV0ZS90eXBlYWhlYWQuanMnKTtcbnZhciBFdmVudEJ1cyA9IHJlcXVpcmUoJy4uL2F1dG9jb21wbGV0ZS9ldmVudF9idXMuanMnKTtcblxuZnVuY3Rpb24gYXV0b2NvbXBsZXRlKHNlbGVjdG9yLCBvcHRpb25zLCBkYXRhc2V0cywgdHlwZWFoZWFkT2JqZWN0KSB7XG4gIGRhdGFzZXRzID0gXy5pc0FycmF5KGRhdGFzZXRzKSA/IGRhdGFzZXRzIDogW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuXG4gIHZhciBpbnB1dHMgPSB6ZXB0byhzZWxlY3RvcikuZWFjaChmdW5jdGlvbihpLCBpbnB1dCkge1xuICAgIHZhciAkaW5wdXQgPSB6ZXB0byhpbnB1dCk7XG4gICAgdmFyIGV2ZW50QnVzID0gbmV3IEV2ZW50QnVzKHtlbDogJGlucHV0fSk7XG4gICAgdmFyIHR5cGVhaGVhZCA9IHR5cGVhaGVhZE9iamVjdCB8fCBuZXcgVHlwZWFoZWFkKHtcbiAgICAgIGlucHV0OiAkaW5wdXQsXG4gICAgICBldmVudEJ1czogZXZlbnRCdXMsXG4gICAgICBkcm9wZG93bk1lbnVDb250YWluZXI6IG9wdGlvbnMuZHJvcGRvd25NZW51Q29udGFpbmVyLFxuICAgICAgaGludDogb3B0aW9ucy5oaW50ID09PSB1bmRlZmluZWQgPyB0cnVlIDogISFvcHRpb25zLmhpbnQsXG4gICAgICBtaW5MZW5ndGg6IG9wdGlvbnMubWluTGVuZ3RoLFxuICAgICAgYXV0b3NlbGVjdDogb3B0aW9ucy5hdXRvc2VsZWN0LFxuICAgICAgYXV0b3NlbGVjdE9uQmx1cjogb3B0aW9ucy5hdXRvc2VsZWN0T25CbHVyLFxuICAgICAgdGFiQXV0b2NvbXBsZXRlOiBvcHRpb25zLnRhYkF1dG9jb21wbGV0ZSxcbiAgICAgIG9wZW5PbkZvY3VzOiBvcHRpb25zLm9wZW5PbkZvY3VzLFxuICAgICAgdGVtcGxhdGVzOiBvcHRpb25zLnRlbXBsYXRlcyxcbiAgICAgIGRlYnVnOiBvcHRpb25zLmRlYnVnLFxuICAgICAgY2xlYXJPblNlbGVjdGVkOiBvcHRpb25zLmNsZWFyT25TZWxlY3RlZCxcbiAgICAgIGNzc0NsYXNzZXM6IG9wdGlvbnMuY3NzQ2xhc3NlcyxcbiAgICAgIGRhdGFzZXRzOiBkYXRhc2V0cyxcbiAgICAgIGtleWJvYXJkU2hvcnRjdXRzOiBvcHRpb25zLmtleWJvYXJkU2hvcnRjdXRzLFxuICAgICAgYXBwZW5kVG86IG9wdGlvbnMuYXBwZW5kVG8sXG4gICAgICBhdXRvV2lkdGg6IG9wdGlvbnMuYXV0b1dpZHRoLFxuICAgICAgYXJpYUxhYmVsOiBvcHRpb25zLmFyaWFMYWJlbCB8fCBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKVxuICAgIH0pO1xuICAgICRpbnB1dC5kYXRhKHR5cGVhaGVhZEtleSwgdHlwZWFoZWFkKTtcbiAgfSk7XG5cbiAgLy8gZXhwb3NlIGFsbCBtZXRob2RzIGluIHRoZSBgYXV0b2NvbXBsZXRlYCBhdHRyaWJ1dGVcbiAgaW5wdXRzLmF1dG9jb21wbGV0ZSA9IHt9O1xuICBfLmVhY2goWydvcGVuJywgJ2Nsb3NlJywgJ2dldFZhbCcsICdzZXRWYWwnLCAnZGVzdHJveScsICdnZXRXcmFwcGVyJ10sIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGlucHV0cy5hdXRvY29tcGxldGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG1ldGhvZEFyZ3VtZW50cyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICBpbnB1dHMuZWFjaChmdW5jdGlvbihqLCBpbnB1dCkge1xuICAgICAgICB2YXIgdHlwZWFoZWFkID0gemVwdG8oaW5wdXQpLmRhdGEodHlwZWFoZWFkS2V5KTtcbiAgICAgICAgcmVzdWx0ID0gdHlwZWFoZWFkW21ldGhvZF0uYXBwbHkodHlwZWFoZWFkLCBtZXRob2RBcmd1bWVudHMpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBpbnB1dHM7XG59XG5cbmF1dG9jb21wbGV0ZS5zb3VyY2VzID0gVHlwZWFoZWFkLnNvdXJjZXM7XG5hdXRvY29tcGxldGUuZXNjYXBlSGlnaGxpZ2h0ZWRTdHJpbmcgPSBfLmVzY2FwZUhpZ2hsaWdodGVkU3RyaW5nO1xuXG52YXIgd2FzQXV0b2NvbXBsZXRlU2V0ID0gJ2F1dG9jb21wbGV0ZScgaW4gd2luZG93O1xudmFyIG9sZEF1dG9jb21wbGV0ZSA9IHdpbmRvdy5hdXRvY29tcGxldGU7XG5hdXRvY29tcGxldGUubm9Db25mbGljdCA9IGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gIGlmICh3YXNBdXRvY29tcGxldGVTZXQpIHtcbiAgICB3aW5kb3cuYXV0b2NvbXBsZXRlID0gb2xkQXV0b2NvbXBsZXRlO1xuICB9IGVsc2Uge1xuICAgIGRlbGV0ZSB3aW5kb3cuYXV0b2NvbXBsZXRlO1xuICB9XG4gIHJldHVybiBhdXRvY29tcGxldGU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF1dG9jb21wbGV0ZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCIwLjM3LjFcIjtcbiIsIi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4vKiBaZXB0byB2MS4yLjAgLSB6ZXB0byBldmVudCBhc3NldHMgZGF0YSAtIHplcHRvanMuY29tL2xpY2Vuc2UgKi9cbihmdW5jdGlvbihnbG9iYWwsIGZhY3RvcnkpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KGdsb2JhbCk7XG59KC8qIHRoaXMgIyMjIyMgVVBEQVRFRDogaGVyZSB3ZSB3YW50IHRvIHVzZSB3aW5kb3cvZ2xvYmFsIGluc3RlYWQgb2YgdGhpcyB3aGljaCBpcyB0aGUgY3VycmVudCBmaWxlIGNvbnRleHQgIyMjIyMgKi8gd2luZG93LCBmdW5jdGlvbih3aW5kb3cpIHtcbiAgdmFyIFplcHRvID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdW5kZWZpbmVkLCBrZXksICQsIGNsYXNzTGlzdCwgZW1wdHlBcnJheSA9IFtdLCBjb25jYXQgPSBlbXB0eUFycmF5LmNvbmNhdCwgZmlsdGVyID0gZW1wdHlBcnJheS5maWx0ZXIsIHNsaWNlID0gZW1wdHlBcnJheS5zbGljZSxcbiAgICBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcbiAgICBlbGVtZW50RGlzcGxheSA9IHt9LCBjbGFzc0NhY2hlID0ge30sXG4gICAgY3NzTnVtYmVyID0geyAnY29sdW1uLWNvdW50JzogMSwgJ2NvbHVtbnMnOiAxLCAnZm9udC13ZWlnaHQnOiAxLCAnbGluZS1oZWlnaHQnOiAxLCdvcGFjaXR5JzogMSwgJ3otaW5kZXgnOiAxLCAnem9vbSc6IDEgfSxcbiAgICBmcmFnbWVudFJFID0gL15cXHMqPChcXHcrfCEpW14+XSo+LyxcbiAgICBzaW5nbGVUYWdSRSA9IC9ePChcXHcrKVxccypcXC8/Pig/OjxcXC9cXDE+fCkkLyxcbiAgICB0YWdFeHBhbmRlclJFID0gLzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW1xcdzpdKylbXj5dKilcXC8+L2lnLFxuICAgIHJvb3ROb2RlUkUgPSAvXig/OmJvZHl8aHRtbCkkL2ksXG4gICAgY2FwaXRhbFJFID0gLyhbQS1aXSkvZyxcblxuICAgIC8vIHNwZWNpYWwgYXR0cmlidXRlcyB0aGF0IHNob3VsZCBiZSBnZXQvc2V0IHZpYSBtZXRob2QgY2FsbHNcbiAgICBtZXRob2RBdHRyaWJ1dGVzID0gWyd2YWwnLCAnY3NzJywgJ2h0bWwnLCAndGV4dCcsICdkYXRhJywgJ3dpZHRoJywgJ2hlaWdodCcsICdvZmZzZXQnXSxcblxuICAgIGFkamFjZW5jeU9wZXJhdG9ycyA9IFsgJ2FmdGVyJywgJ3ByZXBlbmQnLCAnYmVmb3JlJywgJ2FwcGVuZCcgXSxcbiAgICB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyksXG4gICAgdGFibGVSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpLFxuICAgIGNvbnRhaW5lcnMgPSB7XG4gICAgICAndHInOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpLFxuICAgICAgJ3Rib2R5JzogdGFibGUsICd0aGVhZCc6IHRhYmxlLCAndGZvb3QnOiB0YWJsZSxcbiAgICAgICd0ZCc6IHRhYmxlUm93LCAndGgnOiB0YWJsZVJvdyxcbiAgICAgICcqJzogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB9LFxuICAgIHJlYWR5UkUgPSAvY29tcGxldGV8bG9hZGVkfGludGVyYWN0aXZlLyxcbiAgICBzaW1wbGVTZWxlY3RvclJFID0gL15bXFx3LV0qJC8sXG4gICAgY2xhc3MydHlwZSA9IHt9LFxuICAgIHRvU3RyaW5nID0gY2xhc3MydHlwZS50b1N0cmluZyxcbiAgICB6ZXB0byA9IHt9LFxuICAgIGNhbWVsaXplLCB1bmlxLFxuICAgIHRlbXBQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICBwcm9wTWFwID0ge1xuICAgICAgJ3RhYmluZGV4JzogJ3RhYkluZGV4JyxcbiAgICAgICdyZWFkb25seSc6ICdyZWFkT25seScsXG4gICAgICAnZm9yJzogJ2h0bWxGb3InLFxuICAgICAgJ2NsYXNzJzogJ2NsYXNzTmFtZScsXG4gICAgICAnbWF4bGVuZ3RoJzogJ21heExlbmd0aCcsXG4gICAgICAnY2VsbHNwYWNpbmcnOiAnY2VsbFNwYWNpbmcnLFxuICAgICAgJ2NlbGxwYWRkaW5nJzogJ2NlbGxQYWRkaW5nJyxcbiAgICAgICdyb3dzcGFuJzogJ3Jvd1NwYW4nLFxuICAgICAgJ2NvbHNwYW4nOiAnY29sU3BhbicsXG4gICAgICAndXNlbWFwJzogJ3VzZU1hcCcsXG4gICAgICAnZnJhbWVib3JkZXInOiAnZnJhbWVCb3JkZXInLFxuICAgICAgJ2NvbnRlbnRlZGl0YWJsZSc6ICdjb250ZW50RWRpdGFibGUnXG4gICAgfSxcbiAgICBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fFxuICAgICAgZnVuY3Rpb24ob2JqZWN0KXsgcmV0dXJuIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5IH1cblxuICB6ZXB0by5tYXRjaGVzID0gZnVuY3Rpb24oZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICBpZiAoIXNlbGVjdG9yIHx8ICFlbGVtZW50IHx8IGVsZW1lbnQubm9kZVR5cGUgIT09IDEpIHJldHVybiBmYWxzZVxuICAgIHZhciBtYXRjaGVzU2VsZWN0b3IgPSBlbGVtZW50Lm1hdGNoZXMgfHwgZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgZWxlbWVudC5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubWF0Y2hlc1NlbGVjdG9yXG4gICAgaWYgKG1hdGNoZXNTZWxlY3RvcikgcmV0dXJuIG1hdGNoZXNTZWxlY3Rvci5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKVxuICAgIC8vIGZhbGwgYmFjayB0byBwZXJmb3JtaW5nIGEgc2VsZWN0b3I6XG4gICAgdmFyIG1hdGNoLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUsIHRlbXAgPSAhcGFyZW50XG4gICAgaWYgKHRlbXApIChwYXJlbnQgPSB0ZW1wUGFyZW50KS5hcHBlbmRDaGlsZChlbGVtZW50KVxuICAgIG1hdGNoID0gfnplcHRvLnFzYShwYXJlbnQsIHNlbGVjdG9yKS5pbmRleE9mKGVsZW1lbnQpXG4gICAgdGVtcCAmJiB0ZW1wUGFyZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gICAgcmV0dXJuIG1hdGNoXG4gIH1cblxuICBmdW5jdGlvbiB0eXBlKG9iaikge1xuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IFN0cmluZyhvYmopIDpcbiAgICAgIGNsYXNzMnR5cGVbdG9TdHJpbmcuY2FsbChvYmopXSB8fCBcIm9iamVjdFwiXG4gIH1cblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB0eXBlKHZhbHVlKSA9PSBcImZ1bmN0aW9uXCIgfVxuICBmdW5jdGlvbiBpc1dpbmRvdyhvYmopICAgICB7IHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT0gb2JqLndpbmRvdyB9XG4gIGZ1bmN0aW9uIGlzRG9jdW1lbnQob2JqKSAgIHsgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iai5ub2RlVHlwZSA9PSBvYmouRE9DVU1FTlRfTk9ERSB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikgICAgIHsgcmV0dXJuIHR5cGUob2JqKSA9PSBcIm9iamVjdFwiIH1cbiAgZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgICByZXR1cm4gaXNPYmplY3Qob2JqKSAmJiAhaXNXaW5kb3cob2JqKSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PSBPYmplY3QucHJvdG90eXBlXG4gIH1cblxuICBmdW5jdGlvbiBsaWtlQXJyYXkob2JqKSB7XG4gICAgdmFyIGxlbmd0aCA9ICEhb2JqICYmICdsZW5ndGgnIGluIG9iaiAmJiBvYmoubGVuZ3RoLFxuICAgICAgdHlwZSA9ICQudHlwZShvYmopXG5cbiAgICByZXR1cm4gJ2Z1bmN0aW9uJyAhPSB0eXBlICYmICFpc1dpbmRvdyhvYmopICYmIChcbiAgICAgICdhcnJheScgPT0gdHlwZSB8fCBsZW5ndGggPT09IDAgfHxcbiAgICAgICAgKHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicgJiYgbGVuZ3RoID4gMCAmJiAobGVuZ3RoIC0gMSkgaW4gb2JqKVxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBhY3QoYXJyYXkpIHsgcmV0dXJuIGZpbHRlci5jYWxsKGFycmF5LCBmdW5jdGlvbihpdGVtKXsgcmV0dXJuIGl0ZW0gIT0gbnVsbCB9KSB9XG4gIGZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXkpIHsgcmV0dXJuIGFycmF5Lmxlbmd0aCA+IDAgPyAkLmZuLmNvbmNhdC5hcHBseShbXSwgYXJyYXkpIDogYXJyYXkgfVxuICBjYW1lbGl6ZSA9IGZ1bmN0aW9uKHN0cil7IHJldHVybiBzdHIucmVwbGFjZSgvLSsoLik/L2csIGZ1bmN0aW9uKG1hdGNoLCBjaHIpeyByZXR1cm4gY2hyID8gY2hyLnRvVXBwZXJDYXNlKCkgOiAnJyB9KSB9XG4gIGZ1bmN0aW9uIGRhc2hlcml6ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLzo6L2csICcvJylcbiAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSspKFtBLVpdW2Etel0pL2csICckMV8kMicpXG4gICAgICAgICAgIC5yZXBsYWNlKC8oW2EtelxcZF0pKFtBLVpdKS9nLCAnJDFfJDInKVxuICAgICAgICAgICAucmVwbGFjZSgvXy9nLCAnLScpXG4gICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gIH1cbiAgdW5pcSA9IGZ1bmN0aW9uKGFycmF5KXsgcmV0dXJuIGZpbHRlci5jYWxsKGFycmF5LCBmdW5jdGlvbihpdGVtLCBpZHgpeyByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKSA9PSBpZHggfSkgfVxuXG4gIGZ1bmN0aW9uIGNsYXNzUkUobmFtZSkge1xuICAgIHJldHVybiBuYW1lIGluIGNsYXNzQ2FjaGUgP1xuICAgICAgY2xhc3NDYWNoZVtuYW1lXSA6IChjbGFzc0NhY2hlW25hbWVdID0gbmV3IFJlZ0V4cCgnKF58XFxcXHMpJyArIG5hbWUgKyAnKFxcXFxzfCQpJykpXG4gIH1cblxuICBmdW5jdGlvbiBtYXliZUFkZFB4KG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT0gXCJudW1iZXJcIiAmJiAhY3NzTnVtYmVyW2Rhc2hlcml6ZShuYW1lKV0pID8gdmFsdWUgKyBcInB4XCIgOiB2YWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdERpc3BsYXkobm9kZU5hbWUpIHtcbiAgICB2YXIgZWxlbWVudCwgZGlzcGxheVxuICAgIGlmICghZWxlbWVudERpc3BsYXlbbm9kZU5hbWVdKSB7XG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlTmFtZSlcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudClcbiAgICAgIGRpc3BsYXkgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsICcnKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKVxuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gICAgICBkaXNwbGF5ID09IFwibm9uZVwiICYmIChkaXNwbGF5ID0gXCJibG9ja1wiKVxuICAgICAgZWxlbWVudERpc3BsYXlbbm9kZU5hbWVdID0gZGlzcGxheVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudERpc3BsYXlbbm9kZU5hbWVdXG4gIH1cblxuICBmdW5jdGlvbiBjaGlsZHJlbihlbGVtZW50KSB7XG4gICAgcmV0dXJuICdjaGlsZHJlbicgaW4gZWxlbWVudCA/XG4gICAgICBzbGljZS5jYWxsKGVsZW1lbnQuY2hpbGRyZW4pIDpcbiAgICAgICQubWFwKGVsZW1lbnQuY2hpbGROb2RlcywgZnVuY3Rpb24obm9kZSl7IGlmIChub2RlLm5vZGVUeXBlID09IDEpIHJldHVybiBub2RlIH0pXG4gIH1cblxuICBmdW5jdGlvbiBaKGRvbSwgc2VsZWN0b3IpIHtcbiAgICB2YXIgaSwgbGVuID0gZG9tID8gZG9tLmxlbmd0aCA6IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHRoaXNbaV0gPSBkb21baV1cbiAgICB0aGlzLmxlbmd0aCA9IGxlblxuICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvciB8fCAnJ1xuICB9XG5cbiAgLy8gYCQuemVwdG8uZnJhZ21lbnRgIHRha2VzIGEgaHRtbCBzdHJpbmcgYW5kIGFuIG9wdGlvbmFsIHRhZyBuYW1lXG4gIC8vIHRvIGdlbmVyYXRlIERPTSBub2RlcyBmcm9tIHRoZSBnaXZlbiBodG1sIHN0cmluZy5cbiAgLy8gVGhlIGdlbmVyYXRlZCBET00gbm9kZXMgYXJlIHJldHVybmVkIGFzIGFuIGFycmF5LlxuICAvLyBUaGlzIGZ1bmN0aW9uIGNhbiBiZSBvdmVycmlkZGVuIGluIHBsdWdpbnMgZm9yIGV4YW1wbGUgdG8gbWFrZVxuICAvLyBpdCBjb21wYXRpYmxlIHdpdGggYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IHRoZSBET00gZnVsbHkuXG4gIHplcHRvLmZyYWdtZW50ID0gZnVuY3Rpb24oaHRtbCwgbmFtZSwgcHJvcGVydGllcykge1xuICAgIHZhciBkb20sIG5vZGVzLCBjb250YWluZXJcblxuICAgIC8vIEEgc3BlY2lhbCBjYXNlIG9wdGltaXphdGlvbiBmb3IgYSBzaW5nbGUgdGFnXG4gICAgaWYgKHNpbmdsZVRhZ1JFLnRlc3QoaHRtbCkpIGRvbSA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChSZWdFeHAuJDEpKVxuXG4gICAgaWYgKCFkb20pIHtcbiAgICAgIGlmIChodG1sLnJlcGxhY2UpIGh0bWwgPSBodG1sLnJlcGxhY2UodGFnRXhwYW5kZXJSRSwgXCI8JDE+PC8kMj5cIilcbiAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIG5hbWUgPSBmcmFnbWVudFJFLnRlc3QoaHRtbCkgJiYgUmVnRXhwLiQxXG4gICAgICBpZiAoIShuYW1lIGluIGNvbnRhaW5lcnMpKSBuYW1lID0gJyonXG5cbiAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lcnNbbmFtZV1cbiAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJyArIGh0bWxcbiAgICAgIGRvbSA9ICQuZWFjaChzbGljZS5jYWxsKGNvbnRhaW5lci5jaGlsZE5vZGVzKSwgZnVuY3Rpb24oKXtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChpc1BsYWluT2JqZWN0KHByb3BlcnRpZXMpKSB7XG4gICAgICBub2RlcyA9ICQoZG9tKVxuICAgICAgJC5lYWNoKHByb3BlcnRpZXMsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG1ldGhvZEF0dHJpYnV0ZXMuaW5kZXhPZihrZXkpID4gLTEpIG5vZGVzW2tleV0odmFsdWUpXG4gICAgICAgIGVsc2Ugbm9kZXMuYXR0cihrZXksIHZhbHVlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gZG9tXG4gIH1cblxuICAvLyBgJC56ZXB0by5aYCBzd2FwcyBvdXQgdGhlIHByb3RvdHlwZSBvZiB0aGUgZ2l2ZW4gYGRvbWAgYXJyYXlcbiAgLy8gb2Ygbm9kZXMgd2l0aCBgJC5mbmAgYW5kIHRodXMgc3VwcGx5aW5nIGFsbCB0aGUgWmVwdG8gZnVuY3Rpb25zXG4gIC8vIHRvIHRoZSBhcnJheS4gVGhpcyBtZXRob2QgY2FuIGJlIG92ZXJyaWRkZW4gaW4gcGx1Z2lucy5cbiAgemVwdG8uWiA9IGZ1bmN0aW9uKGRvbSwgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IFooZG9tLCBzZWxlY3RvcilcbiAgfVxuXG4gIC8vIGAkLnplcHRvLmlzWmAgc2hvdWxkIHJldHVybiBgdHJ1ZWAgaWYgdGhlIGdpdmVuIG9iamVjdCBpcyBhIFplcHRvXG4gIC8vIGNvbGxlY3Rpb24uIFRoaXMgbWV0aG9kIGNhbiBiZSBvdmVycmlkZGVuIGluIHBsdWdpbnMuXG4gIHplcHRvLmlzWiA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiB6ZXB0by5aXG4gIH1cblxuICAvLyBgJC56ZXB0by5pbml0YCBpcyBaZXB0bydzIGNvdW50ZXJwYXJ0IHRvIGpRdWVyeSdzIGAkLmZuLmluaXRgIGFuZFxuICAvLyB0YWtlcyBhIENTUyBzZWxlY3RvciBhbmQgYW4gb3B0aW9uYWwgY29udGV4dCAoYW5kIGhhbmRsZXMgdmFyaW91c1xuICAvLyBzcGVjaWFsIGNhc2VzKS5cbiAgLy8gVGhpcyBtZXRob2QgY2FuIGJlIG92ZXJyaWRkZW4gaW4gcGx1Z2lucy5cbiAgemVwdG8uaW5pdCA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgdmFyIGRvbVxuICAgIC8vIElmIG5vdGhpbmcgZ2l2ZW4sIHJldHVybiBhbiBlbXB0eSBaZXB0byBjb2xsZWN0aW9uXG4gICAgaWYgKCFzZWxlY3RvcikgcmV0dXJuIHplcHRvLlooKVxuICAgIC8vIE9wdGltaXplIGZvciBzdHJpbmcgc2VsZWN0b3JzXG4gICAgZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09ICdzdHJpbmcnKSB7XG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnRyaW0oKVxuICAgICAgLy8gSWYgaXQncyBhIGh0bWwgZnJhZ21lbnQsIGNyZWF0ZSBub2RlcyBmcm9tIGl0XG4gICAgICAvLyBOb3RlOiBJbiBib3RoIENocm9tZSAyMSBhbmQgRmlyZWZveCAxNSwgRE9NIGVycm9yIDEyXG4gICAgICAvLyBpcyB0aHJvd24gaWYgdGhlIGZyYWdtZW50IGRvZXNuJ3QgYmVnaW4gd2l0aCA8XG4gICAgICBpZiAoc2VsZWN0b3JbMF0gPT0gJzwnICYmIGZyYWdtZW50UkUudGVzdChzZWxlY3RvcikpXG4gICAgICAgIGRvbSA9IHplcHRvLmZyYWdtZW50KHNlbGVjdG9yLCBSZWdFeHAuJDEsIGNvbnRleHQpLCBzZWxlY3RvciA9IG51bGxcbiAgICAgIC8vIElmIHRoZXJlJ3MgYSBjb250ZXh0LCBjcmVhdGUgYSBjb2xsZWN0aW9uIG9uIHRoYXQgY29udGV4dCBmaXJzdCwgYW5kIHNlbGVjdFxuICAgICAgLy8gbm9kZXMgZnJvbSB0aGVyZVxuICAgICAgZWxzZSBpZiAoY29udGV4dCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gJChjb250ZXh0KS5maW5kKHNlbGVjdG9yKVxuICAgICAgLy8gSWYgaXQncyBhIENTUyBzZWxlY3RvciwgdXNlIGl0IHRvIHNlbGVjdCBub2Rlcy5cbiAgICAgIGVsc2UgZG9tID0gemVwdG8ucXNhKGRvY3VtZW50LCBzZWxlY3RvcilcbiAgICB9XG4gICAgLy8gSWYgYSBmdW5jdGlvbiBpcyBnaXZlbiwgY2FsbCBpdCB3aGVuIHRoZSBET00gaXMgcmVhZHlcbiAgICBlbHNlIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSkgcmV0dXJuICQoZG9jdW1lbnQpLnJlYWR5KHNlbGVjdG9yKVxuICAgIC8vIElmIGEgWmVwdG8gY29sbGVjdGlvbiBpcyBnaXZlbiwganVzdCByZXR1cm4gaXRcbiAgICBlbHNlIGlmICh6ZXB0by5pc1ooc2VsZWN0b3IpKSByZXR1cm4gc2VsZWN0b3JcbiAgICBlbHNlIHtcbiAgICAgIC8vIG5vcm1hbGl6ZSBhcnJheSBpZiBhbiBhcnJheSBvZiBub2RlcyBpcyBnaXZlblxuICAgICAgaWYgKGlzQXJyYXkoc2VsZWN0b3IpKSBkb20gPSBjb21wYWN0KHNlbGVjdG9yKVxuICAgICAgLy8gV3JhcCBET00gbm9kZXMuXG4gICAgICBlbHNlIGlmIChpc09iamVjdChzZWxlY3RvcikpXG4gICAgICAgIGRvbSA9IFtzZWxlY3Rvcl0sIHNlbGVjdG9yID0gbnVsbFxuICAgICAgLy8gSWYgaXQncyBhIGh0bWwgZnJhZ21lbnQsIGNyZWF0ZSBub2RlcyBmcm9tIGl0XG4gICAgICBlbHNlIGlmIChmcmFnbWVudFJFLnRlc3Qoc2VsZWN0b3IpKVxuICAgICAgICBkb20gPSB6ZXB0by5mcmFnbWVudChzZWxlY3Rvci50cmltKCksIFJlZ0V4cC4kMSwgY29udGV4dCksIHNlbGVjdG9yID0gbnVsbFxuICAgICAgLy8gSWYgdGhlcmUncyBhIGNvbnRleHQsIGNyZWF0ZSBhIGNvbGxlY3Rpb24gb24gdGhhdCBjb250ZXh0IGZpcnN0LCBhbmQgc2VsZWN0XG4gICAgICAvLyBub2RlcyBmcm9tIHRoZXJlXG4gICAgICBlbHNlIGlmIChjb250ZXh0ICE9PSB1bmRlZmluZWQpIHJldHVybiAkKGNvbnRleHQpLmZpbmQoc2VsZWN0b3IpXG4gICAgICAvLyBBbmQgbGFzdCBidXQgbm8gbGVhc3QsIGlmIGl0J3MgYSBDU1Mgc2VsZWN0b3IsIHVzZSBpdCB0byBzZWxlY3Qgbm9kZXMuXG4gICAgICBlbHNlIGRvbSA9IHplcHRvLnFzYShkb2N1bWVudCwgc2VsZWN0b3IpXG4gICAgfVxuICAgIC8vIGNyZWF0ZSBhIG5ldyBaZXB0byBjb2xsZWN0aW9uIGZyb20gdGhlIG5vZGVzIGZvdW5kXG4gICAgcmV0dXJuIHplcHRvLlooZG9tLCBzZWxlY3RvcilcbiAgfVxuXG4gIC8vIGAkYCB3aWxsIGJlIHRoZSBiYXNlIGBaZXB0b2Agb2JqZWN0LiBXaGVuIGNhbGxpbmcgdGhpc1xuICAvLyBmdW5jdGlvbiBqdXN0IGNhbGwgYCQuemVwdG8uaW5pdCwgd2hpY2ggbWFrZXMgdGhlIGltcGxlbWVudGF0aW9uXG4gIC8vIGRldGFpbHMgb2Ygc2VsZWN0aW5nIG5vZGVzIGFuZCBjcmVhdGluZyBaZXB0byBjb2xsZWN0aW9uc1xuICAvLyBwYXRjaGFibGUgaW4gcGx1Z2lucy5cbiAgJCA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb250ZXh0KXtcbiAgICByZXR1cm4gemVwdG8uaW5pdChzZWxlY3RvciwgY29udGV4dClcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQsIHNvdXJjZSwgZGVlcCkge1xuICAgIGZvciAoa2V5IGluIHNvdXJjZSlcbiAgICAgIGlmIChkZWVwICYmIChpc1BsYWluT2JqZWN0KHNvdXJjZVtrZXldKSB8fCBpc0FycmF5KHNvdXJjZVtrZXldKSkpIHtcbiAgICAgICAgaWYgKGlzUGxhaW5PYmplY3Qoc291cmNlW2tleV0pICYmICFpc1BsYWluT2JqZWN0KHRhcmdldFtrZXldKSlcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHt9XG4gICAgICAgIGlmIChpc0FycmF5KHNvdXJjZVtrZXldKSAmJiAhaXNBcnJheSh0YXJnZXRba2V5XSkpXG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBbXVxuICAgICAgICBleHRlbmQodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldLCBkZWVwKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc291cmNlW2tleV0gIT09IHVuZGVmaW5lZCkgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICB9XG5cbiAgLy8gQ29weSBhbGwgYnV0IHVuZGVmaW5lZCBwcm9wZXJ0aWVzIGZyb20gb25lIG9yIG1vcmVcbiAgLy8gb2JqZWN0cyB0byB0aGUgYHRhcmdldGAgb2JqZWN0LlxuICAkLmV4dGVuZCA9IGZ1bmN0aW9uKHRhcmdldCl7XG4gICAgdmFyIGRlZXAsIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PSAnYm9vbGVhbicpIHtcbiAgICAgIGRlZXAgPSB0YXJnZXRcbiAgICAgIHRhcmdldCA9IGFyZ3Muc2hpZnQoKVxuICAgIH1cbiAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24oYXJnKXsgZXh0ZW5kKHRhcmdldCwgYXJnLCBkZWVwKSB9KVxuICAgIHJldHVybiB0YXJnZXRcbiAgfVxuXG4gIC8vIGAkLnplcHRvLnFzYWAgaXMgWmVwdG8ncyBDU1Mgc2VsZWN0b3IgaW1wbGVtZW50YXRpb24gd2hpY2hcbiAgLy8gdXNlcyBgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbGAgYW5kIG9wdGltaXplcyBmb3Igc29tZSBzcGVjaWFsIGNhc2VzLCBsaWtlIGAjaWRgLlxuICAvLyBUaGlzIG1ldGhvZCBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBwbHVnaW5zLlxuICB6ZXB0by5xc2EgPSBmdW5jdGlvbihlbGVtZW50LCBzZWxlY3Rvcil7XG4gICAgdmFyIGZvdW5kLFxuICAgICAgICBtYXliZUlEID0gc2VsZWN0b3JbMF0gPT0gJyMnLFxuICAgICAgICBtYXliZUNsYXNzID0gIW1heWJlSUQgJiYgc2VsZWN0b3JbMF0gPT0gJy4nLFxuICAgICAgICBuYW1lT25seSA9IG1heWJlSUQgfHwgbWF5YmVDbGFzcyA/IHNlbGVjdG9yLnNsaWNlKDEpIDogc2VsZWN0b3IsIC8vIEVuc3VyZSB0aGF0IGEgMSBjaGFyIHRhZyBuYW1lIHN0aWxsIGdldHMgY2hlY2tlZFxuICAgICAgICBpc1NpbXBsZSA9IHNpbXBsZVNlbGVjdG9yUkUudGVzdChuYW1lT25seSlcbiAgICByZXR1cm4gKGVsZW1lbnQuZ2V0RWxlbWVudEJ5SWQgJiYgaXNTaW1wbGUgJiYgbWF5YmVJRCkgPyAvLyBTYWZhcmkgRG9jdW1lbnRGcmFnbWVudCBkb2Vzbid0IGhhdmUgZ2V0RWxlbWVudEJ5SWRcbiAgICAgICggKGZvdW5kID0gZWxlbWVudC5nZXRFbGVtZW50QnlJZChuYW1lT25seSkpID8gW2ZvdW5kXSA6IFtdICkgOlxuICAgICAgKGVsZW1lbnQubm9kZVR5cGUgIT09IDEgJiYgZWxlbWVudC5ub2RlVHlwZSAhPT0gOSAmJiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxMSkgPyBbXSA6XG4gICAgICBzbGljZS5jYWxsKFxuICAgICAgICBpc1NpbXBsZSAmJiAhbWF5YmVJRCAmJiBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPyAvLyBEb2N1bWVudEZyYWdtZW50IGRvZXNuJ3QgaGF2ZSBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lL1RhZ05hbWVcbiAgICAgICAgICBtYXliZUNsYXNzID8gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG5hbWVPbmx5KSA6IC8vIElmIGl0J3Mgc2ltcGxlLCBpdCBjb3VsZCBiZSBhIGNsYXNzXG4gICAgICAgICAgZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgOiAvLyBPciBhIHRhZ1xuICAgICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikgLy8gT3IgaXQncyBub3Qgc2ltcGxlLCBhbmQgd2UgbmVlZCB0byBxdWVyeSBhbGxcbiAgICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlcmVkKG5vZGVzLCBzZWxlY3Rvcikge1xuICAgIHJldHVybiBzZWxlY3RvciA9PSBudWxsID8gJChub2RlcykgOiAkKG5vZGVzKS5maWx0ZXIoc2VsZWN0b3IpXG4gIH1cblxuICAkLmNvbnRhaW5zID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zID9cbiAgICBmdW5jdGlvbihwYXJlbnQsIG5vZGUpIHtcbiAgICAgIHJldHVybiBwYXJlbnQgIT09IG5vZGUgJiYgcGFyZW50LmNvbnRhaW5zKG5vZGUpXG4gICAgfSA6XG4gICAgZnVuY3Rpb24ocGFyZW50LCBub2RlKSB7XG4gICAgICB3aGlsZSAobm9kZSAmJiAobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpXG4gICAgICAgIGlmIChub2RlID09PSBwYXJlbnQpIHJldHVybiB0cnVlXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgZnVuY3Rpb24gZnVuY0FyZyhjb250ZXh0LCBhcmcsIGlkeCwgcGF5bG9hZCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKGFyZykgPyBhcmcuY2FsbChjb250ZXh0LCBpZHgsIHBheWxvYWQpIDogYXJnXG4gIH1cblxuICBmdW5jdGlvbiBzZXRBdHRyaWJ1dGUobm9kZSwgbmFtZSwgdmFsdWUpIHtcbiAgICB2YWx1ZSA9PSBudWxsID8gbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSkgOiBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSlcbiAgfVxuXG4gIC8vIGFjY2VzcyBjbGFzc05hbWUgcHJvcGVydHkgd2hpbGUgcmVzcGVjdGluZyBTVkdBbmltYXRlZFN0cmluZ1xuICBmdW5jdGlvbiBjbGFzc05hbWUobm9kZSwgdmFsdWUpe1xuICAgIHZhciBrbGFzcyA9IG5vZGUuY2xhc3NOYW1lIHx8ICcnLFxuICAgICAgICBzdmcgICA9IGtsYXNzICYmIGtsYXNzLmJhc2VWYWwgIT09IHVuZGVmaW5lZFxuXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBzdmcgPyBrbGFzcy5iYXNlVmFsIDoga2xhc3NcbiAgICBzdmcgPyAoa2xhc3MuYmFzZVZhbCA9IHZhbHVlKSA6IChub2RlLmNsYXNzTmFtZSA9IHZhbHVlKVxuICB9XG5cbiAgLy8gXCJ0cnVlXCIgID0+IHRydWVcbiAgLy8gXCJmYWxzZVwiID0+IGZhbHNlXG4gIC8vIFwibnVsbFwiICA9PiBudWxsXG4gIC8vIFwiNDJcIiAgICA9PiA0MlxuICAvLyBcIjQyLjVcIiAgPT4gNDIuNVxuICAvLyBcIjA4XCIgICAgPT4gXCIwOFwiXG4gIC8vIEpTT04gICAgPT4gcGFyc2UgaWYgdmFsaWRcbiAgLy8gU3RyaW5nICA9PiBzZWxmXG4gIGZ1bmN0aW9uIGRlc2VyaWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHZhbHVlID9cbiAgICAgICAgdmFsdWUgPT0gXCJ0cnVlXCIgfHxcbiAgICAgICAgKCB2YWx1ZSA9PSBcImZhbHNlXCIgPyBmYWxzZSA6XG4gICAgICAgICAgdmFsdWUgPT0gXCJudWxsXCIgPyBudWxsIDpcbiAgICAgICAgICArdmFsdWUgKyBcIlwiID09IHZhbHVlID8gK3ZhbHVlIDpcbiAgICAgICAgICAvXltcXFtcXHtdLy50ZXN0KHZhbHVlKSA/ICQucGFyc2VKU09OKHZhbHVlKSA6XG4gICAgICAgICAgdmFsdWUgKVxuICAgICAgICA6IHZhbHVlXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gIH1cblxuICAkLnR5cGUgPSB0eXBlXG4gICQuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb25cbiAgJC5pc1dpbmRvdyA9IGlzV2luZG93XG4gICQuaXNBcnJheSA9IGlzQXJyYXlcbiAgJC5pc1BsYWluT2JqZWN0ID0gaXNQbGFpbk9iamVjdFxuXG4gICQuaXNFbXB0eU9iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBuYW1lXG4gICAgZm9yIChuYW1lIGluIG9iaikgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gICQuaXNOdW1lcmljID0gZnVuY3Rpb24odmFsKSB7XG4gICAgdmFyIG51bSA9IE51bWJlcih2YWwpLCB0eXBlID0gdHlwZW9mIHZhbFxuICAgIHJldHVybiB2YWwgIT0gbnVsbCAmJiB0eXBlICE9ICdib29sZWFuJyAmJlxuICAgICAgKHR5cGUgIT0gJ3N0cmluZycgfHwgdmFsLmxlbmd0aCkgJiZcbiAgICAgICFpc05hTihudW0pICYmIGlzRmluaXRlKG51bSkgfHwgZmFsc2VcbiAgfVxuXG4gICQuaW5BcnJheSA9IGZ1bmN0aW9uKGVsZW0sIGFycmF5LCBpKXtcbiAgICByZXR1cm4gZW1wdHlBcnJheS5pbmRleE9mLmNhbGwoYXJyYXksIGVsZW0sIGkpXG4gIH1cblxuICAkLmNhbWVsQ2FzZSA9IGNhbWVsaXplXG4gICQudHJpbSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIgPT0gbnVsbCA/IFwiXCIgOiBTdHJpbmcucHJvdG90eXBlLnRyaW0uY2FsbChzdHIpXG4gIH1cblxuICAvLyBwbHVnaW4gY29tcGF0aWJpbGl0eVxuICAkLnV1aWQgPSAwXG4gICQuc3VwcG9ydCA9IHsgfVxuICAkLmV4cHIgPSB7IH1cbiAgJC5ub29wID0gZnVuY3Rpb24oKSB7fVxuXG4gICQubWFwID0gZnVuY3Rpb24oZWxlbWVudHMsIGNhbGxiYWNrKXtcbiAgICB2YXIgdmFsdWUsIHZhbHVlcyA9IFtdLCBpLCBrZXlcbiAgICBpZiAobGlrZUFycmF5KGVsZW1lbnRzKSlcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrKGVsZW1lbnRzW2ldLCBpKVxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkgdmFsdWVzLnB1c2godmFsdWUpXG4gICAgICB9XG4gICAgZWxzZVxuICAgICAgZm9yIChrZXkgaW4gZWxlbWVudHMpIHtcbiAgICAgICAgdmFsdWUgPSBjYWxsYmFjayhlbGVtZW50c1trZXldLCBrZXkpXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB2YWx1ZXMucHVzaCh2YWx1ZSlcbiAgICAgIH1cbiAgICByZXR1cm4gZmxhdHRlbih2YWx1ZXMpXG4gIH1cblxuICAkLmVhY2ggPSBmdW5jdGlvbihlbGVtZW50cywgY2FsbGJhY2spe1xuICAgIHZhciBpLCBrZXlcbiAgICBpZiAobGlrZUFycmF5KGVsZW1lbnRzKSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgICBpZiAoY2FsbGJhY2suY2FsbChlbGVtZW50c1tpXSwgaSwgZWxlbWVudHNbaV0pID09PSBmYWxzZSkgcmV0dXJuIGVsZW1lbnRzXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoa2V5IGluIGVsZW1lbnRzKVxuICAgICAgICBpZiAoY2FsbGJhY2suY2FsbChlbGVtZW50c1trZXldLCBrZXksIGVsZW1lbnRzW2tleV0pID09PSBmYWxzZSkgcmV0dXJuIGVsZW1lbnRzXG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRzXG4gIH1cblxuICAkLmdyZXAgPSBmdW5jdGlvbihlbGVtZW50cywgY2FsbGJhY2spe1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbChlbGVtZW50cywgY2FsbGJhY2spXG4gIH1cblxuICBpZiAod2luZG93LkpTT04pICQucGFyc2VKU09OID0gSlNPTi5wYXJzZVxuXG4gIC8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxuICAkLmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbihpLCBuYW1lKSB7XG4gICAgY2xhc3MydHlwZVsgXCJbb2JqZWN0IFwiICsgbmFtZSArIFwiXVwiIF0gPSBuYW1lLnRvTG93ZXJDYXNlKClcbiAgfSlcblxuICAvLyBEZWZpbmUgbWV0aG9kcyB0aGF0IHdpbGwgYmUgYXZhaWxhYmxlIG9uIGFsbFxuICAvLyBaZXB0byBjb2xsZWN0aW9uc1xuICAkLmZuID0ge1xuICAgIGNvbnN0cnVjdG9yOiB6ZXB0by5aLFxuICAgIGxlbmd0aDogMCxcblxuICAgIC8vIEJlY2F1c2UgYSBjb2xsZWN0aW9uIGFjdHMgbGlrZSBhbiBhcnJheVxuICAgIC8vIGNvcHkgb3ZlciB0aGVzZSB1c2VmdWwgYXJyYXkgZnVuY3Rpb25zLlxuICAgIGZvckVhY2g6IGVtcHR5QXJyYXkuZm9yRWFjaCxcbiAgICByZWR1Y2U6IGVtcHR5QXJyYXkucmVkdWNlLFxuICAgIHB1c2g6IGVtcHR5QXJyYXkucHVzaCxcbiAgICBzb3J0OiBlbXB0eUFycmF5LnNvcnQsXG4gICAgc3BsaWNlOiBlbXB0eUFycmF5LnNwbGljZSxcbiAgICBpbmRleE9mOiBlbXB0eUFycmF5LmluZGV4T2YsXG4gICAgY29uY2F0OiBmdW5jdGlvbigpe1xuICAgICAgdmFyIGksIHZhbHVlLCBhcmdzID0gW11cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBhcmd1bWVudHNbaV1cbiAgICAgICAgYXJnc1tpXSA9IHplcHRvLmlzWih2YWx1ZSkgPyB2YWx1ZS50b0FycmF5KCkgOiB2YWx1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbmNhdC5hcHBseSh6ZXB0by5pc1oodGhpcykgPyB0aGlzLnRvQXJyYXkoKSA6IHRoaXMsIGFyZ3MpXG4gICAgfSxcblxuICAgIC8vIGBtYXBgIGFuZCBgc2xpY2VgIGluIHRoZSBqUXVlcnkgQVBJIHdvcmsgZGlmZmVyZW50bHlcbiAgICAvLyBmcm9tIHRoZWlyIGFycmF5IGNvdW50ZXJwYXJ0c1xuICAgIG1hcDogZnVuY3Rpb24oZm4pe1xuICAgICAgcmV0dXJuICQoJC5tYXAodGhpcywgZnVuY3Rpb24oZWwsIGkpeyByZXR1cm4gZm4uY2FsbChlbCwgaSwgZWwpIH0pKVxuICAgIH0sXG4gICAgc2xpY2U6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gJChzbGljZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKVxuICAgIH0sXG5cbiAgICByZWFkeTogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgLy8gbmVlZCB0byBjaGVjayBpZiBkb2N1bWVudC5ib2R5IGV4aXN0cyBmb3IgSUUgYXMgdGhhdCBicm93c2VyIHJlcG9ydHNcbiAgICAgIC8vIGRvY3VtZW50IHJlYWR5IHdoZW4gaXQgaGFzbid0IHlldCBjcmVhdGVkIHRoZSBib2R5IGVsZW1lbnRcbiAgICAgIGlmIChyZWFkeVJFLnRlc3QoZG9jdW1lbnQucmVhZHlTdGF0ZSkgJiYgZG9jdW1lbnQuYm9keSkgY2FsbGJhY2soJClcbiAgICAgIGVsc2UgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCl7IGNhbGxiYWNrKCQpIH0sIGZhbHNlKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24oaWR4KXtcbiAgICAgIHJldHVybiBpZHggPT09IHVuZGVmaW5lZCA/IHNsaWNlLmNhbGwodGhpcykgOiB0aGlzW2lkeCA+PSAwID8gaWR4IDogaWR4ICsgdGhpcy5sZW5ndGhdXG4gICAgfSxcbiAgICB0b0FycmF5OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5nZXQoKSB9LFxuICAgIHNpemU6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5sZW5ndGhcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSAhPSBudWxsKVxuICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGVhY2g6IGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgIGVtcHR5QXJyYXkuZXZlcnkuY2FsbCh0aGlzLCBmdW5jdGlvbihlbCwgaWR4KXtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwoZWwsIGlkeCwgZWwpICE9PSBmYWxzZVxuICAgICAgfSlcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSkgcmV0dXJuIHRoaXMubm90KHRoaXMubm90KHNlbGVjdG9yKSlcbiAgICAgIHJldHVybiAkKGZpbHRlci5jYWxsKHRoaXMsIGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICByZXR1cm4gemVwdG8ubWF0Y2hlcyhlbGVtZW50LCBzZWxlY3RvcilcbiAgICAgIH0pKVxuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbihzZWxlY3Rvcixjb250ZXh0KXtcbiAgICAgIHJldHVybiAkKHVuaXEodGhpcy5jb25jYXQoJChzZWxlY3Rvcixjb250ZXh0KSkpKVxuICAgIH0sXG4gICAgaXM6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHJldHVybiB0aGlzLmxlbmd0aCA+IDAgJiYgemVwdG8ubWF0Y2hlcyh0aGlzWzBdLCBzZWxlY3RvcilcbiAgICB9LFxuICAgIG5vdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgdmFyIG5vZGVzPVtdXG4gICAgICBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikgJiYgc2VsZWN0b3IuY2FsbCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaWR4KXtcbiAgICAgICAgICBpZiAoIXNlbGVjdG9yLmNhbGwodGhpcyxpZHgpKSBub2Rlcy5wdXNoKHRoaXMpXG4gICAgICAgIH0pXG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGV4Y2x1ZGVzID0gdHlwZW9mIHNlbGVjdG9yID09ICdzdHJpbmcnID8gdGhpcy5maWx0ZXIoc2VsZWN0b3IpIDpcbiAgICAgICAgICAobGlrZUFycmF5KHNlbGVjdG9yKSAmJiBpc0Z1bmN0aW9uKHNlbGVjdG9yLml0ZW0pKSA/IHNsaWNlLmNhbGwoc2VsZWN0b3IpIDogJChzZWxlY3RvcilcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKGVsKXtcbiAgICAgICAgICBpZiAoZXhjbHVkZXMuaW5kZXhPZihlbCkgPCAwKSBub2Rlcy5wdXNoKGVsKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgcmV0dXJuICQobm9kZXMpXG4gICAgfSxcbiAgICBoYXM6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gaXNPYmplY3Qoc2VsZWN0b3IpID9cbiAgICAgICAgICAkLmNvbnRhaW5zKHRoaXMsIHNlbGVjdG9yKSA6XG4gICAgICAgICAgJCh0aGlzKS5maW5kKHNlbGVjdG9yKS5zaXplKClcbiAgICAgIH0pXG4gICAgfSxcbiAgICBlcTogZnVuY3Rpb24oaWR4KXtcbiAgICAgIHJldHVybiBpZHggPT09IC0xID8gdGhpcy5zbGljZShpZHgpIDogdGhpcy5zbGljZShpZHgsICsgaWR4ICsgMSlcbiAgICB9LFxuICAgIGZpcnN0OiBmdW5jdGlvbigpe1xuICAgICAgdmFyIGVsID0gdGhpc1swXVxuICAgICAgcmV0dXJuIGVsICYmICFpc09iamVjdChlbCkgPyBlbCA6ICQoZWwpXG4gICAgfSxcbiAgICBsYXN0OiBmdW5jdGlvbigpe1xuICAgICAgdmFyIGVsID0gdGhpc1t0aGlzLmxlbmd0aCAtIDFdXG4gICAgICByZXR1cm4gZWwgJiYgIWlzT2JqZWN0KGVsKSA/IGVsIDogJChlbClcbiAgICB9LFxuICAgIGZpbmQ6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHZhciByZXN1bHQsICR0aGlzID0gdGhpc1xuICAgICAgaWYgKCFzZWxlY3RvcikgcmVzdWx0ID0gJCgpXG4gICAgICBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT0gJ29iamVjdCcpXG4gICAgICAgIHJlc3VsdCA9ICQoc2VsZWN0b3IpLmZpbHRlcihmdW5jdGlvbigpe1xuICAgICAgICAgIHZhciBub2RlID0gdGhpc1xuICAgICAgICAgIHJldHVybiBlbXB0eUFycmF5LnNvbWUuY2FsbCgkdGhpcywgZnVuY3Rpb24ocGFyZW50KXtcbiAgICAgICAgICAgIHJldHVybiAkLmNvbnRhaW5zKHBhcmVudCwgbm9kZSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgZWxzZSBpZiAodGhpcy5sZW5ndGggPT0gMSkgcmVzdWx0ID0gJCh6ZXB0by5xc2EodGhpc1swXSwgc2VsZWN0b3IpKVxuICAgICAgZWxzZSByZXN1bHQgPSB0aGlzLm1hcChmdW5jdGlvbigpeyByZXR1cm4gemVwdG8ucXNhKHRoaXMsIHNlbGVjdG9yKSB9KVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG4gICAgY2xvc2VzdDogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbnRleHQpe1xuICAgICAgdmFyIG5vZGVzID0gW10sIGNvbGxlY3Rpb24gPSB0eXBlb2Ygc2VsZWN0b3IgPT0gJ29iamVjdCcgJiYgJChzZWxlY3RvcilcbiAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihfLCBub2RlKXtcbiAgICAgICAgd2hpbGUgKG5vZGUgJiYgIShjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5pbmRleE9mKG5vZGUpID49IDAgOiB6ZXB0by5tYXRjaGVzKG5vZGUsIHNlbGVjdG9yKSkpXG4gICAgICAgICAgbm9kZSA9IG5vZGUgIT09IGNvbnRleHQgJiYgIWlzRG9jdW1lbnQobm9kZSkgJiYgbm9kZS5wYXJlbnROb2RlXG4gICAgICAgIGlmIChub2RlICYmIG5vZGVzLmluZGV4T2Yobm9kZSkgPCAwKSBub2Rlcy5wdXNoKG5vZGUpXG4gICAgICB9KVxuICAgICAgcmV0dXJuICQobm9kZXMpXG4gICAgfSxcbiAgICBwYXJlbnRzOiBmdW5jdGlvbihzZWxlY3Rvcil7XG4gICAgICB2YXIgYW5jZXN0b3JzID0gW10sIG5vZGVzID0gdGhpc1xuICAgICAgd2hpbGUgKG5vZGVzLmxlbmd0aCA+IDApXG4gICAgICAgIG5vZGVzID0gJC5tYXAobm9kZXMsIGZ1bmN0aW9uKG5vZGUpe1xuICAgICAgICAgIGlmICgobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkgJiYgIWlzRG9jdW1lbnQobm9kZSkgJiYgYW5jZXN0b3JzLmluZGV4T2Yobm9kZSkgPCAwKSB7XG4gICAgICAgICAgICBhbmNlc3RvcnMucHVzaChub2RlKVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICByZXR1cm4gZmlsdGVyZWQoYW5jZXN0b3JzLCBzZWxlY3RvcilcbiAgICB9LFxuICAgIHBhcmVudDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgcmV0dXJuIGZpbHRlcmVkKHVuaXEodGhpcy5wbHVjaygncGFyZW50Tm9kZScpKSwgc2VsZWN0b3IpXG4gICAgfSxcbiAgICBjaGlsZHJlbjogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgcmV0dXJuIGZpbHRlcmVkKHRoaXMubWFwKGZ1bmN0aW9uKCl7IHJldHVybiBjaGlsZHJlbih0aGlzKSB9KSwgc2VsZWN0b3IpXG4gICAgfSxcbiAgICBjb250ZW50czogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmNvbnRlbnREb2N1bWVudCB8fCBzbGljZS5jYWxsKHRoaXMuY2hpbGROb2RlcykgfSlcbiAgICB9LFxuICAgIHNpYmxpbmdzOiBmdW5jdGlvbihzZWxlY3Rvcil7XG4gICAgICByZXR1cm4gZmlsdGVyZWQodGhpcy5tYXAoZnVuY3Rpb24oaSwgZWwpe1xuICAgICAgICByZXR1cm4gZmlsdGVyLmNhbGwoY2hpbGRyZW4oZWwucGFyZW50Tm9kZSksIGZ1bmN0aW9uKGNoaWxkKXsgcmV0dXJuIGNoaWxkIT09ZWwgfSlcbiAgICAgIH0pLCBzZWxlY3RvcilcbiAgICB9LFxuICAgIGVtcHR5OiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpeyB0aGlzLmlubmVySFRNTCA9ICcnIH0pXG4gICAgfSxcbiAgICAvLyBgcGx1Y2tgIGlzIGJvcnJvd2VkIGZyb20gUHJvdG90eXBlLmpzXG4gICAgcGx1Y2s6IGZ1bmN0aW9uKHByb3BlcnR5KXtcbiAgICAgIHJldHVybiAkLm1hcCh0aGlzLCBmdW5jdGlvbihlbCl7IHJldHVybiBlbFtwcm9wZXJ0eV0gfSlcbiAgICB9LFxuICAgIHNob3c6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIiAmJiAodGhpcy5zdHlsZS5kaXNwbGF5ID0gJycpXG4gICAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKHRoaXMsICcnKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKSA9PSBcIm5vbmVcIilcbiAgICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSBkZWZhdWx0RGlzcGxheSh0aGlzLm5vZGVOYW1lKVxuICAgICAgfSlcbiAgICB9LFxuICAgIHJlcGxhY2VXaXRoOiBmdW5jdGlvbihuZXdDb250ZW50KXtcbiAgICAgIHJldHVybiB0aGlzLmJlZm9yZShuZXdDb250ZW50KS5yZW1vdmUoKVxuICAgIH0sXG4gICAgd3JhcDogZnVuY3Rpb24oc3RydWN0dXJlKXtcbiAgICAgIHZhciBmdW5jID0gaXNGdW5jdGlvbihzdHJ1Y3R1cmUpXG4gICAgICBpZiAodGhpc1swXSAmJiAhZnVuYylcbiAgICAgICAgdmFyIGRvbSAgID0gJChzdHJ1Y3R1cmUpLmdldCgwKSxcbiAgICAgICAgICAgIGNsb25lID0gZG9tLnBhcmVudE5vZGUgfHwgdGhpcy5sZW5ndGggPiAxXG5cbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAkKHRoaXMpLndyYXBBbGwoXG4gICAgICAgICAgZnVuYyA/IHN0cnVjdHVyZS5jYWxsKHRoaXMsIGluZGV4KSA6XG4gICAgICAgICAgICBjbG9uZSA/IGRvbS5jbG9uZU5vZGUodHJ1ZSkgOiBkb21cbiAgICAgICAgKVxuICAgICAgfSlcbiAgICB9LFxuICAgIHdyYXBBbGw6IGZ1bmN0aW9uKHN0cnVjdHVyZSl7XG4gICAgICBpZiAodGhpc1swXSkge1xuICAgICAgICAkKHRoaXNbMF0pLmJlZm9yZShzdHJ1Y3R1cmUgPSAkKHN0cnVjdHVyZSkpXG4gICAgICAgIHZhciBjaGlsZHJlblxuICAgICAgICAvLyBkcmlsbCBkb3duIHRvIHRoZSBpbm1vc3QgZWxlbWVudFxuICAgICAgICB3aGlsZSAoKGNoaWxkcmVuID0gc3RydWN0dXJlLmNoaWxkcmVuKCkpLmxlbmd0aCkgc3RydWN0dXJlID0gY2hpbGRyZW4uZmlyc3QoKVxuICAgICAgICAkKHN0cnVjdHVyZSkuYXBwZW5kKHRoaXMpXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgd3JhcElubmVyOiBmdW5jdGlvbihzdHJ1Y3R1cmUpe1xuICAgICAgdmFyIGZ1bmMgPSBpc0Z1bmN0aW9uKHN0cnVjdHVyZSlcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyksIGNvbnRlbnRzID0gc2VsZi5jb250ZW50cygpLFxuICAgICAgICAgICAgZG9tICA9IGZ1bmMgPyBzdHJ1Y3R1cmUuY2FsbCh0aGlzLCBpbmRleCkgOiBzdHJ1Y3R1cmVcbiAgICAgICAgY29udGVudHMubGVuZ3RoID8gY29udGVudHMud3JhcEFsbChkb20pIDogc2VsZi5hcHBlbmQoZG9tKVxuICAgICAgfSlcbiAgICB9LFxuICAgIHVud3JhcDogZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMucGFyZW50KCkuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnJlcGxhY2VXaXRoKCQodGhpcykuY2hpbGRyZW4oKSlcbiAgICAgIH0pXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgY2xvbmU6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuY2xvbmVOb2RlKHRydWUpIH0pXG4gICAgfSxcbiAgICBoaWRlOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICB9LFxuICAgIHRvZ2dsZTogZnVuY3Rpb24oc2V0dGluZyl7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBlbCA9ICQodGhpcylcbiAgICAgICAgOyhzZXR0aW5nID09PSB1bmRlZmluZWQgPyBlbC5jc3MoXCJkaXNwbGF5XCIpID09IFwibm9uZVwiIDogc2V0dGluZykgPyBlbC5zaG93KCkgOiBlbC5oaWRlKClcbiAgICAgIH0pXG4gICAgfSxcbiAgICBwcmV2OiBmdW5jdGlvbihzZWxlY3Rvcil7IHJldHVybiAkKHRoaXMucGx1Y2soJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnKSkuZmlsdGVyKHNlbGVjdG9yIHx8ICcqJykgfSxcbiAgICBuZXh0OiBmdW5jdGlvbihzZWxlY3Rvcil7IHJldHVybiAkKHRoaXMucGx1Y2soJ25leHRFbGVtZW50U2libGluZycpKS5maWx0ZXIoc2VsZWN0b3IgfHwgJyonKSB9LFxuICAgIGh0bWw6IGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgcmV0dXJuIDAgaW4gYXJndW1lbnRzID9cbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgICAgdmFyIG9yaWdpbkh0bWwgPSB0aGlzLmlubmVySFRNTFxuICAgICAgICAgICQodGhpcykuZW1wdHkoKS5hcHBlbmQoIGZ1bmNBcmcodGhpcywgaHRtbCwgaWR4LCBvcmlnaW5IdG1sKSApXG4gICAgICAgIH0pIDpcbiAgICAgICAgKDAgaW4gdGhpcyA/IHRoaXNbMF0uaW5uZXJIVE1MIDogbnVsbClcbiAgICB9LFxuICAgIHRleHQ6IGZ1bmN0aW9uKHRleHQpe1xuICAgICAgcmV0dXJuIDAgaW4gYXJndW1lbnRzID9cbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgICAgdmFyIG5ld1RleHQgPSBmdW5jQXJnKHRoaXMsIHRleHQsIGlkeCwgdGhpcy50ZXh0Q29udGVudClcbiAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gbmV3VGV4dCA9PSBudWxsID8gJycgOiAnJytuZXdUZXh0XG4gICAgICAgIH0pIDpcbiAgICAgICAgKDAgaW4gdGhpcyA/IHRoaXMucGx1Y2soJ3RleHRDb250ZW50Jykuam9pbihcIlwiKSA6IG51bGwpXG4gICAgfSxcbiAgICBhdHRyOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSl7XG4gICAgICB2YXIgcmVzdWx0XG4gICAgICByZXR1cm4gKHR5cGVvZiBuYW1lID09ICdzdHJpbmcnICYmICEoMSBpbiBhcmd1bWVudHMpKSA/XG4gICAgICAgICgwIGluIHRoaXMgJiYgdGhpc1swXS5ub2RlVHlwZSA9PSAxICYmIChyZXN1bHQgPSB0aGlzWzBdLmdldEF0dHJpYnV0ZShuYW1lKSkgIT0gbnVsbCA/IHJlc3VsdCA6IHVuZGVmaW5lZCkgOlxuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaWR4KXtcbiAgICAgICAgICBpZiAodGhpcy5ub2RlVHlwZSAhPT0gMSkgcmV0dXJuXG4gICAgICAgICAgaWYgKGlzT2JqZWN0KG5hbWUpKSBmb3IgKGtleSBpbiBuYW1lKSBzZXRBdHRyaWJ1dGUodGhpcywga2V5LCBuYW1lW2tleV0pXG4gICAgICAgICAgZWxzZSBzZXRBdHRyaWJ1dGUodGhpcywgbmFtZSwgZnVuY0FyZyh0aGlzLCB2YWx1ZSwgaWR4LCB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKSkpXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICByZW1vdmVBdHRyOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXsgdGhpcy5ub2RlVHlwZSA9PT0gMSAmJiBuYW1lLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGUpe1xuICAgICAgICBzZXRBdHRyaWJ1dGUodGhpcywgYXR0cmlidXRlKVxuICAgICAgfSwgdGhpcyl9KVxuICAgIH0sXG4gICAgcHJvcDogZnVuY3Rpb24obmFtZSwgdmFsdWUpe1xuICAgICAgbmFtZSA9IHByb3BNYXBbbmFtZV0gfHwgbmFtZVxuICAgICAgcmV0dXJuICgxIGluIGFyZ3VtZW50cykgP1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaWR4KXtcbiAgICAgICAgICB0aGlzW25hbWVdID0gZnVuY0FyZyh0aGlzLCB2YWx1ZSwgaWR4LCB0aGlzW25hbWVdKVxuICAgICAgICB9KSA6XG4gICAgICAgICh0aGlzWzBdICYmIHRoaXNbMF1bbmFtZV0pXG4gICAgfSxcbiAgICByZW1vdmVQcm9wOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgIG5hbWUgPSBwcm9wTWFwW25hbWVdIHx8IG5hbWVcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXsgZGVsZXRlIHRoaXNbbmFtZV0gfSlcbiAgICB9LFxuICAgIGRhdGE6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKXtcbiAgICAgIHZhciBhdHRyTmFtZSA9ICdkYXRhLScgKyBuYW1lLnJlcGxhY2UoY2FwaXRhbFJFLCAnLSQxJykudG9Mb3dlckNhc2UoKVxuXG4gICAgICB2YXIgZGF0YSA9ICgxIGluIGFyZ3VtZW50cykgP1xuICAgICAgICB0aGlzLmF0dHIoYXR0ck5hbWUsIHZhbHVlKSA6XG4gICAgICAgIHRoaXMuYXR0cihhdHRyTmFtZSlcblxuICAgICAgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkZXNlcmlhbGl6ZVZhbHVlKGRhdGEpIDogdW5kZWZpbmVkXG4gICAgfSxcbiAgICB2YWw6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmICgwIGluIGFyZ3VtZW50cykge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSBcIlwiXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaWR4KXtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gZnVuY0FyZyh0aGlzLCB2YWx1ZSwgaWR4LCB0aGlzLnZhbHVlKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMF0gJiYgKHRoaXNbMF0ubXVsdGlwbGUgP1xuICAgICAgICAgICAkKHRoaXNbMF0pLmZpbmQoJ29wdGlvbicpLmZpbHRlcihmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5zZWxlY3RlZCB9KS5wbHVjaygndmFsdWUnKSA6XG4gICAgICAgICAgIHRoaXNbMF0udmFsdWUpXG4gICAgICB9XG4gICAgfSxcbiAgICBvZmZzZXQ6IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKXtcbiAgICAgIGlmIChjb29yZGluYXRlcykgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpbmRleCl7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICBjb29yZHMgPSBmdW5jQXJnKHRoaXMsIGNvb3JkaW5hdGVzLCBpbmRleCwgJHRoaXMub2Zmc2V0KCkpLFxuICAgICAgICAgICAgcGFyZW50T2Zmc2V0ID0gJHRoaXMub2Zmc2V0UGFyZW50KCkub2Zmc2V0KCksXG4gICAgICAgICAgICBwcm9wcyA9IHtcbiAgICAgICAgICAgICAgdG9wOiAgY29vcmRzLnRvcCAgLSBwYXJlbnRPZmZzZXQudG9wLFxuICAgICAgICAgICAgICBsZWZ0OiBjb29yZHMubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgaWYgKCR0aGlzLmNzcygncG9zaXRpb24nKSA9PSAnc3RhdGljJykgcHJvcHNbJ3Bvc2l0aW9uJ10gPSAncmVsYXRpdmUnXG4gICAgICAgICR0aGlzLmNzcyhwcm9wcylcbiAgICAgIH0pXG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm4gbnVsbFxuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAhPT0gdGhpc1swXSAmJiAhJC5jb250YWlucyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHRoaXNbMF0pKVxuICAgICAgICByZXR1cm4ge3RvcDogMCwgbGVmdDogMH1cbiAgICAgIHZhciBvYmogPSB0aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBvYmoubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgICAgdG9wOiBvYmoudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0LFxuICAgICAgICB3aWR0aDogTWF0aC5yb3VuZChvYmoud2lkdGgpLFxuICAgICAgICBoZWlnaHQ6IE1hdGgucm91bmQob2JqLmhlaWdodClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNzczogZnVuY3Rpb24ocHJvcGVydHksIHZhbHVlKXtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXNbMF1cbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmICghZWxlbWVudCkgcmV0dXJuXG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQuc3R5bGVbY2FtZWxpemUocHJvcGVydHkpXSB8fCBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsICcnKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkocHJvcGVydHkpKSB7XG4gICAgICAgICAgaWYgKCFlbGVtZW50KSByZXR1cm5cbiAgICAgICAgICB2YXIgcHJvcHMgPSB7fVxuICAgICAgICAgIHZhciBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCAnJylcbiAgICAgICAgICAkLmVhY2gocHJvcGVydHksIGZ1bmN0aW9uKF8sIHByb3Ape1xuICAgICAgICAgICAgcHJvcHNbcHJvcF0gPSAoZWxlbWVudC5zdHlsZVtjYW1lbGl6ZShwcm9wKV0gfHwgY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuIHByb3BzXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGNzcyA9ICcnXG4gICAgICBpZiAodHlwZShwcm9wZXJ0eSkgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMClcbiAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKXsgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShkYXNoZXJpemUocHJvcGVydHkpKSB9KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgY3NzID0gZGFzaGVyaXplKHByb3BlcnR5KSArIFwiOlwiICsgbWF5YmVBZGRQeChwcm9wZXJ0eSwgdmFsdWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGtleSBpbiBwcm9wZXJ0eSlcbiAgICAgICAgICBpZiAoIXByb3BlcnR5W2tleV0gJiYgcHJvcGVydHlba2V5XSAhPT0gMClcbiAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbigpeyB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KGRhc2hlcml6ZShrZXkpKSB9KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNzcyArPSBkYXNoZXJpemUoa2V5KSArICc6JyArIG1heWJlQWRkUHgoa2V5LCBwcm9wZXJ0eVtrZXldKSArICc7J1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7IHRoaXMuc3R5bGUuY3NzVGV4dCArPSAnOycgKyBjc3MgfSlcbiAgICB9LFxuICAgIGluZGV4OiBmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgIHJldHVybiBlbGVtZW50ID8gdGhpcy5pbmRleE9mKCQoZWxlbWVudClbMF0pIDogdGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpLmluZGV4T2YodGhpc1swXSlcbiAgICB9LFxuICAgIGhhc0NsYXNzOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgIGlmICghbmFtZSkgcmV0dXJuIGZhbHNlXG4gICAgICByZXR1cm4gZW1wdHlBcnJheS5zb21lLmNhbGwodGhpcywgZnVuY3Rpb24oZWwpe1xuICAgICAgICByZXR1cm4gdGhpcy50ZXN0KGNsYXNzTmFtZShlbCkpXG4gICAgICB9LCBjbGFzc1JFKG5hbWUpKVxuICAgIH0sXG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgaWYgKCFuYW1lKSByZXR1cm4gdGhpc1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICBpZiAoISgnY2xhc3NOYW1lJyBpbiB0aGlzKSkgcmV0dXJuXG4gICAgICAgIGNsYXNzTGlzdCA9IFtdXG4gICAgICAgIHZhciBjbHMgPSBjbGFzc05hbWUodGhpcyksIG5ld05hbWUgPSBmdW5jQXJnKHRoaXMsIG5hbWUsIGlkeCwgY2xzKVxuICAgICAgICBuZXdOYW1lLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oa2xhc3Mpe1xuICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcyhrbGFzcykpIGNsYXNzTGlzdC5wdXNoKGtsYXNzKVxuICAgICAgICB9LCB0aGlzKVxuICAgICAgICBjbGFzc0xpc3QubGVuZ3RoICYmIGNsYXNzTmFtZSh0aGlzLCBjbHMgKyAoY2xzID8gXCIgXCIgOiBcIlwiKSArIGNsYXNzTGlzdC5qb2luKFwiIFwiKSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICByZW1vdmVDbGFzczogZnVuY3Rpb24obmFtZSl7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgIGlmICghKCdjbGFzc05hbWUnIGluIHRoaXMpKSByZXR1cm5cbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNsYXNzTmFtZSh0aGlzLCAnJylcbiAgICAgICAgY2xhc3NMaXN0ID0gY2xhc3NOYW1lKHRoaXMpXG4gICAgICAgIGZ1bmNBcmcodGhpcywgbmFtZSwgaWR4LCBjbGFzc0xpc3QpLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oa2xhc3Mpe1xuICAgICAgICAgIGNsYXNzTGlzdCA9IGNsYXNzTGlzdC5yZXBsYWNlKGNsYXNzUkUoa2xhc3MpLCBcIiBcIilcbiAgICAgICAgfSlcbiAgICAgICAgY2xhc3NOYW1lKHRoaXMsIGNsYXNzTGlzdC50cmltKCkpXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKG5hbWUsIHdoZW4pe1xuICAgICAgaWYgKCFuYW1lKSByZXR1cm4gdGhpc1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLCBuYW1lcyA9IGZ1bmNBcmcodGhpcywgbmFtZSwgaWR4LCBjbGFzc05hbWUodGhpcykpXG4gICAgICAgIG5hbWVzLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oa2xhc3Mpe1xuICAgICAgICAgICh3aGVuID09PSB1bmRlZmluZWQgPyAhJHRoaXMuaGFzQ2xhc3Moa2xhc3MpIDogd2hlbikgP1xuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3Moa2xhc3MpIDogJHRoaXMucmVtb3ZlQ2xhc3Moa2xhc3MpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgc2Nyb2xsVG9wOiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm5cbiAgICAgIHZhciBoYXNTY3JvbGxUb3AgPSAnc2Nyb2xsVG9wJyBpbiB0aGlzWzBdXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGhhc1Njcm9sbFRvcCA/IHRoaXNbMF0uc2Nyb2xsVG9wIDogdGhpc1swXS5wYWdlWU9mZnNldFxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChoYXNTY3JvbGxUb3AgP1xuICAgICAgICBmdW5jdGlvbigpeyB0aGlzLnNjcm9sbFRvcCA9IHZhbHVlIH0gOlxuICAgICAgICBmdW5jdGlvbigpeyB0aGlzLnNjcm9sbFRvKHRoaXMuc2Nyb2xsWCwgdmFsdWUpIH0pXG4gICAgfSxcbiAgICBzY3JvbGxMZWZ0OiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm5cbiAgICAgIHZhciBoYXNTY3JvbGxMZWZ0ID0gJ3Njcm9sbExlZnQnIGluIHRoaXNbMF1cbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gaGFzU2Nyb2xsTGVmdCA/IHRoaXNbMF0uc2Nyb2xsTGVmdCA6IHRoaXNbMF0ucGFnZVhPZmZzZXRcbiAgICAgIHJldHVybiB0aGlzLmVhY2goaGFzU2Nyb2xsTGVmdCA/XG4gICAgICAgIGZ1bmN0aW9uKCl7IHRoaXMuc2Nyb2xsTGVmdCA9IHZhbHVlIH0gOlxuICAgICAgICBmdW5jdGlvbigpeyB0aGlzLnNjcm9sbFRvKHZhbHVlLCB0aGlzLnNjcm9sbFkpIH0pXG4gICAgfSxcbiAgICBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm5cblxuICAgICAgdmFyIGVsZW0gPSB0aGlzWzBdLFxuICAgICAgICAvLyBHZXQgKnJlYWwqIG9mZnNldFBhcmVudFxuICAgICAgICBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCgpLFxuICAgICAgICAvLyBHZXQgY29ycmVjdCBvZmZzZXRzXG4gICAgICAgIG9mZnNldCAgICAgICA9IHRoaXMub2Zmc2V0KCksXG4gICAgICAgIHBhcmVudE9mZnNldCA9IHJvb3ROb2RlUkUudGVzdChvZmZzZXRQYXJlbnRbMF0ubm9kZU5hbWUpID8geyB0b3A6IDAsIGxlZnQ6IDAgfSA6IG9mZnNldFBhcmVudC5vZmZzZXQoKVxuXG4gICAgICAvLyBTdWJ0cmFjdCBlbGVtZW50IG1hcmdpbnNcbiAgICAgIC8vIG5vdGU6IHdoZW4gYW4gZWxlbWVudCBoYXMgbWFyZ2luOiBhdXRvIHRoZSBvZmZzZXRMZWZ0IGFuZCBtYXJnaW5MZWZ0XG4gICAgICAvLyBhcmUgdGhlIHNhbWUgaW4gU2FmYXJpIGNhdXNpbmcgb2Zmc2V0LmxlZnQgdG8gaW5jb3JyZWN0bHkgYmUgMFxuICAgICAgb2Zmc2V0LnRvcCAgLT0gcGFyc2VGbG9hdCggJChlbGVtKS5jc3MoJ21hcmdpbi10b3AnKSApIHx8IDBcbiAgICAgIG9mZnNldC5sZWZ0IC09IHBhcnNlRmxvYXQoICQoZWxlbSkuY3NzKCdtYXJnaW4tbGVmdCcpICkgfHwgMFxuXG4gICAgICAvLyBBZGQgb2Zmc2V0UGFyZW50IGJvcmRlcnNcbiAgICAgIHBhcmVudE9mZnNldC50b3AgICs9IHBhcnNlRmxvYXQoICQob2Zmc2V0UGFyZW50WzBdKS5jc3MoJ2JvcmRlci10b3Atd2lkdGgnKSApIHx8IDBcbiAgICAgIHBhcmVudE9mZnNldC5sZWZ0ICs9IHBhcnNlRmxvYXQoICQob2Zmc2V0UGFyZW50WzBdKS5jc3MoJ2JvcmRlci1sZWZ0LXdpZHRoJykgKSB8fCAwXG5cbiAgICAgIC8vIFN1YnRyYWN0IHRoZSB0d28gb2Zmc2V0c1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiAgb2Zmc2V0LnRvcCAgLSBwYXJlbnRPZmZzZXQudG9wLFxuICAgICAgICBsZWZ0OiBvZmZzZXQubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0XG4gICAgICB9XG4gICAgfSxcbiAgICBvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCB8fCBkb2N1bWVudC5ib2R5XG4gICAgICAgIHdoaWxlIChwYXJlbnQgJiYgIXJvb3ROb2RlUkUudGVzdChwYXJlbnQubm9kZU5hbWUpICYmICQocGFyZW50KS5jc3MoXCJwb3NpdGlvblwiKSA9PSBcInN0YXRpY1wiKVxuICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5vZmZzZXRQYXJlbnRcbiAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvLyBmb3Igbm93XG4gICQuZm4uZGV0YWNoID0gJC5mbi5yZW1vdmVcblxuICAvLyBHZW5lcmF0ZSB0aGUgYHdpZHRoYCBhbmQgYGhlaWdodGAgZnVuY3Rpb25zXG4gIDtbJ3dpZHRoJywgJ2hlaWdodCddLmZvckVhY2goZnVuY3Rpb24oZGltZW5zaW9uKXtcbiAgICB2YXIgZGltZW5zaW9uUHJvcGVydHkgPVxuICAgICAgZGltZW5zaW9uLnJlcGxhY2UoLy4vLCBmdW5jdGlvbihtKXsgcmV0dXJuIG1bMF0udG9VcHBlckNhc2UoKSB9KVxuXG4gICAgJC5mbltkaW1lbnNpb25dID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgdmFyIG9mZnNldCwgZWwgPSB0aGlzWzBdXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGlzV2luZG93KGVsKSA/IGVsWydpbm5lcicgKyBkaW1lbnNpb25Qcm9wZXJ0eV0gOlxuICAgICAgICBpc0RvY3VtZW50KGVsKSA/IGVsLmRvY3VtZW50RWxlbWVudFsnc2Nyb2xsJyArIGRpbWVuc2lvblByb3BlcnR5XSA6XG4gICAgICAgIChvZmZzZXQgPSB0aGlzLm9mZnNldCgpKSAmJiBvZmZzZXRbZGltZW5zaW9uXVxuICAgICAgZWxzZSByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgIGVsID0gJCh0aGlzKVxuICAgICAgICBlbC5jc3MoZGltZW5zaW9uLCBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIGVsW2RpbWVuc2lvbl0oKSkpXG4gICAgICB9KVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiB0cmF2ZXJzZU5vZGUobm9kZSwgZnVuKSB7XG4gICAgZnVuKG5vZGUpXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkgPCBsZW47IGkrKylcbiAgICAgIHRyYXZlcnNlTm9kZShub2RlLmNoaWxkTm9kZXNbaV0sIGZ1bilcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIHRoZSBgYWZ0ZXJgLCBgcHJlcGVuZGAsIGBiZWZvcmVgLCBgYXBwZW5kYCxcbiAgLy8gYGluc2VydEFmdGVyYCwgYGluc2VydEJlZm9yZWAsIGBhcHBlbmRUb2AsIGFuZCBgcHJlcGVuZFRvYCBtZXRob2RzLlxuICBhZGphY2VuY3lPcGVyYXRvcnMuZm9yRWFjaChmdW5jdGlvbihvcGVyYXRvciwgb3BlcmF0b3JJbmRleCkge1xuICAgIHZhciBpbnNpZGUgPSBvcGVyYXRvckluZGV4ICUgMiAvLz0+IHByZXBlbmQsIGFwcGVuZFxuXG4gICAgJC5mbltvcGVyYXRvcl0gPSBmdW5jdGlvbigpe1xuICAgICAgLy8gYXJndW1lbnRzIGNhbiBiZSBub2RlcywgYXJyYXlzIG9mIG5vZGVzLCBaZXB0byBvYmplY3RzIGFuZCBIVE1MIHN0cmluZ3NcbiAgICAgIHZhciBhcmdUeXBlLCBub2RlcyA9ICQubWFwKGFyZ3VtZW50cywgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gW11cbiAgICAgICAgICAgIGFyZ1R5cGUgPSB0eXBlKGFyZylcbiAgICAgICAgICAgIGlmIChhcmdUeXBlID09IFwiYXJyYXlcIikge1xuICAgICAgICAgICAgICBhcmcuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAgIGlmIChlbC5ub2RlVHlwZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gYXJyLnB1c2goZWwpXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJC56ZXB0by5pc1ooZWwpKSByZXR1cm4gYXJyID0gYXJyLmNvbmNhdChlbC5nZXQoKSlcbiAgICAgICAgICAgICAgICBhcnIgPSBhcnIuY29uY2F0KHplcHRvLmZyYWdtZW50KGVsKSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgcmV0dXJuIGFyclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFyZ1R5cGUgPT0gXCJvYmplY3RcIiB8fCBhcmcgPT0gbnVsbCA/XG4gICAgICAgICAgICAgIGFyZyA6IHplcHRvLmZyYWdtZW50KGFyZylcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBwYXJlbnQsIGNvcHlCeUNsb25lID0gdGhpcy5sZW5ndGggPiAxXG4gICAgICBpZiAobm9kZXMubGVuZ3RoIDwgMSkgcmV0dXJuIHRoaXNcblxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihfLCB0YXJnZXQpe1xuICAgICAgICBwYXJlbnQgPSBpbnNpZGUgPyB0YXJnZXQgOiB0YXJnZXQucGFyZW50Tm9kZVxuXG4gICAgICAgIC8vIGNvbnZlcnQgYWxsIG1ldGhvZHMgdG8gYSBcImJlZm9yZVwiIG9wZXJhdGlvblxuICAgICAgICB0YXJnZXQgPSBvcGVyYXRvckluZGV4ID09IDAgPyB0YXJnZXQubmV4dFNpYmxpbmcgOlxuICAgICAgICAgICAgICAgICBvcGVyYXRvckluZGV4ID09IDEgPyB0YXJnZXQuZmlyc3RDaGlsZCA6XG4gICAgICAgICAgICAgICAgIG9wZXJhdG9ySW5kZXggPT0gMiA/IHRhcmdldCA6XG4gICAgICAgICAgICAgICAgIG51bGxcblxuICAgICAgICB2YXIgcGFyZW50SW5Eb2N1bWVudCA9ICQuY29udGFpbnMoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBwYXJlbnQpXG5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKXtcbiAgICAgICAgICBpZiAoY29weUJ5Q2xvbmUpIG5vZGUgPSBub2RlLmNsb25lTm9kZSh0cnVlKVxuICAgICAgICAgIGVsc2UgaWYgKCFwYXJlbnQpIHJldHVybiAkKG5vZGUpLnJlbW92ZSgpXG5cbiAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHRhcmdldClcbiAgICAgICAgICBpZiAocGFyZW50SW5Eb2N1bWVudCkgdHJhdmVyc2VOb2RlKG5vZGUsIGZ1bmN0aW9uKGVsKXtcbiAgICAgICAgICAgIGlmIChlbC5ub2RlTmFtZSAhPSBudWxsICYmIGVsLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnICYmXG4gICAgICAgICAgICAgICAoIWVsLnR5cGUgfHwgZWwudHlwZSA9PT0gJ3RleHQvamF2YXNjcmlwdCcpICYmICFlbC5zcmMpe1xuICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZWwub3duZXJEb2N1bWVudCA/IGVsLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgOiB3aW5kb3dcbiAgICAgICAgICAgICAgdGFyZ2V0WydldmFsJ10uY2FsbCh0YXJnZXQsIGVsLmlubmVySFRNTClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBhZnRlciAgICA9PiBpbnNlcnRBZnRlclxuICAgIC8vIHByZXBlbmQgID0+IHByZXBlbmRUb1xuICAgIC8vIGJlZm9yZSAgID0+IGluc2VydEJlZm9yZVxuICAgIC8vIGFwcGVuZCAgID0+IGFwcGVuZFRvXG4gICAgJC5mbltpbnNpZGUgPyBvcGVyYXRvcisnVG8nIDogJ2luc2VydCcrKG9wZXJhdG9ySW5kZXggPyAnQmVmb3JlJyA6ICdBZnRlcicpXSA9IGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgJChodG1sKVtvcGVyYXRvcl0odGhpcylcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9KVxuXG4gIHplcHRvLloucHJvdG90eXBlID0gWi5wcm90b3R5cGUgPSAkLmZuXG5cbiAgLy8gRXhwb3J0IGludGVybmFsIEFQSSBmdW5jdGlvbnMgaW4gdGhlIGAkLnplcHRvYCBuYW1lc3BhY2VcbiAgemVwdG8udW5pcSA9IHVuaXFcbiAgemVwdG8uZGVzZXJpYWxpemVWYWx1ZSA9IGRlc2VyaWFsaXplVmFsdWVcbiAgJC56ZXB0byA9IHplcHRvXG5cbiAgcmV0dXJuICRcbn0pKClcblxuOyhmdW5jdGlvbigkKXtcbiAgdmFyIF96aWQgPSAxLCB1bmRlZmluZWQsXG4gICAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZSxcbiAgICAgIGlzRnVuY3Rpb24gPSAkLmlzRnVuY3Rpb24sXG4gICAgICBpc1N0cmluZyA9IGZ1bmN0aW9uKG9iail7IHJldHVybiB0eXBlb2Ygb2JqID09ICdzdHJpbmcnIH0sXG4gICAgICBoYW5kbGVycyA9IHt9LFxuICAgICAgc3BlY2lhbEV2ZW50cz17fSxcbiAgICAgIGZvY3VzaW5TdXBwb3J0ZWQgPSAnb25mb2N1c2luJyBpbiB3aW5kb3csXG4gICAgICBmb2N1cyA9IHsgZm9jdXM6ICdmb2N1c2luJywgYmx1cjogJ2ZvY3Vzb3V0JyB9LFxuICAgICAgaG92ZXIgPSB7IG1vdXNlZW50ZXI6ICdtb3VzZW92ZXInLCBtb3VzZWxlYXZlOiAnbW91c2VvdXQnIH1cblxuICBzcGVjaWFsRXZlbnRzLmNsaWNrID0gc3BlY2lhbEV2ZW50cy5tb3VzZWRvd24gPSBzcGVjaWFsRXZlbnRzLm1vdXNldXAgPSBzcGVjaWFsRXZlbnRzLm1vdXNlbW92ZSA9ICdNb3VzZUV2ZW50cydcblxuICBmdW5jdGlvbiB6aWQoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50Ll96aWQgfHwgKGVsZW1lbnQuX3ppZCA9IF96aWQrKylcbiAgfVxuICBmdW5jdGlvbiBmaW5kSGFuZGxlcnMoZWxlbWVudCwgZXZlbnQsIGZuLCBzZWxlY3Rvcikge1xuICAgIGV2ZW50ID0gcGFyc2UoZXZlbnQpXG4gICAgaWYgKGV2ZW50Lm5zKSB2YXIgbWF0Y2hlciA9IG1hdGNoZXJGb3IoZXZlbnQubnMpXG4gICAgcmV0dXJuIChoYW5kbGVyc1t6aWQoZWxlbWVudCldIHx8IFtdKS5maWx0ZXIoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgcmV0dXJuIGhhbmRsZXJcbiAgICAgICAgJiYgKCFldmVudC5lICB8fCBoYW5kbGVyLmUgPT0gZXZlbnQuZSlcbiAgICAgICAgJiYgKCFldmVudC5ucyB8fCBtYXRjaGVyLnRlc3QoaGFuZGxlci5ucykpXG4gICAgICAgICYmICghZm4gICAgICAgfHwgemlkKGhhbmRsZXIuZm4pID09PSB6aWQoZm4pKVxuICAgICAgICAmJiAoIXNlbGVjdG9yIHx8IGhhbmRsZXIuc2VsID09IHNlbGVjdG9yKVxuICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gcGFyc2UoZXZlbnQpIHtcbiAgICB2YXIgcGFydHMgPSAoJycgKyBldmVudCkuc3BsaXQoJy4nKVxuICAgIHJldHVybiB7ZTogcGFydHNbMF0sIG5zOiBwYXJ0cy5zbGljZSgxKS5zb3J0KCkuam9pbignICcpfVxuICB9XG4gIGZ1bmN0aW9uIG1hdGNoZXJGb3IobnMpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKD86XnwgKScgKyBucy5yZXBsYWNlKCcgJywgJyAuKiA/JykgKyAnKD86IHwkKScpXG4gIH1cblxuICBmdW5jdGlvbiBldmVudENhcHR1cmUoaGFuZGxlciwgY2FwdHVyZVNldHRpbmcpIHtcbiAgICByZXR1cm4gaGFuZGxlci5kZWwgJiZcbiAgICAgICghZm9jdXNpblN1cHBvcnRlZCAmJiAoaGFuZGxlci5lIGluIGZvY3VzKSkgfHxcbiAgICAgICEhY2FwdHVyZVNldHRpbmdcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWxFdmVudCh0eXBlKSB7XG4gICAgcmV0dXJuIGhvdmVyW3R5cGVdIHx8IChmb2N1c2luU3VwcG9ydGVkICYmIGZvY3VzW3R5cGVdKSB8fCB0eXBlXG4gIH1cblxuICBmdW5jdGlvbiBhZGQoZWxlbWVudCwgZXZlbnRzLCBmbiwgZGF0YSwgc2VsZWN0b3IsIGRlbGVnYXRvciwgY2FwdHVyZSl7XG4gICAgdmFyIGlkID0gemlkKGVsZW1lbnQpLCBzZXQgPSAoaGFuZGxlcnNbaWRdIHx8IChoYW5kbGVyc1tpZF0gPSBbXSkpXG4gICAgZXZlbnRzLnNwbGl0KC9cXHMvKS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIGlmIChldmVudCA9PSAncmVhZHknKSByZXR1cm4gJChkb2N1bWVudCkucmVhZHkoZm4pXG4gICAgICB2YXIgaGFuZGxlciAgID0gcGFyc2UoZXZlbnQpXG4gICAgICBoYW5kbGVyLmZuICAgID0gZm5cbiAgICAgIGhhbmRsZXIuc2VsICAgPSBzZWxlY3RvclxuICAgICAgLy8gZW11bGF0ZSBtb3VzZWVudGVyLCBtb3VzZWxlYXZlXG4gICAgICBpZiAoaGFuZGxlci5lIGluIGhvdmVyKSBmbiA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgcmVsYXRlZCA9IGUucmVsYXRlZFRhcmdldFxuICAgICAgICBpZiAoIXJlbGF0ZWQgfHwgKHJlbGF0ZWQgIT09IHRoaXMgJiYgISQuY29udGFpbnModGhpcywgcmVsYXRlZCkpKVxuICAgICAgICAgIHJldHVybiBoYW5kbGVyLmZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIH1cbiAgICAgIGhhbmRsZXIuZGVsICAgPSBkZWxlZ2F0b3JcbiAgICAgIHZhciBjYWxsYmFjayAgPSBkZWxlZ2F0b3IgfHwgZm5cbiAgICAgIGhhbmRsZXIucHJveHkgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgZSA9IGNvbXBhdGlibGUoZSlcbiAgICAgICAgaWYgKGUuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSkgcmV0dXJuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGRhdGFQcm9wRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgJ2RhdGEnKVxuICAgICAgICAgIGlmICghZGF0YVByb3BEZXNjcmlwdG9yIHx8IGRhdGFQcm9wRGVzY3JpcHRvci53cml0YWJsZSlcbiAgICAgICAgICAgIGUuZGF0YSA9IGRhdGFcbiAgICAgICAgfSBjYXRjaCAoZSkge30gLy8gd2hlbiB1c2luZyBzdHJpY3QgbW9kZSBkYXRhUHJvcERlc2NyaXB0b3Igd2lsbCBiZSB1bmRlZmluZWQgd2hlbiBlIGlzIElucHV0RXZlbnQgKGV2ZW4gdGhvdWdoIGRhdGEgcHJvcGVydHkgZXhpc3RzKS4gU28gd2Ugc3Vycm91bmQgd2l0aCB0cnkvY2F0Y2hcbiAgICAgICAgdmFyIHJlc3VsdCA9IGNhbGxiYWNrLmFwcGx5KGVsZW1lbnQsIGUuX2FyZ3MgPT0gdW5kZWZpbmVkID8gW2VdIDogW2VdLmNvbmNhdChlLl9hcmdzKSlcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIGUucHJldmVudERlZmF1bHQoKSwgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9XG4gICAgICBoYW5kbGVyLmkgPSBzZXQubGVuZ3RoXG4gICAgICBzZXQucHVzaChoYW5kbGVyKVxuICAgICAgaWYgKCdhZGRFdmVudExpc3RlbmVyJyBpbiBlbGVtZW50KVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIocmVhbEV2ZW50KGhhbmRsZXIuZSksIGhhbmRsZXIucHJveHksIGV2ZW50Q2FwdHVyZShoYW5kbGVyLCBjYXB0dXJlKSlcbiAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIHJlbW92ZShlbGVtZW50LCBldmVudHMsIGZuLCBzZWxlY3RvciwgY2FwdHVyZSl7XG4gICAgdmFyIGlkID0gemlkKGVsZW1lbnQpXG4gICAgOyhldmVudHMgfHwgJycpLnNwbGl0KC9cXHMvKS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIGZpbmRIYW5kbGVycyhlbGVtZW50LCBldmVudCwgZm4sIHNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpe1xuICAgICAgICBkZWxldGUgaGFuZGxlcnNbaWRdW2hhbmRsZXIuaV1cbiAgICAgIGlmICgncmVtb3ZlRXZlbnRMaXN0ZW5lcicgaW4gZWxlbWVudClcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHJlYWxFdmVudChoYW5kbGVyLmUpLCBoYW5kbGVyLnByb3h5LCBldmVudENhcHR1cmUoaGFuZGxlciwgY2FwdHVyZSkpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAkLmV2ZW50ID0geyBhZGQ6IGFkZCwgcmVtb3ZlOiByZW1vdmUgfVxuXG4gICQucHJveHkgPSBmdW5jdGlvbihmbiwgY29udGV4dCkge1xuICAgIHZhciBhcmdzID0gKDIgaW4gYXJndW1lbnRzKSAmJiBzbGljZS5jYWxsKGFyZ3VtZW50cywgMilcbiAgICBpZiAoaXNGdW5jdGlvbihmbikpIHtcbiAgICAgIHZhciBwcm94eUZuID0gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MgPyBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpIDogYXJndW1lbnRzKSB9XG4gICAgICBwcm94eUZuLl96aWQgPSB6aWQoZm4pXG4gICAgICByZXR1cm4gcHJveHlGblxuICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29udGV4dCkpIHtcbiAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChmbltjb250ZXh0XSwgZm4pXG4gICAgICAgIHJldHVybiAkLnByb3h5LmFwcGx5KG51bGwsIGFyZ3MpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJC5wcm94eShmbltjb250ZXh0XSwgZm4pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJleHBlY3RlZCBmdW5jdGlvblwiKVxuICAgIH1cbiAgfVxuXG4gICQuZm4uYmluZCA9IGZ1bmN0aW9uKGV2ZW50LCBkYXRhLCBjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub24oZXZlbnQsIGRhdGEsIGNhbGxiYWNrKVxuICB9XG4gICQuZm4udW5iaW5kID0gZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vZmYoZXZlbnQsIGNhbGxiYWNrKVxuICB9XG4gICQuZm4ub25lID0gZnVuY3Rpb24oZXZlbnQsIHNlbGVjdG9yLCBkYXRhLCBjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub24oZXZlbnQsIHNlbGVjdG9yLCBkYXRhLCBjYWxsYmFjaywgMSlcbiAgfVxuXG4gIHZhciByZXR1cm5UcnVlID0gZnVuY3Rpb24oKXtyZXR1cm4gdHJ1ZX0sXG4gICAgICByZXR1cm5GYWxzZSA9IGZ1bmN0aW9uKCl7cmV0dXJuIGZhbHNlfSxcbiAgICAgIGlnbm9yZVByb3BlcnRpZXMgPSAvXihbQS1aXXxyZXR1cm5WYWx1ZSR8bGF5ZXJbWFldJHx3ZWJraXRNb3ZlbWVudFtYWV0kKS8sXG4gICAgICBldmVudE1ldGhvZHMgPSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0OiAnaXNEZWZhdWx0UHJldmVudGVkJyxcbiAgICAgICAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiAnaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQnLFxuICAgICAgICBzdG9wUHJvcGFnYXRpb246ICdpc1Byb3BhZ2F0aW9uU3RvcHBlZCdcbiAgICAgIH1cblxuICBmdW5jdGlvbiBjb21wYXRpYmxlKGV2ZW50LCBzb3VyY2UpIHtcbiAgICBpZiAoc291cmNlIHx8ICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHNvdXJjZSB8fCAoc291cmNlID0gZXZlbnQpXG5cbiAgICAgICQuZWFjaChldmVudE1ldGhvZHMsIGZ1bmN0aW9uKG5hbWUsIHByZWRpY2F0ZSkge1xuICAgICAgICB2YXIgc291cmNlTWV0aG9kID0gc291cmNlW25hbWVdXG4gICAgICAgIGV2ZW50W25hbWVdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICB0aGlzW3ByZWRpY2F0ZV0gPSByZXR1cm5UcnVlXG4gICAgICAgICAgcmV0dXJuIHNvdXJjZU1ldGhvZCAmJiBzb3VyY2VNZXRob2QuYXBwbHkoc291cmNlLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgZXZlbnRbcHJlZGljYXRlXSA9IHJldHVybkZhbHNlXG4gICAgICB9KVxuXG4gICAgICB0cnkge1xuICAgICAgICBldmVudC50aW1lU3RhbXAgfHwgKGV2ZW50LnRpbWVTdGFtcCA9IERhdGUubm93KCkpXG4gICAgICB9IGNhdGNoIChpZ25vcmVkKSB7IH1cblxuICAgICAgaWYgKHNvdXJjZS5kZWZhdWx0UHJldmVudGVkICE9PSB1bmRlZmluZWQgPyBzb3VyY2UuZGVmYXVsdFByZXZlbnRlZCA6XG4gICAgICAgICAgJ3JldHVyblZhbHVlJyBpbiBzb3VyY2UgPyBzb3VyY2UucmV0dXJuVmFsdWUgPT09IGZhbHNlIDpcbiAgICAgICAgICBzb3VyY2UuZ2V0UHJldmVudERlZmF1bHQgJiYgc291cmNlLmdldFByZXZlbnREZWZhdWx0KCkpXG4gICAgICAgIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVyblRydWVcbiAgICB9XG4gICAgcmV0dXJuIGV2ZW50XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcm94eShldmVudCkge1xuICAgIHZhciBrZXksIHByb3h5ID0geyBvcmlnaW5hbEV2ZW50OiBldmVudCB9XG4gICAgZm9yIChrZXkgaW4gZXZlbnQpXG4gICAgICBpZiAoIWlnbm9yZVByb3BlcnRpZXMudGVzdChrZXkpICYmIGV2ZW50W2tleV0gIT09IHVuZGVmaW5lZCkgcHJveHlba2V5XSA9IGV2ZW50W2tleV1cblxuICAgIHJldHVybiBjb21wYXRpYmxlKHByb3h5LCBldmVudClcbiAgfVxuXG4gICQuZm4uZGVsZWdhdGUgPSBmdW5jdGlvbihzZWxlY3RvciwgZXZlbnQsIGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vbihldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrKVxuICB9XG4gICQuZm4udW5kZWxlZ2F0ZSA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBldmVudCwgY2FsbGJhY2spe1xuICAgIHJldHVybiB0aGlzLm9mZihldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrKVxuICB9XG5cbiAgJC5mbi5saXZlID0gZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKXtcbiAgICAkKGRvY3VtZW50LmJvZHkpLmRlbGVnYXRlKHRoaXMuc2VsZWN0b3IsIGV2ZW50LCBjYWxsYmFjaylcbiAgICByZXR1cm4gdGhpc1xuICB9XG4gICQuZm4uZGllID0gZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKXtcbiAgICAkKGRvY3VtZW50LmJvZHkpLnVuZGVsZWdhdGUodGhpcy5zZWxlY3RvciwgZXZlbnQsIGNhbGxiYWNrKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAkLmZuLm9uID0gZnVuY3Rpb24oZXZlbnQsIHNlbGVjdG9yLCBkYXRhLCBjYWxsYmFjaywgb25lKXtcbiAgICB2YXIgYXV0b1JlbW92ZSwgZGVsZWdhdG9yLCAkdGhpcyA9IHRoaXNcbiAgICBpZiAoZXZlbnQgJiYgIWlzU3RyaW5nKGV2ZW50KSkge1xuICAgICAgJC5lYWNoKGV2ZW50LCBmdW5jdGlvbih0eXBlLCBmbil7XG4gICAgICAgICR0aGlzLm9uKHR5cGUsIHNlbGVjdG9yLCBkYXRhLCBmbiwgb25lKVxuICAgICAgfSlcbiAgICAgIHJldHVybiAkdGhpc1xuICAgIH1cblxuICAgIGlmICghaXNTdHJpbmcoc2VsZWN0b3IpICYmICFpc0Z1bmN0aW9uKGNhbGxiYWNrKSAmJiBjYWxsYmFjayAhPT0gZmFsc2UpXG4gICAgICBjYWxsYmFjayA9IGRhdGEsIGRhdGEgPSBzZWxlY3Rvciwgc2VsZWN0b3IgPSB1bmRlZmluZWRcbiAgICBpZiAoY2FsbGJhY2sgPT09IHVuZGVmaW5lZCB8fCBkYXRhID09PSBmYWxzZSlcbiAgICAgIGNhbGxiYWNrID0gZGF0YSwgZGF0YSA9IHVuZGVmaW5lZFxuXG4gICAgaWYgKGNhbGxiYWNrID09PSBmYWxzZSkgY2FsbGJhY2sgPSByZXR1cm5GYWxzZVxuXG4gICAgcmV0dXJuICR0aGlzLmVhY2goZnVuY3Rpb24oXywgZWxlbWVudCl7XG4gICAgICBpZiAob25lKSBhdXRvUmVtb3ZlID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIHJlbW92ZShlbGVtZW50LCBlLnR5cGUsIGNhbGxiYWNrKVxuICAgICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZWN0b3IpIGRlbGVnYXRvciA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgZXZ0LCBtYXRjaCA9ICQoZS50YXJnZXQpLmNsb3Nlc3Qoc2VsZWN0b3IsIGVsZW1lbnQpLmdldCgwKVxuICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2ggIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICBldnQgPSAkLmV4dGVuZChjcmVhdGVQcm94eShlKSwge2N1cnJlbnRUYXJnZXQ6IG1hdGNoLCBsaXZlRmlyZWQ6IGVsZW1lbnR9KVxuICAgICAgICAgIHJldHVybiAoYXV0b1JlbW92ZSB8fCBjYWxsYmFjaykuYXBwbHkobWF0Y2gsIFtldnRdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGFkZChlbGVtZW50LCBldmVudCwgY2FsbGJhY2ssIGRhdGEsIHNlbGVjdG9yLCBkZWxlZ2F0b3IgfHwgYXV0b1JlbW92ZSlcbiAgICB9KVxuICB9XG4gICQuZm4ub2ZmID0gZnVuY3Rpb24oZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjayl7XG4gICAgdmFyICR0aGlzID0gdGhpc1xuICAgIGlmIChldmVudCAmJiAhaXNTdHJpbmcoZXZlbnQpKSB7XG4gICAgICAkLmVhY2goZXZlbnQsIGZ1bmN0aW9uKHR5cGUsIGZuKXtcbiAgICAgICAgJHRoaXMub2ZmKHR5cGUsIHNlbGVjdG9yLCBmbilcbiAgICAgIH0pXG4gICAgICByZXR1cm4gJHRoaXNcbiAgICB9XG5cbiAgICBpZiAoIWlzU3RyaW5nKHNlbGVjdG9yKSAmJiAhaXNGdW5jdGlvbihjYWxsYmFjaykgJiYgY2FsbGJhY2sgIT09IGZhbHNlKVxuICAgICAgY2FsbGJhY2sgPSBzZWxlY3Rvciwgc2VsZWN0b3IgPSB1bmRlZmluZWRcblxuICAgIGlmIChjYWxsYmFjayA9PT0gZmFsc2UpIGNhbGxiYWNrID0gcmV0dXJuRmFsc2VcblxuICAgIHJldHVybiAkdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICByZW1vdmUodGhpcywgZXZlbnQsIGNhbGxiYWNrLCBzZWxlY3RvcilcbiAgICB9KVxuICB9XG5cbiAgJC5mbi50cmlnZ2VyID0gZnVuY3Rpb24oZXZlbnQsIGFyZ3Mpe1xuICAgIGV2ZW50ID0gKGlzU3RyaW5nKGV2ZW50KSB8fCAkLmlzUGxhaW5PYmplY3QoZXZlbnQpKSA/ICQuRXZlbnQoZXZlbnQpIDogY29tcGF0aWJsZShldmVudClcbiAgICBldmVudC5fYXJncyA9IGFyZ3NcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAvLyBoYW5kbGUgZm9jdXMoKSwgYmx1cigpIGJ5IGNhbGxpbmcgdGhlbSBkaXJlY3RseVxuICAgICAgaWYgKGV2ZW50LnR5cGUgaW4gZm9jdXMgJiYgdHlwZW9mIHRoaXNbZXZlbnQudHlwZV0gPT0gXCJmdW5jdGlvblwiKSB0aGlzW2V2ZW50LnR5cGVdKClcbiAgICAgIC8vIGl0ZW1zIGluIHRoZSBjb2xsZWN0aW9uIG1pZ2h0IG5vdCBiZSBET00gZWxlbWVudHNcbiAgICAgIGVsc2UgaWYgKCdkaXNwYXRjaEV2ZW50JyBpbiB0aGlzKSB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gICAgICBlbHNlICQodGhpcykudHJpZ2dlckhhbmRsZXIoZXZlbnQsIGFyZ3MpXG4gICAgfSlcbiAgfVxuXG4gIC8vIHRyaWdnZXJzIGV2ZW50IGhhbmRsZXJzIG9uIGN1cnJlbnQgZWxlbWVudCBqdXN0IGFzIGlmIGFuIGV2ZW50IG9jY3VycmVkLFxuICAvLyBkb2Vzbid0IHRyaWdnZXIgYW4gYWN0dWFsIGV2ZW50LCBkb2Vzbid0IGJ1YmJsZVxuICAkLmZuLnRyaWdnZXJIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQsIGFyZ3Mpe1xuICAgIHZhciBlLCByZXN1bHRcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oaSwgZWxlbWVudCl7XG4gICAgICBlID0gY3JlYXRlUHJveHkoaXNTdHJpbmcoZXZlbnQpID8gJC5FdmVudChldmVudCkgOiBldmVudClcbiAgICAgIGUuX2FyZ3MgPSBhcmdzXG4gICAgICBlLnRhcmdldCA9IGVsZW1lbnRcbiAgICAgICQuZWFjaChmaW5kSGFuZGxlcnMoZWxlbWVudCwgZXZlbnQudHlwZSB8fCBldmVudCksIGZ1bmN0aW9uKGksIGhhbmRsZXIpe1xuICAgICAgICByZXN1bHQgPSBoYW5kbGVyLnByb3h5KGUpXG4gICAgICAgIGlmIChlLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkpIHJldHVybiBmYWxzZVxuICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8vIHNob3J0Y3V0IG1ldGhvZHMgZm9yIGAuYmluZChldmVudCwgZm4pYCBmb3IgZWFjaCBldmVudCB0eXBlXG4gIDsoJ2ZvY3VzaW4gZm9jdXNvdXQgZm9jdXMgYmx1ciBsb2FkIHJlc2l6ZSBzY3JvbGwgdW5sb2FkIGNsaWNrIGRibGNsaWNrICcrXG4gICdtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSAnK1xuICAnY2hhbmdlIHNlbGVjdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGVycm9yJykuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgJC5mbltldmVudF0gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgcmV0dXJuICgwIGluIGFyZ3VtZW50cykgP1xuICAgICAgICB0aGlzLmJpbmQoZXZlbnQsIGNhbGxiYWNrKSA6XG4gICAgICAgIHRoaXMudHJpZ2dlcihldmVudClcbiAgICB9XG4gIH0pXG5cbiAgJC5FdmVudCA9IGZ1bmN0aW9uKHR5cGUsIHByb3BzKSB7XG4gICAgaWYgKCFpc1N0cmluZyh0eXBlKSkgcHJvcHMgPSB0eXBlLCB0eXBlID0gcHJvcHMudHlwZVxuICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KHNwZWNpYWxFdmVudHNbdHlwZV0gfHwgJ0V2ZW50cycpLCBidWJibGVzID0gdHJ1ZVxuICAgIGlmIChwcm9wcykgZm9yICh2YXIgbmFtZSBpbiBwcm9wcykgKG5hbWUgPT0gJ2J1YmJsZXMnKSA/IChidWJibGVzID0gISFwcm9wc1tuYW1lXSkgOiAoZXZlbnRbbmFtZV0gPSBwcm9wc1tuYW1lXSlcbiAgICBldmVudC5pbml0RXZlbnQodHlwZSwgYnViYmxlcywgdHJ1ZSlcbiAgICByZXR1cm4gY29tcGF0aWJsZShldmVudClcbiAgfVxuXG59KShaZXB0bylcblxuOyhmdW5jdGlvbigkKXtcbiAgdmFyIGNhY2hlID0gW10sIHRpbWVvdXRcblxuICAkLmZuLnJlbW92ZSA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgaWYodGhpcy5wYXJlbnROb2RlKXtcbiAgICAgICAgaWYodGhpcy50YWdOYW1lID09PSAnSU1HJyl7XG4gICAgICAgICAgY2FjaGUucHVzaCh0aGlzKVxuICAgICAgICAgIHRoaXMuc3JjID0gJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBQUQvQUN3QUFBQUFBUUFCQUFBQ0FEcz0nXG4gICAgICAgICAgaWYgKHRpbWVvdXQpIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IGNhY2hlID0gW10gfSwgNjAwMDApXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSkoWmVwdG8pXG5cbjsoZnVuY3Rpb24oJCl7XG4gIHZhciBkYXRhID0ge30sIGRhdGFBdHRyID0gJC5mbi5kYXRhLCBjYW1lbGl6ZSA9ICQuY2FtZWxDYXNlLFxuICAgIGV4cCA9ICQuZXhwYW5kbyA9ICdaZXB0bycgKyAoK25ldyBEYXRlKCkpLCBlbXB0eUFycmF5ID0gW11cblxuICAvLyBHZXQgdmFsdWUgZnJvbSBub2RlOlxuICAvLyAxLiBmaXJzdCB0cnkga2V5IGFzIGdpdmVuLFxuICAvLyAyLiB0aGVuIHRyeSBjYW1lbGl6ZWQga2V5LFxuICAvLyAzLiBmYWxsIGJhY2sgdG8gcmVhZGluZyBcImRhdGEtKlwiIGF0dHJpYnV0ZS5cbiAgZnVuY3Rpb24gZ2V0RGF0YShub2RlLCBuYW1lKSB7XG4gICAgdmFyIGlkID0gbm9kZVtleHBdLCBzdG9yZSA9IGlkICYmIGRhdGFbaWRdXG4gICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHN0b3JlIHx8IHNldERhdGEobm9kZSlcbiAgICBlbHNlIHtcbiAgICAgIGlmIChzdG9yZSkge1xuICAgICAgICBpZiAobmFtZSBpbiBzdG9yZSkgcmV0dXJuIHN0b3JlW25hbWVdXG4gICAgICAgIHZhciBjYW1lbE5hbWUgPSBjYW1lbGl6ZShuYW1lKVxuICAgICAgICBpZiAoY2FtZWxOYW1lIGluIHN0b3JlKSByZXR1cm4gc3RvcmVbY2FtZWxOYW1lXVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRhdGFBdHRyLmNhbGwoJChub2RlKSwgbmFtZSlcbiAgICB9XG4gIH1cblxuICAvLyBTdG9yZSB2YWx1ZSB1bmRlciBjYW1lbGl6ZWQga2V5IG9uIG5vZGVcbiAgZnVuY3Rpb24gc2V0RGF0YShub2RlLCBuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBpZCA9IG5vZGVbZXhwXSB8fCAobm9kZVtleHBdID0gKyskLnV1aWQpLFxuICAgICAgc3RvcmUgPSBkYXRhW2lkXSB8fCAoZGF0YVtpZF0gPSBhdHRyaWJ1dGVEYXRhKG5vZGUpKVxuICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHN0b3JlW2NhbWVsaXplKG5hbWUpXSA9IHZhbHVlXG4gICAgcmV0dXJuIHN0b3JlXG4gIH1cblxuICAvLyBSZWFkIGFsbCBcImRhdGEtKlwiIGF0dHJpYnV0ZXMgZnJvbSBhIG5vZGVcbiAgZnVuY3Rpb24gYXR0cmlidXRlRGF0YShub2RlKSB7XG4gICAgdmFyIHN0b3JlID0ge31cbiAgICAkLmVhY2gobm9kZS5hdHRyaWJ1dGVzIHx8IGVtcHR5QXJyYXksIGZ1bmN0aW9uKGksIGF0dHIpe1xuICAgICAgaWYgKGF0dHIubmFtZS5pbmRleE9mKCdkYXRhLScpID09IDApXG4gICAgICAgIHN0b3JlW2NhbWVsaXplKGF0dHIubmFtZS5yZXBsYWNlKCdkYXRhLScsICcnKSldID1cbiAgICAgICAgICAkLnplcHRvLmRlc2VyaWFsaXplVmFsdWUoYXR0ci52YWx1ZSlcbiAgICB9KVxuICAgIHJldHVybiBzdG9yZVxuICB9XG5cbiAgJC5mbi5kYXRhID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG4gICAgICAvLyBzZXQgbXVsdGlwbGUgdmFsdWVzIHZpYSBvYmplY3RcbiAgICAgICQuaXNQbGFpbk9iamVjdChuYW1lKSA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpLCBub2RlKXtcbiAgICAgICAgICAkLmVhY2gobmFtZSwgZnVuY3Rpb24oa2V5LCB2YWx1ZSl7IHNldERhdGEobm9kZSwga2V5LCB2YWx1ZSkgfSlcbiAgICAgICAgfSkgOlxuICAgICAgICAvLyBnZXQgdmFsdWUgZnJvbSBmaXJzdCBlbGVtZW50XG4gICAgICAgICgwIGluIHRoaXMgPyBnZXREYXRhKHRoaXNbMF0sIG5hbWUpIDogdW5kZWZpbmVkKSA6XG4gICAgICAvLyBzZXQgdmFsdWUgb24gYWxsIGVsZW1lbnRzXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKXsgc2V0RGF0YSh0aGlzLCBuYW1lLCB2YWx1ZSkgfSlcbiAgfVxuXG4gICQuZGF0YSA9IGZ1bmN0aW9uKGVsZW0sIG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuICQoZWxlbSkuZGF0YShuYW1lLCB2YWx1ZSlcbiAgfVxuXG4gICQuaGFzRGF0YSA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICB2YXIgaWQgPSBlbGVtW2V4cF0sIHN0b3JlID0gaWQgJiYgZGF0YVtpZF1cbiAgICByZXR1cm4gc3RvcmUgPyAhJC5pc0VtcHR5T2JqZWN0KHN0b3JlKSA6IGZhbHNlXG4gIH1cblxuICAkLmZuLnJlbW92ZURhdGEgPSBmdW5jdGlvbihuYW1lcykge1xuICAgIGlmICh0eXBlb2YgbmFtZXMgPT0gJ3N0cmluZycpIG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccysvKVxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciBpZCA9IHRoaXNbZXhwXSwgc3RvcmUgPSBpZCAmJiBkYXRhW2lkXVxuICAgICAgaWYgKHN0b3JlKSAkLmVhY2gobmFtZXMgfHwgc3RvcmUsIGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIGRlbGV0ZSBzdG9yZVtuYW1lcyA/IGNhbWVsaXplKHRoaXMpIDoga2V5XVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gR2VuZXJhdGUgZXh0ZW5kZWQgYHJlbW92ZWAgYW5kIGBlbXB0eWAgZnVuY3Rpb25zXG4gIDtbJ3JlbW92ZScsICdlbXB0eSddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSl7XG4gICAgdmFyIG9yaWdGbiA9ICQuZm5bbWV0aG9kTmFtZV1cbiAgICAkLmZuW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZWxlbWVudHMgPSB0aGlzLmZpbmQoJyonKVxuICAgICAgaWYgKG1ldGhvZE5hbWUgPT09ICdyZW1vdmUnKSBlbGVtZW50cyA9IGVsZW1lbnRzLmFkZCh0aGlzKVxuICAgICAgZWxlbWVudHMucmVtb3ZlRGF0YSgpXG4gICAgICByZXR1cm4gb3JpZ0ZuLmNhbGwodGhpcylcbiAgICB9XG4gIH0pXG59KShaZXB0bylcbiAgcmV0dXJuIFplcHRvXG59KSlcbiIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG5cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbn1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXG4gKi9cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxufVxcblxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0IHsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHsgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1BY21lJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIGJhY2tQdWxzZSB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcXG4gIH1cXG59XFxuQGtleWZyYW1lcyBiYWNrUHVsc2Uge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgfVxcbiAgdG8ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4yKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XFxuICB9XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBiYWNrT3V0RG93biB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMjAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgpIHNjYWxlKDAuNyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4KSBzY2FsZSgwLjcpO1xcbiAgICBvcGFjaXR5OiAwLjc7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNzAwcHgpIHNjYWxlKDAuNyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDcwMHB4KSBzY2FsZSgwLjcpO1xcbiAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJhY2tPdXREb3duIHtcXG4gIDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAyMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCkgc2NhbGUoMC43KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgpIHNjYWxlKDAuNyk7XFxuICAgIG9wYWNpdHk6IDAuNztcXG4gIH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSg3MDBweCkgc2NhbGUoMC43KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNzAwcHgpIHNjYWxlKDAuNyk7XFxuICB9XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBiYWNrT3V0VXAge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDIwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4KSBzY2FsZSgwLjcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCkgc2NhbGUoMC43KTtcXG4gICAgb3BhY2l0eTogMC43O1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03MDBweCkgc2NhbGUoMC43KTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwMHB4KSBzY2FsZSgwLjcpO1xcbiAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJhY2tPdXRVcCB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMjAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwcHgpIHNjYWxlKDAuNyk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4KSBzY2FsZSgwLjcpO1xcbiAgICBvcGFjaXR5OiAwLjc7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwMHB4KSBzY2FsZSgwLjcpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzAwcHgpIHNjYWxlKDAuNyk7XFxuICB9XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBjb2xvcjogI2ZiYWYwMDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQWNtZVxcXCIsIHNhbnMtc2VyaWY7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4jbG9hZGluZy1jb250YWluZXIge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jbG9hZGluZy1jb250YWluZXIgaW1nIHtcXG4gIHdpZHRoOiAxMHZ3O1xcbn1cXG5cXG4jc2VhcmNoLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIG1pbi13aWR0aDogNzAwcHg7XFxufVxcblxcbiNzZWFyY2gtY29udGFpbmVyIGgxIHtcXG4gIGxpbmUtaGVpZ2h0OiAxMDhweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDQuNnZoO1xcbiAgY29sb3I6ICM5OTdmNDE7XFxufVxcblxcbiNzZWFyY2gtY29udGFpbmVyIC5zZWFyY2gtYnRuIHtcXG4gIGZvbnQtc2l6ZTogMS41ZW07XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBjb2xvcjogIzk5N2Y0MTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM5OTdmNDE7XFxufVxcblxcbiNzZWFyY2gtY29udGFpbmVyIC5zZWFyY2gtYnRuOmhvdmVyIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjVzO1xcbiAgICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDAuNXM7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xcbiAgICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6IGJhY2tQdWxzZTtcXG4gICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJhY2tQdWxzZTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xcbiAgICAgICAgICBhbmltYXRpb24tZGlyZWN0aW9uOiBhbHRlcm5hdGU7XFxuICAtd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XFxuICAgICAgICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMDtcXG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jc2VhcmNoLWNvbnRhaW5lciAjc2VhcmNoLXF1ZXJ5LFxcbiNzZWFyY2gtY29udGFpbmVyIC5hcC1uYW1lIHtcXG4gIGNvbG9yOiAjM2E3Y2E1O1xcbn1cXG5cXG4uYmFja091dFVwIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXG4gICAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXG4gIC13ZWJraXQtYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTtcXG4gICAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6IGJhY2tPdXRVcDtcXG4gICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJhY2tPdXRVcDtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgICAgICBhbmltYXRpb24tZGlyZWN0aW9uOiBub3JtYWw7XFxuICAtd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XFxuICAgICAgICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XFxuICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4zO1xcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuMztcXG59XFxuXFxuLmJhY2tPdXREb3duIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXG4gICAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxcztcXG4gIC13ZWJraXQtYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTtcXG4gICAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6IGJhY2tPdXREb3duO1xcbiAgICAgICAgICBhbmltYXRpb24tbmFtZTogYmFja091dERvd247XFxuICAtd2Via2l0LWFuaW1hdGlvbi1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAgICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgLXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xcbiAgICAgICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xcbiAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuMztcXG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjM7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmFsZ29saWEtcGxhY2VzIHtcXG4gIHdpZHRoOiA1MCU7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG5idXR0b24uYXAtaW5wdXQtaWNvbjpudGgtY2hpbGQoNSkge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI3Jlc3VsdC1jb250YWluZXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI3Jlc3VsdC1jb250YWluZXIgI2xvY2F0aW9uLW5hbWUge1xcbiAgaGVpZ2h0OiAxMHZoO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjd2VhdGhlci1jb250YWluZXIge1xcbiAgaGVpZ2h0OiA0NXZoO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1wYWNrOiBkaXN0cmlidXRlO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjdGVtcGVyYXR1cmUtY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQ6ICMwYzU1NGU7XFxuICBoZWlnaHQ6IDYwJTtcXG4gIHdpZHRoOiAyNXZ3O1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxufVxcblxcbiNyZXN1bHQtY29udGFpbmVyICNjb25kaXRpb24tY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQ6ICMwYzU1NGU7XFxuICBoZWlnaHQ6IDYwJTtcXG4gIHdpZHRoOiAyNXZ3O1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiNyZXN1bHQtY29udGFpbmVyICNjaGFuZ2UtdGVtcCB7XFxuICBmb250LXNpemU6IDIuM3Z3O1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjY2hhbmdlLXRlbXAgYnV0dG9uIHtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJhY2tncm91bmQ6ICM2MDMxYTQ7XFxuICBjb2xvcjogI2ZmYjMwMDtcXG4gIHdpZHRoOiA0MCU7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI3Jlc3VsdC1jb250YWluZXIgI2NoYW5nZS10ZW1wIGJ1dHRvbjpob3ZlciB7XFxuICBvcGFjaXR5OiAwLjg7XFxuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcXG59XFxuXFxuI3Jlc3VsdC1jb250YWluZXIgI2NoYW5nZS10ZW1wIGJ1dHRvbjphY3RpdmUge1xcbiAgb3BhY2l0eTogMC41O1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjdGVtcC1pbmZvLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIC13ZWJraXQtYm94LXBhY2s6IHNwYWNlLWV2ZW5seTtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBzcGFjZS1ldmVubHk7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgd2lkdGg6IDUwJTtcXG59XFxuXFxuI3Jlc3VsdC1jb250YWluZXIgI2NvbmRpdGlvbiB7XFxuICBmb250LXNpemU6IDMuMzd2dztcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuI3Jlc3VsdC1jb250YWluZXIgI3RlbXBlcmF0dXJlIHtcXG4gIGZvbnQtc2l6ZTogNC42dnc7XFxuICBtYXJnaW46IDA7XFxuICB6LWluZGV4OiAxO1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjc2VhcmNoLWJ0biB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzIGxpbmVhcjtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGxpbmVhcjtcXG4gIG1heC1oZWlnaHQ6IDIwMHB4O1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciAjc2VhcmNoLWJ0bjpob3ZlciB7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMCAxNXB4ICM3OGI5ZWI7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCAxNXB4ICM3OGI5ZWI7XFxufVxcblxcbiNyZXN1bHQtY29udGFpbmVyIGlmcmFtZSB7XFxuICBoZWlnaHQ6IDM1dmg7XFxuICB3aWR0aDogNTAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xcbn1cXG5cXG4jcmVzdWx0LWNvbnRhaW5lciBpbWdbc3JjJD0nLnN2ZyddIHtcXG4gIGhlaWdodDogNzAlO1xcbiAgbWF4LXdpZHRoOiA1MCU7XFxufVxcblxcbi5GOjphZnRlciB7XFxuICBjb250ZW50OiAnXFxcXDIxMDknO1xcbn1cXG5cXG4uQzo6YWZ0ZXIge1xcbiAgY29udGVudDogJ1xcXFwyMTAzJztcXG59XCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8ICcnKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICByZXR1cm4gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xufSIsIi8qIVxuICogQG92ZXJ2aWV3IGVzNi1wcm9taXNlIC0gYSB0aW55IGltcGxlbWVudGF0aW9uIG9mIFByb21pc2VzL0ErLlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTQgWWVodWRhIEthdHosIFRvbSBEYWxlLCBTdGVmYW4gUGVubmVyIGFuZCBjb250cmlidXRvcnMgKENvbnZlcnNpb24gdG8gRVM2IEFQSSBieSBKYWtlIEFyY2hpYmFsZClcbiAqIEBsaWNlbnNlICAgTGljZW5zZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqICAgICAgICAgICAgU2VlIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9zdGVmYW5wZW5uZXIvZXM2LXByb21pc2UvbWFzdGVyL0xJQ0VOU0VcbiAqIEB2ZXJzaW9uICAgdjQuMi44KzFlNjhkY2U2XG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLkVTNlByb21pc2UgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9iamVjdE9yRnVuY3Rpb24oeCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB4O1xuICByZXR1cm4geCAhPT0gbnVsbCAmJiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cblxuXG52YXIgX2lzQXJyYXkgPSB2b2lkIDA7XG5pZiAoQXJyYXkuaXNBcnJheSkge1xuICBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG59IGVsc2Uge1xuICBfaXNBcnJheSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcbn1cblxudmFyIGlzQXJyYXkgPSBfaXNBcnJheTtcblxudmFyIGxlbiA9IDA7XG52YXIgdmVydHhOZXh0ID0gdm9pZCAwO1xudmFyIGN1c3RvbVNjaGVkdWxlckZuID0gdm9pZCAwO1xuXG52YXIgYXNhcCA9IGZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGFyZykge1xuICBxdWV1ZVtsZW5dID0gY2FsbGJhY2s7XG4gIHF1ZXVlW2xlbiArIDFdID0gYXJnO1xuICBsZW4gKz0gMjtcbiAgaWYgKGxlbiA9PT0gMikge1xuICAgIC8vIElmIGxlbiBpcyAyLCB0aGF0IG1lYW5zIHRoYXQgd2UgbmVlZCB0byBzY2hlZHVsZSBhbiBhc3luYyBmbHVzaC5cbiAgICAvLyBJZiBhZGRpdGlvbmFsIGNhbGxiYWNrcyBhcmUgcXVldWVkIGJlZm9yZSB0aGUgcXVldWUgaXMgZmx1c2hlZCwgdGhleVxuICAgIC8vIHdpbGwgYmUgcHJvY2Vzc2VkIGJ5IHRoaXMgZmx1c2ggdGhhdCB3ZSBhcmUgc2NoZWR1bGluZy5cbiAgICBpZiAoY3VzdG9tU2NoZWR1bGVyRm4pIHtcbiAgICAgIGN1c3RvbVNjaGVkdWxlckZuKGZsdXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NoZWR1bGVGbHVzaCgpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gc2V0U2NoZWR1bGVyKHNjaGVkdWxlRm4pIHtcbiAgY3VzdG9tU2NoZWR1bGVyRm4gPSBzY2hlZHVsZUZuO1xufVxuXG5mdW5jdGlvbiBzZXRBc2FwKGFzYXBGbikge1xuICBhc2FwID0gYXNhcEZuO1xufVxuXG52YXIgYnJvd3NlcldpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdW5kZWZpbmVkO1xudmFyIGJyb3dzZXJHbG9iYWwgPSBicm93c2VyV2luZG93IHx8IHt9O1xudmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gYnJvd3Nlckdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGJyb3dzZXJHbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBpc05vZGUgPSB0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHt9LnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcblxuLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbnZhciBpc1dvcmtlciA9IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIG5vZGVcbmZ1bmN0aW9uIHVzZU5leHRUaWNrKCkge1xuICAvLyBub2RlIHZlcnNpb24gMC4xMC54IGRpc3BsYXlzIGEgZGVwcmVjYXRpb24gd2FybmluZyB3aGVuIG5leHRUaWNrIGlzIHVzZWQgcmVjdXJzaXZlbHlcbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jdWpvanMvd2hlbi9pc3N1ZXMvNDEwIGZvciBkZXRhaWxzXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICB9O1xufVxuXG4vLyB2ZXJ0eFxuZnVuY3Rpb24gdXNlVmVydHhUaW1lcigpIHtcbiAgaWYgKHR5cGVvZiB2ZXJ0eE5leHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZlcnR4TmV4dChmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XG59XG5cbmZ1bmN0aW9uIHVzZU11dGF0aW9uT2JzZXJ2ZXIoKSB7XG4gIHZhciBpdGVyYXRpb25zID0gMDtcbiAgdmFyIG9ic2VydmVyID0gbmV3IEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gIG9ic2VydmVyLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgbm9kZS5kYXRhID0gaXRlcmF0aW9ucyA9ICsraXRlcmF0aW9ucyAlIDI7XG4gIH07XG59XG5cbi8vIHdlYiB3b3JrZXJcbmZ1bmN0aW9uIHVzZU1lc3NhZ2VDaGFubmVsKCkge1xuICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZsdXNoO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1c2VTZXRUaW1lb3V0KCkge1xuICAvLyBTdG9yZSBzZXRUaW1lb3V0IHJlZmVyZW5jZSBzbyBlczYtcHJvbWlzZSB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbiAgLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG4gIHZhciBnbG9iYWxTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2xvYmFsU2V0VGltZW91dChmbHVzaCwgMSk7XG4gIH07XG59XG5cbnZhciBxdWV1ZSA9IG5ldyBBcnJheSgxMDAwKTtcbmZ1bmN0aW9uIGZsdXNoKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gcXVldWVbaV07XG4gICAgdmFyIGFyZyA9IHF1ZXVlW2kgKyAxXTtcblxuICAgIGNhbGxiYWNrKGFyZyk7XG5cbiAgICBxdWV1ZVtpXSA9IHVuZGVmaW5lZDtcbiAgICBxdWV1ZVtpICsgMV0gPSB1bmRlZmluZWQ7XG4gIH1cblxuICBsZW4gPSAwO1xufVxuXG5mdW5jdGlvbiBhdHRlbXB0VmVydHgoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHZlcnR4ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKS5yZXF1aXJlKCd2ZXJ0eCcpO1xuICAgIHZlcnR4TmV4dCA9IHZlcnR4LnJ1bk9uTG9vcCB8fCB2ZXJ0eC5ydW5PbkNvbnRleHQ7XG4gICAgcmV0dXJuIHVzZVZlcnR4VGltZXIoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB1c2VTZXRUaW1lb3V0KCk7XG4gIH1cbn1cblxudmFyIHNjaGVkdWxlRmx1c2ggPSB2b2lkIDA7XG4vLyBEZWNpZGUgd2hhdCBhc3luYyBtZXRob2QgdG8gdXNlIHRvIHRyaWdnZXJpbmcgcHJvY2Vzc2luZyBvZiBxdWV1ZWQgY2FsbGJhY2tzOlxuaWYgKGlzTm9kZSkge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlTmV4dFRpY2soKTtcbn0gZWxzZSBpZiAoQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU11dGF0aW9uT2JzZXJ2ZXIoKTtcbn0gZWxzZSBpZiAoaXNXb3JrZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCA9IHVzZU1lc3NhZ2VDaGFubmVsKCk7XG59IGVsc2UgaWYgKGJyb3dzZXJXaW5kb3cgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICBzY2hlZHVsZUZsdXNoID0gYXR0ZW1wdFZlcnR4KCk7XG59IGVsc2Uge1xuICBzY2hlZHVsZUZsdXNoID0gdXNlU2V0VGltZW91dCgpO1xufVxuXG5mdW5jdGlvbiB0aGVuKG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzO1xuXG4gIHZhciBjaGlsZCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG4gIGlmIChjaGlsZFtQUk9NSVNFX0lEXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWFrZVByb21pc2UoY2hpbGQpO1xuICB9XG5cbiAgdmFyIF9zdGF0ZSA9IHBhcmVudC5fc3RhdGU7XG5cblxuICBpZiAoX3N0YXRlKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzW19zdGF0ZSAtIDFdO1xuICAgIGFzYXAoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGludm9rZUNhbGxiYWNrKF9zdGF0ZSwgY2hpbGQsIGNhbGxiYWNrLCBwYXJlbnQuX3Jlc3VsdCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKTtcbiAgfVxuXG4gIHJldHVybiBjaGlsZDtcbn1cblxuLyoqXG4gIGBQcm9taXNlLnJlc29sdmVgIHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZWNvbWUgcmVzb2x2ZWQgd2l0aCB0aGVcbiAgcGFzc2VkIGB2YWx1ZWAuIEl0IGlzIHNob3J0aGFuZCBmb3IgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZXNvbHZlKDEpO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIHZhbHVlID09PSAxXG4gIH0pO1xuICBgYGBcblxuICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgxKTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIHZhbHVlID09PSAxXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIHJlc29sdmVcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FueX0gdmFsdWUgdmFsdWUgdGhhdCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGhcbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSBmdWxmaWxsZWQgd2l0aCB0aGUgZ2l2ZW5cbiAgYHZhbHVlYFxuKi9cbmZ1bmN0aW9uIHJlc29sdmUkMShvYmplY3QpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICBpZiAob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCk7XG4gIHJlc29sdmUocHJvbWlzZSwgb2JqZWN0KTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbnZhciBQUk9NSVNFX0lEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIpO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxudmFyIFBFTkRJTkcgPSB2b2lkIDA7XG52YXIgRlVMRklMTEVEID0gMTtcbnZhciBSRUpFQ1RFRCA9IDI7XG5cbmZ1bmN0aW9uIHNlbGZGdWxmaWxsbWVudCgpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoXCJZb3UgY2Fubm90IHJlc29sdmUgYSBwcm9taXNlIHdpdGggaXRzZWxmXCIpO1xufVxuXG5mdW5jdGlvbiBjYW5ub3RSZXR1cm5Pd24oKSB7XG4gIHJldHVybiBuZXcgVHlwZUVycm9yKCdBIHByb21pc2VzIGNhbGxiYWNrIGNhbm5vdCByZXR1cm4gdGhhdCBzYW1lIHByb21pc2UuJyk7XG59XG5cbmZ1bmN0aW9uIHRyeVRoZW4odGhlbiQkMSwgdmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcikge1xuICB0cnkge1xuICAgIHRoZW4kJDEuY2FsbCh2YWx1ZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUZvcmVpZ25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSwgdGhlbiQkMSkge1xuICBhc2FwKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgdmFyIHNlYWxlZCA9IGZhbHNlO1xuICAgIHZhciBlcnJvciA9IHRyeVRoZW4odGhlbiQkMSwgdGhlbmFibGUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHNlYWxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgaWYgKHRoZW5hYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmIChzZWFsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VhbGVkID0gdHJ1ZTtcblxuICAgICAgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gICAgfSwgJ1NldHRsZTogJyArIChwcm9taXNlLl9sYWJlbCB8fCAnIHVua25vd24gcHJvbWlzZScpKTtcblxuICAgIGlmICghc2VhbGVkICYmIGVycm9yKSB7XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICB9XG4gIH0sIHByb21pc2UpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVPd25UaGVuYWJsZShwcm9taXNlLCB0aGVuYWJsZSkge1xuICBpZiAodGhlbmFibGUuX3N0YXRlID09PSBGVUxGSUxMRUQpIHtcbiAgICBmdWxmaWxsKHByb21pc2UsIHRoZW5hYmxlLl9yZXN1bHQpO1xuICB9IGVsc2UgaWYgKHRoZW5hYmxlLl9zdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICByZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHRoZW5hYmxlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHJldHVybiByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVNYXliZVRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJDEpIHtcbiAgaWYgKG1heWJlVGhlbmFibGUuY29uc3RydWN0b3IgPT09IHByb21pc2UuY29uc3RydWN0b3IgJiYgdGhlbiQkMSA9PT0gdGhlbiAmJiBtYXliZVRoZW5hYmxlLmNvbnN0cnVjdG9yLnJlc29sdmUgPT09IHJlc29sdmUkMSkge1xuICAgIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICB9IGVsc2Uge1xuICAgIGlmICh0aGVuJCQxID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoZW4kJDEpKSB7XG4gICAgICBoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZ1bGZpbGwocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgcmVqZWN0KHByb21pc2UsIHNlbGZGdWxmaWxsbWVudCgpKTtcbiAgfSBlbHNlIGlmIChvYmplY3RPckZ1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciB0aGVuJCQxID0gdm9pZCAwO1xuICAgIHRyeSB7XG4gICAgICB0aGVuJCQxID0gdmFsdWUudGhlbjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSwgdGhlbiQkMSk7XG4gIH0gZWxzZSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVibGlzaFJlamVjdGlvbihwcm9taXNlKSB7XG4gIGlmIChwcm9taXNlLl9vbmVycm9yKSB7XG4gICAgcHJvbWlzZS5fb25lcnJvcihwcm9taXNlLl9yZXN1bHQpO1xuICB9XG5cbiAgcHVibGlzaChwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gZnVsZmlsbChwcm9taXNlLCB2YWx1ZSkge1xuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBwcm9taXNlLl9yZXN1bHQgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fc3RhdGUgPSBGVUxGSUxMRUQ7XG5cbiAgaWYgKHByb21pc2UuX3N1YnNjcmliZXJzLmxlbmd0aCAhPT0gMCkge1xuICAgIGFzYXAocHVibGlzaCwgcHJvbWlzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVqZWN0KHByb21pc2UsIHJlYXNvbikge1xuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcHJvbWlzZS5fc3RhdGUgPSBSRUpFQ1RFRDtcbiAgcHJvbWlzZS5fcmVzdWx0ID0gcmVhc29uO1xuXG4gIGFzYXAocHVibGlzaFJlamVjdGlvbiwgcHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIHN1YnNjcmliZShwYXJlbnQsIGNoaWxkLCBvbkZ1bGZpbGxtZW50LCBvblJlamVjdGlvbikge1xuICB2YXIgX3N1YnNjcmliZXJzID0gcGFyZW50Ll9zdWJzY3JpYmVycztcbiAgdmFyIGxlbmd0aCA9IF9zdWJzY3JpYmVycy5sZW5ndGg7XG5cblxuICBwYXJlbnQuX29uZXJyb3IgPSBudWxsO1xuXG4gIF9zdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gIF9zdWJzY3JpYmVyc1tsZW5ndGggKyBGVUxGSUxMRURdID0gb25GdWxmaWxsbWVudDtcbiAgX3N1YnNjcmliZXJzW2xlbmd0aCArIFJFSkVDVEVEXSA9IG9uUmVqZWN0aW9uO1xuXG4gIGlmIChsZW5ndGggPT09IDAgJiYgcGFyZW50Ll9zdGF0ZSkge1xuICAgIGFzYXAocHVibGlzaCwgcGFyZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdWJsaXNoKHByb21pc2UpIHtcbiAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBjaGlsZCA9IHZvaWQgMCxcbiAgICAgIGNhbGxiYWNrID0gdm9pZCAwLFxuICAgICAgZGV0YWlsID0gcHJvbWlzZS5fcmVzdWx0O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICBjaGlsZCA9IHN1YnNjcmliZXJzW2ldO1xuICAgIGNhbGxiYWNrID0gc3Vic2NyaWJlcnNbaSArIHNldHRsZWRdO1xuXG4gICAgaWYgKGNoaWxkKSB7XG4gICAgICBpbnZva2VDYWxsYmFjayhzZXR0bGVkLCBjaGlsZCwgY2FsbGJhY2ssIGRldGFpbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKGRldGFpbCk7XG4gICAgfVxuICB9XG5cbiAgcHJvbWlzZS5fc3Vic2NyaWJlcnMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gaW52b2tlQ2FsbGJhY2soc2V0dGxlZCwgcHJvbWlzZSwgY2FsbGJhY2ssIGRldGFpbCkge1xuICB2YXIgaGFzQ2FsbGJhY2sgPSBpc0Z1bmN0aW9uKGNhbGxiYWNrKSxcbiAgICAgIHZhbHVlID0gdm9pZCAwLFxuICAgICAgZXJyb3IgPSB2b2lkIDAsXG4gICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuXG4gIGlmIChoYXNDYWxsYmFjaykge1xuICAgIHRyeSB7XG4gICAgICB2YWx1ZSA9IGNhbGxiYWNrKGRldGFpbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgICBlcnJvciA9IGU7XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgY2Fubm90UmV0dXJuT3duKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IGRldGFpbDtcbiAgfVxuXG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIC8vIG5vb3BcbiAgfSBlbHNlIGlmIChoYXNDYWxsYmFjayAmJiBzdWNjZWVkZWQpIHtcbiAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgfSBlbHNlIGlmIChzdWNjZWVkZWQgPT09IGZhbHNlKSB7XG4gICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBGVUxGSUxMRUQpIHtcbiAgICBmdWxmaWxsKHByb21pc2UsIHZhbHVlKTtcbiAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBSRUpFQ1RFRCkge1xuICAgIHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVByb21pc2UocHJvbWlzZSwgcmVzb2x2ZXIpIHtcbiAgdHJ5IHtcbiAgICByZXNvbHZlcihmdW5jdGlvbiByZXNvbHZlUHJvbWlzZSh2YWx1ZSkge1xuICAgICAgcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSwgZnVuY3Rpb24gcmVqZWN0UHJvbWlzZShyZWFzb24pIHtcbiAgICAgIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVqZWN0KHByb21pc2UsIGUpO1xuICB9XG59XG5cbnZhciBpZCA9IDA7XG5mdW5jdGlvbiBuZXh0SWQoKSB7XG4gIHJldHVybiBpZCsrO1xufVxuXG5mdW5jdGlvbiBtYWtlUHJvbWlzZShwcm9taXNlKSB7XG4gIHByb21pc2VbUFJPTUlTRV9JRF0gPSBpZCsrO1xuICBwcm9taXNlLl9zdGF0ZSA9IHVuZGVmaW5lZDtcbiAgcHJvbWlzZS5fcmVzdWx0ID0gdW5kZWZpbmVkO1xuICBwcm9taXNlLl9zdWJzY3JpYmVycyA9IFtdO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0aW9uRXJyb3IoKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoJ0FycmF5IE1ldGhvZHMgbXVzdCBiZSBwcm92aWRlZCBhbiBBcnJheScpO1xufVxuXG52YXIgRW51bWVyYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRW51bWVyYXRvcihDb25zdHJ1Y3RvciwgaW5wdXQpIHtcbiAgICB0aGlzLl9pbnN0YW5jZUNvbnN0cnVjdG9yID0gQ29uc3RydWN0b3I7XG4gICAgdGhpcy5wcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xuXG4gICAgaWYgKCF0aGlzLnByb21pc2VbUFJPTUlTRV9JRF0pIHtcbiAgICAgIG1ha2VQcm9taXNlKHRoaXMucHJvbWlzZSk7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcbiAgICAgIHRoaXMuX3JlbWFpbmluZyA9IGlucHV0Lmxlbmd0aDtcblxuICAgICAgdGhpcy5fcmVzdWx0ID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKTtcblxuICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmxlbmd0aCB8fCAwO1xuICAgICAgICB0aGlzLl9lbnVtZXJhdGUoaW5wdXQpO1xuICAgICAgICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVqZWN0KHRoaXMucHJvbWlzZSwgdmFsaWRhdGlvbkVycm9yKCkpO1xuICAgIH1cbiAgfVxuXG4gIEVudW1lcmF0b3IucHJvdG90eXBlLl9lbnVtZXJhdGUgPSBmdW5jdGlvbiBfZW51bWVyYXRlKGlucHV0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IHRoaXMuX3N0YXRlID09PSBQRU5ESU5HICYmIGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fZWFjaEVudHJ5KGlucHV0W2ldLCBpKTtcbiAgICB9XG4gIH07XG5cbiAgRW51bWVyYXRvci5wcm90b3R5cGUuX2VhY2hFbnRyeSA9IGZ1bmN0aW9uIF9lYWNoRW50cnkoZW50cnksIGkpIHtcbiAgICB2YXIgYyA9IHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3I7XG4gICAgdmFyIHJlc29sdmUkJDEgPSBjLnJlc29sdmU7XG5cblxuICAgIGlmIChyZXNvbHZlJCQxID09PSByZXNvbHZlJDEpIHtcbiAgICAgIHZhciBfdGhlbiA9IHZvaWQgMDtcbiAgICAgIHZhciBlcnJvciA9IHZvaWQgMDtcbiAgICAgIHZhciBkaWRFcnJvciA9IGZhbHNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgX3RoZW4gPSBlbnRyeS50aGVuO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkaWRFcnJvciA9IHRydWU7XG4gICAgICAgIGVycm9yID0gZTtcbiAgICAgIH1cblxuICAgICAgaWYgKF90aGVuID09PSB0aGVuICYmIGVudHJ5Ll9zdGF0ZSAhPT0gUEVORElORykge1xuICAgICAgICB0aGlzLl9zZXR0bGVkQXQoZW50cnkuX3N0YXRlLCBpLCBlbnRyeS5fcmVzdWx0KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIF90aGVuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuICAgICAgICB0aGlzLl9yZXN1bHRbaV0gPSBlbnRyeTtcbiAgICAgIH0gZWxzZSBpZiAoYyA9PT0gUHJvbWlzZSQxKSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IGMobm9vcCk7XG4gICAgICAgIGlmIChkaWRFcnJvcikge1xuICAgICAgICAgIHJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCBlbnRyeSwgX3RoZW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3dpbGxTZXR0bGVBdChuZXcgYyhmdW5jdGlvbiAocmVzb2x2ZSQkMSkge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlJCQxKGVudHJ5KTtcbiAgICAgICAgfSksIGkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93aWxsU2V0dGxlQXQocmVzb2x2ZSQkMShlbnRyeSksIGkpO1xuICAgIH1cbiAgfTtcblxuICBFbnVtZXJhdG9yLnByb3RvdHlwZS5fc2V0dGxlZEF0ID0gZnVuY3Rpb24gX3NldHRsZWRBdChzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMucHJvbWlzZTtcblxuXG4gICAgaWYgKHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgICB0aGlzLl9yZW1haW5pbmctLTtcblxuICAgICAgaWYgKHN0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgICAgICByZWplY3QocHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0W2ldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgIH1cbiAgfTtcblxuICBFbnVtZXJhdG9yLnByb3RvdHlwZS5fd2lsbFNldHRsZUF0ID0gZnVuY3Rpb24gX3dpbGxTZXR0bGVBdChwcm9taXNlLCBpKSB7XG4gICAgdmFyIGVudW1lcmF0b3IgPSB0aGlzO1xuXG4gICAgc3Vic2NyaWJlKHByb21pc2UsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZW51bWVyYXRvci5fc2V0dGxlZEF0KEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIHJldHVybiBlbnVtZXJhdG9yLl9zZXR0bGVkQXQoUkVKRUNURUQsIGksIHJlYXNvbik7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEVudW1lcmF0b3I7XG59KCk7XG5cbi8qKlxuICBgUHJvbWlzZS5hbGxgIGFjY2VwdHMgYW4gYXJyYXkgb2YgcHJvbWlzZXMsIGFuZCByZXR1cm5zIGEgbmV3IHByb21pc2Ugd2hpY2hcbiAgaXMgZnVsZmlsbGVkIHdpdGggYW4gYXJyYXkgb2YgZnVsZmlsbG1lbnQgdmFsdWVzIGZvciB0aGUgcGFzc2VkIHByb21pc2VzLCBvclxuICByZWplY3RlZCB3aXRoIHRoZSByZWFzb24gb2YgdGhlIGZpcnN0IHBhc3NlZCBwcm9taXNlIHRvIGJlIHJlamVjdGVkLiBJdCBjYXN0cyBhbGxcbiAgZWxlbWVudHMgb2YgdGhlIHBhc3NlZCBpdGVyYWJsZSB0byBwcm9taXNlcyBhcyBpdCBydW5zIHRoaXMgYWxnb3JpdGhtLlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSByZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSByZXNvbHZlKDIpO1xuICBsZXQgcHJvbWlzZTMgPSByZXNvbHZlKDMpO1xuICBsZXQgcHJvbWlzZXMgPSBbIHByb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTMgXTtcblxuICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gVGhlIGFycmF5IGhlcmUgd291bGQgYmUgWyAxLCAyLCAzIF07XG4gIH0pO1xuICBgYGBcblxuICBJZiBhbnkgb2YgdGhlIGBwcm9taXNlc2AgZ2l2ZW4gdG8gYGFsbGAgYXJlIHJlamVjdGVkLCB0aGUgZmlyc3QgcHJvbWlzZVxuICB0aGF0IGlzIHJlamVjdGVkIHdpbGwgYmUgZ2l2ZW4gYXMgYW4gYXJndW1lbnQgdG8gdGhlIHJldHVybmVkIHByb21pc2VzJ3NcbiAgcmVqZWN0aW9uIGhhbmRsZXIuIEZvciBleGFtcGxlOlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSByZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSByZWplY3QobmV3IEVycm9yKFwiMlwiKSk7XG4gIGxldCBwcm9taXNlMyA9IHJlamVjdChuZXcgRXJyb3IoXCIzXCIpKTtcbiAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XG5cbiAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zIGJlY2F1c2UgdGhlcmUgYXJlIHJlamVjdGVkIHByb21pc2VzIVxuICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgIC8vIGVycm9yLm1lc3NhZ2UgPT09IFwiMlwiXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIGFsbFxuICBAc3RhdGljXG4gIEBwYXJhbSB7QXJyYXl9IGVudHJpZXMgYXJyYXkgb2YgcHJvbWlzZXNcbiAgQHBhcmFtIHtTdHJpbmd9IGxhYmVsIG9wdGlvbmFsIHN0cmluZyBmb3IgbGFiZWxpbmcgdGhlIHByb21pc2UuXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aGVuIGFsbCBgcHJvbWlzZXNgIGhhdmUgYmVlblxuICBmdWxmaWxsZWQsIG9yIHJlamVjdGVkIGlmIGFueSBvZiB0aGVtIGJlY29tZSByZWplY3RlZC5cbiAgQHN0YXRpY1xuKi9cbmZ1bmN0aW9uIGFsbChlbnRyaWVzKSB7XG4gIHJldHVybiBuZXcgRW51bWVyYXRvcih0aGlzLCBlbnRyaWVzKS5wcm9taXNlO1xufVxuXG4vKipcbiAgYFByb21pc2UucmFjZWAgcmV0dXJucyBhIG5ldyBwcm9taXNlIHdoaWNoIGlzIHNldHRsZWQgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZVxuICBmaXJzdCBwYXNzZWQgcHJvbWlzZSB0byBzZXR0bGUuXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAxJyk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgbGV0IHByb21pc2UyID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDInKTtcbiAgICB9LCAxMDApO1xuICB9KTtcblxuICBQcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyByZXN1bHQgPT09ICdwcm9taXNlIDInIGJlY2F1c2UgaXQgd2FzIHJlc29sdmVkIGJlZm9yZSBwcm9taXNlMVxuICAgIC8vIHdhcyByZXNvbHZlZC5cbiAgfSk7XG4gIGBgYFxuXG4gIGBQcm9taXNlLnJhY2VgIGlzIGRldGVybWluaXN0aWMgaW4gdGhhdCBvbmx5IHRoZSBzdGF0ZSBvZiB0aGUgZmlyc3RcbiAgc2V0dGxlZCBwcm9taXNlIG1hdHRlcnMuIEZvciBleGFtcGxlLCBldmVuIGlmIG90aGVyIHByb21pc2VzIGdpdmVuIHRvIHRoZVxuICBgcHJvbWlzZXNgIGFycmF5IGFyZ3VtZW50IGFyZSByZXNvbHZlZCwgYnV0IHRoZSBmaXJzdCBzZXR0bGVkIHByb21pc2UgaGFzXG4gIGJlY29tZSByZWplY3RlZCBiZWZvcmUgdGhlIG90aGVyIHByb21pc2VzIGJlY2FtZSBmdWxmaWxsZWQsIHRoZSByZXR1cm5lZFxuICBwcm9taXNlIHdpbGwgYmVjb21lIHJlamVjdGVkOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDEnKTtcbiAgICB9LCAyMDApO1xuICB9KTtcblxuICBsZXQgcHJvbWlzZTIgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoJ3Byb21pc2UgMicpKTtcbiAgICB9LCAxMDApO1xuICB9KTtcblxuICBQcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyBDb2RlIGhlcmUgbmV2ZXIgcnVuc1xuICB9LCBmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAncHJvbWlzZSAyJyBiZWNhdXNlIHByb21pc2UgMiBiZWNhbWUgcmVqZWN0ZWQgYmVmb3JlXG4gICAgLy8gcHJvbWlzZSAxIGJlY2FtZSBmdWxmaWxsZWRcbiAgfSk7XG4gIGBgYFxuXG4gIEFuIGV4YW1wbGUgcmVhbC13b3JsZCB1c2UgY2FzZSBpcyBpbXBsZW1lbnRpbmcgdGltZW91dHM6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBQcm9taXNlLnJhY2UoW2FqYXgoJ2Zvby5qc29uJyksIHRpbWVvdXQoNTAwMCldKVxuICBgYGBcblxuICBAbWV0aG9kIHJhY2VcbiAgQHN0YXRpY1xuICBAcGFyYW0ge0FycmF5fSBwcm9taXNlcyBhcnJheSBvZiBwcm9taXNlcyB0byBvYnNlcnZlXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHdoaWNoIHNldHRsZXMgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZSBmaXJzdCBwYXNzZWRcbiAgcHJvbWlzZSB0byBzZXR0bGUuXG4qL1xuZnVuY3Rpb24gcmFjZShlbnRyaWVzKSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgaWYgKCFpc0FycmF5KGVudHJpZXMpKSB7XG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiAoXywgcmVqZWN0KSB7XG4gICAgICByZXR1cm4gcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gYXJyYXkgdG8gcmFjZS4nKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgbGVuZ3RoID0gZW50cmllcy5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnJlc29sdmUoZW50cmllc1tpXSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICBgUHJvbWlzZS5yZWplY3RgIHJldHVybnMgYSBwcm9taXNlIHJlamVjdGVkIHdpdGggdGhlIHBhc3NlZCBgcmVhc29uYC5cbiAgSXQgaXMgc2hvcnRoYW5kIGZvciB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHJlamVjdChuZXcgRXJyb3IoJ1dIT09QUycpKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ1dIT09QUydcbiAgfSk7XG4gIGBgYFxuXG4gIEluc3RlYWQgb2Ygd3JpdGluZyB0aGUgYWJvdmUsIHlvdXIgY29kZSBub3cgc2ltcGx5IGJlY29tZXMgdGhlIGZvbGxvd2luZzpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ1dIT09QUydcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVqZWN0XG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBbnl9IHJlYXNvbiB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aC5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCB0aGUgZ2l2ZW4gYHJlYXNvbmAuXG4qL1xuZnVuY3Rpb24gcmVqZWN0JDEocmVhc29uKSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG4gIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3ApO1xuICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIG5lZWRzUmVzb2x2ZXIoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYSByZXNvbHZlciBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIHByb21pc2UgY29uc3RydWN0b3InKTtcbn1cblxuZnVuY3Rpb24gbmVlZHNOZXcoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGYWlsZWQgdG8gY29uc3RydWN0ICdQcm9taXNlJzogUGxlYXNlIHVzZSB0aGUgJ25ldycgb3BlcmF0b3IsIHRoaXMgb2JqZWN0IGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvbi5cIik7XG59XG5cbi8qKlxuICBQcm9taXNlIG9iamVjdHMgcmVwcmVzZW50IHRoZSBldmVudHVhbCByZXN1bHQgb2YgYW4gYXN5bmNocm9ub3VzIG9wZXJhdGlvbi4gVGhlXG4gIHByaW1hcnkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggYSBwcm9taXNlIGlzIHRocm91Z2ggaXRzIGB0aGVuYCBtZXRob2QsIHdoaWNoXG4gIHJlZ2lzdGVycyBjYWxsYmFja3MgdG8gcmVjZWl2ZSBlaXRoZXIgYSBwcm9taXNlJ3MgZXZlbnR1YWwgdmFsdWUgb3IgdGhlIHJlYXNvblxuICB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cblxuICBUZXJtaW5vbG9neVxuICAtLS0tLS0tLS0tLVxuXG4gIC0gYHByb21pc2VgIGlzIGFuIG9iamVjdCBvciBmdW5jdGlvbiB3aXRoIGEgYHRoZW5gIG1ldGhvZCB3aG9zZSBiZWhhdmlvciBjb25mb3JtcyB0byB0aGlzIHNwZWNpZmljYXRpb24uXG4gIC0gYHRoZW5hYmxlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gdGhhdCBkZWZpbmVzIGEgYHRoZW5gIG1ldGhvZC5cbiAgLSBgdmFsdWVgIGlzIGFueSBsZWdhbCBKYXZhU2NyaXB0IHZhbHVlIChpbmNsdWRpbmcgdW5kZWZpbmVkLCBhIHRoZW5hYmxlLCBvciBhIHByb21pc2UpLlxuICAtIGBleGNlcHRpb25gIGlzIGEgdmFsdWUgdGhhdCBpcyB0aHJvd24gdXNpbmcgdGhlIHRocm93IHN0YXRlbWVudC5cbiAgLSBgcmVhc29uYCBpcyBhIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoeSBhIHByb21pc2Ugd2FzIHJlamVjdGVkLlxuICAtIGBzZXR0bGVkYCB0aGUgZmluYWwgcmVzdGluZyBzdGF0ZSBvZiBhIHByb21pc2UsIGZ1bGZpbGxlZCBvciByZWplY3RlZC5cblxuICBBIHByb21pc2UgY2FuIGJlIGluIG9uZSBvZiB0aHJlZSBzdGF0ZXM6IHBlbmRpbmcsIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQuXG5cbiAgUHJvbWlzZXMgdGhhdCBhcmUgZnVsZmlsbGVkIGhhdmUgYSBmdWxmaWxsbWVudCB2YWx1ZSBhbmQgYXJlIGluIHRoZSBmdWxmaWxsZWRcbiAgc3RhdGUuICBQcm9taXNlcyB0aGF0IGFyZSByZWplY3RlZCBoYXZlIGEgcmVqZWN0aW9uIHJlYXNvbiBhbmQgYXJlIGluIHRoZVxuICByZWplY3RlZCBzdGF0ZS4gIEEgZnVsZmlsbG1lbnQgdmFsdWUgaXMgbmV2ZXIgYSB0aGVuYWJsZS5cblxuICBQcm9taXNlcyBjYW4gYWxzbyBiZSBzYWlkIHRvICpyZXNvbHZlKiBhIHZhbHVlLiAgSWYgdGhpcyB2YWx1ZSBpcyBhbHNvIGFcbiAgcHJvbWlzZSwgdGhlbiB0aGUgb3JpZ2luYWwgcHJvbWlzZSdzIHNldHRsZWQgc3RhdGUgd2lsbCBtYXRjaCB0aGUgdmFsdWUnc1xuICBzZXR0bGVkIHN0YXRlLiAgU28gYSBwcm9taXNlIHRoYXQgKnJlc29sdmVzKiBhIHByb21pc2UgdGhhdCByZWplY3RzIHdpbGxcbiAgaXRzZWxmIHJlamVjdCwgYW5kIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgZnVsZmlsbHMgd2lsbFxuICBpdHNlbGYgZnVsZmlsbC5cblxuXG4gIEJhc2ljIFVzYWdlOlxuICAtLS0tLS0tLS0tLS1cblxuICBgYGBqc1xuICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIC8vIG9uIHN1Y2Nlc3NcbiAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgIC8vIG9uIGZhaWx1cmVcbiAgICByZWplY3QocmVhc29uKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgLy8gb24gcmVqZWN0aW9uXG4gIH0pO1xuICBgYGBcblxuICBBZHZhbmNlZCBVc2FnZTpcbiAgLS0tLS0tLS0tLS0tLS0tXG5cbiAgUHJvbWlzZXMgc2hpbmUgd2hlbiBhYnN0cmFjdGluZyBhd2F5IGFzeW5jaHJvbm91cyBpbnRlcmFjdGlvbnMgc3VjaCBhc1xuICBgWE1MSHR0cFJlcXVlc3Rgcy5cblxuICBgYGBqc1xuICBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBoYW5kbGVyO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgeGhyLnNlbmQoKTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5ET05FKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2dldEpTT046IGAnICsgdXJsICsgJ2AgZmFpbGVkIHdpdGggc3RhdHVzOiBbJyArIHRoaXMuc3RhdHVzICsgJ10nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SlNPTignL3Bvc3RzLmpzb24nKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAvLyBvbiBmdWxmaWxsbWVudFxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyBvbiByZWplY3Rpb25cbiAgfSk7XG4gIGBgYFxuXG4gIFVubGlrZSBjYWxsYmFja3MsIHByb21pc2VzIGFyZSBncmVhdCBjb21wb3NhYmxlIHByaW1pdGl2ZXMuXG5cbiAgYGBganNcbiAgUHJvbWlzZS5hbGwoW1xuICAgIGdldEpTT04oJy9wb3N0cycpLFxuICAgIGdldEpTT04oJy9jb21tZW50cycpXG4gIF0pLnRoZW4oZnVuY3Rpb24odmFsdWVzKXtcbiAgICB2YWx1ZXNbMF0gLy8gPT4gcG9zdHNKU09OXG4gICAgdmFsdWVzWzFdIC8vID0+IGNvbW1lbnRzSlNPTlxuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfSk7XG4gIGBgYFxuXG4gIEBjbGFzcyBQcm9taXNlXG4gIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVyXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQGNvbnN0cnVjdG9yXG4qL1xuXG52YXIgUHJvbWlzZSQxID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQcm9taXNlKHJlc29sdmVyKSB7XG4gICAgdGhpc1tQUk9NSVNFX0lEXSA9IG5leHRJZCgpO1xuICAgIHRoaXMuX3Jlc3VsdCA9IHRoaXMuX3N0YXRlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3N1YnNjcmliZXJzID0gW107XG5cbiAgICBpZiAobm9vcCAhPT0gcmVzb2x2ZXIpIHtcbiAgICAgIHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJyAmJiBuZWVkc1Jlc29sdmVyKCk7XG4gICAgICB0aGlzIGluc3RhbmNlb2YgUHJvbWlzZSA/IGluaXRpYWxpemVQcm9taXNlKHRoaXMsIHJlc29sdmVyKSA6IG5lZWRzTmV3KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gIFRoZSBwcmltYXJ5IHdheSBvZiBpbnRlcmFjdGluZyB3aXRoIGEgcHJvbWlzZSBpcyB0aHJvdWdoIGl0cyBgdGhlbmAgbWV0aG9kLFxuICB3aGljaCByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZVxuICByZWFzb24gd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG4gICBgYGBqc1xuICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgLy8gdXNlciBpcyBhdmFpbGFibGVcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICB9KTtcbiAgYGBgXG4gICBDaGFpbmluZ1xuICAtLS0tLS0tLVxuICAgVGhlIHJldHVybiB2YWx1ZSBvZiBgdGhlbmAgaXMgaXRzZWxmIGEgcHJvbWlzZS4gIFRoaXMgc2Vjb25kLCAnZG93bnN0cmVhbSdcbiAgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZpcnN0IHByb21pc2UncyBmdWxmaWxsbWVudFxuICBvciByZWplY3Rpb24gaGFuZGxlciwgb3IgcmVqZWN0ZWQgaWYgdGhlIGhhbmRsZXIgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbiAgIGBgYGpzXG4gIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgIHJldHVybiB1c2VyLm5hbWU7XG4gIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKHVzZXJOYW1lKSB7XG4gICAgLy8gSWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGB1c2VyTmFtZWAgd2lsbCBiZSB0aGUgdXNlcidzIG5hbWUsIG90aGVyd2lzZSBpdFxuICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICB9KTtcbiAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknKTtcbiAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScpO1xuICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIC8vIGlmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgcmVhc29uYCB3aWxsIGJlICdGb3VuZCB1c2VyLCBidXQgc3RpbGwgdW5oYXBweScuXG4gICAgLy8gSWYgYGZpbmRVc2VyYCByZWplY3RlZCwgYHJlYXNvbmAgd2lsbCBiZSAnYGZpbmRVc2VyYCByZWplY3RlZCBhbmQgd2UncmUgdW5oYXBweScuXG4gIH0pO1xuICBgYGBcbiAgSWYgdGhlIGRvd25zdHJlYW0gcHJvbWlzZSBkb2VzIG5vdCBzcGVjaWZ5IGEgcmVqZWN0aW9uIGhhbmRsZXIsIHJlamVjdGlvbiByZWFzb25zIHdpbGwgYmUgcHJvcGFnYXRlZCBmdXJ0aGVyIGRvd25zdHJlYW0uXG4gICBgYGBqc1xuICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICB0aHJvdyBuZXcgUGVkYWdvZ2ljYWxFeGNlcHRpb24oJ1Vwc3RyZWFtIGVycm9yJyk7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gbmV2ZXIgcmVhY2hlZFxuICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIC8vIFRoZSBgUGVkZ2Fnb2NpYWxFeGNlcHRpb25gIGlzIHByb3BhZ2F0ZWQgYWxsIHRoZSB3YXkgZG93biB0byBoZXJlXG4gIH0pO1xuICBgYGBcbiAgIEFzc2ltaWxhdGlvblxuICAtLS0tLS0tLS0tLS1cbiAgIFNvbWV0aW1lcyB0aGUgdmFsdWUgeW91IHdhbnQgdG8gcHJvcGFnYXRlIHRvIGEgZG93bnN0cmVhbSBwcm9taXNlIGNhbiBvbmx5IGJlXG4gIHJldHJpZXZlZCBhc3luY2hyb25vdXNseS4gVGhpcyBjYW4gYmUgYWNoaWV2ZWQgYnkgcmV0dXJuaW5nIGEgcHJvbWlzZSBpbiB0aGVcbiAgZnVsZmlsbG1lbnQgb3IgcmVqZWN0aW9uIGhhbmRsZXIuIFRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCB0aGVuIGJlIHBlbmRpbmdcbiAgdW50aWwgdGhlIHJldHVybmVkIHByb21pc2UgaXMgc2V0dGxlZC4gVGhpcyBpcyBjYWxsZWQgKmFzc2ltaWxhdGlvbiouXG4gICBgYGBqc1xuICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICByZXR1cm4gZmluZENvbW1lbnRzQnlBdXRob3IodXNlcik7XG4gIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgLy8gVGhlIHVzZXIncyBjb21tZW50cyBhcmUgbm93IGF2YWlsYWJsZVxuICB9KTtcbiAgYGBgXG4gICBJZiB0aGUgYXNzaW1saWF0ZWQgcHJvbWlzZSByZWplY3RzLCB0aGVuIHRoZSBkb3duc3RyZWFtIHByb21pc2Ugd2lsbCBhbHNvIHJlamVjdC5cbiAgIGBgYGpzXG4gIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgIHJldHVybiBmaW5kQ29tbWVudHNCeUF1dGhvcih1c2VyKTtcbiAgfSkudGhlbihmdW5jdGlvbiAoY29tbWVudHMpIHtcbiAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIGZ1bGZpbGxzLCB3ZSdsbCBoYXZlIHRoZSB2YWx1ZSBoZXJlXG4gIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIHJlamVjdHMsIHdlJ2xsIGhhdmUgdGhlIHJlYXNvbiBoZXJlXG4gIH0pO1xuICBgYGBcbiAgIFNpbXBsZSBFeGFtcGxlXG4gIC0tLS0tLS0tLS0tLS0tXG4gICBTeW5jaHJvbm91cyBFeGFtcGxlXG4gICBgYGBqYXZhc2NyaXB0XG4gIGxldCByZXN1bHQ7XG4gICB0cnkge1xuICAgIHJlc3VsdCA9IGZpbmRSZXN1bHQoKTtcbiAgICAvLyBzdWNjZXNzXG4gIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgLy8gZmFpbHVyZVxuICB9XG4gIGBgYFxuICAgRXJyYmFjayBFeGFtcGxlXG4gICBgYGBqc1xuICBmaW5kUmVzdWx0KGZ1bmN0aW9uKHJlc3VsdCwgZXJyKXtcbiAgICBpZiAoZXJyKSB7XG4gICAgICAvLyBmYWlsdXJlXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9XG4gIH0pO1xuICBgYGBcbiAgIFByb21pc2UgRXhhbXBsZTtcbiAgIGBgYGphdmFzY3JpcHRcbiAgZmluZFJlc3VsdCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyBzdWNjZXNzXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gZmFpbHVyZVxuICB9KTtcbiAgYGBgXG4gICBBZHZhbmNlZCBFeGFtcGxlXG4gIC0tLS0tLS0tLS0tLS0tXG4gICBTeW5jaHJvbm91cyBFeGFtcGxlXG4gICBgYGBqYXZhc2NyaXB0XG4gIGxldCBhdXRob3IsIGJvb2tzO1xuICAgdHJ5IHtcbiAgICBhdXRob3IgPSBmaW5kQXV0aG9yKCk7XG4gICAgYm9va3MgID0gZmluZEJvb2tzQnlBdXRob3IoYXV0aG9yKTtcbiAgICAvLyBzdWNjZXNzXG4gIH0gY2F0Y2gocmVhc29uKSB7XG4gICAgLy8gZmFpbHVyZVxuICB9XG4gIGBgYFxuICAgRXJyYmFjayBFeGFtcGxlXG4gICBgYGBqc1xuICAgZnVuY3Rpb24gZm91bmRCb29rcyhib29rcykge1xuICAgfVxuICAgZnVuY3Rpb24gZmFpbHVyZShyZWFzb24pIHtcbiAgIH1cbiAgIGZpbmRBdXRob3IoZnVuY3Rpb24oYXV0aG9yLCBlcnIpe1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZmluZEJvb29rc0J5QXV0aG9yKGF1dGhvciwgZnVuY3Rpb24oYm9va3MsIGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGZhaWx1cmUoZXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZm91bmRCb29rcyhib29rcyk7XG4gICAgICAgICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAgICAgICBmYWlsdXJlKHJlYXNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgfVxuICAgICAgLy8gc3VjY2Vzc1xuICAgIH1cbiAgfSk7XG4gIGBgYFxuICAgUHJvbWlzZSBFeGFtcGxlO1xuICAgYGBgamF2YXNjcmlwdFxuICBmaW5kQXV0aG9yKCkuXG4gICAgdGhlbihmaW5kQm9va3NCeUF1dGhvcikuXG4gICAgdGhlbihmdW5jdGlvbihib29rcyl7XG4gICAgICAvLyBmb3VuZCBib29rc1xuICB9KS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gIH0pO1xuICBgYGBcbiAgIEBtZXRob2QgdGhlblxuICBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZ1bGZpbGxlZFxuICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGVkXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX1cbiAgKi9cblxuICAvKipcbiAgYGNhdGNoYCBpcyBzaW1wbHkgc3VnYXIgZm9yIGB0aGVuKHVuZGVmaW5lZCwgb25SZWplY3Rpb24pYCB3aGljaCBtYWtlcyBpdCB0aGUgc2FtZVxuICBhcyB0aGUgY2F0Y2ggYmxvY2sgb2YgYSB0cnkvY2F0Y2ggc3RhdGVtZW50LlxuICBgYGBqc1xuICBmdW5jdGlvbiBmaW5kQXV0aG9yKCl7XG4gIHRocm93IG5ldyBFcnJvcignY291bGRuJ3QgZmluZCB0aGF0IGF1dGhvcicpO1xuICB9XG4gIC8vIHN5bmNocm9ub3VzXG4gIHRyeSB7XG4gIGZpbmRBdXRob3IoKTtcbiAgfSBjYXRjaChyZWFzb24pIHtcbiAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgfVxuICAvLyBhc3luYyB3aXRoIHByb21pc2VzXG4gIGZpbmRBdXRob3IoKS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAvLyBzb21ldGhpbmcgd2VudCB3cm9uZ1xuICB9KTtcbiAgYGBgXG4gIEBtZXRob2QgY2F0Y2hcbiAgQHBhcmFtIHtGdW5jdGlvbn0gb25SZWplY3Rpb25cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuXG5cbiAgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbiBfY2F0Y2gob25SZWplY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKTtcbiAgfTtcblxuICAvKipcbiAgICBgZmluYWxseWAgd2lsbCBiZSBpbnZva2VkIHJlZ2FyZGxlc3Mgb2YgdGhlIHByb21pc2UncyBmYXRlIGp1c3QgYXMgbmF0aXZlXG4gICAgdHJ5L2NhdGNoL2ZpbmFsbHkgYmVoYXZlc1xuICBcbiAgICBTeW5jaHJvbm91cyBleGFtcGxlOlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRBdXRob3IoKSB7XG4gICAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgQXV0aG9yKCk7XG4gICAgfVxuICBcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZpbmRBdXRob3IoKTsgLy8gc3VjY2VlZCBvciBmYWlsXG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgcmV0dXJuIGZpbmRPdGhlckF1dGhlcigpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyBhbHdheXMgcnVuc1xuICAgICAgLy8gZG9lc24ndCBhZmZlY3QgdGhlIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICBgYGBcbiAgXG4gICAgQXN5bmNocm9ub3VzIGV4YW1wbGU6XG4gIFxuICAgIGBgYGpzXG4gICAgZmluZEF1dGhvcigpLmNhdGNoKGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICByZXR1cm4gZmluZE90aGVyQXV0aGVyKCk7XG4gICAgfSkuZmluYWxseShmdW5jdGlvbigpe1xuICAgICAgLy8gYXV0aG9yIHdhcyBlaXRoZXIgZm91bmQsIG9yIG5vdFxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBAbWV0aG9kIGZpbmFsbHlcbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICovXG5cblxuICBQcm9taXNlLnByb3RvdHlwZS5maW5hbGx5ID0gZnVuY3Rpb24gX2ZpbmFsbHkoY2FsbGJhY2spIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gcHJvbWlzZS5jb25zdHJ1Y3RvcjtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhyb3cgcmVhc29uO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlLnRoZW4oY2FsbGJhY2ssIGNhbGxiYWNrKTtcbiAgfTtcblxuICByZXR1cm4gUHJvbWlzZTtcbn0oKTtcblxuUHJvbWlzZSQxLnByb3RvdHlwZS50aGVuID0gdGhlbjtcblByb21pc2UkMS5hbGwgPSBhbGw7XG5Qcm9taXNlJDEucmFjZSA9IHJhY2U7XG5Qcm9taXNlJDEucmVzb2x2ZSA9IHJlc29sdmUkMTtcblByb21pc2UkMS5yZWplY3QgPSByZWplY3QkMTtcblByb21pc2UkMS5fc2V0U2NoZWR1bGVyID0gc2V0U2NoZWR1bGVyO1xuUHJvbWlzZSQxLl9zZXRBc2FwID0gc2V0QXNhcDtcblByb21pc2UkMS5fYXNhcCA9IGFzYXA7XG5cbi8qZ2xvYmFsIHNlbGYqL1xuZnVuY3Rpb24gcG9seWZpbGwoKSB7XG4gIHZhciBsb2NhbCA9IHZvaWQgMDtcblxuICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsb2NhbCA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsb2NhbCA9IHNlbGY7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BvbHlmaWxsIGZhaWxlZCBiZWNhdXNlIGdsb2JhbCBvYmplY3QgaXMgdW5hdmFpbGFibGUgaW4gdGhpcyBlbnZpcm9ubWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBQID0gbG9jYWwuUHJvbWlzZTtcblxuICBpZiAoUCkge1xuICAgIHZhciBwcm9taXNlVG9TdHJpbmcgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBwcm9taXNlVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUC5yZXNvbHZlKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNpbGVudGx5IGlnbm9yZWRcbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZVRvU3RyaW5nID09PSAnW29iamVjdCBQcm9taXNlXScgJiYgIVAuY2FzdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGxvY2FsLlByb21pc2UgPSBQcm9taXNlJDE7XG59XG5cbi8vIFN0cmFuZ2UgY29tcGF0Li5cblByb21pc2UkMS5wb2x5ZmlsbCA9IHBvbHlmaWxsO1xuUHJvbWlzZSQxLlByb21pc2UgPSBQcm9taXNlJDE7XG5cbnJldHVybiBQcm9taXNlJDE7XG5cbn0pKSk7XG5cblxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1lczYtcHJvbWlzZS5tYXBcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwiXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9yRWFjaCAob2JqLCBmbiwgY3R4KSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwoZm4pICE9PSAnW29iamVjdCBGdW5jdGlvbl0nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2l0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cbiAgICB2YXIgbCA9IG9iai5sZW5ndGg7XG4gICAgaWYgKGwgPT09ICtsKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBmbi5jYWxsKGN0eCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChvYmosIGspKSB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChjdHgsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbiIsInZhciB3aW47XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgd2luID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgd2luID0ge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2luO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHR5cGVzID0gW1xuICByZXF1aXJlKCcuL25leHRUaWNrJyksXG4gIHJlcXVpcmUoJy4vbXV0YXRpb24uanMnKSxcbiAgcmVxdWlyZSgnLi9tZXNzYWdlQ2hhbm5lbCcpLFxuICByZXF1aXJlKCcuL3N0YXRlQ2hhbmdlJyksXG4gIHJlcXVpcmUoJy4vdGltZW91dCcpXG5dO1xudmFyIGRyYWluaW5nO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG52YXIgcXVldWUgPSBbXTtcbnZhciBzY2hlZHVsZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRyYWluaW5nID0gZmFsc2U7XG4gIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgfSBlbHNlIHtcbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gIH1cbiAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgIG5leHRUaWNrKCk7XG4gIH1cbn1cblxuLy9uYW1lZCBuZXh0VGljayBmb3IgbGVzcyBjb25mdXNpbmcgc3RhY2sgdHJhY2VzXG5mdW5jdGlvbiBuZXh0VGljaygpIHtcbiAgaWYgKGRyYWluaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHNjaGVkdWxlZCA9IGZhbHNlO1xuICBkcmFpbmluZyA9IHRydWU7XG4gIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICB3aGlsZSAobGVuKSB7XG4gICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgcXVldWUgPSBbXTtcbiAgICB3aGlsZSAoY3VycmVudFF1ZXVlICYmICsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgIH1cbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICB9XG4gIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gIHF1ZXVlSW5kZXggPSAtMTtcbiAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxudmFyIHNjaGVkdWxlRHJhaW47XG52YXIgaSA9IC0xO1xudmFyIGxlbiA9IHR5cGVzLmxlbmd0aDtcbndoaWxlICgrK2kgPCBsZW4pIHtcbiAgaWYgKHR5cGVzW2ldICYmIHR5cGVzW2ldLnRlc3QgJiYgdHlwZXNbaV0udGVzdCgpKSB7XG4gICAgc2NoZWR1bGVEcmFpbiA9IHR5cGVzW2ldLmluc3RhbGwobmV4dFRpY2spO1xuICAgIGJyZWFrO1xuICB9XG59XG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgdGhpcy5mdW4gPSBmdW47XG4gIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZ1biA9IHRoaXMuZnVuO1xuICB2YXIgYXJyYXkgPSB0aGlzLmFycmF5O1xuICBzd2l0Y2ggKGFycmF5Lmxlbmd0aCkge1xuICBjYXNlIDA6XG4gICAgcmV0dXJuIGZ1bigpO1xuICBjYXNlIDE6XG4gICAgcmV0dXJuIGZ1bihhcnJheVswXSk7XG4gIGNhc2UgMjpcbiAgICByZXR1cm4gZnVuKGFycmF5WzBdLCBhcnJheVsxXSk7XG4gIGNhc2UgMzpcbiAgICByZXR1cm4gZnVuKGFycmF5WzBdLCBhcnJheVsxXSwgYXJyYXlbMl0pO1xuICBkZWZhdWx0OlxuICAgIHJldHVybiBmdW4uYXBwbHkobnVsbCwgYXJyYXkpO1xuICB9XG5cbn07XG5tb2R1bGUuZXhwb3J0cyA9IGltbWVkaWF0ZTtcbmZ1bmN0aW9uIGltbWVkaWF0ZSh0YXNrKSB7XG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgfVxuICBxdWV1ZS5wdXNoKG5ldyBJdGVtKHRhc2ssIGFyZ3MpKTtcbiAgaWYgKCFzY2hlZHVsZWQgJiYgIWRyYWluaW5nKSB7XG4gICAgc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICBzY2hlZHVsZURyYWluKCk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgIC8vIHdlIGNhbiBvbmx5IGdldCBoZXJlIGluIElFMTBcbiAgICAvLyB3aGljaCBkb2Vzbid0IGhhbmRlbCBwb3N0TWVzc2FnZSB3ZWxsXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0eXBlb2YgZ2xvYmFsLk1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJztcbn07XG5cbmV4cG9ydHMuaW5zdGFsbCA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gIHZhciBjaGFubmVsID0gbmV3IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCgpO1xuICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmM7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy9iYXNlZCBvZmYgcnN2cCBodHRwczovL2dpdGh1Yi5jb20vdGlsZGVpby9yc3ZwLmpzXG4vL2xpY2Vuc2UgaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qcy9ibG9iL21hc3Rlci9MSUNFTlNFXG4vL2h0dHBzOi8vZ2l0aHViLmNvbS90aWxkZWlvL3JzdnAuanMvYmxvYi9tYXN0ZXIvbGliL3JzdnAvYXNhcC5qc1xuXG52YXIgTXV0YXRpb24gPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcblxuZXhwb3J0cy50ZXN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gTXV0YXRpb247XG59O1xuXG5leHBvcnRzLmluc3RhbGwgPSBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gIHZhciBjYWxsZWQgPSAwO1xuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb24oaGFuZGxlKTtcbiAgdmFyIGVsZW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIHtcbiAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGVsZW1lbnQuZGF0YSA9IChjYWxsZWQgPSArK2NhbGxlZCAlIDIpO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5leHBvcnRzLnRlc3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgcmV0dXJuICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpICYmICFwcm9jZXNzLmJyb3dzZXI7XG59O1xuXG5leHBvcnRzLmluc3RhbGwgPSBmdW5jdGlvbiAoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MubmV4dFRpY2soZnVuYyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLnRlc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnZG9jdW1lbnQnIGluIGdsb2JhbCAmJiAnb25yZWFkeXN0YXRlY2hhbmdlJyBpbiBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG59O1xuXG5leHBvcnRzLmluc3RhbGwgPSBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgIHZhciBzY3JpcHRFbCA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHRFbC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBoYW5kbGUoKTtcblxuICAgICAgc2NyaXB0RWwub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgIHNjcmlwdEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0RWwpO1xuICAgICAgc2NyaXB0RWwgPSBudWxsO1xuICAgIH07XG4gICAgZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChzY3JpcHRFbCk7XG5cbiAgICByZXR1cm4gaGFuZGxlO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5leHBvcnRzLnRlc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24gKHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBzZXRUaW1lb3V0KHQsIDApO1xuICB9O1xufTsiLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gICAgfVxuICB9XG59XG4iLCJ2YXIgY29udGFpbmVycyA9IFtdOyAvLyB3aWxsIHN0b3JlIGNvbnRhaW5lciBIVE1MRWxlbWVudCByZWZlcmVuY2VzXG52YXIgc3R5bGVFbGVtZW50cyA9IFtdOyAvLyB3aWxsIHN0b3JlIHtwcmVwZW5kOiBIVE1MRWxlbWVudCwgYXBwZW5kOiBIVE1MRWxlbWVudH1cblxudmFyIHVzYWdlID0gJ2luc2VydC1jc3M6IFlvdSBuZWVkIHRvIHByb3ZpZGUgYSBDU1Mgc3RyaW5nLiBVc2FnZTogaW5zZXJ0Q3NzKGNzc1N0cmluZ1ssIG9wdGlvbnNdKS4nO1xuXG5mdW5jdGlvbiBpbnNlcnRDc3MoY3NzLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICBpZiAoY3NzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHVzYWdlKTtcbiAgICB9XG5cbiAgICB2YXIgcG9zaXRpb24gPSBvcHRpb25zLnByZXBlbmQgPT09IHRydWUgPyAncHJlcGVuZCcgOiAnYXBwZW5kJztcbiAgICB2YXIgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY29udGFpbmVyIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xuICAgIHZhciBjb250YWluZXJJZCA9IGNvbnRhaW5lcnMuaW5kZXhPZihjb250YWluZXIpO1xuXG4gICAgLy8gZmlyc3QgdGltZSB3ZSBzZWUgdGhpcyBjb250YWluZXIsIGNyZWF0ZSB0aGUgbmVjZXNzYXJ5IGVudHJpZXNcbiAgICBpZiAoY29udGFpbmVySWQgPT09IC0xKSB7XG4gICAgICAgIGNvbnRhaW5lcklkID0gY29udGFpbmVycy5wdXNoKGNvbnRhaW5lcikgLSAxO1xuICAgICAgICBzdHlsZUVsZW1lbnRzW2NvbnRhaW5lcklkXSA9IHt9O1xuICAgIH1cblxuICAgIC8vIHRyeSB0byBnZXQgdGhlIGNvcnJlcG9uZGluZyBjb250YWluZXIgKyBwb3NpdGlvbiBzdHlsZUVsZW1lbnQsIGNyZWF0ZSBpdCBvdGhlcndpc2VcbiAgICB2YXIgc3R5bGVFbGVtZW50O1xuXG4gICAgaWYgKHN0eWxlRWxlbWVudHNbY29udGFpbmVySWRdICE9PSB1bmRlZmluZWQgJiYgc3R5bGVFbGVtZW50c1tjb250YWluZXJJZF1bcG9zaXRpb25dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3R5bGVFbGVtZW50ID0gc3R5bGVFbGVtZW50c1tjb250YWluZXJJZF1bcG9zaXRpb25dO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlRWxlbWVudCA9IHN0eWxlRWxlbWVudHNbY29udGFpbmVySWRdW3Bvc2l0aW9uXSA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ3ByZXBlbmQnKSB7XG4gICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgY29udGFpbmVyLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzdHJpcCBwb3RlbnRpYWwgVVRGLTggQk9NIGlmIGNzcyB3YXMgcmVhZCBmcm9tIGEgZmlsZVxuICAgIGlmIChjc3MuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7IGNzcyA9IGNzcy5zdWJzdHIoMSwgY3NzLmxlbmd0aCk7IH1cblxuICAgIC8vIGFjdHVhbGx5IGFkZCB0aGUgc3R5bGVzaGVldFxuICAgIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgICAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ICs9IGNzc1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlRWxlbWVudC50ZXh0Q29udGVudCArPSBjc3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlRWxlbWVudDtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCgpIHtcbiAgICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgcmV0dXJuIHN0eWxlRWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRDc3M7XG5tb2R1bGUuZXhwb3J0cy5pbnNlcnRDc3MgPSBpbnNlcnRDc3M7XG4iLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKTtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIik7XG5cbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50Ll9fZXNNb2R1bGUgPyBjb250ZW50LmRlZmF1bHQgOiBjb250ZW50O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgICAgIH1cblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXNTaGltO1xuaWYgKCFPYmplY3Qua2V5cykge1xuXHQvLyBtb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbVxuXHR2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0dmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblx0dmFyIGlzQXJncyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBnbG9iYWwtcmVxdWlyZVxuXHR2YXIgaXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblx0dmFyIGhhc0RvbnRFbnVtQnVnID0gIWlzRW51bWVyYWJsZS5jYWxsKHsgdG9TdHJpbmc6IG51bGwgfSwgJ3RvU3RyaW5nJyk7XG5cdHZhciBoYXNQcm90b0VudW1CdWcgPSBpc0VudW1lcmFibGUuY2FsbChmdW5jdGlvbiAoKSB7fSwgJ3Byb3RvdHlwZScpO1xuXHR2YXIgZG9udEVudW1zID0gW1xuXHRcdCd0b1N0cmluZycsXG5cdFx0J3RvTG9jYWxlU3RyaW5nJyxcblx0XHQndmFsdWVPZicsXG5cdFx0J2hhc093blByb3BlcnR5Jyxcblx0XHQnaXNQcm90b3R5cGVPZicsXG5cdFx0J3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcblx0XHQnY29uc3RydWN0b3InXG5cdF07XG5cdHZhciBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0dmFyIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuXHRcdHJldHVybiBjdG9yICYmIGN0b3IucHJvdG90eXBlID09PSBvO1xuXHR9O1xuXHR2YXIgZXhjbHVkZWRLZXlzID0ge1xuXHRcdCRhcHBsaWNhdGlvbkNhY2hlOiB0cnVlLFxuXHRcdCRjb25zb2xlOiB0cnVlLFxuXHRcdCRleHRlcm5hbDogdHJ1ZSxcblx0XHQkZnJhbWU6IHRydWUsXG5cdFx0JGZyYW1lRWxlbWVudDogdHJ1ZSxcblx0XHQkZnJhbWVzOiB0cnVlLFxuXHRcdCRpbm5lckhlaWdodDogdHJ1ZSxcblx0XHQkaW5uZXJXaWR0aDogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuY2hhbmdlOiB0cnVlLFxuXHRcdCRvbm1vemZ1bGxzY3JlZW5lcnJvcjogdHJ1ZSxcblx0XHQkb3V0ZXJIZWlnaHQ6IHRydWUsXG5cdFx0JG91dGVyV2lkdGg6IHRydWUsXG5cdFx0JHBhZ2VYT2Zmc2V0OiB0cnVlLFxuXHRcdCRwYWdlWU9mZnNldDogdHJ1ZSxcblx0XHQkcGFyZW50OiB0cnVlLFxuXHRcdCRzY3JvbGxMZWZ0OiB0cnVlLFxuXHRcdCRzY3JvbGxUb3A6IHRydWUsXG5cdFx0JHNjcm9sbFg6IHRydWUsXG5cdFx0JHNjcm9sbFk6IHRydWUsXG5cdFx0JHNlbGY6IHRydWUsXG5cdFx0JHdlYmtpdEluZGV4ZWREQjogdHJ1ZSxcblx0XHQkd2Via2l0U3RvcmFnZUluZm86IHRydWUsXG5cdFx0JHdpbmRvdzogdHJ1ZVxuXHR9O1xuXHR2YXIgaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnID0gKGZ1bmN0aW9uICgpIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAodmFyIGsgaW4gd2luZG93KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVkS2V5c1snJCcgKyBrXSAmJiBoYXMuY2FsbCh3aW5kb3csIGspICYmIHdpbmRvd1trXSAhPT0gbnVsbCAmJiB0eXBlb2Ygd2luZG93W2tdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSh3aW5kb3dba10pO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KCkpO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5ID0gZnVuY3Rpb24gKG8pIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWcpIHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9O1xuXG5cdGtleXNTaGltID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcblx0XHR2YXIgaXNPYmplY3QgPSBvYmplY3QgIT09IG51bGwgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCc7XG5cdFx0dmFyIGlzRnVuY3Rpb24gPSB0b1N0ci5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdFx0dmFyIGlzQXJndW1lbnRzID0gaXNBcmdzKG9iamVjdCk7XG5cdFx0dmFyIGlzU3RyaW5nID0gaXNPYmplY3QgJiYgdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0XHR2YXIgdGhlS2V5cyA9IFtdO1xuXG5cdFx0aWYgKCFpc09iamVjdCAmJiAhaXNGdW5jdGlvbiAmJiAhaXNBcmd1bWVudHMpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBhIG5vbi1vYmplY3QnKTtcblx0XHR9XG5cblx0XHR2YXIgc2tpcFByb3RvID0gaGFzUHJvdG9FbnVtQnVnICYmIGlzRnVuY3Rpb247XG5cdFx0aWYgKGlzU3RyaW5nICYmIG9iamVjdC5sZW5ndGggPiAwICYmICFoYXMuY2FsbChvYmplY3QsIDApKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaXNBcmd1bWVudHMgJiYgb2JqZWN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgb2JqZWN0Lmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcoaikpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuXHRcdFx0XHRpZiAoIShza2lwUHJvdG8gJiYgbmFtZSA9PT0gJ3Byb3RvdHlwZScpICYmIGhhcy5jYWxsKG9iamVjdCwgbmFtZSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKG5hbWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChoYXNEb250RW51bUJ1Zykge1xuXHRcdFx0dmFyIHNraXBDb25zdHJ1Y3RvciA9IGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneShvYmplY3QpO1xuXG5cdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGRvbnRFbnVtcy5sZW5ndGg7ICsraykge1xuXHRcdFx0XHRpZiAoIShza2lwQ29uc3RydWN0b3IgJiYgZG9udEVudW1zW2tdID09PSAnY29uc3RydWN0b3InKSAmJiBoYXMuY2FsbChvYmplY3QsIGRvbnRFbnVtc1trXSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goZG9udEVudW1zW2tdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhlS2V5cztcblx0fTtcbn1cbm1vZHVsZS5leHBvcnRzID0ga2V5c1NoaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7XG5cbnZhciBvcmlnS2V5cyA9IE9iamVjdC5rZXlzO1xudmFyIGtleXNTaGltID0gb3JpZ0tleXMgPyBmdW5jdGlvbiBrZXlzKG8pIHsgcmV0dXJuIG9yaWdLZXlzKG8pOyB9IDogcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG52YXIgb3JpZ2luYWxLZXlzID0gT2JqZWN0LmtleXM7XG5cbmtleXNTaGltLnNoaW0gPSBmdW5jdGlvbiBzaGltT2JqZWN0S2V5cygpIHtcblx0aWYgKE9iamVjdC5rZXlzKSB7XG5cdFx0dmFyIGtleXNXb3Jrc1dpdGhBcmd1bWVudHMgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gU2FmYXJpIDUuMCBidWdcblx0XHRcdHZhciBhcmdzID0gT2JqZWN0LmtleXMoYXJndW1lbnRzKTtcblx0XHRcdHJldHVybiBhcmdzICYmIGFyZ3MubGVuZ3RoID09PSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdH0oMSwgMikpO1xuXHRcdGlmICgha2V5c1dvcmtzV2l0aEFyZ3VtZW50cykge1xuXHRcdFx0T2JqZWN0LmtleXMgPSBmdW5jdGlvbiBrZXlzKG9iamVjdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuXHRcdFx0XHRpZiAoaXNBcmdzKG9iamVjdCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxLZXlzKHNsaWNlLmNhbGwob2JqZWN0KSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhvYmplY3QpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0T2JqZWN0LmtleXMgPSBrZXlzU2hpbTtcblx0fVxuXHRyZXR1cm4gT2JqZWN0LmtleXMgfHwga2V5c1NoaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdHZhciBzdHIgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0dmFyIGlzQXJncyA9IHN0ciA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cdGlmICghaXNBcmdzKSB7XG5cdFx0aXNBcmdzID0gc3RyICE9PSAnW29iamVjdCBBcnJheV0nICYmXG5cdFx0XHR2YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcicgJiZcblx0XHRcdHZhbHVlLmxlbmd0aCA+PSAwICYmXG5cdFx0XHR0b1N0ci5jYWxsKHZhbHVlLmNhbGxlZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdH1cblx0cmV0dXJuIGlzQXJncztcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gd2UgbmVlZCB0byBleHBvcnQgdXNpbmcgY29tbW9uanMgZm9yIGVhc2Ugb2YgdXNhZ2UgaW4gYWxsXG4vLyBKYXZhU2NyaXB0IGVudmlyb25tZW50c1xuLy8gV2UgdGhlcmVmb3JlIG5lZWQgdG8gaW1wb3J0IGluIGNvbW1vbmpzIHRvby4gc2VlOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay9pc3N1ZXMvNDAzOVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY29tbW9uanMgKi9cbnZhciBwbGFjZXMgPSByZXF1aXJlKCcuL3NyYy9wbGFjZXMnKTtcblxudmFyIHZlcnNpb24gPSByZXF1aXJlKCcuL3NyYy92ZXJzaW9uJyk7IC8vIG11c3QgdXNlIG1vZHVsZS5leHBvcnRzIHRvIGJlIGNvbW1vbkpTIGNvbXBhdGlibGVcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHBsYWNlc1tcImRlZmF1bHRcIl07XG5tb2R1bGUuZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvbltcImRlZmF1bHRcIl07XG4vKiBlc2xpbnQtZW5hYmxlIGltcG9ydC9uby1jb21tb25qcyAqL1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBleHRyYWN0UGFyYW1zID0gZnVuY3Rpb24gZXh0cmFjdFBhcmFtcyhfcmVmKSB7XG4gIHZhciBoaXRzUGVyUGFnZSA9IF9yZWYuaGl0c1BlclBhZ2UsXG4gICAgICBwb3N0Y29kZVNlYXJjaCA9IF9yZWYucG9zdGNvZGVTZWFyY2gsXG4gICAgICBhcm91bmRMYXRMbmcgPSBfcmVmLmFyb3VuZExhdExuZyxcbiAgICAgIGFyb3VuZFJhZGl1cyA9IF9yZWYuYXJvdW5kUmFkaXVzLFxuICAgICAgYXJvdW5kTGF0TG5nVmlhSVAgPSBfcmVmLmFyb3VuZExhdExuZ1ZpYUlQLFxuICAgICAgaW5zaWRlQm91bmRpbmdCb3ggPSBfcmVmLmluc2lkZUJvdW5kaW5nQm94LFxuICAgICAgaW5zaWRlUG9seWdvbiA9IF9yZWYuaW5zaWRlUG9seWdvbixcbiAgICAgIGdldFJhbmtpbmdJbmZvID0gX3JlZi5nZXRSYW5raW5nSW5mbyxcbiAgICAgIGNvdW50cmllcyA9IF9yZWYuY291bnRyaWVzLFxuICAgICAgbGFuZ3VhZ2UgPSBfcmVmLmxhbmd1YWdlLFxuICAgICAgdHlwZSA9IF9yZWYudHlwZTtcbiAgdmFyIGV4dHJhY3RlZCA9IHtcbiAgICBjb3VudHJpZXM6IGNvdW50cmllcyxcbiAgICBoaXRzUGVyUGFnZTogaGl0c1BlclBhZ2UgfHwgNSxcbiAgICBsYW5ndWFnZTogbGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLmxhbmd1YWdlLnNwbGl0KCctJylbMF0sXG4gICAgdHlwZTogdHlwZVxuICB9O1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNvdW50cmllcykpIHtcbiAgICBleHRyYWN0ZWQuY291bnRyaWVzID0gZXh0cmFjdGVkLmNvdW50cmllcy5tYXAoZnVuY3Rpb24gKGNvdW50cnkpIHtcbiAgICAgIHJldHVybiBjb3VudHJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGV4dHJhY3RlZC5sYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICBleHRyYWN0ZWQubGFuZ3VhZ2UgPSBleHRyYWN0ZWQubGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGlmIChhcm91bmRMYXRMbmcpIHtcbiAgICBleHRyYWN0ZWQuYXJvdW5kTGF0TG5nID0gYXJvdW5kTGF0TG5nO1xuICB9IGVsc2UgaWYgKGFyb3VuZExhdExuZ1ZpYUlQICE9PSB1bmRlZmluZWQpIHtcbiAgICBleHRyYWN0ZWQuYXJvdW5kTGF0TG5nVmlhSVAgPSBhcm91bmRMYXRMbmdWaWFJUDtcbiAgfVxuXG4gIGlmIChwb3N0Y29kZVNlYXJjaCkge1xuICAgIGV4dHJhY3RlZC5yZXN0cmljdFNlYXJjaGFibGVBdHRyaWJ1dGVzID0gJ3Bvc3Rjb2RlJztcbiAgfVxuXG4gIHJldHVybiBfb2JqZWN0U3ByZWFkKHt9LCBleHRyYWN0ZWQsIHtcbiAgICBhcm91bmRSYWRpdXM6IGFyb3VuZFJhZGl1cyxcbiAgICBpbnNpZGVCb3VuZGluZ0JveDogaW5zaWRlQm91bmRpbmdCb3gsXG4gICAgaW5zaWRlUG9seWdvbjogaW5zaWRlUG9seWdvbixcbiAgICBnZXRSYW5raW5nSW5mbzogZ2V0UmFua2luZ0luZm9cbiAgfSk7XG59O1xuXG52YXIgZXh0cmFjdENvbnRyb2xzID0gZnVuY3Rpb24gZXh0cmFjdENvbnRyb2xzKF9yZWYyKSB7XG4gIHZhciBfcmVmMiR1c2VEZXZpY2VMb2NhdGkgPSBfcmVmMi51c2VEZXZpY2VMb2NhdGlvbixcbiAgICAgIHVzZURldmljZUxvY2F0aW9uID0gX3JlZjIkdXNlRGV2aWNlTG9jYXRpID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYyJHVzZURldmljZUxvY2F0aSxcbiAgICAgIF9yZWYyJGNvbXB1dGVRdWVyeVBhciA9IF9yZWYyLmNvbXB1dGVRdWVyeVBhcmFtcyxcbiAgICAgIGNvbXB1dGVRdWVyeVBhcmFtcyA9IF9yZWYyJGNvbXB1dGVRdWVyeVBhciA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH0gOiBfcmVmMiRjb21wdXRlUXVlcnlQYXIsXG4gICAgICBmb3JtYXRJbnB1dFZhbHVlID0gX3JlZjIuZm9ybWF0SW5wdXRWYWx1ZSxcbiAgICAgIF9yZWYyJG9uSGl0cyA9IF9yZWYyLm9uSGl0cyxcbiAgICAgIG9uSGl0cyA9IF9yZWYyJG9uSGl0cyA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKCkge30gOiBfcmVmMiRvbkhpdHMsXG4gICAgICBfcmVmMiRvbkVycm9yID0gX3JlZjIub25FcnJvcixcbiAgICAgIG9uRXJyb3IgPSBfcmVmMiRvbkVycm9yID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoZSkge1xuICAgIHRocm93IGU7XG4gIH0gOiBfcmVmMiRvbkVycm9yLFxuICAgICAgb25SYXRlTGltaXRSZWFjaGVkID0gX3JlZjIub25SYXRlTGltaXRSZWFjaGVkLFxuICAgICAgb25JbnZhbGlkQ3JlZGVudGlhbHMgPSBfcmVmMi5vbkludmFsaWRDcmVkZW50aWFscztcbiAgcmV0dXJuIHtcbiAgICB1c2VEZXZpY2VMb2NhdGlvbjogdXNlRGV2aWNlTG9jYXRpb24sXG4gICAgY29tcHV0ZVF1ZXJ5UGFyYW1zOiBjb21wdXRlUXVlcnlQYXJhbXMsXG4gICAgZm9ybWF0SW5wdXRWYWx1ZTogZm9ybWF0SW5wdXRWYWx1ZSxcbiAgICBvbkhpdHM6IG9uSGl0cyxcbiAgICBvbkVycm9yOiBvbkVycm9yLFxuICAgIG9uUmF0ZUxpbWl0UmVhY2hlZDogb25SYXRlTGltaXRSZWFjaGVkLFxuICAgIG9uSW52YWxpZENyZWRlbnRpYWxzOiBvbkludmFsaWRDcmVkZW50aWFsc1xuICB9O1xufTtcblxudmFyIHBhcmFtcyA9IHt9O1xudmFyIGNvbnRyb2xzID0ge307XG5cbnZhciBjb25maWd1cmUgPSBmdW5jdGlvbiBjb25maWd1cmUoY29uZmlndXJhdGlvbikge1xuICBwYXJhbXMgPSBleHRyYWN0UGFyYW1zKF9vYmplY3RTcHJlYWQoe30sIHBhcmFtcywge30sIGNvbmZpZ3VyYXRpb24pKTtcbiAgY29udHJvbHMgPSBleHRyYWN0Q29udHJvbHMoX29iamVjdFNwcmVhZCh7fSwgY29udHJvbHMsIHt9LCBjb25maWd1cmF0aW9uKSk7XG4gIHJldHVybiB7XG4gICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgY29udHJvbHM6IGNvbnRyb2xzXG4gIH07XG59O1xuXG52YXIgX2RlZmF1bHQgPSBjb25maWd1cmU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBjcmVhdGVBdXRvY29tcGxldGVEYXRhc2V0O1xuXG52YXIgX2NyZWF0ZUF1dG9jb21wbGV0ZVNvdXJjZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vY3JlYXRlQXV0b2NvbXBsZXRlU291cmNlXCIpKTtcblxudmFyIF9kZWZhdWx0VGVtcGxhdGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9kZWZhdWx0VGVtcGxhdGVzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlOyB9KTsga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpOyB9IHJldHVybiBrZXlzOyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpZiAoaSAlIDIpIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBjcmVhdGVBdXRvY29tcGxldGVEYXRhc2V0KG9wdGlvbnMpIHtcbiAgdmFyIHRlbXBsYXRlcyA9IF9vYmplY3RTcHJlYWQoe30sIF9kZWZhdWx0VGVtcGxhdGVzW1wiZGVmYXVsdFwiXSwge30sIG9wdGlvbnMudGVtcGxhdGVzKTtcblxuICB2YXIgc291cmNlID0gKDAsIF9jcmVhdGVBdXRvY29tcGxldGVTb3VyY2VbXCJkZWZhdWx0XCJdKShfb2JqZWN0U3ByZWFkKHt9LCBvcHRpb25zLCB7XG4gICAgZm9ybWF0SW5wdXRWYWx1ZTogdGVtcGxhdGVzLnZhbHVlLFxuICAgIHRlbXBsYXRlczogdW5kZWZpbmVkXG4gIH0pKTtcbiAgcmV0dXJuIHtcbiAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICB0ZW1wbGF0ZXM6IHRlbXBsYXRlcyxcbiAgICBkaXNwbGF5S2V5OiAndmFsdWUnLFxuICAgIG5hbWU6ICdwbGFjZXMnLFxuICAgIGNhY2hlOiBmYWxzZVxuICB9O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBjcmVhdGVBdXRvY29tcGxldGVTb3VyY2U7XG5cbnZhciBfY29uZmlndXJlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9jb25maWd1cmVcIikpO1xuXG52YXIgX2Zvcm1hdEhpdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZm9ybWF0SGl0XCIpKTtcblxudmFyIF92ZXJzaW9uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92ZXJzaW9uXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBpZiAoZW51bWVyYWJsZU9ubHkpIHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlOyB9KTsga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpOyB9IHJldHVybiBrZXlzOyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpZiAoaSAlIDIpIHsgb3duS2V5cyhPYmplY3Qoc291cmNlKSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgeyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOyB9IGVsc2UgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBjcmVhdGVBdXRvY29tcGxldGVTb3VyY2UoX3JlZikge1xuICB2YXIgYWxnb2xpYXNlYXJjaCA9IF9yZWYuYWxnb2xpYXNlYXJjaCxcbiAgICAgIGNsaWVudE9wdGlvbnMgPSBfcmVmLmNsaWVudE9wdGlvbnMsXG4gICAgICBhcGlLZXkgPSBfcmVmLmFwaUtleSxcbiAgICAgIGFwcElkID0gX3JlZi5hcHBJZCxcbiAgICAgIGhpdHNQZXJQYWdlID0gX3JlZi5oaXRzUGVyUGFnZSxcbiAgICAgIHBvc3Rjb2RlU2VhcmNoID0gX3JlZi5wb3N0Y29kZVNlYXJjaCxcbiAgICAgIGFyb3VuZExhdExuZyA9IF9yZWYuYXJvdW5kTGF0TG5nLFxuICAgICAgYXJvdW5kUmFkaXVzID0gX3JlZi5hcm91bmRSYWRpdXMsXG4gICAgICBhcm91bmRMYXRMbmdWaWFJUCA9IF9yZWYuYXJvdW5kTGF0TG5nVmlhSVAsXG4gICAgICBpbnNpZGVCb3VuZGluZ0JveCA9IF9yZWYuaW5zaWRlQm91bmRpbmdCb3gsXG4gICAgICBpbnNpZGVQb2x5Z29uID0gX3JlZi5pbnNpZGVQb2x5Z29uLFxuICAgICAgZ2V0UmFua2luZ0luZm8gPSBfcmVmLmdldFJhbmtpbmdJbmZvLFxuICAgICAgY291bnRyaWVzID0gX3JlZi5jb3VudHJpZXMsXG4gICAgICBmb3JtYXRJbnB1dFZhbHVlID0gX3JlZi5mb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgX3JlZiRjb21wdXRlUXVlcnlQYXJhID0gX3JlZi5jb21wdXRlUXVlcnlQYXJhbXMsXG4gICAgICBjb21wdXRlUXVlcnlQYXJhbXMgPSBfcmVmJGNvbXB1dGVRdWVyeVBhcmEgPT09IHZvaWQgMCA/IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9IDogX3JlZiRjb21wdXRlUXVlcnlQYXJhLFxuICAgICAgX3JlZiR1c2VEZXZpY2VMb2NhdGlvID0gX3JlZi51c2VEZXZpY2VMb2NhdGlvbixcbiAgICAgIHVzZURldmljZUxvY2F0aW9uID0gX3JlZiR1c2VEZXZpY2VMb2NhdGlvID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkdXNlRGV2aWNlTG9jYXRpbyxcbiAgICAgIF9yZWYkbGFuZ3VhZ2UgPSBfcmVmLmxhbmd1YWdlLFxuICAgICAgbGFuZ3VhZ2UgPSBfcmVmJGxhbmd1YWdlID09PSB2b2lkIDAgPyBuYXZpZ2F0b3IubGFuZ3VhZ2Uuc3BsaXQoJy0nKVswXSA6IF9yZWYkbGFuZ3VhZ2UsXG4gICAgICBfcmVmJG9uSGl0cyA9IF9yZWYub25IaXRzLFxuICAgICAgb25IaXRzID0gX3JlZiRvbkhpdHMgPT09IHZvaWQgMCA/IGZ1bmN0aW9uICgpIHt9IDogX3JlZiRvbkhpdHMsXG4gICAgICBfcmVmJG9uRXJyb3IgPSBfcmVmLm9uRXJyb3IsXG4gICAgICBvbkVycm9yID0gX3JlZiRvbkVycm9yID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoZSkge1xuICAgIHRocm93IGU7XG4gIH0gOiBfcmVmJG9uRXJyb3IsXG4gICAgICBvblJhdGVMaW1pdFJlYWNoZWQgPSBfcmVmLm9uUmF0ZUxpbWl0UmVhY2hlZCxcbiAgICAgIG9uSW52YWxpZENyZWRlbnRpYWxzID0gX3JlZi5vbkludmFsaWRDcmVkZW50aWFscyxcbiAgICAgIHR5cGUgPSBfcmVmLnR5cGU7XG4gIHZhciBwbGFjZXNDbGllbnQgPSBhbGdvbGlhc2VhcmNoLmluaXRQbGFjZXMoYXBwSWQsIGFwaUtleSwgY2xpZW50T3B0aW9ucyk7XG4gIHBsYWNlc0NsaWVudC5hcy5hZGRBbGdvbGlhQWdlbnQoXCJBbGdvbGlhIFBsYWNlcyBcIi5jb25jYXQoX3ZlcnNpb25bXCJkZWZhdWx0XCJdKSk7XG4gIHZhciBjb25maWd1cmF0aW9uID0gKDAsIF9jb25maWd1cmVbXCJkZWZhdWx0XCJdKSh7XG4gICAgaGl0c1BlclBhZ2U6IGhpdHNQZXJQYWdlLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgcG9zdGNvZGVTZWFyY2g6IHBvc3Rjb2RlU2VhcmNoLFxuICAgIGNvdW50cmllczogY291bnRyaWVzLFxuICAgIGxhbmd1YWdlOiBsYW5ndWFnZSxcbiAgICBhcm91bmRMYXRMbmc6IGFyb3VuZExhdExuZyxcbiAgICBhcm91bmRSYWRpdXM6IGFyb3VuZFJhZGl1cyxcbiAgICBhcm91bmRMYXRMbmdWaWFJUDogYXJvdW5kTGF0TG5nVmlhSVAsXG4gICAgaW5zaWRlQm91bmRpbmdCb3g6IGluc2lkZUJvdW5kaW5nQm94LFxuICAgIGluc2lkZVBvbHlnb246IGluc2lkZVBvbHlnb24sXG4gICAgZ2V0UmFua2luZ0luZm86IGdldFJhbmtpbmdJbmZvLFxuICAgIGZvcm1hdElucHV0VmFsdWU6IGZvcm1hdElucHV0VmFsdWUsXG4gICAgY29tcHV0ZVF1ZXJ5UGFyYW1zOiBjb21wdXRlUXVlcnlQYXJhbXMsXG4gICAgdXNlRGV2aWNlTG9jYXRpb246IHVzZURldmljZUxvY2F0aW9uLFxuICAgIG9uSGl0czogb25IaXRzLFxuICAgIG9uRXJyb3I6IG9uRXJyb3IsXG4gICAgb25SYXRlTGltaXRSZWFjaGVkOiBvblJhdGVMaW1pdFJlYWNoZWQsXG4gICAgb25JbnZhbGlkQ3JlZGVudGlhbHM6IG9uSW52YWxpZENyZWRlbnRpYWxzXG4gIH0pO1xuICB2YXIgcGFyYW1zID0gY29uZmlndXJhdGlvbi5wYXJhbXM7XG4gIHZhciBjb250cm9scyA9IGNvbmZpZ3VyYXRpb24uY29udHJvbHM7XG4gIHZhciB1c2VyQ29vcmRzO1xuICB2YXIgdHJhY2tlciA9IG51bGw7XG5cbiAgaWYgKGNvbnRyb2xzLnVzZURldmljZUxvY2F0aW9uKSB7XG4gICAgdHJhY2tlciA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgdmFyIGNvb3JkcyA9IF9yZWYyLmNvb3JkcztcbiAgICAgIHVzZXJDb29yZHMgPSBcIlwiLmNvbmNhdChjb29yZHMubGF0aXR1ZGUsIFwiLFwiKS5jb25jYXQoY29vcmRzLmxvbmdpdHVkZSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZWFyY2hlcihxdWVyeSwgY2IpIHtcbiAgICB2YXIgc2VhcmNoUGFyYW1zID0gX29iamVjdFNwcmVhZCh7fSwgcGFyYW1zLCB7XG4gICAgICBxdWVyeTogcXVlcnlcbiAgICB9KTtcblxuICAgIGlmICh1c2VyQ29vcmRzKSB7XG4gICAgICBzZWFyY2hQYXJhbXMuYXJvdW5kTGF0TG5nID0gdXNlckNvb3JkcztcbiAgICB9XG5cbiAgICByZXR1cm4gcGxhY2VzQ2xpZW50LnNlYXJjaChjb250cm9scy5jb21wdXRlUXVlcnlQYXJhbXMoc2VhcmNoUGFyYW1zKSkudGhlbihmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgdmFyIGhpdHMgPSBjb250ZW50LmhpdHMubWFwKGZ1bmN0aW9uIChoaXQsIGhpdEluZGV4KSB7XG4gICAgICAgIHJldHVybiAoMCwgX2Zvcm1hdEhpdFtcImRlZmF1bHRcIl0pKHtcbiAgICAgICAgICBmb3JtYXRJbnB1dFZhbHVlOiBjb250cm9scy5mb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgICAgIGhpdDogaGl0LFxuICAgICAgICAgIGhpdEluZGV4OiBoaXRJbmRleCxcbiAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgcmF3QW5zd2VyOiBjb250ZW50XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjb250cm9scy5vbkhpdHMoe1xuICAgICAgICBoaXRzOiBoaXRzLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHJhd0Fuc3dlcjogY29udGVudFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGl0cztcbiAgICB9KS50aGVuKGNiKVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5zdGF0dXNDb2RlID09PSA0MDMgJiYgZS5tZXNzYWdlID09PSAnSW52YWxpZCBBcHBsaWNhdGlvbi1JRCBvciBBUEkga2V5Jykge1xuICAgICAgICBjb250cm9scy5vbkludmFsaWRDcmVkZW50aWFscygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKGUuc3RhdHVzQ29kZSA9PT0gNDI5KSB7XG4gICAgICAgIGNvbnRyb2xzLm9uUmF0ZUxpbWl0UmVhY2hlZCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnRyb2xzLm9uRXJyb3IoZSk7XG4gICAgfSk7XG4gIH1cblxuICBzZWFyY2hlci5jb25maWd1cmUgPSBmdW5jdGlvbiAocGFydGlhbCkge1xuICAgIHZhciB1cGRhdGVkID0gKDAsIF9jb25maWd1cmVbXCJkZWZhdWx0XCJdKShfb2JqZWN0U3ByZWFkKHt9LCBwYXJhbXMsIHt9LCBjb250cm9scywge30sIHBhcnRpYWwpKTtcbiAgICBwYXJhbXMgPSB1cGRhdGVkLnBhcmFtcztcbiAgICBjb250cm9scyA9IHVwZGF0ZWQuY29udHJvbHM7XG5cbiAgICBpZiAoY29udHJvbHMudXNlRGV2aWNlTG9jYXRpb24gJiYgdHJhY2tlciA9PT0gbnVsbCkge1xuICAgICAgdHJhY2tlciA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgICB2YXIgY29vcmRzID0gX3JlZjMuY29vcmRzO1xuICAgICAgICB1c2VyQ29vcmRzID0gXCJcIi5jb25jYXQoY29vcmRzLmxhdGl0dWRlLCBcIixcIikuY29uY2F0KGNvb3Jkcy5sb25naXR1ZGUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghY29udHJvbHMudXNlRGV2aWNlTG9jYXRpb24gJiYgdHJhY2tlciAhPT0gbnVsbCkge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2godHJhY2tlcik7XG4gICAgICB0cmFja2VyID0gbnVsbDtcbiAgICAgIHVzZXJDb29yZHMgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gc2VhcmNoZXI7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9jb25maWd1cmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2NvbmZpZ3VyZVwiKSk7XG5cbnZhciBfZm9ybWF0SGl0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9mb3JtYXRIaXRcIikpO1xuXG52YXIgX3ZlcnNpb24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZlcnNpb25cIikpO1xuXG52YXIgX2RlZmF1bHRUZW1wbGF0ZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2RlZmF1bHRUZW1wbGF0ZXNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBmaWx0ZXJBcHBsaWNhYmxlUGFyYW1zID0gZnVuY3Rpb24gZmlsdGVyQXBwbGljYWJsZVBhcmFtcyhwYXJhbXMpIHtcbiAgdmFyIGhpdHNQZXJQYWdlID0gcGFyYW1zLmhpdHNQZXJQYWdlLFxuICAgICAgYXJvdW5kTGF0TG5nID0gcGFyYW1zLmFyb3VuZExhdExuZyxcbiAgICAgIGdldFJhbmtpbmdJbmZvID0gcGFyYW1zLmdldFJhbmtpbmdJbmZvLFxuICAgICAgbGFuZ3VhZ2UgPSBwYXJhbXMubGFuZ3VhZ2U7XG4gIHZhciBmaWx0ZXJlZCA9IHt9O1xuXG4gIGlmICh0eXBlb2YgaGl0c1BlclBhZ2UgPT09ICdudW1iZXInKSB7XG4gICAgZmlsdGVyZWQuaGl0c1BlclBhZ2UgPSBoaXRzUGVyUGFnZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgZmlsdGVyZWQubGFuZ3VhZ2UgPSBsYW5ndWFnZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZ2V0UmFua2luZ0luZm8gPT09ICdib29sZWFuJykge1xuICAgIGZpbHRlcmVkLmdldFJhbmtpbmdJbmZvID0gZ2V0UmFua2luZ0luZm87XG4gIH1cblxuICBpZiAodHlwZW9mIGFyb3VuZExhdExuZyA9PT0gJ3N0cmluZycpIHtcbiAgICBmaWx0ZXJlZC5hcm91bmRMYXRMbmcgPSBhcm91bmRMYXRMbmc7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyZWQ7XG59O1xuXG52YXIgY3JlYXRlUmV2ZXJzZUdlb2NvZGluZ1NvdXJjZSA9IGZ1bmN0aW9uIGNyZWF0ZVJldmVyc2VHZW9jb2RpbmdTb3VyY2UoX3JlZikge1xuICB2YXIgYWxnb2xpYXNlYXJjaCA9IF9yZWYuYWxnb2xpYXNlYXJjaCxcbiAgICAgIGNsaWVudE9wdGlvbnMgPSBfcmVmLmNsaWVudE9wdGlvbnMsXG4gICAgICBhcGlLZXkgPSBfcmVmLmFwaUtleSxcbiAgICAgIGFwcElkID0gX3JlZi5hcHBJZCxcbiAgICAgIGhpdHNQZXJQYWdlID0gX3JlZi5oaXRzUGVyUGFnZSxcbiAgICAgIGFyb3VuZExhdExuZyA9IF9yZWYuYXJvdW5kTGF0TG5nLFxuICAgICAgZ2V0UmFua2luZ0luZm8gPSBfcmVmLmdldFJhbmtpbmdJbmZvLFxuICAgICAgX3JlZiRmb3JtYXRJbnB1dFZhbHVlID0gX3JlZi5mb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgZm9ybWF0SW5wdXRWYWx1ZSA9IF9yZWYkZm9ybWF0SW5wdXRWYWx1ZSA9PT0gdm9pZCAwID8gX2RlZmF1bHRUZW1wbGF0ZXNbXCJkZWZhdWx0XCJdLnZhbHVlIDogX3JlZiRmb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgX3JlZiRsYW5ndWFnZSA9IF9yZWYubGFuZ3VhZ2UsXG4gICAgICBsYW5ndWFnZSA9IF9yZWYkbGFuZ3VhZ2UgPT09IHZvaWQgMCA/IG5hdmlnYXRvci5sYW5ndWFnZS5zcGxpdCgnLScpWzBdIDogX3JlZiRsYW5ndWFnZSxcbiAgICAgIF9yZWYkb25IaXRzID0gX3JlZi5vbkhpdHMsXG4gICAgICBvbkhpdHMgPSBfcmVmJG9uSGl0cyA9PT0gdm9pZCAwID8gZnVuY3Rpb24gKCkge30gOiBfcmVmJG9uSGl0cyxcbiAgICAgIF9yZWYkb25FcnJvciA9IF9yZWYub25FcnJvcixcbiAgICAgIG9uRXJyb3IgPSBfcmVmJG9uRXJyb3IgPT09IHZvaWQgMCA/IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhyb3cgZTtcbiAgfSA6IF9yZWYkb25FcnJvcixcbiAgICAgIG9uUmF0ZUxpbWl0UmVhY2hlZCA9IF9yZWYub25SYXRlTGltaXRSZWFjaGVkLFxuICAgICAgb25JbnZhbGlkQ3JlZGVudGlhbHMgPSBfcmVmLm9uSW52YWxpZENyZWRlbnRpYWxzO1xuICB2YXIgcGxhY2VzQ2xpZW50ID0gYWxnb2xpYXNlYXJjaC5pbml0UGxhY2VzKGFwcElkLCBhcGlLZXksIGNsaWVudE9wdGlvbnMpO1xuICBwbGFjZXNDbGllbnQuYXMuYWRkQWxnb2xpYUFnZW50KFwiQWxnb2xpYSBQbGFjZXMgXCIuY29uY2F0KF92ZXJzaW9uW1wiZGVmYXVsdFwiXSkpO1xuICB2YXIgY29uZmlndXJhdGlvbiA9ICgwLCBfY29uZmlndXJlW1wiZGVmYXVsdFwiXSkoe1xuICAgIGFwaUtleTogYXBpS2V5LFxuICAgIGFwcElkOiBhcHBJZCxcbiAgICBoaXRzUGVyUGFnZTogaGl0c1BlclBhZ2UsXG4gICAgYXJvdW5kTGF0TG5nOiBhcm91bmRMYXRMbmcsXG4gICAgZ2V0UmFua2luZ0luZm86IGdldFJhbmtpbmdJbmZvLFxuICAgIGxhbmd1YWdlOiBsYW5ndWFnZSxcbiAgICBmb3JtYXRJbnB1dFZhbHVlOiBmb3JtYXRJbnB1dFZhbHVlLFxuICAgIG9uSGl0czogb25IaXRzLFxuICAgIG9uRXJyb3I6IG9uRXJyb3IsXG4gICAgb25SYXRlTGltaXRSZWFjaGVkOiBvblJhdGVMaW1pdFJlYWNoZWQsXG4gICAgb25JbnZhbGlkQ3JlZGVudGlhbHM6IG9uSW52YWxpZENyZWRlbnRpYWxzXG4gIH0pO1xuICB2YXIgcGFyYW1zID0gZmlsdGVyQXBwbGljYWJsZVBhcmFtcyhjb25maWd1cmF0aW9uLnBhcmFtcyk7XG4gIHZhciBjb250cm9scyA9IGNvbmZpZ3VyYXRpb24uY29udHJvbHM7XG5cbiAgdmFyIHNlYXJjaGVyID0gZnVuY3Rpb24gc2VhcmNoZXIocXVlcnlBcm91bmRMYXRMbmcsIGNiKSB7XG4gICAgdmFyIGZpbmFsQXJvdW5kTGF0TG5nID0gcXVlcnlBcm91bmRMYXRMbmcgfHwgcGFyYW1zLmFyb3VuZExhdExuZztcblxuICAgIGlmICghZmluYWxBcm91bmRMYXRMbmcpIHtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcignQSBsb2NhdGlvbiBtdXN0IGJlIHByb3ZpZGVkIGZvciByZXZlcnNlIGdlb2NvZGluZycpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGxhY2VzQ2xpZW50LnJldmVyc2UoX29iamVjdFNwcmVhZCh7fSwgcGFyYW1zLCB7XG4gICAgICBhcm91bmRMYXRMbmc6IGZpbmFsQXJvdW5kTGF0TG5nXG4gICAgfSkpLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIHZhciBoaXRzID0gY29udGVudC5oaXRzLm1hcChmdW5jdGlvbiAoaGl0LCBoaXRJbmRleCkge1xuICAgICAgICByZXR1cm4gKDAsIF9mb3JtYXRIaXRbXCJkZWZhdWx0XCJdKSh7XG4gICAgICAgICAgZm9ybWF0SW5wdXRWYWx1ZTogY29udHJvbHMuZm9ybWF0SW5wdXRWYWx1ZSxcbiAgICAgICAgICBoaXQ6IGhpdCxcbiAgICAgICAgICBoaXRJbmRleDogaGl0SW5kZXgsXG4gICAgICAgICAgcXVlcnk6IGZpbmFsQXJvdW5kTGF0TG5nLFxuICAgICAgICAgIHJhd0Fuc3dlcjogY29udGVudFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY29udHJvbHMub25IaXRzKHtcbiAgICAgICAgaGl0czogaGl0cyxcbiAgICAgICAgcXVlcnk6IGZpbmFsQXJvdW5kTGF0TG5nLFxuICAgICAgICByYXdBbnN3ZXI6IGNvbnRlbnRcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGhpdHM7XG4gICAgfSkudGhlbihjYilbXCJjYXRjaFwiXShmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUuc3RhdHVzQ29kZSA9PT0gNDAzICYmIGUubWVzc2FnZSA9PT0gJ0ludmFsaWQgQXBwbGljYXRpb24tSUQgb3IgQVBJIGtleScpIHtcbiAgICAgICAgY29udHJvbHMub25JbnZhbGlkQ3JlZGVudGlhbHMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChlLnN0YXR1c0NvZGUgPT09IDQyOSkge1xuICAgICAgICBjb250cm9scy5vblJhdGVMaW1pdFJlYWNoZWQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb250cm9scy5vbkVycm9yKGUpO1xuICAgIH0pO1xuICB9O1xuXG4gIHNlYXJjaGVyLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChwYXJ0aWFsKSB7XG4gICAgdmFyIHVwZGF0ZWQgPSAoMCwgX2NvbmZpZ3VyZVtcImRlZmF1bHRcIl0pKF9vYmplY3RTcHJlYWQoe30sIHBhcmFtcywge30sIGNvbnRyb2xzLCB7fSwgcGFydGlhbCkpO1xuICAgIHBhcmFtcyA9IGZpbHRlckFwcGxpY2FibGVQYXJhbXModXBkYXRlZC5wYXJhbXMpO1xuICAgIGNvbnRyb2xzID0gdXBkYXRlZC5jb250cm9scztcbiAgICByZXR1cm4gc2VhcmNoZXI7XG4gIH07XG5cbiAgcmV0dXJuIHNlYXJjaGVyO1xufTtcblxudmFyIF9kZWZhdWx0ID0gY3JlYXRlUmV2ZXJzZUdlb2NvZGluZ1NvdXJjZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF9mb3JtYXRJbnB1dFZhbHVlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9mb3JtYXRJbnB1dFZhbHVlXCIpKTtcblxudmFyIF9mb3JtYXREcm9wZG93blZhbHVlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9mb3JtYXREcm9wZG93blZhbHVlXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL2FsZ29saWEuc3ZnJyAqL1xudmFyIGFsZ29saWFMb2dvID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjExN1xcXCIgaGVpZ2h0PVxcXCIxN1xcXCIgdmlld0JveD1cXFwiMCAwIDEzMCAxOVxcXCI+PGcgZmlsbD1cXFwibm9uZVxcXCIgZmlsbC1ydWxlPVxcXCJldmVub2RkXFxcIj48ZyBmaWxsLXJ1bGU9XFxcIm5vbnplcm9cXFwiPjxwYXRoIGZpbGw9XFxcIiM1NDY4RkZcXFwiIGQ9XFxcIk01OS4zOTkuMDQ0aDEzLjI5OWEyLjM3MiAyLjM3MiAwIDAgMSAyLjM3NyAyLjM2NHYxMy4yMzRhMi4zNzIgMi4zNzIgMCAwIDEtMi4zNzcgMi4zNjRINTkuMzk5YTIuMzcyIDIuMzcyIDAgMCAxLTIuMzc3LTIuMzY0VjIuNDAzQTIuMzY4IDIuMzY4IDAgMCAxIDU5LjM5OS4wNDR6XFxcIi8+PHBhdGggZmlsbD1cXFwiI0ZGRlxcXCIgZD1cXFwiTTY2LjI1NyA0LjU4MmMtMi44MTUgMC01LjEgMi4yNzItNS4xIDUuMDc4IDAgMi44MDYgMi4yODQgNS4wNzIgNS4xIDUuMDcyIDIuODE1IDAgNS4xLTIuMjcyIDUuMS01LjA3OCAwLTIuODA2LTIuMjc5LTUuMDcyLTUuMS01LjA3MnptMCA4LjY1MmMtMS45ODMgMC0zLjU5My0xLjYwMi0zLjU5My0zLjU3NCAwLTEuOTcyIDEuNjEtMy41NzQgMy41OTMtMy41NzQgMS45ODMgMCAzLjU5MyAxLjYwMiAzLjU5MyAzLjU3NGEzLjU4MiAzLjU4MiAwIDAgMS0zLjU5MyAzLjU3NHptMC02LjQxOFY5LjQ4YzAgLjA3Ni4wODIuMTMxLjE1My4wOTNsMi4zNzctMS4yMjZjLjA1NS0uMDI3LjA3MS0uMDkzLjA0NC0uMTQ3YTIuOTYgMi45NiAwIDAgMC0yLjQ2NS0xLjQ4N2MtLjA1NSAwLS4xMS4wNDQtLjExLjEwNGguMDAxem0tMy4zMy0xLjk1NmwtLjMxMi0uMzFhLjc4My43ODMgMCAwIDAtMS4xMDYgMGwtLjM3Mi4zN2EuNzczLjc3MyAwIDAgMCAwIDEuMWwuMzA3LjMwNWMuMDQ5LjA1LjEyMS4wMzguMTY0LS4wMS4xODEtLjI0Ni4zNzgtLjQ4LjU5Ny0uNjk4LjIyNS0uMjIzLjQ1NS0uNDIuNzA3LS41OTkuMDU1LS4wMzMuMDYtLjEwOS4wMTYtLjE1OGgtLjAwMXptNS4wMDEtLjgwNnYtLjYxNmEuNzgxLjc4MSAwIDAgMC0uNzgzLS43NzloLTEuODI0YS43OC43OCAwIDAgMC0uNzgzLjc4di42MzFjMCAuMDcxLjA2Ni4xMi4xMzcuMTA0YTUuNzM2IDUuNzM2IDAgMCAxIDEuNTg4LS4yMjNjLjUyIDAgMS4wMzUuMDcxIDEuNTM0LjIwN2EuMTA2LjEwNiAwIDAgMCAuMTMxLS4xMDR6XFxcIi8+PHBhdGggZmlsbD1cXFwiIzI1MkM2MVxcXCIgZD1cXFwiTTUuMDI3IDEwLjI0NmMwIC42OTgtLjI1MiAxLjI0Ni0uNzU3IDEuNjQ0LS41MDUuMzk3LTEuMjAxLjU5Ni0yLjA4OS41OTYtLjg4OCAwLTEuNjE1LS4xMzgtMi4xODEtLjQxNHYtMS4yMTRjLjM1OC4xNjguNzM5LjMwMSAxLjE0MS4zOTcuNDAzLjA5Ny43NzguMTQ1IDEuMTI1LjE0NS41MDggMCAuODg0LS4wOTcgMS4xMjUtLjI5YS45NDUuOTQ1IDAgMCAwIC4zNjMtLjc3OS45NzguOTc4IDAgMCAwLS4zMzMtLjc0N2MtLjIyMi0uMjA0LS42OC0uNDQ2LTEuMzc1LS43MjVDMS4zMyA4LjU3LjgyNSA4LjI0LjUzMSA3Ljg2NWMtLjI5NC0uMzcyLS40NC0uODItLjQ0LTEuMzQzIDAtLjY1NS4yMzMtMS4xNy42OTgtMS41NDcuNDY1LS4zNzYgMS4wOS0uNTY0IDEuODc1LS41NjQuNzUyIDAgMS41LjE2NSAyLjI0NS40OTRsLS40MDggMS4wNDdjLS42OTgtLjI5NC0xLjMyMS0uNDQtMS44NjktLjQ0LS40MTUgMC0uNzMuMDktLjk0NS4yNzFhLjg5Ljg5IDAgMCAwLS4zMjIuNzE3YzAgLjIwNC4wNDMuMzguMTI5LjUyNC4wODYuMTQ1LjIyNy4yODIuNDI0LjQxMS4xOTcuMTMuNTUxLjMgMS4wNjMuNTEuNTc3LjI0Ljk5OS40NjQgMS4yNjguNjcxLjI2OS4yMDguNDY1LjQ0Mi41OTEuNzA0LjEyNS4yNjEuMTg4LjU3LjE4OC45MjRsLS4wMDEuMDAyem0zLjk4IDIuMjRjLS45MjQgMC0xLjY0Ni0uMjY5LTIuMTY3LS44MDgtLjUyMS0uNTM5LS43ODEtMS4yOC0uNzgxLTIuMjI2IDAtLjk3LjI0Mi0xLjczMy43MjUtMi4yODguNDgzLS41NTUgMS4xNDgtLjgzMyAxLjk5My0uODMzLjc4NCAwIDEuNDA0LjIzOCAxLjg1OC43MTQuNDU1LjQ3Ni42ODIgMS4xMzIuNjgyIDEuOTY2di42ODJINy4zNTljLjAxOC41NzcuMTc0IDEuMDIuNDY3IDEuMzMuMjk0LjMxLjcwNy40NjQgMS4yNDEuNDY0LjM1MSAwIC42NzgtLjAzMy45OC0uMDk5YTUuMSA1LjEgMCAwIDAgLjk3NS0uMzN2MS4wMjZhMy44NjUgMy44NjUgMCAwIDEtLjkzNS4zMTIgNS43MjMgNS43MjMgMCAwIDEtMS4wOC4wOTF6bTcuNDYtLjEwN2wtLjI1Mi0uODI3aC0uMDQzYy0uMjg2LjM2Mi0uNTc1LjYwOC0uODY1Ljc0LS4yOS4xMy0uNjYyLjE5NS0xLjExNy4xOTUtLjU4NCAwLTEuMDM5LS4xNTgtMS4zNjctLjQ3My0uMzI4LS4zMTUtLjQ5MS0uNzYtLjQ5MS0xLjMzNyAwLS42MTIuMjI3LTEuMDc0LjY4Mi0xLjM4Ni40NTUtLjMxMiAxLjE0OC0uNDgyIDIuMDc5LS41MWwxLjAyNi0uMDMydi0uMzE3YzAtLjM4LS4wODktLjY2My0uMjY2LS44NS0uMTc3LS4xODktLjQ1Mi0uMjgzLS44MjQtLjI4My0uMzA0IDAtLjU5Ni4wNDUtLjg3NS4xMzRhNi42OCA2LjY4IDAgMCAwLS44MDYuMzE3bC0uNDA4LS45MDJhNC40MTQgNC40MTQgMCAwIDEgMS4wNTgtLjM4NCA0Ljg1NiA0Ljg1NiAwIDAgMSAxLjA4NS0uMTMyYy43NTYgMCAxLjMyNi4xNjUgMS43MTEuNDk0LjM4NS4zMy41NzcuODQ3LjU3NyAxLjU1MnY0LjAwMWgtLjkwNHptNS42NzctNi4wNDhjLjI1NCAwIC40NjQuMDE4LjYyOC4wNTRsLS4xMjQgMS4xNzZhMi4zODMgMi4zODMgMCAwIDAtLjU1OS0uMDY0Yy0uNTA1IDAtLjkxNC4xNjUtMS4yMjcuNDk0LS4zMTMuMzMtLjQ3Ljc1Ny0uNDcgMS4yODR2My4xMDRIMTkuMTNWNi40NGguOTg4bC4xNjcgMS4wNDdoLjA2NGMuMTk3LS4zNTQuNDU0LS42MzYuNzcxLS44NDNhMS44MyAxLjgzIDAgMCAxIDEuMDIzLS4zMTJoLjAwMXptNC4xMjUgNi4xNTVjLS44OTkgMC0xLjU4Mi0uMjYyLTIuMDQ5LS43ODctLjQ2Ny0uNTI1LS43MDEtMS4yNzctLjcwMS0yLjI1OSAwLS45OTkuMjQ0LTEuNzY3LjczMy0yLjMwNC40ODktLjUzNyAxLjE5NS0uODA2IDIuMTE5LS44MDYuNjI3IDAgMS4xOTEuMTE2IDEuNjkyLjM1bC0uMzgxIDEuMDE0Yy0uNTM0LS4yMDgtLjk3NC0uMzEyLTEuMzIxLS4zMTItMS4wMjggMC0xLjU0Mi42ODItMS41NDIgMi4wNDYgMCAuNjY2LjEyOCAxLjE2Ni4zODQgMS41MDEuMjU2LjMzNS42MzEuNTAyIDEuMTI1LjUwMmEzLjIzIDMuMjMgMCAwIDAgMS41OTUtLjQxOXYxLjEwMWEyLjUzIDIuNTMgMCAwIDEtLjcyMi4yODUgNC4zNTYgNC4zNTYgMCAwIDEtLjkzMi4wODZ2LjAwMnptOC4yNzctLjEwN2gtMS4yNjhWOC43MjdjMC0uNDU4LS4wOTItLjgtLjI3Ny0xLjAyNi0uMTg0LS4yMjYtLjQ3Ny0uMzM4LS44NzgtLjMzOC0uNTMgMC0uOTE5LjE1OC0xLjE2OC40NzUtLjI0OS4zMTctLjM3My44NDgtLjM3MyAxLjU5M3YyLjk1SDI5LjMyVjQuMDIyaDEuMjYydjIuMTIyYzAgLjM0LS4wMjEuNzA0LS4wNjQgMS4wOWguMDgxYTEuNzYgMS43NiAwIDAgMSAuNzE3LS42NjZjLjMwNi0uMTU4LjY2My0uMjM2IDEuMDcyLS4yMzYgMS40MzkgMCAyLjE1OS43MjUgMi4xNTkgMi4xNzV2My44NzNsLS4wMDEtLjAwMnptNy42NDgtNi4wNDhjLjc0MSAwIDEuMzE5LjI3IDEuNzMyLjgwNi40MTQuNTM3LjYyIDEuMjkxLjYyIDIuMjYxIDAgLjk3NC0uMjA5IDEuNzMyLS42MjggMi4yNzUtLjQxOS41NDItMS4wMDEuODE0LTEuNzQ2LjgxNC0uNzUyIDAtMS4zMzYtLjI3LTEuNzUxLS44MWgtLjA4NmwtLjIzMS43MDNoLS45NDVWNC4wMjNoMS4yNjJWNi4wMWwtLjAyMS42NTUtLjAzMi41NTNoLjA1NGMuNDAxLS41OS45OTItLjg4NiAxLjc3Mi0uODg2em0yLjkxNy4xMDdoMS4zNzVsMS4yMDggMy4zNjhjLjE4My40OC4zMDQuOTMxLjM2NSAxLjM1NGguMDQzYy4wMzItLjE5Ny4wOTEtLjQzNi4xNzctLjcxNy4wODYtLjI4LjU0MS0xLjYxNiAxLjM2NC00LjAwNGgxLjM2NGwtMi41NDEgNi43M2MtLjQ2MiAxLjIzNS0xLjIzMiAxLjg1My0yLjMxIDEuODUzLS4yNzkgMC0uNTUxLS4wMy0uODE2LS4wOXYtMWMuMTkuMDQzLjQwNi4wNjQuNjUuMDY0LjYwOSAwIDEuMDM3LS4zNTMgMS4yODQtMS4wNThsLjIyLS41NTktMi4zODUtNS45NGguMDAyem0tMy4yNDQuOTI0Yy0uNTA4IDAtLjg3NS4xNS0xLjA5OC40NDgtLjIyNC4zLS4zMzkuOC0uMzQ2IDEuNTAxdi4wODZjMCAuNzIzLjExNSAxLjI0Ny4zNDQgMS41NzEuMjI5LjMyNC42MDMuNDg2IDEuMTIzLjQ4Ni40NDggMCAuNzg3LS4xNzcgMS4wMTgtLjUzMi4yMzEtLjM1NC4zNDYtLjg2Ny4zNDYtMS41MzYgMC0xLjM1LS40NjItMi4wMjUtMS4zODYtMi4wMjVsLS4wMDEuMDAxem0tMjcuMjggNC4xNTdjLjQ1OCAwIC44MjYtLjEyOCAxLjEwNC0uMzg0LjI3OC0uMjU2LjQxNi0uNjE1LjQxNi0xLjA3N3YtLjUxNmwtLjc2My4wMzJjLS41OTQuMDIxLTEuMDI3LjEyMS0xLjI5Ny4yOThzLS40MDYuNDQ4LS40MDYuODE0YzAgLjI2NS4wNzkuNDcuMjM2LjYxNS4xNTguMTQ1LjM5NC4yMTguNzA5LjIxOGguMDAxek04Ljc3NSA3LjI4N2MtLjQwMSAwLS43MjIuMTI3LS45NjQuMzgxcy0uMzg2LjYyNS0uNDMyIDEuMTEyaDIuNjk2Yy0uMDA3LS40OS0uMTI1LS44NjItLjM1NC0xLjExNS0uMjI5LS4yNTItLjU0NC0uMzc5LS45NDUtLjM3OWwtLjAwMS4wMDF6XFxcIi8+PC9nPjxwYXRoIGZpbGw9XFxcIiM1NDY4RkZcXFwiIGQ9XFxcIk0xMDIuMTYyIDEzLjc4NGMwIDEuNDU1LS4zNzIgMi41MTctMS4xMjMgMy4xOTMtLjc1LjY3Ni0xLjg5NSAxLjAxMy0zLjQ0IDEuMDEzLS41NjQgMC0xLjczNi0uMTA5LTIuNjczLS4zMTZsLjM0NS0xLjY4OWMuNzgzLjE2MyAxLjgxOS4yMDcgMi4zNjEuMjA3Ljg2IDAgMS40NzMtLjE3NCAxLjg0LS41MjMuMzY3LS4zNDkuNTQ4LS44NjYuNTQ4LTEuNTUzdi0uMzQ5YTYuMzc0IDYuMzc0IDAgMCAxLS44MzguMzE2IDQuMTUxIDQuMTUxIDAgMCAxLTEuMTk0LjE1OCA0LjUxNSA0LjUxNSAwIDAgMS0xLjYxNi0uMjc4IDMuMzg1IDMuMzg1IDAgMCAxLTEuMjU0LS44MTcgMy43NDQgMy43NDQgMCAwIDEtLjgxMS0xLjM1Yy0uMTkyLS41NC0uMjktMS41MDUtLjI5LTIuMjEzIDAtLjY2NS4xMDQtMS40OTguMzA3LTIuMDU0YTMuOTI1IDMuOTI1IDAgMCAxIC45MDQtMS40MzMgNC4xMjQgNC4xMjQgMCAwIDEgMS40NDEtLjkyNiA1LjMxIDUuMzEgMCAwIDEgMS45NDUtLjM2NWMuNjk2IDAgMS4zMzcuMDg3IDEuOTYxLjE5MWExNS44NiAxNS44NiAwIDAgMSAxLjU4OC4zMzJ2OC40NTZoLS4wMDF6bS01Ljk1NS00LjIwNmMwIC44OTMuMTk3IDEuODg1LjU5MiAyLjMuMzk0LjQxMy45MDQuNjIgMS41MjguNjIuMzQgMCAuNjYzLS4wNDkuOTY0LS4xNDJhMi43NSAyLjc1IDAgMCAwIC43MzQtLjMzMnYtNS4yOWE4LjUzMSA4LjUzMSAwIDAgMC0xLjQxMy0uMThjLS43NzgtLjAyMi0xLjM2OS4yOTQtMS43ODYuODAxLS40MTEuNTA3LS42MTkgMS4zOTUtLjYxOSAyLjIyM3ptMTYuMTIxIDBjMCAuNzItLjEwNCAxLjI2NC0uMzE4IDEuODU4YTQuMzg5IDQuMzg5IDAgMCAxLS45MDQgMS41MmMtLjM4OS40Mi0uODU0Ljc0Ni0xLjQwMi45NzUtLjU0OC4yMy0xLjM5MS4zNi0xLjgxMy4zNi0uNDIyLS4wMDUtMS4yNi0uMTI1LTEuODAyLS4zNmE0LjA4OCA0LjA4OCAwIDAgMS0xLjM5Ny0uOTc1IDQuNDg2IDQuNDg2IDAgMCAxLS45MDktMS41MiA1LjAzNyA1LjAzNyAwIDAgMS0uMzI5LTEuODU4YzAtLjcxOS4wOTktMS40MS4zMTgtMS45OTkuMjE5LS41ODguNTI2LTEuMDkuOTItMS41MDkuMzk0LS40Mi44NjUtLjc0IDEuNDAyLS45N2E0LjU0NyA0LjU0NyAwIDAgMSAxLjc4Ni0uMzM4IDQuNjkgNC42OSAwIDAgMSAxLjc5MS4zMzhjLjU0OC4yMyAxLjAxOS41NSAxLjQwMi45Ny4zODkuNDIuNjkuOTIxLjkwOSAxLjUxLjIzLjU4Ny4zNDUgMS4yOC4zNDUgMS45OThoLjAwMXptLTIuMTkyLjAwNWMwLS45Mi0uMjAzLTEuNjg5LS41OTctMi4yMjMtLjM5NC0uNTM5LS45NDgtLjgwNi0xLjY1NC0uODA2LS43MDcgMC0xLjI2LjI2Ny0xLjY1NC44MDYtLjM5NC41NC0uNTg2IDEuMzAyLS41ODYgMi4yMjMgMCAuOTMyLjE5NyAxLjU1OC41OTIgMi4wOTguMzk0LjU0NS45NDguODEyIDEuNjU0LjgxMi43MDcgMCAxLjI2LS4yNzIgMS42NTQtLjgxMi4zOTQtLjU0NS41OTItMS4xNjYuNTkyLTIuMDk4aC0uMDAxem02Ljk2MyA0LjcwOGMtMy41MTEuMDE2LTMuNTExLTIuODIyLTMuNTExLTMuMjc0TDExMy41ODMuOTVsMi4xNDItLjMzOHYxMC4wMDNjMCAuMjU2IDAgMS44OCAxLjM3NSAxLjg4NXYxLjc5M2gtLjAwMXpNMTIwLjg3MyAxNC4yOTFoLTIuMTUzVjUuMDk1bDIuMTUzLS4zMzh6TTExOS43OTQgMy43NWMuNzE4IDAgMS4zMDQtLjU3OSAxLjMwNC0xLjI5MiAwLS43MTQtLjU4MS0xLjI5LTEuMzA0LTEuMjktLjcyMyAwLTEuMzA0LjU3Ny0xLjMwNCAxLjI5IDAgLjcxNC41ODYgMS4yOTEgMS4zMDQgMS4yOTF6bTYuNDMxIDEuMDEyYy43MDcgMCAxLjMwNC4wODcgMS43ODYuMjYyLjQ4Mi4xNzQuODcxLjQyIDEuMTU2LjczLjI4NS4zMTEuNDg4LjczNS42MDggMS4xODIuMTI2LjQ0Ny4xODYuOTM3LjE4NiAxLjQ3NnY1LjQ4MWEyNS4yNCAyNS4yNCAwIDAgMS0xLjQ5NS4yNTFjLS42NjguMDk4LTEuNDE5LjE0Ny0yLjI1MS4xNDdhNi44MjkgNi44MjkgMCAwIDEtMS41MTctLjE1OCAzLjIxMyAzLjIxMyAwIDAgMS0xLjE3OC0uNTA3IDIuNDU1IDIuNDU1IDAgMCAxLS43NjEtLjkwNGMtLjE4MS0uMzctLjI3NC0uODkzLS4yNzQtMS40MzggMC0uNTIzLjEwNC0uODU1LjMwNy0xLjIxNS4yMDgtLjM2LjQ4Ny0uNjU0LjgzOC0uODgzYTMuNjA5IDMuNjA5IDAgMCAxIDEuMjI3LS40OSA3LjA3MyA3LjA3MyAwIDAgMSAyLjIwMi0uMTAzYy4yNjMuMDI3LjUzNy4wNzYuODMzLjE0N3YtLjM0OWMwLS4yNDUtLjAyNy0uNDc5LS4wODgtLjY5N2ExLjQ4NiAxLjQ4NiAwIDAgMC0uMzA3LS41ODNjLS4xNDgtLjE2OS0uMzQtLjMtLjU4MS0uMzkyYTIuNTM2IDIuNTM2IDAgMCAwLS45MTUtLjE2M2MtLjQ5MyAwLS45NDIuMDYtMS4zNTMuMTMxLS40MTEuMDcxLS43NS4xNTMtMS4wMDguMjQ1bC0uMjU3LTEuNzQ5Yy4yNjgtLjA5My42NjgtLjE4NSAxLjE4My0uMjc4YTkuMzM1IDkuMzM1IDAgMCAxIDEuNjYtLjE0MmgtLjAwMXptLjE3OSA3LjczYy42NTcgMCAxLjE0NS0uMDM4IDEuNDg0LS4xMDRWMTAuMjJhNS4wOTcgNS4wOTcgMCAwIDAtMS45NzgtLjEwNGMtLjI0MS4wMzMtLjQ2LjA5OC0uNjUyLjE5MWExLjE2NyAxLjE2NyAwIDAgMC0uNDY2LjM5MmMtLjEyMS4xNy0uMTc1LjI2Ny0uMTc1LjUyMyAwIC41MDEuMTc1Ljc5LjQ5My45ODEuMzIzLjE5Ni43NS4yOSAxLjI5My4yOWguMDAxek04NC4xMDggNC44MTZjLjcwNyAwIDEuMzA0LjA4NyAxLjc4Ni4yNjIuNDgyLjE3NC44NzEuNDIgMS4xNTYuNzMuMjkuMzE2LjQ4Ny43MzUuNjA4IDEuMTgyLjEyNi40NDcuMTg2LjkzNy4xODYgMS40NzZ2NS40ODFhMjUuMjQgMjUuMjQgMCAwIDEtMS40OTUuMjUxYy0uNjY4LjA5OC0xLjQxOS4xNDctMi4yNTEuMTQ3YTYuODI5IDYuODI5IDAgMCAxLTEuNTE3LS4xNTggMy4yMTMgMy4yMTMgMCAwIDEtMS4xNzgtLjUwNyAyLjQ1NSAyLjQ1NSAwIDAgMS0uNzYxLS45MDRjLS4xODEtLjM3LS4yNzQtLjg5My0uMjc0LTEuNDM4IDAtLjUyMy4xMDQtLjg1NS4zMDctMS4yMTUuMjA4LS4zNi40ODctLjY1NC44MzgtLjg4M2EzLjYwOSAzLjYwOSAwIDAgMSAxLjIyNy0uNDkgNy4wNzMgNy4wNzMgMCAwIDEgMi4yMDItLjEwM2MuMjU3LjAyNy41MzcuMDc2LjgzMy4xNDd2LS4zNDljMC0uMjQ1LS4wMjctLjQ3OS0uMDg4LS42OTdhMS40ODYgMS40ODYgMCAwIDAtLjMwNy0uNTgzYy0uMTQ4LS4xNjktLjM0LS4zLS41ODEtLjM5MmEyLjUzNiAyLjUzNiAwIDAgMC0uOTE1LS4xNjNjLS40OTMgMC0uOTQyLjA2LTEuMzUzLjEzMS0uNDExLjA3MS0uNzUuMTUzLTEuMDA4LjI0NWwtLjI1Ny0xLjc0OWMuMjY4LS4wOTMuNjY4LS4xODUgMS4xODMtLjI3OGE4Ljg5IDguODkgMCAwIDEgMS42Ni0uMTQyaC0uMDAxem0uMTg1IDcuNzM2Yy42NTcgMCAxLjE0NS0uMDM4IDEuNDg0LS4xMDRWMTAuMjhhNS4wOTcgNS4wOTcgMCAwIDAtMS45NzgtLjEwNGMtLjI0MS4wMzMtLjQ2LjA5OC0uNjUyLjE5MWExLjE2NyAxLjE2NyAwIDAgMC0uNDY2LjM5MmMtLjEyMS4xNy0uMTc1LjI2Ny0uMTc1LjUyMyAwIC41MDEuMTc1Ljc5LjQ5My45ODEuMzE4LjE5MS43NS4yOSAxLjI5My4yOWguMDAxem04LjY4MyAxLjczOGMtMy41MTEuMDE2LTMuNTExLTIuODIyLTMuNTExLTMuMjc0TDg5LjQ2Ljk0OCA5MS42MDIuNjF2MTAuMDAzYzAgLjI1NiAwIDEuODggMS4zNzUgMS44ODV2MS43OTNoLS4wMDF6XFxcIi8+PC9nPjwvc3ZnPlwiO1xuXG4vKiBiYWJlbC1wbHVnaW4taW5saW5lLWltcG9ydCAnLi9pY29ucy9vc20uc3ZnJyAqL1xudmFyIG9zbUxvZ28gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMTJcXFwiIGhlaWdodD1cXFwiMTJcXFwiPlxcbiAgPHBhdGggZmlsbD1cXFwiIzc5Nzk3OVxcXCIgZmlsbC1ydWxlPVxcXCJldmVub2RkXFxcIiBkPVxcXCJNNi41NzcuNUw1LjMwNC4wMDUgMi42MjcgMS4wMiAwIDBsLjk5MiAyLjc2Ny0uOTg2IDIuNjg1Ljk5OCAyLjc2LTEgMi43MTcuNjEzLjIyIDMuMzktMy40NS41NjMuMDYuNzI2LS42OXMtLjcxNy0uOTItLjkxLTEuODZjLjE5My0uMTQ2LjE4NC0uMTQuMzU1LS4yODVDNC4xIDEuOTMgNi41OC41IDYuNTguNXptLTQuMTcgMTEuMzU0bC4yMi4xMiAyLjY4LTEuMDUgMi42MiAxLjA0IDIuNjQ0LTEuMDMgMS4wMi0yLjcxNy0uMzMtLjk0NHMtMS4xMyAxLjI2LTMuNDQuODc4Yy0uMTc0LjI5LS4yNS4zNy0uMjUuMzdzLTEuMTEtLjMxLTEuNjgzLS44OWMtLjU3My41OC0uNzk1LjcxLS43OTUuNzFsLjA4LjYzNC0yLjc2IDIuODl6bTYuMjYtNC4zOTVjMS44MTcgMCAzLjI5LTEuNTMgMy4yOS0zLjQgMC0xLjg4LTEuNDczLTMuNC0zLjI5LTMuNHMtMy4yOSAxLjUyLTMuMjkgMy40YzAgMS44NyAxLjQ3MyAzLjQgMy4yOSAzLjR6XFxcIi8+XFxuPC9zdmc+XFxuXCI7XG52YXIgX2RlZmF1bHQgPSB7XG4gIGZvb3RlcjogXCI8ZGl2IGNsYXNzPVxcXCJhcC1mb290ZXJcXFwiPlxcbiAgPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vcGxhY2VzXFxcIiB0aXRsZT1cXFwiU2VhcmNoIGJ5IEFsZ29saWFcXFwiIGNsYXNzPVxcXCJhcC1mb290ZXItYWxnb2xpYVxcXCI+XCIuY29uY2F0KGFsZ29saWFMb2dvLnRyaW0oKSwgXCI8L2E+XFxuICB1c2luZyA8YSBocmVmPVxcXCJodHRwczovL2NvbW11bml0eS5hbGdvbGlhLmNvbS9wbGFjZXMvZG9jdW1lbnRhdGlvbi5odG1sI2xpY2Vuc2VcXFwiIGNsYXNzPVxcXCJhcC1mb290ZXItb3NtXFxcIiB0aXRsZT1cXFwiQWxnb2xpYSBQbGFjZXMgZGF0YSBcXHhBOSBPcGVuU3RyZWV0TWFwIGNvbnRyaWJ1dG9yc1xcXCI+XCIpLmNvbmNhdChvc21Mb2dvLnRyaW0oKSwgXCIgPHNwYW4+ZGF0YTwvc3Bhbj48L2E+XFxuICA8L2Rpdj5cIiksXG4gIHZhbHVlOiBfZm9ybWF0SW5wdXRWYWx1ZVtcImRlZmF1bHRcIl0sXG4gIHN1Z2dlc3Rpb246IF9mb3JtYXREcm9wZG93blZhbHVlW1wiZGVmYXVsdFwiXVxufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9IHtcbiAgbXVsdGlDb250YWluZXJzOiBcIkFsZ29saWEgUGxhY2VzOiAnY29udGFpbmVyJyBtdXN0IHBvaW50IHRvIGEgc2luZ2xlIDxpbnB1dD4gZWxlbWVudC5cXG5FeGFtcGxlOiBpbnN0YW50aWF0ZSB0aGUgbGlicmFyeSB0d2ljZSBpZiB5b3Ugd2FudCB0byBiaW5kIHR3byA8aW5wdXRzPi5cXG5cXG5TZWUgaHR0cHM6Ly9jb21tdW5pdHkuYWxnb2xpYS5jb20vcGxhY2VzL2RvY3VtZW50YXRpb24uaHRtbCNhcGktb3B0aW9ucy1jb250YWluZXJcIixcbiAgYmFkQ29udGFpbmVyOiBcIkFsZ29saWEgUGxhY2VzOiAnY29udGFpbmVyJyBtdXN0IHBvaW50IHRvIGFuIDxpbnB1dD4gZWxlbWVudC5cXG5cXG5TZWUgaHR0cHM6Ly9jb21tdW5pdHkuYWxnb2xpYS5jb20vcGxhY2VzL2RvY3VtZW50YXRpb24uaHRtbCNhcGktb3B0aW9ucy1jb250YWluZXJcIixcbiAgcmF0ZUxpbWl0UmVhY2hlZDogXCJBbGdvbGlhIFBsYWNlczogQ3VycmVudCByYXRlIGxpbWl0IHJlYWNoZWQuXFxuXFxuU2lnbiB1cCBmb3IgYSBmcmVlIDEwMCwwMDAgcXVlcmllcy9tb250aCBhY2NvdW50IGF0XFxuaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vdXNlcnMvc2lnbl91cC9wbGFjZXMuXFxuXFxuT3IgdXBncmFkZSB5b3VyIDEwMCwwMDAgcXVlcmllcy9tb250aCBwbGFuIGJ5IGNvbnRhY3RpbmcgdXMgYXRcXG5odHRwczovL2NvbW11bml0eS5hbGdvbGlhLmNvbS9wbGFjZXMvY29udGFjdC5odG1sLlwiLFxuICBpbnZhbGlkQ3JlZGVudGlhbHM6IFwiVGhlIEFQUCBJRCBvciBBUEkga2V5IHByb3ZpZGVkIGlzIGludmFsaWQuXCIsXG4gIGludmFsaWRBcHBJZDogXCJZb3VyIEFQUCBJRCBpcyBpbnZhbGlkLiBBIFBsYWNlcyBBUFAgSUQgc3RhcnRzIHdpdGggJ3BsJy4gWW91IG11c3QgY3JlYXRlIGEgdmFsaWQgUGxhY2VzIGFwcCBmaXJzdC5cXG5cXG5DcmVhdGUgYSBmcmVlIFBsYWNlcyBhcHAgaGVyZTogaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vdXNlcnMvc2lnbl91cC9wbGFjZXNcIlxufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZpbmRDb3VudHJ5Q29kZTtcblxuZnVuY3Rpb24gZmluZENvdW50cnlDb2RlKHRhZ3MpIHtcbiAgZm9yICh2YXIgdGFnSW5kZXggPSAwOyB0YWdJbmRleCA8IHRhZ3MubGVuZ3RoOyB0YWdJbmRleCsrKSB7XG4gICAgdmFyIHRhZyA9IHRhZ3NbdGFnSW5kZXhdO1xuICAgIHZhciBmaW5kID0gdGFnLm1hdGNoKC9jb3VudHJ5XFwvKC4qKT8vKTtcblxuICAgIGlmIChmaW5kKSB7XG4gICAgICByZXR1cm4gZmluZFsxXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmaW5kVHlwZTtcblxuZnVuY3Rpb24gZmluZFR5cGUodGFncykge1xuICB2YXIgdHlwZXMgPSB7XG4gICAgY291bnRyeTogJ2NvdW50cnknLFxuICAgIGNpdHk6ICdjaXR5JyxcbiAgICAnYW1lbml0eS9idXNfc3RhdGlvbic6ICdidXNTdG9wJyxcbiAgICAnYW1lbml0eS90b3duaGFsbCc6ICd0b3duaGFsbCcsXG4gICAgJ3JhaWx3YXkvc3RhdGlvbic6ICd0cmFpblN0YXRpb24nLFxuICAgICdhZXJvd2F5L2Flcm9kcm9tZSc6ICdhaXJwb3J0JyxcbiAgICAnYWVyb3dheS90ZXJtaW5hbCc6ICdhaXJwb3J0JyxcbiAgICAnYWVyb3dheS9nYXRlJzogJ2FpcnBvcnQnXG4gIH07XG5cbiAgZm9yICh2YXIgdCBpbiB0eXBlcykge1xuICAgIGlmICh0YWdzLmluZGV4T2YodCkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gdHlwZXNbdF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICdhZGRyZXNzJztcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZm9ybWF0RHJvcGRvd25WYWx1ZTtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vaWNvbnMvYWRkcmVzcy5zdmcnICovXG52YXIgYWRkcmVzc0ljb24gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNCAyMFxcXCI+PHBhdGggZD1cXFwiTTcgMEMzLjEzIDAgMCAzLjEzIDAgN2MwIDUuMjUgNyAxMyA3IDEzczctNy43NSA3LTEzYzAtMy44Ny0zLjEzLTctNy03em0wIDkuNUM1LjYyIDkuNSA0LjUgOC4zOCA0LjUgN1M1LjYyIDQuNSA3IDQuNSA5LjUgNS42MiA5LjUgNyA4LjM4IDkuNSA3IDkuNXpcXFwiLz48L3N2Zz5cXG5cIjtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vaWNvbnMvY2l0eS5zdmcnICovXG52YXIgY2l0eUljb24gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAxOCAxOVxcXCI+PHBhdGggZD1cXFwiTTEyIDlWM0w5IDAgNiAzdjJIMHYxNGgxOFY5aC02em0tOCA4SDJ2LTJoMnYyem0wLTRIMnYtMmgydjJ6bTAtNEgyVjdoMnYyem02IDhIOHYtMmgydjJ6bTAtNEg4di0yaDJ2MnptMC00SDhWN2gydjJ6bTAtNEg4VjNoMnYyem02IDEyaC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnpcXFwiLz48L3N2Zz5cXG5cIjtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vaWNvbnMvY291bnRyeS5zdmcnICovXG52YXIgY291bnRyeUljb24gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAyMCAyMFxcXCI+XFxuICA8cGF0aCBkPVxcXCJNMTAgMEM0LjQ4IDAgMCA0LjQ4IDAgMTBzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE1LjUyIDAgMTAgMHpNOSAxNy45M2MtMy45NS0uNDktNy0zLjg1LTctNy45MyAwLS42Mi4wOC0xLjIxLjIxLTEuNzlMNyAxM3YxYzAgMS4xLjkgMiAyIDJ2MS45M3ptNi45LTIuNTRjLS4yNi0uODEtMS0xLjM5LTEuOS0xLjM5aC0xdi0zYzAtLjU1LS40NS0xLTEtMUg2VjhoMmMuNTUgMCAxLS40NSAxLTFWNWgyYzEuMSAwIDItLjkgMi0ydi0uNDFjMi45MyAxLjE5IDUgNC4wNiA1IDcuNDEgMCAyLjA4LS44IDMuOTctMi4xIDUuMzl6XFxcIi8+XFxuPC9zdmc+XFxuXCI7XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL2J1cy5zdmcnICovXG52YXIgYnVzSWNvbiA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgdmlld0JveD1cXFwiMCAwIDU0LjkgNTAuNVxcXCI+PHBhdGggZD1cXFwiTTkuNiAxMi43SDguNWMtMi4zIDAtNC4xIDEuOS00LjEgNC4xdjEuMWMwIDIuMiAxLjggNCA0IDQuMXYyMS43aC0uN2MtMS4zIDAtMi4zIDEtMi4zIDIuM2g3LjFjMC0xLjMtMS0yLjMtMi4zLTIuM2gtLjVWMjIuMWMyLjItLjEgNC0xLjkgNC00LjF2LTEuMWMwLTIuMy0xLjgtNC4yLTQuMS00LjJ6TTQ2IDcuNmgtNy41YzAtMS44LTEuNS0zLjMtMy4zLTMuM2gtMy42Yy0xLjggMC0zLjMgMS41LTMuMyAzLjNIMjFjLTIuNSAwLTQuNiAyLTQuNiA0LjZ2MjYuM2MwIDEuNyAxLjMgMy4xIDMgMy4xaC44djEuNmMwIDEuNyAxLjQgMy4xIDMuMSAzLjEgMS43IDAgMy0xLjQgMy0zLjF2LTEuNmgxNC4zdjEuNmMwIDEuNyAxLjQgMy4xIDMuMSAzLjEgMS43IDAgMy4xLTEuNCAzLjEtMy4xdi0xLjZoLjhjMS43IDAgMy4xLTEuNCAzLjEtMy4xVjEyLjJjLS4yLTIuNS0yLjItNC42LTQuNy00LjZ6bS0yNy40IDQuNmMwLTEuMyAxLjEtMi40IDIuNC0yLjRoMjVjMS4zIDAgMi40IDEuMSAyLjQgMi40di4zYzAgMS4zLTEuMSAyLjQtMi40IDIuNEgyMWMtMS4zIDAtMi40LTEuMS0yLjQtMi40di0uM3pNMjEgMzhjLTEuNSAwLTIuNy0xLjItMi43LTIuNyAwLTEuNSAxLjItMi43IDIuNy0yLjcgMS41IDAgMi43IDEuMiAyLjcgMi43IDAgMS41LTEuMiAyLjctMi43IDIuN3ptMC0xMC4xYy0xLjMgMC0yLjQtMS4xLTIuNC0yLjR2LTYuNmMwLTEuMyAxLjEtMi40IDIuNC0yLjRoMjVjMS4zIDAgMi40IDEuMSAyLjQgMi40djYuNmMwIDEuMy0xLjEgMi40LTIuNCAyLjRIMjF6bTI0LjggMTBjLTEuNSAwLTIuNy0xLjItMi43LTIuNyAwLTEuNSAxLjItMi43IDIuNy0yLjcgMS41IDAgMi43IDEuMiAyLjcgMi43IDAgMS41LTEuMiAyLjctMi43IDIuN3pcXFwiLz48L3N2Zz5cXG5cIjtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vaWNvbnMvdHJhaW4uc3ZnJyAqL1xudmFyIHRyYWluSWNvbiA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgdmlld0JveD1cXFwiMCAwIDE1IDIwXFxcIj5cXG4gIDxwYXRoIGQ9XFxcIk0xMy4xMDUgMjBsLTIuMzY2LTMuMzU0SDQuMjZMMS45MDcgMjBIMGwzLjI5Ny00Ljc4N2MtMS4xLS4xNzctMi4xOTYtMS4yODctMi4xOTQtMi42NDJWMi42OEMxLjEgMS4yOCAyLjMxNy0uMDAyIDMuOTczIDBoNy4wNjVjMS42NDctLjAwMiAyLjg2MyAxLjI4IDIuODYgMi42NzZ2OS44OTVjLjAwMyAxLjM2LTEuMDk0IDIuNDctMi4xOTQgMi42NDdMMTUgMjBoLTEuODk1ek02LjExIDJoMi43OGMuMjY0IDAgLjQ3Mi0uMTIzLjQ3Mi0uMjd2LS40NmMwLS4xNDctLjIyLS4yNjgtLjQ3Mi0uMjdINi4xMWMtLjI1Mi4wMDItLjQ3LjEyMy0uNDcuMjd2LjQ2YzAgLjE0Ni4yMDYuMjcuNDcuMjd6bTYuMjYgMy45NTJWNC4xNzVjLS4wMDQtLjc0LS41LTEuMzg3LTEuNDM2LTEuMzg4SDQuMDY2Yy0uOTM2IDAtMS40My42NDgtMS40MzYgMS4zODh2MS43NzdjLS4wMDIuODYuNjQ0IDEuMzg0IDEuNDM2IDEuMzg4aDYuODY4Yy43OTMtLjAwNCAxLjQ0LS41MjggMS40MzYtMS4zODh6bS04LjQ2NSA1LjM4NmMtLjY5LS4wMDMtMS4yNTQuNTQtMS4yNTIgMS4yMS0uMDAyLjY3My41NiAxLjIxNyAxLjI1MiAxLjIyMi42OTctLjAwNiAxLjI2LS41NSAxLjI2Mi0xLjIyLS4wMDItLjY3Mi0uNTY1LTEuMjE1LTEuMjYyLTEuMjEyem04LjQyIDEuMjFjLS4wMDUtLjY3LS41NjctMS4yMTMtMS4yNjUtMS4yMS0uNjktLjAwMy0xLjI1My41NC0xLjI1IDEuMjEtLjAwMy42NzMuNTYgMS4yMTcgMS4yNSAxLjIyMi42OTgtLjAwNiAxLjI2LS41NSAxLjI2NC0xLjIyelxcXCIvPlxcbjwvc3ZnPlxcblwiO1xuXG4vKiBiYWJlbC1wbHVnaW4taW5saW5lLWltcG9ydCAnLi9pY29ucy90b3duaGFsbC5zdmcnICovXG52YXIgdG93bmhhbGxJY29uID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjQgMjRcXFwiPjxwYXRoIGQ9XFxcIk0xMiAuNkwyLjUgNi45aDE4LjlMMTIgLjZ6TTMuOCA4LjJjLS43IDAtMS4zLjYtMS4zIDEuM3Y4LjhMLjMgMjIuMWMtLjIuMy0uMy41LS4zLjYgMCAuNi44LjYgMS4zLjZoMjEuNWMuNCAwIDEuMyAwIDEuMy0uNiAwLS4yLS4xLS4zLS4zLS42bC0yLjItMy44VjkuNWMwLS43LS42LTEuMy0xLjMtMS4zSDMuOHptMi41IDIuNWMuNyAwIDEuMS42IDEuMyAxLjN2Ny42SDUuMVYxMmMwLS43LjUtMS4zIDEuMi0xLjN6bTUuNyAwYy43IDAgMS4zLjYgMS4zIDEuM3Y3LjZoLTIuNVYxMmMtLjEtLjcuNS0xLjMgMS4yLTEuM3ptNS43IDBjLjcgMCAxLjMuNiAxLjMgMS4zdjcuNmgtMi41VjEyYy0uMS0uNy41LTEuMyAxLjItMS4zelxcXCIvPjwvc3ZnPlxcblwiO1xuXG4vKiBiYWJlbC1wbHVnaW4taW5saW5lLWltcG9ydCAnLi9pY29ucy9wbGFuZS5zdmcnICovXG52YXIgcGxhbmVJY29uID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjQgMjRcXFwiPjxwYXRoIGQ9XFxcIk0yMi45IDEuMXMxLjMuMy00LjMgNi41bC43IDMuOC4yLS4yYy40LS40IDEtLjQgMS4zIDAgLjQuNC40IDEgMCAxLjNsLTEuMiAxLjIuMyAxLjcuMS0uMWMuNC0uNCAxLS40IDEuMyAwIC40LjQuNCAxIDAgMS4zbC0xLjEgMS4xYy4yIDEuOS4zIDMuNi4xIDQuNSAwIDAtMS4yIDEuMi0xLjguNSAwIDAtMi4zLTcuNy0zLjgtMTEuMS01LjkgNi02LjQgNS42LTYuNCA1LjZzMS4yIDMuOC0uMiA1LjJsLTIuMy00LjNoLjFsLTQuMy0yLjNjMS4zLTEuMyA1LjItLjIgNS4yLS4ycy0uNS0uNCA1LjYtNi4zQzguOSA3LjcgMS4yIDUuNSAxLjIgNS41Yy0uNy0uNy41LTEuOC41LTEuOC45LS4yIDIuNi0uMSA0LjUuMWwxLjEtMS4xYy40LS40IDEtLjQgMS4zIDAgLjQuNC40IDEgMCAxLjNsMS43LjMgMS4yLTEuMmMuNC0uNCAxLS40IDEuMyAwIC40LjQuNCAxIDAgMS4zbC0uMi4yIDMuOC43YzYuMi01LjUgNi41LTQuMiA2LjUtNC4yelxcXCIvPjwvc3ZnPlxcblwiO1xudmFyIGljb25zID0ge1xuICBhZGRyZXNzOiBhZGRyZXNzSWNvbixcbiAgY2l0eTogY2l0eUljb24sXG4gIGNvdW50cnk6IGNvdW50cnlJY29uLFxuICBidXNTdG9wOiBidXNJY29uLFxuICB0cmFpblN0YXRpb246IHRyYWluSWNvbixcbiAgdG93bmhhbGw6IHRvd25oYWxsSWNvbixcbiAgYWlycG9ydDogcGxhbmVJY29uXG59O1xuXG5mdW5jdGlvbiBmb3JtYXREcm9wZG93blZhbHVlKF9yZWYpIHtcbiAgdmFyIHR5cGUgPSBfcmVmLnR5cGUsXG4gICAgICBoaWdobGlnaHQgPSBfcmVmLmhpZ2hsaWdodDtcbiAgdmFyIG5hbWUgPSBoaWdobGlnaHQubmFtZSxcbiAgICAgIGFkbWluaXN0cmF0aXZlID0gaGlnaGxpZ2h0LmFkbWluaXN0cmF0aXZlLFxuICAgICAgY2l0eSA9IGhpZ2hsaWdodC5jaXR5LFxuICAgICAgY291bnRyeSA9IGhpZ2hsaWdodC5jb3VudHJ5O1xuICB2YXIgb3V0ID0gXCI8c3BhbiBjbGFzcz1cXFwiYXAtc3VnZ2VzdGlvbi1pY29uXFxcIj5cIi5jb25jYXQoaWNvbnNbdHlwZV0udHJpbSgpLCBcIjwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwiYXAtbmFtZVxcXCI+XCIpLmNvbmNhdChuYW1lLCBcIjwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwiYXAtYWRkcmVzc1xcXCI+XFxuICBcIikuY29uY2F0KFtjaXR5LCBhZG1pbmlzdHJhdGl2ZSwgY291bnRyeV0uZmlsdGVyKGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHJldHVybiB0b2tlbiAhPT0gdW5kZWZpbmVkO1xuICB9KS5qb2luKCcsICcpLCBcIjwvc3Bhbj5cIikucmVwbGFjZSgvXFxzKlxcblxccyovZywgJyAnKTtcbiAgcmV0dXJuIG91dDtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZm9ybWF0SGl0O1xuXG52YXIgX2ZpbmRDb3VudHJ5Q29kZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZmluZENvdW50cnlDb2RlXCIpKTtcblxudmFyIF9maW5kVHlwZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vZmluZFR5cGVcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIGdldEJlc3RIaWdobGlnaHRlZEZvcm0oaGlnaGxpZ2h0ZWRWYWx1ZXMpIHtcbiAgdmFyIGRlZmF1bHRWYWx1ZSA9IGhpZ2hsaWdodGVkVmFsdWVzWzBdLnZhbHVlOyAvLyBjb2xsZWN0IGFsbCBvdGhlciBtYXRjaGVzXG5cbiAgdmFyIGJlc3RBdHRyaWJ1dGVzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBoaWdobGlnaHRlZFZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChoaWdobGlnaHRlZFZhbHVlc1tpXS5tYXRjaExldmVsICE9PSAnbm9uZScpIHtcbiAgICAgIGJlc3RBdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgd29yZHM6IGhpZ2hsaWdodGVkVmFsdWVzW2ldLm1hdGNoZWRXb3Jkc1xuICAgICAgfSk7XG4gICAgfVxuICB9IC8vIG5vIG1hdGNoZXMgaW4gdGhpcyBhdHRyaWJ1dGUsIHJldHJpZXZlIGZpcnN0IHZhbHVlXG5cblxuICBpZiAoYmVzdEF0dHJpYnV0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgfSAvLyBzb3J0IHRoZSBtYXRjaGVzIGJ5IGBkZXNjKHdvcmRzKSwgYXNjKGluZGV4KWBcblxuXG4gIGJlc3RBdHRyaWJ1dGVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBpZiAoYS53b3JkcyA+IGIud29yZHMpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2UgaWYgKGEud29yZHMgPCBiLndvcmRzKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXg7XG4gIH0pOyAvLyBhbmQgYXBwZW5kIHRoZSBiZXN0IG1hdGNoIHRvIHRoZSBmaXJzdCB2YWx1ZVxuXG4gIHJldHVybiBiZXN0QXR0cmlidXRlc1swXS5pbmRleCA9PT0gMCA/IFwiXCIuY29uY2F0KGRlZmF1bHRWYWx1ZSwgXCIgKFwiKS5jb25jYXQoaGlnaGxpZ2h0ZWRWYWx1ZXNbYmVzdEF0dHJpYnV0ZXNbMV0uaW5kZXhdLnZhbHVlLCBcIilcIikgOiBcIlwiLmNvbmNhdChoaWdobGlnaHRlZFZhbHVlc1tiZXN0QXR0cmlidXRlc1swXS5pbmRleF0udmFsdWUsIFwiIChcIikuY29uY2F0KGRlZmF1bHRWYWx1ZSwgXCIpXCIpO1xufVxuXG5mdW5jdGlvbiBnZXRCZXN0UG9zdGNvZGUocG9zdGNvZGVzLCBoaWdobGlnaHRlZFBvc3Rjb2Rlcykge1xuICB2YXIgZGVmYXVsdFZhbHVlID0gaGlnaGxpZ2h0ZWRQb3N0Y29kZXNbMF0udmFsdWU7IC8vIGNvbGxlY3QgYWxsIG90aGVyIG1hdGNoZXNcblxuICB2YXIgYmVzdEF0dHJpYnV0ZXMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGhpZ2hsaWdodGVkUG9zdGNvZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGhpZ2hsaWdodGVkUG9zdGNvZGVzW2ldLm1hdGNoTGV2ZWwgIT09ICdub25lJykge1xuICAgICAgYmVzdEF0dHJpYnV0ZXMucHVzaCh7XG4gICAgICAgIGluZGV4OiBpLFxuICAgICAgICB3b3JkczogaGlnaGxpZ2h0ZWRQb3N0Y29kZXNbaV0ubWF0Y2hlZFdvcmRzXG4gICAgICB9KTtcbiAgICB9XG4gIH0gLy8gbm8gbWF0Y2hlcyBpbiB0aGlzIGF0dHJpYnV0ZSwgcmV0cmlldmUgZmlyc3QgdmFsdWVcblxuXG4gIGlmIChiZXN0QXR0cmlidXRlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9zdGNvZGU6IHBvc3Rjb2Rlc1swXSxcbiAgICAgIGhpZ2hsaWdodGVkUG9zdGNvZGU6IGRlZmF1bHRWYWx1ZVxuICAgIH07XG4gIH0gLy8gc29ydCB0aGUgbWF0Y2hlcyBieSBgZGVzYyh3b3JkcylgXG5cblxuICBiZXN0QXR0cmlidXRlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgaWYgKGEud29yZHMgPiBiLndvcmRzKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIGlmIChhLndvcmRzIDwgYi53b3Jkcykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGEuaW5kZXggLSBiLmluZGV4O1xuICB9KTtcbiAgdmFyIHBvc3Rjb2RlID0gcG9zdGNvZGVzW2Jlc3RBdHRyaWJ1dGVzWzBdLmluZGV4XTtcbiAgcmV0dXJuIHtcbiAgICBwb3N0Y29kZTogcG9zdGNvZGUsXG4gICAgaGlnaGxpZ2h0ZWRQb3N0Y29kZTogaGlnaGxpZ2h0ZWRQb3N0Y29kZXNbYmVzdEF0dHJpYnV0ZXNbMF0uaW5kZXhdLnZhbHVlXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhpdChfcmVmKSB7XG4gIHZhciBmb3JtYXRJbnB1dFZhbHVlID0gX3JlZi5mb3JtYXRJbnB1dFZhbHVlLFxuICAgICAgaGl0ID0gX3JlZi5oaXQsXG4gICAgICBoaXRJbmRleCA9IF9yZWYuaGl0SW5kZXgsXG4gICAgICBxdWVyeSA9IF9yZWYucXVlcnksXG4gICAgICByYXdBbnN3ZXIgPSBfcmVmLnJhd0Fuc3dlcjtcblxuICB0cnkge1xuICAgIHZhciBuYW1lID0gaGl0LmxvY2FsZV9uYW1lc1swXTtcbiAgICB2YXIgY291bnRyeSA9IGhpdC5jb3VudHJ5O1xuICAgIHZhciBhZG1pbmlzdHJhdGl2ZSA9IGhpdC5hZG1pbmlzdHJhdGl2ZSAmJiBoaXQuYWRtaW5pc3RyYXRpdmVbMF0gIT09IG5hbWUgPyBoaXQuYWRtaW5pc3RyYXRpdmVbMF0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIGNpdHkgPSBoaXQuY2l0eSAmJiBoaXQuY2l0eVswXSAhPT0gbmFtZSA/IGhpdC5jaXR5WzBdIDogdW5kZWZpbmVkO1xuICAgIHZhciBzdWJ1cmIgPSBoaXQuc3VidXJiICYmIGhpdC5zdWJ1cmJbMF0gIT09IG5hbWUgPyBoaXQuc3VidXJiWzBdIDogdW5kZWZpbmVkO1xuICAgIHZhciBjb3VudHkgPSBoaXQuY291bnR5ICYmIGhpdC5jb3VudHlbMF0gIT09IG5hbWUgPyBoaXQuY291bnR5WzBdIDogdW5kZWZpbmVkO1xuXG4gICAgdmFyIF9yZWYyID0gaGl0LnBvc3Rjb2RlICYmIGhpdC5wb3N0Y29kZS5sZW5ndGggPyBnZXRCZXN0UG9zdGNvZGUoaGl0LnBvc3Rjb2RlLCBoaXQuX2hpZ2hsaWdodFJlc3VsdC5wb3N0Y29kZSkgOiB7XG4gICAgICBwb3N0Y29kZTogdW5kZWZpbmVkLFxuICAgICAgaGlnaGxpZ2h0ZWRQb3N0Y29kZTogdW5kZWZpbmVkXG4gICAgfSxcbiAgICAgICAgcG9zdGNvZGUgPSBfcmVmMi5wb3N0Y29kZSxcbiAgICAgICAgaGlnaGxpZ2h0ZWRQb3N0Y29kZSA9IF9yZWYyLmhpZ2hsaWdodGVkUG9zdGNvZGU7XG5cbiAgICB2YXIgaGlnaGxpZ2h0ID0ge1xuICAgICAgbmFtZTogZ2V0QmVzdEhpZ2hsaWdodGVkRm9ybShoaXQuX2hpZ2hsaWdodFJlc3VsdC5sb2NhbGVfbmFtZXMpLFxuICAgICAgY2l0eTogY2l0eSA/IGdldEJlc3RIaWdobGlnaHRlZEZvcm0oaGl0Ll9oaWdobGlnaHRSZXN1bHQuY2l0eSkgOiB1bmRlZmluZWQsXG4gICAgICBhZG1pbmlzdHJhdGl2ZTogYWRtaW5pc3RyYXRpdmUgPyBnZXRCZXN0SGlnaGxpZ2h0ZWRGb3JtKGhpdC5faGlnaGxpZ2h0UmVzdWx0LmFkbWluaXN0cmF0aXZlKSA6IHVuZGVmaW5lZCxcbiAgICAgIGNvdW50cnk6IGNvdW50cnkgPyBoaXQuX2hpZ2hsaWdodFJlc3VsdC5jb3VudHJ5LnZhbHVlIDogdW5kZWZpbmVkLFxuICAgICAgc3VidXJiOiBzdWJ1cmIgPyBnZXRCZXN0SGlnaGxpZ2h0ZWRGb3JtKGhpdC5faGlnaGxpZ2h0UmVzdWx0LnN1YnVyYikgOiB1bmRlZmluZWQsXG4gICAgICBjb3VudHk6IGNvdW50eSA/IGdldEJlc3RIaWdobGlnaHRlZEZvcm0oaGl0Ll9oaWdobGlnaHRSZXN1bHQuY291bnR5KSA6IHVuZGVmaW5lZCxcbiAgICAgIHBvc3Rjb2RlOiBoaWdobGlnaHRlZFBvc3Rjb2RlXG4gICAgfTtcbiAgICB2YXIgc3VnZ2VzdGlvbiA9IHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBhZG1pbmlzdHJhdGl2ZTogYWRtaW5pc3RyYXRpdmUsXG4gICAgICBjb3VudHk6IGNvdW50eSxcbiAgICAgIGNpdHk6IGNpdHksXG4gICAgICBzdWJ1cmI6IHN1YnVyYixcbiAgICAgIGNvdW50cnk6IGNvdW50cnksXG4gICAgICBjb3VudHJ5Q29kZTogKDAsIF9maW5kQ291bnRyeUNvZGVbXCJkZWZhdWx0XCJdKShoaXQuX3RhZ3MpLFxuICAgICAgdHlwZTogKDAsIF9maW5kVHlwZVtcImRlZmF1bHRcIl0pKGhpdC5fdGFncyksXG4gICAgICBsYXRsbmc6IHtcbiAgICAgICAgbGF0OiBoaXQuX2dlb2xvYy5sYXQsXG4gICAgICAgIGxuZzogaGl0Ll9nZW9sb2MubG5nXG4gICAgICB9LFxuICAgICAgcG9zdGNvZGU6IHBvc3Rjb2RlLFxuICAgICAgcG9zdGNvZGVzOiBoaXQucG9zdGNvZGUgJiYgaGl0LnBvc3Rjb2RlLmxlbmd0aCA/IGhpdC5wb3N0Y29kZSA6IHVuZGVmaW5lZFxuICAgIH07IC8vIHRoaXMgaXMgdGhlIHZhbHVlIHRvIHB1dCBpbnNpZGUgdGhlIDxpbnB1dCB2YWx1ZT1cblxuICAgIHZhciB2YWx1ZSA9IGZvcm1hdElucHV0VmFsdWUoc3VnZ2VzdGlvbik7XG4gICAgcmV0dXJuIF9vYmplY3RTcHJlYWQoe30sIHN1Z2dlc3Rpb24sIHtcbiAgICAgIGhpZ2hsaWdodDogaGlnaGxpZ2h0LFxuICAgICAgaGl0OiBoaXQsXG4gICAgICBoaXRJbmRleDogaGl0SW5kZXgsXG4gICAgICBxdWVyeTogcXVlcnksXG4gICAgICByYXdBbnN3ZXI6IHJhd0Fuc3dlcixcbiAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSBvYmplY3QnLCBoaXQpO1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6ICdDb3VsZCBub3QgcGFyc2Ugb2JqZWN0J1xuICAgIH07XG4gIH1cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZm9ybWF0SW5wdXRWYWx1ZTtcblxuZnVuY3Rpb24gZm9ybWF0SW5wdXRWYWx1ZShfcmVmKSB7XG4gIHZhciBhZG1pbmlzdHJhdGl2ZSA9IF9yZWYuYWRtaW5pc3RyYXRpdmUsXG4gICAgICBjaXR5ID0gX3JlZi5jaXR5LFxuICAgICAgY291bnRyeSA9IF9yZWYuY291bnRyeSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICB0eXBlID0gX3JlZi50eXBlO1xuICB2YXIgb3V0ID0gXCJcIi5jb25jYXQobmFtZSkuY29uY2F0KHR5cGUgIT09ICdjb3VudHJ5JyAmJiBjb3VudHJ5ICE9PSB1bmRlZmluZWQgPyAnLCcgOiAnJywgXCJcXG4gXCIpLmNvbmNhdChjaXR5ID8gXCJcIi5jb25jYXQoY2l0eSwgXCIsXCIpIDogJycsIFwiXFxuIFwiKS5jb25jYXQoYWRtaW5pc3RyYXRpdmUgPyBcIlwiLmNvbmNhdChhZG1pbmlzdHJhdGl2ZSwgXCIsXCIpIDogJycsIFwiXFxuIFwiKS5jb25jYXQoY291bnRyeSA/IGNvdW50cnkgOiAnJykucmVwbGFjZSgvXFxzKlxcblxccyovZywgJyAnKS50cmltKCk7XG4gIHJldHVybiBvdXQ7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHBvbHlmaWxsIGZvciBuYXZpZ2F0b3IubGFuZ3VhZ2UgKElFIDw9IDEwKVxuLy8gbm90IHBvbHlmaWxsZWQgYnkgaHR0cHM6Ly9jZG4ucG9seWZpbGwuaW8vdjIvZG9jcy9cbi8vIERlZmluZWQ6IGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RpbWVycy5odG1sI25hdmlnYXRvcmxhbmd1YWdlXG4vLyAgIHdpdGggYWxsb3dhYmxlIHZhbHVlcyBhdCBodHRwOi8vd3d3LmlldGYub3JnL3JmYy9iY3AvYmNwNDcudHh0XG4vLyBOb3RlIHRoYXQgdGhlIEhUTUwgc3BlYyBzdWdnZXN0cyB0aGF0IGFub255bWl6aW5nIHNlcnZpY2VzIHJldHVybiBcImVuLVVTXCIgYnkgZGVmYXVsdCBmb3Jcbi8vICAgdXNlciBwcml2YWN5IChzbyB5b3VyIGFwcCBtYXkgd2lzaCB0byBwcm92aWRlIGEgbWVhbnMgb2YgY2hhbmdpbmcgdGhlIGxvY2FsZSlcbmlmICghKCdsYW5ndWFnZScgaW4gbmF2aWdhdG9yKSkge1xuICBuYXZpZ2F0b3IubGFuZ3VhZ2UgPSAvLyBJRSAxMCBpbiBJRTggbW9kZSBvbiBXaW5kb3dzIDcgdXNlcyB1cHBlci1jYXNlIGluXG4gIC8vIG5hdmlnYXRvci51c2VyTGFuZ3VhZ2UgY291bnRyeSBjb2RlcyBidXQgcGVyXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9tczUzMzA1Mi5hc3B4ICh2aWFcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL21zNTM0NzEzLmFzcHgpLCB0aGV5XG4gIC8vIGFwcGVhciB0byBiZSBpbiBsb3dlciBjYXNlLCBzbyB3ZSBicmluZyB0aGVtIGludG8gaGFybW9ueSB3aXRoIG5hdmlnYXRvci5sYW5ndWFnZS5cbiAgbmF2aWdhdG9yLnVzZXJMYW5ndWFnZSAmJiBuYXZpZ2F0b3IudXNlckxhbmd1YWdlLnJlcGxhY2UoLy1bYS16XXsyfSQvLCBTdHJpbmcucHJvdG90eXBlLnRvVXBwZXJDYXNlKSB8fCAnZW4tVVMnOyAvLyBEZWZhdWx0IGZvciBhbm9ueW1pemluZyBzZXJ2aWNlczogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvdGltZXJzLmh0bWwjbmF2aWdhdG9ybGFuZ3VhZ2Vcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gcGxhY2VzO1xuXG52YXIgX2V2ZW50cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImV2ZW50c1wiKSk7XG5cbnZhciBfYWxnb2xpYXNlYXJjaExpdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJhbGdvbGlhc2VhcmNoL3NyYy9icm93c2VyL2J1aWxkcy9hbGdvbGlhc2VhcmNoTGl0ZVwiKSk7XG5cbnZhciBfYXV0b2NvbXBsZXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiYXV0b2NvbXBsZXRlLmpzXCIpKTtcblxucmVxdWlyZShcIi4vbmF2aWdhdG9yTGFuZ3VhZ2VcIik7XG5cbnZhciBfY3JlYXRlQXV0b2NvbXBsZXRlRGF0YXNldCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vY3JlYXRlQXV0b2NvbXBsZXRlRGF0YXNldFwiKSk7XG5cbnZhciBfaW5zZXJ0Q3NzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiaW5zZXJ0LWNzc1wiKSk7XG5cbnZhciBfZXJyb3JzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9lcnJvcnNcIikpO1xuXG52YXIgX2NyZWF0ZVJldmVyc2VHZW9jb2RpbmdTb3VyY2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2NyZWF0ZVJldmVyc2VHZW9jb2RpbmdTb3VyY2VcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pOyBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IGlmIChpICUgMikgeyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7IH0gZWxzZSB7IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShuKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL2NsZWFyLnN2ZycgKi9cbnZhciBjbGVhckljb24gPSBcIjxzdmcgd2lkdGg9XFxcIjEyXFxcIiBoZWlnaHQ9XFxcIjEyXFxcIiB2aWV3Qm94PVxcXCIwIDAgMTIgMTJcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBhdGggZD1cXFwiTS41NjYgMS42OThMMCAxLjEzIDEuMTMyIDBsLjU2NS41NjZMNiA0Ljg2OCAxMC4zMDIuNTY2IDEwLjg2OCAwIDEyIDEuMTMybC0uNTY2LjU2NUw3LjEzMiA2bDQuMzAyIDQuMy41NjYuNTY4TDEwLjg2OCAxMmwtLjU2NS0uNTY2TDYgNy4xMzJsLTQuMyA0LjMwMkwxLjEzIDEyIDAgMTAuODY4bC41NjYtLjU2NUw0Ljg2OCA2IC41NjYgMS42OTh6XFxcIi8+PC9zdmc+XFxuXCI7XG5cbi8qIGJhYmVsLXBsdWdpbi1pbmxpbmUtaW1wb3J0ICcuL2ljb25zL2FkZHJlc3Muc3ZnJyAqL1xudmFyIHBpbkljb24gPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNCAyMFxcXCI+PHBhdGggZD1cXFwiTTcgMEMzLjEzIDAgMCAzLjEzIDAgN2MwIDUuMjUgNyAxMyA3IDEzczctNy43NSA3LTEzYzAtMy44Ny0zLjEzLTctNy03em0wIDkuNUM1LjYyIDkuNSA0LjUgOC4zOCA0LjUgN1M1LjYyIDQuNSA3IDQuNSA5LjUgNS42MiA5LjUgNyA4LjM4IDkuNSA3IDkuNXpcXFwiLz48L3N2Zz5cXG5cIjtcblxuLyogYmFiZWwtcGx1Z2luLWlubGluZS1pbXBvcnQgJy4vcGxhY2VzLmNzcycgKi9cbnZhciBjc3MgPSBcIi5hbGdvbGlhLXBsYWNlcyB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLmFwLWlucHV0LCAuYXAtaGludCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmctcmlnaHQ6IDM1cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDE2cHg7XFxuICBsaW5lLWhlaWdodDogNDBweDtcXG4gIGhlaWdodDogNDBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNDQ0M7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4uYXAtaW5wdXQ6Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4uYXAtaW5wdXQ6Oi1tcy1jbGVhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uYXAtaW5wdXQ6aG92ZXIgfiAuYXAtaW5wdXQtaWNvbiBzdmcsXFxuLmFwLWlucHV0OmZvY3VzIH4gLmFwLWlucHV0LWljb24gc3ZnLFxcbi5hcC1pbnB1dC1pY29uOmhvdmVyIHN2ZyB7XFxuICBmaWxsOiAjYWFhYWFhO1xcbn1cXG5cXG4uYXAtZHJvcGRvd24tbWVudSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XFxuICBib3gtc2hhZG93OiAwIDFweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCAycHggNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjEpO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgbWFyZ2luLXRvcDogM3B4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLmFwLXN1Z2dlc3Rpb24ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgaGVpZ2h0OiA0NnB4O1xcbiAgbGluZS1oZWlnaHQ6IDQ2cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDE4cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uYXAtc3VnZ2VzdGlvbiBlbSB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuLmFwLWFkZHJlc3Mge1xcbiAgZm9udC1zaXplOiBzbWFsbGVyO1xcbiAgbWFyZ2luLWxlZnQ6IDEycHg7XFxuICBjb2xvcjogI2FhYWFhYTtcXG59XFxuXFxuLmFwLXN1Z2dlc3Rpb24taWNvbiB7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICB3aWR0aDogMTRweDtcXG4gIGhlaWdodDogMjBweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcblxcbi5hcC1zdWdnZXN0aW9uLWljb24gc3ZnIHtcXG4gIGRpc3BsYXk6IGluaGVyaXQ7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC45KSB0cmFuc2xhdGVZKDJweCk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45KSB0cmFuc2xhdGVZKDJweCk7XFxuICBmaWxsOiAjY2ZjZmNmO1xcbn1cXG5cXG4uYXAtaW5wdXQtaWNvbiB7XFxuICBib3JkZXI6IDA7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiAxNnB4O1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLmFwLWlucHV0LWljb24uYXAtaWNvbi1waW4ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYXAtaW5wdXQtaWNvbiBzdmcge1xcbiAgZmlsbDogI2NmY2ZjZjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgcmlnaHQ6IDA7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbn1cXG5cXG4uYXAtY3Vyc29yIHtcXG4gIGJhY2tncm91bmQ6ICNlZmVmZWY7XFxufVxcblxcbi5hcC1jdXJzb3IgLmFwLXN1Z2dlc3Rpb24taWNvbiBzdmcge1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpIHRyYW5zbGF0ZVkoMnB4KTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKSB0cmFuc2xhdGVZKDJweCk7XFxuICBmaWxsOiAjYWFhYWFhO1xcbn1cXG5cXG4uYXAtZm9vdGVyIHtcXG4gIG9wYWNpdHk6IC44O1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICBwYWRkaW5nOiAuNWVtIDFlbSAuNWVtIDA7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsaW5lLWhlaWdodDogMTJweDtcXG59XFxuXFxuLmFwLWZvb3RlciBhIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG4uYXAtZm9vdGVyIGEgc3ZnIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcblxcbi5hcC1mb290ZXI6aG92ZXIge1xcbiAgb3BhY2l0eTogMTtcXG59XFxuXCI7XG4oMCwgX2luc2VydENzc1tcImRlZmF1bHRcIl0pKGNzcywge1xuICBwcmVwZW5kOiB0cnVlXG59KTtcblxudmFyIGFwcGx5QXR0cmlidXRlcyA9IGZ1bmN0aW9uIGFwcGx5QXR0cmlidXRlcyhlbHQsIGF0dHJzKSB7XG4gIE9iamVjdC5lbnRyaWVzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIF9yZWYyID0gX3NsaWNlZFRvQXJyYXkoX3JlZiwgMiksXG4gICAgICAgIG5hbWUgPSBfcmVmMlswXSxcbiAgICAgICAgdmFsdWUgPSBfcmVmMlsxXTtcblxuICAgIGVsdC5zZXRBdHRyaWJ1dGUobmFtZSwgXCJcIi5jb25jYXQodmFsdWUpKTtcbiAgfSk7XG4gIHJldHVybiBlbHQ7XG59O1xuXG5mdW5jdGlvbiBwbGFjZXMob3B0aW9ucykge1xuICB2YXIgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIsXG4gICAgICBzdHlsZSA9IG9wdGlvbnMuc3R5bGUsXG4gICAgICBhY2Nlc3NpYmlsaXR5ID0gb3B0aW9ucy5hY2Nlc3NpYmlsaXR5LFxuICAgICAgX29wdGlvbnMkYXV0b2NvbXBsZXRlID0gb3B0aW9ucy5hdXRvY29tcGxldGVPcHRpb25zLFxuICAgICAgdXNlckF1dG9jb21wbGV0ZU9wdGlvbnMgPSBfb3B0aW9ucyRhdXRvY29tcGxldGUgPT09IHZvaWQgMCA/IHt9IDogX29wdGlvbnMkYXV0b2NvbXBsZXRlOyAvLyBtdWx0aXBsZSBET00gZWxlbWVudHMgdGFyZ2V0ZWRcblxuICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICBpZiAoY29udGFpbmVyLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihfZXJyb3JzW1wiZGVmYXVsdFwiXS5tdWx0aUNvbnRhaW5lcnMpO1xuICAgIH0gLy8gaWYgc2luZ2xlIG5vZGUgTm9kZUxpc3QgcmVjZWl2ZWQsIHJlc29sdmUgdG8gdGhlIGZpcnN0IG9uZVxuXG5cbiAgICByZXR1cm4gcGxhY2VzKF9vYmplY3RTcHJlYWQoe30sIG9wdGlvbnMsIHtcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyWzBdXG4gICAgfSkpO1xuICB9IC8vIGNvbnRhaW5lciBzZW50IGFzIGEgc3RyaW5nLCByZXNvbHZlIGl0IGZvciBtdWx0aXBsZSBET00gZWxlbWVudHMgaXNzdWVcblxuXG4gIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgIHZhciByZXNvbHZlZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29udGFpbmVyKTtcbiAgICByZXR1cm4gcGxhY2VzKF9vYmplY3RTcHJlYWQoe30sIG9wdGlvbnMsIHtcbiAgICAgIGNvbnRhaW5lcjogcmVzb2x2ZWRDb250YWluZXJcbiAgICB9KSk7XG4gIH0gLy8gaWYgbm90IGFuIDxpbnB1dD4sIGVycm9yXG5cblxuICBpZiAoIShjb250YWluZXIgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihfZXJyb3JzW1wiZGVmYXVsdFwiXS5iYWRDb250YWluZXIpO1xuICB9XG5cbiAgdmFyIHBsYWNlc0luc3RhbmNlID0gbmV3IF9ldmVudHNbXCJkZWZhdWx0XCJdKCk7XG4gIHZhciBwcmVmaXggPSBcImFwXCIuY29uY2F0KHN0eWxlID09PSBmYWxzZSA/ICctbm9zdHlsZScgOiAnJyk7XG5cbiAgdmFyIGF1dG9jb21wbGV0ZU9wdGlvbnMgPSBfb2JqZWN0U3ByZWFkKHtcbiAgICBhdXRvc2VsZWN0OiB0cnVlLFxuICAgIGhpbnQ6IGZhbHNlLFxuICAgIGNzc0NsYXNzZXM6IHtcbiAgICAgIHJvb3Q6IFwiYWxnb2xpYS1wbGFjZXNcIi5jb25jYXQoc3R5bGUgPT09IGZhbHNlID8gJy1ub3N0eWxlJyA6ICcnKSxcbiAgICAgIHByZWZpeDogcHJlZml4XG4gICAgfSxcbiAgICBkZWJ1ZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCdcbiAgfSwgdXNlckF1dG9jb21wbGV0ZU9wdGlvbnMpO1xuXG4gIHZhciBhdXRvY29tcGxldGVEYXRhc2V0ID0gKDAsIF9jcmVhdGVBdXRvY29tcGxldGVEYXRhc2V0W1wiZGVmYXVsdFwiXSkoX29iamVjdFNwcmVhZCh7fSwgb3B0aW9ucywge1xuICAgIGFsZ29saWFzZWFyY2g6IF9hbGdvbGlhc2VhcmNoTGl0ZVtcImRlZmF1bHRcIl0sXG4gICAgb25IaXRzOiBmdW5jdGlvbiBvbkhpdHMoX3JlZjMpIHtcbiAgICAgIHZhciBoaXRzID0gX3JlZjMuaGl0cyxcbiAgICAgICAgICByYXdBbnN3ZXIgPSBfcmVmMy5yYXdBbnN3ZXIsXG4gICAgICAgICAgcXVlcnkgPSBfcmVmMy5xdWVyeTtcbiAgICAgIHJldHVybiBwbGFjZXNJbnN0YW5jZS5lbWl0KCdzdWdnZXN0aW9ucycsIHtcbiAgICAgICAgcmF3QW5zd2VyOiByYXdBbnN3ZXIsXG4gICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgc3VnZ2VzdGlvbnM6IGhpdHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25FcnJvcjogZnVuY3Rpb24gb25FcnJvcihlKSB7XG4gICAgICByZXR1cm4gcGxhY2VzSW5zdGFuY2UuZW1pdCgnZXJyb3InLCBlKTtcbiAgICB9LFxuICAgIG9uUmF0ZUxpbWl0UmVhY2hlZDogZnVuY3Rpb24gb25SYXRlTGltaXRSZWFjaGVkKCkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IHBsYWNlc0luc3RhbmNlLmxpc3RlbmVyQ291bnQoJ2xpbWl0Jyk7XG5cbiAgICAgIGlmIChsaXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coX2Vycm9yc1tcImRlZmF1bHRcIl0ucmF0ZUxpbWl0UmVhY2hlZCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcGxhY2VzSW5zdGFuY2UuZW1pdCgnbGltaXQnLCB7XG4gICAgICAgIG1lc3NhZ2U6IF9lcnJvcnNbXCJkZWZhdWx0XCJdLnJhdGVMaW1pdFJlYWNoZWRcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25JbnZhbGlkQ3JlZGVudGlhbHM6IGZ1bmN0aW9uIG9uSW52YWxpZENyZWRlbnRpYWxzKCkge1xuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hcHBJZCAmJiBvcHRpb25zLmFwcElkLnN0YXJ0c1dpdGgoJ3BsJykpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihfZXJyb3JzW1wiZGVmYXVsdFwiXS5pbnZhbGlkQ3JlZGVudGlhbHMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoX2Vycm9yc1tcImRlZmF1bHRcIl0uaW52YWxpZEFwcElkKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICB9XG4gICAgfSxcbiAgICBjb250YWluZXI6IHVuZGVmaW5lZFxuICB9KSk7XG4gIHZhciBhdXRvY29tcGxldGVJbnN0YW5jZSA9ICgwLCBfYXV0b2NvbXBsZXRlW1wiZGVmYXVsdFwiXSkoY29udGFpbmVyLCBhdXRvY29tcGxldGVPcHRpb25zLCBhdXRvY29tcGxldGVEYXRhc2V0KTtcbiAgdmFyIGF1dG9jb21wbGV0ZUNvbnRhaW5lciA9IGNvbnRhaW5lci5wYXJlbnROb2RlO1xuICB2YXIgYXV0b2NvbXBsZXRlQ2hhbmdlRXZlbnRzID0gWydzZWxlY3RlZCcsICdhdXRvY29tcGxldGVkJ107XG4gIGF1dG9jb21wbGV0ZUNoYW5nZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICBhdXRvY29tcGxldGVJbnN0YW5jZS5vbihcImF1dG9jb21wbGV0ZTpcIi5jb25jYXQoZXZlbnROYW1lKSwgZnVuY3Rpb24gKF8sIHN1Z2dlc3Rpb24pIHtcbiAgICAgIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgcmF3QW5zd2VyOiBzdWdnZXN0aW9uLnJhd0Fuc3dlcixcbiAgICAgICAgcXVlcnk6IHN1Z2dlc3Rpb24ucXVlcnksXG4gICAgICAgIHN1Z2dlc3Rpb246IHN1Z2dlc3Rpb24sXG4gICAgICAgIHN1Z2dlc3Rpb25JbmRleDogc3VnZ2VzdGlvbi5oaXRJbmRleFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBhdXRvY29tcGxldGVJbnN0YW5jZS5vbignYXV0b2NvbXBsZXRlOmN1cnNvcmNoYW5nZWQnLCBmdW5jdGlvbiAoXywgc3VnZ2VzdGlvbikge1xuICAgIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2N1cnNvcmNoYW5nZWQnLCB7XG4gICAgICByYXdBbnN3ZXI6IHN1Z2dlc3Rpb24ucmF3QW5zd2VyLFxuICAgICAgcXVlcnk6IHN1Z2dlc3Rpb24ucXVlcnksXG4gICAgICBzdWdnZXN0aW9uOiBzdWdnZXN0aW9uLFxuICAgICAgc3VnZ2VzdGlvbkluZGV4OiBzdWdnZXN0aW9uLmhpdEluZGV4XG4gICAgfSk7XG4gIH0pO1xuICB2YXIgY2xlYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgY2xlYXIuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICBjbGVhci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnY2xlYXInKTtcblxuICBpZiAoYWNjZXNzaWJpbGl0eSAmJiBhY2Nlc3NpYmlsaXR5LmNsZWFyQnV0dG9uICYmIGFjY2Vzc2liaWxpdHkuY2xlYXJCdXR0b24gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICBhcHBseUF0dHJpYnV0ZXMoY2xlYXIsIGFjY2Vzc2liaWxpdHkuY2xlYXJCdXR0b24pO1xuICB9XG5cbiAgY2xlYXIuY2xhc3NMaXN0LmFkZChcIlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0LWljb25cIikpO1xuICBjbGVhci5jbGFzc0xpc3QuYWRkKFwiXCIuY29uY2F0KHByZWZpeCwgXCItaWNvbi1jbGVhclwiKSk7XG4gIGNsZWFyLmlubmVySFRNTCA9IGNsZWFySWNvbjtcbiAgYXV0b2NvbXBsZXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsZWFyKTtcbiAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgdmFyIHBpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBwaW4uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICBwaW4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ2ZvY3VzJyk7XG5cbiAgaWYgKGFjY2Vzc2liaWxpdHkgJiYgYWNjZXNzaWJpbGl0eS5waW5CdXR0b24gJiYgYWNjZXNzaWJpbGl0eS5waW5CdXR0b24gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICBhcHBseUF0dHJpYnV0ZXMocGluLCBhY2Nlc3NpYmlsaXR5LnBpbkJ1dHRvbik7XG4gIH1cblxuICBwaW4uY2xhc3NMaXN0LmFkZChcIlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0LWljb25cIikpO1xuICBwaW4uY2xhc3NMaXN0LmFkZChcIlwiLmNvbmNhdChwcmVmaXgsIFwiLWljb24tcGluXCIpKTtcbiAgcGluLmlubmVySFRNTCA9IHBpbkljb247XG4gIGF1dG9jb21wbGV0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwaW4pO1xuICBwaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgYXV0b2NvbXBsZXRlRGF0YXNldC5zb3VyY2UuY29uZmlndXJlKHtcbiAgICAgIHVzZURldmljZUxvY2F0aW9uOiB0cnVlXG4gICAgfSk7XG4gICAgYXV0b2NvbXBsZXRlSW5zdGFuY2UuZm9jdXMoKTtcbiAgfSk7XG4gIGNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGF1dG9jb21wbGV0ZUluc3RhbmNlLmF1dG9jb21wbGV0ZS5zZXRWYWwoJycpO1xuICAgIGF1dG9jb21wbGV0ZUluc3RhbmNlLmZvY3VzKCk7XG4gICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBwaW4uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2NsZWFyJyk7XG4gIH0pO1xuICB2YXIgcHJldmlvdXNRdWVyeSA9ICcnO1xuXG4gIHZhciBpbnB1dExpc3RlbmVyID0gZnVuY3Rpb24gaW5wdXRMaXN0ZW5lcigpIHtcbiAgICB2YXIgcXVlcnkgPSBhdXRvY29tcGxldGVJbnN0YW5jZS52YWwoKTtcblxuICAgIGlmIChxdWVyeSA9PT0gJycpIHtcbiAgICAgIHBpbi5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICBjbGVhci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICBpZiAocHJldmlvdXNRdWVyeSAhPT0gcXVlcnkpIHtcbiAgICAgICAgcGxhY2VzSW5zdGFuY2UuZW1pdCgnY2xlYXInKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgcGluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgcHJldmlvdXNRdWVyeSA9IHF1ZXJ5O1xuICB9O1xuXG4gIGF1dG9jb21wbGV0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0XCIpKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0TGlzdGVuZXIpO1xuICB2YXIgYXV0b2NvbXBsZXRlSXNvbW9ycGhpY01ldGhvZHMgPSBbJ29wZW4nLCAnY2xvc2UnXTtcbiAgYXV0b2NvbXBsZXRlSXNvbW9ycGhpY01ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgIHBsYWNlc0luc3RhbmNlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9hdXRvY29tcGxldGVJbnN0YW5jZTtcblxuICAgICAgKF9hdXRvY29tcGxldGVJbnN0YW5jZSA9IGF1dG9jb21wbGV0ZUluc3RhbmNlLmF1dG9jb21wbGV0ZSlbbWV0aG9kTmFtZV0uYXBwbHkoX2F1dG9jb21wbGV0ZUluc3RhbmNlLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIHBsYWNlc0luc3RhbmNlLmdldFZhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXV0b2NvbXBsZXRlSW5zdGFuY2UudmFsKCk7XG4gIH07XG5cbiAgcGxhY2VzSW5zdGFuY2UuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX2F1dG9jb21wbGV0ZUluc3RhbmNlMjtcblxuICAgIGF1dG9jb21wbGV0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLlwiLmNvbmNhdChwcmVmaXgsIFwiLWlucHV0XCIpKS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0TGlzdGVuZXIpO1xuXG4gICAgKF9hdXRvY29tcGxldGVJbnN0YW5jZTIgPSBhdXRvY29tcGxldGVJbnN0YW5jZS5hdXRvY29tcGxldGUpLmRlc3Ryb3kuYXBwbHkoX2F1dG9jb21wbGV0ZUluc3RhbmNlMiwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBwbGFjZXNJbnN0YW5jZS5zZXRWYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9hdXRvY29tcGxldGVJbnN0YW5jZTM7XG5cbiAgICBwcmV2aW91c1F1ZXJ5ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzBdO1xuXG4gICAgaWYgKHByZXZpb3VzUXVlcnkgPT09ICcnKSB7XG4gICAgICBwaW4uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgY2xlYXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgcGluLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgKF9hdXRvY29tcGxldGVJbnN0YW5jZTMgPSBhdXRvY29tcGxldGVJbnN0YW5jZS5hdXRvY29tcGxldGUpLnNldFZhbC5hcHBseShfYXV0b2NvbXBsZXRlSW5zdGFuY2UzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHBsYWNlc0luc3RhbmNlLmF1dG9jb21wbGV0ZSA9IGF1dG9jb21wbGV0ZUluc3RhbmNlO1xuXG4gIHBsYWNlc0luc3RhbmNlLnNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcXVlcnkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICcnO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgYXV0b2NvbXBsZXRlRGF0YXNldC5zb3VyY2UocXVlcnksIHJlc29sdmUpO1xuICAgIH0pO1xuICB9O1xuXG4gIHBsYWNlc0luc3RhbmNlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChjb25maWd1cmF0aW9uKSB7XG4gICAgdmFyIHNhZmVDb25maWcgPSBfb2JqZWN0U3ByZWFkKHt9LCBjb25maWd1cmF0aW9uKTtcblxuICAgIGRlbGV0ZSBzYWZlQ29uZmlnLm9uSGl0cztcbiAgICBkZWxldGUgc2FmZUNvbmZpZy5vbkVycm9yO1xuICAgIGRlbGV0ZSBzYWZlQ29uZmlnLm9uUmF0ZUxpbWl0UmVhY2hlZDtcbiAgICBkZWxldGUgc2FmZUNvbmZpZy5vbkludmFsaWRDcmVkZW50aWFscztcbiAgICBkZWxldGUgc2FmZUNvbmZpZy50ZW1wbGF0ZXM7XG4gICAgYXV0b2NvbXBsZXRlRGF0YXNldC5zb3VyY2UuY29uZmlndXJlKHNhZmVDb25maWcpO1xuICAgIHJldHVybiBwbGFjZXNJbnN0YW5jZTtcbiAgfTtcblxuICBwbGFjZXNJbnN0YW5jZS5yZXZlcnNlID0gKDAsIF9jcmVhdGVSZXZlcnNlR2VvY29kaW5nU291cmNlW1wiZGVmYXVsdFwiXSkoX29iamVjdFNwcmVhZCh7fSwgb3B0aW9ucywge1xuICAgIGFsZ29saWFzZWFyY2g6IF9hbGdvbGlhc2VhcmNoTGl0ZVtcImRlZmF1bHRcIl0sXG4gICAgZm9ybWF0SW5wdXRWYWx1ZTogKG9wdGlvbnMudGVtcGxhdGVzIHx8IHt9KS52YWx1ZSxcbiAgICBvbkhpdHM6IGZ1bmN0aW9uIG9uSGl0cyhfcmVmNCkge1xuICAgICAgdmFyIGhpdHMgPSBfcmVmNC5oaXRzLFxuICAgICAgICAgIHJhd0Fuc3dlciA9IF9yZWY0LnJhd0Fuc3dlcixcbiAgICAgICAgICBxdWVyeSA9IF9yZWY0LnF1ZXJ5O1xuICAgICAgcmV0dXJuIHBsYWNlc0luc3RhbmNlLmVtaXQoJ3JldmVyc2UnLCB7XG4gICAgICAgIHJhd0Fuc3dlcjogcmF3QW5zd2VyLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIHN1Z2dlc3Rpb25zOiBoaXRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uRXJyb3I6IGZ1bmN0aW9uIG9uRXJyb3IoZSkge1xuICAgICAgcmV0dXJuIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2Vycm9yJywgZSk7XG4gICAgfSxcbiAgICBvblJhdGVMaW1pdFJlYWNoZWQ6IGZ1bmN0aW9uIG9uUmF0ZUxpbWl0UmVhY2hlZCgpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBwbGFjZXNJbnN0YW5jZS5saXN0ZW5lckNvdW50KCdsaW1pdCcpO1xuXG4gICAgICBpZiAobGlzdGVuZXJzID09PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKF9lcnJvcnNbXCJkZWZhdWx0XCJdLnJhdGVMaW1pdFJlYWNoZWQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHBsYWNlc0luc3RhbmNlLmVtaXQoJ2xpbWl0Jywge1xuICAgICAgICBtZXNzYWdlOiBfZXJyb3JzW1wiZGVmYXVsdFwiXS5yYXRlTGltaXRSZWFjaGVkXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uSW52YWxpZENyZWRlbnRpYWxzOiBmdW5jdGlvbiBvbkludmFsaWRDcmVkZW50aWFscygpIHtcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuYXBwSWQgJiYgb3B0aW9ucy5hcHBJZC5zdGFydHNXaXRoKCdwbCcpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoX2Vycm9yc1tcImRlZmF1bHRcIl0uaW52YWxpZENyZWRlbnRpYWxzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKF9lcnJvcnNbXCJkZWZhdWx0XCJdLmludmFsaWRBcHBJZCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgfVxuICAgIH1cbiAgfSkpO1xuICByZXR1cm4gcGxhY2VzSW5zdGFuY2U7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9ICcxLjE4LjInO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gbWFwKG9ialtrXSwgZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuZnVuY3Rpb24gbWFwICh4cywgZikge1xuICBpZiAoeHMubWFwKSByZXR1cm4geHMubWFwKGYpO1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICByZXMucHVzaChmKHhzW2ldLCBpKSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmRlY29kZSA9IGV4cG9ydHMucGFyc2UgPSByZXF1aXJlKCcuL2RlY29kZScpO1xuZXhwb3J0cy5lbmNvZGUgPSBleHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB2YXIgYXR0cmlidXRlcyA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLm1lZGlhID8gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKS5jb25jYXQob2JqLmNzcywgXCJ9XCIpIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGlhJyk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIGJ0b2EpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlO1xuICB2YXIgdXBkYXRlO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuICAgIHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuICAvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuICB9XG5cbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuZXdMaXN0KSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRvbVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5Eb21bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5Eb20uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgcGxhY2VzIGZyb20gJy4uL25vZGVfbW9kdWxlcy9wbGFjZXMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gYWxnb2xpYSgpIHtcbiAgbGV0IGxhdDtcbiAgbGV0IGxvbjtcbiAgbGV0IGNpdHk7XG4gIGxldCBjb3VudHJ5O1xuXG4gIGNvbnN0IHBsYWNlc0F1dG9jb21wbGV0ZSA9IHBsYWNlcyh7XG4gICAgYXBwSWQ6ICdwbDBPMUdOOE5ZNUgnLFxuICAgIGFwaUtleTogJ2JhNjc1ODMwNWExMTY5N2I1YmIyMGRhNWYyNTQxZDhhJyxcbiAgICBjb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcXVlcnknKSxcbiAgfSkuY29uZmlndXJlKHtcbiAgICB0eXBlOiAnY2l0eScsXG4gICAgYXJvdW5kTGF0TG5nVmlhSVA6IGZhbHNlLFxuICB9KTtcblxuICBwbGFjZXNBdXRvY29tcGxldGUub24oJ2NsZWFyJywgZnVuY3Rpb24gKCkge1xuICAgICQoJyNzZWFyY2gtcXVlcnknKS50ZXh0Q29udGVudCA9ICdub25lJztcbiAgfSk7XG4gIHBsYWNlc0F1dG9jb21wbGV0ZS5vbignY2hhbmdlJywgKGUpID0+IHtcbiAgICBsYXQgPSBlLnN1Z2dlc3Rpb24ubGF0bG5nLmxhdDtcbiAgICBsb24gPSBlLnN1Z2dlc3Rpb24ubGF0bG5nLmxuZztcbiAgICBjaXR5ID0gZS5zdWdnZXN0aW9uLm5hbWU7XG4gICAgY291bnRyeSA9IGUuc3VnZ2VzdGlvbi5jb3VudHJ5O1xuICB9KTtcblxuICBjb25zdCBnZXRMYXRMb24gPSAoKSA9PiBbbGF0LCBsb25dO1xuICBjb25zdCBnZXRDaXR5Q291bnRyeSA9ICgpID0+IGAke2NpdHl9LCAke2NvdW50cnl9YDtcbiAgY29uc3QgcmVzZXRTZWFyY2ggPSAoKSA9PiB7XG4gICAgbGF0ID0gJyc7XG4gICAgbG9uID0gJyc7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0TGF0TG9uLCBnZXRDaXR5Q291bnRyeSwgcmVzZXRTZWFyY2ggfTtcbn0pKCk7XG4iLCJmdW5jdGlvbiByZXN1bHRBbmltYXRpb24oKSB7XG4gICQoJy5zZWFyY2gtc3VibWl0LC5hcC1pbnB1dC1pY29uJykudG9nZ2xlQ2xhc3MoJ2JhY2tPdXREb3duJyk7XG4gICQoJyNzZWFyY2gtY29udGFpbmVyID4gaDEnKS50b2dnbGVDbGFzcygnYmFja091dFVwJyk7XG4gICQoJyNzZWFyY2gtY29udGFpbmVyJykuZmFkZU91dCgpO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICQoJy5zZWFyY2gtc3VibWl0LC5hcC1pbnB1dC1pY29uJykudG9nZ2xlQ2xhc3MoJ2JhY2tPdXREb3duJyk7XG4gICAgJCgnI3NlYXJjaC1jb250YWluZXIgPiBoMScpLnRvZ2dsZUNsYXNzKCdiYWNrT3V0VXAnKTtcbiAgfSwgMTAwMCk7XG59XG5cbmZ1bmN0aW9uIHNlYXJjaEFuaW1hdGlvbigpIHtcbiAgJCgnI3Jlc3VsdC1jb250YWluZXInKS5mYWRlT3V0KDQwMCk7XG4gICQoJyNzZWFyY2gtY29udGFpbmVyJykuZmFkZUluKDE1MDApO1xufVxuXG5mdW5jdGlvbiBsb2FkaW5nQW5pbWF0aW9uKCkge1xuICAkKCcjbG9hZGluZy1jb250YWluZXInKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpLmZhZGVJbigxMjAwKTtcbiAgJCgnI2xvYWRpbmctY29udGFpbmVyJykuZmFkZU91dCgxMjAwKTtcbn1cblxuZXhwb3J0IHsgcmVzdWx0QW5pbWF0aW9uLCBzZWFyY2hBbmltYXRpb24sIGxvYWRpbmdBbmltYXRpb24gfTtcblxuLy8gJCgnLnJlc3VsdC1jb250YWluZXInKS5zbGlkZURvd24oOTAwKTtcbi8vICQoJyNyZXN1bHQtY29udGFpbmVyJykuc2hvdygpO1xuIiwiaW1wb3J0IHsgcmVzdWx0QW5pbWF0aW9uLCBzZWFyY2hBbmltYXRpb24sIGxvYWRpbmdBbmltYXRpb24gfSBmcm9tICcuL2FuaW1hdGlvbkFjdGl2YXRlJztcbmltcG9ydCBnZXRXZWF0aGVyRGF0YSBmcm9tICcuL3JldHJpZXZlV2VhdGhlcic7XG5pbXBvcnQgZ2V0V2ViY2FtIGZyb20gJy4vcmV0cmlldmVXZWJjYW0nO1xuaW1wb3J0IGFsZ29saWEgZnJvbSAnLi9hbGdvbGlhJztcblxuLy8gV2hlbiBwcmVzc2luZyBlbnRlciBvbiBzZWFyY2ggYmFyIG9yIGNsaWNraW5nIHRoZSBsZXQncyBnbyBidXR0b25cbiQoJy5zZWFyY2gtc3VibWl0Jykub24oJ2NsaWNrIGtleXByZXNzJywgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUud2hpY2ggPT09IDEzIHx8IGUudGFyZ2V0LnRhZ05hbWUgPT09ICdCVVRUT04nKSB7XG4gICAgY29uc3QgW2xhdCwgbG9uXSA9IGFsZ29saWEuZ2V0TGF0TG9uKCk7XG4gICAgJCgnI2xvY2F0aW9uLW5hbWUnKS50ZXh0KGFsZ29saWEuZ2V0Q2l0eUNvdW50cnkoKSk7XG4gICAgJCgnI3NlYXJjaC1xdWVyeScpLnZhbCgnJyk7XG5cbiAgICAvLyBPbmx5IGV4ZWN1dGUgd2hlbiB3ZSBoYXZlIHJlc29sdmVkIGRhdGFcbiAgICBnZXRXZWF0aGVyRGF0YShsYXQsIGxvbilcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgYWxnb2xpYS5yZXNldFNlYXJjaCgpO1xuICAgICAgICBsb2FkaW5nQW5pbWF0aW9uKCk7XG4gICAgICAgIHJlc3VsdEFuaW1hdGlvbigpO1xuICAgICAgICBnZXRXZWJjYW0obGF0LCBsb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICQoJyNyZXN1bHQtY29udGFpbmVyJykuZGVsYXkoMTMwMCkuc2xpZGVEb3duKDE1MDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gIH1cbn0pO1xuXG4kKCcjc2VhcmNoLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgc2VhcmNoQW5pbWF0aW9uKCk7XG59KTtcblxuJCgnI2ZhaHJlbmhlaXQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHZhbHVlID0gJCgnI3RlbXBlcmF0dXJlJykudGV4dCgpO1xuICBpZiAoJCgnI3RlbXBlcmF0dXJlJykuaGFzQ2xhc3MoJ0MnKSkge1xuICAgIGNvbnN0IGNvbnZlcnRlZFRvQ2VsY2l1cyA9IHZhbHVlICogMS44ICsgMzI7XG4gICAgdG9nZ2xlVGVtcGVyYXR1cmUoY29udmVydGVkVG9DZWxjaXVzKTtcbiAgfVxufSk7XG4kKCcjY2VsY2l1cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgdmFsdWUgPSAkKCcjdGVtcGVyYXR1cmUnKS50ZXh0KCk7XG4gIGlmICgkKCcjdGVtcGVyYXR1cmUnKS5oYXNDbGFzcygnRicpKSB7XG4gICAgY29uc3QgY29udmVydGVkVG9DZWxjaXVzID0gKHZhbHVlIC0gMzIpIC8gMS44O1xuICAgIHRvZ2dsZVRlbXBlcmF0dXJlKGNvbnZlcnRlZFRvQ2VsY2l1cyk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiB0b2dnbGVUZW1wZXJhdHVyZSh2YWx1ZSkge1xuICAkKCcjdGVtcGVyYXR1cmUnKS50ZXh0KHZhbHVlLnRvRml4ZWQoMSkpO1xuICAkKCcjdGVtcGVyYXR1cmUnKS50b2dnbGVDbGFzcygnRicpO1xuICAkKCcjdGVtcGVyYXR1cmUnKS50b2dnbGVDbGFzcygnQycpO1xufVxuIiwidmFyIG1hcCA9IHtcblx0XCIuL2NsZWFyLXNreS5zdmdcIjogXCIuL3NyYy9pbWFnZXMvY2xlYXItc2t5LnN2Z1wiLFxuXHRcIi4vY2xvdWQuc3ZnXCI6IFwiLi9zcmMvaW1hZ2VzL2Nsb3VkLnN2Z1wiLFxuXHRcIi4vaGF6ZS5zdmdcIjogXCIuL3NyYy9pbWFnZXMvaGF6ZS5zdmdcIixcblx0XCIuL2xvYWRpbmcuc3ZnXCI6IFwiLi9zcmMvaW1hZ2VzL2xvYWRpbmcuc3ZnXCIsXG5cdFwiLi9taXN0LnN2Z1wiOiBcIi4vc3JjL2ltYWdlcy9taXN0LnN2Z1wiLFxuXHRcIi4vcmFpbi5zdmdcIjogXCIuL3NyYy9pbWFnZXMvcmFpbi5zdmdcIixcblx0XCIuL3NlYXJjaC5zdmdcIjogXCIuL3NyYy9pbWFnZXMvc2VhcmNoLnN2Z1wiLFxuXHRcIi4vc25vdy5zdmdcIjogXCIuL3NyYy9pbWFnZXMvc25vdy5zdmdcIixcblx0XCIuL3RlbXAuc3ZnXCI6IFwiLi9zcmMvaW1hZ2VzL3RlbXAuc3ZnXCIsXG5cdFwiLi90aHVuZGVyc3Rvcm0uc3ZnXCI6IFwiLi9zcmMvaW1hZ2VzL3RodW5kZXJzdG9ybS5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvaW1hZ2VzIHN5bmMgcmVjdXJzaXZlIFxcXFwuc3ZnJFwiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvY2xlYXItc2t5LnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvY2xvdWQuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltYWdlcy9oYXplLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvbG9hZGluZy5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1hZ2VzL21pc3Quc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltYWdlcy9yYWluLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvc2VhcmNoLnN2Z1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvc25vdy5zdmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1hZ2VzL3RlbXAuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltYWdlcy90aHVuZGVyc3Rvcm0uc3ZnXCI7IiwiaW1wb3J0ICdub3JtYWxpemUuY3NzJztcbmltcG9ydCAnLi9zdHlsZXMvc3R5bGUuY3NzJztcbmltcG9ydCAnLi9ldmVudExpc3RlbmVycyc7XG4vLyBpbXBvcnQgYWxsIGltYWdlc1xuY29uc3QgcmVxU3ZncyA9IHJlcXVpcmUuY29udGV4dCgnLi9pbWFnZXMnLCB0cnVlLCAvXFwuc3ZnJC8pO1xuXG4iLCJhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsYXQsIGxvbikge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7bGF0fSZsb249JHtsb259JnVuaXRzPWltcGVyaWFsJmFwcGlkPWYyZTUzNDg5ZTM2YWZmZWM5ZjViODVhYWZjMzlhNWIxYFxuICAgICk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBcbiAgICAkKCcjdGVtcGVyYXR1cmUnKS5odG1sKGAke2RhdGEubWFpbi50ZW1wLnRvRml4ZWQoMSl9YCk7XG4gICAgY29uc3Qgd2VhdGhlckNvbmRpdGlvbiA9IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICAkKCcjY29uZGl0aW9uJykudGV4dChjYXBpdGFsaXplRmlyc3RMZXR0ZXIod2VhdGhlckNvbmRpdGlvbikpO1xuICAgICQoJyNjb25kaXRpb24taW1nJykuYXR0cignc3JjJywgYC4vaW1hZ2VzLyR7YXNzaWduSW1hZ2Uod2VhdGhlckNvbmRpdGlvbil9LnN2Z2ApO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBhbGVydCgnSW52YWxpZCBjaXR5ISBQbGVhc2UgZW50ZXIgYSB2YWxpZCBjaXR5IScpO1xuICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgc3RhdHVzOiR7ZXJyLnN0YXR1c31gKTtcbiAgfVxufVxuXG4vLyBGb3Igc2l0dWF0aW9ucyBsaWtlICdzY2F0dGVyZWQgY2xvdWRzJ1xuZnVuY3Rpb24gYXNzaWduSW1hZ2Uod2VhdGhlckNvbmRpdGlvbikge1xuICBpZiAod2VhdGhlckNvbmRpdGlvbi5pbmNsdWRlcygnY2xvdWQnKSkgcmV0dXJuICdjbG91ZCc7XG4gIGlmICh3ZWF0aGVyQ29uZGl0aW9uLmluY2x1ZGVzKCdyYWluJykpIHJldHVybiAncmFpbic7XG4gIGlmICh3ZWF0aGVyQ29uZGl0aW9uLmluY2x1ZGVzKCdjbGVhcicpKSByZXR1cm4gJ2NsZWFyLXNreSc7XG4gIHJldHVybiB3ZWF0aGVyQ29uZGl0aW9uO1xufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFdlYXRoZXJEYXRhO1xuIiwiYXN5bmMgZnVuY3Rpb24gZ2V0V2ViY2FtKGxhdCwgbG9uKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS53aW5keS5jb20vYXBpL3dlYmNhbXMvdjIvbGlzdC9uZWFyYnk9JHtsYXR9LCR7bG9ufSw1P3Nob3c9d2ViY2Ftczpsb2NhdGlvbixwbGF5ZXIma2V5PXhlYmFiNGZpaTl3bGZTeXVrNG4zNjNhRk5QbjRmYW1sYFxuICAgICk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIGNvbnN0IHdlYmNhbXMgPSBkYXRhLnJlc3VsdC53ZWJjYW1zO1xuICAgIGNvbnN0IHdlYmNhbUxpbmsgPSB3ZWJjYW1zLmxlbmd0aCA+IDAgPyB3ZWJjYW1zWzBdLnBsYXllci5kYXkuZW1iZWQgOiAnJztcbiAgICAkKCdpZnJhbWUnKS5hdHRyKCdzcmMnLCB3ZWJjYW1MaW5rKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgc3RhdHVzOiR7ZXJyLnN0YXR1c31gKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRXZWJjYW07XG4iLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiXSwic291cmNlUm9vdCI6IiJ9