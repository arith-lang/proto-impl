const stdlib = require("./stdlib");
const {
  setEnv,
  lookup,
  getValue,
  getIdentifier,
  defVar,
  defName,
  createEnv,
} = require("./environment");

const environment = setEnv(stdlib);
let scope = undefined;

const transpile = (node, env = environment) => {
  // console.log("transpile:", node);
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
  const e = scope || env;
  const local = lookup(node.name, e);
  return `${makeVar(getIdentifier(node, e))}`;
};

const CallExpression = (node, env = environment) => {
  let name =
    getValue(node, env).name || makeVar(getIdentifier(node, env));
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
  defVar(node.name, "", env);
  let value = transpile(node.value, env);
  defVar(node.name, value, env);
  return `let ${makeVar(node.name)} = ${value};`;
};

const LambdaExpression = (node, env = environment) => {
  scope = createEnv(env);
  let code = "(function(";
  node.params.forEach((param, i, a) => {
    code += `${makeVar(param.name)}`;
    defVar(param.name, undefined, scope);
    if (i + 1 < a.length) code += ", ";
  });
  code += ") { ";
  code += "return " + transpile(node.body);
  code += " })\n";

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
};

module.exports = { transpile, transpileProgram };
