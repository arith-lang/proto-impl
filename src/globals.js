const boolean = require("./stdlib/boolean");
const io = require("./stdlib/io");
const decimal = require("./stdlib/decimal");
const string = require("./stdlib/string");
const list = require("./stdlib/list");
const utils = require("./stdlib/utils");
const vector = require("./stdlib/vector");
const hash = require("./stdlib/hash");
const map = require("./stdlib/map");

module.exports = {
  ...boolean,
  ...io,
  ...decimal,
  ...string,
  ...list,
  ...utils,
  ...vector,
  ...hash,
  ...map,
};
