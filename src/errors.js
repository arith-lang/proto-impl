class ArithError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ArithReadInputError extends ArithError {
  constructor(message) {
    super(`Could not read input: ${message}`);
  }
}

class ArithSyntaxError extends ArithError {
  constructor(message) {
    super(`Invalid syntax: ${message}`);
  }
}

class ArithTypeError extends ArithError {
  constructor(message) {
    super(`Type error: ${message}`);
  }
}

module.exports = {
  ArithError,
  ArithReadInputError,
  ArithSyntaxError,
  ArithTypeError,
};
