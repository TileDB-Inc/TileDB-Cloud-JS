var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer2(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module.exports = {
      isArray,
      isArrayBuffer: isArrayBuffer2,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected) {
      this.handlers.push({
        fulfilled,
        rejected
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function transformData(data, headers, fns) {
      utils.forEach(fns, function transform(fn) {
        data = fn(data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
    "use strict";
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/axios/lib/core/enhanceError.js"(exports, module) {
    "use strict";
    module.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code
        };
      };
      return error;
    };
  }
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/axios/lib/core/createError.js"(exports, module) {
    "use strict";
    var enhanceError = require_enhanceError();
    module.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    var createError = require_createError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError(
          "Request failed with status code " + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !config.responseType || config.responseType === "text" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(resolve, reject, response);
          request = null;
        };
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(
            timeoutErrorMessage,
            config,
            "ECONNABORTED",
            request
          ));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            if (config.responseType !== "json") {
              throw e;
            }
          }
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }
            request.abort();
            reject(cancel);
            request = null;
          });
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    var defaults = {
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data)) {
          setContentTypeIfUnset(headers, "application/json;charset=utf-8");
          return JSON.stringify(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (e) {
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    defaults.headers = {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData(
        config.data,
        config.headers,
        config.transformRequest
      );
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
      utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData(
          response.data,
          response.headers,
          config.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData(
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      var valueFromConfig2Keys = ["url", "method", "data"];
      var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
      var defaultToConfig2Keys = [
        "baseURL",
        "transformRequest",
        "transformResponse",
        "paramsSerializer",
        "timeout",
        "timeoutMessage",
        "withCredentials",
        "adapter",
        "responseType",
        "xsrfCookieName",
        "xsrfHeaderName",
        "onUploadProgress",
        "onDownloadProgress",
        "decompress",
        "maxContentLength",
        "maxBodyLength",
        "maxRedirects",
        "transport",
        "httpAgent",
        "httpsAgent",
        "cancelToken",
        "socketPath",
        "responseEncoding"
      ];
      var directMergeKeys = ["validateStatus"];
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      }
      utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        }
      });
      utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
      utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
      var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });
      utils.forEach(otherKeys, mergeDeepProperties);
      return config;
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var chain = [dispatchRequest, void 0];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/axios/lib/cancel/Cancel.js"(exports, module) {
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module.exports = Cancel;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module) {
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
    "use strict";
    module.exports = function isAxiosError(payload) {
      return typeof payload === "object" && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig2) {
      var context = new Axios(defaultConfig2);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      return instance;
    }
    var axios2 = createInstance(defaults);
    axios2.Axios = Axios;
    axios2.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios2.defaults, instanceConfig));
    };
    axios2.Cancel = require_Cancel();
    axios2.CancelToken = require_CancelToken();
    axios2.isCancel = require_isCancel();
    axios2.all = function all(promises) {
      return Promise.all(promises);
    };
    axios2.spread = require_spread();
    axios2.isAxiosError = require_isAxiosError();
    module.exports = axios2;
    module.exports.default = axios2;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module) {
    module.exports = require_axios();
  }
});

// node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/tslib/tslib.js"(exports, module) {
    var __extends;
    var __assign;
    var __rest;
    var __decorate;
    var __param;
    var __metadata;
    var __awaiter;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __createBinding;
    (function(factory) {
      var root = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (b.hasOwnProperty(p))
            d[p] = b[p];
      };
      __extends = function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      __rest = function(s, e) {
        var t = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      };
      __decorate = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
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
                  if (t[2])
                    _.ops.pop();
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
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __createBinding = function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __exportStar = function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !exports2.hasOwnProperty(p))
            exports2[p] = m[p];
      };
      __values = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      };
      __spreadArrays = function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __await = function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };
      __asyncGenerator = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      __importStar = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
              result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet = function(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
      };
      __classPrivateFieldSet = function(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
      };
      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    });
  }
});

// node_modules/capnp-ts/lib/serialization/mask.js
var require_mask = __commonJS({
  "node_modules/capnp-ts/lib/serialization/mask.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _makePrimitiveMaskFn(byteLength, setter) {
      return function(x) {
        var dv = new DataView(new ArrayBuffer(byteLength));
        setter.call(dv, 0, x, true);
        return dv;
      };
    }
    exports.getFloat32Mask = _makePrimitiveMaskFn(4, DataView.prototype.setFloat32);
    exports.getFloat64Mask = _makePrimitiveMaskFn(8, DataView.prototype.setFloat64);
    exports.getInt16Mask = _makePrimitiveMaskFn(2, DataView.prototype.setInt16);
    exports.getInt32Mask = _makePrimitiveMaskFn(4, DataView.prototype.setInt32);
    exports.getInt8Mask = _makePrimitiveMaskFn(1, DataView.prototype.setInt8);
    exports.getUint16Mask = _makePrimitiveMaskFn(2, DataView.prototype.setUint16);
    exports.getUint32Mask = _makePrimitiveMaskFn(4, DataView.prototype.setUint32);
    exports.getUint8Mask = _makePrimitiveMaskFn(1, DataView.prototype.setUint8);
    function getBitMask(value, bitOffset) {
      var dv = new DataView(new ArrayBuffer(1));
      if (!value)
        return dv;
      dv.setUint8(0, 1 << bitOffset % 8);
      return dv;
    }
    exports.getBitMask = getBitMask;
    function getInt64Mask(x) {
      return x.toDataView();
    }
    exports.getInt64Mask = getInt64Mask;
    function getUint64Mask(x) {
      return x.toDataView();
    }
    exports.getUint64Mask = getUint64Mask;
  }
});

// node_modules/capnp-ts/lib/serialization/list-element-size.js
var require_list_element_size = __commonJS({
  "node_modules/capnp-ts/lib/serialization/list-element-size.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ListElementSize;
    (function(ListElementSize2) {
      ListElementSize2[ListElementSize2["VOID"] = 0] = "VOID";
      ListElementSize2[ListElementSize2["BIT"] = 1] = "BIT";
      ListElementSize2[ListElementSize2["BYTE"] = 2] = "BYTE";
      ListElementSize2[ListElementSize2["BYTE_2"] = 3] = "BYTE_2";
      ListElementSize2[ListElementSize2["BYTE_4"] = 4] = "BYTE_4";
      ListElementSize2[ListElementSize2["BYTE_8"] = 5] = "BYTE_8";
      ListElementSize2[ListElementSize2["POINTER"] = 6] = "POINTER";
      ListElementSize2[ListElementSize2["COMPOSITE"] = 7] = "COMPOSITE";
    })(ListElementSize = exports.ListElementSize || (exports.ListElementSize = {}));
    exports.ListElementOffset = [
      0,
      0.125,
      1,
      2,
      4,
      8,
      8,
      NaN
    ];
  }
});

// node_modules/capnp-ts/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/capnp-ts/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type2 = typeof val;
      if (type2 === "string" && val.length > 0) {
        return parse(val);
      } else if (type2 === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
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
      var type2 = (match[2] || "ms").toLowerCase();
      switch (type2) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// node_modules/capnp-ts/node_modules/debug/src/debug.js
var require_debug = __commonJS({
  "node_modules/capnp-ts/node_modules/debug/src/debug.js"(exports, module) {
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require_ms();
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      function debug() {
        if (!debug.enabled)
          return;
        var self2 = debug;
        var curr = +new Date();
        var ms = curr - (prevTime || curr);
        self2.diff = ms;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%")
            return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self2, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self2, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self2, args);
      }
      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);
      if ("function" === typeof exports.init) {
        exports.init(debug);
      }
      return debug;
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (var i = 0; i < len; i++) {
        if (!split[i])
          continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      exports.enable("");
    }
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
    function coerce(val) {
      if (val instanceof Error)
        return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/capnp-ts/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/capnp-ts/node_modules/debug/src/browser.js"(exports, module) {
    exports = module.exports = require_debug();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save2;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2)
        return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match)
          return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save2(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/capnp-ts/lib/constants.js
var require_constants = __commonJS({
  "node_modules/capnp-ts/lib/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tmpWord = new DataView(new ArrayBuffer(8));
    new Uint16Array(tmpWord.buffer)[0] = 258;
    exports.DEFAULT_BUFFER_SIZE = 4096;
    exports.DEFAULT_DECODE_LIMIT = 64 << 20;
    exports.DEFAULT_DEPTH_LIMIT = 64;
    exports.DEFAULT_TRAVERSE_LIMIT = 64 << 20;
    exports.GROWTH_FACTOR = 1.5;
    exports.LIST_SIZE_MASK = 7;
    exports.MAX_BUFFER_DUMP_BYTES = 8192;
    exports.MAX_INT32 = 2147483647;
    exports.MAX_UINT32 = 4294967295;
    exports.MAX_SAFE_INTEGER = 9007199254740991;
    exports.MAX_STREAM_SEGMENTS = 512;
    exports.MIN_SAFE_INTEGER = -9007199254740991;
    exports.MIN_SINGLE_SEGMENT_GROWTH = 4096;
    exports.NATIVE_LITTLE_ENDIAN = tmpWord.getUint8(0) === 2;
    exports.PACK_SPAN_THRESHOLD = 2;
    exports.POINTER_COPY_LIMIT = 32;
    exports.POINTER_DOUBLE_FAR_MASK = 4;
    exports.POINTER_TYPE_MASK = 3;
    exports.VAL32 = 4294967296;
    exports.MAX_DEPTH = exports.MAX_INT32;
    exports.MAX_SEGMENT_LENGTH = exports.MAX_UINT32;
  }
});

// node_modules/capnp-ts/lib/errors.js
var require_errors = __commonJS({
  "node_modules/capnp-ts/lib/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var constants_1 = require_constants();
    var trace = debug_1.default("capnp:errors");
    trace("load");
    exports.INVARIANT_UNREACHABLE_CODE = "CAPNP-TS000 Unreachable code detected.";
    function assertNever(n) {
      throw new Error(exports.INVARIANT_UNREACHABLE_CODE + (" (never block hit with: " + n + ")"));
    }
    exports.assertNever = assertNever;
    exports.MSG_INVALID_FRAME_HEADER = "CAPNP-TS001 Attempted to parse an invalid message frame header; are you sure this is a Cap'n Proto message?";
    exports.MSG_NO_SEGMENTS_IN_ARENA = "CAPNP-TS002 Attempted to preallocate a message with no segments in the arena.";
    exports.MSG_PACK_NOT_WORD_ALIGNED = "CAPNP-TS003 Attempted to pack a message that was not word-aligned.";
    exports.MSG_SEGMENT_OUT_OF_BOUNDS = "CAPNP-TS004 Segment ID %X is out of bounds for message %s.";
    exports.MSG_SEGMENT_TOO_SMALL = "CAPNP-TS005 First segment must have at least enough room to hold the root pointer (8 bytes).";
    exports.NOT_IMPLEMENTED = "CAPNP-TS006 %s is not implemented.";
    exports.PTR_ADOPT_COMPOSITE_STRUCT = "CAPNP-TS007 Attempted to adopt a struct into a composite list (%s).";
    exports.PTR_ADOPT_WRONG_MESSAGE = "CAPNP-TS008 Attempted to adopt %s into a pointer in a different message %s.";
    exports.PTR_ALREADY_ADOPTED = "CAPNP-TS009 Attempted to adopt %s more than once.";
    exports.PTR_COMPOSITE_SIZE_UNDEFINED = "CAPNP-TS010 Attempted to set a composite list without providing a composite element size.";
    exports.PTR_DEPTH_LIMIT_EXCEEDED = "CAPNP-TS011 Nesting depth limit exceeded for %s.";
    exports.PTR_DISOWN_COMPOSITE_STRUCT = "CAPNP-TS012 Attempted to disown a struct member from a composite list (%s).";
    exports.PTR_INIT_COMPOSITE_STRUCT = "CAPNP-TS013 Attempted to initialize a struct member from a composite list (%s).";
    exports.PTR_INIT_NON_GROUP = "CAPNP-TS014 Attempted to initialize a group field with a non-group struct class.";
    exports.PTR_INVALID_FAR_TARGET = "CAPNP-TS015 Target of a far pointer (%s) is another far pointer.";
    exports.PTR_INVALID_LIST_SIZE = "CAPNP-TS016 Invalid list element size: %x.";
    exports.PTR_INVALID_POINTER_TYPE = "CAPNP-TS017 Invalid pointer type: %x.";
    exports.PTR_INVALID_UNION_ACCESS = "CAPNP-TS018 Attempted to access getter on %s for union field %s that is not currently set (wanted: %d, found: %d).";
    exports.PTR_OFFSET_OUT_OF_BOUNDS = "CAPNP-TS019 Pointer offset %a is out of bounds for underlying buffer.";
    exports.PTR_STRUCT_DATA_OUT_OF_BOUNDS = "CAPNP-TS020 Attempted to access out-of-bounds struct data (struct: %s, %d bytes at %a, data words: %d).";
    exports.PTR_STRUCT_POINTER_OUT_OF_BOUNDS = "CAPNP-TS021 Attempted to access out-of-bounds struct pointer (%s, index: %d, length: %d).";
    exports.PTR_TRAVERSAL_LIMIT_EXCEEDED = "CAPNP-TS022 Traversal limit exceeded! Slow down! %s";
    exports.PTR_WRONG_LIST_TYPE = "CAPNP-TS023 Cannot convert %s to a %s list.";
    exports.PTR_WRONG_POINTER_TYPE = "CAPNP-TS024 Attempted to convert pointer %s to a %s type.";
    exports.PTR_WRONG_COMPOSITE_DATA_SIZE = "CAPNP-TS025 Attempted to convert %s to a composite list with the wrong data size (found: %d).";
    exports.PTR_WRONG_COMPOSITE_PTR_SIZE = "CAPNP-TS026 Attempted to convert %s to a composite list with the wrong pointer size (found: %d).";
    exports.PTR_WRONG_STRUCT_DATA_SIZE = "CAPNP-TS027 Attempted to convert %s to a struct with the wrong data size (found: %d).";
    exports.PTR_WRONG_STRUCT_PTR_SIZE = "CAPNP-TS028 Attempted to convert %s to a struct with the wrong pointer size (found: %d).";
    exports.RANGE_INT32_OVERFLOW = "CAPNP-TS029 32-bit signed integer overflow detected.";
    exports.RANGE_INT64_UNDERFLOW = "CAPNP-TS030 Buffer is not large enough to hold a word.";
    exports.RANGE_INVALID_UTF8 = "CAPNP-TS031 Invalid UTF-8 code sequence detected.";
    exports.RANGE_SIZE_OVERFLOW = "CAPNP-TS032 Size %x exceeds maximum " + constants_1.MAX_SEGMENT_LENGTH.toString(16) + ".";
    exports.RANGE_UINT32_OVERFLOW = "CAPNP-TS033 32-bit unsigned integer overflow detected.";
    exports.SEG_BUFFER_NOT_ALLOCATED = "CAPNP-TS034 allocate() needs to be called at least once before getting a buffer.";
    exports.SEG_GET_NON_ZERO_SINGLE = "CAPNP-TS035 Attempted to get a segment other than 0 (%d) from a single segment arena.";
    exports.SEG_ID_OUT_OF_BOUNDS = "CAPNP-TS036 Attempted to get an out-of-bounds segment (%d).";
    exports.SEG_NOT_WORD_ALIGNED = "CAPNP-TS037 Segment buffer length %d is not a multiple of 8.";
    exports.SEG_REPLACEMENT_BUFFER_TOO_SMALL = "CAPNP-TS038 Attempted to replace a segment buffer with one that is smaller than the allocated space.";
    exports.SEG_SIZE_OVERFLOW = "CAPNP-TS039 Requested size %x exceeds maximum value (" + constants_1.MAX_SEGMENT_LENGTH + ").";
    exports.TYPE_COMPOSITE_SIZE_UNDEFINED = "CAPNP-TS040 Must provide a composite element size for composite list pointers.";
    exports.TYPE_GET_GENERIC_LIST = "CAPNP-TS041 Attempted to call get() on a generic list.";
    exports.TYPE_SET_GENERIC_LIST = "CAPNP-TS042 Attempted to call set() on a generic list.";
    exports.PTR_WRITE_CONST_LIST = "CAPNP-TS043 Attempted to write to a const list.";
    exports.PTR_WRITE_CONST_STRUCT = "CAPNP-TS044 Attempted to write to a const struct.";
  }
});

// node_modules/capnp-ts/lib/util.js
var require_util = __commonJS({
  "node_modules/capnp-ts/lib/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    var trace = debug_1.default("capnp:util");
    trace("load");
    function bufferToHex(buffer) {
      var a = new Uint8Array(buffer);
      var h = [];
      for (var i = 0; i < a.byteLength; i++)
        h.push(pad(a[i].toString(16), 2));
      return "[" + h.join(" ") + "]";
    }
    exports.bufferToHex = bufferToHex;
    function checkInt32(value) {
      if (value > constants_1.MAX_INT32 || value < -constants_1.MAX_INT32) {
        throw new RangeError(errors_1.RANGE_INT32_OVERFLOW);
      }
      return value;
    }
    exports.checkInt32 = checkInt32;
    function checkUint32(value) {
      if (value < 0 || value > constants_1.MAX_UINT32) {
        throw new RangeError(errors_1.RANGE_UINT32_OVERFLOW);
      }
      return value;
    }
    exports.checkUint32 = checkUint32;
    function decodeUtf8(src) {
      var l = src.byteLength;
      var dst = "";
      var i = 0;
      var cp = 0;
      var a = 0;
      var b = 0;
      var c = 0;
      var d = 0;
      while (i < l) {
        a = src[i++];
        if ((a & 128) === 0) {
          cp = a;
        } else if ((a & 224) === 192) {
          if (i >= l)
            throw new RangeError(errors_1.RANGE_INVALID_UTF8);
          b = src[i++];
          cp = (a & 31) << 6 | b & 63;
        } else if ((a & 240) === 224) {
          if (i + 1 >= l)
            throw new RangeError(errors_1.RANGE_INVALID_UTF8);
          b = src[i++];
          c = src[i++];
          cp = (a & 15) << 12 | (b & 63) << 6 | c & 63;
        } else if ((a & 248) === 240) {
          if (i + 2 >= l)
            throw new RangeError(errors_1.RANGE_INVALID_UTF8);
          b = src[i++];
          c = src[i++];
          d = src[i++];
          cp = (a & 7) << 18 | (b & 63) << 12 | (c & 63) << 6 | d & 63;
        } else {
          throw new RangeError(errors_1.RANGE_INVALID_UTF8);
        }
        if (cp <= 55295 || cp >= 57344 && cp <= 65535) {
          dst += String.fromCharCode(cp);
        } else {
          cp -= 65536;
          var hi = (cp >>> 10) + 55296;
          var lo = (cp & 1023) + 56320;
          if (hi < 55296 || hi > 56319)
            throw new RangeError(errors_1.RANGE_INVALID_UTF8);
          dst += String.fromCharCode(hi, lo);
        }
      }
      return dst;
    }
    exports.decodeUtf8 = decodeUtf8;
    function dumpBuffer(buffer) {
      var b = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      var byteLength = Math.min(b.byteLength, constants_1.MAX_BUFFER_DUMP_BYTES);
      var r = format("\n=== buffer[%d] ===", byteLength);
      for (var j = 0; j < byteLength; j += 16) {
        r += "\n" + pad(j.toString(16), 8) + ": ";
        var s = "";
        var k = void 0;
        for (k = 0; k < 16 && j + k < b.byteLength; k++) {
          var v = b[j + k];
          r += pad(v.toString(16), 2) + " ";
          s += v > 31 && v < 255 ? String.fromCharCode(v) : "\xB7";
          if (k === 7)
            r += " ";
        }
        r += "" + repeat((17 - k) * 3, " ") + s;
      }
      r += "\n";
      if (byteLength !== b.byteLength) {
        r += format("=== (truncated %d bytes) ===\n", b.byteLength - byteLength);
      }
      return r;
    }
    exports.dumpBuffer = dumpBuffer;
    function encodeUtf8(src) {
      var l = src.length;
      var dst = new Uint8Array(new ArrayBuffer(l * 4));
      var j = 0;
      for (var i = 0; i < l; i++) {
        var c = src.charCodeAt(i);
        if (c <= 127) {
          dst[j++] = c;
        } else if (c <= 2047) {
          dst[j++] = 192 | c >>> 6;
          dst[j++] = 128 | c >>> 0 & 63;
        } else if (c <= 55295 || c >= 57344) {
          dst[j++] = 224 | c >>> 12;
          dst[j++] = 128 | c >>> 6 & 63;
          dst[j++] = 128 | c >>> 0 & 63;
        } else {
          if (i + 1 >= l)
            throw new RangeError(errors_1.RANGE_INVALID_UTF8);
          var hi = c - 55296;
          var lo = src.charCodeAt(++i) - 56320;
          var cp = (hi << 10 | lo) + 65536;
          dst[j++] = 240 | cp >>> 18;
          dst[j++] = 128 | cp >>> 12 & 63;
          dst[j++] = 128 | cp >>> 6 & 63;
          dst[j++] = 128 | cp >>> 0 & 63;
        }
      }
      return dst.subarray(0, j);
    }
    exports.encodeUtf8 = encodeUtf8;
    function format(s) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var n = s.length;
      var arg;
      var argIndex = 0;
      var c;
      var escaped = false;
      var i = 0;
      var leadingZero = false;
      var precision;
      var result = "";
      function nextArg() {
        return args[argIndex++];
      }
      function slurpNumber() {
        var digits = "";
        while (/\d/.test(s[i])) {
          digits += s[i++];
          c = s[i];
        }
        return digits.length > 0 ? parseInt(digits, 10) : null;
      }
      for (; i < n; ++i) {
        c = s[i];
        if (escaped) {
          escaped = false;
          if (c === ".") {
            leadingZero = false;
            c = s[++i];
          } else if (c === "0" && s[i + 1] === ".") {
            leadingZero = true;
            i += 2;
            c = s[i];
          } else {
            leadingZero = true;
          }
          precision = slurpNumber();
          switch (c) {
            case "a":
              result += "0x" + pad(parseInt(nextArg(), 10).toString(16), 8);
              break;
            case "b":
              result += parseInt(nextArg(), 10).toString(2);
              break;
            case "c":
              arg = nextArg();
              if (typeof arg === "string" || arg instanceof String) {
                result += arg;
              } else {
                result += String.fromCharCode(parseInt(arg, 10));
              }
              break;
            case "d":
              result += parseInt(nextArg(), 10);
              break;
            case "f":
              var tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
              result += leadingZero ? tmp : tmp.replace(/^0/, "");
              break;
            case "j":
              result += JSON.stringify(nextArg());
              break;
            case "o":
              result += "0" + parseInt(nextArg(), 10).toString(8);
              break;
            case "s":
              result += nextArg();
              break;
            case "x":
              result += "0x" + parseInt(nextArg(), 10).toString(16);
              break;
            case "X":
              result += "0x" + parseInt(nextArg(), 10).toString(16).toUpperCase();
              break;
            default:
              result += c;
              break;
          }
        } else if (c === "%") {
          escaped = true;
        } else {
          result += c;
        }
      }
      return result;
    }
    exports.format = format;
    function identity(x) {
      return x;
    }
    exports.identity = identity;
    function pad(v, width, pad2) {
      if (pad2 === void 0) {
        pad2 = "0";
      }
      return v.length >= width ? v : new Array(width - v.length + 1).join(pad2) + v;
    }
    exports.pad = pad;
    function padToWord(size) {
      return size + 7 & ~7;
    }
    exports.padToWord = padToWord;
    function repeat(times, str) {
      var out = "";
      var n = times;
      var s = str;
      if (n < 1 || n > Number.MAX_VALUE)
        return out;
      do {
        if (n % 2)
          out += s;
        n = Math.floor(n / 2);
        if (n)
          s += s;
      } while (n);
      return out;
    }
    exports.repeat = repeat;
    debug_1.default.formatters["h"] = function(v) {
      return v.toString("hex");
    };
    debug_1.default.formatters["x"] = function(v) {
      return "0x" + v.toString(16);
    };
    debug_1.default.formatters["a"] = function(v) {
      return "0x" + pad(v.toString(16), 8);
    };
    debug_1.default.formatters["X"] = function(v) {
      return "0x" + v.toString(16).toUpperCase();
    };
  }
});

// node_modules/capnp-ts/lib/serialization/arena/arena-kind.js
var require_arena_kind = __commonJS({
  "node_modules/capnp-ts/lib/serialization/arena/arena-kind.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArenaKind;
    (function(ArenaKind2) {
      ArenaKind2[ArenaKind2["SINGLE_SEGMENT"] = 0] = "SINGLE_SEGMENT";
      ArenaKind2[ArenaKind2["MULTI_SEGMENT"] = 1] = "MULTI_SEGMENT";
    })(ArenaKind = exports.ArenaKind || (exports.ArenaKind = {}));
  }
});

// node_modules/capnp-ts/lib/serialization/arena/arena-allocation-result.js
var require_arena_allocation_result = __commonJS({
  "node_modules/capnp-ts/lib/serialization/arena/arena-allocation-result.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var trace = debug_1.default("capnp:serialization:arena:arena-allocation-result");
    trace("load");
    var ArenaAllocationResult = function() {
      function ArenaAllocationResult2(id, buffer) {
        this.id = id;
        this.buffer = buffer;
        trace("new", this);
      }
      return ArenaAllocationResult2;
    }();
    exports.ArenaAllocationResult = ArenaAllocationResult;
  }
});

// node_modules/capnp-ts/lib/serialization/arena/multi-segment-arena.js
var require_multi_segment_arena = __commonJS({
  "node_modules/capnp-ts/lib/serialization/arena/multi-segment-arena.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    var util_1 = require_util();
    var arena_allocation_result_1 = require_arena_allocation_result();
    var arena_kind_1 = require_arena_kind();
    var trace = debug_1.default("capnp:arena:multi");
    trace("load");
    var MultiSegmentArena = function() {
      function MultiSegmentArena2(buffers) {
        if (buffers === void 0) {
          buffers = [];
        }
        this.kind = arena_kind_1.ArenaKind.MULTI_SEGMENT;
        this.buffers = buffers;
        trace("new %s", this);
      }
      MultiSegmentArena2.prototype.toString = function() {
        return util_1.format("MultiSegmentArena_segments:%d", getNumSegments(this));
      };
      MultiSegmentArena2.allocate = allocate;
      MultiSegmentArena2.getBuffer = getBuffer;
      MultiSegmentArena2.getNumSegments = getNumSegments;
      return MultiSegmentArena2;
    }();
    exports.MultiSegmentArena = MultiSegmentArena;
    function allocate(minSize, m) {
      var b = new ArrayBuffer(util_1.padToWord(Math.max(minSize, constants_1.DEFAULT_BUFFER_SIZE)));
      m.buffers.push(b);
      return new arena_allocation_result_1.ArenaAllocationResult(m.buffers.length - 1, b);
    }
    exports.allocate = allocate;
    function getBuffer(id, m) {
      if (id < 0 || id >= m.buffers.length) {
        throw new Error(util_1.format(errors_1.SEG_ID_OUT_OF_BOUNDS, id));
      }
      return m.buffers[id];
    }
    exports.getBuffer = getBuffer;
    function getNumSegments(m) {
      return m.buffers.length;
    }
    exports.getNumSegments = getNumSegments;
  }
});

// node_modules/capnp-ts/lib/serialization/arena/single-segment-arena.js
var require_single_segment_arena = __commonJS({
  "node_modules/capnp-ts/lib/serialization/arena/single-segment-arena.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    var util_1 = require_util();
    var arena_allocation_result_1 = require_arena_allocation_result();
    var arena_kind_1 = require_arena_kind();
    var trace = debug_1.default("capnp:arena:single");
    trace("load");
    var SingleSegmentArena = function() {
      function SingleSegmentArena2(buffer) {
        if (buffer === void 0) {
          buffer = new ArrayBuffer(constants_1.DEFAULT_BUFFER_SIZE);
        }
        this.kind = arena_kind_1.ArenaKind.SINGLE_SEGMENT;
        if ((buffer.byteLength & 7) !== 0) {
          throw new Error(util_1.format(errors_1.SEG_NOT_WORD_ALIGNED, buffer.byteLength));
        }
        this.buffer = buffer;
        trace("new %s", this);
      }
      SingleSegmentArena2.prototype.toString = function() {
        return util_1.format("SingleSegmentArena_len:%x", this.buffer.byteLength);
      };
      SingleSegmentArena2.allocate = allocate;
      SingleSegmentArena2.getBuffer = getBuffer;
      SingleSegmentArena2.getNumSegments = getNumSegments;
      return SingleSegmentArena2;
    }();
    exports.SingleSegmentArena = SingleSegmentArena;
    function allocate(minSize, segments, s) {
      trace("Allocating %x bytes for segment 0 in %s.", minSize, s);
      var srcBuffer = segments.length > 0 ? segments[0].buffer : s.buffer;
      if (minSize < constants_1.MIN_SINGLE_SEGMENT_GROWTH) {
        minSize = constants_1.MIN_SINGLE_SEGMENT_GROWTH;
      } else {
        minSize = util_1.padToWord(minSize);
      }
      s.buffer = new ArrayBuffer(srcBuffer.byteLength + minSize);
      new Float64Array(s.buffer).set(new Float64Array(srcBuffer));
      return new arena_allocation_result_1.ArenaAllocationResult(0, s.buffer);
    }
    exports.allocate = allocate;
    function getBuffer(id, s) {
      if (id !== 0)
        throw new Error(util_1.format(errors_1.SEG_GET_NON_ZERO_SINGLE, id));
      return s.buffer;
    }
    exports.getBuffer = getBuffer;
    function getNumSegments() {
      return 1;
    }
    exports.getNumSegments = getNumSegments;
  }
});

// node_modules/capnp-ts/lib/serialization/arena/arena.js
var require_arena = __commonJS({
  "node_modules/capnp-ts/lib/serialization/arena/arena.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var errors_1 = require_errors();
    var arena_kind_1 = require_arena_kind();
    var multi_segment_arena_1 = require_multi_segment_arena();
    var single_segment_arena_1 = require_single_segment_arena();
    var trace = debug_1.default("capnp:arena");
    trace("load");
    var Arena = function() {
      function Arena2() {
      }
      Arena2.allocate = allocate;
      Arena2.getBuffer = getBuffer;
      Arena2.getNumSegments = getNumSegments;
      return Arena2;
    }();
    exports.Arena = Arena;
    function allocate(minSize, segments, a) {
      switch (a.kind) {
        case arena_kind_1.ArenaKind.MULTI_SEGMENT:
          return multi_segment_arena_1.MultiSegmentArena.allocate(minSize, a);
        case arena_kind_1.ArenaKind.SINGLE_SEGMENT:
          return single_segment_arena_1.SingleSegmentArena.allocate(minSize, segments, a);
        default:
          return errors_1.assertNever(a);
      }
    }
    exports.allocate = allocate;
    function getBuffer(id, a) {
      switch (a.kind) {
        case arena_kind_1.ArenaKind.MULTI_SEGMENT:
          return multi_segment_arena_1.MultiSegmentArena.getBuffer(id, a);
        case arena_kind_1.ArenaKind.SINGLE_SEGMENT:
          return single_segment_arena_1.SingleSegmentArena.getBuffer(id, a);
        default:
          return errors_1.assertNever(a);
      }
    }
    exports.getBuffer = getBuffer;
    function getNumSegments(a) {
      switch (a.kind) {
        case arena_kind_1.ArenaKind.MULTI_SEGMENT:
          return multi_segment_arena_1.MultiSegmentArena.getNumSegments(a);
        case arena_kind_1.ArenaKind.SINGLE_SEGMENT:
          return single_segment_arena_1.SingleSegmentArena.getNumSegments();
        default:
          return errors_1.assertNever(a);
      }
    }
    exports.getNumSegments = getNumSegments;
  }
});

// node_modules/capnp-ts/lib/serialization/arena/index.js
var require_arena2 = __commonJS({
  "node_modules/capnp-ts/lib/serialization/arena/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var arena_1 = require_arena();
    exports.Arena = arena_1.Arena;
    var arena_kind_1 = require_arena_kind();
    exports.ArenaKind = arena_kind_1.ArenaKind;
    var multi_segment_arena_1 = require_multi_segment_arena();
    exports.MultiSegmentArena = multi_segment_arena_1.MultiSegmentArena;
    var single_segment_arena_1 = require_single_segment_arena();
    exports.SingleSegmentArena = single_segment_arena_1.SingleSegmentArena;
  }
});

// node_modules/capnp-ts/lib/serialization/packing.js
var require_packing = __commonJS({
  "node_modules/capnp-ts/lib/serialization/packing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    function getHammingWeight(x) {
      var w = x - (x >> 1 & 1431655765);
      w = (w & 858993459) + (w >> 2 & 858993459);
      return (w + (w >> 4) & 252645135) * 16843009 >> 24;
    }
    exports.getHammingWeight = getHammingWeight;
    function getTagByte(a, b, c, d, e, f, g, h) {
      return (a === 0 ? 0 : 1) | (b === 0 ? 0 : 2) | (c === 0 ? 0 : 4) | (d === 0 ? 0 : 8) | (e === 0 ? 0 : 16) | (f === 0 ? 0 : 32) | (g === 0 ? 0 : 64) | (h === 0 ? 0 : 128);
    }
    exports.getTagByte = getTagByte;
    function getUnpackedByteLength(packed) {
      var p = new Uint8Array(packed);
      var wordLength = 0;
      var lastTag = 119;
      for (var i = 0; i < p.byteLength; ) {
        var tag = p[i];
        if (lastTag === 0) {
          wordLength += tag;
          i++;
          lastTag = 119;
        } else if (lastTag === 255) {
          wordLength += tag;
          i += tag * 8 + 1;
          lastTag = 119;
        } else {
          wordLength++;
          i += getHammingWeight(tag) + 1;
          lastTag = tag;
        }
      }
      return wordLength * 8;
    }
    exports.getUnpackedByteLength = getUnpackedByteLength;
    function getZeroByteCount(a, b, c, d, e, f, g, h) {
      return (a === 0 ? 1 : 0) + (b === 0 ? 1 : 0) + (c === 0 ? 1 : 0) + (d === 0 ? 1 : 0) + (e === 0 ? 1 : 0) + (f === 0 ? 1 : 0) + (g === 0 ? 1 : 0) + (h === 0 ? 1 : 0);
    }
    exports.getZeroByteCount = getZeroByteCount;
    function pack(unpacked, byteOffset, byteLength) {
      if (byteOffset === void 0) {
        byteOffset = 0;
      }
      if (unpacked.byteLength % 8 !== 0)
        throw new Error(errors_1.MSG_PACK_NOT_WORD_ALIGNED);
      var src = new Uint8Array(unpacked, byteOffset, byteLength);
      var dst = [];
      var lastTag = 119;
      var spanTagOffset = NaN;
      var spanWordLength = 0;
      var spanThreshold = constants_1.PACK_SPAN_THRESHOLD;
      for (var srcByteOffset = 0; srcByteOffset < src.byteLength; srcByteOffset += 8) {
        var a = src[srcByteOffset];
        var b = src[srcByteOffset + 1];
        var c = src[srcByteOffset + 2];
        var d = src[srcByteOffset + 3];
        var e = src[srcByteOffset + 4];
        var f = src[srcByteOffset + 5];
        var g = src[srcByteOffset + 6];
        var h = src[srcByteOffset + 7];
        var tag = getTagByte(a, b, c, d, e, f, g, h);
        var skipWriteWord = true;
        switch (lastTag) {
          case 0:
            if (tag !== 0 || spanWordLength >= 255) {
              dst.push(spanWordLength);
              spanWordLength = 0;
              skipWriteWord = false;
            } else {
              spanWordLength++;
            }
            break;
          case 255:
            var zeroCount = getZeroByteCount(a, b, c, d, e, f, g, h);
            spanThreshold -= zeroCount;
            if (spanThreshold <= 0 || spanWordLength >= 255) {
              dst[spanTagOffset] = spanWordLength;
              spanWordLength = 0;
              spanThreshold = constants_1.PACK_SPAN_THRESHOLD;
              skipWriteWord = false;
            } else {
              dst.push(a, b, c, d, e, f, g, h);
              spanWordLength++;
            }
            break;
          default:
            skipWriteWord = false;
            break;
        }
        if (skipWriteWord)
          continue;
        dst.push(tag);
        lastTag = tag;
        if (a !== 0)
          dst.push(a);
        if (b !== 0)
          dst.push(b);
        if (c !== 0)
          dst.push(c);
        if (d !== 0)
          dst.push(d);
        if (e !== 0)
          dst.push(e);
        if (f !== 0)
          dst.push(f);
        if (g !== 0)
          dst.push(g);
        if (h !== 0)
          dst.push(h);
        if (tag === 255) {
          spanTagOffset = dst.length;
          dst.push(0);
        }
      }
      if (lastTag === 0) {
        dst.push(spanWordLength);
      } else if (lastTag === 255) {
        dst[spanTagOffset] = spanWordLength;
      }
      return new Uint8Array(dst).buffer;
    }
    exports.pack = pack;
    function unpack(packed) {
      var src = new Uint8Array(packed);
      var dst = new Uint8Array(new ArrayBuffer(getUnpackedByteLength(packed)));
      var lastTag = 119;
      for (var srcByteOffset = 0, dstByteOffset = 0; srcByteOffset < src.byteLength; ) {
        var tag = src[srcByteOffset];
        if (lastTag === 0) {
          dstByteOffset += tag * 8;
          srcByteOffset++;
          lastTag = 119;
        } else if (lastTag === 255) {
          var spanByteLength = tag * 8;
          dst.set(src.subarray(srcByteOffset + 1, srcByteOffset + 1 + spanByteLength), dstByteOffset);
          dstByteOffset += spanByteLength;
          srcByteOffset += 1 + spanByteLength;
          lastTag = 119;
        } else {
          srcByteOffset++;
          for (var i = 1; i <= 128; i <<= 1) {
            if ((tag & i) !== 0)
              dst[dstByteOffset] = src[srcByteOffset++];
            dstByteOffset++;
          }
          lastTag = tag;
        }
      }
      return dst.buffer;
    }
    exports.unpack = unpack;
  }
});

// node_modules/capnp-ts/lib/serialization/object-size.js
var require_object_size = __commonJS({
  "node_modules/capnp-ts/lib/serialization/object-size.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var _ = require_util();
    var trace = debug_1.default("capnp:object-size");
    trace("load");
    var ObjectSize = function() {
      function ObjectSize2(dataByteLength, pointerCount) {
        this.dataByteLength = dataByteLength;
        this.pointerLength = pointerCount;
      }
      ObjectSize2.prototype.toString = function() {
        return _.format("ObjectSize_dw:%d,pc:%d", getDataWordLength(this), this.pointerLength);
      };
      return ObjectSize2;
    }();
    exports.ObjectSize = ObjectSize;
    function getByteLength(o) {
      return o.dataByteLength + o.pointerLength * 8;
    }
    exports.getByteLength = getByteLength;
    function getDataWordLength(o) {
      return o.dataByteLength / 8;
    }
    exports.getDataWordLength = getDataWordLength;
    function getWordLength(o) {
      return o.dataByteLength / 8 + o.pointerLength;
    }
    exports.getWordLength = getWordLength;
    function padToWord(o) {
      return new ObjectSize(_.padToWord(o.dataByteLength), o.pointerLength);
    }
    exports.padToWord = padToWord;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/pointer-type.js
var require_pointer_type = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/pointer-type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PointerType;
    (function(PointerType2) {
      PointerType2[PointerType2["STRUCT"] = 0] = "STRUCT";
      PointerType2[PointerType2["LIST"] = 1] = "LIST";
      PointerType2[PointerType2["FAR"] = 2] = "FAR";
      PointerType2[PointerType2["OTHER"] = 3] = "OTHER";
    })(PointerType = exports.PointerType || (exports.PointerType = {}));
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/orphan.js
var require_orphan = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/orphan.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var errors_1 = require_errors();
    var util_1 = require_util();
    var list_element_size_1 = require_list_element_size();
    var object_size_1 = require_object_size();
    var pointer_1 = require_pointer();
    var pointer_type_1 = require_pointer_type();
    var trace = debug_1.default("capnp:orphan");
    trace("load");
    var Orphan = function() {
      function Orphan2(src) {
        var c = pointer_1.getContent(src);
        this.segment = c.segment;
        this.byteOffset = c.byteOffset;
        this._capnp = {};
        this._capnp.type = pointer_1.getTargetPointerType(src);
        switch (this._capnp.type) {
          case pointer_type_1.PointerType.STRUCT:
            this._capnp.size = pointer_1.getTargetStructSize(src);
            break;
          case pointer_type_1.PointerType.LIST:
            this._capnp.length = pointer_1.getTargetListLength(src);
            this._capnp.elementSize = pointer_1.getTargetListElementSize(src);
            if (this._capnp.elementSize === list_element_size_1.ListElementSize.COMPOSITE) {
              this._capnp.size = pointer_1.getTargetCompositeListSize(src);
            }
            break;
          case pointer_type_1.PointerType.OTHER:
            this._capnp.capId = pointer_1.getCapabilityId(src);
            break;
          default:
            throw new Error(errors_1.PTR_INVALID_POINTER_TYPE);
        }
        pointer_1.erasePointer(src);
      }
      Orphan2.prototype._moveTo = function(dst) {
        if (this._capnp === void 0) {
          throw new Error(util_1.format(errors_1.PTR_ALREADY_ADOPTED, this));
        }
        if (this.segment.message !== dst.segment.message) {
          throw new Error(util_1.format(errors_1.PTR_ADOPT_WRONG_MESSAGE, this, dst));
        }
        pointer_1.erase(dst);
        var res = pointer_1.initPointer(this.segment, this.byteOffset, dst);
        switch (this._capnp.type) {
          case pointer_type_1.PointerType.STRUCT:
            pointer_1.setStructPointer(res.offsetWords, this._capnp.size, res.pointer);
            break;
          case pointer_type_1.PointerType.LIST:
            var offsetWords = res.offsetWords;
            if (this._capnp.elementSize === list_element_size_1.ListElementSize.COMPOSITE) {
              offsetWords--;
            }
            pointer_1.setListPointer(offsetWords, this._capnp.elementSize, this._capnp.length, res.pointer, this._capnp.size);
            break;
          case pointer_type_1.PointerType.OTHER:
            pointer_1.setInterfacePointer(this._capnp.capId, res.pointer);
            break;
          default:
            throw new Error(errors_1.PTR_INVALID_POINTER_TYPE);
        }
        this._capnp = void 0;
      };
      Orphan2.prototype.dispose = function() {
        if (this._capnp === void 0) {
          trace("not disposing an already disposed orphan", this);
          return;
        }
        switch (this._capnp.type) {
          case pointer_type_1.PointerType.STRUCT:
            this.segment.fillZeroWords(this.byteOffset, object_size_1.getWordLength(this._capnp.size));
            break;
          case pointer_type_1.PointerType.LIST:
            var byteLength = pointer_1.getListByteLength(this._capnp.elementSize, this._capnp.length, this._capnp.size);
            this.segment.fillZeroWords(this.byteOffset, byteLength);
            break;
          default:
            break;
        }
        this._capnp = void 0;
      };
      Orphan2.prototype.toString = function() {
        return util_1.format("Orphan_%d@%a,type:%s", this.segment.id, this.byteOffset, this._capnp && this._capnp.type);
      };
      return Orphan2;
    }();
    exports.Orphan = Orphan;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/pointer-allocation-result.js
var require_pointer_allocation_result = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/pointer-allocation-result.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var trace = debug_1.default("capnp:pointer-allocation-result");
    trace("load");
    var PointerAllocationResult = function() {
      function PointerAllocationResult2(pointer, offsetWords) {
        this.pointer = pointer;
        this.offsetWords = offsetWords;
      }
      return PointerAllocationResult2;
    }();
    exports.PointerAllocationResult = PointerAllocationResult;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/pointer.js
var require_pointer = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/pointer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var constants_1 = require_constants();
    var util_1 = require_util();
    var list_element_size_1 = require_list_element_size();
    var object_size_1 = require_object_size();
    var orphan_1 = require_orphan();
    var pointer_allocation_result_1 = require_pointer_allocation_result();
    var pointer_type_1 = require_pointer_type();
    var errors_1 = require_errors();
    var trace = debug_1.default("capnp:pointer");
    trace("load");
    var Pointer = function() {
      function Pointer2(segment, byteOffset, depthLimit) {
        if (depthLimit === void 0) {
          depthLimit = constants_1.MAX_DEPTH;
        }
        this._capnp = { compositeList: false, depthLimit };
        this.segment = segment;
        this.byteOffset = byteOffset;
        if (depthLimit === 0) {
          throw new Error(util_1.format(errors_1.PTR_DEPTH_LIMIT_EXCEEDED, this));
        }
        trackPointerAllocation(segment.message, this);
        if (byteOffset < 0 || byteOffset > segment.byteLength) {
          throw new Error(util_1.format(errors_1.PTR_OFFSET_OUT_OF_BOUNDS, byteOffset));
        }
        trace("new %s", this);
      }
      Pointer2.prototype.toString = function() {
        return util_1.format("Pointer_%d@%a,%s,limit:%x", this.segment.id, this.byteOffset, dump(this), this._capnp.depthLimit);
      };
      Pointer2.adopt = adopt;
      Pointer2.copyFrom = copyFrom;
      Pointer2.disown = disown;
      Pointer2.dump = dump;
      Pointer2.isNull = isNull;
      Pointer2._capnp = {
        displayName: "Pointer"
      };
      return Pointer2;
    }();
    exports.Pointer = Pointer;
    function adopt(src, p) {
      src._moveTo(p);
    }
    exports.adopt = adopt;
    function disown(p) {
      return new orphan_1.Orphan(p);
    }
    exports.disown = disown;
    function dump(p) {
      return util_1.bufferToHex(p.segment.buffer.slice(p.byteOffset, p.byteOffset + 8));
    }
    exports.dump = dump;
    function getListByteLength(elementSize, length, compositeSize) {
      switch (elementSize) {
        case list_element_size_1.ListElementSize.BIT:
          return util_1.padToWord(length + 7 >>> 3);
        case list_element_size_1.ListElementSize.BYTE:
        case list_element_size_1.ListElementSize.BYTE_2:
        case list_element_size_1.ListElementSize.BYTE_4:
        case list_element_size_1.ListElementSize.BYTE_8:
        case list_element_size_1.ListElementSize.POINTER:
        case list_element_size_1.ListElementSize.VOID:
          return util_1.padToWord(getListElementByteLength(elementSize) * length);
        case list_element_size_1.ListElementSize.COMPOSITE:
          if (compositeSize === void 0) {
            throw new Error(util_1.format(errors_1.PTR_INVALID_LIST_SIZE, NaN));
          }
          return length * util_1.padToWord(object_size_1.getByteLength(compositeSize));
        default:
          throw new Error(errors_1.PTR_INVALID_LIST_SIZE);
      }
    }
    exports.getListByteLength = getListByteLength;
    function getListElementByteLength(elementSize) {
      switch (elementSize) {
        case list_element_size_1.ListElementSize.BIT:
          return NaN;
        case list_element_size_1.ListElementSize.BYTE:
          return 1;
        case list_element_size_1.ListElementSize.BYTE_2:
          return 2;
        case list_element_size_1.ListElementSize.BYTE_4:
          return 4;
        case list_element_size_1.ListElementSize.BYTE_8:
        case list_element_size_1.ListElementSize.POINTER:
          return 8;
        case list_element_size_1.ListElementSize.COMPOSITE:
          return NaN;
        case list_element_size_1.ListElementSize.VOID:
          return 0;
        default:
          throw new Error(util_1.format(errors_1.PTR_INVALID_LIST_SIZE, elementSize));
      }
    }
    exports.getListElementByteLength = getListElementByteLength;
    function add2(offset, p) {
      return new Pointer(p.segment, p.byteOffset + offset, p._capnp.depthLimit);
    }
    exports.add = add2;
    function copyFrom(src, p) {
      if (p.segment === src.segment && p.byteOffset === src.byteOffset) {
        trace("ignoring copy operation from identical pointer %s", src);
        return;
      }
      erase(p);
      if (isNull(src))
        return;
      switch (getTargetPointerType(src)) {
        case pointer_type_1.PointerType.STRUCT:
          copyFromStruct(src, p);
          break;
        case pointer_type_1.PointerType.LIST:
          copyFromList(src, p);
          break;
        default:
          throw new Error(util_1.format(errors_1.PTR_INVALID_POINTER_TYPE, getTargetPointerType(p)));
      }
    }
    exports.copyFrom = copyFrom;
    function erase(p) {
      if (isNull(p))
        return;
      var c;
      switch (getTargetPointerType(p)) {
        case pointer_type_1.PointerType.STRUCT:
          var size = getTargetStructSize(p);
          c = getContent(p);
          c.segment.fillZeroWords(c.byteOffset, size.dataByteLength / 8);
          for (var i = 0; i < size.pointerLength; i++) {
            erase(add2(i * 8, c));
          }
          break;
        case pointer_type_1.PointerType.LIST:
          var elementSize = getTargetListElementSize(p);
          var length = getTargetListLength(p);
          var contentWords = util_1.padToWord(length * getListElementByteLength(elementSize));
          c = getContent(p);
          if (elementSize === list_element_size_1.ListElementSize.POINTER) {
            for (var i = 0; i < length; i++) {
              erase(new Pointer(c.segment, c.byteOffset + i * 8, p._capnp.depthLimit - 1));
            }
            break;
          } else if (elementSize === list_element_size_1.ListElementSize.COMPOSITE) {
            var tag = add2(-8, c);
            var compositeSize = getStructSize(tag);
            var compositeByteLength = object_size_1.getByteLength(compositeSize);
            contentWords = getOffsetWords(tag);
            c.segment.setWordZero(c.byteOffset - 8);
            for (var i = 0; i < length; i++) {
              for (var j = 0; j < compositeSize.pointerLength; j++) {
                erase(new Pointer(c.segment, c.byteOffset + i * compositeByteLength + j * 8, p._capnp.depthLimit - 1));
              }
            }
          }
          c.segment.fillZeroWords(c.byteOffset, contentWords);
          break;
        case pointer_type_1.PointerType.OTHER:
          break;
        default:
          throw new Error(util_1.format(errors_1.PTR_INVALID_POINTER_TYPE, getTargetPointerType(p)));
      }
      erasePointer(p);
    }
    exports.erase = erase;
    function erasePointer(p) {
      if (getPointerType(p) === pointer_type_1.PointerType.FAR) {
        var landingPad = followFar(p);
        if (isDoubleFar(p)) {
          landingPad.segment.setWordZero(landingPad.byteOffset + 8);
        }
        landingPad.segment.setWordZero(landingPad.byteOffset);
      }
      p.segment.setWordZero(p.byteOffset);
    }
    exports.erasePointer = erasePointer;
    function followFar(p) {
      var targetSegment = p.segment.message.getSegment(p.segment.getUint32(p.byteOffset + 4));
      var targetWordOffset = p.segment.getUint32(p.byteOffset) >>> 3;
      return new Pointer(targetSegment, targetWordOffset * 8, p._capnp.depthLimit - 1);
    }
    exports.followFar = followFar;
    function followFars(p) {
      if (getPointerType(p) === pointer_type_1.PointerType.FAR) {
        var landingPad = followFar(p);
        if (isDoubleFar(p))
          landingPad.byteOffset += 8;
        return landingPad;
      }
      return p;
    }
    exports.followFars = followFars;
    function getCapabilityId(p) {
      return p.segment.getUint32(p.byteOffset + 4);
    }
    exports.getCapabilityId = getCapabilityId;
    function isCompositeList(p) {
      return getTargetPointerType(p) === pointer_type_1.PointerType.LIST && getTargetListElementSize(p) === list_element_size_1.ListElementSize.COMPOSITE;
    }
    function getContent(p, ignoreCompositeIndex) {
      var c;
      if (isDoubleFar(p)) {
        var landingPad = followFar(p);
        c = new Pointer(p.segment.message.getSegment(getFarSegmentId(landingPad)), getOffsetWords(landingPad) * 8);
      } else {
        var target = followFars(p);
        c = new Pointer(target.segment, target.byteOffset + 8 + getOffsetWords(target) * 8);
      }
      if (isCompositeList(p))
        c.byteOffset += 8;
      if (!ignoreCompositeIndex && p._capnp.compositeIndex !== void 0) {
        c.byteOffset -= 8;
        c.byteOffset += 8 + p._capnp.compositeIndex * object_size_1.getByteLength(object_size_1.padToWord(getStructSize(c)));
      }
      return c;
    }
    exports.getContent = getContent;
    function getFarSegmentId(p) {
      return p.segment.getUint32(p.byteOffset + 4);
    }
    exports.getFarSegmentId = getFarSegmentId;
    function getListElementSize(p) {
      return p.segment.getUint32(p.byteOffset + 4) & constants_1.LIST_SIZE_MASK;
    }
    exports.getListElementSize = getListElementSize;
    function getListLength(p) {
      return p.segment.getUint32(p.byteOffset + 4) >>> 3;
    }
    exports.getListLength = getListLength;
    function getOffsetWords(p) {
      var o = p.segment.getInt32(p.byteOffset);
      return o & 2 ? o >> 3 : o >> 2;
    }
    exports.getOffsetWords = getOffsetWords;
    function getPointerType(p) {
      return p.segment.getUint32(p.byteOffset) & constants_1.POINTER_TYPE_MASK;
    }
    exports.getPointerType = getPointerType;
    function getStructDataWords(p) {
      return p.segment.getUint16(p.byteOffset + 4);
    }
    exports.getStructDataWords = getStructDataWords;
    function getStructPointerLength(p) {
      return p.segment.getUint16(p.byteOffset + 6);
    }
    exports.getStructPointerLength = getStructPointerLength;
    function getStructSize(p) {
      return new object_size_1.ObjectSize(getStructDataWords(p) * 8, getStructPointerLength(p));
    }
    exports.getStructSize = getStructSize;
    function getTargetCompositeListTag(p) {
      var c = getContent(p);
      c.byteOffset -= 8;
      return c;
    }
    exports.getTargetCompositeListTag = getTargetCompositeListTag;
    function getTargetCompositeListSize(p) {
      return getStructSize(getTargetCompositeListTag(p));
    }
    exports.getTargetCompositeListSize = getTargetCompositeListSize;
    function getTargetListElementSize(p) {
      return getListElementSize(followFars(p));
    }
    exports.getTargetListElementSize = getTargetListElementSize;
    function getTargetListLength(p) {
      var t = followFars(p);
      if (getListElementSize(t) === list_element_size_1.ListElementSize.COMPOSITE) {
        return getOffsetWords(getTargetCompositeListTag(p));
      }
      return getListLength(t);
    }
    exports.getTargetListLength = getTargetListLength;
    function getTargetPointerType(p) {
      var t = getPointerType(followFars(p));
      if (t === pointer_type_1.PointerType.FAR)
        throw new Error(util_1.format(errors_1.PTR_INVALID_FAR_TARGET, p));
      return t;
    }
    exports.getTargetPointerType = getTargetPointerType;
    function getTargetStructSize(p) {
      return getStructSize(followFars(p));
    }
    exports.getTargetStructSize = getTargetStructSize;
    function initPointer(contentSegment, contentOffset, p) {
      if (p.segment !== contentSegment) {
        trace("Initializing far pointer %s -> %s.", p, contentSegment);
        if (!contentSegment.hasCapacity(8)) {
          var landingPad_1 = p.segment.allocate(16);
          trace("GAH! Initializing double-far pointer in %s from %s -> %s.", p, contentSegment, landingPad_1);
          setFarPointer(true, landingPad_1.byteOffset / 8, landingPad_1.segment.id, p);
          setFarPointer(false, contentOffset / 8, contentSegment.id, landingPad_1);
          landingPad_1.byteOffset += 8;
          return new pointer_allocation_result_1.PointerAllocationResult(landingPad_1, 0);
        }
        var landingPad = contentSegment.allocate(8);
        if (landingPad.segment.id !== contentSegment.id) {
          throw new Error(errors_1.INVARIANT_UNREACHABLE_CODE);
        }
        setFarPointer(false, landingPad.byteOffset / 8, landingPad.segment.id, p);
        return new pointer_allocation_result_1.PointerAllocationResult(landingPad, (contentOffset - landingPad.byteOffset - 8) / 8);
      }
      trace("Initializing intra-segment pointer %s -> %a.", p, contentOffset);
      return new pointer_allocation_result_1.PointerAllocationResult(p, (contentOffset - p.byteOffset - 8) / 8);
    }
    exports.initPointer = initPointer;
    function isDoubleFar(p) {
      return getPointerType(p) === pointer_type_1.PointerType.FAR && (p.segment.getUint32(p.byteOffset) & constants_1.POINTER_DOUBLE_FAR_MASK) !== 0;
    }
    exports.isDoubleFar = isDoubleFar;
    function isNull(p) {
      return p.segment.isWordZero(p.byteOffset);
    }
    exports.isNull = isNull;
    function relocateTo(dst, src) {
      var t = followFars(src);
      var lo = t.segment.getUint8(t.byteOffset) & 3;
      var hi = t.segment.getUint32(t.byteOffset + 4);
      erase(dst);
      var res = initPointer(t.segment, t.byteOffset + 8 + getOffsetWords(t) * 8, dst);
      res.pointer.segment.setUint32(res.pointer.byteOffset, lo | res.offsetWords << 2);
      res.pointer.segment.setUint32(res.pointer.byteOffset + 4, hi);
      erasePointer(src);
    }
    exports.relocateTo = relocateTo;
    function setFarPointer(doubleFar, offsetWords, segmentId, p) {
      var A = pointer_type_1.PointerType.FAR;
      var B = doubleFar ? 1 : 0;
      var C = offsetWords;
      var D = segmentId;
      p.segment.setUint32(p.byteOffset, A | B << 2 | C << 3);
      p.segment.setUint32(p.byteOffset + 4, D);
    }
    exports.setFarPointer = setFarPointer;
    function setInterfacePointer(capId, p) {
      p.segment.setUint32(p.byteOffset, pointer_type_1.PointerType.OTHER);
      p.segment.setUint32(p.byteOffset + 4, capId);
    }
    exports.setInterfacePointer = setInterfacePointer;
    function setListPointer(offsetWords, size, length, p, compositeSize) {
      var A = pointer_type_1.PointerType.LIST;
      var B = offsetWords;
      var C = size;
      var D = length;
      if (size === list_element_size_1.ListElementSize.COMPOSITE) {
        if (compositeSize === void 0) {
          throw new TypeError(errors_1.TYPE_COMPOSITE_SIZE_UNDEFINED);
        }
        D *= object_size_1.getWordLength(compositeSize);
      }
      p.segment.setUint32(p.byteOffset, A | B << 2);
      p.segment.setUint32(p.byteOffset + 4, C | D << 3);
    }
    exports.setListPointer = setListPointer;
    function setStructPointer(offsetWords, size, p) {
      var A = pointer_type_1.PointerType.STRUCT;
      var B = offsetWords;
      var C = object_size_1.getDataWordLength(size);
      var D = size.pointerLength;
      p.segment.setUint32(p.byteOffset, A | B << 2);
      p.segment.setUint16(p.byteOffset + 4, C);
      p.segment.setUint16(p.byteOffset + 6, D);
    }
    exports.setStructPointer = setStructPointer;
    function validate(pointerType, p, elementSize) {
      if (isNull(p))
        return;
      var t = followFars(p);
      var A = t.segment.getUint32(t.byteOffset) & constants_1.POINTER_TYPE_MASK;
      if (A !== pointerType) {
        throw new Error(util_1.format(errors_1.PTR_WRONG_POINTER_TYPE, p, pointerType));
      }
      if (elementSize !== void 0) {
        var C = t.segment.getUint32(t.byteOffset + 4) & constants_1.LIST_SIZE_MASK;
        if (C !== elementSize) {
          throw new Error(util_1.format(errors_1.PTR_WRONG_LIST_TYPE, p, list_element_size_1.ListElementSize[elementSize]));
        }
      }
    }
    exports.validate = validate;
    function copyFromList(src, dst) {
      if (dst._capnp.depthLimit <= 0)
        throw new Error(errors_1.PTR_DEPTH_LIMIT_EXCEEDED);
      var srcContent = getContent(src);
      var srcElementSize = getTargetListElementSize(src);
      var srcLength = getTargetListLength(src);
      var srcCompositeSize;
      var srcStructByteLength;
      var dstContent;
      if (srcElementSize === list_element_size_1.ListElementSize.POINTER) {
        dstContent = dst.segment.allocate(srcLength << 3);
        for (var i = 0; i < srcLength; i++) {
          var srcPtr = new Pointer(srcContent.segment, srcContent.byteOffset + (i << 3), src._capnp.depthLimit - 1);
          var dstPtr = new Pointer(dstContent.segment, dstContent.byteOffset + (i << 3), dst._capnp.depthLimit - 1);
          copyFrom(srcPtr, dstPtr);
        }
      } else if (srcElementSize === list_element_size_1.ListElementSize.COMPOSITE) {
        srcCompositeSize = object_size_1.padToWord(getTargetCompositeListSize(src));
        srcStructByteLength = object_size_1.getByteLength(srcCompositeSize);
        dstContent = dst.segment.allocate(object_size_1.getByteLength(srcCompositeSize) * srcLength + 8);
        dstContent.segment.copyWord(dstContent.byteOffset, srcContent.segment, srcContent.byteOffset - 8);
        if (srcCompositeSize.dataByteLength > 0) {
          var wordLength = object_size_1.getWordLength(srcCompositeSize) * srcLength;
          dstContent.segment.copyWords(dstContent.byteOffset + 8, srcContent.segment, srcContent.byteOffset, wordLength);
        }
        for (var i = 0; i < srcLength; i++) {
          for (var j = 0; j < srcCompositeSize.pointerLength; j++) {
            var offset = i * srcStructByteLength + srcCompositeSize.dataByteLength + (j << 3);
            var srcPtr = new Pointer(srcContent.segment, srcContent.byteOffset + offset, src._capnp.depthLimit - 1);
            var dstPtr = new Pointer(dstContent.segment, dstContent.byteOffset + offset + 8, dst._capnp.depthLimit - 1);
            copyFrom(srcPtr, dstPtr);
          }
        }
      } else {
        var byteLength = util_1.padToWord(srcElementSize === list_element_size_1.ListElementSize.BIT ? srcLength + 7 >>> 3 : getListElementByteLength(srcElementSize) * srcLength);
        var wordLength = byteLength >>> 3;
        dstContent = dst.segment.allocate(byteLength);
        dstContent.segment.copyWords(dstContent.byteOffset, srcContent.segment, srcContent.byteOffset, wordLength);
      }
      var res = initPointer(dstContent.segment, dstContent.byteOffset, dst);
      setListPointer(res.offsetWords, srcElementSize, srcLength, res.pointer, srcCompositeSize);
    }
    exports.copyFromList = copyFromList;
    function copyFromStruct(src, dst) {
      if (dst._capnp.depthLimit <= 0)
        throw new Error(errors_1.PTR_DEPTH_LIMIT_EXCEEDED);
      var srcContent = getContent(src);
      var srcSize = getTargetStructSize(src);
      var srcDataWordLength = object_size_1.getDataWordLength(srcSize);
      var dstContent = dst.segment.allocate(object_size_1.getByteLength(srcSize));
      dstContent.segment.copyWords(dstContent.byteOffset, srcContent.segment, srcContent.byteOffset, srcDataWordLength);
      for (var i = 0; i < srcSize.pointerLength; i++) {
        var offset = srcSize.dataByteLength + i * 8;
        var srcPtr = new Pointer(srcContent.segment, srcContent.byteOffset + offset, src._capnp.depthLimit - 1);
        var dstPtr = new Pointer(dstContent.segment, dstContent.byteOffset + offset, dst._capnp.depthLimit - 1);
        copyFrom(srcPtr, dstPtr);
      }
      if (dst._capnp.compositeList)
        return;
      var res = initPointer(dstContent.segment, dstContent.byteOffset, dst);
      setStructPointer(res.offsetWords, srcSize, res.pointer);
    }
    exports.copyFromStruct = copyFromStruct;
    function trackPointerAllocation(message, p) {
      message._capnp.traversalLimit -= 8;
      if (message._capnp.traversalLimit <= 0) {
        throw new Error(util_1.format(errors_1.PTR_TRAVERSAL_LIMIT_EXCEEDED, p));
      }
    }
    exports.trackPointerAllocation = trackPointerAllocation;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/list.js
var require_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var errors_1 = require_errors();
    var util_1 = require_util();
    var list_element_size_1 = require_list_element_size();
    var object_size_1 = require_object_size();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list");
    trace("load");
    var List = function(_super) {
      tslib_1.__extends(List2, _super);
      function List2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      List2.toString = function() {
        return this._capnp.displayName;
      };
      List2.prototype.all = function(callbackfn) {
        var length = this.getLength();
        for (var i = 0; i < length; i++) {
          if (!callbackfn(this.get(i), i))
            return false;
        }
        return true;
      };
      List2.prototype.any = function(callbackfn) {
        var length = this.getLength();
        for (var i = 0; i < length; i++) {
          if (callbackfn(this.get(i), i))
            return true;
        }
        return false;
      };
      List2.prototype.ap = function(callbackfns) {
        var _this = this;
        var length = this.getLength();
        var res = [];
        var _loop_1 = function(i2) {
          res.push.apply(res, callbackfns.map(function(f) {
            return f(_this.get(i2), i2);
          }));
        };
        for (var i = 0; i < length; i++) {
          _loop_1(i);
        }
        return res;
      };
      List2.prototype.concat = function(other) {
        var length = this.getLength();
        var otherLength = other.getLength();
        var res = new Array(length + otherLength);
        for (var i = 0; i < length; i++)
          res[i] = this.get(i);
        for (var i = 0; i < otherLength; i++)
          res[i + length] = other.get(i);
        return res;
      };
      List2.prototype.drop = function(n) {
        var length = this.getLength();
        var res = new Array(length);
        for (var i = n; i < length; i++)
          res[i] = this.get(i);
        return res;
      };
      List2.prototype.dropWhile = function(callbackfn) {
        var length = this.getLength();
        var res = [];
        var drop = true;
        for (var i = 0; i < length; i++) {
          var v = this.get(i);
          if (drop)
            drop = callbackfn(v, i);
          if (!drop)
            res.push(v);
        }
        return res;
      };
      List2.prototype.empty = function() {
        return [];
      };
      List2.prototype.every = function(callbackfn) {
        return this.all(callbackfn);
      };
      List2.prototype.filter = function(callbackfn) {
        var length = this.getLength();
        var res = [];
        for (var i = 0; i < length; i++) {
          var value = this.get(i);
          if (callbackfn(value, i))
            res.push(value);
        }
        return res;
      };
      List2.prototype.find = function(callbackfn) {
        var length = this.getLength();
        for (var i = 0; i < length; i++) {
          var value = this.get(i);
          if (callbackfn(value, i))
            return value;
        }
        return void 0;
      };
      List2.prototype.findIndex = function(callbackfn) {
        var length = this.getLength();
        for (var i = 0; i < length; i++) {
          var value = this.get(i);
          if (callbackfn(value, i))
            return i;
        }
        return -1;
      };
      List2.prototype.forEach = function(callbackfn) {
        var length = this.getLength();
        for (var i = 0; i < length; i++)
          callbackfn(this.get(i), i);
      };
      List2.prototype.get = function(_index) {
        return get(_index, this);
      };
      List2.prototype.getLength = function() {
        return pointer_1.getTargetListLength(this);
      };
      List2.prototype.groupBy = function(callbackfn) {
        var length = this.getLength();
        var res = {};
        for (var i = 0; i < length; i++) {
          var v = this.get(i);
          res[callbackfn(v, i)] = v;
        }
        return res;
      };
      List2.prototype.intersperse = function(sep) {
        var length = this.getLength();
        var res = new Array(length);
        for (var i = 0; i < length; i++) {
          if (i > 0)
            res.push(sep);
          res.push(this.get(i));
        }
        return res;
      };
      List2.prototype.map = function(callbackfn) {
        var length = this.getLength();
        var res = new Array(length);
        for (var i = 0; i < length; i++)
          res[i] = callbackfn(this.get(i), i);
        return res;
      };
      List2.prototype.reduce = function(callbackfn, initialValue) {
        var i = 0;
        var res;
        if (initialValue === void 0) {
          res = this.get(0);
          i++;
        } else {
          res = initialValue;
        }
        for (; i < this.getLength(); i++)
          res = callbackfn(res, this.get(i), i);
        return res;
      };
      List2.prototype.set = function(_index, _value) {
        set(_index, _value, this);
      };
      List2.prototype.slice = function(start, end) {
        if (start === void 0) {
          start = 0;
        }
        var length = end ? Math.min(this.getLength(), end) : this.getLength();
        var res = new Array(length - start);
        for (var i = start; i < length; i++)
          res[i] = this.get(i);
        return res;
      };
      List2.prototype.some = function(callbackfn) {
        return this.any(callbackfn);
      };
      List2.prototype.take = function(n) {
        var length = Math.min(this.getLength(), n);
        var res = new Array(length);
        for (var i = 0; i < length; i++)
          res[i] = this.get(i);
        return res;
      };
      List2.prototype.takeWhile = function(callbackfn) {
        var length = this.getLength();
        var res = [];
        var take;
        for (var i = 0; i < length; i++) {
          var v = this.get(i);
          take = callbackfn(v, i);
          if (!take)
            return res;
          res.push(v);
        }
        return res;
      };
      List2.prototype.toArray = function() {
        return this.map(util_1.identity);
      };
      List2.prototype.toString = function() {
        return "List_" + _super.prototype.toString.call(this);
      };
      List2._capnp = {
        displayName: "List<Generic>",
        size: list_element_size_1.ListElementSize.VOID
      };
      List2.get = get;
      List2.initList = initList;
      List2.set = set;
      return List2;
    }(pointer_1.Pointer);
    exports.List = List;
    function initList(elementSize, length, l, compositeSize) {
      var c;
      switch (elementSize) {
        case list_element_size_1.ListElementSize.BIT:
          c = l.segment.allocate(Math.ceil(length / 8));
          break;
        case list_element_size_1.ListElementSize.BYTE:
        case list_element_size_1.ListElementSize.BYTE_2:
        case list_element_size_1.ListElementSize.BYTE_4:
        case list_element_size_1.ListElementSize.BYTE_8:
        case list_element_size_1.ListElementSize.POINTER:
          c = l.segment.allocate(length * pointer_1.getListElementByteLength(elementSize));
          break;
        case list_element_size_1.ListElementSize.COMPOSITE:
          if (compositeSize === void 0) {
            throw new Error(util_1.format(errors_1.PTR_COMPOSITE_SIZE_UNDEFINED));
          }
          compositeSize = object_size_1.padToWord(compositeSize);
          var byteLength = object_size_1.getByteLength(compositeSize) * length;
          c = l.segment.allocate(byteLength + 8);
          pointer_1.setStructPointer(length, compositeSize, c);
          trace("Wrote composite tag word %s for %s.", c, l);
          break;
        case list_element_size_1.ListElementSize.VOID:
          pointer_1.setListPointer(0, elementSize, length, l);
          return;
        default:
          throw new Error(util_1.format(errors_1.PTR_INVALID_LIST_SIZE, elementSize));
      }
      var res = pointer_1.initPointer(c.segment, c.byteOffset, l);
      pointer_1.setListPointer(res.offsetWords, elementSize, length, res.pointer, compositeSize);
    }
    exports.initList = initList;
    function get(_index, _l) {
      throw new TypeError();
    }
    exports.get = get;
    function set(_index, _value, _l) {
      throw new TypeError();
    }
    exports.set = set;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/pointer-list.js
var require_pointer_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/pointer-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    function PointerList(PointerClass) {
      var _a;
      return _a = function(_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.get = function(index) {
          var c = pointer_1.getContent(this);
          return new PointerClass(c.segment, c.byteOffset + index * 8, this._capnp.depthLimit - 1);
        };
        class_1.prototype.set = function(index, value) {
          pointer_1.copyFrom(value, this.get(index));
        };
        class_1.prototype.toString = function() {
          return "Pointer_" + _super.prototype.toString.call(this) + ",cls:" + PointerClass.toString();
        };
        return class_1;
      }(list_1.List), _a._capnp = {
        displayName: "List<" + PointerClass._capnp.displayName + ">",
        size: list_element_size_1.ListElementSize.POINTER
      }, _a;
    }
    exports.PointerList = PointerList;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/any-pointer-list.js
var require_any_pointer_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/any-pointer-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var pointer_1 = require_pointer();
    var pointer_list_1 = require_pointer_list();
    exports.AnyPointerList = pointer_list_1.PointerList(pointer_1.Pointer);
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/bool-list.js
var require_bool_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/bool-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var BoolList = function(_super) {
      tslib_1.__extends(BoolList2, _super);
      function BoolList2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      BoolList2.prototype.get = function(index) {
        var bitMask = 1 << index % 8;
        var byteOffset = index >>> 3;
        var c = pointer_1.getContent(this);
        var v = c.segment.getUint8(c.byteOffset + byteOffset);
        return (v & bitMask) !== 0;
      };
      BoolList2.prototype.set = function(index, value) {
        var bitMask = 1 << index % 8;
        var c = pointer_1.getContent(this);
        var byteOffset = c.byteOffset + (index >>> 3);
        var v = c.segment.getUint8(byteOffset);
        c.segment.setUint8(byteOffset, value ? v | bitMask : v & ~bitMask);
      };
      BoolList2.prototype.toString = function() {
        return "Bool_" + _super.prototype.toString.call(this);
      };
      BoolList2._capnp = {
        displayName: "List<boolean>",
        size: list_element_size_1.ListElementSize.BIT
      };
      return BoolList2;
    }(list_1.List);
    exports.BoolList = BoolList;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/composite-list.js
var require_composite_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/composite-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    function CompositeList3(CompositeClass) {
      var _a;
      return _a = function(_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.get = function(index) {
          return new CompositeClass(this.segment, this.byteOffset, this._capnp.depthLimit - 1, index);
        };
        class_1.prototype.set = function(index, value) {
          pointer_1.copyFrom(value, this.get(index));
        };
        class_1.prototype.toString = function() {
          return "Composite_" + _super.prototype.toString.call(this) + ",cls:" + CompositeClass.toString();
        };
        return class_1;
      }(list_1.List), _a._capnp = {
        compositeSize: CompositeClass._capnp.size,
        displayName: "List<" + CompositeClass._capnp.displayName + ">",
        size: list_element_size_1.ListElementSize.COMPOSITE
      }, _a;
    }
    exports.CompositeList = CompositeList3;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/data.js
var require_data = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/data.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var pointer_type_1 = require_pointer_type();
    var trace = debug_1.default("capnp:data");
    trace("load");
    var Data = function(_super) {
      tslib_1.__extends(Data2, _super);
      function Data2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Data2.fromPointer = function(pointer) {
        pointer_1.validate(pointer_type_1.PointerType.LIST, pointer, list_element_size_1.ListElementSize.BYTE);
        return this._fromPointerUnchecked(pointer);
      };
      Data2._fromPointerUnchecked = function(pointer) {
        return new this(pointer.segment, pointer.byteOffset, pointer._capnp.depthLimit);
      };
      Data2.prototype.copyBuffer = function(src) {
        var c = pointer_1.getContent(this);
        var dstLength = this.getLength();
        var srcLength = src.byteLength;
        var i = src instanceof ArrayBuffer ? new Uint8Array(src) : new Uint8Array(src.buffer, src.byteOffset, Math.min(dstLength, srcLength));
        var o = new Uint8Array(c.segment.buffer, c.byteOffset, this.getLength());
        o.set(i);
        if (dstLength > srcLength) {
          trace("Zeroing out remaining %d bytes after copy into %s.", dstLength - srcLength, this);
          o.fill(0, srcLength, dstLength);
        } else if (dstLength < srcLength) {
          trace("Truncated %d bytes from source buffer while copying to %s.", srcLength - dstLength, this);
        }
      };
      Data2.prototype.get = function(byteOffset) {
        var c = pointer_1.getContent(this);
        return c.segment.getUint8(c.byteOffset + byteOffset);
      };
      Data2.prototype.set = function(byteOffset, value) {
        var c = pointer_1.getContent(this);
        c.segment.setUint8(c.byteOffset + byteOffset, value);
      };
      Data2.prototype.toArrayBuffer = function() {
        var c = pointer_1.getContent(this);
        return c.segment.buffer.slice(c.byteOffset, c.byteOffset + this.getLength());
      };
      Data2.prototype.toDataView = function() {
        var c = pointer_1.getContent(this);
        return new DataView(c.segment.buffer, c.byteOffset, this.getLength());
      };
      Data2.prototype.toString = function() {
        return "Data_" + _super.prototype.toString.call(this);
      };
      Data2.prototype.toUint8Array = function() {
        var c = pointer_1.getContent(this);
        return new Uint8Array(c.segment.buffer, c.byteOffset, this.getLength());
      };
      return Data2;
    }(list_1.List);
    exports.Data = Data;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/data-list.js
var require_data_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/data-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var data_1 = require_data();
    var pointer_list_1 = require_pointer_list();
    exports.DataList = pointer_list_1.PointerList(data_1.Data);
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/float32-list.js
var require_float32_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/float32-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var Float32List2 = function(_super) {
      tslib_1.__extends(Float32List3, _super);
      function Float32List3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Float32List3.prototype.get = function(index) {
        var c = pointer_1.getContent(this);
        return c.segment.getFloat32(c.byteOffset + index * 4);
      };
      Float32List3.prototype.set = function(index, value) {
        var c = pointer_1.getContent(this);
        c.segment.setFloat32(c.byteOffset + index * 4, value);
      };
      Float32List3.prototype.toString = function() {
        return "Float32_" + _super.prototype.toString.call(this);
      };
      Float32List3._capnp = {
        displayName: "List<Float32>",
        size: list_element_size_1.ListElementSize.BYTE_4
      };
      return Float32List3;
    }(list_1.List);
    exports.Float32List = Float32List2;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/float64-list.js
var require_float64_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/float64-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var Float64List2 = function(_super) {
      tslib_1.__extends(Float64List3, _super);
      function Float64List3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Float64List3.prototype.get = function(index) {
        var c = pointer_1.getContent(this);
        return c.segment.getFloat64(c.byteOffset + index * 8);
      };
      Float64List3.prototype.set = function(index, value) {
        var c = pointer_1.getContent(this);
        c.segment.setFloat64(c.byteOffset + index * 8, value);
      };
      Float64List3.prototype.toString = function() {
        return "Float64_" + _super.prototype.toString.call(this);
      };
      Float64List3._capnp = {
        displayName: "List<Float64>",
        size: list_element_size_1.ListElementSize.BYTE_8
      };
      return Float64List3;
    }(list_1.List);
    exports.Float64List = Float64List2;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/int8-list.js
var require_int8_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/int8-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var Int8List2 = function(_super) {
      tslib_1.__extends(Int8List3, _super);
      function Int8List3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Int8List3.prototype.get = function(index) {
        var c = pointer_1.getContent(this);
        return c.segment.getInt8(c.byteOffset + index);
      };
      Int8List3.prototype.set = function(index, value) {
        var c = pointer_1.getContent(this);
        c.segment.setInt8(c.byteOffset + index, value);
      };
      Int8List3.prototype.toString = function() {
        return "Int8_" + _super.prototype.toString.call(this);
      };
      Int8List3._capnp = {
        displayName: "List<Int8>",
        size: list_element_size_1.ListElementSize.BYTE
      };
      return Int8List3;
    }(list_1.List);
    exports.Int8List = Int8List2;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/int16-list.js
var require_int16_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/int16-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var Int16List2 = function(_super) {
      tslib_1.__extends(Int16List3, _super);
      function Int16List3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Int16List3.prototype.get = function(index) {
        var c = pointer_1.getContent(this);
        return c.segment.getInt16(c.byteOffset + index * 2);
      };
      Int16List3.prototype.set = function(index, value) {
        var c = pointer_1.getContent(this);
        c.segment.setInt16(c.byteOffset + index * 2, value);
      };
      Int16List3.prototype.toString = function() {
        return "Int16_" + _super.prototype.toString.call(this);
      };
      Int16List3._capnp = {
        displayName: "List<Int16>",
        size: list_element_size_1.ListElementSize.BYTE_2
      };
      return Int16List3;
    }(list_1.List);
    exports.Int16List = Int16List2;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/int32-list.js
var require_int32_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/int32-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var Int32List2 = function(_super) {
      tslib_1.__extends(Int32List3, _super);
      function Int32List3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Int32List3.prototype.get = function(index) {
        var c = pointer_1.getContent(this);
        return c.segment.getInt32(c.byteOffset + index * 4);
      };
      Int32List3.prototype.set = function(index, value) {
        var c = pointer_1.getContent(this);
        c.segment.setInt32(c.byteOffset + index * 4, value);
      };
      Int32List3.prototype.toString = function() {
        return "Int32_" + _super.prototype.toString.call(this);
      };
      Int32List3._capnp = {
        displayName: "List<Int32>",
        size: list_element_size_1.ListElementSize.BYTE_4
      };
      return Int32List3;
    }(list_1.List);
    exports.Int32List = Int32List2;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/int64-list.js
var require_int64_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/int64-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var Int64List2 = function(_super) {
      tslib_1.__extends(Int64List3, _super);
      function Int64List3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Int64List3.prototype.get = function(index) {
        var c = pointer_1.getContent(this);
        return c.segment.getInt64(c.byteOffset + index * 8);
      };
      Int64List3.prototype.set = function(index, value) {
        var c = pointer_1.getContent(this);
        c.segment.setInt64(c.byteOffset + index * 8, value);
      };
      Int64List3.prototype.toString = function() {
        return "Int64_" + _super.prototype.toString.call(this);
      };
      Int64List3._capnp = {
        displayName: "List<Int64>",
        size: list_element_size_1.ListElementSize.BYTE_8
      };
      return Int64List3;
    }(list_1.List);
    exports.Int64List = Int64List2;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/interface.js
var require_interface = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    var util_1 = require_util();
    var pointer_1 = require_pointer();
    var Interface = function(_super) {
      tslib_1.__extends(Interface2, _super);
      function Interface2(segment, byteOffset, depthLimit) {
        if (depthLimit === void 0) {
          depthLimit = constants_1.MAX_DEPTH;
        }
        var _this = _super.call(this, segment, byteOffset, depthLimit) || this;
        throw new Error(util_1.format(errors_1.NOT_IMPLEMENTED, "new Interface"));
        return _this;
      }
      return Interface2;
    }(pointer_1.Pointer);
    exports.Interface = Interface;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/interface-list.js
var require_interface_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/interface-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var interface_1 = require_interface();
    var pointer_list_1 = require_pointer_list();
    exports.InterfaceList = pointer_list_1.PointerList(interface_1.Interface);
  }
});

// node_modules/capnp-ts/lib/types/uint64.js
var require_uint64 = __commonJS({
  "node_modules/capnp-ts/lib/types/uint64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    var util_1 = require_util();
    var trace = debug_1.default("capnp:uint64");
    trace("load");
    var Uint642 = function() {
      function Uint643(buffer) {
        if (buffer.byteLength < 8)
          throw new RangeError(errors_1.RANGE_INT64_UNDERFLOW);
        this.buffer = buffer;
      }
      Uint643.fromArrayBuffer = function(source, offset, noCopy) {
        if (offset === void 0) {
          offset = 0;
        }
        if (noCopy === void 0) {
          noCopy = false;
        }
        if (noCopy)
          return new this(new Uint8Array(source, offset, 8));
        return new this(new Uint8Array(source.slice(offset, offset + 8)));
      };
      Uint643.fromDataView = function(source, offset, noCopy) {
        if (offset === void 0) {
          offset = 0;
        }
        if (noCopy === void 0) {
          noCopy = false;
        }
        if (noCopy) {
          return new this(new Uint8Array(source.buffer, source.byteOffset + offset, 8));
        }
        return new this(new Uint8Array(source.buffer.slice(source.byteOffset + offset, source.byteLength + offset + 8)));
      };
      Uint643.fromHexString = function(source) {
        if (source.substr(0, 2) === "0x")
          source = source.substr(2);
        if (source.length < 1)
          return Uint643.fromNumber(0);
        if (source[0] === "-")
          throw new RangeError("Source must not be negative.");
        source = util_1.pad(source, 16);
        if (source.length !== 16) {
          throw new RangeError("Source string must contain at most 16 hexadecimal digits.");
        }
        var bytes = source.toLowerCase().replace(/[^\da-f]/g, "");
        var buf = new Uint8Array(new ArrayBuffer(8));
        for (var i = 0; i < 8; i++) {
          buf[7 - i] = parseInt(bytes.substr(i * 2, 2), 16);
        }
        return new Uint643(buf);
      };
      Uint643.fromNumber = function(source) {
        var ret = new this(new Uint8Array(8));
        ret.setValue(source);
        return ret;
      };
      Uint643.fromUint8Array = function(source, offset, noCopy) {
        if (offset === void 0) {
          offset = 0;
        }
        if (noCopy === void 0) {
          noCopy = false;
        }
        if (noCopy)
          return new this(source.subarray(offset, offset + 8));
        return new this(new Uint8Array(source.buffer.slice(source.byteOffset + offset, source.byteOffset + offset + 8)));
      };
      Uint643.prototype.equals = function(other) {
        for (var i = 0; i < 8; i++) {
          if (this.buffer[i] !== other.buffer[i])
            return false;
        }
        return true;
      };
      Uint643.prototype.inspect = function() {
        return "[Uint64 " + this.toString(10) + " 0x" + this.toHexString() + "]";
      };
      Uint643.prototype.isZero = function() {
        for (var i = 0; i < 8; i++) {
          if (this.buffer[i] !== 0)
            return false;
        }
        return true;
      };
      Uint643.prototype.setValue = function(loWord, hiWord) {
        var lo = loWord;
        var hi = hiWord;
        if (hi === void 0) {
          hi = lo;
          hi = Math.abs(hi);
          lo = hi % constants_1.VAL32;
          hi = hi / constants_1.VAL32;
          if (hi > constants_1.VAL32)
            throw new RangeError(loWord + " is outside Uint64 range");
          hi = hi >>> 0;
        }
        for (var i = 0; i < 8; i++) {
          this.buffer[i] = lo & 255;
          lo = i === 3 ? hi : lo >>> 8;
        }
      };
      Uint643.prototype.toNumber = function(allowImprecise) {
        var b = this.buffer;
        var x = 0;
        var i = 0;
        var m = 1;
        while (i < 8) {
          var v = b[i];
          x += v * m;
          m *= 256;
          i++;
        }
        if (!allowImprecise && x >= constants_1.MAX_SAFE_INTEGER) {
          trace("Coercing out of range value %d to Infinity.", x);
          return Infinity;
        }
        return x;
      };
      Uint643.prototype.valueOf = function() {
        return this.toNumber(false);
      };
      Uint643.prototype.toArrayBuffer = function() {
        return this.buffer.buffer;
      };
      Uint643.prototype.toDataView = function() {
        return new DataView(this.buffer.buffer);
      };
      Uint643.prototype.toHexString = function() {
        var hex = "";
        for (var i = 7; i >= 0; i--) {
          var v = this.buffer[i].toString(16);
          if (v.length === 1)
            v = "0" + v;
          hex += v;
        }
        return hex;
      };
      Uint643.prototype.toString = function(radix) {
        return this.toNumber(true).toString(radix);
      };
      Uint643.prototype.toUint8Array = function() {
        return this.buffer;
      };
      return Uint643;
    }();
    exports.Uint64 = Uint642;
  }
});

// node_modules/capnp-ts/lib/types/int64.js
var require_int64 = __commonJS({
  "node_modules/capnp-ts/lib/types/int64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var constants_1 = require_constants();
    var util_1 = require_util();
    var uint64_1 = require_uint64();
    var trace = debug_1.default("capnp:int64");
    trace("load");
    var Int642 = function(_super) {
      tslib_1.__extends(Int643, _super);
      function Int643() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Int643.fromArrayBuffer = function(source, offset, noCopy) {
        if (offset === void 0) {
          offset = 0;
        }
        if (noCopy === void 0) {
          noCopy = false;
        }
        if (noCopy)
          return new this(new Uint8Array(source, offset, 8));
        return new this(new Uint8Array(source.slice(offset, offset + 8)));
      };
      Int643.fromDataView = function(source, offset, noCopy) {
        if (offset === void 0) {
          offset = 0;
        }
        if (noCopy === void 0) {
          noCopy = false;
        }
        if (noCopy) {
          return new this(new Uint8Array(source.buffer, source.byteOffset + offset, 8));
        }
        return new this(new Uint8Array(source.buffer.slice(source.byteOffset + offset, source.byteLength + offset + 8)));
      };
      Int643.fromNumber = function(source) {
        var ret = new this(new Uint8Array(8));
        ret.setValue(source);
        return ret;
      };
      Int643.fromHexString = function(source) {
        if (source.substr(0, 2) === "0x")
          source = source.substr(2);
        if (source.length < 1)
          return Int643.fromNumber(0);
        var neg = source[0] === "-";
        if (neg)
          source = source.substr(1);
        source = util_1.pad(source, 16);
        if (source.length !== 16) {
          throw new RangeError("Source string must contain at most 16 hexadecimal digits.");
        }
        var bytes = source.toLowerCase().replace(/[^\da-f]/g, "");
        var buf = new Uint8Array(new ArrayBuffer(8));
        for (var i = 0; i < 8; i++) {
          buf[7 - i] = parseInt(bytes.substr(i * 2, 2), 16);
        }
        var val = new Int643(buf);
        if (neg)
          val.negate();
        return val;
      };
      Int643.fromUint8Array = function(source, offset, noCopy) {
        if (offset === void 0) {
          offset = 0;
        }
        if (noCopy === void 0) {
          noCopy = false;
        }
        if (noCopy)
          return new this(source.subarray(offset, offset + 8));
        return new this(new Uint8Array(source.buffer.slice(source.byteOffset + offset, source.byteOffset + offset + 8)));
      };
      Int643.prototype.equals = function(other) {
        return _super.prototype.equals.call(this, other);
      };
      Int643.prototype.inspect = function() {
        return "[Int64 " + this.toString(10) + " 0x" + this.toHexString() + "]";
      };
      Int643.prototype.negate = function() {
        for (var b = this.buffer, carry = 1, i = 0; i < 8; i++) {
          var v = (b[i] ^ 255) + carry;
          b[i] = v & 255;
          carry = v >> 8;
        }
      };
      Int643.prototype.setValue = function(loWord, hiWord) {
        var negate = false;
        var lo = loWord;
        var hi = hiWord;
        if (hi === void 0) {
          hi = lo;
          negate = hi < 0;
          hi = Math.abs(hi);
          lo = hi % constants_1.VAL32;
          hi = hi / constants_1.VAL32;
          if (hi > constants_1.VAL32)
            throw new RangeError(loWord + " is outside Int64 range");
          hi = hi >>> 0;
        }
        for (var i = 0; i < 8; i++) {
          this.buffer[i] = lo & 255;
          lo = i === 3 ? hi : lo >>> 8;
        }
        if (negate)
          this.negate();
      };
      Int643.prototype.toHexString = function() {
        var b = this.buffer;
        var negate = b[7] & 128;
        if (negate)
          this.negate();
        var hex = "";
        for (var i = 7; i >= 0; i--) {
          var v = b[i].toString(16);
          if (v.length === 1)
            v = "0" + v;
          hex += v;
        }
        if (negate) {
          this.negate();
          hex = "-" + hex;
        }
        return hex;
      };
      Int643.prototype.toNumber = function(allowImprecise) {
        var b = this.buffer;
        var negate = b[7] & 128;
        var x = 0;
        var carry = 1;
        var i = 0;
        var m = 1;
        while (i < 8) {
          var v = b[i];
          if (negate) {
            v = (v ^ 255) + carry;
            carry = v >> 8;
            v = v & 255;
          }
          x += v * m;
          m *= 256;
          i++;
        }
        if (!allowImprecise && x >= constants_1.MAX_SAFE_INTEGER) {
          trace("Coercing out of range value %d to Infinity.", x);
          return negate ? -Infinity : Infinity;
        }
        return negate ? -x : x;
      };
      return Int643;
    }(uint64_1.Uint64);
    exports.Int64 = Int642;
  }
});

// node_modules/capnp-ts/lib/types/index.js
var require_types = __commonJS({
  "node_modules/capnp-ts/lib/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var int64_1 = require_int64();
    exports.Int64 = int64_1.Int64;
    var uint64_1 = require_uint64();
    exports.Uint64 = uint64_1.Uint64;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/text.js
var require_text = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/text.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var util_1 = require_util();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var pointer_type_1 = require_pointer_type();
    var trace = debug_1.default("capnp:text");
    trace("load");
    var Text = function(_super) {
      tslib_1.__extends(Text2, _super);
      function Text2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Text2.fromPointer = function(pointer) {
        pointer_1.validate(pointer_type_1.PointerType.LIST, pointer, list_element_size_1.ListElementSize.BYTE);
        return textFromPointerUnchecked(pointer);
      };
      Text2.prototype.get = function(index) {
        if (index === void 0) {
          index = 0;
        }
        if (index !== 0) {
          trace("Called get() on %s with a strange index (%d).", this, index);
        }
        if (pointer_1.isNull(this))
          return "";
        var c = pointer_1.getContent(this);
        return util_1.decodeUtf8(new Uint8Array(c.segment.buffer, c.byteOffset + index, this.getLength() - index));
      };
      Text2.prototype.getLength = function() {
        return _super.prototype.getLength.call(this) - 1;
      };
      Text2.prototype.set = function(index, value) {
        if (index !== 0) {
          trace("Called set() on %s with a strange index (%d).", this, index);
        }
        var src = util_1.encodeUtf8(value);
        var dstLength = src.byteLength + index;
        var c;
        var original;
        if (!pointer_1.isNull(this)) {
          c = pointer_1.getContent(this);
          var originalLength = this.getLength();
          if (originalLength >= index) {
            originalLength = index;
          } else {
            trace("%d byte gap exists between original text and new text in %s.", index - originalLength, this);
          }
          original = new Uint8Array(c.segment.buffer.slice(c.byteOffset, c.byteOffset + Math.min(originalLength, index)));
          pointer_1.erase(this);
        }
        list_1.initList(list_element_size_1.ListElementSize.BYTE, dstLength + 1, this);
        c = pointer_1.getContent(this);
        var dst = new Uint8Array(c.segment.buffer, c.byteOffset, dstLength);
        if (original)
          dst.set(original);
        dst.set(src, index);
      };
      Text2.prototype.toString = function() {
        return "Text_" + _super.prototype.toString.call(this);
      };
      return Text2;
    }(list_1.List);
    exports.Text = Text;
    function textFromPointerUnchecked(pointer) {
      return new Text(pointer.segment, pointer.byteOffset, pointer._capnp.depthLimit);
    }
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/struct.js
var require_struct = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/struct.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var constants_1 = require_constants();
    var types_1 = require_types();
    var util_1 = require_util();
    var list_element_size_1 = require_list_element_size();
    var object_size_1 = require_object_size();
    var data_1 = require_data();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var pointer_type_1 = require_pointer_type();
    var text_1 = require_text();
    var errors_1 = require_errors();
    var trace = debug_1.default("capnp:struct");
    trace("load");
    var TMP_WORD = new DataView(new ArrayBuffer(8));
    var Struct = function(_super) {
      tslib_1.__extends(Struct2, _super);
      function Struct2(segment, byteOffset, depthLimit, compositeIndex) {
        if (depthLimit === void 0) {
          depthLimit = constants_1.MAX_DEPTH;
        }
        var _this = _super.call(this, segment, byteOffset, depthLimit) || this;
        _this._capnp.compositeIndex = compositeIndex;
        _this._capnp.compositeList = compositeIndex !== void 0;
        return _this;
      }
      Struct2.toString = function() {
        return this._capnp.displayName;
      };
      Struct2.prototype.toString = function() {
        return "Struct_" + _super.prototype.toString.call(this) + (this._capnp.compositeIndex === void 0 ? "" : ",ci:" + this._capnp.compositeIndex);
      };
      Struct2._capnp = {
        displayName: "Struct"
      };
      Struct2.getAs = getAs;
      Struct2.getBit = getBit;
      Struct2.getData = getData;
      Struct2.getFloat32 = getFloat32;
      Struct2.getFloat64 = getFloat64;
      Struct2.getUint8 = getUint8;
      Struct2.getUint16 = getUint16;
      Struct2.getUint32 = getUint32;
      Struct2.getUint64 = getUint64;
      Struct2.getInt8 = getInt8;
      Struct2.getInt16 = getInt16;
      Struct2.getInt32 = getInt32;
      Struct2.getInt64 = getInt64;
      Struct2.getList = getList;
      Struct2.getPointer = getPointer;
      Struct2.getPointerAs = getPointerAs;
      Struct2.getStruct = getStruct;
      Struct2.getText = getText;
      Struct2.initData = initData;
      Struct2.initList = initList;
      Struct2.initStruct = initStruct;
      Struct2.initStructAt = initStructAt;
      Struct2.setBit = setBit;
      Struct2.setFloat32 = setFloat32;
      Struct2.setFloat64 = setFloat64;
      Struct2.setUint8 = setUint8;
      Struct2.setUint16 = setUint16;
      Struct2.setUint32 = setUint32;
      Struct2.setUint64 = setUint64;
      Struct2.setInt8 = setInt8;
      Struct2.setInt16 = setInt16;
      Struct2.setInt32 = setInt32;
      Struct2.setInt64 = setInt64;
      Struct2.setText = setText;
      Struct2.testWhich = testWhich;
      return Struct2;
    }(pointer_1.Pointer);
    exports.Struct = Struct;
    function initStruct(size, s) {
      if (s._capnp.compositeIndex !== void 0) {
        throw new Error(util_1.format(errors_1.PTR_INIT_COMPOSITE_STRUCT, s));
      }
      pointer_1.erase(s);
      var c = s.segment.allocate(object_size_1.getByteLength(size));
      var res = pointer_1.initPointer(c.segment, c.byteOffset, s);
      pointer_1.setStructPointer(res.offsetWords, size, res.pointer);
    }
    exports.initStruct = initStruct;
    function initStructAt(index, StructClass, p) {
      var s = getPointerAs(index, StructClass, p);
      initStruct(StructClass._capnp.size, s);
      return s;
    }
    exports.initStructAt = initStructAt;
    function resize(dstSize, s) {
      var srcSize = getSize(s);
      var srcContent = pointer_1.getContent(s);
      var dstContent = s.segment.allocate(object_size_1.getByteLength(dstSize));
      dstContent.segment.copyWords(dstContent.byteOffset, srcContent.segment, srcContent.byteOffset, Math.min(object_size_1.getDataWordLength(srcSize), object_size_1.getDataWordLength(dstSize)));
      var res = pointer_1.initPointer(dstContent.segment, dstContent.byteOffset, s);
      pointer_1.setStructPointer(res.offsetWords, dstSize, res.pointer);
      for (var i = 0; i < Math.min(srcSize.pointerLength, dstSize.pointerLength); i++) {
        var srcPtr = new pointer_1.Pointer(srcContent.segment, srcContent.byteOffset + srcSize.dataByteLength + i * 8);
        if (pointer_1.isNull(srcPtr)) {
          continue;
        }
        var srcPtrTarget = pointer_1.followFars(srcPtr);
        var srcPtrContent = pointer_1.getContent(srcPtr);
        var dstPtr = new pointer_1.Pointer(dstContent.segment, dstContent.byteOffset + dstSize.dataByteLength + i * 8);
        if (pointer_1.getTargetPointerType(srcPtr) === pointer_type_1.PointerType.LIST && pointer_1.getTargetListElementSize(srcPtr) === list_element_size_1.ListElementSize.COMPOSITE) {
          srcPtrContent.byteOffset -= 8;
        }
        var r = pointer_1.initPointer(srcPtrContent.segment, srcPtrContent.byteOffset, dstPtr);
        var a = srcPtrTarget.segment.getUint8(srcPtrTarget.byteOffset) & 3;
        var b = srcPtrTarget.segment.getUint32(srcPtrTarget.byteOffset + 4);
        r.pointer.segment.setUint32(r.pointer.byteOffset, a | r.offsetWords << 2);
        r.pointer.segment.setUint32(r.pointer.byteOffset + 4, b);
      }
      srcContent.segment.fillZeroWords(srcContent.byteOffset, object_size_1.getWordLength(srcSize));
    }
    exports.resize = resize;
    function adopt(src, s) {
      if (s._capnp.compositeIndex !== void 0) {
        throw new Error(util_1.format(errors_1.PTR_ADOPT_COMPOSITE_STRUCT, s));
      }
      pointer_1.Pointer.adopt(src, s);
    }
    exports.adopt = adopt;
    function disown(s) {
      if (s._capnp.compositeIndex !== void 0) {
        throw new Error(util_1.format(errors_1.PTR_DISOWN_COMPOSITE_STRUCT, s));
      }
      return pointer_1.Pointer.disown(s);
    }
    exports.disown = disown;
    function getAs(StructClass, s) {
      return new StructClass(s.segment, s.byteOffset, s._capnp.depthLimit, s._capnp.compositeIndex);
    }
    exports.getAs = getAs;
    function getBit(bitOffset, s, defaultMask) {
      var byteOffset = Math.floor(bitOffset / 8);
      var bitMask = 1 << bitOffset % 8;
      checkDataBounds(byteOffset, 1, s);
      var ds = getDataSection(s);
      var v = ds.segment.getUint8(ds.byteOffset + byteOffset);
      if (defaultMask === void 0)
        return (v & bitMask) !== 0;
      var defaultValue = defaultMask.getUint8(0);
      return ((v ^ defaultValue) & bitMask) !== 0;
    }
    exports.getBit = getBit;
    function getData(index, s, defaultValue) {
      checkPointerBounds(index, s);
      var ps = getPointerSection(s);
      ps.byteOffset += index * 8;
      var l = new data_1.Data(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
      if (pointer_1.isNull(l)) {
        if (defaultValue) {
          pointer_1.Pointer.copyFrom(defaultValue, l);
        } else {
          list_1.List.initList(list_element_size_1.ListElementSize.BYTE, 0, l);
        }
      }
      return l;
    }
    exports.getData = getData;
    function getDataSection(s) {
      return pointer_1.getContent(s);
    }
    exports.getDataSection = getDataSection;
    function getFloat32(byteOffset, s, defaultMask) {
      checkDataBounds(byteOffset, 4, s);
      var ds = getDataSection(s);
      if (defaultMask === void 0) {
        return ds.segment.getFloat32(ds.byteOffset + byteOffset);
      }
      var v = ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint32(0, true);
      TMP_WORD.setUint32(0, v, constants_1.NATIVE_LITTLE_ENDIAN);
      return TMP_WORD.getFloat32(0, constants_1.NATIVE_LITTLE_ENDIAN);
    }
    exports.getFloat32 = getFloat32;
    function getFloat64(byteOffset, s, defaultMask) {
      checkDataBounds(byteOffset, 8, s);
      var ds = getDataSection(s);
      if (defaultMask !== void 0) {
        var lo = ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint32(0, true);
        var hi = ds.segment.getUint32(ds.byteOffset + byteOffset + 4) ^ defaultMask.getUint32(4, true);
        TMP_WORD.setUint32(0, lo, constants_1.NATIVE_LITTLE_ENDIAN);
        TMP_WORD.setUint32(4, hi, constants_1.NATIVE_LITTLE_ENDIAN);
        return TMP_WORD.getFloat64(0, constants_1.NATIVE_LITTLE_ENDIAN);
      }
      return ds.segment.getFloat64(ds.byteOffset + byteOffset);
    }
    exports.getFloat64 = getFloat64;
    function getInt16(byteOffset, s, defaultMask) {
      checkDataBounds(byteOffset, 2, s);
      var ds = getDataSection(s);
      if (defaultMask === void 0) {
        return ds.segment.getInt16(ds.byteOffset + byteOffset);
      }
      var v = ds.segment.getUint16(ds.byteOffset + byteOffset) ^ defaultMask.getUint16(0, true);
      TMP_WORD.setUint16(0, v, constants_1.NATIVE_LITTLE_ENDIAN);
      return TMP_WORD.getInt16(0, constants_1.NATIVE_LITTLE_ENDIAN);
    }
    exports.getInt16 = getInt16;
    function getInt32(byteOffset, s, defaultMask) {
      checkDataBounds(byteOffset, 4, s);
      var ds = getDataSection(s);
      if (defaultMask === void 0) {
        return ds.segment.getInt32(ds.byteOffset + byteOffset);
      }
      var v = ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint16(0, true);
      TMP_WORD.setUint32(0, v, constants_1.NATIVE_LITTLE_ENDIAN);
      return TMP_WORD.getInt32(0, constants_1.NATIVE_LITTLE_ENDIAN);
    }
    exports.getInt32 = getInt32;
    function getInt64(byteOffset, s, defaultMask) {
      checkDataBounds(byteOffset, 8, s);
      var ds = getDataSection(s);
      if (defaultMask === void 0) {
        return ds.segment.getInt64(ds.byteOffset + byteOffset);
      }
      var lo = ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint32(0, true);
      var hi = ds.segment.getUint32(ds.byteOffset + byteOffset + 4) ^ defaultMask.getUint32(4, true);
      TMP_WORD.setUint32(0, lo, constants_1.NATIVE_LITTLE_ENDIAN);
      TMP_WORD.setUint32(4, hi, constants_1.NATIVE_LITTLE_ENDIAN);
      return new types_1.Int64(new Uint8Array(TMP_WORD.buffer.slice(0)));
    }
    exports.getInt64 = getInt64;
    function getInt8(byteOffset, s, defaultMask) {
      checkDataBounds(byteOffset, 1, s);
      var ds = getDataSection(s);
      if (defaultMask === void 0) {
        return ds.segment.getInt8(ds.byteOffset + byteOffset);
      }
      var v = ds.segment.getUint8(ds.byteOffset + byteOffset) ^ defaultMask.getUint8(0);
      TMP_WORD.setUint8(0, v);
      return TMP_WORD.getInt8(0);
    }
    exports.getInt8 = getInt8;
    function getList(index, ListClass, s, defaultValue) {
      checkPointerBounds(index, s);
      var ps = getPointerSection(s);
      ps.byteOffset += index * 8;
      var l = new ListClass(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
      if (pointer_1.isNull(l)) {
        if (defaultValue) {
          pointer_1.Pointer.copyFrom(defaultValue, l);
        } else {
          list_1.List.initList(ListClass._capnp.size, 0, l, ListClass._capnp.compositeSize);
        }
      } else if (ListClass._capnp.compositeSize !== void 0) {
        var srcSize = pointer_1.getTargetCompositeListSize(l);
        var dstSize = ListClass._capnp.compositeSize;
        if (dstSize.dataByteLength > srcSize.dataByteLength || dstSize.pointerLength > srcSize.pointerLength) {
          var srcContent = pointer_1.getContent(l);
          var srcLength = pointer_1.getTargetListLength(l);
          trace("resizing composite list %s due to protocol upgrade, new size: %d", l, object_size_1.getByteLength(dstSize) * srcLength);
          var dstContent = l.segment.allocate(object_size_1.getByteLength(dstSize) * srcLength + 8);
          var res = pointer_1.initPointer(dstContent.segment, dstContent.byteOffset, l);
          pointer_1.setListPointer(res.offsetWords, ListClass._capnp.size, srcLength, res.pointer, dstSize);
          pointer_1.setStructPointer(srcLength, dstSize, dstContent);
          dstContent.byteOffset += 8;
          for (var i = 0; i < srcLength; i++) {
            var srcElementOffset = srcContent.byteOffset + i * object_size_1.getByteLength(srcSize);
            var dstElementOffset = dstContent.byteOffset + i * object_size_1.getByteLength(dstSize);
            dstContent.segment.copyWords(dstElementOffset, srcContent.segment, srcElementOffset, object_size_1.getWordLength(srcSize));
            for (var j = 0; j < srcSize.pointerLength; j++) {
              var srcPtr = new pointer_1.Pointer(srcContent.segment, srcElementOffset + srcSize.dataByteLength + j * 8);
              var dstPtr = new pointer_1.Pointer(dstContent.segment, dstElementOffset + dstSize.dataByteLength + j * 8);
              var srcPtrTarget = pointer_1.followFars(srcPtr);
              var srcPtrContent = pointer_1.getContent(srcPtr);
              if (pointer_1.getTargetPointerType(srcPtr) === pointer_type_1.PointerType.LIST && pointer_1.getTargetListElementSize(srcPtr) === list_element_size_1.ListElementSize.COMPOSITE) {
                srcPtrContent.byteOffset -= 8;
              }
              var r = pointer_1.initPointer(srcPtrContent.segment, srcPtrContent.byteOffset, dstPtr);
              var a = srcPtrTarget.segment.getUint8(srcPtrTarget.byteOffset) & 3;
              var b = srcPtrTarget.segment.getUint32(srcPtrTarget.byteOffset + 4);
              r.pointer.segment.setUint32(r.pointer.byteOffset, a | r.offsetWords << 2);
              r.pointer.segment.setUint32(r.pointer.byteOffset + 4, b);
            }
          }
          srcContent.segment.fillZeroWords(srcContent.byteOffset, object_size_1.getWordLength(srcSize) * srcLength);
        }
      }
      return l;
    }
    exports.getList = getList;
    function getPointer(index, s) {
      checkPointerBounds(index, s);
      var ps = getPointerSection(s);
      ps.byteOffset += index * 8;
      return new pointer_1.Pointer(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
    }
    exports.getPointer = getPointer;
    function getPointerAs(index, PointerClass, s) {
      checkPointerBounds(index, s);
      var ps = getPointerSection(s);
      ps.byteOffset += index * 8;
      return new PointerClass(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
    }
    exports.getPointerAs = getPointerAs;
    function getPointerSection(s) {
      var ps = pointer_1.getContent(s);
      ps.byteOffset += util_1.padToWord(getSize(s).dataByteLength);
      return ps;
    }
    exports.getPointerSection = getPointerSection;
    function getSize(s) {
      if (s._capnp.compositeIndex !== void 0) {
        var c = pointer_1.getContent(s, true);
        c.byteOffset -= 8;
        return pointer_1.getStructSize(c);
      }
      return pointer_1.getTargetStructSize(s);
    }
    exports.getSize = getSize;
    function getStruct(index, StructClass, s, defaultValue) {
      var t = getPointerAs(index, StructClass, s);
      if (pointer_1.isNull(t)) {
        if (defaultValue) {
          pointer_1.Pointer.copyFrom(defaultValue, t);
        } else {
          initStruct(StructClass._capnp.size, t);
        }
      } else {
        pointer_1.validate(pointer_type_1.PointerType.STRUCT, t);
        var ts = pointer_1.getTargetStructSize(t);
        if (ts.dataByteLength < StructClass._capnp.size.dataByteLength || ts.pointerLength < StructClass._capnp.size.pointerLength) {
          trace("need to resize child struct %s", t);
          resize(StructClass._capnp.size, t);
        }
      }
      return t;
    }
    exports.getStruct = getStruct;
    function getText(index, s, defaultValue) {
      var t = text_1.Text.fromPointer(getPointer(index, s));
      if (pointer_1.isNull(t) && defaultValue)
        t.set(0, defaultValue);
      return t.get(0);
    }
    exports.getText = getText;
    function getUint16(byteOffset, s, defaultMask) {
      checkDataBounds(byteOffset, 2, s);
      var ds = getDataSection(s);
      if (defaultMask === void 0) {
        return ds.segment.getUint16(ds.byteOffset + byteOffset);
      }
      return ds.segment.getUint16(ds.byteOffset + byteOffset) ^ defaultMask.getUint16(0, true);
    }
    exports.getUint16 = getUint16;
    function getUint32(byteOffset, s, defaultMask) {
      checkDataBounds(byteOffset, 4, s);
      var ds = getDataSection(s);
      if (defaultMask === void 0) {
        return ds.segment.getUint32(ds.byteOffset + byteOffset);
      }
      return ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint32(0, true);
    }
    exports.getUint32 = getUint32;
    function getUint64(byteOffset, s, defaultMask) {
      checkDataBounds(byteOffset, 8, s);
      var ds = getDataSection(s);
      if (defaultMask === void 0) {
        return ds.segment.getUint64(ds.byteOffset + byteOffset);
      }
      var lo = ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint32(0, true);
      var hi = ds.segment.getUint32(ds.byteOffset + byteOffset + 4) ^ defaultMask.getUint32(4, true);
      TMP_WORD.setUint32(0, lo, constants_1.NATIVE_LITTLE_ENDIAN);
      TMP_WORD.setUint32(4, hi, constants_1.NATIVE_LITTLE_ENDIAN);
      return new types_1.Uint64(new Uint8Array(TMP_WORD.buffer.slice(0)));
    }
    exports.getUint64 = getUint64;
    function getUint8(byteOffset, s, defaultMask) {
      checkDataBounds(byteOffset, 1, s);
      var ds = getDataSection(s);
      if (defaultMask === void 0) {
        return ds.segment.getUint8(ds.byteOffset + byteOffset);
      }
      return ds.segment.getUint8(ds.byteOffset + byteOffset) ^ defaultMask.getUint8(0);
    }
    exports.getUint8 = getUint8;
    function initData(index, length, s) {
      checkPointerBounds(index, s);
      var ps = getPointerSection(s);
      ps.byteOffset += index * 8;
      var l = new data_1.Data(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
      pointer_1.erase(l);
      list_1.List.initList(list_element_size_1.ListElementSize.BYTE, length, l);
      return l;
    }
    exports.initData = initData;
    function initList(index, ListClass, length, s) {
      checkPointerBounds(index, s);
      var ps = getPointerSection(s);
      ps.byteOffset += index * 8;
      var l = new ListClass(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
      pointer_1.erase(l);
      list_1.List.initList(ListClass._capnp.size, length, l, ListClass._capnp.compositeSize);
      return l;
    }
    exports.initList = initList;
    function setBit(bitOffset, value, s, defaultMask) {
      var byteOffset = Math.floor(bitOffset / 8);
      var bitMask = 1 << bitOffset % 8;
      checkDataBounds(byteOffset, 1, s);
      var ds = getDataSection(s);
      var b = ds.segment.getUint8(ds.byteOffset + byteOffset);
      if (defaultMask !== void 0) {
        value = (defaultMask.getUint8(0) & bitMask) !== 0 ? !value : value;
      }
      ds.segment.setUint8(ds.byteOffset + byteOffset, value ? b | bitMask : b & ~bitMask);
    }
    exports.setBit = setBit;
    function setFloat32(byteOffset, value, s, defaultMask) {
      checkDataBounds(byteOffset, 4, s);
      var ds = getDataSection(s);
      if (defaultMask !== void 0) {
        TMP_WORD.setFloat32(0, value, constants_1.NATIVE_LITTLE_ENDIAN);
        var v = TMP_WORD.getUint32(0, constants_1.NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(0, true);
        ds.segment.setUint32(ds.byteOffset + byteOffset, v);
        return;
      }
      ds.segment.setFloat32(ds.byteOffset + byteOffset, value);
    }
    exports.setFloat32 = setFloat32;
    function setFloat64(byteOffset, value, s, defaultMask) {
      checkDataBounds(byteOffset, 8, s);
      var ds = getDataSection(s);
      if (defaultMask !== void 0) {
        TMP_WORD.setFloat64(0, value, constants_1.NATIVE_LITTLE_ENDIAN);
        var lo = TMP_WORD.getUint32(0, constants_1.NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(0, true);
        var hi = TMP_WORD.getUint32(4, constants_1.NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(4, true);
        ds.segment.setUint32(ds.byteOffset + byteOffset, lo);
        ds.segment.setUint32(ds.byteOffset + byteOffset + 4, hi);
        return;
      }
      ds.segment.setFloat64(ds.byteOffset + byteOffset, value);
    }
    exports.setFloat64 = setFloat64;
    function setInt16(byteOffset, value, s, defaultMask) {
      checkDataBounds(byteOffset, 2, s);
      var ds = getDataSection(s);
      if (defaultMask !== void 0) {
        TMP_WORD.setInt16(0, value, constants_1.NATIVE_LITTLE_ENDIAN);
        var v = TMP_WORD.getUint16(0, constants_1.NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint16(0, true);
        ds.segment.setUint16(ds.byteOffset + byteOffset, v);
        return;
      }
      ds.segment.setInt16(ds.byteOffset + byteOffset, value);
    }
    exports.setInt16 = setInt16;
    function setInt32(byteOffset, value, s, defaultMask) {
      checkDataBounds(byteOffset, 4, s);
      var ds = getDataSection(s);
      if (defaultMask !== void 0) {
        TMP_WORD.setInt32(0, value, constants_1.NATIVE_LITTLE_ENDIAN);
        var v = TMP_WORD.getUint32(0, constants_1.NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(0, true);
        ds.segment.setUint32(ds.byteOffset + byteOffset, v);
        return;
      }
      ds.segment.setInt32(ds.byteOffset + byteOffset, value);
    }
    exports.setInt32 = setInt32;
    function setInt64(byteOffset, value, s, defaultMask) {
      checkDataBounds(byteOffset, 8, s);
      var ds = getDataSection(s);
      if (defaultMask !== void 0) {
        for (var i = 0; i < 8; i++) {
          ds.segment.setUint8(ds.byteOffset + byteOffset + i, value.buffer[i] ^ defaultMask.getUint8(i));
        }
        return;
      }
      ds.segment.setInt64(ds.byteOffset + byteOffset, value);
    }
    exports.setInt64 = setInt64;
    function setInt8(byteOffset, value, s, defaultMask) {
      checkDataBounds(byteOffset, 1, s);
      var ds = getDataSection(s);
      if (defaultMask !== void 0) {
        TMP_WORD.setInt8(0, value);
        var v = TMP_WORD.getUint8(0) ^ defaultMask.getUint8(0);
        ds.segment.setUint8(ds.byteOffset + byteOffset, v);
        return;
      }
      ds.segment.setInt8(ds.byteOffset + byteOffset, value);
    }
    exports.setInt8 = setInt8;
    function setPointer(index, value, s) {
      pointer_1.copyFrom(value, getPointer(index, s));
    }
    exports.setPointer = setPointer;
    function setText(index, value, s) {
      text_1.Text.fromPointer(getPointer(index, s)).set(0, value);
    }
    exports.setText = setText;
    function setUint16(byteOffset, value, s, defaultMask) {
      checkDataBounds(byteOffset, 2, s);
      var ds = getDataSection(s);
      if (defaultMask !== void 0)
        value ^= defaultMask.getUint16(0, true);
      ds.segment.setUint16(ds.byteOffset + byteOffset, value);
    }
    exports.setUint16 = setUint16;
    function setUint32(byteOffset, value, s, defaultMask) {
      checkDataBounds(byteOffset, 4, s);
      var ds = getDataSection(s);
      if (defaultMask !== void 0)
        value ^= defaultMask.getUint32(0, true);
      ds.segment.setUint32(ds.byteOffset + byteOffset, value);
    }
    exports.setUint32 = setUint32;
    function setUint64(byteOffset, value, s, defaultMask) {
      checkDataBounds(byteOffset, 8, s);
      var ds = getDataSection(s);
      if (defaultMask !== void 0) {
        for (var i = 0; i < 8; i++) {
          ds.segment.setUint8(ds.byteOffset + byteOffset + i, value.buffer[i] ^ defaultMask.getUint8(i));
        }
        return;
      }
      ds.segment.setUint64(ds.byteOffset + byteOffset, value);
    }
    exports.setUint64 = setUint64;
    function setUint8(byteOffset, value, s, defaultMask) {
      checkDataBounds(byteOffset, 1, s);
      var ds = getDataSection(s);
      if (defaultMask !== void 0)
        value ^= defaultMask.getUint8(0);
      ds.segment.setUint8(ds.byteOffset + byteOffset, value);
    }
    exports.setUint8 = setUint8;
    function testWhich(name, found, wanted, s) {
      if (found !== wanted) {
        throw new Error(util_1.format(errors_1.PTR_INVALID_UNION_ACCESS, s, name, found, wanted));
      }
    }
    exports.testWhich = testWhich;
    function checkDataBounds(byteOffset, byteLength, s) {
      var dataByteLength = getSize(s).dataByteLength;
      if (byteOffset < 0 || byteLength < 0 || byteOffset + byteLength > dataByteLength) {
        throw new Error(util_1.format(errors_1.PTR_STRUCT_DATA_OUT_OF_BOUNDS, s, byteLength, byteOffset, dataByteLength));
      }
    }
    exports.checkDataBounds = checkDataBounds;
    function checkPointerBounds(index, s) {
      var pointerLength = getSize(s).pointerLength;
      if (index < 0 || index >= pointerLength) {
        throw new Error(util_1.format(errors_1.PTR_STRUCT_POINTER_OUT_OF_BOUNDS, s, index, pointerLength));
      }
    }
    exports.checkPointerBounds = checkPointerBounds;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/text-list.js
var require_text_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/text-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var text_1 = require_text();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var TextList2 = function(_super) {
      tslib_1.__extends(TextList3, _super);
      function TextList3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      TextList3.prototype.get = function(index) {
        var c = pointer_1.getContent(this);
        c.byteOffset += index * 8;
        return text_1.Text.fromPointer(c).get(0);
      };
      TextList3.prototype.set = function(index, value) {
        var c = pointer_1.getContent(this);
        c.byteOffset += index * 8;
        text_1.Text.fromPointer(c).set(0, value);
      };
      TextList3.prototype.toString = function() {
        return "Text_" + _super.prototype.toString.call(this);
      };
      TextList3._capnp = {
        displayName: "List<Text>",
        size: list_element_size_1.ListElementSize.POINTER
      };
      return TextList3;
    }(list_1.List);
    exports.TextList = TextList2;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/uint8-list.js
var require_uint8_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/uint8-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var Uint8List2 = function(_super) {
      tslib_1.__extends(Uint8List3, _super);
      function Uint8List3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Uint8List3.prototype.get = function(index) {
        var c = pointer_1.getContent(this);
        return c.segment.getUint8(c.byteOffset + index);
      };
      Uint8List3.prototype.set = function(index, value) {
        var c = pointer_1.getContent(this);
        c.segment.setUint8(c.byteOffset + index, value);
      };
      Uint8List3.prototype.toString = function() {
        return "Uint8_" + _super.prototype.toString.call(this);
      };
      Uint8List3._capnp = {
        displayName: "List<Uint8>",
        size: list_element_size_1.ListElementSize.BYTE
      };
      return Uint8List3;
    }(list_1.List);
    exports.Uint8List = Uint8List2;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/uint16-list.js
var require_uint16_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/uint16-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var Uint16List2 = function(_super) {
      tslib_1.__extends(Uint16List3, _super);
      function Uint16List3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Uint16List3.prototype.get = function(index) {
        var c = pointer_1.getContent(this);
        return c.segment.getUint16(c.byteOffset + index * 2);
      };
      Uint16List3.prototype.set = function(index, value) {
        var c = pointer_1.getContent(this);
        c.segment.setUint16(c.byteOffset + index * 2, value);
      };
      Uint16List3.prototype.toString = function() {
        return "Uint16_" + _super.prototype.toString.call(this);
      };
      Uint16List3._capnp = {
        displayName: "List<Uint16>",
        size: list_element_size_1.ListElementSize.BYTE_2
      };
      return Uint16List3;
    }(list_1.List);
    exports.Uint16List = Uint16List2;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/uint32-list.js
var require_uint32_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/uint32-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var Uint32List2 = function(_super) {
      tslib_1.__extends(Uint32List3, _super);
      function Uint32List3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Uint32List3.prototype.get = function(index) {
        var c = pointer_1.getContent(this);
        return c.segment.getUint32(c.byteOffset + index * 4);
      };
      Uint32List3.prototype.set = function(index, value) {
        var c = pointer_1.getContent(this);
        c.segment.setUint32(c.byteOffset + index * 4, value);
      };
      Uint32List3.prototype.toString = function() {
        return "Uint32_" + _super.prototype.toString.call(this);
      };
      Uint32List3._capnp = {
        displayName: "List<Uint32>",
        size: list_element_size_1.ListElementSize.BYTE_4
      };
      return Uint32List3;
    }(list_1.List);
    exports.Uint32List = Uint32List2;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/uint64-list.js
var require_uint64_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/uint64-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var debug_1 = require_browser();
    var list_element_size_1 = require_list_element_size();
    var list_1 = require_list();
    var pointer_1 = require_pointer();
    var trace = debug_1.default("capnp:list:composite");
    trace("load");
    var Uint64List2 = function(_super) {
      tslib_1.__extends(Uint64List3, _super);
      function Uint64List3() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Uint64List3.prototype.get = function(index) {
        var c = pointer_1.getContent(this);
        return c.segment.getUint64(c.byteOffset + index * 8);
      };
      Uint64List3.prototype.set = function(index, value) {
        var c = pointer_1.getContent(this);
        c.segment.setUint64(c.byteOffset + index * 8, value);
      };
      Uint64List3.prototype.toString = function() {
        return "Uint64_" + _super.prototype.toString.call(this);
      };
      Uint64List3._capnp = {
        displayName: "List<Uint64>",
        size: list_element_size_1.ListElementSize.BYTE_8
      };
      return Uint64List3;
    }(list_1.List);
    exports.Uint64List = Uint64List2;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/void.js
var require_void = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/void.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var object_size_1 = require_object_size();
    var struct_1 = require_struct();
    var Void = function(_super) {
      tslib_1.__extends(Void2, _super);
      function Void2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Void2._capnp = {
        displayName: "Void",
        id: "0",
        size: new object_size_1.ObjectSize(0, 0)
      };
      return Void2;
    }(struct_1.Struct);
    exports.Void = Void;
    exports.VOID = void 0;
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/void-list.js
var require_void_list = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/void-list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var pointer_list_1 = require_pointer_list();
    var void_1 = require_void();
    exports.VoidList = pointer_list_1.PointerList(void_1.Void);
  }
});

// node_modules/capnp-ts/lib/serialization/pointers/index.js
var require_pointers = __commonJS({
  "node_modules/capnp-ts/lib/serialization/pointers/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var any_pointer_list_1 = require_any_pointer_list();
    exports.AnyPointerList = any_pointer_list_1.AnyPointerList;
    var bool_list_1 = require_bool_list();
    exports.BoolList = bool_list_1.BoolList;
    var composite_list_1 = require_composite_list();
    exports.CompositeList = composite_list_1.CompositeList;
    var data_1 = require_data();
    exports.Data = data_1.Data;
    var data_list_1 = require_data_list();
    exports.DataList = data_list_1.DataList;
    var float32_list_1 = require_float32_list();
    exports.Float32List = float32_list_1.Float32List;
    var float64_list_1 = require_float64_list();
    exports.Float64List = float64_list_1.Float64List;
    var int8_list_1 = require_int8_list();
    exports.Int8List = int8_list_1.Int8List;
    var int16_list_1 = require_int16_list();
    exports.Int16List = int16_list_1.Int16List;
    var int32_list_1 = require_int32_list();
    exports.Int32List = int32_list_1.Int32List;
    var int64_list_1 = require_int64_list();
    exports.Int64List = int64_list_1.Int64List;
    var interface_1 = require_interface();
    exports.Interface = interface_1.Interface;
    var interface_list_1 = require_interface_list();
    exports.InterfaceList = interface_list_1.InterfaceList;
    var list_1 = require_list();
    exports.List = list_1.List;
    var orphan_1 = require_orphan();
    exports.Orphan = orphan_1.Orphan;
    var pointer_list_1 = require_pointer_list();
    exports.PointerList = pointer_list_1.PointerList;
    var pointer_type_1 = require_pointer_type();
    exports.PointerType = pointer_type_1.PointerType;
    var pointer_1 = require_pointer();
    exports.Pointer = pointer_1.Pointer;
    var struct_1 = require_struct();
    exports.Struct = struct_1.Struct;
    var text_1 = require_text();
    exports.Text = text_1.Text;
    var text_list_1 = require_text_list();
    exports.TextList = text_list_1.TextList;
    var uint8_list_1 = require_uint8_list();
    exports.Uint8List = uint8_list_1.Uint8List;
    var uint16_list_1 = require_uint16_list();
    exports.Uint16List = uint16_list_1.Uint16List;
    var uint32_list_1 = require_uint32_list();
    exports.Uint32List = uint32_list_1.Uint32List;
    var uint64_list_1 = require_uint64_list();
    exports.Uint64List = uint64_list_1.Uint64List;
    var void_1 = require_void();
    exports.Void = void_1.Void;
    exports.VOID = void_1.VOID;
    var void_list_1 = require_void_list();
    exports.VoidList = void_list_1.VoidList;
  }
});

// node_modules/capnp-ts/lib/serialization/segment.js
var require_segment = __commonJS({
  "node_modules/capnp-ts/lib/serialization/segment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    var types_1 = require_types();
    var util_1 = require_util();
    var pointers_1 = require_pointers();
    var trace = debug_1.default("capnp:segment");
    trace("load");
    var Segment = function() {
      function Segment2(id, message, buffer, byteLength) {
        if (byteLength === void 0) {
          byteLength = 0;
        }
        this[Symbol.toStringTag] = "Segment";
        this.id = id;
        this.message = message;
        this.buffer = buffer;
        this._dv = new DataView(buffer);
        this.byteOffset = 0;
        this.byteLength = byteLength;
      }
      Segment2.prototype.allocate = function(byteLength) {
        trace("allocate(%d)", byteLength);
        var segment = this;
        byteLength = util_1.padToWord(byteLength);
        if (byteLength > constants_1.MAX_SEGMENT_LENGTH - 8) {
          throw new Error(util_1.format(errors_1.SEG_SIZE_OVERFLOW, byteLength));
        }
        if (!segment.hasCapacity(byteLength)) {
          segment = segment.message.allocateSegment(byteLength);
        }
        var byteOffset = segment.byteLength;
        segment.byteLength = segment.byteLength + byteLength;
        trace("Allocated %x bytes in %s (requested segment: %s).", byteLength, this, segment);
        return new pointers_1.Pointer(segment, byteOffset);
      };
      Segment2.prototype.copyWord = function(byteOffset, srcSegment, srcByteOffset) {
        var value = srcSegment._dv.getFloat64(srcByteOffset, constants_1.NATIVE_LITTLE_ENDIAN);
        this._dv.setFloat64(byteOffset, value, constants_1.NATIVE_LITTLE_ENDIAN);
      };
      Segment2.prototype.copyWords = function(byteOffset, srcSegment, srcByteOffset, wordLength) {
        var dst = new Float64Array(this.buffer, byteOffset, wordLength);
        var src = new Float64Array(srcSegment.buffer, srcByteOffset, wordLength);
        dst.set(src);
      };
      Segment2.prototype.fillZeroWords = function(byteOffset, wordLength) {
        new Float64Array(this.buffer, byteOffset, wordLength).fill(0);
      };
      Segment2.prototype.getCapacity = function() {
        return this.buffer.byteLength;
      };
      Segment2.prototype.getFloat32 = function(byteOffset) {
        return this._dv.getFloat32(byteOffset, true);
      };
      Segment2.prototype.getFloat64 = function(byteOffset) {
        return this._dv.getFloat64(byteOffset, true);
      };
      Segment2.prototype.getInt16 = function(byteOffset) {
        return this._dv.getInt16(byteOffset, true);
      };
      Segment2.prototype.getInt32 = function(byteOffset) {
        return this._dv.getInt32(byteOffset, true);
      };
      Segment2.prototype.getInt64 = function(byteOffset) {
        return new types_1.Int64(new Uint8Array(this.buffer.slice(byteOffset, byteOffset + 8)));
      };
      Segment2.prototype.getInt8 = function(byteOffset) {
        return this._dv.getInt8(byteOffset);
      };
      Segment2.prototype.getUint16 = function(byteOffset) {
        return this._dv.getUint16(byteOffset, true);
      };
      Segment2.prototype.getUint32 = function(byteOffset) {
        return this._dv.getUint32(byteOffset, true);
      };
      Segment2.prototype.getUint64 = function(byteOffset) {
        return new types_1.Uint64(new Uint8Array(this.buffer.slice(byteOffset, byteOffset + 8)));
      };
      Segment2.prototype.getUint8 = function(byteOffset) {
        return this._dv.getUint8(byteOffset);
      };
      Segment2.prototype.hasCapacity = function(byteLength) {
        trace("hasCapacity(%d)", byteLength);
        return this.buffer.byteLength - this.byteLength >= byteLength;
      };
      Segment2.prototype.isWordZero = function(byteOffset) {
        return this._dv.getFloat64(byteOffset, constants_1.NATIVE_LITTLE_ENDIAN) === 0;
      };
      Segment2.prototype.replaceBuffer = function(buffer) {
        trace("replaceBuffer(%p)", buffer);
        if (this.buffer === buffer)
          return;
        if (buffer.byteLength < this.byteLength) {
          throw new Error(errors_1.SEG_REPLACEMENT_BUFFER_TOO_SMALL);
        }
        this._dv = new DataView(buffer);
        this.buffer = buffer;
      };
      Segment2.prototype.setFloat32 = function(byteOffset, val) {
        this._dv.setFloat32(byteOffset, val, true);
      };
      Segment2.prototype.setFloat64 = function(byteOffset, val) {
        this._dv.setFloat64(byteOffset, val, true);
      };
      Segment2.prototype.setInt16 = function(byteOffset, val) {
        this._dv.setInt16(byteOffset, val, true);
      };
      Segment2.prototype.setInt32 = function(byteOffset, val) {
        this._dv.setInt32(byteOffset, val, true);
      };
      Segment2.prototype.setInt8 = function(byteOffset, val) {
        this._dv.setInt8(byteOffset, val);
      };
      Segment2.prototype.setInt64 = function(byteOffset, val) {
        this._dv.setUint8(byteOffset, val.buffer[0]);
        this._dv.setUint8(byteOffset + 1, val.buffer[1]);
        this._dv.setUint8(byteOffset + 2, val.buffer[2]);
        this._dv.setUint8(byteOffset + 3, val.buffer[3]);
        this._dv.setUint8(byteOffset + 4, val.buffer[4]);
        this._dv.setUint8(byteOffset + 5, val.buffer[5]);
        this._dv.setUint8(byteOffset + 6, val.buffer[6]);
        this._dv.setUint8(byteOffset + 7, val.buffer[7]);
      };
      Segment2.prototype.setUint16 = function(byteOffset, val) {
        this._dv.setUint16(byteOffset, val, true);
      };
      Segment2.prototype.setUint32 = function(byteOffset, val) {
        this._dv.setUint32(byteOffset, val, true);
      };
      Segment2.prototype.setUint64 = function(byteOffset, val) {
        this._dv.setUint8(byteOffset + 0, val.buffer[0]);
        this._dv.setUint8(byteOffset + 1, val.buffer[1]);
        this._dv.setUint8(byteOffset + 2, val.buffer[2]);
        this._dv.setUint8(byteOffset + 3, val.buffer[3]);
        this._dv.setUint8(byteOffset + 4, val.buffer[4]);
        this._dv.setUint8(byteOffset + 5, val.buffer[5]);
        this._dv.setUint8(byteOffset + 6, val.buffer[6]);
        this._dv.setUint8(byteOffset + 7, val.buffer[7]);
      };
      Segment2.prototype.setUint8 = function(byteOffset, val) {
        this._dv.setUint8(byteOffset, val);
      };
      Segment2.prototype.setWordZero = function(byteOffset) {
        this._dv.setFloat64(byteOffset, 0, constants_1.NATIVE_LITTLE_ENDIAN);
      };
      Segment2.prototype.toString = function() {
        return util_1.format("Segment_id:%d,off:%a,len:%a,cap:%a", this.id, this.byteLength, this.byteOffset, this.buffer.byteLength);
      };
      return Segment2;
    }();
    exports.Segment = Segment;
  }
});

// node_modules/capnp-ts/lib/serialization/message.js
var require_message = __commonJS({
  "node_modules/capnp-ts/lib/serialization/message.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var debug_1 = require_browser();
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    var util_1 = require_util();
    var arena_1 = require_arena2();
    var packing_1 = require_packing();
    var pointers_1 = require_pointers();
    var segment_1 = require_segment();
    var pointer_1 = require_pointer();
    var struct_1 = require_struct();
    var trace = debug_1.default("capnp:message");
    trace("load");
    var Message5 = function() {
      function Message6(src, packed, singleSegment) {
        if (packed === void 0) {
          packed = true;
        }
        if (singleSegment === void 0) {
          singleSegment = false;
        }
        this._capnp = initMessage(src, packed, singleSegment);
        if (src && !isAnyArena(src))
          preallocateSegments(this);
        trace("new %s", this);
      }
      Message6.prototype.allocateSegment = function(byteLength) {
        return allocateSegment(byteLength, this);
      };
      Message6.prototype.dump = function() {
        return dump(this);
      };
      Message6.prototype.getRoot = function(RootStruct) {
        return getRoot(RootStruct, this);
      };
      Message6.prototype.getSegment = function(id) {
        return getSegment(id, this);
      };
      Message6.prototype.initRoot = function(RootStruct) {
        return initRoot(RootStruct, this);
      };
      Message6.prototype.setRoot = function(src) {
        setRoot(src, this);
      };
      Message6.prototype.toArrayBuffer = function() {
        return toArrayBuffer(this);
      };
      Message6.prototype.toPackedArrayBuffer = function() {
        return toPackedArrayBuffer(this);
      };
      Message6.prototype.toString = function() {
        return "Message_arena:" + this._capnp.arena;
      };
      Message6.allocateSegment = allocateSegment;
      Message6.dump = dump;
      Message6.getRoot = getRoot;
      Message6.getSegment = getSegment;
      Message6.initRoot = initRoot;
      Message6.readRawPointer = readRawPointer;
      Message6.toArrayBuffer = toArrayBuffer;
      Message6.toPackedArrayBuffer = toPackedArrayBuffer;
      return Message6;
    }();
    exports.Message = Message5;
    function initMessage(src, packed, singleSegment) {
      if (packed === void 0) {
        packed = true;
      }
      if (singleSegment === void 0) {
        singleSegment = false;
      }
      if (src === void 0) {
        return {
          arena: new arena_1.SingleSegmentArena(),
          segments: [],
          traversalLimit: constants_1.DEFAULT_TRAVERSE_LIMIT
        };
      }
      if (isAnyArena(src)) {
        return { arena: src, segments: [], traversalLimit: constants_1.DEFAULT_TRAVERSE_LIMIT };
      }
      var buf = src;
      if (isArrayBufferView(buf)) {
        buf = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      }
      if (packed)
        buf = packing_1.unpack(buf);
      if (singleSegment) {
        return {
          arena: new arena_1.SingleSegmentArena(buf),
          segments: [],
          traversalLimit: constants_1.DEFAULT_TRAVERSE_LIMIT
        };
      }
      return {
        arena: new arena_1.MultiSegmentArena(getFramedSegments(buf)),
        segments: [],
        traversalLimit: constants_1.DEFAULT_TRAVERSE_LIMIT
      };
    }
    exports.initMessage = initMessage;
    function getFramedSegments(message) {
      var dv = new DataView(message);
      var segmentCount = dv.getUint32(0, true) + 1;
      var segments = new Array(segmentCount);
      trace("reading %d framed segments from stream", segmentCount);
      var byteOffset = 4 + segmentCount * 4;
      byteOffset += byteOffset % 8;
      if (byteOffset + segmentCount * 4 > message.byteLength) {
        throw new Error(errors_1.MSG_INVALID_FRAME_HEADER);
      }
      for (var i = 0; i < segmentCount; i++) {
        var byteLength = dv.getUint32(4 + i * 4, true) * 8;
        if (byteOffset + byteLength > message.byteLength) {
          throw new Error(errors_1.MSG_INVALID_FRAME_HEADER);
        }
        segments[i] = message.slice(byteOffset, byteOffset + byteLength);
        byteOffset += byteLength;
      }
      return segments;
    }
    exports.getFramedSegments = getFramedSegments;
    function preallocateSegments(m) {
      var numSegments = arena_1.Arena.getNumSegments(m._capnp.arena);
      if (numSegments < 1)
        throw new Error(errors_1.MSG_NO_SEGMENTS_IN_ARENA);
      m._capnp.segments = new Array(numSegments);
      for (var i = 0; i < numSegments; i++) {
        var buffer = arena_1.Arena.getBuffer(i, m._capnp.arena);
        var segment = new segment_1.Segment(i, m, buffer, buffer.byteLength);
        m._capnp.segments[i] = segment;
      }
    }
    exports.preallocateSegments = preallocateSegments;
    function isArrayBufferView(src) {
      return src.byteOffset !== void 0;
    }
    function isAnyArena(o) {
      return o.kind !== void 0;
    }
    function allocateSegment(byteLength, m) {
      trace("allocating %x bytes for %s", byteLength, m);
      var res = arena_1.Arena.allocate(byteLength, m._capnp.segments, m._capnp.arena);
      var s;
      if (res.id === m._capnp.segments.length) {
        s = new segment_1.Segment(res.id, m, res.buffer);
        trace("adding new segment %s", s);
        m._capnp.segments.push(s);
      } else if (res.id < 0 || res.id > m._capnp.segments.length) {
        throw new Error(util_1.format(errors_1.MSG_SEGMENT_OUT_OF_BOUNDS, res.id, m));
      } else {
        s = m._capnp.segments[res.id];
        trace("replacing segment %s with buffer (len:%d)", s, res.buffer.byteLength);
        s.replaceBuffer(res.buffer);
      }
      return s;
    }
    exports.allocateSegment = allocateSegment;
    function dump(m) {
      var r = "";
      if (m._capnp.segments.length === 0) {
        return "================\nNo Segments\n================\n";
      }
      for (var i = 0; i < m._capnp.segments.length; i++) {
        r += "================\nSegment #" + i + "\n================\n";
        var _a = m._capnp.segments[i], buffer = _a.buffer, byteLength = _a.byteLength;
        var b = new Uint8Array(buffer, 0, byteLength);
        r += util_1.dumpBuffer(b);
      }
      return r;
    }
    exports.dump = dump;
    function getRoot(RootStruct, m) {
      var root = new RootStruct(m.getSegment(0), 0);
      pointer_1.validate(pointers_1.PointerType.STRUCT, root);
      var ts = pointer_1.getTargetStructSize(root);
      if (ts.dataByteLength < RootStruct._capnp.size.dataByteLength || ts.pointerLength < RootStruct._capnp.size.pointerLength) {
        trace("need to resize root struct %s", root);
        struct_1.resize(RootStruct._capnp.size, root);
      }
      return root;
    }
    exports.getRoot = getRoot;
    function getSegment(id, m) {
      var segmentLength = m._capnp.segments.length;
      if (id === 0 && segmentLength === 0) {
        var arenaSegments = arena_1.Arena.getNumSegments(m._capnp.arena);
        if (arenaSegments === 0) {
          allocateSegment(constants_1.DEFAULT_BUFFER_SIZE, m);
        } else {
          m._capnp.segments[0] = new segment_1.Segment(0, m, arena_1.Arena.getBuffer(0, m._capnp.arena));
        }
        if (!m._capnp.segments[0].hasCapacity(8)) {
          throw new Error(errors_1.MSG_SEGMENT_TOO_SMALL);
        }
        m._capnp.segments[0].allocate(8);
        return m._capnp.segments[0];
      }
      if (id < 0 || id >= segmentLength) {
        throw new Error(util_1.format(errors_1.MSG_SEGMENT_OUT_OF_BOUNDS, id, m));
      }
      return m._capnp.segments[id];
    }
    exports.getSegment = getSegment;
    function initRoot(RootStruct, m) {
      var root = new RootStruct(m.getSegment(0), 0);
      struct_1.initStruct(RootStruct._capnp.size, root);
      trace("Initialized root pointer %s for %s.", root, m);
      return root;
    }
    exports.initRoot = initRoot;
    function readRawPointer(data) {
      return new pointers_1.Pointer(new Message5(data).getSegment(0), 0);
    }
    exports.readRawPointer = readRawPointer;
    function setRoot(src, m) {
      pointers_1.Pointer.copyFrom(src, new pointers_1.Pointer(m.getSegment(0), 0));
    }
    exports.setRoot = setRoot;
    function toArrayBuffer(m) {
      var streamFrame = getStreamFrame(m);
      if (m._capnp.segments.length === 0)
        getSegment(0, m);
      var segments = m._capnp.segments;
      var totalLength = streamFrame.byteLength + segments.reduce(function(l, s) {
        return l + util_1.padToWord(s.byteLength);
      }, 0);
      var out = new Uint8Array(new ArrayBuffer(totalLength));
      var o = streamFrame.byteLength;
      out.set(new Uint8Array(streamFrame));
      segments.forEach(function(s) {
        var segmentLength = util_1.padToWord(s.byteLength);
        out.set(new Uint8Array(s.buffer, 0, segmentLength), o);
        o += segmentLength;
      });
      return out.buffer;
    }
    exports.toArrayBuffer = toArrayBuffer;
    function toPackedArrayBuffer(m) {
      var streamFrame = packing_1.pack(getStreamFrame(m));
      if (m._capnp.segments.length === 0)
        m.getSegment(0);
      var segments = m._capnp.segments.map(function(s) {
        return packing_1.pack(s.buffer, 0, util_1.padToWord(s.byteLength));
      });
      var totalLength = streamFrame.byteLength + segments.reduce(function(l, s) {
        return l + s.byteLength;
      }, 0);
      var out = new Uint8Array(new ArrayBuffer(totalLength));
      var o = streamFrame.byteLength;
      out.set(new Uint8Array(streamFrame));
      segments.forEach(function(s) {
        out.set(new Uint8Array(s), o);
        o += s.byteLength;
      });
      return out.buffer;
    }
    exports.toPackedArrayBuffer = toPackedArrayBuffer;
    function getStreamFrame(m) {
      var length = m._capnp.segments.length;
      if (length === 0) {
        return new Float64Array(1).buffer;
      }
      var frameLength = 4 + length * 4 + (1 - length % 2) * 4;
      var out = new DataView(new ArrayBuffer(frameLength));
      trace("Writing message stream frame with segment count: %d.", length);
      out.setUint32(0, length - 1, true);
      m._capnp.segments.forEach(function(s, i) {
        trace("Message segment %d word count: %d.", s.id, s.byteLength / 8);
        out.setUint32(i * 4 + 4, s.byteLength / 8, true);
      });
      return out.buffer;
    }
    exports.getStreamFrame = getStreamFrame;
  }
});

// node_modules/capnp-ts/lib/serialization/index.js
var require_serialization = __commonJS({
  "node_modules/capnp-ts/lib/serialization/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_mask(), exports);
    var list_element_size_1 = require_list_element_size();
    exports.ListElementSize = list_element_size_1.ListElementSize;
    var message_1 = require_message();
    exports.Message = message_1.Message;
    exports.readRawPointer = message_1.readRawPointer;
    var object_size_1 = require_object_size();
    exports.ObjectSize = object_size_1.ObjectSize;
    tslib_1.__exportStar(require_pointers(), exports);
  }
});

// node_modules/capnp-ts/lib/index.js
var require_lib = __commonJS({
  "node_modules/capnp-ts/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var serialization_1 = require_serialization();
    exports.ListElementSize = serialization_1.ListElementSize;
    exports.Message = serialization_1.Message;
    exports.ObjectSize = serialization_1.ObjectSize;
    exports.readRawPointer = serialization_1.readRawPointer;
    exports.AnyPointerList = serialization_1.AnyPointerList;
    exports.BoolList = serialization_1.BoolList;
    exports.CompositeList = serialization_1.CompositeList;
    exports.Data = serialization_1.Data;
    exports.DataList = serialization_1.DataList;
    exports.Float32List = serialization_1.Float32List;
    exports.Float64List = serialization_1.Float64List;
    exports.Int16List = serialization_1.Int16List;
    exports.Int32List = serialization_1.Int32List;
    exports.Int64List = serialization_1.Int64List;
    exports.Int8List = serialization_1.Int8List;
    exports.Interface = serialization_1.Interface;
    exports.InterfaceList = serialization_1.InterfaceList;
    exports.List = serialization_1.List;
    exports.Orphan = serialization_1.Orphan;
    exports.PointerList = serialization_1.PointerList;
    exports.PointerType = serialization_1.PointerType;
    exports.Pointer = serialization_1.Pointer;
    exports.Struct = serialization_1.Struct;
    exports.Text = serialization_1.Text;
    exports.TextList = serialization_1.TextList;
    exports.Uint16List = serialization_1.Uint16List;
    exports.Uint32List = serialization_1.Uint32List;
    exports.Uint64List = serialization_1.Uint64List;
    exports.Uint8List = serialization_1.Uint8List;
    exports.VoidList = serialization_1.VoidList;
    exports.Void = serialization_1.Void;
    exports.getBitMask = serialization_1.getBitMask;
    exports.getFloat32Mask = serialization_1.getFloat32Mask;
    exports.getFloat64Mask = serialization_1.getFloat64Mask;
    exports.getInt16Mask = serialization_1.getInt16Mask;
    exports.getInt32Mask = serialization_1.getInt32Mask;
    exports.getInt64Mask = serialization_1.getInt64Mask;
    exports.getInt8Mask = serialization_1.getInt8Mask;
    exports.getUint16Mask = serialization_1.getUint16Mask;
    exports.getUint32Mask = serialization_1.getUint32Mask;
    exports.getUint64Mask = serialization_1.getUint64Mask;
    exports.getUint8Mask = serialization_1.getUint8Mask;
    var types_1 = require_types();
    exports.Int64 = types_1.Int64;
    exports.Uint64 = types_1.Uint64;
  }
});

// node-modules-polyfills:os
var os_exports = {};
__export(os_exports, {
  EOL: () => EOL,
  arch: () => arch,
  cpus: () => cpus,
  default: () => os_default,
  endianness: () => endianness,
  freemem: () => freemem,
  getNetworkInterfaces: () => getNetworkInterfaces,
  hostname: () => hostname,
  loadavg: () => loadavg,
  networkInterfaces: () => networkInterfaces,
  platform: () => platform,
  release: () => release,
  tmpDir: () => tmpDir,
  tmpdir: () => tmpdir,
  totalmem: () => totalmem,
  type: () => type,
  uptime: () => uptime
});
function endianness() {
  if (typeof _endianness === "undefined") {
    var a = new ArrayBuffer(2);
    var b = new Uint8Array(a);
    var c = new Uint16Array(a);
    b[0] = 1;
    b[1] = 2;
    if (c[0] === 258) {
      _endianness = "BE";
    } else if (c[0] === 513) {
      _endianness = "LE";
    } else {
      throw new Error("unable to figure out endianess");
    }
  }
  return _endianness;
}
function hostname() {
  if (typeof globalThis.location !== "undefined") {
    return globalThis.location.hostname;
  } else
    return "";
}
function loadavg() {
  return [];
}
function uptime() {
  return 0;
}
function freemem() {
  return Number.MAX_VALUE;
}
function totalmem() {
  return Number.MAX_VALUE;
}
function cpus() {
  return [];
}
function type() {
  return "Browser";
}
function release() {
  if (typeof globalThis.navigator !== "undefined") {
    return globalThis.navigator.appVersion;
  }
  return "";
}
function networkInterfaces() {
}
function getNetworkInterfaces() {
}
function arch() {
  return "javascript";
}
function platform() {
  return "browser";
}
function tmpDir() {
  return "/tmp";
}
var _endianness, tmpdir, EOL, os_default;
var init_os = __esm({
  "node-modules-polyfills:os"() {
    tmpdir = tmpDir;
    EOL = "\n";
    os_default = {
      EOL,
      tmpdir,
      tmpDir,
      networkInterfaces,
      getNetworkInterfaces,
      release,
      type,
      cpus,
      totalmem,
      freemem,
      uptime,
      loadavg,
      hostname,
      endianness
    };
  }
});

// node-modules-polyfills-commonjs:os
var require_os = __commonJS({
  "node-modules-polyfills-commonjs:os"(exports, module) {
    var polyfill = (init_os(), __toCommonJS(os_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k in polyfill) {
        module.exports[k] = polyfill[k];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});

// node_modules/paralleljs/lib/parallel.js
var require_parallel = __commonJS({
  "node_modules/paralleljs/lib/parallel.js"(exports, module) {
    (function() {
      const isCommonJS = typeof module !== "undefined" && module.exports;
      const isNode2 = !(typeof window !== "undefined" && this === window);
      var setImmediate = setImmediate || function(cb) {
        setTimeout(cb, 0);
      };
      const Worker = isNode2 ? __require(`${__dirname}/Worker.js`) : self.Worker;
      const URL2 = typeof self !== "undefined" ? self.URL ? self.URL : self.webkitURL : null;
      const _supports = !!(isNode2 || self.Worker);
      function extend(from, to) {
        if (!to)
          to = {};
        for (const i in from) {
          if (to[i] === void 0)
            to[i] = from[i];
        }
        return to;
      }
      function Operation() {
        this._callbacks = [];
        this._errCallbacks = [];
        this._resolved = 0;
        this._result = null;
      }
      Operation.prototype.resolve = function(err, res) {
        if (!err) {
          this._resolved = 1;
          this._result = res;
          for (let i = 0; i < this._callbacks.length; ++i) {
            this._callbacks[i](res);
          }
        } else {
          this._resolved = 2;
          this._result = err;
          for (let iE = 0; iE < this._errCallbacks.length; ++iE) {
            this._errCallbacks[iE](err);
          }
        }
        this._callbacks = [];
        this._errCallbacks = [];
      };
      Operation.prototype.then = function(cb, errCb) {
        if (this._resolved === 1) {
          if (cb) {
            cb(this._result);
          }
          return;
        }
        if (this._resolved === 2) {
          if (errCb) {
            errCb(this._result);
          }
          return;
        }
        if (cb) {
          this._callbacks[this._callbacks.length] = cb;
        }
        if (errCb) {
          this._errCallbacks[this._errCallbacks.length] = errCb;
        }
        return this;
      };
      const defaults = {
        evalPath: isNode2 ? `${__dirname}/eval.js` : null,
        maxWorkers: isNode2 ? require_os().cpus().length : navigator.hardwareConcurrency || 4,
        synchronous: true,
        env: {},
        envNamespace: "env"
      };
      function Parallel2(data, options) {
        this.data = data;
        this.options = extend(defaults, options);
        this.operation = new Operation();
        this.operation.resolve(null, this.data);
        this.requiredScripts = [];
        this.requiredFunctions = [];
      }
      Parallel2.isSupported = function() {
        return _supports;
      };
      Parallel2.prototype.getWorkerSource = function(cb, env) {
        const that = this;
        let preStr = "";
        let i = 0;
        if (!isNode2 && this.requiredScripts.length !== 0) {
          preStr += `importScripts("${this.requiredScripts.join('","')}");\r
`;
        }
        for (i = 0; i < this.requiredFunctions.length; ++i) {
          if (this.requiredFunctions[i].name) {
            preStr += `var ${this.requiredFunctions[i].name} = ${this.requiredFunctions[i].fn.toString()};`;
          } else {
            preStr += this.requiredFunctions[i].fn.toString();
          }
        }
        env = JSON.stringify(env || {});
        const ns = this.options.envNamespace;
        if (isNode2) {
          return `${preStr}process.on("message", function(e) {global.${ns} = ${env};process.send(JSON.stringify((${cb.toString()})(JSON.parse(e).data)))})`;
        }
        return `${preStr}self.onmessage = function(e) {var global = {}; global.${ns} = ${env};self.postMessage((${cb.toString()})(e.data))}`;
      };
      Parallel2.prototype.require = function() {
        const args = Array.prototype.slice.call(arguments, 0);
        let func;
        for (let i = 0; i < args.length; i++) {
          func = args[i];
          if (typeof func === "string") {
            this.requiredScripts.push(func);
          } else if (typeof func === "function") {
            this.requiredFunctions.push({ fn: func });
          } else if (typeof func === "object") {
            this.requiredFunctions.push(func);
          }
        }
        return this;
      };
      Parallel2.prototype._spawnWorker = function(cb, env) {
        let wrk;
        const src = this.getWorkerSource(cb, env);
        if (isNode2) {
          wrk = new Worker(this.options.evalPath);
          wrk.postMessage(src);
        } else {
          if (Worker === void 0) {
            return void 0;
          }
          try {
            if (this.requiredScripts.length !== 0) {
              if (this.options.evalPath !== null) {
                wrk = new Worker(this.options.evalPath);
                wrk.postMessage(src);
              } else {
                throw new Error("Can't use required scripts without eval.js!");
              }
            } else if (!URL2) {
              throw new Error("Can't create a blob URL in this browser!");
            } else {
              const blob = new Blob([src], { type: "text/javascript" });
              const url = URL2.createObjectURL(blob);
              wrk = new Worker(url);
            }
          } catch (e) {
            if (this.options.evalPath !== null) {
              wrk = new Worker(this.options.evalPath);
              wrk.postMessage(src);
            } else {
              throw e;
            }
          }
        }
        return wrk;
      };
      Parallel2.prototype.spawn = function(cb, env) {
        const that = this;
        const newOp = new Operation();
        let timeout;
        env = extend(this.options.env, env || {});
        this.operation.then(() => {
          if (env.timeout) {
            timeout = setTimeout(function() {
              if (!newOp.resolved) {
                wrk.terminate();
                newOp.resolve(new Error("Operation timed out!"), null);
              }
            }, env.timeout);
          }
          const wrk = that._spawnWorker(cb, env);
          if (wrk !== void 0) {
            wrk.onmessage = function(msg) {
              if (timeout)
                clearTimeout(timeout);
              wrk.terminate();
              that.data = msg.data;
              newOp.resolve(null, that.data);
            };
            wrk.onerror = function(e) {
              if (timeout)
                clearTimeout(timeout);
              wrk.terminate();
              newOp.resolve(e, null);
            };
            wrk.postMessage(that.data);
          } else if (that.options.synchronous) {
            setImmediate(() => {
              try {
                that.data = cb(that.data);
                newOp.resolve(null, that.data);
              } catch (e) {
                newOp.resolve(e, null);
              }
            });
          } else {
            throw new Error(
              "Workers do not exist and synchronous operation not allowed!"
            );
          }
        });
        this.operation = newOp;
        return this;
      };
      Parallel2.prototype._spawnMapWorker = function(i, cb, done, env, wrk) {
        const that = this;
        if (!wrk)
          wrk = that._spawnWorker(cb, env);
        if (wrk !== void 0) {
          wrk.onmessage = function(msg) {
            that.data[i] = msg.data;
            done(null, wrk);
          };
          wrk.onerror = function(e) {
            wrk.terminate();
            done(e);
          };
          wrk.postMessage(that.data[i]);
        } else if (that.options.synchronous) {
          setImmediate(() => {
            that.data[i] = cb(that.data[i]);
            done();
          });
        } else {
          throw new Error(
            "Workers do not exist and synchronous operation not allowed!"
          );
        }
      };
      Parallel2.prototype.map = function(cb, env) {
        env = extend(this.options.env, env || {});
        if (!this.data.length) {
          return this.spawn(cb, env);
        }
        const that = this;
        let startedOps = 0;
        let doneOps = 0;
        function done(err, wrk) {
          if (err) {
            newOp.resolve(err, null);
          } else if (++doneOps === that.data.length) {
            newOp.resolve(null, that.data);
            if (wrk)
              wrk.terminate();
          } else if (startedOps < that.data.length) {
            that._spawnMapWorker(startedOps++, cb, done, env, wrk);
          } else if (wrk)
            wrk.terminate();
        }
        var newOp = new Operation();
        this.operation.then(
          () => {
            for (; startedOps - doneOps < that.options.maxWorkers && startedOps < that.data.length; ++startedOps) {
              that._spawnMapWorker(startedOps, cb, done, env);
            }
          },
          (err) => {
            newOp.resolve(err, null);
          }
        );
        this.operation = newOp;
        return this;
      };
      Parallel2.prototype._spawnReduceWorker = function(data, cb, done, env, wrk) {
        const that = this;
        if (!wrk)
          wrk = that._spawnWorker(cb, env);
        if (wrk !== void 0) {
          wrk.onmessage = function(msg) {
            that.data[that.data.length] = msg.data;
            done(null, wrk);
          };
          wrk.onerror = function(e) {
            wrk.terminate();
            done(e, null);
          };
          wrk.postMessage(data);
        } else if (that.options.synchronous) {
          setImmediate(() => {
            that.data[that.data.length] = cb(data);
            done();
          });
        } else {
          throw new Error(
            "Workers do not exist and synchronous operation not allowed!"
          );
        }
      };
      Parallel2.prototype.reduce = function(cb, env) {
        env = extend(this.options.env, env || {});
        if (!this.data.length) {
          throw new Error("Can't reduce non-array data");
        }
        let runningWorkers = 0;
        const that = this;
        function done(err, wrk) {
          --runningWorkers;
          if (err) {
            newOp.resolve(err, null);
          } else if (that.data.length === 1 && runningWorkers === 0) {
            that.data = that.data[0];
            newOp.resolve(null, that.data);
            if (wrk)
              wrk.terminate();
          } else if (that.data.length > 1) {
            ++runningWorkers;
            that._spawnReduceWorker(
              [that.data[0], that.data[1]],
              cb,
              done,
              env,
              wrk
            );
            that.data.splice(0, 2);
          } else if (wrk)
            wrk.terminate();
        }
        var newOp = new Operation();
        this.operation.then(() => {
          if (that.data.length === 1) {
            newOp.resolve(null, that.data[0]);
          } else {
            for (var i = 0; i < that.options.maxWorkers && i < Math.floor(that.data.length / 2); ++i) {
              ++runningWorkers;
              that._spawnReduceWorker(
                [that.data[i * 2], that.data[i * 2 + 1]],
                cb,
                done,
                env
              );
            }
            that.data.splice(0, i * 2);
          }
        });
        this.operation = newOp;
        return this;
      };
      Parallel2.prototype.then = function(cb, errCb) {
        const that = this;
        const newOp = new Operation();
        errCb = typeof errCb === "function" ? errCb : function() {
        };
        this.operation.then(
          () => {
            let retData;
            try {
              if (cb) {
                retData = cb(that.data);
                if (retData !== void 0) {
                  that.data = retData;
                }
              }
              newOp.resolve(null, that.data);
            } catch (e) {
              if (errCb) {
                retData = errCb(e);
                if (retData !== void 0) {
                  that.data = retData;
                }
                newOp.resolve(null, that.data);
              } else {
                newOp.resolve(null, e);
              }
            }
          },
          (err) => {
            if (errCb) {
              const retData = errCb(err);
              if (retData !== void 0) {
                that.data = retData;
              }
              newOp.resolve(null, that.data);
            } else {
              newOp.resolve(null, err);
            }
          }
        );
        this.operation = newOp;
        return this;
      };
      if (isCommonJS) {
        module.exports = Parallel2;
      } else {
        self.Parallel = Parallel2;
      }
    })();
  }
});

// node_modules/file-saver/dist/FileSaver.min.js
var require_FileSaver_min = __commonJS({
  "node_modules/file-saver/dist/FileSaver.min.js"(exports, module) {
    (function(a, b) {
      if ("function" == typeof define && define.amd)
        define([], b);
      else if ("undefined" != typeof exports)
        b();
      else {
        b(), a.FileSaver = { exports: {} }.exports;
      }
    })(exports, function() {
      "use strict";
      function b(a2, b2) {
        return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
      }
      function c(a2, b2, c2) {
        var d2 = new XMLHttpRequest();
        d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
          g(d2.response, b2, c2);
        }, d2.onerror = function() {
          console.error("could not download file");
        }, d2.send();
      }
      function d(a2) {
        var b2 = new XMLHttpRequest();
        b2.open("HEAD", a2, false);
        try {
          b2.send();
        } catch (a3) {
        }
        return 200 <= b2.status && 299 >= b2.status;
      }
      function e(a2) {
        try {
          a2.dispatchEvent(new MouseEvent("click"));
        } catch (c2) {
          var b2 = document.createEvent("MouseEvents");
          b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
        }
      }
      var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof globalThis && globalThis.global === globalThis ? globalThis : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
      } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h) {
        var i = f.URL || f.webkitURL, j = document.createElement("a");
        g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
          i.revokeObjectURL(j.href);
        }, 4e4), setTimeout(function() {
          e(j);
        }, 0));
      } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h) {
        if (g2 = g2 || f2.name || "download", "string" != typeof f2)
          navigator.msSaveOrOpenBlob(b(f2, h), g2);
        else if (d(f2))
          c(f2, g2, h);
        else {
          var i = document.createElement("a");
          i.href = f2, i.target = "_blank", setTimeout(function() {
            e(i);
          });
        }
      } : function(b2, d2, e2, g2) {
        if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2)
          return c(b2, d2, e2);
        var h = "application/octet-stream" === b2.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
        if ((j || h && i || a) && "undefined" != typeof FileReader) {
          var k = new FileReader();
          k.onloadend = function() {
            var a2 = k.result;
            a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
          }, k.readAsDataURL(b2);
        } else {
          var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
          g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
            l.revokeObjectURL(m);
          }, 4e4);
        }
      });
      f.saveAs = g.saveAs = g, "undefined" != typeof module && (module.exports = g);
    });
  }
});

// node_modules/atob-lite/atob-browser.js
var require_atob_browser = __commonJS({
  "node_modules/atob-lite/atob-browser.js"(exports, module) {
    module.exports = function _atob(str) {
      return atob(str);
    };
  }
});

// node_modules/is-base64/is-base64.js
var require_is_base64 = __commonJS({
  "node_modules/is-base64/is-base64.js"(exports, module) {
    (function(root) {
      "use strict";
      function isBase64(v, opts) {
        if (v instanceof Boolean || typeof v === "boolean") {
          return false;
        }
        if (!(opts instanceof Object)) {
          opts = {};
        }
        if (opts.hasOwnProperty("allowBlank") && !opts.allowBlank && v === "") {
          return false;
        }
        var regex = "(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?";
        if (opts.mime) {
          regex = "(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)?" + regex;
        }
        if (opts.paddingRequired === false) {
          regex = "(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?";
        }
        return new RegExp("^" + regex + "$", "gi").test(v);
      }
      if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
          exports = module.exports = isBase64;
        }
        exports.isBase64 = isBase64;
      } else if (typeof define === "function" && define.amd) {
        define([], function() {
          return isBase64;
        });
      } else {
        root.isBase64 = isBase64;
      }
    })(exports);
  }
});

// node_modules/string-to-arraybuffer/index.js
var require_string_to_arraybuffer = __commonJS({
  "node_modules/string-to-arraybuffer/index.js"(exports, module) {
    "use strict";
    var atob2 = require_atob_browser();
    var isBase64 = require_is_base64();
    module.exports = function stringToArrayBuffer(arg) {
      if (typeof arg !== "string")
        throw Error("Argument should be a string");
      if (/^data\:/i.test(arg))
        return decode(arg);
      if (isBase64(arg))
        arg = atob2(arg);
      return str2ab(arg);
    };
    function str2ab(str) {
      var array = new Uint8Array(str.length);
      for (var i = 0; i < str.length; i++) {
        array[i] = str.charCodeAt(i);
      }
      return array.buffer;
    }
    function decode(uri) {
      uri = uri.replace(/\r?\n/g, "");
      var firstComma = uri.indexOf(",");
      if (-1 === firstComma || firstComma <= 4)
        throw new TypeError("malformed data-URI");
      var meta = uri.substring(5, firstComma).split(";");
      var base64 = false;
      var charset = "US-ASCII";
      for (var i = 0; i < meta.length; i++) {
        if ("base64" == meta[i]) {
          base64 = true;
        } else if (0 == meta[i].indexOf("charset=")) {
          charset = meta[i].substring(8);
        }
      }
      var data = unescape(uri.substring(firstComma + 1));
      if (base64)
        data = atob2(data);
      var abuf = str2ab(data);
      abuf.type = meta[0] || "text/plain";
      abuf.charset = charset;
      return abuf;
    }
  }
});

// node_modules/dtype/index.js
var require_dtype = __commonJS({
  "node_modules/dtype/index.js"(exports, module) {
    module.exports = function(dtype) {
      switch (dtype) {
        case "int8":
          return Int8Array;
        case "int16":
          return Int16Array;
        case "int32":
          return Int32Array;
        case "uint8":
          return Uint8Array;
        case "uint16":
          return Uint16Array;
        case "uint32":
          return Uint32Array;
        case "float32":
          return Float32Array;
        case "float64":
          return Float64Array;
        case "array":
          return Array;
        case "uint8_clamped":
          return Uint8ClampedArray;
      }
    };
  }
});

// node_modules/flatten-vertex-data/index.js
var require_flatten_vertex_data = __commonJS({
  "node_modules/flatten-vertex-data/index.js"(exports, module) {
    var dtype = require_dtype();
    module.exports = flattenVertexData;
    function flattenVertexData(data, output, offset) {
      if (!data)
        throw new TypeError("must specify data as first parameter");
      offset = +(offset || 0) | 0;
      if (Array.isArray(data) && (data[0] && typeof data[0][0] === "number")) {
        var dim = data[0].length;
        var length = data.length * dim;
        var i, j, k, l;
        if (!output || typeof output === "string") {
          output = new (dtype(output || "float32"))(length + offset);
        }
        var dstLength = output.length - offset;
        if (length !== dstLength) {
          throw new Error("source length " + length + " (" + dim + "x" + data.length + ") does not match destination length " + dstLength);
        }
        for (i = 0, k = offset; i < data.length; i++) {
          for (j = 0; j < dim; j++) {
            output[k++] = data[i][j] === null ? NaN : data[i][j];
          }
        }
      } else {
        if (!output || typeof output === "string") {
          var Ctor = dtype(output || "float32");
          if (Array.isArray(data) || output === "array") {
            output = new Ctor(data.length + offset);
            for (i = 0, k = offset, l = output.length; k < l; k++, i++) {
              output[k] = data[i] === null ? NaN : data[i];
            }
          } else {
            if (offset === 0) {
              output = new Ctor(data);
            } else {
              output = new Ctor(data.length + offset);
              output.set(data, offset);
            }
          }
        } else {
          output.set(data, offset);
        }
      }
      return output;
    }
  }
});

// node_modules/to-array-buffer/index.js
var require_to_array_buffer = __commonJS({
  "node_modules/to-array-buffer/index.js"(exports, module) {
    "use strict";
    var str2ab = require_string_to_arraybuffer();
    var flat = require_flatten_vertex_data();
    module.exports = function toArrayBuffer(arg) {
      if (!arg)
        return null;
      if (arg instanceof ArrayBuffer)
        return arg;
      if (typeof arg === "string") {
        return str2ab(arg);
      }
      if (ArrayBuffer.isView(arg)) {
        if (arg.byteOffset) {
          return arg.buffer.slice(arg.byteOffset, arg.byteOffset + arg.byteLength);
        }
        return arg.buffer;
      }
      if (arg.buffer || arg.data || arg._data) {
        var result = toArrayBuffer(arg.buffer || arg.data || arg._data);
        return result;
      }
      if (Array.isArray(arg)) {
        for (var i = 0; i < arg.length; i++) {
          if (arg[i].length != null) {
            arg = flat(arg);
            break;
          }
        }
      }
      var result = new Uint8Array(arg);
      if (!result.length)
        return null;
      return result.buffer;
    };
  }
});

// node_modules/simple-mime/simple-mime.js
var require_simple_mime = __commonJS({
  "node_modules/simple-mime/simple-mime.js"(exports, module) {
    var types;
    module.exports = function setup(defaultMime) {
      return function getMime(path) {
        path = path.toLowerCase().trim();
        var index = path.lastIndexOf("/");
        if (index >= 0) {
          path = path.substr(index + 1);
        }
        index = path.lastIndexOf(".");
        if (index >= 0) {
          path = path.substr(index + 1);
        }
        return types[path] || defaultMime;
      };
    };
    types = {
      "3gp": "video/3gpp",
      a: "application/octet-stream",
      ai: "application/postscript",
      aif: "audio/x-aiff",
      aiff: "audio/x-aiff",
      asc: "application/pgp-signature",
      asf: "video/x-ms-asf",
      asm: "text/x-asm",
      asx: "video/x-ms-asf",
      atom: "application/atom+xml",
      au: "audio/basic",
      avi: "video/x-msvideo",
      bat: "application/x-msdownload",
      bin: "application/octet-stream",
      bmp: "image/bmp",
      bz2: "application/x-bzip2",
      c: "text/x-csrc",
      cab: "application/vnd.ms-cab-compressed",
      can: "application/candor",
      cc: "text/x-c++src",
      chm: "application/vnd.ms-htmlhelp",
      "class": "application/octet-stream",
      com: "application/x-msdownload",
      conf: "text/plain",
      cpp: "text/x-c",
      crt: "application/x-x509-ca-cert",
      css: "text/css",
      csv: "text/csv",
      cxx: "text/x-c",
      deb: "application/x-debian-package",
      der: "application/x-x509-ca-cert",
      diff: "text/x-diff",
      djv: "image/vnd.djvu",
      djvu: "image/vnd.djvu",
      dll: "application/x-msdownload",
      dmg: "application/octet-stream",
      doc: "application/msword",
      dot: "application/msword",
      dtd: "application/xml-dtd",
      dvi: "application/x-dvi",
      ear: "application/java-archive",
      eml: "message/rfc822",
      eps: "application/postscript",
      exe: "application/x-msdownload",
      f: "text/x-fortran",
      f77: "text/x-fortran",
      f90: "text/x-fortran",
      flv: "video/x-flv",
      "for": "text/x-fortran",
      gem: "application/octet-stream",
      gemspec: "text/x-script.ruby",
      gif: "image/gif",
      gyp: "text/x-script.python",
      gypi: "text/x-script.python",
      gz: "application/x-gzip",
      h: "text/x-chdr",
      hh: "text/x-c++hdr",
      htm: "text/html",
      html: "text/html",
      ico: "image/vnd.microsoft.icon",
      ics: "text/calendar",
      ifb: "text/calendar",
      iso: "application/octet-stream",
      jar: "application/java-archive",
      java: "text/x-java-source",
      jnlp: "application/x-java-jnlp-file",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
      js: "application/javascript",
      json: "application/json",
      less: "text/css",
      log: "text/plain",
      lua: "text/x-script.lua",
      luac: "application/x-bytecode.lua",
      makefile: "text/x-makefile",
      m3u: "audio/x-mpegurl",
      m4v: "video/mp4",
      man: "text/troff",
      manifest: "text/cache-manifest",
      markdown: "text/x-markdown",
      mathml: "application/mathml+xml",
      mbox: "application/mbox",
      mdoc: "text/troff",
      md: "text/x-markdown",
      me: "text/troff",
      mid: "audio/midi",
      midi: "audio/midi",
      mime: "message/rfc822",
      mml: "application/mathml+xml",
      mng: "video/x-mng",
      mov: "video/quicktime",
      mp3: "audio/mpeg",
      mp4: "video/mp4",
      mp4v: "video/mp4",
      mpeg: "video/mpeg",
      mpg: "video/mpeg",
      ms: "text/troff",
      msi: "application/x-msdownload",
      odp: "application/vnd.oasis.opendocument.presentation",
      ods: "application/vnd.oasis.opendocument.spreadsheet",
      odt: "application/vnd.oasis.opendocument.text",
      ogg: "application/ogg",
      p: "text/x-pascal",
      pas: "text/x-pascal",
      pbm: "image/x-portable-bitmap",
      pdf: "application/pdf",
      pem: "application/x-x509-ca-cert",
      pgm: "image/x-portable-graymap",
      pgp: "application/pgp-encrypted",
      pkg: "application/octet-stream",
      pl: "text/x-script.perl",
      pm: "text/x-script.perl-module",
      png: "image/png",
      pnm: "image/x-portable-anymap",
      ppm: "image/x-portable-pixmap",
      pps: "application/vnd.ms-powerpoint",
      ppt: "application/vnd.ms-powerpoint",
      ps: "application/postscript",
      psd: "image/vnd.adobe.photoshop",
      py: "text/x-script.python",
      qt: "video/quicktime",
      ra: "audio/x-pn-realaudio",
      rake: "text/x-script.ruby",
      ram: "audio/x-pn-realaudio",
      rar: "application/x-rar-compressed",
      rb: "text/x-script.ruby",
      rdf: "application/rdf+xml",
      roff: "text/troff",
      rpm: "application/x-redhat-package-manager",
      rss: "application/rss+xml",
      rtf: "application/rtf",
      ru: "text/x-script.ruby",
      s: "text/x-asm",
      sgm: "text/sgml",
      sgml: "text/sgml",
      sh: "application/x-sh",
      sig: "application/pgp-signature",
      snd: "audio/basic",
      so: "application/octet-stream",
      svg: "image/svg+xml",
      svgz: "image/svg+xml",
      swf: "application/x-shockwave-flash",
      t: "text/troff",
      tar: "application/x-tar",
      tbz: "application/x-bzip-compressed-tar",
      tci: "application/x-topcloud",
      tcl: "application/x-tcl",
      tex: "application/x-tex",
      texi: "application/x-texinfo",
      texinfo: "application/x-texinfo",
      text: "text/plain",
      tif: "image/tiff",
      tiff: "image/tiff",
      torrent: "application/x-bittorrent",
      tr: "text/troff",
      ttf: "application/x-font-ttf",
      txt: "text/plain",
      vcf: "text/x-vcard",
      vcs: "text/x-vcalendar",
      vrml: "model/vrml",
      war: "application/java-archive",
      wav: "audio/x-wav",
      webapp: "application/x-web-app-manifest+json",
      webm: "video/webm",
      wma: "audio/x-ms-wma",
      wmv: "video/x-ms-wmv",
      wmx: "video/x-ms-wmx",
      wrl: "model/vrml",
      wsdl: "application/wsdl+xml",
      xbm: "image/x-xbitmap",
      xhtml: "application/xhtml+xml",
      xls: "application/vnd.ms-excel",
      xml: "application/xml",
      xpm: "image/x-xpixmap",
      xsl: "application/xml",
      xslt: "application/xslt+xml",
      yaml: "text/yaml",
      yml: "text/yaml",
      zip: "application/zip"
    };
  }
});

// node_modules/is-blob/index.js
var require_is_blob = __commonJS({
  "node_modules/is-blob/index.js"(exports, module) {
    "use strict";
    var toString = Object.prototype.toString;
    module.exports = function(x) {
      return x instanceof Blob || toString.call(x) === "[object Blob]";
    };
  }
});

// node_modules/save-file/src/to-blob.js
var require_to_blob = __commonJS({
  "node_modules/save-file/src/to-blob.js"(exports, module) {
    "use strict";
    var ab = require_to_array_buffer();
    var getMimeType = require_simple_mime()("application/octect-stream");
    var isBlob = require_is_blob();
    module.exports = function toBlob(data, filename) {
      if (!isBlob(data) && !(data instanceof File)) {
        data = ab(data);
        var mime = getMimeType(filename || "");
        data = new Blob([data], { type: mime });
      }
      return data;
    };
  }
});

// node_modules/save-file/browser.js
var require_browser2 = __commonJS({
  "node_modules/save-file/browser.js"(exports, module) {
    "use strict";
    var saveAs = require_FileSaver_min().saveAs;
    var toBlob = require_to_blob();
    var planned = null;
    module.exports = save2;
    module.exports.save = save2;
    module.exports.saveSync = saveSync;
    function save2(data, filename) {
      if (typeof data === "string") {
        if (typeof filename !== "string" || filename.length > data.length) {
          var x = filename;
          filename = data;
          data = x;
        }
      }
      var blob = toBlob(data, filename);
      if (planned) {
        return planned.then(function() {
          planned = save2(data, filename);
          return planned;
        });
      } else {
        planned = new Promise(function(ok, nok) {
          saveAs(blob, filename);
          window.addEventListener("focus", function resolve() {
            planned = null;
            window.removeEventListener("focus", resolve);
            ok();
          });
        });
        return planned;
      }
    }
    function saveSync(data, filename) {
      return saveAs(toBlob(data, filename), filename);
    }
  }
});

// src/v1/index.ts
var v1_exports = {};
__export(v1_exports, {
  ActivityEventType: () => ActivityEventType,
  ArrayActions: () => ArrayActions,
  ArrayApi: () => ArrayApi,
  ArrayApiAxiosParamCreator: () => ArrayApiAxiosParamCreator,
  ArrayApiFactory: () => ArrayApiFactory,
  ArrayApiFp: () => ArrayApiFp,
  ArrayTaskStatus: () => ArrayTaskStatus,
  ArrayTaskType: () => ArrayTaskType,
  ArrayTasksApi: () => ArrayTasksApi,
  ArrayTasksApiAxiosParamCreator: () => ArrayTasksApiAxiosParamCreator,
  ArrayTasksApiFactory: () => ArrayTasksApiFactory,
  ArrayTasksApiFp: () => ArrayTasksApiFp,
  ArrayType: () => ArrayType,
  Configuration: () => Configuration,
  Datatype: () => Datatype,
  FavoritesApi: () => FavoritesApi,
  FavoritesApiAxiosParamCreator: () => FavoritesApiAxiosParamCreator,
  FavoritesApiFactory: () => FavoritesApiFactory,
  FavoritesApiFp: () => FavoritesApiFp,
  FilePropertyName: () => FilePropertyName,
  FileType: () => FileType,
  FilesApi: () => FilesApi,
  FilesApiAxiosParamCreator: () => FilesApiAxiosParamCreator,
  FilesApiFactory: () => FilesApiFactory,
  FilesApiFp: () => FilesApiFp,
  FilterOption: () => FilterOption,
  FilterType: () => FilterType,
  GroupActions: () => GroupActions,
  GroupMemberAssetType: () => GroupMemberAssetType,
  GroupMemberType: () => GroupMemberType,
  GroupsApi: () => GroupsApi,
  GroupsApiAxiosParamCreator: () => GroupsApiAxiosParamCreator,
  GroupsApiFactory: () => GroupsApiFactory,
  GroupsApiFp: () => GroupsApiFp,
  InvitationApi: () => InvitationApi,
  InvitationApiAxiosParamCreator: () => InvitationApiAxiosParamCreator,
  InvitationApiFactory: () => InvitationApiFactory,
  InvitationApiFp: () => InvitationApiFp,
  InvitationStatus: () => InvitationStatus,
  InvitationType: () => InvitationType,
  Layout: () => Layout,
  NamespaceActions: () => NamespaceActions,
  NotebookApi: () => NotebookApi,
  NotebookApiAxiosParamCreator: () => NotebookApiAxiosParamCreator,
  NotebookApiFactory: () => NotebookApiFactory,
  NotebookApiFp: () => NotebookApiFp,
  NotebooksApi: () => NotebooksApi,
  NotebooksApiAxiosParamCreator: () => NotebooksApiAxiosParamCreator,
  NotebooksApiFactory: () => NotebooksApiFactory,
  NotebooksApiFp: () => NotebooksApiFp,
  OrganizationApi: () => OrganizationApi,
  OrganizationApiAxiosParamCreator: () => OrganizationApiAxiosParamCreator,
  OrganizationApiFactory: () => OrganizationApiFactory,
  OrganizationApiFp: () => OrganizationApiFp,
  OrganizationRoles: () => OrganizationRoles,
  PricingAggregateUsage: () => PricingAggregateUsage,
  PricingCurrency: () => PricingCurrency,
  PricingInterval: () => PricingInterval,
  PricingType: () => PricingType,
  PricingUnitLabel: () => PricingUnitLabel,
  PublicShareFilter: () => PublicShareFilter,
  QueryApi: () => QueryApi,
  QueryApiAxiosParamCreator: () => QueryApiAxiosParamCreator,
  QueryApiFactory: () => QueryApiFactory,
  QueryApiFp: () => QueryApiFp,
  Querystatus: () => Querystatus,
  Querytype: () => Querytype,
  RegisteredTaskGraphsApi: () => RegisteredTaskGraphsApi,
  RegisteredTaskGraphsApiAxiosParamCreator: () => RegisteredTaskGraphsApiAxiosParamCreator,
  RegisteredTaskGraphsApiFactory: () => RegisteredTaskGraphsApiFactory,
  RegisteredTaskGraphsApiFp: () => RegisteredTaskGraphsApiFp,
  ResultFormat: () => ResultFormat,
  SSOProvider: () => SSOProvider,
  SqlApi: () => SqlApi,
  SqlApiAxiosParamCreator: () => SqlApiAxiosParamCreator,
  SqlApiFactory: () => SqlApiFactory,
  SqlApiFp: () => SqlApiFp,
  StatsApi: () => StatsApi,
  StatsApiAxiosParamCreator: () => StatsApiAxiosParamCreator,
  StatsApiFactory: () => StatsApiFactory,
  StatsApiFp: () => StatsApiFp,
  TaskGraphActions: () => TaskGraphActions,
  TaskGraphLogRunLocation: () => TaskGraphLogRunLocation,
  TaskGraphLogStatus: () => TaskGraphLogStatus,
  TaskGraphLogsApi: () => TaskGraphLogsApi,
  TaskGraphLogsApiAxiosParamCreator: () => TaskGraphLogsApiAxiosParamCreator,
  TaskGraphLogsApiFactory: () => TaskGraphLogsApiFactory,
  TaskGraphLogsApiFp: () => TaskGraphLogsApiFp,
  TasksApi: () => TasksApi,
  TasksApiAxiosParamCreator: () => TasksApiAxiosParamCreator,
  TasksApiFactory: () => TasksApiFactory,
  TasksApiFp: () => TasksApiFp,
  TokenScope: () => TokenScope,
  UDFActions: () => UDFActions,
  UDFLanguage: () => UDFLanguage,
  UDFType: () => UDFType,
  UdfApi: () => UdfApi,
  UdfApiAxiosParamCreator: () => UdfApiAxiosParamCreator,
  UdfApiFactory: () => UdfApiFactory,
  UdfApiFp: () => UdfApiFp,
  UserApi: () => UserApi,
  UserApiAxiosParamCreator: () => UserApiAxiosParamCreator,
  UserApiFactory: () => UserApiFactory,
  UserApiFp: () => UserApiFp
});

// src/v1/api.ts
var import_axios2 = __toESM(require_axios2());

// src/v1/base.ts
var import_axios = __toESM(require_axios2());

// src/utils/updateBasePathAfterRedirect.ts
var updateBasePathAfterRedirect = (axios2, BASE_PATH3, baseAPI) => {
  axios2.interceptors.response.use(
    (response) => {
      var _a;
      const responseURL = (response == null ? void 0 : response.request.responseURL) || ((_a = response == null ? void 0 : response.request.res) == null ? void 0 : _a.responseUrl);
      if (responseURL) {
        const url = new URL(responseURL);
        const version = new URL(BASE_PATH3).pathname;
        const REDIRECTED_BASE_PATH = url.origin + version;
        baseAPI.basePath = REDIRECTED_BASE_PATH;
        if (baseAPI.configuration) {
          baseAPI.configuration.basePath = REDIRECTED_BASE_PATH;
        } else {
          baseAPI.configuration = { basePath: REDIRECTED_BASE_PATH };
        }
      }
      return response;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
};
var updateBasePathAfterRedirect_default = updateBasePathAfterRedirect;

// src/v1/base.ts
var BASE_PATH = "https://api.tiledb.com/v1".replace(/\/+$/, "");
var COLLECTION_FORMATS = {
  csv: ",",
  ssv: " ",
  tsv: "	",
  pipes: "|"
};
var BaseAPI = class {
  constructor(configuration, basePath = BASE_PATH, axios2 = import_axios.default) {
    this.basePath = basePath;
    this.axios = axios2;
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
    updateBasePathAfterRedirect_default(axios2, BASE_PATH, this);
  }
};
var RequiredError = class extends Error {
  constructor(field, msg) {
    super(msg);
    this.field = field;
    this.name = "RequiredError";
  }
};

// src/capnp/arrayMetadata_capnp.ts
var capnp = __toESM(require_lib());
var import_capnp_ts = __toESM(require_lib());
var ArrayMetadata_MetadataEntry = class extends import_capnp_ts.Struct {
  getKey() {
    return import_capnp_ts.Struct.getText(0, this);
  }
  setKey(value) {
    import_capnp_ts.Struct.setText(0, value, this);
  }
  getType() {
    return import_capnp_ts.Struct.getText(1, this);
  }
  setType(value) {
    import_capnp_ts.Struct.setText(1, value, this);
  }
  getValueNum() {
    return import_capnp_ts.Struct.getUint32(0, this);
  }
  setValueNum(value) {
    import_capnp_ts.Struct.setUint32(0, value, this);
  }
  adoptValue(value) {
    import_capnp_ts.Struct.adopt(value, import_capnp_ts.Struct.getPointer(2, this));
  }
  disownValue() {
    return import_capnp_ts.Struct.disown(this.getValue());
  }
  getValue() {
    return import_capnp_ts.Struct.getData(2, this);
  }
  hasValue() {
    return !import_capnp_ts.Struct.isNull(import_capnp_ts.Struct.getPointer(2, this));
  }
  initValue(length) {
    return import_capnp_ts.Struct.initData(2, length, this);
  }
  setValue(value) {
    import_capnp_ts.Struct.copyFrom(value, import_capnp_ts.Struct.getPointer(2, this));
  }
  getDel() {
    return import_capnp_ts.Struct.getBit(32, this);
  }
  setDel(value) {
    import_capnp_ts.Struct.setBit(32, value, this);
  }
  toString() {
    return "ArrayMetadata_MetadataEntry_" + super.toString();
  }
};
ArrayMetadata_MetadataEntry._capnp = { displayName: "MetadataEntry", id: "926fe1c3b12ed651", size: new import_capnp_ts.ObjectSize(8, 3) };
var _ArrayMetadata = class extends import_capnp_ts.Struct {
  adoptEntries(value) {
    import_capnp_ts.Struct.adopt(value, import_capnp_ts.Struct.getPointer(0, this));
  }
  disownEntries() {
    return import_capnp_ts.Struct.disown(this.getEntries());
  }
  getEntries() {
    return import_capnp_ts.Struct.getList(0, _ArrayMetadata._Entries, this);
  }
  hasEntries() {
    return !import_capnp_ts.Struct.isNull(import_capnp_ts.Struct.getPointer(0, this));
  }
  initEntries(length) {
    return import_capnp_ts.Struct.initList(0, _ArrayMetadata._Entries, length, this);
  }
  setEntries(value) {
    import_capnp_ts.Struct.copyFrom(value, import_capnp_ts.Struct.getPointer(0, this));
  }
  toString() {
    return "ArrayMetadata_" + super.toString();
  }
};
var ArrayMetadata = _ArrayMetadata;
ArrayMetadata.MetadataEntry = ArrayMetadata_MetadataEntry;
ArrayMetadata._capnp = { displayName: "ArrayMetadata", id: "9737dcafdfce31bb", size: new import_capnp_ts.ObjectSize(0, 1) };
ArrayMetadata._Entries = capnp.CompositeList(ArrayMetadata_MetadataEntry);

// src/utils/capnpSerializer.ts
var capnp4 = __toESM(require_lib());

// src/capnp/query_capnp.ts
var capnp2 = __toESM(require_lib());
var import_capnp_ts2 = __toESM(require_lib());
var _Query = class extends import_capnp_ts2.Struct {
  adoptAttributeBufferHeaders(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownAttributeBufferHeaders() {
    return import_capnp_ts2.Struct.disown(this.getAttributeBufferHeaders());
  }
  getAttributeBufferHeaders() {
    return import_capnp_ts2.Struct.getList(0, _Query._AttributeBufferHeaders, this);
  }
  hasAttributeBufferHeaders() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initAttributeBufferHeaders(length) {
    return import_capnp_ts2.Struct.initList(0, _Query._AttributeBufferHeaders, length, this);
  }
  setAttributeBufferHeaders(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  getLayout() {
    return import_capnp_ts2.Struct.getText(1, this);
  }
  setLayout(value) {
    import_capnp_ts2.Struct.setText(1, value, this);
  }
  getStatus() {
    return import_capnp_ts2.Struct.getText(2, this);
  }
  setStatus(value) {
    import_capnp_ts2.Struct.setText(2, value, this);
  }
  getType() {
    return import_capnp_ts2.Struct.getText(3, this);
  }
  setType(value) {
    import_capnp_ts2.Struct.setText(3, value, this);
  }
  adoptWriter(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(4, this));
  }
  disownWriter() {
    return import_capnp_ts2.Struct.disown(this.getWriter());
  }
  getWriter() {
    return import_capnp_ts2.Struct.getStruct(4, Writer, this);
  }
  hasWriter() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(4, this));
  }
  initWriter() {
    return import_capnp_ts2.Struct.initStructAt(4, Writer, this);
  }
  setWriter(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(4, this));
  }
  adoptReader(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(5, this));
  }
  disownReader() {
    return import_capnp_ts2.Struct.disown(this.getReader());
  }
  getReader() {
    return import_capnp_ts2.Struct.getStruct(5, QueryReader, this);
  }
  hasReader() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(5, this));
  }
  initReader() {
    return import_capnp_ts2.Struct.initStructAt(5, QueryReader, this);
  }
  setReader(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(5, this));
  }
  adoptArray(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(6, this));
  }
  disownArray() {
    return import_capnp_ts2.Struct.disown(this.getArray());
  }
  getArray() {
    return import_capnp_ts2.Struct.getStruct(6, Array2, this);
  }
  hasArray() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(6, this));
  }
  initArray() {
    return import_capnp_ts2.Struct.initStructAt(6, Array2, this);
  }
  setArray(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(6, this));
  }
  getTotalFixedLengthBufferBytes() {
    return import_capnp_ts2.Struct.getUint64(0, this);
  }
  setTotalFixedLengthBufferBytes(value) {
    import_capnp_ts2.Struct.setUint64(0, value, this);
  }
  getTotalVarLenBufferBytes() {
    return import_capnp_ts2.Struct.getUint64(8, this);
  }
  setTotalVarLenBufferBytes(value) {
    import_capnp_ts2.Struct.setUint64(8, value, this);
  }
  getTotalValidityBufferBytes() {
    return import_capnp_ts2.Struct.getUint64(16, this);
  }
  setTotalValidityBufferBytes(value) {
    import_capnp_ts2.Struct.setUint64(16, value, this);
  }
  getVarOffsetsMode() {
    return import_capnp_ts2.Struct.getText(7, this);
  }
  setVarOffsetsMode(value) {
    import_capnp_ts2.Struct.setText(7, value, this);
  }
  getVarOffsetsAddExtraElement() {
    return import_capnp_ts2.Struct.getBit(192, this);
  }
  setVarOffsetsAddExtraElement(value) {
    import_capnp_ts2.Struct.setBit(192, value, this);
  }
  getVarOffsetsBitsize() {
    return import_capnp_ts2.Struct.getInt32(28, this);
  }
  setVarOffsetsBitsize(value) {
    import_capnp_ts2.Struct.setInt32(28, value, this);
  }
  adoptConfig(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(8, this));
  }
  disownConfig() {
    return import_capnp_ts2.Struct.disown(this.getConfig());
  }
  getConfig() {
    return import_capnp_ts2.Struct.getStruct(8, Config, this);
  }
  hasConfig() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(8, this));
  }
  initConfig() {
    return import_capnp_ts2.Struct.initStructAt(8, Config, this);
  }
  setConfig(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(8, this));
  }
  adoptStats(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(9, this));
  }
  disownStats() {
    return import_capnp_ts2.Struct.disown(this.getStats());
  }
  getStats() {
    return import_capnp_ts2.Struct.getStruct(9, Stats, this);
  }
  hasStats() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(9, this));
  }
  initStats() {
    return import_capnp_ts2.Struct.initStructAt(9, Stats, this);
  }
  setStats(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(9, this));
  }
  toString() {
    return "Query_" + super.toString();
  }
};
var Query = _Query;
Query._capnp = { displayName: "Query", id: "ea34268ae031ac7a", size: new import_capnp_ts2.ObjectSize(32, 10) };
var AttributeBufferHeader = class extends import_capnp_ts2.Struct {
  getName() {
    return import_capnp_ts2.Struct.getText(0, this);
  }
  setName(value) {
    import_capnp_ts2.Struct.setText(0, value, this);
  }
  getFixedLenBufferSizeInBytes() {
    return import_capnp_ts2.Struct.getUint64(0, this);
  }
  setFixedLenBufferSizeInBytes(value) {
    import_capnp_ts2.Struct.setUint64(0, value, this);
  }
  getVarLenBufferSizeInBytes() {
    return import_capnp_ts2.Struct.getUint64(8, this);
  }
  setVarLenBufferSizeInBytes(value) {
    import_capnp_ts2.Struct.setUint64(8, value, this);
  }
  getValidityLenBufferSizeInBytes() {
    return import_capnp_ts2.Struct.getUint64(16, this);
  }
  setValidityLenBufferSizeInBytes(value) {
    import_capnp_ts2.Struct.setUint64(16, value, this);
  }
  getOriginalFixedLenBufferSizeInBytes() {
    return import_capnp_ts2.Struct.getUint64(24, this);
  }
  setOriginalFixedLenBufferSizeInBytes(value) {
    import_capnp_ts2.Struct.setUint64(24, value, this);
  }
  getOriginalVarLenBufferSizeInBytes() {
    return import_capnp_ts2.Struct.getUint64(32, this);
  }
  setOriginalVarLenBufferSizeInBytes(value) {
    import_capnp_ts2.Struct.setUint64(32, value, this);
  }
  getOriginalValidityLenBufferSizeInBytes() {
    return import_capnp_ts2.Struct.getUint64(40, this);
  }
  setOriginalValidityLenBufferSizeInBytes(value) {
    import_capnp_ts2.Struct.setUint64(40, value, this);
  }
  toString() {
    return "AttributeBufferHeader_" + super.toString();
  }
};
AttributeBufferHeader._capnp = { displayName: "AttributeBufferHeader", id: "9884df9a1b40f364", size: new import_capnp_ts2.ObjectSize(48, 1) };
var Array2 = class extends import_capnp_ts2.Struct {
  getEndTimestamp() {
    return import_capnp_ts2.Struct.getUint64(0, this);
  }
  setEndTimestamp(value) {
    import_capnp_ts2.Struct.setUint64(0, value, this);
  }
  getQueryType() {
    return import_capnp_ts2.Struct.getText(0, this);
  }
  setQueryType(value) {
    import_capnp_ts2.Struct.setText(0, value, this);
  }
  getUri() {
    return import_capnp_ts2.Struct.getText(1, this);
  }
  setUri(value) {
    import_capnp_ts2.Struct.setText(1, value, this);
  }
  getStartTimestamp() {
    return import_capnp_ts2.Struct.getUint64(8, this);
  }
  setStartTimestamp(value) {
    import_capnp_ts2.Struct.setUint64(8, value, this);
  }
  toString() {
    return "Array_" + super.toString();
  }
};
Array2._capnp = { displayName: "Array", id: "e8b44da5a3b284a4", size: new import_capnp_ts2.ObjectSize(16, 2) };
var _FilterPipeline = class extends import_capnp_ts2.Struct {
  adoptFilters(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownFilters() {
    return import_capnp_ts2.Struct.disown(this.getFilters());
  }
  getFilters() {
    return import_capnp_ts2.Struct.getList(0, _FilterPipeline._Filters, this);
  }
  hasFilters() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initFilters(length) {
    return import_capnp_ts2.Struct.initList(0, _FilterPipeline._Filters, length, this);
  }
  setFilters(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  toString() {
    return "FilterPipeline_" + super.toString();
  }
};
var FilterPipeline = _FilterPipeline;
FilterPipeline._capnp = { displayName: "FilterPipeline", id: "a6d903a3c84d4809", size: new import_capnp_ts2.ObjectSize(0, 1) };
var Filter_Data = class extends import_capnp_ts2.Struct {
  getText() {
    import_capnp_ts2.Struct.testWhich("text", import_capnp_ts2.Struct.getUint16(0, this), 0, this);
    return import_capnp_ts2.Struct.getText(1, this);
  }
  isText() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 0;
  }
  setText(value) {
    import_capnp_ts2.Struct.setUint16(0, 0, this);
    import_capnp_ts2.Struct.setText(1, value, this);
  }
  adoptBytes(value) {
    import_capnp_ts2.Struct.setUint16(0, 1, this);
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  disownBytes() {
    return import_capnp_ts2.Struct.disown(this.getBytes());
  }
  getBytes() {
    import_capnp_ts2.Struct.testWhich("bytes", import_capnp_ts2.Struct.getUint16(0, this), 1, this);
    return import_capnp_ts2.Struct.getData(1, this);
  }
  hasBytes() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(1, this));
  }
  initBytes(length) {
    import_capnp_ts2.Struct.setUint16(0, 1, this);
    return import_capnp_ts2.Struct.initData(1, length, this);
  }
  isBytes() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 1;
  }
  setBytes(value) {
    import_capnp_ts2.Struct.setUint16(0, 1, this);
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  getInt8() {
    import_capnp_ts2.Struct.testWhich("int8", import_capnp_ts2.Struct.getUint16(0, this), 2, this);
    return import_capnp_ts2.Struct.getInt8(2, this);
  }
  isInt8() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 2;
  }
  setInt8(value) {
    import_capnp_ts2.Struct.setUint16(0, 2, this);
    import_capnp_ts2.Struct.setInt8(2, value, this);
  }
  getUint8() {
    import_capnp_ts2.Struct.testWhich("uint8", import_capnp_ts2.Struct.getUint16(0, this), 3, this);
    return import_capnp_ts2.Struct.getUint8(2, this);
  }
  isUint8() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 3;
  }
  setUint8(value) {
    import_capnp_ts2.Struct.setUint16(0, 3, this);
    import_capnp_ts2.Struct.setUint8(2, value, this);
  }
  getInt16() {
    import_capnp_ts2.Struct.testWhich("int16", import_capnp_ts2.Struct.getUint16(0, this), 4, this);
    return import_capnp_ts2.Struct.getInt16(2, this);
  }
  isInt16() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 4;
  }
  setInt16(value) {
    import_capnp_ts2.Struct.setUint16(0, 4, this);
    import_capnp_ts2.Struct.setInt16(2, value, this);
  }
  getUint16() {
    import_capnp_ts2.Struct.testWhich("uint16", import_capnp_ts2.Struct.getUint16(0, this), 5, this);
    return import_capnp_ts2.Struct.getUint16(2, this);
  }
  isUint16() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 5;
  }
  setUint16(value) {
    import_capnp_ts2.Struct.setUint16(0, 5, this);
    import_capnp_ts2.Struct.setUint16(2, value, this);
  }
  getInt32() {
    import_capnp_ts2.Struct.testWhich("int32", import_capnp_ts2.Struct.getUint16(0, this), 6, this);
    return import_capnp_ts2.Struct.getInt32(4, this);
  }
  isInt32() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 6;
  }
  setInt32(value) {
    import_capnp_ts2.Struct.setUint16(0, 6, this);
    import_capnp_ts2.Struct.setInt32(4, value, this);
  }
  getUint32() {
    import_capnp_ts2.Struct.testWhich("uint32", import_capnp_ts2.Struct.getUint16(0, this), 7, this);
    return import_capnp_ts2.Struct.getUint32(4, this);
  }
  isUint32() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 7;
  }
  setUint32(value) {
    import_capnp_ts2.Struct.setUint16(0, 7, this);
    import_capnp_ts2.Struct.setUint32(4, value, this);
  }
  getInt64() {
    import_capnp_ts2.Struct.testWhich("int64", import_capnp_ts2.Struct.getUint16(0, this), 8, this);
    return import_capnp_ts2.Struct.getInt64(8, this);
  }
  isInt64() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 8;
  }
  setInt64(value) {
    import_capnp_ts2.Struct.setUint16(0, 8, this);
    import_capnp_ts2.Struct.setInt64(8, value, this);
  }
  getUint64() {
    import_capnp_ts2.Struct.testWhich("uint64", import_capnp_ts2.Struct.getUint16(0, this), 9, this);
    return import_capnp_ts2.Struct.getUint64(8, this);
  }
  isUint64() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 9;
  }
  setUint64(value) {
    import_capnp_ts2.Struct.setUint16(0, 9, this);
    import_capnp_ts2.Struct.setUint64(8, value, this);
  }
  getFloat32() {
    import_capnp_ts2.Struct.testWhich("float32", import_capnp_ts2.Struct.getUint16(0, this), 10, this);
    return import_capnp_ts2.Struct.getFloat32(4, this);
  }
  isFloat32() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 10;
  }
  setFloat32(value) {
    import_capnp_ts2.Struct.setUint16(0, 10, this);
    import_capnp_ts2.Struct.setFloat32(4, value, this);
  }
  getFloat64() {
    import_capnp_ts2.Struct.testWhich("float64", import_capnp_ts2.Struct.getUint16(0, this), 11, this);
    return import_capnp_ts2.Struct.getFloat64(8, this);
  }
  isFloat64() {
    return import_capnp_ts2.Struct.getUint16(0, this) === 11;
  }
  setFloat64(value) {
    import_capnp_ts2.Struct.setUint16(0, 11, this);
    import_capnp_ts2.Struct.setFloat64(8, value, this);
  }
  toString() {
    return "Filter_Data_" + super.toString();
  }
  which() {
    return import_capnp_ts2.Struct.getUint16(0, this);
  }
};
Filter_Data.TEXT = 0 /* TEXT */;
Filter_Data.BYTES = 1 /* BYTES */;
Filter_Data.INT8 = 2 /* INT8 */;
Filter_Data.UINT8 = 3 /* UINT8 */;
Filter_Data.INT16 = 4 /* INT16 */;
Filter_Data.UINT16 = 5 /* UINT16 */;
Filter_Data.INT32 = 6 /* INT32 */;
Filter_Data.UINT32 = 7 /* UINT32 */;
Filter_Data.INT64 = 8 /* INT64 */;
Filter_Data.UINT64 = 9 /* UINT64 */;
Filter_Data.FLOAT32 = 10 /* FLOAT32 */;
Filter_Data.FLOAT64 = 11 /* FLOAT64 */;
Filter_Data._capnp = { displayName: "data", id: "f7e88fec77255f9a", size: new import_capnp_ts2.ObjectSize(16, 2) };
var Filter = class extends import_capnp_ts2.Struct {
  getType() {
    return import_capnp_ts2.Struct.getText(0, this);
  }
  setType(value) {
    import_capnp_ts2.Struct.setText(0, value, this);
  }
  getData() {
    return import_capnp_ts2.Struct.getAs(Filter_Data, this);
  }
  initData() {
    return import_capnp_ts2.Struct.getAs(Filter_Data, this);
  }
  toString() {
    return "Filter_" + super.toString();
  }
};
Filter._capnp = { displayName: "Filter", id: "dac88a0a3b53a50a", size: new import_capnp_ts2.ObjectSize(16, 2) };
var KV = class extends import_capnp_ts2.Struct {
  getKey() {
    return import_capnp_ts2.Struct.getText(0, this);
  }
  setKey(value) {
    import_capnp_ts2.Struct.setText(0, value, this);
  }
  getValue() {
    return import_capnp_ts2.Struct.getText(1, this);
  }
  setValue(value) {
    import_capnp_ts2.Struct.setText(1, value, this);
  }
  toString() {
    return "KV_" + super.toString();
  }
};
KV._capnp = { displayName: "KV", id: "f81811af0443b7bd", size: new import_capnp_ts2.ObjectSize(0, 2) };
var _Config = class extends import_capnp_ts2.Struct {
  adoptEntries(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownEntries() {
    return import_capnp_ts2.Struct.disown(this.getEntries());
  }
  getEntries() {
    return import_capnp_ts2.Struct.getList(0, _Config._Entries, this);
  }
  hasEntries() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initEntries(length) {
    return import_capnp_ts2.Struct.initList(0, _Config._Entries, length, this);
  }
  setEntries(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  toString() {
    return "Config_" + super.toString();
  }
};
var Config = _Config;
Config._capnp = { displayName: "Config", id: "84e9e25074e7b66d", size: new import_capnp_ts2.ObjectSize(0, 1) };
var Stats = class extends import_capnp_ts2.Struct {
  adoptTimers(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownTimers() {
    return import_capnp_ts2.Struct.disown(this.getTimers());
  }
  getTimers() {
    return import_capnp_ts2.Struct.getStruct(0, MapFloat64, this);
  }
  hasTimers() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initTimers() {
    return import_capnp_ts2.Struct.initStructAt(0, MapFloat64, this);
  }
  setTimers(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  adoptCounters(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  disownCounters() {
    return import_capnp_ts2.Struct.disown(this.getCounters());
  }
  getCounters() {
    return import_capnp_ts2.Struct.getStruct(1, MapUInt64, this);
  }
  hasCounters() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(1, this));
  }
  initCounters() {
    return import_capnp_ts2.Struct.initStructAt(1, MapUInt64, this);
  }
  setCounters(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  toString() {
    return "Stats_" + super.toString();
  }
};
Stats._capnp = { displayName: "Stats", id: "ef6314d713d0ab34", size: new import_capnp_ts2.ObjectSize(0, 2) };
var Writer = class extends import_capnp_ts2.Struct {
  getCheckCoordDups() {
    return import_capnp_ts2.Struct.getBit(0, this);
  }
  setCheckCoordDups(value) {
    import_capnp_ts2.Struct.setBit(0, value, this);
  }
  getCheckCoordOOB() {
    return import_capnp_ts2.Struct.getBit(1, this);
  }
  setCheckCoordOOB(value) {
    import_capnp_ts2.Struct.setBit(1, value, this);
  }
  getDedupCoords() {
    return import_capnp_ts2.Struct.getBit(2, this);
  }
  setDedupCoords(value) {
    import_capnp_ts2.Struct.setBit(2, value, this);
  }
  adoptSubarray(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownSubarray() {
    return import_capnp_ts2.Struct.disown(this.getSubarray());
  }
  getSubarray() {
    return import_capnp_ts2.Struct.getStruct(0, DomainArray, this);
  }
  hasSubarray() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initSubarray() {
    return import_capnp_ts2.Struct.initStructAt(0, DomainArray, this);
  }
  setSubarray(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  adoptSubarrayRanges(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  disownSubarrayRanges() {
    return import_capnp_ts2.Struct.disown(this.getSubarrayRanges());
  }
  getSubarrayRanges() {
    return import_capnp_ts2.Struct.getStruct(1, Subarray, this);
  }
  hasSubarrayRanges() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(1, this));
  }
  initSubarrayRanges() {
    return import_capnp_ts2.Struct.initStructAt(1, Subarray, this);
  }
  setSubarrayRanges(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  adoptStats(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  disownStats() {
    return import_capnp_ts2.Struct.disown(this.getStats());
  }
  getStats() {
    return import_capnp_ts2.Struct.getStruct(2, Stats, this);
  }
  hasStats() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(2, this));
  }
  initStats() {
    return import_capnp_ts2.Struct.initStructAt(2, Stats, this);
  }
  setStats(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  toString() {
    return "Writer_" + super.toString();
  }
};
Writer._capnp = { displayName: "Writer", id: "fe68eabb8ab4dcfa", size: new import_capnp_ts2.ObjectSize(8, 3) };
var QueryReader = class extends import_capnp_ts2.Struct {
  getLayout() {
    return import_capnp_ts2.Struct.getText(0, this);
  }
  setLayout(value) {
    import_capnp_ts2.Struct.setText(0, value, this);
  }
  adoptSubarray(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  disownSubarray() {
    return import_capnp_ts2.Struct.disown(this.getSubarray());
  }
  getSubarray() {
    return import_capnp_ts2.Struct.getStruct(1, Subarray, this);
  }
  hasSubarray() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(1, this));
  }
  initSubarray() {
    return import_capnp_ts2.Struct.initStructAt(1, Subarray, this);
  }
  setSubarray(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  adoptReadState(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  disownReadState() {
    return import_capnp_ts2.Struct.disown(this.getReadState());
  }
  getReadState() {
    return import_capnp_ts2.Struct.getStruct(2, ReadState, this);
  }
  hasReadState() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(2, this));
  }
  initReadState() {
    return import_capnp_ts2.Struct.initStructAt(2, ReadState, this);
  }
  setReadState(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  adoptCondition(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(3, this));
  }
  disownCondition() {
    return import_capnp_ts2.Struct.disown(this.getCondition());
  }
  getCondition() {
    return import_capnp_ts2.Struct.getStruct(3, Condition, this);
  }
  hasCondition() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(3, this));
  }
  initCondition() {
    return import_capnp_ts2.Struct.initStructAt(3, Condition, this);
  }
  setCondition(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(3, this));
  }
  adoptStats(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(4, this));
  }
  disownStats() {
    return import_capnp_ts2.Struct.disown(this.getStats());
  }
  getStats() {
    return import_capnp_ts2.Struct.getStruct(4, Stats, this);
  }
  hasStats() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(4, this));
  }
  initStats() {
    return import_capnp_ts2.Struct.initStructAt(4, Stats, this);
  }
  setStats(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(4, this));
  }
  toString() {
    return "QueryReader_" + super.toString();
  }
};
QueryReader._capnp = { displayName: "QueryReader", id: "97a817df79d1095d", size: new import_capnp_ts2.ObjectSize(0, 5) };
var SubarrayRanges = class extends import_capnp_ts2.Struct {
  getType() {
    return import_capnp_ts2.Struct.getText(0, this);
  }
  setType(value) {
    import_capnp_ts2.Struct.setText(0, value, this);
  }
  getHasDefaultRange() {
    return import_capnp_ts2.Struct.getBit(0, this);
  }
  setHasDefaultRange(value) {
    import_capnp_ts2.Struct.setBit(0, value, this);
  }
  adoptBuffer(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  disownBuffer() {
    return import_capnp_ts2.Struct.disown(this.getBuffer());
  }
  getBuffer() {
    return import_capnp_ts2.Struct.getData(1, this);
  }
  hasBuffer() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(1, this));
  }
  initBuffer(length) {
    return import_capnp_ts2.Struct.initData(1, length, this);
  }
  setBuffer(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  adoptBufferSizes(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  disownBufferSizes() {
    return import_capnp_ts2.Struct.disown(this.getBufferSizes());
  }
  getBufferSizes() {
    return import_capnp_ts2.Struct.getList(2, capnp2.Uint64List, this);
  }
  hasBufferSizes() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(2, this));
  }
  initBufferSizes(length) {
    return import_capnp_ts2.Struct.initList(2, capnp2.Uint64List, length, this);
  }
  setBufferSizes(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  adoptBufferStartSizes(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(3, this));
  }
  disownBufferStartSizes() {
    return import_capnp_ts2.Struct.disown(this.getBufferStartSizes());
  }
  getBufferStartSizes() {
    return import_capnp_ts2.Struct.getList(3, capnp2.Uint64List, this);
  }
  hasBufferStartSizes() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(3, this));
  }
  initBufferStartSizes(length) {
    return import_capnp_ts2.Struct.initList(3, capnp2.Uint64List, length, this);
  }
  setBufferStartSizes(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(3, this));
  }
  toString() {
    return "SubarrayRanges_" + super.toString();
  }
};
SubarrayRanges._capnp = { displayName: "SubarrayRanges", id: "8587733f29e10a41", size: new import_capnp_ts2.ObjectSize(8, 4) };
var _Subarray = class extends import_capnp_ts2.Struct {
  getLayout() {
    return import_capnp_ts2.Struct.getText(0, this);
  }
  setLayout(value) {
    import_capnp_ts2.Struct.setText(0, value, this);
  }
  adoptRanges(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  disownRanges() {
    return import_capnp_ts2.Struct.disown(this.getRanges());
  }
  getRanges() {
    return import_capnp_ts2.Struct.getList(1, _Subarray._Ranges, this);
  }
  hasRanges() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(1, this));
  }
  initRanges(length) {
    return import_capnp_ts2.Struct.initList(1, _Subarray._Ranges, length, this);
  }
  setRanges(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  adoptStats(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  disownStats() {
    return import_capnp_ts2.Struct.disown(this.getStats());
  }
  getStats() {
    return import_capnp_ts2.Struct.getStruct(2, Stats, this);
  }
  hasStats() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(2, this));
  }
  initStats() {
    return import_capnp_ts2.Struct.initStructAt(2, Stats, this);
  }
  setStats(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  toString() {
    return "Subarray_" + super.toString();
  }
};
var Subarray = _Subarray;
Subarray._capnp = { displayName: "Subarray", id: "da36de34a7124afb", size: new import_capnp_ts2.ObjectSize(0, 3) };
var SubarrayPartitioner_PartitionInfo = class extends import_capnp_ts2.Struct {
  adoptSubarray(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownSubarray() {
    return import_capnp_ts2.Struct.disown(this.getSubarray());
  }
  getSubarray() {
    return import_capnp_ts2.Struct.getStruct(0, Subarray, this);
  }
  hasSubarray() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initSubarray() {
    return import_capnp_ts2.Struct.initStructAt(0, Subarray, this);
  }
  setSubarray(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  getStart() {
    return import_capnp_ts2.Struct.getUint64(0, this);
  }
  setStart(value) {
    import_capnp_ts2.Struct.setUint64(0, value, this);
  }
  getEnd() {
    return import_capnp_ts2.Struct.getUint64(8, this);
  }
  setEnd(value) {
    import_capnp_ts2.Struct.setUint64(8, value, this);
  }
  getSplitMultiRange() {
    return import_capnp_ts2.Struct.getBit(128, this);
  }
  setSplitMultiRange(value) {
    import_capnp_ts2.Struct.setBit(128, value, this);
  }
  toString() {
    return "SubarrayPartitioner_PartitionInfo_" + super.toString();
  }
};
SubarrayPartitioner_PartitionInfo._capnp = { displayName: "PartitionInfo", id: "c195bcd1baa34c68", size: new import_capnp_ts2.ObjectSize(24, 1) };
var _SubarrayPartitioner_State = class extends import_capnp_ts2.Struct {
  getStart() {
    return import_capnp_ts2.Struct.getUint64(0, this);
  }
  setStart(value) {
    import_capnp_ts2.Struct.setUint64(0, value, this);
  }
  getEnd() {
    return import_capnp_ts2.Struct.getUint64(8, this);
  }
  setEnd(value) {
    import_capnp_ts2.Struct.setUint64(8, value, this);
  }
  adoptSingleRange(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownSingleRange() {
    return import_capnp_ts2.Struct.disown(this.getSingleRange());
  }
  getSingleRange() {
    return import_capnp_ts2.Struct.getList(0, _SubarrayPartitioner_State._SingleRange, this);
  }
  hasSingleRange() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initSingleRange(length) {
    return import_capnp_ts2.Struct.initList(0, _SubarrayPartitioner_State._SingleRange, length, this);
  }
  setSingleRange(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  adoptMultiRange(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  disownMultiRange() {
    return import_capnp_ts2.Struct.disown(this.getMultiRange());
  }
  getMultiRange() {
    return import_capnp_ts2.Struct.getList(1, _SubarrayPartitioner_State._MultiRange, this);
  }
  hasMultiRange() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(1, this));
  }
  initMultiRange(length) {
    return import_capnp_ts2.Struct.initList(1, _SubarrayPartitioner_State._MultiRange, length, this);
  }
  setMultiRange(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  toString() {
    return "SubarrayPartitioner_State_" + super.toString();
  }
};
var SubarrayPartitioner_State = _SubarrayPartitioner_State;
SubarrayPartitioner_State._capnp = { displayName: "State", id: "cbd6edafbf7bb215", size: new import_capnp_ts2.ObjectSize(16, 2) };
var _SubarrayPartitioner = class extends import_capnp_ts2.Struct {
  adoptSubarray(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownSubarray() {
    return import_capnp_ts2.Struct.disown(this.getSubarray());
  }
  getSubarray() {
    return import_capnp_ts2.Struct.getStruct(0, Subarray, this);
  }
  hasSubarray() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initSubarray() {
    return import_capnp_ts2.Struct.initStructAt(0, Subarray, this);
  }
  setSubarray(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  adoptBudget(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  disownBudget() {
    return import_capnp_ts2.Struct.disown(this.getBudget());
  }
  getBudget() {
    return import_capnp_ts2.Struct.getList(1, _SubarrayPartitioner._Budget, this);
  }
  hasBudget() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(1, this));
  }
  initBudget(length) {
    return import_capnp_ts2.Struct.initList(1, _SubarrayPartitioner._Budget, length, this);
  }
  setBudget(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  adoptCurrent(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  disownCurrent() {
    return import_capnp_ts2.Struct.disown(this.getCurrent());
  }
  getCurrent() {
    return import_capnp_ts2.Struct.getStruct(2, SubarrayPartitioner_PartitionInfo, this);
  }
  hasCurrent() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(2, this));
  }
  initCurrent() {
    return import_capnp_ts2.Struct.initStructAt(2, SubarrayPartitioner_PartitionInfo, this);
  }
  setCurrent(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  adoptState(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(3, this));
  }
  disownState() {
    return import_capnp_ts2.Struct.disown(this.getState());
  }
  getState() {
    return import_capnp_ts2.Struct.getStruct(3, SubarrayPartitioner_State, this);
  }
  hasState() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(3, this));
  }
  initState() {
    return import_capnp_ts2.Struct.initStructAt(3, SubarrayPartitioner_State, this);
  }
  setState(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(3, this));
  }
  getMemoryBudget() {
    return import_capnp_ts2.Struct.getUint64(0, this);
  }
  setMemoryBudget(value) {
    import_capnp_ts2.Struct.setUint64(0, value, this);
  }
  getMemoryBudgetVar() {
    return import_capnp_ts2.Struct.getUint64(8, this);
  }
  setMemoryBudgetVar(value) {
    import_capnp_ts2.Struct.setUint64(8, value, this);
  }
  getMemoryBudgetValidity() {
    return import_capnp_ts2.Struct.getUint64(16, this);
  }
  setMemoryBudgetValidity(value) {
    import_capnp_ts2.Struct.setUint64(16, value, this);
  }
  adoptStats(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(4, this));
  }
  disownStats() {
    return import_capnp_ts2.Struct.disown(this.getStats());
  }
  getStats() {
    return import_capnp_ts2.Struct.getStruct(4, Stats, this);
  }
  hasStats() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(4, this));
  }
  initStats() {
    return import_capnp_ts2.Struct.initStructAt(4, Stats, this);
  }
  setStats(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(4, this));
  }
  toString() {
    return "SubarrayPartitioner_" + super.toString();
  }
};
var SubarrayPartitioner = _SubarrayPartitioner;
SubarrayPartitioner.PartitionInfo = SubarrayPartitioner_PartitionInfo;
SubarrayPartitioner.State = SubarrayPartitioner_State;
SubarrayPartitioner._capnp = { displayName: "SubarrayPartitioner", id: "98222aaeac2b06c0", size: new import_capnp_ts2.ObjectSize(24, 5) };
var ReadState = class extends import_capnp_ts2.Struct {
  getOverflowed() {
    return import_capnp_ts2.Struct.getBit(0, this);
  }
  setOverflowed(value) {
    import_capnp_ts2.Struct.setBit(0, value, this);
  }
  getUnsplittable() {
    return import_capnp_ts2.Struct.getBit(1, this);
  }
  setUnsplittable(value) {
    import_capnp_ts2.Struct.setBit(1, value, this);
  }
  getInitialized() {
    return import_capnp_ts2.Struct.getBit(2, this);
  }
  setInitialized(value) {
    import_capnp_ts2.Struct.setBit(2, value, this);
  }
  adoptSubarrayPartitioner(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownSubarrayPartitioner() {
    return import_capnp_ts2.Struct.disown(this.getSubarrayPartitioner());
  }
  getSubarrayPartitioner() {
    return import_capnp_ts2.Struct.getStruct(0, SubarrayPartitioner, this);
  }
  hasSubarrayPartitioner() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initSubarrayPartitioner() {
    return import_capnp_ts2.Struct.initStructAt(0, SubarrayPartitioner, this);
  }
  setSubarrayPartitioner(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  toString() {
    return "ReadState_" + super.toString();
  }
};
ReadState._capnp = { displayName: "ReadState", id: "910b5afbbc6a0745", size: new import_capnp_ts2.ObjectSize(8, 1) };
var ConditionClause = class extends import_capnp_ts2.Struct {
  getFieldName() {
    return import_capnp_ts2.Struct.getText(0, this);
  }
  setFieldName(value) {
    import_capnp_ts2.Struct.setText(0, value, this);
  }
  adoptValue(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  disownValue() {
    return import_capnp_ts2.Struct.disown(this.getValue());
  }
  getValue() {
    return import_capnp_ts2.Struct.getData(1, this);
  }
  hasValue() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(1, this));
  }
  initValue(length) {
    return import_capnp_ts2.Struct.initData(1, length, this);
  }
  setValue(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  getOp() {
    return import_capnp_ts2.Struct.getText(2, this);
  }
  setOp(value) {
    import_capnp_ts2.Struct.setText(2, value, this);
  }
  toString() {
    return "ConditionClause_" + super.toString();
  }
};
ConditionClause._capnp = { displayName: "ConditionClause", id: "fa99a0f16eaa03a5", size: new import_capnp_ts2.ObjectSize(0, 3) };
var _Condition = class extends import_capnp_ts2.Struct {
  adoptClauses(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownClauses() {
    return import_capnp_ts2.Struct.disown(this.getClauses());
  }
  getClauses() {
    return import_capnp_ts2.Struct.getList(0, _Condition._Clauses, this);
  }
  hasClauses() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initClauses(length) {
    return import_capnp_ts2.Struct.initList(0, _Condition._Clauses, length, this);
  }
  setClauses(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  adoptClauseCombinationOps(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  disownClauseCombinationOps() {
    return import_capnp_ts2.Struct.disown(this.getClauseCombinationOps());
  }
  getClauseCombinationOps() {
    return import_capnp_ts2.Struct.getList(1, capnp2.TextList, this);
  }
  hasClauseCombinationOps() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(1, this));
  }
  initClauseCombinationOps(length) {
    return import_capnp_ts2.Struct.initList(1, capnp2.TextList, length, this);
  }
  setClauseCombinationOps(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  toString() {
    return "Condition_" + super.toString();
  }
};
var Condition = _Condition;
Condition._capnp = { displayName: "Condition", id: "fb156e2d8b8f4cf3", size: new import_capnp_ts2.ObjectSize(0, 2) };
var DomainArray = class extends import_capnp_ts2.Struct {
  adoptInt8(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownInt8() {
    return import_capnp_ts2.Struct.disown(this.getInt8());
  }
  getInt8() {
    return import_capnp_ts2.Struct.getList(0, capnp2.Int8List, this);
  }
  hasInt8() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initInt8(length) {
    return import_capnp_ts2.Struct.initList(0, capnp2.Int8List, length, this);
  }
  setInt8(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  adoptUint8(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  disownUint8() {
    return import_capnp_ts2.Struct.disown(this.getUint8());
  }
  getUint8() {
    return import_capnp_ts2.Struct.getList(1, capnp2.Uint8List, this);
  }
  hasUint8() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(1, this));
  }
  initUint8(length) {
    return import_capnp_ts2.Struct.initList(1, capnp2.Uint8List, length, this);
  }
  setUint8(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(1, this));
  }
  adoptInt16(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  disownInt16() {
    return import_capnp_ts2.Struct.disown(this.getInt16());
  }
  getInt16() {
    return import_capnp_ts2.Struct.getList(2, capnp2.Int16List, this);
  }
  hasInt16() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(2, this));
  }
  initInt16(length) {
    return import_capnp_ts2.Struct.initList(2, capnp2.Int16List, length, this);
  }
  setInt16(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(2, this));
  }
  adoptUint16(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(3, this));
  }
  disownUint16() {
    return import_capnp_ts2.Struct.disown(this.getUint16());
  }
  getUint16() {
    return import_capnp_ts2.Struct.getList(3, capnp2.Uint16List, this);
  }
  hasUint16() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(3, this));
  }
  initUint16(length) {
    return import_capnp_ts2.Struct.initList(3, capnp2.Uint16List, length, this);
  }
  setUint16(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(3, this));
  }
  adoptInt32(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(4, this));
  }
  disownInt32() {
    return import_capnp_ts2.Struct.disown(this.getInt32());
  }
  getInt32() {
    return import_capnp_ts2.Struct.getList(4, capnp2.Int32List, this);
  }
  hasInt32() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(4, this));
  }
  initInt32(length) {
    return import_capnp_ts2.Struct.initList(4, capnp2.Int32List, length, this);
  }
  setInt32(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(4, this));
  }
  adoptUint32(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(5, this));
  }
  disownUint32() {
    return import_capnp_ts2.Struct.disown(this.getUint32());
  }
  getUint32() {
    return import_capnp_ts2.Struct.getList(5, capnp2.Uint32List, this);
  }
  hasUint32() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(5, this));
  }
  initUint32(length) {
    return import_capnp_ts2.Struct.initList(5, capnp2.Uint32List, length, this);
  }
  setUint32(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(5, this));
  }
  adoptInt64(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(6, this));
  }
  disownInt64() {
    return import_capnp_ts2.Struct.disown(this.getInt64());
  }
  getInt64() {
    return import_capnp_ts2.Struct.getList(6, capnp2.Int64List, this);
  }
  hasInt64() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(6, this));
  }
  initInt64(length) {
    return import_capnp_ts2.Struct.initList(6, capnp2.Int64List, length, this);
  }
  setInt64(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(6, this));
  }
  adoptUint64(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(7, this));
  }
  disownUint64() {
    return import_capnp_ts2.Struct.disown(this.getUint64());
  }
  getUint64() {
    return import_capnp_ts2.Struct.getList(7, capnp2.Uint64List, this);
  }
  hasUint64() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(7, this));
  }
  initUint64(length) {
    return import_capnp_ts2.Struct.initList(7, capnp2.Uint64List, length, this);
  }
  setUint64(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(7, this));
  }
  adoptFloat32(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(8, this));
  }
  disownFloat32() {
    return import_capnp_ts2.Struct.disown(this.getFloat32());
  }
  getFloat32() {
    return import_capnp_ts2.Struct.getList(8, capnp2.Float32List, this);
  }
  hasFloat32() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(8, this));
  }
  initFloat32(length) {
    return import_capnp_ts2.Struct.initList(8, capnp2.Float32List, length, this);
  }
  setFloat32(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(8, this));
  }
  adoptFloat64(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(9, this));
  }
  disownFloat64() {
    return import_capnp_ts2.Struct.disown(this.getFloat64());
  }
  getFloat64() {
    return import_capnp_ts2.Struct.getList(9, capnp2.Float64List, this);
  }
  hasFloat64() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(9, this));
  }
  initFloat64(length) {
    return import_capnp_ts2.Struct.initList(9, capnp2.Float64List, length, this);
  }
  setFloat64(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(9, this));
  }
  toString() {
    return "DomainArray_" + super.toString();
  }
};
DomainArray._capnp = { displayName: "DomainArray", id: "bc387f87af7fdffb", size: new import_capnp_ts2.ObjectSize(0, 10) };
var MapFloat64_Entry = class extends import_capnp_ts2.Struct {
  getKey() {
    return import_capnp_ts2.Struct.getText(0, this);
  }
  setKey(value) {
    import_capnp_ts2.Struct.setText(0, value, this);
  }
  getValue() {
    return import_capnp_ts2.Struct.getFloat64(0, this);
  }
  setValue(value) {
    import_capnp_ts2.Struct.setFloat64(0, value, this);
  }
  toString() {
    return "MapFloat64_Entry_" + super.toString();
  }
};
MapFloat64_Entry._capnp = { displayName: "Entry", id: "bc6fa37d7f8e67b0", size: new import_capnp_ts2.ObjectSize(8, 1) };
var _MapFloat64 = class extends import_capnp_ts2.Struct {
  adoptEntries(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownEntries() {
    return import_capnp_ts2.Struct.disown(this.getEntries());
  }
  getEntries() {
    return import_capnp_ts2.Struct.getList(0, _MapFloat64._Entries, this);
  }
  hasEntries() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initEntries(length) {
    return import_capnp_ts2.Struct.initList(0, _MapFloat64._Entries, length, this);
  }
  setEntries(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  toString() {
    return "MapFloat64_" + super.toString();
  }
};
var MapFloat64 = _MapFloat64;
MapFloat64.Entry = MapFloat64_Entry;
MapFloat64._capnp = { displayName: "MapFloat64", id: "a240366668f18d8e", size: new import_capnp_ts2.ObjectSize(0, 1) };
var MapUInt64_Entry = class extends import_capnp_ts2.Struct {
  getKey() {
    return import_capnp_ts2.Struct.getText(0, this);
  }
  setKey(value) {
    import_capnp_ts2.Struct.setText(0, value, this);
  }
  getValue() {
    return import_capnp_ts2.Struct.getUint64(0, this);
  }
  setValue(value) {
    import_capnp_ts2.Struct.setUint64(0, value, this);
  }
  toString() {
    return "MapUInt64_Entry_" + super.toString();
  }
};
MapUInt64_Entry._capnp = { displayName: "Entry", id: "977674438c18071e", size: new import_capnp_ts2.ObjectSize(8, 1) };
var _MapUInt64 = class extends import_capnp_ts2.Struct {
  adoptEntries(value) {
    import_capnp_ts2.Struct.adopt(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  disownEntries() {
    return import_capnp_ts2.Struct.disown(this.getEntries());
  }
  getEntries() {
    return import_capnp_ts2.Struct.getList(0, _MapUInt64._Entries, this);
  }
  hasEntries() {
    return !import_capnp_ts2.Struct.isNull(import_capnp_ts2.Struct.getPointer(0, this));
  }
  initEntries(length) {
    return import_capnp_ts2.Struct.initList(0, _MapUInt64._Entries, length, this);
  }
  setEntries(value) {
    import_capnp_ts2.Struct.copyFrom(value, import_capnp_ts2.Struct.getPointer(0, this));
  }
  toString() {
    return "MapUInt64_" + super.toString();
  }
};
var MapUInt64 = _MapUInt64;
MapUInt64.Entry = MapUInt64_Entry;
MapUInt64._capnp = { displayName: "MapUInt64", id: "de734faff53aa239", size: new import_capnp_ts2.ObjectSize(0, 1) };
var AttributeBufferSize = class extends import_capnp_ts2.Struct {
  getAttribute() {
    return import_capnp_ts2.Struct.getText(0, this);
  }
  setAttribute(value) {
    import_capnp_ts2.Struct.setText(0, value, this);
  }
  getOffsetBytes() {
    return import_capnp_ts2.Struct.getUint64(0, this);
  }
  setOffsetBytes(value) {
    import_capnp_ts2.Struct.setUint64(0, value, this);
  }
  getDataBytes() {
    return import_capnp_ts2.Struct.getUint64(8, this);
  }
  setDataBytes(value) {
    import_capnp_ts2.Struct.setUint64(8, value, this);
  }
  getValidityBytes() {
    return import_capnp_ts2.Struct.getUint64(16, this);
  }
  setValidityBytes(value) {
    import_capnp_ts2.Struct.setUint64(16, value, this);
  }
  toString() {
    return "AttributeBufferSize_" + super.toString();
  }
};
AttributeBufferSize._capnp = { displayName: "AttributeBufferSize", id: "e8c3366db226bb6a", size: new import_capnp_ts2.ObjectSize(24, 1) };
Query._AttributeBufferHeaders = capnp2.CompositeList(AttributeBufferHeader);
FilterPipeline._Filters = capnp2.CompositeList(Filter);
Config._Entries = capnp2.CompositeList(KV);
Subarray._Ranges = capnp2.CompositeList(SubarrayRanges);
SubarrayPartitioner_State._SingleRange = capnp2.CompositeList(Subarray);
SubarrayPartitioner_State._MultiRange = capnp2.CompositeList(Subarray);
SubarrayPartitioner._Budget = capnp2.CompositeList(AttributeBufferSize);
Condition._Clauses = capnp2.CompositeList(ConditionClause);
MapFloat64._Entries = capnp2.CompositeList(MapFloat64_Entry);
MapUInt64._Entries = capnp2.CompositeList(MapUInt64_Entry);

// src/utils/capnpQuerySerializer.ts
var capnp3 = __toESM(require_lib());
var capnpQuerySerializer = (data) => {
  const message = new capnp3.Message();
  const queryData = message.initRoot(Query);
  const {
    reader = {},
    writer = {},
    array = {},
    attributeBufferHeaders = [],
    layout = "",
    status = "",
    type: type2 = ""
  } = data;
  queryData.setLayout(layout);
  queryData.setStatus(status);
  queryData.setType(type2);
  queryData.setTotalFixedLengthBufferBytes(
    capnp3.Uint64.fromNumber(data.totalFixedLengthBufferBytes)
  );
  queryData.setTotalVarLenBufferBytes(
    capnp3.Uint64.fromNumber(data.totalVarLenBufferBytes)
  );
  queryData.setTotalValidityBufferBytes(
    capnp3.Uint64.fromNumber(data.totalValidityBufferBytes)
  );
  queryData.setVarOffsetsMode("bytes");
  queryData.setVarOffsetsAddExtraElement(false);
  queryData.setVarOffsetsBitsize(64);
  const attrBuffers = queryData.initAttributeBufferHeaders(
    attributeBufferHeaders.length
  );
  attributeBufferHeaders.forEach((attrHeader, i) => {
    const attrBufferHeader = attrBuffers.get(i);
    attrBufferHeader.setName(attrHeader.name);
    attrBufferHeader.setFixedLenBufferSizeInBytes(
      capnp3.Uint64.fromNumber(attrHeader.fixedLenBufferSizeInBytes)
    );
    attrBufferHeader.setValidityLenBufferSizeInBytes(
      capnp3.Uint64.fromNumber(attrHeader.validityLenBufferSizeInBytes)
    );
    attrBufferHeader.setVarLenBufferSizeInBytes(
      capnp3.Uint64.fromNumber(attrHeader.varLenBufferSizeInBytes)
    );
    const {
      originalFixedLenBufferSizeInBytes = 0,
      originalVarLenBufferSizeInBytes = 0,
      originalValidityLenBufferSizeInBytes = 0
    } = attrHeader;
    attrBufferHeader.setOriginalFixedLenBufferSizeInBytes(
      capnp3.Uint64.fromNumber(originalFixedLenBufferSizeInBytes)
    );
    attrBufferHeader.setOriginalVarLenBufferSizeInBytes(
      capnp3.Uint64.fromNumber(originalVarLenBufferSizeInBytes)
    );
    attrBufferHeader.setOriginalValidityLenBufferSizeInBytes(
      capnp3.Uint64.fromNumber(originalValidityLenBufferSizeInBytes)
    );
  });
  if (writer) {
    const { subarrayRanges = {}, subarray = {} } = writer;
    const queryWriter = queryData.initWriter();
    queryWriter.setCheckCoordDups(writer.checkCoordDups);
    queryWriter.setCheckCoordOOB(writer.checkCoordOOB);
    queryWriter.setDedupCoords(writer.dedupCoords);
    const writerSubArray = queryWriter.initSubarrayRanges();
    serializeSubArray(writerSubArray, subarrayRanges);
    const writerDomain = queryWriter.initSubarray();
    serializeDomainArray(writerDomain, subarray);
  }
  if (reader) {
    const queryReader = queryData.initReader();
    const subArrayCap = queryReader.initSubarray();
    const { subarray: subarrayData = {}, readState = {}, layout: layout2 = "" } = reader;
    serializeSubArray(subArrayCap, subarrayData);
    queryReader.setLayout(layout2);
    const readStateData = queryReader.initReadState();
    readStateData.setOverflowed(readState.overflowed);
    readStateData.setUnsplittable(readState.unsplittable);
    readStateData.setInitialized(readState.initialized);
    const { subarrayPartitioner = {} } = readState;
    const {
      budget = [],
      subarray = {},
      current = {},
      state = {},
      memoryBudget = 0,
      memoryBudgetVar = 0
    } = subarrayPartitioner;
    const subPartitioner = readStateData.initSubarrayPartitioner();
    subPartitioner.setMemoryBudget(capnp3.Uint64.fromNumber(memoryBudget));
    subPartitioner.setMemoryBudgetVar(capnp3.Uint64.fromNumber(memoryBudgetVar));
    const budgetData = subPartitioner.initBudget(budget.length);
    budget.forEach((b, i) => {
      const singleBudget = budgetData.get(i);
      singleBudget.setAttribute(b.attribute);
    });
    const subArrayData = subPartitioner.initSubarray();
    serializeSubArray(subArrayData, subarray);
    const currentData = subPartitioner.initCurrent();
    currentData.setSplitMultiRange(current.splitMultiRange);
    currentData.setStart(capnp3.Uint64.fromNumber(current.start || 0));
    currentData.setEnd(capnp3.Uint64.fromNumber(current.end || 0));
    const currentSubarray = currentData.initSubarray();
    serializeSubArray(currentSubarray, current.subarray || {});
    const capSubPartitionerState = subPartitioner.initState();
    capSubPartitionerState.setStart(capnp3.Uint64.fromNumber(state.start || 0));
    capSubPartitionerState.setEnd(capnp3.Uint64.fromNumber(state.end || 0));
    const multiRange = state.multiRange || [];
    const singleRange = state.singleRange || [];
    const capSubPartitionerStateMultiRange = capSubPartitionerState.initMultiRange(multiRange.length);
    const capSubPartitionerStateSingleRange = capSubPartitionerState.initSingleRange(singleRange.length);
    multiRange.forEach((mRange, i) => {
      const capMultiRange = capSubPartitionerStateMultiRange.get(i);
      serializeSubArray(capMultiRange, mRange);
    });
    singleRange.forEach((sRange, i) => {
      const capSingleRange = capSubPartitionerStateSingleRange.get(i);
      serializeSubArray(capSingleRange, sRange);
    });
  }
  if (array) {
    const queryArray = queryData.initArray();
    const startTimeStamp = clamp(array.startTimestamp || 0, 0, Date.now());
    queryArray.setStartTimestamp(capnp3.Uint64.fromNumber(startTimeStamp));
    const endTimeStamp = clamp(array.endTimestamp || Date.now(), 0, Date.now());
    queryArray.setEndTimestamp(capnp3.Uint64.fromNumber(endTimeStamp));
    queryArray.setQueryType(array.queryType || "");
    queryArray.setUri(array.uri || "");
  }
  return message.toArrayBuffer();
};
var add = (a, b) => a + b;
var capnpQuerySerializer_default = capnpQuerySerializer;
var serializeDomainArray = (domainArray, data) => {
  const { float32 = [], float64 = [], int8 = [], int16 = [], int32 = [], int64 = [], uint8 = [], uint16 = [], uint32 = [], uint64 = [] } = data;
  const dFloat32 = domainArray.initFloat32(float32.length);
  float32.forEach((num, i) => {
    dFloat32.set(i, num);
  });
  const dFloat64 = domainArray.initFloat64(float64.length);
  float64.forEach((num, i) => {
    dFloat64.set(i, num);
  });
  const dInt8 = domainArray.initInt8(int8.length);
  int8.forEach((num, i) => {
    dInt8.set(i, num);
  });
  const dInt16 = domainArray.initInt16(int16.length);
  int16.forEach((num, i) => {
    dInt16.set(i, num);
  });
  const dInt32 = domainArray.initInt32(int32.length);
  int32.forEach((num, i) => {
    dInt32.set(i, num);
  });
  const dInt64 = domainArray.initInt64(int64.length);
  int64.forEach((num, i) => {
    dInt64.set(i, capnp3.Int64.fromNumber(num));
  });
  const dUint8 = domainArray.initUint8(uint8.length);
  uint8.forEach((num, i) => {
    dUint8.set(i, num);
  });
  const dUint16 = domainArray.initUint16(uint16.length);
  uint16.forEach((num, i) => {
    dUint16.set(i, num);
  });
  const dUint32 = domainArray.initUint32(uint32.length);
  uint32.forEach((num, i) => {
    dUint32.set(i, num);
  });
  const dUint64 = domainArray.initUint64(uint64.length);
  uint64.forEach((num, i) => {
    dUint64.set(i, capnp3.Uint64.fromNumber(num));
  });
};
var serializeSubArray = (capSubArray, subArray) => {
  const { ranges = [], layout = "" } = subArray;
  capSubArray.setLayout(layout);
  const capRanges = capSubArray.initRanges(ranges.length);
  ranges.forEach((range2, i) => {
    const r = capRanges.get(i);
    const bufferSizesArray = range2.bufferSizes || [];
    r.setType(range2.type);
    r.setHasDefaultRange(range2.hasDefaultRange);
    const totalBufferSize = bufferSizesArray.reduce(add);
    const bufferData = r.initBuffer(totalBufferSize);
    const view = Uint8Array.from(range2.buffer);
    bufferData.copyBuffer(view);
    r.setBuffer(bufferData);
    const bufferSizes = r.initBufferSizes(bufferSizesArray.length);
    bufferSizesArray.forEach((bsize, i2) => {
      bufferSizes.set(i2, capnp3.Uint64.fromNumber(bsize));
    });
    r.setBufferSizes(bufferSizes);
    const bufferStartSizesArray = range2.bufferStartSizes || [];
    const bufferStartSizes = r.initBufferStartSizes(
      bufferStartSizesArray.length
    );
    bufferStartSizesArray.forEach((bsize, i2) => {
      bufferStartSizes.set(i2, capnp3.Uint64.fromNumber(bsize));
    });
    r.setBufferStartSizes(bufferStartSizes);
  });
};
var clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// src/utils/capnpSerializer.ts
var capnpSerializer = (data) => {
  if (isArrayMetadata(data)) {
    return serializeArrayMetadata(data);
  } else if (isQuerydata(data)) {
    return capnpQuerySerializer_default(data);
  }
  return data;
};
var capnpSerializer_default = capnpSerializer;
var serializeArrayMetadata = (data) => {
  const entriesLength = data.entries.length;
  const message = new capnp4.Message();
  const metadata = message.initRoot(ArrayMetadata);
  const entries = metadata.initEntries(entriesLength);
  data.entries.forEach((entryData, i) => {
    const entry = entries.get(i);
    entry.setKey(entryData.key);
    entry.setType(entryData.type);
    entry.setValueNum(entryData.valueNum);
    const valueLength = entryData.value.length;
    const data2 = entry.initValue(valueLength);
    const arrBuffer = new ArrayBuffer(valueLength);
    const view = new Uint8Array(arrBuffer);
    entryData.value.forEach((num, i2) => {
      view[i2] = num;
    });
    data2.copyBuffer(view);
    entry.setValue(data2);
    entry.setDel(entryData.del);
  });
  return message.toArrayBuffer();
};
var isArrayMetadata = (data) => {
  if (data && Array.isArray(data.entries)) {
    return true;
  }
  return false;
};
var isQuerydata = (data) => {
  if (data && (data.reader || data.writer)) {
    return true;
  }
  return false;
};

// src/v1/common.ts
var DUMMY_BASE_URL = "https://example.com";
var assertParamExists = function(functionName, paramName, paramValue) {
  if (paramValue === null || paramValue === void 0) {
    throw new RequiredError(paramName, `Required parameter ${paramName} was null or undefined when calling ${functionName}.`);
  }
};
var setApiKeyToObject = async function(object, keyParamName, configuration) {
  if (configuration && configuration.apiKey) {
    const localVarApiKeyValue = typeof configuration.apiKey === "function" ? await configuration.apiKey(keyParamName) : await configuration.apiKey;
    object[keyParamName] = localVarApiKeyValue;
  }
};
var setBasicAuthToObject = function(object, configuration) {
  if (configuration && (configuration.username || configuration.password)) {
    object["auth"] = { username: configuration.username, password: configuration.password };
  }
};
var setSearchParams = function(url, ...objects) {
  const searchParams = new URLSearchParams(url.search);
  for (const object of objects) {
    for (const key in object) {
      if (Array.isArray(object[key])) {
        searchParams.delete(key);
        for (const item of object[key]) {
          searchParams.append(key, item);
        }
      } else {
        searchParams.set(key, object[key]);
      }
    }
  }
  url.search = searchParams.toString();
};
var serializeDataIfNeeded = function(value, requestOptions, configuration) {
  const nonString = typeof value !== "string";
  const needsJSONSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isJsonMime(requestOptions.headers["Content-Type"]) : nonString;
  if (needsJSONSerialization) {
    return JSON.stringify(value !== void 0 ? value : {});
  }
  const needsCapnpSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isCapnpMime(requestOptions.headers["Content-Type"]) : nonString;
  if (needsCapnpSerialization) {
    return value !== void 0 ? capnpSerializer_default(value) : "";
  }
  return value || "";
};
var toPathString = function(url) {
  return url.pathname + url.search + url.hash;
};
var createRequestFunction = function(axiosArgs, globalAxios9, BASE_PATH3, configuration) {
  return (axios2 = globalAxios9, basePath = BASE_PATH3) => {
    const axiosRequestArgs = { ...axiosArgs.options, url: ((configuration == null ? void 0 : configuration.basePath) || basePath) + axiosArgs.url };
    return axios2.request(axiosRequestArgs);
  };
};

// src/v1/api.ts
var ActivityEventType = /* @__PURE__ */ ((ActivityEventType3) => {
  ActivityEventType3["ReadSchema"] = "read_schema";
  ActivityEventType3["MaxBufferSizes"] = "max_buffer_sizes";
  ActivityEventType3["NonEmptyDomain"] = "non_empty_domain";
  ActivityEventType3["QueryRead"] = "query_read";
  ActivityEventType3["QueryWrite"] = "query_write";
  ActivityEventType3["Create"] = "create";
  ActivityEventType3["Delete"] = "delete";
  ActivityEventType3["Register"] = "register";
  ActivityEventType3["Deregister"] = "deregister";
  ActivityEventType3["Udf"] = "udf";
  ActivityEventType3["ArrayMetadataGet"] = "array_metadata_get";
  ActivityEventType3["ArrayMetadataUpdate"] = "array_metadata_update";
  ActivityEventType3["EstimatedResultSizes"] = "estimated_result_sizes";
  return ActivityEventType3;
})(ActivityEventType || {});
var ArrayActions = /* @__PURE__ */ ((ArrayActions2) => {
  ArrayActions2["Read"] = "read";
  ArrayActions2["Write"] = "write";
  ArrayActions2["Edit"] = "edit";
  ArrayActions2["ReadArrayLogs"] = "read_array_logs";
  ArrayActions2["ReadArrayInfo"] = "read_array_info";
  ArrayActions2["ReadArraySchema"] = "read_array_schema";
  return ArrayActions2;
})(ArrayActions || {});
var ArrayTaskStatus = /* @__PURE__ */ ((ArrayTaskStatus2) => {
  ArrayTaskStatus2["Queued"] = "QUEUED";
  ArrayTaskStatus2["Failed"] = "FAILED";
  ArrayTaskStatus2["Completed"] = "COMPLETED";
  ArrayTaskStatus2["Running"] = "RUNNING";
  ArrayTaskStatus2["ResourcesUnavailable"] = "RESOURCES_UNAVAILABLE";
  ArrayTaskStatus2["Unknown"] = "UNKNOWN";
  ArrayTaskStatus2["Cancelled"] = "CANCELLED";
  ArrayTaskStatus2["Denied"] = "DENIED";
  return ArrayTaskStatus2;
})(ArrayTaskStatus || {});
var ArrayTaskType = /* @__PURE__ */ ((ArrayTaskType2) => {
  ArrayTaskType2["Sql"] = "SQL";
  ArrayTaskType2["Udf"] = "UDF";
  ArrayTaskType2["Query"] = "QUERY";
  ArrayTaskType2["GenericUdf"] = "GENERIC_UDF";
  ArrayTaskType2["ClientComputation"] = "CLIENT_COMPUTATION";
  return ArrayTaskType2;
})(ArrayTaskType || {});
var ArrayType = /* @__PURE__ */ ((ArrayType2) => {
  ArrayType2["Dense"] = "dense";
  ArrayType2["Sparse"] = "sparse";
  return ArrayType2;
})(ArrayType || {});
var Datatype = /* @__PURE__ */ ((Datatype3) => {
  Datatype3["Int32"] = "INT32";
  Datatype3["Int64"] = "INT64";
  Datatype3["Float32"] = "FLOAT32";
  Datatype3["Float64"] = "FLOAT64";
  Datatype3["Char"] = "CHAR";
  Datatype3["Int8"] = "INT8";
  Datatype3["Uint8"] = "UINT8";
  Datatype3["Int16"] = "INT16";
  Datatype3["Uint16"] = "UINT16";
  Datatype3["Uint32"] = "UINT32";
  Datatype3["Uint64"] = "UINT64";
  Datatype3["StringAscii"] = "STRING_ASCII";
  Datatype3["StringUtf8"] = "STRING_UTF8";
  Datatype3["StringUtf16"] = "STRING_UTF16";
  Datatype3["StringUtf32"] = "STRING_UTF32";
  Datatype3["StringUcs2"] = "STRING_UCS2";
  Datatype3["StringUcs4"] = "STRING_UCS4";
  Datatype3["Any"] = "ANY";
  return Datatype3;
})(Datatype || {});
var FilePropertyName = /* @__PURE__ */ ((FilePropertyName2) => {
  FilePropertyName2["Image"] = "image";
  FilePropertyName2["Size"] = "size";
  FilePropertyName2["CodeBlock"] = "code_block";
  FilePropertyName2["UdfLanguage"] = "udf_language";
  FilePropertyName2["IsDashboard"] = "is_dashboard";
  return FilePropertyName2;
})(FilePropertyName || {});
var FileType = /* @__PURE__ */ ((FileType2) => {
  FileType2["Notebook"] = "notebook";
  FileType2["UserDefinedFunction"] = "user_defined_function";
  FileType2["MlModel"] = "ml_model";
  FileType2["File"] = "file";
  FileType2["RegisteredTaskGraph"] = "registered_task_graph";
  return FileType2;
})(FileType || {});
var FilterOption = /* @__PURE__ */ ((FilterOption2) => {
  FilterOption2["CompressionLevel"] = "COMPRESSION_LEVEL";
  FilterOption2["BitWidthMaxWindow"] = "BIT_WIDTH_MAX_WINDOW";
  FilterOption2["PositiveDeltaMaxWindow"] = "POSITIVE_DELTA_MAX_WINDOW";
  return FilterOption2;
})(FilterOption || {});
var FilterType = /* @__PURE__ */ ((FilterType2) => {
  FilterType2["None"] = "FILTER_NONE";
  FilterType2["Gzip"] = "FILTER_GZIP";
  FilterType2["Zstd"] = "FILTER_ZSTD";
  FilterType2["Lz4"] = "FILTER_LZ4";
  FilterType2["Rle"] = "FILTER_RLE";
  FilterType2["Bzip2"] = "FILTER_BZIP2";
  FilterType2["DoubleDelta"] = "FILTER_DOUBLE_DELTA";
  FilterType2["BitWidthReduction"] = "FILTER_BIT_WIDTH_REDUCTION";
  FilterType2["Bitshuffle"] = "FILTER_BITSHUFFLE";
  FilterType2["Byteshuffle"] = "FILTER_BYTESHUFFLE";
  FilterType2["PositiveDelta"] = "FILTER_POSITIVE_DELTA";
  return FilterType2;
})(FilterType || {});
var GroupActions = /* @__PURE__ */ ((GroupActions2) => {
  GroupActions2["Read"] = "read";
  GroupActions2["Write"] = "write";
  GroupActions2["Edit"] = "edit";
  return GroupActions2;
})(GroupActions || {});
var GroupMemberAssetType = /* @__PURE__ */ ((GroupMemberAssetType3) => {
  GroupMemberAssetType3["Group"] = "group";
  GroupMemberAssetType3["Array"] = "array";
  GroupMemberAssetType3["Notebook"] = "notebook";
  GroupMemberAssetType3["Dashboard"] = "dashboard";
  GroupMemberAssetType3["UserDefinedFunction"] = "user_defined_function";
  GroupMemberAssetType3["MlModel"] = "ml_model";
  GroupMemberAssetType3["File"] = "file";
  return GroupMemberAssetType3;
})(GroupMemberAssetType || {});
var GroupMemberType = /* @__PURE__ */ ((GroupMemberType3) => {
  GroupMemberType3["Group"] = "group";
  GroupMemberType3["Array"] = "array";
  return GroupMemberType3;
})(GroupMemberType || {});
var InvitationStatus = /* @__PURE__ */ ((InvitationStatus2) => {
  InvitationStatus2["Pending"] = "PENDING";
  InvitationStatus2["Accepted"] = "ACCEPTED";
  return InvitationStatus2;
})(InvitationStatus || {});
var InvitationType = /* @__PURE__ */ ((InvitationType2) => {
  InvitationType2["ArrayShare"] = "ARRAY_SHARE";
  InvitationType2["JoinOrganization"] = "JOIN_ORGANIZATION";
  return InvitationType2;
})(InvitationType || {});
var Layout = /* @__PURE__ */ ((Layout3) => {
  Layout3["RowMajor"] = "row-major";
  Layout3["ColMajor"] = "col-major";
  Layout3["GlobalOrder"] = "global-order";
  Layout3["Unordered"] = "unordered";
  return Layout3;
})(Layout || {});
var NamespaceActions = /* @__PURE__ */ ((NamespaceActions2) => {
  NamespaceActions2["Read"] = "read";
  NamespaceActions2["Write"] = "write";
  NamespaceActions2["Create"] = "create";
  NamespaceActions2["Delete"] = "delete";
  NamespaceActions2["Edit"] = "edit";
  NamespaceActions2["ReadArrayLogs"] = "read_array_logs";
  NamespaceActions2["ReadJobLogs"] = "read_job_logs";
  NamespaceActions2["ReadObjectLogs"] = "read_object_logs";
  NamespaceActions2["RunJob"] = "run_job";
  NamespaceActions2["DeleteOrganization"] = "delete_organization";
  NamespaceActions2["EditOrganization"] = "edit_organization";
  NamespaceActions2["EditBilling"] = "edit_billing";
  return NamespaceActions2;
})(NamespaceActions || {});
var OrganizationRoles = /* @__PURE__ */ ((OrganizationRoles2) => {
  OrganizationRoles2["Owner"] = "owner";
  OrganizationRoles2["Admin"] = "admin";
  OrganizationRoles2["ReadWrite"] = "read_write";
  OrganizationRoles2["ReadOnly"] = "read_only";
  return OrganizationRoles2;
})(OrganizationRoles || {});
var PricingAggregateUsage = /* @__PURE__ */ ((PricingAggregateUsage2) => {
  PricingAggregateUsage2["Sum"] = "sum";
  return PricingAggregateUsage2;
})(PricingAggregateUsage || {});
var PricingCurrency = /* @__PURE__ */ ((PricingCurrency2) => {
  PricingCurrency2["Usd"] = "USD";
  return PricingCurrency2;
})(PricingCurrency || {});
var PricingInterval = /* @__PURE__ */ ((PricingInterval2) => {
  PricingInterval2["Month"] = "month";
  return PricingInterval2;
})(PricingInterval || {});
var PricingType = /* @__PURE__ */ ((PricingType2) => {
  PricingType2["Egress"] = "egress";
  PricingType2["Access"] = "access";
  return PricingType2;
})(PricingType || {});
var PricingUnitLabel = /* @__PURE__ */ ((PricingUnitLabel2) => {
  PricingUnitLabel2["Byte"] = "byte";
  PricingUnitLabel2["Second"] = "second";
  return PricingUnitLabel2;
})(PricingUnitLabel || {});
var PublicShareFilter = /* @__PURE__ */ ((PublicShareFilter2) => {
  PublicShareFilter2["Exclude"] = "exclude";
  PublicShareFilter2["Only"] = "only";
  return PublicShareFilter2;
})(PublicShareFilter || {});
var Querystatus = /* @__PURE__ */ ((Querystatus3) => {
  Querystatus3["Failed"] = "FAILED";
  Querystatus3["Completed"] = "COMPLETED";
  Querystatus3["Inprogress"] = "INPROGRESS";
  Querystatus3["Incomplete"] = "INCOMPLETE";
  Querystatus3["Uninitialized"] = "UNINITIALIZED";
  return Querystatus3;
})(Querystatus || {});
var Querytype = /* @__PURE__ */ ((Querytype3) => {
  Querytype3["Read"] = "READ";
  Querytype3["Write"] = "WRITE";
  return Querytype3;
})(Querytype || {});
var ResultFormat = /* @__PURE__ */ ((ResultFormat2) => {
  ResultFormat2["PythonPickle"] = "python_pickle";
  ResultFormat2["RSerialization"] = "r_serialization";
  ResultFormat2["Json"] = "json";
  ResultFormat2["Arrow"] = "arrow";
  ResultFormat2["Bytes"] = "bytes";
  ResultFormat2["TiledbJson"] = "tiledb_json";
  ResultFormat2["Native"] = "native";
  return ResultFormat2;
})(ResultFormat || {});
var SSOProvider = /* @__PURE__ */ ((SSOProvider2) => {
  SSOProvider2["Github"] = "github";
  SSOProvider2["Google"] = "google";
  SSOProvider2["Stripe"] = "stripe";
  SSOProvider2["Okta"] = "okta";
  return SSOProvider2;
})(SSOProvider || {});
var TaskGraphActions = /* @__PURE__ */ ((TaskGraphActions2) => {
  TaskGraphActions2["FetchTaskGraph"] = "fetch_task_graph";
  TaskGraphActions2["ShareTaskGraph"] = "share_task_graph";
  return TaskGraphActions2;
})(TaskGraphActions || {});
var TaskGraphLogRunLocation = /* @__PURE__ */ ((TaskGraphLogRunLocation2) => {
  TaskGraphLogRunLocation2["Server"] = "server";
  TaskGraphLogRunLocation2["Client"] = "client";
  TaskGraphLogRunLocation2["Virtual"] = "virtual";
  return TaskGraphLogRunLocation2;
})(TaskGraphLogRunLocation || {});
var TaskGraphLogStatus = /* @__PURE__ */ ((TaskGraphLogStatus2) => {
  TaskGraphLogStatus2["Submitted"] = "submitted";
  TaskGraphLogStatus2["Running"] = "running";
  TaskGraphLogStatus2["Idle"] = "idle";
  TaskGraphLogStatus2["Abandoned"] = "abandoned";
  TaskGraphLogStatus2["Succeeded"] = "succeeded";
  TaskGraphLogStatus2["Failed"] = "failed";
  TaskGraphLogStatus2["Cancelled"] = "cancelled";
  return TaskGraphLogStatus2;
})(TaskGraphLogStatus || {});
var TokenScope = /* @__PURE__ */ ((TokenScope2) => {
  TokenScope2["PasswordReset"] = "password_reset";
  TokenScope2["ConfirmEmail"] = "confirm_email";
  TokenScope2["Star"] = "*";
  TokenScope2["Userread"] = "user:read";
  TokenScope2["UserreadWrite"] = "user:read-write";
  TokenScope2["Useradmin"] = "user:admin";
  TokenScope2["Arrayread"] = "array:read";
  TokenScope2["ArrayreadWrite"] = "array:read-write";
  TokenScope2["Arrayadmin"] = "array:admin";
  TokenScope2["Organizationread"] = "organization:read";
  TokenScope2["OrganizationreadWrite"] = "organization:read-write";
  TokenScope2["Organizationadmin"] = "organization:admin";
  TokenScope2["Groupread"] = "group:read";
  TokenScope2["GroupreadWrite"] = "group:read-write";
  TokenScope2["Groupadmin"] = "group:admin";
  return TokenScope2;
})(TokenScope || {});
var UDFActions = /* @__PURE__ */ ((UDFActions2) => {
  UDFActions2["FetchUdf"] = "fetch_udf";
  UDFActions2["ShareUdf"] = "share_udf";
  return UDFActions2;
})(UDFActions || {});
var UDFLanguage = /* @__PURE__ */ ((UDFLanguage2) => {
  UDFLanguage2["Python"] = "python";
  UDFLanguage2["R"] = "r";
  return UDFLanguage2;
})(UDFLanguage || {});
var UDFType = /* @__PURE__ */ ((UDFType2) => {
  UDFType2["MultiArray"] = "multi_array";
  UDFType2["SingleArray"] = "single_array";
  UDFType2["Generic"] = "generic";
  return UDFType2;
})(UDFType || {});
var ArrayApiAxiosParamCreator = function(configuration) {
  return {
    arrayActivityLog: async (namespace, array, start, end, eventTypes, taskId, hasTaskId, options = {}) => {
      assertParamExists("arrayActivityLog", "namespace", namespace);
      assertParamExists("arrayActivityLog", "array", array);
      const localVarPath = `/arrays/{namespace}/{array}/activity`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (start !== void 0) {
        localVarQueryParameter["start"] = start;
      }
      if (end !== void 0) {
        localVarQueryParameter["end"] = end;
      }
      if (eventTypes !== void 0) {
        localVarQueryParameter["event_types"] = eventTypes;
      }
      if (taskId !== void 0) {
        localVarQueryParameter["task_id"] = taskId;
      }
      if (hasTaskId !== void 0) {
        localVarQueryParameter["has_task_id"] = hasTaskId;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    arraysBrowserOwnedGet: async (page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options = {}) => {
      const localVarPath = `/arrays/browser/owned`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      if (namespace !== void 0) {
        localVarQueryParameter["namespace"] = namespace;
      }
      if (orderby !== void 0) {
        localVarQueryParameter["orderby"] = orderby;
      }
      if (permissions !== void 0) {
        localVarQueryParameter["permissions"] = permissions;
      }
      if (tag) {
        localVarQueryParameter["tag"] = tag;
      }
      if (excludeTag) {
        localVarQueryParameter["exclude_tag"] = excludeTag;
      }
      if (fileType) {
        localVarQueryParameter["file_type"] = fileType;
      }
      if (excludeFileType) {
        localVarQueryParameter["exclude_file_type"] = excludeFileType;
      }
      if (fileProperty) {
        localVarQueryParameter["file_property"] = fileProperty;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    arraysBrowserOwnedSidebarGet: async (options = {}) => {
      const localVarPath = `/arrays/browser/owned/sidebar`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    arraysBrowserPublicGet: async (page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options = {}) => {
      const localVarPath = `/arrays/browser/public`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      if (namespace !== void 0) {
        localVarQueryParameter["namespace"] = namespace;
      }
      if (orderby !== void 0) {
        localVarQueryParameter["orderby"] = orderby;
      }
      if (permissions !== void 0) {
        localVarQueryParameter["permissions"] = permissions;
      }
      if (tag) {
        localVarQueryParameter["tag"] = tag;
      }
      if (excludeTag) {
        localVarQueryParameter["exclude_tag"] = excludeTag;
      }
      if (fileType) {
        localVarQueryParameter["file_type"] = fileType;
      }
      if (excludeFileType) {
        localVarQueryParameter["exclude_file_type"] = excludeFileType;
      }
      if (fileProperty) {
        localVarQueryParameter["file_property"] = fileProperty;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    arraysBrowserPublicSidebarGet: async (options = {}) => {
      const localVarPath = `/arrays/browser/public/sidebar`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    arraysBrowserSharedGet: async (page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options = {}) => {
      const localVarPath = `/arrays/browser/shared`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      if (namespace !== void 0) {
        localVarQueryParameter["namespace"] = namespace;
      }
      if (orderby !== void 0) {
        localVarQueryParameter["orderby"] = orderby;
      }
      if (permissions !== void 0) {
        localVarQueryParameter["permissions"] = permissions;
      }
      if (tag) {
        localVarQueryParameter["tag"] = tag;
      }
      if (excludeTag) {
        localVarQueryParameter["exclude_tag"] = excludeTag;
      }
      if (fileType) {
        localVarQueryParameter["file_type"] = fileType;
      }
      if (excludeFileType) {
        localVarQueryParameter["exclude_file_type"] = excludeFileType;
      }
      if (fileProperty) {
        localVarQueryParameter["file_property"] = fileProperty;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    arraysBrowserSharedSidebarGet: async (options = {}) => {
      const localVarPath = `/arrays/browser/shared/sidebar`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    arraysNamespaceArrayEndTimestampsGet: async (namespace, array, page, perPage, options = {}) => {
      assertParamExists("arraysNamespaceArrayEndTimestampsGet", "namespace", namespace);
      assertParamExists("arraysNamespaceArrayEndTimestampsGet", "array", array);
      const localVarPath = `/arrays/{namespace}/{array}/end_timestamps`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    consolidateArray: async (namespace, array, tiledbConfig, options = {}) => {
      assertParamExists("consolidateArray", "namespace", namespace);
      assertParamExists("consolidateArray", "array", array);
      assertParamExists("consolidateArray", "tiledbConfig", tiledbConfig);
      const localVarPath = `/arrays/{namespace}/{array}/consolidate`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(tiledbConfig, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    createArray: async (namespace, array, contentType, arraySchema, xTILEDBCLOUDACCESSCREDENTIALSNAME, options = {}) => {
      assertParamExists("createArray", "namespace", namespace);
      assertParamExists("createArray", "array", array);
      assertParamExists("createArray", "contentType", contentType);
      assertParamExists("createArray", "arraySchema", arraySchema);
      const localVarPath = `/arrays/{namespace}/{array}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (contentType !== void 0 && contentType !== null) {
        localVarHeaderParameter["Content-Type"] = String(contentType);
      }
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(arraySchema, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteArray: async (namespace, array, contentType, options = {}) => {
      assertParamExists("deleteArray", "namespace", namespace);
      assertParamExists("deleteArray", "array", array);
      assertParamExists("deleteArray", "contentType", contentType);
      const localVarPath = `/arrays/{namespace}/{array}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (contentType !== void 0 && contentType !== null) {
        localVarHeaderParameter["Content-Type"] = String(contentType);
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deregisterArray: async (namespace, array, options = {}) => {
      assertParamExists("deregisterArray", "namespace", namespace);
      assertParamExists("deregisterArray", "array", array);
      const localVarPath = `/arrays/{namespace}/{array}/deregister`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getActivityLogById: async (namespace, array, id, options = {}) => {
      assertParamExists("getActivityLogById", "namespace", namespace);
      assertParamExists("getActivityLogById", "array", array);
      assertParamExists("getActivityLogById", "id", id);
      const localVarPath = `/arrays/{namespace}/{array}/activity/{id}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array))).replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getAllArrayMetadata: async (publicShare, options = {}) => {
      const localVarPath = `/arrays`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (publicShare !== void 0) {
        localVarQueryParameter["public_share"] = publicShare;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getArray: async (namespace, array, contentType, options = {}) => {
      assertParamExists("getArray", "namespace", namespace);
      assertParamExists("getArray", "array", array);
      assertParamExists("getArray", "contentType", contentType);
      const localVarPath = `/arrays/{namespace}/{array}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (contentType !== void 0 && contentType !== null) {
        localVarHeaderParameter["Content-Type"] = String(contentType);
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getArrayMaxBufferSizes: async (namespace, array, subarray, contentType, xPayer, options = {}) => {
      assertParamExists("getArrayMaxBufferSizes", "namespace", namespace);
      assertParamExists("getArrayMaxBufferSizes", "array", array);
      assertParamExists("getArrayMaxBufferSizes", "subarray", subarray);
      assertParamExists("getArrayMaxBufferSizes", "contentType", contentType);
      const localVarPath = `/arrays/{namespace}/{array}/max_buffer_sizes`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (subarray !== void 0) {
        localVarQueryParameter["subarray"] = subarray;
      }
      if (contentType !== void 0 && contentType !== null) {
        localVarHeaderParameter["Content-Type"] = String(contentType);
      }
      if (xPayer !== void 0 && xPayer !== null) {
        localVarHeaderParameter["X-Payer"] = String(xPayer);
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getArrayMetaDataJson: async (namespace, array, length, endTimestamp, options = {}) => {
      assertParamExists("getArrayMetaDataJson", "namespace", namespace);
      assertParamExists("getArrayMetaDataJson", "array", array);
      const localVarPath = `/arrays/{namespace}/{array}/metadata_json`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (length !== void 0) {
        localVarQueryParameter["length"] = length;
      }
      if (endTimestamp !== void 0) {
        localVarQueryParameter["end_timestamp"] = endTimestamp;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getArrayMetadata: async (namespace, array, options = {}) => {
      assertParamExists("getArrayMetadata", "namespace", namespace);
      assertParamExists("getArrayMetadata", "array", array);
      const localVarPath = `/arrays/{namespace}/{array}/metadata`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getArrayMetadataCapnp: async (namespace, array, options = {}) => {
      assertParamExists("getArrayMetadataCapnp", "namespace", namespace);
      assertParamExists("getArrayMetadataCapnp", "array", array);
      const localVarPath = `/arrays/{namespace}/{array}/array_metadata`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getArrayNonEmptyDomain: async (namespace, array, contentType, xPayer, options = {}) => {
      assertParamExists("getArrayNonEmptyDomain", "namespace", namespace);
      assertParamExists("getArrayNonEmptyDomain", "array", array);
      assertParamExists("getArrayNonEmptyDomain", "contentType", contentType);
      const localVarPath = `/arrays/{namespace}/{array}/non_empty_domain`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (contentType !== void 0 && contentType !== null) {
        localVarHeaderParameter["Content-Type"] = String(contentType);
      }
      if (xPayer !== void 0 && xPayer !== null) {
        localVarHeaderParameter["X-Payer"] = String(xPayer);
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getArrayNonEmptyDomainJson: async (namespace, array, options = {}) => {
      assertParamExists("getArrayNonEmptyDomainJson", "namespace", namespace);
      assertParamExists("getArrayNonEmptyDomainJson", "array", array);
      const localVarPath = `/arrays/{namespace}/{array}/non_empty_domain_json`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getArraySampleData: async (namespace, array, samples, options = {}) => {
      assertParamExists("getArraySampleData", "namespace", namespace);
      assertParamExists("getArraySampleData", "array", array);
      const localVarPath = `/arrays/{namespace}/{array}/sample`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (samples !== void 0) {
        localVarQueryParameter["samples"] = samples;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getArraySharingPolicies: async (namespace, array, options = {}) => {
      assertParamExists("getArraySharingPolicies", "namespace", namespace);
      assertParamExists("getArraySharingPolicies", "array", array);
      const localVarPath = `/arrays/{namespace}/{array}/share`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getArraysInNamespace: async (namespace, options = {}) => {
      assertParamExists("getArraysInNamespace", "namespace", namespace);
      const localVarPath = `/arrays/{namespace}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getFragmentEndTimestamp: async (namespace, array, endTimestamp, options = {}) => {
      assertParamExists("getFragmentEndTimestamp", "namespace", namespace);
      assertParamExists("getFragmentEndTimestamp", "array", array);
      const localVarPath = `/arrays/{namespace}/{array}/fragment_end_timestamp`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (endTimestamp !== void 0) {
        localVarQueryParameter["end_timestamp"] = endTimestamp;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getLastAccessedArrays: async (options = {}) => {
      const localVarPath = `/arrays/last_accessed`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    registerArray: async (namespace, array, arrayMetadata, options = {}) => {
      assertParamExists("registerArray", "namespace", namespace);
      assertParamExists("registerArray", "array", array);
      assertParamExists("registerArray", "arrayMetadata", arrayMetadata);
      const localVarPath = `/arrays/{namespace}/{array}/register`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(arrayMetadata, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    shareArray: async (namespace, array, arraySharing, options = {}) => {
      assertParamExists("shareArray", "namespace", namespace);
      assertParamExists("shareArray", "array", array);
      assertParamExists("shareArray", "arraySharing", arraySharing);
      const localVarPath = `/arrays/{namespace}/{array}/share`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(arraySharing, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateArrayMetadata: async (namespace, array, arrayMetadata, options = {}) => {
      assertParamExists("updateArrayMetadata", "namespace", namespace);
      assertParamExists("updateArrayMetadata", "array", array);
      assertParamExists("updateArrayMetadata", "arrayMetadata", arrayMetadata);
      const localVarPath = `/arrays/{namespace}/{array}/metadata`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(arrayMetadata, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateArrayMetadataCapnp: async (namespace, array, arrayMetadataEntries, options = {}) => {
      assertParamExists("updateArrayMetadataCapnp", "namespace", namespace);
      assertParamExists("updateArrayMetadataCapnp", "array", array);
      assertParamExists("updateArrayMetadataCapnp", "arrayMetadataEntries", arrayMetadataEntries);
      const localVarPath = `/arrays/{namespace}/{array}/array_metadata`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(arrayMetadataEntries, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    vacuumArray: async (namespace, array, tiledbConfig, options = {}) => {
      assertParamExists("vacuumArray", "namespace", namespace);
      assertParamExists("vacuumArray", "array", array);
      assertParamExists("vacuumArray", "tiledbConfig", tiledbConfig);
      const localVarPath = `/arrays/{namespace}/{array}/vacuum`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(tiledbConfig, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var ArrayApiFp = function(configuration) {
  const localVarAxiosParamCreator = ArrayApiAxiosParamCreator(configuration);
  return {
    async arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async arraysBrowserOwnedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.arraysBrowserOwnedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async arraysBrowserOwnedSidebarGet(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.arraysBrowserOwnedSidebarGet(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async arraysBrowserPublicGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.arraysBrowserPublicGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async arraysBrowserPublicSidebarGet(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.arraysBrowserPublicSidebarGet(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async arraysBrowserSharedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.arraysBrowserSharedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async arraysBrowserSharedSidebarGet(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.arraysBrowserSharedSidebarGet(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async arraysNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.arraysNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async consolidateArray(namespace, array, tiledbConfig, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.consolidateArray(namespace, array, tiledbConfig, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async createArray(namespace, array, contentType, arraySchema, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.createArray(namespace, array, contentType, arraySchema, xTILEDBCLOUDACCESSCREDENTIALSNAME, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteArray(namespace, array, contentType, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteArray(namespace, array, contentType, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deregisterArray(namespace, array, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deregisterArray(namespace, array, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getActivityLogById(namespace, array, id, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getActivityLogById(namespace, array, id, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getAllArrayMetadata(publicShare, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getAllArrayMetadata(publicShare, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getArray(namespace, array, contentType, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArray(namespace, array, contentType, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getArrayMaxBufferSizes(namespace, array, subarray, contentType, xPayer, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArrayMaxBufferSizes(namespace, array, subarray, contentType, xPayer, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getArrayMetaDataJson(namespace, array, length, endTimestamp, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArrayMetaDataJson(namespace, array, length, endTimestamp, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getArrayMetadata(namespace, array, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArrayMetadata(namespace, array, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getArrayMetadataCapnp(namespace, array, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArrayMetadataCapnp(namespace, array, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getArrayNonEmptyDomain(namespace, array, contentType, xPayer, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArrayNonEmptyDomain(namespace, array, contentType, xPayer, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getArrayNonEmptyDomainJson(namespace, array, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArrayNonEmptyDomainJson(namespace, array, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getArraySampleData(namespace, array, samples, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArraySampleData(namespace, array, samples, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getArraySharingPolicies(namespace, array, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArraySharingPolicies(namespace, array, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getArraysInNamespace(namespace, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArraysInNamespace(namespace, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getFragmentEndTimestamp(namespace, array, endTimestamp, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getFragmentEndTimestamp(namespace, array, endTimestamp, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getLastAccessedArrays(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getLastAccessedArrays(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async registerArray(namespace, array, arrayMetadata, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.registerArray(namespace, array, arrayMetadata, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async shareArray(namespace, array, arraySharing, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.shareArray(namespace, array, arraySharing, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateArrayMetadata(namespace, array, arrayMetadata, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateArrayMetadata(namespace, array, arrayMetadata, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateArrayMetadataCapnp(namespace, array, arrayMetadataEntries, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateArrayMetadataCapnp(namespace, array, arrayMetadataEntries, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async vacuumArray(namespace, array, tiledbConfig, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.vacuumArray(namespace, array, tiledbConfig, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var ArrayApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = ArrayApiFp(configuration);
  return {
    arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, options) {
      return localVarFp.arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, options).then((request) => request(axios2, basePath));
    },
    arraysBrowserOwnedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options) {
      return localVarFp.arraysBrowserOwnedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options).then((request) => request(axios2, basePath));
    },
    arraysBrowserOwnedSidebarGet(options) {
      return localVarFp.arraysBrowserOwnedSidebarGet(options).then((request) => request(axios2, basePath));
    },
    arraysBrowserPublicGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options) {
      return localVarFp.arraysBrowserPublicGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options).then((request) => request(axios2, basePath));
    },
    arraysBrowserPublicSidebarGet(options) {
      return localVarFp.arraysBrowserPublicSidebarGet(options).then((request) => request(axios2, basePath));
    },
    arraysBrowserSharedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options) {
      return localVarFp.arraysBrowserSharedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options).then((request) => request(axios2, basePath));
    },
    arraysBrowserSharedSidebarGet(options) {
      return localVarFp.arraysBrowserSharedSidebarGet(options).then((request) => request(axios2, basePath));
    },
    arraysNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options) {
      return localVarFp.arraysNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options).then((request) => request(axios2, basePath));
    },
    consolidateArray(namespace, array, tiledbConfig, options) {
      return localVarFp.consolidateArray(namespace, array, tiledbConfig, options).then((request) => request(axios2, basePath));
    },
    createArray(namespace, array, contentType, arraySchema, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
      return localVarFp.createArray(namespace, array, contentType, arraySchema, xTILEDBCLOUDACCESSCREDENTIALSNAME, options).then((request) => request(axios2, basePath));
    },
    deleteArray(namespace, array, contentType, options) {
      return localVarFp.deleteArray(namespace, array, contentType, options).then((request) => request(axios2, basePath));
    },
    deregisterArray(namespace, array, options) {
      return localVarFp.deregisterArray(namespace, array, options).then((request) => request(axios2, basePath));
    },
    getActivityLogById(namespace, array, id, options) {
      return localVarFp.getActivityLogById(namespace, array, id, options).then((request) => request(axios2, basePath));
    },
    getAllArrayMetadata(publicShare, options) {
      return localVarFp.getAllArrayMetadata(publicShare, options).then((request) => request(axios2, basePath));
    },
    getArray(namespace, array, contentType, options) {
      return localVarFp.getArray(namespace, array, contentType, options).then((request) => request(axios2, basePath));
    },
    getArrayMaxBufferSizes(namespace, array, subarray, contentType, xPayer, options) {
      return localVarFp.getArrayMaxBufferSizes(namespace, array, subarray, contentType, xPayer, options).then((request) => request(axios2, basePath));
    },
    getArrayMetaDataJson(namespace, array, length, endTimestamp, options) {
      return localVarFp.getArrayMetaDataJson(namespace, array, length, endTimestamp, options).then((request) => request(axios2, basePath));
    },
    getArrayMetadata(namespace, array, options) {
      return localVarFp.getArrayMetadata(namespace, array, options).then((request) => request(axios2, basePath));
    },
    getArrayMetadataCapnp(namespace, array, options) {
      return localVarFp.getArrayMetadataCapnp(namespace, array, options).then((request) => request(axios2, basePath));
    },
    getArrayNonEmptyDomain(namespace, array, contentType, xPayer, options) {
      return localVarFp.getArrayNonEmptyDomain(namespace, array, contentType, xPayer, options).then((request) => request(axios2, basePath));
    },
    getArrayNonEmptyDomainJson(namespace, array, options) {
      return localVarFp.getArrayNonEmptyDomainJson(namespace, array, options).then((request) => request(axios2, basePath));
    },
    getArraySampleData(namespace, array, samples, options) {
      return localVarFp.getArraySampleData(namespace, array, samples, options).then((request) => request(axios2, basePath));
    },
    getArraySharingPolicies(namespace, array, options) {
      return localVarFp.getArraySharingPolicies(namespace, array, options).then((request) => request(axios2, basePath));
    },
    getArraysInNamespace(namespace, options) {
      return localVarFp.getArraysInNamespace(namespace, options).then((request) => request(axios2, basePath));
    },
    getFragmentEndTimestamp(namespace, array, endTimestamp, options) {
      return localVarFp.getFragmentEndTimestamp(namespace, array, endTimestamp, options).then((request) => request(axios2, basePath));
    },
    getLastAccessedArrays(options) {
      return localVarFp.getLastAccessedArrays(options).then((request) => request(axios2, basePath));
    },
    registerArray(namespace, array, arrayMetadata, options) {
      return localVarFp.registerArray(namespace, array, arrayMetadata, options).then((request) => request(axios2, basePath));
    },
    shareArray(namespace, array, arraySharing, options) {
      return localVarFp.shareArray(namespace, array, arraySharing, options).then((request) => request(axios2, basePath));
    },
    updateArrayMetadata(namespace, array, arrayMetadata, options) {
      return localVarFp.updateArrayMetadata(namespace, array, arrayMetadata, options).then((request) => request(axios2, basePath));
    },
    updateArrayMetadataCapnp(namespace, array, arrayMetadataEntries, options) {
      return localVarFp.updateArrayMetadataCapnp(namespace, array, arrayMetadataEntries, options).then((request) => request(axios2, basePath));
    },
    vacuumArray(namespace, array, tiledbConfig, options) {
      return localVarFp.vacuumArray(namespace, array, tiledbConfig, options).then((request) => request(axios2, basePath));
    }
  };
};
var ArrayApi = class extends BaseAPI {
  arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, options) {
    return ArrayApiFp(this.configuration).arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, options).then((request) => request(this.axios, this.basePath));
  }
  arraysBrowserOwnedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options) {
    return ArrayApiFp(this.configuration).arraysBrowserOwnedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options).then((request) => request(this.axios, this.basePath));
  }
  arraysBrowserOwnedSidebarGet(options) {
    return ArrayApiFp(this.configuration).arraysBrowserOwnedSidebarGet(options).then((request) => request(this.axios, this.basePath));
  }
  arraysBrowserPublicGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options) {
    return ArrayApiFp(this.configuration).arraysBrowserPublicGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options).then((request) => request(this.axios, this.basePath));
  }
  arraysBrowserPublicSidebarGet(options) {
    return ArrayApiFp(this.configuration).arraysBrowserPublicSidebarGet(options).then((request) => request(this.axios, this.basePath));
  }
  arraysBrowserSharedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options) {
    return ArrayApiFp(this.configuration).arraysBrowserSharedGet(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, fileType, excludeFileType, fileProperty, options).then((request) => request(this.axios, this.basePath));
  }
  arraysBrowserSharedSidebarGet(options) {
    return ArrayApiFp(this.configuration).arraysBrowserSharedSidebarGet(options).then((request) => request(this.axios, this.basePath));
  }
  arraysNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options) {
    return ArrayApiFp(this.configuration).arraysNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
  consolidateArray(namespace, array, tiledbConfig, options) {
    return ArrayApiFp(this.configuration).consolidateArray(namespace, array, tiledbConfig, options).then((request) => request(this.axios, this.basePath));
  }
  createArray(namespace, array, contentType, arraySchema, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
    return ArrayApiFp(this.configuration).createArray(namespace, array, contentType, arraySchema, xTILEDBCLOUDACCESSCREDENTIALSNAME, options).then((request) => request(this.axios, this.basePath));
  }
  deleteArray(namespace, array, contentType, options) {
    return ArrayApiFp(this.configuration).deleteArray(namespace, array, contentType, options).then((request) => request(this.axios, this.basePath));
  }
  deregisterArray(namespace, array, options) {
    return ArrayApiFp(this.configuration).deregisterArray(namespace, array, options).then((request) => request(this.axios, this.basePath));
  }
  getActivityLogById(namespace, array, id, options) {
    return ArrayApiFp(this.configuration).getActivityLogById(namespace, array, id, options).then((request) => request(this.axios, this.basePath));
  }
  getAllArrayMetadata(publicShare, options) {
    return ArrayApiFp(this.configuration).getAllArrayMetadata(publicShare, options).then((request) => request(this.axios, this.basePath));
  }
  getArray(namespace, array, contentType, options) {
    return ArrayApiFp(this.configuration).getArray(namespace, array, contentType, options).then((request) => request(this.axios, this.basePath));
  }
  getArrayMaxBufferSizes(namespace, array, subarray, contentType, xPayer, options) {
    return ArrayApiFp(this.configuration).getArrayMaxBufferSizes(namespace, array, subarray, contentType, xPayer, options).then((request) => request(this.axios, this.basePath));
  }
  getArrayMetaDataJson(namespace, array, length, endTimestamp, options) {
    return ArrayApiFp(this.configuration).getArrayMetaDataJson(namespace, array, length, endTimestamp, options).then((request) => request(this.axios, this.basePath));
  }
  getArrayMetadata(namespace, array, options) {
    return ArrayApiFp(this.configuration).getArrayMetadata(namespace, array, options).then((request) => request(this.axios, this.basePath));
  }
  getArrayMetadataCapnp(namespace, array, options) {
    return ArrayApiFp(this.configuration).getArrayMetadataCapnp(namespace, array, options).then((request) => request(this.axios, this.basePath));
  }
  getArrayNonEmptyDomain(namespace, array, contentType, xPayer, options) {
    return ArrayApiFp(this.configuration).getArrayNonEmptyDomain(namespace, array, contentType, xPayer, options).then((request) => request(this.axios, this.basePath));
  }
  getArrayNonEmptyDomainJson(namespace, array, options) {
    return ArrayApiFp(this.configuration).getArrayNonEmptyDomainJson(namespace, array, options).then((request) => request(this.axios, this.basePath));
  }
  getArraySampleData(namespace, array, samples, options) {
    return ArrayApiFp(this.configuration).getArraySampleData(namespace, array, samples, options).then((request) => request(this.axios, this.basePath));
  }
  getArraySharingPolicies(namespace, array, options) {
    return ArrayApiFp(this.configuration).getArraySharingPolicies(namespace, array, options).then((request) => request(this.axios, this.basePath));
  }
  getArraysInNamespace(namespace, options) {
    return ArrayApiFp(this.configuration).getArraysInNamespace(namespace, options).then((request) => request(this.axios, this.basePath));
  }
  getFragmentEndTimestamp(namespace, array, endTimestamp, options) {
    return ArrayApiFp(this.configuration).getFragmentEndTimestamp(namespace, array, endTimestamp, options).then((request) => request(this.axios, this.basePath));
  }
  getLastAccessedArrays(options) {
    return ArrayApiFp(this.configuration).getLastAccessedArrays(options).then((request) => request(this.axios, this.basePath));
  }
  registerArray(namespace, array, arrayMetadata, options) {
    return ArrayApiFp(this.configuration).registerArray(namespace, array, arrayMetadata, options).then((request) => request(this.axios, this.basePath));
  }
  shareArray(namespace, array, arraySharing, options) {
    return ArrayApiFp(this.configuration).shareArray(namespace, array, arraySharing, options).then((request) => request(this.axios, this.basePath));
  }
  updateArrayMetadata(namespace, array, arrayMetadata, options) {
    return ArrayApiFp(this.configuration).updateArrayMetadata(namespace, array, arrayMetadata, options).then((request) => request(this.axios, this.basePath));
  }
  updateArrayMetadataCapnp(namespace, array, arrayMetadataEntries, options) {
    return ArrayApiFp(this.configuration).updateArrayMetadataCapnp(namespace, array, arrayMetadataEntries, options).then((request) => request(this.axios, this.basePath));
  }
  vacuumArray(namespace, array, tiledbConfig, options) {
    return ArrayApiFp(this.configuration).vacuumArray(namespace, array, tiledbConfig, options).then((request) => request(this.axios, this.basePath));
  }
};
var ArrayTasksApiAxiosParamCreator = function(configuration) {
  return {
    getArrayTasksSidebar: async (start, end, options = {}) => {
      const localVarPath = `/tasks/sidebar`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (start !== void 0) {
        localVarQueryParameter["start"] = start;
      }
      if (end !== void 0) {
        localVarQueryParameter["end"] = end;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var ArrayTasksApiFp = function(configuration) {
  const localVarAxiosParamCreator = ArrayTasksApiAxiosParamCreator(configuration);
  return {
    async getArrayTasksSidebar(start, end, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArrayTasksSidebar(start, end, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var ArrayTasksApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = ArrayTasksApiFp(configuration);
  return {
    getArrayTasksSidebar(start, end, options) {
      return localVarFp.getArrayTasksSidebar(start, end, options).then((request) => request(axios2, basePath));
    }
  };
};
var ArrayTasksApi = class extends BaseAPI {
  getArrayTasksSidebar(start, end, options) {
    return ArrayTasksApiFp(this.configuration).getArrayTasksSidebar(start, end, options).then((request) => request(this.axios, this.basePath));
  }
};
var FavoritesApiAxiosParamCreator = function(configuration) {
  return {
    addArrayFavorite: async (namespace, name, options = {}) => {
      assertParamExists("addArrayFavorite", "namespace", namespace);
      assertParamExists("addArrayFavorite", "name", name);
      const localVarPath = `/arrays/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    addMLModelFavorite: async (namespace, name, options = {}) => {
      assertParamExists("addMLModelFavorite", "namespace", namespace);
      assertParamExists("addMLModelFavorite", "name", name);
      const localVarPath = `/ml_models/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    addNotebookFavorite: async (namespace, name, options = {}) => {
      assertParamExists("addNotebookFavorite", "namespace", namespace);
      assertParamExists("addNotebookFavorite", "name", name);
      const localVarPath = `/notebooks/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    addUDFFavorite: async (namespace, name, options = {}) => {
      assertParamExists("addUDFFavorite", "namespace", namespace);
      assertParamExists("addUDFFavorite", "name", name);
      const localVarPath = `/udfs/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteArrayFavorite: async (namespace, name, options = {}) => {
      assertParamExists("deleteArrayFavorite", "namespace", namespace);
      assertParamExists("deleteArrayFavorite", "name", name);
      const localVarPath = `/arrays/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteMLModelFavorite: async (namespace, name, options = {}) => {
      assertParamExists("deleteMLModelFavorite", "namespace", namespace);
      assertParamExists("deleteMLModelFavorite", "name", name);
      const localVarPath = `/ml_models/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteNotebookFavorite: async (namespace, name, options = {}) => {
      assertParamExists("deleteNotebookFavorite", "namespace", namespace);
      assertParamExists("deleteNotebookFavorite", "name", name);
      const localVarPath = `/notebooks/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteUDFFavorite: async (namespace, name, options = {}) => {
      assertParamExists("deleteUDFFavorite", "namespace", namespace);
      assertParamExists("deleteUDFFavorite", "name", name);
      const localVarPath = `/udfs/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getArrayFavorite: async (namespace, name, options = {}) => {
      assertParamExists("getArrayFavorite", "namespace", namespace);
      assertParamExists("getArrayFavorite", "name", name);
      const localVarPath = `/arrays/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getMLModelFavorite: async (namespace, name, options = {}) => {
      assertParamExists("getMLModelFavorite", "namespace", namespace);
      assertParamExists("getMLModelFavorite", "name", name);
      const localVarPath = `/ml_models/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getNotebookFavorite: async (namespace, name, options = {}) => {
      assertParamExists("getNotebookFavorite", "namespace", namespace);
      assertParamExists("getNotebookFavorite", "name", name);
      const localVarPath = `/notebooks/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getUDFFavorite: async (namespace, name, options = {}) => {
      assertParamExists("getUDFFavorite", "namespace", namespace);
      assertParamExists("getUDFFavorite", "name", name);
      const localVarPath = `/udfs/favorites/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listArrayFavorites: async (page, perPage, options = {}) => {
      const localVarPath = `/arrays/favorites`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listArrayFavoritesUUIDs: async (options = {}) => {
      const localVarPath = `/arrays/favorites/uuids`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listMLModelFavorites: async (page, perPage, options = {}) => {
      const localVarPath = `/ml_models/favorites`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listMLModelFavoritesUUIDs: async (options = {}) => {
      const localVarPath = `/ml_models/favorites/uuids`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listNotebookFavorites: async (isDashboard, page, perPage, options = {}) => {
      const localVarPath = `/notebooks/favorites`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (isDashboard !== void 0) {
        localVarQueryParameter["is_dashboard"] = isDashboard;
      }
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listNotebookFavoritesUUIDs: async (options = {}) => {
      const localVarPath = `/notebooks/favorites/uuids`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listUDFFavorites: async (page, perPage, options = {}) => {
      const localVarPath = `/udfs/favorites`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listUDFFavoritesUUIDs: async (options = {}) => {
      const localVarPath = `/udfs/favorites/uuids`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var FavoritesApiFp = function(configuration) {
  const localVarAxiosParamCreator = FavoritesApiAxiosParamCreator(configuration);
  return {
    async addArrayFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addArrayFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async addMLModelFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addMLModelFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async addNotebookFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addNotebookFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async addUDFFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addUDFFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteArrayFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteArrayFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteMLModelFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteMLModelFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteNotebookFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteNotebookFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteUDFFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUDFFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getArrayFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getArrayFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getMLModelFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getMLModelFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getNotebookFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getNotebookFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getUDFFavorite(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getUDFFavorite(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listArrayFavorites(page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listArrayFavorites(page, perPage, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listArrayFavoritesUUIDs(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listArrayFavoritesUUIDs(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listMLModelFavorites(page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listMLModelFavorites(page, perPage, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listMLModelFavoritesUUIDs(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listMLModelFavoritesUUIDs(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listNotebookFavorites(isDashboard, page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listNotebookFavorites(isDashboard, page, perPage, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listNotebookFavoritesUUIDs(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listNotebookFavoritesUUIDs(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listUDFFavorites(page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listUDFFavorites(page, perPage, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listUDFFavoritesUUIDs(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listUDFFavoritesUUIDs(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var FavoritesApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = FavoritesApiFp(configuration);
  return {
    addArrayFavorite(namespace, name, options) {
      return localVarFp.addArrayFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    addMLModelFavorite(namespace, name, options) {
      return localVarFp.addMLModelFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    addNotebookFavorite(namespace, name, options) {
      return localVarFp.addNotebookFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    addUDFFavorite(namespace, name, options) {
      return localVarFp.addUDFFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    deleteArrayFavorite(namespace, name, options) {
      return localVarFp.deleteArrayFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    deleteMLModelFavorite(namespace, name, options) {
      return localVarFp.deleteMLModelFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    deleteNotebookFavorite(namespace, name, options) {
      return localVarFp.deleteNotebookFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    deleteUDFFavorite(namespace, name, options) {
      return localVarFp.deleteUDFFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    getArrayFavorite(namespace, name, options) {
      return localVarFp.getArrayFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    getMLModelFavorite(namespace, name, options) {
      return localVarFp.getMLModelFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    getNotebookFavorite(namespace, name, options) {
      return localVarFp.getNotebookFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    getUDFFavorite(namespace, name, options) {
      return localVarFp.getUDFFavorite(namespace, name, options).then((request) => request(axios2, basePath));
    },
    listArrayFavorites(page, perPage, options) {
      return localVarFp.listArrayFavorites(page, perPage, options).then((request) => request(axios2, basePath));
    },
    listArrayFavoritesUUIDs(options) {
      return localVarFp.listArrayFavoritesUUIDs(options).then((request) => request(axios2, basePath));
    },
    listMLModelFavorites(page, perPage, options) {
      return localVarFp.listMLModelFavorites(page, perPage, options).then((request) => request(axios2, basePath));
    },
    listMLModelFavoritesUUIDs(options) {
      return localVarFp.listMLModelFavoritesUUIDs(options).then((request) => request(axios2, basePath));
    },
    listNotebookFavorites(isDashboard, page, perPage, options) {
      return localVarFp.listNotebookFavorites(isDashboard, page, perPage, options).then((request) => request(axios2, basePath));
    },
    listNotebookFavoritesUUIDs(options) {
      return localVarFp.listNotebookFavoritesUUIDs(options).then((request) => request(axios2, basePath));
    },
    listUDFFavorites(page, perPage, options) {
      return localVarFp.listUDFFavorites(page, perPage, options).then((request) => request(axios2, basePath));
    },
    listUDFFavoritesUUIDs(options) {
      return localVarFp.listUDFFavoritesUUIDs(options).then((request) => request(axios2, basePath));
    }
  };
};
var FavoritesApi = class extends BaseAPI {
  addArrayFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).addArrayFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  addMLModelFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).addMLModelFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  addNotebookFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).addNotebookFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  addUDFFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).addUDFFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  deleteArrayFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).deleteArrayFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  deleteMLModelFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).deleteMLModelFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  deleteNotebookFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).deleteNotebookFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  deleteUDFFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).deleteUDFFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  getArrayFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).getArrayFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  getMLModelFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).getMLModelFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  getNotebookFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).getNotebookFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  getUDFFavorite(namespace, name, options) {
    return FavoritesApiFp(this.configuration).getUDFFavorite(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  listArrayFavorites(page, perPage, options) {
    return FavoritesApiFp(this.configuration).listArrayFavorites(page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
  listArrayFavoritesUUIDs(options) {
    return FavoritesApiFp(this.configuration).listArrayFavoritesUUIDs(options).then((request) => request(this.axios, this.basePath));
  }
  listMLModelFavorites(page, perPage, options) {
    return FavoritesApiFp(this.configuration).listMLModelFavorites(page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
  listMLModelFavoritesUUIDs(options) {
    return FavoritesApiFp(this.configuration).listMLModelFavoritesUUIDs(options).then((request) => request(this.axios, this.basePath));
  }
  listNotebookFavorites(isDashboard, page, perPage, options) {
    return FavoritesApiFp(this.configuration).listNotebookFavorites(isDashboard, page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
  listNotebookFavoritesUUIDs(options) {
    return FavoritesApiFp(this.configuration).listNotebookFavoritesUUIDs(options).then((request) => request(this.axios, this.basePath));
  }
  listUDFFavorites(page, perPage, options) {
    return FavoritesApiFp(this.configuration).listUDFFavorites(page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
  listUDFFavoritesUUIDs(options) {
    return FavoritesApiFp(this.configuration).listUDFFavoritesUUIDs(options).then((request) => request(this.axios, this.basePath));
  }
};
var FilesApiAxiosParamCreator = function(configuration) {
  return {
    handleCreateFile: async (namespace, fileCreate, xTILEDBCLOUDACCESSCREDENTIALSNAME, options = {}) => {
      assertParamExists("handleCreateFile", "namespace", namespace);
      assertParamExists("handleCreateFile", "fileCreate", fileCreate);
      const localVarPath = `/files/{namespace}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(fileCreate, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    handleExportFile: async (namespace, file, fileExport, options = {}) => {
      assertParamExists("handleExportFile", "namespace", namespace);
      assertParamExists("handleExportFile", "file", file);
      assertParamExists("handleExportFile", "fileExport", fileExport);
      const localVarPath = `/files/{namespace}/{file}/export`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"file"}}`, encodeURIComponent(String(file)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(fileExport, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    handleUploadFile: async (namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options = {}) => {
      assertParamExists("handleUploadFile", "namespace", namespace);
      assertParamExists("handleUploadFile", "inputFile", inputFile);
      const localVarPath = `/files/{namespace}/upload`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      if (inputFile !== void 0) {
        localVarFormParams.append("input_file", inputFile);
      }
      if (outputUri !== void 0) {
        localVarFormParams.append("output_uri", outputUri);
      }
      if (name !== void 0) {
        localVarFormParams.append("name", name);
      }
      localVarHeaderParameter["Content-Type"] = "multipart/form-data";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = localVarFormParams;
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var FilesApiFp = function(configuration) {
  const localVarAxiosParamCreator = FilesApiAxiosParamCreator(configuration);
  return {
    async handleCreateFile(namespace, fileCreate, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.handleCreateFile(namespace, fileCreate, xTILEDBCLOUDACCESSCREDENTIALSNAME, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async handleExportFile(namespace, file, fileExport, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.handleExportFile(namespace, file, fileExport, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async handleUploadFile(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.handleUploadFile(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var FilesApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = FilesApiFp(configuration);
  return {
    handleCreateFile(namespace, fileCreate, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
      return localVarFp.handleCreateFile(namespace, fileCreate, xTILEDBCLOUDACCESSCREDENTIALSNAME, options).then((request) => request(axios2, basePath));
    },
    handleExportFile(namespace, file, fileExport, options) {
      return localVarFp.handleExportFile(namespace, file, fileExport, options).then((request) => request(axios2, basePath));
    },
    handleUploadFile(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options) {
      return localVarFp.handleUploadFile(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options).then((request) => request(axios2, basePath));
    }
  };
};
var FilesApi = class extends BaseAPI {
  handleCreateFile(namespace, fileCreate, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
    return FilesApiFp(this.configuration).handleCreateFile(namespace, fileCreate, xTILEDBCLOUDACCESSCREDENTIALSNAME, options).then((request) => request(this.axios, this.basePath));
  }
  handleExportFile(namespace, file, fileExport, options) {
    return FilesApiFp(this.configuration).handleExportFile(namespace, file, fileExport, options).then((request) => request(this.axios, this.basePath));
  }
  handleUploadFile(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options) {
    return FilesApiFp(this.configuration).handleUploadFile(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options).then((request) => request(this.axios, this.basePath));
  }
};
var GroupsApiAxiosParamCreator = function(configuration) {
  return {
    changeGroupContents: async (groupNamespace, groupName, groupChanges, options = {}) => {
      assertParamExists("changeGroupContents", "groupNamespace", groupNamespace);
      assertParamExists("changeGroupContents", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}/contents`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(groupChanges, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    createGroup: async (namespace, groupCreate, options = {}) => {
      assertParamExists("createGroup", "namespace", namespace);
      const localVarPath = `/groups/{namespace}/create`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(groupCreate, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteGroup: async (groupNamespace, groupName, options = {}) => {
      assertParamExists("deleteGroup", "groupNamespace", groupNamespace);
      assertParamExists("deleteGroup", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getGroup: async (groupNamespace, groupName, options = {}) => {
      assertParamExists("getGroup", "groupNamespace", groupNamespace);
      assertParamExists("getGroup", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getGroupContents: async (groupNamespace, groupName, page, perPage, namespace, search, orderby, tag, excludeTag, memberType, excludeMemberType, options = {}) => {
      assertParamExists("getGroupContents", "groupNamespace", groupNamespace);
      assertParamExists("getGroupContents", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}/contents`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      if (namespace !== void 0) {
        localVarQueryParameter["namespace"] = namespace;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      if (orderby !== void 0) {
        localVarQueryParameter["orderby"] = orderby;
      }
      if (tag) {
        localVarQueryParameter["tag"] = tag;
      }
      if (excludeTag) {
        localVarQueryParameter["exclude_tag"] = excludeTag;
      }
      if (memberType) {
        localVarQueryParameter["member_type"] = memberType;
      }
      if (excludeMemberType) {
        localVarQueryParameter["exclude_member_type"] = excludeMemberType;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getGroupSharingPolicies: async (groupNamespace, groupName, options = {}) => {
      assertParamExists("getGroupSharingPolicies", "groupNamespace", groupNamespace);
      assertParamExists("getGroupSharingPolicies", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}/share`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    groupsBrowserOwnedFiltersGet: async (options = {}) => {
      const localVarPath = `/groups/browser/owned/filters`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    groupsBrowserPublicFiltersGet: async (options = {}) => {
      const localVarPath = `/groups/browser/public/filters`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    groupsBrowserSharedFiltersGet: async (options = {}) => {
      const localVarPath = `/groups/browser/shared/filters`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    groupsGroupNamespaceGroupNameContentsFiltersGet: async (groupNamespace, groupName, options = {}) => {
      assertParamExists("groupsGroupNamespaceGroupNameContentsFiltersGet", "groupNamespace", groupNamespace);
      assertParamExists("groupsGroupNamespaceGroupNameContentsFiltersGet", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}/contents/filters`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listOwnedGroups: async (page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options = {}) => {
      const localVarPath = `/groups/browser/owned`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      if (namespace !== void 0) {
        localVarQueryParameter["namespace"] = namespace;
      }
      if (orderby !== void 0) {
        localVarQueryParameter["orderby"] = orderby;
      }
      if (permissions !== void 0) {
        localVarQueryParameter["permissions"] = permissions;
      }
      if (tag) {
        localVarQueryParameter["tag"] = tag;
      }
      if (excludeTag) {
        localVarQueryParameter["exclude_tag"] = excludeTag;
      }
      if (flat !== void 0) {
        localVarQueryParameter["flat"] = flat;
      }
      if (parent !== void 0) {
        localVarQueryParameter["parent"] = parent;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listPublicGroups: async (page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options = {}) => {
      const localVarPath = `/groups/browser/public`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      if (namespace !== void 0) {
        localVarQueryParameter["namespace"] = namespace;
      }
      if (orderby !== void 0) {
        localVarQueryParameter["orderby"] = orderby;
      }
      if (permissions !== void 0) {
        localVarQueryParameter["permissions"] = permissions;
      }
      if (tag) {
        localVarQueryParameter["tag"] = tag;
      }
      if (excludeTag) {
        localVarQueryParameter["exclude_tag"] = excludeTag;
      }
      if (flat !== void 0) {
        localVarQueryParameter["flat"] = flat;
      }
      if (parent !== void 0) {
        localVarQueryParameter["parent"] = parent;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listSharedGroups: async (page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options = {}) => {
      const localVarPath = `/groups/browser/shared`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      if (namespace !== void 0) {
        localVarQueryParameter["namespace"] = namespace;
      }
      if (orderby !== void 0) {
        localVarQueryParameter["orderby"] = orderby;
      }
      if (permissions !== void 0) {
        localVarQueryParameter["permissions"] = permissions;
      }
      if (tag) {
        localVarQueryParameter["tag"] = tag;
      }
      if (excludeTag) {
        localVarQueryParameter["exclude_tag"] = excludeTag;
      }
      if (flat !== void 0) {
        localVarQueryParameter["flat"] = flat;
      }
      if (parent !== void 0) {
        localVarQueryParameter["parent"] = parent;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    registerGroup: async (namespace, array, groupRegister, options = {}) => {
      assertParamExists("registerGroup", "namespace", namespace);
      assertParamExists("registerGroup", "array", array);
      const localVarPath = `/groups/{namespace}/{array}/register`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(groupRegister, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    shareGroup: async (groupNamespace, groupName, groupSharingRequest, options = {}) => {
      assertParamExists("shareGroup", "groupNamespace", groupNamespace);
      assertParamExists("shareGroup", "groupName", groupName);
      assertParamExists("shareGroup", "groupSharingRequest", groupSharingRequest);
      const localVarPath = `/groups/{group_namespace}/{group_name}/share`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(groupSharingRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateGroup: async (groupNamespace, groupName, groupUpdate, options = {}) => {
      assertParamExists("updateGroup", "groupNamespace", groupNamespace);
      assertParamExists("updateGroup", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(groupUpdate, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var GroupsApiFp = function(configuration) {
  const localVarAxiosParamCreator = GroupsApiAxiosParamCreator(configuration);
  return {
    async changeGroupContents(groupNamespace, groupName, groupChanges, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.changeGroupContents(groupNamespace, groupName, groupChanges, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async createGroup(namespace, groupCreate, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.createGroup(namespace, groupCreate, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteGroup(groupNamespace, groupName, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteGroup(groupNamespace, groupName, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getGroup(groupNamespace, groupName, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getGroup(groupNamespace, groupName, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getGroupContents(groupNamespace, groupName, page, perPage, namespace, search, orderby, tag, excludeTag, memberType, excludeMemberType, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getGroupContents(groupNamespace, groupName, page, perPage, namespace, search, orderby, tag, excludeTag, memberType, excludeMemberType, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getGroupSharingPolicies(groupNamespace, groupName, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getGroupSharingPolicies(groupNamespace, groupName, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async groupsBrowserOwnedFiltersGet(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.groupsBrowserOwnedFiltersGet(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async groupsBrowserPublicFiltersGet(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.groupsBrowserPublicFiltersGet(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async groupsBrowserSharedFiltersGet(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.groupsBrowserSharedFiltersGet(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async groupsGroupNamespaceGroupNameContentsFiltersGet(groupNamespace, groupName, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.groupsGroupNamespaceGroupNameContentsFiltersGet(groupNamespace, groupName, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listOwnedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listOwnedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listPublicGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listPublicGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listSharedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listSharedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async registerGroup(namespace, array, groupRegister, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.registerGroup(namespace, array, groupRegister, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async shareGroup(groupNamespace, groupName, groupSharingRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.shareGroup(groupNamespace, groupName, groupSharingRequest, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateGroup(groupNamespace, groupName, groupUpdate, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateGroup(groupNamespace, groupName, groupUpdate, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var GroupsApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = GroupsApiFp(configuration);
  return {
    changeGroupContents(groupNamespace, groupName, groupChanges, options) {
      return localVarFp.changeGroupContents(groupNamespace, groupName, groupChanges, options).then((request) => request(axios2, basePath));
    },
    createGroup(namespace, groupCreate, options) {
      return localVarFp.createGroup(namespace, groupCreate, options).then((request) => request(axios2, basePath));
    },
    deleteGroup(groupNamespace, groupName, options) {
      return localVarFp.deleteGroup(groupNamespace, groupName, options).then((request) => request(axios2, basePath));
    },
    getGroup(groupNamespace, groupName, options) {
      return localVarFp.getGroup(groupNamespace, groupName, options).then((request) => request(axios2, basePath));
    },
    getGroupContents(groupNamespace, groupName, page, perPage, namespace, search, orderby, tag, excludeTag, memberType, excludeMemberType, options) {
      return localVarFp.getGroupContents(groupNamespace, groupName, page, perPage, namespace, search, orderby, tag, excludeTag, memberType, excludeMemberType, options).then((request) => request(axios2, basePath));
    },
    getGroupSharingPolicies(groupNamespace, groupName, options) {
      return localVarFp.getGroupSharingPolicies(groupNamespace, groupName, options).then((request) => request(axios2, basePath));
    },
    groupsBrowserOwnedFiltersGet(options) {
      return localVarFp.groupsBrowserOwnedFiltersGet(options).then((request) => request(axios2, basePath));
    },
    groupsBrowserPublicFiltersGet(options) {
      return localVarFp.groupsBrowserPublicFiltersGet(options).then((request) => request(axios2, basePath));
    },
    groupsBrowserSharedFiltersGet(options) {
      return localVarFp.groupsBrowserSharedFiltersGet(options).then((request) => request(axios2, basePath));
    },
    groupsGroupNamespaceGroupNameContentsFiltersGet(groupNamespace, groupName, options) {
      return localVarFp.groupsGroupNamespaceGroupNameContentsFiltersGet(groupNamespace, groupName, options).then((request) => request(axios2, basePath));
    },
    listOwnedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options) {
      return localVarFp.listOwnedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options).then((request) => request(axios2, basePath));
    },
    listPublicGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options) {
      return localVarFp.listPublicGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options).then((request) => request(axios2, basePath));
    },
    listSharedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options) {
      return localVarFp.listSharedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options).then((request) => request(axios2, basePath));
    },
    registerGroup(namespace, array, groupRegister, options) {
      return localVarFp.registerGroup(namespace, array, groupRegister, options).then((request) => request(axios2, basePath));
    },
    shareGroup(groupNamespace, groupName, groupSharingRequest, options) {
      return localVarFp.shareGroup(groupNamespace, groupName, groupSharingRequest, options).then((request) => request(axios2, basePath));
    },
    updateGroup(groupNamespace, groupName, groupUpdate, options) {
      return localVarFp.updateGroup(groupNamespace, groupName, groupUpdate, options).then((request) => request(axios2, basePath));
    }
  };
};
var GroupsApi = class extends BaseAPI {
  changeGroupContents(groupNamespace, groupName, groupChanges, options) {
    return GroupsApiFp(this.configuration).changeGroupContents(groupNamespace, groupName, groupChanges, options).then((request) => request(this.axios, this.basePath));
  }
  createGroup(namespace, groupCreate, options) {
    return GroupsApiFp(this.configuration).createGroup(namespace, groupCreate, options).then((request) => request(this.axios, this.basePath));
  }
  deleteGroup(groupNamespace, groupName, options) {
    return GroupsApiFp(this.configuration).deleteGroup(groupNamespace, groupName, options).then((request) => request(this.axios, this.basePath));
  }
  getGroup(groupNamespace, groupName, options) {
    return GroupsApiFp(this.configuration).getGroup(groupNamespace, groupName, options).then((request) => request(this.axios, this.basePath));
  }
  getGroupContents(groupNamespace, groupName, page, perPage, namespace, search, orderby, tag, excludeTag, memberType, excludeMemberType, options) {
    return GroupsApiFp(this.configuration).getGroupContents(groupNamespace, groupName, page, perPage, namespace, search, orderby, tag, excludeTag, memberType, excludeMemberType, options).then((request) => request(this.axios, this.basePath));
  }
  getGroupSharingPolicies(groupNamespace, groupName, options) {
    return GroupsApiFp(this.configuration).getGroupSharingPolicies(groupNamespace, groupName, options).then((request) => request(this.axios, this.basePath));
  }
  groupsBrowserOwnedFiltersGet(options) {
    return GroupsApiFp(this.configuration).groupsBrowserOwnedFiltersGet(options).then((request) => request(this.axios, this.basePath));
  }
  groupsBrowserPublicFiltersGet(options) {
    return GroupsApiFp(this.configuration).groupsBrowserPublicFiltersGet(options).then((request) => request(this.axios, this.basePath));
  }
  groupsBrowserSharedFiltersGet(options) {
    return GroupsApiFp(this.configuration).groupsBrowserSharedFiltersGet(options).then((request) => request(this.axios, this.basePath));
  }
  groupsGroupNamespaceGroupNameContentsFiltersGet(groupNamespace, groupName, options) {
    return GroupsApiFp(this.configuration).groupsGroupNamespaceGroupNameContentsFiltersGet(groupNamespace, groupName, options).then((request) => request(this.axios, this.basePath));
  }
  listOwnedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options) {
    return GroupsApiFp(this.configuration).listOwnedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options).then((request) => request(this.axios, this.basePath));
  }
  listPublicGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options) {
    return GroupsApiFp(this.configuration).listPublicGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options).then((request) => request(this.axios, this.basePath));
  }
  listSharedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options) {
    return GroupsApiFp(this.configuration).listSharedGroups(page, perPage, search, namespace, orderby, permissions, tag, excludeTag, flat, parent, options).then((request) => request(this.axios, this.basePath));
  }
  registerGroup(namespace, array, groupRegister, options) {
    return GroupsApiFp(this.configuration).registerGroup(namespace, array, groupRegister, options).then((request) => request(this.axios, this.basePath));
  }
  shareGroup(groupNamespace, groupName, groupSharingRequest, options) {
    return GroupsApiFp(this.configuration).shareGroup(groupNamespace, groupName, groupSharingRequest, options).then((request) => request(this.axios, this.basePath));
  }
  updateGroup(groupNamespace, groupName, groupUpdate, options) {
    return GroupsApiFp(this.configuration).updateGroup(groupNamespace, groupName, groupUpdate, options).then((request) => request(this.axios, this.basePath));
  }
};
var InvitationApiAxiosParamCreator = function(configuration) {
  return {
    acceptInvitation: async (invitation, options = {}) => {
      assertParamExists("acceptInvitation", "invitation", invitation);
      const localVarPath = `/invitations/{invitation}`.replace(`{${"invitation"}}`, encodeURIComponent(String(invitation)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    cancelJoinOrganization: async (invitation, organization, options = {}) => {
      assertParamExists("cancelJoinOrganization", "invitation", invitation);
      assertParamExists("cancelJoinOrganization", "organization", organization);
      const localVarPath = `/invitations/{invitation}/{organization}/join`.replace(`{${"invitation"}}`, encodeURIComponent(String(invitation))).replace(`{${"organization"}}`, encodeURIComponent(String(organization)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    cancelShareArrayByInvite: async (namespace, invitation, array, options = {}) => {
      assertParamExists("cancelShareArrayByInvite", "namespace", namespace);
      assertParamExists("cancelShareArrayByInvite", "invitation", invitation);
      assertParamExists("cancelShareArrayByInvite", "array", array);
      const localVarPath = `/invitations/{invitation}/{namespace}/{array}/share`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"invitation"}}`, encodeURIComponent(String(invitation))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    fetchInvitations: async (organization, array, start, end, page, perPage, type2, status, orderby, options = {}) => {
      const localVarPath = `/invitations`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (organization !== void 0) {
        localVarQueryParameter["organization"] = organization;
      }
      if (array !== void 0) {
        localVarQueryParameter["array"] = array;
      }
      if (start !== void 0) {
        localVarQueryParameter["start"] = start;
      }
      if (end !== void 0) {
        localVarQueryParameter["end"] = end;
      }
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      if (type2 !== void 0) {
        localVarQueryParameter["type"] = type2;
      }
      if (status !== void 0) {
        localVarQueryParameter["status"] = status;
      }
      if (orderby !== void 0) {
        localVarQueryParameter["orderby"] = orderby;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    joinOrganization: async (organization, emailInvite, options = {}) => {
      assertParamExists("joinOrganization", "organization", organization);
      assertParamExists("joinOrganization", "emailInvite", emailInvite);
      const localVarPath = `/invitations/{organization}/join`.replace(`{${"organization"}}`, encodeURIComponent(String(organization)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(emailInvite, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    shareArrayByInvite: async (namespace, array, emailInvite, options = {}) => {
      assertParamExists("shareArrayByInvite", "namespace", namespace);
      assertParamExists("shareArrayByInvite", "array", array);
      assertParamExists("shareArrayByInvite", "emailInvite", emailInvite);
      const localVarPath = `/invitations/{namespace}/{array}/share`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(emailInvite, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var InvitationApiFp = function(configuration) {
  const localVarAxiosParamCreator = InvitationApiAxiosParamCreator(configuration);
  return {
    async acceptInvitation(invitation, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.acceptInvitation(invitation, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async cancelJoinOrganization(invitation, organization, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.cancelJoinOrganization(invitation, organization, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async cancelShareArrayByInvite(namespace, invitation, array, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.cancelShareArrayByInvite(namespace, invitation, array, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async fetchInvitations(organization, array, start, end, page, perPage, type2, status, orderby, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.fetchInvitations(organization, array, start, end, page, perPage, type2, status, orderby, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async joinOrganization(organization, emailInvite, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.joinOrganization(organization, emailInvite, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async shareArrayByInvite(namespace, array, emailInvite, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.shareArrayByInvite(namespace, array, emailInvite, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var InvitationApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = InvitationApiFp(configuration);
  return {
    acceptInvitation(invitation, options) {
      return localVarFp.acceptInvitation(invitation, options).then((request) => request(axios2, basePath));
    },
    cancelJoinOrganization(invitation, organization, options) {
      return localVarFp.cancelJoinOrganization(invitation, organization, options).then((request) => request(axios2, basePath));
    },
    cancelShareArrayByInvite(namespace, invitation, array, options) {
      return localVarFp.cancelShareArrayByInvite(namespace, invitation, array, options).then((request) => request(axios2, basePath));
    },
    fetchInvitations(organization, array, start, end, page, perPage, type2, status, orderby, options) {
      return localVarFp.fetchInvitations(organization, array, start, end, page, perPage, type2, status, orderby, options).then((request) => request(axios2, basePath));
    },
    joinOrganization(organization, emailInvite, options) {
      return localVarFp.joinOrganization(organization, emailInvite, options).then((request) => request(axios2, basePath));
    },
    shareArrayByInvite(namespace, array, emailInvite, options) {
      return localVarFp.shareArrayByInvite(namespace, array, emailInvite, options).then((request) => request(axios2, basePath));
    }
  };
};
var InvitationApi = class extends BaseAPI {
  acceptInvitation(invitation, options) {
    return InvitationApiFp(this.configuration).acceptInvitation(invitation, options).then((request) => request(this.axios, this.basePath));
  }
  cancelJoinOrganization(invitation, organization, options) {
    return InvitationApiFp(this.configuration).cancelJoinOrganization(invitation, organization, options).then((request) => request(this.axios, this.basePath));
  }
  cancelShareArrayByInvite(namespace, invitation, array, options) {
    return InvitationApiFp(this.configuration).cancelShareArrayByInvite(namespace, invitation, array, options).then((request) => request(this.axios, this.basePath));
  }
  fetchInvitations(organization, array, start, end, page, perPage, type2, status, orderby, options) {
    return InvitationApiFp(this.configuration).fetchInvitations(organization, array, start, end, page, perPage, type2, status, orderby, options).then((request) => request(this.axios, this.basePath));
  }
  joinOrganization(organization, emailInvite, options) {
    return InvitationApiFp(this.configuration).joinOrganization(organization, emailInvite, options).then((request) => request(this.axios, this.basePath));
  }
  shareArrayByInvite(namespace, array, emailInvite, options) {
    return InvitationApiFp(this.configuration).shareArrayByInvite(namespace, array, emailInvite, options).then((request) => request(this.axios, this.basePath));
  }
};
var NotebookApiAxiosParamCreator = function(configuration) {
  return {
    getNotebookServerStatus: async (namespace, options = {}) => {
      assertParamExists("getNotebookServerStatus", "namespace", namespace);
      const localVarPath = `/notebooks/server/{namespace}/status`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    handleCopyNotebook: async (namespace, array, notebookCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options = {}) => {
      assertParamExists("handleCopyNotebook", "namespace", namespace);
      assertParamExists("handleCopyNotebook", "array", array);
      assertParamExists("handleCopyNotebook", "notebookCopy", notebookCopy);
      const localVarPath = `/notebooks/{namespace}/{array}/copy`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (endTimestamp !== void 0) {
        localVarQueryParameter["end_timestamp"] = endTimestamp;
      }
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(notebookCopy, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    handleUploadNotebook: async (namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options = {}) => {
      assertParamExists("handleUploadNotebook", "namespace", namespace);
      assertParamExists("handleUploadNotebook", "inputFile", inputFile);
      const localVarPath = `/notebooks/{namespace}/upload`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      const localVarFormParams = new (configuration && configuration.formDataCtor || FormData)();
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      if (inputFile !== void 0) {
        localVarFormParams.append("input_file", inputFile);
      }
      if (outputUri !== void 0) {
        localVarFormParams.append("output_uri", outputUri);
      }
      if (name !== void 0) {
        localVarFormParams.append("name", name);
      }
      localVarHeaderParameter["Content-Type"] = "multipart/form-data";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = localVarFormParams;
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    shutdownNotebookServer: async (namespace, options = {}) => {
      assertParamExists("shutdownNotebookServer", "namespace", namespace);
      const localVarPath = `/notebooks/server/{namespace}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateNotebookName: async (namespace, array, notebookMetadata, options = {}) => {
      assertParamExists("updateNotebookName", "namespace", namespace);
      assertParamExists("updateNotebookName", "array", array);
      assertParamExists("updateNotebookName", "notebookMetadata", notebookMetadata);
      const localVarPath = `/notebooks/{namespace}/{array}/rename`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(notebookMetadata, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var NotebookApiFp = function(configuration) {
  const localVarAxiosParamCreator = NotebookApiAxiosParamCreator(configuration);
  return {
    async getNotebookServerStatus(namespace, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getNotebookServerStatus(namespace, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async handleCopyNotebook(namespace, array, notebookCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.handleCopyNotebook(namespace, array, notebookCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async handleUploadNotebook(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.handleUploadNotebook(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async shutdownNotebookServer(namespace, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.shutdownNotebookServer(namespace, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateNotebookName(namespace, array, notebookMetadata, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateNotebookName(namespace, array, notebookMetadata, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var NotebookApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = NotebookApiFp(configuration);
  return {
    getNotebookServerStatus(namespace, options) {
      return localVarFp.getNotebookServerStatus(namespace, options).then((request) => request(axios2, basePath));
    },
    handleCopyNotebook(namespace, array, notebookCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options) {
      return localVarFp.handleCopyNotebook(namespace, array, notebookCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options).then((request) => request(axios2, basePath));
    },
    handleUploadNotebook(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options) {
      return localVarFp.handleUploadNotebook(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options).then((request) => request(axios2, basePath));
    },
    shutdownNotebookServer(namespace, options) {
      return localVarFp.shutdownNotebookServer(namespace, options).then((request) => request(axios2, basePath));
    },
    updateNotebookName(namespace, array, notebookMetadata, options) {
      return localVarFp.updateNotebookName(namespace, array, notebookMetadata, options).then((request) => request(axios2, basePath));
    }
  };
};
var NotebookApi = class extends BaseAPI {
  getNotebookServerStatus(namespace, options) {
    return NotebookApiFp(this.configuration).getNotebookServerStatus(namespace, options).then((request) => request(this.axios, this.basePath));
  }
  handleCopyNotebook(namespace, array, notebookCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options) {
    return NotebookApiFp(this.configuration).handleCopyNotebook(namespace, array, notebookCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options).then((request) => request(this.axios, this.basePath));
  }
  handleUploadNotebook(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options) {
    return NotebookApiFp(this.configuration).handleUploadNotebook(namespace, inputFile, xTILEDBCLOUDACCESSCREDENTIALSNAME, outputUri, name, options).then((request) => request(this.axios, this.basePath));
  }
  shutdownNotebookServer(namespace, options) {
    return NotebookApiFp(this.configuration).shutdownNotebookServer(namespace, options).then((request) => request(this.axios, this.basePath));
  }
  updateNotebookName(namespace, array, notebookMetadata, options) {
    return NotebookApiFp(this.configuration).updateNotebookName(namespace, array, notebookMetadata, options).then((request) => request(this.axios, this.basePath));
  }
};
var NotebooksApiAxiosParamCreator = function(configuration) {
  return {
    notebooksNamespaceArrayEndTimestampsGet: async (namespace, array, page, perPage, options = {}) => {
      assertParamExists("notebooksNamespaceArrayEndTimestampsGet", "namespace", namespace);
      assertParamExists("notebooksNamespaceArrayEndTimestampsGet", "array", array);
      const localVarPath = `/notebooks/{namespace}/{array}/end_timestamps`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var NotebooksApiFp = function(configuration) {
  const localVarAxiosParamCreator = NotebooksApiAxiosParamCreator(configuration);
  return {
    async notebooksNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.notebooksNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var NotebooksApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = NotebooksApiFp(configuration);
  return {
    notebooksNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options) {
      return localVarFp.notebooksNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options).then((request) => request(axios2, basePath));
    }
  };
};
var NotebooksApi = class extends BaseAPI {
  notebooksNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options) {
    return NotebooksApiFp(this.configuration).notebooksNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
};
var OrganizationApiAxiosParamCreator = function(configuration) {
  return {
    addAWSAccessCredentials: async (namespace, awsAccessCredentials, options = {}) => {
      assertParamExists("addAWSAccessCredentials", "namespace", namespace);
      assertParamExists("addAWSAccessCredentials", "awsAccessCredentials", awsAccessCredentials);
      const localVarPath = `/credentials/{namespace}/aws`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(awsAccessCredentials, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    addUserToOrganization: async (organization, user, options = {}) => {
      assertParamExists("addUserToOrganization", "organization", organization);
      assertParamExists("addUserToOrganization", "user", user);
      const localVarPath = `/organizations/{organization}/user`.replace(`{${"organization"}}`, encodeURIComponent(String(organization)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    checkAWSAccessCredentials: async (namespace, options = {}) => {
      assertParamExists("checkAWSAccessCredentials", "namespace", namespace);
      const localVarPath = `/credentials/{namespace}/aws`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    checkAWSAccessCredentialsByName: async (namespace, name, options = {}) => {
      assertParamExists("checkAWSAccessCredentialsByName", "namespace", namespace);
      assertParamExists("checkAWSAccessCredentialsByName", "name", name);
      const localVarPath = `/credentials/{namespace}/aws/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    createOrganization: async (organization, options = {}) => {
      assertParamExists("createOrganization", "organization", organization);
      const localVarPath = `/organization`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(organization, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteAWSAccessCredentials: async (namespace, name, options = {}) => {
      assertParamExists("deleteAWSAccessCredentials", "namespace", namespace);
      assertParamExists("deleteAWSAccessCredentials", "name", name);
      const localVarPath = `/credentials/{namespace}/aws/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteOrganization: async (organization, options = {}) => {
      assertParamExists("deleteOrganization", "organization", organization);
      const localVarPath = `/organizations/{organization}`.replace(`{${"organization"}}`, encodeURIComponent(String(organization)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteUserFromOrganization: async (organization, username, options = {}) => {
      assertParamExists("deleteUserFromOrganization", "organization", organization);
      assertParamExists("deleteUserFromOrganization", "username", username);
      const localVarPath = `/organizations/{organization}/{username}`.replace(`{${"organization"}}`, encodeURIComponent(String(organization))).replace(`{${"username"}}`, encodeURIComponent(String(username)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getAllOrganizations: async (options = {}) => {
      const localVarPath = `/organizations`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getOrganization: async (organization, options = {}) => {
      assertParamExists("getOrganization", "organization", organization);
      const localVarPath = `/organizations/{organization}`.replace(`{${"organization"}}`, encodeURIComponent(String(organization)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getOrganizationUser: async (organization, username, options = {}) => {
      assertParamExists("getOrganizationUser", "organization", organization);
      assertParamExists("getOrganizationUser", "username", username);
      const localVarPath = `/organizations/{organization}/{username}`.replace(`{${"organization"}}`, encodeURIComponent(String(organization))).replace(`{${"username"}}`, encodeURIComponent(String(username)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateAWSAccessCredentials: async (namespace, name, awsAccessCredentials, options = {}) => {
      assertParamExists("updateAWSAccessCredentials", "namespace", namespace);
      assertParamExists("updateAWSAccessCredentials", "name", name);
      assertParamExists("updateAWSAccessCredentials", "awsAccessCredentials", awsAccessCredentials);
      const localVarPath = `/credentials/{namespace}/aws/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(awsAccessCredentials, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateOrganization: async (organization, organizationDetails, options = {}) => {
      assertParamExists("updateOrganization", "organization", organization);
      assertParamExists("updateOrganization", "organizationDetails", organizationDetails);
      const localVarPath = `/organizations/{organization}`.replace(`{${"organization"}}`, encodeURIComponent(String(organization)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(organizationDetails, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateUserInOrganization: async (organization, username, user, options = {}) => {
      assertParamExists("updateUserInOrganization", "organization", organization);
      assertParamExists("updateUserInOrganization", "username", username);
      assertParamExists("updateUserInOrganization", "user", user);
      const localVarPath = `/organizations/{organization}/{username}`.replace(`{${"organization"}}`, encodeURIComponent(String(organization))).replace(`{${"username"}}`, encodeURIComponent(String(username)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var OrganizationApiFp = function(configuration) {
  const localVarAxiosParamCreator = OrganizationApiAxiosParamCreator(configuration);
  return {
    async addAWSAccessCredentials(namespace, awsAccessCredentials, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addAWSAccessCredentials(namespace, awsAccessCredentials, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async addUserToOrganization(organization, user, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addUserToOrganization(organization, user, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async checkAWSAccessCredentials(namespace, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.checkAWSAccessCredentials(namespace, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async checkAWSAccessCredentialsByName(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.checkAWSAccessCredentialsByName(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async createOrganization(organization, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.createOrganization(organization, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteAWSAccessCredentials(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteAWSAccessCredentials(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteOrganization(organization, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteOrganization(organization, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteUserFromOrganization(organization, username, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUserFromOrganization(organization, username, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getAllOrganizations(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getAllOrganizations(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getOrganization(organization, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getOrganization(organization, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getOrganizationUser(organization, username, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getOrganizationUser(organization, username, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateOrganization(organization, organizationDetails, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateOrganization(organization, organizationDetails, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateUserInOrganization(organization, username, user, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateUserInOrganization(organization, username, user, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var OrganizationApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = OrganizationApiFp(configuration);
  return {
    addAWSAccessCredentials(namespace, awsAccessCredentials, options) {
      return localVarFp.addAWSAccessCredentials(namespace, awsAccessCredentials, options).then((request) => request(axios2, basePath));
    },
    addUserToOrganization(organization, user, options) {
      return localVarFp.addUserToOrganization(organization, user, options).then((request) => request(axios2, basePath));
    },
    checkAWSAccessCredentials(namespace, options) {
      return localVarFp.checkAWSAccessCredentials(namespace, options).then((request) => request(axios2, basePath));
    },
    checkAWSAccessCredentialsByName(namespace, name, options) {
      return localVarFp.checkAWSAccessCredentialsByName(namespace, name, options).then((request) => request(axios2, basePath));
    },
    createOrganization(organization, options) {
      return localVarFp.createOrganization(organization, options).then((request) => request(axios2, basePath));
    },
    deleteAWSAccessCredentials(namespace, name, options) {
      return localVarFp.deleteAWSAccessCredentials(namespace, name, options).then((request) => request(axios2, basePath));
    },
    deleteOrganization(organization, options) {
      return localVarFp.deleteOrganization(organization, options).then((request) => request(axios2, basePath));
    },
    deleteUserFromOrganization(organization, username, options) {
      return localVarFp.deleteUserFromOrganization(organization, username, options).then((request) => request(axios2, basePath));
    },
    getAllOrganizations(options) {
      return localVarFp.getAllOrganizations(options).then((request) => request(axios2, basePath));
    },
    getOrganization(organization, options) {
      return localVarFp.getOrganization(organization, options).then((request) => request(axios2, basePath));
    },
    getOrganizationUser(organization, username, options) {
      return localVarFp.getOrganizationUser(organization, username, options).then((request) => request(axios2, basePath));
    },
    updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options) {
      return localVarFp.updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options).then((request) => request(axios2, basePath));
    },
    updateOrganization(organization, organizationDetails, options) {
      return localVarFp.updateOrganization(organization, organizationDetails, options).then((request) => request(axios2, basePath));
    },
    updateUserInOrganization(organization, username, user, options) {
      return localVarFp.updateUserInOrganization(organization, username, user, options).then((request) => request(axios2, basePath));
    }
  };
};
var OrganizationApi = class extends BaseAPI {
  addAWSAccessCredentials(namespace, awsAccessCredentials, options) {
    return OrganizationApiFp(this.configuration).addAWSAccessCredentials(namespace, awsAccessCredentials, options).then((request) => request(this.axios, this.basePath));
  }
  addUserToOrganization(organization, user, options) {
    return OrganizationApiFp(this.configuration).addUserToOrganization(organization, user, options).then((request) => request(this.axios, this.basePath));
  }
  checkAWSAccessCredentials(namespace, options) {
    return OrganizationApiFp(this.configuration).checkAWSAccessCredentials(namespace, options).then((request) => request(this.axios, this.basePath));
  }
  checkAWSAccessCredentialsByName(namespace, name, options) {
    return OrganizationApiFp(this.configuration).checkAWSAccessCredentialsByName(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  createOrganization(organization, options) {
    return OrganizationApiFp(this.configuration).createOrganization(organization, options).then((request) => request(this.axios, this.basePath));
  }
  deleteAWSAccessCredentials(namespace, name, options) {
    return OrganizationApiFp(this.configuration).deleteAWSAccessCredentials(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  deleteOrganization(organization, options) {
    return OrganizationApiFp(this.configuration).deleteOrganization(organization, options).then((request) => request(this.axios, this.basePath));
  }
  deleteUserFromOrganization(organization, username, options) {
    return OrganizationApiFp(this.configuration).deleteUserFromOrganization(organization, username, options).then((request) => request(this.axios, this.basePath));
  }
  getAllOrganizations(options) {
    return OrganizationApiFp(this.configuration).getAllOrganizations(options).then((request) => request(this.axios, this.basePath));
  }
  getOrganization(organization, options) {
    return OrganizationApiFp(this.configuration).getOrganization(organization, options).then((request) => request(this.axios, this.basePath));
  }
  getOrganizationUser(organization, username, options) {
    return OrganizationApiFp(this.configuration).getOrganizationUser(organization, username, options).then((request) => request(this.axios, this.basePath));
  }
  updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options) {
    return OrganizationApiFp(this.configuration).updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options).then((request) => request(this.axios, this.basePath));
  }
  updateOrganization(organization, organizationDetails, options) {
    return OrganizationApiFp(this.configuration).updateOrganization(organization, organizationDetails, options).then((request) => request(this.axios, this.basePath));
  }
  updateUserInOrganization(organization, username, user, options) {
    return OrganizationApiFp(this.configuration).updateUserInOrganization(organization, username, user, options).then((request) => request(this.axios, this.basePath));
  }
};
var QueryApiAxiosParamCreator = function(configuration) {
  return {
    finalizeQuery: async (namespace, array, type2, contentType, query, xPayer, openAt, options = {}) => {
      assertParamExists("finalizeQuery", "namespace", namespace);
      assertParamExists("finalizeQuery", "array", array);
      assertParamExists("finalizeQuery", "type", type2);
      assertParamExists("finalizeQuery", "contentType", contentType);
      assertParamExists("finalizeQuery", "query", query);
      const localVarPath = `/arrays/{namespace}/{array}/query/finalize`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (type2 !== void 0) {
        localVarQueryParameter["type"] = type2;
      }
      if (openAt !== void 0) {
        localVarQueryParameter["open_at"] = openAt;
      }
      if (contentType !== void 0 && contentType !== null) {
        localVarHeaderParameter["Content-Type"] = String(contentType);
      }
      if (xPayer !== void 0 && xPayer !== null) {
        localVarHeaderParameter["X-Payer"] = String(xPayer);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(query, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getEstResultSizes: async (namespace, array, type2, contentType, query, xPayer, openAt, options = {}) => {
      assertParamExists("getEstResultSizes", "namespace", namespace);
      assertParamExists("getEstResultSizes", "array", array);
      assertParamExists("getEstResultSizes", "type", type2);
      assertParamExists("getEstResultSizes", "contentType", contentType);
      assertParamExists("getEstResultSizes", "query", query);
      const localVarPath = `/arrays/{namespace}/{array}/query/est_result_sizes`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (type2 !== void 0) {
        localVarQueryParameter["type"] = type2;
      }
      if (openAt !== void 0) {
        localVarQueryParameter["open_at"] = openAt;
      }
      if (contentType !== void 0 && contentType !== null) {
        localVarHeaderParameter["Content-Type"] = String(contentType);
      }
      if (xPayer !== void 0 && xPayer !== null) {
        localVarHeaderParameter["X-Payer"] = String(xPayer);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(query, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getFile: async (namespace, array, contentType, xPayer, options = {}) => {
      assertParamExists("getFile", "namespace", namespace);
      assertParamExists("getFile", "array", array);
      assertParamExists("getFile", "contentType", contentType);
      const localVarPath = `/arrays/{namespace}/{array}/query/get_file`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (contentType !== void 0 && contentType !== null) {
        localVarHeaderParameter["Content-Type"] = String(contentType);
      }
      if (xPayer !== void 0 && xPayer !== null) {
        localVarHeaderParameter["X-Payer"] = String(xPayer);
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    submitQuery: async (namespace, array, type2, contentType, query, xPayer, openAt, options = {}) => {
      assertParamExists("submitQuery", "namespace", namespace);
      assertParamExists("submitQuery", "array", array);
      assertParamExists("submitQuery", "type", type2);
      assertParamExists("submitQuery", "contentType", contentType);
      assertParamExists("submitQuery", "query", query);
      const localVarPath = `/arrays/{namespace}/{array}/query/submit`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (type2 !== void 0) {
        localVarQueryParameter["type"] = type2;
      }
      if (openAt !== void 0) {
        localVarQueryParameter["open_at"] = openAt;
      }
      if (contentType !== void 0 && contentType !== null) {
        localVarHeaderParameter["Content-Type"] = String(contentType);
      }
      if (xPayer !== void 0 && xPayer !== null) {
        localVarHeaderParameter["X-Payer"] = String(xPayer);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(query, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    submitQueryJson: async (namespace, array, contentType, queryJson, xPayer, options = {}) => {
      assertParamExists("submitQueryJson", "namespace", namespace);
      assertParamExists("submitQueryJson", "array", array);
      assertParamExists("submitQueryJson", "contentType", contentType);
      assertParamExists("submitQueryJson", "queryJson", queryJson);
      const localVarPath = `/arrays/{namespace}/{array}/query/submit_query_json`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (contentType !== void 0 && contentType !== null) {
        localVarHeaderParameter["Content-Type"] = String(contentType);
      }
      if (xPayer !== void 0 && xPayer !== null) {
        localVarHeaderParameter["X-Payer"] = String(xPayer);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(queryJson, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var QueryApiFp = function(configuration) {
  const localVarAxiosParamCreator = QueryApiAxiosParamCreator(configuration);
  return {
    async finalizeQuery(namespace, array, type2, contentType, query, xPayer, openAt, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.finalizeQuery(namespace, array, type2, contentType, query, xPayer, openAt, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getEstResultSizes(namespace, array, type2, contentType, query, xPayer, openAt, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getEstResultSizes(namespace, array, type2, contentType, query, xPayer, openAt, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getFile(namespace, array, contentType, xPayer, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getFile(namespace, array, contentType, xPayer, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async submitQueryJson(namespace, array, contentType, queryJson, xPayer, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.submitQueryJson(namespace, array, contentType, queryJson, xPayer, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var QueryApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = QueryApiFp(configuration);
  return {
    finalizeQuery(namespace, array, type2, contentType, query, xPayer, openAt, options) {
      return localVarFp.finalizeQuery(namespace, array, type2, contentType, query, xPayer, openAt, options).then((request) => request(axios2, basePath));
    },
    getEstResultSizes(namespace, array, type2, contentType, query, xPayer, openAt, options) {
      return localVarFp.getEstResultSizes(namespace, array, type2, contentType, query, xPayer, openAt, options).then((request) => request(axios2, basePath));
    },
    getFile(namespace, array, contentType, xPayer, options) {
      return localVarFp.getFile(namespace, array, contentType, xPayer, options).then((request) => request(axios2, basePath));
    },
    submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, options) {
      return localVarFp.submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, options).then((request) => request(axios2, basePath));
    },
    submitQueryJson(namespace, array, contentType, queryJson, xPayer, options) {
      return localVarFp.submitQueryJson(namespace, array, contentType, queryJson, xPayer, options).then((request) => request(axios2, basePath));
    }
  };
};
var QueryApi = class extends BaseAPI {
  finalizeQuery(namespace, array, type2, contentType, query, xPayer, openAt, options) {
    return QueryApiFp(this.configuration).finalizeQuery(namespace, array, type2, contentType, query, xPayer, openAt, options).then((request) => request(this.axios, this.basePath));
  }
  getEstResultSizes(namespace, array, type2, contentType, query, xPayer, openAt, options) {
    return QueryApiFp(this.configuration).getEstResultSizes(namespace, array, type2, contentType, query, xPayer, openAt, options).then((request) => request(this.axios, this.basePath));
  }
  getFile(namespace, array, contentType, xPayer, options) {
    return QueryApiFp(this.configuration).getFile(namespace, array, contentType, xPayer, options).then((request) => request(this.axios, this.basePath));
  }
  submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, options) {
    return QueryApiFp(this.configuration).submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, options).then((request) => request(this.axios, this.basePath));
  }
  submitQueryJson(namespace, array, contentType, queryJson, xPayer, options) {
    return QueryApiFp(this.configuration).submitQueryJson(namespace, array, contentType, queryJson, xPayer, options).then((request) => request(this.axios, this.basePath));
  }
};
var RegisteredTaskGraphsApiAxiosParamCreator = function(configuration) {
  return {
    deleteRegisteredTaskGraph: async (namespace, name, options = {}) => {
      assertParamExists("deleteRegisteredTaskGraph", "namespace", namespace);
      assertParamExists("deleteRegisteredTaskGraph", "name", name);
      const localVarPath = `/taskgraphs/{namespace}/registered/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getRegisteredTaskGraph: async (namespace, name, options = {}) => {
      assertParamExists("getRegisteredTaskGraph", "namespace", namespace);
      assertParamExists("getRegisteredTaskGraph", "name", name);
      const localVarPath = `/taskgraphs/{namespace}/registered/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getRegisteredTaskGraphSharingPolicies: async (namespace, name, options = {}) => {
      assertParamExists("getRegisteredTaskGraphSharingPolicies", "namespace", namespace);
      assertParamExists("getRegisteredTaskGraphSharingPolicies", "name", name);
      const localVarPath = `/taskgraphs/{namespace}/registered/{name}/share`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    registerRegisteredTaskGraph: async (namespace, name, graph, options = {}) => {
      assertParamExists("registerRegisteredTaskGraph", "namespace", namespace);
      assertParamExists("registerRegisteredTaskGraph", "name", name);
      const localVarPath = `/taskgraphs/{namespace}/registered/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(graph, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    shareRegisteredTaskGraph: async (namespace, name, taskGraphSharing, options = {}) => {
      assertParamExists("shareRegisteredTaskGraph", "namespace", namespace);
      assertParamExists("shareRegisteredTaskGraph", "name", name);
      assertParamExists("shareRegisteredTaskGraph", "taskGraphSharing", taskGraphSharing);
      const localVarPath = `/taskgraphs/{namespace}/registered/{name}/share`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(taskGraphSharing, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateRegisteredTaskGraph: async (namespace, name, graph, options = {}) => {
      assertParamExists("updateRegisteredTaskGraph", "namespace", namespace);
      assertParamExists("updateRegisteredTaskGraph", "name", name);
      const localVarPath = `/taskgraphs/{namespace}/registered/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(graph, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var RegisteredTaskGraphsApiFp = function(configuration) {
  const localVarAxiosParamCreator = RegisteredTaskGraphsApiAxiosParamCreator(configuration);
  return {
    async deleteRegisteredTaskGraph(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteRegisteredTaskGraph(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getRegisteredTaskGraph(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getRegisteredTaskGraph(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getRegisteredTaskGraphSharingPolicies(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getRegisteredTaskGraphSharingPolicies(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async registerRegisteredTaskGraph(namespace, name, graph, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.registerRegisteredTaskGraph(namespace, name, graph, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async shareRegisteredTaskGraph(namespace, name, taskGraphSharing, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.shareRegisteredTaskGraph(namespace, name, taskGraphSharing, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateRegisteredTaskGraph(namespace, name, graph, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateRegisteredTaskGraph(namespace, name, graph, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var RegisteredTaskGraphsApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = RegisteredTaskGraphsApiFp(configuration);
  return {
    deleteRegisteredTaskGraph(namespace, name, options) {
      return localVarFp.deleteRegisteredTaskGraph(namespace, name, options).then((request) => request(axios2, basePath));
    },
    getRegisteredTaskGraph(namespace, name, options) {
      return localVarFp.getRegisteredTaskGraph(namespace, name, options).then((request) => request(axios2, basePath));
    },
    getRegisteredTaskGraphSharingPolicies(namespace, name, options) {
      return localVarFp.getRegisteredTaskGraphSharingPolicies(namespace, name, options).then((request) => request(axios2, basePath));
    },
    registerRegisteredTaskGraph(namespace, name, graph, options) {
      return localVarFp.registerRegisteredTaskGraph(namespace, name, graph, options).then((request) => request(axios2, basePath));
    },
    shareRegisteredTaskGraph(namespace, name, taskGraphSharing, options) {
      return localVarFp.shareRegisteredTaskGraph(namespace, name, taskGraphSharing, options).then((request) => request(axios2, basePath));
    },
    updateRegisteredTaskGraph(namespace, name, graph, options) {
      return localVarFp.updateRegisteredTaskGraph(namespace, name, graph, options).then((request) => request(axios2, basePath));
    }
  };
};
var RegisteredTaskGraphsApi = class extends BaseAPI {
  deleteRegisteredTaskGraph(namespace, name, options) {
    return RegisteredTaskGraphsApiFp(this.configuration).deleteRegisteredTaskGraph(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  getRegisteredTaskGraph(namespace, name, options) {
    return RegisteredTaskGraphsApiFp(this.configuration).getRegisteredTaskGraph(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  getRegisteredTaskGraphSharingPolicies(namespace, name, options) {
    return RegisteredTaskGraphsApiFp(this.configuration).getRegisteredTaskGraphSharingPolicies(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  registerRegisteredTaskGraph(namespace, name, graph, options) {
    return RegisteredTaskGraphsApiFp(this.configuration).registerRegisteredTaskGraph(namespace, name, graph, options).then((request) => request(this.axios, this.basePath));
  }
  shareRegisteredTaskGraph(namespace, name, taskGraphSharing, options) {
    return RegisteredTaskGraphsApiFp(this.configuration).shareRegisteredTaskGraph(namespace, name, taskGraphSharing, options).then((request) => request(this.axios, this.basePath));
  }
  updateRegisteredTaskGraph(namespace, name, graph, options) {
    return RegisteredTaskGraphsApiFp(this.configuration).updateRegisteredTaskGraph(namespace, name, graph, options).then((request) => request(this.axios, this.basePath));
  }
};
var SqlApiAxiosParamCreator = function(configuration) {
  return {
    runSQL: async (namespace, sql, acceptEncoding, options = {}) => {
      assertParamExists("runSQL", "namespace", namespace);
      assertParamExists("runSQL", "sql", sql);
      const localVarPath = `/sql/{namespace}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (acceptEncoding !== void 0 && acceptEncoding !== null) {
        localVarHeaderParameter["Accept-Encoding"] = String(acceptEncoding);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(sql, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var SqlApiFp = function(configuration) {
  const localVarAxiosParamCreator = SqlApiAxiosParamCreator(configuration);
  return {
    async runSQL(namespace, sql, acceptEncoding, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.runSQL(namespace, sql, acceptEncoding, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var SqlApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = SqlApiFp(configuration);
  return {
    runSQL(namespace, sql, acceptEncoding, options) {
      return localVarFp.runSQL(namespace, sql, acceptEncoding, options).then((request) => request(axios2, basePath));
    }
  };
};
var SqlApi = class extends BaseAPI {
  runSQL(namespace, sql, acceptEncoding, options) {
    return SqlApiFp(this.configuration).runSQL(namespace, sql, acceptEncoding, options).then((request) => request(this.axios, this.basePath));
  }
};
var StatsApiAxiosParamCreator = function(configuration) {
  return {
    getTiledbStats: async (options = {}) => {
      const localVarPath = `/.stats`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var StatsApiFp = function(configuration) {
  const localVarAxiosParamCreator = StatsApiAxiosParamCreator(configuration);
  return {
    async getTiledbStats(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getTiledbStats(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var StatsApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = StatsApiFp(configuration);
  return {
    getTiledbStats(options) {
      return localVarFp.getTiledbStats(options).then((request) => request(axios2, basePath));
    }
  };
};
var StatsApi = class extends BaseAPI {
  getTiledbStats(options) {
    return StatsApiFp(this.configuration).getTiledbStats(options).then((request) => request(this.axios, this.basePath));
  }
};
var TaskGraphLogsApiAxiosParamCreator = function(configuration) {
  return {
    createTaskGraphLog: async (namespace, log, options = {}) => {
      assertParamExists("createTaskGraphLog", "namespace", namespace);
      assertParamExists("createTaskGraphLog", "log", log);
      const localVarPath = `/taskgraphs/{namespace}/log`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(log, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getTaskGraphLog: async (namespace, id, options = {}) => {
      assertParamExists("getTaskGraphLog", "namespace", namespace);
      assertParamExists("getTaskGraphLog", "id", id);
      const localVarPath = `/taskgraphs/{namespace}/logs/{id}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listTaskGraphLogs: async (namespace, createdBy, search, startTime, endTime, page, perPage, options = {}) => {
      const localVarPath = `/taskgraphs/logs`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (namespace !== void 0) {
        localVarQueryParameter["namespace"] = namespace;
      }
      if (createdBy !== void 0) {
        localVarQueryParameter["created_by"] = createdBy;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      if (startTime !== void 0) {
        localVarQueryParameter["start_time"] = startTime instanceof Date ? startTime.toISOString() : startTime;
      }
      if (endTime !== void 0) {
        localVarQueryParameter["end_time"] = endTime instanceof Date ? endTime.toISOString() : endTime;
      }
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    reportClientNode: async (namespace, id, report, options = {}) => {
      assertParamExists("reportClientNode", "namespace", namespace);
      assertParamExists("reportClientNode", "id", id);
      assertParamExists("reportClientNode", "report", report);
      const localVarPath = `/taskgraphs/{namespace}/logs/{id}/report_client_node`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(report, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateTaskGraphLog: async (namespace, id, log, options = {}) => {
      assertParamExists("updateTaskGraphLog", "namespace", namespace);
      assertParamExists("updateTaskGraphLog", "id", id);
      assertParamExists("updateTaskGraphLog", "log", log);
      const localVarPath = `/taskgraphs/{namespace}/logs/{id}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(log, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var TaskGraphLogsApiFp = function(configuration) {
  const localVarAxiosParamCreator = TaskGraphLogsApiAxiosParamCreator(configuration);
  return {
    async createTaskGraphLog(namespace, log, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.createTaskGraphLog(namespace, log, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getTaskGraphLog(namespace, id, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getTaskGraphLog(namespace, id, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async listTaskGraphLogs(namespace, createdBy, search, startTime, endTime, page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listTaskGraphLogs(namespace, createdBy, search, startTime, endTime, page, perPage, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async reportClientNode(namespace, id, report, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.reportClientNode(namespace, id, report, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateTaskGraphLog(namespace, id, log, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateTaskGraphLog(namespace, id, log, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var TaskGraphLogsApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = TaskGraphLogsApiFp(configuration);
  return {
    createTaskGraphLog(namespace, log, options) {
      return localVarFp.createTaskGraphLog(namespace, log, options).then((request) => request(axios2, basePath));
    },
    getTaskGraphLog(namespace, id, options) {
      return localVarFp.getTaskGraphLog(namespace, id, options).then((request) => request(axios2, basePath));
    },
    listTaskGraphLogs(namespace, createdBy, search, startTime, endTime, page, perPage, options) {
      return localVarFp.listTaskGraphLogs(namespace, createdBy, search, startTime, endTime, page, perPage, options).then((request) => request(axios2, basePath));
    },
    reportClientNode(namespace, id, report, options) {
      return localVarFp.reportClientNode(namespace, id, report, options).then((request) => request(axios2, basePath));
    },
    updateTaskGraphLog(namespace, id, log, options) {
      return localVarFp.updateTaskGraphLog(namespace, id, log, options).then((request) => request(axios2, basePath));
    }
  };
};
var TaskGraphLogsApi = class extends BaseAPI {
  createTaskGraphLog(namespace, log, options) {
    return TaskGraphLogsApiFp(this.configuration).createTaskGraphLog(namespace, log, options).then((request) => request(this.axios, this.basePath));
  }
  getTaskGraphLog(namespace, id, options) {
    return TaskGraphLogsApiFp(this.configuration).getTaskGraphLog(namespace, id, options).then((request) => request(this.axios, this.basePath));
  }
  listTaskGraphLogs(namespace, createdBy, search, startTime, endTime, page, perPage, options) {
    return TaskGraphLogsApiFp(this.configuration).listTaskGraphLogs(namespace, createdBy, search, startTime, endTime, page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
  reportClientNode(namespace, id, report, options) {
    return TaskGraphLogsApiFp(this.configuration).reportClientNode(namespace, id, report, options).then((request) => request(this.axios, this.basePath));
  }
  updateTaskGraphLog(namespace, id, log, options) {
    return TaskGraphLogsApiFp(this.configuration).updateTaskGraphLog(namespace, id, log, options).then((request) => request(this.axios, this.basePath));
  }
};
var TasksApiAxiosParamCreator = function(configuration) {
  return {
    runSQL: async (namespace, sql, acceptEncoding, options = {}) => {
      assertParamExists("runSQL", "namespace", namespace);
      assertParamExists("runSQL", "sql", sql);
      const localVarPath = `/sql/{namespace}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (acceptEncoding !== void 0 && acceptEncoding !== null) {
        localVarHeaderParameter["Accept-Encoding"] = String(acceptEncoding);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(sql, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    taskIdGet: async (id, options = {}) => {
      assertParamExists("taskIdGet", "id", id);
      const localVarPath = `/task/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    taskIdResultGet: async (id, acceptEncoding, options = {}) => {
      assertParamExists("taskIdResultGet", "id", id);
      const localVarPath = `/task/{id}/result`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (acceptEncoding !== void 0 && acceptEncoding !== null) {
        localVarHeaderParameter["Accept-Encoding"] = String(acceptEncoding);
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    tasksGet: async (namespace, createdBy, array, start, end, page, perPage, type2, excludeType, fileType, excludeFileType, status, search, orderby, options = {}) => {
      const localVarPath = `/tasks`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (namespace !== void 0) {
        localVarQueryParameter["namespace"] = namespace;
      }
      if (createdBy !== void 0) {
        localVarQueryParameter["created_by"] = createdBy;
      }
      if (array !== void 0) {
        localVarQueryParameter["array"] = array;
      }
      if (start !== void 0) {
        localVarQueryParameter["start"] = start;
      }
      if (end !== void 0) {
        localVarQueryParameter["end"] = end;
      }
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      if (type2 !== void 0) {
        localVarQueryParameter["type"] = type2;
      }
      if (excludeType) {
        localVarQueryParameter["exclude_type"] = excludeType.join(COLLECTION_FORMATS.csv);
      }
      if (fileType) {
        localVarQueryParameter["file_type"] = fileType;
      }
      if (excludeFileType) {
        localVarQueryParameter["exclude_file_type"] = excludeFileType;
      }
      if (status !== void 0) {
        localVarQueryParameter["status"] = status;
      }
      if (search !== void 0) {
        localVarQueryParameter["search"] = search;
      }
      if (orderby !== void 0) {
        localVarQueryParameter["orderby"] = orderby;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var TasksApiFp = function(configuration) {
  const localVarAxiosParamCreator = TasksApiAxiosParamCreator(configuration);
  return {
    async runSQL(namespace, sql, acceptEncoding, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.runSQL(namespace, sql, acceptEncoding, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async taskIdGet(id, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.taskIdGet(id, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async taskIdResultGet(id, acceptEncoding, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.taskIdResultGet(id, acceptEncoding, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async tasksGet(namespace, createdBy, array, start, end, page, perPage, type2, excludeType, fileType, excludeFileType, status, search, orderby, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.tasksGet(namespace, createdBy, array, start, end, page, perPage, type2, excludeType, fileType, excludeFileType, status, search, orderby, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var TasksApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = TasksApiFp(configuration);
  return {
    runSQL(namespace, sql, acceptEncoding, options) {
      return localVarFp.runSQL(namespace, sql, acceptEncoding, options).then((request) => request(axios2, basePath));
    },
    taskIdGet(id, options) {
      return localVarFp.taskIdGet(id, options).then((request) => request(axios2, basePath));
    },
    taskIdResultGet(id, acceptEncoding, options) {
      return localVarFp.taskIdResultGet(id, acceptEncoding, options).then((request) => request(axios2, basePath));
    },
    tasksGet(namespace, createdBy, array, start, end, page, perPage, type2, excludeType, fileType, excludeFileType, status, search, orderby, options) {
      return localVarFp.tasksGet(namespace, createdBy, array, start, end, page, perPage, type2, excludeType, fileType, excludeFileType, status, search, orderby, options).then((request) => request(axios2, basePath));
    }
  };
};
var TasksApi = class extends BaseAPI {
  runSQL(namespace, sql, acceptEncoding, options) {
    return TasksApiFp(this.configuration).runSQL(namespace, sql, acceptEncoding, options).then((request) => request(this.axios, this.basePath));
  }
  taskIdGet(id, options) {
    return TasksApiFp(this.configuration).taskIdGet(id, options).then((request) => request(this.axios, this.basePath));
  }
  taskIdResultGet(id, acceptEncoding, options) {
    return TasksApiFp(this.configuration).taskIdResultGet(id, acceptEncoding, options).then((request) => request(this.axios, this.basePath));
  }
  tasksGet(namespace, createdBy, array, start, end, page, perPage, type2, excludeType, fileType, excludeFileType, status, search, orderby, options) {
    return TasksApiFp(this.configuration).tasksGet(namespace, createdBy, array, start, end, page, perPage, type2, excludeType, fileType, excludeFileType, status, search, orderby, options).then((request) => request(this.axios, this.basePath));
  }
};
var UdfApiAxiosParamCreator = function(configuration) {
  return {
    deleteUDFInfo: async (namespace, name, options = {}) => {
      assertParamExists("deleteUDFInfo", "namespace", namespace);
      assertParamExists("deleteUDFInfo", "name", name);
      const localVarPath = `/udf/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getUDFInfo: async (namespace, name, options = {}) => {
      assertParamExists("getUDFInfo", "namespace", namespace);
      assertParamExists("getUDFInfo", "name", name);
      const localVarPath = `/udf/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getUDFInfoSharingPolicies: async (namespace, name, options = {}) => {
      assertParamExists("getUDFInfoSharingPolicies", "namespace", namespace);
      assertParamExists("getUDFInfoSharingPolicies", "name", name);
      const localVarPath = `/udf/{namespace}/{name}/share`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    handleCopyUDF: async (namespace, name, uDFCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options = {}) => {
      assertParamExists("handleCopyUDF", "namespace", namespace);
      assertParamExists("handleCopyUDF", "name", name);
      assertParamExists("handleCopyUDF", "uDFCopy", uDFCopy);
      const localVarPath = `/udf/{namespace}/{name}/copy`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (endTimestamp !== void 0) {
        localVarQueryParameter["end_timestamp"] = endTimestamp;
      }
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(uDFCopy, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    registerUDFInfo: async (namespace, name, udf, options = {}) => {
      assertParamExists("registerUDFInfo", "namespace", namespace);
      assertParamExists("registerUDFInfo", "name", name);
      assertParamExists("registerUDFInfo", "udf", udf);
      const localVarPath = `/udf/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(udf, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    shareUDFInfo: async (namespace, name, udfSharing, options = {}) => {
      assertParamExists("shareUDFInfo", "namespace", namespace);
      assertParamExists("shareUDFInfo", "name", name);
      assertParamExists("shareUDFInfo", "udfSharing", udfSharing);
      const localVarPath = `/udf/{namespace}/{name}/share`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(udfSharing, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    submitGenericUDF: async (namespace, udf, acceptEncoding, options = {}) => {
      assertParamExists("submitGenericUDF", "namespace", namespace);
      assertParamExists("submitGenericUDF", "udf", udf);
      const localVarPath = `/udfs/generic/{namespace}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (acceptEncoding !== void 0 && acceptEncoding !== null) {
        localVarHeaderParameter["Accept-Encoding"] = String(acceptEncoding);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(udf, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    submitMultiArrayUDF: async (namespace, udf, acceptEncoding, options = {}) => {
      assertParamExists("submitMultiArrayUDF", "namespace", namespace);
      assertParamExists("submitMultiArrayUDF", "udf", udf);
      const localVarPath = `/udfs/arrays/{namespace}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (acceptEncoding !== void 0 && acceptEncoding !== null) {
        localVarHeaderParameter["Accept-Encoding"] = String(acceptEncoding);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(udf, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    submitUDF: async (namespace, array, udf, xPayer, acceptEncoding, v2, options = {}) => {
      assertParamExists("submitUDF", "namespace", namespace);
      assertParamExists("submitUDF", "array", array);
      assertParamExists("submitUDF", "udf", udf);
      const localVarPath = `/arrays/{namespace}/{array}/udf/submit`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (v2 !== void 0) {
        localVarQueryParameter["v2"] = v2;
      }
      if (xPayer !== void 0 && xPayer !== null) {
        localVarHeaderParameter["X-Payer"] = String(xPayer);
      }
      if (acceptEncoding !== void 0 && acceptEncoding !== null) {
        localVarHeaderParameter["Accept-Encoding"] = String(acceptEncoding);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(udf, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    udfNamespaceArrayEndTimestampsGet: async (namespace, array, page, perPage, options = {}) => {
      assertParamExists("udfNamespaceArrayEndTimestampsGet", "namespace", namespace);
      assertParamExists("udfNamespaceArrayEndTimestampsGet", "array", array);
      const localVarPath = `/udf/{namespace}/{array}/end_timestamps`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateUDFInfo: async (namespace, name, udf, options = {}) => {
      assertParamExists("updateUDFInfo", "namespace", namespace);
      assertParamExists("updateUDFInfo", "name", name);
      assertParamExists("updateUDFInfo", "udf", udf);
      const localVarPath = `/udf/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(udf, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var UdfApiFp = function(configuration) {
  const localVarAxiosParamCreator = UdfApiAxiosParamCreator(configuration);
  return {
    async deleteUDFInfo(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUDFInfo(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getUDFInfo(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getUDFInfo(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getUDFInfoSharingPolicies(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getUDFInfoSharingPolicies(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async handleCopyUDF(namespace, name, uDFCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.handleCopyUDF(namespace, name, uDFCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async registerUDFInfo(namespace, name, udf, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.registerUDFInfo(namespace, name, udf, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async shareUDFInfo(namespace, name, udfSharing, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.shareUDFInfo(namespace, name, udfSharing, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async submitGenericUDF(namespace, udf, acceptEncoding, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.submitGenericUDF(namespace, udf, acceptEncoding, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async submitMultiArrayUDF(namespace, udf, acceptEncoding, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.submitMultiArrayUDF(namespace, udf, acceptEncoding, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async submitUDF(namespace, array, udf, xPayer, acceptEncoding, v2, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.submitUDF(namespace, array, udf, xPayer, acceptEncoding, v2, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async udfNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.udfNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateUDFInfo(namespace, name, udf, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateUDFInfo(namespace, name, udf, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var UdfApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = UdfApiFp(configuration);
  return {
    deleteUDFInfo(namespace, name, options) {
      return localVarFp.deleteUDFInfo(namespace, name, options).then((request) => request(axios2, basePath));
    },
    getUDFInfo(namespace, name, options) {
      return localVarFp.getUDFInfo(namespace, name, options).then((request) => request(axios2, basePath));
    },
    getUDFInfoSharingPolicies(namespace, name, options) {
      return localVarFp.getUDFInfoSharingPolicies(namespace, name, options).then((request) => request(axios2, basePath));
    },
    handleCopyUDF(namespace, name, uDFCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options) {
      return localVarFp.handleCopyUDF(namespace, name, uDFCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options).then((request) => request(axios2, basePath));
    },
    registerUDFInfo(namespace, name, udf, options) {
      return localVarFp.registerUDFInfo(namespace, name, udf, options).then((request) => request(axios2, basePath));
    },
    shareUDFInfo(namespace, name, udfSharing, options) {
      return localVarFp.shareUDFInfo(namespace, name, udfSharing, options).then((request) => request(axios2, basePath));
    },
    submitGenericUDF(namespace, udf, acceptEncoding, options) {
      return localVarFp.submitGenericUDF(namespace, udf, acceptEncoding, options).then((request) => request(axios2, basePath));
    },
    submitMultiArrayUDF(namespace, udf, acceptEncoding, options) {
      return localVarFp.submitMultiArrayUDF(namespace, udf, acceptEncoding, options).then((request) => request(axios2, basePath));
    },
    submitUDF(namespace, array, udf, xPayer, acceptEncoding, v2, options) {
      return localVarFp.submitUDF(namespace, array, udf, xPayer, acceptEncoding, v2, options).then((request) => request(axios2, basePath));
    },
    udfNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options) {
      return localVarFp.udfNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options).then((request) => request(axios2, basePath));
    },
    updateUDFInfo(namespace, name, udf, options) {
      return localVarFp.updateUDFInfo(namespace, name, udf, options).then((request) => request(axios2, basePath));
    }
  };
};
var UdfApi = class extends BaseAPI {
  deleteUDFInfo(namespace, name, options) {
    return UdfApiFp(this.configuration).deleteUDFInfo(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  getUDFInfo(namespace, name, options) {
    return UdfApiFp(this.configuration).getUDFInfo(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  getUDFInfoSharingPolicies(namespace, name, options) {
    return UdfApiFp(this.configuration).getUDFInfoSharingPolicies(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  handleCopyUDF(namespace, name, uDFCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options) {
    return UdfApiFp(this.configuration).handleCopyUDF(namespace, name, uDFCopy, xTILEDBCLOUDACCESSCREDENTIALSNAME, endTimestamp, options).then((request) => request(this.axios, this.basePath));
  }
  registerUDFInfo(namespace, name, udf, options) {
    return UdfApiFp(this.configuration).registerUDFInfo(namespace, name, udf, options).then((request) => request(this.axios, this.basePath));
  }
  shareUDFInfo(namespace, name, udfSharing, options) {
    return UdfApiFp(this.configuration).shareUDFInfo(namespace, name, udfSharing, options).then((request) => request(this.axios, this.basePath));
  }
  submitGenericUDF(namespace, udf, acceptEncoding, options) {
    return UdfApiFp(this.configuration).submitGenericUDF(namespace, udf, acceptEncoding, options).then((request) => request(this.axios, this.basePath));
  }
  submitMultiArrayUDF(namespace, udf, acceptEncoding, options) {
    return UdfApiFp(this.configuration).submitMultiArrayUDF(namespace, udf, acceptEncoding, options).then((request) => request(this.axios, this.basePath));
  }
  submitUDF(namespace, array, udf, xPayer, acceptEncoding, v2, options) {
    return UdfApiFp(this.configuration).submitUDF(namespace, array, udf, xPayer, acceptEncoding, v2, options).then((request) => request(this.axios, this.basePath));
  }
  udfNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options) {
    return UdfApiFp(this.configuration).udfNamespaceArrayEndTimestampsGet(namespace, array, page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
  updateUDFInfo(namespace, name, udf, options) {
    return UdfApiFp(this.configuration).updateUDFInfo(namespace, name, udf, options).then((request) => request(this.axios, this.basePath));
  }
};
var UserApiAxiosParamCreator = function(configuration) {
  return {
    addAWSAccessCredentials: async (namespace, awsAccessCredentials, options = {}) => {
      assertParamExists("addAWSAccessCredentials", "namespace", namespace);
      assertParamExists("addAWSAccessCredentials", "awsAccessCredentials", awsAccessCredentials);
      const localVarPath = `/credentials/{namespace}/aws`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(awsAccessCredentials, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    addUserToOrganization: async (organization, user, options = {}) => {
      assertParamExists("addUserToOrganization", "organization", organization);
      assertParamExists("addUserToOrganization", "user", user);
      const localVarPath = `/organizations/{organization}/user`.replace(`{${"organization"}}`, encodeURIComponent(String(organization)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    checkAWSAccessCredentials: async (namespace, options = {}) => {
      assertParamExists("checkAWSAccessCredentials", "namespace", namespace);
      const localVarPath = `/credentials/{namespace}/aws`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    checkAWSAccessCredentialsByName: async (namespace, name, options = {}) => {
      assertParamExists("checkAWSAccessCredentialsByName", "namespace", namespace);
      assertParamExists("checkAWSAccessCredentialsByName", "name", name);
      const localVarPath = `/credentials/{namespace}/aws/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    confirmEmail: async (options = {}) => {
      const localVarPath = `/user/confirm_email`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    createUser: async (user, options = {}) => {
      assertParamExists("createUser", "user", user);
      const localVarPath = `/user`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteAWSAccessCredentials: async (namespace, name, options = {}) => {
      assertParamExists("deleteAWSAccessCredentials", "namespace", namespace);
      assertParamExists("deleteAWSAccessCredentials", "name", name);
      const localVarPath = `/credentials/{namespace}/aws/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteUser: async (username, options = {}) => {
      assertParamExists("deleteUser", "username", username);
      const localVarPath = `/users/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(username)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteUserFromOrganization: async (organization, username, options = {}) => {
      assertParamExists("deleteUserFromOrganization", "organization", organization);
      assertParamExists("deleteUserFromOrganization", "username", username);
      const localVarPath = `/organizations/{organization}/{username}`.replace(`{${"organization"}}`, encodeURIComponent(String(organization))).replace(`{${"username"}}`, encodeURIComponent(String(username)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getOrganizationUser: async (organization, username, options = {}) => {
      assertParamExists("getOrganizationUser", "organization", organization);
      assertParamExists("getOrganizationUser", "username", username);
      const localVarPath = `/organizations/{organization}/{username}`.replace(`{${"organization"}}`, encodeURIComponent(String(organization))).replace(`{${"username"}}`, encodeURIComponent(String(username)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getSession: async (rememberMe, options = {}) => {
      const localVarPath = `/session`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      if (rememberMe !== void 0) {
        localVarQueryParameter["remember_me"] = rememberMe;
      }
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getTokenScopes: async (options = {}) => {
      const localVarPath = `/tokens/scopes`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getUser: async (options = {}) => {
      const localVarPath = `/user`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getUserWithUsername: async (username, options = {}) => {
      assertParamExists("getUserWithUsername", "username", username);
      const localVarPath = `/users/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(username)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    requestToken: async (tokenRequest, options = {}) => {
      const localVarPath = `/token`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(tokenRequest, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    resetUserPassword: async (user, options = {}) => {
      assertParamExists("resetUserPassword", "user", user);
      const localVarPath = `/user/password_reset`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    revokeToken: async (token, options = {}) => {
      assertParamExists("revokeToken", "token", token);
      const localVarPath = `/tokens/{token}`.replace(`{${"token"}}`, encodeURIComponent(String(token)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    tokensGet: async (options = {}) => {
      const localVarPath = `/tokens`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    tokensSessionGet: async (options = {}) => {
      const localVarPath = `/tokens/session`;
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateAWSAccessCredentials: async (namespace, name, awsAccessCredentials, options = {}) => {
      assertParamExists("updateAWSAccessCredentials", "namespace", namespace);
      assertParamExists("updateAWSAccessCredentials", "name", name);
      assertParamExists("updateAWSAccessCredentials", "awsAccessCredentials", awsAccessCredentials);
      const localVarPath = `/credentials/{namespace}/aws/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(awsAccessCredentials, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateUser: async (username, user, options = {}) => {
      assertParamExists("updateUser", "username", username);
      assertParamExists("updateUser", "user", user);
      const localVarPath = `/users/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(username)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateUserInOrganization: async (organization, username, user, options = {}) => {
      assertParamExists("updateUserInOrganization", "organization", organization);
      assertParamExists("updateUserInOrganization", "username", username);
      assertParamExists("updateUserInOrganization", "user", user);
      const localVarPath = `/organizations/{organization}/{username}`.replace(`{${"organization"}}`, encodeURIComponent(String(organization))).replace(`{${"username"}}`, encodeURIComponent(String(username)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration);
      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var UserApiFp = function(configuration) {
  const localVarAxiosParamCreator = UserApiAxiosParamCreator(configuration);
  return {
    async addAWSAccessCredentials(namespace, awsAccessCredentials, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addAWSAccessCredentials(namespace, awsAccessCredentials, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async addUserToOrganization(organization, user, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addUserToOrganization(organization, user, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async checkAWSAccessCredentials(namespace, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.checkAWSAccessCredentials(namespace, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async checkAWSAccessCredentialsByName(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.checkAWSAccessCredentialsByName(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async confirmEmail(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.confirmEmail(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async createUser(user, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.createUser(user, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteAWSAccessCredentials(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteAWSAccessCredentials(namespace, name, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteUser(username, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUser(username, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async deleteUserFromOrganization(organization, username, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUserFromOrganization(organization, username, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getOrganizationUser(organization, username, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getOrganizationUser(organization, username, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getSession(rememberMe, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getSession(rememberMe, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getTokenScopes(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getTokenScopes(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getUser(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getUser(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async getUserWithUsername(username, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getUserWithUsername(username, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async requestToken(tokenRequest, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.requestToken(tokenRequest, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async resetUserPassword(user, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.resetUserPassword(user, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async revokeToken(token, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.revokeToken(token, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async tokensGet(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.tokensGet(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async tokensSessionGet(options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.tokensSessionGet(options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateUser(username, user, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateUser(username, user, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    },
    async updateUserInOrganization(organization, username, user, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateUserInOrganization(organization, username, user, options);
      return createRequestFunction(localVarAxiosArgs, import_axios2.default, BASE_PATH, configuration);
    }
  };
};
var UserApiFactory = function(configuration, basePath, axios2) {
  const localVarFp = UserApiFp(configuration);
  return {
    addAWSAccessCredentials(namespace, awsAccessCredentials, options) {
      return localVarFp.addAWSAccessCredentials(namespace, awsAccessCredentials, options).then((request) => request(axios2, basePath));
    },
    addUserToOrganization(organization, user, options) {
      return localVarFp.addUserToOrganization(organization, user, options).then((request) => request(axios2, basePath));
    },
    checkAWSAccessCredentials(namespace, options) {
      return localVarFp.checkAWSAccessCredentials(namespace, options).then((request) => request(axios2, basePath));
    },
    checkAWSAccessCredentialsByName(namespace, name, options) {
      return localVarFp.checkAWSAccessCredentialsByName(namespace, name, options).then((request) => request(axios2, basePath));
    },
    confirmEmail(options) {
      return localVarFp.confirmEmail(options).then((request) => request(axios2, basePath));
    },
    createUser(user, options) {
      return localVarFp.createUser(user, options).then((request) => request(axios2, basePath));
    },
    deleteAWSAccessCredentials(namespace, name, options) {
      return localVarFp.deleteAWSAccessCredentials(namespace, name, options).then((request) => request(axios2, basePath));
    },
    deleteUser(username, options) {
      return localVarFp.deleteUser(username, options).then((request) => request(axios2, basePath));
    },
    deleteUserFromOrganization(organization, username, options) {
      return localVarFp.deleteUserFromOrganization(organization, username, options).then((request) => request(axios2, basePath));
    },
    getOrganizationUser(organization, username, options) {
      return localVarFp.getOrganizationUser(organization, username, options).then((request) => request(axios2, basePath));
    },
    getSession(rememberMe, options) {
      return localVarFp.getSession(rememberMe, options).then((request) => request(axios2, basePath));
    },
    getTokenScopes(options) {
      return localVarFp.getTokenScopes(options).then((request) => request(axios2, basePath));
    },
    getUser(options) {
      return localVarFp.getUser(options).then((request) => request(axios2, basePath));
    },
    getUserWithUsername(username, options) {
      return localVarFp.getUserWithUsername(username, options).then((request) => request(axios2, basePath));
    },
    requestToken(tokenRequest, options) {
      return localVarFp.requestToken(tokenRequest, options).then((request) => request(axios2, basePath));
    },
    resetUserPassword(user, options) {
      return localVarFp.resetUserPassword(user, options).then((request) => request(axios2, basePath));
    },
    revokeToken(token, options) {
      return localVarFp.revokeToken(token, options).then((request) => request(axios2, basePath));
    },
    tokensGet(options) {
      return localVarFp.tokensGet(options).then((request) => request(axios2, basePath));
    },
    tokensSessionGet(options) {
      return localVarFp.tokensSessionGet(options).then((request) => request(axios2, basePath));
    },
    updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options) {
      return localVarFp.updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options).then((request) => request(axios2, basePath));
    },
    updateUser(username, user, options) {
      return localVarFp.updateUser(username, user, options).then((request) => request(axios2, basePath));
    },
    updateUserInOrganization(organization, username, user, options) {
      return localVarFp.updateUserInOrganization(organization, username, user, options).then((request) => request(axios2, basePath));
    }
  };
};
var UserApi = class extends BaseAPI {
  addAWSAccessCredentials(namespace, awsAccessCredentials, options) {
    return UserApiFp(this.configuration).addAWSAccessCredentials(namespace, awsAccessCredentials, options).then((request) => request(this.axios, this.basePath));
  }
  addUserToOrganization(organization, user, options) {
    return UserApiFp(this.configuration).addUserToOrganization(organization, user, options).then((request) => request(this.axios, this.basePath));
  }
  checkAWSAccessCredentials(namespace, options) {
    return UserApiFp(this.configuration).checkAWSAccessCredentials(namespace, options).then((request) => request(this.axios, this.basePath));
  }
  checkAWSAccessCredentialsByName(namespace, name, options) {
    return UserApiFp(this.configuration).checkAWSAccessCredentialsByName(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  confirmEmail(options) {
    return UserApiFp(this.configuration).confirmEmail(options).then((request) => request(this.axios, this.basePath));
  }
  createUser(user, options) {
    return UserApiFp(this.configuration).createUser(user, options).then((request) => request(this.axios, this.basePath));
  }
  deleteAWSAccessCredentials(namespace, name, options) {
    return UserApiFp(this.configuration).deleteAWSAccessCredentials(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  deleteUser(username, options) {
    return UserApiFp(this.configuration).deleteUser(username, options).then((request) => request(this.axios, this.basePath));
  }
  deleteUserFromOrganization(organization, username, options) {
    return UserApiFp(this.configuration).deleteUserFromOrganization(organization, username, options).then((request) => request(this.axios, this.basePath));
  }
  getOrganizationUser(organization, username, options) {
    return UserApiFp(this.configuration).getOrganizationUser(organization, username, options).then((request) => request(this.axios, this.basePath));
  }
  getSession(rememberMe, options) {
    return UserApiFp(this.configuration).getSession(rememberMe, options).then((request) => request(this.axios, this.basePath));
  }
  getTokenScopes(options) {
    return UserApiFp(this.configuration).getTokenScopes(options).then((request) => request(this.axios, this.basePath));
  }
  getUser(options) {
    return UserApiFp(this.configuration).getUser(options).then((request) => request(this.axios, this.basePath));
  }
  getUserWithUsername(username, options) {
    return UserApiFp(this.configuration).getUserWithUsername(username, options).then((request) => request(this.axios, this.basePath));
  }
  requestToken(tokenRequest, options) {
    return UserApiFp(this.configuration).requestToken(tokenRequest, options).then((request) => request(this.axios, this.basePath));
  }
  resetUserPassword(user, options) {
    return UserApiFp(this.configuration).resetUserPassword(user, options).then((request) => request(this.axios, this.basePath));
  }
  revokeToken(token, options) {
    return UserApiFp(this.configuration).revokeToken(token, options).then((request) => request(this.axios, this.basePath));
  }
  tokensGet(options) {
    return UserApiFp(this.configuration).tokensGet(options).then((request) => request(this.axios, this.basePath));
  }
  tokensSessionGet(options) {
    return UserApiFp(this.configuration).tokensSessionGet(options).then((request) => request(this.axios, this.basePath));
  }
  updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options) {
    return UserApiFp(this.configuration).updateAWSAccessCredentials(namespace, name, awsAccessCredentials, options).then((request) => request(this.axios, this.basePath));
  }
  updateUser(username, user, options) {
    return UserApiFp(this.configuration).updateUser(username, user, options).then((request) => request(this.axios, this.basePath));
  }
  updateUserInOrganization(organization, username, user, options) {
    return UserApiFp(this.configuration).updateUserInOrganization(organization, username, user, options).then((request) => request(this.axios, this.basePath));
  }
};

// src/v1/configuration.ts
var Configuration = class {
  constructor(param = {}) {
    this.apiKey = param.apiKey;
    this.username = param.username;
    this.password = param.password;
    this.accessToken = param.accessToken;
    this.basePath = param.basePath;
    this.baseOptions = param.baseOptions;
    this.formDataCtor = param.formDataCtor;
  }
  isJsonMime(mime) {
    const jsonMime = new RegExp("^(application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(;.*)?$", "i");
    return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === "application/json-patch+json");
  }
  isCapnpMime(mime) {
    return mime === "application/capnp";
  }
};

// src/v2/index.ts
var v2_exports = {};
__export(v2_exports, {
  ActivityEventType: () => ActivityEventType2,
  ArrayApi: () => ArrayApi2,
  ArrayApiAxiosParamCreator: () => ArrayApiAxiosParamCreator2,
  ArrayApiFactory: () => ArrayApiFactory2,
  ArrayApiFp: () => ArrayApiFp2,
  CloudProvider: () => CloudProvider,
  Configuration: () => Configuration2,
  Datatype: () => Datatype2,
  GroupMemberAssetType: () => GroupMemberAssetType2,
  GroupMemberType: () => GroupMemberType2,
  GroupsApi: () => GroupsApi2,
  GroupsApiAxiosParamCreator: () => GroupsApiAxiosParamCreator2,
  GroupsApiFactory: () => GroupsApiFactory2,
  GroupsApiFp: () => GroupsApiFp2,
  Layout: () => Layout2,
  OrganizationApi: () => OrganizationApi2,
  OrganizationApiAxiosParamCreator: () => OrganizationApiAxiosParamCreator2,
  OrganizationApiFactory: () => OrganizationApiFactory2,
  OrganizationApiFp: () => OrganizationApiFp2,
  QueryApi: () => QueryApi2,
  QueryApiAxiosParamCreator: () => QueryApiAxiosParamCreator2,
  QueryApiFactory: () => QueryApiFactory2,
  QueryApiFp: () => QueryApiFp2,
  Querystatus: () => Querystatus2,
  Querytype: () => Querytype2,
  UserApi: () => UserApi2,
  UserApiAxiosParamCreator: () => UserApiAxiosParamCreator2,
  UserApiFactory: () => UserApiFactory2,
  UserApiFp: () => UserApiFp2
});

// src/v2/api.ts
var import_axios4 = __toESM(require_axios2());

// src/v2/base.ts
var import_axios3 = __toESM(require_axios2());
var BASE_PATH2 = "https://api.tiledb.com/v2".replace(/\/+$/, "");
var BaseAPI2 = class {
  constructor(configuration, basePath = BASE_PATH2, axios2 = import_axios3.default) {
    this.basePath = basePath;
    this.axios = axios2;
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
    updateBasePathAfterRedirect_default(axios2, BASE_PATH2, this);
  }
};
var RequiredError3 = class extends Error {
  constructor(field, msg) {
    super(msg);
    this.field = field;
    this.name = "RequiredError";
  }
};

// src/v2/common.ts
var DUMMY_BASE_URL2 = "https://example.com";
var assertParamExists2 = function(functionName, paramName, paramValue) {
  if (paramValue === null || paramValue === void 0) {
    throw new RequiredError3(paramName, `Required parameter ${paramName} was null or undefined when calling ${functionName}.`);
  }
};
var setApiKeyToObject2 = async function(object, keyParamName, configuration) {
  if (configuration && configuration.apiKey) {
    const localVarApiKeyValue = typeof configuration.apiKey === "function" ? await configuration.apiKey(keyParamName) : await configuration.apiKey;
    object[keyParamName] = localVarApiKeyValue;
  }
};
var setBasicAuthToObject2 = function(object, configuration) {
  if (configuration && (configuration.username || configuration.password)) {
    object["auth"] = { username: configuration.username, password: configuration.password };
  }
};
var setSearchParams2 = function(url, ...objects) {
  const searchParams = new URLSearchParams(url.search);
  for (const object of objects) {
    for (const key in object) {
      if (Array.isArray(object[key])) {
        searchParams.delete(key);
        for (const item of object[key]) {
          searchParams.append(key, item);
        }
      } else {
        searchParams.set(key, object[key]);
      }
    }
  }
  url.search = searchParams.toString();
};
var serializeDataIfNeeded2 = function(value, requestOptions, configuration) {
  const nonString = typeof value !== "string";
  const needsJSONSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isJsonMime(requestOptions.headers["Content-Type"]) : nonString;
  if (needsJSONSerialization) {
    return JSON.stringify(value !== void 0 ? value : {});
  }
  const needsCapnpSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isCapnpMime(requestOptions.headers["Content-Type"]) : nonString;
  if (needsCapnpSerialization) {
    return value !== void 0 ? capnpSerializer_default(value) : "";
  }
  return value || "";
};
var toPathString2 = function(url) {
  return url.pathname + url.search + url.hash;
};
var createRequestFunction2 = function(axiosArgs, globalAxios9, BASE_PATH3, configuration) {
  return (axios2 = globalAxios9, basePath = BASE_PATH3) => {
    const axiosRequestArgs = { ...axiosArgs.options, url: ((configuration == null ? void 0 : configuration.basePath) || basePath) + axiosArgs.url };
    return axios2.request(axiosRequestArgs);
  };
};

// src/v2/api.ts
var ActivityEventType2 = /* @__PURE__ */ ((ActivityEventType3) => {
  ActivityEventType3["ReadSchema"] = "read_schema";
  ActivityEventType3["MaxBufferSizes"] = "max_buffer_sizes";
  ActivityEventType3["NonEmptyDomain"] = "non_empty_domain";
  ActivityEventType3["QueryRead"] = "query_read";
  ActivityEventType3["QueryWrite"] = "query_write";
  ActivityEventType3["Create"] = "create";
  ActivityEventType3["Delete"] = "delete";
  ActivityEventType3["Register"] = "register";
  ActivityEventType3["Deregister"] = "deregister";
  ActivityEventType3["Udf"] = "udf";
  ActivityEventType3["ArrayMetadataGet"] = "array_metadata_get";
  ActivityEventType3["ArrayMetadataUpdate"] = "array_metadata_update";
  ActivityEventType3["EstimatedResultSizes"] = "estimated_result_sizes";
  ActivityEventType3["Update"] = "update";
  ActivityEventType3["Info"] = "info";
  ActivityEventType3["Run"] = "run";
  return ActivityEventType3;
})(ActivityEventType2 || {});
var CloudProvider = /* @__PURE__ */ ((CloudProvider2) => {
  CloudProvider2["Aws"] = "AWS";
  CloudProvider2["Azure"] = "AZURE";
  return CloudProvider2;
})(CloudProvider || {});
var Datatype2 = /* @__PURE__ */ ((Datatype3) => {
  Datatype3["Int32"] = "INT32";
  Datatype3["Int64"] = "INT64";
  Datatype3["Float32"] = "FLOAT32";
  Datatype3["Float64"] = "FLOAT64";
  Datatype3["Char"] = "CHAR";
  Datatype3["Int8"] = "INT8";
  Datatype3["Uint8"] = "UINT8";
  Datatype3["Int16"] = "INT16";
  Datatype3["Uint16"] = "UINT16";
  Datatype3["Uint32"] = "UINT32";
  Datatype3["Uint64"] = "UINT64";
  Datatype3["StringAscii"] = "STRING_ASCII";
  Datatype3["StringUtf8"] = "STRING_UTF8";
  Datatype3["StringUtf16"] = "STRING_UTF16";
  Datatype3["StringUtf32"] = "STRING_UTF32";
  Datatype3["StringUcs2"] = "STRING_UCS2";
  Datatype3["StringUcs4"] = "STRING_UCS4";
  Datatype3["DatetimeYear"] = "DATETIME_YEAR";
  Datatype3["DatetimeMonth"] = "DATETIME_MONTH";
  Datatype3["DatetimeWeek"] = "DATETIME_WEEK";
  Datatype3["DatetimeDay"] = "DATETIME_DAY";
  Datatype3["DatetimeHr"] = "DATETIME_HR";
  Datatype3["DatetimeMin"] = "DATETIME_MIN";
  Datatype3["DatetimeSec"] = "DATETIME_SEC";
  Datatype3["DatetimeMs"] = "DATETIME_MS";
  Datatype3["DatetimeUs"] = "DATETIME_US";
  Datatype3["DatetimeNs"] = "DATETIME_NS";
  Datatype3["DatetimePs"] = "DATETIME_PS";
  Datatype3["DatetimeFs"] = "DATETIME_FS";
  Datatype3["DatetimeAs"] = "DATETIME_AS";
  Datatype3["Any"] = "ANY";
  return Datatype3;
})(Datatype2 || {});
var GroupMemberAssetType2 = /* @__PURE__ */ ((GroupMemberAssetType3) => {
  GroupMemberAssetType3["Group"] = "group";
  GroupMemberAssetType3["Array"] = "array";
  GroupMemberAssetType3["Notebook"] = "notebook";
  GroupMemberAssetType3["Dashboard"] = "dashboard";
  GroupMemberAssetType3["UserDefinedFunction"] = "user_defined_function";
  GroupMemberAssetType3["MlModel"] = "ml_model";
  GroupMemberAssetType3["File"] = "file";
  return GroupMemberAssetType3;
})(GroupMemberAssetType2 || {});
var GroupMemberType2 = /* @__PURE__ */ ((GroupMemberType3) => {
  GroupMemberType3["Group"] = "GROUP";
  GroupMemberType3["Array"] = "ARRAY";
  return GroupMemberType3;
})(GroupMemberType2 || {});
var Layout2 = /* @__PURE__ */ ((Layout3) => {
  Layout3["RowMajor"] = "row-major";
  Layout3["ColMajor"] = "col-major";
  Layout3["GlobalOrder"] = "global-order";
  Layout3["Unordered"] = "unordered";
  return Layout3;
})(Layout2 || {});
var Querystatus2 = /* @__PURE__ */ ((Querystatus3) => {
  Querystatus3["Failed"] = "FAILED";
  Querystatus3["Completed"] = "COMPLETED";
  Querystatus3["Inprogress"] = "INPROGRESS";
  Querystatus3["Incomplete"] = "INCOMPLETE";
  Querystatus3["Uninitialized"] = "UNINITIALIZED";
  return Querystatus3;
})(Querystatus2 || {});
var Querytype2 = /* @__PURE__ */ ((Querytype3) => {
  Querytype3["Read"] = "READ";
  Querytype3["Write"] = "WRITE";
  return Querytype3;
})(Querytype2 || {});
var ArrayApiAxiosParamCreator2 = function(configuration) {
  return {
    arrayActivityLog: async (namespace, array, start, end, eventTypes, taskId, hasTaskId, page, perPage, options = {}) => {
      assertParamExists2("arrayActivityLog", "namespace", namespace);
      assertParamExists2("arrayActivityLog", "array", array);
      const localVarPath = `/arrays/{namespace}/{array}/activity`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (start !== void 0) {
        localVarQueryParameter["start"] = start;
      }
      if (end !== void 0) {
        localVarQueryParameter["end"] = end;
      }
      if (eventTypes) {
        localVarQueryParameter["event_types"] = eventTypes;
      }
      if (taskId !== void 0) {
        localVarQueryParameter["task_id"] = taskId;
      }
      if (hasTaskId !== void 0) {
        localVarQueryParameter["has_task_id"] = hasTaskId;
      }
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var ArrayApiFp2 = function(configuration) {
  const localVarAxiosParamCreator = ArrayApiAxiosParamCreator2(configuration);
  return {
    async arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, page, perPage, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    }
  };
};
var ArrayApiFactory2 = function(configuration, basePath, axios2) {
  const localVarFp = ArrayApiFp2(configuration);
  return {
    arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, page, perPage, options) {
      return localVarFp.arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, page, perPage, options).then((request) => request(axios2, basePath));
    }
  };
};
var ArrayApi2 = class extends BaseAPI2 {
  arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, page, perPage, options) {
    return ArrayApiFp2(this.configuration).arrayActivityLog(namespace, array, start, end, eventTypes, taskId, hasTaskId, page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
};
var GroupsApiAxiosParamCreator2 = function(configuration) {
  return {
    createGroup: async (groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupCreation, options = {}) => {
      assertParamExists2("createGroup", "groupNamespace", groupNamespace);
      const localVarPath = `/groups/{group_namespace}`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded2(groupCreation, localVarRequestOptions, configuration);
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deregisterGroup: async (groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options = {}) => {
      assertParamExists2("deregisterGroup", "groupNamespace", groupNamespace);
      assertParamExists2("deregisterGroup", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getGroupMetadata: async (groupNamespace, groupName, metadataRetrieval, options = {}) => {
      assertParamExists2("getGroupMetadata", "groupNamespace", groupNamespace);
      assertParamExists2("getGroupMetadata", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}/metadata`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded2(metadataRetrieval, localVarRequestOptions, configuration);
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    groupsGroupNamespaceGroupNameOptions: async (groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options = {}) => {
      assertParamExists2("groupsGroupNamespaceGroupNameOptions", "groupNamespace", groupNamespace);
      assertParamExists2("groupsGroupNamespaceGroupNameOptions", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "OPTIONS", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    registerGroup: async (groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRegistration, options = {}) => {
      assertParamExists2("registerGroup", "groupNamespace", groupNamespace);
      const localVarPath = `/groups/{group_namespace}`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded2(groupRegistration, localVarRequestOptions, configuration);
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    retrieveGroup: async (groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRetrieval, options = {}) => {
      assertParamExists2("retrieveGroup", "groupNamespace", groupNamespace);
      assertParamExists2("retrieveGroup", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded2(groupRetrieval, localVarRequestOptions, configuration);
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateGroupContents: async (groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupUpdateContents, options = {}) => {
      assertParamExists2("updateGroupContents", "groupNamespace", groupNamespace);
      assertParamExists2("updateGroupContents", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (xTILEDBCLOUDACCESSCREDENTIALSNAME !== void 0 && xTILEDBCLOUDACCESSCREDENTIALSNAME !== null) {
        localVarHeaderParameter["X-TILEDB-CLOUD-ACCESS-CREDENTIALS-NAME"] = String(xTILEDBCLOUDACCESSCREDENTIALSNAME);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded2(groupUpdateContents, localVarRequestOptions, configuration);
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateGroupMetadata: async (groupNamespace, groupName, metadataUpdating, options = {}) => {
      assertParamExists2("updateGroupMetadata", "groupNamespace", groupNamespace);
      assertParamExists2("updateGroupMetadata", "groupName", groupName);
      const localVarPath = `/groups/{group_namespace}/{group_name}/metadata`.replace(`{${"group_namespace"}}`, encodeURIComponent(String(groupNamespace))).replace(`{${"group_name"}}`, encodeURIComponent(String(groupName)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded2(metadataUpdating, localVarRequestOptions, configuration);
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var GroupsApiFp2 = function(configuration) {
  const localVarAxiosParamCreator = GroupsApiAxiosParamCreator2(configuration);
  return {
    async createGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupCreation, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.createGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupCreation, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async deregisterGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deregisterGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async getGroupMetadata(groupNamespace, groupName, metadataRetrieval, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getGroupMetadata(groupNamespace, groupName, metadataRetrieval, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async groupsGroupNamespaceGroupNameOptions(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.groupsGroupNamespaceGroupNameOptions(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async registerGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRegistration, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.registerGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRegistration, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async retrieveGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRetrieval, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.retrieveGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRetrieval, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async updateGroupContents(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupUpdateContents, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateGroupContents(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupUpdateContents, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async updateGroupMetadata(groupNamespace, groupName, metadataUpdating, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateGroupMetadata(groupNamespace, groupName, metadataUpdating, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    }
  };
};
var GroupsApiFactory2 = function(configuration, basePath, axios2) {
  const localVarFp = GroupsApiFp2(configuration);
  return {
    createGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupCreation, options) {
      return localVarFp.createGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupCreation, options).then((request) => request(axios2, basePath));
    },
    deregisterGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
      return localVarFp.deregisterGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options).then((request) => request(axios2, basePath));
    },
    getGroupMetadata(groupNamespace, groupName, metadataRetrieval, options) {
      return localVarFp.getGroupMetadata(groupNamespace, groupName, metadataRetrieval, options).then((request) => request(axios2, basePath));
    },
    groupsGroupNamespaceGroupNameOptions(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
      return localVarFp.groupsGroupNamespaceGroupNameOptions(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options).then((request) => request(axios2, basePath));
    },
    registerGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRegistration, options) {
      return localVarFp.registerGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRegistration, options).then((request) => request(axios2, basePath));
    },
    retrieveGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRetrieval, options) {
      return localVarFp.retrieveGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRetrieval, options).then((request) => request(axios2, basePath));
    },
    updateGroupContents(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupUpdateContents, options) {
      return localVarFp.updateGroupContents(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupUpdateContents, options).then((request) => request(axios2, basePath));
    },
    updateGroupMetadata(groupNamespace, groupName, metadataUpdating, options) {
      return localVarFp.updateGroupMetadata(groupNamespace, groupName, metadataUpdating, options).then((request) => request(axios2, basePath));
    }
  };
};
var GroupsApi2 = class extends BaseAPI2 {
  createGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupCreation, options) {
    return GroupsApiFp2(this.configuration).createGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupCreation, options).then((request) => request(this.axios, this.basePath));
  }
  deregisterGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
    return GroupsApiFp2(this.configuration).deregisterGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options).then((request) => request(this.axios, this.basePath));
  }
  getGroupMetadata(groupNamespace, groupName, metadataRetrieval, options) {
    return GroupsApiFp2(this.configuration).getGroupMetadata(groupNamespace, groupName, metadataRetrieval, options).then((request) => request(this.axios, this.basePath));
  }
  groupsGroupNamespaceGroupNameOptions(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options) {
    return GroupsApiFp2(this.configuration).groupsGroupNamespaceGroupNameOptions(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, options).then((request) => request(this.axios, this.basePath));
  }
  registerGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRegistration, options) {
    return GroupsApiFp2(this.configuration).registerGroup(groupNamespace, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRegistration, options).then((request) => request(this.axios, this.basePath));
  }
  retrieveGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRetrieval, options) {
    return GroupsApiFp2(this.configuration).retrieveGroup(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupRetrieval, options).then((request) => request(this.axios, this.basePath));
  }
  updateGroupContents(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupUpdateContents, options) {
    return GroupsApiFp2(this.configuration).updateGroupContents(groupNamespace, groupName, xTILEDBCLOUDACCESSCREDENTIALSNAME, groupUpdateContents, options).then((request) => request(this.axios, this.basePath));
  }
  updateGroupMetadata(groupNamespace, groupName, metadataUpdating, options) {
    return GroupsApiFp2(this.configuration).updateGroupMetadata(groupNamespace, groupName, metadataUpdating, options).then((request) => request(this.axios, this.basePath));
  }
};
var OrganizationApiAxiosParamCreator2 = function(configuration) {
  return {
    addCredential: async (namespace, accessCredential, provider, page, perPage, options = {}) => {
      assertParamExists2("addCredential", "namespace", namespace);
      assertParamExists2("addCredential", "accessCredential", accessCredential);
      const localVarPath = `/credentials/{namespace}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (provider !== void 0) {
        localVarQueryParameter["provider"] = provider;
      }
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded2(accessCredential, localVarRequestOptions, configuration);
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteCredential: async (namespace, name, options = {}) => {
      assertParamExists2("deleteCredential", "namespace", namespace);
      assertParamExists2("deleteCredential", "name", name);
      const localVarPath = `/credentials/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getCredential: async (namespace, name, options = {}) => {
      assertParamExists2("getCredential", "namespace", namespace);
      assertParamExists2("getCredential", "name", name);
      const localVarPath = `/credentials/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listCredentials: async (namespace, provider, page, perPage, options = {}) => {
      assertParamExists2("listCredentials", "namespace", namespace);
      const localVarPath = `/credentials/{namespace}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (provider !== void 0) {
        localVarQueryParameter["provider"] = provider;
      }
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateCredential: async (namespace, name, accessCredential, options = {}) => {
      assertParamExists2("updateCredential", "namespace", namespace);
      assertParamExists2("updateCredential", "name", name);
      assertParamExists2("updateCredential", "accessCredential", accessCredential);
      const localVarPath = `/credentials/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded2(accessCredential, localVarRequestOptions, configuration);
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var OrganizationApiFp2 = function(configuration) {
  const localVarAxiosParamCreator = OrganizationApiAxiosParamCreator2(configuration);
  return {
    async addCredential(namespace, accessCredential, provider, page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addCredential(namespace, accessCredential, provider, page, perPage, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async deleteCredential(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteCredential(namespace, name, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async getCredential(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getCredential(namespace, name, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async listCredentials(namespace, provider, page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listCredentials(namespace, provider, page, perPage, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async updateCredential(namespace, name, accessCredential, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateCredential(namespace, name, accessCredential, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    }
  };
};
var OrganizationApiFactory2 = function(configuration, basePath, axios2) {
  const localVarFp = OrganizationApiFp2(configuration);
  return {
    addCredential(namespace, accessCredential, provider, page, perPage, options) {
      return localVarFp.addCredential(namespace, accessCredential, provider, page, perPage, options).then((request) => request(axios2, basePath));
    },
    deleteCredential(namespace, name, options) {
      return localVarFp.deleteCredential(namespace, name, options).then((request) => request(axios2, basePath));
    },
    getCredential(namespace, name, options) {
      return localVarFp.getCredential(namespace, name, options).then((request) => request(axios2, basePath));
    },
    listCredentials(namespace, provider, page, perPage, options) {
      return localVarFp.listCredentials(namespace, provider, page, perPage, options).then((request) => request(axios2, basePath));
    },
    updateCredential(namespace, name, accessCredential, options) {
      return localVarFp.updateCredential(namespace, name, accessCredential, options).then((request) => request(axios2, basePath));
    }
  };
};
var OrganizationApi2 = class extends BaseAPI2 {
  addCredential(namespace, accessCredential, provider, page, perPage, options) {
    return OrganizationApiFp2(this.configuration).addCredential(namespace, accessCredential, provider, page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
  deleteCredential(namespace, name, options) {
    return OrganizationApiFp2(this.configuration).deleteCredential(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  getCredential(namespace, name, options) {
    return OrganizationApiFp2(this.configuration).getCredential(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  listCredentials(namespace, provider, page, perPage, options) {
    return OrganizationApiFp2(this.configuration).listCredentials(namespace, provider, page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
  updateCredential(namespace, name, accessCredential, options) {
    return OrganizationApiFp2(this.configuration).updateCredential(namespace, name, accessCredential, options).then((request) => request(this.axios, this.basePath));
  }
};
var QueryApiAxiosParamCreator2 = function(configuration) {
  return {
    submitQuery: async (namespace, array, type2, contentType, query, xPayer, openAt, readAll, options = {}) => {
      assertParamExists2("submitQuery", "namespace", namespace);
      assertParamExists2("submitQuery", "array", array);
      assertParamExists2("submitQuery", "type", type2);
      assertParamExists2("submitQuery", "contentType", contentType);
      assertParamExists2("submitQuery", "query", query);
      const localVarPath = `/arrays/{namespace}/{array}/query/submit`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"array"}}`, encodeURIComponent(String(array)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (type2 !== void 0) {
        localVarQueryParameter["type"] = type2;
      }
      if (openAt !== void 0) {
        localVarQueryParameter["open_at"] = openAt;
      }
      if (readAll !== void 0) {
        localVarQueryParameter["read_all"] = readAll;
      }
      if (contentType !== void 0 && contentType !== null) {
        localVarHeaderParameter["Content-Type"] = String(contentType);
      }
      if (xPayer !== void 0 && xPayer !== null) {
        localVarHeaderParameter["X-Payer"] = String(xPayer);
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded2(query, localVarRequestOptions, configuration);
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var QueryApiFp2 = function(configuration) {
  const localVarAxiosParamCreator = QueryApiAxiosParamCreator2(configuration);
  return {
    async submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, readAll, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, readAll, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    }
  };
};
var QueryApiFactory2 = function(configuration, basePath, axios2) {
  const localVarFp = QueryApiFp2(configuration);
  return {
    submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, readAll, options) {
      return localVarFp.submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, readAll, options).then((request) => request(axios2, basePath));
    }
  };
};
var QueryApi2 = class extends BaseAPI2 {
  submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, readAll, options) {
    return QueryApiFp2(this.configuration).submitQuery(namespace, array, type2, contentType, query, xPayer, openAt, readAll, options).then((request) => request(this.axios, this.basePath));
  }
};
var UserApiAxiosParamCreator2 = function(configuration) {
  return {
    addCredential: async (namespace, accessCredential, provider, page, perPage, options = {}) => {
      assertParamExists2("addCredential", "namespace", namespace);
      assertParamExists2("addCredential", "accessCredential", accessCredential);
      const localVarPath = `/credentials/{namespace}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (provider !== void 0) {
        localVarQueryParameter["provider"] = provider;
      }
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded2(accessCredential, localVarRequestOptions, configuration);
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    deleteCredential: async (namespace, name, options = {}) => {
      assertParamExists2("deleteCredential", "namespace", namespace);
      assertParamExists2("deleteCredential", "name", name);
      const localVarPath = `/credentials/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    getCredential: async (namespace, name, options = {}) => {
      assertParamExists2("getCredential", "namespace", namespace);
      assertParamExists2("getCredential", "name", name);
      const localVarPath = `/credentials/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    listCredentials: async (namespace, provider, page, perPage, options = {}) => {
      assertParamExists2("listCredentials", "namespace", namespace);
      const localVarPath = `/credentials/{namespace}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      if (provider !== void 0) {
        localVarQueryParameter["provider"] = provider;
      }
      if (page !== void 0) {
        localVarQueryParameter["page"] = page;
      }
      if (perPage !== void 0) {
        localVarQueryParameter["per_page"] = perPage;
      }
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    updateCredential: async (namespace, name, accessCredential, options = {}) => {
      assertParamExists2("updateCredential", "namespace", namespace);
      assertParamExists2("updateCredential", "name", name);
      assertParamExists2("updateCredential", "accessCredential", accessCredential);
      const localVarPath = `/credentials/{namespace}/{name}`.replace(`{${"namespace"}}`, encodeURIComponent(String(namespace))).replace(`{${"name"}}`, encodeURIComponent(String(name)));
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL2);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = { method: "PATCH", ...baseOptions, ...options };
      const localVarHeaderParameter = {};
      const localVarQueryParameter = {};
      await setApiKeyToObject2(localVarHeaderParameter, "X-TILEDB-REST-API-KEY", configuration);
      setBasicAuthToObject2(localVarRequestOptions, configuration);
      localVarHeaderParameter["Content-Type"] = "application/json";
      setSearchParams2(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      if (localVarRequestOptions.method === "GET" && localVarRequestOptions.headers.Accept === "application/capnp") {
        localVarRequestOptions.responseType = options.responseType || "arraybuffer";
      }
      localVarRequestOptions.data = serializeDataIfNeeded2(accessCredential, localVarRequestOptions, configuration);
      return {
        url: toPathString2(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};
var UserApiFp2 = function(configuration) {
  const localVarAxiosParamCreator = UserApiAxiosParamCreator2(configuration);
  return {
    async addCredential(namespace, accessCredential, provider, page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addCredential(namespace, accessCredential, provider, page, perPage, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async deleteCredential(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteCredential(namespace, name, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async getCredential(namespace, name, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getCredential(namespace, name, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async listCredentials(namespace, provider, page, perPage, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listCredentials(namespace, provider, page, perPage, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    },
    async updateCredential(namespace, name, accessCredential, options) {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateCredential(namespace, name, accessCredential, options);
      return createRequestFunction2(localVarAxiosArgs, import_axios4.default, BASE_PATH2, configuration);
    }
  };
};
var UserApiFactory2 = function(configuration, basePath, axios2) {
  const localVarFp = UserApiFp2(configuration);
  return {
    addCredential(namespace, accessCredential, provider, page, perPage, options) {
      return localVarFp.addCredential(namespace, accessCredential, provider, page, perPage, options).then((request) => request(axios2, basePath));
    },
    deleteCredential(namespace, name, options) {
      return localVarFp.deleteCredential(namespace, name, options).then((request) => request(axios2, basePath));
    },
    getCredential(namespace, name, options) {
      return localVarFp.getCredential(namespace, name, options).then((request) => request(axios2, basePath));
    },
    listCredentials(namespace, provider, page, perPage, options) {
      return localVarFp.listCredentials(namespace, provider, page, perPage, options).then((request) => request(axios2, basePath));
    },
    updateCredential(namespace, name, accessCredential, options) {
      return localVarFp.updateCredential(namespace, name, accessCredential, options).then((request) => request(axios2, basePath));
    }
  };
};
var UserApi2 = class extends BaseAPI2 {
  addCredential(namespace, accessCredential, provider, page, perPage, options) {
    return UserApiFp2(this.configuration).addCredential(namespace, accessCredential, provider, page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
  deleteCredential(namespace, name, options) {
    return UserApiFp2(this.configuration).deleteCredential(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  getCredential(namespace, name, options) {
    return UserApiFp2(this.configuration).getCredential(namespace, name, options).then((request) => request(this.axios, this.basePath));
  }
  listCredentials(namespace, provider, page, perPage, options) {
    return UserApiFp2(this.configuration).listCredentials(namespace, provider, page, perPage, options).then((request) => request(this.axios, this.basePath));
  }
  updateCredential(namespace, name, accessCredential, options) {
    return UserApiFp2(this.configuration).updateCredential(namespace, name, accessCredential, options).then((request) => request(this.axios, this.basePath));
  }
};

// src/v2/configuration.ts
var Configuration2 = class {
  constructor(param = {}) {
    this.apiKey = param.apiKey;
    this.username = param.username;
    this.password = param.password;
    this.accessToken = param.accessToken;
    this.basePath = param.basePath;
    this.baseOptions = param.baseOptions;
    this.formDataCtor = param.formDataCtor;
  }
  isJsonMime(mime) {
    const jsonMime = new RegExp("^(application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(;.*)?$", "i");
    return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === "application/json-patch+json");
  }
  isCapnpMime(mime) {
    return mime === "application/capnp";
  }
};

// src/utils/capnpDeSerializer.ts
var capnp6 = __toESM(require_lib());

// src/utils/capnpQueryDeSerializer.ts
var capnp5 = __toESM(require_lib());
var capnpQueryDeSerializer = (buffer) => {
  const message = new capnp5.Message(buffer, false);
  const query = message.getRoot(Query);
  return {
    attributeBufferHeaders: deserializeAttributeBufferHeaders(query),
    layout: query.getLayout(),
    status: query.getStatus(),
    type: query.getType(),
    writer: deserializeWrite(query),
    reader: deserializeQueryReader(query.getReader()),
    array: deserializeArray(query.getArray()),
    totalFixedLengthBufferBytes: query.getTotalFixedLengthBufferBytes().toNumber(),
    totalVarLenBufferBytes: query.getTotalVarLenBufferBytes().toNumber(),
    totalValidityBufferBytes: query.getTotalValidityBufferBytes().toNumber(),
    varOffsetsMode: query.getVarOffsetsMode(),
    varOffsetsAddExtraElement: query.getVarOffsetsAddExtraElement(),
    varOffsetsBitsize: query.getVarOffsetsBitsize(),
    config: deserializeConfig(query.getConfig()),
    stats: deserializeStats(query.getStats())
  };
};
var capnpQueryDeSerializer_default = capnpQueryDeSerializer;
var deserializeArray = (arr) => {
  return {
    endTimestamp: arr.getEndTimestamp().toNumber(),
    queryType: arr.getQueryType(),
    uri: arr.getUri(),
    startTimestamp: arr.getStartTimestamp().toNumber()
  };
};
var deserializeConfig = (config) => {
  const entries = config.getEntries().map((entry) => ({
    key: entry.getKey(),
    value: entry.getValue()
  }));
  return { entries };
};
var deserializeQueryReader = (reader) => {
  return {
    layout: reader.getLayout(),
    subarray: deserializeSubarray(reader.getSubarray()),
    readState: deserializeReadState(reader.getReadState()),
    condition: deserializeCondition(reader.getCondition()),
    stats: deserializeStats(reader.getStats())
  };
};
var deserializeCondition = (condition) => {
  return {
    clauses: condition.getClauses().map(deserializeConditionClause),
    clauseCombinationOps: condition.getClauseCombinationOps().map((op) => op.toString())
  };
};
var deserializeConditionClause = (conditionClause) => {
  return {
    fieldName: conditionClause.getFieldName(),
    value: conditionClause.getValue().toArray(),
    op: conditionClause.getOp()
  };
};
var deserializeReadState = (readState) => {
  return {
    overflowed: readState.getOverflowed(),
    unsplittable: readState.getUnsplittable(),
    initialized: readState.getInitialized(),
    subarrayPartitioner: deserializeSubarrayPartitioner(
      readState.getSubarrayPartitioner()
    )
  };
};
var deserializeSubarrayPartitioner = (subArrayPartitioner) => {
  return {
    subarray: deserializeSubarray(subArrayPartitioner.getSubarray()),
    budget: deserializeAttributeBufferSize(subArrayPartitioner.getBudget()),
    current: deserializeSubarrayPartitionerPartitionInfo(
      subArrayPartitioner.getCurrent()
    ),
    state: deserializeSubarrayPartitionerState(subArrayPartitioner.getState()),
    memoryBudget: subArrayPartitioner.getMemoryBudget().toNumber(),
    memoryBudgetVar: subArrayPartitioner.getMemoryBudgetVar().toNumber(),
    memoryBudgetValidity: subArrayPartitioner.getMemoryBudgetValidity().toNumber(),
    stats: deserializeStats(subArrayPartitioner.getStats())
  };
};
var deserializeSubarrayPartitionerState = (partitionerState) => {
  return {
    start: partitionerState.getStart().toNumber(),
    end: partitionerState.getEnd().toNumber(),
    singleRange: partitionerState.getSingleRange().map((singleRange) => deserializeSubarray(singleRange)),
    multiRange: partitionerState.getMultiRange().map((singleRange) => deserializeSubarray(singleRange))
  };
};
var deserializeSubarrayPartitionerPartitionInfo = (partitionInfo) => {
  return {
    subarray: deserializeSubarray(partitionInfo.getSubarray()),
    start: partitionInfo.getStart().toNumber(),
    end: partitionInfo.getEnd().toNumber(),
    splitMultiRange: partitionInfo.getSplitMultiRange()
  };
};
var deserializeAttributeBufferSize = (attrBufferSizeList) => {
  return attrBufferSizeList.map((attr) => ({
    attribute: attr.getAttribute()
  }));
};
var deserializeAttributeBufferHeaders = (query) => {
  return query.getAttributeBufferHeaders().map((attrBufferHeader) => {
    return {
      name: attrBufferHeader.getName(),
      fixedLenBufferSizeInBytes: attrBufferHeader.getFixedLenBufferSizeInBytes().toNumber(),
      varLenBufferSizeInBytes: attrBufferHeader.getVarLenBufferSizeInBytes().toNumber(),
      validityLenBufferSizeInBytes: attrBufferHeader.getValidityLenBufferSizeInBytes().toNumber(),
      originalFixedLenBufferSizeInBytes: attrBufferHeader.getOriginalFixedLenBufferSizeInBytes().toNumber(),
      originalVarLenBufferSizeInBytes: attrBufferHeader.getOriginalVarLenBufferSizeInBytes().toNumber(),
      originalValidityLenBufferSizeInBytes: attrBufferHeader.getOriginalValidityLenBufferSizeInBytes().toNumber()
    };
  });
};
var deserializeWrite = (query) => {
  const writer = query.getWriter();
  return {
    checkCoordDups: writer.getCheckCoordDups(),
    checkCoordOOB: writer.getCheckCoordOOB(),
    dedupCoords: writer.getDedupCoords(),
    subarray: deserializeDomainArray(writer.getSubarray()),
    subarrayRanges: deserializeSubarray(writer.getSubarrayRanges()),
    stats: deserializeStats(writer.getStats())
  };
};
var deserializeDomainArray = (domainArray) => {
  return {
    int8: domainArray.getInt8().toArray(),
    uint8: domainArray.getUint8().toArray(),
    int16: domainArray.getInt16().toArray(),
    uint16: domainArray.getUint16().toArray(),
    int32: domainArray.getInt32().toArray(),
    uint32: domainArray.getUint32().toArray(),
    int64: domainArray.getInt64().toArray(),
    uint64: domainArray.getUint64().toArray(),
    float32: domainArray.getFloat32().toArray(),
    float64: domainArray.getFloat64().toArray()
  };
};
var deserializeSubarray = (subArray) => {
  return {
    layout: subArray.getLayout(),
    stats: deserializeStats(subArray.getStats()),
    ranges: subArray.getRanges().map((range2) => {
      const type2 = range2.getType();
      const bufferSizes = range2.getBufferSizes().map((uint64) => uint64.toNumber());
      return {
        type: type2,
        hasDefaultRange: range2.getHasDefaultRange(),
        buffer: range2.getBuffer().toArray(),
        bufferSizes,
        bufferStartSizes: range2.getBufferStartSizes().map((uint64) => uint64.toNumber())
      };
    })
  };
};
var deserializeStats = (stats) => {
  return {
    timers: deserializeMapFloat64(stats.getTimers()),
    counters: deserializeMapUInt64(stats.getCounters())
  };
};
var deserializeMapFloat64 = (mapFloat64) => {
  return mapFloat64.getEntries().map((entry) => {
    return {
      key: entry.getKey(),
      value: entry.getValue()
    };
  });
};
var deserializeMapUInt64 = (mapUint64) => {
  return mapUint64.getEntries().map((entry) => {
    return {
      key: entry.getKey(),
      value: entry.getValue().toNumber()
    };
  });
};

// src/utils/capnpDeSerializer.ts
var DeserializableType = /* @__PURE__ */ ((DeserializableType2) => {
  DeserializableType2[DeserializableType2["arrayMetadata"] = 0] = "arrayMetadata";
  DeserializableType2[DeserializableType2["query"] = 1] = "query";
  return DeserializableType2;
})(DeserializableType || {});
var deserializeCapnp = (data, type2) => {
  if (!isArrayBuffer(data)) {
    throw new Error(`Data is not of type ArrayBuffer`);
  }
  if (type2 === 1 /* query */) {
    return capnpQueryDeSerializer_default(data);
  }
  if (type2 === 0 /* arrayMetadata */) {
    return capnpArrayMetadaDeSerializer(data);
  }
};
var capnpArrayMetadaDeSerializer = (buffer) => {
  const message = new capnp6.Message(buffer, false);
  const arrayMetadata = message.getRoot(ArrayMetadata);
  const entries = arrayMetadata.getEntries().map((entry) => {
    const value = entry.getValue().toArray();
    return {
      value,
      del: entry.getDel(),
      key: entry.getKey(),
      type: entry.getType(),
      valueNum: entry.getValueNum()
    };
  });
  return { entries };
};
var isArrayBuffer = (data) => {
  if (data && data.byteLength && data.slice) {
    return true;
  }
  return false;
};

// src/utils/flatten.ts
var flatten = (list) => list.flat();
var flatten_default = flatten;

// src/utils/mapToBigIntIfNeeded.ts
var int64Types = [
  "INT64" /* Int64 */,
  "UINT64" /* Uint64 */,
  "DATETIME_AS" /* DatetimeAs */,
  "DATETIME_DAY" /* DatetimeDay */,
  "DATETIME_FS" /* DatetimeFs */,
  "DATETIME_HR" /* DatetimeHr */,
  "DATETIME_MIN" /* DatetimeMin */,
  "DATETIME_MONTH" /* DatetimeMonth */,
  "DATETIME_MS" /* DatetimeMs */,
  "DATETIME_NS" /* DatetimeNs */,
  "DATETIME_PS" /* DatetimePs */,
  "DATETIME_SEC" /* DatetimeSec */,
  "DATETIME_US" /* DatetimeUs */,
  "DATETIME_WEEK" /* DatetimeWeek */,
  "DATETIME_YEAR" /* DatetimeYear */
];
var mapToBigIntIfNeeded = (data, type2) => {
  let nums = data;
  if (int64Types.includes(type2) && typeof nums[0] === "number") {
    nums = data.map(BigInt);
  }
  return nums;
};
var mapToBigIntIfNeeded_default = mapToBigIntIfNeeded;

// src/utils/getTypedArrayFromDataType.ts
var getTypedArrayFromDataType = (type2) => {
  if (type2 === "INT32" /* Int32 */) {
    return Int32Array;
  } else if (type2 === "INT16" /* Int16 */) {
    return Int16Array;
  } else if (type2 === "INT8" /* Int8 */) {
    return Int8Array;
  } else if (type2 === "INT64" /* Int64 */) {
    return BigInt64Array;
  } else if (type2 === "UINT16" /* Uint16 */) {
    return Uint16Array;
  } else if (type2 === "UINT32" /* Uint32 */) {
    return Uint32Array;
  } else if (type2 === "UINT8" /* Uint8 */) {
    return Uint8Array;
  } else if (type2 === "UINT64" /* Uint64 */) {
    return BigUint64Array;
  } else if (type2 === "FLOAT32" /* Float32 */) {
    return Float32Array;
  } else if (type2 === "FLOAT64" /* Float64 */) {
    return Float64Array;
  } else if (int64Types.includes(type2)) {
    return BigInt64Array;
  }
};
var getTypedArrayFromDataType_default = getTypedArrayFromDataType;

// src/utils/rangesToBuffer.ts
var rangesToBuffer = (ranges, type2) => {
  const TypedArray = getTypedArrayFromDataType_default(type2);
  if (TypedArray) {
    const nums = mapToBigIntIfNeeded_default(ranges, type2);
    const dataview = TypedArray.from(nums);
    const uint8Array = new Uint8Array(dataview.buffer, 0, dataview.byteLength);
    return Array.from(uint8Array);
  } else if (type2 === "STRING_ASCII" /* StringAscii */) {
    const asciiArray = ranges.reduce((arr, str) => {
      const charCodes = str.split("").map((s, i) => str.charCodeAt(i));
      return [...arr, ...charCodes];
    }, []);
    return flatten_default(asciiArray);
  }
};
var rangesToBuffer_default = rangesToBuffer;

// src/utils/getByteLengthOfData.ts
var getByteLengthOfData = (data, type2) => {
  if (!data.length) {
    return 0;
  }
  const TypedArray = getTypedArrayFromDataType_default(type2);
  if (TypedArray) {
    const nums = mapToBigIntIfNeeded_default(data, type2);
    return TypedArray.from(nums).byteLength;
  }
  if (type2 === "CHAR" /* Char */ || "STRING_ASCII" /* StringAscii */) {
    return data.reduce((accum, str) => accum + (str == null ? void 0 : str.length), 0);
  }
  if (type2 === "STRING_UCS2" /* StringUcs2 */) {
    return data.reduce((accum, str) => accum + (str == null ? void 0 : str.length) * 2, 0);
  }
  if (type2 === "STRING_UCS4" /* StringUcs4 */) {
    return data.reduce((accum, str) => accum + (str == null ? void 0 : str.length) * 4, 0);
  }
  if (type2 === "STRING_UTF8" /* StringUtf8 */) {
    const encoder = new TextEncoder();
    const encodedStr = data.map((str) => encoder.encode(str));
    return encodedStr.reduce((accum, encodedString) => {
      return accum + encodedString.byteLength;
    }, 0);
  }
};
var getByteLengthOfData_default = getByteLengthOfData;

// src/utils/getRanges.ts
var isNumberArray = (data) => {
  return typeof data[0] === "number";
};
var getRanges = (ranges, dimensions, hasDefaultRange) => {
  return ranges.map((range2, i) => {
    const [firstRange] = range2;
    const type2 = dimensions[i].type;
    const isArrayOfArrays = Array.isArray(firstRange);
    const isArrayOfInts = isNumberArray(flatten_default(range2));
    const isEmpty = !range2.length;
    const bufferSizes = isArrayOfArrays ? range2.map((r) => getByteLengthOfData_default(r, type2)) : [getByteLengthOfData_default(range2, type2)];
    const startRanges = isArrayOfArrays ? range2.map((r) => r[0]) : [firstRange];
    const bufferStartSizes = startRanges.map(
      (startingRange) => {
        if (!startingRange) {
          return 0;
        }
        return getByteLengthOfData_default([startingRange], type2);
      }
    );
    if (isArrayOfInts) {
      bufferStartSizes.fill(0);
    }
    return {
      type: type2,
      hasDefaultRange: isEmpty || !!hasDefaultRange,
      buffer: rangesToBuffer_default(flatten_default(range2), type2),
      bufferSizes,
      bufferStartSizes: isEmpty ? [0] : bufferStartSizes
    };
  });
};
var getRanges_default = getRanges;

// src/utils/getByteLengthOfDatatype.ts
var getByteLengthOfDatatype = (type2) => {
  const TypedArray = getTypedArrayFromDataType_default(type2);
  if (TypedArray) {
    return TypedArray.BYTES_PER_ELEMENT;
  } else if (type2 === "STRING_ASCII" /* StringAscii */ || type2 === "CHAR" /* Char */ || type2 === "STRING_UTF8" /* StringUtf8 */) {
    return 1;
  } else if (type2 === "STRING_UCS2" /* StringUcs2 */ || type2 === "STRING_UTF16" /* StringUtf16 */) {
    return 2;
  } else if (type2 === "STRING_UTF32" /* StringUtf32 */ || type2 === "STRING_UCS4" /* StringUcs4 */) {
    return 4;
  }
};
var getByteLengthOfDatatype_default = getByteLengthOfDatatype;

// src/utils/emptyRangesToDomain.ts
var emptyRangesToDomain = (ranges, dimensions) => {
  return ranges.map((range2, i) => {
    const isEmpty = !range2.length;
    const domain = dimensions[i].domain;
    if (!isEmpty) {
      return range2;
    }
    if (domain) {
      const [firstValue] = Object.values(domain);
      return firstValue;
    }
    return range2;
  });
};
var emptyRangesToDomain_default = emptyRangesToDomain;

// src/utils/isDimension.ts
var isDimension = (data) => {
  return data.hasOwnProperty("nullTileExtent");
};
var isDimension_default = isDimension;

// src/utils/isAttributeVarLength.ts
var isAttributeVarLength = (attribute) => {
  if (isDimension_default(attribute)) {
    return attribute.type === "STRING_ASCII" /* StringAscii */;
  }
  return attribute.cellValNum == 4294967295;
};
var isAttributeVarLength_default = isAttributeVarLength;

// src/utils/isAttributeNullable.ts
var isAttributeNullable = (attribute) => {
  if (isDimension_default(attribute)) {
    return false;
  }
  return attribute.nullable;
};
var isAttributeNullable_default = isAttributeNullable;

// src/utils/dataToQuery.ts
var createAttributeBufferHeaders = (attributes, bufferSize) => {
  const MAX_BYTES_PER_ELEMENT_OF_ATTRIBUTES = attributes.reduce(
    (accum, attr) => accum + getMaxByteSizeOfAttribute(attr),
    0
  );
  const attributeBufferHeaders = attributes.map((attr) => {
    const MAX_BYTES_FOR_ATTRIBUTE = getMaxByteSizeOfAttribute(attr);
    const WEIGHT = MAX_BYTES_FOR_ATTRIBUTE / MAX_BYTES_PER_ELEMENT_OF_ATTRIBUTES;
    const BYTES_FOR_ATTRIBUTE = bufferSize * WEIGHT;
    const isVarLength = isAttributeVarLength_default(attr);
    const isNullable = isAttributeNullable_default(attr);
    const BYTES_PER_ELEMENT = getByteLengthOfDatatype_default(attr.type);
    const BYTE_PER_OFFSET = getByteLengthOfDatatype_default("UINT64" /* Uint64 */);
    const TOTAL_BYTES_PER_ELEMENT = BYTES_FOR_ATTRIBUTE * (BYTES_PER_ELEMENT / MAX_BYTES_FOR_ATTRIBUTE);
    const TOTAL_BYTE_PER_VALIDITY = BYTES_FOR_ATTRIBUTE / MAX_BYTES_FOR_ATTRIBUTE;
    const TOTAL_BYTE_PER_OFFSET = BYTES_FOR_ATTRIBUTE * (BYTE_PER_OFFSET / MAX_BYTES_FOR_ATTRIBUTE);
    const fixedLenBufferSizeInBytes = isVarLength ? TOTAL_BYTE_PER_OFFSET : TOTAL_BYTES_PER_ELEMENT;
    const varLenBufferSizeInBytes = isVarLength ? TOTAL_BYTES_PER_ELEMENT : 0;
    const validityLenBufferSizeInBytes = isNullable ? TOTAL_BYTE_PER_VALIDITY : 0;
    return {
      name: attr.name,
      fixedLenBufferSizeInBytes: 0,
      varLenBufferSizeInBytes: 0,
      validityLenBufferSizeInBytes: 0,
      originalFixedLenBufferSizeInBytes: Math.floor(fixedLenBufferSizeInBytes),
      originalVarLenBufferSizeInBytes: Math.floor(varLenBufferSizeInBytes),
      originalValidityLenBufferSizeInBytes: Math.floor(
        validityLenBufferSizeInBytes
      )
    };
  });
  return attributeBufferHeaders;
};
var getMaxByteSizeOfAttribute = (attribute) => {
  const isVarLength = isAttributeVarLength_default(attribute);
  const isNullable = isAttributeNullable_default(attribute);
  const BYTES_PER_ELEMENT = getByteLengthOfDatatype_default(attribute.type);
  const BYTE_PER_VALIDITY = getByteLengthOfDatatype_default("UINT8" /* Uint8 */);
  const BYTE_PER_OFFSET = getByteLengthOfDatatype_default("UINT64" /* Uint64 */);
  return Number(isVarLength) * BYTE_PER_OFFSET + BYTES_PER_ELEMENT + Number(isNullable) * BYTE_PER_VALIDITY;
};
var dataToQuery = (data, attributes, dimensions, options) => {
  if (!data.layout) {
    return data;
  }
  const { bufferSize } = data;
  const rangesWithDomain = emptyRangesToDomain_default(data.ranges, dimensions);
  const ranges = getRanges_default(rangesWithDomain, dimensions);
  const attributesAndDimensions = [...attributes, ...dimensions];
  const selectedAttributes = options.attributes ? attributesAndDimensions.filter(
    (attr) => options.attributes.includes(attr.name)
  ) : attributesAndDimensions;
  const attributeBufferHeaders = createAttributeBufferHeaders(
    selectedAttributes,
    bufferSize
  );
  return {
    attributeBufferHeaders,
    layout: data.layout,
    status: "UNINITIALIZED" /* Uninitialized */,
    type: "READ" /* Read */,
    reader: {
      layout: data.layout,
      subarray: {
        layout: data.layout,
        ranges
      },
      readState: {
        subarrayPartitioner: {
          subarray: {
            layout: data.layout,
            ranges: []
          },
          budget: [],
          current: {
            subarray: {
              layout: data.layout,
              ranges: []
            }
          }
        }
      }
    }
  };
};
var dataToQuery_default = dataToQuery;

// src/utils/dataToQueryWriter.ts
var dataToQueryWriter = (data, dimensions, valueBuffer) => {
  const attributeBufferHeaders = Object.entries(valueBuffer).map(
    ([key, val]) => {
      const isVarLength = val.offsetsBuffer.byteLength;
      return {
        name: key,
        fixedLenBufferSizeInBytes: val.offsetsBuffer.byteLength || val.valuesBuffer.byteLength,
        varLenBufferSizeInBytes: isVarLength ? val.valuesBuffer.byteLength : 0,
        validityLenBufferSizeInBytes: val.validityBuffer.byteLength,
        originalFixedLenBufferSizeInBytes: val.offsetsBuffer.byteLength || val.valuesBuffer.byteLength,
        originalVarLenBufferSizeInBytes: isVarLength ? val.valuesBuffer.byteLength : 0,
        originalValidityLenBufferSizeInBytes: val.validityBuffer.byteLength
      };
    }
  );
  const dimensionDomains = dimensions.map((dim) => {
    if (!dim.domain) {
      return [];
    }
    const [firstValue] = Object.values(dim.domain);
    return firstValue;
  });
  const { subarray: subarrayRanges } = data;
  const hasDefaultRange = subarrayRanges ? false : true;
  const ranges = getRanges_default(subarrayRanges || dimensionDomains, dimensions, hasDefaultRange);
  const subarray = getSubArray(subarrayRanges, dimensions);
  return {
    attributeBufferHeaders,
    layout: data.layout,
    status: "UNINITIALIZED" /* Uninitialized */,
    type: "WRITE" /* Write */,
    writer: {
      checkCoordDups: false,
      checkCoordOOB: false,
      dedupCoords: false,
      subarray,
      subarrayRanges: {
        layout: data.layout,
        ranges
      }
    }
  };
};
var dataToQueryWriter_default = dataToQueryWriter;
var getSubArray = (ranges, dimensions) => {
  const subarray = {
    int8: [],
    uint8: [],
    int16: [],
    uint16: [],
    int32: [],
    uint32: [],
    int64: [],
    uint64: [],
    float32: [],
    float64: []
  };
  if (!ranges) {
    return subarray;
  }
  const type2 = dimensions[0].type;
  subarray[type2.toLocaleLowerCase()] = flatten_default(ranges);
  return subarray;
};

// src/utils/dataToArrayBuffer.ts
var dataToArrayBuffer = (data = [], type2) => {
  if (!data.length) {
    return new ArrayBuffer(0);
  }
  const TypedArray = getTypedArrayFromDataType_default(type2);
  if (TypedArray) {
    const typedArray = TypedArray.from(data);
    return typedArray.buffer;
  } else if (type2 === "STRING_ASCII" /* StringAscii */ || type2 === "CHAR" /* Char */) {
    const str = Array.isArray(data) ? data.join("") : data;
    const textEncoder = new TextEncoder();
    return textEncoder.encode(str).buffer;
  } else if (type2 === "STRING_UTF8" /* StringUtf8 */) {
    const str = Array.isArray(data) ? data.join("") : data;
    const textEncoder = new TextEncoder();
    return textEncoder.encode(str).buffer;
  } else if (type2 === "STRING_UTF16" /* StringUtf16 */) {
    const str = Array.isArray(data) ? data.join("") : data;
    return utf16StrToArrayBuffer(str);
  } else if (type2 === "STRING_UTF32" /* StringUtf32 */) {
    const str = Array.isArray(data) ? data.join("") : data;
    return utf32StrToArrayBuffer(str);
  } else if (type2 === "STRING_UCS2" /* StringUcs2 */) {
    const str = Array.isArray(data) ? data.join("") : data;
    return utf16StrToArrayBuffer(str);
  } else if (type2 === "STRING_UCS4" /* StringUcs4 */) {
    const str = Array.isArray(data) ? data.join("") : data;
    return utf32StrToArrayBuffer(str);
  }
};
var dataToArrayBuffer_default = dataToArrayBuffer;
function utf16StrToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length * 2);
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
function utf32StrToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length * 4);
  var bufView = new Uint32Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// src/utils/attributeValuesToArrayBuffers.ts
var attributeValuesToArrayBuffers = (values, dimensions, attributes) => {
  const data = {};
  const dimensionsAndAttributes = [...dimensions, ...attributes];
  for (let [attrName, attribute] of Object.entries(values)) {
    const selectedSchema = dimensionsAndAttributes.find(
      (attr) => attr.name === attrName
    );
    const { type: type2 } = selectedSchema;
    const { validity = [], offsets = [], values: values2 = [] } = attribute;
    data[attrName] = {
      offsetsBuffer: dataToArrayBuffer_default(mapToBigIntIfNeeded_default(offsets, "UINT64" /* Uint64 */), "UINT64" /* Uint64 */),
      valuesBuffer: dataToArrayBuffer_default(mapToBigIntIfNeeded_default(values2, type2), type2),
      validityBuffer: dataToArrayBuffer_default(validity, "UINT8" /* Uint8 */)
    };
  }
  return data;
};
var attributeValuesToArrayBuffers_default = attributeValuesToArrayBuffers;

// src/utils/concatArrayBuffers.ts
var concatArrayBuffers = (...buffers) => {
  const result = new Uint8Array(
    buffers.reduce((totalSize, buf) => totalSize + buf.byteLength, 0)
  );
  buffers.reduce((offset, buf) => {
    result.set(new Uint8Array(buf), offset);
    return offset + buf.byteLength;
  }, 0);
  return result.buffer;
};
var concatArrayBuffers_default = concatArrayBuffers;

// src/utils/getWriterBody.ts
var emptyArrayBuffer = new ArrayBuffer(0);
var getWriterBody = (data, arraySchema) => {
  const dimensions = arraySchema.domain.dimensions;
  const attributes = arraySchema.attributes;
  const valueBuffers = attributeValuesToArrayBuffers_default(
    data.values,
    dimensions,
    attributes
  );
  const queryObject = dataToQueryWriter_default(data, dimensions, valueBuffers);
  const querySerialized = capnpQuerySerializer_default(queryObject);
  const attributeBuffersArray = Object.values(valueBuffers).reduce(
    (accum, valueBuffer) => {
      const attributeBuffer = concatArrayBuffers_default(
        valueBuffer.offsetsBuffer,
        valueBuffer.valuesBuffer,
        valueBuffer.validityBuffer
      );
      return concatArrayBuffers_default(accum, attributeBuffer);
    },
    emptyArrayBuffer
  );
  const body = concatArrayBuffers_default(querySerialized, attributeBuffersArray);
  return body;
};
var getWriterBody_default = getWriterBody;

// src/utils/convertToArrayBufferIfNodeBuffer.ts
function convertToArrayBufferIfNodeBuffer(buffer) {
  if (buffer.buffer) {
    return new Uint8Array(buffer).buffer;
  }
  return buffer;
}
var convertToArrayBufferIfNodeBuffer_default = convertToArrayBufferIfNodeBuffer;

// src/utils/getAttributeSizeInBytes.ts
var getAttributeSizeInBytes = (attr) => {
  return attr.fixedLenBufferSizeInBytes + attr.varLenBufferSizeInBytes + attr.validityLenBufferSizeInBytes;
};
var getAttributeSizeInBytes_default = getAttributeSizeInBytes;

// src/utils/getSizeInBytesOfAllAttributes.ts
var getSizeInBytesOfAllAttributes = (attributes) => attributes.reduce((accum, attr) => accum + getAttributeSizeInBytes_default(attr), 0);
var getSizeInBytesOfAllAttributes_default = getSizeInBytesOfAllAttributes;

// src/utils/getAttributeSchema.ts
var getAttributeSchema = (attrName, attributesSchema) => {
  return attributesSchema.find((attr) => attr.name === attrName);
};
var getAttributeSchema_default = getAttributeSchema;

// src/utils/typedArrayToArray.ts
var typedArrayToArray = (typedArray) => Array.from(typedArray);
var typedArrayToArray_default = typedArrayToArray;

// src/utils/bufferToData.ts
var bufferToInt8 = (arrayBuffer) => new Int8Array(arrayBuffer);
var bufferToUint8 = (arrayBuffer) => new Uint8Array(arrayBuffer);
var bufferToUint16 = (arrayBuffer) => new Uint16Array(arrayBuffer);
var bufferToUint32 = (arrayBuffer) => new Uint32Array(arrayBuffer);
var bufferToInt16 = (arrayBuffer) => new Int16Array(arrayBuffer);
var bufferToInt32 = (arrayBuffer) => new Int32Array(arrayBuffer);
var bufferToUint64 = (arrayBuffer) => new BigUint64Array(arrayBuffer);
var bufferToInt64 = (arrayBuffer) => new BigInt64Array(arrayBuffer);
var bufferToFloat32 = (arrayBuffer) => new Float32Array(arrayBuffer);
var bufferToFloat64 = (arrayBuffer) => new Float64Array(arrayBuffer);
var bufferToString = (arrayBuffer) => {
  const utf8decoder = new TextDecoder();
  return utf8decoder.decode(arrayBuffer);
};
var bufferToAscii = (arrayBuffer) => {
  const utf8decoder = new TextDecoder("ascii");
  return utf8decoder.decode(arrayBuffer);
};
var bufferToUTF16 = (arrayBuffer) => {
  const utf8decoder = new TextDecoder("utf-16");
  return utf8decoder.decode(arrayBuffer);
};
var bufferToUTF32 = (arrayBuffer) => {
  const view = new DataView(arrayBuffer, 0, arrayBuffer.byteLength);
  let result = "";
  for (let i = 0; i < arrayBuffer.byteLength; i += 4) {
    result += String.fromCodePoint(view.getInt32(i, true));
  }
  return result;
};
var bufferToData = (arrayBuffer, type2) => {
  if (type2 === "INT32" /* Int32 */) {
    return typedArrayToArray_default(bufferToInt32(arrayBuffer));
  } else if (type2 === "UINT64" /* Uint64 */) {
    return typedArrayToArray_default(bufferToUint64(arrayBuffer));
  } else if (type2 === "INT64" /* Int64 */) {
    return typedArrayToArray_default(bufferToInt64(arrayBuffer));
  } else if (type2 === "FLOAT32" /* Float32 */) {
    return typedArrayToArray_default(bufferToFloat32(arrayBuffer));
  } else if (type2 === "FLOAT64" /* Float64 */) {
    return typedArrayToArray_default(bufferToFloat64(arrayBuffer));
  } else if (type2 === "CHAR" /* Char */) {
    const charCodes = typedArrayToArray_default(bufferToUint8(arrayBuffer));
    return String.fromCharCode(...charCodes);
  } else if (type2 === "INT8" /* Int8 */) {
    return typedArrayToArray_default(bufferToInt8(arrayBuffer));
  } else if (type2 === "UINT8" /* Uint8 */) {
    return typedArrayToArray_default(bufferToUint8(arrayBuffer));
  } else if (type2 === "INT16" /* Int16 */) {
    return typedArrayToArray_default(bufferToInt16(arrayBuffer));
  } else if (type2 === "UINT16" /* Uint16 */) {
    return typedArrayToArray_default(bufferToUint16(arrayBuffer));
  } else if (type2 === "UINT32" /* Uint32 */) {
    return typedArrayToArray_default(bufferToUint32(arrayBuffer));
  } else if (type2 === "STRING_ASCII" /* StringAscii */) {
    return bufferToAscii(arrayBuffer);
  } else if (type2 === "STRING_UTF8" /* StringUtf8 */) {
    return bufferToString(arrayBuffer);
  } else if (type2 === "STRING_UTF16" /* StringUtf16 */) {
    return bufferToUTF16(arrayBuffer);
  } else if (type2 === "STRING_UTF32" /* StringUtf32 */) {
    return bufferToUTF32(arrayBuffer);
  } else if (type2 === "STRING_UCS2" /* StringUcs2 */) {
    return bufferToUTF16(arrayBuffer);
  } else if (type2 === "STRING_UCS4" /* StringUcs4 */) {
    return bufferToUTF32(arrayBuffer);
  } else if (int64Types.includes(type2)) {
    return typedArrayToArray_default(bufferToInt64(arrayBuffer));
  }
  return arrayBuffer;
};
var bufferToData_default = bufferToData;

// src/utils/setNullables.ts
var setNullables = async (values, nullables) => {
  return values.map((val, i) => nullables[i] ? val : null);
};
var setNullables_default = setNullables;

// src/utils/groupValuesByOffsetBytes.ts
var import_paralleljs = __toESM(require_parallel());

// src/utils/range.ts
function range(start, end) {
  return new Array(end - start + 1).fill(void 0).map((_, i) => i + start);
}
var range_default = range;

// src/utils/groupValuesByOffsetBytes.ts
var groupValuesByOffsetBytes = (values, offsets) => {
  const offsetsLength = offsets.length;
  if (!offsetsLength) {
    return Promise.resolve([values]);
  }
  const offsetIndex = range_default(0, offsetsLength - 1);
  const offsetIndexTuple = offsets.map((off, i) => [off, offsetIndex[i]]);
  const offsetsP = new import_paralleljs.default(offsetIndexTuple, {
    env: {
      values,
      offsets
    }
  });
  return new Promise((resolve) => {
    offsetsP.map(([offset, i]) => {
      const vals = globalThis.env.values;
      const globalOffsets = globalThis.env.offsets;
      const nextOffset = globalOffsets[i + 1];
      const grpoupedValues = vals.slice(offset, nextOffset);
      return grpoupedValues;
    }).then(resolve);
  });
};
var groupValuesByOffsetBytes_default = groupValuesByOffsetBytes;

// src/utils/concatChars.ts
var concatChars = (strings) => strings.map((s) => s == null ? void 0 : s.join(""));
var concatChars_default = concatChars;

// src/utils/convertToArray.ts
function convertToArray(arrayLike) {
  if (Array.isArray(arrayLike)) {
    return arrayLike;
  }
  return Array.from(arrayLike);
}
var convertToArray_default = convertToArray;

// src/utils/getResultsFromArrayBuffer.ts
var getResultsFromArrayBuffer = async (arrayBuffer, attributeBufferHeaders, attributesSchema, options = {}) => {
  const data = {};
  await attributeBufferHeaders.reverse().reduce(async (offsetPromise, attribute) => {
    const totalNumberOfBytesOfAttribute = getAttributeSizeInBytes_default(attribute);
    const offset = await offsetPromise;
    if (!totalNumberOfBytesOfAttribute) {
      data[attribute.name] = [];
      return offset;
    }
    const isNullable = !!attribute.validityLenBufferSizeInBytes;
    const isVarLengthSized = !!attribute.varLenBufferSizeInBytes;
    const selectedAttributeSchema = getAttributeSchema_default(
      attribute.name,
      attributesSchema
    );
    const negativeOffset = -1 * offset;
    const start = negativeOffset - totalNumberOfBytesOfAttribute + (isVarLengthSized ? attribute.fixedLenBufferSizeInBytes : 0);
    const ending = negativeOffset - (isNullable ? attribute.validityLenBufferSizeInBytes : 0);
    const end = ending ? ending : void 0;
    let result = bufferToData_default(
      arrayBuffer.slice(start, end),
      selectedAttributeSchema.type
    );
    let offsets = [];
    if (isVarLengthSized && !options.ignoreOffsets) {
      const BYTE_PER_ELEMENT = getByteLengthOfDatatype_default(
        selectedAttributeSchema.type
      );
      const startOfBuffer = negativeOffset - totalNumberOfBytesOfAttribute;
      const offsetsBuffer = arrayBuffer.slice(
        startOfBuffer,
        startOfBuffer + attribute.fixedLenBufferSizeInBytes
      );
      const byteOffsets = Array.from(new BigUint64Array(offsetsBuffer));
      offsets = byteOffsets.map((o) => Number(o / BigInt(BYTE_PER_ELEMENT)));
      const isString = typeof result === "string";
      const groupedValues = await groupValuesByOffsetBytes_default(
        convertToArray_default(result),
        offsets
      );
      result = isString ? concatChars_default(groupedValues) : groupedValues;
    }
    if (isNullable && !options.ignoreNullables) {
      const nullableArrayEnd = ending + attribute.validityLenBufferSizeInBytes;
      const nullableArrayBuffer = arrayBuffer.slice(
        ending,
        nullableArrayEnd ? nullableArrayEnd : void 0
      );
      const nullablesTypedArray = bufferToInt8(nullableArrayBuffer);
      const nullablesArray = Array.from(nullablesTypedArray);
      const values = convertToArray_default(result);
      result = await setNullables_default(values, nullablesArray);
    }
    data[attribute.name] = result;
    return offset + totalNumberOfBytesOfAttribute;
  }, Promise.resolve(0));
  return data;
};
var getResultsFromArrayBuffer_default = getResultsFromArrayBuffer;

// src/TileDBQuery/TileDBQuery.ts
var import_axios5 = __toESM(require_axios2());
var TileDBQuery = class {
  constructor(params, axios2 = import_axios5.default) {
    var _a;
    this.configurationParams = params;
    const config = new Configuration2(this.configurationParams);
    const baseV1 = (_a = config.basePath) == null ? void 0 : _a.replace("v2", "v1");
    const configV1 = new Configuration2({
      ...this.configurationParams,
      ...baseV1 ? { basePath: baseV1 } : {}
    });
    this.queryAPI = new QueryApi2(config, void 0, this.axios);
    this.arrayAPI = new ArrayApi(configV1, void 0, this.axios);
  }
  async WriteQuery(namespace, arrayName, data) {
    var _a, _b, _c, _d;
    try {
      const arraySchemaResponse = await this.arrayAPI.getArray(
        namespace,
        arrayName,
        "application/json"
      );
      const arraySchema = arraySchemaResponse.data;
      const body = getWriterBody_default(data, arraySchema);
      const queryResponse = await this.queryAPI.submitQuery(
        namespace,
        arrayName,
        "WRITE" /* Write */,
        "application/capnp",
        body,
        void 0,
        void 0,
        void 0,
        {
          headers: {
            "Content-Type": "application/capnp"
          },
          responseType: "arraybuffer"
        }
      );
      const queryData = convertToArrayBufferIfNodeBuffer_default(queryResponse.data);
      const bufferWithoutFirstEightBytes = queryData.slice(8);
      return capnpQueryDeSerializer_default(bufferWithoutFirstEightBytes);
    } catch (e) {
      const errorIsABuffer = ((_b = (_a = e == null ? void 0 : e.response) == null ? void 0 : _a.data) == null ? void 0 : _b.buffer) || ((_d = (_c = e == null ? void 0 : e.response) == null ? void 0 : _c.data) == null ? void 0 : _d.length);
      if (errorIsABuffer) {
        const errorArrayBuffer = convertToArrayBufferIfNodeBuffer_default(
          e.response.data
        );
        const decodedMessage = new TextDecoder().decode(errorArrayBuffer);
        throw new Error(decodedMessage);
      } else {
        throw e;
      }
    }
  }
  async ReadIncompleteQuery(arraySchema, queryAsArrayBuffer, namespace, arrayName, options) {
    const queryResponse = await this.queryAPI.submitQuery(
      namespace,
      arrayName,
      "READ" /* Read */,
      "application/capnp",
      queryAsArrayBuffer,
      void 0,
      void 0,
      void 0,
      {
        headers: {
          "Content-Type": "application/capnp"
        },
        responseType: "arraybuffer"
      }
    );
    const queryData = convertToArrayBufferIfNodeBuffer_default(queryResponse.data);
    const bufferWithoutFirstEightBytes = queryData.slice(8);
    const queryObject = capnpQueryDeSerializer_default(bufferWithoutFirstEightBytes);
    const attributeHeaders = queryObject.attributeBufferHeaders;
    const results = await this.getResultsFromArrayBuffer(
      arraySchema,
      bufferWithoutFirstEightBytes,
      attributeHeaders,
      options
    );
    return {
      results,
      query: queryObject,
      queryAsArrayBuffer: bufferWithoutFirstEightBytes
    };
  }
  async *ReadQuery(namespace, arrayName, body) {
    try {
      const arraySchemaResponse = await this.arrayAPI.getArray(
        namespace,
        arrayName,
        "application/json"
      );
      const arraySchema = arraySchemaResponse.data;
      const options = {
        ignoreNullables: body.ignoreNullables,
        ignoreOffsets: body.ignoreOffsets,
        attributes: body.attributes
      };
      const queryResponse = await this.queryAPI.submitQuery(
        namespace,
        arrayName,
        "READ" /* Read */,
        "application/capnp",
        dataToQuery_default(
          body,
          arraySchema.attributes,
          arraySchema.domain.dimensions,
          options
        ),
        void 0,
        void 0,
        void 0,
        {
          headers: {
            "Content-Type": "application/capnp"
          },
          responseType: "arraybuffer"
        }
      );
      const queryData = convertToArrayBufferIfNodeBuffer_default(queryResponse.data);
      let bufferWithoutFirstEightBytes = queryData.slice(8);
      const queryObject = capnpQueryDeSerializer_default(bufferWithoutFirstEightBytes);
      const attributeHeaders = queryObject.attributeBufferHeaders;
      if (queryObject.status === "INCOMPLETE" /* Incomplete */) {
        try {
          yield await this.getResultsFromArrayBuffer(
            arraySchema,
            bufferWithoutFirstEightBytes,
            attributeHeaders,
            options
          );
          while (true) {
            const { results, query, queryAsArrayBuffer } = await this.ReadIncompleteQuery(
              arraySchema,
              bufferWithoutFirstEightBytes,
              namespace,
              arrayName,
              options
            );
            bufferWithoutFirstEightBytes = queryAsArrayBuffer;
            if (query.status === "INCOMPLETE" /* Incomplete */) {
              yield results;
            } else {
              yield results;
              return;
            }
          }
        } catch (e) {
          this.throwError(e);
        }
      }
      yield this.getResultsFromArrayBuffer(
        arraySchema,
        bufferWithoutFirstEightBytes,
        attributeHeaders,
        options
      );
      return;
    } catch (e) {
      this.throwError(e);
    }
  }
  async getResultsFromArrayBuffer(arraySchema, bufferResults, attributeHeaders, options) {
    const numberOfBytesOfResults = getSizeInBytesOfAllAttributes_default(attributeHeaders);
    const resultsBuffer = bufferResults.slice(-1 * numberOfBytesOfResults);
    const mergeAttributesAndDimensions = [
      ...arraySchema.domain.dimensions,
      ...arraySchema.attributes
    ];
    const results = await getResultsFromArrayBuffer_default(
      resultsBuffer,
      attributeHeaders,
      mergeAttributesAndDimensions,
      options
    );
    return results;
  }
  throwError(e) {
    var _a, _b, _c, _d;
    const errorIsABuffer = ((_b = (_a = e == null ? void 0 : e.response) == null ? void 0 : _a.data) == null ? void 0 : _b.buffer) || ((_d = (_c = e == null ? void 0 : e.response) == null ? void 0 : _c.data) == null ? void 0 : _d.length);
    if (errorIsABuffer) {
      const errorArrayBuffer = convertToArrayBufferIfNodeBuffer_default(
        e.response.data
      );
      const decodedMessage = new TextDecoder().decode(errorArrayBuffer);
      throw new Error(decodedMessage);
    } else {
      throw e;
    }
  }
};
var TileDBQuery_default = TileDBQuery;

// src/TileDBClient/TileDBClient.ts
var import_save_file = __toESM(require_browser2());
var import_axios9 = __toESM(require_axios2());

// src/UDF/UDF.ts
var import_axios6 = __toESM(require_axios2());
var UDF = class {
  constructor(params, axios2 = import_axios6.default) {
    const config = new Configuration(params);
    this.config = config;
    this.API = new UdfApi(config, void 0, axios2);
  }
  registerUdf(namespace, name, udf) {
    return this.API.registerUDFInfo(namespace, name, udf);
  }
  registerGenericUdf(namespace, name, udf) {
    const udfObject = {
      ...udf,
      type: "generic" /* Generic */
    };
    return this.API.registerUDFInfo(namespace, name, udfObject);
  }
  registerSingleArrayUdf(namespace, name, udf) {
    const udfObject = {
      ...udf,
      type: "single_array" /* SingleArray */
    };
    return this.API.registerUDFInfo(namespace, name, udfObject);
  }
  updateUdf(namespace, name, udf) {
    return this.API.updateUDFInfo(namespace, name, udf);
  }
  updateGenericUdf(namespace, name, udf) {
    const udfObject = {
      ...udf,
      type: "generic" /* Generic */
    };
    return this.API.updateUDFInfo(namespace, name, udfObject);
  }
  updateSingleArrayUdf(namespace, name, udf) {
    const udfObject = {
      ...udf,
      type: "single_array" /* SingleArray */
    };
    return this.API.updateUDFInfo(namespace, name, udfObject);
  }
  async exec(namespaceAndUdf, args, options) {
    if (!namespaceAndUdf.includes("/")) {
      throw new Error("First argument should include namespace and the udf name separated by a '/' e.g. TileDB/myUDF");
    }
    if (args && !Array.isArray(args)) {
      throw new Error("Arguments should be contained in an array");
    }
    const [namespace] = namespaceAndUdf.split("/");
    const udf = {
      udf_info_name: namespaceAndUdf,
      ...args ? { argument: JSON.stringify(args) } : {},
      ...options
    };
    const result = await this.API.submitGenericUDF(namespace, udf);
    return result.data;
  }
  info(namespace, udfName) {
    return this.API.getUDFInfo(namespace, udfName);
  }
  share(namespace, udfName, udfSharing) {
    return this.API.shareUDFInfo(namespace, udfName, udfSharing);
  }
  unshare(namespace, udfName, namespaceToUnshare) {
    const noActions = {
      namespace: namespaceToUnshare,
      actions: []
    };
    return this.API.shareUDFInfo(namespace, udfName, noActions);
  }
  delete(namespace, udfName) {
    return this.API.deleteUDFInfo(namespace, udfName);
  }
};
var UDF_default = UDF;

// src/UDF/index.ts
var UDF_default2 = UDF_default;

// src/Sql/Sql.ts
var import_axios7 = __toESM(require_axios2());
var Sql = class {
  constructor(params, axios2 = import_axios7.default) {
    const config = new Configuration(params);
    this.config = config;
    this.API = new SqlApi(config, void 0, axios2);
  }
  exec(namespace, query, options) {
    const sql = {
      query,
      ...options
    };
    return this.API.runSQL(namespace, sql);
  }
};
var Sql_default = Sql;

// src/Sql/index.ts
var Sql_default2 = Sql_default;

// src/Groups/Groups.ts
var import_axios8 = __toESM(require_axios2());
var Groups = class {
  constructor(params, paramsV2, axios2 = import_axios8.default) {
    this.API = new GroupsApi(params, void 0, axios2);
    this.V2API = new GroupsApi2(paramsV2, void 0, axios2);
  }
  async getGroupContents(namespace, name) {
    const result = await this.API.getGroupContents(namespace, name);
    return result.data;
  }
};
var Groups_default = Groups;

// src/Groups/index.ts
var Groups_default2 = Groups_default;

// src/TileDBQuery/index.ts
var TileDBQuery_default2 = TileDBQuery_default;

// src/TileDBClient/TileDBClient.ts
var defaultConfig = {
  basePath: "https://api.tiledb.com"
};
var isNode = typeof process === "object";
if (isNode) {
  if (process.env.TILEDB_REST_HOST) {
    defaultConfig.basePath = process.env.TILEDB_REST_HOST;
  }
  if (process.env.TILEDB_REST_TOKEN) {
    defaultConfig.apiKey = process.env.TILEDB_REST_TOKEN;
  }
}
var TileDBClient = class {
  constructor(params = defaultConfig) {
    const config = {
      ...defaultConfig,
      ...params
    };
    this.axios = import_axios9.default.create();
    this.config = new Configuration2({
      ...config,
      basePath: config.basePath + "/v1"
    });
    this.configV2 = new Configuration2({
      ...defaultConfig,
      ...params,
      basePath: config.basePath + "/v2"
    });
    this.ArrayApi = new ArrayApi(this.config, void 0, this.axios);
    this.OrganizationApi = new OrganizationApi(this.config, void 0, this.axios);
    this.UserApi = new UserApi(this.config, void 0, this.axios);
    this.NotebookApi = new NotebookApi(this.config, void 0, this.axios);
    this.TasksApi = new TasksApi(this.config, void 0, this.axios);
    this.udf = new UDF_default2(this.config, this.axios);
    this.sql = new Sql_default2(this.config, this.axios);
    this.groups = new Groups_default2(this.config, this.configV2, this.axios);
    this.query = new TileDBQuery_default2(this.configV2, this.axios);
  }
  info(namespace, array, options) {
    return this.ArrayApi.getArrayMetadata(namespace, array, options);
  }
  arrayActivity(namespace, array, start, end, eventTypes, taskId, hasTaskId, options) {
    return this.ArrayApi.arrayActivityLog(
      namespace,
      array,
      start,
      end,
      eventTypes,
      taskId,
      hasTaskId,
      options
    );
  }
  deregisterArray(namespace, array, options) {
    return this.ArrayApi.deregisterArray(namespace, array, options);
  }
  registerArray(namespace, array, arrayMetadata, options) {
    return this.ArrayApi.registerArray(
      namespace,
      array,
      arrayMetadata,
      options
    );
  }
  listSharedWith(namespace, array, options) {
    return this.ArrayApi.getArraySharingPolicies(namespace, array, options);
  }
  shareArray(namespace, array, arraySharing, options) {
    return this.ArrayApi.shareArray(namespace, array, arraySharing, options);
  }
  unshareArray(namespace, array, namespaceToUnshare, options) {
    const noActions = {
      actions: [],
      namespace: namespaceToUnshare
    };
    return this.ArrayApi.shareArray(namespace, array, noActions, options);
  }
  listArrays(params = {}) {
    const {
      page = 1,
      perPage = 1e3,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options
    } = params;
    return this.ArrayApi.arraysBrowserOwnedGet(
      page,
      perPage,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options
    );
  }
  listPublicArrays(params = {}) {
    const {
      page = 1,
      perPage = 1e3,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options
    } = params;
    return this.ArrayApi.arraysBrowserPublicGet(
      page,
      perPage,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options
    );
  }
  listSharedArrays(params = {}) {
    const {
      page = 1,
      perPage = 1e3,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options
    } = params;
    return this.ArrayApi.arraysBrowserSharedGet(
      page,
      perPage,
      search,
      namespace,
      orderby,
      permissions,
      tag,
      excludeTag,
      fileType,
      excludeFileType,
      fileProperty,
      options
    );
  }
  organization(organization, options) {
    return this.OrganizationApi.getOrganization(organization, options);
  }
  organizations(options) {
    return this.OrganizationApi.getAllOrganizations(options);
  }
  userProfile(options) {
    return this.UserApi.getUser(options);
  }
  renameNotebook(namespace, array, notebookName, options) {
    const notebookMetadata = {
      name: notebookName
    };
    return this.NotebookApi.updateNotebookName(
      namespace,
      array,
      notebookMetadata,
      options
    );
  }
  task(id, options) {
    return this.TasksApi.taskIdGet(id, options);
  }
  async downloadNotebookContents(namespace, notebook) {
    const res = await this.ArrayApi.getArrayMetaDataJson(namespace, notebook);
    const notebookSize = res.data.file_size;
    if (!notebookSize) {
      throw new Error(
        `file_size was not found inside the array's metadata, are you sure that "${namespace}/${notebook}" is a TileDB notebook?`
      );
    }
    const query = {
      layout: "row-major" /* RowMajor */,
      ranges: [[0, notebookSize]],
      bufferSize: notebookSize,
      attributes: ["contents"]
    };
    let notebookContents = [];
    for await (let results of this.query.ReadQuery(
      namespace,
      notebook,
      query
    )) {
      notebookContents = notebookContents.concat(
        results.contents
      );
    }
    const buffer = Uint8Array.from(notebookContents);
    const decoder = new TextDecoder();
    const json = decoder.decode(buffer);
    return json.replace(/[^\x20-\x7E]/g, "");
  }
  async downloadNotebookToFile(namespace, notebook) {
    const contents = await this.downloadNotebookContents(namespace, notebook);
    await (0, import_save_file.default)(contents, `${notebook}.ipynb`);
  }
  async getFileContents(namespace, file) {
    const res = await this.ArrayApi.getArrayMetaDataJson(namespace, file);
    const { original_file_name, file_size, mime_type } = res.data;
    if (!original_file_name || !file_size) {
      throw new Error(
        `file_size or original_file_name were not found inside the array's metadata, are you sure that "${namespace}/${file}" is a TileDB file?`
      );
    }
    let fileContents = [];
    const query = {
      layout: "row-major" /* RowMajor */,
      ranges: [[0, file_size]],
      bufferSize: file_size,
      attributes: ["contents"]
    };
    for await (let results of this.query.ReadQuery(namespace, file, query)) {
      fileContents = fileContents.concat(
        results.contents
      );
    }
    const buffer = Uint8Array.from(fileContents).buffer;
    return {
      buffer,
      originalFileName: original_file_name,
      mimeType: mime_type
    };
  }
  async downloadFile(namespace, file) {
    const { buffer, originalFileName } = await this.getFileContents(
      namespace,
      file
    );
    await (0, import_save_file.default)(buffer, originalFileName);
  }
  uploadNotebookContents() {
  }
  uploadNotebookFromFile() {
  }
  lastSqlTask() {
  }
  lastUDFTask() {
  }
};
var TileDBClient_default = TileDBClient;

// src/TileDBClient/index.ts
var TileDBClient_default2 = TileDBClient_default;

// src/index.ts
var src_default = TileDBClient_default2;
export {
  DeserializableType,
  TileDBQuery,
  src_default as default,
  deserializeCapnp,
  v1_exports as v1,
  v2_exports as v2
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
