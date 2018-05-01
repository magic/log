const { is } = require('@magic/test')

const log = require('../src')

const resetEnvAndLog = (env, set = false) => () => {
  const oldEnv = process.env.NODE_ENV
  process.env.NODE_ENV = env
  if (set) {
    log.setLevel()
  }
  const lvl = log.getLevel()
  process.env.NODE_ENV = oldEnv
  return lvl
}

const isProd = () => process.env.NODE_ENV === 'production'

module.exports = [
  { fn: () => log.getLevel, expect: is.function },
  { fn: () => log.getLevel(), expect: isProd() ? 1 : 0 },
  { fn: resetEnvAndLog('production', true), expect: 1 },
  { fn: resetEnvAndLog('development', true), expect: 0 },
]
