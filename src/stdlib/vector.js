const L = require("list");
const { list } = require("./list");
const isList = require("./list")["list?"];
const toString = require("./list")["list->string"];
const toArray = require("./list")["list->array"];

// vector prototype
const vectorPrototype = Object.create({});

vectorPrototype.toString = function () {
  if (isVectorEmpty(this)) {
    return `#()`;
  }
  let str = `#(`;
  let [head] = this.prefix;
  if (isList(head)) {
    str += `${toString(head)}`;
  } else {
    str += `${head.toString()}`;
  }
  if (this.suffix.length) {
    str += " ";
    for (const [i, item] of this.suffix.entries()) {
      if (i === this.suffix.length - 1) {
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
  }

  str += `)`;
  return str;
};

// vector constructor
function vector(...args) {
  let v = L.list(...args);
  v = { ...v, ...vectorPrototype };
  return v;
}

// predicates
function isVector(obj) {
  return L.isList(obj);
}

function isVectorEmpty(vec) {
  return vec.length === 0;
}

// vector helpers
function vectorLength(v) {
  return L.length(v);
}

function vectorRef(vec, pos) {
  const elem = L.nth(pos, vec);
  if (!elem) {
    throw new ReferenceError(
      "Ref out of bounds: vector length exceeded",
    );
  }
  return elem;
}

// vector iterators

// conversion functions
function vectorToArray(v) {
  return L.toArray(v);
}

function vectorToList(v) {
  return list(vectorToArray(v));
}

function listToVector(lst) {
  return vector(...toArray(lst));
}

function vectorToString(v) {
  return v.toString();
}

// filtering, removing, sorting, and searching

// vector accessors

// take and drop

// range

module.exports = {
  vector,
  "vector?": isVector,
  "vector-empty?": isVectorEmpty,
  "vector-length": vectorLength,
  "vector-ref": vectorRef,
  "vector->array": vectorToArray,
  "vector->list": vectorToList,
  "list->vector": listToVector,
  "vector->string": vectorToString,
};