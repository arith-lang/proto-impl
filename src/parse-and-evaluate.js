const { pipe } = require("./utilities");
const { tokenize } = require("./tokenize");
const { parse } = require("./parse");
const { evaluate } = require("./evaluate");
const { transpile } = require("./transpile");

const tokenizeAndParse = pipe(tokenize, parse);

const parseAndEvaluate = pipe(tokenizeAndParse, evaluate);

const parseAndTranspile = pipe(tokenizeAndParse, transpile);

module.exports = {
  parseAndEvaluate,
  parseAndTranspile,
};
