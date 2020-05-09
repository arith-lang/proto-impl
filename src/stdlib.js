const system = require("./stdlib/system");
const io = require("./stdlib/io");
const number = require("./stdlib/number");
const string = require("./stdlib/string");
const list = require("./stdlib/list");

module.exports = {
  ...system,
  ...io,
  ...number,
  ...string,
  ...list,
};
