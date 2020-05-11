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
  } else {
    const [head, ...tail] = args;
    return cons(head, list(...tail));
  }
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
  } else {
    const [head, [...tail]] = obj;
    return isList(tail);
  }
}

function length(lst) {
  const helper = (total, l) => {
    if (isNull(lst)) {
      return 0;
    } else if (!l[1].length) {
      return total + 1;
    } else {
      return helper(total + 1, cdr(l));
    }
  };
  return helper(0, lst);
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
  } else {
    const [head, [...tail]] = lst;
    return cons(fn(head), map(fn, tail));
  }
}

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
  reverse,
  map,
  filter,
  foldl,
  fold,
  reduce,
  foldr,
  "reduce-right": reduceRight,
};
