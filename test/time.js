import { is } from '@magic/test'

import log from '../src/index.js'

export default [
  { fn: log.hrtime(), expect: is.arr, info: 'log.hrtime returns an array' },
  {
    fn: log.hrtime(),
    expect: t => t.length === 2,
    info: 'log.hrtime returns an array with a length of 2',
  },
  {
    fn: log.hrtime(),
    expect: t => is.num(t[0]) && is.num(t[1]),
    info: 'log.hrtime returns 2 numbers in an array',
  },
  {
    fn: log.timeTaken(log.hrtime(), { log: false }),
    expect: is.str,
    info: 'log.timeTaken returns a string',
  },
  {
    fn: is.str(log.timeTaken(log.hrtime(), { log: false })),
    info: 'log.timeTaken logs if log: false is not passed',
  },
  {
    fn: () => log.timeTaken(log.hrtime([0, -500]), { log: false }),
    expect: t => t.endsWith('µs'),
    info: 'log.timeTaken returned string for ~500μs ends with μs',
  },
  {
    fn: () => log.timeTaken(log.hrtime([0, -100], { log: false })),
    expect: t => t.endsWith('µs'),
    info: 'log.timeTaken can count microseconds',
  },
  {
    fn: () => log.timeTaken([-100, 0]),
    expect: t => t.endsWith('s'),
    info: 'log.timeTaken returned strings end with s',
  },
  {
    fn: () => log.timeTaken([-100, 0]),
    expect: t => is.num(parseFloat(t.replace('s', ''))),
    info: 'log.timeTaken returns a number trailed with',
  },
  {
    fn: () => log.timeTaken([-100, 0], { pre: 'testpre', post: 'testpost', log: false }),
    expect: t => t.startsWith('testpre ') && t.endsWith(' testpost'),
    info: 'log.timeTaken pre and post work',
  },
  {
    fn: () => log.timeTaken([-100, 0], { pre: 'testpre', log: false }),
    expect: t => t.startsWith('testpre ') && !t.endsWith(' testpost'),
    info: 'log.timeTaken pre works without post',
  },
  {
    fn: () => log.timeTaken([-100, 0], { post: 'testpost', log: false }),
    expect: t => !t.startsWith('testpre ') && t.endsWith(' testpost'),
    info: 'log.timeTaken post works without pre',
  },
  {
    fn: () => log.timeTaken([-100, 0], { pre: 'testpre"', post: '"testpost', log: false }),
    expect: t => t.startsWith('testpre"') && t.endsWith('"testpost'),
    info: 'log.timeTaken can handle string concats',
  },
]
