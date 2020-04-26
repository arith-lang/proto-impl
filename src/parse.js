const { peek, pop } = require("./utilities");
const { isRightParen, isLeftParen } = require("./identifiers");

const keywords = ["if", "else", "cond"];

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
    return maybeCall(tokens);
  }

  return parseAtom(token);
};

const maybeCall = (tokens) => {
  const token = peek(tokens);

  if (token.type === "IDENTIFIER") {
    if (keywords.includes(token.value)) {
      return parseKeyword(tokens);
    }

    return parseCall(tokens);
  }

  return parse(tokens);
};

const parseKeyword = (tokens) => {
  const token = pop(tokens);
  const expr = {
    type: "KeywordExpression",
    name: token.value,
    arguments: [],
  };

  while (!isRightParen(peek(tokens).value)) {
    expr.arguments.push(parse(tokens));
  }

  pop(tokens);
  return expr;
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

const parseAtom = (token) => {
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
  parse,
};
