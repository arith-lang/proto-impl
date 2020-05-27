const R = require("ramda");
const { cons } = require("./list");

// hash map constructor
// mutable equivalent of hash tables
// takes a sequence of values
// do not curry
function hashmap(...args) {
  let map = new Map();
  for (let i = 0; i < args.length; i += 2) {
    map.set(args[i], args[i + 1]);
  }

  return map;
}

// second constructor
// takes a sequence of cons pairs
// do not curry
function makeMap(...args) {
  return new Map(args);
}

// predicates
// map?

// map-eq?

// map-eqv?

// map-equals?

// map-has-key?

// map-empty?

// map-ref

// map-ref-key

// map-set!

// map-update!

// map-remove!

// map-clear!

// map-count

// map-copy

module.exports = {
  hashmap,
  "make-map": makeMap,
};
