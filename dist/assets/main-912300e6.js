const styles = "";
function _defineProperty$1(e, t, i) {
  return t in e ? Object.defineProperty(e, t, { value: i, enumerable: true, configurable: true, writable: true }) : e[t] = i, e;
}
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(e, t) {
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    s.enumerable = s.enumerable || false, s.configurable = true, "value" in s && (s.writable = true), Object.defineProperty(e, s.key, s);
  }
}
function _createClass$1(e, t, i) {
  return t && _defineProperties$1(e.prototype, t), i && _defineProperties$1(e, i), e;
}
function _defineProperty(e, t, i) {
  return t in e ? Object.defineProperty(e, t, { value: i, enumerable: true, configurable: true, writable: true }) : e[t] = i, e;
}
function ownKeys$1(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    t && (s = s.filter(function(t2) {
      return Object.getOwnPropertyDescriptor(e, t2).enumerable;
    })), i.push.apply(i, s);
  }
  return i;
}
function _objectSpread2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys$1(Object(i), true).forEach(function(t2) {
      _defineProperty(e, t2, i[t2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ownKeys$1(Object(i)).forEach(function(t2) {
      Object.defineProperty(e, t2, Object.getOwnPropertyDescriptor(i, t2));
    });
  }
  return e;
}
var defaults$1 = { addCSS: true, thumbWidth: 15, watch: true };
function matches$1(e, t) {
  return function() {
    return Array.from(document.querySelectorAll(t)).includes(this);
  }.call(e, t);
}
function trigger(e, t) {
  if (e && t) {
    var i = new Event(t, { bubbles: true });
    e.dispatchEvent(i);
  }
}
var getConstructor$1 = function(e) {
  return null != e ? e.constructor : null;
}, instanceOf$1 = function(e, t) {
  return !!(e && t && e instanceof t);
}, isNullOrUndefined$1 = function(e) {
  return null == e;
}, isObject$1 = function(e) {
  return getConstructor$1(e) === Object;
}, isNumber$1 = function(e) {
  return getConstructor$1(e) === Number && !Number.isNaN(e);
}, isString$1 = function(e) {
  return getConstructor$1(e) === String;
}, isBoolean$1 = function(e) {
  return getConstructor$1(e) === Boolean;
}, isFunction$1 = function(e) {
  return getConstructor$1(e) === Function;
}, isArray$1 = function(e) {
  return Array.isArray(e);
}, isNodeList$1 = function(e) {
  return instanceOf$1(e, NodeList);
}, isElement$1 = function(e) {
  return instanceOf$1(e, Element);
}, isEvent$1 = function(e) {
  return instanceOf$1(e, Event);
}, isEmpty$1 = function(e) {
  return isNullOrUndefined$1(e) || (isString$1(e) || isArray$1(e) || isNodeList$1(e)) && !e.length || isObject$1(e) && !Object.keys(e).length;
}, is$1 = { nullOrUndefined: isNullOrUndefined$1, object: isObject$1, number: isNumber$1, string: isString$1, boolean: isBoolean$1, function: isFunction$1, array: isArray$1, nodeList: isNodeList$1, element: isElement$1, event: isEvent$1, empty: isEmpty$1 };
function getDecimalPlaces(e) {
  var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
}
function round(e, t) {
  if (1 > t) {
    var i = getDecimalPlaces(t);
    return parseFloat(e.toFixed(i));
  }
  return Math.round(e / t) * t;
}
var RangeTouch = function() {
  function e(t, i) {
    _classCallCheck(this, e), is$1.element(t) ? this.element = t : is$1.string(t) && (this.element = document.querySelector(t)), is$1.element(this.element) && is$1.empty(this.element.rangeTouch) && (this.config = _objectSpread2({}, defaults$1, {}, i), this.init());
  }
  return _createClass$1(e, [{ key: "init", value: function() {
    e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(true), this.element.rangeTouch = this);
  } }, { key: "destroy", value: function() {
    e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(false), this.element.rangeTouch = null);
  } }, { key: "listeners", value: function(e2) {
    var t = this, i = e2 ? "addEventListener" : "removeEventListener";
    ["touchstart", "touchmove", "touchend"].forEach(function(e3) {
      t.element[i](e3, function(e4) {
        return t.set(e4);
      }, false);
    });
  } }, { key: "get", value: function(t) {
    if (!e.enabled || !is$1.event(t))
      return null;
    var i, s = t.target, n = t.changedTouches[0], r = parseFloat(s.getAttribute("min")) || 0, a = parseFloat(s.getAttribute("max")) || 100, o = parseFloat(s.getAttribute("step")) || 1, l = s.getBoundingClientRect(), c = 100 / l.width * (this.config.thumbWidth / 2) / 100;
    return 0 > (i = 100 / l.width * (n.clientX - l.left)) ? i = 0 : 100 < i && (i = 100), 50 > i ? i -= (100 - 2 * i) * c : 50 < i && (i += 2 * (i - 50) * c), r + round(i / 100 * (a - r), o);
  } }, { key: "set", value: function(t) {
    e.enabled && is$1.event(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), trigger(t.target, "touchend" === t.type ? "change" : "input"));
  } }], [{ key: "setup", value: function(t) {
    var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, s = null;
    if (is$1.empty(t) || is$1.string(t) ? s = Array.from(document.querySelectorAll(is$1.string(t) ? t : 'input[type="range"]')) : is$1.element(t) ? s = [t] : is$1.nodeList(t) ? s = Array.from(t) : is$1.array(t) && (s = t.filter(is$1.element)), is$1.empty(s))
      return null;
    var n = _objectSpread2({}, defaults$1, {}, i);
    if (is$1.string(t) && n.watch) {
      var r = new MutationObserver(function(i2) {
        Array.from(i2).forEach(function(i3) {
          Array.from(i3.addedNodes).forEach(function(i4) {
            is$1.element(i4) && matches$1(i4, t) && new e(i4, n);
          });
        });
      });
      r.observe(document.body, { childList: true, subtree: true });
    }
    return s.map(function(t2) {
      return new e(t2, i);
    });
  } }, { key: "enabled", get: function() {
    return "ontouchstart" in document.documentElement;
  } }]), e;
}();
const getConstructor = (e) => null != e ? e.constructor : null, instanceOf = (e, t) => Boolean(e && t && e instanceof t), isNullOrUndefined = (e) => null == e, isObject$2 = (e) => getConstructor(e) === Object, isNumber = (e) => getConstructor(e) === Number && !Number.isNaN(e), isString$2 = (e) => getConstructor(e) === String, isBoolean = (e) => getConstructor(e) === Boolean, isFunction$2 = (e) => "function" == typeof e, isArray$2 = (e) => Array.isArray(e), isWeakMap = (e) => instanceOf(e, WeakMap), isNodeList = (e) => instanceOf(e, NodeList), isTextNode = (e) => getConstructor(e) === Text, isEvent = (e) => instanceOf(e, Event), isKeyboardEvent = (e) => instanceOf(e, KeyboardEvent), isCue = (e) => instanceOf(e, window.TextTrackCue) || instanceOf(e, window.VTTCue), isTrack = (e) => instanceOf(e, TextTrack) || !isNullOrUndefined(e) && isString$2(e.kind), isPromise = (e) => instanceOf(e, Promise) && isFunction$2(e.then), isElement = (e) => null !== e && "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument, isEmpty = (e) => isNullOrUndefined(e) || (isString$2(e) || isArray$2(e) || isNodeList(e)) && !e.length || isObject$2(e) && !Object.keys(e).length, isUrl = (e) => {
  if (instanceOf(e, window.URL))
    return true;
  if (!isString$2(e))
    return false;
  let t = e;
  e.startsWith("http://") && e.startsWith("https://") || (t = `http://${e}`);
  try {
    return !isEmpty(new URL(t).hostname);
  } catch (e2) {
    return false;
  }
};
var is = { nullOrUndefined: isNullOrUndefined, object: isObject$2, number: isNumber, string: isString$2, boolean: isBoolean, function: isFunction$2, array: isArray$2, weakMap: isWeakMap, nodeList: isNodeList, element: isElement, textNode: isTextNode, event: isEvent, keyboardEvent: isKeyboardEvent, cue: isCue, track: isTrack, promise: isPromise, url: isUrl, empty: isEmpty };
const transitionEndEvent = (() => {
  const e = document.createElement("span"), t = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" }, i = Object.keys(t).find((t2) => void 0 !== e.style[t2]);
  return !!is.string(i) && t[i];
})();
function repaint(e, t) {
  setTimeout(() => {
    try {
      e.hidden = true, e.offsetHeight, e.hidden = false;
    } catch (e2) {
    }
  }, t);
}
const browser = { isIE: Boolean(window.document.documentMode), isEdge: /Edge/g.test(navigator.userAgent), isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/g.test(navigator.userAgent), isIPhone: /iPhone|iPod/gi.test(navigator.userAgent) && navigator.maxTouchPoints > 1, isIos: /iPad|iPhone|iPod/gi.test(navigator.userAgent) && navigator.maxTouchPoints > 1 };
function cloneDeep(e) {
  return JSON.parse(JSON.stringify(e));
}
function getDeep(e, t) {
  return t.split(".").reduce((e2, t2) => e2 && e2[t2], e);
}
function extend(e = {}, ...t) {
  if (!t.length)
    return e;
  const i = t.shift();
  return is.object(i) ? (Object.keys(i).forEach((t2) => {
    is.object(i[t2]) ? (Object.keys(e).includes(t2) || Object.assign(e, { [t2]: {} }), extend(e[t2], i[t2])) : Object.assign(e, { [t2]: i[t2] });
  }), extend(e, ...t)) : e;
}
function wrap(e, t) {
  const i = e.length ? e : [e];
  Array.from(i).reverse().forEach((e2, i2) => {
    const s = i2 > 0 ? t.cloneNode(true) : t, n = e2.parentNode, r = e2.nextSibling;
    s.appendChild(e2), r ? n.insertBefore(s, r) : n.appendChild(s);
  });
}
function setAttributes(e, t) {
  is.element(e) && !is.empty(t) && Object.entries(t).filter(([, e2]) => !is.nullOrUndefined(e2)).forEach(([t2, i]) => e.setAttribute(t2, i));
}
function createElement(e, t, i) {
  const s = document.createElement(e);
  return is.object(t) && setAttributes(s, t), is.string(i) && (s.innerText = i), s;
}
function insertAfter(e, t) {
  is.element(e) && is.element(t) && t.parentNode.insertBefore(e, t.nextSibling);
}
function insertElement(e, t, i, s) {
  is.element(t) && t.appendChild(createElement(e, i, s));
}
function removeElement(e) {
  is.nodeList(e) || is.array(e) ? Array.from(e).forEach(removeElement) : is.element(e) && is.element(e.parentNode) && e.parentNode.removeChild(e);
}
function emptyElement(e) {
  if (!is.element(e))
    return;
  let { length: t } = e.childNodes;
  for (; t > 0; )
    e.removeChild(e.lastChild), t -= 1;
}
function replaceElement(e, t) {
  return is.element(t) && is.element(t.parentNode) && is.element(e) ? (t.parentNode.replaceChild(e, t), e) : null;
}
function getAttributesFromSelector(e, t) {
  if (!is.string(e) || is.empty(e))
    return {};
  const i = {}, s = extend({}, t);
  return e.split(",").forEach((e2) => {
    const t2 = e2.trim(), n = t2.replace(".", ""), r = t2.replace(/[[\]]/g, "").split("="), [a] = r, o = r.length > 1 ? r[1].replace(/["']/g, "") : "";
    switch (t2.charAt(0)) {
      case ".":
        is.string(s.class) ? i.class = `${s.class} ${n}` : i.class = n;
        break;
      case "#":
        i.id = t2.replace("#", "");
        break;
      case "[":
        i[a] = o;
    }
  }), extend(s, i);
}
function toggleHidden(e, t) {
  if (!is.element(e))
    return;
  let i = t;
  is.boolean(i) || (i = !e.hidden), e.hidden = i;
}
function toggleClass$1(e, t, i) {
  if (is.nodeList(e))
    return Array.from(e).map((e2) => toggleClass$1(e2, t, i));
  if (is.element(e)) {
    let s = "toggle";
    return void 0 !== i && (s = i ? "add" : "remove"), e.classList[s](t), e.classList.contains(t);
  }
  return false;
}
function hasClass$1(e, t) {
  return is.element(e) && e.classList.contains(t);
}
function matches$2(e, t) {
  const { prototype: i } = Element;
  return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function() {
    return Array.from(document.querySelectorAll(t)).includes(this);
  }).call(e, t);
}
function closest$1(e, t) {
  const { prototype: i } = Element;
  return (i.closest || function() {
    let e2 = this;
    do {
      if (matches$2.matches(e2, t))
        return e2;
      e2 = e2.parentElement || e2.parentNode;
    } while (null !== e2 && 1 === e2.nodeType);
    return null;
  }).call(e, t);
}
function getElements(e) {
  return this.elements.container.querySelectorAll(e);
}
function getElement(e) {
  return this.elements.container.querySelector(e);
}
function setFocus(e = null, t = false) {
  is.element(e) && (e.focus({ preventScroll: true }), t && toggleClass$1(e, this.config.classNames.tabFocus));
}
const defaultCodecs = { "audio/ogg": "vorbis", "audio/wav": "1", "video/webm": "vp8, vorbis", "video/mp4": "avc1.42E01E, mp4a.40.2", "video/ogg": "theora" }, support = { audio: "canPlayType" in document.createElement("audio"), video: "canPlayType" in document.createElement("video"), check(e, t, i) {
  const s = browser.isIPhone && i && support.playsinline, n = support[e] || "html5" !== t;
  return { api: n, ui: n && support.rangeInput && ("video" !== e || !browser.isIPhone || s) };
}, pip: !(browser.isIPhone || !is.function(createElement("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || createElement("video").disablePictureInPicture)), airplay: is.function(window.WebKitPlaybackTargetAvailabilityEvent), playsinline: "playsInline" in document.createElement("video"), mime(e) {
  if (is.empty(e))
    return false;
  const [t] = e.split("/");
  let i = e;
  if (!this.isHTML5 || t !== this.type)
    return false;
  Object.keys(defaultCodecs).includes(i) && (i += `; codecs="${defaultCodecs[e]}"`);
  try {
    return Boolean(i && this.media.canPlayType(i).replace(/no/, ""));
  } catch (e2) {
    return false;
  }
}, textTracks: "textTracks" in document.createElement("video"), rangeInput: (() => {
  const e = document.createElement("input");
  return e.type = "range", "range" === e.type;
})(), touch: "ontouchstart" in document.documentElement, transitions: false !== transitionEndEvent, reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches }, supportsPassiveListeners = (() => {
  let e = false;
  try {
    const t = Object.defineProperty({}, "passive", { get: () => (e = true, null) });
    window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
  } catch (e2) {
  }
  return e;
})();
function toggleListener(e, t, i, s = false, n = true, r = false) {
  if (!e || !("addEventListener" in e) || is.empty(t) || !is.function(i))
    return;
  const a = t.split(" ");
  let o = r;
  supportsPassiveListeners && (o = { passive: n, capture: r }), a.forEach((t2) => {
    this && this.eventListeners && s && this.eventListeners.push({ element: e, type: t2, callback: i, options: o }), e[s ? "addEventListener" : "removeEventListener"](t2, i, o);
  });
}
function on(e, t = "", i, s = true, n = false) {
  toggleListener.call(this, e, t, i, true, s, n);
}
function off(e, t = "", i, s = true, n = false) {
  toggleListener.call(this, e, t, i, false, s, n);
}
function once(e, t = "", i, s = true, n = false) {
  const r = (...a) => {
    off(e, t, r, s, n), i.apply(this, a);
  };
  toggleListener.call(this, e, t, r, true, s, n);
}
function triggerEvent(e, t = "", i = false, s = {}) {
  if (!is.element(e) || is.empty(t))
    return;
  const n = new CustomEvent(t, { bubbles: i, detail: { ...s, plyr: this } });
  e.dispatchEvent(n);
}
function unbindListeners() {
  this && this.eventListeners && (this.eventListeners.forEach((e) => {
    const { element: t, type: i, callback: s, options: n } = e;
    t.removeEventListener(i, s, n);
  }), this.eventListeners = []);
}
function ready() {
  return new Promise((e) => this.ready ? setTimeout(e, 0) : on.call(this, this.elements.container, "ready", e)).then(() => {
  });
}
function silencePromise(e) {
  is.promise(e) && e.then(null, () => {
  });
}
function dedupe(e) {
  return is.array(e) ? e.filter((t, i) => e.indexOf(t) === i) : e;
}
function closest$2(e, t) {
  return is.array(e) && e.length ? e.reduce((e2, i) => Math.abs(i - t) < Math.abs(e2 - t) ? i : e2) : null;
}
function supportsCSS(e) {
  return !(!window || !window.CSS) && window.CSS.supports(e);
}
const standardRatios = [[1, 1], [4, 3], [3, 4], [5, 4], [4, 5], [3, 2], [2, 3], [16, 10], [10, 16], [16, 9], [9, 16], [21, 9], [9, 21], [32, 9], [9, 32]].reduce((e, [t, i]) => ({ ...e, [t / i]: [t, i] }), {});
function validateAspectRatio(e) {
  if (!(is.array(e) || is.string(e) && e.includes(":")))
    return false;
  return (is.array(e) ? e : e.split(":")).map(Number).every(is.number);
}
function reduceAspectRatio(e) {
  if (!is.array(e) || !e.every(is.number))
    return null;
  const [t, i] = e, s = (e2, t2) => 0 === t2 ? e2 : s(t2, e2 % t2), n = s(t, i);
  return [t / n, i / n];
}
function getAspectRatio(e) {
  const t = (e2) => validateAspectRatio(e2) ? e2.split(":").map(Number) : null;
  let i = t(e);
  if (null === i && (i = t(this.config.ratio)), null === i && !is.empty(this.embed) && is.array(this.embed.ratio) && ({ ratio: i } = this.embed), null === i && this.isHTML5) {
    const { videoWidth: e2, videoHeight: t2 } = this.media;
    i = [e2, t2];
  }
  return reduceAspectRatio(i);
}
function setAspectRatio(e) {
  if (!this.isVideo)
    return {};
  const { wrapper: t } = this.elements, i = getAspectRatio.call(this, e);
  if (!is.array(i))
    return {};
  const [s, n] = reduceAspectRatio(i), r = 100 / s * n;
  if (supportsCSS(`aspect-ratio: ${s}/${n}`) ? t.style.aspectRatio = `${s}/${n}` : t.style.paddingBottom = `${r}%`, this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
    const e2 = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10), i2 = (e2 - r) / (e2 / 50);
    this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = `translateY(-${i2}%)`;
  } else
    this.isHTML5 && t.classList.add(this.config.classNames.videoFixedRatio);
  return { padding: r, ratio: i };
}
function roundAspectRatio(e, t, i = 0.05) {
  const s = e / t, n = closest$2(Object.keys(standardRatios), s);
  return Math.abs(n - s) <= i ? standardRatios[n] : [e, t];
}
function getViewportSize() {
  return [Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)];
}
const html5 = { getSources() {
  if (!this.isHTML5)
    return [];
  return Array.from(this.media.querySelectorAll("source")).filter((e) => {
    const t = e.getAttribute("type");
    return !!is.empty(t) || support.mime.call(this, t);
  });
}, getQualityOptions() {
  return this.config.quality.forced ? this.config.quality.options : html5.getSources.call(this).map((e) => Number(e.getAttribute("size"))).filter(Boolean);
}, setup() {
  if (!this.isHTML5)
    return;
  const e = this;
  e.options.speed = e.config.speed.options, is.empty(this.config.ratio) || setAspectRatio.call(e), Object.defineProperty(e.media, "quality", { get() {
    const t = html5.getSources.call(e).find((t2) => t2.getAttribute("src") === e.source);
    return t && Number(t.getAttribute("size"));
  }, set(t) {
    if (e.quality !== t) {
      if (e.config.quality.forced && is.function(e.config.quality.onChange))
        e.config.quality.onChange(t);
      else {
        const i = html5.getSources.call(e).find((e2) => Number(e2.getAttribute("size")) === t);
        if (!i)
          return;
        const { currentTime: s, paused: n, preload: r, readyState: a, playbackRate: o } = e.media;
        e.media.src = i.getAttribute("src"), ("none" !== r || a) && (e.once("loadedmetadata", () => {
          e.speed = o, e.currentTime = s, n || silencePromise(e.play());
        }), e.media.load());
      }
      triggerEvent.call(e, e.media, "qualitychange", false, { quality: t });
    }
  } });
}, cancelRequests() {
  this.isHTML5 && (removeElement(html5.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"));
} };
function generateId(e) {
  return `${e}-${Math.floor(1e4 * Math.random())}`;
}
function format$1(e, ...t) {
  return is.empty(e) ? e : e.toString().replace(/{(\d+)}/g, (e2, i) => t[i].toString());
}
function getPercentage(e, t) {
  return 0 === e || 0 === t || Number.isNaN(e) || Number.isNaN(t) ? 0 : (e / t * 100).toFixed(2);
}
const replaceAll = (e = "", t = "", i = "") => e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString()), toTitleCase = (e = "") => e.toString().replace(/\w\S*/g, (e2) => e2.charAt(0).toUpperCase() + e2.slice(1).toLowerCase());
function toPascalCase(e = "") {
  let t = e.toString();
  return t = replaceAll(t, "-", " "), t = replaceAll(t, "_", " "), t = toTitleCase(t), replaceAll(t, " ", "");
}
function toCamelCase(e = "") {
  let t = e.toString();
  return t = toPascalCase(t), t.charAt(0).toLowerCase() + t.slice(1);
}
function stripHTML(e) {
  const t = document.createDocumentFragment(), i = document.createElement("div");
  return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText;
}
function getHTML(e) {
  const t = document.createElement("div");
  return t.appendChild(e), t.innerHTML;
}
const resources = { pip: "PIP", airplay: "AirPlay", html5: "HTML5", vimeo: "Vimeo", youtube: "YouTube" }, i18n = { get(e = "", t = {}) {
  if (is.empty(e) || is.empty(t))
    return "";
  let i = getDeep(t.i18n, e);
  if (is.empty(i))
    return Object.keys(resources).includes(e) ? resources[e] : "";
  const s = { "{seektime}": t.seekTime, "{title}": t.title };
  return Object.entries(s).forEach(([e2, t2]) => {
    i = replaceAll(i, e2, t2);
  }), i;
} };
class Storage {
  constructor(e) {
    _defineProperty$1(this, "get", (e2) => {
      if (!Storage.supported || !this.enabled)
        return null;
      const t = window.localStorage.getItem(this.key);
      if (is.empty(t))
        return null;
      const i = JSON.parse(t);
      return is.string(e2) && e2.length ? i[e2] : i;
    }), _defineProperty$1(this, "set", (e2) => {
      if (!Storage.supported || !this.enabled)
        return;
      if (!is.object(e2))
        return;
      let t = this.get();
      is.empty(t) && (t = {}), extend(t, e2);
      try {
        window.localStorage.setItem(this.key, JSON.stringify(t));
      } catch (e3) {
      }
    }), this.enabled = e.config.storage.enabled, this.key = e.config.storage.key;
  }
  static get supported() {
    try {
      if (!("localStorage" in window))
        return false;
      const e = "___test";
      return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), true;
    } catch (e) {
      return false;
    }
  }
}
function fetch(e, t = "text") {
  return new Promise((i, s) => {
    try {
      const s2 = new XMLHttpRequest();
      if (!("withCredentials" in s2))
        return;
      s2.addEventListener("load", () => {
        if ("text" === t)
          try {
            i(JSON.parse(s2.responseText));
          } catch (e2) {
            i(s2.responseText);
          }
        else
          i(s2.response);
      }), s2.addEventListener("error", () => {
        throw new Error(s2.status);
      }), s2.open("GET", e, true), s2.responseType = t, s2.send();
    } catch (e2) {
      s(e2);
    }
  });
}
function loadSprite(e, t) {
  if (!is.string(e))
    return;
  const i = is.string(t);
  let s = false;
  const n = () => null !== document.getElementById(t), r = (e2, t2) => {
    e2.innerHTML = t2, i && n() || document.body.insertAdjacentElement("afterbegin", e2);
  };
  if (!i || !n()) {
    const n2 = Storage.supported, a = document.createElement("div");
    if (a.setAttribute("hidden", ""), i && a.setAttribute("id", t), n2) {
      const e2 = window.localStorage.getItem(`cache-${t}`);
      if (s = null !== e2, s) {
        const t2 = JSON.parse(e2);
        r(a, t2.content);
      }
    }
    fetch(e).then((e2) => {
      if (!is.empty(e2)) {
        if (n2)
          try {
            window.localStorage.setItem(`cache-${t}`, JSON.stringify({ content: e2 }));
          } catch (e3) {
          }
        r(a, e2);
      }
    }).catch(() => {
    });
  }
}
const getHours = (e) => Math.trunc(e / 60 / 60 % 60, 10), getSeconds = (e) => Math.trunc(e % 60, 10);
function formatTime(e = 0, t = false, i = false) {
  if (!is.number(e))
    return formatTime(void 0, t, i);
  const s = (e2) => `0${e2}`.slice(-2);
  let n = getHours(e);
  const r = (a = e, Math.trunc(a / 60 % 60, 10));
  var a;
  const o = getSeconds(e);
  return n = t || n > 0 ? `${n}:` : "", `${i && e > 0 ? "-" : ""}${n}${s(r)}:${s(o)}`;
}
const controls = { getIconUrl() {
  const e = new URL(this.config.iconUrl, window.location), t = window.location.host ? window.location.host : window.top.location.host, i = e.host !== t || browser.isIE && !window.svg4everybody;
  return { url: this.config.iconUrl, cors: i };
}, findElements() {
  try {
    return this.elements.controls = getElement.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = { play: getElements.call(this, this.config.selectors.buttons.play), pause: getElement.call(this, this.config.selectors.buttons.pause), restart: getElement.call(this, this.config.selectors.buttons.restart), rewind: getElement.call(this, this.config.selectors.buttons.rewind), fastForward: getElement.call(this, this.config.selectors.buttons.fastForward), mute: getElement.call(this, this.config.selectors.buttons.mute), pip: getElement.call(this, this.config.selectors.buttons.pip), airplay: getElement.call(this, this.config.selectors.buttons.airplay), settings: getElement.call(this, this.config.selectors.buttons.settings), captions: getElement.call(this, this.config.selectors.buttons.captions), fullscreen: getElement.call(this, this.config.selectors.buttons.fullscreen) }, this.elements.progress = getElement.call(this, this.config.selectors.progress), this.elements.inputs = { seek: getElement.call(this, this.config.selectors.inputs.seek), volume: getElement.call(this, this.config.selectors.inputs.volume) }, this.elements.display = { buffer: getElement.call(this, this.config.selectors.display.buffer), currentTime: getElement.call(this, this.config.selectors.display.currentTime), duration: getElement.call(this, this.config.selectors.display.duration) }, is.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(`.${this.config.classNames.tooltip}`)), true;
  } catch (e) {
    return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(true), false;
  }
}, createIcon(e, t) {
  const i = "http://www.w3.org/2000/svg", s = controls.getIconUrl.call(this), n = `${s.cors ? "" : s.url}#${this.config.iconPrefix}`, r = document.createElementNS(i, "svg");
  setAttributes(r, extend(t, { "aria-hidden": "true", focusable: "false" }));
  const a = document.createElementNS(i, "use"), o = `${n}-${e}`;
  return "href" in a && a.setAttributeNS("http://www.w3.org/1999/xlink", "href", o), a.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o), r.appendChild(a), r;
}, createLabel(e, t = {}) {
  const i = i18n.get(e, this.config);
  return createElement("span", { ...t, class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ") }, i);
}, createBadge(e) {
  if (is.empty(e))
    return null;
  const t = createElement("span", { class: this.config.classNames.menu.value });
  return t.appendChild(createElement("span", { class: this.config.classNames.menu.badge }, e)), t;
}, createButton(e, t) {
  const i = extend({}, t);
  let s = toCamelCase(e);
  const n = { element: "button", toggle: false, label: null, icon: null, labelPressed: null, iconPressed: null };
  switch (["element", "icon", "label"].forEach((e2) => {
    Object.keys(i).includes(e2) && (n[e2] = i[e2], delete i[e2]);
  }), "button" !== n.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some((e2) => e2 === this.config.classNames.control) || extend(i, { class: `${i.class} ${this.config.classNames.control}` }) : i.class = this.config.classNames.control, e) {
    case "play":
      n.toggle = true, n.label = "play", n.labelPressed = "pause", n.icon = "play", n.iconPressed = "pause";
      break;
    case "mute":
      n.toggle = true, n.label = "mute", n.labelPressed = "unmute", n.icon = "volume", n.iconPressed = "muted";
      break;
    case "captions":
      n.toggle = true, n.label = "enableCaptions", n.labelPressed = "disableCaptions", n.icon = "captions-off", n.iconPressed = "captions-on";
      break;
    case "fullscreen":
      n.toggle = true, n.label = "enterFullscreen", n.labelPressed = "exitFullscreen", n.icon = "enter-fullscreen", n.iconPressed = "exit-fullscreen";
      break;
    case "play-large":
      i.class += ` ${this.config.classNames.control}--overlaid`, s = "play", n.label = "play", n.icon = "play";
      break;
    default:
      is.empty(n.label) && (n.label = s), is.empty(n.icon) && (n.icon = e);
  }
  const r = createElement(n.element);
  return n.toggle ? (r.appendChild(controls.createIcon.call(this, n.iconPressed, { class: "icon--pressed" })), r.appendChild(controls.createIcon.call(this, n.icon, { class: "icon--not-pressed" })), r.appendChild(controls.createLabel.call(this, n.labelPressed, { class: "label--pressed" })), r.appendChild(controls.createLabel.call(this, n.label, { class: "label--not-pressed" }))) : (r.appendChild(controls.createIcon.call(this, n.icon)), r.appendChild(controls.createLabel.call(this, n.label))), extend(i, getAttributesFromSelector(this.config.selectors.buttons[s], i)), setAttributes(r, i), "play" === s ? (is.array(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(r)) : this.elements.buttons[s] = r, r;
}, createRange(e, t) {
  const i = createElement("input", extend(getAttributesFromSelector(this.config.selectors.inputs[e]), { type: "range", min: 0, max: 100, step: 0.01, value: 0, autocomplete: "off", role: "slider", "aria-label": i18n.get(e, this.config), "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": 0 }, t));
  return this.elements.inputs[e] = i, controls.updateRangeFill.call(this, i), RangeTouch.setup(i), i;
}, createProgress(e, t) {
  const i = createElement("progress", extend(getAttributesFromSelector(this.config.selectors.display[e]), { min: 0, max: 100, value: 0, role: "progressbar", "aria-hidden": true }, t));
  if ("volume" !== e) {
    i.appendChild(createElement("span", null, "0"));
    const t2 = { played: "played", buffer: "buffered" }[e], s = t2 ? i18n.get(t2, this.config) : "";
    i.innerText = `% ${s.toLowerCase()}`;
  }
  return this.elements.display[e] = i, i;
}, createTime(e, t) {
  const i = getAttributesFromSelector(this.config.selectors.display[e], t), s = createElement("div", extend(i, { class: `${i.class ? i.class : ""} ${this.config.classNames.display.time} `.trim(), "aria-label": i18n.get(e, this.config) }), "00:00");
  return this.elements.display[e] = s, s;
}, bindMenuItemShortcuts(e, t) {
  on.call(this, e, "keydown keyup", (i) => {
    if (!["Space", "ArrowUp", "ArrowDown", "ArrowRight"].includes(i.key))
      return;
    if (i.preventDefault(), i.stopPropagation(), "keydown" === i.type)
      return;
    const s = matches$2(e, '[role="menuitemradio"]');
    if (!s && ["Space", "ArrowRight"].includes(i.key))
      controls.showMenuPanel.call(this, t, true);
    else {
      let t2;
      "Space" !== i.key && ("ArrowDown" === i.key || s && "ArrowRight" === i.key ? (t2 = e.nextElementSibling, is.element(t2) || (t2 = e.parentNode.firstElementChild)) : (t2 = e.previousElementSibling, is.element(t2) || (t2 = e.parentNode.lastElementChild)), setFocus.call(this, t2, true));
    }
  }, false), on.call(this, e, "keyup", (e2) => {
    "Return" === e2.key && controls.focusFirstMenuItem.call(this, null, true);
  });
}, createMenuItem({ value: e, list: t, type: i, title: s, badge: n = null, checked: r = false }) {
  const a = getAttributesFromSelector(this.config.selectors.inputs[i]), o = createElement("button", extend(a, { type: "button", role: "menuitemradio", class: `${this.config.classNames.control} ${a.class ? a.class : ""}`.trim(), "aria-checked": r, value: e })), l = createElement("span");
  l.innerHTML = s, is.element(n) && l.appendChild(n), o.appendChild(l), Object.defineProperty(o, "checked", { enumerable: true, get: () => "true" === o.getAttribute("aria-checked"), set(e2) {
    e2 && Array.from(o.parentNode.children).filter((e3) => matches$2(e3, '[role="menuitemradio"]')).forEach((e3) => e3.setAttribute("aria-checked", "false")), o.setAttribute("aria-checked", e2 ? "true" : "false");
  } }), this.listeners.bind(o, "click keyup", (t2) => {
    if (!is.keyboardEvent(t2) || "Space" === t2.key) {
      switch (t2.preventDefault(), t2.stopPropagation(), o.checked = true, i) {
        case "language":
          this.currentTrack = Number(e);
          break;
        case "quality":
          this.quality = e;
          break;
        case "speed":
          this.speed = parseFloat(e);
      }
      controls.showMenuPanel.call(this, "home", is.keyboardEvent(t2));
    }
  }, i, false), controls.bindMenuItemShortcuts.call(this, o, i), t.appendChild(o);
}, formatTime(e = 0, t = false) {
  if (!is.number(e))
    return e;
  return formatTime(e, getHours(this.duration) > 0, t);
}, updateTimeDisplay(e = null, t = 0, i = false) {
  is.element(e) && is.number(t) && (e.innerText = controls.formatTime(t, i));
}, updateVolume() {
  this.supported.ui && (is.element(this.elements.inputs.volume) && controls.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), is.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume));
}, setRange(e, t = 0) {
  is.element(e) && (e.value = t, controls.updateRangeFill.call(this, e));
}, updateProgress(e) {
  if (!this.supported.ui || !is.event(e))
    return;
  let t = 0;
  const i = (e2, t2) => {
    const i2 = is.number(t2) ? t2 : 0, s = is.element(e2) ? e2 : this.elements.display.buffer;
    if (is.element(s)) {
      s.value = i2;
      const e3 = s.getElementsByTagName("span")[0];
      is.element(e3) && (e3.childNodes[0].nodeValue = i2);
    }
  };
  if (e)
    switch (e.type) {
      case "timeupdate":
      case "seeking":
      case "seeked":
        t = getPercentage(this.currentTime, this.duration), "timeupdate" === e.type && controls.setRange.call(this, this.elements.inputs.seek, t);
        break;
      case "playing":
      case "progress":
        i(this.elements.display.buffer, 100 * this.buffered);
    }
}, updateRangeFill(e) {
  const t = is.event(e) ? e.target : e;
  if (is.element(t) && "range" === t.getAttribute("type")) {
    if (matches$2(t, this.config.selectors.inputs.seek)) {
      t.setAttribute("aria-valuenow", this.currentTime);
      const e2 = controls.formatTime(this.currentTime), i = controls.formatTime(this.duration), s = i18n.get("seekLabel", this.config);
      t.setAttribute("aria-valuetext", s.replace("{currentTime}", e2).replace("{duration}", i));
    } else if (matches$2(t, this.config.selectors.inputs.volume)) {
      const e2 = 100 * t.value;
      t.setAttribute("aria-valuenow", e2), t.setAttribute("aria-valuetext", `${e2.toFixed(1)}%`);
    } else
      t.setAttribute("aria-valuenow", t.value);
    browser.isWebkit && t.style.setProperty("--value", t.value / t.max * 100 + "%");
  }
}, updateSeekTooltip(e) {
  var t, i;
  if (!this.config.tooltips.seek || !is.element(this.elements.inputs.seek) || !is.element(this.elements.display.seekTooltip) || 0 === this.duration)
    return;
  const s = this.elements.display.seekTooltip, n = `${this.config.classNames.tooltip}--visible`, r = (e2) => toggleClass$1(s, n, e2);
  if (this.touch)
    return void r(false);
  let a = 0;
  const o = this.elements.progress.getBoundingClientRect();
  if (is.event(e))
    a = 100 / o.width * (e.pageX - o.left);
  else {
    if (!hasClass$1(s, n))
      return;
    a = parseFloat(s.style.left, 10);
  }
  a < 0 ? a = 0 : a > 100 && (a = 100);
  const l = this.duration / 100 * a;
  s.innerText = controls.formatTime(l);
  const c = null === (t = this.config.markers) || void 0 === t || null === (i = t.points) || void 0 === i ? void 0 : i.find(({ time: e2 }) => e2 === Math.round(l));
  c && s.insertAdjacentHTML("afterbegin", `${c.label}<br>`), s.style.left = `${a}%`, is.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && r("mouseenter" === e.type);
}, timeUpdate(e) {
  const t = !is.element(this.elements.display.duration) && this.config.invertTime;
  controls.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || controls.updateProgress.call(this, e);
}, durationUpdate() {
  if (!this.supported.ui || !this.config.invertTime && this.currentTime)
    return;
  if (this.duration >= 2 ** 32)
    return toggleHidden(this.elements.display.currentTime, true), void toggleHidden(this.elements.progress, true);
  is.element(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
  const e = is.element(this.elements.display.duration);
  !e && this.config.displayDuration && this.paused && controls.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && controls.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), this.config.markers.enabled && controls.setMarkers.call(this), controls.updateSeekTooltip.call(this);
}, toggleMenuButton(e, t) {
  toggleHidden(this.elements.settings.buttons[e], !t);
}, updateSetting(e, t, i) {
  const s = this.elements.settings.panels[e];
  let n = null, r = t;
  if ("captions" === e)
    n = this.currentTrack;
  else {
    if (n = is.empty(i) ? this[e] : i, is.empty(n) && (n = this.config[e].default), !is.empty(this.options[e]) && !this.options[e].includes(n))
      return void this.debug.warn(`Unsupported value of '${n}' for ${e}`);
    if (!this.config[e].options.includes(n))
      return void this.debug.warn(`Disabled value of '${n}' for ${e}`);
  }
  if (is.element(r) || (r = s && s.querySelector('[role="menu"]')), !is.element(r))
    return;
  this.elements.settings.buttons[e].querySelector(`.${this.config.classNames.menu.value}`).innerHTML = controls.getLabel.call(this, e, n);
  const a = r && r.querySelector(`[value="${n}"]`);
  is.element(a) && (a.checked = true);
}, getLabel(e, t) {
  switch (e) {
    case "speed":
      return 1 === t ? i18n.get("normal", this.config) : `${t}&times;`;
    case "quality":
      if (is.number(t)) {
        const e2 = i18n.get(`qualityLabel.${t}`, this.config);
        return e2.length ? e2 : `${t}p`;
      }
      return toTitleCase(t);
    case "captions":
      return captions.getLabel.call(this);
    default:
      return null;
  }
}, setQualityMenu(e) {
  if (!is.element(this.elements.settings.panels.quality))
    return;
  const t = "quality", i = this.elements.settings.panels.quality.querySelector('[role="menu"]');
  is.array(e) && (this.options.quality = dedupe(e).filter((e2) => this.config.quality.options.includes(e2)));
  const s = !is.empty(this.options.quality) && this.options.quality.length > 1;
  if (controls.toggleMenuButton.call(this, t, s), emptyElement(i), controls.checkMenu.call(this), !s)
    return;
  const n = (e2) => {
    const t2 = i18n.get(`qualityBadge.${e2}`, this.config);
    return t2.length ? controls.createBadge.call(this, t2) : null;
  };
  this.options.quality.sort((e2, t2) => {
    const i2 = this.config.quality.options;
    return i2.indexOf(e2) > i2.indexOf(t2) ? 1 : -1;
  }).forEach((e2) => {
    controls.createMenuItem.call(this, { value: e2, list: i, type: t, title: controls.getLabel.call(this, "quality", e2), badge: n(e2) });
  }), controls.updateSetting.call(this, t, i);
}, setCaptionsMenu() {
  if (!is.element(this.elements.settings.panels.captions))
    return;
  const e = "captions", t = this.elements.settings.panels.captions.querySelector('[role="menu"]'), i = captions.getTracks.call(this), s = Boolean(i.length);
  if (controls.toggleMenuButton.call(this, e, s), emptyElement(t), controls.checkMenu.call(this), !s)
    return;
  const n = i.map((e2, i2) => ({ value: i2, checked: this.captions.toggled && this.currentTrack === i2, title: captions.getLabel.call(this, e2), badge: e2.language && controls.createBadge.call(this, e2.language.toUpperCase()), list: t, type: "language" }));
  n.unshift({ value: -1, checked: !this.captions.toggled, title: i18n.get("disabled", this.config), list: t, type: "language" }), n.forEach(controls.createMenuItem.bind(this)), controls.updateSetting.call(this, e, t);
}, setSpeedMenu() {
  if (!is.element(this.elements.settings.panels.speed))
    return;
  const e = "speed", t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
  this.options.speed = this.options.speed.filter((e2) => e2 >= this.minimumSpeed && e2 <= this.maximumSpeed);
  const i = !is.empty(this.options.speed) && this.options.speed.length > 1;
  controls.toggleMenuButton.call(this, e, i), emptyElement(t), controls.checkMenu.call(this), i && (this.options.speed.forEach((i2) => {
    controls.createMenuItem.call(this, { value: i2, list: t, type: e, title: controls.getLabel.call(this, "speed", i2) });
  }), controls.updateSetting.call(this, e, t));
}, checkMenu() {
  const { buttons: e } = this.elements.settings, t = !is.empty(e) && Object.values(e).some((e2) => !e2.hidden);
  toggleHidden(this.elements.settings.menu, !t);
}, focusFirstMenuItem(e, t = false) {
  if (this.elements.settings.popup.hidden)
    return;
  let i = e;
  is.element(i) || (i = Object.values(this.elements.settings.panels).find((e2) => !e2.hidden));
  const s = i.querySelector('[role^="menuitem"]');
  setFocus.call(this, s, t);
}, toggleMenu(e) {
  const { popup: t } = this.elements.settings, i = this.elements.buttons.settings;
  if (!is.element(t) || !is.element(i))
    return;
  const { hidden: s } = t;
  let n = s;
  if (is.boolean(e))
    n = e;
  else if (is.keyboardEvent(e) && "Escape" === e.key)
    n = false;
  else if (is.event(e)) {
    const s2 = is.function(e.composedPath) ? e.composedPath()[0] : e.target, r = t.contains(s2);
    if (r || !r && e.target !== i && n)
      return;
  }
  i.setAttribute("aria-expanded", n), toggleHidden(t, !n), toggleClass$1(this.elements.container, this.config.classNames.menu.open, n), n && is.keyboardEvent(e) ? controls.focusFirstMenuItem.call(this, null, true) : n || s || setFocus.call(this, i, is.keyboardEvent(e));
}, getMenuSize(e) {
  const t = e.cloneNode(true);
  t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
  const i = t.scrollWidth, s = t.scrollHeight;
  return removeElement(t), { width: i, height: s };
}, showMenuPanel(e = "", t = false) {
  const i = this.elements.container.querySelector(`#plyr-settings-${this.id}-${e}`);
  if (!is.element(i))
    return;
  const s = i.parentNode, n = Array.from(s.children).find((e2) => !e2.hidden);
  if (support.transitions && !support.reducedMotion) {
    s.style.width = `${n.scrollWidth}px`, s.style.height = `${n.scrollHeight}px`;
    const e2 = controls.getMenuSize.call(this, i), t2 = (e3) => {
      e3.target === s && ["width", "height"].includes(e3.propertyName) && (s.style.width = "", s.style.height = "", off.call(this, s, transitionEndEvent, t2));
    };
    on.call(this, s, transitionEndEvent, t2), s.style.width = `${e2.width}px`, s.style.height = `${e2.height}px`;
  }
  toggleHidden(n, true), toggleHidden(i, false), controls.focusFirstMenuItem.call(this, i, t);
}, setDownloadUrl() {
  const e = this.elements.buttons.download;
  is.element(e) && e.setAttribute("href", this.download);
}, create(e) {
  const { bindMenuItemShortcuts: t, createButton: i, createProgress: s, createRange: n, createTime: r, setQualityMenu: a, setSpeedMenu: o, showMenuPanel: l } = controls;
  this.elements.controls = null, is.array(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
  const c = createElement("div", getAttributesFromSelector(this.config.selectors.controls.wrapper));
  this.elements.controls = c;
  const u = { class: "plyr__controls__item" };
  return dedupe(is.array(this.config.controls) ? this.config.controls : []).forEach((a2) => {
    if ("restart" === a2 && c.appendChild(i.call(this, "restart", u)), "rewind" === a2 && c.appendChild(i.call(this, "rewind", u)), "play" === a2 && c.appendChild(i.call(this, "play", u)), "fast-forward" === a2 && c.appendChild(i.call(this, "fast-forward", u)), "progress" === a2) {
      const t2 = createElement("div", { class: `${u.class} plyr__progress__container` }), i2 = createElement("div", getAttributesFromSelector(this.config.selectors.progress));
      if (i2.appendChild(n.call(this, "seek", { id: `plyr-seek-${e.id}` })), i2.appendChild(s.call(this, "buffer")), this.config.tooltips.seek) {
        const e2 = createElement("span", { class: this.config.classNames.tooltip }, "00:00");
        i2.appendChild(e2), this.elements.display.seekTooltip = e2;
      }
      this.elements.progress = i2, t2.appendChild(this.elements.progress), c.appendChild(t2);
    }
    if ("current-time" === a2 && c.appendChild(r.call(this, "currentTime", u)), "duration" === a2 && c.appendChild(r.call(this, "duration", u)), "mute" === a2 || "volume" === a2) {
      let { volume: t2 } = this.elements;
      if (is.element(t2) && c.contains(t2) || (t2 = createElement("div", extend({}, u, { class: `${u.class} plyr__volume`.trim() })), this.elements.volume = t2, c.appendChild(t2)), "mute" === a2 && t2.appendChild(i.call(this, "mute")), "volume" === a2 && !browser.isIos) {
        const i2 = { max: 1, step: 0.05, value: this.config.volume };
        t2.appendChild(n.call(this, "volume", extend(i2, { id: `plyr-volume-${e.id}` })));
      }
    }
    if ("captions" === a2 && c.appendChild(i.call(this, "captions", u)), "settings" === a2 && !is.empty(this.config.settings)) {
      const s2 = createElement("div", extend({}, u, { class: `${u.class} plyr__menu`.trim(), hidden: "" }));
      s2.appendChild(i.call(this, "settings", { "aria-haspopup": true, "aria-controls": `plyr-settings-${e.id}`, "aria-expanded": false }));
      const n2 = createElement("div", { class: "plyr__menu__container", id: `plyr-settings-${e.id}`, hidden: "" }), r2 = createElement("div"), a3 = createElement("div", { id: `plyr-settings-${e.id}-home` }), o2 = createElement("div", { role: "menu" });
      a3.appendChild(o2), r2.appendChild(a3), this.elements.settings.panels.home = a3, this.config.settings.forEach((i2) => {
        const s3 = createElement("button", extend(getAttributesFromSelector(this.config.selectors.buttons.settings), { type: "button", class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`, role: "menuitem", "aria-haspopup": true, hidden: "" }));
        t.call(this, s3, i2), on.call(this, s3, "click", () => {
          l.call(this, i2, false);
        });
        const n3 = createElement("span", null, i18n.get(i2, this.config)), a4 = createElement("span", { class: this.config.classNames.menu.value });
        a4.innerHTML = e[i2], n3.appendChild(a4), s3.appendChild(n3), o2.appendChild(s3);
        const c2 = createElement("div", { id: `plyr-settings-${e.id}-${i2}`, hidden: "" }), u2 = createElement("button", { type: "button", class: `${this.config.classNames.control} ${this.config.classNames.control}--back` });
        u2.appendChild(createElement("span", { "aria-hidden": true }, i18n.get(i2, this.config))), u2.appendChild(createElement("span", { class: this.config.classNames.hidden }, i18n.get("menuBack", this.config))), on.call(this, c2, "keydown", (e2) => {
          "ArrowLeft" === e2.key && (e2.preventDefault(), e2.stopPropagation(), l.call(this, "home", true));
        }, false), on.call(this, u2, "click", () => {
          l.call(this, "home", false);
        }), c2.appendChild(u2), c2.appendChild(createElement("div", { role: "menu" })), r2.appendChild(c2), this.elements.settings.buttons[i2] = s3, this.elements.settings.panels[i2] = c2;
      }), n2.appendChild(r2), s2.appendChild(n2), c.appendChild(s2), this.elements.settings.popup = n2, this.elements.settings.menu = s2;
    }
    if ("pip" === a2 && support.pip && c.appendChild(i.call(this, "pip", u)), "airplay" === a2 && support.airplay && c.appendChild(i.call(this, "airplay", u)), "download" === a2) {
      const e2 = extend({}, u, { element: "a", href: this.download, target: "_blank" });
      this.isHTML5 && (e2.download = "");
      const { download: t2 } = this.config.urls;
      !is.url(t2) && this.isEmbed && extend(e2, { icon: `logo-${this.provider}`, label: this.provider }), c.appendChild(i.call(this, "download", e2));
    }
    "fullscreen" === a2 && c.appendChild(i.call(this, "fullscreen", u));
  }), this.isHTML5 && a.call(this, html5.getQualityOptions.call(this)), o.call(this), c;
}, inject() {
  if (this.config.loadSprite) {
    const e2 = controls.getIconUrl.call(this);
    e2.cors && loadSprite(e2.url, "sprite-plyr");
  }
  this.id = Math.floor(1e4 * Math.random());
  let e = null;
  this.elements.controls = null;
  const t = { id: this.id, seektime: this.config.seekTime, title: this.config.title };
  let i = true;
  is.function(this.config.controls) && (this.config.controls = this.config.controls.call(this, t)), this.config.controls || (this.config.controls = []), is.element(this.config.controls) || is.string(this.config.controls) ? e = this.config.controls : (e = controls.create.call(this, { id: this.id, seektime: this.config.seekTime, speed: this.speed, quality: this.quality, captions: captions.getLabel.call(this) }), i = false);
  let s;
  i && is.string(this.config.controls) && (e = ((e2) => {
    let i2 = e2;
    return Object.entries(t).forEach(([e3, t2]) => {
      i2 = replaceAll(i2, `{${e3}}`, t2);
    }), i2;
  })(e)), is.string(this.config.selectors.controls.container) && (s = document.querySelector(this.config.selectors.controls.container)), is.element(s) || (s = this.elements.container);
  if (s[is.element(e) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", e), is.element(this.elements.controls) || controls.findElements.call(this), !is.empty(this.elements.buttons)) {
    const e2 = (e3) => {
      const t2 = this.config.classNames.controlPressed;
      e3.setAttribute("aria-pressed", "false"), Object.defineProperty(e3, "pressed", { configurable: true, enumerable: true, get: () => hasClass$1(e3, t2), set(i2 = false) {
        toggleClass$1(e3, t2, i2), e3.setAttribute("aria-pressed", i2 ? "true" : "false");
      } });
    };
    Object.values(this.elements.buttons).filter(Boolean).forEach((t2) => {
      is.array(t2) || is.nodeList(t2) ? Array.from(t2).filter(Boolean).forEach(e2) : e2(t2);
    });
  }
  if (browser.isEdge && repaint(s), this.config.tooltips.controls) {
    const { classNames: e2, selectors: t2 } = this.config, i2 = `${t2.controls.wrapper} ${t2.labels} .${e2.hidden}`, s2 = getElements.call(this, i2);
    Array.from(s2).forEach((e3) => {
      toggleClass$1(e3, this.config.classNames.hidden, false), toggleClass$1(e3, this.config.classNames.tooltip, true);
    });
  }
}, setMediaMetadata() {
  try {
    "mediaSession" in navigator && (navigator.mediaSession.metadata = new window.MediaMetadata({ title: this.config.mediaMetadata.title, artist: this.config.mediaMetadata.artist, album: this.config.mediaMetadata.album, artwork: this.config.mediaMetadata.artwork }));
  } catch (e) {
  }
}, setMarkers() {
  var e, t;
  if (!this.duration || this.elements.markers)
    return;
  const i = null === (e = this.config.markers) || void 0 === e || null === (t = e.points) || void 0 === t ? void 0 : t.filter(({ time: e2 }) => e2 > 0 && e2 < this.duration);
  if (null == i || !i.length)
    return;
  const s = document.createDocumentFragment(), n = document.createDocumentFragment();
  let r = null;
  const a = `${this.config.classNames.tooltip}--visible`, o = (e2) => toggleClass$1(r, a, e2);
  i.forEach((e2) => {
    const t2 = createElement("span", { class: this.config.classNames.marker }, ""), i2 = e2.time / this.duration * 100 + "%";
    r && (t2.addEventListener("mouseenter", () => {
      e2.label || (r.style.left = i2, r.innerHTML = e2.label, o(true));
    }), t2.addEventListener("mouseleave", () => {
      o(false);
    })), t2.addEventListener("click", () => {
      this.currentTime = e2.time;
    }), t2.style.left = i2, n.appendChild(t2);
  }), s.appendChild(n), this.config.tooltips.seek || (r = createElement("span", { class: this.config.classNames.tooltip }, ""), s.appendChild(r)), this.elements.markers = { points: n, tip: r }, this.elements.progress.appendChild(s);
} };
function parseUrl(e, t = true) {
  let i = e;
  if (t) {
    const e2 = document.createElement("a");
    e2.href = i, i = e2.href;
  }
  try {
    return new URL(i);
  } catch (e2) {
    return null;
  }
}
function buildUrlParams(e) {
  const t = new URLSearchParams();
  return is.object(e) && Object.entries(e).forEach(([e2, i]) => {
    t.set(e2, i);
  }), t;
}
const captions = { setup() {
  if (!this.supported.ui)
    return;
  if (!this.isVideo || this.isYouTube || this.isHTML5 && !support.textTracks)
    return void (is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && controls.setCaptionsMenu.call(this));
  if (is.element(this.elements.captions) || (this.elements.captions = createElement("div", getAttributesFromSelector(this.config.selectors.captions)), this.elements.captions.setAttribute("dir", "auto"), insertAfter(this.elements.captions, this.elements.wrapper)), browser.isIE && window.URL) {
    const e2 = this.media.querySelectorAll("track");
    Array.from(e2).forEach((e3) => {
      const t2 = e3.getAttribute("src"), i2 = parseUrl(t2);
      null !== i2 && i2.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i2.protocol) && fetch(t2, "blob").then((t3) => {
        e3.setAttribute("src", window.URL.createObjectURL(t3));
      }).catch(() => {
        removeElement(e3);
      });
    });
  }
  const e = dedupe((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map((e2) => e2.split("-")[0]));
  let t = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
  "auto" === t && ([t] = e);
  let i = this.storage.get("captions");
  if (is.boolean(i) || ({ active: i } = this.config.captions), Object.assign(this.captions, { toggled: false, active: i, language: t, languages: e }), this.isHTML5) {
    const e2 = this.config.captions.update ? "addtrack removetrack" : "removetrack";
    on.call(this, this.media.textTracks, e2, captions.update.bind(this));
  }
  setTimeout(captions.update.bind(this), 0);
}, update() {
  const e = captions.getTracks.call(this, true), { active: t, language: i, meta: s, currentTrackNode: n } = this.captions, r = Boolean(e.find((e2) => e2.language === i));
  this.isHTML5 && this.isVideo && e.filter((e2) => !s.get(e2)).forEach((e2) => {
    this.debug.log("Track added", e2), s.set(e2, { default: "showing" === e2.mode }), "showing" === e2.mode && (e2.mode = "hidden"), on.call(this, e2, "cuechange", () => captions.updateCues.call(this));
  }), (r && this.language !== i || !e.includes(n)) && (captions.setLanguage.call(this, i), captions.toggle.call(this, t && r)), this.elements && toggleClass$1(this.elements.container, this.config.classNames.captions.enabled, !is.empty(e)), is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && controls.setCaptionsMenu.call(this);
}, toggle(e, t = true) {
  if (!this.supported.ui)
    return;
  const { toggled: i } = this.captions, s = this.config.classNames.captions.active, n = is.nullOrUndefined(e) ? !i : e;
  if (n !== i) {
    if (t || (this.captions.active = n, this.storage.set({ captions: n })), !this.language && n && !t) {
      const e2 = captions.getTracks.call(this), t2 = captions.findTrack.call(this, [this.captions.language, ...this.captions.languages], true);
      return this.captions.language = t2.language, void captions.set.call(this, e2.indexOf(t2));
    }
    this.elements.buttons.captions && (this.elements.buttons.captions.pressed = n), toggleClass$1(this.elements.container, s, n), this.captions.toggled = n, controls.updateSetting.call(this, "captions"), triggerEvent.call(this, this.media, n ? "captionsenabled" : "captionsdisabled");
  }
  setTimeout(() => {
    n && this.captions.toggled && (this.captions.currentTrackNode.mode = "hidden");
  });
}, set(e, t = true) {
  const i = captions.getTracks.call(this);
  if (-1 !== e)
    if (is.number(e))
      if (e in i) {
        if (this.captions.currentTrack !== e) {
          this.captions.currentTrack = e;
          const s = i[e], { language: n } = s || {};
          this.captions.currentTrackNode = s, controls.updateSetting.call(this, "captions"), t || (this.captions.language = n, this.storage.set({ language: n })), this.isVimeo && this.embed.enableTextTrack(n), triggerEvent.call(this, this.media, "languagechange");
        }
        captions.toggle.call(this, true, t), this.isHTML5 && this.isVideo && captions.updateCues.call(this);
      } else
        this.debug.warn("Track not found", e);
    else
      this.debug.warn("Invalid caption argument", e);
  else
    captions.toggle.call(this, false, t);
}, setLanguage(e, t = true) {
  if (!is.string(e))
    return void this.debug.warn("Invalid language argument", e);
  const i = e.toLowerCase();
  this.captions.language = i;
  const s = captions.getTracks.call(this), n = captions.findTrack.call(this, [i]);
  captions.set.call(this, s.indexOf(n), t);
}, getTracks(e = false) {
  return Array.from((this.media || {}).textTracks || []).filter((t) => !this.isHTML5 || e || this.captions.meta.has(t)).filter((e2) => ["captions", "subtitles"].includes(e2.kind));
}, findTrack(e, t = false) {
  const i = captions.getTracks.call(this), s = (e2) => Number((this.captions.meta.get(e2) || {}).default), n = Array.from(i).sort((e2, t2) => s(t2) - s(e2));
  let r;
  return e.every((e2) => (r = n.find((t2) => t2.language === e2), !r)), r || (t ? n[0] : void 0);
}, getCurrentTrack() {
  return captions.getTracks.call(this)[this.currentTrack];
}, getLabel(e) {
  let t = e;
  return !is.track(t) && support.textTracks && this.captions.toggled && (t = captions.getCurrentTrack.call(this)), is.track(t) ? is.empty(t.label) ? is.empty(t.language) ? i18n.get("enabled", this.config) : e.language.toUpperCase() : t.label : i18n.get("disabled", this.config);
}, updateCues(e) {
  if (!this.supported.ui)
    return;
  if (!is.element(this.elements.captions))
    return void this.debug.warn("No captions element to render to");
  if (!is.nullOrUndefined(e) && !Array.isArray(e))
    return void this.debug.warn("updateCues: Invalid input", e);
  let t = e;
  if (!t) {
    const e2 = captions.getCurrentTrack.call(this);
    t = Array.from((e2 || {}).activeCues || []).map((e3) => e3.getCueAsHTML()).map(getHTML);
  }
  const i = t.map((e2) => e2.trim()).join("\n");
  if (i !== this.elements.captions.innerHTML) {
    emptyElement(this.elements.captions);
    const e2 = createElement("span", getAttributesFromSelector(this.config.selectors.caption));
    e2.innerHTML = i, this.elements.captions.appendChild(e2), triggerEvent.call(this, this.media, "cuechange");
  }
} }, defaults = { enabled: true, title: "", debug: false, autoplay: false, autopause: true, playsinline: true, seekTime: 10, volume: 1, muted: false, duration: null, displayDuration: true, invertTime: true, toggleInvert: true, ratio: null, clickToPlay: true, hideControls: true, resetOnEnd: false, disableContextMenu: true, loadSprite: true, iconPrefix: "plyr", iconUrl: "https://cdn.plyr.io/3.7.3/plyr.svg", blankVideo: "https://cdn.plyr.io/static/blank.mp4", quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240], forced: false, onChange: null }, loop: { active: false }, speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] }, keyboard: { focused: true, global: false }, tooltips: { controls: false, seek: true }, captions: { active: false, language: "auto", update: false }, fullscreen: { enabled: true, fallback: true, iosNative: false }, storage: { enabled: true, key: "plyr" }, controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"], settings: ["captions", "quality", "speed"], i18n: { restart: "Restart", rewind: "Rewind {seektime}s", play: "Play", pause: "Pause", fastForward: "Forward {seektime}s", seek: "Seek", seekLabel: "{currentTime} of {duration}", played: "Played", buffered: "Buffered", currentTime: "Current time", duration: "Duration", volume: "Volume", mute: "Mute", unmute: "Unmute", enableCaptions: "Enable captions", disableCaptions: "Disable captions", download: "Download", enterFullscreen: "Enter fullscreen", exitFullscreen: "Exit fullscreen", frameTitle: "Player for {title}", captions: "Captions", settings: "Settings", pip: "PIP", menuBack: "Go back to previous menu", speed: "Speed", normal: "Normal", quality: "Quality", loop: "Loop", start: "Start", end: "End", all: "All", reset: "Reset", disabled: "Disabled", enabled: "Enabled", advertisement: "Ad", qualityBadge: { 2160: "4K", 1440: "HD", 1080: "HD", 720: "HD", 576: "SD", 480: "SD" } }, urls: { download: null, vimeo: { sdk: "https://player.vimeo.com/api/player.js", iframe: "https://player.vimeo.com/video/{0}?{1}", api: "https://vimeo.com/api/oembed.json?url={0}" }, youtube: { sdk: "https://www.youtube.com/iframe_api", api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}" }, googleIMA: { sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js" } }, listeners: { seek: null, play: null, pause: null, restart: null, rewind: null, fastForward: null, mute: null, volume: null, captions: null, download: null, fullscreen: null, pip: null, airplay: null, speed: null, quality: null, loop: null, language: null }, events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"], selectors: { editable: "input, textarea, select, [contenteditable]", container: ".plyr", controls: { container: null, wrapper: ".plyr__controls" }, labels: "[data-plyr]", buttons: { play: '[data-plyr="play"]', pause: '[data-plyr="pause"]', restart: '[data-plyr="restart"]', rewind: '[data-plyr="rewind"]', fastForward: '[data-plyr="fast-forward"]', mute: '[data-plyr="mute"]', captions: '[data-plyr="captions"]', download: '[data-plyr="download"]', fullscreen: '[data-plyr="fullscreen"]', pip: '[data-plyr="pip"]', airplay: '[data-plyr="airplay"]', settings: '[data-plyr="settings"]', loop: '[data-plyr="loop"]' }, inputs: { seek: '[data-plyr="seek"]', volume: '[data-plyr="volume"]', speed: '[data-plyr="speed"]', language: '[data-plyr="language"]', quality: '[data-plyr="quality"]' }, display: { currentTime: ".plyr__time--current", duration: ".plyr__time--duration", buffer: ".plyr__progress__buffer", loop: ".plyr__progress__loop", volume: ".plyr__volume--display" }, progress: ".plyr__progress", captions: ".plyr__captions", caption: ".plyr__caption" }, classNames: { type: "plyr--{0}", provider: "plyr--{0}", video: "plyr__video-wrapper", embed: "plyr__video-embed", videoFixedRatio: "plyr__video-wrapper--fixed-ratio", embedContainer: "plyr__video-embed__container", poster: "plyr__poster", posterEnabled: "plyr__poster-enabled", ads: "plyr__ads", control: "plyr__control", controlPressed: "plyr__control--pressed", playing: "plyr--playing", paused: "plyr--paused", stopped: "plyr--stopped", loading: "plyr--loading", hover: "plyr--hover", tooltip: "plyr__tooltip", cues: "plyr__cues", marker: "plyr__progress__marker", hidden: "plyr__sr-only", hideControls: "plyr--hide-controls", isIos: "plyr--is-ios", isTouch: "plyr--is-touch", uiSupported: "plyr--full-ui", noTransition: "plyr--no-transition", display: { time: "plyr__time" }, menu: { value: "plyr__menu__value", badge: "plyr__badge", open: "plyr--menu-open" }, captions: { enabled: "plyr--captions-enabled", active: "plyr--captions-active" }, fullscreen: { enabled: "plyr--fullscreen-enabled", fallback: "plyr--fullscreen-fallback" }, pip: { supported: "plyr--pip-supported", active: "plyr--pip-active" }, airplay: { supported: "plyr--airplay-supported", active: "plyr--airplay-active" }, tabFocus: "plyr__tab-focus", previewThumbnails: { thumbContainer: "plyr__preview-thumb", thumbContainerShown: "plyr__preview-thumb--is-shown", imageContainer: "plyr__preview-thumb__image-container", timeContainer: "plyr__preview-thumb__time-container", scrubbingContainer: "plyr__preview-scrubbing", scrubbingContainerShown: "plyr__preview-scrubbing--is-shown" } }, attributes: { embed: { provider: "data-plyr-provider", id: "data-plyr-embed-id", hash: "data-plyr-embed-hash" } }, ads: { enabled: false, publisherId: "", tagUrl: "" }, previewThumbnails: { enabled: false, src: "" }, vimeo: { byline: false, portrait: false, title: false, speed: true, transparent: false, customControls: true, referrerPolicy: null, premium: false }, youtube: { rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1, customControls: true, noCookie: false }, mediaMetadata: { title: "", artist: "", album: "", artwork: [] }, markers: { enabled: false, points: [] } }, pip = { active: "picture-in-picture", inactive: "inline" }, providers = { html5: "html5", youtube: "youtube", vimeo: "vimeo" }, types = { audio: "audio", video: "video" };
function getProviderByUrl(e) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? providers.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? providers.vimeo : null;
}
const noop$1 = () => {
};
class Console {
  constructor(e = false) {
    this.enabled = window.console && e, this.enabled && this.log("Debugging enabled");
  }
  get log() {
    return this.enabled ? Function.prototype.bind.call(console.log, console) : noop$1;
  }
  get warn() {
    return this.enabled ? Function.prototype.bind.call(console.warn, console) : noop$1;
  }
  get error() {
    return this.enabled ? Function.prototype.bind.call(console.error, console) : noop$1;
  }
}
class Fullscreen {
  constructor(e) {
    _defineProperty$1(this, "onChange", () => {
      if (!this.enabled)
        return;
      const e2 = this.player.elements.buttons.fullscreen;
      is.element(e2) && (e2.pressed = this.active);
      const t = this.target === this.player.media ? this.target : this.player.elements.container;
      triggerEvent.call(this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", true);
    }), _defineProperty$1(this, "toggleFallback", (e2 = false) => {
      if (e2 ? this.scrollPosition = { x: window.scrollX || 0, y: window.scrollY || 0 } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e2 ? "hidden" : "", toggleClass$1(this.target, this.player.config.classNames.fullscreen.fallback, e2), browser.isIos) {
        let t = document.head.querySelector('meta[name="viewport"]');
        const i = "viewport-fit=cover";
        t || (t = document.createElement("meta"), t.setAttribute("name", "viewport"));
        const s = is.string(t.content) && t.content.includes(i);
        e2 ? (this.cleanupViewport = !s, s || (t.content += `,${i}`)) : this.cleanupViewport && (t.content = t.content.split(",").filter((e3) => e3.trim() !== i).join(","));
      }
      this.onChange();
    }), _defineProperty$1(this, "trapFocus", (e2) => {
      if (browser.isIos || !this.active || "Tab" !== e2.key)
        return;
      const t = document.activeElement, i = getElements.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"), [s] = i, n = i[i.length - 1];
      t !== n || e2.shiftKey ? t === s && e2.shiftKey && (n.focus(), e2.preventDefault()) : (s.focus(), e2.preventDefault());
    }), _defineProperty$1(this, "update", () => {
      if (this.enabled) {
        let e2;
        e2 = this.forceFallback ? "Fallback (forced)" : Fullscreen.native ? "Native" : "Fallback", this.player.debug.log(`${e2} fullscreen enabled`);
      } else
        this.player.debug.log("Fullscreen not supported and fallback disabled");
      toggleClass$1(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
    }), _defineProperty$1(this, "enter", () => {
      this.enabled && (browser.isIos && this.player.config.fullscreen.iosNative ? this.player.isVimeo ? this.player.embed.requestFullscreen() : this.target.webkitEnterFullscreen() : !Fullscreen.native || this.forceFallback ? this.toggleFallback(true) : this.prefix ? is.empty(this.prefix) || this.target[`${this.prefix}Request${this.property}`]() : this.target.requestFullscreen({ navigationUI: "hide" }));
    }), _defineProperty$1(this, "exit", () => {
      if (this.enabled)
        if (browser.isIos && this.player.config.fullscreen.iosNative)
          this.target.webkitExitFullscreen(), silencePromise(this.player.play());
        else if (!Fullscreen.native || this.forceFallback)
          this.toggleFallback(false);
        else if (this.prefix) {
          if (!is.empty(this.prefix)) {
            const e2 = "moz" === this.prefix ? "Cancel" : "Exit";
            document[`${this.prefix}${e2}${this.property}`]();
          }
        } else
          (document.cancelFullScreen || document.exitFullscreen).call(document);
    }), _defineProperty$1(this, "toggle", () => {
      this.active ? this.exit() : this.enter();
    }), this.player = e, this.prefix = Fullscreen.prefix, this.property = Fullscreen.property, this.scrollPosition = { x: 0, y: 0 }, this.forceFallback = "force" === e.config.fullscreen.fallback, this.player.elements.fullscreen = e.config.fullscreen.container && closest$1(this.player.elements.container, e.config.fullscreen.container), on.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : `${this.prefix}fullscreenchange`, () => {
      this.onChange();
    }), on.call(this.player, this.player.elements.container, "dblclick", (e2) => {
      is.element(this.player.elements.controls) && this.player.elements.controls.contains(e2.target) || this.player.listeners.proxy(e2, this.toggle, "fullscreen");
    }), on.call(this, this.player.elements.container, "keydown", (e2) => this.trapFocus(e2)), this.update();
  }
  static get native() {
    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
  }
  get usingNative() {
    return Fullscreen.native && !this.forceFallback;
  }
  static get prefix() {
    if (is.function(document.exitFullscreen))
      return "";
    let e = "";
    return ["webkit", "moz", "ms"].some((t) => !(!is.function(document[`${t}ExitFullscreen`]) && !is.function(document[`${t}CancelFullScreen`])) && (e = t, true)), e;
  }
  static get property() {
    return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
  }
  get enabled() {
    return (Fullscreen.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
  }
  get active() {
    if (!this.enabled)
      return false;
    if (!Fullscreen.native || this.forceFallback)
      return hasClass$1(this.target, this.player.config.classNames.fullscreen.fallback);
    const e = this.prefix ? this.target.getRootNode()[`${this.prefix}${this.property}Element`] : this.target.getRootNode().fullscreenElement;
    return e && e.shadowRoot ? e === this.target.getRootNode().host : e === this.target;
  }
  get target() {
    return browser.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container;
  }
}
function loadImage(e, t = 1) {
  return new Promise((i, s) => {
    const n = new Image(), r = () => {
      delete n.onload, delete n.onerror, (n.naturalWidth >= t ? i : s)(n);
    };
    Object.assign(n, { onload: r, onerror: r, src: e });
  });
}
const ui = { addStyleHook() {
  toggleClass$1(this.elements.container, this.config.selectors.container.replace(".", ""), true), toggleClass$1(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
}, toggleNativeControls(e = false) {
  e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls");
}, build() {
  if (this.listeners.media(), !this.supported.ui)
    return this.debug.warn(`Basic support only for ${this.provider} ${this.type}`), void ui.toggleNativeControls.call(this, true);
  is.element(this.elements.controls) || (controls.inject.call(this), this.listeners.controls()), ui.toggleNativeControls.call(this), this.isHTML5 && captions.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, controls.updateVolume.call(this), controls.timeUpdate.call(this), controls.durationUpdate.call(this), ui.checkPlaying.call(this), toggleClass$1(this.elements.container, this.config.classNames.pip.supported, support.pip && this.isHTML5 && this.isVideo), toggleClass$1(this.elements.container, this.config.classNames.airplay.supported, support.airplay && this.isHTML5), toggleClass$1(this.elements.container, this.config.classNames.isIos, browser.isIos), toggleClass$1(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = true, setTimeout(() => {
    triggerEvent.call(this, this.media, "ready");
  }, 0), ui.setTitle.call(this), this.poster && ui.setPoster.call(this, this.poster, false).catch(() => {
  }), this.config.duration && controls.durationUpdate.call(this), this.config.mediaMetadata && controls.setMediaMetadata.call(this);
}, setTitle() {
  let e = i18n.get("play", this.config);
  if (is.string(this.config.title) && !is.empty(this.config.title) && (e += `, ${this.config.title}`), Array.from(this.elements.buttons.play || []).forEach((t) => {
    t.setAttribute("aria-label", e);
  }), this.isEmbed) {
    const e2 = getElement.call(this, "iframe");
    if (!is.element(e2))
      return;
    const t = is.empty(this.config.title) ? "video" : this.config.title, i = i18n.get("frameTitle", this.config);
    e2.setAttribute("title", i.replace("{title}", t));
  }
}, togglePoster(e) {
  toggleClass$1(this.elements.container, this.config.classNames.posterEnabled, e);
}, setPoster(e, t = true) {
  return t && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), ready.call(this).then(() => loadImage(e)).catch((t2) => {
    throw e === this.poster && ui.togglePoster.call(this, false), t2;
  }).then(() => {
    if (e !== this.poster)
      throw new Error("setPoster cancelled by later call to setPoster");
  }).then(() => (Object.assign(this.elements.poster.style, { backgroundImage: `url('${e}')`, backgroundSize: "" }), ui.togglePoster.call(this, true), e)));
}, checkPlaying(e) {
  toggleClass$1(this.elements.container, this.config.classNames.playing, this.playing), toggleClass$1(this.elements.container, this.config.classNames.paused, this.paused), toggleClass$1(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach((e2) => {
    Object.assign(e2, { pressed: this.playing }), e2.setAttribute("aria-label", i18n.get(this.playing ? "pause" : "play", this.config));
  }), is.event(e) && "timeupdate" === e.type || ui.toggleControls.call(this);
}, checkLoading(e) {
  this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(() => {
    toggleClass$1(this.elements.container, this.config.classNames.loading, this.loading), ui.toggleControls.call(this);
  }, this.loading ? 250 : 0);
}, toggleControls(e) {
  const { controls: t } = this.elements;
  if (t && this.config.hideControls) {
    const i = this.touch && this.lastSeekTime + 2e3 > Date.now();
    this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || i));
  }
}, migrateStyles() {
  Object.values({ ...this.media.style }).filter((e) => !is.empty(e) && is.string(e) && e.startsWith("--plyr")).forEach((e) => {
    this.elements.container.style.setProperty(e, this.media.style.getPropertyValue(e)), this.media.style.removeProperty(e);
  }), is.empty(this.media.style) && this.media.removeAttribute("style");
} };
class Listeners {
  constructor(e) {
    _defineProperty$1(this, "firstTouch", () => {
      const { player: e2 } = this, { elements: t } = e2;
      e2.touch = true, toggleClass$1(t.container, e2.config.classNames.isTouch, true);
    }), _defineProperty$1(this, "setTabFocus", (e2) => {
      const { player: t } = this, { elements: i } = t, { key: s, type: n, timeStamp: r } = e2;
      if (clearTimeout(this.focusTimer), "keydown" === n && "Tab" !== s)
        return;
      "keydown" === n && (this.lastKeyDown = r);
      const a = r - this.lastKeyDown <= 20;
      ("focus" !== n || a) && ((() => {
        const e3 = t.config.classNames.tabFocus;
        toggleClass$1(getElements.call(t, `.${e3}`), e3, false);
      })(), "focusout" !== n && (this.focusTimer = setTimeout(() => {
        const e3 = document.activeElement;
        i.container.contains(e3) && toggleClass$1(document.activeElement, t.config.classNames.tabFocus, true);
      }, 10)));
    }), _defineProperty$1(this, "global", (e2 = true) => {
      const { player: t } = this;
      t.config.keyboard.global && toggleListener.call(t, window, "keydown keyup", this.handleKey, e2, false), toggleListener.call(t, document.body, "click", this.toggleMenu, e2), once.call(t, document.body, "touchstart", this.firstTouch), toggleListener.call(t, document.body, "keydown focus blur focusout", this.setTabFocus, e2, false, true);
    }), _defineProperty$1(this, "container", () => {
      const { player: e2 } = this, { config: t, elements: i, timers: s } = e2;
      !t.keyboard.global && t.keyboard.focused && on.call(e2, i.container, "keydown keyup", this.handleKey, false), on.call(e2, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", (t2) => {
        const { controls: n2 } = i;
        n2 && "enterfullscreen" === t2.type && (n2.pressed = false, n2.hover = false);
        let r2 = 0;
        ["touchstart", "touchmove", "mousemove"].includes(t2.type) && (ui.toggleControls.call(e2, true), r2 = e2.touch ? 3e3 : 2e3), clearTimeout(s.controls), s.controls = setTimeout(() => ui.toggleControls.call(e2, false), r2);
      });
      const n = () => {
        if (!e2.isVimeo || e2.config.vimeo.premium)
          return;
        const t2 = i.wrapper, { active: s2 } = e2.fullscreen, [n2, r2] = getAspectRatio.call(e2), a = supportsCSS(`aspect-ratio: ${n2} / ${r2}`);
        if (!s2)
          return void (a ? (t2.style.width = null, t2.style.height = null) : (t2.style.maxWidth = null, t2.style.margin = null));
        const [o, l] = getViewportSize(), c = o / l > n2 / r2;
        a ? (t2.style.width = c ? "auto" : "100%", t2.style.height = c ? "100%" : "auto") : (t2.style.maxWidth = c ? l / r2 * n2 + "px" : null, t2.style.margin = c ? "0 auto" : null);
      }, r = () => {
        clearTimeout(s.resized), s.resized = setTimeout(n, 50);
      };
      on.call(e2, i.container, "enterfullscreen exitfullscreen", (t2) => {
        const { target: s2 } = e2.fullscreen;
        if (s2 !== i.container)
          return;
        if (!e2.isEmbed && is.empty(e2.config.ratio))
          return;
        n();
        ("enterfullscreen" === t2.type ? on : off).call(e2, window, "resize", r);
      });
    }), _defineProperty$1(this, "media", () => {
      const { player: e2 } = this, { elements: t } = e2;
      if (on.call(e2, e2.media, "timeupdate seeking seeked", (t2) => controls.timeUpdate.call(e2, t2)), on.call(e2, e2.media, "durationchange loadeddata loadedmetadata", (t2) => controls.durationUpdate.call(e2, t2)), on.call(e2, e2.media, "ended", () => {
        e2.isHTML5 && e2.isVideo && e2.config.resetOnEnd && (e2.restart(), e2.pause());
      }), on.call(e2, e2.media, "progress playing seeking seeked", (t2) => controls.updateProgress.call(e2, t2)), on.call(e2, e2.media, "volumechange", (t2) => controls.updateVolume.call(e2, t2)), on.call(e2, e2.media, "playing play pause ended emptied timeupdate", (t2) => ui.checkPlaying.call(e2, t2)), on.call(e2, e2.media, "waiting canplay seeked playing", (t2) => ui.checkLoading.call(e2, t2)), e2.supported.ui && e2.config.clickToPlay && !e2.isAudio) {
        const i2 = getElement.call(e2, `.${e2.config.classNames.video}`);
        if (!is.element(i2))
          return;
        on.call(e2, t.container, "click", (s) => {
          ([t.container, i2].includes(s.target) || i2.contains(s.target)) && (e2.touch && e2.config.hideControls || (e2.ended ? (this.proxy(s, e2.restart, "restart"), this.proxy(s, () => {
            silencePromise(e2.play());
          }, "play")) : this.proxy(s, () => {
            silencePromise(e2.togglePlay());
          }, "play")));
        });
      }
      e2.supported.ui && e2.config.disableContextMenu && on.call(e2, t.wrapper, "contextmenu", (e3) => {
        e3.preventDefault();
      }, false), on.call(e2, e2.media, "volumechange", () => {
        e2.storage.set({ volume: e2.volume, muted: e2.muted });
      }), on.call(e2, e2.media, "ratechange", () => {
        controls.updateSetting.call(e2, "speed"), e2.storage.set({ speed: e2.speed });
      }), on.call(e2, e2.media, "qualitychange", (t2) => {
        controls.updateSetting.call(e2, "quality", null, t2.detail.quality);
      }), on.call(e2, e2.media, "ready qualitychange", () => {
        controls.setDownloadUrl.call(e2);
      });
      const i = e2.config.events.concat(["keyup", "keydown"]).join(" ");
      on.call(e2, e2.media, i, (i2) => {
        let { detail: s = {} } = i2;
        "error" === i2.type && (s = e2.media.error), triggerEvent.call(e2, t.container, i2.type, true, s);
      });
    }), _defineProperty$1(this, "proxy", (e2, t, i) => {
      const { player: s } = this, n = s.config.listeners[i];
      let r = true;
      is.function(n) && (r = n.call(s, e2)), false !== r && is.function(t) && t.call(s, e2);
    }), _defineProperty$1(this, "bind", (e2, t, i, s, n = true) => {
      const { player: r } = this, a = r.config.listeners[s], o = is.function(a);
      on.call(r, e2, t, (e3) => this.proxy(e3, i, s), n && !o);
    }), _defineProperty$1(this, "controls", () => {
      const { player: e2 } = this, { elements: t } = e2, i = browser.isIE ? "change" : "input";
      if (t.buttons.play && Array.from(t.buttons.play).forEach((t2) => {
        this.bind(t2, "click", () => {
          silencePromise(e2.togglePlay());
        }, "play");
      }), this.bind(t.buttons.restart, "click", e2.restart, "restart"), this.bind(t.buttons.rewind, "click", () => {
        e2.lastSeekTime = Date.now(), e2.rewind();
      }, "rewind"), this.bind(t.buttons.fastForward, "click", () => {
        e2.lastSeekTime = Date.now(), e2.forward();
      }, "fastForward"), this.bind(t.buttons.mute, "click", () => {
        e2.muted = !e2.muted;
      }, "mute"), this.bind(t.buttons.captions, "click", () => e2.toggleCaptions()), this.bind(t.buttons.download, "click", () => {
        triggerEvent.call(e2, e2.media, "download");
      }, "download"), this.bind(t.buttons.fullscreen, "click", () => {
        e2.fullscreen.toggle();
      }, "fullscreen"), this.bind(t.buttons.pip, "click", () => {
        e2.pip = "toggle";
      }, "pip"), this.bind(t.buttons.airplay, "click", e2.airplay, "airplay"), this.bind(t.buttons.settings, "click", (t2) => {
        t2.stopPropagation(), t2.preventDefault(), controls.toggleMenu.call(e2, t2);
      }, null, false), this.bind(t.buttons.settings, "keyup", (t2) => {
        ["Space", "Enter"].includes(t2.key) && ("Enter" !== t2.key ? (t2.preventDefault(), t2.stopPropagation(), controls.toggleMenu.call(e2, t2)) : controls.focusFirstMenuItem.call(e2, null, true));
      }, null, false), this.bind(t.settings.menu, "keydown", (t2) => {
        "Escape" === t2.key && controls.toggleMenu.call(e2, t2);
      }), this.bind(t.inputs.seek, "mousedown mousemove", (e3) => {
        const i2 = t.progress.getBoundingClientRect(), s = 100 / i2.width * (e3.pageX - i2.left);
        e3.currentTarget.setAttribute("seek-value", s);
      }), this.bind(t.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", (t2) => {
        const i2 = t2.currentTarget, s = "play-on-seeked";
        if (is.keyboardEvent(t2) && !["ArrowLeft", "ArrowRight"].includes(t2.key))
          return;
        e2.lastSeekTime = Date.now();
        const n = i2.hasAttribute(s), r = ["mouseup", "touchend", "keyup"].includes(t2.type);
        n && r ? (i2.removeAttribute(s), silencePromise(e2.play())) : !r && e2.playing && (i2.setAttribute(s, ""), e2.pause());
      }), browser.isIos) {
        const t2 = getElements.call(e2, 'input[type="range"]');
        Array.from(t2).forEach((e3) => this.bind(e3, i, (e4) => repaint(e4.target)));
      }
      this.bind(t.inputs.seek, i, (t2) => {
        const i2 = t2.currentTarget;
        let s = i2.getAttribute("seek-value");
        is.empty(s) && (s = i2.value), i2.removeAttribute("seek-value"), e2.currentTime = s / i2.max * e2.duration;
      }, "seek"), this.bind(t.progress, "mouseenter mouseleave mousemove", (t2) => controls.updateSeekTooltip.call(e2, t2)), this.bind(t.progress, "mousemove touchmove", (t2) => {
        const { previewThumbnails: i2 } = e2;
        i2 && i2.loaded && i2.startMove(t2);
      }), this.bind(t.progress, "mouseleave touchend click", () => {
        const { previewThumbnails: t2 } = e2;
        t2 && t2.loaded && t2.endMove(false, true);
      }), this.bind(t.progress, "mousedown touchstart", (t2) => {
        const { previewThumbnails: i2 } = e2;
        i2 && i2.loaded && i2.startScrubbing(t2);
      }), this.bind(t.progress, "mouseup touchend", (t2) => {
        const { previewThumbnails: i2 } = e2;
        i2 && i2.loaded && i2.endScrubbing(t2);
      }), browser.isWebkit && Array.from(getElements.call(e2, 'input[type="range"]')).forEach((t2) => {
        this.bind(t2, "input", (t3) => controls.updateRangeFill.call(e2, t3.target));
      }), e2.config.toggleInvert && !is.element(t.display.duration) && this.bind(t.display.currentTime, "click", () => {
        0 !== e2.currentTime && (e2.config.invertTime = !e2.config.invertTime, controls.timeUpdate.call(e2));
      }), this.bind(t.inputs.volume, i, (t2) => {
        e2.volume = t2.target.value;
      }, "volume"), this.bind(t.controls, "mouseenter mouseleave", (i2) => {
        t.controls.hover = !e2.touch && "mouseenter" === i2.type;
      }), t.fullscreen && Array.from(t.fullscreen.children).filter((e3) => !e3.contains(t.container)).forEach((i2) => {
        this.bind(i2, "mouseenter mouseleave", (i3) => {
          t.controls && (t.controls.hover = !e2.touch && "mouseenter" === i3.type);
        });
      }), this.bind(t.controls, "mousedown mouseup touchstart touchend touchcancel", (e3) => {
        t.controls.pressed = ["mousedown", "touchstart"].includes(e3.type);
      }), this.bind(t.controls, "focusin", () => {
        const { config: i2, timers: s } = e2;
        toggleClass$1(t.controls, i2.classNames.noTransition, true), ui.toggleControls.call(e2, true), setTimeout(() => {
          toggleClass$1(t.controls, i2.classNames.noTransition, false);
        }, 0);
        const n = this.touch ? 3e3 : 4e3;
        clearTimeout(s.controls), s.controls = setTimeout(() => ui.toggleControls.call(e2, false), n);
      }), this.bind(t.inputs.volume, "wheel", (t2) => {
        const i2 = t2.webkitDirectionInvertedFromDevice, [s, n] = [t2.deltaX, -t2.deltaY].map((e3) => i2 ? -e3 : e3), r = Math.sign(Math.abs(s) > Math.abs(n) ? s : n);
        e2.increaseVolume(r / 50);
        const { volume: a } = e2.media;
        (1 === r && a < 1 || -1 === r && a > 0) && t2.preventDefault();
      }, "volume", false);
    }), this.player = e, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this);
  }
  handleKey(e) {
    const { player: t } = this, { elements: i } = t, { key: s, type: n, altKey: r, ctrlKey: a, metaKey: o, shiftKey: l } = e, c = "keydown" === n, u = c && s === this.lastKey;
    if (r || a || o || l)
      return;
    if (!s)
      return;
    if (c) {
      const n2 = document.activeElement;
      if (is.element(n2)) {
        const { editable: s2 } = t.config.selectors, { seek: r2 } = i.inputs;
        if (n2 !== r2 && matches$2(n2, s2))
          return;
        if ("Space" === e.key && matches$2(n2, 'button, [role^="menuitem"]'))
          return;
      }
      switch (["Space", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "c", "f", "k", "l", "m"].includes(s) && (e.preventDefault(), e.stopPropagation()), s) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          u || (d = parseInt(s, 10), t.currentTime = t.duration / 10 * d);
          break;
        case "Space":
        case "k":
          u || silencePromise(t.togglePlay());
          break;
        case "ArrowUp":
          t.increaseVolume(0.1);
          break;
        case "ArrowDown":
          t.decreaseVolume(0.1);
          break;
        case "m":
          u || (t.muted = !t.muted);
          break;
        case "ArrowRight":
          t.forward();
          break;
        case "ArrowLeft":
          t.rewind();
          break;
        case "f":
          t.fullscreen.toggle();
          break;
        case "c":
          u || t.toggleCaptions();
          break;
        case "l":
          t.loop = !t.loop;
      }
      "Escape" === s && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = s;
    } else
      this.lastKey = null;
    var d;
  }
  toggleMenu(e) {
    controls.toggleMenu.call(this.player, e);
  }
}
function createCommonjsModule(e, t) {
  return e(t = { exports: {} }, t.exports), t.exports;
}
var loadjs_umd = createCommonjsModule(function(e, t) {
  e.exports = function() {
    var e2 = function() {
    }, t2 = {}, i = {}, s = {};
    function n(e3, t3) {
      e3 = e3.push ? e3 : [e3];
      var n2, r2, a2, o2 = [], l2 = e3.length, c2 = l2;
      for (n2 = function(e4, i2) {
        i2.length && o2.push(e4), --c2 || t3(o2);
      }; l2--; )
        r2 = e3[l2], (a2 = i[r2]) ? n2(r2, a2) : (s[r2] = s[r2] || []).push(n2);
    }
    function r(e3, t3) {
      if (e3) {
        var n2 = s[e3];
        if (i[e3] = t3, n2)
          for (; n2.length; )
            n2[0](e3, t3), n2.splice(0, 1);
      }
    }
    function a(t3, i2) {
      t3.call && (t3 = { success: t3 }), i2.length ? (t3.error || e2)(i2) : (t3.success || e2)(t3);
    }
    function o(t3, i2, s2, n2) {
      var r2, a2, l2 = document, c2 = s2.async, u = (s2.numRetries || 0) + 1, d = s2.before || e2, h = t3.replace(/[\?|#].*$/, ""), m = t3.replace(/^(css|img)!/, "");
      n2 = n2 || 0, /(^css!|\.css$)/.test(h) ? ((a2 = l2.createElement("link")).rel = "stylesheet", a2.href = m, (r2 = "hideFocus" in a2) && a2.relList && (r2 = 0, a2.rel = "preload", a2.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(h) ? (a2 = l2.createElement("img")).src = m : ((a2 = l2.createElement("script")).src = t3, a2.async = void 0 === c2 || c2), a2.onload = a2.onerror = a2.onbeforeload = function(e3) {
        var l3 = e3.type[0];
        if (r2)
          try {
            a2.sheet.cssText.length || (l3 = "e");
          } catch (e4) {
            18 != e4.code && (l3 = "e");
          }
        if ("e" == l3) {
          if ((n2 += 1) < u)
            return o(t3, i2, s2, n2);
        } else if ("preload" == a2.rel && "style" == a2.as)
          return a2.rel = "stylesheet";
        i2(t3, l3, e3.defaultPrevented);
      }, false !== d(t3, a2) && l2.head.appendChild(a2);
    }
    function l(e3, t3, i2) {
      var s2, n2, r2 = (e3 = e3.push ? e3 : [e3]).length, a2 = r2, l2 = [];
      for (s2 = function(e4, i3, s3) {
        if ("e" == i3 && l2.push(e4), "b" == i3) {
          if (!s3)
            return;
          l2.push(e4);
        }
        --r2 || t3(l2);
      }, n2 = 0; n2 < a2; n2++)
        o(e3[n2], s2, i2);
    }
    function c(e3, i2, s2) {
      var n2, o2;
      if (i2 && i2.trim && (n2 = i2), o2 = (n2 ? s2 : i2) || {}, n2) {
        if (n2 in t2)
          throw "LoadJS";
        t2[n2] = true;
      }
      function c2(t3, i3) {
        l(e3, function(e4) {
          a(o2, e4), t3 && a({ success: t3, error: i3 }, e4), r(n2, e4);
        }, o2);
      }
      if (o2.returnPromise)
        return new Promise(c2);
      c2();
    }
    return c.ready = function(e3, t3) {
      return n(e3, function(e4) {
        a(t3, e4);
      }), c;
    }, c.done = function(e3) {
      r(e3, []);
    }, c.reset = function() {
      t2 = {}, i = {}, s = {};
    }, c.isDefined = function(e3) {
      return e3 in t2;
    }, c;
  }();
});
function loadScript(e) {
  return new Promise((t, i) => {
    loadjs_umd(e, { success: t, error: i });
  });
}
function parseId$1(e) {
  if (is.empty(e))
    return null;
  if (is.number(Number(e)))
    return e;
  return e.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : e;
}
function parseHash(e) {
  const t = e.match(/^.*(vimeo.com\/|video\/)(\d+)(\?.*&*h=|\/)+([\d,a-f]+)/);
  return t && 5 === t.length ? t[4] : null;
}
function assurePlaybackState$1(e) {
  e && !this.embed.hasPlayed && (this.embed.hasPlayed = true), this.media.paused === e && (this.media.paused = !e, triggerEvent.call(this, this.media, e ? "play" : "pause"));
}
const vimeo = { setup() {
  const e = this;
  toggleClass$1(e.elements.wrapper, e.config.classNames.embed, true), e.options.speed = e.config.speed.options, setAspectRatio.call(e), is.object(window.Vimeo) ? vimeo.ready.call(e) : loadScript(e.config.urls.vimeo.sdk).then(() => {
    vimeo.ready.call(e);
  }).catch((t) => {
    e.debug.warn("Vimeo SDK (player.js) failed to load", t);
  });
}, ready() {
  const e = this, t = e.config.vimeo, { premium: i, referrerPolicy: s, ...n } = t;
  let r = e.media.getAttribute("src"), a = "";
  is.empty(r) ? (r = e.media.getAttribute(e.config.attributes.embed.id), a = e.media.getAttribute(e.config.attributes.embed.hash)) : a = parseHash(r);
  const o = a ? { h: a } : {};
  i && Object.assign(n, { controls: false, sidedock: false });
  const l = buildUrlParams({ loop: e.config.loop.active, autoplay: e.autoplay, muted: e.muted, gesture: "media", playsinline: !this.config.fullscreen.iosNative, ...o, ...n }), c = parseId$1(r), u = createElement("iframe"), d = format$1(e.config.urls.vimeo.iframe, c, l);
  if (u.setAttribute("src", d), u.setAttribute("allowfullscreen", ""), u.setAttribute("allow", ["autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope"].join("; ")), is.empty(s) || u.setAttribute("referrerPolicy", s), i || !t.customControls)
    u.setAttribute("data-poster", e.poster), e.media = replaceElement(u, e.media);
  else {
    const t2 = createElement("div", { class: e.config.classNames.embedContainer, "data-poster": e.poster });
    t2.appendChild(u), e.media = replaceElement(t2, e.media);
  }
  t.customControls || fetch(format$1(e.config.urls.vimeo.api, d)).then((t2) => {
    !is.empty(t2) && t2.thumbnail_url && ui.setPoster.call(e, t2.thumbnail_url).catch(() => {
    });
  }), e.embed = new window.Vimeo.Player(u, { autopause: e.config.autopause, muted: e.muted }), e.media.paused = true, e.media.currentTime = 0, e.supported.ui && e.embed.disableTextTrack(), e.media.play = () => (assurePlaybackState$1.call(e, true), e.embed.play()), e.media.pause = () => (assurePlaybackState$1.call(e, false), e.embed.pause()), e.media.stop = () => {
    e.pause(), e.currentTime = 0;
  };
  let { currentTime: h } = e.media;
  Object.defineProperty(e.media, "currentTime", { get: () => h, set(t2) {
    const { embed: i2, media: s2, paused: n2, volume: r2 } = e, a2 = n2 && !i2.hasPlayed;
    s2.seeking = true, triggerEvent.call(e, s2, "seeking"), Promise.resolve(a2 && i2.setVolume(0)).then(() => i2.setCurrentTime(t2)).then(() => a2 && i2.pause()).then(() => a2 && i2.setVolume(r2)).catch(() => {
    });
  } });
  let m = e.config.speed.selected;
  Object.defineProperty(e.media, "playbackRate", { get: () => m, set(t2) {
    e.embed.setPlaybackRate(t2).then(() => {
      m = t2, triggerEvent.call(e, e.media, "ratechange");
    }).catch(() => {
      e.options.speed = [1];
    });
  } });
  let { volume: p } = e.config;
  Object.defineProperty(e.media, "volume", { get: () => p, set(t2) {
    e.embed.setVolume(t2).then(() => {
      p = t2, triggerEvent.call(e, e.media, "volumechange");
    });
  } });
  let { muted: g } = e.config;
  Object.defineProperty(e.media, "muted", { get: () => g, set(t2) {
    const i2 = !!is.boolean(t2) && t2;
    e.embed.setVolume(i2 ? 0 : e.config.volume).then(() => {
      g = i2, triggerEvent.call(e, e.media, "volumechange");
    });
  } });
  let f, { loop: y } = e.config;
  Object.defineProperty(e.media, "loop", { get: () => y, set(t2) {
    const i2 = is.boolean(t2) ? t2 : e.config.loop.active;
    e.embed.setLoop(i2).then(() => {
      y = i2;
    });
  } }), e.embed.getVideoUrl().then((t2) => {
    f = t2, controls.setDownloadUrl.call(e);
  }).catch((e2) => {
    this.debug.warn(e2);
  }), Object.defineProperty(e.media, "currentSrc", { get: () => f }), Object.defineProperty(e.media, "ended", { get: () => e.currentTime === e.duration }), Promise.all([e.embed.getVideoWidth(), e.embed.getVideoHeight()]).then((t2) => {
    const [i2, s2] = t2;
    e.embed.ratio = roundAspectRatio(i2, s2), setAspectRatio.call(this);
  }), e.embed.setAutopause(e.config.autopause).then((t2) => {
    e.config.autopause = t2;
  }), e.embed.getVideoTitle().then((t2) => {
    e.config.title = t2, ui.setTitle.call(this);
  }), e.embed.getCurrentTime().then((t2) => {
    h = t2, triggerEvent.call(e, e.media, "timeupdate");
  }), e.embed.getDuration().then((t2) => {
    e.media.duration = t2, triggerEvent.call(e, e.media, "durationchange");
  }), e.embed.getTextTracks().then((t2) => {
    e.media.textTracks = t2, captions.setup.call(e);
  }), e.embed.on("cuechange", ({ cues: t2 = [] }) => {
    const i2 = t2.map((e2) => stripHTML(e2.text));
    captions.updateCues.call(e, i2);
  }), e.embed.on("loaded", () => {
    if (e.embed.getPaused().then((t2) => {
      assurePlaybackState$1.call(e, !t2), t2 || triggerEvent.call(e, e.media, "playing");
    }), is.element(e.embed.element) && e.supported.ui) {
      e.embed.element.setAttribute("tabindex", -1);
    }
  }), e.embed.on("bufferstart", () => {
    triggerEvent.call(e, e.media, "waiting");
  }), e.embed.on("bufferend", () => {
    triggerEvent.call(e, e.media, "playing");
  }), e.embed.on("play", () => {
    assurePlaybackState$1.call(e, true), triggerEvent.call(e, e.media, "playing");
  }), e.embed.on("pause", () => {
    assurePlaybackState$1.call(e, false);
  }), e.embed.on("timeupdate", (t2) => {
    e.media.seeking = false, h = t2.seconds, triggerEvent.call(e, e.media, "timeupdate");
  }), e.embed.on("progress", (t2) => {
    e.media.buffered = t2.percent, triggerEvent.call(e, e.media, "progress"), 1 === parseInt(t2.percent, 10) && triggerEvent.call(e, e.media, "canplaythrough"), e.embed.getDuration().then((t3) => {
      t3 !== e.media.duration && (e.media.duration = t3, triggerEvent.call(e, e.media, "durationchange"));
    });
  }), e.embed.on("seeked", () => {
    e.media.seeking = false, triggerEvent.call(e, e.media, "seeked");
  }), e.embed.on("ended", () => {
    e.media.paused = true, triggerEvent.call(e, e.media, "ended");
  }), e.embed.on("error", (t2) => {
    e.media.error = t2, triggerEvent.call(e, e.media, "error");
  }), t.customControls && setTimeout(() => ui.build.call(e), 0);
} };
function parseId(e) {
  if (is.empty(e))
    return null;
  return e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : e;
}
function assurePlaybackState(e) {
  e && !this.embed.hasPlayed && (this.embed.hasPlayed = true), this.media.paused === e && (this.media.paused = !e, triggerEvent.call(this, this.media, e ? "play" : "pause"));
}
function getHost(e) {
  return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0;
}
const youtube = { setup() {
  if (toggleClass$1(this.elements.wrapper, this.config.classNames.embed, true), is.object(window.YT) && is.function(window.YT.Player))
    youtube.ready.call(this);
  else {
    const e = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      is.function(e) && e(), youtube.ready.call(this);
    }, loadScript(this.config.urls.youtube.sdk).catch((e2) => {
      this.debug.warn("YouTube API failed to load", e2);
    });
  }
}, getTitle(e) {
  fetch(format$1(this.config.urls.youtube.api, e)).then((e2) => {
    if (is.object(e2)) {
      const { title: t, height: i, width: s } = e2;
      this.config.title = t, ui.setTitle.call(this), this.embed.ratio = roundAspectRatio(s, i);
    }
    setAspectRatio.call(this);
  }).catch(() => {
    setAspectRatio.call(this);
  });
}, ready() {
  const e = this, t = e.config.youtube, i = e.media && e.media.getAttribute("id");
  if (!is.empty(i) && i.startsWith("youtube-"))
    return;
  let s = e.media.getAttribute("src");
  is.empty(s) && (s = e.media.getAttribute(this.config.attributes.embed.id));
  const n = parseId(s), r = createElement("div", { id: generateId(e.provider), "data-poster": t.customControls ? e.poster : void 0 });
  if (e.media = replaceElement(r, e.media), t.customControls) {
    const t2 = (e2) => `https://i.ytimg.com/vi/${n}/${e2}default.jpg`;
    loadImage(t2("maxres"), 121).catch(() => loadImage(t2("sd"), 121)).catch(() => loadImage(t2("hq"))).then((t3) => ui.setPoster.call(e, t3.src)).then((t3) => {
      t3.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover");
    }).catch(() => {
    });
  }
  e.embed = new window.YT.Player(e.media, { videoId: n, host: getHost(t), playerVars: extend({}, { autoplay: e.config.autoplay ? 1 : 0, hl: e.config.hl, controls: e.supported.ui && t.customControls ? 0 : 1, disablekb: 1, playsinline: e.config.fullscreen.iosNative ? 0 : 1, cc_load_policy: e.captions.active ? 1 : 0, cc_lang_pref: e.config.captions.language, widget_referrer: window ? window.location.href : null }, t), events: { onError(t2) {
    if (!e.media.error) {
      const i2 = t2.data, s2 = { 2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.", 5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.", 100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.", 101: "The owner of the requested video does not allow it to be played in embedded players.", 150: "The owner of the requested video does not allow it to be played in embedded players." }[i2] || "An unknown error occured";
      e.media.error = { code: i2, message: s2 }, triggerEvent.call(e, e.media, "error");
    }
  }, onPlaybackRateChange(t2) {
    const i2 = t2.target;
    e.media.playbackRate = i2.getPlaybackRate(), triggerEvent.call(e, e.media, "ratechange");
  }, onReady(i2) {
    if (is.function(e.media.play))
      return;
    const s2 = i2.target;
    youtube.getTitle.call(e, n), e.media.play = () => {
      assurePlaybackState.call(e, true), s2.playVideo();
    }, e.media.pause = () => {
      assurePlaybackState.call(e, false), s2.pauseVideo();
    }, e.media.stop = () => {
      s2.stopVideo();
    }, e.media.duration = s2.getDuration(), e.media.paused = true, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", { get: () => Number(s2.getCurrentTime()), set(t2) {
      e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = true, triggerEvent.call(e, e.media, "seeking"), s2.seekTo(t2);
    } }), Object.defineProperty(e.media, "playbackRate", { get: () => s2.getPlaybackRate(), set(e2) {
      s2.setPlaybackRate(e2);
    } });
    let { volume: r2 } = e.config;
    Object.defineProperty(e.media, "volume", { get: () => r2, set(t2) {
      r2 = t2, s2.setVolume(100 * r2), triggerEvent.call(e, e.media, "volumechange");
    } });
    let { muted: a } = e.config;
    Object.defineProperty(e.media, "muted", { get: () => a, set(t2) {
      const i3 = is.boolean(t2) ? t2 : a;
      a = i3, s2[i3 ? "mute" : "unMute"](), s2.setVolume(100 * r2), triggerEvent.call(e, e.media, "volumechange");
    } }), Object.defineProperty(e.media, "currentSrc", { get: () => s2.getVideoUrl() }), Object.defineProperty(e.media, "ended", { get: () => e.currentTime === e.duration });
    const o = s2.getAvailablePlaybackRates();
    e.options.speed = o.filter((t2) => e.config.speed.options.includes(t2)), e.supported.ui && t.customControls && e.media.setAttribute("tabindex", -1), triggerEvent.call(e, e.media, "timeupdate"), triggerEvent.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(() => {
      e.media.buffered = s2.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && triggerEvent.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), triggerEvent.call(e, e.media, "canplaythrough"));
    }, 200), t.customControls && setTimeout(() => ui.build.call(e), 50);
  }, onStateChange(i2) {
    const s2 = i2.target;
    clearInterval(e.timers.playing);
    switch (e.media.seeking && [1, 2].includes(i2.data) && (e.media.seeking = false, triggerEvent.call(e, e.media, "seeked")), i2.data) {
      case -1:
        triggerEvent.call(e, e.media, "timeupdate"), e.media.buffered = s2.getVideoLoadedFraction(), triggerEvent.call(e, e.media, "progress");
        break;
      case 0:
        assurePlaybackState.call(e, false), e.media.loop ? (s2.stopVideo(), s2.playVideo()) : triggerEvent.call(e, e.media, "ended");
        break;
      case 1:
        t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (assurePlaybackState.call(e, true), triggerEvent.call(e, e.media, "playing"), e.timers.playing = setInterval(() => {
          triggerEvent.call(e, e.media, "timeupdate");
        }, 50), e.media.duration !== s2.getDuration() && (e.media.duration = s2.getDuration(), triggerEvent.call(e, e.media, "durationchange")));
        break;
      case 2:
        e.muted || e.embed.unMute(), assurePlaybackState.call(e, false);
        break;
      case 3:
        triggerEvent.call(e, e.media, "waiting");
    }
    triggerEvent.call(e, e.elements.container, "statechange", false, { code: i2.data });
  } } });
} }, media = { setup() {
  this.media ? (toggleClass$1(this.elements.container, this.config.classNames.type.replace("{0}", this.type), true), toggleClass$1(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), true), this.isEmbed && toggleClass$1(this.elements.container, this.config.classNames.type.replace("{0}", "video"), true), this.isVideo && (this.elements.wrapper = createElement("div", { class: this.config.classNames.video }), wrap(this.media, this.elements.wrapper), this.elements.poster = createElement("div", { class: this.config.classNames.poster }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? html5.setup.call(this) : this.isYouTube ? youtube.setup.call(this) : this.isVimeo && vimeo.setup.call(this)) : this.debug.warn("No media element found!");
} };
class Ads {
  constructor(e) {
    _defineProperty$1(this, "load", () => {
      this.enabled && (is.object(window.google) && is.object(window.google.ima) ? this.ready() : loadScript(this.player.config.urls.googleIMA.sdk).then(() => {
        this.ready();
      }).catch(() => {
        this.trigger("error", new Error("Google IMA SDK failed to load"));
      }));
    }), _defineProperty$1(this, "ready", () => {
      var e2;
      this.enabled || ((e2 = this).manager && e2.manager.destroy(), e2.elements.displayContainer && e2.elements.displayContainer.destroy(), e2.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(() => {
        this.clearSafetyTimer("onAdsManagerLoaded()");
      }), this.listeners(), this.setupIMA();
    }), _defineProperty$1(this, "setupIMA", () => {
      this.elements.container = createElement("div", { class: this.player.config.classNames.ads }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (e2) => this.onAdsManagerLoaded(e2), false), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (e2) => this.onAdError(e2), false), this.requestAds();
    }), _defineProperty$1(this, "requestAds", () => {
      const { container: e2 } = this.player.elements;
      try {
        const t = new google.ima.AdsRequest();
        t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e2.offsetWidth, t.linearAdSlotHeight = e2.offsetHeight, t.nonLinearAdSlotWidth = e2.offsetWidth, t.nonLinearAdSlotHeight = e2.offsetHeight, t.forceNonLinearFullSlot = false, t.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(t);
      } catch (e3) {
        this.onAdError(e3);
      }
    }), _defineProperty$1(this, "pollCountdown", (e2 = false) => {
      if (!e2)
        return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
      this.countdownTimer = setInterval(() => {
        const e3 = formatTime(Math.max(this.manager.getRemainingTime(), 0)), t = `${i18n.get("advertisement", this.player.config)} - ${e3}`;
        this.elements.container.setAttribute("data-badge-text", t);
      }, 100);
    }), _defineProperty$1(this, "onAdsManagerLoaded", (e2) => {
      if (!this.enabled)
        return;
      const t = new google.ima.AdsRenderingSettings();
      t.restoreCustomPlaybackStateOnAdBreakComplete = true, t.enablePreloading = true, this.manager = e2.getAdsManager(this.player, t), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (e3) => this.onAdError(e3)), Object.keys(google.ima.AdEvent.Type).forEach((e3) => {
        this.manager.addEventListener(google.ima.AdEvent.Type[e3], (e4) => this.onAdEvent(e4));
      }), this.trigger("loaded");
    }), _defineProperty$1(this, "addCuePoints", () => {
      is.empty(this.cuePoints) || this.cuePoints.forEach((e2) => {
        if (0 !== e2 && -1 !== e2 && e2 < this.player.duration) {
          const t = this.player.elements.progress;
          if (is.element(t)) {
            const i = 100 / this.player.duration * e2, s = createElement("span", { class: this.player.config.classNames.cues });
            s.style.left = `${i.toString()}%`, t.appendChild(s);
          }
        }
      });
    }), _defineProperty$1(this, "onAdEvent", (e2) => {
      const { container: t } = this.player.elements, i = e2.getAd(), s = e2.getAdData();
      switch (((e3) => {
        triggerEvent.call(this.player, this.player.media, `ads${e3.replace(/_/g, "").toLowerCase()}`);
      })(e2.type), e2.type) {
        case google.ima.AdEvent.Type.LOADED:
          this.trigger("loaded"), this.pollCountdown(true), i.isLinear() || (i.width = t.offsetWidth, i.height = t.offsetHeight);
          break;
        case google.ima.AdEvent.Type.STARTED:
          this.manager.setVolume(this.player.volume);
          break;
        case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
          this.player.ended ? this.loadAds() : this.loader.contentComplete();
          break;
        case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
          this.pauseContent();
          break;
        case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
          this.pollCountdown(), this.resumeContent();
          break;
        case google.ima.AdEvent.Type.LOG:
          s.adError && this.player.debug.warn(`Non-fatal ad error: ${s.adError.getMessage()}`);
      }
    }), _defineProperty$1(this, "onAdError", (e2) => {
      this.cancel(), this.player.debug.warn("Ads error", e2);
    }), _defineProperty$1(this, "listeners", () => {
      const { container: e2 } = this.player.elements;
      let t;
      this.player.on("canplay", () => {
        this.addCuePoints();
      }), this.player.on("ended", () => {
        this.loader.contentComplete();
      }), this.player.on("timeupdate", () => {
        t = this.player.currentTime;
      }), this.player.on("seeked", () => {
        const e3 = this.player.currentTime;
        is.empty(this.cuePoints) || this.cuePoints.forEach((i, s) => {
          t < i && i < e3 && (this.manager.discardAdBreak(), this.cuePoints.splice(s, 1));
        });
      }), window.addEventListener("resize", () => {
        this.manager && this.manager.resize(e2.offsetWidth, e2.offsetHeight, google.ima.ViewMode.NORMAL);
      });
    }), _defineProperty$1(this, "play", () => {
      const { container: e2 } = this.player.elements;
      this.managerPromise || this.resumeContent(), this.managerPromise.then(() => {
        this.manager.setVolume(this.player.volume), this.elements.displayContainer.initialize();
        try {
          this.initialized || (this.manager.init(e2.offsetWidth, e2.offsetHeight, google.ima.ViewMode.NORMAL), this.manager.start()), this.initialized = true;
        } catch (e3) {
          this.onAdError(e3);
        }
      }).catch(() => {
      });
    }), _defineProperty$1(this, "resumeContent", () => {
      this.elements.container.style.zIndex = "", this.playing = false, silencePromise(this.player.media.play());
    }), _defineProperty$1(this, "pauseContent", () => {
      this.elements.container.style.zIndex = 3, this.playing = true, this.player.media.pause();
    }), _defineProperty$1(this, "cancel", () => {
      this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds();
    }), _defineProperty$1(this, "loadAds", () => {
      this.managerPromise.then(() => {
        this.manager && this.manager.destroy(), this.managerPromise = new Promise((e2) => {
          this.on("loaded", e2), this.player.debug.log(this.manager);
        }), this.initialized = false, this.requestAds();
      }).catch(() => {
      });
    }), _defineProperty$1(this, "trigger", (e2, ...t) => {
      const i = this.events[e2];
      is.array(i) && i.forEach((e3) => {
        is.function(e3) && e3.apply(this, t);
      });
    }), _defineProperty$1(this, "on", (e2, t) => (is.array(this.events[e2]) || (this.events[e2] = []), this.events[e2].push(t), this)), _defineProperty$1(this, "startSafetyTimer", (e2, t) => {
      this.player.debug.log(`Safety timer invoked from: ${t}`), this.safetyTimer = setTimeout(() => {
        this.cancel(), this.clearSafetyTimer("startSafetyTimer()");
      }, e2);
    }), _defineProperty$1(this, "clearSafetyTimer", (e2) => {
      is.nullOrUndefined(this.safetyTimer) || (this.player.debug.log(`Safety timer cleared from: ${e2}`), clearTimeout(this.safetyTimer), this.safetyTimer = null);
    }), this.player = e, this.config = e.config.ads, this.playing = false, this.initialized = false, this.elements = { container: null, displayContainer: null }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise((e2, t) => {
      this.on("loaded", e2), this.on("error", t);
    }), this.load();
  }
  get enabled() {
    const { config: e } = this;
    return this.player.isHTML5 && this.player.isVideo && e.enabled && (!is.empty(e.publisherId) || is.url(e.tagUrl));
  }
  get tagUrl() {
    const { config: e } = this;
    if (is.url(e.tagUrl))
      return e.tagUrl;
    return `https://go.aniview.com/api/adserver6/vast/?${buildUrlParams({ AV_PUBLISHERID: "58c25bb0073ef448b1087ad6", AV_CHANNELID: "5a0458dc28a06145e4519d21", AV_URL: window.location.hostname, cb: Date.now(), AV_WIDTH: 640, AV_HEIGHT: 480, AV_CDIM2: e.publisherId })}`;
  }
}
function clamp$1(e = 0, t = 0, i = 255) {
  return Math.min(Math.max(e, t), i);
}
const parseVtt = (e) => {
  const t = [];
  return e.split(/\r\n\r\n|\n\n|\r\r/).forEach((e2) => {
    const i = {};
    e2.split(/\r\n|\n|\r/).forEach((e3) => {
      if (is.number(i.startTime)) {
        if (!is.empty(e3.trim()) && is.empty(i.text)) {
          const t2 = e3.trim().split("#xywh=");
          [i.text] = t2, t2[1] && ([i.x, i.y, i.w, i.h] = t2[1].split(","));
        }
      } else {
        const t2 = e3.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
        t2 && (i.startTime = 60 * Number(t2[1] || 0) * 60 + 60 * Number(t2[2]) + Number(t2[3]) + Number(`0.${t2[4]}`), i.endTime = 60 * Number(t2[6] || 0) * 60 + 60 * Number(t2[7]) + Number(t2[8]) + Number(`0.${t2[9]}`));
      }
    }), i.text && t.push(i);
  }), t;
}, fitRatio = (e, t) => {
  const i = {};
  return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i;
};
class PreviewThumbnails {
  constructor(e) {
    _defineProperty$1(this, "load", () => {
      this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(() => {
        this.enabled && (this.render(), this.determineContainerAutoSizing(), this.loaded = true);
      });
    }), _defineProperty$1(this, "getThumbnails", () => new Promise((e2) => {
      const { src: t } = this.player.config.previewThumbnails;
      if (is.empty(t))
        throw new Error("Missing previewThumbnails.src config attribute");
      const i = () => {
        this.thumbnails.sort((e3, t2) => e3.height - t2.height), this.player.debug.log("Preview thumbnails", this.thumbnails), e2();
      };
      if (is.function(t))
        t((e3) => {
          this.thumbnails = e3, i();
        });
      else {
        const e3 = (is.string(t) ? [t] : t).map((e4) => this.getThumbnail(e4));
        Promise.all(e3).then(i);
      }
    })), _defineProperty$1(this, "getThumbnail", (e2) => new Promise((t) => {
      fetch(e2).then((i) => {
        const s = { frames: parseVtt(i), height: null, urlPrefix: "" };
        s.frames[0].text.startsWith("/") || s.frames[0].text.startsWith("http://") || s.frames[0].text.startsWith("https://") || (s.urlPrefix = e2.substring(0, e2.lastIndexOf("/") + 1));
        const n = new Image();
        n.onload = () => {
          s.height = n.naturalHeight, s.width = n.naturalWidth, this.thumbnails.push(s), t();
        }, n.src = s.urlPrefix + s.frames[0].text;
      });
    })), _defineProperty$1(this, "startMove", (e2) => {
      if (this.loaded && is.event(e2) && ["touchmove", "mousemove"].includes(e2.type) && this.player.media.duration) {
        if ("touchmove" === e2.type)
          this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);
        else {
          var t, i;
          const s = this.player.elements.progress.getBoundingClientRect(), n = 100 / s.width * (e2.pageX - s.left);
          this.seekTime = this.player.media.duration * (n / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e2.pageX, this.elements.thumb.time.innerText = formatTime(this.seekTime);
          const r = null === (t = this.player.config.markers) || void 0 === t || null === (i = t.points) || void 0 === i ? void 0 : i.find(({ time: e3 }) => e3 === Math.round(this.seekTime));
          r && this.elements.thumb.time.insertAdjacentHTML("afterbegin", `${r.label}<br>`);
        }
        this.showImageAtCurrentTime();
      }
    }), _defineProperty$1(this, "endMove", () => {
      this.toggleThumbContainer(false, true);
    }), _defineProperty$1(this, "startScrubbing", (e2) => {
      (is.nullOrUndefined(e2.button) || false === e2.button || 0 === e2.button) && (this.mouseDown = true, this.player.media.duration && (this.toggleScrubbingContainer(true), this.toggleThumbContainer(false, true), this.showImageAtCurrentTime()));
    }), _defineProperty$1(this, "endScrubbing", () => {
      this.mouseDown = false, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(false) : once.call(this.player, this.player.media, "timeupdate", () => {
        this.mouseDown || this.toggleScrubbingContainer(false);
      });
    }), _defineProperty$1(this, "listeners", () => {
      this.player.on("play", () => {
        this.toggleThumbContainer(false, true);
      }), this.player.on("seeked", () => {
        this.toggleThumbContainer(false);
      }), this.player.on("timeupdate", () => {
        this.lastTime = this.player.media.currentTime;
      });
    }), _defineProperty$1(this, "render", () => {
      this.elements.thumb.container = createElement("div", { class: this.player.config.classNames.previewThumbnails.thumbContainer }), this.elements.thumb.imageContainer = createElement("div", { class: this.player.config.classNames.previewThumbnails.imageContainer }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
      const e2 = createElement("div", { class: this.player.config.classNames.previewThumbnails.timeContainer });
      this.elements.thumb.time = createElement("span", {}, "00:00"), e2.appendChild(this.elements.thumb.time), this.elements.thumb.imageContainer.appendChild(e2), is.element(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = createElement("div", { class: this.player.config.classNames.previewThumbnails.scrubbingContainer }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
    }), _defineProperty$1(this, "destroy", () => {
      this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove();
    }), _defineProperty$1(this, "showImageAtCurrentTime", () => {
      this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
      const e2 = this.thumbnails[0].frames.findIndex((e3) => this.seekTime >= e3.startTime && this.seekTime <= e3.endTime), t = e2 >= 0;
      let i = 0;
      this.mouseDown || this.toggleThumbContainer(t), t && (this.thumbnails.forEach((t2, s) => {
        this.loadedImages.includes(t2.frames[e2].text) && (i = s);
      }), e2 !== this.showingThumb && (this.showingThumb = e2, this.loadImage(i)));
    }), _defineProperty$1(this, "loadImage", (e2 = 0) => {
      const t = this.showingThumb, i = this.thumbnails[e2], { urlPrefix: s } = i, n = i.frames[t], r = i.frames[t].text, a = s + r;
      if (this.currentImageElement && this.currentImageElement.dataset.filename === r)
        this.showImage(this.currentImageElement, n, e2, t, r, false), this.currentImageElement.dataset.index = t, this.removeOldImages(this.currentImageElement);
      else {
        this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
        const i2 = new Image();
        i2.src = a, i2.dataset.index = t, i2.dataset.filename = r, this.showingThumbFilename = r, this.player.debug.log(`Loading image: ${a}`), i2.onload = () => this.showImage(i2, n, e2, t, r, true), this.loadingImage = i2, this.removeOldImages(i2);
      }
    }), _defineProperty$1(this, "showImage", (e2, t, i, s, n, r = true) => {
      this.player.debug.log(`Showing thumb: ${n}. num: ${s}. qual: ${i}. newimg: ${r}`), this.setImageSizeAndOffset(e2, t), r && (this.currentImageContainer.appendChild(e2), this.currentImageElement = e2, this.loadedImages.includes(n) || this.loadedImages.push(n)), this.preloadNearby(s, true).then(this.preloadNearby(s, false)).then(this.getHigherQuality(i, e2, t, n));
    }), _defineProperty$1(this, "removeOldImages", (e2) => {
      Array.from(this.currentImageContainer.children).forEach((t) => {
        if ("img" !== t.tagName.toLowerCase())
          return;
        const i = this.usingSprites ? 500 : 1e3;
        if (t.dataset.index !== e2.dataset.index && !t.dataset.deleting) {
          t.dataset.deleting = true;
          const { currentImageContainer: e3 } = this;
          setTimeout(() => {
            e3.removeChild(t), this.player.debug.log(`Removing thumb: ${t.dataset.filename}`);
          }, i);
        }
      });
    }), _defineProperty$1(this, "preloadNearby", (e2, t = true) => new Promise((i) => {
      setTimeout(() => {
        const s = this.thumbnails[0].frames[e2].text;
        if (this.showingThumbFilename === s) {
          let n;
          n = t ? this.thumbnails[0].frames.slice(e2) : this.thumbnails[0].frames.slice(0, e2).reverse();
          let r = false;
          n.forEach((e3) => {
            const t2 = e3.text;
            if (t2 !== s && !this.loadedImages.includes(t2)) {
              r = true, this.player.debug.log(`Preloading thumb filename: ${t2}`);
              const { urlPrefix: e4 } = this.thumbnails[0], s2 = e4 + t2, n2 = new Image();
              n2.src = s2, n2.onload = () => {
                this.player.debug.log(`Preloaded thumb filename: ${t2}`), this.loadedImages.includes(t2) || this.loadedImages.push(t2), i();
              };
            }
          }), r || i();
        }
      }, 300);
    })), _defineProperty$1(this, "getHigherQuality", (e2, t, i, s) => {
      if (e2 < this.thumbnails.length - 1) {
        let n = t.naturalHeight;
        this.usingSprites && (n = i.h), n < this.thumbContainerHeight && setTimeout(() => {
          this.showingThumbFilename === s && (this.player.debug.log(`Showing higher quality thumb for: ${s}`), this.loadImage(e2 + 1));
        }, 300);
      }
    }), _defineProperty$1(this, "toggleThumbContainer", (e2 = false, t = false) => {
      const i = this.player.config.classNames.previewThumbnails.thumbContainerShown;
      this.elements.thumb.container.classList.toggle(i, e2), !e2 && t && (this.showingThumb = null, this.showingThumbFilename = null);
    }), _defineProperty$1(this, "toggleScrubbingContainer", (e2 = false) => {
      const t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
      this.elements.scrubbing.container.classList.toggle(t, e2), e2 || (this.showingThumb = null, this.showingThumbFilename = null);
    }), _defineProperty$1(this, "determineContainerAutoSizing", () => {
      (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = true);
    }), _defineProperty$1(this, "setThumbContainerSizeAndPos", () => {
      const { imageContainer: e2 } = this.elements.thumb;
      if (this.sizeSpecifiedInCSS) {
        if (e2.clientHeight > 20 && e2.clientWidth < 20) {
          const t = Math.floor(e2.clientHeight * this.thumbAspectRatio);
          e2.style.width = `${t}px`;
        } else if (e2.clientHeight < 20 && e2.clientWidth > 20) {
          const t = Math.floor(e2.clientWidth / this.thumbAspectRatio);
          e2.style.height = `${t}px`;
        }
      } else {
        const t = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
        e2.style.height = `${this.thumbContainerHeight}px`, e2.style.width = `${t}px`;
      }
      this.setThumbContainerPos();
    }), _defineProperty$1(this, "setThumbContainerPos", () => {
      const e2 = this.player.elements.progress.getBoundingClientRect(), t = this.player.elements.container.getBoundingClientRect(), { container: i } = this.elements.thumb, s = t.left - e2.left + 10, n = t.right - e2.left - i.clientWidth - 10, r = this.mousePosX - e2.left - i.clientWidth / 2, a = clamp$1(r, s, n);
      i.style.left = `${a}px`, i.style.setProperty("--preview-arrow-offset", r - a + "px");
    }), _defineProperty$1(this, "setScrubbingContainerSize", () => {
      const { width: e2, height: t } = fitRatio(this.thumbAspectRatio, { width: this.player.media.clientWidth, height: this.player.media.clientHeight });
      this.elements.scrubbing.container.style.width = `${e2}px`, this.elements.scrubbing.container.style.height = `${t}px`;
    }), _defineProperty$1(this, "setImageSizeAndOffset", (e2, t) => {
      if (!this.usingSprites)
        return;
      const i = this.thumbContainerHeight / t.h;
      e2.style.height = e2.naturalHeight * i + "px", e2.style.width = e2.naturalWidth * i + "px", e2.style.left = `-${t.x * i}px`, e2.style.top = `-${t.y * i}px`;
    }), this.player = e, this.thumbnails = [], this.loaded = false, this.lastMouseMoveTime = Date.now(), this.mouseDown = false, this.loadedImages = [], this.elements = { thumb: {}, scrubbing: {} }, this.load();
  }
  get enabled() {
    return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
  }
  get currentImageContainer() {
    return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
  }
  get usingSprites() {
    return Object.keys(this.thumbnails[0].frames[0]).includes("w");
  }
  get thumbAspectRatio() {
    return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height;
  }
  get thumbContainerHeight() {
    if (this.mouseDown) {
      const { height: e } = fitRatio(this.thumbAspectRatio, { width: this.player.media.clientWidth, height: this.player.media.clientHeight });
      return e;
    }
    return this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
  }
  get currentImageElement() {
    return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
  }
  set currentImageElement(e) {
    this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e;
  }
}
const source = { insertElements(e, t) {
  is.string(t) ? insertElement(e, this.media, { src: t }) : is.array(t) && t.forEach((t2) => {
    insertElement(e, this.media, t2);
  });
}, change(e) {
  getDeep(e, "sources.length") ? (html5.cancelRequests.call(this), this.destroy.call(this, () => {
    this.options.quality = [], removeElement(this.media), this.media = null, is.element(this.elements.container) && this.elements.container.removeAttribute("class");
    const { sources: t, type: i } = e, [{ provider: s = providers.html5, src: n }] = t, r = "html5" === s ? i : "div", a = "html5" === s ? {} : { src: n };
    Object.assign(this, { provider: s, type: i, supported: support.check(i, s, this.config.playsinline), media: createElement(r, a) }), this.elements.container.appendChild(this.media), is.boolean(e.autoplay) && (this.config.autoplay = e.autoplay), this.isHTML5 && (this.config.crossorigin && this.media.setAttribute("crossorigin", ""), this.config.autoplay && this.media.setAttribute("autoplay", ""), is.empty(e.poster) || (this.poster = e.poster), this.config.loop.active && this.media.setAttribute("loop", ""), this.config.muted && this.media.setAttribute("muted", ""), this.config.playsinline && this.media.setAttribute("playsinline", "")), ui.addStyleHook.call(this), this.isHTML5 && source.insertElements.call(this, "source", t), this.config.title = e.title, media.setup.call(this), this.isHTML5 && Object.keys(e).includes("tracks") && source.insertElements.call(this, "track", e.tracks), (this.isHTML5 || this.isEmbed && !this.supported.ui) && ui.build.call(this), this.isHTML5 && this.media.load(), is.empty(e.previewThumbnails) || (Object.assign(this.config.previewThumbnails, e.previewThumbnails), this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), this.config.previewThumbnails.enabled && (this.previewThumbnails = new PreviewThumbnails(this))), this.fullscreen.update();
  }, true)) : this.debug.warn("Invalid source format");
} };
class Plyr {
  constructor(e, t) {
    if (_defineProperty$1(this, "play", () => is.function(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(() => this.ads.play()).catch(() => silencePromise(this.media.play())), this.media.play()) : null), _defineProperty$1(this, "pause", () => this.playing && is.function(this.media.pause) ? this.media.pause() : null), _defineProperty$1(this, "togglePlay", (e2) => (is.boolean(e2) ? e2 : !this.playing) ? this.play() : this.pause()), _defineProperty$1(this, "stop", () => {
      this.isHTML5 ? (this.pause(), this.restart()) : is.function(this.media.stop) && this.media.stop();
    }), _defineProperty$1(this, "restart", () => {
      this.currentTime = 0;
    }), _defineProperty$1(this, "rewind", (e2) => {
      this.currentTime -= is.number(e2) ? e2 : this.config.seekTime;
    }), _defineProperty$1(this, "forward", (e2) => {
      this.currentTime += is.number(e2) ? e2 : this.config.seekTime;
    }), _defineProperty$1(this, "increaseVolume", (e2) => {
      const t2 = this.media.muted ? 0 : this.volume;
      this.volume = t2 + (is.number(e2) ? e2 : 0);
    }), _defineProperty$1(this, "decreaseVolume", (e2) => {
      this.increaseVolume(-e2);
    }), _defineProperty$1(this, "airplay", () => {
      support.airplay && this.media.webkitShowPlaybackTargetPicker();
    }), _defineProperty$1(this, "toggleControls", (e2) => {
      if (this.supported.ui && !this.isAudio) {
        const t2 = hasClass$1(this.elements.container, this.config.classNames.hideControls), i2 = void 0 === e2 ? void 0 : !e2, s2 = toggleClass$1(this.elements.container, this.config.classNames.hideControls, i2);
        if (s2 && is.array(this.config.controls) && this.config.controls.includes("settings") && !is.empty(this.config.settings) && controls.toggleMenu.call(this, false), s2 !== t2) {
          const e3 = s2 ? "controlshidden" : "controlsshown";
          triggerEvent.call(this, this.media, e3);
        }
        return !s2;
      }
      return false;
    }), _defineProperty$1(this, "on", (e2, t2) => {
      on.call(this, this.elements.container, e2, t2);
    }), _defineProperty$1(this, "once", (e2, t2) => {
      once.call(this, this.elements.container, e2, t2);
    }), _defineProperty$1(this, "off", (e2, t2) => {
      off(this.elements.container, e2, t2);
    }), _defineProperty$1(this, "destroy", (e2, t2 = false) => {
      if (!this.ready)
        return;
      const i2 = () => {
        document.body.style.overflow = "", this.embed = null, t2 ? (Object.keys(this.elements).length && (removeElement(this.elements.buttons.play), removeElement(this.elements.captions), removeElement(this.elements.controls), removeElement(this.elements.wrapper), this.elements.buttons.play = null, this.elements.captions = null, this.elements.controls = null, this.elements.wrapper = null), is.function(e2) && e2()) : (unbindListeners.call(this), html5.cancelRequests.call(this), replaceElement(this.elements.original, this.elements.container), triggerEvent.call(this, this.elements.original, "destroyed", true), is.function(e2) && e2.call(this.elements.original), this.ready = false, setTimeout(() => {
          this.elements = null, this.media = null;
        }, 200));
      };
      this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (ui.toggleNativeControls.call(this, true), i2()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && is.function(this.embed.destroy) && this.embed.destroy(), i2()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i2), setTimeout(i2, 200));
    }), _defineProperty$1(this, "supports", (e2) => support.mime.call(this, e2)), this.timers = {}, this.ready = false, this.loading = false, this.failed = false, this.touch = support.touch, this.media = e, is.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || is.nodeList(this.media) || is.array(this.media)) && (this.media = this.media[0]), this.config = extend({}, defaults, Plyr.defaults, t || {}, (() => {
      try {
        return JSON.parse(this.media.getAttribute("data-plyr-config"));
      } catch (e2) {
        return {};
      }
    })()), this.elements = { container: null, fullscreen: null, captions: null, buttons: {}, display: {}, progress: {}, inputs: {}, settings: { popup: null, menu: null, panels: {}, buttons: {} } }, this.captions = { active: null, currentTrack: -1, meta: /* @__PURE__ */ new WeakMap() }, this.fullscreen = { active: false }, this.options = { speed: [], quality: [] }, this.debug = new Console(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", support), is.nullOrUndefined(this.media) || !is.element(this.media))
      return void this.debug.error("Setup failed: no suitable element passed");
    if (this.media.plyr)
      return void this.debug.warn("Target already setup");
    if (!this.config.enabled)
      return void this.debug.error("Setup failed: disabled by config");
    if (!support.check().api)
      return void this.debug.error("Setup failed: no support");
    const i = this.media.cloneNode(true);
    i.autoplay = false, this.elements.original = i;
    const s = this.media.tagName.toLowerCase();
    let n = null, r = null;
    switch (s) {
      case "div":
        if (n = this.media.querySelector("iframe"), is.element(n)) {
          if (r = parseUrl(n.getAttribute("src")), this.provider = getProviderByUrl(r.toString()), this.elements.container = this.media, this.media = n, this.elements.container.className = "", r.search.length) {
            const e2 = ["1", "true"];
            e2.includes(r.searchParams.get("autoplay")) && (this.config.autoplay = true), e2.includes(r.searchParams.get("loop")) && (this.config.loop.active = true), this.isYouTube ? (this.config.playsinline = e2.includes(r.searchParams.get("playsinline")), this.config.youtube.hl = r.searchParams.get("hl")) : this.config.playsinline = true;
          }
        } else
          this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
        if (is.empty(this.provider) || !Object.values(providers).includes(this.provider))
          return void this.debug.error("Setup failed: Invalid provider");
        this.type = types.video;
        break;
      case "video":
      case "audio":
        this.type = s, this.provider = providers.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = true), this.media.hasAttribute("autoplay") && (this.config.autoplay = true), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = true), this.media.hasAttribute("muted") && (this.config.muted = true), this.media.hasAttribute("loop") && (this.config.loop.active = true);
        break;
      default:
        return void this.debug.error("Setup failed: unsupported type");
    }
    this.supported = support.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new Listeners(this), this.storage = new Storage(this), this.media.plyr = this, is.element(this.elements.container) || (this.elements.container = createElement("div", { tabindex: 0 }), wrap(this.media, this.elements.container)), ui.migrateStyles.call(this), ui.addStyleHook.call(this), media.setup.call(this), this.config.debug && on.call(this, this.elements.container, this.config.events.join(" "), (e2) => {
      this.debug.log(`event: ${e2.type}`);
    }), this.fullscreen = new Fullscreen(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && ui.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new Ads(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", () => silencePromise(this.play())), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new PreviewThumbnails(this))) : this.debug.error("Setup failed: no support");
  }
  get isHTML5() {
    return this.provider === providers.html5;
  }
  get isEmbed() {
    return this.isYouTube || this.isVimeo;
  }
  get isYouTube() {
    return this.provider === providers.youtube;
  }
  get isVimeo() {
    return this.provider === providers.vimeo;
  }
  get isVideo() {
    return this.type === types.video;
  }
  get isAudio() {
    return this.type === types.audio;
  }
  get playing() {
    return Boolean(this.ready && !this.paused && !this.ended);
  }
  get paused() {
    return Boolean(this.media.paused);
  }
  get stopped() {
    return Boolean(this.paused && 0 === this.currentTime);
  }
  get ended() {
    return Boolean(this.media.ended);
  }
  set currentTime(e) {
    if (!this.duration)
      return;
    const t = is.number(e) && e > 0;
    this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log(`Seeking to ${this.currentTime} seconds`);
  }
  get currentTime() {
    return Number(this.media.currentTime);
  }
  get buffered() {
    const { buffered: e } = this.media;
    return is.number(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0;
  }
  get seeking() {
    return Boolean(this.media.seeking);
  }
  get duration() {
    const e = parseFloat(this.config.duration), t = (this.media || {}).duration, i = is.number(t) && t !== 1 / 0 ? t : 0;
    return e || i;
  }
  set volume(e) {
    let t = e;
    is.string(t) && (t = Number(t)), is.number(t) || (t = this.storage.get("volume")), is.number(t) || ({ volume: t } = this.config), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !is.empty(e) && this.muted && t > 0 && (this.muted = false);
  }
  get volume() {
    return Number(this.media.volume);
  }
  set muted(e) {
    let t = e;
    is.boolean(t) || (t = this.storage.get("muted")), is.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t;
  }
  get muted() {
    return Boolean(this.media.muted);
  }
  get hasAudio() {
    return !this.isHTML5 || (!!this.isAudio || (Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)));
  }
  set speed(e) {
    let t = null;
    is.number(e) && (t = e), is.number(t) || (t = this.storage.get("speed")), is.number(t) || (t = this.config.speed.selected);
    const { minimumSpeed: i, maximumSpeed: s } = this;
    t = clamp$1(t, i, s), this.config.speed.selected = t, setTimeout(() => {
      this.media && (this.media.playbackRate = t);
    }, 0);
  }
  get speed() {
    return Number(this.media.playbackRate);
  }
  get minimumSpeed() {
    return this.isYouTube ? Math.min(...this.options.speed) : this.isVimeo ? 0.5 : 0.0625;
  }
  get maximumSpeed() {
    return this.isYouTube ? Math.max(...this.options.speed) : this.isVimeo ? 2 : 16;
  }
  set quality(e) {
    const t = this.config.quality, i = this.options.quality;
    if (!i.length)
      return;
    let s = [!is.empty(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(is.number), n = true;
    if (!i.includes(s)) {
      const e2 = closest$2(i, s);
      this.debug.warn(`Unsupported quality option: ${s}, using ${e2} instead`), s = e2, n = false;
    }
    t.selected = s, this.media.quality = s, n && this.storage.set({ quality: s });
  }
  get quality() {
    return this.media.quality;
  }
  set loop(e) {
    const t = is.boolean(e) ? e : this.config.loop.active;
    this.config.loop.active = t, this.media.loop = t;
  }
  get loop() {
    return Boolean(this.media.loop);
  }
  set source(e) {
    source.change.call(this, e);
  }
  get source() {
    return this.media.currentSrc;
  }
  get download() {
    const { download: e } = this.config.urls;
    return is.url(e) ? e : this.source;
  }
  set download(e) {
    is.url(e) && (this.config.urls.download = e, controls.setDownloadUrl.call(this));
  }
  set poster(e) {
    this.isVideo ? ui.setPoster.call(this, e, false).catch(() => {
    }) : this.debug.warn("Poster can only be set for video");
  }
  get poster() {
    return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null;
  }
  get ratio() {
    if (!this.isVideo)
      return null;
    const e = reduceAspectRatio(getAspectRatio.call(this));
    return is.array(e) ? e.join(":") : e;
  }
  set ratio(e) {
    this.isVideo ? is.string(e) && validateAspectRatio(e) ? (this.config.ratio = reduceAspectRatio(e), setAspectRatio.call(this)) : this.debug.error(`Invalid aspect ratio specified (${e})`) : this.debug.warn("Aspect ratio can only be set for video");
  }
  set autoplay(e) {
    this.config.autoplay = is.boolean(e) ? e : this.config.autoplay;
  }
  get autoplay() {
    return Boolean(this.config.autoplay);
  }
  toggleCaptions(e) {
    captions.toggle.call(this, e, false);
  }
  set currentTrack(e) {
    captions.set.call(this, e, false), captions.setup.call(this);
  }
  get currentTrack() {
    const { toggled: e, currentTrack: t } = this.captions;
    return e ? t : -1;
  }
  set language(e) {
    captions.setLanguage.call(this, e, false);
  }
  get language() {
    return (captions.getCurrentTrack.call(this) || {}).language;
  }
  set pip(e) {
    if (!support.pip)
      return;
    const t = is.boolean(e) ? e : !this.pip;
    is.function(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? pip.active : pip.inactive), is.function(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture());
  }
  get pip() {
    return support.pip ? is.empty(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === pip.active : null;
  }
  setPreviewThumbnails(e) {
    this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), Object.assign(this.config.previewThumbnails, e), this.config.previewThumbnails.enabled && (this.previewThumbnails = new PreviewThumbnails(this));
  }
  static supported(e, t, i) {
    return support.check(e, t, i);
  }
  static loadSprite(e, t) {
    return loadSprite(e, t);
  }
  static setup(e, t = {}) {
    let i = null;
    return is.string(e) ? i = Array.from(document.querySelectorAll(e)) : is.nodeList(e) ? i = Array.from(e) : is.array(e) && (i = e.filter(is.element)), is.empty(i) ? null : i.map((e2) => new Plyr(e2, t));
  }
}
Plyr.defaults = cloneDeep(defaults);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
var CREATED = 1;
var MOUNTED = 2;
var IDLE = 3;
var MOVING = 4;
var SCROLLING = 5;
var DRAGGING = 6;
var DESTROYED = 7;
var STATES = {
  CREATED,
  MOUNTED,
  IDLE,
  MOVING,
  SCROLLING,
  DRAGGING,
  DESTROYED
};
function empty(array) {
  array.length = 0;
}
function slice(arrayLike, start, end) {
  return Array.prototype.slice.call(arrayLike, start, end);
}
function apply(func) {
  return func.bind.apply(func, [null].concat(slice(arguments, 1)));
}
var nextTick = setTimeout;
var noop = function noop2() {
};
function raf(func) {
  return requestAnimationFrame(func);
}
function typeOf(type, subject) {
  return typeof subject === type;
}
function isObject(subject) {
  return !isNull(subject) && typeOf("object", subject);
}
var isArray = Array.isArray;
var isFunction = apply(typeOf, "function");
var isString = apply(typeOf, "string");
var isUndefined = apply(typeOf, "undefined");
function isNull(subject) {
  return subject === null;
}
function isHTMLElement(subject) {
  try {
    return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
  } catch (e) {
    return false;
  }
}
function toArray(value) {
  return isArray(value) ? value : [value];
}
function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}
function includes(array, value) {
  return array.indexOf(value) > -1;
}
function push(array, items) {
  array.push.apply(array, toArray(items));
  return array;
}
function toggleClass(elm, classes, add) {
  if (elm) {
    forEach(classes, function(name) {
      if (name) {
        elm.classList[add ? "add" : "remove"](name);
      }
    });
  }
}
function addClass(elm, classes) {
  toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
}
function append(parent, children2) {
  forEach(children2, parent.appendChild.bind(parent));
}
function before(nodes, ref) {
  forEach(nodes, function(node) {
    var parent = (ref || node).parentNode;
    if (parent) {
      parent.insertBefore(node, ref);
    }
  });
}
function matches(elm, selector) {
  return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
}
function children(parent, selector) {
  var children2 = parent ? slice(parent.children) : [];
  return selector ? children2.filter(function(child2) {
    return matches(child2, selector);
  }) : children2;
}
function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}
var ownKeys = Object.keys;
function forOwn(object, iteratee, right) {
  if (object) {
    (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function(key) {
      key !== "__proto__" && iteratee(object[key], key);
    });
  }
  return object;
}
function assign(object) {
  slice(arguments, 1).forEach(function(source2) {
    forOwn(source2, function(value, key) {
      object[key] = source2[key];
    });
  });
  return object;
}
function merge(object) {
  slice(arguments, 1).forEach(function(source2) {
    forOwn(source2, function(value, key) {
      if (isArray(value)) {
        object[key] = value.slice();
      } else if (isObject(value)) {
        object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
      } else {
        object[key] = value;
      }
    });
  });
  return object;
}
function omit(object, keys) {
  forEach(keys || ownKeys(object), function(key) {
    delete object[key];
  });
}
function removeAttribute(elms, attrs) {
  forEach(elms, function(elm) {
    forEach(attrs, function(attr) {
      elm && elm.removeAttribute(attr);
    });
  });
}
function setAttribute(elms, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, function(value2, name) {
      setAttribute(elms, name, value2);
    });
  } else {
    forEach(elms, function(elm) {
      isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
    });
  }
}
function create(tag, attrs, parent) {
  var elm = document.createElement(tag);
  if (attrs) {
    isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
  }
  parent && append(parent, elm);
  return elm;
}
function style(elm, prop, value) {
  if (isUndefined(value)) {
    return getComputedStyle(elm)[prop];
  }
  if (!isNull(value)) {
    elm.style[prop] = "" + value;
  }
}
function display(elm, display2) {
  style(elm, "display", display2);
}
function focus(elm) {
  elm["setActive"] && elm["setActive"]() || elm.focus({
    preventScroll: true
  });
}
function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}
function hasClass(elm, className) {
  return elm && elm.classList.contains(className);
}
function rect(target) {
  return target.getBoundingClientRect();
}
function remove(nodes) {
  forEach(nodes, function(node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}
function parseHtml(html) {
  return child(new DOMParser().parseFromString(html, "text/html").body);
}
function prevent(e, stopPropagation) {
  e.preventDefault();
  if (stopPropagation) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}
function query(parent, selector) {
  return parent && parent.querySelector(selector);
}
function queryAll(parent, selector) {
  return selector ? slice(parent.querySelectorAll(selector)) : [];
}
function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}
function timeOf(e) {
  return e.timeStamp;
}
function unit(value) {
  return isString(value) ? value : value ? value + "px" : "";
}
var PROJECT_CODE = "splide";
var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;
function assert(condition, message) {
  if (!condition) {
    throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
  }
}
var min = Math.min, max = Math.max, floor = Math.floor, ceil = Math.ceil, abs = Math.abs;
function approximatelyEqual(x, y, epsilon) {
  return abs(x - y) < epsilon;
}
function between(number, x, y, exclusive) {
  var minimum = min(x, y);
  var maximum = max(x, y);
  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
}
function clamp(number, x, y) {
  var minimum = min(x, y);
  var maximum = max(x, y);
  return min(max(minimum, number), maximum);
}
function sign(x) {
  return +(x > 0) - +(x < 0);
}
function format(string, replacements) {
  forEach(replacements, function(replacement) {
    string = string.replace("%s", "" + replacement);
  });
  return string;
}
function pad(number) {
  return number < 10 ? "0" + number : "" + number;
}
var ids = {};
function uniqueId(prefix) {
  return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
}
function EventBinder() {
  var listeners = [];
  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, function(target, event, namespace) {
      var isEventTarget = "addEventListener" in target;
      var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
      isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
      listeners.push([target, event, namespace, callback, remover]);
    });
  }
  function unbind(targets, events, callback) {
    forEachEvent(targets, events, function(target, event, namespace) {
      listeners = listeners.filter(function(listener) {
        if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
          listener[4]();
          return false;
        }
        return true;
      });
    });
  }
  function dispatch(target, type, detail) {
    var e;
    var bubbles = true;
    if (typeof CustomEvent === "function") {
      e = new CustomEvent(type, {
        bubbles,
        detail
      });
    } else {
      e = document.createEvent("CustomEvent");
      e.initCustomEvent(type, bubbles, false, detail);
    }
    target.dispatchEvent(e);
    return e;
  }
  function forEachEvent(targets, events, iteratee) {
    forEach(targets, function(target) {
      target && forEach(events, function(events2) {
        events2.split(" ").forEach(function(eventNS) {
          var fragment = eventNS.split(".");
          iteratee(target, fragment[0], fragment[1]);
        });
      });
    });
  }
  function destroy() {
    listeners.forEach(function(data) {
      data[4]();
    });
    empty(listeners);
  }
  return {
    bind,
    unbind,
    dispatch,
    destroy
  };
}
var EVENT_MOUNTED = "mounted";
var EVENT_READY = "ready";
var EVENT_MOVE = "move";
var EVENT_MOVED = "moved";
var EVENT_CLICK = "click";
var EVENT_ACTIVE = "active";
var EVENT_INACTIVE = "inactive";
var EVENT_VISIBLE = "visible";
var EVENT_HIDDEN = "hidden";
var EVENT_REFRESH = "refresh";
var EVENT_UPDATED = "updated";
var EVENT_RESIZE = "resize";
var EVENT_RESIZED = "resized";
var EVENT_DRAG = "drag";
var EVENT_DRAGGING = "dragging";
var EVENT_DRAGGED = "dragged";
var EVENT_SCROLL = "scroll";
var EVENT_SCROLLED = "scrolled";
var EVENT_OVERFLOW = "overflow";
var EVENT_DESTROY = "destroy";
var EVENT_ARROWS_MOUNTED = "arrows:mounted";
var EVENT_ARROWS_UPDATED = "arrows:updated";
var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
var EVENT_PAGINATION_UPDATED = "pagination:updated";
var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
var EVENT_AUTOPLAY_PLAY = "autoplay:play";
var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
var EVENT_SLIDE_KEYDOWN = "sk";
var EVENT_SHIFTED = "sh";
var EVENT_END_INDEX_CHANGED = "ei";
function EventInterface(Splide2) {
  var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
  var binder = EventBinder();
  function on2(events, callback) {
    binder.bind(bus, toArray(events).join(" "), function(e) {
      callback.apply(callback, isArray(e.detail) ? e.detail : []);
    });
  }
  function emit(event) {
    binder.dispatch(bus, event, slice(arguments, 1));
  }
  if (Splide2) {
    Splide2.event.on(EVENT_DESTROY, binder.destroy);
  }
  return assign(binder, {
    bus,
    on: on2,
    off: apply(binder.unbind, bus),
    emit
  });
}
function RequestInterval(interval, onInterval, onUpdate, limit) {
  var now = Date.now;
  var startTime;
  var rate = 0;
  var id;
  var paused = true;
  var count = 0;
  function update() {
    if (!paused) {
      rate = interval ? min((now() - startTime) / interval, 1) : 1;
      onUpdate && onUpdate(rate);
      if (rate >= 1) {
        onInterval();
        startTime = now();
        if (limit && ++count >= limit) {
          return pause();
        }
      }
      id = raf(update);
    }
  }
  function start(resume) {
    resume || cancel();
    startTime = now() - (resume ? rate * interval : 0);
    paused = false;
    id = raf(update);
  }
  function pause() {
    paused = true;
  }
  function rewind() {
    startTime = now();
    rate = 0;
    if (onUpdate) {
      onUpdate(rate);
    }
  }
  function cancel() {
    id && cancelAnimationFrame(id);
    rate = 0;
    id = 0;
    paused = true;
  }
  function set(time) {
    interval = time;
  }
  function isPaused() {
    return paused;
  }
  return {
    start,
    rewind,
    pause,
    cancel,
    set,
    isPaused
  };
}
function State(initialState) {
  var state = initialState;
  function set(value) {
    state = value;
  }
  function is2(states) {
    return includes(toArray(states), state);
  }
  return {
    set,
    is: is2
  };
}
function Throttle(func, duration) {
  var interval = RequestInterval(duration || 0, func, null, 1);
  return function() {
    interval.isPaused() && interval.start();
  };
}
function Media(Splide2, Components2, options) {
  var state = Splide2.state;
  var breakpoints = options.breakpoints || {};
  var reducedMotion = options.reducedMotion || {};
  var binder = EventBinder();
  var queries = [];
  function setup() {
    var isMin = options.mediaQuery === "min";
    ownKeys(breakpoints).sort(function(n, m) {
      return isMin ? +n - +m : +m - +n;
    }).forEach(function(key) {
      register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
    });
    register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
    update();
  }
  function destroy(completely) {
    if (completely) {
      binder.destroy();
    }
  }
  function register(options2, query2) {
    var queryList = matchMedia(query2);
    binder.bind(queryList, "change", update);
    queries.push([options2, queryList]);
  }
  function update() {
    var destroyed = state.is(DESTROYED);
    var direction = options.direction;
    var merged = queries.reduce(function(merged2, entry) {
      return merge(merged2, entry[1].matches ? entry[0] : {});
    }, {});
    omit(options);
    set(merged);
    if (options.destroy) {
      Splide2.destroy(options.destroy === "completely");
    } else if (destroyed) {
      destroy(true);
      Splide2.mount();
    } else {
      direction !== options.direction && Splide2.refresh();
    }
  }
  function reduce(enable) {
    if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
      enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
    }
  }
  function set(opts2, base2, notify) {
    merge(options, opts2);
    base2 && merge(Object.getPrototypeOf(options), opts2);
    if (notify || !state.is(CREATED)) {
      Splide2.emit(EVENT_UPDATED, options);
    }
  }
  return {
    setup,
    destroy,
    reduce,
    set
  };
}
var ARROW = "Arrow";
var ARROW_LEFT = ARROW + "Left";
var ARROW_RIGHT = ARROW + "Right";
var ARROW_UP = ARROW + "Up";
var ARROW_DOWN = ARROW + "Down";
var RTL = "rtl";
var TTB = "ttb";
var ORIENTATION_MAP = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [ARROW_UP, ARROW_RIGHT],
  ArrowRight: [ARROW_DOWN, ARROW_LEFT]
};
function Direction(Splide2, Components2, options) {
  function resolve(prop, axisOnly, direction) {
    direction = direction || options.direction;
    var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
    return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function(match, offset) {
      var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
      return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
    });
  }
  function orient(value) {
    return value * (options.direction === RTL ? 1 : -1);
  }
  return {
    resolve,
    orient
  };
}
var ROLE = "role";
var TAB_INDEX = "tabindex";
var DISABLED = "disabled";
var ARIA_PREFIX = "aria-";
var ARIA_CONTROLS = ARIA_PREFIX + "controls";
var ARIA_CURRENT = ARIA_PREFIX + "current";
var ARIA_SELECTED = ARIA_PREFIX + "selected";
var ARIA_LABEL = ARIA_PREFIX + "label";
var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
var ARIA_LIVE = ARIA_PREFIX + "live";
var ARIA_BUSY = ARIA_PREFIX + "busy";
var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
var CLASS_PREFIX = PROJECT_CODE + "__";
var STATUS_CLASS_PREFIX = "is-";
var CLASS_ROOT = PROJECT_CODE;
var CLASS_TRACK = CLASS_PREFIX + "track";
var CLASS_LIST = CLASS_PREFIX + "list";
var CLASS_SLIDE = CLASS_PREFIX + "slide";
var CLASS_CLONE = CLASS_SLIDE + "--clone";
var CLASS_CONTAINER = CLASS_SLIDE + "__container";
var CLASS_ARROWS = CLASS_PREFIX + "arrows";
var CLASS_ARROW = CLASS_PREFIX + "arrow";
var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
var CLASS_PROGRESS = CLASS_PREFIX + "progress";
var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
var CLASS_SPINNER = CLASS_PREFIX + "spinner";
var CLASS_SR = CLASS_PREFIX + "sr";
var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
var CLASSES = {
  slide: CLASS_SLIDE,
  clone: CLASS_CLONE,
  arrows: CLASS_ARROWS,
  arrow: CLASS_ARROW,
  prev: CLASS_ARROW_PREV,
  next: CLASS_ARROW_NEXT,
  pagination: CLASS_PAGINATION,
  page: CLASS_PAGINATION_PAGE,
  spinner: CLASS_SPINNER
};
function closest(from, selector) {
  if (isFunction(from.closest)) {
    return from.closest(selector);
  }
  var elm = from;
  while (elm && elm.nodeType === 1) {
    if (matches(elm, selector)) {
      break;
    }
    elm = elm.parentElement;
  }
  return elm;
}
var FRICTION = 5;
var LOG_INTERVAL = 200;
var POINTER_DOWN_EVENTS = "touchstart mousedown";
var POINTER_MOVE_EVENTS = "touchmove mousemove";
var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";
function Elements(Splide2, Components2, options) {
  var _EventInterface = EventInterface(Splide2), on2 = _EventInterface.on, bind = _EventInterface.bind;
  var root = Splide2.root;
  var i18n2 = options.i18n;
  var elements = {};
  var slides = [];
  var rootClasses = [];
  var trackClasses = [];
  var track;
  var list;
  var isUsingKey;
  function setup() {
    collect();
    init();
    update();
  }
  function mount() {
    on2(EVENT_REFRESH, destroy);
    on2(EVENT_REFRESH, setup);
    on2(EVENT_UPDATED, update);
    bind(document, POINTER_DOWN_EVENTS + " keydown", function(e) {
      isUsingKey = e.type === "keydown";
    }, {
      capture: true
    });
    bind(root, "focusin", function() {
      toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
    });
  }
  function destroy(completely) {
    var attrs = ALL_ATTRIBUTES.concat("style");
    empty(slides);
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    removeAttribute([track, list], attrs);
    removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
  }
  function update() {
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    rootClasses = getClasses(CLASS_ROOT);
    trackClasses = getClasses(CLASS_TRACK);
    addClass(root, rootClasses);
    addClass(track, trackClasses);
    setAttribute(root, ARIA_LABEL, options.label);
    setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
  }
  function collect() {
    track = find("." + CLASS_TRACK);
    list = child(track, "." + CLASS_LIST);
    assert(track && list, "A track/list element is missing.");
    push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
    forOwn({
      arrows: CLASS_ARROWS,
      pagination: CLASS_PAGINATION,
      prev: CLASS_ARROW_PREV,
      next: CLASS_ARROW_NEXT,
      bar: CLASS_PROGRESS_BAR,
      toggle: CLASS_TOGGLE
    }, function(className, key) {
      elements[key] = find("." + className);
    });
    assign(elements, {
      root,
      track,
      list,
      slides
    });
  }
  function init() {
    var id = root.id || uniqueId(PROJECT_CODE);
    var role = options.role;
    root.id = id;
    track.id = track.id || id + "-track";
    list.id = list.id || id + "-list";
    if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
      setAttribute(root, ROLE, role);
    }
    setAttribute(root, ARIA_ROLEDESCRIPTION, i18n2.carousel);
    setAttribute(list, ROLE, "presentation");
  }
  function find(selector) {
    var elm = query(root, selector);
    return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
  }
  function getClasses(base2) {
    return [base2 + "--" + options.type, base2 + "--" + options.direction, options.drag && base2 + "--draggable", options.isNavigation && base2 + "--nav", base2 === CLASS_ROOT && CLASS_ACTIVE];
  }
  return assign(elements, {
    setup,
    mount,
    destroy
  });
}
var SLIDE = "slide";
var LOOP = "loop";
var FADE = "fade";
function Slide$1(Splide2, index, slideIndex, slide) {
  var event = EventInterface(Splide2);
  var on2 = event.on, emit = event.emit, bind = event.bind;
  var Components = Splide2.Components, root = Splide2.root, options = Splide2.options;
  var isNavigation = options.isNavigation, updateOnMove = options.updateOnMove, i18n2 = options.i18n, pagination = options.pagination, slideFocus = options.slideFocus;
  var resolve = Components.Direction.resolve;
  var styles2 = getAttribute(slide, "style");
  var label = getAttribute(slide, ARIA_LABEL);
  var isClone = slideIndex > -1;
  var container2 = child(slide, "." + CLASS_CONTAINER);
  var destroyed;
  function mount() {
    if (!isClone) {
      slide.id = root.id + "-slide" + pad(index + 1);
      setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
      setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n2.slide);
      setAttribute(slide, ARIA_LABEL, label || format(i18n2.slideLabel, [index + 1, Splide2.length]));
    }
    listen();
  }
  function listen() {
    bind(slide, "click", apply(emit, EVENT_CLICK, self));
    bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
    on2([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
    on2(EVENT_NAVIGATION_MOUNTED, initNavigation);
    if (updateOnMove) {
      on2(EVENT_MOVE, onMove);
    }
  }
  function destroy() {
    destroyed = true;
    event.destroy();
    removeClass(slide, STATUS_CLASSES);
    removeAttribute(slide, ALL_ATTRIBUTES);
    setAttribute(slide, "style", styles2);
    setAttribute(slide, ARIA_LABEL, label || "");
  }
  function initNavigation() {
    var controls2 = Splide2.splides.map(function(target) {
      var Slide2 = target.splide.Components.Slides.getAt(index);
      return Slide2 ? Slide2.slide.id : "";
    }).join(" ");
    setAttribute(slide, ARIA_LABEL, format(i18n2.slideX, (isClone ? slideIndex : index) + 1));
    setAttribute(slide, ARIA_CONTROLS, controls2);
    setAttribute(slide, ROLE, slideFocus ? "button" : "");
    slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
  }
  function onMove() {
    if (!destroyed) {
      update();
    }
  }
  function update() {
    if (!destroyed) {
      var curr = Splide2.index;
      updateActivity();
      updateVisibility();
      toggleClass(slide, CLASS_PREV, index === curr - 1);
      toggleClass(slide, CLASS_NEXT, index === curr + 1);
    }
  }
  function updateActivity() {
    var active = isActive();
    if (active !== hasClass(slide, CLASS_ACTIVE)) {
      toggleClass(slide, CLASS_ACTIVE, active);
      setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
      emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
    }
  }
  function updateVisibility() {
    var visible = isVisible();
    var hidden = !visible && (!isActive() || isClone);
    if (!Splide2.state.is([MOVING, SCROLLING])) {
      setAttribute(slide, ARIA_HIDDEN, hidden || "");
    }
    setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");
    if (slideFocus) {
      setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
    }
    if (visible !== hasClass(slide, CLASS_VISIBLE)) {
      toggleClass(slide, CLASS_VISIBLE, visible);
      emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
    }
    if (!visible && document.activeElement === slide) {
      var Slide2 = Components.Slides.getAt(Splide2.index);
      Slide2 && focus(Slide2.slide);
    }
  }
  function style$1(prop, value, useContainer) {
    style(useContainer && container2 || slide, prop, value);
  }
  function isActive() {
    var curr = Splide2.index;
    return curr === index || options.cloneStatus && curr === slideIndex;
  }
  function isVisible() {
    if (Splide2.is(FADE)) {
      return isActive();
    }
    var trackRect = rect(Components.Elements.track);
    var slideRect = rect(slide);
    var left = resolve("left", true);
    var right = resolve("right", true);
    return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
  }
  function isWithin(from, distance) {
    var diff = abs(from - index);
    if (!isClone && (options.rewind || Splide2.is(LOOP))) {
      diff = min(diff, Splide2.length - diff);
    }
    return diff <= distance;
  }
  var self = {
    index,
    slideIndex,
    slide,
    container: container2,
    isClone,
    mount,
    destroy,
    update,
    style: style$1,
    isWithin
  };
  return self;
}
function Slides(Splide2, Components2, options) {
  var _EventInterface2 = EventInterface(Splide2), on2 = _EventInterface2.on, emit = _EventInterface2.emit, bind = _EventInterface2.bind;
  var _Components2$Elements = Components2.Elements, slides = _Components2$Elements.slides, list = _Components2$Elements.list;
  var Slides2 = [];
  function mount() {
    init();
    on2(EVENT_REFRESH, destroy);
    on2(EVENT_REFRESH, init);
  }
  function init() {
    slides.forEach(function(slide, index) {
      register(slide, index, -1);
    });
  }
  function destroy() {
    forEach$1(function(Slide2) {
      Slide2.destroy();
    });
    empty(Slides2);
  }
  function update() {
    forEach$1(function(Slide2) {
      Slide2.update();
    });
  }
  function register(slide, index, slideIndex) {
    var object = Slide$1(Splide2, index, slideIndex, slide);
    object.mount();
    Slides2.push(object);
    Slides2.sort(function(Slide1, Slide2) {
      return Slide1.index - Slide2.index;
    });
  }
  function get(excludeClones) {
    return excludeClones ? filter(function(Slide2) {
      return !Slide2.isClone;
    }) : Slides2;
  }
  function getIn(page) {
    var Controller2 = Components2.Controller;
    var index = Controller2.toIndex(page);
    var max2 = Controller2.hasFocus() ? 1 : options.perPage;
    return filter(function(Slide2) {
      return between(Slide2.index, index, index + max2 - 1);
    });
  }
  function getAt(index) {
    return filter(index)[0];
  }
  function add(items, index) {
    forEach(items, function(slide) {
      if (isString(slide)) {
        slide = parseHtml(slide);
      }
      if (isHTMLElement(slide)) {
        var ref = slides[index];
        ref ? before(slide, ref) : append(list, slide);
        addClass(slide, options.classes.slide);
        observeImages(slide, apply(emit, EVENT_RESIZE));
      }
    });
    emit(EVENT_REFRESH);
  }
  function remove$1(matcher) {
    remove(filter(matcher).map(function(Slide2) {
      return Slide2.slide;
    }));
    emit(EVENT_REFRESH);
  }
  function forEach$1(iteratee, excludeClones) {
    get(excludeClones).forEach(iteratee);
  }
  function filter(matcher) {
    return Slides2.filter(isFunction(matcher) ? matcher : function(Slide2) {
      return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
    });
  }
  function style2(prop, value, useContainer) {
    forEach$1(function(Slide2) {
      Slide2.style(prop, value, useContainer);
    });
  }
  function observeImages(elm, callback) {
    var images = queryAll(elm, "img");
    var length = images.length;
    if (length) {
      images.forEach(function(img) {
        bind(img, "load error", function() {
          if (!--length) {
            callback();
          }
        });
      });
    } else {
      callback();
    }
  }
  function getLength(excludeClones) {
    return excludeClones ? slides.length : Slides2.length;
  }
  function isEnough() {
    return Slides2.length > options.perPage;
  }
  return {
    mount,
    destroy,
    update,
    register,
    get,
    getIn,
    getAt,
    add,
    remove: remove$1,
    forEach: forEach$1,
    filter,
    style: style2,
    getLength,
    isEnough
  };
}
function Layout(Splide2, Components2, options) {
  var _EventInterface3 = EventInterface(Splide2), on2 = _EventInterface3.on, bind = _EventInterface3.bind, emit = _EventInterface3.emit;
  var Slides2 = Components2.Slides;
  var resolve = Components2.Direction.resolve;
  var _Components2$Elements2 = Components2.Elements, root = _Components2$Elements2.root, track = _Components2$Elements2.track, list = _Components2$Elements2.list;
  var getAt = Slides2.getAt, styleSlides = Slides2.style;
  var vertical;
  var rootRect;
  var overflow;
  function mount() {
    init();
    bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
    on2([EVENT_UPDATED, EVENT_REFRESH], init);
    on2(EVENT_RESIZE, resize);
  }
  function init() {
    vertical = options.direction === TTB;
    style(root, "maxWidth", unit(options.width));
    style(track, resolve("paddingLeft"), cssPadding(false));
    style(track, resolve("paddingRight"), cssPadding(true));
    resize(true);
  }
  function resize(force) {
    var newRect = rect(root);
    if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
      style(track, "height", cssTrackHeight());
      styleSlides(resolve("marginRight"), unit(options.gap));
      styleSlides("width", cssSlideWidth());
      styleSlides("height", cssSlideHeight(), true);
      rootRect = newRect;
      emit(EVENT_RESIZED);
      if (overflow !== (overflow = isOverflow())) {
        toggleClass(root, CLASS_OVERFLOW, overflow);
        emit(EVENT_OVERFLOW, overflow);
      }
    }
  }
  function cssPadding(right) {
    var padding = options.padding;
    var prop = resolve(right ? "right" : "left");
    return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
  }
  function cssTrackHeight() {
    var height = "";
    if (vertical) {
      height = cssHeight();
      assert(height, "height or heightRatio is missing.");
      height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
    }
    return height;
  }
  function cssHeight() {
    return unit(options.height || rect(list).width * options.heightRatio);
  }
  function cssSlideWidth() {
    return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
  }
  function cssSlideHeight() {
    return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
  }
  function cssSlideSize() {
    var gap = unit(options.gap);
    return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
  }
  function listSize() {
    return rect(list)[resolve("width")];
  }
  function slideSize(index, withoutGap) {
    var Slide2 = getAt(index || 0);
    return Slide2 ? rect(Slide2.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
  }
  function totalSize(index, withoutGap) {
    var Slide2 = getAt(index);
    if (Slide2) {
      var right = rect(Slide2.slide)[resolve("right")];
      var left = rect(list)[resolve("left")];
      return abs(right - left) + (withoutGap ? 0 : getGap());
    }
    return 0;
  }
  function sliderSize(withoutGap) {
    return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
  }
  function getGap() {
    var Slide2 = getAt(0);
    return Slide2 && parseFloat(style(Slide2.slide, resolve("marginRight"))) || 0;
  }
  function getPadding(right) {
    return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
  }
  function isOverflow() {
    return Splide2.is(FADE) || sliderSize(true) > listSize();
  }
  return {
    mount,
    resize,
    listSize,
    slideSize,
    sliderSize,
    totalSize,
    getPadding,
    isOverflow
  };
}
var MULTIPLIER = 2;
function Clones(Splide2, Components2, options) {
  var event = EventInterface(Splide2);
  var on2 = event.on;
  var Elements2 = Components2.Elements, Slides2 = Components2.Slides;
  var resolve = Components2.Direction.resolve;
  var clones = [];
  var cloneCount;
  function mount() {
    on2(EVENT_REFRESH, remount);
    on2([EVENT_UPDATED, EVENT_RESIZE], observe);
    if (cloneCount = computeCloneCount()) {
      generate(cloneCount);
      Components2.Layout.resize(true);
    }
  }
  function remount() {
    destroy();
    mount();
  }
  function destroy() {
    remove(clones);
    empty(clones);
    event.destroy();
  }
  function observe() {
    var count = computeCloneCount();
    if (cloneCount !== count) {
      if (cloneCount < count || !count) {
        event.emit(EVENT_REFRESH);
      }
    }
  }
  function generate(count) {
    var slides = Slides2.get().slice();
    var length = slides.length;
    if (length) {
      while (slides.length < count) {
        push(slides, slides);
      }
      push(slides.slice(-count), slides.slice(0, count)).forEach(function(Slide2, index) {
        var isHead = index < count;
        var clone = cloneDeep2(Slide2.slide, index);
        isHead ? before(clone, slides[0].slide) : append(Elements2.list, clone);
        push(clones, clone);
        Slides2.register(clone, index - count + (isHead ? 0 : length), Slide2.index);
      });
    }
  }
  function cloneDeep2(elm, index) {
    var clone = elm.cloneNode(true);
    addClass(clone, options.classes.clone);
    clone.id = Splide2.root.id + "-clone" + pad(index + 1);
    return clone;
  }
  function computeCloneCount() {
    var clones2 = options.clones;
    if (!Splide2.is(LOOP)) {
      clones2 = 0;
    } else if (isUndefined(clones2)) {
      var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
      var fixedCount = fixedSize && ceil(rect(Elements2.track)[resolve("width")] / fixedSize);
      clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
    }
    return clones2;
  }
  return {
    mount,
    destroy
  };
}
function Move(Splide2, Components2, options) {
  var _EventInterface4 = EventInterface(Splide2), on2 = _EventInterface4.on, emit = _EventInterface4.emit;
  var set = Splide2.state.set;
  var _Components2$Layout = Components2.Layout, slideSize = _Components2$Layout.slideSize, getPadding = _Components2$Layout.getPadding, totalSize = _Components2$Layout.totalSize, listSize = _Components2$Layout.listSize, sliderSize = _Components2$Layout.sliderSize;
  var _Components2$Directio = Components2.Direction, resolve = _Components2$Directio.resolve, orient = _Components2$Directio.orient;
  var _Components2$Elements3 = Components2.Elements, list = _Components2$Elements3.list, track = _Components2$Elements3.track;
  var Transition;
  function mount() {
    Transition = Components2.Transition;
    on2([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
  }
  function reposition() {
    if (!Components2.Controller.isBusy()) {
      Components2.Scroll.cancel();
      jump(Splide2.index);
      Components2.Slides.update();
    }
  }
  function move(dest, index, prev, callback) {
    if (dest !== index && canShift(dest > prev)) {
      cancel();
      translate(shift(getPosition(), dest > prev), true);
    }
    set(MOVING);
    emit(EVENT_MOVE, index, prev, dest);
    Transition.start(index, function() {
      set(IDLE);
      emit(EVENT_MOVED, index, prev, dest);
      callback && callback();
    });
  }
  function jump(index) {
    translate(toPosition(index, true));
  }
  function translate(position, preventLoop) {
    if (!Splide2.is(FADE)) {
      var destination = preventLoop ? position : loop(position);
      style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
      position !== destination && emit(EVENT_SHIFTED);
    }
  }
  function loop(position) {
    if (Splide2.is(LOOP)) {
      var index = toIndex(position);
      var exceededMax = index > Components2.Controller.getEnd();
      var exceededMin = index < 0;
      if (exceededMin || exceededMax) {
        position = shift(position, exceededMax);
      }
    }
    return position;
  }
  function shift(position, backwards) {
    var excess = position - getLimit(backwards);
    var size = sliderSize();
    position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
    return position;
  }
  function cancel() {
    translate(getPosition(), true);
    Transition.cancel();
  }
  function toIndex(position) {
    var Slides2 = Components2.Slides.get();
    var index = 0;
    var minDistance = Infinity;
    for (var i = 0; i < Slides2.length; i++) {
      var slideIndex = Slides2[i].index;
      var distance = abs(toPosition(slideIndex, true) - position);
      if (distance <= minDistance) {
        minDistance = distance;
        index = slideIndex;
      } else {
        break;
      }
    }
    return index;
  }
  function toPosition(index, trimming) {
    var position = orient(totalSize(index - 1) - offset(index));
    return trimming ? trim(position) : position;
  }
  function getPosition() {
    var left = resolve("left");
    return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
  }
  function trim(position) {
    if (options.trimSpace && Splide2.is(SLIDE)) {
      position = clamp(position, 0, orient(sliderSize(true) - listSize()));
    }
    return position;
  }
  function offset(index) {
    var focus2 = options.focus;
    return focus2 === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus2 * slideSize(index) || 0;
  }
  function getLimit(max2) {
    return toPosition(max2 ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
  }
  function canShift(backwards) {
    var shifted = orient(shift(getPosition(), backwards));
    return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
  }
  function exceededLimit(max2, position) {
    position = isUndefined(position) ? getPosition() : position;
    var exceededMin = max2 !== true && orient(position) < orient(getLimit(false));
    var exceededMax = max2 !== false && orient(position) > orient(getLimit(true));
    return exceededMin || exceededMax;
  }
  return {
    mount,
    move,
    jump,
    translate,
    shift,
    cancel,
    toIndex,
    toPosition,
    getPosition,
    getLimit,
    exceededLimit,
    reposition
  };
}
function Controller(Splide2, Components2, options) {
  var _EventInterface5 = EventInterface(Splide2), on2 = _EventInterface5.on, emit = _EventInterface5.emit;
  var Move2 = Components2.Move;
  var getPosition = Move2.getPosition, getLimit = Move2.getLimit, toPosition = Move2.toPosition;
  var _Components2$Slides = Components2.Slides, isEnough = _Components2$Slides.isEnough, getLength = _Components2$Slides.getLength;
  var omitEnd = options.omitEnd;
  var isLoop = Splide2.is(LOOP);
  var isSlide = Splide2.is(SLIDE);
  var getNext = apply(getAdjacent, false);
  var getPrev = apply(getAdjacent, true);
  var currIndex = options.start || 0;
  var endIndex;
  var prevIndex = currIndex;
  var slideCount;
  var perMove;
  var perPage;
  function mount() {
    init();
    on2([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
    on2(EVENT_RESIZED, onResized);
  }
  function init() {
    slideCount = getLength(true);
    perMove = options.perMove;
    perPage = options.perPage;
    endIndex = getEnd();
    var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);
    if (index !== currIndex) {
      currIndex = index;
      Move2.reposition();
    }
  }
  function onResized() {
    if (endIndex !== getEnd()) {
      emit(EVENT_END_INDEX_CHANGED);
    }
  }
  function go(control, allowSameIndex, callback) {
    if (!isBusy()) {
      var dest = parse(control);
      var index = loop(dest);
      if (index > -1 && (allowSameIndex || index !== currIndex)) {
        setIndex(index);
        Move2.move(dest, index, prevIndex, callback);
      }
    }
  }
  function scroll(destination, duration, snap, callback) {
    Components2.Scroll.scroll(destination, duration, snap, function() {
      var index = loop(Move2.toIndex(getPosition()));
      setIndex(omitEnd ? min(index, endIndex) : index);
      callback && callback();
    });
  }
  function parse(control) {
    var index = currIndex;
    if (isString(control)) {
      var _ref = control.match(/([+\-<>])(\d+)?/) || [], indicator = _ref[1], number = _ref[2];
      if (indicator === "+" || indicator === "-") {
        index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
      } else if (indicator === ">") {
        index = number ? toIndex(+number) : getNext(true);
      } else if (indicator === "<") {
        index = getPrev(true);
      }
    } else {
      index = isLoop ? control : clamp(control, 0, endIndex);
    }
    return index;
  }
  function getAdjacent(prev, destination) {
    var number = perMove || (hasFocus() ? 1 : perPage);
    var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
    if (dest === -1 && isSlide) {
      if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
        return prev ? 0 : endIndex;
      }
    }
    return destination ? dest : loop(dest);
  }
  function computeDestIndex(dest, from, snapPage) {
    if (isEnough() || hasFocus()) {
      var index = computeMovableDestIndex(dest);
      if (index !== dest) {
        from = dest;
        dest = index;
        snapPage = false;
      }
      if (dest < 0 || dest > endIndex) {
        if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
          dest = toIndex(toPage(dest));
        } else {
          if (isLoop) {
            dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
          } else if (options.rewind) {
            dest = dest < 0 ? endIndex : 0;
          } else {
            dest = -1;
          }
        }
      } else {
        if (snapPage && dest !== from) {
          dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
        }
      }
    } else {
      dest = -1;
    }
    return dest;
  }
  function computeMovableDestIndex(dest) {
    if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
      var position = getPosition();
      while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
        dest < currIndex ? --dest : ++dest;
      }
    }
    return dest;
  }
  function loop(index) {
    return isLoop ? (index + slideCount) % slideCount || 0 : index;
  }
  function getEnd() {
    var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);
    while (omitEnd && end-- > 0) {
      if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
        end++;
        break;
      }
    }
    return clamp(end, 0, slideCount - 1);
  }
  function toIndex(page) {
    return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
  }
  function toPage(index) {
    return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
  }
  function toDest(destination) {
    var closest2 = Move2.toIndex(destination);
    return isSlide ? clamp(closest2, 0, endIndex) : closest2;
  }
  function setIndex(index) {
    if (index !== currIndex) {
      prevIndex = currIndex;
      currIndex = index;
    }
  }
  function getIndex(prev) {
    return prev ? prevIndex : currIndex;
  }
  function hasFocus() {
    return !isUndefined(options.focus) || options.isNavigation;
  }
  function isBusy() {
    return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
  }
  return {
    mount,
    go,
    scroll,
    getNext,
    getPrev,
    getAdjacent,
    getEnd,
    setIndex,
    getIndex,
    toIndex,
    toPage,
    toDest,
    hasFocus,
    isBusy
  };
}
var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
var SIZE = 40;
function Arrows(Splide2, Components2, options) {
  var event = EventInterface(Splide2);
  var on2 = event.on, bind = event.bind, emit = event.emit;
  var classes = options.classes, i18n2 = options.i18n;
  var Elements2 = Components2.Elements, Controller2 = Components2.Controller;
  var placeholder = Elements2.arrows, track = Elements2.track;
  var wrapper = placeholder;
  var prev = Elements2.prev;
  var next = Elements2.next;
  var created;
  var wrapperClasses;
  var arrows = {};
  function mount() {
    init();
    on2(EVENT_UPDATED, remount);
  }
  function remount() {
    destroy();
    mount();
  }
  function init() {
    var enabled = options.arrows;
    if (enabled && !(prev && next)) {
      createArrows();
    }
    if (prev && next) {
      assign(arrows, {
        prev,
        next
      });
      display(wrapper, enabled ? "" : "none");
      addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);
      if (enabled) {
        listen();
        update();
        setAttribute([prev, next], ARIA_CONTROLS, track.id);
        emit(EVENT_ARROWS_MOUNTED, prev, next);
      }
    }
  }
  function destroy() {
    event.destroy();
    removeClass(wrapper, wrapperClasses);
    if (created) {
      remove(placeholder ? [prev, next] : wrapper);
      prev = next = null;
    } else {
      removeAttribute([prev, next], ALL_ATTRIBUTES);
    }
  }
  function listen() {
    on2([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
    bind(next, "click", apply(go, ">"));
    bind(prev, "click", apply(go, "<"));
  }
  function go(control) {
    Controller2.go(control, true);
  }
  function createArrows() {
    wrapper = placeholder || create("div", classes.arrows);
    prev = createArrow(true);
    next = createArrow(false);
    created = true;
    append(wrapper, [prev, next]);
    !placeholder && before(wrapper, track);
  }
  function createArrow(prev2) {
    var arrow = '<button class="' + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + '" type="button"><svg xmlns="' + XML_NAME_SPACE + '" viewBox="0 0 ' + SIZE + " " + SIZE + '" width="' + SIZE + '" height="' + SIZE + '" focusable="false"><path d="' + (options.arrowPath || PATH) + '" />';
    return parseHtml(arrow);
  }
  function update() {
    if (prev && next) {
      var index = Splide2.index;
      var prevIndex = Controller2.getPrev();
      var nextIndex = Controller2.getNext();
      var prevLabel = prevIndex > -1 && index < prevIndex ? i18n2.last : i18n2.prev;
      var nextLabel = nextIndex > -1 && index > nextIndex ? i18n2.first : i18n2.next;
      prev.disabled = prevIndex < 0;
      next.disabled = nextIndex < 0;
      setAttribute(prev, ARIA_LABEL, prevLabel);
      setAttribute(next, ARIA_LABEL, nextLabel);
      emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
    }
  }
  return {
    arrows,
    mount,
    destroy,
    update
  };
}
var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";
function Autoplay(Splide2, Components2, options) {
  var _EventInterface6 = EventInterface(Splide2), on2 = _EventInterface6.on, bind = _EventInterface6.bind, emit = _EventInterface6.emit;
  var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
  var isPaused = interval.isPaused;
  var Elements2 = Components2.Elements, _Components2$Elements4 = Components2.Elements, root = _Components2$Elements4.root, toggle = _Components2$Elements4.toggle;
  var autoplay = options.autoplay;
  var hovered;
  var focused;
  var stopped = autoplay === "pause";
  function mount() {
    if (autoplay) {
      listen();
      toggle && setAttribute(toggle, ARIA_CONTROLS, Elements2.track.id);
      stopped || play();
      update();
    }
  }
  function listen() {
    if (options.pauseOnHover) {
      bind(root, "mouseenter mouseleave", function(e) {
        hovered = e.type === "mouseenter";
        autoToggle();
      });
    }
    if (options.pauseOnFocus) {
      bind(root, "focusin focusout", function(e) {
        focused = e.type === "focusin";
        autoToggle();
      });
    }
    if (toggle) {
      bind(toggle, "click", function() {
        stopped ? play() : pause(true);
      });
    }
    on2([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
    on2(EVENT_MOVE, onMove);
  }
  function play() {
    if (isPaused() && Components2.Slides.isEnough()) {
      interval.start(!options.resetProgress);
      focused = hovered = stopped = false;
      update();
      emit(EVENT_AUTOPLAY_PLAY);
    }
  }
  function pause(stop) {
    if (stop === void 0) {
      stop = true;
    }
    stopped = !!stop;
    update();
    if (!isPaused()) {
      interval.pause();
      emit(EVENT_AUTOPLAY_PAUSE);
    }
  }
  function autoToggle() {
    if (!stopped) {
      hovered || focused ? pause(false) : play();
    }
  }
  function update() {
    if (toggle) {
      toggleClass(toggle, CLASS_ACTIVE, !stopped);
      setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
    }
  }
  function onAnimationFrame(rate) {
    var bar = Elements2.bar;
    bar && style(bar, "width", rate * 100 + "%");
    emit(EVENT_AUTOPLAY_PLAYING, rate);
  }
  function onMove(index) {
    var Slide2 = Components2.Slides.getAt(index);
    interval.set(Slide2 && +getAttribute(Slide2.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
  }
  return {
    mount,
    destroy: interval.cancel,
    play,
    pause,
    isPaused
  };
}
function Cover(Splide2, Components2, options) {
  var _EventInterface7 = EventInterface(Splide2), on2 = _EventInterface7.on;
  function mount() {
    if (options.cover) {
      on2(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
      on2([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
    }
  }
  function cover(cover2) {
    Components2.Slides.forEach(function(Slide2) {
      var img = child(Slide2.container || Slide2.slide, "img");
      if (img && img.src) {
        toggle(cover2, img, Slide2);
      }
    });
  }
  function toggle(cover2, img, Slide2) {
    Slide2.style("background", cover2 ? 'center/cover no-repeat url("' + img.src + '")' : "", true);
    display(img, cover2 ? "none" : "");
  }
  return {
    mount,
    destroy: apply(cover, false)
  };
}
var BOUNCE_DIFF_THRESHOLD = 10;
var BOUNCE_DURATION = 600;
var FRICTION_FACTOR = 0.6;
var BASE_VELOCITY = 1.5;
var MIN_DURATION = 800;
function Scroll(Splide2, Components2, options) {
  var _EventInterface8 = EventInterface(Splide2), on2 = _EventInterface8.on, emit = _EventInterface8.emit;
  var set = Splide2.state.set;
  var Move2 = Components2.Move;
  var getPosition = Move2.getPosition, getLimit = Move2.getLimit, exceededLimit = Move2.exceededLimit, translate = Move2.translate;
  var isSlide = Splide2.is(SLIDE);
  var interval;
  var callback;
  var friction = 1;
  function mount() {
    on2(EVENT_MOVE, clear);
    on2([EVENT_UPDATED, EVENT_REFRESH], cancel);
  }
  function scroll(destination, duration, snap, onScrolled, noConstrain) {
    var from = getPosition();
    clear();
    if (snap && (!isSlide || !exceededLimit())) {
      var size = Components2.Layout.sliderSize();
      var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
      destination = Move2.toPosition(Components2.Controller.toDest(destination % size)) + offset;
    }
    var noDistance = approximatelyEqual(from, destination, 1);
    friction = 1;
    duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
    callback = onScrolled;
    interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
    set(SCROLLING);
    emit(EVENT_SCROLL);
    interval.start();
  }
  function onEnd() {
    set(IDLE);
    callback && callback();
    emit(EVENT_SCROLLED);
  }
  function update(from, to, noConstrain, rate) {
    var position = getPosition();
    var target = from + (to - from) * easing(rate);
    var diff = (target - position) * friction;
    translate(position + diff);
    if (isSlide && !noConstrain && exceededLimit()) {
      friction *= FRICTION_FACTOR;
      if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
        scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
      }
    }
  }
  function clear() {
    if (interval) {
      interval.cancel();
    }
  }
  function cancel() {
    if (interval && !interval.isPaused()) {
      clear();
      onEnd();
    }
  }
  function easing(t) {
    var easingFunc = options.easingFunc;
    return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
  }
  return {
    mount,
    destroy: clear,
    scroll,
    cancel
  };
}
var SCROLL_LISTENER_OPTIONS = {
  passive: false,
  capture: true
};
function Drag(Splide2, Components2, options) {
  var _EventInterface9 = EventInterface(Splide2), on2 = _EventInterface9.on, emit = _EventInterface9.emit, bind = _EventInterface9.bind, unbind = _EventInterface9.unbind;
  var state = Splide2.state;
  var Move2 = Components2.Move, Scroll2 = Components2.Scroll, Controller2 = Components2.Controller, track = Components2.Elements.track, reduce = Components2.Media.reduce;
  var _Components2$Directio2 = Components2.Direction, resolve = _Components2$Directio2.resolve, orient = _Components2$Directio2.orient;
  var getPosition = Move2.getPosition, exceededLimit = Move2.exceededLimit;
  var basePosition;
  var baseEvent;
  var prevBaseEvent;
  var isFree;
  var dragging;
  var exceeded = false;
  var clickPrevented;
  var disabled;
  var target;
  function mount() {
    bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
    bind(track, "click", onClick, {
      capture: true
    });
    bind(track, "dragstart", prevent);
    on2([EVENT_MOUNTED, EVENT_UPDATED], init);
  }
  function init() {
    var drag = options.drag;
    disable(!drag);
    isFree = drag === "free";
  }
  function onPointerDown(e) {
    clickPrevented = false;
    if (!disabled) {
      var isTouch = isTouchEvent(e);
      if (isDraggable(e.target) && (isTouch || !e.button)) {
        if (!Controller2.isBusy()) {
          target = isTouch ? track : window;
          dragging = state.is([MOVING, SCROLLING]);
          prevBaseEvent = null;
          bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
          bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
          Move2.cancel();
          Scroll2.cancel();
          save(e);
        } else {
          prevent(e, true);
        }
      }
    }
  }
  function onPointerMove(e) {
    if (!state.is(DRAGGING)) {
      state.set(DRAGGING);
      emit(EVENT_DRAG);
    }
    if (e.cancelable) {
      if (dragging) {
        Move2.translate(basePosition + constrain(diffCoord(e)));
        var expired = diffTime(e) > LOG_INTERVAL;
        var hasExceeded = exceeded !== (exceeded = exceededLimit());
        if (expired || hasExceeded) {
          save(e);
        }
        clickPrevented = true;
        emit(EVENT_DRAGGING);
        prevent(e);
      } else if (isSliderDirection(e)) {
        dragging = shouldStart(e);
        prevent(e);
      }
    }
  }
  function onPointerUp(e) {
    if (state.is(DRAGGING)) {
      state.set(IDLE);
      emit(EVENT_DRAGGED);
    }
    if (dragging) {
      move(e);
      prevent(e);
    }
    unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
    unbind(target, POINTER_UP_EVENTS, onPointerUp);
    dragging = false;
  }
  function onClick(e) {
    if (!disabled && clickPrevented) {
      prevent(e, true);
    }
  }
  function save(e) {
    prevBaseEvent = baseEvent;
    baseEvent = e;
    basePosition = getPosition();
  }
  function move(e) {
    var velocity = computeVelocity(e);
    var destination = computeDestination(velocity);
    var rewind = options.rewind && options.rewindByDrag;
    reduce(false);
    if (isFree) {
      Controller2.scroll(destination, 0, options.snap);
    } else if (Splide2.is(FADE)) {
      Controller2.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
    } else if (Splide2.is(SLIDE) && exceeded && rewind) {
      Controller2.go(exceededLimit(true) ? ">" : "<");
    } else {
      Controller2.go(Controller2.toDest(destination), true);
    }
    reduce(true);
  }
  function shouldStart(e) {
    var thresholds = options.dragMinThreshold;
    var isObj = isObject(thresholds);
    var mouse = isObj && thresholds.mouse || 0;
    var touch = (isObj ? thresholds.touch : +thresholds) || 10;
    return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
  }
  function isSliderDirection(e) {
    return abs(diffCoord(e)) > abs(diffCoord(e, true));
  }
  function computeVelocity(e) {
    if (Splide2.is(LOOP) || !exceeded) {
      var time = diffTime(e);
      if (time && time < LOG_INTERVAL) {
        return diffCoord(e) / time;
      }
    }
    return 0;
  }
  function computeDestination(velocity) {
    return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
  }
  function diffCoord(e, orthogonal) {
    return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
  }
  function diffTime(e) {
    return timeOf(e) - timeOf(getBaseEvent(e));
  }
  function getBaseEvent(e) {
    return baseEvent === e && prevBaseEvent || baseEvent;
  }
  function coordOf(e, orthogonal) {
    return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
  }
  function constrain(diff) {
    return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
  }
  function isDraggable(target2) {
    var noDrag = options.noDrag;
    return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
  }
  function isTouchEvent(e) {
    return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
  }
  function isDragging() {
    return dragging;
  }
  function disable(value) {
    disabled = value;
  }
  return {
    mount,
    disable,
    isDragging
  };
}
var NORMALIZATION_MAP = {
  Spacebar: " ",
  Right: ARROW_RIGHT,
  Left: ARROW_LEFT,
  Up: ARROW_UP,
  Down: ARROW_DOWN
};
function normalizeKey(key) {
  key = isString(key) ? key : key.key;
  return NORMALIZATION_MAP[key] || key;
}
var KEYBOARD_EVENT = "keydown";
function Keyboard(Splide2, Components2, options) {
  var _EventInterface10 = EventInterface(Splide2), on2 = _EventInterface10.on, bind = _EventInterface10.bind, unbind = _EventInterface10.unbind;
  var root = Splide2.root;
  var resolve = Components2.Direction.resolve;
  var target;
  var disabled;
  function mount() {
    init();
    on2(EVENT_UPDATED, destroy);
    on2(EVENT_UPDATED, init);
    on2(EVENT_MOVE, onMove);
  }
  function init() {
    var keyboard = options.keyboard;
    if (keyboard) {
      target = keyboard === "global" ? window : root;
      bind(target, KEYBOARD_EVENT, onKeydown);
    }
  }
  function destroy() {
    unbind(target, KEYBOARD_EVENT);
  }
  function disable(value) {
    disabled = value;
  }
  function onMove() {
    var _disabled = disabled;
    disabled = true;
    nextTick(function() {
      disabled = _disabled;
    });
  }
  function onKeydown(e) {
    if (!disabled) {
      var key = normalizeKey(e);
      if (key === resolve(ARROW_LEFT)) {
        Splide2.go("<");
      } else if (key === resolve(ARROW_RIGHT)) {
        Splide2.go(">");
      }
    }
  }
  return {
    mount,
    destroy,
    disable
  };
}
var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";
function LazyLoad(Splide2, Components2, options) {
  var _EventInterface11 = EventInterface(Splide2), on2 = _EventInterface11.on, off2 = _EventInterface11.off, bind = _EventInterface11.bind, emit = _EventInterface11.emit;
  var isSequential = options.lazyLoad === "sequential";
  var events = [EVENT_MOVED, EVENT_SCROLLED];
  var entries = [];
  function mount() {
    if (options.lazyLoad) {
      init();
      on2(EVENT_REFRESH, init);
    }
  }
  function init() {
    empty(entries);
    register();
    if (isSequential) {
      loadNext();
    } else {
      off2(events);
      on2(events, check);
      check();
    }
  }
  function register() {
    Components2.Slides.forEach(function(Slide2) {
      queryAll(Slide2.slide, IMAGE_SELECTOR).forEach(function(img) {
        var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
        var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
        if (src !== img.src || srcset !== img.srcset) {
          var className = options.classes.spinner;
          var parent = img.parentElement;
          var spinner = child(parent, "." + className) || create("span", className, parent);
          entries.push([img, Slide2, spinner]);
          img.src || display(img, "none");
        }
      });
    });
  }
  function check() {
    entries = entries.filter(function(data) {
      var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
      return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
    });
    entries.length || off2(events);
  }
  function load(data) {
    var img = data[0];
    addClass(data[1].slide, CLASS_LOADING);
    bind(img, "load error", apply(onLoad, data));
    setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
    setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
    removeAttribute(img, SRC_DATA_ATTRIBUTE);
    removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
  }
  function onLoad(data, e) {
    var img = data[0], Slide2 = data[1];
    removeClass(Slide2.slide, CLASS_LOADING);
    if (e.type !== "error") {
      remove(data[2]);
      display(img, "");
      emit(EVENT_LAZYLOAD_LOADED, img, Slide2);
      emit(EVENT_RESIZE);
    }
    isSequential && loadNext();
  }
  function loadNext() {
    entries.length && load(entries.shift());
  }
  return {
    mount,
    destroy: apply(empty, entries),
    check
  };
}
function Pagination(Splide2, Components2, options) {
  var event = EventInterface(Splide2);
  var on2 = event.on, emit = event.emit, bind = event.bind;
  var Slides2 = Components2.Slides, Elements2 = Components2.Elements, Controller2 = Components2.Controller;
  var hasFocus = Controller2.hasFocus, getIndex = Controller2.getIndex, go = Controller2.go;
  var resolve = Components2.Direction.resolve;
  var placeholder = Elements2.pagination;
  var items = [];
  var list;
  var paginationClasses;
  function mount() {
    destroy();
    on2([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
    var enabled = options.pagination;
    placeholder && display(placeholder, enabled ? "" : "none");
    if (enabled) {
      on2([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
      createPagination();
      update();
      emit(EVENT_PAGINATION_MOUNTED, {
        list,
        items
      }, getAt(Splide2.index));
    }
  }
  function destroy() {
    if (list) {
      remove(placeholder ? slice(list.children) : list);
      removeClass(list, paginationClasses);
      empty(items);
      list = null;
    }
    event.destroy();
  }
  function createPagination() {
    var length = Splide2.length;
    var classes = options.classes, i18n2 = options.i18n, perPage = options.perPage;
    var max2 = hasFocus() ? Controller2.getEnd() + 1 : ceil(length / perPage);
    list = placeholder || create("ul", classes.pagination, Elements2.track.parentElement);
    addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
    setAttribute(list, ROLE, "tablist");
    setAttribute(list, ARIA_LABEL, i18n2.select);
    setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");
    for (var i = 0; i < max2; i++) {
      var li = create("li", null, list);
      var button = create("button", {
        class: classes.page,
        type: "button"
      }, li);
      var controls2 = Slides2.getIn(i).map(function(Slide2) {
        return Slide2.slide.id;
      });
      var text = !hasFocus() && perPage > 1 ? i18n2.pageX : i18n2.slideX;
      bind(button, "click", apply(onClick, i));
      if (options.paginationKeyboard) {
        bind(button, "keydown", apply(onKeydown, i));
      }
      setAttribute(li, ROLE, "presentation");
      setAttribute(button, ROLE, "tab");
      setAttribute(button, ARIA_CONTROLS, controls2.join(" "));
      setAttribute(button, ARIA_LABEL, format(text, i + 1));
      setAttribute(button, TAB_INDEX, -1);
      items.push({
        li,
        button,
        page: i
      });
    }
  }
  function onClick(page) {
    go(">" + page, true);
  }
  function onKeydown(page, e) {
    var length = items.length;
    var key = normalizeKey(e);
    var dir = getDirection();
    var nextPage = -1;
    if (key === resolve(ARROW_RIGHT, false, dir)) {
      nextPage = ++page % length;
    } else if (key === resolve(ARROW_LEFT, false, dir)) {
      nextPage = (--page + length) % length;
    } else if (key === "Home") {
      nextPage = 0;
    } else if (key === "End") {
      nextPage = length - 1;
    }
    var item = items[nextPage];
    if (item) {
      focus(item.button);
      go(">" + nextPage);
      prevent(e, true);
    }
  }
  function getDirection() {
    return options.paginationDirection || options.direction;
  }
  function getAt(index) {
    return items[Controller2.toPage(index)];
  }
  function update() {
    var prev = getAt(getIndex(true));
    var curr = getAt(getIndex());
    if (prev) {
      var button = prev.button;
      removeClass(button, CLASS_ACTIVE);
      removeAttribute(button, ARIA_SELECTED);
      setAttribute(button, TAB_INDEX, -1);
    }
    if (curr) {
      var _button = curr.button;
      addClass(_button, CLASS_ACTIVE);
      setAttribute(_button, ARIA_SELECTED, true);
      setAttribute(_button, TAB_INDEX, "");
    }
    emit(EVENT_PAGINATION_UPDATED, {
      list,
      items
    }, prev, curr);
  }
  return {
    items,
    mount,
    destroy,
    getAt,
    update
  };
}
var TRIGGER_KEYS = [" ", "Enter"];
function Sync(Splide2, Components2, options) {
  var isNavigation = options.isNavigation, slideFocus = options.slideFocus;
  var events = [];
  function mount() {
    Splide2.splides.forEach(function(target) {
      if (!target.isParent) {
        sync(Splide2, target.splide);
        sync(target.splide, Splide2);
      }
    });
    if (isNavigation) {
      navigate();
    }
  }
  function destroy() {
    events.forEach(function(event) {
      event.destroy();
    });
    empty(events);
  }
  function remount() {
    destroy();
    mount();
  }
  function sync(splide, target) {
    var event = EventInterface(splide);
    event.on(EVENT_MOVE, function(index, prev, dest) {
      target.go(target.is(LOOP) ? dest : index);
    });
    events.push(event);
  }
  function navigate() {
    var event = EventInterface(Splide2);
    var on2 = event.on;
    on2(EVENT_CLICK, onClick);
    on2(EVENT_SLIDE_KEYDOWN, onKeydown);
    on2([EVENT_MOUNTED, EVENT_UPDATED], update);
    events.push(event);
    event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
  }
  function update() {
    setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
  }
  function onClick(Slide2) {
    Splide2.go(Slide2.index);
  }
  function onKeydown(Slide2, e) {
    if (includes(TRIGGER_KEYS, normalizeKey(e))) {
      onClick(Slide2);
      prevent(e);
    }
  }
  return {
    setup: apply(Components2.Media.set, {
      slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
    }, true),
    mount,
    destroy,
    remount
  };
}
function Wheel(Splide2, Components2, options) {
  var _EventInterface12 = EventInterface(Splide2), bind = _EventInterface12.bind;
  var lastTime = 0;
  function mount() {
    if (options.wheel) {
      bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
    }
  }
  function onWheel(e) {
    if (e.cancelable) {
      var deltaY = e.deltaY;
      var backwards = deltaY < 0;
      var timeStamp = timeOf(e);
      var _min = options.wheelMinThreshold || 0;
      var sleep = options.wheelSleep || 0;
      if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
        Splide2.go(backwards ? "<" : ">");
        lastTime = timeStamp;
      }
      shouldPrevent(backwards) && prevent(e);
    }
  }
  function shouldPrevent(backwards) {
    return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
  }
  return {
    mount
  };
}
var SR_REMOVAL_DELAY = 90;
function Live(Splide2, Components2, options) {
  var _EventInterface13 = EventInterface(Splide2), on2 = _EventInterface13.on;
  var track = Components2.Elements.track;
  var enabled = options.live && !options.isNavigation;
  var sr = create("span", CLASS_SR);
  var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));
  function mount() {
    if (enabled) {
      disable(!Components2.Autoplay.isPaused());
      setAttribute(track, ARIA_ATOMIC, true);
      sr.textContent = "…";
      on2(EVENT_AUTOPLAY_PLAY, apply(disable, true));
      on2(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
      on2([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
    }
  }
  function toggle(active) {
    setAttribute(track, ARIA_BUSY, active);
    if (active) {
      append(track, sr);
      interval.start();
    } else {
      remove(sr);
      interval.cancel();
    }
  }
  function destroy() {
    removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
    remove(sr);
  }
  function disable(disabled) {
    if (enabled) {
      setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
    }
  }
  return {
    mount,
    disable,
    destroy
  };
}
var ComponentConstructors = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Media,
  Direction,
  Elements,
  Slides,
  Layout,
  Clones,
  Move,
  Controller,
  Arrows,
  Autoplay,
  Cover,
  Scroll,
  Drag,
  Keyboard,
  LazyLoad,
  Pagination,
  Sync,
  Wheel,
  Live
});
var I18N = {
  prev: "Previous slide",
  next: "Next slide",
  first: "Go to first slide",
  last: "Go to last slide",
  slideX: "Go to slide %s",
  pageX: "Go to page %s",
  play: "Start autoplay",
  pause: "Pause autoplay",
  carousel: "carousel",
  slide: "slide",
  select: "Select a slide to show",
  slideLabel: "%s of %s"
};
var DEFAULTS = {
  type: "slide",
  role: "region",
  speed: 400,
  perPage: 1,
  cloneStatus: true,
  arrows: true,
  pagination: true,
  paginationKeyboard: true,
  interval: 5e3,
  pauseOnHover: true,
  pauseOnFocus: true,
  resetProgress: true,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  drag: true,
  direction: "ltr",
  trimSpace: true,
  focusableNodes: "a, button, textarea, input, select, iframe",
  live: true,
  classes: CLASSES,
  i18n: I18N,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};
function Fade(Splide2, Components2, options) {
  var Slides2 = Components2.Slides;
  function mount() {
    EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
  }
  function init() {
    Slides2.forEach(function(Slide2) {
      Slide2.style("transform", "translateX(-" + 100 * Slide2.index + "%)");
    });
  }
  function start(index, done) {
    Slides2.style("transition", "opacity " + options.speed + "ms " + options.easing);
    nextTick(done);
  }
  return {
    mount,
    start,
    cancel: noop
  };
}
function Slide(Splide2, Components2, options) {
  var Move2 = Components2.Move, Controller2 = Components2.Controller, Scroll2 = Components2.Scroll;
  var list = Components2.Elements.list;
  var transition = apply(style, list, "transition");
  var endCallback;
  function mount() {
    EventInterface(Splide2).bind(list, "transitionend", function(e) {
      if (e.target === list && endCallback) {
        cancel();
        endCallback();
      }
    });
  }
  function start(index, done) {
    var destination = Move2.toPosition(index, true);
    var position = Move2.getPosition();
    var speed = getSpeed(index);
    if (abs(destination - position) >= 1 && speed >= 1) {
      if (options.useScroll) {
        Scroll2.scroll(destination, speed, false, done);
      } else {
        transition("transform " + speed + "ms " + options.easing);
        Move2.translate(destination, true);
        endCallback = done;
      }
    } else {
      Move2.jump(index);
      done();
    }
  }
  function cancel() {
    transition("");
    Scroll2.cancel();
  }
  function getSpeed(index) {
    var rewindSpeed = options.rewindSpeed;
    if (Splide2.is(SLIDE) && rewindSpeed) {
      var prev = Controller2.getIndex(true);
      var end = Controller2.getEnd();
      if (prev === 0 && index >= end || prev >= end && index === 0) {
        return rewindSpeed;
      }
    }
    return options.speed;
  }
  return {
    mount,
    start,
    cancel
  };
}
var _Splide = /* @__PURE__ */ function() {
  function _Splide2(target, options) {
    this.event = EventInterface();
    this.Components = {};
    this.state = State(CREATED);
    this.splides = [];
    this._o = {};
    this._E = {};
    var root = isString(target) ? query(document, target) : target;
    assert(root, root + " is invalid.");
    this.root = root;
    options = merge({
      label: getAttribute(root, ARIA_LABEL) || "",
      labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
    }, DEFAULTS, _Splide2.defaults, options || {});
    try {
      merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
    } catch (e) {
      assert(false, "Invalid JSON");
    }
    this._o = Object.create(merge({}, options));
  }
  var _proto = _Splide2.prototype;
  _proto.mount = function mount(Extensions, Transition) {
    var _this = this;
    var state = this.state, Components2 = this.Components;
    assert(state.is([CREATED, DESTROYED]), "Already mounted!");
    state.set(CREATED);
    this._C = Components2;
    this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
    this._E = Extensions || this._E;
    var Constructors = assign({}, ComponentConstructors, this._E, {
      Transition: this._T
    });
    forOwn(Constructors, function(Component, key) {
      var component = Component(_this, Components2, _this._o);
      Components2[key] = component;
      component.setup && component.setup();
    });
    forOwn(Components2, function(component) {
      component.mount && component.mount();
    });
    this.emit(EVENT_MOUNTED);
    addClass(this.root, CLASS_INITIALIZED);
    state.set(IDLE);
    this.emit(EVENT_READY);
    return this;
  };
  _proto.sync = function sync(splide) {
    this.splides.push({
      splide
    });
    splide.splides.push({
      splide: this,
      isParent: true
    });
    if (this.state.is(IDLE)) {
      this._C.Sync.remount();
      splide.Components.Sync.remount();
    }
    return this;
  };
  _proto.go = function go(control) {
    this._C.Controller.go(control);
    return this;
  };
  _proto.on = function on2(events, callback) {
    this.event.on(events, callback);
    return this;
  };
  _proto.off = function off2(events) {
    this.event.off(events);
    return this;
  };
  _proto.emit = function emit(event) {
    var _this$event;
    (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));
    return this;
  };
  _proto.add = function add(slides, index) {
    this._C.Slides.add(slides, index);
    return this;
  };
  _proto.remove = function remove2(matcher) {
    this._C.Slides.remove(matcher);
    return this;
  };
  _proto.is = function is2(type) {
    return this._o.type === type;
  };
  _proto.refresh = function refresh() {
    this.emit(EVENT_REFRESH);
    return this;
  };
  _proto.destroy = function destroy(completely) {
    if (completely === void 0) {
      completely = true;
    }
    var event = this.event, state = this.state;
    if (state.is(CREATED)) {
      EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
    } else {
      forOwn(this._C, function(component) {
        component.destroy && component.destroy(completely);
      }, true);
      event.emit(EVENT_DESTROY);
      event.destroy();
      completely && empty(this.splides);
      state.set(DESTROYED);
    }
    return this;
  };
  _createClass(_Splide2, [{
    key: "options",
    get: function get() {
      return this._o;
    },
    set: function set(options) {
      this._C.Media.set(options, true, true);
    }
  }, {
    key: "length",
    get: function get() {
      return this._C.Slides.getLength(true);
    }
  }, {
    key: "index",
    get: function get() {
      return this._C.Controller.getIndex();
    }
  }]);
  return _Splide2;
}();
var Splide = _Splide;
Splide.defaults = {};
Splide.STATES = STATES;
var util = {};
util.getQueryParams = function getQueryParams(qs) {
  if (typeof qs !== "string") {
    return {};
  }
  qs = qs.split("+").join(" ");
  var params = {};
  var match = qs.match(
    /(?:[?](?:[^=]+)=(?:[^&#]*)(?:[&](?:[^=]+)=(?:[^&#]*))*(?:[#].*)?)|(?:[#].*)/
  );
  var split;
  if (match === null) {
    return {};
  }
  split = match[0].substr(1).split(/[&#=]/);
  for (var i = 0; i < split.length; i += 2) {
    params[decodeURIComponent(split[i])] = decodeURIComponent(split[i + 1] || "");
  }
  return params;
};
util.combineParams = function combineParams(params, hasParams) {
  if (typeof params !== "object") {
    return "";
  }
  var combined = "";
  var i = 0;
  var keys = Object.keys(params);
  if (keys.length === 0) {
    return "";
  }
  keys.sort();
  if (!hasParams) {
    combined += "?" + keys[0] + "=" + params[keys[0]];
    i += 1;
  }
  for (; i < keys.length; i += 1) {
    combined += "&" + keys[i] + "=" + params[keys[i]];
  }
  return combined;
};
function getLetterTime(timeString) {
  var totalSeconds = 0;
  var timeValues = {
    "s": 1,
    "m": 1 * 60,
    "h": 1 * 60 * 60,
    "d": 1 * 60 * 60 * 24,
    "w": 1 * 60 * 60 * 24 * 7
  };
  var timePairs;
  timeString = timeString.replace(/([smhdw])/g, " $1 ").trim();
  timePairs = timeString.split(" ");
  for (var i = 0; i < timePairs.length; i += 2) {
    totalSeconds += parseInt(timePairs[i], 10) * timeValues[timePairs[i + 1] || "s"];
  }
  return totalSeconds;
}
function getColonTime(timeString) {
  var totalSeconds = 0;
  var timeValues = [
    1,
    1 * 60,
    1 * 60 * 60,
    1 * 60 * 60 * 24,
    1 * 60 * 60 * 24 * 7
  ];
  var timePairs = timeString.split(":");
  for (var i = 0; i < timePairs.length; i++) {
    totalSeconds += parseInt(timePairs[i], 10) * timeValues[timePairs.length - i - 1];
  }
  return totalSeconds;
}
util.getTime = function getTime(timeString) {
  if (typeof timeString === "undefined") {
    return 0;
  }
  if (timeString.match(/^(\d+[smhdw]?)+$/)) {
    return getLetterTime(timeString);
  }
  if (timeString.match(/^(\d+:?)+$/)) {
    return getColonTime(timeString);
  }
  return 0;
};
const {
  getQueryParams: getQueryParams2
} = util;
function UrlParser$1() {
  for (const key of [
    "parseProvider",
    "parse",
    "bind",
    "create"
  ]) {
    this[key] = this[key].bind(this);
  }
  this.plugins = {};
}
var urlParser = UrlParser$1;
UrlParser$1.prototype.parseProvider = function(url) {
  var match = url.match(
    /(?:(?:https?:)?\/\/)?(?:[^.]+\.)?(\w+)\./i
  );
  return match ? match[1] : void 0;
};
UrlParser$1.prototype.parse = function(url) {
  if (typeof url === "undefined") {
    return void 0;
  }
  var provider = this.parseProvider(url);
  var result;
  var plugin = this.plugins[provider];
  if (!provider || !plugin || !plugin.parse) {
    return void 0;
  }
  result = plugin.parse.call(
    plugin,
    url,
    getQueryParams2(url)
  );
  if (result) {
    result = removeEmptyParameters(result);
    result.provider = plugin.provider;
  }
  return result;
};
UrlParser$1.prototype.bind = function(plugin) {
  this.plugins[plugin.provider] = plugin;
  if (plugin.alternatives) {
    for (var i = 0; i < plugin.alternatives.length; i += 1) {
      this.plugins[plugin.alternatives[i]] = plugin;
    }
  }
};
UrlParser$1.prototype.create = function(op) {
  if (typeof op !== "object" || typeof op.videoInfo !== "object") {
    return void 0;
  }
  var vi = op.videoInfo;
  var params = op.params;
  var plugin = this.plugins[vi.provider];
  params = params === "internal" ? vi.params : params || {};
  if (plugin) {
    op.format = op.format || plugin.defaultFormat;
    if (plugin.formats.hasOwnProperty(op.format)) {
      return plugin.formats[op.format].apply(plugin, [vi, Object.assign({}, params)]);
    }
  }
  return void 0;
};
function removeEmptyParameters(result) {
  if (result.params && Object.keys(result.params).length === 0) {
    delete result.params;
  }
  return result;
}
const UrlParser = urlParser;
const parser = new UrlParser();
var base = parser;
const { combineParams: combineParams$1, getTime: getTime$1 } = util;
function Vimeo() {
  this.provider = "vimeo";
  this.alternatives = ["vimeopro"];
  this.defaultFormat = "long";
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl
  };
  this.mediaTypes = {
    VIDEO: "video"
  };
}
Vimeo.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:\/showcase\/\d+)?(?:\/(?:channels\/[\w]+|(?:(?:album\/\d+|groups\/[\w]+)\/)?videos?))?\/(\d+)/i
  );
  return match ? match[1] : void 0;
};
Vimeo.prototype.parseHash = function(url) {
  var match = url.match(/\/\d+\/(\w+)$/i);
  return match ? match[1] : void 0;
};
Vimeo.prototype.parseParameters = function(params) {
  if (params.t) {
    params.start = getTime$1(params.t);
    delete params.t;
  }
  if (params.h) {
    params.hash = params.h;
    delete params.h;
  }
  return params;
};
Vimeo.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: this.parseParameters(params),
    id: this.parseUrl(url)
  };
  var hash = this.parseHash(url, params);
  if (hash) {
    result.params.hash = hash;
  }
  return result.id ? result : void 0;
};
Vimeo.prototype.createUrl = function(baseUrl, vi, params, type) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return void 0;
  }
  var url = baseUrl + vi.id;
  var startTime = params.start;
  delete params.start;
  if (params.hash) {
    if (type === "embed") {
      params.h = params.hash;
    } else if (type === "long") {
      url += "/" + params.hash;
    }
    delete params.hash;
  }
  url += combineParams$1(params);
  if (startTime) {
    url += "#t=" + startTime;
  }
  return url;
};
Vimeo.prototype.createLongUrl = function(vi, params) {
  return this.createUrl("https://vimeo.com/", vi, params, "long");
};
Vimeo.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl("//player.vimeo.com/video/", vi, params, "embed");
};
base.bind(new Vimeo());
const {
  combineParams: combineParams2,
  getTime: getTime2
} = util;
function YouTube() {
  this.provider = "youtube";
  this.alternatives = ["youtu", "ytimg"];
  this.defaultFormat = "long";
  this.formats = {
    short: this.createShortUrl,
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
    shortImage: this.createShortImageUrl,
    longImage: this.createLongImageUrl
  };
  this.imageQualities = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    DEFAULT: "default",
    HQDEFAULT: "hqdefault",
    SDDEFAULT: "sddefault",
    MQDEFAULT: "mqdefault",
    MAXRESDEFAULT: "maxresdefault"
  };
  this.defaultImageQuality = this.imageQualities.HQDEFAULT;
  this.mediaTypes = {
    VIDEO: "video",
    PLAYLIST: "playlist",
    SHARE: "share",
    CHANNEL: "channel"
  };
}
YouTube.prototype.parseVideoUrl = function(url) {
  var match = url.match(
    /(?:(?:v|vi|be|videos|embed)\/(?!videoseries)|(?:v|ci)=)([\w-]{11})/i
  );
  return match ? match[1] : void 0;
};
YouTube.prototype.parseChannelUrl = function(url) {
  var match = url.match(/\/channel\/([\w-]+)/);
  if (match) {
    return { id: match[1], mediaType: this.mediaTypes.CHANNEL };
  }
  match = url.match(/\/(?:c|user)\/([\w-]+)/);
  if (match) {
    return { name: match[1], mediaType: this.mediaTypes.CHANNEL };
  }
};
YouTube.prototype.parseParameters = function(params, result) {
  if (params.start || params.t) {
    params.start = getTime2(params.start || params.t);
    delete params.t;
  }
  if (params.v === result.id) {
    delete params.v;
  }
  if (params.list === result.id) {
    delete params.list;
  }
  return params;
};
YouTube.prototype.parseMediaType = function(result) {
  if (result.params.list) {
    result.list = result.params.list;
    delete result.params.list;
  }
  if (result.id && !result.params.ci) {
    result.mediaType = this.mediaTypes.VIDEO;
  } else if (result.list) {
    delete result.id;
    result.mediaType = this.mediaTypes.PLAYLIST;
  } else if (result.params.ci) {
    delete result.params.ci;
    result.mediaType = this.mediaTypes.SHARE;
  } else {
    return void 0;
  }
  return result;
};
YouTube.prototype.parse = function(url, params) {
  var channelResult = this.parseChannelUrl(url);
  if (channelResult) {
    return channelResult;
  } else {
    var result = {
      params,
      id: this.parseVideoUrl(url)
    };
    result.params = this.parseParameters(params, result);
    result = this.parseMediaType(result);
    return result;
  }
};
YouTube.prototype.createShortUrl = function(vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return void 0;
  }
  var url = "https://youtu.be/" + vi.id;
  if (params.start) {
    url += "#t=" + params.start;
  }
  return url;
};
YouTube.prototype.createLongUrl = function(vi, params) {
  var url = "";
  var startTime = params.start;
  delete params.start;
  if (vi.mediaType === this.mediaTypes.CHANNEL) {
    if (vi.id) {
      url += "https://www.youtube.com/channel/" + vi.id;
    } else if (vi.name) {
      url += "https://www.youtube.com/c/" + vi.name;
    } else {
      return void 0;
    }
  } else if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list) {
    params.feature = "share";
    url += "https://www.youtube.com/playlist";
  } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
    params.v = vi.id;
    url += "https://www.youtube.com/watch";
  } else if (vi.mediaType === this.mediaTypes.SHARE && vi.id) {
    params.ci = vi.id;
    url += "https://www.youtube.com/shared";
  } else {
    return void 0;
  }
  if (vi.list) {
    params.list = vi.list;
  }
  url += combineParams2(params);
  if (vi.mediaType !== this.mediaTypes.PLAYLIST && startTime) {
    url += "#t=" + startTime;
  }
  return url;
};
YouTube.prototype.createEmbedUrl = function(vi, params) {
  var url = "https://www.youtube.com/embed";
  if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list) {
    params.listType = "playlist";
  } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
    url += "/" + vi.id;
    if (params.loop === "1") {
      params.playlist = vi.id;
    }
  } else {
    return void 0;
  }
  if (vi.list) {
    params.list = vi.list;
  }
  url += combineParams2(params);
  return url;
};
YouTube.prototype.createImageUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return void 0;
  }
  var url = baseUrl + vi.id + "/";
  var quality = params.imageQuality || this.defaultImageQuality;
  return url + quality + ".jpg";
};
YouTube.prototype.createShortImageUrl = function(vi, params) {
  return this.createImageUrl("https://i.ytimg.com/vi/", vi, params);
};
YouTube.prototype.createLongImageUrl = function(vi, params) {
  return this.createImageUrl("https://img.youtube.com/vi/", vi, params);
};
base.bind(new YouTube());
let el;
let initialized;
let container;
let displayElement;
let displayImage;
let displayVideo;
let displayAudio;
let iframeContainer;
let iframeSiteVid;
let imgSrc;
let closeButton;
let siteVidID;
let isLoading;
let checkMediaTimeout;
let loadingIcon;
let caption;
let captionText;
let captionContent;
let captionHideButton;
let isOpen;
let galleryOpen;
let isClosing;
const imgCache = [];
let remoteImage;
let animationStart;
let animationEnd;
let onChangeImage;
let rightArrowBtn;
let leftArrowBtn;
let galleryPosition;
let galleryEls;
let galleryCounter;
let preloadedImages = {};
let supportsTouch;
let opts;
const appendEl = "appendChild";
const createEl = "createElement";
const removeEl = "removeChild";
const BigPicture = (options) => {
  initialized || initialize(options);
  if (isLoading) {
    clearTimeout(checkMediaTimeout);
    removeContainer();
  }
  opts = options;
  siteVidID = options.ytSrc || options.vimeoSrc;
  animationStart = options.animationStart;
  animationEnd = options.animationEnd;
  onChangeImage = options.onChangeImage;
  el = options.el;
  remoteImage = false;
  captionContent = el.getAttribute("data-caption");
  if (options.gallery) {
    makeGallery(options.gallery, options.position);
  } else if (siteVidID || options.iframeSrc) {
    displayElement = iframeContainer;
    createIframe();
  } else if (options.imgSrc) {
    remoteImage = true;
    imgSrc = options.imgSrc;
    !~imgCache.indexOf(imgSrc) && toggleLoadingIcon(true);
    displayElement = displayImage;
    displayElement.src = imgSrc;
  } else if (options.audio) {
    toggleLoadingIcon(true);
    displayElement = displayAudio;
    displayElement.src = options.audio;
    checkMedia("audio file");
  } else if (options.vidSrc) {
    toggleLoadingIcon(true);
    if (options.dimensions) {
      changeCSS(displayVideo, `width:${options.dimensions[0]}px`);
    }
    makeVidSrc(options.vidSrc);
    checkMedia("video");
  } else {
    displayElement = displayImage;
    displayElement.src = el.tagName === "IMG" ? el.src : window.getComputedStyle(el).backgroundImage.replace(/^url|[(|)|'|"]/g, "");
  }
  container[appendEl](displayElement);
  document.body[appendEl](container);
  return {
    close,
    opts,
    updateDimensions,
    display: displayElement,
    next: () => updateGallery(1),
    prev: () => updateGallery(-1)
  };
};
function initialize(options) {
  let startX, isPinch;
  function createCloseButton(className) {
    const el2 = document[createEl]("button");
    el2.className = className;
    el2.innerHTML = '<svg viewBox="0 0 48 48"><path d="M28 24L47 5a3 3 0 1 0-4-4L24 20 5 1a3 3 0 1 0-4 4l19 19L1 43a3 3 0 1 0 4 4l19-19 19 19a3 3 0 0 0 4 0v-4L28 24z"/></svg>';
    return el2;
  }
  function createArrowSymbol(direction, style3) {
    const el2 = document[createEl]("button");
    el2.className = "bp-lr";
    el2.innerHTML = '<svg viewBox="0 0 129 129" height="70" fill="#fff"><path d="M88.6 121.3c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2a4.1 4.1 0 0 0 0-5.8l-51-51 51-51a4.1 4.1 0 0 0-5.8-5.8l-54 53.9a4.1 4.1 0 0 0 0 5.8l54 53.9z"/></svg>';
    changeCSS(el2, style3);
    el2.onclick = (e) => {
      e.stopPropagation();
      updateGallery(direction);
    };
    return el2;
  }
  const style2 = document[createEl]("STYLE");
  const containerColor = options && options.overlayColor ? options.overlayColor : "rgba(0,0,0,.7)";
  style2.innerHTML = `#bp_caption,#bp_container{bottom:0;left:0;right:0;position:fixed;opacity:0}#bp_container>*,#bp_loader{position:absolute;right:0;z-index:10}#bp_container,#bp_caption,#bp_container svg{pointer-events:none}#bp_container{top:0;z-index:9999;background:${containerColor};opacity:0;transition:opacity .35s}#bp_loader{top:0;left:0;bottom:0;display:flex;align-items:center;cursor:wait;background:0;z-index:9}#bp_loader svg{width:50%;max-width:300px;max-height:50%;margin:auto;animation:bpturn 1s infinite linear}#bp_aud,#bp_container img,#bp_sv,#bp_vid{user-select:none;max-height:96%;max-width:96%;top:0;bottom:0;left:0;margin:auto;box-shadow:0 0 3em rgba(0,0,0,.4);z-index:-1}#bp_sv{background:#111}#bp_sv svg{width:66px}#bp_caption{font-size:.9em;padding:1.3em;background:rgba(15,15,15,.94);color:#fff;text-align:center;transition:opacity .3s}#bp_aud{width:650px;top:calc(50% - 20px);bottom:auto;box-shadow:none}#bp_count{left:0;right:auto;padding:14px;color:rgba(255,255,255,.7);font-size:22px;cursor:default}#bp_container button{position:absolute;border:0;outline:0;background:0;cursor:pointer;transition:all .1s}#bp_container>.bp-x{padding:0;height:41px;width:41px;border-radius:100%;top:8px;right:14px;opacity:.8;line-height:1}#bp_container>.bp-x:focus,#bp_container>.bp-x:hover{background:rgba(255,255,255,.2)}.bp-x svg,.bp-xc svg{height:21px;width:20px;fill:#fff;vertical-align:top;}.bp-xc svg{width:16px}#bp_container .bp-xc{left:2%;bottom:100%;padding:9px 20px 7px;background:#d04444;border-radius:2px 2px 0 0;opacity:.85}#bp_container .bp-xc:focus,#bp_container .bp-xc:hover{opacity:1}.bp-lr{top:50%;top:calc(50% - 130px);padding:99px 0;width:6%;background:0;border:0;opacity:.4;transition:opacity .1s}.bp-lr:focus,.bp-lr:hover{opacity:.8}@keyframes bpf{50%{transform:translatex(15px)}100%{transform:none}}@keyframes bpl{50%{transform:translatex(-15px)}100%{transform:none}}@keyframes bpfl{0%{opacity:0;transform:translatex(70px)}100%{opacity:1;transform:none}}@keyframes bpfr{0%{opacity:0;transform:translatex(-70px)}100%{opacity:1;transform:none}}@keyframes bpfol{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(-70px)}}@keyframes bpfor{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(70px)}}@keyframes bpturn{0%{transform:none}100%{transform:rotate(360deg)}}@media (max-width:600px){.bp-lr{font-size:15vw}}`;
  document.head[appendEl](style2);
  container = document[createEl]("DIV");
  container.id = "bp_container";
  container.onclick = close;
  closeButton = createCloseButton("bp-x");
  container[appendEl](closeButton);
  if ("ontouchend" in window && window.visualViewport) {
    supportsTouch = true;
    container.ontouchstart = ({ touches, changedTouches }) => {
      isPinch = touches.length > 1;
      startX = changedTouches[0].pageX;
    };
    container.ontouchend = ({ changedTouches }) => {
      if (galleryOpen && !isPinch && window.visualViewport.scale <= 1) {
        let distX = changedTouches[0].pageX - startX;
        distX < -30 && updateGallery(1);
        distX > 30 && updateGallery(-1);
      }
    };
  }
  displayImage = document[createEl]("IMG");
  displayVideo = document[createEl]("VIDEO");
  displayVideo.id = "bp_vid";
  displayVideo.setAttribute("playsinline", true);
  displayVideo.controls = true;
  displayVideo.loop = true;
  displayAudio = document[createEl]("audio");
  displayAudio.id = "bp_aud";
  displayAudio.controls = true;
  displayAudio.loop = true;
  galleryCounter = document[createEl]("span");
  galleryCounter.id = "bp_count";
  caption = document[createEl]("DIV");
  caption.id = "bp_caption";
  captionHideButton = createCloseButton("bp-xc");
  captionHideButton.onclick = toggleCaption.bind(null, false);
  caption[appendEl](captionHideButton);
  captionText = document[createEl]("SPAN");
  caption[appendEl](captionText);
  container[appendEl](caption);
  rightArrowBtn = createArrowSymbol(1, "transform:scalex(-1)");
  leftArrowBtn = createArrowSymbol(-1, "left:0;right:auto");
  loadingIcon = document[createEl]("DIV");
  loadingIcon.id = "bp_loader";
  loadingIcon.innerHTML = '<svg viewbox="0 0 32 32" fill="#fff" opacity=".8"><path d="M16 0a16 16 0 0 0 0 32 16 16 0 0 0 0-32m0 4a12 12 0 0 1 0 24 12 12 0 0 1 0-24" fill="#000" opacity=".5"/><path d="M16 0a16 16 0 0 1 16 16h-4A12 12 0 0 0 16 4z"/></svg>';
  iframeContainer = document[createEl]("DIV");
  iframeContainer.id = "bp_sv";
  iframeSiteVid = document[createEl]("IFRAME");
  iframeSiteVid.setAttribute("allowfullscreen", true);
  iframeSiteVid.allow = "autoplay; fullscreen";
  iframeSiteVid.onload = () => iframeContainer[removeEl](loadingIcon);
  changeCSS(
    iframeSiteVid,
    "border:0;position:absolute;height:100%;width:100%;left:0;top:0"
  );
  iframeContainer[appendEl](iframeSiteVid);
  displayImage.onload = open;
  displayImage.onerror = open.bind(null, "image");
  window.addEventListener("resize", () => {
    galleryOpen || isLoading && toggleLoadingIcon(true);
    displayElement === iframeContainer && updateDimensions();
  });
  document.addEventListener("keyup", ({ keyCode }) => {
    keyCode === 27 && isOpen && close();
    if (galleryOpen) {
      keyCode === 39 && updateGallery(1);
      keyCode === 37 && updateGallery(-1);
      keyCode === 38 && updateGallery(10);
      keyCode === 40 && updateGallery(-10);
    }
  });
  document.addEventListener("keydown", (e) => {
    const usedKeys = [37, 38, 39, 40];
    if (galleryOpen && ~usedKeys.indexOf(e.keyCode)) {
      e.preventDefault();
    }
  });
  document.addEventListener(
    "focus",
    (e) => {
      if (isOpen && !container.contains(e.target)) {
        e.stopPropagation();
        closeButton.focus();
      }
    },
    true
  );
  initialized = true;
}
function getRect() {
  const { top, left, width, height } = el.getBoundingClientRect();
  const leftOffset = left - (container.clientWidth - width) / 2;
  const centerTop = top - (container.clientHeight - height) / 2;
  const scaleWidth = el.clientWidth / displayElement.clientWidth;
  const scaleHeight = el.clientHeight / displayElement.clientHeight;
  return `transform:translate3D(${leftOffset}px, ${centerTop}px, 0) scale3D(${scaleWidth}, ${scaleHeight}, 0)`;
}
function makeVidSrc(source2) {
  if (Array.isArray(source2)) {
    displayElement = displayVideo.cloneNode();
    source2.forEach((src) => {
      const source3 = document[createEl]("SOURCE");
      source3.src = src;
      source3.type = `video/${src.match(/.(\w+)$/)[1]}`;
      displayElement[appendEl](source3);
    });
  } else {
    displayElement = displayVideo;
    displayElement.src = source2;
  }
}
function makeGallery(gallery, position) {
  let galleryAttribute = opts.galleryAttribute || "data-bp";
  if (Array.isArray(gallery)) {
    galleryPosition = position || 0;
    galleryEls = gallery;
    captionContent = gallery[galleryPosition].caption;
  } else {
    galleryEls = [].slice.call(
      typeof gallery === "string" ? document.querySelectorAll(`${gallery} [${galleryAttribute}]`) : gallery
    );
    const elIndex = galleryEls.indexOf(el);
    galleryPosition = position === 0 || position ? position : elIndex !== -1 ? elIndex : 0;
    galleryEls = galleryEls.map((el2) => ({
      el: el2,
      src: el2.getAttribute(galleryAttribute),
      caption: el2.getAttribute("data-caption")
    }));
  }
  remoteImage = true;
  imgSrc = galleryEls[galleryPosition].src;
  !~imgCache.indexOf(imgSrc) && toggleLoadingIcon(true);
  if (galleryEls.length > 1) {
    container[appendEl](galleryCounter);
    galleryCounter.innerHTML = `${galleryPosition + 1}/${galleryEls.length}`;
    if (!supportsTouch) {
      container[appendEl](rightArrowBtn);
      container[appendEl](leftArrowBtn);
    }
  } else {
    galleryEls = false;
  }
  displayElement = displayImage;
  displayElement.src = imgSrc;
}
function updateGallery(movement) {
  const galleryLength = galleryEls.length - 1;
  if (isLoading) {
    return;
  }
  const isEnd = movement > 0 && galleryPosition === galleryLength || movement < 0 && !galleryPosition;
  if (isEnd) {
    if (!opts.loop) {
      changeCSS(displayImage, "");
      setTimeout(
        changeCSS,
        9,
        displayImage,
        `animation:${movement > 0 ? "bpl" : "bpf"} .3s;transition:transform .35s`
      );
      return;
    }
    galleryPosition = movement > 0 ? -1 : galleryLength + 1;
  }
  galleryPosition = Math.max(
    0,
    Math.min(galleryPosition + movement, galleryLength)
  );
  [galleryPosition - 1, galleryPosition, galleryPosition + 1].forEach(
    (position) => {
      position = Math.max(0, Math.min(position, galleryLength));
      if (preloadedImages[position])
        return;
      const src = galleryEls[position].src;
      const img = document[createEl]("IMG");
      img.addEventListener("load", addToImgCache.bind(null, src));
      img.src = src;
      preloadedImages[position] = img;
    }
  );
  if (preloadedImages[galleryPosition].complete) {
    return changeGalleryImage(movement);
  }
  isLoading = true;
  changeCSS(loadingIcon, "opacity:.4;");
  container[appendEl](loadingIcon);
  preloadedImages[galleryPosition].onload = () => {
    galleryOpen && changeGalleryImage(movement);
  };
  preloadedImages[galleryPosition].onerror = () => {
    galleryEls[galleryPosition] = {
      error: "Error loading image"
    };
    galleryOpen && changeGalleryImage(movement);
  };
}
function changeGalleryImage(movement) {
  if (isLoading) {
    container[removeEl](loadingIcon);
    isLoading = false;
  }
  const activeEl = galleryEls[galleryPosition];
  if (activeEl.error) {
    alert(activeEl.error);
  } else {
    const oldimg = container.querySelector("img:last-of-type");
    displayImage = displayElement = preloadedImages[galleryPosition];
    changeCSS(
      displayImage,
      `animation:${movement > 0 ? "bpfl" : "bpfr"} .35s;transition:transform .35s`
    );
    changeCSS(oldimg, `animation:${movement > 0 ? "bpfol" : "bpfor"} .35s both`);
    container[appendEl](displayImage);
    if (activeEl.el) {
      el = activeEl.el;
    }
  }
  galleryCounter.innerHTML = `${galleryPosition + 1}/${galleryEls.length}`;
  toggleCaption(galleryEls[galleryPosition].caption);
  onChangeImage && onChangeImage([displayImage, galleryEls[galleryPosition]]);
}
function createIframe() {
  let url;
  const prefix = "https://";
  const suffix = "autoplay=1";
  if (opts.ytSrc) {
    url = `${prefix}www.youtube${opts.ytNoCookie ? "-nocookie" : ""}.com/embed/${siteVidID}?html5=1&rel=0&playsinline=1&${suffix}`;
  } else if (opts.vimeoSrc) {
    url = `${prefix}player.vimeo.com/video/${siteVidID}?${suffix}`;
  } else if (opts.iframeSrc) {
    url = opts.iframeSrc;
  }
  changeCSS(loadingIcon, "");
  iframeContainer[appendEl](loadingIcon);
  iframeSiteVid.src = url;
  updateDimensions();
  setTimeout(open, 9);
}
function updateDimensions() {
  let height;
  let width;
  const windowHeight = window.innerHeight * 0.95;
  const windowWidth = window.innerWidth * 0.95;
  const windowAspect = windowHeight / windowWidth;
  const [dimensionWidth, dimensionHeight] = opts.dimensions || [1920, 1080];
  const iframeAspect = dimensionHeight / dimensionWidth;
  if (iframeAspect > windowAspect) {
    height = Math.min(dimensionHeight, windowHeight);
    width = height / iframeAspect;
  } else {
    width = Math.min(dimensionWidth, windowWidth);
    height = width * iframeAspect;
  }
  iframeContainer.style.cssText += `width:${width}px;height:${height}px;`;
}
function checkMedia(errMsg) {
  if (~[1, 4].indexOf(displayElement.readyState)) {
    open();
    setTimeout(() => {
      displayElement.play();
    }, 99);
  } else if (displayElement.error) {
    open(errMsg);
  } else {
    checkMediaTimeout = setTimeout(checkMedia, 35, errMsg);
  }
}
function toggleLoadingIcon(bool) {
  if (opts.noLoader) {
    return;
  }
  bool && changeCSS(
    loadingIcon,
    `top:${el.offsetTop}px;left:${el.offsetLeft}px;height:${el.clientHeight}px;width:${el.clientWidth}px`
  );
  el.parentElement[bool ? appendEl : removeEl](loadingIcon);
  isLoading = bool;
}
function toggleCaption(captionContent2) {
  if (captionContent2) {
    captionText.innerHTML = captionContent2;
  }
  changeCSS(
    caption,
    `opacity:${captionContent2 ? `1;pointer-events:auto` : "0"}`
  );
}
function addToImgCache(url) {
  !~imgCache.indexOf(url) && imgCache.push(url);
}
function open(err) {
  isLoading && toggleLoadingIcon();
  animationStart && animationStart();
  if (typeof err === "string") {
    removeContainer();
    return opts.onError ? opts.onError() : alert(`Error: The requested ${err} could not be loaded.`);
  }
  remoteImage && addToImgCache(imgSrc);
  displayElement.style.cssText += getRect();
  changeCSS(container, `opacity:1;pointer-events:auto`);
  if (animationEnd) {
    animationEnd = setTimeout(animationEnd, 410);
  }
  isOpen = true;
  galleryOpen = !!galleryEls;
  setTimeout(() => {
    displayElement.style.cssText += "transition:transform .35s;transform:none";
    captionContent && setTimeout(toggleCaption, 250, captionContent);
  }, 60);
}
function close(e) {
  const target = e ? e.target : container;
  const clickEls = [
    caption,
    captionHideButton,
    displayVideo,
    displayAudio,
    captionText,
    leftArrowBtn,
    rightArrowBtn,
    loadingIcon
  ];
  target.blur();
  if (isClosing || ~clickEls.indexOf(target)) {
    return;
  }
  displayElement.style.cssText += getRect();
  changeCSS(container, "pointer-events:auto");
  setTimeout(removeContainer, 350);
  clearTimeout(animationEnd);
  isOpen = false;
  isClosing = true;
}
function removeContainer() {
  let srcEl = displayElement === iframeContainer ? iframeSiteVid : displayElement;
  srcEl.removeAttribute("src");
  document.body[removeEl](container);
  container[removeEl](displayElement);
  changeCSS(container, "");
  changeCSS(displayElement, "");
  toggleCaption(false);
  if (galleryOpen) {
    const images = container.querySelectorAll("img");
    for (let i = 0; i < images.length; i++) {
      container[removeEl](images[i]);
    }
    isLoading && container[removeEl](loadingIcon);
    container[removeEl](galleryCounter);
    galleryOpen = galleryEls = false;
    preloadedImages = {};
    supportsTouch || container[removeEl](rightArrowBtn);
    supportsTouch || container[removeEl](leftArrowBtn);
    displayImage.onload = open;
    displayImage.onerror = open.bind(null, "image");
  }
  opts.onClose && opts.onClose();
  isClosing = isLoading = false;
}
function changeCSS({ style: style2 }, newStyle) {
  style2.cssText = newStyle;
}
var lazysizes = { exports: {} };
(function(module) {
  (function(window2, factory) {
    var lazySizes = factory(window2, window2.document, Date);
    window2.lazySizes = lazySizes;
    if (module.exports) {
      module.exports = lazySizes;
    }
  })(
    typeof window != "undefined" ? window : {},
    function l(window2, document2, Date2) {
      var lazysizes2, lazySizesCfg;
      (function() {
        var prop;
        var lazySizesDefaults = {
          lazyClass: "lazyload",
          loadedClass: "lazyloaded",
          loadingClass: "lazyloading",
          preloadClass: "lazypreload",
          errorClass: "lazyerror",
          autosizesClass: "lazyautosizes",
          fastLoadedClass: "ls-is-cached",
          iframeLoadMode: 0,
          srcAttr: "data-src",
          srcsetAttr: "data-srcset",
          sizesAttr: "data-sizes",
          minSize: 40,
          customMedia: {},
          init: true,
          expFactor: 1.5,
          hFac: 0.8,
          loadMode: 2,
          loadHidden: true,
          ricTimeout: 0,
          throttleDelay: 125
        };
        lazySizesCfg = window2.lazySizesConfig || window2.lazysizesConfig || {};
        for (prop in lazySizesDefaults) {
          if (!(prop in lazySizesCfg)) {
            lazySizesCfg[prop] = lazySizesDefaults[prop];
          }
        }
      })();
      if (!document2 || !document2.getElementsByClassName) {
        return {
          init: function() {
          },
          cfg: lazySizesCfg,
          noSupport: true
        };
      }
      var docElem = document2.documentElement;
      var supportPicture = window2.HTMLPictureElement;
      var _addEventListener = "addEventListener";
      var _getAttribute = "getAttribute";
      var addEventListener = window2[_addEventListener].bind(window2);
      var setTimeout2 = window2.setTimeout;
      var requestAnimationFrame2 = window2.requestAnimationFrame || setTimeout2;
      var requestIdleCallback = window2.requestIdleCallback;
      var regPicture = /^picture$/i;
      var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
      var regClassCache = {};
      var forEach2 = Array.prototype.forEach;
      var hasClass2 = function(ele, cls) {
        if (!regClassCache[cls]) {
          regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        }
        return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
      };
      var addClass2 = function(ele, cls) {
        if (!hasClass2(ele, cls)) {
          ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
        }
      };
      var removeClass2 = function(ele, cls) {
        var reg;
        if (reg = hasClass2(ele, cls)) {
          ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
        }
      };
      var addRemoveLoadEvents = function(dom, fn, add) {
        var action = add ? _addEventListener : "removeEventListener";
        if (add) {
          addRemoveLoadEvents(dom, fn);
        }
        loadEvents.forEach(function(evt) {
          dom[action](evt, fn);
        });
      };
      var triggerEvent2 = function(elem, name, detail, noBubbles, noCancelable) {
        var event = document2.createEvent("Event");
        if (!detail) {
          detail = {};
        }
        detail.instance = lazysizes2;
        event.initEvent(name, !noBubbles, !noCancelable);
        event.detail = detail;
        elem.dispatchEvent(event);
        return event;
      };
      var updatePolyfill = function(el2, full) {
        var polyfill;
        if (!supportPicture && (polyfill = window2.picturefill || lazySizesCfg.pf)) {
          if (full && full.src && !el2[_getAttribute]("srcset")) {
            el2.setAttribute("srcset", full.src);
          }
          polyfill({ reevaluate: true, elements: [el2] });
        } else if (full && full.src) {
          el2.src = full.src;
        }
      };
      var getCSS = function(elem, style2) {
        return (getComputedStyle(elem, null) || {})[style2];
      };
      var getWidth = function(elem, parent, width) {
        width = width || elem.offsetWidth;
        while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
          width = parent.offsetWidth;
          parent = parent.parentNode;
        }
        return width;
      };
      var rAF = function() {
        var running, waiting;
        var firstFns = [];
        var secondFns = [];
        var fns = firstFns;
        var run = function() {
          var runFns = fns;
          fns = firstFns.length ? secondFns : firstFns;
          running = true;
          waiting = false;
          while (runFns.length) {
            runFns.shift()();
          }
          running = false;
        };
        var rafBatch = function(fn, queue) {
          if (running && !queue) {
            fn.apply(this, arguments);
          } else {
            fns.push(fn);
            if (!waiting) {
              waiting = true;
              (document2.hidden ? setTimeout2 : requestAnimationFrame2)(run);
            }
          }
        };
        rafBatch._lsFlush = run;
        return rafBatch;
      }();
      var rAFIt = function(fn, simple) {
        return simple ? function() {
          rAF(fn);
        } : function() {
          var that = this;
          var args = arguments;
          rAF(function() {
            fn.apply(that, args);
          });
        };
      };
      var throttle = function(fn) {
        var running;
        var lastTime = 0;
        var gDelay = lazySizesCfg.throttleDelay;
        var rICTimeout = lazySizesCfg.ricTimeout;
        var run = function() {
          running = false;
          lastTime = Date2.now();
          fn();
        };
        var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
          requestIdleCallback(run, { timeout: rICTimeout });
          if (rICTimeout !== lazySizesCfg.ricTimeout) {
            rICTimeout = lazySizesCfg.ricTimeout;
          }
        } : rAFIt(function() {
          setTimeout2(run);
        }, true);
        return function(isPriority) {
          var delay;
          if (isPriority = isPriority === true) {
            rICTimeout = 33;
          }
          if (running) {
            return;
          }
          running = true;
          delay = gDelay - (Date2.now() - lastTime);
          if (delay < 0) {
            delay = 0;
          }
          if (isPriority || delay < 9) {
            idleCallback();
          } else {
            setTimeout2(idleCallback, delay);
          }
        };
      };
      var debounce = function(func) {
        var timeout, timestamp;
        var wait = 99;
        var run = function() {
          timeout = null;
          func();
        };
        var later = function() {
          var last = Date2.now() - timestamp;
          if (last < wait) {
            setTimeout2(later, wait - last);
          } else {
            (requestIdleCallback || run)(run);
          }
        };
        return function() {
          timestamp = Date2.now();
          if (!timeout) {
            timeout = setTimeout2(later, wait);
          }
        };
      };
      var loader = function() {
        var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
        var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
        var regImg = /^img$/i;
        var regIframe = /^iframe$/i;
        var supportScroll = "onscroll" in window2 && !/(gle|ing)bot/.test(navigator.userAgent);
        var shrinkExpand = 0;
        var currentExpand = 0;
        var isLoading2 = 0;
        var lowRuns = -1;
        var resetPreloading = function(e) {
          isLoading2--;
          if (!e || isLoading2 < 0 || !e.target) {
            isLoading2 = 0;
          }
        };
        var isVisible = function(elem) {
          if (isBodyHidden == null) {
            isBodyHidden = getCSS(document2.body, "visibility") == "hidden";
          }
          return isBodyHidden || !(getCSS(elem.parentNode, "visibility") == "hidden" && getCSS(elem, "visibility") == "hidden");
        };
        var isNestedVisible = function(elem, elemExpand) {
          var outerRect;
          var parent = elem;
          var visible = isVisible(elem);
          eLtop -= elemExpand;
          eLbottom += elemExpand;
          eLleft -= elemExpand;
          eLright += elemExpand;
          while (visible && (parent = parent.offsetParent) && parent != document2.body && parent != docElem) {
            visible = (getCSS(parent, "opacity") || 1) > 0;
            if (visible && getCSS(parent, "overflow") != "visible") {
              outerRect = parent.getBoundingClientRect();
              visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
            }
          }
          return visible;
        };
        var checkElements = function() {
          var eLlen, i, rect2, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
          var lazyloadElems = lazysizes2.elements;
          if ((loadMode = lazySizesCfg.loadMode) && isLoading2 < 8 && (eLlen = lazyloadElems.length)) {
            i = 0;
            lowRuns++;
            for (; i < eLlen; i++) {
              if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
                continue;
              }
              if (!supportScroll || lazysizes2.prematureUnveil && lazysizes2.prematureUnveil(lazyloadElems[i])) {
                unveilElement(lazyloadElems[i]);
                continue;
              }
              if (!(elemExpandVal = lazyloadElems[i][_getAttribute]("data-expand")) || !(elemExpand = elemExpandVal * 1)) {
                elemExpand = currentExpand;
              }
              if (!defaultExpand) {
                defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
                lazysizes2._defEx = defaultExpand;
                preloadExpand = defaultExpand * lazySizesCfg.expFactor;
                hFac = lazySizesCfg.hFac;
                isBodyHidden = null;
                if (currentExpand < preloadExpand && isLoading2 < 1 && lowRuns > 2 && loadMode > 2 && !document2.hidden) {
                  currentExpand = preloadExpand;
                  lowRuns = 0;
                } else if (loadMode > 1 && lowRuns > 1 && isLoading2 < 6) {
                  currentExpand = defaultExpand;
                } else {
                  currentExpand = shrinkExpand;
                }
              }
              if (beforeExpandVal !== elemExpand) {
                eLvW = innerWidth + elemExpand * hFac;
                elvH = innerHeight + elemExpand;
                elemNegativeExpand = elemExpand * -1;
                beforeExpandVal = elemExpand;
              }
              rect2 = lazyloadElems[i].getBoundingClientRect();
              if ((eLbottom = rect2.bottom) >= elemNegativeExpand && (eLtop = rect2.top) <= elvH && (eLright = rect2.right) >= elemNegativeExpand * hFac && (eLleft = rect2.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) && (isCompleted && isLoading2 < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
                unveilElement(lazyloadElems[i]);
                loadedSomething = true;
                if (isLoading2 > 9) {
                  break;
                }
              } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading2 < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != "auto"))) {
                autoLoadElem = preloadElems[0] || lazyloadElems[i];
              }
            }
            if (autoLoadElem && !loadedSomething) {
              unveilElement(autoLoadElem);
            }
          }
        };
        var throttledCheckElements = throttle(checkElements);
        var switchLoadingClass = function(e) {
          var elem = e.target;
          if (elem._lazyCache) {
            delete elem._lazyCache;
            return;
          }
          resetPreloading(e);
          addClass2(elem, lazySizesCfg.loadedClass);
          removeClass2(elem, lazySizesCfg.loadingClass);
          addRemoveLoadEvents(elem, rafSwitchLoadingClass);
          triggerEvent2(elem, "lazyloaded");
        };
        var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
        var rafSwitchLoadingClass = function(e) {
          rafedSwitchLoadingClass({ target: e.target });
        };
        var changeIframeSrc = function(elem, src) {
          var loadMode2 = elem.getAttribute("data-load-mode") || lazySizesCfg.iframeLoadMode;
          if (loadMode2 == 0) {
            elem.contentWindow.location.replace(src);
          } else if (loadMode2 == 1) {
            elem.src = src;
          }
        };
        var handleSources = function(source2) {
          var customMedia;
          var sourceSrcset = source2[_getAttribute](lazySizesCfg.srcsetAttr);
          if (customMedia = lazySizesCfg.customMedia[source2[_getAttribute]("data-media") || source2[_getAttribute]("media")]) {
            source2.setAttribute("media", customMedia);
          }
          if (sourceSrcset) {
            source2.setAttribute("srcset", sourceSrcset);
          }
        };
        var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
          var src, srcset, parent, isPicture, event, firesLoad;
          if (!(event = triggerEvent2(elem, "lazybeforeunveil", detail)).defaultPrevented) {
            if (sizes) {
              if (isAuto) {
                addClass2(elem, lazySizesCfg.autosizesClass);
              } else {
                elem.setAttribute("sizes", sizes);
              }
            }
            srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
            src = elem[_getAttribute](lazySizesCfg.srcAttr);
            if (isImg) {
              parent = elem.parentNode;
              isPicture = parent && regPicture.test(parent.nodeName || "");
            }
            firesLoad = detail.firesLoad || "src" in elem && (srcset || src || isPicture);
            event = { target: elem };
            addClass2(elem, lazySizesCfg.loadingClass);
            if (firesLoad) {
              clearTimeout(resetPreloadingTimer);
              resetPreloadingTimer = setTimeout2(resetPreloading, 2500);
              addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
            }
            if (isPicture) {
              forEach2.call(parent.getElementsByTagName("source"), handleSources);
            }
            if (srcset) {
              elem.setAttribute("srcset", srcset);
            } else if (src && !isPicture) {
              if (regIframe.test(elem.nodeName)) {
                changeIframeSrc(elem, src);
              } else {
                elem.src = src;
              }
            }
            if (isImg && (srcset || isPicture)) {
              updatePolyfill(elem, { src });
            }
          }
          if (elem._lazyRace) {
            delete elem._lazyRace;
          }
          removeClass2(elem, lazySizesCfg.lazyClass);
          rAF(function() {
            var isLoaded = elem.complete && elem.naturalWidth > 1;
            if (!firesLoad || isLoaded) {
              if (isLoaded) {
                addClass2(elem, lazySizesCfg.fastLoadedClass);
              }
              switchLoadingClass(event);
              elem._lazyCache = true;
              setTimeout2(function() {
                if ("_lazyCache" in elem) {
                  delete elem._lazyCache;
                }
              }, 9);
            }
            if (elem.loading == "lazy") {
              isLoading2--;
            }
          }, true);
        });
        var unveilElement = function(elem) {
          if (elem._lazyRace) {
            return;
          }
          var detail;
          var isImg = regImg.test(elem.nodeName);
          var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]("sizes"));
          var isAuto = sizes == "auto";
          if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]("src") || elem.srcset) && !elem.complete && !hasClass2(elem, lazySizesCfg.errorClass) && hasClass2(elem, lazySizesCfg.lazyClass)) {
            return;
          }
          detail = triggerEvent2(elem, "lazyunveilread").detail;
          if (isAuto) {
            autoSizer.updateElem(elem, true, elem.offsetWidth);
          }
          elem._lazyRace = true;
          isLoading2++;
          lazyUnveil(elem, detail, isAuto, sizes, isImg);
        };
        var afterScroll = debounce(function() {
          lazySizesCfg.loadMode = 3;
          throttledCheckElements();
        });
        var altLoadmodeScrollListner = function() {
          if (lazySizesCfg.loadMode == 3) {
            lazySizesCfg.loadMode = 2;
          }
          afterScroll();
        };
        var onload = function() {
          if (isCompleted) {
            return;
          }
          if (Date2.now() - started < 999) {
            setTimeout2(onload, 999);
            return;
          }
          isCompleted = true;
          lazySizesCfg.loadMode = 3;
          throttledCheckElements();
          addEventListener("scroll", altLoadmodeScrollListner, true);
        };
        return {
          _: function() {
            started = Date2.now();
            lazysizes2.elements = document2.getElementsByClassName(lazySizesCfg.lazyClass);
            preloadElems = document2.getElementsByClassName(lazySizesCfg.lazyClass + " " + lazySizesCfg.preloadClass);
            addEventListener("scroll", throttledCheckElements, true);
            addEventListener("resize", throttledCheckElements, true);
            addEventListener("pageshow", function(e) {
              if (e.persisted) {
                var loadingElements = document2.querySelectorAll("." + lazySizesCfg.loadingClass);
                if (loadingElements.length && loadingElements.forEach) {
                  requestAnimationFrame2(function() {
                    loadingElements.forEach(function(img) {
                      if (img.complete) {
                        unveilElement(img);
                      }
                    });
                  });
                }
              }
            });
            if (window2.MutationObserver) {
              new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
            } else {
              docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
              docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
              setInterval(throttledCheckElements, 999);
            }
            addEventListener("hashchange", throttledCheckElements, true);
            ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
              document2[_addEventListener](name, throttledCheckElements, true);
            });
            if (/d$|^c/.test(document2.readyState)) {
              onload();
            } else {
              addEventListener("load", onload);
              document2[_addEventListener]("DOMContentLoaded", throttledCheckElements);
              setTimeout2(onload, 2e4);
            }
            if (lazysizes2.elements.length) {
              checkElements();
              rAF._lsFlush();
            } else {
              throttledCheckElements();
            }
          },
          checkElems: throttledCheckElements,
          unveil: unveilElement,
          _aLSL: altLoadmodeScrollListner
        };
      }();
      var autoSizer = function() {
        var autosizesElems;
        var sizeElement = rAFIt(function(elem, parent, event, width) {
          var sources, i, len;
          elem._lazysizesWidth = width;
          width += "px";
          elem.setAttribute("sizes", width);
          if (regPicture.test(parent.nodeName || "")) {
            sources = parent.getElementsByTagName("source");
            for (i = 0, len = sources.length; i < len; i++) {
              sources[i].setAttribute("sizes", width);
            }
          }
          if (!event.detail.dataAttr) {
            updatePolyfill(elem, event.detail);
          }
        });
        var getSizeElement = function(elem, dataAttr, width) {
          var event;
          var parent = elem.parentNode;
          if (parent) {
            width = getWidth(elem, parent, width);
            event = triggerEvent2(elem, "lazybeforesizes", { width, dataAttr: !!dataAttr });
            if (!event.defaultPrevented) {
              width = event.detail.width;
              if (width && width !== elem._lazysizesWidth) {
                sizeElement(elem, parent, event, width);
              }
            }
          }
        };
        var updateElementsSizes = function() {
          var i;
          var len = autosizesElems.length;
          if (len) {
            i = 0;
            for (; i < len; i++) {
              getSizeElement(autosizesElems[i]);
            }
          }
        };
        var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
        return {
          _: function() {
            autosizesElems = document2.getElementsByClassName(lazySizesCfg.autosizesClass);
            addEventListener("resize", debouncedUpdateElementsSizes);
          },
          checkElems: debouncedUpdateElementsSizes,
          updateElem: getSizeElement
        };
      }();
      var init = function() {
        if (!init.i && document2.getElementsByClassName) {
          init.i = true;
          autoSizer._();
          loader._();
        }
      };
      setTimeout2(function() {
        if (lazySizesCfg.init) {
          init();
        }
      });
      lazysizes2 = {
        cfg: lazySizesCfg,
        autoSizer,
        loader,
        init,
        uP: updatePolyfill,
        aC: addClass2,
        rC: removeClass2,
        hC: hasClass2,
        fire: triggerEvent2,
        gW: getWidth,
        rAF
      };
      return lazysizes2;
    }
  );
})(lazysizes);
var ls_blurUp = { exports: {} };
(function(module) {
  (function(window2, factory) {
    if (!window2) {
      return;
    }
    var globalInstall = function() {
      factory(window2.lazySizes);
      window2.removeEventListener("lazyunveilread", globalInstall, true);
    };
    factory = factory.bind(null, window2, window2.document);
    if (module.exports) {
      factory(lazysizes.exports);
    } else if (window2.lazySizes) {
      globalInstall();
    } else {
      window2.addEventListener("lazyunveilread", globalInstall, true);
    }
  })(typeof window != "undefined" ? window : 0, function(window2, document2, lazySizes) {
    var lazySizesCfg;
    (function() {
      var prop;
      var blurUpDefaults = {
        blurUpClass: "ls-blur-up-img",
        blurUpLoadingClass: "ls-blur-up-is-loading",
        blurUpInviewClass: "ls-inview",
        blurUpLoadedClass: "ls-blur-up-loaded",
        blurUpLoadedOriginalClass: "ls-original-loaded"
      };
      lazySizesCfg = lazySizes.cfg || {};
      for (prop in blurUpDefaults) {
        if (!(prop in lazySizesCfg)) {
          lazySizesCfg[prop] = blurUpDefaults[prop];
        }
      }
    })();
    var slice2 = [].slice;
    var regBlurUp = /blur-up["']*\s*:\s*["']*(always|auto)/;
    var regType = /image\/(jpeg|png|gif|svg\+xml)/;
    var transSrc = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    var matchesMedia = function(source2) {
      var media2 = source2.getAttribute("data-media") || source2.getAttribute("media");
      var type = source2.getAttribute("type");
      return (!type || regType.test(type)) && (!media2 || window2.matchMedia(lazySizes.cfg.customMedia[media2] || media2).matches);
    };
    var getLowSrc = function(picture, img) {
      var matchingLowSrc;
      var sources = picture ? slice2.call(picture.querySelectorAll("source, img")) : [img];
      sources.forEach(function(src) {
        if (matchingLowSrc) {
          return;
        }
        var lowSrc = src.getAttribute("data-lowsrc");
        if (lowSrc && matchesMedia(src)) {
          matchingLowSrc = lowSrc;
        }
      });
      return matchingLowSrc;
    };
    var createBlurup = function(picture, img, src, blurUp) {
      var blurImg;
      var isBlurUpLoaded = false;
      var isForced = false;
      var start = blurUp == "always" ? 0 : Date.now();
      var isState = 0;
      var parent = (picture || img).parentNode;
      var createBlurUpImg = function() {
        if (!src) {
          return;
        }
        var onloadBlurUp = function(e) {
          isBlurUpLoaded = true;
          if (!blurImg) {
            blurImg = e.target;
          }
          lazySizes.rAF(function() {
            lazySizes.rC(img, lazySizes.cfg.blurUpLoadingClass);
            if (blurImg) {
              lazySizes.aC(blurImg, lazySizes.cfg.blurUpLoadedClass);
            }
          });
          if (blurImg) {
            blurImg.removeEventListener("load", onloadBlurUp);
            blurImg.removeEventListener("error", onloadBlurUp);
          }
        };
        blurImg = document2.createElement("img");
        blurImg.addEventListener("load", onloadBlurUp);
        blurImg.addEventListener("error", onloadBlurUp);
        blurImg.className = lazySizes.cfg.blurUpClass;
        blurImg.cssText = img.cssText;
        blurImg.src = src;
        blurImg.alt = "";
        blurImg.setAttribute("aria-hidden", "true");
        parent.insertBefore(blurImg, (picture || img).nextSibling);
        if (blurUp != "always") {
          blurImg.style.visibility = "hidden";
          lazySizes.rAF(function() {
            if (blurImg) {
              setTimeout(function() {
                if (blurImg) {
                  lazySizes.rAF(function() {
                    if (!isForced && blurImg) {
                      blurImg.style.visibility = "";
                    }
                  });
                }
              }, lazySizes.cfg.blurupCacheDelay || 33);
            }
          });
        }
      };
      var remove2 = function() {
        if (blurImg) {
          lazySizes.rAF(function() {
            lazySizes.rC(img, lazySizes.cfg.blurUpLoadingClass);
            try {
              blurImg.parentNode.removeChild(blurImg);
            } catch (er) {
            }
            blurImg = null;
          });
        }
      };
      var setStateUp = function(force) {
        isState++;
        isForced = force || isForced;
        if (force) {
          remove2();
        } else if (isState > 1) {
          setTimeout(remove2, 5e3);
        }
      };
      var onload = function() {
        img.removeEventListener("load", onload);
        img.removeEventListener("error", onload);
        if (blurImg) {
          lazySizes.rAF(function() {
            if (blurImg) {
              lazySizes.aC(blurImg, lazySizes.cfg.blurUpLoadedOriginalClass);
            }
          });
        }
        lazySizes.fire(img, "blurUpLoaded");
        if (blurUp != "always" && (!isBlurUpLoaded || Date.now() - start < 66)) {
          setStateUp(true);
        } else {
          setStateUp();
        }
      };
      createBlurUpImg();
      img.addEventListener("load", onload);
      img.addEventListener("error", onload);
      lazySizes.aC(img, lazySizes.cfg.blurUpLoadingClass);
      var parentUnveil = function(e) {
        if (parent != e.target) {
          return;
        }
        lazySizes.aC(blurImg || img, lazySizes.cfg.blurUpInviewClass);
        setStateUp();
        parent.removeEventListener("lazybeforeunveil", parentUnveil);
      };
      if (!parent.getAttribute("data-expand")) {
        parent.setAttribute("data-expand", -1);
      }
      parent.addEventListener("lazybeforeunveil", parentUnveil);
      lazySizes.aC(parent, lazySizes.cfg.lazyClass);
    };
    window2.addEventListener("lazybeforeunveil", function(e) {
      var detail = e.detail;
      if (detail.instance != lazySizes || !detail.blurUp) {
        return;
      }
      var img = e.target;
      var picture = img.parentNode;
      if (picture.nodeName != "PICTURE") {
        picture = null;
      }
      createBlurup(picture, img, getLowSrc(picture, img) || transSrc, detail.blurUp);
    });
    window2.addEventListener("lazyunveilread", function(e) {
      var detail = e.detail;
      if (detail.instance != lazySizes) {
        return;
      }
      var img = e.target;
      var match = (getComputedStyle(img, null) || { fontFamily: "" }).fontFamily.match(regBlurUp);
      if (!match && !img.getAttribute("data-lowsrc")) {
        return;
      }
      detail.blurUp = match && match[1] || lazySizes.cfg.blurupMode || "always";
    });
  });
})(ls_blurUp);
document.addEventListener("DOMContentLoaded", function() {
  class SASite {
    constructor() {
      if (SASite._instance) {
        return SASite._instance;
      }
      SASite._instance = this;
      this.elements = {
        body: document.querySelector("body"),
        languageSelector: document.getElementById("stereoakt_language_selector"),
        menuButton: document.getElementById("stereoakt_menu_button"),
        heroSlider: document.getElementById("stereoakt_hero_slider"),
        imageCarousel: document.getElementById("stereoakt_image_carousel"),
        embededVideo: document.getElementById("stereoakt_embeded_video"),
        trailerButtons: document.querySelectorAll(".c-performance-list__preview-trailer-link"),
        hamburgerButton: document.getElementById("stereoakt_nav_menu_close_button"),
        menuContainer: document.getElementById("stereoakt_menu_container"),
        galleryImages: document.querySelectorAll(".c-carousel__item")
      }, this.widgets = {}, this.bindEvents();
      this.initWidgets();
    }
    initWidgets() {
      if (this.elements.hamburgerButton) {
        this.elements.hamburgerButton.addEventListener("click", () => {
          this.elements.hamburgerButton.classList.toggle("is-active");
          this.elements.menuContainer.classList.toggle("c-header__menu-container--is-active");
          this.elements.body.classList.toggle("no-overflow-y");
        });
      }
      if (this.elements.heroSlider && this.elements.heroSlider.querySelector(".splide__track")) {
        this.widgets.heroSlider = new Splide(this.elements.heroSlider, {
          type: "fade",
          rewind: true,
          arrows: false,
          pagination: false,
          autoplay: true,
          interval: 4e3,
          pauseOnHover: false,
          lazyLoad: true
        }).mount();
      }
      if (this.elements.imageCarousel) {
        this.widgets.imageCarousel = new Splide(this.elements.imageCarousel, {
          type: "loop",
          pagination: false,
          perPage: 4,
          perMove: 1,
          lazyLoad: true,
          breakpoints: {
            880: {
              perPage: 1
            },
            1023: {
              perPage: 2
            }
          },
          classes: {
            arrows: "splide__arrows c-carousel__arrows",
            arrow: "splide__arrow c-carousel__arrow",
            prev: "splide__arrow--prev c-carousel__prev",
            next: "splide__arrow--next c-carousel__next"
          }
        }).mount();
      }
      if (this.elements.embededVideo) {
        this.widgets.embededVideo = new Plyr(this.elements.embededVideo);
      }
      if (this.elements.galleryImages && this.elements.galleryImages.length > 0) {
        this.elements.galleryImages.forEach((item) => {
          item.addEventListener("click", (e) => {
            e.preventDefault();
            this.widgets.bigPicture = BigPicture({
              el: e.currentTarget,
              gallery: "#stereoakt_image_gallery",
              galleryAttribute: "data-bp"
            });
          });
        });
      }
    }
    bindEvents() {
      if (this.elements.menuButton) {
        this.elements.menuButton.addEventListener("click", (e) => {
          e.currentTarget.classList.toggle("is-active");
        });
      }
      if (this.elements.trailerButtons.length > 0) {
        for (let i = 0; i < this.elements.trailerButtons.length; i++) {
          this.elements.trailerButtons[i].addEventListener("click", () => {
            if (window.innerWidth < 769) {
              window.open(this.elements.trailerButtons[i].dataset.videoUrl);
            } else {
              const videoUrl = this.elements.trailerButtons[i].dataset.videoUrl;
              if (!this.widgets.popUpPlayerInstance) {
                this._createPlayer(videoUrl);
              } else {
                this._destroyPlayer(this._createPlayer(videoUrl));
              }
            }
          });
        }
      }
    }
    _createPlayer(videoId) {
      this.widgets.popUpPlayerInstance = null;
      const popUpPlayerMarkup = `<div class="c-video-modal" id="pop_up_modal">
        <div class="c-video-modal__close-button" id="pop_up_modal_close">X</div>
        <div class="plyr__video-embed">
          <div id="pop_up__player_element" data-plyr-provider="${base.parse(videoId).provider}" data-plyr-embed-id="${videoId}"></div>
        </div>
      </div>`;
      const playerWrapper = document.getElementById("pop_up_player");
      playerWrapper.innerHTML = popUpPlayerMarkup;
      this.widgets.popUpPlayerInstance = new Plyr("#pop_up__player_element");
      this._addPopUpCloseButtonEventListener();
    }
    _destroyPlayer(cb) {
      this.widgets.popUpPlayerInstance.destroy();
      this.widgets.popUpPlayerInstance = null;
      if (!cb)
        return;
    }
    _removeModalInner() {
      document.getElementById("pop_up_modal").remove();
    }
    _addPopUpCloseButtonEventListener() {
      if (!document.getElementById("pop_up_modal_close"))
        return;
      document.getElementById("pop_up_modal_close").addEventListener("click", () => {
        this._removeModalInner();
        this._destroyPlayer(null);
      });
    }
  }
  new SASite();
});
console.log("main.js");
