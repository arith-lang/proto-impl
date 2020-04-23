// constants
const INTEGER = /^[0-9]+$/;
const WHITESPACE = /\s+/;

// token identifiers
const isInteger = (char) => INTEGER.test(char);

const isWhitespace = (char) => WHITESPACE.test(char);

module.exports = { isInteger, isWhitespace };
