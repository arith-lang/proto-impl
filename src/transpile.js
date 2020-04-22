const transpile = (node) => {
  return (
    emit[node.type](node) ||
    new Error(`Cannot generate code for ${node.type}`)
  );
};

const IntegerLiteral = ({ value }) => `${value}`;

const emit = {
  IntegerLiteral,
};

module.exports = { transpile };
