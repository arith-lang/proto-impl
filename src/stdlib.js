const all = (fn) => (...list) => list.reduce(fn);

// keyword expression functions
const ifExpr = (cond, ifTrue, ifFalse) => {
  if (cond !== false && cond !== null) {
    return ifTrue;
  }

  return ifFalse;
};

// const condExpr = (...exprs) => {
//   for (let i = 0; i < exprs.length; i += 2) {
//     if (exprs[i] !== false && exprs[i] !== null) {
//       return exprs[i + 1];
//     }
//   }
// };

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

// numeric comparisons
const eq = (x, y) => x === y;
const lt = (x, y) => x < y;
const lte = (x, y) => x <= y;
const gt = (x, y) => x > y;
const gte = (x, y) => x >= y;

// string functions
const strlen = (str) => str.length;
const upper = (str) => str.toUpperCase();
const lower = (str) => str.toLowerCase();
const strAdd = all((a, s) => a + s);
const strMul = (str, num) => str.repeat(num);
const strDiv = (str, sep = "") => str.split("").join(sep);
const getStrIndex = (str, i) => str[i];
const strSlice = (str, start, end) => str.slice(start, end);

// string comparisons
const strEq = (str1, str2) => str1 === str2;
const strLt = (str1, str2) => str1 < str2;
const strLte = (str1, str2) => str1 <= str2;
const strGt = (str1, str2) => str1 > str2;
const strGte = (str1, str2) => str1 >= str2;

module.exports = {
  ifExpr,
  // condExpr,
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
  eq,
  lt,
  lte,
  gt,
  gte,
  strlen,
  upper,
  lower,
  strAdd,
  strMul,
  strDiv,
  getStrIndex,
  strSlice,
  strEq,
  strLt,
  strLte,
  strGt,
  strGte,
};
