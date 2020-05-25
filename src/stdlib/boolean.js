const _Boolean = require("./types/Boolean");

// boolean constructor
function bool(value) {
  return new _Boolean(value);
}

// check if new _Boolean should return false
function shouldReturnFalse(value) {
  return _Boolean.shouldReturnFalse(value);
}

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
    if (!_Boolean.shouldReturnFalse(expr)) {
      if (expr === true) {
        return _Boolean.make("#t");
      }
      return expr;
    }
  }

  return _Boolean.make("f");
}

function not(expr) {
  if (!_Boolean.shouldReturnFalse(expr)) {
    return _Boolean.make("#f");
  }
  return _Boolean.make("#t");
}

module.exports = {
  bool,
  shouldReturnFalse,
  and,
  or,
  not,
};
