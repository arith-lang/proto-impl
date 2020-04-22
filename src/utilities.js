const peek = (sequence, index) => sequence[index];
const pop = (sequence) => sequence.shift();

const pipe = (...funcs) => (value) =>
  funcs.reduce((value, func) => func(value), value);

module.exports = { peek, pop, pipe };
