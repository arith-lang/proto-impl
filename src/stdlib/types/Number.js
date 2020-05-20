const Decimal = require("decimal.js");

class _Number extends Decimal {
  constructor(value) {
    super(value);
  }
}

module.exports = _Number;
