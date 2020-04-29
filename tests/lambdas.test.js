const { parse } = require("../src/parse");
const { evaluate, evaluateProgram } = require("../src/evaluate");

describe("Lambda expression tests", () => {
  let lambdas = 0;

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

  it("Should correctly parse a call expression invoking a lambda", () => {
    const tokens = [
      { type: "PAREN", value: "(" },
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
      { type: "INTEGER", value: 10 },
      { type: "PAREN", value: ")" },
    ];

    const ast = {
      type: "CallExpression",
      lambda: {
        type: "LambdaExpression",
        params: [{ type: "FunctionParameter", name: "x" }],
        body: {
          type: "CallExpression",
          name: "+",
          arguments: [
            { type: "Identifier", name: "x" },
            { type: "IntegerLiteral", value: 1 },
          ],
        },
      },
      name: "lambda",
      arguments: [{ type: "IntegerLiteral", value: 10 }],
    };

    expect(parse(tokens)).toEqual(ast);
  });

  it("Should correctly parse a definition expression with a lambda value", () => {
    const tokens = [
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "define" },
      { type: "IDENTIFIER", value: "add2" },
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "lambda" },
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "x" },
      { type: "IDENTIFIER", value: "y" },
      { type: "PAREN", value: ")" },
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "+" },
      { type: "IDENTIFIER", value: "x" },
      { type: "IDENTIFIER", value: "y" },
      { type: "PAREN", value: ")" },
      { type: "PAREN", value: ")" },
      { type: "PAREN", value: ")" },
    ];

    const ast = {
      type: "DefinitionExpression",
      name: "add2",
      value: {
        type: "LambdaExpression",
        params: [
          { type: "FunctionParameter", name: "x" },
          { type: "FunctionParameter", name: "y" },
        ],
        body: {
          type: "CallExpression",
          name: "+",
          arguments: [
            { type: "Identifier", name: "x" },
            { type: "Identifier", name: "y" },
          ],
        },
      },
    };

    expect(parse(tokens)).toEqual(ast);
  });

  it("Should correctly parse defining the identity function", () => {
    const tokens = [
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "define" },
      { type: "IDENTIFIER", value: "identity" },
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "lambda" },
      { type: "PAREN", value: "(" },
      { type: "IDENTIFIER", value: "x" },
      { type: "PAREN", value: ")" },
      { type: "IDENTIFIER", value: "x" },
      { type: "PAREN", value: ")" },
      { type: "PAREN", value: ")" },
    ];

    const ast = {
      type: "DefinitionExpression",
      name: "identity",
      value: {
        type: "LambdaExpression",
        params: [{ type: "FunctionParameter", name: "x" }],
        body: { type: "Identifier", name: "x" },
      },
    };

    expect(parse(tokens)).toEqual(ast);
  });

  it("Should return a function when a lambda definition is evaluated", () => {
    const ast = {
      type: "DefinitionExpression",
      name: "identity",
      value: {
        type: "LambdaExpression",
        params: [{ type: "FunctionParameter", name: "x" }],
        body: { type: "Identifier", name: "x" },
      },
    };

    const result = evaluate(ast);

    expect(typeof result).toBe("function");
  });

  it("Should correctly evaluate the identity function", () => {
    const ast = {
      type: "Program",
      body: [
        {
          type: "DefinitionExpression",
          name: "identity",
          value: {
            type: "LambdaExpression",
            params: [{ type: "FunctionParameter", name: "x" }],
            body: { type: "Identifier", name: "x" },
          },
        },
        {
          type: "CallExpression",
          name: "identity",
          arguments: [{ type: "IntegerLiteral", value: 10 }],
        },
      ],
    };

    expect(evaluateProgram(ast)).toEqual(10);
  });

  it("Should correctly evaluate a function with a call expression body", () => {
    const ast = {
      type: "Program",
      body: [
        {
          type: "DefinitionExpression",
          name: "add2",
          value: {
            type: "LambdaExpression",
            params: [
              { type: "FunctionParameter", name: "x" },
              { type: "FunctionParameter", name: "y" },
            ],
            body: {
              type: "CallExpression",
              name: "+",
              arguments: [
                { type: "Identifier", name: "x" },
                { type: "Identifier", name: "y" },
              ],
            },
          },
        },
        {
          type: "CallExpression",
          name: "add2",
          arguments: [
            { type: "IntegerLiteral", value: 2 },
            { type: "IntegerLiteral", value: 3 },
          ],
        },
      ],
    };

    expect(evaluateProgram(ast)).toEqual(5);
  });

  it.skip("Should correctly evaluate a call expression immediately invoking a lambda", () => {
    const ast = {
      type: "CallExpression",
      lambda: {
        type: "LambdaExpression",
        params: [{ type: "FunctionParameter", name: "x" }],
        body: {
          type: "CallExpression",
          name: "+",
          arguments: [
            { type: "Identifier", name: "x" },
            { type: "IntegerLiteral", value: 1 },
          ],
        },
      },
      name: "lambda",
      arguments: [{ type: "IntegerLiteral", value: 10 }],
    };

    expect(evaluate(ast)).toEqual(11);
  });
});
