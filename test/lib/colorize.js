const is = require('@magic/types')

const colorize = require('../../src/lib/colorize')

module.exports = {
  colors: [
    { fn: () => colorize(), expect: is.string },
    { fn: () => colorize(), expect: '' },
    { fn: () => colorize('test'), expect: is.string },
    { fn: () => colorize('test'), expect: colorize('red', 'test') },
    { fn: () => colorize('test', 'test2'), expect: `${colorize('red', 'test')} test2` },
    { fn: () => colorize('black', 'STRING'), expect: '\u001b[30mSTRING\u001b[39m' },
    { fn: () => colorize('red', 'STRING'), expect: '\u001b[31mSTRING\u001b[39m' },
    { fn: () => colorize('green', 'STRING'), expect: '\u001b[32mSTRING\u001b[39m' },
    {
      fn: () => colorize('yellow', 'STRING'),
      expect: '\u001b[33mSTRING\u001b[39m',
    },
    {
      fn: () => colorize('blue', 'STRING'),
      expect: '\u001b[34mSTRING\u001b[39m',
    },
    {
      fn: () => colorize('purple', 'STRING'),
      expect: '\u001b[35mSTRING\u001b[39m',
    },
    {
      fn: () => colorize('cyan', 'STRING'),
      expect: '\u001b[36mSTRING\u001b[39m',
    },
    {
      fn: () => colorize('white', 'STRING'),
      expect: '\u001b[37mSTRING\u001b[39m',
    },
  ],
  formatting: [
    {
      fn: () => colorize('reset', 'STRING'),
      expect: '\u001b[0mSTRING\u001b[0m',
    },
    {
      fn: () => colorize('bold', 'STRING'),
      expect: '\u001b[1mSTRING\u001b[22m',
    },
    {
      fn: () => colorize('italic', 'STRING'),
      expect: '\u001b[3mSTRING\u001b[23m',
    },
    { fn: () => colorize('underline', 'STRING'), expect: '\u001b[4mSTRING\u001b[24m' },
    { fn: () => colorize('strikethrough', 'STRING'), expect: '\u001b[9mSTRING\u001b[29m' },
  ],
  arguments: [
    {
      fn: () => colorize('white', 'STRING', 'STRING', 'STRING'),
      expect: '\u001b[37mSTRING\u001b[39m STRING STRING',
      info: 'Color applies to next word',
    },
    {
      fn: () => colorize('white', 'STRING', 'green', 'STRING'),
      expect: '\u001b[37mSTRING\u001b[39m \u001b[32mSTRING\u001b[39m',
      info: 'Multiple colors apply to next word',
    },
    {
      fn: () => colorize('white', ['STRING', 'STRING', 'STRING']),
      expect: '\u001b[31mSTRING\u001b[39m STRING STRING',
      info: 'Arrays get flattened',
    },
    {
      fn: () => colorize('white', ['STRING'], ['STRING', 'STRING']),
      expect: '\u001b[31mSTRING\u001b[39m \u001b[31mSTRING\u001b[39m STRING',
      info: 'Multiple arguments get flattened. First item of Subarrays gets reddened',
    },
    {
      fn: () => colorize('white', ['STRING'], ['green', 'STRING']),
      expect: '\u001b[31mSTRING\u001b[39m \u001b[32mSTRING\u001b[39m',
      info: 'Multiple arguments get flattened. First item of Subarrays gets colored',
    },
    {
      fn: () => colorize('white', ['STRING'], 'green', { green: 'green', red: 'red' }),
      expect: '\u001b[31mSTRING\u001b[39m \u001b[32m{"green":"green","red":"red"}\u001b[39m',
      info: 'Objects get JSON.stringified and colored',
    },
    {
      fn: () => colorize('white', ['STRING'], { green: 'green', red: 'red' }),
      expect: '\u001b[31mSTRING\u001b[39m {"green":"green","red":"red"}',
      info: 'Objects get JSON.stringified and not colored if not specified',
    },
    {
      fn: () => colorize('green', new Date(0)),
      expect: '\u001b[32mThu Jan 01 1970 01:00:00 GMT+0100 (CET)\u001b[39m',
      info: 'Dates get toStringed',
    },
    {
      fn: () => colorize('green', () => {}),
      expect: '\u001b[32m() => {}\u001b[39m',
      info: 'Functions get toStringed',
    },
    {
      fn: () => colorize('default color is Red'),
      expect: colorize('red', 'default color is Red'),
      info: 'Default color is red',
    },
  ],
}
