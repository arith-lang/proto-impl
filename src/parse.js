const { pop } = require("./utilities");

const parse = (tokens) => {
  const token = pop(tokens);

  return (
    nodeCreators[token.type](token.value) ||
    new SyntaxError(`${token.type} not recognized`)
  );
};

const INTEGER = (value) => {
  return {
    type: "IntegerLiteral",
    value,
  };
};

const FLOAT = (value) => {
  return {
    type: "FloatLiteral",
    value,
  };
};

const nodeCreators = {
  INTEGER,
  FLOAT,
};

module.exports = { parse };
