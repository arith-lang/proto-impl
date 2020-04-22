// constants
const INTEGER = /^[0-9]+$/;

// token identifiers
const isInteger = (char) => INTEGER.test(char);

export { isInteger };
