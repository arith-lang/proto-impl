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
  return L.slice(start, stop, vec);
}

function vectorPrepend(item, vec) {
  return L.prepend(item, vec);
}

function vectorAppend(item, vec) {
  return L.append(item, vec);
}

function vectorConcat(...vecs) {
  let accum = vector();
  for (vec of vecs) {
    accum = L.concat(accum, vec);
  }
  return accum;
}

// vector iterators

// conversion functions
function vectorToArray(vec) {
  return L.toArray(vec);
}

function vectorToList(vec) {
  return list(...vectorToArray(vec));
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
  "vector-append": vectorAppend,
  "vector-concat": vectorConcat,
  "vector->array": vectorToArray,
  "vector->list": vectorToList,
  "list->vector": listToVector,
  "vector->string": vectorToString,
};
