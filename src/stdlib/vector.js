const L = require("list");

function vector(...args) {
  return L.list(...args);
}

function isVector(obj) {
  return obj.constructor.name === "List";
}

module.exports = {
  vector,
  "vector?": isVector,
};
