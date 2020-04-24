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

  it("Should return a node with the type of Identifier for identifier tokens", () => {
    const tokens = [
      {
        type: "IDENTIFIER",
        value: "x",
      },
    ];

    const ast = { type: "Identifier", name: "x" };

    expect(parse(tokens)).toEqual(ast);
  });

  it("Should return an AST for a basic call expression", () => {
    const tokens = [
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "add" },
      { type: "INTEGER", value: 2 },
      { type: "INTEGER", value: 3 },
      { type: "PAREN", value: ")" },
    ];

    const ast = {
      type: "CallExpression",
      name: "add",
      arguments: [
        { type: "IntegerLiteral", value: 2 },
        { type: "IntegerLiteral", value: 3 },
      ],
    };

    expect(parse(tokens)).toEqual(ast);
  });

  it("Should return an AST for a nested call expression", () => {
    const tokens = [
      { type: "Parenthesis", value: "(" },
      { type: "Name", value: "add" },
      { type: "Number", value: 2 },
      { type: "Number", value: 3 },
      { type: "Parenthesis", value: "(" },
      { type: "Name", value: "subtract" },
      { type: "Number", value: 4 },
      { type: "Number", value: 2 },
      { type: "Parenthesis", value: ")" },
      { type: "Parenthesis", value: ")" },
    ];

    const ast = {
      type: "CallExpression",
      name: "add",
      arguments: [
        { type: "NumericLiteral", value: 2 },
        { type: "NumericLiteral", value: 3 },
        {
          type: "CallExpression",
          name: "subtract",
          arguments: [
            { type: "NumericLiteral", value: 4 },
            { type: "NumericLiteral", value: 2 },
          ],
        },
      ],
    };

    expect(parse(tokens)).toEqual(ast);
  });
});
