const nil = [];

const cons = (car, cdr) => {
  if (!cdr) {
    cdr = nil;
  }
  return [car, cdr];
};

const list = (...args) => {
  if (!args.length) {
    return nil;
  } else {
    const [head, ...tail] = args;
    return cons(head, list(...tail));
  }
};

const car = (list) => list[0];

const cdr = (list) => {
  const [, [...rest]] = list;
  return rest;
};

const first = car;
const head = car;
const rest = cdr;
const tail = cdr;

const length = (list) => {
  const helper = (total, l) => {
    if (!l || !l.length) {
      return 0;
    } else if (!l[1].length) {
      return total + 1;
    } else {
      return helper(total + 1, cdr(l));
    }
  };
  return helper(0, list);
};

const map = (fn, lst) => {
  if (!lst.length) {
    return nil;
  } else {
    const [head, [...tail]] = lst;
    return cons(fn(head), map(fn, tail));
  }
};

module.exports = {
  cons,
  list,
  car,
  cdr,
  first,
  head,
  rest,
  tail,
  length,
  map,
};

// const nums = list(1, 2, 3, 4, 5);
// const square = (x) => {
//   return x * x;
// };

// console.log(map(square, nums));
