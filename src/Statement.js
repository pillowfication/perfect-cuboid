const TRUE = 1
const FALSE = -1
const UNKNOWN = 0

module.exports = class Statement {
  constructor (side, truth = true) {
    this.side = side

    if (truth) {
      this.truth = TRUE
      this.not = new Statement(side, false)
    } else {
      this.truth = FALSE
    }
  }

  get d2 () { return { side: this.side, truth: this.truth, divisibility: 'd2' } }
  get d3 () { return { side: this.side, truth: this.truth, divisibility: 'd3' } }
  get d4 () { return { side: this.side, truth: this.truth, divisibility: 'd4' } }
  get d5 () { return { side: this.side, truth: this.truth, divisibility: 'd5' } }

  static get x () { return new Statement(0) }
  static get y () { return new Statement(1) }
  static get z () { return new Statement(2) }

  static get TRUE () { return TRUE }
  static get FALSE () { return FALSE }
  static get UNKNOWN () { return UNKNOWN }
}
