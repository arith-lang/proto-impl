const equal = require("fast-deep-equal");
const v = require("voca");
const Char = require("./Char");
const _Boolean = require("./Boolean");
const { array } = require("../array");
const { vector } = require("../vector");
const { list } = require("../list");

class _String extends String {
  constructor(string) {
    super(string);
    this.chars = v.graphemes(string).map((c) => new Char(c));
  }

  static isStringNative(obj) {
    return obj.constructor && obj.constructor.name === "_String";
  }

  static isString(obj) {
    return obj.constructor && obj.constructor.name === "_String"
      ? _Boolean.make("#t")
      : _Boolean.make("#f");
  }

  static make(string) {
    return new _String(string);
  }

  isEq(other) {
    if (equal(this, other)) {
      return _Boolean.make("#t");
    }
    return _Boolean.make("#f");
  }

  toCharString() {
    return this.chars.reduce((s, c) => s + c.value, "");
  }

  toCharArray() {
    return array(...this.chars.map((c) => c.value));
  }

  toCharVector() {
    return vector(...this.chars.map((c) => c.value));
  }

  toCharList() {
    return list(...this.chars.map((c) => c.value));
  }
}

_String.prototype.isEqv = _String.prototype.isEq;
_String.prototype.isEqual = _String.prototype.isEq;

module.exports = _String;
