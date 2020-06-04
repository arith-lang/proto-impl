const { peek, lookahead, pop } = require("./utilities");
const { tokenize } = require("./tokenize");
const {
  isLeftParen,
  isRightParen,
  isKeyword,
} = require("./identifiers");
const { ArithSyntaxError } = require("./errors");

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

  return parseProgram(tokens);
};

const parseBlock = (tokens) => {
  let body = [];
  let parsed;

  while (tokens.length) {
    parsed = parseExpr(tokens);

    if (parsed) {
      body.push(parsed);
    }
  }

  return body;
};

parseExpr = (tokens) => {
  let token = pop(tokens);

  if (token && isLeftParen(token.value)) {
    return maybeCall(tokens);
  }

  return parseAtom(token);
};

const maybeCall = (tokens) => {
  let token = peek(tokens);

  if (token.type === "KEYWORD") {
    return parseKeyword(tokens);
  } else if (token.type === "IDENTIFIER") {
    return parseCall(tokens);
  }

  throw new ArithSyntaxError(
    `Don't know how to parse ${token.value} at line ${token.line}, col ${token.start}`,
  );
};

const parseKeyword = (tokens) => {
  let token = pop(tokens);

  switch (token.value) {
    case "#t":
    case "#f":
      return parseAtom(token);
    case "define":
      return parseDefine(tokens);
    case "lambda":
      return parseLambda(tokens);
    case "if":
      return parseIf(tokens);
    case "struct":
      return parseStructDefinition(tokens);
    case "set!":
      return parseSet(tokens);
  }
  throw new ArithSyntaxError(
    `Unknown keyword ${token.value} at line ${token.line} and col ${token.start}`,
  );
};

const parseSet = (tokens) => {};

const parseStructDefinition = (tokens) => {
  let structTokens = eatExprTokens(tokens);
  const startToken = structTokens[0];
  const endToken = structTokens[structTokens.length - 1];
  let token = pop(structTokens);
  let struct = {
    type: "StructDefinition",
    name: token.value,
    fields: [],
    start: {
      line: startToken.line,
      col: startToken.start,
    },
    end: {
      line: endToken.line,
      col: endToken.end,
    },
  };
  token = pop(structTokens); // left paren opening fields
  while (!isRightParen(peek(structTokens).value)) {
    token = pop(structTokens);
    struct.fields.push(parseAtom(token));
  }

  return struct;
};

const parseIf = (tokens) => {
  let ifExprTokens = eatExprTokens(tokens);
  const startToken = ifExprTokens[0];
  const endToken = ifExprTokens[ifExprTokens.length - 1];

  return {
    type: "IfExpression",
    condition: parseExpr(ifExprTokens),
    then: parseExpr(ifExprTokens),
    else: parseExpr(ifExprTokens),
    start: {
      line: startToken.line,
      col: startToken.start,
    },
    end: {
      line: endToken.line,
      col: endToken.end,
    },
  };
};

const parseLambda = (tokens) => {
  let lambdaTokens = eatExprTokens(tokens);
  let token = pop(lambdaTokens);
  let params = [];
  const startToken = token;
  const endToken = lambdaTokens[lambdaTokens.length - 1];

  // parse parameters
  while (!isRightParen(token.value)) {
    token = pop(lambdaTokens);
    if (token.type === "IDENTIFIER") {
      params.push(parseParam(token));
    }
  }

  let bodyTokens;

  if (isLeftParen(peek(lambdaTokens).value)) {
    // get rid of paren closing the lambda so parseBody doesn't
    // send it through where parseAtom will choke on it
    bodyTokens = lambdaTokens.slice(0, lambdaTokens.length - 1);
  } else {
    bodyTokens = [pop(lambdaTokens)]; // body is an atom
  }

  return {
    type: "LambdaExpression",
    params,
    body: parseBlock(bodyTokens),
    start: {
      line: startToken.line,
      col: startToken.start,
    },
    end: {
      line: endToken.line,
      col: endToken.end,
    },
  };
};

const parseParam = (token) => ({
  type: "FunctionParameter",
  name: token.value,
});

const parseDefine = (tokens) => {
  let defineTokens = eatExprTokens(tokens);
  let startToken = peek(defineTokens);
  let endToken = lookahead(defineTokens, defineTokens.length - 1);
  let token = pop(defineTokens);

  return {
    type: "VariableDefinition",
    name: token.value,
    value: parseExpr(defineTokens),
    start: {
      line: startToken.line,
      col: startToken.start,
    },
    end: {
      line: endToken.line,
      col: endToken.end,
    },
  };
};

const parseCall = (tokens) => {
  let callTokens = eatExprTokens(tokens);
  let token = pop(callTokens);
  let endToken = lookahead(callTokens, callTokens.length - 1);
  let call = {
    type: "CallExpression",
    name: token.value,
    arguments: [],
    start: {
      line: token.line,
      col: token.start,
    },
    end: {
      line: endToken.line,
      col: endToken.end,
    },
  };

  while (!isRightParen(peek(callTokens).value)) {
    call.arguments.push(parseExpr(callTokens));
  }

  return call;
};

const parseAtom = (token) => {
  if (isKeyword(token.value)) {
    if (token.value === "#t" || token.value === "#f") {
      return nodeCreators["BOOLEAN"](token);
    } else if (token.value === "nil") {
      return nodeCreators["NIL"](token);
    }
  } else if (nodeCreators[token.type]) {
    return nodeCreators[token.type](token);
  }

  throw new ArithSyntaxError(
    `Could not parse ${token.value} at line ${token.line}, col ${token.start}`,
  );
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

const DECIMAL = ({ value, line, start, end }) => {
  return createAtomNode("DecimalLiteral", value, line, start, end);
};

const STRING = ({ value, line, start, end }) => {
  return createAtomNode("StringLiteral", value, line, start, end);
};

const IDENTIFIER = ({ value, line, start, end }) => {
  return {
    type: "Identifier",
    name: value,
    start: {
      line,
      col: start,
    },
    end: {
      line,
      col: end,
    },
  };
};

const BOOLEAN = ({ value, line, start, end }) => {
  return createAtomNode("BooleanLiteral", value, line, start, end);
};

const NIL = ({ value, line, start, end }) => {
  return createAtomNode("NilLiteral", value, line, start, end);
};

const nodeCreators = { DECIMAL, STRING, IDENTIFIER, BOOLEAN, NIL };

const createAtomNode = (type, value, line, start, end) => {
  return {
    type,
    value,
    start: {
      line,
      col: start,
    },
    end: {
      line,
      col: end,
    },
  };
};

module.exports = {
  parse: (input) => parse(tokenize(input)),
  parseExpr,
};
