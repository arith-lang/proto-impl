const Decimal = require("./types/Decimal");
const { all } = require("./utils");

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
  return y instanceof Decimal && x.equals(y);
}

function lt(x, y) {
  return x.lessThan(y);
}

function lte(x, y) {
  return x.lessThanOrEqualTo(y);
}

function gt(x, y) {
  return x.greaterThan(y);
}

function gte(x, y) {
  return x.greaterThanOrEqualTo(y);
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
