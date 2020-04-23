const {
  isInteger,
  isFloat,
  isLetter,
  isValidSymbol,
  isWhitespace,
  isPeriod,
  isUnderscore,
  isDollarSign,
  isComma,
  isOpeningParen,
  isClosingParen,
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

      // separators can include periods
      if (!isPeriod(input[i + j])) {
        if (isInteger(value)) {
          tokens.push(createIntegerToken(value));
          i += j;
          continue;
        } else {
          throw new SyntaxError(`Invalid symbol ${value}`);
        }

        // continue getting input string to check if valid float
      } else {
        value += input[i + j];
        j += 1;

        while (
          !isSeparator(input[i + j]) &&
          !isEndOfInput(input, i + j)
        ) {
          value += input[i + j];
          j += 1;
        }

        if (isFloat(value)) {
          tokens.push(createFloatToken(value));
          i += j;
          continue;
        } else {
          throw new SyntaxError(`Invalid symbol ${value}`);
        }
      }
    } else {
      throw new SyntaxError(`${current} is not a valid symbol`);
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
    value: symbol,
  };
};

module.exports = { tokenize };
