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

  // node_modules/entities/lib/generated/decode-data-html.js
  var require_decode_data_html = __commonJS({
    "node_modules/entities/lib/generated/decode-data-html.js": function node_modules_entities_lib_generated_decodeDataHtmlJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4["default"] = new Uint16Array(
      // prettier-ignore
      "\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\uD835\uDD04rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\uD835\uDD38plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\uD835\uDC9Cign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\uD835\uDD05pf;\uC000\uD835\uDD39eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\uD835\uDC9Ep\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\uD835\uDD07\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\uD835\uDD3B\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\uD835\uDC9Frok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\uD835\uDD08rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\uD835\uDD3Csilon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\uD835\uDD09lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\uD835\uDD3DAll;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\uD835\uDD0A;\u62D9pf;\uC000\uD835\uDD3Eeater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\uD835\uDCA2;\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\uD835\uDD40a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\uD835\uDD0Dpf;\uC000\uD835\uDD41\u01E3\u07C7\0\u07CCr;\uC000\uD835\uDCA5rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\uD835\uDD0Epf;\uC000\uD835\uDD42cr;\uC000\uD835\uDCA6\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\uD835\uDD0F\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\uD835\uDD43er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\uD835\uDD10nusPlus;\u6213pf;\uC000\uD835\uDD44c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\uD835\uDD11\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\uD835\uDCA9ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\uD835\uDD12rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\uD835\uDD46enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\uD835\uDCAAash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\uD835\uDD13i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\uD835\uDCAB;\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B\"\u4022r;\uC000\uD835\uDD14pf;\u611Acr;\uC000\uD835\uDCAC\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\uD835\uDD16ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\uD835\uDD4A\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\uD835\uDCAEar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\uD835\uDD17\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\uD835\uDD4BipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\uD835\uDCAFrok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\uD835\uDD18rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\uD835\uDD4C\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\uD835\uDCB0ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\uD835\uDD19pf;\uC000\uD835\uDD4Dcr;\uC000\uD835\uDCB1dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\uD835\uDD1Apf;\uC000\uD835\uDD4Ecr;\uC000\uD835\uDCB2\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\uD835\uDD1B;\u439Epf;\uC000\uD835\uDD4Fcr;\uC000\uD835\uDCB3\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\uD835\uDD1Cpf;\uC000\uD835\uDD50cr;\uC000\uD835\uDCB4ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\uD835\uDCB5\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\uD835\uDD1Erave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\uD835\uDD52\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\uD835\uDCB6;\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\uD835\uDD1Fg\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\uD835\uDD53\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\uD835\uDCB7mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\uD835\uDD20\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\uD835\uDD54o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\uD835\uDCB8\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\uD835\uDD21ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\uD835\uDD55\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\uD835\uDCB9;\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\uD835\uDD22\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\uD835\uDD56\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\uD835\uDD23lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\uD835\uDD57\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\uD835\uDCBB\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\uD835\uDD24\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\uD835\uDD58\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\uD835\uDD25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\uD835\uDD59bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\uD835\uDCBDas\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\uD835\uDD26rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\uD835\uDD5Aa;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\uD835\uDCBEn\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\uD835\uDD27ath;\u4237pf;\uC000\uD835\uDD5B\u01E3\u23EC\0\u23F1r;\uC000\uD835\uDCBFrcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\uD835\uDD28reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\uD835\uDD5Ccr;\uC000\uD835\uDCC0\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\uD835\uDD29\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\uD835\uDD5Dus;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\uD835\uDCC1m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\uD835\uDD2Ao;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\uD835\uDD5E\u0100ct\u28F8\u28FDr;\uC000\uD835\uDCC2pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\uD835\uDD2B\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\uD835\uDD5F\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\uD835\uDCC3ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\uD835\uDD2C\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\uD835\uDD60\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\uD835\uDD2D\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\uD835\uDD61nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\uD835\uDCC5;\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\uD835\uDD2Epf;\uC000\uD835\uDD62rime;\u6057cr;\uC000\uD835\uDCC6\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\uD835\uDD2F\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\uD835\uDD63us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\uD835\uDCC7\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\uD835\uDD30\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\uD835\uDD64a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\uD835\uDCC8tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\uD835\uDD31\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\uD835\uDD65rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\uD835\uDCC9;\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\uD835\uDD32rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\uD835\uDD66\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\uD835\uDCCA\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\uD835\uDD33tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\uD835\uDD67ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\uD835\uDCCB\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\uD835\uDD34pf;\uC000\uD835\uDD68\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\uD835\uDCCC\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\uD835\uDD35\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\uD835\uDD69im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\uD835\uDCCD\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\uD835\uDD36cy;\u4457pf;\uC000\uD835\uDD6Acr;\uC000\uD835\uDCCE\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\uD835\uDD37cy;\u4436grarr;\u61DDpf;\uC000\uD835\uDD6Bcr;\uC000\uD835\uDCCF\u0100jn\u3B85\u3B87;\u600Dj;\u600C".split("").map(function (c) {
        return c.charCodeAt(0);
      }));
    }
  });

  // node_modules/entities/lib/generated/decode-data-xml.js
  var require_decode_data_xml = __commonJS({
    "node_modules/entities/lib/generated/decode-data-xml.js": function node_modules_entities_lib_generated_decodeDataXmlJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4["default"] = new Uint16Array(
      // prettier-ignore
      "\u0200aglq\t\x15\x18\x1B\u026D\x0F\0\0\x12p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map(function (c) {
        return c.charCodeAt(0);
      }));
    }
  });

  // node_modules/entities/lib/decode_codepoint.js
  var require_decode_codepoint = __commonJS({
    "node_modules/entities/lib/decode_codepoint.js": function node_modules_entities_lib_decode_codepointJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var _a;
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.replaceCodePoint = exports4.fromCodePoint = void 0;
      var decodeMap = /* @__PURE__ */new Map([[0, 65533],
      // C1 Unicode control character reference replacements
      [128, 8364], [130, 8218], [131, 402], [132, 8222], [133, 8230], [134, 8224], [135, 8225], [136, 710], [137, 8240], [138, 352], [139, 8249], [140, 338], [142, 381], [145, 8216], [146, 8217], [147, 8220], [148, 8221], [149, 8226], [150, 8211], [151, 8212], [152, 732], [153, 8482], [154, 353], [155, 8250], [156, 339], [158, 382], [159, 376]]);
      exports4.fromCodePoint =
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
      (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function (codePoint) {
        var output = "";
        if (codePoint > 65535) {
          codePoint -= 65536;
          output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        output += String.fromCharCode(codePoint);
        return output;
      };
      function replaceCodePoint(codePoint) {
        var _a2;
        if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
          return 65533;
        }
        return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
      }
      __name(replaceCodePoint, "replaceCodePoint");
      exports4.replaceCodePoint = replaceCodePoint;
      function decodeCodePoint(codePoint) {
        return (0, exports4.fromCodePoint)(replaceCodePoint(codePoint));
      }
      __name(decodeCodePoint, "decodeCodePoint");
      exports4["default"] = decodeCodePoint;
    }
  });

  // node_modules/entities/lib/decode.js
  var require_decode = __commonJS({
    "node_modules/entities/lib/decode.js": function node_modules_entities_lib_decodeJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var __createBinding = exports4 && exports4.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: /* @__PURE__ */__name(function () {
              return m[k];
            }, "get")
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports4 && exports4.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });
      var __importStar = exports4 && exports4.__importStar || function (mod2) {
        if (mod2 && mod2.__esModule) return mod2;
        var result = {};
        if (mod2 != null) {
          for (var k in mod2) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod2, k)) __createBinding(result, mod2, k);
        }
        __setModuleDefault(result, mod2);
        return result;
      };
      var __importDefault = exports4 && exports4.__importDefault || function (mod2) {
        return mod2 && mod2.__esModule ? mod2 : {
          "default": mod2
        };
      };
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.decodeXML = exports4.decodeHTMLStrict = exports4.decodeHTMLAttribute = exports4.decodeHTML = exports4.determineBranch = exports4.EntityDecoder = exports4.DecodingMode = exports4.BinTrieFlags = exports4.fromCodePoint = exports4.replaceCodePoint = exports4.decodeCodePoint = exports4.xmlDecodeTree = exports4.htmlDecodeTree = void 0;
      var decode_data_html_js_1 = __importDefault(require_decode_data_html());
      exports4.htmlDecodeTree = decode_data_html_js_1["default"];
      var decode_data_xml_js_1 = __importDefault(require_decode_data_xml());
      exports4.xmlDecodeTree = decode_data_xml_js_1["default"];
      var decode_codepoint_js_1 = __importStar(require_decode_codepoint());
      exports4.decodeCodePoint = decode_codepoint_js_1["default"];
      var decode_codepoint_js_2 = require_decode_codepoint();
      Object.defineProperty(exports4, "replaceCodePoint", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_codepoint_js_2.replaceCodePoint;
        }, "get")
      });
      Object.defineProperty(exports4, "fromCodePoint", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_codepoint_js_2.fromCodePoint;
        }, "get")
      });
      var CharCodes;
      (function (CharCodes2) {
        CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
        CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
        CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
        CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
        CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
        CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
        CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
        CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
        CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
        CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
        CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
        CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
      })(CharCodes || (CharCodes = {}));
      var TO_LOWER_BIT = 32;
      var BinTrieFlags;
      (function (BinTrieFlags2) {
        BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
        BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
        BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
      })(BinTrieFlags = exports4.BinTrieFlags || (exports4.BinTrieFlags = {}));
      function isNumber(code) {
        return code >= CharCodes.ZERO && code <= CharCodes.NINE;
      }
      __name(isNumber, "isNumber");
      function isHexadecimalCharacter(code) {
        return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
      }
      __name(isHexadecimalCharacter, "isHexadecimalCharacter");
      function isAsciiAlphaNumeric(code) {
        return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
      }
      __name(isAsciiAlphaNumeric, "isAsciiAlphaNumeric");
      function isEntityInAttributeInvalidEnd(code) {
        return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
      }
      __name(isEntityInAttributeInvalidEnd, "isEntityInAttributeInvalidEnd");
      var EntityDecoderState;
      (function (EntityDecoderState2) {
        EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
        EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
        EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
        EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
        EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
      })(EntityDecoderState || (EntityDecoderState = {}));
      var DecodingMode;
      (function (DecodingMode2) {
        DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
        DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
        DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
      })(DecodingMode = exports4.DecodingMode || (exports4.DecodingMode = {}));
      var EntityDecoder = /** @class */
      function () {
        function EntityDecoder2(decodeTree, emitCodePoint, errors) {
          this.decodeTree = decodeTree;
          this.emitCodePoint = emitCodePoint;
          this.errors = errors;
          this.state = EntityDecoderState.EntityStart;
          this.consumed = 1;
          this.result = 0;
          this.treeIndex = 0;
          this.excess = 1;
          this.decodeMode = DecodingMode.Strict;
        }
        __name(EntityDecoder2, "EntityDecoder");
        EntityDecoder2.prototype.startEntity = function (decodeMode) {
          this.decodeMode = decodeMode;
          this.state = EntityDecoderState.EntityStart;
          this.result = 0;
          this.treeIndex = 0;
          this.excess = 1;
          this.consumed = 1;
        };
        EntityDecoder2.prototype.write = function (str, offset) {
          switch (this.state) {
            case EntityDecoderState.EntityStart:
              {
                if (str.charCodeAt(offset) === CharCodes.NUM) {
                  this.state = EntityDecoderState.NumericStart;
                  this.consumed += 1;
                  return this.stateNumericStart(str, offset + 1);
                }
                this.state = EntityDecoderState.NamedEntity;
                return this.stateNamedEntity(str, offset);
              }
            case EntityDecoderState.NumericStart:
              {
                return this.stateNumericStart(str, offset);
              }
            case EntityDecoderState.NumericDecimal:
              {
                return this.stateNumericDecimal(str, offset);
              }
            case EntityDecoderState.NumericHex:
              {
                return this.stateNumericHex(str, offset);
              }
            case EntityDecoderState.NamedEntity:
              {
                return this.stateNamedEntity(str, offset);
              }
          }
        };
        EntityDecoder2.prototype.stateNumericStart = function (str, offset) {
          if (offset >= str.length) {
            return -1;
          }
          if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
            this.state = EntityDecoderState.NumericHex;
            this.consumed += 1;
            return this.stateNumericHex(str, offset + 1);
          }
          this.state = EntityDecoderState.NumericDecimal;
          return this.stateNumericDecimal(str, offset);
        };
        EntityDecoder2.prototype.addToNumericResult = function (str, start, end, base) {
          if (start !== end) {
            var digitCount = end - start;
            this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
            this.consumed += digitCount;
          }
        };
        EntityDecoder2.prototype.stateNumericHex = function (str, offset) {
          var startIdx = offset;
          while (offset < str.length) {
            var _char = str.charCodeAt(offset);
            if (isNumber(_char) || isHexadecimalCharacter(_char)) {
              offset += 1;
            } else {
              this.addToNumericResult(str, startIdx, offset, 16);
              return this.emitNumericEntity(_char, 3);
            }
          }
          this.addToNumericResult(str, startIdx, offset, 16);
          return -1;
        };
        EntityDecoder2.prototype.stateNumericDecimal = function (str, offset) {
          var startIdx = offset;
          while (offset < str.length) {
            var _char2 = str.charCodeAt(offset);
            if (isNumber(_char2)) {
              offset += 1;
            } else {
              this.addToNumericResult(str, startIdx, offset, 10);
              return this.emitNumericEntity(_char2, 2);
            }
          }
          this.addToNumericResult(str, startIdx, offset, 10);
          return -1;
        };
        EntityDecoder2.prototype.emitNumericEntity = function (lastCp, expectedLength) {
          var _a;
          if (this.consumed <= expectedLength) {
            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
            return 0;
          }
          if (lastCp === CharCodes.SEMI) {
            this.consumed += 1;
          } else if (this.decodeMode === DecodingMode.Strict) {
            return 0;
          }
          this.emitCodePoint((0, decode_codepoint_js_1.replaceCodePoint)(this.result), this.consumed);
          if (this.errors) {
            if (lastCp !== CharCodes.SEMI) {
              this.errors.missingSemicolonAfterCharacterReference();
            }
            this.errors.validateNumericCharacterReference(this.result);
          }
          return this.consumed;
        };
        EntityDecoder2.prototype.stateNamedEntity = function (str, offset) {
          var decodeTree = this.decodeTree;
          var current = decodeTree[this.treeIndex];
          var valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
          for (; offset < str.length; offset++, this.excess++) {
            var _char3 = str.charCodeAt(offset);
            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), _char3);
            if (this.treeIndex < 0) {
              return this.result === 0 ||
              // If we are parsing an attribute
              this.decodeMode === DecodingMode.Attribute && (
              // We shouldn't have consumed any characters after the entity,
              valueLength === 0 ||
              // And there should be no invalid characters.
              isEntityInAttributeInvalidEnd(_char3)) ? 0 : this.emitNotTerminatedNamedEntity();
            }
            current = decodeTree[this.treeIndex];
            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
            if (valueLength !== 0) {
              if (_char3 === CharCodes.SEMI) {
                return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
              }
              if (this.decodeMode !== DecodingMode.Strict) {
                this.result = this.treeIndex;
                this.consumed += this.excess;
                this.excess = 0;
              }
            }
          }
          return -1;
        };
        EntityDecoder2.prototype.emitNotTerminatedNamedEntity = function () {
          var _a;
          var _b = this,
            result = _b.result,
            decodeTree = _b.decodeTree;
          var valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
          this.emitNamedEntityData(result, valueLength, this.consumed);
          (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
          return this.consumed;
        };
        EntityDecoder2.prototype.emitNamedEntityData = function (result, valueLength, consumed) {
          var decodeTree = this.decodeTree;
          this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
          if (valueLength === 3) {
            this.emitCodePoint(decodeTree[result + 2], consumed);
          }
          return consumed;
        };
        EntityDecoder2.prototype.end = function () {
          var _a;
          switch (this.state) {
            case EntityDecoderState.NamedEntity:
              {
                return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
              }
            // Otherwise, emit a numeric entity if we have one.
            case EntityDecoderState.NumericDecimal:
              {
                return this.emitNumericEntity(0, 2);
              }
            case EntityDecoderState.NumericHex:
              {
                return this.emitNumericEntity(0, 3);
              }
            case EntityDecoderState.NumericStart:
              {
                (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
                return 0;
              }
            case EntityDecoderState.EntityStart:
              {
                return 0;
              }
          }
        };
        return EntityDecoder2;
      }();
      exports4.EntityDecoder = EntityDecoder;
      function getDecoder(decodeTree) {
        var ret = "";
        var decoder = new EntityDecoder(decodeTree, function (str) {
          return ret += (0, decode_codepoint_js_1.fromCodePoint)(str);
        });
        return /* @__PURE__ */__name(function decodeWithTrie(str, decodeMode) {
          var lastIndex = 0;
          var offset = 0;
          while ((offset = str.indexOf("&", offset)) >= 0) {
            ret += str.slice(lastIndex, offset);
            decoder.startEntity(decodeMode);
            var len = decoder.write(str,
            // Skip the "&"
            offset + 1);
            if (len < 0) {
              lastIndex = offset + decoder.end();
              break;
            }
            lastIndex = offset + len;
            offset = len === 0 ? lastIndex + 1 : lastIndex;
          }
          var result = ret + str.slice(lastIndex);
          ret = "";
          return result;
        }, "decodeWithTrie");
      }
      __name(getDecoder, "getDecoder");
      function determineBranch(decodeTree, current, nodeIdx, _char4) {
        var branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
        var jumpOffset = current & BinTrieFlags.JUMP_TABLE;
        if (branchCount === 0) {
          return jumpOffset !== 0 && _char4 === jumpOffset ? nodeIdx : -1;
        }
        if (jumpOffset) {
          var value = _char4 - jumpOffset;
          return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
        }
        var lo = nodeIdx;
        var hi = lo + branchCount - 1;
        while (lo <= hi) {
          var mid = lo + hi >>> 1;
          var midVal = decodeTree[mid];
          if (midVal < _char4) {
            lo = mid + 1;
          } else if (midVal > _char4) {
            hi = mid - 1;
          } else {
            return decodeTree[mid + branchCount];
          }
        }
        return -1;
      }
      __name(determineBranch, "determineBranch");
      exports4.determineBranch = determineBranch;
      var htmlDecoder = getDecoder(decode_data_html_js_1["default"]);
      var xmlDecoder = getDecoder(decode_data_xml_js_1["default"]);
      function decodeHTML(str, mode) {
        if (mode === void 0) {
          mode = DecodingMode.Legacy;
        }
        return htmlDecoder(str, mode);
      }
      __name(decodeHTML, "decodeHTML");
      exports4.decodeHTML = decodeHTML;
      function decodeHTMLAttribute(str) {
        return htmlDecoder(str, DecodingMode.Attribute);
      }
      __name(decodeHTMLAttribute, "decodeHTMLAttribute");
      exports4.decodeHTMLAttribute = decodeHTMLAttribute;
      function decodeHTMLStrict(str) {
        return htmlDecoder(str, DecodingMode.Strict);
      }
      __name(decodeHTMLStrict, "decodeHTMLStrict");
      exports4.decodeHTMLStrict = decodeHTMLStrict;
      function decodeXML(str) {
        return xmlDecoder(str, DecodingMode.Strict);
      }
      __name(decodeXML, "decodeXML");
      exports4.decodeXML = decodeXML;
    }
  });

  // node_modules/htmlparser2/lib/Tokenizer.js
  var require_Tokenizer = __commonJS({
    "node_modules/htmlparser2/lib/Tokenizer.js": function node_modules_htmlparser2_lib_TokenizerJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.QuoteType = void 0;
      var decode_js_1 = require_decode();
      var CharCodes;
      (function (CharCodes2) {
        CharCodes2[CharCodes2["Tab"] = 9] = "Tab";
        CharCodes2[CharCodes2["NewLine"] = 10] = "NewLine";
        CharCodes2[CharCodes2["FormFeed"] = 12] = "FormFeed";
        CharCodes2[CharCodes2["CarriageReturn"] = 13] = "CarriageReturn";
        CharCodes2[CharCodes2["Space"] = 32] = "Space";
        CharCodes2[CharCodes2["ExclamationMark"] = 33] = "ExclamationMark";
        CharCodes2[CharCodes2["Number"] = 35] = "Number";
        CharCodes2[CharCodes2["Amp"] = 38] = "Amp";
        CharCodes2[CharCodes2["SingleQuote"] = 39] = "SingleQuote";
        CharCodes2[CharCodes2["DoubleQuote"] = 34] = "DoubleQuote";
        CharCodes2[CharCodes2["Dash"] = 45] = "Dash";
        CharCodes2[CharCodes2["Slash"] = 47] = "Slash";
        CharCodes2[CharCodes2["Zero"] = 48] = "Zero";
        CharCodes2[CharCodes2["Nine"] = 57] = "Nine";
        CharCodes2[CharCodes2["Semi"] = 59] = "Semi";
        CharCodes2[CharCodes2["Lt"] = 60] = "Lt";
        CharCodes2[CharCodes2["Eq"] = 61] = "Eq";
        CharCodes2[CharCodes2["Gt"] = 62] = "Gt";
        CharCodes2[CharCodes2["Questionmark"] = 63] = "Questionmark";
        CharCodes2[CharCodes2["UpperA"] = 65] = "UpperA";
        CharCodes2[CharCodes2["LowerA"] = 97] = "LowerA";
        CharCodes2[CharCodes2["UpperF"] = 70] = "UpperF";
        CharCodes2[CharCodes2["LowerF"] = 102] = "LowerF";
        CharCodes2[CharCodes2["UpperZ"] = 90] = "UpperZ";
        CharCodes2[CharCodes2["LowerZ"] = 122] = "LowerZ";
        CharCodes2[CharCodes2["LowerX"] = 120] = "LowerX";
        CharCodes2[CharCodes2["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
      })(CharCodes || (CharCodes = {}));
      var State;
      (function (State2) {
        State2[State2["Text"] = 1] = "Text";
        State2[State2["BeforeTagName"] = 2] = "BeforeTagName";
        State2[State2["InTagName"] = 3] = "InTagName";
        State2[State2["InSelfClosingTag"] = 4] = "InSelfClosingTag";
        State2[State2["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
        State2[State2["InClosingTagName"] = 6] = "InClosingTagName";
        State2[State2["AfterClosingTagName"] = 7] = "AfterClosingTagName";
        State2[State2["BeforeAttributeName"] = 8] = "BeforeAttributeName";
        State2[State2["InAttributeName"] = 9] = "InAttributeName";
        State2[State2["AfterAttributeName"] = 10] = "AfterAttributeName";
        State2[State2["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
        State2[State2["InAttributeValueDq"] = 12] = "InAttributeValueDq";
        State2[State2["InAttributeValueSq"] = 13] = "InAttributeValueSq";
        State2[State2["InAttributeValueNq"] = 14] = "InAttributeValueNq";
        State2[State2["BeforeDeclaration"] = 15] = "BeforeDeclaration";
        State2[State2["InDeclaration"] = 16] = "InDeclaration";
        State2[State2["InProcessingInstruction"] = 17] = "InProcessingInstruction";
        State2[State2["BeforeComment"] = 18] = "BeforeComment";
        State2[State2["CDATASequence"] = 19] = "CDATASequence";
        State2[State2["InSpecialComment"] = 20] = "InSpecialComment";
        State2[State2["InCommentLike"] = 21] = "InCommentLike";
        State2[State2["BeforeSpecialS"] = 22] = "BeforeSpecialS";
        State2[State2["BeforeSpecialT"] = 23] = "BeforeSpecialT";
        State2[State2["SpecialStartSequence"] = 24] = "SpecialStartSequence";
        State2[State2["InSpecialTag"] = 25] = "InSpecialTag";
        State2[State2["InEntity"] = 26] = "InEntity";
      })(State || (State = {}));
      function isWhitespace(c) {
        return c === CharCodes.Space || c === CharCodes.NewLine || c === CharCodes.Tab || c === CharCodes.FormFeed || c === CharCodes.CarriageReturn;
      }
      __name(isWhitespace, "isWhitespace");
      function isEndOfTagSection(c) {
        return c === CharCodes.Slash || c === CharCodes.Gt || isWhitespace(c);
      }
      __name(isEndOfTagSection, "isEndOfTagSection");
      function isASCIIAlpha(c) {
        return c >= CharCodes.LowerA && c <= CharCodes.LowerZ || c >= CharCodes.UpperA && c <= CharCodes.UpperZ;
      }
      __name(isASCIIAlpha, "isASCIIAlpha");
      var QuoteType;
      (function (QuoteType2) {
        QuoteType2[QuoteType2["NoValue"] = 0] = "NoValue";
        QuoteType2[QuoteType2["Unquoted"] = 1] = "Unquoted";
        QuoteType2[QuoteType2["Single"] = 2] = "Single";
        QuoteType2[QuoteType2["Double"] = 3] = "Double";
      })(QuoteType || (exports4.QuoteType = QuoteType = {}));
      var Sequences = {
        Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
        // CDATA[
        CdataEnd: new Uint8Array([93, 93, 62]),
        // ]]>
        CommentEnd: new Uint8Array([45, 45, 62]),
        // `-->`
        ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
        // `<\/script`
        StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
        // `</style`
        TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
        // `</title`
        TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97])
        // `</textarea`
      };
      var Tokenizer = /** @class */
      function () {
        function Tokenizer2(_a, cbs) {
          var _b = _a.xmlMode,
            xmlMode = _b === void 0 ? false : _b,
            _c = _a.decodeEntities,
            decodeEntities = _c === void 0 ? true : _c;
          var _this = this;
          this.cbs = cbs;
          this.state = State.Text;
          this.buffer = "";
          this.sectionStart = 0;
          this.index = 0;
          this.entityStart = 0;
          this.baseState = State.Text;
          this.isSpecial = false;
          this.running = true;
          this.offset = 0;
          this.currentSequence = void 0;
          this.sequenceIndex = 0;
          this.xmlMode = xmlMode;
          this.decodeEntities = decodeEntities;
          this.entityDecoder = new decode_js_1.EntityDecoder(xmlMode ? decode_js_1.xmlDecodeTree : decode_js_1.htmlDecodeTree, function (cp, consumed) {
            return _this.emitCodePoint(cp, consumed);
          });
        }
        __name(Tokenizer2, "Tokenizer");
        Tokenizer2.prototype.reset = function () {
          this.state = State.Text;
          this.buffer = "";
          this.sectionStart = 0;
          this.index = 0;
          this.baseState = State.Text;
          this.currentSequence = void 0;
          this.running = true;
          this.offset = 0;
        };
        Tokenizer2.prototype.write = function (chunk) {
          this.offset += this.buffer.length;
          this.buffer = chunk;
          this.parse();
        };
        Tokenizer2.prototype.end = function () {
          if (this.running) this.finish();
        };
        Tokenizer2.prototype.pause = function () {
          this.running = false;
        };
        Tokenizer2.prototype.resume = function () {
          this.running = true;
          if (this.index < this.buffer.length + this.offset) {
            this.parse();
          }
        };
        Tokenizer2.prototype.stateText = function (c) {
          if (c === CharCodes.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes.Lt)) {
            if (this.index > this.sectionStart) {
              this.cbs.ontext(this.sectionStart, this.index);
            }
            this.state = State.BeforeTagName;
            this.sectionStart = this.index;
          } else if (this.decodeEntities && c === CharCodes.Amp) {
            this.startEntity();
          }
        };
        Tokenizer2.prototype.stateSpecialStartSequence = function (c) {
          var isEnd = this.sequenceIndex === this.currentSequence.length;
          var isMatch = isEnd ?
          // If we are at the end of the sequence, make sure the tag name has ended
          isEndOfTagSection(c) :
          // Otherwise, do a case-insensitive comparison
          (c | 32) === this.currentSequence[this.sequenceIndex];
          if (!isMatch) {
            this.isSpecial = false;
          } else if (!isEnd) {
            this.sequenceIndex++;
            return;
          }
          this.sequenceIndex = 0;
          this.state = State.InTagName;
          this.stateInTagName(c);
        };
        Tokenizer2.prototype.stateInSpecialTag = function (c) {
          if (this.sequenceIndex === this.currentSequence.length) {
            if (c === CharCodes.Gt || isWhitespace(c)) {
              var endOfText = this.index - this.currentSequence.length;
              if (this.sectionStart < endOfText) {
                var actualIndex = this.index;
                this.index = endOfText;
                this.cbs.ontext(this.sectionStart, endOfText);
                this.index = actualIndex;
              }
              this.isSpecial = false;
              this.sectionStart = endOfText + 2;
              this.stateInClosingTagName(c);
              return;
            }
            this.sequenceIndex = 0;
          }
          if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
            this.sequenceIndex += 1;
          } else if (this.sequenceIndex === 0) {
            if (this.currentSequence === Sequences.TitleEnd) {
              if (this.decodeEntities && c === CharCodes.Amp) {
                this.startEntity();
              }
            } else if (this.fastForwardTo(CharCodes.Lt)) {
              this.sequenceIndex = 1;
            }
          } else {
            this.sequenceIndex = Number(c === CharCodes.Lt);
          }
        };
        Tokenizer2.prototype.stateCDATASequence = function (c) {
          if (c === Sequences.Cdata[this.sequenceIndex]) {
            if (++this.sequenceIndex === Sequences.Cdata.length) {
              this.state = State.InCommentLike;
              this.currentSequence = Sequences.CdataEnd;
              this.sequenceIndex = 0;
              this.sectionStart = this.index + 1;
            }
          } else {
            this.sequenceIndex = 0;
            this.state = State.InDeclaration;
            this.stateInDeclaration(c);
          }
        };
        Tokenizer2.prototype.fastForwardTo = function (c) {
          while (++this.index < this.buffer.length + this.offset) {
            if (this.buffer.charCodeAt(this.index - this.offset) === c) {
              return true;
            }
          }
          this.index = this.buffer.length + this.offset - 1;
          return false;
        };
        Tokenizer2.prototype.stateInCommentLike = function (c) {
          if (c === this.currentSequence[this.sequenceIndex]) {
            if (++this.sequenceIndex === this.currentSequence.length) {
              if (this.currentSequence === Sequences.CdataEnd) {
                this.cbs.oncdata(this.sectionStart, this.index, 2);
              } else {
                this.cbs.oncomment(this.sectionStart, this.index, 2);
              }
              this.sequenceIndex = 0;
              this.sectionStart = this.index + 1;
              this.state = State.Text;
            }
          } else if (this.sequenceIndex === 0) {
            if (this.fastForwardTo(this.currentSequence[0])) {
              this.sequenceIndex = 1;
            }
          } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
            this.sequenceIndex = 0;
          }
        };
        Tokenizer2.prototype.isTagStartChar = function (c) {
          return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
        };
        Tokenizer2.prototype.startSpecial = function (sequence, offset) {
          this.isSpecial = true;
          this.currentSequence = sequence;
          this.sequenceIndex = offset;
          this.state = State.SpecialStartSequence;
        };
        Tokenizer2.prototype.stateBeforeTagName = function (c) {
          if (c === CharCodes.ExclamationMark) {
            this.state = State.BeforeDeclaration;
            this.sectionStart = this.index + 1;
          } else if (c === CharCodes.Questionmark) {
            this.state = State.InProcessingInstruction;
            this.sectionStart = this.index + 1;
          } else if (this.isTagStartChar(c)) {
            var lower = c | 32;
            this.sectionStart = this.index;
            if (this.xmlMode) {
              this.state = State.InTagName;
            } else if (lower === Sequences.ScriptEnd[2]) {
              this.state = State.BeforeSpecialS;
            } else if (lower === Sequences.TitleEnd[2]) {
              this.state = State.BeforeSpecialT;
            } else {
              this.state = State.InTagName;
            }
          } else if (c === CharCodes.Slash) {
            this.state = State.BeforeClosingTagName;
          } else {
            this.state = State.Text;
            this.stateText(c);
          }
        };
        Tokenizer2.prototype.stateInTagName = function (c) {
          if (isEndOfTagSection(c)) {
            this.cbs.onopentagname(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
          }
        };
        Tokenizer2.prototype.stateBeforeClosingTagName = function (c) {
          if (isWhitespace(c)) {} else if (c === CharCodes.Gt) {
            this.state = State.Text;
          } else {
            this.state = this.isTagStartChar(c) ? State.InClosingTagName : State.InSpecialComment;
            this.sectionStart = this.index;
          }
        };
        Tokenizer2.prototype.stateInClosingTagName = function (c) {
          if (c === CharCodes.Gt || isWhitespace(c)) {
            this.cbs.onclosetag(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.AfterClosingTagName;
            this.stateAfterClosingTagName(c);
          }
        };
        Tokenizer2.prototype.stateAfterClosingTagName = function (c) {
          if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.state = State.Text;
            this.sectionStart = this.index + 1;
          }
        };
        Tokenizer2.prototype.stateBeforeAttributeName = function (c) {
          if (c === CharCodes.Gt) {
            this.cbs.onopentagend(this.index);
            if (this.isSpecial) {
              this.state = State.InSpecialTag;
              this.sequenceIndex = 0;
            } else {
              this.state = State.Text;
            }
            this.sectionStart = this.index + 1;
          } else if (c === CharCodes.Slash) {
            this.state = State.InSelfClosingTag;
          } else if (!isWhitespace(c)) {
            this.state = State.InAttributeName;
            this.sectionStart = this.index;
          }
        };
        Tokenizer2.prototype.stateInSelfClosingTag = function (c) {
          if (c === CharCodes.Gt) {
            this.cbs.onselfclosingtag(this.index);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
            this.isSpecial = false;
          } else if (!isWhitespace(c)) {
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
          }
        };
        Tokenizer2.prototype.stateInAttributeName = function (c) {
          if (c === CharCodes.Eq || isEndOfTagSection(c)) {
            this.cbs.onattribname(this.sectionStart, this.index);
            this.sectionStart = this.index;
            this.state = State.AfterAttributeName;
            this.stateAfterAttributeName(c);
          }
        };
        Tokenizer2.prototype.stateAfterAttributeName = function (c) {
          if (c === CharCodes.Eq) {
            this.state = State.BeforeAttributeValue;
          } else if (c === CharCodes.Slash || c === CharCodes.Gt) {
            this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
            this.sectionStart = -1;
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
          } else if (!isWhitespace(c)) {
            this.cbs.onattribend(QuoteType.NoValue, this.sectionStart);
            this.state = State.InAttributeName;
            this.sectionStart = this.index;
          }
        };
        Tokenizer2.prototype.stateBeforeAttributeValue = function (c) {
          if (c === CharCodes.DoubleQuote) {
            this.state = State.InAttributeValueDq;
            this.sectionStart = this.index + 1;
          } else if (c === CharCodes.SingleQuote) {
            this.state = State.InAttributeValueSq;
            this.sectionStart = this.index + 1;
          } else if (!isWhitespace(c)) {
            this.sectionStart = this.index;
            this.state = State.InAttributeValueNq;
            this.stateInAttributeValueNoQuotes(c);
          }
        };
        Tokenizer2.prototype.handleInAttributeValue = function (c, quote) {
          if (c === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
            this.cbs.onattribdata(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.cbs.onattribend(quote === CharCodes.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index + 1);
            this.state = State.BeforeAttributeName;
          } else if (this.decodeEntities && c === CharCodes.Amp) {
            this.startEntity();
          }
        };
        Tokenizer2.prototype.stateInAttributeValueDoubleQuotes = function (c) {
          this.handleInAttributeValue(c, CharCodes.DoubleQuote);
        };
        Tokenizer2.prototype.stateInAttributeValueSingleQuotes = function (c) {
          this.handleInAttributeValue(c, CharCodes.SingleQuote);
        };
        Tokenizer2.prototype.stateInAttributeValueNoQuotes = function (c) {
          if (isWhitespace(c) || c === CharCodes.Gt) {
            this.cbs.onattribdata(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.cbs.onattribend(QuoteType.Unquoted, this.index);
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
          } else if (this.decodeEntities && c === CharCodes.Amp) {
            this.startEntity();
          }
        };
        Tokenizer2.prototype.stateBeforeDeclaration = function (c) {
          if (c === CharCodes.OpeningSquareBracket) {
            this.state = State.CDATASequence;
            this.sequenceIndex = 0;
          } else {
            this.state = c === CharCodes.Dash ? State.BeforeComment : State.InDeclaration;
          }
        };
        Tokenizer2.prototype.stateInDeclaration = function (c) {
          if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.ondeclaration(this.sectionStart, this.index);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
          }
        };
        Tokenizer2.prototype.stateInProcessingInstruction = function (c) {
          if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.onprocessinginstruction(this.sectionStart, this.index);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
          }
        };
        Tokenizer2.prototype.stateBeforeComment = function (c) {
          if (c === CharCodes.Dash) {
            this.state = State.InCommentLike;
            this.currentSequence = Sequences.CommentEnd;
            this.sequenceIndex = 2;
            this.sectionStart = this.index + 1;
          } else {
            this.state = State.InDeclaration;
          }
        };
        Tokenizer2.prototype.stateInSpecialComment = function (c) {
          if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.oncomment(this.sectionStart, this.index, 0);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
          }
        };
        Tokenizer2.prototype.stateBeforeSpecialS = function (c) {
          var lower = c | 32;
          if (lower === Sequences.ScriptEnd[3]) {
            this.startSpecial(Sequences.ScriptEnd, 4);
          } else if (lower === Sequences.StyleEnd[3]) {
            this.startSpecial(Sequences.StyleEnd, 4);
          } else {
            this.state = State.InTagName;
            this.stateInTagName(c);
          }
        };
        Tokenizer2.prototype.stateBeforeSpecialT = function (c) {
          var lower = c | 32;
          if (lower === Sequences.TitleEnd[3]) {
            this.startSpecial(Sequences.TitleEnd, 4);
          } else if (lower === Sequences.TextareaEnd[3]) {
            this.startSpecial(Sequences.TextareaEnd, 4);
          } else {
            this.state = State.InTagName;
            this.stateInTagName(c);
          }
        };
        Tokenizer2.prototype.startEntity = function () {
          this.baseState = this.state;
          this.state = State.InEntity;
          this.entityStart = this.index;
          this.entityDecoder.startEntity(this.xmlMode ? decode_js_1.DecodingMode.Strict : this.baseState === State.Text || this.baseState === State.InSpecialTag ? decode_js_1.DecodingMode.Legacy : decode_js_1.DecodingMode.Attribute);
        };
        Tokenizer2.prototype.stateInEntity = function () {
          var length = this.entityDecoder.write(this.buffer, this.index - this.offset);
          if (length >= 0) {
            this.state = this.baseState;
            if (length === 0) {
              this.index = this.entityStart;
            }
          } else {
            this.index = this.offset + this.buffer.length - 1;
          }
        };
        Tokenizer2.prototype.cleanup = function () {
          if (this.running && this.sectionStart !== this.index) {
            if (this.state === State.Text || this.state === State.InSpecialTag && this.sequenceIndex === 0) {
              this.cbs.ontext(this.sectionStart, this.index);
              this.sectionStart = this.index;
            } else if (this.state === State.InAttributeValueDq || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueNq) {
              this.cbs.onattribdata(this.sectionStart, this.index);
              this.sectionStart = this.index;
            }
          }
        };
        Tokenizer2.prototype.shouldContinue = function () {
          return this.index < this.buffer.length + this.offset && this.running;
        };
        Tokenizer2.prototype.parse = function () {
          while (this.shouldContinue()) {
            var c = this.buffer.charCodeAt(this.index - this.offset);
            switch (this.state) {
              case State.Text:
                {
                  this.stateText(c);
                  break;
                }
              case State.SpecialStartSequence:
                {
                  this.stateSpecialStartSequence(c);
                  break;
                }
              case State.InSpecialTag:
                {
                  this.stateInSpecialTag(c);
                  break;
                }
              case State.CDATASequence:
                {
                  this.stateCDATASequence(c);
                  break;
                }
              case State.InAttributeValueDq:
                {
                  this.stateInAttributeValueDoubleQuotes(c);
                  break;
                }
              case State.InAttributeName:
                {
                  this.stateInAttributeName(c);
                  break;
                }
              case State.InCommentLike:
                {
                  this.stateInCommentLike(c);
                  break;
                }
              case State.InSpecialComment:
                {
                  this.stateInSpecialComment(c);
                  break;
                }
              case State.BeforeAttributeName:
                {
                  this.stateBeforeAttributeName(c);
                  break;
                }
              case State.InTagName:
                {
                  this.stateInTagName(c);
                  break;
                }
              case State.InClosingTagName:
                {
                  this.stateInClosingTagName(c);
                  break;
                }
              case State.BeforeTagName:
                {
                  this.stateBeforeTagName(c);
                  break;
                }
              case State.AfterAttributeName:
                {
                  this.stateAfterAttributeName(c);
                  break;
                }
              case State.InAttributeValueSq:
                {
                  this.stateInAttributeValueSingleQuotes(c);
                  break;
                }
              case State.BeforeAttributeValue:
                {
                  this.stateBeforeAttributeValue(c);
                  break;
                }
              case State.BeforeClosingTagName:
                {
                  this.stateBeforeClosingTagName(c);
                  break;
                }
              case State.AfterClosingTagName:
                {
                  this.stateAfterClosingTagName(c);
                  break;
                }
              case State.BeforeSpecialS:
                {
                  this.stateBeforeSpecialS(c);
                  break;
                }
              case State.BeforeSpecialT:
                {
                  this.stateBeforeSpecialT(c);
                  break;
                }
              case State.InAttributeValueNq:
                {
                  this.stateInAttributeValueNoQuotes(c);
                  break;
                }
              case State.InSelfClosingTag:
                {
                  this.stateInSelfClosingTag(c);
                  break;
                }
              case State.InDeclaration:
                {
                  this.stateInDeclaration(c);
                  break;
                }
              case State.BeforeDeclaration:
                {
                  this.stateBeforeDeclaration(c);
                  break;
                }
              case State.BeforeComment:
                {
                  this.stateBeforeComment(c);
                  break;
                }
              case State.InProcessingInstruction:
                {
                  this.stateInProcessingInstruction(c);
                  break;
                }
              case State.InEntity:
                {
                  this.stateInEntity();
                  break;
                }
            }
            this.index++;
          }
          this.cleanup();
        };
        Tokenizer2.prototype.finish = function () {
          if (this.state === State.InEntity) {
            this.entityDecoder.end();
            this.state = this.baseState;
          }
          this.handleTrailingData();
          this.cbs.onend();
        };
        Tokenizer2.prototype.handleTrailingData = function () {
          var endIndex = this.buffer.length + this.offset;
          if (this.sectionStart >= endIndex) {
            return;
          }
          if (this.state === State.InCommentLike) {
            if (this.currentSequence === Sequences.CdataEnd) {
              this.cbs.oncdata(this.sectionStart, endIndex, 0);
            } else {
              this.cbs.oncomment(this.sectionStart, endIndex, 0);
            }
          } else if (this.state === State.InTagName || this.state === State.BeforeAttributeName || this.state === State.BeforeAttributeValue || this.state === State.AfterAttributeName || this.state === State.InAttributeName || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueDq || this.state === State.InAttributeValueNq || this.state === State.InClosingTagName) {} else {
            this.cbs.ontext(this.sectionStart, endIndex);
          }
        };
        Tokenizer2.prototype.emitCodePoint = function (cp, consumed) {
          if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
            if (this.sectionStart < this.entityStart) {
              this.cbs.onattribdata(this.sectionStart, this.entityStart);
            }
            this.sectionStart = this.entityStart + consumed;
            this.index = this.sectionStart - 1;
            this.cbs.onattribentity(cp);
          } else {
            if (this.sectionStart < this.entityStart) {
              this.cbs.ontext(this.sectionStart, this.entityStart);
            }
            this.sectionStart = this.entityStart + consumed;
            this.index = this.sectionStart - 1;
            this.cbs.ontextentity(cp, this.sectionStart);
          }
        };
        return Tokenizer2;
      }();
      exports4["default"] = Tokenizer;
    }
  });

  // node_modules/htmlparser2/lib/Parser.js
  var require_Parser = __commonJS({
    "node_modules/htmlparser2/lib/Parser.js": function node_modules_htmlparser2_lib_ParserJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var __createBinding = exports4 && exports4.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: /* @__PURE__ */__name(function () {
              return m[k];
            }, "get")
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports4 && exports4.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });
      var __importStar = exports4 && exports4.__importStar || function (mod2) {
        if (mod2 && mod2.__esModule) return mod2;
        var result = {};
        if (mod2 != null) {
          for (var k in mod2) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod2, k)) __createBinding(result, mod2, k);
        }
        __setModuleDefault(result, mod2);
        return result;
      };
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.Parser = void 0;
      var Tokenizer_js_1 = __importStar(require_Tokenizer());
      var decode_js_1 = require_decode();
      var formTags = /* @__PURE__ */new Set(["input", "option", "optgroup", "select", "button", "datalist", "textarea"]);
      var pTag = /* @__PURE__ */new Set(["p"]);
      var tableSectionTags = /* @__PURE__ */new Set(["thead", "tbody"]);
      var ddtTags = /* @__PURE__ */new Set(["dd", "dt"]);
      var rtpTags = /* @__PURE__ */new Set(["rt", "rp"]);
      var openImpliesClose = /* @__PURE__ */new Map([["tr", /* @__PURE__ */new Set(["tr", "th", "td"])], ["th", /* @__PURE__ */new Set(["th"])], ["td", /* @__PURE__ */new Set(["thead", "th", "td"])], ["body", /* @__PURE__ */new Set(["head", "link", "script"])], ["li", /* @__PURE__ */new Set(["li"])], ["p", pTag], ["h1", pTag], ["h2", pTag], ["h3", pTag], ["h4", pTag], ["h5", pTag], ["h6", pTag], ["select", formTags], ["input", formTags], ["output", formTags], ["button", formTags], ["datalist", formTags], ["textarea", formTags], ["option", /* @__PURE__ */new Set(["option"])], ["optgroup", /* @__PURE__ */new Set(["optgroup", "option"])], ["dd", ddtTags], ["dt", ddtTags], ["address", pTag], ["article", pTag], ["aside", pTag], ["blockquote", pTag], ["details", pTag], ["div", pTag], ["dl", pTag], ["fieldset", pTag], ["figcaption", pTag], ["figure", pTag], ["footer", pTag], ["form", pTag], ["header", pTag], ["hr", pTag], ["main", pTag], ["nav", pTag], ["ol", pTag], ["pre", pTag], ["section", pTag], ["table", pTag], ["ul", pTag], ["rt", rtpTags], ["rp", rtpTags], ["tbody", tableSectionTags], ["tfoot", tableSectionTags]]);
      var voidElements = /* @__PURE__ */new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
      var foreignContextElements = /* @__PURE__ */new Set(["math", "svg"]);
      var htmlIntegrationElements = /* @__PURE__ */new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignobject", "desc", "title"]);
      var reNameEnd = /\s|\//;
      var Parser = /** @class */
      function () {
        function Parser2(cbs, options) {
          if (options === void 0) {
            options = {};
          }
          var _a, _b, _c, _d, _e, _f;
          this.options = options;
          this.startIndex = 0;
          this.endIndex = 0;
          this.openTagStart = 0;
          this.tagname = "";
          this.attribname = "";
          this.attribvalue = "";
          this.attribs = null;
          this.stack = [];
          this.buffers = [];
          this.bufferOffset = 0;
          this.writeIndex = 0;
          this.ended = false;
          this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
          this.htmlMode = !this.options.xmlMode;
          this.lowerCaseTagNames = (_a = options.lowerCaseTags) !== null && _a !== void 0 ? _a : this.htmlMode;
          this.lowerCaseAttributeNames = (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : this.htmlMode;
          this.recognizeSelfClosing = (_c = options.recognizeSelfClosing) !== null && _c !== void 0 ? _c : !this.htmlMode;
          this.tokenizer = new ((_d = options.Tokenizer) !== null && _d !== void 0 ? _d : Tokenizer_js_1["default"])(this.options, this);
          this.foreignContext = [!this.htmlMode];
          (_f = (_e = this.cbs).onparserinit) === null || _f === void 0 ? void 0 : _f.call(_e, this);
        }
        __name(Parser2, "Parser");
        Parser2.prototype.ontext = function (start, endIndex) {
          var _a, _b;
          var data = this.getSlice(start, endIndex);
          this.endIndex = endIndex - 1;
          (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, data);
          this.startIndex = endIndex;
        };
        Parser2.prototype.ontextentity = function (cp, endIndex) {
          var _a, _b;
          this.endIndex = endIndex - 1;
          (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, (0, decode_js_1.fromCodePoint)(cp));
          this.startIndex = endIndex;
        };
        Parser2.prototype.isVoidElement = function (name) {
          return this.htmlMode && voidElements.has(name);
        };
        Parser2.prototype.onopentagname = function (start, endIndex) {
          this.endIndex = endIndex;
          var name = this.getSlice(start, endIndex);
          if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
          }
          this.emitOpenTag(name);
        };
        Parser2.prototype.emitOpenTag = function (name) {
          var _a, _b, _c, _d;
          this.openTagStart = this.startIndex;
          this.tagname = name;
          var impliesClose = this.htmlMode && openImpliesClose.get(name);
          if (impliesClose) {
            while (this.stack.length > 0 && impliesClose.has(this.stack[0])) {
              var element = this.stack.shift();
              (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, element, true);
            }
          }
          if (!this.isVoidElement(name)) {
            this.stack.unshift(name);
            if (this.htmlMode) {
              if (foreignContextElements.has(name)) {
                this.foreignContext.unshift(true);
              } else if (htmlIntegrationElements.has(name)) {
                this.foreignContext.unshift(false);
              }
            }
          }
          (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, name);
          if (this.cbs.onopentag) this.attribs = {};
        };
        Parser2.prototype.endOpenTag = function (isImplied) {
          var _a, _b;
          this.startIndex = this.openTagStart;
          if (this.attribs) {
            (_b = (_a = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a, this.tagname, this.attribs, isImplied);
            this.attribs = null;
          }
          if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
            this.cbs.onclosetag(this.tagname, true);
          }
          this.tagname = "";
        };
        Parser2.prototype.onopentagend = function (endIndex) {
          this.endIndex = endIndex;
          this.endOpenTag(false);
          this.startIndex = endIndex + 1;
        };
        Parser2.prototype.onclosetag = function (start, endIndex) {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          this.endIndex = endIndex;
          var name = this.getSlice(start, endIndex);
          if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
          }
          if (this.htmlMode && (foreignContextElements.has(name) || htmlIntegrationElements.has(name))) {
            this.foreignContext.shift();
          }
          if (!this.isVoidElement(name)) {
            var pos = this.stack.indexOf(name);
            if (pos !== -1) {
              for (var index = 0; index <= pos; index++) {
                var element = this.stack.shift();
                (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, element, index !== pos);
              }
            } else if (this.htmlMode && name === "p") {
              this.emitOpenTag("p");
              this.closeCurrentTag(true);
            }
          } else if (this.htmlMode && name === "br") {
            (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, "br");
            (_f = (_e = this.cbs).onopentag) === null || _f === void 0 ? void 0 : _f.call(_e, "br", {}, true);
            (_h = (_g = this.cbs).onclosetag) === null || _h === void 0 ? void 0 : _h.call(_g, "br", false);
          }
          this.startIndex = endIndex + 1;
        };
        Parser2.prototype.onselfclosingtag = function (endIndex) {
          this.endIndex = endIndex;
          if (this.recognizeSelfClosing || this.foreignContext[0]) {
            this.closeCurrentTag(false);
            this.startIndex = endIndex + 1;
          } else {
            this.onopentagend(endIndex);
          }
        };
        Parser2.prototype.closeCurrentTag = function (isOpenImplied) {
          var _a, _b;
          var name = this.tagname;
          this.endOpenTag(isOpenImplied);
          if (this.stack[0] === name) {
            (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, name, !isOpenImplied);
            this.stack.shift();
          }
        };
        Parser2.prototype.onattribname = function (start, endIndex) {
          this.startIndex = start;
          var name = this.getSlice(start, endIndex);
          this.attribname = this.lowerCaseAttributeNames ? name.toLowerCase() : name;
        };
        Parser2.prototype.onattribdata = function (start, endIndex) {
          this.attribvalue += this.getSlice(start, endIndex);
        };
        Parser2.prototype.onattribentity = function (cp) {
          this.attribvalue += (0, decode_js_1.fromCodePoint)(cp);
        };
        Parser2.prototype.onattribend = function (quote, endIndex) {
          var _a, _b;
          this.endIndex = endIndex;
          (_b = (_a = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a, this.attribname, this.attribvalue, quote === Tokenizer_js_1.QuoteType.Double ? '"' : quote === Tokenizer_js_1.QuoteType.Single ? "'" : quote === Tokenizer_js_1.QuoteType.NoValue ? void 0 : null);
          if (this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
            this.attribs[this.attribname] = this.attribvalue;
          }
          this.attribvalue = "";
        };
        Parser2.prototype.getInstructionName = function (value) {
          var index = value.search(reNameEnd);
          var name = index < 0 ? value : value.substr(0, index);
          if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
          }
          return name;
        };
        Parser2.prototype.ondeclaration = function (start, endIndex) {
          this.endIndex = endIndex;
          var value = this.getSlice(start, endIndex);
          if (this.cbs.onprocessinginstruction) {
            var name = this.getInstructionName(value);
            this.cbs.onprocessinginstruction("!".concat(name), "!".concat(value));
          }
          this.startIndex = endIndex + 1;
        };
        Parser2.prototype.onprocessinginstruction = function (start, endIndex) {
          this.endIndex = endIndex;
          var value = this.getSlice(start, endIndex);
          if (this.cbs.onprocessinginstruction) {
            var name = this.getInstructionName(value);
            this.cbs.onprocessinginstruction("?".concat(name), "?".concat(value));
          }
          this.startIndex = endIndex + 1;
        };
        Parser2.prototype.oncomment = function (start, endIndex, offset) {
          var _a, _b, _c, _d;
          this.endIndex = endIndex;
          (_b = (_a = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a, this.getSlice(start, endIndex - offset));
          (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
          this.startIndex = endIndex + 1;
        };
        Parser2.prototype.oncdata = function (start, endIndex, offset) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
          this.endIndex = endIndex;
          var value = this.getSlice(start, endIndex - offset);
          if (!this.htmlMode || this.options.recognizeCDATA) {
            (_b = (_a = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
            (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e);
          } else {
            (_h = (_g = this.cbs).oncomment) === null || _h === void 0 ? void 0 : _h.call(_g, "[CDATA[".concat(value, "]]"));
            (_k = (_j = this.cbs).oncommentend) === null || _k === void 0 ? void 0 : _k.call(_j);
          }
          this.startIndex = endIndex + 1;
        };
        Parser2.prototype.onend = function () {
          var _a, _b;
          if (this.cbs.onclosetag) {
            this.endIndex = this.startIndex;
            for (var index = 0; index < this.stack.length; index++) {
              this.cbs.onclosetag(this.stack[index], true);
            }
          }
          (_b = (_a = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        Parser2.prototype.reset = function () {
          var _a, _b, _c, _d;
          (_b = (_a = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a);
          this.tokenizer.reset();
          this.tagname = "";
          this.attribname = "";
          this.attribs = null;
          this.stack.length = 0;
          this.startIndex = 0;
          this.endIndex = 0;
          (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
          this.buffers.length = 0;
          this.foreignContext.length = 0;
          this.foreignContext.unshift(!this.htmlMode);
          this.bufferOffset = 0;
          this.writeIndex = 0;
          this.ended = false;
        };
        Parser2.prototype.parseComplete = function (data) {
          this.reset();
          this.end(data);
        };
        Parser2.prototype.getSlice = function (start, end) {
          while (start - this.bufferOffset >= this.buffers[0].length) {
            this.shiftBuffer();
          }
          var slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
          while (end - this.bufferOffset > this.buffers[0].length) {
            this.shiftBuffer();
            slice += this.buffers[0].slice(0, end - this.bufferOffset);
          }
          return slice;
        };
        Parser2.prototype.shiftBuffer = function () {
          this.bufferOffset += this.buffers[0].length;
          this.writeIndex--;
          this.buffers.shift();
        };
        Parser2.prototype.write = function (chunk) {
          var _a, _b;
          if (this.ended) {
            (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(".write() after done!"));
            return;
          }
          this.buffers.push(chunk);
          if (this.tokenizer.running) {
            this.tokenizer.write(chunk);
            this.writeIndex++;
          }
        };
        Parser2.prototype.end = function (chunk) {
          var _a, _b;
          if (this.ended) {
            (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(".end() after done!"));
            return;
          }
          if (chunk) this.write(chunk);
          this.ended = true;
          this.tokenizer.end();
        };
        Parser2.prototype.pause = function () {
          this.tokenizer.pause();
        };
        Parser2.prototype.resume = function () {
          this.tokenizer.resume();
          while (this.tokenizer.running && this.writeIndex < this.buffers.length) {
            this.tokenizer.write(this.buffers[this.writeIndex++]);
          }
          if (this.ended) this.tokenizer.end();
        };
        Parser2.prototype.parseChunk = function (chunk) {
          this.write(chunk);
        };
        Parser2.prototype.done = function (chunk) {
          this.end(chunk);
        };
        return Parser2;
      }();
      exports4.Parser = Parser;
    }
  });

  // node_modules/domelementtype/lib/index.js
  var require_lib = __commonJS({
    "node_modules/domelementtype/lib/index.js": function node_modules_domelementtype_lib_indexJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.Doctype = exports4.CDATA = exports4.Tag = exports4.Style = exports4.Script = exports4.Comment = exports4.Directive = exports4.Text = exports4.Root = exports4.isTag = exports4.ElementType = void 0;
      var ElementType;
      (function (ElementType2) {
        ElementType2["Root"] = "root";
        ElementType2["Text"] = "text";
        ElementType2["Directive"] = "directive";
        ElementType2["Comment"] = "comment";
        ElementType2["Script"] = "script";
        ElementType2["Style"] = "style";
        ElementType2["Tag"] = "tag";
        ElementType2["CDATA"] = "cdata";
        ElementType2["Doctype"] = "doctype";
      })(ElementType = exports4.ElementType || (exports4.ElementType = {}));
      function isTag(elem) {
        return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
      }
      __name(isTag, "isTag");
      exports4.isTag = isTag;
      exports4.Root = ElementType.Root;
      exports4.Text = ElementType.Text;
      exports4.Directive = ElementType.Directive;
      exports4.Comment = ElementType.Comment;
      exports4.Script = ElementType.Script;
      exports4.Style = ElementType.Style;
      exports4.Tag = ElementType.Tag;
      exports4.CDATA = ElementType.CDATA;
      exports4.Doctype = ElementType.Doctype;
    }
  });

  // node_modules/domhandler/lib/node.js
  var require_node = __commonJS({
    "node_modules/domhandler/lib/node.js": function node_modules_domhandler_lib_nodeJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var __extends = exports4 && exports4.__extends || /* @__PURE__ */function () {
        var extendStatics = /* @__PURE__ */__name(function (d, b) {
          extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d2, b2) {
            d2.__proto__ = b2;
          } || function (d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        }, "extendStatics");
        return function (d, b) {
          if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          __name(__, "__");
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __assign2 = exports4 && exports4.__assign || function () {
        __assign2 = Object.assign || function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
        return __assign2.apply(this, arguments);
      };
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.cloneNode = exports4.hasChildren = exports4.isDocument = exports4.isDirective = exports4.isComment = exports4.isText = exports4.isCDATA = exports4.isTag = exports4.Element = exports4.Document = exports4.CDATA = exports4.NodeWithChildren = exports4.ProcessingInstruction = exports4.Comment = exports4.Text = exports4.DataNode = exports4.Node = void 0;
      var domelementtype_1 = require_lib();
      var Node = /** @class */
      function () {
        function Node2() {
          this.parent = null;
          this.prev = null;
          this.next = null;
          this.startIndex = null;
          this.endIndex = null;
        }
        __name(Node2, "Node");
        Object.defineProperty(Node2.prototype, "parentNode", {
          // Read-write aliases for properties
          /**
           * Same as {@link parent}.
           * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
           */
          get: /* @__PURE__ */__name(function () {
            return this.parent;
          }, "get"),
          set: /* @__PURE__ */__name(function (parent) {
            this.parent = parent;
          }, "set"),
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Node2.prototype, "previousSibling", {
          /**
           * Same as {@link prev}.
           * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
           */
          get: /* @__PURE__ */__name(function () {
            return this.prev;
          }, "get"),
          set: /* @__PURE__ */__name(function (prev) {
            this.prev = prev;
          }, "set"),
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Node2.prototype, "nextSibling", {
          /**
           * Same as {@link next}.
           * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
           */
          get: /* @__PURE__ */__name(function () {
            return this.next;
          }, "get"),
          set: /* @__PURE__ */__name(function (next) {
            this.next = next;
          }, "set"),
          enumerable: false,
          configurable: true
        });
        Node2.prototype.cloneNode = function (recursive) {
          if (recursive === void 0) {
            recursive = false;
          }
          return cloneNode(this, recursive);
        };
        return Node2;
      }();
      exports4.Node = Node;
      var DataNode = /** @class */
      function (_super) {
        __extends(DataNode2, _super);
        function DataNode2(data) {
          var _this = _super.call(this) || this;
          _this.data = data;
          return _this;
        }
        __name(DataNode2, "DataNode");
        Object.defineProperty(DataNode2.prototype, "nodeValue", {
          /**
           * Same as {@link data}.
           * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
           */
          get: /* @__PURE__ */__name(function () {
            return this.data;
          }, "get"),
          set: /* @__PURE__ */__name(function (data) {
            this.data = data;
          }, "set"),
          enumerable: false,
          configurable: true
        });
        return DataNode2;
      }(Node);
      exports4.DataNode = DataNode;
      var Text = /** @class */
      function (_super) {
        __extends(Text2, _super);
        function Text2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = domelementtype_1.ElementType.Text;
          return _this;
        }
        __name(Text2, "Text");
        Object.defineProperty(Text2.prototype, "nodeType", {
          get: /* @__PURE__ */__name(function () {
            return 3;
          }, "get"),
          enumerable: false,
          configurable: true
        });
        return Text2;
      }(DataNode);
      exports4.Text = Text;
      var Comment = /** @class */
      function (_super) {
        __extends(Comment2, _super);
        function Comment2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = domelementtype_1.ElementType.Comment;
          return _this;
        }
        __name(Comment2, "Comment");
        Object.defineProperty(Comment2.prototype, "nodeType", {
          get: /* @__PURE__ */__name(function () {
            return 8;
          }, "get"),
          enumerable: false,
          configurable: true
        });
        return Comment2;
      }(DataNode);
      exports4.Comment = Comment;
      var ProcessingInstruction = /** @class */
      function (_super) {
        __extends(ProcessingInstruction2, _super);
        function ProcessingInstruction2(name, data) {
          var _this = _super.call(this, data) || this;
          _this.name = name;
          _this.type = domelementtype_1.ElementType.Directive;
          return _this;
        }
        __name(ProcessingInstruction2, "ProcessingInstruction");
        Object.defineProperty(ProcessingInstruction2.prototype, "nodeType", {
          get: /* @__PURE__ */__name(function () {
            return 1;
          }, "get"),
          enumerable: false,
          configurable: true
        });
        return ProcessingInstruction2;
      }(DataNode);
      exports4.ProcessingInstruction = ProcessingInstruction;
      var NodeWithChildren = /** @class */
      function (_super) {
        __extends(NodeWithChildren2, _super);
        function NodeWithChildren2(children) {
          var _this = _super.call(this) || this;
          _this.children = children;
          return _this;
        }
        __name(NodeWithChildren2, "NodeWithChildren");
        Object.defineProperty(NodeWithChildren2.prototype, "firstChild", {
          // Aliases
          /** First child of the node. */
          get: /* @__PURE__ */__name(function () {
            var _a;
            return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
          }, "get"),
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(NodeWithChildren2.prototype, "lastChild", {
          /** Last child of the node. */
          get: /* @__PURE__ */__name(function () {
            return this.children.length > 0 ? this.children[this.children.length - 1] : null;
          }, "get"),
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(NodeWithChildren2.prototype, "childNodes", {
          /**
           * Same as {@link children}.
           * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
           */
          get: /* @__PURE__ */__name(function () {
            return this.children;
          }, "get"),
          set: /* @__PURE__ */__name(function (children) {
            this.children = children;
          }, "set"),
          enumerable: false,
          configurable: true
        });
        return NodeWithChildren2;
      }(Node);
      exports4.NodeWithChildren = NodeWithChildren;
      var CDATA = /** @class */
      function (_super) {
        __extends(CDATA2, _super);
        function CDATA2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = domelementtype_1.ElementType.CDATA;
          return _this;
        }
        __name(CDATA2, "CDATA");
        Object.defineProperty(CDATA2.prototype, "nodeType", {
          get: /* @__PURE__ */__name(function () {
            return 4;
          }, "get"),
          enumerable: false,
          configurable: true
        });
        return CDATA2;
      }(NodeWithChildren);
      exports4.CDATA = CDATA;
      var Document = /** @class */
      function (_super) {
        __extends(Document2, _super);
        function Document2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.type = domelementtype_1.ElementType.Root;
          return _this;
        }
        __name(Document2, "Document");
        Object.defineProperty(Document2.prototype, "nodeType", {
          get: /* @__PURE__ */__name(function () {
            return 9;
          }, "get"),
          enumerable: false,
          configurable: true
        });
        return Document2;
      }(NodeWithChildren);
      exports4.Document = Document;
      var Element = /** @class */
      function (_super) {
        __extends(Element2, _super);
        function Element2(name, attribs, children, type) {
          if (children === void 0) {
            children = [];
          }
          if (type === void 0) {
            type = name === "script" ? domelementtype_1.ElementType.Script : name === "style" ? domelementtype_1.ElementType.Style : domelementtype_1.ElementType.Tag;
          }
          var _this = _super.call(this, children) || this;
          _this.name = name;
          _this.attribs = attribs;
          _this.type = type;
          return _this;
        }
        __name(Element2, "Element");
        Object.defineProperty(Element2.prototype, "nodeType", {
          get: /* @__PURE__ */__name(function () {
            return 1;
          }, "get"),
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Element2.prototype, "tagName", {
          // DOM Level 1 aliases
          /**
           * Same as {@link name}.
           * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
           */
          get: /* @__PURE__ */__name(function () {
            return this.name;
          }, "get"),
          set: /* @__PURE__ */__name(function (name) {
            this.name = name;
          }, "set"),
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Element2.prototype, "attributes", {
          get: /* @__PURE__ */__name(function () {
            var _this = this;
            return Object.keys(this.attribs).map(function (name) {
              var _a, _b;
              return {
                name: name,
                value: _this.attribs[name],
                namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
                prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name]
              };
            });
          }, "get"),
          enumerable: false,
          configurable: true
        });
        return Element2;
      }(NodeWithChildren);
      exports4.Element = Element;
      function isTag(node) {
        return (0, domelementtype_1.isTag)(node);
      }
      __name(isTag, "isTag");
      exports4.isTag = isTag;
      function isCDATA(node) {
        return node.type === domelementtype_1.ElementType.CDATA;
      }
      __name(isCDATA, "isCDATA");
      exports4.isCDATA = isCDATA;
      function isText(node) {
        return node.type === domelementtype_1.ElementType.Text;
      }
      __name(isText, "isText");
      exports4.isText = isText;
      function isComment(node) {
        return node.type === domelementtype_1.ElementType.Comment;
      }
      __name(isComment, "isComment");
      exports4.isComment = isComment;
      function isDirective(node) {
        return node.type === domelementtype_1.ElementType.Directive;
      }
      __name(isDirective, "isDirective");
      exports4.isDirective = isDirective;
      function isDocument(node) {
        return node.type === domelementtype_1.ElementType.Root;
      }
      __name(isDocument, "isDocument");
      exports4.isDocument = isDocument;
      function hasChildren(node) {
        return Object.prototype.hasOwnProperty.call(node, "children");
      }
      __name(hasChildren, "hasChildren");
      exports4.hasChildren = hasChildren;
      function cloneNode(node, recursive) {
        if (recursive === void 0) {
          recursive = false;
        }
        var result;
        if (isText(node)) {
          result = new Text(node.data);
        } else if (isComment(node)) {
          result = new Comment(node.data);
        } else if (isTag(node)) {
          var children = recursive ? cloneChildren(node.children) : [];
          var clone_1 = new Element(node.name, __assign2({}, node.attribs), children);
          children.forEach(function (child) {
            return child.parent = clone_1;
          });
          if (node.namespace != null) {
            clone_1.namespace = node.namespace;
          }
          if (node["x-attribsNamespace"]) {
            clone_1["x-attribsNamespace"] = __assign2({}, node["x-attribsNamespace"]);
          }
          if (node["x-attribsPrefix"]) {
            clone_1["x-attribsPrefix"] = __assign2({}, node["x-attribsPrefix"]);
          }
          result = clone_1;
        } else if (isCDATA(node)) {
          var children = recursive ? cloneChildren(node.children) : [];
          var clone_2 = new CDATA(children);
          children.forEach(function (child) {
            return child.parent = clone_2;
          });
          result = clone_2;
        } else if (isDocument(node)) {
          var children = recursive ? cloneChildren(node.children) : [];
          var clone_3 = new Document(children);
          children.forEach(function (child) {
            return child.parent = clone_3;
          });
          if (node["x-mode"]) {
            clone_3["x-mode"] = node["x-mode"];
          }
          result = clone_3;
        } else if (isDirective(node)) {
          var instruction = new ProcessingInstruction(node.name, node.data);
          if (node["x-name"] != null) {
            instruction["x-name"] = node["x-name"];
            instruction["x-publicId"] = node["x-publicId"];
            instruction["x-systemId"] = node["x-systemId"];
          }
          result = instruction;
        } else {
          throw new Error("Not implemented yet: ".concat(node.type));
        }
        result.startIndex = node.startIndex;
        result.endIndex = node.endIndex;
        if (node.sourceCodeLocation != null) {
          result.sourceCodeLocation = node.sourceCodeLocation;
        }
        return result;
      }
      __name(cloneNode, "cloneNode");
      exports4.cloneNode = cloneNode;
      function cloneChildren(childs) {
        var children = childs.map(function (child) {
          return cloneNode(child, true);
        });
        for (var i = 1; i < children.length; i++) {
          children[i].prev = children[i - 1];
          children[i - 1].next = children[i];
        }
        return children;
      }
      __name(cloneChildren, "cloneChildren");
    }
  });

  // node_modules/domhandler/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/domhandler/lib/index.js": function node_modules_domhandler_lib_indexJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var __createBinding = exports4 && exports4.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: /* @__PURE__ */__name(function () {
              return m[k];
            }, "get")
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports4 && exports4.__exportStar || function (m, exports5) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports5, p)) __createBinding(exports5, m, p);
      };
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.DomHandler = void 0;
      var domelementtype_1 = require_lib();
      var node_js_1 = require_node();
      __exportStar(require_node(), exports4);
      var defaultOpts = {
        withStartIndices: false,
        withEndIndices: false,
        xmlMode: false
      };
      var DomHandler = /** @class */
      function () {
        function DomHandler2(callback, options, elementCB) {
          this.dom = [];
          this.root = new node_js_1.Document(this.dom);
          this.done = false;
          this.tagStack = [this.root];
          this.lastNode = null;
          this.parser = null;
          if (typeof options === "function") {
            elementCB = options;
            options = defaultOpts;
          }
          if (typeof callback === "object") {
            options = callback;
            callback = void 0;
          }
          this.callback = callback !== null && callback !== void 0 ? callback : null;
          this.options = options !== null && options !== void 0 ? options : defaultOpts;
          this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
        }
        __name(DomHandler2, "DomHandler");
        DomHandler2.prototype.onparserinit = function (parser) {
          this.parser = parser;
        };
        DomHandler2.prototype.onreset = function () {
          this.dom = [];
          this.root = new node_js_1.Document(this.dom);
          this.done = false;
          this.tagStack = [this.root];
          this.lastNode = null;
          this.parser = null;
        };
        DomHandler2.prototype.onend = function () {
          if (this.done) return;
          this.done = true;
          this.parser = null;
          this.handleCallback(null);
        };
        DomHandler2.prototype.onerror = function (error) {
          this.handleCallback(error);
        };
        DomHandler2.prototype.onclosetag = function () {
          this.lastNode = null;
          var elem = this.tagStack.pop();
          if (this.options.withEndIndices) {
            elem.endIndex = this.parser.endIndex;
          }
          if (this.elementCB) this.elementCB(elem);
        };
        DomHandler2.prototype.onopentag = function (name, attribs) {
          var type = this.options.xmlMode ? domelementtype_1.ElementType.Tag : void 0;
          var element = new node_js_1.Element(name, attribs, void 0, type);
          this.addNode(element);
          this.tagStack.push(element);
        };
        DomHandler2.prototype.ontext = function (data) {
          var lastNode = this.lastNode;
          if (lastNode && lastNode.type === domelementtype_1.ElementType.Text) {
            lastNode.data += data;
            if (this.options.withEndIndices) {
              lastNode.endIndex = this.parser.endIndex;
            }
          } else {
            var node = new node_js_1.Text(data);
            this.addNode(node);
            this.lastNode = node;
          }
        };
        DomHandler2.prototype.oncomment = function (data) {
          if (this.lastNode && this.lastNode.type === domelementtype_1.ElementType.Comment) {
            this.lastNode.data += data;
            return;
          }
          var node = new node_js_1.Comment(data);
          this.addNode(node);
          this.lastNode = node;
        };
        DomHandler2.prototype.oncommentend = function () {
          this.lastNode = null;
        };
        DomHandler2.prototype.oncdatastart = function () {
          var text = new node_js_1.Text("");
          var node = new node_js_1.CDATA([text]);
          this.addNode(node);
          text.parent = node;
          this.lastNode = text;
        };
        DomHandler2.prototype.oncdataend = function () {
          this.lastNode = null;
        };
        DomHandler2.prototype.onprocessinginstruction = function (name, data) {
          var node = new node_js_1.ProcessingInstruction(name, data);
          this.addNode(node);
        };
        DomHandler2.prototype.handleCallback = function (error) {
          if (typeof this.callback === "function") {
            this.callback(error, this.dom);
          } else if (error) {
            throw error;
          }
        };
        DomHandler2.prototype.addNode = function (node) {
          var parent = this.tagStack[this.tagStack.length - 1];
          var previousSibling = parent.children[parent.children.length - 1];
          if (this.options.withStartIndices) {
            node.startIndex = this.parser.startIndex;
          }
          if (this.options.withEndIndices) {
            node.endIndex = this.parser.endIndex;
          }
          parent.children.push(node);
          if (previousSibling) {
            node.prev = previousSibling;
            previousSibling.next = node;
          }
          node.parent = parent;
          this.lastNode = null;
        };
        return DomHandler2;
      }();
      exports4.DomHandler = DomHandler;
      exports4["default"] = DomHandler;
    }
  });

  // node_modules/entities/lib/generated/encode-html.js
  var require_encode_html = __commonJS({
    "node_modules/entities/lib/generated/encode-html.js": function node_modules_entities_lib_generated_encodeHtmlJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      function restoreDiff(arr) {
        for (var i = 1; i < arr.length; i++) {
          arr[i][0] += arr[i - 1][0] + 1;
        }
        return arr;
      }
      __name(restoreDiff, "restoreDiff");
      exports4["default"] = new Map(/* @__PURE__ */restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, {
        v: "&lt;",
        n: 8402,
        o: "&nvlt;"
      }], [0, {
        v: "&equals;",
        n: 8421,
        o: "&bne;"
      }], [0, {
        v: "&gt;",
        n: 8402,
        o: "&nvgt;"
      }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, {
        n: 106,
        o: "&fjlig;"
      }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, {
        v: "&MediumSpace;",
        n: 8202,
        o: "&ThickSpace;"
      }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, {
        v: "&rarrw;",
        n: 824,
        o: "&nrarrw;"
      }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, {
        v: "&part;",
        n: 824,
        o: "&npart;"
      }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, {
        v: "&ang;",
        n: 8402,
        o: "&nang;"
      }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, {
        v: "&cap;",
        n: 65024,
        o: "&caps;"
      }], [0, {
        v: "&cup;",
        n: 65024,
        o: "&cups;"
      }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, {
        v: "&sim;",
        n: 8402,
        o: "&nvsim;"
      }], [0, {
        v: "&backsim;",
        n: 817,
        o: "&race;"
      }], [0, {
        v: "&ac;",
        n: 819,
        o: "&acE;"
      }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, {
        v: "&eqsim;",
        n: 824,
        o: "&nesim;"
      }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, {
        v: "&apid;",
        n: 824,
        o: "&napid;"
      }], [0, "&backcong;"], [0, {
        v: "&asympeq;",
        n: 8402,
        o: "&nvap;"
      }], [0, {
        v: "&bump;",
        n: 824,
        o: "&nbump;"
      }], [0, {
        v: "&bumpe;",
        n: 824,
        o: "&nbumpe;"
      }], [0, {
        v: "&doteq;",
        n: 824,
        o: "&nedot;"
      }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, {
        v: "&Congruent;",
        n: 8421,
        o: "&bnequiv;"
      }], [0, "&nequiv;"], [1, {
        v: "&le;",
        n: 8402,
        o: "&nvle;"
      }], [0, {
        v: "&ge;",
        n: 8402,
        o: "&nvge;"
      }], [0, {
        v: "&lE;",
        n: 824,
        o: "&nlE;"
      }], [0, {
        v: "&gE;",
        n: 824,
        o: "&ngE;"
      }], [0, {
        v: "&lnE;",
        n: 65024,
        o: "&lvertneqq;"
      }], [0, {
        v: "&gnE;",
        n: 65024,
        o: "&gvertneqq;"
      }], [0, {
        v: "&ll;",
        n: new Map(/* @__PURE__ */restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]]))
      }], [0, {
        v: "&gg;",
        n: new Map(/* @__PURE__ */restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]]))
      }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, {
        v: "&scsim;",
        n: 824,
        o: "&NotSucceedsTilde;"
      }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, {
        v: "&sub;",
        n: 8402,
        o: "&NotSubset;"
      }], [0, {
        v: "&sup;",
        n: 8402,
        o: "&NotSuperset;"
      }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, {
        v: "&subne;",
        n: 65024,
        o: "&varsubsetneq;"
      }], [0, {
        v: "&supne;",
        n: 65024,
        o: "&varsupsetneq;"
      }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, {
        v: "&sqsub;",
        n: 824,
        o: "&NotSquareSubset;"
      }], [0, {
        v: "&sqsup;",
        n: 824,
        o: "&NotSquareSuperset;"
      }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, {
        v: "&sqcap;",
        n: 65024,
        o: "&sqcaps;"
      }], [0, {
        v: "&sqcup;",
        n: 65024,
        o: "&sqcups;"
      }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, {
        v: "&LeftTriangleEqual;",
        n: 8402,
        o: "&nvltrie;"
      }], [0, {
        v: "&RightTriangleEqual;",
        n: 8402,
        o: "&nvrtrie;"
      }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, {
        v: "&Ll;",
        n: 824,
        o: "&nLl;"
      }], [0, {
        v: "&Gg;",
        n: 824,
        o: "&nGg;"
      }], [0, {
        v: "&leg;",
        n: 65024,
        o: "&lesg;"
      }], [0, {
        v: "&gel;",
        n: 65024,
        o: "&gesl;"
      }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, {
        v: "&isindot;",
        n: 824,
        o: "&notindot;"
      }], [0, "&notinvc;"], [0, "&notinvb;"], [1, {
        v: "&isinE;",
        n: 824,
        o: "&notinE;"
      }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, {
        v: "&rarrc;",
        n: 824,
        o: "&nrarrc;"
      }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, {
        v: "&LeftTriangleBar;",
        n: 824,
        o: "&NotLeftTriangleBar;"
      }], [0, {
        v: "&RightTriangleBar;",
        n: 824,
        o: "&NotRightTriangleBar;"
      }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, {
        v: "&congdot;",
        n: 824,
        o: "&ncongdot;"
      }], [0, "&easter;"], [0, "&apacir;"], [0, {
        v: "&apE;",
        n: 824,
        o: "&napE;"
      }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, {
        v: "&leqslant;",
        n: 824,
        o: "&nleqslant;"
      }], [0, {
        v: "&geqslant;",
        n: 824,
        o: "&ngeqslant;"
      }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, {
        v: "&LessLess;",
        n: 824,
        o: "&NotNestedLessLess;"
      }], [0, {
        v: "&GreaterGreater;",
        n: 824,
        o: "&NotNestedGreaterGreater;"
      }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, {
        v: "&smte;",
        n: 65024,
        o: "&smtes;"
      }], [0, {
        v: "&late;",
        n: 65024,
        o: "&lates;"
      }], [0, "&bumpE;"], [0, {
        v: "&PrecedesEqual;",
        n: 824,
        o: "&NotPrecedesEqual;"
      }], [0, {
        v: "&sce;",
        n: 824,
        o: "&NotSucceedsEqual;"
      }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, {
        v: "&subE;",
        n: 824,
        o: "&nsubE;"
      }], [0, {
        v: "&supE;",
        n: 824,
        o: "&nsupE;"
      }], [0, "&subsim;"], [0, "&supsim;"], [2, {
        v: "&subnE;",
        n: 65024,
        o: "&varsubsetneqq;"
      }], [0, {
        v: "&supnE;",
        n: 65024,
        o: "&varsupsetneqq;"
      }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, {
        v: "&parsl;",
        n: 8421,
        o: "&nparsl;"
      }], [44343, {
        n: new Map(/* @__PURE__ */restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]]))
      }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
    }
  });

  // node_modules/entities/lib/escape.js
  var require_escape = __commonJS({
    "node_modules/entities/lib/escape.js": function node_modules_entities_lib_escapeJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.escapeText = exports4.escapeAttribute = exports4.escapeUTF8 = exports4.escape = exports4.encodeXML = exports4.getCodePoint = exports4.xmlReplacer = void 0;
      exports4.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
      var xmlCodeMap = /* @__PURE__ */new Map([[34, "&quot;"], [38, "&amp;"], [39, "&apos;"], [60, "&lt;"], [62, "&gt;"]]);
      exports4.getCodePoint =
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      String.prototype.codePointAt != null ? function (str, index) {
        return str.codePointAt(index);
      } :
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      function (c, index) {
        return (c.charCodeAt(index) & 64512) === 55296 ? (c.charCodeAt(index) - 55296) * 1024 + c.charCodeAt(index + 1) - 56320 + 65536 : c.charCodeAt(index);
      };
      function encodeXML(str) {
        var ret = "";
        var lastIdx = 0;
        var match;
        while ((match = exports4.xmlReplacer.exec(str)) !== null) {
          var i = match.index;
          var _char5 = str.charCodeAt(i);
          var next = xmlCodeMap.get(_char5);
          if (next !== void 0) {
            ret += str.substring(lastIdx, i) + next;
            lastIdx = i + 1;
          } else {
            ret += "".concat(str.substring(lastIdx, i), "&#x").concat((0, exports4.getCodePoint)(str, i).toString(16), ";");
            lastIdx = exports4.xmlReplacer.lastIndex += Number((_char5 & 64512) === 55296);
          }
        }
        return ret + str.substr(lastIdx);
      }
      __name(encodeXML, "encodeXML");
      exports4.encodeXML = encodeXML;
      exports4.escape = encodeXML;
      function getEscaper(regex, map) {
        return /* @__PURE__ */__name(function escape(data) {
          var match;
          var lastIdx = 0;
          var result = "";
          while (match = regex.exec(data)) {
            if (lastIdx !== match.index) {
              result += data.substring(lastIdx, match.index);
            }
            result += map.get(match[0].charCodeAt(0));
            lastIdx = match.index + 1;
          }
          return result + data.substring(lastIdx);
        }, "escape");
      }
      __name(getEscaper, "getEscaper");
      exports4.escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
      exports4.escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */new Map([[34, "&quot;"], [38, "&amp;"], [160, "&nbsp;"]]));
      exports4.escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */new Map([[38, "&amp;"], [60, "&lt;"], [62, "&gt;"], [160, "&nbsp;"]]));
    }
  });

  // node_modules/entities/lib/encode.js
  var require_encode = __commonJS({
    "node_modules/entities/lib/encode.js": function node_modules_entities_lib_encodeJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var __importDefault = exports4 && exports4.__importDefault || function (mod2) {
        return mod2 && mod2.__esModule ? mod2 : {
          "default": mod2
        };
      };
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.encodeNonAsciiHTML = exports4.encodeHTML = void 0;
      var encode_html_js_1 = __importDefault(require_encode_html());
      var escape_js_1 = require_escape();
      var htmlReplacer = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
      function encodeHTML(data) {
        return encodeHTMLTrieRe(htmlReplacer, data);
      }
      __name(encodeHTML, "encodeHTML");
      exports4.encodeHTML = encodeHTML;
      function encodeNonAsciiHTML(data) {
        return encodeHTMLTrieRe(escape_js_1.xmlReplacer, data);
      }
      __name(encodeNonAsciiHTML, "encodeNonAsciiHTML");
      exports4.encodeNonAsciiHTML = encodeNonAsciiHTML;
      function encodeHTMLTrieRe(regExp, str) {
        var ret = "";
        var lastIdx = 0;
        var match;
        while ((match = regExp.exec(str)) !== null) {
          var i = match.index;
          ret += str.substring(lastIdx, i);
          var _char6 = str.charCodeAt(i);
          var next = encode_html_js_1["default"].get(_char6);
          if (typeof next === "object") {
            if (i + 1 < str.length) {
              var nextChar = str.charCodeAt(i + 1);
              var value = typeof next.n === "number" ? next.n === nextChar ? next.o : void 0 : next.n.get(nextChar);
              if (value !== void 0) {
                ret += value;
                lastIdx = regExp.lastIndex += 1;
                continue;
              }
            }
            next = next.v;
          }
          if (next !== void 0) {
            ret += next;
            lastIdx = i + 1;
          } else {
            var cp = (0, escape_js_1.getCodePoint)(str, i);
            ret += "&#x".concat(cp.toString(16), ";");
            lastIdx = regExp.lastIndex += Number(cp !== _char6);
          }
        }
        return ret + str.substr(lastIdx);
      }
      __name(encodeHTMLTrieRe, "encodeHTMLTrieRe");
    }
  });

  // node_modules/entities/lib/index.js
  var require_lib3 = __commonJS({
    "node_modules/entities/lib/index.js": function node_modules_entities_lib_indexJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.decodeXMLStrict = exports4.decodeHTML5Strict = exports4.decodeHTML4Strict = exports4.decodeHTML5 = exports4.decodeHTML4 = exports4.decodeHTMLAttribute = exports4.decodeHTMLStrict = exports4.decodeHTML = exports4.decodeXML = exports4.DecodingMode = exports4.EntityDecoder = exports4.encodeHTML5 = exports4.encodeHTML4 = exports4.encodeNonAsciiHTML = exports4.encodeHTML = exports4.escapeText = exports4.escapeAttribute = exports4.escapeUTF8 = exports4.escape = exports4.encodeXML = exports4.encode = exports4.decodeStrict = exports4.decode = exports4.EncodingMode = exports4.EntityLevel = void 0;
      var decode_js_1 = require_decode();
      var encode_js_1 = require_encode();
      var escape_js_1 = require_escape();
      var EntityLevel;
      (function (EntityLevel2) {
        EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
        EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
      })(EntityLevel = exports4.EntityLevel || (exports4.EntityLevel = {}));
      var EncodingMode;
      (function (EncodingMode2) {
        EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
        EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
        EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
        EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
        EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
      })(EncodingMode = exports4.EncodingMode || (exports4.EncodingMode = {}));
      function decode(data, options) {
        if (options === void 0) {
          options = EntityLevel.XML;
        }
        var level = typeof options === "number" ? options : options.level;
        if (level === EntityLevel.HTML) {
          var mode = typeof options === "object" ? options.mode : void 0;
          return (0, decode_js_1.decodeHTML)(data, mode);
        }
        return (0, decode_js_1.decodeXML)(data);
      }
      __name(decode, "decode");
      exports4.decode = decode;
      function decodeStrict(data, options) {
        var _a;
        if (options === void 0) {
          options = EntityLevel.XML;
        }
        var opts = typeof options === "number" ? {
          level: options
        } : options;
        (_a = opts.mode) !== null && _a !== void 0 ? _a : opts.mode = decode_js_1.DecodingMode.Strict;
        return decode(data, opts);
      }
      __name(decodeStrict, "decodeStrict");
      exports4.decodeStrict = decodeStrict;
      function encode(data, options) {
        if (options === void 0) {
          options = EntityLevel.XML;
        }
        var opts = typeof options === "number" ? {
          level: options
        } : options;
        if (opts.mode === EncodingMode.UTF8) return (0, escape_js_1.escapeUTF8)(data);
        if (opts.mode === EncodingMode.Attribute) return (0, escape_js_1.escapeAttribute)(data);
        if (opts.mode === EncodingMode.Text) return (0, escape_js_1.escapeText)(data);
        if (opts.level === EntityLevel.HTML) {
          if (opts.mode === EncodingMode.ASCII) {
            return (0, encode_js_1.encodeNonAsciiHTML)(data);
          }
          return (0, encode_js_1.encodeHTML)(data);
        }
        return (0, escape_js_1.encodeXML)(data);
      }
      __name(encode, "encode");
      exports4.encode = encode;
      var escape_js_2 = require_escape();
      Object.defineProperty(exports4, "encodeXML", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return escape_js_2.encodeXML;
        }, "get")
      });
      Object.defineProperty(exports4, "escape", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return escape_js_2.escape;
        }, "get")
      });
      Object.defineProperty(exports4, "escapeUTF8", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return escape_js_2.escapeUTF8;
        }, "get")
      });
      Object.defineProperty(exports4, "escapeAttribute", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return escape_js_2.escapeAttribute;
        }, "get")
      });
      Object.defineProperty(exports4, "escapeText", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return escape_js_2.escapeText;
        }, "get")
      });
      var encode_js_2 = require_encode();
      Object.defineProperty(exports4, "encodeHTML", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return encode_js_2.encodeHTML;
        }, "get")
      });
      Object.defineProperty(exports4, "encodeNonAsciiHTML", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return encode_js_2.encodeNonAsciiHTML;
        }, "get")
      });
      Object.defineProperty(exports4, "encodeHTML4", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return encode_js_2.encodeHTML;
        }, "get")
      });
      Object.defineProperty(exports4, "encodeHTML5", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return encode_js_2.encodeHTML;
        }, "get")
      });
      var decode_js_2 = require_decode();
      Object.defineProperty(exports4, "EntityDecoder", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_js_2.EntityDecoder;
        }, "get")
      });
      Object.defineProperty(exports4, "DecodingMode", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_js_2.DecodingMode;
        }, "get")
      });
      Object.defineProperty(exports4, "decodeXML", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_js_2.decodeXML;
        }, "get")
      });
      Object.defineProperty(exports4, "decodeHTML", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_js_2.decodeHTML;
        }, "get")
      });
      Object.defineProperty(exports4, "decodeHTMLStrict", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_js_2.decodeHTMLStrict;
        }, "get")
      });
      Object.defineProperty(exports4, "decodeHTMLAttribute", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_js_2.decodeHTMLAttribute;
        }, "get")
      });
      Object.defineProperty(exports4, "decodeHTML4", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_js_2.decodeHTML;
        }, "get")
      });
      Object.defineProperty(exports4, "decodeHTML5", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_js_2.decodeHTML;
        }, "get")
      });
      Object.defineProperty(exports4, "decodeHTML4Strict", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_js_2.decodeHTMLStrict;
        }, "get")
      });
      Object.defineProperty(exports4, "decodeHTML5Strict", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_js_2.decodeHTMLStrict;
        }, "get")
      });
      Object.defineProperty(exports4, "decodeXMLStrict", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return decode_js_2.decodeXML;
        }, "get")
      });
    }
  });

  // node_modules/dom-serializer/lib/foreignNames.js
  var require_foreignNames = __commonJS({
    "node_modules/dom-serializer/lib/foreignNames.js": function node_modules_domSerializer_lib_foreignNamesJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.attributeNames = exports4.elementNames = void 0;
      exports4.elementNames = new Map(["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "glyphRef", "linearGradient", "radialGradient", "textPath"].map(function (val) {
        return [val.toLowerCase(), val];
      }));
      exports4.attributeNames = new Map(["definitionURL", "attributeName", "attributeType", "baseFrequency", "baseProfile", "calcMode", "clipPathUnits", "diffuseConstant", "edgeMode", "filterUnits", "glyphRef", "gradientTransform", "gradientUnits", "kernelMatrix", "kernelUnitLength", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "limitingConeAngle", "markerHeight", "markerUnits", "markerWidth", "maskContentUnits", "maskUnits", "numOctaves", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "refX", "refY", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "specularConstant", "specularExponent", "spreadMethod", "startOffset", "stdDeviation", "stitchTiles", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textLength", "viewBox", "viewTarget", "xChannelSelector", "yChannelSelector", "zoomAndPan"].map(function (val) {
        return [val.toLowerCase(), val];
      }));
    }
  });

  // node_modules/dom-serializer/lib/index.js
  var require_lib4 = __commonJS({
    "node_modules/dom-serializer/lib/index.js": function node_modules_domSerializer_lib_indexJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var __assign2 = exports4 && exports4.__assign || function () {
        __assign2 = Object.assign || function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
        return __assign2.apply(this, arguments);
      };
      var __createBinding = exports4 && exports4.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: /* @__PURE__ */__name(function () {
              return m[k];
            }, "get")
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports4 && exports4.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });
      var __importStar = exports4 && exports4.__importStar || function (mod2) {
        if (mod2 && mod2.__esModule) return mod2;
        var result = {};
        if (mod2 != null) {
          for (var k in mod2) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod2, k)) __createBinding(result, mod2, k);
        }
        __setModuleDefault(result, mod2);
        return result;
      };
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.render = void 0;
      var ElementType = __importStar(require_lib());
      var entities_1 = require_lib3();
      var foreignNames_js_1 = require_foreignNames();
      var unencodedElements = /* @__PURE__ */new Set(["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"]);
      function replaceQuotes(value) {
        return value.replace(/"/g, "&quot;");
      }
      __name(replaceQuotes, "replaceQuotes");
      function formatAttributes(attributes, opts) {
        var _a;
        if (!attributes) return;
        var encode = ((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? entities_1.encodeXML : entities_1.escapeAttribute;
        return Object.keys(attributes).map(function (key) {
          var _a2, _b;
          var value = (_a2 = attributes[key]) !== null && _a2 !== void 0 ? _a2 : "";
          if (opts.xmlMode === "foreign") {
            key = (_b = foreignNames_js_1.attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
          }
          if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
            return key;
          }
          return "".concat(key, '="').concat(encode(value), '"');
        }).join(" ");
      }
      __name(formatAttributes, "formatAttributes");
      var singleTag = /* @__PURE__ */new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
      function render(node, options) {
        if (options === void 0) {
          options = {};
        }
        var nodes = "length" in node ? node : [node];
        var output = "";
        for (var i = 0; i < nodes.length; i++) {
          output += renderNode(nodes[i], options);
        }
        return output;
      }
      __name(render, "render");
      exports4.render = render;
      exports4["default"] = render;
      function renderNode(node, options) {
        switch (node.type) {
          case ElementType.Root:
            return render(node.children, options);
          // @ts-expect-error We don't use `Doctype` yet
          case ElementType.Doctype:
          case ElementType.Directive:
            return renderDirective(node);
          case ElementType.Comment:
            return renderComment(node);
          case ElementType.CDATA:
            return renderCdata(node);
          case ElementType.Script:
          case ElementType.Style:
          case ElementType.Tag:
            return renderTag(node, options);
          case ElementType.Text:
            return renderText(node, options);
        }
      }
      __name(renderNode, "renderNode");
      var foreignModeIntegrationPoints = /* @__PURE__ */new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignObject", "desc", "title"]);
      var foreignElements = /* @__PURE__ */new Set(["svg", "math"]);
      function renderTag(elem, opts) {
        var _a;
        if (opts.xmlMode === "foreign") {
          elem.name = (_a = foreignNames_js_1.elementNames.get(elem.name)) !== null && _a !== void 0 ? _a : elem.name;
          if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) {
            opts = __assign2(__assign2({}, opts), {
              xmlMode: false
            });
          }
        }
        if (!opts.xmlMode && foreignElements.has(elem.name)) {
          opts = __assign2(__assign2({}, opts), {
            xmlMode: "foreign"
          });
        }
        var tag = "<".concat(elem.name);
        var attribs = formatAttributes(elem.attribs, opts);
        if (attribs) {
          tag += " ".concat(attribs);
        }
        if (elem.children.length === 0 && (opts.xmlMode ?
        // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
        opts.selfClosingTags !== false :
        // User explicitly asked for self-closing tags, even in HTML mode
        opts.selfClosingTags && singleTag.has(elem.name))) {
          if (!opts.xmlMode) tag += " ";
          tag += "/>";
        } else {
          tag += ">";
          if (elem.children.length > 0) {
            tag += render(elem.children, opts);
          }
          if (opts.xmlMode || !singleTag.has(elem.name)) {
            tag += "</".concat(elem.name, ">");
          }
        }
        return tag;
      }
      __name(renderTag, "renderTag");
      function renderDirective(elem) {
        return "<".concat(elem.data, ">");
      }
      __name(renderDirective, "renderDirective");
      function renderText(elem, opts) {
        var _a;
        var data = elem.data || "";
        if (((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) {
          data = opts.xmlMode || opts.encodeEntities !== "utf8" ? (0, entities_1.encodeXML)(data) : (0, entities_1.escapeText)(data);
        }
        return data;
      }
      __name(renderText, "renderText");
      function renderCdata(elem) {
        return "<![CDATA[".concat(elem.children[0].data, "]]>");
      }
      __name(renderCdata, "renderCdata");
      function renderComment(elem) {
        return "<!--".concat(elem.data, "-->");
      }
      __name(renderComment, "renderComment");
    }
  });

  // node_modules/domutils/lib/stringify.js
  var require_stringify = __commonJS({
    "node_modules/domutils/lib/stringify.js": function node_modules_domutils_lib_stringifyJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var __importDefault = exports4 && exports4.__importDefault || function (mod2) {
        return mod2 && mod2.__esModule ? mod2 : {
          "default": mod2
        };
      };
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.innerText = exports4.textContent = exports4.getText = exports4.getInnerHTML = exports4.getOuterHTML = void 0;
      var domhandler_1 = require_lib2();
      var dom_serializer_1 = __importDefault(require_lib4());
      var domelementtype_1 = require_lib();
      function getOuterHTML(node, options) {
        return (0, dom_serializer_1["default"])(node, options);
      }
      __name(getOuterHTML, "getOuterHTML");
      exports4.getOuterHTML = getOuterHTML;
      function getInnerHTML(node, options) {
        return (0, domhandler_1.hasChildren)(node) ? node.children.map(function (node2) {
          return getOuterHTML(node2, options);
        }).join("") : "";
      }
      __name(getInnerHTML, "getInnerHTML");
      exports4.getInnerHTML = getInnerHTML;
      function getText(node) {
        if (Array.isArray(node)) return node.map(getText).join("");
        if ((0, domhandler_1.isTag)(node)) return node.name === "br" ? "\n" : getText(node.children);
        if ((0, domhandler_1.isCDATA)(node)) return getText(node.children);
        if ((0, domhandler_1.isText)(node)) return node.data;
        return "";
      }
      __name(getText, "getText");
      exports4.getText = getText;
      function textContent(node) {
        if (Array.isArray(node)) return node.map(textContent).join("");
        if ((0, domhandler_1.hasChildren)(node) && !(0, domhandler_1.isComment)(node)) {
          return textContent(node.children);
        }
        if ((0, domhandler_1.isText)(node)) return node.data;
        return "";
      }
      __name(textContent, "textContent");
      exports4.textContent = textContent;
      function innerText(node) {
        if (Array.isArray(node)) return node.map(innerText).join("");
        if ((0, domhandler_1.hasChildren)(node) && (node.type === domelementtype_1.ElementType.Tag || (0, domhandler_1.isCDATA)(node))) {
          return innerText(node.children);
        }
        if ((0, domhandler_1.isText)(node)) return node.data;
        return "";
      }
      __name(innerText, "innerText");
      exports4.innerText = innerText;
    }
  });

  // node_modules/domutils/lib/traversal.js
  var require_traversal = __commonJS({
    "node_modules/domutils/lib/traversal.js": function node_modules_domutils_lib_traversalJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.prevElementSibling = exports4.nextElementSibling = exports4.getName = exports4.hasAttrib = exports4.getAttributeValue = exports4.getSiblings = exports4.getParent = exports4.getChildren = void 0;
      var domhandler_1 = require_lib2();
      function getChildren(elem) {
        return (0, domhandler_1.hasChildren)(elem) ? elem.children : [];
      }
      __name(getChildren, "getChildren");
      exports4.getChildren = getChildren;
      function getParent(elem) {
        return elem.parent || null;
      }
      __name(getParent, "getParent");
      exports4.getParent = getParent;
      function getSiblings(elem) {
        var _a, _b;
        var parent = getParent(elem);
        if (parent != null) return getChildren(parent);
        var siblings = [elem];
        var prev = elem.prev,
          next = elem.next;
        while (prev != null) {
          siblings.unshift(prev);
          _a = prev, prev = _a.prev;
        }
        while (next != null) {
          siblings.push(next);
          _b = next, next = _b.next;
        }
        return siblings;
      }
      __name(getSiblings, "getSiblings");
      exports4.getSiblings = getSiblings;
      function getAttributeValue(elem, name) {
        var _a;
        return (_a = elem.attribs) === null || _a === void 0 ? void 0 : _a[name];
      }
      __name(getAttributeValue, "getAttributeValue");
      exports4.getAttributeValue = getAttributeValue;
      function hasAttrib(elem, name) {
        return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name) && elem.attribs[name] != null;
      }
      __name(hasAttrib, "hasAttrib");
      exports4.hasAttrib = hasAttrib;
      function getName(elem) {
        return elem.name;
      }
      __name(getName, "getName");
      exports4.getName = getName;
      function nextElementSibling(elem) {
        var _a;
        var next = elem.next;
        while (next !== null && !(0, domhandler_1.isTag)(next)) _a = next, next = _a.next;
        return next;
      }
      __name(nextElementSibling, "nextElementSibling");
      exports4.nextElementSibling = nextElementSibling;
      function prevElementSibling(elem) {
        var _a;
        var prev = elem.prev;
        while (prev !== null && !(0, domhandler_1.isTag)(prev)) _a = prev, prev = _a.prev;
        return prev;
      }
      __name(prevElementSibling, "prevElementSibling");
      exports4.prevElementSibling = prevElementSibling;
    }
  });

  // node_modules/domutils/lib/manipulation.js
  var require_manipulation = __commonJS({
    "node_modules/domutils/lib/manipulation.js": function node_modules_domutils_lib_manipulationJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.prepend = exports4.prependChild = exports4.append = exports4.appendChild = exports4.replaceElement = exports4.removeElement = void 0;
      function removeElement(elem) {
        if (elem.prev) elem.prev.next = elem.next;
        if (elem.next) elem.next.prev = elem.prev;
        if (elem.parent) {
          var childs = elem.parent.children;
          var childsIndex = childs.lastIndexOf(elem);
          if (childsIndex >= 0) {
            childs.splice(childsIndex, 1);
          }
        }
        elem.next = null;
        elem.prev = null;
        elem.parent = null;
      }
      __name(removeElement, "removeElement");
      exports4.removeElement = removeElement;
      function replaceElement(elem, replacement) {
        var prev = replacement.prev = elem.prev;
        if (prev) {
          prev.next = replacement;
        }
        var next = replacement.next = elem.next;
        if (next) {
          next.prev = replacement;
        }
        var parent = replacement.parent = elem.parent;
        if (parent) {
          var childs = parent.children;
          childs[childs.lastIndexOf(elem)] = replacement;
          elem.parent = null;
        }
      }
      __name(replaceElement, "replaceElement");
      exports4.replaceElement = replaceElement;
      function appendChild(parent, child) {
        removeElement(child);
        child.next = null;
        child.parent = parent;
        if (parent.children.push(child) > 1) {
          var sibling = parent.children[parent.children.length - 2];
          sibling.next = child;
          child.prev = sibling;
        } else {
          child.prev = null;
        }
      }
      __name(appendChild, "appendChild");
      exports4.appendChild = appendChild;
      function append(elem, next) {
        removeElement(next);
        var parent = elem.parent;
        var currNext = elem.next;
        next.next = currNext;
        next.prev = elem;
        elem.next = next;
        next.parent = parent;
        if (currNext) {
          currNext.prev = next;
          if (parent) {
            var childs = parent.children;
            childs.splice(childs.lastIndexOf(currNext), 0, next);
          }
        } else if (parent) {
          parent.children.push(next);
        }
      }
      __name(append, "append");
      exports4.append = append;
      function prependChild(parent, child) {
        removeElement(child);
        child.parent = parent;
        child.prev = null;
        if (parent.children.unshift(child) !== 1) {
          var sibling = parent.children[1];
          sibling.prev = child;
          child.next = sibling;
        } else {
          child.next = null;
        }
      }
      __name(prependChild, "prependChild");
      exports4.prependChild = prependChild;
      function prepend(elem, prev) {
        removeElement(prev);
        var parent = elem.parent;
        if (parent) {
          var childs = parent.children;
          childs.splice(childs.indexOf(elem), 0, prev);
        }
        if (elem.prev) {
          elem.prev.next = prev;
        }
        prev.parent = parent;
        prev.prev = elem.prev;
        prev.next = elem;
        elem.prev = prev;
      }
      __name(prepend, "prepend");
      exports4.prepend = prepend;
    }
  });

  // node_modules/domutils/lib/querying.js
  var require_querying = __commonJS({
    "node_modules/domutils/lib/querying.js": function node_modules_domutils_lib_queryingJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.findAll = exports4.existsOne = exports4.findOne = exports4.findOneChild = exports4.find = exports4.filter = void 0;
      var domhandler_1 = require_lib2();
      function filter(test, node, recurse, limit) {
        if (recurse === void 0) {
          recurse = true;
        }
        if (limit === void 0) {
          limit = Infinity;
        }
        return find(test, Array.isArray(node) ? node : [node], recurse, limit);
      }
      __name(filter, "filter");
      exports4.filter = filter;
      function find(test, nodes, recurse, limit) {
        var result = [];
        var nodeStack = [nodes];
        var indexStack = [0];
        for (;;) {
          if (indexStack[0] >= nodeStack[0].length) {
            if (indexStack.length === 1) {
              return result;
            }
            nodeStack.shift();
            indexStack.shift();
            continue;
          }
          var elem = nodeStack[0][indexStack[0]++];
          if (test(elem)) {
            result.push(elem);
            if (--limit <= 0) return result;
          }
          if (recurse && (0, domhandler_1.hasChildren)(elem) && elem.children.length > 0) {
            indexStack.unshift(0);
            nodeStack.unshift(elem.children);
          }
        }
      }
      __name(find, "find");
      exports4.find = find;
      function findOneChild(test, nodes) {
        return nodes.find(test);
      }
      __name(findOneChild, "findOneChild");
      exports4.findOneChild = findOneChild;
      function findOne(test, nodes, recurse) {
        if (recurse === void 0) {
          recurse = true;
        }
        var elem = null;
        for (var i = 0; i < nodes.length && !elem; i++) {
          var node = nodes[i];
          if (!(0, domhandler_1.isTag)(node)) {
            continue;
          } else if (test(node)) {
            elem = node;
          } else if (recurse && node.children.length > 0) {
            elem = findOne(test, node.children, true);
          }
        }
        return elem;
      }
      __name(findOne, "findOne");
      exports4.findOne = findOne;
      function existsOne(test, nodes) {
        return nodes.some(function (checked) {
          return (0, domhandler_1.isTag)(checked) && (test(checked) || existsOne(test, checked.children));
        });
      }
      __name(existsOne, "existsOne");
      exports4.existsOne = existsOne;
      function findAll(test, nodes) {
        var result = [];
        var nodeStack = [nodes];
        var indexStack = [0];
        for (;;) {
          if (indexStack[0] >= nodeStack[0].length) {
            if (nodeStack.length === 1) {
              return result;
            }
            nodeStack.shift();
            indexStack.shift();
            continue;
          }
          var elem = nodeStack[0][indexStack[0]++];
          if (!(0, domhandler_1.isTag)(elem)) continue;
          if (test(elem)) result.push(elem);
          if (elem.children.length > 0) {
            indexStack.unshift(0);
            nodeStack.unshift(elem.children);
          }
        }
      }
      __name(findAll, "findAll");
      exports4.findAll = findAll;
    }
  });

  // node_modules/domutils/lib/legacy.js
  var require_legacy = __commonJS({
    "node_modules/domutils/lib/legacy.js": function node_modules_domutils_lib_legacyJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.getElementsByTagType = exports4.getElementsByTagName = exports4.getElementById = exports4.getElements = exports4.testElement = void 0;
      var domhandler_1 = require_lib2();
      var querying_js_1 = require_querying();
      var Checks = {
        tag_name: /* @__PURE__ */__name(function (name) {
          if (typeof name === "function") {
            return function (elem) {
              return (0, domhandler_1.isTag)(elem) && name(elem.name);
            };
          } else if (name === "*") {
            return domhandler_1.isTag;
          }
          return function (elem) {
            return (0, domhandler_1.isTag)(elem) && elem.name === name;
          };
        }, "tag_name"),
        tag_type: /* @__PURE__ */__name(function (type) {
          if (typeof type === "function") {
            return function (elem) {
              return type(elem.type);
            };
          }
          return function (elem) {
            return elem.type === type;
          };
        }, "tag_type"),
        tag_contains: /* @__PURE__ */__name(function (data) {
          if (typeof data === "function") {
            return function (elem) {
              return (0, domhandler_1.isText)(elem) && data(elem.data);
            };
          }
          return function (elem) {
            return (0, domhandler_1.isText)(elem) && elem.data === data;
          };
        }, "tag_contains")
      };
      function getAttribCheck(attrib, value) {
        if (typeof value === "function") {
          return function (elem) {
            return (0, domhandler_1.isTag)(elem) && value(elem.attribs[attrib]);
          };
        }
        return function (elem) {
          return (0, domhandler_1.isTag)(elem) && elem.attribs[attrib] === value;
        };
      }
      __name(getAttribCheck, "getAttribCheck");
      function combineFuncs(a, b) {
        return function (elem) {
          return a(elem) || b(elem);
        };
      }
      __name(combineFuncs, "combineFuncs");
      function compileTest(options) {
        var funcs = Object.keys(options).map(function (key) {
          var value = options[key];
          return Object.prototype.hasOwnProperty.call(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
        });
        return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
      }
      __name(compileTest, "compileTest");
      function testElement(options, node) {
        var test = compileTest(options);
        return test ? test(node) : true;
      }
      __name(testElement, "testElement");
      exports4.testElement = testElement;
      function getElements(options, nodes, recurse, limit) {
        if (limit === void 0) {
          limit = Infinity;
        }
        var test = compileTest(options);
        return test ? (0, querying_js_1.filter)(test, nodes, recurse, limit) : [];
      }
      __name(getElements, "getElements");
      exports4.getElements = getElements;
      function getElementById(id, nodes, recurse) {
        if (recurse === void 0) {
          recurse = true;
        }
        if (!Array.isArray(nodes)) nodes = [nodes];
        return (0, querying_js_1.findOne)(getAttribCheck("id", id), nodes, recurse);
      }
      __name(getElementById, "getElementById");
      exports4.getElementById = getElementById;
      function getElementsByTagName(tagName, nodes, recurse, limit) {
        if (recurse === void 0) {
          recurse = true;
        }
        if (limit === void 0) {
          limit = Infinity;
        }
        return (0, querying_js_1.filter)(Checks["tag_name"](tagName), nodes, recurse, limit);
      }
      __name(getElementsByTagName, "getElementsByTagName");
      exports4.getElementsByTagName = getElementsByTagName;
      function getElementsByTagType(type, nodes, recurse, limit) {
        if (recurse === void 0) {
          recurse = true;
        }
        if (limit === void 0) {
          limit = Infinity;
        }
        return (0, querying_js_1.filter)(Checks["tag_type"](type), nodes, recurse, limit);
      }
      __name(getElementsByTagType, "getElementsByTagType");
      exports4.getElementsByTagType = getElementsByTagType;
    }
  });

  // node_modules/domutils/lib/helpers.js
  var require_helpers = __commonJS({
    "node_modules/domutils/lib/helpers.js": function node_modules_domutils_lib_helpersJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.uniqueSort = exports4.compareDocumentPosition = exports4.DocumentPosition = exports4.removeSubsets = void 0;
      var domhandler_1 = require_lib2();
      function removeSubsets(nodes) {
        var idx = nodes.length;
        while (--idx >= 0) {
          var node = nodes[idx];
          if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
            nodes.splice(idx, 1);
            continue;
          }
          for (var ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
            if (nodes.includes(ancestor)) {
              nodes.splice(idx, 1);
              break;
            }
          }
        }
        return nodes;
      }
      __name(removeSubsets, "removeSubsets");
      exports4.removeSubsets = removeSubsets;
      var DocumentPosition;
      (function (DocumentPosition2) {
        DocumentPosition2[DocumentPosition2["DISCONNECTED"] = 1] = "DISCONNECTED";
        DocumentPosition2[DocumentPosition2["PRECEDING"] = 2] = "PRECEDING";
        DocumentPosition2[DocumentPosition2["FOLLOWING"] = 4] = "FOLLOWING";
        DocumentPosition2[DocumentPosition2["CONTAINS"] = 8] = "CONTAINS";
        DocumentPosition2[DocumentPosition2["CONTAINED_BY"] = 16] = "CONTAINED_BY";
      })(DocumentPosition = exports4.DocumentPosition || (exports4.DocumentPosition = {}));
      function compareDocumentPosition(nodeA, nodeB) {
        var aParents = [];
        var bParents = [];
        if (nodeA === nodeB) {
          return 0;
        }
        var current = (0, domhandler_1.hasChildren)(nodeA) ? nodeA : nodeA.parent;
        while (current) {
          aParents.unshift(current);
          current = current.parent;
        }
        current = (0, domhandler_1.hasChildren)(nodeB) ? nodeB : nodeB.parent;
        while (current) {
          bParents.unshift(current);
          current = current.parent;
        }
        var maxIdx = Math.min(aParents.length, bParents.length);
        var idx = 0;
        while (idx < maxIdx && aParents[idx] === bParents[idx]) {
          idx++;
        }
        if (idx === 0) {
          return DocumentPosition.DISCONNECTED;
        }
        var sharedParent = aParents[idx - 1];
        var siblings = sharedParent.children;
        var aSibling = aParents[idx];
        var bSibling = bParents[idx];
        if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
          if (sharedParent === nodeB) {
            return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
          }
          return DocumentPosition.FOLLOWING;
        }
        if (sharedParent === nodeA) {
          return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
        }
        return DocumentPosition.PRECEDING;
      }
      __name(compareDocumentPosition, "compareDocumentPosition");
      exports4.compareDocumentPosition = compareDocumentPosition;
      function uniqueSort(nodes) {
        nodes = nodes.filter(function (node, i, arr) {
          return !arr.includes(node, i + 1);
        });
        nodes.sort(function (a, b) {
          var relative = compareDocumentPosition(a, b);
          if (relative & DocumentPosition.PRECEDING) {
            return -1;
          } else if (relative & DocumentPosition.FOLLOWING) {
            return 1;
          }
          return 0;
        });
        return nodes;
      }
      __name(uniqueSort, "uniqueSort");
      exports4.uniqueSort = uniqueSort;
    }
  });

  // node_modules/domutils/lib/feeds.js
  var require_feeds = __commonJS({
    "node_modules/domutils/lib/feeds.js": function node_modules_domutils_lib_feedsJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.getFeed = void 0;
      var stringify_js_1 = require_stringify();
      var legacy_js_1 = require_legacy();
      function getFeed(doc) {
        var feedRoot = getOneElement(isValidFeed, doc);
        return !feedRoot ? null : feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot);
      }
      __name(getFeed, "getFeed");
      exports4.getFeed = getFeed;
      function getAtomFeed(feedRoot) {
        var _a;
        var childs = feedRoot.children;
        var feed = {
          type: "atom",
          items: (0, legacy_js_1.getElementsByTagName)("entry", childs).map(function (item) {
            var _a2;
            var children = item.children;
            var entry = {
              media: getMediaElements(children)
            };
            addConditionally(entry, "id", "id", children);
            addConditionally(entry, "title", "title", children);
            var href2 = (_a2 = getOneElement("link", children)) === null || _a2 === void 0 ? void 0 : _a2.attribs["href"];
            if (href2) {
              entry.link = href2;
            }
            var description = fetch2("summary", children) || fetch2("content", children);
            if (description) {
              entry.description = description;
            }
            var pubDate = fetch2("updated", children);
            if (pubDate) {
              entry.pubDate = new Date(pubDate);
            }
            return entry;
          })
        };
        addConditionally(feed, "id", "id", childs);
        addConditionally(feed, "title", "title", childs);
        var href = (_a = getOneElement("link", childs)) === null || _a === void 0 ? void 0 : _a.attribs["href"];
        if (href) {
          feed.link = href;
        }
        addConditionally(feed, "description", "subtitle", childs);
        var updated = fetch2("updated", childs);
        if (updated) {
          feed.updated = new Date(updated);
        }
        addConditionally(feed, "author", "email", childs, true);
        return feed;
      }
      __name(getAtomFeed, "getAtomFeed");
      function getRssFeed(feedRoot) {
        var _a, _b;
        var childs = (_b = (_a = getOneElement("channel", feedRoot.children)) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
        var feed = {
          type: feedRoot.name.substr(0, 3),
          id: "",
          items: (0, legacy_js_1.getElementsByTagName)("item", feedRoot.children).map(function (item) {
            var children = item.children;
            var entry = {
              media: getMediaElements(children)
            };
            addConditionally(entry, "id", "guid", children);
            addConditionally(entry, "title", "title", children);
            addConditionally(entry, "link", "link", children);
            addConditionally(entry, "description", "description", children);
            var pubDate = fetch2("pubDate", children) || fetch2("dc:date", children);
            if (pubDate) entry.pubDate = new Date(pubDate);
            return entry;
          })
        };
        addConditionally(feed, "title", "title", childs);
        addConditionally(feed, "link", "link", childs);
        addConditionally(feed, "description", "description", childs);
        var updated = fetch2("lastBuildDate", childs);
        if (updated) {
          feed.updated = new Date(updated);
        }
        addConditionally(feed, "author", "managingEditor", childs, true);
        return feed;
      }
      __name(getRssFeed, "getRssFeed");
      var MEDIA_KEYS_STRING = ["url", "type", "lang"];
      var MEDIA_KEYS_INT = ["fileSize", "bitrate", "framerate", "samplingrate", "channels", "duration", "height", "width"];
      function getMediaElements(where) {
        return (0, legacy_js_1.getElementsByTagName)("media:content", where).map(function (elem) {
          var attribs = elem.attribs;
          var media = {
            medium: attribs["medium"],
            isDefault: !!attribs["isDefault"]
          };
          for (var _i = 0, MEDIA_KEYS_STRING_1 = MEDIA_KEYS_STRING; _i < MEDIA_KEYS_STRING_1.length; _i++) {
            var attrib = MEDIA_KEYS_STRING_1[_i];
            if (attribs[attrib]) {
              media[attrib] = attribs[attrib];
            }
          }
          for (var _a = 0, MEDIA_KEYS_INT_1 = MEDIA_KEYS_INT; _a < MEDIA_KEYS_INT_1.length; _a++) {
            var attrib = MEDIA_KEYS_INT_1[_a];
            if (attribs[attrib]) {
              media[attrib] = parseInt(attribs[attrib], 10);
            }
          }
          if (attribs["expression"]) {
            media.expression = attribs["expression"];
          }
          return media;
        });
      }
      __name(getMediaElements, "getMediaElements");
      function getOneElement(tagName, node) {
        return (0, legacy_js_1.getElementsByTagName)(tagName, node, true, 1)[0];
      }
      __name(getOneElement, "getOneElement");
      function fetch2(tagName, where, recurse) {
        if (recurse === void 0) {
          recurse = false;
        }
        return (0, stringify_js_1.textContent)((0, legacy_js_1.getElementsByTagName)(tagName, where, recurse, 1)).trim();
      }
      __name(fetch2, "fetch");
      function addConditionally(obj, prop, tagName, where, recurse) {
        if (recurse === void 0) {
          recurse = false;
        }
        var val = fetch2(tagName, where, recurse);
        if (val) obj[prop] = val;
      }
      __name(addConditionally, "addConditionally");
      function isValidFeed(value) {
        return value === "rss" || value === "feed" || value === "rdf:RDF";
      }
      __name(isValidFeed, "isValidFeed");
    }
  });

  // node_modules/domutils/lib/index.js
  var require_lib5 = __commonJS({
    "node_modules/domutils/lib/index.js": function node_modules_domutils_lib_indexJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var __createBinding = exports4 && exports4.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: /* @__PURE__ */__name(function () {
              return m[k];
            }, "get")
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports4 && exports4.__exportStar || function (m, exports5) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports5, p)) __createBinding(exports5, m, p);
      };
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.hasChildren = exports4.isDocument = exports4.isComment = exports4.isText = exports4.isCDATA = exports4.isTag = void 0;
      __exportStar(require_stringify(), exports4);
      __exportStar(require_traversal(), exports4);
      __exportStar(require_manipulation(), exports4);
      __exportStar(require_querying(), exports4);
      __exportStar(require_legacy(), exports4);
      __exportStar(require_helpers(), exports4);
      __exportStar(require_feeds(), exports4);
      var domhandler_1 = require_lib2();
      Object.defineProperty(exports4, "isTag", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return domhandler_1.isTag;
        }, "get")
      });
      Object.defineProperty(exports4, "isCDATA", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return domhandler_1.isCDATA;
        }, "get")
      });
      Object.defineProperty(exports4, "isText", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return domhandler_1.isText;
        }, "get")
      });
      Object.defineProperty(exports4, "isComment", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return domhandler_1.isComment;
        }, "get")
      });
      Object.defineProperty(exports4, "isDocument", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return domhandler_1.isDocument;
        }, "get")
      });
      Object.defineProperty(exports4, "hasChildren", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return domhandler_1.hasChildren;
        }, "get")
      });
    }
  });

  // node_modules/htmlparser2/lib/index.js
  var require_lib6 = __commonJS({
    "node_modules/htmlparser2/lib/index.js": function node_modules_htmlparser2_lib_indexJs(exports4) {
      "use strict";

      init_dirname();
      init_buffer2();
      init_process2();
      var __createBinding = exports4 && exports4.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: /* @__PURE__ */__name(function () {
              return m[k];
            }, "get")
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports4 && exports4.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });
      var __importStar = exports4 && exports4.__importStar || function (mod2) {
        if (mod2 && mod2.__esModule) return mod2;
        var result = {};
        if (mod2 != null) {
          for (var k in mod2) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod2, k)) __createBinding(result, mod2, k);
        }
        __setModuleDefault(result, mod2);
        return result;
      };
      var __importDefault = exports4 && exports4.__importDefault || function (mod2) {
        return mod2 && mod2.__esModule ? mod2 : {
          "default": mod2
        };
      };
      Object.defineProperty(exports4, "__esModule", {
        value: true
      });
      exports4.DomUtils = exports4.parseFeed = exports4.getFeed = exports4.ElementType = exports4.QuoteType = exports4.Tokenizer = exports4.createDomStream = exports4.createDocumentStream = exports4.parseDOM = exports4.parseDocument = exports4.DefaultHandler = exports4.DomHandler = exports4.Parser = void 0;
      var Parser_js_1 = require_Parser();
      var Parser_js_2 = require_Parser();
      Object.defineProperty(exports4, "Parser", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return Parser_js_2.Parser;
        }, "get")
      });
      var domhandler_1 = require_lib2();
      var domhandler_2 = require_lib2();
      Object.defineProperty(exports4, "DomHandler", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return domhandler_2.DomHandler;
        }, "get")
      });
      Object.defineProperty(exports4, "DefaultHandler", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return domhandler_2.DomHandler;
        }, "get")
      });
      function parseDocument(data, options) {
        var handler = new domhandler_1.DomHandler(void 0, options);
        new Parser_js_1.Parser(handler, options).end(data);
        return handler.root;
      }
      __name(parseDocument, "parseDocument");
      exports4.parseDocument = parseDocument;
      function parseDOM(data, options) {
        return parseDocument(data, options).children;
      }
      __name(parseDOM, "parseDOM");
      exports4.parseDOM = parseDOM;
      function createDocumentStream(callback, options, elementCallback) {
        var handler = new domhandler_1.DomHandler(function (error) {
          return callback(error, handler.root);
        }, options, elementCallback);
        return new Parser_js_1.Parser(handler, options);
      }
      __name(createDocumentStream, "createDocumentStream");
      exports4.createDocumentStream = createDocumentStream;
      function createDomStream(callback, options, elementCallback) {
        var handler = new domhandler_1.DomHandler(callback, options, elementCallback);
        return new Parser_js_1.Parser(handler, options);
      }
      __name(createDomStream, "createDomStream");
      exports4.createDomStream = createDomStream;
      var Tokenizer_js_1 = require_Tokenizer();
      Object.defineProperty(exports4, "Tokenizer", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return __importDefault(Tokenizer_js_1)["default"];
        }, "get")
      });
      Object.defineProperty(exports4, "QuoteType", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return Tokenizer_js_1.QuoteType;
        }, "get")
      });
      exports4.ElementType = __importStar(require_lib());
      var domutils_1 = require_lib5();
      var domutils_2 = require_lib5();
      Object.defineProperty(exports4, "getFeed", {
        enumerable: true,
        get: /* @__PURE__ */__name(function () {
          return domutils_2.getFeed;
        }, "get")
      });
      var parseFeedDefaultOptions = {
        xmlMode: true
      };
      function parseFeed(feed, options) {
        if (options === void 0) {
          options = parseFeedDefaultOptions;
        }
        return (0, domutils_1.getFeed)(parseDOM(feed, options));
      }
      __name(parseFeed, "parseFeed");
      exports4.parseFeed = parseFeed;
      exports4.DomUtils = __importStar(require_lib5());
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
      Namespace.prototype.define = /* @__PURE__ */__name(function define(path, json) {
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
          var defaultHeaders, _i2, _Object$entries, _ref2, name, value;
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
                    for (_i2 = 0, _Object$entries = Object.entries(defaultHeaders); _i2 < _Object$entries.length; _i2++) {
                      _ref2 = _Object$entries[_i2];
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

  // .js/plugins/english/Ranobes[ranobes].js
  init_dirname();
  init_buffer2();
  init_process2();
  var _assign = function __assign() {
    _assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign.apply(this, arguments);
  };
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
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var htmlparser2_1 = require_lib6();
  var fetch_1 = (init_fetch2(), __toCommonJS(fetch_exports));
  var novelStatus_1 = (init_novelStatus(), __toCommonJS(novelStatus_exports));
  var RanobesPlugin = /** @class */
  function () {
    function RanobesPlugin2(metadata) {
      var _this = this;
      this.parseDate = function (date) {
        var now = /* @__PURE__ */new Date();
        if (!date) return now.toISOString();
        if (_this.id === "ranobes-ru") {
          if (date.includes(" \u0432 ")) return date.replace(" \u0432 ", " \u0433., ");
          var _a = date.split(", "),
            when = _a[0],
            time = _a[1];
          if (!time) return now.toISOString();
          var _b = time.split(":"),
            h = _b[0],
            m = _b[1];
          switch (when) {
            case "\u0421\u0435\u0433\u043E\u0434\u043D\u044F":
              now.setHours(parseInt(h, 10));
              now.setMinutes(parseInt(m, 10));
              break;
            case "\u0412\u0447\u0435\u0440\u0430":
              now.setDate(now.getDate() - 1);
              now.setHours(parseInt(h, 10));
              now.setMinutes(parseInt(m, 10));
              break;
            default:
              return now.toISOString();
          }
        } else {
          var _c = date.split(" "),
            num = _c[0],
            xz = _c[1],
            ago = _c[2];
          if (ago !== "ago") return now.toISOString();
          switch (xz) {
            case "minutes":
              now.setMinutes(parseInt(num, 10));
              break;
            case "hour":
            case "hours":
              now.setHours(parseInt(num, 10));
              break;
            case "day":
            case "days":
              now.setDate(now.getDate() - parseInt(num, 10));
              break;
            case "month":
            case "months":
              now.setMonth(now.getMonth() - parseInt(num, 10));
              break;
            case "year":
            case "years":
              now.setFullYear(now.getFullYear() - parseInt(num, 10));
              break;
            default:
              return now.toISOString();
          }
        }
        return now.toISOString();
      };
      this.id = metadata.id;
      this.name = metadata.sourceName;
      this.icon = "multisrc/ranobes/ranobes/icon.png";
      this.site = metadata.sourceSite;
      this.version = "2.0.2";
      this.options = metadata.options;
    }
    __name(RanobesPlugin2, "RanobesPlugin");
    RanobesPlugin2.prototype.safeFecth = function (url_1) {
      return __awaiter(this, arguments, void 0, function (url, init) {
        var r, data, title2;
        var _a, _b;
        if (init === void 0) {
          init = {};
        }
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              return [4, (0, fetch_1.fetchApi)(url, init)];
            case 1:
              r = _c.sent();
              if (!r.ok) throw new Error("Could not reach site (" + r.status + ") try to open in webview.");
              return [4, r.text()];
            case 2:
              data = _c.sent();
              title2 = (_b = (_a = data.match(/<title>(.*?)<\/title>/)) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.trim();
              if (title2 && (title2 == "Bot Verification" || title2 == "You are being redirected..." || title2 == "Un instant..." || title2 == "Just a moment..." || title2 == "Redirecting...")) throw new Error("Captcha error, please open in webview");
              return [2, data];
          }
        });
      });
    };
    RanobesPlugin2.prototype.parseNovels = function (html) {
      var novels = [];
      var tempNovel = {};
      tempNovel.name = "";
      var baseUrl = this.site;
      var isParsingNovel = false;
      var isTitleTag = false;
      var isNovelName = false;
      var parser = new htmlparser2_1.Parser({
        onopentag: /* @__PURE__ */__name(function (name, attribs) {
          var _a, _b;
          if ((_a = attribs["class"]) === null || _a === void 0 ? void 0 : _a.includes("short-cont")) {
            isParsingNovel = true;
          }
          if (isParsingNovel) {
            if (name === "h2" && ((_b = attribs["class"]) === null || _b === void 0 ? void 0 : _b.includes("title"))) {
              isTitleTag = true;
            }
            if (isTitleTag && name === "a") {
              tempNovel.path = attribs["href"].slice(baseUrl.length);
              isNovelName = true;
            }
            if (name === "figure") {
              tempNovel.cover = attribs["style"].replace(/.*url\((.*?)\)./g, "$1");
            }
            if (tempNovel.path && tempNovel.cover) {
              novels.push(tempNovel);
              tempNovel = {};
              tempNovel.name = "";
            }
          }
        }, "onopentag"),
        ontext: /* @__PURE__ */__name(function (data) {
          if (isNovelName) {
            tempNovel.name += data;
          }
        }, "ontext"),
        onclosetag: /* @__PURE__ */__name(function (name) {
          if (name === "h2") {
            isNovelName = false;
            isTitleTag = false;
          }
          if (name === "figure") {
            isParsingNovel = false;
          }
        }, "onclosetag")
      });
      parser.write(html);
      parser.end();
      return novels;
    };
    RanobesPlugin2.prototype.parseChapters = function (data) {
      var _this = this;
      var chapter = [];
      data.chapters.map(function (item) {
        chapter.push({
          name: item.title,
          releaseTime: new Date(item.date).toISOString(),
          path: item.link.slice(_this.site.length)
        });
      });
      return chapter.reverse();
    };
    RanobesPlugin2.prototype.popularNovels = function (page) {
      return __awaiter(this, void 0, void 0, function () {
        var link, body;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              link = "".concat(this.site, "/").concat(this.options.path, "/page/").concat(page, "/");
              return [4, this.safeFecth(link)];
            case 1:
              body = _a.sent();
              return [2, this.parseNovels(body)];
          }
        });
      });
    };
    RanobesPlugin2.prototype.parseNovel = function (novelPath) {
      return __awaiter(this, void 0, void 0, function () {
        var baseUrl, html, novel, isCover, isAuthor, isSummary, isStatus, isStatusText, isGenres, isGenresText, isMaxChapters, isChapter, isChapterTitle, isChapterDate, genreArray, chapters, tempchapter, maxChapters, fixDate, parser;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              baseUrl = this.site;
              return [4, this.safeFecth(baseUrl + novelPath)];
            case 1:
              html = _a.sent();
              novel = {
                path: novelPath,
                name: "",
                summary: "",
                chapters: [],
                totalPages: 1
              };
              isCover = false;
              isAuthor = false;
              isSummary = false;
              isStatus = false;
              isStatusText = false;
              isGenres = false;
              isGenresText = false;
              isMaxChapters = false;
              isChapter = false;
              isChapterTitle = false;
              isChapterDate = false;
              genreArray = [];
              chapters = [];
              tempchapter = {};
              maxChapters = 0;
              fixDate = this.parseDate;
              parser = new htmlparser2_1.Parser({
                onopentag: /* @__PURE__ */__name(function (name, attribs) {
                  if (attribs["class"] === "poster") {
                    isCover = true;
                  }
                  if (isCover && name === "img") {
                    novel.name = attribs["alt"];
                    novel.cover = baseUrl + attribs["src"];
                  }
                  if (name === "div" && attribs["class"] === "moreless cont-text showcont-h" || attribs["class"] === "cont-text showcont-h" && attribs["itemprop"] === "description") {
                    isSummary = true;
                  }
                  if (name === "li" && attribs["title"] && (attribs["title"].includes("Original status") || attribs["title"].includes("\u0421\u0442\u0430\u0442\u0443\u0441 \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u0430"))) {
                    isStatus = true;
                  }
                  if (name === "a" && attribs["rel"] === "chapter") {
                    isChapter = true;
                    tempchapter.path = attribs["href"].replace(baseUrl, "");
                  }
                  if (isChapter && name === "span" && attribs["class"] === "title ellipses") {
                    isChapterTitle = true;
                  }
                  if (isChapter && name === "span" && attribs["class"] === "grey") {
                    isChapterDate = true;
                  }
                  if (name === "li" && (attribs["title"] == "Glossary + illustrations + division of chapters, etc." || attribs["title"] === "\u0413\u043B\u043E\u0441\u0441\u0430\u0440\u0438\u0439 + \u0438\u043B\u043B\u044E\u0441\u0442\u0440\u0430\u0446\u0438\u0439 + \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u0433\u043B\u0430\u0432 \u0438 \u0442.\u0434.")) {
                    isMaxChapters = true;
                  }
                }, "onopentag"),
                onopentagname: /* @__PURE__ */__name(function (name) {
                  if (isSummary && name === "br") {
                    novel.summary += "\n";
                  }
                  if (isStatus && name === "a") {
                    isStatusText = true;
                  }
                  if (isGenres && name === "a") {
                    isGenresText = true;
                  }
                }, "onopentagname"),
                onattribute: /* @__PURE__ */__name(function (name, value) {
                  if (name === "itemprop" && value === "creator") {
                    isAuthor = true;
                  }
                  if (name === "id" && value === "mc-fs-genre") {
                    isGenres = true;
                  }
                }, "onattribute"),
                ontext: /* @__PURE__ */__name(function (data) {
                  if (isAuthor) {
                    novel.author = data;
                  }
                  if (isSummary) {
                    novel.summary += data.trim();
                  }
                  if (isStatusText) {
                    novel.status = data === "Ongoing" || data == "\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435" ? novelStatus_1.NovelStatus.Ongoing : novelStatus_1.NovelStatus.Completed;
                  }
                  if (isGenresText) {
                    genreArray.push(data);
                  }
                  if (isMaxChapters) {
                    var isNumber = data.replace(/\D/g, "");
                    if (isNumber) {
                      maxChapters = parseInt(isNumber, 10);
                    }
                  }
                  if (isChapter) {
                    if (isChapterTitle) tempchapter.name = data.trim();
                    if (isChapterDate) tempchapter.releaseTime = fixDate(data.trim());
                  }
                }, "ontext"),
                onclosetag: /* @__PURE__ */__name(function (name) {
                  if (name === "a") {
                    isCover = false;
                    isAuthor = false;
                    isStatusText = false;
                    isGenresText = false;
                    isStatus = false;
                  }
                  if (name === "div") {
                    isSummary = false;
                    isGenres = false;
                  }
                  if (name === "li") {
                    isMaxChapters = false;
                  }
                  if (name === "a") {
                    isChapter = false;
                    if (tempchapter.name) {
                      chapters.push(_assign(_assign({}, tempchapter), {
                        page: "1"
                      }));
                      tempchapter = {};
                    }
                  }
                  if (name === "span") {
                    if (isChapterTitle) isChapterTitle = false;
                    if (isChapterDate) isChapterDate = false;
                  }
                }, "onclosetag")
              });
              parser.write(html);
              parser.end();
              novel.genres = genreArray.join(", ");
              novel.totalPages = Math.ceil((maxChapters || 1) / 25);
              novel.chapters = chapters;
              if (novel.chapters[0].path) {
                novel.latestChapter = novel.chapters[0];
              }
              return [2, novel];
          }
        });
      });
    };
    RanobesPlugin2.prototype.parsePage = function (novelPath, page) {
      return __awaiter(this, void 0, void 0, function () {
        var pagePath, firstUrl, pageBody, baseUrl, isScript, isChapter, isChapterInfo, isChapterDate, chapters, tempchapter, fixDate, dataJson, parser;
        var _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              pagePath = this.id == "ranobes" ? novelPath.split("-")[0] : "/" + novelPath.split("-").slice(1).join("-").split(".")[0];
              firstUrl = this.site + "/chapters" + pagePath.replace(this.options.path + "/", "");
              return [4, this.safeFecth(firstUrl + "/page/" + page)];
            case 1:
              pageBody = _b.sent();
              baseUrl = this.site;
              isScript = false;
              isChapter = false;
              isChapterInfo = false;
              isChapterDate = false;
              chapters = [];
              tempchapter = {};
              fixDate = this.parseDate;
              dataJson = {
                pages_count: "",
                chapters: []
              };
              parser = new htmlparser2_1.Parser({
                onopentag: /* @__PURE__ */__name(function (name, attribs) {
                  if (name === "div" && attribs["class"] === "cat_block cat_line") {
                    isChapter = true;
                  }
                  if (isChapter && name === "a" && attribs["title"] && attribs["href"]) {
                    tempchapter.name = attribs["title"];
                    tempchapter.path = attribs["href"].replace(baseUrl, "");
                  }
                  if (name === "span" && attribs["class"] === "grey small") {
                    isChapterInfo = true;
                  }
                  if (name === "small" && isChapterInfo) {
                    isChapterDate = true;
                  }
                }, "onopentag"),
                ontext: /* @__PURE__ */__name(function (data) {
                  if (isChapterDate) tempchapter.releaseTime = fixDate(data.trim());
                  if (isScript) {
                    if (data.includes("window.__DATA__ =")) {
                      dataJson = JSON.parse(data.replace("window.__DATA__ =", ""));
                    }
                  }
                }, "ontext"),
                onclosetag: /* @__PURE__ */__name(function (name) {
                  if (name === "a" && tempchapter.name) {
                    chapters.push(tempchapter);
                    tempchapter = {};
                  }
                  if (name === "div") {
                    isChapter = false;
                  }
                  if (name === "span") {
                    isChapterInfo = false;
                  }
                  if (name === "small") {
                    isChapterDate = false;
                  }
                  if (name === "main") {
                    isScript = true;
                  }
                  if (name === "script") {
                    isScript = false;
                  }
                }, "onclosetag")
              });
              parser.write(pageBody);
              parser.end();
              if ((_a = dataJson.chapters) === null || _a === void 0 ? void 0 : _a.length) {
                chapters = this.parseChapters(dataJson);
              }
              return [2, {
                chapters: chapters
              }];
          }
        });
      });
    };
    RanobesPlugin2.prototype.parseChapter = function (chapterPath) {
      return __awaiter(this, void 0, void 0, function () {
        var html, indexA, indexB, chapterText;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4, this.safeFecth(this.site + chapterPath)];
            case 1:
              html = _a.sent();
              indexA = html.indexOf('<div class="text" id="arrticle">');
              indexB = html.indexOf('<div class="category grey ellipses">', indexA);
              chapterText = html.substring(indexA, indexB);
              return [2, chapterText];
          }
        });
      });
    };
    RanobesPlugin2.prototype.searchNovels = function (searchTerm, page) {
      return __awaiter(this, void 0, void 0, function () {
        var html, link;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(this.id === "ranobes-ru")) return [3, 2];
              return [4, this.safeFecth(this.site + "/index.php?do=search", {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Referer: this.site + "/"
                },
                method: "POST",
                body: new URLSearchParams({
                  "do": "search",
                  subaction: "search",
                  search_start: page.toString(),
                  story: searchTerm
                }).toString()
              })];
            case 1:
              html = _a.sent();
              return [3, 4];
            case 2:
              link = "".concat(this.site, "/search/").concat(searchTerm, "/page/").concat(page);
              return [4, this.safeFecth(link)];
            case 3:
              html = _a.sent();
              _a.label = 4;
            case 4:
              return [2, this.parseNovels(html)];
          }
        });
      });
    };
    return RanobesPlugin2;
  }();
  var plugin = new RanobesPlugin({
    "id": "ranobes",
    "sourceSite": "https://ranobes.top",
    "sourceName": "Ranobes",
    "options": {
      "lang": "English",
      "path": "novels"
    }
  });
  exports["default"] = plugin;
}();

// Export for compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = void 0;
}