// boolean expression functions
function and(...exprs) {
  for (expr of exprs) {
    if (Boolean(expr) === false) {
      return false;
    }
  }

  return exprs[exprs.length - 1];
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
