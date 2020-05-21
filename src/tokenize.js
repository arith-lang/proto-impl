const {
  isInteger,
  isFloat,
  isLetter,
  isValidSpecialChar,
  isWhitespace,
  isPeriod,
  isUnderscore,
  isDollarSign,
  isComma,
  isParen,
  isSeparator,
  isEndOfInput,
  isDoubleQuote,
  isSemicolon,
  isEndOfLine,
  isKeyword,
  isPunctuation,
  isHash,
  isPlusOrMinus,
  isDigit,
} = require("./identifiers");
const { lookahead } = require("./utilities");
const { ArithReadInputError, ArithSyntaxError } = require("./errors");

const tokenize = (input) => {
  let pos = -1;
  let line = 1;
  let col = 0;

  const next = (isString) => {
    let ch = input.charAt(pos);
    if (ch == "\n") {
      if (!isString) {
        line++;
        col = 0;
      }
    } else {
      col++;
    }
    pos++;
    return ch;
  };

  const die = (msg) => {
    throw new ArithReadInputError(
      `${msg} at line ${line}, col ${col}`,
    );
  };

  const createToken = (type, value) => {
    return {
      type,
      value,
      line,
      start: col - value.length - 1,
      end: col - 1,
    };
  };

  const isIdStart = (char) => {
    return isLetter(char) || isValidSpecialChar(char);
  };

  const isIdChar = (char) => {
    return (
      isLetter(char) || isInteger(char) || isValidSpecialChar(char)
    );
  };

  const readWhile = (predicate, isString) => {
    let str = "";
    while (
      !isEndOfInput(input, pos - 1) &&
      predicate(lookahead(input, pos))
    ) {
      str += next(isString);
    }
    return str;
  };

  const skipComment = () => {
    readWhile((ch) => ch !== "\n");
    next();
  };

  const readNumber = (char) => {
    let tok = char + readWhile((c) => !isSeparator(c));
    if (isInteger(tok) || isFloat(tok)) {
      return createToken("NUMBER", tok);
    } else {
      if (isPlusOrMinus(tok[0])) {
        return readIdent(tok);
      }
      throw new ArithSyntaxError(
        `Invalid numeric literal at line ${line}, col ${col}`,
      );
    }
    die("Input error");
  };

  const readString = () => {
    const tok = readWhile((c) => !isDoubleQuote(c), true);
    next(); // skip closing quotation mark
    return createToken("STRING", tok);
  };

  const readIdent = (char) => {
    const tok = char + readWhile(isIdChar);
    return createToken(
      isKeyword(tok) ? "KEYWORD" : "IDENTIFIER",
      tok,
    );
  };

  const read = () => {
    if (isWhitespace(input[pos])) {
      readWhile(isWhitespace);
      return null;
    }
    if (isEndOfInput(input, pos)) {
      return null;
    }
    let char = next();
    if (isSemicolon(char)) {
      skipComment();
      return null;
    }
    if (isDigit(char)) {
      return readNumber(char);
    }
    if (isPlusOrMinus(char)) {
      if (
        isHash(lookahead(input, pos)) ||
        isDigit(lookahead(input, pos))
      ) {
        return readNumber(char);
      }
    }
    if (isHash(char)) {
      if (isDigit(lookahead(input, pos))) {
        return readNumber(char);
      } else if (isIdStart(lookahead(input, pos))) {
        return readIdent(char);
      } else {
        die(`Invalid input ${char} (${line}:${col})`);
      }
    }
    if (isDoubleQuote(char)) {
      return readString();
    }
    if (isIdStart(char)) {
      return readIdent(char);
    }
    if (isParen(char)) {
      return createToken("PAREN", char);
    }
    if (isPunctuation(char)) {
      return createToken("PUNC", char);
    }
  };

  let tokens = [];
  while (!isEndOfInput(input, pos)) {
    let tok = read();
    if (tok) {
      tokens.push(tok);
    }
  }
  return tokens;
};

module.exports = { tokenize };
