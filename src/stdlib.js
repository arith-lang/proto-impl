const system = require("./stdlib/system");
const io = require("./stdlib/io");
const decimal = require("./stdlib/decimal");
const string = require("./stdlib/string");
const list = require("./stdlib/list");
const utils = require("./stdlib/utils");
const vector = require("./stdlib/vector");

module.exports = {
  ...system,
  ...io,
  ...decimal,
  ...string,
  ...list,
  ...utils,
  ...vector,
};
