const { peek, pop } = require("./utilities");
const {
  isRightParen,
  isLeftParen,
  isParen,
} = require("./identifiers");
const keywords = require("./keywords");

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
  let token = pop(tokens);
  let lParens = 1;
  let rParens = 0;
  const expr = {
    type: "KeywordExpression",
    name: token.value,
    arguments: [],
  };

  if (expr.name === "cond") {
    let exprTokens = [];
    while (lParens > rParens) {
      token = pop(tokens);
      if (isLeftParen(token.value)) lParens += 1;
      else if (isRightParen(token.value)) rParens += 1;
      exprTokens.push(token);
    }

    return parseCond(expr, exprTokens);
  } else {
    while (!isRightParen(peek(tokens).value)) {
      expr.arguments.push(parse(tokens));
    }

    return expr;
  }
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

const parseCond = (exprNode, tokens) => {
  while (tokens.length) {
    if (peek(tokens).value) {
      if (!isRightParen(peek(tokens).value)) {
        exprNode.arguments.push(parse(tokens));
      } else {
        pop(tokens);
        continue;
      }
    }
  }

  pop(tokens);
  return exprNode;
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

// console.log(
//   parse([
//     { type: "PAREN", value: "(" },
//     { type: "IDENTIFIER", value: "cond" },
//     { type: "PAREN", value: "(" },
//     { type: "BOOLEAN", value: true },
//     { type: "STRING", value: "yes" },
//     { type: "PAREN", value: ")" },
//     { type: "PAREN", value: "(" },
//     { type: "BOOLEAN", value: false },
//     { type: "STRING", value: "no" },
//     { type: "PAREN", value: ")" },
//     { type: "PAREN", value: "(" },
//     { type: "IDENTIFIER", value: "else" },
//     { type: "STRING", value: "else clause" },
//     { type: "PAREN", value: ")" },
//     { type: "PAREN", value: ")" },
//   ]),
// );
