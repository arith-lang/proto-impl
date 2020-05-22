const Char = require("./Char");
const _Boolean = require("./Boolean");
const { array } = require("../array");
const { vector } = require("../vector");
const { list } = require("../list");

class _String extends String {
  constructor(string) {
    super(string);
    this.chars = Object.freeze(
      string.split("").map((c) => new Char(c)),
    );

    this.toCharString = this.toCharString.bind(this);
    this.toCharArray = this.toCharArray.bind(this);
    this.toCharVector = this.toCharVector.bind(this);
    this.toCharList = this.toCharList.bind(this);
  }

  static isStringNative(obj) {
    return obj.constructor && obj.constructor.name === "_String";
  }

  static isString(obj) {
    return obj.constructor && obj.constructor.name === "_String"
      ? _Boolean.make("#t")
      : _Boolean.make("#f");
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

module.exports = _String;
