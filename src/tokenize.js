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
const { peek } = require("./utilities");
const { ArithReadInputError, ArithSyntaxError } = require("./errors");

const tokenize = (input) => {
  let pos = -1;
  let line = 1;
  let col = 0;

  const next = () => {
    let ch = input.charAt(pos);
    if (ch == "\n") {
      line++;
      col = 0;
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
      col,
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

  const readWhile = (predicate) => {
    let str = "";
    while (!isEndOfInput(input, pos) && predicate(peek(input))) {
      str += next();
    }
    return str;
  };

  const skipComment = () => {
    readWhile((ch) => ch !== "\n");
    next();
  };

  const readNumber = () => {
    let tok = readWhile((c) => !isSeparator(c));
    if (isInteger(tok) || isFloat(tok)) {
      return createToken("NUMBER", tok);
    } else {
      throw new ArithSyntaxError(
        `Cannot start an identifier with a number at line ${line}, col ${col}`,
      );
    }
    die("Could not read input");
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
    if (isPlusOrMinus(char) || isHash(char) || isDigit(char)) {
      return readNumber();
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

// const tokenize = (input) => {
//   const tokens = [];
//   let i = 0;

//   while (i < input.length) {
//     const current = input[i];
//     // ; starts a comment - skip to end of line
//     if (isSemicolon(current)) {
//       while (!isEndOfLine(input[i])) {
//         i += 1;
//       }
//       continue;
//     }

//     // skip whitespace
//     if (isWhitespace(current)) {
//       i += 1;
//       continue;

//       // read numeric tokens
//     } else if (isInteger(current)) {
//       let value = current;
//       let j = 1;

//       // get the whole string of characters starting with the first int
//       while (
//         !isSeparator(input[i + j]) &&
//         !isEndOfInput(input, i + j)
//       ) {
//         value += input[i + j];
//         j += 1;
//       }

//       if (isInteger(value)) {
//         tokens.push(createIntegerToken(value));
//       } else if (isFloat(value)) {
//         tokens.push(createFloatToken(value));
//       } else {
//         throw new SyntaxError(`Invalid identifier ${value}`);
//       }

//       i += j;
//       continue;

//       // valid first character for an identifier
//     } else if (isLetter(current) || isValidSpecialChar(current)) {
//       // check for valid identifier token
//       let j = 1;
//       let value = current;

//       while (
//         !isSeparator(input[i + j]) &&
//         !isEndOfInput(input, i + j)
//       ) {
//         value += input[i + j];

//         if (
//           !isLetter(input[i + j]) &&
//           !isInteger(input[i + j]) &&
//           !isValidSpecialChar(input[i + j])
//         ) {
//           throw new SyntaxError(`${value} is not a valid identifier`);
//         }
//         j += 1;
//       }

//       if (value === "true" || value === "false") {
//         tokens.push(createBooleanToken(value));
//       } else {
//         tokens.push(createIdentifierToken(value));
//       }

//       i += j;
//       continue;

//       // parenthesis tokens for call expressions
//     } else if (isParen(current)) {
//       tokens.push(createParenToken(current));

//       // detect string literals and tokenize
//     } else if (isQuote(current)) {
//       i += 1;
//       let value = "";

//       while (!isQuote(input[i])) {
//         value += input[i];
//         i += 1;
//       }

//       tokens.push(createStringToken(value));
//     } else {
//       // Is not a valid token type
//       throw new SyntaxError(`${current} is not a valid token`);
//     }

//     i += 1;
//   }

//   return tokens;
// };

// token creator helpers

module.exports = { tokenize };
