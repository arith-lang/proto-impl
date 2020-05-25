const { parse } = require("./parse");
const globals = require("./globals");
const { setEnv, getValue, getIdentifier } = require("./environment");

const globalEnv = setEnv(globals);

const transpile = (node, env = globalEnv) => {
  if (node) {
    return (
      emit[node.type](node, env) ||
      new Error(`Cannot generate code for ${node.type}`)
    );
  }
};

const transpileBlock = (block) => {
  let i = 0;
  let code = "";
  while (i < block.length) {
    if (block[i]) {
      code += transpile(block[i]) + "\n";
    }
    i += 1;
  }

  return code;
};

const Program = ({ body }) => transpileBlock(body);

const DecimalLiteral = ({ value }) => `__arith__.decimal(${value})`;

const BooleanLiteral = ({ value }) => `__arith__.bool(${value})`;

const StringLiteral = ({ value }) => `__arith__.string(${value})`;

const Identifier = (node, env = globalEnv) => {
  let name = "";

  try {
    name = getIdentifier(node, env);
    name = `__arith__["${name}"]`;
  } catch (e) {
    name = makeVar(node.name);
  }

  return name;
};

const CallExpression = (node, env = globalEnv) => {
  let name = "";

  try {
    name = getIdentifier(node, env);
    name = `__arith__["${name}"]`;
  } catch (e) {
    name = makeVar(node.name);
  }

  let code = node.arguments.reduce((acc, c, i, a) => {
    let tmp = acc + transpile(c);
    if (i + 1 < a.length) tmp += ", ";

    return tmp;
  }, `${name}(`);

  code += ")";

  return code;
};

const KeywordExpression = (node, env = globalEnv) => {
  node.name = `${node.name}Expr`;

  return CallExpression(node, env);
};

const DefinitionExpression = (node, env = globalEnv) => {
  let value = transpile(node.value, env);
  return `let ${makeVar(node.name)} = ${value};`;
};

const LambdaExpression = (node, env = globalEnv) => {
  let code = "(function(";
  node.params.forEach((param, i, a) => {
    code += `${makeVar(param.name)}`;
    if (i + 1 < a.length) code += ", ";
  });
  code += ") { ";
  code += "return " + transpileBlock(node.body);
  code += " })\n";

  return code;
};

const IfExpression = (node, env = globalEnv) => {
  let code = "(";
  code += transpile(node.condition, env) !== false;
  code += " ? ";
  code += transpile(node.then, env);
  code += " : ";
  code += transpile(node.else, env) + ")";

  return code;
};

const makeVar = (name) => {
  const specialChars = /[-%|&!\?\*\+\/\\><\^@]/g;
  const newName = `_arith_${name.replace(specialChars, "_")}`;

  return newName;
};

const emit = {
  Program,
  DecimalLiteral,
  StringLiteral,
  BooleanLiteral,
  Identifier,
  CallExpression,
  KeywordExpression,
  DefinitionExpression,
  LambdaExpression,
  IfExpression,
};

module.exports = { transpile: (input) => transpile(parse(input)) };
