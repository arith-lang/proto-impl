const { peek, pop } = require("./utilities");
const { isRightParen, isLeftParen } = require("./identifiers");

const expressionize = (tokens) => {
  const token = pop(tokens);

  if (isLeftParen(token.value)) {
    const expression = [];

    while (!isRightParen(peek(tokens).value)) {
      expression.push(expressionize(tokens));
    }

    pop(tokens);
    return expression;
  }

  return token;
};

const parseProgram = (tokens) => {
  const program = {
    type: "Program",
    body: [],
  };

  while (tokens.length) {
    body.push(parse(tokens));
  }

  return program;
};

const parse = (tokens) => {
  if (Array.isArray(tokens)) {
    const [first, ...rest] = tokens;
    return {
      type: "CallExpression",
      name: first.value,
      arguments: rest.map(parse),
    };
  }

  const token = tokens;
  return nodeCreators[token.type]
    ? nodeCreators[token.type](token.value)
    : noop();
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

const IDENTIFIER = (value) => {
  return {
    type: "Identifier",
    name: value,
  };
};

const STRING = (value) => {
  return {
    type: "StringLiteral",
    value,
  };
};

const BOOLEAN = (value) => {
  return {
    type: "BooleanLiteral",
    value,
  };
};

const noop = () => {};

const nodeCreators = {
  INTEGER,
  FLOAT,
  IDENTIFIER,
  STRING,
  BOOLEAN,
};

module.exports = {
  parseProgram,
  parse: (tokens) => parse(expressionize(tokens)),
};
