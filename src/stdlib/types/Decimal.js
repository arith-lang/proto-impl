const Decimal = require("decimal.js");

Decimal.isExactNumber = (obj) => {
  return obj.constructor && obj.constructor.name === "Decimal";
};

module.exports = Decimal;
