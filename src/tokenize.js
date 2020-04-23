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
    } else if (
      isLetter(current) ||
      isUnderscore(current) ||
      isDollarSign(current)
    ) {
      // check for valid identifier token
      let j = 1;
      let value = current;

      while (
        !isSeparator(input[i + j]) &&
        !isEndOfInput(input, i + j)
      ) {
        if (
          !isLetter(input[i + j]) &&
          !isInteger(input[i + j]) &&
          !isValidSpecialChar(input[i + j])
        ) {
          throw new SyntaxError(
            `${input[i + j]} is not a valid identifier`,
          );
        }
        value += input[i + j];
        j += 1;
      }

      tokens.push(createIdentifierToken(value));
      i += j;
      continue;

      // parenthesis tokens for call expressions
    } else if (isParen(current)) {
      tokens.push(createParenToken(current));
    } else {
      throw new SyntaxError(`${current} is not a valid identifier`);
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

const createIdentifierToken = (symbol) => {
  return {
    type: "IDENTIFIER",
    name: symbol,
  };
};

const createLParenToken = (paren) => {
  return {
    type: "PAREN",
    value: paren,
  };
};

module.exports = { tokenize };
