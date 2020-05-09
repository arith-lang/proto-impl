const all = (fn) => (...list) => list.reduce(fn);

module.exports = {
  all,
};
