const R = require("ramda");
const Decimal = require("./types/Decimal");

// mathematical constants
const PI = new Decimal(
  "3.1415926535897932384626433832795028841971693993751",
);
const E = new Decimal(
  "2.71828182845904523536028747135266249775724709369995",
);

// math functions
function pow(x, y) {
  return Decimal.pow(x, y);
}

pow = R.curry(pow);

function round(x) {
  return x.round();
}

function ceil(x) {
  return x.ceil();
}

function floor(x) {
  return x.floor();
}

function sqrt(x) {
  return Decimal.sqrt(x);
}

function abs(x) {
  return Decimal.abs(x);
}

// logarithm functions
// natural logarithm
function logE(x) {
  return Decimal.ln(x);
}

// log of any base, default to base 10
function log(x, base = 10) {
  return Decimal.log(x, base);
}

// log of base 2
function log2(x) {
  return Decimal.log2(x);
}

// log of base 10
function log10(x) {
  return Decimal.log10(x);
}

// trigonometric functions
function sin(x) {
  return Decimal.sin(x);
}

function cos(x) {
  return Decimal.cos(x);
}

function tan(x) {
  return Decimal.tan(x);
}

function asin(x) {
  return Decimal.asin(x);
}

function acos(x) {
  return Decimal.acos(x);
}

function atan(x) {
  return Decimal.atan(x);
}

function atan2(y, x) {
  return Decimal.atan2(y, x);
}

atan2 = R.curry(atan2);

module.exports = {
  PI,
  E,
  pow,
  round,
  ceil,
  floor,
  sqrt,
  abs,
  logE,
  log,
  log2,
  log10,
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  atan2,
};
