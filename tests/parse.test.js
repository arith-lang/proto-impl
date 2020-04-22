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
});
