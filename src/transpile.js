const stdlib = require("./stdlib");
const { setEnv, getValue, getIdentifier } = require("./environment");

const environment = setEnv(stdlib);

const transpile = (node, env = environment) => {
  if (node) {
    return (
      emit[node.type](node, env) ||
      new Error(`Cannot generate code for ${node.type}`)
    );
  }
};

const transpileProgram = (prog) => {
  let i = 0;
  let code = "";
  while (i < prog.body.length) {
    if (prog.body[i]) {
      code += transpile(prog.body[i]) + "\n";
    }
    i += 1;
  }

  return code;
};

const returnValue = ({ value }) => `${value}`;

const IntegerLiteral = returnValue;
const FloatLiteral = returnValue;
const BooleanLiteral = returnValue;

const StringLiteral = ({ value }) => `"${value}"`;

const Identifier = (node, env = environment) => {
  let name = "";

  try {
    name = getValue(node, env).name;
  } catch (e) {
    name = getIdentifier(node, env) || makeVar(node.name);
  }

  return name;
};

const CallExpression = (node, env = environment) => {
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

const KeywordExpression = (node, env = environment) => {
  node.name = `${node.name}Expr`;

  return CallExpression(node, env);
};

const DefinitionExpression = (node, env = environment) => {
  let value = transpile(node.value, env);
  return `var ${makeVar(node.name)} = ${value};`;
};

const LambdaExpression = (node, env = environment) => {
  let code = "(function(";
  node.params.forEach((param, i, a) => {
    code += `${makeVar(param.name)}`;
    if (i + 1 < a.length) code += ", ";
  });
  code += ") { ";
  code += "return " + transpile(node.body);
  code += " })\n";

  return code;
};

const IfExpression = (node, env = environment) => {
  let code = "(";
  code += transpile(node.condition, env) !== false;
  code += " ? ";
  code += transpile(node.then, env);
  code += " : ";
  code += transpile(node.else, env) + ")";

  return code;
};

const makeVar = (name) => {
  const specialChars = /[-%&!\?\*\+\/\\><\^]/g;
  const newName = `_arith_${name.replace(specialChars, "_")}`;

  return newName;
};

const emit = {
  IntegerLiteral,
  FloatLiteral,
  StringLiteral,
  BooleanLiteral,
  Identifier,
  CallExpression,
  KeywordExpression,
  DefinitionExpression,
  LambdaExpression,
  IfExpression,
};

module.exports = { transpile, transpileProgram };
