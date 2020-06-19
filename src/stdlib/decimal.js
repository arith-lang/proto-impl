const R = require("ramda");
const Decimal = require("./types/Decimal");
const { all } = require("./utils");
const { string } = require("./string");
const { ArithTypeError } = require("../errors");

// Create a new _Number
function decimal(value) {
  // Allow numbers to be specified in hex, octal, and binary
  if (value[0] === "#") {
    value = value.replace("#", "0");
  }
  return new Decimal(value);
}

// mathematical functions
function add(...args) {
  return all((a, c) => Decimal.add(a, c))(...args);
}

add = R.curryN(2, add);

function sub(...args) {
  return all((a, c) => Decimal.sub(a, c))(...args);
}

sub = R.curryN(2, sub);

function mul(...args) {
  return all((a, c) => Decimal.mul(a, c))(...args);
}

mul = R.curryN(2, mul);

function div(...args) {
  return all((a, c) => Decimal.div(a, c))(...args);
}

div = R.curryN(2, div);

function mod(...args) {
  return all((a, c) => Decimal.mod(a, c))(...args);
}

mod = R.curryN(2, mod);

function floorDiv(...args) {
  const quotient = div(...args);
  return quotient.floor();
}

floorDiv = R.curryN(2, floorDiv);

function max(...args) {
  return Decimal.max(...args);
}

max = R.curryN(2, max);

function min(...args) {
  return Decimal.min(...args);
}

min = R.curryN(2, min);

// numeric comparisons
function eq(x, y) {
  return y instanceof Decimal && x.equals(y);
}

eq = R.curry(eq);

function lt(x, y) {
  return x.lessThan(y);
}

lt = R.curry(lt);

function lte(x, y) {
  return x.lessThanOrEqualTo(y);
}

lte = R.curry(lte);

function gt(x, y) {
  return x.greaterThan(y);
}

gt = R.curry(gt);

function gte(x, y) {
  return x.greaterThanOrEqualTo(y);
}

gte = R.curry(gte);

function decimalToString(dec) {
  return string(dec.toString());
}

function stringToDecimal(str) {
  if (isNaN(str.toString())) {
    throw new ArithTypeError(
      `Cannot convert non-numeric input ${str.toString()} to decimal`,
    );
  }
  return decimal(str.toString());
}

function isExact(obj) {
  return Decimal.isExactNumber(obj);
}

module.exports = {
  decimal,
  "+": add,
  "-": sub,
  "*": mul,
  "/": div,
  "%": mod,
  "//": floorDiv,
  max,
  min,
  "=": eq,
  "<": lt,
  "<=": lte,
  ">": gt,
  ">=": gte,
  "decimal->string": decimalToString,
  "string->decimal": stringToDecimal,
  "exact?": isExact,
  "number?": isExact,
};
