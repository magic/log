const is = require('@magic/types')

const colorize = require('../src/colorize')

module.exports = {
  colors: [
    { fn: () => colorize(), expect: is.error },
    { fn: () => colorize('test'), expect: is.string },
    { fn: () => colorize('test'), expect: colorize('red', 'test') },
    {
      fn: () => colorize('test', 'test2'),
      expect: colorize('red', 'test test2'),
    },
    {
      fn: () => colorize('black', 'orange'),
      expect: '\u001b[30morange\u001b[39m',
    },
    {
      fn: () => colorize('red', 'orange'),
      expect: '\u001b[31morange\u001b[39m',
    },
    {
      fn: () => colorize('green', 'orange'),
      expect: '\u001b[32morange\u001b[39m',
    },
    {
      fn: () => colorize('yellow', 'orange'),
      expect: '\u001b[33morange\u001b[39m',
    },
    {
      fn: () => colorize('blue', 'orange'),
      expect: '\u001b[34morange\u001b[39m',
    },
    {
      fn: () => colorize('purple', 'orange'),
      expect: '\u001b[35morange\u001b[39m',
    },
    {
      fn: () => colorize('cyan', 'orange'),
      expect: '\u001b[36morange\u001b[39m',
    },
    {
      fn: () => colorize('white', 'orange'),
      expect: '\u001b[37morange\u001b[39m',
    },
  ],
  formatting: [
    {
      fn: () => colorize('reset', 'orange'),
      expect: '\u001b[0morange\u001b[0m',
    },
    {
      fn: () => colorize('bold', 'orange'),
      expect: '\u001b[1morange\u001b[22m',
    },
    {
      fn: () => colorize('italic', 'orange'),
      expect: '\u001b[3morange\u001b[23m',
    },
    {
      fn: () => colorize('underline', 'orange'),
      expect: '\u001b[4morange\u001b[24m',
    },
    {
      fn: () => colorize('strikethrough', 'orange'),
      expect: '\u001b[9morange\u001b[29m',
    },
  ],
  arguments: [
    {
      fn: () => colorize('white', 'orange', 'green', 'red'),
      expect: '\u001b[37morange green red\u001b[39m',
    },
    {
      fn: () => colorize('white', ['orange', 'green', 'red']),
      expect: '\u001b[37morange green red\u001b[39m',
      info: 'Arrays get flattened',
    },
    {
      fn: () => colorize('white', ['orange'], ['green', 'red']),
      expect: '\u001b[37morange green red\u001b[39m',
      info: 'Multiple arguments get flattened',
    },
    {
      fn: () => colorize('white', ['orange'], { green: 'green', red: 'red' }),
      expect: '\u001b[37morange {"green":"green","red":"red"}\u001b[39m',
      info: 'Objects get JSON.stringified',
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
      fn: () => colorize('', 'default color is red'),
      expect: colorize('red', 'default color is red'),
      info: 'Default color is red',
    },
  ],
}
