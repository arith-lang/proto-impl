const L = require("list");
const { list } = require("./list");
const isList = require("./list")["list?"];
const toString = require("./list")["list->string"];
const toArray = require("./list")["list->array"];

// replace toString method
function vecToString() {
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
}

// vector constructor
function vector(...args) {
  let v = L.list(...args);
  v.toString = vecToString.bind(v);
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
function vectorLength(vec) {
  return L.length(vec);
}

function vectorRef(pos, vec) {
  const elem = L.nth(pos, vec);
  if (!elem) {
    throw new ReferenceError(
      "Ref out of bounds: vector length exceeded",
    );
  }
  return elem;
}

function vectorSlice(start, end, vec) {
  return vector(...L.slice(start, end, vec));
}

function vectorPrepend(item, vec) {
  return vector(...L.prepend(item, vec));
}

function vectorPush(item, vec) {
  return vector(...L.append(item, vec));
}

function vectorPop(vec) {
  return vector(...L.pop(vec));
}

function vectorAppend(...vecs) {
  let accum = L.list();
  for (vec of vecs) {
    accum = L.concat(accum, vec);
  }
  return vector(...accum);
}

function vectorCopy(vec) {
  return vector(...vec);
}

function vectorReverse(vec) {
  return vector(...L.reverse(vec));
}

// vector iterators

// conversion functions
function vectorToArray(vec) {
  return L.toArray(vec);
}

function vectorToList(vec) {
  return list(...vec);
}

function listToVector(lst) {
  return vector(...toArray(lst));
}

function vectorToString(vec) {
  return vec.toString();
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
  "vector-slice": vectorSlice,
  "vector-prepend": vectorPrepend,
  "vector-push": vectorPush,
  "vector-pop": vectorPop,
  "vector-append": vectorAppend,
  "vector-copy": vectorCopy,
  "vector->array": vectorToArray,
  "vector->list": vectorToList,
  "list->vector": listToVector,
  "vector->string": vectorToString,
};
