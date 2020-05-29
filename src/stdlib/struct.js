const { Record, merge } = require("immutable");
const equal = require("fast-deep-equal/es6");

function struct(obj, name) {
  return Record(obj, name);
}

// the following functions are for the interpreter/compiler
// and they may not work as expected in Arith programs
function makeStructConstructor(obj, name) {
  let structFunc = struct(obj, name);
  return function (...args) {
    let params = {};
    Object.keys(obj).forEach((key, i) => {
      if (!args[i]) {
        throw new ArithReferenceError(
          `Invalid number of arguments for struct constructor ${node.name}`,
        );
      }
      params[key] = args[i];
    });
    return structFunc(params);
  };
}

function getStructName(obj) {
  return Record.getDescriptiveName(obj);
}

function getStructField(field, struct) {
  return struct.get(field);
}

function setStructField(field, value, struct) {
  return struct.set(field, value);
}
// end of interpreter-only functions

function isStructEq(struct1, struct2) {
  return Object.is(struct1, struct2);
}

function isStructEqual(struct1, struct2) {
  return equal(struct1.toObject(), struct2.toObject());
}

function structCopy(struct) {
  return merge(struct, {});
}

module.exports = {
  struct,
  "make-struct-constructor": makeStructConstructor,
  "get-struct-name": getStructName,
  "get-struct-field": getStructField,
  "set-struct-field": setStructField,
  "struct-eq?": isStructEq,
  "struct-eqv?": isStructEq,
  "struct-equal?": isStructEqual,
  "struct-copy": structCopy,
};
