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
} = require("./identifiers");
const { peek } = require("./utilities");
const { ArithReadInputError } = require("./errors");

const tokenize = (input) => {
  let pos = 0;
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
  };

  const skipComment = () => {
    readWhile((ch) => ch !== "\n");
    next();
  };
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
const createNumberToken = (value) => {
  return {
    type: "Number",
    value,
  };
};

const createIdentifierToken = (value) => {
  return {
    type: "IDENTIFIER",
    value,
  };
};

const createParenToken = (value) => {
  return {
    type: "PAREN",
    value,
  };
};

const createStringToken = (value) => {
  return {
    type: "STRING",
    value,
  };
};

module.exports = { tokenize };
