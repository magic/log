const { is, mock, isProd } = require('@magic/test')

const log = require('../src')
// const colorize = require('../src/lib/colorize')

const beforeAll = () => {
  global.oldConsole = console
  global.console = mock.log

  return () => {
    global.console = global.oldConsole
  }
}

const resetEnvAndLog = (env, fn, msg = 'test') => () => {
  const oldEnv = process.env.NODE_ENV
  process.env.NODE_ENV = env
  log.setLevel()
  const logResult = log[fn](msg)
  process.env.NODE_ENV = oldEnv
  return logResult
}

const resetLogLevelAndLog = (lvl, fn, msg) => () => {
  const oldLevel = log.level
  log.setLevel(lvl)
  const logResult = log[fn](msg)
  log.setLevel(oldLevel)
  return logResult
}

const resetEnvAndLogLevel = (env, level) => () => {
  const oldEnv = process.env.NODE_ENV
  process.env.NODE_ENV = env
  log.setLevel(level)
  process.env.NODE_ENV = oldEnv
  return log.getLevel()
}


const wrapError = () => {
  const logResult = log.error(new Error('test'))
  return logResult
}

module.exports = {
  beforeAll,
  tests: [
    {
      fn: () => log.log.toString(),
      expect: log.toString(),
      info: 'log.log and log are the same function',
    },
    {
      fn: resetEnvAndLog('development', 'info', 'test'),
      expect: true,
      info: 'log.info in development logs',
    },
    {
      fn: resetEnvAndLog('production', 'info', 'test'),
      expect: false,
      info: 'log.info in production does not log',
    },
    {
      fn: resetEnvAndLog('development', 'error', 'test'),
      expect: true,
      info: 'log.error in development logs',
    },
    {
      fn: resetEnvAndLog('production', 'error', 'test'),
      expect: true,
      info: 'log.error in production logs',
    },
    {
      fn: resetEnvAndLog('development', 'warn', 'test'),
      expect: true,
      info: 'log.warn in development logs',
    },
    {
      fn: resetEnvAndLog('production', 'warn', 'test'),
      expect: true,
      info: 'log.warn in production logs',
    },
    {
      fn: resetEnvAndLog('development', 'annotate', 'test'),
      expect: true,
      info: 'log.annotate in development logs',
    },
    {
      fn: resetEnvAndLog('production', 'annotate', 'test'),
      expect: false,
      info: 'log.error in production does not log',
    },
    {
      fn: resetEnvAndLog('development', 'time', 'test'),
      expect: true,
      info: 'calling log.time in development logs',
    },
    {
      fn: resetEnvAndLog('development', 'timeEnd', 'test'),
      expect: true,
      info: 'calling log.timeEnd in development logs',
    },
    {
      fn: resetEnvAndLog('production', 'time', 'test'),
      expect: true,
      info: 'calling log.time in production logs',
    },
    {
      fn: resetEnvAndLog('production', 'timeEnd', 'test'),
      expect: true,
      info: 'calling log.timeEnd in production logs',
    },
    {
      fn: resetLogLevelAndLog(2, 'warn', 'test'),
      expect: false,
      info: 'calling log.warn in logLevel 2 does not log',
    },
    {
      fn: resetLogLevelAndLog(2, 'time', 'test'),
      expect: false,
      info: 'log.time in logLevel 2 does not log',
    },
    {
      fn: resetLogLevelAndLog(2, 'timeEnd', 'test'),
      expect: false,
      info: 'log.timeEnd in logLevel 2 does not log',
    },
    {
      fn: resetEnvAndLogLevel('production', -1),
      expect: 1,
      info: 'calling setLogLevel with -1 defaults to 0',
    },
    {
      fn: resetEnvAndLogLevel('production', 'production'),
      expect: 1,
      info: 'calling setLogLevel with -1 defaults to 0',
    },
    {
      fn: resetEnvAndLogLevel('development', -1),
      expect: 0,
      info: 'dev: calling setLogLevel with -1 defaults to 1',
    },
    {
      fn: wrapError,
      expect: true,
      info: 'errors can log',
    },
  ],
}
