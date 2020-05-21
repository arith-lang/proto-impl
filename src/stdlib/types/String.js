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
