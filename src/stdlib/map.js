const R = require("ramda");
const equal = require("fast-deep-equal/es6");
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
function isMap(obj) {
  return obj.constructor && obj.constructor.name === "Map";
}

// map-eq?
function isMapEq(map1, map2) {
  return Object.is(map1, map2);
}

isMapEq = R.curry(isMapEq);

// map-eqv?
const isMapEqv = isMapEq;

// map-equals?
function isMapEqual(map1, map2) {
  return equal(map1, map2);
}

isMapEqual = R.curry(isMapEqual);

// map-has-key?
function mapHasKey(key, map) {
  return map.has(key);
}

mapHasKey = R.curry(mapHasKey);

// map-empty?
function isMapEmpty(map) {
  return map.size === 0;
}

// CRUD functions
// map-ref

// map-ref-key

// map-set!

// map-update!

// map-remove!

// map-clear!

// map-count

// map-copy

// iterators
// map-map

// map-foreach

// map-reduce

// map-keys

// map-values

// map->list

// map->array

// map->vector

// filters
// map-filter

// map-reject

module.exports = {
  hashmap,
  "make-map": makeMap,
  "map?": isMap,
  "map-eq?": isMapEq,
  "map-eqv?": isMapEqv,
  "map-equals?": isMapEqual,
  "map-has-key?": mapHasKey,
  "map-empty?": isMapEmpty,
};
