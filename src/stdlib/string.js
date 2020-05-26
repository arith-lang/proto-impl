const v = require("voca");
const _String = require("./types/String");
const Decimal = require("./types/Decimal");
const Char = require("./types/Char");
const _Boolean = require("./types/Boolean");
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

function strRepeat(num, str) {
  return string(str.repeat(num));
}

function strRef(i, str) {
  return new Char(v.graphemeAt(str, i));
}

function substring(start, end, str) {
  return string(
    str.chars.slice(start, end).reduce((s, c) => s + c.value, ""),
  );
}

function stringFirst(num, str) {
  return substring(str, 0, num);
}

function stringLast(num, str) {
  return substring(str, str.chars.length - num, str.chars.length);
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

function stringReplace(toReplace, replaceWith, str) {
  return string(str.replace(toReplace, replaceWith));
}

// to list and array
function stringToList(str) {
  return str.toCharList();
}

function stringToArray(str) {
  return str.toCharArray();
}

function stringToVector(str) {
  return str.toCharVector();
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
  return _String.isString(obj);
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

function countWords(str) {
  return new Decimal(v.countWords(str));
}

function escapeHtml(str) {
  return string(v.escapeHtml(str));
}

function escapeRegex(str) {
  return string(v.escapeRegExp(str));
}

function unescapeHtml(str) {
  return string(v.unescapeHtml(str));
}

function stringReverse(str) {
  return string(v.reverseGrapheme(str));
}

function slugify(str) {
  return string(v.slugify(str));
}

function stringInsert(insert, pos, str) {
  return string(v.insert(str, insert, pos));
}

function latinize(str) {
  return string(v.latinise(str));
}

function padleft(length, pad, str) {
  return string(v.padLeft(str, length, pad));
}

function padright(length, pad, str) {
  return string(v.padRight(str, length, pad));
}

function wordWrap(width, str) {
  return string(v.wordWrap(str, { width, newLine: "\n" }));
}

function wordWrapWith(width, wrap, str) {
  return string(v.wordWrap(str, { width, newLine: wrap }));
}

function stringSplitChars(str) {
  return str.toCharList();
}

function stringSplit(sep, str) {
  return list(...v.split(str, sep));
}

function splitWords(str) {
  return string(v.words(str));
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
  "string-first": stringFirst,
  "string-last": stringLast,
  "make-string": makeString,
  "string-copy": stringCopy,
  "string-trim": stringTrim,
  "string-join": stringJoin,
  "string-replace": stringReplace,
  "string->list": stringToList,
  "string->array": stringToArray,
  "string->vector": stringToVector,
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
  "count-words": countWords,
  "escape-html": escapeHtml,
  "escape-regex": escapeRegex,
  "unescape-html": unescapeHtml,
  "string-reverse": stringReverse,
  slugify,
  "string-insert": stringInsert,
  latinize,
  "pad-left": padleft,
  "pad-right": padright,
  "word-wrap": wordWrap,
  "word-wrap-with": wordWrapWith,
  "string-split-chars": stringSplitChars,
  "string-split": stringSplit,
  "split-words": splitWords,
};
