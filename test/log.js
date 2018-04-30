const { is } = require('@magic/test')

const log = require('../src')
const colorize = require('../src/lib/colorize')

const cache = {
  log: [],
  error: [],
  warn: [],
  success: [],
  annotate: [],
}

const consoleMock = {
  log: (...args) => {
    cache.log.push(args)
    return args
  },
  error: (...args) => {
    cache.error.push(args)
    return args
  },
  warn: (...args) => {
    cache.warn.push(args)
    return args
  },
  success: (...args) => {
    cache.success.push(args)
    return args
  },
  annotate: (...args) => {
    cache.annotate.push(args)
    return args
  },
}

const isProd = ['-p', '--prod', '--production'].some(e => process.argv.indexOf(e) > -1)

const dumpCache = () => {
  Object.entries(cache).forEach(([k, v]) => {
    if (k === 'error') {
      while (v.length) {
        console[k](v.shift())
      }
    }
  })
}

const beforeAll = () => {
  global.oldConsole = console
  global.console = consoleMock

  return () => {
    global.console = global.oldConsole

    dumpCache()
  }
}

module.exports = {
  beforeAll,
  tests: [
    {
      fn: () => log.log.toString(),
      expect: log.toString(),
      info: 'log.log is the same function as log',
    },
    { fn: () => log.info('test'), expect: isProd ? false : is.deep.equal(['test']) },
    { fn: () => log.error('test'), expect: is.deep.equal([colorize('test')]) },
    {
      fn: () => log.error('test', 'test2'),
      expect: is.deep.equal([colorize('red', 'test'), 'test2']),
      info: 'Only first argument is red',
    },
    {
      fn: () => log.warn('test', 'test2'),
      expect: is.deep.equal([colorize('yellow', 'test'), 'test2']),
      info: 'Only first argument is yellow',
    },
    {
      fn: () => log.success('test', 'test2'),
      expect: isProd ? false : is.deep.equal([colorize('green', 'test'), 'test2']),
      info: 'Only first argument is green',
    },
    {
      fn: () => log.annotate('test', 'test2'),
      expect: isProd ? false : is.deep.equal([colorize('grey', 'test test2')]),
      info: 'All arguments are grey',
    },
  ],
}
