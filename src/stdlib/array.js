const { nil } = require("./list");
const isNull = require("./list")["null?"];
const isList = require("./list")["list?"];
const toString = require("./list")["list->string"];

// replace toString method
function arrToString() {
  if (isNull(this)) {
    return `#(||)`;
  }
  let str = `#(|`;
  for (const [i, item] of this.entries()) {
    if (i === this.length - 1) {
      if (isList(item)) {
        str += `${toString(item)}`;
      } else {
        str += `${item.toString()}`;
      }
    } else {
      if (isList(item)) {
        str += `${toString(item)} `;
      } else {
        str += `${item.toString()} `;
      }
    }
  }
  str += `|)`;
  return str;
}

// array constructor
function array(...args) {
  let arr = [...args];
  arr.toString = arrToString.bind(arr);
  return arr;
}

// predicates
function isArray(obj) {
  return obj instanceof Array;
}

function isArrayEmpty(arr) {
  return isNull(arr);
}

// array helpers
function arrayLength(arr) {
  return arr.length;
}

function arraySlice(start, end, arr) {
  return array(...arr.slice(start, end));
}

function arrayPrepend(item, arr) {
  arr.unshift(item);
}

function arrayAppend(item, arr) {
  arr.push(item);
}

function arrayConcat(...arrs) {
  let accum = [];
  return array(...accum.concat(...arrs)).toString();
}

function arrayCopy(arr) {
  return array(...arr);
}

function arrayReverse(arr) {
  arr.reverse();
}

function arraySet(pos, newItem, arr) {
  arr.splice(pos, 1, newItem);
}

const arrayUpdate = arraySet;

// array iterators
function arrayMap(fn, arr) {
  return array(...arr.map(fn));
}

function arrayFoldl(fn, accum, arr) {
  return array(...arr.reduce(fn, accum));
}

const arrayFold = arrayFoldl;
const arrayReduce = arrayFoldl;

function arrayFoldr(fn, accum, arr) {
  return array(...arr.reduceRight(fn, accum));
}

const arrayReduceRight = arrayFoldr;

function arrayForeach(fn, arr) {
  arr.forEach(fn);
}

// conversion functions
function arrayToString(arr) {
  return arr.toString();
}

// filtering, removing, sorting, and searching
function arrayFilter(pred, arr) {
  return array(...arr.filter(pred));
}

function arrayReject(pred, arr) {
  return array(...arr.filter(!pred));
}

function arrayRemove(index, number, arr) {
  arr.splice(index, number);
}

function arraySort(arr) {
  arr.sort();
}

function arraySortBy(compare, arr) {
  arr.sort(compare);
}

function arrayFind(pred, arr) {
  return arr.find(pred);
}

// array accessors
function arrayRef(pos, arr) {
  const elem = arr[pos];
  if (!elem) {
    throw new ReferenceError(
      "Ref out of bounds: array length exceeded",
    );
  }
  return elem;
}

function arrayTail(pos, arr) {
  return array(...arr.slice(pos));
}

function arrayFirst(arr) {
  return arr[0];
}

function arrayLast(arr) {
  return array.pop();
}

// take and drop
function arrayTake(num, arr) {
  return arr.slice(0, num);
}

function arrayDrop(num, arr) {
  const toTake = arr.length - 1 - num;
  return arr.slice(toTake);
}

// range

module.exports = {
  array,
  "array?": isArray,
  "array-empty?": isArrayEmpty,
  "array-length": arrayLength,
  "array-slice": arraySlice,
  "array-prepend!": arrayPrepend,
  "array-append!": arrayAppend,
  "array-concat": arrayConcat,
  "array-reverse!": arrayReverse,
  "array-update!": arrayUpdate,
  "array-set!": arraySet,
  "array-map": arrayMap,
  "array-foldl": arrayFoldl,
  "array-fold": arrayFold,
  "array-reduce": arrayReduce,
  "array-foldr": arrayFoldr,
  "array-reduce-right": arrayReduceRight,
  "array-foreach": arrayForeach,
  "array->string": arrayToString,
  "array-filter": arrayFilter,
  "array-reject": arrayReject,
  "array-remove!": arrayRemove,
  "array-sort!": arraySort,
  "array-sort-by!": arraySortBy,
  "array-find": arrayFind,
  "array-ref": arrayRef,
  "array-tail": arrayTail,
  "array-first": arrayFirst,
  "array-last": arrayLast,
};
