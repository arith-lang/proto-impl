const peek = (sequence) => sequence[0];
const lookahead = (sequence, pos) => sequence[pos];
const pop = (sequence) => sequence.shift();
const push = (token, sequence) => sequence.unshift(token);

const pipe = (...funcs) => (value) =>
  funcs.reduce((value, func) => func(value), value);

module.exports = { peek, lookahead, pop, push, pipe };
