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
function e(e, o, n, i) {
    return new (n || (n = Promise))((function(a, r) {
            function t(e) {
                try {
                    m(i.next(e))
                } catch (e) {
                    r(e)
                }
            }
            function s(e) {
                try {
                    m(i.throw(e))
                } catch (e) {
                    r(e)
                }
            }
            function m(e) {
                var o;
                e.done ? a(e.value) : (o = e.value,
                    o instanceof n ? o : new n((function(e) {
                            e(o)
                        }
                    ))).then(t, s)
            }
            m((i = i.apply(e, o || [])).next())
        }
    ))
}
!function(e, o) {
    void 0 === o && (o = {});
    var n = o.insertAt;
    if (e && "undefined" != typeof document) {
        var i = document.head || document.getElementsByTagName("head")[0]
            , a = document.createElement("style");
        a.type = "text/css",
            "top" === n && i.firstChild ? i.insertBefore(a, i.firstChild) : i.appendChild(a),
            a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(document.createTextNode(e))
    }
}('@keyframes show {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.8, 0.8, 0.8);\n  }\n\n  50% {\n    transform: scale3d(1.05, 1.05, 1.05);\n  }\n\n  100% {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes hide {\n  0% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n\n  100% {\n    opacity: 0;\n    transform: scale3d(0.8, 0.8, 0.8);\n  }\n}\n\n@keyframes grow {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.8, 0.8, 0.8); \n  }\n\n  100% { \n    opacity: 1;\n    transform: scale3d(1, 1, 1); \n  }\n}\n\n@keyframes shrink {\n  0% { \n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n\n  100% { \n    opacity: 0;\n    transform: scale3d(0.8, 0.8, 0.8); \n  }\n}\n\n@keyframes fade-in {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}\n\n@keyframes fade-out {\n  0% { opacity: 1; }\n  100% { opacity: 0; }\n}\n\n.emoji-picker {\n  --animation-duration: 0.2s;\n  --animation-easing: ease-in-out;\n\n  --emoji-size: 1.8em;\n  --emoji-size-multiplier: 1.5;\n  --emoji-preview-size: 2em;\n  --emoji-per-row: 8;\n  --row-count: 6;\n\n  --content-height: calc((var(--emoji-size) * var(--emoji-size-multiplier)) * var(--row-count) + var(--category-name-size) + var(--category-button-height) + 0.5em);\n\n  --category-name-size: 0.85em;\n\n  --category-button-height: 2em;\n  --category-button-size: 1.1em;\n  --category-border-bottom-size: 4px;\n\n  --focus-indicator-color: #999999;\n\n  --search-height: 2em;\n\n  --blue-color: #4F81E5;\n\n  --border-color: #CCCCCC;\n  --background-color: #FFFFFF;\n  --text-color: #000000;\n  --secondary-text-color: #666666;\n  --hover-color: #E8F4F9;\n  --search-focus-border-color: var(--blue-color);\n  --search-icon-color: #CCCCCC;\n  --overlay-background-color: rgba(0, 0, 0, 0.8);\n  --popup-background-color: #FFFFFF;\n  --category-button-color: #666666;\n  --category-button-active-color: var(--blue-color);\n\n  --dark-border-color: #666666;\n  --dark-background-color: #333333;\n  --dark-text-color: #FFFFFF;\n  --dark-secondary-text-color: #999999;\n  --dark-hover-color: #666666;\n  --dark-search-background-color: #666666;\n  --dark-search-border-color: #999999;\n  --dark-search-placeholder-color: #999999;\n  --dark-search-focus-border-color: #DBE5F9;\n  --dark-popup-background-color: #333333;\n  --dark-category-button-color: #FFFFFF;\n\n  --font: Arial, Helvetica, sans-serif;\n  --font-size: 16px;\n}\n\n.emoji-picker {\n  font-size: var(--font-size);\n  border: 1px solid var(--border-color);\n  border-radius: 5px;\n  background: var(--background-color);\n  width: calc(var(--emoji-per-row) * var(--emoji-size) * var(--emoji-size-multiplier) + 1em + 1.5rem);\n  font-family: var(--font);\n  overflow: hidden;\n  animation: show var(--animation-duration) var(--animation-easing);\n}\n\n.emoji-picker * {\n  font-family: var(--font);\n  box-sizing: content-box;\n}\n\n.emoji-picker__overlay {\n  background: rgba(0, 0, 0, 0.75);\n  z-index: 1000;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n.emoji-picker.hiding {\n  animation: hide var(--animation-duration) var(--animation-easing);\n}\n\n.emoji-picker.dark {\n  background: var(--dark-background-color);\n  color: var(--dark-text-color);\n  border-color: var(--dark-border-color);\n}\n\n.emoji-picker__content {\n  padding: 0.5em;\n  height: var(--content-height);\n  position: relative;\n}\n\n.emoji-picker__preview {\n  height: var(--emoji-preview-size);\n  padding: 0.5em;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.emoji-picker.dark .emoji-picker__preview {\n  border-top-color: var(--dark-border-color);\n}\n\n.emoji-picker__preview-emoji {\n  font-size: var(--emoji-preview-size);\n  margin-right: 0.25em;\n  font-family: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji";\n}\n\n.emoji-picker__preview-emoji img.emoji {\n  height: 1em;\n  width: 1em;\n  margin: 0 .05em 0 .1em;\n  vertical-align: -0.1em;\n}\n\n.emoji-picker__preview-name {\n  color: var(--text-color);\n  font-size: 0.85em;\n  overflow-wrap: break-word;\n  word-break: break-all;\n}\n\n.emoji-picker.dark .emoji-picker__preview-name {\n  color: var(--dark-text-color);\n}\n\n.emoji-picker__container {\n  display: grid;\n  justify-content: center;\n  grid-template-columns: repeat(var(--emoji-per-row), calc(var(--emoji-size) * var(--emoji-size-multiplier)));\n  grid-auto-rows: calc(var(--emoji-size) * var(--emoji-size-multiplier));\n}\n\n.emoji-picker__container.search-results {\n  height: var(--content-height);\n  overflow-y: auto;\n}\n\n.emoji-picker__custom-emoji {\n  width: 1em;\n  height: 1em;\n}\n\n.emoji-picker__emoji {\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  overflow: hidden;\n  font-size: var(--emoji-size);\n  width: 1.5em;\n  height: 1.5em;\n  padding: 0;\n  margin: 0;\n  outline: none;\n  font-family: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji";\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.emoji-picker__emoji img.emoji {\n  height: 1em;\n  width: 1em;\n  margin: 0 .05em 0 .1em;\n  vertical-align: -0.1em;\n}\n\n.emoji-picker__emoji:focus, .emoji-picker__emoji:hover {\n  background: var(--hover-color);\n}\n\n.emoji-picker__emoji:focus {\n  outline: 1px dotted var(--focus-indicator-color);\n}\n\n.emoji-picker.dark .emoji-picker__emoji:focus, .emoji-picker.dark .emoji-picker__emoji:hover {\n  background: var(--dark-hover-color);\n}\n\n.emoji-picker__plugin-container {\n  margin: 0.5em;\n  display: flex;\n  flex-direction: row;\n}\n\n.emoji-picker__search-container {\n  margin: 0.5em;\n  position: relative;\n  height: var(--search-height);\n  display: flex;\n}\n\n.emoji-picker__search {\n  box-sizing: border-box;\n  width: 100%;\n  border-radius: 3px;\n  border: 1px solid var(--border-color);\n  padding-right: 2em;\n  padding: 0.5em 2.25em 0.5em 0.5em;\n  font-size: 0.85em;\n  outline: none;\n}\n\n.emoji-picker.dark .emoji-picker__search {\n  background: var(--dark-search-background-color);\n  color: var(--dark-text-color);\n  border-color: var(--dark-search-border-color);\n}\n\n.emoji-picker.dark .emoji-picker__search::placeholder {\n  color: var(--dark-search-placeholder-color);\n}\n\n.emoji-picker__search:focus {\n  border: 1px solid var(--search-focus-border-color);\n}\n\n.emoji-picker.dark .emoji-picker__search:focus {\n  border-color: var(--dark-search-focus-border-color);\n}\n\n.emoji-picker__search-icon {\n  position: absolute;\n  color: var(--search-icon-color);\n  width: 1em;\n  height: 1em;\n  right: 0.75em;\n  top: calc(50% - 0.5em);\n}\n\n.emoji-picker__search-icon img {\n  width: 1em;\n  height: 1em;\n}\n\n.emoji-picker__search-not-found {\n  color: var(--secondary-text-color);\n  text-align: center;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.emoji-picker__search-not-found h2 {\n  color: var(--secondary-text-color);\n}\n\n.emoji-picker.dark .emoji-picker__search-not-found {\n  color: var(--dark-secondary-text-color);\n}\n\n.emoji-picker.dark .emoji-picker__search-not-found h2 {\n  color: var(--dark-secondary-text-color);\n}\n\n.emoji-picker__search-not-found-icon {\n  font-size: 3em;\n}\n\n.emoji-picker__search-not-found-icon img {\n  width: 1em;\n  height: 1em;\n}\n\n.emoji-picker__search-not-found h2 {\n  margin: 0.5em 0;\n  font-size: 1em;\n}\n\n.emoji-picker__variant-overlay {\n  background: var(--overlay-background-color);\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  animation: fade-in var(--animation-duration) var(--animation-easing);\n}\n\n.emoji-picker__variant-overlay.hiding {\n  animation: fade-out var(--animation-duration) var(--animation-easing);\n}\n\n.emoji-picker__variant-popup {\n  background: var(--popup-background-color);\n  margin: 0.5em;\n  padding: 0.5em;\n  text-align: center;\n  border-radius: 5px;\n  animation: grow var(--animation-duration) var(--animation-easing);\n  user-select: none;\n}\n\n.emoji-picker__variant-overlay.hiding .emoji-picker__variant-popup {\n  animation: shrink var(--animation-duration) var(--animation-easing);\n}\n\n.emoji-picker.dark .emoji-picker__variant-popup {\n  background: var(--dark-popup-background-color);\n}\n\n.emoji-picker__emojis {\n  overflow-y: auto;\n  position: relative;\n  height: calc((var(--emoji-size) * var(--emoji-size-multiplier)) * var(--row-count) + var(--category-name-size));\n}\n\n.emoji-picker__emojis.hiding {\n  animation: fade-out 0.05s var(--animation-easing);\n}\n\n.emoji-picker__emojis h2.emoji-picker__category-name {\n  font-size: 0.85em;\n  color: var(--secondary-text-color);\n  text-transform: uppercase;\n  margin: 0.25em 0;\n  text-align: left;\n}\n\n.emoji-picker.dark h2.emoji-picker__category-name {\n  color: var(--dark-secondary-text-color);\n}\n\n.emoji-picker__category-buttons {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  height: var(--category-button-height);\n  margin-bottom: 0.5em;\n}\n\nbutton.emoji-picker__category-button {\n  flex-grow: 1;\n  background: transparent;\n  padding: 0;\n  border: none;\n  cursor: pointer;\n  font-size: var(--category-button-size);\n  vertical-align: middle;\n  color: var(--category-button-color);\n  border-bottom: var(--category-border-bottom-size) solid transparent;\n  outline: none;\n}\n\nbutton.emoji-picker__category-button img {\n  width: var(--category-button-size);\n  height: var(--category-button-size);\n}\n\n.emoji-picker.keyboard button.emoji-picker__category-button:focus {\n  outline: 1px dotted var(--focus-indicator-color);\n}\n\n.emoji-picker.dark button.emoji-picker__category-button.active {\n  color: var(--category-button-active-color);\n}\n\n.emoji-picker.dark button.emoji-picker__category-button {\n  color: var(--dark-category-button-color);\n}\n\nbutton.emoji-picker__category-button.active {\n  color: var(--category-button-active-color);\n  border-bottom: var(--category-border-bottom-size) solid var(--category-button-active-color);\n}\n\n@media (prefers-color-scheme: dark) {\n  .emoji-picker.auto {\n    background: var(--dark-background-color);\n    color: var(--dark-text-color);\n    border-color: var(--dark-border-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__preview {\n    border-top-color: var(--dark-border-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__preview-name {\n    color: var(--dark-text-color);\n  }\n\n  .emoji-picker.auto button.emoji-picker__category-button {\n    color: var(--dark-category-button-color);\n  }\n\n  .emoji-picker.auto button.emoji-picker__category-button.active {\n    color: var(--category-button-active-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__emoji:focus, .emoji-picker.auto .emoji-picker__emoji:hover {\n    background: var(--dark-hover-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__search {\n    background: var(--dark-search-background-color);\n    color: var(--dark-text-color);\n    border-color: var(--dark-search-border-color);\n  }\n \n  .emoji-picker.auto h2.emoji-picker__category-name {\n    color: var(--dark-secondary-text-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__search::placeholder {\n    color: var(--dark-search-placeholder-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__search:focus {\n    border-color: var(--dark-search-focus-border-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__search-not-found {\n    color: var(--dark-secondary-text-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__search-not-found h2 {\n    color: var(--dark-secondary-text-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__variant-popup {\n    background: var(--dark-popup-background-color);\n  }\n}');
var o = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])']
    , n = o.join(",")
    , i = "undefined" == typeof Element ? function() {}
    : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
function a(e, o) {
    o = o || {};
    var a, t, s, d = [], g = [], u = e.querySelectorAll(n);
    for (o.includeContainer && i.call(e, n) && (u = Array.prototype.slice.apply(u)).unshift(e),
             a = 0; a < u.length; a++)
        r(t = u[a]) && (0 === (s = m(t)) ? d.push(t) : g.push({
            documentOrder: a,
            tabIndex: s,
            node: t
        }));
    return g.sort(c).map((function(e) {
            return e.node
        }
    )).concat(d)
}
function r(e) {
    return !(!t(e) || function(e) {
        return function(e) {
            return d(e) && "radio" === e.type
        }(e) && !function(e) {
            if (!e.name)
                return !0;
            var o = function(e) {
                for (var o = 0; o < e.length; o++)
                    if (e[o].checked)
                        return e[o]
            }(e.ownerDocument.querySelectorAll('input[type="radio"][name="' + e.name + '"]'));
            return !o || o === e
        }(e)
    }(e) || m(e) < 0)
}
function t(e) {
    return !(e.disabled || function(e) {
        return d(e) && "hidden" === e.type
    }(e) || function(e) {
        return null === e.offsetParent || "hidden" === getComputedStyle(e).visibility
    }(e))
}
a.isTabbable = function(e) {
    if (!e)
        throw new Error("No node provided");
    return !1 !== i.call(e, n) && r(e)
}
    ,
    a.isFocusable = function(e) {
        if (!e)
            throw new Error("No node provided");
        return !1 !== i.call(e, s) && t(e)
    }
;
var s = o.concat("iframe").join(",");
function m(e) {
    var o = parseInt(e.getAttribute("tabindex"), 10);
    return isNaN(o) ? function(e) {
        return "true" === e.contentEditable
    }(e) ? 0 : e.tabIndex : o
}
function c(e, o) {
    return e.tabIndex === o.tabIndex ? e.documentOrder - o.documentOrder : e.tabIndex - o.tabIndex
}
function d(e) {
    return "INPUT" === e.tagName
}
var g, u = a, l = function() {
    for (var e = {}, o = 0; o < arguments.length; o++) {
        var n = arguments[o];
        for (var i in n)
            v.call(n, i) && (e[i] = n[i])
    }
    return e
}, v = Object.prototype.hasOwnProperty;
var y, f = (y = [],
    {
        activateTrap: function(e) {
            if (y.length > 0) {
                var o = y[y.length - 1];
                o !== e && o.pause()
            }
            var n = y.indexOf(e);
            -1 === n || y.splice(n, 1),
                y.push(e)
        },
        deactivateTrap: function(e) {
            var o = y.indexOf(e);
            -1 !== o && y.splice(o, 1),
            y.length > 0 && y[y.length - 1].unpause()
        }
    });
function j(e) {
    return setTimeout(e, 0)
}
var h = function(e, o) {
    var n = document
        , i = "string" == typeof e ? n.querySelector(e) : e
        , a = l({
        returnFocusOnDeactivate: !0,
        escapeDeactivates: !0
    }, o)
        , r = {
        firstTabbableNode: null,
        lastTabbableNode: null,
        nodeFocusedBeforeActivation: null,
        mostRecentlyFocusedNode: null,
        active: !1,
        paused: !1
    }
        , t = {
        activate: function(e) {
            if (r.active)
                return;
            w(),
                r.active = !0,
                r.paused = !1,
                r.nodeFocusedBeforeActivation = n.activeElement;
            var o = e && e.onActivate ? e.onActivate : a.onActivate;
            o && o();
            return m(),
                t
        },
        deactivate: s,
        pause: function() {
            if (r.paused || !r.active)
                return;
            r.paused = !0,
                c()
        },
        unpause: function() {
            if (!r.paused || !r.active)
                return;
            r.paused = !1,
                w(),
                m()
        }
    };
    return t;
    function s(e) {
        if (r.active) {
            clearTimeout(g),
                c(),
                r.active = !1,
                r.paused = !1,
                f.deactivateTrap(t);
            var o = e && void 0 !== e.onDeactivate ? e.onDeactivate : a.onDeactivate;
            return o && o(),
            (e && void 0 !== e.returnFocus ? e.returnFocus : a.returnFocusOnDeactivate) && j((function() {
                    var e;
                    k((e = r.nodeFocusedBeforeActivation,
                    d("setReturnFocus") || e))
                }
            )),
                t
        }
    }
    function m() {
        if (r.active)
            return f.activateTrap(t),
                g = j((function() {
                        k(v())
                    }
                )),
                n.addEventListener("focusin", h, !0),
                n.addEventListener("mousedown", y, {
                    capture: !0,
                    passive: !1
                }),
                n.addEventListener("touchstart", y, {
                    capture: !0,
                    passive: !1
                }),
                n.addEventListener("click", b, {
                    capture: !0,
                    passive: !1
                }),
                n.addEventListener("keydown", p, {
                    capture: !0,
                    passive: !1
                }),
                t
    }
    function c() {
        if (r.active)
            return n.removeEventListener("focusin", h, !0),
                n.removeEventListener("mousedown", y, !0),
                n.removeEventListener("touchstart", y, !0),
                n.removeEventListener("click", b, !0),
                n.removeEventListener("keydown", p, !0),
                t
    }
    function d(e) {
        var o = a[e]
            , i = o;
        if (!o)
            return null;
        if ("string" == typeof o && !(i = n.querySelector(o)))
            throw new Error("`" + e + "` refers to no known node");
        if ("function" == typeof o && !(i = o()))
            throw new Error("`" + e + "` did not return a node");
        return i
    }
    function v() {
        var e;
        if (!(e = null !== d("initialFocus") ? d("initialFocus") : i.contains(n.activeElement) ? n.activeElement : r.firstTabbableNode || d("fallbackFocus")))
            throw new Error("Your focus-trap needs to have at least one focusable element");
        return e
    }
    function y(e) {
        i.contains(e.target) || (a.clickOutsideDeactivates ? s({
            returnFocus: !u.isFocusable(e.target)
        }) : a.allowOutsideClick && a.allowOutsideClick(e) || e.preventDefault())
    }
    function h(e) {
        i.contains(e.target) || e.target instanceof Document || (e.stopImmediatePropagation(),
            k(r.mostRecentlyFocusedNode || v()))
    }
    function p(e) {
        if (!1 !== a.escapeDeactivates && function(e) {
            return "Escape" === e.key || "Esc" === e.key || 27 === e.keyCode
        }(e))
            return e.preventDefault(),
                void s();
        (function(e) {
                return "Tab" === e.key || 9 === e.keyCode
            }
        )(e) && function(e) {
            if (w(),
            e.shiftKey && e.target === r.firstTabbableNode)
                return e.preventDefault(),
                    void k(r.lastTabbableNode);
            if (!e.shiftKey && e.target === r.lastTabbableNode)
                e.preventDefault(),
                    k(r.firstTabbableNode)
        }(e)
    }
    function b(e) {
        a.clickOutsideDeactivates || i.contains(e.target) || a.allowOutsideClick && a.allowOutsideClick(e) || (e.preventDefault(),
            e.stopImmediatePropagation())
    }
    function w() {
        var e = u(i);
        r.firstTabbableNode = e[0] || v(),
            r.lastTabbableNode = e[e.length - 1] || v()
    }
    function k(e) {
        e !== n.activeElement && (e && e.focus ? (e.focus(),
            r.mostRecentlyFocusedNode = e,
        function(e) {
            return e.tagName && "input" === e.tagName.toLowerCase() && "function" == typeof e.select
        }(e) && e.select()) : k(v()))
    }
};
function p() {}
p.prototype = {
    on: function(e, o, n) {
        var i = this.e || (this.e = {});
        return (i[e] || (i[e] = [])).push({
            fn: o,
            ctx: n
        }),
            this
    },
    once: function(e, o, n) {
        var i = this;
        function a() {
            i.off(e, a),
                o.apply(n, arguments)
        }
        return a._ = o,
            this.on(e, a, n)
    },
    emit: function(e) {
        for (var o = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), i = 0, a = n.length; i < a; i++)
            n[i].fn.apply(n[i].ctx, o);
        return this
    },
    off: function(e, o) {
        var n = this.e || (this.e = {})
            , i = n[e]
            , a = [];
        if (i && o)
            for (var r = 0, t = i.length; r < t; r++)
                i[r].fn !== o && i[r].fn._ !== o && a.push(i[r]);
        return a.length ? n[e] = a : delete n[e],
            this
    }
};
var b = p;
function w(e) {
    var o = e.getBoundingClientRect();
    return {
        width: o.width,
        height: o.height,
        top: o.top,
        right: o.right,
        bottom: o.bottom,
        left: o.left,
        x: o.left,
        y: o.top
    }
}
function k(e) {
    if ("[object Window]" !== e.toString()) {
        var o = e.ownerDocument;
        return o ? o.defaultView : window
    }
    return e
}
function x(e) {
    var o = k(e);
    return {
        scrollLeft: o.pageXOffset,
        scrollTop: o.pageYOffset
    }
}
function C(e) {
    return e instanceof k(e).Element || e instanceof Element
}
function E(e) {
    return e instanceof k(e).HTMLElement || e instanceof HTMLElement
}
function _(e) {
    return e ? (e.nodeName || "").toLowerCase() : null
}
function z(e) {
    return (C(e) ? e.ownerDocument : e.document).documentElement
}
function O(e) {
    return w(z(e)).left + x(e).scrollLeft
}
function I(e) {
    return k(e).getComputedStyle(e)
}
function S(e) {
    var o = I(e)
        , n = o.overflow
        , i = o.overflowX
        , a = o.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + a + i)
}
function P(e, o, n) {
    void 0 === n && (n = !1);
    var i, a, r = z(o), t = w(e), s = {
        scrollLeft: 0,
        scrollTop: 0
    }, m = {
        x: 0,
        y: 0
    };
    return n || (("body" !== _(o) || S(r)) && (s = (i = o) !== k(i) && E(i) ? {
        scrollLeft: (a = i).scrollLeft,
        scrollTop: a.scrollTop
    } : x(i)),
        E(o) ? ((m = w(o)).x += o.clientLeft,
            m.y += o.clientTop) : r && (m.x = O(r))),
        {
            x: t.left + s.scrollLeft - m.x,
            y: t.top + s.scrollTop - m.y,
            width: t.width,
            height: t.height
        }
}
function M(e) {
    return {
        x: e.offsetLeft,
        y: e.offsetTop,
        width: e.offsetWidth,
        height: e.offsetHeight
    }
}
function A(e) {
    return "html" === _(e) ? e : e.assignedSlot || e.parentNode || e.host || z(e)
}
function L(e) {
    return ["html", "body", "#document"].indexOf(_(e)) >= 0 ? e.ownerDocument.body : E(e) && S(e) ? e : L(A(e))
}
function T(e, o) {
    void 0 === o && (o = []);
    var n = L(e)
        , i = "body" === _(n)
        , a = k(n)
        , r = i ? [a].concat(a.visualViewport || [], S(n) ? n : []) : n
        , t = o.concat(r);
    return i ? t : t.concat(T(A(r)))
}
function N(e) {
    return ["table", "td", "th"].indexOf(_(e)) >= 0
}
function F(e) {
    return E(e) && "fixed" !== I(e).position ? e.offsetParent : null
}
function B(e) {
    for (var o = k(e), n = F(e); n && N(n); )
        n = F(n);
    return n && "body" === _(n) && "static" === I(n).position ? o : n || o
}
p.TinyEmitter = b;
var D = "top"
    , R = "bottom"
    , q = "right"
    , V = "left"
    , H = [D, R, q, V]
    , U = H.reduce((function(e, o) {
        return e.concat([o + "-start", o + "-end"])
    }
), [])
    , W = [].concat(H, ["auto"]).reduce((function(e, o) {
        return e.concat([o, o + "-start", o + "-end"])
    }
), [])
    , K = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];
function J(e) {
    var o = new Map
        , n = new Set
        , i = [];
    function a(e) {
        n.add(e.name),
            [].concat(e.requires || [], e.requiresIfExists || []).forEach((function(e) {
                    if (!n.has(e)) {
                        var i = o.get(e);
                        i && a(i)
                    }
                }
            )),
            i.push(e)
    }
    return e.forEach((function(e) {
            o.set(e.name, e)
        }
    )),
        e.forEach((function(e) {
                n.has(e.name) || a(e)
            }
        )),
        i
}
function G(e) {
    return e.split("-")[0]
}
var X = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};
function Y() {
    for (var e = arguments.length, o = new Array(e), n = 0; n < e; n++)
        o[n] = arguments[n];
    return !o.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        }
    ))
}
function $(e) {
    void 0 === e && (e = {});
    var o = e
        , n = o.defaultModifiers
        , i = void 0 === n ? [] : n
        , a = o.defaultOptions
        , r = void 0 === a ? X : a;
    return function(e, o, n) {
        void 0 === n && (n = r);
        var a, t, s = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, X, {}, r),
            modifiersData: {},
            elements: {
                reference: e,
                popper: o
            },
            attributes: {},
            styles: {}
        }, m = [], c = !1, d = {
            state: s,
            setOptions: function(n) {
                g(),
                    s.options = Object.assign({}, r, {}, s.options, {}, n),
                    s.scrollParents = {
                        reference: C(e) ? T(e) : e.contextElement ? T(e.contextElement) : [],
                        popper: T(o)
                    };
                var a, t, c = function(e) {
                    var o = J(e);
                    return K.reduce((function(e, n) {
                            return e.concat(o.filter((function(e) {
                                    return e.phase === n
                                }
                            )))
                        }
                    ), [])
                }((a = [].concat(i, s.options.modifiers),
                    t = a.reduce((function(e, o) {
                            var n = e[o.name];
                            return e[o.name] = n ? Object.assign({}, n, {}, o, {
                                options: Object.assign({}, n.options, {}, o.options),
                                data: Object.assign({}, n.data, {}, o.data)
                            }) : o,
                                e
                        }
                    ), {}),
                    Object.keys(t).map((function(e) {
                            return t[e]
                        }
                    ))));
                return s.orderedModifiers = c.filter((function(e) {
                        return e.enabled
                    }
                )),
                    s.orderedModifiers.forEach((function(e) {
                            var o = e.name
                                , n = e.options
                                , i = void 0 === n ? {} : n
                                , a = e.effect;
                            if ("function" == typeof a) {
                                var r = a({
                                    state: s,
                                    name: o,
                                    instance: d,
                                    options: i
                                })
                                    , t = function() {};
                                m.push(r || t)
                            }
                        }
                    )),
                    d.update()
            },
            forceUpdate: function() {
                if (!c) {
                    var e = s.elements
                        , o = e.reference
                        , n = e.popper;
                    if (Y(o, n)) {
                        s.rects = {
                            reference: P(o, B(n), "fixed" === s.options.strategy),
                            popper: M(n)
                        },
                            s.reset = !1,
                            s.placement = s.options.placement,
                            s.orderedModifiers.forEach((function(e) {
                                    return s.modifiersData[e.name] = Object.assign({}, e.data)
                                }
                            ));
                        for (var i = 0; i < s.orderedModifiers.length; i++)
                            if (!0 !== s.reset) {
                                var a = s.orderedModifiers[i]
                                    , r = a.fn
                                    , t = a.options
                                    , m = void 0 === t ? {} : t
                                    , g = a.name;
                                "function" == typeof r && (s = r({
                                    state: s,
                                    options: m,
                                    name: g,
                                    instance: d
                                }) || s)
                            } else
                                s.reset = !1,
                                    i = -1
                    }
                }
            },
            update: (a = function() {
                    return new Promise((function(e) {
                            d.forceUpdate(),
                                e(s)
                        }
                    ))
                }
                    ,
                    function() {
                        return t || (t = new Promise((function(e) {
                                Promise.resolve().then((function() {
                                        t = void 0,
                                            e(a())
                                    }
                                ))
                            }
                        ))),
                            t
                    }
            ),
            destroy: function() {
                g(),
                    c = !0
            }
        };
        if (!Y(e, o))
            return d;
        function g() {
            m.forEach((function(e) {
                    return e()
                }
            )),
                m = []
        }
        return d.setOptions(n).then((function(e) {
                !c && n.onFirstUpdate && n.onFirstUpdate(e)
            }
        )),
            d
    }
}
var Z = {
    passive: !0
};
function Q(e) {
    return e.split("-")[1]
}
function ee(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
}
function oe(e) {
    var o, n = e.reference, i = e.element, a = e.placement, r = a ? G(a) : null, t = a ? Q(a) : null, s = n.x + n.width / 2 - i.width / 2, m = n.y + n.height / 2 - i.height / 2;
    switch (r) {
        case D:
            o = {
                x: s,
                y: n.y - i.height
            };
            break;
        case R:
            o = {
                x: s,
                y: n.y + n.height
            };
            break;
        case q:
            o = {
                x: n.x + n.width,
                y: m
            };
            break;
        case V:
            o = {
                x: n.x - i.width,
                y: m
            };
            break;
        default:
            o = {
                x: n.x,
                y: n.y
            }
    }
    var c = r ? ee(r) : null;
    if (null != c) {
        var d = "y" === c ? "height" : "width";
        switch (t) {
            case "start":
                o[c] = Math.floor(o[c]) - Math.floor(n[d] / 2 - i[d] / 2);
                break;
            case "end":
                o[c] = Math.floor(o[c]) + Math.ceil(n[d] / 2 - i[d] / 2)
        }
    }
    return o
}
var ne = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};
function ie(e) {
    var o, n = e.popper, i = e.popperRect, a = e.placement, r = e.offsets, t = e.position, s = e.gpuAcceleration, m = e.adaptive, c = function(e) {
        var o = e.x
            , n = e.y
            , i = window.devicePixelRatio || 1;
        return {
            x: Math.round(o * i) / i || 0,
            y: Math.round(n * i) / i || 0
        }
    }(r), d = c.x, g = c.y, u = r.hasOwnProperty("x"), l = r.hasOwnProperty("y"), v = V, y = D, f = window;
    if (m) {
        var j = B(n);
        j === k(n) && (j = z(n)),
        a === D && (y = R,
            g -= j.clientHeight - i.height,
            g *= s ? 1 : -1),
        a === V && (v = q,
            d -= j.clientWidth - i.width,
            d *= s ? 1 : -1)
    }
    var h, p = Object.assign({
        position: t
    }, m && ne);
    return s ? Object.assign({}, p, ((h = {})[y] = l ? "0" : "",
        h[v] = u ? "0" : "",
        h.transform = (f.devicePixelRatio || 1) < 2 ? "translate(" + d + "px, " + g + "px)" : "translate3d(" + d + "px, " + g + "px, 0)",
        h)) : Object.assign({}, p, ((o = {})[y] = l ? g + "px" : "",
        o[v] = u ? d + "px" : "",
        o.transform = "",
        o))
}
var ae = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
};
function re(e) {
    return e.replace(/left|right|bottom|top/g, (function(e) {
            return ae[e]
        }
    ))
}
var te = {
    start: "end",
    end: "start"
};
function se(e) {
    return e.replace(/start|end/g, (function(e) {
            return te[e]
        }
    ))
}
function me(e) {
    return parseFloat(e) || 0
}
function ce(e) {
    var o = k(e)
        , n = function(e) {
        var o = E(e) ? I(e) : {};
        return {
            top: me(o.borderTopWidth),
            right: me(o.borderRightWidth),
            bottom: me(o.borderBottomWidth),
            left: me(o.borderLeftWidth)
        }
    }(e)
        , i = "html" === _(e)
        , a = O(e)
        , r = e.clientWidth + n.right
        , t = e.clientHeight + n.bottom;
    return i && o.innerHeight - e.clientHeight > 50 && (t = o.innerHeight - n.bottom),
        {
            top: i ? 0 : e.clientTop,
            right: e.clientLeft > n.left ? n.right : i ? o.innerWidth - r - a : e.offsetWidth - r,
            bottom: i ? o.innerHeight - t : e.offsetHeight - t,
            left: i ? a : e.clientLeft
        }
}
function de(e, o) {
    var n = Boolean(o.getRootNode && o.getRootNode().host);
    if (e.contains(o))
        return !0;
    if (n) {
        var i = o;
        do {
            if (i && e.isSameNode(i))
                return !0;
            i = i.parentNode || i.host
        } while (i)
    }
    return !1
}
function ge(e) {
    return Object.assign({}, e, {
        left: e.x,
        top: e.y,
        right: e.x + e.width,
        bottom: e.y + e.height
    })
}
function ue(e, o) {
    return "viewport" === o ? ge(function(e) {
        var o = k(e)
            , n = o.visualViewport
            , i = o.innerWidth
            , a = o.innerHeight;
        return n && /iPhone|iPod|iPad/.test(navigator.platform) && (i = n.width,
            a = n.height),
            {
                width: i,
                height: a,
                x: 0,
                y: 0
            }
    }(e)) : E(o) ? w(o) : ge(function(e) {
        var o = k(e)
            , n = x(e)
            , i = P(z(e), o);
        return i.height = Math.max(i.height, o.innerHeight),
            i.width = Math.max(i.width, o.innerWidth),
            i.x = -n.scrollLeft,
            i.y = -n.scrollTop,
            i
    }(z(e)))
}
function le(e, o, n) {
    var i = "clippingParents" === o ? function(e) {
        var o = T(e)
            , n = ["absolute", "fixed"].indexOf(I(e).position) >= 0 && E(e) ? B(e) : e;
        return C(n) ? o.filter((function(e) {
                return C(e) && de(e, n)
            }
        )) : []
    }(e) : [].concat(o)
        , a = [].concat(i, [n])
        , r = a[0]
        , t = a.reduce((function(o, n) {
            var i = ue(e, n)
                , a = ce(E(n) ? n : z(e));
            return o.top = Math.max(i.top + a.top, o.top),
                o.right = Math.min(i.right - a.right, o.right),
                o.bottom = Math.min(i.bottom - a.bottom, o.bottom),
                o.left = Math.max(i.left + a.left, o.left),
                o
        }
    ), ue(e, r));
    return t.width = t.right - t.left,
        t.height = t.bottom - t.top,
        t.x = t.left,
        t.y = t.top,
        t
}
function ve(e) {
    return Object.assign({}, {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }, {}, e)
}
function ye(e, o) {
    return o.reduce((function(o, n) {
            return o[n] = e,
                o
        }
    ), {})
}
function fe(e, o) {
    void 0 === o && (o = {});
    var n = o
        , i = n.placement
        , a = void 0 === i ? e.placement : i
        , r = n.boundary
        , t = void 0 === r ? "clippingParents" : r
        , s = n.rootBoundary
        , m = void 0 === s ? "viewport" : s
        , c = n.elementContext
        , d = void 0 === c ? "popper" : c
        , g = n.altBoundary
        , u = void 0 !== g && g
        , l = n.padding
        , v = void 0 === l ? 0 : l
        , y = ve("number" != typeof v ? v : ye(v, H))
        , f = "popper" === d ? "reference" : "popper"
        , j = e.elements.reference
        , h = e.rects.popper
        , p = e.elements[u ? f : d]
        , b = le(C(p) ? p : p.contextElement || z(e.elements.popper), t, m)
        , k = w(j)
        , x = oe({
        reference: k,
        element: h,
        strategy: "absolute",
        placement: a
    })
        , E = ge(Object.assign({}, h, {}, x))
        , _ = "popper" === d ? E : k
        , O = {
        top: b.top - _.top + y.top,
        bottom: _.bottom - b.bottom + y.bottom,
        left: b.left - _.left + y.left,
        right: _.right - b.right + y.right
    }
        , I = e.modifiersData.offset;
    if ("popper" === d && I) {
        var S = I[a];
        Object.keys(O).forEach((function(e) {
                var o = [q, R].indexOf(e) >= 0 ? 1 : -1
                    , n = [D, R].indexOf(e) >= 0 ? "y" : "x";
                O[e] += S[n] * o
            }
        ))
    }
    return O
}
function je(e, o) {
    void 0 === o && (o = {});
    var n = o
        , i = n.placement
        , a = n.boundary
        , r = n.rootBoundary
        , t = n.padding
        , s = n.flipVariations
        , m = n.allowedAutoPlacements
        , c = void 0 === m ? W : m
        , d = Q(i)
        , g = (d ? s ? U : U.filter((function(e) {
            return Q(e) === d
        }
    )) : H).filter((function(e) {
            return c.indexOf(e) >= 0
        }
    )).reduce((function(o, n) {
            return o[n] = fe(e, {
                placement: n,
                boundary: a,
                rootBoundary: r,
                padding: t
            })[G(n)],
                o
        }
    ), {});
    return Object.keys(g).sort((function(e, o) {
            return g[e] - g[o]
        }
    ))
}
function he(e, o, n) {
    return Math.max(e, Math.min(o, n))
}
function pe(e, o, n) {
    return void 0 === n && (n = {
        x: 0,
        y: 0
    }),
        {
            top: e.top - o.height - n.y,
            right: e.right - o.width + n.x,
            bottom: e.bottom - o.height + n.y,
            left: e.left - o.width - n.x
        }
}
function be(e) {
    return [D, q, R, V].some((function(o) {
            return e[o] >= 0
        }
    ))
}
var we = $({
    defaultModifiers: [{
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function() {},
        effect: function(e) {
            var o = e.state
                , n = e.instance
                , i = e.options
                , a = i.scroll
                , r = void 0 === a || a
                , t = i.resize
                , s = void 0 === t || t
                , m = k(o.elements.popper)
                , c = [].concat(o.scrollParents.reference, o.scrollParents.popper);
            return r && c.forEach((function(e) {
                    e.addEventListener("scroll", n.update, Z)
                }
            )),
            s && m.addEventListener("resize", n.update, Z),
                function() {
                    r && c.forEach((function(e) {
                            e.removeEventListener("scroll", n.update, Z)
                        }
                    )),
                    s && m.removeEventListener("resize", n.update, Z)
                }
        },
        data: {}
    }, {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function(e) {
            var o = e.state
                , n = e.name;
            o.modifiersData[n] = oe({
                reference: o.rects.reference,
                element: o.rects.popper,
                strategy: "absolute",
                placement: o.placement
            })
        },
        data: {}
    }, {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function(e) {
            var o = e.state
                , n = e.options
                , i = n.gpuAcceleration
                , a = void 0 === i || i
                , r = n.adaptive
                , t = void 0 === r || r
                , s = {
                placement: G(o.placement),
                popper: o.elements.popper,
                popperRect: o.rects.popper,
                gpuAcceleration: a
            };
            null != o.modifiersData.popperOffsets && (o.styles.popper = Object.assign({}, o.styles.popper, {}, ie(Object.assign({}, s, {
                offsets: o.modifiersData.popperOffsets,
                position: o.options.strategy,
                adaptive: t
            })))),
            null != o.modifiersData.arrow && (o.styles.arrow = Object.assign({}, o.styles.arrow, {}, ie(Object.assign({}, s, {
                offsets: o.modifiersData.arrow,
                position: "absolute",
                adaptive: !1
            })))),
                o.attributes.popper = Object.assign({}, o.attributes.popper, {
                    "data-popper-placement": o.placement
                })
        },
        data: {}
    }, {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(e) {
            var o = e.state;
            Object.keys(o.elements).forEach((function(e) {
                    var n = o.styles[e] || {}
                        , i = o.attributes[e] || {}
                        , a = o.elements[e];
                    E(a) && _(a) && (Object.assign(a.style, n),
                        Object.keys(i).forEach((function(e) {
                                var o = i[e];
                                !1 === o ? a.removeAttribute(e) : a.setAttribute(e, !0 === o ? "" : o)
                            }
                        )))
                }
            ))
        },
        effect: function(e) {
            var o = e.state
                , n = {
                popper: {
                    position: o.options.strategy,
                    left: "0",
                    top: "0",
                    margin: "0"
                },
                arrow: {
                    position: "absolute"
                },
                reference: {}
            };
            return Object.assign(o.elements.popper.style, n.popper),
            o.elements.arrow && Object.assign(o.elements.arrow.style, n.arrow),
                function() {
                    Object.keys(o.elements).forEach((function(e) {
                            var i = o.elements[e]
                                , a = o.attributes[e] || {}
                                , r = Object.keys(o.styles.hasOwnProperty(e) ? o.styles[e] : n[e]).reduce((function(e, o) {
                                    return e[o] = "",
                                        e
                                }
                            ), {});
                            E(i) && _(i) && (Object.assign(i.style, r),
                                Object.keys(a).forEach((function(e) {
                                        i.removeAttribute(e)
                                    }
                                )))
                        }
                    ))
                }
        },
        requires: ["computeStyles"]
    }, {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: ["popperOffsets"],
        fn: function(e) {
            var o = e.state
                , n = e.options
                , i = e.name
                , a = n.offset
                , r = void 0 === a ? [0, 0] : a
                , t = W.reduce((function(e, n) {
                    return e[n] = function(e, o, n) {
                        var i = G(e)
                            , a = [V, D].indexOf(i) >= 0 ? -1 : 1
                            , r = "function" == typeof n ? n(Object.assign({}, o, {
                            placement: e
                        })) : n
                            , t = r[0]
                            , s = r[1];
                        return t = t || 0,
                            s = (s || 0) * a,
                            [V, q].indexOf(i) >= 0 ? {
                                x: s,
                                y: t
                            } : {
                                x: t,
                                y: s
                            }
                    }(n, o.rects, r),
                        e
                }
            ), {})
                , s = t[o.placement]
                , m = s.x
                , c = s.y;
            null != o.modifiersData.popperOffsets && (o.modifiersData.popperOffsets.x += m,
                o.modifiersData.popperOffsets.y += c),
                o.modifiersData[i] = t
        }
    }, {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var o = e.state
                , n = e.options
                , i = e.name;
            if (!o.modifiersData[i]._skip) {
                for (var a = n.mainAxis, r = void 0 === a || a, t = n.altAxis, s = void 0 === t || t, m = n.fallbackPlacements, c = n.padding, d = n.boundary, g = n.rootBoundary, u = n.altBoundary, l = n.flipVariations, v = void 0 === l || l, y = n.allowedAutoPlacements, f = o.options.placement, j = G(f), h = m || (j === f || !v ? [re(f)] : function(e) {
                    if ("auto" === G(e))
                        return [];
                    var o = re(e);
                    return [se(e), o, se(o)]
                }(f)), p = [f].concat(h).reduce((function(e, n) {
                        return e.concat("auto" === G(n) ? je(o, {
                            placement: n,
                            boundary: d,
                            rootBoundary: g,
                            padding: c,
                            flipVariations: v,
                            allowedAutoPlacements: y
                        }) : n)
                    }
                ), []), b = o.rects.reference, w = o.rects.popper, k = new Map, x = !0, C = p[0], E = 0; E < p.length; E++) {
                    var _ = p[E]
                        , z = G(_)
                        , O = "start" === Q(_)
                        , I = [D, R].indexOf(z) >= 0
                        , S = I ? "width" : "height"
                        , P = fe(o, {
                        placement: _,
                        boundary: d,
                        rootBoundary: g,
                        altBoundary: u,
                        padding: c
                    })
                        , M = I ? O ? q : V : O ? R : D;
                    b[S] > w[S] && (M = re(M));
                    var A = re(M)
                        , L = [];
                    if (r && L.push(P[z] <= 0),
                    s && L.push(P[M] <= 0, P[A] <= 0),
                        L.every((function(e) {
                                return e
                            }
                        ))) {
                        C = _,
                            x = !1;
                        break
                    }
                    k.set(_, L)
                }
                if (x)
                    for (var T = function(e) {
                        var o = p.find((function(o) {
                                var n = k.get(o);
                                if (n)
                                    return n.slice(0, e).every((function(e) {
                                            return e
                                        }
                                    ))
                            }
                        ));
                        if (o)
                            return C = o,
                                "break"
                    }, N = v ? 3 : 1; N > 0; N--) {
                        if ("break" === T(N))
                            break
                    }
                o.placement !== C && (o.modifiersData[i]._skip = !0,
                    o.placement = C,
                    o.reset = !0)
            }
        },
        requiresIfExists: ["offset"],
        data: {
            _skip: !1
        }
    }, {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var o = e.state
                , n = e.options
                , i = e.name
                , a = n.mainAxis
                , r = void 0 === a || a
                , t = n.altAxis
                , s = void 0 !== t && t
                , m = n.boundary
                , c = n.rootBoundary
                , d = n.altBoundary
                , g = n.padding
                , u = n.tether
                , l = void 0 === u || u
                , v = n.tetherOffset
                , y = void 0 === v ? 0 : v
                , f = fe(o, {
                boundary: m,
                rootBoundary: c,
                padding: g,
                altBoundary: d
            })
                , j = G(o.placement)
                , h = Q(o.placement)
                , p = !h
                , b = ee(j)
                , w = "x" === b ? "y" : "x"
                , k = o.modifiersData.popperOffsets
                , x = o.rects.reference
                , C = o.rects.popper
                , E = "function" == typeof y ? y(Object.assign({}, o.rects, {
                placement: o.placement
            })) : y
                , _ = {
                x: 0,
                y: 0
            };
            if (k) {
                if (r) {
                    var z = "y" === b ? D : V
                        , O = "y" === b ? R : q
                        , I = "y" === b ? "height" : "width"
                        , S = k[b]
                        , P = k[b] + f[z]
                        , A = k[b] - f[O]
                        , L = l ? -C[I] / 2 : 0
                        , T = "start" === h ? x[I] : C[I]
                        , N = "start" === h ? -C[I] : -x[I]
                        , F = o.elements.arrow
                        , H = l && F ? M(F) : {
                        width: 0,
                        height: 0
                    }
                        , U = o.modifiersData["arrow#persistent"] ? o.modifiersData["arrow#persistent"].padding : {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                        , W = U[z]
                        , K = U[O]
                        , J = he(0, x[I], H[I])
                        , X = p ? x[I] / 2 - L - J - W - E : T - J - W - E
                        , Y = p ? -x[I] / 2 + L + J + K + E : N + J + K + E
                        , $ = o.elements.arrow && B(o.elements.arrow)
                        , Z = $ ? "y" === b ? $.clientTop || 0 : $.clientLeft || 0 : 0
                        , oe = o.modifiersData.offset ? o.modifiersData.offset[o.placement][b] : 0
                        , ne = k[b] + X - oe - Z
                        , ie = k[b] + Y - oe
                        , ae = he(l ? Math.min(P, ne) : P, S, l ? Math.max(A, ie) : A);
                    k[b] = ae,
                        _[b] = ae - S
                }
                if (s) {
                    var re = "x" === b ? D : V
                        , te = "x" === b ? R : q
                        , se = k[w]
                        , me = he(se + f[re], se, se - f[te]);
                    k[w] = me,
                        _[w] = me - se
                }
                o.modifiersData[i] = _
            }
        },
        requiresIfExists: ["offset"]
    }, {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var o, n = e.state, i = e.name, a = n.elements.arrow, r = n.modifiersData.popperOffsets, t = G(n.placement), s = ee(t), m = [V, q].indexOf(t) >= 0 ? "height" : "width";
            if (a && r) {
                var c = n.modifiersData[i + "#persistent"].padding
                    , d = M(a)
                    , g = "y" === s ? D : V
                    , u = "y" === s ? R : q
                    , l = n.rects.reference[m] + n.rects.reference[s] - r[s] - n.rects.popper[m]
                    , v = r[s] - n.rects.reference[s]
                    , y = B(a)
                    , f = y ? "y" === s ? y.clientHeight || 0 : y.clientWidth || 0 : 0
                    , j = l / 2 - v / 2
                    , h = c[g]
                    , p = f - d[m] - c[u]
                    , b = f / 2 - d[m] / 2 + j
                    , w = he(h, b, p)
                    , k = s;
                n.modifiersData[i] = ((o = {})[k] = w,
                    o.centerOffset = w - b,
                    o)
            }
        },
        effect: function(e) {
            var o = e.state
                , n = e.options
                , i = e.name
                , a = n.element
                , r = void 0 === a ? "[data-popper-arrow]" : a
                , t = n.padding
                , s = void 0 === t ? 0 : t;
            null != r && ("string" != typeof r || (r = o.elements.popper.querySelector(r))) && de(o.elements.popper, r) && (o.elements.arrow = r,
                o.modifiersData[i + "#persistent"] = {
                    padding: ve("number" != typeof s ? s : ye(s, H))
                })
        },
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"]
    }, {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: function(e) {
            var o = e.state
                , n = e.name
                , i = o.rects.reference
                , a = o.rects.popper
                , r = o.modifiersData.preventOverflow
                , t = fe(o, {
                elementContext: "reference"
            })
                , s = fe(o, {
                altBoundary: !0
            })
                , m = pe(t, i)
                , c = pe(s, a, r)
                , d = be(m)
                , g = be(c);
            o.modifiersData[n] = {
                referenceClippingOffsets: m,
                popperEscapeOffsets: c,
                isReferenceHidden: d,
                hasPopperEscaped: g
            },
                o.attributes.popper = Object.assign({}, o.attributes.popper, {
                    "data-popper-reference-hidden": d,
                    "data-popper-escaped": g
                })
        }
    }]
})
    , ke = function() {
    var e = {
        base: "https://twemoji.maxcdn.com/v/12.1.2/",
        ext: ".png",
        size: "72x72",
        className: "emoji",
        convert: {
            fromCodePoint: function(e) {
                var o = "string" == typeof e ? parseInt(e, 16) : e;
                if (o < 65536)
                    return s(o);
                return s(55296 + ((o -= 65536) >> 10), 56320 + (1023 & o))
            },
            toCodePoint: j
        },
        onerror: function() {
            this.parentNode && this.parentNode.replaceChild(m(this.alt, !1), this)
        },
        parse: function(o, n) {
            n && "function" != typeof n || (n = {
                callback: n
            });
            return ("string" == typeof o ? l : u)(o, {
                callback: n.callback || c,
                attributes: "function" == typeof n.attributes ? n.attributes : y,
                base: "string" == typeof n.base ? n.base : e.base,
                ext: n.ext || e.ext,
                size: n.folder || (i = n.size || e.size,
                    "number" == typeof i ? i + "x" + i : i),
                className: n.className || e.className,
                onerror: n.onerror || e.onerror
            });
            var i
        },
        replace: f,
        test: function(e) {
            n.lastIndex = 0;
            var o = n.test(e);
            return n.lastIndex = 0,
                o
        }
    }
        , o = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
    }
        , n = /(?:\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c\udffb|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffb|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb\udffc]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udffd]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d])|(?:\ud83d[\udc68\udc69])(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5\udeeb\udeec\udef4-\udefa\udfe0-\udfeb]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd71\udd73-\udd76\udd7a-\udda2\udda5-\uddaa\uddae-\uddb4\uddb7\uddba\uddbc-\uddca\uddd0\uddde-\uddff\ude70-\ude73\ude78-\ude7a\ude80-\ude82\ude90-\ude95]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g
        , i = /\uFE0F/g
        , a = String.fromCharCode(8205)
        , r = /[&<>'"]/g
        , t = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/
        , s = String.fromCharCode;
    return e;
    function m(e, o) {
        return document.createTextNode(o ? e.replace(i, "") : e)
    }
    function c(e, o) {
        return "".concat(o.base, o.size, "/", e, o.ext)
    }
    function d(e, o) {
        for (var n, i, a = e.childNodes, r = a.length; r--; )
            3 === (i = (n = a[r]).nodeType) ? o.push(n) : 1 !== i || "ownerSVGElement"in n || t.test(n.nodeName.toLowerCase()) || d(n, o);
        return o
    }
    function g(e) {
        return j(e.indexOf(a) < 0 ? e.replace(i, "") : e)
    }
    function u(e, o) {
        for (var i, a, r, t, s, c, u, l, v, y, f, j, h, p = d(e, []), b = p.length; b--; ) {
            for (r = !1,
                     t = document.createDocumentFragment(),
                     c = (s = p[b]).nodeValue,
                     l = 0; u = n.exec(c); ) {
                if ((v = u.index) !== l && t.appendChild(m(c.slice(l, v), !0)),
                    j = g(f = u[0]),
                    l = v + f.length,
                    h = o.callback(j, o),
                j && h) {
                    for (a in (y = new Image).onerror = o.onerror,
                        y.setAttribute("draggable", "false"),
                        i = o.attributes(f, j))
                        i.hasOwnProperty(a) && 0 !== a.indexOf("on") && !y.hasAttribute(a) && y.setAttribute(a, i[a]);
                    y.className = o.className,
                        y.alt = f,
                        y.src = h,
                        r = !0,
                        t.appendChild(y)
                }
                y || t.appendChild(m(f, !1)),
                    y = null
            }
            r && (l < c.length && t.appendChild(m(c.slice(l), !0)),
                s.parentNode.replaceChild(t, s))
        }
        return e
    }
    function l(e, o) {
        return f(e, (function(e) {
                var n, i, a = e, t = g(e), s = o.callback(t, o);
                if (t && s) {
                    for (i in a = "<img ".concat('class="', o.className, '" ', 'draggable="false" ', 'alt="', e, '"', ' src="', s, '"'),
                        n = o.attributes(e, t))
                        n.hasOwnProperty(i) && 0 !== i.indexOf("on") && -1 === a.indexOf(" " + i + "=") && (a = a.concat(" ", i, '="', n[i].replace(r, v), '"'));
                    a = a.concat("/>")
                }
                return a
            }
        ))
    }
    function v(e) {
        return o[e]
    }
    function y() {
        return null
    }
    function f(e, o) {
        return String(e).replace(n, o)
    }
    function j(e, o) {
        for (var n = [], i = 0, a = 0, r = 0; r < e.length; )
            i = e.charCodeAt(r++),
                a ? (n.push((65536 + (a - 55296 << 10) + (i - 56320)).toString(16)),
                    a = 0) : 55296 <= i && i <= 56319 ? a = i : n.push(i.toString(16));
        return n.join(o || "-")
    }
}()
    , xe = {
    categories: ["smileys", "people", "animals", "food", "travel", "activities", "objects", "symbols", "flags"],
    emoji: [{
        emoji: "😀",
        category: 0,
        name: "grinning face",
        version: "1.0"
    }, {
        emoji: "😃",
        category: 0,
        name: "grinning face with big eyes",
        version: "1.0"
    }, {
        emoji: "😄",
        category: 0,
        name: "grinning face with smiling eyes",
        version: "1.0"
    }, {
        emoji: "😁",
        category: 0,
        name: "beaming face with smiling eyes",
        version: "1.0"
    }, {
        emoji: "😆",
        category: 0,
        name: "grinning squinting face",
        version: "1.0"
    }, {
        emoji: "😅",
        category: 0,
        name: "grinning face with sweat",
        version: "1.0"
    }, {
        emoji: "🤣",
        category: 0,
        name: "rolling on the floor laughing",
        version: "3.0"
    }, {
        emoji: "😂",
        category: 0,
        name: "face with tears of joy",
        version: "1.0"
    }, {
        emoji: "🙂",
        category: 0,
        name: "slightly smiling face",
        version: "1.0"
    }, {
        emoji: "🙃",
        category: 0,
        name: "upside-down face",
        version: "1.0"
    }, {
        emoji: "😉",
        category: 0,
        name: "winking face",
        version: "1.0"
    }, {
        emoji: "😊",
        category: 0,
        name: "smiling face with smiling eyes",
        version: "1.0"
    }, {
        emoji: "😇",
        category: 0,
        name: "smiling face with halo",
        version: "1.0"
    }, {
        emoji: "🥰",
        category: 0,
        name: "smiling face with hearts",
        version: "11.0"
    }, {
        emoji: "😍",
        category: 0,
        name: "smiling face with heart-eyes",
        version: "1.0"
    }, {
        emoji: "🤩",
        category: 0,
        name: "star-struck",
        version: "5.0"
    }, {
        emoji: "😘",
        category: 0,
        name: "face blowing a kiss",
        version: "1.0"
    }, {
        emoji: "😗",
        category: 0,
        name: "kissing face",
        version: "1.0"
    }, {
        emoji: "☺️",
        category: 0,
        name: "smiling face",
        version: "1.0"
    }, {
        emoji: "😚",
        category: 0,
        name: "kissing face with closed eyes",
        version: "1.0"
    }, {
        emoji: "😙",
        category: 0,
        name: "kissing face with smiling eyes",
        version: "1.0"
    }, {
        emoji: "🥲",
        category: 0,
        name: "smiling face with tear",
        version: "13.0"
    }, {
        emoji: "😋",
        category: 0,
        name: "face savoring food",
        version: "1.0"
    }, {
        emoji: "😛",
        category: 0,
        name: "face with tongue",
        version: "1.0"
    }, {
        emoji: "😜",
        category: 0,
        name: "winking face with tongue",
        version: "1.0"
    }, {
        emoji: "🤪",
        category: 0,
        name: "zany face",
        version: "5.0"
    }, {
        emoji: "😝",
        category: 0,
        name: "squinting face with tongue",
        version: "1.0"
    }, {
        emoji: "🤑",
        category: 0,
        name: "money-mouth face",
        version: "1.0"
    }, {
        emoji: "🤗",
        category: 0,
        name: "hugging face",
        version: "1.0"
    }, {
        emoji: "🤭",
        category: 0,
        name: "face with hand over mouth",
        version: "5.0"
    }, {
        emoji: "🤫",
        category: 0,
        name: "shushing face",
        version: "5.0"
    }, {
        emoji: "🤔",
        category: 0,
        name: "thinking face",
        version: "1.0"
    }, {
        emoji: "🤐",
        category: 0,
        name: "zipper-mouth face",
        version: "1.0"
    }, {
        emoji: "🤨",
        category: 0,
        name: "face with raised eyebrow",
        version: "5.0"
    }, {
        emoji: "😐",
        category: 0,
        name: "neutral face",
        version: "1.0"
    }, {
        emoji: "😑",
        category: 0,
        name: "expressionless face",
        version: "1.0"
    }, {
        emoji: "😶",
        category: 0,
        name: "face without mouth",
        version: "1.0"
    }, {
        emoji: "😏",
        category: 0,
        name: "smirking face",
        version: "1.0"
    }, {
        emoji: "😒",
        category: 0,
        name: "unamused face",
        version: "1.0"
    }, {
        emoji: "🙄",
        category: 0,
        name: "face with rolling eyes",
        version: "1.0"
    }, {
        emoji: "😬",
        category: 0,
        name: "grimacing face",
        version: "1.0"
    }, {
        emoji: "🤥",
        category: 0,
        name: "lying face",
        version: "3.0"
    }, {
        emoji: "😌",
        category: 0,
        name: "relieved face",
        version: "1.0"
    }, {
        emoji: "😔",
        category: 0,
        name: "pensive face",
        version: "1.0"
    }, {
        emoji: "😪",
        category: 0,
        name: "sleepy face",
        version: "1.0"
    }, {
        emoji: "🤤",
        category: 0,
        name: "drooling face",
        version: "3.0"
    }, {
        emoji: "😴",
        category: 0,
        name: "sleeping face",
        version: "1.0"
    }, {
        emoji: "😷",
        category: 0,
        name: "face with medical mask",
        version: "1.0"
    }, {
        emoji: "🤒",
        category: 0,
        name: "face with thermometer",
        version: "1.0"
    }, {
        emoji: "🤕",
        category: 0,
        name: "face with head-bandage",
        version: "1.0"
    }, {
        emoji: "🤢",
        category: 0,
        name: "nauseated face",
        version: "3.0"
    }, {
        emoji: "🤮",
        category: 0,
        name: "face vomiting",
        version: "5.0"
    }, {
        emoji: "🤧",
        category: 0,
        name: "sneezing face",
        version: "3.0"
    }, {
        emoji: "🥵",
        category: 0,
        name: "hot face",
        version: "11.0"
    }, {
        emoji: "🥶",
        category: 0,
        name: "cold face",
        version: "11.0"
    }, {
        emoji: "🥴",
        category: 0,
        name: "woozy face",
        version: "11.0"
    }, {
        emoji: "😵",
        category: 0,
        name: "dizzy face",
        version: "1.0"
    }, {
        emoji: "🤯",
        category: 0,
        name: "exploding head",
        version: "5.0"
    }, {
        emoji: "🤠",
        category: 0,
        name: "cowboy hat face",
        version: "3.0"
    }, {
        emoji: "🥳",
        category: 0,
        name: "partying face",
        version: "11.0"
    }, {
        emoji: "🥸",
        category: 0,
        name: "disguised face",
        version: "13.0"
    }, {
        emoji: "😎",
        category: 0,
        name: "smiling face with sunglasses",
        version: "1.0"
    }, {
        emoji: "🤓",
        category: 0,
        name: "nerd face",
        version: "1.0"
    }, {
        emoji: "🧐",
        category: 0,
        name: "face with monocle",
        version: "5.0"
    }, {
        emoji: "😕",
        category: 0,
        name: "confused face",
        version: "1.0"
    }, {
        emoji: "😟",
        category: 0,
        name: "worried face",
        version: "1.0"
    }, {
        emoji: "🙁",
        category: 0,
        name: "slightly frowning face",
        version: "1.0"
    }, {
        emoji: "☹️",
        category: 0,
        name: "frowning face",
        version: "1.0"
    }, {
        emoji: "😮",
        category: 0,
        name: "face with open mouth",
        version: "1.0"
    }, {
        emoji: "😯",
        category: 0,
        name: "hushed face",
        version: "1.0"
    }, {
        emoji: "😲",
        category: 0,
        name: "astonished face",
        version: "1.0"
    }, {
        emoji: "😳",
        category: 0,
        name: "flushed face",
        version: "1.0"
    }, {
        emoji: "🥺",
        category: 0,
        name: "pleading face",
        version: "11.0"
    }, {
        emoji: "😦",
        category: 0,
        name: "frowning face with open mouth",
        version: "1.0"
    }, {
        emoji: "😧",
        category: 0,
        name: "anguished face",
        version: "1.0"
    }, {
        emoji: "😨",
        category: 0,
        name: "fearful face",
        version: "1.0"
    }, {
        emoji: "😰",
        category: 0,
        name: "anxious face with sweat",
        version: "1.0"
    }, {
        emoji: "😥",
        category: 0,
        name: "sad but relieved face",
        version: "1.0"
    }, {
        emoji: "😢",
        category: 0,
        name: "crying face",
        version: "1.0"
    }, {
        emoji: "😭",
        category: 0,
        name: "loudly crying face",
        version: "1.0"
    }, {
        emoji: "😱",
        category: 0,
        name: "face screaming in fear",
        version: "1.0"
    }, {
        emoji: "😖",
        category: 0,
        name: "confounded face",
        version: "1.0"
    }, {
        emoji: "😣",
        category: 0,
        name: "persevering face",
        version: "1.0"
    }, {
        emoji: "😞",
        category: 0,
        name: "disappointed face",
        version: "1.0"
    }, {
        emoji: "😓",
        category: 0,
        name: "downcast face with sweat",
        version: "1.0"
    }, {
        emoji: "😩",
        category: 0,
        name: "weary face",
        version: "1.0"
    }, {
        emoji: "😫",
        category: 0,
        name: "tired face",
        version: "1.0"
    }, {
        emoji: "🥱",
        category: 0,
        name: "yawning face",
        version: "12.0"
    }, {
        emoji: "😤",
        category: 0,
        name: "face with steam from nose",
        version: "1.0"
    }, {
        emoji: "😡",
        category: 0,
        name: "pouting face",
        version: "1.0"
    }, {
        emoji: "😠",
        category: 0,
        name: "angry face",
        version: "1.0"
    }, {
        emoji: "🤬",
        category: 0,
        name: "face with symbols on mouth",
        version: "5.0"
    }, {
        emoji: "😈",
        category: 0,
        name: "smiling face with horns",
        version: "1.0"
    }, {
        emoji: "👿",
        category: 0,
        name: "angry face with horns",
        version: "1.0"
    }, {
        emoji: "💀",
        category: 0,
        name: "skull",
        version: "1.0"
    }, {
        emoji: "☠️",
        category: 0,
        name: "skull and crossbones",
        version: "1.0"
    }, {
        emoji: "💩",
        category: 0,
        name: "pile of poo",
        version: "1.0"
    }, {
        emoji: "🤡",
        category: 0,
        name: "clown face",
        version: "3.0"
    }, {
        emoji: "👹",
        category: 0,
        name: "ogre",
        version: "1.0"
    }, {
        emoji: "👺",
        category: 0,
        name: "goblin",
        version: "1.0"
    }, {
        emoji: "👻",
        category: 0,
        name: "ghost",
        version: "1.0"
    }, {
        emoji: "👽",
        category: 0,
        name: "alien",
        version: "1.0"
    }, {
        emoji: "👾",
        category: 0,
        name: "alien monster",
        version: "1.0"
    }, {
        emoji: "🤖",
        category: 0,
        name: "robot",
        version: "1.0"
    }, {
        emoji: "😺",
        category: 0,
        name: "grinning cat",
        version: "1.0"
    }, {
        emoji: "😸",
        category: 0,
        name: "grinning cat with smiling eyes",
        version: "1.0"
    }, {
        emoji: "😹",
        category: 0,
        name: "cat with tears of joy",
        version: "1.0"
    }, {
        emoji: "😻",
        category: 0,
        name: "smiling cat with heart-eyes",
        version: "1.0"
    }, {
        emoji: "😼",
        category: 0,
        name: "cat with wry smile",
        version: "1.0"
    }, {
        emoji: "😽",
        category: 0,
        name: "kissing cat",
        version: "1.0"
    }, {
        emoji: "🙀",
        category: 0,
        name: "weary cat",
        version: "1.0"
    }, {
        emoji: "😿",
        category: 0,
        name: "crying cat",
        version: "1.0"
    }, {
        emoji: "😾",
        category: 0,
        name: "pouting cat",
        version: "1.0"
    }, {
        emoji: "🙈",
        category: 0,
        name: "see-no-evil monkey",
        version: "1.0"
    }, {
        emoji: "🙉",
        category: 0,
        name: "hear-no-evil monkey",
        version: "1.0"
    }, {
        emoji: "🙊",
        category: 0,
        name: "speak-no-evil monkey",
        version: "1.0"
    }, {
        emoji: "💋",
        category: 0,
        name: "kiss mark",
        version: "1.0"
    }, {
        emoji: "💌",
        category: 0,
        name: "love letter",
        version: "1.0"
    }, {
        emoji: "💘",
        category: 0,
        name: "heart with arrow",
        version: "1.0"
    }, {
        emoji: "💝",
        category: 0,
        name: "heart with ribbon",
        version: "1.0"
    }, {
        emoji: "💖",
        category: 0,
        name: "sparkling heart",
        version: "1.0"
    }, {
        emoji: "💗",
        category: 0,
        name: "growing heart",
        version: "1.0"
    }, {
        emoji: "💓",
        category: 0,
        name: "beating heart",
        version: "1.0"
    }, {
        emoji: "💞",
        category: 0,
        name: "revolving hearts",
        version: "1.0"
    }, {
        emoji: "💕",
        category: 0,
        name: "two hearts",
        version: "1.0"
    }, {
        emoji: "💟",
        category: 0,
        name: "heart decoration",
        version: "1.0"
    }, {
        emoji: "❣️",
        category: 0,
        name: "heart exclamation",
        version: "1.0"
    }, {
        emoji: "💔",
        category: 0,
        name: "broken heart",
        version: "1.0"
    }, {
        emoji: "❤️",
        category: 0,
        name: "red heart",
        version: "1.0"
    }, {
        emoji: "🧡",
        category: 0,
        name: "orange heart",
        version: "5.0"
    }, {
        emoji: "💛",
        category: 0,
        name: "yellow heart",
        version: "1.0"
    }, {
        emoji: "💚",
        category: 0,
        name: "green heart",
        version: "1.0"
    }, {
        emoji: "💙",
        category: 0,
        name: "blue heart",
        version: "1.0"
    }, {
        emoji: "💜",
        category: 0,
        name: "purple heart",
        version: "1.0"
    }, {
        emoji: "🤎",
        category: 0,
        name: "brown heart",
        version: "12.0"
    }, {
        emoji: "🖤",
        category: 0,
        name: "black heart",
        version: "3.0"
    }, {
        emoji: "🤍",
        category: 0,
        name: "white heart",
        version: "12.0"
    }, {
        emoji: "💯",
        category: 0,
        name: "hundred points",
        version: "1.0"
    }, {
        emoji: "💢",
        category: 0,
        name: "anger symbol",
        version: "1.0"
    }, {
        emoji: "💥",
        category: 0,
        name: "collision",
        version: "1.0"
    }, {
        emoji: "💫",
        category: 0,
        name: "dizzy",
        version: "1.0"
    }, {
        emoji: "💦",
        category: 0,
        name: "sweat droplets",
        version: "1.0"
    }, {
        emoji: "💨",
        category: 0,
        name: "dashing away",
        version: "1.0"
    }, {
        emoji: "🕳️",
        category: 0,
        name: "hole",
        version: "1.0"
    }, {
        emoji: "💣",
        category: 0,
        name: "bomb",
        version: "1.0"
    }, {
        emoji: "💬",
        category: 0,
        name: "speech balloon",
        version: "1.0"
    }, {
        emoji: "👁️‍🗨️",
        category: 0,
        name: "eye in speech bubble",
        version: "2.0"
    }, {
        emoji: "🗨️",
        category: 0,
        name: "left speech bubble",
        version: "2.0"
    }, {
        emoji: "🗯️",
        category: 0,
        name: "right anger bubble",
        version: "1.0"
    }, {
        emoji: "💭",
        category: 0,
        name: "thought balloon",
        version: "1.0"
    }, {
        emoji: "💤",
        category: 0,
        name: "zzz",
        version: "1.0"
    }, {
        emoji: "👋",
        category: 1,
        name: "waving hand",
        variations: ["👋🏻", "👋🏼", "👋🏽", "👋🏾", "👋🏿"],
        version: "1.0"
    }, {
        emoji: "🤚",
        category: 1,
        name: "raised back of hand",
        variations: ["🤚🏻", "🤚🏼", "🤚🏽", "🤚🏾", "🤚🏿"],
        version: "3.0"
    }, {
        emoji: "🖐️",
        category: 1,
        name: "hand with fingers splayed",
        variations: ["🖐🏻", "🖐🏼", "🖐🏽", "🖐🏾", "🖐🏿"],
        version: "1.0"
    }, {
        emoji: "✋",
        category: 1,
        name: "raised hand",
        variations: ["✋🏻", "✋🏼", "✋🏽", "✋🏾", "✋🏿"],
        version: "1.0"
    }, {
        emoji: "🖖",
        category: 1,
        name: "vulcan salute",
        variations: ["🖖🏻", "🖖🏼", "🖖🏽", "🖖🏾", "🖖🏿"],
        version: "1.0"
    }, {
        emoji: "👌",
        category: 1,
        name: "OK hand",
        variations: ["👌🏻", "👌🏼", "👌🏽", "👌🏾", "👌🏿"],
        version: "1.0"
    }, {
        emoji: "🤌",
        category: 1,
        name: "pinched fingers",
        variations: ["🤌🏻", "🤌🏼", "🤌🏽", "🤌🏾", "🤌🏿"],
        version: "13.0"
    }, {
        emoji: "🤏",
        category: 1,
        name: "pinching hand",
        variations: ["🤏🏻", "🤏🏼", "🤏🏽", "🤏🏾", "🤏🏿"],
        version: "12.0"
    }, {
        emoji: "✌️",
        category: 1,
        name: "victory hand",
        variations: ["✌🏻", "✌🏼", "✌🏽", "✌🏾", "✌🏿"],
        version: "1.0"
    }, {
        emoji: "🤞",
        category: 1,
        name: "crossed fingers",
        variations: ["🤞🏻", "🤞🏼", "🤞🏽", "🤞🏾", "🤞🏿"],
        version: "3.0"
    }, {
        emoji: "🤟",
        category: 1,
        name: "love-you gesture",
        variations: ["🤟🏻", "🤟🏼", "🤟🏽", "🤟🏾", "🤟🏿"],
        version: "5.0"
    }, {
        emoji: "🤘",
        category: 1,
        name: "sign of the horns",
        variations: ["🤘🏻", "🤘🏼", "🤘🏽", "🤘🏾", "🤘🏿"],
        version: "1.0"
    }, {
        emoji: "🤙",
        category: 1,
        name: "call me hand",
        variations: ["🤙🏻", "🤙🏼", "🤙🏽", "🤙🏾", "🤙🏿"],
        version: "3.0"
    }, {
        emoji: "👈",
        category: 1,
        name: "backhand index pointing left",
        variations: ["👈🏻", "👈🏼", "👈🏽", "👈🏾", "👈🏿"],
        version: "1.0"
    }, {
        emoji: "👉",
        category: 1,
        name: "backhand index pointing right",
        variations: ["👉🏻", "👉🏼", "👉🏽", "👉🏾", "👉🏿"],
        version: "1.0"
    }, {
        emoji: "👆",
        category: 1,
        name: "backhand index pointing up",
        variations: ["👆🏻", "👆🏼", "👆🏽", "👆🏾", "👆🏿"],
        version: "1.0"
    }, {
        emoji: "🖕",
        category: 1,
        name: "middle finger",
        variations: ["🖕🏻", "🖕🏼", "🖕🏽", "🖕🏾", "🖕🏿"],
        version: "1.0"
    }, {
        emoji: "👇",
        category: 1,
        name: "backhand index pointing down",
        variations: ["👇🏻", "👇🏼", "👇🏽", "👇🏾", "👇🏿"],
        version: "1.0"
    }, {
        emoji: "☝️",
        category: 1,
        name: "index pointing up",
        variations: ["☝🏻", "☝🏼", "☝🏽", "☝🏾", "☝🏿"],
        version: "1.0"
    }, {
        emoji: "👍",
        category: 1,
        name: "thumbs up",
        variations: ["👍🏻", "👍🏼", "👍🏽", "👍🏾", "👍🏿"],
        version: "1.0"
    }, {
        emoji: "👎",
        category: 1,
        name: "thumbs down",
        variations: ["👎🏻", "👎🏼", "👎🏽", "👎🏾", "👎🏿"],
        version: "1.0"
    }, {
        emoji: "✊",
        category: 1,
        name: "raised fist",
        variations: ["✊🏻", "✊🏼", "✊🏽", "✊🏾", "✊🏿"],
        version: "1.0"
    }, {
        emoji: "👊",
        category: 1,
        name: "oncoming fist",
        variations: ["👊🏻", "👊🏼", "👊🏽", "👊🏾", "👊🏿"],
        version: "1.0"
    }, {
        emoji: "🤛",
        category: 1,
        name: "left-facing fist",
        variations: ["🤛🏻", "🤛🏼", "🤛🏽", "🤛🏾", "🤛🏿"],
        version: "3.0"
    }, {
        emoji: "🤜",
        category: 1,
        name: "right-facing fist",
        variations: ["🤜🏻", "🤜🏼", "🤜🏽", "🤜🏾", "🤜🏿"],
        version: "3.0"
    }, {
        emoji: "👏",
        category: 1,
        name: "clapping hands",
        variations: ["👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿"],
        version: "1.0"
    }, {
        emoji: "🙌",
        category: 1,
        name: "raising hands",
        variations: ["🙌🏻", "🙌🏼", "🙌🏽", "🙌🏾", "🙌🏿"],
        version: "1.0"
    }, {
        emoji: "👐",
        category: 1,
        name: "open hands",
        variations: ["👐🏻", "👐🏼", "👐🏽", "👐🏾", "👐🏿"],
        version: "1.0"
    }, {
        emoji: "🤲",
        category: 1,
        name: "palms up together",
        variations: ["🤲🏻", "🤲🏼", "🤲🏽", "🤲🏾", "🤲🏿"],
        version: "5.0"
    }, {
        emoji: "🤝",
        category: 1,
        name: "handshake",
        version: "3.0"
    }, {
        emoji: "🙏",
        category: 1,
        name: "folded hands",
        variations: ["🙏🏻", "🙏🏼", "🙏🏽", "🙏🏾", "🙏🏿"],
        version: "1.0"
    }, {
        emoji: "✍️",
        category: 1,
        name: "writing hand",
        variations: ["✍🏻", "✍🏼", "✍🏽", "✍🏾", "✍🏿"],
        version: "1.0"
    }, {
        emoji: "💅",
        category: 1,
        name: "nail polish",
        variations: ["💅🏻", "💅🏼", "💅🏽", "💅🏾", "💅🏿"],
        version: "1.0"
    }, {
        emoji: "🤳",
        category: 1,
        name: "selfie",
        variations: ["🤳🏻", "🤳🏼", "🤳🏽", "🤳🏾", "🤳🏿"],
        version: "3.0"
    }, {
        emoji: "💪",
        category: 1,
        name: "flexed biceps",
        variations: ["💪🏻", "💪🏼", "💪🏽", "💪🏾", "💪🏿"],
        version: "1.0"
    }, {
        emoji: "🦾",
        category: 1,
        name: "mechanical arm",
        version: "12.0"
    }, {
        emoji: "🦿",
        category: 1,
        name: "mechanical leg",
        version: "12.0"
    }, {
        emoji: "🦵",
        category: 1,
        name: "leg",
        variations: ["🦵🏻", "🦵🏼", "🦵🏽", "🦵🏾", "🦵🏿"],
        version: "11.0"
    }, {
        emoji: "🦶",
        category: 1,
        name: "foot",
        variations: ["🦶🏻", "🦶🏼", "🦶🏽", "🦶🏾", "🦶🏿"],
        version: "11.0"
    }, {
        emoji: "👂",
        category: 1,
        name: "ear",
        variations: ["👂🏻", "👂🏼", "👂🏽", "👂🏾", "👂🏿"],
        version: "1.0"
    }, {
        emoji: "🦻",
        category: 1,
        name: "ear with hearing aid",
        variations: ["🦻🏻", "🦻🏼", "🦻🏽", "🦻🏾", "🦻🏿"],
        version: "12.0"
    }, {
        emoji: "👃",
        category: 1,
        name: "nose",
        variations: ["👃🏻", "👃🏼", "👃🏽", "👃🏾", "👃🏿"],
        version: "1.0"
    }, {
        emoji: "🧠",
        category: 1,
        name: "brain",
        version: "5.0"
    }, {
        emoji: "🫀",
        category: 1,
        name: "anatomical heart",
        version: "13.0"
    }, {
        emoji: "🫁",
        category: 1,
        name: "lungs",
        version: "13.0"
    }, {
        emoji: "🦷",
        category: 1,
        name: "tooth",
        version: "11.0"
    }, {
        emoji: "🦴",
        category: 1,
        name: "bone",
        version: "11.0"
    }, {
        emoji: "👀",
        category: 1,
        name: "eyes",
        version: "1.0"
    }, {
        emoji: "👁️",
        category: 1,
        name: "eye",
        version: "1.0"
    }, {
        emoji: "👅",
        category: 1,
        name: "tongue",
        version: "1.0"
    }, {
        emoji: "👄",
        category: 1,
        name: "mouth",
        version: "1.0"
    }, {
        emoji: "👶",
        category: 1,
        name: "baby",
        variations: ["👶🏻", "👶🏼", "👶🏽", "👶🏾", "👶🏿"],
        version: "1.0"
    }, {
        emoji: "🧒",
        category: 1,
        name: "child",
        variations: ["🧒🏻", "🧒🏼", "🧒🏽", "🧒🏾", "🧒🏿"],
        version: "5.0"
    }, {
        emoji: "👦",
        category: 1,
        name: "boy",
        variations: ["👦🏻", "👦🏼", "👦🏽", "👦🏾", "👦🏿"],
        version: "1.0"
    }, {
        emoji: "👧",
        category: 1,
        name: "girl",
        variations: ["👧🏻", "👧🏼", "👧🏽", "👧🏾", "👧🏿"],
        version: "1.0"
    }, {
        emoji: "🧑",
        category: 1,
        name: "person",
        variations: ["🧑🏻", "🧑🏼", "🧑🏽", "🧑🏾", "🧑🏿"],
        version: "5.0"
    }, {
        emoji: "👱",
        category: 1,
        name: "person with blond hair",
        variations: ["👱🏻", "👱🏼", "👱🏽", "👱🏾", "👱🏿"],
        version: "1.0"
    }, {
        emoji: "👨",
        category: 1,
        name: "man",
        variations: ["👨🏻", "👨🏼", "👨🏽", "👨🏾", "👨🏿"],
        version: "1.0"
    }, {
        emoji: "🧔",
        category: 1,
        name: "man with beard",
        variations: ["🧔🏻", "🧔🏼", "🧔🏽", "🧔🏾", "🧔🏿"],
        version: "5.0"
    }, {
        emoji: "👨‍🦰",
        category: 1,
        name: "man with red hair",
        variations: ["👨🏻‍🦰", "👨🏼‍🦰", "👨🏽‍🦰", "👨🏾‍🦰", "👨🏿‍🦰"],
        version: "11.0"
    }, {
        emoji: "👨‍🦱",
        category: 1,
        name: "man with curly hair",
        variations: ["👨🏻‍🦱", "👨🏼‍🦱", "👨🏽‍🦱", "👨🏾‍🦱", "👨🏿‍🦱"],
        version: "11.0"
    }, {
        emoji: "👨‍🦳",
        category: 1,
        name: "man with white hair",
        variations: ["👨🏻‍🦳", "👨🏼‍🦳", "👨🏽‍🦳", "👨🏾‍🦳", "👨🏿‍🦳"],
        version: "11.0"
    }, {
        emoji: "👨‍🦲",
        category: 1,
        name: "man with no hair",
        variations: ["👨🏻‍🦲", "👨🏼‍🦲", "👨🏽‍🦲", "👨🏾‍🦲", "👨🏿‍🦲"],
        version: "11.0"
    }, {
        emoji: "👩",
        category: 1,
        name: "woman",
        variations: ["👩🏻", "👩🏼", "👩🏽", "👩🏾", "👩🏿"],
        version: "1.0"
    }, {
        emoji: "👩‍🦰",
        category: 1,
        name: "woman with red hair",
        variations: ["👩🏻‍🦰", "👩🏼‍🦰", "👩🏽‍🦰", "👩🏾‍🦰", "👩🏿‍🦰"],
        version: "11.0"
    }, {
        emoji: "🧑‍🦰",
        category: 1,
        name: "person with red hair",
        variations: ["🧑🏻‍🦰", "🧑🏼‍🦰", "🧑🏽‍🦰", "🧑🏾‍🦰", "🧑🏿‍🦰"],
        version: "12.1"
    }, {
        emoji: "👩‍🦱",
        category: 1,
        name: "woman with curly hair",
        variations: ["👩🏻‍🦱", "👩🏼‍🦱", "👩🏽‍🦱", "👩🏾‍🦱", "👩🏿‍🦱"],
        version: "11.0"
    }, {
        emoji: "🧑‍🦱",
        category: 1,
        name: "person with curly hair",
        variations: ["🧑🏻‍🦱", "🧑🏼‍🦱", "🧑🏽‍🦱", "🧑🏾‍🦱", "🧑🏿‍🦱"],
        version: "12.1"
    }, {
        emoji: "👩‍🦳",
        category: 1,
        name: "woman with white hair",
        variations: ["👩🏻‍🦳", "👩🏼‍🦳", "👩🏽‍🦳", "👩🏾‍🦳", "👩🏿‍🦳"],
        version: "11.0"
    }, {
        emoji: "🧑‍🦳",
        category: 1,
        name: "person with white hair",
        variations: ["🧑🏻‍🦳", "🧑🏼‍🦳", "🧑🏽‍🦳", "🧑🏾‍🦳", "🧑🏿‍🦳"],
        version: "12.1"
    }, {
        emoji: "👩‍🦲",
        category: 1,
        name: "woman with no hair",
        variations: ["👩🏻‍🦲", "👩🏼‍🦲", "👩🏽‍🦲", "👩🏾‍🦲", "👩🏿‍🦲"],
        version: "11.0"
    }, {
        emoji: "🧑‍🦲",
        category: 1,
        name: "person with no hair",
        variations: ["🧑🏻‍🦲", "🧑🏼‍🦲", "🧑🏽‍🦲", "🧑🏾‍🦲", "🧑🏿‍🦲"],
        version: "12.1"
    }, {
        emoji: "👱‍♀️",
        category: 1,
        name: "woman with blond hair",
        variations: ["👱🏻‍♀️", "👱🏼‍♀️", "👱🏽‍♀️", "👱🏾‍♀️", "👱🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "👱‍♂️",
        category: 1,
        name: "man with blond hair",
        variations: ["👱🏻‍♂️", "👱🏼‍♂️", "👱🏽‍♂️", "👱🏾‍♂️", "👱🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🧓",
        category: 1,
        name: "older person",
        variations: ["🧓🏻", "🧓🏼", "🧓🏽", "🧓🏾", "🧓🏿"],
        version: "5.0"
    }, {
        emoji: "👴",
        category: 1,
        name: "old man",
        variations: ["👴🏻", "👴🏼", "👴🏽", "👴🏾", "👴🏿"],
        version: "1.0"
    }, {
        emoji: "👵",
        category: 1,
        name: "old woman",
        variations: ["👵🏻", "👵🏼", "👵🏽", "👵🏾", "👵🏿"],
        version: "1.0"
    }, {
        emoji: "🙍",
        category: 1,
        name: "person frowning",
        variations: ["🙍🏻", "🙍🏼", "🙍🏽", "🙍🏾", "🙍🏿"],
        version: "1.0"
    }, {
        emoji: "🙍‍♂️",
        category: 1,
        name: "man frowning",
        variations: ["🙍🏻‍♂️", "🙍🏼‍♂️", "🙍🏽‍♂️", "🙍🏾‍♂️", "🙍🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🙍‍♀️",
        category: 1,
        name: "woman frowning",
        variations: ["🙍🏻‍♀️", "🙍🏼‍♀️", "🙍🏽‍♀️", "🙍🏾‍♀️", "🙍🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🙎",
        category: 1,
        name: "person pouting",
        variations: ["🙎🏻", "🙎🏼", "🙎🏽", "🙎🏾", "🙎🏿"],
        version: "1.0"
    }, {
        emoji: "🙎‍♂️",
        category: 1,
        name: "man pouting",
        variations: ["🙎🏻‍♂️", "🙎🏼‍♂️", "🙎🏽‍♂️", "🙎🏾‍♂️", "🙎🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🙎‍♀️",
        category: 1,
        name: "woman pouting",
        variations: ["🙎🏻‍♀️", "🙎🏼‍♀️", "🙎🏽‍♀️", "🙎🏾‍♀️", "🙎🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🙅",
        category: 1,
        name: "person gesturing NO",
        variations: ["🙅🏻", "🙅🏼", "🙅🏽", "🙅🏾", "🙅🏿"],
        version: "1.0"
    }, {
        emoji: "🙅‍♂️",
        category: 1,
        name: "man gesturing NO",
        variations: ["🙅🏻‍♂️", "🙅🏼‍♂️", "🙅🏽‍♂️", "🙅🏾‍♂️", "🙅🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🙅‍♀️",
        category: 1,
        name: "woman gesturing NO",
        variations: ["🙅🏻‍♀️", "🙅🏼‍♀️", "🙅🏽‍♀️", "🙅🏾‍♀️", "🙅🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🙆",
        category: 1,
        name: "person gesturing OK",
        variations: ["🙆🏻", "🙆🏼", "🙆🏽", "🙆🏾", "🙆🏿"],
        version: "1.0"
    }, {
        emoji: "🙆‍♂️",
        category: 1,
        name: "man gesturing OK",
        variations: ["🙆🏻‍♂️", "🙆🏼‍♂️", "🙆🏽‍♂️", "🙆🏾‍♂️", "🙆🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🙆‍♀️",
        category: 1,
        name: "woman gesturing OK",
        variations: ["🙆🏻‍♀️", "🙆🏼‍♀️", "🙆🏽‍♀️", "🙆🏾‍♀️", "🙆🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "💁",
        category: 1,
        name: "person tipping hand",
        variations: ["💁🏻", "💁🏼", "💁🏽", "💁🏾", "💁🏿"],
        version: "1.0"
    }, {
        emoji: "💁‍♂️",
        category: 1,
        name: "man tipping hand",
        variations: ["💁🏻‍♂️", "💁🏼‍♂️", "💁🏽‍♂️", "💁🏾‍♂️", "💁🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "💁‍♀️",
        category: 1,
        name: "woman tipping hand",
        variations: ["💁🏻‍♀️", "💁🏼‍♀️", "💁🏽‍♀️", "💁🏾‍♀️", "💁🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🙋",
        category: 1,
        name: "person raising hand",
        variations: ["🙋🏻", "🙋🏼", "🙋🏽", "🙋🏾", "🙋🏿"],
        version: "1.0"
    }, {
        emoji: "🙋‍♂️",
        category: 1,
        name: "man raising hand",
        variations: ["🙋🏻‍♂️", "🙋🏼‍♂️", "🙋🏽‍♂️", "🙋🏾‍♂️", "🙋🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🙋‍♀️",
        category: 1,
        name: "woman raising hand",
        variations: ["🙋🏻‍♀️", "🙋🏼‍♀️", "🙋🏽‍♀️", "🙋🏾‍♀️", "🙋🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🧏",
        category: 1,
        name: "deaf person",
        variations: ["🧏🏻", "🧏🏼", "🧏🏽", "🧏🏾", "🧏🏿"],
        version: "12.0"
    }, {
        emoji: "🧏‍♂️",
        category: 1,
        name: "deaf man",
        variations: ["🧏🏻‍♂️", "🧏🏼‍♂️", "🧏🏽‍♂️", "🧏🏾‍♂️", "🧏🏿‍♂️"],
        version: "12.0"
    }, {
        emoji: "🧏‍♀️",
        category: 1,
        name: "deaf woman",
        variations: ["🧏🏻‍♀️", "🧏🏼‍♀️", "🧏🏽‍♀️", "🧏🏾‍♀️", "🧏🏿‍♀️"],
        version: "12.0"
    }, {
        emoji: "🙇",
        category: 1,
        name: "person bowing",
        variations: ["🙇🏻", "🙇🏼", "🙇🏽", "🙇🏾", "🙇🏿"],
        version: "1.0"
    }, {
        emoji: "🙇‍♂️",
        category: 1,
        name: "man bowing",
        variations: ["🙇🏻‍♂️", "🙇🏼‍♂️", "🙇🏽‍♂️", "🙇🏾‍♂️", "🙇🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🙇‍♀️",
        category: 1,
        name: "woman bowing",
        variations: ["🙇🏻‍♀️", "🙇🏼‍♀️", "🙇🏽‍♀️", "🙇🏾‍♀️", "🙇🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🤦",
        category: 1,
        name: "person facepalming",
        variations: ["🤦🏻", "🤦🏼", "🤦🏽", "🤦🏾", "🤦🏿"],
        version: "3.0"
    }, {
        emoji: "🤦‍♂️",
        category: 1,
        name: "man facepalming",
        variations: ["🤦🏻‍♂️", "🤦🏼‍♂️", "🤦🏽‍♂️", "🤦🏾‍♂️", "🤦🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🤦‍♀️",
        category: 1,
        name: "woman facepalming",
        variations: ["🤦🏻‍♀️", "🤦🏼‍♀️", "🤦🏽‍♀️", "🤦🏾‍♀️", "🤦🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🤷",
        category: 1,
        name: "person shrugging",
        variations: ["🤷🏻", "🤷🏼", "🤷🏽", "🤷🏾", "🤷🏿"],
        version: "3.0"
    }, {
        emoji: "🤷‍♂️",
        category: 1,
        name: "man shrugging",
        variations: ["🤷🏻‍♂️", "🤷🏼‍♂️", "🤷🏽‍♂️", "🤷🏾‍♂️", "🤷🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🤷‍♀️",
        category: 1,
        name: "woman shrugging",
        variations: ["🤷🏻‍♀️", "🤷🏼‍♀️", "🤷🏽‍♀️", "🤷🏾‍♀️", "🤷🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🧑‍⚕️",
        category: 1,
        name: "health worker",
        variations: ["🧑🏻‍⚕️", "🧑🏼‍⚕️", "🧑🏽‍⚕️", "🧑🏾‍⚕️", "🧑🏿‍⚕️"],
        version: "12.1"
    }, {
        emoji: "👨‍⚕️",
        category: 1,
        name: "man health worker",
        variations: ["👨🏻‍⚕️", "👨🏼‍⚕️", "👨🏽‍⚕️", "👨🏾‍⚕️", "👨🏿‍⚕️"],
        version: "4.0"
    }, {
        emoji: "👩‍⚕️",
        category: 1,
        name: "woman health worker",
        variations: ["👩🏻‍⚕️", "👩🏼‍⚕️", "👩🏽‍⚕️", "👩🏾‍⚕️", "👩🏿‍⚕️"],
        version: "4.0"
    }, {
        emoji: "🧑‍🎓",
        category: 1,
        name: "student",
        variations: ["🧑🏻‍🎓", "🧑🏼‍🎓", "🧑🏽‍🎓", "🧑🏾‍🎓", "🧑🏿‍🎓"],
        version: "12.1"
    }, {
        emoji: "👨‍🎓",
        category: 1,
        name: "man student",
        variations: ["👨🏻‍🎓", "👨🏼‍🎓", "👨🏽‍🎓", "👨🏾‍🎓", "👨🏿‍🎓"],
        version: "4.0"
    }, {
        emoji: "👩‍🎓",
        category: 1,
        name: "woman student",
        variations: ["👩🏻‍🎓", "👩🏼‍🎓", "👩🏽‍🎓", "👩🏾‍🎓", "👩🏿‍🎓"],
        version: "4.0"
    }, {
        emoji: "🧑‍🏫",
        category: 1,
        name: "teacher",
        variations: ["🧑🏻‍🏫", "🧑🏼‍🏫", "🧑🏽‍🏫", "🧑🏾‍🏫", "🧑🏿‍🏫"],
        version: "12.1"
    }, {
        emoji: "👨‍🏫",
        category: 1,
        name: "man teacher",
        variations: ["👨🏻‍🏫", "👨🏼‍🏫", "👨🏽‍🏫", "👨🏾‍🏫", "👨🏿‍🏫"],
        version: "4.0"
    }, {
        emoji: "👩‍🏫",
        category: 1,
        name: "woman teacher",
        variations: ["👩🏻‍🏫", "👩🏼‍🏫", "👩🏽‍🏫", "👩🏾‍🏫", "👩🏿‍🏫"],
        version: "4.0"
    }, {
        emoji: "🧑‍⚖️",
        category: 1,
        name: "judge",
        variations: ["🧑🏻‍⚖️", "🧑🏼‍⚖️", "🧑🏽‍⚖️", "🧑🏾‍⚖️", "🧑🏿‍⚖️"],
        version: "12.1"
    }, {
        emoji: "👨‍⚖️",
        category: 1,
        name: "man judge",
        variations: ["👨🏻‍⚖️", "👨🏼‍⚖️", "👨🏽‍⚖️", "👨🏾‍⚖️", "👨🏿‍⚖️"],
        version: "4.0"
    }, {
        emoji: "👩‍⚖️",
        category: 1,
        name: "woman judge",
        variations: ["👩🏻‍⚖️", "👩🏼‍⚖️", "👩🏽‍⚖️", "👩🏾‍⚖️", "👩🏿‍⚖️"],
        version: "4.0"
    }, {
        emoji: "🧑‍🌾",
        category: 1,
        name: "farmer",
        variations: ["🧑🏻‍🌾", "🧑🏼‍🌾", "🧑🏽‍🌾", "🧑🏾‍🌾", "🧑🏿‍🌾"],
        version: "12.1"
    }, {
        emoji: "👨‍🌾",
        category: 1,
        name: "man farmer",
        variations: ["👨🏻‍🌾", "👨🏼‍🌾", "👨🏽‍🌾", "👨🏾‍🌾", "👨🏿‍🌾"],
        version: "4.0"
    }, {
        emoji: "👩‍🌾",
        category: 1,
        name: "woman farmer",
        variations: ["👩🏻‍🌾", "👩🏼‍🌾", "👩🏽‍🌾", "👩🏾‍🌾", "👩🏿‍🌾"],
        version: "4.0"
    }, {
        emoji: "🧑‍🍳",
        category: 1,
        name: "cook",
        variations: ["🧑🏻‍🍳", "🧑🏼‍🍳", "🧑🏽‍🍳", "🧑🏾‍🍳", "🧑🏿‍🍳"],
        version: "12.1"
    }, {
        emoji: "👨‍🍳",
        category: 1,
        name: "man cook",
        variations: ["👨🏻‍🍳", "👨🏼‍🍳", "👨🏽‍🍳", "👨🏾‍🍳", "👨🏿‍🍳"],
        version: "4.0"
    }, {
        emoji: "👩‍🍳",
        category: 1,
        name: "woman cook",
        variations: ["👩🏻‍🍳", "👩🏼‍🍳", "👩🏽‍🍳", "👩🏾‍🍳", "👩🏿‍🍳"],
        version: "4.0"
    }, {
        emoji: "🧑‍🔧",
        category: 1,
        name: "mechanic",
        variations: ["🧑🏻‍🔧", "🧑🏼‍🔧", "🧑🏽‍🔧", "🧑🏾‍🔧", "🧑🏿‍🔧"],
        version: "12.1"
    }, {
        emoji: "👨‍🔧",
        category: 1,
        name: "man mechanic",
        variations: ["👨🏻‍🔧", "👨🏼‍🔧", "👨🏽‍🔧", "👨🏾‍🔧", "👨🏿‍🔧"],
        version: "4.0"
    }, {
        emoji: "👩‍🔧",
        category: 1,
        name: "woman mechanic",
        variations: ["👩🏻‍🔧", "👩🏼‍🔧", "👩🏽‍🔧", "👩🏾‍🔧", "👩🏿‍🔧"],
        version: "4.0"
    }, {
        emoji: "🧑‍🏭",
        category: 1,
        name: "factory worker",
        variations: ["🧑🏻‍🏭", "🧑🏼‍🏭", "🧑🏽‍🏭", "🧑🏾‍🏭", "🧑🏿‍🏭"],
        version: "12.1"
    }, {
        emoji: "👨‍🏭",
        category: 1,
        name: "man factory worker",
        variations: ["👨🏻‍🏭", "👨🏼‍🏭", "👨🏽‍🏭", "👨🏾‍🏭", "👨🏿‍🏭"],
        version: "4.0"
    }, {
        emoji: "👩‍🏭",
        category: 1,
        name: "woman factory worker",
        variations: ["👩🏻‍🏭", "👩🏼‍🏭", "👩🏽‍🏭", "👩🏾‍🏭", "👩🏿‍🏭"],
        version: "4.0"
    }, {
        emoji: "🧑‍💼",
        category: 1,
        name: "office worker",
        variations: ["🧑🏻‍💼", "🧑🏼‍💼", "🧑🏽‍💼", "🧑🏾‍💼", "🧑🏿‍💼"],
        version: "12.1"
    }, {
        emoji: "👨‍💼",
        category: 1,
        name: "man office worker",
        variations: ["👨🏻‍💼", "👨🏼‍💼", "👨🏽‍💼", "👨🏾‍💼", "👨🏿‍💼"],
        version: "4.0"
    }, {
        emoji: "👩‍💼",
        category: 1,
        name: "woman office worker",
        variations: ["👩🏻‍💼", "👩🏼‍💼", "👩🏽‍💼", "👩🏾‍💼", "👩🏿‍💼"],
        version: "4.0"
    }, {
        emoji: "🧑‍🔬",
        category: 1,
        name: "scientist",
        variations: ["🧑🏻‍🔬", "🧑🏼‍🔬", "🧑🏽‍🔬", "🧑🏾‍🔬", "🧑🏿‍🔬"],
        version: "12.1"
    }, {
        emoji: "👨‍🔬",
        category: 1,
        name: "man scientist",
        variations: ["👨🏻‍🔬", "👨🏼‍🔬", "👨🏽‍🔬", "👨🏾‍🔬", "👨🏿‍🔬"],
        version: "4.0"
    }, {
        emoji: "👩‍🔬",
        category: 1,
        name: "woman scientist",
        variations: ["👩🏻‍🔬", "👩🏼‍🔬", "👩🏽‍🔬", "👩🏾‍🔬", "👩🏿‍🔬"],
        version: "4.0"
    }, {
        emoji: "🧑‍💻",
        category: 1,
        name: "technologist",
        variations: ["🧑🏻‍💻", "🧑🏼‍💻", "🧑🏽‍💻", "🧑🏾‍💻", "🧑🏿‍💻"],
        version: "12.1"
    }, {
        emoji: "👨‍💻",
        category: 1,
        name: "man technologist",
        variations: ["👨🏻‍💻", "👨🏼‍💻", "👨🏽‍💻", "👨🏾‍💻", "👨🏿‍💻"],
        version: "4.0"
    }, {
        emoji: "👩‍💻",
        category: 1,
        name: "woman technologist",
        variations: ["👩🏻‍💻", "👩🏼‍💻", "👩🏽‍💻", "👩🏾‍💻", "👩🏿‍💻"],
        version: "4.0"
    }, {
        emoji: "🧑‍🎤",
        category: 1,
        name: "singer",
        variations: ["🧑🏻‍🎤", "🧑🏼‍🎤", "🧑🏽‍🎤", "🧑🏾‍🎤", "🧑🏿‍🎤"],
        version: "12.1"
    }, {
        emoji: "👨‍🎤",
        category: 1,
        name: "man singer",
        variations: ["👨🏻‍🎤", "👨🏼‍🎤", "👨🏽‍🎤", "👨🏾‍🎤", "👨🏿‍🎤"],
        version: "4.0"
    }, {
        emoji: "👩‍🎤",
        category: 1,
        name: "woman singer",
        variations: ["👩🏻‍🎤", "👩🏼‍🎤", "👩🏽‍🎤", "👩🏾‍🎤", "👩🏿‍🎤"],
        version: "4.0"
    }, {
        emoji: "🧑‍🎨",
        category: 1,
        name: "artist",
        variations: ["🧑🏻‍🎨", "🧑🏼‍🎨", "🧑🏽‍🎨", "🧑🏾‍🎨", "🧑🏿‍🎨"],
        version: "12.1"
    }, {
        emoji: "👨‍🎨",
        category: 1,
        name: "man artist",
        variations: ["👨🏻‍🎨", "👨🏼‍🎨", "👨🏽‍🎨", "👨🏾‍🎨", "👨🏿‍🎨"],
        version: "4.0"
    }, {
        emoji: "👩‍🎨",
        category: 1,
        name: "woman artist",
        variations: ["👩🏻‍🎨", "👩🏼‍🎨", "👩🏽‍🎨", "👩🏾‍🎨", "👩🏿‍🎨"],
        version: "4.0"
    }, {
        emoji: "🧑‍✈️",
        category: 1,
        name: "pilot",
        variations: ["🧑🏻‍✈️", "🧑🏼‍✈️", "🧑🏽‍✈️", "🧑🏾‍✈️", "🧑🏿‍✈️"],
        version: "12.1"
    }, {
        emoji: "👨‍✈️",
        category: 1,
        name: "man pilot",
        variations: ["👨🏻‍✈️", "👨🏼‍✈️", "👨🏽‍✈️", "👨🏾‍✈️", "👨🏿‍✈️"],
        version: "4.0"
    }, {
        emoji: "👩‍✈️",
        category: 1,
        name: "woman pilot",
        variations: ["👩🏻‍✈️", "👩🏼‍✈️", "👩🏽‍✈️", "👩🏾‍✈️", "👩🏿‍✈️"],
        version: "4.0"
    }, {
        emoji: "🧑‍🚀",
        category: 1,
        name: "astronaut",
        variations: ["🧑🏻‍🚀", "🧑🏼‍🚀", "🧑🏽‍🚀", "🧑🏾‍🚀", "🧑🏿‍🚀"],
        version: "12.1"
    }, {
        emoji: "👨‍🚀",
        category: 1,
        name: "man astronaut",
        variations: ["👨🏻‍🚀", "👨🏼‍🚀", "👨🏽‍🚀", "👨🏾‍🚀", "👨🏿‍🚀"],
        version: "4.0"
    }, {
        emoji: "👩‍🚀",
        category: 1,
        name: "woman astronaut",
        variations: ["👩🏻‍🚀", "👩🏼‍🚀", "👩🏽‍🚀", "👩🏾‍🚀", "👩🏿‍🚀"],
        version: "4.0"
    }, {
        emoji: "🧑‍🚒",
        category: 1,
        name: "firefighter",
        variations: ["🧑🏻‍🚒", "🧑🏼‍🚒", "🧑🏽‍🚒", "🧑🏾‍🚒", "🧑🏿‍🚒"],
        version: "12.1"
    }, {
        emoji: "👨‍🚒",
        category: 1,
        name: "man firefighter",
        variations: ["👨🏻‍🚒", "👨🏼‍🚒", "👨🏽‍🚒", "👨🏾‍🚒", "👨🏿‍🚒"],
        version: "4.0"
    }, {
        emoji: "👩‍🚒",
        category: 1,
        name: "woman firefighter",
        variations: ["👩🏻‍🚒", "👩🏼‍🚒", "👩🏽‍🚒", "👩🏾‍🚒", "👩🏿‍🚒"],
        version: "4.0"
    }, {
        emoji: "👮",
        category: 1,
        name: "police officer",
        variations: ["👮🏻", "👮🏼", "👮🏽", "👮🏾", "👮🏿"],
        version: "1.0"
    }, {
        emoji: "👮‍♂️",
        category: 1,
        name: "man police officer",
        variations: ["👮🏻‍♂️", "👮🏼‍♂️", "👮🏽‍♂️", "👮🏾‍♂️", "👮🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "👮‍♀️",
        category: 1,
        name: "woman police officer",
        variations: ["👮🏻‍♀️", "👮🏼‍♀️", "👮🏽‍♀️", "👮🏾‍♀️", "👮🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🕵️",
        category: 1,
        name: "detective",
        variations: ["🕵🏻", "🕵🏼", "🕵🏽", "🕵🏾", "🕵🏿"],
        version: "1.0"
    }, {
        emoji: "🕵️‍♂️",
        category: 1,
        name: "man detective",
        variations: ["🕵🏻‍♂️", "🕵🏼‍♂️", "🕵🏽‍♂️", "🕵🏾‍♂️", "🕵🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🕵️‍♀️",
        category: 1,
        name: "woman detective",
        variations: ["🕵🏻‍♀️", "🕵🏼‍♀️", "🕵🏽‍♀️", "🕵🏾‍♀️", "🕵🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "💂",
        category: 1,
        name: "guard",
        variations: ["💂🏻", "💂🏼", "💂🏽", "💂🏾", "💂🏿"],
        version: "1.0"
    }, {
        emoji: "💂‍♂️",
        category: 1,
        name: "man guard",
        variations: ["💂🏻‍♂️", "💂🏼‍♂️", "💂🏽‍♂️", "💂🏾‍♂️", "💂🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "💂‍♀️",
        category: 1,
        name: "woman guard",
        variations: ["💂🏻‍♀️", "💂🏼‍♀️", "💂🏽‍♀️", "💂🏾‍♀️", "💂🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🥷",
        category: 1,
        name: "ninja",
        variations: ["🥷🏻", "🥷🏼", "🥷🏽", "🥷🏾", "🥷🏿"],
        version: "13.0"
    }, {
        emoji: "👷",
        category: 1,
        name: "construction worker",
        variations: ["👷🏻", "👷🏼", "👷🏽", "👷🏾", "👷🏿"],
        version: "1.0"
    }, {
        emoji: "👷‍♂️",
        category: 1,
        name: "man construction worker",
        variations: ["👷🏻‍♂️", "👷🏼‍♂️", "👷🏽‍♂️", "👷🏾‍♂️", "👷🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "👷‍♀️",
        category: 1,
        name: "woman construction worker",
        variations: ["👷🏻‍♀️", "👷🏼‍♀️", "👷🏽‍♀️", "👷🏾‍♀️", "👷🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🤴",
        category: 1,
        name: "prince",
        variations: ["🤴🏻", "🤴🏼", "🤴🏽", "🤴🏾", "🤴🏿"],
        version: "3.0"
    }, {
        emoji: "👸",
        category: 1,
        name: "princess",
        variations: ["👸🏻", "👸🏼", "👸🏽", "👸🏾", "👸🏿"],
        version: "1.0"
    }, {
        emoji: "👳",
        category: 1,
        name: "person wearing turban",
        variations: ["👳🏻", "👳🏼", "👳🏽", "👳🏾", "👳🏿"],
        version: "1.0"
    }, {
        emoji: "👳‍♂️",
        category: 1,
        name: "man wearing turban",
        variations: ["👳🏻‍♂️", "👳🏼‍♂️", "👳🏽‍♂️", "👳🏾‍♂️", "👳🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "👳‍♀️",
        category: 1,
        name: "woman wearing turban",
        variations: ["👳🏻‍♀️", "👳🏼‍♀️", "👳🏽‍♀️", "👳🏾‍♀️", "👳🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "👲",
        category: 1,
        name: "person with skullcap",
        variations: ["👲🏻", "👲🏼", "👲🏽", "👲🏾", "👲🏿"],
        version: "1.0"
    }, {
        emoji: "🧕",
        category: 1,
        name: "woman with headscarf",
        variations: ["🧕🏻", "🧕🏼", "🧕🏽", "🧕🏾", "🧕🏿"],
        version: "5.0"
    }, {
        emoji: "🤵",
        category: 1,
        name: "person in tuxedo",
        variations: ["🤵🏻", "🤵🏼", "🤵🏽", "🤵🏾", "🤵🏿"],
        version: "3.0"
    }, {
        emoji: "🤵‍♂️",
        category: 1,
        name: "man in tuxedo",
        variations: ["🤵🏻‍♂️", "🤵🏼‍♂️", "🤵🏽‍♂️", "🤵🏾‍♂️", "🤵🏿‍♂️"],
        version: "13.0"
    }, {
        emoji: "🤵‍♀️",
        category: 1,
        name: "woman in tuxedo",
        variations: ["🤵🏻‍♀️", "🤵🏼‍♀️", "🤵🏽‍♀️", "🤵🏾‍♀️", "🤵🏿‍♀️"],
        version: "13.0"
    }, {
        emoji: "👰",
        category: 1,
        name: "person with veil",
        variations: ["👰🏻", "👰🏼", "👰🏽", "👰🏾", "👰🏿"],
        version: "1.0"
    }, {
        emoji: "👰‍♂️",
        category: 1,
        name: "man with veil",
        variations: ["👰🏻‍♂️", "👰🏼‍♂️", "👰🏽‍♂️", "👰🏾‍♂️", "👰🏿‍♂️"],
        version: "13.0"
    }, {
        emoji: "👰‍♀️",
        category: 1,
        name: "woman with veil",
        variations: ["👰🏻‍♀️", "👰🏼‍♀️", "👰🏽‍♀️", "👰🏾‍♀️", "👰🏿‍♀️"],
        version: "13.0"
    }, {
        emoji: "🤰",
        category: 1,
        name: "pregnant woman",
        variations: ["🤰🏻", "🤰🏼", "🤰🏽", "🤰🏾", "🤰🏿"],
        version: "3.0"
    }, {
        emoji: "🤱",
        category: 1,
        name: "breast-feeding",
        variations: ["🤱🏻", "🤱🏼", "🤱🏽", "🤱🏾", "🤱🏿"],
        version: "5.0"
    }, {
        emoji: "👩‍🍼",
        category: 1,
        name: "woman feeding baby",
        variations: ["👩🏻‍🍼", "👩🏼‍🍼", "👩🏽‍🍼", "👩🏾‍🍼", "👩🏿‍🍼"],
        version: "13.0"
    }, {
        emoji: "👨‍🍼",
        category: 1,
        name: "man feeding baby",
        variations: ["👨🏻‍🍼", "👨🏼‍🍼", "👨🏽‍🍼", "👨🏾‍🍼", "👨🏿‍🍼"],
        version: "13.0"
    }, {
        emoji: "🧑‍🍼",
        category: 1,
        name: "person feeding baby",
        variations: ["🧑🏻‍🍼", "🧑🏼‍🍼", "🧑🏽‍🍼", "🧑🏾‍🍼", "🧑🏿‍🍼"],
        version: "13.0"
    }, {
        emoji: "👼",
        category: 1,
        name: "baby angel",
        variations: ["👼🏻", "👼🏼", "👼🏽", "👼🏾", "👼🏿"],
        version: "1.0"
    }, {
        emoji: "🎅",
        category: 1,
        name: "Santa Claus",
        variations: ["🎅🏻", "🎅🏼", "🎅🏽", "🎅🏾", "🎅🏿"],
        version: "1.0"
    }, {
        emoji: "🤶",
        category: 1,
        name: "Mrs. Claus",
        variations: ["🤶🏻", "🤶🏼", "🤶🏽", "🤶🏾", "🤶🏿"],
        version: "3.0"
    }, {
        emoji: "🧑‍🎄",
        category: 1,
        name: "mx claus",
        variations: ["🧑🏻‍🎄", "🧑🏼‍🎄", "🧑🏽‍🎄", "🧑🏾‍🎄", "🧑🏿‍🎄"],
        version: "13.0"
    }, {
        emoji: "🦸",
        category: 1,
        name: "superhero",
        variations: ["🦸🏻", "🦸🏼", "🦸🏽", "🦸🏾", "🦸🏿"],
        version: "11.0"
    }, {
        emoji: "🦸‍♂️",
        category: 1,
        name: "man superhero",
        variations: ["🦸🏻‍♂️", "🦸🏼‍♂️", "🦸🏽‍♂️", "🦸🏾‍♂️", "🦸🏿‍♂️"],
        version: "11.0"
    }, {
        emoji: "🦸‍♀️",
        category: 1,
        name: "woman superhero",
        variations: ["🦸🏻‍♀️", "🦸🏼‍♀️", "🦸🏽‍♀️", "🦸🏾‍♀️", "🦸🏿‍♀️"],
        version: "11.0"
    }, {
        emoji: "🦹",
        category: 1,
        name: "supervillain",
        variations: ["🦹🏻", "🦹🏼", "🦹🏽", "🦹🏾", "🦹🏿"],
        version: "11.0"
    }, {
        emoji: "🦹‍♂️",
        category: 1,
        name: "man supervillain",
        variations: ["🦹🏻‍♂️", "🦹🏼‍♂️", "🦹🏽‍♂️", "🦹🏾‍♂️", "🦹🏿‍♂️"],
        version: "11.0"
    }, {
        emoji: "🦹‍♀️",
        category: 1,
        name: "woman supervillain",
        variations: ["🦹🏻‍♀️", "🦹🏼‍♀️", "🦹🏽‍♀️", "🦹🏾‍♀️", "🦹🏿‍♀️"],
        version: "11.0"
    }, {
        emoji: "🧙",
        category: 1,
        name: "mage",
        variations: ["🧙🏻", "🧙🏼", "🧙🏽", "🧙🏾", "🧙🏿"],
        version: "5.0"
    }, {
        emoji: "🧙‍♂️",
        category: 1,
        name: "man mage",
        variations: ["🧙🏻‍♂️", "🧙🏼‍♂️", "🧙🏽‍♂️", "🧙🏾‍♂️", "🧙🏿‍♂️"],
        version: "5.0"
    }, {
        emoji: "🧙‍♀️",
        category: 1,
        name: "woman mage",
        variations: ["🧙🏻‍♀️", "🧙🏼‍♀️", "🧙🏽‍♀️", "🧙🏾‍♀️", "🧙🏿‍♀️"],
        version: "5.0"
    }, {
        emoji: "🧚",
        category: 1,
        name: "fairy",
        variations: ["🧚🏻", "🧚🏼", "🧚🏽", "🧚🏾", "🧚🏿"],
        version: "5.0"
    }, {
        emoji: "🧚‍♂️",
        category: 1,
        name: "man fairy",
        variations: ["🧚🏻‍♂️", "🧚🏼‍♂️", "🧚🏽‍♂️", "🧚🏾‍♂️", "🧚🏿‍♂️"],
        version: "5.0"
    }, {
        emoji: "🧚‍♀️",
        category: 1,
        name: "woman fairy",
        variations: ["🧚🏻‍♀️", "🧚🏼‍♀️", "🧚🏽‍♀️", "🧚🏾‍♀️", "🧚🏿‍♀️"],
        version: "5.0"
    }, {
        emoji: "🧛",
        category: 1,
        name: "vampire",
        variations: ["🧛🏻", "🧛🏼", "🧛🏽", "🧛🏾", "🧛🏿"],
        version: "5.0"
    }, {
        emoji: "🧛‍♂️",
        category: 1,
        name: "man vampire",
        variations: ["🧛🏻‍♂️", "🧛🏼‍♂️", "🧛🏽‍♂️", "🧛🏾‍♂️", "🧛🏿‍♂️"],
        version: "5.0"
    }, {
        emoji: "🧛‍♀️",
        category: 1,
        name: "woman vampire",
        variations: ["🧛🏻‍♀️", "🧛🏼‍♀️", "🧛🏽‍♀️", "🧛🏾‍♀️", "🧛🏿‍♀️"],
        version: "5.0"
    }, {
        emoji: "🧜",
        category: 1,
        name: "merperson",
        variations: ["🧜🏻", "🧜🏼", "🧜🏽", "🧜🏾", "🧜🏿"],
        version: "5.0"
    }, {
        emoji: "🧜‍♂️",
        category: 1,
        name: "merman",
        variations: ["🧜🏻‍♂️", "🧜🏼‍♂️", "🧜🏽‍♂️", "🧜🏾‍♂️", "🧜🏿‍♂️"],
        version: "5.0"
    }, {
        emoji: "🧜‍♀️",
        category: 1,
        name: "mermaid",
        variations: ["🧜🏻‍♀️", "🧜🏼‍♀️", "🧜🏽‍♀️", "🧜🏾‍♀️", "🧜🏿‍♀️"],
        version: "5.0"
    }, {
        emoji: "🧝",
        category: 1,
        name: "elf",
        variations: ["🧝🏻", "🧝🏼", "🧝🏽", "🧝🏾", "🧝🏿"],
        version: "5.0"
    }, {
        emoji: "🧝‍♂️",
        category: 1,
        name: "man elf",
        variations: ["🧝🏻‍♂️", "🧝🏼‍♂️", "🧝🏽‍♂️", "🧝🏾‍♂️", "🧝🏿‍♂️"],
        version: "5.0"
    }, {
        emoji: "🧝‍♀️",
        category: 1,
        name: "woman elf",
        variations: ["🧝🏻‍♀️", "🧝🏼‍♀️", "🧝🏽‍♀️", "🧝🏾‍♀️", "🧝🏿‍♀️"],
        version: "5.0"
    }, {
        emoji: "🧞",
        category: 1,
        name: "genie",
        version: "5.0"
    }, {
        emoji: "🧞‍♂️",
        category: 1,
        name: "man genie",
        version: "5.0"
    }, {
        emoji: "🧞‍♀️",
        category: 1,
        name: "woman genie",
        version: "5.0"
    }, {
        emoji: "🧟",
        category: 1,
        name: "zombie",
        version: "5.0"
    }, {
        emoji: "🧟‍♂️",
        category: 1,
        name: "man zombie",
        version: "5.0"
    }, {
        emoji: "🧟‍♀️",
        category: 1,
        name: "woman zombie",
        version: "5.0"
    }, {
        emoji: "💆",
        category: 1,
        name: "person getting massage",
        variations: ["💆🏻", "💆🏼", "💆🏽", "💆🏾", "💆🏿"],
        version: "1.0"
    }, {
        emoji: "💆‍♂️",
        category: 1,
        name: "man getting massage",
        variations: ["💆🏻‍♂️", "💆🏼‍♂️", "💆🏽‍♂️", "💆🏾‍♂️", "💆🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "💆‍♀️",
        category: 1,
        name: "woman getting massage",
        variations: ["💆🏻‍♀️", "💆🏼‍♀️", "💆🏽‍♀️", "💆🏾‍♀️", "💆🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "💇",
        category: 1,
        name: "person getting haircut",
        variations: ["💇🏻", "💇🏼", "💇🏽", "💇🏾", "💇🏿"],
        version: "1.0"
    }, {
        emoji: "💇‍♂️",
        category: 1,
        name: "man getting haircut",
        variations: ["💇🏻‍♂️", "💇🏼‍♂️", "💇🏽‍♂️", "💇🏾‍♂️", "💇🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "💇‍♀️",
        category: 1,
        name: "woman getting haircut",
        variations: ["💇🏻‍♀️", "💇🏼‍♀️", "💇🏽‍♀️", "💇🏾‍♀️", "💇🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🚶",
        category: 1,
        name: "person walking",
        variations: ["🚶🏻", "🚶🏼", "🚶🏽", "🚶🏾", "🚶🏿"],
        version: "1.0"
    }, {
        emoji: "🚶‍♂️",
        category: 1,
        name: "man walking",
        variations: ["🚶🏻‍♂️", "🚶🏼‍♂️", "🚶🏽‍♂️", "🚶🏾‍♂️", "🚶🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🚶‍♀️",
        category: 1,
        name: "woman walking",
        variations: ["🚶🏻‍♀️", "🚶🏼‍♀️", "🚶🏽‍♀️", "🚶🏾‍♀️", "🚶🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🧍",
        category: 1,
        name: "person standing",
        variations: ["🧍🏻", "🧍🏼", "🧍🏽", "🧍🏾", "🧍🏿"],
        version: "12.0"
    }, {
        emoji: "🧍‍♂️",
        category: 1,
        name: "man standing",
        variations: ["🧍🏻‍♂️", "🧍🏼‍♂️", "🧍🏽‍♂️", "🧍🏾‍♂️", "🧍🏿‍♂️"],
        version: "12.0"
    }, {
        emoji: "🧍‍♀️",
        category: 1,
        name: "woman standing",
        variations: ["🧍🏻‍♀️", "🧍🏼‍♀️", "🧍🏽‍♀️", "🧍🏾‍♀️", "🧍🏿‍♀️"],
        version: "12.0"
    }, {
        emoji: "🧎",
        category: 1,
        name: "person kneeling",
        variations: ["🧎🏻", "🧎🏼", "🧎🏽", "🧎🏾", "🧎🏿"],
        version: "12.0"
    }, {
        emoji: "🧎‍♂️",
        category: 1,
        name: "man kneeling",
        variations: ["🧎🏻‍♂️", "🧎🏼‍♂️", "🧎🏽‍♂️", "🧎🏾‍♂️", "🧎🏿‍♂️"],
        version: "12.0"
    }, {
        emoji: "🧎‍♀️",
        category: 1,
        name: "woman kneeling",
        variations: ["🧎🏻‍♀️", "🧎🏼‍♀️", "🧎🏽‍♀️", "🧎🏾‍♀️", "🧎🏿‍♀️"],
        version: "12.0"
    }, {
        emoji: "🧑‍🦯",
        category: 1,
        name: "person with white cane",
        variations: ["🧑🏻‍🦯", "🧑🏼‍🦯", "🧑🏽‍🦯", "🧑🏾‍🦯", "🧑🏿‍🦯"],
        version: "12.1"
    }, {
        emoji: "👨‍🦯",
        category: 1,
        name: "man with white cane",
        variations: ["👨🏻‍🦯", "👨🏼‍🦯", "👨🏽‍🦯", "👨🏾‍🦯", "👨🏿‍🦯"],
        version: "12.0"
    }, {
        emoji: "👩‍🦯",
        category: 1,
        name: "woman with white cane",
        variations: ["👩🏻‍🦯", "👩🏼‍🦯", "👩🏽‍🦯", "👩🏾‍🦯", "👩🏿‍🦯"],
        version: "12.0"
    }, {
        emoji: "🧑‍🦼",
        category: 1,
        name: "person in motorized wheelchair",
        variations: ["🧑🏻‍🦼", "🧑🏼‍🦼", "🧑🏽‍🦼", "🧑🏾‍🦼", "🧑🏿‍🦼"],
        version: "12.1"
    }, {
        emoji: "👨‍🦼",
        category: 1,
        name: "man in motorized wheelchair",
        variations: ["👨🏻‍🦼", "👨🏼‍🦼", "👨🏽‍🦼", "👨🏾‍🦼", "👨🏿‍🦼"],
        version: "12.0"
    }, {
        emoji: "👩‍🦼",
        category: 1,
        name: "woman in motorized wheelchair",
        variations: ["👩🏻‍🦼", "👩🏼‍🦼", "👩🏽‍🦼", "👩🏾‍🦼", "👩🏿‍🦼"],
        version: "12.0"
    }, {
        emoji: "🧑‍🦽",
        category: 1,
        name: "person in manual wheelchair",
        variations: ["🧑🏻‍🦽", "🧑🏼‍🦽", "🧑🏽‍🦽", "🧑🏾‍🦽", "🧑🏿‍🦽"],
        version: "12.1"
    }, {
        emoji: "👨‍🦽",
        category: 1,
        name: "man in manual wheelchair",
        variations: ["👨🏻‍🦽", "👨🏼‍🦽", "👨🏽‍🦽", "👨🏾‍🦽", "👨🏿‍🦽"],
        version: "12.0"
    }, {
        emoji: "👩‍🦽",
        category: 1,
        name: "woman in manual wheelchair",
        variations: ["👩🏻‍🦽", "👩🏼‍🦽", "👩🏽‍🦽", "👩🏾‍🦽", "👩🏿‍🦽"],
        version: "12.0"
    }, {
        emoji: "🏃",
        category: 1,
        name: "person running",
        variations: ["🏃🏻", "🏃🏼", "🏃🏽", "🏃🏾", "🏃🏿"],
        version: "1.0"
    }, {
        emoji: "🏃‍♂️",
        category: 1,
        name: "man running",
        variations: ["🏃🏻‍♂️", "🏃🏼‍♂️", "🏃🏽‍♂️", "🏃🏾‍♂️", "🏃🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🏃‍♀️",
        category: 1,
        name: "woman running",
        variations: ["🏃🏻‍♀️", "🏃🏼‍♀️", "🏃🏽‍♀️", "🏃🏾‍♀️", "🏃🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "💃",
        category: 1,
        name: "woman dancing",
        variations: ["💃🏻", "💃🏼", "💃🏽", "💃🏾", "💃🏿"],
        version: "1.0"
    }, {
        emoji: "🕺",
        category: 1,
        name: "man dancing",
        variations: ["🕺🏻", "🕺🏼", "🕺🏽", "🕺🏾", "🕺🏿"],
        version: "3.0"
    }, {
        emoji: "🕴️",
        category: 1,
        name: "person in suit levitating",
        variations: ["🕴🏻", "🕴🏼", "🕴🏽", "🕴🏾", "🕴🏿"],
        version: "1.0"
    }, {
        emoji: "👯",
        category: 1,
        name: "people with bunny ears",
        version: "1.0"
    }, {
        emoji: "👯‍♂️",
        category: 1,
        name: "men with bunny ears",
        version: "4.0"
    }, {
        emoji: "👯‍♀️",
        category: 1,
        name: "women with bunny ears",
        version: "4.0"
    }, {
        emoji: "🧖",
        category: 1,
        name: "person in steamy room",
        variations: ["🧖🏻", "🧖🏼", "🧖🏽", "🧖🏾", "🧖🏿"],
        version: "5.0"
    }, {
        emoji: "🧖‍♂️",
        category: 1,
        name: "man in steamy room",
        variations: ["🧖🏻‍♂️", "🧖🏼‍♂️", "🧖🏽‍♂️", "🧖🏾‍♂️", "🧖🏿‍♂️"],
        version: "5.0"
    }, {
        emoji: "🧖‍♀️",
        category: 1,
        name: "woman in steamy room",
        variations: ["🧖🏻‍♀️", "🧖🏼‍♀️", "🧖🏽‍♀️", "🧖🏾‍♀️", "🧖🏿‍♀️"],
        version: "5.0"
    }, {
        emoji: "🧗",
        category: 1,
        name: "person climbing",
        variations: ["🧗🏻", "🧗🏼", "🧗🏽", "🧗🏾", "🧗🏿"],
        version: "5.0"
    }, {
        emoji: "🧗‍♂️",
        category: 1,
        name: "man climbing",
        variations: ["🧗🏻‍♂️", "🧗🏼‍♂️", "🧗🏽‍♂️", "🧗🏾‍♂️", "🧗🏿‍♂️"],
        version: "5.0"
    }, {
        emoji: "🧗‍♀️",
        category: 1,
        name: "woman climbing",
        variations: ["🧗🏻‍♀️", "🧗🏼‍♀️", "🧗🏽‍♀️", "🧗🏾‍♀️", "🧗🏿‍♀️"],
        version: "5.0"
    }, {
        emoji: "🤺",
        category: 1,
        name: "person fencing",
        version: "3.0"
    }, {
        emoji: "🏇",
        category: 1,
        name: "horse racing",
        variations: ["🏇🏻", "🏇🏼", "🏇🏽", "🏇🏾", "🏇🏿"],
        version: "1.0"
    }, {
        emoji: "⛷️",
        category: 1,
        name: "skier",
        version: "1.0"
    }, {
        emoji: "🏂",
        category: 1,
        name: "snowboarder",
        variations: ["🏂🏻", "🏂🏼", "🏂🏽", "🏂🏾", "🏂🏿"],
        version: "1.0"
    }, {
        emoji: "🏌️",
        category: 1,
        name: "person golfing",
        variations: ["🏌🏻", "🏌🏼", "🏌🏽", "🏌🏾", "🏌🏿"],
        version: "1.0"
    }, {
        emoji: "🏌️‍♂️",
        category: 1,
        name: "man golfing",
        variations: ["🏌🏻‍♂️", "🏌🏼‍♂️", "🏌🏽‍♂️", "🏌🏾‍♂️", "🏌🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🏌️‍♀️",
        category: 1,
        name: "woman golfing",
        variations: ["🏌🏻‍♀️", "🏌🏼‍♀️", "🏌🏽‍♀️", "🏌🏾‍♀️", "🏌🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🏄",
        category: 1,
        name: "person surfing",
        variations: ["🏄🏻", "🏄🏼", "🏄🏽", "🏄🏾", "🏄🏿"],
        version: "1.0"
    }, {
        emoji: "🏄‍♂️",
        category: 1,
        name: "man surfing",
        variations: ["🏄🏻‍♂️", "🏄🏼‍♂️", "🏄🏽‍♂️", "🏄🏾‍♂️", "🏄🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🏄‍♀️",
        category: 1,
        name: "woman surfing",
        variations: ["🏄🏻‍♀️", "🏄🏼‍♀️", "🏄🏽‍♀️", "🏄🏾‍♀️", "🏄🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🚣",
        category: 1,
        name: "person rowing boat",
        variations: ["🚣🏻", "🚣🏼", "🚣🏽", "🚣🏾", "🚣🏿"],
        version: "1.0"
    }, {
        emoji: "🚣‍♂️",
        category: 1,
        name: "man rowing boat",
        variations: ["🚣🏻‍♂️", "🚣🏼‍♂️", "🚣🏽‍♂️", "🚣🏾‍♂️", "🚣🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🚣‍♀️",
        category: 1,
        name: "woman rowing boat",
        variations: ["🚣🏻‍♀️", "🚣🏼‍♀️", "🚣🏽‍♀️", "🚣🏾‍♀️", "🚣🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🏊",
        category: 1,
        name: "person swimming",
        variations: ["🏊🏻", "🏊🏼", "🏊🏽", "🏊🏾", "🏊🏿"],
        version: "1.0"
    }, {
        emoji: "🏊‍♂️",
        category: 1,
        name: "man swimming",
        variations: ["🏊🏻‍♂️", "🏊🏼‍♂️", "🏊🏽‍♂️", "🏊🏾‍♂️", "🏊🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🏊‍♀️",
        category: 1,
        name: "woman swimming",
        variations: ["🏊🏻‍♀️", "🏊🏼‍♀️", "🏊🏽‍♀️", "🏊🏾‍♀️", "🏊🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "⛹️",
        category: 1,
        name: "person bouncing ball",
        variations: ["⛹🏻", "⛹🏼", "⛹🏽", "⛹🏾", "⛹🏿"],
        version: "1.0"
    }, {
        emoji: "⛹️‍♂️",
        category: 1,
        name: "man bouncing ball",
        variations: ["⛹🏻‍♂️", "⛹🏼‍♂️", "⛹🏽‍♂️", "⛹🏾‍♂️", "⛹🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "⛹️‍♀️",
        category: 1,
        name: "woman bouncing ball",
        variations: ["⛹🏻‍♀️", "⛹🏼‍♀️", "⛹🏽‍♀️", "⛹🏾‍♀️", "⛹🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🏋️",
        category: 1,
        name: "person lifting weights",
        variations: ["🏋🏻", "🏋🏼", "🏋🏽", "🏋🏾", "🏋🏿"],
        version: "1.0"
    }, {
        emoji: "🏋️‍♂️",
        category: 1,
        name: "man lifting weights",
        variations: ["🏋🏻‍♂️", "🏋🏼‍♂️", "🏋🏽‍♂️", "🏋🏾‍♂️", "🏋🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🏋️‍♀️",
        category: 1,
        name: "woman lifting weights",
        variations: ["🏋🏻‍♀️", "🏋🏼‍♀️", "🏋🏽‍♀️", "🏋🏾‍♀️", "🏋🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🚴",
        category: 1,
        name: "person biking",
        variations: ["🚴🏻", "🚴🏼", "🚴🏽", "🚴🏾", "🚴🏿"],
        version: "1.0"
    }, {
        emoji: "🚴‍♂️",
        category: 1,
        name: "man biking",
        variations: ["🚴🏻‍♂️", "🚴🏼‍♂️", "🚴🏽‍♂️", "🚴🏾‍♂️", "🚴🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🚴‍♀️",
        category: 1,
        name: "woman biking",
        variations: ["🚴🏻‍♀️", "🚴🏼‍♀️", "🚴🏽‍♀️", "🚴🏾‍♀️", "🚴🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🚵",
        category: 1,
        name: "person mountain biking",
        variations: ["🚵🏻", "🚵🏼", "🚵🏽", "🚵🏾", "🚵🏿"],
        version: "1.0"
    }, {
        emoji: "🚵‍♂️",
        category: 1,
        name: "man mountain biking",
        variations: ["🚵🏻‍♂️", "🚵🏼‍♂️", "🚵🏽‍♂️", "🚵🏾‍♂️", "🚵🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🚵‍♀️",
        category: 1,
        name: "woman mountain biking",
        variations: ["🚵🏻‍♀️", "🚵🏼‍♀️", "🚵🏽‍♀️", "🚵🏾‍♀️", "🚵🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🤸",
        category: 1,
        name: "person cartwheeling",
        variations: ["🤸🏻", "🤸🏼", "🤸🏽", "🤸🏾", "🤸🏿"],
        version: "3.0"
    }, {
        emoji: "🤸‍♂️",
        category: 1,
        name: "man cartwheeling",
        variations: ["🤸🏻‍♂️", "🤸🏼‍♂️", "🤸🏽‍♂️", "🤸🏾‍♂️", "🤸🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🤸‍♀️",
        category: 1,
        name: "woman cartwheeling",
        variations: ["🤸🏻‍♀️", "🤸🏼‍♀️", "🤸🏽‍♀️", "🤸🏾‍♀️", "🤸🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🤼",
        category: 1,
        name: "people wrestling",
        version: "3.0"
    }, {
        emoji: "🤼‍♂️",
        category: 1,
        name: "men wrestling",
        version: "4.0"
    }, {
        emoji: "🤼‍♀️",
        category: 1,
        name: "women wrestling",
        version: "4.0"
    }, {
        emoji: "🤽",
        category: 1,
        name: "person playing water polo",
        variations: ["🤽🏻", "🤽🏼", "🤽🏽", "🤽🏾", "🤽🏿"],
        version: "3.0"
    }, {
        emoji: "🤽‍♂️",
        category: 1,
        name: "man playing water polo",
        variations: ["🤽🏻‍♂️", "🤽🏼‍♂️", "🤽🏽‍♂️", "🤽🏾‍♂️", "🤽🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🤽‍♀️",
        category: 1,
        name: "woman playing water polo",
        variations: ["🤽🏻‍♀️", "🤽🏼‍♀️", "🤽🏽‍♀️", "🤽🏾‍♀️", "🤽🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🤾",
        category: 1,
        name: "person playing handball",
        variations: ["🤾🏻", "🤾🏼", "🤾🏽", "🤾🏾", "🤾🏿"],
        version: "3.0"
    }, {
        emoji: "🤾‍♂️",
        category: 1,
        name: "man playing handball",
        variations: ["🤾🏻‍♂️", "🤾🏼‍♂️", "🤾🏽‍♂️", "🤾🏾‍♂️", "🤾🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🤾‍♀️",
        category: 1,
        name: "woman playing handball",
        variations: ["🤾🏻‍♀️", "🤾🏼‍♀️", "🤾🏽‍♀️", "🤾🏾‍♀️", "🤾🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🤹",
        category: 1,
        name: "person juggling",
        variations: ["🤹🏻", "🤹🏼", "🤹🏽", "🤹🏾", "🤹🏿"],
        version: "3.0"
    }, {
        emoji: "🤹‍♂️",
        category: 1,
        name: "man juggling",
        variations: ["🤹🏻‍♂️", "🤹🏼‍♂️", "🤹🏽‍♂️", "🤹🏾‍♂️", "🤹🏿‍♂️"],
        version: "4.0"
    }, {
        emoji: "🤹‍♀️",
        category: 1,
        name: "woman juggling",
        variations: ["🤹🏻‍♀️", "🤹🏼‍♀️", "🤹🏽‍♀️", "🤹🏾‍♀️", "🤹🏿‍♀️"],
        version: "4.0"
    }, {
        emoji: "🧘",
        category: 1,
        name: "person in lotus position",
        variations: ["🧘🏻", "🧘🏼", "🧘🏽", "🧘🏾", "🧘🏿"],
        version: "5.0"
    }, {
        emoji: "🧘‍♂️",
        category: 1,
        name: "man in lotus position",
        variations: ["🧘🏻‍♂️", "🧘🏼‍♂️", "🧘🏽‍♂️", "🧘🏾‍♂️", "🧘🏿‍♂️"],
        version: "5.0"
    }, {
        emoji: "🧘‍♀️",
        category: 1,
        name: "woman in lotus position",
        variations: ["🧘🏻‍♀️", "🧘🏼‍♀️", "🧘🏽‍♀️", "🧘🏾‍♀️", "🧘🏿‍♀️"],
        version: "5.0"
    }, {
        emoji: "🛀",
        category: 1,
        name: "person taking bath",
        variations: ["🛀🏻", "🛀🏼", "🛀🏽", "🛀🏾", "🛀🏿"],
        version: "1.0"
    }, {
        emoji: "🛌",
        category: 1,
        name: "person in bed",
        variations: ["🛌🏻", "🛌🏼", "🛌🏽", "🛌🏾", "🛌🏿"],
        version: "1.0"
    }, {
        emoji: "🧑‍🤝‍🧑",
        category: 1,
        name: "people holding hands",
        variations: ["🧑🏻‍🤝‍🧑🏻", "🧑🏻‍🤝‍🧑🏼", "🧑🏻‍🤝‍🧑🏽", "🧑🏻‍🤝‍🧑🏾", "🧑🏻‍🤝‍🧑🏿", "🧑🏼‍🤝‍🧑🏻", "🧑🏼‍🤝‍🧑🏼", "🧑🏼‍🤝‍🧑🏽", "🧑🏼‍🤝‍🧑🏾", "🧑🏼‍🤝‍🧑🏿", "🧑🏽‍🤝‍🧑🏻", "🧑🏽‍🤝‍🧑🏼", "🧑🏽‍🤝‍🧑🏽", "🧑🏽‍🤝‍🧑🏾", "🧑🏽‍🤝‍🧑🏿", "🧑🏾‍🤝‍🧑🏻", "🧑🏾‍🤝‍🧑🏼", "🧑🏾‍🤝‍🧑🏽", "🧑🏾‍🤝‍🧑🏾", "🧑🏾‍🤝‍🧑🏿", "🧑🏿‍🤝‍🧑🏻", "🧑🏿‍🤝‍🧑🏼", "🧑🏿‍🤝‍🧑🏽", "🧑🏿‍🤝‍🧑🏾", "🧑🏿‍🤝‍🧑🏿"],
        version: "12.0"
    }, {
        emoji: "👭",
        category: 1,
        name: "women holding hands",
        variations: ["👭🏻", "👩🏻‍🤝‍👩🏼", "👩🏻‍🤝‍👩🏽", "👩🏻‍🤝‍👩🏾", "👩🏻‍🤝‍👩🏿", "👩🏼‍🤝‍👩🏻", "👭🏼", "👩🏼‍🤝‍👩🏽", "👩🏼‍🤝‍👩🏾", "👩🏼‍🤝‍👩🏿", "👩🏽‍🤝‍👩🏻", "👩🏽‍🤝‍👩🏼", "👭🏽", "👩🏽‍🤝‍👩🏾", "👩🏽‍🤝‍👩🏿", "👩🏾‍🤝‍👩🏻", "👩🏾‍🤝‍👩🏼", "👩🏾‍🤝‍👩🏽", "👭🏾", "👩🏾‍🤝‍👩🏿", "👩🏿‍🤝‍👩🏻", "👩🏿‍🤝‍👩🏼", "👩🏿‍🤝‍👩🏽", "👩🏿‍🤝‍👩🏾", "👭🏿"],
        version: "1.0"
    }, {
        emoji: "👫",
        category: 1,
        name: "woman and man holding hands",
        variations: ["👫🏻", "👩🏻‍🤝‍👨🏼", "👩🏻‍🤝‍👨🏽", "👩🏻‍🤝‍👨🏾", "👩🏻‍🤝‍👨🏿", "👩🏼‍🤝‍👨🏻", "👫🏼", "👩🏼‍🤝‍👨🏽", "👩🏼‍🤝‍👨🏾", "👩🏼‍🤝‍👨🏿", "👩🏽‍🤝‍👨🏻", "👩🏽‍🤝‍👨🏼", "👫🏽", "👩🏽‍🤝‍👨🏾", "👩🏽‍🤝‍👨🏿", "👩🏾‍🤝‍👨🏻", "👩🏾‍🤝‍👨🏼", "👩🏾‍🤝‍👨🏽", "👫🏾", "👩🏾‍🤝‍👨🏿", "👩🏿‍🤝‍👨🏻", "👩🏿‍🤝‍👨🏼", "👩🏿‍🤝‍👨🏽", "👩🏿‍🤝‍👨🏾", "👫🏿"],
        version: "1.0"
    }, {
        emoji: "👬",
        category: 1,
        name: "men holding hands",
        variations: ["👬🏻", "👨🏻‍🤝‍👨🏼", "👨🏻‍🤝‍👨🏽", "👨🏻‍🤝‍👨🏾", "👨🏻‍🤝‍👨🏿", "👨🏼‍🤝‍👨🏻", "👬🏼", "👨🏼‍🤝‍👨🏽", "👨🏼‍🤝‍👨🏾", "👨🏼‍🤝‍👨🏿", "👨🏽‍🤝‍👨🏻", "👨🏽‍🤝‍👨🏼", "👬🏽", "👨🏽‍🤝‍👨🏾", "👨🏽‍🤝‍👨🏿", "👨🏾‍🤝‍👨🏻", "👨🏾‍🤝‍👨🏼", "👨🏾‍🤝‍👨🏽", "👬🏾", "👨🏾‍🤝‍👨🏿", "👨🏿‍🤝‍👨🏻", "👨🏿‍🤝‍👨🏼", "👨🏿‍🤝‍👨🏽", "👨🏿‍🤝‍👨🏾", "👬🏿"],
        version: "1.0"
    }, {
        emoji: "💏",
        category: 1,
        name: "kiss",
        variations: ["👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩"],
        version: "1.0"
    }, {
        emoji: "💑",
        category: 1,
        name: "couple with heart",
        variations: ["👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩"],
        version: "1.0"
    }, {
        emoji: "👪",
        category: 1,
        name: "family",
        version: "1.0"
    }, {
        emoji: "👨‍👩‍👦",
        category: 1,
        name: "family: man, woman, boy",
        version: "2.0"
    }, {
        emoji: "👨‍👩‍👧",
        category: 1,
        name: "family: man, woman, girl",
        version: "2.0"
    }, {
        emoji: "👨‍👩‍👧‍👦",
        category: 1,
        name: "family: man, woman, girl, boy",
        version: "2.0"
    }, {
        emoji: "👨‍👩‍👦‍👦",
        category: 1,
        name: "family: man, woman, boy, boy",
        version: "2.0"
    }, {
        emoji: "👨‍👩‍👧‍👧",
        category: 1,
        name: "family: man, woman, girl, girl",
        version: "2.0"
    }, {
        emoji: "👨‍👨‍👦",
        category: 1,
        name: "family: man, man, boy",
        version: "2.0"
    }, {
        emoji: "👨‍👨‍👧",
        category: 1,
        name: "family: man, man, girl",
        version: "2.0"
    }, {
        emoji: "👨‍👨‍👧‍👦",
        category: 1,
        name: "family: man, man, girl, boy",
        version: "2.0"
    }, {
        emoji: "👨‍👨‍👦‍👦",
        category: 1,
        name: "family: man, man, boy, boy",
        version: "2.0"
    }, {
        emoji: "👨‍👨‍👧‍👧",
        category: 1,
        name: "family: man, man, girl, girl",
        version: "2.0"
    }, {
        emoji: "👩‍👩‍👦",
        category: 1,
        name: "family: woman, woman, boy",
        version: "2.0"
    }, {
        emoji: "👩‍👩‍👧",
        category: 1,
        name: "family: woman, woman, girl",
        version: "2.0"
    }, {
        emoji: "👩‍👩‍👧‍👦",
        category: 1,
        name: "family: woman, woman, girl, boy",
        version: "2.0"
    }, {
        emoji: "👩‍👩‍👦‍👦",
        category: 1,
        name: "family: woman, woman, boy, boy",
        version: "2.0"
    }, {
        emoji: "👩‍👩‍👧‍👧",
        category: 1,
        name: "family: woman, woman, girl, girl",
        version: "2.0"
    }, {
        emoji: "👨‍👦",
        category: 1,
        name: "family: man, boy",
        version: "4.0"
    }, {
        emoji: "👨‍👦‍👦",
        category: 1,
        name: "family: man, boy, boy",
        version: "4.0"
    }, {
        emoji: "👨‍👧",
        category: 1,
        name: "family: man, girl",
        version: "4.0"
    }, {
        emoji: "👨‍👧‍👦",
        category: 1,
        name: "family: man, girl, boy",
        version: "4.0"
    }, {
        emoji: "👨‍👧‍👧",
        category: 1,
        name: "family: man, girl, girl",
        version: "4.0"
    }, {
        emoji: "👩‍👦",
        category: 1,
        name: "family: woman, boy",
        version: "4.0"
    }, {
        emoji: "👩‍👦‍👦",
        category: 1,
        name: "family: woman, boy, boy",
        version: "4.0"
    }, {
        emoji: "👩‍👧",
        category: 1,
        name: "family: woman, girl",
        version: "4.0"
    }, {
        emoji: "👩‍👧‍👦",
        category: 1,
        name: "family: woman, girl, boy",
        version: "4.0"
    }, {
        emoji: "👩‍👧‍👧",
        category: 1,
        name: "family: woman, girl, girl",
        version: "4.0"
    }, {
        emoji: "🗣️",
        category: 1,
        name: "speaking head",
        version: "1.0"
    }, {
        emoji: "👤",
        category: 1,
        name: "bust in silhouette",
        version: "1.0"
    }, {
        emoji: "👥",
        category: 1,
        name: "busts in silhouette",
        version: "1.0"
    }, {
        emoji: "🫂",
        category: 1,
        name: "people hugging",
        version: "13.0"
    }, {
        emoji: "👣",
        category: 1,
        name: "footprints",
        version: "1.0"
    }, {
        emoji: "🐵",
        category: 2,
        name: "monkey face",
        version: "1.0"
    }, {
        emoji: "🐒",
        category: 2,
        name: "monkey",
        version: "1.0"
    }, {
        emoji: "🦍",
        category: 2,
        name: "gorilla",
        version: "3.0"
    }, {
        emoji: "🦧",
        category: 2,
        name: "orangutan",
        version: "12.0"
    }, {
        emoji: "🐶",
        category: 2,
        name: "dog face",
        version: "1.0"
    }, {
        emoji: "🐕",
        category: 2,
        name: "dog",
        version: "1.0"
    }, {
        emoji: "🦮",
        category: 2,
        name: "guide dog",
        version: "12.0"
    }, {
        emoji: "🐕‍🦺",
        category: 2,
        name: "service dog",
        version: "12.0"
    }, {
        emoji: "🐩",
        category: 2,
        name: "poodle",
        version: "1.0"
    }, {
        emoji: "🐺",
        category: 2,
        name: "wolf",
        version: "1.0"
    }, {
        emoji: "🦊",
        category: 2,
        name: "fox",
        version: "3.0"
    }, {
        emoji: "🦝",
        category: 2,
        name: "raccoon",
        version: "11.0"
    }, {
        emoji: "🐱",
        category: 2,
        name: "cat face",
        version: "1.0"
    }, {
        emoji: "🐈",
        category: 2,
        name: "cat",
        version: "1.0"
    }, {
        emoji: "🐈‍⬛",
        category: 2,
        name: "black cat",
        version: "13.0"
    }, {
        emoji: "🦁",
        category: 2,
        name: "lion",
        version: "1.0"
    }, {
        emoji: "🐯",
        category: 2,
        name: "tiger face",
        version: "1.0"
    }, {
        emoji: "🐅",
        category: 2,
        name: "tiger",
        version: "1.0"
    }, {
        emoji: "🐆",
        category: 2,
        name: "leopard",
        version: "1.0"
    }, {
        emoji: "🐴",
        category: 2,
        name: "horse face",
        version: "1.0"
    }, {
        emoji: "🐎",
        category: 2,
        name: "horse",
        version: "1.0"
    }, {
        emoji: "🦄",
        category: 2,
        name: "unicorn",
        version: "1.0"
    }, {
        emoji: "🦓",
        category: 2,
        name: "zebra",
        version: "5.0"
    }, {
        emoji: "🦌",
        category: 2,
        name: "deer",
        version: "3.0"
    }, {
        emoji: "🦬",
        category: 2,
        name: "bison",
        version: "13.0"
    }, {
        emoji: "🐮",
        category: 2,
        name: "cow face",
        version: "1.0"
    }, {
        emoji: "🐂",
        category: 2,
        name: "ox",
        version: "1.0"
    }, {
        emoji: "🐃",
        category: 2,
        name: "water buffalo",
        version: "1.0"
    }, {
        emoji: "🐄",
        category: 2,
        name: "cow",
        version: "1.0"
    }, {
        emoji: "🐷",
        category: 2,
        name: "pig face",
        version: "1.0"
    }, {
        emoji: "🐖",
        category: 2,
        name: "pig",
        version: "1.0"
    }, {
        emoji: "🐗",
        category: 2,
        name: "boar",
        version: "1.0"
    }, {
        emoji: "🐽",
        category: 2,
        name: "pig nose",
        version: "1.0"
    }, {
        emoji: "🐏",
        category: 2,
        name: "ram",
        version: "1.0"
    }, {
        emoji: "🐑",
        category: 2,
        name: "ewe",
        version: "1.0"
    }, {
        emoji: "🐐",
        category: 2,
        name: "goat",
        version: "1.0"
    }, {
        emoji: "🐪",
        category: 2,
        name: "camel",
        version: "1.0"
    }, {
        emoji: "🐫",
        category: 2,
        name: "two-hump camel",
        version: "1.0"
    }, {
        emoji: "🦙",
        category: 2,
        name: "llama",
        version: "11.0"
    }, {
        emoji: "🦒",
        category: 2,
        name: "giraffe",
        version: "5.0"
    }, {
        emoji: "🐘",
        category: 2,
        name: "elephant",
        version: "1.0"
    }, {
        emoji: "🦣",
        category: 2,
        name: "mammoth",
        version: "13.0"
    }, {
        emoji: "🦏",
        category: 2,
        name: "rhinoceros",
        version: "3.0"
    }, {
        emoji: "🦛",
        category: 2,
        name: "hippopotamus",
        version: "11.0"
    }, {
        emoji: "🐭",
        category: 2,
        name: "mouse face",
        version: "1.0"
    }, {
        emoji: "🐁",
        category: 2,
        name: "mouse",
        version: "1.0"
    }, {
        emoji: "🐀",
        category: 2,
        name: "rat",
        version: "1.0"
    }, {
        emoji: "🐹",
        category: 2,
        name: "hamster",
        version: "1.0"
    }, {
        emoji: "🐰",
        category: 2,
        name: "rabbit face",
        version: "1.0"
    }, {
        emoji: "🐇",
        category: 2,
        name: "rabbit",
        version: "1.0"
    }, {
        emoji: "🐿️",
        category: 2,
        name: "chipmunk",
        version: "1.0"
    }, {
        emoji: "🦫",
        category: 2,
        name: "beaver",
        version: "13.0"
    }, {
        emoji: "🦔",
        category: 2,
        name: "hedgehog",
        version: "5.0"
    }, {
        emoji: "🦇",
        category: 2,
        name: "bat",
        version: "3.0"
    }, {
        emoji: "🐻",
        category: 2,
        name: "bear",
        version: "1.0"
    }, {
        emoji: "🐻‍❄️",
        category: 2,
        name: "polar bear",
        version: "13.0"
    }, {
        emoji: "🐨",
        category: 2,
        name: "koala",
        version: "1.0"
    }, {
        emoji: "🐼",
        category: 2,
        name: "panda",
        version: "1.0"
    }, {
        emoji: "🦥",
        category: 2,
        name: "sloth",
        version: "12.0"
    }, {
        emoji: "🦦",
        category: 2,
        name: "otter",
        version: "12.0"
    }, {
        emoji: "🦨",
        category: 2,
        name: "skunk",
        version: "12.0"
    }, {
        emoji: "🦘",
        category: 2,
        name: "kangaroo",
        version: "11.0"
    }, {
        emoji: "🦡",
        category: 2,
        name: "badger",
        version: "11.0"
    }, {
        emoji: "🐾",
        category: 2,
        name: "paw prints",
        version: "1.0"
    }, {
        emoji: "🦃",
        category: 2,
        name: "turkey",
        version: "1.0"
    }, {
        emoji: "🐔",
        category: 2,
        name: "chicken",
        version: "1.0"
    }, {
        emoji: "🐓",
        category: 2,
        name: "rooster",
        version: "1.0"
    }, {
        emoji: "🐣",
        category: 2,
        name: "hatching chick",
        version: "1.0"
    }, {
        emoji: "🐤",
        category: 2,
        name: "baby chick",
        version: "1.0"
    }, {
        emoji: "🐥",
        category: 2,
        name: "front-facing baby chick",
        version: "1.0"
    }, {
        emoji: "🐦",
        category: 2,
        name: "bird",
        version: "1.0"
    }, {
        emoji: "🐧",
        category: 2,
        name: "penguin",
        version: "1.0"
    }, {
        emoji: "🕊️",
        category: 2,
        name: "dove",
        version: "1.0"
    }, {
        emoji: "🦅",
        category: 2,
        name: "eagle",
        version: "3.0"
    }, {
        emoji: "🦆",
        category: 2,
        name: "duck",
        version: "3.0"
    }, {
        emoji: "🦢",
        category: 2,
        name: "swan",
        version: "11.0"
    }, {
        emoji: "🦉",
        category: 2,
        name: "owl",
        version: "3.0"
    }, {
        emoji: "🦤",
        category: 2,
        name: "dodo",
        version: "13.0"
    }, {
        emoji: "🪶",
        category: 2,
        name: "feather",
        version: "13.0"
    }, {
        emoji: "🦩",
        category: 2,
        name: "flamingo",
        version: "12.0"
    }, {
        emoji: "🦚",
        category: 2,
        name: "peacock",
        version: "11.0"
    }, {
        emoji: "🦜",
        category: 2,
        name: "parrot",
        version: "11.0"
    }, {
        emoji: "🐸",
        category: 2,
        name: "frog",
        version: "1.0"
    }, {
        emoji: "🐊",
        category: 2,
        name: "crocodile",
        version: "1.0"
    }, {
        emoji: "🐢",
        category: 2,
        name: "turtle",
        version: "1.0"
    }, {
        emoji: "🦎",
        category: 2,
        name: "lizard",
        version: "3.0"
    }, {
        emoji: "🐍",
        category: 2,
        name: "snake",
        version: "1.0"
    }, {
        emoji: "🐲",
        category: 2,
        name: "dragon face",
        version: "1.0"
    }, {
        emoji: "🐉",
        category: 2,
        name: "dragon",
        version: "1.0"
    }, {
        emoji: "🦕",
        category: 2,
        name: "sauropod",
        version: "5.0"
    }, {
        emoji: "🦖",
        category: 2,
        name: "T-Rex",
        version: "5.0"
    }, {
        emoji: "🐳",
        category: 2,
        name: "spouting whale",
        version: "1.0"
    }, {
        emoji: "🐋",
        category: 2,
        name: "whale",
        version: "1.0"
    }, {
        emoji: "🐬",
        category: 2,
        name: "dolphin",
        version: "1.0"
    }, {
        emoji: "🦭",
        category: 2,
        name: "seal",
        version: "13.0"
    }, {
        emoji: "🐟",
        category: 2,
        name: "fish",
        version: "1.0"
    }, {
        emoji: "🐠",
        category: 2,
        name: "tropical fish",
        version: "1.0"
    }, {
        emoji: "🐡",
        category: 2,
        name: "blowfish",
        version: "1.0"
    }, {
        emoji: "🦈",
        category: 2,
        name: "shark",
        version: "3.0"
    }, {
        emoji: "🐙",
        category: 2,
        name: "octopus",
        version: "1.0"
    }, {
        emoji: "🐚",
        category: 2,
        name: "spiral shell",
        version: "1.0"
    }, {
        emoji: "🐌",
        category: 2,
        name: "snail",
        version: "1.0"
    }, {
        emoji: "🦋",
        category: 2,
        name: "butterfly",
        version: "3.0"
    }, {
        emoji: "🐛",
        category: 2,
        name: "bug",
        version: "1.0"
    }, {
        emoji: "🐜",
        category: 2,
        name: "ant",
        version: "1.0"
    }, {
        emoji: "🐝",
        category: 2,
        name: "honeybee",
        version: "1.0"
    }, {
        emoji: "🪲",
        category: 2,
        name: "beetle",
        version: "13.0"
    }, {
        emoji: "🐞",
        category: 2,
        name: "lady beetle",
        version: "1.0"
    }, {
        emoji: "🦗",
        category: 2,
        name: "cricket",
        version: "5.0"
    }, {
        emoji: "🪳",
        category: 2,
        name: "cockroach",
        version: "13.0"
    }, {
        emoji: "🕷️",
        category: 2,
        name: "spider",
        version: "1.0"
    }, {
        emoji: "🕸️",
        category: 2,
        name: "spider web",
        version: "1.0"
    }, {
        emoji: "🦂",
        category: 2,
        name: "scorpion",
        version: "1.0"
    }, {
        emoji: "🦟",
        category: 2,
        name: "mosquito",
        version: "11.0"
    }, {
        emoji: "🪰",
        category: 2,
        name: "fly",
        version: "13.0"
    }, {
        emoji: "🪱",
        category: 2,
        name: "worm",
        version: "13.0"
    }, {
        emoji: "🦠",
        category: 2,
        name: "microbe",
        version: "11.0"
    }, {
        emoji: "💐",
        category: 2,
        name: "bouquet",
        version: "1.0"
    }, {
        emoji: "🌸",
        category: 2,
        name: "cherry blossom",
        version: "1.0"
    }, {
        emoji: "💮",
        category: 2,
        name: "white flower",
        version: "1.0"
    }, {
        emoji: "🏵️",
        category: 2,
        name: "rosette",
        version: "1.0"
    }, {
        emoji: "🌹",
        category: 2,
        name: "rose",
        version: "1.0"
    }, {
        emoji: "🥀",
        category: 2,
        name: "wilted flower",
        version: "3.0"
    }, {
        emoji: "🌺",
        category: 2,
        name: "hibiscus",
        version: "1.0"
    }, {
        emoji: "🌻",
        category: 2,
        name: "sunflower",
        version: "1.0"
    }, {
        emoji: "🌼",
        category: 2,
        name: "blossom",
        version: "1.0"
    }, {
        emoji: "🌷",
        category: 2,
        name: "tulip",
        version: "1.0"
    }, {
        emoji: "🌱",
        category: 2,
        name: "seedling",
        version: "1.0"
    }, {
        emoji: "🪴",
        category: 2,
        name: "potted plant",
        version: "13.0"
    }, {
        emoji: "🌲",
        category: 2,
        name: "evergreen tree",
        version: "1.0"
    }, {
        emoji: "🌳",
        category: 2,
        name: "deciduous tree",
        version: "1.0"
    }, {
        emoji: "🌴",
        category: 2,
        name: "palm tree",
        version: "1.0"
    }, {
        emoji: "🌵",
        category: 2,
        name: "cactus",
        version: "1.0"
    }, {
        emoji: "🌾",
        category: 2,
        name: "sheaf of rice",
        version: "1.0"
    }, {
        emoji: "🌿",
        category: 2,
        name: "herb",
        version: "1.0"
    }, {
        emoji: "☘️",
        category: 2,
        name: "shamrock",
        version: "1.0"
    }, {
        emoji: "🍀",
        category: 2,
        name: "four leaf clover",
        version: "1.0"
    }, {
        emoji: "🍁",
        category: 2,
        name: "maple leaf",
        version: "1.0"
    }, {
        emoji: "🍂",
        category: 2,
        name: "fallen leaf",
        version: "1.0"
    }, {
        emoji: "🍃",
        category: 2,
        name: "leaf fluttering in wind",
        version: "1.0"
    }, {
        emoji: "🍇",
        category: 3,
        name: "grapes",
        version: "1.0"
    }, {
        emoji: "🍈",
        category: 3,
        name: "melon",
        version: "1.0"
    }, {
        emoji: "🍉",
        category: 3,
        name: "watermelon",
        version: "1.0"
    }, {
        emoji: "🍊",
        category: 3,
        name: "tangerine",
        version: "1.0"
    }, {
        emoji: "🍋",
        category: 3,
        name: "lemon",
        version: "1.0"
    }, {
        emoji: "🍌",
        category: 3,
        name: "banana",
        version: "1.0"
    }, {
        emoji: "🍍",
        category: 3,
        name: "pineapple",
        version: "1.0"
    }, {
        emoji: "🥭",
        category: 3,
        name: "mango",
        version: "11.0"
    }, {
        emoji: "🍎",
        category: 3,
        name: "red apple",
        version: "1.0"
    }, {
        emoji: "🍏",
        category: 3,
        name: "green apple",
        version: "1.0"
    }, {
        emoji: "🍐",
        category: 3,
        name: "pear",
        version: "1.0"
    }, {
        emoji: "🍑",
        category: 3,
        name: "peach",
        version: "1.0"
    }, {
        emoji: "🍒",
        category: 3,
        name: "cherries",
        version: "1.0"
    }, {
        emoji: "🍓",
        category: 3,
        name: "strawberry",
        version: "1.0"
    }, {
        emoji: "🫐",
        category: 3,
        name: "blueberries",
        version: "13.0"
    }, {
        emoji: "🥝",
        category: 3,
        name: "kiwi fruit",
        version: "3.0"
    }, {
        emoji: "🍅",
        category: 3,
        name: "tomato",
        version: "1.0"
    }, {
        emoji: "🫒",
        category: 3,
        name: "olive",
        version: "13.0"
    }, {
        emoji: "🥥",
        category: 3,
        name: "coconut",
        version: "5.0"
    }, {
        emoji: "🥑",
        category: 3,
        name: "avocado",
        version: "3.0"
    }, {
        emoji: "🍆",
        category: 3,
        name: "eggplant",
        version: "1.0"
    }, {
        emoji: "🥔",
        category: 3,
        name: "potato",
        version: "3.0"
    }, {
        emoji: "🥕",
        category: 3,
        name: "carrot",
        version: "3.0"
    }, {
        emoji: "🌽",
        category: 3,
        name: "ear of corn",
        version: "1.0"
    }, {
        emoji: "🌶️",
        category: 3,
        name: "hot pepper",
        version: "1.0"
    }, {
        emoji: "🫑",
        category: 3,
        name: "bell pepper",
        version: "13.0"
    }, {
        emoji: "🥒",
        category: 3,
        name: "cucumber",
        version: "3.0"
    }, {
        emoji: "🥬",
        category: 3,
        name: "leafy green",
        version: "11.0"
    }, {
        emoji: "🥦",
        category: 3,
        name: "broccoli",
        version: "5.0"
    }, {
        emoji: "🧄",
        category: 3,
        name: "garlic",
        version: "12.0"
    }, {
        emoji: "🧅",
        category: 3,
        name: "onion",
        version: "12.0"
    }, {
        emoji: "🍄",
        category: 3,
        name: "mushroom",
        version: "1.0"
    }, {
        emoji: "🥜",
        category: 3,
        name: "peanuts",
        version: "3.0"
    }, {
        emoji: "🌰",
        category: 3,
        name: "chestnut",
        version: "1.0"
    }, {
        emoji: "🍞",
        category: 3,
        name: "bread",
        version: "1.0"
    }, {
        emoji: "🥐",
        category: 3,
        name: "croissant",
        version: "3.0"
    }, {
        emoji: "🥖",
        category: 3,
        name: "baguette bread",
        version: "3.0"
    }, {
        emoji: "🫓",
        category: 3,
        name: "flatbread",
        version: "13.0"
    }, {
        emoji: "🥨",
        category: 3,
        name: "pretzel",
        version: "5.0"
    }, {
        emoji: "🥯",
        category: 3,
        name: "bagel",
        version: "11.0"
    }, {
        emoji: "🥞",
        category: 3,
        name: "pancakes",
        version: "3.0"
    }, {
        emoji: "🧇",
        category: 3,
        name: "waffle",
        version: "12.0"
    }, {
        emoji: "🧀",
        category: 3,
        name: "cheese wedge",
        version: "1.0"
    }, {
        emoji: "🍖",
        category: 3,
        name: "meat on bone",
        version: "1.0"
    }, {
        emoji: "🍗",
        category: 3,
        name: "poultry leg",
        version: "1.0"
    }, {
        emoji: "🥩",
        category: 3,
        name: "cut of meat",
        version: "5.0"
    }, {
        emoji: "🥓",
        category: 3,
        name: "bacon",
        version: "3.0"
    }, {
        emoji: "🍔",
        category: 3,
        name: "hamburger",
        version: "1.0"
    }, {
        emoji: "🍟",
        category: 3,
        name: "french fries",
        version: "1.0"
    }, {
        emoji: "🍕",
        category: 3,
        name: "pizza",
        version: "1.0"
    }, {
        emoji: "🌭",
        category: 3,
        name: "hot dog",
        version: "1.0"
    }, {
        emoji: "🥪",
        category: 3,
        name: "sandwich",
        version: "5.0"
    }, {
        emoji: "🌮",
        category: 3,
        name: "taco",
        version: "1.0"
    }, {
        emoji: "🌯",
        category: 3,
        name: "burrito",
        version: "1.0"
    }, {
        emoji: "🫔",
        category: 3,
        name: "tamale",
        version: "13.0"
    }, {
        emoji: "🥙",
        category: 3,
        name: "stuffed flatbread",
        version: "3.0"
    }, {
        emoji: "🧆",
        category: 3,
        name: "falafel",
        version: "12.0"
    }, {
        emoji: "🥚",
        category: 3,
        name: "egg",
        version: "3.0"
    }, {
        emoji: "🍳",
        category: 3,
        name: "cooking",
        version: "1.0"
    }, {
        emoji: "🥘",
        category: 3,
        name: "shallow pan of food",
        version: "3.0"
    }, {
        emoji: "🍲",
        category: 3,
        name: "pot of food",
        version: "1.0"
    }, {
        emoji: "🫕",
        category: 3,
        name: "fondue",
        version: "13.0"
    }, {
        emoji: "🥣",
        category: 3,
        name: "bowl with spoon",
        version: "5.0"
    }, {
        emoji: "🥗",
        category: 3,
        name: "green salad",
        version: "3.0"
    }, {
        emoji: "🍿",
        category: 3,
        name: "popcorn",
        version: "1.0"
    }, {
        emoji: "🧈",
        category: 3,
        name: "butter",
        version: "12.0"
    }, {
        emoji: "🧂",
        category: 3,
        name: "salt",
        version: "11.0"
    }, {
        emoji: "🥫",
        category: 3,
        name: "canned food",
        version: "5.0"
    }, {
        emoji: "🍱",
        category: 3,
        name: "bento box",
        version: "1.0"
    }, {
        emoji: "🍘",
        category: 3,
        name: "rice cracker",
        version: "1.0"
    }, {
        emoji: "🍙",
        category: 3,
        name: "rice ball",
        version: "1.0"
    }, {
        emoji: "🍚",
        category: 3,
        name: "cooked rice",
        version: "1.0"
    }, {
        emoji: "🍛",
        category: 3,
        name: "curry rice",
        version: "1.0"
    }, {
        emoji: "🍜",
        category: 3,
        name: "steaming bowl",
        version: "1.0"
    }, {
        emoji: "🍝",
        category: 3,
        name: "spaghetti",
        version: "1.0"
    }, {
        emoji: "🍠",
        category: 3,
        name: "roasted sweet potato",
        version: "1.0"
    }, {
        emoji: "🍢",
        category: 3,
        name: "oden",
        version: "1.0"
    }, {
        emoji: "🍣",
        category: 3,
        name: "sushi",
        version: "1.0"
    }, {
        emoji: "🍤",
        category: 3,
        name: "fried shrimp",
        version: "1.0"
    }, {
        emoji: "🍥",
        category: 3,
        name: "fish cake with swirl",
        version: "1.0"
    }, {
        emoji: "🥮",
        category: 3,
        name: "moon cake",
        version: "11.0"
    }, {
        emoji: "🍡",
        category: 3,
        name: "dango",
        version: "1.0"
    }, {
        emoji: "🥟",
        category: 3,
        name: "dumpling",
        version: "5.0"
    }, {
        emoji: "🥠",
        category: 3,
        name: "fortune cookie",
        version: "5.0"
    }, {
        emoji: "🥡",
        category: 3,
        name: "takeout box",
        version: "5.0"
    }, {
        emoji: "🦀",
        category: 3,
        name: "crab",
        version: "1.0"
    }, {
        emoji: "🦞",
        category: 3,
        name: "lobster",
        version: "11.0"
    }, {
        emoji: "🦐",
        category: 3,
        name: "shrimp",
        version: "3.0"
    }, {
        emoji: "🦑",
        category: 3,
        name: "squid",
        version: "3.0"
    }, {
        emoji: "🦪",
        category: 3,
        name: "oyster",
        version: "12.0"
    }, {
        emoji: "🍦",
        category: 3,
        name: "soft ice cream",
        version: "1.0"
    }, {
        emoji: "🍧",
        category: 3,
        name: "shaved ice",
        version: "1.0"
    }, {
        emoji: "🍨",
        category: 3,
        name: "ice cream",
        version: "1.0"
    }, {
        emoji: "🍩",
        category: 3,
        name: "doughnut",
        version: "1.0"
    }, {
        emoji: "🍪",
        category: 3,
        name: "cookie",
        version: "1.0"
    }, {
        emoji: "🎂",
        category: 3,
        name: "birthday cake",
        version: "1.0"
    }, {
        emoji: "🍰",
        category: 3,
        name: "shortcake",
        version: "1.0"
    }, {
        emoji: "🧁",
        category: 3,
        name: "cupcake",
        version: "11.0"
    }, {
        emoji: "🥧",
        category: 3,
        name: "pie",
        version: "5.0"
    }, {
        emoji: "🍫",
        category: 3,
        name: "chocolate bar",
        version: "1.0"
    }, {
        emoji: "🍬",
        category: 3,
        name: "candy",
        version: "1.0"
    }, {
        emoji: "🍭",
        category: 3,
        name: "lollipop",
        version: "1.0"
    }, {
        emoji: "🍮",
        category: 3,
        name: "custard",
        version: "1.0"
    }, {
        emoji: "🍯",
        category: 3,
        name: "honey pot",
        version: "1.0"
    }, {
        emoji: "🍼",
        category: 3,
        name: "baby bottle",
        version: "1.0"
    }, {
        emoji: "🥛",
        category: 3,
        name: "glass of milk",
        version: "3.0"
    }, {
        emoji: "☕",
        category: 3,
        name: "hot beverage",
        version: "1.0"
    }, {
        emoji: "🫖",
        category: 3,
        name: "teapot",
        version: "13.0"
    }, {
        emoji: "🍵",
        category: 3,
        name: "teacup without handle",
        version: "1.0"
    }, {
        emoji: "🍶",
        category: 3,
        name: "sake",
        version: "1.0"
    }, {
        emoji: "🍾",
        category: 3,
        name: "bottle with popping cork",
        version: "1.0"
    }, {
        emoji: "🍷",
        category: 3,
        name: "wine glass",
        version: "1.0"
    }, {
        emoji: "🍸",
        category: 3,
        name: "cocktail glass",
        version: "1.0"
    }, {
        emoji: "🍹",
        category: 3,
        name: "tropical drink",
        version: "1.0"
    }, {
        emoji: "🍺",
        category: 3,
        name: "beer mug",
        version: "1.0"
    }, {
        emoji: "🍻",
        category: 3,
        name: "clinking beer mugs",
        version: "1.0"
    }, {
        emoji: "🥂",
        category: 3,
        name: "clinking glasses",
        version: "3.0"
    }, {
        emoji: "🥃",
        category: 3,
        name: "tumbler glass",
        version: "3.0"
    }, {
        emoji: "🥤",
        category: 3,
        name: "cup with straw",
        version: "5.0"
    }, {
        emoji: "🧋",
        category: 3,
        name: "bubble tea",
        version: "13.0"
    }, {
        emoji: "🧃",
        category: 3,
        name: "beverage box",
        version: "12.0"
    }, {
        emoji: "🧉",
        category: 3,
        name: "mate",
        version: "12.0"
    }, {
        emoji: "🧊",
        category: 3,
        name: "ice",
        version: "12.0"
    }, {
        emoji: "🥢",
        category: 3,
        name: "chopsticks",
        version: "5.0"
    }, {
        emoji: "🍽️",
        category: 3,
        name: "fork and knife with plate",
        version: "1.0"
    }, {
        emoji: "🍴",
        category: 3,
        name: "fork and knife",
        version: "1.0"
    }, {
        emoji: "🥄",
        category: 3,
        name: "spoon",
        version: "3.0"
    }, {
        emoji: "🔪",
        category: 3,
        name: "kitchen knife",
        version: "1.0"
    }, {
        emoji: "🏺",
        category: 3,
        name: "amphora",
        version: "1.0"
    }, {
        emoji: "🌍",
        category: 4,
        name: "globe showing Europe-Africa",
        version: "1.0"
    }, {
        emoji: "🌎",
        category: 4,
        name: "globe showing Americas",
        version: "1.0"
    }, {
        emoji: "🌏",
        category: 4,
        name: "globe showing Asia-Australia",
        version: "1.0"
    }, {
        emoji: "🌐",
        category: 4,
        name: "globe with meridians",
        version: "1.0"
    }, {
        emoji: "🗺️",
        category: 4,
        name: "world map",
        version: "1.0"
    }, {
        emoji: "🗾",
        category: 4,
        name: "map of Japan",
        version: "1.0"
    }, {
        emoji: "🧭",
        category: 4,
        name: "compass",
        version: "11.0"
    }, {
        emoji: "🏔️",
        category: 4,
        name: "snow-capped mountain",
        version: "1.0"
    }, {
        emoji: "⛰️",
        category: 4,
        name: "mountain",
        version: "1.0"
    }, {
        emoji: "🌋",
        category: 4,
        name: "volcano",
        version: "1.0"
    }, {
        emoji: "🗻",
        category: 4,
        name: "mount fuji",
        version: "1.0"
    }, {
        emoji: "🏕️",
        category: 4,
        name: "camping",
        version: "1.0"
    }, {
        emoji: "🏖️",
        category: 4,
        name: "beach with umbrella",
        version: "1.0"
    }, {
        emoji: "🏜️",
        category: 4,
        name: "desert",
        version: "1.0"
    }, {
        emoji: "🏝️",
        category: 4,
        name: "desert island",
        version: "1.0"
    }, {
        emoji: "🏞️",
        category: 4,
        name: "national park",
        version: "1.0"
    }, {
        emoji: "🏟️",
        category: 4,
        name: "stadium",
        version: "1.0"
    }, {
        emoji: "🏛️",
        category: 4,
        name: "classical building",
        version: "1.0"
    }, {
        emoji: "🏗️",
        category: 4,
        name: "building construction",
        version: "1.0"
    }, {
        emoji: "🧱",
        category: 4,
        name: "brick",
        version: "11.0"
    }, {
        emoji: "🪨",
        category: 4,
        name: "rock",
        version: "13.0"
    }, {
        emoji: "🪵",
        category: 4,
        name: "wood",
        version: "13.0"
    }, {
        emoji: "🛖",
        category: 4,
        name: "hut",
        version: "13.0"
    }, {
        emoji: "🏘️",
        category: 4,
        name: "houses",
        version: "1.0"
    }, {
        emoji: "🏚️",
        category: 4,
        name: "derelict house",
        version: "1.0"
    }, {
        emoji: "🏠",
        category: 4,
        name: "house",
        version: "1.0"
    }, {
        emoji: "🏡",
        category: 4,
        name: "house with garden",
        version: "1.0"
    }, {
        emoji: "🏢",
        category: 4,
        name: "office building",
        version: "1.0"
    }, {
        emoji: "🏣",
        category: 4,
        name: "Japanese post office",
        version: "1.0"
    }, {
        emoji: "🏤",
        category: 4,
        name: "post office",
        version: "1.0"
    }, {
        emoji: "🏥",
        category: 4,
        name: "hospital",
        version: "1.0"
    }, {
        emoji: "🏦",
        category: 4,
        name: "bank",
        version: "1.0"
    }, {
        emoji: "🏨",
        category: 4,
        name: "hotel",
        version: "1.0"
    }, {
        emoji: "🏩",
        category: 4,
        name: "love hotel",
        version: "1.0"
    }, {
        emoji: "🏪",
        category: 4,
        name: "convenience store",
        version: "1.0"
    }, {
        emoji: "🏫",
        category: 4,
        name: "school",
        version: "1.0"
    }, {
        emoji: "🏬",
        category: 4,
        name: "department store",
        version: "1.0"
    }, {
        emoji: "🏭",
        category: 4,
        name: "factory",
        version: "1.0"
    }, {
        emoji: "🏯",
        category: 4,
        name: "Japanese castle",
        version: "1.0"
    }, {
        emoji: "🏰",
        category: 4,
        name: "castle",
        version: "1.0"
    }, {
        emoji: "💒",
        category: 4,
        name: "wedding",
        version: "1.0"
    }, {
        emoji: "🗼",
        category: 4,
        name: "Tokyo tower",
        version: "1.0"
    }, {
        emoji: "🗽",
        category: 4,
        name: "Statue of Liberty",
        version: "1.0"
    }, {
        emoji: "⛪",
        category: 4,
        name: "church",
        version: "1.0"
    }, {
        emoji: "🕌",
        category: 4,
        name: "mosque",
        version: "1.0"
    }, {
        emoji: "🛕",
        category: 4,
        name: "hindu temple",
        version: "12.0"
    }, {
        emoji: "🕍",
        category: 4,
        name: "synagogue",
        version: "1.0"
    }, {
        emoji: "⛩️",
        category: 4,
        name: "shinto shrine",
        version: "1.0"
    }, {
        emoji: "🕋",
        category: 4,
        name: "kaaba",
        version: "1.0"
    }, {
        emoji: "⛲",
        category: 4,
        name: "fountain",
        version: "1.0"
    }, {
        emoji: "⛺",
        category: 4,
        name: "tent",
        version: "1.0"
    }, {
        emoji: "🌁",
        category: 4,
        name: "foggy",
        version: "1.0"
    }, {
        emoji: "🌃",
        category: 4,
        name: "night with stars",
        version: "1.0"
    }, {
        emoji: "🏙️",
        category: 4,
        name: "cityscape",
        version: "1.0"
    }, {
        emoji: "🌄",
        category: 4,
        name: "sunrise over mountains",
        version: "1.0"
    }, {
        emoji: "🌅",
        category: 4,
        name: "sunrise",
        version: "1.0"
    }, {
        emoji: "🌆",
        category: 4,
        name: "cityscape at dusk",
        version: "1.0"
    }, {
        emoji: "🌇",
        category: 4,
        name: "sunset",
        version: "1.0"
    }, {
        emoji: "🌉",
        category: 4,
        name: "bridge at night",
        version: "1.0"
    }, {
        emoji: "♨️",
        category: 4,
        name: "hot springs",
        version: "1.0"
    }, {
        emoji: "🎠",
        category: 4,
        name: "carousel horse",
        version: "1.0"
    }, {
        emoji: "🎡",
        category: 4,
        name: "ferris wheel",
        version: "1.0"
    }, {
        emoji: "🎢",
        category: 4,
        name: "roller coaster",
        version: "1.0"
    }, {
        emoji: "💈",
        category: 4,
        name: "barber pole",
        version: "1.0"
    }, {
        emoji: "🎪",
        category: 4,
        name: "circus tent",
        version: "1.0"
    }, {
        emoji: "🚂",
        category: 4,
        name: "locomotive",
        version: "1.0"
    }, {
        emoji: "🚃",
        category: 4,
        name: "railway car",
        version: "1.0"
    }, {
        emoji: "🚄",
        category: 4,
        name: "high-speed train",
        version: "1.0"
    }, {
        emoji: "🚅",
        category: 4,
        name: "bullet train",
        version: "1.0"
    }, {
        emoji: "🚆",
        category: 4,
        name: "train",
        version: "1.0"
    }, {
        emoji: "🚇",
        category: 4,
        name: "metro",
        version: "1.0"
    }, {
        emoji: "🚈",
        category: 4,
        name: "light rail",
        version: "1.0"
    }, {
        emoji: "🚉",
        category: 4,
        name: "station",
        version: "1.0"
    }, {
        emoji: "🚊",
        category: 4,
        name: "tram",
        version: "1.0"
    }, {
        emoji: "🚝",
        category: 4,
        name: "monorail",
        version: "1.0"
    }, {
        emoji: "🚞",
        category: 4,
        name: "mountain railway",
        version: "1.0"
    }, {
        emoji: "🚋",
        category: 4,
        name: "tram car",
        version: "1.0"
    }, {
        emoji: "🚌",
        category: 4,
        name: "bus",
        version: "1.0"
    }, {
        emoji: "🚍",
        category: 4,
        name: "oncoming bus",
        version: "1.0"
    }, {
        emoji: "🚎",
        category: 4,
        name: "trolleybus",
        version: "1.0"
    }, {
        emoji: "🚐",
        category: 4,
        name: "minibus",
        version: "1.0"
    }, {
        emoji: "🚑",
        category: 4,
        name: "ambulance",
        version: "1.0"
    }, {
        emoji: "🚒",
        category: 4,
        name: "fire engine",
        version: "1.0"
    }, {
        emoji: "🚓",
        category: 4,
        name: "police car",
        version: "1.0"
    }, {
        emoji: "🚔",
        category: 4,
        name: "oncoming police car",
        version: "1.0"
    }, {
        emoji: "🚕",
        category: 4,
        name: "taxi",
        version: "1.0"
    }, {
        emoji: "🚖",
        category: 4,
        name: "oncoming taxi",
        version: "1.0"
    }, {
        emoji: "🚗",
        category: 4,
        name: "automobile",
        version: "1.0"
    }, {
        emoji: "🚘",
        category: 4,
        name: "oncoming automobile",
        version: "1.0"
    }, {
        emoji: "🚙",
        category: 4,
        name: "sport utility vehicle",
        version: "1.0"
    }, {
        emoji: "🛻",
        category: 4,
        name: "pickup truck",
        version: "13.0"
    }, {
        emoji: "🚚",
        category: 4,
        name: "delivery truck",
        version: "1.0"
    }, {
        emoji: "🚛",
        category: 4,
        name: "articulated lorry",
        version: "1.0"
    }, {
        emoji: "🚜",
        category: 4,
        name: "tractor",
        version: "1.0"
    }, {
        emoji: "🏎️",
        category: 4,
        name: "racing car",
        version: "1.0"
    }, {
        emoji: "🏍️",
        category: 4,
        name: "motorcycle",
        version: "1.0"
    }, {
        emoji: "🛵",
        category: 4,
        name: "motor scooter",
        version: "3.0"
    }, {
        emoji: "🦽",
        category: 4,
        name: "manual wheelchair",
        version: "12.0"
    }, {
        emoji: "🦼",
        category: 4,
        name: "motorized wheelchair",
        version: "12.0"
    }, {
        emoji: "🛺",
        category: 4,
        name: "auto rickshaw",
        version: "12.0"
    }, {
        emoji: "🚲",
        category: 4,
        name: "bicycle",
        version: "1.0"
    }, {
        emoji: "🛴",
        category: 4,
        name: "kick scooter",
        version: "3.0"
    }, {
        emoji: "🛹",
        category: 4,
        name: "skateboard",
        version: "11.0"
    }, {
        emoji: "🛼",
        category: 4,
        name: "roller skate",
        version: "13.0"
    }, {
        emoji: "🚏",
        category: 4,
        name: "bus stop",
        version: "1.0"
    }, {
        emoji: "🛣️",
        category: 4,
        name: "motorway",
        version: "1.0"
    }, {
        emoji: "🛤️",
        category: 4,
        name: "railway track",
        version: "1.0"
    }, {
        emoji: "🛢️",
        category: 4,
        name: "oil drum",
        version: "1.0"
    }, {
        emoji: "⛽",
        category: 4,
        name: "fuel pump",
        version: "1.0"
    }, {
        emoji: "🚨",
        category: 4,
        name: "police car light",
        version: "1.0"
    }, {
        emoji: "🚥",
        category: 4,
        name: "horizontal traffic light",
        version: "1.0"
    }, {
        emoji: "🚦",
        category: 4,
        name: "vertical traffic light",
        version: "1.0"
    }, {
        emoji: "🛑",
        category: 4,
        name: "stop sign",
        version: "3.0"
    }, {
        emoji: "🚧",
        category: 4,
        name: "construction",
        version: "1.0"
    }, {
        emoji: "⚓",
        category: 4,
        name: "anchor",
        version: "1.0"
    }, {
        emoji: "⛵",
        category: 4,
        name: "sailboat",
        version: "1.0"
    }, {
        emoji: "🛶",
        category: 4,
        name: "canoe",
        version: "3.0"
    }, {
        emoji: "🚤",
        category: 4,
        name: "speedboat",
        version: "1.0"
    }, {
        emoji: "🛳️",
        category: 4,
        name: "passenger ship",
        version: "1.0"
    }, {
        emoji: "⛴️",
        category: 4,
        name: "ferry",
        version: "1.0"
    }, {
        emoji: "🛥️",
        category: 4,
        name: "motor boat",
        version: "1.0"
    }, {
        emoji: "🚢",
        category: 4,
        name: "ship",
        version: "1.0"
    }, {
        emoji: "✈️",
        category: 4,
        name: "airplane",
        version: "1.0"
    }, {
        emoji: "🛩️",
        category: 4,
        name: "small airplane",
        version: "1.0"
    }, {
        emoji: "🛫",
        category: 4,
        name: "airplane departure",
        version: "1.0"
    }, {
        emoji: "🛬",
        category: 4,
        name: "airplane arrival",
        version: "1.0"
    }, {
        emoji: "🪂",
        category: 4,
        name: "parachute",
        version: "12.0"
    }, {
        emoji: "💺",
        category: 4,
        name: "seat",
        version: "1.0"
    }, {
        emoji: "🚁",
        category: 4,
        name: "helicopter",
        version: "1.0"
    }, {
        emoji: "🚟",
        category: 4,
        name: "suspension railway",
        version: "1.0"
    }, {
        emoji: "🚠",
        category: 4,
        name: "mountain cableway",
        version: "1.0"
    }, {
        emoji: "🚡",
        category: 4,
        name: "aerial tramway",
        version: "1.0"
    }, {
        emoji: "🛰️",
        category: 4,
        name: "satellite",
        version: "1.0"
    }, {
        emoji: "🚀",
        category: 4,
        name: "rocket",
        version: "1.0"
    }, {
        emoji: "🛸",
        category: 4,
        name: "flying saucer",
        version: "5.0"
    }, {
        emoji: "🛎️",
        category: 4,
        name: "bellhop bell",
        version: "1.0"
    }, {
        emoji: "🧳",
        category: 4,
        name: "luggage",
        version: "11.0"
    }, {
        emoji: "⌛",
        category: 4,
        name: "hourglass done",
        version: "1.0"
    }, {
        emoji: "⏳",
        category: 4,
        name: "hourglass not done",
        version: "1.0"
    }, {
        emoji: "⌚",
        category: 4,
        name: "watch",
        version: "1.0"
    }, {
        emoji: "⏰",
        category: 4,
        name: "alarm clock",
        version: "1.0"
    }, {
        emoji: "⏱️",
        category: 4,
        name: "stopwatch",
        version: "1.0"
    }, {
        emoji: "⏲️",
        category: 4,
        name: "timer clock",
        version: "1.0"
    }, {
        emoji: "🕰️",
        category: 4,
        name: "mantelpiece clock",
        version: "1.0"
    }, {
        emoji: "🕛",
        category: 4,
        name: "twelve o’clock",
        version: "1.0"
    }, {
        emoji: "🕧",
        category: 4,
        name: "twelve-thirty",
        version: "1.0"
    }, {
        emoji: "🕐",
        category: 4,
        name: "one o’clock",
        version: "1.0"
    }, {
        emoji: "🕜",
        category: 4,
        name: "one-thirty",
        version: "1.0"
    }, {
        emoji: "🕑",
        category: 4,
        name: "two o’clock",
        version: "1.0"
    }, {
        emoji: "🕝",
        category: 4,
        name: "two-thirty",
        version: "1.0"
    }, {
        emoji: "🕒",
        category: 4,
        name: "three o’clock",
        version: "1.0"
    }, {
        emoji: "🕞",
        category: 4,
        name: "three-thirty",
        version: "1.0"
    }, {
        emoji: "🕓",
        category: 4,
        name: "four o’clock",
        version: "1.0"
    }, {
        emoji: "🕟",
        category: 4,
        name: "four-thirty",
        version: "1.0"
    }, {
        emoji: "🕔",
        category: 4,
        name: "five o’clock",
        version: "1.0"
    }, {
        emoji: "🕠",
        category: 4,
        name: "five-thirty",
        version: "1.0"
    }, {
        emoji: "🕕",
        category: 4,
        name: "six o’clock",
        version: "1.0"
    }, {
        emoji: "🕡",
        category: 4,
        name: "six-thirty",
        version: "1.0"
    }, {
        emoji: "🕖",
        category: 4,
        name: "seven o’clock",
        version: "1.0"
    }, {
        emoji: "🕢",
        category: 4,
        name: "seven-thirty",
        version: "1.0"
    }, {
        emoji: "🕗",
        category: 4,
        name: "eight o’clock",
        version: "1.0"
    }, {
        emoji: "🕣",
        category: 4,
        name: "eight-thirty",
        version: "1.0"
    }, {
        emoji: "🕘",
        category: 4,
        name: "nine o’clock",
        version: "1.0"
    }, {
        emoji: "🕤",
        category: 4,
        name: "nine-thirty",
        version: "1.0"
    }, {
        emoji: "🕙",
        category: 4,
        name: "ten o’clock",
        version: "1.0"
    }, {
        emoji: "🕥",
        category: 4,
        name: "ten-thirty",
        version: "1.0"
    }, {
        emoji: "🕚",
        category: 4,
        name: "eleven o’clock",
        version: "1.0"
    }, {
        emoji: "🕦",
        category: 4,
        name: "eleven-thirty",
        version: "1.0"
    }, {
        emoji: "🌑",
        category: 4,
        name: "new moon",
        version: "1.0"
    }, {
        emoji: "🌒",
        category: 4,
        name: "waxing crescent moon",
        version: "1.0"
    }, {
        emoji: "🌓",
        category: 4,
        name: "first quarter moon",
        version: "1.0"
    }, {
        emoji: "🌔",
        category: 4,
        name: "waxing gibbous moon",
        version: "1.0"
    }, {
        emoji: "🌕",
        category: 4,
        name: "full moon",
        version: "1.0"
    }, {
        emoji: "🌖",
        category: 4,
        name: "waning gibbous moon",
        version: "1.0"
    }, {
        emoji: "🌗",
        category: 4,
        name: "last quarter moon",
        version: "1.0"
    }, {
        emoji: "🌘",
        category: 4,
        name: "waning crescent moon",
        version: "1.0"
    }, {
        emoji: "🌙",
        category: 4,
        name: "crescent moon",
        version: "1.0"
    }, {
        emoji: "🌚",
        category: 4,
        name: "new moon face",
        version: "1.0"
    }, {
        emoji: "🌛",
        category: 4,
        name: "first quarter moon face",
        version: "1.0"
    }, {
        emoji: "🌜",
        category: 4,
        name: "last quarter moon face",
        version: "1.0"
    }, {
        emoji: "🌡️",
        category: 4,
        name: "thermometer",
        version: "1.0"
    }, {
        emoji: "☀️",
        category: 4,
        name: "sun",
        version: "1.0"
    }, {
        emoji: "🌝",
        category: 4,
        name: "full moon face",
        version: "1.0"
    }, {
        emoji: "🌞",
        category: 4,
        name: "sun with face",
        version: "1.0"
    }, {
        emoji: "🪐",
        category: 4,
        name: "ringed planet",
        version: "12.0"
    }, {
        emoji: "⭐",
        category: 4,
        name: "star",
        version: "1.0"
    }, {
        emoji: "🌟",
        category: 4,
        name: "glowing star",
        version: "1.0"
    }, {
        emoji: "🌠",
        category: 4,
        name: "shooting star",
        version: "1.0"
    }, {
        emoji: "🌌",
        category: 4,
        name: "milky way",
        version: "1.0"
    }, {
        emoji: "☁️",
        category: 4,
        name: "cloud",
        version: "1.0"
    }, {
        emoji: "⛅",
        category: 4,
        name: "sun behind cloud",
        version: "1.0"
    }, {
        emoji: "⛈️",
        category: 4,
        name: "cloud with lightning and rain",
        version: "1.0"
    }, {
        emoji: "🌤️",
        category: 4,
        name: "sun behind small cloud",
        version: "1.0"
    }, {
        emoji: "🌥️",
        category: 4,
        name: "sun behind large cloud",
        version: "1.0"
    }, {
        emoji: "🌦️",
        category: 4,
        name: "sun behind rain cloud",
        version: "1.0"
    }, {
        emoji: "🌧️",
        category: 4,
        name: "cloud with rain",
        version: "1.0"
    }, {
        emoji: "🌨️",
        category: 4,
        name: "cloud with snow",
        version: "1.0"
    }, {
        emoji: "🌩️",
        category: 4,
        name: "cloud with lightning",
        version: "1.0"
    }, {
        emoji: "🌪️",
        category: 4,
        name: "tornado",
        version: "1.0"
    }, {
        emoji: "🌫️",
        category: 4,
        name: "fog",
        version: "1.0"
    }, {
        emoji: "🌬️",
        category: 4,
        name: "wind face",
        version: "1.0"
    }, {
        emoji: "🌀",
        category: 4,
        name: "cyclone",
        version: "1.0"
    }, {
        emoji: "🌈",
        category: 4,
        name: "rainbow",
        version: "1.0"
    }, {
        emoji: "🌂",
        category: 4,
        name: "closed umbrella",
        version: "1.0"
    }, {
        emoji: "☂️",
        category: 4,
        name: "umbrella",
        version: "1.0"
    }, {
        emoji: "☔",
        category: 4,
        name: "umbrella with rain drops",
        version: "1.0"
    }, {
        emoji: "⛱️",
        category: 4,
        name: "umbrella on ground",
        version: "1.0"
    }, {
        emoji: "⚡",
        category: 4,
        name: "high voltage",
        version: "1.0"
    }, {
        emoji: "❄️",
        category: 4,
        name: "snowflake",
        version: "1.0"
    }, {
        emoji: "☃️",
        category: 4,
        name: "snowman",
        version: "1.0"
    }, {
        emoji: "⛄",
        category: 4,
        name: "snowman without snow",
        version: "1.0"
    }, {
        emoji: "☄️",
        category: 4,
        name: "comet",
        version: "1.0"
    }, {
        emoji: "🔥",
        category: 4,
        name: "fire",
        version: "1.0"
    }, {
        emoji: "💧",
        category: 4,
        name: "droplet",
        version: "1.0"
    }, {
        emoji: "🌊",
        category: 4,
        name: "water wave",
        version: "1.0"
    }, {
        emoji: "🎃",
        category: 5,
        name: "jack-o-lantern",
        version: "1.0"
    }, {
        emoji: "🎄",
        category: 5,
        name: "Christmas tree",
        version: "1.0"
    }, {
        emoji: "🎆",
        category: 5,
        name: "fireworks",
        version: "1.0"
    }, {
        emoji: "🎇",
        category: 5,
        name: "sparkler",
        version: "1.0"
    }, {
        emoji: "🧨",
        category: 5,
        name: "firecracker",
        version: "11.0"
    }, {
        emoji: "✨",
        category: 5,
        name: "sparkles",
        version: "1.0"
    }, {
        emoji: "🎈",
        category: 5,
        name: "balloon",
        version: "1.0"
    }, {
        emoji: "🎉",
        category: 5,
        name: "party popper",
        version: "1.0"
    }, {
        emoji: "🎊",
        category: 5,
        name: "confetti ball",
        version: "1.0"
    }, {
        emoji: "🎋",
        category: 5,
        name: "tanabata tree",
        version: "1.0"
    }, {
        emoji: "🎍",
        category: 5,
        name: "pine decoration",
        version: "1.0"
    }, {
        emoji: "🎎",
        category: 5,
        name: "Japanese dolls",
        version: "1.0"
    }, {
        emoji: "🎏",
        category: 5,
        name: "carp streamer",
        version: "1.0"
    }, {
        emoji: "🎐",
        category: 5,
        name: "wind chime",
        version: "1.0"
    }, {
        emoji: "🎑",
        category: 5,
        name: "moon viewing ceremony",
        version: "1.0"
    }, {
        emoji: "🧧",
        category: 5,
        name: "red envelope",
        version: "11.0"
    }, {
        emoji: "🎀",
        category: 5,
        name: "ribbon",
        version: "1.0"
    }, {
        emoji: "🎁",
        category: 5,
        name: "wrapped gift",
        version: "1.0"
    }, {
        emoji: "🎗️",
        category: 5,
        name: "reminder ribbon",
        version: "1.0"
    }, {
        emoji: "🎟️",
        category: 5,
        name: "admission tickets",
        version: "1.0"
    }, {
        emoji: "🎫",
        category: 5,
        name: "ticket",
        version: "1.0"
    }, {
        emoji: "🎖️",
        category: 5,
        name: "military medal",
        version: "1.0"
    }, {
        emoji: "🏆",
        category: 5,
        name: "trophy",
        version: "1.0"
    }, {
        emoji: "🏅",
        category: 5,
        name: "sports medal",
        version: "1.0"
    }, {
        emoji: "🥇",
        category: 5,
        name: "1st place medal",
        version: "3.0"
    }, {
        emoji: "🥈",
        category: 5,
        name: "2nd place medal",
        version: "3.0"
    }, {
        emoji: "🥉",
        category: 5,
        name: "3rd place medal",
        version: "3.0"
    }, {
        emoji: "⚽",
        category: 5,
        name: "soccer ball",
        version: "1.0"
    }, {
        emoji: "⚾",
        category: 5,
        name: "baseball",
        version: "1.0"
    }, {
        emoji: "🥎",
        category: 5,
        name: "softball",
        version: "11.0"
    }, {
        emoji: "🏀",
        category: 5,
        name: "basketball",
        version: "1.0"
    }, {
        emoji: "🏐",
        category: 5,
        name: "volleyball",
        version: "1.0"
    }, {
        emoji: "🏈",
        category: 5,
        name: "american football",
        version: "1.0"
    }, {
        emoji: "🏉",
        category: 5,
        name: "rugby football",
        version: "1.0"
    }, {
        emoji: "🎾",
        category: 5,
        name: "tennis",
        version: "1.0"
    }, {
        emoji: "🥏",
        category: 5,
        name: "flying disc",
        version: "11.0"
    }, {
        emoji: "🎳",
        category: 5,
        name: "bowling",
        version: "1.0"
    }, {
        emoji: "🏏",
        category: 5,
        name: "cricket game",
        version: "1.0"
    }, {
        emoji: "🏑",
        category: 5,
        name: "field hockey",
        version: "1.0"
    }, {
        emoji: "🏒",
        category: 5,
        name: "ice hockey",
        version: "1.0"
    }, {
        emoji: "🥍",
        category: 5,
        name: "lacrosse",
        version: "11.0"
    }, {
        emoji: "🏓",
        category: 5,
        name: "ping pong",
        version: "1.0"
    }, {
        emoji: "🏸",
        category: 5,
        name: "badminton",
        version: "1.0"
    }, {
        emoji: "🥊",
        category: 5,
        name: "boxing glove",
        version: "3.0"
    }, {
        emoji: "🥋",
        category: 5,
        name: "martial arts uniform",
        version: "3.0"
    }, {
        emoji: "🥅",
        category: 5,
        name: "goal net",
        version: "3.0"
    }, {
        emoji: "⛳",
        category: 5,
        name: "flag in hole",
        version: "1.0"
    }, {
        emoji: "⛸️",
        category: 5,
        name: "ice skate",
        version: "1.0"
    }, {
        emoji: "🎣",
        category: 5,
        name: "fishing pole",
        version: "1.0"
    }, {
        emoji: "🤿",
        category: 5,
        name: "diving mask",
        version: "12.0"
    }, {
        emoji: "🎽",
        category: 5,
        name: "running shirt",
        version: "1.0"
    }, {
        emoji: "🎿",
        category: 5,
        name: "skis",
        version: "1.0"
    }, {
        emoji: "🛷",
        category: 5,
        name: "sled",
        version: "5.0"
    }, {
        emoji: "🥌",
        category: 5,
        name: "curling stone",
        version: "5.0"
    }, {
        emoji: "🎯",
        category: 5,
        name: "direct hit",
        version: "1.0"
    }, {
        emoji: "🪀",
        category: 5,
        name: "yo-yo",
        version: "12.0"
    }, {
        emoji: "🪁",
        category: 5,
        name: "kite",
        version: "12.0"
    }, {
        emoji: "🎱",
        category: 5,
        name: "pool 8 ball",
        version: "1.0"
    }, {
        emoji: "🔮",
        category: 5,
        name: "crystal ball",
        version: "1.0"
    }, {
        emoji: "🪄",
        category: 5,
        name: "magic wand",
        version: "13.0"
    }, {
        emoji: "🧿",
        category: 5,
        name: "nazar amulet",
        version: "11.0"
    }, {
        emoji: "🎮",
        category: 5,
        name: "video game",
        version: "1.0"
    }, {
        emoji: "🕹️",
        category: 5,
        name: "joystick",
        version: "1.0"
    }, {
        emoji: "🎰",
        category: 5,
        name: "slot machine",
        version: "1.0"
    }, {
        emoji: "🎲",
        category: 5,
        name: "game die",
        version: "1.0"
    }, {
        emoji: "🧩",
        category: 5,
        name: "puzzle piece",
        version: "11.0"
    }, {
        emoji: "🧸",
        category: 5,
        name: "teddy bear",
        version: "11.0"
    }, {
        emoji: "🪅",
        category: 5,
        name: "piñata",
        version: "13.0"
    }, {
        emoji: "🪆",
        category: 5,
        name: "nesting dolls",
        version: "13.0"
    }, {
        emoji: "♠️",
        category: 5,
        name: "spade suit",
        version: "1.0"
    }, {
        emoji: "♥️",
        category: 5,
        name: "heart suit",
        version: "1.0"
    }, {
        emoji: "♦️",
        category: 5,
        name: "diamond suit",
        version: "1.0"
    }, {
        emoji: "♣️",
        category: 5,
        name: "club suit",
        version: "1.0"
    }, {
        emoji: "♟️",
        category: 5,
        name: "chess pawn",
        version: "11.0"
    }, {
        emoji: "🃏",
        category: 5,
        name: "joker",
        version: "1.0"
    }, {
        emoji: "🀄",
        category: 5,
        name: "mahjong red dragon",
        version: "1.0"
    }, {
        emoji: "🎴",
        category: 5,
        name: "flower playing cards",
        version: "1.0"
    }, {
        emoji: "🎭",
        category: 5,
        name: "performing arts",
        version: "1.0"
    }, {
        emoji: "🖼️",
        category: 5,
        name: "framed picture",
        version: "1.0"
    }, {
        emoji: "🎨",
        category: 5,
        name: "artist palette",
        version: "1.0"
    }, {
        emoji: "🧵",
        category: 5,
        name: "thread",
        version: "11.0"
    }, {
        emoji: "🪡",
        category: 5,
        name: "sewing needle",
        version: "13.0"
    }, {
        emoji: "🧶",
        category: 5,
        name: "yarn",
        version: "11.0"
    }, {
        emoji: "🪢",
        category: 5,
        name: "knot",
        version: "13.0"
    }, {
        emoji: "👓",
        category: 6,
        name: "glasses",
        version: "1.0"
    }, {
        emoji: "🕶️",
        category: 6,
        name: "sunglasses",
        version: "1.0"
    }, {
        emoji: "🥽",
        category: 6,
        name: "goggles",
        version: "11.0"
    }, {
        emoji: "🥼",
        category: 6,
        name: "lab coat",
        version: "11.0"
    }, {
        emoji: "🦺",
        category: 6,
        name: "safety vest",
        version: "12.0"
    }, {
        emoji: "👔",
        category: 6,
        name: "necktie",
        version: "1.0"
    }, {
        emoji: "👕",
        category: 6,
        name: "t-shirt",
        version: "1.0"
    }, {
        emoji: "👖",
        category: 6,
        name: "jeans",
        version: "1.0"
    }, {
        emoji: "🧣",
        category: 6,
        name: "scarf",
        version: "5.0"
    }, {
        emoji: "🧤",
        category: 6,
        name: "gloves",
        version: "5.0"
    }, {
        emoji: "🧥",
        category: 6,
        name: "coat",
        version: "5.0"
    }, {
        emoji: "🧦",
        category: 6,
        name: "socks",
        version: "5.0"
    }, {
        emoji: "👗",
        category: 6,
        name: "dress",
        version: "1.0"
    }, {
        emoji: "👘",
        category: 6,
        name: "kimono",
        version: "1.0"
    }, {
        emoji: "🥻",
        category: 6,
        name: "sari",
        version: "12.0"
    }, {
        emoji: "🩱",
        category: 6,
        name: "one-piece swimsuit",
        version: "12.0"
    }, {
        emoji: "🩲",
        category: 6,
        name: "briefs",
        version: "12.0"
    }, {
        emoji: "🩳",
        category: 6,
        name: "shorts",
        version: "12.0"
    }, {
        emoji: "👙",
        category: 6,
        name: "bikini",
        version: "1.0"
    }, {
        emoji: "👚",
        category: 6,
        name: "woman’s clothes",
        version: "1.0"
    }, {
        emoji: "👛",
        category: 6,
        name: "purse",
        version: "1.0"
    }, {
        emoji: "👜",
        category: 6,
        name: "handbag",
        version: "1.0"
    }, {
        emoji: "👝",
        category: 6,
        name: "clutch bag",
        version: "1.0"
    }, {
        emoji: "🛍️",
        category: 6,
        name: "shopping bags",
        version: "1.0"
    }, {
        emoji: "🎒",
        category: 6,
        name: "backpack",
        version: "1.0"
    }, {
        emoji: "🩴",
        category: 6,
        name: "thong sandal",
        version: "13.0"
    }, {
        emoji: "👞",
        category: 6,
        name: "man’s shoe",
        version: "1.0"
    }, {
        emoji: "👟",
        category: 6,
        name: "running shoe",
        version: "1.0"
    }, {
        emoji: "🥾",
        category: 6,
        name: "hiking boot",
        version: "11.0"
    }, {
        emoji: "🥿",
        category: 6,
        name: "flat shoe",
        version: "11.0"
    }, {
        emoji: "👠",
        category: 6,
        name: "high-heeled shoe",
        version: "1.0"
    }, {
        emoji: "👡",
        category: 6,
        name: "woman’s sandal",
        version: "1.0"
    }, {
        emoji: "🩰",
        category: 6,
        name: "ballet shoes",
        version: "12.0"
    }, {
        emoji: "👢",
        category: 6,
        name: "woman’s boot",
        version: "1.0"
    }, {
        emoji: "👑",
        category: 6,
        name: "crown",
        version: "1.0"
    }, {
        emoji: "👒",
        category: 6,
        name: "woman’s hat",
        version: "1.0"
    }, {
        emoji: "🎩",
        category: 6,
        name: "top hat",
        version: "1.0"
    }, {
        emoji: "🎓",
        category: 6,
        name: "graduation cap",
        version: "1.0"
    }, {
        emoji: "🧢",
        category: 6,
        name: "billed cap",
        version: "5.0"
    }, {
        emoji: "🪖",
        category: 6,
        name: "military helmet",
        version: "13.0"
    }, {
        emoji: "⛑️",
        category: 6,
        name: "rescue worker’s helmet",
        version: "1.0"
    }, {
        emoji: "📿",
        category: 6,
        name: "prayer beads",
        version: "1.0"
    }, {
        emoji: "💄",
        category: 6,
        name: "lipstick",
        version: "1.0"
    }, {
        emoji: "💍",
        category: 6,
        name: "ring",
        version: "1.0"
    }, {
        emoji: "💎",
        category: 6,
        name: "gem stone",
        version: "1.0"
    }, {
        emoji: "🔇",
        category: 6,
        name: "muted speaker",
        version: "1.0"
    }, {
        emoji: "🔈",
        category: 6,
        name: "speaker low volume",
        version: "1.0"
    }, {
        emoji: "🔉",
        category: 6,
        name: "speaker medium volume",
        version: "1.0"
    }, {
        emoji: "🔊",
        category: 6,
        name: "speaker high volume",
        version: "1.0"
    }, {
        emoji: "📢",
        category: 6,
        name: "loudspeaker",
        version: "1.0"
    }, {
        emoji: "📣",
        category: 6,
        name: "megaphone",
        version: "1.0"
    }, {
        emoji: "📯",
        category: 6,
        name: "postal horn",
        version: "1.0"
    }, {
        emoji: "🔔",
        category: 6,
        name: "bell",
        version: "1.0"
    }, {
        emoji: "🔕",
        category: 6,
        name: "bell with slash",
        version: "1.0"
    }, {
        emoji: "🎼",
        category: 6,
        name: "musical score",
        version: "1.0"
    }, {
        emoji: "🎵",
        category: 6,
        name: "musical note",
        version: "1.0"
    }, {
        emoji: "🎶",
        category: 6,
        name: "musical notes",
        version: "1.0"
    }, {
        emoji: "🎙️",
        category: 6,
        name: "studio microphone",
        version: "1.0"
    }, {
        emoji: "🎚️",
        category: 6,
        name: "level slider",
        version: "1.0"
    }, {
        emoji: "🎛️",
        category: 6,
        name: "control knobs",
        version: "1.0"
    }, {
        emoji: "🎤",
        category: 6,
        name: "microphone",
        version: "1.0"
    }, {
        emoji: "🎧",
        category: 6,
        name: "headphone",
        version: "1.0"
    }, {
        emoji: "📻",
        category: 6,
        name: "radio",
        version: "1.0"
    }, {
        emoji: "🎷",
        category: 6,
        name: "saxophone",
        version: "1.0"
    }, {
        emoji: "🪗",
        category: 6,
        name: "accordion",
        version: "13.0"
    }, {
        emoji: "🎸",
        category: 6,
        name: "guitar",
        version: "1.0"
    }, {
        emoji: "🎹",
        category: 6,
        name: "musical keyboard",
        version: "1.0"
    }, {
        emoji: "🎺",
        category: 6,
        name: "trumpet",
        version: "1.0"
    }, {
        emoji: "🎻",
        category: 6,
        name: "violin",
        version: "1.0"
    }, {
        emoji: "🪕",
        category: 6,
        name: "banjo",
        version: "12.0"
    }, {
        emoji: "🥁",
        category: 6,
        name: "drum",
        version: "3.0"
    }, {
        emoji: "🪘",
        category: 6,
        name: "long drum",
        version: "13.0"
    }, {
        emoji: "📱",
        category: 6,
        name: "mobile phone",
        version: "1.0"
    }, {
        emoji: "📲",
        category: 6,
        name: "mobile phone with arrow",
        version: "1.0"
    }, {
        emoji: "☎️",
        category: 6,
        name: "telephone",
        version: "1.0"
    }, {
        emoji: "📞",
        category: 6,
        name: "telephone receiver",
        version: "1.0"
    }, {
        emoji: "📟",
        category: 6,
        name: "pager",
        version: "1.0"
    }, {
        emoji: "📠",
        category: 6,
        name: "fax machine",
        version: "1.0"
    }, {
        emoji: "🔋",
        category: 6,
        name: "battery",
        version: "1.0"
    }, {
        emoji: "🔌",
        category: 6,
        name: "electric plug",
        version: "1.0"
    }, {
        emoji: "💻",
        category: 6,
        name: "laptop",
        version: "1.0"
    }, {
        emoji: "🖥️",
        category: 6,
        name: "desktop computer",
        version: "1.0"
    }, {
        emoji: "🖨️",
        category: 6,
        name: "printer",
        version: "1.0"
    }, {
        emoji: "⌨️",
        category: 6,
        name: "keyboard",
        version: "1.0"
    }, {
        emoji: "🖱️",
        category: 6,
        name: "computer mouse",
        version: "1.0"
    }, {
        emoji: "🖲️",
        category: 6,
        name: "trackball",
        version: "1.0"
    }, {
        emoji: "💽",
        category: 6,
        name: "computer disk",
        version: "1.0"
    }, {
        emoji: "💾",
        category: 6,
        name: "floppy disk",
        version: "1.0"
    }, {
        emoji: "💿",
        category: 6,
        name: "optical disk",
        version: "1.0"
    }, {
        emoji: "📀",
        category: 6,
        name: "dvd",
        version: "1.0"
    }, {
        emoji: "🧮",
        category: 6,
        name: "abacus",
        version: "11.0"
    }, {
        emoji: "🎥",
        category: 6,
        name: "movie camera",
        version: "1.0"
    }, {
        emoji: "🎞️",
        category: 6,
        name: "film frames",
        version: "1.0"
    }, {
        emoji: "📽️",
        category: 6,
        name: "film projector",
        version: "1.0"
    }, {
        emoji: "🎬",
        category: 6,
        name: "clapper board",
        version: "1.0"
    }, {
        emoji: "📺",
        category: 6,
        name: "television",
        version: "1.0"
    }, {
        emoji: "📷",
        category: 6,
        name: "camera",
        version: "1.0"
    }, {
        emoji: "📸",
        category: 6,
        name: "camera with flash",
        version: "1.0"
    }, {
        emoji: "📹",
        category: 6,
        name: "video camera",
        version: "1.0"
    }, {
        emoji: "📼",
        category: 6,
        name: "videocassette",
        version: "1.0"
    }, {
        emoji: "🔍",
        category: 6,
        name: "magnifying glass tilted left",
        version: "1.0"
    }, {
        emoji: "🔎",
        category: 6,
        name: "magnifying glass tilted right",
        version: "1.0"
    }, {
        emoji: "🕯️",
        category: 6,
        name: "candle",
        version: "1.0"
    }, {
        emoji: "💡",
        category: 6,
        name: "light bulb",
        version: "1.0"
    }, {
        emoji: "🔦",
        category: 6,
        name: "flashlight",
        version: "1.0"
    }, {
        emoji: "🏮",
        category: 6,
        name: "red paper lantern",
        version: "1.0"
    }, {
        emoji: "🪔",
        category: 6,
        name: "diya lamp",
        version: "12.0"
    }, {
        emoji: "📔",
        category: 6,
        name: "notebook with decorative cover",
        version: "1.0"
    }, {
        emoji: "📕",
        category: 6,
        name: "closed book",
        version: "1.0"
    }, {
        emoji: "📖",
        category: 6,
        name: "open book",
        version: "1.0"
    }, {
        emoji: "📗",
        category: 6,
        name: "green book",
        version: "1.0"
    }, {
        emoji: "📘",
        category: 6,
        name: "blue book",
        version: "1.0"
    }, {
        emoji: "📙",
        category: 6,
        name: "orange book",
        version: "1.0"
    }, {
        emoji: "📚",
        category: 6,
        name: "books",
        version: "1.0"
    }, {
        emoji: "📓",
        category: 6,
        name: "notebook",
        version: "1.0"
    }, {
        emoji: "📒",
        category: 6,
        name: "ledger",
        version: "1.0"
    }, {
        emoji: "📃",
        category: 6,
        name: "page with curl",
        version: "1.0"
    }, {
        emoji: "📜",
        category: 6,
        name: "scroll",
        version: "1.0"
    }, {
        emoji: "📄",
        category: 6,
        name: "page facing up",
        version: "1.0"
    }, {
        emoji: "📰",
        category: 6,
        name: "newspaper",
        version: "1.0"
    }, {
        emoji: "🗞️",
        category: 6,
        name: "rolled-up newspaper",
        version: "1.0"
    }, {
        emoji: "📑",
        category: 6,
        name: "bookmark tabs",
        version: "1.0"
    }, {
        emoji: "🔖",
        category: 6,
        name: "bookmark",
        version: "1.0"
    }, {
        emoji: "🏷️",
        category: 6,
        name: "label",
        version: "1.0"
    }, {
        emoji: "💰",
        category: 6,
        name: "money bag",
        version: "1.0"
    }, {
        emoji: "🪙",
        category: 6,
        name: "coin",
        version: "13.0"
    }, {
        emoji: "💴",
        category: 6,
        name: "yen banknote",
        version: "1.0"
    }, {
        emoji: "💵",
        category: 6,
        name: "dollar banknote",
        version: "1.0"
    }, {
        emoji: "💶",
        category: 6,
        name: "euro banknote",
        version: "1.0"
    }, {
        emoji: "💷",
        category: 6,
        name: "pound banknote",
        version: "1.0"
    }, {
        emoji: "💸",
        category: 6,
        name: "money with wings",
        version: "1.0"
    }, {
        emoji: "💳",
        category: 6,
        name: "credit card",
        version: "1.0"
    }, {
        emoji: "🧾",
        category: 6,
        name: "receipt",
        version: "11.0"
    }, {
        emoji: "💹",
        category: 6,
        name: "chart increasing with yen",
        version: "1.0"
    }, {
        emoji: "✉️",
        category: 6,
        name: "envelope",
        version: "1.0"
    }, {
        emoji: "📧",
        category: 6,
        name: "e-mail",
        version: "1.0"
    }, {
        emoji: "📨",
        category: 6,
        name: "incoming envelope",
        version: "1.0"
    }, {
        emoji: "📩",
        category: 6,
        name: "envelope with arrow",
        version: "1.0"
    }, {
        emoji: "📤",
        category: 6,
        name: "outbox tray",
        version: "1.0"
    }, {
        emoji: "📥",
        category: 6,
        name: "inbox tray",
        version: "1.0"
    }, {
        emoji: "📦",
        category: 6,
        name: "package",
        version: "1.0"
    }, {
        emoji: "📫",
        category: 6,
        name: "closed mailbox with raised flag",
        version: "1.0"
    }, {
        emoji: "📪",
        category: 6,
        name: "closed mailbox with lowered flag",
        version: "1.0"
    }, {
        emoji: "📬",
        category: 6,
        name: "open mailbox with raised flag",
        version: "1.0"
    }, {
        emoji: "📭",
        category: 6,
        name: "open mailbox with lowered flag",
        version: "1.0"
    }, {
        emoji: "📮",
        category: 6,
        name: "postbox",
        version: "1.0"
    }, {
        emoji: "🗳️",
        category: 6,
        name: "ballot box with ballot",
        version: "1.0"
    }, {
        emoji: "✏️",
        category: 6,
        name: "pencil",
        version: "1.0"
    }, {
        emoji: "✒️",
        category: 6,
        name: "black nib",
        version: "1.0"
    }, {
        emoji: "🖋️",
        category: 6,
        name: "fountain pen",
        version: "1.0"
    }, {
        emoji: "🖊️",
        category: 6,
        name: "pen",
        version: "1.0"
    }, {
        emoji: "🖌️",
        category: 6,
        name: "paintbrush",
        version: "1.0"
    }, {
        emoji: "🖍️",
        category: 6,
        name: "crayon",
        version: "1.0"
    }, {
        emoji: "📝",
        category: 6,
        name: "memo",
        version: "1.0"
    }, {
        emoji: "💼",
        category: 6,
        name: "briefcase",
        version: "1.0"
    }, {
        emoji: "📁",
        category: 6,
        name: "file folder",
        version: "1.0"
    }, {
        emoji: "📂",
        category: 6,
        name: "open file folder",
        version: "1.0"
    }, {
        emoji: "🗂️",
        category: 6,
        name: "card index dividers",
        version: "1.0"
    }, {
        emoji: "📅",
        category: 6,
        name: "calendar",
        version: "1.0"
    }, {
        emoji: "📆",
        category: 6,
        name: "tear-off calendar",
        version: "1.0"
    }, {
        emoji: "🗒️",
        category: 6,
        name: "spiral notepad",
        version: "1.0"
    }, {
        emoji: "🗓️",
        category: 6,
        name: "spiral calendar",
        version: "1.0"
    }, {
        emoji: "📇",
        category: 6,
        name: "card index",
        version: "1.0"
    }, {
        emoji: "📈",
        category: 6,
        name: "chart increasing",
        version: "1.0"
    }, {
        emoji: "📉",
        category: 6,
        name: "chart decreasing",
        version: "1.0"
    }, {
        emoji: "📊",
        category: 6,
        name: "bar chart",
        version: "1.0"
    }, {
        emoji: "📋",
        category: 6,
        name: "clipboard",
        version: "1.0"
    }, {
        emoji: "📌",
        category: 6,
        name: "pushpin",
        version: "1.0"
    }, {
        emoji: "📍",
        category: 6,
        name: "round pushpin",
        version: "1.0"
    }, {
        emoji: "📎",
        category: 6,
        name: "paperclip",
        version: "1.0"
    }, {
        emoji: "🖇️",
        category: 6,
        name: "linked paperclips",
        version: "1.0"
    }, {
        emoji: "📏",
        category: 6,
        name: "straight ruler",
        version: "1.0"
    }, {
        emoji: "📐",
        category: 6,
        name: "triangular ruler",
        version: "1.0"
    }, {
        emoji: "✂️",
        category: 6,
        name: "scissors",
        version: "1.0"
    }, {
        emoji: "🗃️",
        category: 6,
        name: "card file box",
        version: "1.0"
    }, {
        emoji: "🗄️",
        category: 6,
        name: "file cabinet",
        version: "1.0"
    }, {
        emoji: "🗑️",
        category: 6,
        name: "wastebasket",
        version: "1.0"
    }, {
        emoji: "🔒",
        category: 6,
        name: "locked",
        version: "1.0"
    }, {
        emoji: "🔓",
        category: 6,
        name: "unlocked",
        version: "1.0"
    }, {
        emoji: "🔏",
        category: 6,
        name: "locked with pen",
        version: "1.0"
    }, {
        emoji: "🔐",
        category: 6,
        name: "locked with key",
        version: "1.0"
    }, {
        emoji: "🔑",
        category: 6,
        name: "key",
        version: "1.0"
    }, {
        emoji: "🗝️",
        category: 6,
        name: "old key",
        version: "1.0"
    }, {
        emoji: "🔨",
        category: 6,
        name: "hammer",
        version: "1.0"
    }, {
        emoji: "🪓",
        category: 6,
        name: "axe",
        version: "12.0"
    }, {
        emoji: "⛏️",
        category: 6,
        name: "pick",
        version: "1.0"
    }, {
        emoji: "⚒️",
        category: 6,
        name: "hammer and pick",
        version: "1.0"
    }, {
        emoji: "🛠️",
        category: 6,
        name: "hammer and wrench",
        version: "1.0"
    }, {
        emoji: "🗡️",
        category: 6,
        name: "dagger",
        version: "1.0"
    }, {
        emoji: "⚔️",
        category: 6,
        name: "crossed swords",
        version: "1.0"
    }, {
        emoji: "🔫",
        category: 6,
        name: "pistol",
        version: "1.0"
    }, {
        emoji: "🪃",
        category: 6,
        name: "boomerang",
        version: "13.0"
    }, {
        emoji: "🏹",
        category: 6,
        name: "bow and arrow",
        version: "1.0"
    }, {
        emoji: "🛡️",
        category: 6,
        name: "shield",
        version: "1.0"
    }, {
        emoji: "🪚",
        category: 6,
        name: "carpentry saw",
        version: "13.0"
    }, {
        emoji: "🔧",
        category: 6,
        name: "wrench",
        version: "1.0"
    }, {
        emoji: "🪛",
        category: 6,
        name: "screwdriver",
        version: "13.0"
    }, {
        emoji: "🔩",
        category: 6,
        name: "nut and bolt",
        version: "1.0"
    }, {
        emoji: "⚙️",
        category: 6,
        name: "gear",
        version: "1.0"
    }, {
        emoji: "🗜️",
        category: 6,
        name: "clamp",
        version: "1.0"
    }, {
        emoji: "⚖️",
        category: 6,
        name: "balance scale",
        version: "1.0"
    }, {
        emoji: "🦯",
        category: 6,
        name: "white cane",
        version: "12.0"
    }, {
        emoji: "🔗",
        category: 6,
        name: "link",
        version: "1.0"
    }, {
        emoji: "⛓️",
        category: 6,
        name: "chains",
        version: "1.0"
    }, {
        emoji: "🪝",
        category: 6,
        name: "hook",
        version: "13.0"
    }, {
        emoji: "🧰",
        category: 6,
        name: "toolbox",
        version: "11.0"
    }, {
        emoji: "🧲",
        category: 6,
        name: "magnet",
        version: "11.0"
    }, {
        emoji: "🪜",
        category: 6,
        name: "ladder",
        version: "13.0"
    }, {
        emoji: "⚗️",
        category: 6,
        name: "alembic",
        version: "1.0"
    }, {
        emoji: "🧪",
        category: 6,
        name: "test tube",
        version: "11.0"
    }, {
        emoji: "🧫",
        category: 6,
        name: "petri dish",
        version: "11.0"
    }, {
        emoji: "🧬",
        category: 6,
        name: "dna",
        version: "11.0"
    }, {
        emoji: "🔬",
        category: 6,
        name: "microscope",
        version: "1.0"
    }, {
        emoji: "🔭",
        category: 6,
        name: "telescope",
        version: "1.0"
    }, {
        emoji: "📡",
        category: 6,
        name: "satellite antenna",
        version: "1.0"
    }, {
        emoji: "💉",
        category: 6,
        name: "syringe",
        version: "1.0"
    }, {
        emoji: "🩸",
        category: 6,
        name: "drop of blood",
        version: "12.0"
    }, {
        emoji: "💊",
        category: 6,
        name: "pill",
        version: "1.0"
    }, {
        emoji: "🩹",
        category: 6,
        name: "adhesive bandage",
        version: "12.0"
    }, {
        emoji: "🩺",
        category: 6,
        name: "stethoscope",
        version: "12.0"
    }, {
        emoji: "🚪",
        category: 6,
        name: "door",
        version: "1.0"
    }, {
        emoji: "🛗",
        category: 6,
        name: "elevator",
        version: "13.0"
    }, {
        emoji: "🪞",
        category: 6,
        name: "mirror",
        version: "13.0"
    }, {
        emoji: "🪟",
        category: 6,
        name: "window",
        version: "13.0"
    }, {
        emoji: "🛏️",
        category: 6,
        name: "bed",
        version: "1.0"
    }, {
        emoji: "🛋️",
        category: 6,
        name: "couch and lamp",
        version: "1.0"
    }, {
        emoji: "🪑",
        category: 6,
        name: "chair",
        version: "12.0"
    }, {
        emoji: "🚽",
        category: 6,
        name: "toilet",
        version: "1.0"
    }, {
        emoji: "🪠",
        category: 6,
        name: "plunger",
        version: "13.0"
    }, {
        emoji: "🚿",
        category: 6,
        name: "shower",
        version: "1.0"
    }, {
        emoji: "🛁",
        category: 6,
        name: "bathtub",
        version: "1.0"
    }, {
        emoji: "🪤",
        category: 6,
        name: "mouse trap",
        version: "13.0"
    }, {
        emoji: "🪒",
        category: 6,
        name: "razor",
        version: "12.0"
    }, {
        emoji: "🧴",
        category: 6,
        name: "lotion bottle",
        version: "11.0"
    }, {
        emoji: "🧷",
        category: 6,
        name: "safety pin",
        version: "11.0"
    }, {
        emoji: "🧹",
        category: 6,
        name: "broom",
        version: "11.0"
    }, {
        emoji: "🧺",
        category: 6,
        name: "basket",
        version: "11.0"
    }, {
        emoji: "🧻",
        category: 6,
        name: "roll of paper",
        version: "11.0"
    }, {
        emoji: "🪣",
        category: 6,
        name: "bucket",
        version: "13.0"
    }, {
        emoji: "🧼",
        category: 6,
        name: "soap",
        version: "11.0"
    }, {
        emoji: "🪥",
        category: 6,
        name: "toothbrush",
        version: "13.0"
    }, {
        emoji: "🧽",
        category: 6,
        name: "sponge",
        version: "11.0"
    }, {
        emoji: "🧯",
        category: 6,
        name: "fire extinguisher",
        version: "11.0"
    }, {
        emoji: "🛒",
        category: 6,
        name: "shopping cart",
        version: "3.0"
    }, {
        emoji: "🚬",
        category: 6,
        name: "cigarette",
        version: "1.0"
    }, {
        emoji: "⚰️",
        category: 6,
        name: "coffin",
        version: "1.0"
    }, {
        emoji: "🪦",
        category: 6,
        name: "headstone",
        version: "13.0"
    }, {
        emoji: "⚱️",
        category: 6,
        name: "funeral urn",
        version: "1.0"
    }, {
        emoji: "🗿",
        category: 6,
        name: "moai",
        version: "1.0"
    }, {
        emoji: "🪧",
        category: 6,
        name: "placard",
        version: "13.0"
    }, {
        emoji: "🏧",
        category: 7,
        name: "ATM sign",
        version: "1.0"
    }, {
        emoji: "🚮",
        category: 7,
        name: "litter in bin sign",
        version: "1.0"
    }, {
        emoji: "🚰",
        category: 7,
        name: "potable water",
        version: "1.0"
    }, {
        emoji: "♿",
        category: 7,
        name: "wheelchair symbol",
        version: "1.0"
    }, {
        emoji: "🚹",
        category: 7,
        name: "men’s room",
        version: "1.0"
    }, {
        emoji: "🚺",
        category: 7,
        name: "women’s room",
        version: "1.0"
    }, {
        emoji: "🚻",
        category: 7,
        name: "restroom",
        version: "1.0"
    }, {
        emoji: "🚼",
        category: 7,
        name: "baby symbol",
        version: "1.0"
    }, {
        emoji: "🚾",
        category: 7,
        name: "water closet",
        version: "1.0"
    }, {
        emoji: "🛂",
        category: 7,
        name: "passport control",
        version: "1.0"
    }, {
        emoji: "🛃",
        category: 7,
        name: "customs",
        version: "1.0"
    }, {
        emoji: "🛄",
        category: 7,
        name: "baggage claim",
        version: "1.0"
    }, {
        emoji: "🛅",
        category: 7,
        name: "left luggage",
        version: "1.0"
    }, {
        emoji: "⚠️",
        category: 7,
        name: "warning",
        version: "1.0"
    }, {
        emoji: "🚸",
        category: 7,
        name: "children crossing",
        version: "1.0"
    }, {
        emoji: "⛔",
        category: 7,
        name: "no entry",
        version: "1.0"
    }, {
        emoji: "🚫",
        category: 7,
        name: "prohibited",
        version: "1.0"
    }, {
        emoji: "🚳",
        category: 7,
        name: "no bicycles",
        version: "1.0"
    }, {
        emoji: "🚭",
        category: 7,
        name: "no smoking",
        version: "1.0"
    }, {
        emoji: "🚯",
        category: 7,
        name: "no littering",
        version: "1.0"
    }, {
        emoji: "🚱",
        category: 7,
        name: "non-potable water",
        version: "1.0"
    }, {
        emoji: "🚷",
        category: 7,
        name: "no pedestrians",
        version: "1.0"
    }, {
        emoji: "📵",
        category: 7,
        name: "no mobile phones",
        version: "1.0"
    }, {
        emoji: "🔞",
        category: 7,
        name: "no one under eighteen",
        version: "1.0"
    }, {
        emoji: "☢️",
        category: 7,
        name: "radioactive",
        version: "1.0"
    }, {
        emoji: "☣️",
        category: 7,
        name: "biohazard",
        version: "1.0"
    }, {
        emoji: "⬆️",
        category: 7,
        name: "up arrow",
        version: "1.0"
    }, {
        emoji: "↗️",
        category: 7,
        name: "up-right arrow",
        version: "1.0"
    }, {
        emoji: "➡️",
        category: 7,
        name: "right arrow",
        version: "1.0"
    }, {
        emoji: "↘️",
        category: 7,
        name: "down-right arrow",
        version: "1.0"
    }, {
        emoji: "⬇️",
        category: 7,
        name: "down arrow",
        version: "1.0"
    }, {
        emoji: "↙️",
        category: 7,
        name: "down-left arrow",
        version: "1.0"
    }, {
        emoji: "⬅️",
        category: 7,
        name: "left arrow",
        version: "1.0"
    }, {
        emoji: "↖️",
        category: 7,
        name: "up-left arrow",
        version: "1.0"
    }, {
        emoji: "↕️",
        category: 7,
        name: "up-down arrow",
        version: "1.0"
    }, {
        emoji: "↔️",
        category: 7,
        name: "left-right arrow",
        version: "1.0"
    }, {
        emoji: "↩️",
        category: 7,
        name: "right arrow curving left",
        version: "1.0"
    }, {
        emoji: "↪️",
        category: 7,
        name: "left arrow curving right",
        version: "1.0"
    }, {
        emoji: "⤴️",
        category: 7,
        name: "right arrow curving up",
        version: "1.0"
    }, {
        emoji: "⤵️",
        category: 7,
        name: "right arrow curving down",
        version: "1.0"
    }, {
        emoji: "🔃",
        category: 7,
        name: "clockwise vertical arrows",
        version: "1.0"
    }, {
        emoji: "🔄",
        category: 7,
        name: "counterclockwise arrows button",
        version: "1.0"
    }, {
        emoji: "🔙",
        category: 7,
        name: "BACK arrow",
        version: "1.0"
    }, {
        emoji: "🔚",
        category: 7,
        name: "END arrow",
        version: "1.0"
    }, {
        emoji: "🔛",
        category: 7,
        name: "ON! arrow",
        version: "1.0"
    }, {
        emoji: "🔜",
        category: 7,
        name: "SOON arrow",
        version: "1.0"
    }, {
        emoji: "🔝",
        category: 7,
        name: "TOP arrow",
        version: "1.0"
    }, {
        emoji: "🛐",
        category: 7,
        name: "place of worship",
        version: "1.0"
    }, {
        emoji: "⚛️",
        category: 7,
        name: "atom symbol",
        version: "1.0"
    }, {
        emoji: "🕉️",
        category: 7,
        name: "om",
        version: "1.0"
    }, {
        emoji: "✡️",
        category: 7,
        name: "star of David",
        version: "1.0"
    }, {
        emoji: "☸️",
        category: 7,
        name: "wheel of dharma",
        version: "1.0"
    }, {
        emoji: "☯️",
        category: 7,
        name: "yin yang",
        version: "1.0"
    }, {
        emoji: "✝️",
        category: 7,
        name: "latin cross",
        version: "1.0"
    }, {
        emoji: "☦️",
        category: 7,
        name: "orthodox cross",
        version: "1.0"
    }, {
        emoji: "☪️",
        category: 7,
        name: "star and crescent",
        version: "1.0"
    }, {
        emoji: "☮️",
        category: 7,
        name: "peace symbol",
        version: "1.0"
    }, {
        emoji: "🕎",
        category: 7,
        name: "menorah",
        version: "1.0"
    }, {
        emoji: "🔯",
        category: 7,
        name: "dotted six-pointed star",
        version: "1.0"
    }, {
        emoji: "♈",
        category: 7,
        name: "Aries",
        version: "1.0"
    }, {
        emoji: "♉",
        category: 7,
        name: "Taurus",
        version: "1.0"
    }, {
        emoji: "♊",
        category: 7,
        name: "Gemini",
        version: "1.0"
    }, {
        emoji: "♋",
        category: 7,
        name: "Cancer",
        version: "1.0"
    }, {
        emoji: "♌",
        category: 7,
        name: "Leo",
        version: "1.0"
    }, {
        emoji: "♍",
        category: 7,
        name: "Virgo",
        version: "1.0"
    }, {
        emoji: "♎",
        category: 7,
        name: "Libra",
        version: "1.0"
    }, {
        emoji: "♏",
        category: 7,
        name: "Scorpio",
        version: "1.0"
    }, {
        emoji: "♐",
        category: 7,
        name: "Sagittarius",
        version: "1.0"
    }, {
        emoji: "♑",
        category: 7,
        name: "Capricorn",
        version: "1.0"
    }, {
        emoji: "♒",
        category: 7,
        name: "Aquarius",
        version: "1.0"
    }, {
        emoji: "♓",
        category: 7,
        name: "Pisces",
        version: "1.0"
    }, {
        emoji: "⛎",
        category: 7,
        name: "Ophiuchus",
        version: "1.0"
    }, {
        emoji: "🔀",
        category: 7,
        name: "shuffle tracks button",
        version: "1.0"
    }, {
        emoji: "🔁",
        category: 7,
        name: "repeat button",
        version: "1.0"
    }, {
        emoji: "🔂",
        category: 7,
        name: "repeat single button",
        version: "1.0"
    }, {
        emoji: "▶️",
        category: 7,
        name: "play button",
        version: "1.0"
    }, {
        emoji: "⏩",
        category: 7,
        name: "fast-forward button",
        version: "1.0"
    }, {
        emoji: "⏭️",
        category: 7,
        name: "next track button",
        version: "1.0"
    }, {
        emoji: "⏯️",
        category: 7,
        name: "play or pause button",
        version: "1.0"
    }, {
        emoji: "◀️",
        category: 7,
        name: "reverse button",
        version: "1.0"
    }, {
        emoji: "⏪",
        category: 7,
        name: "fast reverse button",
        version: "1.0"
    }, {
        emoji: "⏮️",
        category: 7,
        name: "last track button",
        version: "1.0"
    }, {
        emoji: "🔼",
        category: 7,
        name: "upwards button",
        version: "1.0"
    }, {
        emoji: "⏫",
        category: 7,
        name: "fast up button",
        version: "1.0"
    }, {
        emoji: "🔽",
        category: 7,
        name: "downwards button",
        version: "1.0"
    }, {
        emoji: "⏬",
        category: 7,
        name: "fast down button",
        version: "1.0"
    }, {
        emoji: "⏸️",
        category: 7,
        name: "pause button",
        version: "1.0"
    }, {
        emoji: "⏹️",
        category: 7,
        name: "stop button",
        version: "1.0"
    }, {
        emoji: "⏺️",
        category: 7,
        name: "record button",
        version: "1.0"
    }, {
        emoji: "⏏️",
        category: 7,
        name: "eject button",
        version: "1.0"
    }, {
        emoji: "🎦",
        category: 7,
        name: "cinema",
        version: "1.0"
    }, {
        emoji: "🔅",
        category: 7,
        name: "dim button",
        version: "1.0"
    }, {
        emoji: "🔆",
        category: 7,
        name: "bright button",
        version: "1.0"
    }, {
        emoji: "📶",
        category: 7,
        name: "antenna bars",
        version: "1.0"
    }, {
        emoji: "📳",
        category: 7,
        name: "vibration mode",
        version: "1.0"
    }, {
        emoji: "📴",
        category: 7,
        name: "mobile phone off",
        version: "1.0"
    }, {
        emoji: "♀️",
        category: 7,
        name: "female sign",
        version: "4.0"
    }, {
        emoji: "♂️",
        category: 7,
        name: "male sign",
        version: "4.0"
    }, {
        emoji: "⚧️",
        category: 7,
        name: "transgender symbol",
        version: "13.0"
    }, {
        emoji: "✖️",
        category: 7,
        name: "multiply",
        version: "1.0"
    }, {
        emoji: "➕",
        category: 7,
        name: "plus",
        version: "1.0"
    }, {
        emoji: "➖",
        category: 7,
        name: "minus",
        version: "1.0"
    }, {
        emoji: "➗",
        category: 7,
        name: "divide",
        version: "1.0"
    }, {
        emoji: "♾️",
        category: 7,
        name: "infinity",
        version: "11.0"
    }, {
        emoji: "‼️",
        category: 7,
        name: "double exclamation mark",
        version: "1.0"
    }, {
        emoji: "⁉️",
        category: 7,
        name: "exclamation question mark",
        version: "1.0"
    }, {
        emoji: "❓",
        category: 7,
        name: "question mark",
        version: "1.0"
    }, {
        emoji: "❔",
        category: 7,
        name: "white question mark",
        version: "1.0"
    }, {
        emoji: "❕",
        category: 7,
        name: "white exclamation mark",
        version: "1.0"
    }, {
        emoji: "❗",
        category: 7,
        name: "exclamation mark",
        version: "1.0"
    }, {
        emoji: "〰️",
        category: 7,
        name: "wavy dash",
        version: "1.0"
    }, {
        emoji: "💱",
        category: 7,
        name: "currency exchange",
        version: "1.0"
    }, {
        emoji: "💲",
        category: 7,
        name: "heavy dollar sign",
        version: "1.0"
    }, {
        emoji: "⚕️",
        category: 7,
        name: "medical symbol",
        version: "4.0"
    }, {
        emoji: "♻️",
        category: 7,
        name: "recycling symbol",
        version: "1.0"
    }, {
        emoji: "⚜️",
        category: 7,
        name: "fleur-de-lis",
        version: "1.0"
    }, {
        emoji: "🔱",
        category: 7,
        name: "trident emblem",
        version: "1.0"
    }, {
        emoji: "📛",
        category: 7,
        name: "name badge",
        version: "1.0"
    }, {
        emoji: "🔰",
        category: 7,
        name: "Japanese symbol for beginner",
        version: "1.0"
    }, {
        emoji: "⭕",
        category: 7,
        name: "hollow red circle",
        version: "1.0"
    }, {
        emoji: "✅",
        category: 7,
        name: "check mark button",
        version: "1.0"
    }, {
        emoji: "☑️",
        category: 7,
        name: "check box with check",
        version: "1.0"
    }, {
        emoji: "✔️",
        category: 7,
        name: "check mark",
        version: "1.0"
    }, {
        emoji: "❌",
        category: 7,
        name: "cross mark",
        version: "1.0"
    }, {
        emoji: "❎",
        category: 7,
        name: "cross mark button",
        version: "1.0"
    }, {
        emoji: "➰",
        category: 7,
        name: "curly loop",
        version: "1.0"
    }, {
        emoji: "➿",
        category: 7,
        name: "double curly loop",
        version: "1.0"
    }, {
        emoji: "〽️",
        category: 7,
        name: "part alternation mark",
        version: "1.0"
    }, {
        emoji: "✳️",
        category: 7,
        name: "eight-spoked asterisk",
        version: "1.0"
    }, {
        emoji: "✴️",
        category: 7,
        name: "eight-pointed star",
        version: "1.0"
    }, {
        emoji: "❇️",
        category: 7,
        name: "sparkle",
        version: "1.0"
    }, {
        emoji: "©️",
        category: 7,
        name: "copyright",
        version: "1.0"
    }, {
        emoji: "®️",
        category: 7,
        name: "registered",
        version: "1.0"
    }, {
        emoji: "™️",
        category: 7,
        name: "trade mark",
        version: "1.0"
    }, {
        emoji: "#️⃣",
        category: 7,
        name: "keycap: #",
        version: "1.0"
    }, {
        emoji: "*️⃣",
        category: 7,
        name: "keycap: *",
        version: "2.0"
    }, {
        emoji: "0️⃣",
        category: 7,
        name: "keycap: 0",
        version: "1.0"
    }, {
        emoji: "1️⃣",
        category: 7,
        name: "keycap: 1",
        version: "1.0"
    }, {
        emoji: "2️⃣",
        category: 7,
        name: "keycap: 2",
        version: "1.0"
    }, {
        emoji: "3️⃣",
        category: 7,
        name: "keycap: 3",
        version: "1.0"
    }, {
        emoji: "4️⃣",
        category: 7,
        name: "keycap: 4",
        version: "1.0"
    }, {
        emoji: "5️⃣",
        category: 7,
        name: "keycap: 5",
        version: "1.0"
    }, {
        emoji: "6️⃣",
        category: 7,
        name: "keycap: 6",
        version: "1.0"
    }, {
        emoji: "7️⃣",
        category: 7,
        name: "keycap: 7",
        version: "1.0"
    }, {
        emoji: "8️⃣",
        category: 7,
        name: "keycap: 8",
        version: "1.0"
    }, {
        emoji: "9️⃣",
        category: 7,
        name: "keycap: 9",
        version: "1.0"
    }, {
        emoji: "🔟",
        category: 7,
        name: "keycap: 10",
        version: "1.0"
    }, {
        emoji: "🔠",
        category: 7,
        name: "input latin uppercase",
        version: "1.0"
    }, {
        emoji: "🔡",
        category: 7,
        name: "input latin lowercase",
        version: "1.0"
    }, {
        emoji: "🔢",
        category: 7,
        name: "input numbers",
        version: "1.0"
    }, {
        emoji: "🔣",
        category: 7,
        name: "input symbols",
        version: "1.0"
    }, {
        emoji: "🔤",
        category: 7,
        name: "input latin letters",
        version: "1.0"
    }, {
        emoji: "🅰️",
        category: 7,
        name: "A button (blood type)",
        version: "1.0"
    }, {
        emoji: "🆎",
        category: 7,
        name: "AB button (blood type)",
        version: "1.0"
    }, {
        emoji: "🅱️",
        category: 7,
        name: "B button (blood type)",
        version: "1.0"
    }, {
        emoji: "🆑",
        category: 7,
        name: "CL button",
        version: "1.0"
    }, {
        emoji: "🆒",
        category: 7,
        name: "COOL button",
        version: "1.0"
    }, {
        emoji: "🆓",
        category: 7,
        name: "FREE button",
        version: "1.0"
    }, {
        emoji: "ℹ️",
        category: 7,
        name: "information",
        version: "1.0"
    }, {
        emoji: "🆔",
        category: 7,
        name: "ID button",
        version: "1.0"
    }, {
        emoji: "Ⓜ️",
        category: 7,
        name: "circled M",
        version: "1.0"
    }, {
        emoji: "🆕",
        category: 7,
        name: "NEW button",
        version: "1.0"
    }, {
        emoji: "🆖",
        category: 7,
        name: "NG button",
        version: "1.0"
    }, {
        emoji: "🅾️",
        category: 7,
        name: "O button (blood type)",
        version: "1.0"
    }, {
        emoji: "🆗",
        category: 7,
        name: "OK button",
        version: "1.0"
    }, {
        emoji: "🅿️",
        category: 7,
        name: "P button",
        version: "1.0"
    }, {
        emoji: "🆘",
        category: 7,
        name: "SOS button",
        version: "1.0"
    }, {
        emoji: "🆙",
        category: 7,
        name: "UP! button",
        version: "1.0"
    }, {
        emoji: "🆚",
        category: 7,
        name: "VS button",
        version: "1.0"
    }, {
        emoji: "🈁",
        category: 7,
        name: "Japanese “here” button",
        version: "1.0"
    }, {
        emoji: "🈂️",
        category: 7,
        name: "Japanese “service charge” button",
        version: "1.0"
    }, {
        emoji: "🈷️",
        category: 7,
        name: "Japanese “monthly amount” button",
        version: "1.0"
    }, {
        emoji: "🈶",
        category: 7,
        name: "Japanese “not free of charge” button",
        version: "1.0"
    }, {
        emoji: "🈯",
        category: 7,
        name: "Japanese “reserved” button",
        version: "1.0"
    }, {
        emoji: "🉐",
        category: 7,
        name: "Japanese “bargain” button",
        version: "1.0"
    }, {
        emoji: "🈹",
        category: 7,
        name: "Japanese “discount” button",
        version: "1.0"
    }, {
        emoji: "🈚",
        category: 7,
        name: "Japanese “free of charge” button",
        version: "1.0"
    }, {
        emoji: "🈲",
        category: 7,
        name: "Japanese “prohibited” button",
        version: "1.0"
    }, {
        emoji: "🉑",
        category: 7,
        name: "Japanese “acceptable” button",
        version: "1.0"
    }, {
        emoji: "🈸",
        category: 7,
        name: "Japanese “application” button",
        version: "1.0"
    }, {
        emoji: "🈴",
        category: 7,
        name: "Japanese “passing grade” button",
        version: "1.0"
    }, {
        emoji: "🈳",
        category: 7,
        name: "Japanese “vacancy” button",
        version: "1.0"
    }, {
        emoji: "㊗️",
        category: 7,
        name: "Japanese “congratulations” button",
        version: "1.0"
    }, {
        emoji: "㊙️",
        category: 7,
        name: "Japanese “secret” button",
        version: "1.0"
    }, {
        emoji: "🈺",
        category: 7,
        name: "Japanese “open for business” button",
        version: "1.0"
    }, {
        emoji: "🈵",
        category: 7,
        name: "Japanese “no vacancy” button",
        version: "1.0"
    }, {
        emoji: "🔴",
        category: 7,
        name: "red circle",
        version: "1.0"
    }, {
        emoji: "🟠",
        category: 7,
        name: "orange circle",
        version: "12.0"
    }, {
        emoji: "🟡",
        category: 7,
        name: "yellow circle",
        version: "12.0"
    }, {
        emoji: "🟢",
        category: 7,
        name: "green circle",
        version: "12.0"
    }, {
        emoji: "🔵",
        category: 7,
        name: "blue circle",
        version: "1.0"
    }, {
        emoji: "🟣",
        category: 7,
        name: "purple circle",
        version: "12.0"
    }, {
        emoji: "🟤",
        category: 7,
        name: "brown circle",
        version: "12.0"
    }, {
        emoji: "⚫",
        category: 7,
        name: "black circle",
        version: "1.0"
    }, {
        emoji: "⚪",
        category: 7,
        name: "white circle",
        version: "1.0"
    }, {
        emoji: "🟥",
        category: 7,
        name: "red square",
        version: "12.0"
    }, {
        emoji: "🟧",
        category: 7,
        name: "orange square",
        version: "12.0"
    }, {
        emoji: "🟨",
        category: 7,
        name: "yellow square",
        version: "12.0"
    }, {
        emoji: "🟩",
        category: 7,
        name: "green square",
        version: "12.0"
    }, {
        emoji: "🟦",
        category: 7,
        name: "blue square",
        version: "12.0"
    }, {
        emoji: "🟪",
        category: 7,
        name: "purple square",
        version: "12.0"
    }, {
        emoji: "🟫",
        category: 7,
        name: "brown square",
        version: "12.0"
    }, {
        emoji: "⬛",
        category: 7,
        name: "black large square",
        version: "1.0"
    }, {
        emoji: "⬜",
        category: 7,
        name: "white large square",
        version: "1.0"
    }, {
        emoji: "◼️",
        category: 7,
        name: "black medium square",
        version: "1.0"
    }, {
        emoji: "◻️",
        category: 7,
        name: "white medium square",
        version: "1.0"
    }, {
        emoji: "◾",
        category: 7,
        name: "black medium-small square",
        version: "1.0"
    }, {
        emoji: "◽",
        category: 7,
        name: "white medium-small square",
        version: "1.0"
    }, {
        emoji: "▪️",
        category: 7,
        name: "black small square",
        version: "1.0"
    }, {
        emoji: "▫️",
        category: 7,
        name: "white small square",
        version: "1.0"
    }, {
        emoji: "🔶",
        category: 7,
        name: "large orange diamond",
        version: "1.0"
    }, {
        emoji: "🔷",
        category: 7,
        name: "large blue diamond",
        version: "1.0"
    }, {
        emoji: "🔸",
        category: 7,
        name: "small orange diamond",
        version: "1.0"
    }, {
        emoji: "🔹",
        category: 7,
        name: "small blue diamond",
        version: "1.0"
    }, {
        emoji: "🔺",
        category: 7,
        name: "red triangle pointed up",
        version: "1.0"
    }, {
        emoji: "🔻",
        category: 7,
        name: "red triangle pointed down",
        version: "1.0"
    }, {
        emoji: "💠",
        category: 7,
        name: "diamond with a dot",
        version: "1.0"
    }, {
        emoji: "🔘",
        category: 7,
        name: "radio button",
        version: "1.0"
    }, {
        emoji: "🔳",
        category: 7,
        name: "white square button",
        version: "1.0"
    }, {
        emoji: "🔲",
        category: 7,
        name: "black square button",
        version: "1.0"
    }, {
        emoji: "🏁",
        category: 8,
        name: "chequered flag",
        version: "1.0"
    }, {
        emoji: "🚩",
        category: 8,
        name: "triangular flag",
        version: "1.0"
    }, {
        emoji: "🎌",
        category: 8,
        name: "crossed flags",
        version: "1.0"
    }, {
        emoji: "🏴",
        category: 8,
        name: "black flag",
        version: "1.0"
    }, {
        emoji: "🏳️",
        category: 8,
        name: "white flag",
        version: "1.0"
    }, {
        emoji: "🏳️‍🌈",
        category: 8,
        name: "rainbow flag",
        version: "4.0"
    }, {
        emoji: "🏳️‍⚧️",
        category: 8,
        name: "transgender flag",
        version: "13.0"
    }, {
        emoji: "🏴‍☠️",
        category: 8,
        name: "pirate flag",
        version: "11.0"
    }, {
        emoji: "🇦🇨",
        category: 8,
        name: "flag: Ascension Island",
        version: "2.0"
    }, {
        emoji: "🇦🇩",
        category: 8,
        name: "flag: Andorra",
        version: "2.0"
    }, {
        emoji: "🇦🇪",
        category: 8,
        name: "flag: United Arab Emirates",
        version: "2.0"
    }, {
        emoji: "🇦🇫",
        category: 8,
        name: "flag: Afghanistan",
        version: "2.0"
    }, {
        emoji: "🇦🇬",
        category: 8,
        name: "flag: Antigua & Barbuda",
        version: "2.0"
    }, {
        emoji: "🇦🇮",
        category: 8,
        name: "flag: Anguilla",
        version: "2.0"
    }, {
        emoji: "🇦🇱",
        category: 8,
        name: "flag: Albania",
        version: "2.0"
    }, {
        emoji: "🇦🇲",
        category: 8,
        name: "flag: Armenia",
        version: "2.0"
    }, {
        emoji: "🇦🇴",
        category: 8,
        name: "flag: Angola",
        version: "2.0"
    }, {
        emoji: "🇦🇶",
        category: 8,
        name: "flag: Antarctica",
        version: "2.0"
    }, {
        emoji: "🇦🇷",
        category: 8,
        name: "flag: Argentina",
        version: "2.0"
    }, {
        emoji: "🇦🇸",
        category: 8,
        name: "flag: American Samoa",
        version: "2.0"
    }, {
        emoji: "🇦🇹",
        category: 8,
        name: "flag: Austria",
        version: "2.0"
    }, {
        emoji: "🇦🇺",
        category: 8,
        name: "flag: Australia",
        version: "2.0"
    }, {
        emoji: "🇦🇼",
        category: 8,
        name: "flag: Aruba",
        version: "2.0"
    }, {
        emoji: "🇦🇽",
        category: 8,
        name: "flag: Åland Islands",
        version: "2.0"
    }, {
        emoji: "🇦🇿",
        category: 8,
        name: "flag: Azerbaijan",
        version: "2.0"
    }, {
        emoji: "🇧🇦",
        category: 8,
        name: "flag: Bosnia & Herzegovina",
        version: "2.0"
    }, {
        emoji: "🇧🇧",
        category: 8,
        name: "flag: Barbados",
        version: "2.0"
    }, {
        emoji: "🇧🇩",
        category: 8,
        name: "flag: Bangladesh",
        version: "2.0"
    }, {
        emoji: "🇧🇪",
        category: 8,
        name: "flag: Belgium",
        version: "2.0"
    }, {
        emoji: "🇧🇫",
        category: 8,
        name: "flag: Burkina Faso",
        version: "2.0"
    }, {
        emoji: "🇧🇬",
        category: 8,
        name: "flag: Bulgaria",
        version: "2.0"
    }, {
        emoji: "🇧🇭",
        category: 8,
        name: "flag: Bahrain",
        version: "2.0"
    }, {
        emoji: "🇧🇮",
        category: 8,
        name: "flag: Burundi",
        version: "2.0"
    }, {
        emoji: "🇧🇯",
        category: 8,
        name: "flag: Benin",
        version: "2.0"
    }, {
        emoji: "🇧🇱",
        category: 8,
        name: "flag: St. Barthélemy",
        version: "2.0"
    }, {
        emoji: "🇧🇲",
        category: 8,
        name: "flag: Bermuda",
        version: "2.0"
    }, {
        emoji: "🇧🇳",
        category: 8,
        name: "flag: Brunei",
        version: "2.0"
    }, {
        emoji: "🇧🇴",
        category: 8,
        name: "flag: Bolivia",
        version: "2.0"
    }, {
        emoji: "🇧🇶",
        category: 8,
        name: "flag: Caribbean Netherlands",
        version: "2.0"
    }, {
        emoji: "🇧🇷",
        category: 8,
        name: "flag: Brazil",
        version: "2.0"
    }, {
        emoji: "🇧🇸",
        category: 8,
        name: "flag: Bahamas",
        version: "2.0"
    }, {
        emoji: "🇧🇹",
        category: 8,
        name: "flag: Bhutan",
        version: "2.0"
    }, {
        emoji: "🇧🇻",
        category: 8,
        name: "flag: Bouvet Island",
        version: "2.0"
    }, {
        emoji: "🇧🇼",
        category: 8,
        name: "flag: Botswana",
        version: "2.0"
    }, {
        emoji: "🇧🇾",
        category: 8,
        name: "flag: Belarus",
        version: "2.0"
    }, {
        emoji: "🇧🇿",
        category: 8,
        name: "flag: Belize",
        version: "2.0"
    }, {
        emoji: "🇨🇦",
        category: 8,
        name: "flag: Canada",
        version: "2.0"
    }, {
        emoji: "🇨🇨",
        category: 8,
        name: "flag: Cocos (Keeling) Islands",
        version: "2.0"
    }, {
        emoji: "🇨🇩",
        category: 8,
        name: "flag: Congo - Kinshasa",
        version: "2.0"
    }, {
        emoji: "🇨🇫",
        category: 8,
        name: "flag: Central African Republic",
        version: "2.0"
    }, {
        emoji: "🇨🇬",
        category: 8,
        name: "flag: Congo - Brazzaville",
        version: "2.0"
    }, {
        emoji: "🇨🇭",
        category: 8,
        name: "flag: Switzerland",
        version: "2.0"
    }, {
        emoji: "🇨🇮",
        category: 8,
        name: "flag: Côte d’Ivoire",
        version: "2.0"
    }, {
        emoji: "🇨🇰",
        category: 8,
        name: "flag: Cook Islands",
        version: "2.0"
    }, {
        emoji: "🇨🇱",
        category: 8,
        name: "flag: Chile",
        version: "2.0"
    }, {
        emoji: "🇨🇲",
        category: 8,
        name: "flag: Cameroon",
        version: "2.0"
    }, {
        emoji: "🇨🇳",
        category: 8,
        name: "flag: China",
        version: "1.0"
    }, {
        emoji: "🇨🇴",
        category: 8,
        name: "flag: Colombia",
        version: "2.0"
    }, {
        emoji: "🇨🇵",
        category: 8,
        name: "flag: Clipperton Island",
        version: "2.0"
    }, {
        emoji: "🇨🇷",
        category: 8,
        name: "flag: Costa Rica",
        version: "2.0"
    }, {
        emoji: "🇨🇺",
        category: 8,
        name: "flag: Cuba",
        version: "2.0"
    }, {
        emoji: "🇨🇻",
        category: 8,
        name: "flag: Cape Verde",
        version: "2.0"
    }, {
        emoji: "🇨🇼",
        category: 8,
        name: "flag: Curaçao",
        version: "2.0"
    }, {
        emoji: "🇨🇽",
        category: 8,
        name: "flag: Christmas Island",
        version: "2.0"
    }, {
        emoji: "🇨🇾",
        category: 8,
        name: "flag: Cyprus",
        version: "2.0"
    }, {
        emoji: "🇨🇿",
        category: 8,
        name: "flag: Czechia",
        version: "2.0"
    }, {
        emoji: "🇩🇪",
        category: 8,
        name: "flag: Germany",
        version: "1.0"
    }, {
        emoji: "🇩🇬",
        category: 8,
        name: "flag: Diego Garcia",
        version: "2.0"
    }, {
        emoji: "🇩🇯",
        category: 8,
        name: "flag: Djibouti",
        version: "2.0"
    }, {
        emoji: "🇩🇰",
        category: 8,
        name: "flag: Denmark",
        version: "2.0"
    }, {
        emoji: "🇩🇲",
        category: 8,
        name: "flag: Dominica",
        version: "2.0"
    }, {
        emoji: "🇩🇴",
        category: 8,
        name: "flag: Dominican Republic",
        version: "2.0"
    }, {
        emoji: "🇩🇿",
        category: 8,
        name: "flag: Algeria",
        version: "2.0"
    }, {
        emoji: "🇪🇦",
        category: 8,
        name: "flag: Ceuta & Melilla",
        version: "2.0"
    }, {
        emoji: "🇪🇨",
        category: 8,
        name: "flag: Ecuador",
        version: "2.0"
    }, {
        emoji: "🇪🇪",
        category: 8,
        name: "flag: Estonia",
        version: "2.0"
    }, {
        emoji: "🇪🇬",
        category: 8,
        name: "flag: Egypt",
        version: "2.0"
    }, {
        emoji: "🇪🇭",
        category: 8,
        name: "flag: Western Sahara",
        version: "2.0"
    }, {
        emoji: "🇪🇷",
        category: 8,
        name: "flag: Eritrea",
        version: "2.0"
    }, {
        emoji: "🇪🇸",
        category: 8,
        name: "flag: Spain",
        version: "1.0"
    }, {
        emoji: "🇪🇹",
        category: 8,
        name: "flag: Ethiopia",
        version: "2.0"
    }, {
        emoji: "🇪🇺",
        category: 8,
        name: "flag: European Union",
        version: "2.0"
    }, {
        emoji: "🇫🇮",
        category: 8,
        name: "flag: Finland",
        version: "2.0"
    }, {
        emoji: "🇫🇯",
        category: 8,
        name: "flag: Fiji",
        version: "2.0"
    }, {
        emoji: "🇫🇰",
        category: 8,
        name: "flag: Falkland Islands",
        version: "2.0"
    }, {
        emoji: "🇫🇲",
        category: 8,
        name: "flag: Micronesia",
        version: "2.0"
    }, {
        emoji: "🇫🇴",
        category: 8,
        name: "flag: Faroe Islands",
        version: "2.0"
    }, {
        emoji: "🇫🇷",
        category: 8,
        name: "flag: France",
        version: "1.0"
    }, {
        emoji: "🇬🇦",
        category: 8,
        name: "flag: Gabon",
        version: "2.0"
    }, {
        emoji: "🇬🇧",
        category: 8,
        name: "flag: United Kingdom",
        version: "1.0"
    }, {
        emoji: "🇬🇩",
        category: 8,
        name: "flag: Grenada",
        version: "2.0"
    }, {
        emoji: "🇬🇪",
        category: 8,
        name: "flag: Georgia",
        version: "2.0"
    }, {
        emoji: "🇬🇫",
        category: 8,
        name: "flag: French Guiana",
        version: "2.0"
    }, {
        emoji: "🇬🇬",
        category: 8,
        name: "flag: Guernsey",
        version: "2.0"
    }, {
        emoji: "🇬🇭",
        category: 8,
        name: "flag: Ghana",
        version: "2.0"
    }, {
        emoji: "🇬🇮",
        category: 8,
        name: "flag: Gibraltar",
        version: "2.0"
    }, {
        emoji: "🇬🇱",
        category: 8,
        name: "flag: Greenland",
        version: "2.0"
    }, {
        emoji: "🇬🇲",
        category: 8,
        name: "flag: Gambia",
        version: "2.0"
    }, {
        emoji: "🇬🇳",
        category: 8,
        name: "flag: Guinea",
        version: "2.0"
    }, {
        emoji: "🇬🇵",
        category: 8,
        name: "flag: Guadeloupe",
        version: "2.0"
    }, {
        emoji: "🇬🇶",
        category: 8,
        name: "flag: Equatorial Guinea",
        version: "2.0"
    }, {
        emoji: "🇬🇷",
        category: 8,
        name: "flag: Greece",
        version: "2.0"
    }, {
        emoji: "🇬🇸",
        category: 8,
        name: "flag: South Georgia & South Sandwich Islands",
        version: "2.0"
    }, {
        emoji: "🇬🇹",
        category: 8,
        name: "flag: Guatemala",
        version: "2.0"
    }, {
        emoji: "🇬🇺",
        category: 8,
        name: "flag: Guam",
        version: "2.0"
    }, {
        emoji: "🇬🇼",
        category: 8,
        name: "flag: Guinea-Bissau",
        version: "2.0"
    }, {
        emoji: "🇬🇾",
        category: 8,
        name: "flag: Guyana",
        version: "2.0"
    }, {
        emoji: "🇭🇰",
        category: 8,
        name: "flag: Hong Kong SAR China",
        version: "2.0"
    }, {
        emoji: "🇭🇲",
        category: 8,
        name: "flag: Heard & McDonald Islands",
        version: "2.0"
    }, {
        emoji: "🇭🇳",
        category: 8,
        name: "flag: Honduras",
        version: "2.0"
    }, {
        emoji: "🇭🇷",
        category: 8,
        name: "flag: Croatia",
        version: "2.0"
    }, {
        emoji: "🇭🇹",
        category: 8,
        name: "flag: Haiti",
        version: "2.0"
    }, {
        emoji: "🇭🇺",
        category: 8,
        name: "flag: Hungary",
        version: "2.0"
    }, {
        emoji: "🇮🇨",
        category: 8,
        name: "flag: Canary Islands",
        version: "2.0"
    }, {
        emoji: "🇮🇩",
        category: 8,
        name: "flag: Indonesia",
        version: "2.0"
    }, {
        emoji: "🇮🇪",
        category: 8,
        name: "flag: Ireland",
        version: "2.0"
    }, {
        emoji: "🇮🇱",
        category: 8,
        name: "flag: Israel",
        version: "2.0"
    }, {
        emoji: "🇮🇲",
        category: 8,
        name: "flag: Isle of Man",
        version: "2.0"
    }, {
        emoji: "🇮🇳",
        category: 8,
        name: "flag: India",
        version: "2.0"
    }, {
        emoji: "🇮🇴",
        category: 8,
        name: "flag: British Indian Ocean Territory",
        version: "2.0"
    }, {
        emoji: "🇮🇶",
        category: 8,
        name: "flag: Iraq",
        version: "2.0"
    }, {
        emoji: "🇮🇷",
        category: 8,
        name: "flag: Iran",
        version: "2.0"
    }, {
        emoji: "🇮🇸",
        category: 8,
        name: "flag: Iceland",
        version: "2.0"
    }, {
        emoji: "🇮🇹",
        category: 8,
        name: "flag: Italy",
        version: "1.0"
    }, {
        emoji: "🇯🇪",
        category: 8,
        name: "flag: Jersey",
        version: "2.0"
    }, {
        emoji: "🇯🇲",
        category: 8,
        name: "flag: Jamaica",
        version: "2.0"
    }, {
        emoji: "🇯🇴",
        category: 8,
        name: "flag: Jordan",
        version: "2.0"
    }, {
        emoji: "🇯🇵",
        category: 8,
        name: "flag: Japan",
        version: "1.0"
    }, {
        emoji: "🇰🇪",
        category: 8,
        name: "flag: Kenya",
        version: "2.0"
    }, {
        emoji: "🇰🇬",
        category: 8,
        name: "flag: Kyrgyzstan",
        version: "2.0"
    }, {
        emoji: "🇰🇭",
        category: 8,
        name: "flag: Cambodia",
        version: "2.0"
    }, {
        emoji: "🇰🇮",
        category: 8,
        name: "flag: Kiribati",
        version: "2.0"
    }, {
        emoji: "🇰🇲",
        category: 8,
        name: "flag: Comoros",
        version: "2.0"
    }, {
        emoji: "🇰🇳",
        category: 8,
        name: "flag: St. Kitts & Nevis",
        version: "2.0"
    }, {
        emoji: "🇰🇵",
        category: 8,
        name: "flag: North Korea",
        version: "2.0"
    }, {
        emoji: "🇰🇷",
        category: 8,
        name: "flag: South Korea",
        version: "1.0"
    }, {
        emoji: "🇰🇼",
        category: 8,
        name: "flag: Kuwait",
        version: "2.0"
    }, {
        emoji: "🇰🇾",
        category: 8,
        name: "flag: Cayman Islands",
        version: "2.0"
    }, {
        emoji: "🇰🇿",
        category: 8,
        name: "flag: Kazakhstan",
        version: "2.0"
    }, {
        emoji: "🇱🇦",
        category: 8,
        name: "flag: Laos",
        version: "2.0"
    }, {
        emoji: "🇱🇧",
        category: 8,
        name: "flag: Lebanon",
        version: "2.0"
    }, {
        emoji: "🇱🇨",
        category: 8,
        name: "flag: St. Lucia",
        version: "2.0"
    }, {
        emoji: "🇱🇮",
        category: 8,
        name: "flag: Liechtenstein",
        version: "2.0"
    }, {
        emoji: "🇱🇰",
        category: 8,
        name: "flag: Sri Lanka",
        version: "2.0"
    }, {
        emoji: "🇱🇷",
        category: 8,
        name: "flag: Liberia",
        version: "2.0"
    }, {
        emoji: "🇱🇸",
        category: 8,
        name: "flag: Lesotho",
        version: "2.0"
    }, {
        emoji: "🇱🇹",
        category: 8,
        name: "flag: Lithuania",
        version: "2.0"
    }, {
        emoji: "🇱🇺",
        category: 8,
        name: "flag: Luxembourg",
        version: "2.0"
    }, {
        emoji: "🇱🇻",
        category: 8,
        name: "flag: Latvia",
        version: "2.0"
    }, {
        emoji: "🇱🇾",
        category: 8,
        name: "flag: Libya",
        version: "2.0"
    }, {
        emoji: "🇲🇦",
        category: 8,
        name: "flag: Morocco",
        version: "2.0"
    }, {
        emoji: "🇲🇨",
        category: 8,
        name: "flag: Monaco",
        version: "2.0"
    }, {
        emoji: "🇲🇩",
        category: 8,
        name: "flag: Moldova",
        version: "2.0"
    }, {
        emoji: "🇲🇪",
        category: 8,
        name: "flag: Montenegro",
        version: "2.0"
    }, {
        emoji: "🇲🇫",
        category: 8,
        name: "flag: St. Martin",
        version: "2.0"
    }, {
        emoji: "🇲🇬",
        category: 8,
        name: "flag: Madagascar",
        version: "2.0"
    }, {
        emoji: "🇲🇭",
        category: 8,
        name: "flag: Marshall Islands",
        version: "2.0"
    }, {
        emoji: "🇲🇰",
        category: 8,
        name: "flag: North Macedonia",
        version: "2.0"
    }, {
        emoji: "🇲🇱",
        category: 8,
        name: "flag: Mali",
        version: "2.0"
    }, {
        emoji: "🇲🇲",
        category: 8,
        name: "flag: Myanmar (Burma)",
        version: "2.0"
    }, {
        emoji: "🇲🇳",
        category: 8,
        name: "flag: Mongolia",
        version: "2.0"
    }, {
        emoji: "🇲🇴",
        category: 8,
        name: "flag: Macao SAR China",
        version: "2.0"
    }, {
        emoji: "🇲🇵",
        category: 8,
        name: "flag: Northern Mariana Islands",
        version: "2.0"
    }, {
        emoji: "🇲🇶",
        category: 8,
        name: "flag: Martinique",
        version: "2.0"
    }, {
        emoji: "🇲🇷",
        category: 8,
        name: "flag: Mauritania",
        version: "2.0"
    }, {
        emoji: "🇲🇸",
        category: 8,
        name: "flag: Montserrat",
        version: "2.0"
    }, {
        emoji: "🇲🇹",
        category: 8,
        name: "flag: Malta",
        version: "2.0"
    }, {
        emoji: "🇲🇺",
        category: 8,
        name: "flag: Mauritius",
        version: "2.0"
    }, {
        emoji: "🇲🇻",
        category: 8,
        name: "flag: Maldives",
        version: "2.0"
    }, {
        emoji: "🇲🇼",
        category: 8,
        name: "flag: Malawi",
        version: "2.0"
    }, {
        emoji: "🇲🇽",
        category: 8,
        name: "flag: Mexico",
        version: "2.0"
    }, {
        emoji: "🇲🇾",
        category: 8,
        name: "flag: Malaysia",
        version: "2.0"
    }, {
        emoji: "🇲🇿",
        category: 8,
        name: "flag: Mozambique",
        version: "2.0"
    }, {
        emoji: "🇳🇦",
        category: 8,
        name: "flag: Namibia",
        version: "2.0"
    }, {
        emoji: "🇳🇨",
        category: 8,
        name: "flag: New Caledonia",
        version: "2.0"
    }, {
        emoji: "🇳🇪",
        category: 8,
        name: "flag: Niger",
        version: "2.0"
    }, {
        emoji: "🇳🇫",
        category: 8,
        name: "flag: Norfolk Island",
        version: "2.0"
    }, {
        emoji: "🇳🇬",
        category: 8,
        name: "flag: Nigeria",
        version: "2.0"
    }, {
        emoji: "🇳🇮",
        category: 8,
        name: "flag: Nicaragua",
        version: "2.0"
    }, {
        emoji: "🇳🇱",
        category: 8,
        name: "flag: Netherlands",
        version: "2.0"
    }, {
        emoji: "🇳🇴",
        category: 8,
        name: "flag: Norway",
        version: "2.0"
    }, {
        emoji: "🇳🇵",
        category: 8,
        name: "flag: Nepal",
        version: "2.0"
    }, {
        emoji: "🇳🇷",
        category: 8,
        name: "flag: Nauru",
        version: "2.0"
    }, {
        emoji: "🇳🇺",
        category: 8,
        name: "flag: Niue",
        version: "2.0"
    }, {
        emoji: "🇳🇿",
        category: 8,
        name: "flag: New Zealand",
        version: "2.0"
    }, {
        emoji: "🇴🇲",
        category: 8,
        name: "flag: Oman",
        version: "2.0"
    }, {
        emoji: "🇵🇦",
        category: 8,
        name: "flag: Panama",
        version: "2.0"
    }, {
        emoji: "🇵🇪",
        category: 8,
        name: "flag: Peru",
        version: "2.0"
    }, {
        emoji: "🇵🇫",
        category: 8,
        name: "flag: French Polynesia",
        version: "2.0"
    }, {
        emoji: "🇵🇬",
        category: 8,
        name: "flag: Papua New Guinea",
        version: "2.0"
    }, {
        emoji: "🇵🇭",
        category: 8,
        name: "flag: Philippines",
        version: "2.0"
    }, {
        emoji: "🇵🇰",
        category: 8,
        name: "flag: Pakistan",
        version: "2.0"
    }, {
        emoji: "🇵🇱",
        category: 8,
        name: "flag: Poland",
        version: "2.0"
    }, {
        emoji: "🇵🇲",
        category: 8,
        name: "flag: St. Pierre & Miquelon",
        version: "2.0"
    }, {
        emoji: "🇵🇳",
        category: 8,
        name: "flag: Pitcairn Islands",
        version: "2.0"
    }, {
        emoji: "🇵🇷",
        category: 8,
        name: "flag: Puerto Rico",
        version: "2.0"
    }, {
        emoji: "🇵🇸",
        category: 8,
        name: "flag: Palestinian Territories",
        version: "2.0"
    }, {
        emoji: "🇵🇹",
        category: 8,
        name: "flag: Portugal",
        version: "2.0"
    }, {
        emoji: "🇵🇼",
        category: 8,
        name: "flag: Palau",
        version: "2.0"
    }, {
        emoji: "🇵🇾",
        category: 8,
        name: "flag: Paraguay",
        version: "2.0"
    }, {
        emoji: "🇶🇦",
        category: 8,
        name: "flag: Qatar",
        version: "2.0"
    }, {
        emoji: "🇷🇪",
        category: 8,
        name: "flag: Réunion",
        version: "2.0"
    }, {
        emoji: "🇷🇴",
        category: 8,
        name: "flag: Romania",
        version: "2.0"
    }, {
        emoji: "🇷🇸",
        category: 8,
        name: "flag: Serbia",
        version: "2.0"
    }, {
        emoji: "🇷🇺",
        category: 8,
        name: "flag: Russia",
        version: "1.0"
    }, {
        emoji: "🇷🇼",
        category: 8,
        name: "flag: Rwanda",
        version: "2.0"
    }, {
        emoji: "🇸🇦",
        category: 8,
        name: "flag: Saudi Arabia",
        version: "2.0"
    }, {
        emoji: "🇸🇧",
        category: 8,
        name: "flag: Solomon Islands",
        version: "2.0"
    }, {
        emoji: "🇸🇨",
        category: 8,
        name: "flag: Seychelles",
        version: "2.0"
    }, {
        emoji: "🇸🇩",
        category: 8,
        name: "flag: Sudan",
        version: "2.0"
    }, {
        emoji: "🇸🇪",
        category: 8,
        name: "flag: Sweden",
        version: "2.0"
    }, {
        emoji: "🇸🇬",
        category: 8,
        name: "flag: Singapore",
        version: "2.0"
    }, {
        emoji: "🇸🇭",
        category: 8,
        name: "flag: St. Helena",
        version: "2.0"
    }, {
        emoji: "🇸🇮",
        category: 8,
        name: "flag: Slovenia",
        version: "2.0"
    }, {
        emoji: "🇸🇯",
        category: 8,
        name: "flag: Svalbard & Jan Mayen",
        version: "2.0"
    }, {
        emoji: "🇸🇰",
        category: 8,
        name: "flag: Slovakia",
        version: "2.0"
    }, {
        emoji: "🇸🇱",
        category: 8,
        name: "flag: Sierra Leone",
        version: "2.0"
    }, {
        emoji: "🇸🇲",
        category: 8,
        name: "flag: San Marino",
        version: "2.0"
    }, {
        emoji: "🇸🇳",
        category: 8,
        name: "flag: Senegal",
        version: "2.0"
    }, {
        emoji: "🇸🇴",
        category: 8,
        name: "flag: Somalia",
        version: "2.0"
    }, {
        emoji: "🇸🇷",
        category: 8,
        name: "flag: Suriname",
        version: "2.0"
    }, {
        emoji: "🇸🇸",
        category: 8,
        name: "flag: South Sudan",
        version: "2.0"
    }, {
        emoji: "🇸🇹",
        category: 8,
        name: "flag: São Tomé & Príncipe",
        version: "2.0"
    }, {
        emoji: "🇸🇻",
        category: 8,
        name: "flag: El Salvador",
        version: "2.0"
    }, {
        emoji: "🇸🇽",
        category: 8,
        name: "flag: Sint Maarten",
        version: "2.0"
    }, {
        emoji: "🇸🇾",
        category: 8,
        name: "flag: Syria",
        version: "2.0"
    }, {
        emoji: "🇸🇿",
        category: 8,
        name: "flag: Eswatini",
        version: "2.0"
    }, {
        emoji: "🇹🇦",
        category: 8,
        name: "flag: Tristan da Cunha",
        version: "2.0"
    }, {
        emoji: "🇹🇨",
        category: 8,
        name: "flag: Turks & Caicos Islands",
        version: "2.0"
    }, {
        emoji: "🇹🇩",
        category: 8,
        name: "flag: Chad",
        version: "2.0"
    }, {
        emoji: "🇹🇫",
        category: 8,
        name: "flag: French Southern Territories",
        version: "2.0"
    }, {
        emoji: "🇹🇬",
        category: 8,
        name: "flag: Togo",
        version: "2.0"
    }, {
        emoji: "🇹🇭",
        category: 8,
        name: "flag: Thailand",
        version: "2.0"
    }, {
        emoji: "🇹🇯",
        category: 8,
        name: "flag: Tajikistan",
        version: "2.0"
    }, {
        emoji: "🇹🇰",
        category: 8,
        name: "flag: Tokelau",
        version: "2.0"
    }, {
        emoji: "🇹🇱",
        category: 8,
        name: "flag: Timor-Leste",
        version: "2.0"
    }, {
        emoji: "🇹🇲",
        category: 8,
        name: "flag: Turkmenistan",
        version: "2.0"
    }, {
        emoji: "🇹🇳",
        category: 8,
        name: "flag: Tunisia",
        version: "2.0"
    }, {
        emoji: "🇹🇴",
        category: 8,
        name: "flag: Tonga",
        version: "2.0"
    }, {
        emoji: "🇹🇷",
        category: 8,
        name: "flag: Turkey",
        version: "2.0"
    }, {
        emoji: "🇹🇹",
        category: 8,
        name: "flag: Trinidad & Tobago",
        version: "2.0"
    }, {
        emoji: "🇹🇻",
        category: 8,
        name: "flag: Tuvalu",
        version: "2.0"
    }, {
        emoji: "🇹🇼",
        category: 8,
        name: "flag: Taiwan",
        version: "2.0"
    }, {
        emoji: "🇹🇿",
        category: 8,
        name: "flag: Tanzania",
        version: "2.0"
    }, {
        emoji: "🇺🇦",
        category: 8,
        name: "flag: Ukraine",
        version: "2.0"
    }, {
        emoji: "🇺🇬",
        category: 8,
        name: "flag: Uganda",
        version: "2.0"
    }, {
        emoji: "🇺🇲",
        category: 8,
        name: "flag: U.S. Outlying Islands",
        version: "2.0"
    }, {
        emoji: "🇺🇳",
        category: 8,
        name: "flag: United Nations",
        version: "4.0"
    }, {
        emoji: "🇺🇸",
        category: 8,
        name: "flag: United States",
        version: "1.0"
    }, {
        emoji: "🇺🇾",
        category: 8,
        name: "flag: Uruguay",
        version: "2.0"
    }, {
        emoji: "🇺🇿",
        category: 8,
        name: "flag: Uzbekistan",
        version: "2.0"
    }, {
        emoji: "🇻🇦",
        category: 8,
        name: "flag: Vatican City",
        version: "2.0"
    }, {
        emoji: "🇻🇨",
        category: 8,
        name: "flag: St. Vincent & Grenadines",
        version: "2.0"
    }, {
        emoji: "🇻🇪",
        category: 8,
        name: "flag: Venezuela",
        version: "2.0"
    }, {
        emoji: "🇻🇬",
        category: 8,
        name: "flag: British Virgin Islands",
        version: "2.0"
    }, {
        emoji: "🇻🇮",
        category: 8,
        name: "flag: U.S. Virgin Islands",
        version: "2.0"
    }, {
        emoji: "🇻🇳",
        category: 8,
        name: "flag: Vietnam",
        version: "2.0"
    }, {
        emoji: "🇻🇺",
        category: 8,
        name: "flag: Vanuatu",
        version: "2.0"
    }, {
        emoji: "🇼🇫",
        category: 8,
        name: "flag: Wallis & Futuna",
        version: "2.0"
    }, {
        emoji: "🇼🇸",
        category: 8,
        name: "flag: Samoa",
        version: "2.0"
    }, {
        emoji: "🇽🇰",
        category: 8,
        name: "flag: Kosovo",
        version: "2.0"
    }, {
        emoji: "🇾🇪",
        category: 8,
        name: "flag: Yemen",
        version: "2.0"
    }, {
        emoji: "🇾🇹",
        category: 8,
        name: "flag: Mayotte",
        version: "2.0"
    }, {
        emoji: "🇿🇦",
        category: 8,
        name: "flag: South Africa",
        version: "2.0"
    }, {
        emoji: "🇿🇲",
        category: 8,
        name: "flag: Zambia",
        version: "2.0"
    }, {
        emoji: "🇿🇼",
        category: 8,
        name: "flag: Zimbabwe",
        version: "2.0"
    }, {
        emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        category: 8,
        name: "flag: England",
        version: "5.0"
    }, {
        emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        category: 8,
        name: "flag: Scotland",
        version: "5.0"
    }, {
        emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
        category: 8,
        name: "flag: Wales",
        version: "5.0"
    }]
};
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */
var Ce = /["'&<>]/
    , Ee = function(e) {
    var o, n = "" + e, i = Ce.exec(n);
    if (!i)
        return n;
    var a = ""
        , r = 0
        , t = 0;
    for (r = i.index; r < n.length; r++) {
        switch (n.charCodeAt(r)) {
            case 34:
                o = "&quot;";
                break;
            case 38:
                o = "&amp;";
                break;
            case 39:
                o = "&#39;";
                break;
            case 60:
                o = "&lt;";
                break;
            case 62:
                o = "&gt;";
                break;
            default:
                continue
        }
        t !== r && (a += n.substring(t, r)),
            t = r + 1,
            a += o
    }
    return t !== r ? a + n.substring(t, r) : a
};
const _e = "emoji-picker__emoji";
function ze(e, o) {
    const n = document.createElement(e);
    return o && (n.className = o),
        n
}
function Oe(e) {
    for (; e.firstChild; )
        e.removeChild(e.firstChild)
}
function Ie(e, o) {
    e.dataset.loaded || (e.dataset.custom ? function(e) {
        const o = ze("img", "emoji-picker__custom-emoji");
        e.dataset.emoji && (o.src = Ee(e.dataset.emoji),
            e.innerText = "",
            e.appendChild(o))
    }(e) : "twemoji" === o.style && function(e, o) {
        e.dataset.emoji && (e.innerHTML = ke.parse(e.dataset.emoji, o.twemojiOptions))
    }(e, o),
        e.dataset.loaded = "true",
        e.style.opacity = "1")
}
class Se {
    constructor(e, o) {
        this.events = e,
            this.options = o
    }
    render() {
        const e = ze("div", "emoji-picker__preview");
        return this.emoji = ze("div", "emoji-picker__preview-emoji"),
            e.appendChild(this.emoji),
            this.name = ze("div", "emoji-picker__preview-name"),
            e.appendChild(this.name),
            this.events.on("showPreview", (e=>this.showPreview(e))),
            this.events.on("hidePreview", (()=>this.hidePreview())),
            e
    }
    showPreview(e) {
        let o = e.emoji;
        e.custom ? o = `<img class="emoji-picker__custom-emoji" src="${Ee(e.emoji)}">` : "twemoji" === this.options.style && (o = ke.parse(e.emoji, this.options.twemojiOptions)),
            this.emoji.innerHTML = o,
            this.name.innerHTML = Ee(e.name)
    }
    hidePreview() {
        this.emoji.innerHTML = "",
            this.name.innerHTML = ""
    }
}
function Pe(e, o) {
    for (var n = 0; n < o.length; n++) {
        var i = o[n];
        i.enumerable = i.enumerable || !1,
            i.configurable = !0,
        "value"in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
    }
}
function Me(e, o, n) {
    return o in e ? Object.defineProperty(e, o, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[o] = n,
        e
}
function Ae(e) {
    for (var o = 1; o < arguments.length; o++) {
        var n = null != arguments[o] ? arguments[o] : {}
            , i = Object.keys(n);
        "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter((function(e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable
            }
        )))),
            i.forEach((function(o) {
                    Me(e, o, n[o])
                }
            ))
    }
    return e
}
function Le(e, o) {
    return function(e) {
        if (Array.isArray(e))
            return e
    }(e) || function(e, o) {
        var n = []
            , i = !0
            , a = !1
            , r = void 0;
        try {
            for (var t, s = e[Symbol.iterator](); !(i = (t = s.next()).done) && (n.push(t.value),
            !o || n.length !== o); i = !0)
                ;
        } catch (e) {
            a = !0,
                r = e
        } finally {
            try {
                i || null == s.return || s.return()
            } finally {
                if (a)
                    throw r
            }
        }
        return n
    }(e, o) || function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }()
}
var Te = function() {}
    , Ne = {}
    , Fe = {}
    , Be = {
    mark: Te,
    measure: Te
};
try {
    "undefined" != typeof window && (Ne = window),
    "undefined" != typeof document && (Fe = document),
    "undefined" != typeof MutationObserver && MutationObserver,
    "undefined" != typeof performance && (Be = performance)
} catch (e) {}
var De = (Ne.navigator || {}).userAgent
    , Re = void 0 === De ? "" : De
    , qe = Ne
    , Ve = Fe
    , He = Be
    , Ue = (qe.document,
!!Ve.documentElement && !!Ve.head && "function" == typeof Ve.addEventListener && "function" == typeof Ve.createElement)
    , We = (~Re.indexOf("MSIE") || Re.indexOf("Trident/"),
    function() {
        try {} catch (e) {
            return !1
        }
    }(),
    "group")
    , Ke = "primary"
    , Je = "secondary"
    , Ge = qe.FontAwesomeConfig || {};
if (Ve && "function" == typeof Ve.querySelector) {
    [["data-family-prefix", "familyPrefix"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]].forEach((function(e) {
            var o = Le(e, 2)
                , n = o[0]
                , i = o[1]
                , a = function(e) {
                return "" === e || "false" !== e && ("true" === e || e)
            }(function(e) {
                var o = Ve.querySelector("script[" + e + "]");
                if (o)
                    return o.getAttribute(e)
            }(n));
            null != a && (Ge[i] = a)
        }
    ))
}
var Xe = Ae({}, {
    familyPrefix: "fa",
    replacementClass: "svg-inline--fa",
    autoReplaceSvg: !0,
    autoAddCss: !0,
    autoA11y: !0,
    searchPseudoElements: !1,
    observeMutations: !0,
    mutateApproach: "async",
    keepOriginalSource: !0,
    measurePerformance: !1,
    showMissingIcons: !0
}, Ge);
Xe.autoReplaceSvg || (Xe.observeMutations = !1);
var Ye = Ae({}, Xe);
qe.FontAwesomeConfig = Ye;
var $e = qe || {};
$e.___FONT_AWESOME___ || ($e.___FONT_AWESOME___ = {}),
$e.___FONT_AWESOME___.styles || ($e.___FONT_AWESOME___.styles = {}),
$e.___FONT_AWESOME___.hooks || ($e.___FONT_AWESOME___.hooks = {}),
$e.___FONT_AWESOME___.shims || ($e.___FONT_AWESOME___.shims = []);
var Ze = $e.___FONT_AWESOME___
    , Qe = [];
Ue && ((Ve.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(Ve.readyState) || Ve.addEventListener("DOMContentLoaded", (function e() {
        Ve.removeEventListener("DOMContentLoaded", e),
            1,
            Qe.map((function(e) {
                    return e()
                }
            ))
    }
)));
"undefined" != typeof global && void 0 !== global.process && global.process.emit,
    "undefined" == typeof setImmediate ? setTimeout : setImmediate;
var eo = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: !1,
    flipY: !1
};
function oo() {
    for (var e = 12, o = ""; e-- > 0; )
        o += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[62 * Math.random() | 0];
    return o
}
function no(e) {
    return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
function io(e) {
    return Object.keys(e || {}).reduce((function(o, n) {
            return o + "".concat(n, ": ").concat(e[n], ";")
        }
    ), "")
}
function ao(e) {
    return e.size !== eo.size || e.x !== eo.x || e.y !== eo.y || e.rotate !== eo.rotate || e.flipX || e.flipY
}
function ro(e) {
    var o = e.transform
        , n = e.containerWidth
        , i = e.iconWidth
        , a = {
        transform: "translate(".concat(n / 2, " 256)")
    }
        , r = "translate(".concat(32 * o.x, ", ").concat(32 * o.y, ") ")
        , t = "scale(".concat(o.size / 16 * (o.flipX ? -1 : 1), ", ").concat(o.size / 16 * (o.flipY ? -1 : 1), ") ")
        , s = "rotate(".concat(o.rotate, " 0 0)");
    return {
        outer: a,
        inner: {
            transform: "".concat(r, " ").concat(t, " ").concat(s)
        },
        path: {
            transform: "translate(".concat(i / 2 * -1, " -256)")
        }
    }
}
var to = {
    x: 0,
    y: 0,
    width: "100%",
    height: "100%"
};
function so(e) {
    var o = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return e.attributes && (e.attributes.fill || o) && (e.attributes.fill = "black"),
        e
}
function mo(e) {
    var o = e.icons
        , n = o.main
        , i = o.mask
        , a = e.prefix
        , r = e.iconName
        , t = e.transform
        , s = e.symbol
        , m = e.title
        , c = e.maskId
        , d = e.titleId
        , g = e.extra
        , u = e.watchable
        , l = void 0 !== u && u
        , v = i.found ? i : n
        , y = v.width
        , f = v.height
        , j = "fa-w-".concat(Math.ceil(y / f * 16))
        , h = [Ye.replacementClass, r ? "".concat(Ye.familyPrefix, "-").concat(r) : "", j].filter((function(e) {
            return -1 === g.classes.indexOf(e)
        }
    )).concat(g.classes).join(" ")
        , p = {
        children: [],
        attributes: Ae({}, g.attributes, {
            "data-prefix": a,
            "data-icon": r,
            class: h,
            role: g.attributes.role || "img",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 ".concat(y, " ").concat(f)
        })
    };
    l && (p.attributes["data-fa-i2svg"] = ""),
    m && p.children.push({
        tag: "title",
        attributes: {
            id: p.attributes["aria-labelledby"] || "title-".concat(d || oo())
        },
        children: [m]
    });
    var b = Ae({}, p, {
        prefix: a,
        iconName: r,
        main: n,
        mask: i,
        maskId: c,
        transform: t,
        symbol: s,
        styles: g.styles
    })
        , w = i.found && n.found ? function(e) {
        var o, n = e.children, i = e.attributes, a = e.main, r = e.mask, t = e.maskId, s = e.transform, m = a.width, c = a.icon, d = r.width, g = r.icon, u = ro({
            transform: s,
            containerWidth: d,
            iconWidth: m
        }), l = {
            tag: "rect",
            attributes: Ae({}, to, {
                fill: "white"
            })
        }, v = c.children ? {
            children: c.children.map(so)
        } : {}, y = {
            tag: "g",
            attributes: Ae({}, u.inner),
            children: [so(Ae({
                tag: c.tag,
                attributes: Ae({}, c.attributes, u.path)
            }, v))]
        }, f = {
            tag: "g",
            attributes: Ae({}, u.outer),
            children: [y]
        }, j = "mask-".concat(t || oo()), h = "clip-".concat(t || oo()), p = {
            tag: "mask",
            attributes: Ae({}, to, {
                id: j,
                maskUnits: "userSpaceOnUse",
                maskContentUnits: "userSpaceOnUse"
            }),
            children: [l, f]
        }, b = {
            tag: "defs",
            children: [{
                tag: "clipPath",
                attributes: {
                    id: h
                },
                children: (o = g,
                    "g" === o.tag ? o.children : [o])
            }, p]
        };
        return n.push(b, {
            tag: "rect",
            attributes: Ae({
                fill: "currentColor",
                "clip-path": "url(#".concat(h, ")"),
                mask: "url(#".concat(j, ")")
            }, to)
        }),
            {
                children: n,
                attributes: i
            }
    }(b) : function(e) {
        var o = e.children
            , n = e.attributes
            , i = e.main
            , a = e.transform
            , r = io(e.styles);
        if (r.length > 0 && (n.style = r),
            ao(a)) {
            var t = ro({
                transform: a,
                containerWidth: i.width,
                iconWidth: i.width
            });
            o.push({
                tag: "g",
                attributes: Ae({}, t.outer),
                children: [{
                    tag: "g",
                    attributes: Ae({}, t.inner),
                    children: [{
                        tag: i.icon.tag,
                        children: i.icon.children,
                        attributes: Ae({}, i.icon.attributes, t.path)
                    }]
                }]
            })
        } else
            o.push(i.icon);
        return {
            children: o,
            attributes: n
        }
    }(b)
        , k = w.children
        , x = w.attributes;
    return b.children = k,
        b.attributes = x,
        s ? function(e) {
            var o = e.prefix
                , n = e.iconName
                , i = e.children
                , a = e.attributes
                , r = e.symbol;
            return [{
                tag: "svg",
                attributes: {
                    style: "display: none;"
                },
                children: [{
                    tag: "symbol",
                    attributes: Ae({}, a, {
                        id: !0 === r ? "".concat(o, "-").concat(Ye.familyPrefix, "-").concat(n) : r
                    }),
                    children: i
                }]
            }]
        }(b) : function(e) {
            var o = e.children
                , n = e.main
                , i = e.mask
                , a = e.attributes
                , r = e.styles
                , t = e.transform;
            if (ao(t) && n.found && !i.found) {
                var s = {
                    x: n.width / n.height / 2,
                    y: .5
                };
                a.style = io(Ae({}, r, {
                    "transform-origin": "".concat(s.x + t.x / 16, "em ").concat(s.y + t.y / 16, "em")
                }))
            }
            return [{
                tag: "svg",
                attributes: a,
                children: o
            }]
        }(b)
}
var co = function() {}
    , go = (Ye.measurePerformance && He && He.mark && He.measure,
        function(e, o, n, i) {
            var a, r, t, s = Object.keys(e), m = s.length, c = void 0 !== i ? function(e, o) {
                return function(n, i, a, r) {
                    return e.call(o, n, i, a, r)
                }
            }(o, i) : o;
            for (void 0 === n ? (a = 1,
                t = e[s[0]]) : (a = 0,
                t = n); a < m; a++)
                t = c(t, e[r = s[a]], r, e);
            return t
        }
);
function uo(e, o) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
        , i = n.skipHooks
        , a = void 0 !== i && i
        , r = Object.keys(o).reduce((function(e, n) {
            var i = o[n];
            return !!i.icon ? e[i.iconName] = i.icon : e[n] = i,
                e
        }
    ), {});
    "function" != typeof Ze.hooks.addPack || a ? Ze.styles[e] = Ae({}, Ze.styles[e] || {}, r) : Ze.hooks.addPack(e, r),
    "fas" === e && uo("fa", o)
}
var lo = Ze.styles
    , vo = Ze.shims
    , yo = function() {
    var e = function(e) {
        return go(lo, (function(o, n, i) {
                return o[i] = go(n, e, {}),
                    o
            }
        ), {})
    };
    e((function(e, o, n) {
            return o[3] && (e[o[3]] = n),
                e
        }
    )),
        e((function(e, o, n) {
                var i = o[2];
                return e[n] = n,
                    i.forEach((function(o) {
                            e[o] = n
                        }
                    )),
                    e
            }
        ));
    var o = "far"in lo;
    go(vo, (function(e, n) {
            var i = n[0]
                , a = n[1]
                , r = n[2];
            return "far" !== a || o || (a = "fas"),
                e[i] = {
                    prefix: a,
                    iconName: r
                },
                e
        }
    ), {})
};
yo();
Ze.styles;
function fo(e, o, n) {
    if (e && e[o] && e[o][n])
        return {
            prefix: o,
            iconName: n,
            icon: e[o][n]
        }
}
function jo(e) {
    var o = e.tag
        , n = e.attributes
        , i = void 0 === n ? {} : n
        , a = e.children
        , r = void 0 === a ? [] : a;
    return "string" == typeof e ? no(e) : "<".concat(o, " ").concat(function(e) {
        return Object.keys(e || {}).reduce((function(o, n) {
                return o + "".concat(n, '="').concat(no(e[n]), '" ')
            }
        ), "").trim()
    }(i), ">").concat(r.map(jo).join(""), "</").concat(o, ">")
}
function ho(e) {
    this.name = "MissingIcon",
        this.message = e || "Icon unavailable",
        this.stack = (new Error).stack
}
ho.prototype = Object.create(Error.prototype),
    ho.prototype.constructor = ho;
var po = {
    fill: "currentColor"
}
    , bo = {
    attributeType: "XML",
    repeatCount: "indefinite",
    dur: "2s"
}
    , wo = (Ae({}, po, {
    d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
}),
    Ae({}, bo, {
        attributeName: "opacity"
    }));
Ae({}, po, {
    cx: "256",
    cy: "364",
    r: "28"
}),
    Ae({}, bo, {
        attributeName: "r",
        values: "28;14;28;28;14;28;"
    }),
    Ae({}, wo, {
        values: "1;0;1;1;0;1;"
    }),
    Ae({}, po, {
        opacity: "1",
        d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
    }),
    Ae({}, wo, {
        values: "1;0;0;0;0;1;"
    }),
    Ae({}, po, {
        opacity: "0",
        d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
    }),
    Ae({}, wo, {
        values: "0;0;1;1;0;0;"
    }),
    Ze.styles;
function ko(e) {
    var o = e[0]
        , n = e[1]
        , i = Le(e.slice(4), 1)[0];
    return {
        found: !0,
        width: o,
        height: n,
        icon: Array.isArray(i) ? {
            tag: "g",
            attributes: {
                class: "".concat(Ye.familyPrefix, "-").concat(We)
            },
            children: [{
                tag: "path",
                attributes: {
                    class: "".concat(Ye.familyPrefix, "-").concat(Je),
                    fill: "currentColor",
                    d: i[0]
                }
            }, {
                tag: "path",
                attributes: {
                    class: "".concat(Ye.familyPrefix, "-").concat(Ke),
                    fill: "currentColor",
                    d: i[1]
                }
            }]
        } : {
            tag: "path",
            attributes: {
                fill: "currentColor",
                d: i
            }
        }
    }
}
Ze.styles;
function xo() {
    Ye.autoAddCss && !Oo && (!function(e) {
        if (e && Ue) {
            var o = Ve.createElement("style");
            o.setAttribute("type", "text/css"),
                o.innerHTML = e;
            for (var n = Ve.head.childNodes, i = null, a = n.length - 1; a > -1; a--) {
                var r = n[a]
                    , t = (r.tagName || "").toUpperCase();
                ["STYLE", "LINK"].indexOf(t) > -1 && (i = r)
            }
            Ve.head.insertBefore(o, i)
        }
    }(function() {
        var e = "fa"
            , o = "svg-inline--fa"
            , n = Ye.familyPrefix
            , i = Ye.replacementClass
            , a = 'svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse {\n  color: #fff;\n}';
        if (n !== e || i !== o) {
            var r = new RegExp("\\.".concat(e, "\\-"),"g")
                , t = new RegExp("\\--".concat(e, "\\-"),"g")
                , s = new RegExp("\\.".concat(o),"g");
            a = a.replace(r, ".".concat(n, "-")).replace(t, "--".concat(n, "-")).replace(s, ".".concat(i))
        }
        return a
    }()),
        Oo = !0)
}
function Co(e, o) {
    return Object.defineProperty(e, "abstract", {
        get: o
    }),
        Object.defineProperty(e, "html", {
            get: function() {
                return e.abstract.map((function(e) {
                        return jo(e)
                    }
                ))
            }
        }),
        Object.defineProperty(e, "node", {
            get: function() {
                if (Ue) {
                    var o = Ve.createElement("div");
                    return o.innerHTML = e.html,
                        o.children
                }
            }
        }),
        e
}
function Eo(e) {
    var o = e.prefix
        , n = void 0 === o ? "fa" : o
        , i = e.iconName;
    if (i)
        return fo(zo.definitions, n, i) || fo(Ze.styles, n, i)
}
var _o, zo = new (function() {
    function e() {
        !function(e, o) {
            if (!(e instanceof o))
                throw new TypeError("Cannot call a class as a function")
        }(this, e),
            this.definitions = {}
    }
    var o, n, i;
    return o = e,
    (n = [{
        key: "add",
        value: function() {
            for (var e = this, o = arguments.length, n = new Array(o), i = 0; i < o; i++)
                n[i] = arguments[i];
            var a = n.reduce(this._pullDefinitions, {});
            Object.keys(a).forEach((function(o) {
                    e.definitions[o] = Ae({}, e.definitions[o] || {}, a[o]),
                        uo(o, a[o]),
                        yo()
                }
            ))
        }
    }, {
        key: "reset",
        value: function() {
            this.definitions = {}
        }
    }, {
        key: "_pullDefinitions",
        value: function(e, o) {
            var n = o.prefix && o.iconName && o.icon ? {
                0: o
            } : o;
            return Object.keys(n).map((function(o) {
                    var i = n[o]
                        , a = i.prefix
                        , r = i.iconName
                        , t = i.icon;
                    e[a] || (e[a] = {}),
                        e[a][r] = t
                }
            )),
                e
        }
    }]) && Pe(o.prototype, n),
    i && Pe(o, i),
        e
}()), Oo = !1, Io = (_o = function(e) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
            , n = o.transform
            , i = void 0 === n ? eo : n
            , a = o.symbol
            , r = void 0 !== a && a
            , t = o.mask
            , s = void 0 === t ? null : t
            , m = o.maskId
            , c = void 0 === m ? null : m
            , d = o.title
            , g = void 0 === d ? null : d
            , u = o.titleId
            , l = void 0 === u ? null : u
            , v = o.classes
            , y = void 0 === v ? [] : v
            , f = o.attributes
            , j = void 0 === f ? {} : f
            , h = o.styles
            , p = void 0 === h ? {} : h;
        if (e) {
            var b = e.prefix
                , w = e.iconName
                , k = e.icon;
            return Co(Ae({
                type: "icon"
            }, e), (function() {
                    return xo(),
                    Ye.autoA11y && (g ? j["aria-labelledby"] = "".concat(Ye.replacementClass, "-title-").concat(l || oo()) : (j["aria-hidden"] = "true",
                        j.focusable = "false")),
                        mo({
                            icons: {
                                main: ko(k),
                                mask: s ? ko(s.icon) : {
                                    found: !1,
                                    width: null,
                                    height: null,
                                    icon: {}
                                }
                            },
                            prefix: b,
                            iconName: w,
                            transform: Ae({}, eo, i),
                            symbol: r,
                            title: g,
                            maskId: c,
                            titleId: l,
                            extra: {
                                attributes: j,
                                styles: p,
                                classes: y
                            }
                        })
                }
            ))
        }
    }
        ,
        function(e) {
            var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , n = (e || {}).icon ? e : Eo(e || {})
                , i = o.mask;
            return i && (i = (i || {}).icon ? i : Eo(i || {})),
                _o(n, Ae({}, o, {
                    mask: i
                }))
        }
);
zo.add({
    prefix: "far",
    iconName: "building",
    icon: [448, 512, [], "f1ad", "M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"]
}, {
    prefix: "fas",
    iconName: "cat",
    icon: [512, 512, [], "f6be", "M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"]
}, {
    prefix: "fas",
    iconName: "coffee",
    icon: [640, 512, [], "f0f4", "M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"]
}, {
    prefix: "far",
    iconName: "flag",
    icon: [512, 512, [], "f024", "M336.174 80c-49.132 0-93.305-32-161.913-32-31.301 0-58.303 6.482-80.721 15.168a48.04 48.04 0 0 0 2.142-20.727C93.067 19.575 74.167 1.594 51.201.104 23.242-1.71 0 20.431 0 48c0 17.764 9.657 33.262 24 41.562V496c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-83.443C109.869 395.28 143.259 384 199.826 384c49.132 0 93.305 32 161.913 32 58.479 0 101.972-22.617 128.548-39.981C503.846 367.161 512 352.051 512 335.855V95.937c0-34.459-35.264-57.768-66.904-44.117C409.193 67.309 371.641 80 336.174 80zM464 336c-21.783 15.412-60.824 32-102.261 32-59.945 0-102.002-32-161.913-32-43.361 0-96.379 9.403-127.826 24V128c21.784-15.412 60.824-32 102.261-32 59.945 0 102.002 32 161.913 32 43.271 0 96.32-17.366 127.826-32v240z"]
}, {
    prefix: "far",
    iconName: "frown",
    icon: [496, 512, [], "f119", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"]
}, {
    prefix: "fas",
    iconName: "futbol",
    icon: [512, 512, [], "f1e3", "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-48 0l-.003-.282-26.064 22.741-62.679-58.5 16.454-84.355 34.303 3.072c-24.889-34.216-60.004-60.089-100.709-73.141l13.651 31.939L256 139l-74.953-41.525 13.651-31.939c-40.631 13.028-75.78 38.87-100.709 73.141l34.565-3.073 16.192 84.355-62.678 58.5-26.064-22.741-.003.282c0 43.015 13.497 83.952 38.472 117.991l7.704-33.897 85.138 10.447 36.301 77.826-29.902 17.786c40.202 13.122 84.29 13.148 124.572 0l-29.902-17.786 36.301-77.826 85.138-10.447 7.704 33.897C442.503 339.952 456 299.015 456 256zm-248.102 69.571l-29.894-91.312L256 177.732l77.996 56.527-29.622 91.312h-96.476z"]
}, {
    prefix: "fas",
    iconName: "history",
    icon: [512, 512, [], "f1da", "M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z"]
}, {
    prefix: "fas",
    iconName: "icons",
    icon: [512, 512, [], "f86d", "M116.65 219.35a15.68 15.68 0 0 0 22.65 0l96.75-99.83c28.15-29 26.5-77.1-4.91-103.88C203.75-7.7 163-3.5 137.86 22.44L128 32.58l-9.85-10.14C93.05-3.5 52.25-7.7 24.86 15.64c-31.41 26.78-33 74.85-5 103.88zm143.92 100.49h-48l-7.08-14.24a27.39 27.39 0 0 0-25.66-17.78h-71.71a27.39 27.39 0 0 0-25.66 17.78l-7 14.24h-48A27.45 27.45 0 0 0 0 347.3v137.25A27.44 27.44 0 0 0 27.43 512h233.14A27.45 27.45 0 0 0 288 484.55V347.3a27.45 27.45 0 0 0-27.43-27.46zM144 468a52 52 0 1 1 52-52 52 52 0 0 1-52 52zm355.4-115.9h-60.58l22.36-50.75c2.1-6.65-3.93-13.21-12.18-13.21h-75.59c-6.3 0-11.66 3.9-12.5 9.1l-16.8 106.93c-1 6.3 4.88 11.89 12.5 11.89h62.31l-24.2 83c-1.89 6.65 4.2 12.9 12.23 12.9a13.26 13.26 0 0 0 10.92-5.25l92.4-138.91c4.88-6.91-1.16-15.7-10.87-15.7zM478.08.33L329.51 23.17C314.87 25.42 304 38.92 304 54.83V161.6a83.25 83.25 0 0 0-16-1.7c-35.35 0-64 21.48-64 48s28.65 48 64 48c35.2 0 63.73-21.32 64-47.66V99.66l112-17.22v47.18a83.25 83.25 0 0 0-16-1.7c-35.35 0-64 21.48-64 48s28.65 48 64 48c35.2 0 63.73-21.32 64-47.66V32c0-19.48-16-34.42-33.92-31.67z"]
}, {
    prefix: "far",
    iconName: "lightbulb",
    icon: [352, 512, [], "f0eb", "M176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zM96.06 459.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18H96.02l.04 43.18zM176 0C73.72 0 0 82.97 0 176c0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0-2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16C335.55 260.85 352 220.37 352 176 352 78.8 273.2 0 176 0z"]
}, {
    prefix: "fas",
    iconName: "music",
    icon: [512, 512, [], "f001", "M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"]
}, {
    prefix: "fas",
    iconName: "search",
    icon: [512, 512, [], "f002", "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"]
}, {
    prefix: "far",
    iconName: "smile",
    icon: [496, 512, [], "f118", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"]
}, {
    prefix: "fas",
    iconName: "times",
    icon: [352, 512, [], "f00d", "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"]
}, {
    prefix: "fas",
    iconName: "user",
    icon: [448, 512, [], "f007", "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"]
});
const So = Io({
    prefix: "far",
    iconName: "building"
}).html[0]
    , Po = Io({
    prefix: "fas",
    iconName: "cat"
}).html[0]
    , Mo = Io({
    prefix: "fas",
    iconName: "coffee"
}).html[0]
    , Ao = Io({
    prefix: "far",
    iconName: "flag"
}).html[0]
    , Lo = Io({
    prefix: "fas",
    iconName: "futbol"
}).html[0]
    , To = Io({
    prefix: "far",
    iconName: "frown"
}).html[0]
    , No = Io({
    prefix: "fas",
    iconName: "history"
}).html[0]
    , Fo = Io({
    prefix: "fas",
    iconName: "icons"
}).html[0]
    , Bo = Io({
    prefix: "far",
    iconName: "lightbulb"
}).html[0]
    , Do = Io({
    prefix: "fas",
    iconName: "music"
}).html[0]
    , Ro = Io({
    prefix: "fas",
    iconName: "search"
}).html[0]
    , qo = Io({
    prefix: "far",
    iconName: "smile"
}).html[0]
    , Vo = Io({
    prefix: "fas",
    iconName: "times"
}).html[0]
    , Ho = Io({
    prefix: "fas",
    iconName: "user"
}).html[0];
function Uo(e) {
    const o = document.createElement("img");
    return o.src = e,
        o
}
function Wo() {
    const e = localStorage.getItem("emojiPicker.recent");
    return (e ? JSON.parse(e) : []).filter((e=>!!e.emoji))
}
class Ko {
    constructor(e, o, n, i, a, r=!0) {
        this.emoji = e,
            this.showVariants = o,
            this.showPreview = n,
            this.events = i,
            this.options = a,
            this.lazy = r
    }
    render() {
        this.emojiButton = ze("button", _e);
        let e = this.emoji.emoji;
        return this.emoji.custom ? e = this.lazy ? qo : `<img class="emoji-picker__custom-emoji" src="${Ee(this.emoji.emoji)}">` : "twemoji" === this.options.style && (e = this.lazy ? qo : ke.parse(this.emoji.emoji, this.options.twemojiOptions)),
            this.emojiButton.innerHTML = e,
            this.emojiButton.tabIndex = -1,
            this.emojiButton.dataset.emoji = this.emoji.emoji,
        this.emoji.custom && (this.emojiButton.dataset.custom = "true"),
            this.emojiButton.title = this.emoji.name,
            this.emojiButton.addEventListener("focus", (()=>this.onEmojiHover())),
            this.emojiButton.addEventListener("blur", (()=>this.onEmojiLeave())),
            this.emojiButton.addEventListener("click", (()=>this.onEmojiClick())),
            this.emojiButton.addEventListener("mouseover", (()=>this.onEmojiHover())),
            this.emojiButton.addEventListener("mouseout", (()=>this.onEmojiLeave())),
        "twemoji" === this.options.style && this.lazy && (this.emojiButton.style.opacity = "0.25"),
            this.emojiButton
    }
    onEmojiClick() {
        this.emoji.variations && this.showVariants && this.options.showVariants || !this.options.showRecents || function(e, o) {
            const n = Wo()
                , i = {
                emoji: e.emoji,
                name: e.name,
                key: e.key || e.name,
                custom: e.custom
            };
            localStorage.setItem("emojiPicker.recent", JSON.stringify([i, ...n.filter((e=>!!e.emoji && e.key !== i.key))].slice(0, o.recentsCount)))
        }(this.emoji, this.options),
            this.events.emit("emoji", {
                emoji: this.emoji,
                showVariants: this.showVariants,
                button: this.emojiButton
            })
    }
    onEmojiHover() {
        this.showPreview && this.events.emit("showPreview", this.emoji)
    }
    onEmojiLeave() {
        this.showPreview && this.events.emit("hidePreview")
    }
}
class Jo {
    constructor(e, o, n, i, a=!0) {
        this.showVariants = o,
            this.events = n,
            this.options = i,
            this.lazy = a,
            this.emojis = e.filter((e=>!e.version || parseFloat(e.version) <= parseFloat(i.emojiVersion)))
    }
    render() {
        const e = ze("div", "emoji-picker__container");
        return this.emojis.forEach((o=>e.appendChild(new Ko(o,this.showVariants,!0,this.events,this.options,this.lazy).render()))),
            e
    }
}
var Go = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
var Xo, Yo = (function(e) {
    var o, n;
    o = Go,
        n = function() {
            var e = "undefined" == typeof window
                , o = new Map
                , n = new Map
                , i = [];
            i.total = 0;
            var a = []
                , r = [];
            function t() {
                o.clear(),
                    n.clear(),
                    a = [],
                    r = []
            }
            function s(e) {
                for (var o = -9007199254740991, n = e.length - 1; n >= 0; --n) {
                    var i = e[n];
                    if (null !== i) {
                        var a = i.score;
                        a > o && (o = a)
                    }
                }
                return -9007199254740991 === o ? null : o
            }
            function m(e, o) {
                var n = e[o];
                if (void 0 !== n)
                    return n;
                var i = o;
                Array.isArray(o) || (i = o.split("."));
                for (var a = i.length, r = -1; e && ++r < a; )
                    e = e[i[r]];
                return e
            }
            function c(e) {
                return "object" == typeof e
            }
            var d = function() {
                var e = []
                    , o = 0
                    , n = {};
                function i() {
                    for (var n = 0, i = e[n], a = 1; a < o; ) {
                        var r = a + 1;
                        n = a,
                        r < o && e[r].score < e[a].score && (n = r),
                            e[n - 1 >> 1] = e[n],
                            a = 1 + (n << 1)
                    }
                    for (var t = n - 1 >> 1; n > 0 && i.score < e[t].score; t = (n = t) - 1 >> 1)
                        e[n] = e[t];
                    e[n] = i
                }
                return n.add = function(n) {
                    var i = o;
                    e[o++] = n;
                    for (var a = i - 1 >> 1; i > 0 && n.score < e[a].score; a = (i = a) - 1 >> 1)
                        e[i] = e[a];
                    e[i] = n
                }
                    ,
                    n.poll = function() {
                        if (0 !== o) {
                            var n = e[0];
                            return e[0] = e[--o],
                                i(),
                                n
                        }
                    }
                    ,
                    n.peek = function(n) {
                        if (0 !== o)
                            return e[0]
                    }
                    ,
                    n.replaceTop = function(o) {
                        e[0] = o,
                            i()
                    }
                    ,
                    n
            }
                , g = d();
            return function u(l) {
                var v = {
                    single: function(e, o, n) {
                        return e ? (c(e) || (e = v.getPreparedSearch(e)),
                            o ? (c(o) || (o = v.getPrepared(o)),
                                ((n && void 0 !== n.allowTypo ? n.allowTypo : !l || void 0 === l.allowTypo || l.allowTypo) ? v.algorithm : v.algorithmNoTypo)(e, o, e[0])) : null) : null
                    },
                    go: function(e, o, n) {
                        if (!e)
                            return i;
                        var a = (e = v.prepareSearch(e))[0]
                            , r = n && n.threshold || l && l.threshold || -9007199254740991
                            , t = n && n.limit || l && l.limit || 9007199254740991
                            , d = (n && void 0 !== n.allowTypo ? n.allowTypo : !l || void 0 === l.allowTypo || l.allowTypo) ? v.algorithm : v.algorithmNoTypo
                            , u = 0
                            , y = 0
                            , f = o.length;
                        if (n && n.keys)
                            for (var j = n.scoreFn || s, h = n.keys, p = h.length, b = f - 1; b >= 0; --b) {
                                for (var w = o[b], k = new Array(p), x = p - 1; x >= 0; --x)
                                    (_ = m(w, E = h[x])) ? (c(_) || (_ = v.getPrepared(_)),
                                        k[x] = d(e, _, a)) : k[x] = null;
                                k.obj = w;
                                var C = j(k);
                                null !== C && (C < r || (k.score = C,
                                    u < t ? (g.add(k),
                                        ++u) : (++y,
                                    C > g.peek().score && g.replaceTop(k))))
                            }
                        else if (n && n.key) {
                            var E = n.key;
                            for (b = f - 1; b >= 0; --b)
                                (_ = m(w = o[b], E)) && (c(_) || (_ = v.getPrepared(_)),
                                null !== (z = d(e, _, a)) && (z.score < r || (z = {
                                    target: z.target,
                                    _targetLowerCodes: null,
                                    _nextBeginningIndexes: null,
                                    score: z.score,
                                    indexes: z.indexes,
                                    obj: w
                                },
                                    u < t ? (g.add(z),
                                        ++u) : (++y,
                                    z.score > g.peek().score && g.replaceTop(z)))))
                        } else
                            for (b = f - 1; b >= 0; --b) {
                                var _, z;
                                (_ = o[b]) && (c(_) || (_ = v.getPrepared(_)),
                                null !== (z = d(e, _, a)) && (z.score < r || (u < t ? (g.add(z),
                                    ++u) : (++y,
                                z.score > g.peek().score && g.replaceTop(z)))))
                            }
                        if (0 === u)
                            return i;
                        var O = new Array(u);
                        for (b = u - 1; b >= 0; --b)
                            O[b] = g.poll();
                        return O.total = u + y,
                            O
                    },
                    goAsync: function(o, n, a) {
                        var r = !1
                            , t = new Promise((function(t, g) {
                                if (!o)
                                    return t(i);
                                var u = (o = v.prepareSearch(o))[0]
                                    , y = d()
                                    , f = n.length - 1
                                    , j = a && a.threshold || l && l.threshold || -9007199254740991
                                    , h = a && a.limit || l && l.limit || 9007199254740991
                                    , p = (a && void 0 !== a.allowTypo ? a.allowTypo : !l || void 0 === l.allowTypo || l.allowTypo) ? v.algorithm : v.algorithmNoTypo
                                    , b = 0
                                    , w = 0;
                                function k() {
                                    if (r)
                                        return g("canceled");
                                    var d = Date.now();
                                    if (a && a.keys)
                                        for (var l = a.scoreFn || s, x = a.keys, C = x.length; f >= 0; --f) {
                                            for (var E = n[f], _ = new Array(C), z = C - 1; z >= 0; --z)
                                                (S = m(E, I = x[z])) ? (c(S) || (S = v.getPrepared(S)),
                                                    _[z] = p(o, S, u)) : _[z] = null;
                                            _.obj = E;
                                            var O = l(_);
                                            if (null !== O && !(O < j) && (_.score = O,
                                                b < h ? (y.add(_),
                                                    ++b) : (++w,
                                                O > y.peek().score && y.replaceTop(_)),
                                            f % 1e3 == 0 && Date.now() - d >= 10))
                                                return void (e ? setImmediate(k) : setTimeout(k))
                                        }
                                    else if (a && a.key) {
                                        for (var I = a.key; f >= 0; --f)
                                            if ((S = m(E = n[f], I)) && (c(S) || (S = v.getPrepared(S)),
                                            null !== (P = p(o, S, u)) && !(P.score < j) && (P = {
                                                target: P.target,
                                                _targetLowerCodes: null,
                                                _nextBeginningIndexes: null,
                                                score: P.score,
                                                indexes: P.indexes,
                                                obj: E
                                            },
                                                b < h ? (y.add(P),
                                                    ++b) : (++w,
                                                P.score > y.peek().score && y.replaceTop(P)),
                                            f % 1e3 == 0 && Date.now() - d >= 10)))
                                                return void (e ? setImmediate(k) : setTimeout(k))
                                    } else
                                        for (; f >= 0; --f) {
                                            var S, P;
                                            if ((S = n[f]) && (c(S) || (S = v.getPrepared(S)),
                                            null !== (P = p(o, S, u)) && !(P.score < j) && (b < h ? (y.add(P),
                                                ++b) : (++w,
                                            P.score > y.peek().score && y.replaceTop(P)),
                                            f % 1e3 == 0 && Date.now() - d >= 10)))
                                                return void (e ? setImmediate(k) : setTimeout(k))
                                        }
                                    if (0 === b)
                                        return t(i);
                                    for (var M = new Array(b), A = b - 1; A >= 0; --A)
                                        M[A] = y.poll();
                                    M.total = b + w,
                                        t(M)
                                }
                                e ? setImmediate(k) : k()
                            }
                        ));
                        return t.cancel = function() {
                            r = !0
                        }
                            ,
                            t
                    },
                    highlight: function(e, o, n) {
                        if (null === e)
                            return null;
                        void 0 === o && (o = "<b>"),
                        void 0 === n && (n = "</b>");
                        for (var i = "", a = 0, r = !1, t = e.target, s = t.length, m = e.indexes, c = 0; c < s; ++c) {
                            var d = t[c];
                            if (m[a] === c) {
                                if (r || (r = !0,
                                    i += o),
                                ++a === m.length) {
                                    i += d + n + t.substr(c + 1);
                                    break
                                }
                            } else
                                r && (r = !1,
                                    i += n);
                            i += d
                        }
                        return i
                    },
                    prepare: function(e) {
                        if (e)
                            return {
                                target: e,
                                _targetLowerCodes: v.prepareLowerCodes(e),
                                _nextBeginningIndexes: null,
                                score: null,
                                indexes: null,
                                obj: null
                            }
                    },
                    prepareSlow: function(e) {
                        if (e)
                            return {
                                target: e,
                                _targetLowerCodes: v.prepareLowerCodes(e),
                                _nextBeginningIndexes: v.prepareNextBeginningIndexes(e),
                                score: null,
                                indexes: null,
                                obj: null
                            }
                    },
                    prepareSearch: function(e) {
                        if (e)
                            return v.prepareLowerCodes(e)
                    },
                    getPrepared: function(e) {
                        if (e.length > 999)
                            return v.prepare(e);
                        var n = o.get(e);
                        return void 0 !== n || (n = v.prepare(e),
                            o.set(e, n)),
                            n
                    },
                    getPreparedSearch: function(e) {
                        if (e.length > 999)
                            return v.prepareSearch(e);
                        var o = n.get(e);
                        return void 0 !== o || (o = v.prepareSearch(e),
                            n.set(e, o)),
                            o
                    },
                    algorithm: function(e, o, n) {
                        for (var i = o._targetLowerCodes, t = e.length, s = i.length, m = 0, c = 0, d = 0, g = 0; ; ) {
                            if (n === i[c]) {
                                if (a[g++] = c,
                                ++m === t)
                                    break;
                                n = e[0 === d ? m : d === m ? m + 1 : d === m - 1 ? m - 1 : m]
                            }
                            if (++c >= s)
                                for (; ; ) {
                                    if (m <= 1)
                                        return null;
                                    if (0 === d) {
                                        if (n === e[--m])
                                            continue;
                                        d = m
                                    } else {
                                        if (1 === d)
                                            return null;
                                        if ((n = e[1 + (m = --d)]) === e[m])
                                            continue
                                    }
                                    c = a[(g = m) - 1] + 1;
                                    break
                                }
                        }
                        m = 0;
                        var u = 0
                            , l = !1
                            , y = 0
                            , f = o._nextBeginningIndexes;
                        null === f && (f = o._nextBeginningIndexes = v.prepareNextBeginningIndexes(o.target));
                        var j = c = 0 === a[0] ? 0 : f[a[0] - 1];
                        if (c !== s)
                            for (; ; )
                                if (c >= s) {
                                    if (m <= 0) {
                                        if (++u > t - 2)
                                            break;
                                        if (e[u] === e[u + 1])
                                            continue;
                                        c = j;
                                        continue
                                    }
                                    --m,
                                        c = f[r[--y]]
                                } else if (e[0 === u ? m : u === m ? m + 1 : u === m - 1 ? m - 1 : m] === i[c]) {
                                    if (r[y++] = c,
                                    ++m === t) {
                                        l = !0;
                                        break
                                    }
                                    ++c
                                } else
                                    c = f[c];
                        if (l)
                            var h = r
                                , p = y;
                        else
                            h = a,
                                p = g;
                        for (var b = 0, w = -1, k = 0; k < t; ++k)
                            w !== (c = h[k]) - 1 && (b -= c),
                                w = c;
                        for (l ? 0 !== u && (b += -20) : (b *= 1e3,
                        0 !== d && (b += -20)),
                                 b -= s - t,
                                 o.score = b,
                                 o.indexes = new Array(p),
                                 k = p - 1; k >= 0; --k)
                            o.indexes[k] = h[k];
                        return o
                    },
                    algorithmNoTypo: function(e, o, n) {
                        for (var i = o._targetLowerCodes, t = e.length, s = i.length, m = 0, c = 0, d = 0; ; ) {
                            if (n === i[c]) {
                                if (a[d++] = c,
                                ++m === t)
                                    break;
                                n = e[m]
                            }
                            if (++c >= s)
                                return null
                        }
                        m = 0;
                        var g = !1
                            , u = 0
                            , l = o._nextBeginningIndexes;
                        if (null === l && (l = o._nextBeginningIndexes = v.prepareNextBeginningIndexes(o.target)),
                        (c = 0 === a[0] ? 0 : l[a[0] - 1]) !== s)
                            for (; ; )
                                if (c >= s) {
                                    if (m <= 0)
                                        break;
                                    --m,
                                        c = l[r[--u]]
                                } else if (e[m] === i[c]) {
                                    if (r[u++] = c,
                                    ++m === t) {
                                        g = !0;
                                        break
                                    }
                                    ++c
                                } else
                                    c = l[c];
                        if (g)
                            var y = r
                                , f = u;
                        else
                            y = a,
                                f = d;
                        for (var j = 0, h = -1, p = 0; p < t; ++p)
                            h !== (c = y[p]) - 1 && (j -= c),
                                h = c;
                        for (g || (j *= 1e3),
                                 j -= s - t,
                                 o.score = j,
                                 o.indexes = new Array(f),
                                 p = f - 1; p >= 0; --p)
                            o.indexes[p] = y[p];
                        return o
                    },
                    prepareLowerCodes: function(e) {
                        for (var o = e.length, n = [], i = e.toLowerCase(), a = 0; a < o; ++a)
                            n[a] = i.charCodeAt(a);
                        return n
                    },
                    prepareBeginningIndexes: function(e) {
                        for (var o = e.length, n = [], i = 0, a = !1, r = !1, t = 0; t < o; ++t) {
                            var s = e.charCodeAt(t)
                                , m = s >= 65 && s <= 90
                                , c = m || s >= 97 && s <= 122 || s >= 48 && s <= 57
                                , d = m && !a || !r || !c;
                            a = m,
                                r = c,
                            d && (n[i++] = t)
                        }
                        return n
                    },
                    prepareNextBeginningIndexes: function(e) {
                        for (var o = e.length, n = v.prepareBeginningIndexes(e), i = [], a = n[0], r = 0, t = 0; t < o; ++t)
                            a > t ? i[t] = a : (a = n[++r],
                                i[t] = void 0 === a ? o : a);
                        return i
                    },
                    cleanup: t,
                    new: u
                };
                return v
            }()
        }
        ,
        e.exports ? e.exports = n() : o.fuzzysort = n()
}(Xo = {
    exports: {}
}, Xo.exports),
    Xo.exports);
class $o {
    constructor(e, o) {
        this.message = e,
            this.iconUrl = o
    }
    render() {
        const e = ze("div", "emoji-picker__search-not-found")
            , o = ze("div", "emoji-picker__search-not-found-icon");
        this.iconUrl ? o.appendChild(Uo(this.iconUrl)) : o.innerHTML = To,
            e.appendChild(o);
        const n = ze("h2");
        return n.innerHTML = Ee(this.message),
            e.appendChild(n),
            e
    }
}
class Zo {
    constructor(e, o, n, i, a) {
        if (this.events = e,
            this.i18n = o,
            this.options = n,
            this.focusedEmojiIndex = 0,
            this.emojisPerRow = this.options.emojisPerRow || 8,
            this.emojiData = i.filter((e=>e.version && parseFloat(e.version) <= parseFloat(n.emojiVersion) && void 0 !== e.category && a.indexOf(e.category) >= 0)),
            this.options.custom) {
            const e = this.options.custom.map((e=>Object.assign(Object.assign({}, e), {
                custom: !0
            })));
            this.emojiData = [...this.emojiData, ...e]
        }
        this.events.on("hideVariantPopup", (()=>{
                setTimeout((()=>this.setFocusedEmoji(this.focusedEmojiIndex)))
            }
        ))
    }
    render() {
        return this.searchContainer = ze("div", "emoji-picker__search-container"),
            this.searchField = ze("input", "emoji-picker__search"),
            this.searchField.placeholder = this.i18n.search,
            this.searchContainer.appendChild(this.searchField),
            this.searchIcon = ze("span", "emoji-picker__search-icon"),
            this.options.icons && this.options.icons.search ? this.searchIcon.appendChild(Uo(this.options.icons.search)) : this.searchIcon.innerHTML = Ro,
            this.searchIcon.addEventListener("click", (e=>this.onClearSearch(e))),
            this.searchContainer.appendChild(this.searchIcon),
            this.searchField.addEventListener("keydown", (e=>this.onKeyDown(e))),
            this.searchField.addEventListener("keyup", (e=>this.onKeyUp(e))),
            this.searchContainer
    }
    clear() {
        this.searchField.value = ""
    }
    focus() {
        this.searchField.focus()
    }
    onClearSearch(e) {
        e.stopPropagation(),
        this.searchField.value && (this.searchField.value = "",
            this.resultsContainer = null,
            this.options.icons && this.options.icons.search ? (Oe(this.searchIcon),
                this.searchIcon.appendChild(Uo(this.options.icons.search))) : this.searchIcon.innerHTML = Ro,
            this.searchIcon.style.cursor = "default",
            this.events.emit("hideSearchResults"),
            setTimeout((()=>this.searchField.focus())))
    }
    setFocusedEmoji(e) {
        if (this.resultsContainer) {
            const o = this.resultsContainer.querySelectorAll("." + _e);
            o[this.focusedEmojiIndex].tabIndex = -1,
                this.focusedEmojiIndex = e;
            const n = o[this.focusedEmojiIndex];
            n.tabIndex = 0,
                n.focus()
        }
    }
    handleResultsKeydown(e) {
        if (this.resultsContainer) {
            const o = this.resultsContainer.querySelectorAll("." + _e);
            "ArrowRight" === e.key ? this.setFocusedEmoji(Math.min(this.focusedEmojiIndex + 1, o.length - 1)) : "ArrowLeft" === e.key ? this.setFocusedEmoji(Math.max(0, this.focusedEmojiIndex - 1)) : "ArrowDown" === e.key ? (e.preventDefault(),
            this.focusedEmojiIndex < o.length - this.emojisPerRow && this.setFocusedEmoji(this.focusedEmojiIndex + this.emojisPerRow)) : "ArrowUp" === e.key ? (e.preventDefault(),
            this.focusedEmojiIndex >= this.emojisPerRow && this.setFocusedEmoji(this.focusedEmojiIndex - this.emojisPerRow)) : "Escape" === e.key && this.onClearSearch(e)
        }
    }
    onKeyDown(e) {
        "Escape" === e.key && this.searchField.value && this.onClearSearch(e)
    }
    onKeyUp(e) {
        if ("Tab" !== e.key && "Shift" !== e.key)
            if (this.searchField.value) {
                this.options.icons && this.options.icons.clearSearch ? (Oe(this.searchIcon),
                    this.searchIcon.appendChild(Uo(this.options.icons.clearSearch))) : this.searchIcon.innerHTML = Vo,
                    this.searchIcon.style.cursor = "pointer";
                const e = Yo.go(this.searchField.value, this.emojiData, {
                    allowTypo: !0,
                    limit: 100,
                    key: "name"
                }).map((e=>e.obj));
                this.events.emit("hidePreview"),
                    e.length ? (this.resultsContainer = new Jo(e,!0,this.events,this.options,!1).render(),
                    this.resultsContainer && (this.resultsContainer.querySelector("." + _e).tabIndex = 0,
                        this.focusedEmojiIndex = 0,
                        this.resultsContainer.addEventListener("keydown", (e=>this.handleResultsKeydown(e))),
                        this.events.emit("showSearchResults", this.resultsContainer))) : this.events.emit("showSearchResults", new $o(this.i18n.notFound,this.options.icons && this.options.icons.notFound).render())
            } else
                this.options.icons && this.options.icons.search ? (Oe(this.searchIcon),
                    this.searchIcon.appendChild(Uo(this.options.icons.search))) : this.searchIcon.innerHTML = Ro,
                    this.searchIcon.style.cursor = "default",
                    this.events.emit("hideSearchResults")
    }
}
class Qo {
    constructor(e, o, n) {
        this.events = e,
            this.emoji = o,
            this.options = n,
            this.focusedEmojiIndex = 0
    }
    getEmoji(e) {
        return this.popup.querySelectorAll("." + _e)[e]
    }
    setFocusedEmoji(e) {
        this.getEmoji(this.focusedEmojiIndex).tabIndex = -1,
            this.focusedEmojiIndex = e;
        const o = this.getEmoji(this.focusedEmojiIndex);
        o.tabIndex = 0,
            o.focus()
    }
    render() {
        this.popup = ze("div", "emoji-picker__variant-popup");
        const e = ze("div", "emoji-picker__variant-overlay");
        e.addEventListener("click", (e=>{
                e.stopPropagation(),
                this.popup.contains(e.target) || this.events.emit("hideVariantPopup")
            }
        )),
            this.popup.appendChild(new Ko(this.emoji,!1,!1,this.events,this.options,!1).render()),
            (this.emoji.variations || []).forEach(((e,o)=>this.popup.appendChild(new Ko({
                name: this.emoji.name,
                emoji: e,
                key: this.emoji.name + o
            },!1,!1,this.events,this.options,!1).render())));
        const o = this.popup.querySelector("." + _e);
        return this.focusedEmojiIndex = 0,
            o.tabIndex = 0,
            setTimeout((()=>o.focus())),
            this.popup.addEventListener("keydown", (e=>{
                    "ArrowRight" === e.key ? this.setFocusedEmoji(Math.min(this.focusedEmojiIndex + 1, this.popup.querySelectorAll("." + _e).length - 1)) : "ArrowLeft" === e.key ? this.setFocusedEmoji(Math.max(this.focusedEmojiIndex - 1, 0)) : "Escape" === e.key && (e.stopPropagation(),
                        this.events.emit("hideVariantPopup"))
                }
            )),
            e.appendChild(this.popup),
            e
    }
}
const en = {
    search: "Search emojis...",
    categories: {
        recents: "Recent Emojis",
        smileys: "Smileys & Emotion",
        people: "People & Body",
        animals: "Animals & Nature",
        food: "Food & Drink",
        activities: "Activities",
        travel: "Travel & Places",
        objects: "Objects",
        symbols: "Symbols",
        flags: "Flags",
        custom: "Custom"
    },
    notFound: "No emojis found"
}
    , on = {
    recents: No,
    smileys: qo,
    people: Ho,
    animals: Po,
    food: Mo,
    activities: Lo,
    travel: So,
    objects: Bo,
    symbols: Do,
    flags: Ao,
    custom: Fo
};
class nn {
    constructor(e, o, n) {
        this.options = e,
            this.events = o,
            this.i18n = n,
            this.activeButton = 0,
            this.buttons = []
    }
    render() {
        var e;
        const o = ze("div", "emoji-picker__category-buttons")
            , n = this.options.categories || (null === (e = this.options.emojiData) || void 0 === e ? void 0 : e.categories) || xe.categories;
        let i = this.options.showRecents ? ["recents", ...n] : n;
        return this.options.custom && (i = [...i, "custom"]),
            i.forEach((e=>{
                    const n = ze("button", "emoji-picker__category-button");
                    this.options.icons && this.options.icons.categories && this.options.icons.categories[e] ? n.appendChild(Uo(this.options.icons.categories[e])) : n.innerHTML = on[e],
                        n.tabIndex = -1,
                        n.title = this.i18n.categories[e],
                        o.appendChild(n),
                        this.buttons.push(n),
                        n.addEventListener("click", (()=>{
                                this.events.emit("categoryClicked", e)
                            }
                        ))
                }
            )),
            o.addEventListener("keydown", (e=>{
                    switch (e.key) {
                        case "ArrowRight":
                            this.events.emit("categoryClicked", i[(this.activeButton + 1) % this.buttons.length]);
                            break;
                        case "ArrowLeft":
                            this.events.emit("categoryClicked", i[0 === this.activeButton ? this.buttons.length - 1 : this.activeButton - 1]);
                            break;
                        case "ArrowUp":
                        case "ArrowDown":
                            e.stopPropagation(),
                                e.preventDefault()
                    }
                }
            )),
            o
    }
    setActiveButton(e, o=!0) {
        let n = this.buttons[this.activeButton];
        n.classList.remove("active"),
            n.tabIndex = -1,
            this.activeButton = e,
            n = this.buttons[this.activeButton],
            n.classList.add("active"),
            n.tabIndex = 0,
        o && n.focus()
    }
}
const an = ["recents", "smileys", "people", "animals", "food", "activities", "travel", "objects", "symbols", "flags", "custom"];
class rn {
    constructor(e, o, n, i) {
        var a;
        this.events = e,
            this.i18n = o,
            this.options = n,
            this.emojiCategories = i,
            this.currentCategory = 0,
            this.headers = [],
            this.focusedIndex = 0,
            this.handleKeyDown = e=>{
                switch (this.emojis.removeEventListener("scroll", this.highlightCategory),
                    e.key) {
                    case "ArrowRight":
                        this.focusedEmoji.tabIndex = -1,
                            this.focusedIndex === this.currentEmojiCount - 1 && this.currentCategory < this.categories.length - 1 ? (this.options.showCategoryButtons && this.categoryButtons.setActiveButton(++this.currentCategory),
                                this.setFocusedEmoji(0)) : this.focusedIndex < this.currentEmojiCount - 1 && this.setFocusedEmoji(this.focusedIndex + 1);
                        break;
                    case "ArrowLeft":
                        this.focusedEmoji.tabIndex = -1,
                            0 === this.focusedIndex && this.currentCategory > 0 ? (this.options.showCategoryButtons && this.categoryButtons.setActiveButton(--this.currentCategory),
                                this.setFocusedEmoji(this.currentEmojiCount - 1)) : this.setFocusedEmoji(Math.max(0, this.focusedIndex - 1));
                        break;
                    case "ArrowDown":
                        e.preventDefault(),
                            this.focusedEmoji.tabIndex = -1,
                            this.focusedIndex + this.emojisPerRow >= this.currentEmojiCount && this.currentCategory < this.categories.length - 1 ? (this.currentCategory++,
                            this.options.showCategoryButtons && this.categoryButtons.setActiveButton(this.currentCategory),
                                this.setFocusedEmoji(Math.min(this.focusedIndex % this.emojisPerRow, this.currentEmojiCount - 1))) : this.currentEmojiCount - this.focusedIndex > this.emojisPerRow && this.setFocusedEmoji(this.focusedIndex + this.emojisPerRow);
                        break;
                    case "ArrowUp":
                        if (e.preventDefault(),
                            this.focusedEmoji.tabIndex = -1,
                        this.focusedIndex < this.emojisPerRow && this.currentCategory > 0) {
                            const e = this.getEmojiCount(this.currentCategory - 1);
                            let o = e % this.emojisPerRow;
                            0 === o && (o = this.emojisPerRow);
                            const n = this.focusedIndex
                                , i = n > o - 1 ? e - 1 : e - o + n;
                            this.currentCategory--,
                            this.options.showCategoryButtons && this.categoryButtons.setActiveButton(this.currentCategory),
                                this.setFocusedEmoji(i)
                        } else
                            this.setFocusedEmoji(this.focusedIndex >= this.emojisPerRow ? this.focusedIndex - this.emojisPerRow : this.focusedIndex)
                }
                requestAnimationFrame((()=>this.emojis.addEventListener("scroll", this.highlightCategory)))
            }
            ,
            this.addCategory = (e,o)=>{
                const n = ze("h2", "emoji-picker__category-name");
                n.innerHTML = Ee(this.i18n.categories[e] || en.categories[e]),
                    this.emojis.appendChild(n),
                    this.headers.push(n),
                    this.emojis.appendChild(new Jo(o,!0,this.events,this.options,"recents" !== e).render())
            }
            ,
            this.selectCategory = (e,o=!0)=>{
                this.emojis.removeEventListener("scroll", this.highlightCategory),
                this.focusedEmoji && (this.focusedEmoji.tabIndex = -1);
                const n = this.categories.indexOf(e);
                this.currentCategory = n,
                    this.setFocusedEmoji(0, !1),
                this.options.showCategoryButtons && this.categoryButtons.setActiveButton(this.currentCategory, o);
                const i = this.headerOffsets[n];
                this.emojis.scrollTop = i,
                    requestAnimationFrame((()=>this.emojis.addEventListener("scroll", this.highlightCategory)))
            }
            ,
            this.highlightCategory = ()=>{
                if (document.activeElement && document.activeElement.classList.contains("emoji-picker__emoji"))
                    return;
                let e = this.headerOffsets.findIndex((e=>e >= Math.round(this.emojis.scrollTop)));
                this.emojis.scrollTop + this.emojis.offsetHeight === this.emojis.scrollHeight && (e = -1),
                    0 === e ? e = 1 : e < 0 && (e = this.headerOffsets.length),
                this.headerOffsets[e] === this.emojis.scrollTop && e++,
                    this.currentCategory = e - 1,
                this.options.showCategoryButtons && this.categoryButtons.setActiveButton(this.currentCategory)
            }
            ,
            this.emojisPerRow = n.emojisPerRow || 8,
            this.categories = (null === (a = n.emojiData) || void 0 === a ? void 0 : a.categories) || n.categories || xe.categories,
        n.showRecents && (this.categories = ["recents", ...this.categories]),
        n.custom && (this.categories = [...this.categories, "custom"]),
            this.categories.sort(((e,o)=>an.indexOf(e) - an.indexOf(o)))
    }
    updateRecents() {
        if (this.options.showRecents) {
            this.emojiCategories.recents = Wo();
            const e = this.emojis.querySelector(".emoji-picker__container");
            e && e.parentNode && e.parentNode.replaceChild(new Jo(this.emojiCategories.recents,!0,this.events,this.options,!1).render(), e)
        }
    }
    render() {
        this.container = ze("div", "emoji-picker__emoji-area"),
        this.options.showCategoryButtons && (this.categoryButtons = new nn(this.options,this.events,this.i18n),
            this.container.appendChild(this.categoryButtons.render())),
            this.emojis = ze("div", "emoji-picker__emojis"),
        this.options.showRecents && (this.emojiCategories.recents = Wo()),
        this.options.custom && (this.emojiCategories.custom = this.options.custom.map((e=>Object.assign(Object.assign({}, e), {
            custom: !0
        })))),
            this.categories.forEach((e=>this.addCategory(e, this.emojiCategories[e]))),
            requestAnimationFrame((()=>{
                    setTimeout((()=>{
                            setTimeout((()=>this.emojis.addEventListener("scroll", this.highlightCategory)))
                        }
                    ))
                }
            )),
            this.emojis.addEventListener("keydown", this.handleKeyDown),
            this.events.on("categoryClicked", this.selectCategory),
            this.container.appendChild(this.emojis);
        return this.container.querySelectorAll("." + _e)[0].tabIndex = 0,
            this.container
    }
    reset() {
        this.headerOffsets = Array.prototype.map.call(this.headers, (e=>e.offsetTop)),
            this.selectCategory(this.options.initialCategory || "smileys", !1),
            this.currentCategory = this.categories.indexOf(this.options.initialCategory || "smileys"),
        this.options.showCategoryButtons && this.categoryButtons.setActiveButton(this.currentCategory, !1)
    }
    get currentCategoryEl() {
        return this.emojis.querySelectorAll(".emoji-picker__container")[this.currentCategory]
    }
    get focusedEmoji() {
        return this.currentCategoryEl.querySelectorAll("." + _e)[this.focusedIndex]
    }
    get currentEmojiCount() {
        return this.currentCategoryEl.querySelectorAll("." + _e).length
    }
    getEmojiCount(e) {
        return this.emojis.querySelectorAll(".emoji-picker__container")[e].querySelectorAll("." + _e).length
    }
    setFocusedEmoji(e, o=!0) {
        this.focusedIndex = e,
        this.focusedEmoji && (this.focusedEmoji.tabIndex = 0,
        o && this.focusedEmoji.focus())
    }
}
const tn = {
    position: "auto",
    autoHide: !0,
    autoFocusSearch: !0,
    showAnimation: !0,
    showPreview: !0,
    showSearch: !0,
    showRecents: !0,
    showVariants: !0,
    showCategoryButtons: !0,
    recentsCount: 50,
    emojiData: xe,
    emojiVersion: "12.1",
    theme: "light",
    categories: ["smileys", "people", "animals", "food", "activities", "travel", "objects", "symbols", "flags"],
    style: "native",
    twemojiOptions: {
        ext: ".svg",
        folder: "svg"
    },
    emojisPerRow: 8,
    rows: 6,
    emojiSize: "1.8em",
    initialCategory: "smileys"
};
class sn {
    constructor(e={}) {
        this.events = new b,
            this.publicEvents = new b,
            this.pickerVisible = !1,
            this.options = Object.assign(Object.assign({}, tn), e),
        this.options.rootElement || (this.options.rootElement = document.body),
            this.i18n = Object.assign(Object.assign({}, en), e.i18n),
            this.onDocumentClick = this.onDocumentClick.bind(this),
            this.onDocumentKeydown = this.onDocumentKeydown.bind(this),
            this.theme = this.options.theme || "light",
            this.emojiCategories = function(e) {
                const o = {};
                return e.emoji.forEach((n=>{
                        let i = o[e.categories[n.category || 0]];
                        i || (i = o[e.categories[n.category || 0]] = []),
                            i.push(n)
                    }
                )),
                    o
            }(this.options.emojiData || xe),
            this.buildPicker()
    }
    on(e, o) {
        this.publicEvents.on(e, o)
    }
    off(e, o) {
        this.publicEvents.off(e, o)
    }
    setStyleProperties() {
        this.options.showAnimation || this.pickerEl.style.setProperty("--animation-duration", "0s"),
        this.options.emojisPerRow && this.pickerEl.style.setProperty("--emoji-per-row", this.options.emojisPerRow.toString()),
        this.options.rows && this.pickerEl.style.setProperty("--row-count", this.options.rows.toString()),
        this.options.emojiSize && this.pickerEl.style.setProperty("--emoji-size", this.options.emojiSize),
        this.options.showCategoryButtons || this.pickerEl.style.setProperty("--category-button-height", "0"),
        this.options.styleProperties && Object.keys(this.options.styleProperties).forEach((e=>{
                this.options.styleProperties && this.pickerEl.style.setProperty(e, this.options.styleProperties[e])
            }
        ))
    }
    showSearchResults(e) {
        Oe(this.pickerContent),
            e.classList.add("search-results"),
            this.pickerContent.appendChild(e)
    }
    hideSearchResults() {
        this.pickerContent.firstChild !== this.emojiArea.container && (Oe(this.pickerContent),
            this.pickerContent.appendChild(this.emojiArea.container)),
            this.emojiArea.reset()
    }
    emitEmoji({emoji: o, showVariants: n}) {
        return e(this, void 0, void 0, (function*() {
                if (o.variations && n && this.options.showVariants)
                    this.showVariantPopup(o);
                else {
                    let e;
                    setTimeout((()=>this.emojiArea.updateRecents())),
                        e = o.custom ? this.emitCustomEmoji(o) : "twemoji" === this.options.style ? yield this.emitTwemoji(o) : this.emitNativeEmoji(o),
                        this.publicEvents.emit("emoji", e),
                    this.options.autoHide && this.hidePicker()
                }
            }
        ))
    }
    emitNativeEmoji(e) {
        return {
            emoji: e.emoji,
            name: e.name
        }
    }
    emitCustomEmoji(e) {
        return {
            url: e.emoji,
            name: e.name,
            custom: !0
        }
    }
    emitTwemoji(e) {
        return new Promise((o=>{
                ke.parse(e.emoji, Object.assign(Object.assign({}, this.options.twemojiOptions), {
                    callback: (n,{base: i, size: a, ext: r})=>{
                        const t = `${i}${a}/${n}${r}`;
                        return o({
                            url: t,
                            emoji: e.emoji,
                            name: e.name
                        }),
                            t
                    }
                }))
            }
        ))
    }
    buildSearch() {
        var e;
        this.options.showSearch && (this.search = new Zo(this.events,this.i18n,this.options,(null === (e = this.options.emojiData) || void 0 === e ? void 0 : e.emoji) || xe.emoji,(this.options.categories || []).map((e=>(this.options.emojiData || xe).categories.indexOf(e)))),
            this.pickerEl.appendChild(this.search.render()))
    }
    buildPreview() {
        this.options.showPreview && this.pickerEl.appendChild(new Se(this.events,this.options).render())
    }
    initPlugins() {
        if (this.options.plugins) {
            const e = ze("div", "emoji-picker__plugin-container");
            this.options.plugins.forEach((o=>{
                    if (!o.render)
                        throw new Error('Emoji Button plugins must have a "render" function.');
                    e.appendChild(o.render(this))
                }
            )),
                this.pickerEl.appendChild(e)
        }
    }
    initFocusTrap() {
        this.focusTrap = h(this.pickerEl, {
            clickOutsideDeactivates: !0,
            initialFocus: this.options.showSearch && this.options.autoFocusSearch ? ".emoji-picker__search" : '.emoji-picker__emoji[tabindex="0"]'
        })
    }
    buildPicker() {
        this.pickerEl = ze("div", "emoji-picker"),
            this.pickerEl.classList.add(this.theme),
            this.setStyleProperties(),
            this.initFocusTrap(),
            this.pickerContent = ze("div", "emoji-picker__content"),
            this.initPlugins(),
            this.buildSearch(),
            this.pickerEl.appendChild(this.pickerContent),
            this.emojiArea = new rn(this.events,this.i18n,this.options,this.emojiCategories),
            this.pickerContent.appendChild(this.emojiArea.render()),
            this.events.on("showSearchResults", this.showSearchResults.bind(this)),
            this.events.on("hideSearchResults", this.hideSearchResults.bind(this)),
            this.events.on("emoji", this.emitEmoji.bind(this)),
            this.buildPreview(),
            this.wrapper = ze("div", "emoji-picker__wrapper"),
            this.wrapper.appendChild(this.pickerEl),
            this.wrapper.style.display = "none",
        this.options.zIndex && (this.wrapper.style.zIndex = this.options.zIndex + ""),
        this.options.rootElement && this.options.rootElement.appendChild(this.wrapper),
            this.observeForLazyLoad()
    }
    showVariantPopup(e) {
        const o = new Qo(this.events,e,this.options).render();
        o && this.pickerEl.appendChild(o),
            this.events.on("hideVariantPopup", (()=>{
                    o && (o.classList.add("hiding"),
                        setTimeout((()=>{
                                o && this.pickerEl.removeChild(o)
                            }
                        ), 175)),
                        this.events.off("hideVariantPopup")
                }
            ))
    }
    observeForLazyLoad() {
        this.observer = new IntersectionObserver(this.handleIntersectionChange.bind(this),{
            root: this.emojiArea.emojis
        }),
            this.emojiArea.emojis.querySelectorAll("." + _e).forEach((e=>{
                    this.shouldLazyLoad(e) && this.observer.observe(e)
                }
            ))
    }
    handleIntersectionChange(e) {
        Array.prototype.filter.call(e, (e=>e.intersectionRatio > 0)).map((e=>e.target)).forEach((e=>{
                Ie(e, this.options)
            }
        ))
    }
    shouldLazyLoad(e) {
        return "twemoji" === this.options.style || "true" === e.dataset.custom
    }
    onDocumentClick(e) {
        this.pickerEl.contains(e.target) || this.hidePicker()
    }
    destroyPicker() {
        this.events.off("emoji"),
            this.events.off("hideVariantPopup"),
        this.options.rootElement && (this.options.rootElement.removeChild(this.wrapper),
        this.popper && this.popper.destroy()),
        this.observer && this.observer.disconnect(),
        this.options.plugins && this.options.plugins.forEach((e=>{
                e.destroy && e.destroy()
            }
        ))
    }
    hidePicker() {
        this.hideInProgress = !0,
            this.focusTrap.deactivate(),
            this.pickerVisible = !1,
        this.overlay && (document.body.removeChild(this.overlay),
            this.overlay = void 0),
            this.emojiArea.emojis.removeEventListener("scroll", this.emojiArea.highlightCategory),
            this.pickerEl.classList.add("hiding"),
            setTimeout((()=>{
                    this.wrapper.style.display = "none",
                        this.pickerEl.classList.remove("hiding"),
                    this.pickerContent.firstChild !== this.emojiArea.container && (Oe(this.pickerContent),
                        this.pickerContent.appendChild(this.emojiArea.container)),
                    this.search && this.search.clear(),
                        this.events.emit("hideVariantPopup"),
                        this.hideInProgress = !1,
                    this.popper && this.popper.destroy(),
                        this.publicEvents.emit("hidden");
                        document.querySelector('#emojiTargeet').focus();

                }
            ), this.options.showAnimation ? 170 : 0),
            setTimeout((()=>{
                    document.removeEventListener("click", this.onDocumentClick),
                        document.removeEventListener("keydown", this.onDocumentKeydown)
                }
            ))
    }
    showPicker(e) {
        this.hideInProgress ? setTimeout((()=>this.showPicker(e)), 100) : (this.pickerVisible = !0,
            this.wrapper.style.display = "block",
            this.determineDisplay(e),
            this.focusTrap.activate(),
            setTimeout((()=>{
                    this.addEventListeners(),
                        this.setInitialFocus()
                }
            )),
            this.emojiArea.reset())
    }
    determineDisplay(e) {
        window.matchMedia("screen and (max-width: 450px)").matches ? this.showMobileView() : "string" == typeof this.options.position ? this.setRelativePosition(e) : this.setFixedPosition()
    }
    setInitialFocus() {
        this.pickerEl.querySelector(this.options.showSearch && this.options.autoFocusSearch ? ".emoji-picker__search" : `.${_e}[tabindex="0"]`).focus()
    }
    addEventListeners() {
        document.addEventListener("click", this.onDocumentClick),
            document.addEventListener("keydown", this.onDocumentKeydown)
    }
    setRelativePosition(e) {
        this.popper = we(e, this.wrapper, {
            placement: this.options.position
        })
    }
    setFixedPosition() {
        var e;
        if (null === (e = this.options) || void 0 === e ? void 0 : e.position) {
            this.wrapper.style.position = "fixed";
            const e = this.options.position;
            Object.keys(e).forEach((o=>{
                    this.wrapper.style[o] = e[o]
                }
            ))
        }
    }
    showMobileView() {
        const e = window.getComputedStyle(this.pickerEl)
            , o = document.querySelector("html")
            , n = o && o.clientHeight
            , i = o && o.clientWidth
            , a = parseInt(e.height)
            , r = n ? n / 2 - a / 2 : 0
            , t = parseInt(e.width)
            , s = i ? i / 2 - t / 2 : 0;
        this.wrapper.style.position = "fixed",
            this.wrapper.style.top = r + "px",
            this.wrapper.style.left = s + "px",
            this.wrapper.style.zIndex = "5000",
            this.overlay = ze("div", "emoji-picker__overlay"),
            document.body.appendChild(this.overlay)
    }
    togglePicker(e) {
        this.pickerVisible ? this.hidePicker() : this.showPicker(e)
    }
    isPickerVisible() {
        return this.pickerVisible
    }
    onDocumentKeydown(e) {
        "Escape" === e.key ? this.hidePicker() : "Tab" === e.key ? this.pickerEl.classList.add("keyboard") : e.key.match(/^[\w]$/) && this.search && this.search.focus()
    }
    setTheme(e) {
        e !== this.theme && (this.pickerEl.classList.remove(this.theme),
            this.theme = e,
            this.pickerEl.classList.add(e))
    }
}
export default sn