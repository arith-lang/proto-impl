const { nil } = require("./list");
const isNull = require("./list")["null?"];
const isList = require("./list")["list?"];
const toString = require("./list")["list->string"];
const toArray = require("./list")["list->array"];

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

// array helpers

// array iterators

// conversion functions

// filtering, removing, sorting, and searching

// array accessors

// take and drop

// range

module.exports = {
  array,
  "array?": isArray,
};
