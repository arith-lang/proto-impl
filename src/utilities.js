const peek = (sequence) => sequence[0];
const pop = (sequence) => sequence.shift();
const push = (token, sequence) => sequence.unshift(token);

const pipe = (...funcs) => (value) =>
  funcs.reduce((value, func) => func(value), value);

module.exports = { peek, pop, push, pipe };
