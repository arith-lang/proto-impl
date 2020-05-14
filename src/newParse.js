const { peek, lookahead, pop } = require("./utilities");
const { tokenize } = require("./tokenize");
const { isLeftParen, isRightParen } = require("./identifiers");

const parse = (tokens) => {
  const parseProgram = (tokens) => {
    const startToken = peek(tokens);
    const endToken = lookahead(tokens, tokens.length - 1);
    const program = {
      type: "Program",
      body: parseBlock(tokens),
      start: {
        line: startToken.line,
        col: startToken.start,
      },
      end: {
        line: endToken.line,
        col: endToken.end,
      },
    };
    return program;
  };

  const parseBlock = (tokens) => {
    let body = [];
    while (tokens.length) {
      body.push(parseExpr(tokens));
    }
    return body;
  };

  parseExpr = (tokens) => {
    const token = pop(tokens);
    if (isLeftParen(token.value)) {
      return maybeCall(tokens);
    }
    return parseAtom(token);
  };

  const maybeCall = (tokens) => {
    return "Maybe Call";
  };

  const parseAtom = (token) => {
    return token;
  };

  const eatExprTokens = (tokens, numOfLeft = 1) => {
    let exprTokens = [];
    let lParens = numOfLeft;
    let rParens = 0;

    while (lParens > rParens) {
      token = pop(tokens);
      if (isLeftParen(token.value)) lParens += 1;
      if (isRightParen(token.value)) rParens += 1;
      exprTokens.push(token);
    }

    return exprTokens;
  };

  return parseProgram(tokens);
};

module.exports = { parse };

console.log(parse(tokenize(``)));
