const {
  isInteger,
  isFloat,
  isLetter,
  isValidSpecialChar,
  isWhitespace,
  isPeriod,
  isUnderscore,
  isDollarSign,
  isComma,
  isParen,
  isSeparator,
  isEndOfInput,
  isQuote,
} = require("./identifiers");

const tokenize = (input) => {
  const tokens = [];
  let i = 0;

  while (i < input.length) {
    const current = input[i];
    // skip whitespace
    if (isWhitespace(current)) {
      i += 1;
      continue;

      // read numeric tokens
    } else if (isInteger(current)) {
      let value = current;
      let j = 1;

      // get the whole string of characters starting with the first int
      while (
        !isSeparator(input[i + j]) &&
        !isEndOfInput(input, i + j)
      ) {
        value += input[i + j];
        j += 1;
      }

      if (isInteger(value)) {
        tokens.push(createIntegerToken(value));
      } else if (isFloat(value)) {
        tokens.push(createFloatToken(value));
      } else {
        throw new SyntaxError(`Invalid identifier ${value}`);
      }

      i += j;
      continue;

      // valid first character for an identifier
    } else if (isLetter(current) || isValidSpecialChar(current)) {
      // check for valid identifier token
      let j = 1;
      let value = current;

      while (
        !isSeparator(input[i + j]) &&
        !isEndOfInput(input, i + j)
      ) {
        value += input[i + j];

        if (
          !isLetter(input[i + j]) &&
          !isInteger(input[i + j]) &&
          !isValidSpecialChar(input[i + j])
        ) {
          throw new SyntaxError(`${value} is not a valid identifier`);
        }
        j += 1;
      }

      if (value === "true" || value === "false") {
        tokens.push(createBooleanToken(value));
      } else {
        tokens.push(createIdentifierToken(value));
      }

      i += j;
      continue;

      // parenthesis tokens for call expressions
    } else if (isParen(current)) {
      tokens.push(createParenToken(current));

      // detect string literals and tokenize
    } else if (isQuote(current)) {
      i += 1;
      let value = "";

      while (!isQuote(input[i])) {
        value += input[i];
        i += 1;
      }

      tokens.push(createStringToken(value));
    } else {
      // Is not a valid token type
      throw new SyntaxError(`${current} is not a valid token`);
    }

    i += 1;
  }

  return tokens;
};

// token creator helpers
const createIntegerToken = (value) => {
  return {
    type: "INTEGER",
    value: parseInt(value),
  };
};

const createFloatToken = (value) => {
  return {
    type: "FLOAT",
    value: parseFloat(value),
  };
};

const createIdentifierToken = (value) => {
  return {
    type: "IDENTIFIER",
    value,
  };
};

const createParenToken = (value) => {
  return {
    type: "PAREN",
    value,
  };
};

const createStringToken = (value) => {
  return {
    type: "STRING",
    value,
  };
};

const createBooleanToken = (value) => {
  return {
    type: "BOOLEAN",
    value: value === "true",
  };
};

module.exports = { tokenize };
