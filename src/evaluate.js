const stdlib = require("./stdlib");

// const environment = { ...stdlib };

const setEnv = (obj) => {
  const env = Object.create(null);

  for (key of Object.keys(obj)) {
    env[Symbol.for(key)] = obj[key];
  }

  return env;
};

const environment = setEnv(stdlib);

const getIdentifier = (node) => {
  if (environment[Symbol.for(node.name)]) {
    return environment[Symbol.for(node.name)];
  }

  throw new ReferenceError(`${node.name} is not defined`);
};

const apply = (node) => {
  const fn = getIdentifier(node);
  const args = node.arguments.map(evaluate);

  if (typeof fn !== "function") {
    throw new TypeError(`${node.name} is not a function`);
  }

  return fn(...args);
};

const applyKeyword = (node) => {
  const name = `${node.name}Expr`;

  return apply({
    ...node,
    name,
  });
};

const evaluate = (node) => {
  switch (node.type) {
    case "Identifier":
      return getIdentifier(node);

    case "KeywordExpression":
      return applyKeyword(node);

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

const evaluateProgram = (prog) => {
  let i = 0;
  while (i < prog.body.length) {
    evaluate(prog.body[i]);
    i += 1;
  }

  return;
};

module.exports = { evaluate, evaluateProgram };
