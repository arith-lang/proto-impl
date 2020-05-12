const system = require("./stdlib/system");
const io = require("./stdlib/io");
const number = require("./stdlib/number");
const string = require("./stdlib/string");
const list = require("./stdlib/list");
const utils = require("./stdlib/utils");
const vector = require("./stdlib/vector");

module.exports = {
  ...system,
  ...io,
  ...number,
  ...string,
  ...list,
  ...utils,
  ...vector,
};
