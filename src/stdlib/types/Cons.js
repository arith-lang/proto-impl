class Cons extends Array {
  constructor(car, cdr) {
    super(car, cdr);
  }

  toString() {
    return `(${this[0].toString()} . ${this[1].toString()})`;
  }
}

module.exports = Cons;
