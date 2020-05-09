const { all } = require("./utils");

// mathematical constants
const PI = Math.PI;

// mathematical functions
// const add = all((a, c) => a + c);
function add(...args) {
  return all((a, c) => a + c)(...args);
}

function sub(...args) {
  return all((a, c) => a - c)(...args);
}

function mul(...args) {
  return all((a, c) => a * c)(...args);
}

function div(...args) {
  return all((a, c) => a / c)(...args);
}

function mod(...args) {
  return all((a, c) => a % c)(...args);
}

function floorDiv(...args) {
  return floor(div(...args));
}

const max = (...args) => Math.max(...args);
const min = (...args) => Math.min(...args);
const pow = (x, y) => Math.pow(x, y);
const round = (x) => Math.round(x);
const ceil = (x) => Math.ceil(x);
const floor = (x) => Math.floor(x);

// numeric comparisons
function eq(x, y) {
  return x === y;
}

function lt(x, y) {
  return x < y;
}

function lte(x, y) {
  return x <= y;
}

function gt(x, y) {
  return x > y;
}

function gte(x, y) {
  return x >= y;
}

module.exports = {
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
