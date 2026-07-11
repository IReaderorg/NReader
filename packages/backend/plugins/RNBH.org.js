// Bundled plugin for LNReader/IReader (GraalVM/J2V8 compatible)
// === COMPREHENSIVE POLYFILLS (GraalVM/J2V8 compatible) ===
(function() {
  // === ICU-FREE Intl POLYFILL ===
  var SafeIntl = {
    DateTimeFormat: function(locale, options) {
      this.locale = locale || 'en';
      this.options = options || {};
    },
    NumberFormat: function(locale, options) {
      this.locale = locale || 'en';
      this.options = options || {};
    },
    Collator: function(locale, options) {
      this.locale = locale || 'en';
      this.options = options || {};
    },
    PluralRules: function(locale, options) {
      this.locale = locale || 'en';
      this.options = options || {};
    },
    RelativeTimeFormat: function(locale, options) {
      this.locale = locale || 'en';
      this.options = options || {};
    }
  };
  SafeIntl.DateTimeFormat.prototype.format = function(date) {
    if (!date) return '';
    try {
      var d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) return '';
      var year = d.getFullYear();
      var month = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      var hours = String(d.getHours()).padStart(2, '0');
      var minutes = String(d.getMinutes()).padStart(2, '0');
      var seconds = String(d.getSeconds()).padStart(2, '0');
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    } catch (e) { return ''; }
  };
  SafeIntl.DateTimeFormat.prototype.formatToParts = function(date) {
    var d = date instanceof Date ? date : new Date(date);
    return [
      {type: 'year', value: String(d.getFullYear())},
      {type: 'literal', value: '-'},
      {type: 'month', value: String(d.getMonth() + 1).padStart(2, '0')},
      {type: 'literal', value: '-'},
      {type: 'day', value: String(d.getDate()).padStart(2, '0')}
    ];
  };
  SafeIntl.DateTimeFormat.prototype.resolvedOptions = function() {
    return {locale: this.locale, calendar: 'gregory', timeZone: 'UTC'};
  };
  SafeIntl.DateTimeFormat.supportedLocalesOf = function() { return ['en']; };
  SafeIntl.NumberFormat.prototype.format = function(num) { return String(num); };
  SafeIntl.NumberFormat.prototype.formatToParts = function(num) {
    return [{type: 'integer', value: String(Math.floor(num))}];
  };
  SafeIntl.NumberFormat.prototype.resolvedOptions = function() {
    return {locale: this.locale, style: 'decimal'};
  };
  SafeIntl.NumberFormat.supportedLocalesOf = function() { return ['en']; };
  SafeIntl.Collator.prototype.compare = function(a, b) {
    return String(a).localeCompare(String(b));
  };
  SafeIntl.Collator.prototype.resolvedOptions = function() {
    return {locale: this.locale};
  };
  SafeIntl.Collator.supportedLocalesOf = function() { return ['en']; };
  SafeIntl.PluralRules.prototype.select = function(n) {
    return n === 1 ? 'one' : 'other';
  };
  SafeIntl.PluralRules.prototype.resolvedOptions = function() {
    return {locale: this.locale, type: 'cardinal'};
  };
  SafeIntl.PluralRules.supportedLocalesOf = function() { return ['en']; };
  SafeIntl.RelativeTimeFormat.prototype.format = function(value, unit) {
    var abs = Math.abs(value);
    var suffix = value < 0 ? ' ago' : ' from now';
    return abs + ' ' + unit + (abs !== 1 ? 's' : '') + suffix;
  };
  SafeIntl.RelativeTimeFormat.prototype.resolvedOptions = function() {
    return {locale: this.locale};
  };
  SafeIntl.RelativeTimeFormat.supportedLocalesOf = function() { return ['en']; };
  try { globalThis.Intl = SafeIntl; } catch(e) {}
  try { if (typeof global !== 'undefined') global.Intl = SafeIntl; } catch(e) {}
  try { if (typeof window !== 'undefined') window.Intl = SafeIntl; } catch(e) {}
  try { if (typeof self !== 'undefined') self.Intl = SafeIntl; } catch(e) {}
  
  // === Date prototype overrides ===
  Date.prototype.toLocaleString = function() {
    try {
      return this.getFullYear() + '-' + String(this.getMonth()+1).padStart(2,'0') + '-' + 
             String(this.getDate()).padStart(2,'0') + ' ' + String(this.getHours()).padStart(2,'0') + 
             ':' + String(this.getMinutes()).padStart(2,'0') + ':' + String(this.getSeconds()).padStart(2,'0');
    } catch(e) { return this.toISOString(); }
  };
  Date.prototype.toLocaleDateString = function() {
    try {
      return this.getFullYear() + '-' + String(this.getMonth()+1).padStart(2,'0') + '-' + String(this.getDate()).padStart(2,'0');
    } catch(e) { return this.toISOString().split('T')[0]; }
  };
  Date.prototype.toLocaleTimeString = function() {
    try {
      return String(this.getHours()).padStart(2,'0') + ':' + String(this.getMinutes()).padStart(2,'0') + ':' + String(this.getSeconds()).padStart(2,'0');
    } catch(e) { return this.toISOString().split('T')[1].split('.')[0]; }
  };
  
  // === URLSearchParams polyfill ===
  if (typeof URLSearchParams === 'undefined') {
    var USP = function(init) {
      this.params = {};
      if (typeof init === 'string') {
        var query = init.indexOf('?') === 0 ? init.substring(1) : init;
        if (query) {
          var self = this;
          query.split('&').forEach(function(pair) {
            var parts = pair.split('=');
            var key = decodeURIComponent(parts[0]);
            var value = parts[1] ? decodeURIComponent(parts[1]) : '';
            if (!self.params[key]) self.params[key] = [];
            self.params[key].push(value);
          });
        }
      }
    };
    USP.prototype.append = function(key, value) {
      if (!this.params[key]) this.params[key] = [];
      this.params[key].push(String(value));
    };
    USP.prototype.set = function(key, value) { this.params[key] = [String(value)]; };
    USP.prototype.get = function(key) { return this.params[key] ? this.params[key][0] : null; };
    USP.prototype.getAll = function(key) { return this.params[key] || []; };
    USP.prototype.has = function(key) { return key in this.params; };
    USP.prototype.delete = function(key) { delete this.params[key]; };
    USP.prototype.keys = function() { return Object.keys(this.params); };
    USP.prototype.entries = function() {
      var result = [];
      for (var key in this.params) {
        if (this.params.hasOwnProperty(key)) {
          for (var i = 0; i < this.params[key].length; i++) {
            result.push([key, this.params[key][i]]);
          }
        }
      }
      return result;
    };
    USP.prototype.forEach = function(callback) {
      for (var key in this.params) {
        if (this.params.hasOwnProperty(key)) {
          for (var i = 0; i < this.params[key].length; i++) {
            callback(this.params[key][i], key, this);
          }
        }
      }
    };
    USP.prototype.toString = function() {
      var parts = [];
      for (var key in this.params) {
        if (this.params.hasOwnProperty(key)) {
          for (var i = 0; i < this.params[key].length; i++) {
            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.params[key][i]));
          }
        }
      }
      return parts.join('&');
    };
    try { globalThis.URLSearchParams = USP; } catch(e) {}
  }
  
  // === atob/btoa polyfills ===
  if (typeof atob === 'undefined') {
    globalThis.atob = function(str) {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var output = '';
      str = String(str).replace(/=+$/, '');
      for (var bc = 0, bs, buffer, idx = 0; buffer = str.charAt(idx++);
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
        buffer = chars.indexOf(buffer);
      }
      return output;
    };
  }
  if (typeof btoa === 'undefined') {
    globalThis.btoa = function(str) {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var output = '';
      for (var block, charCode, idx = 0, map = chars;
        str.charAt(idx | 0) || (map = '=', idx % 1);
        output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
        charCode = str.charCodeAt(idx += 3/4);
        block = block << 8 | charCode;
      }
      return output;
    };
  }
  
  // === Object polyfills ===
  if (typeof Object.assign !== 'function') {
    Object.assign = function(target) {
      if (target == null) throw new TypeError('Cannot convert undefined or null to object');
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) to[key] = source[key];
          }
        }
      }
      return to;
    };
  }
  if (!Object.entries) {
    Object.entries = function(obj) {
      var result = [];
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) result.push([key, obj[key]]);
      }
      return result;
    };
  }
  if (!Object.values) {
    Object.values = function(obj) {
      var result = [];
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) result.push(obj[key]);
      }
      return result;
    };
  }
  if (!Object.fromEntries) {
    Object.fromEntries = function(entries) {
      var obj = {};
      for (var i = 0; i < entries.length; i++) obj[entries[i][0]] = entries[i][1];
      return obj;
    };
  }
  
  // === Array polyfills ===
  if (!Array.from) {
    Array.from = function(arrayLike, mapFn, thisArg) {
      var arr = [];
      for (var i = 0; i < arrayLike.length; i++) {
        arr.push(mapFn ? mapFn.call(thisArg, arrayLike[i], i) : arrayLike[i]);
      }
      return arr;
    };
  }
  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate, thisArg) {
      for (var i = 0; i < this.length; i++) {
        if (predicate.call(thisArg, this[i], i, this)) return this[i];
      }
      return undefined;
    };
  }
  if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(predicate, thisArg) {
      for (var i = 0; i < this.length; i++) {
        if (predicate.call(thisArg, this[i], i, this)) return i;
      }
      return -1;
    };
  }
  if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement, fromIndex) {
      var start = fromIndex || 0;
      for (var i = start; i < this.length; i++) {
        if (this[i] === searchElement) return true;
      }
      return false;
    };
  }
  if (!Array.prototype.flat) {
    Array.prototype.flat = function(depth) {
      depth = depth === undefined ? 1 : Math.floor(depth);
      if (depth < 1) return Array.prototype.slice.call(this);
      return (function flatten(arr, d) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i]) && d > 0) result = result.concat(flatten(arr[i], d - 1));
          else result.push(arr[i]);
        }
        return result;
      })(this, depth);
    };
  }
  if (!Array.prototype.flatMap) {
    Array.prototype.flatMap = function(callback, thisArg) {
      return this.map(callback, thisArg).flat(1);
    };
  }
  
  // === String polyfills ===
  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) { return this.indexOf(search, start) !== -1; };
  }
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(search, pos) {
      pos = pos || 0;
      return this.substr(pos, search.length) === search;
    };
  }
  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(search, length) {
      if (length === undefined || length > this.length) length = this.length;
      return this.substring(length - search.length, length) === search;
    };
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(targetLength, padString) {
      targetLength = targetLength >> 0;
      padString = String(padString || ' ');
      if (this.length >= targetLength) return String(this);
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) padString += padString.repeat(targetLength / padString.length);
      return padString.slice(0, targetLength) + String(this);
    };
  }
  if (!String.prototype.padEnd) {
    String.prototype.padEnd = function(targetLength, padString) {
      targetLength = targetLength >> 0;
      padString = String(padString || ' ');
      if (this.length >= targetLength) return String(this);
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) padString += padString.repeat(targetLength / padString.length);
      return String(this) + padString.slice(0, targetLength);
    };
  }
  if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
      if (count < 0) throw new RangeError('repeat count must be non-negative');
      if (count === Infinity) throw new RangeError('repeat count must be less than infinity');
      count = Math.floor(count);
      if (this.length === 0 || count === 0) return '';
      var result = '';
      for (var i = 0; i < count; i++) result += this;
      return result;
    };
  }
  if (!String.prototype.trimStart) {
    String.prototype.trimStart = function() { return this.replace(/^[\s\uFEFF\xA0]+/, ''); };
  }
  if (!String.prototype.trimEnd) {
    String.prototype.trimEnd = function() { return this.replace(/[\s\uFEFF\xA0]+$/, ''); };
  }
  
  // === Number polyfills ===
  if (!Number.isNaN) {
    Number.isNaN = function(value) { return typeof value === 'number' && value !== value; };
  }
  if (!Number.isFinite) {
    Number.isFinite = function(value) { return typeof value === 'number' && isFinite(value); };
  }
  if (!Number.isInteger) {
    Number.isInteger = function(value) { return typeof value === 'number' && isFinite(value) && Math.floor(value) === value; };
  }
})();
// === END COMPREHENSIVE POLYFILLS ===


"use strict";
var LNReaderPlugin = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

  // ../node_modules/esbuild-plugin-polyfill-node/polyfills/__dirname.js
  var init_dirname = __esm({
    "../node_modules/esbuild-plugin-polyfill-node/polyfills/__dirname.js"() {
    }
  });

  // ../node_modules/@jspm/core/nodelibs/browser/process.js
  function unimplemented(name) {
    throw new Error("Node.js process " + name + " is not supported by JSPM core outside of Node.js");
  }
  function cleanUpNextTick() {
    if (!draining || !currentQueue)
      return;
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length)
      drainQueue();
  }
  function drainQueue() {
    if (draining)
      return;
    var timeout = setTimeout(cleanUpNextTick, 0);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue)
          currentQueue[queueIndex].run();
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i2 = 1; i2 < arguments.length; i2++)
        args[i2 - 1] = arguments[i2];
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining)
      setTimeout(drainQueue, 0);
  }
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  function noop() {
  }
  function _linkedBinding(name) {
    unimplemented("_linkedBinding");
  }
  function dlopen(name) {
    unimplemented("dlopen");
  }
  function _getActiveRequests() {
    return [];
  }
  function _getActiveHandles() {
    return [];
  }
  function assert(condition, message) {
    if (!condition) throw new Error(message || "assertion error");
  }
  function hasUncaughtExceptionCaptureCallback() {
    return false;
  }
  function uptime() {
    return _performance.now() / 1e3;
  }
  function hrtime(previousTimestamp) {
    var baseNow = Math.floor((Date.now() - _performance.now()) * 1e-3);
    var clocktime = _performance.now() * 1e-3;
    var seconds = Math.floor(clocktime) + baseNow;
    var nanoseconds = Math.floor(clocktime % 1 * 1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds < 0) {
        seconds--;
        nanoseconds += nanoPerSec;
      }
    }
    return [seconds, nanoseconds];
  }
  function on() {
    return process2;
  }
  function listeners(name) {
    return [];
  }
  var queue, draining, currentQueue, queueIndex, title, arch, platform, env, argv, execArgv, version, versions, emitWarning, binding, umask, cwd, chdir, release, browser, _rawDebug, moduleLoadList, domain, _exiting, config, reallyExit, _kill, cpuUsage, resourceUsage, memoryUsage, kill, exit, openStdin, allowedNodeEnvironmentFlags, features, _fatalExceptions, setUncaughtExceptionCaptureCallback, _tickCallback, _debugProcess, _debugEnd, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, stdout, stderr, stdin, abort, pid, ppid, execPath, debugPort, argv0, _preload_modules, setSourceMapsEnabled, _performance, nanoPerSec, _maxListeners, _events, _eventsCount, addListener, once, off, removeListener, removeAllListeners, emit, prependListener, prependOnceListener, process2, nowOffset;
  var init_process = __esm({
    "../node_modules/@jspm/core/nodelibs/browser/process.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      __name(unimplemented, "unimplemented");
      queue = [];
      draining = false;
      queueIndex = -1;
      __name(cleanUpNextTick, "cleanUpNextTick");
      __name(drainQueue, "drainQueue");
      __name(nextTick, "nextTick");
      __name(Item, "Item");
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      title = "browser";
      arch = "x64";
      platform = "browser";
      env = {
        PATH: "/usr/bin",
        LANG: typeof navigator !== "undefined" ? navigator.language + ".UTF-8" : void 0,
        PWD: "/",
        HOME: "/home",
        TMP: "/tmp"
      };
      argv = ["/usr/bin/node"];
      execArgv = [];
      version = "v16.8.0";
      versions = {};
      emitWarning = /* @__PURE__ */ __name(function(message, type) {
        console.warn((type ? type + ": " : "") + message);
      }, "emitWarning");
      binding = /* @__PURE__ */ __name(function(name) {
        unimplemented("binding");
      }, "binding");
      umask = /* @__PURE__ */ __name(function(mask) {
        return 0;
      }, "umask");
      cwd = /* @__PURE__ */ __name(function() {
        return "/";
      }, "cwd");
      chdir = /* @__PURE__ */ __name(function(dir) {
      }, "chdir");
      release = {
        name: "node",
        sourceUrl: "",
        headersUrl: "",
        libUrl: ""
      };
      __name(noop, "noop");
      browser = true;
      _rawDebug = noop;
      moduleLoadList = [];
      __name(_linkedBinding, "_linkedBinding");
      domain = {};
      _exiting = false;
      config = {};
      __name(dlopen, "dlopen");
      __name(_getActiveRequests, "_getActiveRequests");
      __name(_getActiveHandles, "_getActiveHandles");
      reallyExit = noop;
      _kill = noop;
      cpuUsage = /* @__PURE__ */ __name(function() {
        return {};
      }, "cpuUsage");
      resourceUsage = cpuUsage;
      memoryUsage = cpuUsage;
      kill = noop;
      exit = noop;
      openStdin = noop;
      allowedNodeEnvironmentFlags = {};
      __name(assert, "assert");
      features = {
        inspector: false,
        debug: false,
        uv: false,
        ipv6: false,
        tls_alpn: false,
        tls_sni: false,
        tls_ocsp: false,
        tls: false,
        cached_builtins: true
      };
      _fatalExceptions = noop;
      setUncaughtExceptionCaptureCallback = noop;
      __name(hasUncaughtExceptionCaptureCallback, "hasUncaughtExceptionCaptureCallback");
      _tickCallback = noop;
      _debugProcess = noop;
      _debugEnd = noop;
      _startProfilerIdleNotifier = noop;
      _stopProfilerIdleNotifier = noop;
      stdout = void 0;
      stderr = void 0;
      stdin = void 0;
      abort = noop;
      pid = 2;
      ppid = 1;
      execPath = "/bin/usr/node";
      debugPort = 9229;
      argv0 = "node";
      _preload_modules = [];
      setSourceMapsEnabled = noop;
      _performance = {
        now: typeof performance !== "undefined" ? performance.now.bind(performance) : void 0,
        timing: typeof performance !== "undefined" ? performance.timing : void 0
      };
      if (_performance.now === void 0) {
        nowOffset = Date.now();
        if (_performance.timing && _performance.timing.navigationStart) {
          nowOffset = _performance.timing.navigationStart;
        }
        _performance.now = () => Date.now() - nowOffset;
      }
      __name(uptime, "uptime");
      nanoPerSec = 1e9;
      __name(hrtime, "hrtime");
      hrtime.bigint = function(time) {
        var diff = hrtime(time);
        if (typeof BigInt === "undefined") {
          return diff[0] * nanoPerSec + diff[1];
        }
        return BigInt(diff[0] * nanoPerSec) + BigInt(diff[1]);
      };
      _maxListeners = 10;
      _events = {};
      _eventsCount = 0;
      __name(on, "on");
      addListener = on;
      once = on;
      off = on;
      removeListener = on;
      removeAllListeners = on;
      emit = noop;
      prependListener = on;
      prependOnceListener = on;
      __name(listeners, "listeners");
      process2 = {
        version,
        versions,
        arch,
        platform,
        browser,
        release,
        _rawDebug,
        moduleLoadList,
        binding,
        _linkedBinding,
        _events,
        _eventsCount,
        _maxListeners,
        on,
        addListener,
        once,
        off,
        removeListener,
        removeAllListeners,
        emit,
        prependListener,
        prependOnceListener,
        listeners,
        domain,
        _exiting,
        config,
        dlopen,
        uptime,
        _getActiveRequests,
        _getActiveHandles,
        reallyExit,
        _kill,
        cpuUsage,
        resourceUsage,
        memoryUsage,
        kill,
        exit,
        openStdin,
        allowedNodeEnvironmentFlags,
        assert,
        features,
        _fatalExceptions,
        setUncaughtExceptionCaptureCallback,
        hasUncaughtExceptionCaptureCallback,
        emitWarning,
        nextTick,
        _tickCallback,
        _debugProcess,
        _debugEnd,
        _startProfilerIdleNotifier,
        _stopProfilerIdleNotifier,
        stdout,
        stdin,
        stderr,
        abort,
        umask,
        chdir,
        cwd,
        env,
        title,
        argv,
        execArgv,
        pid,
        ppid,
        execPath,
        debugPort,
        hrtime,
        argv0,
        _preload_modules,
        setSourceMapsEnabled
      };
    }
  });

  // ../node_modules/esbuild-plugin-polyfill-node/polyfills/process.js
  var init_process2 = __esm({
    "../node_modules/esbuild-plugin-polyfill-node/polyfills/process.js"() {
      init_process();
    }
  });

  // ../node_modules/@jspm/core/nodelibs/browser/chunk-DtuTasat.js
  function dew$2() {
    if (_dewExec$2) return exports$2;
    _dewExec$2 = true;
    exports$2.byteLength = byteLength;
    exports$2.toByteArray = toByteArray;
    exports$2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i2 = 0, len = code.length; i2 < len; ++i2) {
      lookup[i2] = code[i2];
      revLookup[code.charCodeAt(i2)] = i2;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    __name(getLens, "getLens");
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    __name(byteLength, "byteLength");
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    __name(_byteLength, "_byteLength");
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i3;
      for (i3 = 0; i3 < len2; i3 += 4) {
        tmp = revLookup[b64.charCodeAt(i3)] << 18 | revLookup[b64.charCodeAt(i3 + 1)] << 12 | revLookup[b64.charCodeAt(i3 + 2)] << 6 | revLookup[b64.charCodeAt(i3 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i3)] << 2 | revLookup[b64.charCodeAt(i3 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i3)] << 10 | revLookup[b64.charCodeAt(i3 + 1)] << 4 | revLookup[b64.charCodeAt(i3 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    __name(toByteArray, "toByteArray");
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    __name(tripletToBase64, "tripletToBase64");
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i3 = start; i3 < end; i3 += 3) {
        tmp = (uint8[i3] << 16 & 16711680) + (uint8[i3 + 1] << 8 & 65280) + (uint8[i3 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    __name(encodeChunk, "encodeChunk");
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i3 = 0, len22 = len2 - extraBytes; i3 < len22; i3 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i3, i3 + maxChunkLength > len22 ? len22 : i3 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
    __name(fromByteArray, "fromByteArray");
    return exports$2;
  }
  function dew$1() {
    if (_dewExec$1) return exports$1;
    _dewExec$1 = true;
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    exports$1.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e2, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i2 = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i2];
      i2 += d;
      e2 = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e2 = e2 * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
      }
      m = e2 & (1 << -nBits) - 1;
      e2 >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
      }
      if (e2 === 0) {
        e2 = 1 - eBias;
      } else if (e2 === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e2 = e2 - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e2 - mLen);
    };
    exports$1.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e2, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i2 = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e2 = eMax;
      } else {
        e2 = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e2)) < 1) {
          e2--;
          c *= 2;
        }
        if (e2 + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e2++;
          c /= 2;
        }
        if (e2 + eBias >= eMax) {
          m = 0;
          e2 = eMax;
        } else if (e2 + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e2 = e2 + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e2 = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i2] = m & 255, i2 += d, m /= 256, mLen -= 8) {
      }
      e2 = e2 << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i2] = e2 & 255, i2 += d, e2 /= 256, eLen -= 8) {
      }
      buffer[offset + i2 - d] |= s * 128;
    };
    return exports$1;
  }
  function dew() {
    if (_dewExec) return exports2;
    _dewExec = true;
    const base64 = dew$2();
    const ieee754 = dew$1();
    const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports2.Buffer = Buffer2;
    exports2.SlowBuffer = SlowBuffer;
    exports2.INSPECT_MAX_BYTES = 50;
    const K_MAX_LENGTH = 2147483647;
    exports2.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = {
          foo: /* @__PURE__ */ __name(function() {
            return 42;
          }, "foo")
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e2) {
        return false;
      }
    }
    __name(typedArraySupport, "typedArraySupport");
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      }, "get")
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      }, "get")
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    __name(createBuffer, "createBuffer");
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    __name(Buffer2, "Buffer");
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b2 = fromObject(value);
      if (b2) return b2;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    __name(from, "from");
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    __name(assertSize, "assertSize");
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    __name(alloc, "alloc");
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    __name(allocUnsafe, "allocUnsafe");
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    __name(fromString, "fromString");
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i2 = 0; i2 < length; i2 += 1) {
        buf[i2] = array[i2] & 255;
      }
      return buf;
    }
    __name(fromArrayLike, "fromArrayLike");
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    __name(fromArrayView, "fromArrayView");
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    __name(fromArrayBuffer, "fromArrayBuffer");
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    __name(fromObject, "fromObject");
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    __name(checked, "checked");
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    __name(SlowBuffer, "SlowBuffer");
    Buffer2.isBuffer = /* @__PURE__ */ __name(function isBuffer(b2) {
      return b2 != null && b2._isBuffer === true && b2 !== Buffer2.prototype;
    }, "isBuffer");
    Buffer2.compare = /* @__PURE__ */ __name(function compare(a2, b2) {
      if (isInstance(a2, Uint8Array)) a2 = Buffer2.from(a2, a2.offset, a2.byteLength);
      if (isInstance(b2, Uint8Array)) b2 = Buffer2.from(b2, b2.offset, b2.byteLength);
      if (!Buffer2.isBuffer(a2) || !Buffer2.isBuffer(b2)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a2 === b2) return 0;
      let x = a2.length;
      let y = b2.length;
      for (let i2 = 0, len = Math.min(x, y); i2 < len; ++i2) {
        if (a2[i2] !== b2[i2]) {
          x = a2[i2];
          y = b2[i2];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    }, "compare");
    Buffer2.isEncoding = /* @__PURE__ */ __name(function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    }, "isEncoding");
    Buffer2.concat = /* @__PURE__ */ __name(function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i2;
      if (length === void 0) {
        length = 0;
        for (i2 = 0; i2 < list.length; ++i2) {
          length += list[i2].length;
        }
      }
      const buffer = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        let buf = list[i2];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(buffer, buf, pos);
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    }, "concat");
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    __name(byteLength, "byteLength");
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    __name(slowToString, "slowToString");
    Buffer2.prototype._isBuffer = true;
    function swap(b2, n2, m) {
      const i2 = b2[n2];
      b2[n2] = b2[m];
      b2[m] = i2;
    }
    __name(swap, "swap");
    Buffer2.prototype.swap16 = /* @__PURE__ */ __name(function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i2 = 0; i2 < len; i2 += 2) {
        swap(this, i2, i2 + 1);
      }
      return this;
    }, "swap16");
    Buffer2.prototype.swap32 = /* @__PURE__ */ __name(function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i2 = 0; i2 < len; i2 += 4) {
        swap(this, i2, i2 + 3);
        swap(this, i2 + 1, i2 + 2);
      }
      return this;
    }, "swap32");
    Buffer2.prototype.swap64 = /* @__PURE__ */ __name(function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i2 = 0; i2 < len; i2 += 8) {
        swap(this, i2, i2 + 7);
        swap(this, i2 + 1, i2 + 6);
        swap(this, i2 + 2, i2 + 5);
        swap(this, i2 + 3, i2 + 4);
      }
      return this;
    }, "swap64");
    Buffer2.prototype.toString = /* @__PURE__ */ __name(function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    }, "toString");
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = /* @__PURE__ */ __name(function equals(b2) {
      if (!Buffer2.isBuffer(b2)) throw new TypeError("Argument must be a Buffer");
      if (this === b2) return true;
      return Buffer2.compare(this, b2) === 0;
    }, "equals");
    Buffer2.prototype.inspect = /* @__PURE__ */ __name(function inspect() {
      let str = "";
      const max = exports2.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    }, "inspect");
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = /* @__PURE__ */ __name(function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i2 = 0; i2 < len; ++i2) {
        if (thisCopy[i2] !== targetCopy[i2]) {
          x = thisCopy[i2];
          y = targetCopy[i2];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    }, "compare");
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    __name(bidirectionalIndexOf, "bidirectionalIndexOf");
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i3) {
        if (indexSize === 1) {
          return buf[i3];
        } else {
          return buf.readUInt16BE(i3 * indexSize);
        }
      }
      __name(read, "read");
      let i2;
      if (dir) {
        let foundIndex = -1;
        for (i2 = byteOffset; i2 < arrLength; i2++) {
          if (read(arr, i2) === read(val, foundIndex === -1 ? 0 : i2 - foundIndex)) {
            if (foundIndex === -1) foundIndex = i2;
            if (i2 - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i2 -= i2 - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i2 = byteOffset; i2 >= 0; i2--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i2 + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i2;
        }
      }
      return -1;
    }
    __name(arrayIndexOf, "arrayIndexOf");
    Buffer2.prototype.includes = /* @__PURE__ */ __name(function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    }, "includes");
    Buffer2.prototype.indexOf = /* @__PURE__ */ __name(function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    }, "indexOf");
    Buffer2.prototype.lastIndexOf = /* @__PURE__ */ __name(function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    }, "lastIndexOf");
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        const parsed = parseInt(string.substr(i2 * 2, 2), 16);
        if (numberIsNaN(parsed)) return i2;
        buf[offset + i2] = parsed;
      }
      return i2;
    }
    __name(hexWrite, "hexWrite");
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    __name(utf8Write, "utf8Write");
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    __name(asciiWrite, "asciiWrite");
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    __name(base64Write, "base64Write");
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    __name(ucs2Write, "ucs2Write");
    Buffer2.prototype.write = /* @__PURE__ */ __name(function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }, "write");
    Buffer2.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    }, "toJSON");
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    __name(base64Slice, "base64Slice");
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i2 = start;
      while (i2 < end) {
        const firstByte = buf[i2];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i2 + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i2 + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i2 + 1];
              thirdByte = buf[i2 + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i2 + 1];
              thirdByte = buf[i2 + 2];
              fourthByte = buf[i2 + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i2 += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    __name(utf8Slice, "utf8Slice");
    const MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i2 = 0;
      while (i2 < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i2, i2 += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    __name(decodeCodePointsArray, "decodeCodePointsArray");
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2] & 127);
      }
      return ret;
    }
    __name(asciiSlice, "asciiSlice");
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf[i2]);
      }
      return ret;
    }
    __name(latin1Slice, "latin1Slice");
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i2 = start; i2 < end; ++i2) {
        out += hexSliceLookupTable[buf[i2]];
      }
      return out;
    }
    __name(hexSlice, "hexSlice");
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i2 = 0; i2 < bytes.length - 1; i2 += 2) {
        res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256);
      }
      return res;
    }
    __name(utf16leSlice, "utf16leSlice");
    Buffer2.prototype.slice = /* @__PURE__ */ __name(function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    }, "slice");
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    __name(checkOffset, "checkOffset");
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = /* @__PURE__ */ __name(function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength2 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      return val;
    }, "readUIntLE");
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = /* @__PURE__ */ __name(function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    }, "readUIntBE");
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = /* @__PURE__ */ __name(function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    }, "readUInt8");
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = /* @__PURE__ */ __name(function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    }, "readUInt16LE");
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = /* @__PURE__ */ __name(function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    }, "readUInt16BE");
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = /* @__PURE__ */ __name(function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    }, "readUInt32LE");
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = /* @__PURE__ */ __name(function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    }, "readUInt32BE");
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    }, "readBigUInt64LE"));
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    }, "readBigUInt64BE"));
    Buffer2.prototype.readIntLE = /* @__PURE__ */ __name(function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength2 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntLE");
    Buffer2.prototype.readIntBE = /* @__PURE__ */ __name(function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i2 = byteLength2;
      let mul = 1;
      let val = this[offset + --i2];
      while (i2 > 0 && (mul *= 256)) {
        val += this[offset + --i2] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntBE");
    Buffer2.prototype.readInt8 = /* @__PURE__ */ __name(function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    }, "readInt8");
    Buffer2.prototype.readInt16LE = /* @__PURE__ */ __name(function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16LE");
    Buffer2.prototype.readInt16BE = /* @__PURE__ */ __name(function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16BE");
    Buffer2.prototype.readInt32LE = /* @__PURE__ */ __name(function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    }, "readInt32LE");
    Buffer2.prototype.readInt32BE = /* @__PURE__ */ __name(function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    }, "readInt32BE");
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    }, "readBigInt64LE"));
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    }, "readBigInt64BE"));
    Buffer2.prototype.readFloatLE = /* @__PURE__ */ __name(function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    }, "readFloatLE");
    Buffer2.prototype.readFloatBE = /* @__PURE__ */ __name(function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    }, "readFloatBE");
    Buffer2.prototype.readDoubleLE = /* @__PURE__ */ __name(function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    }, "readDoubleLE");
    Buffer2.prototype.readDoubleBE = /* @__PURE__ */ __name(function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    }, "readDoubleBE");
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    __name(checkInt, "checkInt");
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = /* @__PURE__ */ __name(function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i2 = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength2 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntLE");
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = /* @__PURE__ */ __name(function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i2 = byteLength2 - 1;
      let mul = 1;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntBE");
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = /* @__PURE__ */ __name(function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    }, "writeUInt8");
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = /* @__PURE__ */ __name(function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    }, "writeUInt16LE");
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = /* @__PURE__ */ __name(function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    }, "writeUInt16BE");
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = /* @__PURE__ */ __name(function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    }, "writeUInt32LE");
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = /* @__PURE__ */ __name(function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    }, "writeUInt32BE");
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    __name(wrtBigUInt64LE, "wrtBigUInt64LE");
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    __name(wrtBigUInt64BE, "wrtBigUInt64BE");
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    }, "writeBigUInt64LE"));
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    }, "writeBigUInt64BE"));
    Buffer2.prototype.writeIntLE = /* @__PURE__ */ __name(function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i2 = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntLE");
    Buffer2.prototype.writeIntBE = /* @__PURE__ */ __name(function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i2 = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntBE");
    Buffer2.prototype.writeInt8 = /* @__PURE__ */ __name(function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    }, "writeInt8");
    Buffer2.prototype.writeInt16LE = /* @__PURE__ */ __name(function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    }, "writeInt16LE");
    Buffer2.prototype.writeInt16BE = /* @__PURE__ */ __name(function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    }, "writeInt16BE");
    Buffer2.prototype.writeInt32LE = /* @__PURE__ */ __name(function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    }, "writeInt32LE");
    Buffer2.prototype.writeInt32BE = /* @__PURE__ */ __name(function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    }, "writeInt32BE");
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64LE"));
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64BE"));
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    __name(checkIEEE754, "checkIEEE754");
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    __name(writeFloat, "writeFloat");
    Buffer2.prototype.writeFloatLE = /* @__PURE__ */ __name(function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    }, "writeFloatLE");
    Buffer2.prototype.writeFloatBE = /* @__PURE__ */ __name(function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    }, "writeFloatBE");
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    __name(writeDouble, "writeDouble");
    Buffer2.prototype.writeDoubleLE = /* @__PURE__ */ __name(function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    }, "writeDoubleLE");
    Buffer2.prototype.writeDoubleBE = /* @__PURE__ */ __name(function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    }, "writeDoubleBE");
    Buffer2.prototype.copy = /* @__PURE__ */ __name(function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len;
    }, "copy");
    Buffer2.prototype.fill = /* @__PURE__ */ __name(function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i2;
      if (typeof val === "number") {
        for (i2 = start; i2 < end; ++i2) {
          this[i2] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i2 = 0; i2 < end - start; ++i2) {
          this[i2 + start] = bytes[i2 % len];
        }
      }
      return this;
    }, "fill");
    const errors = {};
    function E(sym, getMessage, Base) {
      var _a;
      errors[sym] = (_a = class extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      }, __name(_a, "NodeError"), _a);
    }
    __name(E, "E");
    E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    }, RangeError);
    E("ERR_INVALID_ARG_TYPE", function(name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    }, TypeError);
    E("ERR_OUT_OF_RANGE", function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    }, RangeError);
    function addNumericalSeparator(val) {
      let res = "";
      let i2 = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i2 >= start + 4; i2 -= 3) {
        res = `_${val.slice(i2 - 3, i2)}${res}`;
      }
      return `${val.slice(0, i2)}${res}`;
    }
    __name(addNumericalSeparator, "addNumericalSeparator");
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    __name(checkBounds, "checkBounds");
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n2 = typeof min === "bigint" ? "n" : "";
        let range;
        {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n2} and < 2${n2} ** ${(byteLength2 + 1) * 8}${n2}`;
          } else {
            range = `>= -(2${n2} ** ${(byteLength2 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n2}`;
          }
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    __name(checkIntBI, "checkIntBI");
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    __name(validateNumber, "validateNumber");
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE("offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE("offset", `>= ${0} and <= ${length}`, value);
    }
    __name(boundsError, "boundsError");
    const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    __name(base64clean, "base64clean");
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i2 = 0; i2 < length; ++i2) {
        codePoint = string.charCodeAt(i2);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i2 + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    __name(utf8ToBytes, "utf8ToBytes");
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i2 = 0; i2 < str.length; ++i2) {
        byteArray.push(str.charCodeAt(i2) & 255);
      }
      return byteArray;
    }
    __name(asciiToBytes, "asciiToBytes");
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i2 = 0; i2 < str.length; ++i2) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i2);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    __name(utf16leToBytes, "utf16leToBytes");
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    __name(base64ToBytes, "base64ToBytes");
    function blitBuffer(src, dst, offset, length) {
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        if (i2 + offset >= dst.length || i2 >= src.length) break;
        dst[i2 + offset] = src[i2];
      }
      return i2;
    }
    __name(blitBuffer, "blitBuffer");
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    __name(isInstance, "isInstance");
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    __name(numberIsNaN, "numberIsNaN");
    const hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i2 = 0; i2 < 16; ++i2) {
        const i16 = i2 * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i2] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    __name(defineBigIntMethod, "defineBigIntMethod");
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
    __name(BufferBigIntNotDefined, "BufferBigIntNotDefined");
    return exports2;
  }
  var exports$2, _dewExec$2, exports$1, _dewExec$1, exports2, _dewExec;
  var init_chunk_DtuTasat = __esm({
    "../node_modules/@jspm/core/nodelibs/browser/chunk-DtuTasat.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      exports$2 = {}, _dewExec$2 = false;
      __name(dew$2, "dew$2");
      exports$1 = {}, _dewExec$1 = false;
      __name(dew$1, "dew$1");
      exports2 = {}, _dewExec = false;
      __name(dew, "dew");
    }
  });

  // ../node_modules/@jspm/core/nodelibs/browser/buffer.js
  var exports3, Buffer, INSPECT_MAX_BYTES, kMaxLength;
  var init_buffer = __esm({
    "../node_modules/@jspm/core/nodelibs/browser/buffer.js"() {
      init_dirname();
      init_buffer2();
      init_process2();
      init_chunk_DtuTasat();
      exports3 = dew();
      exports3["Buffer"];
      exports3["SlowBuffer"];
      exports3["INSPECT_MAX_BYTES"];
      exports3["kMaxLength"];
      Buffer = exports3.Buffer;
      INSPECT_MAX_BYTES = exports3.INSPECT_MAX_BYTES;
      kMaxLength = exports3.kMaxLength;
    }
  });

  // ../node_modules/esbuild-plugin-polyfill-node/polyfills/buffer.js
  var init_buffer2 = __esm({
    "../node_modules/esbuild-plugin-polyfill-node/polyfills/buffer.js"() {
      init_buffer();
    }
  });

  // src/types/filters.ts
  var FilterTypes;
  var init_filters = __esm({
    "src/types/filters.ts"() {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      FilterTypes = /* @__PURE__ */ ((FilterTypes2) => {
        FilterTypes2["TextInput"] = "Text";
        FilterTypes2["Picker"] = "Picker";
        FilterTypes2["CheckboxGroup"] = "Checkbox";
        FilterTypes2["Switch"] = "Switch";
        FilterTypes2["ExcludableCheckboxGroup"] = "XCheckbox";
        return FilterTypes2;
      })(FilterTypes || {});
    }
  });

  // src/libs/filterInputs.ts
  var filterInputs_exports = {};
  __export(filterInputs_exports, {
    FilterTypes: () => FilterTypes
  });
  var init_filterInputs = __esm({
    "src/libs/filterInputs.ts"() {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      init_filters();
    }
  });

  // node_modules/@protobufjs/aspromise/index.js
  var require_aspromise = __commonJS({
    "node_modules/@protobufjs/aspromise/index.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = asPromise;
      function asPromise(fn, ctx) {
        var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
        while (index < arguments.length)
          params[offset++] = arguments[index++];
        return new Promise(/* @__PURE__ */ __name(function executor(resolve, reject) {
          params[offset] = /* @__PURE__ */ __name(function callback(err) {
            if (pending) {
              pending = false;
              if (err)
                reject(err);
              else {
                var params2 = new Array(arguments.length - 1), offset2 = 0;
                while (offset2 < params2.length)
                  params2[offset2++] = arguments[offset2];
                resolve.apply(null, params2);
              }
            }
          }, "callback");
          try {
            fn.apply(ctx || null, params);
          } catch (err) {
            if (pending) {
              pending = false;
              reject(err);
            }
          }
        }, "executor"));
      }
      __name(asPromise, "asPromise");
    }
  });

  // node_modules/@protobufjs/base64/index.js
  var require_base64 = __commonJS({
    "node_modules/@protobufjs/base64/index.js"(exports4) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var base64 = exports4;
      base64.length = /* @__PURE__ */ __name(function length(string) {
        var p = string.length;
        if (!p)
          return 0;
        var n2 = 0;
        while (--p % 4 > 1 && string.charAt(p) === "=")
          ++n2;
        return Math.ceil(string.length * 3) / 4 - n2;
      }, "length");
      var b64 = new Array(64);
      var s64 = new Array(123);
      for (i2 = 0; i2 < 64; )
        s64[b64[i2] = i2 < 26 ? i2 + 65 : i2 < 52 ? i2 + 71 : i2 < 62 ? i2 - 4 : i2 - 59 | 43] = i2++;
      base64.encode = /* @__PURE__ */ __name(function encode(buffer, start, end) {
        var parts = null, chunk = [];
        var i3 = 0, j = 0, t2;
        while (start < end) {
          var b2 = buffer[start++];
          switch (j) {
            case 0:
              chunk[i3++] = b64[b2 >> 2];
              t2 = (b2 & 3) << 4;
              j = 1;
              break;
            case 1:
              chunk[i3++] = b64[t2 | b2 >> 4];
              t2 = (b2 & 15) << 2;
              j = 2;
              break;
            case 2:
              chunk[i3++] = b64[t2 | b2 >> 6];
              chunk[i3++] = b64[b2 & 63];
              j = 0;
              break;
          }
          if (i3 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i3 = 0;
          }
        }
        if (j) {
          chunk[i3++] = b64[t2];
          chunk[i3++] = 61;
          if (j === 1)
            chunk[i3++] = 61;
        }
        if (parts) {
          if (i3)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i3)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i3));
      }, "encode");
      var invalidEncoding = "invalid encoding";
      base64.decode = /* @__PURE__ */ __name(function decode(string, buffer, offset) {
        var start = offset;
        var j = 0, t2;
        for (var i3 = 0; i3 < string.length; ) {
          var c = string.charCodeAt(i3++);
          if (c === 61 && j > 1)
            break;
          if ((c = s64[c]) === void 0)
            throw Error(invalidEncoding);
          switch (j) {
            case 0:
              t2 = c;
              j = 1;
              break;
            case 1:
              buffer[offset++] = t2 << 2 | (c & 48) >> 4;
              t2 = c;
              j = 2;
              break;
            case 2:
              buffer[offset++] = (t2 & 15) << 4 | (c & 60) >> 2;
              t2 = c;
              j = 3;
              break;
            case 3:
              buffer[offset++] = (t2 & 3) << 6 | c;
              j = 0;
              break;
          }
        }
        if (j === 1)
          throw Error(invalidEncoding);
        return offset - start;
      }, "decode");
      base64.test = /* @__PURE__ */ __name(function test(string) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
      }, "test");
      var i2;
    }
  });

  // node_modules/@protobufjs/eventemitter/index.js
  var require_eventemitter = __commonJS({
    "node_modules/@protobufjs/eventemitter/index.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = EventEmitter;
      function EventEmitter() {
        this._listeners = {};
      }
      __name(EventEmitter, "EventEmitter");
      EventEmitter.prototype.on = /* @__PURE__ */ __name(function on2(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn,
          ctx: ctx || this
        });
        return this;
      }, "on");
      EventEmitter.prototype.off = /* @__PURE__ */ __name(function off2(evt, fn) {
        if (evt === void 0)
          this._listeners = {};
        else {
          if (fn === void 0)
            this._listeners[evt] = [];
          else {
            var listeners2 = this._listeners[evt];
            for (var i2 = 0; i2 < listeners2.length; )
              if (listeners2[i2].fn === fn)
                listeners2.splice(i2, 1);
              else
                ++i2;
          }
        }
        return this;
      }, "off");
      EventEmitter.prototype.emit = /* @__PURE__ */ __name(function emit2(evt) {
        var listeners2 = this._listeners[evt];
        if (listeners2) {
          var args = [], i2 = 1;
          for (; i2 < arguments.length; )
            args.push(arguments[i2++]);
          for (i2 = 0; i2 < listeners2.length; )
            listeners2[i2].fn.apply(listeners2[i2++].ctx, args);
        }
        return this;
      }, "emit");
    }
  });

  // node_modules/@protobufjs/float/index.js
  var require_float = __commonJS({
    "node_modules/@protobufjs/float/index.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = factory(factory);
      function factory(exports5) {
        if (typeof Float32Array !== "undefined") (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          __name(writeFloat_f32_cpy, "writeFloat_f32_cpy");
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          __name(writeFloat_f32_rev, "writeFloat_f32_rev");
          exports5.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports5.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          __name(readFloat_f32_cpy, "readFloat_f32_cpy");
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          __name(readFloat_f32_rev, "readFloat_f32_rev");
          exports5.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports5.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
        else (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          __name(writeFloat_ieee754, "writeFloat_ieee754");
          exports5.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports5.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          __name(readFloat_ieee754, "readFloat_ieee754");
          exports5.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports5.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
        if (typeof Float64Array !== "undefined") (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          __name(writeDouble_f64_cpy, "writeDouble_f64_cpy");
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          __name(writeDouble_f64_rev, "writeDouble_f64_rev");
          exports5.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports5.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          __name(readDouble_f64_cpy, "readDouble_f64_cpy");
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          __name(readDouble_f64_rev, "readDouble_f64_rev");
          exports5.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports5.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
        else (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          __name(writeDouble_ieee754, "writeDouble_ieee754");
          exports5.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports5.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          __name(readDouble_ieee754, "readDouble_ieee754");
          exports5.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports5.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
        return exports5;
      }
      __name(factory, "factory");
      function writeUintLE(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      __name(writeUintLE, "writeUintLE");
      function writeUintBE(val, buf, pos) {
        buf[pos] = val >>> 24;
        buf[pos + 1] = val >>> 16 & 255;
        buf[pos + 2] = val >>> 8 & 255;
        buf[pos + 3] = val & 255;
      }
      __name(writeUintBE, "writeUintBE");
      function readUintLE(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
      }
      __name(readUintLE, "readUintLE");
      function readUintBE(buf, pos) {
        return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
      }
      __name(readUintBE, "readUintBE");
    }
  });

  // node_modules/@protobufjs/inquire/index.js
  var require_inquire = __commonJS({
    "node_modules/@protobufjs/inquire/index.js"(exports, module) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module.exports = inquire;
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length))
            return mod;
        } catch (e2) {
        }
        return null;
      }
      __name(inquire, "inquire");
    }
  });

  // node_modules/@protobufjs/utf8/index.js
  var require_utf8 = __commonJS({
    "node_modules/@protobufjs/utf8/index.js"(exports4) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var utf8 = exports4;
      utf8.length = /* @__PURE__ */ __name(function utf8_length(string) {
        var len = 0, c = 0;
        for (var i2 = 0; i2 < string.length; ++i2) {
          c = string.charCodeAt(i2);
          if (c < 128)
            len += 1;
          else if (c < 2048)
            len += 2;
          else if ((c & 64512) === 55296 && (string.charCodeAt(i2 + 1) & 64512) === 56320) {
            ++i2;
            len += 4;
          } else
            len += 3;
        }
        return len;
      }, "utf8_length");
      utf8.read = /* @__PURE__ */ __name(function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1)
          return "";
        var parts = null, chunk = [], i2 = 0, t2;
        while (start < end) {
          t2 = buffer[start++];
          if (t2 < 128)
            chunk[i2++] = t2;
          else if (t2 > 191 && t2 < 224)
            chunk[i2++] = (t2 & 31) << 6 | buffer[start++] & 63;
          else if (t2 > 239 && t2 < 365) {
            t2 = ((t2 & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
            chunk[i2++] = 55296 + (t2 >> 10);
            chunk[i2++] = 56320 + (t2 & 1023);
          } else
            chunk[i2++] = (t2 & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
          if (i2 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i2 = 0;
          }
        }
        if (parts) {
          if (i2)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i2));
      }, "utf8_read");
      utf8.write = /* @__PURE__ */ __name(function utf8_write(string, buffer, offset) {
        var start = offset, c1, c2;
        for (var i2 = 0; i2 < string.length; ++i2) {
          c1 = string.charCodeAt(i2);
          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i2 + 1)) & 64512) === 56320) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
            ++i2;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          }
        }
        return offset - start;
      }, "utf8_write");
    }
  });

  // node_modules/@protobufjs/pool/index.js
  var require_pool = __commonJS({
    "node_modules/@protobufjs/pool/index.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = pool;
      function pool(alloc, slice, size) {
        var SIZE = size || 8192;
        var MAX = SIZE >>> 1;
        var slab = null;
        var offset = SIZE;
        return /* @__PURE__ */ __name(function pool_alloc(size2) {
          if (size2 < 1 || size2 > MAX)
            return alloc(size2);
          if (offset + size2 > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
          }
          var buf = slice.call(slab, offset, offset += size2);
          if (offset & 7)
            offset = (offset | 7) + 1;
          return buf;
        }, "pool_alloc");
      }
      __name(pool, "pool");
    }
  });

  // node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS({
    "node_modules/protobufjs/src/util/longbits.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = LongBits;
      var util = require_minimal();
      function LongBits(lo, hi) {
        this.lo = lo >>> 0;
        this.hi = hi >>> 0;
      }
      __name(LongBits, "LongBits");
      var zero = LongBits.zero = new LongBits(0, 0);
      zero.toNumber = function() {
        return 0;
      };
      zero.zzEncode = zero.zzDecode = function() {
        return this;
      };
      zero.length = function() {
        return 1;
      };
      var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
      LongBits.fromNumber = /* @__PURE__ */ __name(function fromNumber(value) {
        if (value === 0)
          return zero;
        var sign = value < 0;
        if (sign)
          value = -value;
        var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;
          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
              hi = 0;
          }
        }
        return new LongBits(lo, hi);
      }, "fromNumber");
      LongBits.from = /* @__PURE__ */ __name(function from(value) {
        if (typeof value === "number")
          return LongBits.fromNumber(value);
        if (util.isString(value)) {
          if (util.Long)
            value = util.Long.fromString(value);
          else
            return LongBits.fromNumber(parseInt(value, 10));
        }
        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
      }, "from");
      LongBits.prototype.toNumber = /* @__PURE__ */ __name(function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
          if (!lo)
            hi = hi + 1 >>> 0;
          return -(lo + hi * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
      }, "toNumber");
      LongBits.prototype.toLong = /* @__PURE__ */ __name(function toLong(unsigned) {
        return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
      }, "toLong");
      var charCodeAt = String.prototype.charCodeAt;
      LongBits.fromHash = /* @__PURE__ */ __name(function fromHash(hash) {
        if (hash === zeroHash)
          return zero;
        return new LongBits(
          (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
          (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
        );
      }, "fromHash");
      LongBits.prototype.toHash = /* @__PURE__ */ __name(function toHash() {
        return String.fromCharCode(
          this.lo & 255,
          this.lo >>> 8 & 255,
          this.lo >>> 16 & 255,
          this.lo >>> 24,
          this.hi & 255,
          this.hi >>> 8 & 255,
          this.hi >>> 16 & 255,
          this.hi >>> 24
        );
      }, "toHash");
      LongBits.prototype.zzEncode = /* @__PURE__ */ __name(function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo = (this.lo << 1 ^ mask) >>> 0;
        return this;
      }, "zzEncode");
      LongBits.prototype.zzDecode = /* @__PURE__ */ __name(function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi = (this.hi >>> 1 ^ mask) >>> 0;
        return this;
      }, "zzDecode");
      LongBits.prototype.length = /* @__PURE__ */ __name(function length() {
        var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
        return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
      }, "length");
    }
  });

  // node_modules/protobufjs/src/util/minimal.js
  var require_minimal = __commonJS({
    "node_modules/protobufjs/src/util/minimal.js"(exports4) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var util = exports4;
      util.asPromise = require_aspromise();
      util.base64 = require_base64();
      util.EventEmitter = require_eventemitter();
      util.float = require_float();
      util.inquire = require_inquire();
      util.utf8 = require_utf8();
      util.pool = require_pool();
      util.LongBits = require_longbits();
      util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
      util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports4;
      util.emptyArray = Object.freeze ? Object.freeze([]) : (
        /* istanbul ignore next */
        []
      );
      util.emptyObject = Object.freeze ? Object.freeze({}) : (
        /* istanbul ignore next */
        {}
      );
      util.isInteger = Number.isInteger || /* istanbul ignore next */
      /* @__PURE__ */ __name(function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      }, "isInteger");
      util.isString = /* @__PURE__ */ __name(function isString(value) {
        return typeof value === "string" || value instanceof String;
      }, "isString");
      util.isObject = /* @__PURE__ */ __name(function isObject(value) {
        return value && typeof value === "object";
      }, "isObject");
      util.isset = /**
       * Checks if a property on a message is considered to be present.
       * @param {Object} obj Plain object or message instance
       * @param {string} prop Property name
       * @returns {boolean} `true` if considered to be present, otherwise `false`
       */
      util.isSet = /* @__PURE__ */ __name(function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop))
          return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      }, "isSet");
      util.Buffer = function() {
        try {
          var Buffer2 = util.inquire("buffer").Buffer;
          return Buffer2.prototype.utf8Write ? Buffer2 : (
            /* istanbul ignore next */
            null
          );
        } catch (e2) {
          return null;
        }
      }();
      util._Buffer_from = null;
      util._Buffer_allocUnsafe = null;
      util.newBuffer = /* @__PURE__ */ __name(function newBuffer(sizeOrArray) {
        return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
      }, "newBuffer");
      util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      util.Long = /* istanbul ignore next */
      util.global.dcodeIO && /* istanbul ignore next */
      util.global.dcodeIO.Long || /* istanbul ignore next */
      util.global.Long || util.inquire("long");
      util.key2Re = /^true|false|0|1$/;
      util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      util.longToHash = /* @__PURE__ */ __name(function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
      }, "longToHash");
      util.longFromHash = /* @__PURE__ */ __name(function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long)
          return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
      }, "longFromHash");
      function merge(dst, src, ifNotSet) {
        for (var keys = Object.keys(src), i2 = 0; i2 < keys.length; ++i2)
          if (dst[keys[i2]] === void 0 || !ifNotSet)
            dst[keys[i2]] = src[keys[i2]];
        return dst;
      }
      __name(merge, "merge");
      util.merge = merge;
      util.lcFirst = /* @__PURE__ */ __name(function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      }, "lcFirst");
      function newError(name) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError))
            return new CustomError(message, properties);
          Object.defineProperty(this, "message", { get: /* @__PURE__ */ __name(function() {
            return message;
          }, "get") });
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, CustomError);
          else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });
          if (properties)
            merge(this, properties);
        }
        __name(CustomError, "CustomError");
        CustomError.prototype = Object.create(Error.prototype, {
          constructor: {
            value: CustomError,
            writable: true,
            enumerable: false,
            configurable: true
          },
          name: {
            get: /* @__PURE__ */ __name(function get() {
              return name;
            }, "get"),
            set: void 0,
            enumerable: false,
            // configurable: false would accurately preserve the behavior of
            // the original, but I'm guessing that was not intentional.
            // For an actual error subclass, this property would
            // be configurable.
            configurable: true
          },
          toString: {
            value: /* @__PURE__ */ __name(function value() {
              return this.name + ": " + this.message;
            }, "value"),
            writable: true,
            enumerable: false,
            configurable: true
          }
        });
        return CustomError;
      }
      __name(newError, "newError");
      util.newError = newError;
      util.ProtocolError = newError("ProtocolError");
      util.oneOfGetter = /* @__PURE__ */ __name(function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i2 = 0; i2 < fieldNames.length; ++i2)
          fieldMap[fieldNames[i2]] = 1;
        return function() {
          for (var keys = Object.keys(this), i3 = keys.length - 1; i3 > -1; --i3)
            if (fieldMap[keys[i3]] === 1 && this[keys[i3]] !== void 0 && this[keys[i3]] !== null)
              return keys[i3];
        };
      }, "getOneOf");
      util.oneOfSetter = /* @__PURE__ */ __name(function setOneOf(fieldNames) {
        return function(name) {
          for (var i2 = 0; i2 < fieldNames.length; ++i2)
            if (fieldNames[i2] !== name)
              delete this[fieldNames[i2]];
        };
      }, "setOneOf");
      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };
      util._configure = function() {
        var Buffer2 = util.Buffer;
        if (!Buffer2) {
          util._Buffer_from = util._Buffer_allocUnsafe = null;
          return;
        }
        util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
        /* @__PURE__ */ __name(function Buffer_from(value, encoding) {
          return new Buffer2(value, encoding);
        }, "Buffer_from");
        util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
        /* @__PURE__ */ __name(function Buffer_allocUnsafe(size) {
          return new Buffer2(size);
        }, "Buffer_allocUnsafe");
      };
    }
  });

  // node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS({
    "node_modules/protobufjs/src/writer.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Writer;
      var util = require_minimal();
      var BufferWriter;
      var LongBits = util.LongBits, base64 = util.base64, utf8 = util.utf8;
      function Op(fn, len, val) {
        this.fn = fn;
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      __name(Op, "Op");
      function noop2() {
      }
      __name(noop2, "noop");
      function State(writer) {
        this.head = writer.head;
        this.tail = writer.tail;
        this.len = writer.len;
        this.next = writer.states;
      }
      __name(State, "State");
      function Writer() {
        this.len = 0;
        this.head = new Op(noop2, 0, 0);
        this.tail = this.head;
        this.states = null;
      }
      __name(Writer, "Writer");
      var create = /* @__PURE__ */ __name(function create2() {
        return util.Buffer ? /* @__PURE__ */ __name(function create_buffer_setup() {
          return (Writer.create = /* @__PURE__ */ __name(function create_buffer() {
            return new BufferWriter();
          }, "create_buffer"))();
        }, "create_buffer_setup") : /* @__PURE__ */ __name(function create_array() {
          return new Writer();
        }, "create_array");
      }, "create");
      Writer.create = create();
      Writer.alloc = /* @__PURE__ */ __name(function alloc(size) {
        return new util.Array(size);
      }, "alloc");
      if (util.Array !== Array)
        Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
      Writer.prototype._push = /* @__PURE__ */ __name(function push(fn, len, val) {
        this.tail = this.tail.next = new Op(fn, len, val);
        this.len += len;
        return this;
      }, "push");
      function writeByte(val, buf, pos) {
        buf[pos] = val & 255;
      }
      __name(writeByte, "writeByte");
      function writeVarint32(val, buf, pos) {
        while (val > 127) {
          buf[pos++] = val & 127 | 128;
          val >>>= 7;
        }
        buf[pos] = val;
      }
      __name(writeVarint32, "writeVarint32");
      function VarintOp(len, val) {
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      __name(VarintOp, "VarintOp");
      VarintOp.prototype = Object.create(Op.prototype);
      VarintOp.prototype.fn = writeVarint32;
      Writer.prototype.uint32 = /* @__PURE__ */ __name(function write_uint32(value) {
        this.len += (this.tail = this.tail.next = new VarintOp(
          (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
          value
        )).len;
        return this;
      }, "write_uint32");
      Writer.prototype.int32 = /* @__PURE__ */ __name(function write_int32(value) {
        return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
      }, "write_int32");
      Writer.prototype.sint32 = /* @__PURE__ */ __name(function write_sint32(value) {
        return this.uint32((value << 1 ^ value >> 31) >>> 0);
      }, "write_sint32");
      function writeVarint64(val, buf, pos) {
        while (val.hi) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
          val.hi >>>= 7;
        }
        while (val.lo > 127) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = val.lo >>> 7;
        }
        buf[pos++] = val.lo;
      }
      __name(writeVarint64, "writeVarint64");
      Writer.prototype.uint64 = /* @__PURE__ */ __name(function write_uint64(value) {
        var bits = LongBits.from(value);
        return this._push(writeVarint64, bits.length(), bits);
      }, "write_uint64");
      Writer.prototype.int64 = Writer.prototype.uint64;
      Writer.prototype.sint64 = /* @__PURE__ */ __name(function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits.length(), bits);
      }, "write_sint64");
      Writer.prototype.bool = /* @__PURE__ */ __name(function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
      }, "write_bool");
      function writeFixed32(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      __name(writeFixed32, "writeFixed32");
      Writer.prototype.fixed32 = /* @__PURE__ */ __name(function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
      }, "write_fixed32");
      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      Writer.prototype.fixed64 = /* @__PURE__ */ __name(function write_fixed64(value) {
        var bits = LongBits.from(value);
        return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
      }, "write_fixed64");
      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      Writer.prototype.float = /* @__PURE__ */ __name(function write_float(value) {
        return this._push(util.float.writeFloatLE, 4, value);
      }, "write_float");
      Writer.prototype.double = /* @__PURE__ */ __name(function write_double(value) {
        return this._push(util.float.writeDoubleLE, 8, value);
      }, "write_double");
      var writeBytes = util.Array.prototype.set ? /* @__PURE__ */ __name(function writeBytes_set(val, buf, pos) {
        buf.set(val, pos);
      }, "writeBytes_set") : /* @__PURE__ */ __name(function writeBytes_for(val, buf, pos) {
        for (var i2 = 0; i2 < val.length; ++i2)
          buf[pos + i2] = val[i2];
      }, "writeBytes_for");
      Writer.prototype.bytes = /* @__PURE__ */ __name(function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len)
          return this._push(writeByte, 1, 0);
        if (util.isString(value)) {
          var buf = Writer.alloc(len = base64.length(value));
          base64.decode(value, buf, 0);
          value = buf;
        }
        return this.uint32(len)._push(writeBytes, len, value);
      }, "write_bytes");
      Writer.prototype.string = /* @__PURE__ */ __name(function write_string(value) {
        var len = utf8.length(value);
        return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
      }, "write_string");
      Writer.prototype.fork = /* @__PURE__ */ __name(function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop2, 0, 0);
        this.len = 0;
        return this;
      }, "fork");
      Writer.prototype.reset = /* @__PURE__ */ __name(function reset() {
        if (this.states) {
          this.head = this.states.head;
          this.tail = this.states.tail;
          this.len = this.states.len;
          this.states = this.states.next;
        } else {
          this.head = this.tail = new Op(noop2, 0, 0);
          this.len = 0;
        }
        return this;
      }, "reset");
      Writer.prototype.ldelim = /* @__PURE__ */ __name(function ldelim() {
        var head = this.head, tail = this.tail, len = this.len;
        this.reset().uint32(len);
        if (len) {
          this.tail.next = head.next;
          this.tail = tail;
          this.len += len;
        }
        return this;
      }, "ldelim");
      Writer.prototype.finish = /* @__PURE__ */ __name(function finish() {
        var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
        while (head) {
          head.fn(head.val, buf, pos);
          pos += head.len;
          head = head.next;
        }
        return buf;
      }, "finish");
      Writer._configure = function(BufferWriter_) {
        BufferWriter = BufferWriter_;
        Writer.create = create();
        BufferWriter._configure();
      };
    }
  });

  // node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS({
    "node_modules/protobufjs/src/writer_buffer.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = BufferWriter;
      var Writer = require_writer();
      (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
      var util = require_minimal();
      function BufferWriter() {
        Writer.call(this);
      }
      __name(BufferWriter, "BufferWriter");
      BufferWriter._configure = function() {
        BufferWriter.alloc = util._Buffer_allocUnsafe;
        BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? /* @__PURE__ */ __name(function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos);
        }, "writeBytesBuffer_set") : /* @__PURE__ */ __name(function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy)
            val.copy(buf, pos, 0, val.length);
          else for (var i2 = 0; i2 < val.length; )
            buf[pos++] = val[i2++];
        }, "writeBytesBuffer_copy");
      };
      BufferWriter.prototype.bytes = /* @__PURE__ */ __name(function write_bytes_buffer(value) {
        if (util.isString(value))
          value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len)
          this._push(BufferWriter.writeBytesBuffer, len, value);
        return this;
      }, "write_bytes_buffer");
      function writeStringBuffer(val, buf, pos) {
        if (val.length < 40)
          util.utf8.write(val, buf, pos);
        else if (buf.utf8Write)
          buf.utf8Write(val, pos);
        else
          buf.write(val, pos);
      }
      __name(writeStringBuffer, "writeStringBuffer");
      BufferWriter.prototype.string = /* @__PURE__ */ __name(function write_string_buffer(value) {
        var len = util.Buffer.byteLength(value);
        this.uint32(len);
        if (len)
          this._push(writeStringBuffer, len, value);
        return this;
      }, "write_string_buffer");
      BufferWriter._configure();
    }
  });

  // node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS({
    "node_modules/protobufjs/src/reader.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Reader;
      var util = require_minimal();
      var BufferReader;
      var LongBits = util.LongBits, utf8 = util.utf8;
      function indexOutOfRange(reader, writeLength) {
        return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
      }
      __name(indexOutOfRange, "indexOutOfRange");
      function Reader(buffer) {
        this.buf = buffer;
        this.pos = 0;
        this.len = buffer.length;
      }
      __name(Reader, "Reader");
      var create_array = typeof Uint8Array !== "undefined" ? /* @__PURE__ */ __name(function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      }, "create_typed_array") : /* @__PURE__ */ __name(function create_array2(buffer) {
        if (Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      }, "create_array");
      var create = /* @__PURE__ */ __name(function create2() {
        return util.Buffer ? /* @__PURE__ */ __name(function create_buffer_setup(buffer) {
          return (Reader.create = /* @__PURE__ */ __name(function create_buffer(buffer2) {
            return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
          }, "create_buffer"))(buffer);
        }, "create_buffer_setup") : create_array;
      }, "create");
      Reader.create = create();
      Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
      util.Array.prototype.slice;
      Reader.prototype.uint32 = (/* @__PURE__ */ __name(function read_uint32_setup() {
        var value = 4294967295;
        return /* @__PURE__ */ __name(function read_uint32() {
          value = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
          }
          return value;
        }, "read_uint32");
      }, "read_uint32_setup"))();
      Reader.prototype.int32 = /* @__PURE__ */ __name(function read_int32() {
        return this.uint32() | 0;
      }, "read_int32");
      Reader.prototype.sint32 = /* @__PURE__ */ __name(function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
      }, "read_sint32");
      function readLongVarint() {
        var bits = new LongBits(0, 0);
        var i2 = 0;
        if (this.len - this.pos > 4) {
          for (; i2 < 4; ++i2) {
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i2 * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
          i2 = 0;
        } else {
          for (; i2 < 3; ++i2) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i2 * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i2 * 7) >>> 0;
          return bits;
        }
        if (this.len - this.pos > 4) {
          for (; i2 < 5; ++i2) {
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i2 * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        } else {
          for (; i2 < 5; ++i2) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i2 * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        }
        throw Error("invalid varint encoding");
      }
      __name(readLongVarint, "readLongVarint");
      Reader.prototype.bool = /* @__PURE__ */ __name(function read_bool() {
        return this.uint32() !== 0;
      }, "read_bool");
      function readFixed32_end(buf, end) {
        return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
      }
      __name(readFixed32_end, "readFixed32_end");
      Reader.prototype.fixed32 = /* @__PURE__ */ __name(function read_fixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4);
      }, "read_fixed32");
      Reader.prototype.sfixed32 = /* @__PURE__ */ __name(function read_sfixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4) | 0;
      }, "read_sfixed32");
      function readFixed64() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 8);
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
      }
      __name(readFixed64, "readFixed64");
      Reader.prototype.float = /* @__PURE__ */ __name(function read_float() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      }, "read_float");
      Reader.prototype.double = /* @__PURE__ */ __name(function read_double() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      }, "read_double");
      Reader.prototype.bytes = /* @__PURE__ */ __name(function read_bytes() {
        var length = this.uint32(), start = this.pos, end = this.pos + length;
        if (end > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
        if (Array.isArray(this.buf))
          return this.buf.slice(start, end);
        if (start === end) {
          var nativeBuffer = util.Buffer;
          return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
        }
        return this._slice.call(this.buf, start, end);
      }, "read_bytes");
      Reader.prototype.string = /* @__PURE__ */ __name(function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
      }, "read_string");
      Reader.prototype.skip = /* @__PURE__ */ __name(function skip(length) {
        if (typeof length === "number") {
          if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
          this.pos += length;
        } else {
          do {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }
        return this;
      }, "skip");
      Reader.prototype.skipType = function(wireType) {
        switch (wireType) {
          case 0:
            this.skip();
            break;
          case 1:
            this.skip(8);
            break;
          case 2:
            this.skip(this.uint32());
            break;
          case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
              this.skipType(wireType);
            }
            break;
          case 5:
            this.skip(4);
            break;
          /* istanbul ignore next */
          default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }
        return this;
      };
      Reader._configure = function(BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create();
        BufferReader._configure();
        var fn = util.Long ? "toLong" : (
          /* istanbul ignore next */
          "toNumber"
        );
        util.merge(Reader.prototype, {
          int64: /* @__PURE__ */ __name(function read_int64() {
            return readLongVarint.call(this)[fn](false);
          }, "read_int64"),
          uint64: /* @__PURE__ */ __name(function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          }, "read_uint64"),
          sint64: /* @__PURE__ */ __name(function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          }, "read_sint64"),
          fixed64: /* @__PURE__ */ __name(function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          }, "read_fixed64"),
          sfixed64: /* @__PURE__ */ __name(function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          }, "read_sfixed64")
        });
      };
    }
  });

  // node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS({
    "node_modules/protobufjs/src/reader_buffer.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = BufferReader;
      var Reader = require_reader();
      (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
      var util = require_minimal();
      function BufferReader(buffer) {
        Reader.call(this, buffer);
      }
      __name(BufferReader, "BufferReader");
      BufferReader._configure = function() {
        if (util.Buffer)
          BufferReader.prototype._slice = util.Buffer.prototype.slice;
      };
      BufferReader.prototype.string = /* @__PURE__ */ __name(function read_string_buffer() {
        var len = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
      }, "read_string_buffer");
      BufferReader._configure();
    }
  });

  // node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS({
    "node_modules/protobufjs/src/rpc/service.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Service;
      var util = require_minimal();
      (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
      function Service(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function")
          throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        this.rpcImpl = rpcImpl;
        this.requestDelimited = Boolean(requestDelimited);
        this.responseDelimited = Boolean(responseDelimited);
      }
      __name(Service, "Service");
      Service.prototype.rpcCall = /* @__PURE__ */ __name(function rpcCall(method, requestCtor, responseCtor, request, callback) {
        if (!request)
          throw TypeError("request must be specified");
        var self2 = this;
        if (!callback)
          return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
        if (!self2.rpcImpl) {
          setTimeout(function() {
            callback(Error("already ended"));
          }, 0);
          return void 0;
        }
        try {
          return self2.rpcImpl(
            method,
            requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            /* @__PURE__ */ __name(function rpcCallback(err, response) {
              if (err) {
                self2.emit("error", err, method);
                return callback(err);
              }
              if (response === null) {
                self2.end(
                  /* endedByRPC */
                  true
                );
                return void 0;
              }
              if (!(response instanceof responseCtor)) {
                try {
                  response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
                } catch (err2) {
                  self2.emit("error", err2, method);
                  return callback(err2);
                }
              }
              self2.emit("data", response, method);
              return callback(null, response);
            }, "rpcCallback")
          );
        } catch (err) {
          self2.emit("error", err, method);
          setTimeout(function() {
            callback(err);
          }, 0);
          return void 0;
        }
      }, "rpcCall");
      Service.prototype.end = /* @__PURE__ */ __name(function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC)
            this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }
        return this;
      }, "end");
    }
  });

  // node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS({
    "node_modules/protobufjs/src/rpc.js"(exports4) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var rpc = exports4;
      rpc.Service = require_service();
    }
  });

  // node_modules/protobufjs/src/roots.js
  var require_roots = __commonJS({
    "node_modules/protobufjs/src/roots.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = {};
    }
  });

  // node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS({
    "node_modules/protobufjs/src/index-minimal.js"(exports4) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var protobuf = exports4;
      protobuf.build = "minimal";
      protobuf.Writer = require_writer();
      protobuf.BufferWriter = require_writer_buffer();
      protobuf.Reader = require_reader();
      protobuf.BufferReader = require_reader_buffer();
      protobuf.util = require_minimal();
      protobuf.rpc = require_rpc();
      protobuf.roots = require_roots();
      protobuf.configure = configure;
      function configure() {
        protobuf.util._configure();
        protobuf.Writer._configure(protobuf.BufferWriter);
        protobuf.Reader._configure(protobuf.BufferReader);
      }
      __name(configure, "configure");
      configure();
    }
  });

  // node_modules/@protobufjs/codegen/index.js
  var require_codegen = __commonJS({
    "node_modules/@protobufjs/codegen/index.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = codegen;
      function codegen(functionParams, functionName) {
        if (typeof functionParams === "string") {
          functionName = functionParams;
          functionParams = void 0;
        }
        var body = [];
        function Codegen(formatStringOrScope) {
          if (typeof formatStringOrScope !== "string") {
            var source = toString();
            if (codegen.verbose)
              console.log("codegen: " + source);
            source = "return " + source;
            if (formatStringOrScope) {
              var scopeKeys = Object.keys(formatStringOrScope), scopeParams = new Array(scopeKeys.length + 1), scopeValues = new Array(scopeKeys.length), scopeOffset = 0;
              while (scopeOffset < scopeKeys.length) {
                scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
              }
              scopeParams[scopeOffset] = source;
              return Function.apply(null, scopeParams).apply(null, scopeValues);
            }
            return Function(source)();
          }
          var formatParams = new Array(arguments.length - 1), formatOffset = 0;
          while (formatOffset < formatParams.length)
            formatParams[formatOffset] = arguments[++formatOffset];
          formatOffset = 0;
          formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, /* @__PURE__ */ __name(function replace($0, $1) {
            var value = formatParams[formatOffset++];
            switch ($1) {
              case "d":
              case "f":
                return String(Number(value));
              case "i":
                return String(Math.floor(value));
              case "j":
                return JSON.stringify(value);
              case "s":
                return String(value);
            }
            return "%";
          }, "replace"));
          if (formatOffset !== formatParams.length)
            throw Error("parameter count mismatch");
          body.push(formatStringOrScope);
          return Codegen;
        }
        __name(Codegen, "Codegen");
        function toString(functionNameOverride) {
          return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
        }
        __name(toString, "toString");
        Codegen.toString = toString;
        return Codegen;
      }
      __name(codegen, "codegen");
      codegen.verbose = false;
    }
  });

  // node_modules/@protobufjs/fetch/index.js
  var require_fetch = __commonJS({
    "node_modules/@protobufjs/fetch/index.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = fetch2;
      var asPromise = require_aspromise(), inquire2 = require_inquire();
      var fs = inquire2("fs");
      function fetch2(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else if (!options)
          options = {};
        if (!callback)
          return asPromise(fetch2, this, filename, options);
        if (!options.xhr && fs && fs.readFile)
          return fs.readFile(filename, /* @__PURE__ */ __name(function fetchReadFileCallback(err, contents) {
            return err && typeof XMLHttpRequest !== "undefined" ? fetch2.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
          }, "fetchReadFileCallback"));
        return fetch2.xhr(filename, options, callback);
      }
      __name(fetch2, "fetch");
      fetch2.xhr = /* @__PURE__ */ __name(function fetch_xhr(filename, options, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = /* @__PURE__ */ __name(function fetchOnReadyStateChange() {
          if (xhr.readyState !== 4)
            return void 0;
          if (xhr.status !== 0 && xhr.status !== 200)
            return callback(Error("status " + xhr.status));
          if (options.binary) {
            var buffer = xhr.response;
            if (!buffer) {
              buffer = [];
              for (var i2 = 0; i2 < xhr.responseText.length; ++i2)
                buffer.push(xhr.responseText.charCodeAt(i2) & 255);
            }
            return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
          }
          return callback(null, xhr.responseText);
        }, "fetchOnReadyStateChange");
        if (options.binary) {
          if ("overrideMimeType" in xhr)
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
          xhr.responseType = "arraybuffer";
        }
        xhr.open("GET", filename);
        xhr.send();
      }, "fetch_xhr");
    }
  });

  // node_modules/@protobufjs/path/index.js
  var require_path = __commonJS({
    "node_modules/@protobufjs/path/index.js"(exports4) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var path = exports4;
      var isAbsolute = (
        /**
         * Tests if the specified path is absolute.
         * @param {string} path Path to test
         * @returns {boolean} `true` if path is absolute
         */
        path.isAbsolute = /* @__PURE__ */ __name(function isAbsolute2(path2) {
          return /^(?:\/|\w+:)/.test(path2);
        }, "isAbsolute")
      );
      var normalize = (
        /**
         * Normalizes the specified path.
         * @param {string} path Path to normalize
         * @returns {string} Normalized path
         */
        path.normalize = /* @__PURE__ */ __name(function normalize2(path2) {
          path2 = path2.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
          var parts = path2.split("/"), absolute = isAbsolute(path2), prefix = "";
          if (absolute)
            prefix = parts.shift() + "/";
          for (var i2 = 0; i2 < parts.length; ) {
            if (parts[i2] === "..") {
              if (i2 > 0 && parts[i2 - 1] !== "..")
                parts.splice(--i2, 2);
              else if (absolute)
                parts.splice(i2, 1);
              else
                ++i2;
            } else if (parts[i2] === ".")
              parts.splice(i2, 1);
            else
              ++i2;
          }
          return prefix + parts.join("/");
        }, "normalize")
      );
      path.resolve = /* @__PURE__ */ __name(function resolve(originPath, includePath, alreadyNormalized) {
        if (!alreadyNormalized)
          includePath = normalize(includePath);
        if (isAbsolute(includePath))
          return includePath;
        if (!alreadyNormalized)
          originPath = normalize(originPath);
        return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
      }, "resolve");
    }
  });

  // node_modules/protobufjs/src/namespace.js
  var require_namespace = __commonJS({
    "node_modules/protobufjs/src/namespace.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Namespace;
      var ReflectionObject = require_object();
      ((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";
      var Field = require_field(), util = require_util(), OneOf = require_oneof();
      var Type, Service, Enum;
      Namespace.fromJSON = /* @__PURE__ */ __name(function fromJSON(name, json) {
        return new Namespace(name, json.options).addJSON(json.nested);
      }, "fromJSON");
      function arrayToJSON(array, toJSONOptions) {
        if (!(array && array.length))
          return void 0;
        var obj = {};
        for (var i2 = 0; i2 < array.length; ++i2)
          obj[array[i2].name] = array[i2].toJSON(toJSONOptions);
        return obj;
      }
      __name(arrayToJSON, "arrayToJSON");
      Namespace.arrayToJSON = arrayToJSON;
      Namespace.isReservedId = /* @__PURE__ */ __name(function isReservedId(reserved, id) {
        if (reserved) {
          for (var i2 = 0; i2 < reserved.length; ++i2)
            if (typeof reserved[i2] !== "string" && reserved[i2][0] <= id && reserved[i2][1] > id)
              return true;
        }
        return false;
      }, "isReservedId");
      Namespace.isReservedName = /* @__PURE__ */ __name(function isReservedName(reserved, name) {
        if (reserved) {
          for (var i2 = 0; i2 < reserved.length; ++i2)
            if (reserved[i2] === name)
              return true;
        }
        return false;
      }, "isReservedName");
      function Namespace(name, options) {
        ReflectionObject.call(this, name, options);
        this.nested = void 0;
        this._nestedArray = null;
        this._lookupCache = {};
        this._needsRecursiveFeatureResolution = true;
        this._needsRecursiveResolve = true;
      }
      __name(Namespace, "Namespace");
      function clearCache(namespace) {
        namespace._nestedArray = null;
        namespace._lookupCache = {};
        var parent = namespace;
        while (parent = parent.parent) {
          parent._lookupCache = {};
        }
        return namespace;
      }
      __name(clearCache, "clearCache");
      Object.defineProperty(Namespace.prototype, "nestedArray", {
        get: /* @__PURE__ */ __name(function() {
          return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
        }, "get")
      });
      Namespace.prototype.toJSON = /* @__PURE__ */ __name(function toJSON(toJSONOptions) {
        return util.toObject([
          "options",
          this.options,
          "nested",
          arrayToJSON(this.nestedArray, toJSONOptions)
        ]);
      }, "toJSON");
      Namespace.prototype.addJSON = /* @__PURE__ */ __name(function addJSON(nestedJson) {
        var ns = this;
        if (nestedJson) {
          for (var names = Object.keys(nestedJson), i2 = 0, nested; i2 < names.length; ++i2) {
            nested = nestedJson[names[i2]];
            ns.add(
              // most to least likely
              (nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : nested.id !== void 0 ? Field.fromJSON : Namespace.fromJSON)(names[i2], nested)
            );
          }
        }
        return this;
      }, "addJSON");
      Namespace.prototype.get = /* @__PURE__ */ __name(function get(name) {
        return this.nested && this.nested[name] || null;
      }, "get");
      Namespace.prototype.getEnum = /* @__PURE__ */ __name(function getEnum(name) {
        if (this.nested && this.nested[name] instanceof Enum)
          return this.nested[name].values;
        throw Error("no such enum: " + name);
      }, "getEnum");
      Namespace.prototype.add = /* @__PURE__ */ __name(function add(object) {
        if (!(object instanceof Field && object.extend !== void 0 || object instanceof Type || object instanceof OneOf || object instanceof Enum || object instanceof Service || object instanceof Namespace))
          throw TypeError("object must be a valid nested object");
        if (!this.nested)
          this.nested = {};
        else {
          var prev = this.get(object.name);
          if (prev) {
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
              var nested = prev.nestedArray;
              for (var i2 = 0; i2 < nested.length; ++i2)
                object.add(nested[i2]);
              this.remove(prev);
              if (!this.nested)
                this.nested = {};
              object.setOptions(prev.options, true);
            } else
              throw Error("duplicate name '" + object.name + "' in " + this);
          }
        }
        this.nested[object.name] = object;
        if (!(this instanceof Type || this instanceof Service || this instanceof Enum || this instanceof Field)) {
          if (!object._edition) {
            object._edition = object._defaultEdition;
          }
        }
        this._needsRecursiveFeatureResolution = true;
        this._needsRecursiveResolve = true;
        var parent = this;
        while (parent = parent.parent) {
          parent._needsRecursiveFeatureResolution = true;
          parent._needsRecursiveResolve = true;
        }
        object.onAdd(this);
        return clearCache(this);
      }, "add");
      Namespace.prototype.remove = /* @__PURE__ */ __name(function remove(object) {
        if (!(object instanceof ReflectionObject))
          throw TypeError("object must be a ReflectionObject");
        if (object.parent !== this)
          throw Error(object + " is not a member of " + this);
        delete this.nested[object.name];
        if (!Object.keys(this.nested).length)
          this.nested = void 0;
        object.onRemove(this);
        return clearCache(this);
      }, "remove");
      Namespace.prototype.define = /* @__PURE__ */ __name(function define2(path, json) {
        if (util.isString(path))
          path = path.split(".");
        else if (!Array.isArray(path))
          throw TypeError("illegal path");
        if (path && path.length && path[0] === "")
          throw Error("path must be relative");
        var ptr = this;
        while (path.length > 0) {
          var part = path.shift();
          if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace))
              throw Error("path conflicts with non-namespace objects");
          } else
            ptr.add(ptr = new Namespace(part));
        }
        if (json)
          ptr.addJSON(json);
        return ptr;
      }, "define");
      Namespace.prototype.resolveAll = /* @__PURE__ */ __name(function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        this._resolveFeaturesRecursive(this._edition);
        var nested = this.nestedArray, i2 = 0;
        this.resolve();
        while (i2 < nested.length)
          if (nested[i2] instanceof Namespace)
            nested[i2++].resolveAll();
          else
            nested[i2++].resolve();
        this._needsRecursiveResolve = false;
        return this;
      }, "resolveAll");
      Namespace.prototype._resolveFeaturesRecursive = /* @__PURE__ */ __name(function _resolveFeaturesRecursive(edition) {
        if (!this._needsRecursiveFeatureResolution) return this;
        this._needsRecursiveFeatureResolution = false;
        edition = this._edition || edition;
        ReflectionObject.prototype._resolveFeaturesRecursive.call(this, edition);
        this.nestedArray.forEach((nested) => {
          nested._resolveFeaturesRecursive(edition);
        });
        return this;
      }, "_resolveFeaturesRecursive");
      Namespace.prototype.lookup = /* @__PURE__ */ __name(function lookup(path, filterTypes, parentAlreadyChecked) {
        if (typeof filterTypes === "boolean") {
          parentAlreadyChecked = filterTypes;
          filterTypes = void 0;
        } else if (filterTypes && !Array.isArray(filterTypes))
          filterTypes = [filterTypes];
        if (util.isString(path) && path.length) {
          if (path === ".")
            return this.root;
          path = path.split(".");
        } else if (!path.length)
          return this;
        var flatPath = path.join(".");
        if (path[0] === "")
          return this.root.lookup(path.slice(1), filterTypes);
        var found = this.root._fullyQualifiedObjects && this.root._fullyQualifiedObjects["." + flatPath];
        if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
          return found;
        }
        found = this._lookupImpl(path, flatPath);
        if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
          return found;
        }
        if (parentAlreadyChecked)
          return null;
        var current = this;
        while (current.parent) {
          found = current.parent._lookupImpl(path, flatPath);
          if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
            return found;
          }
          current = current.parent;
        }
        return null;
      }, "lookup");
      Namespace.prototype._lookupImpl = /* @__PURE__ */ __name(function lookup(path, flatPath) {
        if (Object.prototype.hasOwnProperty.call(this._lookupCache, flatPath)) {
          return this._lookupCache[flatPath];
        }
        var found = this.get(path[0]);
        var exact = null;
        if (found) {
          if (path.length === 1) {
            exact = found;
          } else if (found instanceof Namespace) {
            path = path.slice(1);
            exact = found._lookupImpl(path, path.join("."));
          }
        } else {
          for (var i2 = 0; i2 < this.nestedArray.length; ++i2)
            if (this._nestedArray[i2] instanceof Namespace && (found = this._nestedArray[i2]._lookupImpl(path, flatPath)))
              exact = found;
        }
        this._lookupCache[flatPath] = exact;
        return exact;
      }, "lookup");
      Namespace.prototype.lookupType = /* @__PURE__ */ __name(function lookupType(path) {
        var found = this.lookup(path, [Type]);
        if (!found)
          throw Error("no such type: " + path);
        return found;
      }, "lookupType");
      Namespace.prototype.lookupEnum = /* @__PURE__ */ __name(function lookupEnum(path) {
        var found = this.lookup(path, [Enum]);
        if (!found)
          throw Error("no such Enum '" + path + "' in " + this);
        return found;
      }, "lookupEnum");
      Namespace.prototype.lookupTypeOrEnum = /* @__PURE__ */ __name(function lookupTypeOrEnum(path) {
        var found = this.lookup(path, [Type, Enum]);
        if (!found)
          throw Error("no such Type or Enum '" + path + "' in " + this);
        return found;
      }, "lookupTypeOrEnum");
      Namespace.prototype.lookupService = /* @__PURE__ */ __name(function lookupService(path) {
        var found = this.lookup(path, [Service]);
        if (!found)
          throw Error("no such Service '" + path + "' in " + this);
        return found;
      }, "lookupService");
      Namespace._configure = function(Type_, Service_, Enum_) {
        Type = Type_;
        Service = Service_;
        Enum = Enum_;
      };
    }
  });

  // node_modules/protobufjs/src/mapfield.js
  var require_mapfield = __commonJS({
    "node_modules/protobufjs/src/mapfield.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = MapField;
      var Field = require_field();
      ((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";
      var types = require_types(), util = require_util();
      function MapField(name, id, keyType, type, options, comment) {
        Field.call(this, name, id, type, void 0, void 0, options, comment);
        if (!util.isString(keyType))
          throw TypeError("keyType must be a string");
        this.keyType = keyType;
        this.resolvedKeyType = null;
        this.map = true;
      }
      __name(MapField, "MapField");
      MapField.fromJSON = /* @__PURE__ */ __name(function fromJSON(name, json) {
        return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
      }, "fromJSON");
      MapField.prototype.toJSON = /* @__PURE__ */ __name(function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "keyType",
          this.keyType,
          "type",
          this.type,
          "id",
          this.id,
          "extend",
          this.extend,
          "options",
          this.options,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      }, "toJSON");
      MapField.prototype.resolve = /* @__PURE__ */ __name(function resolve() {
        if (this.resolved)
          return this;
        if (types.mapKey[this.keyType] === void 0)
          throw Error("invalid key type: " + this.keyType);
        return Field.prototype.resolve.call(this);
      }, "resolve");
      MapField.d = /* @__PURE__ */ __name(function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
        if (typeof fieldValueType === "function")
          fieldValueType = util.decorateType(fieldValueType).name;
        else if (fieldValueType && typeof fieldValueType === "object")
          fieldValueType = util.decorateEnum(fieldValueType).name;
        return /* @__PURE__ */ __name(function mapFieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
        }, "mapFieldDecorator");
      }, "decorateMapField");
    }
  });

  // node_modules/protobufjs/src/method.js
  var require_method = __commonJS({
    "node_modules/protobufjs/src/method.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Method;
      var ReflectionObject = require_object();
      ((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";
      var util = require_util();
      function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment, parsedOptions) {
        if (util.isObject(requestStream)) {
          options = requestStream;
          requestStream = responseStream = void 0;
        } else if (util.isObject(responseStream)) {
          options = responseStream;
          responseStream = void 0;
        }
        if (!(type === void 0 || util.isString(type)))
          throw TypeError("type must be a string");
        if (!util.isString(requestType))
          throw TypeError("requestType must be a string");
        if (!util.isString(responseType))
          throw TypeError("responseType must be a string");
        ReflectionObject.call(this, name, options);
        this.type = type || "rpc";
        this.requestType = requestType;
        this.requestStream = requestStream ? true : void 0;
        this.responseType = responseType;
        this.responseStream = responseStream ? true : void 0;
        this.resolvedRequestType = null;
        this.resolvedResponseType = null;
        this.comment = comment;
        this.parsedOptions = parsedOptions;
      }
      __name(Method, "Method");
      Method.fromJSON = /* @__PURE__ */ __name(function fromJSON(name, json) {
        return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment, json.parsedOptions);
      }, "fromJSON");
      Method.prototype.toJSON = /* @__PURE__ */ __name(function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "type",
          this.type !== "rpc" && /* istanbul ignore next */
          this.type || void 0,
          "requestType",
          this.requestType,
          "requestStream",
          this.requestStream,
          "responseType",
          this.responseType,
          "responseStream",
          this.responseStream,
          "options",
          this.options,
          "comment",
          keepComments ? this.comment : void 0,
          "parsedOptions",
          this.parsedOptions
        ]);
      }, "toJSON");
      Method.prototype.resolve = /* @__PURE__ */ __name(function resolve() {
        if (this.resolved)
          return this;
        this.resolvedRequestType = this.parent.lookupType(this.requestType);
        this.resolvedResponseType = this.parent.lookupType(this.responseType);
        return ReflectionObject.prototype.resolve.call(this);
      }, "resolve");
    }
  });

  // node_modules/protobufjs/src/service.js
  var require_service2 = __commonJS({
    "node_modules/protobufjs/src/service.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Service;
      var Namespace = require_namespace();
      ((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";
      var Method = require_method(), util = require_util(), rpc = require_rpc();
      function Service(name, options) {
        Namespace.call(this, name, options);
        this.methods = {};
        this._methodsArray = null;
      }
      __name(Service, "Service");
      Service.fromJSON = /* @__PURE__ */ __name(function fromJSON(name, json) {
        var service = new Service(name, json.options);
        if (json.methods)
          for (var names = Object.keys(json.methods), i2 = 0; i2 < names.length; ++i2)
            service.add(Method.fromJSON(names[i2], json.methods[names[i2]]));
        if (json.nested)
          service.addJSON(json.nested);
        if (json.edition)
          service._edition = json.edition;
        service.comment = json.comment;
        service._defaultEdition = "proto3";
        return service;
      }, "fromJSON");
      Service.prototype.toJSON = /* @__PURE__ */ __name(function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "options",
          inherited && inherited.options || void 0,
          "methods",
          Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */
          {},
          "nested",
          inherited && inherited.nested || void 0,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      }, "toJSON");
      Object.defineProperty(Service.prototype, "methodsArray", {
        get: /* @__PURE__ */ __name(function() {
          return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
        }, "get")
      });
      function clearCache(service) {
        service._methodsArray = null;
        return service;
      }
      __name(clearCache, "clearCache");
      Service.prototype.get = /* @__PURE__ */ __name(function get(name) {
        return this.methods[name] || Namespace.prototype.get.call(this, name);
      }, "get");
      Service.prototype.resolveAll = /* @__PURE__ */ __name(function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        Namespace.prototype.resolve.call(this);
        var methods = this.methodsArray;
        for (var i2 = 0; i2 < methods.length; ++i2)
          methods[i2].resolve();
        return this;
      }, "resolveAll");
      Service.prototype._resolveFeaturesRecursive = /* @__PURE__ */ __name(function _resolveFeaturesRecursive(edition) {
        if (!this._needsRecursiveFeatureResolution) return this;
        edition = this._edition || edition;
        Namespace.prototype._resolveFeaturesRecursive.call(this, edition);
        this.methodsArray.forEach((method) => {
          method._resolveFeaturesRecursive(edition);
        });
        return this;
      }, "_resolveFeaturesRecursive");
      Service.prototype.add = /* @__PURE__ */ __name(function add(object) {
        if (this.get(object.name))
          throw Error("duplicate name '" + object.name + "' in " + this);
        if (object instanceof Method) {
          this.methods[object.name] = object;
          object.parent = this;
          return clearCache(this);
        }
        return Namespace.prototype.add.call(this, object);
      }, "add");
      Service.prototype.remove = /* @__PURE__ */ __name(function remove(object) {
        if (object instanceof Method) {
          if (this.methods[object.name] !== object)
            throw Error(object + " is not a member of " + this);
          delete this.methods[object.name];
          object.parent = null;
          return clearCache(this);
        }
        return Namespace.prototype.remove.call(this, object);
      }, "remove");
      Service.prototype.create = /* @__PURE__ */ __name(function create(rpcImpl, requestDelimited, responseDelimited) {
        var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
        for (var i2 = 0, method; i2 < /* initializes */
        this.methodsArray.length; ++i2) {
          var methodName = util.lcFirst((method = this._methodsArray[i2]).resolve().name).replace(/[^$\w_]/g, "");
          rpcService[methodName] = util.codegen(["r", "c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
            m: method,
            q: method.resolvedRequestType.ctor,
            s: method.resolvedResponseType.ctor
          });
        }
        return rpcService;
      }, "create");
    }
  });

  // node_modules/protobufjs/src/message.js
  var require_message = __commonJS({
    "node_modules/protobufjs/src/message.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Message;
      var util = require_minimal();
      function Message(properties) {
        if (properties)
          for (var keys = Object.keys(properties), i2 = 0; i2 < keys.length; ++i2) {
            var key = keys[i2];
            if (key === "__proto__")
              continue;
            this[key] = properties[key];
          }
      }
      __name(Message, "Message");
      Message.create = /* @__PURE__ */ __name(function create(properties) {
        return this.$type.create(properties);
      }, "create");
      Message.encode = /* @__PURE__ */ __name(function encode(message, writer) {
        return this.$type.encode(message, writer);
      }, "encode");
      Message.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
        return this.$type.encodeDelimited(message, writer);
      }, "encodeDelimited");
      Message.decode = /* @__PURE__ */ __name(function decode(reader) {
        return this.$type.decode(reader);
      }, "decode");
      Message.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
        return this.$type.decodeDelimited(reader);
      }, "decodeDelimited");
      Message.verify = /* @__PURE__ */ __name(function verify(message) {
        return this.$type.verify(message);
      }, "verify");
      Message.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
        return this.$type.fromObject(object);
      }, "fromObject");
      Message.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
        return this.$type.toObject(message, options);
      }, "toObject");
      Message.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
        return this.$type.toObject(this, util.toJSONOptions);
      }, "toJSON");
    }
  });

  // node_modules/protobufjs/src/decoder.js
  var require_decoder = __commonJS({
    "node_modules/protobufjs/src/decoder.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = decoder;
      var Enum = require_enum(), types = require_types(), util = require_util();
      function missing(field) {
        return "missing required '" + field.name + "'";
      }
      __name(missing, "missing");
      function decoder(mtype) {
        var gen = util.codegen(["r", "l", "e"], mtype.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field2) {
          return field2.map;
        }).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()")("if(t===e)")("break")("switch(t>>>3){");
        var i2 = 0;
        for (; i2 < /* initializes */
        mtype.fieldsArray.length; ++i2) {
          var field = mtype._fieldsArray[i2].resolve(), type = field.resolvedType instanceof Enum ? "int32" : field.type, ref = "m" + util.safeProp(field.name);
          gen("case %i: {", field.id);
          if (field.map) {
            gen("if(%s===util.emptyObject)", ref)("%s={}", ref)("var c2 = r.uint32()+r.pos");
            if (types.defaults[field.keyType] !== void 0) gen("k=%j", types.defaults[field.keyType]);
            else gen("k=null");
            if (types.defaults[type] !== void 0) gen("value=%j", types.defaults[type]);
            else gen("value=null");
            gen("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", field.keyType)("case 2:");
            if (types.basic[type] === void 0) gen("value=types[%i].decode(r,r.uint32())", i2);
            else gen("value=r.%s()", type);
            gen("break")("default:")("r.skipType(tag2&7)")("break")("}")("}");
            if (types.long[field.keyType] !== void 0) gen('%s[typeof k==="object"?util.longToHash(k):k]=value', ref);
            else gen("%s[k]=value", ref);
          } else if (field.repeated) {
            gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref);
            if (types.packed[type] !== void 0) gen("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type)("}else");
            if (types.basic[type] === void 0) gen(field.delimited ? "%s.push(types[%i].decode(r,undefined,((t&~7)|4)))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i2);
            else gen("%s.push(r.%s())", ref, type);
          } else if (types.basic[type] === void 0) gen(field.delimited ? "%s=types[%i].decode(r,undefined,((t&~7)|4))" : "%s=types[%i].decode(r,r.uint32())", ref, i2);
          else gen("%s=r.%s()", ref, type);
          gen("break")("}");
        }
        gen("default:")("r.skipType(t&7)")("break")("}")("}");
        for (i2 = 0; i2 < mtype._fieldsArray.length; ++i2) {
          var rfield = mtype._fieldsArray[i2];
          if (rfield.required) gen("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
        }
        return gen("return m");
      }
      __name(decoder, "decoder");
    }
  });

  // node_modules/protobufjs/src/verifier.js
  var require_verifier = __commonJS({
    "node_modules/protobufjs/src/verifier.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = verifier;
      var Enum = require_enum(), util = require_util();
      function invalid(field, expected) {
        return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
      }
      __name(invalid, "invalid");
      function genVerifyValue(gen, field, fieldIndex, ref) {
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) {
            gen("switch(%s){", ref)("default:")("return%j", invalid(field, "enum value"));
            for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j) gen("case %i:", field.resolvedType.values[keys[j]]);
            gen("break")("}");
          } else {
            gen("{")("var e=types[%i].verify(%s);", fieldIndex, ref)("if(e)")("return%j+e", field.name + ".")("}");
          }
        } else {
          switch (field.type) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32":
              gen("if(!util.isInteger(%s))", ref)("return%j", invalid(field, "integer"));
              break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field, "integer|Long"));
              break;
            case "float":
            case "double":
              gen('if(typeof %s!=="number")', ref)("return%j", invalid(field, "number"));
              break;
            case "bool":
              gen('if(typeof %s!=="boolean")', ref)("return%j", invalid(field, "boolean"));
              break;
            case "string":
              gen("if(!util.isString(%s))", ref)("return%j", invalid(field, "string"));
              break;
            case "bytes":
              gen('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', ref, ref, ref)("return%j", invalid(field, "buffer"));
              break;
          }
        }
        return gen;
      }
      __name(genVerifyValue, "genVerifyValue");
      function genVerifyKey(gen, field, ref) {
        switch (field.keyType) {
          case "int32":
          case "uint32":
          case "sint32":
          case "fixed32":
          case "sfixed32":
            gen("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field, "integer key"));
            break;
          case "int64":
          case "uint64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(!util.key64Re.test(%s))", ref)("return%j", invalid(field, "integer|Long key"));
            break;
          case "bool":
            gen("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field, "boolean key"));
            break;
        }
        return gen;
      }
      __name(genVerifyKey, "genVerifyKey");
      function verifier(mtype) {
        var gen = util.codegen(["m"], mtype.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected");
        var oneofs = mtype.oneofsArray, seenFirstField = {};
        if (oneofs.length) gen("var p={}");
        for (var i2 = 0; i2 < /* initializes */
        mtype.fieldsArray.length; ++i2) {
          var field = mtype._fieldsArray[i2].resolve(), ref = "m" + util.safeProp(field.name);
          if (field.optional) gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name);
          if (field.map) {
            gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
            genVerifyKey(gen, field, "k[i]");
            genVerifyValue(gen, field, i2, ref + "[k[i]]")("}");
          } else if (field.repeated) {
            gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
            genVerifyValue(gen, field, i2, ref + "[i]")("}");
          } else {
            if (field.partOf) {
              var oneofProp = util.safeProp(field.partOf.name);
              if (seenFirstField[field.partOf.name] === 1) gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
              seenFirstField[field.partOf.name] = 1;
              gen("p%s=1", oneofProp);
            }
            genVerifyValue(gen, field, i2, ref);
          }
          if (field.optional) gen("}");
        }
        return gen("return null");
      }
      __name(verifier, "verifier");
    }
  });

  // node_modules/protobufjs/src/converter.js
  var require_converter = __commonJS({
    "node_modules/protobufjs/src/converter.js"(exports4) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var converter = exports4;
      var Enum = require_enum(), util = require_util();
      function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
        var defaultAlreadyEmitted = false;
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) {
            gen("switch(d%s){", prop);
            for (var values = field.resolvedType.values, keys = Object.keys(values), i2 = 0; i2 < keys.length; ++i2) {
              if (values[keys[i2]] === field.typeDefault && !defaultAlreadyEmitted) {
                gen("default:")('if(typeof(d%s)==="number"){m%s=d%s;break}', prop, prop, prop);
                if (!field.repeated) gen("break");
                defaultAlreadyEmitted = true;
              }
              gen("case%j:", keys[i2])("case %i:", values[keys[i2]])("m%s=%j", prop, values[keys[i2]])("break");
            }
            gen("}");
          } else gen('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
        } else {
          var isUnsigned = false;
          switch (field.type) {
            case "double":
            case "float":
              gen("m%s=Number(d%s)", prop, prop);
              break;
            case "uint32":
            case "fixed32":
              gen("m%s=d%s>>>0", prop, prop);
              break;
            case "int32":
            case "sint32":
            case "sfixed32":
              gen("m%s=d%s|0", prop, prop);
              break;
            case "uint64":
              isUnsigned = true;
            // eslint-disable-next-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)('else if(typeof d%s==="string")', prop)("m%s=parseInt(d%s,10)", prop, prop)('else if(typeof d%s==="number")', prop)("m%s=d%s", prop, prop)('else if(typeof d%s==="object")', prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
              break;
            case "bytes":
              gen('if(typeof d%s==="string")', prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length >= 0)", prop)("m%s=d%s", prop, prop);
              break;
            case "string":
              gen("m%s=String(d%s)", prop, prop);
              break;
            case "bool":
              gen("m%s=Boolean(d%s)", prop, prop);
              break;
          }
        }
        return gen;
      }
      __name(genValuePartial_fromObject, "genValuePartial_fromObject");
      converter.fromObject = /* @__PURE__ */ __name(function fromObject(mtype) {
        var fields = mtype.fieldsArray;
        var gen = util.codegen(["d"], mtype.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
        if (!fields.length) return gen("return new this.ctor");
        gen("var m=new this.ctor");
        for (var i2 = 0; i2 < fields.length; ++i2) {
          var field = fields[i2].resolve(), prop = util.safeProp(field.name);
          if (field.map) {
            gen("if(d%s){", prop)('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            genValuePartial_fromObject(
              gen,
              field,
              /* not sorted */
              i2,
              prop + "[ks[i]]"
            )("}")("}");
          } else if (field.repeated) {
            gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(
              gen,
              field,
              /* not sorted */
              i2,
              prop + "[i]"
            )("}")("}");
          } else {
            if (!(field.resolvedType instanceof Enum)) gen("if(d%s!=null){", prop);
            genValuePartial_fromObject(
              gen,
              field,
              /* not sorted */
              i2,
              prop
            );
            if (!(field.resolvedType instanceof Enum)) gen("}");
          }
        }
        return gen("return m");
      }, "fromObject");
      function genValuePartial_toObject(gen, field, fieldIndex, prop) {
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s", prop, fieldIndex, prop, prop, fieldIndex, prop, prop);
          else gen("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
        } else {
          var isUnsigned = false;
          switch (field.type) {
            case "double":
            case "float":
              gen("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
              break;
            case "uint64":
              isUnsigned = true;
            // eslint-disable-next-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen('if(typeof m%s==="number")', prop)("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true" : "", prop);
              break;
            case "bytes":
              gen("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
              break;
            default:
              gen("d%s=m%s", prop, prop);
              break;
          }
        }
        return gen;
      }
      __name(genValuePartial_toObject, "genValuePartial_toObject");
      converter.toObject = /* @__PURE__ */ __name(function toObject(mtype) {
        var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
        if (!fields.length)
          return util.codegen()("return {}");
        var gen = util.codegen(["m", "o"], mtype.name + "$toObject")("if(!o)")("o={}")("var d={}");
        var repeatedFields = [], mapFields = [], normalFields = [], i2 = 0;
        for (; i2 < fields.length; ++i2)
          if (!fields[i2].partOf)
            (fields[i2].resolve().repeated ? repeatedFields : fields[i2].map ? mapFields : normalFields).push(fields[i2]);
        if (repeatedFields.length) {
          gen("if(o.arrays||o.defaults){");
          for (i2 = 0; i2 < repeatedFields.length; ++i2) gen("d%s=[]", util.safeProp(repeatedFields[i2].name));
          gen("}");
        }
        if (mapFields.length) {
          gen("if(o.objects||o.defaults){");
          for (i2 = 0; i2 < mapFields.length; ++i2) gen("d%s={}", util.safeProp(mapFields[i2].name));
          gen("}");
        }
        if (normalFields.length) {
          gen("if(o.defaults){");
          for (i2 = 0; i2 < normalFields.length; ++i2) {
            var field = normalFields[i2], prop = util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
            else if (field.long) gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
            else if (field.bytes) {
              var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
              gen("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))("else{")("d%s=%s", prop, arrayDefault)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)("}");
            } else gen("d%s=%j", prop, field.typeDefault);
          }
          gen("}");
        }
        var hasKs2 = false;
        for (i2 = 0; i2 < fields.length; ++i2) {
          var field = fields[i2], index = mtype._fieldsArray.indexOf(field), prop = util.safeProp(field.name);
          if (field.map) {
            if (!hasKs2) {
              hasKs2 = true;
              gen("var ks2");
            }
            gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
            genValuePartial_toObject(
              gen,
              field,
              /* sorted */
              index,
              prop + "[ks2[j]]"
            )("}");
          } else if (field.repeated) {
            gen("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(
              gen,
              field,
              /* sorted */
              index,
              prop + "[j]"
            )("}");
          } else {
            gen("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name);
            genValuePartial_toObject(
              gen,
              field,
              /* sorted */
              index,
              prop
            );
            if (field.partOf) gen("if(o.oneofs)")("d%s=%j", util.safeProp(field.partOf.name), field.name);
          }
          gen("}");
        }
        return gen("return d");
      }, "toObject");
    }
  });

  // node_modules/protobufjs/src/wrappers.js
  var require_wrappers = __commonJS({
    "node_modules/protobufjs/src/wrappers.js"(exports4) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var wrappers = exports4;
      var Message = require_message();
      wrappers[".google.protobuf.Any"] = {
        fromObject: /* @__PURE__ */ __name(function(object) {
          if (object && object["@type"]) {
            var name = object["@type"].substring(object["@type"].lastIndexOf("/") + 1);
            var type = this.lookup(name);
            if (type) {
              var type_url = object["@type"].charAt(0) === "." ? object["@type"].slice(1) : object["@type"];
              if (type_url.indexOf("/") === -1) {
                type_url = "/" + type_url;
              }
              return this.create({
                type_url,
                value: type.encode(type.fromObject(object)).finish()
              });
            }
          }
          return this.fromObject(object);
        }, "fromObject"),
        toObject: /* @__PURE__ */ __name(function(message, options) {
          var googleApi = "type.googleapis.com/";
          var prefix = "";
          var name = "";
          if (options && options.json && message.type_url && message.value) {
            name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
            prefix = message.type_url.substring(0, message.type_url.lastIndexOf("/") + 1);
            var type = this.lookup(name);
            if (type)
              message = type.decode(message.value);
          }
          if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.$type.toObject(message, options);
            var messageName = message.$type.fullName[0] === "." ? message.$type.fullName.slice(1) : message.$type.fullName;
            if (prefix === "") {
              prefix = googleApi;
            }
            name = prefix + messageName;
            object["@type"] = name;
            return object;
          }
          return this.toObject(message, options);
        }, "toObject")
      };
    }
  });

  // node_modules/protobufjs/src/type.js
  var require_type = __commonJS({
    "node_modules/protobufjs/src/type.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Type;
      var Namespace = require_namespace();
      ((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";
      var Enum = require_enum(), OneOf = require_oneof(), Field = require_field(), MapField = require_mapfield(), Service = require_service2(), Message = require_message(), Reader = require_reader(), Writer = require_writer(), util = require_util(), encoder = require_encoder(), decoder = require_decoder(), verifier = require_verifier(), converter = require_converter(), wrappers = require_wrappers();
      function Type(name, options) {
        name = name.replace(/\W/g, "");
        Namespace.call(this, name, options);
        this.fields = {};
        this.oneofs = void 0;
        this.extensions = void 0;
        this.reserved = void 0;
        this.group = void 0;
        this._fieldsById = null;
        this._fieldsArray = null;
        this._oneofsArray = null;
        this._ctor = null;
      }
      __name(Type, "Type");
      Object.defineProperties(Type.prototype, {
        /**
         * Message fields by id.
         * @name Type#fieldsById
         * @type {Object.<number,Field>}
         * @readonly
         */
        fieldsById: {
          get: /* @__PURE__ */ __name(function() {
            if (this._fieldsById)
              return this._fieldsById;
            this._fieldsById = {};
            for (var names = Object.keys(this.fields), i2 = 0; i2 < names.length; ++i2) {
              var field = this.fields[names[i2]], id = field.id;
              if (this._fieldsById[id])
                throw Error("duplicate id " + id + " in " + this);
              this._fieldsById[id] = field;
            }
            return this._fieldsById;
          }, "get")
        },
        /**
         * Fields of this message as an array for iteration.
         * @name Type#fieldsArray
         * @type {Field[]}
         * @readonly
         */
        fieldsArray: {
          get: /* @__PURE__ */ __name(function() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
          }, "get")
        },
        /**
         * Oneofs of this message as an array for iteration.
         * @name Type#oneofsArray
         * @type {OneOf[]}
         * @readonly
         */
        oneofsArray: {
          get: /* @__PURE__ */ __name(function() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
          }, "get")
        },
        /**
         * The registered constructor, if any registered, otherwise a generic constructor.
         * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
         * @name Type#ctor
         * @type {Constructor<{}>}
         */
        ctor: {
          get: /* @__PURE__ */ __name(function() {
            return this._ctor || (this.ctor = Type.generateConstructor(this)());
          }, "get"),
          set: /* @__PURE__ */ __name(function(ctor) {
            var prototype = ctor.prototype;
            if (!(prototype instanceof Message)) {
              (ctor.prototype = new Message()).constructor = ctor;
              util.merge(ctor.prototype, prototype);
            }
            ctor.$type = ctor.prototype.$type = this;
            util.merge(ctor, Message, true);
            this._ctor = ctor;
            var i2 = 0;
            for (; i2 < /* initializes */
            this.fieldsArray.length; ++i2)
              this._fieldsArray[i2].resolve();
            var ctorProperties = {};
            for (i2 = 0; i2 < /* initializes */
            this.oneofsArray.length; ++i2)
              ctorProperties[this._oneofsArray[i2].resolve().name] = {
                get: util.oneOfGetter(this._oneofsArray[i2].oneof),
                set: util.oneOfSetter(this._oneofsArray[i2].oneof)
              };
            if (i2)
              Object.defineProperties(ctor.prototype, ctorProperties);
          }, "set")
        }
      });
      Type.generateConstructor = /* @__PURE__ */ __name(function generateConstructor(mtype) {
        var gen = util.codegen(["p"], mtype.name);
        for (var i2 = 0, field; i2 < mtype.fieldsArray.length; ++i2)
          if ((field = mtype._fieldsArray[i2]).map) gen("this%s={}", util.safeProp(field.name));
          else if (field.repeated) gen("this%s=[]", util.safeProp(field.name));
        return gen("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]");
      }, "generateConstructor");
      function clearCache(type) {
        type._fieldsById = type._fieldsArray = type._oneofsArray = null;
        delete type.encode;
        delete type.decode;
        delete type.verify;
        return type;
      }
      __name(clearCache, "clearCache");
      Type.fromJSON = /* @__PURE__ */ __name(function fromJSON(name, json) {
        var type = new Type(name, json.options);
        type.extensions = json.extensions;
        type.reserved = json.reserved;
        var names = Object.keys(json.fields), i2 = 0;
        for (; i2 < names.length; ++i2)
          type.add(
            (typeof json.fields[names[i2]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i2], json.fields[names[i2]])
          );
        if (json.oneofs)
          for (names = Object.keys(json.oneofs), i2 = 0; i2 < names.length; ++i2)
            type.add(OneOf.fromJSON(names[i2], json.oneofs[names[i2]]));
        if (json.nested)
          for (names = Object.keys(json.nested), i2 = 0; i2 < names.length; ++i2) {
            var nested = json.nested[names[i2]];
            type.add(
              // most to least likely
              (nested.id !== void 0 ? Field.fromJSON : nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : Namespace.fromJSON)(names[i2], nested)
            );
          }
        if (json.extensions && json.extensions.length)
          type.extensions = json.extensions;
        if (json.reserved && json.reserved.length)
          type.reserved = json.reserved;
        if (json.group)
          type.group = true;
        if (json.comment)
          type.comment = json.comment;
        if (json.edition)
          type._edition = json.edition;
        type._defaultEdition = "proto3";
        return type;
      }, "fromJSON");
      Type.prototype.toJSON = /* @__PURE__ */ __name(function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "options",
          inherited && inherited.options || void 0,
          "oneofs",
          Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
          "fields",
          Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) {
            return !obj.declaringField;
          }), toJSONOptions) || {},
          "extensions",
          this.extensions && this.extensions.length ? this.extensions : void 0,
          "reserved",
          this.reserved && this.reserved.length ? this.reserved : void 0,
          "group",
          this.group || void 0,
          "nested",
          inherited && inherited.nested || void 0,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      }, "toJSON");
      Type.prototype.resolveAll = /* @__PURE__ */ __name(function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        Namespace.prototype.resolveAll.call(this);
        var oneofs = this.oneofsArray;
        i2 = 0;
        while (i2 < oneofs.length)
          oneofs[i2++].resolve();
        var fields = this.fieldsArray, i2 = 0;
        while (i2 < fields.length)
          fields[i2++].resolve();
        return this;
      }, "resolveAll");
      Type.prototype._resolveFeaturesRecursive = /* @__PURE__ */ __name(function _resolveFeaturesRecursive(edition) {
        if (!this._needsRecursiveFeatureResolution) return this;
        edition = this._edition || edition;
        Namespace.prototype._resolveFeaturesRecursive.call(this, edition);
        this.oneofsArray.forEach((oneof) => {
          oneof._resolveFeatures(edition);
        });
        this.fieldsArray.forEach((field) => {
          field._resolveFeatures(edition);
        });
        return this;
      }, "_resolveFeaturesRecursive");
      Type.prototype.get = /* @__PURE__ */ __name(function get(name) {
        return this.fields[name] || this.oneofs && this.oneofs[name] || this.nested && this.nested[name] || null;
      }, "get");
      Type.prototype.add = /* @__PURE__ */ __name(function add(object) {
        if (this.get(object.name))
          throw Error("duplicate name '" + object.name + "' in " + this);
        if (object instanceof Field && object.extend === void 0) {
          if (this._fieldsById ? (
            /* istanbul ignore next */
            this._fieldsById[object.id]
          ) : this.fieldsById[object.id])
            throw Error("duplicate id " + object.id + " in " + this);
          if (this.isReservedId(object.id))
            throw Error("id " + object.id + " is reserved in " + this);
          if (this.isReservedName(object.name))
            throw Error("name '" + object.name + "' is reserved in " + this);
          if (object.parent)
            object.parent.remove(object);
          this.fields[object.name] = object;
          object.message = this;
          object.onAdd(this);
          return clearCache(this);
        }
        if (object instanceof OneOf) {
          if (!this.oneofs)
            this.oneofs = {};
          this.oneofs[object.name] = object;
          object.onAdd(this);
          return clearCache(this);
        }
        return Namespace.prototype.add.call(this, object);
      }, "add");
      Type.prototype.remove = /* @__PURE__ */ __name(function remove(object) {
        if (object instanceof Field && object.extend === void 0) {
          if (!this.fields || this.fields[object.name] !== object)
            throw Error(object + " is not a member of " + this);
          delete this.fields[object.name];
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }
        if (object instanceof OneOf) {
          if (!this.oneofs || this.oneofs[object.name] !== object)
            throw Error(object + " is not a member of " + this);
          delete this.oneofs[object.name];
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }
        return Namespace.prototype.remove.call(this, object);
      }, "remove");
      Type.prototype.isReservedId = /* @__PURE__ */ __name(function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      }, "isReservedId");
      Type.prototype.isReservedName = /* @__PURE__ */ __name(function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      }, "isReservedName");
      Type.prototype.create = /* @__PURE__ */ __name(function create(properties) {
        return new this.ctor(properties);
      }, "create");
      Type.prototype.setup = /* @__PURE__ */ __name(function setup() {
        var fullName = this.fullName, types = [];
        for (var i2 = 0; i2 < /* initializes */
        this.fieldsArray.length; ++i2)
          types.push(this._fieldsArray[i2].resolve().resolvedType);
        this.encode = encoder(this)({
          Writer,
          types,
          util
        });
        this.decode = decoder(this)({
          Reader,
          types,
          util
        });
        this.verify = verifier(this)({
          types,
          util
        });
        this.fromObject = converter.fromObject(this)({
          types,
          util
        });
        this.toObject = converter.toObject(this)({
          types,
          util
        });
        var wrapper = wrappers[fullName];
        if (wrapper) {
          var originalThis = Object.create(this);
          originalThis.fromObject = this.fromObject;
          this.fromObject = wrapper.fromObject.bind(originalThis);
          originalThis.toObject = this.toObject;
          this.toObject = wrapper.toObject.bind(originalThis);
        }
        return this;
      }, "setup");
      Type.prototype.encode = /* @__PURE__ */ __name(function encode_setup(message, writer) {
        return this.setup().encode(message, writer);
      }, "encode_setup");
      Type.prototype.encodeDelimited = /* @__PURE__ */ __name(function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
      }, "encodeDelimited");
      Type.prototype.decode = /* @__PURE__ */ __name(function decode_setup(reader, length) {
        return this.setup().decode(reader, length);
      }, "decode_setup");
      Type.prototype.decodeDelimited = /* @__PURE__ */ __name(function decodeDelimited(reader) {
        if (!(reader instanceof Reader))
          reader = Reader.create(reader);
        return this.decode(reader, reader.uint32());
      }, "decodeDelimited");
      Type.prototype.verify = /* @__PURE__ */ __name(function verify_setup(message) {
        return this.setup().verify(message);
      }, "verify_setup");
      Type.prototype.fromObject = /* @__PURE__ */ __name(function fromObject(object) {
        return this.setup().fromObject(object);
      }, "fromObject");
      Type.prototype.toObject = /* @__PURE__ */ __name(function toObject(message, options) {
        return this.setup().toObject(message, options);
      }, "toObject");
      Type.d = /* @__PURE__ */ __name(function decorateType(typeName) {
        return /* @__PURE__ */ __name(function typeDecorator(target) {
          util.decorateType(target, typeName);
        }, "typeDecorator");
      }, "decorateType");
    }
  });

  // node_modules/protobufjs/src/root.js
  var require_root = __commonJS({
    "node_modules/protobufjs/src/root.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Root;
      var Namespace = require_namespace();
      ((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";
      var Field = require_field(), Enum = require_enum(), OneOf = require_oneof(), util = require_util();
      var Type, parse, common;
      function Root(options) {
        Namespace.call(this, "", options);
        this.deferred = [];
        this.files = [];
        this._edition = "proto2";
        this._fullyQualifiedObjects = {};
      }
      __name(Root, "Root");
      Root.fromJSON = /* @__PURE__ */ __name(function fromJSON(json, root) {
        if (!root)
          root = new Root();
        if (json.options)
          root.setOptions(json.options);
        return root.addJSON(json.nested).resolveAll();
      }, "fromJSON");
      Root.prototype.resolvePath = util.path.resolve;
      Root.prototype.fetch = util.fetch;
      function SYNC() {
      }
      __name(SYNC, "SYNC");
      Root.prototype.load = /* @__PURE__ */ __name(function load(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = void 0;
        }
        var self2 = this;
        if (!callback) {
          return util.asPromise(load, self2, filename, options);
        }
        var sync = callback === SYNC;
        function finish(err, root) {
          if (!callback) {
            return;
          }
          if (sync) {
            throw err;
          }
          if (root) {
            root.resolveAll();
          }
          var cb = callback;
          callback = null;
          cb(err, root);
        }
        __name(finish, "finish");
        function getBundledFileName(filename2) {
          var idx = filename2.lastIndexOf("google/protobuf/");
          if (idx > -1) {
            var altname = filename2.substring(idx);
            if (altname in common) return altname;
          }
          return null;
        }
        __name(getBundledFileName, "getBundledFileName");
        function process3(filename2, source) {
          try {
            if (util.isString(source) && source.charAt(0) === "{")
              source = JSON.parse(source);
            if (!util.isString(source))
              self2.setOptions(source.options).addJSON(source.nested);
            else {
              parse.filename = filename2;
              var parsed = parse(source, self2, options), resolved2, i3 = 0;
              if (parsed.imports) {
                for (; i3 < parsed.imports.length; ++i3)
                  if (resolved2 = getBundledFileName(parsed.imports[i3]) || self2.resolvePath(filename2, parsed.imports[i3]))
                    fetch2(resolved2);
              }
              if (parsed.weakImports) {
                for (i3 = 0; i3 < parsed.weakImports.length; ++i3)
                  if (resolved2 = getBundledFileName(parsed.weakImports[i3]) || self2.resolvePath(filename2, parsed.weakImports[i3]))
                    fetch2(resolved2, true);
              }
            }
          } catch (err) {
            finish(err);
          }
          if (!sync && !queued) {
            finish(null, self2);
          }
        }
        __name(process3, "process");
        function fetch2(filename2, weak) {
          filename2 = getBundledFileName(filename2) || filename2;
          if (self2.files.indexOf(filename2) > -1) {
            return;
          }
          self2.files.push(filename2);
          if (filename2 in common) {
            if (sync) {
              process3(filename2, common[filename2]);
            } else {
              ++queued;
              setTimeout(function() {
                --queued;
                process3(filename2, common[filename2]);
              });
            }
            return;
          }
          if (sync) {
            var source;
            try {
              source = util.fs.readFileSync(filename2).toString("utf8");
            } catch (err) {
              if (!weak)
                finish(err);
              return;
            }
            process3(filename2, source);
          } else {
            ++queued;
            self2.fetch(filename2, function(err, source2) {
              --queued;
              if (!callback) {
                return;
              }
              if (err) {
                if (!weak)
                  finish(err);
                else if (!queued)
                  finish(null, self2);
                return;
              }
              process3(filename2, source2);
            });
          }
        }
        __name(fetch2, "fetch");
        var queued = 0;
        if (util.isString(filename)) {
          filename = [filename];
        }
        for (var i2 = 0, resolved; i2 < filename.length; ++i2)
          if (resolved = self2.resolvePath("", filename[i2]))
            fetch2(resolved);
        if (sync) {
          self2.resolveAll();
          return self2;
        }
        if (!queued) {
          finish(null, self2);
        }
        return self2;
      }, "load");
      Root.prototype.loadSync = /* @__PURE__ */ __name(function loadSync(filename, options) {
        if (!util.isNode)
          throw Error("not supported");
        return this.load(filename, options, SYNC);
      }, "loadSync");
      Root.prototype.resolveAll = /* @__PURE__ */ __name(function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        if (this.deferred.length)
          throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
            return "'extend " + field.extend + "' in " + field.parent.fullName;
          }).join(", "));
        return Namespace.prototype.resolveAll.call(this);
      }, "resolveAll");
      var exposeRe = /^[A-Z]/;
      function tryHandleExtension(root, field) {
        var extendedType = field.parent.lookup(field.extend);
        if (extendedType) {
          var sisterField = new Field(field.fullName, field.id, field.type, field.rule, void 0, field.options);
          if (extendedType.get(sisterField.name)) {
            return true;
          }
          sisterField.declaringField = field;
          field.extensionField = sisterField;
          extendedType.add(sisterField);
          return true;
        }
        return false;
      }
      __name(tryHandleExtension, "tryHandleExtension");
      Root.prototype._handleAdd = /* @__PURE__ */ __name(function _handleAdd(object) {
        if (object instanceof Field) {
          if (
            /* an extension field (implies not part of a oneof) */
            object.extend !== void 0 && /* not already handled */
            !object.extensionField
          ) {
            if (!tryHandleExtension(this, object))
              this.deferred.push(object);
          }
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name))
            object.parent[object.name] = object.values;
        } else if (!(object instanceof OneOf)) {
          if (object instanceof Type)
            for (var i2 = 0; i2 < this.deferred.length; )
              if (tryHandleExtension(this, this.deferred[i2]))
                this.deferred.splice(i2, 1);
              else
                ++i2;
          for (var j = 0; j < /* initializes */
          object.nestedArray.length; ++j)
            this._handleAdd(object._nestedArray[j]);
          if (exposeRe.test(object.name))
            object.parent[object.name] = object;
        }
        if (object instanceof Type || object instanceof Enum || object instanceof Field) {
          this._fullyQualifiedObjects[object.fullName] = object;
        }
      }, "_handleAdd");
      Root.prototype._handleRemove = /* @__PURE__ */ __name(function _handleRemove(object) {
        if (object instanceof Field) {
          if (
            /* an extension field */
            object.extend !== void 0
          ) {
            if (
              /* already handled */
              object.extensionField
            ) {
              object.extensionField.parent.remove(object.extensionField);
              object.extensionField = null;
            } else {
              var index = this.deferred.indexOf(object);
              if (index > -1)
                this.deferred.splice(index, 1);
            }
          }
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name))
            delete object.parent[object.name];
        } else if (object instanceof Namespace) {
          for (var i2 = 0; i2 < /* initializes */
          object.nestedArray.length; ++i2)
            this._handleRemove(object._nestedArray[i2]);
          if (exposeRe.test(object.name))
            delete object.parent[object.name];
        }
        delete this._fullyQualifiedObjects[object.fullName];
      }, "_handleRemove");
      Root._configure = function(Type_, parse_, common_) {
        Type = Type_;
        parse = parse_;
        common = common_;
      };
    }
  });

  // node_modules/protobufjs/src/util.js
  var require_util = __commonJS({
    "node_modules/protobufjs/src/util.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var util = module2.exports = require_minimal();
      var roots = require_roots();
      var Type, Enum;
      util.codegen = require_codegen();
      util.fetch = require_fetch();
      util.path = require_path();
      util.fs = util.inquire("fs");
      util.toArray = /* @__PURE__ */ __name(function toArray(object) {
        if (object) {
          var keys = Object.keys(object), array = new Array(keys.length), index = 0;
          while (index < keys.length)
            array[index] = object[keys[index++]];
          return array;
        }
        return [];
      }, "toArray");
      util.toObject = /* @__PURE__ */ __name(function toObject(array) {
        var object = {}, index = 0;
        while (index < array.length) {
          var key = array[index++], val = array[index++];
          if (val !== void 0)
            object[key] = val;
        }
        return object;
      }, "toObject");
      var safePropBackslashRe = /\\/g, safePropQuoteRe = /"/g;
      util.isReserved = /* @__PURE__ */ __name(function isReserved(name) {
        return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
      }, "isReserved");
      util.safeProp = /* @__PURE__ */ __name(function safeProp(prop) {
        if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop))
          return '["' + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, '\\"') + '"]';
        return "." + prop;
      }, "safeProp");
      util.ucFirst = /* @__PURE__ */ __name(function ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
      }, "ucFirst");
      var camelCaseRe = /_([a-z])/g;
      util.camelCase = /* @__PURE__ */ __name(function camelCase(str) {
        return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function($0, $1) {
          return $1.toUpperCase();
        });
      }, "camelCase");
      util.compareFieldsById = /* @__PURE__ */ __name(function compareFieldsById(a2, b2) {
        return a2.id - b2.id;
      }, "compareFieldsById");
      util.decorateType = /* @__PURE__ */ __name(function decorateType(ctor, typeName) {
        if (ctor.$type) {
          if (typeName && ctor.$type.name !== typeName) {
            util.decorateRoot.remove(ctor.$type);
            ctor.$type.name = typeName;
            util.decorateRoot.add(ctor.$type);
          }
          return ctor.$type;
        }
        if (!Type)
          Type = require_type();
        var type = new Type(typeName || ctor.name);
        util.decorateRoot.add(type);
        type.ctor = ctor;
        Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
        Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
        return type;
      }, "decorateType");
      var decorateEnumIndex = 0;
      util.decorateEnum = /* @__PURE__ */ __name(function decorateEnum(object) {
        if (object.$type)
          return object.$type;
        if (!Enum)
          Enum = require_enum();
        var enm = new Enum("Enum" + decorateEnumIndex++, object);
        util.decorateRoot.add(enm);
        Object.defineProperty(object, "$type", { value: enm, enumerable: false });
        return enm;
      }, "decorateEnum");
      util.setProperty = /* @__PURE__ */ __name(function setProperty(dst, path, value, ifNotSet) {
        function setProp(dst2, path2, value2) {
          var part = path2.shift();
          if (part === "__proto__" || part === "prototype") {
            return dst2;
          }
          if (path2.length > 0) {
            dst2[part] = setProp(dst2[part] || {}, path2, value2);
          } else {
            var prevValue = dst2[part];
            if (prevValue && ifNotSet)
              return dst2;
            if (prevValue)
              value2 = [].concat(prevValue).concat(value2);
            dst2[part] = value2;
          }
          return dst2;
        }
        __name(setProp, "setProp");
        if (typeof dst !== "object")
          throw TypeError("dst must be an object");
        if (!path)
          throw TypeError("path must be specified");
        path = path.split(".");
        return setProp(dst, path, value);
      }, "setProperty");
      Object.defineProperty(util, "decorateRoot", {
        get: /* @__PURE__ */ __name(function() {
          return roots["decorated"] || (roots["decorated"] = new (require_root())());
        }, "get")
      });
    }
  });

  // node_modules/protobufjs/src/types.js
  var require_types = __commonJS({
    "node_modules/protobufjs/src/types.js"(exports4) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var types = exports4;
      var util = require_util();
      var s = [
        "double",
        // 0
        "float",
        // 1
        "int32",
        // 2
        "uint32",
        // 3
        "sint32",
        // 4
        "fixed32",
        // 5
        "sfixed32",
        // 6
        "int64",
        // 7
        "uint64",
        // 8
        "sint64",
        // 9
        "fixed64",
        // 10
        "sfixed64",
        // 11
        "bool",
        // 12
        "string",
        // 13
        "bytes"
        // 14
      ];
      function bake(values, offset) {
        var i2 = 0, o = {};
        offset |= 0;
        while (i2 < values.length) o[s[i2 + offset]] = values[i2++];
        return o;
      }
      __name(bake, "bake");
      types.basic = bake([
        /* double   */
        1,
        /* float    */
        5,
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        5,
        /* sfixed32 */
        5,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1,
        /* bool     */
        0,
        /* string   */
        2,
        /* bytes    */
        2
      ]);
      types.defaults = bake([
        /* double   */
        0,
        /* float    */
        0,
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        0,
        /* sfixed32 */
        0,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        0,
        /* sfixed64 */
        0,
        /* bool     */
        false,
        /* string   */
        "",
        /* bytes    */
        util.emptyArray,
        /* message  */
        null
      ]);
      types.long = bake([
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1
      ], 7);
      types.mapKey = bake([
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        5,
        /* sfixed32 */
        5,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1,
        /* bool     */
        0,
        /* string   */
        2
      ], 2);
      types.packed = bake([
        /* double   */
        1,
        /* float    */
        5,
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        5,
        /* sfixed32 */
        5,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1,
        /* bool     */
        0
      ]);
    }
  });

  // node_modules/protobufjs/src/field.js
  var require_field = __commonJS({
    "node_modules/protobufjs/src/field.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Field;
      var ReflectionObject = require_object();
      ((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";
      var Enum = require_enum(), types = require_types(), util = require_util();
      var Type;
      var ruleRe = /^required|optional|repeated$/;
      Field.fromJSON = /* @__PURE__ */ __name(function fromJSON(name, json) {
        var field = new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
        if (json.edition)
          field._edition = json.edition;
        field._defaultEdition = "proto3";
        return field;
      }, "fromJSON");
      function Field(name, id, type, rule, extend, options, comment) {
        if (util.isObject(rule)) {
          comment = extend;
          options = rule;
          rule = extend = void 0;
        } else if (util.isObject(extend)) {
          comment = options;
          options = extend;
          extend = void 0;
        }
        ReflectionObject.call(this, name, options);
        if (!util.isInteger(id) || id < 0)
          throw TypeError("id must be a non-negative integer");
        if (!util.isString(type))
          throw TypeError("type must be a string");
        if (rule !== void 0 && !ruleRe.test(rule = rule.toString().toLowerCase()))
          throw TypeError("rule must be a string rule");
        if (extend !== void 0 && !util.isString(extend))
          throw TypeError("extend must be a string");
        if (rule === "proto3_optional") {
          rule = "optional";
        }
        this.rule = rule && rule !== "optional" ? rule : void 0;
        this.type = type;
        this.id = id;
        this.extend = extend || void 0;
        this.repeated = rule === "repeated";
        this.map = false;
        this.message = null;
        this.partOf = null;
        this.typeDefault = null;
        this.defaultValue = null;
        this.long = util.Long ? types.long[type] !== void 0 : (
          /* istanbul ignore next */
          false
        );
        this.bytes = type === "bytes";
        this.resolvedType = null;
        this.extensionField = null;
        this.declaringField = null;
        this.comment = comment;
      }
      __name(Field, "Field");
      Object.defineProperty(Field.prototype, "required", {
        get: /* @__PURE__ */ __name(function() {
          return this._features.field_presence === "LEGACY_REQUIRED";
        }, "get")
      });
      Object.defineProperty(Field.prototype, "optional", {
        get: /* @__PURE__ */ __name(function() {
          return !this.required;
        }, "get")
      });
      Object.defineProperty(Field.prototype, "delimited", {
        get: /* @__PURE__ */ __name(function() {
          return this.resolvedType instanceof Type && this._features.message_encoding === "DELIMITED";
        }, "get")
      });
      Object.defineProperty(Field.prototype, "packed", {
        get: /* @__PURE__ */ __name(function() {
          return this._features.repeated_field_encoding === "PACKED";
        }, "get")
      });
      Object.defineProperty(Field.prototype, "hasPresence", {
        get: /* @__PURE__ */ __name(function() {
          if (this.repeated || this.map) {
            return false;
          }
          return this.partOf || // oneofs
          this.declaringField || this.extensionField || // extensions
          this._features.field_presence !== "IMPLICIT";
        }, "get")
      });
      Field.prototype.setOption = /* @__PURE__ */ __name(function setOption(name, value, ifNotSet) {
        return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
      }, "setOption");
      Field.prototype.toJSON = /* @__PURE__ */ __name(function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "rule",
          this.rule !== "optional" && this.rule || void 0,
          "type",
          this.type,
          "id",
          this.id,
          "extend",
          this.extend,
          "options",
          this.options,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      }, "toJSON");
      Field.prototype.resolve = /* @__PURE__ */ __name(function resolve() {
        if (this.resolved)
          return this;
        if ((this.typeDefault = types.defaults[this.type]) === void 0) {
          this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
          if (this.resolvedType instanceof Type)
            this.typeDefault = null;
          else
            this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
        } else if (this.options && this.options.proto3_optional) {
          this.typeDefault = null;
        }
        if (this.options && this.options["default"] != null) {
          this.typeDefault = this.options["default"];
          if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
            this.typeDefault = this.resolvedType.values[this.typeDefault];
        }
        if (this.options) {
          if (this.options.packed !== void 0 && this.resolvedType && !(this.resolvedType instanceof Enum))
            delete this.options.packed;
          if (!Object.keys(this.options).length)
            this.options = void 0;
        }
        if (this.long) {
          this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");
          if (Object.freeze)
            Object.freeze(this.typeDefault);
        } else if (this.bytes && typeof this.typeDefault === "string") {
          var buf;
          if (util.base64.test(this.typeDefault))
            util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
          else
            util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
          this.typeDefault = buf;
        }
        if (this.map)
          this.defaultValue = util.emptyObject;
        else if (this.repeated)
          this.defaultValue = util.emptyArray;
        else
          this.defaultValue = this.typeDefault;
        if (this.parent instanceof Type)
          this.parent.ctor.prototype[this.name] = this.defaultValue;
        return ReflectionObject.prototype.resolve.call(this);
      }, "resolve");
      Field.prototype._inferLegacyProtoFeatures = /* @__PURE__ */ __name(function _inferLegacyProtoFeatures(edition) {
        if (edition !== "proto2" && edition !== "proto3") {
          return {};
        }
        var features2 = {};
        if (this.rule === "required") {
          features2.field_presence = "LEGACY_REQUIRED";
        }
        if (this.parent && types.defaults[this.type] === void 0) {
          var type = this.parent.get(this.type.split(".").pop());
          if (type && type instanceof Type && type.group) {
            features2.message_encoding = "DELIMITED";
          }
        }
        if (this.getOption("packed") === true) {
          features2.repeated_field_encoding = "PACKED";
        } else if (this.getOption("packed") === false) {
          features2.repeated_field_encoding = "EXPANDED";
        }
        return features2;
      }, "_inferLegacyProtoFeatures");
      Field.prototype._resolveFeatures = /* @__PURE__ */ __name(function _resolveFeatures(edition) {
        return ReflectionObject.prototype._resolveFeatures.call(this, this._edition || edition);
      }, "_resolveFeatures");
      Field.d = /* @__PURE__ */ __name(function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
        if (typeof fieldType === "function")
          fieldType = util.decorateType(fieldType).name;
        else if (fieldType && typeof fieldType === "object")
          fieldType = util.decorateEnum(fieldType).name;
        return /* @__PURE__ */ __name(function fieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
        }, "fieldDecorator");
      }, "decorateField");
      Field._configure = /* @__PURE__ */ __name(function configure(Type_) {
        Type = Type_;
      }, "configure");
    }
  });

  // node_modules/protobufjs/src/oneof.js
  var require_oneof = __commonJS({
    "node_modules/protobufjs/src/oneof.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = OneOf;
      var ReflectionObject = require_object();
      ((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";
      var Field = require_field(), util = require_util();
      function OneOf(name, fieldNames, options, comment) {
        if (!Array.isArray(fieldNames)) {
          options = fieldNames;
          fieldNames = void 0;
        }
        ReflectionObject.call(this, name, options);
        if (!(fieldNames === void 0 || Array.isArray(fieldNames)))
          throw TypeError("fieldNames must be an Array");
        this.oneof = fieldNames || [];
        this.fieldsArray = [];
        this.comment = comment;
      }
      __name(OneOf, "OneOf");
      OneOf.fromJSON = /* @__PURE__ */ __name(function fromJSON(name, json) {
        return new OneOf(name, json.oneof, json.options, json.comment);
      }, "fromJSON");
      OneOf.prototype.toJSON = /* @__PURE__ */ __name(function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "options",
          this.options,
          "oneof",
          this.oneof,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      }, "toJSON");
      function addFieldsToParent(oneof) {
        if (oneof.parent) {
          for (var i2 = 0; i2 < oneof.fieldsArray.length; ++i2)
            if (!oneof.fieldsArray[i2].parent)
              oneof.parent.add(oneof.fieldsArray[i2]);
        }
      }
      __name(addFieldsToParent, "addFieldsToParent");
      OneOf.prototype.add = /* @__PURE__ */ __name(function add(field) {
        if (!(field instanceof Field))
          throw TypeError("field must be a Field");
        if (field.parent && field.parent !== this.parent)
          field.parent.remove(field);
        this.oneof.push(field.name);
        this.fieldsArray.push(field);
        field.partOf = this;
        addFieldsToParent(this);
        return this;
      }, "add");
      OneOf.prototype.remove = /* @__PURE__ */ __name(function remove(field) {
        if (!(field instanceof Field))
          throw TypeError("field must be a Field");
        var index = this.fieldsArray.indexOf(field);
        if (index < 0)
          throw Error(field + " is not a member of " + this);
        this.fieldsArray.splice(index, 1);
        index = this.oneof.indexOf(field.name);
        if (index > -1)
          this.oneof.splice(index, 1);
        field.partOf = null;
        return this;
      }, "remove");
      OneOf.prototype.onAdd = /* @__PURE__ */ __name(function onAdd(parent) {
        ReflectionObject.prototype.onAdd.call(this, parent);
        var self2 = this;
        for (var i2 = 0; i2 < this.oneof.length; ++i2) {
          var field = parent.get(this.oneof[i2]);
          if (field && !field.partOf) {
            field.partOf = self2;
            self2.fieldsArray.push(field);
          }
        }
        addFieldsToParent(this);
      }, "onAdd");
      OneOf.prototype.onRemove = /* @__PURE__ */ __name(function onRemove(parent) {
        for (var i2 = 0, field; i2 < this.fieldsArray.length; ++i2)
          if ((field = this.fieldsArray[i2]).parent)
            field.parent.remove(field);
        ReflectionObject.prototype.onRemove.call(this, parent);
      }, "onRemove");
      Object.defineProperty(OneOf.prototype, "isProto3Optional", {
        get: /* @__PURE__ */ __name(function() {
          if (this.fieldsArray == null || this.fieldsArray.length !== 1) {
            return false;
          }
          var field = this.fieldsArray[0];
          return field.options != null && field.options["proto3_optional"] === true;
        }, "get")
      });
      OneOf.d = /* @__PURE__ */ __name(function decorateOneOf() {
        var fieldNames = new Array(arguments.length), index = 0;
        while (index < arguments.length)
          fieldNames[index] = arguments[index++];
        return /* @__PURE__ */ __name(function oneOfDecorator(prototype, oneofName) {
          util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
          Object.defineProperty(prototype, oneofName, {
            get: util.oneOfGetter(fieldNames),
            set: util.oneOfSetter(fieldNames)
          });
        }, "oneOfDecorator");
      }, "decorateOneOf");
    }
  });

  // node_modules/protobufjs/src/object.js
  var require_object = __commonJS({
    "node_modules/protobufjs/src/object.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = ReflectionObject;
      ReflectionObject.className = "ReflectionObject";
      var OneOf = require_oneof();
      var util = require_util();
      var Root;
      var editions2023Defaults = { enum_type: "OPEN", field_presence: "EXPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY" };
      var proto2Defaults = { enum_type: "CLOSED", field_presence: "EXPLICIT", json_format: "LEGACY_BEST_EFFORT", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "EXPANDED", utf8_validation: "NONE" };
      var proto3Defaults = { enum_type: "OPEN", field_presence: "IMPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY" };
      function ReflectionObject(name, options) {
        if (!util.isString(name))
          throw TypeError("name must be a string");
        if (options && !util.isObject(options))
          throw TypeError("options must be an object");
        this.options = options;
        this.parsedOptions = null;
        this.name = name;
        this._edition = null;
        this._defaultEdition = "proto2";
        this._features = {};
        this._featuresResolved = false;
        this.parent = null;
        this.resolved = false;
        this.comment = null;
        this.filename = null;
      }
      __name(ReflectionObject, "ReflectionObject");
      Object.defineProperties(ReflectionObject.prototype, {
        /**
         * Reference to the root namespace.
         * @name ReflectionObject#root
         * @type {Root}
         * @readonly
         */
        root: {
          get: /* @__PURE__ */ __name(function() {
            var ptr = this;
            while (ptr.parent !== null)
              ptr = ptr.parent;
            return ptr;
          }, "get")
        },
        /**
         * Full name including leading dot.
         * @name ReflectionObject#fullName
         * @type {string}
         * @readonly
         */
        fullName: {
          get: /* @__PURE__ */ __name(function() {
            var path = [this.name], ptr = this.parent;
            while (ptr) {
              path.unshift(ptr.name);
              ptr = ptr.parent;
            }
            return path.join(".");
          }, "get")
        }
      });
      ReflectionObject.prototype.toJSON = /* istanbul ignore next */
      /* @__PURE__ */ __name(function toJSON() {
        throw Error();
      }, "toJSON");
      ReflectionObject.prototype.onAdd = /* @__PURE__ */ __name(function onAdd(parent) {
        if (this.parent && this.parent !== parent)
          this.parent.remove(this);
        this.parent = parent;
        this.resolved = false;
        var root = parent.root;
        if (root instanceof Root)
          root._handleAdd(this);
      }, "onAdd");
      ReflectionObject.prototype.onRemove = /* @__PURE__ */ __name(function onRemove(parent) {
        var root = parent.root;
        if (root instanceof Root)
          root._handleRemove(this);
        this.parent = null;
        this.resolved = false;
      }, "onRemove");
      ReflectionObject.prototype.resolve = /* @__PURE__ */ __name(function resolve() {
        if (this.resolved)
          return this;
        if (this.root instanceof Root)
          this.resolved = true;
        return this;
      }, "resolve");
      ReflectionObject.prototype._resolveFeaturesRecursive = /* @__PURE__ */ __name(function _resolveFeaturesRecursive(edition) {
        return this._resolveFeatures(this._edition || edition);
      }, "_resolveFeaturesRecursive");
      ReflectionObject.prototype._resolveFeatures = /* @__PURE__ */ __name(function _resolveFeatures(edition) {
        if (this._featuresResolved) {
          return;
        }
        var defaults = {};
        if (!edition) {
          throw new Error("Unknown edition for " + this.fullName);
        }
        var protoFeatures = Object.assign(
          this.options ? Object.assign({}, this.options.features) : {},
          this._inferLegacyProtoFeatures(edition)
        );
        if (this._edition) {
          if (edition === "proto2") {
            defaults = Object.assign({}, proto2Defaults);
          } else if (edition === "proto3") {
            defaults = Object.assign({}, proto3Defaults);
          } else if (edition === "2023") {
            defaults = Object.assign({}, editions2023Defaults);
          } else {
            throw new Error("Unknown edition: " + edition);
          }
          this._features = Object.assign(defaults, protoFeatures || {});
          this._featuresResolved = true;
          return;
        }
        if (this.partOf instanceof OneOf) {
          var lexicalParentFeaturesCopy = Object.assign({}, this.partOf._features);
          this._features = Object.assign(lexicalParentFeaturesCopy, protoFeatures || {});
        } else if (this.declaringField) {
        } else if (this.parent) {
          var parentFeaturesCopy = Object.assign({}, this.parent._features);
          this._features = Object.assign(parentFeaturesCopy, protoFeatures || {});
        } else {
          throw new Error("Unable to find a parent for " + this.fullName);
        }
        if (this.extensionField) {
          this.extensionField._features = this._features;
        }
        this._featuresResolved = true;
      }, "_resolveFeatures");
      ReflectionObject.prototype._inferLegacyProtoFeatures = /* @__PURE__ */ __name(function _inferLegacyProtoFeatures() {
        return {};
      }, "_inferLegacyProtoFeatures");
      ReflectionObject.prototype.getOption = /* @__PURE__ */ __name(function getOption(name) {
        if (this.options)
          return this.options[name];
        return void 0;
      }, "getOption");
      ReflectionObject.prototype.setOption = /* @__PURE__ */ __name(function setOption(name, value, ifNotSet) {
        if (!this.options)
          this.options = {};
        if (/^features\./.test(name)) {
          util.setProperty(this.options, name, value, ifNotSet);
        } else if (!ifNotSet || this.options[name] === void 0) {
          if (this.getOption(name) !== value) this.resolved = false;
          this.options[name] = value;
        }
        return this;
      }, "setOption");
      ReflectionObject.prototype.setParsedOption = /* @__PURE__ */ __name(function setParsedOption(name, value, propName) {
        if (!this.parsedOptions) {
          this.parsedOptions = [];
        }
        var parsedOptions = this.parsedOptions;
        if (propName) {
          var opt = parsedOptions.find(function(opt2) {
            return Object.prototype.hasOwnProperty.call(opt2, name);
          });
          if (opt) {
            var newValue = opt[name];
            util.setProperty(newValue, propName, value);
          } else {
            opt = {};
            opt[name] = util.setProperty({}, propName, value);
            parsedOptions.push(opt);
          }
        } else {
          var newOpt = {};
          newOpt[name] = value;
          parsedOptions.push(newOpt);
        }
        return this;
      }, "setParsedOption");
      ReflectionObject.prototype.setOptions = /* @__PURE__ */ __name(function setOptions(options, ifNotSet) {
        if (options)
          for (var keys = Object.keys(options), i2 = 0; i2 < keys.length; ++i2)
            this.setOption(keys[i2], options[keys[i2]], ifNotSet);
        return this;
      }, "setOptions");
      ReflectionObject.prototype.toString = /* @__PURE__ */ __name(function toString() {
        var className = this.constructor.className, fullName = this.fullName;
        if (fullName.length)
          return className + " " + fullName;
        return className;
      }, "toString");
      ReflectionObject.prototype._editionToJSON = /* @__PURE__ */ __name(function _editionToJSON() {
        if (!this._edition || this._edition === "proto3") {
          return void 0;
        }
        return this._edition;
      }, "_editionToJSON");
      ReflectionObject._configure = function(Root_) {
        Root = Root_;
      };
    }
  });

  // node_modules/protobufjs/src/enum.js
  var require_enum = __commonJS({
    "node_modules/protobufjs/src/enum.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Enum;
      var ReflectionObject = require_object();
      ((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";
      var Namespace = require_namespace(), util = require_util();
      function Enum(name, values, options, comment, comments, valuesOptions) {
        ReflectionObject.call(this, name, options);
        if (values && typeof values !== "object")
          throw TypeError("values must be an object");
        this.valuesById = {};
        this.values = Object.create(this.valuesById);
        this.comment = comment;
        this.comments = comments || {};
        this.valuesOptions = valuesOptions;
        this._valuesFeatures = {};
        this.reserved = void 0;
        if (values) {
          for (var keys = Object.keys(values), i2 = 0; i2 < keys.length; ++i2)
            if (typeof values[keys[i2]] === "number")
              this.valuesById[this.values[keys[i2]] = values[keys[i2]]] = keys[i2];
        }
      }
      __name(Enum, "Enum");
      Enum.prototype._resolveFeatures = /* @__PURE__ */ __name(function _resolveFeatures(edition) {
        edition = this._edition || edition;
        ReflectionObject.prototype._resolveFeatures.call(this, edition);
        Object.keys(this.values).forEach((key) => {
          var parentFeaturesCopy = Object.assign({}, this._features);
          this._valuesFeatures[key] = Object.assign(parentFeaturesCopy, this.valuesOptions && this.valuesOptions[key] && this.valuesOptions[key].features);
        });
        return this;
      }, "_resolveFeatures");
      Enum.fromJSON = /* @__PURE__ */ __name(function fromJSON(name, json) {
        var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
        enm.reserved = json.reserved;
        if (json.edition)
          enm._edition = json.edition;
        enm._defaultEdition = "proto3";
        return enm;
      }, "fromJSON");
      Enum.prototype.toJSON = /* @__PURE__ */ __name(function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "options",
          this.options,
          "valuesOptions",
          this.valuesOptions,
          "values",
          this.values,
          "reserved",
          this.reserved && this.reserved.length ? this.reserved : void 0,
          "comment",
          keepComments ? this.comment : void 0,
          "comments",
          keepComments ? this.comments : void 0
        ]);
      }, "toJSON");
      Enum.prototype.add = /* @__PURE__ */ __name(function add(name, id, comment, options) {
        if (!util.isString(name))
          throw TypeError("name must be a string");
        if (!util.isInteger(id))
          throw TypeError("id must be an integer");
        if (this.values[name] !== void 0)
          throw Error("duplicate name '" + name + "' in " + this);
        if (this.isReservedId(id))
          throw Error("id " + id + " is reserved in " + this);
        if (this.isReservedName(name))
          throw Error("name '" + name + "' is reserved in " + this);
        if (this.valuesById[id] !== void 0) {
          if (!(this.options && this.options.allow_alias))
            throw Error("duplicate id " + id + " in " + this);
          this.values[name] = id;
        } else
          this.valuesById[this.values[name] = id] = name;
        if (options) {
          if (this.valuesOptions === void 0)
            this.valuesOptions = {};
          this.valuesOptions[name] = options || null;
        }
        this.comments[name] = comment || null;
        return this;
      }, "add");
      Enum.prototype.remove = /* @__PURE__ */ __name(function remove(name) {
        if (!util.isString(name))
          throw TypeError("name must be a string");
        var val = this.values[name];
        if (val == null)
          throw Error("name '" + name + "' does not exist in " + this);
        delete this.valuesById[val];
        delete this.values[name];
        delete this.comments[name];
        if (this.valuesOptions)
          delete this.valuesOptions[name];
        return this;
      }, "remove");
      Enum.prototype.isReservedId = /* @__PURE__ */ __name(function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      }, "isReservedId");
      Enum.prototype.isReservedName = /* @__PURE__ */ __name(function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      }, "isReservedName");
    }
  });

  // node_modules/protobufjs/src/encoder.js
  var require_encoder = __commonJS({
    "node_modules/protobufjs/src/encoder.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = encoder;
      var Enum = require_enum(), types = require_types(), util = require_util();
      function genTypePartial(gen, field, fieldIndex, ref) {
        return field.delimited ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
      }
      __name(genTypePartial, "genTypePartial");
      function encoder(mtype) {
        var gen = util.codegen(["m", "w"], mtype.name + "$encode")("if(!w)")("w=Writer.create()");
        var i2, ref;
        var fields = (
          /* initializes */
          mtype.fieldsArray.slice().sort(util.compareFieldsById)
        );
        for (var i2 = 0; i2 < fields.length; ++i2) {
          var field = fields[i2].resolve(), index = mtype._fieldsArray.indexOf(field), type = field.resolvedType instanceof Enum ? "int32" : field.type, wireType = types.basic[type];
          ref = "m" + util.safeProp(field.name);
          if (field.map) {
            gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", ref, field.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
            if (wireType === void 0) gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref);
            else gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen("}")("}");
          } else if (field.repeated) {
            gen("if(%s!=null&&%s.length){", ref, ref);
            if (field.packed && types.packed[type] !== void 0) {
              gen("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type, ref)("w.ldelim()");
            } else {
              gen("for(var i=0;i<%s.length;++i)", ref);
              if (wireType === void 0)
                genTypePartial(gen, field, index, ref + "[i]");
              else gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
            }
            gen("}");
          } else {
            if (field.optional) gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", ref, field.name);
            if (wireType === void 0)
              genTypePartial(gen, field, index, ref);
            else gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
          }
        }
        return gen("return w");
      }
      __name(encoder, "encoder");
    }
  });

  // node_modules/protobufjs/src/index-light.js
  var require_index_light = __commonJS({
    "node_modules/protobufjs/src/index-light.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var protobuf = module2.exports = require_index_minimal();
      protobuf.build = "light";
      function load(filename, root, callback) {
        if (typeof root === "function") {
          callback = root;
          root = new protobuf.Root();
        } else if (!root)
          root = new protobuf.Root();
        return root.load(filename, callback);
      }
      __name(load, "load");
      protobuf.load = load;
      function loadSync(filename, root) {
        if (!root)
          root = new protobuf.Root();
        return root.loadSync(filename);
      }
      __name(loadSync, "loadSync");
      protobuf.loadSync = loadSync;
      protobuf.encoder = require_encoder();
      protobuf.decoder = require_decoder();
      protobuf.verifier = require_verifier();
      protobuf.converter = require_converter();
      protobuf.ReflectionObject = require_object();
      protobuf.Namespace = require_namespace();
      protobuf.Root = require_root();
      protobuf.Enum = require_enum();
      protobuf.Type = require_type();
      protobuf.Field = require_field();
      protobuf.OneOf = require_oneof();
      protobuf.MapField = require_mapfield();
      protobuf.Service = require_service2();
      protobuf.Method = require_method();
      protobuf.Message = require_message();
      protobuf.wrappers = require_wrappers();
      protobuf.types = require_types();
      protobuf.util = require_util();
      protobuf.ReflectionObject._configure(protobuf.Root);
      protobuf.Namespace._configure(protobuf.Type, protobuf.Service, protobuf.Enum);
      protobuf.Root._configure(protobuf.Type);
      protobuf.Field._configure(protobuf.Type);
    }
  });

  // node_modules/protobufjs/src/tokenize.js
  var require_tokenize = __commonJS({
    "node_modules/protobufjs/src/tokenize.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = tokenize;
      var delimRe = /[\s{}=;:[\],'"()<>]/g, stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g, stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
      var setCommentRe = /^ *[*/]+ */, setCommentAltRe = /^\s*\*?\/*/, setCommentSplitRe = /\n/g, whitespaceRe = /\s/, unescapeRe = /\\(.?)/g;
      var unescapeMap = {
        "0": "\0",
        "r": "\r",
        "n": "\n",
        "t": "	"
      };
      function unescape(str) {
        return str.replace(unescapeRe, function($0, $1) {
          switch ($1) {
            case "\\":
            case "":
              return $1;
            default:
              return unescapeMap[$1] || "";
          }
        });
      }
      __name(unescape, "unescape");
      tokenize.unescape = unescape;
      function tokenize(source, alternateCommentMode) {
        source = source.toString();
        var offset = 0, length = source.length, line = 1, lastCommentLine = 0, comments = {};
        var stack = [];
        var stringDelim = null;
        function illegal(subject) {
          return Error("illegal " + subject + " (line " + line + ")");
        }
        __name(illegal, "illegal");
        function readString() {
          var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
          re.lastIndex = offset - 1;
          var match = re.exec(source);
          if (!match)
            throw illegal("string");
          offset = re.lastIndex;
          push(stringDelim);
          stringDelim = null;
          return unescape(match[1]);
        }
        __name(readString, "readString");
        function charAt(pos) {
          return source.charAt(pos);
        }
        __name(charAt, "charAt");
        function setComment(start, end, isLeading) {
          var comment = {
            type: source.charAt(start++),
            lineEmpty: false,
            leading: isLeading
          };
          var lookback;
          if (alternateCommentMode) {
            lookback = 2;
          } else {
            lookback = 3;
          }
          var commentOffset = start - lookback, c;
          do {
            if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === "\n") {
              comment.lineEmpty = true;
              break;
            }
          } while (c === " " || c === "	");
          var lines = source.substring(start, end).split(setCommentSplitRe);
          for (var i2 = 0; i2 < lines.length; ++i2)
            lines[i2] = lines[i2].replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").trim();
          comment.text = lines.join("\n").trim();
          comments[line] = comment;
          lastCommentLine = line;
        }
        __name(setComment, "setComment");
        function isDoubleSlashCommentLine(startOffset) {
          var endOffset = findEndOfLine(startOffset);
          var lineText = source.substring(startOffset, endOffset);
          var isComment = /^\s*\/\//.test(lineText);
          return isComment;
        }
        __name(isDoubleSlashCommentLine, "isDoubleSlashCommentLine");
        function findEndOfLine(cursor) {
          var endOffset = cursor;
          while (endOffset < length && charAt(endOffset) !== "\n") {
            endOffset++;
          }
          return endOffset;
        }
        __name(findEndOfLine, "findEndOfLine");
        function next() {
          if (stack.length > 0)
            return stack.shift();
          if (stringDelim)
            return readString();
          var repeat, prev, curr, start, isDoc, isLeadingComment = offset === 0;
          do {
            if (offset === length)
              return null;
            repeat = false;
            while (whitespaceRe.test(curr = charAt(offset))) {
              if (curr === "\n") {
                isLeadingComment = true;
                ++line;
              }
              if (++offset === length)
                return null;
            }
            if (charAt(offset) === "/") {
              if (++offset === length) {
                throw illegal("comment");
              }
              if (charAt(offset) === "/") {
                if (!alternateCommentMode) {
                  isDoc = charAt(start = offset + 1) === "/";
                  while (charAt(++offset) !== "\n") {
                    if (offset === length) {
                      return null;
                    }
                  }
                  ++offset;
                  if (isDoc) {
                    setComment(start, offset - 1, isLeadingComment);
                    isLeadingComment = true;
                  }
                  ++line;
                  repeat = true;
                } else {
                  start = offset;
                  isDoc = false;
                  if (isDoubleSlashCommentLine(offset - 1)) {
                    isDoc = true;
                    do {
                      offset = findEndOfLine(offset);
                      if (offset === length) {
                        break;
                      }
                      offset++;
                      if (!isLeadingComment) {
                        break;
                      }
                    } while (isDoubleSlashCommentLine(offset));
                  } else {
                    offset = Math.min(length, findEndOfLine(offset) + 1);
                  }
                  if (isDoc) {
                    setComment(start, offset, isLeadingComment);
                    isLeadingComment = true;
                  }
                  line++;
                  repeat = true;
                }
              } else if ((curr = charAt(offset)) === "*") {
                start = offset + 1;
                isDoc = alternateCommentMode || charAt(start) === "*";
                do {
                  if (curr === "\n") {
                    ++line;
                  }
                  if (++offset === length) {
                    throw illegal("comment");
                  }
                  prev = curr;
                  curr = charAt(offset);
                } while (prev !== "*" || curr !== "/");
                ++offset;
                if (isDoc) {
                  setComment(start, offset - 2, isLeadingComment);
                  isLeadingComment = true;
                }
                repeat = true;
              } else {
                return "/";
              }
            }
          } while (repeat);
          var end = offset;
          delimRe.lastIndex = 0;
          var delim = delimRe.test(charAt(end++));
          if (!delim)
            while (end < length && !delimRe.test(charAt(end)))
              ++end;
          var token = source.substring(offset, offset = end);
          if (token === '"' || token === "'")
            stringDelim = token;
          return token;
        }
        __name(next, "next");
        function push(token) {
          stack.push(token);
        }
        __name(push, "push");
        function peek() {
          if (!stack.length) {
            var token = next();
            if (token === null)
              return null;
            push(token);
          }
          return stack[0];
        }
        __name(peek, "peek");
        function skip(expected, optional) {
          var actual = peek(), equals = actual === expected;
          if (equals) {
            next();
            return true;
          }
          if (!optional)
            throw illegal("token '" + actual + "', '" + expected + "' expected");
          return false;
        }
        __name(skip, "skip");
        function cmnt(trailingLine) {
          var ret = null;
          var comment;
          if (trailingLine === void 0) {
            comment = comments[line - 1];
            delete comments[line - 1];
            if (comment && (alternateCommentMode || comment.type === "*" || comment.lineEmpty)) {
              ret = comment.leading ? comment.text : null;
            }
          } else {
            if (lastCommentLine < trailingLine) {
              peek();
            }
            comment = comments[trailingLine];
            delete comments[trailingLine];
            if (comment && !comment.lineEmpty && (alternateCommentMode || comment.type === "/")) {
              ret = comment.leading ? null : comment.text;
            }
          }
          return ret;
        }
        __name(cmnt, "cmnt");
        return Object.defineProperty({
          next,
          peek,
          push,
          skip,
          cmnt
        }, "line", {
          get: /* @__PURE__ */ __name(function() {
            return line;
          }, "get")
        });
      }
      __name(tokenize, "tokenize");
    }
  });

  // node_modules/protobufjs/src/parse.js
  var require_parse = __commonJS({
    "node_modules/protobufjs/src/parse.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = parse;
      parse.filename = null;
      parse.defaults = { keepCase: false };
      var tokenize = require_tokenize(), Root = require_root(), Type = require_type(), Field = require_field(), MapField = require_mapfield(), OneOf = require_oneof(), Enum = require_enum(), Service = require_service2(), Method = require_method(), ReflectionObject = require_object(), types = require_types(), util = require_util();
      var base10Re = /^[1-9][0-9]*$/, base10NegRe = /^-?[1-9][0-9]*$/, base16Re = /^0[x][0-9a-fA-F]+$/, base16NegRe = /^-?0[x][0-9a-fA-F]+$/, base8Re = /^0[0-7]+$/, base8NegRe = /^-?0[0-7]+$/, numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/, nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/, typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/;
      function parse(source, root, options) {
        if (!(root instanceof Root)) {
          options = root;
          root = new Root();
        }
        if (!options)
          options = parse.defaults;
        var preferTrailingComment = options.preferTrailingComment || false;
        var tn = tokenize(source, options.alternateCommentMode || false), next = tn.next, push = tn.push, peek = tn.peek, skip = tn.skip, cmnt = tn.cmnt;
        var head = true, pkg, imports, weakImports, edition = "proto2";
        var ptr = root;
        var topLevelObjects = [];
        var topLevelOptions = {};
        var applyCase = options.keepCase ? function(name) {
          return name;
        } : util.camelCase;
        function resolveFileFeatures() {
          topLevelObjects.forEach((obj) => {
            obj._edition = edition;
            Object.keys(topLevelOptions).forEach((opt) => {
              if (obj.getOption(opt) !== void 0) return;
              obj.setOption(opt, topLevelOptions[opt], true);
            });
          });
        }
        __name(resolveFileFeatures, "resolveFileFeatures");
        function illegal(token2, name, insideTryCatch) {
          var filename = parse.filename;
          if (!insideTryCatch)
            parse.filename = null;
          return Error("illegal " + (name || "token") + " '" + token2 + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
        }
        __name(illegal, "illegal");
        function readString() {
          var values = [], token2;
          do {
            if ((token2 = next()) !== '"' && token2 !== "'")
              throw illegal(token2);
            values.push(next());
            skip(token2);
            token2 = peek();
          } while (token2 === '"' || token2 === "'");
          return values.join("");
        }
        __name(readString, "readString");
        function readValue(acceptTypeRef) {
          var token2 = next();
          switch (token2) {
            case "'":
            case '"':
              push(token2);
              return readString();
            case "true":
            case "TRUE":
              return true;
            case "false":
            case "FALSE":
              return false;
          }
          try {
            return parseNumber(
              token2,
              /* insideTryCatch */
              true
            );
          } catch (e2) {
            if (acceptTypeRef && typeRefRe.test(token2))
              return token2;
            throw illegal(token2, "value");
          }
        }
        __name(readValue, "readValue");
        function readRanges(target, acceptStrings) {
          var token2, start;
          do {
            if (acceptStrings && ((token2 = peek()) === '"' || token2 === "'")) {
              var str = readString();
              target.push(str);
              if (edition >= 2023) {
                throw illegal(str, "id");
              }
            } else {
              try {
                target.push([start = parseId(next()), skip("to", true) ? parseId(next()) : start]);
              } catch (err) {
                if (acceptStrings && typeRefRe.test(token2) && edition >= 2023) {
                  target.push(token2);
                } else {
                  throw err;
                }
              }
            }
          } while (skip(",", true));
          var dummy = { options: void 0 };
          dummy.setOption = function(name, value) {
            if (this.options === void 0) this.options = {};
            this.options[name] = value;
          };
          ifBlock(
            dummy,
            /* @__PURE__ */ __name(function parseRange_block(token3) {
              if (token3 === "option") {
                parseOption(dummy, token3);
                skip(";");
              } else
                throw illegal(token3);
            }, "parseRange_block"),
            /* @__PURE__ */ __name(function parseRange_line() {
              parseInlineOptions(dummy);
            }, "parseRange_line")
          );
        }
        __name(readRanges, "readRanges");
        function parseNumber(token2, insideTryCatch) {
          var sign = 1;
          if (token2.charAt(0) === "-") {
            sign = -1;
            token2 = token2.substring(1);
          }
          switch (token2) {
            case "inf":
            case "INF":
            case "Inf":
              return sign * Infinity;
            case "nan":
            case "NAN":
            case "Nan":
            case "NaN":
              return NaN;
            case "0":
              return 0;
          }
          if (base10Re.test(token2))
            return sign * parseInt(token2, 10);
          if (base16Re.test(token2))
            return sign * parseInt(token2, 16);
          if (base8Re.test(token2))
            return sign * parseInt(token2, 8);
          if (numberRe.test(token2))
            return sign * parseFloat(token2);
          throw illegal(token2, "number", insideTryCatch);
        }
        __name(parseNumber, "parseNumber");
        function parseId(token2, acceptNegative) {
          switch (token2) {
            case "max":
            case "MAX":
            case "Max":
              return 536870911;
            case "0":
              return 0;
          }
          if (!acceptNegative && token2.charAt(0) === "-")
            throw illegal(token2, "id");
          if (base10NegRe.test(token2))
            return parseInt(token2, 10);
          if (base16NegRe.test(token2))
            return parseInt(token2, 16);
          if (base8NegRe.test(token2))
            return parseInt(token2, 8);
          throw illegal(token2, "id");
        }
        __name(parseId, "parseId");
        function parsePackage() {
          if (pkg !== void 0)
            throw illegal("package");
          pkg = next();
          if (!typeRefRe.test(pkg))
            throw illegal(pkg, "name");
          ptr = ptr.define(pkg);
          skip(";");
        }
        __name(parsePackage, "parsePackage");
        function parseImport() {
          var token2 = peek();
          var whichImports;
          switch (token2) {
            case "weak":
              whichImports = weakImports || (weakImports = []);
              next();
              break;
            case "public":
              next();
            // eslint-disable-next-line no-fallthrough
            default:
              whichImports = imports || (imports = []);
              break;
          }
          token2 = readString();
          skip(";");
          whichImports.push(token2);
        }
        __name(parseImport, "parseImport");
        function parseSyntax() {
          skip("=");
          edition = readString();
          if (edition < 2023)
            throw illegal(edition, "syntax");
          skip(";");
        }
        __name(parseSyntax, "parseSyntax");
        function parseEdition() {
          skip("=");
          edition = readString();
          const supportedEditions = ["2023"];
          if (!supportedEditions.includes(edition))
            throw illegal(edition, "edition");
          skip(";");
        }
        __name(parseEdition, "parseEdition");
        function parseCommon(parent, token2) {
          switch (token2) {
            case "option":
              parseOption(parent, token2);
              skip(";");
              return true;
            case "message":
              parseType(parent, token2);
              return true;
            case "enum":
              parseEnum(parent, token2);
              return true;
            case "service":
              parseService(parent, token2);
              return true;
            case "extend":
              parseExtension(parent, token2);
              return true;
          }
          return false;
        }
        __name(parseCommon, "parseCommon");
        function ifBlock(obj, fnIf, fnElse) {
          var trailingLine = tn.line;
          if (obj) {
            if (typeof obj.comment !== "string") {
              obj.comment = cmnt();
            }
            obj.filename = parse.filename;
          }
          if (skip("{", true)) {
            var token2;
            while ((token2 = next()) !== "}")
              fnIf(token2);
            skip(";", true);
          } else {
            if (fnElse)
              fnElse();
            skip(";");
            if (obj && (typeof obj.comment !== "string" || preferTrailingComment))
              obj.comment = cmnt(trailingLine) || obj.comment;
          }
        }
        __name(ifBlock, "ifBlock");
        function parseType(parent, token2) {
          if (!nameRe.test(token2 = next()))
            throw illegal(token2, "type name");
          var type = new Type(token2);
          ifBlock(type, /* @__PURE__ */ __name(function parseType_block(token3) {
            if (parseCommon(type, token3))
              return;
            switch (token3) {
              case "map":
                parseMapField(type, token3);
                break;
              case "required":
                if (edition !== "proto2")
                  throw illegal(token3);
              /* eslint-disable no-fallthrough */
              case "repeated":
                parseField(type, token3);
                break;
              case "optional":
                if (edition === "proto3") {
                  parseField(type, "proto3_optional");
                } else if (edition !== "proto2") {
                  throw illegal(token3);
                } else {
                  parseField(type, "optional");
                }
                break;
              case "oneof":
                parseOneOf(type, token3);
                break;
              case "extensions":
                readRanges(type.extensions || (type.extensions = []));
                break;
              case "reserved":
                readRanges(type.reserved || (type.reserved = []), true);
                break;
              default:
                if (edition === "proto2" || !typeRefRe.test(token3)) {
                  throw illegal(token3);
                }
                push(token3);
                parseField(type, "optional");
                break;
            }
          }, "parseType_block"));
          parent.add(type);
          if (parent === ptr) {
            topLevelObjects.push(type);
          }
        }
        __name(parseType, "parseType");
        function parseField(parent, rule, extend) {
          var type = next();
          if (type === "group") {
            parseGroup(parent, rule);
            return;
          }
          while (type.endsWith(".") || peek().startsWith(".")) {
            type += next();
          }
          if (!typeRefRe.test(type))
            throw illegal(type, "type");
          var name = next();
          if (!nameRe.test(name))
            throw illegal(name, "name");
          name = applyCase(name);
          skip("=");
          var field = new Field(name, parseId(next()), type, rule, extend);
          ifBlock(field, /* @__PURE__ */ __name(function parseField_block(token2) {
            if (token2 === "option") {
              parseOption(field, token2);
              skip(";");
            } else
              throw illegal(token2);
          }, "parseField_block"), /* @__PURE__ */ __name(function parseField_line() {
            parseInlineOptions(field);
          }, "parseField_line"));
          if (rule === "proto3_optional") {
            var oneof = new OneOf("_" + name);
            field.setOption("proto3_optional", true);
            oneof.add(field);
            parent.add(oneof);
          } else {
            parent.add(field);
          }
          if (parent === ptr) {
            topLevelObjects.push(field);
          }
        }
        __name(parseField, "parseField");
        function parseGroup(parent, rule) {
          if (edition >= 2023) {
            throw illegal("group");
          }
          var name = next();
          if (!nameRe.test(name))
            throw illegal(name, "name");
          var fieldName = util.lcFirst(name);
          if (name === fieldName)
            name = util.ucFirst(name);
          skip("=");
          var id = parseId(next());
          var type = new Type(name);
          type.group = true;
          var field = new Field(fieldName, id, name, rule);
          field.filename = parse.filename;
          ifBlock(type, /* @__PURE__ */ __name(function parseGroup_block(token2) {
            switch (token2) {
              case "option":
                parseOption(type, token2);
                skip(";");
                break;
              case "required":
              case "repeated":
                parseField(type, token2);
                break;
              case "optional":
                if (edition === "proto3") {
                  parseField(type, "proto3_optional");
                } else {
                  parseField(type, "optional");
                }
                break;
              case "message":
                parseType(type, token2);
                break;
              case "enum":
                parseEnum(type, token2);
                break;
              case "reserved":
                readRanges(type.reserved || (type.reserved = []), true);
                break;
              /* istanbul ignore next */
              default:
                throw illegal(token2);
            }
          }, "parseGroup_block"));
          parent.add(type).add(field);
        }
        __name(parseGroup, "parseGroup");
        function parseMapField(parent) {
          skip("<");
          var keyType = next();
          if (types.mapKey[keyType] === void 0)
            throw illegal(keyType, "type");
          skip(",");
          var valueType = next();
          if (!typeRefRe.test(valueType))
            throw illegal(valueType, "type");
          skip(">");
          var name = next();
          if (!nameRe.test(name))
            throw illegal(name, "name");
          skip("=");
          var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
          ifBlock(field, /* @__PURE__ */ __name(function parseMapField_block(token2) {
            if (token2 === "option") {
              parseOption(field, token2);
              skip(";");
            } else
              throw illegal(token2);
          }, "parseMapField_block"), /* @__PURE__ */ __name(function parseMapField_line() {
            parseInlineOptions(field);
          }, "parseMapField_line"));
          parent.add(field);
        }
        __name(parseMapField, "parseMapField");
        function parseOneOf(parent, token2) {
          if (!nameRe.test(token2 = next()))
            throw illegal(token2, "name");
          var oneof = new OneOf(applyCase(token2));
          ifBlock(oneof, /* @__PURE__ */ __name(function parseOneOf_block(token3) {
            if (token3 === "option") {
              parseOption(oneof, token3);
              skip(";");
            } else {
              push(token3);
              parseField(oneof, "optional");
            }
          }, "parseOneOf_block"));
          parent.add(oneof);
        }
        __name(parseOneOf, "parseOneOf");
        function parseEnum(parent, token2) {
          if (!nameRe.test(token2 = next()))
            throw illegal(token2, "name");
          var enm = new Enum(token2);
          ifBlock(enm, /* @__PURE__ */ __name(function parseEnum_block(token3) {
            switch (token3) {
              case "option":
                parseOption(enm, token3);
                skip(";");
                break;
              case "reserved":
                readRanges(enm.reserved || (enm.reserved = []), true);
                if (enm.reserved === void 0) enm.reserved = [];
                break;
              default:
                parseEnumValue(enm, token3);
            }
          }, "parseEnum_block"));
          parent.add(enm);
          if (parent === ptr) {
            topLevelObjects.push(enm);
          }
        }
        __name(parseEnum, "parseEnum");
        function parseEnumValue(parent, token2) {
          if (!nameRe.test(token2))
            throw illegal(token2, "name");
          skip("=");
          var value = parseId(next(), true), dummy = {
            options: void 0
          };
          dummy.getOption = function(name) {
            return this.options[name];
          };
          dummy.setOption = function(name, value2) {
            ReflectionObject.prototype.setOption.call(dummy, name, value2);
          };
          dummy.setParsedOption = function() {
            return void 0;
          };
          ifBlock(dummy, /* @__PURE__ */ __name(function parseEnumValue_block(token3) {
            if (token3 === "option") {
              parseOption(dummy, token3);
              skip(";");
            } else
              throw illegal(token3);
          }, "parseEnumValue_block"), /* @__PURE__ */ __name(function parseEnumValue_line() {
            parseInlineOptions(dummy);
          }, "parseEnumValue_line"));
          parent.add(token2, value, dummy.comment, dummy.parsedOptions || dummy.options);
        }
        __name(parseEnumValue, "parseEnumValue");
        function parseOption(parent, token2) {
          var option;
          var propName;
          var isOption = true;
          if (token2 === "option") {
            token2 = next();
          }
          while (token2 !== "=") {
            if (token2 === "(") {
              var parensValue = next();
              skip(")");
              token2 = "(" + parensValue + ")";
            }
            if (isOption) {
              isOption = false;
              if (token2.includes(".") && !token2.includes("(")) {
                var tokens = token2.split(".");
                option = tokens[0] + ".";
                token2 = tokens[1];
                continue;
              }
              option = token2;
            } else {
              propName = propName ? propName += token2 : token2;
            }
            token2 = next();
          }
          var name = propName ? option.concat(propName) : option;
          var optionValue = parseOptionValue(parent, name);
          propName = propName && propName[0] === "." ? propName.slice(1) : propName;
          option = option && option[option.length - 1] === "." ? option.slice(0, -1) : option;
          setParsedOption(parent, option, optionValue, propName);
        }
        __name(parseOption, "parseOption");
        function parseOptionValue(parent, name) {
          if (skip("{", true)) {
            var objectResult = {};
            while (!skip("}", true)) {
              if (!nameRe.test(token = next())) {
                throw illegal(token, "name");
              }
              if (token === null) {
                throw illegal(token, "end of input");
              }
              var value;
              var propName = token;
              skip(":", true);
              if (peek() === "{") {
                value = parseOptionValue(parent, name + "." + token);
              } else if (peek() === "[") {
                value = [];
                var lastValue;
                if (skip("[", true)) {
                  do {
                    lastValue = readValue(true);
                    value.push(lastValue);
                  } while (skip(",", true));
                  skip("]");
                  if (typeof lastValue !== "undefined") {
                    setOption(parent, name + "." + token, lastValue);
                  }
                }
              } else {
                value = readValue(true);
                setOption(parent, name + "." + token, value);
              }
              var prevValue = objectResult[propName];
              if (prevValue)
                value = [].concat(prevValue).concat(value);
              objectResult[propName] = value;
              skip(",", true);
              skip(";", true);
            }
            return objectResult;
          }
          var simpleValue = readValue(true);
          setOption(parent, name, simpleValue);
          return simpleValue;
        }
        __name(parseOptionValue, "parseOptionValue");
        function setOption(parent, name, value) {
          if (ptr === parent && /^features\./.test(name)) {
            topLevelOptions[name] = value;
            return;
          }
          if (parent.setOption)
            parent.setOption(name, value);
        }
        __name(setOption, "setOption");
        function setParsedOption(parent, name, value, propName) {
          if (parent.setParsedOption)
            parent.setParsedOption(name, value, propName);
        }
        __name(setParsedOption, "setParsedOption");
        function parseInlineOptions(parent) {
          if (skip("[", true)) {
            do {
              parseOption(parent, "option");
            } while (skip(",", true));
            skip("]");
          }
          return parent;
        }
        __name(parseInlineOptions, "parseInlineOptions");
        function parseService(parent, token2) {
          if (!nameRe.test(token2 = next()))
            throw illegal(token2, "service name");
          var service = new Service(token2);
          ifBlock(service, /* @__PURE__ */ __name(function parseService_block(token3) {
            if (parseCommon(service, token3)) {
              return;
            }
            if (token3 === "rpc")
              parseMethod(service, token3);
            else
              throw illegal(token3);
          }, "parseService_block"));
          parent.add(service);
          if (parent === ptr) {
            topLevelObjects.push(service);
          }
        }
        __name(parseService, "parseService");
        function parseMethod(parent, token2) {
          var commentText = cmnt();
          var type = token2;
          if (!nameRe.test(token2 = next()))
            throw illegal(token2, "name");
          var name = token2, requestType, requestStream, responseType, responseStream;
          skip("(");
          if (skip("stream", true))
            requestStream = true;
          if (!typeRefRe.test(token2 = next()))
            throw illegal(token2);
          requestType = token2;
          skip(")");
          skip("returns");
          skip("(");
          if (skip("stream", true))
            responseStream = true;
          if (!typeRefRe.test(token2 = next()))
            throw illegal(token2);
          responseType = token2;
          skip(")");
          var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
          method.comment = commentText;
          ifBlock(method, /* @__PURE__ */ __name(function parseMethod_block(token3) {
            if (token3 === "option") {
              parseOption(method, token3);
              skip(";");
            } else
              throw illegal(token3);
          }, "parseMethod_block"));
          parent.add(method);
        }
        __name(parseMethod, "parseMethod");
        function parseExtension(parent, token2) {
          if (!typeRefRe.test(token2 = next()))
            throw illegal(token2, "reference");
          var reference = token2;
          ifBlock(null, /* @__PURE__ */ __name(function parseExtension_block(token3) {
            switch (token3) {
              case "required":
              case "repeated":
                parseField(parent, token3, reference);
                break;
              case "optional":
                if (edition === "proto3") {
                  parseField(parent, "proto3_optional", reference);
                } else {
                  parseField(parent, "optional", reference);
                }
                break;
              default:
                if (edition === "proto2" || !typeRefRe.test(token3))
                  throw illegal(token3);
                push(token3);
                parseField(parent, "optional", reference);
                break;
            }
          }, "parseExtension_block"));
        }
        __name(parseExtension, "parseExtension");
        var token;
        while ((token = next()) !== null) {
          switch (token) {
            case "package":
              if (!head)
                throw illegal(token);
              parsePackage();
              break;
            case "import":
              if (!head)
                throw illegal(token);
              parseImport();
              break;
            case "syntax":
              if (!head)
                throw illegal(token);
              parseSyntax();
              break;
            case "edition":
              if (!head)
                throw illegal(token);
              parseEdition();
              break;
            case "option":
              parseOption(ptr, token);
              skip(";", true);
              break;
            default:
              if (parseCommon(ptr, token)) {
                head = false;
                continue;
              }
              throw illegal(token);
          }
        }
        resolveFileFeatures();
        parse.filename = null;
        return {
          "package": pkg,
          "imports": imports,
          weakImports,
          root
        };
      }
      __name(parse, "parse");
    }
  });

  // node_modules/protobufjs/src/common.js
  var require_common = __commonJS({
    "node_modules/protobufjs/src/common.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = common;
      var commonRe = /\/|\./;
      function common(name, json) {
        if (!commonRe.test(name)) {
          name = "google/protobuf/" + name + ".proto";
          json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
        }
        common[name] = json;
      }
      __name(common, "common");
      common("any", {
        /**
         * Properties of a google.protobuf.Any message.
         * @interface IAny
         * @type {Object}
         * @property {string} [typeUrl]
         * @property {Uint8Array} [bytes]
         * @memberof common
         */
        Any: {
          fields: {
            type_url: {
              type: "string",
              id: 1
            },
            value: {
              type: "bytes",
              id: 2
            }
          }
        }
      });
      var timeType;
      common("duration", {
        /**
         * Properties of a google.protobuf.Duration message.
         * @interface IDuration
         * @type {Object}
         * @property {number|Long} [seconds]
         * @property {number} [nanos]
         * @memberof common
         */
        Duration: timeType = {
          fields: {
            seconds: {
              type: "int64",
              id: 1
            },
            nanos: {
              type: "int32",
              id: 2
            }
          }
        }
      });
      common("timestamp", {
        /**
         * Properties of a google.protobuf.Timestamp message.
         * @interface ITimestamp
         * @type {Object}
         * @property {number|Long} [seconds]
         * @property {number} [nanos]
         * @memberof common
         */
        Timestamp: timeType
      });
      common("empty", {
        /**
         * Properties of a google.protobuf.Empty message.
         * @interface IEmpty
         * @memberof common
         */
        Empty: {
          fields: {}
        }
      });
      common("struct", {
        /**
         * Properties of a google.protobuf.Struct message.
         * @interface IStruct
         * @type {Object}
         * @property {Object.<string,IValue>} [fields]
         * @memberof common
         */
        Struct: {
          fields: {
            fields: {
              keyType: "string",
              type: "Value",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.Value message.
         * @interface IValue
         * @type {Object}
         * @property {string} [kind]
         * @property {0} [nullValue]
         * @property {number} [numberValue]
         * @property {string} [stringValue]
         * @property {boolean} [boolValue]
         * @property {IStruct} [structValue]
         * @property {IListValue} [listValue]
         * @memberof common
         */
        Value: {
          oneofs: {
            kind: {
              oneof: [
                "nullValue",
                "numberValue",
                "stringValue",
                "boolValue",
                "structValue",
                "listValue"
              ]
            }
          },
          fields: {
            nullValue: {
              type: "NullValue",
              id: 1
            },
            numberValue: {
              type: "double",
              id: 2
            },
            stringValue: {
              type: "string",
              id: 3
            },
            boolValue: {
              type: "bool",
              id: 4
            },
            structValue: {
              type: "Struct",
              id: 5
            },
            listValue: {
              type: "ListValue",
              id: 6
            }
          }
        },
        NullValue: {
          values: {
            NULL_VALUE: 0
          }
        },
        /**
         * Properties of a google.protobuf.ListValue message.
         * @interface IListValue
         * @type {Object}
         * @property {Array.<IValue>} [values]
         * @memberof common
         */
        ListValue: {
          fields: {
            values: {
              rule: "repeated",
              type: "Value",
              id: 1
            }
          }
        }
      });
      common("wrappers", {
        /**
         * Properties of a google.protobuf.DoubleValue message.
         * @interface IDoubleValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        DoubleValue: {
          fields: {
            value: {
              type: "double",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.FloatValue message.
         * @interface IFloatValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        FloatValue: {
          fields: {
            value: {
              type: "float",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.Int64Value message.
         * @interface IInt64Value
         * @type {Object}
         * @property {number|Long} [value]
         * @memberof common
         */
        Int64Value: {
          fields: {
            value: {
              type: "int64",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.UInt64Value message.
         * @interface IUInt64Value
         * @type {Object}
         * @property {number|Long} [value]
         * @memberof common
         */
        UInt64Value: {
          fields: {
            value: {
              type: "uint64",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.Int32Value message.
         * @interface IInt32Value
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        Int32Value: {
          fields: {
            value: {
              type: "int32",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.UInt32Value message.
         * @interface IUInt32Value
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        UInt32Value: {
          fields: {
            value: {
              type: "uint32",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.BoolValue message.
         * @interface IBoolValue
         * @type {Object}
         * @property {boolean} [value]
         * @memberof common
         */
        BoolValue: {
          fields: {
            value: {
              type: "bool",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.StringValue message.
         * @interface IStringValue
         * @type {Object}
         * @property {string} [value]
         * @memberof common
         */
        StringValue: {
          fields: {
            value: {
              type: "string",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.BytesValue message.
         * @interface IBytesValue
         * @type {Object}
         * @property {Uint8Array} [value]
         * @memberof common
         */
        BytesValue: {
          fields: {
            value: {
              type: "bytes",
              id: 1
            }
          }
        }
      });
      common("field_mask", {
        /**
         * Properties of a google.protobuf.FieldMask message.
         * @interface IDoubleValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        FieldMask: {
          fields: {
            paths: {
              rule: "repeated",
              type: "string",
              id: 1
            }
          }
        }
      });
      common.get = /* @__PURE__ */ __name(function get(file) {
        return common[file] || null;
      }, "get");
    }
  });

  // node_modules/protobufjs/src/index.js
  var require_src = __commonJS({
    "node_modules/protobufjs/src/index.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      var protobuf = module2.exports = require_index_light();
      protobuf.build = "full";
      protobuf.tokenize = require_tokenize();
      protobuf.parse = require_parse();
      protobuf.common = require_common();
      protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);
    }
  });

  // node_modules/protobufjs/index.js
  var require_protobufjs = __commonJS({
    "node_modules/protobufjs/index.js"(exports4, module2) {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = require_src();
    }
  });

  // src/lib/fetch.ts
  async function fetchApi(url, init) {
    init = await makeInit(init);
    console.log(url, init);
    return await fetch(url, init);
  }
  var import_protobufjs, makeInit, fetchFile, fetchText, BYTE_MARK, fetchProto;
  var init_fetch = __esm({
    "src/lib/fetch.ts"() {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      import_protobufjs = __toESM(require_protobufjs(), 1);
      makeInit = /* @__PURE__ */ __name(async (init) => {
        const defaultHeaders = {
          "Connection": "keep-alive",
          "Accept": "*/*",
          "Accept-Language": "*",
          "Sec-Fetch-Mode": "cors",
          "Accept-Encoding": "gzip, deflate"
        };
        if (init?.headers) {
          if (init.headers instanceof Headers) {
            for (const [name, value] of Object.entries(defaultHeaders)) {
              if (!init.headers.get(name)) init.headers.set(name, value);
            }
          } else {
            init.headers = {
              ...defaultHeaders,
              ...init.headers
            };
          }
        } else {
          init = {
            ...init,
            headers: defaultHeaders
          };
        }
        return init;
      }, "makeInit");
      __name(fetchApi, "fetchApi");
      fetchFile = /* @__PURE__ */ __name(async function(url, init) {
        init = await makeInit(init);
        console.log(url, init);
        try {
          const res = await fetch(url, init);
          if (!res.ok) return "";
          const arrayBuffer = await res.arrayBuffer();
          return Buffer.from(arrayBuffer).toString("base64");
        } catch (e2) {
          return "";
        }
      }, "fetchFile");
      fetchText = /* @__PURE__ */ __name(async function(url, init, encoding) {
        init = await makeInit(init);
        console.log(url, init);
        try {
          const res = await fetch(url, init);
          if (!res.ok) return "";
          const arrayBuffer = await res.arrayBuffer();
          const decoder = new TextDecoder(encoding);
          return decoder.decode(arrayBuffer);
        } catch (e2) {
          return "";
        }
      }, "fetchText");
      BYTE_MARK = BigInt((1 << 8) - 1);
      fetchProto = /* @__PURE__ */ __name(async function(protoInit, url, init) {
        const protoRoot = (0, import_protobufjs.parse)(protoInit.proto).root;
        const RequestMessge = protoRoot.lookupType(protoInit.requestType);
        if (RequestMessge.verify(protoInit.requestData || {})) {
          throw new Error("Invalid Proto");
        }
        const encodedrequest = RequestMessge.encode(
          protoInit.requestData || {}
        ).finish();
        const requestLength = BigInt(encodedrequest.length);
        const headers = new Uint8Array(
          Array(5).fill(0).map((v2, idx) => {
            if (idx === 0) return 0;
            return Number(requestLength >> BigInt(8 * (5 - idx - 1)) & BYTE_MARK);
          })
        );
        init = await makeInit(init);
        const bodyArray = new Uint8Array(headers.length + encodedrequest.length);
        bodyArray.set(headers, 0);
        bodyArray.set(encodedrequest, headers.length);
        return fetch(url, {
          method: "POST",
          ...init,
          body: bodyArray
        }).then((r) => r.arrayBuffer()).then((arr) => {
          const payload = new Uint8Array(arr);
          const length = Number(
            BigInt(payload[1] << 24) | BigInt(payload[2] << 16) | BigInt(payload[3] << 8) | BigInt(payload[4])
          );
          const ResponseMessage = protoRoot.lookupType(protoInit.responseType);
          return ResponseMessage.decode(payload.slice(5, 5 + length));
        });
      }, "fetchProto");
    }
  });

  // src/libs/fetch.ts
  var fetch_exports = {};
  __export(fetch_exports, {
    fetchApi: () => fetchApi,
    fetchFile: () => fetchFile,
    fetchProto: () => fetchProto,
    fetchText: () => fetchText
  });
  var init_fetch2 = __esm({
    "src/libs/fetch.ts"() {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      init_fetch();
    }
  });

  // src/types/constants.ts
  var NovelStatus, defaultCover;
  var init_constants = __esm({
    "src/types/constants.ts"() {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      NovelStatus = {
        Unknown: "Unknown",
        Ongoing: "Ongoing",
        Completed: "Completed",
        Licensed: "Licensed",
        PublishingFinished: "Publishing Finished",
        Cancelled: "Cancelled",
        OnHiatus: "On Hiatus"
      };
      defaultCover = "https://github.com/LNReader/lnreader-plugins/blob/main/icons/src/coverNotAvailable.jpg?raw=true";
    }
  });

  // src/libs/novelStatus.ts
  var novelStatus_exports = {};
  __export(novelStatus_exports, {
    NovelStatus: () => NovelStatus
  });
  var init_novelStatus = __esm({
    "src/libs/novelStatus.ts"() {
      "use strict";
      init_dirname();
      init_buffer2();
      init_process2();
      init_constants();
    }
  });

  // node_modules/dayjs/dayjs.min.js
  var require_dayjs_min = __commonJS({
    "node_modules/dayjs/dayjs.min.js"(exports4, module2) {
      init_dirname();
      init_buffer2();
      init_process2();
      !function(t2, e2) {
        "object" == typeof exports4 && "undefined" != typeof module2 ? module2.exports = e2() : "function" == typeof define && define.amd ? define(e2) : (t2 = "undefined" != typeof globalThis ? globalThis : t2 || self).dayjs = e2();
      }(exports4, function() {
        "use strict";
        var t2 = 1e3, e2 = 6e4, n2 = 36e5, r = "millisecond", i2 = "second", s = "minute", u2 = "hour", a2 = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l2 = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: /* @__PURE__ */ __name(function(t3) {
          var e3 = ["th", "st", "nd", "rd"], n3 = t3 % 100;
          return "[" + t3 + (e3[(n3 - 20) % 10] || e3[n3] || e3[0]) + "]";
        }, "ordinal") }, m = /* @__PURE__ */ __name(function(t3, e3, n3) {
          var r2 = String(t3);
          return !r2 || r2.length >= e3 ? t3 : "" + Array(e3 + 1 - r2.length).join(n3) + t3;
        }, "m"), v2 = { s: m, z: /* @__PURE__ */ __name(function(t3) {
          var e3 = -t3.utcOffset(), n3 = Math.abs(e3), r2 = Math.floor(n3 / 60), i3 = n3 % 60;
          return (e3 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i3, 2, "0");
        }, "z"), m: /* @__PURE__ */ __name(function t3(e3, n3) {
          if (e3.date() < n3.date()) return -t3(n3, e3);
          var r2 = 12 * (n3.year() - e3.year()) + (n3.month() - e3.month()), i3 = e3.clone().add(r2, c), s2 = n3 - i3 < 0, u3 = e3.clone().add(r2 + (s2 ? -1 : 1), c);
          return +(-(r2 + (n3 - i3) / (s2 ? i3 - u3 : u3 - i3)) || 0);
        }, "t"), a: /* @__PURE__ */ __name(function(t3) {
          return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
        }, "a"), p: /* @__PURE__ */ __name(function(t3) {
          return { M: c, y: h, w: o, d: a2, D: d, h: u2, m: s, s: i2, ms: r, Q: f }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
        }, "p"), u: /* @__PURE__ */ __name(function(t3) {
          return void 0 === t3;
        }, "u") }, g = "en", D = {};
        D[g] = M;
        var p = "$isDayjsObject", S = /* @__PURE__ */ __name(function(t3) {
          return t3 instanceof _ || !(!t3 || !t3[p]);
        }, "S"), w = /* @__PURE__ */ __name(function t3(e3, n3, r2) {
          var i3;
          if (!e3) return g;
          if ("string" == typeof e3) {
            var s2 = e3.toLowerCase();
            D[s2] && (i3 = s2), n3 && (D[s2] = n3, i3 = s2);
            var u3 = e3.split("-");
            if (!i3 && u3.length > 1) return t3(u3[0]);
          } else {
            var a3 = e3.name;
            D[a3] = e3, i3 = a3;
          }
          return !r2 && i3 && (g = i3), i3 || !r2 && g;
        }, "t"), O = /* @__PURE__ */ __name(function(t3, e3) {
          if (S(t3)) return t3.clone();
          var n3 = "object" == typeof e3 ? e3 : {};
          return n3.date = t3, n3.args = arguments, new _(n3);
        }, "O"), b2 = v2;
        b2.l = w, b2.i = S, b2.w = function(t3, e3) {
          return O(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
        };
        var _ = function() {
          function M2(t3) {
            this.$L = w(t3.locale, null, true), this.parse(t3), this.$x = this.$x || t3.x || {}, this[p] = true;
          }
          __name(M2, "M");
          var m2 = M2.prototype;
          return m2.parse = function(t3) {
            this.$d = function(t4) {
              var e3 = t4.date, n3 = t4.utc;
              if (null === e3) return /* @__PURE__ */ new Date(NaN);
              if (b2.u(e3)) return /* @__PURE__ */ new Date();
              if (e3 instanceof Date) return new Date(e3);
              if ("string" == typeof e3 && !/Z$/i.test(e3)) {
                var r2 = e3.match($);
                if (r2) {
                  var i3 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                  return n3 ? new Date(Date.UTC(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                }
              }
              return new Date(e3);
            }(t3), this.init();
          }, m2.init = function() {
            var t3 = this.$d;
            this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
          }, m2.$utils = function() {
            return b2;
          }, m2.isValid = function() {
            return !(this.$d.toString() === l2);
          }, m2.isSame = function(t3, e3) {
            var n3 = O(t3);
            return this.startOf(e3) <= n3 && n3 <= this.endOf(e3);
          }, m2.isAfter = function(t3, e3) {
            return O(t3) < this.startOf(e3);
          }, m2.isBefore = function(t3, e3) {
            return this.endOf(e3) < O(t3);
          }, m2.$g = function(t3, e3, n3) {
            return b2.u(t3) ? this[e3] : this.set(n3, t3);
          }, m2.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m2.valueOf = function() {
            return this.$d.getTime();
          }, m2.startOf = function(t3, e3) {
            var n3 = this, r2 = !!b2.u(e3) || e3, f2 = b2.p(t3), l3 = /* @__PURE__ */ __name(function(t4, e4) {
              var i3 = b2.w(n3.$u ? Date.UTC(n3.$y, e4, t4) : new Date(n3.$y, e4, t4), n3);
              return r2 ? i3 : i3.endOf(a2);
            }, "l"), $2 = /* @__PURE__ */ __name(function(t4, e4) {
              return b2.w(n3.toDate()[t4].apply(n3.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n3);
            }, "$"), y2 = this.$W, M3 = this.$M, m3 = this.$D, v3 = "set" + (this.$u ? "UTC" : "");
            switch (f2) {
              case h:
                return r2 ? l3(1, 0) : l3(31, 11);
              case c:
                return r2 ? l3(1, M3) : l3(0, M3 + 1);
              case o:
                var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                return l3(r2 ? m3 - D2 : m3 + (6 - D2), M3);
              case a2:
              case d:
                return $2(v3 + "Hours", 0);
              case u2:
                return $2(v3 + "Minutes", 1);
              case s:
                return $2(v3 + "Seconds", 2);
              case i2:
                return $2(v3 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m2.endOf = function(t3) {
            return this.startOf(t3, false);
          }, m2.$set = function(t3, e3) {
            var n3, o2 = b2.p(t3), f2 = "set" + (this.$u ? "UTC" : ""), l3 = (n3 = {}, n3[a2] = f2 + "Date", n3[d] = f2 + "Date", n3[c] = f2 + "Month", n3[h] = f2 + "FullYear", n3[u2] = f2 + "Hours", n3[s] = f2 + "Minutes", n3[i2] = f2 + "Seconds", n3[r] = f2 + "Milliseconds", n3)[o2], $2 = o2 === a2 ? this.$D + (e3 - this.$W) : e3;
            if (o2 === c || o2 === h) {
              var y2 = this.clone().set(d, 1);
              y2.$d[l3]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
            } else l3 && this.$d[l3]($2);
            return this.init(), this;
          }, m2.set = function(t3, e3) {
            return this.clone().$set(t3, e3);
          }, m2.get = function(t3) {
            return this[b2.p(t3)]();
          }, m2.add = function(r2, f2) {
            var d2, l3 = this;
            r2 = Number(r2);
            var $2 = b2.p(f2), y2 = /* @__PURE__ */ __name(function(t3) {
              var e3 = O(l3);
              return b2.w(e3.date(e3.date() + Math.round(t3 * r2)), l3);
            }, "y");
            if ($2 === c) return this.set(c, this.$M + r2);
            if ($2 === h) return this.set(h, this.$y + r2);
            if ($2 === a2) return y2(1);
            if ($2 === o) return y2(7);
            var M3 = (d2 = {}, d2[s] = e2, d2[u2] = n2, d2[i2] = t2, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
            return b2.w(m3, this);
          }, m2.subtract = function(t3, e3) {
            return this.add(-1 * t3, e3);
          }, m2.format = function(t3) {
            var e3 = this, n3 = this.$locale();
            if (!this.isValid()) return n3.invalidDate || l2;
            var r2 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i3 = b2.z(this), s2 = this.$H, u3 = this.$m, a3 = this.$M, o2 = n3.weekdays, c2 = n3.months, f2 = n3.meridiem, h2 = /* @__PURE__ */ __name(function(t4, n4, i4, s3) {
              return t4 && (t4[n4] || t4(e3, r2)) || i4[n4].slice(0, s3);
            }, "h"), d2 = /* @__PURE__ */ __name(function(t4) {
              return b2.s(s2 % 12 || 12, t4, "0");
            }, "d"), $2 = f2 || function(t4, e4, n4) {
              var r3 = t4 < 12 ? "AM" : "PM";
              return n4 ? r3.toLowerCase() : r3;
            };
            return r2.replace(y, function(t4, r3) {
              return r3 || function(t5) {
                switch (t5) {
                  case "YY":
                    return String(e3.$y).slice(-2);
                  case "YYYY":
                    return b2.s(e3.$y, 4, "0");
                  case "M":
                    return a3 + 1;
                  case "MM":
                    return b2.s(a3 + 1, 2, "0");
                  case "MMM":
                    return h2(n3.monthsShort, a3, c2, 3);
                  case "MMMM":
                    return h2(c2, a3);
                  case "D":
                    return e3.$D;
                  case "DD":
                    return b2.s(e3.$D, 2, "0");
                  case "d":
                    return String(e3.$W);
                  case "dd":
                    return h2(n3.weekdaysMin, e3.$W, o2, 2);
                  case "ddd":
                    return h2(n3.weekdaysShort, e3.$W, o2, 3);
                  case "dddd":
                    return o2[e3.$W];
                  case "H":
                    return String(s2);
                  case "HH":
                    return b2.s(s2, 2, "0");
                  case "h":
                    return d2(1);
                  case "hh":
                    return d2(2);
                  case "a":
                    return $2(s2, u3, true);
                  case "A":
                    return $2(s2, u3, false);
                  case "m":
                    return String(u3);
                  case "mm":
                    return b2.s(u3, 2, "0");
                  case "s":
                    return String(e3.$s);
                  case "ss":
                    return b2.s(e3.$s, 2, "0");
                  case "SSS":
                    return b2.s(e3.$ms, 3, "0");
                  case "Z":
                    return i3;
                }
                return null;
              }(t4) || i3.replace(":", "");
            });
          }, m2.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m2.diff = function(r2, d2, l3) {
            var $2, y2 = this, M3 = b2.p(d2), m3 = O(r2), v3 = (m3.utcOffset() - this.utcOffset()) * e2, g2 = this - m3, D2 = /* @__PURE__ */ __name(function() {
              return b2.m(y2, m3);
            }, "D");
            switch (M3) {
              case h:
                $2 = D2() / 12;
                break;
              case c:
                $2 = D2();
                break;
              case f:
                $2 = D2() / 3;
                break;
              case o:
                $2 = (g2 - v3) / 6048e5;
                break;
              case a2:
                $2 = (g2 - v3) / 864e5;
                break;
              case u2:
                $2 = g2 / n2;
                break;
              case s:
                $2 = g2 / e2;
                break;
              case i2:
                $2 = g2 / t2;
                break;
              default:
                $2 = g2;
            }
            return l3 ? $2 : b2.a($2);
          }, m2.daysInMonth = function() {
            return this.endOf(c).$D;
          }, m2.$locale = function() {
            return D[this.$L];
          }, m2.locale = function(t3, e3) {
            if (!t3) return this.$L;
            var n3 = this.clone(), r2 = w(t3, e3, true);
            return r2 && (n3.$L = r2), n3;
          }, m2.clone = function() {
            return b2.w(this.$d, this);
          }, m2.toDate = function() {
            return new Date(this.valueOf());
          }, m2.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m2.toISOString = function() {
            return this.$d.toISOString();
          }, m2.toString = function() {
            return this.$d.toUTCString();
          }, M2;
        }(), k = _.prototype;
        return O.prototype = k, [["$ms", r], ["$s", i2], ["$m", s], ["$H", u2], ["$W", a2], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t3) {
          k[t3[1]] = function(e3) {
            return this.$g(e3, t3[0], t3[1]);
          };
        }), O.extend = function(t3, e3) {
          return t3.$i || (t3(e3, _, O), t3.$i = true), O;
        }, O.locale = w, O.isDayjs = S, O.unix = function(t3) {
          return O(1e3 * t3);
        }, O.en = D[g], O.Ls = D, O.p = {}, O;
      });
    }
  });

  // .js/plugins/russian/ranobehub.js
  init_dirname();
  init_buffer2();
  init_process2();
  var l = function(l2, e2, a2, u2) {
    return new (a2 || (a2 = Promise))(function(v2, b2) {
      function t2(l3) {
        try {
          i2(u2.next(l3));
        } catch (l4) {
          b2(l4);
        }
      }
      __name(t2, "t");
      function n2(l3) {
        try {
          i2(u2.throw(l3));
        } catch (l4) {
          b2(l4);
        }
      }
      __name(n2, "n");
      function i2(l3) {
        var e3;
        l3.done ? v2(l3.value) : (e3 = l3.value, e3 instanceof a2 ? e3 : new a2(function(l4) {
          l4(e3);
        })).then(t2, n2);
      }
      __name(i2, "i");
      i2((u2 = u2.apply(l2, e2 || [])).next());
    });
  }, e = function(l2, e2) {
    var a2, u2, v2, b2 = { label: 0, sent: /* @__PURE__ */ __name(function() {
      if (1 & v2[0]) throw v2[1];
      return v2[1];
    }, "sent"), trys: [], ops: [] }, t2 = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
    return t2.next = n2(0), t2.throw = n2(1), t2.return = n2(2), "function" == typeof Symbol && (t2[Symbol.iterator] = function() {
      return this;
    }), t2;
    function n2(n3) {
      return function(i2) {
        return function(n4) {
          if (a2) throw new TypeError("Generator is already executing.");
          for (; t2 && (t2 = 0, n4[0] && (b2 = 0)), b2; ) try {
            if (a2 = 1, u2 && (v2 = 2 & n4[0] ? u2.return : n4[0] ? u2.throw || ((v2 = u2.return) && v2.call(u2), 0) : u2.next) && !(v2 = v2.call(u2, n4[1])).done) return v2;
            switch (u2 = 0, v2 && (n4 = [2 & n4[0], v2.value]), n4[0]) {
              case 0:
              case 1:
                v2 = n4;
                break;
              case 4:
                return b2.label++, { value: n4[1], done: false };
              case 5:
                b2.label++, u2 = n4[1], n4 = [0];
                continue;
              case 7:
                n4 = b2.ops.pop(), b2.trys.pop();
                continue;
              default:
                if (!(v2 = b2.trys, (v2 = v2.length > 0 && v2[v2.length - 1]) || 6 !== n4[0] && 2 !== n4[0])) {
                  b2 = 0;
                  continue;
                }
                if (3 === n4[0] && (!v2 || n4[1] > v2[0] && n4[1] < v2[3])) {
                  b2.label = n4[1];
                  break;
                }
                if (6 === n4[0] && b2.label < v2[1]) {
                  b2.label = v2[1], v2 = n4;
                  break;
                }
                if (v2 && b2.label < v2[2]) {
                  b2.label = v2[2], b2.ops.push(n4);
                  break;
                }
                v2[2] && b2.ops.pop(), b2.trys.pop();
                continue;
            }
            n4 = e2.call(l2, b2);
          } catch (l3) {
            n4 = [6, l3], u2 = 0;
          } finally {
            a2 = v2 = 0;
          }
          if (5 & n4[0]) throw n4[1];
          return { value: n4[0] ? n4[1] : void 0, done: true };
        }([n3, i2]);
      };
    }
    __name(n2, "n");
  }, a = function(l2) {
    return l2 && l2.__esModule ? l2 : { default: l2 };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var u = (init_filterInputs(), __toCommonJS(filterInputs_exports)), v = (init_fetch2(), __toCommonJS(fetch_exports)), b = (init_novelStatus(), __toCommonJS(novelStatus_exports)), t = a(require_dayjs_min()), n = { 1: b.NovelStatus.Ongoing, 2: b.NovelStatus.Completed, 3: b.NovelStatus.OnHiatus }, i = function() {
    function a2() {
      var l2 = this;
      this.id = "RNBH.org", this.name = "RanobeHub", this.version = "1.0.2", this.site = "https://ranobehub.org", this.icon = "src/ru/ranobehub/icon.png", this.resolveUrl = function(e2) {
        return l2.site + "/ranobe/" + e2;
      }, this.filters = { sort: { label: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430", value: "computed_rating", options: [{ label: "\u043F\u043E \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0443", value: "computed_rating" }, { label: "\u043F\u043E \u0434\u0430\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F", value: "last_chapter_at" }, { label: "\u043F\u043E \u0434\u0430\u0442\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F", value: "created_at" }, { label: "\u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E", value: "name_rus" }, { label: "\u043F\u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430\u043C", value: "views" }, { label: "\u043F\u043E \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0443 \u0433\u043B\u0430\u0432", value: "count_chapters" }, { label: "\u043F\u043E \u043E\u0431\u044A\u0435\u043C\u0443 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430", value: "count_of_symbols" }], type: u.FilterTypes.Picker }, status: { label: "\u0421\u0442\u0430\u0442\u0443\u0441 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430", value: "", options: [{ label: "\u041B\u044E\u0431\u043E\u0439", value: "" }, { label: "\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435", value: "1" }, { label: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E", value: "2" }, { label: "\u0417\u0430\u043C\u043E\u0440\u043E\u0436\u0435\u043D\u043E", value: "3" }, { label: "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E", value: "4" }], type: u.FilterTypes.Picker }, country: { label: "\u0422\u0438\u043F", value: [], options: [{ label: "\u041A\u0438\u0442\u0430\u0439", value: "2" }, { label: "\u041A\u043E\u0440\u0435\u044F", value: "3" }, { label: "\u0421\u0428\u0410", value: "4" }, { label: "\u042F\u043F\u043E\u043D\u0438\u044F", value: "1" }], type: u.FilterTypes.CheckboxGroup }, events: { label: "\u0421\u043E\u0431\u044B\u0442\u0438\u044F", value: { include: [], exclude: [] }, options: [{ label: "[\u041D\u0430\u0433\u0440\u0430\u0436\u0434\u0435\u043D\u043D\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430]", value: "611" }, { label: "18+", value: "338" }, { label: "\u0410\u0432\u0430\u043D\u0442\u044E\u0440\u0438\u0441\u0442\u044B", value: "353" }, { label: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u043E\u043D\u044B", value: "538" }, { label: "\u0410\u0433\u0440\u0435\u0441\u0441\u0438\u0432\u043D\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "434" }, { label: "\u0410\u0434", value: "509" }, { label: "\u0410\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F \u0432 \u0440\u0430\u0434\u0438\u043E\u043F\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0443", value: "522" }, { label: "\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u044F", value: "25" }, { label: "\u0410\u043A\u0442\u0435\u0440\u044B \u043E\u0437\u0432\u0443\u0447\u043A\u0438", value: "578" }, { label: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "132" }, { label: "\u0410\u043B\u0445\u0438\u043C\u0438\u044F", value: "116" }, { label: "\u0410\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u043C\u0438\u0440", value: "28" }, { label: "\u0410\u043C\u043D\u0435\u0437\u0438\u044F/\u041F\u043E\u0442\u0435\u0440\u044F \u043F\u0430\u043C\u044F\u0442\u0438", value: "247" }, { label: "\u0410\u043D\u0430\u0431\u0438\u043E\u0437", value: "657" }, { label: "\u0410\u043D\u0433\u0435\u043B\u044B", value: "218" }, { label: "\u0410\u043D\u0434\u0440\u043E\u0433\u0438\u043D\u043D\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "217" }, { label: "\u0410\u043D\u0434\u0440\u043E\u0438\u0434\u044B", value: "82" }, { label: "\u0410\u043D\u0442\u0438-\u043C\u0430\u0433\u0438\u044F", value: "471" }, { label: "\u0410\u043D\u0442\u0438\u0433\u0435\u0440\u043E\u0439", value: "346" }, { label: "\u0410\u043D\u0442\u0438\u043A\u0432\u0430\u0440\u043D\u044B\u0439 \u043C\u0430\u0433\u0430\u0437\u0438\u043D", value: "572" }, { label: "\u0410\u043D\u0442\u0438\u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "562" }, { label: "\u0410\u043D\u0442\u0438\u0443\u0442\u043E\u043F\u0438\u044F", value: "663" }, { label: "\u0410\u043F\u0430\u0442\u0438\u0447\u043D\u044B\u0439 \u043F\u0440\u043E\u0442\u0430\u0433\u043E\u043D\u0438\u0441\u0442", value: "29" }, { label: "\u0410\u043F\u043E\u043A\u0430\u043B\u0438\u043F\u0441\u0438\u0441", value: "314" }, { label: "\u0410\u0440\u0430\u043D\u0436\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0431\u0440\u0430\u043A", value: "285" }, { label: "\u0410\u0440\u043C\u0438\u044F", value: "598" }, { label: "\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u044B", value: "117" }, { label: "\u0410\u0440\u0442\u0438\u0441\u0442\u044B", value: "460" }, { label: "\u0411\u0430\u043D\u0434\u044B", value: "581" }, { label: "\u0411\u0414\u0421\u041C", value: "676" }, { label: "\u0411\u0435\u0434\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "309" }, { label: "\u0411\u0435\u0437\u0436\u0430\u043B\u043E\u0441\u0442\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "144" }, { label: "\u0411\u0435\u0437\u0437\u0430\u0431\u043E\u0442\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "355" }, { label: "\u0411\u0435\u0437\u0443\u0441\u043B\u043E\u0432\u043D\u0430\u044F \u043B\u044E\u0431\u043E\u0432\u044C", value: "650" }, { label: "\u0411\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0441\u0442\u044C", value: "131" }, { label: "\u0411\u0435\u0441\u043F\u043E\u043B\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "222" }, { label: "\u0411\u0435\u0441\u0441\u043C\u0435\u0440\u0442\u043D\u044B\u0435", value: "275" }, { label: "\u0411\u0435\u0441\u0441\u0442\u0440\u0430\u0448\u043D\u044B\u0439 \u043F\u0440\u043E\u0442\u0430\u0433\u043E\u043D\u0438\u0441\u0442", value: "619" }, { label: "\u0411\u0435\u0441\u0441\u0442\u044B\u0434\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "256" }, { label: "\u0411\u0435\u0441\u0447\u0435\u0441\u0442\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "699" }, { label: "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430", value: "342" }, { label: "\u0411\u0438\u0437\u043D\u0435\u0441\u043C\u0435\u043D ", value: "813" }, { label: "\u0411\u0438\u043E\u0447\u0438\u043F", value: "120" }, { label: "\u0411\u0438\u0441\u0435\u043A\u0441\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "822" }, { label: "\u0411\u043B\u0438\u0437\u043D\u0435\u0446\u044B", value: "148" }, { label: "\u0411\u043E\u0433\u0438", value: "211" }, { label: "\u0411\u043E\u0433\u0438\u043D\u0438", value: "356" }, { label: "\u0411\u043E\u0435\u0432\u0430\u044F \u0430\u043A\u0430\u0434\u0435\u043C\u0438\u044F", value: "369" }, { label: "\u0411\u043E\u0435\u0432\u044B\u0435 \u0434\u0443\u0445\u0438", value: "347" }, { label: "\u0411\u043E\u0435\u0432\u044B\u0435 \u0441\u043E\u0440\u0435\u0432\u043D\u043E\u0432\u0430\u043D\u0438\u044F", value: "422" }, { label: "\u0411\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u0437\u0430\u0449\u0438\u0442\u0430", value: "336" }, { label: "\u0411\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0441\u0438\u043B\u044B", value: "224" }, { label: "\u0411\u043E\u043B\u044C\u0448\u0430\u044F \u0440\u0430\u0437\u043D\u0438\u0446\u0430 \u0432 \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0435 \u043C\u0435\u0436\u0434\u0443 \u0433\u0435\u0440\u043E\u0435\u043C \u0438 \u0435\u0433\u043E \u043B\u044E\u0431\u043E\u0432\u043D\u044B\u043C \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u043C", value: "348" }, { label: "\u0411\u043E\u0440\u044C\u0431\u0430 \u0437\u0430 \u0432\u043B\u0430\u0441\u0442\u044C", value: "544" }, { label: "\u0411\u0440\u0430\u043A", value: "363" }, { label: "\u0411\u0440\u0430\u043A \u043F\u043E \u0440\u0430\u0441\u0447\u0435\u0442\u0443", value: "65" }, { label: "\u0411\u0440\u0430\u0442\u0441\u043A\u0438\u0439 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441", value: "31" }, { label: "\u0411\u0440\u0430\u0442\u0441\u0442\u0432\u043E", value: "413" }, { label: "\u0411\u0440\u0430\u0442\u044C\u044F \u0438 \u0441\u0435\u0441\u0442\u0440\u044B", value: "518" }, { label: "\u0411\u0443\u0434\u0434\u0438\u0437\u043C", value: "742" }, { label: "\u0411\u044B\u0441\u0442\u0440\u0430\u044F \u043A\u0443\u043B\u044C\u0442\u0438\u0432\u0430\u0446\u0438\u044F", value: "273" }, { label: "\u0411\u044B\u0441\u0442\u0440\u043E\u043E\u0431\u0443\u0447\u0430\u0435\u043C\u044B\u0439", value: "221" }, { label: "\u0412\u0430\u043B\u044C\u043A\u0438\u0440\u0438\u0438", value: "667" }, { label: "\u0412\u0430\u043C\u043F\u0438\u0440\u044B", value: "266" }, { label: "\u0412\u0430\u043D\u0448\u043E\u0442", value: "679" }, { label: "\u0412\u0435\u0434\u044C\u043C\u044B", value: "169" }, { label: "\u0412\u0435\u0436\u043B\u0438\u0432\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "289" }, { label: "\u0412\u0435\u0440\u043D\u044B\u0435 \u043F\u043E\u0434\u0447\u0438\u043D\u0435\u043D\u043D\u044B\u0435", value: "225" }, { label: "\u0412\u0437\u0440\u043E\u0441\u043B\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "183" }, { label: "\u0412\u0438\u0434\u0438\u0442 \u0442\u043E, \u0447\u0435\u0433\u043E \u043D\u0435 \u0432\u0438\u0434\u044F\u0442 \u0434\u0440\u0443\u0433\u0438\u0435", value: "636" }, { label: "\u0412\u0438\u0440\u0442\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C", value: "313" }, { label: "\u0412\u043B\u0430\u0434\u0435\u043B\u0435\u0446 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430", value: "653" }, { label: "\u0412\u043D\u0435\u0437\u0430\u043F\u043D\u0430\u044F \u0441\u0438\u043B\u0430", value: "376" }, { label: "\u0412\u043D\u0435\u0437\u0430\u043F\u043D\u043E\u0435 \u0431\u043E\u0433\u0430\u0442\u0441\u0442\u0432\u043E", value: "802" }, { label: "\u0412\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434 \u043E\u0442\u043B\u0438\u0447\u0430\u0435\u0442\u0441\u044F \u043E\u0442 \u0444\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430", value: "334" }, { label: "\u0412\u043E\u0435\u043D\u043D\u044B\u0435 \u041B\u0435\u0442\u043E\u043F\u0438\u0441\u0438", value: "740" }, { label: "\u0412\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u0438\u0437 \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u043C\u0438\u0440\u0430", value: "673" }, { label: "\u0412\u043E\u0439\u043D\u044B", value: "58" }, { label: "\u0412\u043E\u043A\u0430\u043B\u043E\u0438\u0434", value: "678" }, { label: "\u0412\u043E\u043B\u0448\u0435\u0431\u043D\u0438\u043A\u0438/\u0412\u043E\u043B\u0448\u0435\u0431\u043D\u0438\u0446\u044B", value: "477" }, { label: "\u0412\u043E\u043B\u0448\u0435\u0431\u043D\u044B\u0435 \u0437\u0432\u0435\u0440\u0438", value: "201" }, { label: "\u0412\u043E\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u043C\u044B\u0439 \u0434\u0440\u0443\u0433", value: "614" }, { label: "\u0412\u043E\u0440\u044B", value: "326" }, { label: "\u0412\u043E\u0441\u043A\u0440\u0435\u0448\u0435\u043D\u0438\u0435", value: "78" }, { label: "\u0412\u0440\u0430\u0433\u0438 \u0441\u0442\u0430\u043D\u043E\u0432\u044F\u0442\u0441\u044F \u0432\u043E\u0437\u043B\u044E\u0431\u043B\u0435\u043D\u043D\u044B\u043C\u0438", value: "428" }, { label: "\u0412\u0440\u0430\u0433\u0438 \u0441\u0442\u0430\u043D\u043E\u0432\u044F\u0442\u0441\u044F \u0441\u043E\u044E\u0437\u043D\u0438\u043A\u0430\u043C\u0438", value: "502" }, { label: "\u0412\u0440\u0430\u0442\u0430 \u0432 \u0434\u0440\u0443\u0433\u043E\u0439 \u043C\u0438\u0440", value: "558" }, { label: "\u0412\u0440\u0430\u0447\u0438", value: "286" }, { label: "\u0412\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0439 \u043F\u0430\u0440\u0430\u0434\u043E\u043A\u0441", value: "163" }, { label: "\u0412\u0441\u0435\u043C\u043E\u0433\u0443\u0449\u0438\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "42" }, { label: "\u0412\u0442\u043E\u0440\u0436\u0435\u043D\u0438\u0435 \u043D\u0430 \u0437\u0435\u043C\u043B\u044E", value: "77" }, { label: "\u0412\u0442\u043E\u0440\u043E\u0439 \u0448\u0430\u043D\u0441", value: "112" }, { label: "\u0412\u0443\u0430\u0439\u0435\u0440\u0438\u0437\u043C", value: "851" }, { label: "\u0412\u044B\u0436\u0438\u0432\u0430\u043D\u0438\u0435", value: "290" }, { label: "\u0412\u044B\u0441\u043E\u043A\u043E\u043C\u0435\u0440\u043D\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "268" }, { label: "\u0413\u0430\u0434\u0430\u043D\u0438\u0435", value: "540" }, { label: "\u0413\u0430\u0440\u0435\u043C \u0440\u0430\u0431\u043E\u0432", value: "828" }, { label: "\u0413\u0435\u0439\u043C\u0435\u0440\u044B", value: "302" }, { label: "\u0413\u0435\u043D\u0435\u0440\u0430\u043B\u044B", value: "223" }, { label: "\u0413\u0435\u043D\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438", value: "620" }, { label: "\u0413\u0435\u043D\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "566" }, { label: "\u0413\u0435\u0440\u043E\u0438", value: "173" }, { label: "\u0413\u0435\u0440\u043E\u0438\u043D\u044F \u2014 \u0441\u043E\u0440\u0432\u0430\u043D\u0435\u0446", value: "525" }, { label: "\u0413\u0435\u0440\u043E\u0439 \u0432\u043B\u044E\u0431\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0432\u044B\u043C", value: "64" }, { label: "\u0413\u0435\u0442\u0435\u0440\u043E\u0445\u0440\u043E\u043C\u0438\u044F", value: "510" }, { label: "\u0413\u0438\u043B\u044C\u0434\u0438\u0438", value: "323" }, { label: "\u0413\u0438\u043F\u043D\u043E\u0442\u0438\u0437\u043C", value: "768" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u2014 \u0431\u043E\u0433", value: "486" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u2014 \u0433\u0443\u043C\u0430\u043D\u043E\u0438\u0434", value: "595" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u2014 \u0436\u0435\u043D\u0449\u0438\u043D\u0430", value: "63" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u2014 \u043C\u0443\u0436\u0447\u0438\u043D\u0430", value: "39" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u2014 \u043D\u0430\u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0443 \u0447\u0435\u043B\u043E\u0432\u0435\u043A", value: "362" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u2014 \u043E\u0442\u0435\u0446", value: "859" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u2014 \u0440\u0430\u0431", value: "832" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u2014 \u0440\u0435\u0431\u0435\u043D\u043E\u043A", value: "415" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u2014 \u0440\u0443\u0431\u0430\u043A\u0430", value: "400" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u2014 \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u0435\u043B\u044C \u0433\u0430\u0440\u0435\u043C\u0430", value: "439" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u0432\u043B\u044E\u0431\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0432\u044B\u043C", value: "655" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u0438\u0433\u0440\u0430\u0435\u0442 \u0440\u043E\u043B\u044C", value: "396" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u043D\u043E\u0441\u0438\u0442 \u043E\u0447\u043A\u0438", value: "637" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u043F\u0430\u0446\u0438\u0444\u0438\u0441\u0442", value: "675" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u0441 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u043C\u0438 \u0442\u0435\u043B\u0430\u043C\u0438", value: "628" }, { label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439 \u0441\u0438\u043B\u0435\u043D \u0441 \u0441\u0430\u043C\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u0430", value: "45" }, { label: "\u0413\u043B\u0430\u0434\u0438\u0430\u0442\u043E\u0440\u044B", value: "549" }, { label: "\u0413\u043B\u0443\u043F\u043E\u0432\u0430\u0442\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "295" }, { label: "\u0413\u043E\u0431\u043B\u0438\u043D\u044B", value: "529" }, { label: "\u0413\u043E\u043B\u0435\u043C\u044B", value: "569" }, { label: "\u0413\u043E\u043C\u0443\u043D\u043A\u0443\u043B", value: "850" }, { label: "\u0413\u043E\u0440\u043D\u0438\u0447\u043D\u044B\u0435", value: "380" }, { label: "\u0413\u043E\u0441\u043F\u0438\u0442\u0430\u043B\u044C", value: "1043" }, { label: "\u0413\u043E\u0442\u043E\u0432\u043A\u0430", value: "193" }, { label: "\u0413\u0440\u0438\u043D\u0434\u0438\u043D\u0433", value: "303" }, { label: "\u0414\u0430\u043E \u041A\u043E\u043C\u043F\u0430\u043D\u044C\u043E\u043D", value: "384" }, { label: "\u0414\u0430\u043E\u0441\u0438\u0437\u043C", value: "792" }, { label: "\u0414\u0430\u0440\u043A", value: "151" }, { label: "\u0414\u0432\u0430\u0440\u0444\u044B", value: "220" }, { label: "\u0414\u0432\u043E\u0439\u043D\u0430\u044F \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C", value: "601" }, { label: "\u0414\u0432\u043E\u0439\u043D\u0438\u043A", value: "547" }, { label: "\u0414\u0432\u043E\u0440\u0435\u0446\u043A\u0438\u0439", value: "623" }, { label: "\u0414\u0432\u043E\u0440\u044F\u043D\u0435", value: "41" }, { label: "\u0414\u0432\u043E\u0440\u044F\u043D\u0441\u0442\u0432\u043E/\u0410\u0440\u0438\u0441\u0442\u043E\u043A\u0440\u0430\u0442\u0438\u044F", value: "354" }, { label: "\u0414\u0435\u0432\u0443\u0448\u043A\u0438-\u043C\u043E\u043D\u0441\u0442\u0440\u044B", value: "634" }, { label: "\u0414\u0435\u043C\u043E\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0442\u0435\u0445\u043D\u0438\u043A\u0430 \u043A\u0443\u043B\u044C\u0442\u0438\u0432\u0430\u0446\u0438\u0438", value: "706" }, { label: "\u0414\u0435\u043C\u043E\u043D\u044B", value: "6" }, { label: "\u0414\u0435\u043D\u0435\u0436\u043D\u044B\u0439 \u0434\u043E\u043B\u0433", value: "841" }, { label: "\u0414\u0435\u043F\u0440\u0435\u0441\u0441\u0438\u044F", value: "494" }, { label: "\u0414\u0435\u0442\u0435\u043A\u0442\u0438\u0432\u044B", value: "561" }, { label: "\u0414\u0438\u0441\u043A\u0440\u0438\u043C\u0438\u043D\u0430\u0446\u0438\u044F", value: "34" }, { label: "\u0414\u043E\u0431\u044B\u0447\u0430 \u0434\u0435\u043D\u0435\u0433 \u043E\u0434\u043D\u043E \u0438\u0437 \u043E\u0441\u043D\u043E\u0432\u043D\u044B\u0445 \u0441\u0442\u0440\u0435\u043C\u043B\u0435\u043D\u0438\u0439 \u0433\u043B\u0430\u0432\u043D\u043E\u0433\u043E \u0433\u0435\u0440\u043E\u044F", value: "307" }, { label: "\u0414\u043E\u043B\u0433\u0430\u044F \u0440\u0430\u0437\u043B\u0443\u043A\u0430", value: "200" }, { label: "\u0414\u043E\u043C\u0430\u0448\u043D\u0438\u0435 \u0434\u0435\u043B\u0430", value: "178" }, { label: "\u0414\u043E\u043C\u043E\u0433\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E", value: "394" }, { label: "\u0414\u0440\u0430\u043A\u043E\u043D\u044B", value: "195" }, { label: "\u0414\u0440\u0430\u043A\u043E\u043D\u044C\u0438 \u0432\u0441\u0430\u0434\u043D\u0438\u043A\u0438", value: "555" }, { label: "\u0414\u0440\u0435\u0432\u043D\u0438\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0430", value: "102" }, { label: "\u0414\u0440\u0435\u0432\u043D\u0438\u0439 \u041A\u0438\u0442\u0430\u0439", value: "284" }, { label: "\u0414\u0440\u0443\u0436\u0431\u0430", value: "97" }, { label: "\u0414\u0440\u0443\u0437\u044C\u044F \u0434\u0435\u0442\u0441\u0442\u0432\u0430", value: "170" }, { label: "\u0414\u0440\u0443\u0437\u044C\u044F \u0441\u0442\u0430\u043D\u043E\u0432\u044F\u0442\u0441\u044F \u0432\u0440\u0430\u0433\u0430\u043C\u0438", value: "507" }, { label: "\u0414\u0440\u0443\u0438\u0434\u044B", value: "427" }, { label: "\u0414\u0443\u0445 \u043B\u0438\u0441\u044B", value: "842" }, { label: "\u0414\u0443\u0445\u0438/\u041F\u0440\u0438\u0437\u0440\u0430\u043A\u0438", value: "46" }, { label: "\u0414\u0443\u0445\u043E\u0432\u043D\u044B\u0439 \u0441\u043E\u0432\u0435\u0442\u043D\u0438\u043A", value: "351" }, { label: "\u0414\u0443\u0448\u0435\u0432\u043D\u043E\u0441\u0442\u044C", value: "587" }, { label: "\u0414\u0443\u0448\u0438", value: "136" }, { label: "\u0415\u0432\u0440\u043E\u043F\u0435\u0439\u0441\u043A\u0430\u044F \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430", value: "457" }, { label: "\u0401\u043A\u0430\u0438", value: "516" }, { label: "\u0415\u0441\u0442\u044C \u0430\u043D\u0438\u043C\u0435-\u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F", value: "26" }, { label: "\u0415\u0441\u0442\u044C \u0432\u0438\u0434\u0435\u043E\u0438\u0433\u0440\u0430 \u043F\u043E \u043C\u043E\u0442\u0438\u0432\u0430\u043C", value: "491" }, { label: "\u0415\u0441\u0442\u044C \u043C\u0430\u043D\u0433\u0430-\u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F", value: "27" }, { label: "\u0415\u0441\u0442\u044C \u043C\u0430\u043D\u0445\u0432\u0430-\u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F", value: "453" }, { label: "\u0415\u0441\u0442\u044C \u043C\u0430\u043D\u044C\u0445\u0443\u0430-\u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F", value: "298" }, { label: "\u0415\u0441\u0442\u044C \u0441\u0435\u0440\u0438\u0430\u043B-\u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u044F", value: "421" }, { label: "\u0415\u0441\u0442\u044C \u0444\u0438\u043B\u044C\u043C \u043F\u043E \u043C\u043E\u0442\u0438\u0432\u0430\u043C", value: "47" }, { label: "\u0416\u0435\u043D\u0438\u0449\u0430-\u043D\u0430\u0441\u0442\u0430\u0432\u043D\u0438\u043A", value: "438" }, { label: "\u0416\u0435\u0440\u0442\u0432\u0430 \u0438\u0437\u043D\u0430\u0441\u0438\u043B\u043E\u0432\u0430\u043D\u0438\u044F \u0432\u043B\u044E\u0431\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u043D\u0430\u0441\u0438\u043B\u044C\u043D\u0438\u043A\u0430", value: "414" }, { label: "\u0416\u0435\u0441\u0442\u043A\u0430\u044F, \u0434\u0432\u0443\u043B\u0438\u0447\u043D\u0430\u044F \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C", value: "249" }, { label: "\u0416\u0435\u0441\u0442\u043E\u043A\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "436" }, { label: "\u0416\u0435\u0441\u0442\u043E\u043A\u043E\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u0441 \u0440\u0435\u0431\u0435\u043D\u043A\u043E\u043C", value: "617" }, { label: "\u0416\u0435\u0441\u0442\u043E\u043A\u043E\u0441\u0442\u044C", value: "127" }, { label: "\u0416\u0438\u0432\u043E\u0442\u043D\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E", value: "765" }, { label: "\u0416\u0438\u0432\u043E\u0442\u043D\u044B\u0435 \u0447\u0435\u0440\u0442\u044B", value: "466" }, { label: "\u0416\u0438\u0437\u043D\u044C \u0432 \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u0435", value: "554" }, { label: "\u0416\u0440\u0438\u0446\u044B", value: "564" }, { label: "\u0417\u0430\u0431\u043E\u0442\u043B\u0438\u0432\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "176" }, { label: "\u0417\u0430\u0431\u044B\u0432\u0447\u0438\u0432\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "579" }, { label: "\u0417\u0430\u0433\u043E\u0432\u043E\u0440\u044B", value: "177" }, { label: "\u0417\u0430\u043A\u0430\u043B\u043A\u0430 \u0442\u0435\u043B\u0430", value: "269" }, { label: "\u0417\u0430\u043A\u043E\u043D\u043D\u0438\u043A\u0438", value: "769" }, { label: "\u0417\u0430\u043C\u043A\u043D\u0443\u0442\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "533" }, { label: "\u0417\u0430\u043F\u0435\u0447\u0430\u0442\u0430\u043D\u043D\u0430\u044F \u0441\u0438\u043B\u0430", value: "344" }, { label: "\u0417\u0430\u0441\u0442\u0435\u043D\u0447\u0438\u0432\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "443" }, { label: "\u0417\u0432\u0435\u0440\u0438", value: "119" }, { label: "\u0417\u0432\u0435\u0440\u0438-\u043A\u043E\u043C\u043F\u0430\u043D\u044C\u043E\u043D\u044B", value: "192" }, { label: "\u0417\u043B\u043E\u0439 \u043F\u0440\u043E\u0442\u0430\u0433\u043E\u043D\u0438\u0441\u0442", value: "125" }, { label: "\u0417\u043B\u044B\u0435 \u0431\u043E\u0433\u0438", value: "437" }, { label: "\u0417\u043B\u044B\u0435 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438", value: "503" }, { label: "\u0417\u043B\u044B\u0435 \u0440\u0435\u043B\u0438\u0433\u0438\u0438", value: "725" }, { label: "\u0417\u043D\u0430\u043C\u0435\u043D\u0438\u0442\u043E\u0441\u0442\u0438", value: "397" }, { label: "\u0417\u043D\u0430\u043C\u0435\u043D\u0438\u0442\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "469" }, { label: "\u0417\u043D\u0430\u043D\u0438\u044F \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u043C\u0438\u0440\u0430", value: "185" }, { label: "\u0417\u043E\u043C\u0431\u0438", value: "321" }, { label: "\u0418\u0433\u0440\u0430 \u043D\u0430 \u0432\u044B\u0436\u0438\u0432\u0430\u043D\u0438\u0435", value: "162" }, { label: "\u0418\u0433\u0440\u0438\u0432\u044B\u0439 \u043F\u0440\u043E\u0442\u0430\u0433\u043E\u043D\u0438\u0441\u0442", value: "700" }, { label: "\u0418\u0433\u0440\u043E\u0432\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430", value: "301" }, { label: "\u0418\u0433\u0440\u043E\u0432\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B", value: "152" }, { label: "\u0418\u0433\u0440\u0443\u0448\u043A\u0438 (18+)", value: "644" }, { label: "\u0418\u0437 \u0433\u0440\u044F\u0437\u0438 \u0432 \u043A\u043D\u044F\u0437\u0438", value: "330" }, { label: "\u0418\u0437 \u0436\u0435\u043D\u0449\u0438\u043D\u044B \u0432 \u043C\u0443\u0436\u0447\u0438\u043D\u0443 ", value: "688" }, { label: "\u0418\u0437 \u043C\u0443\u0436\u0447\u0438\u043D\u044B \u0432 \u0436\u0435\u043D\u0449\u0438\u043D\u0443", value: "698" }, { label: "\u0418\u0437 \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0432 \u0445\u0443\u0434\u043E\u0433\u043E", value: "809" }, { label: "\u0418\u0437 \u0441\u043B\u0430\u0431\u043E\u0433\u043E \u0432 \u0441\u0438\u043B\u044C\u043D\u043E\u0433\u043E", value: "81" }, { label: "\u0418\u0437 \u0441\u0442\u0440\u0430\u0448\u043D\u043E(\u0433\u043E/\u0439) \u0432 \u043A\u0440\u0430\u0441\u0438\u0432\u043E(\u0433\u043E/\u044E)", value: "810" }, { label: "\u0418\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "349" }, { label: "\u0418\u0437\u0433\u043E\u0438", value: "472" }, { label: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0440\u0430\u0441\u044B", value: "627" }, { label: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0432\u043D\u0435\u0448\u043D\u0435\u0433\u043E \u0432\u0438\u0434\u0430", value: "191" }, { label: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u0438", value: "99" }, { label: "\u0418\u0437\u043D\u0430\u0441\u0438\u043B\u043E\u0432\u0430\u043D\u0438\u0435", value: "110" }, { label: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0436\u0435\u0441\u0442\u043E\u043A\u043E\u0441\u0442\u0438", value: "260" }, { label: "\u0418\u043C\u043F\u0435\u0440\u0438\u0438", value: "749" }, { label: "\u0418\u043D\u0432\u0430\u043B\u0438\u0434\u043D\u043E\u0441\u0442\u044C", value: "656" }, { label: "\u0418\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F", value: "180" }, { label: "\u0418\u043D\u0436\u0435\u043D\u0435\u0440", value: "35" }, { label: "\u0418\u043D\u0446\u0435\u0441\u0442", value: "463" }, { label: "\u0418\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442", value: "118" }, { label: "\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F", value: "635" }, { label: "\u041A\u0430\u043D\u043D\u0438\u0431\u0430\u043B\u0438\u0437\u043C", value: "377" }, { label: "\u041A\u0430\u0440\u0442\u043E\u0447\u043D\u044B\u0435 \u0438\u0433\u0440\u044B", value: "654" }, { label: "\u041A\u0438\u0431\u0435\u0440\u0441\u043F\u043E\u0440\u0442", value: "658" }, { label: "\u041A\u043B\u0430\u043D\u044B", value: "950" }, { label: "\u041A\u043B\u0430\u0441\u0441 \u0431\u0435\u0437\u0440\u0430\u0431\u043E\u0442\u043D\u043E\u0433\u043E [\u0418\u0433\u0440\u043E\u0432\u043E\u0439 \u043A\u043B\u0430\u0441\u0441 \u0432 \u0438\u0433\u0440\u0435]", value: "727" }, { label: "\u041A\u043B\u043E\u043D\u044B", value: "365" }, { label: "\u041A\u043B\u0443\u0431\u044B", value: "96" }, { label: "\u041A\u043D\u0438\u0433\u0438", value: "341" }, { label: "\u041A\u043D\u0438\u0433\u0438 \u043D\u0430\u0432\u044B\u043A\u043E\u0432", value: "312" }, { label: "\u041A\u043D\u0438\u0436\u043D\u044B\u0439 \u0447\u0435\u0440\u0432\u044C", value: "455" }, { label: "\u041A\u043E\u0432\u0430\u0440\u0441\u0442\u0432\u043E", value: "111" }, { label: "\u041A\u043E\u043B\u043B\u0435\u0433\u0438", value: "683" }, { label: "\u041A\u043E\u043B\u043B\u0435\u0434\u0436/\u0423\u043D\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442", value: "712" }, { label: "\u041A\u043E\u043C\u0430", value: "826" }, { label: "\u041A\u043E\u043C\u0430\u043D\u0434\u043D\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430", value: "426" }, { label: "\u041A\u043E\u043C\u0435\u0434\u0438\u0439\u043D\u044B\u0439 \u043E\u0442\u0442\u0435\u043D\u043E\u043A", value: "523" }, { label: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441 \u043D\u0435\u043F\u043E\u043B\u043D\u043E\u0446\u0435\u043D\u043D\u043E\u0441\u0442\u0438", value: "489" }, { label: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441 \u0441\u0435\u043C\u0435\u0439\u043D\u044B\u0445 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0439", value: "104" }, { label: "\u041A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0446\u0438\u044F", value: "746" }, { label: "\u041A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u044B", value: "483" }, { label: "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0440\u0430\u0437\u0443\u043C\u0430/\u0441\u043E\u0437\u043D\u0430\u043D\u0438\u044F", value: "262" }, { label: "\u041A\u043E\u043F\u0435\u0439\u0449\u0438\u043A", value: "339" }, { label: "\u041A\u043E\u0440\u043E\u043B\u0435\u0432\u0441\u043A\u0430\u044F \u0431\u0438\u0442\u0432\u0430", value: "1025" }, { label: "\u041A\u043E\u0440\u043E\u043B\u0435\u0432\u0441\u043A\u0430\u044F \u0432\u043B\u0430\u0441\u0442\u044C", value: "53" }, { label: "\u041A\u043E\u0440\u043E\u043B\u0435\u0432\u0441\u0442\u0432\u0430", value: "141" }, { label: "\u041A\u043E\u0440\u0440\u0443\u043F\u0446\u0438\u044F", value: "378" }, { label: "\u041A\u043E\u0441\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0432\u043E\u0439\u043D\u044B", value: "674" }, { label: "\u041A\u0440\u0430\u0441\u0438\u0432\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "107" }, { label: "\u041A\u0440\u0430\u0444\u0442", value: "287" }, { label: "\u041A\u0440\u0438\u0437\u0438\u0441 \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u0438", value: "599" }, { label: "\u041A\u0440\u0443\u0433\u043E\u0441\u0432\u0435\u0442\u043D\u043E\u0435 \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0435", value: "257" }, { label: "\u041A\u0443\u0434\u0435\u0440\u0435", value: "440" }, { label: "\u041A\u0443\u0437\u0435\u043D\u044B", value: "701" }, { label: "\u041A\u0443\u0437\u043D\u0435\u0446", value: "454" }, { label: "\u041A\u0443\u043A\u043B\u043E\u0432\u043E\u0434\u044B", value: "431" }, { label: "\u041A\u0443\u043A\u043B\u044B/\u043C\u0430\u0440\u0438\u043E\u043D\u0435\u0442\u043A\u0438", value: "573" }, { label: "\u041A\u0443\u043B\u044C\u0442\u0438\u0432\u0430\u0446\u0438\u044F", value: "123" }, { label: "\u041A\u0443\u043D\u043D\u0438\u043B\u0438\u043D\u0433\u0443\u0441", value: "632" }, { label: "\u041B\u0435\u0433\u0435\u043D\u0434\u044B", value: "430" }, { label: "\u041B\u0435\u0433\u043A\u0430\u044F \u0436\u0438\u0437\u043D\u044C", value: "604" }, { label: "\u041B\u0435\u043D\u0438\u0432\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "570" }, { label: "\u041B\u0438\u0434\u0435\u0440\u0441\u0442\u0432\u043E", value: "424" }, { label: "\u041B\u043E\u043B\u0438", value: "92" }, { label: "\u041B\u043E\u0442\u0435\u0440\u0435\u044F", value: "401" }, { label: "\u041B\u044E\u0431\u043E\u0432\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441 \u0432\u043B\u044E\u0431\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0432\u044B\u043C", value: "647" }, { label: "\u041B\u044E\u0431\u043E\u0432\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441 \u0433\u043B\u0430\u0432\u043D\u043E\u0433\u043E \u0433\u0435\u0440\u043E\u044F \u043D\u043E\u0441\u0438\u0442 \u043E\u0447\u043A\u0438", value: "576" }, { label: "\u041B\u044E\u0431\u043E\u0432\u043D\u044B\u0439 \u0442\u0440\u0435\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A", value: "98" }, { label: "\u041B\u044E\u0431\u043E\u0432\u044C \u0434\u0435\u0442\u0441\u0442\u0432\u0430", value: "500" }, { label: "\u041B\u044E\u0431\u043E\u0432\u044C \u0441 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0432\u0437\u0433\u043B\u044F\u0434\u0430", value: "730" }, { label: "\u041C\u0430\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043D\u0430\u0434\u043F\u0438\u0441\u0438", value: "373" }, { label: "\u041C\u0430\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0435\u0447\u0430\u0442\u0438", value: "277" }, { label: "\u041C\u0430\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438", value: "357" }, { label: "\u041C\u0430\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u043E/\u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u0435, \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0435 \u043D\u0435 \u0432\u0441\u0435\u043C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430\u043C", value: "244" }, { label: "\u041C\u0430\u0433\u0438\u044F", value: "38" }, { label: "\u041C\u0430\u0433\u0438\u044F \u043F\u0440\u0438\u0437\u044B\u0432\u0430", value: "333" }, { label: "\u041C\u0430\u0437\u043E\u0445\u0438\u0441\u0442\u0441\u043A\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "660" }, { label: "\u041C\u0430\u043D\u0438\u043F\u0443\u043B\u044F\u0442\u0438\u0432\u043D\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "130" }, { label: "\u041C\u0430\u043D\u0438\u044F", value: "91" }, { label: "\u041C\u0430\u0441\u0442\u0435\u0440 \u043D\u0430 \u0432\u0441\u0435 \u0440\u0443\u043A\u0438", value: "390" }, { label: "\u041C\u0430\u0441\u0442\u0443\u0440\u0431\u0430\u0446\u0438\u044F", value: "846" }, { label: "\u041C\u0430\u0445\u043E-\u0441\u0451\u0434\u0437\u0451", value: "496" }, { label: "\u041C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u0438\u0435 \u0437\u043D\u0430\u043D\u0438\u044F", value: "441" }, { label: "\u041C\u0435\u0434\u043B\u0435\u043D\u043D\u0430\u044F \u0440\u043E\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043B\u0438\u043D\u0438\u044F", value: "113" }, { label: "\u041C\u0435\u0434\u043B\u0435\u043D\u043D\u043E\u0435 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435 \u043D\u0430 \u0441\u0442\u0430\u0440\u0442\u0435 ", value: "670" }, { label: "\u041C\u0435\u0436\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044F", value: "316" }, { label: "\u041C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442", value: "182" }, { label: "\u041C\u0435\u0440\u0442\u0432\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "794" }, { label: "\u041C\u0435\u0441\u0442\u044C", value: "88" }, { label: "\u041C\u0435\u0442\u0430\u043C\u043E\u0440\u0444\u044B", value: "234" }, { label: "\u041C\u0435\u0447 \u0438 \u043C\u0430\u0433\u0438\u044F", value: "55" }, { label: "\u041C\u0435\u0447\u043D\u0438\u043A", value: "607" }, { label: "\u041C\u0435\u0447\u0442\u044B", value: "733" }, { label: "\u041C\u0438\u043B\u0430\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F", value: "709" }, { label: "\u041C\u0438\u043B\u043E\u0435 \u0434\u0438\u0442\u044F", value: "596" }, { label: "\u041C\u0438\u043B\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "697" }, { label: "\u041C\u0438\u0440\u043E\u0432\u043E\u0435 \u0434\u0435\u0440\u0435\u0432\u043E", value: "385" }, { label: "\u041C\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043E\u0440\u0435\u043E\u043B \u0432\u043E\u043A\u0440\u0443\u0433 \u0441\u0435\u043C\u044C\u0438", value: "409" }, { label: "\u041C\u0438\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0437\u0432\u0435\u0440\u0438", value: "418" }, { label: "\u041C\u0438\u0444\u043E\u043B\u043E\u0433\u0438\u044F", value: "468" }, { label: "\u041C\u043B\u0430\u0434\u0448\u0438\u0435 \u0431\u0440\u0430\u0442\u044C\u044F", value: "843" }, { label: "\u041C\u043B\u0430\u0434\u0448\u0438\u0435 \u0441\u0435\u0441\u0442\u0440\u044B", value: "465" }, { label: "\u041C\u041C\u041E\u0420\u041F\u0413 (\u041B\u0438\u0442\u0420\u041F\u0413)", value: "306" }, { label: "\u041C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u043E \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u043D\u044B\u0445 \u043B\u044E\u0434\u0435\u0439", value: "488" }, { label: "\u041C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0435\u0439", value: "278" }, { label: "\u041C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u043E \u0440\u0435\u0438\u043D\u043A\u0430\u0440\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u043B\u044E\u0434\u0435\u0439", value: "227" }, { label: "\u041C\u043E\u0434\u0435\u043B\u0438", value: "649" }, { label: "\u041C\u043E\u043B\u0447\u0430\u043B\u0438\u0432\u044B\u0439 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436", value: "705" }, { label: "\u041C\u043E\u043D\u0441\u0442\u0440\u044B", value: "69" }, { label: "\u041C\u0443\u0436\u0441\u043A\u0430\u044F \u0433\u0435\u0439-\u043F\u0430\u0440\u0430", value: "685" }, { label: "\u041C\u0443\u0436\u0447\u0438\u043D\u0430-\u044F\u043D\u0434\u0435\u0440\u0435", value: "155" }, { label: "\u041C\u0443\u0437\u044B\u043A\u0430", value: "589" }, { label: "\u041C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0433\u0440\u0443\u043F\u043F\u044B", value: "588" }, { label: "\u041C\u0443\u0442\u0430\u0446\u0438\u0438", value: "668" }, { label: "\u041C\u0443\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0430", value: "317" }, { label: "\u041D\u0430\u0432\u044B\u043A \u043A\u0440\u0430\u0436\u0438", value: "626" }, { label: "\u041D\u0430\u0432\u044F\u0437\u0447\u0438\u0432\u0430\u044F \u043B\u044E\u0431\u043E\u0432\u044C", value: "85" }, { label: "\u041D\u0430\u0435\u043C\u043D\u0438\u043A\u0438", value: "324" }, { label: "\u041D\u0430\u0437\u043E\u0439\u043B\u0438\u0432\u044B\u0439 \u0432\u043E\u0437\u043B\u044E\u0431\u043B\u0435\u043D\u043D\u044B\u0439", value: "501" }, { label: "\u041D\u0430\u0438\u0432\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "66" }, { label: "\u041D\u0430\u0440\u043A\u043E\u0442\u0438\u043A\u0438", value: "661" }, { label: "\u041D\u0430\u0440\u0446\u0438\u0441\u0441\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "470" }, { label: "\u041D\u0430\u0441\u0438\u043B\u0438\u0435 \u0441\u0435\u043A\u0441\u0443\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0430", value: "824" }, { label: "\u041D\u0430\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0435", value: "372" }, { label: "\u041D\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u0438\u0437\u043C", value: "318" }, { label: "\u041D\u0435 \u0431\u043B\u0435\u0449\u0443\u0449\u0438\u0439 \u0432\u043D\u0435\u0448\u043D\u0435 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "328" }, { label: "\u041D\u0435 \u0440\u043E\u0434\u043D\u044B\u0435 \u0431\u0440\u0430\u0442\u044C\u044F \u0438 \u0441\u0435\u0441\u0442\u0440\u044B", value: "464" }, { label: "\u041D\u0435\u0431\u0435\u0441\u0430", value: "508" }, { label: "\u041D\u0435\u0431\u0435\u0441\u043D\u043E\u0435 \u0438\u0441\u043F\u044B\u0442\u0430\u043D\u0438\u0435", value: "274" }, { label: "\u041D\u0435\u0433\u0443\u043C\u0430\u043D\u043E\u0438\u0434\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "622" }, { label: "\u041D\u0435\u0434\u043E\u0432\u0435\u0440\u0447\u0438\u0432\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "485" }, { label: "\u041D\u0435\u0434\u043E\u043E\u0446\u0435\u043D\u0435\u043D\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "140" }, { label: "\u041D\u0435\u0434\u043E\u0440\u0430\u0437\u0443\u043C\u0435\u043D\u0438\u044F", value: "202" }, { label: "\u041D\u0435\u0438\u0437\u043B\u0435\u0447\u0438\u043C\u0430\u044F \u0431\u043E\u043B\u0435\u0437\u043D\u044C", value: "75" }, { label: "\u041D\u0435\u043A\u0440\u043E\u043C\u0430\u043D\u0442", value: "308" }, { label: "\u041D\u0435\u043B\u0438\u043D\u0435\u0439\u043D\u0430\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F", value: "157" }, { label: "\u041D\u0435\u043D\u0430\u0432\u0438\u0441\u0442\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "487" }, { label: "\u041D\u0435\u043D\u0430\u0434\u0435\u0436\u043D\u044B\u0439 \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u0447\u0438\u043A", value: "165" }, { label: "\u041D\u0435\u0440\u0435\u0437\u0438\u0434\u0435\u043D\u0442\u044B", value: "821" }, { label: "\u041D\u0435\u0440\u0435\u0448\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "741" }, { label: "\u041D\u0435\u0441\u0435\u0440\u044C\u0435\u0437\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "294" }, { label: "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 \u043B\u0438\u043D\u0438\u0439", value: "517" }, { label: "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0433\u043B\u0430\u0432\u043D\u044B\u0445 \u0433\u0435\u0440\u043E\u0435\u0432", value: "475" }, { label: "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u043E\u0441\u0442\u0435\u0439", value: "615" }, { label: "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u0435\u0439", value: "474" }, { label: "\u041D\u0435\u0442\u043E\u0440\u0430\u0440\u0435", value: "721" }, { label: "\u041D\u0435\u0442\u043E\u0440\u0438", value: "450" }, { label: "\u041D\u0435\u0443\u0434\u0430\u0447\u043B\u0438\u0432\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "567" }, { label: "\u041D\u0438\u043D\u0434\u0437\u044F", value: "358" }, { label: "\u041E\u0431\u0435\u0449\u0430\u043D\u0438\u0435 \u0438\u0437 \u0434\u0435\u0442\u0441\u0442\u0432\u0430", value: "738" }, { label: "\u041E\u0431\u043C\u0430\u043D\u0449\u0438\u043A", value: "411" }, { label: "\u041E\u0431\u043C\u0435\u043D \u0442\u0435\u043B\u0430\u043C\u0438", value: "94" }, { label: "\u041E\u0431\u043D\u0430\u0436\u0435\u043D\u043A\u0430", value: "417" }, { label: "\u041E\u0431\u043E\u043B\u044C\u0449\u0435\u043D\u0438\u0435", value: "718" }, { label: "\u041E\u0431\u043E\u0440\u043E\u0442\u043D\u0438", value: "624" }, { label: "\u041E\u0431\u0440\u0430\u0442\u043D\u044B\u0439 \u0433\u0430\u0440\u0435\u043C", value: "255" }, { label: "\u041E\u0431\u0449\u0435\u0441\u0442\u0432\u043E \u043C\u043E\u043D\u0441\u0442\u0440\u043E\u0432", value: "226" }, { label: "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E", value: "548" }, { label: "\u041E\u0433\u043D\u0435\u0441\u0442\u0440\u0435\u043B\u044C\u043D\u043E\u0435 \u043E\u0440\u0443\u0436\u0438\u0435", value: "179" }, { label: "\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0436\u0438\u0437\u043D\u0438", value: "73" }, { label: "\u041E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0441\u0442\u044C", value: "447" }, { label: "\u041E\u0434\u0438\u043D\u043E\u043A\u0438\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "304" }, { label: "\u041E\u0434\u0438\u043D\u043E\u0447\u0435\u0441\u0442\u0432\u043E", value: "199" }, { label: "\u041E\u0434\u0438\u043D\u043E\u0447\u043D\u043E\u0435 \u043F\u0440\u043E\u0436\u0438\u0432\u0430\u043D\u0438\u0435", value: "207" }, { label: "\u041E\u043A\u043E\u043B\u043E\u0441\u043C\u0435\u0440\u0442\u043D\u044B\u0435 \u043F\u0435\u0440\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u044F", value: "773" }, { label: "\u041E\u043C\u043C\u0451\u0434\u0437\u0438", value: "542" }, { label: "\u041E\u043C\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435", value: "237" }, { label: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u043F\u0440\u0435\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C", value: "478" }, { label: "\u041E\u0440\u0433\u0438\u044F", value: "825" }, { label: "\u041E\u0440\u043A\u0438", value: "228" }, { label: "\u041E\u0441\u0432\u043E\u0435\u043D\u0438\u0435 \u043D\u0430\u0432\u044B\u043A\u043E\u0432", value: "235" }, { label: "\u041E\u0441\u043D\u043E\u0432\u0430\u043D\u043E \u043D\u0430 \u0430\u043D\u0438\u043C\u0435", value: "553" }, { label: "\u041E\u0441\u043D\u043E\u0432\u0430\u043D\u043E \u043D\u0430 \u0432\u0438\u0434\u0435\u043E \u0438\u0433\u0440\u0435", value: "704" }, { label: "\u041E\u0441\u043D\u043E\u0432\u0430\u043D\u043E \u043D\u0430 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u043D\u043E\u0432\u0435\u043B\u043B\u0435 ", value: "861" }, { label: "\u041E\u0441\u043D\u043E\u0432\u0430\u043D\u043E \u043D\u0430 \u043F\u0435\u0441\u043D\u0435", value: "677" }, { label: "\u041E\u0441\u043D\u043E\u0432\u0430\u043D\u043E \u043D\u0430 \u0444\u0438\u043B\u044C\u043C\u0435", value: "552" }, { label: "\u041E\u0441\u0442\u043E\u0440\u043E\u0436\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "122" }, { label: "\u041E\u0442\u0430\u043A\u0443", value: "512" }, { label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0439 \u043A\u043E\u0441\u043C\u043E\u0441", value: "150" }, { label: "\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0432 \u0441\u0435\u0442\u0438", value: "713" }, { label: "\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u043C\u0435\u0436\u0434\u0443 \u0431\u043E\u0433\u043E\u043C \u0438 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u043E\u043C", value: "603" }, { label: "\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u043C\u0435\u0436\u0434\u0443 \u043B\u044E\u0434\u044C\u043C\u0438 \u0438 \u043D\u0435\u043B\u044E\u0434\u044C\u043C\u0438", value: "205" }, { label: "\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u043D\u0430 \u0440\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0438", value: "852" }, { label: "\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A-\u043F\u043E\u0434\u0447\u0438\u043D\u0435\u043D\u043D\u044B\u0439", value: "590" }, { label: "\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0421\u0435\u043D\u043F\u0430\u0439-\u041A\u043E\u0443\u0445\u0430\u0439", value: "513" }, { label: "\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0443\u0447\u0435\u043D\u0438\u043A\u0430 \u0438 \u0443\u0447\u0438\u0442\u0435\u043B\u044F", value: "451" }, { label: "\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0443\u0447\u0438\u0442\u0435\u043B\u044C-\u0443\u0447\u0435\u043D\u0438\u043A", value: "343" }, { label: "\u041E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0445\u043E\u0437\u044F\u0438\u043D-\u0441\u043B\u0443\u0433\u0430", value: "206" }, { label: "\u041E\u0442\u043E\u043C\u044D \u0438\u0433\u0440\u0430", value: "723" }, { label: "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u0437\u0434\u0440\u0430\u0432\u043E\u0433\u043E \u0441\u043C\u044B\u0441\u043B\u0430", value: "605" }, { label: "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439", value: "575" }, { label: "\u041E\u0444\u0438\u0441\u043D\u044B\u0439 \u0440\u043E\u043C\u0430\u043D", value: "686" }, { label: "\u041E\u0444\u0438\u0446\u0438\u0430\u043D\u0442\u044B", value: "681" }, { label: "\u041E\u0445\u043E\u0442\u043D\u0438\u043A\u0438", value: "288" }, { label: "\u041E\u0447\u0430\u0440\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "659" }, { label: "\u041F\u0430\u0434\u0448\u0435\u0435 \u0434\u0432\u043E\u0440\u044F\u043D\u0441\u0442\u0432\u043E", value: "618" }, { label: "\u041F\u0430\u0434\u0448\u0438\u0435 \u0430\u043D\u0433\u0435\u043B\u044B", value: "505" }, { label: "\u041F\u0430\u0439\u0437\u0443\u0440\u0438", value: "630" }, { label: "\u041F\u0430\u0440\u0430\u0437\u0438\u0442\u044B", value: "535" }, { label: "\u041F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u044B\u0435 \u043C\u0438\u0440\u044B", value: "86" }, { label: "\u041F\u0430\u0440\u043A \u0440\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0439", value: "586" }, { label: "\u041F\u0430\u0440\u043E\u0434\u0438\u044F", value: "319" }, { label: "\u041F\u0435\u0432\u0446\u044B/\u041F\u0435\u0432\u0438\u0446\u044B", value: "734" }, { label: "\u041F\u0435\u0440\u0432\u0430\u044F \u043B\u044E\u0431\u043E\u0432\u044C", value: "716" }, { label: "\u041F\u0435\u0440\u0432\u043E\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u043D\u043E\u0432\u0435\u043B\u043B\u044B \u2014 \u043C\u0430\u043D\u0433\u0430", value: "560" }, { label: "\u041F\u0435\u0440\u0432\u044B\u0439 \u0440\u0430\u0437", value: "845" }, { label: "\u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0432 \u0434\u0440\u0443\u0433\u043E\u0439 \u043C\u0438\u0440, \u0438\u043C\u0435\u044F \u043F\u0440\u0438 \u0441\u0435\u0431\u0435 \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F", value: "732" }, { label: "\u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0432 \u0438\u0433\u0440\u043E\u0432\u043E\u0439 \u043C\u0438\u0440", value: "532" }, { label: "\u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0432 \u0438\u043D\u043E\u0439 \u043C\u0438\u0440", value: "754" }, { label: "\u041F\u0435\u0440\u0435\u0440\u043E\u0436\u0434\u0435\u043D\u0438\u0435 \u0432 \u0438\u043D\u043E\u043C \u043C\u0438\u0440\u0435", value: "755" }, { label: "\u041F\u0435\u0440\u0435\u0441\u0435\u043B\u0435\u043D\u0438\u0435 \u0434\u0443\u0448\u0438/\u0422\u0440\u0430\u043D\u0441\u043C\u0438\u0433\u0440\u0430\u0446\u0438\u044F", value: "139" }, { label: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u0449\u0438\u0442", value: "631" }, { label: "\u041F\u0435\u0442\u043B\u044F \u0432\u0440\u0435\u043C\u0435\u043D\u0438", value: "79" }, { label: "\u041F\u0438\u0440\u0430\u0442\u044B", value: "817" }, { label: "\u041F\u0438\u0441\u0430\u0442\u0435\u043B\u0438", value: "408" }, { label: "\u041F\u0438\u0442\u043E\u043C\u0446\u044B", value: "253" }, { label: "\u041F\u043B\u0435\u043C\u0435\u043D\u043D\u043E\u0435 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E", value: "291" }, { label: "\u041F\u043E\u0432\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0434\u0435\u043C\u043E\u043D\u043E\u0432", value: "171" }, { label: "\u041F\u043E\u0432\u0435\u0441\u0442\u0432\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0442 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u043B\u0438\u0446/\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0442\u043E\u0447\u0435\u043A \u0437\u0440\u0435\u043D\u0438\u044F", value: "156" }, { label: "\u041F\u043E\u0434\u0437\u0435\u043C\u0435\u043B\u044C\u044F", value: "219" }, { label: "\u041F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F", value: "166" }, { label: "\u041F\u043E\u0437\u043D\u0430\u043D\u0438\u0435 \u0414\u0430\u043E", value: "360" }, { label: "\u041F\u043E\u043A\u0438\u043D\u0443\u0442\u043E\u0435 \u0434\u0438\u0442\u044F", value: "534" }, { label: "\u041F\u043E\u043B\u0438\u0433\u0430\u043C\u0438\u044F", value: "296" }, { label: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430", value: "43" }, { label: "\u041F\u043E\u043B\u0438\u0446\u0438\u044F", value: "801" }, { label: "\u041F\u043E\u043B\u0443\u043B\u044E\u0434\u0438", value: "335" }, { label: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u0440\u0443\u0436\u0438\u044F", value: "432" }, { label: "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0439 \u043B\u044E\u0431\u043E\u0432\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441", value: "241" }, { label: "\u041F\u043E\u0441\u0442\u0430\u043F\u043E\u043A\u0430\u043B\u0438\u043F\u0442\u0438\u043A\u0430", value: "60" }, { label: "\u041F\u043E\u0442\u0435\u0440\u044F\u043D\u043D\u044B\u0435 \u0446\u0438\u0432\u0438\u043B\u0438\u0437\u0430\u0446\u0438\u0438", value: "751" }, { label: "\u041F\u043E\u0445\u0438\u0449\u0435\u043D\u0438\u044F \u043B\u044E\u0434\u0435\u0439", value: "707" }, { label: "\u041F\u043E\u044D\u0437\u0438\u044F", value: "404" }, { label: "\u041F\u0440\u0430\u0432\u043E\u043D\u0430\u0440\u0443\u0448\u0438\u0442\u0435\u043B\u0438", value: "694" }, { label: "\u041F\u0440\u0430\u0433\u043C\u0430\u0442\u0438\u0447\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "536" }, { label: "\u041F\u0440\u0435\u0434\u0430\u043D\u043D\u044B\u0439 \u043B\u044E\u0431\u043E\u0432\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441", value: "106" }, { label: "\u041F\u0440\u0435\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E", value: "103" }, { label: "\u041F\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043D\u0438\u0435", value: "52" }, { label: "\u041F\u0440\u0435\u043A\u0440\u0430\u0441\u043D\u0430\u044F \u0433\u0435\u0440\u043E\u0438\u043D\u044F", value: "30" }, { label: "\u041F\u0440\u0435\u0441\u0442\u0443\u043F\u043D\u0438\u043A\u0438", value: "728" }, { label: "\u041F\u0440\u0435\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C", value: "83" }, { label: "\u041F\u0440\u0438\u0437\u0432\u0430\u043D\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "147" }, { label: "\u041F\u0440\u0438\u0437\u0440\u0430\u043A\u0438", value: "51" }, { label: "\u041F\u0440\u0438\u043D\u0443\u0436\u0434\u0435\u043D\u0438\u0435 \u043A \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F\u043C", value: "602" }, { label: "\u041F\u0440\u0438\u043D\u0446\u0435\u0441\u0441\u044B", value: "933" }, { label: "\u041F\u0440\u0438\u0442\u0432\u043E\u0440\u043D\u0430\u044F \u043F\u0430\u0440\u0430", value: "600" }, { label: "\u041F\u0440\u0438\u0447\u0443\u0434\u043B\u0438\u0432\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "297" }, { label: "\u041F\u0440\u0438\u0448\u0435\u043B\u044C\u0446\u044B/\u0418\u043D\u043E\u043F\u043B\u0430\u043D\u0435\u0442\u044F\u043D\u0435", value: "76" }, { label: "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0441\u0442", value: "666" }, { label: "\u041F\u0440\u043E\u043A\u043B\u044F\u0442\u0438\u044F", value: "48" }, { label: "\u041F\u0440\u043E\u043C\u044B\u0432\u0430\u043D\u0438\u0435 \u043C\u043E\u0437\u0433\u043E\u0432", value: "519" }, { label: "\u041F\u0440\u043E\u043F\u0443\u0441\u043A \u0432\u0440\u0435\u043C\u0435\u043D\u0438", value: "138" }, { label: "\u041F\u0440\u043E\u0440\u043E\u0447\u0435\u0441\u0442\u0432\u0430", value: "429" }, { label: "\u041F\u0440\u043E\u0441\u0442\u0438\u0442\u0443\u0442\u043A\u0438", value: "844" }, { label: "\u041F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u043C\u0430\u043D\u0438\u043F\u0443\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", value: "375" }, { label: "\u041F\u0440\u043E\u0448\u043B\u043E\u0435 \u0438\u0433\u0440\u0430\u0435\u0442 \u0431\u043E\u043B\u044C\u0448\u0443\u044E \u0440\u043E\u043B\u044C", value: "215" }, { label: "\u041F\u0440\u044B\u0436\u043A\u0438 \u043C\u0435\u0436\u0434\u0443 \u043C\u0438\u0440\u0430\u043C\u0438", value: "737" }, { label: "\u041F\u0441\u0438\u0445\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0438\u043B\u044B", value: "265" }, { label: "\u041F\u0441\u0438\u0445\u043E\u043F\u0430\u0442\u044B", value: "158" }, { label: "\u041F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0435 \u0432\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438", value: "80" }, { label: "\u041F\u044B\u0442\u043A\u0430", value: "168" }, { label: "\u0420\u0430\u0431\u044B", value: "829" }, { label: "\u0420\u0430\u0437\u0432\u043E\u0434", value: "771" }, { label: "\u0420\u0430\u0437\u0443\u043C\u043D\u044B\u0435 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u044B", value: "174" }, { label: "\u0420\u0430\u0441\u0438\u0437\u043C", value: "320" }, { label: "\u0420\u0430\u0441\u0441\u043A\u0430\u0437", value: "61" }, { label: "\u0420\u0430\u0441\u0442\u043E\u0440\u0436\u0435\u043D\u0438\u044F \u043F\u043E\u043C\u043E\u043B\u0432\u043A\u0438", value: "243" }, { label: "\u0420\u0430\u0441\u044B \u0437\u043E\u043E\u043C\u043E\u0440\u0444\u043E\u0432", value: "209" }, { label: "\u0420\u0435\u0432\u043D\u043E\u0441\u0442\u044C", value: "717" }, { label: "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u044B", value: "684" }, { label: "\u0420\u0435\u0438\u043D\u043A\u0430\u0440\u043D\u0430\u0446\u0438\u044F", value: "281" }, { label: "\u0420\u0435\u0438\u043D\u043A\u0430\u0440\u043D\u0430\u0446\u0438\u044F \u0432 \u043C\u043E\u043D\u0441\u0442\u0440\u0430", value: "204" }, { label: "\u0420\u0435\u0438\u043D\u043A\u0430\u0440\u043D\u0430\u0446\u0438\u044F \u0432 \u043E\u0431\u044A\u0435\u043A\u0442", value: "692" }, { label: "\u0420\u0435\u043B\u0438\u0433\u0438\u0438", value: "565" }, { label: "\u0420\u0435\u043F\u043E\u0440\u0442\u0435\u0440\u044B", value: "837" }, { label: "\u0420\u0435\u0441\u0442\u043E\u0440\u0430\u043D", value: "652" }, { label: "\u0420\u0435\u0448\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "124" }, { label: "\u0420\u043E\u0431\u043A\u0438\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "800" }, { label: "\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u044C \u043E\u0434\u0438\u043D\u043E\u0447\u043A\u0430", value: "687" }, { label: "\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441", value: "531" }, { label: "\u0420\u043E\u0434\u043E\u0441\u043B\u043E\u0432\u043D\u0430\u044F", value: "121" }, { label: "\u0420\u043E\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0434\u0441\u044E\u0436\u0435\u0442 ", value: "159" }, { label: "\u0420\u043E\u0441\u0442 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430", value: "95" }, { label: "\u0420\u044B\u0446\u0430\u0440\u0438", value: "142" }, { label: "\u0421\u0430\u0434\u0438\u0441\u0442\u0441\u043A\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "642" }, { label: "\u0421\u0430\u043C\u043E\u043E\u0442\u0432\u0435\u0440\u0436\u0435\u043D\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "748" }, { label: "\u0421\u0430\u043C\u043E\u0443\u0431\u0438\u0439\u0441\u0442\u0432\u0430", value: "616" }, { label: "\u0421\u0430\u043C\u0443\u0440\u0430\u0439", value: "646" }, { label: "\u0421\u0431\u043E\u0440\u043D\u0438\u043A \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0445 \u0438\u0441\u0442\u043E\u0440\u0438\u0439", value: "456" }, { label: "\u0421\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0435 \u0441\u044E\u0436\u0435\u0442\u043D\u044B\u0435 \u043B\u0438\u043D\u0438\u0438", value: "473" }, { label: "\u0421\u0432\u044F\u0442\u044B\u0435", value: "761" }, { label: "\u0421\u0432\u044F\u0449\u0435\u043D\u043D\u0438\u043A\u0438", value: "325" }, { label: "\u0421\u0434\u0435\u0440\u0436\u0430\u043D\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "799" }, { label: "\u0421\u0435\u043A\u0440\u0435\u0442\u043D\u044B\u0435 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438", value: "331" }, { label: "\u0421\u0435\u043A\u0440\u0435\u0442\u044B", value: "577" }, { label: "\u0421\u0435\u043A\u0441 \u0440\u0430\u0431\u044B", value: "830" }, { label: "\u0421\u0435\u043C\u0435\u0439\u043D\u044B\u0439 \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442", value: "770" }, { label: "\u0421\u0435\u043C\u044C \u0434\u043E\u0431\u0440\u043E\u0434\u0435\u0442\u0435\u043B\u0435\u0439", value: "233" }, { label: "\u0421\u0435\u043C\u044C \u0441\u043C\u0435\u0440\u0442\u043D\u044B\u0445 \u0433\u0440\u0435\u0445\u043E\u0432", value: "134" }, { label: "\u0421\u0435\u043C\u044C\u044F", value: "251" }, { label: "\u0421\u0451\u043D\u044D\u043D-\u0430\u0439 \u043F\u043E\u0434\u0441\u044E\u0436\u0435\u0442 ", value: "664" }, { label: "\u0421\u0435\u0440\u0438\u0439\u043D\u044B\u0435 \u0443\u0431\u0438\u0439\u0446\u044B", value: "497" }, { label: "\u0421\u0435\u0441\u0442\u0440\u0438\u043D\u0441\u043A\u0438\u0439 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441", value: "498" }, { label: "\u0421\u0438\u043B\u0430 \u0434\u0443\u0445\u0430", value: "282" }, { label: "\u0421\u0438\u043B\u0430, \u0442\u0440\u0435\u0431\u0443\u044E\u0449\u0430\u044F \u043F\u043B\u0430\u0442\u044B \u0437\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435", value: "520" }, { label: "\u0421\u0438\u043B\u044C\u043D\u0430\u044F \u043F\u0430\u0440\u0430", value: "109" }, { label: "\u0421\u0438\u043B\u044C\u043D\u044B\u0439 \u0432 \u0441\u0438\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0433\u043E", value: "359" }, { label: "\u0421\u0438\u043B\u044C\u043D\u044B\u0439 \u043B\u044E\u0431\u043E\u0432\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441", value: "161" }, { label: "\u0421\u0438\u043D\u0434\u0440\u043E\u043C \u0432\u043E\u0441\u044C\u043C\u0438\u043A\u043B\u0430\u0441\u0441\u043D\u0438\u043A\u0430", value: "90" }, { label: "\u0421\u0438\u0440\u043E\u0442\u044B", value: "214" }, { label: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0443\u0440\u043E\u0432\u043D\u0435\u0439", value: "198" }, { label: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440", value: "476" }, { label: "\u0421\u043A\u0440\u044B\u0442\u0438\u0435 \u0438\u0441\u0442\u0438\u043D\u043D\u043E\u0439 \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u0438", value: "371" }, { label: "\u0421\u043A\u0440\u044B\u0442\u0438\u0435 \u0438\u0441\u0442\u0438\u043D\u043D\u044B\u0445 \u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0441\u0442\u0435\u0439", value: "252" }, { label: "\u0421\u043A\u0440\u044B\u0442\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "133" }, { label: "\u0421\u043A\u0440\u044B\u0442\u044B\u0435 \u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0441\u0442\u0438", value: "128" }, { label: "\u0421\u043A\u0443\u043B\u044C\u043F\u0442\u043E\u0440\u044B", value: "366" }, { label: "\u0421\u043B\u0430\u0431\u043E \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u043D\u0430\u044F \u0440\u043E\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043B\u0438\u043D\u0438\u044F", value: "213" }, { label: "\u0421\u043B\u0430\u0431\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "188" }, { label: "\u0421\u043B\u0435\u043F\u043E\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "864" }, { label: "\u0421\u043B\u0443\u0433\u0438", value: "232" }, { label: "\u0421\u043C\u0435\u0440\u0442\u044C", value: "49" }, { label: "\u0421\u043C\u0435\u0440\u0442\u044C \u0431\u043B\u0438\u0437\u043A\u0438\u0445", value: "361" }, { label: "\u0421\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "108" }, { label: "\u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0441\u0442\u044C", value: "40" }, { label: "\u0421\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E", value: "482" }, { label: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0430\u0440\u043C\u0438\u0438", value: "175" }, { label: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u043E\u0432", value: "292" }, { label: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043A\u043B\u0430\u043D\u0430", value: "448" }, { label: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043A\u043E\u0440\u043E\u043B\u0435\u0432\u0441\u0442\u0432\u0430", value: "181" }, { label: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043D\u0430\u0432\u044B\u043A\u043E\u0432", value: "236" }, { label: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0441\u0435\u043A\u0442\u044B", value: "393" }, { label: "\u0421\u043E\u043B\u0434\u0430\u0442\u044B/\u0412\u043E\u0435\u043D\u043D\u044B\u0435", value: "71" }, { label: "\u0421\u043E\u043D", value: "571" }, { label: "\u0421\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "67" }, { label: "\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u0435\u0440\u0430\u0440\u0445\u0438\u044F \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0441\u0438\u043B\u044B", value: "137" }, { label: "\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u0437\u0433\u043E\u0438", value: "480" }, { label: "\u0421\u043F\u0430\u0441\u0435\u043D\u0438\u0435 \u043C\u0438\u0440\u0430", value: "597" }, { label: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0441\u0442\u0438", value: "54" }, { label: "\u0421\u043F\u043E\u043A\u043E\u0439\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "32" }, { label: "\u0421\u043F\u0440\u0430\u0432\u0435\u0434\u043B\u0438\u0432\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "702" }, { label: "\u0421\u0440\u0435\u0434\u043D\u0435\u0432\u0435\u043A\u043E\u0432\u044C\u0435", value: "184" }, { label: "\u0421\u0441\u043E\u0440\u044F\u0449\u0430\u044F\u0441\u044F \u043F\u0430\u0440\u0430", value: "293" }, { label: "\u0421\u0442\u0430\u043B\u043A\u0435\u0440\u044B", value: "689" }, { label: "\u0421\u0442\u0430\u0440\u0435\u043D\u0438\u0435", value: "190" }, { label: "\u0421\u0442\u043E\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "444" }, { label: "\u0421\u0442\u043E\u043A\u0433\u043E\u043B\u044C\u043C\u0441\u043A\u0438\u0439 \u0441\u0438\u043D\u0434\u0440\u043E\u043C", value: "643" }, { label: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433", value: "425" }, { label: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0431\u0438\u0442\u0432\u044B", value: "160" }, { label: "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044F", value: "1038" }, { label: "\u0421\u0442\u0440\u0435\u043B\u043A\u0438", value: "458" }, { label: "\u0421\u0442\u0440\u0435\u043B\u044C\u0431\u0430 \u0438\u0437 \u043B\u0443\u043A\u0430", value: "383" }, { label: "\u0421\u0442\u0443\u0434\u0435\u043D\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u043E\u0432\u0435\u0442", value: "490" }, { label: "\u0421\u0443\u0434\u044C\u0431\u0430", value: "271" }, { label: "\u0421\u0443\u043A\u043A\u0443\u0431\u044B", value: "484" }, { label: "\u0421\u0443\u043F\u0435\u0440 \u0433\u0435\u0440\u043E\u0438", value: "1039" }, { label: "\u0421\u0443\u0440\u043E\u0432\u0430\u044F \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430", value: "261" }, { label: "\u0422\u0430\u0438\u043D\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u0431\u043E\u043B\u0435\u0437\u043D\u044C", value: "74" }, { label: "\u0422\u0430\u0438\u043D\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u043F\u0440\u043E\u0448\u043B\u043E\u0435", value: "263" }, { label: "\u0422\u0430\u0439\u043D\u0430\u044F \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C", value: "310" }, { label: "\u0422\u0430\u0439\u043D\u044B\u0435 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F", value: "812" }, { label: "\u0422\u0430\u043D\u0446\u043E\u0440\u044B", value: "840" }, { label: "\u0422\u0435\u043B\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u0438", value: "452" }, { label: "\u0422\u0435\u043D\u0442\u0430\u043A\u043B\u0438", value: "693" }, { label: "\u0422\u0435\u0440\u0440\u043E\u0440\u0438\u0441\u0442\u044B", value: "515" }, { label: "\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0440\u0430\u0437\u0440\u044B\u0432", value: "621" }, { label: "\u0422\u0438\u0445\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "546" }, { label: "\u0422\u043E\u043B\u0441\u0442\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "299" }, { label: "\u0422\u043E\u0440\u0433\u043E\u0432\u0446\u044B", value: "416" }, { label: "\u0422\u0440\u0430\u0432\u043B\u044F/\u0411\u0443\u043B\u043B\u0438\u043D\u0433", value: "89" }, { label: "\u0422\u0440\u0430\u0432\u043D\u0438\u043A", value: "708" }, { label: "\u0422\u0440\u0430\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043F\u0440\u043E\u0448\u043B\u043E\u0435", value: "164" }, { label: "\u0422\u0440\u0430\u043D\u0441\u043F\u043B\u0430\u043D\u0442\u0430\u0446\u0438\u044F \u0432\u043E\u0441\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0439", value: "367" }, { label: "\u0422\u0440\u0430\u043F (\u041F\u0443\u0442\u0430\u043D\u0438\u0446\u0430 \u0441 \u0433\u0435\u043D\u0434\u0435\u0440\u043E\u043C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430)", value: "582" }, { label: "\u0422\u0440\u0443\u0434\u043E\u043B\u044E\u0431\u0438\u0432\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "37" }, { label: "\u0422\u044E\u0440\u044C\u043C\u0430", value: "479" }, { label: "\u0423\u0431\u0438\u0439\u0441\u0442\u0432\u0430", value: "84" }, { label: "\u0423\u0431\u0438\u0439\u0446\u044B", value: "248" }, { label: "\u0423\u0431\u0438\u0439\u0446\u044B \u0434\u0440\u0430\u043A\u043E\u043D\u043E\u0432", value: "606" }, { label: "\u0423\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "270" }, { label: "\u0423\u0434\u0430\u0447\u043B\u0438\u0432\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "402" }, { label: "\u0423\u043A\u0440\u043E\u0442\u0438\u0442\u0435\u043B\u044C \u043C\u043E\u043D\u0441\u0442\u0440\u043E\u0432", value: "337" }, { label: "\u0423\u043C\u0435\u043D\u0438\u044F \u0438\u0437 \u043F\u0440\u043E\u0448\u043B\u043E\u0439 \u0436\u0438\u0437\u043D\u0438", value: "280" }, { label: "\u0423\u043C\u043D\u0430\u044F \u043F\u0430\u0440\u0430", value: "493" }, { label: "\u0423\u043C\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "33" }, { label: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u0442\u0435\u0445\u043D\u0438\u043A\u0430 \u041A\u0443\u043B\u044C\u0442\u0438\u0432\u0430\u0446\u0438\u0438", value: "254" }, { label: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u0440\u0443\u0436\u0438\u0435", value: "340" }, { label: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u0438\u0437\u043D\u0435\u0441\u043E\u043C", value: "315" }, { label: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0435\u043C", value: "167" }, { label: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u0440\u043E\u0432\u044C\u044E", value: "764" }, { label: "\u0423\u043F\u0440\u044F\u043C\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "672" }, { label: "\u0423\u0440\u043E\u0434\u043B\u0438\u0432\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "803" }, { label: "\u0423\u0441\u043A\u043E\u0440\u0435\u043D\u043D\u044B\u0439 \u0440\u043E\u0441\u0442", value: "300" }, { label: "\u0423\u0441\u044B\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u0434\u0435\u0442\u0438", value: "481" }, { label: "\u0423\u0441\u044B\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "412" }, { label: "\u0423\u0445\u043E\u0434 \u0437\u0430 \u0434\u0435\u0442\u044C\u043C\u0438", value: "398" }, { label: "\u0423\u0447\u0438\u0442\u0435\u043B\u044F", value: "345" }, { label: "\u0424\u0430\u043C\u0438\u043B\u044C\u044F\u0440\u044B", value: "541" }, { label: "\u0424\u0430\u043D\u0430\u0442\u0438\u0437\u043C", value: "613" }, { label: "\u0424\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0430", value: "322" }, { label: "\u0424\u0430\u043D\u0444\u0438\u043A\u0448\u043D", value: "388" }, { label: "\u0424\u0430\u0440\u043C\u0430\u0446\u0435\u0432\u0442", value: "715" }, { label: "\u0424\u0430\u0440\u043C\u0438\u043D\u0433", value: "379" }, { label: "\u0424\u0435\u0438", value: "210" }, { label: "\u0424\u0435\u043B\u043B\u044F\u0446\u0438\u044F", value: "584" }, { label: "\u0424\u0435\u043D\u0438\u043A\u0441\u044B", value: "374" }, { label: "\u0424\u0435\u0442\u0438\u0448 \u0433\u0440\u0443\u0434\u0438", value: "499" }, { label: "\u0424\u0438\u043B\u043E\u0441\u043E\u0444\u0438\u044F", value: "87" }, { label: "\u0424\u0438\u043B\u044C\u043C\u044B", value: "403" }, { label: "\u0424\u043B\u044D\u0448\u0431\u044D\u043A\u0438", value: "528" }, { label: "\u0424\u043E\u0431\u0438\u0438", value: "100" }, { label: "\u0424\u043E\u043B\u044C\u043A\u043B\u043E\u0440", value: "467" }, { label: "\u0424\u0443\u0442\u0430\u043D\u0430\u0440\u0438", value: "568" }, { label: "\u0424\u0443\u0442\u0443\u0440\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u0435\u0442\u0442\u0438\u043D\u0433", value: "382" }, { label: "\u0424\u044D\u043D\u0442\u0435\u0437\u0438 \u043C\u0438\u0440", value: "126" }, { label: "\u0425\u0430\u043A\u0435\u0440\u044B", value: "399" }, { label: "\u0425\u0430\u0440\u0438\u0437\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0433\u0435\u0440\u043E\u0439", value: "391" }, { label: "\u0425\u0438\u043A\u0438\u043A\u043E\u043C\u043E\u0440\u0438/\u0417\u0430\u0442\u0432\u043E\u0440\u043D\u0438\u043A\u0438", value: "462" }, { label: "\u0425\u0438\u0442\u0440\u043E\u0443\u043C\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "105" }, { label: "\u0425\u043E\u0437\u044F\u0438\u043D \u043F\u043E\u0434\u0437\u0435\u043C\u0435\u043B\u0438\u0439", value: "557" }, { label: "\u0425\u043E\u043B\u043E\u0434\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "259" }, { label: "\u0425\u043E\u0440\u043E\u0448\u0438\u0435 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0441 \u0441\u0435\u043C\u044C\u0435\u0439", value: "506" }, { label: "\u0425\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u0438 \u043C\u043E\u0433\u0438\u043B", value: "68" }, { label: "\u0426\u0435\u043B\u0438\u0442\u0435\u043B\u0438", value: "389" }, { label: "\u0426\u0437\u044F\u043D\u0448\u0438", value: "735" }, { label: "\u0426\u0443\u043D\u0434\u044D\u0440\u044D", value: "445" }, { label: "\u0427\u0430\u0442\u044B", value: "580" }, { label: "\u0427\u0435\u043B\u043E\u0432\u0435\u0447\u0435\u0441\u043A\u043E\u0435 \u043E\u0440\u0443\u0436\u0438\u0435", value: "521" }, { label: "\u0427\u0435\u0441\u0442\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "240" }, { label: "\u0427\u0438\u0442\u044B", value: "238" }, { label: "\u0428\u0430\u043D\u0442\u0430\u0436", value: "526" }, { label: "\u0428\u0435\u0444-\u043F\u043E\u0432\u0430\u0440", value: "239" }, { label: "\u0428\u0438\u043A\u0438\u0433\u0430\u043C\u0438", value: "543" }, { label: "\u0428\u043A\u043E\u043B\u0430 \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0434\u0435\u0432\u043E\u0447\u0435\u043A", value: "633" }, { label: "\u0428\u043E\u0442\u0430", value: "514" }, { label: "\u0428\u043E\u0443-\u0431\u0438\u0437\u043D\u0435\u0441", value: "407" }, { label: "\u0428\u043F\u0438\u043E\u043D\u044B", value: "563" }, { label: "\u042D\u0432\u043E\u043B\u044E\u0446\u0438\u044F", value: "196" }, { label: "\u042D\u0433\u043E\u0438\u0441\u0442\u0438\u0447\u043D\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "539" }, { label: "\u042D\u0439\u0434\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0430\u043C\u044F\u0442\u044C", value: "392" }, { label: "\u042D\u043A\u0437\u043E\u0440\u0441\u0438\u0437\u043C", value: "504" }, { label: "\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0430", value: "492" }, { label: "\u042D\u043A\u0441\u0433\u0438\u0431\u0438\u0446\u0438\u043E\u043D\u0438\u0437\u043C", value: "639" }, { label: "\u042D\u043A\u0441\u043F\u0435\u0440\u0438\u043C\u0435\u043D\u0442\u044B \u0441 \u043B\u044E\u0434\u044C\u043C\u0438", value: "129" }, { label: "\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u043C\u0430\u0433\u0438\u044F", value: "395" }, { label: "\u042D\u043B\u044C\u0444\u044B", value: "172" }, { label: "\u042D\u043C\u043E\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E \u0441\u043B\u0430\u0431\u044B\u0439 \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0433\u0435\u0440\u043E\u0439", value: "816" }, { label: "\u042D\u043F\u0438\u0437\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0439", value: "612" }, { label: "\u042E\u043D\u044B\u0439 \u043B\u044E\u0431\u043E\u0432\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441", value: "446" }, { label: "\u042F\u0434\u044B", value: "410" }, { label: "\u042F\u0437\u044B\u043A\u0430\u0441\u0442\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", value: "406" }, { label: "\u042F\u0437\u044B\u043A\u043E\u0432\u043E\u0439 \u0431\u0430\u0440\u044C\u0435\u0440", value: "59" }, { label: "\u042F\u043D\u0434\u0435\u0440\u0435", value: "208" }, { label: "\u042F\u043F\u043E\u043D\u0441\u043A\u0438\u0435 \u0441\u0438\u043B\u044B \u0441\u0430\u043C\u043E\u043E\u0431\u043E\u0440\u043E\u043D\u044B", value: "559" }, { label: "\u042F\u0440\u043A\u043E \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u043D\u0430\u044F \u0440\u043E\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043B\u0438\u043D\u0438\u044F", value: "272" }, { label: "Abusive Characters", value: "625" }, { label: "Adapted to Visual Novel", value: "1046" }, { label: "Adopted-lead", value: "886" }, { label: "Adultery", value: "866" }, { label: "Affair", value: "645" }, { label: "Age-gap", value: "923" }, { label: "Almost-human-lead", value: "975" }, { label: "An*l", value: "780" }, { label: "Androgynous-male-lead", value: "1002" }, { label: "Anti-hero-lead", value: "976" }, { label: "Apathetic-lead", value: "967" }, { label: "Arms Dealers", value: "839" }, { label: "Army-commander", value: "1003" }, { label: "Artifact-refining", value: "924" }, { label: "Autism", value: "855" }, { label: "Awkward Protagonist", value: "669" }, { label: "Awkward-lead", value: "892" }, { label: "Bestiality", value: "796" }, { label: "Big-breasts", value: "908" }, { label: "Birth-of-a-nation", value: "1004" }, { label: "Bisexual-lead", value: "1027" }, { label: "Body-refining", value: "947" }, { label: "Body-swap/s", value: "1036" }, { label: "Boss-subordinate-relationship", value: "876" }, { label: "Bride-kidnapping", value: "948" }, { label: "Caring-lead", value: "879" }, { label: "Cautious-lead", value: "1032" }, { label: "Changed-man", value: "925" }, { label: "Charismatic-lead", value: "1005" }, { label: "Child-lead", value: "936" }, { label: "Clever-lead", value: "880" }, { label: "Clumsy Love Interests", value: "815" }, { label: "Cold Love Interests", value: "651" }, { label: "Coming of Age", value: "860" }, { label: "Confident-lead", value: "894" }, { label: "Confident-male-lead", value: "951" }, { label: "Confinement", value: "767" }, { label: "Conflicting Loyalties", value: "793" }, { label: "Couple Growth", value: "690" }, { label: "Court Official", value: "863" }, { label: "Cowardly Protagonist", value: "703" }, { label: "Cowardly-lead", value: "1000" }, { label: "Cross-dressing", value: "250" }, { label: "Cunnilingus", value: "867" }, { label: "Cunning-lead", value: "952" }, { label: "Cunning-male-lead", value: "953" }, { label: "Curious Protagonist", value: "849" }, { label: "Cute-lead", value: "887" }, { label: "Dense-lead", value: "868" }, { label: "Determined-lead", value: "972" }, { label: "Developing-technology", value: "1006" }, { label: "Devil/s", value: "1007" }, { label: "Different Social Status", value: "758" }, { label: "Disfigurement", value: "838" }, { label: "Doting Love Interests", value: "665" }, { label: "Doting Older Siblings", value: "609" }, { label: "Doting Parents", value: "530" }, { label: "Dungeon/s-exploring", value: "990" }, { label: "Elderly Protagonist", value: "774" }, { label: "Enlightenment", value: "729" }, { label: "Eunuch", value: "1047" }, { label: "Eye Powers", value: "386" }, { label: "Family Business", value: "785" }, { label: "Famous Parents", value: "790" }, { label: "Famous-lead", value: "897" }, { label: "Fanfic", value: "942" }, { label: "Fated Lovers", value: "797" }, { label: "Fellatio", value: "870" }, { label: "Female-lead", value: "888" }, { label: "First-time-intercourse", value: "871" }, { label: "Fleet Battles", value: "836" }, { label: "Forced Living Arrangements", value: "808" }, { label: "Forced Marriage", value: "835" }, { label: "Former Hero", value: "752" }, { label: "Fujoshi", value: "1045" }, { label: "Galge", value: "848" }, { label: "Gambling", value: "1031" }, { label: "Gamelit", value: "994" }, { label: "Genderless-lead", value: "1008" }, { label: "Glasses-wearing-lead", value: "995" }, { label: "Guardian Relationship", value: "197" }, { label: "H*ndjob", value: "629" }, { label: "Half-human-lead", value: "956" }, { label: "Hard-working-lead", value: "957" }, { label: "Hard-working-male-lead", value: "958" }, { label: "Hard-working-protagonist/s", value: "1030" }, { label: "Harem-seeking-lead", value: "929" }, { label: "Harem-subtext", value: "909" }, { label: "Helpful Protagonist", value: "760" }, { label: "Helpful-lead", value: "882" }, { label: "Hidden-gem", value: "998" }, { label: "High-fantasy", value: "991" }, { label: "Human-becomes-demon/monster", value: "1009" }, { label: "Human-nonhuman-relationship", value: "914" }, { label: "Humanoid-lead", value: "915" }, { label: "Imperial Harem", value: "805" }, { label: "Incubus", value: "1049" }, { label: "Insects", value: "831" }, { label: "Interspatial-storage", value: "959" }, { label: "Kind Love Interests", value: "757" }, { label: "Large-number-of-skills", value: "1010" }, { label: "Legendary-hero", value: "1011" }, { label: "Litrpg", value: "977" }, { label: "Love Rivals", value: "788" }, { label: "Lovers Reunited", value: "853" }, { label: "Low-fantasy", value: "1037" }, { label: "Master-disciple-relationship", value: "899" }, { label: "Matriarchy", value: "807" }, { label: "Mature-lead", value: "900" }, { label: "Mind Break", value: "862" }, { label: "Mismatched Couple", value: "695" }, { label: "Mob Protagonist", value: "648" }, { label: "Mob-lead", value: "902" }, { label: "Modern", value: "988" }, { label: "Monster-pov", value: "1012" }, { label: "Mpreg", value: "856" }, { label: "Multiple-povs", value: "1013" }, { label: "Mystery Solving", value: "710" }, { label: "Naive-lead", value: "1014" }, { label: "Near-death-experience", value: "996" }, { label: "Neet", value: "495" }, { label: "Nightmares", value: "833" }, { label: "Nobility", value: "1015" }, { label: "Non-human-lead", value: "978" }, { label: "Non-humanoid-lead", value: "1016" }, { label: "Not-so-secret-identity", value: "979" }, { label: "Omegaverse", value: "857" }, { label: "Online-game", value: "910" }, { label: "Online-gaming", value: "911" }, { label: "Outdoor Interc**rse", value: "847" }, { label: "Outdoor-intercourse", value: "903" }, { label: "Overprotective Siblings", value: "610" }, { label: "Part-Time Job", value: "865" }, { label: "Past Trauma", value: "726" }, { label: "Past-memories", value: "1017" }, { label: "Persistent Love Interests", value: "714" }, { label: "Perverted-lead", value: "932" }, { label: "Photography", value: "798" }, { label: "Pill Based Cultivation", value: "279" }, { label: "Pill Concocting", value: "245" }, { label: "Pilots", value: "820" }, { label: "Playboys", value: "795" }, { label: "Playful-lead", value: "989" }, { label: "Polyandry", value: "811" }, { label: "Portal-fantasy-/-isekai", value: "992" }, { label: "Pragmatic-lead", value: "884" }, { label: "Profanity", value: "980" }, { label: "Protagonist-loyal-to-love-interest", value: "905" }, { label: "R-15 (\u042F\u043F\u043E\u043D\u0441\u043A\u043E\u0435 \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u043D\u043E\u0435 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0435)", value: "230" }, { label: "Rebellion", value: "834" }, { label: "Reincarnated in a Game World", value: "804" }, { label: "Reluctant Protagonist", value: "696" }, { label: "Reverse R*pe", value: "776" }, { label: "Reversible Couple", value: "854" }, { label: "Ruling-class", value: "943" }, { label: "S*x Friends", value: "750" }, { label: "S*xual Cultivation Technique", value: "823" }, { label: "Salaryman", value: "1035" }, { label: "Satire", value: "981" }, { label: "Schemes And Conspiracies", value: "745" }, { label: "Scientist/s", value: "997" }, { label: "Scientists", value: "1029" }, { label: "Secret Crush", value: "827" }, { label: "Seme Protagonist", value: "1034" }, { label: "Seme-lead", value: "1028" }, { label: "Sentimental Protagonist", value: "1048" }, { label: "Seven-heavenly-virtues", value: "1018" }, { label: "Sexual Cultivation Technique", value: "350" }, { label: "Sexual-content", value: "982" }, { label: "Sexuality", value: "983" }, { label: "Sharing A Body", value: "814" }, { label: "Shotacon", value: "858" }, { label: "Shoujo-Ai Subplot", value: "777" }, { label: "Sibling Rivalry", value: "766" }, { label: "Sibling's Care", value: "1042" }, { label: "Sickly Characters", value: "787" }, { label: "Skills", value: "1019" }, { label: "Slave-harem", value: "1001" }, { label: "Slime", value: "1020" }, { label: "Smart-male-lead", value: "963" }, { label: "Spirit Users", value: "739" }, { label: "Straight Seme", value: "819" }, { label: "Straight Uke", value: "818" }, { label: "Strength-based-social-hierarchy", value: "974" }, { label: "Strong-lead", value: "944" }, { label: "Strong-male-lead", value: "964" }, { label: "Student-teacher-relationship", value: "1026" }, { label: "Suspense", value: "987" }, { label: "Sword-and-sorcery", value: "875" }, { label: "Threesome", value: "574" }, { label: "Transformation Ability", value: "736" }, { label: "Traumatising-content", value: "1040" }, { label: "Underestimated-lead", value: "919" }, { label: "Underestimated-male-lead", value: "966" }, { label: "Unique-abilities", value: "1021" }, { label: "Unique-skill", value: "1022" }, { label: "Unique-skills", value: "1023" }, { label: "Unlimited Flow", value: "1044" }, { label: "Unrequited Love", value: "806" }, { label: "Urban-fantasy", value: "1041" }, { label: "Villainess Noble Girls", value: "719" }, { label: "Weak-lead", value: "885" }, { label: "Web-novel", value: "1024" }], type: u.FilterTypes.ExcludableCheckboxGroup }, tags: { label: "\u0416\u0430\u043D\u0440\u044B", value: { include: [], exclude: [] }, options: [{ label: "\u0411\u043E\u0435\u0432\u044B\u0435 \u0438\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u0430", value: "22" }, { label: "\u0413\u0430\u0440\u0435\u043C", value: "114" }, { label: "\u0413\u0435\u043D\u0434\u0435\u0440 \u0431\u0435\u043D\u0434\u0435\u0440", value: "246" }, { label: "\u0414\u0437\u0451\u0441\u044D\u0439", value: "216" }, { label: "\u0414\u043B\u044F \u0432\u0437\u0440\u043E\u0441\u043B\u044B\u0445", value: "115" }, { label: "\u0414\u043B\u044F \u0432\u0437\u0440\u043E\u0441\u043B\u044B\u0445", value: "258" }, { label: "\u0414\u0440\u0430\u043C\u0430", value: "7" }, { label: "\u0418\u0441\u0442\u043E\u0440\u0438\u0447\u0435\u0441\u043A\u0438\u0439", value: "101" }, { label: "\u041A\u043E\u043C\u0435\u0434\u0438\u044F", value: "17" }, { label: "\u041B\u043E\u043B\u0438\u043A\u043E\u043D", value: "638" }, { label: "\u041C\u0430\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0440\u0435\u0430\u043B\u0438\u0437\u043C", value: "922" }, { label: "\u041C\u0435\u0445\u0430", value: "24" }, { label: "\u041C\u0438\u043B\u0438\u0442\u0430\u0440\u0438", value: "12" }, { label: "\u041C\u0438\u0441\u0442\u0438\u043A\u0430", value: "2" }, { label: "\u041D\u0430\u0443\u0447\u043D\u0430\u044F \u0444\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A\u0430", value: "13" }, { label: "\u041D\u0435\u043F\u0440\u0438\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442\u044C", value: "747" }, { label: "\u041F\u043E\u0432\u0441\u0435\u0434\u043D\u0435\u0432\u043D\u043E\u0441\u0442\u044C", value: "93" }, { label: "\u041F\u0440\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435", value: "11" }, { label: "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u044F", value: "18" }, { label: "\u0420\u043E\u043C\u0430\u043D\u0442\u0438\u043A\u0430", value: "9" }, { label: "\u0421\u0432\u0435\u0440\u0445\u044A\u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435", value: "20" }, { label: "\u0421\u0451\u0434\u0437\u0451", value: "15" }, { label: "\u0421\u0451\u0434\u0437\u0451-\u0430\u0439", value: "23" }, { label: "\u0421\u0451\u043D\u044D\u043D", value: "189" }, { label: "\u0421\u0451\u043D\u044D\u043D-\u0430\u0439", value: "680" }, { label: "\u0421\u043F\u043E\u0440\u0442", value: "420" }, { label: "\u0421\u044D\u0439\u043D\u044D\u043D", value: "5" }, { label: "\u0421\u044E\u0430\u043D\u044C\u0445\u0443\u0430", value: "242" }, { label: "\u0421\u044F\u043D\u044C\u0441\u044F", value: "364" }, { label: "\u0422\u0440\u0430\u0433\u0435\u0434\u0438\u044F", value: "19" }, { label: "\u0422\u0440\u0438\u043B\u043B\u0435\u0440", value: "3" }, { label: "\u0423\u0436\u0430\u0441\u044B", value: "1" }, { label: "\u0423\u0441\u044F", value: "720" }, { label: "\u0424\u044D\u043D\u0442\u0435\u0437\u0438", value: "8" }, { label: "\u0428\u043A\u043E\u043B\u044C\u043D\u0430\u044F \u0436\u0438\u0437\u043D\u044C", value: "21" }, { label: "\u042D\u043A\u0448\u043D", value: "14" }, { label: "\u042D\u0447\u0447\u0438", value: "327" }, { label: "\u042E\u0440\u0438", value: "691" }, { label: "\u042F\u043E\u0439", value: "682" }, { label: "Eastern fantasy", value: "907" }, { label: "Isekai", value: "999" }, { label: "Video games", value: "993" }], type: u.FilterTypes.ExcludableCheckboxGroup } };
    }
    __name(a2, "a");
    return a2.prototype.popularNovels = function(a3, u2) {
      return l(this, arguments, void 0, function(l2, a4) {
        var u3, b2, t2, n2, i2, r, o, s, d, c, h, p, m, g, f, y, S, C, w = a4.showLatestNovels, P = a4.filters;
        return e(this, function(e2) {
          switch (e2.label) {
            case 0:
              return u3 = this.site + "/api/search?page=" + l2 + "&sort=", u3 += w ? "last_chapter_at" : (null === (r = null == P ? void 0 : P.sort) || void 0 === r ? void 0 : r.value) || "computed_rating", u3 += "&status=" + ((null === (o = null == P ? void 0 : P.status) || void 0 === o ? void 0 : o.value) ? null === (s = null == P ? void 0 : P.status) || void 0 === s ? void 0 : s.value : "0"), P && ((null === (c = null === (d = P.country) || void 0 === d ? void 0 : d.value) || void 0 === c ? void 0 : c.length) && (u3 += "&country=" + P.country.value.join(",")), (b2 = [null === (p = null === (h = P.tags) || void 0 === h ? void 0 : h.value) || void 0 === p ? void 0 : p.include, null === (g = null === (m = P.events) || void 0 === m ? void 0 : m.value) || void 0 === g ? void 0 : g.include].flat().filter(function(l3) {
                return l3;
              })).length && (u3 += "&tags:positive=" + b2.join(",")), (t2 = [null === (y = null === (f = P.tags) || void 0 === f ? void 0 : f.value) || void 0 === y ? void 0 : y.exclude, null === (C = null === (S = P.events) || void 0 === S ? void 0 : S.value) || void 0 === C ? void 0 : C.exclude].flat().filter(function(l3) {
                return l3;
              })).length && (u3 += "&tags:negative=" + t2.join(","))), [4, (0, v.fetchApi)(u3 + "&take=40").then(function(l3) {
                return l3.json();
              })];
            case 1:
              return n2 = e2.sent().resource, i2 = [], n2.forEach(function(l3) {
                return i2.push({ name: l3.names.rus || l3.names.eng || l3.names.original, cover: l3.poster.medium, path: l3.id.toString() });
              }), [2, i2];
          }
        });
      });
    }, a2.prototype.parseNovel = function(a3) {
      return l(this, void 0, void 0, function() {
        var l2, u2, i2, r, o, s;
        return e(this, function(e2) {
          switch (e2.label) {
            case 0:
              return [4, (0, v.fetchApi)(this.site + "/api/ranobe/" + a3).then(function(l3) {
                return l3.json();
              })];
            case 1:
              return l2 = e2.sent().data, u2 = { path: a3, name: l2.names.rus || l2.names.eng || "", cover: l2.posters.medium, summary: l2.description.trim(), author: (null === (s = null === (o = null == l2 ? void 0 : l2.authors) || void 0 === o ? void 0 : o[0]) || void 0 === s ? void 0 : s.name_eng) || "", status: n[l2.status.id] || b.NovelStatus.Unknown }, i2 = [l2.tags.events, l2.tags.genres].flat().map(function(l3) {
                var e3, a4;
                return (null === (e3 = null == l3 ? void 0 : l3.names) || void 0 === e3 ? void 0 : e3.rus) || (null === (a4 = null == l3 ? void 0 : l3.names) || void 0 === a4 ? void 0 : a4.eng) || (null == l3 ? void 0 : l3.title);
              }).filter(function(l3) {
                return l3;
              }), i2.length && (u2.genres = i2.join(", ")), r = [], [4, (0, v.fetchApi)(this.site + "/api/ranobe/" + a3 + "/contents").then(function(l3) {
                return l3.json();
              })];
            case 2:
              return e2.sent().volumes.forEach(function(l3) {
                var e3;
                return null === (e3 = l3.chapters) || void 0 === e3 ? void 0 : e3.forEach(function(e4) {
                  return r.push({ name: e4.name, path: a3 + "/" + l3.num + "/" + e4.num, releaseTime: (0, t.default)(1e3 * parseInt(e4.changed_at, 10)).format("LLL"), chapterNumber: r.length + 1 });
                });
              }), u2.chapters = r, [2, u2];
          }
        });
      });
    }, a2.prototype.parseChapter = function(a3) {
      return l(this, void 0, void 0, function() {
        var l2, u2, b2;
        return e(this, function(e2) {
          switch (e2.label) {
            case 0:
              return [4, (0, v.fetchApi)(this.resolveUrl(a3)).then(function(l3) {
                return l3.text();
              })];
            case 1:
              return l2 = e2.sent(), u2 = l2.indexOf('<div class="title-wrapper">'), b2 = l2.indexOf('<div class="ui text container"', u2), [2, l2.substring(u2, b2).replace(/<img data-media-id="(.*?)".*?>/g, '<img src="/api/media/$1">')];
          }
        });
      });
    }, a2.prototype.searchNovels = function(a3) {
      return l(this, void 0, void 0, function() {
        var l2, u2, b2, t2, n2;
        return e(this, function(e2) {
          switch (e2.label) {
            case 0:
              return l2 = "".concat(this.site, "/api/fulltext/global?query=").concat(a3, "&take=10"), [4, (0, v.fetchApi)(l2).then(function(l3) {
                return l3.json();
              })];
            case 1:
              return u2 = e2.sent(), b2 = [], null === (n2 = null === (t2 = null == u2 ? void 0 : u2.find(function(l3) {
                var e3;
                return "ranobe" === (null === (e3 = null == l3 ? void 0 : l3.meta) || void 0 === e3 ? void 0 : e3.key);
              })) || void 0 === t2 ? void 0 : t2.data) || void 0 === n2 || n2.forEach(function(l3) {
                var e3, a4, u3, v2;
                return b2.push({ name: (null === (e3 = null == l3 ? void 0 : l3.names) || void 0 === e3 ? void 0 : e3.rus) || (null === (a4 = null == l3 ? void 0 : l3.names) || void 0 === a4 ? void 0 : a4.eng) || l3.name || (null === (u3 = null == l3 ? void 0 : l3.names) || void 0 === u3 ? void 0 : u3.original) || "", path: l3.id.toString(), cover: null === (v2 = null == l3 ? void 0 : l3.image) || void 0 === v2 ? void 0 : v2.replace("/small", "/medium") });
              }), [2, b2];
          }
        });
      });
    }, a2;
  }();
  exports.default = new i();
})();

if (typeof module !== "undefined" && module.exports) { module.exports = this; }

