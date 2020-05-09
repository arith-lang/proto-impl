const { all } = require("./utils");

// string functions
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

const substring = (str, start, end) => str.slice(start, end);

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

module.exports = {
  "string-length": strlen,
  "string-upcase": upper,
  "string-downcase": lower,
  "string-append": strAppend,
  "string-repeat": strRepeat,
  "string-ref": strRef,
  substring,
  "string-copy": (str) => substring(str, 0),
  "string-trim": (str) => str.trim(),
  "string=?": strEq,
  "string<?": strLt,
  "string<=?": strLte,
  "string>?": strGt,
  "string>=?": strGte,
};
