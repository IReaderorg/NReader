// Bundled plugin with all dependencies included
// Built for LNReader Android

"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var LNReaderPlugin = function () {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = function __defNormalProp(obj, key, value) {
    return key in obj ? __defProp(obj, key, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: value
    }) : obj[key] = value;
  };
  var __spreadValues = function __spreadValues(a, b) {
    for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) {
      for (var _iterator = _createForOfIteratorHelperLoose(__getOwnPropSymbols(b)), _step; !(_step = _iterator()).done;) {
        var prop = _step.value;
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
      }
    }
    return a;
  };
  var __spreadProps = function __spreadProps(a, b) {
    return __defProps(a, __getOwnPropDescs(b));
  };
  var __name = function __name(target, value) {
    return __defProp(target, "name", {
      value: value,
      configurable: true
    });
  };
  var __esm = function __esm(fn, res) {
    return function __init() {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    };
  };
  var __commonJS = function __commonJS(cb, mod2) {
    return function __require() {
      return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = {
        exports: {}
      }).exports, mod2), mod2.exports;
    };
  };
  var __export = function __export(target, all) {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = function __copyProps(to, from, except, desc) {
    if (from && typeof from === "object" || typeof from === "function") {
      var _loop = function _loop(key) {
        if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: function get() {
            return from[key];
          },
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      };
      for (var _iterator2 = _createForOfIteratorHelperLoose(__getOwnPropNames(from)), _step2; !(_step2 = _iterator2()).done;) {
        var key = _step2.value;
        _loop(key);
      }
    }
    return to;
  };
  var __toESM = function __toESM(mod2, isNodeMode, target) {
    return target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", {
      value: mod2,
      enumerable: true
    }) : target, mod2);
  };
  var __toCommonJS = function __toCommonJS(mod2) {
    return __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod2);
  };

  // ../node_modules/esbuild-plugin-polyfill-node/polyfills/__dirname.js
  var init_dirname = __esm({
    "../node_modules/esbuild-plugin-polyfill-node/polyfills/__dirname.js": function _node_modules_esbuildPluginPolyfillNode_polyfills___dirnameJs() {}
  });

  // ../node_modules/@jspm/core/nodelibs/browser/process.js
  var process = {};
  __export(process, {
    _debugEnd: function _debugEnd() {
      return _debugEnd2;
    },
    _debugProcess: function _debugProcess() {
      return _debugProcess2;
    },
    _events: function _events() {
      return _events2;
    },
    _eventsCount: function _eventsCount() {
      return _eventsCount2;
    },
    _exiting: function _exiting() {
      return _exiting2;
    },
    _fatalExceptions: function _fatalExceptions() {
      return _fatalExceptions2;
    },
    _getActiveHandles: function _getActiveHandles() {
      return _getActiveHandles2;
    },
    _getActiveRequests: function _getActiveRequests() {
      return _getActiveRequests2;
    },
    _kill: function _kill() {
      return _kill2;
    },
    _linkedBinding: function _linkedBinding() {
      return _linkedBinding2;
    },
    _maxListeners: function _maxListeners() {
      return _maxListeners2;
    },
    _preload_modules: function _preload_modules() {
      return _preload_modules2;
    },
    _rawDebug: function _rawDebug() {
      return _rawDebug2;
    },
    _startProfilerIdleNotifier: function _startProfilerIdleNotifier() {
      return _startProfilerIdleNotifier2;
    },
    _stopProfilerIdleNotifier: function _stopProfilerIdleNotifier() {
      return _stopProfilerIdleNotifier2;
    },
    _tickCallback: function _tickCallback() {
      return _tickCallback2;
    },
    abort: function abort() {
      return _abort;
    },
    addListener: function addListener() {
      return _addListener;
    },
    allowedNodeEnvironmentFlags: function allowedNodeEnvironmentFlags() {
      return _allowedNodeEnvironmentFlags;
    },
    arch: function arch() {
      return _arch;
    },
    argv: function argv() {
      return _argv;
    },
    argv0: function argv0() {
      return _argv2;
    },
    assert: function assert() {
      return _assert;
    },
    binding: function binding() {
      return _binding;
    },
    browser: function browser() {
      return _browser;
    },
    chdir: function chdir() {
      return _chdir;
    },
    config: function config() {
      return _config;
    },
    cpuUsage: function cpuUsage() {
      return _cpuUsage;
    },
    cwd: function cwd() {
      return _cwd;
    },
    debugPort: function debugPort() {
      return _debugPort;
    },
    "default": function _default() {
      return process2;
    },
    dlopen: function dlopen() {
      return _dlopen;
    },
    domain: function domain() {
      return _domain;
    },
    emit: function emit() {
      return _emit;
    },
    emitWarning: function emitWarning() {
      return _emitWarning;
    },
    env: function env() {
      return _env;
    },
    execArgv: function execArgv() {
      return _execArgv;
    },
    execPath: function execPath() {
      return _execPath;
    },
    exit: function exit() {
      return _exit;
    },
    features: function features() {
      return _features;
    },
    hasUncaughtExceptionCaptureCallback: function hasUncaughtExceptionCaptureCallback() {
      return _hasUncaughtExceptionCaptureCallback;
    },
    hrtime: function hrtime() {
      return _hrtime;
    },
    kill: function kill() {
      return _kill3;
    },
    listeners: function listeners() {
      return _listeners;
    },
    memoryUsage: function memoryUsage() {
      return _memoryUsage;
    },
    moduleLoadList: function moduleLoadList() {
      return _moduleLoadList;
    },
    nextTick: function nextTick() {
      return _nextTick;
    },
    off: function off() {
      return _off;
    },
    on: function on() {
      return _on;
    },
    once: function once() {
      return _once;
    },
    openStdin: function openStdin() {
      return _openStdin;
    },
    pid: function pid() {
      return _pid;
    },
    platform: function platform() {
      return _platform;
    },
    ppid: function ppid() {
      return _ppid;
    },
    prependListener: function prependListener() {
      return _prependListener;
    },
    prependOnceListener: function prependOnceListener() {
      return _prependOnceListener;
    },
    reallyExit: function reallyExit() {
      return _reallyExit;
    },
    release: function release() {
      return _release;
    },
    removeAllListeners: function removeAllListeners() {
      return _removeAllListeners;
    },
    removeListener: function removeListener() {
      return _removeListener;
    },
    resourceUsage: function resourceUsage() {
      return _resourceUsage;
    },
    setSourceMapsEnabled: function setSourceMapsEnabled() {
      return _setSourceMapsEnabled;
    },
    setUncaughtExceptionCaptureCallback: function setUncaughtExceptionCaptureCallback() {
      return _setUncaughtExceptionCaptureCallback;
    },
    stderr: function stderr() {
      return _stderr;
    },
    stdin: function stdin() {
      return _stdin;
    },
    stdout: function stdout() {
      return _stdout;
    },
    title: function title() {
      return _title;
    },
    umask: function umask() {
      return _umask;
    },
    uptime: function uptime() {
      return _uptime;
    },
    version: function version() {
      return _version;
    },
    versions: function versions() {
      return _versions;
    }
  });
  function unimplemented(name) {
    throw new Error("Node.js process " + name + " is not supported by JSPM core outside of Node.js");
  }
  function cleanUpNextTick() {
    if (!draining || !currentQueue) return;
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) drainQueue();
  }
  function drainQueue() {
    if (draining) return;
    var timeout = setTimeout(cleanUpNextTick, 0);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) currentQueue[queueIndex].run();
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  function _nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) setTimeout(drainQueue, 0);
  }
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  function noop() {}
  function _linkedBinding2(name) {
    unimplemented("_linkedBinding");
  }
  function _dlopen(name) {
    unimplemented("dlopen");
  }
  function _getActiveRequests2() {
    return [];
  }
  function _getActiveHandles2() {
    return [];
  }
  function _assert(condition, message) {
    if (!condition) throw new Error(message || "assertion error");
  }
  function _hasUncaughtExceptionCaptureCallback() {
    return false;
  }
  function _uptime() {
    return _performance.now() / 1e3;
  }
  function _hrtime(previousTimestamp) {
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
  function _on() {
    return process2;
  }
  function _listeners(name) {
    return [];
  }
  var queue, draining, currentQueue, queueIndex, _title, _arch, _platform, _env, _argv, _execArgv, _version, _versions, _emitWarning, _binding, _umask, _cwd, _chdir, _release, _browser, _rawDebug2, _moduleLoadList, _domain, _exiting2, _config, _reallyExit, _kill2, _cpuUsage, _resourceUsage, _memoryUsage, _kill3, _exit, _openStdin, _allowedNodeEnvironmentFlags, _features, _fatalExceptions2, _setUncaughtExceptionCaptureCallback, _tickCallback2, _debugProcess2, _debugEnd2, _startProfilerIdleNotifier2, _stopProfilerIdleNotifier2, _stdout, _stderr, _stdin, _abort, _pid, _ppid, _execPath, _debugPort, _argv2, _preload_modules2, _setSourceMapsEnabled, _performance, nanoPerSec, _maxListeners2, _events2, _eventsCount2, _addListener, _once, _off, _removeListener, _removeAllListeners, _emit, _prependListener, _prependOnceListener, process2, nowOffset;
  var init_process = __esm({
    "../node_modules/@jspm/core/nodelibs/browser/process.js": function _node_modules_Jspm_core_nodelibs_browser_processJs() {
      init_dirname();
      init_buffer2();
      init_process2();
      __name(unimplemented, "unimplemented");
      queue = [];
      draining = false;
      queueIndex = -1;
      __name(cleanUpNextTick, "cleanUpNextTick");
      __name(drainQueue, "drainQueue");
      __name(_nextTick, "nextTick");
      __name(Item, "Item");
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      _title = "browser";
      _arch = "x64";
      _platform = "browser";
      _env = {
        PATH: "/usr/bin",
        LANG: typeof navigator !== "undefined" ? navigator.language + ".UTF-8" : void 0,
        PWD: "/",
        HOME: "/home",
        TMP: "/tmp"
      };
      _argv = ["/usr/bin/node"];
      _execArgv = [];
      _version = "v16.8.0";
      _versions = {};
      _emitWarning = /* @__PURE__ */__name(function (message, type) {
        console.warn((type ? type + ": " : "") + message);
      }, "emitWarning");
      _binding = /* @__PURE__ */__name(function (name) {
        unimplemented("binding");
      }, "binding");
      _umask = /* @__PURE__ */__name(function (mask) {
        return 0;
      }, "umask");
      _cwd = /* @__PURE__ */__name(function () {
        return "/";
      }, "cwd");
      _chdir = /* @__PURE__ */__name(function (dir) {}, "chdir");
      _release = {
        name: "node",
        sourceUrl: "",
        headersUrl: "",
        libUrl: ""
      };
      __name(noop, "noop");
      _browser = true;
      _rawDebug2 = noop;
      _moduleLoadList = [];
      __name(_linkedBinding2, "_linkedBinding");
      _domain = {};
      _exiting2 = false;
      _config = {};
      __name(_dlopen, "dlopen");
      __name(_getActiveRequests2, "_getActiveRequests");
      __name(_getActiveHandles2, "_getActiveHandles");
      _reallyExit = noop;
      _kill2 = noop;
      _cpuUsage = /* @__PURE__ */__name(function () {
        return {};
      }, "cpuUsage");
      _resourceUsage = _cpuUsage;
      _memoryUsage = _cpuUsage;
      _kill3 = noop;
      _exit = noop;
      _openStdin = noop;
      _allowedNodeEnvironmentFlags = {};
      __name(_assert, "assert");
      _features = {
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
      _fatalExceptions2 = noop;
      _setUncaughtExceptionCaptureCallback = noop;
      __name(_hasUncaughtExceptionCaptureCallback, "hasUncaughtExceptionCaptureCallback");
      _tickCallback2 = noop;
      _debugProcess2 = noop;
      _debugEnd2 = noop;
      _startProfilerIdleNotifier2 = noop;
      _stopProfilerIdleNotifier2 = noop;
      _stdout = void 0;
      _stderr = void 0;
      _stdin = void 0;
      _abort = noop;
      _pid = 2;
      _ppid = 1;
      _execPath = "/bin/usr/node";
      _debugPort = 9229;
      _argv2 = "node";
      _preload_modules2 = [];
      _setSourceMapsEnabled = noop;
      _performance = {
        now: typeof performance !== "undefined" ? performance.now.bind(performance) : void 0,
        timing: typeof performance !== "undefined" ? performance.timing : void 0
      };
      if (_performance.now === void 0) {
        nowOffset = Date.now();
        if (_performance.timing && _performance.timing.navigationStart) {
          nowOffset = _performance.timing.navigationStart;
        }
        _performance.now = function () {
          return Date.now() - nowOffset;
        };
      }
      __name(_uptime, "uptime");
      nanoPerSec = 1e9;
      __name(_hrtime, "hrtime");
      _hrtime.bigint = function (time) {
        var diff = _hrtime(time);
        if (typeof BigInt === "undefined") {
          return diff[0] * nanoPerSec + diff[1];
        }
        return BigInt(diff[0] * nanoPerSec) + BigInt(diff[1]);
      };
      _maxListeners2 = 10;
      _events2 = {};
      _eventsCount2 = 0;
      __name(_on, "on");
      _addListener = _on;
      _once = _on;
      _off = _on;
      _removeListener = _on;
      _removeAllListeners = _on;
      _emit = noop;
      _prependListener = _on;
      _prependOnceListener = _on;
      __name(_listeners, "listeners");
      process2 = {
        version: _version,
        versions: _versions,
        arch: _arch,
        platform: _platform,
        browser: _browser,
        release: _release,
        _rawDebug: _rawDebug2,
        moduleLoadList: _moduleLoadList,
        binding: _binding,
        _linkedBinding: _linkedBinding2,
        _events: _events2,
        _eventsCount: _eventsCount2,
        _maxListeners: _maxListeners2,
        on: _on,
        addListener: _addListener,
        once: _once,
        off: _off,
        removeListener: _removeListener,
        removeAllListeners: _removeAllListeners,
        emit: _emit,
        prependListener: _prependListener,
        prependOnceListener: _prependOnceListener,
        listeners: _listeners,
        domain: _domain,
        _exiting: _exiting2,
        config: _config,
        dlopen: _dlopen,
        uptime: _uptime,
        _getActiveRequests: _getActiveRequests2,
        _getActiveHandles: _getActiveHandles2,
        reallyExit: _reallyExit,
        _kill: _kill2,
        cpuUsage: _cpuUsage,
        resourceUsage: _resourceUsage,
        memoryUsage: _memoryUsage,
        kill: _kill3,
        exit: _exit,
        openStdin: _openStdin,
        allowedNodeEnvironmentFlags: _allowedNodeEnvironmentFlags,
        assert: _assert,
        features: _features,
        _fatalExceptions: _fatalExceptions2,
        setUncaughtExceptionCaptureCallback: _setUncaughtExceptionCaptureCallback,
        hasUncaughtExceptionCaptureCallback: _hasUncaughtExceptionCaptureCallback,
        emitWarning: _emitWarning,
        nextTick: _nextTick,
        _tickCallback: _tickCallback2,
        _debugProcess: _debugProcess2,
        _debugEnd: _debugEnd2,
        _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
        _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
        stdout: _stdout,
        stdin: _stdin,
        stderr: _stderr,
        abort: _abort,
        umask: _umask,
        chdir: _chdir,
        cwd: _cwd,
        env: _env,
        title: _title,
        argv: _argv,
        execArgv: _execArgv,
        pid: _pid,
        ppid: _ppid,
        execPath: _execPath,
        debugPort: _debugPort,
        hrtime: _hrtime,
        argv0: _argv2,
        _preload_modules: _preload_modules2,
        setSourceMapsEnabled: _setSourceMapsEnabled
      };
    }
  });

  // ../node_modules/esbuild-plugin-polyfill-node/polyfills/process.js
  var init_process2 = __esm({
    "../node_modules/esbuild-plugin-polyfill-node/polyfills/process.js": function _node_modules_esbuildPluginPolyfillNode_polyfills_processJs() {
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
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
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
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
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
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
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
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
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
    exports$1.read = function (buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports$1.write = function (buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {}
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {}
      buffer[offset + i - d] |= s * 128;
    };
    return exports$1;
  }
  function dew() {
    if (_dewExec) return exports2;
    _dewExec = true;
    var base64 = dew$2();
    var ieee754 = dew$1();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports2.Buffer = Buffer2;
    exports2.SlowBuffer = SlowBuffer;
    exports2.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports2.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        var proto = {
          foo: /* @__PURE__ */__name(function () {
            return 42;
          }, "foo")
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    __name(typedArraySupport, "typedArraySupport");
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: /* @__PURE__ */__name(function () {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      }, "get")
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: /* @__PURE__ */__name(function () {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      }, "get")
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      var buf = new Uint8Array(length);
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
      var valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      var b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    __name(from, "from");
    Buffer2.from = function (value, encodingOrOffset, length) {
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
    Buffer2.alloc = function (size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    __name(allocUnsafe, "allocUnsafe");
    Buffer2.allocUnsafe = function (size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function (size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      var length = byteLength(string, encoding) | 0;
      var buf = createBuffer(length);
      var actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    __name(fromString, "fromString");
    function fromArrayLike(array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      var buf = createBuffer(length);
      for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    __name(fromArrayLike, "fromArrayLike");
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        var copy = new Uint8Array(arrayView);
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
      var buf;
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
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);
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
    Buffer2.isBuffer = /* @__PURE__ */__name(function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    }, "isBuffer");
    Buffer2.compare = /* @__PURE__ */__name(function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a === b) return 0;
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    }, "compare");
    Buffer2.isEncoding = /* @__PURE__ */__name(function isEncoding(encoding) {
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
    Buffer2.concat = /* @__PURE__ */__name(function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer = Buffer2.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
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
      var len = string.length;
      var mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      var loweredCase = false;
      for (;;) {
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
      var loweredCase = false;
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
    function swap(b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    __name(swap, "swap");
    Buffer2.prototype.swap16 = /* @__PURE__ */__name(function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    }, "swap16");
    Buffer2.prototype.swap32 = /* @__PURE__ */__name(function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    }, "swap32");
    Buffer2.prototype.swap64 = /* @__PURE__ */__name(function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    }, "swap64");
    Buffer2.prototype.toString = /* @__PURE__ */__name(function toString() {
      var length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    }, "toString");
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = /* @__PURE__ */__name(function equals(b) {
      if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer2.compare(this, b) === 0;
    }, "equals");
    Buffer2.prototype.inspect = /* @__PURE__ */__name(function inspect() {
      var str = "";
      var max = exports2.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    }, "inspect");
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = /* @__PURE__ */__name(function compare(target, start, end, thisStart, thisEnd) {
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
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
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
        if (dir) return -1;else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;else return -1;
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
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
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
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      __name(read, "read");
      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    __name(arrayIndexOf, "arrayIndexOf");
    Buffer2.prototype.includes = /* @__PURE__ */__name(function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    }, "includes");
    Buffer2.prototype.indexOf = /* @__PURE__ */__name(function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    }, "indexOf");
    Buffer2.prototype.lastIndexOf = /* @__PURE__ */__name(function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    }, "lastIndexOf");
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      var strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      var i;
      for (i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
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
    Buffer2.prototype.write = /* @__PURE__ */__name(function write(string, offset, length, encoding) {
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
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      var loweredCase = false;
      for (;;) {
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
    Buffer2.prototype.toJSON = /* @__PURE__ */__name(function toJSON() {
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
      var res = [];
      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          var secondByte = void 0,
            thirdByte = void 0,
            fourthByte = void 0,
            tempCodePoint = void 0;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
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
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    __name(utf8Slice, "utf8Slice");
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      var res = "";
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    __name(decodeCodePointsArray, "decodeCodePointsArray");
    function asciiSlice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    __name(asciiSlice, "asciiSlice");
    function latin1Slice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    __name(latin1Slice, "latin1Slice");
    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      var out = "";
      for (var i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    __name(hexSlice, "hexSlice");
    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = "";
      for (var i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    __name(utf16leSlice, "utf16leSlice");
    Buffer2.prototype.slice = /* @__PURE__ */__name(function slice(start, end) {
      var len = this.length;
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
      var newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    }, "slice");
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    __name(checkOffset, "checkOffset");
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = /* @__PURE__ */__name(function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    }, "readUIntLE");
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = /* @__PURE__ */__name(function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    }, "readUIntBE");
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = /* @__PURE__ */__name(function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    }, "readUInt8");
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = /* @__PURE__ */__name(function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    }, "readUInt16LE");
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = /* @__PURE__ */__name(function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    }, "readUInt16BE");
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = /* @__PURE__ */__name(function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    }, "readUInt32LE");
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = /* @__PURE__ */__name(function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    }, "readUInt32BE");
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(/* @__PURE__ */__name(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      var first = this[offset];
      var last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      var lo = first + this[++offset] * Math.pow(2, 8) + this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 24);
      var hi = this[++offset] + this[++offset] * Math.pow(2, 8) + this[++offset] * Math.pow(2, 16) + last * Math.pow(2, 24);
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    }, "readBigUInt64LE"));
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(/* @__PURE__ */__name(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      var first = this[offset];
      var last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      var hi = first * Math.pow(2, 24) + this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 8) + this[++offset];
      var lo = this[++offset] * Math.pow(2, 24) + this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 8) + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    }, "readBigUInt64BE"));
    Buffer2.prototype.readIntLE = /* @__PURE__ */__name(function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntLE");
    Buffer2.prototype.readIntBE = /* @__PURE__ */__name(function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntBE");
    Buffer2.prototype.readInt8 = /* @__PURE__ */__name(function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    }, "readInt8");
    Buffer2.prototype.readInt16LE = /* @__PURE__ */__name(function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16LE");
    Buffer2.prototype.readInt16BE = /* @__PURE__ */__name(function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16BE");
    Buffer2.prototype.readInt32LE = /* @__PURE__ */__name(function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    }, "readInt32LE");
    Buffer2.prototype.readInt32BE = /* @__PURE__ */__name(function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    }, "readInt32BE");
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(/* @__PURE__ */__name(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      var first = this[offset];
      var last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      var val = this[offset + 4] + this[offset + 5] * Math.pow(2, 8) + this[offset + 6] * Math.pow(2, 16) + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * Math.pow(2, 8) + this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 24));
    }, "readBigInt64LE"));
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(/* @__PURE__ */__name(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      var first = this[offset];
      var last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      var val = (first << 24) +
      // Overflow
      this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 8) + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * Math.pow(2, 24) + this[++offset] * Math.pow(2, 16) + this[++offset] * Math.pow(2, 8) + last);
    }, "readBigInt64BE"));
    Buffer2.prototype.readFloatLE = /* @__PURE__ */__name(function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    }, "readFloatLE");
    Buffer2.prototype.readFloatBE = /* @__PURE__ */__name(function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    }, "readFloatBE");
    Buffer2.prototype.readDoubleLE = /* @__PURE__ */__name(function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    }, "readDoubleLE");
    Buffer2.prototype.readDoubleBE = /* @__PURE__ */__name(function readDoubleBE(offset, noAssert) {
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
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = /* @__PURE__ */__name(function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntLE");
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = /* @__PURE__ */__name(function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntBE");
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = /* @__PURE__ */__name(function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    }, "writeUInt8");
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = /* @__PURE__ */__name(function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    }, "writeUInt16LE");
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = /* @__PURE__ */__name(function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    }, "writeUInt16BE");
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = /* @__PURE__ */__name(function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    }, "writeUInt32LE");
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = /* @__PURE__ */__name(function writeUInt32BE(value, offset, noAssert) {
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
      var lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      var hi = Number(value >> BigInt(32) & BigInt(4294967295));
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
      var lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      var hi = Number(value >> BigInt(32) & BigInt(4294967295));
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
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(/* @__PURE__ */__name(function writeBigUInt64LE(value) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    }, "writeBigUInt64LE"));
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(/* @__PURE__ */__name(function writeBigUInt64BE(value) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    }, "writeBigUInt64BE"));
    Buffer2.prototype.writeIntLE = /* @__PURE__ */__name(function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntLE");
    Buffer2.prototype.writeIntBE = /* @__PURE__ */__name(function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntBE");
    Buffer2.prototype.writeInt8 = /* @__PURE__ */__name(function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    }, "writeInt8");
    Buffer2.prototype.writeInt16LE = /* @__PURE__ */__name(function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    }, "writeInt16LE");
    Buffer2.prototype.writeInt16BE = /* @__PURE__ */__name(function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    }, "writeInt16BE");
    Buffer2.prototype.writeInt32LE = /* @__PURE__ */__name(function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    }, "writeInt32LE");
    Buffer2.prototype.writeInt32BE = /* @__PURE__ */__name(function writeInt32BE(value, offset, noAssert) {
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
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(/* @__PURE__ */__name(function writeBigInt64LE(value) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64LE"));
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(/* @__PURE__ */__name(function writeBigInt64BE(value) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
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
    Buffer2.prototype.writeFloatLE = /* @__PURE__ */__name(function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    }, "writeFloatLE");
    Buffer2.prototype.writeFloatBE = /* @__PURE__ */__name(function writeFloatBE(value, offset, noAssert) {
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
    Buffer2.prototype.writeDoubleLE = /* @__PURE__ */__name(function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    }, "writeDoubleLE");
    Buffer2.prototype.writeDoubleBE = /* @__PURE__ */__name(function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    }, "writeDoubleBE");
    Buffer2.prototype.copy = /* @__PURE__ */__name(function copy(target, targetStart, start, end) {
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
      var len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len;
    }, "copy");
    Buffer2.prototype.fill = /* @__PURE__ */__name(function fill(val, start, end, encoding) {
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
          var code = val.charCodeAt(0);
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
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        var len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    }, "fill");
    var errors = {};
    function E(sym, getMessage, Base) {
      var _a;
      errors[sym] = (_a = /*#__PURE__*/function (_Base) {
        function _a() {
          var _this2;
          _classCallCheck(this, _a);
          _this2 = _callSuper(this, _a);
          Object.defineProperty(_this2, "message", {
            value: getMessage.apply(_this2, arguments),
            writable: true,
            configurable: true
          });
          _this2.name = "".concat(_this2.name, " [").concat(sym, "]");
          _this2.stack;
          delete _this2.name;
          return _this2;
        }
        _inherits(_a, _Base);
        return _createClass(_a, [{
          key: "code",
          get: function get() {
            return sym;
          },
          set: function set(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value: value,
              writable: true
            });
          }
        }, {
          key: "toString",
          value: function toString() {
            return "".concat(this.name, " [").concat(sym, "]: ").concat(this.message);
          }
        }]);
      }(Base), __name(_a, "NodeError"), _a);
    }
    __name(E, "E");
    E("ERR_BUFFER_OUT_OF_BOUNDS", function (name) {
      if (name) {
        return "".concat(name, " is outside of buffer bounds");
      }
      return "Attempt to access memory outside buffer bounds";
    }, RangeError);
    E("ERR_INVALID_ARG_TYPE", function (name, actual) {
      return "The \"".concat(name, "\" argument must be of type number. Received type ").concat(typeof actual);
    }, TypeError);
    E("ERR_OUT_OF_RANGE", function (str, range, input) {
      var msg = "The value of \"".concat(str, "\" is out of range.");
      var received = input;
      if (Number.isInteger(input) && Math.abs(input) > Math.pow(2, 32)) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > Math.pow(BigInt(2), BigInt(32)) || input < -Math.pow(BigInt(2), BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += " It must be ".concat(range, ". Received ").concat(received);
      return msg;
    }, RangeError);
    function addNumericalSeparator(val) {
      var res = "";
      var i = val.length;
      var start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = "_".concat(val.slice(i - 3, i)).concat(res);
      }
      return "".concat(val.slice(0, i)).concat(res);
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
        var n = typeof min === "bigint" ? "n" : "";
        var range;
        {
          if (min === 0 || min === BigInt(0)) {
            range = ">= 0".concat(n, " and < 2").concat(n, " ** ").concat((byteLength2 + 1) * 8).concat(n);
          } else {
            range = ">= -(2".concat(n, " ** ").concat((byteLength2 + 1) * 8 - 1).concat(n, ") and < 2 ** ").concat((byteLength2 + 1) * 8 - 1).concat(n);
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
      throw new errors.ERR_OUT_OF_RANGE("offset", ">= ".concat(0, " and <= ", length), value);
    }
    __name(boundsError, "boundsError");
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
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
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
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
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    __name(asciiToBytes, "asciiToBytes");
    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
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
      var i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
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
    var hexSliceLookupTable = function () {
      var alphabet = "0123456789abcdef";
      var table = new Array(256);
      for (var i = 0; i < 16; ++i) {
        var i16 = i * 16;
        for (var j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
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
    "../node_modules/@jspm/core/nodelibs/browser/chunk-DtuTasat.js": function _node_modules_Jspm_core_nodelibs_browser_chunkDtuTasatJs() {
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
    "../node_modules/@jspm/core/nodelibs/browser/buffer.js": function _node_modules_Jspm_core_nodelibs_browser_bufferJs() {
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
    "../node_modules/esbuild-plugin-polyfill-node/polyfills/buffer.js": function _node_modules_esbuildPluginPolyfillNode_polyfills_bufferJs() {
      init_buffer();
    }
  });

  // node_modules/@protobufjs/aspromise/index.js
  var require_aspromise = __commonJS({
    "node_modules/@protobufjs/aspromise/index.js": function node_modules_Protobufjs_aspromise_indexJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = asPromise;
      function asPromise(fn, ctx) {
        var params = new Array(arguments.length - 1),
          offset = 0,
          index = 2,
          pending = true;
        while (index < arguments.length) params[offset++] = arguments[index++];
        return new Promise(/* @__PURE__ */__name(function executor(resolve, reject) {
          params[offset] = /* @__PURE__ */__name(function callback(err) {
            if (pending) {
              pending = false;
              if (err) reject(err);else {
                var params2 = new Array(arguments.length - 1),
                  offset2 = 0;
                while (offset2 < params2.length) params2[offset2++] = arguments[offset2];
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
    "node_modules/@protobufjs/base64/index.js": function node_modules_Protobufjs_base64_indexJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var base64 = exports4;
      base64.length = /* @__PURE__ */__name(function length(string) {
        var p = string.length;
        if (!p) return 0;
        var n = 0;
        while (--p % 4 > 1 && string.charAt(p) === "=") ++n;
        return Math.ceil(string.length * 3) / 4 - n;
      }, "length");
      var b64 = new Array(64);
      var s64 = new Array(123);
      for (i = 0; i < 64;) s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
      base64.encode = /* @__PURE__ */__name(function encode(buffer, start, end) {
        var parts = null,
          chunk = [];
        var i2 = 0,
          j = 0,
          t;
        while (start < end) {
          var b = buffer[start++];
          switch (j) {
            case 0:
              chunk[i2++] = b64[b >> 2];
              t = (b & 3) << 4;
              j = 1;
              break;
            case 1:
              chunk[i2++] = b64[t | b >> 4];
              t = (b & 15) << 2;
              j = 2;
              break;
            case 2:
              chunk[i2++] = b64[t | b >> 6];
              chunk[i2++] = b64[b & 63];
              j = 0;
              break;
          }
          if (i2 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i2 = 0;
          }
        }
        if (j) {
          chunk[i2++] = b64[t];
          chunk[i2++] = 61;
          if (j === 1) chunk[i2++] = 61;
        }
        if (parts) {
          if (i2) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i2));
      }, "encode");
      var invalidEncoding = "invalid encoding";
      base64.decode = /* @__PURE__ */__name(function decode(string, buffer, offset) {
        var start = offset;
        var j = 0,
          t;
        for (var i2 = 0; i2 < string.length;) {
          var c = string.charCodeAt(i2++);
          if (c === 61 && j > 1) break;
          if ((c = s64[c]) === void 0) throw Error(invalidEncoding);
          switch (j) {
            case 0:
              t = c;
              j = 1;
              break;
            case 1:
              buffer[offset++] = t << 2 | (c & 48) >> 4;
              t = c;
              j = 2;
              break;
            case 2:
              buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
              t = c;
              j = 3;
              break;
            case 3:
              buffer[offset++] = (t & 3) << 6 | c;
              j = 0;
              break;
          }
        }
        if (j === 1) throw Error(invalidEncoding);
        return offset - start;
      }, "decode");
      base64.test = /* @__PURE__ */__name(function test(string) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
      }, "test");
      var i;
    }
  });

  // node_modules/@protobufjs/eventemitter/index.js
  var require_eventemitter = __commonJS({
    "node_modules/@protobufjs/eventemitter/index.js": function node_modules_Protobufjs_eventemitter_indexJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = EventEmitter;
      function EventEmitter() {
        this._listeners = {};
      }
      __name(EventEmitter, "EventEmitter");
      EventEmitter.prototype.on = /* @__PURE__ */__name(function on2(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn: fn,
          ctx: ctx || this
        });
        return this;
      }, "on");
      EventEmitter.prototype.off = /* @__PURE__ */__name(function off2(evt, fn) {
        if (evt === void 0) this._listeners = {};else {
          if (fn === void 0) this._listeners[evt] = [];else {
            var listeners2 = this._listeners[evt];
            for (var i = 0; i < listeners2.length;) if (listeners2[i].fn === fn) listeners2.splice(i, 1);else ++i;
          }
        }
        return this;
      }, "off");
      EventEmitter.prototype.emit = /* @__PURE__ */__name(function emit2(evt) {
        var listeners2 = this._listeners[evt];
        if (listeners2) {
          var args = [],
            i = 1;
          for (; i < arguments.length;) args.push(arguments[i++]);
          for (i = 0; i < listeners2.length;) listeners2[i].fn.apply(listeners2[i++].ctx, args);
        }
        return this;
      }, "emit");
    }
  });

  // node_modules/@protobufjs/float/index.js
  var require_float = __commonJS({
    "node_modules/@protobufjs/float/index.js": function node_modules_Protobufjs_float_indexJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = factory(factory);
      function factory(exports5) {
        if (typeof Float32Array !== "undefined") (function () {
          var f32 = new Float32Array([-0]),
            f8b = new Uint8Array(f32.buffer),
            le = f8b[3] === 128;
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
        })();else (function () {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) writeUint(1 / val > 0 ? (/* positive */
            0) : (/* negative 0 */
            2147483648), buf, pos);else if (isNaN(val)) writeUint(2143289344, buf, pos);else if (val > 34028234663852886e22) writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);else if (val < 11754943508222875e-54) writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);else {
              var exponent = Math.floor(Math.log(val) / Math.LN2),
                mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          __name(writeFloat_ieee754, "writeFloat_ieee754");
          exports5.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports5.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
              sign = (uint >> 31) * 2 + 1,
              exponent = uint >>> 23 & 255,
              mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          __name(readFloat_ieee754, "readFloat_ieee754");
          exports5.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports5.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
        if (typeof Float64Array !== "undefined") (function () {
          var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le = f8b[7] === 128;
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
        })();else (function () {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? (/* positive */
              0) : (/* negative 0 */
              2147483648), buf, pos + off1);
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
                if (exponent === 1024) exponent = 1023;
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
            var lo = readUint(buf, pos + off0),
              hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
              exponent = hi >>> 20 & 2047,
              mantissa = 4294967296 * (hi & 1048575) + lo;
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
    "node_modules/@protobufjs/inquire/index.js": function node_modules_Protobufjs_inquire_indexJs(exports, module) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module.exports = inquire;
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length)) return mod;
        } catch (e) {}
        return null;
      }
      __name(inquire, "inquire");
    }
  });

  // node_modules/@protobufjs/utf8/index.js
  var require_utf8 = __commonJS({
    "node_modules/@protobufjs/utf8/index.js": function node_modules_Protobufjs_utf8_indexJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var utf8 = exports4;
      utf8.length = /* @__PURE__ */__name(function utf8_length(string) {
        var len = 0,
          c = 0;
        for (var i = 0; i < string.length; ++i) {
          c = string.charCodeAt(i);
          if (c < 128) len += 1;else if (c < 2048) len += 2;else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
            ++i;
            len += 4;
          } else len += 3;
        }
        return len;
      }, "utf8_length");
      utf8.read = /* @__PURE__ */__name(function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1) return "";
        var parts = null,
          chunk = [],
          i = 0,
          t;
        while (start < end) {
          t = buffer[start++];
          if (t < 128) chunk[i++] = t;else if (t > 191 && t < 224) chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
            chunk[i++] = 55296 + (t >> 10);
            chunk[i++] = 56320 + (t & 1023);
          } else chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
          if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
          }
        }
        if (parts) {
          if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
      }, "utf8_read");
      utf8.write = /* @__PURE__ */__name(function utf8_write(string, buffer, offset) {
        var start = offset,
          c1,
          c2;
        for (var i = 0; i < string.length; ++i) {
          c1 = string.charCodeAt(i);
          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
            ++i;
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
    "node_modules/@protobufjs/pool/index.js": function node_modules_Protobufjs_pool_indexJs(exports4, module2) {
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
        return /* @__PURE__ */__name(function pool_alloc(size2) {
          if (size2 < 1 || size2 > MAX) return alloc(size2);
          if (offset + size2 > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
          }
          var buf = slice.call(slab, offset, offset += size2);
          if (offset & 7) offset = (offset | 7) + 1;
          return buf;
        }, "pool_alloc");
      }
      __name(pool, "pool");
    }
  });

  // node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS({
    "node_modules/protobufjs/src/util/longbits.js": function node_modules_protobufjs_src_util_longbitsJs(exports4, module2) {
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
      zero.toNumber = function () {
        return 0;
      };
      zero.zzEncode = zero.zzDecode = function () {
        return this;
      };
      zero.length = function () {
        return 1;
      };
      var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
      LongBits.fromNumber = /* @__PURE__ */__name(function fromNumber(value) {
        if (value === 0) return zero;
        var sign = value < 0;
        if (sign) value = -value;
        var lo = value >>> 0,
          hi = (value - lo) / 4294967296 >>> 0;
        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;
          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295) hi = 0;
          }
        }
        return new LongBits(lo, hi);
      }, "fromNumber");
      LongBits.from = /* @__PURE__ */__name(function from(value) {
        if (typeof value === "number") return LongBits.fromNumber(value);
        if (util.isString(value)) {
          if (util.Long) value = util.Long.fromString(value);else return LongBits.fromNumber(parseInt(value, 10));
        }
        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
      }, "from");
      LongBits.prototype.toNumber = /* @__PURE__ */__name(function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi >>> 0;
          if (!lo) hi = hi + 1 >>> 0;
          return -(lo + hi * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
      }, "toNumber");
      LongBits.prototype.toLong = /* @__PURE__ */__name(function toLong(unsigned) {
        return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : {
          low: this.lo | 0,
          high: this.hi | 0,
          unsigned: Boolean(unsigned)
        };
      }, "toLong");
      var charCodeAt = String.prototype.charCodeAt;
      LongBits.fromHash = /* @__PURE__ */__name(function fromHash(hash) {
        if (hash === zeroHash) return zero;
        return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
      }, "fromHash");
      LongBits.prototype.toHash = /* @__PURE__ */__name(function toHash() {
        return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
      }, "toHash");
      LongBits.prototype.zzEncode = /* @__PURE__ */__name(function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo = (this.lo << 1 ^ mask) >>> 0;
        return this;
      }, "zzEncode");
      LongBits.prototype.zzDecode = /* @__PURE__ */__name(function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi = (this.hi >>> 1 ^ mask) >>> 0;
        return this;
      }, "zzDecode");
      LongBits.prototype.length = /* @__PURE__ */__name(function length() {
        var part0 = this.lo,
          part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
          part2 = this.hi >>> 24;
        return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
      }, "length");
    }
  });

  // node_modules/protobufjs/src/util/minimal.js
  var require_minimal = __commonJS({
    "node_modules/protobufjs/src/util/minimal.js": function node_modules_protobufjs_src_util_minimalJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var util = exports4;
      util.asPromise = require_aspromise();
      util.base64 = require_base64();
      util.EventEmitter = require_eventemitter();
      util["float"] = require_float();
      util.inquire = require_inquire();
      util.utf8 = require_utf8();
      util.pool = require_pool();
      util.LongBits = require_longbits();
      util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
      util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports4;
      util.emptyArray = Object.freeze ? Object.freeze([]) : (/* istanbul ignore next */
      []);
      util.emptyObject = Object.freeze ? Object.freeze({}) : (/* istanbul ignore next */
      {});
      util.isInteger = Number.isInteger || /* istanbul ignore next */
      /* @__PURE__ */__name(function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      }, "isInteger");
      util.isString = /* @__PURE__ */__name(function isString(value) {
        return typeof value === "string" || value instanceof String;
      }, "isString");
      util.isObject = /* @__PURE__ */__name(function isObject(value) {
        return value && typeof value === "object";
      }, "isObject");
      util.isset =
      /**
      * Checks if a property on a message is considered to be present.
      * @param {Object} obj Plain object or message instance
      * @param {string} prop Property name
      * @returns {boolean} `true` if considered to be present, otherwise `false`
      */
      util.isSet = /* @__PURE__ */__name(function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop)) return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      }, "isSet");
      util.Buffer = function () {
        try {
          var Buffer2 = util.inquire("buffer").Buffer;
          return Buffer2.prototype.utf8Write ? Buffer2 : (/* istanbul ignore next */
          null);
        } catch (e) {
          return null;
        }
      }();
      util._Buffer_from = null;
      util._Buffer_allocUnsafe = null;
      util.newBuffer = /* @__PURE__ */__name(function newBuffer(sizeOrArray) {
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
      util.longToHash = /* @__PURE__ */__name(function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
      }, "longToHash");
      util.longFromHash = /* @__PURE__ */__name(function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
      }, "longFromHash");
      function merge(dst, src, ifNotSet) {
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i) if (dst[keys[i]] === void 0 || !ifNotSet) dst[keys[i]] = src[keys[i]];
        return dst;
      }
      __name(merge, "merge");
      util.merge = merge;
      util.lcFirst = /* @__PURE__ */__name(function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      }, "lcFirst");
      function newError(name) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError)) return new CustomError(message, properties);
          Object.defineProperty(this, "message", {
            get: /* @__PURE__ */__name(function () {
              return message;
            }, "get")
          });
          if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError);else Object.defineProperty(this, "stack", {
            value: new Error().stack || ""
          });
          if (properties) merge(this, properties);
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
            get: /* @__PURE__ */__name(function get() {
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
            value: /* @__PURE__ */__name(function value() {
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
      util.oneOfGetter = /* @__PURE__ */__name(function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i = 0; i < fieldNames.length; ++i) fieldMap[fieldNames[i]] = 1;
        return function () {
          for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2) if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null) return keys[i2];
        };
      }, "getOneOf");
      util.oneOfSetter = /* @__PURE__ */__name(function setOneOf(fieldNames) {
        return function (name) {
          for (var i = 0; i < fieldNames.length; ++i) if (fieldNames[i] !== name) delete this[fieldNames[i]];
        };
      }, "setOneOf");
      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };
      util._configure = function () {
        var Buffer2 = util.Buffer;
        if (!Buffer2) {
          util._Buffer_from = util._Buffer_allocUnsafe = null;
          return;
        }
        util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
        /* @__PURE__ */__name(function Buffer_from(value, encoding) {
          return new Buffer2(value, encoding);
        }, "Buffer_from");
        util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
        /* @__PURE__ */__name(function Buffer_allocUnsafe(size) {
          return new Buffer2(size);
        }, "Buffer_allocUnsafe");
      };
    }
  });

  // node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS({
    "node_modules/protobufjs/src/writer.js": function node_modules_protobufjs_src_writerJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Writer;
      var util = require_minimal();
      var BufferWriter;
      var LongBits = util.LongBits,
        base64 = util.base64,
        utf8 = util.utf8;
      function Op(fn, len, val) {
        this.fn = fn;
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      __name(Op, "Op");
      function noop2() {}
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
      var create = /* @__PURE__ */__name(function create2() {
        return util.Buffer ? /* @__PURE__ */__name(function create_buffer_setup() {
          return (Writer.create = /* @__PURE__ */__name(function create_buffer() {
            return new BufferWriter();
          }, "create_buffer"))();
        }, "create_buffer_setup") : /* @__PURE__ */__name(function create_array() {
          return new Writer();
        }, "create_array");
      }, "create");
      Writer.create = create();
      Writer.alloc = /* @__PURE__ */__name(function alloc(size) {
        return new util.Array(size);
      }, "alloc");
      if (util.Array !== Array) Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
      Writer.prototype._push = /* @__PURE__ */__name(function push(fn, len, val) {
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
      Writer.prototype.uint32 = /* @__PURE__ */__name(function write_uint32(value) {
        this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
        return this;
      }, "write_uint32");
      Writer.prototype.int32 = /* @__PURE__ */__name(function write_int32(value) {
        return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
      }, "write_int32");
      Writer.prototype.sint32 = /* @__PURE__ */__name(function write_sint32(value) {
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
      Writer.prototype.uint64 = /* @__PURE__ */__name(function write_uint64(value) {
        var bits = LongBits.from(value);
        return this._push(writeVarint64, bits.length(), bits);
      }, "write_uint64");
      Writer.prototype.int64 = Writer.prototype.uint64;
      Writer.prototype.sint64 = /* @__PURE__ */__name(function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits.length(), bits);
      }, "write_sint64");
      Writer.prototype.bool = /* @__PURE__ */__name(function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
      }, "write_bool");
      function writeFixed32(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      __name(writeFixed32, "writeFixed32");
      Writer.prototype.fixed32 = /* @__PURE__ */__name(function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
      }, "write_fixed32");
      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      Writer.prototype.fixed64 = /* @__PURE__ */__name(function write_fixed64(value) {
        var bits = LongBits.from(value);
        return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
      }, "write_fixed64");
      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      Writer.prototype["float"] = /* @__PURE__ */__name(function write_float(value) {
        return this._push(util["float"].writeFloatLE, 4, value);
      }, "write_float");
      Writer.prototype["double"] = /* @__PURE__ */__name(function write_double(value) {
        return this._push(util["float"].writeDoubleLE, 8, value);
      }, "write_double");
      var writeBytes = util.Array.prototype.set ? /* @__PURE__ */__name(function writeBytes_set(val, buf, pos) {
        buf.set(val, pos);
      }, "writeBytes_set") : /* @__PURE__ */__name(function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i) buf[pos + i] = val[i];
      }, "writeBytes_for");
      Writer.prototype.bytes = /* @__PURE__ */__name(function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len) return this._push(writeByte, 1, 0);
        if (util.isString(value)) {
          var buf = Writer.alloc(len = base64.length(value));
          base64.decode(value, buf, 0);
          value = buf;
        }
        return this.uint32(len)._push(writeBytes, len, value);
      }, "write_bytes");
      Writer.prototype.string = /* @__PURE__ */__name(function write_string(value) {
        var len = utf8.length(value);
        return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
      }, "write_string");
      Writer.prototype.fork = /* @__PURE__ */__name(function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop2, 0, 0);
        this.len = 0;
        return this;
      }, "fork");
      Writer.prototype.reset = /* @__PURE__ */__name(function reset() {
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
      Writer.prototype.ldelim = /* @__PURE__ */__name(function ldelim() {
        var head = this.head,
          tail = this.tail,
          len = this.len;
        this.reset().uint32(len);
        if (len) {
          this.tail.next = head.next;
          this.tail = tail;
          this.len += len;
        }
        return this;
      }, "ldelim");
      Writer.prototype.finish = /* @__PURE__ */__name(function finish() {
        var head = this.head.next,
          buf = this.constructor.alloc(this.len),
          pos = 0;
        while (head) {
          head.fn(head.val, buf, pos);
          pos += head.len;
          head = head.next;
        }
        return buf;
      }, "finish");
      Writer._configure = function (BufferWriter_) {
        BufferWriter = BufferWriter_;
        Writer.create = create();
        BufferWriter._configure();
      };
    }
  });

  // node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS({
    "node_modules/protobufjs/src/writer_buffer.js": function node_modules_protobufjs_src_writer_bufferJs(exports4, module2) {
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
      BufferWriter._configure = function () {
        BufferWriter.alloc = util._Buffer_allocUnsafe;
        BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? /* @__PURE__ */__name(function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos);
        }, "writeBytesBuffer_set") : /* @__PURE__ */__name(function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy) val.copy(buf, pos, 0, val.length);else for (var i = 0; i < val.length;) buf[pos++] = val[i++];
        }, "writeBytesBuffer_copy");
      };
      BufferWriter.prototype.bytes = /* @__PURE__ */__name(function write_bytes_buffer(value) {
        if (util.isString(value)) value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len) this._push(BufferWriter.writeBytesBuffer, len, value);
        return this;
      }, "write_bytes_buffer");
      function writeStringBuffer(val, buf, pos) {
        if (val.length < 40) util.utf8.write(val, buf, pos);else if (buf.utf8Write) buf.utf8Write(val, pos);else buf.write(val, pos);
      }
      __name(writeStringBuffer, "writeStringBuffer");
      BufferWriter.prototype.string = /* @__PURE__ */__name(function write_string_buffer(value) {
        var len = util.Buffer.byteLength(value);
        this.uint32(len);
        if (len) this._push(writeStringBuffer, len, value);
        return this;
      }, "write_string_buffer");
      BufferWriter._configure();
    }
  });

  // node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS({
    "node_modules/protobufjs/src/reader.js": function node_modules_protobufjs_src_readerJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Reader;
      var util = require_minimal();
      var BufferReader;
      var LongBits = util.LongBits,
        utf8 = util.utf8;
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
      var create_array = typeof Uint8Array !== "undefined" ? /* @__PURE__ */__name(function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer)) return new Reader(buffer);
        throw Error("illegal buffer");
      }, "create_typed_array") : /* @__PURE__ */__name(function create_array2(buffer) {
        if (Array.isArray(buffer)) return new Reader(buffer);
        throw Error("illegal buffer");
      }, "create_array");
      var create = /* @__PURE__ */__name(function create2() {
        return util.Buffer ? /* @__PURE__ */__name(function create_buffer_setup(buffer) {
          return (Reader.create = /* @__PURE__ */__name(function create_buffer(buffer2) {
            return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
          }, "create_buffer"))(buffer);
        }, "create_buffer_setup") : create_array;
      }, "create");
      Reader.create = create();
      Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
      util.Array.prototype.slice;
      Reader.prototype.uint32 = (/* @__PURE__ */__name(function read_uint32_setup() {
        var value = 4294967295;
        return /* @__PURE__ */__name(function read_uint32() {
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
      Reader.prototype.int32 = /* @__PURE__ */__name(function read_int32() {
        return this.uint32() | 0;
      }, "read_int32");
      Reader.prototype.sint32 = /* @__PURE__ */__name(function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
      }, "read_sint32");
      function readLongVarint() {
        var bits = new LongBits(0, 0);
        var i = 0;
        if (this.len - this.pos > 4) {
          for (; i < 4; ++i) {
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
          i = 0;
        } else {
          for (; i < 3; ++i) {
            if (this.pos >= this.len) throw indexOutOfRange(this);
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
          return bits;
        }
        if (this.len - this.pos > 4) {
          for (; i < 5; ++i) {
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
        } else {
          for (; i < 5; ++i) {
            if (this.pos >= this.len) throw indexOutOfRange(this);
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
          }
        }
        throw Error("invalid varint encoding");
      }
      __name(readLongVarint, "readLongVarint");
      Reader.prototype.bool = /* @__PURE__ */__name(function read_bool() {
        return this.uint32() !== 0;
      }, "read_bool");
      function readFixed32_end(buf, end) {
        return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
      }
      __name(readFixed32_end, "readFixed32_end");
      Reader.prototype.fixed32 = /* @__PURE__ */__name(function read_fixed32() {
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4);
      }, "read_fixed32");
      Reader.prototype.sfixed32 = /* @__PURE__ */__name(function read_sfixed32() {
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4) | 0;
      }, "read_sfixed32");
      function readFixed64() {
        if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
      }
      __name(readFixed64, "readFixed64");
      Reader.prototype["float"] = /* @__PURE__ */__name(function read_float() {
        if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
        var value = util["float"].readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      }, "read_float");
      Reader.prototype["double"] = /* @__PURE__ */__name(function read_double() {
        if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
        var value = util["float"].readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      }, "read_double");
      Reader.prototype.bytes = /* @__PURE__ */__name(function read_bytes() {
        var length = this.uint32(),
          start = this.pos,
          end = this.pos + length;
        if (end > this.len) throw indexOutOfRange(this, length);
        this.pos += length;
        if (Array.isArray(this.buf)) return this.buf.slice(start, end);
        if (start === end) {
          var nativeBuffer = util.Buffer;
          return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
        }
        return this._slice.call(this.buf, start, end);
      }, "read_bytes");
      Reader.prototype.string = /* @__PURE__ */__name(function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
      }, "read_string");
      Reader.prototype.skip = /* @__PURE__ */__name(function skip(length) {
        if (typeof length === "number") {
          if (this.pos + length > this.len) throw indexOutOfRange(this, length);
          this.pos += length;
        } else {
          do {
            if (this.pos >= this.len) throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }
        return this;
      }, "skip");
      Reader.prototype.skipType = function (wireType) {
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
      Reader._configure = function (BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create();
        BufferReader._configure();
        var fn = util.Long ? "toLong" : (/* istanbul ignore next */
        "toNumber");
        util.merge(Reader.prototype, {
          int64: /* @__PURE__ */__name(function read_int64() {
            return readLongVarint.call(this)[fn](false);
          }, "read_int64"),
          uint64: /* @__PURE__ */__name(function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          }, "read_uint64"),
          sint64: /* @__PURE__ */__name(function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          }, "read_sint64"),
          fixed64: /* @__PURE__ */__name(function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          }, "read_fixed64"),
          sfixed64: /* @__PURE__ */__name(function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          }, "read_sfixed64")
        });
      };
    }
  });

  // node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS({
    "node_modules/protobufjs/src/reader_buffer.js": function node_modules_protobufjs_src_reader_bufferJs(exports4, module2) {
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
      BufferReader._configure = function () {
        if (util.Buffer) BufferReader.prototype._slice = util.Buffer.prototype.slice;
      };
      BufferReader.prototype.string = /* @__PURE__ */__name(function read_string_buffer() {
        var len = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
      }, "read_string_buffer");
      BufferReader._configure();
    }
  });

  // node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS({
    "node_modules/protobufjs/src/rpc/service.js": function node_modules_protobufjs_src_rpc_serviceJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Service;
      var util = require_minimal();
      (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
      function Service(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function") throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        this.rpcImpl = rpcImpl;
        this.requestDelimited = Boolean(requestDelimited);
        this.responseDelimited = Boolean(responseDelimited);
      }
      __name(Service, "Service");
      Service.prototype.rpcCall = /* @__PURE__ */__name(function rpcCall(method, requestCtor, responseCtor, request, callback) {
        if (!request) throw TypeError("request must be specified");
        var self2 = this;
        if (!callback) return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
        if (!self2.rpcImpl) {
          setTimeout(function () {
            callback(Error("already ended"));
          }, 0);
          return void 0;
        }
        try {
          return self2.rpcImpl(method, requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), /* @__PURE__ */__name(function rpcCallback(err, response) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response === null) {
              self2.end(/* endedByRPC */
              true);
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
          }, "rpcCallback"));
        } catch (err) {
          self2.emit("error", err, method);
          setTimeout(function () {
            callback(err);
          }, 0);
          return void 0;
        }
      }, "rpcCall");
      Service.prototype.end = /* @__PURE__ */__name(function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC) this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }
        return this;
      }, "end");
    }
  });

  // node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS({
    "node_modules/protobufjs/src/rpc.js": function node_modules_protobufjs_src_rpcJs(exports4) {
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
    "node_modules/protobufjs/src/roots.js": function node_modules_protobufjs_src_rootsJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = {};
    }
  });

  // node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS({
    "node_modules/protobufjs/src/index-minimal.js": function node_modules_protobufjs_src_indexMinimalJs(exports4) {
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
    "node_modules/@protobufjs/codegen/index.js": function node_modules_Protobufjs_codegen_indexJs(exports4, module2) {
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
            if (codegen.verbose) console.log("codegen: " + source);
            source = "return " + source;
            if (formatStringOrScope) {
              var scopeKeys = Object.keys(formatStringOrScope),
                scopeParams = new Array(scopeKeys.length + 1),
                scopeValues = new Array(scopeKeys.length),
                scopeOffset = 0;
              while (scopeOffset < scopeKeys.length) {
                scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
              }
              scopeParams[scopeOffset] = source;
              return Function.apply(null, scopeParams).apply(null, scopeValues);
            }
            return Function(source)();
          }
          var formatParams = new Array(arguments.length - 1),
            formatOffset = 0;
          while (formatOffset < formatParams.length) formatParams[formatOffset] = arguments[++formatOffset];
          formatOffset = 0;
          formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, /* @__PURE__ */__name(function replace($0, $1) {
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
          if (formatOffset !== formatParams.length) throw Error("parameter count mismatch");
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
    "node_modules/@protobufjs/fetch/index.js": function node_modules_Protobufjs_fetch_indexJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = fetch2;
      var asPromise = require_aspromise(),
        inquire2 = require_inquire();
      var fs = inquire2("fs");
      function fetch2(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else if (!options) options = {};
        if (!callback) return asPromise(fetch2, this, filename, options);
        if (!options.xhr && fs && fs.readFile) return fs.readFile(filename, /* @__PURE__ */__name(function fetchReadFileCallback(err, contents) {
          return err && typeof XMLHttpRequest !== "undefined" ? fetch2.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
        }, "fetchReadFileCallback"));
        return fetch2.xhr(filename, options, callback);
      }
      __name(fetch2, "fetch");
      fetch2.xhr = /* @__PURE__ */__name(function fetch_xhr(filename, options, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = /* @__PURE__ */__name(function fetchOnReadyStateChange() {
          if (xhr.readyState !== 4) return void 0;
          if (xhr.status !== 0 && xhr.status !== 200) return callback(Error("status " + xhr.status));
          if (options.binary) {
            var buffer = xhr.response;
            if (!buffer) {
              buffer = [];
              for (var i = 0; i < xhr.responseText.length; ++i) buffer.push(xhr.responseText.charCodeAt(i) & 255);
            }
            return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
          }
          return callback(null, xhr.responseText);
        }, "fetchOnReadyStateChange");
        if (options.binary) {
          if ("overrideMimeType" in xhr) xhr.overrideMimeType("text/plain; charset=x-user-defined");
          xhr.responseType = "arraybuffer";
        }
        xhr.open("GET", filename);
        xhr.send();
      }, "fetch_xhr");
    }
  });

  // node_modules/@protobufjs/path/index.js
  var require_path = __commonJS({
    "node_modules/@protobufjs/path/index.js": function node_modules_Protobufjs_path_indexJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var path = exports4;
      var isAbsolute =
      /**
       * Tests if the specified path is absolute.
       * @param {string} path Path to test
       * @returns {boolean} `true` if path is absolute
       */
      path.isAbsolute = /* @__PURE__ */__name(function isAbsolute2(path2) {
        return /^(?:\/|\w+:)/.test(path2);
      }, "isAbsolute");
      var normalize =
      /**
       * Normalizes the specified path.
       * @param {string} path Path to normalize
       * @returns {string} Normalized path
       */
      path.normalize = /* @__PURE__ */__name(function normalize2(path2) {
        path2 = path2.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
        var parts = path2.split("/"),
          absolute = isAbsolute(path2),
          prefix = "";
        if (absolute) prefix = parts.shift() + "/";
        for (var i = 0; i < parts.length;) {
          if (parts[i] === "..") {
            if (i > 0 && parts[i - 1] !== "..") parts.splice(--i, 2);else if (absolute) parts.splice(i, 1);else ++i;
          } else if (parts[i] === ".") parts.splice(i, 1);else ++i;
        }
        return prefix + parts.join("/");
      }, "normalize");
      path.resolve = /* @__PURE__ */__name(function resolve(originPath, includePath, alreadyNormalized) {
        if (!alreadyNormalized) includePath = normalize(includePath);
        if (isAbsolute(includePath)) return includePath;
        if (!alreadyNormalized) originPath = normalize(originPath);
        return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
      }, "resolve");
    }
  });

  // node_modules/protobufjs/src/types.js
  var require_types = __commonJS({
    "node_modules/protobufjs/src/types.js": function node_modules_protobufjs_src_typesJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var types = exports4;
      var util = require_util();
      var s = ["double",
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
        var i = 0,
          o = {};
        offset |= 0;
        while (i < values.length) o[s[i + offset]] = values[i++];
        return o;
      }
      __name(bake, "bake");
      types.basic = bake([/* double   */
      1, /* float    */
      5, /* int32    */
      0, /* uint32   */
      0, /* sint32   */
      0, /* fixed32  */
      5, /* sfixed32 */
      5, /* int64    */
      0, /* uint64   */
      0, /* sint64   */
      0, /* fixed64  */
      1, /* sfixed64 */
      1, /* bool     */
      0, /* string   */
      2, /* bytes    */
      2]);
      types.defaults = bake([/* double   */
      0, /* float    */
      0, /* int32    */
      0, /* uint32   */
      0, /* sint32   */
      0, /* fixed32  */
      0, /* sfixed32 */
      0, /* int64    */
      0, /* uint64   */
      0, /* sint64   */
      0, /* fixed64  */
      0, /* sfixed64 */
      0, /* bool     */
      false, /* string   */
      "", /* bytes    */
      util.emptyArray, /* message  */
      null]);
      types["long"] = bake([/* int64    */
      0, /* uint64   */
      0, /* sint64   */
      0, /* fixed64  */
      1, /* sfixed64 */
      1], 7);
      types.mapKey = bake([/* int32    */
      0, /* uint32   */
      0, /* sint32   */
      0, /* fixed32  */
      5, /* sfixed32 */
      5, /* int64    */
      0, /* uint64   */
      0, /* sint64   */
      0, /* fixed64  */
      1, /* sfixed64 */
      1, /* bool     */
      0, /* string   */
      2], 2);
      types.packed = bake([/* double   */
      1, /* float    */
      5, /* int32    */
      0, /* uint32   */
      0, /* sint32   */
      0, /* fixed32  */
      5, /* sfixed32 */
      5, /* int64    */
      0, /* uint64   */
      0, /* sint64   */
      0, /* fixed64  */
      1, /* sfixed64 */
      1, /* bool     */
      0]);
    }
  });

  // node_modules/protobufjs/src/field.js
  var require_field = __commonJS({
    "node_modules/protobufjs/src/field.js": function node_modules_protobufjs_src_fieldJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Field;
      var ReflectionObject = require_object();
      ((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";
      var Enum = require_enum(),
        types = require_types(),
        util = require_util();
      var Type;
      var ruleRe = /^required|optional|repeated$/;
      Field.fromJSON = /* @__PURE__ */__name(function fromJSON(name, json) {
        return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
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
        if (!util.isInteger(id) || id < 0) throw TypeError("id must be a non-negative integer");
        if (!util.isString(type)) throw TypeError("type must be a string");
        if (rule !== void 0 && !ruleRe.test(rule = rule.toString().toLowerCase())) throw TypeError("rule must be a string rule");
        if (extend !== void 0 && !util.isString(extend)) throw TypeError("extend must be a string");
        if (rule === "proto3_optional") {
          rule = "optional";
        }
        this.rule = rule && rule !== "optional" ? rule : void 0;
        this.type = type;
        this.id = id;
        this.extend = extend || void 0;
        this.required = rule === "required";
        this.optional = !this.required;
        this.repeated = rule === "repeated";
        this.map = false;
        this.message = null;
        this.partOf = null;
        this.typeDefault = null;
        this.defaultValue = null;
        this["long"] = util.Long ? types["long"][type] !== void 0 : (/* istanbul ignore next */
        false);
        this.bytes = type === "bytes";
        this.resolvedType = null;
        this.extensionField = null;
        this.declaringField = null;
        this._packed = null;
        this.comment = comment;
      }
      __name(Field, "Field");
      Object.defineProperty(Field.prototype, "packed", {
        get: /* @__PURE__ */__name(function () {
          if (this._packed === null) this._packed = this.getOption("packed") !== false;
          return this._packed;
        }, "get")
      });
      Field.prototype.setOption = /* @__PURE__ */__name(function setOption(name, value, ifNotSet) {
        if (name === "packed") this._packed = null;
        return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
      }, "setOption");
      Field.prototype.toJSON = /* @__PURE__ */__name(function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["rule", this.rule !== "optional" && this.rule || void 0, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", keepComments ? this.comment : void 0]);
      }, "toJSON");
      Field.prototype.resolve = /* @__PURE__ */__name(function resolve() {
        if (this.resolved) return this;
        if ((this.typeDefault = types.defaults[this.type]) === void 0) {
          this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
          if (this.resolvedType instanceof Type) this.typeDefault = null;else this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
        } else if (this.options && this.options.proto3_optional) {
          this.typeDefault = null;
        }
        if (this.options && this.options["default"] != null) {
          this.typeDefault = this.options["default"];
          if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string") this.typeDefault = this.resolvedType.values[this.typeDefault];
        }
        if (this.options) {
          if (this.options.packed === true || this.options.packed !== void 0 && this.resolvedType && !(this.resolvedType instanceof Enum)) delete this.options.packed;
          if (!Object.keys(this.options).length) this.options = void 0;
        }
        if (this["long"]) {
          this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");
          if (Object.freeze) Object.freeze(this.typeDefault);
        } else if (this.bytes && typeof this.typeDefault === "string") {
          var buf;
          if (util.base64.test(this.typeDefault)) util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);else util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
          this.typeDefault = buf;
        }
        if (this.map) this.defaultValue = util.emptyObject;else if (this.repeated) this.defaultValue = util.emptyArray;else this.defaultValue = this.typeDefault;
        if (this.parent instanceof Type) this.parent.ctor.prototype[this.name] = this.defaultValue;
        return ReflectionObject.prototype.resolve.call(this);
      }, "resolve");
      Field.d = /* @__PURE__ */__name(function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
        if (typeof fieldType === "function") fieldType = util.decorateType(fieldType).name;else if (fieldType && typeof fieldType === "object") fieldType = util.decorateEnum(fieldType).name;
        return /* @__PURE__ */__name(function fieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, {
            "default": defaultValue
          }));
        }, "fieldDecorator");
      }, "decorateField");
      Field._configure = /* @__PURE__ */__name(function configure(Type_) {
        Type = Type_;
      }, "configure");
    }
  });

  // node_modules/protobufjs/src/oneof.js
  var require_oneof = __commonJS({
    "node_modules/protobufjs/src/oneof.js": function node_modules_protobufjs_src_oneofJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = OneOf;
      var ReflectionObject = require_object();
      ((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";
      var Field = require_field(),
        util = require_util();
      function OneOf(name, fieldNames, options, comment) {
        if (!Array.isArray(fieldNames)) {
          options = fieldNames;
          fieldNames = void 0;
        }
        ReflectionObject.call(this, name, options);
        if (!(fieldNames === void 0 || Array.isArray(fieldNames))) throw TypeError("fieldNames must be an Array");
        this.oneof = fieldNames || [];
        this.fieldsArray = [];
        this.comment = comment;
      }
      __name(OneOf, "OneOf");
      OneOf.fromJSON = /* @__PURE__ */__name(function fromJSON(name, json) {
        return new OneOf(name, json.oneof, json.options, json.comment);
      }, "fromJSON");
      OneOf.prototype.toJSON = /* @__PURE__ */__name(function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", this.options, "oneof", this.oneof, "comment", keepComments ? this.comment : void 0]);
      }, "toJSON");
      function addFieldsToParent(oneof) {
        if (oneof.parent) {
          for (var i = 0; i < oneof.fieldsArray.length; ++i) if (!oneof.fieldsArray[i].parent) oneof.parent.add(oneof.fieldsArray[i]);
        }
      }
      __name(addFieldsToParent, "addFieldsToParent");
      OneOf.prototype.add = /* @__PURE__ */__name(function add(field) {
        if (!(field instanceof Field)) throw TypeError("field must be a Field");
        if (field.parent && field.parent !== this.parent) field.parent.remove(field);
        this.oneof.push(field.name);
        this.fieldsArray.push(field);
        field.partOf = this;
        addFieldsToParent(this);
        return this;
      }, "add");
      OneOf.prototype.remove = /* @__PURE__ */__name(function remove(field) {
        if (!(field instanceof Field)) throw TypeError("field must be a Field");
        var index = this.fieldsArray.indexOf(field);
        if (index < 0) throw Error(field + " is not a member of " + this);
        this.fieldsArray.splice(index, 1);
        index = this.oneof.indexOf(field.name);
        if (index > -1) this.oneof.splice(index, 1);
        field.partOf = null;
        return this;
      }, "remove");
      OneOf.prototype.onAdd = /* @__PURE__ */__name(function onAdd(parent) {
        ReflectionObject.prototype.onAdd.call(this, parent);
        var self2 = this;
        for (var i = 0; i < this.oneof.length; ++i) {
          var field = parent.get(this.oneof[i]);
          if (field && !field.partOf) {
            field.partOf = self2;
            self2.fieldsArray.push(field);
          }
        }
        addFieldsToParent(this);
      }, "onAdd");
      OneOf.prototype.onRemove = /* @__PURE__ */__name(function onRemove(parent) {
        for (var i = 0, field; i < this.fieldsArray.length; ++i) if ((field = this.fieldsArray[i]).parent) field.parent.remove(field);
        ReflectionObject.prototype.onRemove.call(this, parent);
      }, "onRemove");
      OneOf.d = /* @__PURE__ */__name(function decorateOneOf() {
        var fieldNames = new Array(arguments.length),
          index = 0;
        while (index < arguments.length) fieldNames[index] = arguments[index++];
        return /* @__PURE__ */__name(function oneOfDecorator(prototype, oneofName) {
          util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
          Object.defineProperty(prototype, oneofName, {
            get: util.oneOfGetter(fieldNames),
            set: util.oneOfSetter(fieldNames)
          });
        }, "oneOfDecorator");
      }, "decorateOneOf");
    }
  });

  // node_modules/protobufjs/src/namespace.js
  var require_namespace = __commonJS({
    "node_modules/protobufjs/src/namespace.js": function node_modules_protobufjs_src_namespaceJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Namespace;
      var ReflectionObject = require_object();
      ((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";
      var Field = require_field(),
        util = require_util(),
        OneOf = require_oneof();
      var Type, Service, Enum;
      Namespace.fromJSON = /* @__PURE__ */__name(function fromJSON(name, json) {
        return new Namespace(name, json.options).addJSON(json.nested);
      }, "fromJSON");
      function arrayToJSON(array, toJSONOptions) {
        if (!(array && array.length)) return void 0;
        var obj = {};
        for (var i = 0; i < array.length; ++i) obj[array[i].name] = array[i].toJSON(toJSONOptions);
        return obj;
      }
      __name(arrayToJSON, "arrayToJSON");
      Namespace.arrayToJSON = arrayToJSON;
      Namespace.isReservedId = /* @__PURE__ */__name(function isReservedId(reserved, id) {
        if (reserved) {
          for (var i = 0; i < reserved.length; ++i) if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] > id) return true;
        }
        return false;
      }, "isReservedId");
      Namespace.isReservedName = /* @__PURE__ */__name(function isReservedName(reserved, name) {
        if (reserved) {
          for (var i = 0; i < reserved.length; ++i) if (reserved[i] === name) return true;
        }
        return false;
      }, "isReservedName");
      function Namespace(name, options) {
        ReflectionObject.call(this, name, options);
        this.nested = void 0;
        this._nestedArray = null;
      }
      __name(Namespace, "Namespace");
      function clearCache(namespace) {
        namespace._nestedArray = null;
        return namespace;
      }
      __name(clearCache, "clearCache");
      Object.defineProperty(Namespace.prototype, "nestedArray", {
        get: /* @__PURE__ */__name(function () {
          return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
        }, "get")
      });
      Namespace.prototype.toJSON = /* @__PURE__ */__name(function toJSON(toJSONOptions) {
        return util.toObject(["options", this.options, "nested", arrayToJSON(this.nestedArray, toJSONOptions)]);
      }, "toJSON");
      Namespace.prototype.addJSON = /* @__PURE__ */__name(function addJSON(nestedJson) {
        var ns = this;
        if (nestedJson) {
          for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
            nested = nestedJson[names[i]];
            ns.add(
            // most to least likely
            (nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : nested.id !== void 0 ? Field.fromJSON : Namespace.fromJSON)(names[i], nested));
          }
        }
        return this;
      }, "addJSON");
      Namespace.prototype.get = /* @__PURE__ */__name(function get(name) {
        return this.nested && this.nested[name] || null;
      }, "get");
      Namespace.prototype.getEnum = /* @__PURE__ */__name(function getEnum(name) {
        if (this.nested && this.nested[name] instanceof Enum) return this.nested[name].values;
        throw Error("no such enum: " + name);
      }, "getEnum");
      Namespace.prototype.add = /* @__PURE__ */__name(function add(object) {
        if (!(object instanceof Field && object.extend !== void 0 || object instanceof Type || object instanceof OneOf || object instanceof Enum || object instanceof Service || object instanceof Namespace)) throw TypeError("object must be a valid nested object");
        if (!this.nested) this.nested = {};else {
          var prev = this.get(object.name);
          if (prev) {
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
              var nested = prev.nestedArray;
              for (var i = 0; i < nested.length; ++i) object.add(nested[i]);
              this.remove(prev);
              if (!this.nested) this.nested = {};
              object.setOptions(prev.options, true);
            } else throw Error("duplicate name '" + object.name + "' in " + this);
          }
        }
        this.nested[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
      }, "add");
      Namespace.prototype.remove = /* @__PURE__ */__name(function remove(object) {
        if (!(object instanceof ReflectionObject)) throw TypeError("object must be a ReflectionObject");
        if (object.parent !== this) throw Error(object + " is not a member of " + this);
        delete this.nested[object.name];
        if (!Object.keys(this.nested).length) this.nested = void 0;
        object.onRemove(this);
        return clearCache(this);
      }, "remove");
      Namespace.prototype.define = /* @__PURE__ */__name(function define2(path, json) {
        if (util.isString(path)) path = path.split(".");else if (!Array.isArray(path)) throw TypeError("illegal path");
        if (path && path.length && path[0] === "") throw Error("path must be relative");
        var ptr = this;
        while (path.length > 0) {
          var part = path.shift();
          if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace)) throw Error("path conflicts with non-namespace objects");
          } else ptr.add(ptr = new Namespace(part));
        }
        if (json) ptr.addJSON(json);
        return ptr;
      }, "define");
      Namespace.prototype.resolveAll = /* @__PURE__ */__name(function resolveAll() {
        var nested = this.nestedArray,
          i = 0;
        while (i < nested.length) if (nested[i] instanceof Namespace) nested[i++].resolveAll();else nested[i++].resolve();
        return this.resolve();
      }, "resolveAll");
      Namespace.prototype.lookup = /* @__PURE__ */__name(function lookup(path, filterTypes, parentAlreadyChecked) {
        if (typeof filterTypes === "boolean") {
          parentAlreadyChecked = filterTypes;
          filterTypes = void 0;
        } else if (filterTypes && !Array.isArray(filterTypes)) filterTypes = [filterTypes];
        if (util.isString(path) && path.length) {
          if (path === ".") return this.root;
          path = path.split(".");
        } else if (!path.length) return this;
        if (path[0] === "") return this.root.lookup(path.slice(1), filterTypes);
        var found = this.get(path[0]);
        if (found) {
          if (path.length === 1) {
            if (!filterTypes || filterTypes.indexOf(found.constructor) > -1) return found;
          } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true))) return found;
        } else for (var i = 0; i < this.nestedArray.length; ++i) if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true))) return found;
        if (this.parent === null || parentAlreadyChecked) return null;
        return this.parent.lookup(path, filterTypes);
      }, "lookup");
      Namespace.prototype.lookupType = /* @__PURE__ */__name(function lookupType(path) {
        var found = this.lookup(path, [Type]);
        if (!found) throw Error("no such type: " + path);
        return found;
      }, "lookupType");
      Namespace.prototype.lookupEnum = /* @__PURE__ */__name(function lookupEnum(path) {
        var found = this.lookup(path, [Enum]);
        if (!found) throw Error("no such Enum '" + path + "' in " + this);
        return found;
      }, "lookupEnum");
      Namespace.prototype.lookupTypeOrEnum = /* @__PURE__ */__name(function lookupTypeOrEnum(path) {
        var found = this.lookup(path, [Type, Enum]);
        if (!found) throw Error("no such Type or Enum '" + path + "' in " + this);
        return found;
      }, "lookupTypeOrEnum");
      Namespace.prototype.lookupService = /* @__PURE__ */__name(function lookupService(path) {
        var found = this.lookup(path, [Service]);
        if (!found) throw Error("no such Service '" + path + "' in " + this);
        return found;
      }, "lookupService");
      Namespace._configure = function (Type_, Service_, Enum_) {
        Type = Type_;
        Service = Service_;
        Enum = Enum_;
      };
    }
  });

  // node_modules/protobufjs/src/mapfield.js
  var require_mapfield = __commonJS({
    "node_modules/protobufjs/src/mapfield.js": function node_modules_protobufjs_src_mapfieldJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = MapField;
      var Field = require_field();
      ((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";
      var types = require_types(),
        util = require_util();
      function MapField(name, id, keyType, type, options, comment) {
        Field.call(this, name, id, type, void 0, void 0, options, comment);
        if (!util.isString(keyType)) throw TypeError("keyType must be a string");
        this.keyType = keyType;
        this.resolvedKeyType = null;
        this.map = true;
      }
      __name(MapField, "MapField");
      MapField.fromJSON = /* @__PURE__ */__name(function fromJSON(name, json) {
        return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
      }, "fromJSON");
      MapField.prototype.toJSON = /* @__PURE__ */__name(function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", keepComments ? this.comment : void 0]);
      }, "toJSON");
      MapField.prototype.resolve = /* @__PURE__ */__name(function resolve() {
        if (this.resolved) return this;
        if (types.mapKey[this.keyType] === void 0) throw Error("invalid key type: " + this.keyType);
        return Field.prototype.resolve.call(this);
      }, "resolve");
      MapField.d = /* @__PURE__ */__name(function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
        if (typeof fieldValueType === "function") fieldValueType = util.decorateType(fieldValueType).name;else if (fieldValueType && typeof fieldValueType === "object") fieldValueType = util.decorateEnum(fieldValueType).name;
        return /* @__PURE__ */__name(function mapFieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
        }, "mapFieldDecorator");
      }, "decorateMapField");
    }
  });

  // node_modules/protobufjs/src/method.js
  var require_method = __commonJS({
    "node_modules/protobufjs/src/method.js": function node_modules_protobufjs_src_methodJs(exports4, module2) {
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
        if (!(type === void 0 || util.isString(type))) throw TypeError("type must be a string");
        if (!util.isString(requestType)) throw TypeError("requestType must be a string");
        if (!util.isString(responseType)) throw TypeError("responseType must be a string");
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
      Method.fromJSON = /* @__PURE__ */__name(function fromJSON(name, json) {
        return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment, json.parsedOptions);
      }, "fromJSON");
      Method.prototype.toJSON = /* @__PURE__ */__name(function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["type", this.type !== "rpc" && /* istanbul ignore next */
        this.type || void 0, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", keepComments ? this.comment : void 0, "parsedOptions", this.parsedOptions]);
      }, "toJSON");
      Method.prototype.resolve = /* @__PURE__ */__name(function resolve() {
        if (this.resolved) return this;
        this.resolvedRequestType = this.parent.lookupType(this.requestType);
        this.resolvedResponseType = this.parent.lookupType(this.responseType);
        return ReflectionObject.prototype.resolve.call(this);
      }, "resolve");
    }
  });

  // node_modules/protobufjs/src/service.js
  var require_service2 = __commonJS({
    "node_modules/protobufjs/src/service.js": function node_modules_protobufjs_src_serviceJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Service;
      var Namespace = require_namespace();
      ((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";
      var Method = require_method(),
        util = require_util(),
        rpc = require_rpc();
      function Service(name, options) {
        Namespace.call(this, name, options);
        this.methods = {};
        this._methodsArray = null;
      }
      __name(Service, "Service");
      Service.fromJSON = /* @__PURE__ */__name(function fromJSON(name, json) {
        var service = new Service(name, json.options);
        if (json.methods) for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i) service.add(Method.fromJSON(names[i], json.methods[names[i]]));
        if (json.nested) service.addJSON(json.nested);
        service.comment = json.comment;
        return service;
      }, "fromJSON");
      Service.prototype.toJSON = /* @__PURE__ */__name(function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", inherited && inherited.options || void 0, "methods", Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */
        {}, "nested", inherited && inherited.nested || void 0, "comment", keepComments ? this.comment : void 0]);
      }, "toJSON");
      Object.defineProperty(Service.prototype, "methodsArray", {
        get: /* @__PURE__ */__name(function () {
          return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
        }, "get")
      });
      function clearCache(service) {
        service._methodsArray = null;
        return service;
      }
      __name(clearCache, "clearCache");
      Service.prototype.get = /* @__PURE__ */__name(function get(name) {
        return this.methods[name] || Namespace.prototype.get.call(this, name);
      }, "get");
      Service.prototype.resolveAll = /* @__PURE__ */__name(function resolveAll() {
        var methods = this.methodsArray;
        for (var i = 0; i < methods.length; ++i) methods[i].resolve();
        return Namespace.prototype.resolve.call(this);
      }, "resolveAll");
      Service.prototype.add = /* @__PURE__ */__name(function add(object) {
        if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);
        if (object instanceof Method) {
          this.methods[object.name] = object;
          object.parent = this;
          return clearCache(this);
        }
        return Namespace.prototype.add.call(this, object);
      }, "add");
      Service.prototype.remove = /* @__PURE__ */__name(function remove(object) {
        if (object instanceof Method) {
          if (this.methods[object.name] !== object) throw Error(object + " is not a member of " + this);
          delete this.methods[object.name];
          object.parent = null;
          return clearCache(this);
        }
        return Namespace.prototype.remove.call(this, object);
      }, "remove");
      Service.prototype.create = /* @__PURE__ */__name(function create(rpcImpl, requestDelimited, responseDelimited) {
        var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
        for (var i = 0, method; i < /* initializes */
        this.methodsArray.length; ++i) {
          var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
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
    "node_modules/protobufjs/src/message.js": function node_modules_protobufjs_src_messageJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Message;
      var util = require_minimal();
      function Message(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) this[keys[i]] = properties[keys[i]];
      }
      __name(Message, "Message");
      Message.create = /* @__PURE__ */__name(function create(properties) {
        return this.$type.create(properties);
      }, "create");
      Message.encode = /* @__PURE__ */__name(function encode(message, writer) {
        return this.$type.encode(message, writer);
      }, "encode");
      Message.encodeDelimited = /* @__PURE__ */__name(function encodeDelimited(message, writer) {
        return this.$type.encodeDelimited(message, writer);
      }, "encodeDelimited");
      Message.decode = /* @__PURE__ */__name(function decode(reader) {
        return this.$type.decode(reader);
      }, "decode");
      Message.decodeDelimited = /* @__PURE__ */__name(function decodeDelimited(reader) {
        return this.$type.decodeDelimited(reader);
      }, "decodeDelimited");
      Message.verify = /* @__PURE__ */__name(function verify(message) {
        return this.$type.verify(message);
      }, "verify");
      Message.fromObject = /* @__PURE__ */__name(function fromObject(object) {
        return this.$type.fromObject(object);
      }, "fromObject");
      Message.toObject = /* @__PURE__ */__name(function toObject(message, options) {
        return this.$type.toObject(message, options);
      }, "toObject");
      Message.prototype.toJSON = /* @__PURE__ */__name(function toJSON() {
        return this.$type.toObject(this, util.toJSONOptions);
      }, "toJSON");
    }
  });

  // node_modules/protobufjs/src/decoder.js
  var require_decoder = __commonJS({
    "node_modules/protobufjs/src/decoder.js": function node_modules_protobufjs_src_decoderJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = decoder;
      var Enum = require_enum(),
        types = require_types(),
        util = require_util();
      function missing(field) {
        return "missing required '" + field.name + "'";
      }
      __name(missing, "missing");
      function decoder(mtype) {
        var gen = util.codegen(["r", "l"], mtype.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function (field2) {
          return field2.map;
        }).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()");
        if (mtype.group) gen("if((t&7)===4)")("break");
        gen("switch(t>>>3){");
        var i = 0;
        for (; i < /* initializes */
        mtype.fieldsArray.length; ++i) {
          var field = mtype._fieldsArray[i].resolve(),
            type = field.resolvedType instanceof Enum ? "int32" : field.type,
            ref = "m" + util.safeProp(field.name);
          gen("case %i: {", field.id);
          if (field.map) {
            gen("if(%s===util.emptyObject)", ref)("%s={}", ref)("var c2 = r.uint32()+r.pos");
            if (types.defaults[field.keyType] !== void 0) gen("k=%j", types.defaults[field.keyType]);else gen("k=null");
            if (types.defaults[type] !== void 0) gen("value=%j", types.defaults[type]);else gen("value=null");
            gen("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", field.keyType)("case 2:");
            if (types.basic[type] === void 0) gen("value=types[%i].decode(r,r.uint32())", i);else gen("value=r.%s()", type);
            gen("break")("default:")("r.skipType(tag2&7)")("break")("}")("}");
            if (types["long"][field.keyType] !== void 0) gen('%s[typeof k==="object"?util.longToHash(k):k]=value', ref);else gen("%s[k]=value", ref);
          } else if (field.repeated) {
            gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref);
            if (types.packed[type] !== void 0) gen("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type)("}else");
            if (types.basic[type] === void 0) gen(field.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);else gen("%s.push(r.%s())", ref, type);
          } else if (types.basic[type] === void 0) gen(field.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", ref, i);else gen("%s=r.%s()", ref, type);
          gen("break")("}");
        }
        gen("default:")("r.skipType(t&7)")("break")("}")("}");
        for (i = 0; i < mtype._fieldsArray.length; ++i) {
          var rfield = mtype._fieldsArray[i];
          if (rfield.required) gen("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
        }
        return gen("return m");
      }
      __name(decoder, "decoder");
    }
  });

  // node_modules/protobufjs/src/verifier.js
  var require_verifier = __commonJS({
    "node_modules/protobufjs/src/verifier.js": function node_modules_protobufjs_src_verifierJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = verifier;
      var Enum = require_enum(),
        util = require_util();
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
        var oneofs = mtype.oneofsArray,
          seenFirstField = {};
        if (oneofs.length) gen("var p={}");
        for (var i = 0; i < /* initializes */
        mtype.fieldsArray.length; ++i) {
          var field = mtype._fieldsArray[i].resolve(),
            ref = "m" + util.safeProp(field.name);
          if (field.optional) gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name);
          if (field.map) {
            gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
            genVerifyKey(gen, field, "k[i]");
            genVerifyValue(gen, field, i, ref + "[k[i]]")("}");
          } else if (field.repeated) {
            gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
            genVerifyValue(gen, field, i, ref + "[i]")("}");
          } else {
            if (field.partOf) {
              var oneofProp = util.safeProp(field.partOf.name);
              if (seenFirstField[field.partOf.name] === 1) gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
              seenFirstField[field.partOf.name] = 1;
              gen("p%s=1", oneofProp);
            }
            genVerifyValue(gen, field, i, ref);
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
    "node_modules/protobufjs/src/converter.js": function node_modules_protobufjs_src_converterJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var converter = exports4;
      var Enum = require_enum(),
        util = require_util();
      function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
        var defaultAlreadyEmitted = false;
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) {
            gen("switch(d%s){", prop);
            for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
              if (values[keys[i]] === field.typeDefault && !defaultAlreadyEmitted) {
                gen("default:")('if(typeof(d%s)==="number"){m%s=d%s;break}', prop, prop, prop);
                if (!field.repeated) gen("break");
                defaultAlreadyEmitted = true;
              }
              gen("case%j:", keys[i])("case %i:", values[keys[i]])("m%s=%j", prop, values[keys[i]])("break");
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
      converter.fromObject = /* @__PURE__ */__name(function fromObject(mtype) {
        var fields = mtype.fieldsArray;
        var gen = util.codegen(["d"], mtype.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
        if (!fields.length) return gen("return new this.ctor");
        gen("var m=new this.ctor");
        for (var i = 0; i < fields.length; ++i) {
          var field = fields[i].resolve(),
            prop = util.safeProp(field.name);
          if (field.map) {
            gen("if(d%s){", prop)('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */
            i, prop + "[ks[i]]")("}")("}");
          } else if (field.repeated) {
            gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */
            i, prop + "[i]")("}")("}");
          } else {
            if (!(field.resolvedType instanceof Enum)) gen("if(d%s!=null){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */
            i, prop);
            if (!(field.resolvedType instanceof Enum)) gen("}");
          }
        }
        return gen("return m");
      }, "fromObject");
      function genValuePartial_toObject(gen, field, fieldIndex, prop) {
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s", prop, fieldIndex, prop, prop, fieldIndex, prop, prop);else gen("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
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
      converter.toObject = /* @__PURE__ */__name(function toObject(mtype) {
        var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
        if (!fields.length) return util.codegen()("return {}");
        var gen = util.codegen(["m", "o"], mtype.name + "$toObject")("if(!o)")("o={}")("var d={}");
        var repeatedFields = [],
          mapFields = [],
          normalFields = [],
          i = 0;
        for (; i < fields.length; ++i) if (!fields[i].partOf) (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
        if (repeatedFields.length) {
          gen("if(o.arrays||o.defaults){");
          for (i = 0; i < repeatedFields.length; ++i) gen("d%s=[]", util.safeProp(repeatedFields[i].name));
          gen("}");
        }
        if (mapFields.length) {
          gen("if(o.objects||o.defaults){");
          for (i = 0; i < mapFields.length; ++i) gen("d%s={}", util.safeProp(mapFields[i].name));
          gen("}");
        }
        if (normalFields.length) {
          gen("if(o.defaults){");
          for (i = 0; i < normalFields.length; ++i) {
            var field = normalFields[i],
              prop = util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);else if (field["long"]) gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());else if (field.bytes) {
              var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
              gen("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))("else{")("d%s=%s", prop, arrayDefault)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)("}");
            } else gen("d%s=%j", prop, field.typeDefault);
          }
          gen("}");
        }
        var hasKs2 = false;
        for (i = 0; i < fields.length; ++i) {
          var field = fields[i],
            index = mtype._fieldsArray.indexOf(field),
            prop = util.safeProp(field.name);
          if (field.map) {
            if (!hasKs2) {
              hasKs2 = true;
              gen("var ks2");
            }
            gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
            genValuePartial_toObject(gen, field, /* sorted */
            index, prop + "[ks2[j]]")("}");
          } else if (field.repeated) {
            gen("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(gen, field, /* sorted */
            index, prop + "[j]")("}");
          } else {
            gen("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name);
            genValuePartial_toObject(gen, field, /* sorted */
            index, prop);
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
    "node_modules/protobufjs/src/wrappers.js": function node_modules_protobufjs_src_wrappersJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var wrappers = exports4;
      var Message = require_message();
      wrappers[".google.protobuf.Any"] = {
        fromObject: /* @__PURE__ */__name(function (object) {
          if (object && object["@type"]) {
            var name = object["@type"].substring(object["@type"].lastIndexOf("/") + 1);
            var type = this.lookup(name);
            if (type) {
              var type_url = object["@type"].charAt(0) === "." ? object["@type"].slice(1) : object["@type"];
              if (type_url.indexOf("/") === -1) {
                type_url = "/" + type_url;
              }
              return this.create({
                type_url: type_url,
                value: type.encode(type.fromObject(object)).finish()
              });
            }
          }
          return this.fromObject(object);
        }, "fromObject"),
        toObject: /* @__PURE__ */__name(function (message, options) {
          var googleApi = "type.googleapis.com/";
          var prefix = "";
          var name = "";
          if (options && options.json && message.type_url && message.value) {
            name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
            prefix = message.type_url.substring(0, message.type_url.lastIndexOf("/") + 1);
            var type = this.lookup(name);
            if (type) message = type.decode(message.value);
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
    "node_modules/protobufjs/src/type.js": function node_modules_protobufjs_src_typeJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Type;
      var Namespace = require_namespace();
      ((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";
      var Enum = require_enum(),
        OneOf = require_oneof(),
        Field = require_field(),
        MapField = require_mapfield(),
        Service = require_service2(),
        Message = require_message(),
        Reader = require_reader(),
        Writer = require_writer(),
        util = require_util(),
        encoder = require_encoder(),
        decoder = require_decoder(),
        verifier = require_verifier(),
        converter = require_converter(),
        wrappers = require_wrappers();
      function Type(name, options) {
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
          get: /* @__PURE__ */__name(function () {
            if (this._fieldsById) return this._fieldsById;
            this._fieldsById = {};
            for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
              var field = this.fields[names[i]],
                id = field.id;
              if (this._fieldsById[id]) throw Error("duplicate id " + id + " in " + this);
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
          get: /* @__PURE__ */__name(function () {
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
          get: /* @__PURE__ */__name(function () {
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
          get: /* @__PURE__ */__name(function () {
            return this._ctor || (this.ctor = Type.generateConstructor(this)());
          }, "get"),
          set: /* @__PURE__ */__name(function (ctor) {
            var prototype = ctor.prototype;
            if (!(prototype instanceof Message)) {
              (ctor.prototype = new Message()).constructor = ctor;
              util.merge(ctor.prototype, prototype);
            }
            ctor.$type = ctor.prototype.$type = this;
            util.merge(ctor, Message, true);
            this._ctor = ctor;
            var i = 0;
            for (; i < /* initializes */
            this.fieldsArray.length; ++i) this._fieldsArray[i].resolve();
            var ctorProperties = {};
            for (i = 0; i < /* initializes */
            this.oneofsArray.length; ++i) ctorProperties[this._oneofsArray[i].resolve().name] = {
              get: util.oneOfGetter(this._oneofsArray[i].oneof),
              set: util.oneOfSetter(this._oneofsArray[i].oneof)
            };
            if (i) Object.defineProperties(ctor.prototype, ctorProperties);
          }, "set")
        }
      });
      Type.generateConstructor = /* @__PURE__ */__name(function generateConstructor(mtype) {
        var gen = util.codegen(["p"], mtype.name);
        for (var i = 0, field; i < mtype.fieldsArray.length; ++i) if ((field = mtype._fieldsArray[i]).map) gen("this%s={}", util.safeProp(field.name));else if (field.repeated) gen("this%s=[]", util.safeProp(field.name));
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
      Type.fromJSON = /* @__PURE__ */__name(function fromJSON(name, json) {
        var type = new Type(name, json.options);
        type.extensions = json.extensions;
        type.reserved = json.reserved;
        var names = Object.keys(json.fields),
          i = 0;
        for (; i < names.length; ++i) type.add((typeof json.fields[names[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i], json.fields[names[i]]));
        if (json.oneofs) for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i) type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
        if (json.nested) for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
          var nested = json.nested[names[i]];
          type.add(
          // most to least likely
          (nested.id !== void 0 ? Field.fromJSON : nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : Namespace.fromJSON)(names[i], nested));
        }
        if (json.extensions && json.extensions.length) type.extensions = json.extensions;
        if (json.reserved && json.reserved.length) type.reserved = json.reserved;
        if (json.group) type.group = true;
        if (json.comment) type.comment = json.comment;
        return type;
      }, "fromJSON");
      Type.prototype.toJSON = /* @__PURE__ */__name(function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", inherited && inherited.options || void 0, "oneofs", Namespace.arrayToJSON(this.oneofsArray, toJSONOptions), "fields", Namespace.arrayToJSON(this.fieldsArray.filter(function (obj) {
          return !obj.declaringField;
        }), toJSONOptions) || {}, "extensions", this.extensions && this.extensions.length ? this.extensions : void 0, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "group", this.group || void 0, "nested", inherited && inherited.nested || void 0, "comment", keepComments ? this.comment : void 0]);
      }, "toJSON");
      Type.prototype.resolveAll = /* @__PURE__ */__name(function resolveAll() {
        var fields = this.fieldsArray,
          i = 0;
        while (i < fields.length) fields[i++].resolve();
        var oneofs = this.oneofsArray;
        i = 0;
        while (i < oneofs.length) oneofs[i++].resolve();
        return Namespace.prototype.resolveAll.call(this);
      }, "resolveAll");
      Type.prototype.get = /* @__PURE__ */__name(function get(name) {
        return this.fields[name] || this.oneofs && this.oneofs[name] || this.nested && this.nested[name] || null;
      }, "get");
      Type.prototype.add = /* @__PURE__ */__name(function add(object) {
        if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);
        if (object instanceof Field && object.extend === void 0) {
          if (this._fieldsById ? (/* istanbul ignore next */
          this._fieldsById[object.id]) : this.fieldsById[object.id]) throw Error("duplicate id " + object.id + " in " + this);
          if (this.isReservedId(object.id)) throw Error("id " + object.id + " is reserved in " + this);
          if (this.isReservedName(object.name)) throw Error("name '" + object.name + "' is reserved in " + this);
          if (object.parent) object.parent.remove(object);
          this.fields[object.name] = object;
          object.message = this;
          object.onAdd(this);
          return clearCache(this);
        }
        if (object instanceof OneOf) {
          if (!this.oneofs) this.oneofs = {};
          this.oneofs[object.name] = object;
          object.onAdd(this);
          return clearCache(this);
        }
        return Namespace.prototype.add.call(this, object);
      }, "add");
      Type.prototype.remove = /* @__PURE__ */__name(function remove(object) {
        if (object instanceof Field && object.extend === void 0) {
          if (!this.fields || this.fields[object.name] !== object) throw Error(object + " is not a member of " + this);
          delete this.fields[object.name];
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }
        if (object instanceof OneOf) {
          if (!this.oneofs || this.oneofs[object.name] !== object) throw Error(object + " is not a member of " + this);
          delete this.oneofs[object.name];
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }
        return Namespace.prototype.remove.call(this, object);
      }, "remove");
      Type.prototype.isReservedId = /* @__PURE__ */__name(function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      }, "isReservedId");
      Type.prototype.isReservedName = /* @__PURE__ */__name(function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      }, "isReservedName");
      Type.prototype.create = /* @__PURE__ */__name(function create(properties) {
        return new this.ctor(properties);
      }, "create");
      Type.prototype.setup = /* @__PURE__ */__name(function setup() {
        var fullName = this.fullName,
          types = [];
        for (var i = 0; i < /* initializes */
        this.fieldsArray.length; ++i) types.push(this._fieldsArray[i].resolve().resolvedType);
        this.encode = encoder(this)({
          Writer: Writer,
          types: types,
          util: util
        });
        this.decode = decoder(this)({
          Reader: Reader,
          types: types,
          util: util
        });
        this.verify = verifier(this)({
          types: types,
          util: util
        });
        this.fromObject = converter.fromObject(this)({
          types: types,
          util: util
        });
        this.toObject = converter.toObject(this)({
          types: types,
          util: util
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
      Type.prototype.encode = /* @__PURE__ */__name(function encode_setup(message, writer) {
        return this.setup().encode(message, writer);
      }, "encode_setup");
      Type.prototype.encodeDelimited = /* @__PURE__ */__name(function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
      }, "encodeDelimited");
      Type.prototype.decode = /* @__PURE__ */__name(function decode_setup(reader, length) {
        return this.setup().decode(reader, length);
      }, "decode_setup");
      Type.prototype.decodeDelimited = /* @__PURE__ */__name(function decodeDelimited(reader) {
        if (!(reader instanceof Reader)) reader = Reader.create(reader);
        return this.decode(reader, reader.uint32());
      }, "decodeDelimited");
      Type.prototype.verify = /* @__PURE__ */__name(function verify_setup(message) {
        return this.setup().verify(message);
      }, "verify_setup");
      Type.prototype.fromObject = /* @__PURE__ */__name(function fromObject(object) {
        return this.setup().fromObject(object);
      }, "fromObject");
      Type.prototype.toObject = /* @__PURE__ */__name(function toObject(message, options) {
        return this.setup().toObject(message, options);
      }, "toObject");
      Type.d = /* @__PURE__ */__name(function decorateType(typeName) {
        return /* @__PURE__ */__name(function typeDecorator(target) {
          util.decorateType(target, typeName);
        }, "typeDecorator");
      }, "decorateType");
    }
  });

  // node_modules/protobufjs/src/root.js
  var require_root = __commonJS({
    "node_modules/protobufjs/src/root.js": function node_modules_protobufjs_src_rootJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Root;
      var Namespace = require_namespace();
      ((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";
      var Field = require_field(),
        Enum = require_enum(),
        OneOf = require_oneof(),
        util = require_util();
      var Type, parse, common;
      function Root(options) {
        Namespace.call(this, "", options);
        this.deferred = [];
        this.files = [];
      }
      __name(Root, "Root");
      Root.fromJSON = /* @__PURE__ */__name(function fromJSON(json, root) {
        if (!root) root = new Root();
        if (json.options) root.setOptions(json.options);
        return root.addJSON(json.nested);
      }, "fromJSON");
      Root.prototype.resolvePath = util.path.resolve;
      Root.prototype.fetch = util.fetch;
      function SYNC() {}
      __name(SYNC, "SYNC");
      Root.prototype.load = /* @__PURE__ */__name(function load(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = void 0;
        }
        var self2 = this;
        if (!callback) return util.asPromise(load, self2, filename, options);
        var sync = callback === SYNC;
        function finish(err, root) {
          if (!callback) return;
          if (sync) throw err;
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
            if (util.isString(source) && source.charAt(0) === "{") source = JSON.parse(source);
            if (!util.isString(source)) self2.setOptions(source.options).addJSON(source.nested);else {
              parse.filename = filename2;
              var parsed = parse(source, self2, options),
                resolved2,
                i2 = 0;
              if (parsed.imports) {
                for (; i2 < parsed.imports.length; ++i2) if (resolved2 = getBundledFileName(parsed.imports[i2]) || self2.resolvePath(filename2, parsed.imports[i2])) fetch2(resolved2);
              }
              if (parsed.weakImports) {
                for (i2 = 0; i2 < parsed.weakImports.length; ++i2) if (resolved2 = getBundledFileName(parsed.weakImports[i2]) || self2.resolvePath(filename2, parsed.weakImports[i2])) fetch2(resolved2, true);
              }
            }
          } catch (err) {
            finish(err);
          }
          if (!sync && !queued) finish(null, self2);
        }
        __name(process3, "process");
        function fetch2(filename2, weak) {
          filename2 = getBundledFileName(filename2) || filename2;
          if (self2.files.indexOf(filename2) > -1) return;
          self2.files.push(filename2);
          if (filename2 in common) {
            if (sync) process3(filename2, common[filename2]);else {
              ++queued;
              setTimeout(function () {
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
              if (!weak) finish(err);
              return;
            }
            process3(filename2, source);
          } else {
            ++queued;
            self2.fetch(filename2, function (err, source2) {
              --queued;
              if (!callback) return;
              if (err) {
                if (!weak) finish(err);else if (!queued) finish(null, self2);
                return;
              }
              process3(filename2, source2);
            });
          }
        }
        __name(fetch2, "fetch");
        var queued = 0;
        if (util.isString(filename)) filename = [filename];
        for (var i = 0, resolved; i < filename.length; ++i) if (resolved = self2.resolvePath("", filename[i])) fetch2(resolved);
        if (sync) return self2;
        if (!queued) finish(null, self2);
        return void 0;
      }, "load");
      Root.prototype.loadSync = /* @__PURE__ */__name(function loadSync(filename, options) {
        if (!util.isNode) throw Error("not supported");
        return this.load(filename, options, SYNC);
      }, "loadSync");
      Root.prototype.resolveAll = /* @__PURE__ */__name(function resolveAll() {
        if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map(function (field) {
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
      Root.prototype._handleAdd = /* @__PURE__ */__name(function _handleAdd(object) {
        if (object instanceof Field) {
          if (/* an extension field (implies not part of a oneof) */
          object.extend !== void 0 && /* not already handled */
          !object.extensionField) {
            if (!tryHandleExtension(this, object)) this.deferred.push(object);
          }
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name)) object.parent[object.name] = object.values;
        } else if (!(object instanceof OneOf)) {
          if (object instanceof Type) for (var i = 0; i < this.deferred.length;) if (tryHandleExtension(this, this.deferred[i])) this.deferred.splice(i, 1);else ++i;
          for (var j = 0; j < /* initializes */
          object.nestedArray.length; ++j) this._handleAdd(object._nestedArray[j]);
          if (exposeRe.test(object.name)) object.parent[object.name] = object;
        }
      }, "_handleAdd");
      Root.prototype._handleRemove = /* @__PURE__ */__name(function _handleRemove(object) {
        if (object instanceof Field) {
          if (/* an extension field */
          object.extend !== void 0) {
            if (/* already handled */
            object.extensionField) {
              object.extensionField.parent.remove(object.extensionField);
              object.extensionField = null;
            } else {
              var index = this.deferred.indexOf(object);
              if (index > -1) this.deferred.splice(index, 1);
            }
          }
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name)) delete object.parent[object.name];
        } else if (object instanceof Namespace) {
          for (var i = 0; i < /* initializes */
          object.nestedArray.length; ++i) this._handleRemove(object._nestedArray[i]);
          if (exposeRe.test(object.name)) delete object.parent[object.name];
        }
      }, "_handleRemove");
      Root._configure = function (Type_, parse_, common_) {
        Type = Type_;
        parse = parse_;
        common = common_;
      };
    }
  });

  // node_modules/protobufjs/src/util.js
  var require_util = __commonJS({
    "node_modules/protobufjs/src/util.js": function node_modules_protobufjs_src_utilJs(exports4, module2) {
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
      util.toArray = /* @__PURE__ */__name(function toArray(object) {
        if (object) {
          var keys = Object.keys(object),
            array = new Array(keys.length),
            index = 0;
          while (index < keys.length) array[index] = object[keys[index++]];
          return array;
        }
        return [];
      }, "toArray");
      util.toObject = /* @__PURE__ */__name(function toObject(array) {
        var object = {},
          index = 0;
        while (index < array.length) {
          var key = array[index++],
            val = array[index++];
          if (val !== void 0) object[key] = val;
        }
        return object;
      }, "toObject");
      var safePropBackslashRe = /\\/g,
        safePropQuoteRe = /"/g;
      util.isReserved = /* @__PURE__ */__name(function isReserved(name) {
        return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
      }, "isReserved");
      util.safeProp = /* @__PURE__ */__name(function safeProp(prop) {
        if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop)) return '["' + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, '\\"') + '"]';
        return "." + prop;
      }, "safeProp");
      util.ucFirst = /* @__PURE__ */__name(function ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
      }, "ucFirst");
      var camelCaseRe = /_([a-z])/g;
      util.camelCase = /* @__PURE__ */__name(function camelCase(str) {
        return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function ($0, $1) {
          return $1.toUpperCase();
        });
      }, "camelCase");
      util.compareFieldsById = /* @__PURE__ */__name(function compareFieldsById(a, b) {
        return a.id - b.id;
      }, "compareFieldsById");
      util.decorateType = /* @__PURE__ */__name(function decorateType(ctor, typeName) {
        if (ctor.$type) {
          if (typeName && ctor.$type.name !== typeName) {
            util.decorateRoot.remove(ctor.$type);
            ctor.$type.name = typeName;
            util.decorateRoot.add(ctor.$type);
          }
          return ctor.$type;
        }
        if (!Type) Type = require_type();
        var type = new Type(typeName || ctor.name);
        util.decorateRoot.add(type);
        type.ctor = ctor;
        Object.defineProperty(ctor, "$type", {
          value: type,
          enumerable: false
        });
        Object.defineProperty(ctor.prototype, "$type", {
          value: type,
          enumerable: false
        });
        return type;
      }, "decorateType");
      var decorateEnumIndex = 0;
      util.decorateEnum = /* @__PURE__ */__name(function decorateEnum(object) {
        if (object.$type) return object.$type;
        if (!Enum) Enum = require_enum();
        var enm = new Enum("Enum" + decorateEnumIndex++, object);
        util.decorateRoot.add(enm);
        Object.defineProperty(object, "$type", {
          value: enm,
          enumerable: false
        });
        return enm;
      }, "decorateEnum");
      util.setProperty = /* @__PURE__ */__name(function setProperty(dst, path, value) {
        function setProp(dst2, path2, value2) {
          var part = path2.shift();
          if (part === "__proto__" || part === "prototype") {
            return dst2;
          }
          if (path2.length > 0) {
            dst2[part] = setProp(dst2[part] || {}, path2, value2);
          } else {
            var prevValue = dst2[part];
            if (prevValue) value2 = [].concat(prevValue).concat(value2);
            dst2[part] = value2;
          }
          return dst2;
        }
        __name(setProp, "setProp");
        if (typeof dst !== "object") throw TypeError("dst must be an object");
        if (!path) throw TypeError("path must be specified");
        path = path.split(".");
        return setProp(dst, path, value);
      }, "setProperty");
      Object.defineProperty(util, "decorateRoot", {
        get: /* @__PURE__ */__name(function () {
          return roots["decorated"] || (roots["decorated"] = new (require_root())());
        }, "get")
      });
    }
  });

  // node_modules/protobufjs/src/object.js
  var require_object = __commonJS({
    "node_modules/protobufjs/src/object.js": function node_modules_protobufjs_src_objectJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = ReflectionObject;
      ReflectionObject.className = "ReflectionObject";
      var util = require_util();
      var Root;
      function ReflectionObject(name, options) {
        if (!util.isString(name)) throw TypeError("name must be a string");
        if (options && !util.isObject(options)) throw TypeError("options must be an object");
        this.options = options;
        this.parsedOptions = null;
        this.name = name;
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
          get: /* @__PURE__ */__name(function () {
            var ptr = this;
            while (ptr.parent !== null) ptr = ptr.parent;
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
          get: /* @__PURE__ */__name(function () {
            var path = [this.name],
              ptr = this.parent;
            while (ptr) {
              path.unshift(ptr.name);
              ptr = ptr.parent;
            }
            return path.join(".");
          }, "get")
        }
      });
      ReflectionObject.prototype.toJSON = /* istanbul ignore next */
      /* @__PURE__ */__name(function toJSON() {
        throw Error();
      }, "toJSON");
      ReflectionObject.prototype.onAdd = /* @__PURE__ */__name(function onAdd(parent) {
        if (this.parent && this.parent !== parent) this.parent.remove(this);
        this.parent = parent;
        this.resolved = false;
        var root = parent.root;
        if (root instanceof Root) root._handleAdd(this);
      }, "onAdd");
      ReflectionObject.prototype.onRemove = /* @__PURE__ */__name(function onRemove(parent) {
        var root = parent.root;
        if (root instanceof Root) root._handleRemove(this);
        this.parent = null;
        this.resolved = false;
      }, "onRemove");
      ReflectionObject.prototype.resolve = /* @__PURE__ */__name(function resolve() {
        if (this.resolved) return this;
        if (this.root instanceof Root) this.resolved = true;
        return this;
      }, "resolve");
      ReflectionObject.prototype.getOption = /* @__PURE__ */__name(function getOption(name) {
        if (this.options) return this.options[name];
        return void 0;
      }, "getOption");
      ReflectionObject.prototype.setOption = /* @__PURE__ */__name(function setOption(name, value, ifNotSet) {
        if (!ifNotSet || !this.options || this.options[name] === void 0) (this.options || (this.options = {}))[name] = value;
        return this;
      }, "setOption");
      ReflectionObject.prototype.setParsedOption = /* @__PURE__ */__name(function setParsedOption(name, value, propName) {
        if (!this.parsedOptions) {
          this.parsedOptions = [];
        }
        var parsedOptions = this.parsedOptions;
        if (propName) {
          var opt = parsedOptions.find(function (opt2) {
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
      ReflectionObject.prototype.setOptions = /* @__PURE__ */__name(function setOptions(options, ifNotSet) {
        if (options) for (var keys = Object.keys(options), i = 0; i < keys.length; ++i) this.setOption(keys[i], options[keys[i]], ifNotSet);
        return this;
      }, "setOptions");
      ReflectionObject.prototype.toString = /* @__PURE__ */__name(function toString() {
        var className = this.constructor.className,
          fullName = this.fullName;
        if (fullName.length) return className + " " + fullName;
        return className;
      }, "toString");
      ReflectionObject._configure = function (Root_) {
        Root = Root_;
      };
    }
  });

  // node_modules/protobufjs/src/enum.js
  var require_enum = __commonJS({
    "node_modules/protobufjs/src/enum.js": function node_modules_protobufjs_src_enumJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = Enum;
      var ReflectionObject = require_object();
      ((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";
      var Namespace = require_namespace(),
        util = require_util();
      function Enum(name, values, options, comment, comments, valuesOptions) {
        ReflectionObject.call(this, name, options);
        if (values && typeof values !== "object") throw TypeError("values must be an object");
        this.valuesById = {};
        this.values = Object.create(this.valuesById);
        this.comment = comment;
        this.comments = comments || {};
        this.valuesOptions = valuesOptions;
        this.reserved = void 0;
        if (values) {
          for (var keys = Object.keys(values), i = 0; i < keys.length; ++i) if (typeof values[keys[i]] === "number") this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
        }
      }
      __name(Enum, "Enum");
      Enum.fromJSON = /* @__PURE__ */__name(function fromJSON(name, json) {
        var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
        enm.reserved = json.reserved;
        return enm;
      }, "fromJSON");
      Enum.prototype.toJSON = /* @__PURE__ */__name(function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject(["options", this.options, "valuesOptions", this.valuesOptions, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "comment", keepComments ? this.comment : void 0, "comments", keepComments ? this.comments : void 0]);
      }, "toJSON");
      Enum.prototype.add = /* @__PURE__ */__name(function add(name, id, comment, options) {
        if (!util.isString(name)) throw TypeError("name must be a string");
        if (!util.isInteger(id)) throw TypeError("id must be an integer");
        if (this.values[name] !== void 0) throw Error("duplicate name '" + name + "' in " + this);
        if (this.isReservedId(id)) throw Error("id " + id + " is reserved in " + this);
        if (this.isReservedName(name)) throw Error("name '" + name + "' is reserved in " + this);
        if (this.valuesById[id] !== void 0) {
          if (!(this.options && this.options.allow_alias)) throw Error("duplicate id " + id + " in " + this);
          this.values[name] = id;
        } else this.valuesById[this.values[name] = id] = name;
        if (options) {
          if (this.valuesOptions === void 0) this.valuesOptions = {};
          this.valuesOptions[name] = options || null;
        }
        this.comments[name] = comment || null;
        return this;
      }, "add");
      Enum.prototype.remove = /* @__PURE__ */__name(function remove(name) {
        if (!util.isString(name)) throw TypeError("name must be a string");
        var val = this.values[name];
        if (val == null) throw Error("name '" + name + "' does not exist in " + this);
        delete this.valuesById[val];
        delete this.values[name];
        delete this.comments[name];
        if (this.valuesOptions) delete this.valuesOptions[name];
        return this;
      }, "remove");
      Enum.prototype.isReservedId = /* @__PURE__ */__name(function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      }, "isReservedId");
      Enum.prototype.isReservedName = /* @__PURE__ */__name(function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      }, "isReservedName");
    }
  });

  // node_modules/protobufjs/src/encoder.js
  var require_encoder = __commonJS({
    "node_modules/protobufjs/src/encoder.js": function node_modules_protobufjs_src_encoderJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = encoder;
      var Enum = require_enum(),
        types = require_types(),
        util = require_util();
      function genTypePartial(gen, field, fieldIndex, ref) {
        return field.resolvedType.group ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
      }
      __name(genTypePartial, "genTypePartial");
      function encoder(mtype) {
        var gen = util.codegen(["m", "w"], mtype.name + "$encode")("if(!w)")("w=Writer.create()");
        var i, ref;
        var fields = /* initializes */
        mtype.fieldsArray.slice().sort(util.compareFieldsById);
        for (var i = 0; i < fields.length; ++i) {
          var field = fields[i].resolve(),
            index = mtype._fieldsArray.indexOf(field),
            type = field.resolvedType instanceof Enum ? "int32" : field.type,
            wireType = types.basic[type];
          ref = "m" + util.safeProp(field.name);
          if (field.map) {
            gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", ref, field.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
            if (wireType === void 0) gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref);else gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen("}")("}");
          } else if (field.repeated) {
            gen("if(%s!=null&&%s.length){", ref, ref);
            if (field.packed && types.packed[type] !== void 0) {
              gen("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type, ref)("w.ldelim()");
            } else {
              gen("for(var i=0;i<%s.length;++i)", ref);
              if (wireType === void 0) genTypePartial(gen, field, index, ref + "[i]");else gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
            }
            gen("}");
          } else {
            if (field.optional) gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", ref, field.name);
            if (wireType === void 0) genTypePartial(gen, field, index, ref);else gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
          }
        }
        return gen("return w");
      }
      __name(encoder, "encoder");
    }
  });

  // node_modules/protobufjs/src/index-light.js
  var require_index_light = __commonJS({
    "node_modules/protobufjs/src/index-light.js": function node_modules_protobufjs_src_indexLightJs(exports4, module2) {
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
        } else if (!root) root = new protobuf.Root();
        return root.load(filename, callback);
      }
      __name(load, "load");
      protobuf.load = load;
      function loadSync(filename, root) {
        if (!root) root = new protobuf.Root();
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
    "node_modules/protobufjs/src/tokenize.js": function node_modules_protobufjs_src_tokenizeJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = tokenize;
      var delimRe = /[\s{}=;:[\],'"()<>]/g,
        stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
        stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
      var setCommentRe = /^ *[*/]+ */,
        setCommentAltRe = /^\s*\*?\/*/,
        setCommentSplitRe = /\n/g,
        whitespaceRe = /\s/,
        unescapeRe = /\\(.?)/g;
      var unescapeMap = {
        "0": "\0",
        "r": "\r",
        "n": "\n",
        "t": "	"
      };
      function unescape(str) {
        return str.replace(unescapeRe, function ($0, $1) {
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
        var offset = 0,
          length = source.length,
          line = 1,
          lastCommentLine = 0,
          comments = {};
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
          if (!match) throw illegal("string");
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
          var commentOffset = start - lookback,
            c;
          do {
            if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === "\n") {
              comment.lineEmpty = true;
              break;
            }
          } while (c === " " || c === "	");
          var lines = source.substring(start, end).split(setCommentSplitRe);
          for (var i = 0; i < lines.length; ++i) lines[i] = lines[i].replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").trim();
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
          if (stack.length > 0) return stack.shift();
          if (stringDelim) return readString();
          var repeat,
            prev,
            curr,
            start,
            isDoc,
            isLeadingComment = offset === 0;
          do {
            if (offset === length) return null;
            repeat = false;
            while (whitespaceRe.test(curr = charAt(offset))) {
              if (curr === "\n") {
                isLeadingComment = true;
                ++line;
              }
              if (++offset === length) return null;
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
          if (!delim) while (end < length && !delimRe.test(charAt(end))) ++end;
          var token = source.substring(offset, offset = end);
          if (token === '"' || token === "'") stringDelim = token;
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
            if (token === null) return null;
            push(token);
          }
          return stack[0];
        }
        __name(peek, "peek");
        function skip(expected, optional) {
          var actual = peek(),
            equals = actual === expected;
          if (equals) {
            next();
            return true;
          }
          if (!optional) throw illegal("token '" + actual + "', '" + expected + "' expected");
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
          next: next,
          peek: peek,
          push: push,
          skip: skip,
          cmnt: cmnt
        }, "line", {
          get: /* @__PURE__ */__name(function () {
            return line;
          }, "get")
        });
      }
      __name(tokenize, "tokenize");
    }
  });

  // node_modules/protobufjs/src/parse.js
  var require_parse = __commonJS({
    "node_modules/protobufjs/src/parse.js": function node_modules_protobufjs_src_parseJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = parse;
      parse.filename = null;
      parse.defaults = {
        keepCase: false
      };
      var tokenize = require_tokenize(),
        Root = require_root(),
        Type = require_type(),
        Field = require_field(),
        MapField = require_mapfield(),
        OneOf = require_oneof(),
        Enum = require_enum(),
        Service = require_service2(),
        Method = require_method(),
        types = require_types(),
        util = require_util();
      var base10Re = /^[1-9][0-9]*$/,
        base10NegRe = /^-?[1-9][0-9]*$/,
        base16Re = /^0[x][0-9a-fA-F]+$/,
        base16NegRe = /^-?0[x][0-9a-fA-F]+$/,
        base8Re = /^0[0-7]+$/,
        base8NegRe = /^-?0[0-7]+$/,
        numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
        nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
        typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
        fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;
      function parse(source, root, options) {
        if (!(root instanceof Root)) {
          options = root;
          root = new Root();
        }
        if (!options) options = parse.defaults;
        var preferTrailingComment = options.preferTrailingComment || false;
        var tn = tokenize(source, options.alternateCommentMode || false),
          next = tn.next,
          push = tn.push,
          peek = tn.peek,
          skip = tn.skip,
          cmnt = tn.cmnt;
        var head = true,
          pkg,
          imports,
          weakImports,
          syntax,
          isProto3 = false;
        var ptr = root;
        var applyCase = options.keepCase ? function (name) {
          return name;
        } : util.camelCase;
        function illegal(token2, name, insideTryCatch) {
          var filename = parse.filename;
          if (!insideTryCatch) parse.filename = null;
          return Error("illegal " + (name || "token") + " '" + token2 + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
        }
        __name(illegal, "illegal");
        function readString() {
          var values = [],
            token2;
          do {
            if ((token2 = next()) !== '"' && token2 !== "'") throw illegal(token2);
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
            return parseNumber(token2, /* insideTryCatch */
            true);
          } catch (e) {
            if (acceptTypeRef && typeRefRe.test(token2)) return token2;
            throw illegal(token2, "value");
          }
        }
        __name(readValue, "readValue");
        function readRanges(target, acceptStrings) {
          var token2, start;
          do {
            if (acceptStrings && ((token2 = peek()) === '"' || token2 === "'")) target.push(readString());else target.push([start = parseId(next()), skip("to", true) ? parseId(next()) : start]);
          } while (skip(",", true));
          var dummy = {
            options: void 0
          };
          dummy.setOption = function (name, value) {
            if (this.options === void 0) this.options = {};
            this.options[name] = value;
          };
          ifBlock(dummy, /* @__PURE__ */__name(function parseRange_block(token3) {
            if (token3 === "option") {
              parseOption(dummy, token3);
              skip(";");
            } else throw illegal(token3);
          }, "parseRange_block"), /* @__PURE__ */__name(function parseRange_line() {
            parseInlineOptions(dummy);
          }, "parseRange_line"));
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
          if (base10Re.test(token2)) return sign * parseInt(token2, 10);
          if (base16Re.test(token2)) return sign * parseInt(token2, 16);
          if (base8Re.test(token2)) return sign * parseInt(token2, 8);
          if (numberRe.test(token2)) return sign * parseFloat(token2);
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
          if (!acceptNegative && token2.charAt(0) === "-") throw illegal(token2, "id");
          if (base10NegRe.test(token2)) return parseInt(token2, 10);
          if (base16NegRe.test(token2)) return parseInt(token2, 16);
          if (base8NegRe.test(token2)) return parseInt(token2, 8);
          throw illegal(token2, "id");
        }
        __name(parseId, "parseId");
        function parsePackage() {
          if (pkg !== void 0) throw illegal("package");
          pkg = next();
          if (!typeRefRe.test(pkg)) throw illegal(pkg, "name");
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
          syntax = readString();
          isProto3 = syntax === "proto3";
          if (!isProto3 && syntax !== "proto2") throw illegal(syntax, "syntax");
          root.setOption("syntax", syntax);
          skip(";");
        }
        __name(parseSyntax, "parseSyntax");
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
            while ((token2 = next()) !== "}") fnIf(token2);
            skip(";", true);
          } else {
            if (fnElse) fnElse();
            skip(";");
            if (obj && (typeof obj.comment !== "string" || preferTrailingComment)) obj.comment = cmnt(trailingLine) || obj.comment;
          }
        }
        __name(ifBlock, "ifBlock");
        function parseType(parent, token2) {
          if (!nameRe.test(token2 = next())) throw illegal(token2, "type name");
          var type = new Type(token2);
          ifBlock(type, /* @__PURE__ */__name(function parseType_block(token3) {
            if (parseCommon(type, token3)) return;
            switch (token3) {
              case "map":
                parseMapField(type, token3);
                break;
              case "required":
              case "repeated":
                parseField(type, token3);
                break;
              case "optional":
                if (isProto3) {
                  parseField(type, "proto3_optional");
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
                if (!isProto3 || !typeRefRe.test(token3)) throw illegal(token3);
                push(token3);
                parseField(type, "optional");
                break;
            }
          }, "parseType_block"));
          parent.add(type);
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
          if (!typeRefRe.test(type)) throw illegal(type, "type");
          var name = next();
          if (!nameRe.test(name)) throw illegal(name, "name");
          name = applyCase(name);
          skip("=");
          var field = new Field(name, parseId(next()), type, rule, extend);
          ifBlock(field, /* @__PURE__ */__name(function parseField_block(token2) {
            if (token2 === "option") {
              parseOption(field, token2);
              skip(";");
            } else throw illegal(token2);
          }, "parseField_block"), /* @__PURE__ */__name(function parseField_line() {
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
          if (!isProto3 && field.repeated && (types.packed[type] !== void 0 || types.basic[type] === void 0)) field.setOption("packed", false, /* ifNotSet */
          true);
        }
        __name(parseField, "parseField");
        function parseGroup(parent, rule) {
          var name = next();
          if (!nameRe.test(name)) throw illegal(name, "name");
          var fieldName = util.lcFirst(name);
          if (name === fieldName) name = util.ucFirst(name);
          skip("=");
          var id = parseId(next());
          var type = new Type(name);
          type.group = true;
          var field = new Field(fieldName, id, name, rule);
          field.filename = parse.filename;
          ifBlock(type, /* @__PURE__ */__name(function parseGroup_block(token2) {
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
                if (isProto3) {
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
          if (types.mapKey[keyType] === void 0) throw illegal(keyType, "type");
          skip(",");
          var valueType = next();
          if (!typeRefRe.test(valueType)) throw illegal(valueType, "type");
          skip(">");
          var name = next();
          if (!nameRe.test(name)) throw illegal(name, "name");
          skip("=");
          var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
          ifBlock(field, /* @__PURE__ */__name(function parseMapField_block(token2) {
            if (token2 === "option") {
              parseOption(field, token2);
              skip(";");
            } else throw illegal(token2);
          }, "parseMapField_block"), /* @__PURE__ */__name(function parseMapField_line() {
            parseInlineOptions(field);
          }, "parseMapField_line"));
          parent.add(field);
        }
        __name(parseMapField, "parseMapField");
        function parseOneOf(parent, token2) {
          if (!nameRe.test(token2 = next())) throw illegal(token2, "name");
          var oneof = new OneOf(applyCase(token2));
          ifBlock(oneof, /* @__PURE__ */__name(function parseOneOf_block(token3) {
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
          if (!nameRe.test(token2 = next())) throw illegal(token2, "name");
          var enm = new Enum(token2);
          ifBlock(enm, /* @__PURE__ */__name(function parseEnum_block(token3) {
            switch (token3) {
              case "option":
                parseOption(enm, token3);
                skip(";");
                break;
              case "reserved":
                readRanges(enm.reserved || (enm.reserved = []), true);
                break;
              default:
                parseEnumValue(enm, token3);
            }
          }, "parseEnum_block"));
          parent.add(enm);
        }
        __name(parseEnum, "parseEnum");
        function parseEnumValue(parent, token2) {
          if (!nameRe.test(token2)) throw illegal(token2, "name");
          skip("=");
          var value = parseId(next(), true),
            dummy = {
              options: void 0
            };
          dummy.setOption = function (name, value2) {
            if (this.options === void 0) this.options = {};
            this.options[name] = value2;
          };
          ifBlock(dummy, /* @__PURE__ */__name(function parseEnumValue_block(token3) {
            if (token3 === "option") {
              parseOption(dummy, token3);
              skip(";");
            } else throw illegal(token3);
          }, "parseEnumValue_block"), /* @__PURE__ */__name(function parseEnumValue_line() {
            parseInlineOptions(dummy);
          }, "parseEnumValue_line"));
          parent.add(token2, value, dummy.comment, dummy.options);
        }
        __name(parseEnumValue, "parseEnumValue");
        function parseOption(parent, token2) {
          var isCustom = skip("(", true);
          if (!typeRefRe.test(token2 = next())) throw illegal(token2, "name");
          var name = token2;
          var option = name;
          var propName;
          if (isCustom) {
            skip(")");
            name = "(" + name + ")";
            option = name;
            token2 = peek();
            if (fqTypeRefRe.test(token2)) {
              propName = token2.slice(1);
              name += token2;
              next();
            }
          }
          skip("=");
          var optionValue = parseOptionValue(parent, name);
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
              if (peek() === "{") value = parseOptionValue(parent, name + "." + token);else if (peek() === "[") {
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
              if (prevValue) value = [].concat(prevValue).concat(value);
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
          if (parent.setOption) parent.setOption(name, value);
        }
        __name(setOption, "setOption");
        function setParsedOption(parent, name, value, propName) {
          if (parent.setParsedOption) parent.setParsedOption(name, value, propName);
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
          if (!nameRe.test(token2 = next())) throw illegal(token2, "service name");
          var service = new Service(token2);
          ifBlock(service, /* @__PURE__ */__name(function parseService_block(token3) {
            if (parseCommon(service, token3)) return;
            if (token3 === "rpc") parseMethod(service, token3);else throw illegal(token3);
          }, "parseService_block"));
          parent.add(service);
        }
        __name(parseService, "parseService");
        function parseMethod(parent, token2) {
          var commentText = cmnt();
          var type = token2;
          if (!nameRe.test(token2 = next())) throw illegal(token2, "name");
          var name = token2,
            requestType,
            requestStream,
            responseType,
            responseStream;
          skip("(");
          if (skip("stream", true)) requestStream = true;
          if (!typeRefRe.test(token2 = next())) throw illegal(token2);
          requestType = token2;
          skip(")");
          skip("returns");
          skip("(");
          if (skip("stream", true)) responseStream = true;
          if (!typeRefRe.test(token2 = next())) throw illegal(token2);
          responseType = token2;
          skip(")");
          var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
          method.comment = commentText;
          ifBlock(method, /* @__PURE__ */__name(function parseMethod_block(token3) {
            if (token3 === "option") {
              parseOption(method, token3);
              skip(";");
            } else throw illegal(token3);
          }, "parseMethod_block"));
          parent.add(method);
        }
        __name(parseMethod, "parseMethod");
        function parseExtension(parent, token2) {
          if (!typeRefRe.test(token2 = next())) throw illegal(token2, "reference");
          var reference = token2;
          ifBlock(null, /* @__PURE__ */__name(function parseExtension_block(token3) {
            switch (token3) {
              case "required":
              case "repeated":
                parseField(parent, token3, reference);
                break;
              case "optional":
                if (isProto3) {
                  parseField(parent, "proto3_optional", reference);
                } else {
                  parseField(parent, "optional", reference);
                }
                break;
              default:
                if (!isProto3 || !typeRefRe.test(token3)) throw illegal(token3);
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
              if (!head) throw illegal(token);
              parsePackage();
              break;
            case "import":
              if (!head) throw illegal(token);
              parseImport();
              break;
            case "syntax":
              if (!head) throw illegal(token);
              parseSyntax();
              break;
            case "option":
              parseOption(ptr, token);
              skip(";");
              break;
            default:
              if (parseCommon(ptr, token)) {
                head = false;
                continue;
              }
              throw illegal(token);
          }
        }
        parse.filename = null;
        return {
          "package": pkg,
          "imports": imports,
          weakImports: weakImports,
          syntax: syntax,
          root: root
        };
      }
      __name(parse, "parse");
    }
  });

  // node_modules/protobufjs/src/common.js
  var require_common = __commonJS({
    "node_modules/protobufjs/src/common.js": function node_modules_protobufjs_src_commonJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = common;
      var commonRe = /\/|\./;
      function common(name, json) {
        if (!commonRe.test(name)) {
          name = "google/protobuf/" + name + ".proto";
          json = {
            nested: {
              google: {
                nested: {
                  protobuf: {
                    nested: json
                  }
                }
              }
            }
          };
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
              oneof: ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]
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
      common.get = /* @__PURE__ */__name(function get(file) {
        return common[file] || null;
      }, "get");
    }
  });

  // node_modules/protobufjs/src/index.js
  var require_src = __commonJS({
    "node_modules/protobufjs/src/index.js": function node_modules_protobufjs_src_indexJs(exports4, module2) {
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
    "node_modules/protobufjs/index.js": function node_modules_protobufjs_indexJs(exports4, module2) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      module2.exports = require_src();
    }
  });

  // src/lib/fetch.ts
  function _fetchApi2(_x, _x2) {
    return _fetchApi.apply(this, arguments);
  }
  function _fetchApi() {
    _fetchApi = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(url, init) {
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return makeInit(init);
          case 1:
            init = _context5.v;
            console.log(url, init);
            _context5.n = 2;
            return fetch(url, init);
          case 2:
            return _context5.a(2, _context5.v);
        }
      }, _callee5);
    }));
    return _fetchApi.apply(this, arguments);
  }
  var import_protobufjs, makeInit, _fetchFile, _fetchText, BYTE_MARK, _fetchProto;
  var init_fetch = __esm({
    "src/lib/fetch.ts": function src_lib_fetchTs() {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      import_protobufjs = __toESM(require_protobufjs(), 1);
      makeInit = /* @__PURE__ */__name(/*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(init) {
          var defaultHeaders, _i, _Object$entries, _ref2, name, value;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                defaultHeaders = {
                  "Connection": "keep-alive",
                  "Accept": "*/*",
                  "Accept-Language": "*",
                  "Sec-Fetch-Mode": "cors",
                  "Accept-Encoding": "gzip, deflate"
                };
                if (init == null ? void 0 : init.headers) {
                  if (init.headers instanceof Headers) {
                    for (_i = 0, _Object$entries = Object.entries(defaultHeaders); _i < _Object$entries.length; _i++) {
                      _ref2 = _Object$entries[_i];
                      name = _ref2[0];
                      value = _ref2[1];
                      if (!init.headers.get(name)) init.headers.set(name, value);
                    }
                  } else {
                    init.headers = __spreadValues(__spreadValues({}, defaultHeaders), init.headers);
                  }
                } else {
                  init = __spreadProps(__spreadValues({}, init), {
                    headers: defaultHeaders
                  });
                }
                return _context.a(2, init);
            }
          }, _callee);
        }));
        return function (_x3) {
          return _ref.apply(this, arguments);
        };
      }(), "makeInit");
      __name(_fetchApi2, "fetchApi");
      _fetchFile = /* @__PURE__ */__name(/*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(url, init) {
          var res, arrayBuffer, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                _context2.n = 1;
                return makeInit(init);
              case 1:
                init = _context2.v;
                console.log(url, init);
                _context2.p = 2;
                _context2.n = 3;
                return fetch(url, init);
              case 3:
                res = _context2.v;
                if (res.ok) {
                  _context2.n = 4;
                  break;
                }
                return _context2.a(2, "");
              case 4:
                _context2.n = 5;
                return res.arrayBuffer();
              case 5:
                arrayBuffer = _context2.v;
                return _context2.a(2, Buffer.from(arrayBuffer).toString("base64"));
              case 6:
                _context2.p = 6;
                _t = _context2.v;
                return _context2.a(2, "");
            }
          }, _callee2, null, [[2, 6]]);
        }));
        return function (_x4, _x5) {
          return _ref3.apply(this, arguments);
        };
      }(), "fetchFile");
      _fetchText = /* @__PURE__ */__name(/*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(url, init, encoding) {
          var res, arrayBuffer, decoder, _t2;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                _context3.n = 1;
                return makeInit(init);
              case 1:
                init = _context3.v;
                console.log(url, init);
                _context3.p = 2;
                _context3.n = 3;
                return fetch(url, init);
              case 3:
                res = _context3.v;
                if (res.ok) {
                  _context3.n = 4;
                  break;
                }
                return _context3.a(2, "");
              case 4:
                _context3.n = 5;
                return res.arrayBuffer();
              case 5:
                arrayBuffer = _context3.v;
                decoder = new TextDecoder(encoding);
                return _context3.a(2, decoder.decode(arrayBuffer));
              case 6:
                _context3.p = 6;
                _t2 = _context3.v;
                return _context3.a(2, "");
            }
          }, _callee3, null, [[2, 6]]);
        }));
        return function (_x6, _x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }(), "fetchText");
      BYTE_MARK = BigInt((1 << 8) - 1);
      _fetchProto = /* @__PURE__ */__name(/*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(protoInit, url, init) {
          var protoRoot, RequestMessge, encodedrequest, requestLength, headers, bodyArray;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                protoRoot = (0, import_protobufjs.parse)(protoInit.proto).root;
                RequestMessge = protoRoot.lookupType(protoInit.requestType);
                if (!RequestMessge.verify(protoInit.requestData)) {
                  _context4.n = 1;
                  break;
                }
                throw new Error("Invalid Proto");
              case 1:
                encodedrequest = RequestMessge.encode(protoInit.requestData).finish();
                requestLength = BigInt(encodedrequest.length);
                headers = new Uint8Array(Array(5).fill(0).map(function (v, idx) {
                  if (idx === 0) return 0;
                  return Number(requestLength >> BigInt(8 * (5 - idx - 1)) & BYTE_MARK);
                }));
                _context4.n = 2;
                return makeInit(init);
              case 2:
                init = _context4.v;
                bodyArray = new Uint8Array(headers.length + encodedrequest.length);
                bodyArray.set(headers, 0);
                bodyArray.set(encodedrequest, headers.length);
                return _context4.a(2, fetch(url, __spreadProps(__spreadValues({
                  method: "POST"
                }, init), {
                  body: bodyArray
                })).then(function (r) {
                  return r.arrayBuffer();
                }).then(function (arr) {
                  var payload = new Uint8Array(arr);
                  var length = Number(BigInt(payload[1] << 24) | BigInt(payload[2] << 16) | BigInt(payload[3] << 8) | BigInt(payload[4]));
                  var ResponseMessage = protoRoot.lookupType(protoInit.responseType);
                  return ResponseMessage.decode(payload.slice(5, 5 + length));
                }));
            }
          }, _callee4);
        }));
        return function (_x9, _x0, _x1) {
          return _ref5.apply(this, arguments);
        };
      }(), "fetchProto");
    }
  });

  // src/libs/fetch.ts
  var fetch_exports = {};
  __export(fetch_exports, {
    fetchApi: function fetchApi() {
      return _fetchApi2;
    },
    fetchFile: function fetchFile() {
      return _fetchFile;
    },
    fetchProto: function fetchProto() {
      return _fetchProto;
    },
    fetchText: function fetchText() {
      return _fetchText;
    }
  });
  var init_fetch2 = __esm({
    "src/libs/fetch.ts": function src_libs_fetchTs() {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      init_fetch();
    }
  });

  // src/types/constants.ts
  var _NovelStatus, defaultCover;
  var init_constants = __esm({
    "src/types/constants.ts": function src_types_constantsTs() {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      _NovelStatus = {
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
    NovelStatus: function NovelStatus() {
      return _NovelStatus;
    }
  });
  var init_novelStatus = __esm({
    "src/libs/novelStatus.ts": function src_libs_novelStatusTs() {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      init_constants();
    }
  });

  // src/types/filters.ts
  var _FilterTypes;
  var init_filters = __esm({
    "src/types/filters.ts": function src_types_filtersTs() {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      _FilterTypes = /* @__PURE__ */function (FilterTypes2) {
        FilterTypes2["TextInput"] = "Text";
        FilterTypes2["Picker"] = "Picker";
        FilterTypes2["CheckboxGroup"] = "Checkbox";
        FilterTypes2["Switch"] = "Switch";
        FilterTypes2["ExcludableCheckboxGroup"] = "XCheckbox";
        return FilterTypes2;
      }(_FilterTypes || {});
    }
  });

  // src/libs/filterInputs.ts
  var filterInputs_exports = {};
  __export(filterInputs_exports, {
    FilterTypes: function FilterTypes() {
      return _FilterTypes;
    }
  });
  var init_filterInputs = __esm({
    "src/libs/filterInputs.ts": function src_libs_filterInputsTs() {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      init_filters();
    }
  });

  // node_modules/dayjs/dayjs.min.js
  var require_dayjs_min = __commonJS({
    "node_modules/dayjs/dayjs.min.js": function node_modules_dayjs_dayjsMinJs(exports4, module2) {
      init_dirname();
      init_buffer2();
      init_process2();
      !function (t, e) {
        "object" == typeof exports4 && "undefined" != typeof module2 ? module2.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
      }(exports4, function () {
        "use strict";

        var t = 1e3,
          e = 6e4,
          n = 36e5,
          r = "millisecond",
          i = "second",
          s = "minute",
          u = "hour",
          a = "day",
          o = "week",
          c = "month",
          f = "quarter",
          h = "year",
          d = "date",
          l = "Invalid Date",
          $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
          y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
          M = {
            name: "en",
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            ordinal: /* @__PURE__ */__name(function (t2) {
              var e2 = ["th", "st", "nd", "rd"],
                n2 = t2 % 100;
              return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
            }, "ordinal")
          },
          m = /* @__PURE__ */__name(function (t2, e2, n2) {
            var r2 = String(t2);
            return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
          }, "m"),
          v = {
            s: m,
            z: /* @__PURE__ */__name(function (t2) {
              var e2 = -t2.utcOffset(),
                n2 = Math.abs(e2),
                r2 = Math.floor(n2 / 60),
                i2 = n2 % 60;
              return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
            }, "z"),
            m: /* @__PURE__ */__name(function t2(e2, n2) {
              if (e2.date() < n2.date()) return -t2(n2, e2);
              var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()),
                i2 = e2.clone().add(r2, c),
                s2 = n2 - i2 < 0,
                u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
              return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
            }, "t"),
            a: /* @__PURE__ */__name(function (t2) {
              return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
            }, "a"),
            p: /* @__PURE__ */__name(function (t2) {
              return {
                M: c,
                y: h,
                w: o,
                d: a,
                D: d,
                h: u,
                m: s,
                s: i,
                ms: r,
                Q: f
              }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
            }, "p"),
            u: /* @__PURE__ */__name(function (t2) {
              return void 0 === t2;
            }, "u")
          },
          g = "en",
          D = {};
        D[g] = M;
        var p = "$isDayjsObject",
          S = /* @__PURE__ */__name(function (t2) {
            return t2 instanceof _ || !(!t2 || !t2[p]);
          }, "S"),
          w = /* @__PURE__ */__name(function t2(e2, n2, r2) {
            var i2;
            if (!e2) return g;
            if ("string" == typeof e2) {
              var s2 = e2.toLowerCase();
              D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
              var u2 = e2.split("-");
              if (!i2 && u2.length > 1) return t2(u2[0]);
            } else {
              var a2 = e2.name;
              D[a2] = e2, i2 = a2;
            }
            return !r2 && i2 && (g = i2), i2 || !r2 && g;
          }, "t"),
          O = /* @__PURE__ */__name(function (t2, e2) {
            if (S(t2)) return t2.clone();
            var n2 = "object" == typeof e2 ? e2 : {};
            return n2.date = t2, n2.args = arguments, new _(n2);
          }, "O"),
          b = v;
        b.l = w, b.i = S, b.w = function (t2, e2) {
          return O(t2, {
            locale: e2.$L,
            utc: e2.$u,
            x: e2.$x,
            $offset: e2.$offset
          });
        };
        var _ = function () {
            function M2(t2) {
              this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
            }
            __name(M2, "M");
            var m2 = M2.prototype;
            return m2.parse = function (t2) {
              this.$d = function (t3) {
                var e2 = t3.date,
                  n2 = t3.utc;
                if (null === e2) return /* @__PURE__ */new Date(NaN);
                if (b.u(e2)) return /* @__PURE__ */new Date();
                if (e2 instanceof Date) return new Date(e2);
                if ("string" == typeof e2 && !/Z$/i.test(e2)) {
                  var r2 = e2.match($);
                  if (r2) {
                    var i2 = r2[2] - 1 || 0,
                      s2 = (r2[7] || "0").substring(0, 3);
                    return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                  }
                }
                return new Date(e2);
              }(t2), this.init();
            }, m2.init = function () {
              var t2 = this.$d;
              this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
            }, m2.$utils = function () {
              return b;
            }, m2.isValid = function () {
              return !(this.$d.toString() === l);
            }, m2.isSame = function (t2, e2) {
              var n2 = O(t2);
              return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
            }, m2.isAfter = function (t2, e2) {
              return O(t2) < this.startOf(e2);
            }, m2.isBefore = function (t2, e2) {
              return this.endOf(e2) < O(t2);
            }, m2.$g = function (t2, e2, n2) {
              return b.u(t2) ? this[e2] : this.set(n2, t2);
            }, m2.unix = function () {
              return Math.floor(this.valueOf() / 1e3);
            }, m2.valueOf = function () {
              return this.$d.getTime();
            }, m2.startOf = function (t2, e2) {
              var n2 = this,
                r2 = !!b.u(e2) || e2,
                f2 = b.p(t2),
                l2 = /* @__PURE__ */__name(function (t3, e3) {
                  var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
                  return r2 ? i2 : i2.endOf(a);
                }, "l"),
                $2 = /* @__PURE__ */__name(function (t3, e3) {
                  return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
                }, "$"),
                y2 = this.$W,
                M3 = this.$M,
                m3 = this.$D,
                v2 = "set" + (this.$u ? "UTC" : "");
              switch (f2) {
                case h:
                  return r2 ? l2(1, 0) : l2(31, 11);
                case c:
                  return r2 ? l2(1, M3) : l2(0, M3 + 1);
                case o:
                  var g2 = this.$locale().weekStart || 0,
                    D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                  return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
                case a:
                case d:
                  return $2(v2 + "Hours", 0);
                case u:
                  return $2(v2 + "Minutes", 1);
                case s:
                  return $2(v2 + "Seconds", 2);
                case i:
                  return $2(v2 + "Milliseconds", 3);
                default:
                  return this.clone();
              }
            }, m2.endOf = function (t2) {
              return this.startOf(t2, false);
            }, m2.$set = function (t2, e2) {
              var n2,
                o2 = b.p(t2),
                f2 = "set" + (this.$u ? "UTC" : ""),
                l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2],
                $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
              if (o2 === c || o2 === h) {
                var y2 = this.clone().set(d, 1);
                y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
              } else l2 && this.$d[l2]($2);
              return this.init(), this;
            }, m2.set = function (t2, e2) {
              return this.clone().$set(t2, e2);
            }, m2.get = function (t2) {
              return this[b.p(t2)]();
            }, m2.add = function (r2, f2) {
              var d2,
                l2 = this;
              r2 = Number(r2);
              var $2 = b.p(f2),
                y2 = /* @__PURE__ */__name(function (t2) {
                  var e2 = O(l2);
                  return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
                }, "y");
              if ($2 === c) return this.set(c, this.$M + r2);
              if ($2 === h) return this.set(h, this.$y + r2);
              if ($2 === a) return y2(1);
              if ($2 === o) return y2(7);
              var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1,
                m3 = this.$d.getTime() + r2 * M3;
              return b.w(m3, this);
            }, m2.subtract = function (t2, e2) {
              return this.add(-1 * t2, e2);
            }, m2.format = function (t2) {
              var e2 = this,
                n2 = this.$locale();
              if (!this.isValid()) return n2.invalidDate || l;
              var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ",
                i2 = b.z(this),
                s2 = this.$H,
                u2 = this.$m,
                a2 = this.$M,
                o2 = n2.weekdays,
                c2 = n2.months,
                f2 = n2.meridiem,
                h2 = /* @__PURE__ */__name(function (t3, n3, i3, s3) {
                  return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
                }, "h"),
                d2 = /* @__PURE__ */__name(function (t3) {
                  return b.s(s2 % 12 || 12, t3, "0");
                }, "d"),
                $2 = f2 || function (t3, e3, n3) {
                  var r3 = t3 < 12 ? "AM" : "PM";
                  return n3 ? r3.toLowerCase() : r3;
                };
              return r2.replace(y, function (t3, r3) {
                return r3 || function (t4) {
                  switch (t4) {
                    case "YY":
                      return String(e2.$y).slice(-2);
                    case "YYYY":
                      return b.s(e2.$y, 4, "0");
                    case "M":
                      return a2 + 1;
                    case "MM":
                      return b.s(a2 + 1, 2, "0");
                    case "MMM":
                      return h2(n2.monthsShort, a2, c2, 3);
                    case "MMMM":
                      return h2(c2, a2);
                    case "D":
                      return e2.$D;
                    case "DD":
                      return b.s(e2.$D, 2, "0");
                    case "d":
                      return String(e2.$W);
                    case "dd":
                      return h2(n2.weekdaysMin, e2.$W, o2, 2);
                    case "ddd":
                      return h2(n2.weekdaysShort, e2.$W, o2, 3);
                    case "dddd":
                      return o2[e2.$W];
                    case "H":
                      return String(s2);
                    case "HH":
                      return b.s(s2, 2, "0");
                    case "h":
                      return d2(1);
                    case "hh":
                      return d2(2);
                    case "a":
                      return $2(s2, u2, true);
                    case "A":
                      return $2(s2, u2, false);
                    case "m":
                      return String(u2);
                    case "mm":
                      return b.s(u2, 2, "0");
                    case "s":
                      return String(e2.$s);
                    case "ss":
                      return b.s(e2.$s, 2, "0");
                    case "SSS":
                      return b.s(e2.$ms, 3, "0");
                    case "Z":
                      return i2;
                  }
                  return null;
                }(t3) || i2.replace(":", "");
              });
            }, m2.utcOffset = function () {
              return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
            }, m2.diff = function (r2, d2, l2) {
              var $2,
                y2 = this,
                M3 = b.p(d2),
                m3 = O(r2),
                v2 = (m3.utcOffset() - this.utcOffset()) * e,
                g2 = this - m3,
                D2 = /* @__PURE__ */__name(function () {
                  return b.m(y2, m3);
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
                  $2 = (g2 - v2) / 6048e5;
                  break;
                case a:
                  $2 = (g2 - v2) / 864e5;
                  break;
                case u:
                  $2 = g2 / n;
                  break;
                case s:
                  $2 = g2 / e;
                  break;
                case i:
                  $2 = g2 / t;
                  break;
                default:
                  $2 = g2;
              }
              return l2 ? $2 : b.a($2);
            }, m2.daysInMonth = function () {
              return this.endOf(c).$D;
            }, m2.$locale = function () {
              return D[this.$L];
            }, m2.locale = function (t2, e2) {
              if (!t2) return this.$L;
              var n2 = this.clone(),
                r2 = w(t2, e2, true);
              return r2 && (n2.$L = r2), n2;
            }, m2.clone = function () {
              return b.w(this.$d, this);
            }, m2.toDate = function () {
              return new Date(this.valueOf());
            }, m2.toJSON = function () {
              return this.isValid() ? this.toISOString() : null;
            }, m2.toISOString = function () {
              return this.$d.toISOString();
            }, m2.toString = function () {
              return this.$d.toUTCString();
            }, M2;
          }(),
          k = _.prototype;
        return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function (t2) {
          k[t2[1]] = function (e2) {
            return this.$g(e2, t2[0], t2[1]);
          };
        }), O.extend = function (t2, e2) {
          return t2.$i || (t2(e2, _, O), t2.$i = true), O;
        }, O.locale = w, O.isDayjs = S, O.unix = function (t2) {
          return O(1e3 * t2);
        }, O.en = D[g], O.Ls = D, O.p = {}, O;
      });
    }
  });

  // .js/plugins/english/NovelCool[novelcool].js
  init_dirname();
  init_buffer2();
  init_process2();
  var __awaiter = function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    __name(adopt, "adopt");
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      __name(fulfilled, "fulfilled");
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      __name(rejected, "rejected");
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      __name(step, "step");
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: /* @__PURE__ */__name(function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        }, "sent"),
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }), g;
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    __name(verb, "verb");
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
    __name(step, "step");
  };
  var __importDefault = function __importDefault(mod2) {
    return mod2 && mod2.__esModule ? mod2 : {
      "default": mod2
    };
  };
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var fetch_1 = (init_fetch2(), __toCommonJS(fetch_exports));
  var novelStatus_1 = (init_novelStatus(), __toCommonJS(novelStatus_exports));
  var filterInputs_1 = (init_filterInputs(), __toCommonJS(filterInputs_exports));
  var dayjs_1 = __importDefault(require_dayjs_min());
  var NovelCoolPlugin = /** @class */
  function () {
    function NovelCoolPlugin2(metadata) {
      var _this = this;
      var _a;
      this.resolveUrl = function (path, isNovel) {
        return _this.site + (isNovel ? "/novel/" : "/chapter/") + path.split("?id=")[0];
      };
      this.id = metadata.id;
      this.name = metadata.sourceName;
      this.site = metadata.sourceSite;
      this.icon = "multisrc/novelcool/novelcool/icon.png";
      this.mainUrl = "https://api.novelcool.com";
      this.version = "1.0.0";
      this.options = (_a = metadata.options) !== null && _a !== void 0 ? _a : {};
      this.filters = {
        sortby: {
          label: "Order by",
          value: "hot",
          options: [{
            label: "Hottest",
            value: "hot"
          }, {
            label: "Latest",
            value: "latest"
          }, {
            label: "New Books",
            value: "new_book"
          }],
          type: filterInputs_1.FilterTypes.Picker
        }
      };
    }
    __name(NovelCoolPlugin2, "NovelCoolPlugin");
    NovelCoolPlugin2.prototype.popularNovels = function (page_1, _a) {
      return __awaiter(this, arguments, void 0, function (page, _b) {
        var sortby, list, novels;
        var _c;
        var filters = _b.filters,
          showLatestNovels = _b.showLatestNovels;
        return __generator(this, function (_d) {
          switch (_d.label) {
            case 0:
              sortby = showLatestNovels ? "latest" : ((_c = filters === null || filters === void 0 ? void 0 : filters.sortby) === null || _c === void 0 ? void 0 : _c.value) || "hot";
              return [4, (0, fetch_1.fetchApi)(this.mainUrl + "/elite/" + sortby, {
                headers: {
                  "User-Agent": this.options.app.userAgent,
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "post",
                body: new URLSearchParams({
                  appId: this.options.app.appId,
                  secret: this.options.app.secret,
                  package_name: this.options.app.package_name,
                  lc_type: "novel",
                  lang: this.options.langCode,
                  page: page.toString(),
                  page_size: "20"
                }).toString()
              }).then(function (res) {
                return res.json();
              })];
            case 1:
              list = _d.sent().list;
              novels = [];
              list.forEach(function (novel) {
                return novels.push({
                  name: novel.name,
                  cover: novel.cover,
                  path: novel.visit_path + "?id=" + novel.id
                });
              });
              return [2, novels];
          }
        });
      });
    };
    NovelCoolPlugin2.prototype.parseNovel = function (novelPath) {
      return __awaiter(this, void 0, void 0, function () {
        var book_id, info, novel, chapters, list;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              book_id = novelPath.split("?id=")[1];
              return [4, (0, fetch_1.fetchApi)(this.mainUrl + "/book/info/", {
                headers: {
                  "User-Agent": this.options.app.userAgent,
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "post",
                body: new URLSearchParams({
                  book_id: book_id,
                  appId: this.options.app.appId,
                  secret: this.options.app.secret,
                  package_name: this.options.app.package_name,
                  lang: this.options.langCode
                }).toString()
              }).then(function (res) {
                return res.json();
              })];
            case 1:
              info = _a.sent().info;
              novel = {
                path: novelPath,
                name: info.name,
                cover: info.cover,
                genres: info.category_list.join(","),
                summary: info.intro,
                author: info.author,
                artist: info.artist,
                status: info.completed === "YES" ? novelStatus_1.NovelStatus.Completed : novelStatus_1.NovelStatus.Ongoing,
                rating: info.rate_star && parseFloat(info.rate_star) || void 0
              };
              chapters = [];
              return [4, (0, fetch_1.fetchApi)(this.mainUrl + "/chapter/book_list/", {
                headers: {
                  "User-Agent": this.options.app.userAgent,
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "post",
                body: new URLSearchParams({
                  book_id: book_id,
                  appId: this.options.app.appId,
                  secret: this.options.app.secret,
                  package_name: this.options.app.package_name,
                  lang: this.options.langCode
                }).toString()
              }).then(function (res) {
                return res.json();
              })];
            case 2:
              list = _a.sent().list;
              list.forEach(function (chapter) {
                if (!chapter.is_locked) {
                  chapters.push({
                    name: chapter.title,
                    path: chapter.book_id + "/" + chapter.id,
                    releaseTime: (0, dayjs_1["default"])(parseInt(chapter.last_modify, 10) * 1e3).format("LLL"),
                    chapterNumber: parseInt(chapter.order_id, 10)
                  });
                }
              });
              novel.chapters = chapters.reverse();
              return [2, novel];
          }
        });
      });
    };
    NovelCoolPlugin2.prototype.parseChapter = function (chapterPath) {
      return __awaiter(this, void 0, void 0, function () {
        var _a, chapter_id, info;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _a = chapterPath.split("/"), chapter_id = _a[1];
              return [4, (0, fetch_1.fetchApi)(this.mainUrl + "/chapter/info/", {
                headers: {
                  "User-Agent": this.options.app.userAgent,
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "post",
                body: new URLSearchParams({
                  chapter_id: chapter_id,
                  appId: this.options.app.appId,
                  secret: this.options.app.secret,
                  package_name: this.options.app.package_name,
                  lang: this.options.langCode
                }).toString()
              }).then(function (res) {
                return res.json();
              })];
            case 1:
              info = _b.sent().info;
              return [2, info.content];
          }
        });
      });
    };
    NovelCoolPlugin2.prototype.searchNovels = function (searchTerm, pageNo) {
      return __awaiter(this, void 0, void 0, function () {
        var list, novels;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4, (0, fetch_1.fetchApi)(this.mainUrl + "/book/search/", {
                headers: {
                  "User-Agent": this.options.app.userAgent,
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "post",
                body: new URLSearchParams({
                  appId: this.options.app.appId,
                  secret: this.options.app.secret,
                  package_name: this.options.app.package_name,
                  keyword: searchTerm,
                  lc_type: "novel",
                  lang: this.options.langCode,
                  page: pageNo.toString(),
                  page_size: "20"
                }).toString()
              }).then(function (res) {
                return res.json();
              })];
            case 1:
              list = _a.sent().list;
              novels = [];
              list.forEach(function (novel) {
                return novels.push({
                  name: novel.name,
                  cover: novel.cover,
                  path: novel.visit_path + "?id=" + novel.id
                });
              });
              return [2, novels];
          }
        });
      });
    };
    return NovelCoolPlugin2;
  }();
  var plugin = new NovelCoolPlugin({
    "id": "novelcool",
    "sourceName": "NovelCool",
    "sourceSite": "https://www.novelcool.com",
    "options": {
      "lang": "English",
      "langCode": "en",
      "app": {
        "userAgent": "Android/Package:com.zuoyou.novel - Version Name:2.3 - Phone Info:sdk_gphone_x86_64(Android Version:13)",
        "package_name": "com.zuoyou.novel",
        "appId": "202201290625004",
        "secret": "c73a8590641781f203660afca1d37ada"
      }
    }
  });
  exports["default"] = plugin;
}();

// Export for compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = void 0;
}