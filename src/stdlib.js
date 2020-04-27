const all = (fn) => (...list) => list.reduce(fn);

// keyword expression functions
const ifExpr = (cond, ifTrue, ifFalse) => {
  if (cond !== false && cond !== null) {
    return ifTrue;
  }
  return ifFalse;
};

const elseExpr = (expr) => expr;

const condExpr = (...exprs) => {
  for (let i = 0; i <= exprs.length; i += 2) {
    if (
      exprs[i] !== false &&
      exprs[i] !== null &&
      exprs[i + 1] != undefined
    ) {
      return exprs[i + 1];
    } else if (exprs[i] !== null && i + 1 === exprs.length) {
      return exprs[i];
    }
  }
};

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

// string functions
const strlen = (str) => str.length;
const upper = (str) => str.toUpperCase();
const lower = (str) => str.toLowerCase();
const strAppend = all((a, s) => a + s);
const strRepeat = (str, num) => str.repeat(num);
const strSeparate = (str, sep = "") => str.split("").join(sep);
const strIndex = (str, i) => str[i];
const strSlice = (str, start, end) => str.slice(start, end);

// string comparisons
const strEq = (str1, str2) => str1 === str2;
const strLt = (str1, str2) => str1 < str2;
const strLte = (str1, str2) => str1 <= str2;
const strGt = (str1, str2) => str1 > str2;
const strGte = (str1, str2) => str1 >= str2;

module.exports = {
  ifExpr,
  elseExpr,
  condExpr,
  and,
  or,
  not,
  PI,
  print,
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
  strlen,
  upper,
  lower,
  strAppend,
  strRepeat,
  strSeparate,
  strIndex,
  strSlice,
  strEq,
  strLt,
  strLte,
  strGt,
  strGte,
};
