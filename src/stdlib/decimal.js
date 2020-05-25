const Decimal = require("./types/Decimal");
const { all } = require("./utils");
const _Boolean = require("./types/Boolean");

// Create a new _Number
function decimal(value) {
  // Allow numbers to be specified in hex, octal, and binary
  if (value[0] === "#") {
    value = value.replace("#", "0");
  }
  return new Decimal(value);
}

// mathematical constants
const PI = Decimal.acos(-1);

// mathematical functions
// const add = all((a, c) => a + c);
function add(...args) {
  return all((a, c) => a.add(c))(...args);
}

function sub(...args) {
  return all((a, c) => a.sub(c))(...args);
}

function mul(...args) {
  return all((a, c) => Decimal.mul(a, c))(...args);
}

function div(...args) {
  return all((a, c) => Decimal.div(a, c))(...args);
}

function mod(...args) {
  return all((a, c) => Decimal.mod(a, c))(...args);
}

function floorDiv(...args) {
  const quotient = div(...args);
  return quotient.floor();
}

function max(...args) {
  return Decimal.max(...args);
}

function min(...args) {
  return Decimal.min(...args);
}

function pow(x, y) {
  return Decimal.pow(x, y);
}

function round(x) {
  return x.round();
}

function ceil(x) {
  return x.ceil();
}

function floor(x) {
  return x.floor();
}

// numeric comparisons
function eq(x, y) {
  if (y instanceof Decimal && x.equals(y)) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

function lt(x, y) {
  if (x.lessThan(y)) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

function lte(x, y) {
  if (x.lessThanOrEqualTo(y)) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

function gt(x, y) {
  if (x.greaterThan(y)) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

function gte(x, y) {
  if (x.greaterThanOrEqualTo(y)) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

module.exports = {
  decimal,
  PI,
  "+": add,
  "-": sub,
  "*": mul,
  "/": div,
  "%": mod,
  "//": floorDiv,
  max,
  min,
  pow,
  round,
  ceil,
  floor,
  "=": eq,
  "<": lt,
  "<=": lte,
  ">": gt,
  ">=": gte,
};
