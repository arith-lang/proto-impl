const { tokenize } = require("../src/tokenize");

describe("Tokenize the input stream", () => {
  it("Should return an empty array", () => {
    expect(Array.isArray(tokenize(""))).toBe(true);
  });

  it("Should correctly tokenize a single digit", () => {
    const input = "2";
    const result = [
      {
        type: "DECIMAL",
        value: "2",
        end: 2,
        line: 1,
        start: 1,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize a multi-digit number", () => {
    const input = "249102";
    const result = [
      {
        type: "DECIMAL",
        value: "249102",
        end: 7,
        line: 1,
        start: 1,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize a floating-point number", () => {
    const input = "31.1415";
    const result = [
      {
        type: "DECIMAL",
        value: "31.1415",
        end: 8,
        line: 1,
        start: 1,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should throw an error on malformed numeric input", () => {
    expect(() => {
      tokenize("389ss9");
    }).toThrow();

    expect(() => {
      tokenize("3.227dd");
    }).toThrow();

    expect(() => {
      tokenize("842.888888.");
    }).toThrow();
  });

  it("Should correctly tokenize a string of letters as an identifier", () => {
    const input = "abcdefg";
    const result = [
      {
        type: "IDENTIFIER",
        value: "abcdefg",
        end: 7,
        line: 1,
        start: 0,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should tokenize a string beginning with an underscore as an identifier", () => {
    const input = "_abcdefg";
    const result = [
      {
        type: "IDENTIFIER",
        value: "_abcdefg",
        end: 8,
        line: 1,
        start: 0,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should tokenize a string beginning with a dollar sign as an identifier", () => {
    const input = "$abcdefg";
    const result = [
      {
        type: "IDENTIFIER",
        value: "$abcdefg",
        end: 8,
        line: 1,
        start: 0,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should tokenize a string starting with a valid beginning character and containing valid special characters as an identifier", () => {
    const input = "_-$%&!?*+/>^<";
    const result = [
      {
        type: "IDENTIFIER",
        value: "_-$%&!?*+/>^<",
        end: 13,
        line: 1,
        start: 0,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize a punctuation mark", () => {
    const input = "'";
    const result = [
      { type: "PUNC", value: "'", end: 1, line: 1, start: 0 },
    ];
    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize a punctuation mark followed by an identifier", () => {
    const input = "'symbol";
    const result = [
      { type: "PUNC", value: "'", end: 1, line: 1, start: 0 },
      {
        type: "IDENTIFIER",
        value: "symbol",
        end: 7,
        line: 1,
        start: 1,
      },
    ];
    expect(tokenize(input)).toEqual(result);
  });

  it("Should throw an error when an identifier contains invalid characters", () => {
    expect(() => {
      tokenize("_#");
    }).toThrow();
  });

  it("Should throw an error when an identifier starts with a number", () => {
    expect(() => {
      tokenize("12abc");
    }).toThrow();
  });

  it("Should correctly tokenize a string literal", () => {
    const input = '"This is a string"';
    const result = [
      {
        type: "STRING",
        value: "This is a string",
        end: 18,
        line: 1,
        start: 2,
      },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize the next token after a string literal", () => {
    const input = '"A string" 3.14';
    const result = [
      {
        type: "STRING",
        value: "A string",
        end: 10,
        line: 1,
        start: 2,
      },
      { type: "DECIMAL", value: "3.14", end: 16, line: 1, start: 12 },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize consecutive (not nested) expressions", () => {
    const input = `
      "Hello"
      #t
      (add 2 3)
    `;

    const result = [
      { type: "STRING", value: "Hello", end: 12, line: 2, start: 7 },
      { type: "KEYWORD", value: "#t", end: 7, line: 3, start: 5 },
      { type: "PAREN", value: "(", end: 6, line: 4, start: 5 },
      { type: "IDENTIFIER", value: "add", end: 9, line: 4, start: 6 },
      { type: "DECIMAL", value: "2", line: 4, start: 10, end: 11 },
      { type: "DECIMAL", value: "3", line: 4, start: 12, end: 13 },
      { type: "PAREN", value: ")", line: 4, start: 13, end: 14 },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it("Should correctly tokenize a define expression", () => {
    const input = "(define x 3)";

    const result = [
      { type: "PAREN", value: "(", end: 1, line: 1, start: 0 },
      {
        type: "KEYWORD",
        value: "define",
        end: 7,
        line: 1,
        start: 1,
      },
      { type: "IDENTIFIER", value: "x", end: 9, line: 1, start: 8 },
      { type: "DECIMAL", value: "3", end: 11, line: 1, start: 10 },
      { type: "PAREN", value: ")", end: 12, line: 1, start: 11 },
    ];

    expect(tokenize(input)).toEqual(result);
  });
});
