const { Record, merge } = require("immutable");
const equal = require("fast-deep-equal/es6");

function struct(obj, name) {
  return Record(obj, name);
}

// the following 3 functions are for the interpreter
// and may not work as expected in Arith programs
function getStructName(obj) {
  return Record.getDescriptiveName(obj);
}

function getStructField(field, struct) {
  return struct.get(field);
}

function setStructField(field, value, struct) {
  return struct.set(field, value);
}

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
  "get-struct-name": getStructName,
  "get-struct-field": getStructField,
  "set-struct-field": setStructField,
  "struct-eq?": isStructEq,
  "struct-eqv?": isStructEq,
  "struct-equal?": isStructEqual,
  "struct-copy": structCopy,
};
