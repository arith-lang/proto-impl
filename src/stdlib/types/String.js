const equal = require("fast-deep-equal");
const Char = require("./Char");
const { array } = require("../array");
const { vector } = require("../vector");
const { list } = require("../list");

class _String extends String {
  constructor(string) {
    super(string);
    this.chars = Object.freeze(
      string.split("").map((c) => new Char(c)),
    );
  }

  static isString(obj) {
    return obj.constructor && obj.constructor.name === "_String";
  }

  static make(string) {
    return new _String(string);
  }

  isEq(other) {
    return equal(this, other);
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
