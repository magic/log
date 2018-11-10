const is = require('@magic/types')

const colorize = require('../../src/lib/colorize')

const date = new Date(0)

module.exports = {
  colors: [
    { fn: () => colorize(), expect: is.string },
    { fn: () => colorize(), expect: '' },
    { fn: () => colorize('test'), expect: is.string },
    { fn: () => colorize('test'), expect: colorize('red', 'test') },
    { fn: () => colorize('test', 'test2'), expect: `${colorize('red', 'test')} test2` },
    { fn: () => colorize(['test', '', 'test3']), expect: '\u001b[31mtest\u001b[39m test3' },
    { fn: () => colorize('black', 'STR'), expect: '\u001b[30mSTR\u001b[39m' },
    { fn: () => colorize('red', 'STR'), expect: '\u001b[31mSTR\u001b[39m' },
    { fn: () => colorize('green', 'STR'), expect: '\u001b[32mSTR\u001b[39m' },
    { fn: () => colorize('green', date), expect: `\u001b[32m${date.toString()}\u001b[39m` },
    { fn: () => colorize(['STR', 'STR']), expect: '\u001b[31mSTR\u001b[39m STR' },
    { fn: () => colorize('yellow', 'STR'), expect: '\u001b[33mSTR\u001b[39m' },
    { fn: () => colorize('blue', 'STR'), expect: '\u001b[34mSTR\u001b[39m' },
    { fn: () => colorize('purple', 'STR'), expect: '\u001b[35mSTR\u001b[39m' },
    { fn: () => colorize('cyan', 'STR'), expect: '\u001b[36mSTR\u001b[39m' },
    { fn: () => colorize('white', 'STR'), expect: '\u001b[37mSTR\u001b[39m' },
    { fn: () => colorize('STR', 'yellow', 'STR'), expect: 'STR \u001b[33mSTR\u001b[39m' },
  ],
  formatting: [
    { fn: () => colorize('reset', 'STR'), expect: '\u001b[0mSTR\u001b[0m' },
    { fn: () => colorize('bold', 'STR'), expect: '\u001b[1mSTR\u001b[22m' },
    { fn: () => colorize('italic', 'STR'), expect: '\u001b[3mSTR\u001b[23m' },
    { fn: () => colorize('underline', 'STR'), expect: '\u001b[4mSTR\u001b[24m' },
    { fn: () => colorize('strikethrough', 'STR'), expect: '\u001b[9mSTR\u001b[29m' },
  ],
  arguments: [
    {
      fn: () => colorize('white', 'STR', 'STR', 'STR'),
      expect: '\u001b[37mSTR\u001b[39m STR STR',
      info: 'Color applies to next word',
    },
    {
      fn: () => colorize('white', 'STR', 'green', 'STR'),
      expect: '\u001b[37mSTR\u001b[39m \u001b[32mSTR\u001b[39m',
      info: 'Multiple colors apply to next word',
    },
    {
      fn: () => colorize('yellow', ['STR', 'STR', 'STR']),
      expect: '\u001b[33m\u001b[31mSTR\u001b[39m STR STR\u001b[39m',
      info: 'Arrays get flattened',
    },
    {
      fn: () => colorize('yellow', ['STR'], ['STR', 'STR']),
      expect: '\u001b[33m\u001b[31mSTR\u001b[39m\u001b[39m \u001b[31mSTR\u001b[39m STR',
      info: 'Multiple arguments get flattened. All items of Subarrays get reddened',
    },
    {
      fn: () => colorize('yellow', ['STR'], ['green', 'STR']),
      expect: '\u001b[33m\u001b[31mSTR\u001b[39m\u001b[39m \u001b[32mSTR\u001b[39m',
      info: 'Multiple arguments get flattened. First item of Subarrays gets colored',
    },
    {
      fn: () => colorize('yellow', ['STR'], 'green', { g: 1, r: 2 }),
      expect: '\u001b[33m\u001b[31mSTR\u001b[39m\u001b[39m \u001b[32m{"g":1,"r":2}\u001b[39m',
      info: 'Objects get JSON.stringified and colored',
    },
    {
      fn: () => colorize('yellow', ['STR'], { green: 'green', red: 'red' }),
      expect: '\u001b[33m\u001b[31mSTR\u001b[39m\u001b[39m {"green":"green","red":"red"}',
      info: 'Objects get JSON.stringified and not colored if not specified',
    },
    {
      fn: () => colorize('green', new Date(0)),
      expect: is.string,
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
