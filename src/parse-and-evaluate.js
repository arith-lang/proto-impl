const { pipe } = require("./utilities");
const { tokenize } = require("./tokenize");
const { parse } = require("./parse");
const { evaluate } = require("./evaluate");
const { transpile } = require("./transpile");

const parseAndEvaluate = pipe(tokenize, parse, evaluate);

const tokenizeAndParse = pipe(tokenize, parse);

const parseAndTranspile = pipe(tokenizeAndParse, transpile);

module.exports = {
  parseAndEvaluate,
  tokenizeAndParse,
  parseAndTranspile,
};
