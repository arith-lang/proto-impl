const isNull = require("../list")["null?"];

class _Boolean extends Boolean {
  constructor(value) {
    const bool = _Boolean.shouldReturnFalse(value) ? false : true;
    super(bool);
    this.value = value;
    this.bool = bool;
  }

  static make(value) {
    return _Boolean.shouldReturnFalse(value)
      ? new _Boolean("#f")
      : new _Boolean("#t");
  }

  static isBoolNative(obj) {
    return obj.constructor.name === "_Boolean";
  }

  static shouldReturnFalse(value) {
    return (
      value === false ||
      value === "#f" ||
      value == undefined ||
      isNull(value) ||
      (_Boolean.isBool(value) && value.bool === false)
    );
  }

  static isBool(obj) {
    return obj.constructor.name === "_Boolean"
      ? new _Boolean("#t")
      : new _Boolean("#f");
  }

  toString() {
    return `${this.value}`;
  }
}

module.exports = _Boolean;
