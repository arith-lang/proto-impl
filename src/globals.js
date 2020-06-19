const boolean = require("./stdlib/boolean");
const io = require("./stdlib/io");
const decimal = require("./stdlib/decimal");
const string = require("./stdlib/string");
const list = require("./stdlib/list");
const utils = require("./stdlib/utils");
const vector = require("./stdlib/vector");
const hash = require("./stdlib/hash");
const map = require("./stdlib/map");
const struct = require("./stdlib/struct");
const array = require("./stdlib/array");
const math = require("./stdlib/math");

module.exports = {
  ...boolean,
  ...io,
  ...decimal,
  ...string,
  ...list,
  ...utils,
  ...vector,
  ...array,
  ...hash,
  ...map,
  ...struct,
  ...math,
};
