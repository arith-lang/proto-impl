const stdlib = require("./stdlib");

const environment = { ...stdlib };

const getIdentifier = (node) => {
  if (environment[node.name]) {
    return environment[node.name];
  }

  throw new ReferenceError(`${node.name} is not defined`);
};

const apply = (node) => {
  const fn = environment[node.name];
  const args = node.arguments.map(evaluate);

  if (typeof fn !== "function") {
    throw new TypeError(`${node.name} is not a function`);
  }

  return fn(...args);
};

const evaluate = (node) => {
  switch (node.type) {
    case "Identifier":
      return getIdentifier(node);

    case "CallExpression":
      return apply(node);
  }

  if (node.value) {
    return node.value;
  } else if (node.value === 0) {
    return 0;
  } else if (node.value === false) {
    return false;
  } else {
    throw new TypeError(`${node.type} is invalid`);
  }
};

module.exports = { evaluate };
