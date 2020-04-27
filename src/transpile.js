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
  return `${getIdentifier(node, env)}`;
};

const CallExpression = (node, env = environment) => {
  let name = getValue(node, env).name;
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
  env[Symbol.for(node.name)] = value;
  return `let ${node.name} = ${makeVar(value)};`;
};

const makeVar = (name) => name;

const emit = {
  IntegerLiteral,
  FloatLiteral,
  StringLiteral,
  BooleanLiteral,
  Identifier,
  CallExpression,
  KeywordExpression,
  DefinitionExpression,
};

module.exports = { transpile, transpileProgram };

// console.log(
//   transpile({
//     type: "CallExpression",
//     name: "+",
//     arguments: [
//       { type: "IntegerLiteral", value: 2 },
//       { type: "IntegerLiteral", value: 3 },
//     ],
//   }),
// );
