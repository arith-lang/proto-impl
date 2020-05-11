// let nil = empty array
const nil = [];
const empty = nil;

// pair constructor
function cons(car, cdr) {
  if (!cdr) {
    cdr = nil;
  }
  return [car, cdr];
}

// list constructor
function list(...args) {
  if (!args.length) {
    return nil;
  }
  const [head, ...tail] = args;
  return cons(head, list(...tail));
}

// pair accessors
function car(list) {
  return list[0];
}

function cdr(list) {
  const [, [...rest]] = list;
  return rest;
}

// basic predicates
function isNull(obj) {
  return obj instanceof Array && obj.length === 0;
}

const isEmpty = isNull;

function isPair(obj) {
  return obj instanceof Array && obj.length === 2;
}

function isList(obj) {
  if (isNull(obj)) {
    return true;
  } else if (obj instanceof Array === false) {
    return false;
  } else if (isPair(obj) && obj[1] instanceof Array === false) {
    return false;
  }
  const [head, [...tail]] = obj;
  return isList(tail);
}

// list helpers
function length(lst) {
  if (isNull(lst)) {
    return 0;
  }
  const temp = toArray(lst);
  return temp.length;
}

function listRef(lst, pos) {
  let c = 0;
  let [head, [...tail]] = lst;
  while (c < pos) {
    if (!isNull(tail)) {
      [head, [...tail]] = tail;
      c++;
    }
    throw new ReferenceError(
      "Ref out of bounds: list length exceeded",
    );
  }
  return head;
}

function listTail(lst, pos) {
  let c = 0;
  let [head, [...tail]] = lst;
  while (c < pos - 1) {
    if (!isNull(tail)) {
      [head, [...tail]] = tail;
      c++;
    } else {
      throw new ReferenceError(
        "Tail starting point exceeds length of list",
      );
    }
  }
  return tail;
}

function append(...lists) {
  let temp = [];
  for (lst of lists) {
    let [head, [...tail]] = lst;
    while (head) {
      temp.push(head);
      if (!isNull(tail)) {
        [head, ...[tail]] = tail;
      } else {
        head = null;
      }
    }
  }
  return list(...temp);
}

function reverse(lst) {
  if (isNull(lst) || length(lst) === 1) {
    return lst;
  }
  let temp = [];
  let [head, [...tail]] = lst;
  while (head) {
    temp.unshift(head);
    if (!isNull(tail)) {
      [head, [...tail]] = tail;
    } else {
      head = null;
    }
  }
  return list(...temp);
}

// list iterators
function map(fn, lst) {
  if (isNull(lst)) {
    return nil;
  }
  const temp1 = toArray(lst);
  const temp2 = temp1.map(fn);
  return list(...temp2);
}

function foldl(fn, accum, lst) {
  if (isNull(lst)) {
    return accum;
  }
  const temp1 = toArray(lst);
  const temp2 = temp1.reduce(fn, accum);
  return list(...temp);
}

const fold = foldl;
const reduce = foldl;

function foldr(fn, accum, lst) {
  if (isNull(lst)) {
    return accum;
  }
  const temp1 = toArray(lst);
  const temp2 = temp1.reduceRight(fn, accum);
  return list(...temp2);
}

const reduceRight = foldr;

// to array helper
// (will be more useful when I actually add arrays to the language)
function toArray(lst) {
  let arr = [];
  if (isNull(lst)) {
    return arr;
  }
  let [head, [...tail]] = lst;
  while (head) {
    arr.push(head);
    if (!isNull(tail)) {
      [head, [...tail]] = tail;
    } else {
      head = null;
    }
  }
  return arr;
}

// filtering, removing, sorting, and searching
function filter(pred, lst) {
  if (isNull(lst)) {
    return nil;
  }
  const temp1 = toArray(lst);
  const temp2 = temp1.filter(pred);
  return list(...temp2);
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

function sort(compare, lst) {
  if (isNull(lst)) {
    return lst;
  }
  const temp = toArray(lst);
  temp.sort(compare);
  return list(...temp);
}

function member(item, lst) {
  if (isNull(lst)) {
    return lst;
  }
  const temp = toArray(lst);
  const i = temp.indexOf(item);
  if (item > -1) {
    return listTail(lst);
  }
  return nil;
}

function find(item, list) {
  if (isNull(lst)) {
    return lst;
  }
  const temp = toArray(lst);
  const i = temp.indexOf(item);
  if (item > -1) {
    return listRef(i, lst);
  }
  return nil;
}

// list accessors
const first = car;
const head = car;
const rest = cdr;
const tail = cdr;

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

module.exports = {
  nil,
  empty,
  cons,
  list,
  car,
  cdr,
  "null?": isNull,
  "empty?": isEmpty,
  "pair?": isPair,
  "list?": isList,
  length,
  "list-ref": listRef,
  "list-tail": listTail,
  append,
  reverse,
  map,
  foldl,
  fold,
  reduce,
  foldr,
  "reduce-right": reduceRight,
  "to-array": toArray,
  filter,
  remove,
  sort,
  first,
  head,
  rest,
  tail,
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
};
