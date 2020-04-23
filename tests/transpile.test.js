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
});
