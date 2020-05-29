const { Record } = require("immutable");

function struct(obj) {
  return Record(obj);
}

module.exports = {
  struct,
};
