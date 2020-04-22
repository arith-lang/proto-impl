import { isInteger } from "./identifiers";
import { peek } from "./utilities";

const tokenize = (input) => {
  const tokens = [];
  let i = 0;

  while (i < input.length) {
    const current = input[i];

    // if (isInteger(current)) {
    //   ("");
    // }

    i += 1;
  }

  return tokens;
};

// token creator helpers
const createIntegerToken = (value) => {
  return {
    type: "Integer",
    value: parseInt(value),
  };
};
