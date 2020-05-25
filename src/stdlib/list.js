const Nil = require("./types/Nil");
const Cons = require("./types/Cons");
const _Boolean = require("./types/Boolean");

const nil = new Nil();
const empty = nil;

// pair constructor
function cons(car, cdr) {
  if (!car || isNullNative(car)) {
    return nil;
  }

  if (!cdr) {
    cdr = nil;
  }
  return new Cons(car, cdr);
}

// list constructor
function list(...args) {
  if (!args.length) {
    return nil;
  }
  let l = cons(args.pop(), nil);
  while (args.length) {
    l = cons(args.pop(), l);
  }
  return l;
}

// pair accessors
function car(lst) {
  return lst[0];
}

function cdr(lst) {
  return lst[1];
}

// basic predicates
function isNullNative(obj) {
  return obj.constructor && obj.constructor.name === "Nil";
}

function isNull(obj) {
  if (obj.constructor && obj.constructor.name === "Nil") {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

const isEmpty = isNullNative;

function isPairNative(obj) {
  return obj.constructor && obj.constructor.name === "Cons";
}

function isPair(obj) {
  if (obj.constructor && obj.constructor.name === "Cons") {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

function isListNative(obj) {
  if (isNullNative(obj)) {
    return true;
  } else if (isPairNative(obj) === false) {
    return false;
  }
  let head = car(obj);
  let tail = cdr(obj);
  while (!isNullNative(tail)) {
    if (
      isPairNative(tail) &&
      !isPairNative(tail[1]) &&
      !isNullNative(tail[1])
    ) {
      return false;
    }
    head = car(tail);
    tail = cdr(tail);
  }
  return true;
}

function isList(obj) {
  if (isNullNative(obj)) {
    return _Boolean.make("#t");
  } else if (isPairNative(obj) === false) {
    return _Boolean.make("#f");
  }
  let head = car(obj);
  let tail = cdr(obj);
  while (!isNullNative(tail)) {
    if (
      isPairNative(tail) &&
      !isPairNative(tail[1]) &&
      !isNullNative(tail[1])
    ) {
      return _Boolean.make("#f");
    }
    head = car(tail);
    tail = cdr(tail);
  }
  return _Boolean.make("#t");
}

// list helpers
function length(lst) {
  if (isNullNative(lst)) {
    return 0;
  }
  let head = car(lst);
  let tail = cdr(lst);
  let len = 0;
  while (head) {
    len += 1;
    if (!isNullNative(tail)) {
      head = car(tail);
      tail = cdr(tail);
    } else {
      head = null;
    }
  }
  return len;
}

function prepend(item, lst) {
  return cons(item, lst);
}

function append(...lists) {
  let temp = [];
  for (lst of lists) {
    let head = car(lst);
    let tail = cdr(lst);
    while (head) {
      temp.push(head);
      if (!isNullNative(tail)) {
        head = car(tail);
        tail = cdr(tail);
      } else {
        head = null;
      }
    }
  }
  return list(...temp);
}

const concat = append;

function copy(lst) {
  if (isNullNative(lst)) {
    return nil;
  }
  const temp = toArray(lst);
  return list(...temp);
}

function reverse(lst) {
  if (isNullNative(lst) || length(lst) === 1) {
    return lst;
  }
  let temp = [];
  let head = car(lst);
  let tail = cdr(lst);
  while (head) {
    temp.unshift(head);
    if (!isNullNative(tail)) {
      head = car(lst);
      tail = cdr(lst);
    } else {
      head = null;
    }
  }
  return list(...temp);
}

// list iterators
function map(fn, lst) {
  if (isNullNative(lst)) {
    return nil;
  } else {
    let temp = toArray(lst);
    let l = cons(fn(temp.pop()), nil);
    while (temp.length) {
      l = cons(fn(temp.pop()), l);
    }
    return l;
  }
}

function foldl(fn, accum, lst) {
  if (isNullNative(lst)) {
    return accum;
  }
  let head = car(lst);
  let tail = cdr(lst);
  while (head) {
    accum = fn(accum, head);
    if (!isNullNative(tail)) {
      head = car(tail);
      tail = cdr(tail);
    } else {
      head = null;
    }
  }
  return accum;
}

const fold = foldl;
const reduce = foldl;

function foldr(fn, accum, lst) {
  const temp = reverse(lst);
  return foldl(fn, accum, temp);
}

const reduceRight = foldr;

function foreach(fn, lst) {
  if (isNullNative(lst)) {
    return nil;
  }
  let head = car(lst);
  let tail = cdr(lst);
  while (head) {
    fn(head);
    if (!isNullNative(tail)) {
      head = car(tail);
      tail = cdr(tail);
    } else {
      head = null;
    }
  }
}

// conversion functions
function toArray(lst) {
  let arr = [];
  if (isNullNative(lst)) {
    return nil;
  }
  let head = car(lst);
  let tail = cdr(lst);
  while (head) {
    arr.push(head);
    if (!isNullNative(tail)) {
      head = car(tail);
      tail = cdr(tail);
    } else {
      head = null;
    }
  }
  return arr;
}

function toString(lst, n) {
  if (isNullNative(lst)) {
    return nil.toString();
  } else if (isPairNative(lst) && !isListNative(lst)) {
    return lst.toString();
  }
  let arr = toArray(lst);
  let str = "";
  if (!n) {
    str = `'`;
  }
  str += `(`;
  for (const [i, item] of arr.entries()) {
    if (isListNative(item)) {
      str += `${toString(item, i + 1)}`;
    } else {
      if (i === arr.length - 1) {
        str += `${item.toString()}`;
      } else {
        str += `${item.toString()} `;
      }
    }
  }
  str += `)`;
  return str;
}

// filtering, removing, sorting, and searching
function filter(pred, lst) {
  if (isNullNative(lst)) {
    return nil;
  }
  let temp = toArray(lst);
  let l = nil;
  while (temp.length) {
    let i = temp.pop();
    if (pred(i) !== false) {
      l = cons(i, l);
    }
  }
  return l;
}

function reject(pred, lst) {
  if (isNullNative(lst)) {
    return nil;
  }
  let temp = toArray(lst);
  let l = nil;
  while (temp.length) {
    let i = temp.pop();
    if (pred(i) === false) {
      l = cons(i, l);
    }
  }
  return l;
}

function remove(item, lst) {
  let temp = toArray(lst);
  let i = temp.indexOf(item);
  if (i > -1) {
    temp.splice(i, 1);
    return list(...temp);
  }
  return lst;
}

function sort(lst) {
  if (isNullNative(lst)) {
    return lst;
  }
  const temp = toArray(lst);
  temp.sort();
  return list(...temp);
}

function sortBy(compare, lst) {
  if (isNullNative(lst)) {
    return lst;
  }
  const temp = toArray(lst);
  temp.sort(compare);
  return list(...temp);
}

function member(item, lst) {
  if (isNullNative(lst)) {
    return lst;
  }
  const temp = toArray(lst);
  const i = temp.indexOf(item);
  if (item > -1) {
    return listTail(lst);
  }
  return nil;
}

function find(pred, list) {
  if (isNullNative(lst)) {
    return lst;
  }
  const temp = toArray(lst);
  return temp.find(pred) || nil;
}

// list accessors
const first = car;
const head = car;
const rest = cdr;
const tail = cdr;

function listRef(pos, lst) {
  let c = 0;
  let head = car(lst);
  let tail = cdr(lst);
  while (c < pos) {
    if (!isNullNative(tail)) {
      head = car(tail);
      tail = cdr(tail);
      c++;
    }
    throw new ReferenceError(
      "Ref out of bounds: list length exceeded",
    );
  }
  return head;
}

function listTail(pos, lst) {
  let c = 0;
  let head = car(lst);
  let tail = cdr(lst);
  while (c < pos - 1) {
    if (!isNullNative(tail)) {
      head = car(lst);
      tail = cdr(lst);
      c++;
    } else {
      throw new ReferenceError(
        "Tail starting point exceeds length of list",
      );
    }
  }
  return tail;
}

function second(lst) {
  return listRef(2, lst);
}

function third(lst) {
  return listRef(3, lst);
}

function fourth(lst) {
  return listRef(4, lst);
}

function fifth(lst) {
  return listRef(5, lst);
}

function sixth(lst) {
  return listRef(6, lst);
}

function seventh(lst) {
  return listRef(7, lst);
}

function eighth(lst) {
  return listRef(8, lst);
}

function ninth(lst) {
  return listRef(9, lst);
}

function tenth(lst) {
  return listRef(10, lst);
}

function last(lst) {
  return listRef(length(lst) - 1, lst);
}

// take and drop
function take(num, lst) {
  if (isNullNative(lst)) {
    return lst;
  }
  let temp = [];
  let head = car(lst);
  let tail = cdr(lst);
  let c = 0;
  while (head && c < num) {
    temp.push(head);
    if (!isNullNative(tail)) {
      head = car(tail);
      tail = cdr(tail);
      c++;
    } else {
      head = null;
    }
  }
  return list(...temp);
}

function drop(num, lst) {
  if (isNullNative(lst) || length(lst) <= num) {
    return nil;
  }
  let temp1 = toArray(lst);
  let temp2 = temp1.slice(num);
  return list(...temp2);
}

module.exports = {
  nil,
  empty,
  cons,
  list,
  car,
  cdr,
  "null-native?": isNullNative,
  "null?": isNull,
  "empty?": isEmpty,
  "pair-native?": isPairNative,
  "pair?": isPair,
  "list-native?": isListNative,
  "list?": isList,
  length,
  prepend,
  append,
  concat,
  copy,
  reverse,
  map,
  foldl,
  fold,
  reduce,
  foldr,
  "reduce-right": reduceRight,
  "list->array": toArray,
  "list->string": toString,
  filter,
  reject,
  remove,
  sort,
  "sort-by": sortBy,
  first,
  head,
  rest,
  tail,
  "list-ref": listRef,
  "list-tail": listTail,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
  eighth,
  ninth,
  tenth,
  last,
  take,
  drop,
};
