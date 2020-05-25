const L = require("list");
const { nil, list } = require("./list");
const _Boolean = require("./types/Boolean");
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
  if (L.isList(obj)) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

function isVectorEmpty(vec) {
  if (vec.length === 0) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

// vector helpers
function vectorLength(vec) {
  return L.length(vec);
}

function vectorSlice(start, end, vec) {
  return vector(...L.slice(start, end, vec));
}

function vectorPrepend(item, vec) {
  return vector(...L.prepend(item, vec));
}

function vectorAppend(item, vec) {
  return vector(...L.append(item, vec));
}

function vectorConcat(...vecs) {
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

function vectorUpdate(index, newItem, vec) {
  return vector(...L.update(index, newItem, vec));
}

// vector iterators
function vectorMap(fn, vec) {
  return vector(...L.map(fn, vec));
}

function vectorFoldl(fn, accum, vec) {
  return L.foldl(fn, accum, vec);
}

const vectorFold = vectorFoldl;
const vectorReduce = vectorFoldl;

function vectorFoldr(fn, accum, vec) {
  return L.foldr(fn, accum, vec);
}

const vectorReduceRight = vectorFoldr;

function vectorForeach(fn, vec) {
  L.forEach(fn, vec);
}

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

function arrayToVector(arr) {
  return vector(...arr);
}

function vectorToString(vec) {
  return vec.toString();
}

// filtering, removing, sorting, and searching
function vectorFilter(pred, vec) {
  return vector(...L.filter(pred, vec));
}

function vectorReject(pred, vec) {
  return vector(...L.reject(pred, vec));
}

function vectorRemove(index, number, vec) {
  return vector(...L.remove(index, number, vec));
}

function vectorSort(vec) {
  return vector(...L.sort(vec));
}

function vectorSortBy(compare, vec) {
  return vector(...L.sortBy(compare, vec));
}

function vectorFind(pred, vec) {
  return L.find(pred, vec);
}

// vector accessors
function vectorRef(pos, vec) {
  const elem = L.nth(pos, vec);
  if (!elem) {
    throw new ReferenceError(
      "Ref out of bounds: vector length exceeded",
    );
  }
  return elem;
}

function vectorTail(pos, vec) {
  return vector(...L.slice(pos, vectorLength(vec), vec));
}

function vectorFirst(vec) {
  return L.first(vec);
}

function vectorLast(vec) {
  return L.last(vec);
}

// take and drop
function vectorTake(num, vec) {
  return vector(...L.take(num, vec));
}

function vectorDrop(num, vec) {
  return vector(...L.drop(num, vec));
}

module.exports = {
  vector,
  "vector?": isVector,
  "vector-empty?": isVectorEmpty,
  "vector-length": vectorLength,
  "vector-slice": vectorSlice,
  "vector-prepend": vectorPrepend,
  "vector-append": vectorAppend,
  "vector-concat": vectorConcat,
  "vector-copy": vectorCopy,
  "vector-reverse": vectorReverse,
  "vector-update": vectorUpdate,
  "vector-map": vectorMap,
  "vector-foldl": vectorFoldl,
  "vector-fold": vectorFold,
  "vector-reduce": vectorReduce,
  "vector-foldr": vectorFoldr,
  "vector-reduce-right": vectorReduceRight,
  "vector-foreach": vectorForeach,
  "vector->array": vectorToArray,
  "vector->list": vectorToList,
  "list->vector": listToVector,
  "array->vector": arrayToVector,
  "vector->string": vectorToString,
  "vector-filter": vectorFilter,
  "vector-reject": vectorReject,
  "vector-remove": vectorRemove,
  "vector-sort": vectorSort,
  "vector-sort-by": vectorSortBy,
  "vector-find": vectorFind,
  "vector-ref": vectorRef,
  "vector-tail": vectorTail,
  "vector-first": vectorFirst,
  "vector-last": vectorLast,
  "vector-take": vectorTake,
  "vector-drop": vectorDrop,
};
