const { parse } = require("../src/parse");
const { evaluate } = require("../src/evaluate");

describe("Lambda expression tests", () => {
  it("Should correctly parse a lambda expression", () => {
    const tokens = [
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "lambda" },
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "x" },
      { type: "PAREN", value: ")" },
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "+" },
      { type: "IDENTIFIER", value: "x" },
      { type: "INTEGER", value: 1 },
      { type: "PAREN", value: ")" },
      { type: "PAREN", value: ")" },
    ];

    const ast = {
      type: "LambdaExpression",
      name: "lambda1",
      params: [{ type: "FunctionParameter", name: "x" }],
      body: {
        type: "CallExpression",
        name: "+",
        arguments: [
          { type: "Identifier", name: "x" },
          { type: "IntegerLiteral", value: 1 },
        ],
      },
    };

    expect(parse(tokens)).toEqual(ast);
  });
});
