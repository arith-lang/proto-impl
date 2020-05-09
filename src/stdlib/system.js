// keyword expression functions
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

module.exports = {
  condExpr,
  and,
  or,
  not,
};
