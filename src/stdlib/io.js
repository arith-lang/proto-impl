const fs = require("fs");
const path = require("path");
const ffi = require("ffi-napi");
const toString = require("./list")["list->string"];
const isList = require("./list")["list?"];
const hashToString = require("./hash")["hash->string"];
const isHash = require("./hash")["hash?"];
const mapToString = require("./map")["map->string"];
const isMap = require("./map")["map?"];
const vectorToString = require("./vector")["vector->string"];
const isVector = require("./vector")["vector?"];
const arrayToString = require("./array")["array->string"];
const isArray = require("./array")["array?"];

// I/O functions
function jsLog(...args) {
  console.log(...args);
}

function outputString(...args) {
  let temp = [];
  for (item of args) {
    if (
      item ||
      item === 0 ||
      item === "" ||
      item === false ||
      item === null
    ) {
      if (isList(item)) {
        temp.push(toString(item));
      } else if (isHash(item)) {
        temp.push(hashToString(item));
      } else if (isMap(item)) {
        temp.push(mapToString(item));
      } else if (isVector(item)) {
        temp.push(vectorToString(item));
      } else if (isArray(item)) {
        temp.push(arrayToString(item));
      } else if (typeof item === "boolean") {
        temp.push(item === true ? "#t" : "#f");
      } else {
        temp.push(item.toString());
      }
    }
  }
  return temp.join("");
}

function print(...args) {
  console.log(outputString(...args));
}

function input(prompt) {
  const rllib = ffi.Library("libreadline", {
    readline: ["string", ["string"]],
  });

  return rllib.readline(prompt.toString());
}

const inputString = input;

// Working with files
// Encoding only necessary if text file
// TODO: make these work with absolute paths as args
function readFile(file, encoding = "utf-8") {
  const realPath = /^\./.test(file)
    ? path.join(process.cwd(), file)
    : file;
  return fs.readFileSync(realPath, encoding);
}

function writeFile(file, data, encoding = "utf-8") {
  const realPath = /^\./.test(file)
    ? path.join(process.cwd(), file)
    : file;
  print(`Writing to ${file}...`);
  fs.writeFileSync(realPath, data, encoding);
}

module.exports = {
  "js-log": jsLog,
  "output-string": outputString,
  print,
  input,
  "input-string": inputString,
  "read-file": readFile,
  "write-file": writeFile,
};
