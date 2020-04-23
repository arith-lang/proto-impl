const { evaluate } = require("../src/evaluate");

describe("AST Evaluator", () => {
  it("Should return the value of a primitive integer literal", () => {
    const ast = { type: "IntegerLiteral", value: 10 };

    expect(evaluate(ast)).toBe(10);
  });

  it("Should return zero", () => {
    const ast = { type: "IntegerLiteral", value: 0 };

    expect(evaluate(ast)).toBe(0);
  });

  it("Should return the value of a primitive float literal", () => {
    const ast = { type: "FloatLiteral", value: 3.14159 };

    expect(evaluate(ast)).toBe(3.14159);
  });
});
