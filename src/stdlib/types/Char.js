const _Object = require("./Object");
const { ArithTypeError } = require("../../errors");

class Char extends _Object {
  constructor(char) {
    super();

    if (char.length > 1) {
      throw new ArithTypeError("Char can only be a single character");
    }

    this.value = char;
    this.code = char.codePointAt(0).toString(16).padStart(4, "0");
  }

  toString() {
    return `#\\${this.value}`;
  }

  toUnicodeEscape() {
    return `#\\u${this.code}`;
  }
}

module.exports = Char;
