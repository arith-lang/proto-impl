const { nil } = require("./list");
const isNull = require("./list")["null?"];
const isList = require("./list")["list?"];
const toString = require("./list")["list->string"];

// replace toString method
function arrayToString() {
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
  arr.toString = arrayToString.bind(arr);
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

function vectorSet(pos, newItem, arr) {
  arr.splice(pos, 1, newItem);
}

const vectorUpdate = vectorSet;

// array iterators

// conversion functions

// filtering, removing, sorting, and searching

// array accessors

// take and drop

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
  "vector-update!": vectorUpdate,
  "vector-set!": vectorSet,
};
