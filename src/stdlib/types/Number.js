const Decimal = require("decimal.js");

class Number extends Decimal {
  constructor(value) {
    super(value);
  }
}

module.exports = Number;
