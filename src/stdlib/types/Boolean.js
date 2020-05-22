class _Boolean extends Boolean {
  constructor(value) {
    const bool = value === "#f" ? false : true;
    super(bool);
    this.value = bool;
  }

  toString() {
    if (this.value !== false) {
      return "#t";
    }
    return "#f";
  }
}

module.exports = _Boolean;
