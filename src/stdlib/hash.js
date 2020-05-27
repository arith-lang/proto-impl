const { Map: IMap, is } = require("immutable");
const R = require("ramda");
const { cons } = require("./list");

// hash table constructor
// immutable equivalent of hash maps
// takes a sequence of values
// do not curry
function hash(...args) {
  let hash = IMap();
  for (let i = 0; i < args.length; i += 2) {
    hash = hash.set(args[i], args[i + 1]);
  }

  return hash;
}

// second constructor
// takes a sequence of cons pairs
// do not curry
function makeHash(...args) {
  return IMap(args);
}

// predicates
// hash?
function isHash(obj) {
  return IMap.isMap(obj);
}

// hash-eq?
function isHashEq(hash1, hash2) {
  return Object.is(hash1, hash2);
}

isHashEq = R.curry(isHashEq);

// hash-eqv?
const isHashEqv = isHashEq;

// hash-equals?

// hash-has-key?

// hash-empty?

// CRUD functions
// hash-ref

// hash-ref-key

// hash-set

// hash-update

// hash-remove

// hash-clear

// hash-count

// hash-copy

// iterators
// hash-map

// hash-foreach

// hash-reduce

// hash-keys

// hash-values

// hash->list

// hash->array

// hash->vector

// filters
// hash-filter

// hash-reject

module.exports = {
  hash,
  "make-hash": makeHash,
  "hash?": isHash,
};
