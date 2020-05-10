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

function length(list) {
  const helper = (total, l) => {
    if (isNull(list)) {
      return 0;
    } else if (!l[1].length) {
      return total + 1;
    } else {
      return helper(total + 1, cdr(l));
    }
  };
  return helper(0, list);
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
  length,
  map,
  filter,
  foldl,
  fold,
  reduce,
};
