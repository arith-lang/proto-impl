// Nil value; empty list
class Nil extends Array {
  constructor() {
    super();
  }

  toString() {
    return `'()`;
  }
}

module.exports = Nil;
