const { peek, pop } = require("./utilities");
const {
  isRightParen,
  isLeftParen,
  isParen,
} = require("./identifiers");

const keywords = ["if", "cond", "define", "lambda"];

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

  if (token && isLeftParen(token.value)) {
    return maybeCall(tokens);
  }

  return parseAtom(token);
};

const maybeCall = (tokens) => {
  let token = peek(tokens);

  if (token && token.type === "IDENTIFIER") {
    if (keywords.includes(token.value)) {
      return parseKeyword(tokens);
    }
    return parseCall(tokens);
  } else if (isLeftParen(token.value)) {
    token = pop(tokens);

    if (peek(tokens) && peek(tokens).value === "lambda") {
      return parseIIFE(tokens);
    } else {
      tokens.unshift(token);
    }
  }

  return parse(tokens);
};

const parseIIFE = (tokens) => {
  const exprTokens = eatExprTokens(tokens, 2);

  let token = pop(exprTokens); // lambda identifier
  let callExpr = {
    type: "CallExpression",
    lambda: parseLambda(exprTokens),
    name: "lambda",
    arguments: [],
  };

  pop(exprTokens); // end-of-lambda right paren

  while (token && !isRightParen(token.value)) {
    callExpr.arguments.push(parse(exprTokens));
    token = pop(exprTokens);
  }

  return callExpr;
};

const parseIf = (tokens) => {
  const ifExprTokens = eatExprTokens(tokens);
  let token = pop(ifExprTokens);
  let conditionTokens;

  if (token && isLeftParen(token.value)) {
    conditionTokens = eatExprTokens(ifExprTokens);
    conditionTokens.unshift(token); // needed for parsing
  } else {
    conditionTokens = [token];
  }

  token = pop(ifExprTokens);
  let thenTokens;

  if (token && isLeftParen(token.value)) {
    thenTokens = eatExprTokens(ifExprTokens);
    thenTokens.unshift(token); // needed for parsing
  } else {
    thenTokens = [token];
  }

  token = pop(ifExprTokens);
  let elseTokens;

  if (token && isLeftParen(token.value)) {
    elseTokens = eatExprTokens(ifExprTokens);
    elseTokens.unshift(token); // needed for parsing
  } else {
    elseTokens = [token];
  }

  return {
    type: "IfExpression",
    condition: parse(conditionTokens),
    then: parse(thenTokens),
    else: parse(elseTokens),
  };
};

const parseKeyword = (tokens) => {
  let token = pop(tokens);

  switch (token.value) {
    case "define":
      return parseDefine(tokens);
    case "lambda":
      return parseLambda(tokens);
    case "if":
      return parseIf(tokens);
  }

  const expr = {
    type: "KeywordExpression",
    name: token.value,
    arguments: [],
  };

  while (!isRightParen(peek(tokens).value)) {
    expr.arguments.push(parse(tokens));
  }

  return expr;
};

const parseLambda = (tokens) => {
  let token = pop(tokens); // left paren for args
  let params = [];

  while (!isRightParen(token.value)) {
    token = pop(tokens);

    if (token && token.type === "IDENTIFIER") {
      params.push(parseParam(token));
    }
  }

  return {
    type: "LambdaExpression",
    params,
    body: parse(tokens),
  };
};

const parseParam = (token) => {
  return {
    type: "FunctionParameter",
    name: token.value,
  };
};

const parseDefine = (tokens) => {
  let token = pop(tokens);
  const definition = {
    type: "DefinitionExpression",
    name: token.value,
    value: parse(tokens),
  };

  return definition;
};

const parseCall = (tokens) => {
  let token = pop(tokens);
  const call = {
    type: "CallExpression",
    name: token.value,
    arguments: [],
  };
  if (isLeftParen(peek(tokens).value)) {
    token = pop(tokens);
    if (peek(tokens).value === "lambda") {
      pop(tokens); // get rid of "lambda" token for parseLambda
      const lambdaTokens = eatExprTokens(tokens);
      const lambda = parseLambda(lambdaTokens);
      call.arguments.push(lambda);
    } else {
      tokens.unshift(token); // if not a lambda, the next line needs that token
    }
  }

  if (isLeftParen(peek(tokens).value)) {
    token = pop(tokens);
    if (peek(tokens).value === "lambda") {
      token = pop(tokens); // parseLambda expects tokens starting with left paren starting args
      const lambda = parseLambda(tokens);
      call.arguments.push(lambda);
      pop(tokens); // right paren at end of lambda
    }
  }

  while (!isRightParen(peek(tokens).value)) {
    call.arguments.push(parse(tokens));
  }

  pop(tokens);
  return call;
};

const parseAtom = (token) => {
  if (token) {
    return nodeCreators[token.type]
      ? nodeCreators[token.type](token.value)
      : noop();
  }
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
