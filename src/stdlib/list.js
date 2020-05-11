const nil = [];

function cons(car, cdr) {
  if (!cdr) {
    cdr = nil;
  }
  return [car, cdr];
}

function list(...args) {
  if (!args.length) {
    return nil;
  }
  const [head, ...tail] = args;
  return cons(head, list(...tail));
}

function car(list) {
  return list[0];
}

function cdr(list) {
  const [, [...rest]] = list;
  return rest;
}

const first = car;
const head = car;
const rest = cdr;
const tail = cdr;

function isNull(obj) {
  return obj instanceof Array && obj.length === 0;
}

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

function map(fn, lst) {
  if (isNull(lst)) {
    return nil;
  }
  const temp1 = toArray(lst);
  const temp2 = temp1.map(fn);
  return list(...temp2);
}

function filter(pred, lst) {
  if (isNull(lst)) {
    return nil;
  }
  const temp1 = toArray(lst);
  const temp2 = temp1.filter(pred);
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

module.exports = {
  cons,
  list,
  car,
  cdr,
  first,
  head,
  rest,
  tail,
  "null?": isNull,
  "pair?": isPair,
  "list?": isList,
  length,
  "list-ref": listRef,
  "list-tail": listTail,
  append,
  reverse,
  map,
  filter,
  foldl,
  fold,
  reduce,
  foldr,
  "reduce-right": reduceRight,
  "to-array": toArray,
  remove,
  sort,
};
