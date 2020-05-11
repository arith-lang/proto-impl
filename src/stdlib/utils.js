function all(fn) {
  return function (...list) {
    return list.reduce(fn);
  };
}

// In case of emergency, break glass
function jsRaw(js) {
  eval(js);
}

module.exports = {
  all,
  "js-raw": jsRaw,
};
