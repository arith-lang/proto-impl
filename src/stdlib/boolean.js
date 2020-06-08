// boolean expression functions
// do not curry
function and(...exprs) {
  for (expr of exprs) {
    if (expr === false) {
      return false;
    }
  }

  return last;
}

function or(...exprs) {
  for (expr of exprs) {
    if (expr !== false) {
      return expr;
    }
  }

  return false;
}

function not(expr) {
  return !expr;
}

module.exports = {
  and,
  or,
  not,
};
