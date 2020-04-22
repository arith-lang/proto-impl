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
});
