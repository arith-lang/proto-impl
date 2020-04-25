const { pipe } = require("./utilities");
const { tokenize } = require("./tokenize");
const { parse, parseProgram } = require("./parse");
const { evaluate } = require("./evaluate");
const { transpile } = require("./transpile");

const tokenizeAndParse = pipe(tokenize, parse);

const tokenizeAndParseProgram = pipe(tokenize, parseProgram);

const parseAndEvaluate = pipe(tokenizeAndParse, evaluate);

const parseAndTranspile = pipe(tokenizeAndParse, transpile);

module.exports = {
  parseAndEvaluate,
  parseAndTranspile,
  tokenizeAndParseProgram,
};
