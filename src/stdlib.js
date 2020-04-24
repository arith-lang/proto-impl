const all = (fn) => (...list) => list.reduce(fn);

// boolean expression functions
const and = (...exprs) => {
  for (expr of exprs) {
    if (Boolean(expr) === false) {
      return false;
    }
  }

  return exprs[exprs.length - 1];
};

const or = (...exprs) => {
  for (expr of exprs) {
    if (Boolean(expr) === true) {
      return expr;
    }
  }

  return exprs[exprs.length - 1];
};

const not = (expr) => !expr;

// I/O functions
const print = console.log;

// mathematical constants
const PI = Math.PI;

// mathematical functions
const add = all((a, c) => a + c);
const sub = all((a, c) => a - c);
const mul = all((a, c) => a * c);
const div = all((a, c) => a / c);
const mod = all((a, c) => a % c);
const max = (...args) => Math.max(...args);
const min = (...args) => Math.min(...args);
const pow = (x, y) => Math.pow(x, y);
const round = (x) => Math.round(x);
const ceil = (x) => Math.ceil(x);
const floor = (x) => Math.floor(x);
const floorDiv = (...args) => floor(div(...args));

// string functions
const strlen = (str) => str.length;
const upper = (str) => str.toUpperCase();
const lower = (str) => str.toLowerCase();
const strAdd = all((a, s) => a + s);
const strMul = (str, num) => str.repeat(num);
const strDiv = (str, sep = "") => str.split("").join(sep);
const getStrIndex = (str, i) => str[i];
const strSlice = (str, start, end) => str.slice(start, end);

module.exports = {
  and,
  or,
  not,
  PI,
  print,
  add,
  sub,
  mul,
  div,
  mod,
  max,
  min,
  pow,
  round,
  ceil,
  floor,
  floorDiv,
  strlen,
  upper,
  lower,
  strAdd,
  strMul,
  strDiv,
  getStrIndex,
  strSlice,
};
