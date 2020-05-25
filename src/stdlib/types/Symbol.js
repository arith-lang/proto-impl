const _Object = require("./Object");

class _Symbol extends _Object {
  constructor(string) {
    this.name = string;
    this.value = Symbol.for(string);
  }

  toString() {
    return `'${Symbol.keyFor(this.name)}`;
  }
}

module.exports = _Symbol;
