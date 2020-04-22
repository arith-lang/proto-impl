import { isInteger } from "./identifiers";

const tokenize = (input) => {
  const tokens = [];
  let i = 0;

  while (i < input.length) {
    const current = input[i];

    if (isInteger(current)) {
      let value = current;
      let j = 1;

      while (isInteger(input[i + j])) {
        value += input[i + j];
        j += 1;
      }
      tokens.push(createIntegerToken(value));
      i += j + 1;
      continue;
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

export { tokenize };
