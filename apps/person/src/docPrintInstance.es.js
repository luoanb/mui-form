var H = Object.defineProperty;
var X = (y, i, u) => i in y ? H(y, i, { enumerable: !0, configurable: !0, writable: !0, value: u }) : y[i] = u;
var m = (y, i, u) => (X(y, typeof i != "symbol" ? i + "" : i, u), u);
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
var F = Object.prototype.toString, x = Array.isArray || function(i) {
  return F.call(i) === "[object Array]";
};
function N(y) {
  return typeof y == "function";
}
function V(y) {
  return x(y) ? "array" : typeof y;
}
function I(y) {
  return y.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function B(y, i) {
  return y != null && typeof y == "object" && i in y;
}
function $(y, i) {
  return y != null && typeof y != "object" && y.hasOwnProperty && y.hasOwnProperty(i);
}
var W = RegExp.prototype.test;
function Y(y, i) {
  return W.call(y, i);
}
var K = /\S/;
function J(y) {
  return !Y(K, y);
}
var Z = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;"
};
function q(y) {
  return String(y).replace(/[&<>"'`=\/]/g, function(u) {
    return Z[u];
  });
}
var Q = /\s*/, tt = /\s+/, D = /\s*=/, et = /\s*\}/, nt = /#|\^|\/|>|\{|&|=|!/;
function rt(y, i) {
  if (!y)
    return [];
  var u = !1, a = [], d = [], h = [], c = !1, f = !1, l = "", n = 0;
  function e() {
    if (c && !f)
      for (; h.length; )
        delete d[h.pop()];
    else
      h = [];
    c = !1, f = !1;
  }
  var t, r, o;
  function s(C) {
    if (typeof C == "string" && (C = C.split(tt, 2)), !x(C) || C.length !== 2)
      throw new Error("Invalid tags: " + C);
    t = new RegExp(I(C[0]) + "\\s*"), r = new RegExp("\\s*" + I(C[1])), o = new RegExp("\\s*" + I("}" + C[1]));
  }
  s(i || j.tags);
  for (var p = new L(y), v, b, O, P, g, _; !p.eos(); ) {
    if (v = p.pos, O = p.scanUntil(t), O)
      for (var w = 0, E = O.length; w < E; ++w)
        P = O.charAt(w), J(P) ? (h.push(d.length), l += P) : (f = !0, u = !0, l += " "), d.push(["text", P, v, v + 1]), v += 1, P === `
` && (e(), l = "", n = 0, u = !1);
    if (!p.scan(t))
      break;
    if (c = !0, b = p.scan(nt) || "name", p.scan(Q), b === "=" ? (O = p.scanUntil(D), p.scan(D), p.scanUntil(r)) : b === "{" ? (O = p.scanUntil(o), p.scan(et), p.scanUntil(r), b = "&") : O = p.scanUntil(r), !p.scan(r))
      throw new Error("Unclosed tag at " + p.pos);
    if (b == ">" ? g = [b, O, v, p.pos, l, n, u] : g = [b, O, v, p.pos], n++, d.push(g), b === "#" || b === "^")
      a.push(g);
    else if (b === "/") {
      if (_ = a.pop(), !_)
        throw new Error('Unopened section "' + O + '" at ' + v);
      if (_[1] !== O)
        throw new Error('Unclosed section "' + _[1] + '" at ' + v);
    } else
      b === "name" || b === "{" || b === "&" ? f = !0 : b === "=" && s(O);
  }
  if (e(), _ = a.pop(), _)
    throw new Error('Unclosed section "' + _[1] + '" at ' + p.pos);
  return it(ot(d));
}
function ot(y) {
  for (var i = [], u, a, d = 0, h = y.length; d < h; ++d)
    u = y[d], u && (u[0] === "text" && a && a[0] === "text" ? (a[1] += u[1], a[3] = u[3]) : (i.push(u), a = u));
  return i;
}
function it(y) {
  for (var i = [], u = i, a = [], d, h, c = 0, f = y.length; c < f; ++c)
    switch (d = y[c], d[0]) {
      case "#":
      case "^":
        u.push(d), a.push(d), u = d[4] = [];
        break;
      case "/":
        h = a.pop(), h[5] = d[2], u = a.length > 0 ? a[a.length - 1][4] : i;
        break;
      default:
        u.push(d);
    }
  return i;
}
function L(y) {
  this.string = y, this.tail = y, this.pos = 0;
}
L.prototype.eos = function() {
  return this.tail === "";
};
L.prototype.scan = function(i) {
  var u = this.tail.match(i);
  if (!u || u.index !== 0)
    return "";
  var a = u[0];
  return this.tail = this.tail.substring(a.length), this.pos += a.length, a;
};
L.prototype.scanUntil = function(i) {
  var u = this.tail.search(i), a;
  switch (u) {
    case -1:
      a = this.tail, this.tail = "";
      break;
    case 0:
      a = "";
      break;
    default:
      a = this.tail.substring(0, u), this.tail = this.tail.substring(u);
  }
  return this.pos += a.length, a;
};
function M(y, i) {
  this.view = y, this.cache = { ".": this.view }, this.parent = i;
}
M.prototype.push = function(i) {
  return new M(i, this);
};
M.prototype.lookup = function(i) {
  var u = this.cache, a;
  if (u.hasOwnProperty(i))
    a = u[i];
  else {
    for (var d = this, h, c, f, l = !1; d; ) {
      if (i.indexOf(".") > 0)
        for (h = d.view, c = i.split("."), f = 0; h != null && f < c.length; )
          f === c.length - 1 && (l = B(h, c[f]) || $(h, c[f])), h = h[c[f++]];
      else
        h = d.view[i], l = B(d.view, i);
      if (l) {
        a = h;
        break;
      }
      d = d.parent;
    }
    u[i] = a;
  }
  return N(a) && (a = a.call(this.view)), a;
};
function S() {
  this.templateCache = {
    _cache: {},
    set: function(i, u) {
      this._cache[i] = u;
    },
    get: function(i) {
      return this._cache[i];
    },
    clear: function() {
      this._cache = {};
    }
  };
}
S.prototype.clearCache = function() {
  typeof this.templateCache < "u" && this.templateCache.clear();
};
S.prototype.parse = function(i, u) {
  var a = this.templateCache, d = i + ":" + (u || j.tags).join(":"), h = typeof a < "u", c = h ? a.get(d) : void 0;
  return c == null && (c = rt(i, u), h && a.set(d, c)), c;
};
S.prototype.render = function(i, u, a, d) {
  var h = this.getConfigTags(d), c = this.parse(i, h), f = u instanceof M ? u : new M(u, void 0);
  return this.renderTokens(c, f, a, i, d);
};
S.prototype.renderTokens = function(i, u, a, d, h) {
  for (var c = "", f, l, n, e = 0, t = i.length; e < t; ++e)
    n = void 0, f = i[e], l = f[0], l === "#" ? n = this.renderSection(f, u, a, d, h) : l === "^" ? n = this.renderInverted(f, u, a, d, h) : l === ">" ? n = this.renderPartial(f, u, a, h) : l === "&" ? n = this.unescapedValue(f, u) : l === "name" ? n = this.escapedValue(f, u, h) : l === "text" && (n = this.rawValue(f)), n !== void 0 && (c += n);
  return c;
};
S.prototype.renderSection = function(i, u, a, d, h) {
  var c = this, f = "", l = u.lookup(i[1]);
  function n(r) {
    return c.render(r, u, a, h);
  }
  if (l) {
    if (x(l))
      for (var e = 0, t = l.length; e < t; ++e)
        f += this.renderTokens(i[4], u.push(l[e]), a, d, h);
    else if (typeof l == "object" || typeof l == "string" || typeof l == "number")
      f += this.renderTokens(i[4], u.push(l), a, d, h);
    else if (N(l)) {
      if (typeof d != "string")
        throw new Error("Cannot use higher-order sections without the original template");
      l = l.call(u.view, d.slice(i[3], i[5]), n), l != null && (f += l);
    } else
      f += this.renderTokens(i[4], u, a, d, h);
    return f;
  }
};
S.prototype.renderInverted = function(i, u, a, d, h) {
  var c = u.lookup(i[1]);
  if (!c || x(c) && c.length === 0)
    return this.renderTokens(i[4], u, a, d, h);
};
S.prototype.indentPartial = function(i, u, a) {
  for (var d = u.replace(/[^ \t]/g, ""), h = i.split(`
`), c = 0; c < h.length; c++)
    h[c].length && (c > 0 || !a) && (h[c] = d + h[c]);
  return h.join(`
`);
};
S.prototype.renderPartial = function(i, u, a, d) {
  if (a) {
    var h = this.getConfigTags(d), c = N(a) ? a(i[1]) : a[i[1]];
    if (c != null) {
      var f = i[6], l = i[5], n = i[4], e = c;
      l == 0 && n && (e = this.indentPartial(c, n, f));
      var t = this.parse(e, h);
      return this.renderTokens(t, u, a, e, d);
    }
  }
};
S.prototype.unescapedValue = function(i, u) {
  var a = u.lookup(i[1]);
  if (a != null)
    return a;
};
S.prototype.escapedValue = function(i, u, a) {
  var d = this.getConfigEscape(a) || j.escape, h = u.lookup(i[1]);
  if (h != null)
    return typeof h == "number" && d === j.escape ? String(h) : d(h);
};
S.prototype.rawValue = function(i) {
  return i[1];
};
S.prototype.getConfigTags = function(i) {
  return x(i) ? i : i && typeof i == "object" ? i.tags : void 0;
};
S.prototype.getConfigEscape = function(i) {
  if (i && typeof i == "object" && !x(i))
    return i.escape;
};
var j = {
  name: "mustache.js",
  version: "4.2.0",
  tags: ["{{", "}}"],
  clearCache: void 0,
  escape: void 0,
  parse: void 0,
  render: void 0,
  Scanner: void 0,
  Context: void 0,
  Writer: void 0,
  /**
   * Allows a user to override the default caching strategy, by providing an
   * object with set, get and clear methods. This can also be used to disable
   * the cache by setting it to the literal `undefined`.
   */
  set templateCache(y) {
    T.templateCache = y;
  },
  /**
   * Gets the default or overridden caching object from the default writer.
   */
  get templateCache() {
    return T.templateCache;
  }
}, T = new S();
j.clearCache = function() {
  return T.clearCache();
};
j.parse = function(i, u) {
  return T.parse(i, u);
};
j.render = function(i, u, a, d) {
  if (typeof i != "string")
    throw new TypeError('Invalid template! Template should be a "string" but "' + V(i) + '" was given as the first argument for mustache#render(template, view, partials)');
  return T.render(i, u, a, d);
};
j.escape = q;
j.Scanner = L;
j.Context = M;
j.Writer = S;
const at = () => async (y, i) => j.render(y, i), ut = () => window.location.origin + window.location.pathname, st = (y) => {
  let i = y || "";
  return i.indexOf("https://") == 0 || i.indexOf("http://") == 0 ? i : ut() + i;
};
function z(y) {
  return document.createRange().createContextualFragment(y);
}
const ct = () => async (y, i) => {
  let u = z(y), d = Array.from(u.querySelectorAll("img")).map(async (h) => {
    let c = h.getAttribute("src"), f = await (await fetch(st(c))).blob();
    return await new Promise((n, e) => {
      if (f.size == 0) {
        n(!1);
        return;
      }
      const t = new FileReader();
      t.onloadend = () => {
        const r = t.result;
        h.setAttribute("src", r), n(!0);
      }, t.onerror = () => {
        n(!1);
      }, t.readAsDataURL(f);
    });
  });
  return await Promise.all(d), new XMLSerializer().serializeToString(u);
}, lt = ({ DATASOURCE_OBJECT_KEY: y = "datasource_object_key" } = {}) => async (i, u) => {
  let a = z(i);
  return a.querySelectorAll(`[${y}]`).forEach((d, h, c) => {
    const f = d.getAttribute(y);
    d.insertAdjacentHTML("beforebegin", `{{#${f}}}`), d.insertAdjacentHTML("afterend", `{{/${f}}}`);
  }), new XMLSerializer().serializeToString(a);
};
var R;
((y) => {
  const c = class {
    /*-- Constructor (low level) and fields --*/
    // Creates a new QR Code with the given version number,
    // error correction level, data codeword bytes, and mask number.
    // This is a low-level API that most users should not use directly.
    // A mid-level API is the encodeSegments() function.
    constructor(n, e, t, r) {
      /*-- Fields --*/
      // The width and height of this QR Code, measured in modules, between
      // 21 and 177 (inclusive). This is equal to version * 4 + 17.
      m(this, "size");
      // The index of the mask pattern used in this QR Code, which is between 0 and 7 (inclusive).
      // Even if a QR Code is created with automatic masking requested (mask = -1),
      // the resulting object still has a mask value between 0 and 7.
      m(this, "mask");
      // The modules of this QR Code (false = light, true = dark).
      // Immutable after constructor finishes. Accessed through getModule().
      m(this, "modules", []);
      // Indicates function modules that are not subjected to masking. Discarded when constructor finishes.
      m(this, "isFunction", []);
      if (this.version = n, this.errorCorrectionLevel = e, n < c.MIN_VERSION || n > c.MAX_VERSION)
        throw new RangeError("Version value out of range");
      if (r < -1 || r > 7)
        throw new RangeError("Mask value out of range");
      this.size = n * 4 + 17;
      let o = [];
      for (let p = 0; p < this.size; p++)
        o.push(!1);
      for (let p = 0; p < this.size; p++)
        this.modules.push(o.slice()), this.isFunction.push(o.slice());
      this.drawFunctionPatterns();
      const s = this.addEccAndInterleave(t);
      if (this.drawCodewords(s), r == -1) {
        let p = 1e9;
        for (let v = 0; v < 8; v++) {
          this.applyMask(v), this.drawFormatBits(v);
          const b = this.getPenaltyScore();
          b < p && (r = v, p = b), this.applyMask(v);
        }
      }
      d(0 <= r && r <= 7), this.mask = r, this.applyMask(r), this.drawFormatBits(r), this.isFunction = [];
    }
    /*-- Static factory functions (high level) --*/
    // Returns a QR Code representing the given Unicode text string at the given error correction level.
    // As a conservative upper bound, this function is guaranteed to succeed for strings that have 738 or fewer
    // Unicode code points (not UTF-16 code units) if the low error correction level is used. The smallest possible
    // QR Code version is automatically chosen for the output. The ECC level of the result may be higher than the
    // ecl argument if it can be done without increasing the version.
    static encodeText(n, e) {
      const t = y.QrSegment.makeSegments(n);
      return c.encodeSegments(t, e);
    }
    // Returns a QR Code representing the given binary data at the given error correction level.
    // This function always encodes using the binary segment mode, not any text mode. The maximum number of
    // bytes allowed is 2953. The smallest possible QR Code version is automatically chosen for the output.
    // The ECC level of the result may be higher than the ecl argument if it can be done without increasing the version.
    static encodeBinary(n, e) {
      const t = y.QrSegment.makeBytes(n);
      return c.encodeSegments([t], e);
    }
    /*-- Static factory functions (mid level) --*/
    // Returns a QR Code representing the given segments with the given encoding parameters.
    // The smallest possible QR Code version within the given range is automatically
    // chosen for the output. Iff boostEcl is true, then the ECC level of the result
    // may be higher than the ecl argument if it can be done without increasing the
    // version. The mask number is either between 0 to 7 (inclusive) to force that
    // mask, or -1 to automatically choose an appropriate mask (which may be slow).
    // This function allows the user to create a custom sequence of segments that switches
    // between modes (such as alphanumeric and byte) to encode text in less space.
    // This is a mid-level API; the high-level API is encodeText() and encodeBinary().
    static encodeSegments(n, e, t = 1, r = 40, o = -1, s = !0) {
      if (!(c.MIN_VERSION <= t && t <= r && r <= c.MAX_VERSION) || o < -1 || o > 7)
        throw new RangeError("Invalid value");
      let p, v;
      for (p = t; ; p++) {
        const g = c.getNumDataCodewords(p, e) * 8, _ = h.getTotalBits(n, p);
        if (_ <= g) {
          v = _;
          break;
        }
        if (p >= r)
          throw new RangeError("Data too long");
      }
      for (const g of [c.Ecc.MEDIUM, c.Ecc.QUARTILE, c.Ecc.HIGH])
        s && v <= c.getNumDataCodewords(p, g) * 8 && (e = g);
      let b = [];
      for (const g of n) {
        u(g.mode.modeBits, 4, b), u(g.numChars, g.mode.numCharCountBits(p), b);
        for (const _ of g.getData())
          b.push(_);
      }
      d(b.length == v);
      const O = c.getNumDataCodewords(p, e) * 8;
      d(b.length <= O), u(0, Math.min(4, O - b.length), b), u(0, (8 - b.length % 8) % 8, b), d(b.length % 8 == 0);
      for (let g = 236; b.length < O; g ^= 253)
        u(g, 8, b);
      let P = [];
      for (; P.length * 8 < b.length; )
        P.push(0);
      return b.forEach((g, _) => P[_ >>> 3] |= g << 7 - (_ & 7)), new c(p, e, P, o);
    }
    /*-- Accessor methods --*/
    // Returns the color of the module (pixel) at the given coordinates, which is false
    // for light or true for dark. The top left corner has the coordinates (x=0, y=0).
    // If the given coordinates are out of bounds, then false (light) is returned.
    getModule(n, e) {
      return 0 <= n && n < this.size && 0 <= e && e < this.size && this.modules[e][n];
    }
    /*-- Private helper methods for constructor: Drawing function modules --*/
    // Reads this object's version field, and draws and marks all function modules.
    drawFunctionPatterns() {
      for (let t = 0; t < this.size; t++)
        this.setFunctionModule(6, t, t % 2 == 0), this.setFunctionModule(t, 6, t % 2 == 0);
      this.drawFinderPattern(3, 3), this.drawFinderPattern(this.size - 4, 3), this.drawFinderPattern(3, this.size - 4);
      const n = this.getAlignmentPatternPositions(), e = n.length;
      for (let t = 0; t < e; t++)
        for (let r = 0; r < e; r++)
          t == 0 && r == 0 || t == 0 && r == e - 1 || t == e - 1 && r == 0 || this.drawAlignmentPattern(n[t], n[r]);
      this.drawFormatBits(0), this.drawVersion();
    }
    // Draws two copies of the format bits (with its own error correction code)
    // based on the given mask and this object's error correction level field.
    drawFormatBits(n) {
      const e = this.errorCorrectionLevel.formatBits << 3 | n;
      let t = e;
      for (let o = 0; o < 10; o++)
        t = t << 1 ^ (t >>> 9) * 1335;
      const r = (e << 10 | t) ^ 21522;
      d(r >>> 15 == 0);
      for (let o = 0; o <= 5; o++)
        this.setFunctionModule(8, o, a(r, o));
      this.setFunctionModule(8, 7, a(r, 6)), this.setFunctionModule(8, 8, a(r, 7)), this.setFunctionModule(7, 8, a(r, 8));
      for (let o = 9; o < 15; o++)
        this.setFunctionModule(14 - o, 8, a(r, o));
      for (let o = 0; o < 8; o++)
        this.setFunctionModule(this.size - 1 - o, 8, a(r, o));
      for (let o = 8; o < 15; o++)
        this.setFunctionModule(8, this.size - 15 + o, a(r, o));
      this.setFunctionModule(8, this.size - 8, !0);
    }
    // Draws two copies of the version bits (with its own error correction code),
    // based on this object's version field, iff 7 <= version <= 40.
    drawVersion() {
      if (this.version < 7)
        return;
      let n = this.version;
      for (let t = 0; t < 12; t++)
        n = n << 1 ^ (n >>> 11) * 7973;
      const e = this.version << 12 | n;
      d(e >>> 18 == 0);
      for (let t = 0; t < 18; t++) {
        const r = a(e, t), o = this.size - 11 + t % 3, s = Math.floor(t / 3);
        this.setFunctionModule(o, s, r), this.setFunctionModule(s, o, r);
      }
    }
    // Draws a 9*9 finder pattern including the border separator,
    // with the center module at (x, y). Modules can be out of bounds.
    drawFinderPattern(n, e) {
      for (let t = -4; t <= 4; t++)
        for (let r = -4; r <= 4; r++) {
          const o = Math.max(Math.abs(r), Math.abs(t)), s = n + r, p = e + t;
          0 <= s && s < this.size && 0 <= p && p < this.size && this.setFunctionModule(s, p, o != 2 && o != 4);
        }
    }
    // Draws a 5*5 alignment pattern, with the center module
    // at (x, y). All modules must be in bounds.
    drawAlignmentPattern(n, e) {
      for (let t = -2; t <= 2; t++)
        for (let r = -2; r <= 2; r++)
          this.setFunctionModule(n + r, e + t, Math.max(Math.abs(r), Math.abs(t)) != 1);
    }
    // Sets the color of a module and marks it as a function module.
    // Only used by the constructor. Coordinates must be in bounds.
    setFunctionModule(n, e, t) {
      this.modules[e][n] = t, this.isFunction[e][n] = !0;
    }
    /*-- Private helper methods for constructor: Codewords and masking --*/
    // Returns a new byte string representing the given data with the appropriate error correction
    // codewords appended to it, based on this object's version and error correction level.
    addEccAndInterleave(n) {
      const e = this.version, t = this.errorCorrectionLevel;
      if (n.length != c.getNumDataCodewords(e, t))
        throw new RangeError("Invalid argument");
      const r = c.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][e], o = c.ECC_CODEWORDS_PER_BLOCK[t.ordinal][e], s = Math.floor(c.getNumRawDataModules(e) / 8), p = r - s % r, v = Math.floor(s / r);
      let b = [];
      const O = c.reedSolomonComputeDivisor(o);
      for (let g = 0, _ = 0; g < r; g++) {
        let w = n.slice(_, _ + v - o + (g < p ? 0 : 1));
        _ += w.length;
        const E = c.reedSolomonComputeRemainder(w, O);
        g < p && w.push(0), b.push(w.concat(E));
      }
      let P = [];
      for (let g = 0; g < b[0].length; g++)
        b.forEach((_, w) => {
          (g != v - o || w >= p) && P.push(_[g]);
        });
      return d(P.length == s), P;
    }
    // Draws the given sequence of 8-bit codewords (data and error correction) onto the entire
    // data area of this QR Code. Function modules need to be marked off before this is called.
    drawCodewords(n) {
      if (n.length != Math.floor(c.getNumRawDataModules(this.version) / 8))
        throw new RangeError("Invalid argument");
      let e = 0;
      for (let t = this.size - 1; t >= 1; t -= 2) {
        t == 6 && (t = 5);
        for (let r = 0; r < this.size; r++)
          for (let o = 0; o < 2; o++) {
            const s = t - o, v = (t + 1 & 2) == 0 ? this.size - 1 - r : r;
            !this.isFunction[v][s] && e < n.length * 8 && (this.modules[v][s] = a(n[e >>> 3], 7 - (e & 7)), e++);
          }
      }
      d(e == n.length * 8);
    }
    // XORs the codeword modules in this QR Code with the given mask pattern.
    // The function modules must be marked and the codeword bits must be drawn
    // before masking. Due to the arithmetic of XOR, calling applyMask() with
    // the same mask value a second time will undo the mask. A final well-formed
    // QR Code needs exactly one (not zero, two, etc.) mask applied.
    applyMask(n) {
      if (n < 0 || n > 7)
        throw new RangeError("Mask value out of range");
      for (let e = 0; e < this.size; e++)
        for (let t = 0; t < this.size; t++) {
          let r;
          switch (n) {
            case 0:
              r = (t + e) % 2 == 0;
              break;
            case 1:
              r = e % 2 == 0;
              break;
            case 2:
              r = t % 3 == 0;
              break;
            case 3:
              r = (t + e) % 3 == 0;
              break;
            case 4:
              r = (Math.floor(t / 3) + Math.floor(e / 2)) % 2 == 0;
              break;
            case 5:
              r = t * e % 2 + t * e % 3 == 0;
              break;
            case 6:
              r = (t * e % 2 + t * e % 3) % 2 == 0;
              break;
            case 7:
              r = ((t + e) % 2 + t * e % 3) % 2 == 0;
              break;
            default:
              throw new Error("Unreachable");
          }
          !this.isFunction[e][t] && r && (this.modules[e][t] = !this.modules[e][t]);
        }
    }
    // Calculates and returns the penalty score based on state of this QR Code's current modules.
    // This is used by the automatic mask choice algorithm to find the mask pattern that yields the lowest score.
    getPenaltyScore() {
      let n = 0;
      for (let o = 0; o < this.size; o++) {
        let s = !1, p = 0, v = [0, 0, 0, 0, 0, 0, 0];
        for (let b = 0; b < this.size; b++)
          this.modules[o][b] == s ? (p++, p == 5 ? n += c.PENALTY_N1 : p > 5 && n++) : (this.finderPenaltyAddHistory(p, v), s || (n += this.finderPenaltyCountPatterns(v) * c.PENALTY_N3), s = this.modules[o][b], p = 1);
        n += this.finderPenaltyTerminateAndCount(s, p, v) * c.PENALTY_N3;
      }
      for (let o = 0; o < this.size; o++) {
        let s = !1, p = 0, v = [0, 0, 0, 0, 0, 0, 0];
        for (let b = 0; b < this.size; b++)
          this.modules[b][o] == s ? (p++, p == 5 ? n += c.PENALTY_N1 : p > 5 && n++) : (this.finderPenaltyAddHistory(p, v), s || (n += this.finderPenaltyCountPatterns(v) * c.PENALTY_N3), s = this.modules[b][o], p = 1);
        n += this.finderPenaltyTerminateAndCount(s, p, v) * c.PENALTY_N3;
      }
      for (let o = 0; o < this.size - 1; o++)
        for (let s = 0; s < this.size - 1; s++) {
          const p = this.modules[o][s];
          p == this.modules[o][s + 1] && p == this.modules[o + 1][s] && p == this.modules[o + 1][s + 1] && (n += c.PENALTY_N2);
        }
      let e = 0;
      for (const o of this.modules)
        e = o.reduce((s, p) => s + (p ? 1 : 0), e);
      const t = this.size * this.size, r = Math.ceil(Math.abs(e * 20 - t * 10) / t) - 1;
      return d(0 <= r && r <= 9), n += r * c.PENALTY_N4, d(0 <= n && n <= 2568888), n;
    }
    /*-- Private helper functions --*/
    // Returns an ascending list of positions of alignment patterns for this version number.
    // Each position is in the range [0,177), and are used on both the x and y axes.
    // This could be implemented as lookup table of 40 variable-length lists of integers.
    getAlignmentPatternPositions() {
      if (this.version == 1)
        return [];
      {
        const n = Math.floor(this.version / 7) + 2, e = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (n * 2 - 2)) * 2;
        let t = [6];
        for (let r = this.size - 7; t.length < n; r -= e)
          t.splice(1, 0, r);
        return t;
      }
    }
    // Returns the number of data bits that can be stored in a QR Code of the given version number, after
    // all function modules are excluded. This includes remainder bits, so it might not be a multiple of 8.
    // The result is in the range [208, 29648]. This could be implemented as a 40-entry lookup table.
    static getNumRawDataModules(n) {
      if (n < c.MIN_VERSION || n > c.MAX_VERSION)
        throw new RangeError("Version number out of range");
      let e = (16 * n + 128) * n + 64;
      if (n >= 2) {
        const t = Math.floor(n / 7) + 2;
        e -= (25 * t - 10) * t - 55, n >= 7 && (e -= 36);
      }
      return d(208 <= e && e <= 29648), e;
    }
    // Returns the number of 8-bit data (i.e. not error correction) codewords contained in any
    // QR Code of the given version number and error correction level, with remainder bits discarded.
    // This stateless pure function could be implemented as a (40*4)-cell lookup table.
    static getNumDataCodewords(n, e) {
      return Math.floor(c.getNumRawDataModules(n) / 8) - c.ECC_CODEWORDS_PER_BLOCK[e.ordinal][n] * c.NUM_ERROR_CORRECTION_BLOCKS[e.ordinal][n];
    }
    // Returns a Reed-Solomon ECC generator polynomial for the given degree. This could be
    // implemented as a lookup table over all possible parameter values, instead of as an algorithm.
    static reedSolomonComputeDivisor(n) {
      if (n < 1 || n > 255)
        throw new RangeError("Degree out of range");
      let e = [];
      for (let r = 0; r < n - 1; r++)
        e.push(0);
      e.push(1);
      let t = 1;
      for (let r = 0; r < n; r++) {
        for (let o = 0; o < e.length; o++)
          e[o] = c.reedSolomonMultiply(e[o], t), o + 1 < e.length && (e[o] ^= e[o + 1]);
        t = c.reedSolomonMultiply(t, 2);
      }
      return e;
    }
    // Returns the Reed-Solomon error correction codeword for the given data and divisor polynomials.
    static reedSolomonComputeRemainder(n, e) {
      let t = e.map((r) => 0);
      for (const r of n) {
        const o = r ^ t.shift();
        t.push(0), e.forEach((s, p) => t[p] ^= c.reedSolomonMultiply(s, o));
      }
      return t;
    }
    // Returns the product of the two given field elements modulo GF(2^8/0x11D). The arguments and result
    // are unsigned 8-bit integers. This could be implemented as a lookup table of 256*256 entries of uint8.
    static reedSolomonMultiply(n, e) {
      if (n >>> 8 || e >>> 8)
        throw new RangeError("Byte out of range");
      let t = 0;
      for (let r = 7; r >= 0; r--)
        t = t << 1 ^ (t >>> 7) * 285, t ^= (e >>> r & 1) * n;
      return d(t >>> 8 == 0), t;
    }
    // Can only be called immediately after a light run is added, and
    // returns either 0, 1, or 2. A helper function for getPenaltyScore().
    finderPenaltyCountPatterns(n) {
      const e = n[1];
      d(e <= this.size * 3);
      const t = e > 0 && n[2] == e && n[3] == e * 3 && n[4] == e && n[5] == e;
      return (t && n[0] >= e * 4 && n[6] >= e ? 1 : 0) + (t && n[6] >= e * 4 && n[0] >= e ? 1 : 0);
    }
    // Must be called at the end of a line (row or column) of modules. A helper function for getPenaltyScore().
    finderPenaltyTerminateAndCount(n, e, t) {
      return n && (this.finderPenaltyAddHistory(e, t), e = 0), e += this.size, this.finderPenaltyAddHistory(e, t), this.finderPenaltyCountPatterns(t);
    }
    // Pushes the given value to the front and drops the last value. A helper function for getPenaltyScore().
    finderPenaltyAddHistory(n, e) {
      e[0] == 0 && (n += this.size), e.pop(), e.unshift(n);
    }
  };
  let i = c;
  /*-- Constants and tables --*/
  // The minimum version number supported in the QR Code Model 2 standard.
  m(i, "MIN_VERSION", 1), // The maximum version number supported in the QR Code Model 2 standard.
  m(i, "MAX_VERSION", 40), // For use in getPenaltyScore(), when evaluating which mask is best.
  m(i, "PENALTY_N1", 3), m(i, "PENALTY_N2", 3), m(i, "PENALTY_N3", 40), m(i, "PENALTY_N4", 10), m(i, "ECC_CODEWORDS_PER_BLOCK", [
    // Version: (note that index 0 is for padding, and is set to an illegal value)
    //0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40    Error correction level
    [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    // Low
    [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    // Medium
    [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    // Quartile
    [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    // High
  ]), m(i, "NUM_ERROR_CORRECTION_BLOCKS", [
    // Version: (note that index 0 is for padding, and is set to an illegal value)
    //0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40    Error correction level
    [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    // Low
    [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
    // Medium
    [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
    // Quartile
    [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
    // High
  ]), y.QrCode = i;
  function u(l, n, e) {
    if (n < 0 || n > 31 || l >>> n)
      throw new RangeError("Value out of range");
    for (let t = n - 1; t >= 0; t--)
      e.push(l >>> t & 1);
  }
  function a(l, n) {
    return (l >>> n & 1) != 0;
  }
  function d(l) {
    if (!l)
      throw new Error("Assertion error");
  }
  const f = class {
    /*-- Constructor (low level) and fields --*/
    // Creates a new QR Code segment with the given attributes and data.
    // The character count (numChars) must agree with the mode and the bit buffer length,
    // but the constraint isn't checked. The given bit buffer is cloned and stored.
    constructor(n, e, t) {
      if (this.mode = n, this.numChars = e, this.bitData = t, e < 0)
        throw new RangeError("Invalid argument");
      this.bitData = t.slice();
    }
    /*-- Static factory functions (mid level) --*/
    // Returns a segment representing the given binary data encoded in
    // byte mode. All input byte arrays are acceptable. Any text string
    // can be converted to UTF-8 bytes and encoded as a byte mode segment.
    static makeBytes(n) {
      let e = [];
      for (const t of n)
        u(t, 8, e);
      return new f(f.Mode.BYTE, n.length, e);
    }
    // Returns a segment representing the given string of decimal digits encoded in numeric mode.
    static makeNumeric(n) {
      if (!f.isNumeric(n))
        throw new RangeError("String contains non-numeric characters");
      let e = [];
      for (let t = 0; t < n.length; ) {
        const r = Math.min(n.length - t, 3);
        u(parseInt(n.substring(t, t + r), 10), r * 3 + 1, e), t += r;
      }
      return new f(f.Mode.NUMERIC, n.length, e);
    }
    // Returns a segment representing the given text string encoded in alphanumeric mode.
    // The characters allowed are: 0 to 9, A to Z (uppercase only), space,
    // dollar, percent, asterisk, plus, hyphen, period, slash, colon.
    static makeAlphanumeric(n) {
      if (!f.isAlphanumeric(n))
        throw new RangeError("String contains unencodable characters in alphanumeric mode");
      let e = [], t;
      for (t = 0; t + 2 <= n.length; t += 2) {
        let r = f.ALPHANUMERIC_CHARSET.indexOf(n.charAt(t)) * 45;
        r += f.ALPHANUMERIC_CHARSET.indexOf(n.charAt(t + 1)), u(r, 11, e);
      }
      return t < n.length && u(f.ALPHANUMERIC_CHARSET.indexOf(n.charAt(t)), 6, e), new f(f.Mode.ALPHANUMERIC, n.length, e);
    }
    // Returns a new mutable list of zero or more segments to represent the given Unicode text string.
    // The result may use various segment modes and switch modes to optimize the length of the bit stream.
    static makeSegments(n) {
      return n == "" ? [] : f.isNumeric(n) ? [f.makeNumeric(n)] : f.isAlphanumeric(n) ? [f.makeAlphanumeric(n)] : [f.makeBytes(f.toUtf8ByteArray(n))];
    }
    // Returns a segment representing an Extended Channel Interpretation
    // (ECI) designator with the given assignment value.
    static makeEci(n) {
      let e = [];
      if (n < 0)
        throw new RangeError("ECI assignment value out of range");
      if (n < 1 << 7)
        u(n, 8, e);
      else if (n < 1 << 14)
        u(2, 2, e), u(n, 14, e);
      else if (n < 1e6)
        u(6, 3, e), u(n, 21, e);
      else
        throw new RangeError("ECI assignment value out of range");
      return new f(f.Mode.ECI, 0, e);
    }
    // Tests whether the given string can be encoded as a segment in numeric mode.
    // A string is encodable iff each character is in the range 0 to 9.
    static isNumeric(n) {
      return f.NUMERIC_REGEX.test(n);
    }
    // Tests whether the given string can be encoded as a segment in alphanumeric mode.
    // A string is encodable iff each character is in the following set: 0 to 9, A to Z
    // (uppercase only), space, dollar, percent, asterisk, plus, hyphen, period, slash, colon.
    static isAlphanumeric(n) {
      return f.ALPHANUMERIC_REGEX.test(n);
    }
    /*-- Methods --*/
    // Returns a new copy of the data bits of this segment.
    getData() {
      return this.bitData.slice();
    }
    // (Package-private) Calculates and returns the number of bits needed to encode the given segments at
    // the given version. The result is infinity if a segment has too many characters to fit its length field.
    static getTotalBits(n, e) {
      let t = 0;
      for (const r of n) {
        const o = r.mode.numCharCountBits(e);
        if (r.numChars >= 1 << o)
          return 1 / 0;
        t += 4 + o + r.bitData.length;
      }
      return t;
    }
    // Returns a new array of bytes representing the given string encoded in UTF-8.
    static toUtf8ByteArray(n) {
      n = encodeURI(n);
      let e = [];
      for (let t = 0; t < n.length; t++)
        n.charAt(t) != "%" ? e.push(n.charCodeAt(t)) : (e.push(parseInt(n.substring(t + 1, t + 3), 16)), t += 2);
      return e;
    }
  };
  let h = f;
  /*-- Constants --*/
  // Describes precisely all strings that are encodable in numeric mode.
  m(h, "NUMERIC_REGEX", /^[0-9]*$/), // Describes precisely all strings that are encodable in alphanumeric mode.
  m(h, "ALPHANUMERIC_REGEX", /^[A-Z0-9 $%*+.\/:-]*$/), // The set of all legal characters in alphanumeric mode,
  // where each character value maps to the index in the string.
  m(h, "ALPHANUMERIC_CHARSET", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:"), y.QrSegment = h;
})(R || (R = {}));
((y) => {
  ((i) => {
    const a = class {
      // The QR Code can tolerate about 30% erroneous codewords
      /*-- Constructor and fields --*/
      constructor(h, c) {
        this.ordinal = h, this.formatBits = c;
      }
    };
    let u = a;
    /*-- Constants --*/
    m(u, "LOW", new a(0, 1)), // The QR Code can tolerate about  7% erroneous codewords
    m(u, "MEDIUM", new a(1, 0)), // The QR Code can tolerate about 15% erroneous codewords
    m(u, "QUARTILE", new a(2, 3)), // The QR Code can tolerate about 25% erroneous codewords
    m(u, "HIGH", new a(3, 2)), i.Ecc = u;
  })(y.QrCode || (y.QrCode = {}));
})(R || (R = {}));
((y) => {
  ((i) => {
    const a = class {
      /*-- Constructor and fields --*/
      constructor(h, c) {
        this.modeBits = h, this.numBitsCharCount = c;
      }
      /*-- Method --*/
      // (Package-private) Returns the bit width of the character count field for a segment in
      // this mode in a QR Code at the given version number. The result is in the range [0, 16].
      numCharCountBits(h) {
        return this.numBitsCharCount[Math.floor((h + 7) / 17)];
      }
    };
    let u = a;
    /*-- Constants --*/
    m(u, "NUMERIC", new a(1, [10, 12, 14])), m(u, "ALPHANUMERIC", new a(2, [9, 11, 13])), m(u, "BYTE", new a(4, [8, 16, 16])), m(u, "KANJI", new a(8, [8, 10, 12])), m(u, "ECI", new a(7, [0, 0, 0])), i.Mode = u;
  })(y.QrSegment || (y.QrSegment = {}));
})(R || (R = {}));
/*! JsBarcode v3.11.5 | (c) Johan Lindell | MIT license */
(function(y) {
  var i = {};
  function u(a) {
    if (i[a])
      return i[a].exports;
    var d = i[a] = { i: a, l: !1, exports: {} };
    return y[a].call(d.exports, d, d.exports, u), d.l = !0, d.exports;
  }
  u.m = y, u.c = i, u.d = function(a, d, h) {
    u.o(a, d) || Object.defineProperty(a, d, { enumerable: !0, get: h });
  }, u.r = function(a) {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a, "__esModule", { value: !0 });
  }, u.t = function(a, d) {
    if (1 & d && (a = u(a)), 8 & d || 4 & d && typeof a == "object" && a && a.__esModule)
      return a;
    var h = /* @__PURE__ */ Object.create(null);
    if (u.r(h), Object.defineProperty(h, "default", { enumerable: !0, value: a }), 2 & d && typeof a != "string")
      for (var c in a)
        u.d(h, c, function(f) {
          return a[f];
        }.bind(null, c));
    return h;
  }, u.n = function(a) {
    var d = a && a.__esModule ? function() {
      return a.default;
    } : function() {
      return a;
    };
    return u.d(d, "a", d), d;
  }, u.o = function(a, d) {
    return Object.prototype.hasOwnProperty.call(a, d);
  }, u.p = "", u(u.s = 15);
})([function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.default = function a(d, h) {
    (function(c, f) {
      if (!(c instanceof f))
        throw new TypeError("Cannot call a class as a function");
    })(this, a), this.data = d, this.text = h.text || d, this.options = h;
  };
}, function(y, i, u) {
  var a;
  function d(t, r, o) {
    return r in t ? Object.defineProperty(t, r, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : t[r] = o, t;
  }
  Object.defineProperty(i, "__esModule", { value: !0 });
  var h = i.SET_A = 0, c = i.SET_B = 1, f = i.SET_C = 2, l = (i.SHIFT = 98, i.START_A = 103), n = i.START_B = 104, e = i.START_C = 105;
  i.MODULO = 103, i.STOP = 106, i.FNC1 = 207, i.SET_BY_CODE = (d(a = {}, l, h), d(a, n, c), d(a, e, f), a), i.SWAP = { 101: h, 100: c, 99: f }, i.A_START_CHAR = String.fromCharCode(208), i.B_START_CHAR = String.fromCharCode(209), i.C_START_CHAR = String.fromCharCode(210), i.A_CHARS = "[\0-_È-Ï]", i.B_CHARS = "[ -È-Ï]", i.C_CHARS = "(Ï*[0-9]{2}Ï*)", i.BARS = [11011001100, 11001101100, 11001100110, 10010011e3, 10010001100, 10001001100, 10011001e3, 10011000100, 10001100100, 11001001e3, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011e3, 11011000110, 11000110110, 10100011e3, 10001011e3, 10001000110, 10110001e3, 10001101e3, 10001100010, 11010001e3, 11000101e3, 11000100010, 10110111e3, 10110001110, 10001101110, 10111011e3, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101e3, 11011100010, 11011101110, 11101011e3, 11101000110, 11100010110, 11101101e3, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 1010011e4, 10100001100, 1001011e4, 10010000110, 10000101100, 10000100110, 1011001e4, 10110000100, 1001101e4, 10011000010, 10000110100, 10000110010, 11000010010, 1100101e4, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111e3, 10100011110, 10001011110, 10111101e3, 10111100010, 11110101e3, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 1101001e4, 11010011100, 1100011101011];
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.SIDE_BIN = "101", i.MIDDLE_BIN = "01010", i.BINARIES = { L: ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"], G: ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"], R: ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"], O: ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"], E: ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"] }, i.EAN2_STRUCTURE = ["LL", "LG", "GL", "GG"], i.EAN5_STRUCTURE = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"], i.EAN13_STRUCTURE = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = u(2);
  i.default = function(d, h, c) {
    var f = d.split("").map(function(n, e) {
      return a.BINARIES[h[e]];
    }).map(function(n, e) {
      return n ? n[d[e]] : "";
    });
    if (c) {
      var l = d.length - 1;
      f = f.map(function(n, e) {
        return e < l ? n + c : n;
      });
    }
    return f.join("");
  };
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = function() {
    function l(n, e) {
      for (var t = 0; t < e.length; t++) {
        var r = e[t];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r);
      }
    }
    return function(n, e, t) {
      return e && l(n.prototype, e), t && l(n, t), n;
    };
  }(), h = u(0), c = function(l) {
    function n(e, t) {
      return function(r, o) {
        if (!(r instanceof o))
          throw new TypeError("Cannot call a class as a function");
      }(this, n), function(r, o) {
        if (!r)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !o || typeof o != "object" && typeof o != "function" ? r : o;
      }(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
    }
    return function(e, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }(n, l), d(n, [{ key: "encode", value: function() {
      for (var e = "110", t = 0; t < this.data.length; t++) {
        var r = parseInt(this.data[t]).toString(2);
        r = f(r, 4 - r.length);
        for (var o = 0; o < r.length; o++)
          e += r[o] == "0" ? "100" : "110";
      }
      return { data: e += "1001", text: this.text };
    } }, { key: "valid", value: function() {
      return this.data.search(/^[0-9]+$/) !== -1;
    } }]), n;
  }(((a = h) && a.__esModule ? a : { default: a }).default);
  function f(l, n) {
    for (var e = 0; e < n; e++)
      l = "0" + l;
    return l;
  }
  i.default = c;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = function() {
    function n(e, t) {
      for (var r = 0; r < t.length; r++) {
        var o = t[r];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }
    return function(e, t, r) {
      return t && n(e.prototype, t), r && n(e, r), e;
    };
  }(), h = u(0), c = (a = h) && a.__esModule ? a : { default: a }, f = u(1), l = function(n) {
    function e(t, r) {
      (function(s, p) {
        if (!(s instanceof p))
          throw new TypeError("Cannot call a class as a function");
      })(this, e);
      var o = function(s, p) {
        if (!s)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !p || typeof p != "object" && typeof p != "function" ? s : p;
      }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t.substring(1), r));
      return o.bytes = t.split("").map(function(s) {
        return s.charCodeAt(0);
      }), o;
    }
    return function(t, r) {
      if (typeof r != "function" && r !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof r);
      t.prototype = Object.create(r && r.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(t, r) : t.__proto__ = r);
    }(e, n), d(e, [{ key: "valid", value: function() {
      return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data);
    } }, { key: "encode", value: function() {
      var t = this.bytes, r = t.shift() - 105, o = f.SET_BY_CODE[r];
      if (o === void 0)
        throw new RangeError("The encoding does not start with a start character.");
      this.shouldEncodeAsEan128() === !0 && t.unshift(f.FNC1);
      var s = e.next(t, 1, o);
      return { text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text, data: e.getBar(r) + s.result + e.getBar((s.checksum + r) % f.MODULO) + e.getBar(f.STOP) };
    } }, { key: "shouldEncodeAsEan128", value: function() {
      var t = this.options.ean128 || !1;
      return typeof t == "string" && (t = t.toLowerCase() === "true"), t;
    } }], [{ key: "getBar", value: function(t) {
      return f.BARS[t] ? f.BARS[t].toString() : "";
    } }, { key: "correctIndex", value: function(t, r) {
      if (r === f.SET_A) {
        var o = t.shift();
        return o < 32 ? o + 64 : o - 32;
      }
      return r === f.SET_B ? t.shift() - 32 : 10 * (t.shift() - 48) + t.shift() - 48;
    } }, { key: "next", value: function(t, r, o) {
      if (!t.length)
        return { result: "", checksum: 0 };
      var s = void 0, p = void 0;
      if (t[0] >= 200) {
        p = t.shift() - 105;
        var v = f.SWAP[p];
        v !== void 0 ? s = e.next(t, r + 1, v) : (o !== f.SET_A && o !== f.SET_B || p !== f.SHIFT || (t[0] = o === f.SET_A ? t[0] > 95 ? t[0] - 96 : t[0] : t[0] < 32 ? t[0] + 96 : t[0]), s = e.next(t, r + 1, o));
      } else
        p = e.correctIndex(t, o), s = e.next(t, r + 1, o);
      var b = p * r;
      return { result: e.getBar(p) + s.result, checksum: b + s.checksum };
    } }]), e;
  }(c.default);
  i.default = l;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.mod10 = function(a) {
    for (var d = 0, h = 0; h < a.length; h++) {
      var c = parseInt(a[h]);
      (h + a.length) % 2 == 0 ? d += c : d += 2 * c % 10 + Math.floor(2 * c / 10);
    }
    return (10 - d % 10) % 10;
  }, i.mod11 = function(a) {
    for (var d = 0, h = [2, 3, 4, 5, 6, 7], c = 0; c < a.length; c++) {
      var f = parseInt(a[a.length - 1 - c]);
      d += h[c % h.length] * f;
    }
    return (11 - d % 11) % 11;
  };
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = Object.assign || function(d) {
    for (var h = 1; h < arguments.length; h++) {
      var c = arguments[h];
      for (var f in c)
        Object.prototype.hasOwnProperty.call(c, f) && (d[f] = c[f]);
    }
    return d;
  };
  i.default = function(d, h) {
    return a({}, d, h);
  };
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = function() {
    function l(n, e) {
      for (var t = 0; t < e.length; t++) {
        var r = e[t];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r);
      }
    }
    return function(n, e, t) {
      return e && l(n.prototype, e), t && l(n, t), n;
    };
  }(), d = u(2), h = c(u(3));
  function c(l) {
    return l && l.__esModule ? l : { default: l };
  }
  var f = function(l) {
    function n(e, t) {
      (function(o, s) {
        if (!(o instanceof s))
          throw new TypeError("Cannot call a class as a function");
      })(this, n);
      var r = function(o, s) {
        if (!o)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !s || typeof s != "object" && typeof s != "function" ? o : s;
      }(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
      return r.fontSize = !t.flat && t.fontSize > 10 * t.width ? 10 * t.width : t.fontSize, r.guardHeight = t.height + r.fontSize / 2 + t.textMargin, r;
    }
    return function(e, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }(n, l), a(n, [{ key: "encode", value: function() {
      return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
    } }, { key: "leftText", value: function(e, t) {
      return this.text.substr(e, t);
    } }, { key: "leftEncode", value: function(e, t) {
      return (0, h.default)(e, t);
    } }, { key: "rightText", value: function(e, t) {
      return this.text.substr(e, t);
    } }, { key: "rightEncode", value: function(e, t) {
      return (0, h.default)(e, t);
    } }, { key: "encodeGuarded", value: function() {
      var e = { fontSize: this.fontSize }, t = { height: this.guardHeight };
      return [{ data: d.SIDE_BIN, options: t }, { data: this.leftEncode(), text: this.leftText(), options: e }, { data: d.MIDDLE_BIN, options: t }, { data: this.rightEncode(), text: this.rightText(), options: e }, { data: d.SIDE_BIN, options: t }];
    } }, { key: "encodeFlat", value: function() {
      return { data: [d.SIDE_BIN, this.leftEncode(), d.MIDDLE_BIN, this.rightEncode(), d.SIDE_BIN].join(""), text: this.text };
    } }]), n;
  }(c(u(0)).default);
  i.default = f;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = function() {
    function l(n, e) {
      for (var t = 0; t < e.length; t++) {
        var r = e[t];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r);
      }
    }
    return function(n, e, t) {
      return e && l(n.prototype, e), t && l(n, t), n;
    };
  }();
  i.checksum = f;
  var d = h(u(3));
  function h(l) {
    return l && l.__esModule ? l : { default: l };
  }
  var c = function(l) {
    function n(e, t) {
      (function(o, s) {
        if (!(o instanceof s))
          throw new TypeError("Cannot call a class as a function");
      })(this, n), e.search(/^[0-9]{11}$/) !== -1 && (e += f(e));
      var r = function(o, s) {
        if (!o)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !s || typeof s != "object" && typeof s != "function" ? o : s;
      }(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
      return r.displayValue = t.displayValue, t.fontSize > 10 * t.width ? r.fontSize = 10 * t.width : r.fontSize = t.fontSize, r.guardHeight = t.height + r.fontSize / 2 + t.textMargin, r;
    }
    return function(e, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }(n, l), a(n, [{ key: "valid", value: function() {
      return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == f(this.data);
    } }, { key: "encode", value: function() {
      return this.options.flat ? this.flatEncoding() : this.guardedEncoding();
    } }, { key: "flatEncoding", value: function() {
      var e = "";
      return e += "101", e += (0, d.default)(this.data.substr(0, 6), "LLLLLL"), e += "01010", e += (0, d.default)(this.data.substr(6, 6), "RRRRRR"), { data: e += "101", text: this.text };
    } }, { key: "guardedEncoding", value: function() {
      var e = [];
      return this.displayValue && e.push({ data: "00000000", text: this.text.substr(0, 1), options: { textAlign: "left", fontSize: this.fontSize } }), e.push({ data: "101" + (0, d.default)(this.data[0], "L"), options: { height: this.guardHeight } }), e.push({ data: (0, d.default)(this.data.substr(1, 5), "LLLLL"), text: this.text.substr(1, 5), options: { fontSize: this.fontSize } }), e.push({ data: "01010", options: { height: this.guardHeight } }), e.push({ data: (0, d.default)(this.data.substr(6, 5), "RRRRR"), text: this.text.substr(6, 5), options: { fontSize: this.fontSize } }), e.push({ data: (0, d.default)(this.data[11], "R") + "101", options: { height: this.guardHeight } }), this.displayValue && e.push({ data: "00000000", text: this.text.substr(11, 1), options: { textAlign: "right", fontSize: this.fontSize } }), e;
    } }]), n;
  }(h(u(0)).default);
  function f(l) {
    var n, e = 0;
    for (n = 1; n < 11; n += 2)
      e += parseInt(l[n]);
    for (n = 0; n < 11; n += 2)
      e += 3 * parseInt(l[n]);
    return (10 - e % 10) % 10;
  }
  i.default = c;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = function() {
    function e(t, r) {
      for (var o = 0; o < r.length; o++) {
        var s = r[o];
        s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s);
      }
    }
    return function(t, r, o) {
      return r && e(t.prototype, r), o && e(t, o), t;
    };
  }(), h = u(31), c = u(0);
  function f(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function l(e, t) {
    if (!e)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || typeof t != "object" && typeof t != "function" ? e : t;
  }
  var n = function(e) {
    function t() {
      return f(this, t), l(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return function(r, o) {
      if (typeof o != "function" && o !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof o);
      r.prototype = Object.create(o && o.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(r, o) : r.__proto__ = o);
    }(t, e), d(t, [{ key: "valid", value: function() {
      return this.data.search(/^([0-9]{2})+$/) !== -1;
    } }, { key: "encode", value: function() {
      var r = this, o = this.data.match(/.{2}/g).map(function(s) {
        return r.encodePair(s);
      }).join("");
      return { data: h.START_BIN + o + h.END_BIN, text: this.text };
    } }, { key: "encodePair", value: function(r) {
      var o = h.BINARIES[r[1]];
      return h.BINARIES[r[0]].split("").map(function(s, p) {
        return (s === "1" ? "111" : "1") + (o[p] === "1" ? "000" : "0");
      }).join("");
    } }]), t;
  }(((a = c) && a.__esModule ? a : { default: a }).default);
  i.default = n;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.default = function(a) {
    var d = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];
    for (var h in d)
      d.hasOwnProperty(h) && (h = d[h], typeof a[h] == "string" && (a[h] = parseInt(a[h], 10)));
    return typeof a.displayValue == "string" && (a.displayValue = a.displayValue != "false"), a;
  };
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = { width: 2, height: 100, format: "auto", displayValue: !0, fontOptions: "", font: "monospace", text: void 0, textAlign: "center", textPosition: "bottom", textMargin: 2, fontSize: 20, background: "#ffffff", lineColor: "#000000", margin: 10, marginTop: void 0, marginBottom: void 0, marginLeft: void 0, marginRight: void 0, valid: function() {
  } };
  i.default = a;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.getTotalWidthOfEncodings = i.calculateEncodingAttributes = i.getBarcodePadding = i.getEncodingHeight = i.getMaximumHeightOfEncodings = void 0;
  var a, d = u(7), h = (a = d) && a.__esModule ? a : { default: a };
  function c(n, e) {
    return e.height + (e.displayValue && n.text.length > 0 ? e.fontSize + e.textMargin : 0) + e.marginTop + e.marginBottom;
  }
  function f(n, e, t) {
    if (t.displayValue && e < n) {
      if (t.textAlign == "center")
        return Math.floor((n - e) / 2);
      if (t.textAlign == "left")
        return 0;
      if (t.textAlign == "right")
        return Math.floor(n - e);
    }
    return 0;
  }
  function l(n, e, t) {
    var r;
    if (t)
      r = t;
    else {
      if (typeof document > "u")
        return 0;
      r = document.createElement("canvas").getContext("2d");
    }
    r.font = e.fontOptions + " " + e.fontSize + "px " + e.font;
    var o = r.measureText(n);
    return o ? o.width : 0;
  }
  i.getMaximumHeightOfEncodings = function(n) {
    for (var e = 0, t = 0; t < n.length; t++)
      n[t].height > e && (e = n[t].height);
    return e;
  }, i.getEncodingHeight = c, i.getBarcodePadding = f, i.calculateEncodingAttributes = function(n, e, t) {
    for (var r = 0; r < n.length; r++) {
      var o, s = n[r], p = (0, h.default)(e, s.options);
      o = p.displayValue ? l(s.text, p, t) : 0;
      var v = s.data.length * p.width;
      s.width = Math.ceil(Math.max(o, v)), s.height = c(s, p), s.barcodePadding = f(o, v, p);
    }
  }, i.getTotalWidthOfEncodings = function(n) {
    for (var e = 0, t = 0; t < n.length; t++)
      e += n[t].width;
    return e;
  };
}, function(y, i, u) {
  function a(n, e) {
    if (!(n instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function d(n, e) {
    if (!n)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || typeof e != "object" && typeof e != "function" ? n : e;
  }
  function h(n, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    n.prototype = Object.create(e && e.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(n, e) : n.__proto__ = e);
  }
  Object.defineProperty(i, "__esModule", { value: !0 });
  var c = function(n) {
    function e(t, r) {
      a(this, e);
      var o = d(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
      return o.name = "InvalidInputException", o.symbology = t, o.input = r, o.message = '"' + o.input + '" is not a valid input for ' + o.symbology, o;
    }
    return h(e, Error), e;
  }(), f = function(n) {
    function e() {
      a(this, e);
      var t = d(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
      return t.name = "InvalidElementException", t.message = "Not supported type to render on", t;
    }
    return h(e, Error), e;
  }(), l = function(n) {
    function e() {
      a(this, e);
      var t = d(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
      return t.name = "NoElementException", t.message = "No element to render on.", t;
    }
    return h(e, Error), e;
  }();
  i.InvalidInputException = c, i.InvalidElementException = f, i.NoElementException = l;
}, function(y, i, u) {
  var a = r(u(16)), d = r(u(7)), h = r(u(41)), c = r(u(42)), f = r(u(43)), l = r(u(11)), n = r(u(49)), e = u(14), t = r(u(12));
  function r(g) {
    return g && g.__esModule ? g : { default: g };
  }
  var o = function() {
  }, s = function(g, _, w) {
    var E = new o();
    if (g === void 0)
      throw Error("No element to render on was provided.");
    return E._renderProperties = (0, f.default)(g), E._encodings = [], E._options = t.default, E._errorHandler = new n.default(E), _ !== void 0 && ((w = w || {}).format || (w.format = O()), E.options(w)[w.format](_, w).render()), E;
  };
  for (var p in s.getModule = function(g) {
    return a.default[g];
  }, a.default)
    a.default.hasOwnProperty(p) && v(a.default, p);
  function v(g, _) {
    o.prototype[_] = o.prototype[_.toUpperCase()] = o.prototype[_.toLowerCase()] = function(w, E) {
      var C = this;
      return C._errorHandler.wrapBarcodeCall(function() {
        E.text = E.text === void 0 ? void 0 : "" + E.text;
        var A = (0, d.default)(C._options, E);
        A = (0, l.default)(A);
        var G = g[_], U = b(w, G, A);
        return C._encodings.push(U), C;
      });
    };
  }
  function b(g, _, w) {
    var E = new _(g = "" + g, w);
    if (!E.valid())
      throw new e.InvalidInputException(E.constructor.name, g);
    var C = E.encode();
    C = (0, h.default)(C);
    for (var A = 0; A < C.length; A++)
      C[A].options = (0, d.default)(w, C[A].options);
    return C;
  }
  function O() {
    return a.default.CODE128 ? "CODE128" : Object.keys(a.default)[0];
  }
  function P(g, _, w) {
    _ = (0, h.default)(_);
    for (var E = 0; E < _.length; E++)
      _[E].options = (0, d.default)(w, _[E].options), (0, c.default)(_[E].options);
    (0, c.default)(w), new g.renderer(g.element, _, w).render(), g.afterRender && g.afterRender();
  }
  o.prototype.options = function(g) {
    return this._options = (0, d.default)(this._options, g), this;
  }, o.prototype.blank = function(g) {
    var _ = new Array(g + 1).join("0");
    return this._encodings.push({ data: _ }), this;
  }, o.prototype.init = function() {
    var g;
    if (this._renderProperties)
      for (var _ in Array.isArray(this._renderProperties) || (this._renderProperties = [this._renderProperties]), this._renderProperties) {
        g = this._renderProperties[_];
        var w = (0, d.default)(this._options, g.options);
        w.format == "auto" && (w.format = O()), this._errorHandler.wrapBarcodeCall(function() {
          var E = b(w.value, a.default[w.format.toUpperCase()], w);
          P(g, E, w);
        });
      }
  }, o.prototype.render = function() {
    if (!this._renderProperties)
      throw new e.NoElementException();
    if (Array.isArray(this._renderProperties))
      for (var g = 0; g < this._renderProperties.length; g++)
        P(this._renderProperties[g], this._encodings, this._options);
    else
      P(this._renderProperties, this._encodings, this._options);
    return this;
  }, o.prototype._defaults = t.default, typeof window < "u" && (window.JsBarcode = s), typeof jQuery < "u" && (jQuery.fn.JsBarcode = function(g, _) {
    var w = [];
    return jQuery(this).each(function() {
      w.push(this);
    }), s(w, g, _);
  }), y.exports = s;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = u(17), d = u(18), h = u(24), c = u(30), f = u(33), l = u(38), n = u(39), e = u(40);
  i.default = { CODE39: a.CODE39, CODE128: d.CODE128, CODE128A: d.CODE128A, CODE128B: d.CODE128B, CODE128C: d.CODE128C, EAN13: h.EAN13, EAN8: h.EAN8, EAN5: h.EAN5, EAN2: h.EAN2, UPC: h.UPC, UPCE: h.UPCE, ITF14: c.ITF14, ITF: c.ITF, MSI: f.MSI, MSI10: f.MSI10, MSI11: f.MSI11, MSI1010: f.MSI1010, MSI1110: f.MSI1110, pharmacode: l.pharmacode, codabar: n.codabar, GenericBarcode: e.GenericBarcode };
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.CODE39 = void 0;
  var a, d = function() {
    function t(r, o) {
      for (var s = 0; s < o.length; s++) {
        var p = o[s];
        p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(r, p.key, p);
      }
    }
    return function(r, o, s) {
      return o && t(r.prototype, o), s && t(r, s), r;
    };
  }(), h = u(0), c = function(t) {
    function r(o, s) {
      return function(p, v) {
        if (!(p instanceof v))
          throw new TypeError("Cannot call a class as a function");
      }(this, r), o = o.toUpperCase(), s.mod43 && (o += function(p) {
        return f[p];
      }(function(p) {
        for (var v = 0, b = 0; b < p.length; b++)
          v += e(p[b]);
        return v %= 43;
      }(o))), function(p, v) {
        if (!p)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !v || typeof v != "object" && typeof v != "function" ? p : v;
      }(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, o, s));
    }
    return function(o, s) {
      if (typeof s != "function" && s !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof s);
      o.prototype = Object.create(s && s.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), s && (Object.setPrototypeOf ? Object.setPrototypeOf(o, s) : o.__proto__ = s);
    }(r, t), d(r, [{ key: "encode", value: function() {
      for (var o = n("*"), s = 0; s < this.data.length; s++)
        o += n(this.data[s]) + "0";
      return { data: o += n("*"), text: this.text };
    } }, { key: "valid", value: function() {
      return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
    } }]), r;
  }(((a = h) && a.__esModule ? a : { default: a }).default), f = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"], l = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];
  function n(t) {
    return function(r) {
      return l[r].toString(2);
    }(e(t));
  }
  function e(t) {
    return f.indexOf(t);
  }
  i.CODE39 = c;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.CODE128C = i.CODE128B = i.CODE128A = i.CODE128 = void 0;
  var a = f(u(19)), d = f(u(21)), h = f(u(22)), c = f(u(23));
  function f(l) {
    return l && l.__esModule ? l : { default: l };
  }
  i.CODE128 = a.default, i.CODE128A = d.default, i.CODE128B = h.default, i.CODE128C = c.default;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = h(u(5)), d = h(u(20));
  function h(l) {
    return l && l.__esModule ? l : { default: l };
  }
  function c(l, n) {
    if (!l)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !n || typeof n != "object" && typeof n != "function" ? l : n;
  }
  var f = function(l) {
    function n(e, t) {
      if (function(o, s) {
        if (!(o instanceof s))
          throw new TypeError("Cannot call a class as a function");
      }(this, n), /^[\x00-\x7F\xC8-\xD3]+$/.test(e))
        var r = c(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, (0, d.default)(e), t));
      else
        r = c(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
      return c(r);
    }
    return function(e, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }(n, l), n;
  }(a.default);
  i.default = f;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = u(1), d = function(n) {
    return n.match(new RegExp("^" + a.A_CHARS + "*"))[0].length;
  }, h = function(n) {
    return n.match(new RegExp("^" + a.B_CHARS + "*"))[0].length;
  }, c = function(n) {
    return n.match(new RegExp("^" + a.C_CHARS + "*"))[0];
  };
  function f(n, e) {
    var t = e ? a.A_CHARS : a.B_CHARS, r = n.match(new RegExp("^(" + t + "+?)(([0-9]{2}){2,})([^0-9]|$)"));
    if (r)
      return r[1] + String.fromCharCode(204) + l(n.substring(r[1].length));
    var o = n.match(new RegExp("^" + t + "+"))[0];
    return o.length === n.length ? n : o + String.fromCharCode(e ? 205 : 206) + f(n.substring(o.length), !e);
  }
  function l(n) {
    var e = c(n), t = e.length;
    if (t === n.length)
      return n;
    n = n.substring(t);
    var r = d(n) >= h(n);
    return e + String.fromCharCode(r ? 206 : 205) + f(n, r);
  }
  i.default = function(n) {
    var e = void 0;
    if (c(n).length >= 2)
      e = a.C_START_CHAR + l(n);
    else {
      var t = d(n) > h(n);
      e = (t ? a.A_START_CHAR : a.B_START_CHAR) + f(n, t);
    }
    return e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function(r, o) {
      return String.fromCharCode(203) + o;
    });
  };
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = function() {
    function n(e, t) {
      for (var r = 0; r < t.length; r++) {
        var o = t[r];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }
    return function(e, t, r) {
      return t && n(e.prototype, t), r && n(e, r), e;
    };
  }(), h = u(5), c = (a = h) && a.__esModule ? a : { default: a }, f = u(1), l = function(n) {
    function e(t, r) {
      return function(o, s) {
        if (!(o instanceof s))
          throw new TypeError("Cannot call a class as a function");
      }(this, e), function(o, s) {
        if (!o)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !s || typeof s != "object" && typeof s != "function" ? o : s;
      }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f.A_START_CHAR + t, r));
    }
    return function(t, r) {
      if (typeof r != "function" && r !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof r);
      t.prototype = Object.create(r && r.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(t, r) : t.__proto__ = r);
    }(e, n), d(e, [{ key: "valid", value: function() {
      return new RegExp("^" + f.A_CHARS + "+$").test(this.data);
    } }]), e;
  }(c.default);
  i.default = l;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = function() {
    function n(e, t) {
      for (var r = 0; r < t.length; r++) {
        var o = t[r];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }
    return function(e, t, r) {
      return t && n(e.prototype, t), r && n(e, r), e;
    };
  }(), h = u(5), c = (a = h) && a.__esModule ? a : { default: a }, f = u(1), l = function(n) {
    function e(t, r) {
      return function(o, s) {
        if (!(o instanceof s))
          throw new TypeError("Cannot call a class as a function");
      }(this, e), function(o, s) {
        if (!o)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !s || typeof s != "object" && typeof s != "function" ? o : s;
      }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f.B_START_CHAR + t, r));
    }
    return function(t, r) {
      if (typeof r != "function" && r !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof r);
      t.prototype = Object.create(r && r.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(t, r) : t.__proto__ = r);
    }(e, n), d(e, [{ key: "valid", value: function() {
      return new RegExp("^" + f.B_CHARS + "+$").test(this.data);
    } }]), e;
  }(c.default);
  i.default = l;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = function() {
    function n(e, t) {
      for (var r = 0; r < t.length; r++) {
        var o = t[r];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }
    return function(e, t, r) {
      return t && n(e.prototype, t), r && n(e, r), e;
    };
  }(), h = u(5), c = (a = h) && a.__esModule ? a : { default: a }, f = u(1), l = function(n) {
    function e(t, r) {
      return function(o, s) {
        if (!(o instanceof s))
          throw new TypeError("Cannot call a class as a function");
      }(this, e), function(o, s) {
        if (!o)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !s || typeof s != "object" && typeof s != "function" ? o : s;
      }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f.C_START_CHAR + t, r));
    }
    return function(t, r) {
      if (typeof r != "function" && r !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof r);
      t.prototype = Object.create(r && r.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(t, r) : t.__proto__ = r);
    }(e, n), d(e, [{ key: "valid", value: function() {
      return new RegExp("^" + f.C_CHARS + "+$").test(this.data);
    } }]), e;
  }(c.default);
  i.default = l;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.UPCE = i.UPC = i.EAN2 = i.EAN5 = i.EAN8 = i.EAN13 = void 0;
  var a = n(u(25)), d = n(u(26)), h = n(u(27)), c = n(u(28)), f = n(u(9)), l = n(u(29));
  function n(e) {
    return e && e.__esModule ? e : { default: e };
  }
  i.EAN13 = a.default, i.EAN8 = d.default, i.EAN5 = h.default, i.EAN2 = c.default, i.UPC = f.default, i.UPCE = l.default;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = function() {
    function t(r, o) {
      for (var s = 0; s < o.length; s++) {
        var p = o[s];
        p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(r, p.key, p);
      }
    }
    return function(r, o, s) {
      return o && t(r.prototype, o), s && t(r, s), r;
    };
  }(), h = function t(r, o, s) {
    r === null && (r = Function.prototype);
    var p = Object.getOwnPropertyDescriptor(r, o);
    if (p === void 0) {
      var v = Object.getPrototypeOf(r);
      return v === null ? void 0 : t(v, o, s);
    }
    if ("value" in p)
      return p.value;
    var b = p.get;
    return b !== void 0 ? b.call(s) : void 0;
  }, c = u(2), f = u(8), l = (a = f) && a.__esModule ? a : { default: a }, n = function(t) {
    return (10 - t.substr(0, 12).split("").map(function(r) {
      return +r;
    }).reduce(function(r, o, s) {
      return s % 2 ? r + 3 * o : r + o;
    }, 0) % 10) % 10;
  }, e = function(t) {
    function r(o, s) {
      (function(v, b) {
        if (!(v instanceof b))
          throw new TypeError("Cannot call a class as a function");
      })(this, r), o.search(/^[0-9]{12}$/) !== -1 && (o += n(o));
      var p = function(v, b) {
        if (!v)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || typeof b != "object" && typeof b != "function" ? v : b;
      }(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, o, s));
      return p.lastChar = s.lastChar, p;
    }
    return function(o, s) {
      if (typeof s != "function" && s !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof s);
      o.prototype = Object.create(s && s.prototype, { constructor: { value: o, enumerable: !1, writable: !0, configurable: !0 } }), s && (Object.setPrototypeOf ? Object.setPrototypeOf(o, s) : o.__proto__ = s);
    }(r, t), d(r, [{ key: "valid", value: function() {
      return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === n(this.data);
    } }, { key: "leftText", value: function() {
      return h(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "leftText", this).call(this, 1, 6);
    } }, { key: "leftEncode", value: function() {
      var o = this.data.substr(1, 6), s = c.EAN13_STRUCTURE[this.data[0]];
      return h(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "leftEncode", this).call(this, o, s);
    } }, { key: "rightText", value: function() {
      return h(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "rightText", this).call(this, 7, 6);
    } }, { key: "rightEncode", value: function() {
      var o = this.data.substr(7, 6);
      return h(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "rightEncode", this).call(this, o, "RRRRRR");
    } }, { key: "encodeGuarded", value: function() {
      var o = h(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "encodeGuarded", this).call(this);
      return this.options.displayValue && (o.unshift({ data: "000000000000", text: this.text.substr(0, 1), options: { textAlign: "left", fontSize: this.fontSize } }), this.options.lastChar && (o.push({ data: "00" }), o.push({ data: "00000", text: this.options.lastChar, options: { fontSize: this.fontSize } }))), o;
    } }]), r;
  }(l.default);
  i.default = e;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = function() {
    function e(t, r) {
      for (var o = 0; o < r.length; o++) {
        var s = r[o];
        s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s);
      }
    }
    return function(t, r, o) {
      return r && e(t.prototype, r), o && e(t, o), t;
    };
  }(), h = function e(t, r, o) {
    t === null && (t = Function.prototype);
    var s = Object.getOwnPropertyDescriptor(t, r);
    if (s === void 0) {
      var p = Object.getPrototypeOf(t);
      return p === null ? void 0 : e(p, r, o);
    }
    if ("value" in s)
      return s.value;
    var v = s.get;
    return v !== void 0 ? v.call(o) : void 0;
  }, c = u(8), f = (a = c) && a.__esModule ? a : { default: a }, l = function(e) {
    return (10 - e.substr(0, 7).split("").map(function(t) {
      return +t;
    }).reduce(function(t, r, o) {
      return o % 2 ? t + r : t + 3 * r;
    }, 0) % 10) % 10;
  }, n = function(e) {
    function t(r, o) {
      return function(s, p) {
        if (!(s instanceof p))
          throw new TypeError("Cannot call a class as a function");
      }(this, t), r.search(/^[0-9]{7}$/) !== -1 && (r += l(r)), function(s, p) {
        if (!s)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !p || typeof p != "object" && typeof p != "function" ? s : p;
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, r, o));
    }
    return function(r, o) {
      if (typeof o != "function" && o !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof o);
      r.prototype = Object.create(o && o.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(r, o) : r.__proto__ = o);
    }(t, e), d(t, [{ key: "valid", value: function() {
      return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === l(this.data);
    } }, { key: "leftText", value: function() {
      return h(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "leftText", this).call(this, 0, 4);
    } }, { key: "leftEncode", value: function() {
      var r = this.data.substr(0, 4);
      return h(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "leftEncode", this).call(this, r, "LLLL");
    } }, { key: "rightText", value: function() {
      return h(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "rightText", this).call(this, 4, 4);
    } }, { key: "rightEncode", value: function() {
      var r = this.data.substr(4, 4);
      return h(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "rightEncode", this).call(this, r, "RRRR");
    } }]), t;
  }(f.default);
  i.default = n;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = function() {
    function n(e, t) {
      for (var r = 0; r < t.length; r++) {
        var o = t[r];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }
    return function(e, t, r) {
      return t && n(e.prototype, t), r && n(e, r), e;
    };
  }(), d = u(2), h = f(u(3)), c = f(u(0));
  function f(n) {
    return n && n.__esModule ? n : { default: n };
  }
  var l = function(n) {
    function e(t, r) {
      return function(o, s) {
        if (!(o instanceof s))
          throw new TypeError("Cannot call a class as a function");
      }(this, e), function(o, s) {
        if (!o)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !s || typeof s != "object" && typeof s != "function" ? o : s;
      }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, r));
    }
    return function(t, r) {
      if (typeof r != "function" && r !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof r);
      t.prototype = Object.create(r && r.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(t, r) : t.__proto__ = r);
    }(e, n), a(e, [{ key: "valid", value: function() {
      return this.data.search(/^[0-9]{5}$/) !== -1;
    } }, { key: "encode", value: function() {
      var t, r = d.EAN5_STRUCTURE[t = this.data, t.split("").map(function(o) {
        return +o;
      }).reduce(function(o, s, p) {
        return p % 2 ? o + 9 * s : o + 3 * s;
      }, 0) % 10];
      return { data: "1011" + (0, h.default)(this.data, r, "01"), text: this.text };
    } }]), e;
  }(c.default);
  i.default = l;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = function() {
    function l(n, e) {
      for (var t = 0; t < e.length; t++) {
        var r = e[t];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r);
      }
    }
    return function(n, e, t) {
      return e && l(n.prototype, e), t && l(n, t), n;
    };
  }(), d = u(2), h = c(u(3));
  function c(l) {
    return l && l.__esModule ? l : { default: l };
  }
  var f = function(l) {
    function n(e, t) {
      return function(r, o) {
        if (!(r instanceof o))
          throw new TypeError("Cannot call a class as a function");
      }(this, n), function(r, o) {
        if (!r)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !o || typeof o != "object" && typeof o != "function" ? r : o;
      }(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
    }
    return function(e, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }(n, l), a(n, [{ key: "valid", value: function() {
      return this.data.search(/^[0-9]{2}$/) !== -1;
    } }, { key: "encode", value: function() {
      var e = d.EAN2_STRUCTURE[parseInt(this.data) % 4];
      return { data: "1011" + (0, h.default)(this.data, e, "01"), text: this.text };
    } }]), n;
  }(c(u(0)).default);
  i.default = f;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = function() {
    function o(s, p) {
      for (var v = 0; v < p.length; v++) {
        var b = p[v];
        b.enumerable = b.enumerable || !1, b.configurable = !0, "value" in b && (b.writable = !0), Object.defineProperty(s, b.key, b);
      }
    }
    return function(s, p, v) {
      return p && o(s.prototype, p), v && o(s, v), s;
    };
  }(), d = f(u(3)), h = f(u(0)), c = u(9);
  function f(o) {
    return o && o.__esModule ? o : { default: o };
  }
  function l(o, s) {
    if (!o)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !s || typeof s != "object" && typeof s != "function" ? o : s;
  }
  var n = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"], e = [["EEEOOO", "OOOEEE"], ["EEOEOO", "OOEOEE"], ["EEOOEO", "OOEEOE"], ["EEOOOE", "OOEEEO"], ["EOEEOO", "OEOOEE"], ["EOOEEO", "OEEOOE"], ["EOOOEE", "OEEEOO"], ["EOEOEO", "OEOEOE"], ["EOEOOE", "OEOEEO"], ["EOOEOE", "OEEOEO"]], t = function(o) {
    function s(p, v) {
      (function(O, P) {
        if (!(O instanceof P))
          throw new TypeError("Cannot call a class as a function");
      })(this, s);
      var b = l(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, p, v));
      if (b.isValid = !1, p.search(/^[0-9]{6}$/) !== -1)
        b.middleDigits = p, b.upcA = r(p, "0"), b.text = v.text || "" + b.upcA[0] + p + b.upcA[b.upcA.length - 1], b.isValid = !0;
      else {
        if (p.search(/^[01][0-9]{7}$/) === -1 || (b.middleDigits = p.substring(1, p.length - 1), b.upcA = r(b.middleDigits, p[0]), b.upcA[b.upcA.length - 1] !== p[p.length - 1]))
          return l(b);
        b.isValid = !0;
      }
      return b.displayValue = v.displayValue, v.fontSize > 10 * v.width ? b.fontSize = 10 * v.width : b.fontSize = v.fontSize, b.guardHeight = v.height + b.fontSize / 2 + v.textMargin, b;
    }
    return function(p, v) {
      if (typeof v != "function" && v !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof v);
      p.prototype = Object.create(v && v.prototype, { constructor: { value: p, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(p, v) : p.__proto__ = v);
    }(s, o), a(s, [{ key: "valid", value: function() {
      return this.isValid;
    } }, { key: "encode", value: function() {
      return this.options.flat ? this.flatEncoding() : this.guardedEncoding();
    } }, { key: "flatEncoding", value: function() {
      var p = "";
      return p += "101", p += this.encodeMiddleDigits(), { data: p += "010101", text: this.text };
    } }, { key: "guardedEncoding", value: function() {
      var p = [];
      return this.displayValue && p.push({ data: "00000000", text: this.text[0], options: { textAlign: "left", fontSize: this.fontSize } }), p.push({ data: "101", options: { height: this.guardHeight } }), p.push({ data: this.encodeMiddleDigits(), text: this.text.substring(1, 7), options: { fontSize: this.fontSize } }), p.push({ data: "010101", options: { height: this.guardHeight } }), this.displayValue && p.push({ data: "00000000", text: this.text[7], options: { textAlign: "right", fontSize: this.fontSize } }), p;
    } }, { key: "encodeMiddleDigits", value: function() {
      var p = this.upcA[0], v = this.upcA[this.upcA.length - 1], b = e[parseInt(v)][parseInt(p)];
      return (0, d.default)(this.middleDigits, b);
    } }]), s;
  }(h.default);
  function r(o, s) {
    for (var p = parseInt(o[o.length - 1]), v = n[p], b = "", O = 0, P = 0; P < v.length; P++) {
      var g = v[P];
      b += g === "X" ? o[O++] : g;
    }
    return (b = "" + s + b) + (0, c.checksum)(b);
  }
  i.default = t;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.ITF14 = i.ITF = void 0;
  var a = h(u(10)), d = h(u(32));
  function h(c) {
    return c && c.__esModule ? c : { default: c };
  }
  i.ITF = a.default, i.ITF14 = d.default;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.START_BIN = "1010", i.END_BIN = "11101", i.BINARIES = ["00110", "10001", "01001", "11000", "00101", "10100", "01100", "00011", "10010", "01010"];
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = function() {
    function n(e, t) {
      for (var r = 0; r < t.length; r++) {
        var o = t[r];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }
    return function(e, t, r) {
      return t && n(e.prototype, t), r && n(e, r), e;
    };
  }(), h = u(10), c = (a = h) && a.__esModule ? a : { default: a }, f = function(n) {
    var e = n.substr(0, 13).split("").map(function(t) {
      return parseInt(t, 10);
    }).reduce(function(t, r, o) {
      return t + r * (3 - o % 2 * 2);
    }, 0);
    return 10 * Math.ceil(e / 10) - e;
  }, l = function(n) {
    function e(t, r) {
      return function(o, s) {
        if (!(o instanceof s))
          throw new TypeError("Cannot call a class as a function");
      }(this, e), t.search(/^[0-9]{13}$/) !== -1 && (t += f(t)), function(o, s) {
        if (!o)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !s || typeof s != "object" && typeof s != "function" ? o : s;
      }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, r));
    }
    return function(t, r) {
      if (typeof r != "function" && r !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof r);
      t.prototype = Object.create(r && r.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), r && (Object.setPrototypeOf ? Object.setPrototypeOf(t, r) : t.__proto__ = r);
    }(e, n), d(e, [{ key: "valid", value: function() {
      return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === f(this.data);
    } }]), e;
  }(c.default);
  i.default = l;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.MSI1110 = i.MSI1010 = i.MSI11 = i.MSI10 = i.MSI = void 0;
  var a = l(u(4)), d = l(u(34)), h = l(u(35)), c = l(u(36)), f = l(u(37));
  function l(n) {
    return n && n.__esModule ? n : { default: n };
  }
  i.MSI = a.default, i.MSI10 = d.default, i.MSI11 = h.default, i.MSI1010 = c.default, i.MSI1110 = f.default;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = u(4), h = (a = d) && a.__esModule ? a : { default: a }, c = u(6), f = function(l) {
    function n(e, t) {
      return function(r, o) {
        if (!(r instanceof o))
          throw new TypeError("Cannot call a class as a function");
      }(this, n), function(r, o) {
        if (!r)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !o || typeof o != "object" && typeof o != "function" ? r : o;
      }(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e + (0, c.mod10)(e), t));
    }
    return function(e, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }(n, l), n;
  }(h.default);
  i.default = f;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = u(4), h = (a = d) && a.__esModule ? a : { default: a }, c = u(6), f = function(l) {
    function n(e, t) {
      return function(r, o) {
        if (!(r instanceof o))
          throw new TypeError("Cannot call a class as a function");
      }(this, n), function(r, o) {
        if (!r)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !o || typeof o != "object" && typeof o != "function" ? r : o;
      }(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e + (0, c.mod11)(e), t));
    }
    return function(e, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }(n, l), n;
  }(h.default);
  i.default = f;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = u(4), h = (a = d) && a.__esModule ? a : { default: a }, c = u(6), f = function(l) {
    function n(e, t) {
      return function(r, o) {
        if (!(r instanceof o))
          throw new TypeError("Cannot call a class as a function");
      }(this, n), e += (0, c.mod10)(e), e += (0, c.mod10)(e), function(r, o) {
        if (!r)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !o || typeof o != "object" && typeof o != "function" ? r : o;
      }(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
    }
    return function(e, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }(n, l), n;
  }(h.default);
  i.default = f;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = u(4), h = (a = d) && a.__esModule ? a : { default: a }, c = u(6), f = function(l) {
    function n(e, t) {
      return function(r, o) {
        if (!(r instanceof o))
          throw new TypeError("Cannot call a class as a function");
      }(this, n), e += (0, c.mod11)(e), e += (0, c.mod10)(e), function(r, o) {
        if (!r)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !o || typeof o != "object" && typeof o != "function" ? r : o;
      }(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, t));
    }
    return function(e, t) {
      if (typeof t != "function" && t !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }(n, l), n;
  }(h.default);
  i.default = f;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.pharmacode = void 0;
  var a, d = function() {
    function f(l, n) {
      for (var e = 0; e < n.length; e++) {
        var t = n[e];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(l, t.key, t);
      }
    }
    return function(l, n, e) {
      return n && f(l.prototype, n), e && f(l, e), l;
    };
  }(), h = u(0), c = function(f) {
    function l(n, e) {
      (function(r, o) {
        if (!(r instanceof o))
          throw new TypeError("Cannot call a class as a function");
      })(this, l);
      var t = function(r, o) {
        if (!r)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !o || typeof o != "object" && typeof o != "function" ? r : o;
      }(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, n, e));
      return t.number = parseInt(n, 10), t;
    }
    return function(n, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      n.prototype = Object.create(e && e.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(n, e) : n.__proto__ = e);
    }(l, f), d(l, [{ key: "encode", value: function() {
      for (var n = this.number, e = ""; !isNaN(n) && n != 0; )
        n % 2 == 0 ? (e = "11100" + e, n = (n - 2) / 2) : (e = "100" + e, n = (n - 1) / 2);
      return { data: e = e.slice(0, -2), text: this.text };
    } }, { key: "valid", value: function() {
      return this.number >= 3 && this.number <= 131070;
    } }]), l;
  }(((a = h) && a.__esModule ? a : { default: a }).default);
  i.pharmacode = c;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.codabar = void 0;
  var a, d = function() {
    function f(l, n) {
      for (var e = 0; e < n.length; e++) {
        var t = n[e];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(l, t.key, t);
      }
    }
    return function(l, n, e) {
      return n && f(l.prototype, n), e && f(l, e), l;
    };
  }(), h = u(0), c = function(f) {
    function l(n, e) {
      (function(r, o) {
        if (!(r instanceof o))
          throw new TypeError("Cannot call a class as a function");
      })(this, l), n.search(/^[0-9\-\$\:\.\+\/]+$/) === 0 && (n = "A" + n + "A");
      var t = function(r, o) {
        if (!r)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !o || typeof o != "object" && typeof o != "function" ? r : o;
      }(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, n.toUpperCase(), e));
      return t.text = t.options.text || t.text.replace(/[A-D]/g, ""), t;
    }
    return function(n, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      n.prototype = Object.create(e && e.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(n, e) : n.__proto__ = e);
    }(l, f), d(l, [{ key: "valid", value: function() {
      return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
    } }, { key: "encode", value: function() {
      for (var n = [], e = this.getEncodings(), t = 0; t < this.data.length; t++)
        n.push(e[this.data.charAt(t)]), t !== this.data.length - 1 && n.push("0");
      return { text: this.text, data: n.join("") };
    } }, { key: "getEncodings", value: function() {
      return { 0: "101010011", 1: "101011001", 2: "101001011", 3: "110010101", 4: "101101001", 5: "110101001", 6: "100101011", 7: "100101101", 8: "100110101", 9: "110100101", "-": "101001101", $: "101100101", ":": "1101011011", "/": "1101101011", ".": "1101101101", "+": "1011011011", A: "1011001001", B: "1001001011", C: "1010010011", D: "1010011001" };
    } }]), l;
  }(((a = h) && a.__esModule ? a : { default: a }).default);
  i.codabar = c;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.GenericBarcode = void 0;
  var a, d = function() {
    function f(l, n) {
      for (var e = 0; e < n.length; e++) {
        var t = n[e];
        t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(l, t.key, t);
      }
    }
    return function(l, n, e) {
      return n && f(l.prototype, n), e && f(l, e), l;
    };
  }(), h = u(0), c = function(f) {
    function l(n, e) {
      return function(t, r) {
        if (!(t instanceof r))
          throw new TypeError("Cannot call a class as a function");
      }(this, l), function(t, r) {
        if (!t)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !r || typeof r != "object" && typeof r != "function" ? t : r;
      }(this, (l.__proto__ || Object.getPrototypeOf(l)).call(this, n, e));
    }
    return function(n, e) {
      if (typeof e != "function" && e !== null)
        throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      n.prototype = Object.create(e && e.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(n, e) : n.__proto__ = e);
    }(l, f), d(l, [{ key: "encode", value: function() {
      return { data: "10101010101010101010101010101010101010101", text: this.text };
    } }, { key: "valid", value: function() {
      return !0;
    } }]), l;
  }(((a = h) && a.__esModule ? a : { default: a }).default);
  i.GenericBarcode = c;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.default = function(a) {
    var d = [];
    return function h(c) {
      if (Array.isArray(c))
        for (var f = 0; f < c.length; f++)
          h(c[f]);
      else
        c.text = c.text || "", c.data = c.data || "", d.push(c);
    }(a), d;
  };
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.default = function(a) {
    return a.marginTop = a.marginTop || a.margin, a.marginBottom = a.marginBottom || a.margin, a.marginRight = a.marginRight || a.margin, a.marginLeft = a.marginLeft || a.margin, a;
  };
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
    return typeof n;
  } : function(n) {
    return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
  }, d = f(u(44)), h = f(u(45)), c = u(14);
  function f(n) {
    return n && n.__esModule ? n : { default: n };
  }
  function l(n) {
    if (typeof n == "string")
      return function(s) {
        var p = document.querySelectorAll(s);
        if (p.length !== 0) {
          for (var v = [], b = 0; b < p.length; b++)
            v.push(l(p[b]));
          return v;
        }
      }(n);
    if (Array.isArray(n)) {
      for (var e = [], t = 0; t < n.length; t++)
        e.push(l(n[t]));
      return e;
    }
    if (typeof HTMLCanvasElement < "u" && n instanceof HTMLImageElement)
      return r = n, { element: o = document.createElement("canvas"), options: (0, d.default)(r), renderer: h.default.CanvasRenderer, afterRender: function() {
        r.setAttribute("src", o.toDataURL());
      } };
    if (n && n.nodeName && n.nodeName.toLowerCase() === "svg" || typeof SVGElement < "u" && n instanceof SVGElement)
      return { element: n, options: (0, d.default)(n), renderer: h.default.SVGRenderer };
    if (typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement)
      return { element: n, options: (0, d.default)(n), renderer: h.default.CanvasRenderer };
    if (n && n.getContext)
      return { element: n, renderer: h.default.CanvasRenderer };
    if (n && (n === void 0 ? "undefined" : a(n)) === "object" && !n.nodeName)
      return { element: n, renderer: h.default.ObjectRenderer };
    throw new c.InvalidElementException();
    var r, o;
  }
  i.default = l;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = h(u(11)), d = h(u(12));
  function h(c) {
    return c && c.__esModule ? c : { default: c };
  }
  i.default = function(c) {
    var f = {};
    for (var l in d.default)
      d.default.hasOwnProperty(l) && (c.hasAttribute("jsbarcode-" + l.toLowerCase()) && (f[l] = c.getAttribute("jsbarcode-" + l.toLowerCase())), c.hasAttribute("data-" + l.toLowerCase()) && (f[l] = c.getAttribute("data-" + l.toLowerCase())));
    return f.value = c.getAttribute("jsbarcode-value") || c.getAttribute("data-value"), f = (0, a.default)(f);
  };
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = c(u(46)), d = c(u(47)), h = c(u(48));
  function c(f) {
    return f && f.__esModule ? f : { default: f };
  }
  i.default = { CanvasRenderer: a.default, SVGRenderer: d.default, ObjectRenderer: h.default };
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = function() {
    function n(e, t) {
      for (var r = 0; r < t.length; r++) {
        var o = t[r];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }
    return function(e, t, r) {
      return t && n(e.prototype, t), r && n(e, r), e;
    };
  }(), h = u(7), c = (a = h) && a.__esModule ? a : { default: a }, f = u(13), l = function() {
    function n(e, t, r) {
      (function(o, s) {
        if (!(o instanceof s))
          throw new TypeError("Cannot call a class as a function");
      })(this, n), this.canvas = e, this.encodings = t, this.options = r;
    }
    return d(n, [{ key: "render", value: function() {
      if (!this.canvas.getContext)
        throw new Error("The browser does not support canvas.");
      this.prepareCanvas();
      for (var e = 0; e < this.encodings.length; e++) {
        var t = (0, c.default)(this.options, this.encodings[e].options);
        this.drawCanvasBarcode(t, this.encodings[e]), this.drawCanvasText(t, this.encodings[e]), this.moveCanvasDrawing(this.encodings[e]);
      }
      this.restoreCanvas();
    } }, { key: "prepareCanvas", value: function() {
      var e = this.canvas.getContext("2d");
      e.save(), (0, f.calculateEncodingAttributes)(this.encodings, this.options, e);
      var t = (0, f.getTotalWidthOfEncodings)(this.encodings), r = (0, f.getMaximumHeightOfEncodings)(this.encodings);
      this.canvas.width = t + this.options.marginLeft + this.options.marginRight, this.canvas.height = r, e.clearRect(0, 0, this.canvas.width, this.canvas.height), this.options.background && (e.fillStyle = this.options.background, e.fillRect(0, 0, this.canvas.width, this.canvas.height)), e.translate(this.options.marginLeft, 0);
    } }, { key: "drawCanvasBarcode", value: function(e, t) {
      var r, o = this.canvas.getContext("2d"), s = t.data;
      r = e.textPosition == "top" ? e.marginTop + e.fontSize + e.textMargin : e.marginTop, o.fillStyle = e.lineColor;
      for (var p = 0; p < s.length; p++) {
        var v = p * e.width + t.barcodePadding;
        s[p] === "1" ? o.fillRect(v, r, e.width, e.height) : s[p] && o.fillRect(v, r, e.width, e.height * s[p]);
      }
    } }, { key: "drawCanvasText", value: function(e, t) {
      var r, o, s = this.canvas.getContext("2d"), p = e.fontOptions + " " + e.fontSize + "px " + e.font;
      e.displayValue && (o = e.textPosition == "top" ? e.marginTop + e.fontSize - e.textMargin : e.height + e.textMargin + e.marginTop + e.fontSize, s.font = p, e.textAlign == "left" || t.barcodePadding > 0 ? (r = 0, s.textAlign = "left") : e.textAlign == "right" ? (r = t.width - 1, s.textAlign = "right") : (r = t.width / 2, s.textAlign = "center"), s.fillText(t.text, r, o));
    } }, { key: "moveCanvasDrawing", value: function(e) {
      this.canvas.getContext("2d").translate(e.width, 0);
    } }, { key: "restoreCanvas", value: function() {
      this.canvas.getContext("2d").restore();
    } }]), n;
  }();
  i.default = l;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a, d = function() {
    function e(t, r) {
      for (var o = 0; o < r.length; o++) {
        var s = r[o];
        s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s);
      }
    }
    return function(t, r, o) {
      return r && e(t.prototype, r), o && e(t, o), t;
    };
  }(), h = u(7), c = (a = h) && a.__esModule ? a : { default: a }, f = u(13), l = "http://www.w3.org/2000/svg", n = function() {
    function e(t, r, o) {
      (function(s, p) {
        if (!(s instanceof p))
          throw new TypeError("Cannot call a class as a function");
      })(this, e), this.svg = t, this.encodings = r, this.options = o, this.document = o.xmlDocument || document;
    }
    return d(e, [{ key: "render", value: function() {
      var t = this.options.marginLeft;
      this.prepareSVG();
      for (var r = 0; r < this.encodings.length; r++) {
        var o = this.encodings[r], s = (0, c.default)(this.options, o.options), p = this.createGroup(t, s.marginTop, this.svg);
        this.setGroupOptions(p, s), this.drawSvgBarcode(p, s, o), this.drawSVGText(p, s, o), t += o.width;
      }
    } }, { key: "prepareSVG", value: function() {
      for (; this.svg.firstChild; )
        this.svg.removeChild(this.svg.firstChild);
      (0, f.calculateEncodingAttributes)(this.encodings, this.options);
      var t = (0, f.getTotalWidthOfEncodings)(this.encodings), r = (0, f.getMaximumHeightOfEncodings)(this.encodings), o = t + this.options.marginLeft + this.options.marginRight;
      this.setSvgAttributes(o, r), this.options.background && this.drawRect(0, 0, o, r, this.svg).setAttribute("style", "fill:" + this.options.background + ";");
    } }, { key: "drawSvgBarcode", value: function(t, r, o) {
      var s, p = o.data;
      s = r.textPosition == "top" ? r.fontSize + r.textMargin : 0;
      for (var v = 0, b = 0, O = 0; O < p.length; O++)
        b = O * r.width + o.barcodePadding, p[O] === "1" ? v++ : v > 0 && (this.drawRect(b - r.width * v, s, r.width * v, r.height, t), v = 0);
      v > 0 && this.drawRect(b - r.width * (v - 1), s, r.width * v, r.height, t);
    } }, { key: "drawSVGText", value: function(t, r, o) {
      var s, p, v = this.document.createElementNS(l, "text");
      r.displayValue && (v.setAttribute("style", "font:" + r.fontOptions + " " + r.fontSize + "px " + r.font), p = r.textPosition == "top" ? r.fontSize - r.textMargin : r.height + r.textMargin + r.fontSize, r.textAlign == "left" || o.barcodePadding > 0 ? (s = 0, v.setAttribute("text-anchor", "start")) : r.textAlign == "right" ? (s = o.width - 1, v.setAttribute("text-anchor", "end")) : (s = o.width / 2, v.setAttribute("text-anchor", "middle")), v.setAttribute("x", s), v.setAttribute("y", p), v.appendChild(this.document.createTextNode(o.text)), t.appendChild(v));
    } }, { key: "setSvgAttributes", value: function(t, r) {
      var o = this.svg;
      o.setAttribute("width", t + "px"), o.setAttribute("height", r + "px"), o.setAttribute("x", "0px"), o.setAttribute("y", "0px"), o.setAttribute("viewBox", "0 0 " + t + " " + r), o.setAttribute("xmlns", l), o.setAttribute("version", "1.1"), o.setAttribute("style", "transform: translate(0,0)");
    } }, { key: "createGroup", value: function(t, r, o) {
      var s = this.document.createElementNS(l, "g");
      return s.setAttribute("transform", "translate(" + t + ", " + r + ")"), o.appendChild(s), s;
    } }, { key: "setGroupOptions", value: function(t, r) {
      t.setAttribute("style", "fill:" + r.lineColor + ";");
    } }, { key: "drawRect", value: function(t, r, o, s, p) {
      var v = this.document.createElementNS(l, "rect");
      return v.setAttribute("x", t), v.setAttribute("y", r), v.setAttribute("width", o), v.setAttribute("height", s), p.appendChild(v), v;
    } }]), e;
  }();
  i.default = n;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = function() {
    function h(c, f) {
      for (var l = 0; l < f.length; l++) {
        var n = f[l];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(c, n.key, n);
      }
    }
    return function(c, f, l) {
      return f && h(c.prototype, f), l && h(c, l), c;
    };
  }(), d = function() {
    function h(c, f, l) {
      (function(n, e) {
        if (!(n instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this, h), this.object = c, this.encodings = f, this.options = l;
    }
    return a(h, [{ key: "render", value: function() {
      this.object.encodings = this.encodings;
    } }]), h;
  }();
  i.default = d;
}, function(y, i, u) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var a = function() {
    function h(c, f) {
      for (var l = 0; l < f.length; l++) {
        var n = f[l];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(c, n.key, n);
      }
    }
    return function(c, f, l) {
      return f && h(c.prototype, f), l && h(c, l), c;
    };
  }(), d = function() {
    function h(c) {
      (function(f, l) {
        if (!(f instanceof l))
          throw new TypeError("Cannot call a class as a function");
      })(this, h), this.api = c;
    }
    return a(h, [{ key: "handleCatch", value: function(c) {
      if (c.name !== "InvalidInputException")
        throw c;
      if (this.api._options.valid === this.api._defaults.valid)
        throw c.message;
      this.api._options.valid(!1), this.api.render = function() {
      };
    } }, { key: "wrapBarcodeCall", value: function(c) {
      try {
        var f = c.apply(void 0, arguments);
        return this.api._options.valid(!0), f;
      } catch (l) {
        return this.handleCatch(l), this.api;
      }
    } }]), h;
  }();
  i.default = d;
}]);
const ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
R.QrCode;
function ht() {
  const y = document.createElement("canvas");
  return ft(y, "1234", {
    format: "pharmacode",
    lineColor: "#0aa",
    width: 4,
    height: 40,
    displayValue: !1
  }), y.toDataURL();
}
function dt(y, i, u, a) {
  return ht();
}
const pt = () => {
  const y = /\{Zcode\:.*?\}/g;
  return async (i, u) => {
    let a = i.match(y), d = a == null ? void 0 : a.map(async (c) => {
      let f = c.replace("}", "").split(":");
      try {
        return {
          code: c,
          url: await dt(
            f[1],
            parseInt(f[2]),
            parseInt(f[3]),
            parseInt(f[4])
          )
        };
      } catch (l) {
        return console.log("字符转条码失败:", l), {
          code: c,
          url: ""
        };
      }
    }), h = await Promise.all(d || []);
    return i.replace(y, (c) => {
      var f;
      return ((f = h.find((l) => l.code == c)) == null ? void 0 : f.url) || "";
    });
  };
}, yt = () => {
  let y = {};
  return {
    setValue: (h, c) => y[h] = c,
    getValue: (h) => y[h],
    cleanState: () => y = {},
    rmValue: (h) => y[h] = void 0
  };
}, vt = yt();
function bt(y) {
  return document.createRange().createContextualFragment(y);
}
const gt = "datasource_object_key";
function _t() {
  const y = [], i = {}, u = (l) => {
    i[l.id] = l;
  }, a = (l) => {
    y.push(l);
  };
  async function d(l, n, e = {}) {
    let t = l;
    for (const r of y)
      t = await r(t, n, e);
    return t;
  }
  function h(l) {
    var e, t, r;
    const n = document.createElement("iframe");
    n.style.display = "none", n.style.margin = "0", document.body.appendChild(n);
    try {
      const o = (e = n.contentWindow) == null ? void 0 : e.document;
      bt(l).childNodes.forEach((p) => {
        var v, b;
        ((v = p.getAttribute) == null ? void 0 : v.call(p, "temptype")) === "body" && o.body.appendChild(p), ((b = p.getAttribute) == null ? void 0 : b.call(p, "temptype")) === "head" && o.head.appendChild(p);
      }), o.body.innerHTML = l, (t = n.contentWindow) == null || t.focus(), (r = n.contentWindow) == null || r.print(), document.body.removeChild(n);
    } catch (o) {
      console.warn("打印异常", o);
    }
  }
  function c(l) {
    var e, t, r;
    const n = document.createElement("iframe");
    n.style.display = "none", document.body.appendChild(n);
    try {
      const o = (e = n.contentWindow) == null ? void 0 : e.document;
      o.head.innerHTML = document.head.outerHTML, o.body.innerHTML = l, (t = n.contentWindow) == null || t.focus(), (r = n.contentWindow) == null || r.print(), document.body.removeChild(n);
    } catch (o) {
      console.warn("打印异常", o);
    }
  }
  function f() {
    return Object.keys(i).reduce((l, n, e) => {
      const r = `<style temptype="head">${i[n].style}</style>`;
      return l + r;
    }, "");
  }
  return {
    /**
     * 快捷数据存储和通信
     */
    state: vt,
    /**
     * 已装载插件实例列表
     */
    plugins: y,
    /**
     * 附加新的插件实例
     */
    addPlugin: a,
    /**
     * 页面组件
     */
    components: i,
    /**
     * 添加页面组件
     */
    addComponent: u,
    /**
     * 获取所有页面组件的样式
     */
    getRenderStyle: f,
    /**
     * 模板渲染函数
     * @param template 模板
     * @param data 数据源
     * @param option 其他参数(一般可以不管)
     * @returns string
     */
    docRender: d,
    /**
     * @desc 打印
     * @desc 普通打印,打印内容需要包含样式布局等完整内容
     */
    print: h,
    /**
     * @desc 附加宿主网页样式打印
     * @desc 可用于选择网页指定节点直接打印
     */
    printWithStyle: c
  };
}
const k = _t();
k.addPlugin(lt({ DATASOURCE_OBJECT_KEY: gt }));
k.addPlugin(at());
k.addPlugin(ct());
k.addPlugin(pt());
export {
  gt as DATASOURCE_OBJECT_KEY,
  _t as DocPrint,
  k as docPrintForRender
};
