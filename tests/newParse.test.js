const { parse, parseExpr } = require("../src/newParse");
const { tokenize } = require("../src/tokenize");

describe("The parser function", () => {
  it("Should return a program with a node the type of NumericLiteral for a program consisting of one number token", () => {
    const input = `1`;
    const ast = {
      type: "Program",
      body: [
        {
          type: "NumericLiteral",
          value: "1",
          start: {
            line: 1,
            col: 1,
          },
          end: {
            line: 1,
            col: 2,
          },
        },
      ],
      start: {
        line: 1,
        col: 1,
      },
      end: {
        line: 1,
        col: 2,
      },
    };
    expect(parse(tokenize(input))).toEqual(ast);
  });

  it("Should return a NumericLiteral node when parsing a number token", () => {
    const input = `3.1415`;
    const ast = {
      type: "NumericLiteral",
      value: "3.1415",
      start: {
        line: 1,
        col: 1,
      },
      end: {
        line: 1,
        col: 7,
      },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should return a StringLiteral node when parsing a string token", () => {
    const input = `"hello"`;
    const ast = {
      type: "StringLiteral",
      value: "hello",
      start: { line: 1, col: 2 },
      end: { line: 1, col: 7 },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should return an Identifier node when parsing a literal identifier", () => {
    const input = `add`;
    const ast = {
      type: "Identifier",
      value: "add",
      start: { line: 1, col: 1 },
      end: { line: 1, col: 4 },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should return a BooleanLiteral node when parsing a boolean keyword token", () => {
    const input = `true`;
    const ast = {
      type: "BooleanLiteral",
      value: "true",
      start: { line: 1, col: 1 },
      end: { line: 1, col: 5 },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should return a NilLiteral node when parsing a nil keyword token", () => {
    const input = `nil`;
    const ast = {
      type: "NilLiteral",
      value: "nil",
      start: { line: 1, col: 1 },
      end: { line: 1, col: 4 },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });
});
