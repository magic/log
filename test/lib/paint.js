const { is } = require('@magic/test')

const paint = require('../../src/lib/paint')

module.exports = [
  { fn: () => paint, expect: is.function },
  { fn: () => paint, expect: is.function },
]
