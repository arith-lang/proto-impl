const stdlib = require("./stdlib");
const { setEnv, getIdentifier } = require("./environment");

const environment = setEnv(stdlib);

const define = (node, env) => {
  return (env[Symbol.for(node.name)] = evaluate(node.value));
};

const apply = (node) => {
  const fn = getIdentifier(node, environment);
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
      return getIdentifier(node, environment);

    case "KeywordExpression":
      return applyKeyword(node);

    case "CallExpression":
      return apply(node);

    case "DefinitionExpression":
      return define(node, environment);
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
