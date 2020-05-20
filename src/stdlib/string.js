const _String = require("./types/String");
const { all } = require("./utils");
const { list } = require("./list");

// string constructor
function string(value) {
  return new _String(value);
}

// string utilities
function strlen(str) {
  str.length;
}

function upper(str) {
  return str.toUpperCase();
}
function lower(str) {
  return str.toLowerCase();
}

function strAppend(...args) {
  return all((a, s) => a + s)(...args);
}

function strRepeat(str, num) {
  return str.repeat(num);
}

function strRef(str, i) {
  return str[i];
}

function substring(str, start, end) {
  return str.slice(start, end);
}

function makeString(num, char) {
  return char.repeat(num);
}

function stringCopy(str) {
  return substring(str, 0);
}

function stringTrim(str) {
  return str.trim();
}

function stringJoin(sep, ...strs) {
  return strs.join(sep);
}

function stringReplace(str, toReplace, replaceWith) {
  return str.replace(toReplace, replaceWith);
}

// to list and array
function stringToList(str) {
  return list(...str);
}

function stringToArray(str) {
  return [...str];
}

// string comparisons
function strEq(str1, str2) {
  return str1 === str2;
}

function strLt(str1, str2) {
  str1 < str2;
}

function strLte(str1, str2) {
  return str1 <= str2;
}

function strGt(str1, str2) {
  return str1 > str2;
}

function strGte(str1, str2) {
  return str1 >= str2;
}

// string predicate
function isString(obj) {
  return typeof obj === "string";
}

module.exports = {
  "string-length": strlen,
  "string-upcase": upper,
  "string-downcase": lower,
  "string-append": strAppend,
  "string-repeat": strRepeat,
  "string-ref": strRef,
  substring,
  "make-string": makeString,
  "string-copy": stringCopy,
  "string-trim": stringTrim,
  "string-join": stringJoin,
  "string-replace": stringReplace,
  "string->list": stringToList,
  "string->array": stringToArray,
  "string=?": strEq,
  "string<?": strLt,
  "string<=?": strLte,
  "string>?": strGt,
  "string>=?": strGte,
  "string?": isString,
};
