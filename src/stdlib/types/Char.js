const equal = require("fast-deep-equal");
const _Object = require("./Object");
const _Boolean = require("./Boolean");
const { ArithTypeError } = require("../../errors");

class Char extends _Object {
  constructor(char) {
    super();

    if (char.length > 1) {
      throw new ArithTypeError("Char can only be a single character");
    }

    this.value = char;
    this.code = char.codePointAt(0).toString(16).padStart(4, "0");

    this.isEq = this.isEq.bind(this);
    this.isEqv = this.isEq.bind(this);
    this.isEqual = this.isEq.bind(this);
    this.toUnicodeEscape = this.toUnicodeEscape.bind(this);
  }

  static isCharNative(obj) {
    return obj.constructor && obj.constructor === "Char";
  }

  static isChar(obj) {
    return obj.constructor && obj.constructor === "Char"
      ? _Boolean.make("#t")
      : _Boolean.make("#f");
  }

  isEq(other) {
    return equal(this, other);
  }

  toString() {
    return `#\\${this.value}`;
  }

  toUnicodeEscape() {
    return `#\\u${this.code}`;
  }
}

module.exports = Char;
