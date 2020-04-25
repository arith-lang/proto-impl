const { peek, pop } = require("./utilities");
const { isRightParen, isLeftParen } = require("./identifiers");

const parseProgram = (tokens) => {
  const program = {
    type: "Program",
    body: [],
  };

  let i = 0;
  while (tokens.length) {
    program.body.push(parse(tokens));
    i++;
  }

  return program;
};

const parse = (tokens) => {
  const token = pop(tokens);

  if (isLeftParen(token.value)) {
    return parseCall(tokens);
  }

  return nodeCreators[token.type]
    ? nodeCreators[token.type](token.value)
    : noop();
};

const parseCall = (tokens) => {
  const token = pop(tokens);
  const call = {
    type: "CallExpression",
    name: token.value,
    arguments: [],
  };

  while (!isRightParen(peek(tokens).value)) {
    call.arguments.push(parse(tokens));
  }

  pop(tokens);
  return call;
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
  parse,
};
