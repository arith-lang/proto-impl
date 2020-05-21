const { parse, parseExpr } = require("../src/newParse");
const { tokenize } = require("../src/tokenize");

describe("The parser function", () => {
  it("Should return a program with a node the type of DecimalLiteral for a program consisting of one number token", () => {
    const input = `1`;
    const ast = {
      type: "Program",
      body: [
        {
          type: "DecimalLiteral",
          value: "1",
          start: {
            line: 1,
            col: 1,
          },
          end: {
            line: 1,
            col: 2,
          },
        },
      ],
      start: {
        line: 1,
        col: 1,
      },
      end: {
        line: 1,
        col: 2,
      },
    };
    expect(parse(tokenize(input))).toEqual(ast);
  });

  it("Should return a DecimalLiteral node when parsing a number token", () => {
    const input = `3.1415`;
    const ast = {
      type: "DecimalLiteral",
      value: "3.1415",
      start: {
        line: 1,
        col: 1,
      },
      end: {
        line: 1,
        col: 7,
      },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should return a StringLiteral node when parsing a string token", () => {
    const input = `"hello"`;
    const ast = {
      type: "StringLiteral",
      value: "hello",
      start: { line: 1, col: 2 },
      end: { line: 1, col: 7 },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should return an Identifier node when parsing a literal identifier", () => {
    const input = `add`;
    const ast = {
      type: "Identifier",
      value: "add",
      start: { line: 1, col: 0 },
      end: { line: 1, col: 3 },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should return a BooleanLiteral node when parsing a boolean keyword token", () => {
    const input = `#t`;
    const ast = {
      type: "BooleanLiteral",
      value: "true",
      start: { line: 1, col: 0 },
      end: { line: 1, col: 2 },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should return a NilLiteral node when parsing a nil keyword token", () => {
    const input = `nil`;
    const ast = {
      type: "NilLiteral",
      value: "nil",
      start: { line: 1, col: 0 },
      end: { line: 1, col: 3 },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should correctly parse a simple call expression", () => {
    const input = `(+ 2 3)`;
    const ast = {
      type: "CallExpression",
      name: "+",
      arguments: [
        {
          type: "DecimalLiteral",
          value: "2",
          start: {
            line: 1,
            col: 3,
          },
          end: {
            line: 1,
            col: 4,
          },
        },
        {
          type: "DecimalLiteral",
          value: "3",
          start: {
            line: 1,
            col: 5,
          },
          end: {
            line: 1,
            col: 6,
          },
        },
      ],
      start: {
        line: 1,
        col: 1,
      },
      end: {
        line: 1,
        col: 7,
      },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should be able to correctly parse nested call expressions", () => {
    const input = `(+ 8 (- 2 3))`;
    const ast = {
      type: "CallExpression",
      name: "+",
      arguments: [
        {
          type: "DecimalLiteral",
          value: "8",
          start: {
            line: 1,
            col: 3,
          },
          end: {
            line: 1,
            col: 4,
          },
        },
        {
          type: "CallExpression",
          name: "-",
          arguments: [
            {
              type: "DecimalLiteral",
              value: "2",
              start: {
                line: 1,
                col: 8,
              },
              end: {
                line: 1,
                col: 9,
              },
            },
            {
              type: "DecimalLiteral",
              value: "3",
              start: {
                line: 1,
                col: 10,
              },
              end: {
                line: 1,
                col: 11,
              },
            },
          ],
          start: {
            line: 1,
            col: 6,
          },
          end: {
            line: 1,
            col: 12,
          },
        },
      ],
      start: {
        line: 1,
        col: 1,
      },
      end: {
        line: 1,
        col: 13,
      },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should correctly parse a DefinitionExpression", () => {
    const input = `(define x 7)`;
    const ast = {
      type: "DefinitionExpression",
      name: "x",
      value: {
        type: "DecimalLiteral",
        value: "7",
        start: {
          line: 1,
          col: 10,
        },
        end: {
          line: 1,
          col: 11,
        },
      },
      start: {
        line: 1,
        col: 8,
      },
      end: {
        line: 1,
        col: 12,
      },
    };
    expect(parseExpr(tokenize(input))).toEqual(ast);
  });

  it("Should correctly parse a block of consecutive (not nested) expressions", () => {
    const input = `(+ 1 2)
    3.1415
    "hello"`;
    const result = {
      type: "Program",
      body: [
        {
          type: "CallExpression",
          name: "+",
          arguments: [
            {
              type: "DecimalLiteral",
              value: "1",
              start: {
                line: 1,
                col: 3,
              },
              end: {
                line: 1,
                col: 4,
              },
            },
            {
              type: "DecimalLiteral",
              value: "2",
              start: {
                line: 1,
                col: 5,
              },
              end: {
                line: 1,
                col: 6,
              },
            },
          ],
          start: {
            line: 1,
            col: 1,
          },
          end: {
            line: 1,
            col: 7,
          },
        },
        {
          type: "DecimalLiteral",
          value: "3.1415",
          start: {
            line: 2,
            col: 3,
          },
          end: {
            line: 2,
            col: 9,
          },
        },
        {
          type: "StringLiteral",
          value: "hello",
          start: {
            line: 3,
            col: 5,
          },
          end: {
            line: 3,
            col: 10,
          },
        },
      ],
      start: {
        line: 1,
        col: 0,
      },
      end: {
        line: 3,
        col: 10,
      },
    };
    expect(parse(tokenize(input))).toEqual(result);
  });

  it("Should correctly parse a lambda expression", () => {
    const input = `
  (lambda (x)
    (+ x x))
  `;
    const result = {
      type: "Program",
      body: [
        {
          type: "LambdaExpression",
          params: [
            {
              type: "FunctionParameter",
              name: "x",
            },
          ],
          body: [
            {
              type: "CallExpression",
              name: "+",
              arguments: [
                {
                  type: "Identifier",
                  value: "x",
                  start: {
                    line: 3,
                    col: 6,
                  },
                  end: {
                    line: 3,
                    col: 7,
                  },
                },
                {
                  type: "Identifier",
                  value: "x",
                  start: {
                    line: 3,
                    col: 8,
                  },
                  end: {
                    line: 3,
                    col: 9,
                  },
                },
              ],
              start: {
                line: 3,
                col: 4,
              },
              end: {
                line: 3,
                col: 10,
              },
            },
          ],
        },
      ],
      start: {
        line: 2,
        col: 1,
      },
      end: {
        line: 3,
        col: 11,
      },
    };
    expect(parse(tokenize(input))).toEqual(result);
  });

  it("Should correctly parse a lambda expression with multiple expressions in its body", () => {
    const input = `
  (lambda (x)
    (+ x x)
    (print "hello"))
  `;
    const result = {
      type: "Program",
      body: [
        {
          type: "LambdaExpression",
          params: [
            {
              type: "FunctionParameter",
              name: "x",
            },
          ],
          body: [
            {
              type: "CallExpression",
              name: "+",
              arguments: [
                {
                  type: "Identifier",
                  value: "x",
                  start: {
                    line: 3,
                    col: 6,
                  },
                  end: {
                    line: 3,
                    col: 7,
                  },
                },
                {
                  type: "Identifier",
                  value: "x",
                  start: {
                    line: 3,
                    col: 8,
                  },
                  end: {
                    line: 3,
                    col: 9,
                  },
                },
              ],
              start: {
                line: 3,
                col: 4,
              },
              end: {
                line: 3,
                col: 10,
              },
            },
            {
              type: "CallExpression",
              name: "print",
              arguments: [
                {
                  type: "StringLiteral",
                  value: "hello",
                  start: {
                    line: 4,
                    col: 12,
                  },
                  end: {
                    line: 4,
                    col: 17,
                  },
                },
              ],
              start: {
                line: 4,
                col: 4,
              },
              end: {
                line: 4,
                col: 18,
              },
            },
          ],
        },
      ],
      start: {
        line: 2,
        col: 1,
      },
      end: {
        line: 4,
        col: 19,
      },
    };
    expect(parse(tokenize(input))).toEqual(result);
  });
});
