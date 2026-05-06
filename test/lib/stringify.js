import stringify from '../../src/lib/stringify.js'

export default [
  { fn: () => stringify('test'), expect: 'test', info: 'stringify returns string unchanged' },
  { fn: () => stringify('test', 'test2'), expect: 'test test2', info: 'stringify concatenates two strings' },
  {
    fn: () => stringify({ t: 't' }, 'test2'),
    expect: `${JSON.stringify({ t: 't' })} test2`,
    info: 'stringify JSON.stringifies objects',
  },
  {
    fn: () => stringify([1, 2, 3], 'test2', { t: 't' }),
    expect: `1 2 3 test2 ${JSON.stringify({ t: 't' })}`,
    info: 'stringify handles arrays and objects',
  },
  { fn: () => stringify('t', '', 't2'), expect: 't t2', info: 'stringify handles empty separator' },
  { fn: () => stringify(undefined, 'test2'), expect: 'undefined test2', info: 'stringify handles undefined' },
  { fn: () => stringify(null, 'test2'), expect: 'null test2', info: 'stringify handles null' },
  { fn: () => stringify(null, 'test2'), expect: 'null test2', info: 'stringify handles null again' },
  { fn: () => stringify(() => {}, 't'), expect: `${(() => {}).toString()} t`, info: 'stringify handles functions' },
  { fn: () => stringify([['t']], 't'), expect: 't t', info: 'stringify flattens nested arrays' },
]
