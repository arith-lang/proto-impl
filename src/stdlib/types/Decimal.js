const Decimal = require("decimal.js");

class _Decimal extends Decimal {
  constructor(value) {
    super(value);
  }
}

module.exports = _Decimal;
