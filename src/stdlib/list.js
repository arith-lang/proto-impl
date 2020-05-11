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
  } else {
    const [head, [...tail]] = lst;
    return cons(fn(head), map(fn, tail));
  }
}

function foldl(fn, accum, lst) {
  if (isNull(lst)) {
    return accum;
  }
  const [head, [...tail]] = lst;
  return foldl(fn, fn(accum, head), tail);
}

const fold = foldl;
const reduce = foldl;

function foldr(fn, accum, lst) {
  const temp = reverse(lst);
  return foldl(fn, accum, temp);
}

const reduceRight = foldr;

// conversion functions
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

function toString(lst) {
  if (isNull(lst)) {
    return `'()`;
  }
  let arr = toArray(lst);
  let str = `'(`;
  for (const [i, item] of arr.entries()) {
    if (isList(item)) {
      str += toString(item);
    } else {
      if (i === arr.length - 1) {
        str += `${item.toString()})`;
      } else {
        str += `${item.toString()} `;
      }
    }
  }
  return str;
}

console.log(toString(list(1, 2, 3, 4, 5, 6, 7)));

// filtering, removing, sorting, and searching
function filter(pred, lst) {
  if (isNull(lst)) {
    return nil;
  }
  const [head, [...tail]] = lst;
  if (pred(head) !== false) {
    return cons(head, filter(pred, tail));
  } else {
    return filter(pred, tail);
  }
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

// take and drop
function take(num, lst) {
  if (isNull(lst)) {
    return lst;
  }
  let temp = [];
  let [head, [...tail]] = lst;
  let c = 0;
  while (head && c < num) {
    temp.push(head);
    if (!isNull(tail)) {
      [head, [...tail]] = tail;
      c++;
    } else {
      head = null;
    }
  }
  return list(...temp);
}

function drop(num, lst) {
  if (isNull(lst) || length(lst) <= num) {
    return nil;
  }
  let temp1 = toArray(lst);
  let temp2 = temp1.slice(num);
  return list(...temp2);
}

// range
function range(...args) {
  if (args.length === 1) {
    let range = Array.from(new Array(args[0]), (c, i) => i);
    return list(...range);
  } else if (args.length === 2) {
    let range = Array.from(
      new Array(args[1] - 1),
      (c, i) => i + args[0],
    );
    return list(...range);
  }
  throw new RangeError("Invalid arguments to range function");
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
  "to-string": toString,
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
  take,
  drop,
  range,
};
