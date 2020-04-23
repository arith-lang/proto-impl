// constants
const INTEGER = /^[+-]?[0-9]+$/;
const WHITESPACE = /\s+/;
const LETTER = /[A-Za-z]/;
const VALID_SYMBOLS = [
  "_",
  "-",
  "$",
  "%",
  "&",
  "!",
  "?",
  "*",
  "+",
  "/",
  "\\",
  ">",
  "<",
  "^",
];

// token identifiers
const isInteger = (char) => INTEGER.test(char);

const isLetter = (char) => LETTER.test(char);

const isValidSymbol = (char) => VALID_SYMBOLS.includes(char);

const isWhitespace = (char) => WHITESPACE.test(char);

const isComma = (char) => char === ",";

const isPeriod = (char) => char === ".";

const isUnderscore = (char) => char === "_";

const isDollarSign = (char) => char === "$";

const isOpeningParen = (char) => char === "(";

const isClosingParen = (char) => char === ")";

const isParen = (char) =>
  isOpeningParen(char) || isClosingParen(char);

module.exports = {
  isInteger,
  isLetter,
  isValidSymbol,
  isWhitespace,
  isComma,
  isPeriod,
  isUnderscore,
  isDollarSign,
  isOpeningParen,
  isClosingParen,
  isParen,
};
