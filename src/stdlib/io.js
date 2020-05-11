const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");
const { list } = require("./list");
const toString = require("./list")["list->string"];
const isList = require("./list")["list?"];

// I/O functions
function log(...args) {
  console.log(...args);
}

function print(...args) {
  let temp = [];
  for (item of args) {
    if (isList(item)) {
      temp.push(toString(item));
    } else {
      temp.push(item.toString());
    }
  }
  console.log(...temp);
}

const outputString = print;

function input(prompt) {
  return readlineSync.question(prompt);
}

const inputString = input;

// Working with files
// Encoding only necessary if text file
function inputFileRead(file, encoding) {
  const realPath = /^\./.test(file)
    ? path.join(process.cwd(), file)
    : file;
  return fs.readFileSync(realPath, encoding);
}

function outputFileWrite(file, data, encoding) {
  const realPath = /^\./.test(file)
    ? path.join(process.cwd(), file)
    : file;
  fs.writeFileSync(realPath, data, encoding);
}

module.exports = {
  log,
  print,
  "output-string": outputString,
  input,
  "input-string": input,
  "input-file-read": inputFileRead,
  "output-file-write": outputFileWrite,
};
