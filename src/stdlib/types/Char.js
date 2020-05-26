const equal = require("fast-deep-equal");
const v = require("voca");
const _Object = require("./Object");
const _Boolean = require("./Boolean");
const { ArithTypeError } = require("../../errors");

class Char extends _Object {
  constructor(char) {
    super();

    if (v.countGraphemes(char) > 1) {
      throw new ArithTypeError("Char can only be a single character");
    }

    this.value = char;
    this.code = v.codePointAt(char, 0).toString(16).padStart(4, "0");
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

Char.prototype.isEqv = Char.prototype.isEq;
Char.prototype.isEqual = Char.prototype.isEq;

module.exports = Char;
