const { parse, parseProgram } = require("../src/parse");

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

  it("Should return an AST for a basic call expression", () => {
    const tokens = [
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "add" },
      { type: "FLOAT", value: 1.5 },
      { type: "FLOAT", value: 3.2 },
      { type: "PAREN", value: ")" },
    ];

    const ast = {
      type: "CallExpression",
      name: "add",
      arguments: [
        { type: "FloatLiteral", value: 1.5 },
        { type: "FloatLiteral", value: 3.2 },
      ],
    };

    expect(parse(tokens)).toEqual(ast);
  });

  it("Should return an AST for a nested call expression", () => {
    const tokens = [
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "add" },
      { type: "INTEGER", value: 2 },
      { type: "INTEGER", value: 3 },
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "subtract" },
      { type: "INTEGER", value: 4 },
      { type: "INTEGER", value: 2 },
      { type: "PAREN", value: ")" },
      { type: "PAREN", value: ")" },
    ];

    const ast = {
      type: "CallExpression",
      name: "add",
      arguments: [
        { type: "IntegerLiteral", value: 2 },
        { type: "IntegerLiteral", value: 3 },
        {
          type: "CallExpression",
          name: "subtract",
          arguments: [
            { type: "IntegerLiteral", value: 4 },
            { type: "IntegerLiteral", value: 2 },
          ],
        },
      ],
    };

    expect(parse(tokens)).toEqual(ast);
  });

  it("Should correctly parse a string token into a StringLiteral node", () => {
    const tokens = [{ type: "STRING", value: "A string" }];

    const ast = {
      type: "StringLiteral",
      value: "A string",
    };
  });

  it("Should correctly return an AST for a call expression using a string argument", () => {
    const tokens = [
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "print" },
      { type: "STRING", value: "hello" },
      { type: "PAREN", value: ")" },
    ];

    const ast = {
      type: "CallExpression",
      name: "print",
      arguments: [{ type: "StringLiteral", value: "hello" }],
    };

    expect(parse(tokens)).toEqual(ast);
  });

  it("Should correctly parse a boolean token into a BooleanLiteral node", () => {
    const tokens = [{ type: "BOOLEAN", value: false }];

    const ast = {
      type: "BooleanLiteral",
      value: false,
    };

    expect(parse(tokens)).toEqual(ast);
  });

  it("Should parse token stream as a program with a body of expressions", () => {
    const tokens = [];

    const ast = { type: "Program", body: [] };

    expect(parseProgram(tokens)).toEqual(ast);
  });

  it("Should correctly parse multiple, consecutive (not nested) expressions as part of the program body", () => {
    const tokens = [
      { type: "STRING", value: "Hello" },
      { type: "BOOLEAN", value: true },
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "add" },
      { type: "INTEGER", value: 2 },
      { type: "INTEGER", value: 3 },
      { type: "PAREN", value: ")" },
    ];

    const ast = {
      type: "Program",
      body: [
        { type: "StringLiteral", value: "Hello" },
        { type: "BooleanLiteral", value: true },
        {
          type: "CallExpression",
          name: "add",
          arguments: [
            { type: "IntegerLiteral", value: 2 },
            { type: "IntegerLiteral", value: 3 },
          ],
        },
      ],
    };

    expect(parseProgram(tokens)).toEqual(ast);
  });

  it("Should correctly parse a keyword expression", () => {
    const tokens = [
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "if" },
      { type: "BOOLEAN", value: true },
      { type: "STRING", value: "This one" },
      { type: "STRING", value: "Not this one" },
      { type: "PAREN", value: ")" },
    ];

    const ast = {
      type: "KeywordExpression",
      name: "if",
      arguments: [
        { type: "BooleanLiteral", value: true },
        { type: "StringLiteral", value: "This one" },
        { type: "StringLiteral", value: "Not this one" },
      ],
    };

    expect(parse(tokens)).toEqual(ast);
  });
});
