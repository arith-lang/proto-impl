const { tokenize } = require("../src/tokenize");

describe("Tokenize the input stream", () => {
  it("Should return an empty array", () => {
    expect(Array.isArray(tokenize(""))).toBe(true);
  });

  it("Should correctly tokenize a single digit", () => {
    const input = "2";
    const result = [
      {
        type: "INTEGER",
        value: 2,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize a multi-digit number", () => {
    const input = "249102";
    const result = [
      {
        type: "INTEGER",
        value: 249102,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize a floating-point number", () => {
    const input = "31.1415";
    const result = [
      {
        type: "FLOAT",
        value: 31.1415,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });
});
