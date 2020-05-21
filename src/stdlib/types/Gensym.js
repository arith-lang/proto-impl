const { v4: uuidv4 } = require("uuid");
const _Object = require("./Object");

class Gensym extends _Object {
  constructor(base = "") {
    super();
    this.base = base;
    this.name = uuidv4().split("-")[4];
    this.value = Symbol(this.name);
  }

  toString() {
    return `'${this.base}${this.name}`;
  }
}

module.exports = Gensym;
