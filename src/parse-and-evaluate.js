const { pipe } = require("./utilities");
const { tokenize } = require("./tokenize");
const { parse } = require("./parse");
const { evaluate } = require("./evaluate");

const parseAndEvaluate = pipe(tokenize, parse, evaluate);

export { parseAndEvaluate };
