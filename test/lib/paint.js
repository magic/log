const { is } = require('@magic/test')

const paint = require('../../src/lib/paint')

module.exports = [
  { fn: () => paint, expect: is.function },
  { fn: paint(123, 'test'), expect: '\u001b[31mtest\u001b[39m' },
  { fn: paint('yell', 'test'), expect: '\u001b[31mtest\u001b[39m' },
  { fn: paint('', ''), expect: '' },
  { fn: paint(undefined, ''), expect: '' },
]
