const { parse } = require("./parse");

const parseProgram = (tokens) => {
  return {
    type: "Program",
    body: [],
  };
};

module.exports = { parseProgram };
