const { transpile } = require("../src/transpile");
const { setEnv } = require("../src/environment");

describe("Transpile to JavaScript", () => {
  it("Should emit an integer literal", () => {
    const ast = {
      type: "IntegerLiteral",
      value: 17,
    };

    const code = "17";

    expect(transpile(ast)).toEqual(code);
  });

  it("Should emit a float literal", () => {
    const ast = {
      type: "FloatLiteral",
      value: 51.225,
    };

    expect(transpile(ast)).toEqual("51.225");
  });

  it("Should emit an identifier name", () => {
    const ast = { type: "Identifier", name: "x" };
    const env = setEnv({ x: 5 });

    expect(transpile(ast, env)).toEqual("_arith_x");
  });

  it("Should be able to emit a single call expression", () => {
    const ast = {
      type: "CallExpression",
      name: "+",
      arguments: [
        { type: "IntegerLiteral", value: 2 },
        { type: "IntegerLiteral", value: 3 },
      ],
    };

    expect(transpile(ast)).toEqual("add(2, 3)");
  });

  it("Should be able to emit code for a nested call expression", () => {
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

    expect(transpile(ast)).toEqual("add(2, 3, sub(5, 4))");
  });

  it("Should be able to emit a string literal", () => {
    const ast = { type: "StringLiteral", value: "Hello" };

    expect(transpile(ast)).toEqual('"Hello"');
  });

  it("Should be able to emit a boolean literal", () => {
    const ast = { type: "BooleanLiteral", value: false };

    expect(transpile(ast)).toEqual("false");
  });

  it.skip("Should properly transpile a keyword expression", () => {
    const ast = {
      type: "KeywordExpression",
      name: "if",
      arguments: [
        { type: "BooleanLiteral", value: true },
        { type: "StringLiteral", value: "This one" },
        { type: "StringLiteral", value: "Not this one" },
      ],
    };

    expect(transpile(ast)).toEqual(
      'ifExpr(true, "This one", "Not this one")',
    );
  });
});
