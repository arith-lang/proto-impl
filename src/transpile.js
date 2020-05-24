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

const transpileBlock = (node) => {
  let i = 0;
  let code = "";
  while (i < node.body.length) {
    if (node.body[i]) {
      code += transpile(node.body[i]) + "\n";
    }
    i += 1;
  }

  return code;
};

const Program = ({ body }) => transpileBlock(body);

const DecimalLiteral = ({ value }) => `number(${value})`;

const BooleanLiteral = ({ value }) => `bool(${value})`;

const StringLiteral = ({ value }) => `string(${value})`;

const Identifier = (node, env = globalEnv) => {
  let name = "";

  try {
    name = getValue(node, env).name;
  } catch (e) {
    name = getIdentifier(node, env) || makeVar(node.name);
  }

  return name;
};

const CallExpression = (node, env = globalEnv) => {
  let name = "";

  try {
    name = getValue(node, env).name;
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
