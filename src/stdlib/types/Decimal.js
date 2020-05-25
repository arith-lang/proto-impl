const Decimal = require("decimal.js");
const _Boolean = require("./Boolean");

Decimal.isExactNumberNative = (obj) => {
  return obj.constructor && obj.constructor.name === "Decimal";
};

Decimal.isExactNumber = (obj) => {
  return obj.constructor && obj.constructor.name === "Decimal"
    ? _Boolean.make("#t")
    : _Boolean.make("#f");
};

module.exports = Decimal;
