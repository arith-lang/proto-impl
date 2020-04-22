const evaluate = (node) => {
  if (node.value) {
    return node.value;
  } else if (node.value === 0) {
    return 0;
  } else {
    throw new TypeError(`${node.type} is invalid`);
  }
};

module.exports = { evaluate };
