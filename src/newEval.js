const stdlib = require("./stdlib");
const _Boolean = require("./stdlib/types/Boolean");
const { setEnv, getValue } = require("./environment");

const { tokenize } = require("./tokenize");
const { parse } = require("./newParse");
const { ArithTypeError } = require("./errors");

const environment = setEnv(stdlib);

const evaluate = (node, env = environment) => {
  switch (node.type) {
    case "Program":
      return evalBlock(node.body);
    case "DecimalLiteral":
      return stdlib.decimal(node.value);
    case "StringLiteral":
      return stdlib.string(node.value);
    case "NilLiteral":
      return stdlib.nil;
    case "BooleanLiteral":
      return new _Boolean(node.value);
    case "CallExpression":
      return apply(node, env);
  }
};

const evalBlock = (block) => {
  let val;
  for (let i = 0; i < block.length; i++) {
    val = evaluate(block[i]);
  }
  return val;
};

const apply = (node, env) => {
  const fn = getValue(node, env);
  const name = fn.name || node.name;
  const args = node.arguments.map((a) => evaluate(a, env));
  if (fn instanceof Function !== true) {
    throw new ArithTypeError(`${name} is not a function`);
  }
  return fn(...args);
};

module.exports = { evaluate };
