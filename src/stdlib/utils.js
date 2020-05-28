function all(fn) {
  return function (...list) {
    return list.reduce(fn);
  };
}

// In case of emergency, break glass
function jsRaw(js) {
  eval(js);
}

// from https://github.com/adobe/ferrum/blob/master/src/functional.js
const pipe = (val, ...fns) => fns.reduce((v, fn) => fn(v), val);
const compose = (...fns) => (val) => pipe(val, ...fns);

module.exports = {
  all,
  "js-raw": jsRaw,
  "|>": pipe,
  pipe,
  compose,
};
