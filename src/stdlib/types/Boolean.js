class _Boolean extends Boolean {
  constructor(value) {
    const bool = value === "#f" ? false : true;
    super(bool);
    this.value = value;
    this.bool = bool;
  }

  toString() {
    return `${this.value}`;
  }
}

module.exports = _Boolean;
