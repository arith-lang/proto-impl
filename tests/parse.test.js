const { parse } = require("../src/parse");

describe("The parser function", () => {
  it("Should return a node with the type of IntegerLiteral for integer tokens", () => {
    const tokens = [
      {
        type: "INTEGER",
        value: 2,
      },
    ];

    const ast = { type: "IntegerLiteral", value: 2 };

    expect(parse(tokens)).toEqual(ast);
  });

  it("Should return a node with the type of FloatLiteral for float tokens", () => {
    const tokens = [
      {
        type: "FLOAT",
        value: 210.5532,
      },
    ];

    const ast = { type: "FloatLiteral", value: 210.5532 };

    expect(parse(tokens)).toEqual(ast);
  });
});
