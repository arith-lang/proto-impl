const { Map: IMap, is } = require("immutable");
const R = require("ramda");
const { cons, list } = require("./list");
const { array } = require("./array");
const { vector } = require("./vector");

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
function hashClear(hash) {
  return hash.clear();
}

// hash-count
function hashCount(hash) {
  return hash.size;
}

// hash-copy
function hashCopy(hash) {
  return IMap(hash);
}

// hash-concat
function hashConcat(...hashes) {
  let merged = new IMap();
  merged = merged.merge(...hashes);
  return merged;
}

hashConcat = R.curryN(2, hashConcat);

// iterators
// hash-map
function hashMap(fn, hash) {
  return hash.map(fn);
}

hashMap = R.curry(hashMap);

// hash-foreach
function hashForeach(fn, hash) {
  hash.forEach(fn);
}

hashForeach = R.curry(hashForeach);

// hash-reduce
function hashReduce(fn, accum, hash) {
  return hash.reduce(fn, accum);
}

hashReduce = R.curry(hashReduce);

// hash-reduce-right
function hashReduceRight(fn, accum, hash) {
  return hash.reduceRight(fn, accum);
}

hashReduceRight = R.curry(hashReduceRight);

// hash-keys
function hashKeys(hash) {
  return list(...hash.keys());
}

// hash-values
function hashValues(hash) {
  return list(...hash.values());
}

// conversion
// hash->list
function hashToList(hash) {
  let temp = [];
  for ([k, v] of hash.entries()) {
    temp.push(cons(k, v));
  }
  return list(...temp);
}

// hash->array
function hashToArray(hash) {
  let temp = [];
  for ([k, v] of hash.entries()) {
    temp.push(cons(k, v));
  }
  return array(...temp);
}

// hash->vector
function hashToVector(hash) {
  let temp = [];
  for ([k, v] of hash.entries()) {
    temp.push(cons(k, v));
  }
  return vector(...temp);
}

// hash->string
function hashToString(hash) {
  let str = "#hash(";

  for ([k, v] of hash.entries()) {
    str += `(${k} . ${v})`;
  }
  str += ")";
  str = str.replace(")(", ") (");

  return str;
}

// filters
// hash-filter
function hashFilter(pred, hash) {
  return hash.filter(pred);
}

hashFilter = R.curry(hashFilter);

const hashKeep = hashFilter;

// hash-reject
function hashReject(pred, hash) {
  return hash.filterNot(pred);
}

hashReject = R.curry(hashReject);

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
  "hash-clear": hashClear,
  "hash-count": hashCount,
  "hash-copy": hashCopy,
  "hash-concat": hashConcat,
  "hash-map": hashMap,
  "hash-foreach": hashForeach,
  "hash-reduce": hashReduce,
  "hash-foldl": hashReduce,
  "hash-fold": hashReduce,
  "hash-reduce-right": hashReduceRight,
  "hash-foldr": hashReduceRight,
  "hash-keys": hashKeys,
  "hash-values": hashValues,
  "hash->list": hashToList,
  "hash->array": hashToArray,
  "hash->vector": hashToVector,
  "hash->string": hashToString,
  "hash-filter": hashFilter,
  "hash-keep": hashKeep,
  "hash-reject": hashReject,
};
