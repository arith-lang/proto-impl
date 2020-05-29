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

module.exports = {
  struct,
  "get-struct-name": getStructName,
  "get-struct-field": getStructField,
  "set-struct-field": setStructField,
  "struct-update": setStructField,
};
