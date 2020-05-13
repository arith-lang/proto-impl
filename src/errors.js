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

module.exports = {
  ArithError,
  ArithReadInputError,
};
