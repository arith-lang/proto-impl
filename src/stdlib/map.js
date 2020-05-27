const R = require("ramda");
const { cons } = require("./list");

// hash map constructor
// mutable equivalent of hash tables
// takes a sequence of cons pairs
// do not curry
function map(...args) {
  return new Map(args);
}
