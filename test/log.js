const { is, mock } = require('@magic/test')

const log = require('../src')
const colorize = require('../src/lib/colorize')

const beforeAll = () => {
  global.oldConsole = console
  global.console = mock.log

  return () => {
    global.console = global.oldConsole
  }
}

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  beforeAll,
  tests: [
    {
      fn: () => log.log.toString(),
      expect: log.toString(),
      info: 'log.log is the same function as log',
    },
    { fn: () => log.info('test'), expect: isProd ? false : is.deep.equal(['test']) },
    {
      fn: () => log.annotate('test', 'test2'),
      expect: isProd ? false : undefined,
      info: 'All arguments are grey',
    },
  ],
}
