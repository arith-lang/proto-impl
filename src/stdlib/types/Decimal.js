const Decimal = require("decimal.js");

class _Decimal extends Decimal {
  constructor(value) {
    super(value);
    this.isEq = this.isEq.bind(this);
    this.isEqv = this.isEq;
    this.isEqual = this.isEq;
  }

  static isExactNumber(obj) {
    return obj.constructor && obj.constructor.name === "_Decimal";
  }

  isEq(other) {
    return _Decimal.isExactNumber(other) && this.equals(other);
  }
}

module.exports = _Decimal;
