const stringify = require('../../src/lib/stringify')

module.exports = [
  { fn: () => stringify('test'), expect: 'test' },
  { fn: () => stringify('test', 'test2'), expect: 'test test2' },
  {
    fn: () => stringify({ t: 't' }, 'test2'),
    expect: `${JSON.stringify({ t: 't' })} test2`,
  },
  {
    fn: () => stringify([1, 2, 3], 'test2', { t: 't' }),
    expect: `1 2 3 test2 ${JSON.stringify({ t: 't' })}`,
  },
  { fn: () => stringify('t', '', 't2'), expect: 't t2' },
  { fn: () => stringify(undefined, 'test2'), expect: 'undefined test2' },
  { fn: () => stringify(null, 'test2'), expect: 'null test2' },
  { fn: () => stringify(null, 'test2'), expect: 'null test2' },
  { fn: () => stringify(() => {}, 't'), expect: `${(() => {}).toString()} t` },
]
