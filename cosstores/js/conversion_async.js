(function() {
    /* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/
    function aa(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    var l = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    ;
    function ba(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("Cannot find global object");
    }
    var ca = ba(this)
      , da = "function" === typeof Symbol && "symbol" === typeof Symbol("x")
      , r = {}
      , ea = {};
    function v(a, b) {
        var c = ea[b];
        if (null == c)
            return a[b];
        c = a[c];
        return void 0 !== c ? c : a[b]
    }
    function w(a, b, c) {
        if (b)
            a: {
                var d = a.split(".");
                a = 1 === d.length;
                var e = d[0], f;
                !a && e in r ? f = r : f = ca;
                for (e = 0; e < d.length - 1; e++) {
                    var g = d[e];
                    if (!(g in f))
                        break a;
                    f = f[g]
                }
                d = d[d.length - 1];
                c = da && "es6" === c ? f[d] : null;
                b = b(c);
                null != b && (a ? l(r, d, {
                    configurable: !0,
                    writable: !0,
                    value: b
                }) : b !== c && (void 0 === ea[d] && (a = 1E9 * Math.random() >>> 0,
                ea[d] = da ? ca.Symbol(d) : "$jscp$" + a + "$" + d),
                l(f, ea[d], {
                    configurable: !0,
                    writable: !0,
                    value: b
                })))
            }
    }
    w("Symbol", function(a) {
        function b(f) {
            if (this instanceof b)
                throw new TypeError("Symbol is not a constructor");
            return new c(d + (f || "") + "_" + e++,f)
        }
        function c(f, g) {
            this.g = f;
            l(this, "description", {
                configurable: !0,
                writable: !0,
                value: g
            })
        }
        if (a)
            return a;
        c.prototype.toString = function() {
            return this.g
        }
        ;
        var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_"
          , e = 0;
        return b
    }, "es6");
    w("Symbol.iterator", function(a) {
        if (a)
            return a;
        a = (0,
        r.Symbol)("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = ca[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && l(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return fa(aa(this))
                }
            })
        }
        return a
    }, "es6");
    function fa(a) {
        a = {
            next: a
        };
        a[v(r.Symbol, "iterator")] = function() {
            return this
        }
        ;
        return a
    }
    w("String.prototype.endsWith", function(a) {
        return a ? a : function(b, c) {
            if (null == this)
                throw new TypeError("The 'this' value for String.prototype.endsWith must not be null or undefined");
            if (b instanceof RegExp)
                throw new TypeError("First argument to String.prototype.endsWith must not be a regular expression");
            void 0 === c && (c = this.length);
            c = Math.max(0, Math.min(c | 0, this.length));
            for (var d = b.length; 0 < d && 0 < c; )
                if (this[--c] != b[--d])
                    return !1;
            return 0 >= d
        }
    }, "es6");
    function ha(a, b) {
        a instanceof String && (a += "");
        var c = 0
          , d = !1
          , e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
        e[v(r.Symbol, "iterator")] = function() {
            return e
        }
        ;
        return e
    }
    w("Array.prototype.values", function(a) {
        return a ? a : function() {
            return ha(this, function(b, c) {
                return c
            })
        }
    }, "es8");
    w("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return ha(this, function(b) {
                return b
            })
        }
    }, "es6");
    w("Object.values", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
            return c
        }
    }, "es8");
    var A = this || self;
    function ia(a) {
        a.v = void 0;
        a.i = function() {
            return a.v ? a.v : a.v = new a
        }
    }
    function ja(a) {
        return a
    }
    ;function ka(a) {
        a = parseFloat(a);
        return isNaN(a) || 1 < a || 0 > a ? 0 : a
    }
    ;function la(a, b) {
        this.j = a === ma && b || "";
        this.g = na
    }
    var na = {}
      , ma = {};
    function oa(a) {
        var b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    }
    ;var pa = Array.prototype.indexOf ? function(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    }
    : function(a, b) {
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , qa = Array.prototype.some ? function(a, b) {
        return Array.prototype.some.call(a, b, void 0)
    }
    : function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a))
                return !0;
        return !1
    }
    ;
    var va;
    a: {
        var wa = A.navigator;
        if (wa) {
            var xa = wa.userAgent;
            if (xa) {
                va = xa;
                break a
            }
        }
        va = ""
    }
    ;var ya;
    function za(a, b) {
        this.g = b === Aa ? a : ""
    }
    za.prototype.toString = function() {
        return this.g + ""
    }
    ;
    function Ba(a) {
        return a instanceof za && a.constructor === za ? a.g : "type_error:TrustedResourceUrl"
    }
    var Aa = {};
    function Ca(a) {
        if (void 0 === ya) {
            var b = null;
            var c = A.trustedTypes;
            if (c && c.createPolicy) {
                try {
                    b = c.createPolicy("goog#html", {
                        createHTML: ja,
                        createScript: ja,
                        createScriptURL: ja
                    })
                } catch (d) {
                    A.console && A.console.error(d.message)
                }
                ya = b
            } else
                ya = b
        }
        a = (b = ya) ? b.createScriptURL(a) : a;
        return new za(a,Aa)
    }
    ;var Da = /^[\w+/_-]+[=]{0,2}$/;
    function Ea(a) {
        Ea[" "](a);
        return a
    }
    Ea[" "] = function() {}
    ;
    function Fa(a) {
        var b = document;
        a = String(a);
        "application/xhtml+xml" === b.contentType && (a = a.toLowerCase());
        return b.createElement(a)
    }
    ;var Ga = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
    function Ha(a) {
        var b = a.match(Ga);
        a = b[5];
        var c = b[6];
        b = b[7];
        var d = "";
        a && (d += a);
        c && (d += "?" + c);
        b && (d += "#" + b);
        return d
    }
    function Ia(a, b, c, d) {
        for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d; ) {
            var f = a.charCodeAt(b - 1);
            if (38 == f || 63 == f)
                if (f = a.charCodeAt(b + e),
                !f || 61 == f || 38 == f || 35 == f)
                    return b;
            b += e + 1
        }
        return -1
    }
    var Ja = /#|$/;
    function Ka(a, b) {
        var c = a.search(Ja)
          , d = Ia(a, 0, b, c);
        if (0 > d)
            return null;
        var e = a.indexOf("&", d);
        if (0 > e || e > c)
            e = c;
        d += b.length + 1;
        return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, " "))
    }
    var La = /[?&]($|#)/;
    function B(a, b, c) {
        for (var d = a.search(Ja), e = 0, f, g = []; 0 <= (f = Ia(a, e, b, d)); )
            g.push(a.substring(e, f)),
            e = Math.min(a.indexOf("&", f) + 1 || d, d);
        g.push(a.substr(e));
        a = g.join("").replace(La, "$1");
        c = null != c ? "=" + encodeURIComponent(String(c)) : "";
        (b += c) ? (c = a.indexOf("#"),
        0 > c && (c = a.length),
        d = a.indexOf("?"),
        0 > d || d > c ? (d = c,
        e = "") : e = a.substring(d + 1, c),
        c = [a.substr(0, d), e, a.substr(c)],
        a = c[1],
        c[1] = b ? a ? a + "&" + b : b : a,
        b = c[0] + (c[1] ? "?" + c[1] : "") + c[2]) : b = a;
        return b
    }
    ;function Ma() {
        if (!A.crypto)
            return Math.random();
        try {
            var a = new Uint32Array(1);
            A.crypto.getRandomValues(a);
            return a[0] / 65536 / 65536
        } catch (b) {
            return Math.random()
        }
    }
    function Na(a, b) {
        if (a)
            for (var c in a)
                Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
    }
    var Pa = oa(function() {
        return qa(["Google Web Preview", "Mediapartners-Google", "Google-Read-Aloud", "Google-Adwords"], Oa) || 1E-4 > Math.random()
    })
      , Qa = oa(function() {
        return -1 != va.indexOf("MSIE")
    });
    function Oa(a) {
        return -1 != va.indexOf(a)
    }
    function C(a) {
        return /^true$/.test(a)
    }
    ;var Ra = ka("0.20")
      , Sa = ka("0.002")
      , Ta = ka("0.00")
      , Ua = ka("0.00")
      , Va = C("true")
      , Wa = C("true")
      , Xa = C("true")
      , Ya = C("true")
      , Za = C("true");
    var $a = null;
    function ab() {
        if (null === $a) {
            $a = "";
            try {
                var a = "";
                try {
                    a = A.top.location.hash
                } catch (c) {
                    a = A.location.hash
                }
                if (a) {
                    var b = a.match(/\bdeid=([\d,]+)/);
                    $a = b ? b[1] : ""
                }
            } catch (c) {}
        }
        return $a
    }
    function E(a, b, c) {
        var d = G;
        if (c ? d.g.hasOwnProperty(c) && "" == d.g[c] : 1) {
            var e;
            e = (e = ab()) ? (e = e.match(new RegExp("\\b(" + a.join("|") + ")\\b"))) ? e[0] : null : null;
            if (e)
                a = e;
            else
                a: {
                    if (!Qa() && !Pa() && (e = Math.random(),
                    e < b)) {
                        e = Ma();
                        a = a[Math.floor(e * a.length)];
                        break a
                    }
                    a = null
                }
            a && "" != a && (c ? d.g.hasOwnProperty(c) && (d.g[c] = a) : d.j[a] = !0)
        }
    }
    function H(a) {
        var b = G;
        return b.g.hasOwnProperty(a) ? b.g[a] : ""
    }
    function bb() {
        var a = G
          , b = [];
        Na(a.j, function(c, d) {
            b.push(d)
        });
        Na(a.g, function(c) {
            "" != c && b.push(c)
        });
        return b
    }
    ;var cb = {
        K: 2,
        S: 13,
        R: 14,
        N: 16,
        M: 17,
        L: 18
    }
      , G = null;
    function db() {
        return !!G && "592230571" == H(16)
    }
    function I() {
        return !!G && ("2505059651" == H(18) || "2505059650" == H(18))
    }
    ;var eb = {};
    function J(a) {
        eb.TAGGING = eb.TAGGING || [];
        eb.TAGGING[a] = !0
    }
    ;function fb(a) {
        var b = "[object Array]" == Object.prototype.toString.call(Object(a));
        Array.isArray ? Array.isArray(a) !== b && J(4) : J(5);
        return b
    }
    function gb(a, b) {
        if (a && fb(a))
            for (var c = 0; c < a.length; c++)
                if (a[c] && b(a[c]))
                    return a[c]
    }
    function hb(a, b) {
        for (var c in a)
            Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c])
    }
    ;var ib = new function(a, b) {
        this.g = a;
        this.defaultValue = void 0 === b ? !1 : b
    }
    (1933);
    var K = window
      , L = document;
    function M() {
        var a = {};
        this.g = function() {
            var b = ib.g
              , c = ib.defaultValue;
            return null != a[b] ? a[b] : c
        }
        ;
        this.j = function(b) {
            a[ib.g] = b
        }
    }
    ia(M);
    var N = [];
    function O() {
        var a = {};
        var b = K.google_tag_data;
        K.google_tag_data = void 0 === b ? a : b;
        a = K.google_tag_data;
        a.ics || (a.ics = {
            entries: {},
            set: jb,
            update: kb,
            addListener: lb,
            notifyListeners: mb,
            active: !1,
            usedDefault: !1
        });
        return a.ics
    }
    function jb(a, b, c, d, e, f) {
        var g = O();
        g.active = !0;
        g.usedDefault = !0;
        if (void 0 != b) {
            var h = g.entries;
            g = h[a] || {};
            var k = g.region;
            c = c && "string" == typeof c ? c.toUpperCase() : void 0;
            d = d.toUpperCase();
            e = e.toUpperCase();
            if ("" === d || c === e || (c === d ? k !== e : !c && !k)) {
                e = !!(f && 0 < f && void 0 === g.update);
                var m = {
                    region: c,
                    initial: "granted" === b,
                    update: g.update,
                    quiet: e
                };
                if ("" !== d || !1 !== g.initial)
                    h[a] = m;
                e && K.setTimeout(function() {
                    h[a] === m && m.quiet && (m.quiet = !1,
                    nb(a),
                    mb(),
                    J(2))
                }, f)
            }
        }
    }
    function kb(a, b) {
        var c = O();
        c.active = !0;
        if (void 0 != b) {
            var d = P(a);
            c = c.entries;
            c = c[a] = c[a] || {};
            c.update = "granted" === b;
            b = P(a);
            c.quiet ? (c.quiet = !1,
            nb(a)) : b !== d && nb(a)
        }
    }
    function lb(a, b) {
        N.push({
            u: a,
            G: b
        })
    }
    function nb(a) {
        for (var b = 0; b < N.length; ++b) {
            var c = N[b];
            fb(c.u) && -1 !== c.u.indexOf(a) && (c.F = !0)
        }
    }
    function mb(a) {
        for (var b = 0; b < N.length; ++b) {
            var c = N[b];
            if (c.F) {
                c.F = !1;
                try {
                    c.G({
                        T: a
                    })
                } catch (d) {}
            }
        }
    }
    function P(a) {
        a = O().entries[a] || {};
        return void 0 !== a.update ? a.update : void 0 !== a.initial ? a.initial : void 0
    }
    function ob(a) {
        return !(O().entries[a] || {}).quiet
    }
    function pb(a, b) {
        O().addListener(a, b)
    }
    function qb(a) {
        function b() {
            for (var e = 0; e < c.length; e++)
                if (!ob(c[e]))
                    return !0;
            return !1
        }
        var c = ["ad_storage"];
        if (b()) {
            var d = !1;
            pb(c, function(e) {
                d || b() || (d = !0,
                a(e))
            })
        } else
            a({})
    }
    function rb(a) {
        function b() {
            for (var e = [], f = 0; f < c.length; f++) {
                var g = c[f];
                !1 === P(g) || d[g] || (e.push(g),
                d[g] = !0)
            }
            return e
        }
        var c = ["ad_storage"]
          , d = {};
        b().length !== c.length && pb(c, function(e) {
            var f = b();
            0 < f.length && (e.u = f,
            a(e))
        })
    }
    ;function sb(a, b, c, d) {
        if (tb(d)) {
            d = [];
            b = String(b || ub()).split(";");
            for (var e = 0; e < b.length; e++) {
                var f = b[e].split("=")
                  , g = f[0].replace(/^\s*|\s*$/g, "");
                g && g == a && ((f = f.slice(1).join("=").replace(/^\s*|\s*$/g, "")) && c && (f = decodeURIComponent(f)),
                d.push(f))
            }
            a = d
        } else
            a = [];
        return a
    }
    function vb(a, b, c, d) {
        var e = ub()
          , f = window;
        "null" !== f.origin && (f.document.cookie = a);
        a = ub();
        return e != a || void 0 != c && 0 <= sb(b, a, !1, d).indexOf(c)
    }
    function wb(a, b, c) {
        function d(q, p, y) {
            if (null == y)
                return delete g[p],
                q;
            g[p] = y;
            return q + "; " + p + "=" + y
        }
        function e(q, p) {
            if (null == p)
                return delete g[p],
                q;
            g[p] = !0;
            return q + "; " + p
        }
        if (tb(c.s)) {
            if (void 0 == b)
                var f = a + "=deleted; expires=" + (new Date(0)).toUTCString();
            else
                c.encode && (b = encodeURIComponent(b)),
                b = xb(b),
                f = a + "=" + b;
            var g = {};
            f = d(f, "path", c.path);
            if (c.expires instanceof Date)
                var h = c.expires.toUTCString();
            else
                null != c.expires && (h = c.expires);
            f = d(f, "expires", h);
            f = d(f, "max-age", c.U);
            f = d(f, "samesite", c.V);
            c.W && (f = e(f, "secure"));
            h = c.domain;
            if ("auto" === h) {
                h = yb();
                for (var k = 0; k < h.length; ++k) {
                    var m = "none" !== h[k] ? h[k] : void 0
                      , n = d(f, "domain", m);
                    n = e(n, c.flags);
                    if (!zb(m, c.path) && vb(n, a, b, c.s))
                        break
                }
            } else
                h && "none" !== h && (f = d(f, "domain", h)),
                f = e(f, c.flags),
                zb(h, c.path) || vb(f, a, b, c.s)
        }
    }
    function Ab(a, b, c) {
        null == c.path && (c.path = "/");
        c.domain || (c.domain = "auto");
        wb(a, b, c)
    }
    function xb(a) {
        a && 1200 < a.length && (a = a.substring(0, 1200));
        return a
    }
    var Bb = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/
      , Cb = /(^|\.)doubleclick\.net$/i;
    function zb(a, b) {
        return Cb.test(window.document.location.hostname) || "/" === b && Bb.test(a)
    }
    function ub() {
        return "null" !== window.origin ? window.document.cookie : ""
    }
    function yb() {
        var a = []
          , b = window.document.location.hostname.split(".");
        if (4 === b.length) {
            var c = b[b.length - 1];
            if (parseInt(c, 10).toString() === c)
                return ["none"]
        }
        for (c = b.length - 2; 0 <= c; c--)
            a.push(b.slice(c).join("."));
        b = window.document.location.hostname;
        Cb.test(b) || Bb.test(b) || a.push("none");
        return a
    }
    function tb(a) {
        if (!(M.i().g() && a && M.i().g() && O().active))
            return !0;
        if (!ob(a))
            return !1;
        a = P(a);
        return null == a ? !0 : !!a
    }
    ;function Db(a, b) {
        var c, d = Number(null != a.D ? a.D : void 0);
        0 !== d && (c = new Date((b || (new Date).getTime()) + 1E3 * (d || 7776E3)));
        return {
            path: a.path,
            domain: a.domain,
            flags: a.flags,
            encode: !0,
            expires: c
        }
    }
    ;function Eb(a) {
        var b = []
          , c = L.cookie.split(";");
        a = new RegExp("^\\s*" + (a || "_gac") + "_(UA-\\d+-\\d+)=\\s*(.+?)\\s*$");
        for (var d = 0; d < c.length; d++) {
            var e = c[d].match(a);
            e && b.push({
                A: e[1],
                value: e[2],
                timestamp: Number(e[2].split(".")[1]) || 0
            })
        }
        b.sort(function(f, g) {
            return g.timestamp - f.timestamp
        });
        return b
    }
    function Q(a, b) {
        a = Eb(a);
        var c = {};
        if (!a || !a.length)
            return c;
        for (var d = 0; d < a.length; d++) {
            var e = a[d].value.split(".");
            if (!("1" !== e[0] || b && 3 > e.length || !b && 3 !== e.length) && Number(e[1])) {
                c[a[d].A] || (c[a[d].A] = []);
                var f = {
                    version: e[0],
                    timestamp: 1E3 * Number(e[1]),
                    h: e[2]
                };
                b && 3 < e.length && (f.labels = e.slice(3));
                c[a[d].A].push(f)
            }
        }
        return c
    }
    ;var Fb = /:[0-9]+$/;
    function Gb(a, b) {
        a = a.split("&");
        for (var c = 0; c < a.length; c++) {
            var d = a[c].split("=");
            if (decodeURIComponent(d[0]).replace(/\+/g, " ") === b)
                return decodeURIComponent(d.slice(1).join("=")).replace(/\+/g, " ")
        }
    }
    function Hb(a, b) {
        var c = "query";
        if ("protocol" === c || "port" === c)
            a.protocol = Ib(a.protocol) || Ib(K.location.protocol);
        "port" === c ? a.port = String(Number(a.hostname ? a.port : K.location.port) || ("http" == a.protocol ? 80 : "https" == a.protocol ? 443 : "")) : "host" === c && (a.hostname = (a.hostname || K.location.hostname).replace(Fb, "").toLowerCase());
        var d = Ib(a.protocol);
        c && (c = String(c).toLowerCase());
        switch (c) {
        case "url_no_fragment":
            b = "";
            a && a.href && (b = a.href.indexOf("#"),
            b = 0 > b ? a.href : a.href.substr(0, b));
            a = b;
            break;
        case "protocol":
            a = d;
            break;
        case "host":
            a = a.hostname.replace(Fb, "").toLowerCase();
            break;
        case "port":
            a = String(Number(a.port) || ("http" == d ? 80 : "https" == d ? 443 : ""));
            break;
        case "path":
            a.pathname || a.hostname || J(1);
            a = "/" == a.pathname.charAt(0) ? a.pathname : "/" + a.pathname;
            a = a.split("/");
            a: if (b = a[a.length - 1],
            c = [],
            Array.prototype.indexOf)
                b = c.indexOf(b),
                b = "number" == typeof b ? b : -1;
            else {
                for (d = 0; d < c.length; d++)
                    if (c[d] === b) {
                        b = d;
                        break a
                    }
                b = -1
            }
            0 <= b && (a[a.length - 1] = "");
            a = a.join("/");
            break;
        case "query":
            a = a.search.replace("?", "");
            b && (a = Gb(a, b));
            break;
        case "extension":
            a = a.pathname.split(".");
            a = 1 < a.length ? a[a.length - 1] : "";
            a = a.split("/")[0];
            break;
        case "fragment":
            a = a.hash.replace("#", "");
            break;
        default:
            a = a && a.href
        }
        return a
    }
    function Ib(a) {
        return a ? a.replace(":", "").toLowerCase() : ""
    }
    ;var Jb = {};
    var Kb = /^\w+$/
      , Lb = /^[\w-]+$/
      , Mb = {
        aw: "_aw",
        dc: "_dc",
        gf: "_gf",
        ha: "_ha",
        gp: "_gp",
        gb: "_gb"
    };
    function R() {
        if (!M.i().g() || !M.i().g() || !O().active)
            return !0;
        var a = P("ad_storage");
        return null == a ? !0 : !!a
    }
    function Nb(a, b) {
        ob("ad_storage") ? R() ? a() : rb(a) : b ? J(3) : qb(function() {
            Nb(a, !0)
        })
    }
    function Ob(a) {
        return Qb(a).map(function(b) {
            return b.h
        })
    }
    function Qb(a) {
        var b = [];
        if ("null" === K.origin || !L.cookie)
            return b;
        a = sb(a, L.cookie, void 0, "ad_storage");
        if (!a || 0 == a.length)
            return b;
        for (var c = {}, d = 0; d < a.length; c = {
            l: c.l
        },
        d++) {
            var e = Rb(a[d]);
            if (null != e) {
                var f = e;
                e = f.version;
                c.l = f.h;
                var g = f.timestamp;
                f = f.labels;
                var h = gb(b, function(k) {
                    return function(m) {
                        return m.h === k.l
                    }
                }(c));
                h ? (h.timestamp = Math.max(h.timestamp, g),
                h.labels = Sb(h.labels, f || [])) : b.push({
                    version: e,
                    h: c.l,
                    timestamp: g,
                    labels: f
                })
            }
        }
        b.sort(function(k, m) {
            return m.timestamp - k.timestamp
        });
        return Tb(b)
    }
    function Sb(a, b) {
        for (var c = {}, d = [], e = 0; e < a.length; e++)
            c[a[e]] = !0,
            d.push(a[e]);
        for (a = 0; a < b.length; a++)
            c[b[a]] || d.push(b[a]);
        return d
    }
    function Ub(a) {
        return a && "string" == typeof a && a.match(Kb) ? a : "_gcl"
    }
    function Vb() {
        var a = K.location.href
          , b = L.createElement("a");
        a && (b.href = a);
        var c = b.pathname;
        "/" !== c[0] && (a || J(1),
        c = "/" + c);
        a = b.hostname.replace(Fb, "");
        var d = {
            href: b.href,
            protocol: b.protocol,
            host: b.host,
            hostname: a,
            pathname: c,
            search: b.search,
            hash: b.hash,
            port: b.port
        };
        b = Hb(d, "gclid");
        c = Hb(d, "gclsrc");
        a = Hb(d, "wbraid");
        var e = Hb(d, "dclid");
        b && c && a || (d = d.hash.replace("#", ""),
        b = b || Gb(d, "gclid"),
        c = c || Gb(d, "gclsrc"),
        a = a || Gb(d, "wbraid"));
        return Wb(b, c, e, a)
    }
    function Wb(a, b, c, d) {
        function e(g, h) {
            f[h] || (f[h] = []);
            f[h].push(g)
        }
        var f = {};
        f.gclid = a;
        f.gclsrc = b;
        f.dclid = c;
        void 0 !== d && Lb.test(d) && (f.gbraid = d,
        e(d, "gb"));
        if (void 0 !== a && a.match(Lb))
            switch (b) {
            case void 0:
                e(a, "aw");
                break;
            case "aw.ds":
                e(a, "aw");
                e(a, "dc");
                break;
            case "ds":
                e(a, "dc");
                break;
            case "3p.ds":
                e(a, "dc");
                break;
            case "gf":
                e(a, "gf");
                break;
            case "ha":
                e(a, "ha")
            }
        c && e(c, "dc");
        return f
    }
    function Xb() {
        var a = {}
          , b = Vb();
        Nb(function() {
            Yb(b, a)
        })
    }
    function Yb(a, b, c, d) {
        function e(n) {
            n = ["GCL", m, n];
            0 < d.length && n.push(d.join("."));
            return n.join(".")
        }
        function f(n, q) {
            if (n = Zb(n, g))
                Ab(n, q, h),
                k = !0
        }
        b = b || {};
        d = d || [];
        var g = Ub(b.prefix);
        c = c || (new Date).getTime();
        var h = Db(b, c);
        h.s = "ad_storage";
        var k = !1
          , m = Math.round(c / 1E3);
        a.aw && f("aw", e(a.aw[0]));
        a.dc && f("dc", e(a.dc[0]));
        a.gf && f("gf", e(a.gf[0]));
        a.ha && f("ha", e(a.ha[0]));
        a.gp && f("gp", e(a.gp[0]));
        (void 0 == Jb.enable_gbraid_cookie_write ? 0 : Jb.enable_gbraid_cookie_write) && !k && a.gb && f("gb", e(a.gb[0]))
    }
    function Zb(a, b) {
        a = Mb[a];
        if (void 0 !== a)
            return b + a
    }
    function $b(a) {
        return 0 !== ac(a.split(".")).length ? 1E3 * (Number(a.split(".")[1]) || 0) : 0
    }
    function Rb(a) {
        a = ac(a.split("."));
        return 0 === a.length ? null : {
            version: a[0],
            h: a[2],
            timestamp: 1E3 * (Number(a[1]) || 0),
            labels: a.slice(3)
        }
    }
    function ac(a) {
        return 3 > a.length || "GCL" !== a[0] && "1" !== a[0] || !/^\d+$/.test(a[1]) || !Lb.test(a[2]) ? [] : a
    }
    function Tb(a) {
        return a.filter(function(b) {
            return Lb.test(b.h)
        })
    }
    function bc() {
        var a = ["aw"]
          , b = {};
        if ("null" !== K.origin) {
            for (var c = Ub(b.prefix), d = {}, e = 0; e < a.length; e++)
                Mb[a[e]] && (d[a[e]] = Mb[a[e]]);
            Nb(function() {
                hb(d, function(f, g) {
                    g = sb(c + g, L.cookie, void 0, "ad_storage");
                    g.sort(function(n, q) {
                        return $b(q) - $b(n)
                    });
                    if (g.length) {
                        var h = g[0];
                        g = $b(h);
                        var k = 0 !== ac(h.split(".")).length ? h.split(".").slice(3) : []
                          , m = {};
                        h = 0 !== ac(h.split(".")).length ? h.split(".")[2] : void 0;
                        m[f] = [h];
                        Yb(m, b, g, k)
                    }
                })
            })
        }
    }
    function cc(a, b, c, d) {
        var e = [];
        c = c || {};
        if (!R())
            return e;
        var f = Qb(a);
        if (!f.length)
            return e;
        for (var g = 0; g < f.length; g++)
            -1 === (f[g].labels || []).indexOf(b) ? e.push(0) : e.push(1);
        if (d)
            return e;
        1 !== e[0] && (d = f[0],
        f = f[0].timestamp,
        b = [d.version, Math.round(f / 1E3), d.h].concat(d.labels || [], [b]).join("."),
        c = Db(c, f),
        c.s = "ad_storage",
        Ab(a, b, c));
        return e
    }
    function dc(a, b) {
        b = Ub(b);
        a = Zb(a, b);
        if (!a)
            return 0;
        a = Qb(a);
        for (var c = b = 0; c < a.length; c++)
            b = Math.max(b, a[c].timestamp);
        return b
    }
    function ec(a) {
        var b = 0, c;
        for (c in a)
            for (var d = a[c], e = 0; e < d.length; e++)
                b = Math.max(b, Number(d[e].timestamp));
        return b
    }
    ;var fc = /^UA-\d+-\d+%3A[\w-]+(?:%2C[\w-]+)*(?:%3BUA-\d+-\d+%3A[\w-]+(?:%2C[\w-]+)*)*$/
      , gc = /^~?[\w-]+(?:\.~?[\w-]+)*$/
      , hc = /^\d+\.fls\.doubleclick\.net$/
      , ic = /;gac=([^;?]+)/
      , jc = /;gacgb=([^;?]+)/
      , kc = /;gclaw=([^;?]+)/
      , lc = /;gclgb=([^;?]+)/;
    function mc(a, b, c) {
        if (hc.test(a.location.host))
            return (b = a.location.href.match(c)) && 2 == b.length && b[1].match(fc) ? decodeURIComponent(b[1]) : "";
        a = [];
        for (var d in b) {
            c = [];
            for (var e = b[d], f = 0; f < e.length; f++)
                c.push(e[f].h);
            a.push(d + ":" + c.join(","))
        }
        return 0 < a.length ? a.join(";") : ""
    }
    function nc(a, b, c, d) {
        if (!I())
            return {
                C: "",
                B: ""
            };
        var e = R() ? Q("_gac_gb", !0) : {}, f = [], g = !1, h;
        for (h in e) {
            var k = cc("_gac_gb_" + h, b, c, d);
            g = g || 0 !== k.length && k.some(function(m) {
                return 1 === m
            });
            f.push(h + ":" + k.join(","))
        }
        return {
            C: g ? f.join(";") : "",
            B: mc(a, e, jc)
        }
    }
    function oc(a, b, c, d) {
        if (hc.test(a.location.host)) {
            if ((a = a.location.href.match(d)) && 2 == a.length && a[1].match(gc))
                return [{
                    h: a[1]
                }]
        } else
            return Qb((b || "_gcl") + c);
        return []
    }
    function pc(a, b) {
        return oc(a, b, "_aw", kc).map(function(c) {
            return c.h
        }).join(".")
    }
    function qc(a, b) {
        return I() ? oc(a, b, "_gb", lc).map(function(c) {
            return c.h
        }).join(".") : ""
    }
    function rc(a, b) {
        var c = "" !== qc(a, b) || 0 < v(Object, "keys").call(Object, R() ? Q("_gac_gb", !0) : {}).length;
        a = "" !== pc(a, b) || "" !== mc(a, R() ? Q() : {}, ic);
        return c && a
    }
    function sc(a) {
        0 !== Ob("_gcl_aw").length || a && 0 !== Ob(a + "_aw").length || (Xb(),
        bc())
    }
    function tc(a, b, c) {
        if (!I())
            return "";
        a = cc((b && b.prefix || "_gcl") + "_gb", a, b, c);
        return 0 === a.length || a.every(function(d) {
            return 0 === d
        }) ? "" : a.join(".")
    }
    ;function uc(a) {
        var b = A.performance;
        return b && b.timing && b.timing[a] || 0
    }
    ;var vc = {
        O: 0,
        H: 1,
        P: 2,
        J: 3,
        I: 4
    };
    function S() {
        this.g = {}
    }
    function wc(a, b, c) {
        "number" === typeof c && 0 < c && (a.g[b] = Math.round(c))
    }
    function xc(a) {
        var b = S.i();
        var c = void 0 === c ? A : c;
        c = c.performance;
        wc(b, a, c && c.now ? c.now() : null)
    }
    function yc() {
        function a() {
            return wc(b, 0, uc("loadEventStart") - uc("navigationStart"))
        }
        var b = S.i();
        0 != uc("loadEventStart") ? a() : window.addEventListener("load", a)
    }
    function zc(a, b) {
        b.google_tag_manager && b.google_tag_manager._li && (b = b.google_tag_manager._li,
        wc(a, 4, b.cbt),
        wc(a, 3, b.cst))
    }
    function Ac() {
        var a = S.i();
        return v(Object, "values").call(Object, vc).map(function(b) {
            return [b, a.g[b] || 0]
        })
    }
    ia(S);
    function Bc(a, b, c) {
        a = Cc(a, !0);
        if (a[b])
            return !1;
        a[b] = [];
        a[b][0] = c;
        return !0
    }
    function Cc(a, b) {
        var c = a.GooglebQhCsO;
        c || (c = {},
        b && (a.GooglebQhCsO = c));
        return c
    }
    ;function Dc(a, b) {
        a.src = Ba(b);
        var c;
        b = (a.ownerDocument && a.ownerDocument.defaultView || window).document;
        (c = (b = null === (c = b.querySelector) || void 0 === c ? void 0 : c.call(b, "script[nonce]")) ? b.nonce || b.getAttribute("nonce") || "" : "") && a.setAttribute("nonce", c)
    }
    ;var Ec = {}
      , Fc = null;
    function Gc(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            255 < e && (b[c++] = e & 255,
            e >>= 8);
            b[c++] = e
        }
        a = 4;
        void 0 === a && (a = 0);
        if (!Fc)
            for (Fc = {},
            c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),
            d = ["+/=", "+/", "-_=", "-_.", "-_"],
            e = 0; 5 > e; e++) {
                var f = c.concat(d[e].split(""));
                Ec[e] = f;
                for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    void 0 === Fc[h] && (Fc[h] = g)
                }
            }
        a = Ec[a];
        c = [];
        for (d = 0; d < b.length; d += 3) {
            var k = b[d]
              , m = (e = d + 1 < b.length) ? b[d + 1] : 0;
            h = (f = d + 2 < b.length) ? b[d + 2] : 0;
            g = k >> 2;
            k = (k & 3) << 4 | m >> 4;
            m = (m & 15) << 2 | h >> 6;
            h &= 63;
            f || (h = 64,
            e || (m = 64));
            c.push(a[g], a[k], a[m] || "", a[h] || "")
        }
        return c.join("")
    }
    ;function Hc(a, b, c, d) {
        var e = Ka(c, "fmt");
        if (d) {
            var f = Ka(c, "random")
              , g = Ka(c, "label") || "";
            if (!f)
                return !1;
            f = Gc(decodeURIComponent(g.replace(/\+/g, " ")) + ":" + decodeURIComponent(f.replace(/\+/g, " ")));
            if (!Bc(a, f, d))
                return !1
        }
        e && 4 != e && (c = B(c, "rfmt", e));
        c = B(c, "fmt", 4);
        e = Fa("SCRIPT");
        Dc(e, Ca(c));
        e.onload = function() {
            a.google_noFurtherRedirects && d && d.call && (a.google_noFurtherRedirects = null,
            d())
        }
        ;
        b.getElementsByTagName("script")[0].parentElement.appendChild(e);
        return !0
    }
    ;var Ic = C("false");
    function Jc() {
        if ("function" == typeof K.__uspapi) {
            var a = "";
            try {
                K.__uspapi("getUSPData", 1, function(b, c) {
                    c && b && (b = b.uspString) && /^[\da-zA-Z-]{1,20}$/.test(b) && (a = b)
                })
            } catch (b) {}
            return a
        }
    }
    ;var Kc = {
        id: !0,
        origin: !0,
        destination: !0,
        start_date: !0,
        end_date: !0,
        location_id: !0
    }
      , Lc = /^[a-zA-Z0-9_]+$/
      , Mc = "google_conversion_id google_conversion_format google_conversion_type google_conversion_order_id google_conversion_language google_conversion_value google_conversion_currency google_conversion_domain google_conversion_label google_conversion_color google_disable_viewthrough google_enable_display_cookie_match google_gtag_event_data google_remarketing_only google_conversion_linker google_tag_for_child_directed_treatment google_tag_for_under_age_of_consent google_allow_ad_personalization_signals google_restricted_data_processing google_conversion_items google_conversion_merchant_id google_user_id google_custom_params google_conversion_date google_conversion_time google_conversion_js_version onload_callback opt_image_generator google_gtm_url_processor google_conversion_page_url google_conversion_referrer_url google_gtm google_gcl_cookie_prefix google_gcl_cookie_path google_gcl_cookie_flags google_gcl_cookie_domain google_gcl_cookie_max_age_seconds google_read_gcl_cookie_opt_out google_basket_feed_country google_basket_feed_language google_basket_discount google_basket_transaction_type google_additional_conversion_params google_additional_params google_transport_url google_gtm_experiments".split(" ");
    function Nc(a, b) {
        var c = a;
        return function() {
            --c;
            0 >= c && b()
        }
    }
    function T(a) {
        return null != a ? encodeURIComponent(String(a)) : ""
    }
    function Oc(a) {
        if (null != a) {
            a = String(a).substring(0, 512);
            var b = a.indexOf("#");
            return -1 == b ? a : a.substring(0, b)
        }
        return ""
    }
    function U(a, b) {
        b = T(b);
        return "" != b && (a = T(a),
        "" != a) ? "&".concat(a, "=", b) : ""
    }
    function Pc(a) {
        var b = typeof a;
        return null == a || "object" == b || "function" == b ? null : String(a).replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/=/g, "\\=")
    }
    function Qc(a) {
        if (!a || "object" != typeof a || "function" == typeof a.join)
            return "";
        var b = [], c;
        for (c in a)
            if (Object.prototype.hasOwnProperty.call(a, c)) {
                var d = a[c];
                if (d && "function" === typeof d.join) {
                    for (var e = [], f = 0; f < d.length; ++f) {
                        var g = Pc(d[f]);
                        null != g && e.push(g)
                    }
                    d = 0 == e.length ? null : e.join(",")
                } else
                    d = Pc(d);
                (e = Pc(c)) && null != d && b.push(e + "=" + d)
            }
        return b.join(";")
    }
    function V(a) {
        return "number" != typeof a && "string" != typeof a ? "" : T(a.toString())
    }
    function Rc(a, b) {
        if (b.google_read_gcl_cookie_opt_out || b.google_remarketing_only || b.google_conversion_domain && (!b.google_gcl_cookie_prefix || !/^_ycl/.test(b.google_gcl_cookie_prefix)))
            return "";
        var c = ""
          , d = Sc(b)
          , e = {};
        b.google_gcl_cookie_domain && (e.domain = b.google_gcl_cookie_domain);
        b.google_gcl_cookie_flags && (e.flags = b.google_gcl_cookie_flags);
        null != b.google_gcl_cookie_max_age_seconds && (e.D = b.google_gcl_cookie_max_age_seconds);
        b.google_gcl_cookie_path && (e.path = b.google_gcl_cookie_path);
        d && (e.prefix = d);
        if (Tc(b) && b.m)
            var f = void 0 === b.o;
        else
            I() ? hc.test(a.location.host) ? f = !(kc.test(a.location.href) || ic.test(a.location.href)) : (f = Math.max(dc("aw", d), ec(R() ? Q() : {})),
            f = Math.max(dc("gb", d), ec(R() ? Q("_gac_gb", !0) : {})) > f) : f = !1;
        if (f) {
            if (void 0 !== b.o)
                return b.o;
            c = qc(a, d || void 0);
            f = b.google_conversion_label;
            var g = tc(f, e, b.m);
            c = U("gclgb", c) + (g ? U("mcov", g) : "");
            if (d)
                return b.o = c;
            d = nc(a, f, e, b.m);
            a = d.B;
            d = d.C;
            c += (a ? U("gacgb", a) : "") + (d ? U("gacmcov", d) : "");
            return b.o = c
        }
        if (d)
            return b = pc(a, d),
            U("gclaw", b);
        (b = pc(a)) && (c = U("gclaw", b));
        b = mc(a, R() ? Q() : {}, ic);
        return c + (b ? U("gac", b) : "")
    }
    function Uc(a) {
        function b(d) {
            try {
                return decodeURIComponent(d),
                !0
            } catch (e) {
                return !1
            }
        }
        a = a ? a.title : "";
        if (void 0 == a || "" == a)
            return "";
        a = encodeURIComponent(a);
        for (var c = 256; !b(a.substr(0, c)); )
            c--;
        return "&tiba=" + a.substr(0, c)
    }
    function Vc(a, b, c, d, e, f) {
        var g = "https://"
          , h = "landing" === d.google_conversion_type ? "/extclk" : "/";
        switch (e) {
        default:
            return "";
        case 2:
        case 3:
            var k = "googleads.g.doubleclick.net/";
            var m = "pagead/viewthroughconversion/";
            break;
        case 1:
            k = "www.google.com/";
            m = "pagead/1p-conversion/";
            break;
        case 0:
            k = d.google_conversion_domain || "www.googleadservices.com/";
            m = "pagead/conversion/";
            break;
        case 4:
            k = "www.google.com/",
            m = "pagead/privacysandbox/conversion/"
        }
        Va && d.google_transport_url && (k = d.google_transport_url);
        "/" !== k[k.length - 1] && (k += "/");
        if (0 === k.indexOf("http://") || 0 === k.indexOf("https://"))
            g = "";
        g = [g, k, m, T(d.google_conversion_id), h, "?random=", T(d.google_conversion_time)].join("");
        k = U("cv", d.google_conversion_js_version);
        m = U("fst", d.google_conversion_first_time);
        h = U("num", d.google_conversion_snippets);
        var n = U("fmt", d.google_conversion_format)
          , q = d.google_remarketing_only ? U("userId", d.google_user_id) : "";
        var p = d.google_tag_for_child_directed_treatment;
        p = null == p || 0 !== p && 1 !== p ? "" : U("tfcd", p);
        var y = d.google_tag_for_under_age_of_consent;
        y = null == y || 0 !== y && 1 !== y ? "" : U("tfua", y);
        var ra = d.google_allow_ad_personalization_signals;
        ra = !1 === ra ? U("npa", 1) : !0 === ra ? U("npa", 0) : "";
        var sa = d.google_restricted_data_processing;
        sa = Xa ? !0 === sa ? U("rdp", 1) : !1 === sa ? U("rdp", 0) : "" : "";
        var cd = U("value", d.google_conversion_value)
          , dd = U("currency_code", d.google_conversion_currency)
          , ed = U("label", d.google_conversion_label)
          , fd = U("oid", d.google_conversion_order_id)
          , gd = U("bg", d.google_conversion_color);
        a: {
            var x = d.google_conversion_language;
            if (null != x) {
                x = x.toString();
                if (2 == x.length) {
                    x = U("hl", x);
                    break a
                }
                if (5 == x.length) {
                    x = U("hl", x.substring(0, 2)) + U("gl", x.substring(3, 5));
                    break a
                }
            }
            x = ""
        }
        var hd = U("guid", "ON")
          , id = !d.google_conversion_domain && "GooglemKTybQhCsO"in A && "function" == typeof A.GooglemKTybQhCsO ? U("resp", "GooglemKTybQhCsO") : ""
          , jd = U("disvt", d.google_disable_viewthrough)
          , kd = U("eid", bb().join());
        var X = d.google_conversion_date;
        var u = [];
        if (a) {
            var D = a.screen;
            D && (u.push(U("u_h", D.height)),
            u.push(U("u_w", D.width)),
            u.push(U("u_ah", D.availHeight)),
            u.push(U("u_aw", D.availWidth)),
            u.push(U("u_cd", D.colorDepth)));
            a.history && u.push(U("u_his", a.history.length))
        }
        X && "function" == typeof X.getTimezoneOffset && u.push(U("u_tz", -X.getTimezoneOffset()));
        b && ("function" == typeof b.javaEnabled && u.push(U("u_java", b.javaEnabled())),
        b.plugins && u.push(U("u_nplug", b.plugins.length)),
        b.mimeTypes && u.push(U("u_nmime", b.mimeTypes.length)));
        X = u.join("");
        u = U("gtm", d.google_gtm);
        b = b && b.sendBeacon ? U("sendb", "1") : "";
        D = Wc();
        var md = U("ig", /googleadservices\.com/.test("www.googleadservices.com") ? 1 : 0)
          , ta = Qc(d.google_custom_params);
        f = Qc(f);
        f = ta.concat(0 < ta.length && 0 < f.length ? ";" : "", f);
        f = "" == f ? "" : "&".concat("data=", encodeURIComponent(f));
        ta = Rc(c, d);
        var Pb = d.google_conversion_page_url
          , nd = d.google_conversion_referrer_url
          , ua = "";
        if (c) {
            if (a.top == a)
                var t = 0;
            else {
                var F = a.location.ancestorOrigins;
                if (F)
                    t = F[F.length - 1] == a.location.origin ? 1 : 2;
                else {
                    F = a.top;
                    try {
                        var z;
                        if (z = !!F && null != F.location.href)
                            c: {
                                try {
                                    Ea(F.foo);
                                    z = !0;
                                    break c
                                } catch (od) {}
                                z = !1
                            }
                        t = z
                    } catch (od) {
                        t = !1
                    }
                    t = t ? 1 : 2
                }
            }
            z = Pb ? Pb : 1 == t ? a.top.location.href : a.location.href;
            ua += U("frm", t);
            ua += U("url", Oc(z));
            ua += U("ref", Oc(nd || c.referrer))
        }
        a = [k, m, h, n, q, p, y, ra, sa, cd, dd, ed, fd, gd, x, hd, id, jd, kd, X, u, b, D, md, f, ta, ua, Uc(c), Xc(d.google_additional_params), Xc(d.google_remarketing_only ? {} : d.google_additional_conversion_params), "&hn=" + T("www.googleadservices.com"), Yc(a)].join("");
        c = ab();
        a += 0 < c.length ? "&debug_experiment_id=" + c : "";
        if (!d.google_remarketing_only && !d.google_conversion_domain) {
            c = [U("mid", d.google_conversion_merchant_id), U("fcntr", d.google_basket_feed_country), U("flng", d.google_basket_feed_language), U("dscnt", d.google_basket_discount), U("bttype", d.google_basket_transaction_type)].join("");
            if (d)
                if (t = d.google_conversion_items) {
                    z = [];
                    k = 0;
                    for (m = t.length; k < m; k++)
                        h = t[k],
                        n = [],
                        h && (n.push(V(h.value)),
                        n.push(V(h.quantity)),
                        n.push(V(h.item_id)),
                        n.push(V(h.start_date)),
                        n.push(V(h.end_date)),
                        z.push("(" + n.join("*") + ")"));
                    t = 0 < z.length ? "&item=" + z.join("") : ""
                } else
                    t = "";
            else
                t = "";
            c = [a, c, t].join("");
            a = 4E3 < c.length ? [a, U("item", "elngth")].join("") : c
        }
        g += a;
        1 === e ? g += [U("gcp", 1), U("sscte", 1), U("ct_cookie_present", 1)].join("") : 3 == e && (g += U("gcp", 1),
        g += U("ct_cookie_present", 1));
        Wa && (e = Jc(),
        void 0 !== e && (g += U("us_privacy", e || "error")));
        Tc(d) && (g = d.m ? g + U("gbcov", 1) : g + U("gbcov", 0));
        return g
    }
    function Zc(a) {
        if (!Ic) {
            var b = Fa("IFRAME");
            b.style.display = "none";
            b.src = "https://bid.g.doubleclick.net/xbbe/pixel?d=KAE";
            a.body.appendChild(b)
        }
    }
    function $c() {
        return new Image
    }
    function ad(a, b, c, d, e, f) {
        var g = c.onload_callback;
        e = e && g && g.call ? g : function() {}
        ;
        d += U("async", "1");
        g = c.google_gtm_url_processor;
        "function" == typeof g && (d = g(d));
        var h = (g = c.opt_image_generator) && g.call;
        if (!(f = h || !f)) {
            if (c.google_conversion_domain)
                var k = !1;
            else
                try {
                    k = Hc(a, b, d, e)
                } catch (m) {
                    k = !1
                }
            f = !k
        }
        f && (a = $c,
        h && (a = g),
        a = a(),
        a.src = d,
        a.onload = e)
    }
    function bd(a, b) {
        G && "376635471" == H(2) && ("complete" === b.readyState ? Zc(b) : a.addEventListener ? a.addEventListener("load", function() {
            Zc(b)
        }) : a.attachEvent("onload", function() {
            Zc(b)
        }))
    }
    function ld(a) {
        if ("landing" === a.google_conversion_type || !a.google_conversion_id || a.google_remarketing_only && a.google_disable_viewthrough)
            return !1;
        a.google_conversion_date = new Date;
        a.google_conversion_time = a.google_conversion_date.getTime();
        a.google_conversion_snippets = "number" === typeof a.google_conversion_snippets && 0 < a.google_conversion_snippets ? a.google_conversion_snippets + 1 : 1;
        void 0 === a.google_conversion_first_time && (a.google_conversion_first_time = a.google_conversion_time);
        a.google_conversion_js_version = "9";
        0 != a.google_conversion_format && 1 != a.google_conversion_format && 2 != a.google_conversion_format && 3 != a.google_conversion_format && (a.google_conversion_format = 3);
        !1 !== a.google_enable_display_cookie_match && (a.google_enable_display_cookie_match = !0);
        return !0
    }
    function pd(a, b) {
        function c(f) {
            d[f] = b && null != b[f] ? b[f] : a[f]
        }
        for (var d = {}, e = 0; e < Mc.length; e++)
            c(Mc[e]);
        c("onload_callback");
        return d
    }
    function qd(a) {
        for (var b = {}, c = 0; c < a.length; c++) {
            var d = a[c]
              , e = void 0;
            d.hasOwnProperty("google_business_vertical") ? (e = d.google_business_vertical,
            b[e] = b[e] || {
                google_business_vertical: e
            }) : (e = "",
            Object.prototype.hasOwnProperty.call(b, e) || (b[e] = {}));
            e = b[e];
            for (var f = v(Object, "keys").call(Object, d).filter(function(k) {
                return Kc.hasOwnProperty(k)
            }), g = 0; g < f.length; g++) {
                var h = f[g];
                h in e || (e[h] = []);
                e[h].push(d[h])
            }
        }
        return v(Object, "values").call(Object, b)
    }
    function Wc() {
        var a = "";
        db() && (a = Ac().map(function(b) {
            return b.join("-")
        }).join("_"));
        return U("li", a)
    }
    function Yc(a) {
        if (!Ya || !a.__gsaExp || !a.__gsaExp.id)
            return "";
        a = a.__gsaExp.id;
        if ("function" != typeof a)
            return "";
        try {
            var b = Number(a());
            return isNaN(b) ? "" : U("gsaexp", b)
        } catch (c) {
            return ""
        }
    }
    function Xc(a) {
        if (!a)
            return "";
        var b = "", c;
        for (c in a)
            a.hasOwnProperty(c) && (b += U(c, a[c]));
        return b
    }
    function Tc(a) {
        return I() ? (a = a.google_gtm_experiments) && a.gbcov ? !0 : !1 : !1
    }
    function Sc(a) {
        return a.google_gcl_cookie_prefix && "_gcl" !== a.google_gcl_cookie_prefix && Lc.test(a.google_gcl_cookie_prefix) ? a.google_gcl_cookie_prefix : ""
    }
    ;var rd = !1
      , sd = document.currentScript && document.currentScript.src || "";
    function td(a, b, c) {
        try {
            if (!rd && (rd = !0,
            !c.google_gtm)) {
                var d = !1
                  , e = a.location.search.split("?")[1];
                e && 0 <= pa(e.split("&"), "gtm_debug=x") && (d = !0);
                d || 0 !== b.referrer.indexOf("https://tagassistant.google.com/") || (d = !0);
                !d && 0 <= pa(b.cookie.split("; "), "__TAG_ASSISTANT=x") && (d = !0);
                !d && a.__TAG_ASSISTANT_API && (d = !0);
                if (d) {
                    if (!a["google.tagmanager.debugui2.queue"]) {
                        a["google.tagmanager.debugui2.queue"] = [];
                        var f = new la(ma,"https://www.googletagmanager.com/debug/bootstrap")
                          , g = Ca(f instanceof la && f.constructor === la && f.g === na ? f.j : "type_error:Const")
                          , h = b.createElement("script");
                        h.src = Ba(g);
                        b: {
                            var k = (h.ownerDocument && h.ownerDocument.defaultView || A).document;
                            if (k.querySelector) {
                                var m = k.querySelector("script[nonce]");
                                if (m) {
                                    var n = m.nonce || m.getAttribute("nonce");
                                    if (n && Da.test(n)) {
                                        var q = n;
                                        break b
                                    }
                                }
                            }
                            q = ""
                        }
                        (d = q) && h.setAttribute("nonce", d);
                        var p = b.getElementsByTagName("script")[0];
                        p && p.parentNode && p.parentNode.insertBefore(h, p)
                    }
                    a["google.tagmanager.debugui2.queue"].push({
                        messageType: "LEGACY_CONTAINER_STARTING",
                        data: {
                            id: "AW-" + (c.google_conversion_id || ""),
                            scriptSource: sd
                        }
                    })
                }
            }
        } catch (y) {}
    }
    ;var ud = !1;
    function vd(a, b) {
        a.onload_callback = a.onload_callback && "function" == typeof a.onload_callback.call ? Nc(b, a.onload_callback) : function() {}
    }
    function wd(a, b, c, d) {
        td(a, c, d);
        db() && (xc(2),
        d.google_gtm && zc(S.i(), a));
        var e = !1;
        if (3 != d.google_conversion_format)
            return !1;
        try {
            if (ld(d)) {
                d.google_remarketing_only && d.google_enable_display_cookie_match && !Ic && G && E(["376635470", "376635471"], Ra, 2);
                d.google_remarketing_only && !d.google_conversion_domain && G && E(["759238990", "759238991"], Ua, 13);
                !d.google_remarketing_only || d.google_conversion_domain || G && ("759248991" == H(14) || "759248990" == H(14)) || G && E(["759248990", "759248991"], Ta, 14);
                !1 !== d.google_conversion_linker && (G && E(["2505059650", "2505059651"], Za ? 1 : 0, 18),
                d.google_gtm || sc(d.google_gcl_cookie_prefix));
                if (1 == d.google_remarketing_only && null != d.google_gtag_event_data && null != d.google_gtag_event_data.items && d.google_gtag_event_data.items.constructor === Array && 0 < d.google_gtag_event_data.items.length)
                    xd(a, b, c, d);
                else {
                    var f = !1;
                    v("www.googleadservices.com", "endsWith").call("www.googleadservices.com", "google.com") && (f = !0);
                    var g = d.google_additional_params;
                    g && g.dg && (f = "e" === g.dg);
                    g = function() {
                        var k = d.google_gtm_experiments;
                        if (k && k.capi && !d.google_transport_url)
                            a: {
                                if (!ud) {
                                    k = c;
                                    var m = v("www.googleadservices.com", "endsWith").call("www.googleadservices.com", "google.com") ? "" : "A7iusd6XVbb7SOF83vXQdziVdvBy4R7Bh2tuVErLbKXxemIjQH20g7jWaz48nG08Cd6zfylzuF+H+1s9S3JodAEAAACOeyJvcmlnaW4iOiJodHRwczovL3d3dy5nb29nbGVhZHNlcnZpY2VzLmNvbTo0NDMiLCJmZWF0dXJlIjoiQ29udmVyc2lvbk1lYXN1cmVtZW50IiwiZXhwaXJ5IjoxNjI2MjIwNzk5LCJpc1N1YmRvbWFpbiI6dHJ1ZSwiaXNUaGlyZFBhcnR5Ijp0cnVlfQ\x3d\x3d";
                                    k = void 0 === k ? window.document : k;
                                    if (m && k.head) {
                                        var n = document.createElement("meta");
                                        k.head.appendChild(n);
                                        n.httpEquiv = "origin-trial";
                                        n.content = m;
                                        k = n
                                    } else
                                        k = null;
                                    if (!k) {
                                        k = !1;
                                        break a
                                    }
                                    k.httpEquiv = "origin-trial"
                                }
                                ud = !0;
                                k = (k = c.featurePolicy) && "function" === typeof k.features ? 0 <= k.features().indexOf("conversion-measurement") : !1
                            }
                        else
                            k = !1;
                        k && (k = d.google_additional_conversion_params || {},
                        k.capi = "1",
                        d.google_additional_conversion_params = k,
                        ad(a, c, d, Vc(a, b, c, d, 4), !1, !1))
                    }
                    ;
                    var h = function(k, m) {
                        m = void 0 === m ? !0 : m;
                        ad(a, c, d, Vc(a, b, c, d, k), m, !0)
                    };
                    d.google_remarketing_only ? h(2) : f ? (vd(d, 2),
                    g(),
                    h(1),
                    h(3)) : (g(),
                    h(0),
                    Tc(d) && rc(c, Sc(d)) && (d.m = !0,
                    h(0, !1)))
                }
                d.google_remarketing_only && d.google_enable_display_cookie_match && bd(a, c);
                e = !0
            }
        } catch (k) {}
        return e
    }
    function xd(a, b, c, d) {
        var e = qd(d.google_gtag_event_data.items);
        vd(d, e.length);
        for (var f = 0; f < e.length; f++)
            ad(a, c, d, Vc(a, b, c, d, 2, e[f]), !0, !0),
            d.google_conversion_time = d.google_conversion_time + 1
    }
    ;G = new function() {
        var a = [], b = 0, c;
        for (c in cb)
            a[b++] = cb[c];
        this.j = {};
        this.g = {};
        a = a || [];
        b = 0;
        for (c = a.length; b < c; ++b)
            this.g[a[b]] = ""
    }
    ;
    E(["592230570", "592230571"], Sa, 16);
    db() && (xc(1),
    yc());
    function yd(a, b, c) {
        function d(m, n) {
            var q = new Image;
            q.onload = m;
            q.src = n
        }
        function e() {
            --f;
            if (0 >= f) {
                var m = Cc(a, !1)
                  , n = m[b];
                n && (delete m[b],
                (m = n[0]) && m.call && m())
            }
        }
        var f = c.length + 1;
        if (2 == c.length) {
            var g = c[0]
              , h = c[1];
            0 <= Ia(g, 0, "rmt_tld", g.search(Ja)) && 0 <= Ia(g, 0, "ipr", g.search(Ja)) && !h.match(Ga)[6] && (h += Ha(g),
            c[1] = B(h, "rmt_tld", "1"))
        }
        for (g = 0; g < c.length; g++) {
            h = c[g];
            var k = Ka(h, "fmt");
            switch (parseInt(k, 10)) {
            case 1:
            case 2:
                (k = a.document.getElementById("goog_conv_iframe")) && !k.src ? (k.onload = e,
                k.src = h) : d(e, h);
                break;
            case 4:
                Hc(a, a.document, h, e);
                break;
            case 5:
                if (a.navigator && a.navigator.sendBeacon)
                    if (a.navigator.sendBeacon(h, "")) {
                        e();
                        break
                    } else
                        h = B(h, "sendb", 2);
                h = B(h, "fmt", 3);
            default:
                d(e, h)
            }
        }
        e()
    }
    var W = ["GooglemKTybQhCsO"]
      , Y = A;
    W[0]in Y || "undefined" == typeof Y.execScript || Y.execScript("var " + W[0]);
    for (var Z; W.length && (Z = W.shift()); )
        W.length || void 0 === yd ? Y[Z] && Y[Z] !== Object.prototype[Z] ? Y = Y[Z] : Y = Y[Z] = {} : Y[Z] = yd;
    window.google_trackConversion = function(a) {
        var b = window
          , c = navigator
          , d = document;
        a = pd(b, a);
        a.google_conversion_format = 3;
        var e = !!a.google_gtm;
        M.i().j(e);
        return wd(b, c, d, a)
    }
    ;
}
).call(this);
