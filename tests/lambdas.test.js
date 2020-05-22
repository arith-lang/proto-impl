const { parse } = require("../src/parse");
const { evaluate, evaluateProgram } = require("../src/evaluate");
const { transpile } = require("../src/transpile");

describe("Lambda expression tests", () => {
  it.skip("Should correctly transpile a lambda function", () => {
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

    const result =
      "(function(_arith_x) { return add(_arith_x, 1) })\n";

    expect(transpile(ast)).toEqual(result);
  });
});
