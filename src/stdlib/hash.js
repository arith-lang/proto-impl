const { Map } = require("immutable");
const R = require("ramda");
const { cons } = require("./list");

// hash table constructor
// takes a sequence of cons pairs
// do not curry
function hash(...args) {
  return Map(args);
}
