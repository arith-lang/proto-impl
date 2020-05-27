const { Map } = require("immutable");
const R = require("ramda");
const { cons } = require("./list");

// hash table constructor
// immutable equivalent of hash maps
// takes a sequence of values
// do not curry
function hash(...args) {
  let hash = Map();
  for (let i = 0; i < args.length; i += 2) {
    hash = hash.set(args[i], args[i + 1]);
  }

  return hash;
}

// second constructor
// takes a sequence of cons pairs
// do not curry
function makeHash(...args) {
  return Map(args);
}

// predicates
// hash?

// hash-eq?

// hash-eqv?

// hash-equals?

// hash-has-key?

// hash-empty?

// hash-ref

// hash-ref-key

// hash-set

// hash-update

// hash-remove

// hash-clear

// hash-count

// hash-copy

// hash-map

// hash-foreach

// hash-keys

// hash-values

// hash->list

// hash->array

// hash->vector

// hash-filter

// hash-reject

// hash-reduce

module.exports = {
  hash,
  "make-hash": makeHash,
};
