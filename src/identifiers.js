// constants
const INTEGER = /^[+-]?[0-9]+$/;
const WHITESPACE = /\s+/;

// token identifiers
const isInteger = (char) => INTEGER.test(char);

const isWhitespace = (char) => WHITESPACE.test(char);

const isComma = (char) => char === ",";

const isPeriod = (char) => char === ".";

const isOpeningParen = (char) => char === "(";

const isClosingParen = (char) => char === ")";

const isParen = (char) =>
  isOpeningParen(char) || isClosingParen(char);

module.exports = {
  isInteger,
  isWhitespace,
  isComma,
  isPeriod,
  isOpeningParen,
  isClosingParen,
  isParen,
};
