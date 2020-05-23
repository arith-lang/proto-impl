const { evaluate } = require("../src/evaluate");

describe("AST Evaluator", () => {
  it("Should return the value of a primitive integer literal", () => {
    const input = `10`;

    expect(evaluate(input).toString()).toMatch(input);
  });

  it("Should return zero", () => {
    const input = `0`;

    expect(evaluate(input).toString()).toBe("0");
  });

  it("Should return the value of a primitive decimal literal", () => {
    const input = `3.14159`;

    expect(evaluate(input).toString()).toBe("3.14159");
  });

  it("Should be able to look up identifiers in the environment", () => {
    const input = `PI`;
    expect(evaluate(input).toString()).toBe("3.1415926535897932385");
  });

  it("Should be able to evaluate a single call expression", () => {
    const input = `(+ 2 3)`;

    expect(evaluate(input).toString()).toBe("5");
  });

  it("Should be able to evaluate a call expression with decimal arguments", () => {
    const input = `(- 6.4 3.2)`;

    expect(evaluate(input).toString()).toBe("3.2");
  });

  it("Should be able to evaluate a nested expression", () => {
    const input = `(+ 2 3 (- 5 4))`;

    expect(evaluate(input).toString()).toBe("6");
  });

  it("Should be able to evaluate a string literal", () => {
    const input = `"Hello"`;

    expect(evaluate(input).toString()).toBe("Hello");
  });

  it("Should be able to evaluate a function with a string argument", () => {
    const input = `(string-upcase "hello")`;

    expect(evaluate(input).toString()).toEqual("HELLO");
  });

  it("Should correctly evaluate a boolean literal", () => {
    const input1 = `#t`;
    const input2 = `#f`;

    expect(evaluate(input1).bool).toBe(true);
    expect(evaluate(input1).toString()).toBe("#t");
    expect(evaluate(input2).bool).toBe(false);
    expect(evaluate(input2).toString()).toBe("#f");
  });

  it("Should correctly evaluate a program with multiple top-level expressions", () => {
    const input = `
    "Hello"
    #t
    (+ 2 3)
    `; // only the value of the last expression should be returned

    expect(evaluate(input).toString()).toBe("5");
  });

  it("Should correctly evaluate an if expression", () => {
    const input = `
    (if #t
      "This one"
      "Not this one")`;

    expect(evaluate(input).toString()).toBe("This one");
  });

  it("Should return a function when a lambda definition is evaluated", () => {
    const input = `
    (define identity
      (lambda (x) x))
    `;

    expect(typeof evaluate(input)).toBe("function");
  });

  it("Should correctly evaluate the identity function", () => {
    const input = `
    (define id
      (lambda (x) x))
    (id 10)
    `;

    expect(evaluate(input).toString()).toBe("10");
  });

  it("Should correctly evaluate a function with a call expression body", () => {
    const input = `
    (define add2
      (lambda (x y)
        (+ x y)))
    (add2 2 3)
    `;

    expect(evaluate(input).toString()).toEqual("5");
  });
});
