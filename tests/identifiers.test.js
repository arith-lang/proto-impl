const { isInteger } = require("../src/identifiers");

describe("Token type helpers", () => {
  it("should correctly identify an integer", () => {
    const input = "123";

    expect(isInteger(input)).toBe(true);
  });
});
