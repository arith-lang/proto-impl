function all(fn) {
  return function (...list) {
    return list.reduce(fn);
  };
}

module.exports = {
  all,
};
