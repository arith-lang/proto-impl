const { Map } = require("immutable");
const R = require("ramda");
const { cons } = require("./list");

// hash table constructor
// immutable equivalent of hash maps
// takes a sequence of cons pairs
// do not curry
function hash(...args) {
  return Map(args);
}

// second constructor
// takes a sequence of values
// do not curry
function makeHash(...args) {
  let hash = Map();
  for (let i = 0; i < args.length; i += 2) {
    hash = hash.set(args[i], args[i + 1]);
  }

  return hash;
}

// hash?

// hash-eq?

// hash-eqv?

// hash-equals?

// hash-ref

module.exports = {
  hash,
  "make-hash": makeHash,
};
