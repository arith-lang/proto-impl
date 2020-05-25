class _Boolean extends Boolean {
  constructor(value) {
    const bool = _Boolean.shouldReturnFalse(value) ? false : true;
    super(bool);
    this.value = value;
    this.bool = bool;
    this.isEq = this.isEq.bind(this);
    this.isEqv = this.isEq;
    this.isEqual = this.isEq;
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
      (value.constructor && value.constructor.name === "Nil") || // to prevent circular dependency by importing null-native? from list
      (_Boolean.isBool(value) && value.bool === false)
    );
  }

  static isBool(obj) {
    return obj.constructor && obj.constructor.name === "_Boolean"
      ? new _Boolean("#t")
      : new _Boolean("#f");
  }

  isEq(other) {
    if (_Boolean.isBoolNative(other)) {
      if (
        (this.value === "#t" && other.value === "#t") ||
        (this.value === "#f" && other.value === "#f")
      ) {
        return _Boolean.make("#t");
      }
    }
    return _Boolean.make("#f");
  }

  toString() {
    return `${this.value}`;
  }
}

module.exports = _Boolean;
