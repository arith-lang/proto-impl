const _String = require("./types/String");
const Decimal = require("./types/Decimal");
const Char = require("./types/Char");
const { all } = require("./utils");
const { list } = require("./list");

// string constructor
function string(value) {
  return new _String(value);
}

// string utilities
function strlen(str) {
  return new Decimal(v.countGraphemes(str));
}

function upper(str) {
  return string(str.toUpperCase());
}

function lower(str) {
  return string(str.toLowerCase());
}

function strAppend(...args) {
  return string(all((a, s) => a + s)(...args));
}

function strRepeat(str, num) {
  return string(str.repeat(num));
}

function strRef(str, i) {
  return string(str[i]);
}

function substring(str, start, end) {
  return string(str.slice(start, end));
}

function makeString(num, char) {
  return string(char.repeat(num));
}

function stringCopy(str) {
  return string(substring(str, 0));
}

function stringTrim(str) {
  return string(str.trim());
}

function stringJoin(sep, ...strs) {
  return string(strs.join(sep));
}

function stringReplace(str, toReplace, replaceWith) {
  return string(str.replace(toReplace, replaceWith));
}

// to list and array
function stringToList(str) {
  return str.toCharList();
}

function stringToArray(str) {
  return str.toCharArray();
}

// string comparisons
function strEq(str1, str2) {
  return str1.isEq(str2);
}

function strLt(str1, str2) {
  return str1 < str2;
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
  return _String.isString(obj);
}

module.exports = {
  string,
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
