(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.FlvPlayer = factory());
}(this, function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var objectSpread = _objectSpread;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  var Emitter =
  /*#__PURE__*/
  function () {
    function Emitter() {
      classCallCheck(this, Emitter);
    }

    createClass(Emitter, [{
      key: "on",
      value: function on(name, fn, ctx) {
        var e = this.e || (this.e = {});
        (e[name] || (e[name] = [])).push({
          fn: fn,
          ctx: ctx
        });
        return this;
      }
    }, {
      key: "once",
      value: function once(name, fn, ctx) {
        var self = this;

        function listener() {
          self.off(name, listener);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          fn.apply(ctx, args);
        }

        listener._ = fn;
        return this.on(name, listener, ctx);
      }
    }, {
      key: "emit",
      value: function emit(name) {
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();

        for (var _len2 = arguments.length, data = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          data[_key2 - 1] = arguments[_key2];
        }

        for (var i = 0; i < evtArr.length; i += 1) {
          evtArr[i].fn.apply(evtArr[i].ctx, data);
        }

        return this;
      }
    }, {
      key: "off",
      value: function off(name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];

        if (evts && callback) {
          for (var i = 0, len = evts.length; i < len; i += 1) {
            if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
          }
        }

        if (liveEvents.length) {
          e[name] = liveEvents;
        } else {
          delete e[name];
        }

        return this;
      }
    }]);

    return Emitter;
  }();

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  var isNativeFunction = _isNativeFunction;

  var construct = createCommonjsModule(function (module) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      module.exports = _construct = Reflect.construct;
    } else {
      module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  module.exports = _construct;
  });

  var wrapNativeSuper = createCommonjsModule(function (module) {
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  module.exports = _wrapNativeSuper;
  });

  var FlvPlayerError =
  /*#__PURE__*/
  function (_Error) {
    inherits(FlvPlayerError, _Error);

    function FlvPlayerError(message, context) {
      var _this;

      classCallCheck(this, FlvPlayerError);

      _this = possibleConstructorReturn(this, getPrototypeOf(FlvPlayerError).call(this, message));

      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(assertThisInitialized(_this), context || _this.constructor);
      }

      _this.name = 'FlvPlayerError';
      return _this;
    }

    return FlvPlayerError;
  }(wrapNativeSuper(Error));
  function readBuffer(buffer) {
    var index = 0;

    function read(length) {
      var tempUint8 = new Uint8Array(length);

      for (var i = 0; i < length; i += 1) {
        tempUint8[i] = buffer[index];
        index += 1;
      }

      read.index = index;
      return tempUint8;
    }

    read.index = 0;
    return read;
  }
  function mergeBuffer() {
    for (var _len = arguments.length, buffers = new Array(_len), _key = 0; _key < _len; _key++) {
      buffers[_key] = arguments[_key];
    }

    var Cons = buffers[0].constructor;
    return buffers.reduce(function (pre, val) {
      var merge = new Cons((pre.byteLength | 0) + (val.byteLength | 0));
      merge.set(pre, 0);
      merge.set(val, pre.byteLength | 0);
      return merge;
    }, new Cons());
  }
  function createWorker(workerString) {
    return new Worker(URL.createObjectURL(new Blob([workerString], {
      type: 'application/javascript'
    })));
  }
  function secondToTime(second) {
    var add0 = function add0(num) {
      return num < 10 ? "0".concat(num) : String(num);
    };

    var hour = Math.floor(second / 3600);
    var min = Math.floor((second - hour * 3600) / 60);
    var sec = Math.floor(second - hour * 3600 - min * 60);
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
  }
  function getNowTime() {
    if (performance && typeof performance.now === 'function') {
      return performance.now();
    }

    return Date.now();
  }
  function debounce(func, wait, context) {
    var timeout;

    function fn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var later = function later() {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }

    fn.clearTimeout = function ct() {
      clearTimeout(timeout);
    };

    return fn;
  }
  function throttle(callback, delay) {
    var isThrottled = false;
    var args;
    var context;

    function fn() {
      for (var _len3 = arguments.length, args2 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args2[_key3] = arguments[_key3];
      }

      if (isThrottled) {
        args = args2;
        context = this;
        return;
      }

      isThrottled = true;
      callback.apply(this, args2);
      setTimeout(function () {
        isThrottled = false;

        if (args) {
          fn.apply(context, args);
          args = null;
          context = null;
        }
      }, delay);
    }

    return fn;
  }
  function clamp(num, a, b) {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
  }
  function setStyle(element, key, value) {
    element.style[key] = value;
    return element;
  }
  function getStyle(element, key) {
    var numberType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var value = window.getComputedStyle(element, null).getPropertyValue(key);
    return numberType ? parseFloat(value) : value;
  }

  var Debug = function Debug(flv) {
    classCallCheck(this, Debug);

    var debug = flv.options.debug;

    this.log = function (name) {
      if (debug) {
        var _console;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_console = console).log.apply(_console, ["FlvPlayer: [".concat(name, "]")].concat(args));
      }
    };

    this.warn = function (condition) {
      if (!condition && debug) {
        var _console2;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        (_console2 = console).warn.apply(_console2, args);
      }
    };

    this.error = function (condition, msg) {
      if (!condition) {
        throw new FlvPlayerError(msg);
      }
    };
  };

  var Events =
  /*#__PURE__*/
  function () {
    function Events() {
      classCallCheck(this, Events);

      this.destroyEvents = [];
      this.proxy = this.proxy.bind(this);
    }

    createClass(Events, [{
      key: "proxy",
      value: function proxy(target, name, callback) {
        var _this = this;

        var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        if (Array.isArray(name)) {
          name.forEach(function (item) {
            return _this.proxy(target, item, callback, option);
          });
          return;
        }

        target.addEventListener(name, callback, option);
        this.destroyEvents.push(function () {
          target.removeEventListener(name, callback, option);
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.destroyEvents.forEach(function (event) {
          return event();
        });
      }
    }]);

    return Events;
  }();

  var play = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n  <path d=\"M17.982 9.275L8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45z\"></path>\n</svg>";

  var pause = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n    <path d=\"M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zM15 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z\"></path>\n</svg>";

  var volume = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n    <path d=\"M10.188 4.65L6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zM14.446 3.778a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z\"></path>\n    <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z\"></path>\n</svg>";

  var volumeClose = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n    <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z\"></path>\n    <path d=\"M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zM18.778 18.778l-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z\"></path>\n</svg>";

  var fullscreen = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"36\" width=\"36\" viewBox=\"0 0 36 36\">\n\t<path d=\"m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z\"></path>\n\t<path d=\"m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z\"></path>\n\t<path d=\"m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z\"></path>\n\t<path d=\"M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z\"></path>\n</svg>";

  var loading = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50px\" height=\"50px\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\">\n  <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"/>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(0 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-1s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(30 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.9166666666666666s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(60 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.8333333333333334s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(90 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.75s\" repeatCount=\"indefinite\"/></rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(120 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.6666666666666666s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(150 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.5833333333333334s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(180 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.5s\" repeatCount=\"indefinite\"/></rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(210 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.4166666666666667s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(240 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.3333333333333333s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(270 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.25s\" repeatCount=\"indefinite\"/></rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(300 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.16666666666666666s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(330 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.08333333333333333s\" repeatCount=\"indefinite\"/>\n  </rect>\n</svg>";

  var iconsMap = {
    play: play,
    pause: pause,
    volume: volume,
    volumeClose: volumeClose,
    fullscreen: fullscreen,
    loading: loading
  };
  var icons = {};
  Object.keys(iconsMap).forEach(function (key) {
    icons[key] = "<i class=\"flv-player-icon flv-player-icon-".concat(key, "\">").concat(iconsMap[key], "</i>");
  });

  function template(flv, player) {
    var options = flv.options;
    options.container.classList.add('flv-player-container');
    options.container.innerHTML = "\n        <div class=\"flv-player-inner flv-player-controls-show ".concat(options.live ? 'flv-player-live' : '', " ").concat(options.debug ? 'flv-player-debug' : '', "\">\n            <canvas class=\"flv-player-canvas\" width=\"").concat(options.width, "\" height=\"").concat(options.height, "\"></canvas>\n            ").concat(options.poster ? "<div class=\"flv-player-poster\" style=\"background-image: url(".concat(options.poster, ")\"></div>") : '', "\n            <div class=\"flv-player-loading\">").concat(icons.loading, "</div>\n            ").concat(options.controls ? "\n                <div class=\"flv-player-controls\">\n                    ".concat(!options.live ? "\n                        <div class=\"flv-player-controls-progress\">\n                            <div class=\"flv-player-loaded\"></div>\n                            <div class=\"flv-player-played\">\n                                <div class=\"flv-player-indicator\"></div>\n                            </div>\n                        </div>\n                    " : '', "\n                    <div class=\"flv-player-controls-bottom\">\n                        <div class=\"flv-player-controls-left\">\n                            <div class=\"flv-player-controls-item flv-player-state\">\n                                <div class=\"flv-player-play\">").concat(icons.play, "</div>\n                                <div class=\"flv-player-pause\">").concat(icons.pause, "</div>\n                            </div>\n                            ").concat(options.hasAudio ? "\n                                <div class=\"flv-player-controls-item flv-player-volume\">\n                                    <div class=\"flv-player-volume-on\">".concat(icons.volume, "</div>\n                                    <div class=\"flv-player-volume-off\">").concat(icons.volumeClose, "</div>\n                                    <div class=\"flv-player-volume-panel\">\n                                        <div class=\"flv-player-volume-panel-handle\"></div>\n                                    </div>\n                                </div>\n                            ") : '', "\n                            ").concat(!options.live ? "\n                                <div class=\"flv-player-controls-item flv-player-time\">\n                                    <span class=\"flv-player-current\">00:00</span> / <span class=\"flv-player-duration\">00:00</span>\n                                </div>\n                            " : '', "\n                        </div>\n                        <div class=\"flv-player-controls-right\">\n                            <div class=\"flv-player-controls-item flv-player-fullscreen\">").concat(icons.fullscreen, "</div>\n                        </div>\n                    </div>\n                </div>\n            ") : '', "\n        </div>\n    ");
    Object.defineProperty(player, '$container', {
      value: options.container
    });
    Object.defineProperty(player, '$player', {
      value: options.container.querySelector('.flv-player-inner')
    });
    Object.defineProperty(player, '$canvas', {
      value: options.container.querySelector('.flv-player-canvas')
    });
    Object.defineProperty(player, '$poster', {
      value: options.container.querySelector('.flv-player-poster')
    });
    Object.defineProperty(player, '$loading', {
      value: options.container.querySelector('.flv-player-loading')
    });
    Object.defineProperty(player, '$controls', {
      value: options.container.querySelector('.flv-player-controls')
    });
    Object.defineProperty(player, '$state', {
      value: options.container.querySelector('.flv-player-state')
    });
    Object.defineProperty(player, '$play', {
      value: options.container.querySelector('.flv-player-play')
    });
    Object.defineProperty(player, '$pause', {
      value: options.container.querySelector('.flv-player-pause')
    });
    Object.defineProperty(player, '$current', {
      value: options.container.querySelector('.flv-player-current')
    });
    Object.defineProperty(player, '$duration', {
      value: options.container.querySelector('.flv-player-duration')
    });
    Object.defineProperty(player, '$volumeOn', {
      value: options.container.querySelector('.flv-player-volume-on')
    });
    Object.defineProperty(player, '$volumeOff', {
      value: options.container.querySelector('.flv-player-volume-off')
    });
    Object.defineProperty(player, '$volumePanel', {
      value: options.container.querySelector('.flv-player-volume-panel')
    });
    Object.defineProperty(player, '$volumeHandle', {
      value: options.container.querySelector('.flv-player-volume-panel-handle')
    });
    Object.defineProperty(player, '$fullscreen', {
      value: options.container.querySelector('.flv-player-fullscreen')
    });
    Object.defineProperty(player, '$progress', {
      value: options.container.querySelector('.flv-player-controls-progress')
    });
    Object.defineProperty(player, '$loaded', {
      value: options.container.querySelector('.flv-player-loaded')
    });
    Object.defineProperty(player, '$played', {
      value: options.container.querySelector('.flv-player-played')
    });
    Object.defineProperty(player, '$indicator', {
      value: options.container.querySelector('.flv-player-indicator')
    });
  }

  var screenfull = createCommonjsModule(function (module) {
  /*!
  * screenfull
  * v4.2.0 - 2019-04-01
  * (c) Sindre Sorhus; MIT License
  */
  (function () {

  	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
  	var isCommonjs = module.exports;
  	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

  	var fn = (function () {
  		var val;

  		var fnMap = [
  			[
  				'requestFullscreen',
  				'exitFullscreen',
  				'fullscreenElement',
  				'fullscreenEnabled',
  				'fullscreenchange',
  				'fullscreenerror'
  			],
  			// New WebKit
  			[
  				'webkitRequestFullscreen',
  				'webkitExitFullscreen',
  				'webkitFullscreenElement',
  				'webkitFullscreenEnabled',
  				'webkitfullscreenchange',
  				'webkitfullscreenerror'

  			],
  			// Old WebKit (Safari 5.1)
  			[
  				'webkitRequestFullScreen',
  				'webkitCancelFullScreen',
  				'webkitCurrentFullScreenElement',
  				'webkitCancelFullScreen',
  				'webkitfullscreenchange',
  				'webkitfullscreenerror'

  			],
  			[
  				'mozRequestFullScreen',
  				'mozCancelFullScreen',
  				'mozFullScreenElement',
  				'mozFullScreenEnabled',
  				'mozfullscreenchange',
  				'mozfullscreenerror'
  			],
  			[
  				'msRequestFullscreen',
  				'msExitFullscreen',
  				'msFullscreenElement',
  				'msFullscreenEnabled',
  				'MSFullscreenChange',
  				'MSFullscreenError'
  			]
  		];

  		var i = 0;
  		var l = fnMap.length;
  		var ret = {};

  		for (; i < l; i++) {
  			val = fnMap[i];
  			if (val && val[1] in document) {
  				for (i = 0; i < val.length; i++) {
  					ret[fnMap[0][i]] = val[i];
  				}
  				return ret;
  			}
  		}

  		return false;
  	})();

  	var eventNameMap = {
  		change: fn.fullscreenchange,
  		error: fn.fullscreenerror
  	};

  	var screenfull = {
  		request: function (elem) {
  			return new Promise(function (resolve) {
  				var request = fn.requestFullscreen;

  				var onFullScreenEntered = function () {
  					this.off('change', onFullScreenEntered);
  					resolve();
  				}.bind(this);

  				elem = elem || document.documentElement;

  				// Work around Safari 5.1 bug: reports support for
  				// keyboard in fullscreen even though it doesn't.
  				// Browser sniffing, since the alternative with
  				// setTimeout is even worse.
  				if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
  					elem[request]();
  				} else {
  					elem[request](keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {});
  				}

  				this.on('change', onFullScreenEntered);
  			}.bind(this));
  		},
  		exit: function () {
  			return new Promise(function (resolve) {
  				if (!this.isFullscreen) {
  					resolve();
  					return;
  				}

  				var onFullScreenExit = function () {
  					this.off('change', onFullScreenExit);
  					resolve();
  				}.bind(this);

  				document[fn.exitFullscreen]();

  				this.on('change', onFullScreenExit);
  			}.bind(this));
  		},
  		toggle: function (elem) {
  			return this.isFullscreen ? this.exit() : this.request(elem);
  		},
  		onchange: function (callback) {
  			this.on('change', callback);
  		},
  		onerror: function (callback) {
  			this.on('error', callback);
  		},
  		on: function (event, callback) {
  			var eventName = eventNameMap[event];
  			if (eventName) {
  				document.addEventListener(eventName, callback, false);
  			}
  		},
  		off: function (event, callback) {
  			var eventName = eventNameMap[event];
  			if (eventName) {
  				document.removeEventListener(eventName, callback, false);
  			}
  		},
  		raw: fn
  	};

  	if (!fn) {
  		if (isCommonjs) {
  			module.exports = false;
  		} else {
  			window.screenfull = false;
  		}

  		return;
  	}

  	Object.defineProperties(screenfull, {
  		isFullscreen: {
  			get: function () {
  				return Boolean(document[fn.fullscreenElement]);
  			}
  		},
  		element: {
  			enumerable: true,
  			get: function () {
  				return document[fn.fullscreenElement];
  			}
  		},
  		enabled: {
  			enumerable: true,
  			get: function () {
  				// Coerce to boolean in case of old WebKit
  				return Boolean(document[fn.fullscreenEnabled]);
  			}
  		}
  	});

  	if (isCommonjs) {
  		module.exports = screenfull;
  		// TODO: remove this in the next major version
  		module.exports.default = screenfull;
  	} else {
  		window.screenfull = screenfull;
  	}
  })();
  });

  function property(flv, player) {
    Object.defineProperty(player, 'rect', {
      get: function get() {
        return player.$container.getBoundingClientRect();
      }
    });
    ['bottom', 'height', 'left', 'right', 'top', 'width'].forEach(function (key) {
      Object.defineProperty(player, key, {
        get: function get() {
          return player.rect[key];
        }
      });
    });
    Object.defineProperty(player, 'currentTime', {
      get: function get() {
        return flv.decoder.currentTime;
      },
      set: function set(time) {
        if (!flv.options.live) {
          flv.decoder.seeked(clamp(time, 0, player.loaded));
        }
      }
    });
    Object.defineProperty(player, 'streaming', {
      get: function get() {
        return flv.demuxer.streaming;
      }
    });
    Object.defineProperty(player, 'demuxed', {
      get: function get() {
        return flv.demuxer.demuxed;
      }
    });
    Object.defineProperty(player, 'videoDecoding', {
      get: function get() {
        return flv.decoder.video.decoding;
      }
    });
    Object.defineProperty(player, 'audioDecoding', {
      get: function get() {
        return flv.decoder.audio.decoding;
      }
    });
    Object.defineProperty(player, 'duration', {
      get: function get() {
        try {
          return flv.demuxer.scripMeta.amf2.metaData.duration;
        } catch (error) {
          return flv.options.duration || 0;
        }
      }
    });
    Object.defineProperty(player, 'frameRate', {
      get: function get() {
        var defaultFrameRate = Math.round(flv.options.frameRate || 30);

        try {
          return Math.round(flv.demuxer.scripMeta.amf2.metaData.framerate) || defaultFrameRate;
        } catch (error) {
          return defaultFrameRate;
        }
      }
    });
    Object.defineProperty(player, 'frameDuration', {
      get: function get() {
        return 1000 / player.frameRate | 0;
      }
    });
    Object.defineProperty(player, 'isFocus', {
      value: false,
      writable: true
    });
    Object.defineProperty(player, 'volume', {
      get: function get() {
        try {
          return flv.decoder.audio.gainNode.gain.value;
        } catch (error) {
          return 0;
        }
      },
      set: function set(value) {
        try {
          flv.decoder.audio.gainNode.gain.value = clamp(value, 0, 10);
          flv.emit('volumechange', player.volume);
          return player.volume;
        } catch (error) {
          return value;
        }
      }
    });
    Object.defineProperty(player, 'loaded', {
      get: function get() {
        return flv.decoder.video.loaded;
      }
    });
    Object.defineProperty(player, 'playing', {
      get: function get() {
        return flv.decoder.playing;
      }
    });
    Object.defineProperty(player, 'play', {
      value: function value() {
        if (!player.playing) {
          flv.decoder.play();
        }
      }
    });
    Object.defineProperty(player, 'pause', {
      value: function value() {
        flv.decoder.pause();
      }
    });
    Object.defineProperty(player, 'toggle', {
      value: function value() {
        if (player.playing) {
          player.pause();
        } else {
          player.play();
        }
      }
    });
    Object.defineProperty(player, 'autoSize', {
      value: function value() {
        var playerWidth = player.width;
        var playerHeight = player.height;
        var playerRatio = playerWidth / playerHeight;
        var canvasWidth = player.$canvas.width;
        var canvasHeight = player.$canvas.height;
        var canvasRatio = canvasWidth / canvasHeight;

        if (playerRatio > canvasRatio) {
          var padding = (playerWidth - playerHeight * canvasRatio) / 2;
          player.$container.style.padding = "0 ".concat(padding, "px");
        } else {
          var _padding = (playerHeight - playerWidth / canvasRatio) / 2;

          player.$container.style.padding = "".concat(_padding, "px 0");
        }
      }
    });
    Object.defineProperty(player, 'controls', {
      get: function get() {
        return player.$player.classList.contains('flv-player-controls-show');
      },
      set: function set(type) {
        if (type) {
          player.$player.classList.add('flv-player-controls-show');
        } else {
          player.$player.classList.remove('flv-player-controls-show');
        }
      }
    });
    Object.defineProperty(player, 'loading', {
      get: function get() {
        return player.$player.classList.contains('flv-player-loading-show');
      },
      set: function set(type) {
        if (type) {
          player.$player.classList.add('flv-player-loading-show');
        } else {
          player.$player.classList.remove('flv-player-loading-show');
        }
      }
    });

    try {
      var screenfullChange = function screenfullChange() {
        if (player.fullscreen) {
          player.$container.classList.add('flv-player-fullscreen');
        } else {
          player.$container.classList.remove('flv-player-fullscreen');
        }

        player.autoSize();
      };

      screenfull.on('change', screenfullChange);
      flv.events.destroyEvents.push(function () {
        screenfull.off('change', screenfullChange);
      });
    } catch (error) {
      flv.debug.warn(false, 'Does not seem to support full screen events');
    }

    Object.defineProperty(player, 'fullscreen', {
      get: function get() {
        return screenfull.isFullscreen || player.$container.classList.contains('flv-player-fullscreen-web');
      },
      set: function set(type) {
        if (type) {
          try {
            screenfull.request(player.$container);
          } catch (error) {
            player.$container.classList.add('flv-player-fullscreen-web');
          }
        } else {
          try {
            screenfull.exit();
          } catch (error) {
            player.$container.classList.remove('flv-player-fullscreen-web');
          }
        }
      }
    });
  }

  function observer(flv, player) {
    var proxy = flv.events.proxy;
    var object = document.createElement('object');
    object.setAttribute('aria-hidden', 'true');
    object.setAttribute('tabindex', -1);
    object.type = 'text/html';
    object.data = 'about:blank';
    var playerWidth = player.width;
    var playerHeight = player.height;
    proxy(object, 'load', function () {
      proxy(object.contentDocument.defaultView, 'resize', function () {
        if (player.width !== playerWidth || player.height !== playerHeight) {
          playerWidth = player.width;
          playerHeight = player.height;
          flv.emit('resize');
        }
      });
    });
    player.$container.appendChild(object);
  }

  function events(flv, player) {
    var poster = flv.options.poster,
        proxy = flv.events.proxy;
    player.autoSize();
    flv.on('scripMeta', function (scripMeta) {
      var _scripMeta$amf2$metaD = scripMeta.amf2.metaData,
          width = _scripMeta$amf2$metaD.width,
          height = _scripMeta$amf2$metaD.height;
      player.$canvas.width = width;
      player.$canvas.height = height;
      player.autoSize();
    });
    flv.on('resize', function () {
      player.autoSize();
    });
    proxy(window, ['click', 'contextmenu'], function (event) {
      if (event.composedPath().indexOf(player.$container) > -1) {
        player.isFocus = true;
      } else {
        player.isFocus = false;
      }
    });
    proxy(player.$canvas, 'click', function () {
      player.toggle();
    });

    if (poster) {
      flv.on('play', function () {
        player.$poster.style.display = 'none';
      });
      flv.on('seeked', function () {
        player.$poster.style.display = 'none';
      });
    }

    flv.on('waiting', function () {
      player.loading = true;
    });
    flv.on('ended', function () {
      player.loading = false;
    });
    flv.on('timeupdate', function () {
      player.loading = false;
    });
  }

  function hotkey(flv, player) {
    var proxy = flv.events.proxy;
    var keys = {};

    function addHotkey(key, event) {
      if (keys[key]) {
        keys[key].push(event);
      } else {
        keys[key] = [event];
      }
    }

    addHotkey(27, function () {
      if (player.fullscreen) {
        player.fullscreen = false;
      }
    });
    addHotkey(32, function () {
      player.toggle();
    });
    addHotkey(37, function () {
      player.currentTime -= 10;
    });
    addHotkey(38, function () {
      player.volume += 1;
    });
    addHotkey(39, function () {
      player.currentTime += 10;
    });
    addHotkey(40, function () {
      player.volume -= 1;
    });
    proxy(window, 'keydown', function (event) {
      if (player.isFocus) {
        var tag = document.activeElement.tagName.toUpperCase();
        var editable = document.activeElement.getAttribute('contenteditable');

        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && editable !== '' && editable !== 'true') {
          var events = keys[event.keyCode];

          if (events) {
            event.preventDefault();
            events.forEach(function (fn) {
              return fn();
            });
          }
        }
      }
    });
  }

  function controls(flv, player) {
    var proxy = flv.events.proxy;
    proxy(player.$play, 'click', function () {
      player.play();
    });
    proxy(player.$pause, 'click', function () {
      player.pause();
    });
    var loadedFn = throttle(function (timestamp) {
      var time = clamp(timestamp / player.duration, 0, 1);
      player.$loaded.style.width = "".concat(time * 100, "%");
    }, 500);
    flv.on('videoLoaded', function (timestamp) {
      if (!flv.options.live) {
        loadedFn(timestamp);
      }
    });
    var timeupdateFn = throttle(function (currentTime) {
      player.$played.style.width = "".concat(currentTime / player.duration * 100, "%");
      player.$current.innerText = secondToTime(currentTime);
    }, 500);
    flv.on('timeupdate', function (currentTime) {
      if (!flv.options.live) {
        timeupdateFn(currentTime);
      }
    });
    flv.on('seeked', function (currentTime) {
      if (!flv.options.live) {
        timeupdateFn(currentTime);
      }
    });
    flv.on('play', function () {
      player.$play.style.display = 'none';
      player.$pause.style.display = 'block';
    });
    flv.on('ended', function () {
      player.controls = true;
      player.$play.style.display = 'block';
      player.$pause.style.display = 'none';
    });
    flv.on('pause', function () {
      player.$play.style.display = 'block';
      player.$pause.style.display = 'none';
    });
    flv.on('scripMeta', function () {
      if (!flv.options.live) {
        player.$duration.innerText = secondToTime(player.duration);
      }
    });
    proxy(player.$fullscreen, 'click', function () {
      if (player.fullscreen) {
        player.fullscreen = false;
      } else {
        player.fullscreen = true;
      }
    });
    var autoHide = debounce(function () {
      player.$player.classList.add('flv-player-hide-cursor');
      player.controls = false;
    }, 5000);
    proxy(player.$player, 'mousemove', function () {
      autoHide.clearTimeout();
      player.$player.classList.remove('flv-player-hide-cursor');
      player.controls = true;

      if (player.playing) {
        autoHide();
      }
    });

    function volumeChangeFromEvent(event) {
      var _player$$volumePanel$ = player.$volumePanel.getBoundingClientRect(),
          panelLeft = _player$$volumePanel$.left,
          panelWidth = _player$$volumePanel$.width;

      var _player$$volumeHandle = player.$volumeHandle.getBoundingClientRect(),
          handleWidth = _player$$volumeHandle.width;

      var percentage = clamp(event.x - panelLeft - handleWidth / 2, 0, panelWidth - handleWidth / 2) / (panelWidth - handleWidth);
      return percentage * 10;
    }

    function setVolumeHandle(percentage) {
      if (percentage === 0) {
        setStyle(player.$volumeOn, 'display', 'none');
        setStyle(player.$volumeOff, 'display', 'flex');
        setStyle(player.$volumeHandle, 'left', '0');
      } else {
        var panelWidth = getStyle(player.$volumePanel, 'width') || 60;
        var handleWidth = getStyle(player.$volumeHandle, 'width');
        var width = (panelWidth - handleWidth) * percentage / 10;
        setStyle(player.$volumeOn, 'display', 'flex');
        setStyle(player.$volumeOff, 'display', 'none');
        setStyle(player.$volumeHandle, 'left', "".concat(width, "px"));
      }
    }

    if (flv.options.hasAudio) {
      var lastVolume = 0;
      var isVolumeDroging = false;
      setVolumeHandle(flv.options.volume);
      flv.on('volumechange', function () {
        setVolumeHandle(player.volume);
      });
      proxy(player.$volumeOn, 'click', function () {
        player.$volumeOn.style.display = 'none';
        player.$volumeOff.style.display = 'block';
        lastVolume = player.volume;
        player.volume = 0;
      });
      proxy(player.$volumeOff, 'click', function () {
        player.$volumeOn.style.display = 'block';
        player.$volumeOff.style.display = 'none';
        player.volume = lastVolume || 7;
      });
      proxy(player.$volumePanel, 'click', function (event) {
        player.volume = volumeChangeFromEvent(event);
      });
      proxy(player.$volumeHandle, 'mousedown', function () {
        isVolumeDroging = true;
      });
      proxy(player.$volumeHandle, 'mousemove', function (event) {
        if (isVolumeDroging) {
          player.volume = volumeChangeFromEvent(event);
        }
      });
      proxy(document, 'mouseup', function () {
        if (isVolumeDroging) {
          isVolumeDroging = false;
        }
      });
    }

    function getPosFromEvent(event) {
      var $progress = player.$progress;

      var _$progress$getBoundin = $progress.getBoundingClientRect(),
          left = _$progress$getBoundin.left;

      var width = clamp(event.x - left, 0, $progress.clientWidth);
      var second = width / $progress.clientWidth * player.duration;
      var time = secondToTime(second);
      var percentage = clamp(width / $progress.clientWidth, 0, 1);
      return {
        second: second,
        time: time,
        width: width,
        percentage: percentage
      };
    }

    if (!flv.options.live) {
      proxy(player.$progress, 'click', function (event) {
        if (event.target !== player.$indicator) {
          var _getPosFromEvent = getPosFromEvent(event),
              second = _getPosFromEvent.second,
              percentage = _getPosFromEvent.percentage;

          if (second <= player.loaded) {
            player.$played.style.width = "".concat(percentage * 100, "%");
            player.currentTime = second;
          }
        }
      });
      var isIndicatorDroging = false;
      proxy(player.$indicator, 'mousedown', function () {
        isIndicatorDroging = true;
      });
      proxy(document, 'mousemove', function (event) {
        if (isIndicatorDroging) {
          var _getPosFromEvent2 = getPosFromEvent(event),
              second = _getPosFromEvent2.second,
              percentage = _getPosFromEvent2.percentage;

          if (second <= player.loaded) {
            player.$played.style.width = "".concat(percentage * 100, "%");
            player.currentTime = second;
          }
        }
      });
      proxy(document, 'mouseup', function () {
        if (isIndicatorDroging) {
          isIndicatorDroging = false;
        }
      });
      var isCanvasDroging = false;
      var touchstartX = 0;
      var touchSecond = 0;
      proxy(player.$canvas, 'touchstart', function (event) {
        isCanvasDroging = true;
        touchstartX = event.targetTouches[0].clientX;
      });
      proxy(player.$canvas, 'touchmove', function (event) {
        if (isCanvasDroging) {
          var $progress = player.$progress;
          var moveWidth = event.targetTouches[0].clientX - touchstartX;
          touchSecond = moveWidth / $progress.clientWidth * player.duration;
        }
      });
      proxy(player.$canvas, 'touchend', function () {
        if (isCanvasDroging) {
          isCanvasDroging = false;

          if (touchSecond <= player.loaded) {
            player.currentTime += touchSecond;
          }

          touchstartX = 0;
          touchSecond = 0;
        }
      });
    }
  }

  var Player = function Player(flv) {
    classCallCheck(this, Player);

    template(flv, this);
    property(flv, this);
    observer(flv, this);
    events(flv, this);

    if (flv.options.hotkey) {
      hotkey(flv, this);
    }

    if (flv.options.controls) {
      controls(flv, this);
    }
  };

  var AudioDecoder =
  /*#__PURE__*/
  function () {
    function AudioDecoder(flv) {
      var _this = this;

      classCallCheck(this, AudioDecoder);

      this.flv = flv;
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.gainNode = this.context.createGain();
      this.gainNode.gain.value = flv.options.volume;
      this.playing = false;
      this.playIndex = 0;
      this.audiobuffers = [];
      this.timestamps = [];
      this.audioInputLength = 0;
      this.decoding = false;
      this.byteSize = 0;
      this.loaded = 0;
      flv.on('destroy', function () {
        _this.audiobuffers = [];

        _this.stop();
      });
      var timestampTmp = [];
      this.decodeErrorBuffer = new Uint8Array();
      this.decodeWaitingBuffer = new Uint8Array();
      flv.on('audioData', function (uint8, timestamp) {
        _this.decoding = true;
        _this.audioInputLength += 1;

        if (_this.decodeWaitingBuffer.byteLength >= 1024 * 128) {
          _this.timestamps.push(timestampTmp[0]);

          timestampTmp = [];
          var buffer = mergeBuffer(_this.decodeErrorBuffer, _this.decodeWaitingBuffer).buffer;
          _this.decodeWaitingBuffer = new Uint8Array();

          _this.context.decodeAudioData(buffer, function (audiobuffer) {
            _this.loaded += audiobuffer.duration;
            _this.byteSize += audiobuffer.length;

            _this.audiobuffers.push(audiobuffer);

            flv.emit('audioLoaded', _this.loaded);
            _this.decodeErrorBuffer = new Uint8Array();
          }).catch(function () {
            _this.decodeErrorBuffer = mergeBuffer(_this.decodeErrorBuffer, _this.decodeWaitingBuffer);
          });
        } else {
          timestampTmp.push(timestamp);
          _this.decodeWaitingBuffer = mergeBuffer(_this.decodeWaitingBuffer, uint8);
        }
      });
      flv.on('timeupdate', function (currentTime) {
        if (_this.flv.demuxer.demuxed && _this.decodeWaitingBuffer.length) {
          _this.timestamps.push(timestampTmp[0]);

          timestampTmp = [];

          _this.context.decodeAudioData(_this.decodeWaitingBuffer.buffer, function (audiobuffer) {
            _this.decodeWaitingBuffer = new Uint8Array();
            _this.decodeErrorBuffer = new Uint8Array();
            _this.loaded += audiobuffer.duration;
            _this.byteSize += audiobuffer.length;

            _this.audiobuffers.push(audiobuffer);

            flv.emit('audioLoaded', _this.loaded);
            _this.decoding = false;
          });
        }

        var timestamp = _this.timestamps[_this.playIndex];

        if (timestamp && currentTime * 1000 >= timestamp) {
          var state = _this.queue(_this.playIndex);

          if (state) {
            _this.playIndex += 1;
          } else {
            _this.stop();
          }
        }
      });
    }

    createClass(AudioDecoder, [{
      key: "queue",
      value: function queue(index) {
        var _this2 = this;

        var audiobuffer = this.audiobuffers[index];
        if (!audiobuffer) return false;
        this.source = this.context.createBufferSource();
        this.source.buffer = audiobuffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);

        this.source.onended = function () {
          if (_this2.flv.options.live) {
            _this2.audiobuffers[index] = null;
          }
        };

        this.playing = true;
        this.source.start();
        return true;
      }
    }, {
      key: "play",
      value: function play() {
        var _this3 = this;

        var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.stop();
        var time = 0;
        var index = this.audiobuffers.findIndex(function (item) {
          time += item.duration;
          return startTime <= time;
        });
        var audiobuffer = this.audiobuffers[index];

        if (!audiobuffer) {
          this.stop();
          return;
        }

        var offset = startTime - (time - audiobuffer.duration);
        this.source = this.context.createBufferSource();
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.source.buffer = audiobuffer;

        this.source.onended = function () {
          if (_this3.flv.options.live) {
            _this3.audiobuffers[index] = null;
          }
        };

        this.playing = true;
        this.source.start(0, offset);
        this.playIndex = index + 1;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.playing = false;

        if (this.source) {
          this.source.onended = null;
          this.source.stop();
        }
      }
    }]);

    return AudioDecoder;
  }();

  //
  //  Copyright (c) 2014 Sam Leitch. All rights reserved.
  //
  //  Permission is hereby granted, free of charge, to any person obtaining a copy
  //  of this software and associated documentation files (the "Software"), to
  //  deal in the Software without restriction, including without limitation the
  //  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
  //  sell copies of the Software, and to permit persons to whom the Software is
  //  furnished to do so, subject to the following conditions:
  //
  //  The above copyright notice and this permission notice shall be included in
  //  all copies or substantial portions of the Software.
  //
  //  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  //  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  //  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  //  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  //  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  //  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
  //  IN THE SOFTWARE.
  //

  /**
   * This class can be used to render output pictures from an H264bsdDecoder to a canvas element.
   * If available the content is rendered using WebGL.
   */
  function H264bsdCanvas(canvas, forceNoGL) {
    this.canvasElement = canvas;
    if (!forceNoGL) this.initContextGL();

    if (this.contextGL) {
      this.initProgram();
      this.initBuffers();
      this.initTextures();
    }
  }
  /**
   * Returns true if the canvas supports WebGL
   */

  H264bsdCanvas.prototype.isWebGL = function () {
    return this.contextGL;
  };
  /**
   * Create the GL context from the canvas element
   */


  H264bsdCanvas.prototype.initContextGL = function () {
    var canvas = this.canvasElement;
    var gl = null;
    var validContextNames = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
    var nameIndex = 0;

    while (!gl && nameIndex < validContextNames.length) {
      var contextName = validContextNames[nameIndex];

      try {
        gl = canvas.getContext(contextName);
      } catch (e) {
        gl = null;
      }

      if (!gl || typeof gl.getParameter !== "function") {
        gl = null;
      }

      ++nameIndex;
    }

    this.contextGL = gl;
  };
  /**
   * Initialize GL shader program
   */


  H264bsdCanvas.prototype.initProgram = function () {
    var gl = this.contextGL;
    var vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', 'gl_Position = vertexPos;', 'textureCoord = texturePos.xy;', '}'].join('\n');
    var fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'const mat4 YUV2RGB = mat4', '(', '1.1643828125, 0, 1.59602734375, -.87078515625,', '1.1643828125, -.39176171875, -.81296875, .52959375,', '1.1643828125, 2.017234375, 0, -1.081390625,', '0, 0, 0, 1', ');', 'void main(void) {', 'highp float y = texture2D(ySampler,  textureCoord).r;', 'highp float u = texture2D(uSampler,  textureCoord).r;', 'highp float v = texture2D(vSampler,  textureCoord).r;', 'gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;', '}'].join('\n');
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderScript);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.log('Vertex shader failed to compile: ' + gl.getShaderInfoLog(vertexShader));
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderScript);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.log('Fragment shader failed to compile: ' + gl.getShaderInfoLog(fragmentShader));
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log('Program failed to compile: ' + gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);
    this.shaderProgram = program;
  };
  /**
   * Initialize vertex buffers and attach to shader program
   */


  H264bsdCanvas.prototype.initBuffers = function () {
    var gl = this.contextGL;
    var program = this.shaderProgram;
    var vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), gl.STATIC_DRAW);
    var vertexPosRef = gl.getAttribLocation(program, 'vertexPos');
    gl.enableVertexAttribArray(vertexPosRef);
    gl.vertexAttribPointer(vertexPosRef, 2, gl.FLOAT, false, 0, 0);
    var texturePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);
    var texturePosRef = gl.getAttribLocation(program, 'texturePos');
    gl.enableVertexAttribArray(texturePosRef);
    gl.vertexAttribPointer(texturePosRef, 2, gl.FLOAT, false, 0, 0);
    this.texturePosBuffer = texturePosBuffer;
  };
  /**
   * Initialize GL textures and attach to shader program
   */


  H264bsdCanvas.prototype.initTextures = function () {
    var gl = this.contextGL;
    var program = this.shaderProgram;
    var yTextureRef = this.initTexture();
    var ySamplerRef = gl.getUniformLocation(program, 'ySampler');
    gl.uniform1i(ySamplerRef, 0);
    this.yTextureRef = yTextureRef;
    var uTextureRef = this.initTexture();
    var uSamplerRef = gl.getUniformLocation(program, 'uSampler');
    gl.uniform1i(uSamplerRef, 1);
    this.uTextureRef = uTextureRef;
    var vTextureRef = this.initTexture();
    var vSamplerRef = gl.getUniformLocation(program, 'vSampler');
    gl.uniform1i(vSamplerRef, 2);
    this.vTextureRef = vTextureRef;
  };
  /**
   * Create and configure a single texture
   */


  H264bsdCanvas.prototype.initTexture = function () {
    var gl = this.contextGL;
    var textureRef = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textureRef);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return textureRef;
  };
  /**
   * Draw picture data to the canvas.
   * If this object is using WebGL, the data must be an I420 formatted ArrayBuffer,
   * Otherwise, data must be an RGBA formatted ArrayBuffer.
   */


  H264bsdCanvas.prototype.drawFrame = function (frame) {
    var gl = this.contextGL;
    var width = frame.width,
        height = frame.height,
        data = frame.data;
    var croppingParams = null;

    if (gl) {
      this.drawNextOuptutPictureGL(width, height, croppingParams, new Uint8Array(data));
    } else {
      this.drawNextOuptutPictureRGBA(width, height, croppingParams, new Uint8Array(data));
    }
  };
  /**
   * Draw the next output picture using WebGL
   */


  H264bsdCanvas.prototype.drawNextOuptutPictureGL = function (width, height, croppingParams, data) {
    var gl = this.contextGL;
    var texturePosBuffer = this.texturePosBuffer;
    var yTextureRef = this.yTextureRef;
    var uTextureRef = this.uTextureRef;
    var vTextureRef = this.vTextureRef;

    if (croppingParams === null) {
      gl.viewport(0, 0, width, height);
    } else {
      gl.viewport(0, 0, croppingParams.width, croppingParams.height);
      var tTop = croppingParams.top / height;
      var tLeft = croppingParams.left / width;
      var tBottom = croppingParams.height / height;
      var tRight = croppingParams.width / width;
      var texturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);
      gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);
    }

    var i420Data = data;
    var yDataLength = width * height;
    var yData = i420Data.subarray(0, yDataLength);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, yData);
    var cbDataLength = width / 2 * height / 2;
    var cbData = i420Data.subarray(yDataLength, yDataLength + cbDataLength);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width / 2, height / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, cbData);
    var crDataLength = cbDataLength;
    var crData = i420Data.subarray(yDataLength + cbDataLength, yDataLength + cbDataLength + crDataLength);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width / 2, height / 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, crData);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  /**
   * Draw next output picture using ARGB data on a 2d canvas.
   */


  H264bsdCanvas.prototype.drawNextOuptutPictureRGBA = function (width, height, croppingParams, data) {
    var canvas = this.canvasElement;
    var croppingParams = null;
    var argbData = data;
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, width, height);
    imageData.data.set(argbData);

    if (croppingParams === null) {
      ctx.putImageData(imageData, 0, 0);
    } else {
      ctx.putImageData(imageData, -croppingParams.left, -croppingParams.top, 0, 0, croppingParams.width, croppingParams.height);
    }
  };

  var workerString = "var wasmBinaryFileBase64=\"data:application/octet-stream;base64,AGFzbQEAAAABYA1gAAF/YAF/AGADf39/AX9gAX8Bf2ACf38AYAR/f39/AX9gBn9/f39/fwBgBH9/f38AYAJ/fwF/YAZ/f39/f38Bf2AIf39/f39/f38Bf2ADf39/AGAJf39/f39/f39/AAK7AQkDZW52DkRZTkFNSUNUT1BfUFRSA38AA2VudghTVEFDS1RPUAN/AANlbnYGbWVtb3J5AgCAAgNlbnYFdGFibGUBcAEAAANlbnYNZW5sYXJnZU1lbW9yeQAAA2Vudg5nZXRUb3RhbE1lbW9yeQAAA2VudhdhYm9ydE9uQ2Fubm90R3Jvd01lbW9yeQAAA2VudgtfX19zZXRFcnJObwABA2VudhZfZW1zY3JpcHRlbl9tZW1jcHlfYmlnAAIDKikIAgELAwwIDAUFBwcDAgIEAwYMBwYBAggMDAwMBAoHAAUJAQABCQUIBAYLAn8BIwALfwEjAQsHgwEIG19lbXNjcmlwdGVuX2dldF9nbG9iYWxfbGliYwAkBV9mcmVlAAcNX2gyNjRic2RBbGxvYwAoDl9oMjY0YnNkRGVjb2RlACoMX2gyNjRic2RGcmVlACcMX2gyNjRic2RJbml0ACwQX2gyNjRic2RTaHV0ZG93bgApB19tYWxsb2MACQkBAAr3+AYpqQsBCn8gAEEEaiIIKAIAIQICQAJAIABBDGoiCygCAEEDdCIGIABBEGoiBygCACIJayIEQR9KBEAgAi0AAUEQdCACLQAAQRh0ciACLQACQQh0ciACLQADciEDIAAoAggiBAR/IAMgBHQgAi0ABEEIIARrdnIFIAMLIQIFIARBAEoEQCACIgMtAAAgACgCCCIFQRhqIgp0IQIgBUF4aiAEaiIFQQBKBEAgAiEEIAUhAgNAIANBAWoiAy0AACAKQXhqIgp0IARyIQQgAkF4aiEFIAJBCEoEQCAFIQIMAQUgBCECCwsLBUEAIQIMAgsLIAJBAEgEQCAHIAlBAWoiAjYCACAAIAJBB3E2AgggAiAGTQRAIAggACgCACACQQN2ajYCAAsgAUEANgIAQQAPCyACQf////8DSwRAIAcgCUEDaiIDNgIAIAAgA0EHcTYCCCADIAZLBEBBAQ8LIAggACgCACADQQN2ajYCACABIAJBHXZBAXFBAWo2AgBBAA8LIAJB/////wFLBEAgByAJQQVqIgM2AgAgACADQQdxNgIIIAMgBksEQEEBDwsgCCAAKAIAIANBA3ZqNgIAIAEgAkEbdkEDcUEDajYCAEEADwsgAkH/////AEsEQCAHIAlBB2oiAzYCACAAIANBB3E2AgggAyAGSwRAQQEPCyAIIAAoAgAgA0EDdmo2AgAgASACQRl2QQdxQQdqNgIAQQAPCwJAIAJBgICAwABxBEBBACECBSACQYCAgCBxBEBBASECBSACQYCAgBBxBEBBAiECBSACQYCAgAhxBEBBAyECBSACQYCAgARxBEBBBCECBSACQYCAgAJxBEBBBSECBSACQYCAgAFxBEBBBiECBSACQYCAwABxBEBBByECBSACQYCAIHEEQEEIIQIFIAJBgIAQcQRAQQkhAgUgAkGAgAhxBEBBCiECBSACQYCABHEEQEELIQIFIAJBgIACcQRAQQwhAgUgAkGAgAFxBEBBDSECDA4LIAJBgMAAcQRAQQ4hAgwOCyACQYAgcQRAQQ8hAgwOCyACQYAQcQRAQRAhAgwOCyACQYAIcQRAQREhAgwOCyACQYAEcQRAQRIhAgwOCyACQYACcQRAQRMhAgwOCyACQYABcQRAQRQhAgwOCyACQcAAcQRAQRUhAgwOCyACQSBxBEBBFiECDA4LIAJBEHEEQEEXIQIMDgsgAkEIcQRAQRghAgwOCyACQQRxBEBBGSECDA4LIAJBAnFFDQ5BGiECCwsLCwsLCwsLCwsLCwsgAkEEaiEDDAELQRwgAkEBcWsiAkEEaiIDQSBGBEAgAUEANgIAIAcgBygCAEEgaiICNgIAIABBCGoiBiACQQdxNgIAIAIgCygCAEEDdE0EQCAIIAAoAgAgAkEDdmo2AgALIABBARALQQFHBEBBAQ8LIAgoAgAhAiALKAIAQQN0IgkgBygCACILayIEQR9KBEAgAi0AAUEQdCACLQAAQRh0ciACLQACQQh0ciACLQADciEDIAYoAgAiBAR/IAMgBHQgAi0ABEEIIARrdnIFIAMLIQIFIARBAEoEQCACIgMtAAAgBigCACIFQRhqIgp0IQIgBUF4aiAEaiIFQQBKBEAgAiEEIAUhAgNAIANBAWoiAy0AACAKQXhqIgp0IARyIQQgAkF4aiEFIAJBCEoEQCAFIQIMAQUgBCECCwsLBUEAIQILCyAHIAtBIGoiAzYCACAGIANBB3E2AgAgAyAJSwRAQQEPCyAIIAAoAgAgA0EDdmo2AgACQAJAAkAgAg4CAAECCyABQX82AgBBAA8LIAFBfzYCAEEBDwtBAQ8LCyAHIAkgAkEFamoiBDYCACAAIARBB3E2AgggBCAGTQRAIAggACgCACAEQQN2ajYCAAsgACADEAsiAEF/RgRAQQEPCyABQRAgAnRBf2ogAGo2AgBBAAuaAgEEfyAAIAJqIQQgAUH/AXEhASACQcMATgRAA0AgAEEDcQRAIAAgAToAACAAQQFqIQAMAQsLIARBfHEiBUHAAGshBiABIAFBCHRyIAFBEHRyIAFBGHRyIQMDQCAAIAZMBEAgACADNgIAIAAgAzYCBCAAIAM2AgggACADNgIMIAAgAzYCECAAIAM2AhQgACADNgIYIAAgAzYCHCAAIAM2AiAgACADNgIkIAAgAzYCKCAAIAM2AiwgACADNgIwIAAgAzYCNCAAIAM2AjggACADNgI8IABBwABqIQAMAQsLA0AgACAFSARAIAAgAzYCACAAQQRqIQAMAQsLCwNAIAAgBEgEQCAAIAE6AAAgAEEBaiEADAELCyAEIAJrC74OAQh/IABFBEAPC0GYwQAoAgAhBCAAQXhqIgEgAEF8aigCACIAQXhxIgJqIQUCfyAAQQFxBH8gASEDIAIFIAEoAgAhAyAAQQNxRQRADwsgAUEAIANraiIAIARJBEAPCyADIAJqIQIgAEGcwQAoAgBGBEAgBUEEaiIBKAIAIgNBA3FBA0cEQCAAIQMgACEBIAIMAwtBkMEAIAI2AgAgASADQX5xNgIAIAAgAkEBcjYCBCAAIAJqIAI2AgAPCyADQQN2IQQgA0GAAkkEQCAAKAIMIgEgACgCCCIDRgRAQYjBAEGIwQAoAgBBASAEdEF/c3E2AgAgACEDIAAhASACDAMFIAMgATYCDCABIAM2AgggACEDIAAhASACDAMLAAsgACgCGCEHAkAgACgCDCIBIABGBEAgAEEQaiIDQQRqIgQoAgAiAQRAIAQhAwUgAygCACIBRQRAQQAhAQwDCwsDQCABQRRqIgQoAgAiBgRAIAYhASAEIQMMAQsgAUEQaiIEKAIAIgYEQCAGIQEgBCEDDAELCyADQQA2AgAFIAAoAggiAyABNgIMIAEgAzYCCAsLIAcEfyAAIAAoAhwiA0ECdEG4wwBqIgQoAgBGBEAgBCABNgIAIAFFBEBBjMEAQYzBACgCAEEBIAN0QX9zcTYCACAAIQMgACEBIAIMBAsFIAdBEGogBygCECAAR0ECdGogATYCACABRQRAIAAhAyAAIQEgAgwECwsgASAHNgIYIABBEGoiBCgCACIDBEAgASADNgIQIAMgATYCGAsgBCgCBCIDBH8gASADNgIUIAMgATYCGCAAIQMgACEBIAIFIAAhAyAAIQEgAgsFIAAhAyAAIQEgAgsLCyEAIAMgBU8EQA8LIAVBBGoiBCgCACICQQFxRQRADwsgAkECcQRAIAQgAkF+cTYCACABIABBAXI2AgQgAyAAaiAANgIAIAAhAwVBnMEAKAIAIQQgBUGgwQAoAgBGBEBBlMEAQZTBACgCACAAaiIANgIAQaDBACABNgIAIAEgAEEBcjYCBCABIARHBEAPC0GcwQBBADYCAEGQwQBBADYCAA8LIAUgBEYEQEGQwQBBkMEAKAIAIABqIgA2AgBBnMEAIAM2AgAgASAAQQFyNgIEIAMgAGogADYCAA8LIAJBeHEgAGohByACQQN2IQQCQCACQYACSQRAIAUoAgwiACAFKAIIIgJGBEBBiMEAQYjBACgCAEEBIAR0QX9zcTYCAAUgAiAANgIMIAAgAjYCCAsFIAUoAhghCAJAIAUoAgwiACAFRgRAIAVBEGoiAkEEaiIEKAIAIgAEQCAEIQIFIAIoAgAiAEUEQEEAIQAMAwsLA0AgAEEUaiIEKAIAIgYEQCAGIQAgBCECDAELIABBEGoiBCgCACIGBEAgBiEAIAQhAgwBCwsgAkEANgIABSAFKAIIIgIgADYCDCAAIAI2AggLCyAIBEAgBSAFKAIcIgJBAnRBuMMAaiIEKAIARgRAIAQgADYCACAARQRAQYzBAEGMwQAoAgBBASACdEF/c3E2AgAMBAsFIAhBEGogCCgCECAFR0ECdGogADYCACAARQ0DCyAAIAg2AhggBUEQaiIEKAIAIgIEQCAAIAI2AhAgAiAANgIYCyAEKAIEIgIEQCAAIAI2AhQgAiAANgIYCwsLCyABIAdBAXI2AgQgAyAHaiAHNgIAIAFBnMEAKAIARgRAQZDBACAHNgIADwUgByEDCwsgA0EDdiECIANBgAJJBEAgAkEDdEGwwQBqIQBBiMEAKAIAIgNBASACdCICcQR/IABBCGoiAyECIAMoAgAFQYjBACADIAJyNgIAIABBCGohAiAACyEDIAIgATYCACADIAE2AgwgASADNgIIIAEgADYCDA8LIANBCHYiAAR/IANB////B0sEf0EfBSADQQ4gACAAQYD+P2pBEHZBCHEiAHQiAkGA4B9qQRB2QQRxIgQgAHIgAiAEdCIAQYCAD2pBEHZBAnEiAnJrIAAgAnRBD3ZqIgBBB2p2QQFxIABBAXRyCwVBAAsiAkECdEG4wwBqIQAgASACNgIcIAFBADYCFCABQQA2AhACQEGMwQAoAgAiBEEBIAJ0IgZxBEAgACgCACEAQRkgAkEBdmshBCADIAJBH0YEf0EABSAEC3QhAgJAA0AgACgCBEF4cSADRg0BIAJBAXQhBCAAQRBqIAJBH3ZBAnRqIgIoAgAiBgRAIAQhAiAGIQAMAQsLIAIgATYCACABIAA2AhggASABNgIMIAEgATYCCAwCCyAAQQhqIgMoAgAiAiABNgIMIAMgATYCACABIAI2AgggASAANgIMIAFBADYCGAVBjMEAIAQgBnI2AgAgACABNgIAIAEgADYCGCABIAE2AgwgASABNgIICwtBqMEAQajBACgCAEF/aiIANgIAIAAEQA8FQdDEACEACwNAIAAoAgAiAUEIaiEAIAENAAtBqMEAQX82AgAL5gQBBn8gASgCACIGQf///wdGBEAPCyACQQNxIQQgAkEQSSIFBH8gAgUgBAshAyABKAIEIQcgACAFBH9BEAVBCAsiCCAFBH8gAgUgBAtBAnRBwBhqKAIAbGogA0ECdEGAGGooAgBqIgBBAWoiAi0AACEDIAAgAC0AACAGakG+OWosAAA6AAAgASgCCCEEIABBAmoiBS0AACEGIAIgAyAHakG+OWosAAA6AAAgAEEDaiICLQAAIAEoAgxqQb45aiwAACEDIAUgBiAEakG+OWosAAA6AAAgAiADOgAAIAEoAhQhAiAAIAhqIgBBAWoiAy0AACEEIAAgAC0AACABKAIQakG+OWosAAA6AAAgASgCGCEFIABBAmoiBi0AACEHIAMgBCACakG+OWosAAA6AAAgAEEDaiICLQAAIAEoAhxqQb45aiwAACEDIAYgByAFakG+OWosAAA6AAAgAiADOgAAIAEoAiQhAiAAIAhqIgBBAWoiAy0AACEEIAAgAC0AACABKAIgakG+OWosAAA6AAAgASgCKCEFIABBAmoiBi0AACEHIAMgBCACakG+OWosAAA6AAAgAEEDaiICLQAAIAEoAixqQb45aiwAACEDIAYgByAFakG+OWosAAA6AAAgAiADOgAAIAEoAjQhAiAAIAhqIgBBAWoiAy0AACEIIAAgAC0AACABKAIwakG+OWosAAA6AAAgASgCOCEEIABBAmoiBS0AACEGIAMgCCACakG+OWosAAA6AAAgAEEDaiIALQAAIAEoAjxqQb45aiwAACEBIAUgBiAEakG+OWosAAA6AAAgACABOgAAC/wyAQx/IwMhCiMDQRBqJAMgCiEIAkAgAEH1AUkEQCAAQQtqQXhxIQJBiMEAKAIAIgYgAEELSQR/QRAiAgUgAgtBA3YiAHYiAUEDcQRAIAFBAXFBAXMgAGoiAUEDdEGwwQBqIgJBCGoiBSgCACIDQQhqIgQoAgAhACACIABGBEBBiMEAIAZBASABdEF/c3E2AgAFIAAgAjYCDCAFIAA2AgALIAMgAUEDdCIAQQNyNgIEIAMgAGpBBGoiACAAKAIAQQFyNgIAIAokAyAEDwsgAkGQwQAoAgAiCUsEQCABBEAgASAAdEECIAB0IgBBACAAa3JxIgBBACAAa3FBf2oiAUEMdkEQcSEAIAEgAHYiAUEFdkEIcSIDIAByIAEgA3YiAEECdkEEcSIBciAAIAF2IgBBAXZBAnEiAXIgACABdiIAQQF2QQFxIgFyIAAgAXZqIgFBA3RBsMEAaiIDQQhqIgQoAgAiBUEIaiIHKAIAIQAgAyAARgRAQYjBACAGQQEgAXRBf3NxIgA2AgAFIAAgAzYCDCAEIAA2AgAgBiEACyAFIAJBA3I2AgQgBSACaiIFIAFBA3QgAmsiA0EBcjYCBCAFIANqIAM2AgAgCQRAQZzBACgCACECIAlBA3YiBEEDdEGwwQBqIQEgAEEBIAR0IgRxBH8gAUEIaiIAIQQgACgCAAVBiMEAIAAgBHI2AgAgAUEIaiEEIAELIQAgBCACNgIAIAAgAjYCDCACIAA2AgggAiABNgIMC0GQwQAgAzYCAEGcwQAgBTYCACAKJAMgBw8LQYzBACgCACILBEAgC0EAIAtrcUF/aiIBQQx2QRBxIQAgASAAdiIBQQV2QQhxIgMgAHIgASADdiIAQQJ2QQRxIgFyIAAgAXYiAEEBdkECcSIBciAAIAF2IgBBAXZBAXEiAXIgACABdmpBAnRBuMMAaigCACIDKAIEQXhxIAJrIQEgA0EQaiADKAIQRUECdGooAgAiAARAA0AgACgCBEF4cSACayIFIAFJIgQEQCAFIQELIAQEQCAAIQMLIABBEGogACgCEEVBAnRqKAIAIgANACABIQULBSABIQULIAMgAyACaiIMSQRAIAMoAhghCAJAIAMoAgwiACADRgRAIANBFGoiASgCACIARQRAIANBEGoiASgCACIARQRAQQAhAAwDCwsDQCAAQRRqIgQoAgAiBwRAIAchACAEIQEMAQsgAEEQaiIEKAIAIgcEQCAHIQAgBCEBDAELCyABQQA2AgAFIAMoAggiASAANgIMIAAgATYCCAsLAkAgCARAIAMgAygCHCIBQQJ0QbjDAGoiBCgCAEYEQCAEIAA2AgAgAEUEQEGMwQAgC0EBIAF0QX9zcTYCAAwDCwUgCEEQaiAIKAIQIANHQQJ0aiAANgIAIABFDQILIAAgCDYCGCADKAIQIgEEQCAAIAE2AhAgASAANgIYCyADKAIUIgEEQCAAIAE2AhQgASAANgIYCwsLIAVBEEkEQCADIAUgAmoiAEEDcjYCBCADIABqQQRqIgAgACgCAEEBcjYCAAUgAyACQQNyNgIEIAwgBUEBcjYCBCAMIAVqIAU2AgAgCQRAQZzBACgCACECIAlBA3YiAUEDdEGwwQBqIQBBASABdCIBIAZxBH8gAEEIaiIBIQQgASgCAAVBiMEAIAEgBnI2AgAgAEEIaiEEIAALIQEgBCACNgIAIAEgAjYCDCACIAE2AgggAiAANgIMC0GQwQAgBTYCAEGcwQAgDDYCAAsgCiQDIANBCGoPBSACIQALBSACIQALBSACIQALBSAAQb9/SwRAQX8hAAUgAEELaiIAQXhxIQNBjMEAKAIAIgUEQCAAQQh2IgAEfyADQf///wdLBH9BHwUgA0EOIAAgAEGA/j9qQRB2QQhxIgB0IgFBgOAfakEQdkEEcSICIAByIAEgAnQiAEGAgA9qQRB2QQJxIgFyayAAIAF0QQ92aiIAQQdqdkEBcSAAQQF0cgsFQQALIQlBACADayEBAkACQCAJQQJ0QbjDAGooAgAiAARAQRkgCUEBdmshAkEAIQQgAyAJQR9GBH9BAAUgAgt0IQdBACECA0AgACgCBEF4cSADayIGIAFJBEAgBgRAIAYhASAAIQIFQQAhAiAAIQEMBAsLIAAoAhQiC0UgCyAAQRBqIAdBH3ZBAnRqKAIAIgZGcgR/IAQFIAsLIQAgByAGRSIEQQFzdCEHIARFBEAgACEEIAYhAAwBCwsFQQAhAEEAIQILIAAgAnIEfyAAIQQgAgVBAiAJdCIAQQAgAGtyIAVxIgBFBEAgAyEADAcLIABBACAAa3FBf2oiAkEMdkEQcSEAIAIgAHYiAkEFdkEIcSIEIAByIAIgBHYiAEECdkEEcSICciAAIAJ2IgBBAXZBAnEiAnIgACACdiIAQQF2QQFxIgJyIAAgAnZqQQJ0QbjDAGooAgAhBEEACyEAIAQEQCABIQIgBCEBDAEFIAEhBCAAIQILDAELA0AgASgCBEF4cSADayIEIAJJIgcEQCAEIQILIAcEQCABIQALIAFBEGogASgCEEVBAnRqKAIAIgENACACIQQgACECCwsgAgRAIARBkMEAKAIAIANrSQRAIAIgAiADaiIITwRAIAokA0EADwsgAigCGCEJAkAgAigCDCIAIAJGBEAgAkEUaiIBKAIAIgBFBEAgAkEQaiIBKAIAIgBFBEBBACEADAMLCwNAIABBFGoiBygCACIGBEAgBiEAIAchAQwBCyAAQRBqIgcoAgAiBgRAIAYhACAHIQEMAQsLIAFBADYCAAUgAigCCCIBIAA2AgwgACABNgIICwsCQCAJBH8gAiACKAIcIgFBAnRBuMMAaiIHKAIARgRAIAcgADYCACAARQRAQYzBACAFQQEgAXRBf3NxIgA2AgAMAwsFIAlBEGogCSgCECACR0ECdGogADYCACAARQRAIAUhAAwDCwsgACAJNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAIoAhQiAQR/IAAgATYCFCABIAA2AhggBQUgBQsFIAULIQALAkAgBEEQSQRAIAIgBCADaiIAQQNyNgIEIAIgAGpBBGoiACAAKAIAQQFyNgIABSACIANBA3I2AgQgCCAEQQFyNgIEIAggBGogBDYCACAEQQN2IQEgBEGAAkkEQCABQQN0QbDBAGohAEGIwQAoAgAiA0EBIAF0IgFxBH8gAEEIaiIBIQMgASgCAAVBiMEAIAMgAXI2AgAgAEEIaiEDIAALIQEgAyAINgIAIAEgCDYCDCAIIAE2AgggCCAANgIMDAILIARBCHYiAQR/IARB////B0sEf0EfBSAEQQ4gASABQYD+P2pBEHZBCHEiAXQiA0GA4B9qQRB2QQRxIgUgAXIgAyAFdCIBQYCAD2pBEHZBAnEiA3JrIAEgA3RBD3ZqIgFBB2p2QQFxIAFBAXRyCwVBAAsiAUECdEG4wwBqIQMgCCABNgIcIAhBEGoiBUEANgIEIAVBADYCAEEBIAF0IgUgAHFFBEBBjMEAIAUgAHI2AgAgAyAINgIAIAggAzYCGCAIIAg2AgwgCCAINgIIDAILIAMoAgAhAEEZIAFBAXZrIQMgBCABQR9GBH9BAAUgAwt0IQECQANAIAAoAgRBeHEgBEYNASABQQF0IQMgAEEQaiABQR92QQJ0aiIBKAIAIgUEQCADIQEgBSEADAELCyABIAg2AgAgCCAANgIYIAggCDYCDCAIIAg2AggMAgsgAEEIaiIBKAIAIgMgCDYCDCABIAg2AgAgCCADNgIIIAggADYCDCAIQQA2AhgLCyAKJAMgAkEIag8FIAMhAAsFIAMhAAsFIAMhAAsLCwtBkMEAKAIAIgMgAE8EQEGcwQAoAgAhASADIABrIgJBD0sEQEGcwQAgASAAaiIDNgIAQZDBACACNgIAIAMgAkEBcjYCBCADIAJqIAI2AgAgASAAQQNyNgIEBUGQwQBBADYCAEGcwQBBADYCACABIANBA3I2AgQgASADakEEaiIAIAAoAgBBAXI2AgALIAokAyABQQhqDwtBlMEAKAIAIgIgAEsEQEGUwQAgAiAAayICNgIAQaDBAEGgwQAoAgAiASAAaiIDNgIAIAMgAkEBcjYCBCABIABBA3I2AgQgCiQDIAFBCGoPC0HgxAAoAgAEf0HoxAAoAgAFQejEAEGAIDYCAEHkxABBgCA2AgBB7MQAQX82AgBB8MQAQX82AgBB9MQAQQA2AgBBxMQAQQA2AgAgCCAIQXBxQdiq1aoFcyIBNgIAQeDEACABNgIAQYAgCyIBIABBL2oiBGoiB0EAIAFrIgZxIgUgAE0EQCAKJANBAA8LQcDEACgCACIBBEBBuMQAKAIAIgMgBWoiCCADTSAIIAFLcgRAIAokA0EADwsLIABBMGohCAJAAkBBxMQAKAIAQQRxBEBBACECBQJAAkACQEGgwQAoAgAiAUUNAEHIxAAhAwNAAkAgAygCACIJIAFNBEAgCSADQQRqIgkoAgBqIAFLDQELIAMoAggiAw0BDAILCyAHIAJrIAZxIgJB/////wdJBEAgAhARIgEgAygCACAJKAIAakYEQCABQX9HDQYFDAMLBUEAIQILDAILQQAQESIBQX9GBEBBACECBUHkxAAoAgAiA0F/aiIHIAEiAmpBACADa3EgAmshAyAHIAJxBH8gAwVBAAsgBWoiAkG4xAAoAgAiB2ohAyACIABLIAJB/////wdJcQRAQcDEACgCACIGBEAgAyAHTSADIAZLcgRAQQAhAgwFCwsgAhARIgMgAUYNBSADIQEMAgVBACECCwsMAQsgCCACSyACQf////8HSSABQX9HcXFFBEAgAUF/RgRAQQAhAgwCBQwECwALIAQgAmtB6MQAKAIAIgNqQQAgA2txIgNB/////wdPDQJBACACayEEIAMQEUF/RgRAIAQQERpBACECBSADIAJqIQIMAwsLQcTEAEHExAAoAgBBBHI2AgALIAVB/////wdJBEAgBRARIgFBABARIgNJIAFBf0cgA0F/R3FxIQUgAyABayIDIABBKGpLIgQEQCADIQILIAFBf0YgBEEBc3IgBUEBc3JFDQELDAELQbjEAEG4xAAoAgAgAmoiAzYCACADQbzEACgCAEsEQEG8xAAgAzYCAAsCQEGgwQAoAgAiBARAQcjEACEDAkACQANAIAEgAygCACIFIANBBGoiBygCACIGakYNASADKAIIIgMNAAsMAQsgAygCDEEIcUUEQCAEIAFJIAQgBU9xBEAgByAGIAJqNgIAQZTBACgCACEFQQAgBEEIaiIDa0EHcSEBQaDBACAEIANBB3EEfyABBUEAIgELaiIDNgIAQZTBACAFIAIgAWtqIgE2AgAgAyABQQFyNgIEIAMgAWpBKDYCBEGkwQBB8MQAKAIANgIADAQLCwsgAUGYwQAoAgBJBEBBmMEAIAE2AgALIAEgAmohBUHIxAAhAwJAAkADQCADKAIAIAVGDQEgAygCCCIDDQALDAELIAMoAgxBCHFFBEAgAyABNgIAIANBBGoiAyADKAIAIAJqNgIAQQAgAUEIaiICa0EHcSEDQQAgBUEIaiIHa0EHcSEJIAEgAkEHcQR/IAMFQQALaiIIIABqIQYgBSAHQQdxBH8gCQVBAAtqIgUgCGsgAGshByAIIABBA3I2AgQCQCAFIARGBEBBlMEAQZTBACgCACAHaiIANgIAQaDBACAGNgIA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QRhqIARBBBAGGiAJQRxqIAFBBBAGGgwDCyARBEBBASEaQZcBIQMMBAsgAyAHLAAAQQgQBhogA0EIaiAHLAABQQgQBhogA0EQaiAHLAACQQgQBhogA0EYaiAHLAADQQgQBhogA0EgaiAHLAAEQQgQBhogA0EoaiAHLAAFQQgQBhogA0EwaiAHLAAGQQgQBhogA0E4aiAHLAAHQQgQBhoMAgsgEwRAQQEhGkGXASEDDAMLIAMgBiwAASIBOgAAIAMgAToACCADIAE6ABAgAyABOgAYIAMgAToAICADIAE6ACggAyABOgAwIAMgAToAOCADIAYsAAIiAToAASADIAE6AAkgAyABOgARIAMgAToAGSADIAE6ACEgAyABOgApIAMgAToAMSADIAE6ADkgAyAGLAADIgE6AAIgAyABOgAKIAMgAToAEiADIAE6ABogAyABOgAiIAMgAToAKiADIAE6ADIgAyABOgA6IAMgBiwABCIBOgADIAMgAToACyADIAE6ABMgAyABOgAbIAMgAToAIyADIAE6ACsgAyABOgAzIAMgAToAOyADIAYsAAUiAToABCADIAE6AAwgAyABOgAUIAMgAToAHCADIAE6ACQgAyABOgAsIAMgAToANCADIAE6ADwgAyAGLAAGIgE6AAUgAyABOgANIAMgAToAFSADIAE6AB0gAyABOgAlIAMgAToALSADIAE6ADUgAyABOgA9IAMgBiwAByIBOgAGIAMgAToADiADIAE6ABYgAyABOgAeIAMgAToAJiADIAE6AC4gAyABOgA2IAMgAToAPiADIAYsAAgiAToAByADIAE6AA8gAyABOgAXIAMgAToAHyADIAE6ACcgAyABOgAvIAMgAToANyADIAE6AD8MAQsgESATciAdcgRAQQEhGkGXASEDDAILIAYtAAUgBi0AA2sgBi0ABiAGLQACa0EBdGogBi0AByAGLQABa0EDbGogBi0ACCIBIAYtAAAiBGtBAnRqQRFsQRBqQQV1IRAgBy0ABCAHLQACayAHLQAFIActAAFrQQF0aiAHLQAGIActAABrQQNsaiAHLQAHIgwgBGtBAnRqQRFsQRBqQQV1IRYgEEF9bCEgQQchBCAMIAFqQQR0QRBqIBZBfWxqIQwgAyEBA0AgASAMICBqIg5BBXVBvjlqLAAAOgAAIAEgDiAQaiIOQQV1Qb45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AUgEfyAWBSAPC0EDSw0BGiBfICprIRYgKiBfayEPIH4glAFIBH8gFgUgDwtBA0sLCyIWNgIAID0CfyCWASCVAXJB//8DcQR/QQIFICkgLmshDyAuIClrIQ1BASB/IH1IBH8gDwUgDQtBA0sNARogKiAvayEPIC8gKmshDUEBIIABIH5IBH8gDwUgDQtBA0sNARogAigCgAEgAigCfEcLCyIPNgIAIDwCfyClASCWAXJB//8DcQR/QQIFIC4gYGshDSBgIC5rIRtBASCXASB/SAR/IA0FIBsLQQNLDQEaIC8gYWshDSBhIC9rIRsgmAEggAFIBH8gDQUgGwtBA0sLCyINNgIACwsgKyABciADciAFciAIciAHciAGciAEciAJciAMciAQciAVciAdciASciAKciALciAcciARciAUciAYciAOciATciAWciAPciANckUNAgsgAkEMaiIYKAIAIgcgAkEUaiIOKAIAIghqIgFBAEghAyABQTNOBEBBMyEBCyADBEBBACEBCyACQRBqIhMoAgAiBiAIaiIDQQBIIQUgA0EzTgRAQTMhAwsgggEgAUG6M2otAAAiBDYCACCDASAFBH9BAAUgAwtB7jNqLQAAIgk2AgAghAEgAUEDbEGiNGoiAzYCACCKAUUEQCAiKAIUIgEgCEYEQCBPIAQ2AgAgUCAJNgIAIBkgAzYCAAUgByAIQQFqIAFqQQF2IgVqIgFBAEghDCABQTNOBEBBMyEBCyAMBEBBACEBCyAGIAVqIgVBAEghDCAFQTNOBEBBMyEFCyBPIAFBujNqLQAANgIAIFAgDAR/QQAFIAULQe4zai0AADYCACAZIAFBA2xBojRqNgIACwsgiwFFBEAgISgCFCIBIAhGBEAgTSAENgIAIE4gCTYCACCIASADNgIABSAHIAhBAWogAWpBAXYiA2oiAUEASCEFIAFBM04EQEEzIQELIAUEQEEAIQELIAYgA2oiA0EASCEFIANBM04EQEEzIQMLIE0gAUG6M2otAAA2AgAgTiAFBH9BAAUgAwtB7jNqLQAANgIAIIkBIAFBA2xBojRqNgIACwtBAyEHQQAhBSAAKAIAIJwBIFJsaiBRQQR0aiEBIIUBIQMDQCADIgkoAgQiAwRAIAEgAyCfASgCACCgASgCACChASgCACAoEBkLIAkoAgwiAwRAIAFBBGogAyBq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AAAAAAAAAP8AQaQICxUFAAAAAAAAAAcAAAD/AAAAAAAAAP8AQcQICxUFAAAABAAAAAAAAAD/AAAAAAAAAP8AQeQICwUFAAAABABB9AgLpQEHAAAABAAAAAIAAAAEAAAAAQAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAQAAAABAAAABAAAAAMAAAD/AAAAAAAAAP8AAAAAAAAABAAAAAEAAAAEAAAABAAAAP8AAAAAAAAA/wAAAAAAAAAEAAAAAQAAAAQAAAAEAAAABAAAAAMAAAAEAAAABgAAAAAAAAANAAAA/wAAAAAAAAD/AAAAAAAAAP8AQaQKCxUNAAAAAAAAAA8AAAD/AAAAAAAAAP8AQcQKCxUNAAAABAAAAAgAAAD/AAAAAAAAAP8AQeQKC7ULDQAAAAQAAAAIAAAAAAAAAA8AAAAEAAAACgAAAAQAAAAJAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAAAABAAAAAkAAAAEAAAACwAAAP8AAAAAAAAA/wAAAAAAAAAEAAAACQAAAAQAAAAMAAAA/wAAAAAAAAD/AAAAAAAAAAQAAAAJAAAABAAAAAwAAAAEAAAACwAAAAQAAAAOAAAAAQAAAAoAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAABAAAACgAAAAQAAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAEAAAAKAAAAAQAAAAsAAAD/AAAAAAAAAP8AAAAAAAAAAQAAAAoAAAABAAAACwAAAAQAAAAAAAAABAAAAAEAAAABAAAADgAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAEAAAAOAAAABAAAAAQAAAD/AAAAAAAAAP8AAAAAAAAAAQAAAA4AAAABAAAADwAAAP8AAAAAAAAA/wAAAAAAAAABAAAADgAAAAEAAAAPAAAABAAAAAQAAAAEAAAABQAAAAQAAAACAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAAAABAAAAAIAAAAEAAAACAAAAP8AAAAAAAAA/wAAAAAAAAAEAAAAAgAAAAQAAAADAAAA/wAAAAAAAAD/AAAAAAAAAAQAAAACAAAABAAAAAMAAAAEAAAACAAAAAQAAAAJAAAABAAAAAYAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAEAAAABgAAAAQAAAAMAAAA/wAAAAAAAAD/AAAAAAAAAAQAAAAGAAAABAAAAAcAAAD/AAAAAAAAAP8AAAAAAAAABAAAAAYAAAAEAAAABwAAAAQAAAAMAAAABAAAAA0AAAABAAAADgAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAEAAAAOAAAA/wAAAAQAAAD/AAAAAAAAAP8AAAAAAAAAAQAAAAsAAAABAAAADgAAAP8AAAAAAAAA/wAAAAAAAAABAAAACwAAAAEAAAAOAAAABAAAAAEAAAD/AAAABAAAAAIAAAAKAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAgAAAAoAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAABAAAADwAAAAIAAAAKAAAA/wAAAAAAAAD/AAAAAAAAAAEAAAAPAAAAAgAAAAoAAAAEAAAABQAAAP8AAAAAAAAABAAAAAYAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAEAAAABgAAAP8AAAAMAAAA/wAAAAAAAAD/AAAAAAAAAAQAAAADAAAABAAAAAYAAAD/AAAAAAAAAP8AAAAAAAAABAAAAAMAAAAEAAAABgAAAAQAAAAJAAAA/wAAAAwAAAD/AAAAAgAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAACAAAA/wAAAAgAAAD/AAAAAAAAAP8AAAAAAAAABAAAAAcAAAD/AAAAAgAAAP8AAAAAAAAA/wAAAAAAAAAEAAAABwAAAP8AAAACAAAABAAAAA0AAAD/AAAACAAAAAMAAAAPAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAwAAAA8AAAAAAAAABQAAAP8AAAAAAAAA/wAAAAAAAAADAAAADwAAAAEAAAAKAAAA/wAAAAAAAAD/AAAAAAAAAAMAAAAPAAAAAQAAAAoAAAAAAAAABQAAAAQAAAAAAAAAAQAAAAsAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAABAAAACwAAAAQAAAABAAAA/wAAAAAAAAD/AAAAAAAAAAEAAAALAAAAAQAAAA4AAAD/AAAAAAAAAP8AAAAAAAAAAQAAAAsAAAABAAAADgAAAAQAAAABAAAABAAAAAQAAAAAAAAABwAAAP8AAAAAAAAA/wAAAAAAAAD/AEGkFgsVBwAAAAAAAAANAAAA/wAAAAAAAAD/AEHEFgsVBwAAAAQAAAACAAAA/wAAAAAAAAD/AEHkFgvZAQcAAAAEAAAAAgAAAAAAAAANAAAABAAAAAgAAAAEAAAAAwAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAQAAAADAAAABAAAAAkAAAD/AAAAAAAAAP8AAAAAAAAABAAAAAMAAAAEAAAABgAAAP8AAAAAAAAA/wAAAAAAAAAEAAAAAwAAAAQAAAAGAAAABAAAAAkAAAAEAAAADAAAAAAAAAAEAAAAAAAAAAQAAAAIAAAADAAAAAgAAAAMAAAAAAAAAAQAAAAAAAAABAAAAAgAAAAMAAAACAAAAAwAQcgYCwUEAAAABABB2BgLcQQAAAAEAAAACAAAAAgAAAAMAAAADAAAAAgAAAAIAAAADAAAAAwAAAAAAAAAAQAAAAQAAAAFAAAAAgAAAAMAAAAGAAAABwAAAAgAAAAJAAAADAAAAA0AAAAKAAAACwAAAA4AAAAPAAAAAAAAAAUAAAAEAEHUGQvhCAcAAAAEAAAAAgAAAAQAAAABAAAABAAAAAQAAAAEAAAAAwAAAAQAAAAGAAAAAAAAAA0AAAAEAAAACAAAAAAAAAAPAAAABAAAAAoAAAAEAAAACQAAAAQAAAAMAAAABAAAAAsAAAAEAAAADgAAAAAAAAARAAAABAAAABAAAAAAAAAAEwAAAAQAAAASAAAAAAAAABUAAAAEAAAAFAAAAAAAAAAXAAAABAAAABYAAAABAAAACgAAAAEAAAALAAAABAAAAAAAAAAEAAAAAQAAAAEAAAAOAAAAAQAAAA8AAAAEAAAABAAAAAQAAAAFAAAABAAAAAIAAAAEAAAAAwAAAAQAAAAIAAAABAAAAAkAAAAEAAAABgAAAAQAAAAHAAAABAAAAAwAAAAEAAAADQAAAAEAAAASAAAAAQAAABMAAAAEAAAAEAAAAAQAAAARAAAAAQAAABYAAAABAAAAFwAAAAQAAAAUAAAABAAAABUAAAABAAAACwAAAAEAAAAOAAAABAAAAAEAAAD/AAAABAAAAAEAAAAPAAAAAgAAAAoAAAAEAAAABQAAAP8AAAAAAAAABAAAAAMAAAAEAAAABgAAAAQAAAAJAAAA/wAAAAwAAAAEAAAABwAAAP8AAAACAAAABAAAAA0AAAD/AAAACAAAAAEAAAATAAAAAgAAABIAAAAEAAAAEQAAAP8AAAAQAAAAAQAAABcAAAACAAAAFgAAAAQAAAAVAAAA/wAAABQAAAADAAAADwAAAAEAAAAKAAAAAAAAAAUAAAAEAAAAAAAAAAEAAAALAAAAAQAAAA4AAAAEAAAAAQAAAAQAAAAEAAAAAAAAAAcAAAAEAAAAAgAAAAAAAAANAAAABAAAAAgAAAAEAAAAAwAAAAQAAAAGAAAABAAAAAkAAAAEAAAADAAAAAMAAAATAAAAAQAAABIAAAAAAAAAEQAAAAQAAAAQAAAAAwAAABcAAAABAAAAFgAAAAAAAAAVAAAABAAAABQAAAABAAAAAQAAAAIAAAACAAAAAwAAAAMAAAADAAAAAwAAAAAAAAABAAAAAgAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAKAAAADQAAABAAAAALAAAADgAAABIAAAANAAAAEAAAABQAAAAOAAAAEgAAABcAAAAQAAAAFAAAABkAAAASAAAAFwAAAB0AAAAAAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAdAAAAHgAAAB8AAAAgAAAAIAAAACEAAAAiAAAAIgAAACMAAAAjAAAAJAAAACQAAAAlAAAAJQAAACUAAAAmAAAAJgAAACYAAAAnAAAAJwAAACcAAAAnAEH0IwsCoCIAQbIkCzpmICYQBghlGGUYQxBDEEMQQxBDEEMQQxBDECIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIAEH0JAuIAmpASjAqKAogaThpOEkoSSgpICkgCRgJGGgwaDBoMGgwSCBIIEggSCAoGCgYKBgoGAgQCBAIEAgQZyhnKGcoZyhnKGcoZyhnKEcYRxhHGEcYRxhHGEcYRxhuYE5YLlAOUG5YTlAuSA5IDUANQE1ITUgtQC1ADTgNOG1QbVBNQE1ALTgtOA0wDTBrSGtIa0hrSGtIa0hrSGtISzhLOEs4SzhLOEs4SzhLOCswKzArMCswKzArMCswKzALKAsoCygLKAsoCygLKAsoAAAAAC9oL2gQgFCAMIAQeHCAUHgweBBwcHhQcDBwEGhvcG9wT2hPaC9gL2APYA9gb2hvaE9gT2AvWC9YD1gPWABBhCcLOGY4RiAmIAYQZjBGGCYYBghlKGUoJRAlEGQgZCBkIGQgZBhkGGQYZBhDEEMQQxBDEEMQQxBDEEMQAEHEJwu4AmlISTgpOAkwCCgIKEgwSDAoMCgwCCAIIGdAZ0BnQGdARyhHKEcoRygnKCcoJygnKAcYBxgHGAcYAAAAAG14bXhugE6ALoAOgC54DnhOeC5wTXBNcA1wDXBtcG1wTWhNaC1oLWgNaA1obWhtaE1gTWAtYC1gDWANYAxYDFgMWAxYTFhMWExYTFgsWCxYLFgsWAxQDFAMUAxQbGBsYGxgbGBMUExQTFBMUCxQLFAsUCxQDEgMSAxIDEhrWGtYa1hrWGtYa1hrWGtYS0hLSEtIS0hLSEtIS0hLSCtIK0grSCtIK0grSCtIK0gLQAtAC0ALQAtAC0ALQAtAa1BrUGtQa1BrUGtQa1BrUEtAS0BLQEtAS0BLQEtAS0ArQCtAK0ArQCtAK0ArQCtACzgLOAs4CzgLOAs4CzgLOABBjCoLrgkGGEY4JjgGEGZIRjAmMAYIJSglKEUoRSglICUgRSBFICUYJRhlQGVARRhFGCUQJRBkOGQ4ZDhkOGQwZDBkMGQwZChkKGQoZChkIGQgZCBkIGQYZBhkGGQYRBBEEEQQRBAkCCQIJAgkCAQABAAEAAQAAAAKgGqASoAqgAp4anhKeCp4CnBqcEpwKnAKaCloKWgJYAlgSWhJaClgKWAJWAlYaWhpaElgSWApWClYCVAJUGhgaGBoYGhgSFhIWEhYSFgoUChQKFAoUAhICEgISAhIaFhoWGhYaFhIUEhQSFBIUChIKEgoSChICEAIQAhACEAHOAc4BzgHOAc4BzgHOAc4BzAHMAcwBzAHMAcwBzAHMEdIR0hHSEdIR0hHSEdIR0gHKAcoBygHKAcoBygHKAcoZ1BnUGdQZ1BnUGdQZ1BnUEdAR0BHQEdAR0BHQEdAR0AnQCdAJ0AnQCdAJ0AnQCdAByAHIAcgByAHIAcgByAHIAYIJggAAAYABhAmEEYQAAAGGCYYRhhmGAYgJiBGIGYgBigmKEYoZigGMCYwRjBmMAY4JjhGOGY4BkAmQEZAZkAGSCZIRkhmSAZQJlBGUGZQBlgmWEZYZlgGYCZgRmBmYAZoJmhGaGZoBnAmcEZwZnAGeCZ4RnhmeAaAJoBGgGaAAABDEAIAAgAhCCEIIQghCGcgZyBIICggRxhHGCcYJxgGIAYgBiAGIAYYBhgGGAYYBhAGEAYQBhBmGGYYZhhmGCYQJhAmECYQBggGCAYIBggRASISAQEyIhICQzMiIhISAgJTQzMjEhICAhMjQzNjUwICAABlVURENDQjIyMjExMTEwEBAQEBAQEBAQEBAQEBAQEA+enZyMi4uKenp6eXl5eXhoaGhoaGhoZ2dnZ2dnZ2dubWxralpZWVhISEhHR0dHRkZGRkVFRUVENDQ0NDQ0NDMzMzMzMzMzMjIyMjIyMjIxMTExMTExMTAwMDAwMDAwPWtsXFpaWVlYSEhIRUVFRURERERAQEBARzc3Nzc3Nzc2NjY2NjY2NjMzMzMzMzMzMjIyMjIyMjIxMTExMTExMTxbWlBZSUdHQ0NCQkg4ODg2NjY2NTU1NTQ0NDQxMTExO1laSkhIQkJBQUBARzc3NzY2NjY1NTU1NDQ0NDMzMzM6YGFRWEhISEk5OTk5OTk5Nzc3Nzc3Nzc2NjY2NjY2NjU1NTU1NTU1NDQ0NDQ0NDQzMzMzMzMzMzIyMjIyMjIyOWBhUVdHR0dIODg4ODg4ODY2NjY2NjY2NDQ0NDQ0NDQzMzMzMzMzMzIyMjIyMjIyNSUlJSUlJSUlJSUlJSUlJShgYlJRQUFBRzc3Nzc3Nzc2NjY2NjY2NjMzMzMzMzMzNSUlJSUlJSUlJSUlJSUlJSQkJCQkJCQkJCQkJCQkJCQhYGdXUkJCQkU1NTU1NTU1NiYmJiYmJiYmJiYmJiYmJiQkJCQkJCQkJCQkJCQkJCQjIyMjIyMjIyMjIyMjIyMjIVBWRkIyMjI1JSUlJSUlJSQkJCQkJCQkIyMjIyMjIyMgQUIyMzM1NTQUFBQUFBQUEEFENDIiIiIjExMTExMTExAxMyMiEhISECEiEhAEHKMwskBAQFBgcICQoMDQ8RFBYZHCAkKC0yOD9HUFplcX+QorbL4v//AEH+MwskAgICAwMDAwQEBAYGBwcICAkJCgoLCwwMDQ0ODg8PEBARERISAEHXNAtnAQAAAQAAAQAAAQABAQABAQEBAQEBAQEBAQEBAQEBAgEBAgEBAgEBAgECAwECAwICAwICBAIDBAIDBAMDBQMEBgMEBgQFBwQFCAQGCQUHCgYICwYIDQcKDggLEAkMEgoNFAsPFw0RGQBBvzkLxwcBAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAEBAQEBAQICAgICAgMDAwMDAwQEBAQEBAUFBQUFBQYGBgYGBgcHBwcHBwgICAgAAQIDBAUAAQIDBAUAAQIDBAUAAQIDBAUAAQIDBAUAAQIDBAUAAQIDBAUAAQIDBAUAAQIDLx8PABcbHR4HCw0OJystLhADBQoMExUaHCMlKiwBAgQIERIUGAYJFhkgISIkKCYpABABAgQIIAMFCgwPLwcLDQ4GCR8jJSosISIkKCcrLS4REhQYExUaHBcbHR4WGSYp\",Module={onRuntimeInitialized:function(){(decoder=new H264bsdDecoder(Module)).onPictureReady=onPictureReady,postMessage({type:\"decoderReady\"})}};function H264bsdDecoder(A){this.module=A,this.onPictureReady=null,this.pStorage=A._h264bsdAlloc(),this.pWidth=A._malloc(4),this.pHeight=A._malloc(4),this.pPicture=A._malloc(4),this._decBuffer=A._malloc(1048576),A._h264bsdInit(this.pStorage,0)}window=this,H264bsdDecoder.RDY=0,H264bsdDecoder.PIC_RDY=1,H264bsdDecoder.HDRS_RDY=2,H264bsdDecoder.ERROR=3,H264bsdDecoder.PARAM_SET_ERROR=4,H264bsdDecoder.MEMALLOC_ERROR=5,H264bsdDecoder.prototype.release=function(){var A=this.module,I=this.pStorage;0!==I&&(A._h264bsdShutdown(I),A._h264bsdFree(I)),A._free(this.pWidth),A._free(this.pHeight),A._free(this.pPicture),this.pStorage=0,this.pWidth=0,this.pHeight=0},H264bsdDecoder.prototype.decode=function(A){if(A instanceof ArrayBuffer&&(A=new Uint8Array(A)),this.module.HEAPU8.set(A,this._decBuffer),this.module._h264bsdDecode(this.pStorage,this._decBuffer,A.byteLength,this.pPicture,this.pWidth,this.pHeight)===H264bsdDecoder.PIC_RDY){var I=this.module.getValue(this.pWidth,\"i32\"),B=this.module.getValue(this.pHeight,\"i32\"),g=this.module.getValue(this.pPicture,\"i8*\"),Q=new Uint8Array(this.module.HEAPU8.subarray(g,g+I*B*3/2));this.onPictureReady(Q,I,B)}},Module||(Module=void 0!==Module?Module:{});var key,moduleOverrides={};for(key in Module)Module.hasOwnProperty(key)&&(moduleOverrides[key]=Module[key]);var nodeFS,nodePath,ENVIRONMENT_IS_WEB=!1,ENVIRONMENT_IS_WORKER=!1,ENVIRONMENT_IS_NODE=!1,ENVIRONMENT_IS_SHELL=!1;if(Module.ENVIRONMENT)if(\"WEB\"===Module.ENVIRONMENT)ENVIRONMENT_IS_WEB=!0;else if(\"WORKER\"===Module.ENVIRONMENT)ENVIRONMENT_IS_WORKER=!0;else if(\"NODE\"===Module.ENVIRONMENT)ENVIRONMENT_IS_NODE=!0;else{if(\"SHELL\"!==Module.ENVIRONMENT)throw new Error(\"The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.\");ENVIRONMENT_IS_SHELL=!0}else ENVIRONMENT_IS_WEB=\"object\"==typeof window,ENVIRONMENT_IS_WORKER=\"function\"==typeof importScripts,ENVIRONMENT_IS_NODE=\"object\"==typeof process&&\"function\"==typeof require&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER,ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;if(ENVIRONMENT_IS_NODE)Module.print||(Module.print=console.log),Module.printErr||(Module.printErr=console.warn),Module.read=function(A,I){var B;return nodeFS||(nodeFS=require(\"fs\")),nodePath||(nodePath=require(\"path\")),A=nodePath.normalize(A),B=nodeFS.readFileSync(A),I?B:B.toString()},Module.readBinary=function(A){var I=Module.read(A,!0);return I.buffer||(I=new Uint8Array(I)),assert(I.buffer),I},Module.thisProgram||(process.argv.length>1?Module.thisProgram=process.argv[1].replace(/\\\\/g,\"/\"):Module.thisProgram=\"unknown-program\"),Module.arguments=process.argv.slice(2),\"undefined\"!=typeof module&&(module.exports=Module),process.on(\"uncaughtException\",function(A){if(!(A instanceof ExitStatus))throw A}),process.on(\"unhandledRejection\",function(A,I){process.exit(1)}),Module.inspect=function(){return\"[Emscripten Module object]\"};else if(ENVIRONMENT_IS_SHELL)Module.print||(Module.print=print),\"undefined\"!=typeof printErr&&(Module.printErr=printErr),\"undefined\"!=typeof read?Module.read=function(A){return read(A)}:Module.read=function(){throw\"no read() available\"},Module.readBinary=function(A){var I;return\"function\"==typeof readbuffer?new Uint8Array(readbuffer(A)):(assert(\"object\"==typeof(I=read(A,\"binary\"))),I)},\"undefined\"!=typeof scriptArgs?Module.arguments=scriptArgs:\"undefined\"!=typeof arguments&&(Module.arguments=arguments),\"function\"==typeof quit&&(Module.quit=function(A,I){quit(A)});else{if(!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER)throw new Error(\"Unknown runtime environment. Where are we?\");if(Module.read=function(A){var I=new XMLHttpRequest;return I.open(\"GET\",A,!1),I.send(null),I.responseText},ENVIRONMENT_IS_WORKER&&(Module.readBinary=function(A){var I=new XMLHttpRequest;return I.open(\"GET\",A,!1),I.responseType=\"arraybuffer\",I.send(null),new Uint8Array(I.response)}),Module.readAsync=function(A,I,B){var g=new XMLHttpRequest;g.open(\"GET\",A,!0),g.responseType=\"arraybuffer\",g.onload=function(){200==g.status||0==g.status&&g.response?I(g.response):B()},g.onerror=B,g.send(null)},\"undefined\"!=typeof arguments&&(Module.arguments=arguments),\"undefined\"!=typeof console)Module.print||(Module.print=function(A){console.log(A)}),Module.printErr||(Module.printErr=function(A){console.warn(A)});else{var TRY_USE_DUMP=!1;Module.print||(Module.print=TRY_USE_DUMP&&\"undefined\"!=typeof dump?function(A){dump(A)}:function(A){})}void 0===Module.setWindowTitle&&(Module.setWindowTitle=function(A){document.title=A})}for(key in Module.print||(Module.print=function(){}),Module.printErr||(Module.printErr=Module.print),Module.arguments||(Module.arguments=[]),Module.thisProgram||(Module.thisProgram=\"./this.program\"),Module.quit||(Module.quit=function(A,I){throw I}),Module.print=Module.print,Module.printErr=Module.printErr,Module.preRun=[],Module.postRun=[],moduleOverrides)moduleOverrides.hasOwnProperty(key)&&(Module[key]=moduleOverrides[key]);moduleOverrides=void 0;var STACK_ALIGN=16;function staticAlloc(A){assert(!staticSealed);var I=STATICTOP;return STATICTOP=STATICTOP+A+15&-16,I}function alignMemory(A,I){return I||(I=STACK_ALIGN),A=Math.ceil(A/I)*I}function warnOnce(A){warnOnce.shown||(warnOnce.shown={}),warnOnce.shown[A]||(warnOnce.shown[A]=1,Module.printErr(A))}var functionPointers=new Array(0),GLOBAL_BASE=1024,ABORT=0,EXITSTATUS=0;function assert(A,I){A||abort(\"Assertion failed: \"+I)}function getValue(A,I,B){switch(\"*\"===(I=I||\"i8\").charAt(I.length-1)&&(I=\"i32\"),I){case\"i1\":case\"i8\":return HEAP8[A>>0];case\"i16\":return HEAP16[A>>1];case\"i32\":case\"i64\":return HEAP32[A>>2];case\"float\":return HEAPF32[A>>2];case\"double\":return HEAPF64[A>>3];default:abort(\"invalid type for getValue: \"+I)}return null}var UTF8Decoder=\"undefined\"!=typeof TextDecoder?new TextDecoder(\"utf8\"):void 0,UTF16Decoder=\"undefined\"!=typeof TextDecoder?new TextDecoder(\"utf-16le\"):void 0;function demangle(A){return A}function demangleAll(A){return A.replace(/__Z[\\w\\d_]+/g,function(A){var I=demangle(A);return A===I?A:A+\" [\"+I+\"]\"})}function jsStackTrace(){var A=new Error;if(!A.stack){try{throw new Error(0)}catch(I){A=I}if(!A.stack)return\"(no stack trace available)\"}return A.stack.toString()}function stackTrace(){var A=jsStackTrace();return Module.extraStackTrace&&(A+=\"\\n\"+Module.extraStackTrace()),demangleAll(A)}var HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64,STATIC_BASE,STATICTOP,staticSealed,STACK_BASE,STACKTOP,STACK_MAX,DYNAMIC_BASE,DYNAMICTOP_PTR,byteLength,WASM_PAGE_SIZE=65536,ASMJS_PAGE_SIZE=16777216,MIN_TOTAL_MEMORY=16777216;function alignUp(A,I){return A%I>0&&(A+=I-A%I),A}function updateGlobalBuffer(A){Module.buffer=buffer=A}function updateGlobalBufferViews(){Module.HEAP8=HEAP8=new Int8Array(buffer),Module.HEAP16=HEAP16=new Int16Array(buffer),Module.HEAP32=HEAP32=new Int32Array(buffer),Module.HEAPU8=HEAPU8=new Uint8Array(buffer),Module.HEAPU16=HEAPU16=new Uint16Array(buffer),Module.HEAPU32=HEAPU32=new Uint32Array(buffer),Module.HEAPF32=HEAPF32=new Float32Array(buffer),Module.HEAPF64=HEAPF64=new Float64Array(buffer)}function abortOnCannotGrowMemory(){abort(\"Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value \"+TOTAL_MEMORY+\", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 \")}function enlargeMemory(){var A=Module.usingWasm?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE,I=2147483648-A;if(HEAP32[DYNAMICTOP_PTR>>2]>I)return!1;var B=TOTAL_MEMORY;for(TOTAL_MEMORY=Math.max(TOTAL_MEMORY,MIN_TOTAL_MEMORY);TOTAL_MEMORY<HEAP32[DYNAMICTOP_PTR>>2];)TOTAL_MEMORY=TOTAL_MEMORY<=536870912?alignUp(2*TOTAL_MEMORY,A):Math.min(alignUp((3*TOTAL_MEMORY+2147483648)/4,A),I);var g=Module.reallocBuffer(TOTAL_MEMORY);return g&&g.byteLength==TOTAL_MEMORY?(updateGlobalBuffer(g),updateGlobalBufferViews(),!0):(TOTAL_MEMORY=B,!1)}STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0,staticSealed=!1,Module.reallocBuffer||(Module.reallocBuffer=function(A){var I;try{if(ArrayBuffer.transfer)I=ArrayBuffer.transfer(buffer,A);else{var B=HEAP8;I=new ArrayBuffer(A),new Int8Array(I).set(B)}}catch(A){return!1}return!!_emscripten_replace_memory(I)&&I});try{(byteLength=Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype,\"byteLength\").get))(new ArrayBuffer(4))}catch(A){byteLength=function(A){return A.byteLength}}var TOTAL_STACK=Module.TOTAL_STACK||5242880,TOTAL_MEMORY=Module.TOTAL_MEMORY||16777216;function getTotalMemory(){return TOTAL_MEMORY}if(TOTAL_MEMORY<TOTAL_STACK&&Module.printErr(\"TOTAL_MEMORY should be larger than TOTAL_STACK, was \"+TOTAL_MEMORY+\"! (TOTAL_STACK=\"+TOTAL_STACK+\")\"),Module.buffer?buffer=Module.buffer:\"object\"==typeof WebAssembly&&\"function\"==typeof WebAssembly.Memory?(Module.wasmMemory=new WebAssembly.Memory({initial:TOTAL_MEMORY/WASM_PAGE_SIZE}),buffer=Module.wasmMemory.buffer):buffer=new ArrayBuffer(TOTAL_MEMORY),updateGlobalBufferViews(),HEAP32[0]=1668509029,HEAP16[1]=25459,115!==HEAPU8[2]||99!==HEAPU8[3])throw\"Runtime error: expected the system to be little-endian!\";function callRuntimeCallbacks(A){for(;A.length>0;){var I=A.shift();if(\"function\"!=typeof I){var B=I.func;\"number\"==typeof B?void 0===I.arg?Module.dynCall_v(B):Module.dynCall_vi(B,I.arg):B(void 0===I.arg?null:I.arg)}else I()}}Module.HEAP=HEAP,Module.buffer=buffer,Module.HEAP8=HEAP8,Module.HEAP16=HEAP16,Module.HEAP32=HEAP32,Module.HEAPU8=HEAPU8,Module.HEAPU16=HEAPU16,Module.HEAPU32=HEAPU32,Module.HEAPF32=HEAPF32,Module.HEAPF64=HEAPF64;var __ATPRERUN__=[],__ATINIT__=[],__ATMAIN__=[],__ATEXIT__=[],__ATPOSTRUN__=[],runtimeInitialized=!1,runtimeExited=!1;function preRun(){if(Module.preRun)for(\"function\"==typeof Module.preRun&&(Module.preRun=[Module.preRun]);Module.preRun.length;)addOnPreRun(Module.preRun.shift());callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){runtimeInitialized||(runtimeInitialized=!0,callRuntimeCallbacks(__ATINIT__))}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__),runtimeExited=!0}function postRun(){if(Module.postRun)for(\"function\"==typeof Module.postRun&&(Module.postRun=[Module.postRun]);Module.postRun.length;)addOnPostRun(Module.postRun.shift());callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(A){__ATPRERUN__.unshift(A)}function addOnPostRun(A){__ATPOSTRUN__.unshift(A)}var Math_abs=Math.abs,Math_cos=Math.cos,Math_sin=Math.sin,Math_tan=Math.tan,Math_acos=Math.acos,Math_asin=Math.asin,Math_atan=Math.atan,Math_atan2=Math.atan2,Math_exp=Math.exp,Math_log=Math.log,Math_sqrt=Math.sqrt,Math_ceil=Math.ceil,Math_floor=Math.floor,Math_pow=Math.pow,Math_imul=Math.imul,Math_fround=Math.fround,Math_round=Math.round,Math_min=Math.min,Math_clz32=Math.clz32,Math_trunc=Math.trunc,runDependencies=0,runDependencyWatcher=null,dependenciesFulfilled=null;function addRunDependency(A){runDependencies++,Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies)}function removeRunDependency(A){if(runDependencies--,Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies),0==runDependencies&&(null!==runDependencyWatcher&&(clearInterval(runDependencyWatcher),runDependencyWatcher=null),dependenciesFulfilled)){var I=dependenciesFulfilled;dependenciesFulfilled=null,I()}}Module.preloadedImages={},Module.preloadedAudios={};var dataURIPrefix=\"data:application/octet-stream;base64,\";function isDataURI(A){return String.prototype.startsWith?A.startsWith(dataURIPrefix):0===A.indexOf(dataURIPrefix)}function integrateWasmJS(){var A=\"TinyH264.wast\",I=wasmBinaryFileBase64,B=\"TinyH264.temp.asm.js\";\"function\"==typeof Module.locateFile&&(isDataURI(A)||(A=Module.locateFile(A)),isDataURI(I)||(I=Module.locateFile(I)),isDataURI(B)||(B=Module.locateFile(B)));var g={global:null,env:null,asm2wasm:{\"f64-rem\":function(A,I){return A%I},debugger:function(){}},parent:Module},Q=null;function E(){try{if(Module.wasmBinary)return new Uint8Array(Module.wasmBinary);if(Module.readBinary)return Module.readBinary(I);throw\"on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)\"}catch(A){abort(A)}}function C(A,B,C){if(\"object\"!=typeof WebAssembly)return Module.printErr(\"no native wasm support detected\"),!1;if(!(Module.wasmMemory instanceof WebAssembly.Memory))return Module.printErr(\"no native wasm Memory in use\"),!1;function i(A,I){(Q=A.exports).memory&&function(A){var I=Module.buffer;A.byteLength<I.byteLength&&Module.printErr(\"the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here\");var B=new Int8Array(I);new Int8Array(A).set(B),updateGlobalBuffer(A),updateGlobalBufferViews()}(Q.memory),Module.asm=Q,Module.usingWasm=!0,removeRunDependency(\"wasm-instantiate\")}if(B.memory=Module.wasmMemory,g.global={NaN:NaN,Infinity:1/0},g[\"global.Math\"]=Math,g.env=B,addRunDependency(\"wasm-instantiate\"),Module.instantiateWasm)try{return Module.instantiateWasm(g,i)}catch(A){return Module.printErr(\"Module.instantiateWasm callback failed with error: \"+A),!1}function o(A){i(A.instance,A.module)}function D(A){(Module.wasmBinary||!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER||\"function\"!=typeof fetch?new Promise(function(A,I){A(E())}):fetch(I,{credentials:\"same-origin\"}).then(function(A){if(!A.ok)throw\"failed to load wasm binary file at '\"+I+\"'\";return A.arrayBuffer()}).catch(function(){return E()})).then(function(A){return WebAssembly.instantiate(A,g)}).then(A).catch(function(A){Module.printErr(\"failed to asynchronously prepare wasm: \"+A),abort(A)})}return Module.wasmBinary||\"function\"!=typeof WebAssembly.instantiateStreaming||isDataURI(I)||\"function\"!=typeof fetch?D(o):WebAssembly.instantiateStreaming(fetch(I,{credentials:\"same-origin\"}),g).then(o).catch(function(A){Module.printErr(\"wasm streaming compile failed: \"+A),Module.printErr(\"falling back to ArrayBuffer instantiation\"),D(o)}),{}}Module.asmPreload=Module.asm;var i=Module.reallocBuffer;Module.reallocBuffer=function(A){return\"asmjs\"===o?i(A):function(A){A=alignUp(A,Module.usingWasm?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE);var I=Module.buffer.byteLength;if(Module.usingWasm)try{return-1!==Module.wasmMemory.grow((A-I)/65536)?Module.buffer=Module.wasmMemory.buffer:null}catch(A){return null}}(A)};var o=\"\";Module.asm=function(A,I,B){var g;if(!(I=I).table){var Q=Module.wasmTableSize;void 0===Q&&(Q=1024);var E=Module.wasmMaxTableSize;\"object\"==typeof WebAssembly&&\"function\"==typeof WebAssembly.Table?I.table=void 0!==E?new WebAssembly.Table({initial:Q,maximum:E,element:\"anyfunc\"}):new WebAssembly.Table({initial:Q,element:\"anyfunc\"}):I.table=new Array(Q),Module.wasmTable=I.table}return I.memoryBase||(I.memoryBase=Module.STATIC_BASE),I.tableBase||(I.tableBase=0),(g=C(0,I))||abort(\"no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods\"),g}}integrateWasmJS();var ASM_CONSTS=[];STATICTOP=(STATIC_BASE=GLOBAL_BASE)+8896,__ATINIT__.push();var STATIC_BUMP=8896;function _emscripten_memcpy_big(A,I,B){return HEAPU8.set(HEAPU8.subarray(I,I+B),A),A}function ___setErrNo(A){return Module.___errno_location&&(HEAP32[Module.___errno_location()>>2]=A),A}Module.STATIC_BASE=STATIC_BASE,Module.STATIC_BUMP=STATIC_BUMP,STATICTOP+=16,DYNAMICTOP_PTR=staticAlloc(4),DYNAMIC_BASE=alignMemory(STACK_MAX=(STACK_BASE=STACKTOP=alignMemory(STATICTOP))+TOTAL_STACK),HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE,staticSealed=!0,Module.wasmTableSize=0,Module.wasmMaxTableSize=0,Module.asmGlobalArg={},Module.asmLibraryArg={enlargeMemory:enlargeMemory,getTotalMemory:getTotalMemory,abortOnCannotGrowMemory:abortOnCannotGrowMemory,___setErrNo:___setErrNo,_emscripten_memcpy_big:_emscripten_memcpy_big,DYNAMICTOP_PTR:DYNAMICTOP_PTR,STACKTOP:STACKTOP};var asm=Module.asm(Module.asmGlobalArg,Module.asmLibraryArg,buffer);Module.asm=asm;var initialStackTop,_emscripten_get_global_libc=Module._emscripten_get_global_libc=function(){return Module.asm._emscripten_get_global_libc.apply(null,arguments)},_emscripten_replace_memory=Module._emscripten_replace_memory=function(){return Module.asm._emscripten_replace_memory.apply(null,arguments)},_free=Module._free=function(){return Module.asm._free.apply(null,arguments)},_h264bsdAlloc=Module._h264bsdAlloc=function(){return Module.asm._h264bsdAlloc.apply(null,arguments)},_h264bsdDecode=Module._h264bsdDecode=function(){return Module.asm._h264bsdDecode.apply(null,arguments)},_h264bsdFree=Module._h264bsdFree=function(){return Module.asm._h264bsdFree.apply(null,arguments)},_h264bsdInit=Module._h264bsdInit=function(){return Module.asm._h264bsdInit.apply(null,arguments)},_h264bsdShutdown=Module._h264bsdShutdown=function(){return Module.asm._h264bsdShutdown.apply(null,arguments)},_malloc=Module._malloc=function(){return Module.asm._malloc.apply(null,arguments)};function ExitStatus(A){this.name=\"ExitStatus\",this.message=\"Program terminated with exit(\"+A+\")\",this.status=A}Module.asm=asm,Module.getValue=getValue,ExitStatus.prototype=new Error,ExitStatus.prototype.constructor=ExitStatus;var preloadStartTime=null;function run(A){function I(){Module.calledRun||(Module.calledRun=!0,ABORT||(ensureInitRuntime(),preMain(),Module.onRuntimeInitialized&&Module.onRuntimeInitialized(),postRun()))}A=A||Module.arguments,null===preloadStartTime&&(preloadStartTime=Date.now()),runDependencies>0||(preRun(),runDependencies>0||Module.calledRun||(Module.setStatus?(Module.setStatus(\"Running...\"),setTimeout(function(){setTimeout(function(){Module.setStatus(\"\")},1),I()},1)):I()))}function exit(A,I){I&&Module.noExitRuntime&&0===A||(Module.noExitRuntime||(ABORT=!0,EXITSTATUS=A,STACKTOP=initialStackTop,exitRuntime(),Module.onExit&&Module.onExit(A)),ENVIRONMENT_IS_NODE&&process.exit(A),Module.quit(A,new ExitStatus(A)))}dependenciesFulfilled=function A(){Module.calledRun||run(),Module.calledRun||(dependenciesFulfilled=A)},Module.run=run,Module.exit=exit;var abortDecorators=[];function abort(A){Module.onAbort&&Module.onAbort(A),void 0!==A?(Module.print(A),Module.printErr(A),A=JSON.stringify(A)):A=\"\",ABORT=!0,EXITSTATUS=1;var I=\"abort(\"+A+\") at \"+stackTrace()+\"\\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.\";throw abortDecorators&&abortDecorators.forEach(function(B){I=B(I,A)}),I}if(Module.abort=abort,Module.preInit)for(\"function\"==typeof Module.preInit&&(Module.preInit=[Module.preInit]);Module.preInit.length>0;)Module.preInit.pop()();Module.noExitRuntime=!0,run();var decoder=null;function onMessage(A){var I=A.data;switch(I.type){case\"decode\":decoder&&decoder.decode&&decoder.decode(I.data)}}function onPictureReady(A,I,B){postMessage({type:\"pictureReady\",width:I,height:B,data:A.buffer},[A.buffer])}addEventListener(\"message\",onMessage);";

  var VideoDecoder =
  /*#__PURE__*/
  function () {
    function VideoDecoder(flv) {
      var _this = this;

      classCallCheck(this, VideoDecoder);

      this.flv = flv;
      var player = flv.player,
          events = flv.events,
          options = flv.options;
      this.playing = false;
      this.playIndex = 0;
      this.videoframes = [];
      this.timestamps = [];
      this.videoInputLength = 0;
      this.decoding = false;
      this.byteSize = 0;
      this.loaded = 0;
      this.freeNumber = player.frameRate * 60;
      this.decoderWorker = createWorker(workerString);
      this.renderer = new H264bsdCanvas(player.$canvas);
      flv.on('destroy', function () {
        _this.videoframes = [];
        _this.timestamps = [];

        _this.decoderWorker.terminate();

        _this.stop();
      });
      events.proxy(this.decoderWorker, 'message', function (event) {
        var message = event.data;

        switch (message.type) {
          case 'pictureReady':
            _this.byteSize += message.data.byteLength;

            _this.videoframes.push(message);

            _this.decoding = _this.videoframes.length !== _this.videoInputLength;
            _this.loaded = _this.videoframes.length / player.frameRate;
            flv.emit('videoLoaded', _this.loaded);

            if (_this.videoframes.length === 1) {
              flv.emit('ready');

              if (!options.poster) {
                _this.draw(0, false);
              }
            }

            break;

          default:
            break;
        }
      });
      var sps = new Uint8Array();
      var pps = new Uint8Array();
      flv.on('videoData', function (uint8, timestamp) {
        var readNalu = readBuffer(uint8);
        readNalu(4);
        var nalHeader = readNalu(1)[0];
        var naluType = nalHeader & 31;

        switch (naluType) {
          case 1:
          case 5:
            {
              _this.decoding = true;
              var frame = mergeBuffer(sps, pps, uint8);

              _this.decoderWorker.postMessage({
                type: 'decode',
                data: frame.buffer
              }, [frame.buffer]);

              _this.timestamps.push(timestamp);

              _this.videoInputLength += 1;
              break;
            }

          case 7:
            sps = uint8;
            break;

          case 8:
            pps = uint8;
            break;

          default:
            break;
        }
      });
      flv.on('timeupdate', function (currentTime) {
        var index = _this.playIndex;
        var timestamp = _this.timestamps[index];

        if (timestamp !== undefined && currentTime * 1000 >= timestamp) {
          if (_this.draw(index)) {
            if (_this.flv.options.live && index !== 0 && index % _this.freeNumber === 0) {
              _this.playIndex = -1;

              _this.videoframes.splice(0, index + 1);

              _this.timestamps.splice(0, index + 1);

              _this.flv.decoder.currentTime = _this.timestamps[0] / 1000 || 0;
            }

            _this.playIndex += 1;
          } else {
            if (!options.live) {
              _this.stop();
            }
          }
        }
      });
    }

    createClass(VideoDecoder, [{
      key: "draw",
      value: function draw(index) {
        var videoframe = this.videoframes[index];
        if (!videoframe) return false;
        this.renderer.drawFrame(videoframe);
        return true;
      }
    }, {
      key: "play",
      value: function play() {
        var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.playing = true;

        if (this.flv.options.live) {
          var startIndex = Math.max(0, this.videoframes.length);
          this.playIndex = 0;
          this.videoframes.splice(0, startIndex);
          this.timestamps.splice(0, startIndex);
          this.flv.decoder.currentTime = this.timestamps[0] / 1000 || 0;
        } else {
          this.playIndex = Math.round(startTime * this.flv.player.frameRate);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        this.playing = false;
      }
    }]);

    return VideoDecoder;
  }();

  var Decoder =
  /*#__PURE__*/
  function () {
    function Decoder(flv) {
      var _this = this;

      classCallCheck(this, Decoder);

      this.flv = flv;
      this.ended = false;
      this.playing = false;
      this.waiting = false;
      this.loopTimer = null;
      this.waitingTimer = null;
      this.endedTimer = null;
      this.currentTime = 0;
      this.lastUpdateTime = 0;
      this.video = new VideoDecoder(flv, this);

      if (flv.options.hasAudio) {
        this.audio = new AudioDecoder(flv, this);
      } else {
        this.audio = {
          play: function play() {
            return null;
          },
          stop: function stop() {
            return null;
          },
          playing: true,
          decoding: false
        };
      }

      flv.on('destroy', function () {
        _this.pause();
      });
      flv.on('timeupdate', function (currentTime) {
        if (!flv.options.live && currentTime >= flv.player.duration) {
          _this.pause();
        }
      });
      flv.events.proxy(document, 'visibilitychange', function () {
        if (document.hidden && _this.playing) {
          _this.pause();
        }
      });
    }

    createClass(Decoder, [{
      key: "play",
      value: function play() {
        var _this2 = this;

        var _this$flv = this.flv,
            options = _this$flv.options,
            player = _this$flv.player;
        this.lastUpdateTime = getNowTime();
        this.video.play(this.currentTime);
        this.audio.play(this.currentTime);
        this.flv.emit('play');

        var loop = function loop() {
          _this2.loopTimer = window.requestAnimationFrame(function () {
            if (_this2.video.playing && _this2.audio.playing) {
              _this2.ended = false;
              _this2.playing = true;
              _this2.waiting = false;
              var updateTime = getNowTime();
              _this2.currentTime += (updateTime - _this2.lastUpdateTime) / 1000;
              _this2.lastUpdateTime = updateTime;

              _this2.flv.emit('timeupdate', _this2.currentTime);
            } else if (player.streaming || _this2.video.decoding || _this2.audio.decoding) {
              _this2.ended = false;
              _this2.playing = false;
              _this2.waiting = true;

              _this2.flv.emit('waiting', _this2.currentTime);

              _this2.waitingTimer = setTimeout(function () {
                _this2.play();
              }, 1000);
              return;
            } else {
              _this2.ended = true;
              _this2.playing = false;
              _this2.waiting = false;

              _this2.flv.emit('ended', _this2.currentTime);

              if (options.loop && !options.live) {
                _this2.currentTime = 0;
                _this2.endedTimer = setTimeout(function () {
                  _this2.play();

                  _this2.flv.emit('loop');
                }, 1000);
                return;
              }

              _this2.pause();
            }

            loop();
          });
        };

        loop();
      }
    }, {
      key: "pause",
      value: function pause() {
        window.cancelAnimationFrame(this.loopTimer);
        window.clearTimeout(this.waitingTimer);
        window.clearTimeout(this.endedTimer);
        this.loopTimer = null;
        this.waitingTimer = null;
        this.endedTimer = null;
        this.video.stop();
        this.audio.stop();
        this.ended = false;
        this.playing = false;
        this.waiting = false;
        this.flv.emit('pause');
      }
    }, {
      key: "seeked",
      value: function seeked(time) {
        var player = this.flv.player;
        window.cancelAnimationFrame(this.loopTimer);
        window.clearTimeout(this.waitingTimer);
        window.clearTimeout(this.endedTimer);
        this.loopTimer = null;
        this.waitingTimer = null;
        this.endedTimer = null;
        this.currentTime = time;
        this.video.draw(Math.floor(time * player.frameRate));

        if (this.playing) {
          this.play();
        }

        this.flv.emit('seeked', time);
      }
    }]);

    return Decoder;
  }();

  var workerString$1 = "\"use strict\";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError(\"Invalid attempt to spread non-iterable instance\")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||\"[object Arguments]\"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var r=0,t=new Array(e.length);r<e.length;r++)t[r]=e[r];return t}}function _instanceof(e,r){return null!=r&&\"undefined\"!=typeof Symbol&&r[Symbol.hasInstance]?r[Symbol.hasInstance](e):e instanceof r}function _typeof(e){return(_typeof=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&\"function\"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?\"symbol\":typeof e})(e)}function _classCallCheck(e,r){if(!_instanceof(e,r))throw new TypeError(\"Cannot call a class as a function\")}function _possibleConstructorReturn(e,r){return!r||\"object\"!==_typeof(r)&&\"function\"!=typeof r?_assertThisInitialized(e):r}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return e}function _inherits(e,r){if(\"function\"!=typeof r&&null!==r)throw new TypeError(\"Super expression must either be null or a function\");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),r&&_setPrototypeOf(e,r)}function _wrapNativeSuper(e){var r=\"function\"==typeof Map?new Map:void 0;return(_wrapNativeSuper=function(e){if(null===e||!_isNativeFunction(e))return e;if(\"function\"!=typeof e)throw new TypeError(\"Super expression must either be null or a function\");if(void 0!==r){if(r.has(e))return r.get(e);r.set(e,t)}function t(){return _construct(e,arguments,_getPrototypeOf(this).constructor)}return t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(t,e)})(e)}function isNativeReflectConstruct(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function _construct(e,r,t){return(_construct=isNativeReflectConstruct()?Reflect.construct:function(e,r,t){var n=[null];n.push.apply(n,r);var a=new(Function.bind.apply(e,n));return t&&_setPrototypeOf(a,t.prototype),a}).apply(null,arguments)}function _isNativeFunction(e){return-1!==Function.toString.call(e).indexOf(\"[native code]\")}function _setPrototypeOf(e,r){return(_setPrototypeOf=Object.setPrototypeOf||function(e,r){return e.__proto__=r,e})(e,r)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var FlvPlayerError=function(e){function r(e,t){var n;return _classCallCheck(this,r),n=_possibleConstructorReturn(this,_getPrototypeOf(r).call(this,e)),\"function\"==typeof Error.captureStackTrace&&Error.captureStackTrace(_assertThisInitialized(n),t||n.constructor),n.name=\"FlvPlayerError\",n}return _inherits(r,_wrapNativeSuper(Error)),r}(),debug={warn:function(e){if(!e){for(var r,t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];(r=console).warn.apply(r,n)}},error:function(e,r){if(!e)throw new FlvPlayerError(r)}};function mergeBuffer(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var n=r[0].constructor;return r.reduce(function(e,r){var t=new n((0|e.byteLength)+(0|r.byteLength));return t.set(e,0),t.set(r,0|e.byteLength),t},new n)}function readBufferSum(e){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return e.reduce(function(t,n,a){return t+(r?n:n-128)*256**(e.length-a-1)},0)}function readString(e){var r;return(r=String.fromCharCode).call.apply(r,[String].concat(_toConsumableArray(e)))}function readBuffer(e){var r=0;function t(n){for(var a=new Uint8Array(n),o=0;o<n;o+=1)a[o]=e[r],r+=1;return t.index=r,a}return t.index=0,t}function readDouble(e){var r=new DataView(new ArrayBuffer(e.length));return e.forEach(function(e,t){r.setUint8(t,e)}),r.getFloat64(0)}function readBoolean(e){return 0!==e[0]}var index=0,header=null,uint8=new Uint8Array,scripMeta=null,AudioSpecificConfig=null,AVCDecoderConfigurationRecord=null,nalStart=new Uint8Array([0,0,0,1]);function readable(e){return uint8.length-index>=e}function read(e){for(var r=new Uint8Array(e),t=0;t<e;t+=1)r[t]=uint8[index],index+=1;return r}function demuxerScripTag(e){var r=readBuffer(e.body),t=Object.create(null),n=Object.create(null);function a(e){var t=null;if(void 0!==e)switch(e){case 0:t=readDouble(r(8));break;case 1:t=readBoolean(r(1));break;case 2:var n=readBufferSum(r(2));t=readString(r(n));break;case 3:t=Object.create(null);for(var o=-1;9!==o;){var i=readBufferSum(r(2)),u=readString(r(i)),c=r(1)[0];u&&(t[u]=a(c)),o=c}break;case 5:t=null;break;case 6:t=void 0;break;case 7:t=\"Reference #\".concat(r.index),r(2);break;case 8:t=Object.create(null);for(var f=-1;9!==f;){var d=readBufferSum(r(2)),s=readString(r(d)),l=r(1)[0];s&&(t[s]=a(l)),f=l}break;case 10:var p=readBufferSum(r(4));t=[];for(var g=0;g<p;g+=1){var y=r(1)[0];t.push(a(y))}break;case 11:t=readDouble(r(2));break;case 12:var b=readBufferSum(r(4));t=readString(r(b));break;default:debug.error(!1,\"AMF: Unknown metaData type: \".concat(e))}return t}for(t.type=r(1)[0],debug.error(2===t.type,\"AMF: [amf1] type expect 2, but got \".concat(t.type)),t.size=readBufferSum(r(2)),t.string=readString(r(t.size)),n.type=r(1)[0],debug.error(8===n.type,\"AMF: [amf2] type expect 8, but got \".concat(n.type)),n.size=readBufferSum(r(4)),n.metaData=Object.create(null);r.index<e.body.length;){var o=readBufferSum(r(2)),i=readString(r(o)),u=r(1)[0];i&&(n.metaData[i]=a(u))}debug.error(r.index===e.body.length,\"AMF: Seems to be incompletely parsed\"),debug.error(n.size===Object.keys(n.metaData).length,\"AMF: [amf2] length does not match\"),postMessage({type:\"scripMeta\",data:scripMeta={amf1:t,amf2:n}})}function demuxerVideoTag(e){debug.error(e.body.length>1,\"Invalid video packet\");var r={frameType:(240&e.body[0])>>4,codecID:15&e.body[0]};debug.error(7===r.codecID,\"[videoTrack] Unsupported codec in video frame: \".concat(r.codecID));var t=e.body.slice(1,5);debug.error(t.length>=4,\"[H264] Invalid AVC packet, missing AVCPacketType or/and CompositionTime\");var n=new DataView(t.buffer),a=n.getUint8(0),o=((16777215&n.getUint32(0))<<8>>8)+e.timestamp,i=e.body.subarray(5);if(0===a){debug.warn(!AVCDecoderConfigurationRecord,\"[h264] Find another one AVCDecoderConfigurationRecord\"),debug.error(i.length>=7,\"[H264] AVCDecoderConfigurationRecord parse length is not enough\");var u=readBuffer(i),c={};c.configurationVersion=u(1)[0],debug.error(1===c.configurationVersion,\"[H264] Invalid configurationVersion: \".concat(c.configurationVersion)),c.AVCProfileIndication=u(1)[0],debug.error(0!==c.AVCProfileIndication,\"[H264] Invalid AVCProfileIndication: \".concat(c.AVCProfileIndication)),c.profile_compatibility=u(1)[0],c.AVCLevelIndication=u(1)[0],c.lengthSizeMinusOne=1+(3&u(1)[0]),debug.error(4===c.lengthSizeMinusOne||3!==c.lengthSizeMinusOne,\"[H264] Invalid lengthSizeMinusOne: \".concat(c.lengthSizeMinusOne)),c.numOfSequenceParameterSets=31&u(1)[0],debug.error(0!==c.numOfSequenceParameterSets,\"[H264] Invalid numOfSequenceParameterSets: \".concat(c.numOfSequenceParameterSets)),debug.warn(1===c.numOfSequenceParameterSets,\"[H264] Strange numOfSequenceParameterSets: \".concat(c.numOfSequenceParameterSets));for(var f=0;f<c.numOfSequenceParameterSets;f+=1)if(c.sequenceParameterSetLength=readBufferSum(u(2)),c.sequenceParameterSetLength>0){var d=u(c.sequenceParameterSetLength);postMessage({type:\"videoData\",data:mergeBuffer(nalStart,d)})}c.numOfPictureParameterSets=u(1)[0],debug.error(0!==c.numOfPictureParameterSets,\"[H264] Invalid numOfPictureParameterSets: \".concat(c.numOfPictureParameterSets)),debug.warn(1===c.numOfPictureParameterSets,\"[H264] Strange numOfPictureParameterSets: \".concat(c.numOfPictureParameterSets));for(var s=0;s<c.numOfPictureParameterSets;s+=1)if(c.pictureParameterSetLength=readBufferSum(u(2)),c.pictureParameterSetLength>0){var l=u(c.pictureParameterSetLength);postMessage({type:\"videoData\",data:mergeBuffer(nalStart,l)})}AVCDecoderConfigurationRecord=c,postMessage({type:\"AVCDecoderConfigurationRecord\",data:c})}else if(1===a)for(var p=AVCDecoderConfigurationRecord.lengthSizeMinusOne,g=readBuffer(i);g.index<i.length;){var y=readBufferSum(g(p));postMessage({type:\"videoData\",data:mergeBuffer(nalStart,g(y)),timestamp:o})}else debug.error(2===a,\"[H264] Invalid video packet type \".concat(a))}function demuxerAudioTag(e){debug.error(e.body.length>1,\"Invalid audio packet\");var r={soundFormat:(240&e.body[0])>>4,soundRate:(12&e.body[0])>>2,soundSize:(2&e.body[0])>>1,soundType:(1&e.body[0])>>0};debug.error(10===r.soundFormat,\"[audioTrack] unsupported audio format: \".concat(r.soundFormat));var t=e.body.subarray(1);if(0===t[0]){var n=t.subarray(1);debug.warn(!AudioSpecificConfig,\"[aac] Find another one AudioSpecificConfig\"),debug.error(n.length>=2,\"[aac] AudioSpecificConfig parse length is not enough\");var a={};a.audioObjectType=(248&n[0])>>3,a.samplingFrequencyIndex=((7&n[0])<<1)+((128&n[1])>>7&1),a.channelConfiguration=(127&n[1])>>3,AudioSpecificConfig=a,postMessage({type:\"AudioSpecificConfig\",data:a})}else{var o=AudioSpecificConfig,i=o.audioObjectType,u=o.samplingFrequencyIndex,c=o.channelConfiguration,f=e.dataSize-2+7,d=new Uint8Array(7);d[0]=255,d[1]=240,d[1]|=0,d[1]|=0,d[1]|=1,d[2]=i-1<<6,d[2]|=(15&u)<<2,d[2]|=0,d[2]|=(4&c)>>2,d[3]=(3&c)<<6,d[3]|=0,d[3]|=0,d[3]|=0,d[3]|=0,d[3]|=(6144&f)>>11,d[4]=(2040&f)>>3,d[5]=(7&f)<<5,d[5]|=31,d[6]=252;var s=e.body.subarray(2);postMessage({type:\"audioData\",data:mergeBuffer(d,s),timestamp:e.timestamp})}}onmessage=function(e){if(uint8=mergeBuffer(uint8,e.data),!header&&readable(13)){(header=Object.create(null)).signature=readString(read(3)),header.version=read(1)[0],debug.error(\"FLV\"===header.signature&&1===header.version,\"FLV header not found\"),header.flags=read(1)[0],header.headersize=readBufferSum(read(4));var r=readBufferSum(read(4));debug.error(0===r,\"PrevTagSize0 should be equal to 0, but got \".concat(r)),postMessage({type:\"flvHeader\",data:header})}for(;index<uint8.length;){var t=Object.create(null),n=index;if(!readable(11))return index=0,void(uint8=uint8.subarray(n));t.tagType=read(1)[0],t.dataSize=readBufferSum(read(3));var a=read(1),o=read(1),i=read(1),u=read(1);if(t.timestamp=i|o<<8|a<<16|u<<24,t.streamID=readBufferSum(read(3)),debug.error(0===t.streamID,\"streamID should be equal to 0, but got \".concat(t.streamID)),!readable(t.dataSize+4))return index=0,void(uint8=uint8.subarray(n));t.body=read(t.dataSize);var c=readBufferSum(read(4));switch(debug.error(c===t.dataSize+11,\"Invalid PrevTagSize: \".concat(c)),t.tagType){case 18:demuxerScripTag(t);break;case 9:demuxerVideoTag(t);break;case 8:demuxerAudioTag(t);break;default:debug.error(!1,\"unknown tag type: \".concat(t.tagType))}}index=0,uint8=new Uint8Array};";

  var Demuxer = function Demuxer(flv) {
    var _this = this;

    classCallCheck(this, Demuxer);

    var options = flv.options,
        debug = flv.debug;
    this.size = 0;
    this.header = null;
    this.streaming = false;
    this.demuxed = false;
    this.videoDataSize = 0;
    this.audioDataSize = 0;
    this.videoDataLength = 0;
    this.audioDataLength = 0;
    this.streamStartTime = 0;
    this.streamEndTime = 0;
    this.scripMeta = null;
    this.AudioSpecificConfig = null;
    this.AVCDecoderConfigurationRecord = null;
    this.demuxWorker = createWorker(workerString$1);
    flv.on('destroy', function () {
      _this.demuxWorker.terminate();
    });
    flv.on('streamStart', function (requestType) {
      _this.streamStartTime = getNowTime();
      debug.log('stream-url', options.url);
      debug.log('stream-request', requestType);
    });
    flv.on('streaming', function (uint8) {
      _this.streaming = true;
      _this.size += uint8.byteLength;

      _this.demuxWorker.postMessage(uint8);
    });
    flv.on('streamEnd', function (uint8) {
      _this.streaming = false;
      _this.streamEndTime = getNowTime();

      if (uint8) {
        _this.index = 0;
        _this.size = uint8.byteLength;

        _this.demuxWorker.postMessage(uint8);
      }

      debug.log('stream-size', "".concat(_this.size, " byte"));
      debug.log('stream-time', "".concat(_this.streamEndTime - _this.streamStartTime, " ms"));
      _this.demuxed = true;
      flv.emit('demuxDone');
      debug.log('demux-done');
    });

    this.demuxWorker.onmessage = function (event) {
      var message = event.data;

      switch (message.type) {
        case 'flvHeader':
          _this.header = message.data;
          flv.emit('flvHeader', _this.header);
          debug.log('flv-header', _this.header);
          break;

        case 'scripMeta':
          _this.scripMeta = message.data;
          flv.emit('scripMeta', _this.scripMeta);
          debug.log('scrip-meta', _this.scripMeta);
          break;

        case 'AVCDecoderConfigurationRecord':
          _this.AVCDecoderConfigurationRecord = message.data;
          flv.emit('AVCDecoderConfigurationRecord', _this.AVCDecoderConfigurationRecord);
          debug.log('AVCDecoderConfigurationRecord', _this.AVCDecoderConfigurationRecord);
          break;

        case 'AudioSpecificConfig':
          _this.AudioSpecificConfig = message.data;
          flv.emit('AudioSpecificConfig', _this.AudioSpecificConfig);
          debug.log('AudioSpecificConfig', _this.AudioSpecificConfig);
          break;

        case 'videoData':
          _this.videoDataLength += 1;
          _this.videoDataSize += message.data.byteLength;
          flv.emit('videoData', message.data, message.timestamp);
          break;

        case 'audioData':
          _this.audioDataLength += 1;
          _this.audioDataSize += message.data.byteLength;
          flv.emit('audioData', message.data, message.timestamp);
          break;

        default:
          break;
      }
    };
  };

  function fetchRequest(flv, url) {
    flv.emit('streamStart', 'fetch-request');
    return fetch(url, {
      headers: flv.options.headers
    }).then(function (response) {
      var reader = response.body.getReader();
      flv.on('destroy', function () {
        reader.cancel();
      });

      (function read() {
        reader.read().then(function (_ref) {
          var done = _ref.done,
              value = _ref.value;

          if (done) {
            flv.emit('streamEnd');
            return;
          }

          flv.emit('streaming', new Uint8Array(value));
          read();
        }).catch(function (error) {
          throw error;
        });
      })();

      return reader;
    });
  }

  function mozXhrRequest(flv, url) {
    flv.emit('streamStart', 'moz-xhr-request');
    var proxy = flv.events.proxy,
        headers = flv.options.headers;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'moz-chunked-arraybuffer';
    Object.keys(headers).forEach(function (key) {
      xhr.setRequestHeader(key, headers[key]);
    });
    proxy(xhr, 'readystatechange', function () {
      flv.emit('readystatechange', xhr);
    });
    proxy(xhr, 'progress', function () {
      flv.emit('streaming', new Uint8Array(xhr.response));
    });
    proxy(xhr, 'loadend', function () {
      flv.emit('streamEnd');
    });
    proxy(xhr, 'error', function (error) {
      throw error;
    });
    flv.on('destroy', function () {
      xhr.abort();
    });
    xhr.send();
    return xhr;
  }

  function xhrRequest(flv, url) {
    flv.emit('streamStart', 'xhr-request');
    var proxy = flv.events.proxy,
        headers = flv.options.headers;
    var textEncoder = new TextEncoder();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    Object.keys(headers).forEach(function (key) {
      xhr.setRequestHeader(key, headers[key]);
    });
    var index = 0;
    proxy(xhr, 'readystatechange', function () {
      flv.emit('readystatechange', xhr);
    });
    proxy(xhr, 'progress', function () {
      var rawText = xhr.responseText.substr(index);
      index = xhr.responseText.length;
      flv.emit('streaming', textEncoder.encode(rawText, {
        stream: true
      }));
    });
    proxy(xhr, 'loadend', function () {
      flv.emit('streaming', textEncoder.encode('', {
        stream: false
      }));
      flv.emit('streamEnd');
    });
    proxy(xhr, 'error', function (error) {
      throw error;
    });
    flv.on('destroy', function () {
      xhr.abort();
    });
    xhr.send();
    return xhr;
  }

  function websocketRequest(flv, url) {
    flv.emit('streamStart', 'websocket-request');
    var options = flv.options,
        proxy = flv.events.proxy;
    var socket = new WebSocket(url);
    socket.binaryType = 'arraybuffer';
    proxy(socket, 'open', function () {
      socket.send(options.socketSend);
    });
    proxy(socket, 'message', function (event) {
      flv.emit('streaming', new Uint8Array(event.data));
    });
    proxy(socket, 'close', function () {
      flv.emit('streamEnd');
    });
    proxy(socket, 'error', function (error) {
      throw error;
    });
    flv.on('destroy', function () {
      socket.close();
    });
    return socket;
  }

  function readFile(flv, file) {
    flv.emit('streamStart', 'FileReader');
    var proxy = flv.events.proxy;
    var reader = new FileReader();
    proxy(reader, 'load', function (e) {
      var buffer = e.target.result;
      flv.emit('streamEnd', new Uint8Array(buffer));
    });
    reader.readAsArrayBuffer(file);
    return reader;
  }

  var Stream =
  /*#__PURE__*/
  function () {
    function Stream(flv) {
      classCallCheck(this, Stream);

      var url = flv.options.url;
      this.transportFactory = Stream.getStreamFactory(url);
      this.transport = this.transportFactory(flv, url);
    }

    createClass(Stream, null, [{
      key: "supportsXhrResponseType",
      value: function supportsXhrResponseType(type) {
        try {
          var tmpXhr = new XMLHttpRequest();
          tmpXhr.responseType = type;
          return tmpXhr.responseType === type;
        } catch (e) {
          return false;
        }
      }
    }, {
      key: "getStreamFactory",
      value: function getStreamFactory(url) {
        if (url instanceof File) {
          return readFile;
        }

        if (url.startsWith('ws://')) {
          return websocketRequest;
        }

        if (typeof Response !== 'undefined' && Object.prototype.hasOwnProperty.call(Response.prototype, 'body') && typeof Headers === 'function') {
          return fetchRequest;
        }

        var mozChunked = 'moz-chunked-arraybuffer';

        if (Stream.supportsXhrResponseType(mozChunked)) {
          return mozXhrRequest;
        }

        return xhrRequest;
      }
    }]);

    return Stream;
  }();

  var id = 0;

  var FlvPlayer =
  /*#__PURE__*/
  function (_Emitter) {
    inherits(FlvPlayer, _Emitter);

    function FlvPlayer(options) {
      var _this;

      classCallCheck(this, FlvPlayer);

      _this = possibleConstructorReturn(this, getPrototypeOf(FlvPlayer).call(this));
      _this.options = objectSpread({}, FlvPlayer.options, options);

      if (typeof _this.options.container === 'string') {
        _this.options.container = document.querySelector(_this.options.container);
      }

      _this.debug = new Debug(assertThisInitialized(_this));
      _this.events = new Events(assertThisInitialized(_this));
      _this.player = new Player(assertThisInitialized(_this));
      _this.decoder = new Decoder(assertThisInitialized(_this));
      _this.demuxer = new Demuxer(assertThisInitialized(_this));
      _this.stream = new Stream(assertThisInitialized(_this));
      id += 1;
      _this.id = id;
      _this.isDestroy = false;
      _this.userAgent = window.navigator.userAgent;
      _this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(_this.userAgent);
      FlvPlayer.instances.push(assertThisInitialized(_this));
      return _this;
    }

    createClass(FlvPlayer, [{
      key: "destroy",
      value: function destroy() {
        this.events.destroy();
        this.isDestroy = true;
        this.options.container.innerHTML = '';
        FlvPlayer.instances.splice(FlvPlayer.instances.indexOf(this), 1);
        this.emit('destroy');
      }
    }], [{
      key: "options",
      get: function get() {
        return {
          url: '',
          poster: '',
          container: '',
          debug: false,
          live: false,
          loop: false,
          hotkey: true,
          controls: true,
          hasAudio: true,
          volume: 7,
          frameRate: 30,
          width: 400,
          height: 300,
          socketSend: '',
          headers: {}
        };
      }
    }, {
      key: "version",
      get: function get() {
        return '1.0.3';
      }
    }, {
      key: "env",
      get: function get() {
        return '"development"';
      }
    }]);

    return FlvPlayer;
  }(Emitter);

  Object.defineProperty(FlvPlayer, 'instances', {
    value: []
  });

  return FlvPlayer;

}));
//# sourceMappingURL=flvplayer.js.map
