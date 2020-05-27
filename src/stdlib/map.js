const R = require("ramda");
const { cons } = require("./list");

// hash map constructor
// mutable equivalent of hash tables
// takes a sequence of cons pairs
// do not curry
function hashmap(...args) {
  return new Map(args);
}

// second constructor
// takes a sequence of values
// do not curry
function makeMap(...args) {
  let map = new Map();
  for (let i = 0; i < args.length; i += 2) {
    map.set(args[i], args[i + 1]);
  }

  return map;
}

// map?

// map-eq?

// map-eqv?

// map-equals?

// map-ref

module.exports = {
  hashmap,
  "make-map": makeMap,
};
