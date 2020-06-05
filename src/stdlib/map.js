const R = require("ramda");
const equal = require("fast-deep-equal/es6");
const { cons, list } = require("./list");
const { array } = require("./array");
const { vector } = require("./vector");

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

// map-equal?
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
function mapRef(ref, map) {
  return map.get(ref);
}

mapRef = R.curry(mapRef);

// map-set!
function mapSet(key, value, map) {
  map.set(key, value);
}

mapSet = R.curry(mapSet);

// map-update!
const mapUpdate = mapSet;

// map-remove!
function mapRemove(key, map) {
  map.delete(key);
}

mapRemove = R.curry(mapRemove);

// map-clear!
function mapClear(map) {
  map.clear();
}

// map-count
function mapCount(map) {
  return map.keys().length;
}

// map-copy
function mapCopy(map) {
  const entries = map.entries();
  const newMap = new Map();
  for (entry of entries) {
    newMap.set(entry[0], entry[1]);
  }
  return newMap;
}

// map-concat
function mapConcat(...maps) {
  let merged = new Map();
  for (map of maps) {
    for (entry of map.entries()) {
      merged.set(entry[0], entry[1]);
    }
  }
  return merged;
}

mapConcat = R.curryN(2, mapConcat);

// iterators
// map-map
function mapMap(fn, map) {
  let mapped = new Map();
  for (entry of map.entries()) {
    mapped.set(entry[0], fn(entry[1]));
  }
  return mapped;
}

mapMap = R.curry(mapMap);

// map-foreach
function mapForeach(fn, map) {
  map.values().forEach(fn);
}

mapForeach = R.curry(mapForeach);

// map-reduce
function mapReduce(fn, accum, map) {
  return map.values().reduce(fn, accum);
}

mapReduce = R.curry(mapReduce);

// map-reduce-right
function mapReduceRight(fn, accum, map) {
  return map.values().reduceRight(fn, accum);
}

mapReduceRight = R.curry(mapReduceRight);

// map-keys
function mapKeys(map) {
  return list(...map.keys());
}

// map-values
function mapValues(map) {
  return list(...map.values());
}

// conversion
// map->list
function mapToList(map) {
  let temp = [];
  for ([k, v] of map.entries()) {
    temp.push(cons(k, v));
  }
  return list(...temp);
}

// map->array
function mapToArray(map) {
  let temp = [];
  for ([k, v] of map.entries()) {
    temp.push(cons(k, v));
  }
  return array(...temp);
}

// map->vector
function mapToVector(map) {
  let temp = [];
  for ([k, v] of map.entries()) {
    temp.push(cons(k, v));
  }
  return vector(...temp);
}

// map->string
function mapToString(map) {
  let str = "#map(";

  for ([k, v] of map.entries()) {
    str += `(${k} . ${v})`;
  }
  str += ")";
  str = str.replace(")(", ") (");

  return str;
}

// filters
// map-filter
function mapFilter(pred, map) {
  let filtered = new Map();
  for (entry of map.entries()) {
    if (pred(entry[1]) !== false) {
      filtered.set(entry[0], entry[1]);
    }
  }
  return filtered;
}

mapFilter = R.curry(mapFilter);

const mapKeep = mapFilter;

// map-reject
function mapReject(pred, map) {
  let filtered = new Map();
  for (entry of map.entries()) {
    if (pred(entry[1]) === false) {
      filtered.set(entry[0], entry[1]);
    }
  }
  return filtered;
}

mapReject = R.curry(mapReject);

module.exports = {
  hashmap,
  "make-map": makeMap,
  "map?": isMap,
  "map-eq?": isMapEq,
  "map-eqv?": isMapEqv,
  "map-equal?": isMapEqual,
  "map-has-key?": mapHasKey,
  "map-empty?": isMapEmpty,
  "map-ref": mapRef,
  "map-set!": mapSet,
  "map-update!": mapUpdate,
  "map-remove!": mapRemove,
  "map-clear!": mapClear,
  "map-count": mapCount,
  "map-copy": mapCopy,
  "map-concat": mapConcat,
  "map-map": mapMap,
  "map-foreach": mapForeach,
  "map-reduce": mapReduce,
  "map-foldl": mapReduce,
  "map-fold": mapReduce,
  "map-reduce-right": mapReduceRight,
  "map-foldr": mapReduceRight,
  "map-keys": mapKeys,
  "map-values": mapValues,
  "map->list": mapToList,
  "map->array": mapToArray,
  "map->vector": mapToVector,
  "map->string": mapToString,
  "map-filter": mapFilter,
  "map-keep": mapKeep,
  "map-reject": mapReject,
};
