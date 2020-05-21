class _Boolean extends Boolean {
  constructor(value) {
    super(value);
    this.value = value;
  }

  toString() {
    if (this.value !== false) {
      return "#t";
    }
    return "#f";
  }
}

module.exports = _Boolean;
