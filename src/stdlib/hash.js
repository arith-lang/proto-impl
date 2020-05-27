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
function isHashEqual(hash1, hash2) {
  return is(hash1, hash2);
}

isHashEqual = R.curry(isHashEqual);

// hash-has-key?
function hashHasKey(key, hash) {
  return hash.has(key);
}

hashHasKey = R.curry(hashHasKey);

// hash-empty?
function isHashEmpty(hash) {
  return hash.size === 0;
}

// CRUD functions
// hash-ref
function hashRef(ref, hash) {
  return hash.get(ref);
}

hashRef = R.curry(hashRef);

// hash-set
function hashSet(key, value, hash) {
  return hash.set(key, value);
}

hashSet = R.curry(hashSet);

// hash-update
const hashUpdate = hashSet;

// hash-remove
function hashRemove(key, hash) {
  return hash.delete(key);
}

hashRemove = R.curry(hashRemove);

// hash-clear

// hash-count

// hash-copy

// hash-concat

// iterators
// hash-map

// hash-foreach

// hash-reduce

// hash-keys

// hash-values

// conversion
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
  "hash-eq?": isHashEq,
  "hash-eqv?": isHashEqv,
  "hash-equal?": isHashEqual,
  "hash-has-key?": hashHasKey,
  "hash-empty?": isHashEmpty,
  "hash-ref": hashRef,
  "hash-set": hashSet,
  "hash-update": hashUpdate,
  "hash-remove": hashRemove,
};
