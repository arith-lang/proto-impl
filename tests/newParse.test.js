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
});
