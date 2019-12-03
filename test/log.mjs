import { is, mock, isProd } from '@magic/test'

import log from '../src/index.mjs'

const beforeAll = () => {
  const oldConsole = console
  global.console = mock.log

  return () => {
    global.console = oldConsole
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

const generateTime = async () => {
  const [s, ns] = log.hrtime()
  return log.hrtime([s, ns - 1000])
}

const generateTimeLog = async () => {
  const [s, ns] = log.hrtime()
  return log.timeTaken([s, ns - 10000])
}

const generateLongTimeLog = async () => {
  const [s, ns] = log.hrtime()
  return log.timeTaken([s, ns - 2000000])
}

export default {
  beforeAll,
  tests: [
    {
      fn: () => log.log.toString(),
      expect: log.toString(),
      info: 'log.log and log are the same function',
    },
    {
      fn: () => log.warn('testing'),
      expect: true,
      info: 'log.warn returns true in all cases',
    },
    {
      fn: () => log.error('testing'),
      expect: true,
      info: 'log.error returns true in both environments',
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
      info: 'prod: calling setLogLevel in production with -1 defaults to 1',
    },
    {
      fn: resetEnvAndLogLevel('production', 'production'),
      expect: 1,
      info: 'prod: calling setLogLevel with -1 defaults to 1',
    },
    {
      fn: resetEnvAndLogLevel('development', -1),
      expect: 0,
      info: 'dev: calling setLogLevel with -1 defaults to 0',
    },
    {
      fn: wrapError,
      expect: true,
      info: 'errors can log',
    },
    { fn: log.hrtime(), expect: is.array, info: 'log.hrtime returns an array' },
    { fn: log.hrtime(), expect: is.len.eq(2), info: 'log.hrtime returns an array' },
    {
      fn: log.hrtime(),
      expect: ([s]) => is.number(s),
      info: 'log.hrtime returns a number as first array val',
    },
    {
      fn: log.hrtime(),
      expect: ([_, ns]) => is.number(ns),
      info: 'log.hrtime returns a number as second array val',
    },
    {
      fn: generateTime,
      expect: ([s]) => s === 0,
      info: 'log.hrtime returns the delta if given an arg',
    },
    {
      fn: generateTime,
      expect: ([_, ns]) => ns > 1000,
      info: 'log.hrtime returns the delta in ns',
    },
    {
      fn: generateTimeLog,
      expect: t => t.endsWith('ms'),
      info: 'log.timeTaken returns the delta in ns',
    },
    {
      fn: generateLongTimeLog,
      expect: t => t.endsWith('s'),
      info: 'log.timeTaken returns the delta in ns',
    },
  ],
}
