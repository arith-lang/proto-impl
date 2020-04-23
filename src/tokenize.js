const {
  isInteger,
  isLetter,
  isValidSymbol,
  isWhitespace,
  isPeriod,
  isUnderscore,
  isDollarSign,
  isComma,
  isClosingParen,
} = require("./identifiers");

const tokenize = (input) => {
  const tokens = [];
  let i = 0;

  while (i < input.length) {
    const current = input[i];

    if (isWhitespace(current)) {
      i += 1;
      continue;
    } else if (isInteger(current)) {
      let value = current;
      let j = 1;

      while (isInteger(input[i + j])) {
        value += input[i + j];
        j += 1;
      }

      if (!isPeriod(input[i + j])) {
        tokens.push(createIntegerToken(value));
        i += j;
        continue;
      } else {
        value += input[i + j];
        j += 1;
        if (isInteger(input[i + j])) {
          while (isInteger(input[i + j])) {
            value += input[i + j];
            j += 1;
          }

          tokens.push(createFloatToken(value));
          i += j;
          continue;
        } else {
          throw new SyntaxError(`${input[i + j]} is invalid`);
        }
      }
    } else {
      throw new SyntaxError(`${current} is not valid`);
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
