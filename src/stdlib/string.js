const v = require("voca");
const _String = require("./types/String");
const Decimal = require("./types/Decimal");
const Char = require("./types/Char");
const { all } = require("./utils");
const { list } = require("./list");
const _Boolean = require("./types/Boolean");

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
  return new Char(v.graphemeAt(str, i));
}

function substring(str, start, end) {
  return string(
    str.chars.slice(start, end).reduce((s, c) => s + c.value, ""),
  );
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
  if (str1 < str2) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

function strLte(str1, str2) {
  if (str1 <= str2) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

function strGt(str1, str2) {
  if (str1 > str2) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

function strGte(str1, str2) {
  if (str1 >= str2) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

// string predicate
function isString(obj) {
  if (_String.isString(obj)) {
    return _Boolean.make("#t");
  }
  return _Boolean.make("#f");
}

// additional string utilities

function camelCase(str) {
  return string(v.camelCase(str));
}

function capitalize(str) {
  return string(v.capitalize(str, true));
}

function decapitalize(str) {
  return string(v.decapitalize(str));
}

function lispCase(str) {
  return string(v.kebabCase(str));
}

function snakeCase(str) {
  return string(v.snakeCase(str));
}

function swapCase(str) {
  return string(v.swapCase(str));
}

function titleCase(str) {
  return string(v.titleCase(str));
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
  "camel-case": camelCase,
  capitalize,
  decapitalize,
  "lisp-case": lispCase,
  "snake-case": snakeCase,
  "swap-case": swapCase,
  "title-case": titleCase,
};
