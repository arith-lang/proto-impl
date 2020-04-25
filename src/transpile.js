const transpile = (node) => {
  return (
    emit[node.type](node) ||
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

const CallExpression = (node) => {
  let code = node.arguments.reduce((acc, c, i, a) => {
    let tmp = acc + transpile(c);
    if (i + 1 < a.length) tmp += ", ";

    return tmp;
  }, `${node.name}(`);

  code += ")";

  return code;
};

const emit = {
  IntegerLiteral,
  FloatLiteral,
  StringLiteral,
  BooleanLiteral,
  Identifier,
  CallExpression,
};

module.exports = { transpile, transpileProgram };
