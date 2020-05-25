const { compile } = require("../src/compile");
const { setEnv } = require("../src/environment");

describe.skip("Transpile to JavaScript", () => {
  it("Should emit a decimal literal constructor", () => {
    const input = `17`;
    const code = "__arith__.decimal(17)";

    expect(compile(input)).toEqual(code);
  });

  it("Should emit a float literal", () => {
    const input = `51.225`;
    console.log(compile(input));

    expect(compile(input)).toEqual();
  });

  it.skip("Should emit an identifier name", () => {
    const ast = { type: "Identifier", name: "x" };

    expect(compile(ast)).toEqual("_arith_x");
  });

  it.skip("Should be able to emit a single call expression", () => {
    const ast = {
      type: "CallExpression",
      name: "+",
      arguments: [
        { type: "IntegerLiteral", value: 2 },
        { type: "IntegerLiteral", value: 3 },
      ],
    };

    expect(compile(ast)).toEqual("add(2, 3)");
  });

  it.skip("Should be able to emit code for a nested call expression", () => {
    const ast = {
      type: "CallExpression",
      name: "+",
      arguments: [
        { type: "IntegerLiteral", value: 2 },
        { type: "IntegerLiteral", value: 3 },
        {
          type: "CallExpression",
          name: "-",
          arguments: [
            { type: "IntegerLiteral", value: 5 },
            { type: "IntegerLiteral", value: 4 },
          ],
        },
      ],
    };

    expect(compile(ast)).toEqual("add(2, 3, sub(5, 4))");
  });

  it.skip("Should be able to emit a string literal", () => {
    const ast = { type: "StringLiteral", value: "Hello" };

    expect(compile(ast)).toEqual('"Hello"');
  });

  it.skip("Should be able to emit a boolean literal", () => {
    const ast = { type: "BooleanLiteral", value: false };

    expect(compile(ast)).toEqual("false");
  });

  it.skip("Should properly compile a keyword expression", () => {
    const ast = {
      type: "KeywordExpression",
      name: "if",
      arguments: [
        { type: "BooleanLiteral", value: true },
        { type: "StringLiteral", value: "This one" },
        { type: "StringLiteral", value: "Not this one" },
      ],
    };

    expect(compile(ast)).toEqual(
      'ifExpr(true, "This one", "Not this one")',
    );
  });
});
