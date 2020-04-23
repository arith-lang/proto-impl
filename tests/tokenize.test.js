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

  it("Should correctly tokenize multiple integers separated by whitespace", () => {
    const input = "2 22 242";

    const result = [
      {
        type: "INTEGER",
        value: 2,
      },
      {
        type: "INTEGER",
        value: 22,
      },
      {
        type: "INTEGER",
        value: 242,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });
});
