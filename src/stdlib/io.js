const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");
const toString = require("./list")["list->string"];
const isList = require("./list")["list?"];
const hashToString = require("./hash")["hash->string"];
const isHash = require("./hash")["hash?"];
const mapToString = require("./map")["map->string"];
const isMap = require("./map")["map?"];

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
      } else if (typeof item === "boolean") {
        console.log("bool");
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
  return readlineSync.question(prompt);
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
