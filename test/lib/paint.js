import { is } from '@magic/test'
import paint, { codes } from '../../src/lib/paint.js'

export default [
  { fn: () => paint, expect: is.function, info: 'paint should be a function' },

  {
    fn: () => paint(123, 'test'),
    expect: '\u001b[31mtest\u001b[39m',
    info: 'paint with number key uses default red',
  },
  {
    fn: () => paint('yell', 'test'),
    expect: '\u001b[31mtest\u001b[39m',
    info: 'paint with invalid key uses default red',
  },
  { fn: () => paint('', ''), expect: '', info: 'paint with empty string returns empty string' },
  {
    fn: () => paint(undefined, ''),
    expect: '',
    info: 'paint with undefined key returns empty string',
  },

  // Cover valid keys
  ...Object.keys(codes).map(key => ({
    fn: () => paint(key, 'test'),
    expect: `\u001b[${codes[key][0]}mtest\u001b[${codes[key][1]}m`,
    info: `paint with valid key "${key}" applies correct ANSI codes`,
  })),

  // Cover alias functions
  ...Object.keys(codes).map(key => ({
    fn: () => paint[key]('alias test'),
    expect: `\u001b[${codes[key][0]}malias test\u001b[${codes[key][1]}m`,
    info: `paint.${key} applies correct ANSI codes`,
  })),

  // Cover array input
  {
    fn: () => paint('blue', ['hello', 'world']),
    expect: '\u001b[34mhello world\u001b[39m',
    info: 'paint with array joins elements with space',
  },

  // Cover empty array input
  { fn: () => paint('blue', []), expect: '', info: 'paint with empty array returns empty string' },

  // Cover paint.codes property
  { fn: () => paint.codes, expect: codes, info: 'paint.codes exposes ANSI codes object' },
]
