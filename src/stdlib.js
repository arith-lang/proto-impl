const all = (fn) => (...list) => list.reduce(fn);

const PI = Math.PI;

const print = console.log;
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

module.exports = {
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
};
