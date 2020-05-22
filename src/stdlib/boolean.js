const _Boolean = require("./types/Boolean");

// boolean expression functions
function and(...exprs) {
  for (expr of exprs) {
    if (_Boolean.shouldReturnFalse(expr)) {
      return _Boolean.make("#f");
    }
  }

  const last = exprs[exprs.length - 1];
  if (_Boolean.isBoolNative(last) || last === true) {
    return _Boolean.make("#t");
  }

  return last;
}

function or(...exprs) {
  for (expr of exprs) {
    if (expr == true || expr === 0 || expr === "") {
      return expr;
    }
  }

  return exprs[exprs.length - 1];
}

function not(expr) {
  return !expr;
}

module.exports = {
  and,
  or,
  not,
};
