function all(fn) {(...list) =>
  return list.reduce(fn);
}

module.exports = {
  all,
};
