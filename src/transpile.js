const transpile = (node) => {
  console.log(node.type);
  return (
    emit[node.type](node) ||
    new Error(`Cannot generate code for ${node.type}`)
  );
};

const IntegerLiteral = ({ value }) => `${value}`;

const FloatLiteral = ({ value }) => `${value}`;

const Identifier = ({ name }) => `${name}`;

const CallExpression = (node) => {
  let code = node.arguments.reduce((acc, c, i, a) => {
    let tmp = acc + transpile(c);
    if (i + 1 < a.length) tmp += ", ";

    return tmp;
  }, `${node.name}(`);

  code += ");";

  return code;
};

const emit = {
  IntegerLiteral,
  FloatLiteral,
  Identifier,
  CallExpression,
};

module.exports = { transpile };
