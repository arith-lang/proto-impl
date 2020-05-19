const Decimal = require("decimal.js");

class ArithNumber extends Decimal {
  constructor(value) {
    super(value);
  }
}

module.exports = ArithNumber;
