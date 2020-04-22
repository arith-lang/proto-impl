import { evaluate } from "../src/evaluate";

describe("AST Evaluator", () => {
  it("Should return the value of a primitive integer literal", () => {
    const ast = { type: "IntegerLiteral", value: 10 };

    expect(evaluate(ast)).toBe(10);
  });
});
