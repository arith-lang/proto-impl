const all = (fn) => (...list) => list.reduce(fn);

// keyword expression functions
const ifExpr = (condition, ifTrue, ifFalse) => {
  return condition !== false ? ifTrue : ifFalse;
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
    if (expr == true || expr === 0 || expr === "") {
      return expr;
    }
  }

  return exprs[exprs.length - 1];
};

const not = (expr) => !expr;

// I/O functions
const print = (...args) => {
  console.log(...args);
};

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
function strlen(str) {
  str.length;
}

function upper(str) {
  return str.toUpperCase();
}
function lower(str) {
  return str.toLowerCase();
}

function strAppend(...args) {
  return all((a, s) => a + s)(...args);
}

function strRepeat(str, num) {
  return str.repeat(num);
}

function strRef(str, i) {
  return str[i];
}

const substring = (str, start, end) => str.slice(start, end);

// string comparisons
function strEq(str1, str2) {
  return str1 === str2;
}

function strLt(str1, str2) {
  str1 < str2;
}

function strLte(str1, str2) {
  return str1 <= str2;
}

function strGt(str1, str2) {
  return str1 > str2;
}

function strGte(str1, str2) {
  return str1 >= str2;
}

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
  "string-length": strlen,
  "string-upcase": upper,
  "string-downcase": lower,
  "string-append": strAppend,
  "string-repeat": strRepeat,
  "string-ref": strRef,
  substring,
  "string-copy": (str) => substring(str, 0),
  "string-trim": (str) => str.trim(),
  "string=?": strEq,
  "string<?": strLt,
  "string<=?": strLte,
  "string>?": strGt,
  "string>=?": strGte,
};
