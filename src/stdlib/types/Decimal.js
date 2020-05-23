const Decimal = require("decimal.js");
// const _Boolean = require("./Boolean");

// class _Decimal extends Decimal {
//   constructor(value) {
//     super(value);
//     this.isEq = this.isEq.bind(this);
//     this.isEqv = this.isEq;
//     this.isEqual = this.isEq;
//   }

//   static isExactNumberNative(obj) {
//     return obj.constructor && obj.constructor.name === "_Decimal";
//   }

//   static make(value) {
//     return new _Decimal(value);
//   }

//   static isExactNumber(obj) {
//     return obj.constructor && obj.constructor.name === "_Decimal"
//       ? _Boolean.make("#t")
//       : _Boolean.make("#f");
//   }

//   isEq(other) {
//     return _Decimal.isExactNumber(other) && this.equals(other);
//   }
// }

module.exports = Decimal;
