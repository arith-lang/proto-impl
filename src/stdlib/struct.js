const { Record } = require("immutable");

function struct(obj, name) {
  return Record(obj, name);
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

function isStructEq(struct1, struct2) {
  return Object.is(struct1, struct2);
}

function isStructEqual(struct1, struct2) {
  return struct1.equals(struct2);
}

module.exports = {
  struct,
  "get-struct-name": getStructName,
  "get-struct-field": getStructField,
  "set-struct-field": setStructField,
  "struct-update": setStructField,
  "struct-eq?": isStructEq,
  "struct-eqv?": isStructEq,
  "struct-equal?": isStructEqual,
};
