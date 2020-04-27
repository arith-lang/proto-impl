const stdlib = require("./stdlib");
const { setEnv, getIdentifier } = require("./environment");

const environment = setEnv(stdlib);

const transpile = (node) => {
  return (
    emit[node.type](node, environment) ||
    new Error(`Cannot generate code for ${node.type}`)
  );
};

const transpileProgram = (prog) => {
  let i = 0;
  let code = "";
  while (i < prog.body.length) {
    code += transpile(prog.body[i]) + "\n";
    i += 1;
  }

  return code;
};

const returnValue = ({ value }) => `${value}`;

const IntegerLiteral = returnValue;
const FloatLiteral = returnValue;
const BooleanLiteral = returnValue;

const StringLiteral = ({ value }) => `"${value}"`;

const Identifier = ({ name }) => `${name}`;

const CallExpression = (node, env = environment) => {
  let name = getIdentifier(node, env).name || node.name;
  let code = node.arguments.reduce((acc, c, i, a) => {
    let tmp = acc + transpile(c);
    if (i + 1 < a.length) tmp += ", ";

    return tmp;
  }, `${name}(`);

  code += ")";

  return code;
};

const KeywordExpression = (node) => {
  node.name = `${node.name}Expr`;

  return CallExpression(node);
};

const DefinitionExpression = (node) => {};

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
