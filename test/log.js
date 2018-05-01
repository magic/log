const { is, mock, isProd } = require('@magic/test')

const log = require('../src')
const colorize = require('../src/lib/colorize')

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

module.exports = {
  beforeAll,
  tests: [
    { fn: () => log.log.toString(), expect: log.toString(), info: 'function eq. log.log === log' },
    { fn: resetEnvAndLog('development', 'info', 'test'), expect: true },
    { fn: resetEnvAndLog('production', 'info', 'test'), expect: false },
    { fn: resetEnvAndLog('development', 'error', 'test'), expect: true },
    { fn: resetEnvAndLog('production', 'error', 'test'), expect: true },
    { fn: resetEnvAndLog('development', 'warn', 'test'), expect: true },
    { fn: resetEnvAndLog('production', 'warn', 'test'), expect: true },
    { fn: resetEnvAndLog('development', 'annotate', 'test'), expect: true },
    { fn: resetEnvAndLog('production', 'annotate', 'test'), expect: false },
    { fn: resetLogLevelAndLog(2, 'warn', 'test'), expect: false },
  ],
}
