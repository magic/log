const { is } = require('@magic/test')

const log = require('../src')

const resetEnv = (env, fn, set = false) => () => {
  const oldEnv = process.env.NODE_ENV
  process.env.NODE_ENV = env
  if (set) {
    log.setLevel()
  }

  const lvl = log[fn]()
  process.env.NODE_ENV = oldEnv
  return lvl
}

const isProd = () => process.env.NODE_ENV === 'production'

const deleteAndReset = fn => {
  const oldLevel = log.level
  log.level = undefined
  return log[fn]()
  log.level = oldLevel
}

module.exports = [
  { fn: () => log.getLevel, expect: is.function },
  { fn: () => log.getLevel(), expect: isProd() ? 1 : 0 },
  { fn: () => log.resetLevel(), expect: isProd() ? 1 : 0 },
  { fn: deleteAndReset('resetLevel'), expect: isProd() ? 1 : 0 },
  { fn: deleteAndReset('getLevel'), expect: isProd() ? 1 : 0 },
  { fn: resetEnv('production', 'getLevel', true), expect: 1 },
  { fn: resetEnv('development', 'getLevel', true), expect: 0 },
]
