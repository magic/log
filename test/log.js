import { is, mock } from '@magic/test'
import log from '../src/index.js'

const beforeAll = () => {
  const oldConsole = console
  global.console = mock.log
  return () => {
    global.console = oldConsole
  }
}

const resetEnvAndLog =
  (env, fn, msg = 'test') =>
  () => {
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

const wrapStringError = () => {
  const logResult = log.error('string error test')
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
    { fn: () => log.warn('testing'), expect: true, info: 'log.warn should return true' },
    { fn: () => log.error('testing'), expect: true, info: 'log.error always returns true' },
    { fn: wrapError, expect: true, info: 'log.error logs Error objects' },
    { fn: wrapStringError, expect: true, info: 'log.error logs string errors' },

    {
      fn: resetEnvAndLog('development', 'info', 'test'),
      expect: true,
      info: 'log.info logs in development',
    },
    {
      fn: resetEnvAndLog('production', 'info', 'test'),
      expect: false,
      info: 'log.info does not log in production',
    },

    {
      fn: resetEnvAndLog('development', 'error', 'test'),
      expect: true,
      info: 'log.error logs in development',
    },
    {
      fn: resetEnvAndLog('production', 'error', 'test'),
      expect: true,
      info: 'log.error logs in production',
    },

    {
      fn: resetEnvAndLog('development', 'warn', 'test'),
      expect: true,
      info: 'log.warn logs in development',
    },
    {
      fn: resetEnvAndLog('production', 'warn', 'test'),
      expect: true,
      info: 'log.warn logs in production',
    },

    {
      fn: resetEnvAndLog('development', 'annotate', 'test'),
      expect: true,
      info: 'log.annotate logs in development',
    },
    {
      fn: resetEnvAndLog('production', 'annotate', 'test'),
      expect: false,
      info: 'log.annotate does not log in production',
    },

    {
      fn: resetEnvAndLog('development', 'time', 'test'),
      expect: true,
      info: 'log.time logs in development',
    },
    {
      fn: resetEnvAndLog('development', 'timeEnd', 'test'),
      expect: true,
      info: 'log.timeEnd logs in development',
    },
    {
      fn: resetEnvAndLog('production', 'time', 'test'),
      expect: true,
      info: 'log.time logs in production',
    },
    {
      fn: resetEnvAndLog('production', 'timeEnd', 'test'),
      expect: true,
      info: 'log.timeEnd logs in production',
    },

    {
      fn: resetLogLevelAndLog(2, 'warn', 'test'),
      expect: false,
      info: 'log.warn does not log at level 2',
    },
    {
      fn: resetLogLevelAndLog(2, 'time', 'test'),
      expect: false,
      info: 'log.time does not log at level 2',
    },
    {
      fn: resetLogLevelAndLog(2, 'timeEnd', 'test'),
      expect: false,
      info: 'log.timeEnd does not log at level 2',
    },

    {
      fn: resetEnvAndLogLevel('production', -1),
      expect: 1,
      info: 'Negative level in production resets to 1',
    },
    {
      fn: resetEnvAndLogLevel('production', 'production'),
      expect: 1,
      info: 'Invalid level resets to 1 in production',
    },
    {
      fn: resetEnvAndLogLevel('development', -1),
      expect: 0,
      info: 'Negative level in development resets to 0',
    },

    {
      fn: () => log.success('Success title', 'extra message'),
      expect: true,
      info: 'log.success logs success messages',
    },
    {
      fn: () => log.color('blue', 'test color'),
      expect: is.string,
      info: 'log.color returns painted string',
    },
    {
      fn: () => log.paint('blue', 'test paint'),
      expect: is.string,
      info: 'log.paint returns painted string',
    },

    {
      fn: () => log.resetLevel('production'),
      expect: 1,
      info: 'log.resetLevel sets level in production',
    },
    {
      fn: () => log.resetLevel('development'),
      expect: 0,
      info: 'log.resetLevel sets level in development',
    },
    { fn: () => log.getLevel(), expect: is.number, info: 'log.getLevel returns current level' },

    {
      fn: () => log.setLevel(null),
      expect: is.number,
      info: 'log.setLevel with null resets level',
    },
    { fn: () => log.setLevel('warn'), expect: 1, info: 'log.setLevel sets level by name' },
    { fn: () => log.setLevel(999), expect: 2, info: 'log.setLevel clamps to max level' },

    { fn: () => log.hrtime(), expect: is.array, info: 'log.hrtime returns array' },
    { fn: () => log.hrtime(), expect: is.len.eq(2), info: 'log.hrtime returns array length 2' },
    {
      fn: () => log.hrtime(),
      expect: ([s]) => is.number(s),
      info: 'hrtime first element is number',
    },
    {
      fn: () => log.hrtime(),
      expect: ([_, ns]) => is.number(ns),
      info: 'hrtime second element is number',
    },

    { fn: generateTime, expect: ([s]) => s === 0, info: 'log.hrtime delta seconds correct' },
    {
      fn: generateTime,
      expect: ([_, ns]) => ns > 1000,
      info: 'log.hrtime delta nanoseconds correct',
    },

    {
      fn: generateTimeLog,
      expect: t => t.endsWith('µs'),
      info: 'log.timeTaken returns µs for short intervals',
    },
    {
      fn: generateLongTimeLog,
      expect: t => t.endsWith('s'),
      info: 'log.timeTaken returns s for long intervals',
    },

    // Edge cases for timeTaken config
    {
      fn: () => log.timeTaken([0, 0], { pre: '"PreQuote"', post: '"PostQuote"' }),
      expect: is.string,
      info: 'log.timeTaken with quoted pre/post',
    },
    {
      fn: () => log.timeTaken([0, 0], 'PreString', 'PostString', false),
      expect: is.string,
      info: 'log.timeTaken with custom strings and no log',
    },
  ],
}
