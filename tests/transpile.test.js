const { transpile } = require("../src/transpile");

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
    const ast = {
      type: "Identifier",
      name: "x",
    };

    expect(transpile(ast)).toEqual("x");
  });

  it("Should be able to emit a single call expression", () => {
    const ast = {
      type: "CallExpression",
      name: "add",
      arguments: [
        { type: "IntegerLiteral", value: 2 },
        { type: "IntegerLiteral", value: 3 },
      ],
    };

    expect(transpile(ast)).toEqual("add(2, 3);");
  });
});
